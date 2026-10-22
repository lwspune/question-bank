// Turn a chapter's transcriptions + pass-1 verdicts + overrides (+ shuffles)
// into commit-ready rows. Shared by commit.ts and plan-shuffles.ts so the plan
// is made against exactly the rows that will be committed.
//
// The published fields come from three places, in this order of precedence:
//   overrides (the adjudication record) > pass-1 verdict (authored) > source.
// Stem and options come from the source; solution, subtopic and difficulty are
// AUTHORED (the source's own solution is evidence, never shipped).
//
// Gate: a row whose source key disagrees with the blind verdict — or that has
// no key, or that the agent marked X — cannot be built until an override has
// settled it (`answer`, `exclude`, or a `reason` confirming the key). An
// unadjudicated dispute is a build error, not a flag. So is a row whose options
// include two of equal value ("1/2" beside "26/52"): the commonest defect in the
// LWS quizzes, 13 of 30 Probability rows and 8 of 50 Ratio rows.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { buildWorksheetRows, type Flag, type ShufflePlan, type WorksheetQuestion } from "../worksheets/lib";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { DATA, SUBJECT_NAME, type Chapter, type FileEntry } from "./config";
import { loadChapter, qid } from "./read";
import { equalValueOptions, staleSolutionOverride } from "./lib";
import type { AfcatOverride, Pass1Verdict } from "./overrides";

export type FileRows = { file: FileEntry; rows: ParsedRowPayload[]; flags: Flag[]; excluded: string[] };

export function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as T) : fallback;
}

export function loadOverrides(chapter: Chapter): Record<string, AfcatOverride> {
  return readJson(join(DATA, `${chapter.id}.overrides.json`), {});
}

export function buildChapter(chapter: Chapter, opts: { shuffles?: ShufflePlan; only?: string[] } = {}): FileRows[] {
  const overrides = loadOverrides(chapter);
  const derived = new Map(readJson<Pass1Verdict[]>(join(DATA, `${chapter.id}.derived.json`), []).map((v) => [v.id, v]));
  const used = new Set<string>();
  const out: FileRows[] = [];
  const blockers: string[] = [];

  for (const { file, fileIndex, records } of loadChapter(chapter, opts.only)) {
    const questions: WorksheetQuestion[] = [];
    for (const r of records) {
      const id = qid(fileIndex, r.n);
      const ov = overrides[id];
      if (ov) used.add(id);
      if (ov?.exclude) {
        questions.push({ file: file.key, row: r.n, stem: r.stem, options: r.options, answer: "A", difficulty: "easy", solution: "" });
        continue;
      }
      const v = derived.get(id);
      if (!v) {
        blockers.push(`${id}: not blind-verified yet`);
        continue;
      }
      const settled = ov?.answer !== undefined || (ov?.reason && /key (stands|confirmed)/i.test(ov.reason));
      if (!settled && (v.derived === "X" || !r.key || v.derived !== r.key)) {
        blockers.push(`${id}: source key ${r.key ?? "none"} vs blind ${v.derived} — adjudicate with an override`);
        continue;
      }
      if (ov && staleSolutionOverride(ov)) blockers.push(`${id}: stem repaired but the solution was written for the old stem; add "solution" or "solutionStands"`);
      const subtopic = ov?.subtopic ?? v.subtopic;
      if (!chapter.subtopics.includes(subtopic)) blockers.push(`${id}: subtopic "${subtopic}" not in chapter list`);
      questions.push({
        file: file.key,
        row: r.n,
        stem: r.stem,
        options: r.options,
        answer: r.key ?? "",
        difficulty: ov?.difficulty ?? v.difficulty,
        solution: v.solution,
        subtopic,
      });
    }
    const res = buildWorksheetRows(
      { chapterName: chapter.chapterName, subtopicName: chapter.subtopics[0], fileIndex, subjectName: SUBJECT_NAME },
      questions,
      overrides,
      opts.shuffles ?? {}
    );
    for (const row of res.rows) {
      if (overrides[row.questionNumber!]?.equalValuesIntended) continue;
      for (const letters of equalValueOptions(row.options.map((o) => o.text))) {
        blockers.push(`${row.questionNumber}: options ${letters.join("=")} are equal in value — repair one with an override`);
      }
    }
    out.push({ file, ...res });
  }

  const stale = Object.keys(overrides).filter((k) => !k.startsWith("_") && !used.has(k));
  if (stale.length && !opts.only) blockers.push(`overrides with no matching question: ${stale.join(", ")}`);
  if (blockers.length) throw new Error(`cannot build ${chapter.id}:\n  ${blockers.join("\n  ")}`);
  return out;
}
