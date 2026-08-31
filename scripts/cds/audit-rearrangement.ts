/**
 * Triage probe: find Sentence-Rearrangement rows whose S6 is a COPY of one of
 * the jumbled sentences P/Q/R/S.
 *
 *   npx tsx scripts/cds/audit-rearrangement.ts            # whole chapter
 *   npx tsx scripts/cds/audit-rearrangement.ts 2019_2     # one source file
 *
 * THE DEFECT. An "ordering of sentences" item prints six sentences: S1 and S6
 * are given as the fixed first and last, and P/Q/R/S are the jumbled middle.
 * The ANSWER IS A SEQUENCE OF THE MIDDLE FOUR, so S6 is not decoration - it is
 * the terminal sentence every candidate ordering has to run into. Get S6 wrong
 * and the item is unanswerable while still LOOKING complete: six labelled
 * sentences, four plausible orderings, nothing malformed.
 *
 * Found 2026-08-30 on Eng_CDS_2019_2.pdf while reviewing that set for NDA GAT
 * Mock 4. Of its nine rows, ONE was clean. The rest fail in three distinct ways:
 *
 *   1. S6 is a byte-identical copy of S            (Q50, Q52)
 *   2. S6 is a copy of S with a word corrupted     (Q54 "She MET immediately to
 *      go" for "She SET OUT immediately"; Q55 "I LICKED the courage" for
 *      "I LACKED the courage")
 *   3. S6 and S are SWAPPED                        (Q49, Q51)
 *   4. S6 holds the printed P, and P holds a sentence belonging to a DIFFERENT
 *      QUESTION entirely                            (Q48, whose P is Q52's
 *      "There is a range of strategies by which the food is taken in ...", a
 *      food-digestion line inside a Gandhiji-at-Newcastle item)
 *
 * ⚠ THIS PROBE SEES ONLY CLASSES 1 AND 2, AND THAT LIMIT IS THE POINT.
 * A SWAP leaves S6 != S with both sentences present and well-formed, so no
 * within-row test can see it; class 4 likewise looks fine until the page is
 * opened. On the 2019-2 set the probe flags 4 of the 7 known-corrupt rows. So a
 * clean run is EVIDENCE, NEVER PROOF - the only complete check is reading the
 * printed booklet, and a paper the probe flags at all should be read in full
 * rather than repaired row by row.
 *
 * Containment rather than equality, because the corrupted-copy case differs by
 * one word and an equality test misses exactly the rows hardest to spot by eye.
 * Compared against ALL of P/Q/R/S, not just S: 2023-1 Q69 duplicates P.
 *
 * TRIAGE, NOT A GATE - exits 0. A flag is a row to open against the source, not
 * a verdict; the repair policy in scripts/cds/fix-keys.ts permits a stem repair
 * ONLY from the printed page.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const CHAPTER = "Sentence Rearrangement";
const THRESHOLD = 0.8;

const toks = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);

/** Fraction of the SMALLER sentence's vocabulary present in the larger. */
export function containment(a: string, b: string): number {
  const A = new Set(toks(a));
  const B = new Set(toks(b));
  // Very short sentences share function words by chance; below this a high
  // score carries no signal.
  if (A.size < 4 || B.size < 4) return 0;
  let hit = 0;
  for (const t of A) if (B.has(t)) hit++;
  return hit / Math.min(A.size, B.size);
}

/** Split a rearrangement stem into its labelled sentences. */
export function parseSentences(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*(S1|S6|P|Q|R|S)\s*:\s*(.+)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

async function main() {
  const filter = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const { data: chs, error: ce } = await db.from("chapters").select("id").eq("name", CHAPTER);
  if (ce) throw new Error(ce.message);
  const chapterIds = (chs ?? []).map((c) => c.id as string);
  if (!chapterIds.length) throw new Error(`no chapter named ${JSON.stringify(CHAPTER)}`);

  // Paged: a bare .select() is capped at 1000 rows by PostgREST.
  let all: { id: string; source_file: string | null; question_number: string | null; text: string }[] = [];
  for (let i = 0; ; i += 500) {
    const { data, error } = await db
      .from("questions")
      .select("id, source_file, question_number, text")
      .in("chapter_id", chapterIds)
      .range(i, i + 499);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    all = all.concat(data as typeof all);
    if (data.length < 500) break;
  }
  if (filter) all = all.filter((q) => (q.source_file ?? "").includes(filter));

  const byFile: Record<string, { n: number; bad: number }> = {};
  const flagged: string[] = [];
  let noS6 = 0;

  for (const q of all) {
    const f = q.source_file ?? "(no source_file)";
    byFile[f] ??= { n: 0, bad: 0 };
    byFile[f].n++;

    const d = parseSentences(q.text);
    if (!d.S6) {
      noS6++;
      continue;
    }
    let worst = 0;
    let which = "";
    for (const k of ["P", "Q", "R", "S"]) {
      if (!d[k]) continue;
      const c = containment(d.S6, d[k]);
      if (c > worst) {
        worst = c;
        which = k;
      }
    }
    if (worst >= THRESHOLD) {
      byFile[f].bad++;
      flagged.push(
        `  ${f} Q${String(q.question_number).padStart(3)}  S6 ~ ${which} ${(worst * 100).toFixed(0)}%  ${q.id}\n` +
          `      S6: ${d.S6.slice(0, 96)}\n` +
          `      ${which} : ${d[which].slice(0, 96)}`
      );
    }
  }

  console.log(`chapter        : ${CHAPTER}${filter ? `  (filtered: ${filter})` : ""}`);
  console.log(`rows scanned   : ${all.length}`);
  if (noS6) console.log(`no S6 parsed   : ${noS6}`);
  console.log(`\nS6 duplicates one of P/Q/R/S (>= ${THRESHOLD * 100}% token containment):`);
  for (const r of flagged.sort()) console.log(r);
  console.log(`\nflagged: ${flagged.length} of ${all.length}`);
  console.log(`\nby paper:`);
  for (const [f, v] of Object.entries(byFile).sort()) {
    if (v.bad) console.log(`  ${f}  ${v.bad}/${v.n}`);
  }
  console.log(
    `\nTriage only. This test is BLIND to a swapped S6/S and to a sentence copied in\n` +
      `from another question — both occur in Eng_CDS_2019_2.pdf and were found only by\n` +
      `reading the booklet. Treat any flagged paper as "read this section in full".`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
