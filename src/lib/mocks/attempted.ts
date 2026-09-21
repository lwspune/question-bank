/**
 * "Have I sat this one?" — the marker on a /mock catalogue card.
 *
 * WHY THIS EXISTS. The catalogue told a student everything about a paper except
 * the one thing only they could know: whether they had already taken it. The
 * answer was one click away on the mock's own page (`Your attempts`), which is
 * one click too late when the decision being made is *which card to click*. On
 * a 36-card NDA list that meant opening papers to find out they were already
 * done.
 *
 * WHY IT IS A PURE CORE. The surface is a client island on an ISR-cached,
 * indexable page — `next build` cannot render it, and reaching it by hand needs
 * a signed-in session with real attempt history. So everything decidable
 * without a DOM is decided here, where tests can reach it.
 *
 * WHY THE READ IS CLIENT-SIDE. /mock/exam/<exam>/<type> is a prerendered static
 * file (verified: 1,445 .html on disk, these among them), `revalidate = 3600`,
 * indexable and in the sitemap. A server-side session read to personalise the
 * card would mark the route dynamic and delete every one of those files — the
 * failure CLAUDE.md records under "shell component de-caches site". So the
 * badge is fetched after hydration via own-row RLS, exactly as YourNotesStrip
 * does on /notes, and the HTML a crawler receives is unchanged.
 *
 * Pure — no DB, no React, no clock. `nowMs` is a parameter so the
 * expired-timer rule below is testable rather than dependent on when the suite
 * runs. Unit-tested in tests/mock-attempted.test.ts.
 */

/** One row of the signed-in student's own `mock_attempts` (migration 0044). */
export type OwnAttemptRow = {
  mockId: string;
  status: "in_progress" | "submitted" | "expired";
  /** Null until the attempt is graded. Can be NEGATIVE under negative marking. */
  score: number | null;
  maxScore: number | null;
  expiresAt: string;
  startedAt: string;
};

export type MockAttemptSummary = {
  /** Sittings that actually happened. A LIVE attempt is excluded — see below. */
  count: number;
  /** An attempt is open and still has time on the clock. At most one: a UNIQUE
   *  partial index enforces one live attempt per (student, mock). */
  live: boolean;
  /** Best score across graded sittings, null if none is graded yet. */
  bestScore: number | null;
  /** The max for the sitting `bestScore` came from — never mixed across rows. */
  maxScore: number | null;
};

/**
 * Is this attempt still sittable?
 *
 * NOT `status === "in_progress"`. The hourly sweep grades attempts whose timer
 * ran out while nobody was watching (118 of them were stranded since July
 * before it existed), so for up to an hour a finished sitting still carries
 * status 'in_progress'. startAttempt() resumes such a row and the runner
 * auto-submits the moment it opens — so calling it "Resume" offers a test that
 * cannot be taken. The clock is the authority, not the column.
 */
function isLive(r: OwnAttemptRow, nowMs: number): boolean {
  if (r.status !== "in_progress") return false;
  const expires = Date.parse(r.expiresAt);
  // An unparseable timestamp fails CLOSED (not live): the cost of a missing
  // Resume badge is a wasted click, the cost of a false one is a test that
  // vanishes on open.
  return Number.isFinite(expires) && expires > nowMs;
}

/**
 * Fold the student's own attempt rows into one summary per mock.
 *
 * Rows for mocks that are not on the page are simply never looked up, so the
 * caller can hand this the student's whole history without filtering it first.
 */
export function summarizeOwnAttempts(
  rows: OwnAttemptRow[],
  nowMs: number
): Map<string, MockAttemptSummary> {
  const out = new Map<string, MockAttemptSummary>();

  for (const r of rows) {
    const s =
      out.get(r.mockId) ??
      { count: 0, live: false, bestScore: null, maxScore: null };

    if (isLive(r, nowMs)) {
      // A live attempt is an invitation to resume, not a paper sat. Counting it
      // would tell a student they had completed a test they are still inside.
      s.live = true;
    } else {
      s.count += 1;
      // A score needs BOTH halves to mean anything — "60" with no max is not a
      // result, it is a number. An explicit null check, not truthiness:
      // negative marking makes 0 and -12 real scores that `||` would erase.
      if (r.score !== null && r.maxScore !== null) {
        if (s.bestScore === null || r.score > s.bestScore) {
          s.bestScore = r.score;
          s.maxScore = r.maxScore;
        }
      }
    }
    out.set(r.mockId, s);
  }

  return out;
}

export type AttemptBadgeView = {
  /** Terse, for the card. */
  label: string;
  /** The same thing in words — "×3 · best 68/100" is not speech. */
  ariaLabel: string;
  tone: "live" | "done";
};

/** How many times, in words, for the spoken label. */
function timesInWords(count: number): string {
  if (count === 1) return "once";
  if (count === 2) return "twice";
  return `${count} times`;
}

/**
 * What the card should say, or null for a paper never opened.
 *
 * Never-attempted deliberately renders NOTHING rather than "Not attempted": the
 * default state on a catalogue is untouched, so labelling it would put a badge
 * on every card and make the marker worthless at exactly the moment it matters.
 *
 * BEST, not latest. A retake that goes worse must not lower the number on the
 * card — that would make the card punish the practice it exists to encourage.
 */
export function attemptBadge(
  s: MockAttemptSummary | undefined
): AttemptBadgeView | null {
  if (!s) return null;

  // Resume outranks history: an open attempt is the only state here that is
  // time-critical, and it is what the student most needs to see.
  if (s.live) {
    return {
      label: "Resume",
      ariaLabel: "Attempt in progress — resume this mock",
      tone: "live",
    };
  }

  if (s.count === 0) return null;

  const graded = s.bestScore !== null && s.maxScore !== null;
  if (!graded) {
    // Sat, but not yet graded — the sweep runs hourly, so this is a real state
    // a student can land on, and it must not pretend to a score it lacks.
    return {
      label: s.count === 1 ? "Attempted" : `Attempted ×${s.count}`,
      ariaLabel: `Attempted ${timesInWords(s.count)}, not yet graded`,
      tone: "done",
    };
  }

  // Rounded: CDS marks fractionally (-0.83 a wrong answer), so a raw score is
  // routinely 33.329999999. The card has room for a number, not a float.
  const score = Math.round(s.bestScore as number);
  const max = Math.round(s.maxScore as number);

  if (s.count === 1) {
    return {
      label: `${score}/${max}`,
      ariaLabel: `Attempted once, score ${score} out of ${max}`,
      tone: "done",
    };
  }

  return {
    label: `×${s.count} · ${score}/${max}`,
    ariaLabel: `Attempted ${timesInWords(s.count)}, best score ${score} out of ${max}`,
    tone: "done",
  };
}
