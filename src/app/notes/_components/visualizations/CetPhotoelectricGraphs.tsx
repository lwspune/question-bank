/**
 * Static figure: the photoelectric graphs the concept
 * cetp-dn-photoelectric-graphs teaches a student to read.
 *
 * 1. Photocurrent against anode potential, same frequency, two intensities:
 *    one cut-off (the stopping potential), different saturation levels.
 * 2. The concept's worked example: same saturation current (same intensity),
 *    cut-offs at −2 V and −1 V; the −2 V curve has the higher frequency.
 * 3. Stopping potential against frequency for two metals (φ = 2.0 eV and
 *    4.0 eV): parallel straight lines of slope h/e, each cutting the axis at
 *    its threshold frequency; the line further right has the larger φ.
 *
 * Curves are drawn from the exported model and pinned by
 * tests/notes-cet-visuals-phys-a.test.ts. Server component, no client state.
 */

import type { ReactNode } from "react";

/** Planck's constant and the electron's charge as the concept uses them. */
export const H = 6.6e-34;
export const E_CHARGE = 1.6e-19;
/** Slope of every V₀ against ν line, h/e, in V s (≈ 4.1 × 10⁻¹⁵). */
export const H_OVER_E = H / E_CHARGE;

/** How quickly a curve rises to saturation past its cut-off (volts). */
const RISE_V = 0.6;

/** Photocurrent (in units of the saturation current scale) at anode potential v for a curve with stopping potential v0. */
export function photocurrent(v: number, v0: number, saturation: number): number {
  if (v <= -v0) return 0;
  return saturation * (1 - Math.exp(-(v + v0) / RISE_V));
}

export type IvCurve = { v0: number; saturation: number; label: string };

/** Graph 1: one frequency, two intensities. */
export const SAME_FREQUENCY: readonly IvCurve[] = [
  { v0: 1.5, saturation: 1, label: "higher intensity" },
  { v0: 1.5, saturation: 0.55, label: "lower intensity" },
];

/** Graph 2: the worked example, one intensity, cut-offs at −2 V and −1 V. */
export const SAME_INTENSITY: readonly IvCurve[] = [
  { v0: 2, saturation: 0.8, label: "higher ν" },
  { v0: 1, saturation: 0.8, label: "lower ν" },
];

/** Graph 3: two metals. */
export const METALS = [
  { phiEv: 2.0, label: "φ = 2.0 eV" },
  { phiEv: 4.0, label: "φ = 4.0 eV" },
] as const;

/** Threshold frequency in Hz for a work function in eV: ν₀ = φ/h. */
export function thresholdFrequency(phiEv: number): number {
  return (phiEv * E_CHARGE) / H;
}

/** Stopping potential in volts: V₀ = (h/e)ν − φ/e, zero below the threshold. */
export function stoppingPotential(nuHz: number, phiEv: number): number {
  return Math.max(0, H_OVER_E * nuHz - phiEv);
}

// Panel geometry (viewBox 320 × 150).
const PL = 40;
const PR = 300;
const BASE = 120;
const TOP = 30;
const V_MIN = -3;
const V_MAX = 4;
const NU_MAX = 16e14;
const V0_MAX = 5;

const r2 = (n: number) => Math.round(n * 100) / 100;
const xOfV = (v: number) => r2(PL + ((v - V_MIN) / (V_MAX - V_MIN)) * (PR - PL));
const yOfI = (i: number) => r2(BASE - i * (BASE - TOP));
const xOfNu = (nu: number) => r2(PL + (nu / NU_MAX) * (PR - PL));
const yOfV0 = (v0: number) => r2(BASE - (v0 / V0_MAX) * (BASE - TOP));

function ivPoints(c: IvCurve): string {
  const pts: string[] = [];
  for (let k = 0; k <= 70; k++) {
    const v = V_MIN + (k / 70) * (V_MAX - V_MIN);
    pts.push(`${xOfV(v)},${yOfI(photocurrent(v, c.v0, c.saturation))}`);
  }
  return pts.join(" ");
}

const SVG_CLASS = "block h-auto w-full";
const TONES = [
  { stroke: "stroke-indigo-600 dark:stroke-indigo-400", fill: "fill-indigo-700 dark:fill-indigo-300" },
  { stroke: "stroke-amber-600 dark:stroke-amber-400", fill: "fill-amber-700 dark:fill-amber-300" },
] as const;

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="rounded-md border border-indigo-100 bg-background/60 p-3 dark:border-indigo-900/40">
      <figcaption className="mb-1 text-xs font-semibold text-foreground">{title}</figcaption>
      {children}
    </figure>
  );
}

