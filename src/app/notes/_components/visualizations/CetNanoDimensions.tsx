/**
 * Static figure: naming a nanostructure by the directions that are NOT
 * nanoscale (concept cetgreen-nano-dimensions).
 *
 * A quantum dot is nanoscale every way: no long direction, 0-D. A nanowire is
 * long in one direction: 1-D. A thin film is wide in two: 2-D. The examples
 * under each are the concept's lists, with nano-rings among the 0-D ones (the
 * concept's trap: they are not 1-D). Pinned by tests/notes-w2-01.test.ts.
 * Server component.
 */

export type NanoClass = { dims: number; label: string; shape: string; examples: readonly string[] };

export const NANO_CLASSES: readonly NanoClass[] = [
  { dims: 0, label: "0-D", shape: "quantum dot", examples: ["quantum dots", "nanoparticles", "nano-rings"] },
  { dims: 1, label: "1-D", shape: "nanowire", examples: ["nanowires", "nanotubes", "nanorods"] },
  { dims: 2, label: "2-D", shape: "thin film", examples: ["thin films", "layers", "coatings"] },
];

/** The dimension is the number of directions (of three) that are not nanoscale. */
export const nanoscaleDirections = (c: NanoClass) => 3 - c.dims;

const COL = 320 / 3;
const CY = 70;

function LongArrow({ x1, y1, x2, y2, label, lx, ly }: { x1: number; y1: number; x2: number; y2: number; label: string; lx: number; ly: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerStart="url(#nano-dim-arrow)" markerEnd="url(#nano-dim-arrow)" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={1.5} />
      <text x={lx} y={ly} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
        {label}
      </text>
    </g>
  );
}

const SOLID = "fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300";

export default function CetNanoDimensions() {
  const c0 = COL / 2;
  const c1 = COL * 1.5;
  const c2 = COL * 2.5;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · count the directions that are not nanoscale
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="A quantum dot is nanoscale in every direction: zero-dimensional, like nanoparticles and nano-rings. A nanowire is long in one direction: one-dimensional, like nanotubes and nanorods. A thin film is wide in two directions: two-dimensional, like layers and coatings."
      >
        <defs>
          <marker id="nano-dim-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* 0-D: a dot */}
        <circle cx={c0} cy={CY} r={11} className={SOLID} strokeWidth={1.3} />
        <text x={c0} y={CY + 32} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          small every way
        </text>

        {/* 1-D: a wire */}
        <rect x={c1 - 38} y={CY - 5} width={76} height={10} rx={5} className={SOLID} strokeWidth={1.3} />
        <LongArrow x1={c1 - 38} y1={CY + 18} x2={c1 + 38} y2={CY + 18} label="long" lx={c1} ly={CY + 32} />

        {/* 2-D: a film in perspective */}
        <polygon
          points={`${c2 - 40},${CY + 14} ${c2 + 14},${CY + 14} ${c2 + 40},${CY - 14} ${c2 - 14},${CY - 14}`}
          className={SOLID}
          strokeWidth={1.3}
        />
        <LongArrow x1={c2 - 40} y1={CY + 24} x2={c2 + 14} y2={CY + 24} label="wide" lx={c2 - 13} ly={CY + 38} />
        <LongArrow x1={c2 + 22} y1={CY + 16} x2={c2 + 46} y2={CY - 10} label="wide" lx={c2 + 34} ly={CY - 20} />

        {NANO_CLASSES.map((c, i) => {
          const cx = Math.round((i + 0.5) * COL * 100) / 100;
          return (
            <g key={c.label}>
              <text x={cx} y={22} textAnchor="middle" className="fill-foreground text-[14px] font-bold">
                {c.label}
              </text>
              <text x={cx} y={36} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {c.shape}
              </text>
              <text x={cx} y={124} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
                {c.dims === 0 ? "no long direction" : c.dims === 1 ? "1 long direction" : "2 wide directions"}
              </text>
              {c.examples.map((e, k) => (
                <text key={e} x={cx} y={146 + k * 14} textAnchor="middle" className="fill-foreground text-[11px]">
                  {e}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The dimension counts the directions that are NOT nanoscale. A nano-ring looks like a bent wire, but it is listed with quantum dots as
        zero-dimensional.
      </p>
    </div>
  );
}
