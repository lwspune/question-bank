/**
 * Split a blind review dump into per-solver batches.
 *
 *   npx tsx scripts/reviews/split-blind-dump.ts <paperId> <outDir> [batches]
 *
 * WHY THIS IS A SCRIPT AND NOT A ONE-LINER. On the 2026-08-27 Mock 2 review I
 * split the dump with an ad-hoc `node -e` that copied only
 * {questionId, qnum, text, options} — dropping `context`. Two set-bound
 * questions then reached the solvers as "What is V+W?" with V and W never
 * defined, came back NONE, and read as content defects until a solver diagnosed
 * the omission. That is the SAME defect the project log already records against
 * an earlier paper dump; the tool had been fixed and the hand-rolled splitter
 * reintroduced it.
 *
 * So: carry `context` and `setId` ALWAYS, and REFUSE to write if a row that has
 * a context in the dump would lose it — a blind pass on an unanswerable stem is
 * worse than no pass, because it manufactures findings.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Row = {
  questionId: string;
  questionNumber: string;
  context: string | null;
  setId: string | null;
  text: string;
  options: { label: string; text: string }[];
  solution: unknown;
};

function main() {
  const paperId = process.argv[2];
  const outDir = process.argv[3];
  const batches = Number(process.argv[4] ?? 8);
  if (!paperId || !outDir) {
    console.error("usage: split-blind-dump.ts <paperId> <outDir> [batches]");
    process.exit(2);
  }

  const dumpPath = join(process.cwd(), "scripts", "reviews", "data", `paper-${paperId}.review.json`);
  const rows = JSON.parse(readFileSync(dumpPath, "utf8")) as Row[];

  // The dump must be blind, or the "independent" derivation reads the answer.
  const leaked = rows.filter((r) => r.solution !== null && r.solution !== undefined);
  if (leaked.length) {
    console.error(
      `REFUSE: ${leaked.length} row(s) carry a solution — re-dump with --method=blind_rederivation.`
    );
    process.exit(1);
  }

  const out = rows.map((r) => ({
    questionId: r.questionId,
    qnum: r.questionNumber,
    context: r.context ?? null,
    setId: r.setId ?? null,
    text: r.text,
    options: r.options,
  }));

  const lost = out.filter((o, i) => rows[i].context && !o.context);
  if (lost.length) {
    console.error(`REFUSE: ${lost.length} row(s) would lose their context.`);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  const per = Math.ceil(out.length / batches);
  let written = 0;
  for (let i = 0; i < batches; i++) {
    const chunk = out.slice(i * per, (i + 1) * per);
    if (!chunk.length) continue;
    writeFileSync(join(outDir, `batch${i + 1}.json`), JSON.stringify(chunk, null, 1), "utf8");
    written += chunk.length;
    console.log(`batch${i + 1}.json  ${chunk.length} rows`);
  }
  if (written !== out.length) {
    console.error(`REFUSE: wrote ${written} of ${out.length} rows.`);
    process.exit(1);
  }
  const withCtx = out.filter((o) => o.context).length;
  console.log(`\n${written} rows across ${batches} batches | ${withCtx} carry a shared context`);
}

main();
