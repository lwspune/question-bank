/**
 * DNA as a ladder: two sugar-phosphate rails joined by base-pair rungs.
 * A–T rungs show 2 hydrogen bonds, G–C rungs show 3 — the fixed
 * complementary pairing that lets DNA copy itself. Static SVG.
 */
export default function GenDnaBasePairing() {
  // rung sequence on the LEFT strand → its forced partner on the right
  const rungs = [
    { left: "A", right: "T", bonds: 2 },
    { left: "T", right: "A", bonds: 2 },
    { left: "G", right: "C", bonds: 3 },
    { left: "C", right: "G", bonds: 3 },
    { left: "A", right: "T", bonds: 2 },
    { left: "G", right: "C", bonds: 3 },
  ];
  const railL = 70;
  const railR = 250;
  const top = 18;
  const gap = 30;
  const colour = (b: string) =>
    b === "A"
      ? "fill-emerald-200/80 stroke-emerald-600 dark:fill-emerald-900/50"
      : b === "T"
        ? "fill-sky-200/80 stroke-sky-600 dark:fill-sky-900/50"
        : b === "G"
          ? "fill-amber-200/80 stroke-amber-600 dark:fill-amber-900/50"
          : "fill-rose-200/80 stroke-rose-600 dark:fill-rose-900/50";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 320 230"
        className="w-full"
        role="img"
        aria-label="DNA drawn as a ladder. The two sugar-phosphate rails are joined by base-pair rungs: Adenine pairs with Thymine using two hydrogen bonds, and Guanine pairs with Cytosine using three hydrogen bonds."
      >
        {/* rails */}
        <line x1={railL} y1={top - 6} x2={railL} y2={top + rungs.length * gap} className="stroke-slate-400" strokeWidth="3" />
        <line x1={railR} y1={top - 6} x2={railR} y2={top + rungs.length * gap} className="stroke-slate-400" strokeWidth="3" />
        <text x={railL} y={top + rungs.length * gap + 16} textAnchor="middle" className="fill-slate-500" fontSize="8">sugar–phosphate</text>
        <text x={railR} y={top + rungs.length * gap + 16} textAnchor="middle" className="fill-slate-500" fontSize="8">sugar–phosphate</text>

        {rungs.map((r, i) => {
          const y = top + i * gap + 10;
          return (
            <g key={i}>
              {/* hydrogen bonds (dashed lines between the two bases) */}
              {Array.from({ length: r.bonds }).map((_, b) => {
                const yy = y - (r.bonds - 1) * 2 + b * 4;
                return (
                  <line
                    key={b}
                    x1={railL + 26} y1={yy}
                    x2={railR - 26} y2={yy}
                    className="stroke-slate-400"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}
              {/* left base */}
              <rect x={railL} y={y - 9} width="26" height="18" rx="4" className={colour(r.left)} strokeWidth="1.4" />
              <text x={railL + 13} y={y + 4} textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="10" fontWeight="700">{r.left}</text>
              {/* right base */}
              <rect x={railR - 26} y={y - 9} width="26" height="18" rx="4" className={colour(r.right)} strokeWidth="1.4" />
              <text x={railR - 13} y={y + 4} textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="10" fontWeight="700">{r.right}</text>
              {/* bond count label */}
              <text x={(railL + railR) / 2} y={y - 11} textAnchor="middle" className="fill-slate-500" fontSize="7">{r.bonds} H-bonds</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        A–T = 2 hydrogen bonds · G–C = 3 hydrogen bonds (so G–C-rich DNA is more stable)
      </p>
    </div>
  );
}
