/**
 * V's chapter lesson (2026-11-21, the owner's mockup B "V starts from your
 * mistakes"): the first build sent V text alone, so V wrote the map as a plain
 * list, linked the notes as a raw path and asked "Shall we move on to part 2?"
 * with no button to answer. The lesson is now DATA the window draws: a map card
 * with the mistakes in each part, a question to try, and three buttons (Go on ·
 * Explain more simply · Open the notes). Pure core: src/lib/chat/lesson.ts.
 */
import { describe, it, expect } from "vitest";
import {
  carriedLesson,
  lessonHasButtons,
  notesPanelHref,
  partTryCard,
  goOnLabel,
  goOnMessage,
  lessonLinkLabels,
  lessonNotesLink,
  lessonOpenLink,
  lessonOrder,
  nextPart,
  parseLesson,
  pickLessonTry,
  simplerMessage,
  type LessonPart,
  type VLesson,
} from "@/lib/chat/lesson";

const part = (n: number, title: string, missed = 0): LessonPart => ({
  n,
  title,
  href: `/notes/nda-maths/probability/p${n}`,
  missed,
});

const PARTS: LessonPart[] = [
  part(1, "Classical Probability & Counting", 1),
  part(2, "Event Algebra & the Addition Rule"),
  part(3, "Independent Events & Multiplication Rule", 2),
  part(4, "Conditional Probability, Total Probability & Bayes'", 1),
  part(5, "Bounds on Probability"),
];

const lesson = (over: Partial<VLesson> = {}): VLesson => ({
  kind: "notes",
  order: [3, 1, 4, 2, 5],
  tryLearn: null,
  exam: "NDA",
  chapter: "Probability",
  notesHref: "/notes/nda-maths/probability",
  questionsHref: "/questions/nda/mathematics/probability",
  parts: PARTS,
  current: 3,
  next: 1,
  showMap: true,
  missed: 4,
  tryQuestionId: "11111111-1111-4111-8111-111111111111",
  tryOwn: false,
  ...over,
});

describe("lessonOrder", () => {
  it("parts with mistakes first, most first, then the rest in book order", () => {
    expect(lessonOrder(PARTS)).toEqual([3, 1, 4, 2, 5]);
  });

  it("a tie goes to the earlier part", () => {
    expect(lessonOrder([part(1, "A", 1), part(2, "B", 1), part(3, "C")])).toEqual([1, 2, 3]);
  });

  it("no mistakes: book order", () => {
    expect(lessonOrder([part(1, "A"), part(2, "B"), part(3, "C")])).toEqual([1, 2, 3]);
  });
});

describe("nextPart", () => {
  it("Go on follows the same order, so it never loops back to a part already taught", () => {
    expect(nextPart(PARTS, 3)).toBe(1);
    expect(nextPart(PARTS, 1)).toBe(4);
    expect(nextPart(PARTS, 4)).toBe(2);
    expect(nextPart(PARTS, 2)).toBe(5);
  });

  it("the last part has no next", () => {
    expect(nextPart(PARTS, 5)).toBeNull();
  });

  it("a part the chapter does not have has no next", () => {
    expect(nextPart(PARTS, 9)).toBeNull();
  });
});

describe("button messages", () => {
  it("Go on asks for the next part by number, chapter and exam, so V calls chapter_overview with it", () => {
    expect(goOnMessage(lesson())).toBe("Teach me part 1 of Probability for NDA: Classical Probability & Counting.");
  });

  // 2026-11-21 (owner's review of the sheet): Go on jumped from part 1 to part 3 with no warning.
  it("the Go on button names the part it goes to, and says the whole of it to a screen reader", () => {
    expect(goOnLabel(lesson())).toEqual({ text: "Go on: part 1", aria: "Go on to part 1, Classical Probability & Counting" });
    expect(goOnLabel(lesson({ current: 5, next: null }))).toBeNull();
  });

  it("no next part: no Go on", () => {
    expect(goOnMessage(lesson({ current: 5, next: null }))).toBeNull();
  });

  it("Explain more simply names the part being taught", () => {
    expect(simplerMessage(lesson())).toBe("Explain part 3 of Probability, Independent Events & Multiplication Rule, more simply.");
  });
});

