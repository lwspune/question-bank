/**
 * Concave mirror ray diagram — object beyond the centre of curvature C.
 * Two standard rays meet to form a real, inverted, diminished image
 * between F and C. Ray 1: parallel to axis, reflects through F. Ray 2:
 * passes through F, reflects parallel to axis. Their intersection fixes
 * the image tip. Labels P (pole), F (focus), C (centre of curvature).
 *
 * Server component — static 2-D.
 */
export default function OptConcaveMirrorRays() {
  const cx = 460; // pole / mirror plane (on the right)
  const cy = 150;
  const Fx = 350; // focus
  const Cx = 240; // centre of curvature

  // Object beyond C (upright)
  const objX = 110;
  const objTop = cy - 70;

  // Image tip (real, inverted, diminished) between F and C — chosen for a clean picture
  const imgX = 290;
  const imgBot = cy + 38;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Concave mirror with an object beyond the centre of curvature forming a real inverted diminished image between the focus and centre of curvature"
      >
        <defs>
          <marker id="cm-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* principal axis */}
        <line x1={40} y1={cy} x2={520} y2={cy} className="stroke-indigo-300/70" strokeWidth="1" strokeDasharray="4 4" />

        {/* mirror (concave arc opening left) */}
        <path d={`M ${cx} ${cy - 95} A 150 150 0 0 0 ${cx} ${cy + 95}`} className="fill-none stroke-slate-600 dark:stroke-slate-300" strokeWidth="3" />

        {/* C, F, P markers */}
        <circle cx={Cx} cy={cy} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={Cx} y={cy + 18} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">C</text>
        <circle cx={Fx} cy={cy} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        <text x={Fx} y={cy + 18} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">F</text>
        <text x={cx + 10} y={cy + 18} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">P</text>

        {/* object (upright arrow) */}
        <line x1={objX} y1={cy} x2={objX} y2={objTop} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#cm-arrow)" />
        <text x={objX} y={objTop - 6} textAnchor="middle" fontSize="11" className="fill-emerald-700 dark:fill-emerald-300">object</text>

        {/* ray 1: parallel to axis, hits mirror, reflects through F to image tip */}
        <line x1={objX} y1={objTop} x2={cx} y2={objTop} className="stroke-indigo-500/80" strokeWidth="1.6" />
        <line x1={cx} y1={objTop} x2={imgX} y2={imgBot} className="stroke-indigo-500/80" strokeWidth="1.6" />

        {/* ray 2: from object top through F, hits mirror, reflects parallel to axis */}
        <line x1={objX} y1={objTop} x2={cx} y2={imgBot} className="stroke-rose-500/70" strokeWidth="1.6" />
        <line x1={cx} y1={imgBot} x2={imgX} y2={imgBot} className="stroke-rose-500/70" strokeWidth="1.6" />

        {/* image (inverted arrow) */}
        <line x1={imgX} y1={cy} x2={imgX} y2={imgBot} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#cm-arrow)" />
        <text x={imgX} y={imgBot + 16} textAnchor="middle" fontSize="11" className="fill-rose-700 dark:fill-rose-300">image</text>

        <text x={280} y={290} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">Object beyond C: real, inverted, diminished image between F and C</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        A concave mirror converges light. With the object beyond C the image is
        real, inverted and smaller, formed between F and C.
      </p>
    </div>
  );
}
