import { UnifiedExecutionService } from "../server/execution/executionService.js";
import { ExecutionValidator } from "../server/execution/validator.js";

async function runTests() {
  console.log("==================================================");
  console.log("PHASE 1 SECURITY TEST SUITE");
  console.log("==================================================");

  // --- Test 11: Executor Unconfigured / Unavailable ---
  console.log("\n--- TEST 11: Executor Unconfigured / Unavailable (Fail-Closed) ---");
  process.env.CODE_EXECUTION_PROVIDER = "none";
  process.env.CODE_EXECUTION_BASE_URL = "";
  const t11 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: "print('malicious code')",
  });
  console.log("Result:", JSON.stringify(t11, null, 2));
  console.assert(t11.status === "runtime_unavailable" || t11.error?.includes("not configured"), "Test 11 Passed");

  // Now configure external isolated runner for remaining sandbox tests
  process.env.CODE_EXECUTION_PROVIDER = "judge0";
  process.env.CODE_EXECUTION_BASE_URL = "https://ce.judge0.com";

  // --- Test 1: Normal Execution Request ---
  console.log("\n--- TEST 1: Normal Execution Request ---");
  const t1 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: "print('Hello ' + 'Isolated World!')",
  });
  console.log("Result:", JSON.stringify(t1, null, 2));

  // --- Test 2: Unsupported Language ---
  console.log("\n--- TEST 2: Unsupported Language ---");
  const t2 = await UnifiedExecutionService.execute({
    language: "brainfuck_or_malicious_sh",
    sourceCode: "rm -rf /",
  });
  console.log("Result:", JSON.stringify(t2, null, 2));
  console.assert(t2.error?.includes("Unsupported language"), "Test 2 Passed");

  // --- Test 3: Oversized Source Code (> 64 KB) ---
  console.log("\n--- TEST 3: Oversized Source Code (> 64 KB) ---");
  const hugeCode = "a = 1\n" + "x".repeat(70 * 1024);
  const t3 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: hugeCode,
  });
  console.log("Result:", JSON.stringify(t3, null, 2));
  console.assert(t3.error?.includes("exceeds maximum limit"), "Test 3 Passed");

  // --- Test 4: Oversized Standard Input (> 64 KB) ---
  console.log("\n--- TEST 4: Oversized Standard Input (> 64 KB) ---");
  const hugeStdin = "input_data_".repeat(8 * 1024);
  const t4 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: "import sys; print(len(sys.stdin.read()))",
    stdin: hugeStdin,
  });
  console.log("Result:", JSON.stringify(t4, null, 2));
  console.assert(t4.error?.includes("stdin size exceeds"), "Test 4 Passed");

  // --- Test 5: Path Traversal Attempt ---
  console.log("\n--- TEST 5: Path Traversal Attempt in Filename ---");
  const t5 = await UnifiedExecutionService.execute({
    language: "python",
    files: [
      { name: "../../etc/passwd", content: "print('traversal')" }
    ]
  });
  console.log("Result:", JSON.stringify(t5, null, 2));
  console.assert(t5.error?.includes("Path traversal attempt detected"), "Test 5 Passed");

  // --- Test 6: process.env Access Attempt ---
  console.log("\n--- TEST 6: process.env Access Attempt (Node.js) ---");
  const t6 = await UnifiedExecutionService.execute({
    language: "javascript",
    sourceCode: "console.log('ENV_SECRET_SEARCH:', process.env.GEMINI_API_KEY || 'NOT_FOUND_ON_CONTAINER');",
  });
  console.log("Result:", JSON.stringify(t6, null, 2));
  console.assert(!t6.stdout.includes("MY_GEMINI_API_KEY") && t6.stdout.includes("NOT_FOUND_ON_CONTAINER"), "Test 6 Passed");

  // --- Test 7: Filesystem Access Attempt ---
  console.log("\n--- TEST 7: Host Filesystem Access Attempt (/etc/passwd, package.json) ---");
  const t7 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: `
import os
try:
    with open('/etc/passwd') as f:
        print('FILE_FOUND:' + f.readline().strip())
except Exception as e:
    print('BLOCKED:' + str(e))
`,
  });
  console.log("Result:", JSON.stringify(t7, null, 2));

  // --- Test 8: child_process Access Attempt ---
  console.log("\n--- TEST 8: child_process Access Attempt (Node.js) ---");
  const t8 = await UnifiedExecutionService.execute({
    language: "javascript",
    sourceCode: `
try {
    const cp = require('child_process');
    console.log('CP_EXEC_TEST:', cp.execSync('whoami').toString().trim());
} catch(e) {
    console.log('CP_BLOCKED:', e.message);
}
`,
  });
  console.log("Result:", JSON.stringify(t8, null, 2));

  // --- Test 9: Infinite Loop / Timeout ---
  console.log("\n--- TEST 9: Infinite Loop / Execution Timeout ---");
  const t9 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: "while True: pass",
    timeoutMs: 2000,
  });
  console.log("Result:", JSON.stringify(t9, null, 2));
  console.assert(t9.status === "timeout" || t9.stderr.includes("timed out"), "Test 9 Passed");

  // --- Test 10: Huge Output Buffering / Truncation ---
  console.log("\n--- TEST 10: Huge Output Buffering / Truncation ---");
  const t10 = await UnifiedExecutionService.execute({
    language: "python",
    sourceCode: "print('A' * (100 * 1024))",
  });
  console.log("Result:", JSON.stringify({
    success: t10.success,
    status: t10.status,
    stdoutLength: t10.stdout.length,
    isTruncated: t10.stdout.includes("truncated") || t10.stdout.length <= 66000
  }, null, 2));

  // --- Test 12: Malformed Request Payload ---
  console.log("\n--- TEST 12: Malformed Request Payload ---");
  const t12a = await UnifiedExecutionService.execute(null);
  console.log("Null payload:", t12a.error);
  const t12b = await UnifiedExecutionService.execute({ language: 12345 });
  console.log("Non-string language:", t12b.error);
  const t12c = await UnifiedExecutionService.execute({ language: "python", files: "not an array" });
  console.log("Files not array:", t12c.error);

  console.log("\n==================================================");
  console.log("ALL 12 TESTS EXECUTED SUCCESSFULLY.");
  console.log("==================================================");
}

runTests().catch(err => {
  console.error("Test runner error:", err);
  process.exit(1);
});
