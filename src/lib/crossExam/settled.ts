/**
 * The shape of a settled exam-twin file (scripts/cross-exam/data/<run>.json):
 * one review run's verdicts, written by the main session after it has read
 * every proposed pair, and the only input scripts/cross-exam/commit.ts writes
 * from. The limits mirror migration 0220's CHECKs, so a dry run catches what
 * the INSERT would.
 */
import type { TwinKind } from "@/lib/crossExam/summary";

export type SettledPair = { source: string; target: string; kind: TwinKind; why: string };

export type ChapterRef = { exam: string; subject: string; chapter: string };

export type SettledFile = {
  run: string;
  settledOn: string;
  /** The exam chapters whose past questions were matched: several when one board chapter
   *  teaches more than one of them, so one read of the board serves all. */
  targets: ChapterRef[];
  /** The board chapters whose questions were matched against them. */
  board: ChapterRef[];
  /** Every question the run READ, matched or not: it compared each board id here with each
   *  target id here. This is what lets a later run skip them (src/lib/crossExam/pending.ts). */
  reviewed: { targets: string[]; board: string[] };
  /** May be empty: a run that matched nothing still records what it read. */
  pairs: SettledPair[];
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const KINDS: readonly string[] = ["exact", "numbers", "similar"];

function isChapterRef(x: unknown): x is ChapterRef {
  const r = x as ChapterRef;
  return !!r && typeof r.exam === "string" && typeof r.subject === "string" && typeof r.chapter === "string";
}

export function validateSettled(data: unknown): string[] {
  const f = data as Partial<SettledFile>;
  const errors: string[] = [];
  if (typeof f?.run !== "string" || f.run.trim().length === 0 || f.run.length > 80) errors.push("run: 1-80 characters");
  if (typeof f?.settledOn !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(f.settledOn)) errors.push("settledOn: YYYY-MM-DD");
  if (!Array.isArray(f?.targets) || f.targets.length === 0 || !f.targets.every(isChapterRef))
    errors.push("targets: one or more { exam, subject, chapter }");
  if (!Array.isArray(f?.board) || f.board.length === 0 || !f.board.every(isChapterRef))
    errors.push("board: one or more { exam, subject, chapter }");
  const ids = (xs: unknown) => Array.isArray(xs) && xs.length > 0 && xs.every((x) => typeof x === "string" && UUID.test(x));
  const read = f?.reviewed;
  if (!read || typeof read !== "object") errors.push("reviewed: { targets, board }, the question ids the run read");
  else {
    if (!ids(read.targets)) errors.push("reviewed.targets: one or more question ids");
    if (!ids(read.board)) errors.push("reviewed.board: one or more question ids");
  }
  if (!Array.isArray(f?.pairs)) {
    errors.push("pairs: a list (empty when the run matched nothing)");
    return errors;
  }
  const readTargets = new Set(Array.isArray(read?.targets) ? read.targets : []);
  const readBoard = new Set(Array.isArray(read?.board) ? read.board : []);
  const seen = new Set<string>();
  f.pairs.forEach((p, i) => {
    const at = `pairs[${i}]`;
    if (!UUID.test(p?.source ?? "")) errors.push(`${at}: source is not a question id`);
    if (!UUID.test(p?.target ?? "")) errors.push(`${at}: target is not a question id`);
    if (p?.source === p?.target) errors.push(`${at}: links a question to itself`);
    if (readBoard.size && !readBoard.has(p?.source)) errors.push(`${at}: source is not among the board questions read`);
    if (readTargets.size && !readTargets.has(p?.target)) errors.push(`${at}: target is not among the exam questions read`);
    if (!KINDS.includes(p?.kind)) errors.push(`${at}: kind must be exact, numbers or similar`);
    const why = typeof p?.why === "string" ? p.why.trim() : "";
    if (why.length === 0 || why.length > 200 || /\\[a-z(]/i.test(why)) errors.push(`${at}: why must be 1-200 characters of plain text`);
    const key = `${p?.source}>${p?.target}`;
    if (seen.has(key)) errors.push(`${at}: duplicate pair`);
    seen.add(key);
  });
  return errors;
}
