/**
 * Step 2 of "send a practice test to a friend" (2026-10-16): the shared
 * results card and the "your friend finished" push. Cooperative: the card
 * names which questions each of you missed, never a score or a count of right
 * answers.
 */
import { describe, it, expect } from "vitest";
import {
  MAX_FRIENDS,
  compareSittings,
  firstFinishedByUser,
  firstName,
  friendFinishedDedupeKey,
  friendFinishedPayload,
  nameList,
  pickFriendFinishedPushes,
  type FinishedAttempt,
} from "@/lib/practiceTests/together";

const Q = ["q1", "q2", "q3", "q4", "q5"];

describe("compareSittings", () => {
  it("splits the questions three ways, by position, and leaves out what everyone got", () => {
    const mine = { q1: 1, q2: -1, q3: 0, q4: 1, q5: 1 } as const;
    const riya = { name: "Riya", verdicts: { q1: 1, q2: 1, q3: -1, q4: -1, q5: 1 } as const };
    const card = compareSittings(Q, mine, [riya]);
    expect(card.friendNames).toEqual(["Riya"]);
    expect(card.allMissed).toEqual([3]);
    expect(card.theyGot).toEqual([{ position: 2, names: ["Riya"] }]);
    expect(card.youGot).toEqual([{ position: 4, names: ["Riya"] }]);
  });

  it("counts a skipped question as missed, and a missed one only for all when EVERY friend missed it", () => {
    const mine = { q1: 0, q2: -1, q3: 1, q4: 1, q5: 1 } as const;
    const a = { name: "Aman", verdicts: { q1: 0, q2: -1, q3: 1, q4: 1, q5: 1 } as const };
    const b = { name: null, verdicts: { q1: -1, q2: 1, q3: 1, q4: 1, q5: 1 } as const };
    const card = compareSittings(Q, mine, [a, b]);
    expect(card.allMissed).toEqual([1]);
    expect(card.theyGot).toEqual([{ position: 2, names: [null] }]);
    expect(card.youGot).toEqual([]);
  });

  it("names every friend on the other side of a question", () => {
    const mine = { q1: 1, q2: 1, q3: 1, q4: 1, q5: 1 } as const;
    const a = { name: "Aman", verdicts: { q1: -1, q2: 1, q3: 1, q4: 1, q5: 1 } as const };
    const b = { name: "Riya", verdicts: { q1: 0, q2: 1, q3: 1, q4: 1, q5: 1 } as const };
    expect(compareSittings(Q, mine, [a, b]).youGot).toEqual([{ position: 1, names: ["Aman", "Riya"] }]);
  });

  it("treats a question missing from a sitting as missed", () => {
    const card = compareSittings(["q1"], {}, [{ name: "Riya", verdicts: { q1: 1 } }]);
    expect(card.theyGot).toEqual([{ position: 1, names: ["Riya"] }]);
  });

  it("returns empty lists when there are no friends", () => {
    expect(compareSittings(Q, { q1: -1 }, [])).toEqual({ friendNames: [], allMissed: [], theyGot: [], youGot: [] });
  });
});

describe("firstFinishedByUser", () => {
  const at = (h: number) => new Date(Date.UTC(2026, 9, 16, h)).toISOString();
  const row = (userId: string, attemptId: string, status: string, submittedAt: string | null): FinishedAttempt => ({
    attemptId,
    userId,
    mockId: "m",
    status,
    submittedAt,
  });

  it("keeps each person's FIRST finished attempt and ignores ones still running", () => {
    const got = firstFinishedByUser([
      row("u1", "late", "submitted", at(9)),
      row("u1", "early", "expired", at(5)),
      row("u2", "running", "in_progress", null),
      row("u3", "only", "submitted", at(7)),
    ]);
    expect([...got.keys()].sort()).toEqual(["u1", "u3"]);
    expect(got.get("u1")!.attemptId).toBe("early");
  });
});

describe("firstName", () => {
  it("takes the first word of the account's name, capitalised", () => {
    expect(firstName({ full_name: "riya sharma" })).toBe("Riya");
    expect(firstName({ name: "AMAN" })).toBe("Aman");
  });

  it("gives null for no name, an email, or anything with digits", () => {
    for (const meta of [null, {}, { full_name: "" }, { name: "riya@gmail.com" }, { name: "user123" }, { name: 7 }]) {
      expect(firstName(meta)).toBeNull();
    }
  });
});

describe("nameList", () => {
  it("joins names and counts the unnamed", () => {
    expect(nameList(["Riya"])).toBe("Riya");
    expect(nameList([null])).toBe("A friend");
    expect(nameList(["Riya", "Aman"])).toBe("Riya and Aman");
    expect(nameList(["Riya", null])).toBe("Riya and a friend");
    expect(nameList(["Riya", null, null])).toBe("Riya and 2 friends");
    expect(nameList([null, null])).toBe("2 friends");
    expect(nameList(["A", "B", "C"])).toBe("A, B and C");
  });
});

