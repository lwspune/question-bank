/**
 * POST /api/practice-tests — build one practice test for the signed-in
 * student from V's answers (migration 0156).
 *
 * Checks the request at the boundary (parseBuildRequest), caps builds at
 * BUILD_LIMIT a day per student so taps cannot fill the table, picks the
 * questions on the server from the cached pool, and stores the test with the
 * service role (students have no write on mock_tests). It does NOT start the
 * test: Start uses the ordinary mock start route, where the database's
 * one-free-a-day trigger is the real limit, and Download uses /api/export.
 * The answer carries the free-test state so V can say before the tap whether
 * today's free test is still there.
 *
 * Answers { ok: true, test, start } or { ok: false, error, signIn? }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { randomBytes, randomInt, randomUUID } from "node:crypto";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { getMockQuota } from "@/lib/mocks/service";
import { mockStartState } from "@/lib/mocks/quota";
import { parseBuildRequest, practiceTestRow, practiceTitle } from "@/lib/practiceTests/build";
import { getPracticeExam, getPracticeSubject } from "@/lib/practiceTests/config";
import { getSubjectPool } from "@/lib/practiceTests/poolQuery";
import { pickPracticeQuestions } from "@/lib/practiceTests/pick";
import { readAnsweredQuestionIds } from "@/lib/practiceTests/seen";

export const maxDuration = 30;

const DAY_MS = 24 * 60 * 60 * 1000;
/** Tests one student may build in a day. Starting one is limited separately. */
const BUILD_LIMIT = 20;

const refuse = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return refuse(401, "Sign in to build your test. It's free.", { signIn: true });

  try {
    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, `practice-build:${user.id}`, { limit: BUILD_LIMIT, windowMs: DAY_MS });
    if (!rl.ok) return refuse(429, `You've built ${BUILD_LIMIT} tests today. Try again tomorrow.`);

    const parsed = parseBuildRequest(await request.json().catch(() => null));
    if (!parsed.ok) return refuse(400, parsed.error);
    const req = parsed.value;
    const exam = getPracticeExam(req.exam)!;
    const subject = getPracticeSubject(exam, req.subject)!;

    const found = await getSubjectPool(exam, subject);
    if (!found) return refuse(404, "That subject has no questions yet.");
    const chosen = found.pool.chapters.filter((c) => req.chapterIds.includes(c.id));
    if (chosen.length !== req.chapterIds.length) {
      return refuse(400, "One of those chapters has no questions V can use. Pick again.");
    }
    const pool = chosen.flatMap((c) => c.items);

    const db = createSupabaseServerClient();
    const seen = req.fresh ? await readAnsweredQuestionIds(db) : undefined;
    const picked = pickPracticeQuestions(pool, req.length, {
      difficulty: req.difficulty,
      seed: randomInt(2 ** 31),
      seen,
      numericShare: exam.numericShare,
    });
    if (!picked) {
      return refuse(409, `Those chapters have ${pool.length} questions. Pick a shorter test or more chapters.`);
    }

    const kindOf = new Map(pool.map((q) => [q.id, q.kind]));
    const id = randomUUID();
    const slug = `practice-${randomBytes(6).toString("hex")}`;
    const title = practiceTitle(
      exam.shortName,
      subject.label,
      chosen.map((c) => c.name),
      req.mostAsked
    );
    const row = practiceTestRow({
      id,
      slug,
      ownerId: user.id,
      examId: found.examId,
      exam,
      subject,
      title,
      questions: picked.ids.map((q) => ({ id: q, kind: kindOf.get(q) ?? "pyq" })),
      now: new Date(),
    });
    const { error } = await admin.from("mock_tests").insert(row);
    if (error) {
      console.error("practice-tests: insert failed", error.message);
      return refuse(500, "V couldn't save your test. Please try again.");
    }
    await recordChatInteraction(admin, { eventType: "builder_step", step: "built", userId: user.id });

    const start = mockStartState(await getMockQuota(db), false, "custom");
    return NextResponse.json({
      ok: true,
      test: {
        slug,
        title,
        questions: row.total_questions,
        minutes: row.duration_secs / 60,
        newToYou: picked.newToYou,
      },
      start,
    });
  } catch (err) {
    console.error("practice-tests: build failed", err);
    return refuse(500, "V couldn't build your test. Please try again.");
  }
}
