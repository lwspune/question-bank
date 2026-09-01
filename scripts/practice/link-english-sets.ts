/**
 * Give NDA English PRACTICE questions the `set_id` their printed directions block
 * already implies.
 *
 *   npx tsx scripts/practice/link-english-sets.ts            # dry run
 *   npx tsx scripts/practice/link-english-sets.ts --apply
 *
 * THE DEFECT. A GAT English section is 50 questions in 7-10 DIRECTIONS BLOCKS,
 * and `scripts/bank-paper/english.ts` exists because the first HARD mock printed
 * 41 blocks for 50 questions. Its audit counts a block as `setId ?? "none-<i>"`,
 * so a row with no `set_id` is its own block — and of 946 free NDA English
 * practice rows only 65 carry one, all in Reading Comprehension and Cloze. A
 * paper drawn from the rest would print up to 50 one-question blocks: exactly the
 * shape that module was written to make unbuildable.
 *
 * THE STRUCTURE IS NOT MISSING, ONLY UNRECORDED - measured, not assumed. Grouping
 * the set-less rows that DO carry directions by (source_file, chapter, normalised
 * context) gives 32 groups holding 199 of 200 rows, with sizes
 * {3:1, 5:23, 9:1, 10:3, 12:1, 15:2}. Twenty-three groups of exactly five, which
 * is the modal real-GAT block size. These are printed blocks the practice ingest
 * never linked, so this is a data fix and not a paper-building workaround.
 *
 * HASH-NEUTRAL BY CONSTRUCTION. `contentHash` covers question + options + answer
 * (src/lib/upload/hash.ts); neither `context` nor `set_id` is an input. So no row
 * identity moves, no `paper_questions` membership is orphaned, and no re-commit is
 * needed - and the script ASSERTS every hash is unchanged rather than trusting
 * that reading. Same guarantee, and the same shape, as
 * scripts/cds/split-two-passage-sets.ts.
 *
 * WHY GROUP ON source_file TOO, not context alone. Different mock papers reuse
 * boilerplate directions verbatim ("Select the most appropriate option to fill in
 * the blank."). Keyed on context alone, four papers' blocks would merge into one
 * 40-question set that never appeared on any printed page, and R2/R5 would then
 * be enforcing a fiction. The chapter is in the key for the same reason: one
 * paper's Vocabulary and Grammar directions can coincide.
 *
 * Groups of ONE are left alone: `MIN_BLOCK_SIZE` is 2, so a single-row "set"
 * would trade a no-set row for an R4 violation.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { slugToUuid } from "../../src/lib/quiz/quizPayload";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

/** NDA English. Scoped by subject so no other subject can be touched. */
const ENGLISH_SUBJECT = "a952ec7f-601f-458b-8b6b-05cadbe72302";
const MIN_BLOCK_SIZE = 2;

/** Directions differing only in whitespace or case are the same printed block. */
const normContext = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

