/**
 * Static figure: hydrogen's energy levels and its Lyman, Balmer and Paschen
 * series (concept cetp-an-series-limits).
 *
 * Levels n = 1 to 5 and ∞ with Eₙ = −13.6/n² eV. Each series ends on its own
 * lower level n_f (1, 2, 3) and gets two downward arrows: its first line
 * (n_f + 1 → n_f, the smallest jump, LONGEST wavelength) and its series limit
 * (∞ → n_f, the biggest jump, SHORTEST wavelength), the concept's trap. The
 * table under the picture gives both wavelengths from 1/λ = R(1/n_f² − 1/nᵢ²)
 * with R = 1.097 × 10⁷ m⁻¹: the Balmer limit is 4/R ≈ 365 nm, the concept's
 * worked example. Values pinned by tests/notes-cet-visuals-phys-a.test.ts.
 * Server component, no client state.
 */

/** Rydberg constant, m⁻¹, as in the concept's worked example. */
export const RYDBERG = 1.097e7;

/** Energy of level n in eV (n = Infinity gives 0). */
export function levelEnergy(n: number): number {
  return n === Infinity ? 0 : -13.6 / (n * n);
}

/** Wavelength in nm of the line from level ni down to level nf. */
export function lineNm(ni: number, nf: number): number {
  const inv = RYDBERG * (1 / (nf * nf) - (ni === Infinity ? 0 : 1 / (ni * ni)));
  return 1e9 / inv;
}

export const firstLineNm = (nf: number) => lineNm(nf + 1, nf);
export const limitNm = (nf: number) => lineNm(Infinity, nf);

export type Series = { name: string; nf: number; region: string };

export const SERIES: readonly Series[] = [
  { name: "Lyman", nf: 1, region: "ultraviolet" },
  { name: "Balmer", nf: 2, region: "visible" },
  { name: "Paschen", nf: 3, region: "infrared" },
];

/** Drawn height of each level (not to scale: the real n = 1 gap would squeeze the rest). */
export const LEVEL_Y: readonly { n: number; y: number }[] = [
  { n: Infinity, y: 34 },
  { n: 5, y: 48 },
  { n: 4, y: 62 },
  { n: 3, y: 82 },
  { n: 2, y: 122 },
  { n: 1, y: 204 },
];

const yOf = (n: number) => LEVEL_Y.find((l) => l.n === n)!.y;

/** The two arrows of each series: x positions of its limit and first-line arrows. */
export const ARROWS: readonly { nf: number; limitX: number; firstX: number }[] = [
  { nf: 1, limitX: 70, firstX: 102 },
  { nf: 2, limitX: 146, firstX: 178 },
  { nf: 3, limitX: 222, firstX: 252 },
];

const LINE_LEFT = 44;
const LINE_RIGHT = 272;

const energyLabel = (n: number) => {
  const e = levelEnergy(n);
  if (e === 0) return "0 eV";
  return `−${n === 1 ? (-e).toFixed(1) : (-e).toFixed(2)} eV`;
};

