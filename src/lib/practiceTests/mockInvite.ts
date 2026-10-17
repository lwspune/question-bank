/**
 * Practise together on published papers (migration 0166, 2026-10-17).
 *
 * The box under Start on /mock/<slug> sends the paper's own page with
 * ?with=<code>. A friend who presses Start from that link is recorded as
 * having joined the sender's invite, sits the SAME paper (free, by the
 * database's rule), and both result pages show what each side missed. Unlike
 * a practice test (friend.ts, 0163) nothing is copied: the paper is already
 * open to everyone.
 *
 * Cooperative, not a contest (owner's call): the message names the paper and
 * never a score.
 *
 * Pure. Spec: tests/mock-together.test.ts.
 */
import { SITE_URL, type ShareChannel } from "@/lib/mocks/share";

/** Every send from the box rolls up under this campaign (migration 0106 reads it). */
export const MOCK_TOGETHER_CAMPAIGN = "mock-together";

/** The query parameter that carries an invite code. */
export const INVITE_PARAM = "with";

const CODE = /^[0-9a-f]{12}$/;

/** An invite code, the only thing ?with= is looked up by. */
export function isInviteCode(value: unknown): value is string {
  return typeof value === "string" && CODE.test(value);
}

/** The paper's page with the code, tagged so a friend who signs up is attributed. */
export function buildMockInviteUrl(slug: string, code: string, channel: ShareChannel): string {
  const u = new URL(`${SITE_URL}/mock/${encodeURIComponent(slug)}`);
  u.searchParams.set(INVITE_PARAM, code);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", MOCK_TOGETHER_CAMPAIGN);
  return u.toString();
}

export type MockInviteTextInput = {
  slug: string;
  code: string;
  title: string;
  questions: number;
  minutes: number;
  channel: ShareChannel;
};

/** The pre-filled message: the paper, its size, free, then the link last. */
export function buildMockInviteText(i: MockInviteTextInput): string {
  return [
    "I'm taking this paper on PYQ Vault. Take it with me:",
    i.title,
    `${i.questions} questions · ${i.minutes} min · free`,
    "",
    buildMockInviteUrl(i.slug, i.code, i.channel),
  ].join("\n");
}

/** One friend who joined one invite on a paper. */
export type InviteEdge = { inviteId: string; inviterId: string; friendId: string };

/**
 * Everyone the viewer is linked to on one paper: who sent it to them, who
 * they sent it to, and anyone else those same invites reached. Each person
 * once, in the order first met; never the viewer.
 */
export function mockFriendIds(viewerId: string, edges: readonly InviteEdge[]): string[] {
  const mine = new Set(
    edges.filter((e) => e.inviterId === viewerId || e.friendId === viewerId).map((e) => e.inviteId)
  );
  const out: string[] = [];
  const seen = new Set<string>([viewerId]);
  for (const e of edges) {
    if (!mine.has(e.inviteId)) continue;
    for (const id of [e.inviterId, e.friendId]) {
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}
