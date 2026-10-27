/**
 * A circular progress meter (Concept Ladder's ProgressRing), in PYQ Vault's colours. The label is
 * for screen readers; show the numbers as text beside it too.
 */
export function ProgressRing({
  value,
  max,
  size = 64,
  stroke = 6,
  label,
  children,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label: string;
  /** Shown in the middle of the ring (a count). */
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const done = max === 0 ? 0 : Math.min(value / max, 1);
  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-muted" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={done === 1 ? "stroke-emerald-500" : "stroke-brand"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * done} ${c}`}
          style={{ transition: "stroke-dasharray 600ms ease-out" }}
        />
      </svg>
      {children !== undefined && <span className="absolute inset-0 grid place-items-center text-xs font-semibold tabular-nums">{children}</span>}
    </span>
  );
}
