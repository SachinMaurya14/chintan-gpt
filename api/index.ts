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
    req._body = true; // Mark as parsed so express body-parser skips stream read
    return next();
  }
  express.json({ limit: "10mb" })(req, res, (err) => {
    if (err) {
      console.warn("JSON parsing warning:", err.message);
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

// 3. Mount API router across /api and root paths to handle both direct and rewritten invocations
app.use("/api", apiRouter);
app.use("/", apiRouter);

// 4. Fallback for unhandled API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl || req.url}`,
    timestamp: new Date().toISOString()
  });
});

// 5. Centralized error boundary
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Serverless Function Unhandled Error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  });
});

// Export default request listener for Vercel Serverless Functions
export default function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (syncErr: any) {
    console.error("Vercel Invocation Crash:", syncErr);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: syncErr.message || "Invocation failure in serverless function",
        timestamp: new Date().toISOString()
      });
    }
  }
}

