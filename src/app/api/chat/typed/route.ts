/**
 * POST /api/chat/typed: a question a student TYPED to V (migrations 0145,
 * 0158, 0159).
 *
 * The question is stored with email addresses and phone numbers masked, and
 * the same masked text is all the model ever sees. When /dashboard/chat has
 * the AI switched on and the site's AI answers for the day are not used up,
 * Claude Haiku answers from the site's own facts and chapter pages
 * (lib/chat/context.ts); otherwise, or if that call fails, V gives the owner's
 * fixed reply. Each row records V's reply and, for AI, its token use.
 *
 * Conversations (0159): the body may carry the conversation id the chat window
 * keeps and the page it is on. V remembers the last exchanges of that
 * conversation, read from the TABLE (so a device cannot plant a reply V never
 * gave), and only when the conversation is this person's. Since 2026-10-21
 * (migration 0174) only the current session (an hour with no messages ends
 * one), each message marked with the question it was about, and `replyTo`
 * names an earlier message of that session the student is replying to.
 *
 * `links` lists the paths in the reply the widget may make tappable: only
 * pages V was given (lib/chat/replyLinks.ts). `id` is the stored row, for the
 * thumbs buttons; `source` says whether the reply was AI.
 *
 * Signed out (2026-10-16): one question per browser (lib/chat/anonLimit.ts).
 * The first is answered as above and marks the browser (`signInToContinue`);
 * a later one is stored with the sign-in reply and no AI call
 * (`signInRequired`). Since 2026-10-18 an AI reply that only asks back (no
 * links) leaves the question unused, up to ANON_FREE_REPLIES_MAX times.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getOwnPracticeCounts } from "@/lib/activity/practiceCounts";
import { profileFieldsFromRow } from "@/lib/header-session";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { getSessionUser } from "@/lib/auth";
import {
  recordChatInteraction,
  readConversation,
  conversationBelongsTo,
} from "@/lib/chat/interactionsAdmin";
import { validateChatMessage } from "@/lib/chat/validate";
import { maskPersonal } from "@/lib/chat/maskPersonal";
import { abuseReply, isAbusive } from "@/lib/chat/abuse";
import { TYPED_QUESTION_REPLY } from "@/lib/chat/typed";
import { personBucket } from "@/lib/chat/settings";
import { readChatSettings, countAiAnswersToday } from "@/lib/chat/settingsAdmin";
import { answerWithV, type VContextOptions } from "@/lib/chat/answer";
import {
  cleanPagePath,
  currentSession,
  findReplyTarget,
  isConversationId,
  modelHistory,
  replyContext,
} from "@/lib/chat/conversation";
import { createProgressMemo } from "@/lib/chat/progress";
import { getOwnPerformance } from "@/lib/performance/service";
import { buildPerformance } from "@/lib/performance/compute";
import {
  ANON_ASKED_COOKIE,
  ANON_ASKED_MAX_AGE_SECONDS,
  ANON_FREE_COOKIE,
  SIGN_IN_TO_ASK_REPLY,
  anonAskedFromCookieHeader,
  anonFreeRepliesFromCookieHeader,
  anonMustSignIn,
  anonReplyUsesQuestion,
} from "@/lib/chat/anonLimit";
import type { ToolCallLog } from "@/lib/chat/anthropic";
import { parseAskedQuestion } from "@/lib/chat/questionTools";
import { notesPageOf, notesRefKey, parseNotesItemRef } from "@/lib/chat/notesItem";
import { isExplanation } from "@/lib/chat/understood";
import { loadNotesItemBrief } from "@/lib/chat/notesItemServer";
import { buildMyQuestionDeps } from "@/lib/chat/myQuestionsServer";
import type { QuestionToolDeps } from "@/lib/chat/questionToolSet";
import { loadSimilarId, loadVQuestion, searchVQuestions } from "@/lib/chat/questionToolsServer";
import { conceptSources } from "@/lib/chat/conceptSearchServer";
import { revealedToday, spendVReveal } from "@/lib/chat/questionReveal";
import { weakFromPerformance, type PlanDeps } from "@/lib/chat/weekPlan";
import { loadCurrentPlan, loadPlanActivity, saveStudyPlan } from "@/lib/chat/weekPlanServer";
import { getOwnProfile, updateOwnProfile } from "@/lib/profile/service";
import { getOwnLadder } from "@/lib/drill/service";
import type { Performance } from "@/lib/performance/compute";

// One AI answer can take two model calls (a chapter search, then the reply).
export const maxDuration = 30;

const HOUR_MS = 60 * 60 * 1000;

// A few minutes' memory of each student's results for V's my_progress tool,
// so a follow-up does not repeat the heaviest per-student read (lib/chat/progress.ts).
const progressMemo = createProgressMemo(200);

function ownProgress(userId: string): Promise<Performance | null> {
  return progressMemo.get(userId, async () => {
    const payload = await getOwnPerformance();
    return payload ? buildPerformance(payload, new Date()) : null;
  });
}

/**
 * The data sources of V's question tools (lib/chat/questionToolsServer.ts).
 * Questions through the anon client, so only PUBLIC ones; the free-answer
 * check and its record through the student's own login. Signed out: no
 * explanation (the tool says so), and no exclusion of the day's questions.
 */
