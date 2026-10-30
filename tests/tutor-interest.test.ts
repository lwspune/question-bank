import { describe, it, expect } from "vitest";
import {
  validateTutorInterest,
  normaliseFrom,
  summariseTutorInterest,
  stepsAfterYes,
  buildTutorContacts,
  tallyYesByCity,
  type TutorContact,
  type TutorInterestRow,
} from "@/lib/tutor/interest";

describe("stepsAfterYes", () => {
  it("asks for the city, then the mobile, after a Yes when neither is on file", () => {
    expect(stepsAfterYes({ wants: true, hasCity: false, hasMobile: false })).toEqual(["city", "contact"]);
  });

  it("skips what is already on file", () => {
    expect(stepsAfterYes({ wants: true, hasCity: true, hasMobile: false })).toEqual(["contact"]);
    expect(stepsAfterYes({ wants: true, hasCity: false, hasMobile: true })).toEqual(["city"]);
    expect(stepsAfterYes({ wants: true, hasCity: true, hasMobile: true })).toEqual([]);
  });

  it("asks nothing more after a No", () => {
    expect(stepsAfterYes({ wants: false, hasCity: false, hasMobile: false })).toEqual([]);
  });
});

describe("buildTutorContacts", () => {
  const answer = (r: Partial<Parameters<typeof buildTutorContacts>[0][number]>) => ({
    user_id: "u1",
    role: "student" as const,
    wants: true,
    mode: "online" as const,
    exam_slug: "nda",
    created_at: "2026-10-28T03:00:00Z",
    ...r,
  });

  it("lists signed-in Yes answers newest first, with name, email and mobile", () => {
    const { contacts } = buildTutorContacts(
      [
        answer({ user_id: "u1", created_at: "2026-10-28T03:00:00Z" }),
        answer({ user_id: "u2", role: "teacher", mode: "either", exam_slug: null, created_at: "2026-10-28T09:00:00Z" }),
      ],
      new Map([
        ["u1", { name: "Asha", email: "asha@example.com" }],
        ["u2", { name: null, email: "t@example.com" }],
      ]),
      new Map([["u1", { mobile: "919876543210", city: "Pune" }]])
    );
    expect(contacts).toEqual([
      { userId: "u2", name: null, email: "t@example.com", mobile: null, city: null, role: "teacher", mode: "either", examSlug: null, answeredAt: "2026-10-28T09:00:00Z" },
      { userId: "u1", name: "Asha", email: "asha@example.com", mobile: "919876543210", city: "Pune", role: "student", mode: "online", examSlug: "nda", answeredAt: "2026-10-28T03:00:00Z" },
    ]);
  });

  it("leaves out No answers and counts signed-out Yes answers as unreachable", () => {
    const out = buildTutorContacts(
      [answer({ wants: false, mode: null }), answer({ user_id: null }), answer({ user_id: null, role: "teacher" })],
      new Map(),
      new Map()
    );
    expect(out.contacts).toEqual([]);
    expect(out.unreachableYes).toBe(2);
  });
});

describe("tallyYesByCity", () => {
  const contact = (c: Partial<TutorContact>): TutorContact => ({
    userId: "u",
    name: null,
    email: null,
    mobile: null,
    city: null,
    role: "student",
    mode: "online",
    examSlug: null,
    answeredAt: "2026-10-28T03:00:00Z",
    ...c,
  });

  it("counts students and teachers per city, busiest first, no city last", () => {
    expect(
      tallyYesByCity([
        contact({ city: "Pune" }),
        contact({ city: "Mumbai" }),
        contact({ city: "Pune", role: "teacher" }),
        contact({ city: "Pune" }),
        contact({ city: null }),
      ])
    ).toEqual([
      { city: "Pune", students: 2, teachers: 1 },
      { city: "Mumbai", students: 1, teachers: 0 },
      { city: null, students: 1, teachers: 0 },
    ]);
  });

  it("treats spelling case and spaces as one city, keeping the first spelling seen", () => {
    expect(tallyYesByCity([contact({ city: "Pune" }), contact({ city: " pune " }), contact({ city: "PUNE" })])).toEqual([
      { city: "Pune", students: 3, teachers: 0 },
    ]);
  });

  it("breaks a tie by name", () => {
    expect(tallyYesByCity([contact({ city: "Nagpur" }), contact({ city: "Delhi" })]).map((x) => x.city)).toEqual([
      "Delhi",
      "Nagpur",
    ]);
  });
});

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
