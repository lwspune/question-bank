/**
 * The three-step loop that teaches a student what PYQ Vault is for — written
 * ONCE here and rendered by /start, the welcome step and the welcome email,
 * so the copy cannot disagree across surfaces. STUDENT_EDUCATION_SPEC.md §3.
 *
 * WHY IT EXISTS. Measured 2026-09-24: 149 of 193 mock-takers used a mock and
 * nothing else; 2 students had ever finished a drill. The features were not
 * unused because they were unwanted — they were unreachable in the student's
 * head, because nothing on the site ever said what happens after a mock.
 *
 * THE LOOP IS CHOSEN FROM REGISTRY FLAGS, never from prose. An exam with
 * mocks gets the mock loop (sit → fix → map). A board or practice-only exam
 * has no mocks, so its loop is the book reader (or the bank), attempt-first
 * reveal, and saving — telling a Class 12 student to "sit a mock" would send
 * them to an empty catalogue. Mocks win when both flags are set.
 *
 * Pure: no React, no DB. Spec: tests/how-it-works.test.ts.
 */
import { withArticle } from "@/lib/text/article";
import type { ExamEntry } from "@/lib/exam/examContext";

/** "practice" is the practice-first experiment's loop — see onboardingArm. */
export type LoopKind = "mock" | "bank" | "practice";

export type LoopStep = {
  /** Imperative, three to five words: "Sit a real past paper." */
  title: string;
  /** One or two plain sentences saying what it is and what it does for them. */
  body: string;
  /** Same-origin path the step starts at. */
  href: string;
  /** Button label for the step's link. */
  cta: string;
};

export type Loop = {
  kind: LoopKind;
  /** The exam's short name when the loop is exam-specific, else null. */
  examLabel: string | null;
  steps: readonly [LoopStep, LoopStep, LoopStep];
};

/** Where /signup sends a student with no specific destination. */
export const WELCOME_DEFAULT_NEXT = "/browse";

function mockLoop(exam: ExamEntry | null): Loop {
  const catalogue = exam ? `/mock/exam/${exam.slug}` : "/mock";
  return {
    kind: "mock",
    examLabel: exam?.displayName ?? null,
    steps: [
      {
        title: "Sit a real past paper.",
        body: "Timed and auto-graded, the exact questions of one sitting. Answer what you can and leave the rest; the result counts what you attempted.",
        href: catalogue,
        cta: exam ? `Start ${withArticle(exam.displayName)} paper` : "Pick a paper",
      },
      {
        title: "Fix what you missed.",
        body: "Five of the questions you got wrong, with solutions. A question you get right goes quiet; one you miss comes back round. About five minutes.",
        href: "/drill",
        cta: "Fix your mistakes",
      },
      {
        title: "Watch your map fill.",
        body: "Every subtopic a paper touched, coloured by how you did. It changes because of what you fix, not because of how often you log in.",
        href: "/me/map",
        cta: "See your map",
      },
    ],
  };
}

function bankLoop(exam: ExamEntry | null): Loop {
  const reader = exam?.boardExam ? `/board/${exam.slug}` : "/browse";
  return {
    kind: "bank",
    examLabel: exam?.displayName ?? null,
    steps: [
      {
        title: exam?.boardExam ? "Read the chapter as the book lays it out." : "Work a chapter in order.",
        body: exam?.boardExam
          ? "Solved examples first, then the exercise, in the book's own order, with every answer worked."
          : "Filter to one chapter and go question by question, with the solution under each.",
        href: reader,
        cta: exam?.boardExam ? "Open the book reader" : "Open the bank",
      },
      {
        title: "Attempt before you reveal.",
        body: "Write your answer, then tap Show answer. Reading a solution you did not try teaches nothing.",
        href: "/browse",
        cta: "Browse questions",
      },
      {
        title: "Save what you will revisit.",
        body: "The bookmark on any question keeps it on one page for revision week.",
        href: "/saved",
        cta: "Your saved questions",
      },
    ],
  };
}

/** The loop for a student's primary exam; null (no exam chosen) gets the
 *  general mock loop from the whole catalogue. */
export function loopFor(exam: ExamEntry | null | undefined): Loop {
  if (!exam) return mockLoop(null);
  if (exam.hasMocks === true) return mockLoop(exam);
  return bankLoop(exam);
}

