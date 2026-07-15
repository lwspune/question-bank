import { describe, it, expect } from "vitest";
import {
  pickRecipients,
  isUndeliverable,
  MIN_ACCOUNT_AGE_MS,
  COOLDOWN_MS,
  FIRST_MOCK_PAPER,
  type StudentLite,
  type MockLite,
  type AttemptLite,
  type PriorSend,
} from "@/lib/email/recommend";

const NOW = new Date("2026-07-15T10:00:00Z").getTime();
const DAY = 24 * 60 * 60 * 1000;
const iso = (ms: number) => new Date(ms).toISOString();

const NDA = "exam-nda";
const NEET = "exam-neet";

function student(over: Partial<StudentLite> = {}): StudentLite {
  return {
    userId: "u1",
    email: "u1@gmail.com",
    name: "Asha",
    createdAt: iso(NOW - 30 * DAY),
    emailOptOut: false,
    ...over,
  };
}

function mock(over: Partial<MockLite> = {}): MockLite {
  return {
    id: over.slug ?? "m1",
    slug: "nda-2026-apr-maths",
    title: "NDA 2026 (I) — Mathematics",
    examId: NDA,
    paperCode: "maths",
    pyqYear: 2026,
    pyqMonth: "Apr",
    totalQuestions: 120,
    durationSecs: 9000,
    ...over,
  };
}

/** Catalogue mirroring prod: NDA maths + gat, Apr/Sep sittings. */
const M_2026_APR_MATHS = mock({ id: "mm26a", slug: "nda-2026-apr-maths", pyqYear: 2026, pyqMonth: "Apr" });
const M_2025_SEP_MATHS = mock({ id: "mm25s", slug: "nda-2025-sep-maths", pyqYear: 2025, pyqMonth: "Sep" });
const M_2025_APR_MATHS = mock({ id: "mm25a", slug: "nda-2025-apr-maths", pyqYear: 2025, pyqMonth: "Apr" });
const G_2026_APR_GAT = mock({
  id: "gg26a", slug: "nda-2026-apr-gat", paperCode: "gat", pyqYear: 2026, pyqMonth: "Apr",
  title: "NDA 2026 (I) — GAT", totalQuestions: 150,
});
const G_2025_SEP_GAT = mock({
  id: "gg25s", slug: "nda-2025-sep-gat", paperCode: "gat", pyqYear: 2025, pyqMonth: "Sep",
  title: "NDA 2025 (II) — GAT", totalQuestions: 150,
});
const CATALOGUE = [M_2026_APR_MATHS, M_2025_SEP_MATHS, M_2025_APR_MATHS, G_2026_APR_GAT, G_2025_SEP_GAT];

function attempt(over: Partial<AttemptLite> = {}): AttemptLite {
  return {
    userId: "u1",
    mockId: "mm26a",
    examId: NDA,
    paperCode: "maths",
    status: "submitted",
    startedAt: iso(NOW - 5 * DAY),
    expiresAt: iso(NOW - 5 * DAY + 9000 * 1000),
    score: 120,
    maxScore: 300,
    ...over,
  };
}

const run = (
  students: StudentLite[],
  mocks: MockLite[] = CATALOGUE,
  attempts: AttemptLite[] = [],
  priorSends: PriorSend[] = []
) => pickRecipients({ students, mocks, attempts, priorSends, now: NOW });

