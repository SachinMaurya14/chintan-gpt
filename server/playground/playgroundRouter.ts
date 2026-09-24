import { Router, Request, Response } from "express";
import { PlaygroundServerExecutionService } from "./executionService.js";
import { PlaygroundExecutionRequest } from "./types.js";

export const playgroundRouter = Router();

// Execution endpoint
playgroundRouter.post("/execute", async (req: Request, res: Response) => {
  try {
    const payload: any = req.body || {};
    if ((!payload.files || payload.files.length === 0) && typeof payload.code === "string") {
      const lang = payload.language || "python";
      const ext = lang === "python" ? "py" : lang === "javascript" ? "js" : lang === "cpp" ? "cpp" : "txt";
      payload.files = [{ name: `main.${ext}`, content: payload.code, isEntry: true }];
    }
    const result = await PlaygroundServerExecutionService.execute(payload);
    res.json(result);
  } catch (err: any) {
    console.error("[Playground Router] Execution exception:", err);
    res.status(500).json({
      status: "error",
      stdout: "",
      stderr: `Server error: ${err.message || "Failed to execute code request"}`,
      exitCode: -1,
      executionTimeMs: 0,
      diagnostics: [],
    });
  }
});

// Runtime health check endpoint
playgroundRouter.get("/health", async (req: Request, res: Response) => {
  try {
    const runtimes = await PlaygroundServerExecutionService.getRuntimesStatus();
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      runtimes,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      error: err.message,
    });
  }
});
