/**
 * "Second page" rules: V's one-time hello and the next-step card (2026-10-04).
 *
 * Most search visitors read one chapter page and leave. Two nudges point them
 * at a second page that is NOT more of the same: the chapter's test, its notes,
 * or (from notes) its real past questions. Both follow the engagement gate in
 * CLAUDE.md: no pop-up over the content, nothing on arrival, once per device
 * for the hello, and every one of them is counted (growth registry,
 * "second-page") so it can be removed if it does nothing.
 *
 * Pure; spec tests/second-page.test.ts.
 */
import type { MockCta } from "@/lib/mocks/chapterTests";

/** Reveals on THIS page that count as interest. */
export const GREET_REVEALS = 2;
/** Seconds on the page that count as interest, together with a scroll. */
export const GREET_SECONDS = 40;
/** The next-step card sits after this many questions. */
export const CARD_AFTER = 5;

export type GreetState = {
  signedIn: boolean;
  /** Sign-in state not yet known: never greet in that window. */
  authLoading: boolean;
  /** This device has seen the hello before. */
  alreadyGreeted: boolean;
  chatOpen: boolean;
  /** Another bottom-of-screen element is showing (the notes test bar). */
  bottomBarOpen: boolean;
  revealsThisVisit: number;
  secondsOnPage: number;
  scrolled: boolean;
};

export function shouldGreet(s: GreetState): boolean {
  if (s.signedIn || s.authLoading || s.alreadyGreeted) return false;
  if (s.chatOpen || s.bottomBarOpen) return false;
  if (s.revealsThisVisit >= GREET_REVEALS) return true;
  return s.secondsOnPage >= GREET_SECONDS && s.scrolled;
}

export type HelloSurface = "questions" | "notes";
export type HelloTarget = "chapter_test" | "paper" | "notes" | "questions" | "bank";

export type HelloInput = {
  surface: HelloSurface;
  chapterName: string;
  /** The chapter's public question count. */
  questionCount: number;
  mock: MockCta | null;
  notesHref: string | null;
  /** The chapter's /questions page (offered from notes). */
  questionsHref: string | null;
  /** The chapter in the full bank. */
  bankHref: string | null;
};

export type Hello = { href: string; text: string; target: HelloTarget };

function testHello(m: MockCta): Hello {
  return m.kind === "chapter"
    ? {
        href: m.href,
        target: "chapter_test",
        text: `Psst… want to see how you'd score? Try the ${m.questions}-question ${m.chapterName} test →`,
      }
    : {
        href: m.href,
        target: "paper",
        text: `Psst… fancy a real ${m.examDisplay} paper? Sit one, timed →`,
      };
}

/** V's one line, or null when there is nowhere better to send this reader. */
export function pickHello(i: HelloInput): Hello | null {
  if (i.surface === "notes") {
    // The notes test bar already offers the test, so the hello offers the
    // chapter's real questions first.
    if (i.questionsHref) {
      return {
        href: i.questionsHref,
        target: "questions",
        text: `Reading done? See how ${i.chapterName} is really asked: ${i.questionCount} past questions →`,
      };
    }
    return i.mock ? testHello(i.mock) : null;
  }
  if (i.mock) return testHello(i.mock);
  if (i.notesHref) {
    return {
      href: i.notesHref,
      target: "notes",
      text: `Stuck on one? The ${i.chapterName} notes have a trick for each type →`,
    };
  }
  if (i.bankHref) {
    return {
      href: i.bankHref,
      target: "bank",
      text: `Only warming up? All ${i.questionCount} ${i.chapterName} questions are in the bank. Filter by year →`,
    };
  }
  return null;
}

export type NextStep = { href: string; label: string; target: HelloTarget };

/** The next-step card's links: test, notes, bank, in that order. */
export function nextStepLinks(i: HelloInput): NextStep[] {
  const out: NextStep[] = [];
  if (i.mock) {
    out.push(
      i.mock.kind === "chapter"
        ? { href: i.mock.href, target: "chapter_test", label: `Take the ${i.mock.questions}-question chapter test` }
        : { href: i.mock.href, target: "paper", label: `Sit a real ${i.mock.examDisplay} paper` }
    );
  }
  if (i.notesHref) out.push({ href: i.notesHref, target: "notes", label: `Read the ${i.chapterName} notes` });
  if (i.bankHref) out.push({ href: i.bankHref, target: "bank", label: `Filter all ${i.questionCount} by year or level` });
  return out;
}

/**
 * Index of the list group after which the card goes: the first group whose end
 * reaches `n` questions. A set of questions sharing a passage is one group, so
 * the card never lands inside a set. Null when the list is shorter than `n`.
 */
export function insertAfterGroup(groupSizes: readonly number[], n: number): number | null {
  let seen = 0;
  for (let g = 0; g < groupSizes.length; g++) {
    seen += groupSizes[g];
    if (seen >= n) return g;
  }
  return null;
}
