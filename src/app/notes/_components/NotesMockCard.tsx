"use client";

import Link from "next/link";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import type { MockCtaCopy } from "@/lib/mocks/chapterTests";

/**
 * End-of-page "test yourself" card: the chapter's own test when it has one,
 * else the exam's past papers (copy from lib/mocks/chapterTests.mockCtaCopy). A client island only for
 * the click count; the markup is the same for every visitor, so the notes page
 * around it stays prerendered. Sign-in is asked for where it already is: when
 * the student presses Start on a mock.
 */
export default function NotesMockCard({
  href,
  examDisplay,
  copy,
  page,
  secondary,
}: {
  href: string;
  examDisplay: string;
  copy: Pick<MockCtaCopy, "title" | "body" | "button">;
  page: "topic" | "chapter";
  /** A second, quieter action beside the button (the topic page's drill link,
   *  which used to be a box of its own: five boxed calls to action in a row). */
  secondary?: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-brand/25 bg-brand/5 p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
        <div className="flex-1">
          <h2 className="text-lg font-semibold tracking-tight">{copy.title}</h2>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href={href}
              prefetch={false}
              onClick={() => trackFunnel("notes_mock_card_click", { exam: examDisplay, page })}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {copy.button}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}
