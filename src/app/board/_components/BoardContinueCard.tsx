"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { boardContinueTarget, type BoardContinue, type BoardHubChapterRef } from "@/lib/board/hub";

/**
 * "Continue" on a board exam's hub: the chapter, and book section, of the last
 * board question the student answered in THIS exam.
 *
 * A client island so the hub stays cached. It reads the student's own activity
 * (own-row RLS, migration 0052): the last 20 board answers, newest first, then
 * those questions' chapters, and takes the newest one this hub lists, so an
 * answer on another board's chapter does not hide the card. Signed-out
 * visitors, and students with nothing here yet, see nothing.
 */
const RECENT = 20;

export default function BoardContinueCard({ chapters }: { chapters: Record<string, BoardHubChapterRef> }) {
  const { signedIn, loading } = useSignedIn();
  const [target, setTarget] = useState<BoardContinue | null>(null);

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    (async () => {
      const sb = createSupabaseBrowserClient();
      const { data: acts } = await sb
        .from("user_activity")
        .select("ref_id")
        .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
        .eq("metadata->>surface", "board")
        .order("created_at", { ascending: false })
        .limit(RECENT);
      const ids = [...new Set((acts ?? []).map((a) => a.ref_id as string | null).filter((id): id is string => !!id))];
      if (ids.length === 0) return;
      const { data: qs } = await sb.from("questions").select("id, chapter_id, section_label").in("id", ids);
      const byId = new Map((qs ?? []).map((q) => [q.id as string, q]));
      for (const id of ids) {
        const q = byId.get(id);
        const t = q
          ? boardContinueTarget(
              { chapterId: q.chapter_id as string, sectionLabel: (q.section_label as string | null) ?? null },
              chapters
            )
          : null;
        if (t) {
          if (active) setTarget(t);
          return;
        }
      }
    })().catch(() => {
      /* the hub works without the card */
    });
    return () => {
      active = false;
    };
  }, [loading, signedIn, chapters]);

  if (!target) return null;
  return (
    <section aria-label="Continue" className="mb-6 rounded-xl border-2 border-brand/70 bg-card p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-accent">Continue</p>
      <p className="mt-1 text-sm text-muted-foreground">{target.subjectName}</p>
      <p className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg">
        {target.chapterName}
        {target.sectionLabel ? ` · ${target.sectionLabel}` : ""}
      </p>
      <Link
        href={target.href}
        className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Continue
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}