function buildQuestionToolDeps(
  userId: string | null,
  out: { onSimilar: (id: string) => void; onMatch: (id: string) => void }
): QuestionToolDeps {
  const anon = createSupabaseAnonClient();
  return {
    loadQuestion: (id) => loadVQuestion(anon, id),
    spendReveal: userId ? (id) => spendVReveal(createSupabaseServerClient(), userId, id) : null,
    loadSimilar: async (q) =>
      loadSimilarId(anon, q, userId ? await revealedToday(createSupabaseServerClient(), userId, new Date()) : []),
    searchQuestions: (text, chapterId) => searchVQuestions(anon, text, chapterId),
    onSimilar: out.onSimilar,
    onMatch: out.onMatch,
    onExplained: () => {},
  };
}

/**
 * The data sources of V's week plan (lib/chat/weekPlan.ts), all through the
 * student's own login: study_plans, student_profiles and user_activity are
 * own-row under RLS. Weak chapters come from the same remembered results as
 * my_progress, so planning after "how am I doing?" reads them once.
 */
function buildPlanDeps(
  userId: string,
  loadProgress: () => Promise<Performance | null>,
  onPlan: () => void
): Omit<PlanDeps, "signedIn" | "loadChapters" | "loadStrategy"> {
  const db = createSupabaseServerClient();
  return {
    now: () => new Date(),
    loadProfile: async () => {
      const p = await getOwnProfile(db, userId);
      return { targetExams: p.targetExams, examDate: p.examDate, weeklyGoal: p.weeklyGoal };
    },
    saveExamDate: (date) => updateOwnProfile(db, userId, { examDate: date }),
    loadWeak: async (examName) => {
      const perf = await loadProgress();
      return perf ? weakFromPerformance(perf, examName) : [];
    },
    loadDue: async () => (await getOwnLadder(db, userId)).due.length,
    savePlan: (plan) => saveStudyPlan(db, userId, plan),
    loadPlan: () => loadCurrentPlan(db, userId),
    loadPlanActivity: (plan) => loadPlanActivity(db, userId, plan),
    onPlan,
  };
}

