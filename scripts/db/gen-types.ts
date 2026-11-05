/**
 * Writes src/types/db.ts from the live `public` schema (TECH_DEBT_SPEC.md 3.3).
 *
 *   npm run db:types              write the file
 *   npm run db:types -- --check   exit 1 if the committed file differs from the schema
 *
 * Uses Supabase's Management API (the same output as `supabase gen types typescript`), so no
 * CLI install is needed. Token: SUPABASE_ACCESS_TOKEN, else the one in the gitignored .mcp.json.
 * Project: SUPABASE_PROJECT_REF (.env.local).
 */
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { buildTypesFile, typesDrift } from "./genTypesCore";

config({ path: path.join(process.cwd(), ".env.local") });
const OUT = path.join(process.cwd(), "src", "types", "db.ts");

function accessToken(): string {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN;
  try {
    const m = fs.readFileSync(path.join(process.cwd(), ".mcp.json"), "utf8").match(/sbp_[A-Za-z0-9]+/);
    if (m) return m[0];
  } catch {
    // fall through
  }
  throw new Error("No Supabase access token: set SUPABASE_ACCESS_TOKEN");
}

async function main() {
  const ref = process.env.SUPABASE_PROJECT_REF;
  if (!ref) throw new Error("SUPABASE_PROJECT_REF is not set (.env.local)");
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/types/typescript?included_schemas=public`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
  });
  if (!res.ok) throw new Error(`Management API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const { types } = (await res.json()) as { types: string };
  const file = buildTypesFile(types);

  if (process.argv.includes("--check")) {
    const committed = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (typesDrift(committed, file)) {
      console.error("src/types/db.ts is out of date with the schema: run `npm run db:types` and commit it.");
      process.exit(1);
    }
    console.log("src/types/db.ts matches the schema.");
    return;
  }
  fs.writeFileSync(OUT, file);
  console.log(`wrote ${path.relative(process.cwd(), OUT)} (${file.length} bytes)`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
