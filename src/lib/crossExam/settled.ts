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
  /** The exam chapter whose past questions were matched. */
  target: ChapterRef;
  /** The board chapters whose questions were matched against it. */
  board: ChapterRef[];
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
  if (!isChapterRef(f?.target)) errors.push("target: { exam, subject, chapter }");
  if (!Array.isArray(f?.board) || f.board.length === 0 || !f.board.every(isChapterRef))
    errors.push("board: one or more { exam, subject, chapter }");
  if (!Array.isArray(f?.pairs) || f.pairs.length === 0) {
    errors.push("pairs: a non-empty list");
    return errors;
  }
  const seen = new Set<string>();
  f.pairs.forEach((p, i) => {
    const at = `pairs[${i}]`;
    if (!UUID.test(p?.source ?? "")) errors.push(`${at}: source is not a question id`);
    if (!UUID.test(p?.target ?? "")) errors.push(`${at}: target is not a question id`);
    if (p?.source === p?.target) errors.push(`${at}: links a question to itself`);
    if (!KINDS.includes(p?.kind)) errors.push(`${at}: kind must be exact, numbers or similar`);
    const why = typeof p?.why === "string" ? p.why.trim() : "";
    if (why.length === 0 || why.length > 200 || /\\[a-z(]/i.test(why)) errors.push(`${at}: why must be 1-200 characters of plain text`);
    const key = `${p?.source}>${p?.target}`;
    if (seen.has(key)) errors.push(`${at}: duplicate pair`);
    seen.add(key);
  });
  return errors;
}
