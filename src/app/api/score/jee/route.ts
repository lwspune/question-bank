/**
 * POST /api/score/jee  { url }  ->  the student's JEE Main score.
 *
 * Fetches the pasted response-sheet link (NTA's host only: lib/scoreCalc/
 * jeeServer.ts), reads it, finds the shift whose key holds its questions and
 * marks it. Keeps the marks only (score_checks, migration 0266), never the
 * sheet, with the student's id when signed in so they can find it again.
 *
 * Open to visitors without an account (the score is the free reward; signing in
 * is only for saving), so it is rate-limited per IP: every call makes one
 * outbound request to NTA.
 *
 * Replies: 200 { ok: true, sitting, score } · 4xx { ok: false, error } with a
 * message written for the student.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { getClientIp } from "@/lib/http";
import { checkAndIncrement } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { JEE_MAINS_PAPER } from "@/lib/mocks/blueprints";
import { checkSheetUrl, fetchSheetHtml, htmlToSheetText, matchKeyRow, sheetHash } from "@/lib/scoreCalc/jeeServer";
import { getJeeKeyRows } from "@/lib/scoreCalc/jeeKeys";
import { parseNtaResponseText, scoreNtaSheet } from "@/lib/scoreCalc/ntaSheet";

const Body = z.object({ url: z.string().min(10).max(2000) });
const LIMIT_PER_HOUR = 20;
const HOUR_MS = 60 * 60 * 1000;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "Something went wrong sending the link. Try again.");
  }
  const body = Body.safeParse(raw);
  if (!body.success) return fail(400, "Paste the full link to your response sheet.");

  const link = checkSheetUrl(body.data.url);
  if (!link.ok) return fail(400, link.error);

  const admin = createSupabaseAdminClient();
  const rl = await checkAndIncrement(admin, `score-jee:ip:${getClientIp(request)}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return fail(429, `Too many checks from this connection. Try again in ${Math.ceil(rl.retryAfter / 60)} minutes.`);

  const page = await fetchSheetHtml(link.url);
  if (!page.ok) {
    console.error(`[score/jee] sheet fetch failed: ${page.error}`);
    return fail(422, page.error);
  }

  const responses = parseNtaResponseText(htmlToSheetText(page.html));
  if (responses.length === 0) {
    return fail(422, "We opened the link but found no questions on it. Is it your response sheet (the page with Question ID and Chosen Option)?");
  }

  let rows;
  try {
    rows = await getJeeKeyRows();
  } catch (e) {
    console.error("[score/jee] key read failed", e);
    return fail(503, "We could not load the answer key just now. Try again in a minute.");
  }
  const match = matchKeyRow(responses, rows);
  if (!match) {
    return fail(422, "NTA's answer key for your shift is not loaded yet. We add it the day NTA publishes it.");
  }

  const key = new Map(Object.entries(match.row.key));
  const result = scoreNtaSheet(responses, key, JEE_MAINS_PAPER, match.row.drop_policy);
  if (!result.ok) return fail(422, result.error);

  let userId: string | null = null;
  try {
    userId = (await getSessionUser())?.id ?? null;
  } catch {
    userId = null;
  }
  const { error: saveError } = await admin.from("score_checks").upsert(
    {
      calculator: "jee-main",
      sitting: match.row.sitting,
      total: result.score.total,
      max_marks: result.score.max,
      sections: result.score.sections.map((s) => ({ key: s.key, marks: s.marks, right: s.right, wrong: s.wrong, blank: s.blank })),
      sheet_hash: sheetHash(responses),
      user_id: userId,
    },
    { onConflict: "calculator,sitting,sheet_hash", ignoreDuplicates: true },
  );
  if (saveError) console.error(`[score/jee] score_checks write failed: ${saveError.message}`);
  // Checked once signed out, then again signed in: the sheet's row exists
  // without an owner, so give it this account (never take one from another).
  if (!saveError && userId) {
    const { error: claimError } = await admin
      .from("score_checks")
      .update({ user_id: userId })
      .eq("calculator", "jee-main")
      .eq("sitting", match.row.sitting)
      .eq("sheet_hash", sheetHash(responses))
      .is("user_id", null);
    if (claimError) console.error(`[score/jee] score_checks claim failed: ${claimError.message}`);
  }

  const [date, shift] = match.row.sitting.split("-s");
  return NextResponse.json({
    ok: true,
    sitting: { date, shift: Number(shift), region: match.row.region, keyStatus: match.row.status },
    score: result.score,
    saved: !saveError && userId !== null,
  });
}
