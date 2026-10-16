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
 * gave), and only when the conversation is this person's.
 *
 * `links` lists the paths in the reply the widget may make tappable: only
 * pages V was given (lib/chat/replyLinks.ts). `id` is the stored row, for the
 * thumbs buttons; `source` says whether the reply was AI.
 *
 * Signed out (2026-10-16): one question per browser (lib/chat/anonLimit.ts).
 * The first is answered as above and marks the browser (`signInToContinue`);
 * a later one is stored with the sign-in reply and no AI call
 * (`signInRequired`).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
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
import { TYPED_QUESTION_REPLY } from "@/lib/chat/typed";
import { personBucket } from "@/lib/chat/settings";
import { readChatSettings, countAiAnswersToday } from "@/lib/chat/settingsAdmin";
import { loadVContext } from "@/lib/chat/context";
import { askV } from "@/lib/chat/anthropic";
import { allowedReplyLinks } from "@/lib/chat/replyLinks";
import { cleanPagePath, isConversationId, modelHistory } from "@/lib/chat/conversation";
import {
  ANON_ASKED_COOKIE,
  ANON_ASKED_MAX_AGE_SECONDS,
  SIGN_IN_TO_ASK_REPLY,
  anonAskedFromCookieHeader,
  anonMustSignIn,
} from "@/lib/chat/anonLimit";

// One AI answer can take two model calls (a chapter search, then the reply).
export const maxDuration = 30;

const HOUR_MS = 60 * 60 * 1000;

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

    let raw: { message?: unknown; conversationId?: unknown; pagePath?: unknown };
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
    let recorded: {
      text: string;
      source: "ai" | "fallback";
      tokensIn?: number;
      tokensOut?: number;
      links?: string[];
    } = { text: TYPED_QUESTION_REPLY, source: "fallback" };

    if (settings.aiEnabled) {
      const usedToday = await countAiAnswersToday(admin);
      // An unreadable count is treated as the cap reached: the cap is a cost guard.
      if (usedToday !== null && usedToday < settings.aiAnswersPerDay) {
        try {
          const earlier = conversationId ? await readConversation(admin, conversationId) : [];
          const history = conversationBelongsTo(earlier, userId) ? modelHistory(earlier) : [];
          const ctx = await loadVContext(createSupabaseAnonClient(), { page: pagePath, signedIn: userId !== null });
          const result = await askV({ system: ctx.system, message, tools: ctx.tools, history });
          if (result.ok) {
            reply = result.reply;
            links = allowedReplyLinks(reply, ctx.allowedPaths);
            recorded = { text: reply, source: "ai", tokensIn: result.tokensIn, tokensOut: result.tokensOut, links };
          } else {
            console.error("V answer failed:", result.error);
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
    });

    if (userId !== null) {
      return NextResponse.json({ ok: true, reply, links, id, source: recorded.source }, { status: 200 });
    }
    // Signed out: that was their one question. Mark the browser; the window shows the sign-in button.
    const res = NextResponse.json(
      { ok: true, reply, links, id, source: recorded.source, signInToContinue: true },
      { status: 200 }
    );
    res.cookies.set(ANON_ASKED_COOKIE, "1", {
      maxAge: ANON_ASKED_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (err) {
    console.error("chat/typed route error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
