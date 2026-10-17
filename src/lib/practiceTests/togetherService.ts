/**
 * Service-role reads for "practise together" (step 2, 2026-10-16): the shared
 * results card and the "your friend finished" push. Two kinds of group: a
 * practice test V built plus its friends' copies (0163), and a published
 * paper's invites (0166), where everyone sits the same paper and the group is
 * whoever an invite links the viewer to.
 *
 * SERVICE ROLE BY NECESSITY. A friend's attempts are their own rows, so no
 * student's JWT can read them. The card loader is guarded instead: it answers
 * only for an attempt the viewer owns, and returns which questions a friend
 * missed, never their score or chosen options.
 *
 * Grading goes through regradeAttempt, the same code the score uses, so the
 * card and the review list cannot disagree about a question.
 *
 * Not marked `server-only` itself, but lib/mocks/service is: the tsx push
 * sender imports scripts/lib/serverOnly first, as mock:sweep does.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { regradeAttempt } from "@/lib/mocks/service";
import {
  MAX_FRIENDS,
  compareSittings,
  firstFinishedByUser,
  firstName,
  type FinishedAttempt,
  type FriendGroup,
  type TogetherCard,
} from "./together";
import { mockFriendIds } from "./mockInvite";
import { readInviteEdges, readViewerEdges } from "./mockInviteService";

const PAGE = 1000;
/** `.in()` lists ride in the URL; keep them short (CLAUDE.md pitfall). */
const CHUNK = 200;

export type TogetherState = { state: "waiting" } | { state: "ready"; card: TogetherCard };

type GroupTest = { id: string; owner_id: string };

async function readGroupTests(db: SupabaseClient, rootIds: readonly string[]): Promise<Map<string, GroupTest[]>> {
  const byRoot = new Map<string, GroupTest[]>();
  for (let i = 0; i < rootIds.length; i += CHUNK) {
    const chunk = rootIds.slice(i, i + CHUNK);
    const list = chunk.join(",");
    const { data, error } = await db
      .from("mock_tests")
      .select("id, owner_id, shared_from")
      .eq("status", "personal")
      .or(`id.in.(${list}),shared_from.in.(${list})`);
    if (error) throw new Error(`readGroupTests: ${error.message}`);
    for (const r of (data ?? []) as { id: string; owner_id: string; shared_from: string | null }[]) {
      const root = r.shared_from ?? r.id;
      byRoot.set(root, [...(byRoot.get(root) ?? []), { id: r.id, owner_id: r.owner_id }]);
    }
  }
  return byRoot;
}

async function readAttemptsOn(db: SupabaseClient, tests: readonly GroupTest[]): Promise<FinishedAttempt[]> {
  const owner = new Map(tests.map((t) => [t.id, t.owner_id]));
  const ids = tests.map((t) => t.id);
  const out: FinishedAttempt[] = [];
  for (let i = 0; i < ids.length; i += CHUNK) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("mock_attempts")
        .select("id, user_id, mock_id, status, submitted_at")
        .in("mock_id", ids.slice(i, i + CHUNK))
        .in("status", ["submitted", "expired"])
        .order("submitted_at", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`readAttemptsOn: ${error.message}`);
      const rows = (data ?? []) as Record<string, unknown>[];
      for (const r of rows) {
        // Only the test's owner can sit a personal test (0156), but check anyway.
        if (owner.get(r.mock_id as string) !== r.user_id) continue;
        out.push(toFinished(r));
      }
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

/** Finished attempts on one published paper by these students (0166). */
async function readMemberAttempts(
  db: SupabaseClient,
  mockId: string,
  userIds: readonly string[]
): Promise<FinishedAttempt[]> {
  const out: FinishedAttempt[] = [];
  for (let i = 0; i < userIds.length; i += CHUNK) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("mock_attempts")
        .select("id, user_id, mock_id, status, submitted_at")
        .eq("mock_id", mockId)
        .in("user_id", userIds.slice(i, i + CHUNK))
        .in("status", ["submitted", "expired"])
        .order("submitted_at", { ascending: true })
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`readMemberAttempts: ${error.message}`);
      const rows = (data ?? []) as Record<string, unknown>[];
      out.push(...rows.map(toFinished));
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

function toFinished(r: Record<string, unknown>): FinishedAttempt {
  return {
    attemptId: r.id as string,
    userId: r.user_id as string,
    mockId: r.mock_id as string,
    status: r.status as string,
    submittedAt: (r.submitted_at as string | null) ?? null,
  };
}

export async function readFirstNames(
  db: SupabaseClient,
  userIds: readonly string[]
): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>();
  await Promise.all(
    [...new Set(userIds)].map(async (id) => {
      const { data, error } = await db.auth.admin.getUserById(id);
      out.set(id, error ? null : firstName(data.user?.user_metadata));
    })
  );
  return out;
}

