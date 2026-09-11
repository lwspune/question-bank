/**
 * Integration test for GET /api/questions/by-ids — the tracker read bridge.
 *
 * The two committed sibling suites (sync-by-ids-request, sync-question-payload)
 * are PURE: they prove the parser's rules and the payload's field names. Neither
 * touches the thing this route exists for, which is the SECURITY BOUNDARY:
 *
 *   - a PRIVATE row resolves for the org whose secret was presented,
 *   - another org's PRIVATE row does NOT, and is reported as `missing`,
 *   - an unknown secret is indistinguishable from no secret.
 *
 * Those were previously a manual curl checklist in HANDOFF_TRACKER_SYNC.md §3.
 * A credential that will sit in another app's env for years deserves a standing
 * check rather than one person's afternoon.
 *
 * Fixtures: two throwaway orgs, so "my PRIVATE row" and "their PRIVATE row" are
 * genuinely different rows rather than the same row read twice. Runs against the
 * dedicated test project (tests/setup.ts refuses prod).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { MAX_IDS } from "@/lib/sync/byIdsRequest";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const MINE_ORG = `ByIds Mine ${RUN_ID}`;
const THEIRS_ORG = `ByIds Theirs ${RUN_ID}`;
const USER_EMAIL = `by-ids-${RUN_ID}@test.local`;
const IMAGE_PATH = `by-ids-test/${RUN_ID}.png`;

/** An id that is a well-formed uuid and belongs to no row anywhere. */
const GHOST_ID = "00000000-0000-4000-8000-000000000000";

function makeReq(ids: string[], secret: string | null): NextRequest {
  const url = `http://localhost:3000/api/questions/by-ids?ids=${ids.join(",")}`;
  return new NextRequest(url, {
    method: "GET",
    headers: secret ? { authorization: `Bearer ${secret}` } : {},
  });
}

async function call(ids: string[], secret: string | null) {
  const { GET } = await import("@/app/api/questions/by-ids/route");
  const res = await GET(makeReq(ids, secret));
  return { status: res.status, body: await res.json() };
}

