/**
 * The switching-circuit translation rule — the single fact that unlocks the
 * hardest subtopic in MHT-CET Mathematical Logic (12 q at 67% HARD).
 *
 * Top: two switches in SERIES. The lamp glows only if both are closed, so the
 * circuit is p AND q. Bottom: two switches in PARALLEL. The lamp glows if
 * either is closed, so the circuit is p OR q.
 *
 * Drawn as a real circuit (source, switches, lamp) rather than as boxes,
 * because the exam prints real circuits and the whole skill is reading one.
 *
 * Server component — static.
 */
export default function LogicSwitchSeriesParallel() {
  const wire = "stroke-slate-500";

  /** An open switch: a hinge dot, a lifted blade, and the far contact dot. */
  const switchSym = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <circle cx={x} cy={y} r={3.5} className="fill-slate-600 dark:fill-slate-300" />
      <line
        x1={x}
        y1={y}
        x2={x + 34}
        y2={y - 16}
        className="stroke-indigo-600 dark:stroke-indigo-400"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={x + 44} cy={y} r={3.5} className="fill-slate-600 dark:fill-slate-300" />
      <text
        x={x + 22}
        y={y + 20}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        className="fill-indigo-800 dark:fill-indigo-200"
      >
        {label}
      </text>
    </g>
  );

  /** The lamp. */
  const lamp = (x: number, y: number, key: string) => (
    <g key={key}>
      <circle cx={x} cy={y} r={13} className="fill-amber-400/25 stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" />
      <line x1={x - 9} y1={y - 9} x2={x + 9} y2={y + 9} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.6" />
      <line x1={x + 9} y1={y - 9} x2={x - 9} y2={y + 9} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="1.6" />
      <text x={x} y={y + 30} textAnchor="middle" fontSize="11" className="fill-slate-500">L</text>
    </g>
  );

  /** The cell (long line = positive, short thick line = negative). */
  const cell = (x: number, y: number, key: string) => (
    <g key={key}>
      <line x1={x} y1={y - 12} x2={x} y2={y + 12} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2" />
      <line x1={x + 8} y1={y - 6} x2={x + 8} y2={y + 6} className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="4" />
    </g>
  );

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 330"
        className="w-full"
        role="img"
        aria-label="Two switches in series represent AND; two switches in parallel represent OR"
      >
        {/* ================= SERIES = AND ================= */}
        <text x={20} y={24} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Series
        </text>

        {/* top wire with two switches in line */}
        <line x1={40} y1={60} x2={110} y2={60} className={wire} strokeWidth="2" />
        {switchSym(110, 60, "S₁", "a1")}
        <line x1={154} y1={60} x2={214} y2={60} className={wire} strokeWidth="2" />
        {switchSym(214, 60, "S₂", "a2")}
        <line x1={258} y1={60} x2={400} y2={60} className={wire} strokeWidth="2" />

        {/* return path through lamp + cell */}
        <line x1={400} y1={60} x2={400} y2={125} className={wire} strokeWidth="2" />
        <line x1={40} y1={60} x2={40} y2={125} className={wire} strokeWidth="2" />
        <line x1={40} y1={125} x2={175} y2={125} className={wire} strokeWidth="2" />
        {cell(175, 125, "c1")}
        <line x1={183} y1={125} x2={267} y2={125} className={wire} strokeWidth="2" />
        {lamp(280, 125, "l1")}
        <line x1={293} y1={125} x2={400} y2={125} className={wire} strokeWidth="2" />

        <text x={455} y={64} textAnchor="middle" fontSize="15" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">
          p ∧ q
        </text>
        <text x={455} y={82} textAnchor="middle" fontSize="10" className="fill-slate-500">
          both needed
        </text>

        {/* divider */}
        <line x1={20} y1={165} x2={500} y2={165} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4 4" />

        {/* ================= PARALLEL = OR ================= */}
        <text x={20} y={195} fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Parallel
        </text>

        <line x1={40} y1={250} x2={110} y2={250} className={wire} strokeWidth="2" />
        {/* split up and down */}
        <line x1={110} y1={225} x2={110} y2={275} className={wire} strokeWidth="2" />
        <line x1={110} y1={225} x2={130} y2={225} className={wire} strokeWidth="2" />
        <line x1={110} y1={275} x2={130} y2={275} className={wire} strokeWidth="2" />
        {switchSym(130, 225, "S₁", "b1")}
        {switchSym(130, 275, "S₂", "b2")}
        <line x1={174} y1={225} x2={200} y2={225} className={wire} strokeWidth="2" />
        <line x1={174} y1={275} x2={200} y2={275} className={wire} strokeWidth="2" />
        <line x1={200} y1={225} x2={200} y2={275} className={wire} strokeWidth="2" />
        <line x1={200} y1={250} x2={400} y2={250} className={wire} strokeWidth="2" />

        {/* return path */}
        <line x1={400} y1={250} x2={400} y2={308} className={wire} strokeWidth="2" />
        <line x1={40} y1={250} x2={40} y2={308} className={wire} strokeWidth="2" />
        <line x1={40} y1={308} x2={175} y2={308} className={wire} strokeWidth="2" />
        {cell(175, 308, "c2")}
        <line x1={183} y1={308} x2={267} y2={308} className={wire} strokeWidth="2" />
        {lamp(280, 308, "l2")}
        <line x1={293} y1={308} x2={400} y2={308} className={wire} strokeWidth="2" />

        <text x={455} y={254} textAnchor="middle" fontSize="15" fontWeight="700" className="fill-emerald-700 dark:fill-emerald-300">
          p ∨ q
        </text>
        <text x={455} y={272} textAnchor="middle" fontSize="10" className="fill-slate-500">
          either will do
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The lamp glowing is the statement being true. Series needs every switch
        closed, so it is AND; parallel needs only one, so it is OR. A switch
        marked S′ is the negation, closed exactly when S is open.
      </p>
    </div>
  );
}
