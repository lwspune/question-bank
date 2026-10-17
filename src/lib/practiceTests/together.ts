/**
 * Practise together, step 2 (2026-10-16): the shared results card on a
 * practice test's result page, and the push that tells a student a friend has
 * finished the same test.
 *
 * A GROUP is a test V built plus every friend's copy of it (shared_from, 0163).
 * Each person counts with their FIRST finished attempt, so a retake after
 * seeing the review cannot change what the card says.
 *
 * COOPERATIVE BY CONSTRUCTION (owner's call). The card lists which questions
 * each side missed, never a score or a count of right answers, so there is
 * nothing to rank by. Friends are named by first name only.
 *
 * Pure. Spec: tests/practice-together.test.ts.
 */
import { clickUrl } from "@/lib/email/click";
import { PUSH_BADGE, PUSH_ICON, type PushPayload } from "@/lib/push/core";

export type Verdict = 1 | -1 | 0;

/** Friends shown on one card, the most recent finishers first. */
export const MAX_FRIENDS = 10;

export type FriendSitting = { name: string | null; verdicts: Readonly<Record<string, Verdict>> };

export type TogetherCard = {
  friendNames: (string | null)[];
  /** Positions every one of you missed. */
  allMissed: number[];
  /** Positions you missed and these friends got right. */
  theyGot: { position: number; names: (string | null)[] }[];
  /** Positions you got right and these friends missed. */
  youGot: { position: number; names: (string | null)[] }[];
};

const right = (v: Verdict | undefined) => v === 1;

/**
 * Compare the viewer's sitting with each friend's, question by question, in
 * the test's order. A skipped question, or one missing from a sitting, counts
 * as missed. A question everyone got right appears nowhere.
 */
export function compareSittings(
  questionIds: readonly string[],
  mine: Readonly<Record<string, Verdict>>,
  friends: readonly FriendSitting[]
): TogetherCard {
  const card: TogetherCard = { friendNames: friends.map((f) => f.name), allMissed: [], theyGot: [], youGot: [] };
  if (friends.length === 0) return card;
  questionIds.forEach((qid, i) => {
    const position = i + 1;
    const gotIt = friends.filter((f) => right(f.verdicts[qid])).map((f) => f.name);
    const missedIt = friends.filter((f) => !right(f.verdicts[qid])).map((f) => f.name);
    if (right(mine[qid])) {
      if (missedIt.length > 0) card.youGot.push({ position, names: missedIt });
    } else if (gotIt.length > 0) {
      card.theyGot.push({ position, names: gotIt });
    } else {
      card.allMissed.push(position);
    }
  });
  return card;
}

export type FinishedAttempt = {
  attemptId: string;
  userId: string;
  mockId: string;
  status: string;
  submittedAt: string | null;
};

/** Each person's first finished attempt; attempts still running are ignored. */
export function firstFinishedByUser(attempts: readonly FinishedAttempt[]): Map<string, FinishedAttempt> {
  const out = new Map<string, FinishedAttempt>();
  for (const a of attempts) {
    if ((a.status !== "submitted" && a.status !== "expired") || !a.submittedAt) continue;
    const prev = out.get(a.userId);
    if (!prev || Date.parse(a.submittedAt) < Date.parse(prev.submittedAt!)) out.set(a.userId, a);
  }
  return out;
}

/**
 * A first name from an account's metadata (Google sign-ups carry full_name),
 * or null. An email or anything with a digit is not a name to show a friend.
 */
