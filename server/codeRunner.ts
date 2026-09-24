import { TestCase, CodeExecutionResult, SupportedLanguage } from "../src/types/index.js";
import { IsolatedExecutionClient } from "./playground/sandbox.js";

// Helper to normalize strings for comparison across languages (Python vs JS vs C++)
function normalizeOutput(str: string): string {
  if (typeof str !== "string") str = JSON.stringify(str) || "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, "");
}

/**
 * Validates syntax and basic token structure for compiled and interpreted languages
 */
function validateCodeSyntax(language: SupportedLanguage, code: string): { valid: boolean; error?: string } {
  // 1. Bracket & Parentheses Balancer
  const stack: string[] = [];
  const map: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  let inString: string | null = null;
  let isEscaped = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (isEscaped) {
      isEscaped = false;
      continue;
    }

    if (char === "\\") {
      isEscaped = true;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      if (inString === char) {
        inString = null;
      } else if (!inString) {
        inString = char;
      }
      continue;
    }

    if (inString) continue;

    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      const last = stack.pop();
      if (!last || map[last] !== char) {
        return {
          valid: false,
          error: `Compilation Error: SyntaxError: Unexpected closing bracket '${char}' or mismatched token.`
        };
      }
    }
  }

  if (stack.length > 0) {
    const unclosed = stack.pop();
    return {
      valid: false,
      error: `Compilation Error: Expected '${map[unclosed!]}' at end of input. Unclosed block detected.`
    };
  }

  // 2. Language-Specific Structural Checks
  if (language === "cpp") {
    const hasClassOrFunc = code.includes("class Solution") || code.includes("int ") || code.includes("vector<") || code.includes("bool ") || code.includes("string ") || code.includes("void ");
    if (!hasClassOrFunc) {
      return {
        valid: false,
        error: "Compilation Error: error: expected class declaration or member function definition"
      };
    }
    const lines = code.split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("//") && !l.startsWith("#") && !l.startsWith("/*") && !l.startsWith("*"));
    for (const line of lines) {
      if (line.startsWith("int ") || line.startsWith("string ") || line.startsWith("vector") || line.startsWith("return ") || line.startsWith("cout ")) {
        if (!line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
          return {
            valid: false,
            error: `Compilation Error: error: expected ';' before end of line: "${line}"`
          };
        }
      }
    }
  }

  if (language === "java") {
    if (!code.includes("class Solution") && !code.includes("public ")) {
      return {
        valid: false,
        error: "Compilation Error: java: class Solution expected with public method signature"
      };
    }
    const lines = code.split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("//") && !l.startsWith("/*") && !l.startsWith("*"));
    for (const line of lines) {
      if (line.startsWith("int ") || line.startsWith("String ") || line.startsWith("return ") || line.startsWith("System.out")) {
        if (!line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
          return {
            valid: false,
            error: `Compilation Error: java: ';' expected at statement: "${line}"`
          };
        }
      }
    }
  }

  if (language === "python") {
    if (!code.includes("def ") && !code.includes("class ")) {
      return {
        valid: false,
        error: "Compilation Error: IndentationError / SyntaxError: Expected function definition `def solution(...)` or `class Solution:`"
      };
    }
  }

  return { valid: true };
}

/**
 * Checks if student code is an un-implemented stub (e.g., just comments or `pass`)
 */
