"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Route } from "lucide-react";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { usePulse } from "@/lib/viewer/usePulse";
import { celebrateInTurn } from "@/components/celebrate/celebrate";
import type { PathExam } from "@/lib/path/model";
import type { ChapterLine } from "@/lib/path/view";

/**
 * The board path's line on a /board chapter page (MENTOR_SPEC.md D8, Phase 2):
 * for a student on the path, this chapter's parts and today's part of it; for
 * a Class 12 student without a path, the offer, leading to /me.
 *
 * Browser-only, so the page stays one cached copy for everyone: the session
 * and the pulse are the header's own shared reads, and only a student the
 * pulse says is on a path for THIS board asks /api/path/chapter. It asks again
 * when the tab comes back into view (back from the chapter test), and V says
 * any chapter newly done, which the server returns once.
 */
export default function BoardPathLine({ chapterId, exam, className = "" }: { chapterId: string; exam: PathExam; className?: string }) {
  const { session } = useViewerSession();
  const pulse = usePulse(!!session);
  const p = pulse?.path ?? null;
  const onHere = p?.state === "on" && p.exam === exam;
  const [line, setLine] = useState<ChapterLine | null>(null);

  useEffect(() => {
    if (!onHere) return;
    let live = true;
    const load = () =>
      fetch(`/api/path/chapter?chapterId=${encodeURIComponent(chapterId)}`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((j: { line: ChapterLine | null; celebrate: string[] } | null) => {
          if (!live || !j) return;
          setLine(j.line);
          if (j.celebrate.length > 0) celebrateInTurn(j.celebrate.map((text) => ({ text, face: "talk" as const })));
        })
        .catch(() => {
          /* the line is extra: a failed read shows nothing */
        });
    void load();
    const onVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      live = false;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [onHere, chapterId]);

  if (p?.state === "offer" && p.exam === exam) return <BoardPathOffer className={className} />;
  if (onHere && line) return <BoardPathLineView line={line} className={className} />;
  return null;
}

const box = "flex items-start gap-3 rounded-md border bg-card px-3 py-2.5";

export function BoardPathLineView({ line, className = "" }: { line: ChapterLine; className?: string }) {
  return (
    <div className={`${box} ${className}`}>
      <Route className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-medium">
          On your path
          {line.done && (
            <span className="ml-2 inline-flex items-center gap-1 font-normal text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Chapter done
            </span>
          )}
        </p>
        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {line.parts.map((x) => (
            <li key={x.part} className="inline-flex items-center gap-1">
              {x.done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              ) : (
                <Circle className="h-3.5 w-3.5 text-brand-accent/60" aria-hidden />
              )}
              <span className="sr-only">{`${x.label}: ${x.done ? "done" : "not done yet"}${x.progress ? `, ${x.progress}` : ""}`}</span>
              <span aria-hidden>
                {x.label}
                {x.progress && <span className="ml-1 tabular-nums">{x.progress}</span>}
              </span>
            </li>
          ))}
        </ul>
        {line.today && !line.done && <p className="mt-1 text-xs font-medium text-brand-accent">{line.today}</p>}
      </div>
    </div>
  );
}

export function BoardPathOffer({ className = "" }: { className?: string }) {
  return (
    <div className={`${box} items-center ${className}`}>
      <Route className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <p className="min-w-0 flex-1 text-sm">
        <span className="font-medium">Finish every chapter before your boards.</span>{" "}
        <span className="text-muted-foreground">A few tasks a day, in book order.</span>
      </p>
      <Link
        href="/me"
        prefetch={false}
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        See the path
      </Link>
    </div>
  );
}
