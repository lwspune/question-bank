/**
 * The Review tab's reads (lib/review/query), against the TEST Supabase project
 * with the student's own login, the way the page reads.
 *
 * Proves what the pure spec cannot: the metadata fields come back under the
 * names the core reads (a renamed key would silently label every mock miss
 * "practice"), a Review later tap and a No to V are both found, and RLS keeps
 * another student's misses out of the list.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { loadMissRows, loadMockTitles } from "@/lib/review/query";
import { latestMisses, reasonOf } from "@/lib/review/fixList";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const MOCK_ID = "0b8d6c1a-3f2e-4d5c-9a8b-7c6d5e4f3a2b";

describe.skipIf(!HAS_ENV)("Review's miss reads", () => {
  let admin: SupabaseClient;
  let client: SupabaseClient;
  const users: string[] = [];
  let me = "";
  let other = "";
  let ids: string[] = [];

  async function makeUser(tag: string): Promise<string> {
    const created = await admin.auth.admin.createUser({
      email: `review_${tag}_${STAMP}@test.local`,
      password: `Pw-${STAMP}-${tag}`,
      email_confirm: true,
    });
    if (created.error) throw new Error(created.error.message);
    users.push(created.data.user!.id);
    return created.data.user!.id;
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    me = await makeUser("me");
    other = await makeUser("other");
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("review student", client, { email: `review_me_${STAMP}@test.local`, password: `Pw-${STAMP}-me` });

    const { data, error } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(3);
    if (error) throw new Error(error.message);
    ids = (data as { id: string }[]).map((r) => r.id);
    const [q1, q2, q3] = ids;

    const rows = [
      // A mock's own miss carries no surface, and the mock's id.
      { user_id: me, kind: "answer_wrong", ref_id: q1, ref_kind: "question", metadata: { mockId: MOCK_ID, sectionKey: "s" }, created_at: "2026-11-01T10:00:00Z" },
      // Review later under a written answer on /board.
      { user_id: me, kind: "answer_wrong", ref_id: q2, ref_kind: "question", metadata: { surface: "board", selfMark: "review" }, created_at: "2026-11-02T10:00:00Z" },
      // An earlier bank miss, then a No to V on the same question.
      { user_id: me, kind: "answer_wrong", ref_id: q3, ref_kind: "question", metadata: { surface: "bank", chose: "B" }, created_at: "2026-11-03T10:00:00Z" },
      { user_id: me, kind: "v_not_understood", ref_id: q3, ref_kind: "question", metadata: { surface: "v", interactionId: "x" }, created_at: "2026-11-04T10:00:00Z" },
      // Another student's miss on the same question: never in my list.
      { user_id: other, kind: "answer_wrong", ref_id: q1, ref_kind: "question", metadata: { surface: "drill" }, created_at: "2026-11-05T10:00:00Z" },
    ];
    const { error: insErr } = await admin.from("user_activity").insert(rows);
    if (insErr) throw new Error(insErr.message);
  });

  afterAll(async () => {
    for (const id of users) {
      await admin.from("user_activity").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  });

  it("reads each miss with the fields the reasons need, own rows only", async () => {
    const rows = await loadMissRows(client, me, ids);
    expect(rows).toHaveLength(4);
    expect(rows.every((r) => r.questionId && r.at)).toBe(true);
    const latest = latestMisses(rows);
    const [q1, q2, q3] = ids;
    expect(latest.get(q1)).toMatchObject({ kind: "answer_wrong", surface: null, mockId: MOCK_ID });
    expect(reasonOf(latest.get(q1)!)).toBe("mock");
    expect(reasonOf(latest.get(q2)!)).toBe("review_later");
    expect(reasonOf(latest.get(q3)!)).toBe("v_unclear");
  });

  it("finds nothing for questions the student never missed", async () => {
    expect(await loadMissRows(client, me, [])).toEqual([]);
  });

  it("leaves out a mock the student cannot read rather than failing", async () => {
    expect((await loadMockTitles(client, [MOCK_ID])).size).toBe(0);
  });
});
