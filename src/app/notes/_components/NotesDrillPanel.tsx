"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Target } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QuestionListView from "@/app/browse/QuestionListView";
import { useSignedIn } from "@/components/auth/useSignedIn";
import type { QuestionRow } from "@/lib/questions/query";
import { DRILL_PAGE_SIZE, drillHasMore, drillRequestQuery, type DrillSource } from "@/lib/notes/drillPanel";

/**
 * What a notes drill link opens since 2026-11-15 (owner): its questions in a
 * panel on the SAME page, like the repeat line's See all, so a student
 * practises and closes it back to the concept they were reading. On a phone it
 * fills the screen; from sm up it slides in on the right. "Open in the bank"
 * keeps /browse (cart, Word export, filters) one tap away, for teachers most.
 *
 * Cards are /browse's own (QuestionListView), so an answer here spends the same
 * free answers, lands in Fix your mistakes and shows the same teaching moments
 * as on /browse. Pages of 20 come from GET /api/notes/drill.
 */
type Loaded = { rows: QuestionRow[]; total: number; more: boolean };

/** One load per link per page visit: reopening the panel shows it at once. */
const loaded = new Map<string, Loaded>();

function sourceKey(source: DrillSource): string {
  return source.kind === "ids" ? `ids:${source.ids.join(",")}` : `sub:${source.subtopicId}:${source.all}`;
}

async function fetchPage(source: DrillSource, page: number): Promise<{ rows: QuestionRow[]; total: number }> {
  const res = await fetch(`/api/notes/drill?${drillRequestQuery(source, page)}`);
  if (!res.ok) throw new Error(String(res.status));
  const body = (await res.json()) as { rows: QuestionRow[]; total: number };
  // A concept's total is the page's own id list; the route only sees one page of it.
  return { rows: body.rows, total: source.kind === "ids" ? source.ids.length : body.total };
}

export default function NotesDrillPanel({
  open,
  onOpenChange,
  title,
  description,
  source,
  fullHref,
  onFullPage,
  onMore,
  returnFocusTo,
}: {
  /** The button that opened the panel: focus goes back to it on close (no Radix Trigger here). */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  source: DrillSource;
  /** The same questions on /browse, with the "Back to notes" pill. */
  fullHref: string;
  onFullPage: () => void;
  onMore: () => void;
}) {
  const key = sourceKey(source);
  const [data, setData] = useState<Loaded | null>(() => loaded.get(key) ?? null);
  const [failed, setFailed] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { signedIn } = useSignedIn();

  useEffect(() => {
    if (!open || data) return;
    let active = true;
    fetchPage(source, 1)
      .then(({ rows, total }) => {
        const next = { rows, total, more: drillHasMore(rows.length, total, rows.length) };
        loaded.set(key, next);
        if (active) setData(next);
      })
      .catch((e) => {
        console.error("notes drill load failed", key, e);
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [open, data, key, source]);

  const showMore = useCallback(async () => {
    if (!data || loadingMore) return;
    onMore();
    setLoadingMore(true);
    try {
      const page = Math.floor(data.rows.length / DRILL_PAGE_SIZE) + 1;
      const { rows } = await fetchPage(source, page);
      const seen = new Set(data.rows.map((r) => r.id));
      const all = [...data.rows, ...rows.filter((r) => !seen.has(r.id))];
      const next = { rows: all, total: data.total, more: drillHasMore(all.length, data.total, rows.length) };
      loaded.set(key, next);
      setData(next);
    } catch (e) {
      console.error("notes drill load more failed", key, e);
      setData({ ...data, more: false });
      setFailed(true);
    } finally {
      setLoadingMore(false);
    }
  }, [data, loadingMore, onMore, source, key]);

  const bankLink = (text: string) => (
    <Link
      href={fullHref}
      prefetch={false}
      onClick={onFullPage}
      className="font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {text}
    </Link>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 sm:max-w-[36rem]"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
        closeClassName="right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl border bg-card opacity-100"
      >
        <div className="border-b px-4 pb-3 pt-4 pr-16 font-sans">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <Target className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            {title}
          </SheetTitle>
          <SheetDescription className="mt-1 text-[13px] leading-snug">{description}</SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto bg-background px-3 py-4 sm:px-4">
          {!data && !failed && (
            <p className="flex items-center gap-2 font-sans text-sm text-muted-foreground" role="status">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading the questions…
            </p>
          )}
          {!data && failed && (
            <p className="font-sans text-sm text-muted-foreground" role="alert">
              Could not load them here. {bankLink("Open them in the bank")}.
            </p>
          )}
          {data && data.rows.length === 0 && (
            <p className="font-sans text-sm text-muted-foreground">
              No questions to show here. {bankLink("Open the bank")}.
            </p>
          )}
          {data && data.rows.length > 0 && (
            <div className="space-y-3">
              <p className="font-sans text-sm text-muted-foreground">Try each one first, then pick your answer.</p>
              <QuestionListView
                questions={data.rows}
                pageOffset={0}
                canEdit={false}
                isLoggedIn={signedIn}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}
                includeExam={false}
                breadcrumbFixed={{ subject: true, chapter: true }}
                hideCart
              />
              {data.more && (
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11 w-full"
                  onClick={showMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Loading…
                    </>
                  ) : (
                    `Show ${Math.min(DRILL_PAGE_SIZE, data.total - data.rows.length)} more (${data.rows.length} of ${data.total})`
                  )}
                </Button>
              )}
              {data && failed && (
                <p className="font-sans text-sm text-muted-foreground" role="alert">
                  Could not load more here. {bankLink("Open the rest in the bank")}.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-4 py-1 font-sans">
          <span className="text-xs text-muted-foreground">Close to go back to your notes</span>
          <Link
            href={fullHref}
            prefetch={false}
            onClick={onFullPage}
            className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open in the bank
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
