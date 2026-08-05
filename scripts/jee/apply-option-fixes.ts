/**
 * Copy agent-supplied `optionFix` blocks into a paper's `optionOverrides`.
 *
 *   npx tsx scripts/jee/apply-option-fixes.ts <paperId> [--subject=Chemistry] [--apply]
 *
 * Extraction sometimes drops a question's ENTIRE option block — on 2021-p15 the
 * source writes options inline (`\(a\) $Cr$ (b) $Fe$`) rather than on their own
 * lines, and `records.json` comes back with `options: null` for eleven rows in a
 * run. The agent recovers them verbatim from the source markdown and hands them
 * back as `optionFix`.
 *
 * Nothing was reading that. `assemble-blind` consults `optionFix` only for its
 * can-synthesize gate, so such a row passed the assembler with a letter answer
 * and then died at commit ("expected 4 options, got 0") — or, worse, was quietly
 * dropped. `commit.ts` CAN synthesize the option set, but only from
 * `optionOverrides`, and only when all four labels are present.
 *
 * Guards:
 *   - all four labels A-D, or nothing (a partial set cannot synthesize, and
 *     patching two of four would leave a malformed MCQ)
 *   - balanced delimiters and no surviving `$` in each option
 *   - a skipped row is never given options — it is not shipping
 *   - an existing override is never overwritten; a hand-authored fix outranks
 *     an agent's
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { paperDataPath, requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";

const LABELS = ["A", "B", "C", "D"] as const;

export function optionFixIssues(fix: Record<string, string>): string[] {
  const out: string[] = [];
  const have = LABELS.filter((l) => typeof fix[l] === "string" && fix[l].trim());
  if (have.length !== 4) out.push(`needs all four labels, has ${have.length ? have.join("") : "none"}`);
  for (const l of have) {
    const v = fix[l];
    if ((v.match(/\\\(/g) ?? []).length !== (v.match(/\\\)/g) ?? []).length) out.push(`(${l}) delimiters unbalanced`);
    if (v.includes("$")) out.push(`(${l}) still contains '$'`);
  }
  return out;
}

/** Agents have used both spellings; accept either rather than lose the work. */
function readFix(e: any): Record<string, string> | null {
  const raw = e?.optionFix ?? e?.optionOverrides ?? e?.optionOverride;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") out[k.trim().toUpperCase()] = v;
  }
  return Object.keys(out).length ? out : null;
}

function main() {
  const paperId = requirePaperId(process.argv, 2, "apply-option-fixes.ts <paperId> [--apply]");
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const apply = process.argv.includes("--apply");

  const solPath = join("scripts/jee/out", `${paperId}_sol_${subject.slice(0, 4).toLowerCase()}.json`);
  const sols = JSON.parse(readFileSync(solPath, "utf8")) as Record<string, any>;
  const paperPath = paperDataPath(paperId);
  const paper = JSON.parse(readFileSync(paperPath, "utf8"));

  const applied: string[] = [];
  const skippedRows: string[] = [];
  const alreadySet: string[] = [];
  const rejected: string[] = [];

  for (const [qn, e] of Object.entries(sols)) {
    const fix = readFix(e);
    if (!fix) continue;
    if (e.skip) { skippedRows.push(qn); continue; }
    if (paper.optionOverrides?.[qn]) { alreadySet.push(qn); continue; }
    const issues = optionFixIssues(fix);
    if (issues.length) { rejected.push(`Q${qn}: ${issues.join("; ")}`); continue; }
    paper.optionOverrides = {
      ...(paper.optionOverrides ?? {}),
      [qn]: Object.fromEntries(LABELS.map((l) => [l, fix[l]])),
    };
    applied.push(qn);
  }

  if (rejected.length) {
    console.error(`REFUSING ${paperId} — ${rejected.length} optionFix block(s) failed their guards:`);
    for (const r of rejected) console.error(`  ${r}`);
    process.exit(1);
  }

  console.log(`${paperId} [${subject}]: ${apply ? "applied" : "would apply"} ${applied.length} option fix(es)`);
  if (applied.length) console.log(`  Q${applied.join(", Q")}`);
  if (skippedRows.length) console.log(`  ignored (row is skipped): Q${skippedRows.join(", Q")}`);
  if (alreadySet.length) console.log(`  left alone (override already present): Q${alreadySet.join(", Q")}`);

  if (apply && applied.length) {
    paper.notes =
      (paper.notes ?? "") +
      `\n[${subject} option repair] Restored the full option block for Q${applied.join(", Q")} from the agent's ` +
      `verbatim recovery — extraction had returned no options for these rows, which commit.ts cannot ship.`;
    writeFileSync(paperPath, JSON.stringify(paper, null, 2) + "\n");
  }
}

if (require.main === module) main();
