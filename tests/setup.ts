import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

const envFile = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envFile)) {
  config({ path: envFile });
}
