/**
 * Flip a committed mock paper PUBLIC, once its blind cross-check has cleared it.
 *
 *   npx tsx scripts/nda-mock/flip-public.ts w1                    # dry-run
 *   npx tsx scripts/nda-mock/flip-public.ts w1 --apply
 *   npx tsx scripts/nda-mock/flip-public.ts w1 --apply --except=41,57
 *   npx tsx scripts/nda-mock/flip-public.ts w1 --apply --force    # publish over a BLOCKING row
 *
 * This step was missing: of the fifteen ingestion pipelines in the repo, this
 * was the only one without a flip, and its README said "Review, then flip
 * PUBLIC" with no command underneath. All fourteen committed papers had
 * therefore sat PRIVATE since ingest — an unfinished step rather than a
 * decision to withhold them.
 *
 * Two classes of report, and only one of them stops the flip:
 *
 *   BLOCKING — the stem cites a figure the row does not carry. Such a question
 *     is unanswerable, and publishing it is worse than holding it: the reader
 *     cannot tell whether the figure is missing or they have misread the
 *     question. `--except` is the intended remedy; `--force` exists for the
 *     case where a human has looked and disagrees, and says so on the console.
 *
 *   ADVISORY — a row with no worked solution, or one rendering `--` where a
 *     minus belongs. Neither is withheld, and the no-solution count in
 *     particular should NOT be read as a defect: 17.8% of the PUBLIC practice
 *     corpus already has no solution (4,737 of 26,585 rows), so these papers
 *     are inside the norm, not outside it. Reported so the number is a decision
 *     rather than a surprise.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requirePaper, EXAM_ID } from "./config";
import { referencesMissingFigure } from "./parse";

type Row = {
  id: string;
  question_number: string | null;
  text: string;
  solution: string | null;
  image_url: string | null;
  visibility: string;
};

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const exceptArg = process.argv.find((a) => a.startsWith("--except="));
  const except = exceptArg
    ? exceptArg.slice("--except=".length).split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  // Paged deliberately: a 120-row paper fits in one page today, but a bare
  // .select() silently truncates at 1000 and every count below is derived from
  // the payload rather than from a header.
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("id,question_number,text,solution,image_url,visibility")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...(data as Row[]));
    if (data.length < 1000) break;
  }

  if (!rows.length) {
    throw new Error(`no rows for ${paper.sourceFile} — commit the paper first`);
  }

  const held = new Set(except);
  const candidates = rows.filter((r) => !held.has(String(r.question_number ?? "")));
  const alreadyPublic = rows.filter((r) => r.visibility === "PUBLIC").length;

  const blocking = candidates.filter((r) => referencesMissingFigure(r.text, r.image_url));
  const noSolution = candidates.filter((r) => !r.solution || r.solution.trim().length < 5);
  const enDash = candidates.filter((r) => r.text.includes("--") || (r.solution ?? "").includes("--"));

  console.log(`\n=== ${paper.label} — ${paper.sourceFile} ===`);
  console.log(`rows: ${rows.length}   already PUBLIC: ${alreadyPublic}   held by --except: ${rows.length - candidates.length}`);
  console.log(`to flip: ${candidates.length}`);

  if (noSolution.length) {
    console.log(
      `\nADVISORY — ${noSolution.length} row(s) carry no worked solution ` +
        `(the PUBLIC practice corpus already runs ~17.8% without one):`,
    );
    console.log(`  Q${noSolution.map((r) => r.question_number).join(", Q")}`);
  }
  if (enDash.length) {
    console.log(`\nADVISORY — ${enDash.length} row(s) contain '--' (pandoc's en dash, used here as a minus sign):`);
    console.log(`  Q${enDash.map((r) => r.question_number).join(", Q")}`);
  }

  if (blocking.length) {
    console.log(`\nBLOCKING — ${blocking.length} row(s) cite a figure the row does not carry:`);
    for (const r of blocking) {
      console.log(`  Q${r.question_number}: ${r.text.replace(/\s+/g, " ").slice(0, 95)}`);
    }
    if (!force) {
      console.log(
        `\nrefusing to flip. Attach the figures, or re-run with ` +
          `--except=${blocking.map((r) => r.question_number).join(",")} to publish the rest, ` +
          `or --force if you have looked and disagree.`,
      );
      process.exitCode = 1;
      return;
    }
    console.log("\n--force given: publishing these anyway.");
  }

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing changed.");
    return;
  }

  const ids = candidates.map((r) => r.id);
  let flipped = 0;
  for (let i = 0; i < ids.length; i += 200) {
    // Chunked at 200: `.in()` puts the list in the URL, and a few hundred uuids
    // exceeds the request-line limit (this repo has hit a bare Bad Request at 833).
    const { error, count } = await client
      .from("questions")
      .update({ visibility: "PUBLIC" }, { count: "exact" })
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    flipped += count ?? 0;
  }
  console.log(`\nflipped ${flipped} row(s) PUBLIC.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
