/**
 * Run by .github/workflows/deploy.yml after `vercel pull`: replace Vercel's
 * `[SENSITIVE]` placeholders with GitHub's copies (passed in as environment
 * variables of the same name), then stop if a setting the build reads is still
 * locked. Prints setting NAMES only, never values. Pure core: scripts/lib/vercelEnv.ts.
 *
 *   npx tsx scripts/deploy/fill-vercel-env.ts [path]   (default .vercel/.env.production.local)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fillLockedSettings } from "../lib/vercelEnv";

const file = process.argv[2] ?? ".vercel/.env.production.local";
const result = fillLockedSettings(readFileSync(file, "utf8"), process.env);
writeFileSync(file, result.text);

console.log(`Filled from GitHub secrets: ${result.filled.join(", ") || "none"}`);
console.log(`Still locked (runtime-only, Vercel supplies them): ${result.stillLocked.filter((n) => !result.blocking.includes(n)).join(", ") || "none"}`);
if (result.blocking.length > 0) {
  console.error(
    `The build reads these but they are locked in Vercel and missing from GitHub secrets: ${result.blocking.join(", ")}.\n` +
      "Add each one in GitHub -> Settings -> Secrets and variables -> Actions, and pass it to this step in deploy.yml."
  );
  process.exit(1);
}