export function firstName(meta: unknown): string | null {
  if (!meta || typeof meta !== "object") return null;
  const m = meta as Record<string, unknown>;
  const raw = typeof m.full_name === "string" ? m.full_name : typeof m.name === "string" ? m.name : "";
  const word = raw.trim().split(/\s+/)[0] ?? "";
  if (word.length < 2 || word.length > 30 || /[\d@_]/.test(word)) return null;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/** "Riya", "Riya and Aman", "Riya and 2 friends", "A friend". */
export function nameList(names: readonly (string | null)[]): string {
  const named = names.filter((n): n is string => !!n);
  const unnamed = names.length - named.length;
  const parts = [...named];
  if (unnamed > 0) {
    parts.push(unnamed === 1 ? (named.length ? "a friend" : "A friend") : `${unnamed} friends`);
  }
  if (parts.length <= 1) return parts[0] ?? "A friend";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

// ── the "your friend finished" push ────────────────────────────────────────

export const FRIEND_FINISHED_KIND = "friend_finished" as const;
const KEY_PREFIX = `${FRIEND_FINISHED_KIND}:`;
/** At most one push per person per test in this window. */
const GAP_MS = 24 * 3_600_000;
/** A finish older than this is never announced, so a first run sends no backlog. */
const FRESH_MS = 48 * 3_600_000;

/** One per (recipient, test, newest finisher announced): the send log's UNIQUE key. */
export function friendFinishedDedupeKey(userId: string, rootId: string, newestAttemptId: string): string {
  return `${KEY_PREFIX}${userId}:${rootId}:${newestAttemptId}`;
}

export type GroupFinisher = { userId: string; attemptId: string; submittedAt: string; name: string | null };

/**
 * Everyone who finished one test together. For a practice test the key is the
 * ROOT test (0163); for a published paper it is the invite (0166), and the
 * paper's title rides along for the push.
 */
export type FriendGroup = { rootId: string; title?: string | null; finishers: readonly GroupFinisher[] };
export type PriorPush = { userId: string; dedupeKey: string; createdAt: string };
export type FriendFinishedPick = {
  userId: string;
  rootId: string;
  /** A published paper's title (0166); absent for a practice test. */
  title?: string | null;
  recipientAttemptId: string;
  names: (string | null)[];
  dedupeKey: string;
};

/**
 * Who to tell, and about whom. Everyone in a group who has finished hears
 * about the people who finished AFTER them and after their last such push,
 * at most once a day per test, and only about finishes in the last two days.
 */
export function pickFriendFinishedPushes(input: {
  groups: readonly FriendGroup[];
  priorSends: readonly PriorPush[];
  now: Date;
}): FriendFinishedPick[] {
  const now = input.now.getTime();
  const lastSent = new Map<string, number>();
  for (const p of input.priorSends) {
    if (!p.dedupeKey.startsWith(KEY_PREFIX)) continue;
    const [userId, rootId] = p.dedupeKey.slice(KEY_PREFIX.length).split(":");
    const k = `${userId}:${rootId}`;
    lastSent.set(k, Math.max(lastSent.get(k) ?? 0, Date.parse(p.createdAt)));
  }

  const picks: FriendFinishedPick[] = [];
  for (const g of input.groups) {
    const ordered = [...g.finishers].sort((a, b) => Date.parse(a.submittedAt) - Date.parse(b.submittedAt));
    for (const r of ordered) {
      const sentAt = lastSent.get(`${r.userId}:${g.rootId}`) ?? 0;
      if (now - sentAt < GAP_MS) continue;
      const since = Math.max(Date.parse(r.submittedAt), sentAt);
      const fresh = ordered.filter(
        (f) => f.userId !== r.userId && Date.parse(f.submittedAt) > since && now - Date.parse(f.submittedAt) <= FRESH_MS
      );
      if (fresh.length === 0) continue;
      picks.push({
        userId: r.userId,
        rootId: g.rootId,
        title: g.title ?? null,
        recipientAttemptId: r.attemptId,
        names: fresh.map((f) => f.name),
        dedupeKey: friendFinishedDedupeKey(r.userId, g.rootId, fresh[fresh.length - 1].attemptId),
      });
    }
  }
  return picks;
}

/** The anchor the result page gives the card. */
export const TOGETHER_ANCHOR = "together";

export function friendFinishedPayload(input: {
  names: readonly (string | null)[];
  recipientAttemptId: string;
  clickToken: string;
  /** A published paper's title; without one, it was a practice test. */
  title?: string | null;
}): PushPayload {
  return {
    title: `${nameList(input.names)} finished ${input.title ? input.title : "your practice test"}`,
    body: input.names.length > 1 ? "See what you all missed." : "See what you both missed.",
    url: clickUrl(input.clickToken, `/mock/attempt/${input.recipientAttemptId}/result#${TOGETHER_ANCHOR}`),
    tag: "practice-together",
    icon: PUSH_ICON,
    badge: PUSH_BADGE,
  };
}
