"use client";

import { useState } from "react";

/**
 * Interactive: the common ion effect on the solubility of AgCl (concept
 * cetie-ksp-common-ion-effect). A slider adds NaCl, which supplies the common
 * ion Cl⁻ at concentration C. The extra Cl⁻ pushes AgCl(s) ⇌ Ag⁺ + Cl⁻ back,
 * and with [Ag⁺] = S and [Cl⁻] ≈ C the solubility becomes S = Ksp ÷ C.
 *
 * Numbers: the concept's worked example, Ksp = 1.8 × 10⁻¹⁰. In pure water
 * S = √Ksp = 1.34 × 10⁻⁵ M; in 0.1 M NaCl S = 1.8 × 10⁻⁹ M (the figure opens
 * there). The slider also takes 0.001 M and 0.01 M, where the same formula
 * gives 1.8 × 10⁻⁷ and 1.8 × 10⁻⁸ M. A log scale shows S falling tenfold for
 * each tenfold more Cl⁻. Pinned by tests/notes-w2-21.test.ts.
 */

/** Solubility product of AgCl (the worked example). */
export const KSP_AGCL = 1.8e-10;

/** NaCl concentrations the slider steps through, mol/L. 0 = pure water. */
export const NACL_STEPS = [0, 0.001, 0.01, 0.1] as const;
export const DEFAULT_INDEX = 3;

/** S in pure water (√Ksp for a 1:1 salt) or with a common ion at C (Ksp ÷ C). */
export function solubility(ksp: number, c: number): number {
  return c === 0 ? Math.sqrt(ksp) : ksp / c;
}

/** The exact root of S(S + C) = Ksp, to check that [Cl⁻] ≈ C is fair. */
export function exactSolubility(ksp: number, c: number): number {
  return (-c + Math.sqrt(c * c + 4 * ksp)) / 2;
}

const SUP: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

/** "1.8 × 10⁻⁹" style, with the given number of decimals in the mantissa. */
export function sci(x: number, decimals: number): string {
  const [m, e] = x.toExponential(decimals).split("e");
  const exp = String(Number(e))
    .split("")
    .map((ch) => SUP[ch])
    .join("");
  return `${m} × 10${exp}`;
}

/** Decimals used for each step's value: 3 s.f. for √Ksp, 2 s.f. for Ksp ÷ C. */
export const valueText = (c: number) => sci(solubility(KSP_AGCL, c), c === 0 ? 2 : 1);

/** The NaCl concentration as printed. */
export const concText = (c: number) => (c === 0 ? "0" : String(c));

// Log axis of S: 10⁻⁴ at the left, 10⁻¹⁰ at the right (less soluble to the right).
export const AXIS = { x0: 36, x1: 296, y: 156, expHigh: -4, expLow: -10 } as const;

/** x position of a solubility on the log axis. */
export function axisX(s: number): number {
  const f = (AXIS.expHigh - Math.log10(s)) / (AXIS.expHigh - AXIS.expLow);
  return Math.round((AXIS.x0 + f * (AXIS.x1 - AXIS.x0)) * 100) / 100;
}

const TICKS = [-4, -5, -6, -7, -8, -9, -10];

