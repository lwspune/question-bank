/**
 * "Send to a friend" for V's practice tests (migration 0163, 2026-10-16).
 *
 * A student sends their practice test; the friend opens /practice/<code>,
 * signs in and gets THEIR OWN copy of it: the same questions in the same
 * order, owned by the friend, pointing back at the original through
 * shared_from. Cooperative, never a contest: the message names the test, never
 * a score.
 */
import { describe, it, expect } from "vitest";
import {
  PRACTICE_SHARE_CAMPAIGN,
  buildPracticeShareText,
  buildPracticeShareUrl,
  friendCopyRow,
  isPracticeCode,
  joinPlan,
  type SharedPracticeTest,
} from "@/lib/practiceTests/friend";

const CODE = "practice-0a1b2c3d4e5f";

const SOURCE: SharedPracticeTest = {
  id: "11111111-1111-4111-8111-111111111111",
  slug: CODE,
  owner_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  shared_from: null,
  exam_id: "22222222-2222-4222-8222-222222222222",
  paper_code: "nda-gat",
  source: "pyq",
  title: "NDA Physics practice test: Laws of Motion, Work and Energy",
  duration_secs: 1200,
  marking: { correct: 4, wrong: -1.33 },
  sections: [{ key: "physics", label: "Physics", count: 2 }],
  questions: [
    { position: 1, questionId: "q1", sectionKey: "physics", marks: 4, negMarks: -1.33 },
    { position: 2, questionId: "q2", sectionKey: "physics", marks: 4, negMarks: -1.33 },
  ],
  total_questions: 2,
  total_marks: 8,
};

describe("isPracticeCode", () => {
  it("accepts the slug shape the build route makes", () => {
    expect(isPracticeCode(CODE)).toBe(true);
  });

  it("refuses anything else, so no other test can be reached through /practice", () => {
    for (const bad of ["nda-2026-i-maths", "practice-0A1B2C3D4E5F", "practice-0a1b", `${CODE}x`, "", null, 7]) {
      expect(isPracticeCode(bad)).toBe(false);
    }
  });
});

describe("buildPracticeShareUrl", () => {
  it("points at the friend page on the canonical host, tagged for attribution", () => {
    const u = new URL(buildPracticeShareUrl(CODE, "whatsapp"));
    expect(u.origin).toBe("https://www.pyqvault.com");
    expect(u.pathname).toBe(`/practice/${CODE}`);
    expect(u.searchParams.get("utm_source")).toBe("whatsapp");
    expect(u.searchParams.get("utm_medium")).toBe("share");
    expect(u.searchParams.get("utm_campaign")).toBe(PRACTICE_SHARE_CAMPAIGN);
  });

  it("names the OS share sheet as 'share', never as WhatsApp", () => {
    expect(new URL(buildPracticeShareUrl(CODE, "share")).searchParams.get("utm_source")).toBe("share");
  });
});

describe("buildPracticeShareText", () => {
  const text = buildPracticeShareText({ code: CODE, title: SOURCE.title, questions: 20, minutes: 24, channel: "whatsapp" });

  it("names the test, its size and that it is free, and ends on the link", () => {
    expect(text).toContain(SOURCE.title);
    expect(text).toContain("20 questions");
    expect(text).toContain("24 min");
    expect(text).toMatch(/free/i);
    expect(text.trim().endsWith(buildPracticeShareUrl(CODE, "whatsapp"))).toBe(true);
  });

  it("states no score and no contest", () => {
    expect(text).not.toMatch(/score|beat|win|rank/i);
  });

  it("carries no em dash (owner's rule for visible text)", () => {
    expect(text).not.toMatch(/—| – | -- /);
  });
});

describe("friendCopyRow", () => {
  const now = new Date("2026-10-16T10:00:00Z");
  const row = friendCopyRow(SOURCE, { id: "new-id", slug: "practice-ffffffffffff", ownerId: "friend", now });

  it("keeps the questions, order, marks and timing of the original", () => {
    expect(row.questions).toEqual(SOURCE.questions);
    expect(row.marking).toEqual(SOURCE.marking);
    expect(row.sections).toEqual(SOURCE.sections);
    expect(row.duration_secs).toBe(SOURCE.duration_secs);
    expect(row.total_questions).toBe(2);
    expect(row.total_marks).toBe(8);
    expect(row.title).toBe(SOURCE.title);
    expect(row.exam_id).toBe(SOURCE.exam_id);
    expect(row.paper_code).toBe(SOURCE.paper_code);
    expect(row.source).toBe(SOURCE.source);
  });

  it("belongs to the friend, as a personal practice test", () => {
    expect(row).toMatchObject({
      id: "new-id",
      slug: "practice-ffffffffffff",
      owner_id: "friend",
      status: "personal",
      scope: "custom",
      pyq_year: null,
      pyq_month: null,
    });
  });

  it("points at the original, and at the ROOT when the test it came from was itself a copy", () => {
    expect(row.shared_from).toBe(SOURCE.id);
    const fromCopy = friendCopyRow(
      { ...SOURCE, id: "copy-id", shared_from: "root-id" },
      { id: "x", slug: "practice-eeeeeeeeeeee", ownerId: "third", now }
    );
    expect(fromCopy.shared_from).toBe("root-id");
  });

  it("does not share the original's question array by reference", () => {
    expect(row.questions).not.toBe(SOURCE.questions);
  });
});

describe("joinPlan", () => {
  it("opens the student's own test when they open their own link", () => {
    expect(joinPlan(SOURCE, SOURCE.owner_id, null)).toEqual({ kind: "open", slug: CODE, own: true });
  });

  it("reopens the friend's existing copy rather than making a second", () => {
    expect(joinPlan(SOURCE, "friend", "practice-cccccccccccc")).toEqual({
      kind: "open",
      slug: "practice-cccccccccccc",
      own: false,
    });
  });

  it("makes a copy of the ROOT test for a first-time friend", () => {
    expect(joinPlan(SOURCE, "friend", null)).toEqual({ kind: "copy", rootId: SOURCE.id });
    expect(joinPlan({ ...SOURCE, id: "copy-id", shared_from: "root-id" }, "friend", null)).toEqual({
      kind: "copy",
      rootId: "root-id",
    });
  });
});
