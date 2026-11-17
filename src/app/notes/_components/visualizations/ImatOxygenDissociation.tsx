/**
 * Static figure: the haemoglobin oxygen dissociation curve and the Bohr shift,
 * for the IMAT concept "Carrying oxygen and carbon dioxide: haemoglobin and
 * the Bohr effect".
 *
 * Both curves are the Hill equation, S = p^n / (p^n + P50^n), with n = 2.7
 * (cooperative binding gives the S shape). Normal blood: P50 = 3.6 kPa (about
 * 27 mmHg). Bohr-shifted (more CO₂, lower pH, warmer): P50 = 4.8 kPa, the
 * curve moved RIGHT. Marked points, pinned by
 * tests/notes-imat-visuals-physio.test.ts:
 * - lungs, 13 kPa: 97% saturated (the concept: "about 97%");
 * - tissues, 5 kPa: 71% on the normal curve but 53% on the shifted one, so
 *   more oxygen is unloaded where CO₂ and acid are high.
 *
 * Partial pressures in kPa (SI). Server component, no client state.
 */

export const HILL_N = 2.7;
export const P50_NORMAL = 3.6;
export const P50_BOHR = 4.8;
export const LUNGS_KPA = 13;
export const TISSUE_KPA = 5;

/** % saturation of haemoglobin at a partial pressure of oxygen p (kPa). */
export function saturation(p: number, p50: number): number {
  if (p <= 0) return 0;
  const a = Math.pow(p, HILL_N);
  return (100 * a) / (a + Math.pow(p50, HILL_N));
}

// Plot geometry (viewBox 320 x 236).
const X0 = 42;
const X1 = 306;
const P_MAX = 14;
const Y_TOP = 26;
const Y_BOT = 196;

export const px = (p: number) => X0 + (p / P_MAX) * (X1 - X0);
export const py = (s: number) => Y_BOT - (s / 100) * (Y_BOT - Y_TOP);

const r2 = (n: number) => Math.round(n * 100) / 100;

export function curvePoints(p50: number, steps = 140): string {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const p = (P_MAX * i) / steps;
    pts.push(`${r2(px(p))},${r2(py(saturation(p, p50)))}`);
  }
  return pts.join(" ");
}

const pct = (v: number) => `${Math.round(v)}%`;

export default function ImatOxygenDissociation() {
  const AXIS = "stroke-muted-foreground";
  const lungs = saturation(LUNGS_KPA, P50_NORMAL);
  const tissueNormal = saturation(TISSUE_KPA, P50_NORMAL);
  const tissueBohr = saturation(TISSUE_KPA, P50_BOHR);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the oxygen dissociation curve
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label={`S-shaped oxygen dissociation curve of haemoglobin, with a second curve shifted to the right by more carbon dioxide, lower pH and higher temperature. In the lungs at 13 kilopascals haemoglobin is ${pct(lungs)} saturated; in the tissues at 5 kilopascals it is ${pct(tissueNormal)} on the normal curve and ${pct(tissueBohr)} on the shifted one`}
      >
        {/* Axes. */}
        <line x1={X0} y1={Y_TOP - 6} x2={X0} y2={Y_BOT} strokeWidth={1} className={AXIS} />
        <line x1={X0} y1={Y_BOT} x2={X1} y2={Y_BOT} strokeWidth={1} className={AXIS} />
        {[0, 25, 50, 75, 100].map((s) => (
          <g key={s}>
            <line x1={X0 - 3} y1={py(s)} x2={X0} y2={py(s)} strokeWidth={1} className={AXIS} />
            <text x={X0 - 5} y={py(s) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {s}
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8, 10, 12, 14].map((p) => (
          <g key={p}>
            <line x1={px(p)} y1={Y_BOT} x2={px(p)} y2={Y_BOT + 3} strokeWidth={1} className={AXIS} />
            <text x={px(p)} y={Y_BOT + 14} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {p}
            </text>
          </g>
        ))}
        <text x={8} y={14} className="fill-muted-foreground text-[10px]">
          % saturation
        </text>
        <text x={(X0 + X1) / 2} y={Y_BOT + 30} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          partial pressure of oxygen (kPa)
        </text>

        {/* Tissues and lungs. */}
        {[
          { p: TISSUE_KPA, label: "tissues" },
          { p: LUNGS_KPA, label: "lungs" },
        ].map((m) => (
          <g key={m.label}>
            <line x1={px(m.p)} y1={Y_TOP} x2={px(m.p)} y2={Y_BOT} strokeWidth={1} strokeDasharray="4 4" className={AXIS} />
            <text x={px(m.p)} y={Y_TOP - 10} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {m.label}
            </text>
          </g>
        ))}

        {/* The two curves. */}
        <polyline points={curvePoints(P50_NORMAL)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <polyline points={curvePoints(P50_BOHR)} fill="none" strokeWidth={2.5} strokeDasharray="7 4" strokeLinejoin="round" className="stroke-rose-600 dark:stroke-rose-400" />

        {/* Curve labels. */}
        <text x={px(1.3)} y={py(70)} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          normal
        </text>
        <text x={px(5.4)} y={py(34)} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          shifted right (Bohr effect):
        </text>
        <text x={px(5.4)} y={py(34) + 12} className="fill-rose-700 text-[10px] dark:fill-rose-300">
          more CO₂, lower pH, warmer
        </text>

        {/* Marked points. */}
        <circle cx={px(LUNGS_KPA)} cy={py(lungs)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(LUNGS_KPA) - 6} y={py(lungs) - 6} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          {pct(lungs)}
        </text>
        <circle cx={px(TISSUE_KPA)} cy={py(tissueNormal)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={px(TISSUE_KPA) - 6} y={py(tissueNormal) - 4} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          {pct(tissueNormal)}
        </text>
        <circle cx={px(TISSUE_KPA)} cy={py(tissueBohr)} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={px(TISSUE_KPA) + 6} y={py(tissueBohr) + 13} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          {pct(tissueBohr)}
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        At the same partial pressure, the shifted curve is less saturated: lower affinity, so more oxygen is released in
        active tissue. In the lungs, at a high partial pressure, both curves are near the top and haemoglobin loads oxygen.
        Values are typical (1 kPa is about 7.5 mmHg).
      </p>
    </div>
  );
}
