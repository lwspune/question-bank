/**
 * Who gets a mock-recommendation email, and which mock. Pure — no I/O, `now` is
 * injected — unit-tested in tests/email-recommend.test.ts. `service.ts` supplies
 * the rows; `scripts/email/send-next-mock.ts` sends what this returns.
 *
 * Two cohorts, one pass (the reach argument: 12 of 41 students have attempted a
 * mock, so recommending only to attempters reaches a quarter of the roster —
 * the sibling English AI Tutor shipped exactly that and recorded the regret:
 * "the bigger engagement gap is students who never started — that's an
 * introduction-email problem, not a re-engagement problem"):
 *
 *   next_mock  — has attempted → the newest mock they HAVEN'T done, in the same
 *                exam AND the same paper (Maths vs GAT). Scoping to the paper is
 *                what "the course they attempted" means in practice: every
 *                published mock is NDA today, so the exam filter alone is a
 *                no-op, and 8 of 12 attempters have only ever sat a GAT paper.
 *   first_mock — never attempted → the newest paper of FIRST_MOCK_PAPER. Sent
 *                ONCE, ever (see the dedupe key).
 *
 * The dedupe key carries the anti-nag policy and is enforced by a UNIQUE index
 * (migration 0059), so a re-run can't double-send even if this function is wrong:
 *   next_mock:{userId}:{mockId} — never recommend the same mock twice; an
 *                                 ignored pick walks down the catalogue.
 *   first_mock:{userId}         — one activation email per person, full stop.
 */

import { ENGAGEMENT_FLOOR } from "@/lib/performance/compute";

export type EmailKind = "next_mock" | "first_mock";

export type StudentLite = {
  userId: string;
  email: string | null;
  name: string;
  /** ISO — account age gates the first email. */
  createdAt: string;
  emailOptOut: boolean;
};

export type MockLite = {
  id: string;
  slug: string;
  title: string;
  examId: string;
  paperCode: string;
  pyqYear: number;
  pyqMonth: string | null;
  totalQuestions: number;
  durationSecs: number;
};

export type AttemptLite = {
  userId: string;
  mockId: string;
  examId: string;
  paperCode: string;
  status: "in_progress" | "submitted" | "expired";
  startedAt: string;
  expiresAt: string;
  score: number | null;
  maxScore: number | null;
  /** How many questions carried a response. The abandonment signal — see
   *  `isAbandonedAttempt`. Required, not optional: an absent count would have to
   *  default to something, and either default silently misclassifies. */
  answeredCount: number;
};

export type PriorSend = {
  userId: string;
  dedupeKey: string;
  /** ISO — the newest one per user drives the cooldown. */
  createdAt: string;
};

export type ScoreHook = { score: number; maxScore: number; mockTitle: string };

export type Recipient = {
  userId: string;
  email: string;
  name: string;
  kind: EmailKind;
  mock: MockLite;
  dedupeKey: string;
  /** Most recent graded result, for the subject-line hook. Null on first_mock. */
  lastScore: ScoreHook | null;
};

export type PickInput = {
  students: StudentLite[];
  mocks: MockLite[];
  attempts: AttemptLite[];
  priorSends: PriorSend[];
  now: number;
  /**
   * Epoch ms. Only activity at or after this instant makes someone a candidate:
   * a sitting for `next_mock`, an account for `first_mock`. 0 disables it.
   *
   * REQUIRED, deliberately. This channel had no recency bound at all, so when it
   * was woken on 2026-09-19 after lying dormant since 2026-07-16 its first run
   * proposed 316 emails about activity up to two months old. A field with a
   * permissive default would restore that silently the first time a caller
   * forgot it; `mock_report` learned the same lesson as its `SINCE` const.
   */
  activitySince: number;
};

const DAY = 24 * 60 * 60 * 1000;

/** Don't nag an account that just registered — they haven't had a chance yet.
 *  (English AI Tutor uses the same 2-day floor.) */
export const MIN_ACCOUNT_AGE_MS = 2 * DAY;

/** At most one email per student per week. Deliberately longer than the sibling
 *  app's 3 days: a mock is a 150-minute sitting, not a 5-minute drill — nudging
 *  every third day would outpace any honest chance of acting on it. */
export const COOLDOWN_MS = 7 * DAY;

