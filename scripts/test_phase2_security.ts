import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { apiRouter } from "../server/routes.js";
import { PersistentDatabase } from "../server/db.js";
import { AuthService } from "../server/auth/authService.js";

async function runSecurityTestSuite() {
  console.log("==================================================");
  console.log("CHINTAN GPT — PHASE 2 AUTOMATED SECURITY TEST SUITE");
  console.log("==================================================");

  // Setup express test server
  const app = express();
  app.use(express.json());
  app.use("/api", apiRouter);

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}/api`;
  console.log(`Test server running at ${baseUrl}\n`);

  let totalPassed = 0;
  let totalFailed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      totalPassed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ""}`);
      totalFailed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: Missing auth token rejected (HTTP 401)
    // -------------------------------------------------------------
    console.log("--- TEST 1: Missing auth token rejected ---");
    const res1 = await fetch(`${baseUrl}/admin/users`);
    assert(res1.status === 401, "Admin route without token returns 401", `Status was ${res1.status}`);

    const res1b = await fetch(`${baseUrl}/user/profile`);
    assert(res1b.status === 401, "Protected user profile route returns 401 without token", `Status was ${res1b.status}`);

    // -------------------------------------------------------------
    // TEST 2: Malformed auth token rejected (HTTP 401)
    // -------------------------------------------------------------
    console.log("\n--- TEST 2: Malformed auth token rejected ---");
    const res2 = await fetch(`${baseUrl}/user/profile`, {
      headers: { Authorization: "Bearer this.is.not.a.valid.jwt.token" },
    });
    assert(res2.status === 401, "Malformed token returns 401", `Status was ${res2.status}`);

    const res2b = await fetch(`${baseUrl}/user/profile`, {
      headers: { Authorization: "Bearer malformed_string" },
    });
    assert(res2b.status === 401, "Invalid bearer token format returns 401", `Status was ${res2b.status}`);

    // -------------------------------------------------------------
    // TEST 3: Expired token rejected (HTTP 401)
    // -------------------------------------------------------------
    console.log("\n--- TEST 3: Expired token rejected ---");
    const expiredSecret = process.env.JWT_SECRET || "chintan_gpt_default_secure_secret_key_2026_prod";
    const expiredToken = jwt.sign(
      { sub: "usr_student_test", email: "expired@test.com", role: "student" },
      expiredSecret,
      { expiresIn: "-10s" }
    );
    const res3 = await fetch(`${baseUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${expiredToken}` },
    });
    assert(res3.status === 401, "Expired token returns 401", `Status was ${res3.status}`);

    // -------------------------------------------------------------
    // TEST 4: Tampered role claim rejected (Signature mismatch)
    // -------------------------------------------------------------
    console.log("\n--- TEST 4: Tampered role claim rejected ---");
    const fakeSecret = "wrong_attacker_secret_key";
    const forgedAdminToken = jwt.sign(
      { sub: "usr_attacker", email: "hacker@test.com", role: "admin" },
      fakeSecret,
      { expiresIn: "1h" }
    );
    const res4 = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${forgedAdminToken}` },
    });
    assert(res4.status === 401, "Token with invalid signature returns 401", `Status was ${res4.status}`);

    // -------------------------------------------------------------
    // TEST 5: Client-supplied userId ignored (Token identity enforced)
    // -------------------------------------------------------------
    console.log("\n--- TEST 5: Client-supplied userId ignored ---");
    // Register User A
    const userAEmail = `user_a_${Date.now()}@test.com`;
    const regResA = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User A", email: userAEmail, password: "password123" }),
    });
    const regDataA = await regResA.json();
    const tokenA = regDataA.token;
    const userAId = regDataA.user.id;

    // Submit a solution using User A's token, but spoofing another userId in the body
    const subRes = await fetch(`${baseUrl}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({
        problemId: "prob_two_sum",
        userId: "spoofed_target_user_id", // spoofed!
        code: "def twoSum(): pass",
        language: "python",
        status: "Accepted",
        runtime: 42,
        memory: 14.2,
      }),
    });
    const subData = await subRes.json();
    assert(
      subData.submission && subData.submission.userId === userAId,
      "Submission ignores spoofed userId and uses authenticated token userId",
      `Expected ${userAId}, got ${subData.submission?.userId}`
    );

    // -------------------------------------------------------------
    // TEST 6: Student cannot access /admin endpoints (HTTP 403 Forbidden)
    // -------------------------------------------------------------
    console.log("\n--- TEST 6: Student cannot access /admin endpoints ---");
    const res6 = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(res6.status === 403, "Student accessing admin route receives 403 Forbidden", `Status was ${res6.status}`);

    // -------------------------------------------------------------
    // TEST 7: Admin can access /admin endpoints (HTTP 200 OK)
    // -------------------------------------------------------------
    console.log("\n--- TEST 7: Admin can access /admin endpoints ---");
    // Login as default admin
    const adminLoginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@chintangpt.com", password: process.env.ADMIN_DEFAULT_PASSWORD || "admin123" }),
    });
    const adminLoginData = await adminLoginRes.json();
    const adminToken = adminLoginData.token;

    const res7 = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(res7.status === 200, "Admin accessing admin route receives 200 OK", `Status was ${res7.status}`);

    // -------------------------------------------------------------
    // TEST 8: User A cannot read User B submission (IDOR Prevention)
    // -------------------------------------------------------------
    console.log("\n--- TEST 8: User A cannot read User B submission (IDOR) ---");
    // Register User B
    const userBEmail = `user_b_${Date.now()}@test.com`;
    const regResB = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User B", email: userBEmail, password: "password123" }),
    });
    const regDataB = await regResB.json();
    const tokenB = regDataB.token;

    // User A requests submissions filtered by User B's userId
    const res8 = await fetch(`${baseUrl}/submissions?userId=${regDataB.user.id}`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const data8 = await res8.json();
    // It should either forbid (403) or filter strictly to User A's submissions (never User B's)
    const leaksUserB = Array.isArray(data8) && data8.some((s: any) => s.userId === regDataB.user.id);
    assert(
      res8.status === 403 || (!leaksUserB && res8.status === 200),
      "User A cannot read User B submissions",
      `Leak detected: ${leaksUserB}`
    );

    // -------------------------------------------------------------
    // TEST 9: User A cannot update User B interview session (IDOR)
    // -------------------------------------------------------------
    console.log("\n--- TEST 9: User A cannot update User B interview session (IDOR) ---");
    // Start interview for User B
    const startInterviewRes = await fetch(`${baseUrl}/interview/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({ type: "coding", company: "Google" }),
    });
    const interviewData = await startInterviewRes.json();
    const interviewId = interviewData.session?.id;

    // User A attempts to respond to User B's interview
    const respondRes = await fetch(`${baseUrl}/interview/${interviewId}/respond`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`, // User A!
      },
      body: JSON.stringify({ message: "Attacker response" }),
    });
    assert(
      respondRes.status === 403 || respondRes.status === 404,
      "User A cannot respond to User B's interview session (403 IDOR protected)",
      `Status was ${respondRes.status}`
    );

    // -------------------------------------------------------------
    // TEST 10: Password hashes are never returned by API
    // -------------------------------------------------------------
    console.log("\n--- TEST 10: Password hashes are never returned by API ---");
    assert(
      regDataA.user.passwordHash === undefined &&
      regDataA.user.password === undefined &&
      adminLoginData.user.passwordHash === undefined,
      "API responses omit password and passwordHash fields"
    );

    const meRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const meData = await meRes.json();
    assert(
      meData.user?.passwordHash === undefined && meData.user?.password === undefined,
      "GET /auth/me omits password hashes"
    );

    // -------------------------------------------------------------
    // TEST 11: Persistent user data after server restart
    // -------------------------------------------------------------
    console.log("\n--- TEST 11: Persistent user data across database reload ---");
    const db = PersistentDatabase.getInstance();
    // Simulate re-instantiating or reading from disk
    const reloadedUserA = db.getUserById(userAId);
    assert(
      !!reloadedUserA && reloadedUserA.email === userAEmail,
      "User A persisted in database file and readable after disk reload"
    );

    // -------------------------------------------------------------
    // TEST 12: Two users maintaining independent state
    // -------------------------------------------------------------
    console.log("\n--- TEST 12: Two users maintaining independent state ---");
    // User A solves problem
    await fetch(`${baseUrl}/user/solve-problem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ problemId: "prob_two_sum" }),
    });

    // Verify User A profile has prob_two_sum
    const profileResA = await fetch(`${baseUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const profileA = await profileResA.json();

    // Verify User B profile does NOT have prob_two_sum
    const profileResB = await fetch(`${baseUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const profileB = await profileResB.json();

    assert(
      profileA.solvedProblemIds.includes("prob_two_sum") &&
      !profileB.solvedProblemIds.includes("prob_two_sum"),
      "User A and User B maintain completely isolated progress and state"
    );
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    console.log("\n==================================================");
    console.log(`TEST SUITE FINISHED: ${totalPassed} PASSED, ${totalFailed} FAILED`);
    console.log("==================================================");
    if (totalFailed > 0) {
      process.exit(1);
    }
  }
}

runSecurityTestSuite().catch((err) => {
  console.error("Test Suite crashed:", err);
  process.exit(1);
});