describe("lessonLinkLabels", () => {
  it("names each page by what it is, never by its path", () => {
    expect(lessonLinkLabels(lesson())).toEqual({
      "/notes/nda-maths/probability": "Probability notes",
      "/questions/nda/mathematics/probability": "Probability questions",
      "/notes/nda-maths/probability/p1": "Classical Probability & Counting",
      "/notes/nda-maths/probability/p2": "Event Algebra & the Addition Rule",
      "/notes/nda-maths/probability/p3": "Independent Events & Multiplication Rule",
      "/notes/nda-maths/probability/p4": "Conditional Probability, Total Probability & Bayes'",
      "/notes/nda-maths/probability/p5": "Bounds on Probability",
    });
  });
});

describe("carriedLesson", () => {
  it("a follow-up keeps the lesson's buttons, without a second map or question to try", () => {
    const c = carriedLesson(lesson());
    expect(c.showMap).toBe(false);
    expect(c.tryQuestionId).toBeNull();
    expect(c.current).toBe(3);
    expect(c.next).toBe(1);
  });

  it("moved to another part, its next follows the order", () => {
    const c = carriedLesson(lesson(), 1);
    expect(c.current).toBe(1);
    expect(c.next).toBe(4);
  });
});

describe("parseLesson", () => {
  it("accepts a lesson as the route sends it", () => {
    expect(parseLesson(JSON.parse(JSON.stringify(lesson())))).toEqual(lesson());
  });

  it("refuses anything else", () => {
    expect(parseLesson(null)).toBeNull();
    expect(parseLesson({ ...lesson(), parts: [] })).toBeNull();
    expect(parseLesson({ ...lesson(), current: 9 })).toBeNull();
    expect(parseLesson({ ...lesson(), chapter: 3 })).toBeNull();
  });

  it("keeps whether the question to try is the student's own mistake; anything but true is not", () => {
    expect(parseLesson(JSON.parse(JSON.stringify(lesson({ tryOwn: true }))))!.tryOwn).toBe(true);
    expect(parseLesson({ ...lesson(), tryOwn: "yes" })!.tryOwn).toBe(false);
    const old = JSON.parse(JSON.stringify(lesson()));
    delete old.tryOwn;
    expect(parseLesson(old)!.tryOwn).toBe(false);
  });

  it("a link that is not a site path is dropped, never followed", () => {
    const p = parseLesson({ ...lesson({ current: 1, next: null }), notesHref: "https://evil.example", parts: [{ ...PARTS[0], href: "javascript:alert(1)" }] });
    expect(p?.notesHref).toBeNull();
    expect(p?.parts[0].href).toBeNull();
  });
});

// 2026-11-21 (real capture): a random pick gave a hard coin-toss sequence question as the check
// straight after a basic dice lesson. A check after teaching starts easy.
describe("pickLessonTry", () => {
  const c = (id: string, difficulty: string | null) => ({ id, difficulty });

  it("prefers an easy question, then a moderate one, then a hard one", () => {
    expect(pickLessonTry([c("h", "HARD"), c("m", "MODERATE"), c("e", "EASY")], new Set(), () => 0)).toBe("e");
    expect(pickLessonTry([c("h", "HARD"), c("m", "MODERATE")], new Set(), () => 0)).toBe("m");
    expect(pickLessonTry([c("h", "HARD")], new Set(), () => 0)).toBe("h");
  });

  it("never picks an excluded question (their waiting mistakes, or one opened today)", () => {
    expect(pickLessonTry([c("e", "EASY"), c("m", "MODERATE")], new Set(["e"]), () => 0)).toBe("m");
    expect(pickLessonTry([c("e", "EASY")], new Set(["e"]), () => 0)).toBeNull();
  });

  it("a question with no difficulty label comes after the labelled easy and moderate ones", () => {
    expect(pickLessonTry([c("x", null), c("m", "MODERATE")], new Set(), () => 0)).toBe("m");
    expect(pickLessonTry([c("x", null), c("h", "HARD")], new Set(), () => 0)).toBe("x");
  });

  it("picks at random within the easiest group", () => {
    expect(pickLessonTry([c("e1", "EASY"), c("e2", "EASY"), c("m", "MODERATE")], new Set(), () => 0.99)).toBe("e2");
  });
});

