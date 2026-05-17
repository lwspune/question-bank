import KatexRenderer from "@/components/math/KatexRenderer";
import { Lightbulb, NotebookPen } from "lucide-react";
import type { AuthoredExample } from "@/app/notes/_types";

type Props = {
  example: AuthoredExample;
  presentMode?: boolean;
};

/**
 * Inline worked example authored alongside a concept unit. Renders the
 * prompt, numbered solution steps, and the final answer.
 *
 * Distinct from WorkedExampleCard (which renders a bank PYQ with options +
 * reveal logic). This component is "always visible" — the steps are the
 * teaching, so we don't hide them behind a click. KaTeX-aware everywhere.
 */
export default function WorkedExampleAuthored({ example, presentMode }: Props) {
  return (
    <div
      className={
        "rounded-lg border bg-card " +
        (presentMode ? "p-8" : "p-5")
      }
    >
      <p
        className={
          "flex items-center gap-1.5 font-semibold uppercase tracking-wide text-primary " +
          (presentMode ? "text-base sm:text-lg" : "text-xs")
        }
      >
        <NotebookPen
          className={presentMode ? "h-5 w-5" : "h-3.5 w-3.5"}
          aria-hidden
        />
        Worked example
      </p>

      <div
        className={
          "mt-3 font-serif text-foreground leading-relaxed " +
          (presentMode ? "text-2xl sm:text-3xl" : "text-base")
        }
      >
        <KatexRenderer text={example.prompt} />
      </div>

      <ol
        className={
          "mt-4 list-decimal space-y-2 pl-6 font-serif text-muted-foreground " +
          (presentMode ? "text-xl sm:text-2xl space-y-3" : "text-sm")
        }
      >
        {example.steps.map((step, i) => (
          <li key={i} className="leading-relaxed">
            <KatexRenderer text={step} />
          </li>
        ))}
      </ol>

      <div
        className={
          "mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-50 dark:bg-emerald-950/30 " +
          (presentMode ? "px-5 py-3 text-2xl sm:text-3xl" : "px-3 py-1.5 text-sm")
        }
      >
        <Lightbulb
          className={
            "text-emerald-700 dark:text-emerald-400 " +
            (presentMode ? "h-6 w-6" : "h-4 w-4")
          }
          aria-hidden
        />
        <span className="font-semibold text-emerald-800 dark:text-emerald-200">
          Answer:
        </span>
        <span className="font-serif text-emerald-900 dark:text-emerald-100">
          <KatexRenderer text={example.answer} />
        </span>
      </div>
    </div>
  );
}
