/**
 * Prism dispersion — a beam of white light enters a triangular glass prism,
 * refracts at both faces, and emerges split into a spectrum fanned toward the
 * base. Violet bends most (highest refractive index), red bends least. The
 * dotted line is the original incident direction, so the angle of deviation
 * is visible as the fan below it.
 *
 * Server component — static 2-D.
 */
export default function OptPrismDispersion() {
  // Prism triangle (apex up)
  const apex = { x: 250, y: 70 };
  const baseL = { x: 195, y: 200 };
  const baseR = { x: 305, y: 200 };

  // Entry point on the left face, exit on the right face
  const entry = { x: 222, y: 135 };
  const exit = { x: 278, y: 135 };

  // Spectrum colours fanning out at the exit — violet deviates most (steepest)
  const colours = [
    { c: "#ef4444", label: "red", dy: 6 },
    { c: "#f59e0b", label: "", dy: 16 },
    { c: "#eab308", label: "", dy: 26 },
    { c: "#22c55e", label: "", dy: 36 },
    { c: "#3b82f6", label: "", dy: 46 },
    { c: "#8b5cf6", label: "violet", dy: 56 },
  ];

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="White light entering a triangular prism and emerging split into a spectrum, with violet deviated most and red least"
      >
        <defs>
          <marker id="pd-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* prism */}
        <path d={`M ${apex.x} ${apex.y} L ${baseR.x} ${baseR.y} L ${baseL.x} ${baseL.y} Z`} className="fill-sky-200/40 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <text x={250} y={216} textAnchor="middle" fontSize="10" className="fill-sky-800 dark:fill-sky-200">base</text>

        {/* incident white beam */}
        <line x1={70} y1={110} x2={entry.x} y2={entry.y} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="2.5" markerEnd="url(#pd-arrow)" />
        <text x={68} y={102} textAnchor="start" fontSize="11" className="fill-slate-700 dark:fill-slate-200">white light</text>

        {/* ray inside the prism (white) */}
        <line x1={entry.x} y1={entry.y} x2={exit.x} y2={exit.y} className="stroke-slate-400 dark:stroke-slate-400" strokeWidth="2" />

        {/* original direction continued (dotted) for the deviation reference */}
        <line x1={exit.x} y1={exit.y} x2={500} y2={172} className="stroke-indigo-300/70" strokeWidth="1" strokeDasharray="4 4" />

        {/* dispersed spectrum at the exit face */}
        {colours.map((co, i) => (
          <g key={i}>
            <line x1={exit.x} y1={exit.y} x2={500} y2={172 + co.dy} stroke={co.c} strokeWidth="2.4" />
            {co.label ? (
              <text x={506} y={176 + co.dy} fontSize="10" fill={co.c}>{co.label}</text>
            ) : null}
          </g>
        ))}

        <text x={250} y={280} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">Violet bends most, red bends least — the glass refracts short wavelengths more</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The prism refracts each colour by a different amount because the glass
        has a higher refractive index for shorter (violet) wavelengths, so violet
        deviates most and red least.
      </p>
    </div>
  );
}
