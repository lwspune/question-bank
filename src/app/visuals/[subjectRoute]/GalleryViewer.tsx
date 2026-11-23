"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowUp, BookOpen, Share2, Target } from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import ClientDiagram from "@/app/notes/_components/ClientDiagram.generated";
import type { VisualizationSlug } from "@/app/notes/_types";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import { BADGE_LABEL, notesHrefOf, visualHrefOf } from "@/lib/gallery/gallery";
import BadgeIcon from "./BadgeIcon";
import type { GalleryItem } from "./GalleryView";

/**
 * The Visuals gallery's full-screen viewer (2026-11-23): one visual per
 * screen, swiped up for the next (scroll snap, the browser's own), with the
 * concept's name and intuition, "Read in notes", "Practise 3 questions" (the
 * notes drill panel with that concept's own questions; answers count toward
 * the daily free limit like everywhere) and Share.
 *
 * A Try it or 3D visual that runs in the browser loads its working version
 * on the screen in view and its neighbours; every other screen shows the
 * picture, so a long chapter never loads every diagram's script at once.
 * Arrow keys move, Escape closes, focus goes back to the tile.
 */

const NotesDrillPanel = dynamic(() => import("@/app/notes/_components/NotesDrillPanel"), { ssr: false });

export default function GalleryViewer({
  items,
  start,
  thumbs,
  subjectDisplay,
  signedIn,
  onClose,
}: {
  items: readonly GalleryItem[];
  start: number;
  thumbs: Readonly<Record<string, string>>;
  subjectDisplay: string;
  signedIn: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState(start);
  const [practice, setPractice] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** The Practise button last tapped: focus goes back to it when the panel closes. */
  const practiceButton = useRef<HTMLButtonElement | null>(null);

  // Open on the tapped visual; the page behind does not scroll.
  useEffect(() => {
    slides.current[start]?.scrollIntoView({ block: "start" });
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // V's button would sit on the Practise button (both on the top layer): hidden while this is open.
    document.body.classList.add("gallery-viewer-open");
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("gallery-viewer-open");
    };
  }, [start]);

  // Which screen is in view.
  useEffect(() => {
    const root = scroller.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.6 }
    );
    for (const el of slides.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [items]);

  const current = items[active];
  useEffect(() => {
    if (signedIn && current) {
      sendActivity({ kind: "surface_viewed", surface: "visuals", action: "open", subject: current.subjectRoute, slug: current.slug });
    }
  }, [signedIn, current]);

  function go(i: number) {
    if (i < 0 || i >= items.length) return;
    slides.current[i]?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (practice !== null) return;
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      go(active - 1);
    }
  }

  async function share(v: GalleryItem) {
    const url = new URL(visualHrefOf(v), window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: v.conceptName, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch (err) {
      // A closed share sheet is not an error.
      if (err instanceof Error && err.name === "AbortError") return;
      toast.error("Could not share. Please copy the address instead.");
    }
  }

  const practising = practice !== null ? items[practice] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${subjectDisplay} visuals`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <header className="flex h-14 shrink-0 items-center gap-1 border-b px-1 sm:px-3">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Back to all visuals"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold">{current?.chapterName}</p>
          <p className="text-xs text-muted-foreground">
            {subjectDisplay} · {active + 1} of {items.length}
          </p>
        </div>
        {current && (
          <button
            type="button"
            onClick={() => share(current)}
            aria-label="Share this visual"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Share2 className="h-5 w-5" aria-hidden />
          </button>
        )}
      </header>

      <div ref={scroller} className="flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {items.map((v, i) => {
          const live = v.interactive && Math.abs(i - active) <= 1;
          const next = items[i + 1];
          const n = v.practice.length;
          return (
            <section
              key={`${v.chapterSlug}/${v.slug}`}
              ref={(el) => {
                slides.current[i] = el;
              }}
              data-index={i}
              aria-label={`${v.conceptName}, ${i + 1} of ${items.length}`}
              className="mx-auto flex h-full max-w-2xl snap-start snap-always flex-col px-4 pb-4 pt-4"
            >
              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border bg-card p-3">
                <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-foreground">
                  <BadgeIcon badge={v.badge} className="h-3.5 w-3.5" />
                  {BADGE_LABEL[v.badge]}
                  {v.badge === "3d" && v.interactive ? " · drag to turn" : ""}
                </span>
                <div className="gallery-figure min-h-0 flex-1 overflow-auto">
                  {live ? (
                    <ClientDiagram slug={v.slug as VisualizationSlug} />
                  ) : (
                    <div
                      className="notes-figure flex h-full items-center justify-center"
                      // Our own diagrams, drawn to static markup by `npm run gallery:index`.
                      dangerouslySetInnerHTML={{ __html: thumbs[v.slug] ?? "" }}
                    />
                  )}
                </div>
              </div>

              <div className="shrink-0 pt-3">
                <h2 className="text-lg font-bold leading-snug">{v.conceptName}</h2>
                <p className="text-xs text-muted-foreground">
                  {v.chapterName} · {v.subtopicTitle}
                </p>
                {v.line && (
                  <div className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    <KatexRenderer text={v.line} />
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <Link
                    href={notesHrefOf(v)}
                    onClick={() => {
                      if (signedIn) sendActivity({ kind: "surface_viewed", surface: "visuals", action: "notes", subject: v.subjectRoute, slug: v.slug });
                    }}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-brand px-3 text-sm font-semibold text-brand-foreground hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <BookOpen className="hidden h-4 w-4 sm:block" aria-hidden />
                    Read in notes
                  </Link>
                  {n > 0 && (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(e) => {
                        practiceButton.current = e.currentTarget;
                        if (signedIn) sendActivity({ kind: "surface_viewed", surface: "visuals", action: "practise", subject: v.subjectRoute, slug: v.slug });
                        setPractice(i);
                      }}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-input bg-background px-3 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Target className="hidden h-4 w-4 sm:block" aria-hidden />
                      Practise {n} {n === 1 ? "question" : "questions"}
                    </button>
                  )}
                </div>
                {next && (
                  <button
                    type="button"
                    onClick={() => go(i + 1)}
                    className="mt-3 flex w-full items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArrowUp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="min-w-0 leading-tight">
                      <span className="block text-xs text-muted-foreground">Swipe up for the next one</span>
                      <span className="block truncate text-sm font-semibold">{next.conceptName}</span>
                    </span>
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {practising && (
        <NotesDrillPanel
          open
          onOpenChange={(o) => {
            if (!o) setPractice(null);
          }}
          title={practising.conceptName}
          description={`${practising.practice.length} ${practising.practice.length === 1 ? "question" : "questions"} on this idea`}
          source={{ kind: "ids", ids: practising.practice }}
          fullHref={buildBrowseUrl({
            extraIds: practising.practice,
            from: visualHrefOf(practising),
            fromLabel: "Back to visuals",
          })}
          onFullPage={() => {}}
          onMore={() => {}}
          returnFocusTo={practiceButton}
          closeHint="Close to go back to the visual"
        />
      )}
    </div>
  );
}
