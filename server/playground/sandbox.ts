import { spawn, execFile } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { PLAYGROUND_CONFIG } from "./config.js";
import { PlaygroundFilePayload } from "./types.js";

export interface ProcessRunResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  timedOut: boolean;
  durationMs: number;
}

export class PlaygroundSandbox {
  private static baseTempDir = path.join(os.tmpdir(), "playground-sandboxes");

  /**
   * Generates a safe unique workspace directory
   */
  public static async createTempWorkspace(prefix = "run"): Promise<{ dir: string; id: string }> {
    const runId = `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const workspacePath = path.join(this.baseTempDir, runId);
    await fs.promises.mkdir(workspacePath, { recursive: true });
    return { dir: workspacePath, id: runId };
  }

  /**
   * Safely writes project files into the sandbox directory.
   * Strictly enforces path containment to prevent directory traversal.
   */
  public static async writeProjectFiles(
    dir: string,
    files: PlaygroundFilePayload[]
  ): Promise<string[]> {
    const writtenFiles: string[] = [];

    for (const file of files) {
      const sanitizedName = file.name.trim().replace(/^(\.\.[\/\\])+/, "");
      // Resolve path within sandbox
      const fullPath = path.resolve(dir, sanitizedName);

      // Verify containment
      if (!fullPath.startsWith(path.resolve(dir))) {
        throw new Error(`Security Exception: File path "${file.name}" attempts to escape sandbox.`);
      }

      // Ensure directory exists for nested paths
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.promises.writeFile(fullPath, file.content || "", "utf-8");
      writtenFiles.push(sanitizedName);
    }

    return writtenFiles;
  }

  /**
   * Spawns an isolated child process with strict resource and timeout enforcement
   */
  public static async executeCommand(
    command: string,
    args: string[],
    options: {
      cwd: string;
      stdin?: string;
      timeoutMs?: number;
      maxOutputBytes?: number;
      env?: Record<string, string>;
    }
  ): Promise<ProcessRunResult> {
    const timeoutMs = options.timeoutMs || PLAYGROUND_CONFIG.DEFAULT_TIMEOUT_MS;
    const maxOutputBytes = options.maxOutputBytes || PLAYGROUND_CONFIG.MAX_OUTPUT_SIZE_BYTES;

    return new Promise<ProcessRunResult>((resolve) => {
      const startTime = performance.now();
      let stdoutData = "";
      let stderrData = "";
      let isTimedOut = false;
      let isTerminated = false;

      // Restrict environment variables: do NOT pass sensitive server secrets to child process
      const safeEnv: NodeJS.ProcessEnv = {
        PATH: process.env.PATH || "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        LANG: "en_US.UTF-8",
        LC_ALL: "en_US.UTF-8",
        PYTHONUNBUFFERED: "1",
        ...(options.env || {}),
      };

      const child = spawn(command, args, {
        cwd: options.cwd,
        env: safeEnv,
        stdio: ["pipe", "pipe", "pipe"],
      });

      // Timeout watchdog
      const timer = setTimeout(() => {
        isTimedOut = true;
        isTerminated = true;
        try {
          child.kill("SIGKILL");
        } catch {
          // Process may have already exited
        }
      }, timeoutMs);

      // Handle stdin if provided
      if (child.stdin) {
        if (options.stdin !== undefined && options.stdin !== null) {
          child.stdin.write(options.stdin);
        }
        child.stdin.end();
      }

      // Stream stdout with byte cap
      if (child.stdout) {
        child.stdout.on("data", (chunk: Buffer) => {
          if (stdoutData.length < maxOutputBytes) {
            stdoutData += chunk.toString("utf-8");
            if (stdoutData.length >= maxOutputBytes) {
              stdoutData += `\n[Output truncated: Exceeded ${Math.round(maxOutputBytes / 1024)} KB limit]`;
            }
          }
        });
      }

      // Stream stderr with byte cap
      if (child.stderr) {
        child.stderr.on("data", (chunk: Buffer) => {
          if (stderrData.length < maxOutputBytes) {
            stderrData += chunk.toString("utf-8");
            if (stderrData.length >= maxOutputBytes) {
              stderrData += `\n[Error output truncated: Exceeded ${Math.round(maxOutputBytes / 1024)} KB limit]`;
            }
          }
        });
      }

      // Handle spawn error (e.g. executable not found)
      child.on("error", (err: Error) => {
        clearTimeout(timer);
        const durationMs = Math.round(performance.now() - startTime);
        resolve({
          stdout: stdoutData,
          stderr: `Process spawn error: ${err.message}`,
          exitCode: -1,
          signal: null,
          timedOut: false,
          durationMs,
        });
      });

      // Handle process exit
      child.on("close", (code: number | null, signal: NodeJS.Signals | null) => {
        clearTimeout(timer);
        const durationMs = Math.round(performance.now() - startTime);
        resolve({
          stdout: stdoutData,
          stderr: stderrData,
          exitCode: code,
          signal: isTimedOut ? "SIGKILL" : signal,
          timedOut: isTimedOut,
          durationMs,
        });
      });
    });
  }

  /**
   * Safely cleans up the temporary workspace
   */
  public static async cleanup(workspaceDir: string): Promise<void> {
    try {
      if (workspaceDir && workspaceDir.includes("playground-sandboxes")) {
        await fs.promises.rm(workspaceDir, { recursive: true, force: true });
      }
    } catch (err) {
      console.warn(`[PlaygroundSandbox] Failed to clean up workspace ${workspaceDir}:`, err);
    }
  }

  /**
   * Sanitizes output to remove absolute server directory paths
   */
  public static sanitizeOutput(output: string, workspaceDir: string): string {
    if (!output || !workspaceDir) return output;
    // Replace workspace directory path with relative paths
    const escaped = workspaceDir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped + "[/\\\\]?", "g");
    return output.replace(regex, "");
  }

  /**
   * Checks if a binary is available on the system PATH
   */
  public static async isBinaryAvailable(binName: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      execFile("which", [binName], (err, stdout) => {
        if (err || !stdout.trim()) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Gets version string of a binary
   */
  public static async getBinaryVersion(binName: string, versionFlag = "--version"): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve) => {
      execFile(binName, [versionFlag], { timeout: 3000 }, (err, stdout, stderr) => {
        if (err && !stdout && !stderr) {
          resolve(undefined);
        } else {
          const out = (stdout || stderr || "").trim();
          const firstLine = out.split("\n")[0]?.trim();
          resolve(firstLine || undefined);
        }
      });
    });
  }
}
