/**
 * A small progress ring (2026-11-10): the Progress tiles' "41 fixed · 23 to go"
 * and "12 of 31 subtopics mastered". Decorative: the tile prints both numbers,
 * so the ring stays out of the accessibility tree.
 */
const R = 18;
const C = 2 * Math.PI * R;

export default function ProgressRing({ share }: { share: number }) {
  const s = Math.min(1, Math.max(0, share));
  return (
    <svg viewBox="0 0 46 46" className="h-11 w-11 shrink-0 -rotate-90" aria-hidden>
      <circle cx="23" cy="23" r={R} fill="none" strokeWidth="6" className="stroke-muted" />
      {s > 0 && (
        <circle
          cx="23"
          cy="23"
          r={R}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - s)}
          className="stroke-emerald-500"
        />
      )}
    </svg>
  );
}
