import type { ComponentType } from "react";
import KatexRenderer from "@/components/math/KatexRenderer";
import FitWidth from "@/components/math/FitWidth";
import { Sigma } from "lucide-react";
import type { FormulaSpec } from "@/app/notes/_types";
import { legendSymbolText } from "@/lib/notes/printDoc";

type Props = {
  formula: FormulaSpec;
  /** Vestigial — scaled fonts for the (removed 2026-06-09) Present mode; no caller passes it now. */
  presentMode?: boolean;
  /** Draws the maths. Default: the client KatexRenderer. The /board revision
   *  sheet passes a server-drawn one with mhchem loaded (2026-11-09). */
  Katex?: ComponentType<{ text: string; className?: string }>;
};

/**
 * Boxed, prominent formula display with optional symbol legend. The box is
 * compact by default; `presentMode` scaled it for board legibility (now unused).
 */
export default function FormulaBlock({ formula, presentMode, Katex = KatexRenderer }: Props) {
  return (
    <div
      className={
        presentMode
          ? "rounded-xl border-2 border-brand/40 bg-brand/5 p-8"
          : "rounded-lg border-l-4 border-brand bg-brand/5 p-4"
      }
    >
      <p
        className={
          "flex items-center gap-1.5 font-semibold uppercase tracking-wide text-brand-accent " +
          (presentMode ? "text-base sm:text-lg" : "text-xs")
        }
      >
        <Sigma className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"} aria-hidden />
        {formula.label}
      </p>
      {/* A formula a little too wide for a phone shrinks to fit; a much wider
          one scrolls under the edge shadow (FitWidth, 2026-11-10). */}
      <FitWidth
        className={
          "scroll-cue-x leading-tight overflow-x-auto [&_.katex]:max-w-full " +
          (presentMode
            ? "mt-6 text-3xl sm:text-4xl md:text-5xl"
            : "mt-2 text-lg leading-relaxed")
        }
      >
        <Katex text={`\\[${formula.latex}\\]`} />
      </FitWidth>
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
                {/* The handout's rule: bare math ("F_b") is wrapped, prose stays text.
                    Rendered raw, 109 bare symbols printed as markup (2026-11-02). */}
                <Katex text={legendSymbolText(s.symbol)} />
              </span>
              <span aria-hidden>=</span>
              <span>
                <Katex text={s.meaning} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
