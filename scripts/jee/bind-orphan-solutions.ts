/**
 * Bind a run of solution blocks whose printed numbers collapsed to "1." during
 * pandoc conversion. The extractor keys by number, so every collapsed block
 * lands on the same question and the rest are stranded.
 *
 * Positional binding is only sound when the block count matches the question
 * count exactly, so that is asserted here rather than assumed — and callers
 * must also pass content ANCHORS (a question number plus a phrase its solution
 * must contain) so the alignment is proved at known points, not just counted.
 *
 *   npx tsx scripts/jee/bind-orphan-solutions.ts <paperId> <firstQ> <lastQ> \
 *       --anchor=3:refractive --anchor=24:galvanometer [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cleanText } from "./lib";
import { paperDataPath, requirePaperId } from "./config";

function main() {
  const apply = process.argv.includes("--apply");
  const paperId = requirePaperId(process.argv, 2, "bind-orphan-solutions.ts <paperId> <firstQ> <lastQ>");
  const firstQ = Number(process.argv[3]);
  const lastQ = Number(process.argv[4]);
  if (!Number.isFinite(firstQ) || !Number.isFinite(lastQ)) throw new Error("need <firstQ> <lastQ>");

  const anchors = process.argv
    .filter((a) => a.startsWith("--anchor="))
    .map((a) => {
      const [q, ...rest] = a.slice("--anchor=".length).split(":");
      return { q: Number(q), phrase: rest.join(":").toLowerCase() };
    });
  if (!anchors.length) throw new Error("refusing to bind without at least one --anchor=<q>:<phrase>");

  const solnMd = readFileSync(join("scripts/jee/out", `${paperId}_soln.md`), "utf8");

  // Split on the RAW printed markers and keep each one's number. The shared
  // helper strips numbers and discards short blocks, so it cannot be used to
  // prove alignment — and alignment is the whole safety question here.
  const marks = [...solnMd.matchAll(/^(\d{1,3})\.\s/gm)].map((m) => ({
    num: Number(m[1]),
    start: m.index!,
    bodyStart: m.index! + m[0].length,
  }));
  const blocks = marks.map((m, i) => solnMd.slice(m.bodyStart, marks[i + 1]?.start ?? solnMd.length));

  // The run being bound must be a contiguous prefix of collapsed markers, and
  // the marker immediately after it must carry its own true number — that pins
  // the right-hand edge, which is what a silent shift would break.
  const runIsCollapsed = marks.slice(firstQ - 1, lastQ).every((m) => m.num === marks[firstQ - 1].num);
  if (!runIsCollapsed) {
    throw new Error(`markers ${firstQ}..${lastQ} are not a single collapsed run — refusing to bind positionally`);
  }
  const next = marks[lastQ];
  if (!next || next.num !== lastQ + 1) {
    throw new Error(
      `positional binding is UNSAFE: the marker after Q${lastQ} reads "${next?.num ?? "none"}", not ${lastQ + 1} — the run's end is not pinned`,
    );
  }
  console.log(`run Q${firstQ}-Q${lastQ} all printed as "${marks[firstQ - 1].num}."; next marker is ${next.num} — edge pinned`);

  // Blocks are in paper order, so block i belongs to question i+1.
  const failures: string[] = [];
  for (const { q, phrase } of anchors) {
    const body = (blocks[q - 1] ?? "").toLowerCase();
    if (!body.includes(phrase)) failures.push(`Q${q} block does not contain "${phrase}"`);
  }
  if (failures.length) throw new Error(`anchor check FAILED — alignment not proven:\n  ${failures.join("\n  ")}`);
  console.log(`anchors OK (${anchors.map((a) => `Q${a.q}:"${a.phrase}"`).join(", ")})`);

  const paper = JSON.parse(readFileSync(paperDataPath(paperId), "utf8"));
  paper.authoredSolutions = paper.authoredSolutions ?? {};
  let bound = 0;
  for (let q = firstQ; q <= lastQ; q++) {
    const body = cleanText(blocks[q - 1] ?? "").trim();
    if (!body) { console.warn(`  Q${q}: empty block — skipped`); continue; }
    paper.authoredSolutions[String(q)] = body;
    bound += 1;
  }
  if (apply) writeFileSync(paperDataPath(paperId), JSON.stringify(paper, null, 2) + "\n");
  console.log(`${apply ? "bound" : "would bind"} ${bound} solutions for Q${firstQ}-Q${lastQ}`);
}

main();
