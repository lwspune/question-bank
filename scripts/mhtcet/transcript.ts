// Parser for the plain-text transcript of a PDF-sourced MHT-CET shift
// (scripts/mhtcet/transcripts/<shiftId>.txt). The transcript is the source of record
// for a 2026+ shift: stem, options, classification, our derived answer and our own
// solution, with LaTeX written raw (no JSON escaping, which corrupts backslashes).
//
//   === <n>
//   chapter: <existing chapter>
//   subtopic: <existing subtopic>
//   difficulty: EASY | MODERATE | HARD
//   answer: A-D                      (OUR derived answer, never the PDF's key)
//   figure: none | stem | options | stem+options      (optional, default none)
//   note: <why we differ from the PDF key, or a flaw>   (optional)
//   flawed: yes                                         (optional: keep PRIVATE)
//   stem:
//   <one or more lines>
//   A: <option>  B: ...  C: ...  D: ...   (one line each)
//   solution:
//   <one or more lines, to the next === or end of file>
export type FigureKind = "none" | "stem" | "options" | "stem+options";

export type TranscriptQuestion = {
  number: number;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  answer: "A" | "B" | "C" | "D";
  figure: FigureKind;
  note?: string;
  flawed: boolean;
  stem: string;
  options: [string, string, string, string];
  solution: string;
};

const FIGURES: FigureKind[] = ["none", "stem", "options", "stem+options"];
const HEADER = /^(chapter|subtopic|difficulty|answer|figure|note|flawed):\s*(.*)$/;
const OPTION = /^([A-D]):\s?(.*)$/;

function parseBlock(n: number, lines: string[]): TranscriptQuestion {
  const fail = (what: string) => {
    throw new Error(`Q${n}: ${what}`);
  };
  const head: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length && lines[i].trim() !== "stem:"; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const m = HEADER.exec(line);
    if (!m) fail(`unexpected header line "${line}"`);
    head[m![1]] = m![2].trim();
  }
  if (i === lines.length) fail("no stem: section");
  i++;
  const stem: string[] = [];
  for (; i < lines.length && !OPTION.test(lines[i]); i++) stem.push(lines[i]);
  const options: string[] = [];
  const labels: string[] = [];
  for (; i < lines.length && lines[i].trim() !== "solution:"; i++) {
    if (!lines[i].trim()) continue;
    const m = OPTION.exec(lines[i]);
    if (!m) fail(`expected an option line, got "${lines[i]}"`);
    labels.push(m![1]);
    options.push(m![2].trim());
  }
  if (labels.join("") !== "ABCD" || options.some((o) => !o)) fail("options must be exactly A, B, C, D in order, none empty");
  if (i === lines.length) fail("no solution: section");
  const solution = lines.slice(i + 1).join("\n").trim();

  for (const k of ["chapter", "subtopic", "difficulty", "answer"]) if (!head[k]) fail(`missing ${k}`);
  if (!["EASY", "MODERATE", "HARD"].includes(head.difficulty)) fail(`bad difficulty "${head.difficulty}"`);
  if (!["A", "B", "C", "D"].includes(head.answer)) fail(`bad answer "${head.answer}"`);
  const figure = (head.figure ?? "none") as FigureKind;
  if (!FIGURES.includes(figure)) fail(`bad figure "${head.figure}"`);
  const stemText = stem.join("\n").trim();
  if (!stemText) fail("empty stem");
  if (!solution) fail("empty solution");

  return {
    number: n,
    chapter: head.chapter,
    subtopic: head.subtopic,
    difficulty: head.difficulty as TranscriptQuestion["difficulty"],
    answer: head.answer as TranscriptQuestion["answer"],
    figure,
    ...(head.note ? { note: head.note } : {}),
    flawed: head.flawed === "yes",
    stem: stemText,
    options: options as TranscriptQuestion["options"],
    solution,
  };
}

export function parseTranscript(text: string): TranscriptQuestion[] {
  const out: TranscriptQuestion[] = [];
  const seen = new Set<number>();
  const blocks = text.replace(/\r\n/g, "\n").split(/^=== (\d+)\s*$/m);
  // split with a capture group: [preamble, n1, body1, n2, body2, ...]
  for (let b = 1; b < blocks.length; b += 2) {
    const n = Number(blocks[b]);
    if (seen.has(n)) throw new Error(`duplicate question number ${n}`);
    seen.add(n);
    out.push(parseBlock(n, blocks[b + 1].split("\n")));
  }
  return out;
}
