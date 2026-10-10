"use client";

import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExamSlug } from "@/lib/exam/examContext";
import { examGapNotice } from "@/lib/exam/examGap";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

/**
 * "No notes for MPSC Group B & C yet", with links to what that exam does have,
 * for a signed-in student none of whose exams is on this page (see examGap.ts).
 *
 * A client island: /notes, /guide and /board are cached and shared, so the page
 * itself reads no identity. The first render is empty, so hydration matches the
 * cached HTML; anonymous visitors and students whose exam is covered never see it.
 */
export default function ExamGapNotice({ what, covered }: { what: string; covered: readonly ExamSlug[] }) {
  const { session } = useViewerSession();
  const notice = session ? examGapNotice(session.targetExams, covered) : null;
  if (!notice) return null;

  return (
    <aside aria-label={`No ${what} for ${notice.displayName}`} className="mb-6 rounded-xl border bg-card p-4 text-sm sm:p-5">
      <p className="flex items-start gap-2 font-medium text-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        No {what} for {notice.displayName} yet.
      </p>
      <p className="mt-1 pl-6 text-muted-foreground">What there is for {notice.displayName}:</p>
      <div className="mt-3 flex flex-wrap gap-2 pl-6">
        {notice.links.map((l) => (
          <Button key={l.href} asChild variant="outline" size="wrap">
            <Link href={l.href}>
              {l.label}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}
