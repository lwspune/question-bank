"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { SubjectGuideCard } from "@/lib/guide/guideCatalog";
import { guideShortName, orderHubGuides } from "@/lib/guide/hubList";

/**
 * An exam's subject guides as one compact list: the biggest marked "Start
 * here", the rest one row each, so every guide is one tap away without
 * scrolling past ten tall cards.
 *
 * Each card's blurb and highlights are this page's main text for search
 * engines, so they are not dropped: a row's arrow opens them. They are in the
 * server HTML either way (only hidden until opened).
 */
export default function GuideHubList({
  guides,
  examDisplay,
  restTitle,
}: {
  guides: SubjectGuideCard[];
  examDisplay: string;
  /** Heading over the rows below Start here, e.g. "Paper II · General Ability". */
  restTitle: string;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const { start, rest } = orderHubGuides(guides);
  if (!start) return null;
  const toggle = (href: string) => setOpen((o) => ({ ...o, [href]: !o[href] }));

  return (
    <div className="mt-8">
      <div className="rounded-lg border border-l-4 border-l-brand bg-card">
        <Link
          href={start.href}
          className="group flex items-center justify-between gap-3 rounded-lg p-4 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-brand-accent">
              Start here · biggest paper
            </span>
            <span className="mt-0.5 block text-lg font-semibold tracking-tight">
              {examDisplay} {guideShortName(start.exam, examDisplay)}
            </span>
            <span className="block text-sm text-muted-foreground">
              {start.qCount.toLocaleString("en-IN")} past questions · {start.yearWindow}
            </span>
            <span className="mt-2 block font-serif text-sm leading-relaxed text-muted-foreground">{start.blurb}</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        </Link>
      </div>

      {rest.length > 0 && (
        <>
          <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {restTitle}
          </h2>
          <ul className="divide-y rounded-lg border bg-card">
            {rest.map((g) => {
              const name = guideShortName(g.exam, examDisplay);
              const isOpen = open[g.href] === true;
              const panelId = `guide-about-${g.href.split("/").pop()}`;
              return (
                <li key={g.href}>
                  <div className="flex items-stretch">
                    <Link
                      href={g.href}
                      className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium">{name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {g.qCount.toLocaleString("en-IN")} past questions
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(g.href)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={`What the ${name} guide covers`}
                      className="flex w-12 shrink-0 items-center justify-center border-l text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  </div>
                  <div id={panelId} hidden={!isOpen} className="border-t bg-muted/30 px-4 py-3">
                    <p className="font-serif text-sm leading-relaxed text-muted-foreground">{g.blurb}</p>
                    <ul className="mt-2 space-y-1 font-serif text-sm text-muted-foreground">
                      {g.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-muted-foreground">{g.yearWindow}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
