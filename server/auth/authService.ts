import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AuthTokenPayload, UserRecord } from "./types.js";
import { UserProfile } from "../../src/types/index.js";
import { db } from "../db.js";

// JWT Secret resolution: Must be configured in production
const JWT_SECRET = process.env.JWT_SECRET || "chintan_gpt_dev_jwt_secret_key_2026_unbreakable_production";
const TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || "7d";

// In-memory set of revoked token identifiers (jti) for fast L1 lookup
const revokedTokens = new Set<string>();

export class AuthService {
  /**
   * Hashes a plaintext password securely using bcrypt
   */
  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compares a plaintext password with a bcrypt hash
   */
  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) return false;
    return bcrypt.compare(password, hash);
  }

  /**
   * Signs a secure JWT authentication token for a user
   */
  public static generateToken(user: { id: string; email: string; role: "student" | "admin"; tokenVersion?: number }): string {
    const jti = crypto.randomUUID ? crypto.randomUUID() : `tok_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const payload: AuthTokenPayload = {
      userId: user.id,
      email: user.email.toLowerCase().trim(),
      role: user.role,
      tokenVersion: user.tokenVersion ?? 1,
      jti,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY as any,
    });
  }

  /**
   * Verifies an incoming JWT token string and validates revocation status
   */
  public static async verifyToken(token: string): Promise<{ valid: boolean; payload?: AuthTokenPayload; error?: string }> {
    if (!token || typeof token !== "string") {
      return { valid: false, error: "Token is required." };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;

      // Check both in-memory fast set and persistent database revocation table
      const isRevokedInMem = decoded.jti ? revokedTokens.has(decoded.jti) : false;
      if (isRevokedInMem) {
        return { valid: false, error: "Session has been logged out or revoked." };
      }

      if (decoded.jti) {
        const isRevokedInDb = await db.isTokenRevoked(decoded.jti);
        if (isRevokedInDb === true) {
          return { valid: false, error: "Session has been logged out or revoked." };
        }
      }

      return { valid: true, payload: decoded };
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return { valid: false, error: "Authentication token has expired. Please log in again." };
      }
      if (err.name === "JsonWebTokenError") {
        return { valid: false, error: "Invalid authentication token signature." };
      }
      return { valid: false, error: "Malformed authentication token." };
    }
  }

  /**
   * Synchronous token verify using fast L1 memory check
   */
  public static verifyTokenSync(token: string): { valid: boolean; payload?: AuthTokenPayload; error?: string } {
    if (!token || typeof token !== "string") {
      return { valid: false, error: "Token is required." };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
      if (decoded.jti && revokedTokens.has(decoded.jti)) {
        return { valid: false, error: "Session has been logged out or revoked." };
      }
      return { valid: true, payload: decoded };
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return { valid: false, error: "Authentication token has expired. Please log in again." };
      }
      if (err.name === "JsonWebTokenError") {
        return { valid: false, error: "Invalid authentication token signature." };
      }
      return { valid: false, error: "Malformed authentication token." };
    }
  }

  /**
   * Revokes an active token upon logout in both memory and persistent storage
   */
  public static async revokeToken(token: string): Promise<boolean> {
    try {
      const decoded = jwt.decode(token) as AuthTokenPayload | null;
      if (decoded && decoded.jti) {
        revokedTokens.add(decoded.jti);
        const expiresAt = decoded.exp ? decoded.exp * 1000 : Date.now() + 7 * 24 * 3600 * 1000;
        await db.revokeToken(decoded.jti, expiresAt, decoded.userId);
        if (decoded.userId) {
          await db.incrementTokenVersion(decoded.userId);
        }
        return true;
      }
    } catch {
      // Ignored
    }
    return false;
  }

  /**
   * Checks if token was revoked
   */
  public static isTokenRevoked(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as AuthTokenPayload | null;
      if (decoded && decoded.jti) {
        return revokedTokens.has(decoded.jti) || db.isTokenRevoked(decoded.jti);
      }
    } catch {}
    return false;
  }

  /**
   * Strips sensitive credentials from a UserRecord before returning to client
   */
  public static sanitizeUser(user: UserRecord): UserProfile {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
