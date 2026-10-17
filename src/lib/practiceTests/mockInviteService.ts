/**
 * Service-role reads and writes for practise together on published papers
 * (migration 0166). Both tables have RLS on and no policies, so every caller
 * passes the admin client: the start page (make the sender's invite, read a
 * friend's), the start route (record the join) and the result card.
 *
 * Pure rules live in mockInvite.ts; spec tests/mock-together.integration.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import type { InviteEdge } from "./mockInvite";

/** `.in()` lists ride in the URL; keep them short (CLAUDE.md pitfall). */
const CHUNK = 200;

/** The sender's invite code for a paper, made on first ask. */
export async function getOrCreateInvite(db: SupabaseClient, mockId: string, inviterId: string): Promise<string> {
  const read = async () => {
    const { data, error } = await db
      .from("mock_invites")
      .select("code")
      .eq("mock_id", mockId)
      .eq("inviter_id", inviterId)
      .maybeSingle<{ code: string }>();
    if (error) throw new Error(`getOrCreateInvite read: ${error.message}`);
    return data?.code ?? null;
  };
  const existing = await read();
  if (existing) return existing;
  const code = randomBytes(6).toString("hex");
  const { error } = await db.from("mock_invites").insert({ code, mock_id: mockId, inviter_id: inviterId });
  if (error) {
    // 23505: a second tab made it first (or, once in a blue moon, the code
    // was taken: the read then finds nothing and the throw below says so).
    if (error.code === "23505") {
      const again = await read();
      if (again) return again;
    }
    throw new Error(`getOrCreateInvite insert: ${error.message}`);
  }
  return code;
}

export type PaperInvite = { id: string; mockId: string; inviterId: string };

/** The invite behind a code, only if it is for this paper. */
export async function readInvite(db: SupabaseClient, code: string, slug: string): Promise<PaperInvite | null> {
  const { data, error } = await db
    .from("mock_invites")
    .select("id, mock_id, inviter_id, mock:mock_tests!inner(slug)")
    .eq("code", code)
    .eq("mock.slug", slug)
    .maybeSingle<{ id: string; mock_id: string; inviter_id: string }>();
  if (error) throw new Error(`readInvite: ${error.message}`);
  return data ? { id: data.id, mockId: data.mock_id, inviterId: data.inviter_id } : null;
}

export type JoinResult = "joined" | "own" | "invalid" | "limited";

/**
 * Record that a student is starting a paper from a friend's invite, before
 * the attempt is made, so the start trigger lets it through free. A join that
 * already exists stands. `allowNew` is asked only before a NEW join (the
 * route's daily rate limit).
 */
export async function joinMockInvite(
  db: SupabaseClient,
  i: { code: string; slug: string; userId: string; allowNew: () => Promise<boolean> }
): Promise<JoinResult> {
  const invite = await readInvite(db, i.code, i.slug);
  if (!invite) return "invalid";
  if (invite.inviterId === i.userId) return "own";

  const { data: had, error: readErr } = await db
    .from("mock_invite_joins")
    .select("invite_id")
    .eq("invite_id", invite.id)
    .eq("friend_id", i.userId)
    .maybeSingle();
  if (readErr) throw new Error(`joinMockInvite read: ${readErr.message}`);
  if (had) return "joined";

  if (!(await i.allowNew())) return "limited";
  const { error } = await db.from("mock_invite_joins").insert({
    invite_id: invite.id,
    mock_id: invite.mockId,
    inviter_id: invite.inviterId,
    friend_id: i.userId,
  });
  // 23505: a second tap got there first, which is the same outcome.
  if (error && error.code !== "23505") throw new Error(`joinMockInvite insert: ${error.message}`);
  return "joined";
}

type EdgeRow = { invite_id: string; mock_id: string; inviter_id: string; friend_id: string };
export type PaperEdge = InviteEdge & { mockId: string };

const toEdge = (r: EdgeRow): PaperEdge => ({
  inviteId: r.invite_id,
  mockId: r.mock_id,
  inviterId: r.inviter_id,
  friendId: r.friend_id,
});

const PAGE = 1000;
const EDGE_COLUMNS = "invite_id, mock_id, inviter_id, friend_id";

/** Every join on these papers, as edges (the push reads this). */
export async function readInviteEdges(db: SupabaseClient, mockIds: readonly string[]): Promise<PaperEdge[]> {
  const out: PaperEdge[] = [];
  for (let i = 0; i < mockIds.length; i += CHUNK) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("mock_invite_joins")
        .select(EDGE_COLUMNS)
        .in("mock_id", mockIds.slice(i, i + CHUNK))
        .order("invite_id")
        .order("friend_id")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`readInviteEdges: ${error.message}`);
      const rows = (data ?? []) as EdgeRow[];
      out.push(...rows.map(toEdge));
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

/**
 * The joins on one paper that touch the viewer's invites: invites they sent
 * or joined, with every friend each of those reached (the card reads this).
 * Bounded by the viewer's own invites, however popular the paper.
 */
export async function readViewerEdges(db: SupabaseClient, mockId: string, viewerId: string): Promise<PaperEdge[]> {
  const { data: touching, error } = await db
    .from("mock_invite_joins")
    .select("invite_id")
    .eq("mock_id", mockId)
    .or(`inviter_id.eq.${viewerId},friend_id.eq.${viewerId}`)
    .limit(PAGE);
  if (error) throw new Error(`readViewerEdges: ${error.message}`);
  const inviteIds = [...new Set(((touching ?? []) as { invite_id: string }[]).map((r) => r.invite_id))];
  const out: PaperEdge[] = [];
  for (let i = 0; i < inviteIds.length; i += CHUNK) {
    const { data, error: e2 } = await db
      .from("mock_invite_joins")
      .select(EDGE_COLUMNS)
      .in("invite_id", inviteIds.slice(i, i + CHUNK))
      .limit(PAGE);
    if (e2) throw new Error(`readViewerEdges joins: ${e2.message}`);
    out.push(...((data ?? []) as EdgeRow[]).map(toEdge));
  }
  return out;
}
