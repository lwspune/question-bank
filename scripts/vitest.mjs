// Start Vitest from this folder spelled with an UPPERCASE drive letter.
//
// From c:\... (lowercase, which is where the Bash tool starts in this repo)
// Vitest crashes every test file before a single test runs, so a push failed
// its gate for no reason in the code, at least six times by 2026-11-17.
// Fixing the folder inside vitest.config.ts is too late: Vitest has already
// recorded the lowercase paths by then (measured). Arguments pass straight
// through, so `npm test -- tests/x.test.ts` works as before. On Linux and on
// an uppercase C:\ this changes nothing.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { upperDriveLetter } from "./lib/driveCase.mjs";

const cwd = upperDriveLetter(process.cwd());
const require = createRequire(path.join(cwd, "package.json"));
const vitestBin = path.join(path.dirname(require.resolve("vitest/package.json")), "vitest.mjs");

const result = spawnSync(process.execPath, [vitestBin, ...process.argv.slice(2)], {
  cwd,
  stdio: "inherit",
});
if (result.error) {
  console.error(`[vitest.mjs] could not start Vitest: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
