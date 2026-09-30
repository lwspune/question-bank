/**
 * Pure core of the MPSC Group B & C ingestion — no I/O, all unit-tested
 * (tests/mpsc-lib.test.ts).
 *
 * Every MPSC question is printed TWICE, Marathi then English, and the booklet's
 * own instruction 4(b) says that where the two disagree through a printing
 * error the candidate should consult the other version — neither language is
 * declared authoritative. That makes the pair a free independent check on the
 * transcription: `parityIssues` compares the structure and every number of the
 * two versions, so a misread digit or a dropped statement in EITHER language
 * surfaces as a disagreement. It is triage, not a verdict — a real printing
 * error in the booklet trips it too, and that is worth knowing as well.
 */

export type Lang = "en" | "mr";
export type KeyLetter = "A" | "B" | "C" | "D" | "#";

export type Version = {
  stem: string;
  context?: string;
  options: string[];
};

/** One transcribed question: shared metadata plus both printed versions. */
export type BilingualQuestion = {
  n: number;
  subject: string;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  /**
   * The printed versions. Almost every question has both; CSAT Paper II's
   * language-comprehension questions are printed in ONE language only
   * (booklet instruction 4(c)), and then the other is absent.
   */
  en?: Version;
  mr?: Version;
  /**
   * The question depends on a printed figure. `box` is [x0, y0, x1, y1] in pixels
   * of the 130-dpi page render (extract.py render), on PDF page `page`. Only a
   * figure with NO language-specific text is cropped — one image serves both
   * versions. A chart whose labels are words (a pie chart of expenses) is
   * transcribed as a table in each language instead, so it stays answerable
   * and readable in either.
   */
  figure?: { page: number; box: [number, number, number, number] };
  /**
   * A MEANING difference between the printed Marathi and English (the booklet's
   * own translation error — e.g. "south-west" vs "North-Western"). Both versions
   * are still transcribed exactly as printed; this records what differs. The
   * parity probe cannot see these (same numbers, same structure), so they are
   * caught by reading and MUST be written here, never only in a waiver.
   */
  printNote?: string;
};

const DEVANAGARI_ZERO = 0x0966;

export function devanagariDigitsToAscii(s: string): string {
  return s.replace(/[०-९]/g, (d) => String(d.charCodeAt(0) - DEVANAGARI_ZERO));
}

/**
 * Every number in a string as a sorted multiset, script-neutral: Devanagari
 * digits are converted, and thousands separators dropped so `1,000` and `1000`
 * agree. Decimals stay whole.
 */
export function numberBag(s: string): string[] {
  const ascii = devanagariDigitsToAscii(s);
  const hits = ascii.match(/\d+(?:,\d{2,3})*(?:\.\d+)?/g) ?? [];
  return hits.map((h) => h.replace(/,/g, "")).sort();
}

const ANSWER: Record<string, KeyLetter> = { "1": "A", "2": "B", "3": "C", "4": "D", "#": "#" };

/**
 * Parse an MPSC answer-key token stream. The key prints one row per question —
 * `q, setA, setB, setC, setD`, answers as 1-4 — in two columns that interleave
 * in the text layer, so rows are keyed by their own number, never by position.
 * `#` marks a question the Commission cancelled. Nothing is guessed: an
 * unreadable token or a duplicate row is reported and the row dropped.
 */
export function parseKeyTokens(tokens: string[]): {
  rows: Map<number, KeyLetter[]>;
  errors: string[];
} {
  const clean = tokens.map((t) => t.trim()).filter((t) => t !== "");
  const rows = new Map<number, KeyLetter[]>();
  const errors: string[] = [];

  let i = 0;
  for (; i + 5 <= clean.length; i += 5) {
    const [qTok, ...ans] = clean.slice(i, i + 5);
    const q = Number(qTok);
    if (!Number.isInteger(q) || q < 1) {
      errors.push(`bad question number token: ${qTok}`);
      continue;
    }
    const bad = ans.filter((a) => !(a in ANSWER));
    if (bad.length) {
      errors.push(`Q${q}: unreadable answer token(s) ${bad.join(" ")}`);
      continue;
    }
    if (rows.has(q)) {
      errors.push(`Q${q}: appears twice`);
      continue;
    }
    rows.set(q, ans.map((a) => ANSWER[a]));
  }
  if (i < clean.length) errors.push(`trailing partial group: ${clean.slice(i).join(" ")}`);
  return { rows, errors };
}