describe("a Learn lesson (2026-11-22: Learn first wherever it teaches the chapter)", () => {
  const LEARN_PARTS: LessonPart[] = [
    { n: 1, title: "Types of matrices", href: "/learn/lesson/matrices/types-of-matrices?course=cbse-12-maths", missed: 0, progress: "done" },
    { n: 2, title: "Adding matrices and scalar multiples", href: "/learn/lesson/matrices/matrix-addition-scalar?course=cbse-12-maths", missed: 0, progress: "done" },
    { n: 3, title: "Multiplying matrices", href: "/learn/lesson/matrices/matrix-multiplication?course=cbse-12-maths", missed: 2, progress: { right: 1, of: 3 } },
    { n: 4, title: "Properties of matrix multiplication", href: "/learn/lesson/matrices/multiplication-properties?course=cbse-12-maths", missed: 0, progress: "new" },
  ];
  const learn = (over: Partial<VLesson> = {}): VLesson =>
    lesson({
      kind: "learn",
      exam: "CBSE Class 12",
      chapter: "Matrices",
      notesHref: null,
      questionsHref: "/questions/cbse-12/mathematics/matrices",
      parts: LEARN_PARTS,
      current: 3,
      order: [3, 4],
      next: 4,
      missed: 3,
      tryQuestionId: null,
      tryOwn: false,
      tryLearn: { chapter: "matrices", concept: "matrix-multiplication" },
      ...over,
    });

  it("the buttons say lesson, and Go on asks for the lesson by number", () => {
    expect(goOnLabel(learn())).toEqual({ text: "Go on: lesson 4", aria: "Go on to lesson 4, Properties of matrix multiplication" });
    expect(goOnMessage(learn())).toBe("Teach me lesson 4 of Matrices for CBSE Class 12: Properties of matrix multiplication.");
    expect(simplerMessage(learn())).toBe("Explain lesson 3 of Matrices, Multiplying matrices, more simply.");
  });

  it("the lesson's own order decides Go on, not the mistakes", () => {
    expect(carriedLesson(learn(), 4).next).toBeNull();
    expect(carriedLesson(learn({ order: [3, 4, 1] }), 4).next).toBe(1);
  });

  it("the main link opens the lesson; the notes, where there are some, come second", () => {
    expect(lessonOpenLink(learn())).toEqual({ href: LEARN_PARTS[2].href, label: "Open the lesson" });
    expect(lessonNotesLink(learn())).toBeNull();
    expect(lessonNotesLink(learn({ notesHref: "/notes/mht-cet-maths/vectors" }))).toEqual({ href: "/notes/mht-cet-maths/vectors", label: "Open the notes" });
    // A notes lesson keeps one link, to the notes.
    expect(lessonOpenLink(lesson())).toEqual({ href: PARTS[2].href, label: "Open the notes" });
    expect(lessonNotesLink(lesson())).toBeNull();
  });

  it("a follow-up drops the question to try", () => {
    expect(carriedLesson(learn()).tryLearn).toBeNull();
  });

  it("parses back with its progress, order and Learn question", () => {
    expect(parseLesson(JSON.parse(JSON.stringify(learn())))).toEqual(learn());
  });

  it("refuses a Learn question or progress that is not well formed", () => {
    expect(parseLesson({ ...learn(), tryLearn: { chapter: "../x", concept: "y" } })!.tryLearn).toBeNull();
    expect(parseLesson({ ...learn(), parts: [{ ...LEARN_PARTS[0], progress: { right: 9, of: -1 } }], current: 1, next: null, order: [1] })!.parts[0].progress).toBeNull();
    expect(parseLesson({ ...learn(), order: [3, 99] })!.order).toEqual([3]);
  });

  it("a lesson saved before this change still reads, as a notes lesson in mistake order", () => {
    const old = JSON.parse(JSON.stringify(lesson()));
    delete old.kind;
    delete old.order;
    const back = parseLesson(old)!;
    expect(back.kind).toBe("notes");
    expect(back.order).toEqual([3, 1, 4, 2, 5]);
  });
});