const TONES = [
  { stroke: "stroke-violet-600 dark:stroke-violet-400", fill: "fill-violet-600 dark:fill-violet-400", text: "fill-violet-700 dark:fill-violet-300" },
  { stroke: "stroke-emerald-600 dark:stroke-emerald-400", fill: "fill-emerald-600 dark:fill-emerald-400", text: "fill-emerald-700 dark:fill-emerald-300" },
  { stroke: "stroke-rose-600 dark:stroke-rose-400", fill: "fill-rose-600 dark:fill-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
] as const;

function Down({ x, from, to, tone }: { x: number; from: number; to: number; tone: number }) {
  const t = TONES[tone];
  return (
    <g>
      <line x1={x} y1={from} x2={x} y2={to - 7} className={t.stroke} strokeWidth={2} />
      <polygon points={`${x},${to} ${x - 4},${to - 8} ${x + 4},${to - 8}`} className={t.fill} />
    </g>
  );
}

export default function CetHydrogenSeries() {
  const nm = (v: number) => Math.round(v).toString();
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · hydrogen&apos;s series, first lines and limits
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="Energy levels of hydrogen from n = 1 at minus 13.6 electron volts up to n = infinity at 0. Downward arrows end on n = 1 for the Lyman series, n = 2 for Balmer and n = 3 for Paschen. In each series the arrow from the next level up is the first line and the arrow from infinity is the series limit."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          spacing of the levels not to scale
        </text>

        {LEVEL_Y.map(({ n, y }) => (
          <g key={String(n)}>
            <line
              x1={LINE_LEFT}
              y1={y}
              x2={LINE_RIGHT}
              y2={y}
              strokeDasharray={n === Infinity ? "4 3" : undefined}
              className="stroke-foreground"
              strokeWidth={n === Infinity ? 1 : 1.3}
            />
            <text x={6} y={y + 3.5} className="fill-foreground text-[10px] font-semibold">
              {n === Infinity ? "n = ∞" : `n = ${n}`}
            </text>
            <text x={316} y={y + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {energyLabel(n)}
            </text>
          </g>
        ))}

        {ARROWS.map((a, i) => {
          const lower = yOf(a.nf);
          return (
            <g key={a.nf}>
              <Down x={a.limitX} from={yOf(Infinity)} to={lower} tone={i} />
              <Down x={a.firstX} from={yOf(a.nf + 1)} to={lower} tone={i} />
            </g>
          );
        })}

        {/* Lyman: labels between n = 2 and n = 1 */}
        <text x={66} y={168} textAnchor="end" className={`${TONES[0].text} text-[10px] font-semibold`}>
          limit
        </text>
        <text x={98} y={168} textAnchor="end" className={`${TONES[0].text} text-[10px] font-semibold`}>
          1st
        </text>
        <text x={86} y={220} textAnchor="middle" className={`${TONES[0].text} text-[11px] font-semibold`}>
          Lyman (ultraviolet)
        </text>

        {/* Balmer: labels between n = 3 and n = 2 */}
        <text x={142} y={108} textAnchor="end" className={`${TONES[1].text} text-[10px] font-semibold`}>
          limit
        </text>
        <text x={174} y={108} textAnchor="end" className={`${TONES[1].text} text-[10px] font-semibold`}>
          1st
        </text>
        <text x={162} y={136} textAnchor="middle" className={`${TONES[1].text} text-[11px] font-semibold`}>
          Balmer (visible)
        </text>

        {/* Paschen: labels under n = 3 */}
        <text x={222} y={94} textAnchor="middle" className={`${TONES[2].text} text-[10px] font-semibold`}>
          limit
        </text>
        <text x={252} y={94} textAnchor="middle" className={`${TONES[2].text} text-[10px] font-semibold`}>
          1st
        </text>
        <text x={237} y={108} textAnchor="middle" className={`${TONES[2].text} text-[11px] font-semibold`}>
          Paschen (infrared)
        </text>
      </svg>

      <table className="mt-3 w-full text-left text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="py-1 font-medium">Series</th>
            <th className="py-1 font-medium">ends on</th>
            <th className="py-1 font-medium">1st line (longest λ)</th>
            <th className="py-1 font-medium">limit (shortest λ)</th>
          </tr>
        </thead>
        <tbody className="tabular-nums text-foreground">
          {SERIES.map((s) => (
            <tr key={s.name} className="border-t border-border">
              <td className="py-1 font-semibold">{s.name}</td>
              <td className="py-1">n = {s.nf}</td>
              <td className="py-1">{nm(firstLineNm(s.nf))} nm</td>
              <td className="py-1">{nm(limitNm(s.nf))} nm</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-2 text-xs text-muted-foreground">
        Wavelengths from 1/λ = R(1/n₁² − 1/n₂²), n₁ the lower level, with R = 1.097 × 10⁷ m⁻¹. The limit comes from n = ∞: the biggest jump
        into that level, so the most energy and the shortest wavelength. Balmer limit: 1/λ = R/4, λ = 4/R ≈ 365 nm.
      </p>
    </div>
  );
}
