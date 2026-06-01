import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  stats: Stat[];
  className?: string;
};

/**
 * A horizontal row of big-number stats used in guide page heroes.
 * On mobile, wraps to a 2-column grid.
 */
export default function StatBlock({ stats, className }: Props) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6",
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <dt className="order-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {s.label}
          </dt>
          <dd className="order-1 text-2xl font-semibold tabular-nums tracking-tight text-brand-accent sm:text-3xl">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
