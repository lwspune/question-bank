/**
 * Static figure: work as a dot product — only the component of the force along
 * the displacement does work, W = F·d = |F||d|cosθ.
 *
 * Pedagogical aim: the dot product picks out the aligned component; force
 * perpendicular to the motion does no work. Server component.
 */

const O: [number, number] = [44, 150];
const D: [number, number] = [300, 150];
const FLEN = 120;
const THETA = (35 * Math.PI) / 180;
const Ftip: [number, number] = [O[0] + FLEN * Math.cos(THETA), O[1] - FLEN * Math.sin(THETA)];
const foot: [number, number] = [Ftip[0], O[1]]; // projection of F onto d

const ARC = Array.from({ length: 10 }, (_, i) => {
  const a = -(THETA * i) / 9;
  return [O[0] + 34 * Math.cos(a), O[1] + 34 * Math.sin(a)] as const;
});
const arcPath = ARC.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

export default function DotProductWork() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · work = F · d = |F||d| cos θ
      </p>

      <svg viewBox="0 0 340 196" className="block w-full h-auto" role="img" aria-label="Force at an angle to a displacement, with the aligned component that does work">
        <defs>
          <marker id="dw-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
          <marker id="dw-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
        </defs>

        {/* displacement d */}
        <line x1={O[0]} y1={O[1]} x2={D[0]} y2={D[1]} stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} markerEnd="url(#dw-emerald)" />
        {/* aligned component (the part that does work) */}
        <line x1={O[0]} y1={O[1]} x2={foot[0]} y2={foot[1]} stroke="currentColor" className="text-indigo-600 dark:text-indigo-400" strokeWidth={5} strokeOpacity={0.45} />
        {/* perpendicular drop */}
        <line x1={Ftip[0]} y1={Ftip[1]} x2={foot[0]} y2={foot[1]} stroke="currentColor" className="text-rose-500/70" strokeWidth={1} strokeDasharray="3 2" />
        {/* force F */}
        <line x1={O[0]} y1={O[1]} x2={Ftip[0]} y2={Ftip[1]} stroke="currentColor" className="text-amber-600 dark:text-amber-400" strokeWidth={2.5} markerEnd="url(#dw-amber)" />
        {/* angle */}
        <path d={arcPath} fill="none" stroke="currentColor" className="text-foreground/70" strokeWidth={1.25} />
        <text x={O[0] + 44} y={O[1] - 12} className="fill-foreground text-[11px] font-medium">θ</text>

        <text x={Ftip[0] + 6} y={Ftip[1] - 2} className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">F</text>
        <text x={D[0] - 8} y={D[1] + 16} textAnchor="end" className="fill-emerald-700 dark:fill-emerald-300 text-[12px] font-semibold">d</text>
        <text x={(O[0] + foot[0]) / 2} y={O[1] + 18} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">F cos θ</text>
        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Only the part of the force along the displacement does work: W = F · d = |F||d| cos θ. A force
        perpendicular to the motion (θ = 90°) does zero work; one opposing it (θ &gt; 90°) does negative work.
      </p>
    </div>
  );
}
