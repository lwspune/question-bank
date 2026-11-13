/**
 * The exam a page address names, and which signal to trust when guessing a
 * new student's exam on /welcome (2026-11-13).
 *
 * WHY. 57% of sign-ups land first on a chapter page such as
 * /questions/mht-cet/physics/electrostatics, mostly from ChatGPT, and /welcome
 * then asked their exam cold: the only pre-selection was the `qb_exam` cookie,
 * which a chapter page never sets. 46% of students since 2026-09-01 have no
 * exam, and those who skip never pick one later. The page they came from
 * already says it, so /welcome asks them to CONFIRM it instead.
 *
 * A guess is only ever offered, never saved: nothing reaches the profile until
 * the student taps.
 *
 * THE RULE. On the routes below, the second segment (the third under
 * /mock/exam) is an exam slug, or begins with one followed by "-": a notes
 * subject route (mht-cet-maths), a guide (nda-physics), a Learn course
 * (mh-hsc-12-maths), a homework plan (mh-ssc-10-science-1) or a mock paper slug
 * (mht-cet-2025-apr-19-s2-maths). The LONGEST exam slug wins, because ssc-cgl
 * begins ssc-cgl-tier-2. An exam's own home (/nda) counts on an exact slug.
 *
 * Left out on purpose, each measured on first landings 13 Oct to 13 Nov:
 * /browse names its exam by an internal id, not a slug (39); MPSC paper slugs
 * (mpsc-2025-c, 12) start with the FAMILY, not one exam, so a guess would be
 * wrong as often as right; /store slugs name books; /blog slugs are titles.
 *
 * Pure. Spec: tests/exam-from-path.test.ts.
 */
import { EXAM_REGISTRY, isExamSlug, type ExamSlug } from "./examContext";

/** Routes whose second segment names an exam, directly or as a prefix. */
const EXAM_ROUTES = new Set([
  "questions",
  "board",
  "question-papers",
  "exams",
  "formula",
  "notes",
  "guide",
  "learn",
  "homework",
  "mock",
]);

/** Longest first, so ssc-cgl-tier-2 is tried before ssc-cgl. */
const SLUGS_LONGEST_FIRST: readonly ExamSlug[] = [...EXAM_REGISTRY.map((e) => e.slug)].sort(
  (a, b) => b.length - a.length
);

function resolveSlug(segment: string): ExamSlug | null {
  if (isExamSlug(segment)) return segment;
  return SLUGS_LONGEST_FIRST.find((s) => segment.startsWith(`${s}-`)) ?? null;
}

/** The exam a same-site path names, or null. */
export function examFromPath(path: string | null | undefined): ExamSlug | null {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return null;
  const bare = path.split(/[?#]/, 1)[0];
  let decoded: string;
  try {
    decoded = decodeURIComponent(bare);
  } catch {
    return null;
  }
  const segments = decoded.toLowerCase().split("/").filter(Boolean);
  const route = segments[0];
  if (!route) return null;
  // An exam's own home (/nda): exact slugs only, never a prefix.
  if (isExamSlug(route)) return route;
  if (!EXAM_ROUTES.has(route)) return null;
  const segment = route === "mock" && segments[1] === "exam" ? segments[2] : segments[1];
  return segment ? resolveSlug(segment) : null;
}

export type ExamGuess = { slug: ExamSlug; from: "cookie" | "next" | "landing" };

/**
 * Which exam to offer, best signal first: the exam the visitor tapped (the
 * `qb_exam` cookie, set by the homepage chips), then the page they are going
 * back to, then the page they first landed on (saved at sign-in).
 */
export function guessExam(input: {
  cookie: string | null | undefined;
  next: string | null | undefined;
  landing: string | null | undefined;
}): ExamGuess | null {
  if (isExamSlug(input.cookie)) return { slug: input.cookie, from: "cookie" };
  const fromNext = examFromPath(input.next);
  if (fromNext) return { slug: fromNext, from: "next" };
  const fromLanding = examFromPath(input.landing);
  if (fromLanding) return { slug: fromLanding, from: "landing" };
  return null;
}
