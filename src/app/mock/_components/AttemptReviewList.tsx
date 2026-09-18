import { Check, X, Minus, Gift } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import PresentButton from "@/components/present/PresentButton";
import { PresentRegistry } from "@/components/present/PresentRegistry";
import { fromReviewItem } from "@/lib/present/viewModel";
import type { ReviewItem } from "@/lib/mocks/service";

/**
 * The per-question review list for one attempt.
 *
 * ONE RENDERER, TWO CALLERS: the student's own result page
 * (/mock/attempt/[id]/result) and the superadmin's view of someone else's
 * attempt (/dashboard/students/[id]/attempt/[attemptId]). Extracted rather than
 * copied because "fix one renderer and not the other" is a failure this repo
 * has already paid for twice — most recently the pipe-table contract, where the
 * web and Word paths drifted for a year.
 *
 * It renders a ReviewItem and nothing else: no ownership check, no gates, no
 * feedback widgets. Authorization belongs to the two routes, which resolve the
 * attempt through different clients (anon + own-row RLS vs service-role behind
 * a superadmin gate).
 *
 * `BlockText`, not `KatexRenderer`, for every long-form field — stem, context
 * and solution can all carry a GFM pipe-table, and KatexRenderer prints one as
 * raw `| p | q |`. Options stay on KatexRenderer: they don't support tables.
 */
export default function AttemptReviewList({
  items,
  supabaseUrl,
}: {
  items: ReviewItem[];
  supabaseUrl: string;
}) {
  return (
    // Registry so a teacher walking the class through a paper can step from one
    // question to the next inside the projection overlay.
    <PresentRegistry>
      <ol className="mt-4 space-y-4">
        {items.map((item) => (
          <ReviewCard key={item.position} item={item} supabaseUrl={supabaseUrl} />
        ))}
      </ol>
    </PresentRegistry>
  );
}

function ReviewCard({ item, supabaseUrl }: { item: ReviewItem; supabaseUrl: string }) {
  const border = item.grace
    ? "border-l-amber-500"
    : item.verdict === 1
      ? "border-l-emerald-500"
      : item.verdict === -1
        ? "border-l-red-500"
        : "border-l-muted-foreground/40";
  return (
    /* The findings card at the top of the result page links to #q<n>, so each
       card is the anchor for its own question. Position, not question id: it
       is what the student saw on the paper and what the card names. */
    <li id={`q${item.position}`} className={cn("scroll-mt-20 rounded-lg border border-l-4 bg-card p-4", border)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted-foreground">Q{item.position}</span>
        <PresentButton
          question={fromReviewItem(item)}
          order={item.position}
          supabaseUrl={supabaseUrl}
          className="ml-auto"
        />
        {item.grace ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            Grace — awarded to all
          </span>
        ) : (
          <VerdictBadge verdict={item.verdict} />
        )}
      </div>
      {item.grace && (
        <p className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          This question was officially dropped (or marked bonus) by NTA — every candidate was
          awarded full marks regardless of their answer, so there is no correct option. See the
          note in the solution for the reason.
        </p>
      )}
      {item.context && (
        <div className="mt-2 border-l-2 border-muted pl-3 font-serif text-sm italic text-muted-foreground">
          <BlockText text={item.context} />
        </div>
      )}
      <div className="mt-2 font-serif text-[15px] leading-relaxed [&_.katex]:max-w-full">
        <BlockText text={item.text} />
      </div>
      {item.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={publicImageUrl(supabaseUrl, item.imageUrl)} alt="Question diagram" className="mt-3 max-h-60 w-auto rounded border" />
      )}

      {item.format === "numeric" ? (
        /* JEE Section-B: no options to paint, so show the two values side by
           side. Rendered from the review row rather than re-derived here, so it
           cannot disagree with the verdict badge above it. */
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div
            className={cn(
              "rounded-md border p-2 text-sm",
              item.verdict === 1 && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
              item.verdict === -1 && "border-red-400 bg-red-50 dark:bg-red-950/30"
            )}
          >
            <dt className="text-xs font-medium text-muted-foreground">Your answer</dt>
            <dd className="mt-0.5 font-mono text-base">
              {item.numericResponse === null ? (
                <span className="text-muted-foreground">Not answered</span>
              ) : (
                item.numericResponse
              )}
            </dd>
          </div>
          <div className="rounded-md border border-emerald-400 bg-emerald-50 p-2 text-sm dark:bg-emerald-950/30">
            <dt className="text-xs font-medium text-muted-foreground">Correct answer</dt>
            <dd className="mt-0.5 font-mono text-base">
              {item.correctNumeric === null ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                item.correctNumeric
              )}
            </dd>
          </div>
        </dl>
      ) : (
      <ul className="mt-3 space-y-1.5">
        {item.options.map((opt) => {
          // Grace questions have no valid key (NTA awarded all) — never paint an
          // option correct/wrong; just neutrally mark what the student picked.
          const isCorrect = !item.grace && opt.isCorrect;
          const isPicked = item.selectedLabel === opt.label;
          return (
            <li
              key={opt.label}
              className={cn(
                "flex items-start gap-2 rounded-md border p-2 text-sm",
                isCorrect && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                isPicked && !isCorrect && !item.grace && "border-red-400 bg-red-50 dark:bg-red-950/30",
                isPicked && item.grace && "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
              )}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {opt.label}
              </span>
              <div className="min-w-0 flex-1 overflow-x-auto font-serif [&_.katex]:max-w-full">
                <KatexRenderer text={opt.text} />
              </div>
              {isCorrect && <span className="shrink-0 text-xs font-medium text-emerald-700 dark:text-emerald-400">Correct</span>}
              {isPicked && !isCorrect && (
                <span className={cn("shrink-0 text-xs font-medium", item.grace ? "text-amber-700 dark:text-amber-400" : "text-red-700 dark:text-red-400")}>Your pick</span>
              )}
            </li>
          );
        })}
      </ul>
      )}

      {item.solution && (
        <details className="mt-3 rounded-md border border-dashed bg-muted/20 p-3 text-sm">
          <summary className="cursor-pointer select-none font-sans text-xs font-medium text-brand-accent">Show solution</summary>
          <div className="mt-2 font-serif">
            <BlockText text={item.solution} />
            {item.solutionImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={publicImageUrl(supabaseUrl, item.solutionImageUrl)} alt="Solution diagram" className="mt-3 max-h-60 w-auto rounded border" />
            )}
          </div>
        </details>
      )}
    </li>
  );
}

function VerdictBadge({ verdict }: { verdict: 1 | -1 | 0 }) {
  if (verdict === 1)
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" aria-hidden />Correct</span>;
  if (verdict === -1)
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400"><X className="h-3.5 w-3.5" aria-hidden />Wrong</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground"><Minus className="h-3.5 w-3.5" aria-hidden />Skipped</span>;
}
