/**
 * What V is shown of a question, for "Ask V about this question" (2026-10-19,
 * study-partner Phase 1), and the two rules the server keeps for it.
 *
 * The scope agreed with the owner: V explains FROM the question's stored
 * solution and key. It never works out its own answer and never disagrees
 * with the key, so the views below hand it those two things and nothing it
 * would have to solve. A hint gets the question and the solution's first step
 * only, with no key, so V cannot give the answer away by accident.
 *
 * A full explanation is one of the day's free answers, counted the way every
 * other reveal is (question_practiced rows since midnight IST): `revealCheck`.
 *
 * Pure. Spec: tests/chat-question-tools.test.ts.
 */
import { matchesNumericAnswer } from "@/lib/mocks/answers";
import { formatProvenance } from "@/lib/questions/formatProvenance";
import type { QuestionRow } from "@/lib/questions/query";

export type VQuestion = {
  id: string;
  text: string;
  context: string | null;
  /** A figure goes with the stem; V cannot see it. */
  hasFigure: boolean;
  solution: string | null;
  format: "mcq" | "subjective" | "numeric";
  numericAnswer: number | null;
  options: { label: string; text: string; isCorrect: boolean }[];
  exam: string;
  subject: string;
  chapter: string;
  subtopic: string | null;
  /** For a similar question from the same subtopic. */
  subtopicId: string | null;
  /** Which past paper it is from, or that it is practice (originLine); null when unknown. */
  origin: string | null;
};

export function toVQuestion(row: QuestionRow): VQuestion {
  return {
    id: row.id,
    text: row.text,
    context: row.context,
    hasFigure: Boolean(row.imageUrl),
    solution: row.solution,
    format: row.questionFormat ?? "mcq",
    numericAnswer: row.numericAnswer ?? null,
    options: row.options.map((o) => ({ label: o.label, text: o.text, isCorrect: o.isCorrect })),
    exam: row.exam.name,
    subject: row.subject.name,
    chapter: row.chapter.name,
    subtopic: row.subtopic?.name ?? null,
    subtopicId: row.subtopic?.id ?? null,
    origin: originLine({
      kind: row.questionKind ?? null,
      examName: row.exam.name,
      questionNumber: row.questionNumber,
      pyqYear: row.pyqYear,
      pyqMonth: row.pyqMonth,
      // Already through publicPyqNote: a sitting label, or null when the note names a source.
      pyqNote: row.pyqNote,
    }),
  };
}

/**
 * The question's paper, as V is told it: the label the question card shows
 * (formatProvenance). 2026-10-24: a student asked "Which yrs ques is this" and
 * V said it could not tell, though the bank held 8 Apr 2023. A practice row's
 * note names a source, so it is never printed, only "a practice question".
 */
export function originLine(p: {
  kind: "pyq" | "practice" | null;
  examName: string;
  questionNumber: string | null;
  pyqYear: number | null;
  pyqMonth: string | null;
  pyqNote: string | null;
}): string | null {
  if (p.kind === "practice") return "A practice question, not from a past paper.";
  if (p.kind !== "pyq") return null;
  const label = formatProvenance(p);
  if (!label) return "A past-year question; its paper and year are not recorded.";
  return p.pyqYear === null ? `From the past paper: ${label} (its year is not recorded).` : `From the past paper: ${label}.`;
}

const FIRST_STEP_MAX = 300;

/** The stored solution's first line, cut at a sentence end when long. A hint is built from it. */
export function firstStep(solution: string | null): string | null {
  const line = (solution ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!line) return null;
  if (line.length <= FIRST_STEP_MAX) return line;
  const cut = line.slice(0, FIRST_STEP_MAX);
  const end = cut.lastIndexOf(". ");
  return end > 0 ? cut.slice(0, end + 1) : cut;
}

/** The key as V should quote it. Never guessed: an MCQ with no option marked says so. */
export function answerText(q: VQuestion): string {
  if (q.format === "numeric") return q.numericAnswer === null ? "not recorded" : String(q.numericAnswer);
  if (q.format === "subjective") return "the model answer in the solution";
  const right = q.options.find((o) => o.isCorrect);
  return right ? `(${right.label}) ${right.text}` : "not recorded";
}

function header(q: VQuestion): string[] {
  const where = `${q.exam}, ${q.subject}, ${q.chapter}${q.subtopic ? ` (${q.subtopic})` : ""}`;
  const lines = [`Question ${q.id} from ${where}:`];
  if (q.context) lines.push(`Passage: ${q.context}`);
  lines.push(q.text);
  if (q.options.length > 0) lines.push(`Options: ${q.options.map((o) => `(${o.label}) ${o.text}`).join(" | ")}`);
  if (q.hasFigure) lines.push("This question has a figure you cannot see: explain only from the text and the solution.");
  if (q.origin) lines.push(q.origin);
  return lines;
}

/** For a hint: the question and the solution's first step. No key, no rest of the solution. */
export function hintView(q: VQuestion): string {
  const step = firstStep(q.solution);
  return [
    ...header(q),
    step ? `First step of the solution: ${step}` : "No worked solution for this question.",
    "Give a hint from that first step only. Do not say which option is right.",
  ].join("\n");
}

/**
 * For a full explanation: the key and the whole solution, and what the student picked. Labelled in the
 * student's words, never "stored": V repeats what it reads (2026-10-23, 39 of 218 replies said "stored").
 */