/**
 * Parse a key from its printed LINES (words grouped by y-position, sorted by x).
 * A flat token stream is not safe: the text layer's column order differs from
 * key to key, so groups of five straddle rows. A line holds one or two whole
 * `q A B C D` groups; a line of 1-2 tokens is a page-number footer and is set
 * aside (returned in `ignored` so it stays visible); any other length means a
 * cell was lost, and the line is refused rather than let it shift the answers.
 */
export function parseKeyLines(lines: string[][]): {
  rows: Map<number, KeyLetter[]>;
  errors: string[];
  ignored: string[][];
} {
  const groups: string[] = [];
  const errors: string[] = [];
  const ignored: string[][] = [];
  lines.forEach((raw, i) => {
    const line = raw.map((t) => t.trim()).filter((t) => t !== "");
    if (line.length === 0) return;
    if (line.length <= 2) {
      ignored.push(line);
      return;
    }
    if (line.length % 5 !== 0) {
      errors.push(`line ${i + 1} has ${line.length} tokens (not a multiple of 5): ${line.join(" ")}`);
      return;
    }
    groups.push(...line);
  });
  const parsed = parseKeyTokens(groups);
  return { rows: parsed.rows, errors: [...errors, ...parsed.errors], ignored };
}

/**
 * The four booklet sets (A-D) are the same questions in a different order, so
 * every set's answer column must hold the same count of each letter, `#`
 * included. A single misread or mis-extracted cell breaks that balance — a free
 * checksum on a key read off a scan. Empty when balanced.
 */
export function setBalanceIssues(rows: Map<number, KeyLetter[]>): string[] {
  const width = Math.max(0, ...[...rows.values()].map((r) => r.length));
  const counts = Array.from({ length: width }, () => new Map<string, number>());
  for (const sets of rows.values()) sets.forEach((l, i) => counts[i].set(l, (counts[i].get(l) ?? 0) + 1));
  const render = (c: Map<string, number>) =>
    `{${[...c].sort(([a], [b]) => a.localeCompare(b)).map(([l, n]) => `${l}:${n}`).join(" ")}}`;
  const shapes = counts.map(render);
  if (shapes.every((x) => x === shapes[0])) return [];
  return [`set letter counts differ: ${shapes.map((x, i) => `${"ABCD"[i] ?? i} ${x}`).join(" ")}`];
}

/**
 * Where an independent record of the answers disagrees with the official key.
 * The State Services scan carries a coaching institute's boxes drawn on each
 * booklet (data/<id>.boxes.json) — not a key we use, but a second reading of
 * one, so any disagreement is either their error or a misread of the key.
 * A question with no mark is skipped; a mark the key does not cover is reported.
 */
export function markDisagreements(
  marks: Record<string | number, KeyLetter | null>,
  key: Record<string | number, KeyLetter>
): { n: number; mark: KeyLetter; key: KeyLetter | undefined }[] {
  return Object.entries(marks)
    .filter((e): e is [string, KeyLetter] => e[1] !== null && e[1] !== key[e[0]])
    .map(([n, mark]) => ({ n: Number(n), mark, key: key[n] }))
    .sort((a, b) => a.n - b.n);
}

/**
 * Questions whose subject/chapter is not on the exam's fixed list. Chapters
 * auto-create at commit, so a typo or a near-synonym ("Local Self Government"
 * vs "Local Self-Government") would otherwise fork the taxonomy silently —
 * which is exactly what happened to Group B & C.
 */
export function offListChapters(
  questions: { n: number; subject: string; chapter: string }[],
  allowed: Record<string, readonly string[]>
): string[] {
  return questions
    .filter((q) => !(allowed[q.subject] ?? []).includes(q.chapter))
    .map((q) => `Q${q.n}: ${q.subject} / ${q.chapter}`);
}