describe("isUndeliverable", () => {
  // Live leak, 2026-07-07: the billing tests stranded
  // billing_paid_…@test.invalid + billing_expired_…@test.invalid in auth.users,
  // and the roster is derived from auth.users. `.invalid` is RFC-2606 reserved
  // and can NEVER receive mail → a guaranteed hard bounce, which is exactly what
  // gets a young sending domain suspended.
  it("rejects RFC 2606/6761 reserved TLDs", () => {
    expect(isUndeliverable("billing_paid_1783447442189@test.invalid")).toBe(true);
    expect(isUndeliverable("a@b.test")).toBe(true);
    expect(isUndeliverable("a@b.example")).toBe(true);
    expect(isUndeliverable("a@b.localhost")).toBe(true);
  });

  it("rejects the example.com/net/org reserved domains", () => {
    expect(isUndeliverable("a@example.com")).toBe(true);
    expect(isUndeliverable("a@example.net")).toBe(true);
    expect(isUndeliverable("a@example.org")).toBe(true);
  });

  it("is case-insensitive and tolerates surrounding space", () => {
    expect(isUndeliverable("  A@B.INVALID  ")).toBe(true);
  });

  it("rejects a deep subdomain of a reserved TLD", () => {
    expect(isUndeliverable("a@mail.corp.invalid")).toBe(true);
  });

  it("rejects a malformed address", () => {
    expect(isUndeliverable("not-an-email")).toBe(true);
    expect(isUndeliverable("")).toBe(true);
    expect(isUndeliverable("a@")).toBe(true);
  });

  it("accepts a real address", () => {
    expect(isUndeliverable("asha@gmail.com")).toBe(false);
    expect(isUndeliverable("s@pyqvault.com")).toBe(false);
  });

  it("does not reject a domain that merely CONTAINS a reserved word", () => {
    expect(isUndeliverable("a@invalid-school.com")).toBe(false);
    expect(isUndeliverable("a@testing.com")).toBe(false);
    expect(isUndeliverable("a@example-school.in")).toBe(false);
  });
});

describe("pickRecipients — skip rules", () => {
  it("skips a student with no email", () => {
    expect(run([student({ email: null })])).toHaveLength(0);
  });

  it("skips an undeliverable address (leaked test fixture)", () => {
    const fixture = student({ email: "billing_paid_1783447442189@test.invalid" });
    expect(run([fixture])).toHaveLength(0);
  });

  it("skips an opted-out student", () => {
    expect(run([student({ emailOptOut: true })])).toHaveLength(0);
  });

  it("skips an account younger than the minimum age (don't nag fresh signups)", () => {
    const fresh = student({ createdAt: iso(NOW - (MIN_ACCOUNT_AGE_MS - 1000)) });
    expect(run([fresh])).toHaveLength(0);
  });

  it("includes an account just past the minimum age", () => {
    const ok = student({ createdAt: iso(NOW - (MIN_ACCOUNT_AGE_MS + 1000)) });
    expect(run([ok])).toHaveLength(1);
  });

  it("skips a student inside the cooldown", () => {
    const sends: PriorSend[] = [
      { userId: "u1", dedupeKey: "next_mock:u1:zzz", createdAt: iso(NOW - (COOLDOWN_MS - 1000)) },
    ];
    expect(run([student()], CATALOGUE, [attempt()], sends)).toHaveLength(0);
  });

  it("sends again once the cooldown has expired", () => {
    const sends: PriorSend[] = [
      { userId: "u1", dedupeKey: "next_mock:u1:zzz", createdAt: iso(NOW - (COOLDOWN_MS + 1000)) },
    ];
    expect(run([student()], CATALOGUE, [attempt()], sends)).toHaveLength(1);
  });

  it("skips a student who is mid-exam right now (live attempt)", () => {
    const live = attempt({
      status: "in_progress",
      startedAt: iso(NOW - 10 * 60 * 1000),
      expiresAt: iso(NOW + 60 * 60 * 1000), // still ticking
      score: null,
      maxScore: null,
    });
    expect(run([student()], CATALOGUE, [live])).toHaveLength(0);
  });

  it("a cooldown for one student does not suppress another", () => {
    const sends: PriorSend[] = [
      { userId: "u1", dedupeKey: "next_mock:u1:zzz", createdAt: iso(NOW - 1 * DAY) },
    ];
    const out = run([student(), student({ userId: "u2", email: "u2@gmail.com" })], CATALOGUE, [], sends);
    expect(out.map((r) => r.userId)).toEqual(["u2"]);
  });
});

