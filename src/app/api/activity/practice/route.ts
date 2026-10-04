/**
 * POST /api/activity/practice — record that a signed-in student revealed the
 * answer to one or more bank questions (migration 0105, kind
 * `question_practiced`), on the SURFACE that revealed them.
 *
 * WHY THIS ROUTE EXISTS: /browse and the 317 /questions landing pages are the
 * core of the product — 70k of ~72k question rows — and recorded NOTHING when a
 * student used them. The reveal meter already computed the act client-side and
 * threw it away, so "mocks are the most-used feature" was indistinguishable
 * from "mocks are the only measured feature".
 *
 * A BEACON, NOT A SERVER WRITE ON RENDER. /questions is ISR-cached; doing this
 * work during a page render would mark those routes dynamic and cost the site
 * its prerendering — the exact failure that left this project with zero cached
 * pages for months. The client batches ids and flushes here.
 *
 * SIGNED-IN ONLY — see the 0105 header. An anonymous visitor would need a
 * persistent device identifier for this to mean anything over time, and that is
 * behavioural monitoring of an audience that is largely under 18.
 *
 * SURFACE, in metadata (2026-09-17): the same question row can be revealed on
 * /browse, in the /board reader, or inside a /guide worked example, and those
 * are different products even though they are the same act. Without this the
 * PMF readout could not answer "do the guides contribute to retention?" — the
 * question that exposed the gap. `metadata` is jsonb and `question_practiced`
 * was already an allowed kind, so this needed no migration; get_pmf_snapshot
 * coalesces a missing surface to 'bank', which is true of every row written
 * before today.
 *
 * RIGHT OR WRONG (2026-10-02). A bank reveal that came from TAPPING an option
 * arrives with `picks` ({questionId: "A"–"D"}). The route reads the key and
 * grades it here — never trusting the browser's verdict, for the drill's reason
 * — and the verdict rides on the reveal row, with `answer_wrong` /
 * `answer_correct` written beside it as drill fuel. Graded on the bank, the
 * board reader and the question of the day (`isGradedSurface`; the board and
 * the daily card from 2026-10-04); a pick inside a /guide worked example is
 * recorded as a plain reveal. Pure core and the row rules: lib/questions/bankVerdict.
 *
 * MILESTONES (2026-10-04). When the client sets `celebrate` — only on a flush
 * whose reply it reads, never on a page-hide beacon — and the batch carried a
 * graded pick, the route awards the student's "N answered" milestone if one is
 * newly reached, and returns it as 200 `{ milestone }`. Once per milestone is
 * the table's dedupe key, not this route's memory (lib/celebrate/service).
 *
 * Otherwise responses stay terse (204/400/401): from sendBeacon nothing reads
 * the body.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { logActivityBatch, logActivityBatchOnce } from "@/lib/activity/service";
import { parsePracticeBatch, type BatchPicks } from "@/lib/questions/practiceBatch";
import { awardAnsweredMilestone } from "@/lib/celebrate/service";
import {
  correctlyAnsweredIds,
  gradePicks,
  isGradedSurface,
  practiceEvents,
  type AnswerKey,
  type PickVerdict,
} from "@/lib/questions/bankVerdict";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Generous for a real reader, tight enough to bound a scripted client. */
const LIMIT_PER_HOUR = 120;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  // Anonymous reveals are not recorded, by design — not an error the client
  // should retry, so say so plainly and cheaply.
  if (!user) return new NextResponse(null, { status: 401 });

  // Rate limit BEFORE parsing, so junk bodies still cost the caller their budget.
  const rl = await checkAndIncrement(createSupabaseAdminClient(), `practice:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return new NextResponse(null, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parsePracticeBatch(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Through the user's JWT throughout: PUBLIC questions and options are
  // readable by any signed-in user, user_activity is own-row under RLS, and
  // this is the student's own action.
  const db = createSupabaseServerClient();

  let verdicts = new Map<string, PickVerdict>();
  let priorWrongIds = new Set<string>();
  if (isGradedSurface(parsed.surface) && Object.keys(parsed.picks).length > 0) {
    try {
      verdicts = gradePicks(parsed.picks, await readAnswerKeys(db, parsed.picks));
      priorWrongIds = await readPriorWrongIds(db, user.id, correctlyAnsweredIds(verdicts));
    } catch (e) {
      // A failed grade must not cost the reveal: record it plain, as before.
      console.error("bank verdict grade failed", e);
      verdicts = new Map();
      priorWrongIds = new Set();
    }
  }

  // Every row carries its surface, including the bank's, so a row is
  // self-describing rather than meaningful only by the absence of a field.
  const { reveals, ladder } = practiceEvents({
    ids: parsed.ids,
    surface: parsed.surface,
    verdicts,
    priorWrongIds,
    userId: user.id,
    now: new Date(),
  });

  // Best-effort — both writers never throw. The ladder rows are deduped per
  // question per IST day; a dropped one fails safe (the question stays due).
  await logActivityBatch(db, user.id, reveals);
  await logActivityBatchOnce(db, user.id, ladder);

  // Read AFTER the writes above, so the answer that crossed the line counts.
  if (parsed.celebrate && verdicts.size > 0) {
    const milestone = await awardAnsweredMilestone(db, user.id);
    if (milestone !== null) return NextResponse.json({ milestone }, { status: 200 });
  }

  return new NextResponse(null, { status: 204 });
}

/** The key for each picked question, read at grade time. ≤50 ids (the batch
 *  cap), well under the ~200 an `.in()` filter can carry in a URL. */
async function readAnswerKeys(db: SupabaseClient, picks: BatchPicks): Promise<Map<string, AnswerKey>> {
  const ids = Object.keys(picks);
  const { data, error } = await db
    .from("questions")
    .select("id, question_format, cancelled_note, options(label, is_correct)")
    .eq("visibility", "PUBLIC")
    .in("id", ids);
  if (error) throw new Error(`readAnswerKeys: ${error.message}`);
  const out = new Map<string, AnswerKey>();
  for (const row of (data ?? []) as {
    id: string;
    question_format: string | null;
    cancelled_note: string | null;
    options: { label: string; is_correct: boolean }[] | null;
  }[]) {
    out.set(row.id, {
      format: row.question_format,
      cancelled: row.cancelled_note !== null,
      options: (row.options ?? []).map((o) => ({ label: o.label, isCorrect: o.is_correct })),
    });
  }
  return out;
}

/** Which of these questions the student has missed before (any surface). */
async function readPriorWrongIds(db: SupabaseClient, userId: string, ids: string[]): Promise<Set<string>> {
  if (ids.length === 0) return new Set();
  const { data, error } = await db
    .from("user_activity")
    .select("ref_id")
    .eq("user_id", userId)
    .eq("kind", "answer_wrong")
    .in("ref_id", ids);
  if (error) throw new Error(`readPriorWrongIds: ${error.message}`);
  return new Set(((data ?? []) as { ref_id: string }[]).map((r) => r.ref_id));
}
