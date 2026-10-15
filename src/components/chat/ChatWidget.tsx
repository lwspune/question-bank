"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListChecks, RotateCcw, SendHorizontal, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { toast } from "sonner";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { PREDEFINED_QUESTIONS, type ChatFaqId } from "@/lib/chat/faq";
import { CHAT_MESSAGE_MAX } from "@/lib/chat/validate";
import { vPlacement } from "@/lib/chat/placement";
import { launcherHiddenAfterScroll } from "@/lib/chat/launcherScroll";
import { splitReplyLinks } from "@/lib/chat/replyLinks";
import type { HistoryTurn } from "@/lib/chat/conversation";
import {
  LOCAL_CHAT_KEY,
  newConversationId,
  parseStoredChat,
  preferNewer,
  readStoredChat,
  writeStoredChat,
} from "@/lib/chat/localChat";
import { celebrate } from "@/components/celebrate/celebrate";
import { useCart } from "@/lib/cart/CartProvider";
import VSays from "./VSays";
import PracticeBuilder, { PENDING_BUILD_KEY, logBuilderStep } from "./PracticeBuilder";
import type { BuilderAnswers } from "@/lib/practiceTests/builder";

type VAvatar = "idle" | "laugh" | "think" | "talk";

// Plain <img>, deliberately not next/image — this codebase keeps image
// optimization off Vercel's bill on purpose (see the Decisions log); these
// are already pre-sized+optimized static assets in /public/chat.
function VFace({ avatar, className }: { avatar: VAvatar; className?: string }) {
  return (
    <img
      src={`/chat/v-${avatar}.png`}
      alt=""
      aria-hidden
      className={className}
      loading="lazy"
    />
  );
}

/**
 * One message in the window. An assistant turn may carry `links` (the paths
 * the server allows as links, lib/chat/replyLinks) and, for an AI reply, its
 * row `id`, `source` and the student's `feedback`. `transient` turns (errors)
 * are shown but never kept.
 */
type ChatTurn = HistoryTurn & { avatar?: VAvatar; transient?: boolean };

/** What the device keeps of a turn: no face, no errors. */
function keepable(turns: readonly ChatTurn[]): HistoryTurn[] {
  return turns
    .filter((t) => !t.transient)
    .map((t) => {
      const { avatar: _avatar, transient: _transient, ...rest } = t;
      return rest as HistoryTurn;
    });
}

/** V's reply with its allowed paths as links; everything else stays text. */
function ReplyText({ text, links, onNavigate }: { text: string; links?: string[]; onNavigate?: () => void }) {
  if (!links || links.length === 0) return <>{text}</>;
  return (
    <>
      {splitReplyLinks(text, links).map((seg, i) =>
        seg.kind === "text" ? (
          <span key={i}>{seg.text}</span>
        ) : (
          <Link
            key={i}
            href={seg.href}
            onClick={onNavigate}
            className="break-all font-medium text-brand-accent underline underline-offset-2 hover:no-underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {seg.href}
          </Link>
        )
      )}
    </>
  );
}

const GREETING: ChatTurn = {
  role: "assistant",
  avatar: "laugh",
  text: "Hi, I'm V. Pick a question below, or type your own.",
};

