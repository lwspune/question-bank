/**
 * Map each figure-bearing question of a chapter to its figure, by the number the
 * STEM prints, and emit the manifest attach-images.ts consumes.
 *
 *   npx tsx scripts/mh-ssc-10-text/map-figs.ts <chapterId>            # report only
 *   npx tsx scripts/mh-ssc-10-text/map-figs.ts <chapterId> --write    # write data/<id>.auto.fig.json
 *
 * Reads out/<id>.figures.json (from derive-figs.py) and the live rows.
 *
 * WHY THE JOIN IS ON THE PRINTED NUMBER AND NOT ON POSITION. A Balbharati stem
 * names its figure — "In figure 3.37, ..." — and the book prints "Fig. 3.37"
 * under (or beside) that exact diagram. Joining on that number makes the
 * question->figure mapping READ off the page rather than inferred from reading
 * order, which is the part that quietly goes wrong at scale: on the NCERT
 * Class-10 run the geometry was confident and 6 of 22 crops were wrong.
 *
 * WHAT IT REFUSES TO GUESS, and why each refusal matters more than the coverage
 * it costs:
 *   • A stem that says "in the adjoining figure" with NO number cannot be joined
 *     at all. Resolving it by position would be picking a figure by reading
 *     order, which is exactly the inference this design exists to avoid.
 *   • A number the catalogue lists TWICE (the book reprints one activity figure
 *     across two pages) has no single answer.
 *   • A number whose box the catalogue could not derive, or whose cluster was
 *     claimed by two captions — attaching a merged box shows the student the
 *     neighbouring figure as well as their own.
 * All three are listed as UNRESOLVED for hand-anchoring, never silently dropped
 * and never silently guessed.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, DATA, OUT, requireChapter } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** "In figure 3.37", "In fig 3.27", "(see Fig. 12.12)", "In the figure 7.46". */
const STEM_FIG = /\bfig(?:ure)?s?\.?\s*(\d+\.\d+)/gi;

export function figureNumbersIn(text: string): string[] {
  const out = new Set<string>();
  for (const m of text.matchAll(STEM_FIG)) out.add(m[1]);
  return [...out];
}

type CatEntry = { fig: string; page: number; bbox: [number, number, number, number] | null };
type Row = { id: string; question_number: string; text: string | null; context: string | null; image_url: string | null };

