/**
 * Merge the per-lane solution files into the transcription, under the style gate.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/apply-solutions.ts <paperId>           # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/paper/apply-solutions.ts <paperId> --apply
 *
 * Reads every out/<id>/solutions-*.json and writes `solution` onto the matching
 * question in data/<id>.questions.json.
 *
 * WHY ONE FILE PER LANE. Solutions are authored by several passes working at
 * once. Pointing them all at the shared transcription would make the last writer
 * win and lose the rest silently; a per-lane file makes the hand-off explicit and
 * lets this step check it. The checks that matter:
 *
 *  - TWO LANES CLAIMING THE SAME REF IS AN ERROR, not a merge. Two independent
 *    answers to one question means a lane worked outside its assignment, and
 *    picking either one hides that.
 *  - A ref no lane covered is reported, both directions, against the paper's own
 *    ref list — a lane that quietly wrote 7 of its 9 looks identical to success
 *    if you only count files.
 *  - Every solution goes through `probeBoardAnswer`. Its ERRORS block: each one
 *    is a construction the brief forbids and each was written by a real authoring
 *    pass before the probe existed. Warnings are reported and do not block.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { PAPERS, requirePaper, questionsJsonPath, pagesDir } from "./config";
import { probeBoardAnswer, isNumericalStem } from "../../lib/boardAnswerStyle";
// The SAME normaliser commitStaged's guard uses, never a second regex.
//
// This file's first version tested `text.includes(backslash + "n")` and
// immediately rejected a CORRECT solution, because plenty of legitimate LaTeX
// commands begin with that pair — neq, nabla, nu. The normaliser masks math
// zones, so it does not make that mistake; the project's convention is
// "detection is normalizeNewlines(v) !== v" for exactly this reason.
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";
import { grammarFor } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

/** Unicode maths the brief forbids — the same list verify.ts enforces on stems. */
const UNICODE_MATH = /[∧∨∼≡→↔∫∑√∞≠±×÷≤≥αβγθπλμΔ∈∪∩⇒⇔]/;

/** An em dash is not a maths symbol, so the list above does not catch it — but it
 *  is this project's single loudest AI-voice tell: measured at 0.11 per printed
 *  paper against 24 per authored guide. A board answer is read by a student, so
 *  it warns rather than blocks; the fix is a comma, colon or semicolon. */
const EM_DASH = /—/;

