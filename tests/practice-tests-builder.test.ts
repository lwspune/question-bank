/**
 * V's practice-test builder: the questions V asks, in order, the request the
 * finished answers become, and the test row the server stores.
 */
import { describe, it, expect } from "vitest";
import {
  BUILDER_STEPS,
  MAX_CHAPTERS,
  backFrom,
  currentStep,
  toggleChapter,
  type BuilderAnswers,
} from "@/lib/practiceTests/builder";
import { parseBuildRequest, practiceTestRow, practiceTitle } from "@/lib/practiceTests/build";
import { getPracticeExam, PRACTICE_EXAMS } from "@/lib/practiceTests/config";
import { sectionalDurationSecs } from "@/lib/mocks/sectional";

const CHAPTER = "6f1c2a8e-3b2d-4c1e-9a7b-0d4e5f6a7b8c";
const CHAPTER_2 = "7a2d3b9f-4c3e-4d2f-8b8c-1e5f6a7b8c9d";

describe("builder steps", () => {
  it("asks exam, subject, chapters, length, difficulty, then whether to skip answered questions", () => {
    expect(BUILDER_STEPS).toEqual(["exam", "subject", "chapters", "length", "difficulty", "fresh", "summary"]);
  });

  it("is at the first step it has no answer for", () => {
    expect(currentStep({})).toBe("exam");
    expect(currentStep({ exam: "nda" })).toBe("subject");
    expect(currentStep({ exam: "nda", subject: "physics" })).toBe("chapters");
    expect(currentStep({ exam: "nda", subject: "physics", chapterIds: [] })).toBe("chapters");
    const full: BuilderAnswers = {
      exam: "nda",
      subject: "physics",
      chapterIds: [CHAPTER],
      length: 10,
      difficulty: "mixed",
      fresh: true,
    };
    expect(currentStep(full)).toBe("summary");
  });

  it("goes back one step by forgetting the last answer", () => {
    const a: BuilderAnswers = { exam: "nda", subject: "physics", chapterIds: [CHAPTER], length: 20 };
    expect(currentStep(a)).toBe("difficulty");
    const back = backFrom(a);
    expect(back).toEqual({ exam: "nda", subject: "physics", chapterIds: [CHAPTER] });
    expect(currentStep(back)).toBe("length");
  });

  it("forgets the chapters, and the most-asked choice, when going back from the length step", () => {
    const a: BuilderAnswers = { exam: "nda", subject: "physics", chapterIds: [CHAPTER], mostAsked: true };
    expect(backFrom(a)).toEqual({ exam: "nda", subject: "physics" });
  });

  it("does nothing going back from the first step", () => {
    expect(backFrom({})).toEqual({});
  });
});

describe("toggleChapter", () => {
  it("adds and removes a chapter", () => {
    expect(toggleChapter([], CHAPTER)).toEqual([CHAPTER]);
    expect(toggleChapter([CHAPTER, CHAPTER_2], CHAPTER)).toEqual([CHAPTER_2]);
  });

  it(`stops at ${MAX_CHAPTERS} chapters`, () => {
    const five = ["a", "b", "c", "d", "e"];
    expect(MAX_CHAPTERS).toBe(5);
    expect(toggleChapter(five, "f")).toEqual(five);
  });
});

describe("parseBuildRequest", () => {
  const ok = {
    exam: "nda",
    subject: "physics",
    chapterIds: [CHAPTER],
    length: 20,
    difficulty: "mixed",
    fresh: true,
  };

  it("accepts a complete request", () => {
    expect(parseBuildRequest(ok)).toEqual({ ok: true, value: { ...ok, mostAsked: false } });
  });

  it("keeps the most-asked flag", () => {
    const got = parseBuildRequest({ ...ok, mostAsked: true });
    expect(got.ok && got.value.mostAsked).toBe(true);
  });

  it.each([
    ["an exam without practice tests", { exam: "neet" }],
    ["a subject the exam does not have", { subject: "astrology" }],
    ["no chapters", { chapterIds: [] }],
    ["six chapters", { chapterIds: Array(6).fill(CHAPTER).map((c, i) => c.slice(0, -1) + i) }],
    ["a chapter id that is not a uuid", { chapterIds: ["ch-1"] }],
    ["the same chapter twice", { chapterIds: [CHAPTER, CHAPTER] }],
    ["a length not offered", { length: 15 }],
    ["an unknown difficulty", { difficulty: "brutal" }],
    ["a fresh flag that is not a boolean", { fresh: "yes" }],
  ])("refuses %s", (_label, patch) => {
    const got = parseBuildRequest({ ...ok, ...patch });
    expect(got.ok).toBe(false);
  });

  it("refuses a body that is not an object", () => {
    expect(parseBuildRequest(null).ok).toBe(false);
    expect(parseBuildRequest("nda").ok).toBe(false);
  });
});

