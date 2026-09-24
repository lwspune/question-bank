/**
 * GROUNDING AUDIT — does every factual claim in an authored answer actually
 * appear in the chapter the answer was written from?
 *
 *   npx tsx scripts/stateboard/dump-text.ts <chapterId>      # prerequisite
 *   npx tsx scripts/stateboard/audit-grounding.ts <chapterId>
 *   npx tsx scripts/stateboard/audit-grounding.ts --all
 *
 * Added for the GEOGRAPHY lane (2026-09-24). The pure core lives in
 * scripts/lib/grounding.ts and is shared rather than copied — three pipelines
 * had each grown their own and they had drifted; see that file's header and
 * tests/grounding-core.test.ts.
 *
 * WHY THIS IS THE LOAD-BEARING GATE FOR GEOGRAPHY, unlike every other subject
 * in this pipeline. Maths has an end-of-book ANSWERS section, so step 6 of the
 * README diffs our answers against a printed key. Physics prints `[Ans: …]`
 * inline on ~38% of items; Chemistry on ~14%. Geography prints NOTHING: measured
 * across all 124 pages of SB_12th_Geography.pdf there is no answers section, no
 * inline key, and no worked example anywhere in the book. So step 6 cannot run
 * at all, every MCQ key is derived and every answer authored, and the failure
 * mode is no longer a wrong key — it is a FLUENT INVENTION: a real-sounding
 * place, figure, organisation or year the chapter never mentions.
 *
 * READ IT AS TRIAGE. A clean run is NOT proof of grounding — the probe cannot
 * see an invention phrased in ordinary lowercase words ("the region's output
 * tripled"). Exits 0 always.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { OUT, DATA, CHAPTERS, requireChapter } from "./config";
import { ungroundedTokens, type Hit } from "../lib/grounding";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function auditChapter(id: string): Promise<number> {
  const ch = requireChapter(id);
  const textPath = join(OUT, `${id}.text.md`);
  if (!existsSync(textPath)) {
    console.log(`\n${id}: SKIPPED — no ${textPath}. Run: npx tsx scripts/stateboard/dump-text.ts ${id}`);
    return 0;
  }
  let chapterText = readFileSync(textPath, "utf8");

  // Geography especially: a lot of a chapter's factual content is printed INSIDE
  // its maps and diagrams, and PyMuPDF cannot see those labels — they are vector
  // art, not text. Without this, every map-sourced fact reads as unsourced (on the
  // Class-9 Geography pilot, fig 2.18's plate names produced 12 false positives).
  // The optional data/<id>.figtext.json supplies that missing text, transcribed
  // off the rendered figure and attributed to it, so a real invention still
  // stands out.
  //
  // This matters MORE at Class 12 than it did at Class 9: these chapters carry
  // choropleth maps, flow diagrams and data tables whose region names, country
  // names and figures exist only as vector labels.
  const figPath = join(DATA, `${id}.figtext.json`);
  if (existsSync(figPath)) {
    const fig = JSON.parse(readFileSync(figPath, "utf8")) as {
      figures?: Record<string, string[]>;
    };
    const labels = Object.values(fig.figures ?? {}).flat();
    chapterText += "\n" + labels.join("\n");
    console.log(`  (+${labels.length} figure labels from ${id}.figtext.json)`);
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("question_number, source_row, solution")
    .eq("source_file", ch.sourceFile)
    .not("solution", "is", null)
    .order("source_row");
  if (error) throw error;

  const rows = data ?? [];
  const all: Hit[] = [];
  for (const r of rows) {
    for (const h of ungroundedTokens(r.solution as string, chapterText)) {
      all.push({ ...h, ref: r.question_number as string });
    }
  }

  console.log(`\n${ch.chapterName} (${ch.subjectName}) — ${rows.length} answered rows`);
  if (!all.length) {
    console.log("  ✓ every year and proper noun in every answer occurs in the chapter text.");
    return 0;
  }
  console.log(`  ${all.length} candidate(s) NOT found in the chapter — read each, this is triage:`);
  for (const h of all) console.log(`    ${h.ref.padEnd(18)} ${h.kind.padEnd(12)} ${h.token}`);
  return all.length;
}

async function main() {
  loadEnv();
  const arg = process.argv[2];
  // Default to the chapters this gate APPLIES to. Running it across the whole
  // CHAPTERS map would audit Maths/Physics/Chemistry answers against their own
  // chapter text, which is not wrong but is not the gate either — those lanes
  // have printed keys to diff against. `--all` still does everything.
  const ids =
    arg === "--all"
      ? Object.keys(CHAPTERS)
      : arg
        ? [arg]
        : Object.keys(CHAPTERS).filter((k) => CHAPTERS[k].subjectName === "Geography");
  if (!ids.length) {
    console.log("no chapters selected. Pass a chapterId, or --all.");
    return;
  }
  let total = 0;
  for (const id of ids) total += await auditChapter(id);
  console.log(
    `\n${total} candidate(s) across ${ids.length} chapter(s). Triage only — a clean run is NOT proof of grounding (it cannot see an invention phrased in lowercase).`
  );
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
