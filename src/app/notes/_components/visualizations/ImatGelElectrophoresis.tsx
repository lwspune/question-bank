/**
 * Static figure: an agarose gel, for the IMAT concept "Gel electrophoresis and
 * DNA profiling". The wells sit at the negative electrode (cathode); DNA,
 * negative because of its phosphate groups, runs towards the positive
 * electrode (anode), and the smallest fragments travel furthest. A DNA ladder
 * of known sizes is run in the first lane.
 *
 * The sample lanes are a paternity test, the concept's own example: every band
 * of the child matches a band of the mother or of the father. The band sizes
 * are invented (the concept gives none); distances follow the usual rule that
 * a fragment's distance falls with the logarithm of its size.
 *
 * Geometry exported and pinned by tests/notes-imat-visuals-biomol.test.ts.
 * Server component, no client state.
 */

/** DNA ladder sizes, in base pairs. */
export const LADDER: readonly number[] = [1000, 800, 600, 400, 200];

export type Lane = { name: string; bands: readonly number[]; ladder?: boolean };

export const LANES: readonly Lane[] = [
  { name: "Ladder", bands: LADDER, ladder: true },
  { name: "Mother", bands: [800, 300] },
  { name: "Child", bands: [800, 400] },
  { name: "Father", bands: [600, 400] },
];

export const WELL_Y = 38;
const TOP_SIZE = 1200;
const BOTTOM_SIZE = 150;
const Y_TOP = 52;
const Y_RANGE = 160;

/** How far down the gel a fragment of `size` bp ends up: further for smaller fragments. */
export function bandY(size: number): number {
  return Y_TOP + (Y_RANGE * Math.log10(TOP_SIZE / size)) / Math.log10(TOP_SIZE / BOTTOM_SIZE);
}

export const laneX = (k: number) => 95 + 50 * k;
const BAND_W = 34;

export default function ImatGelElectrophoresis() {
  const child = LANES[2];
  const mother = LANES[1];
  const father = LANES[3];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · gel electrophoresis and a paternity test
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="An agarose gel with wells at the negative electrode: a DNA ladder and the DNA of a mother, a child and a father. Smaller fragments travel further towards the positive electrode, and each band of the child matches the mother or the father."
      >
        {/* Electrodes. */}
        <text x={170} y={12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          − negative electrode (cathode)
        </text>
        <text x={170} y={244} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          + positive electrode (anode)
        </text>

        {/* The gel and its wells. */}
        <rect x={70} y={30} width={200} height={198} rx={4} strokeWidth={1.5} className="fill-slate-100 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-500" />
        {LANES.map((lane, k) => (
          <g key={lane.name}>
            <text x={laneX(k)} y={26} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {lane.name}
            </text>
            <rect x={laneX(k) - BAND_W / 2} y={WELL_Y} width={BAND_W} height={6} rx={1} strokeWidth={1} className="fill-background stroke-slate-500 dark:stroke-slate-400" />
          </g>
        ))}
        <text x={64} y={WELL_Y + 5} textAnchor="end" className="fill-muted-foreground text-[10px]">
          wells
        </text>

        {/* Ladder sizes on the left. */}
        {LADDER.map((s) => (
          <text key={s} x={64} y={bandY(s) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {s} bp
          </text>
        ))}

        {/* Matching bands: the child's against each parent's. */}
        {child.bands.map((s) => {
          const from = mother.bands.includes(s) ? 1 : 3;
          const x1 = Math.min(laneX(from), laneX(2));
          const x2 = Math.max(laneX(from), laneX(2));
          return <line key={`m-${s}`} x1={x1} y1={bandY(s)} x2={x2} y2={bandY(s)} strokeDasharray="2 3" strokeWidth={1} className="stroke-indigo-500 dark:stroke-indigo-300" />;
        })}

        {/* Bands. */}
        {LANES.map((lane, k) =>
          lane.bands.map((s) => (
            <rect
              key={`${lane.name}-${s}`}
              x={laneX(k) - BAND_W / 2}
              y={bandY(s) - 2.5}
              width={BAND_W}
              height={5}
              rx={1.5}
              className={lane.ladder ? "fill-slate-500 dark:fill-slate-400" : "fill-sky-600 dark:fill-sky-400"}
            />
          )),
        )}
        {/* Sizes of the sample bands, read against the ladder. */}
        {[mother, father].map((lane) =>
          lane.bands.map((s) => (
            <text
              key={`${lane.name}-t-${s}`}
              x={laneX(LANES.indexOf(lane))}
              y={bandY(s) + 13}
              textAnchor="middle"
              className="fill-muted-foreground text-[9px] tabular-nums"
            >
              {s}
            </text>
          )),
        )}

        {/* Direction of travel. */}
        <line x1={294} y1={60} x2={294} y2={196} strokeWidth={1.5} className="stroke-muted-foreground" />
        <path d="M 289 190 L 294 200 L 299 190 Z" className="fill-muted-foreground" />
        <text x={294} y={52} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          larger
        </text>
        <text x={294} y={214} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          smaller
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        DNA is negative (phosphate groups), so it runs from the wells towards the positive electrode, and the gel holds back long fragments most. The child&apos;s 800 bp band matches the mother and its 400 bp band the father.
      </p>
    </div>
  );
}