/** The paper a never-attempted student is introduced with. NDA Mathematics is
 *  LWS's core subject (see CLAUDE.md), so it's the honest first ask. */
export const FIRST_MOCK_PAPER = "maths";

/**
 * Was this attempt an abandoned tab rather than a sitting?
 *
 * ENGAGEMENT_FLOOR is IMPORTED from lib/performance/compute.ts rather than
 * redefined, because two copies of the same threshold are two things free to
 * drift. That module has applied it since the performance page shipped; the
 * email never did, and on 2026-09-19 that gap became impossible to ignore: the
 * expiry sweep graded 118 abandoned attempts, making them the most recent
 * attempt for 70 students, 44 of whom would have been told "0/600 last time —
 * ready for the next paper?" about a paper they walked away from.
 *
 * An unknown paper length counts as abandoned. The alternative — treating 0
 * questions as fully answered — would put a fabricated score in a subject line.
 */
export function isAbandonedAttempt(a: AttemptLite, totalQuestions: number): boolean {
  if (totalQuestions <= 0) return true;
  return a.answeredCount / totalQuestions < ENGAGEMENT_FLOOR;
}

/**
 * Domains that can never receive mail — RFC 2606 / 6761 reserved. The roster is
 * derived from auth.users, and test fixtures leak into auth.users when a suite's
 * afterAll is interrupted (a known, documented failure mode in this repo — see
 * the "Integration-test fixtures leak into the LIVE bank" pitfall in CLAUDE.md).
 * On 2026-07-07 the billing tests stranded two `@test.invalid` users, and the
 * first dry run of this campaign picked both.
 *
 * Sending there is a guaranteed HARD BOUNCE, and bounce rate is the metric that
 * gets a young sending domain throttled or suspended. A skip-list of known bad
 * addresses would rot; this is the property that actually matters.
 */
const RESERVED_TLDS = new Set(["invalid", "test", "example", "localhost"]);
const RESERVED_DOMAINS = new Set(["example.com", "example.net", "example.org"]);

export function isUndeliverable(email: string): boolean {
  const addr = email.trim().toLowerCase();
  const at = addr.lastIndexOf("@");
  if (at <= 0 || at === addr.length - 1) return true; // no local part or no domain
  const domain = addr.slice(at + 1);
  if (!domain.includes(".")) return true; // bare hostname is not routable
  if (RESERVED_DOMAINS.has(domain)) return true;
  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  return RESERVED_TLDS.has(tld);
}

/** NDA sittings: Apr = NDA 1, Sep = NDA 2 (project convention). `pyq_month` is
 *  TEXT in the DB and does not sort chronologically — "Apr" < "Sep" is true
 *  alphabetically by luck, not by design. Rank explicitly. */
const MONTH_RANK: Record<string, number> = { Apr: 1, Sep: 2 };

/** Higher = more recent sitting. */
function sittingRank(m: MockLite): number {
  return m.pyqYear * 10 + (m.pyqMonth ? (MONTH_RANK[m.pyqMonth] ?? 0) : 0);
}

/** Newest sitting first; slug tie-breaks so a run is deterministic. */
function byNewest(a: MockLite, b: MockLite): number {
  return sittingRank(b) - sittingRank(a) || a.slug.localeCompare(b.slug);
}

export function nextMockKey(userId: string, mockId: string): string {
  return `next_mock:${userId}:${mockId}`;
}

export function firstMockKey(userId: string): string {
  return `first_mock:${userId}`;
}

