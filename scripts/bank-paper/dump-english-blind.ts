/**
 * BLIND dump of CDS English candidate sets, for re-deriving their keys.
 *
 * WHY THIS EXISTS. `scripts/bank-paper/build.ts` carries a warning that CDS
 * English was rejected after a blind re-derivation found "8 defects in 24, a
 * 33% rate", citing three keys that name "the exact ANTONYM of the target word"
 * (magniloquent -> terse, originates -> culminates, vulnerable -> impervious).
 *
 * All three are ANTONYM questions. Their `context` reads "Directions: opposite
 * in meaning to the underlined word", their three distractors are synonyms of
 * the target, and the keyed antonym is correct. The earlier pass almost
 * certainly ran WITHOUT the context and so read them as synonym items.
 *
 * Hence the load-bearing detail here: **the directions travel with the
 * question**. A shared-context corpus cannot be re-derived from stem + options
 * alone; the instruction is the half that says what is being asked.
 *
 * The key and the stored solution are withheld AT DUMP TIME rather than by
 * asking the reader not to look — a check whose input contains the answer is
 * not blind. They are written to a separate file the deriving agents are never
 * given.
 *
 *   npx tsx scripts/bank-paper/dump-english-blind.ts <outDir>
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const [outDir, configPath] = process.argv.slice(2);
if (!outDir) throw new Error("usage: dump-english-blind.ts <outDir> [configJson]");

/** How many questions to verify per chapter — ~2x the blueprint need, so a
 *  failed row can be dropped without re-running the whole check. */
const DEFAULT_WANT: Record<string, number> = {
  Grammar: 30,
  Vocabulary: 30,
  "Sentence Rearrangement": 10,
  "Idioms and Phrases": 10,
  "Spotting Errors": 10,
  "Reading Comprehension": 5, // the single surviving real passage set
};
const WANT: Record<string, number> = configPath
  ? (JSON.parse(require("node:fs").readFileSync(configPath, "utf8")) as Record<string, number>)
  : DEFAULT_WANT;

const DIFF_RANK: Record<string, number> = { HARD: 2, MODERATE: 1, EASY: 0 };

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  set_id: string | null;
  context: string | null;
  text: string;
  difficulty: string;
  chapter: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  // Pull the whole CDS English corpus once; grouping and ranking happen here so
  // the ordering matches selectWholeSets (mean difficulty, HARD count, set id).
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, question_number, source_file, set_id, context, text, difficulty, chapters!inner(name, subjects!inner(name, exams!inner(name))), options(label, text, is_correct)"
      )
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    for (const r of data as any[]) {
      const exam = r.chapters?.subjects?.exams?.name ?? "";
      if (!exam.toUpperCase().includes("CDS")) continue;
      rows.push({ ...r, chapter: r.chapters.name });
    }
    if (data.length < 1000) break;
  }

  // Already committed to a paper, or already carrying a confirmed review.
  // Verifying either again is wasted work: a used row cannot be drawn a second
  // time, and a confirmed row is usable as it stands.
  const skip = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("paper_questions").select("question_id").order("question_id").range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) skip.add(r.question_id as string);
    if (!data || data.length < 1000) break;
  }
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("question_reviews").select("question_id").eq("verdict", "confirmed")
      .order("question_id").range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) skip.add(r.question_id as string);
    if (!data || data.length < 1000) break;
  }

  // Group into sets, dropping anything whose passage was never stored and any
  // set the corpus holds with fewer than 2 questions (R4).
  const sets = new Map<string, Row[]>();
  const dropped = new Set<string>();
  for (const r of rows) {
    if (!r.set_id) continue;
    if ((r.context ?? "").toLowerCase().includes("not stored")) continue;
    if (!(r.chapter in WANT)) continue;
    // A set holding ANY skipped row cannot be drawn whole, so drop the set
    // rather than emit a fragment R2 would refuse.
    if (skip.has(r.id)) { dropped.add(r.set_id); continue; }
    if (!sets.has(r.set_id)) sets.set(r.set_id, []);
    sets.get(r.set_id)!.push(r);
  }

  for (const d of dropped) sets.delete(d);
  const ranked = [...sets.entries()]
    .map(([setId, items]) => {
      const mean =
        items.reduce((s, i) => s + (DIFF_RANK[i.difficulty] ?? 0), 0) / items.length;
      return {
        setId,
        chapter: items[0].chapter,
        items: items.sort(
          (a, b) => Number(a.question_number ?? 0) - Number(b.question_number ?? 0)
        ),
        mean,
        hard: items.filter((i) => i.difficulty === "HARD").length,
      };
    })
    .filter((s) => s.items.length >= 2)
    .sort(
      (a, b) => b.mean - a.mean || b.hard - a.hard || a.setId.localeCompare(b.setId)
    );

  const picked: typeof ranked = [];
  const budget = { ...WANT };
  for (const s of ranked) {
    const left = budget[s.chapter] ?? 0;
    if (left <= 0) continue;
    if (s.items.length > left) continue; // whole sets only — never a fragment
    picked.push(s);
    budget[s.chapter] = left - s.items.length;
  }

  mkdirSync(outDir, { recursive: true });

  // ── the BLIND file: no is_correct, no solution ──────────────────────────────
  const blind = picked.flatMap((s) =>
    s.items.map((q) => ({
      id: q.id,
      chapter: s.chapter,
      setId: s.setId,
      sourceFile: q.source_file,
      questionNumber: q.question_number,
      directions: q.context, // LOAD-BEARING — see the header
      stem: q.text,
      options: q.options
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((o) => ({ label: o.label, text: o.text })), // is_correct dropped
    }))
  );

  // ── the KEY file: never given to a deriving agent ───────────────────────────
  const keys = picked.flatMap((s) =>
    s.items.map((q) => ({
      id: q.id,
      storedKey: q.options.find((o) => o.is_correct)?.label ?? null,
    }))
  );

  writeFileSync(join(outDir, "blind.json"), JSON.stringify(blind, null, 1), "utf8");
  writeFileSync(join(outDir, "stored-keys.json"), JSON.stringify(keys, null, 1), "utf8");

  const leftover = Object.entries(budget).filter(([, n]) => n > 0);
  console.log(`blind dump: ${blind.length} question(s) across ${picked.length} set(s)`);
  for (const c of Object.keys(WANT)) {
    const n = blind.filter((b) => b.chapter === c).length;
    console.log(`  ${c.padEnd(24)} ${String(n).padStart(3)} of ${WANT[c]} wanted`);
  }
  if (leftover.length) {
    console.log(
      `\nshortfall (no whole set fits the remaining budget): ` +
        leftover.map(([c, n]) => `${c} -${n}`).join(", ")
    );
  }
  const noDirections = blind.filter((b) => !b.directions || !b.directions.trim());
  if (noDirections.length) {
    console.log(`\nWARNING: ${noDirections.length} question(s) carry NO directions (R7).`);
  }
  console.log(`\n-> ${join(outDir, "blind.json")}  (give THIS to the agents)`);
  console.log(`-> ${join(outDir, "stored-keys.json")}  (withhold)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
