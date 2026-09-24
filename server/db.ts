/**
 * Database Module Re-Export
 * Delegates directly to the modular server/db layer supporting Firestore and LocalJsonAdapter.
 */
export * from "./db/index.js";
export { LocalJsonAdapter as PersistentDatabase } from "./db/localJsonAdapter.js";