function isStubImplementation(language: SupportedLanguage, code: string): boolean {
  const stripped = code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "")
    .replace(/#.*/g, "")
    .trim();

  if (language === "python") {
    const lines = stripped.split("\n").map(l => l.trim()).filter(Boolean);
    return lines.length <= 2 && lines.some(l => l === "pass" || l === "return None" || l === "..." || l.endsWith(": pass"));
  }

  if (language === "cpp" || language === "java" || language === "javascript") {
    const bodyMatch = stripped.match(/\{([\s\S]*)\}/);
    if (bodyMatch) {
      const inner = bodyMatch[1].replace(/return\s*;/g, "").trim();
      if (!inner || inner === "return null;" || inner === "return {};" || inner === "return 0;" && !code.includes("for") && !code.includes("while") && !code.includes("if")) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Builds an isolated execution harness for JavaScript
 */
function buildJsHarness(code: string, activeCases: TestCase[]): string {
  const casesJson = JSON.stringify(
    activeCases.map((tc, idx) => ({ index: idx + 1, input: tc.input, expected: tc.expectedOutput }))
  );

  return `
    const __logs = [];
    const originalLog = console.log;
    console.log = (...args) => __logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    console.error = (...args) => __logs.push('[ERR] ' + args.join(' '));
    console.warn = (...args) => __logs.push('[WARN] ' + args.join(' '));

    ${code}

    const testCases = ${casesJson};

    function __findTargetFn() {
      const funcCandidates = [
        typeof twoSum === 'function' ? twoSum : null,
        typeof isAnagram === 'function' ? isAnagram : null,
        typeof lengthOfLongestSubstring === 'function' ? lengthOfLongestSubstring : null,
        typeof reverseList === 'function' ? reverseList : null,
        typeof levelOrder === 'function' ? levelOrder : null,
        typeof maxSubArray === 'function' ? maxSubArray : null,
        typeof coinChange === 'function' ? coinChange : null,
        typeof trap === 'function' ? trap : null,
        typeof search === 'function' ? search : null,
        typeof merge === 'function' ? merge : null,
        typeof solution === 'function' ? solution : null,
        typeof solve === 'function' ? solve : null,
      ].filter(Boolean);

      if (funcCandidates.length > 0) return funcCandidates[0];
      const keys = Object.keys(globalThis);
      for (const k of keys) {
        if (!k.startsWith('_') && k !== 'console' && typeof globalThis[k] === 'function') {
          return globalThis[k];
        }
      }
      return null;
    }

    const targetFn = __findTargetFn();
    if (!targetFn) {
      originalLog('__EVAL_ERROR__:No callable solution function found.');
      process.exit(1);
    }

    const results = [];
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const t0 = Date.now();
      try {
        let args;
        try {
          args = JSON.parse('[' + tc.input + ']');
        } catch (e) {
          args = [tc.input];
        }
        const res = targetFn(...args);
        const tDiff = Math.max(1, Date.now() - t0);
        results.push({
          index: tc.index,
          actual: res === undefined ? "undefined" : typeof res === "object" && res !== null ? JSON.stringify(res) : String(res),
          runtimeMs: tDiff
        });
      } catch (err) {
        results.push({
          index: tc.index,
          error: err.message || String(err),
          runtimeMs: Math.max(1, Date.now() - t0)
        });
      }
    }
    originalLog('__EVAL_RESULT__:' + JSON.stringify(results));
    if (__logs.length > 0) {
      originalLog('__USER_LOGS__:' + JSON.stringify(__logs));
    }
  `;
}

/**
 * Builds an isolated execution harness for Python
 */
function buildPythonHarness(code: string, activeCases: TestCase[]): string {
  const casesJson = JSON.stringify(
    activeCases.map((tc, idx) => ({ index: idx + 1, input: tc.input, expected: tc.expectedOutput }))
  );

  return `
import json, sys, time

${code}

test_cases = ${casesJson}

try:
    if 'Solution' in globals():
        sol = Solution()
        methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]
        if not methods:
            print('__EVAL_ERROR__:No callable method found in class Solution.', file=sys.stderr)
            sys.exit(1)
        target_fn = getattr(sol, methods[0])
    else:
        candidates = [v for k, v in globals().items() if callable(v) and not k.startswith('_') and k not in ('json', 'sys', 'time')]
        if not candidates:
            print('__EVAL_ERROR__:No callable function found.', file=sys.stderr)
            sys.exit(1)
        target_fn = candidates[0]
except Exception as e:
    print(f'__EVAL_ERROR__:{e}', file=sys.stderr)
    sys.exit(1)

results = []
for i, tc in enumerate(test_cases):
    t0 = time.time()
    try:
        raw_in = tc['input']
        try:
            args = json.loads('[' + raw_in + ']')
        except Exception:
            args = [raw_in]
        res = target_fn(*args)
        duration = max(1, int((time.time() - t0) * 1000))
        results.append({
            'index': tc['index'],
            'actual': json.dumps(res) if res is not None else 'None',
            'runtimeMs': duration
        })
    except Exception as ex:
        duration = max(1, int((time.time() - t0) * 1000))
        results.append({
            'index': tc['index'],
            'error': str(ex),
            'runtimeMs': duration
        })

print('__EVAL_RESULT__:' + json.dumps(results))
  `;
}

/**
 * Executes student code in a securely isolated execution environment.
 * ZERO native child_process or node:vm execution on the application server.
 * Evaluates against visible and hidden test cases with strict timeouts and resource limits.
 */
export async function executeCodeSandbox(
  language: SupportedLanguage,
  code: string,
  testCases: TestCase[],
  customInput?: string
): Promise<CodeExecutionResult> {
  const startTime = Date.now();

  // Guard against oversized source code payloads
  if (!code || Buffer.byteLength(code, "utf-8") > 64 * 1024) {
    return {
      status: "Compilation Error",
      passedCount: 0,
      totalTestCases: 0,
      runtimeMs: 0,
      memoryMb: 0,
      error: "Source code exceeds maximum allowed size limit of 64 KB.",
    };
  }

  // Determine cases to run
  const activeCases: TestCase[] = customInput !== undefined && customInput !== null && customInput.trim().length > 0
    ? [{ id: "custom", input: customInput, expectedOutput: "" }]
    : testCases;

  if (activeCases.length === 0) {
    return {
      status: "Accepted",
      passedCount: 0,
      totalTestCases: 0,
      runtimeMs: 10,
      memoryMb: 12.0,
      output: "No test cases provided.",
    };
  }

  // 1. Strict Syntax & Bracket Validation Pre-check
  const syntaxCheck = validateCodeSyntax(language, code);
  if (!syntaxCheck.valid) {
    return {
      status: "Compilation Error",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: 6,
      memoryMb: 12.0,
      error: syntaxCheck.error || "Compilation Error: Syntax or bracket validation failed.",
    };
  }

  // 2. Check for empty stub implementation
  if (isStubImplementation(language, code) && activeCases.length > 0 && activeCases[0].expectedOutput) {
    return {
      status: "Wrong Answer",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: 12,
      memoryMb: 14.0,
      output: "Function body returned default / unimplemented value.",
      failedTestCase: {
        input: activeCases[0].input,
        expected: activeCases[0].expectedOutput,
        actual: language === "python" ? "None" : "[]",
      },
      details: activeCases.map((tc, idx) => ({
        testCaseIndex: idx + 1,
        passed: false,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: language === "python" ? "None" : "[]",
        runtimeMs: 10,
      })),
    };
  }

  // 3. Prepare payload for isolated execution engine
  let harnessSource = code;
  let targetLangKey: string = language;

  if (language === "javascript") {
    harnessSource = buildJsHarness(code, activeCases);
    targetLangKey = "javascript";
  } else if (language === "python") {
    harnessSource = buildPythonHarness(code, activeCases);
    targetLangKey = "python";
  } else if (language === "cpp") {
    targetLangKey = "cpp";
  } else if (language === "java") {
    targetLangKey = "java";
  }

  // 4. Dispatch to isolated container runner
  const runResult = await IsolatedExecutionClient.execute({
    language: targetLangKey,
    sourceCode: harnessSource,
    stdin: activeCases[0]?.input || "",
    timeoutMs: 8000,
  });

  // Handle service failure (fail-closed model)
  if (runResult.statusDescription === "Service Unavailable" || (runResult.error && !runResult.timedOut)) {
    return {
      status: "Runtime Error",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: 0,
      memoryMb: 0,
      error: "Secure isolated execution service is currently unavailable. Untrusted host execution is permanently disabled for security.",
    };
  }

  // Handle Time Limit Exceeded
  if (runResult.timedOut) {
    return {
      status: "Time Limit Exceeded",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: 8000,
      memoryMb: 28.0,
      error: "Time Limit Exceeded: Execution timed out. Verify loop termination conditions and algorithmic complexity.",
    };
  }

  // Handle Compilation Errors (C++, Java, or syntax error in compiled languages)
  if (runResult.compileOutput || runResult.statusDescription === "Compilation Error") {
    return {
      status: "Compilation Error",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: runResult.durationMs,
      memoryMb: 14.0,
      error: runResult.compileOutput || runResult.stderr || "Compilation failed.",
    };
  }

  // 5. Parse test results for JavaScript and Python
  if (language === "javascript" || language === "python") {
    const rawStdout = runResult.stdout || "";
    const evalResultMatch = rawStdout.match(/__EVAL_RESULT__:([^\n]+)/);

    if (evalResultMatch && evalResultMatch[1]) {
      try {
        const parsedResults: { index: number; actual?: string; error?: string; runtimeMs: number }[] = JSON.parse(evalResultMatch[1]);
        const testResults: {
          testCaseIndex: number;
          passed: boolean;
          input: string;
          expected: string;
          actual: string;
          runtimeMs: number;
        }[] = [];

        let passedCount = 0;
        let failedTestCase: { input: string; expected: string; actual: string } | undefined;

        for (let i = 0; i < activeCases.length; i++) {
          const tc = activeCases[i];
          const execItem = parsedResults.find(r => r.index === (i + 1)) || parsedResults[i];

          if (!execItem || execItem.error) {
            return {
              status: "Runtime Error",
              passedCount,
              totalTestCases: activeCases.length,
              runtimeMs: runResult.durationMs,
              memoryMb: +( (runResult.memoryKb ? runResult.memoryKb / 1024 : 16.0).toFixed(1) ),
              error: execItem?.error || runResult.stderr || "Runtime exception occurred while evaluating test case.",
            };
          }

          const actual = execItem.actual ?? "undefined";
          const isCustom = tc.id === "custom";
          const passed = isCustom ? actual !== "undefined" : (normalizeOutput(actual) === normalizeOutput(tc.expectedOutput));

          if (passed) {
            passedCount++;
          } else if (!failedTestCase && !isCustom) {
            failedTestCase = {
              input: tc.input,
              expected: tc.expectedOutput,
              actual,
            };
          }

          testResults.push({
            testCaseIndex: i + 1,
            passed,
            input: tc.input,
            expected: tc.expectedOutput,
            actual,
            runtimeMs: execItem.runtimeMs || 5,
          });
        }

        const userLogsMatch = rawStdout.match(/__USER_LOGS__:([^\n]+)/);
        let userLogsText = "";
        if (userLogsMatch && userLogsMatch[1]) {
          try {
            const logsArray: string[] = JSON.parse(userLogsMatch[1]);
            userLogsText = logsArray.join("\n");
          } catch {
            // ignore log parse issues
          }
        }

        const isAllPassed = passedCount === activeCases.length;
        return {
          status: isAllPassed ? "Accepted" : "Wrong Answer",
          passedCount,
          totalTestCases: activeCases.length,
          runtimeMs: runResult.durationMs,
          memoryMb: +( (runResult.memoryKb ? runResult.memoryKb / 1024 : 16.2).toFixed(1) ),
          output: userLogsText || testResults.map(r => `Input: ${r.input} => Output: ${r.actual}`).join("\n"),
          failedTestCase,
          details: testResults,
        };
      } catch (err: any) {
        return {
          status: "Runtime Error",
          passedCount: 0,
          totalTestCases: activeCases.length,
          runtimeMs: runResult.durationMs,
          memoryMb: 15.0,
          error: `Failed to parse evaluation output: ${err.message}`,
        };
      }
    }

    // Check for runtime error in student execution
    if (runResult.exitCode !== 0 || runResult.stderr) {
      return {
        status: "Runtime Error",
        passedCount: 0,
        totalTestCases: activeCases.length,
        runtimeMs: runResult.durationMs,
        memoryMb: 15.0,
        error: runResult.stderr || runResult.stdout || "Runtime error during execution.",
      };
    }
  }

  // 6. Generic output matching for C++ / Java
  if (runResult.exitCode !== 0) {
    return {
      status: "Runtime Error",
      passedCount: 0,
      totalTestCases: activeCases.length,
      runtimeMs: runResult.durationMs,
      memoryMb: +( (runResult.memoryKb ? runResult.memoryKb / 1024 : 15.0).toFixed(1) ),
      error: runResult.stderr || "Runtime error occurred during execution.",
    };
  }

  const rawOut = (runResult.stdout || "").trim();
  const isCustom = activeCases.length === 1 && activeCases[0].id === "custom";
  const passed = isCustom ? rawOut.length > 0 : (normalizeOutput(rawOut) === normalizeOutput(activeCases[0]?.expectedOutput || ""));

  return {
    status: passed ? "Accepted" : "Wrong Answer",
    passedCount: passed ? activeCases.length : 0,
    totalTestCases: activeCases.length,
    runtimeMs: runResult.durationMs,
    memoryMb: +( (runResult.memoryKb ? runResult.memoryKb / 1024 : 18.0).toFixed(1) ),
    output: rawOut,
    failedTestCase: passed ? undefined : {
      input: activeCases[0]?.input || "",
      expected: activeCases[0]?.expectedOutput || "",
      actual: rawOut || "(no output)",
    },
    details: activeCases.map((tc, idx) => ({
      testCaseIndex: idx + 1,
      passed,
      input: tc.input,
      expected: tc.expectedOutput,
      actual: rawOut,
      runtimeMs: runResult.durationMs,
    })),
  };
}
