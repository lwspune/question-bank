/**
 * Exam circles reach students who have not joined (owner, 2026-11-27): the
 * morning question goes to the circle of every exam a student chose (or, with
 * none chosen, was guessed for), the bubble counts 1 for each such circle not
 * joined that has today's question, and opening the bubble clears that until
 * the next morning. A guessed exam's circle can be joined, and joining makes
 * the exam a chosen one.
 *
 * - buildRoomList: a guessed exam is its own section, only while nothing is
 *   chosen; each not-joined item says whether today's question is up.
 * - waitingCount / bubbleCount: what the badge shows.
 * - joinDecision: who may join, and when the join promotes the guess.
 * - dailyRooms: which circles the morning run posts to.
 */
import { describe, it, expect } from "vitest";
import { buildRoomList } from "@/lib/rooms/list";
import { bubbleCount, dailyRooms, joinDecision, waitingCount } from "@/lib/rooms/alert";

const nameOf = (slug: string) =>
  ({ nda: "NDA", cds: "CDS", neet: "NEET", "mht-cet": "MHT-CET" } as Record<string, string>)[slug] ?? null;

const base = { nameOf, joined: new Set<string>(), closed: new Set<string>(), unread: new Map<string, number>() };

describe("buildRoomList: guessed exam", () => {
  it("shows the guessed exam as its own section when nothing is chosen", () => {
    const list = buildRoomList({ ...base, targetExams: [], guessExam: "neet" });
    expect(list.guessed.map((r) => r.slug)).toEqual(["neet"]);
    expect(list.others).toEqual([]);
  });

  it("ignores the guess once the student has chosen an exam", () => {
    const list = buildRoomList({ ...base, targetExams: ["cds"], guessExam: "neet" });
    expect(list.guessed).toEqual([]);
    expect(list.others.map((r) => r.slug)).toEqual(["cds"]);
  });

  it("drops a guess the registry does not know, or whose circle is closed", () => {
    expect(buildRoomList({ ...base, targetExams: [], guessExam: "gone-exam" }).guessed).toEqual([]);
    expect(buildRoomList({ ...base, targetExams: [], guessExam: "neet", closed: new Set(["neet"]) }).guessed).toEqual([]);
  });

  it("puts a guessed exam already joined under joined, not twice", () => {
    const list = buildRoomList({ ...base, targetExams: [], guessExam: "neet", joined: new Set(["neet"]) });
    expect(list.joined.map((r) => r.slug)).toEqual(["neet"]);
    expect(list.guessed).toEqual([]);
  });
});

describe("buildRoomList: today's question", () => {
  it("marks a not-joined circle whose question is up today, guessed ones too", () => {
    const chose = buildRoomList({ ...base, targetExams: ["cds", "nda"], pinnedToday: new Set(["nda"]) });
    expect(chose.others.map((r) => [r.slug, r.today])).toEqual([
      ["cds", false],
      ["nda", true],
    ]);
    const guessed = buildRoomList({ ...base, targetExams: [], guessExam: "neet", pinnedToday: new Set(["neet"]) });
    expect(guessed.guessed[0].today).toBe(true);
  });

  it("treats a missing pinnedToday as nothing up", () => {
    expect(buildRoomList({ ...base, targetExams: ["cds"] }).others[0].today).toBe(false);
  });
});

describe("waitingCount", () => {
  it("counts not-joined circles with today's question, chosen and guessed", () => {
    const list = buildRoomList({
      ...base,
      targetExams: ["cds", "nda", "mht-cet"],
      joined: new Set(["mht-cet"]),
      pinnedToday: new Set(["nda", "mht-cet"]),
    });
    // mht-cet is joined: its question is unread there, not "waiting".
    expect(waitingCount(list)).toBe(1);
    expect(waitingCount(buildRoomList({ ...base, targetExams: [], guessExam: "neet", pinnedToday: new Set(["neet"]) }))).toBe(1);
  });
});

describe("bubbleCount", () => {
  it("adds waiting circles to unread until the bubble is opened that day", () => {
    expect(bubbleCount({ unread: 2, waiting: 1, seenDay: null, today: "2026-11-27" })).toBe(3);
    expect(bubbleCount({ unread: 2, waiting: 1, seenDay: "2026-11-27", today: "2026-11-27" })).toBe(2);
  });

  it("brings the alert back the next morning", () => {
    expect(bubbleCount({ unread: 0, waiting: 1, seenDay: "2026-11-26", today: "2026-11-27" })).toBe(1);
  });

  it("is plain unread when nothing waits", () => {
    expect(bubbleCount({ unread: 4, waiting: 0, seenDay: null, today: "2026-11-27" })).toBe(4);
  });
});

describe("joinDecision", () => {
  it("lets a student join a chosen exam's circle without changing the profile", () => {
    expect(joinDecision({ targets: ["cds", "nda"], guess: null, slug: "nda" })).toEqual({ ok: true, promote: false });
  });

  it("lets a student with nothing chosen join the guessed exam, which then becomes chosen", () => {
    expect(joinDecision({ targets: [], guess: "neet", slug: "neet" })).toEqual({ ok: true, promote: true });
  });

  it("refuses an exam that is neither chosen nor the guess", () => {
    expect(joinDecision({ targets: [], guess: "neet", slug: "cds" }).ok).toBe(false);
    expect(joinDecision({ targets: [], guess: null, slug: "cds" }).ok).toBe(false);
  });

  it("refuses the guess once something else is chosen (the guess is no longer shown)", () => {
    expect(joinDecision({ targets: ["cds"], guess: "neet", slug: "neet" }).ok).toBe(false);
  });
});

describe("dailyRooms", () => {
  it("posts to every exam students have and every open circle, minus closed and unknown, once each", () => {
    const slugs = dailyRooms({
      audience: ["nda", "neet", "gone-exam", "cds"],
      openRooms: ["mht-cet", "nda"],
      closed: ["cds"],
      nameOf,
    });
    expect(slugs).toEqual(["mht-cet", "nda", "neet"]);
  });
});