/** The card: the viewer's attempt against each friend's first finished one. */
async function compareWith(
  db: SupabaseClient,
  viewerId: string,
  attemptId: string,
  firsts: Map<string, FinishedAttempt>
): Promise<TogetherState> {
  firsts.delete(viewerId);
  const friends = [...firsts.values()]
    .sort((a, b) => Date.parse(b.submittedAt!) - Date.parse(a.submittedAt!))
    .slice(0, MAX_FRIENDS);
  if (friends.length === 0) return { state: "waiting" };

  const [mine, names, ...theirs] = await Promise.all([
    regradeAttempt(db, viewerId, attemptId),
    readFirstNames(
      db,
      friends.map((f) => f.userId)
    ),
    ...friends.map((f) => regradeAttempt(db, f.userId, f.attemptId)),
  ]);
  const card = compareSittings(
    mine.questions.map((q) => q.questionId),
    mine.verdicts,
    friends.map((f, i) => ({ name: names.get(f.userId) ?? null, verdicts: theirs[i].verdicts }))
  );
  return { state: "ready", card };
}

/**
 * The card for one of the viewer's attempts: null when the attempt is not
 * theirs or nobody else is linked to the test (no friend's copy of a practice
 * test; on a published paper, no invite with a friend in it); "waiting" when
 * friends are linked but none has finished.
 */
export async function loadTogetherCard(
  db: SupabaseClient,
  viewerId: string,
  attemptId: string
): Promise<TogetherState | null> {
  const { data: attempt, error: aErr } = await db
    .from("mock_attempts")
    .select("id, mock_id")
    .eq("id", attemptId)
    .eq("user_id", viewerId)
    .maybeSingle<{ id: string; mock_id: string }>();
  if (aErr) throw new Error(`loadTogetherCard attempt: ${aErr.message}`);
  if (!attempt) return null;

  const { data: test, error: tErr } = await db
    .from("mock_tests")
    .select("id, shared_from, scope")
    .eq("id", attempt.mock_id)
    .maybeSingle<{ id: string; shared_from: string | null; scope: string }>();
  if (tErr) throw new Error(`loadTogetherCard test: ${tErr.message}`);
  if (!test) return null;

  if (test.scope !== "custom") {
    const friendIds = mockFriendIds(viewerId, await readViewerEdges(db, test.id, viewerId));
    if (friendIds.length === 0) return null;
    const firsts = firstFinishedByUser(await readMemberAttempts(db, test.id, friendIds));
    return compareWith(db, viewerId, attemptId, firsts);
  }

  const rootId = test.shared_from ?? test.id;
  const group = (await readGroupTests(db, [rootId])).get(rootId) ?? [];
  if (group.length < 2) return null;
  return compareWith(db, viewerId, attemptId, firstFinishedByUser(await readAttemptsOn(db, group)));
}

