import KatexRenderer from "@/components/math/KatexRenderer";
import { Sigma } from "lucide-react";
import type { FormulaSpec } from "@/app/notes/_types";

type Props = {
  formula: FormulaSpec;
  /** Bump font size + spacing for Present mode. */
  presentMode?: boolean;
};

/**
 * Boxed, prominent formula display with optional symbol legend.
 * In read mode the box is compact; in Present mode it scales for board legibility.
 */
export default function FormulaBlock({ formula, presentMode }: Props) {
  return (
    <div
      className={
        presentMode
          ? "rounded-xl border-2 border-primary/40 bg-primary/5 p-8"
          : "rounded-lg border-l-4 border-primary bg-primary/5 p-4"
      }
    >
      <p
        className={
          "flex items-center gap-1.5 font-semibold uppercase tracking-wide text-primary " +
          (presentMode ? "text-base sm:text-lg" : "text-xs")
        }
      >
        <Sigma className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"} aria-hidden />
        {formula.label}
      </p>
      <div
        className={
          "leading-tight overflow-x-auto [&_.katex]:max-w-full " +
          (presentMode
            ? "mt-6 text-3xl sm:text-4xl md:text-5xl"
            : "mt-2 text-lg leading-relaxed")
        }
      >
        <KatexRenderer text={`\\[${formula.latex}\\]`} />
      </div>
      {formula.symbols && formula.symbols.length > 0 && (
        <ul
          className={
            "mt-4 grid gap-1 font-serif text-muted-foreground " +
            (presentMode ? "text-xl sm:text-2xl gap-2 mt-6" : "text-sm")
          }
        >
          {formula.symbols.map((s, i) => (
            <li key={i} className="flex flex-wrap items-baseline gap-2">
              <span className="font-semibold text-foreground">
                <KatexRenderer text={s.symbol} />
              </span>
              <span aria-hidden>=</span>
              <span>
                <KatexRenderer text={s.meaning} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
