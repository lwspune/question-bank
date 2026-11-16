"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isLangChecked,
  langHeading,
  langLabel,
  switchLangs,
  type AltLang,
  type QuestionLang,
} from "@/lib/i18n/bilingual";

/**
 * English / मराठी (or हिन्दी) / Both — a segmented radio group. Rendered only
 * where a question actually carries a translation; the choice is shared
 * page-wide by useQuestionLang, so the caller owns the state. `alt` is the
 * page's second language (Marathi unless told otherwise).
 */
export default function LanguageSwitch({
  value,
  onChange,
  alt = "mr",
  className,
  size = "sm",
}: {
  value: QuestionLang;
  onChange: (lang: QuestionLang) => void;
  alt?: AltLang;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="radiogroup"
      aria-label={`Question language / ${langHeading(alt)}`}
      className={cn("inline-flex items-center gap-1 font-sans", className)}
    >
      <Languages className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      <div className="inline-flex rounded-md border bg-background p-0.5">
        {switchLangs(alt).map((lang) => (
          <button
            key={lang}
            type="button"
            role="radio"
            aria-checked={isLangChecked(lang, value, alt)}
            lang={lang === alt ? alt : undefined}
            onClick={() => onChange(lang)}
            className={cn(
              "rounded px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              size === "sm" ? "h-7 text-xs" : "h-9 text-sm",
              isLangChecked(lang, value, alt) ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {langLabel(lang, alt)}
          </button>
        ))}
      </div>
    </div>
  );
}