// 2026-11-27 (owner, from a screenshot of V picking part 4 itself): a notes chapter works the way
// a Learn chapter does. The map is the reply, the STUDENT picks a part, its notes open in a panel
// over V, and closing the panel shows that part's question as Your turn. No Go on, no Explain more
// simply, no Open the notes: V does not teach the part in its own words.
describe("a notes lesson the student picks from (2026-11-27)", () => {
  const OWN = "22222222-2222-4222-8222-222222222222";
  const FRESH = "33333333-3333-4333-8333-333333333333";
  const pickParts: LessonPart[] = [
    { ...PARTS[0], tryId: OWN, tryOwn: true },
    { ...PARTS[1], tryId: FRESH, tryOwn: false },
    { ...PARTS[2], tryId: null, tryOwn: false },
    PARTS[3],
    PARTS[4],
  ];
  const picked = (over: Partial<VLesson> = {}): VLesson =>
    lesson({ pick: true, parts: pickParts, next: null, tryQuestionId: null, tryOwn: false, ...over });

  it("has no lesson buttons, like a Learn map; a notes lesson V teaches keeps them", () => {
    expect(lessonHasButtons(picked())).toBe(false);
    expect(lessonHasButtons(lesson())).toBe(true);
    expect(lessonHasButtons(lesson({ kind: "learn" }))).toBe(false);
  });

  it("a part row opens that part's notes in the panel; nothing else does", () => {
    expect(notesPanelHref(picked(), pickParts[0])).toBe("/notes/nda-maths/probability/p1");
    // A notes lesson V teaches, a Learn row, or a topic with no page: not the panel.
    expect(notesPanelHref(lesson(), PARTS[0])).toBeNull();
    expect(notesPanelHref(picked({ kind: "learn" }), pickParts[0])).toBeNull();
    expect(notesPanelHref(picked(), { ...PARTS[0], href: null })).toBeNull();
    // Only a notes part page the panel can read (a chapter page is not one).
    expect(notesPanelHref(picked(), { ...PARTS[0], href: "/notes/nda-maths/probability" })).toBeNull();
  });

  it("after the panel closes, Your turn is that part's question: their own mistake says so", () => {
    expect(partTryCard(picked(), 1)).toEqual({ id: OWN, again: true });
    expect(partTryCard(picked(), 2)).toEqual({ id: FRESH, again: false });
    expect(partTryCard(picked(), 3)).toBeNull();
    expect(partTryCard(picked(), 5)).toBeNull();
    expect(partTryCard(picked(), 9)).toBeNull();
  });

  it("parses back with its pick and each part's question", () => {
    expect(parseLesson(JSON.parse(JSON.stringify(picked())))).toEqual(picked());
  });

  it("a part question that is not a question id is dropped; pick means nothing on a Learn lesson", () => {
    const bad = parseLesson({ ...picked(), parts: [{ ...pickParts[0], tryId: "javascript:x", tryOwn: true }], current: 1, order: [1] })!;
    expect(bad.parts[0].tryId).toBeUndefined();
    expect(bad.parts[0].tryOwn).toBeUndefined();
    expect(partTryCard(bad, 1)).toBeNull();
    expect(parseLesson({ ...picked(), kind: "learn" })!.pick).toBeUndefined();
    expect(parseLesson({ ...picked(), pick: "yes" })!.pick).toBeUndefined();
  });
});