describe("pickRecipients — next_mock (has attempted)", () => {
  it("recommends an unattempted mock of the SAME paper", () => {
    const out = run([student()], CATALOGUE, [attempt({ mockId: "mm26a" })]);
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("next_mock");
    expect(out[0].mock.paperCode).toBe("maths");
    expect(out[0].mock.id).not.toBe("mm26a");
  });

  it("never crosses paper_code — a GAT-only student is never sent Maths", () => {
    const gatOnly = attempt({ mockId: "gg26a", paperCode: "gat" });
    const out = run([student()], CATALOGUE, [gatOnly]);
    expect(out).toHaveLength(1);
    expect(out[0].mock.paperCode).toBe("gat");
    expect(out[0].mock.id).toBe("gg25s");
  });

  it("covers both papers for a student who has done both", () => {
    // Both papers eligible → the newest unattempted across them wins.
    const both = [
      attempt({ mockId: "mm25a", paperCode: "maths" }),
      attempt({ mockId: "gg25s", paperCode: "gat" }),
    ];
    const out = run([student()], CATALOGUE, both);
    expect(out).toHaveLength(1);
    expect(["maths", "gat"]).toContain(out[0].mock.paperCode);
    expect(["mm25a", "gg25s"]).not.toContain(out[0].mock.id);
  });

  it("never crosses exam — an NDA attempter is not sent a NEET mock", () => {
    const neet = mock({ id: "neet1", slug: "neet-2026", examId: NEET, paperCode: "maths", pyqYear: 2026 });
    const out = run([student()], [...CATALOGUE, neet], [attempt({ mockId: "mm26a" })]);
    expect(out[0].mock.examId).toBe(NDA);
  });

  it("ranks newest sitting first, with Sep after Apr in the same year", () => {
    // Attempted the newest (2026 Apr) → next should be 2025 Sep, not 2025 Apr.
    const out = run([student()], CATALOGUE, [attempt({ mockId: "mm26a" })]);
    expect(out[0].mock.id).toBe("mm25s");
  });

  it("walks down the catalogue when the previous pick was ignored", () => {
    const sends: PriorSend[] = [
      { userId: "u1", dedupeKey: "next_mock:u1:mm25s", createdAt: iso(NOW - 10 * DAY) },
    ];
    const out = run([student()], CATALOGUE, [attempt({ mockId: "mm26a" })], sends);
    expect(out[0].mock.id).toBe("mm25a"); // skipped the already-recommended mm25s
  });

  it("returns nothing when every same-paper mock is attempted or already sent", () => {
    const all = [
      attempt({ mockId: "mm26a" }),
      attempt({ mockId: "mm25s" }),
      attempt({ mockId: "mm25a" }),
    ];
    expect(run([student()], CATALOGUE, all)).toHaveLength(0);
  });

  it("treats an abandoned in_progress attempt as attempted (past expiry)", () => {
    const abandoned = attempt({
      mockId: "mm26a",
      status: "in_progress",
      startedAt: iso(NOW - 4 * DAY),
      expiresAt: iso(NOW - 4 * DAY + 9000 * 1000), // long expired
      score: null,
      maxScore: null,
    });
    const out = run([student()], CATALOGUE, [abandoned]);
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("next_mock"); // not first_mock
    expect(out[0].mock.id).not.toBe("mm26a"); // never re-recommend it
  });

  it("treats an expired attempt as attempted", () => {
    const out = run([student()], CATALOGUE, [attempt({ mockId: "mm26a", status: "expired", score: null })]);
    expect(out[0].kind).toBe("next_mock");
    expect(out[0].mock.id).not.toBe("mm26a");
  });

  it("carries the most recent GRADED score as the subject hook", () => {
    const attempts = [
      attempt({ mockId: "mm25a", startedAt: iso(NOW - 9 * DAY), score: 90, maxScore: 300 }),
      attempt({ mockId: "mm26a", startedAt: iso(NOW - 2 * DAY), score: 150, maxScore: 300 }),
    ];
    const out = run([student()], CATALOGUE, attempts);
    expect(out[0].lastScore).toMatchObject({ score: 150, maxScore: 300 });
  });

  it("lastScore is null when no attempt was ever graded", () => {
    const ungraded = attempt({
      mockId: "mm26a", status: "expired", score: null, maxScore: null,
    });
    expect(run([student()], CATALOGUE, [ungraded])[0].lastScore).toBeNull();
  });

  it("keys the dedupe on the recommended mock", () => {
    const out = run([student()], CATALOGUE, [attempt({ mockId: "mm26a" })]);
    expect(out[0].dedupeKey).toBe("next_mock:u1:mm25s");
  });
});

