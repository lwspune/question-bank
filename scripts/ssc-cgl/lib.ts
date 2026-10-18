// Pure core of the SSC CGL lane. The source is SSC's "challenge module" saved paper
// (a candidate's response sheet, printed to PDF): every question is its own table, a
// stem row then four option rows, and the question and option TEXT are embedded images.
// The key is not text either. It is the FILL of an option row's narrow left cell:
//   G  green   the correct option, chosen by the candidate
//   Y  yellow  the correct option, not chosen
//   R  red     a wrong option the candidate chose
//   N  grey    not answered
// extract.py dumps that geometry (cells + markers) and this file turns it into questions.

export type Fill = "G" | "Y" | "R" | "N" | null;
/** A paper section, in number order: Tier I A-D (25 each), Tier II A-E (config.ts LAYOUTS). */
export type Part = "A" | "B" | "C" | "D" | "E";
export type Label = "A" | "B" | "C" | "D";
/** One row's left cell, with the content images whose midpoint falls inside the row. */
export type Cell = { page: number; y0: number; y1: number; fill: Fill; images: string[] };
export type Marker =
  | { kind: "shift"; page: number; y: number; shift: number }
  | { kind: "part"; page: number; y: number; part: Part }
  | { kind: "q"; page: number; y: number; n: number };
export type Geometry = { cells: Cell[]; markers: Marker[] };
export type AssembledQuestion = {
  shift: number;
  part: Part;
  number: number;
  stemImages: string[];
  options: string[][];
  key: Label;
  pages: number[];
};

const LABELS: Label[] = ["A", "B", "C", "D"];
export const QUESTIONS_PER_SHIFT = 100;

type Event = { page: number; y: number; order: number; marker?: Marker; cell?: Cell };

function isKey(f: Fill): boolean {
  return f === "G" || f === "Y";
}

/** Join two cells a page break split out of one row: images in order, the key fill kept. */
function joinCells(a: Cell, b: Cell, where: string): Cell {
  if (isKey(a.fill) && b.fill && !isKey(b.fill)) throw new Error(`${where}: a split row has conflicting fills ${a.fill}/${b.fill}`);
  if (isKey(b.fill) && a.fill && !isKey(a.fill)) throw new Error(`${where}: a split row has conflicting fills ${a.fill}/${b.fill}`);
  const fill = isKey(a.fill) ? a.fill : isKey(b.fill) ? b.fill : a.fill ?? b.fill;
  return { page: a.page, y0: a.y0, y1: a.y1, fill, images: [...a.images, ...b.images] };
}

/**
 * Turn page geometry into questions. A cell sorts by its MIDPOINT, because the "Q.No"
 * label sits a few points inside its own stem cell: sorted by top edge the stem would
 * land in the previous question. A page break can split one row into two cells, so a
 * question with more than five cells has its page-straddling pairs re-joined (first
 * pair first) until five remain. Anything that still does not read as one stem, four
 * options and exactly one key colour is refused, never guessed.
 *
 * Two source faults are handled explicitly, never silently:
 *  - a CLIPPED label: a label that is a prefix of the number expected next, in that place
 *    ("Q.No: 4" where Q48 belongs, 16 Sep 2025 S1), is read as the expected number and
 *    reported through onRepair. Any other out-of-sequence label stays as printed and
 *    fails the numbering check below.
 *  - a hosted file that LACKS questions (16 Sep 2025 S3 has no PART-C): the numbers are
 *    declared in opts.missing per shift. An undeclared gap still fails.
 */
export type AssembleOptions = {
  onRepair?: (message: string) => void;
  /** shift number -> question numbers the hosted source does not contain */
  missing?: Record<number, number[]>;
};

