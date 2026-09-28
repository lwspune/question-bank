/**
 * Right triangle with its sides named FROM THE ANGLE θ — opposite, adjacent, hypotenuse — and the
 * other acute angle marked as 90° − θ.
 *
 * Why this gets a diagram in an otherwise algebraic chapter: two of the chapter's pages turn on
 * reading one picture two ways. The ratios page needs "which side is opposite θ" to be instant;
 * the complementary-angles page needs the observation that the side OPPOSITE θ is the side
 * ADJACENT to 90° − θ, which is the whole reason sin θ = cos(90° − θ). One triangle shows both.
 *
 * Server component — static 2-D, no interaction.
 */
export default function CdsTrigRightTriangle() {
  // Right angle at B (bottom-left), θ at C (bottom-right), 90° − θ at A (top-left).
  const A = { x: 90, y: 50 };
  const B = { x: 90, y: 250 };
  const C = { x: 350, y: 250 };
  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 300"
        className="w-full"
        role="img"
        aria-label="A right triangle with the right angle at the bottom left. The angle theta is at the bottom right. The vertical side is opposite theta, the bottom side is adjacent to theta, and the slanted side is the hypotenuse. The top angle is 90 degrees minus theta, and for that angle the vertical side is adjacent and the bottom side is opposite."
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          className="fill-white stroke-slate-700 dark:fill-slate-900 dark:stroke-slate-300"
          strokeWidth="2"
        />
        {/* right-angle mark at B */}
        <path d={`M ${B.x} ${B.y - 16} L ${B.x + 16} ${B.y - 16} L ${B.x + 16} ${B.y}`} fill="none" className="stroke-slate-700 dark:stroke-slate-300" strokeWidth="1.5" />
        {/* θ arc at C */}
        <path d={`M ${C.x - 40} ${C.y} A 40 40 0 0 1 ${C.x - 35} ${C.y - 18}`} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" />
        <text x={C.x - 62} y={C.y - 8} className="fill-indigo-700 text-[15px] font-semibold dark:fill-indigo-300">θ</text>
        {/* 90° − θ arc at A */}
        <path d={`M ${A.x} ${A.y + 36} A 36 36 0 0 0 ${A.x + 25} ${A.y + 26}`} fill="none" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
        <text x={A.x + 10} y={A.y + 62} className="fill-amber-700 text-[14px] font-semibold dark:fill-amber-300">90° − θ</text>

        {/* side labels, named from θ */}
        <text x={B.x - 80} y={150} className="fill-slate-800 text-[13px] dark:fill-slate-200">opposite θ</text>
        <text x={B.x - 80} y={168} className="fill-amber-700 text-[12px] dark:fill-amber-300">adjacent to 90° − θ</text>
        <text x={170} y={B.y + 22} className="fill-slate-800 text-[13px] dark:fill-slate-200">adjacent to θ</text>
        <text x={160} y={B.y + 40} className="fill-amber-700 text-[12px] dark:fill-amber-300">opposite 90° − θ</text>
        <text x={225} y={138} className="fill-slate-800 text-[13px] dark:fill-slate-200">hypotenuse</text>

        <text x={A.x - 18} y={A.y - 6} className="fill-slate-600 text-[13px] dark:fill-slate-400">A</text>
        <text x={B.x - 18} y={B.y + 16} className="fill-slate-600 text-[13px] dark:fill-slate-400">B</text>
        <text x={C.x + 6} y={C.y + 16} className="fill-slate-600 text-[13px] dark:fill-slate-400">C</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        sin θ = opposite ÷ hypotenuse = cos (90° − θ): the same side, named from the other angle.
      </p>
    </div>
  );
}
