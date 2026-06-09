/**
 * quiz:lint — flag quiz atoms whose stems aren't self-contained (likely unfair
 * as standalone, shuffled public-quiz questions). Triage only: it prints a
 * review list; a human rewrites the flagged stems via the verify `stem` override.
 *
 * Run:  npm run quiz:lint                       # all READY atoms
 *       npm run quiz:lint nda-maths statistics  # one chapter
 *
 * Scans status auto|verified (the publishable pool). Exit 0 always — it's a
 * triage aid, not a gate.
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { flagStem } from "../../src/lib/quiz/stemLint";
import { isBundleFormula } from "../../src/lib/quiz/atoms";

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
  const db = createClient(url, serviceRole, { auth: { persistSession: false } });

  const [route, chapter] = process.argv.slice(2).filter((a) => !a.startsWith("--"));

  let query = db
    .from("quiz_atoms")
    .select("atom_key, subject_route, chapter_slug, source_kind, stem, correct")
    .in("status", ["auto", "verified"])
    .limit(2000);
  if (route) query = query.eq("subject_route", route);
  if (chapter) query = query.eq("chapter_slug", chapter);

  const { data, error } = await query;
  if (error) throw new Error(`read atoms failed: ${error.message}`);
  const rows = data ?? [];

  const flagged = rows
    .map((r) => {
      const reasons = flagStem(r.stem as string);
      // A formula atom whose CORRECT answer is a multi-formula bundle is a
      // lopsided/ill-posed recall MCQ (long correct option vs single distractors).
      if (r.source_kind === "formula" && isBundleFormula(String(r.correct ?? ""))) {
        reasons.push("bundle correct answer (multi-formula — lopsided MCQ)");
      }
      return { ...r, reasons };
    })
    .filter((r) => r.reasons.length > 0)
    .sort((a, b) => `${a.subject_route}/${a.chapter_slug}`.localeCompare(`${b.subject_route}/${b.chapter_slug}`));

  const scope = chapter ? `${route}/${chapter}` : route ? route : "all ready atoms";
  console.log(`→ quiz:lint — ${rows.length} ready atom(s) in ${scope}; ${flagged.length} flagged.\n`);

  let lastChapter = "";
  for (const r of flagged) {
    const ch = `${r.subject_route}/${r.chapter_slug}`;
    if (ch !== lastChapter) {
      console.log(`\n## ${ch}`);
      lastChapter = ch;
    }
    console.log(`  • ${r.atom_key}  [${r.reasons.join("; ")}]`);
    console.log(`      ${r.stem}`);
  }

  if (flagged.length === 0) console.log("  none — every stem looks self-contained. ✓");
  else console.log(`\nRewrite flagged stems via the verify \`stem\` override, then re-run quiz:verify.`);

  // ── Quiz integrity: an assembled quiz must not reference a non-ready /
  // optionless atom. This breaks when atoms already mapped into a quiz are
  // re-harvested/re-classified (e.g. a bundle-formula auto atom split into
  // needs_review slots) — the quiz then renders a question with NO options.
  const { data: mapRows, error: mapErr } = await db
    .from("quiz_atoms_map")
    .select("quizzes(slug, status), quiz_atoms(atom_key, status, options)")
    .limit(5000);
  if (mapErr) throw new Error(`read quiz_atoms_map failed: ${mapErr.message}`);

  const brokenByQuiz = new Map<string, { status: string; atoms: string[] }>();
  for (const r of (mapRows ?? []) as unknown as Array<{
    quizzes: { slug: string; status: string } | null;
    quiz_atoms: { atom_key: string; status: string; options: unknown } | null;
  }>) {
    const a = r.quiz_atoms;
    const q = r.quizzes;
    if (!a || !q) continue;
    const broken = a.options === null || !["auto", "verified"].includes(a.status);
    if (!broken) continue;
    const e = brokenByQuiz.get(q.slug) ?? { status: q.status, atoms: [] };
    e.atoms.push(a.atom_key);
    brokenByQuiz.set(q.slug, e);
  }

  console.log(`\n→ quiz integrity — ${brokenByQuiz.size} assembled quiz(zes) reference a broken (optionless / non-ready) atom.`);
  if (brokenByQuiz.size === 0) {
    console.log("  none — every assembled quiz maps only ready atoms. ✓");
  } else {
    for (const [slug, e] of brokenByQuiz) {
      console.log(`  • ${slug} (${e.status}): ${e.atoms.join(", ")}`);
    }
    console.log(`\nRe-assemble these (the atom pool changed under them), or delete the stale quizzes.`);
  }
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