export function assembleQuestions(g: Geometry, opts: AssembleOptions = {}): AssembledQuestion[] {
  const missingIn = (s: number) => new Set(opts.missing?.[s] ?? []);
  const events: Event[] = [
    ...g.markers.map((m) => ({ page: m.page, y: m.y, order: 0, marker: m })),
    ...g.cells.map((c) => ({ page: c.page, y: (c.y0 + c.y1) / 2, order: 1, cell: c })),
  ].sort((a, b) => a.page - b.page || a.y - b.y || a.order - b.order);

  type Open = { shift: number; part: Part; number: number; cells: Cell[] };
  const open: Open[] = [];
  let shift: number | null = null;
  let part: Part | null = null;
  let prev = 0;
  for (const e of events) {
    const m = e.marker;
    if (m?.kind === "shift") {
      shift = m.shift;
      part = null;
      prev = 0;
    } else if (m?.kind === "part") {
      part = m.part;
    } else if (m?.kind === "q") {
      if (shift === null) throw new Error(`Q${m.n} on page ${m.page} comes before any shift header`);
      if (part === null) throw new Error(`shift ${shift} Q${m.n} comes before any PART heading`);
      const gaps = missingIn(shift);
      let expected = prev + 1;
      while (gaps.has(expected)) expected++;
      let n = m.n;
      if (n !== expected && n < expected && String(expected).startsWith(String(n))) {
        opts.onRepair?.(`shift ${shift}: label ${n} on page ${m.page} read as Q${expected} (clipped label)`);
        n = expected;
      }
      prev = n;
      open.push({ shift, part, number: n, cells: [] });
    } else if (e.cell && open.length) {
      open[open.length - 1].cells.push(e.cell);
    }
  }

  const out: AssembledQuestion[] = [];
  for (const q of open) {
    const where = `shift ${q.shift} Q${q.number}`;
    let cells = q.cells;
    while (cells.length > 5) {
      const i = cells.findIndex((c, k) => k + 1 < cells.length && cells[k + 1].page !== c.page);
      if (i < 0) break;
      cells = [...cells.slice(0, i), joinCells(cells[i], cells[i + 1], where), ...cells.slice(i + 2)];
    }
    if (cells.length !== 5) throw new Error(`${where}: expected a stem and 4 options, found ${cells.length} cell(s)`);
    const opts = cells.slice(1);
    const keyed = opts.flatMap((c, i) => (isKey(c.fill) ? [i] : []));
    if (keyed.length !== 1) throw new Error(`${where}: expected exactly one key colour, found ${keyed.length}`);
    out.push({
      shift: q.shift,
      part: q.part,
      number: q.number,
      stemImages: cells[0].images,
      options: opts.map((c) => c.images),
      key: LABELS[keyed[0]],
      pages: [...new Set(cells.map((c) => c.page))],
    });
  }

  // The web-page render prints each PART as its own tall page, in any order (26 Sep 2025 S1:
  // D, B, C, A), so a shift is checked and returned in NUMBER order, not print order.
  const shifts = [...new Set(out.map((q) => q.shift))];
  out.sort((a, b) => shifts.indexOf(a.shift) - shifts.indexOf(b.shift) || a.number - b.number);
  for (const s of shifts) {
    const nums = out.filter((q) => q.shift === s).map((q) => q.number);
    const gaps = missingIn(s);
    const want = Array.from({ length: QUESTIONS_PER_SHIFT }, (_, i) => i + 1).filter((n) => !gaps.has(n));
    const ok = nums.length === want.length && nums.every((n, i) => n === want[i]);
    if (!ok) {
      const have = new Set(nums);
      const missing = want.filter((n) => !have.has(n));
      const dup = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];
      const extra = nums.filter((n) => gaps.has(n));
      const parts = [
        missing.length ? `missing ${missing.join(",")}` : "",
        dup.length ? `duplicate ${dup.join(",")}` : "",
        extra.length ? `declared missing but present ${extra.join(",")}` : "",
      ].filter(Boolean);
      throw new Error(`shift ${s}: expected questions 1..${QUESTIONS_PER_SHIFT}${gaps.size ? ` less ${gaps.size} declared missing` : ""}: ${parts.join("; ") || "out of order"}`);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Transcript: the hand-read, source-of-record text of one shift
// (scripts/ssc-cgl/transcripts/<shiftId>.txt). LaTeX is written raw.
//
//   === <n>
//   subject: <subject>          optional; required in PART-B (General Awareness)
//   chapter: <chapter>
//   subtopic: <subtopic>
//   difficulty: EASY | MODERATE | HARD
//   answer: A-D                 the answer the bank carries (see blind:)
//   blind: A-D                  optional: OUR blind answer, when it differed from SSC's key and
//                               the key was adopted on review (judgement items); needs a note
//   figure: none | stem | options | stem+options   optional, default none
//   note: <why we differ from the key, or a flaw>   optional
//   flawed: yes                 optional: the question is defective as printed, or we dispute SSC's key
//   notice: <for students>      required on a flawed block once the key is compared: the line shown
//                               above its solution (studentSolution), e.g. "SSC printed this in Hindi only"
//   context_from: <n>           optional: same passage as block <n>
//   context:                    optional: a passage shared by a set
//   <lines>
//   stem:
//   <lines>
//   A: ...  B: ...  C: ...  D: ...   one line each
//   solution:
//   <lines to the next === or end of file>
// ---------------------------------------------------------------------------

export type FigureKind = "none" | "stem" | "options" | "stem+options";
export type TranscriptQuestion = {
  number: number;
  subject?: string;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  answer: Label;
  /** Our blind answer, kept when the key was adopted after comparison, so blind accuracy stays measurable. */
  blind?: Label;
  figure: FigureKind;
  note?: string;
  flawed: boolean;
  /** Student-facing line shown above the solution of a flawed question (studentSolution). */
  notice?: string;
  context?: string;
  stem: string;
  options: [string, string, string, string];
  solution: string;
};

const FIGURES: FigureKind[] = ["none", "stem", "options", "stem+options"];
const HEADER = /^(subject|chapter|subtopic|difficulty|answer|blind|figure|note|flawed|notice|context_from):\s*(.*)$/;
const OPTION = /^([A-D]):\s?(.*)$/;

type Parsed = TranscriptQuestion & { contextFrom?: number };

function parseBlock(n: number, lines: string[]): Parsed {
  const fail = (what: string): never => {
    throw new Error(`Q${n}: ${what}`);
  };
  const head: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length && !["stem:", "context:"].includes(lines[i].trim()); i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const m = HEADER.exec(line);
    if (!m) fail(`unexpected header line "${line}"`);
    head[m![1]] = m![2].trim();
  }
  if (i === lines.length) fail("no stem: section");

  let context: string | undefined;
  if (lines[i].trim() === "context:") {
    const ctx: string[] = [];
    for (i++; i < lines.length && lines[i].trim() !== "stem:"; i++) ctx.push(lines[i]);
    if (i === lines.length) fail("no stem: section after context:");
    context = ctx.join("\n").trim();
    if (!context) fail("empty context");
  }
  if (context !== undefined && head.context_from) fail("has both a context: section and context_from");

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
  if (!LABELS.includes(head.answer as Label)) fail(`bad answer "${head.answer}"`);
  if (head.blind && !LABELS.includes(head.blind as Label)) fail(`bad blind answer "${head.blind}"`);
  const figure = (head.figure ?? "none") as FigureKind;
  if (!FIGURES.includes(figure)) fail(`bad figure "${head.figure}"`);
  const stemText = stem.join("\n").trim();
  if (!stemText) fail("empty stem");
  if (!solution) fail("empty solution");
  let contextFrom: number | undefined;
  if (head.context_from) {
    contextFrom = Number(head.context_from);
    if (!Number.isInteger(contextFrom)) fail(`bad context_from "${head.context_from}"`);
  }

  return {
    number: n,
    ...(head.subject ? { subject: head.subject } : {}),
    chapter: head.chapter,
    subtopic: head.subtopic,
    difficulty: head.difficulty as TranscriptQuestion["difficulty"],
    answer: head.answer as Label,
    ...(head.blind ? { blind: head.blind as Label } : {}),
    figure,
    ...(head.note ? { note: head.note } : {}),
    flawed: head.flawed === "yes",
    ...(head.notice ? { notice: head.notice } : {}),
    ...(context !== undefined ? { context } : {}),
    ...(contextFrom !== undefined ? { contextFrom } : {}),
    stem: stemText,
    options: options as TranscriptQuestion["options"],
    solution,
  };
}

/**
 * The solution as students see it: a flawed question's notice first, in bold, so the
 * defect is the first thing read when the answer is revealed. The bank's `solution`
 * column takes this (it is outside content_hash, so adding a notice changes no id).
 */
export function studentSolution(q: Pick<TranscriptQuestion, "solution" | "notice">): string {
  return q.notice ? `**Note:** ${q.notice}\n\n${q.solution}` : q.solution;
}

export function parseTranscript(text: string): TranscriptQuestion[] {
  const parsed: Parsed[] = [];
  const seen = new Set<number>();
  const blocks = text.replace(/\r\n/g, "\n").split(/^=== (\d+)\s*$/m);
  // split with a capture group: [preamble, n1, body1, n2, body2, ...]
  for (let b = 1; b < blocks.length; b += 2) {
    const n = Number(blocks[b]);
    if (seen.has(n)) throw new Error(`duplicate question number ${n}`);
    seen.add(n);
    parsed.push(parseBlock(n, blocks[b + 1].split("\n")));
  }
  const byNumber = new Map(parsed.map((q) => [q.number, q]));
  return parsed.map(({ contextFrom, ...q }) => {
    if (contextFrom === undefined) return q;
    const src = byNumber.get(contextFrom);
    if (!src?.context) throw new Error(`Q${q.number}: context_from ${contextFrom} names no block with a context: section`);
    return { ...q, context: src.context };
  });
}

export type ShiftCheck = {
  problems: string[];
  disagreements: string[];
  /** Questions where our blind answer differed and SSC's key was adopted on review. */
  adopted: string[];
  /** Blind answers (the blind: header where present, else the answer) that match the key. */
  blindAgreement: { agree: number; of: number };
  subjects: Map<number, string>;
  missing: number[];
};
/**
 * Check a transcript against the sheet it was read from: each question is filed under
 * a subject of its own part and inside the catalog, and every answer that differs
 * from SSC's key says why in a note. A disagreement is a finding, never a silent
 * override: it is listed whether or not it carries a note.
 */
export function checkShift(
  transcript: TranscriptQuestion[],
  sheet: { number: number; part: Part; key: Label }[],
  catalog: Record<string, { chapter: string; subtopics: string[] }[]>,
  sections: Partial<Record<Part, string[]>>,
  opts: { compareKey?: boolean } = {}
): ShiftCheck {
  // compareKey false = a drafting agent's check: catalog and parts only, nothing that
  // reveals SSC's key (no agreement count, no disagreement, no blind: review).
  const compareKey = opts.compareKey ?? true;
  const problems: string[] = [];
  const disagreements: string[] = [];
  const adopted: string[] = [];
  let agree = 0;
  const subjects = new Map<number, string>();
  const byNumber = new Map(sheet.map((s) => [s.number, s]));

  for (const q of transcript) {
    const p = (s: string) => problems.push(`Q${q.number} ${s}`);
    const s = byNumber.get(q.number);
    if (!s) {
      p("is not in the paper");
      continue;
    }
    const allowed = sections[s.part] ?? [];
    let subject: string | undefined;
    if (q.subject === undefined) {
      if (allowed.length === 1) subject = allowed[0];
      else p(`is in PART-${s.part} (General Awareness) and must name its subject`);
    } else if (allowed.includes(q.subject)) subject = q.subject;
    else p(`subject "${q.subject}" is not a PART-${s.part} subject`);

    if (subject) {
      subjects.set(q.number, subject);
      const chapter = catalog[subject]?.find((c) => c.chapter === q.chapter);
      if (!chapter) p(`chapter "${q.chapter}" is not a ${subject} chapter`);
      else if (!chapter.subtopics.includes(q.subtopic)) p(`subtopic "${q.subtopic}" is not in ${subject} / ${q.chapter}`);
    }

    if (!compareKey) continue;
    if (q.flawed && !q.notice) p("is flawed but carries no notice: line for students");
    if (q.blind !== undefined) {
      if (q.blind === q.answer) p(`blind answer ${q.blind} is the same as the answer: drop the blind: line`);
      else if (!q.note) p(`blind answer ${q.blind} needs a note saying why the key was adopted`);
      else if (q.answer === s.key) adopted.push(`Q${q.number} blind ${q.blind}, adopted key ${s.key} :: ${q.note}`);
    }
    if ((q.blind ?? q.answer) === s.key) agree++;
    if (q.answer !== s.key) {
      disagreements.push(`Q${q.number} ours ${q.answer} vs key ${s.key}${q.note ? ` :: ${q.note}` : ""}`);
      if (!q.note) p(`answer ${q.answer} differs from the key ${s.key} with no note saying why`);
    }
  }

  const done = new Set(transcript.map((q) => q.number));
  const missing = sheet.map((s) => s.number).filter((n) => !done.has(n)).sort((a, b) => a - b);
  const of = compareKey ? transcript.length : 0;
  return { problems, disagreements, adopted, blindAgreement: { agree, of }, subjects, missing };
}

/**
 * Two literal dollar signs on one line of transcript text. The site's parser (parseLatex) reads
 * `$...$` as a maths zone, so the words between them render as maths and both signs vanish. A
 * lone `$` renders as itself. Write each one escaped, `\$`, which renders as a dollar sign.
 */
export function literalDollar(text: string): boolean {
  return /\$[^$\n]+?\$/.test(text.replace(/\\\$/g, ""));
}
