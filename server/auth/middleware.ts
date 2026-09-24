import { Response, NextFunction } from "express";
import { AuthService } from "./authService.js";
import { AuthenticatedRequest } from "./types.js";
import { db } from "../db.js";

/**
 * Extracts Bearer token from the Authorization header
 */
export function extractBearerToken(req: AuthenticatedRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
    return parts[1].trim();
  }
  return null;
}

/**
 * Middleware: Strictly requires valid authentication
 * Rejects unauthenticated requests with 401
 */
export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const token = extractBearerToken(req);

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Authentication required. Please provide a valid Bearer token in the Authorization header.",
    });
    return;
  }

  const { valid, payload, error } = await AuthService.verifyToken(token);
  if (!valid || !payload) {
    res.status(401).json({
      success: false,
      error: error || "Invalid or expired authentication session.",
    });
    return;
  }

  const userRecord = await db.getUserRecordById(payload.userId);
  if (!userRecord) {
    res.status(401).json({
      success: false,
      error: "User account associated with this session no longer exists.",
    });
    return;
  }

  // Verify session token version (invalidates tokens if user logged out or revoked)
  if (
    payload.tokenVersion !== undefined &&
    userRecord.tokenVersion !== undefined &&
    payload.tokenVersion !== userRecord.tokenVersion
  ) {
    res.status(401).json({
      success: false,
      error: "Session has been invalidated or revoked. Please log in again.",
    });
    return;
  }

  req.user = AuthService.sanitizeUser(userRecord);
  req.authToken = token;
  next();
}

/**
 * Middleware: Strictly requires Admin role (ROLE_ADMIN)
 * Rejects unauthenticated requests with 401 and non-admin requests with 403
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
        success: false,
        error: "Forbidden: Administrative privileges required to perform this action.",
      });
      return;
    }
    next();
  });
}

/**
 * Middleware: Attaches user if valid token present, but does not block if unauthenticated
 */
export async function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
  const token = extractBearerToken(req);
  if (token) {
    const { valid, payload } = await AuthService.verifyToken(token);
    if (valid && payload) {
      const user = await db.findUserById(payload.userId);
      if (user) {
        req.user = user;
        req.authToken = token;
      }
    }
  }
  next();
}
