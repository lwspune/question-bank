"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickNextMock } from "@/lib/mocks/hub";
import { useOwnAttempts } from "./OwnAttempts";
import type { HubMockRow } from "./MockHubTabs";

/**
 * The card on top of an exam's mock hub, signed-in students only: the mock
 * they are part-way through ("Resume"), else the newest past paper they have
 * not sat. Renders nothing for a visitor who is signed out, before their
 * attempts load, and once every past paper has been sat.
 */
export default function NextMockCard({
  pastIds,
  mocks,
}: {
  /** This exam's past papers, newest first. */
  pastIds: string[];
  /** Every mock on the page, by id, for whichever one is picked. */
  mocks: Record<string, HubMockRow>;
}) {
  const { summaries, loaded } = useOwnAttempts();
  if (!loaded) return null;
  const pick = pickNextMock(pastIds, Object.keys(mocks), summaries);
  const mock = pick ? mocks[pick.mockId] : undefined;
  if (!pick || !mock) return null;
  const resume = pick.kind === "resume";

  return (
    <section
      aria-label={resume ? "Mock in progress" : "Next paper for you"}
      className="mt-6 rounded-xl border-2 border-brand/70 bg-card p-4 shadow-sm sm:p-5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-accent">
        {resume ? "Mock in progress" : "Next paper for you"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground tabular-nums">
        {resume ? "Time is still on the clock" : `Not sat yet · ${mock.meta}`}
      </p>
      <p className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg">{mock.title}</p>
      <Link
        href={`/mock/${mock.slug}`}
        className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {resume ? "Resume" : "Start"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}
