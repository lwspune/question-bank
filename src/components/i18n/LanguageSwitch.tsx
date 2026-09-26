"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANG_LABELS, QUESTION_LANGS, type QuestionLang } from "@/lib/i18n/bilingual";

/**
 * English / मराठी / Both — a segmented radio group. Rendered only where a
 * question actually carries Marathi; the choice is shared page-wide by
 * useQuestionLang, so the caller owns the state.
 */
export default function LanguageSwitch({
  value,
  onChange,
  className,
  size = "sm",
}: {
  value: QuestionLang;
  onChange: (lang: QuestionLang) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Question language / प्रश्नाची भाषा"
      className={cn("inline-flex items-center gap-1 font-sans", className)}
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      <div className="inline-flex rounded-md border bg-background p-0.5">
        {QUESTION_LANGS.map((lang) => (
          <button
            key={lang}
            type="button"
            role="radio"
            aria-checked={value === lang}
            lang={lang === "mr" ? "mr" : undefined}
            onClick={() => onChange(lang)}
            className={cn(
              "rounded px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              size === "sm" ? "h-7 text-xs" : "h-9 text-sm",
              value === lang ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}