describe("practiceTitle", () => {
  it("names the exam, subject and chapters, without a dash", () => {
    expect(practiceTitle("NDA", "Physics", ["Laws of Motion"], false)).toBe(
      "NDA Physics practice test: Laws of Motion"
    );
    expect(practiceTitle("NDA", "Physics", ["Laws of Motion", "Work and Energy", "Sound"], false)).toBe(
      "NDA Physics practice test: Laws of Motion, Work and Energy + 1 more"
    );
  });

  it("says most-asked chapters when the student let V choose", () => {
    expect(practiceTitle("MHT-CET", "Maths", ["Vectors", "Matrices", "Limits"], true)).toBe(
      "MHT-CET Maths practice test: most-asked chapters"
    );
  });
});

describe("practiceTestRow", () => {
  const exam = getPracticeExam("nda")!;
  const subject = exam.subjects.find((s) => s.key === "physics")!;
  const now = new Date("2026-10-15T10:00:00Z");
  const row = practiceTestRow({
    id: "11111111-1111-4111-8111-111111111111",
    slug: "practice-abc123",
    ownerId: "22222222-2222-4222-8222-222222222222",
    examId: "33333333-3333-4333-8333-333333333333",
    exam,
    subject,
    title: "NDA Physics practice test: Sound",
    questions: [
      { id: "q1", kind: "pyq" },
      { id: "q2", kind: "pyq" },
      { id: "q3", kind: "pyq" },
    ],
    now,
  });

  it("is a personal test owned by the student, never published", () => {
    expect(row.status).toBe("personal");
    expect(row.scope).toBe("custom");
    expect(row.owner_id).toBe("22222222-2222-4222-8222-222222222222");
    expect(row.pyq_year).toBeNull();
  });

  it("is timed at the real paper's pace and marked by its scheme", () => {
    expect(row.duration_secs).toBe(sectionalDurationSecs(subject.paper, 3));
    const marking = subject.paper.marking;
    expect(row.marking).toEqual(marking);
    expect(row.total_marks).toBeCloseTo(3 * marking.correct);
    expect(row.questions.map((q) => q.position)).toEqual([1, 2, 3]);
    expect(row.questions.every((q) => q.sectionKey === subject.sectionKey)).toBe(true);
    expect(row.sections).toEqual([{ key: subject.sectionKey, label: subject.label, count: 3 }]);
  });

  it("is a past-paper test only when every question is a past-year question", () => {
    expect(row.source).toBe("pyq");
    const mixed = practiceTestRow({
      id: "11111111-1111-4111-8111-111111111111",
      slug: "practice-abc124",
      ownerId: "22222222-2222-4222-8222-222222222222",
      examId: "33333333-3333-4333-8333-333333333333",
      exam,
      subject,
      title: "t",
      questions: [
        { id: "q1", kind: "pyq" },
        { id: "q2", kind: "practice" },
      ],
      now,
    });
    expect(mixed.source).toBe("practice");
  });
});

describe("PRACTICE_EXAMS", () => {
  it("names a real section of the paper for every subject", () => {
    for (const exam of PRACTICE_EXAMS) {
      for (const s of exam.subjects) {
        const section = s.paper.sections.find((x) => x.key === s.sectionKey);
        expect(section, `${exam.slug}/${s.key}`).toBeDefined();
        expect(section!.subjects, `${exam.slug}/${s.key}`).toContain(s.bankSubject);
        expect(s.paper.examSlug).toBe(exam.slug);
      }
    }
  });

  it("gives every subject a unique key within its exam", () => {
    for (const exam of PRACTICE_EXAMS) {
      const keys = exam.subjects.map((s) => s.key);
      expect(new Set(keys).size, exam.slug).toBe(keys.length);
    }
  });

  it("leaves out English and Current Affairs, which a loose test cannot serve", () => {
    for (const exam of PRACTICE_EXAMS) {
      for (const s of exam.subjects) {
        expect(["English", "Current Affairs"]).not.toContain(s.bankSubject);
      }
    }
  });
});
