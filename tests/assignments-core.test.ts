/**
 * Teacher-assigned mocks with a deadline — ENGAGEMENT_SPEC.md C1. Pure core.
 *
 * Deadline pull, never rank pull: nothing here orders students against each
 * other. What it decides is whether an assignment is open, due soon or
 * overdue; what the label says in IST; and who has SAT the paper.
 */
import { describe, it, expect } from "vitest";
import {
  validateAssignmentInput,
  assignmentState,
  dueLabel,
  completionFor,
  studentAssignmentViews,
  DUE_SOON_HOURS,
  MAX_NOTE_LEN,
} from "@/lib/assignments/core";

// Thursday 2026-09-24 10:00 IST.
const NOW = new Date("2026-09-24T04:30:00Z");
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const at = (ms: number) => new Date(NOW.getTime() + ms).toISOString();
const UUID = "11111111-2222-4333-8444-555555555555";

describe("validateAssignmentInput", () => {
  it("accepts a uuid mock, a future due date and a short note", () => {
    const r = validateAssignmentInput({ mockId: UUID, dueAt: at(2 * DAY), note: "  Sunday test  " }, NOW);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.mockId).toBe(UUID);
      expect(r.value.note).toBe("Sunday test");
      expect(Date.parse(r.value.dueAt)).toBe(NOW.getTime() + 2 * DAY);
    }
  });

  it("rejects a due date in the past or unparseable", () => {
    expect(validateAssignmentInput({ mockId: UUID, dueAt: at(-HOUR) }, NOW).ok).toBe(false);
    expect(validateAssignmentInput({ mockId: UUID, dueAt: "next week" }, NOW).ok).toBe(false);
  });

  it("rejects a non-uuid mock id and an over-long note", () => {
    expect(validateAssignmentInput({ mockId: "nda-2025", dueAt: at(DAY) }, NOW).ok).toBe(false);
    expect(validateAssignmentInput({ mockId: UUID, dueAt: at(DAY), note: "x".repeat(MAX_NOTE_LEN + 1) }, NOW).ok).toBe(false);
  });

  it("stores an empty note as null", () => {
    const r = validateAssignmentInput({ mockId: UUID, dueAt: at(DAY), note: "   " }, NOW);
    expect(r.ok && r.value.note).toBeNull();
  });
});

describe("assignmentState", () => {
  it("is open, then due-soon inside DUE_SOON_HOURS, then overdue", () => {
    expect(assignmentState(at(5 * DAY), NOW)).toBe("open");
    expect(assignmentState(at((DUE_SOON_HOURS - 1) * HOUR), NOW)).toBe("due-soon");
    expect(assignmentState(at(-1), NOW)).toBe("overdue");
  });
});

describe("dueLabel — IST, in words a student uses", () => {
  it("says today, tomorrow, then the weekday inside a week", () => {
    expect(dueLabel(at(8 * HOUR), NOW)).toBe("Due today");
    expect(dueLabel(at(DAY), NOW)).toBe("Due tomorrow");
    expect(dueLabel(at(3 * DAY), NOW)).toBe("Due Sunday");
  });

  it("names the date beyond a week", () => {
    expect(dueLabel(at(10 * DAY), NOW)).toBe("Due 4 Oct");
  });

  it("says overdue in days once past", () => {
    expect(dueLabel(at(-2 * HOUR), NOW)).toBe("Overdue");
    expect(dueLabel(at(-2 * DAY), NOW)).toBe("Overdue by 2 days");
  });

  it("uses the IST calendar day, not the server's", () => {
    // 23:30 IST Thursday = 18:00 UTC. Due at 00:30 IST Friday is "tomorrow".
    const late = new Date("2026-09-24T18:00:00Z");
    expect(dueLabel(new Date("2026-09-24T19:00:00Z").toISOString(), late)).toBe("Due tomorrow");
  });
});

describe("completionFor — who has SAT the paper", () => {
  const roster = [{ userId: "a" }, { userId: "b" }, { userId: "c" }];
  const attempts = [
    { userId: "a", mockId: "m1", submittedAt: at(-DAY) },
    { userId: "b", mockId: "m1", submittedAt: null }, // in progress is not sat
    { userId: "c", mockId: "m2", submittedAt: at(-DAY) }, // a different paper
    { userId: "zz", mockId: "m1", submittedAt: at(-DAY) }, // not on the roster
  ];

  it("counts a graded attempt of THIS mock by a roster student, nothing else", () => {
    const c = completionFor("m1", roster, attempts);
    expect(c.done).toEqual(["a"]);
    expect(c.pending).toEqual(["b", "c"]);
  });

  it("is total over the roster", () => {
    const c = completionFor("m9", roster, attempts);
    expect(c.done).toEqual([]);
    expect(c.pending).toEqual(["a", "b", "c"]);
  });
});

describe("studentAssignmentViews — the /me list", () => {
  const rows = [
    { id: "x1", mockId: "m1", mockSlug: "s1", mockTitle: "Paper 1", batchName: "Morning", dueAt: at(5 * DAY), note: null },
    { id: "x2", mockId: "m2", mockSlug: "s2", mockTitle: "Paper 2", batchName: "Morning", dueAt: at(DAY), note: "Bring a pen" },
    { id: "x3", mockId: "m3", mockSlug: "s3", mockTitle: "Paper 3", batchName: "Morning", dueAt: at(-DAY), note: null },
  ];
  const attempts = [{ userId: "me", mockId: "m1", submittedAt: at(-2 * DAY) }];

  it("puts not-yet-sat papers first by due date, then the sat ones", () => {
    const v = studentAssignmentViews(rows, attempts, NOW);
    expect(v.map((x) => x.id)).toEqual(["x3", "x2", "x1"]);
    expect(v.map((x) => x.done)).toEqual([false, false, true]);
  });

  it("carries the state and the label", () => {
    const v = studentAssignmentViews(rows, attempts, NOW);
    expect(v[0].state).toBe("overdue");
    expect(v[1].label).toBe("Due tomorrow");
  });
});