describe("pickRecipients — first_mock (never attempted)", () => {
  it("sends a never-attempted student the newest paper of the default type", () => {
    const out = run([student()]);
    expect(out).toHaveLength(1);
    expect(out[0].kind).toBe("first_mock");
    expect(out[0].mock.paperCode).toBe(FIRST_MOCK_PAPER);
    expect(out[0].mock.id).toBe("mm26a"); // newest maths sitting
  });

  it("is sent ONCE ever — a prior first_mock suppresses it regardless of age", () => {
    const sends: PriorSend[] = [
      { userId: "u1", dedupeKey: "first_mock:u1", createdAt: iso(NOW - 400 * DAY) },
    ];
    expect(run([student()], CATALOGUE, [], sends)).toHaveLength(0);
  });

  it("keys the dedupe on the user alone (no mock id → no nagging)", () => {
    expect(run([student()])[0].dedupeKey).toBe("first_mock:u1");
  });

  it("carries no score hook", () => {
    expect(run([student()])[0].lastScore).toBeNull();
  });

  it("returns nothing when the catalogue has no paper of the default type", () => {
    expect(run([student()], [G_2026_APR_GAT, G_2025_SEP_GAT])).toHaveLength(0);
  });
});

describe("pickRecipients — batch behaviour", () => {
  it("returns at most ONE email per user per run", () => {
    const attempts = [attempt({ mockId: "mm26a" }), attempt({ mockId: "gg26a", paperCode: "gat" })];
    const out = run([student()], CATALOGUE, attempts);
    expect(out).toHaveLength(1);
  });

  it("mixes both cohorts in one run", () => {
    const students = [
      student({ userId: "u1", email: "u1@gmail.com" }),
      student({ userId: "u2", email: "u2@gmail.com" }),
    ];
    const out = run(students, CATALOGUE, [attempt({ userId: "u1", mockId: "mm26a" })]);
    expect(out.map((r) => [r.userId, r.kind])).toEqual([
      ["u1", "next_mock"],
      ["u2", "first_mock"],
    ]);
  });

  it("is deterministic across runs", () => {
    const students = [student({ userId: "u1" }), student({ userId: "u2", email: "u2@x.com" })];
    const a = run(students, CATALOGUE, [attempt({ userId: "u1", mockId: "mm26a" })]);
    const b = run(students, CATALOGUE, [attempt({ userId: "u1", mockId: "mm26a" })]);
    expect(a.map((r) => r.dedupeKey)).toEqual(b.map((r) => r.dedupeKey));
  });

  it("produces unique dedupe keys across a batch", () => {
    const students = [student({ userId: "u1" }), student({ userId: "u2", email: "u2@x.com" })];
    const out = run(students, CATALOGUE, [attempt({ userId: "u1", mockId: "mm26a" })]);
    expect(new Set(out.map((r) => r.dedupeKey)).size).toBe(out.length);
  });

  it("handles an empty catalogue", () => {
    expect(run([student()], [])).toHaveLength(0);
  });

  it("handles no students", () => {
    expect(run([])).toHaveLength(0);
  });
});