/**
 * THE PRACTICE-FIRST EXPERIMENT (2026-10-01, growth readout). Half of new
 * students with a mock exam see this loop on the welcome step instead of the
 * mock loop: practise one chapter, then sit a paper, then fix what you missed.
 *
 * WHY: a full paper is a hard first step (27% of attempts are abandoned; the
 * median MHT-CET Paper II attempt answers 8%), and bank practice carries the
 * largest retention lift measured on /dashboard/pmf. That lift is a
 * correlation, so it is tested on half rather than shipped to everyone.
 *
 * ONLY THE WELCOME STEP CHANGES. /start and the welcome email keep loopFor.
 */
export type OnboardingArm = "mock-first" | "practice-first";

/**
 * Even first hex digit of the user id = control, odd = practice-first. Fixed
 * per account and needs no stored column: the readout recomputes it in SQL as
 *   ('x' || left(user_id::text, 1))::bit(4)::int % 2 = 1   -- practice-first
 * A malformed id falls into the control arm.
 */
export function onboardingArm(userId: string): OnboardingArm {
  const digit = parseInt(userId.charAt(0), 16);
  return Number.isNaN(digit) || digit % 2 === 0 ? "mock-first" : "practice-first";
}

/**
 * Where "Practise a chapter" opens: the page listing the exam's chapter pages.
 * The exam home for every exam but NDA, whose home (/nda) lists guides, not
 * chapters — NDA goes to its section of /questions. Mirrors examHomeHref, which
 * is not imported because this module must stay free of Next/DB imports (the
 * welcome email script runs it in plain Node); the spec pins the two together.
 */
export function chapterPickerHref(slug: string): string {
  return slug === "nda" ? "/questions#nda" : `/exams/${slug}`;
}

function practiceFirstLoop(exam: ExamEntry): Loop {
  return {
    kind: "practice",
    examLabel: exam.displayName,
    steps: [
      {
        title: "Practise one chapter.",
        body: "Pick the chapter you are studying. Answer each question first, then tap Show answer.",
        href: chapterPickerHref(exam.slug),
        cta: "Practise a chapter",
      },
      {
        title: "Sit a real past paper when ready.",
        body: "Timed and auto-graded, the exact questions of one sitting. Answer what you can and leave the rest.",
        href: `/mock/exam/${exam.slug}`,
        cta: `Start ${withArticle(exam.displayName)} paper`,
      },
      {
        title: "Fix what you missed.",
        body: "Five of the questions you got wrong, with solutions. A question you get right goes quiet; one you miss comes back round.",
        href: "/drill",
        cta: "Fix your mistakes",
      },
    ],
  };
}

/** The welcome step's loop for one arm. Exams without mocks are unaffected. */
export function loopForArm(exam: ExamEntry | null | undefined, arm: OnboardingArm): Loop {
  if (arm === "practice-first" && exam && exam.hasMocks === true) return practiceFirstLoop(exam);
  return loopFor(exam);
}

export type Destination = { href: string; label: string };

/**
 * The two buttons on the welcome step. A student who arrived with a SPECIFIC
 * `?next=` (a mock they tapped before being asked to sign up, /pricing from a
 * quiz) keeps that as the primary — redirecting a specific intent to sell a
 * feature is the pattern the engagement gate forbids. With the default next,
 * the loop's first step leads and the bank is the fallback.
 */
export function welcomeDestination(
  next: string,
  loop: Loop
): { primary: Destination; secondary: Destination } {
  const entry: Destination = { href: loop.steps[0].href, label: loop.steps[0].cta };
  // In the practice loop the paper is step 2, and it is the one other thing
  // worth offering on this screen; elsewhere the fallback is the bank.
  const fallback: Destination =
    loop.kind === "practice"
      ? { href: loop.steps[1].href, label: "Sit a paper" }
      : { href: WELCOME_DEFAULT_NEXT, label: "Browse the bank" };
  if (next === WELCOME_DEFAULT_NEXT || next === entry.href) {
    return { primary: entry, secondary: fallback };
  }
  return { primary: { href: next, label: "Continue" }, secondary: entry };
}
