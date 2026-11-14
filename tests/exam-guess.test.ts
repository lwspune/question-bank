import { describe, expect, it } from "vitest";
import {
  GUESS_CARD_ALL_FROM,
  WELCOME_TEST_FROM,
  guessCardVariant,
  guessDue,
  parseExamGuessBody,
  planGuessWrite,
  storedGuess,
} from "@/lib/profile/examGuess";

const DAY = 24 * 60 * 60 * 1000;
const iso = (d: Date) => d.toISOString();

describe("guessCardVariant (which card a no-exam student sees on Home)", () => {
  const before = new Date(GUESS_CARD_ALL_FROM.getTime() - DAY);

  it("an account from before the welcome-screen test gets the new card now", () => {
    const created = new Date(WELCOME_TEST_FROM.getTime() - DAY);
    expect(guessCardVariant(iso(created), before)).toBe("guess");
  });

  it("an account from the welcome-screen test keeps the old card until the test ends", () => {
    const created = new Date(WELCOME_TEST_FROM.getTime() + 60_000);
    expect(guessCardVariant(iso(created), before)).toBe("suggest");
    expect(guessCardVariant(iso(created), GUESS_CARD_ALL_FROM)).toBe("guess");
  });

  it("an unknown sign-up date is treated as new: the test stays clean", () => {
    expect(guessCardVariant(null, before)).toBe("suggest");
    expect(guessCardVariant("not a date", before)).toBe("suggest");
    expect(guessCardVariant(null, GUESS_CARD_ALL_FROM)).toBe("guess");
  });
});

describe("storedGuess (the stored guess as the header reads it)", () => {
  it("returns the exam and where it came from", () => {
    expect(storedGuess({ exam: "cbse-12", source: "practice", card_answer: null })).toEqual({
      slug: "cbse-12",
      source: "practice",
    });
  });

  it("a student who tapped Change has said it is wrong: no guess card again", () => {
    expect(storedGuess({ exam: "cbse-12", source: "practice", card_answer: "change" })).toBe("declined");
  });

  it("ignores a row that names no live www exam", () => {
    expect(storedGuess(null)).toBeNull();
    expect(storedGuess({ exam: "not-an-exam", source: "practice", card_answer: null })).toBeNull();
    expect(storedGuess({ exam: "imat", source: "landing", card_answer: null })).toBeNull();
    expect(storedGuess({ exam: "nda", source: "cookie", card_answer: null })).toBeNull();
  });
});

describe("guessDue (which no-exam students the daily job works out)", () => {
  const now = new Date("2026-12-01T05:00:00Z");
  const created = (daysAgo: number) => iso(new Date(now.getTime() - daysAgo * DAY));
  const base = { now, activeRecently: false, all: false };

  it("never re-guesses for a student who answered the card", () => {
    expect(guessDue({ ...base, createdAt: created(30), row: { answered: true }, activeRecently: true, all: true })).toBe(
      false
    );
  });

  it("the backfill (--all) takes every unanswered student", () => {
    expect(guessDue({ ...base, createdAt: created(1), row: null, all: true })).toBe(true);
    expect(guessDue({ ...base, createdAt: created(90), row: { answered: false }, all: true })).toBe(true);
  });

  it("waits until an account is 3 days old", () => {
    expect(guessDue({ ...base, createdAt: created(2), row: null, activeRecently: true })).toBe(false);
    expect(guessDue({ ...base, createdAt: null, row: null, activeRecently: true })).toBe(false);
  });

  it("guesses for a 3-5 day old account with no guess, active or not", () => {
    expect(guessDue({ ...base, createdAt: created(3.5), row: null })).toBe(true);
    expect(guessDue({ ...base, createdAt: created(6), row: null })).toBe(false);
  });

  it("otherwise only for students who answered something since the last run", () => {
    expect(guessDue({ ...base, createdAt: created(20), row: null, activeRecently: true })).toBe(true);
    expect(guessDue({ ...base, createdAt: created(20), row: { answered: false }, activeRecently: true })).toBe(true);
    expect(guessDue({ ...base, createdAt: created(20), row: { answered: false } })).toBe(false);
  });
});

describe("planGuessWrite (what the job writes)", () => {
  const now = new Date("2026-12-01T05:00:00Z");
  const row = { exam: "nda", source: "landing", card_seen_at: "2026-11-20T00:00:00Z" };

  it("writes nothing when there is no guess: a mixed record or a failed read never clears one", () => {
    expect(planGuessWrite(null, null, now)).toEqual({ kind: "none" });
    expect(planGuessWrite(row, null, now)).toEqual({ kind: "none" });
  });

  it("inserts a first guess", () => {
    expect(planGuessWrite(null, { slug: "cds", source: "practice" }, now)).toEqual({
      kind: "insert",
      values: { exam: "cds", source: "practice", guessed_at: now.toISOString() },
    });
  });

  it("leaves the same exam alone, so guessed_at stays the first time", () => {
    expect(planGuessWrite(row, { slug: "nda", source: "practice" }, now)).toEqual({ kind: "none" });
  });

  it("a new exam replaces the old and forgets that the old card was seen", () => {
    expect(planGuessWrite(row, { slug: "cds", source: "practice" }, now)).toEqual({
      kind: "update",
      values: { exam: "cds", source: "practice", guessed_at: now.toISOString(), card_seen_at: null },
    });
  });
});

describe("parseExamGuessBody (the card's writes)", () => {
  it("accepts the three actions", () => {
    expect(parseExamGuessBody({ action: "seen" })).toEqual({ ok: true, value: { action: "seen" } });
    expect(parseExamGuessBody({ action: "correct" })).toEqual({ ok: true, value: { action: "correct" } });
    expect(parseExamGuessBody({ action: "change" })).toEqual({ ok: true, value: { action: "change" } });
  });

  it("refuses anything else", () => {
    expect(parseExamGuessBody(null).ok).toBe(false);
    expect(parseExamGuessBody({ action: "yes" }).ok).toBe(false);
    expect(parseExamGuessBody("seen").ok).toBe(false);
  });
});
