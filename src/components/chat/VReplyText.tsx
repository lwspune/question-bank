"use client";

import Link from "next/link";
import { linkLabel, splitReplyLinks } from "@/lib/chat/replyLinks";
import MathText from "./MathText";

/**
 * V's reply with its allowed paths as links; everything else stays text. A
 * link shows a name, never its path (2026-11-21: a notes path ran over three
 * lines on a phone): `labels` from the tool where it gave one, else linkLabel's.
 * Shared by the chat window and /dashboard/chat, so the dashboard shows a
 * reply as the student saw it (2026-10-23).
 */
export default function VReplyText({
  text,
  links,
  labels,
  onNavigate,
}: {
  text: string;
  links?: string[];
  labels?: Readonly<Record<string, string>>;
  onNavigate?: () => void;
}) {
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
            {linkLabel(seg.href, labels)}
          </Link>
        )
      )}
    </>
  );
}
