/**
 * Test stub for the `server-only` package.
 *
 * `server-only` is a Next BUILD alias, not a real module: importing it outside
 * the Next bundler fails to resolve. It is a genuine safety property in the
 * modules that use it (lib/activity/service.ts and friends hold server-side
 * write paths that must never reach a client bundle), so the fix is to satisfy
 * the resolver here rather than to strip the guard from shipped code.
 *
 * Wired up in vitest.config.ts. Needed as soon as a test drives a ROUTE HANDLER
 * that transitively imports one of those modules — first hit 2026-09-18, when
 * /api/public-quiz/submit began emitting a quiz_taken activity row.
 *
 * ARCHITECTURE.md records the other half of this trap: modules a `tsx` SCRIPT
 * must import (lib/quiz/assemble.ts, the email service) deliberately omit
 * `server-only`, because a script has no bundler to alias it away.
 */
export {};
