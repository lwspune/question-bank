import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";
import { buildQuestionPayload } from "@/lib/sync/questionPayload";
import { parseIdsParam } from "@/lib/sync/byIdsRequest";

export const dynamic = "force-dynamic";

/**
 * GET /api/questions/by-ids?ids=<uuid>,<uuid>,…
 * Authorization: Bearer <the institute's tracker sync secret>
 *
 * → 200 { questions: QuestionPayload[], missing: string[] }
 *
 * Lets an nda-tracker deployment pull the full content of the bank questions an
 * exam was built from — above all the DIAGRAMS, which the text-only Tags sheet
 * drops entirely.
 *
 * AUTHENTICATED AND ORG-SCOPED, which is not what the first draft of the spec
 * said. Reading anonymously would see only PUBLIC rows (that is what RLS gives
 * the anon role), and much of the bank is PRIVATE — so an anonymous endpoint
 * would return NOTHING for exactly the papers that matter, with no error, and
 * could not serve a second institute at all. The secret identifies the
 * institute; the tracker therefore calls this server-side, never from a browser
 * where a key would not be a key.
 *
 * `missing` is part of the contract, not a courtesy. A stem repair in the bank
 * is a delete-and-re-commit (content_hash covers the stem), which mints a NEW
 * uuid — so a tracker exam can hold a dead id through nobody's error. Silently
 * returning fewer questions would hide a repaired question instead of reporting
 * one.
 *
 * `missing` carries TWO causes on purpose, and a reader chasing one must know
 * about the other: an id is missing when it names no row at all (the repair
 * case above), AND when it names another institute's PRIVATE row. They are
 * deliberately indistinguishable, for the same reason an unknown secret returns
 * the same 401 as no secret — a caller must not be able to probe this bank for
 * the existence of content it may not read. Inert while one org owns the bank;
 * live the day a second institute is provisioned.
 */
export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error("NEXT_PUBLIC_SUPABASE_URL is not configured");
    return NextResponse.json({ error: "server is not configured" }, { status: 500 });
  }

  const auth = request.headers.get("authorization");
  const secret = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const parsed = parseIdsParam(url.searchParams.get("ids"));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // The secret resolves to exactly one org (unique index, migration 0094).
  const { data: target, error: targetErr } = await admin
    .from("tracker_sync_targets")
    .select("org_id")
    .eq("shared_secret", secret)
    .maybeSingle();

  if (targetErr) {
    console.error("tracker_sync_targets lookup failed", targetErr);
    return NextResponse.json({ error: "lookup failed" }, { status: 500 });
  }
  if (!target) {
    // Same response as a missing header — an unknown key must not be
    // distinguishable from no key at all.
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // PHASE A — which of the requested ids may this institute see? The admin
  // client bypasses RLS, so the scope is applied HERE, explicitly: the org's
  // own rows plus anything PUBLIC. This mirrors the two-phase shape of
  // `queryQuestions`, where phase A owns scoping and phase B only widens the
  // columns for an already-scoped id set.
  const { data: allowedRows, error: scopeErr } = await admin
    .from("questions")
    .select("id")
    .in("id", parsed.ids)
    .or(`visibility.eq.PUBLIC,org_id.eq.${target.org_id}`);

  if (scopeErr) {
    console.error("by-ids scope query failed", scopeErr);
    return NextResponse.json({ error: "query failed" }, { status: 500 });
  }

  const allowedIds = (allowedRows ?? []).map((r) => r.id as string);

  // PHASE B — the wide row shape, for those ids only.
  const rows = await queryQuestionsByIds(admin, allowedIds);

  // Notes slugs, so a hydrated question can build the same slug-precise /go
  // remediation links the Tags sheet gives it.
  const tagMap = await getResourceTagsForQuestions(
    admin,
    rows.map((r) => r.id)
  );

  const questions = rows.map((r) =>
    buildQuestionPayload(r, {
      supabaseUrl,
      tag: tagMap.get(r.id)?.conceptTags?.[0],
    })
  );

  const found = new Set(questions.map((p) => p.questionId));
  const missing = parsed.ids.filter((id) => !found.has(id));

  return NextResponse.json(
    { questions, missing },
    { headers: { "Cache-Control": "no-store" } }
  );
}