describe.skipIf(!HAS_ENV)("/api/questions/by-ids", () => {
  let admin: SupabaseClient;
  let mineOrgId: string;
  let theirsOrgId: string;
  let userId: string;
  let secret: string;
  let publicId: string;
  let minePrivateId: string;
  let theirsPrivateId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    const { data: u, error: uErr } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: `by-ids-${RUN_ID}-pw`,
      email_confirm: true,
    });
    if (uErr || !u?.user) throw new Error(`user create: ${uErr?.message}`);
    userId = u.user.id;

    const { data: orgs, error: orgErr } = await admin
      .from("organizations")
      .insert([{ name: MINE_ORG }, { name: THEIRS_ORG }])
      .select("id, name");
    if (orgErr || !orgs) throw new Error(`org insert: ${orgErr?.message}`);
    mineOrgId = orgs.find((o) => o.name === MINE_ORG)!.id;
    theirsOrgId = orgs.find((o) => o.name === THEIRS_ORG)!.id;

    secret = `byids-${RUN_ID}-${randomUUID().replace(/-/g, "")}`;
    const { error: targetErr } = await admin.from("tracker_sync_targets").insert({
      org_id: mineOrgId,
      tracker_url: "https://example.invalid",
      shared_secret: secret,
    });
    if (targetErr) throw new Error(`tracker target insert: ${targetErr.message}`);

    // Borrow live taxonomy — the payload builder reads subject/chapter names.
    const { data: ex } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: sb } = await admin
      .from("subjects")
      .select("id")
      .eq("exam_id", ex!.id)
      .order("name")
      .limit(1)
      .single();
    const { data: ch } = await admin
      .from("chapters")
      .select("id")
      .eq("subject_id", sb!.id)
      .order("name")
      .limit(1)
      .single();

    const base = {
      exam_id: ex!.id,
      subject_id: sb!.id,
      chapter_id: ch!.id,
      difficulty: "EASY" as const,
      created_by: userId,
    };

    const { data: qs, error: qErr } = await admin
      .from("questions")
      .insert([
        {
          ...base,
          org_id: theirsOrgId,
          text: `by-ids public ${RUN_ID}`,
          content_hash: `by-ids-public-${RUN_ID}`,
          visibility: "PUBLIC",
          image_url: IMAGE_PATH,
        },
        {
          ...base,
          org_id: mineOrgId,
          text: `by-ids mine private ${RUN_ID}`,
          content_hash: `by-ids-mine-${RUN_ID}`,
          visibility: "PRIVATE",
        },
        {
          ...base,
          org_id: theirsOrgId,
          text: `by-ids theirs private ${RUN_ID}`,
          content_hash: `by-ids-theirs-${RUN_ID}`,
          visibility: "PRIVATE",
        },
      ])
      .select("id, content_hash");
    if (qErr || !qs) throw new Error(`question insert: ${qErr?.message}`);
    publicId = qs.find((q) => q.content_hash === `by-ids-public-${RUN_ID}`)!.id;
    minePrivateId = qs.find((q) => q.content_hash === `by-ids-mine-${RUN_ID}`)!.id;
    theirsPrivateId = qs.find((q) => q.content_hash === `by-ids-theirs-${RUN_ID}`)!.id;

    await admin.from("options").insert(
      (["A", "B", "C", "D"] as const).map((label) => ({
        question_id: publicId,
        label,
        text: `opt ${label}`,
        is_correct: label === "C",
      }))
    );
  });

  afterAll(async () => {
    for (const id of [publicId, minePrivateId, theirsPrivateId]) {
      if (id) await admin.from("questions").delete().eq("id", id);
    }
    // tracker_sync_targets cascades from the org.
    for (const id of [mineOrgId, theirsOrgId]) {
      if (id) await admin.from("organizations").delete().eq("id", id);
    }
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("resolves the presenting org's OWN PRIVATE question — the whole reason this route is authenticated", async () => {
    const { status, body } = await call([minePrivateId], secret);
    expect(status).toBe(200);
    expect(body.questions).toHaveLength(1);
    expect(body.questions[0].questionId).toBe(minePrivateId);
    expect(body.missing).toEqual([]);
  });

  it("resolves a PUBLIC question regardless of which org owns it", async () => {
    const { status, body } = await call([publicId], secret);
    expect(status).toBe(200);
    expect(body.questions.map((q: { questionId: string }) => q.questionId)).toEqual([publicId]);
  });

  it("REFUSES another org's PRIVATE question, reporting it as missing rather than leaking it", async () => {
    const { status, body } = await call([theirsPrivateId], secret);
    expect(status).toBe(200);
    expect(body.questions).toEqual([]);
    expect(body.missing).toEqual([theirsPrivateId]);
  });

  it("scopes a MIXED request — mine + public through, theirs withheld", async () => {
    const { status, body } = await call([publicId, minePrivateId, theirsPrivateId], secret);
    expect(status).toBe(200);
    const got = (body.questions as { questionId: string }[]).map((q) => q.questionId).sort();
    expect(got).toEqual([publicId, minePrivateId].sort());
    expect(body.missing).toEqual([theirsPrivateId]);
  });

  it("reports an unknown id in missing[] instead of silently dropping it", async () => {
    const { status, body } = await call([publicId, GHOST_ID], secret);
    expect(status).toBe(200);
    expect(body.missing).toEqual([GHOST_ID]);
  });

  it("returns an ABSOLUTE storage url for imageUrl, never the bare path", async () => {
    const { body } = await call([publicId], secret);
    const img: string = body.questions[0].imageUrl;
    expect(img).toBe(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, "")}/storage/v1/object/public/question-images/${IMAGE_PATH}`
    );
    expect(img.startsWith("https://")).toBe(true);
  });

  it("401s on a wrong secret, indistinguishably from no secret at all", async () => {
    const wrong = await call([publicId], `${secret}-nope`);
    const none = await call([publicId], null);
    expect(wrong.status).toBe(401);
    expect(none.status).toBe(401);
    // Same body: an unknown key must not be distinguishable from a missing one.
    expect(wrong.body).toEqual(none.body);
  });

  it("400s an over-cap request rather than truncating it", async () => {
    const many = Array.from(
      { length: MAX_IDS + 1 },
      (_, i) => `${String(i).padStart(8, "0")}-1111-4111-8111-111111111111`
    );
    const { status, body } = await call(many, secret);
    expect(status).toBe(400);
    expect(body.error).toMatch(/too many|max/i);
  });
});
