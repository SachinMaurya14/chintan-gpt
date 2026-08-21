/**
 * Playground Execution Engine Configurable Limits & Settings
 */
export const PLAYGROUND_CONFIG = {
  // Execution time limits
  DEFAULT_TIMEOUT_MS: 8000,
  MAX_TIMEOUT_MS: 15000,
  MIN_TIMEOUT_MS: 1000,

  // Payload and workspace limits
  MAX_SOURCE_SIZE_BYTES: 512 * 1024, // 512 KB per file
  MAX_TOTAL_PAYLOAD_BYTES: 2 * 1024 * 1024, // 2 MB total payload
  MAX_FILES_COUNT: 25,
  MAX_OUTPUT_SIZE_BYTES: 1024 * 1024, // 1 MB output capture limit

  // Concurrency & rate limits
  MAX_CONCURRENT_EXECUTIONS_PER_IP: 3,
  MAX_EXECUTIONS_PER_MINUTE: 40,

  // Memory limits for child processes (Node / Java)
  NODE_MAX_OLD_SPACE_MB: 128,
  JAVA_MAX_HEAP_MB: 256,
};