export function pickRecipients(input: PickInput): Recipient[] {
  const { students, mocks, attempts, priorSends, now, activitySince } = input;

  const questionsByMock = new Map<string, number>();
  for (const m of mocks) questionsByMock.set(m.id, m.totalQuestions);
  const genuine = (a: AttemptLite) =>
    !isAbandonedAttempt(a, questionsByMock.get(a.mockId) ?? 0);

  const attemptsByUser = new Map<string, AttemptLite[]>();
  for (const a of attempts) {
    const list = attemptsByUser.get(a.userId);
    if (list) list.push(a);
    else attemptsByUser.set(a.userId, [a]);
  }

  const sentKeys = new Set(priorSends.map((s) => s.dedupeKey));
  const lastSentAt = new Map<string, number>();
  for (const s of priorSends) {
    const t = Date.parse(s.createdAt);
    const prev = lastSentAt.get(s.userId);
    if (prev === undefined || t > prev) lastSentAt.set(s.userId, t);
  }

  const out: Recipient[] = [];

  for (const st of students) {
    if (!st.email) continue;
    if (isUndeliverable(st.email)) continue;
    if (st.emailOptOut) continue;
    if (now - Date.parse(st.createdAt) < MIN_ACCOUNT_AGE_MS) continue;

    const last = lastSentAt.get(st.userId);
    if (last !== undefined && now - last < COOLDOWN_MS) continue;

    const mine = attemptsByUser.get(st.userId) ?? [];

    // Mid-exam right now → say nothing. Checking the EXPIRY rather than the
    // status is what makes this correct: as of 2026-09-19 an hourly sweep grades
    // expired attempts, so an in_progress row is normally genuinely live — but
    // one can still sit unswept for up to an hour, and before the sweep existed
    // every one of them was days old.
    const live = mine.some((a) => a.status === "in_progress" && Date.parse(a.expiresAt) > now);
    if (live) continue;

    // FORWARD-ONLY. A sitting makes someone a candidate for `next_mock`; an
    // account does for `first_mock`. An ABANDONED attempt is not activity —
    // counting it would let the expiry sweep's own 118 rows read as fresh
    // engagement and re-open the backfill this closes.
    const active = mine.some((a) => genuine(a) && Date.parse(a.startedAt) >= activitySince);
    const newAccount = Date.parse(st.createdAt) >= activitySince;
    if (!active && !newAccount) continue;

    const picked = mine.length > 0
      ? pickNext(st, mine, mocks, sentKeys, genuine)
      : pickFirst(st, mocks, sentKeys);

    // One email per user per run — `picked` is already at most one.
    if (picked) out.push(picked);
  }

  return out;
}

/** Newest unattempted mock in an exam AND paper this student has actually sat. */
function pickNext(
  st: StudentLite,
  mine: AttemptLite[],
  mocks: MockLite[],
  sentKeys: Set<string>,
  genuine: (a: AttemptLite) => boolean
): Recipient | null {
  // Any attempt counts as "sat this paper" — submitted, expired, or abandoned.
  const examIds = new Set(mine.map((a) => a.examId));
  const paperCodes = new Set(mine.map((a) => a.paperCode));
  const attemptedMockIds = new Set(mine.map((a) => a.mockId));

  const candidate = mocks
    .filter(
      (m) =>
        examIds.has(m.examId) &&
        paperCodes.has(m.paperCode) &&
        !attemptedMockIds.has(m.id) &&
        !sentKeys.has(nextMockKey(st.userId, m.id))
    )
    .sort(byNewest)[0];

  if (!candidate) return null;

  return {
    userId: st.userId,
    email: st.email!,
    name: st.name,
    kind: "next_mock",
    mock: candidate,
    dedupeKey: nextMockKey(st.userId, candidate.id),
    lastScore: latestGraded(mine.filter(genuine), mocks),
  };
}

/** The one-and-only activation email: newest paper of the default type. */
function pickFirst(st: StudentLite, mocks: MockLite[], sentKeys: Set<string>): Recipient | null {
  const dedupeKey = firstMockKey(st.userId);
  if (sentKeys.has(dedupeKey)) return null; // sent once, ever

  const candidate = mocks.filter((m) => m.paperCode === FIRST_MOCK_PAPER).sort(byNewest)[0];
  if (!candidate) return null;

  return {
    userId: st.userId,
    email: st.email!,
    name: st.name,
    kind: "first_mock",
    mock: candidate,
    dedupeKey,
    lastScore: null,
  };
}

/** Most recent GRADED attempt (score is null while in-progress / if never
 *  graded), for the "you scored X last time" subject hook. */
function latestGraded(mine: AttemptLite[], mocks: MockLite[]): ScoreHook | null {
  const graded = mine
    .filter((a) => a.score !== null && a.maxScore !== null)
    .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))[0];
  if (!graded) return null;

  const title = mocks.find((m) => m.id === graded.mockId)?.title ?? "";
  return { score: graded.score!, maxScore: graded.maxScore!, mockTitle: title };
}
