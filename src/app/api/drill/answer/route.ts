/**
 * POST /api/drill/answer — grade ONE answer in a weak-area drill and record it.
 *
 * WHY THE GRADING IS HERE AND NOT IN THE BROWSER. The verdict this returns is
 * written straight into `user_activity`, and that row is what decides whether
 * the student ever sees the question again (select.ts's ladder: one correct
 * puts it to sleep, two retire it). A client-asserted verdict would let a
 * browser retire its own questions, which turns the whole spaced-repetition
 * mechanic into decoration. The key is read at grade time, server-side, from
 * the row being graded.
 *
 * WHY ONE REQUEST PER QUESTION rather than a single submit at the end: the
 * engagement gate names IMMEDIATE FEEDBACK as a principle, and a drill of
 * five questions on a phone is the case it was written for — the student finds
 * out, fixes the idea, and carries it into the next question rather than into a
 * summary screen five minutes later. Five small round trips is the price.
 *
 * The response carries the key and the solution. That is the FIRST time either
 * reaches the client: the drill payload itself ships stem and options only, so
 * the answer cannot be read out of the page before a choice is committed.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { parseDrillAnswer } from "@/lib/drill/parse";
import { recordDrillAnswer } from "@/lib/drill/service";

/** One answer is one request, so the budget is in questions, not drills — 200
 *  an hour is 40 full drills, far past a real session and tight enough to bound
 *  a scripted client. */
const LIMIT_PER_HOUR = 200;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  // The drill is a signed-in surface by construction — it is built from this
  // student's own recorded mistakes, so there is nothing to serve an anon.
  if (!user) return NextResponse.json({ error: "Sign in to drill." }, { status: 401 });

  // Rate limit BEFORE parsing, so junk bodies still cost the caller their budget.
  const rl = await checkAndIncrement(createSupabaseAdminClient(), `drill:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseDrillAnswer(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const outcome = await recordDrillAnswer(parsed.questionId, parsed.label);
  // Null means the question has no key to grade against — flipped PRIVATE since
  // the miss, deleted, or carrying no correct option. Inventing `correct: false`
  // would punish the student for a data defect, so say nothing happened.
  if (!outcome) {
    return NextResponse.json({ error: "That question can't be graded." }, { status: 404 });
  }

  return NextResponse.json(outcome);
}
