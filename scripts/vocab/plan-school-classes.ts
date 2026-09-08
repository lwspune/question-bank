/**
 * Plan Part 1 as a CLASS LADDER rather than four letter bands.
 *
 *   npx tsx scripts/vocab/plan-school-classes.ts
 *   npx tsx scripts/vocab/plan-school-classes.ts --target=130 --write
 *
 * ═══ WHY THE LADDER IS FILED AT THE *LOWEST* CLASS ═══
 *
 * The source book prints a word in every class list that revises it, so its 676
 * words occupy 1,125 class slots and 188 of them (27.8%) appear in two or more.
 * `extract-docx.ts` therefore records `classes` as PROVENANCE and warns that it
 * is not a difficulty axis — Class 7 and Class 9 share 86% of the smaller list,
 * Class 11 and 12 share 75%.
 *
 * That warning stands against ordering the book BY the labels. It does not
 * stand against the question this ladder actually asks, which is different:
 * "which words should a student have by the end of Class N?" Under that reading
 * a word revised in Class 8 was already learnt in Class 5, so it belongs to
 * Class 5 and is printed ONCE. The redundancy disappears rather than doubling
 * the part.
 *
 * ═══ THE GAP IS THE POINT, NOT A DEFECT ═══
 *
 * Filing at the lowest class leaves the upper rungs thin — Class 9 keeps 21
 * words and Class 12 keeps 30 — precisely because those printed lists are
 * mostly re-runs of earlier ones. Those are the rungs to AUTHOR into, at the
 * vocabulary level of that class. This script sizes that work; it does not do
 * it, and it never invents a class for a word the source did not label.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");
const arg = (n: string, d: number) =>
  Number(process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d);
const TARGET = arg("target", 130);
const WRITE = process.argv.includes("--write");

export const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12] as const;

type SchoolWord = { word: string; meaning: string; classes: number[] };

(async () => {
  const src: SchoolWord[] = JSON.parse(readFileSync(join(DATA, "school-words.json"), "utf8"));
  const classOf = new Map<string, number>();
  for (const w of src) {
    if (!w.classes?.length) continue;
    classOf.set(w.word.toLowerCase(), Math.min(...w.classes));
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  // PAGED — PostgREST truncates a raw select at 1000 with no error, and a plan
  // computed over two thirds of the part would look perfectly reasonable.
  const rows: { word: string; chapter_slug: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,chapter_slug")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("part", "school")
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }

  const assigned: Record<number, string[]> = Object.fromEntries(CLASSES.map((c) => [c, []]));
  const unlabelled: string[] = [];
  for (const r of rows) {
    const c = classOf.get(r.word.toLowerCase());
    if (c === undefined) unlabelled.push(r.word);
    else assigned[c].push(r.word);
  }

  console.log(`Part 1 in the book : ${rows.length} words`);
  console.log(`labelled by source : ${rows.length - unlabelled.length}`);
  if (unlabelled.length) {
    // NOT auto-assigned. A word the source never labelled has no class, and
    // guessing one here would put an invented level behind a printed heading.
    console.log(`UNLABELLED (${unlabelled.length}) — need a hand-assigned class:`);
    console.log("  " + unlabelled.slice(0, 20).join(", ") + (unlabelled.length > 20 ? " …" : ""));
  }

  console.log(`\ntarget per rung    : ${TARGET}\n`);
  let gap = 0;
  for (const c of CLASSES) {
    const have = assigned[c].length;
    const need = Math.max(0, TARGET - have);
    gap += need;
    console.log(
      `  Class ${String(c).padStart(2)}  have ${String(have).padStart(3)}` +
        `   author ${String(need).padStart(3)}` +
        `   ->  ${String(Math.max(have, TARGET)).padStart(3)}`
    );
  }
  const total = CLASSES.reduce((n, c) => n + Math.max(assigned[c].length, TARGET), 0);
  console.log(`\n  authoring needed : ${gap} new entries`);
  console.log(`  Part 1 becomes   : ${total} words across ${CLASSES.length} rungs`);

  if (WRITE) {
    const out = join(DATA, "school-class-map.json");
    writeFileSync(
      out,
      JSON.stringify(
        {
          note:
            "word -> the class that FIRST introduces it in the CBSE lists. Provenance, " +
            "written by plan-school-classes.ts; do not hand-edit.",
          target: TARGET,
          map: Object.fromEntries(
            [...classOf.entries()].filter(([w]) => rows.some((r) => r.word.toLowerCase() === w))
          ),
        },
        null,
        2
      ) + "\n"
    );
    console.log(`\nwrote ${out}`);
  }
})();
