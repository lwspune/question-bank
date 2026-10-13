// Pure helpers for MHT-CET papers whose source is a typeset PDF (2026 onward),
// not an LWS .docx. In these PDFs the prose is a real text layer but every formula
// and number is drawn as vector paths, so a question is TRANSCRIBED from a crop and
// the text layer is used to check the transcription (textLayerFidelity).
import type { Subject } from "./lib";

/** Subject from the global question number, given the paper's own section order (50 each). */
export function subjectForNumberInOrder(n: number, order: readonly Subject[]): Subject {
  if (!Number.isInteger(n) || n < 1 || n > 150) throw new Error(`question number out of range: ${n}`);
  if (order.length !== 3) throw new Error(`expected 3 sections, got ${order.length}`);
  return order[Math.floor((n - 1) / 50)];
}

// The PDF's per-question chrome, which a transcription never carries.
const CHROME = [
  /\bQ\d{1,3}\./g,
  /MCQ \(Single Correct Answer\)/g,
  /Open solution/g,
  /\b(Chemistry|Mathematics|Physics) 50 questions\b/g, // a section header inside the last question before it
];

const MATH_ZONE = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g;

/**
 * Lowercased word tokens: letters only, length >= 2. LaTeX command names are dropped
 * (`\frac`, `\mathrm`, `\sin`) but the text inside their braces is kept, so
 * `\mathrm{AgNO_3}` gives "agno" the way the PDF's text layer does. Numbers and single
 * letters (variables, option labels) are noise on both sides and are dropped.
 */
export function wordsOf(s: string): string[] {
  const noCommands = s.replace(/\\[A-Za-z]+/g, " "); // command names
  // keep sub/superscript CONTENT: a superscript word ("1/20^{th}") prints as text, and an
  // extra word on the transcript side can never hide a word missing from it
  const stripped = noCommands.replace(/[_^]/g, " ");
  const words = (stripped.toLowerCase().match(/[a-z]+/g) ?? []).filter((w) => w.length >= 2);
  // the text layer runs a letter subscript into its symbol (Q_v prints as "Qv", P_{ext} as
  // "Pext"), so offer the joined form too
  const joined = [...noCommands.matchAll(/([A-Za-z]+)[_^]\{?([A-Za-z]+)\}?/g)].map((m) => (m[1] + m[2]).toLowerCase());
  return [...words, ...joined];
}

function countMap(words: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const w of words) m.set(w, (m.get(w) ?? 0) + 1);
  return m;
}

/**
 * Compare a transcription with the PDF text layer of the same question.
 *  - `missing`: words the PDF has that the transcription lacks (dropped text) —
 *    counted, so a word the layer has twice must appear twice.
 *  - `extra`: PROSE words (outside math zones) the transcription has that the PDF
 *    does not (invented or misread text). Math is excluded because the layer omits it.
 * Both empty = the words agree; numbers inside math are checked elsewhere (the key).
 */
export function textLayerFidelity(transcript: string, textLayer: string): { missing: string[]; extra: string[] } {
  let layer = textLayer;
  for (const re of CHROME) layer = layer.replace(re, " ");
  const have = countMap(wordsOf(transcript));
  const missing: string[] = [];
  for (const w of wordsOf(layer)) {
    const n = have.get(w) ?? 0;
    if (n > 0) have.set(w, n - 1);
    else missing.push(w);
  }
  const layerCount = countMap(wordsOf(layer));
  const extra: string[] = [];
  for (const w of wordsOf(transcript.replace(MATH_ZONE, " "))) {
    const n = layerCount.get(w) ?? 0;
    if (n > 0) layerCount.set(w, n - 1);
    else extra.push(w);
  }
  return { missing, extra };
}
