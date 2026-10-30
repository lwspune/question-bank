// Pure core of the book-chapter lane's assembly step (see README.md in this folder):
// Pass A (transcription) + the printed key tables + Pass B (blind solve) + the main
// session's settlements -> the Pariksha lane's data files. No I/O; the CLI is assemble.ts.

export type PassA = {
  ref: string; // "24.1 Q5": book section + printed number (numbering restarts per section)
  section: string;
  stem: string;
  options: string[];
  hasFigure?: boolean;
  figure?: { img: string; bbox: number[] };
  optionsAreFigures?: boolean;
  confidence: string; // HIGH | MED | LOW
  note?: string;
};
export type KeysFile = {
  sections?: { section: string; title?: string }[];
  keys?: Record<string, Record<string, number | string>>; // section -> printed number -> printed option 1-4
};
export type PassB = {
  ref: string;
  answer: number; // derived option number 1-4
  solution: string;
  difficulty: string;
  confidence: string;
  reasoning?: string;
};
export type Settlement = {
  answer?: number; // the main session's verdict; wins over the printed key
  solution?: string;
  hold?: string; // leave the question out, with why
  stem?: string;
  options?: string[];
  subtopic?: string;
  reasoning?: string;
};
export type AssembledQuestion = {
  number: number;
  ref: string;
  subject: string;
  chapter: string;
  subtopic: string;
  stem: string;
  options: string[];
  answer: string;
  solution: string;
  difficulty: string;
  confidence: string;
  hasFigure: boolean;
  reasoning?: string;
};
export type Assembly = {
  questions: AssembledQuestion[];
  keys: Record<number, string>; // running number -> letter, for <id>.keys.json
  coverage: string[]; // one line per section
  held: string[];
  disagreements: string[]; // derived vs printed, not yet settled: the CLI refuses to write while any remain
};

const LETTERS = ["A", "B", "C", "D"];
const RANK: Record<string, number> = { HIGH: 3, MED: 2, LOW: 1 };
const qNum = (ref: string) => Number(ref.split(" Q")[1]);
const secParts = (s: string) => s.split(".").map(Number);
function compareSections(x: string, y: string): number {
  const [a, b] = [secParts(x), secParts(y)];
  for (let i = 0; i < Math.max(a.length, b.length); i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) - (b[i] ?? 0);
  return 0;
}

export function assembleChapter(input: {
  subject: string; // the exam's subject the chapter belongs to (a NEET_CHAPTERS key for NEET)
  chapter: string;
  A: PassA[][];
  keys: KeysFile[];
  B: PassB[][];
  settle: Record<string, Settlement>;
}): Assembly {
  // Pass A, deduped by ref: page slices can overlap, so keep the higher-confidence copy.
  const byRef = new Map<string, PassA>();
  for (const q of input.A.flat()) {
    const prev = byRef.get(q.ref);
    if (!prev || (RANK[q.confidence] ?? 0) > (RANK[prev.confidence] ?? 0)) byRef.set(q.ref, q);
  }
  const qs = [...byRef.values()].sort((x, y) => compareSections(x.section, y.section) || qNum(x.ref) - qNum(y.ref));

  const titles: Record<string, string> = {};
  const keys: Record<string, Record<string, number | string>> = {};
  for (const k of input.keys) {
    for (const s of k.sections ?? []) if (s.title) titles[s.section] = s.title;
    for (const [sec, m] of Object.entries(k.keys ?? {})) keys[sec] = { ...(keys[sec] ?? {}), ...m };
  }
  const B = new Map(input.B.flat().map((x) => [x.ref, x]));

  const coverage: string[] = [];
  const sections = [...new Set([...qs.map((q) => q.section), ...Object.keys(keys)])].sort(compareSections);
  for (const s of sections) {
    const got = new Set(qs.filter((q) => q.section === s).map((q) => qNum(q.ref)));
    const keyed = Object.keys(keys[s] ?? {}).map(Number);
    const noQ = keyed.filter((n) => !got.has(n));
    const noKey = [...got].filter((n) => (keys[s] ?? {})[n] === undefined);
    coverage.push(
      `${s} ${titles[s] ?? "?"}: ${got.size} q, ${keyed.length} keyed` +
        (noQ.length ? `; key but NO QUESTION: ${noQ.join(",")}` : "") +
        (noKey.length ? `; question but NO KEY: ${noKey.join(",")}` : ""),
    );
  }

  const out: AssembledQuestion[] = [];
  const outKeys: Record<number, string> = {};
  const held: string[] = [];
  const disagreements: string[] = [];
  for (const q of qs) {
    const st = input.settle[q.ref] ?? {};
    if (st.hold) { held.push(`${q.ref}: ${st.hold}`); continue; }
    const b = B.get(q.ref);
    if (!b) { held.push(`${q.ref}: no Pass B answer`); continue; }
    const printedRaw = (keys[q.section] ?? {})[qNum(q.ref)];
    const printed = printedRaw === undefined ? undefined : Number(printedRaw);
    if (printed !== undefined && printed !== Number(b.answer) && st.answer === undefined) {
      disagreements.push(`${q.ref}: derived ${b.answer}, printed ${printed}` + (b.confidence !== "HIGH" ? ` [B ${b.confidence}: ${b.reasoning ?? ""}]` : ""));
    }
    const answer = st.answer ?? b.answer;
    const number = out.length + 1;
    const confidence = [q.confidence, b.confidence].sort((x, y) => (RANK[x] ?? 0) - (RANK[y] ?? 0))[0];
    const reasoning = [q.note, b.reasoning, st.reasoning].filter(Boolean).join(" | ");
    out.push({
      number, ref: q.ref, subject: input.subject, chapter: input.chapter,
      subtopic: st.subtopic ?? titles[q.section] ?? q.section,
      stem: st.stem ?? q.stem, options: st.options ?? q.options, answer: LETTERS[Number(answer) - 1],
      solution: st.solution ?? b.solution, difficulty: b.difficulty, confidence, hasFigure: !!q.hasFigure,
      ...(reasoning ? { reasoning } : {}),
    });
    // the printed key is authoritative unless the question was settled; no printed key -> the derived answer
    outKeys[number] = LETTERS[(st.answer ?? printed ?? Number(answer)) - 1];
  }
  return { questions: out, keys: outKeys, coverage, held, disagreements };
}
