"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import BadgeIcon from "./BadgeIcon";
import { cn } from "@/lib/utils";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { hasAuthCookie } from "@/lib/viewer/useViewerSession";
import { sendActivity } from "@/lib/activity/clientBeacon";
import {
  BADGE_LABEL,
  GALLERY_KINDS,
  chaptersOf,
  filterVisuals,
  orderChaptersByWeak,
  tileMarkupOf,
  type GalleryKindFilter,
  type GallerySubject,
  type GalleryVisual,
} from "@/lib/gallery/gallery";

/**
 * The Visuals gallery for one notes subject (owner, 2026-11-23; mockup
 * https://claude.ai/artifact/5RqMpgmjCork2oNHEebMLD): Exam and Subject
 * dropdowns, chapter chips with counts, All · Try it · 3D · Pictures, and a
 * grid of plain squares (names under them from lg up). A tile opens the
 * full-screen viewer (GalleryViewer), loaded on the first tap.
 *
 * The page is cached for everyone, so two things arrive from the browser:
 * the tile pictures (./thumbs, one cached file) and, for a signed-in
 * student, their chapters with waiting mistakes (/api/gallery/weak), which go
 * first. A shared link's ?v= is read from window.location, never through
 * Next's search-params hook, which would bail the cached page out to the
 * browser (tests/gallery-pages.test.ts).
 */

export type GalleryItem = GalleryVisual & { practice: string[] };

const GalleryViewer = dynamic(() => import("./GalleryViewer"), { ssr: false });

