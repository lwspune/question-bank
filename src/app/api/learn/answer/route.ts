/**
 * POST /api/learn/answer — grade one answer in a Learn lesson (migration 0190).
 *
 * A signed-in student's answer is RECORDED (learn_record_attempt, through their own JWT, as
 * auth.uid()): mastery, review and routing move. A guest's is CHECKED (learn_check_answer):
 * graded, nothing stored, since lessons are open to everyone but progress is saved only for
 * an account (decision 3, 2026-10-27). Either way the reply carries the right key, the
 * explanation for the mistake and the solution, with math rendered here.
 *
 * Reply shape: { ok: true, data: AnswerResult } | { ok: false, error }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { type GradedAnswer, toAnswerResult } from "@/lib/learn/answer";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

const Body = z.object({ itemId: z.string().uuid(), key: z.enum(["A", "B", "C", "D"]) });

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "Invalid answer.");
  }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return fail(400, "Invalid answer.");
  const { itemId, key } = parsed.data;

  const user = await getSessionUser();
  const client = user ? createSupabaseServerClient() : createSupabaseAnonClient();
  const fn = user ? "learn_record_attempt" : "learn_check_answer";
  const { data, error } = await client.rpc(fn, { p_item: itemId, p_key: key });
  if (error) {
    console.error(`learn answer: ${fn} failed`, error.message);
    return fail(500, user ? "Couldn't save your answer. Please try again." : "Couldn't check your answer. Please try again.");
  }
  return NextResponse.json({ ok: true, data: toAnswerResult(data as GradedAnswer, user !== null) }, { headers: NO_STORE });
}
