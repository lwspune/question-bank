/**
 * Convex (converging) lens ray diagram — object beyond 2F. Ray 1: parallel
 * to axis, refracts through the far focus F'. Ray 2: through the optic
 * centre, passes undeviated. They meet to form a real, inverted, diminished
 * image between F' and 2F' on the far side. Markers F, 2F, O, F', 2F'.
 *
 * Server component — static 2-D.
 */
export default function OptConvexLensRays() {
  const ox = 280; // optic centre x (lens plane)
  const cy = 150;
  const f = 80;
  const F1 = ox - f; // near focus
  const F2 = ox + f; // far focus F'
  const twoF1 = ox - 2 * f;
  const twoF2 = ox + 2 * f;

  // Object beyond 2F (upright)
  const objX = 60;
  const objTop = cy - 70;

  // Image: real, inverted, diminished between F' and 2F'
  const imgX = ox + 130;
  const imgBot = cy + 34;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Convex lens with an object beyond twice the focal length forming a real inverted diminished image between F prime and 2F prime"
      >
        <defs>
          <marker id="cl-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* principal axis */}
        <line x1={30} y1={cy} x2={530} y2={cy} className="stroke-indigo-300/70" strokeWidth="1" strokeDasharray="4 4" />

        {/* lens — biconvex shape */}
        <path d={`M ${ox} ${cy - 78} C ${ox + 22} ${cy - 40}, ${ox + 22} ${cy + 40}, ${ox} ${cy + 78} C ${ox - 22} ${cy + 40}, ${ox - 22} ${cy - 40}, ${ox} ${cy - 78} Z`} className="fill-sky-300/30 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />

        {/* focal markers */}
        {[
          { x: F1, label: "F" },
          { x: twoF1, label: "2F" },
          { x: F2, label: "F'" },
          { x: twoF2, label: "2F'" },
        ].map((m) => (
          <g key={m.label}>
            <circle cx={m.x} cy={cy} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
            <text x={m.x} y={cy + 18} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">{m.label}</text>
          </g>
        ))}
        <text x={ox} y={cy - 86} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">O</text>

        {/* object */}
        <line x1={objX} y1={cy} x2={objX} y2={objTop} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#cl-arrow)" />
        <text x={objX} y={objTop - 6} textAnchor="middle" fontSize="11" className="fill-emerald-700 dark:fill-emerald-300">object</text>

        {/* ray 1: parallel to axis, then through far focus to image tip */}
        <line x1={objX} y1={objTop} x2={ox} y2={objTop} className="stroke-indigo-500/80" strokeWidth="1.6" />
        <line x1={ox} y1={objTop} x2={imgX} y2={imgBot} className="stroke-indigo-500/80" strokeWidth="1.6" />

        {/* ray 2: straight through the optic centre, undeviated */}
        <line x1={objX} y1={objTop} x2={imgX} y2={imgBot} className="stroke-rose-500/70" strokeWidth="1.6" />

        {/* image (inverted) */}
        <line x1={imgX} y1={cy} x2={imgX} y2={imgBot} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#cl-arrow)" />
        <text x={imgX} y={imgBot + 16} textAnchor="middle" fontSize="11" className="fill-rose-700 dark:fill-rose-300">image</text>

        <text x={280} y={290} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">Object beyond 2F: real, inverted, diminished image between F′ and 2F′</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        A convex lens converges light. The parallel ray bends through the far
        focus; the ray through the optic centre goes straight. Where they cross
        is the image.
      </p>
    </div>
  );
}
