/**
 * Pure core of the MPSC Mains language-paper ingestion — no I/O, all
 * unit-tested (tests/mpsc-mains-lib.test.ts).
 *
 * The difference from the Group B & C Prelims pipeline (scripts/mpsc): these
 * papers print MOST questions in ONE language. The Marathi section is Marathi
 * only, the English section English only, so there is no English to be
 * canonical for a Marathi grammar question. A question's canonical text is
 * therefore whatever language it was printed in (`lang`), with no translation.
 * Only the General Knowledge section of the 2018 joint paper is printed in
 * both languages; those carry `translation` (Marathi) on an English canonical
 * row, exactly as the Prelims do.
 *
 * `mine` is the transcriber's own answer, written while reading the page and
 * before looking at the key. It does two jobs: `keyFit` measures a key against
 * it (a key filed next to the wrong booklet agrees ~25%), and `derivedKey`
 * turns it into the key for a paper whose official key is missing.
 */
import { scriptLang } from "../../src/lib/i18n/bilingual";
import type { KeyLetter } from "../mpsc/lib";

export type { KeyLetter };
type Letter = "A" | "B" | "C" | "D";

export const SUBJECT_CHAPTERS = {
  Marathi: [
    "वर्णविचार व संधी (Sounds and Sandhi)",
    "शब्दांच्या जाती (Parts of Speech)",
    "लिंग, वचन व विभक्ती (Gender, Number and Case)",
    "काळ (Tense)",
    "प्रयोग (Voice)",
    "समास (Compounds)",
    "शब्दसिद्धी (Word Formation)",
    "वाक्यप्रकार व वाक्यपृथक्करण (Sentence Types and Analysis)",
    "अलंकार व वृत्त (Figures of Speech and Metre)",
    "शुद्धलेखन व विरामचिन्हे (Spelling and Punctuation)",
    "समानार्थी व विरुद्धार्थी शब्द (Synonyms and Antonyms)",
    "शब्दसमूहाबद्दल एक शब्द (One-Word Substitution)",
    "वाक्प्रचार व म्हणी (Idioms and Proverbs)",
    "उतारा आकलन (Comprehension)",
    "मराठी साहित्य (Marathi Literature)",
  ],
  English: [
    "Synonyms and Antonyms",
    "Vocabulary and Word Usage",
    "One-Word Substitution",
    "Idioms and Phrases",
    "Spelling",
    "Parts of Speech",
    "Articles, Prepositions and Conjunctions",
    "Tenses and Verb Forms",
    "Subject-Verb Agreement",
    "Voice",
    "Direct and Indirect Speech",
    "Sentence Transformation",
    "Question Tags",
    "Clauses and Sentence Types",
    "Error Detection and Correction",
    "Punctuation",
    "Figures of Speech",
    "Comprehension",
  ],
  "General Knowledge": [
    "History",
    "Geography",
    "Indian Polity",
    "Economy",
    "General Science",
    "Current Affairs",
    "Maharashtra",
    "Computers and IT",
    "Reasoning",
  ],
} as const;

export type Subject = keyof typeof SUBJECT_CHAPTERS;
export const SUBJECTS = Object.keys(SUBJECT_CHAPTERS) as Subject[];

export type Printed = { stem: string; context?: string; options: string[] };

export type MainsQuestion = {
  n: number;
  subject: Subject;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  /** The language this question is printed in — its canonical text. */
  lang: "mr" | "en";
  stem: string;
  /** Shared passage for a comprehension set. */
  context?: string;
  options: string[];
  /** Marathi version, ONLY for a question printed in both languages (English canonical). */
  translation?: Printed;
  /** The transcriber's own answer, written before reading the key. */
  mine?: Letter;
  /** Figure crop (130-dpi render pixels) — see scripts/mpsc/lib.ts. */
  figure?: { page: number; box: [number, number, number, number] };
};

