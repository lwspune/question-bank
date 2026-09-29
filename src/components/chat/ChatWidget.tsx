"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { PREDEFINED_QUESTIONS, type ChatFaqId } from "@/lib/chat/faq";

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
  text: "Hi, I'm V. Pick a question below and I'll answer it.",
};

/**
 * Floating FAQ-chatbot launcher, visible to anon + authed visitors alike
 * (same audience as ThemeToggle). Stateless per page load — no history is
 * persisted.
 *
 * PHASE 2 — predefined questions only, no free-text input, no LLM call.
 * See the "V, phase 2" plan: this validates whether V gets used at all
 * before spending on an Anthropic API key. The full LLM path
 * (/api/chat, src/lib/chat/anthropic.ts) is left in place, untouched and
 * dormant — re-enabling it later is a UI change here, not a rebuild.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([GREETING]);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openRecordedRef = useRef(false);

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
        const errorText = data.error || "V couldn't answer that — please try again.";
        setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
        toast.error(errorText);
        return;
      }
      setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: data.reply as string }]);
    } catch {
      const errorText = "V is unavailable right now — please try again.";
      setTurns((t) => [...t, { role: "assistant", avatar: "idle", text: errorText }]);
      toast.error(errorText);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with V"
          className="mb-3 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-input bg-background shadow-xl"
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
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : openChat())}
        aria-label={open ? "Close chat with V" : "Chat with V"}
        aria-expanded={open}
        title="Chat with V"
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {open ? (
          <X className="h-5 w-5 text-foreground" aria-hidden />
        ) : (
          <VFace avatar="idle" className="h-12 w-12 object-contain" />
        )}
      </button>
    </div>
  );
}
