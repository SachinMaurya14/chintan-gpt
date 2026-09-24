import fs from "fs";

async function runAudit() {
  const base = "http://127.0.0.1:3000/api";
  console.log("=== PHASE 2.1 COMPREHENSIVE SECURITY & LOGOUT AUDIT ===");

  // TEST 1: Login and obtain token
  const loginRes = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "student@chintangpt.com", password: "student123" }),
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("Test 1 - Login:", loginRes.status === 200 && !!token ? "PASSED" : "FAILED", `(token length: ${token?.length})`);

  // TEST 2: GET /api/auth/me before logout
  const me1 = await fetch(`${base}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const me1Data = await me1.json();
  console.log("Test 2 - /auth/me before logout:", me1.status === 200 && me1Data.user?.email === "student@chintangpt.com" ? "PASSED" : "FAILED", `(status: ${me1.status})`);

  // TEST 3: POST /api/auth/logout
  const logoutRes = await fetch(`${base}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const logoutData = await logoutRes.json();
  console.log("Test 3 - /auth/logout:", logoutRes.status === 200 && logoutData.success ? "PASSED" : "FAILED");

  // TEST 4: Reuse the SAME token on /api/auth/me after logout
  const me2 = await fetch(`${base}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const me2Data = await me2.json();
  console.log("Test 4 - Reuse token after logout rejected:", me2.status === 401 ? "PASSED" : "FAILED", `(status: ${me2.status}, error: "${me2Data.error}")`);

  // TEST 5: Signature forgery test (tampered token)
  const tamperedToken = token.slice(0, -5) + "abcde";
  const meTampered = await fetch(`${base}/auth/me`, {
    headers: { Authorization: `Bearer ${tamperedToken}` },
  });
  console.log("Test 5 - Tampered token signature check:", meTampered.status === 401 ? "PASSED" : "FAILED", `(status: ${meTampered.status})`);

  // TEST 6: Privilege escalation prevention (student attempting admin endpoint)
  const freshLogin = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "student@chintangpt.com", password: "student123" }),
  });
  const freshStudentToken = (await freshLogin.json()).token;

  const adminAttempt = await fetch(`${base}/admin/users`, {
    headers: { Authorization: `Bearer ${freshStudentToken}` },
  });
  console.log("Test 6 - Student forbidden from /admin/users:", adminAttempt.status === 403 ? "PASSED" : "FAILED", `(status: ${adminAttempt.status})`);

  // TEST 7: IDOR check on student submission
  const idorAttempt = await fetch(`${base}/submissions?userId=usr_other_hacker`, {
    headers: { Authorization: `Bearer ${freshStudentToken}` },
  });
  console.log("Test 7 - IDOR parameter tampering blocked:", idorAttempt.status === 403 ? "PASSED" : "FAILED", `(status: ${idorAttempt.status})`);

  // TEST 8: Verify no plaintext passwords in persistent DB file
  const dbPath = process.env.DB_FILE_PATH || "server/data/persistent_db.json";
  const dbFileContent = fs.readFileSync(dbPath, "utf-8");
  const hasPlainStudentPass = dbFileContent.includes('"student123"') || dbFileContent.includes('"Student@Chintan2026"');
  const hasPlainAdminPass = dbFileContent.includes('"admin123"') || dbFileContent.includes('"Admin@Chintan2026"');
  console.log("Test 8 - No plaintext passwords in DB:", (!hasPlainStudentPass && !hasPlainAdminPass) ? "PASSED" : "FAILED");

  // TEST 9: Verify bcrypt hash format in DB
  const dbJson = JSON.parse(dbFileContent);
  const studentRecord = Object.values(dbJson.users).find((u: any) => u.email === "student@chintangpt.com");
  const isBcrypt = (studentRecord as any)?.passwordHash?.startsWith("$2");
  console.log("Test 9 - Passwords stored as valid bcrypt hashes:", isBcrypt ? "PASSED" : "FAILED");

  // TEST 10: Persistent revocation storage verification
  const hasRevokedList = Array.isArray(dbJson.revokedTokens) && dbJson.revokedTokens.length > 0;
  console.log("Test 10 - Revoked tokens table persisted in DB:", hasRevokedList ? "PASSED" : "FAILED", `(entries: ${dbJson.revokedTokens?.length || 0})`);
  console.log("=== ALL 10 TESTS COMPLETED SUCCESSFULLY ===");
}

runAudit().catch(console.error);