/**
 * Floating FAQ-chatbot launcher, visible to anon + authed visitors alike
 * (same audience as ThemeToggle).
 *
 * CONVERSATIONS (2026-10-15, migration 0159): the window keeps one conversation
 * id and its messages on the device (lib/chat/localChat: 30 messages, gone
 * after 7 quiet days) and sends the id and the page with every request, so the
 * server stores whole conversations and V remembers the last exchanges. On the
 * first open, a signed-in student's newer conversation from another device
 * replaces the device's copy. A reply that lands while the window is closed
 * raises a badge on the launcher and V says so in its bubble. AI replies take
 * a thumbs up or down; "Clear chat" starts a new conversation (the old one
 * stays stored).
 *
 * PHASE 2 — predefined questions, plus (2026-10-09) a typing box. Since
 * 2026-10-15 POST /api/chat/typed answers typed questions with AI when
 * /dashboard/chat switches it on (the owner's fixed line otherwise), and a
 * reply's site paths come back as `links` the window renders as links.
 *
 * BUILDER (2026-10-15): "Build a practice test" turns the window into V's
 * step-by-step test builder (PracticeBuilder). The window grows while it is
 * open: full screen on a phone, a larger panel from `sm` up. A signed-out
 * student's answers wait in sessionStorage through sign-in, and V reopens on
 * the builder when they come back.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "builder">("chat");
  const [resume, setResume] = useState<BuilderAnswers | undefined>(undefined);
  // The greeting is drawn before these and never stored.
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState("");
  // Phones only: tuck the launcher away while the student scrolls down a page
  // and bring it back on any scroll up (UX_ACTION_PLAN.md A7). It used to sit
  // over card content on every page. Never while the chat is open.
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    if (open) {
      setTucked(false);
      return;
    }
    const phone = window.matchMedia("(max-width: 639px)");
    let prevY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setTucked((hidden) => (phone.matches ? launcherHiddenAfterScroll({ prevY, y, hidden }) : false));
        prevY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  // Back from sign-in with a test half built: reopen V on the builder.
  useEffect(() => {
    let pending: BuilderAnswers | null = null;
    try {
      const raw = sessionStorage.getItem(PENDING_BUILD_KEY);
      if (raw) {
        sessionStorage.removeItem(PENDING_BUILD_KEY);
        pending = JSON.parse(raw) as BuilderAnswers;
      }
    } catch {
      pending = null;
    }
    if (pending) {
      setResume(pending);
      setMode("builder");
      setOpen(true);
    }
  }, []);

  // This device's conversation, read after mount (storage does not exist on the server).
  const storageReadyRef = useRef(false);
  const lastAtRef = useRef(0);
  useEffect(() => {
    const stored = readStoredChat();
    if (stored) {
      setConversationId(stored.conversationId);
      setTurns(stored.turns);
      setUnread(stored.unread);
      lastAtRef.current = stored.lastAt;
    } else {
      setConversationId(newConversationId());
      lastAtRef.current = Date.now();
    }
    storageReadyRef.current = true;
  }, []);
  useEffect(() => {
    if (!storageReadyRef.current || !conversationId) return;
    writeStoredChat({ v: 1, conversationId, lastAt: lastAtRef.current, unread, turns: keepable(turns) });
  }, [turns, unread, conversationId]);

  // Read by replies that land after an await: was the window open then?
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);

  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openRecordedRef = useRef(false);
  const accountCheckedRef = useRef(false);
  const pathname = usePathname() ?? "/";
  const cart = useCart();
  const placement = vPlacement(pathname, cart);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns]);

  function close() {
    setOpen(false);
    setMode("chat");
    setResume(undefined);
    launcherRef.current?.focus();
  }

  function openBuilder() {
    logBuilderStep("open");
    setResume(undefined);
    setMode("builder");
  }

  const building = mode === "builder";

  function openChat() {
    // Once per mount, so reopening the panel doesn't inflate /dashboard/chat's open count.
    if (!openRecordedRef.current) {
      openRecordedRef.current = true;
      trackFunnelOnce("chat_launcher_click", "session");
      void fetch("/api/chat/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, pagePath: pathname }),
      }).catch(() => {});
    }
    void loadAccountConversation();
    setOpen(true);
  }

  /** Once per page load: a signed-in student's newer conversation from another device. */
  async function loadAccountConversation() {
    if (accountCheckedRef.current) return;
    accountCheckedRef.current = true;
    try {
      const res = await fetch("/api/chat/history");
      const data = (await res.json().catch(() => ({}))) as { conversation?: unknown };
      if (!res.ok || !data.conversation) return;
      const account = parseStoredChat(JSON.stringify({ v: 1, unread: 0, ...(data.conversation as object) }));
      const device =
        conversationId && turns.length > 0
          ? { v: 1 as const, conversationId, lastAt: lastAtRef.current, unread: 0, turns: keepable(turns) }
          : null;
      if (account && preferNewer(device, account) === account) {
        lastAtRef.current = account.lastAt;
        setConversationId(account.conversationId);
        setTurns(account.turns);
      }
    } catch {
      // Signed out or offline: the device's copy stands.
    }
  }

  /** A message from the student or V. A reply that lands with the window shut is announced. */
  function addTurn(turn: ChatTurn) {
    if (!turn.transient) lastAtRef.current = Date.now();
    setTurns((t) => [...t, turn]);
    if (turn.role === "assistant" && !turn.transient && !openRef.current) {
      setUnread((u) => u + 1);
      setTucked(false); // a phone scrolled down had tucked the launcher away
      celebrate("I've replied. Tap me to read.", "talk");
    }
  }

  function clearChat() {
    try {
      localStorage.removeItem(LOCAL_CHAT_KEY);
    } catch {
      // Storage blocked: the fresh id below is enough.
    }
    lastAtRef.current = Date.now();
    setConversationId(newConversationId());
    setTurns([]);
    setUnread(0);
    toast.success("Chat cleared");
  }

  async function giveFeedback(index: number, value: 1 | -1) {
    const turn = turns[index];
    if (!turn || turn.role !== "assistant" || !turn.id || !conversationId) return;
    const previous = turn.feedback === 1 || turn.feedback === -1 ? turn.feedback : null;
    const next = previous === value ? null : value;
    const setAt = (feedback: 1 | -1 | null) =>
      setTurns((all) => all.map((t, i) => (i === index && t.role === "assistant" ? { ...t, feedback } : t)));
    setAt(next);
    try {
      const res = await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: turn.id, conversationId, value: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(next === null ? "Feedback removed" : "Thanks, that helps V get better");
    } catch {
      setAt(previous);
      toast.error("Couldn't save that. Please try again.");
    }
  }

  async function ask(id: ChatFaqId, label: string) {
    if (sending) return;
    addTurn({ role: "user", text: label });
    trackFunnel("chat_faq_click", { questionId: id });
    setSending(true);
    try {
      const res = await fetch("/api/chat/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: id, conversationId, pagePath: pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.reply) {
        const errorText = data.error || "V couldn't answer that. Please try again.";
        addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
        toast.error(errorText);
        return;
      }
      addTurn({ role: "assistant", avatar: "idle", text: data.reply as string });
    } catch {
      const errorText = "V is unavailable right now. Please try again.";
      addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
      toast.error(errorText);
    } finally {
      setSending(false);
    }
  }

  async function askTyped() {
    const text = draft.trim();
    if (sending || !text) return;
    addTurn({ role: "user", text });
    setDraft("");
    setSending(true);
    try {
      const res = await fetch("/api/chat/typed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId, pagePath: pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        links?: string[];
        id?: string | null;
        source?: "ai" | "fallback";
        error?: string;
      };
      if (!res.ok || !data.ok || !data.reply) {
        const errorText = data.error || "V couldn't take that question. Please try again.";
        addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
        toast.error(errorText);
        return;
      }
      const links = Array.isArray(data.links) ? data.links.filter((l): l is string => typeof l === "string") : [];
      addTurn(
        data.source === "ai" && data.id
          ? { role: "assistant", avatar: "laugh", text: data.reply as string, links, id: data.id, source: "ai", feedback: null }
          : { role: "assistant", avatar: "laugh", text: data.reply as string, links }
      );
    } catch {
      const errorText = "V is unavailable right now. Please try again.";
      addTurn({ role: "assistant", avatar: "idle", text: errorText, transient: true });
      toast.error(errorText);
    } finally {
      setSending(false);
    }
  }

  if (placement.hidden) return null;

  // Vertical position lives in globals.css (.chat-launcher-offset): clear of
  // MobileTabBar below sm, and raised by --v-lift over /browse's cart pill.
  const lift = { "--v-lift": placement.aboveCart ? "3.5rem" : "0px" } as CSSProperties;

  return (
    <div className="chat-launcher-offset fixed right-4 z-50 print:hidden" style={lift}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={building ? "Build a practice test with V" : "Chat with V"}
          className={
            building
              ? "fixed inset-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:static sm:mb-3 sm:h-[40rem] sm:max-h-[calc(100dvh-7rem)] sm:w-[30rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-lg sm:border sm:border-input sm:shadow-xl"
              : "mb-3 flex h-[31rem] max-h-[calc(100dvh-7rem)] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-input bg-background shadow-xl"
          }
          onKeyDown={(e) => {
            // The download box is a portal: its keys bubble here through React,
            // and its own Escape must not close V too.
            if (e.key === "Escape" && panelRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div className="flex items-center justify-between border-b border-input px-4 py-3">
            <div className="flex items-center gap-2">
              <VFace avatar="talk" className="h-7 w-7 object-contain" />
              <span className="font-sans text-sm font-semibold">
                {building ? "Build a practice test" : "Ask V"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {!building && turns.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={sending}
                  aria-label="Clear chat and start a new one"
                  title="Clear chat"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          {building ? (
            <PracticeBuilder initial={resume} onExit={() => setMode("chat")} onClose={close} />
          ) : (
          <>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {[GREETING, ...turns].map((t, n) => {
              // n - 1 indexes `turns`; the greeting is never stored.
              const i = n - 1;
              if (t.role === "user") {
                return (
                  <div
                    key={n}
                    className="ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-lg bg-brand px-3 py-2 text-sm text-brand-foreground"
                  >
                    {t.text}
                  </div>
                );
              }
              const rateable = t.source === "ai" && !!t.id;
              return (
                <div key={n} className="max-w-[90%]">
                  <div className="flex items-end gap-1.5">
                    <VFace avatar={t.avatar ?? "idle"} className="h-6 w-6 shrink-0 object-contain" />
                    <div className="whitespace-pre-wrap break-words rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                      <ReplyText text={t.text} links={t.links} onNavigate={close} />
                    </div>
                  </div>
                  {rateable && (
                    <div className="ml-8 mt-1 flex gap-1">
                      <button
                        type="button"
                        onClick={() => void giveFeedback(i, 1)}
                        aria-label="This reply was helpful"
                        aria-pressed={t.feedback === 1}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          t.feedback === 1 ? "text-brand-accent" : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" aria-hidden fill={t.feedback === 1 ? "currentColor" : "none"} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void giveFeedback(i, -1)}
                        aria-label="This reply was not helpful"
                        aria-pressed={t.feedback === -1}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          t.feedback === -1 ? "text-brand-accent" : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" aria-hidden fill={t.feedback === -1 ? "currentColor" : "none"} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {sending && (
              <div className="flex max-w-[90%] items-end gap-1.5">
                <VFace avatar="think" className="h-6 w-6 shrink-0 object-contain" />
                <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="relative border-t border-input">
            <div className="flex gap-1.5 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={openBuilder}
                disabled={sending}
                className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <ListChecks className="h-3.5 w-3.5" aria-hidden />
                Build a practice test
              </button>
              {PREDEFINED_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => void ask(q.id, q.label)}
                  disabled={sending}
                  className="shrink-0 whitespace-nowrap rounded-full border border-input bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>
            {/* Fade hint that more chips are scrollable — the discoverability
                tradeoff of a single row vs. the old full-height wrapped list. */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent"
            />
          </div>

          <form
            className="border-t border-input px-3 pb-2 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              void askTyped();
            }}
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={CHAT_MESSAGE_MAX}
                placeholder="Type your question"
                aria-label="Type your question for V"
                className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={sending || !draft.trim()}
                aria-label="Send question"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <SendHorizontal className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
              Chats are saved to help improve V. Please don&apos;t share your phone number or email.
            </p>
          </form>
          </>
          )}
        </div>
      )}

      {/* Celebrations, in V's voice (2026-10-04). Unmounted while the chat is
          open, so celebrate() falls back to the toast then. */}
      {!open && <VSays />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : openChat())}
        aria-label={
          open
            ? "Close chat with V"
            : unread > 0
              ? `Chat with V, ${unread} new ${unread === 1 ? "reply" : "replies"}`
              : "Chat with V"
        }
        aria-expanded={open}
        title="Chat with V"
        tabIndex={tucked ? -1 : undefined}
        className={`relative ml-auto ${open && building ? "hidden sm:flex" : "flex"} h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:h-14 sm:w-14 ${
          tucked ? "pointer-events-none translate-y-[160%] opacity-0" : ""
        }`}
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" aria-hidden />
        ) : (
          <VFace avatar="idle" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
        )}
        {!open && unread > 0 && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold leading-none text-brand-foreground ring-2 ring-background"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </div>
  );
}
