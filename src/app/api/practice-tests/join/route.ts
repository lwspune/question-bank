/**
 * POST /api/practice-tests/join: a friend opens a practice test someone sent
 * them (migration 0163). Body { code }.
 *
 * The student's own test opens as it is; a friend who already has a copy gets
 * that copy back; anyone else gets a new copy of the ROOT test, written with
 * the service role (students have no write on mock_tests). It does NOT start
 * the test: the page then calls the ordinary start route, as V's builder does,
 * and the database lets a friend's copy through the free limit.
 *
 * Answers { ok: true, slug } or { ok: false, error, signIn? }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { randomBytes, randomUUID } from "node:crypto";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import {
  SHARED_TEST_COLUMNS,
  friendCopyRow,
  isPracticeCode,
  joinPlan,
  type SharedPracticeTest,
} from "@/lib/practiceTests/friend";

const DAY_MS = 24 * 60 * 60 * 1000;
/** Sent tests one student may open in a day, so taps cannot fill the table. */
const JOIN_LIMIT = 20;

const refuse = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { code?: unknown } | null;
  const code = body?.code;
  if (!isPracticeCode(code)) return refuse(400, "That link isn't a practice test.");

  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return refuse(401, "Sign in to take this test. It's free.", { signIn: true });

  try {
    const admin = createSupabaseAdminClient();
    const { data: src, error: readErr } = await admin
      .from("mock_tests")
      .select(SHARED_TEST_COLUMNS)
      .eq("slug", code)
      .eq("status", "personal")
      .maybeSingle<SharedPracticeTest>();
    if (readErr) throw new Error(readErr.message);
    if (!src) return refuse(404, "This test isn't there any more. Ask your friend to send it again.");

    const findCopy = async (rootId: string) => {
      const { data, error } = await admin
        .from("mock_tests")
        .select("slug")
        .eq("owner_id", user.id)
        .or(`id.eq.${rootId},shared_from.eq.${rootId}`)
        .limit(1)
        .maybeSingle<{ slug: string }>();
      if (error) throw new Error(error.message);
      return data?.slug ?? null;
    };

    const rootId = src.shared_from ?? src.id;
    const plan = joinPlan(src, user.id, src.owner_id === user.id ? null : await findCopy(rootId));
    if (plan.kind === "open") return NextResponse.json({ ok: true, slug: plan.slug });

    const rl = await checkAndIncrement(admin, `practice-join:${user.id}`, { limit: JOIN_LIMIT, windowMs: DAY_MS });
    if (!rl.ok) return refuse(429, `You've opened ${JOIN_LIMIT} sent tests today. Try again tomorrow.`);

    // Copy the ROOT, so every copy matches the original even if this link came
    // from a friend's copy. shared_from is ON DELETE SET NULL, so a set value
    // names a live test.
    let root = src;
    if (src.shared_from) {
      const { data, error } = await admin
        .from("mock_tests")
        .select(SHARED_TEST_COLUMNS)
        .eq("id", src.shared_from)
        .maybeSingle<SharedPracticeTest>();
      if (error) throw new Error(error.message);
      if (data) root = data;
    }

    const slug = `practice-${randomBytes(6).toString("hex")}`;
    const row = friendCopyRow(root, { id: randomUUID(), slug, ownerId: user.id, now: new Date() });
    const { error: insertErr } = await admin.from("mock_tests").insert(row);
    if (insertErr) {
      // 23505: a second tap or tab made the copy first. Open that one.
      if (insertErr.code === "23505") {
        const existing = await findCopy(row.shared_from);
        if (existing) return NextResponse.json({ ok: true, slug: existing });
      }
      throw new Error(insertErr.message);
    }
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    console.error("practice-tests/join: failed", err);
    return refuse(500, "Couldn't open this test. Please try again.");
  }
}