/** The student's exams, read with their own login (RLS own row, migration 0045). A failed read is no exams. */
async function readProfileExams(userId: string): Promise<string[]> {
  const { data, error } = await createSupabaseServerClient()
    .from("student_profiles")
    .select("stage, target_exams")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) console.error("V: profile read failed", error.message);
  return profileFieldsFromRow(data).targetExams;
}

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();
    const settings = await readChatSettings(admin);

    // Outside a request scope (route tests) the session read throws: treat as signed out.
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }

    const rl = await checkAndIncrement(admin, personBucket({ userId, ip: getClientIp(request) }), {
      limit: settings.perPersonPerHour,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many questions. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: { message?: unknown; conversationId?: unknown; pagePath?: unknown; question?: unknown; replyTo?: unknown };
    try {
      raw = (await request.json()) as typeof raw;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateChatMessage({ message: typeof raw.message === "string" ? raw.message : "" });
    if (!v.ok) {
      return NextResponse.json({ error: v.message }, { status: 400 });
    }
    const message = maskPersonal(v.value);
    // A bad id or page is dropped, not refused: the question still deserves an answer.
    const conversationId = isConversationId(raw.conversationId) ? raw.conversationId : null;
    const pagePath = cleanPagePath(raw.pagePath);
    // "Ask V about this question" (0168): the question the student tapped Ask V on, while it is switched on.
    const asked = settings.explainEnabled ? parseAskedQuestion(raw.question) : null;
    // Ask V on a practice question written into the notes (2026-10-20): read from the notes, by page and position.
    const askedNotes = settings.explainEnabled ? parseNotesItemRef((raw.question as { notes?: unknown } | null)?.notes) : null;

    // Read from the TABLE, never the device, and only when the conversation is this person's.
    const earlier = conversationId ? await readConversation(admin, conversationId) : [];
    const ownConversation = conversationBelongsTo(earlier, userId);
    // V remembers only the current session (owner, 2026-10-21): an hour with no messages ends one.
    const session = ownConversation ? currentSession(earlier, Date.now()) : [];
    // "Reply" on an earlier message (0174): honoured only for one in this session, so a stale or foreign id is dropped.
    const replyTarget = findReplyTarget(session, isConversationId(raw.replyTo) ? raw.replyTo : null);

    // Abuse (owner, 2026-10-20): one calm line, then no reply at all. No AI call, and a
    // signed-out visitor's question is not used up. Kept, so the dashboard shows it.
    if (isAbusive(message)) {
      const calm = abuseReply(ownConversation ? earlier.map((r) => r.reply) : []);
      const id = await recordChatInteraction(admin, {
        eventType: "typed_question",
        message,
        userId,
        ...(calm ? { reply: { text: calm, source: "fallback" as const } } : {}),
        conversationId,
        pagePath,
      });
      return NextResponse.json(
        calm
          ? { ok: true, reply: calm, links: [], id, source: "fallback" }
          : { ok: true, reply: null, links: [], id, source: "fallback", silent: true },
        { status: 200 }
      );
    }

    // A signed-out visitor's second question: kept (it shows what visitors want), answered with sign-in.
    const askedBefore = anonAskedFromCookieHeader(request.headers.get("cookie"));
    if (anonMustSignIn({ userId, askedBefore })) {
      const id = await recordChatInteraction(admin, {
        eventType: "typed_question",
        message,
        userId,
        reply: { text: SIGN_IN_TO_ASK_REPLY, source: "fallback" },
        conversationId,
        pagePath,
      });
      return NextResponse.json(
        { ok: true, reply: SIGN_IN_TO_ASK_REPLY, links: [], id, source: "fallback", signInRequired: true },
        { status: 200 }
      );
    }

    let reply = TYPED_QUESTION_REPLY;
    let links: string[] = [];
    // Set by V's question tools during the answer, for the chat window: a question to try, a pasted one to confirm.
    let similarQuestionId: string | null = null;
    let matchQuestionId: string | null = null;
    // Set when plan_week or my_plan ran: the chat window shows the plan under the reply.
    let planShown = false;
    let recorded: {
      text: string;
      source: "ai" | "ai_failed" | "fallback";
      tokensIn?: number;
      tokensOut?: number;
      cacheReadTokens?: number;
      cacheWriteTokens?: number;
      cacheWrite1hTokens?: number;
      links?: string[];
      toolCalls?: ToolCallLog[];
    } = { text: TYPED_QUESTION_REPLY, source: "fallback" };

    if (settings.aiEnabled) {
      const usedToday = await countAiAnswersToday(admin);
      // An unreadable count is treated as the cap reached: the cap is a cost guard.
      if (usedToday !== null && usedToday < settings.aiAnswersPerDay) {
        try {
          const history = modelHistory(session);
          const ownId = userId;
          const notesBrief = askedNotes ? await loadNotesItemBrief(pagePath, askedNotes) : null;
          const context: VContextOptions = {
            page: pagePath,
            signedIn: ownId !== null,
            profileExamSlugs: ownId ? await readProfileExams(ownId) : [],
            question: asked,
            notesBrief,
            myQuestions: ownId ? buildMyQuestionDeps(createSupabaseServerClient(), createSupabaseAnonClient(), ownId) : null,
            questionTools: settings.explainEnabled
              ? buildQuestionToolDeps(ownId, {
                  onSimilar: (id) => (similarQuestionId = id),
                  onMatch: (id) => (matchQuestionId = id),
                })
              : null,
            // Concepts read PUBLIC model answers with the anon client, and the notes (V_SPEC.md step 2).
            concepts: settings.explainEnabled ? conceptSources(createSupabaseAnonClient()) : null,
            // The student's own login does the reading (get_own_performance): no id is passed to the database.
            loadOwnProgress: ownId ? () => ownProgress(ownId) : undefined,
            planEnabled: settings.planEnabled,
            plan: ownId && settings.planEnabled ? buildPlanDeps(ownId, () => ownProgress(ownId), () => (planShown = true)) : null,
            // Same login, not remembered: "today" should move between two questions.
            loadOwnPractice: ownId ? () => getOwnPracticeCounts(createSupabaseServerClient()) : undefined,
          };
          const result = await answerWithV({
            anon: createSupabaseAnonClient(),
            context,
            // The message is stored as typed; V alone is told what it replies to.
            message,
            replyTo: replyTarget ? replyContext(replyTarget) : null,
            history,
          });
          if (result.ok) {
            reply = result.reply;
            links = result.links;
            recorded = {
              text: reply,
              source: "ai",
              tokensIn: result.tokensIn,
              tokensOut: result.tokensOut,
              cacheReadTokens: result.cacheReadTokens,
              cacheWriteTokens: result.cacheWriteTokens,
              cacheWrite1hTokens: result.cacheWrite1hTokens,
              links,
              toolCalls: result.toolCalls,
            };
          } else {
            console.error("V answer failed:", result.error);
            // Failed part-way: earlier rounds were billed, so keep what they cost (migration 0162).
            const spent = result.tokensIn + result.tokensOut + result.cacheReadTokens + result.cacheWriteTokens;
            if (spent > 0) {
              recorded = {
                text: TYPED_QUESTION_REPLY,
                source: "ai_failed",
                tokensIn: result.tokensIn,
                tokensOut: result.tokensOut,
                cacheReadTokens: result.cacheReadTokens,
                cacheWriteTokens: result.cacheWriteTokens,
                cacheWrite1hTokens: result.cacheWrite1hTokens,
                toolCalls: result.toolCalls,
              };
            }
          }
        } catch (err) {
          // The fixed reply still goes out and the question is still recorded.
          console.error("V answer failed:", err);
        }
      }
    }

    const id = await recordChatInteraction(admin, {
      eventType: "typed_question",
      message,
      userId,
      reply: recorded,
      conversationId,
      pagePath,
      askedQuestionId: asked?.id ?? null,
      // A notes question has no id: its key on its own page (0181), so V's memory can label the tap.
      askedNotesItem: !asked && askedNotes && notesPageOf(pagePath) ? notesRefKey(askedNotes) : null,
      replyToId: replyTarget?.id ?? null,
    });

    // Only on an AI answer: a fallback reply never ran the tools.
    const questionFields =
      recorded.source === "ai"
        ? {
            ...(similarQuestionId ? { similarQuestionId } : {}),
            ...(matchQuestionId ? { matchQuestionId } : {}),
            ...(planShown ? { planShown: true } : {}),
            // An explanation asks "Did you understand?" under it (0182).
            explained: isExplanation(recorded.toolCalls, message),
          }
        : {};
    if (userId !== null) {
      return NextResponse.json(
        { ok: true, reply, links, id, source: recorded.source === "ai" ? "ai" : "fallback", ...questionFields },
        { status: 200 }
      );
    }
    const source = recorded.source === "ai" ? "ai" : "fallback";
    const cookieOpts = {
      maxAge: ANON_ASKED_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };
    // Signed out, and V only asked back: the question is still theirs. Count the free reply.
    const freeSoFar = anonFreeRepliesFromCookieHeader(request.headers.get("cookie"));
    if (!anonReplyUsesQuestion({ source: recorded.source, reply, links, freeSoFar })) {
      const res = NextResponse.json({ ok: true, reply, links, id, source, ...questionFields }, { status: 200 });
      res.cookies.set(ANON_FREE_COOKIE, String(freeSoFar + 1), cookieOpts);
      return res;
    }
    // Signed out: that was their one question. Mark the browser; the window shows the sign-in button.
    const res = NextResponse.json(
      { ok: true, reply, links, id, source, signInToContinue: true, ...questionFields },
      { status: 200 }
    );
    res.cookies.set(ANON_ASKED_COOKIE, "1", cookieOpts);
    return res;
  } catch (err) {
    console.error("chat/typed route error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
