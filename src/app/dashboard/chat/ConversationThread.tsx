"use client";

import { useState, type ReactNode } from "react";
import type { ConversationTurn } from "@/lib/chat/conversation";
import MathText from "@/components/chat/MathText";
import VAskedCard from "@/components/chat/VAskedCard";
import VFace from "@/components/chat/VFace";
import VReplyText from "@/components/chat/VReplyText";
import { USER_BUBBLE, V_BUBBLE } from "@/components/chat/chatStyles";

export type ThreadTurn = Pick<
  ConversationTurn,
  "question" | "reply" | "source" | "feedback" | "page" | "at" | "links" | "asked" | "quote" | "understood"
>;

const SOURCE_LABEL: Record<NonNullable<ThreadTurn["source"]>, string> = {
  ai: "AI",
  template: "button",
  followup: "late answer",
  fallback: "fixed reply",
};

/**
 * One conversation on /dashboard/chat, drawn the way the student saw it
 * (owner, 2026-10-23): their messages and V's replies as the window's bubbles,
 * maths drawn, links tappable, the question card above an Ask V tap. Under
 * each reply, a line only staff see: where the reply came from, the thumbs,
 * the page and the time. The thread is drawn only once opened, so a closed
 * list does not fetch every question card.
 */
export default function ConversationThread({ summary, turns }: { summary: ReactNode; turns: ThreadTurn[] }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="group px-4 py-2" onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className="cursor-pointer list-none rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {summary}
      </summary>
      {open && (
        <ol className="mt-3 max-w-xl space-y-4 pb-2">
          {turns.map((t, i) => (
            <li key={i} className="space-y-2">
              <div className="flex flex-col">
                {t.asked && <VAskedCard asked={t.asked} />}
                <div className={USER_BUBBLE}>
                  {t.quote && (
                    <span className="mb-1 line-clamp-2 block border-l-2 border-white/70 pl-2 text-xs text-white/90">
                      <MathText text={t.quote} />
                    </span>
                  )}
                  {t.question}
                </div>
              </div>
              <div className="max-w-[90%]">
                <div className="flex items-end gap-2">
                  <VFace avatar="idle" className="h-7 w-7 shrink-0 object-contain" />
                  <div className={V_BUBBLE}>
                    <VReplyText text={t.reply} links={t.links} />
                  </div>
                </div>
                <p className="ml-9 mt-1 text-xs text-muted-foreground">
                  {t.source ? SOURCE_LABEL[t.source] : "fixed reply"}
                  {t.feedback === 1 && " · marked helpful"}
                  {t.feedback === -1 && " · marked not helpful"}
                  {t.understood === true && " · understood"}
                  {t.understood === false && " · did not understand"}
                  {t.page && ` · on ${t.page}`}
                  {" · "}
                  {new Date(t.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </details>
  );
}
