import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    globalSetup: ["./tests/global-teardown.ts"],
    include: ["tests/**/*.test.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
    // Integration tests share ONE live Supabase project and vitest runs files in
    // parallel, so a test can intermittently fail from cross-file data
    // interference or a transient pooler/network blip (see tests/global-teardown.ts
    // "races with other files still mid-flight"). One auto-retry absorbs that flake
    // class so the gate self-heals; a genuinely broken test still fails both
    // attempts, so real regressions are not masked.
    retry: 1,
  },
});