export default function CetCommonIonSolubility() {
  const [idx, setIdx] = useState<number>(DEFAULT_INDEX);
  const c = NACL_STEPS[idx] as number;
  const pure = solubility(KSP_AGCL, 0);
  const s = solubility(KSP_AGCL, c);
  const xs = axisX(s);
  const xp = axisX(pure);
  const added = c > 0;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a common ion lowers solubility
      </p>
      <svg
        viewBox="0 0 320 214"
        className="block h-auto w-full"
        role="img"
        aria-label={`Silver chloride dissolving: AgCl solid in equilibrium with Ag plus and Cl minus ions. Ksp is 1.8 times 10 to the minus 10. ${
          added
            ? `With ${c} molar NaCl, the extra chloride pushes the equilibrium back, so the solubility is Ksp divided by ${c}, which is ${valueText(c)} molar.`
            : "In pure water there is no extra ion, and the solubility is the square root of Ksp, 1.34 times 10 to the minus 5 molar."
        } On a log scale the solubility moves further from the pure water value with each tenfold increase in chloride.`}
      >
        {/* The equilibrium */}
        <text x={62} y={50} textAnchor="middle" className="fill-foreground font-serif text-[13px]">
          AgCl(s)
        </text>
        <line x1={104} y1={42} x2={160} y2={42} strokeWidth={1.4} className="stroke-foreground" />
        <polygon points="160,42 154,38.5 154,45.5" className="fill-foreground" />
        <line
          x1={104}
          y1={54}
          x2={160}
          y2={54}
          strokeWidth={added ? 3.4 : 1.4}
          className={added ? "stroke-rose-600 dark:stroke-rose-400" : "stroke-foreground"}
        />
        <polygon
          points={added ? "100,54 109,49 109,59" : "104,54 110,50.5 110,57.5"}
          className={added ? "fill-rose-600 dark:fill-rose-400" : "fill-foreground"}
        />
        <text x={132} y={34} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          dissolves
        </text>
        <text x={182} y={50} textAnchor="middle" className="fill-foreground font-serif text-[13px]">
          Ag⁺
        </text>
        <text x={207} y={50} textAnchor="middle" className="fill-foreground font-serif text-[13px]">
          +
        </text>
        <text x={234} y={50} textAnchor="middle" className="fill-foreground font-serif text-[13px]">
          Cl⁻
        </text>
        <text x={182} y={72} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          = S
        </text>
        <text x={234} y={72} textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-200">
          {added ? `≈ C = ${c} M` : "= S"}
        </text>
        <text x={160} y={96} textAnchor="middle" className={added ? "fill-rose-700 text-[10px] font-semibold dark:fill-rose-300" : "fill-muted-foreground text-[10px]"}>
          {added ? `NaCl adds Cl⁻, so the equilibrium shifts left` : "Pure water: no ion added"}
        </text>

        {/* Log axis of S */}
        <line x1={AXIS.x0} y1={AXIS.y} x2={AXIS.x1} y2={AXIS.y} strokeWidth={1.2} className="stroke-muted-foreground" />
        {TICKS.map((e) => {
          const x = axisX(10 ** e);
          return (
            <g key={e}>
              <line x1={x} y1={AXIS.y - 4} x2={x} y2={AXIS.y + 4} strokeWidth={1} className="stroke-muted-foreground" />
              <text x={x} y={AXIS.y + 16} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {sci(10 ** e, 0).replace("1 × ", "")}
              </text>
            </g>
          );
        })}
        <text x={166} y={AXIS.y + 31} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          solubility S in mol/L (log scale): less soluble to the right
        </text>

        {/* Pure water marker */}
        <circle cx={xp} cy={AXIS.y} r={5} className="fill-muted-foreground" />
        <text x={xp} y={AXIS.y - 26} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
          pure water
        </text>
        <text x={xp} y={AXIS.y - 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {valueText(0)}
        </text>

        {/* Current marker */}
        {added && (
          <g>
            <circle cx={xs} cy={AXIS.y} r={6} className="fill-indigo-600 dark:fill-indigo-400" />
            <text x={xs} y={AXIS.y - 26} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
              {c} M NaCl
            </text>
            <text x={xs} y={AXIS.y - 13} textAnchor="middle" className="fill-indigo-700 text-[10px] tabular-nums dark:fill-indigo-300">
              {valueText(c)}
            </text>
          </g>
        )}

        <text x={160} y={208} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          {added ? `S = Ksp ÷ C = 1.8 × 10⁻¹⁰ ÷ ${c} = ${valueText(c)} M` : `S = √Ksp = ${valueText(0)} M`}
        </text>
      </svg>

      <div className="mt-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="font-medium text-foreground">
            NaCl added, C: <span className="tabular-nums">{concText(c)} M</span>
          </span>
          <input
            type="range"
            min={0}
            max={NACL_STEPS.length - 1}
            step={1}
            value={idx}
            onChange={(ev) => setIdx(Number(ev.target.value))}
            className="accent-indigo-600"
            aria-label="Concentration of NaCl added, in mol per litre"
            aria-valuetext={`${concText(c)} molar`}
          />
        </label>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        AgCl, Ksp = 1.8 × 10⁻¹⁰. NaCl supplies the common ion Cl⁻, so [Cl⁻] ≈ C and Ksp = S × C. Each tenfold rise in C makes S ten
        times smaller, and every value is far below the √Ksp of pure water: a common ion always lowers solubility.
      </p>
    </div>
  );
}
