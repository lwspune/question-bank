/**
 * Late answers from V (migration 0160): each answer in the file is matched to
 * the ONE signed-in student who typed all its questions, and never added twice.
 */
import { describe, it, expect } from "vitest";
import { parseFollowupFile, planFollowups } from "@/lib/chat/followups";

const FILE = {
  before: "2026-10-16T00:00:00Z",
  followups: [
    { questions: ["NEET PYQ", "Give me othet chapter of phy"], reply: "Sorry for the wait! Try /browse." },
    { questions: ["I wanna buy premium"], reply: "Sorry for the wait! Buy it at /pricing." },
  ],
};

const typed = (userId: string, message: string, createdAt = "2026-10-15T10:00:00Z") => ({ userId, message, createdAt });

describe("parseFollowupFile", () => {
  it("accepts a well-formed file", () => {
    expect(parseFollowupFile(FILE).ok).toBe(true);
  });

  it("refuses an entry with no questions, an empty reply, or a reply over 4000 characters", () => {
    expect(parseFollowupFile({ ...FILE, followups: [{ questions: [], reply: "x" }] }).ok).toBe(false);
    expect(parseFollowupFile({ ...FILE, followups: [{ questions: ["a"], reply: " " }] }).ok).toBe(false);
    expect(parseFollowupFile({ ...FILE, followups: [{ questions: ["a"], reply: "x".repeat(4001) }] }).ok).toBe(false);
  });

  it("refuses a file with no cut-off date", () => {
    expect(parseFollowupFile({ followups: FILE.followups }).ok).toBe(false);
  });
});

describe("planFollowups", () => {
  const parsed = parseFollowupFile(FILE);
  if (!parsed.ok) throw new Error("fixture");

  it("matches each answer to the student who typed all of its questions", () => {
    const plan = planFollowups(parsed.file, [
      typed("u1", "NEET PYQ"),
      typed("u1", "Give me othet chapter of phy"),
      typed("u2", "I wanna buy premium"),
    ], []);
    expect(plan.insert).toEqual([
      { userId: "u1", message: "NEET PYQ\nGive me othet chapter of phy", reply: "Sorry for the wait! Try /browse.", links: ["/browse"] },
      { userId: "u2", message: "I wanna buy premium", reply: "Sorry for the wait! Buy it at /pricing.", links: ["/pricing"] },
    ]);
    expect(plan.problems).toEqual([]);
  });

  it("reports an answer whose questions no single student typed", () => {
    const plan = planFollowups(parsed.file, [typed("u1", "NEET PYQ"), typed("u2", "Give me othet chapter of phy")], []);
    expect(plan.insert.map((p) => p.userId)).toEqual([]);
    expect(plan.problems).toEqual([
      "No student typed all of: NEET PYQ | Give me othet chapter of phy",
      "No student typed all of: I wanna buy premium",
    ]);
  });

  it("reports an answer that two students would both match", () => {
    const plan = planFollowups(parsed.file, [typed("u2", "I wanna buy premium"), typed("u3", "I wanna buy premium")], []);
    expect(plan.problems).toContain("More than one student typed all of: I wanna buy premium");
  });

  it("ignores questions typed on or after the cut-off", () => {
    const plan = planFollowups(parsed.file, [typed("u2", "I wanna buy premium", "2026-10-16T00:00:00Z")], []);
    expect(plan.insert).toEqual([]);
  });

  it("skips a student who already has this answer, so a re-run adds nothing", () => {
    const plan = planFollowups(parsed.file, [typed("u2", "I wanna buy premium")], [
      { userId: "u2", message: "I wanna buy premium" },
    ]);
    expect(plan.insert).toEqual([]);
    expect(plan.alreadyDone).toBe(1);
  });
});
