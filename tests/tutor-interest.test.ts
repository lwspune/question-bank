import { describe, it, expect } from "vitest";
import {
  validateTutorInterest,
  normaliseFrom,
  summariseTutorInterest,
  type TutorInterestRow,
} from "@/lib/tutor/interest";

describe("validateTutorInterest", () => {
  it("accepts a student who wants tutoring, with a mode", () => {
    expect(validateTutorInterest({ role: "student", wants: true, mode: "online" })).toEqual({
      ok: true,
      value: { role: "student", wants: true, mode: "online" },
    });
  });

  it("accepts a teacher who would teach, with either mode", () => {
    expect(validateTutorInterest({ role: "teacher", wants: true, mode: "either" })).toEqual({
      ok: true,
      value: { role: "teacher", wants: true, mode: "either" },
    });
  });

  it("accepts a No with no mode, and stores the mode as null", () => {
    expect(validateTutorInterest({ role: "student", wants: false })).toEqual({
      ok: true,
      value: { role: "student", wants: false, mode: null },
    });
  });

  it("refuses a Yes without a mode", () => {
    expect(validateTutorInterest({ role: "student", wants: true }).ok).toBe(false);
  });

  it("refuses a No that carries a mode, as the database would", () => {
    expect(validateTutorInterest({ role: "teacher", wants: false, mode: "offline" }).ok).toBe(false);
  });

  it("refuses an unknown role or mode, and a non-boolean answer", () => {
    expect(validateTutorInterest({ role: "parent", wants: true, mode: "online" }).ok).toBe(false);
    expect(validateTutorInterest({ role: "student", wants: true, mode: "home" }).ok).toBe(false);
    expect(validateTutorInterest({ role: "student", wants: "yes", mode: "online" }).ok).toBe(false);
    expect(validateTutorInterest(null).ok).toBe(false);
  });
});

describe("normaliseFrom", () => {
  it("keeps a plain section name", () => {
    expect(normaliseFrom("notes")).toBe("notes");
    expect(normaliseFrom("question-papers")).toBe("question-papers");
  });

  it("drops anything else to null", () => {
    expect(normaliseFrom(null)).toBeNull();
    expect(normaliseFrom("")).toBeNull();
    expect(normaliseFrom("Notes")).toBeNull();
    expect(normaliseFrom("<script>")).toBeNull();
    expect(normaliseFrom("a".repeat(41))).toBeNull();
  });
});

describe("summariseTutorInterest", () => {
  const row = (r: Partial<TutorInterestRow>): TutorInterestRow => ({
    role: "student",
    wants: true,
    mode: "online",
    exam_slug: null,
    signed_in: false,
    ...r,
  });

  it("splits Yes by mode and counts No apart, per role", () => {
    const s = summariseTutorInterest([
      row({ mode: "online" }),
      row({ mode: "offline" }),
      row({ mode: "either" }),
      row({ mode: "online" }),
      row({ wants: false, mode: null }),
      row({ role: "teacher", mode: "offline" }),
    ]);
    expect(s.student).toEqual({ yes: 4, no: 1, online: 2, offline: 1, either: 1 });
    expect(s.teacher).toEqual({ yes: 1, no: 0, online: 0, offline: 1, either: 0 });
    expect(s.total).toBe(6);
  });

  it("ranks the exams of student Yes answers, unknown exam last", () => {
    const s = summariseTutorInterest([
      row({ exam_slug: "nda" }),
      row({ exam_slug: "mht-cet" }),
      row({ exam_slug: "mht-cet" }),
      row({ exam_slug: null }),
      row({ exam_slug: "nda", wants: false, mode: null }),
      row({ role: "teacher", exam_slug: "nda" }),
    ]);
    expect(s.studentYesByExam).toEqual([
      { exam: "mht-cet", count: 2 },
      { exam: "nda", count: 1 },
      { exam: null, count: 1 },
    ]);
  });

  it("counts signed-in answers", () => {
    const s = summariseTutorInterest([row({ signed_in: true }), row({})]);
    expect(s.signedIn).toBe(1);
  });

  it("is all zeros on no rows", () => {
    const s = summariseTutorInterest([]);
    expect(s.total).toBe(0);
    expect(s.student.yes).toBe(0);
    expect(s.studentYesByExam).toEqual([]);
  });
});
