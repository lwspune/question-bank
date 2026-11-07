/**
 * V's follow-up share (owner's measure of V as a study partner, 2026-10-23):
 * of V's AI replies in a window, the share the student followed with another
 * message in the same conversation within 30 minutes.
 *
 * Since 2026-11-07 a repeat Ask V tap on the same question is NOT a follow-up.
 * 104 of 440 taps were the same student re-tapping the same question within a
 * minute; counted as follow-ups they held the share at 48% while real ones fell
 * from 39% to 31%. (From 2026-11-07 the window reopens the explanation on a
 * repeat tap and writes no row, so new data has few of them anyway.)
 *
 * Pure. Spec: tests/chat-follow-up-share.test.ts. Reader: scripts/chat/follow-ups.ts.
 */

export const FOLLOW_UP_MS = 30 * 60_000;

/** A typed_question row of chat_interactions (staff already left out). */
export type FollowUpRow = {
  conversationId: string | null;
  createdAt: string;
  /** reply_source = 'ai' */
  ai: boolean;
  askedQuestionId: string | null;
  askedNotesItem: string | null;
  pagePath: string | null;
};

export type FollowUpShare = {
  replies: number;
  followedUp: number;
  /** Messages in the window left out as repeat taps. */
  repeatTapsLeftOut: number;
  pct: number | null;
};

/** The question an Ask V tap was about, or null for a typed message. */
function tapKey(r: FollowUpRow): string | null {
  if (r.askedQuestionId) return `q:${r.askedQuestionId}`;
  if (r.askedNotesItem) return `n:${r.pagePath ?? ""}#${r.askedNotesItem}`;
  return null;
}

function isRepeatOf(later: FollowUpRow, earlier: FollowUpRow): boolean {
  const k = tapKey(later);
  return k !== null && k === tapKey(earlier);
}

export function followUpShare(rows: readonly FollowUpRow[], window: { from: string; to: string }): FollowUpShare {
  const from = Date.parse(window.from);
  const to = Date.parse(window.to);
  const byConversation = new Map<string, { row: FollowUpRow; t: number }[]>();
  for (const row of rows) {
    if (!row.conversationId) continue;
    const list = byConversation.get(row.conversationId) ?? [];
    list.push({ row, t: Date.parse(row.createdAt) });
    byConversation.set(row.conversationId, list);
  }

  let replies = 0;
  let followedUp = 0;
  let repeatTapsLeftOut = 0;
  for (const list of byConversation.values()) {
    list.sort((a, b) => a.t - b.t);
    list.forEach(({ row, t }, i) => {
      if (t < from || t >= to) return;
      const prev = list[i - 1];
      if (prev && t - prev.t <= FOLLOW_UP_MS && isRepeatOf(row, prev.row)) repeatTapsLeftOut++;
      if (!row.ai) return;
      replies++;
      for (const next of list.slice(i + 1)) {
        if (next.t - t > FOLLOW_UP_MS) break;
        if (!isRepeatOf(next.row, row)) {
          followedUp++;
          break;
        }
      }
    });
  }
  return { replies, followedUp, repeatTapsLeftOut, pct: replies === 0 ? null : Math.round((followedUp / replies) * 100) };
}
