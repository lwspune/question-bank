import KatexRenderer from "@/components/math/KatexRenderer";
import { AlertTriangle } from "lucide-react";

type Props = {
  title: string;
  body: string;
  presentMode?: boolean;
};

/**
 * Distinct warning-style callout for subtopic-specific gotchas. Amber/destructive
 * tone separates these visually from positive concept cards and formulas.
 */
export default function TrapCallout({ title, body, presentMode }: Props) {
  return (
    <div
      className={
        "rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 " +
        (presentMode ? "p-8" : "p-4")
      }
    >
      <p
        className={
          "flex items-start gap-2 font-semibold text-amber-900 dark:text-amber-200 " +
          (presentMode ? "text-2xl sm:text-3xl" : "text-sm")
        }
      >
        <AlertTriangle
          className={
            "shrink-0 " + (presentMode ? "mt-1 h-7 w-7" : "mt-0.5 h-4 w-4")
          }
          aria-hidden
        />
        <KatexRenderer text={title} />
      </p>
      <div
        className={
          "font-serif leading-relaxed text-amber-900/90 dark:text-amber-100/90 " +
          (presentMode
            ? "mt-5 text-xl sm:text-2xl md:text-3xl leading-snug"
            : "mt-2 text-sm")
        }
      >
        <KatexRenderer text={body} />
      </div>
    </div>
  );
}