/** Everything that would make a question wrong to commit. */
export function questionIssues(q: MainsQuestion): string[] {
  const out: string[] = [];
  const chapters = SUBJECT_CHAPTERS[q.subject] as readonly string[] | undefined;
  if (!chapters) out.push(`Q${q.n}: unknown subject "${q.subject}"`);
  else if (!chapters.includes(q.chapter)) out.push(`Q${q.n}: chapter "${q.chapter}" is not one of the ${q.subject} chapters`);
  if (q.options.length !== 4) out.push(`Q${q.n}: ${q.options.length} options, expected 4`);
  q.options.forEach((o, i) => {
    if (!o.trim()) out.push(`Q${q.n}: option ${"ABCD"[i]} is empty`);
  });
  const read = scriptLang(`${q.context ?? ""}\n${q.stem}`);
  if (read !== q.lang) out.push(`Q${q.n}: lang ${q.lang} but the stem reads ${read}`);
  if (q.translation && q.lang !== "en") out.push(`Q${q.n}: a translation needs an English canonical row`);
  if (q.translation && q.translation.options.length !== 4) {
    out.push(`Q${q.n}: translation has ${q.translation.options.length} options`);
  }
  return out;
}

/**
 * A comprehension passage is written once, on the first question of its set;
 * the others carry `"context": "@<n>"`. This expands those references (also
 * inside a translation). A reference to a question with no passage is an
 * error, never a silent blank.
 */
export function resolveContextRefs(questions: MainsQuestion[]): { questions: MainsQuestion[]; errors: string[] } {
  const byN = new Map(questions.map((q) => [q.n, q]));
  const errors: string[] = [];
  const resolve = (q: MainsQuestion, ref: string | undefined, pick: (t: MainsQuestion) => string | undefined) => {
    if (!ref?.startsWith("@")) return ref;
    const target = byN.get(Number(ref.slice(1)));
    const text = target ? pick(target) : undefined;
    if (!text || text.startsWith("@")) {
      errors.push(`Q${q.n}: context ${ref} points at a question with no passage`);
      return undefined;
    }
    return text;
  };
  const out = questions.map((q) => {
    const next: MainsQuestion = { ...q };
    if (q.context !== undefined) next.context = resolve(q, q.context, (t) => t.context);
    if (q.translation?.context !== undefined) {
      next.translation = { ...q.translation, context: resolve(q, q.translation.context, (t) => t.translation?.context) };
    }
    return next;
  });
  return { questions: out, errors };
}

/** How far a key agrees with the transcriber's own answers. */
export function keyFit(
  questions: MainsQuestion[],
  key: Record<number, KeyLetter>
): { compared: number; agree: number; disagreements: number[] } {
  let compared = 0;
  let agree = 0;
  const disagreements: number[] = [];
  for (const q of questions) {
    const k = key[q.n];
    if (!q.mine || !k || k === "#") continue;
    compared++;
    if (k === q.mine) agree++;
    else disagreements.push(q.n);
  }
  return { compared, agree, disagreements };
}

/** The key of a paper with no official one: the transcriber's answers, complete or nothing. */
export function derivedKey(questions: MainsQuestion[]): { key: Record<number, KeyLetter>; missing: number[] } {
  const key: Record<number, KeyLetter> = {};
  const missing: number[] = [];
  for (const q of questions) {
    if (q.mine) key[q.n] = q.mine;
    else missing.push(q.n);
  }
  return { key, missing };
}

/** The upload-row shape commitStaged validates (src/lib/upload/validate.ts RawRow). */
export type MainsRow = {
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
};

/**
 * Rows for commitStaged. The canonical text is the printed language's own; a
 * `#` in the final key is kept as a CANCELLED row with its notice (migration
 * 0119), never dropped or keyed.
 */
export function buildRows(
  questions: MainsQuestion[],
  key: Record<number, KeyLetter>,
  cancelledNote: string
): { rows: MainsRow[]; cancelled: number[]; errors: string[] } {
  const rows: MainsRow[] = [];
  const cancelled: number[] = [];
  const errors: string[] = [];
  for (const q of questions) {
    const k = key[q.n];
    if (!k) {
      errors.push(`Q${q.n}: no key entry`);
      continue;
    }
    if (k === "#") cancelled.push(q.n);
    const [a, b, c, d] = q.options;
    rows.push({
      sourceRow: q.n,
      questionNumber: String(q.n),
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.context ? { context: q.context } : {}),
      question: q.stem,
      optionA: a,
      optionB: b,
      optionC: c,
      optionD: d,
      answer: k === "#" ? "CANCELLED" : k,
      difficulty: q.difficulty,
      ...(k === "#" ? { cancelledNote } : {}),
    });
  }
  return { rows, cancelled, errors };
}