/** The tests with a finished attempt since `sinceIso`: practice tests, or every other kind. */
async function readRecentlyFinished(
  db: SupabaseClient,
  sinceIso: string,
  practice: boolean
): Promise<{ id: string; shared_from: string | null }[]> {
  const out = new Map<string, { id: string; shared_from: string | null }>();
  for (let from = 0; ; from += PAGE) {
    const base = db
      .from("mock_attempts")
      .select("id, mock:mock_tests!inner(id, shared_from, scope)")
      .gte("submitted_at", sinceIso)
      .in("status", ["submitted", "expired"]);
    const scoped = practice ? base.eq("mock.scope", "custom") : base.neq("mock.scope", "custom");
    const { data, error } = await scoped.order("submitted_at", { ascending: true }).range(from, from + PAGE - 1);
    if (error) throw new Error(`readRecentlyFinished: ${error.message}`);
    const rows = (data ?? []) as unknown as { mock: { id: string; shared_from: string | null } }[];
    for (const r of rows) out.set(r.mock.id, r.mock);
    if (rows.length < PAGE) break;
  }
  return [...out.values()];
}

/**
 * Every group with a finished attempt since `sinceIso`, with each member's
 * first finished attempt and first name: the input to pickFriendFinishedPushes.
 * A practice-test group is keyed by its root test; a published paper's by the
 * invite, and carries the paper's title for the push.
 */
export async function readFriendFinishGroups(db: SupabaseClient, sinceIso: string): Promise<FriendGroup[]> {
  const all: { rootId: string; title: string | null; firsts: FinishedAttempt[] }[] = [];

  // Practice tests (0163): the root test and its copies.
  const roots = new Set((await readRecentlyFinished(db, sinceIso, true)).map((m) => m.shared_from ?? m.id));
  if (roots.size > 0) {
    const groups = [...(await readGroupTests(db, [...roots])).entries()].filter(([, tests]) => tests.length >= 2);
    for (const [rootId, tests] of groups) {
      const firsts = [...firstFinishedByUser(await readAttemptsOn(db, tests)).values()];
      if (firsts.length >= 2) all.push({ rootId, title: null, firsts });
    }
  }

  // Published papers (0166): one group per invite a friend joined.
  const paperIds = (await readRecentlyFinished(db, sinceIso, false)).map((m) => m.id);
  const edges = paperIds.length > 0 ? await readInviteEdges(db, paperIds) : [];
  if (edges.length > 0) {
    const invites = new Map<string, { mockId: string; members: Set<string> }>();
    for (const e of edges) {
      const inv = invites.get(e.inviteId) ?? { mockId: e.mockId, members: new Set([e.inviterId]) };
      inv.members.add(e.friendId);
      invites.set(e.inviteId, inv);
    }
    const titles = new Map<string, string>();
    const mockIds = [...new Set([...invites.values()].map((v) => v.mockId))];
    for (let i = 0; i < mockIds.length; i += CHUNK) {
      const { data, error } = await db.from("mock_tests").select("id, title").in("id", mockIds.slice(i, i + CHUNK));
      if (error) throw new Error(`readFriendFinishGroups titles: ${error.message}`);
      for (const r of (data ?? []) as { id: string; title: string }[]) titles.set(r.id, r.title);
    }
    for (const [inviteId, inv] of invites) {
      const firsts = [...firstFinishedByUser(await readMemberAttempts(db, inv.mockId, [...inv.members])).values()];
      if (firsts.length >= 2) all.push({ rootId: inviteId, title: titles.get(inv.mockId) ?? null, firsts });
    }
  }

  if (all.length === 0) return [];
  const names = await readFirstNames(
    db,
    all.flatMap((g) => g.firsts.map((f) => f.userId))
  );
  return all.map((g) => ({
    rootId: g.rootId,
    title: g.title,
    finishers: g.firsts.map((f) => ({
      userId: f.userId,
      attemptId: f.attemptId,
      submittedAt: f.submittedAt!,
      name: names.get(f.userId) ?? null,
    })),
  }));
}