type Row = {
  id: string;
  chapter_id: string;
  set_id: string | null;
  context: string | null;
  source_file: string | null;
  content_hash: string;
  question_number: string | null;
  options: { text: string; label: string; is_correct: boolean }[];
  text: string;
};

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const { data: chs, error: ce } = await db.from("chapters").select("id, name").eq("subject_id", ENGLISH_SUBJECT);
  if (ce) throw new Error(ce.message);
  const chName = new Map((chs ?? []).map((c) => [c.id as string, c.name as string]));

  let rows: Row[] = [];
  for (let f = 0; ; f += 500) {
    const { data, error } = await db
      .from("questions")
      .select("id, chapter_id, set_id, context, source_file, content_hash, question_number, text, options(text, label, is_correct)")
      .in("chapter_id", [...chName.keys()])
      .eq("question_kind", "practice")
      .eq("visibility", "PUBLIC")
      .range(f, f + 499);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows = rows.concat(data as unknown as Row[]);
    if (data.length < 500) break;
  }

  // Every set_id already in use anywhere in the bank — a generated one must not collide.
  const existing = new Set<string>();
  for (let f = 0; ; f += 1000) {
    const { data, error } = await db.from("questions").select("set_id").not("set_id", "is", null).order("set_id").range(f, f + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) existing.add(r.set_id as string);
    if (!data || data.length < 1000) break;
  }

  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    if (r.set_id) continue;
    if (!r.context || !String(r.context).trim()) continue;
    // NUL as the separator, because source_file, chapter_id and the context all
    // contain spaces, so any printable joiner makes the key ambiguous. Written as
    // the ESCAPE, never as a literal byte: a literal NUL makes git treat the file
    // as binary and grep answer "Binary file matches" without searching it, which
    // silently removes the file from every text probe in the repo.
    const k = `${r.source_file ?? ""}\u0000${r.chapter_id}\u0000${normContext(String(r.context))}`;
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }

  // One deterministic uuid per source file, then :S1, :S2 … per block within it,
  // numbered by the block's first question number so the id tracks the printed
  // paper rather than whatever order the rows came back in.
  const bySource = new Map<string, [string, Row[]][]>();
  for (const [k, g] of groups) {
    if (g.length < MIN_BLOCK_SIZE) continue;
    const src = g[0].source_file ?? "(none)";
    bySource.set(src, [...(bySource.get(src) ?? []), [k, g]]);
  }

  const plan: { setId: string; rows: Row[]; chapter: string; src: string }[] = [];
  for (const [src, blocks] of bySource) {
    const uuid = slugToUuid(`nda-english-practice:${src}`);
    blocks.sort((a, b) => {
      const na = Math.min(...a[1].map((r) => Number(r.question_number) || 1e9));
      const nb = Math.min(...b[1].map((r) => Number(r.question_number) || 1e9));
      return na - nb;
    });
    blocks.forEach(([, g], i) => {
      const setId = `${uuid}:S${i + 1}`;
      if (existing.has(setId)) throw new Error(`generated set_id ${setId} already exists in the bank — refusing`);
      plan.push({ setId, rows: g, chapter: chName.get(g[0].chapter_id) ?? "?", src });
    });
  }

  // Hash guard: every row's stored hash must recompute from its CURRENT content,
  // and set_id is not an input, so nothing we are about to write can move it.
  const bad: string[] = [];
  for (const p of plan) {
    for (const r of p.rows) {
      const answer = r.options.find((o) => o.is_correct)?.label ?? "";
      const recomputed = contentHash(r.text, r.options.map((o) => o.text), answer);
      if (recomputed !== r.content_hash) bad.push(`${r.id} (${p.chapter})`);
    }
  }
  if (bad.length) {
    throw new Error(`stored content_hash does not recompute for ${bad.length} row(s) — refusing:\n  ${bad.slice(0, 8).join("\n  ")}`);
  }

  const singles = [...groups.values()].filter((g) => g.length < MIN_BLOCK_SIZE);
  const totalRows = plan.reduce((a, p) => a + p.rows.length, 0);

  console.log(`set-less English practice rows carrying directions: ${[...groups.values()].reduce((a, g) => a + g.length, 0)}`);
  console.log(`blocks to link : ${plan.length}   rows: ${totalRows}`);
  console.log(`left unlinked  : ${singles.reduce((a, g) => a + g.length, 0)} row(s) in ${singles.length} group(s) below MIN_BLOCK_SIZE ${MIN_BLOCK_SIZE}`);
  console.log(`content_hash recomputes for all ${totalRows} row(s): yes\n`);

  const bySize: Record<number, number> = {};
  for (const p of plan) bySize[p.rows.length] = (bySize[p.rows.length] ?? 0) + 1;
  console.log(`block-size histogram: ${JSON.stringify(bySize)}`);
  console.log(`\nplan:`);
  for (const p of plan) {
    console.log(`  ${p.setId}  ${String(p.rows.length).padStart(2)}  ${p.chapter.padEnd(24)} ${p.src}`);
  }

  if (!apply) {
    console.log(`\n[dry run] pass --apply to write.`);
    return;
  }

  let written = 0;
  for (const p of plan) {
    for (const r of p.rows) {
      const { error } = await db.from("questions").update({ set_id: p.setId }).eq("id", r.id).is("set_id", null);
      if (error) throw new Error(`${r.id}: ${error.message}`);
      written++;
    }
  }
  console.log(`\n${written} row(s) linked into ${plan.length} block(s).`);

  // Verify from the database rather than from the write returning no error.
  const ids = plan.flatMap((p) => p.rows.map((r) => r.id));
  let moved = 0;
  let mismatched = 0;
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select("id, set_id, content_hash").in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) {
      const before = plan.flatMap((p) => p.rows).find((r) => r.id === q.id)!;
      const want = plan.find((p) => p.rows.some((r) => r.id === q.id))!.setId;
      if (q.content_hash !== before.content_hash) moved++;
      if (q.set_id !== want) mismatched++;
    }
  }
  console.log(`verified: ${moved} hash(es) moved (expected 0), ${mismatched} set_id mismatch(es) (expected 0)`);
  if (moved || mismatched) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
