/**
 * Service-role reads for "practise together" (step 2, 2026-10-16): the shared
 * results card and the "your friend finished" push.
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
  type GroupFinisher,
  type TogetherCard,
} from "./together";

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
        out.push({
          attemptId: r.id as string,
          userId: r.user_id as string,
          mockId: r.mock_id as string,
          status: r.status as string,
          submittedAt: (r.submitted_at as string | null) ?? null,
        });
      }
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

async function readFirstNames(db: SupabaseClient, userIds: readonly string[]): Promise<Map<string, string | null>> {
  const out = new Map<string, string | null>();
  await Promise.all(
    [...new Set(userIds)].map(async (id) => {
      const { data, error } = await db.auth.admin.getUserById(id);
      out.set(id, error ? null : firstName(data.user?.user_metadata));
    })
  );
  return out;
}

/**
 * The card for one of the viewer's practice-test attempts: null when the
 * attempt is not theirs, not a practice test, or nobody else has the test;
 * "waiting" when friends have it but none has finished.
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
  if (!test || test.scope !== "custom") return null;

  const rootId = test.shared_from ?? test.id;
  const group = (await readGroupTests(db, [rootId])).get(rootId) ?? [];
  if (group.length < 2) return null;

  const firsts = firstFinishedByUser(await readAttemptsOn(db, group));
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
 * Every group with a finished attempt since `sinceIso`, with each member's
 * first finished attempt and first name: the input to pickFriendFinishedPushes.
 */
export async function readFriendFinishGroups(
  db: SupabaseClient,
  sinceIso: string
): Promise<{ rootId: string; finishers: GroupFinisher[] }[]> {
  const roots = new Set<string>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("id, mock:mock_tests!inner(id, shared_from, scope)")
      .gte("submitted_at", sinceIso)
      .in("status", ["submitted", "expired"])
      .eq("mock.scope", "custom")
      .order("submitted_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readFriendFinishGroups: ${error.message}`);
    const rows = (data ?? []) as unknown as { mock: { id: string; shared_from: string | null } }[];
    for (const r of rows) roots.add(r.mock.shared_from ?? r.mock.id);
    if (rows.length < PAGE) break;
  }
  if (roots.size === 0) return [];

  const groups = [...(await readGroupTests(db, [...roots])).entries()].filter(([, tests]) => tests.length >= 2);
  const out: { rootId: string; finishers: GroupFinisher[] }[] = [];
  const all: { rootId: string; firsts: FinishedAttempt[] }[] = [];
  for (const [rootId, tests] of groups) {
    const firsts = [...firstFinishedByUser(await readAttemptsOn(db, tests)).values()];
    if (firsts.length >= 2) all.push({ rootId, firsts });
  }
  const names = await readFirstNames(
    db,
    all.flatMap((g) => g.firsts.map((f) => f.userId))
  );
  for (const g of all) {
    out.push({
      rootId: g.rootId,
      finishers: g.firsts.map((f) => ({
        userId: f.userId,
        attemptId: f.attemptId,
        submittedAt: f.submittedAt!,
        name: names.get(f.userId) ?? null,
      })),
    });
  }
  return out;
}
