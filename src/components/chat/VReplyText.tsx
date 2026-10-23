"use client";

import Link from "next/link";
import { splitReplyLinks } from "@/lib/chat/replyLinks";
import MathText from "./MathText";

/**
 * V's reply with its allowed paths as links; everything else stays text.
 * Shared by the chat window and /dashboard/chat, so the dashboard shows a
 * reply as the student saw it (2026-10-23).
 */
export default function VReplyText({ text, links, onNavigate }: { text: string; links?: string[]; onNavigate?: () => void }) {
  if (!links || links.length === 0) return <MathText text={text} />;
  return (
    <>
      {splitReplyLinks(text, links).map((seg, i) =>
        seg.kind === "text" ? (
          <span key={i}>
            <MathText text={seg.text} />
          </span>
        ) : (
          <Link
            key={i}
            href={seg.href}
            onClick={onNavigate}
            className="break-words font-medium text-brand-accent underline underline-offset-2 hover:no-underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {seg.href}
          </Link>
        )
      )}
    </>
  );
}
