import { OPTION_LABELS, type ItemStatAggregate, type OptionLabel } from "@/lib/itemStats/types";
import { itemStatChip } from "@/lib/itemStats/leads";
import { cn } from "@/lib/utils";

/**
 * How students have actually performed on a bank question.
 *
 * STAFF ONLY. Deliberately not shown to students: learning that 88% of a cohort
 * missed a question before attempting it is an anchor, not information. See
 * ITEM_STATS.md decision 5.
 *
 * The number is pooled across every source — a proctored tracker sitting and an
 * online /mock alike — because the bank is a global app and the question being
 * asked here is "is this item any good", for which a broader sample is less
 * biased, not more. Cohort analytics live in the tracker.
 */

const SOURCE_LABEL: Record<string, string> = {
  tracker: "Institute (OMR)",
  vault_mock: "Online mock",
};

/** The collapsed-card chip: one number, `n` always visible. */
export function ItemStatChip({ agg }: { agg: ItemStatAggregate | undefined }) {
  const chip = itemStatChip(agg ?? null);
  if (!chip) return null;
  return (
    <>
      <span className="shrink-0" aria-hidden>
        ·
      </span>
      <span
        className={cn("shrink-0 tabular-nums", chip.provisional && "opacity-60")}
        title={
          chip.provisional
            ? `${chip.pct}% of ${chip.n} attempts answered this correctly — provisional, fewer than 20 attempts`
            : `${chip.pct}% of ${chip.n} attempts answered this correctly`
        }
      >
        {chip.pct}% correct
        <span className="ml-1 text-muted-foreground/70">n={chip.n}</span>
      </span>
    </>
  );
}

/**
 * The expanded-card panel. The choice distribution is the actual review tool —
 * it is where a wrong-key LEAD becomes visible in place.
 */
export function ItemStatDetail({
  agg,
  keyLabel,
}: {
  agg: ItemStatAggregate | undefined;
  keyLabel: OptionLabel | null;
}) {
  if (!agg) return null;

  const chosen = OPTION_LABELS.reduce((sum, l) => sum + agg.choiceCounts[l], 0);
  const topDistractor = OPTION_LABELS.filter((l) => l !== keyLabel).reduce<number>(
    (max, l) => Math.max(max, agg.choiceCounts[l]),
    0
  );
  const keyCount = keyLabel ? agg.choiceCounts[keyLabel] : 0;
  // A lead, never a verdict: it means the key is wrong, OR the question is hard
  // and the distractor is a well-built trap, OR there is a misconception worth
  // teaching to. The data cannot separate them.
  const flagged = keyLabel !== null && chosen > 0 && topDistractor > keyCount;

  return (
    <div className="rounded-md border border-dashed bg-background/60 p-3 font-sans text-xs">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-medium">Student performance</span>
        <span className="tabular-nums text-muted-foreground">
          {Math.round(agg.pValue * 100)}% correct · {agg.attempted} attempt
          {agg.attempted === 1 ? "" : "s"} · {agg.sittings} sitting
          {agg.sittings === 1 ? "" : "s"}
        </span>
        {agg.attempted < 20 && (
          <span className="text-muted-foreground/70">provisional — under 20 attempts</span>
        )}
      </div>

      {chosen > 0 ? (
        <ul className="space-y-1">
          {OPTION_LABELS.map((label) => {
            const n = agg.choiceCounts[label];
            const pct = chosen > 0 ? (n / chosen) * 100 : 0;
            const isKey = label === keyLabel;
            return (
              <li key={label} className="flex items-center gap-2">
                <span className="w-4 shrink-0 font-mono">{label}</span>
                <span className="h-2 w-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <span
                    className={cn("block h-full", isKey ? "bg-brand" : "bg-muted-foreground/40")}
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{n}</span>
                {/* The key is named in TEXT, never by colour alone. */}
                {isKey && <span className="shrink-0 font-medium text-brand-accent">key</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          Numeric answer — no option distribution.
        </p>
      )}

      {flagged && (
        <p className="mt-2 text-muted-foreground">
          A distractor outpulled the key. That can mean the key is wrong, that the
          distractor is a well-built trap, or that there is a shared misconception —
          worth a read, not a conclusion.
        </p>
      )}

      {agg.verdictMismatch !== null && agg.verdictMismatch > 0 && (
        <p className="mt-2 rounded bg-amber-500/10 px-2 py-1 text-amber-800 dark:text-amber-400">
          <span className="font-medium">
            {agg.verdictMismatch} attempt{agg.verdictMismatch === 1 ? "" : "s"} were marked
            against a different answer than the key.
          </span>{" "}
          A mis-keyed or dropped question in the sitting it came from — unlike a winning
          distractor, this one is not ambiguous.
        </p>
      )}

      <dl className="mt-2 space-y-0.5 text-muted-foreground">
        {agg.discrimination !== null && (
          <div className="flex gap-2">
            <dt className="w-28 shrink-0">Discrimination</dt>
            <dd className="tabular-nums">
              {agg.discrimination >= 0 ? "+" : ""}
              {agg.discrimination.toFixed(2)}
              {agg.discrimination < 0 && " — rewards the weaker half"}
            </dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="w-28 shrink-0">Where from</dt>
          <dd>
            {agg.bySource
              .map(
                (s) =>
                  `${SOURCE_LABEL[s.source] ?? s.source} ${Math.round(s.pValue * 100)}% (n=${s.attempted})`
              )
              .join(" · ")}
          </dd>
        </div>
        {agg.exposure && (
          <div className="flex gap-2">
            <dt className="w-28 shrink-0">Already sat by</dt>
            <dd>
              {agg.exposure.cohorts.join(" · ")}
              {agg.exposure.lastSatAt &&
                ` — last ${new Date(agg.exposure.lastSatAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}
            </dd>
          </div>
        )}
        {agg.staleDropped > 0 && (
          <div className="flex gap-2">
            <dt className="w-28 shrink-0">Excluded</dt>
            <dd>
              {agg.staleDropped} sitting{agg.staleDropped === 1 ? "" : "s"} measured before this
              question was last edited
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
