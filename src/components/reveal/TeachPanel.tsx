"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import FormulaBlock from "@/app/notes/_components/FormulaBlock";
import WorkedExampleAuthored from "@/app/notes/_components/WorkedExampleAuthored";
import ReferenceTableBlock from "@/app/notes/_components/ReferenceTableBlock";
import TrapCallout from "@/app/notes/_components/TrapCallout";
import { diagramNoteShown, parseNotesHref, type TeachConcept } from "@/lib/notes/teachPanel";

/**
 * The stuck offer's "Teach me the idea" since 2026-11-15 (owner): the
 * subtopic's notes in a panel on the same page, like V's chat, instead of
 * leaving for the notes page. Full screen on a phone, on the right from sm up;
 * close (or Esc) and the student is back on their question, where the offer
 * then suggests trying one like it.
 *
 * Shows the teaching half of each concept card, in the notes' own blocks
 * (lib/notes/teachPanel says what and why the diagrams stay on the full page).
 * Content comes from GET /api/notes/subtopic, cached a day.
 *
 * The Visuals viewer's "Read in notes" opens it too (2026-11-25), with its own
 * close line, focus back to its button, and no pointer to the diagram the
 * student was just looking at.
 */
type Payload = { title: string; oneLineDefinition: string; href: string; concepts: TeachConcept[] };

const loaded = new Map<string, Payload>();

export default function TeachPanel({
  open,
  onOpenChange,
  notesHref,
  onFullNotes,
  closeHint = "Close to go back to your question",
  returnFocusTo,
  skipDiagramNoteFor = null,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notesHref: string;
  /** Called as the student leaves for the full notes page. */
  onFullNotes: () => void;
  /** The footer line: where closing takes the student. */
  closeHint?: string;
  /** The button that opened the panel: focus goes back to it on close (no Radix Trigger here). */
  returnFocusTo?: React.RefObject<HTMLButtonElement | null>;
  /** A concept whose diagram the student has just seen: no "diagram on the full page" line for it. */
  skipDiagramNoteFor?: string | null;
}) {
  const key = notesHref;
  const [data, setData] = useState<Payload | null>(() => loaded.get(key) ?? null);
  const [failed, setFailed] = useState(() => parseNotesHref(notesHref) === null);

  useEffect(() => {
    const ref = parseNotesHref(key);
    if (!open || data || failed || !ref) return;
    let active = true;
    const q = new URLSearchParams({ route: ref.subjectRoute, chapter: ref.chapterSlug, subtopic: ref.subtopicSlug });
    if (ref.conceptSlug) q.set("concept", ref.conceptSlug);
    fetch(`/api/notes/subtopic?${q.toString()}`)
      .then((r) => (r.ok ? (r.json() as Promise<Payload>) : Promise.reject(new Error(String(r.status)))))
      .then((p) => {
        loaded.set(key, p);
        if (active) setData(p);
      })
      .catch((e) => {
        console.error("teach panel load failed", key, e);
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [open, data, failed, key]);

  const fullHref = data?.href ?? notesHref.split("#")[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 sm:max-w-[30rem]"
        onCloseAutoFocus={
          returnFocusTo
            ? (e) => {
                e.preventDefault();
                returnFocusTo?.current?.focus();
              }
            : undefined
        }
        closeClassName="right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl border bg-card opacity-100"
      >
        <div className="border-b px-4 pb-3 pt-4 pr-16 font-sans">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <BookOpen className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            {data?.title ?? "The idea behind it"}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[13px] leading-snug">{data?.oneLineDefinition ?? ""}</SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto bg-background px-4 py-4">
          {!data && !failed && (
            <p className="flex items-center gap-2 font-sans text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading the idea…
            </p>
          )}
          {!data && failed && (
            <p className="font-sans text-sm text-muted-foreground" role="alert">
              Could not load it here.{" "}
              <Link href={fullHref} prefetch={false} onClick={onFullNotes} className="font-semibold text-brand-accent hover:underline">
                Open the notes page
              </Link>
              .
            </p>
          )}
          {data && (
            <div className="space-y-5">
              {data.concepts.map((c) => (
                <section key={c.slug} className="rounded-xl border bg-card p-4">
                  <h3 className="font-sans text-base font-semibold text-foreground">{c.name}</h3>
                  <div className="mt-2 font-serif text-[16px] leading-relaxed text-foreground">
                    <KatexRenderer text={c.intuition} />
                  </div>
                  <div className="mt-3 border-l-2 border-brand/40 pl-3">
                    <p className="mb-1 font-sans text-xs font-semibold text-brand-accent">Definition</p>
                    <RichText text={c.definition} className="font-serif text-[15px] leading-relaxed text-foreground" />
                  </div>
                  {c.formula && (
                    <div className="mt-4">
                      <FormulaBlock formula={c.formula} />
                    </div>
                  )}
                  {c.example && (
                    <div className="mt-4">
                      <WorkedExampleAuthored example={c.example} />
                    </div>
                  )}
                  {c.table && (
                    <div className="mt-4">
                      <ReferenceTableBlock table={c.table} />
                    </div>
                  )}
                  {c.traps.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {c.traps.map((t, i) => (
                        <TrapCallout key={i} title={t.title} body={t.body} />
                      ))}
                    </div>
                  )}
                  {diagramNoteShown(c, skipDiagramNoteFor) && (
                    <p className="mt-3 font-sans text-xs text-muted-foreground">
                      There is an interactive diagram for this on the{" "}
                      <Link href={`${fullHref}#${c.slug}`} prefetch={false} onClick={onFullNotes} className="font-semibold text-brand-accent hover:underline">
                        full notes page
                      </Link>
                      .
                    </p>
                  )}
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-4 py-1 font-sans">
          <span className="text-xs text-muted-foreground">{closeHint}</span>
          <Link
            href={fullHref}
            prefetch={false}
            onClick={onFullNotes}
            className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Read the full notes page
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
