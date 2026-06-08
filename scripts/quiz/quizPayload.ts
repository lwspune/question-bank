/**
 * Pure helpers for shaping a harvested quiz into the nda-tracker import contract.
 * No I/O — unit-tested in tests/quiz-payload.test.ts. The push script (push.ts)
 * and any future /notes harvester both funnel through buildImportPayload so a
 * malformed quiz never reaches the wire.
 */

import { createHash } from "node:crypto";

export const LETTERS = ["A", "B", "C", "D"] as const;
export type Letter = (typeof LETTERS)[number];

// nda-tracker's `quizzes.id` column is UUID, but we want human-readable, STABLE
// quiz ids in source (so a re-push UPDATES the existing draft instead of inserting
// a duplicate). Map the slug to a deterministic UUIDv5 — same slug ⇒ same UUID,
// forever — using native crypto (no `uuid` dependency). A value that is already a
// UUID is passed through untouched.
const UUID_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(String(value).trim());
}

export function slugToUuid(slug: string, namespace: string = UUID_NAMESPACE): string {
  const nsBytes = Buffer.from(namespace.replace(/-/g, ""), "hex");
  const bytes = createHash("sha1")
    .update(nsBytes)
    .update(Buffer.from(slug, "utf8"))
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50; // version 5
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export type QuizQuestion = {
  q: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  chapter?: string;
  subtopic?: string;
  difficulty?: string;
  /** Provenance — which /notes concept this MCQ came from. Rides into
   *  nda-tracker's stored question JSON (buildQuizRow passes questions through)
   *  so a future analytics pass can join attempt-results back to concepts. */
  conceptSlug?: string;
};

export type DraftQuiz = {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  marking?: { correct: number; wrong: number };
};

export type ImportPayload = DraftQuiz & { status: "draft"; questions: QuizQuestion[] };

// Mirrors nda-tracker's quizQuestionComplete: text + 4 options + a correct A–D.
function questionIssue(q: QuizQuestion, idx: number): string | null {
  const label = `Q${idx + 1}`;
  if (!q.question || !String(q.question).trim()) return `${label}: missing question text`;
  for (const L of LETTERS) {
    const v = q[`option${L}` as keyof QuizQuestion];
    if (!v || !String(v).trim()) return `${label}: missing option ${L}`;
  }
  if (!LETTERS.includes(String(q.answer || "").toUpperCase() as Letter)) {
    return `${label}: answer must be one of A, B, C, D (got "${q.answer}")`;
  }
  return null;
}

/**
 * Validate + normalise a quiz for import. Throws on any problem (fail fast, before
 * the wire). Renumbers questions 1..n and uppercases answer letters defensively.
 */
export function buildImportPayload(quiz: DraftQuiz): ImportPayload {
  if (!quiz.id || !String(quiz.id).trim()) throw new Error("quiz id is required");
  if (!quiz.title || !String(quiz.title).trim()) throw new Error("quiz title is required");
  if (!quiz.subject || !String(quiz.subject).trim()) throw new Error("quiz subject is required");
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    throw new Error("quiz must have at least one question");
  }

  const questions = quiz.questions.map((q, idx) => {
    const issue = questionIssue(q, idx);
    if (issue) throw new Error(issue);
    return {
      ...q,
      q: idx + 1,
      answer: String(q.answer).toUpperCase(),
    };
  });

  return {
    ...quiz,
    id: isUuid(quiz.id) ? String(quiz.id).trim() : slugToUuid(quiz.id),
    questions,
    status: "draft",
  };
}
