/**
 * "Ask a parent to pay" (migration 0244): reads and writes of
 * public.parent_pay_links. Service-role only: the table has no policies, so a
 * code can never be listed through the API.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { PARENT_LINK_DAYS, isParentCode, makeParentCode, type ParentLink } from "./parentLink";

const DAY_MS = 86_400_000;
/** A link with less than this left is replaced, so a parent never gets one that dies tonight. */
const MIN_LEFT_MS = DAY_MS;
const COLUMNS = "code, user_id, plan_id, student_name, created_at, expires_at";

type Row = {
  code: string;
  user_id: string;
  plan_id: string;
  student_name: string | null;
  created_at: string;
  expires_at: string;
};

function toLink(r: Row): ParentLink {
  return {
    code: r.code,
    userId: r.user_id,
    planId: r.plan_id,
    studentName: r.student_name,
    createdAt: r.created_at,
    expiresAt: r.expires_at,
  };
}

/**
 * The student's live link for this pass, or a new one. Reusing keeps one link
 * per pass in circulation (a student who taps twice sends the same link) and
 * the table small; a new link is made only when the last has under a day left.
 */
export async function findOrCreateParentLink(
  admin: SupabaseClient,
  input: { userId: string; planId: string; studentName: string | null; nowMs: number }
): Promise<ParentLink> {
  const { data: existing, error: readErr } = await admin
    .from("parent_pay_links")
    .select(COLUMNS)
    .eq("user_id", input.userId)
    .eq("plan_id", input.planId)
    .gt("expires_at", new Date(input.nowMs + MIN_LEFT_MS).toISOString())
    .order("expires_at", { ascending: false })
    .limit(1);
  if (readErr) throw new Error(`parent link read: ${readErr.message}`);
  if (existing && existing.length > 0) return toLink(existing[0] as Row);

  const createdAt = new Date(input.nowMs).toISOString();
  const expiresAt = new Date(input.nowMs + PARENT_LINK_DAYS * DAY_MS).toISOString();
  // A clash on ~58 bits is not expected; three tries make it impossible in practice.
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await admin
      .from("parent_pay_links")
      .insert({
        code: makeParentCode(),
        user_id: input.userId,
        plan_id: input.planId,
        student_name: input.studentName,
        created_at: createdAt,
        expires_at: expiresAt,
      })
      .select(COLUMNS)
      .single();
    if (!error && data) return toLink(data as Row);
    if (error?.code !== "23505") throw new Error(`parent link insert: ${error?.message ?? "no row"}`);
  }
  throw new Error("parent link insert: code clash three times");
}

/** The link for a code, or null (unknown, or not a well-formed code). */
export async function readParentLink(admin: SupabaseClient, code: string): Promise<ParentLink | null> {
  if (!isParentCode(code)) return null;
  const { data, error } = await admin.from("parent_pay_links").select(COLUMNS).eq("code", code).maybeSingle();
  if (error) throw new Error(`parent link read: ${error.message}`);
  return data ? toLink(data as Row) : null;
}