const fmt = (bag: string[]) => `[${bag.join(",")}]`;
const sameBag = (a: string[], b: string[]) => a.length === b.length && a.every((v, k) => v === b[k]);
const lineCount = (s: string) => s.split("\n").filter((l) => l.trim() !== "").length;

/** Structural + numeric disagreements between the English and Marathi versions. */
export function parityIssues(q: BilingualQuestion): string[] {
  const out: string[] = [];
  const { en, mr } = q;
  if (!en && !mr) return ["no printed version"];

  for (const [lang, v] of [["en", en], ["mr", mr]] as const) {
    if (v && v.options.length !== 4) out.push(`${lang} has ${v.options.length} options, expected 4`);
  }
  if (!en || !mr) return out; // printed in one language only: nothing to compare

  if (Boolean(en.context) !== Boolean(mr.context)) {
    out.push(`context present in ${en.context ? "en" : "mr"} only`);
  } else if (en.context && mr.context) {
    const a = numberBag(en.context);
    const b = numberBag(mr.context);
    if (!sameBag(a, b)) out.push(`context numbers differ: en ${fmt(a)} mr ${fmt(b)}`);
  }

  const se = numberBag(en.stem);
  const sm = numberBag(mr.stem);
  if (!sameBag(se, sm)) out.push(`stem numbers differ: en ${fmt(se)} mr ${fmt(sm)}`);

  const le = lineCount(en.stem);
  const lm = lineCount(mr.stem);
  if (le !== lm) out.push(`stem line count differs: en ${le}, mr ${lm}`);

  const n = Math.min(en.options.length, mr.options.length);
  for (let k = 0; k < n; k++) {
    const a = numberBag(en.options[k]);
    const b = numberBag(mr.options[k]);
    if (!sameBag(a, b)) out.push(`option ${"ABCD"[k]} numbers differ: en ${fmt(a)} mr ${fmt(b)}`);
  }
  return out;
}

/** The upload-row shape commitStaged validates (src/lib/upload/validate.ts RawRow). */
export type MpscRow = {
  sourceRow: number;
  questionNumber: string;
  subject: string;
  chapter: string;
  subtopic: string;
  context?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: "A" | "B" | "C" | "D" | "CANCELLED";
  difficulty: string;
  cancelledNote?: string;
  solution?: string;
};

/**
 * English rows for commitStaged, keyed from the Set-A letter. The ENGLISH
 * version is the canonical row (hash, key, search); Marathi is written after
 * the commit as a translation of it.
 *
 * A question the Commission CANCELLED (`#` in the final key) is KEPT — it was
 * printed and sat — as a `CANCELLED` row carrying `cancelledNote`, with no
 * option marked correct (migration 0119 enforces that at the DB). Its number is
 * also returned in `cancelled`. A question the key does not cover at all is an
 * error — that is a transcription or key defect.
 */
export function buildRecords(
  questions: BilingualQuestion[],
  key: Record<number, KeyLetter>,
  cancelledNote = "Cancelled by MPSC in its final answer key. No option is correct.",
  graded: Record<number, number[]> = {}
): { rows: MpscRow[]; cancelled: number[]; errors: string[] } {
  const rows: MpscRow[] = [];
  const cancelled: number[] = [];
  const errors: string[] = [];
  for (const q of questions) {
    const k = key[q.n];
    if (!k) {
      errors.push(`Q${q.n}: no key entry`);
      continue;
    }
    const marks = graded[q.n];
    if (marks && k !== "#" && gradedKeyLetter(marks) !== k) {
      errors.push(`Q${q.n}: key ${k} but its graded marks make ${gradedKeyLetter(marks)} the best option`);
      continue;
    }
    const solution = questionSolution(q.printNote, marks);
    if (k === "#") cancelled.push(q.n);
    const v = (q.en ?? q.mr)!; // canonical: English, else the one language printed
    const [a, b, c, d] = v.options;
    rows.push({
      sourceRow: q.n,
      questionNumber: String(q.n),
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(v.context ? { context: v.context } : {}),
      question: v.stem,
      optionA: a,
      optionB: b,
      optionC: c,
      optionD: d,
      answer: k === "#" ? "CANCELLED" : k,
      difficulty: q.difficulty,
      ...(k === "#" ? { cancelledNote } : {}),
      ...(solution ? { solution: solution.en } : {}),
    });
  }
  return { rows, cancelled, errors };
}

