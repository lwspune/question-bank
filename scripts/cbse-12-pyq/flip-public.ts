/**
 * Flip the ship-ready CBSE board-PYQ rows to PUBLIC.
 *
 *   npx tsx scripts/cbse-12-pyq/flip-public.ts             # dry run — counts + reasons
 *   npx tsx scripts/cbse-12-pyq/flip-public.ts --apply     # write
 *   npx tsx scripts/cbse-12-pyq/flip-public.ts --paper 2026-65-1-1 [--apply]
 *
 * SCOPING IS THE FIRST THING THIS GETS RIGHT, because this exam is the only one
 * in the bank where a single exam_id holds two corpora that must not be confused:
 * 1,414 NCERT TEXTBOOK rows (`question_kind='practice'`, already PUBLIC, shipped
 * 2026-08-17) and 1,766 board PYQ rows (`question_kind='pyq'`, this ingest).
 * Every query below pins `question_kind='pyq'`. Without it a careless flip would
 * sweep the textbook corpus too — harmless today only because those rows are
 * already PUBLIC, which is exactly the kind of accident that stays invisible
 * until the day it isn't. `scan-flip` in scripts/jee learned this the hard way:
 * it matched on source_file alone and published two Maths rows that a previous
 * pass had deliberately withheld.
 *
 * THE SHIP RULE: a row is PUBLIC iff a student can get a trustworthy answer.
 *
 *   • SUBJECTIVE — needs `solution`. The solution IS the answer; without it the
 *     card reveals nothing and the row is worse than absent.
 *   • MCQ — needs `solution` AND exactly one correct option. A key alone is not
 *     enough: a bare letter with no working teaches nothing, and this corpus's
 *     whole value is CBSE's own marking-scheme method.
 *   • THE FIVE KEYLESS MCQs — CBSE printed no correct option and acknowledged it
 *     ("Give 1 Mark to those who have attempted as the correct option is not
 *     given"). They are PRESERVED as printed, so they carry 0 correct options BY
 *     DESIGN and the one-correct rule would hold them back forever. They ship
 *     iff they carry a solution that names the defect — the reader needs the
 *     explanation, which is the only answer that exists. The set is derived from
 *     the `_noCorrectOption` assertions in the transcription files rather than
 *     hardcoded, so a row that loses its flag stops being excused automatically.
 *
 * Anything held back is REPORTED WITH ITS REASON. A flip that prints only what
 * it published cannot be checked — the interesting number is what it refused.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { DATA, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Row = {
  id: string; question_number: string; source_file: string; visibility: string;
  question_format: string | null; solution: string | null; content_hash: string;
  options: { label: string; is_correct: boolean }[];
};

/** Rows CBSE printed with no correct option, asserted at transcription time. */
function assertedKeyless(): Set<string> {
  const out = new Set<string>();
  for (const f of readdirSync(DATA).filter((x) => x.endsWith(".questions.json"))) {
    const d = JSON.parse(readFileSync(join(DATA, f), "utf8")) as {
      questions: { stem: string; options?: { text: string }[]; answer?: string; _noCorrectOption?: boolean }[];
    };
    for (const q of d.questions) {
      if (q._noCorrectOption) out.add(contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? ""));
    }
  }
  return out;
}

/** null = ship it; a string = why it is held back. */
export function holdReason(r: Pick<Row, "question_format" | "solution" | "options">, keyless: boolean): string | null {
  const correct = r.options.filter((o) => o.is_correct).length;
  if (!(r.solution ?? "").trim()) return "no solution";
  if (r.question_format === "mcq") {
    if (keyless) return correct === 0 ? null : `asserted keyless but has ${correct} correct option(s)`;
    if (correct !== 1) return `${correct} correct option(s), need exactly 1`;
  }
  return null;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const pi = process.argv.indexOf("--paper");
  const paper = pi >= 0 ? process.argv[pi + 1] : null;
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    let q = client.from("questions")
      .select("id, question_number, source_file, visibility, question_format, solution, content_hash, options(label, is_correct)")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12)
      .eq("question_kind", "pyq")           // <- never the textbook corpus
      .order("source_file").order("question_number").range(from, from + 499);
    if (paper) q = q.eq("source_file", `cbse-12-pyq-${paper}`);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    rows.push(...(data as never as Row[]));
    if (!data || data.length < 500) break;
  }

  if (!rows.length) {
    console.log(`\n⚠  NOTHING SCANNED${paper ? ` for paper ${paper}` : ""} — this is NOT a clean result.`);
    process.exit(1);
  }

  const keyless = assertedKeyless();
  const ship: Row[] = [];
  const held = new Map<string, string[]>();
  for (const r of rows) {
    const why = holdReason(r, keyless.has(r.content_hash));
    if (why) {
      if (!held.has(why)) held.set(why, []);
      held.get(why)!.push(`${r.source_file.replace(/^cbse-12-pyq-/, "")} Q${r.question_number}`);
    } else if (r.visibility !== "PUBLIC") ship.push(r);
  }

  const alreadyPublic = rows.filter((r) => r.visibility === "PUBLIC").length;
  console.log(`scanned ${rows.length} pyq row(s)${paper ? ` in ${paper}` : ""}`);
  console.log(`  already PUBLIC: ${alreadyPublic}`);
  console.log(`  ready to flip:  ${ship.length}`);
  console.log(`  HELD BACK:      ${[...held.values()].reduce((n, v) => n + v.length, 0)}`);
  for (const [why, refs] of [...held.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`    ${why}: ${refs.length}`);
    if (refs.length <= 12) for (const ref of refs) console.log(`      ${ref}`);
  }

  if (!apply) { console.log(`\n[dry run] pass --apply to flip.`); return; }
  if (!ship.length) { console.log(`\nnothing to flip.`); return; }

  for (let i = 0; i < ship.length; i += 200) {
    const batch = ship.slice(i, i + 200).map((r) => r.id);
    const { error } = await client.from("questions").update({ visibility: "PUBLIC" }).in("id", batch);
    if (error) throw new Error(error.message);
  }
  console.log(`\ndone. ${ship.length} row(s) flipped to PUBLIC.`);
}

if (require.main === module) main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
