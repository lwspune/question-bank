/**
 * A student's JEE Main response sheet, read as TEXT, and scored against NTA's
 * key (src/lib/scoreCalc/ntaKey.ts).
 *
 * WHY TEXT. The same sheet reaches us three ways: a pasted link (the server
 * fetches the page), a saved web page, or a saved PDF. All three carry the same
 * labels from NTA's exam software, so one reader over the page's text serves
 * all of them; the caller turns HTML or PDF into text first.
 *
 * THE LABELS (the ones NTA's public question paper prints, plus the
 * candidate's): each question starts "Q.<n>", carries "Question ID : <id>",
 * for an MCQ "Option 1 ID : <id>" to "Option 4 ID" and "Chosen Option : <1-4
 * or -->", for a numeric question "Given Answer : <value or -->" (printed
 * BEFORE the question ID, which is why a question is read as everything up to
 * the next "Q.<n>").
 *
 * CHECKED ON A REAL SHEET (2026-11-16): a JEE Main 2025 sheet saved as PDF and
 * posted publicly, kept as an anonymised fixture (identity lines removed, every
 * ID made up). Two things it taught: (1) read a PDF in READING order (pdf.js
 * text items / `pdftotext -raw`), never page layout, where "Q.2" lands before
 * question 1's details end; (2) the PDF breaks "Given Answer :" across lines.
 * The live web page behind a pasted link is NOT yet checked on a real one.
 */
import type { MockPaperBlueprint } from "@/lib/mocks/blueprints";
import { gradeNtaItem, type NtaKeyEntry } from "./ntaKey";
import { computeScore, type ScoreResult, type SheetItem } from "./score";

export interface NtaResponse {
  questionId: string;
  /** Option ID (MCQ) or the typed value (numeric); null when left. */
  chosen: string | null;
}

const BLANK = /^-+$/;

function readQuestion(chunk: string): NtaResponse | null {
  const qid = /Question\s*I[dD]\s*:\s*(\d+)/.exec(chunk)?.[1];
  if (!qid) return null;

  // A saved PDF breaks this label across lines ("Give / n / Ans / wer :"), so
  // any whitespace may sit between its letters.
  const given = /G\s*i\s*v\s*e\s*n\s*A\s*n\s*s\s*w\s*e\s*r\s*:\s*(\S+)/i.exec(chunk)?.[1];
  if (given !== undefined) return { questionId: qid, chosen: BLANK.test(given) ? null : given };

  const chosenNo = /Chosen\s*Option\s*:\s*(\S+)/i.exec(chunk)?.[1];
  if (chosenNo === undefined || BLANK.test(chosenNo)) return { questionId: qid, chosen: null };

  const options = new Map<string, string>();
  for (const m of chunk.matchAll(/Option\s*(\d)\s*I[dD]\s*:\s*(\d+)/g)) options.set(m[1], m[2]);
  const optionId = options.get(chosenNo);
  if (!optionId) throw new Error(`Question ${qid}: chosen option ${chosenNo} has no option ID on the sheet.`);
  return { questionId: qid, chosen: optionId };
}

/** Every question on the sheet, in sheet order. Empty when the text is not a response sheet. */
export function parseNtaResponseText(text: string): NtaResponse[] {
  const chunks = text.split(/(?=\bQ\.\s?\d+\b)/);
  const out: NtaResponse[] = [];
  for (const chunk of chunks) {
    const q = readQuestion(chunk);
    if (q) out.push(q);
  }
  return out;
}

/**
 * Score a sheet against one shift's key. Every question on the sheet must be
 * in the key and every key question on the sheet: anything else means the
 * student picked the wrong shift, and a part-matched score would be wrong.
 */
export function scoreNtaSheet(
  responses: readonly NtaResponse[],
  key: ReadonlyMap<string, NtaKeyEntry>,
  blueprint: MockPaperBlueprint,
  dropPolicy: "all" | "attempted" = "all",
): ScoreResult {
  if (responses.length === 0) return { ok: false, error: "We could not find any questions on this sheet." };

  const seen = new Set<string>();
  const items: SheetItem[] = [];
  let foreign = 0;
  for (const r of responses) {
    if (seen.has(r.questionId)) return { ok: false, error: `Question ${r.questionId} appears twice on the sheet.` };
    seen.add(r.questionId);
    const entry = key.get(r.questionId);
    if (!entry) {
      foreign += 1;
      continue;
    }
    items.push({ section: entry.subject, outcome: gradeNtaItem(entry.answer, r.chosen, dropPolicy) });
  }
  if (foreign > 0) {
    return { ok: false, error: `${foreign} questions on this sheet are not in this shift's key. Check the date and shift.` };
  }
  const missing = [...key.keys()].filter((q) => !seen.has(q)).length;
  if (missing > 0) return { ok: false, error: `The sheet is missing ${missing} of this shift's questions.` };

  return computeScore(blueprint, items);
}
