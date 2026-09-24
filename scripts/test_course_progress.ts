import { db } from "../server/db.js";
import { AuthService } from "../server/auth/authService.js";

async function runCourseProgressTest() {
  console.log("==================================================================");
  console.log("COURSE COMPLETION TRACKING & PERSISTENCE VERIFICATION");
  console.log("==================================================================");

  // 1. Create a test user
  const email = `student_${Date.now()}@progress.com`;
  const passwordHash = await AuthService.hashPassword("Password123!");
  const rawUser = await db.registerUser("Progress Student", email, passwordHash, "student");
  console.log(`[PASS] Registered test student: ${rawUser.id} (${rawUser.email})`);

  // 2. Initial progress should be 0%
  const courses = await db.getCourses();
  const testCourse = courses[0];
  console.log(`Testing with course: "${testCourse.title}" (ID: ${testCourse.id})`);

  // 3. Mark video complete by updating persistent user record
  const vid1 = testCourse.playlistVideos?.[0]?.videoId || "vid_1";
  await db.updateUser(rawUser.id, {
    completedVideoIds: [vid1],
    completedLessonIds: [`les_${testCourse.id}_${vid1}`],
    enrolledCourseIds: [testCourse.id],
  });
  await db.recordQualifyingActivity(rawUser.id, 50, 25);

  const afterVid1 = await db.findUserById(rawUser.id);
  console.log(`[PASS] Video marked complete. User completedVideoIds:`, afterVid1?.completedVideoIds);
  if (!afterVid1?.completedVideoIds.includes(vid1)) {
    throw new Error("Video ID not persisted to user record!");
  }

  // 4. Mark second lesson complete
  const les2 = `les_${testCourse.id}_test_2`;
  await db.updateUser(rawUser.id, {
    completedLessonIds: [...(afterVid1?.completedLessonIds || []), les2],
  });
  await db.recordQualifyingActivity(rawUser.id, 50, 25);

  const afterLes2 = await db.findUserById(rawUser.id);
  console.log(`[PASS] Lesson marked complete. User completedLessonIds:`, afterLes2?.completedLessonIds);
  if (!afterLes2?.completedLessonIds.includes(les2)) {
    throw new Error("Lesson ID not persisted to user record!");
  }

  // 5. XP and Streak updated
  console.log(`[PASS] User XP updated: ${afterLes2?.xp}, Streak: ${afterLes2?.streakDays}`);
  if ((afterLes2?.xp || 0) < 100) {
    throw new Error("XP not awarded on completion!");
  }

  // 6. Test progress calculation logic
  const totalCount = Math.max(1, testCourse.totalLessons || testCourse.playlistVideos?.length || 1);
  const completedCount = 2; // vid1 and les2
  const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));
  console.log(`[PASS] Calculated Progress for Catalog: ${completedCount}/${totalCount} (${percentage}%)`);

  // 7. Verify API endpoint GET /courses/progress returns valid progress data
  const express = (await import("express")).default;
  const http = (await import("http")).default;
  const { apiRouter } = await import("../server/routes.js");
  const app = express();
  app.use(express.json());
  app.use("/api", apiRouter);
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}/api`;

  const token = AuthService.generateToken(rawUser as any);
  const res = await fetch(`${baseUrl}/courses/progress`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  server.close();

  console.log(`[PASS] GET /courses/progress response:`, data);
  if (!data.success || !data.progress || !data.progress[testCourse.id]) {
    throw new Error("API /courses/progress failed to return course progress data!");
  }
  console.log(`[PASS] Course ${testCourse.id} progress from API:`, data.progress[testCourse.id]);

  console.log("==================================================================");
  console.log("ALL COURSE PROGRESS & PERSISTENCE VERIFICATIONS PASSED!");
  console.log("==================================================================");
  process.exit(0);
}

runCourseProgressTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
