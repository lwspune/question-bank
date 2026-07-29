"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { marksPerPaper, shareOfBank } from "@/lib/guide/marks";
import {
  type ChapterRow,
  MARKING,
  OVERVIEW,
} from "@/app/guide/nda-maths/_data/nda-maths";

type Props = {
  rows: ChapterRow[];
  /** chapter name → /notes href, or null when the chapter has no notes. */
  notesHrefs: Record<string, string | null>;
};

/**
 * The bank-breakdown table on the /guide/nda-maths overview.
 *
 * Client-side only because each chapter expands to reveal its subtopics.
 * A <details>/<summary> version would be zero-JS (see CollapsibleDomain), but
 * the chapter row carries a "Notes" link and an anchor inside a <summary>
 * both navigates and toggles — so an explicit disclosure button keeps the two
 * affordances separate. The component ships JS but reads nothing per-request,
 * so the page stays prerendered.
 */
export default function ChapterBreakdownTable({ rows, notesHrefs }: Props) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (chapter: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(chapter)) next.delete(chapter);
      else next.add(chapter);
      return next;
    });

  return (
    <div className="mt-4 overflow-x-auto rounded-md border">
      <table className="w-full min-w-[780px] text-sm">
        <caption className="sr-only">
          NDA Mathematics chapters by question count, with per-chapter
          subtopic breakdowns. Marks are the marks each chapter is typically
          worth in one 300-mark paper.
        </caption>
        <thead className="border-b bg-muted/40">
          <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th scope="col" className="px-3 py-2 font-medium">
              Chapter
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Questions
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Share
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Marks
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              % HARD
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Focus topics
            </th>
          </tr>
        </thead>

        {rows.map((row) => {
          const isOpen = open.has(row.chapter);
          const notesHref = notesHrefs[row.chapter] ?? null;
          const panelId = `subtopics-${slugify(row.chapter)}`;

          return (
            <tbody key={row.chapter} className="border-b last:border-b-0">
              <tr className={cn("align-top", isOpen && "bg-accent/30")}>
                <td className="px-3 py-2 font-medium">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <button
                      type="button"
                      onClick={() => toggle(row.chapter)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="-ml-1 inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-left transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                    >
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-90"
                        )}
                        aria-hidden
                      />
                      <span>{row.chapter}</span>
                      <span className="sr-only">
                        {isOpen ? " — hide" : " — show"}{" "}
                        {row.subtopics.length} subtopics
                      </span>
                    </button>
                    {notesHref && (
                      <Link
                        href={notesHref}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary transition-colors hover:bg-primary/10"
                      >
                        <NotebookPen className="h-2.5 w-2.5" aria-hidden />
                        Notes
                      </Link>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {row.qCount}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                  {row.pctTotal.toFixed(1)}%
                </td>
                <td className="px-3 py-2 text-right font-medium tabular-nums">
                  {marksPerPaper(row.qCount, MARKING).toFixed(1)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                  {row.pctHard}%
                </td>
                <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                  {row.focus}
                </td>
              </tr>

              {/* Rendered always and hidden with CSS rather than mounted on
                  open, so the breakdown is in the prerendered HTML — this
                  page exists to be indexed, and a crawler never clicks. */}
              {row.subtopics.map((sub, i) => (
                  <tr
                    key={sub.subtopic}
                    // Only the first revealed row carries the id — a table
                    // can't wrap its rows in a single element, and repeating
                    // it would put duplicate ids in the DOM.
                    id={i === 0 ? panelId : undefined}
                    className={cn("bg-muted/20 text-[13px]", !isOpen && "hidden")}
                  >
                    <td className="py-1.5 pl-9 pr-3 text-muted-foreground">
                      {sub.subtopic}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                      {sub.qCount}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                      {shareOfBank(sub.qCount, OVERVIEW.totalQ).toFixed(1)}%
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                      {marksPerPaper(sub.qCount, MARKING).toFixed(1)}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">
                      {sub.pctHard}%
                    </td>
                    <td className="px-3 py-1.5" />
                  </tr>
                ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