describe("MAX_FRIENDS", () => {
  it("caps the card at ten friends", () => {
    expect(MAX_FRIENDS).toBe(10);
  });
});

describe("pickFriendFinishedPushes", () => {
  const now = new Date("2026-10-16T12:00:00Z");
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 3_600_000).toISOString();
  const f = (userId: string, attemptId: string, submittedAt: string, name: string | null = null) => ({
    userId,
    attemptId,
    submittedAt,
    name,
  });

  it("tells everyone who finished BEFORE a new finisher, and not the finisher", () => {
    const picks = pickFriendFinishedPushes({
      groups: [{ rootId: "root", finishers: [f("sender", "a1", hoursAgo(20)), f("riya", "a2", hoursAgo(1), "Riya")] }],
      priorSends: [],
      now,
    });
    expect(picks).toHaveLength(1);
    expect(picks[0]).toMatchObject({ userId: "sender", recipientAttemptId: "a1", names: ["Riya"] });
    expect(picks[0].dedupeKey).toBe(friendFinishedDedupeKey("sender", "root", "a2"));
  });

  it("names every new finisher in one push", () => {
    const picks = pickFriendFinishedPushes({
      groups: [
        {
          rootId: "root",
          finishers: [f("sender", "a1", hoursAgo(30)), f("riya", "a2", hoursAgo(3), "Riya"), f("aman", "a3", hoursAgo(1), "Aman")],
        },
      ],
      priorSends: [],
      now,
    });
    const toSender = picks.find((p) => p.userId === "sender")!;
    expect(toSender.names).toEqual(["Riya", "Aman"]);
    expect(toSender.dedupeKey).toBe(friendFinishedDedupeKey("sender", "root", "a3"));
    // Riya finished before Aman, so she hears about Aman.
    expect(picks.find((p) => p.userId === "riya")!.names).toEqual(["Aman"]);
    expect(picks.find((p) => p.userId === "aman")).toBeUndefined();
  });

  it("sends at most one push per person per test a day, and later announces only who finished since", () => {
    const groups = [
      { rootId: "root", finishers: [f("sender", "a1", hoursAgo(40)), f("riya", "a2", hoursAgo(10), "Riya"), f("aman", "a3", hoursAgo(1), "Aman")] },
    ];
    const recent = [{ userId: "sender", dedupeKey: friendFinishedDedupeKey("sender", "root", "a2"), createdAt: hoursAgo(9) }];
    expect(pickFriendFinishedPushes({ groups, priorSends: recent, now }).find((p) => p.userId === "sender")).toBeUndefined();

    const dayOld = [{ userId: "sender", dedupeKey: friendFinishedDedupeKey("sender", "root", "a2"), createdAt: hoursAgo(25) }];
    const later = pickFriendFinishedPushes({
      groups: [{ rootId: "root", finishers: [f("sender", "a1", hoursAgo(40)), f("riya", "a2", hoursAgo(26), "Riya"), f("aman", "a3", hoursAgo(1), "Aman")] }],
      priorSends: dayOld,
      now,
    });
    expect(later.find((p) => p.userId === "sender")!.names).toEqual(["Aman"]);
  });

  it("ignores finishers older than two days, so a first run cannot announce a backlog", () => {
    const picks = pickFriendFinishedPushes({
      groups: [{ rootId: "root", finishers: [f("sender", "a1", hoursAgo(100)), f("riya", "a2", hoursAgo(49), "Riya")] }],
      priorSends: [],
      now,
    });
    expect(picks).toEqual([]);
  });

  it("ignores other kinds of push in the send log", () => {
    const picks = pickFriendFinishedPushes({
      groups: [{ rootId: "root", finishers: [f("sender", "a1", hoursAgo(20)), f("riya", "a2", hoursAgo(1), "Riya")] }],
      priorSends: [{ userId: "sender", dedupeKey: "due_nudge:sender:2026-10-16", createdAt: hoursAgo(1) }],
      now,
    });
    expect(picks).toHaveLength(1);
  });
});

describe("friendFinishedPayload", () => {
  it("names who finished and links to the recipient's own result, at the card", () => {
    const p = friendFinishedPayload({ names: ["Riya"], recipientAttemptId: "att-1", clickToken: "tok" });
    expect(p.title).toBe("Riya finished your practice test");
    expect(p.body).toBe("See what you both missed.");
    expect(p.tag).toBe("practice-together");
    expect(decodeURIComponent(p.url)).toContain("/mock/attempt/att-1/result#together");
    expect(p.url).toContain("/api/e/tok");
  });

  it("says 'all' when more than one friend finished", () => {
    const p = friendFinishedPayload({ names: ["Riya", null], recipientAttemptId: "a", clickToken: "t" });
    expect(p.title).toBe("Riya and a friend finished your practice test");
    expect(p.body).toBe("See what you all missed.");
  });

  it("carries no score and no em dash", () => {
    const p = friendFinishedPayload({ names: ["Riya"], recipientAttemptId: "a", clickToken: "t" });
    expect(`${p.title} ${p.body}`).not.toMatch(/score|beat|rank|—/i);
  });
});
