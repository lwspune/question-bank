/**
 * Static figure: why a moving source changes the pitch (concept
 * cetp-sd-doppler-formula). A source moving right at v/5 sends out a crest
 * every period; each crest spreads at the speed of sound v from the point
 * where it was sent out. So the crests are bunched ahead of the source
 * (wavelength 4λ/5) and spread behind it (6λ/5).
 *
 * The numbers follow the concept's sign convention, f′ = f(v ± v_o)/(v ∓ v_s):
 * a source approaching at v/5 gives v/(v − v/5) = 5f/4 (its self-check), and
 * one moving away gives v/(v + v/5) = 5f/6. Pinned by
 * tests/notes-cet-visuals-phys-b.test.ts. Server component, no client state.
 */

/** Source speed as a fraction of the speed of sound. */
export const VS_OVER_V = 1 / 5;

// Geometry (viewBox units).
/** Wavelength the source would give at rest. */
export const LAMBDA = 24;
/** Where the source is now. */
export const SOURCE = { x: 172, y: 124 } as const;
/** Crests drawn: sent out 1 to 4 periods ago. */
export const CRESTS = 4;

/** Each crest: sent out n periods ago from x = S − n·v_sT, radius n·vT = n·λ. */
export function wavefronts(): { n: number; cx: number; r: number }[] {
  return Array.from({ length: CRESTS }, (_, i) => {
    const n = i + 1;
    return { n, cx: SOURCE.x - n * LAMBDA * VS_OVER_V, r: n * LAMBDA };
  });
}

/** Gap between neighbouring crests ahead of the source, along its line of motion: λ(1 − v_s/v). */
export function aheadSpacing(): number {
  return LAMBDA * (1 - VS_OVER_V);
}

/** Gap between neighbouring crests behind the source: λ(1 + v_s/v). */
export function behindSpacing(): number {
  return LAMBDA * (1 + VS_OVER_V);
}

/** Frequency heard by a listener at rest, as a multiple of f: approaching v/(v − v_s), receding v/(v + v_s). */
export function heardAhead(): number {
  return 1 / (1 - VS_OVER_V);
}
export function heardBehind(): number {
  return 1 / (1 + VS_OVER_V);
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export const LISTENER_AHEAD_X = 300;
export const LISTENER_BEHIND_X = 20;

function Bracket({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g>
      <line x1={r2(from)} y1={y} x2={r2(to)} y2={y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <line x1={r2(from)} y1={y - 3} x2={r2(from)} y2={y + 3} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <line x1={r2(to)} y1={y - 3} x2={r2(to)} y2={y + 3} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth={1.2} />
      <text x={r2((from + to) / 2)} y={y + 13} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        {label}
      </text>
    </g>
  );
}

function Listener({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y - 7} r={4} className="fill-amber-500 dark:fill-amber-400" />
      <rect x={x - 4} y={y - 2} width={8} height={12} rx={2} className="fill-amber-500 dark:fill-amber-400" />
    </g>
  );
}

export default function CetDopplerWavefronts() {
  const fronts = wavefronts();
  const outer = fronts[fronts.length - 1];
  const prev = fronts[fronts.length - 2];
  // Crest positions on the line of motion, ahead and behind.
  const aheadOuter = outer.cx + outer.r;
  const aheadPrev = prev.cx + prev.r;
  const behindOuter = outer.cx - outer.r;
  const behindPrev = prev.cx - prev.r;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · crests from a moving source
      </p>

      <svg
        viewBox="0 0 320 252"
        className="block h-auto w-full"
        role="img"
        aria-label="A sound source moving to the right at one fifth of the speed of sound. Its crests are bunched ahead of it, four fifths of a wavelength apart, so a listener ahead hears five quarters of the frequency. Behind it they are spread to six fifths of a wavelength, so a listener behind hears five sixths."
      >
        <text x={160} y={12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Source moving right at v/5
        </text>

        {/* Line of motion */}
        <line x1={8} y1={SOURCE.y} x2={312} y2={SOURCE.y} strokeDasharray="2 3" className="stroke-muted-foreground" strokeWidth={0.8} />

        {/* The crests, each centred where it was sent out */}
        {fronts.map((w) => (
          <g key={w.n}>
            <circle cx={r2(w.cx)} cy={SOURCE.y} r={w.r} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
            <circle cx={r2(w.cx)} cy={SOURCE.y} r={1.3} className="fill-muted-foreground" />
          </g>
        ))}

        {/* The source and its direction */}
        <circle cx={SOURCE.x} cy={SOURCE.y} r={5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={SOURCE.x} y={SOURCE.y + 16} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          S
        </text>
        <line x1={SOURCE.x + 6} y1={SOURCE.y - 12} x2={SOURCE.x + 22} y2={SOURCE.y - 12} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={2} />
        <polygon
          points={`${SOURCE.x + 27},${SOURCE.y - 12} ${SOURCE.x + 21},${SOURCE.y - 16} ${SOURCE.x + 21},${SOURCE.y - 8}`}
          className="fill-rose-600 dark:fill-rose-400"
        />

        {/* Wavelengths ahead and behind */}
        <Bracket from={aheadPrev} to={aheadOuter} y={SOURCE.y + 8} label="4λ/5" />
        <Bracket from={behindOuter} to={behindPrev} y={SOURCE.y + 8} label="6λ/5" />

        {/* Listeners */}
        <Listener x={LISTENER_AHEAD_X} y={SOURCE.y} />
        <Listener x={LISTENER_BEHIND_X} y={SOURCE.y} />

        <text x={316} y={234} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          Listener ahead
        </text>
        <text x={316} y={247} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold tabular-nums dark:fill-emerald-300">
          hears 5f/4 (higher)
        </text>
        <text x={4} y={234} className="fill-foreground text-[10px] font-semibold">
          Listener behind
        </text>
        <text x={4} y={247} className="fill-rose-700 text-[10px] font-semibold tabular-nums dark:fill-rose-300">
          hears 5f/6 (lower)
        </text>
      </svg>

      <p className="mt-3 text-xs text-muted-foreground">
        Each circle is one crest, centred on the dot where the source was when it sent that crest out. The source
        chases its own crests ahead, so they arrive closer together: wavelength 4λ/5 and frequency v/(v − v/5) = 5f/4.
        Behind, they are stretched to 6λ/5 and the frequency falls to v/(v + v/5) = 5f/6.
      </p>
    </div>
  );
}
