"use client";

/**
 * English / मराठी / Both, shown above a list of board questions only when at
 * least one of them carries the board's Marathi-medium print. An English-only
 * page (CBSE, most chapters) renders nothing, so it stays as it was.
 */
import { QuestionLangSwitch } from "@/components/i18n/BilingualText";
import { hasMarathi } from "@/lib/i18n/bilingual";
import type { BoardQuestion } from "@/lib/board/query";
import { cn } from "@/lib/utils";

export default function BoardLangSwitch({
  questions,
  className,
}: {
  questions: Iterable<Pick<BoardQuestion, "translations">>;
  className?: string;
}) {
  for (const q of questions) {
    if (hasMarathi(q)) return <QuestionLangSwitch className={cn("flex justify-end", className)} />;
  }
  return null;
}
