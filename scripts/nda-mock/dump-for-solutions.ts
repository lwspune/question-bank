/**
 * Write a per-page-range handout for the SOLUTION transcription agents.
 *
 *   npx tsx scripts/nda-mock/dump-for-solutions.ts m9 [pagesPerChunk]
 *
 * Unlike `dump-blind`, this deliberately INCLUDES the settled answer. The
 * answers for this paper are already adjudicated — 108 of 120 agreed with the
 * text-layer key and the other 12 were settled by hand — so nothing is being
 * derived here and withholding the key would only make it harder to notice when
 * a printed solution does not match the question it is numbered as.
 *
 * That last point is the whole reason this handout exists rather than pointing
 * agents at the page images alone. FOUR of this paper's solution entries solve
 * an entirely DIFFERENT question from the one they are numbered as (the entry
 * headed "9." works out a mean and standard deviation while question 9 asks
 * when (z-1)/(z+1) is purely imaginary; likewise Q110, Q113 and Q116). An agent
 * transcribing pages blind would faithfully copy a foreign solution onto the
 * wrong row. Giving it the stem lets it check, and the brief tells it to.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { requirePaper, DATA, OUT } from "./config";
import type { ExtractedQuestion } from "./extract";

function main() {
  const paper = requirePaper(process.argv[2]);
  const perChunk = Number(process.argv[3] ?? 5);
  const qs: ExtractedQuestion[] = JSON.parse(
    readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"),
  );
  const byNumber = new Map(qs.map((q) => [q.number, q]));

  const dir = join(OUT, paper.id, "solwork");
  mkdirSync(dir, { recursive: true });

  const written: string[] = [];
  for (let from = 1; from <= paper.questionCount; from += perChunk * 5) {
    const to = Math.min(from + perChunk * 5 - 1, paper.questionCount);
    const out: string[] = [
      `# ${paper.label} — worked solutions for Q${from}-${to}`,
      "",
      "Each question below is printed with its SETTLED answer. Transcribe the",
      "worked solution for each from the rendered solution pages, and CHECK that",
      "the printed solution actually solves the question shown here.",
      "",
    ];
    for (let n = from; n <= to; n++) {
      const q = byNumber.get(n);
      if (!q) {
        out.push(`**Q${n}.** (not in the extract)`, "");
        continue;
      }
      out.push(`**Q${n}.** ${q.stem}`, "");
      for (const o of q.options) out.push(`  (${o.label}) ${o.text}`);
      out.push("", `  SETTLED ANSWER: ${q.answer ?? "(none)"}`, "");
    }
    const f = join(dir, `q${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")}.md`);
    writeFileSync(f, out.join("\n"), "utf8");
    written.push(f);
  }
  console.log(`wrote ${written.length} handout(s) to ${dir}`);
  for (const w of written) console.log("  " + w);
  console.log(`\nsolution page images: ${join(OUT, paper.id, "pages")}/sol-p*.png`);
}

main();
