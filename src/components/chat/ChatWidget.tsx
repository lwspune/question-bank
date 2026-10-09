"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { SendHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { PREDEFINED_QUESTIONS, type ChatFaqId } from "@/lib/chat/faq";
import { CHAT_MESSAGE_MAX } from "@/lib/chat/validate";
import { vPlacement } from "@/lib/chat/placement";
import { launcherHiddenAfterScroll } from "@/lib/chat/launcherScroll";
import { useCart } from "@/lib/cart/CartProvider";
import VSays from "./VSays";

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

type ChatTurn = { role: "user" | "assistant"; text: string; avatar?: VAvatar };

const GREETING: ChatTurn = {
  role: "assistant",
  avatar: "laugh",
  text: "Hi, I'm V. Pick a question below, or type your own.",
};

/**
 * Floating FAQ-chatbot launcher, visible to anon + authed visitors alike
 * (same audience as ThemeToggle). Stateless per page load — no history is
 * persisted.
 *
 * PHASE 2 — predefined questions, plus (2026-10-09) a typing box whose
 * questions are STORED, not answered: POST /api/chat/typed replies with the
 * owner's fixed line. That measures what students ask before paying for a
 * model. The full LLM path (/api/chat, src/lib/chat/anthropic.ts) is left in
 * place, untouched and dormant; re-enabling it is a UI change here.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([GREETING]);
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
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openRecordedRef = useRef(false);
  const pathname = usePathname() ?? "/";
  const cart = useCart();
  const placement = vPlacement(pathname, cart);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function openChat() {
    // Once per mount, so reopening the panel doesn't inflate /dashboard/chat's open count.
    if (!openRecordedRef.current) {
      openRecordedRef.current = true;
      trackFunnelOnce("chat_launcher_click", "session");
      void fetch("/api/chat/open", { method: "POST" }).catch(() => {});
    }
    setOpen(true);
  }

  async function ask(id: ChatFaqId, label: string) {
    if (sending) return;
    setTurns((t) => [...t, { role: "user", text: label }]);
    trackFunnel("chat_faq_click", { questionId: id });
    setSending(true);
    try {
      const res = await fetch("/api/chat/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: id }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.reply) {
        const errorText = data.error || "V couldn't answer that. Please try again.";
        setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
        toast.error(errorText);
        return;
      }
      setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: data.reply as string }]);
    } catch {
      const errorText = "V is unavailable right now. Please try again.";
      setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
      toast.error(errorText);
    } finally {
      setSending(false);
    }
  }

  async function askTyped() {
    const text = draft.trim();
    if (sending || !text) return;
    setTurns((t) => [...t, { role: "user", text }]);
    setDraft("");
    setSending(true);
    try {
      const res = await fetch("/api/chat/typed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reply?: string; error?: string };
      if (!res.ok || !data.ok || !data.reply) {
        const errorText = data.error || "V couldn't take that question. Please try again.";
        setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
        toast.error(errorText);
        return;
      }
      setTurns((t) => [...t, { role: "assistant", avatar: "laugh", text: data.reply as string }]);
    } catch {
      const errorText = "V is unavailable right now. Please try again.";
      setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
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
          role="dialog"
          aria-modal="true"
          aria-label="Chat with V"
          className="mb-3 flex h-[31rem] max-h-[calc(100dvh-7rem)] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-input bg-background shadow-xl"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <div className="flex items-center justify-between border-b border-input px-4 py-3">
            <div className="flex items-center gap-2">
              <VFace avatar="talk" className="h-7 w-7 object-contain" />
              <span className="font-sans text-sm font-semibold">Ask V</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {turns.map((t, i) =>
              t.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] rounded-lg bg-brand px-3 py-2 text-sm text-brand-foreground"
                >
                  {t.text}
                </div>
              ) : (
                <div key={i} className="flex max-w-[90%] items-end gap-1.5">
                  <VFace avatar={t.avatar ?? "idle"} className="h-6 w-6 shrink-0 object-contain" />
                  <div className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                    {t.text}
                  </div>
                </div>
              )
            )}
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
              Typed questions are saved to improve V. Please don&apos;t share your phone number or email.
            </p>
          </form>
        </div>
      )}

      {/* Celebrations, in V's voice (2026-10-04). Unmounted while the chat is
          open, so celebrate() falls back to the toast then. */}
      {!open && <VSays />}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : openChat())}
        aria-label={open ? "Close chat with V" : "Chat with V"}
        aria-expanded={open}
        title="Chat with V"
        tabIndex={tucked ? -1 : undefined}
        className={`ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-lg transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none sm:h-14 sm:w-14 ${
          tucked ? "pointer-events-none translate-y-[160%] opacity-0" : ""
        }`}
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" aria-hidden />
        ) : (
          <VFace avatar="idle" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
        )}
      </button>
    </div>
  );
}
