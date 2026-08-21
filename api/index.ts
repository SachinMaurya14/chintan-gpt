import express, { Request, Response, NextFunction } from "express";
import { apiRouter } from "../server/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS Middleware for Vercel and cross-origin clients
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// JSON & URL-encoded parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Support both /api/* and root /* routing when invoked as a Vercel Serverless Function
app.use("/api", apiRouter);
app.use("/", apiRouter);

// Centralized error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled API Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
});

export default app;