/**
 * The remark a student sees for a question whose printed Marathi and English
 * differ in meaning (`printNote`). Stored as the question's solution — English
 * on the row, Marathi on its translation — so it appears with the answer, not
 * before the attempt. Null when there is no note.
 */
export function printNoteSolution(note: string | undefined): { en: string; mr: string } | null {
  if (!note) return null;
  return {
    en: `**Note on the printed paper:** the Marathi and English versions of this question differ. ${note}`,
    mr: `**मुद्रित प्रश्नपत्रिकेबाबत टीप:** या प्रश्नाच्या मराठी व इंग्रजी आवृत्तीत फरक आहे. ${note}`,
  };
}

/**
 * CSAT Paper II's decision-making questions are not keyed to one answer: the
 * final key prints MARKS per option (e.g. 0, 1, 1.5, 2.5) and none of them
 * deducts. The bank holds one correct option per MCQ, so the option worth the
 * most is keyed and every option's marks are kept in the solution
 * (`gradedRemark`). Throws on a row that has no single best option — that is a
 * misread, and guessing would key the wrong one.
 */
export function gradedKeyLetter(marks: number[]): KeyLetter {
  if (marks.length !== 4) throw new Error(`graded row needs 4 marks, got ${marks.length}`);
  const best = Math.max(...marks);
  if (marks.filter((m) => m === best).length !== 1) throw new Error(`graded row [${marks.join(",")}] has no single best option`);
  return "ABCD"[marks.indexOf(best)] as KeyLetter;
}

/**
 * The four booklet sets carry the same decision-making questions in another
 * order, so each set's collection of mark rows (each row sorted) must match — a
 * checksum on a hand-transcribed grid, as `setBalanceIssues` is for letters.
 */
export function gradedBalanceIssues(sets: Record<string, Record<string | number, number[]>>): string[] {
  const shape = (rows: Record<string | number, number[]>) =>
    Object.values(rows)
      .map((r) => [...r].sort((a, b) => a - b).join("/"))
      .sort()
      .join(" ");
  const shapes = Object.entries(sets).map(([set, rows]) => [set, shape(rows)] as const);
  if (shapes.every(([, s]) => s === shapes[0][1])) return [];
  return [`graded mark rows differ between sets: ${shapes.map(([set, s]) => `${set} {${s}}`).join(" ")}`];
}

/** Every option's marks, in both languages — the remark a graded question carries. */
export function gradedRemark(marks: number[]): { en: string; mr: string } {
  const list = marks.map((m, i) => `(${"ABCD"[i]}) ${m}`).join(" · ");
  return {
    en:
      `**Decision-making question — marks per option.** MPSC's final key gives each option its own marks, ` +
      `and no option loses marks: ${list}. The option shown as correct is the one worth full marks.`,
    mr:
      `**निर्णयक्षमता प्रश्न — पर्यायनिहाय गुण.** आयोगाच्या अंतिम उत्तरतालिकेत प्रत्येक पर्यायाला स्वतंत्र गुण आहेत, ` +
      `आणि कोणत्याही पर्यायासाठी गुण वजा होत नाहीत: ${list}. बरोबर दाखवलेला पर्याय पूर्ण गुणांचा आहे.`,
  };
}

/** A question's solution text: the graded remark, then the print note; null when neither applies. */
export function questionSolution(printNote: string | undefined, marks: number[] | undefined): { en: string; mr: string } | null {
  const parts = [marks ? gradedRemark(marks) : null, printNoteSolution(printNote)].filter(
    (p): p is { en: string; mr: string } => p !== null
  );
  if (!parts.length) return null;
  return { en: parts.map((p) => p.en).join("\n\n"), mr: parts.map((p) => p.mr).join("\n\n") };
}