function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/apply-solutions.ts <paperId> [--apply]`);
    console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);
  const dir = pagesDir(id);
  const laneFiles = existsSync(dir)
    ? readdirSync(dir).filter((f) => /^solutions-.*\.json$/.test(f)).sort()
    : [];
  if (!laneFiles.length) throw new Error(`${id}: no out/${id}/solutions-*.json files found`);

  const qs = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];
  const byRef = new Map(qs.map((q) => [q.ref, q]));

  const claimedBy = new Map<string, string>();
  const solutions = new Map<string, string>();
  const problems: string[] = [];
  const warnings: string[] = [];

  for (const file of laneFiles) {
    const lane = file.replace(/^solutions-|\.json$/g, "");
    let parsed: Record<string, string>;
    try {
      parsed = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch (e) {
      problems.push(`${file}: not valid JSON — ${(e as Error).message}`);
      continue;
    }
    for (const [rawRef, text] of Object.entries(parsed)) {
      const ref = grammarFor(paper.subject).normaliseRef(rawRef);
      if (!ref) {
        problems.push(`${lane}: ${JSON.stringify(rawRef)} is not a ref on this paper`);
        continue;
      }
      const prior = claimedBy.get(ref);
      if (prior) {
        problems.push(`${ref}: claimed by BOTH lane "${prior}" and lane "${lane}" — a lane worked outside its assignment`);
        continue;
      }
      claimedBy.set(ref, lane);

      if (!text?.trim()) {
        problems.push(`${ref} (${lane}): empty solution`);
        continue;
      }
      if (!byRef.has(ref)) {
        problems.push(`${ref} (${lane}): no such question in the transcription`);
        continue;
      }
      if (normalizeNewlines(text) !== text) {
        problems.push(`${ref} (${lane}): carries a LITERAL backslash-n outside a math zone — commitStaged rejects this, fix the SOURCE`);
        continue;
      }
      const u = text.match(UNICODE_MATH);
      if (u) {
        problems.push(`${ref} (${lane}): unicode maths ${JSON.stringify(u[0])} — the brief requires a LaTeX command`);
        continue;
      }
      const emDashes = (text.match(new RegExp(EM_DASH, "g")) ?? []).length;
      if (emDashes) warnings.push(`${ref} (${lane}): ${emDashes} em dash(es) — the loudest AI-voice tell; use a comma, colon or semicolon`);

      const q = byRef.get(ref)!;
      // `mcq` exempts the leading "**(B)** value" from the option-letter rule —
      // that opening IS the house convention, and without the flag every MCQ
      // derivation would be rejected for following it.
      const findings = probeBoardAnswer(ref, text, {
        mcq: q.format === "mcq",
        numerical: isNumericalStem(q.stem),
      });
      for (const f of findings) {
        const line = `${ref} (${lane}): ${f.reason} — ${JSON.stringify(f.quote)}`;
        if (f.severity === "error") problems.push(line);
        else warnings.push(line);
      }
      solutions.set(ref, text);
    }
  }

  /**
   * Coverage, both directions, against the paper's own list.
   *
   * `--only-missing` narrows that list to the refs a `knownMissingRefs` census
   * named, for the PARTIAL reconciliation signed off on 2026-09-24: on the three
   * Physics reconcile papers only 8 questions were never captured, and the rest
   * are shipped rows this run must not touch. Without the narrowing, writing 8
   * solutions looks like 137 missing ones.
   *
   * It is driven by the manifest census rather than a command-line list, for the
   * same reason as in commit.ts: a mode that can only name refs someone already
   * measured cannot be pointed at the wrong row by a typo.
   */
  const onlyMissing = process.argv.includes("--only-missing");
  const census = paper.knownMissingRefs ?? [];
  if (onlyMissing && !census.length) {
    throw new Error(`${id}: --only-missing needs a knownMissingRefs census in config.ts, and this paper declares none.`);
  }
  const g = grammarFor(paper.subject);
  const wanted = new Set(census.map((r) => g.normaliseRef(r)));
  const inScope = onlyMissing ? qs.filter((q) => wanted.has(g.normaliseRef(q.ref))) : qs;

  for (const q of inScope) {
    if (!solutions.has(q.ref) && !problems.some((p) => p.startsWith(q.ref))) {
      problems.push(`${q.ref}: no lane supplied a solution`);
    }
  }
  // The mirror direction: under --only-missing a lane must not quietly supply a
  // solution for a shipped row, because that row is not being re-committed and
  // the solution would silently go nowhere.
  if (onlyMissing) {
    for (const ref of solutions.keys()) {
      if (!wanted.has(g.normaliseRef(ref))) {
        problems.push(`${ref}: solution supplied, but this ref is NOT in the missing-ref census and will not be committed`);
      }
    }
    console.log(`   --only-missing: ${inScope.length} ref(s) in scope — ${census.join(", ")}`);
  }

  const perLane = [...claimedBy.values()].reduce<Record<string, number>>((a, l) => ({ ...a, [l]: (a[l] ?? 0) + 1 }), {});
  console.log(`${paper.id}: ${laneFiles.length} lane file(s) -> ${solutions.size}/${inScope.length} solutions`);
  for (const [lane, n] of Object.entries(perLane)) console.log(`   ${lane}: ${n}`);
  for (const w of warnings) console.log(`   warn  ${w}`);
  for (const p of problems) console.log(`   ✗ ${p}`);

  if (problems.length) throw new Error(`${problems.length} problem(s) — refusing to apply.`);
  if (!apply) {
    console.log(`\n[dry-run] ${solutions.size} solution(s) ready${warnings.length ? `, ${warnings.length} warning(s)` : ""}. Pass --apply to write.`);
    return;
  }

  for (const q of qs) {
    const s = solutions.get(q.ref);
    if (s) {
      q.solution = s;
      q.reviewFlag = true; // authored, never an official answer
    }
  }
  writeFileSync(questionsJsonPath(id), JSON.stringify(qs, null, 2) + "\n", "utf8");
  console.log(`\napplied ${solutions.size} solution(s) to ${questionsJsonPath(id)} (all REVIEW-flagged)`);
}

main();