async function main() {
  const id = process.argv[2];
  if (!id) throw new Error("usage: map-figs.ts <chapterId> [--write]");
  const write = process.argv.includes("--write");
  const ch = requireChapter(id);

  const cat = JSON.parse(readFileSync(join(OUT, `${id}.figures.json`), "utf8")) as CatEntry[];
  const byFig = new Map<string, CatEntry[]>();
  for (const c of cat) byFig.set(c.fig, [...(byFig.get(c.fig) ?? []), c]);

  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await c
      .from("questions")
      .select("id,question_number,text,context,image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .order("id")
      .range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < 500) break;
  }

  const manifest: Array<{ ref: string; page: number; bbox: number[]; fig: string }> = [];
  const unresolved: string[] = [];
  let already = 0;

  for (const r of rows) {
    if (r.image_url) {
      already++;
      continue;
    }
    const body = `${r.text ?? ""}\n${r.context ?? ""}`;
    const nums = figureNumbersIn(body);
    const mentionsFigure = /\bfig(?:ure)?\b|\badjoining\b/i.test(body);
    if (!nums.length) {
      if (mentionsFigure) unresolved.push(`${r.question_number}  — names a figure but prints no number`);
      continue;
    }
    if (nums.length > 1) {
      unresolved.push(`${r.question_number}  — reads ${nums.length} figures (${nums.join(", ")})`);
      continue;
    }
    const hits = byFig.get(nums[0]);
    if (!hits?.length) {
      unresolved.push(`${r.question_number}  — Fig. ${nums[0]} is not in the catalogue`);
      continue;
    }
    if (hits.length > 1) {
      unresolved.push(`${r.question_number}  — Fig. ${nums[0]} printed on pages ${hits.map((h) => h.page).join(", ")}`);
      continue;
    }
    if (!hits[0].bbox) {
      unresolved.push(`${r.question_number}  — Fig. ${nums[0]} has no derivable box`);
      continue;
    }
    manifest.push({ ref: r.question_number, page: hits[0].page, bbox: hits[0].bbox, fig: nums[0] });
  }

  console.log(`${rows.length} rows | ${already} already carry an image`);
  console.log(`MAPPED     ${manifest.length}`);
  console.log(`UNRESOLVED ${unresolved.length}`);
  for (const u of unresolved) console.log(`  ${u}`);

  // ── THE HUMAN REVIEW GATE ──────────────────────────────────────────────────
  // Geometry finding a box is not the box being right, and this chapter proved
  // it again: the derivation was confident about all 40 boxes and PS3 Q.25's was
  // the pink "ICT Tools or Links" panel with one corner of the triangle. It
  // would have shipped as that question's figure.
  //
  // So a box reaches the bank only once a person has SEEN it on the contact
  // sheet and said so in data/<id>.figs-review.json. An unreviewed ref is held
  // back rather than attached — the failure direction is a question that still
  // needs its figure, never a question showing the wrong one.
  const reviewPath = join(DATA, `${id}.figs-review.json`);
  const review: { verified: string[]; rejected?: Record<string, string> } = existsSync(reviewPath)
    ? JSON.parse(readFileSync(reviewPath, "utf8"))
    : { verified: [] };
  const okRefs = new Set(review.verified);
  const passed = manifest.filter((m) => okRefs.has(m.ref));
  const held = manifest.filter((m) => !okRefs.has(m.ref));
  console.log(`\nREVIEWED   ${passed.length} of ${manifest.length} mapped boxes are signed off in ${id}.figs-review.json`);
  for (const h of held) console.log(`  HELD  ${h.ref} (Fig. ${h.fig}) — not reviewed`);
  for (const [ref, why] of Object.entries(review.rejected ?? {})) console.log(`  REJECTED ${ref} — ${why}`);

  // The candidate list is what the contact sheet renders. It has to be separate
  // from the manifest: the manifest holds only what has been signed off, so
  // reviewing from it would mean only ever looking at boxes already accepted.
  writeFileSync(join(OUT, `${id}.candidates.json`), JSON.stringify(manifest, null, 2) + "\n", "utf8");

  if (write) {
    const path = join(DATA, `${id}.auto.fig.json`);
    // DO NOT EMPTY A MANIFEST THAT ALREADY SHIPPED. A row that carries an image
    // is skipped above, so re-running this after a successful --apply maps ZERO
    // rows and would write an empty file over the committed record of what was
    // attached and from where. The images survive (attach-images is idempotent
    // and skips them), but the provenance would not.
    const existing = existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as unknown[]) : [];
    if (!passed.length && existing.length) {
      console.log(
        `\nREFUSING to overwrite ${path}: it holds ${existing.length} entries and this run mapped 0` +
          ` (every row already carries an image). Nothing to do.`,
      );
      return;
    }
    writeFileSync(path, JSON.stringify(passed, null, 2) + "\n", "utf8");
    console.log(`\nwrote ${path} (${passed.length} entries)`);
    if (held.length) {
      console.log(
        `\n${held.length} box(es) held back. To review: run contact-sheet.py, LOOK at every box,\n` +
          `then add the refs you accept to ${id}.figs-review.json and re-run.`,
      );
    }
    console.log(`Candidate boxes for review are in out/${id}.candidates.json.`);
  } else {
    console.log(`\n(report only; pass --write to emit data/${id}.auto.fig.json)`);
  }
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e?.message ?? e);
    process.exit(1);
  });
}
