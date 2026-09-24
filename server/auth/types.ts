import { Request } from "express";
import { UserProfile, UserRole } from "../../src/types/index.js";

export interface UserRecord extends UserProfile {
  passwordHash: string;
  tokenVersion?: number;
}

export interface RevokedTokenRecord {
  jti: string;
  expiresAt: number;
  revokedAt: string;
  userId?: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  tokenVersion?: number;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserProfile;
  authToken?: string;
}
