/**
 * The gate's first test step: stop when the test database settings are
 * missing, instead of letting every DB test file skip and the gate print PASS.
 *
 *   npm run testdb:require-env
 *
 * Reads them as the tests do: the environment first (CI's secrets), then
 * .env.test.local in this folder. A new worktree has no .env.test.local
 * (it is not in git), so copy it in from the main checkout.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { config } from "dotenv";
import { missingTestEnv } from "../lib/testEnvRequired";

const file = path.join(process.cwd(), ".env.test.local");
if (fs.existsSync(file)) config({ path: file });

const missing = missingTestEnv(process.env);
if (missing.length > 0) {
  console.error(
    `The test database settings are missing: ${missing.join(", ")}.\n` +
      "Without them every database test file is skipped and the gate would still say PASS.\n" +
      "Copy .env.test.local into this folder (it is not in git), or set those variables."
  );
  process.exit(1);
}
console.log("Test database settings found.");
