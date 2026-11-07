/**
 * The mentor path's "chapter done" rule (MENTOR_SPEC.md §2). Pure; no DB.
 *
 * A chapter is done when its revision sheet was opened, every Top 10 question
 * was worked (the homework rule, lib/homework/progress, so the Top 10 tab and
 * the path can never disagree) and its chapter test was finished WITH answers.
 * Done is measured by work, never by a tick.
 */
import { describe, it, expect } from "vitest";
import { chapterParts, isFinishedTest, revisionPath, topWorked, type TopSlot } from "@/lib/path/done";

const mcq = (id: string) => ({ id, format: "mcq" as const });
const written = (id: string) => ({ id, format: "subjective" as const });

describe("revisionPath — the /board chapter URL a board_revision view records", () => {
  it("slugs the subject and chapter as the /board route does", () => {
    expect(revisionPath("mh-hsc-12", "Physics", "Magnetic Fields due to Electric Current")).toBe(
      "/board/mh-hsc-12/physics/magnetic-fields-due-to-electric-current"
    );
    expect(revisionPath("cbse-12", "Mathematics", "Application of Derivatives")).toBe(
      "/board/cbse-12/mathematics/application-of-derivatives"
    );
  });
});

describe("isFinishedTest — submitted or timed out, with answers in it", () => {
  it("counts a submitted or expired sitting with at least one answer", () => {
    expect(isFinishedTest({ status: "submitted", answered: 1 })).toBe(true);
    expect(isFinishedTest({ status: "expired", answered: 7 })).toBe(true);
  });
  it("does not count a blank sitting: work, not a tick", () => {
    expect(isFinishedTest({ status: "submitted", answered: 0 })).toBe(false);
    expect(isFinishedTest({ status: "expired", answered: 0 })).toBe(false);
  });
  it("does not count a sitting still open", () => {
    expect(isFinishedTest({ status: "in_progress", answered: 5 })).toBe(false);
  });
});

describe("topWorked — every Top 10 slot worked, by the homework rule", () => {
  const slots: TopSlot[] = [[mcq("a")], [written("b")], [written("c1"), written("c2")]];

  it("is complete only when every part of every slot is marked", () => {
    const all = [
      { questionId: "a", kind: "question_practiced" as const, at: "2026-11-01T10:00:00Z" },
      { questionId: "b", kind: "self_mark" as const, at: "2026-11-01T10:01:00Z", mark: "understood" as const },
      { questionId: "c1", kind: "self_mark" as const, at: "2026-11-01T10:02:00Z", mark: "review" as const },
      { questionId: "c2", kind: "answer_wrong" as const, at: "2026-11-01T10:03:00Z" },
    ];
    expect(topWorked(slots, all)).toEqual({ worked: 3, of: 3, complete: true });
    // One case-study part unmarked leaves that slot open.
    expect(topWorked(slots, all.slice(0, 3))).toEqual({ worked: 2, of: 3, complete: false });
  });
  it("opening a written answer is not a mark", () => {
    const opened = [{ questionId: "b", kind: "question_practiced" as const, at: "2026-11-01T10:00:00Z" }];
    expect(topWorked([[written("b")]], opened).complete).toBe(false);
  });
  it("an empty Top 10 is never complete", () => {
    expect(topWorked([], [])).toEqual({ worked: 0, of: 0, complete: false });
  });
});

describe("chapterParts — the three parts and done", () => {
  it("is done only with all three", () => {
    expect(chapterParts({ sheet: true, top: true, test: true })).toEqual({ sheet: true, top: true, test: true, partsDone: 3, done: true });
    expect(chapterParts({ sheet: true, top: true, test: false }).done).toBe(false);
    expect(chapterParts({ sheet: false, top: true, test: true }).partsDone).toBe(2);
    expect(chapterParts({ sheet: false, top: false, test: false })).toEqual({ sheet: false, top: false, test: false, partsDone: 0, done: false });
  });
});
