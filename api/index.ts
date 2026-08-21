import express, { Request, Response, NextFunction } from "express";
import { apiRouter } from "../server/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 1. Permissive CORS Middleware for Vercel, localhost, and cross-origin previews
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// 2. Safe Body Parser for Vercel Serverless Functions
// Avoids hanging on stream read if @vercel/node has already consumed the stream
app.use((req: any, res: Response, next: NextFunction) => {
  if (req.body !== undefined && req.body !== null && typeof req.body === "object") {
    req._body = true;
    return next();
  }
  express.json({ limit: "10mb" })(req, res, (err) => {
    if (err) {
      console.warn("[Vercel API] JSON parsing warning:", err.message);
    }
    next();
  });
});

app.use((req: any, res: Response, next: NextFunction) => {
  if (req._body) {
    return next();
  }
  express.urlencoded({ extended: true, limit: "10mb" })(req, res, next);
});

// 3. Normalize Vercel URL routing so Express matches accurately across rewrites
app.use((req: any, res: Response, next: NextFunction) => {
  // If Vercel rewrote request to /api/index, restore original target path from headers or query
  const originalPath = req.headers["x-matched-path"] || req.headers["x-forwarded-url"] || req.originalUrl;
  if (typeof originalPath === "string" && originalPath.startsWith("/api/")) {
    req.url = originalPath;
  }
  next();
});

// 4. Mount API router across /api, /api/index, and root / paths to handle both direct and rewritten invocations
app.use("/api", apiRouter);
app.use("/api/index", apiRouter);
app.use("/", apiRouter);

// 5. Fallback for unhandled API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl || req.url}`,
    timestamp: new Date().toISOString()
  });
});

// 6. Centralized Error Boundary
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[Vercel API Unhandled Error]:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  });
});

// Export default Express application for Vercel @vercel/node runtime
export default app;
