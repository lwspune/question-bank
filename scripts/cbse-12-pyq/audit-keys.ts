/**
 * Structural answer-key probe for the CBSE Class-12 board PYQ MCQs.
 *
 *   npx tsx scripts/cbse-12-pyq/audit-keys.ts              # all 659 pyq MCQs
 *   npx tsx scripts/cbse-12-pyq/audit-keys.ts 2023         # source_file substring
 *
 * WHY THIS EXISTS. The repo has two copies of this probe and NEITHER can see
 * these rows: `npm run audit:keys` scopes to `question_kind='practice'` and these
 * are `pyq`, so it correctly refuses with "NOTHING SCANNED" rather than
 * reporting a false clean; and `scripts/jee/audit-keys.ts` is pinned to the JEE
 * exam id. So the structural check simply had no home for this corpus. It reuses
 * `auditRow` VERBATIM from the practice probe — a second implementation would be
 * free to disagree with the first, which is the whole failure being avoided.
 *
 * WHAT IT CATCHES: a solution that concludes a DIFFERENT option letter than the
 * stored key; duplicate option texts; and not-exactly-one-correct. It is
 * zero-LLM and it is TRIAGE — source-verify a flag against the paper before
 * touching a key.
 *
 * WHAT IT CANNOT CATCH: a stealth wrong key, i.e. a solution that is internally
 * consistent and simply wrong. That was the central finding of the 2026-06-03
 * bank-wide audit and only re-derivation reaches it.
 *
 * A NOTE ON SIGNAL for this corpus specifically: the SOLUTION_BRIEF tells authors
 * to name option TEXTS rather than letters ("which is option (A) 6"), because a
 * bare letter goes stale if options are ever reordered. That phrasing still
 * carries a letter, so SOLN≠KEY does fire here — unlike the JEE corpus, whose
 * solutions conclude with a bare value and where the class barely fires at all.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { auditRow } from "../practice/audit-keys";
import { contentHash } from "../../src/lib/upload/hash";
import { DATA, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Opt = { label: string; text: string; is_correct: boolean };

/**
 * Questions CBSE printed with NO correct option, asserted at transcription time
 * via `_noCorrectOption` and committed keyless on purpose (see the README's
 * "CBSE-acknowledged defects — all PRESERVED"). They read as STRUCT(4opt,0corr)
 * and are EXPECTED.
 *
 * They are LABELLED, not silenced: the count of genuine flags can then reach a
 * meaningful zero, while a keyless row that nobody asserted still shows up. The
 * set is derived from the transcription files rather than hardcoded, so it
 * cannot rot — a row that loses its flag stops being excused automatically.
 */
function assertedKeyless(): Set<string> {
  const out = new Set<string>();
  for (const f of readdirSync(DATA).filter((x) => x.endsWith(".questions.json"))) {
    const d = JSON.parse(readFileSync(join(DATA, f), "utf8")) as {
      questions: { stem: string; options?: { text: string }[]; answer?: string; _noCorrectOption?: boolean }[];
    };
    for (const q of d.questions) {
      if (!q._noCorrectOption) continue;
      // Committed with an empty answer, which is what makes them keyless.
      out.add(contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? ""));
    }
  }
  return out;
}

async function main() {
  const filter = process.argv[2];
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Page the RESULT: this exam holds 1,766 pyq rows and PostgREST truncates a
  // bare .select() at 1000 with no error.
  const rows: { id: string; question_number: string; source_file: string; solution: string | null; content_hash: string; options: Opt[] }[] = [];
  for (let from = 0; ; from += 500) {
    let q = client.from("questions")
      .select("id, question_number, source_file, solution, content_hash, options:options(label, text, is_correct)")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12)
      .eq("question_kind", "pyq").eq("question_format", "mcq")
      .order("source_file").order("question_number").range(from, from + 499);
    if (filter) q = q.ilike("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    rows.push(...(data as never as typeof rows));
    if (!data || data.length < 500) break;
  }

  if (!rows.length) {
    console.log(`\n⚠  NOTHING SCANNED — no pyq MCQ has a source_file containing "${filter}".`);
    console.log(`   This is NOT a clean result.`);
    // ...EXCEPT for 2022, where it is the correct and permanent answer.
    // Measured across the whole corpus: 2022 holds 140 pyq rows and ZERO MCQs,
    // against 156-185 per year for 2023-2026. That is not a gap in our
    // transcription — 2022 was the COVID-era Term-2 exam, a shorter paper with
    // a different structure that set no objective section at all. So a 2022
    // filter can only ever refuse, and refusing is right: this probe's whole
    // job is to compare a solution's concluded letter against a stored key, and
    // there are no keys here to compare against.
    if (/^2022/.test(filter ?? "")) {
      console.log(`   For 2022 specifically this is EXPECTED and permanent: the Term-2 paper`);
      console.log(`   set no MCQs at all (140 pyq rows, 0 mcq). Nothing to scan, not a bug.`);
    }
    process.exit(1);
  }

  const keyless = assertedKeyless();
  const flags: string[] = [];
  const expected: string[] = [];
  let noSolution = 0;
  for (const r of rows) {
    if (!r.solution) noSolution++;
    const f = auditRow(r.options, r.solution);
    if (!f) continue;
    // Only the KEYLESS verdict is excused, and only on a row that asserted it.
    // Any other finding on the same row still counts.
    if (keyless.has(r.content_hash) && /0corr/.test(f)) {
      expected.push(`${r.source_file} Q${r.question_number}: ${f}`);
    } else {
      flags.push(`${r.source_file} Q${r.question_number}: ${f}`);
    }
  }

  console.log(`Scanned ${rows.length} pyq MCQ(s)${filter ? ` (source ~ "${filter}")` : ""}`);
  console.log(`  without a solution (auditRow cannot judge these): ${noSolution}`);
  if (expected.length) {
    console.log(`  ${expected.length} EXPECTED keyless row(s) — CBSE printed no correct option, asserted at transcription:`);
    for (const e of expected) console.log(`    ${e}`);
  }
  console.log(`  flagged: ${flags.length}`);
  for (const f of flags) console.log(`    ${f}`);
  if (!flags.length) console.log(`\nclean.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
