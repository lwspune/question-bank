/**
 * OMR-parity proof for "ocean-test-1".
 *
 * `verify-commit.ts` reports 4 failures on this paper because 14 of its 40 questions
 * are PRE-EXISTING bank rows that the content_hash dedup resolved to (they carry their
 * original source_file + question_number, e.g. NDA_GAT_W2.docx #81). That makes its
 * source-file / numbering / order checks unusable here — they all key on OUR numbering.
 *
 * This asserts the property those checks exist to protect, in a way the dedup path
 * cannot fool: for every printed question n, the row at paper position n must carry the
 * SAME stem, the SAME four option texts and the SAME correct letter as records[n].
 * That is exactly what a student bubbling Q1..Q40 against the printed paper relies on.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { PAPERS, DATA, type PaperRec } from "./config";

config({ path: join(process.cwd(), ".env.local"), override: true });

const PAPER_ID = "20b04975-778e-40f9-8934-efd64ba0a447";
const spec = PAPERS["ocean-test-1"];
const recs: PaperRec[] = JSON.parse(readFileSync(join(DATA, spec.recordsFile), "utf8"));

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: links, error } = await db
    .from("paper_questions")
    .select("position, questions(id, text, visibility, question_kind, source_file, options(label, text, is_correct))")
    .eq("paper_id", PAPER_ID)
    .order("position");
  if (error) throw error;
  if (!links) throw new Error("no rows");

  const fails: string[] = [];
  if (links.length !== recs.length) fails.push(`link count ${links.length} != ${recs.length} records`);

  links.forEach((l, i) => {
    const rec = recs[i];
    const q = l.questions as any;
    const at = `pos ${l.position} (printed Q${rec.n})`;
    if (!q) return void fails.push(`${at}: link resolves to no question`);
    if (norm(q.text) !== norm(rec.stem)) fails.push(`${at}: STEM differs from records file`);

    const opts: { label: string; text: string; is_correct: boolean }[] = q.options ?? [];
    if (opts.length !== 4) fails.push(`${at}: ${opts.length} options, expected 4`);
    const byLabel = Object.fromEntries(opts.map((o) => [o.label, o]));
    for (const lab of ["A", "B", "C", "D"] as const) {
      const want = (rec as any)[`opt${lab}`] as string;
      const got = byLabel[lab];
      if (!got) fails.push(`${at}: option ${lab} missing`);
      else if (norm(got.text) !== norm(want)) fails.push(`${at}: option ${lab} text differs`);
    }
    const correct = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (correct.length !== 1) fails.push(`${at}: ${correct.length} correct options`);
    else if (correct[0] !== rec.answer) fails.push(`${at}: KEY is ${correct[0]}, records say ${rec.answer}`);

    if (q.question_kind !== "practice") fails.push(`${at}: question_kind=${q.question_kind}`);

    // A record's `status` is what the DEDUP PASS concluded; it is not evidence about the
    // row the content_hash actually resolved to. Q19 is the worked example: the dedup pass
    // called it "new", content_hash then matched a byte-identical PRE-EXISTING row, and an
    // earlier version of this check keyed its note on `status !== "new"` and so said nothing
    // at all about it. Key on the ROW instead, so a foreign row is always surfaced.
    const foreign = q.source_file !== spec.sourceFile;
    if (foreign) {
      const why = rec.status === "new" ? "dedup pass said NEW — content_hash caught it" : `status=${rec.status}`;
      console.log(
        `  note  ${at}: reuses a pre-existing row from "${q.source_file}" [${q.visibility}] (${why})` +
          ` — flip-public matches on source_file, so this row is NOT ours to publish`,
      );
    } else if (rec.status !== "new" && q.visibility === "PUBLIC") {
      fails.push(`${at}: OUR ${rec.status} row is PUBLIC — the dedup gate has leaked`);
    }
  });

  // positions must be 1..N with no gaps or repeats
  const pos = links.map((l) => l.position);
  if (JSON.stringify(pos) !== JSON.stringify(recs.map((_, i) => i + 1)))
    fails.push(`positions are not contiguous 1..${recs.length}: ${pos.join(",")}`);

  console.log(`\nOMR parity for "${spec.title}" — ${links.length} paper links vs ${recs.length} records`);
  if (fails.length) {
    console.log("\nFAILED:");
    for (const f of fails) console.log("  - " + f);
    process.exit(1);
  }
  console.log("  ok  every position holds its printed question: stem, all 4 options and key match");
  console.log("  ok  positions contiguous 1..40, every row question_kind='practice'");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
