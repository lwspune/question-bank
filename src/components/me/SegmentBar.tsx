import { cn } from "@/lib/utils";
import type { Segment } from "@/lib/me/charts";

/**
 * A bar split into coloured parts (2026-11-10): Review's reasons, the map's
 * bands, a weak spot's size. Decorative by design: every caller prints the
 * same counts in words beside it, so colour never carries a number alone
 * (WCAG 1.4.1), and the bar stays out of the accessibility tree.
 *
 * `width` is the filled share of the track (a row against the biggest row);
 * the parts split that filled length. It grows in once on load, and stands
 * still under Reduce motion.
 */
export default function SegmentBar<K extends string>({
  parts,
  colorOf,
  width = 100,
  size = "md",
  className,
}: {
  parts: readonly Segment<K>[];
  colorOf: Record<K, string>;
  width?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (parts.length === 0 || width <= 0) return null;
  return (
    <div
      aria-hidden
      className={cn(
        "w-full overflow-hidden rounded-full bg-muted",
        size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2",
        className
      )}
    >
      <div className="flex h-full origin-left motion-safe:animate-grow-x" style={{ width: `${width}%` }}>
        {parts.map((p) => (
          <span key={p.key} className={cn("h-full", colorOf[p.key])} style={{ width: `${p.pct}%` }} />
        ))}
      </div>
    </div>
  );
}
