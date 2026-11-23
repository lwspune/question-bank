// The English side of a paper, in the shape the Marathi checks read
// (marathi.ts EnglishQuestion). Two sources, one shape:
//
//   - fromMerged: the transcription alone (data/<id>.merged.json). Enough for the
//     reading lane: structure, passages, numbers. No answer or solution yet.
//   - fromRows: the rows exactly as commit.ts writes them (rows.ts), carrying
//     the answer, the solution and the content hash. mr-commit finds each live
//     English row by that hash, so it can never attach a reading to a row the
//     commit would not have built.
import { readFileSync } from "node:fs";
import type { TQ } from "../upsc/lib";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { questionsJsonPath, type Paper } from "./config";
import type { EnglishQuestion } from "./marathi";
import { buildPaperRows } from "./rows";

export function fromMerged(paper: Paper): EnglishQuestion[] {
  const qs = JSON.parse(readFileSync(questionsJsonPath(paper.id), "utf8")).questions as TQ[];
  return [...qs]
    .sort((a, b) => a.number - b.number)
    .map((q) => ({
      ref: String(q.number),
      format: "mcq",
      stem: q.stem,
      options: q.options.map((o) => ({ label: o.label, text: o.text })),
      ...(q.context ? { context: q.context } : {}),
      ...(q.setLabel ? { setLabel: q.setLabel } : {}),
    }));
}

export type EnglishRow = EnglishQuestion & { contentHash: string };

/** Every scored row of the paper (a dropped item has no options to translate). */
export function fromRows(paper: Paper): EnglishRow[] {
  const built = buildPaperRows(paper);
  if (built.errs.length) throw new Error(`${paper.id}: the English rows do not build:\n  ${built.errs.join("\n  ")}`);
  return built.parsed
    .filter((r: ParsedRowPayload) => !r.cancelledNote && r.options.length === 4)
    .map((r) => ({
      ref: String(r.questionNumber),
      format: "mcq" as const,
      stem: r.text,
      options: r.options.map((o) => ({ label: o.label, text: o.text })),
      ...(r.context ? { context: r.context } : {}),
      ...(r.setLabel ? { setLabel: r.setLabel } : {}),
      answer: r.options.find((o) => o.isCorrect)?.label,
      solution: r.solution,
      contentHash: r.contentHash,
    }))
    .sort((a, b) => Number(a.ref) - Number(b.ref));
}
