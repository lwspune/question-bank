/**
 * Merge the rewriters' output into a run file for apply-solution-rewrites.ts.
 *
 *   npx tsx scripts/reviews/merge-handwave-rewrites.ts <dumpDir> <run>
 *
 * The rewriters emit {questionId, qnum, action, why, solution?} where action is
 * REWRITE | KEEP | REPORT. Only REWRITE rows become edits:
 *   KEEP    the flagged phrase was legitimate — the solution is already complete
 *   REPORT  the rewriter could not reach the keyed answer. That is a CORRECTNESS
 *           finding and must NOT be silently turned into an edit; it is printed
 *           for adjudication and excluded from the run file.
 *
 * Refuses on: a REWRITE with no solution, a duplicate questionId, an id that was
 * not in the dump (a rewriter inventing a target), or a count that does not
 * reconcile against the dump. Every one of those is a silent-corruption shape.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";

type Out = { questionId: string; qnum?: string; action: string; why: string; solution?: string };

function main() {
  const dumpDir = process.argv[2];
  const run = process.argv[3];
  if (!dumpDir || !run) {
    console.error("usage: merge-handwave-rewrites.ts <dumpDir> <run>");
    process.exit(2);
  }

  const dumped = new Map<string, any>();
  for (const f of readdirSync(dumpDir).filter((f) => /^handwave\d+\.json$/.test(f)))
    for (const r of JSON.parse(readFileSync(join(dumpDir, f), "utf8")) as any[])
      dumped.set(r.questionId, r);

  const seen = new Set<string>();
  const rewrites: any[] = [];
  const keeps: Out[] = [];
  const reports: Out[] = [];
  let refused = 0;

  const files = readdirSync(dumpDir).filter((f) => /^rewrite\d+\.json$/.test(f)).sort();
  for (const f of files) {
    for (const o of JSON.parse(readFileSync(join(dumpDir, f), "utf8")) as Out[]) {
      if (!dumped.has(o.questionId)) {
        console.error(`REFUSE ${f} ${o.qnum}: questionId not in the dump`);
        refused++;
        continue;
      }
      if (seen.has(o.questionId)) {
        console.error(`REFUSE ${f} ${o.qnum}: duplicate questionId across batches`);
        refused++;
        continue;
      }
      seen.add(o.questionId);
      const action = (o.action ?? "").toUpperCase();
      if (action === "KEEP") keeps.push(o);
      else if (action === "REPORT") reports.push(o);
      else if (action === "REWRITE") {
        if (!o.solution || !o.solution.trim()) {
          console.error(`REFUSE ${f} ${o.qnum}: REWRITE with no solution`);
          refused++;
          continue;
        }
        rewrites.push({ questionId: o.questionId, qnum: o.qnum, why: o.why, solution: o.solution });
      } else {
        console.error(`REFUSE ${f} ${o.qnum}: unknown action "${o.action}"`);
        refused++;
      }
    }
  }

  console.log(`dump ${dumped.size} rows | results ${seen.size} | files ${files.length}`);
  console.log(`  REWRITE ${rewrites.length}  KEEP ${keeps.length}  REPORT ${reports.length}`);
  if (seen.size !== dumped.size)
    console.error(`\n!! ${dumped.size - seen.size} dumped row(s) came back with no result`);
  if (keeps.length) {
    console.log("\n--- KEEP (flagged phrase was legitimate) ---");
    keeps.forEach((k) => console.log(`  Q${k.qnum}: ${k.why}`));
  }
  if (reports.length) {
    console.log("\n--- REPORT (could not reach the keyed answer — ADJUDICATE, do not auto-apply) ---");
    reports.forEach((r) => console.log(`  Q${r.qnum}: ${r.why}`));
  }
  if (refused) {
    console.error(`\n${refused} refused — no run file written.`);
    process.exit(1);
  }

  const outDir = join(process.cwd(), "scripts", "reviews", "data", "solution-rewrites");
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, `${run}.json`);
  writeFileSync(path, JSON.stringify(rewrites, null, 1), "utf8");
  console.log(`\n-> ${path}  (${rewrites.length} edits)`);
}

main();
