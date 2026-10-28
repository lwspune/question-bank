"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { readExamSlugFromCookieString } from "@/lib/exam/examNav";
import { learnComingSoonFor } from "@/lib/learn/comingSoon";

/**
 * "Lessons for <exam> are coming soon" above the course list, for a visitor whose exam has no
 * course yet (their Learn tab lands here). Read from the cookie in the browser, like the header,
 * so /learn stays one cached page for everyone; nothing renders until the cookie is read.
 */
export default function LearnComingSoon() {
  const [exam, setExam] = useState<string | null>(null);
  useEffect(() => {
    setExam(learnComingSoonFor(readExamSlugFromCookieString(document.cookie)));
  }, []);
  if (!exam) return null;
  return (
    <p className="mb-6 flex items-start gap-2 rounded-xl border bg-card p-4 text-sm text-foreground">
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
      <span>
        Lessons for {exam} are coming soon. Here&apos;s what&apos;s ready now:
      </span>
    </p>
  );
}
