/**
 * CLI: assemble daily quizzes from READY atoms (status auto|verified) in
 * quiz_atoms, record them (quizzes + quiz_atoms_map), and push each to nda-tracker
 * as a DRAFT. Thin wrapper around assembleNextQuiz (src/lib/quiz/assemble.ts) —
 * same core the dashboard "Assemble" button uses.
 *
 * Run:  npm run quiz:assemble nda-maths probability          # all full quizzes
 *       npm run quiz:assemble nda-maths probability 2 15     # max 2 quizzes of 15
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { assembleNextQuiz } from "../../src/lib/quiz/assemble";

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
  const importUrl = process.env.NDA_TRACKER_IMPORT_URL;
  const secret = process.env.QUIZ_IMPORT_SECRET;
  const push = importUrl && secret ? { url: importUrl, secret } : null;
  if (!push) console.warn("  (no NDA_TRACKER_IMPORT_URL/QUIZ_IMPORT_SECRET — recording only, not pushing)");

  const route = process.argv[2] ?? "nda-maths";
  const chapter = process.argv[3] ?? "probability";
  const maxQuizzes = process.argv[4] ? parseInt(process.argv[4], 10) : Infinity;
  const size = process.argv[5] ? parseInt(process.argv[5], 10) : 15;
  const db = createClient(url, serviceRole, { auth: { persistSession: false } });

  let made = 0;
  for (let i = 0; i < maxQuizzes; i++) {
    const r = await assembleNextQuiz(db, { route, chapter, size, push });
    if (!r.ok) {
      if (made === 0) console.log(`  ${r.error}`);
      break;
    }
    made++;
    console.log(
      `✓ ${r.slug} (${r.questionCount} Q) ${r.pushed ? "→ draft in nda-tracker" : "(recorded, not pushed)"} · ${r.remaining} ready left`
    );
    if (r.remaining < size) break;
  }
  console.log(`\nDone. Assembled ${made} quiz(zes).${made > 0 ? " Open nda-tracker → Daily Quiz to publish." : ""}`);
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
