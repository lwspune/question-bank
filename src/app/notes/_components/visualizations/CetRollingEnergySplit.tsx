/**
 * Static figure: how a rolling body's kinetic energy splits (concept
 * cetp-rolling-energy). Rolling without slipping, K = ½mv²(1 + k²/R²): the
 * translational part ½mv² plus a rotational part ½Iω² = ½mv² × k²/R². For a
 * ring, a disc and a solid sphere of the same mass at the same speed, each bar
 * is drawn to scale in units of ½mv², split into its two parts:
 *
 * - ring, k²/R² = 1: ½ moving, ½ spinning, K = 2 × ½mv²;
 * - disc, k²/R² = 1/2: ⅔ moving, ⅓ spinning, K = 1.5 × ½mv² (¾ of the ring's);
 * - solid sphere, k²/R² = 2/5: 5/7 moving, 2/7 spinning, total : rotational = 7 : 2.
 *
 * The dashed line at ½mv² is where a sliding body's energy would stop: every
 * rolling body has more (the concept's trap). Server component, no client
 * state. Pinned by tests/notes-cet-visuals-phys-c.test.ts.
 */

export type RollingBody = {
  name: string;
  /** k²/R² as a fraction [numerator, denominator]. */
  k2: readonly [number, number];
  /** How the shares are printed: translational, rotational. */
  labels: readonly [string, string];
};

export const BODIES: readonly RollingBody[] = [
  { name: "Ring", k2: [1, 1], labels: ["½", "½"] },
  { name: "Disc", k2: [1, 2], labels: ["⅔", "⅓"] },
  { name: "Solid sphere", k2: [2, 5], labels: ["5/7", "2/7"] },
];

/** k²/R² as a number. */
export const k2Value = (b: RollingBody) => b.k2[0] / b.k2[1];

/** Total K in units of ½mv²: 1 + k²/R². */
export function totalInHalfMv2(b: RollingBody): number {
  return 1 + k2Value(b);
}

/** Shares of the total: translational 1/(1 + k²/R²), rotational (k²/R²)/(1 + k²/R²). */
export function shares(b: RollingBody): { translational: number; rotational: number } {
  const t = totalInHalfMv2(b);
  return { translational: 1 / t, rotational: k2Value(b) / t };
}

/** The worked example: a 3 kg disc rolling at 2 m/s. */
export const DISC_EXAMPLE = { m: 3, v: 2 } as const;

/** Translational and rotational KE (J) of a body of mass m (kg) rolling at v (m/s). */
export function rollingKE(b: RollingBody, m: number, v: number): { translational: number; rotational: number; total: number } {
  const half = 0.5 * m * v * v;
  return { translational: half, rotational: half * k2Value(b), total: half * totalInHalfMv2(b) };
}

// Geometry (viewBox units).
const X0 = 10;
/** Screen length of ½mv². */
export const UNIT = 140;
const ROW0 = 46;
const ROW_GAP = 46;
const BAR_H = 22;

/** Bar segment lengths on screen: translational, then rotational. */
export function barSegments(b: RollingBody): { translational: number; rotational: number } {
  return { translational: UNIT, rotational: Math.round(UNIT * k2Value(b) * 100) / 100 };
}

const fmtK2 = (b: RollingBody) => (b.k2[1] === 1 ? `${b.k2[0]}` : `${b.k2[0]}/${b.k2[1]}`);
const fmtTotal = (b: RollingBody) => {
  const t = totalInHalfMv2(b);
  return Number.isInteger(t) ? `${t}` : t.toFixed(1);
};

export default function CetRollingEnergySplit() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · how a rolling body&apos;s kinetic energy splits
      </p>

      <svg
        viewBox="0 0 320 206"
        className="block h-auto w-full"
        role="img"
        aria-label="Bars for a ring, a disc and a solid sphere rolling with the same mass and speed. Each bar is its kinetic energy in units of half m v squared: the translational part is the same for all three, the rotational part is a half for the ring, a third of the total for the disc and two sevenths for the solid sphere."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          Same mass, same speed v = Rω
        </text>

        {BODIES.map((b, i) => {
          const y = ROW0 + i * ROW_GAP;
          const seg = barSegments(b);
          return (
            <g key={b.name}>
              <text x={X0} y={y - 6} className="fill-foreground text-[11px]">
                <tspan className="font-semibold">{b.name}</tspan>
                <tspan className="fill-muted-foreground">
                  {"  "}k²/R² = {fmtK2(b)}, K = {fmtTotal(b)} × ½mv²
                </tspan>
              </text>
              <rect x={X0} y={y} width={seg.translational} height={BAR_H} className="fill-sky-500/80 dark:fill-sky-500/70" />
              <rect x={X0 + seg.translational} y={y} width={seg.rotational} height={BAR_H} className="fill-amber-500/80 dark:fill-amber-500/70" />
              <line x1={X0 + seg.translational} y1={y} x2={X0 + seg.translational} y2={y + BAR_H} className="stroke-background" strokeWidth={1.5} />
              <text x={X0 + seg.translational / 2} y={y + 15} textAnchor="middle" className="fill-sky-950 text-[11px] font-semibold dark:fill-sky-50">
                {b.labels[0]} moving
              </text>
              <text x={X0 + seg.translational + seg.rotational / 2} y={y + 15} textAnchor="middle" className="fill-amber-950 text-[11px] font-semibold dark:fill-amber-50">
                {b.labels[1]} spin
              </text>
            </g>
          );
        })}

        {/* Where a sliding body's energy would stop */}
        {BODIES.map((b, i) => (
          <line
            key={b.name}
            x1={X0 + UNIT}
            y1={ROW0 + i * ROW_GAP - 3}
            x2={X0 + UNIT}
            y2={ROW0 + i * ROW_GAP + BAR_H + (i === BODIES.length - 1 ? 8 : 3)}
            strokeDasharray="3 3"
            className="stroke-foreground"
            strokeWidth={1}
          />
        ))}
        <text x={X0 + UNIT} y={ROW0 + 2 * ROW_GAP + BAR_H + 19} textAnchor="middle" className="fill-foreground text-[10px]">
          ½mv² (sliding, no spin)
        </text>

        {/* Key */}
        <rect x={X0} y={190} width={10} height={10} className="fill-sky-500/80 dark:fill-sky-500/70" />
        <text x={X0 + 14} y={199} className="fill-foreground text-[10px]">
          moving: ½mv²
        </text>
        <rect x={150} y={190} width={10} height={10} className="fill-amber-500/80 dark:fill-amber-500/70" />
        <text x={164} y={199} className="fill-foreground text-[10px]">
          spinning: ½Iω² = ½mv² × k²/R²
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Fractions are of each body&apos;s own total. A 3 kg disc at 2 m/s: ½mv² = 6 J moving plus 3 J spinning, 9 J
        in all, so a third is rotational. Every rolling body has more than ½mv²: setting mgh = ½mv² is the sliding
        answer.
      </p>
    </div>
  );
}