const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function GalleryView({
  subject,
  subjects,
  exams,
  visuals,
}: {
  subject: GallerySubject;
  subjects: readonly GallerySubject[];
  /** The exams with visuals, with their short names, in list order. */
  exams: readonly { examSlug: string; label: string }[];
  visuals: readonly GalleryItem[];
}) {
  const router = useRouter();
  const { signedIn } = useSignedIn();
  const [chapter, setChapter] = useState<string | null>(null);
  const [kind, setKind] = useState<GalleryKindFilter>("all");
  const [weak, setWeak] = useState<Map<string, number>>(() => new Map());
  const [thumbs, setThumbs] = useState<Record<string, string> | null>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTile = useRef<number | null>(null);

  // The pictures: one cached file per subject.
  useEffect(() => {
    let cancelled = false;
    fetch(`/visuals/${subject.subjectRoute}/thumbs`)
      .then((r) => (r.ok ? (r.json() as Promise<Record<string, string>>) : null))
      .then((t) => {
        if (!cancelled && t) setThumbs(t);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [subject.subjectRoute]);

  // A signed-in student's chapters with waiting mistakes go first.
  useEffect(() => {
    if (!hasAuthCookie()) return;
    let cancelled = false;
    fetch(`/api/gallery/weak?subject=${encodeURIComponent(subject.subjectRoute)}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<{ chapters: Record<string, number> }>) : null))
      .then((b) => {
        if (!cancelled && b) setWeak(new Map(Object.entries(b.chapters)));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [subject.subjectRoute]);

  useEffect(() => {
    if (signedIn) sendActivity({ kind: "surface_viewed", surface: "visuals", action: "page", subject: subject.subjectRoute });
  }, [signedIn, subject.subjectRoute]);

  const chapters = useMemo(() => orderChaptersByWeak(chaptersOf(visuals), weak), [visuals, weak]);
  const ordered = useMemo(() => {
    const rank = new Map(chapters.map((c, i) => [c.chapterSlug, i]));
    return [...visuals].sort((a, b) => (rank.get(a.chapterSlug) ?? 0) - (rank.get(b.chapterSlug) ?? 0));
  }, [visuals, chapters]);
  const shown = useMemo(() => filterVisuals(ordered, { chapter, kind }), [ordered, chapter, kind]);
  const kinds = GALLERY_KINDS.filter((k) => k.kind === "all" || visuals.some((v) => v.badge === k.kind));
  const weakFirst = chapters.some((c) => (weak.get(c.chapterName) ?? 0) > 0);

  // A shared link opens its visual (the filters start at All, so shown is the whole subject).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("v");
    if (!slug) return;
    const i = ordered.findIndex((v) => v.slug === slug);
    if (i >= 0) setOpenAt(i);
    // Only on arrival: the order settles once, and a later reorder must not reopen it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subjectsOfExam = subjects.filter((s) => s.examSlug === subject.examSlug);

  function open(i: number) {
    lastTile.current = i;
    setOpenAt(i);
  }

  function close() {
    setOpenAt(null);
    const i = lastTile.current;
    if (i !== null) requestAnimationFrame(() => tileRefs.current[i]?.focus());
  }

  return (
    <>
      <h1 className="sr-only">{subject.subjectDisplay} visuals</h1>
      <section className="rounded-xl border bg-card p-3 sm:p-4" aria-label="Choose what to see">
        <div className="grid grid-cols-2 gap-2 sm:max-w-md">
          <div className="relative">
            <label htmlFor="visuals-exam" className="mb-1 block text-xs font-medium text-muted-foreground">
              Exam
            </label>
            <select
              id="visuals-exam"
              className={selectClass}
              value={subject.examSlug}
              onChange={(e) => {
                const first = subjects.find((s) => s.examSlug === e.target.value);
                if (first) router.push(`/visuals/${first.subjectRoute}`);
              }}
            >
              {exams.map((x) => (
                <option key={x.examSlug} value={x.examSlug}>
                  {x.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 h-4 w-4" aria-hidden />
          </div>
          <div className="relative">
            <label htmlFor="visuals-subject" className="mb-1 block text-xs font-medium text-muted-foreground">
              Subject
            </label>
            <select
              id="visuals-subject"
              className={selectClass}
              value={subject.subjectRoute}
              onChange={(e) => router.push(`/visuals/${e.target.value}`)}
            >
              {subjectsOfExam.map((s) => (
                <option key={s.subjectRoute} value={s.subjectRoute}>
                  {s.subjectDisplay.replace(`${exams.find((x) => x.examSlug === s.examSlug)?.label ?? ""} `, "")}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 h-4 w-4" aria-hidden />
          </div>
        </div>

        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Chapter">
          <button
            type="button"
            aria-pressed={chapter === null}
            onClick={() => setChapter(null)}
            className={chipClass(chapter === null)}
          >
            All chapters · {visuals.length}
          </button>
          {chapters.map((c) => (
            <button
              key={c.chapterSlug}
              type="button"
              aria-pressed={chapter === c.chapterSlug}
              onClick={() => setChapter(c.chapterSlug)}
              className={chipClass(chapter === c.chapterSlug)}
            >
              {c.chapterName} · {c.count}
            </button>
          ))}
        </div>

        {kinds.length > 2 && (
          <div
            role="group"
            aria-label="Kind of visual"
            className="mt-3 grid rounded-lg bg-muted p-1 sm:max-w-md"
            style={{ gridTemplateColumns: `repeat(${kinds.length}, minmax(0, 1fr))` }}
          >
            {kinds.map((k) => (
              <button
                key={k.kind}
                type="button"
                aria-pressed={kind === k.kind}
                onClick={() => setKind(k.kind)}
                className={cn(
                  "h-9 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  kind === k.kind ? "bg-background font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
        )}
      </section>

      <p className="mt-3 px-1 text-xs text-muted-foreground" aria-live="polite">
        {weakFirst ? "Your weak chapters first. " : ""}
        {shown.length} {shown.length === 1 ? "visual" : "visuals"}
      </p>

      {shown.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">No visuals of this kind in this chapter.</p>
      ) : (
        <ul className="mt-2 grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5 lg:gap-4">
          {shown.map((v, i) => {
            const thumb = thumbs?.[v.slug];
            return (
              <li key={`${v.chapterSlug}/${v.slug}`} className="flex flex-col gap-2">
                <button
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`${BADGE_LABEL[v.badge]}: ${v.conceptName}, ${v.chapterName}`}
                  className="relative block aspect-square w-full overflow-hidden rounded-md border bg-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:rounded-xl"
                >
                  {thumb ? (
                    <span
                      className="gallery-thumb absolute inset-0 flex items-center justify-center p-1.5"
                      // Our own diagrams, drawn to static markup by `npm run gallery:index`.
                      dangerouslySetInnerHTML={{ __html: tileMarkupOf(thumb) }}
                    />
                  ) : (
                    <span className="absolute inset-0 animate-pulse bg-muted" />
                  )}
                  <span className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-900/80 text-white">
                    <BadgeIcon badge={v.badge} className="h-3.5 w-3.5" />
                  </span>
                </button>
                <span className="hidden flex-col leading-snug lg:flex">
                  <span className="text-sm font-semibold">{v.conceptName}</span>
                  <span className="text-xs text-muted-foreground">{v.chapterName}</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {openAt !== null && (
        <GalleryViewer
          items={shown}
          start={openAt}
          thumbs={thumbs ?? {}}
          subjectDisplay={subject.subjectDisplay}
          signedIn={signedIn}
          onClose={close}
        />
      )}
    </>
  );
}

function chipClass(on: boolean) {
  return cn(
    "h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    on ? "border-transparent bg-primary font-semibold text-primary-foreground" : "border-input bg-background hover:bg-accent"
  );
}
