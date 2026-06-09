/**
 * quiz:delete — delete an assembled quiz from PYQ Vault and propagate the delete
 * to nda-tracker (removes the orphaned draft there too).
 *
 * Run:  npm run quiz:delete <slug>
 *       npm run quiz:delete nda-maths-statistics-formula-1
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { deleteQuiz } from "../../src/lib/quiz/deleteQuiz";

function loadEnvLocal() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("dotenv").config({ path: local, override: true });
  }
}

async function main() {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) throw new Error("Supabase env missing in .env.local");

  const slug = process.argv[2];
  if (!slug) throw new Error("usage: npm run quiz:delete <slug>");

  const importUrl = process.env.NDA_TRACKER_IMPORT_URL;
  const secret = process.env.QUIZ_IMPORT_SECRET;
  const push = importUrl && secret ? { url: importUrl, secret } : null;

  const db = createClient(url, serviceRole, { auth: { persistSession: false } });
  const r = await deleteQuiz(db, slug, push);
  if (!r.ok) {
    console.error(`✗ ${r.error}`);
    process.exit(1);
  }
  if (!r.deleted) {
    console.log(`  ${r.pushDetail}`);
    return;
  }
  console.log(`✓ deleted ${slug} (${r.id}) from PYQ Vault · ${r.pushDetail}`);
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
