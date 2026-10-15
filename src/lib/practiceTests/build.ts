/**
 * A build request checked at the API boundary, and the mock_tests row a
 * practice test is stored as (migration 0156).
 *
 * The row reuses the chapter-test blueprint (../mocks/sectional.ts
 * sectionalBlueprint): one section of the subject's real paper, timed at that
 * paper's pace and marked by its scheme, so grading and the result page need
 * nothing new. What makes it a practice test is status 'personal', scope
 * 'custom' and its owner, which the database requires together.
 *
 * Pure. Spec: tests/practice-tests-builder.test.ts.
 */
import { sectionMarking } from "@/lib/mocks/blueprints";
import { sectionalBlueprint, sectionalSource } from "@/lib/mocks/sectional";
import { MAX_CHAPTERS } from "./builder";
import { getPracticeExam, getPracticeSubject, type PracticeExam, type PracticeSubject } from "./config";
import { PRACTICE_LENGTHS, type PracticeDifficulty } from "./pick";

export type BuildRequest = {
  exam: string;
  subject: string;
  chapterIds: string[];
  mostAsked: boolean;
  length: number;
  difficulty: PracticeDifficulty;
  fresh: boolean;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DIFFICULTIES: readonly PracticeDifficulty[] = ["mixed", "easier", "harder"];

export function parseBuildRequest(
  body: unknown
): { ok: true; value: BuildRequest } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Send the test you want as a JSON object." };
  }
  const b = body as Record<string, unknown>;
  const exam = typeof b.exam === "string" ? getPracticeExam(b.exam) : null;
  if (!exam) return { ok: false, error: "V can't build a practice test for that exam yet." };
  if (typeof b.subject !== "string" || !getPracticeSubject(exam, b.subject)) {
    return { ok: false, error: "Pick a subject this exam has." };
  }
  const chapterIds = b.chapterIds;
  if (
    !Array.isArray(chapterIds) ||
    chapterIds.length === 0 ||
    chapterIds.length > MAX_CHAPTERS ||
    !chapterIds.every((c) => typeof c === "string" && UUID.test(c)) ||
    new Set(chapterIds).size !== chapterIds.length
  ) {
    return { ok: false, error: `Pick between 1 and ${MAX_CHAPTERS} chapters.` };
  }
  if (typeof b.length !== "number" || !(PRACTICE_LENGTHS as readonly number[]).includes(b.length)) {
    return { ok: false, error: `A test has ${PRACTICE_LENGTHS.join(", ")} questions.` };
  }
  if (typeof b.difficulty !== "string" || !DIFFICULTIES.includes(b.difficulty as PracticeDifficulty)) {
    return { ok: false, error: "Pick Mixed, Easier or Harder." };
  }
  if (typeof b.fresh !== "boolean") {
    return { ok: false, error: "Say whether to skip questions you have answered." };
  }
  return {
    ok: true,
    value: {
      exam: exam.slug,
      subject: b.subject,
      chapterIds: chapterIds as string[],
      mostAsked: b.mostAsked === true,
      length: b.length,
      difficulty: b.difficulty as PracticeDifficulty,
      fresh: b.fresh,
    },
  };
}

/** "NDA Physics practice test: Laws of Motion, Work and Energy + 1 more". */
export function practiceTitle(
  examShort: string,
  subjectLabel: string,
  chapterNames: readonly string[],
  mostAsked: boolean
): string {
  const head = `${examShort} ${subjectLabel} practice test`;
  if (mostAsked) return `${head}: most-asked chapters`;
  const shown = chapterNames.slice(0, 2).join(", ");
  const more = chapterNames.length > 2 ? ` + ${chapterNames.length - 2} more` : "";
  return `${head}: ${shown}${more}`;
}

export type PracticeTestRowInput = {
  id: string;
  slug: string;
  ownerId: string;
  examId: string;
  exam: PracticeExam;
  subject: PracticeSubject;
  title: string;
  /** In sitting order. */
  questions: readonly { id: string; kind: string }[];
  now: Date;
};

export function practiceTestRow(i: PracticeTestRowInput) {
  const n = i.questions.length;
  const bp = sectionalBlueprint(i.subject.paper, i.subject.sectionKey, n, i.subject.label);
  const marking = sectionMarking(bp, bp.sections[0]);
  return {
    id: i.id,
    slug: i.slug,
    exam_id: i.examId,
    paper_code: bp.code,
    source: sectionalSource(i.questions.map((q) => q.kind)),
    scope: "custom" as const,
    pyq_year: null,
    pyq_month: null,
    title: i.title,
    duration_secs: bp.durationSecs,
    marking: bp.marking,
    sections: [{ key: i.subject.sectionKey, label: i.subject.label, count: n }],
    questions: i.questions.map((q, at) => ({
      position: at + 1,
      questionId: q.id,
      sectionKey: i.subject.sectionKey,
      marks: marking.correct,
      negMarks: marking.wrong,
    })),
    total_questions: n,
    total_marks: Math.round(n * marking.correct * 100) / 100,
    status: "personal" as const,
    owner_id: i.ownerId,
    updated_at: i.now.toISOString(),
  };
}