export function explainView(q: VQuestion, chose: string | null, entered: number | null = null): string {
  const lines = [...header(q), `Correct answer: ${answerText(q)}`];
  const picked = chose ? q.options.find((o) => o.label === chose) : undefined;
  if (picked) {
    lines.push(`The student chose (${picked.label}) ${picked.text}, which is ${picked.isCorrect ? "right" : "wrong"}.`);
  }
  // A numeric (NAT) answer, graded with the mock's own tolerance. 0 is an answer, so test for null.
  if (q.format === "numeric" && entered !== null && q.numericAnswer !== null) {
    lines.push(`The student entered ${entered}, which is ${matchesNumericAnswer(entered, q.numericAnswer) ? "right" : "wrong"}.`);
  }
  lines.push(
    q.solution && q.solution.trim()
      ? `Solution:\n${q.solution}`
      : "No worked solution for this question: give the correct answer and say there is no worked solution for it yet."
  );
  return lines.join("\n");
}

export type RevealCheck = { kind: "ok"; counts: boolean } | { kind: "limit"; limit: number };

/**
 * May V explain this question, and does it use up a free answer? `limit` null
 * means no limit (switched off, or a pass). A question already opened today is
 * free: the day's list counts distinct questions.
 */
export function revealCheck(input: { limit: number | null; todayIds: readonly string[]; questionId: string }): RevealCheck {
  if (input.limit === null) return { kind: "ok", counts: false };
  if (input.todayIds.includes(input.questionId)) return { kind: "ok", counts: false };
  if (input.todayIds.length >= input.limit) return { kind: "limit", limit: input.limit };
  return { kind: "ok", counts: true };
}

/** One of the candidates, never the question itself or one opened today. `random` in [0, 1). */
export function pickSimilar(candidates: readonly string[], exclude: ReadonlySet<string>, random: () => number = Math.random): string | null {
  const left = candidates.filter((id) => !exclude.has(id));
  if (left.length === 0) return null;
  return left[Math.min(left.length - 1, Math.floor(random() * left.length))];
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PICKS = new Set(["A", "B", "C", "D", "E"]);

/** No real numeric answer is this large; anything bigger is junk, not an answer. */
const ENTERED_MAX = 1e9;

/**
 * The question the student tapped Ask V on, and what they did with it: the
 * option they picked, the number they entered (a numeric question), or that
 * they skipped it in a test. 2026-10-24: V asked a student who had skipped a
 * mock question "which option did you pick?".
 */
export type AskedQuestion = { id: string; chose: string | null; entered: number | null; skipped: boolean };

/** The question a chat request says the student tapped Ask V on. Anything malformed is no question. */
export function parseAskedQuestion(raw: unknown): AskedQuestion | null {
  if (!raw || typeof raw !== "object") return null;
  const { id, chose, entered, skipped } = raw as { id?: unknown; chose?: unknown; entered?: unknown; skipped?: unknown };
  if (typeof id !== "string" || !UUID_RE.test(id)) return null;
  const pick = typeof chose === "string" ? chose.toUpperCase() : null;
  const picked = pick && PICKS.has(pick) ? pick : null;
  const number = typeof entered === "number" && Number.isFinite(entered) && Math.abs(entered) < ENTERED_MAX ? entered : null;
  // A skip that contradicts an answer is dropped: the answer is what V needs.
  return { id, chose: picked, entered: number, skipped: skipped === true && picked === null && number === null };
}

// LaTeX commands that only lay maths out; their names are not in a pasted copy.
const LAYOUT_COMMANDS = /\\(?:d?frac|tfrac|left|right|mathrm|mathbf|text|textbf|displaystyle|quad|qquad|big|bigg|Big|limits|operatorname)\b/g;
const SYMBOLS: Record<string, string> = { "∫": "int", "√": "sqrt", "π": "pi", "θ": "theta", "α": "alpha", "β": "beta", "∞": "infty" };
const MATCH_MIN = 0.6;
const MATCH_MAX = 3;

/** A stem as letters and digits only: what survives both LaTeX and a copy from the rendered page. */
function squash(s: string): string {
  return s
    .replace(LAYOUT_COMMANDS, " ")
    .replace(/[∫√πθαβ∞]/g, (c) => SYMBOLS[c] ?? c)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    // A copied fraction can come out denominator first ("73" for 3/7): compare each digit run in sorted order.
    .replace(/\d+/g, (run) => [...run].sort().join(""));
}

function trigrams(s: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i + 3 <= s.length; i++) out.add(s.slice(i, i + 3));
  return out;
}

/**
 * The stems a pasted question most likely is, best first. A copy from the
 * page keeps the letters and digits of the stored LaTeX in order ("int x x 1
 * log x dx") but not its spacing, so both are squashed to letters and digits
 * and compared as runs of three; a stem counts when most of its runs are in
 * the paste, which also carries the student's own words ("give me pure ans").
 */
export function matchPasted(text: string, stems: readonly { id: string; text: string }[]): string[] {
  const pasted = trigrams(squash(text));
  if (pasted.size === 0) return [];
  return stems
    .map((s) => {
      const own = trigrams(squash(s.text));
      let hit = 0;
      for (const t of own) if (pasted.has(t)) hit += 1;
      return { id: s.id, hit, score: own.size === 0 ? 0 : hit / own.size };
    })
    .filter((s) => s.score >= MATCH_MIN)
    // Most of a stem must be in the paste, and then the bigger overlap wins: a short stem
    // (\int\cos^7 x\,dx) is "mostly contained" in any long paste and must not beat the real one.
    .sort((a, b) => b.hit - a.hit || b.score - a.score)
    .slice(0, MATCH_MAX)
    .map((s) => s.id);
}