function IvAxes() {
  const x0 = xOfV(0);
  return (
    <g>
      <line x1={PL - 4} y1={BASE} x2={PR + 8} y2={BASE} className="stroke-muted-foreground" />
      <line x1={x0} y1={BASE + 4} x2={x0} y2={TOP - 12} className="stroke-muted-foreground" />
      <text x={x0 - 4} y={TOP - 6} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
        photocurrent I
      </text>
      <text x={PR + 8} y={BASE + 14} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
        anode potential V
      </text>
      <text x={x0} y={BASE + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        0
      </text>
    </g>
  );
}

export default function CetPhotoelectricGraphs() {
  const nu1 = thresholdFrequency(METALS[0].phiEv);
  const nu2 = thresholdFrequency(METALS[1].phiEv);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · reading the photoelectric graphs
      </p>
      <div className="space-y-3">
        <Panel title="1. Same frequency, two intensities">
          <svg
            viewBox="0 0 320 150"
            className={SVG_CLASS}
            role="img"
            aria-label="Photocurrent against anode potential for one frequency at two intensities. Both curves cut off at the same stopping potential; the higher intensity levels off at a higher saturation current."
          >
            <IvAxes />
            {SAME_FREQUENCY.map((c, i) => (
              <g key={c.label}>
                <polyline points={ivPoints(c)} fill="none" strokeWidth={2} className={TONES[i].stroke} />
                <text x={PR} y={yOfI(c.saturation) - 5} textAnchor="end" className={`${TONES[i].fill} text-[10px] font-semibold`}>
                  {c.label}
                </text>
              </g>
            ))}
            <circle cx={xOfV(-1.5)} cy={BASE} r={3} className="fill-foreground" />
            <text x={xOfV(-1.5)} y={BASE + 14} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              −V₀
            </text>
            <text x={xOfV(-1.5) - 6} y={BASE - 8} textAnchor="end" className="fill-muted-foreground text-[10px]">
              same cut-off
            </text>
          </svg>
          <p className="mt-1 text-xs text-muted-foreground">
            The saturation level shows the intensity. The cut-off is the same, so the frequency is the same.
          </p>
        </Panel>

        <Panel title="2. Same intensity, two frequencies">
          <svg
            viewBox="0 0 320 150"
            className={SVG_CLASS}
            role="img"
            aria-label="Photocurrent against anode potential for two frequencies at one intensity. Both level off at the same saturation current; one cuts off at minus 2 volts and has the higher frequency, the other cuts off at minus 1 volt."
          >
            <IvAxes />
            {SAME_INTENSITY.map((c, i) => (
              <g key={c.label}>
                <polyline points={ivPoints(c)} fill="none" strokeWidth={2} className={TONES[i].stroke} />
                <circle cx={xOfV(-c.v0)} cy={BASE} r={3} className={TONES[i].fill} />
                <text x={xOfV(-c.v0)} y={BASE + 14} textAnchor="middle" className={`${TONES[i].fill} text-[10px] font-semibold`}>
                  −{c.v0} V
                </text>
              </g>
            ))}
            <text x={xOfV(-2) + 2} y={yOfI(0.5)} textAnchor="end" className={`${TONES[0].fill} text-[10px] font-semibold`}>
              higher ν
            </text>
            <text x={xOfV(0.2)} y={yOfI(0.25)} className={`${TONES[1].fill} text-[10px] font-semibold`}>
              lower ν
            </text>
            <text x={PR} y={yOfI(0.8) - 5} textAnchor="end" className="fill-foreground text-[10px]">
              same saturation
            </text>
          </svg>
          <p className="mt-1 text-xs text-muted-foreground">
            Same saturation current, so the same intensity. The curve cutting off at −2 V has the larger stopping
            potential, so the higher frequency.
          </p>
        </Panel>

        <Panel title="3. Stopping potential against frequency">
          <svg
            viewBox="0 0 320 150"
            className={SVG_CLASS}
            role="img"
            aria-label="Stopping potential against frequency for two metals with work functions 2.0 and 4.0 electron volts: two parallel straight lines of slope h over e, cutting the frequency axis at their threshold frequencies, 4.8 and 9.7 times ten to the 14 hertz."
          >
            <line x1={PL} y1={BASE} x2={PR + 8} y2={BASE} className="stroke-muted-foreground" />
            <line x1={PL} y1={BASE + 4} x2={PL} y2={TOP - 12} className="stroke-muted-foreground" />
            <text x={PL + 4} y={TOP - 6} className="fill-foreground text-[10px] font-semibold">
              stopping potential V₀
            </text>
            <text x={PR + 8} y={BASE + 26} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
              frequency ν (10¹⁴ Hz)
            </text>
            <text x={PL} y={BASE + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              0
            </text>
            {METALS.map((m, i) => {
              const nu0 = thresholdFrequency(m.phiEv);
              const vEnd = stoppingPotential(NU_MAX, m.phiEv);
              return (
                <g key={m.label}>
                  <line
                    x1={xOfNu(nu0)}
                    y1={BASE}
                    x2={xOfNu(NU_MAX)}
                    y2={yOfV0(vEnd)}
                    strokeWidth={2}
                    className={TONES[i].stroke}
                  />
                  <circle cx={xOfNu(nu0)} cy={BASE} r={3} className={TONES[i].fill} />
                  <text x={xOfNu(nu0)} y={BASE + 14} textAnchor="middle" className={`${TONES[i].fill} text-[10px] font-semibold tabular-nums`}>
                    {(nu0 / 1e14).toFixed(1)}
                  </text>
                  <text x={PR} y={i === 0 ? yOfV0(vEnd) - 6 : BASE - 6} textAnchor="end" className={`${TONES[i].fill} text-[10px] font-semibold`}>
                    {m.label}
                  </text>
                </g>
              );
            })}
            <text x={xOfNu((nu1 + nu2) / 2) - 18} y={yOfV0(1.6)} textAnchor="end" className="fill-foreground text-[10px]">
              slope h/e, both lines
            </text>
            <text x={xOfNu(nu1) - 5} y={BASE - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">
              ν₀
            </text>
            <text x={xOfNu(nu2) - 5} y={BASE - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">
              ν₀
            </text>
          </svg>
          <p className="mt-1 text-xs text-muted-foreground">
            Slope h/e = 6.6 × 10⁻³⁴ / 1.6 × 10⁻¹⁹ ≈ 4.1 × 10⁻¹⁵ V s for every metal. Each line cuts the axis at its
            threshold frequency; the line further right has the larger work function. Kₘₐₓ against ν is the same line
            scaled by e: it starts at ν₀ with slope h.
          </p>
        </Panel>
      </div>
    </div>
  );
}
