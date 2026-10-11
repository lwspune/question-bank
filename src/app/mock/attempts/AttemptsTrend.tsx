import { TrendingDown, TrendingUp } from "lucide-react";
import { sparkline, type trendFor } from "@/lib/mocks/attemptHistory";

type Trend = NonNullable<ReturnType<typeof trendFor>>;

const W = 320;
const H = 80;
const PAD = 10;

function fmt(n: number): string {
  // Two decimals at most, trailing zeros dropped: 118.38, 96.7, 120.
  return String(Math.round(n * 100) / 100);
}

/**
 * A subject's marks over its last few full papers (2026-10-11). Server-rendered
 * SVG, no chart library: six dots and a line. Abandoned papers are already left
 * out by trendFor, so a dip here is a paper the student actually sat.
 */
export default function AttemptsTrend({ label, trend }: { label: string; trend: Trend }) {
  const scores = trend.points.map((p) => p.score);
  const pts = sparkline(scores, W, H, PAD);
  const first = scores[0];
  const last = scores[scores.length - 1];
  const change = Math.round((last - first) * 100) / 100;
  const lastPt = pts[pts.length - 1];
  const rising = lastPt.y <= pts[pts.length - 2].y;

  return (
    <section className="mt-5 rounded-xl border bg-card p-4" aria-labelledby="trend-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="trend-heading" className="text-sm font-semibold">
          {label}, your marks
        </h2>
        {change > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />+{fmt(change)} since your first
          </span>
        ) : change < 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <TrendingDown className="h-3.5 w-3.5" aria-hidden />
            {fmt(-change)} below your first
          </span>
        ) : null}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H + 14}`}
        className="mt-2 h-auto w-full"
        role="img"
        aria-label={`Marks out of ${fmt(trend.maxScore)} on your last ${scores.length} papers, oldest first: ${scores.map(fmt).join(", ")}`}
      >
        <line x1="0" y1={H} x2={W} y2={H} className="stroke-border" />
        <polyline
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-brand"
          points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        />
        {pts.map((p, i) => (
          <circle key={trend.points[i].attemptId} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 4.5 : 3} className="fill-brand" />
        ))}
        {/* The newest score's label sits on the side the line does not come
            from: above-left when the last step rose, below-left when it fell. */}
        <text
          x={lastPt.x - 8}
          y={rising ? Math.max(12, lastPt.y - 8) : Math.min(H - 2, lastPt.y + 16)}
          textAnchor="end"
          className="fill-foreground text-[10px] font-semibold"
        >
          {fmt(last)}
        </text>
      </svg>
      <p className="text-xs text-muted-foreground">
        Your last {scores.length} full papers, out of {fmt(trend.maxScore)}, oldest on the left. Papers left under a
        fifth answered are not counted.
      </p>
    </section>
  );
}
