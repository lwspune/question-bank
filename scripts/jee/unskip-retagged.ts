/**
 * Drop skip[] entries that a PREVIOUS subject's pass wrote, but which a re-tag
 * has since reassigned to the subject being ingested now.
 *
 *   npx tsx scripts/jee/unskip-retagged.ts <paperId> [--subject=Chemistry] [--apply]
 *
 * `skip[]` is paper-GLOBAL and keyed on question NUMBER, while subjects are
 * ingested in separate passes. On a compilation that is a trap: 2021-p13's
 * Physics pass skipped Q24-Q30 precisely BECAUSE they are chemistry, which was
 * the right call for that pass. `retag-compilation.ts` then made those numbers
 * Chemistry — so the Physics pass's skips now suppress exactly the questions
 * the Chemistry pass wants, and assemble-blind drops them with a bare "(skip)"
 * that looks like a deliberate decision.
 *
 * The rule: a skip survives only if it still names a question of ANOTHER
 * subject, or if THIS subject's agent independently skipped it. Anything else
 * is a stale cross-subject skip and is removed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { paperDataPath, recordsPath, requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";

export function staleSkips(
  skip: number[],
  subjectOf: Map<number, string>,
  subject: string,
  agentSkipped: Set<number>,
): number[] {
  return skip.filter((n) => subjectOf.get(n) === subject && !agentSkipped.has(n));
}

function main() {
  const paperId = requirePaperId(process.argv, 2, "unskip-retagged.ts <paperId> [--apply]");
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const apply = process.argv.includes("--apply");

  const paper = JSON.parse(readFileSync(paperDataPath(paperId), "utf8"));
  const skip: number[] = paper.skip ?? [];
  if (!skip.length) { console.log(`${paperId}: skip[] is empty — nothing to do.`); return; }

  const records = JSON.parse(readFileSync(recordsPath(paperId), "utf8")) as
    { questionNumber: number; subject: string }[];
  const subjectOf = new Map(records.map((r) => [r.questionNumber, r.subject]));

  const solPath = join("scripts/jee/out", `${paperId}_sol_${subject.slice(0, 4).toLowerCase()}.json`);
  let agentSkipped = new Set<number>();
  try {
    const sols = JSON.parse(readFileSync(solPath, "utf8")) as Record<string, { skip?: boolean }>;
    agentSkipped = new Set(Object.entries(sols).filter(([, e]) => e?.skip).map(([q]) => Number(q)));
  } catch {
    console.warn(`  (no ${solPath} — treating this subject's agent skips as none)`);
  }

  const stale = staleSkips(skip, subjectOf, subject, agentSkipped);
  const kept = skip.filter((n) => !stale.includes(n));

  console.log(`${paperId} [${subject}] skip[]: ${JSON.stringify(skip)}`);
  console.log(`  this subject's agent skipped: ${JSON.stringify([...agentSkipped].sort((a, b) => a - b))}`);
  console.log(`  STALE (now ${subject}, not agent-skipped): ${JSON.stringify(stale)}`);
  console.log(`  ${apply ? "kept" : "would keep"}: ${JSON.stringify(kept)}`);

  if (apply && stale.length) {
    paper.skip = kept;
    paper.notes =
      (paper.notes ?? "") +
      `\n[${subject} skip cleanup] Removed ${stale.join(", ")} from skip[]. These were written by an EARLIER ` +
      `subject's pass (skip[] is paper-global and keyed on question number), and the compilation re-tag has since ` +
      `reassigned them to ${subject}. Left in place they would silently suppress questions this pass answered.`;
    writeFileSync(paperDataPath(paperId), JSON.stringify(paper, null, 2) + "\n");
  }
}

if (require.main === module) main();
