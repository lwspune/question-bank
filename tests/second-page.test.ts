import { describe, it, expect } from "vitest";
import {
  shouldGreet,
  pickHello,
  nextStepLinks,
  insertAfterGroup,
  GREET_REVEALS,
  GREET_SECONDS,
  type HelloInput,
} from "@/lib/growth/secondPage";
import type { MockCta } from "@/lib/mocks/chapterTests";

const base = {
  signedIn: false,
  authLoading: false,
  alreadyGreeted: false,
  chatOpen: false,
  bottomBarOpen: false,
  revealsThisVisit: 0,
  secondsOnPage: 0,
  scrolled: false,
};

describe("shouldGreet", () => {
  it("waits for interest: never on arrival", () => {
    expect(shouldGreet(base)).toBe(false);
  });

  it("greets after enough reveals on this page", () => {
    expect(shouldGreet({ ...base, revealsThisVisit: GREET_REVEALS })).toBe(true);
    expect(shouldGreet({ ...base, revealsThisVisit: GREET_REVEALS - 1 })).toBe(false);
  });

  it("greets after enough time only if the visitor also scrolled", () => {
    expect(shouldGreet({ ...base, secondsOnPage: GREET_SECONDS, scrolled: true })).toBe(true);
    expect(shouldGreet({ ...base, secondsOnPage: GREET_SECONDS, scrolled: false })).toBe(false);
    expect(shouldGreet({ ...base, secondsOnPage: GREET_SECONDS - 1, scrolled: true })).toBe(false);
  });

  it("never greets a signed-in visitor, or before sign-in state is known", () => {
    const keen = { ...base, revealsThisVisit: 5 };
    expect(shouldGreet({ ...keen, signedIn: true })).toBe(false);
    expect(shouldGreet({ ...keen, authLoading: true })).toBe(false);
  });

  it("greets once per device", () => {
    expect(shouldGreet({ ...base, revealsThisVisit: 5, alreadyGreeted: true })).toBe(false);
  });

  it("stays quiet while the chat or a bottom bar is open", () => {
    const keen = { ...base, revealsThisVisit: 5 };
    expect(shouldGreet({ ...keen, chatOpen: true })).toBe(false);
    expect(shouldGreet({ ...keen, bottomBarOpen: true })).toBe(false);
  });
});

const chapterTest: MockCta = {
  kind: "chapter",
  href: "/mock/mht-cet-probability",
  examDisplay: "MHT-CET",
  chapterName: "Probability",
  questions: 20,
  minutes: 36,
};
const paper: MockCta = { kind: "paper", href: "/mock/exam/nda", examDisplay: "NDA" };

const q = (over: Partial<HelloInput> = {}): HelloInput => ({
  surface: "questions",
  chapterName: "Probability",
  questionCount: 120,
  mock: null,
  notesHref: null,
  questionsHref: null,
  bankHref: "/browse?chapter=x",
  ...over,
});

describe("pickHello on a chapter questions page", () => {
  it("offers the chapter test first", () => {
    const h = pickHello(q({ mock: chapterTest, notesHref: "/notes/a/b" }));
    expect(h).toMatchObject({ href: chapterTest.href, target: "chapter_test" });
    expect(h!.text).toContain("20-question Probability test");
  });

  it("offers a past paper when the exam has mocks but no chapter test", () => {
    const h = pickHello(q({ mock: paper, notesHref: "/notes/a/b" }));
    expect(h).toMatchObject({ href: paper.href, target: "paper" });
    expect(h!.text).toContain("NDA");
  });

  it("then the notes", () => {
    const h = pickHello(q({ notesHref: "/notes/a/b" }));
    expect(h).toMatchObject({ href: "/notes/a/b", target: "notes" });
  });

  it("then the full bank, quoting the real count", () => {
    const h = pickHello(q());
    expect(h).toMatchObject({ href: "/browse?chapter=x", target: "bank" });
    expect(h!.text).toContain("120");
  });

  it("offers nothing when there is nowhere to go", () => {
    expect(pickHello(q({ bankHref: null }))).toBeNull();
  });
});

describe("pickHello on a notes page", () => {
  const n = (over: Partial<HelloInput> = {}) => q({ surface: "notes", ...over });

  it("offers the chapter's past questions first (the test bar already offers the test)", () => {
    const h = pickHello(n({ questionsHref: "/questions/a/b/c", mock: chapterTest }));
    expect(h).toMatchObject({ href: "/questions/a/b/c", target: "questions" });
    expect(h!.text).toContain("120");
  });

  it("falls back to the test when the chapter has no questions page", () => {
    const h = pickHello(n({ mock: chapterTest }));
    expect(h).toMatchObject({ href: chapterTest.href, target: "chapter_test" });
  });

  it("never sends a notes reader back to the notes", () => {
    expect(pickHello(n({ notesHref: "/notes/a/b", bankHref: null }))).toBeNull();
  });
});

describe("nextStepLinks", () => {
  it("lists test, notes and bank in that order, skipping what is missing", () => {
    const links = nextStepLinks(q({ mock: chapterTest, notesHref: "/notes/a/b" }));
    expect(links.map((l) => l.target)).toEqual(["chapter_test", "notes", "bank"]);
    expect(nextStepLinks(q()).map((l) => l.target)).toEqual(["bank"]);
  });
});

describe("insertAfterGroup", () => {
  it("returns the group index whose end first reaches n questions", () => {
    expect(insertAfterGroup([1, 1, 1, 1, 1, 1], 5)).toBe(4);
  });

  it("never splits a set: a set that crosses n keeps the card after it", () => {
    expect(insertAfterGroup([1, 1, 4, 1], 5)).toBe(2);
  });

  it("returns null when the list has fewer than n questions", () => {
    expect(insertAfterGroup([1, 1, 1], 5)).toBeNull();
  });
});
