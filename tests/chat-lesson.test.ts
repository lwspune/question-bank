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
  goOnLabel,
  goOnMessage,
  lessonLinkLabels,
  lessonOrder,
  nextPart,
  parseLesson,
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

  it("a link that is not a site path is dropped, never followed", () => {
    const p = parseLesson({ ...lesson({ current: 1, next: null }), notesHref: "https://evil.example", parts: [{ ...PARTS[0], href: "javascript:alert(1)" }] });
    expect(p?.notesHref).toBeNull();
    expect(p?.parts[0].href).toBeNull();
  });
});
