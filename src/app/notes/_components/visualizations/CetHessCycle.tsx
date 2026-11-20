"use client";

/**
 * Animation: Hess's law as an enthalpy level diagram (concept
 * cetth-hess-law-and-enthalpy-of-solution). Sulphur and oxygen reach SO₃ by
 * two routes: directly (−396 kJ), or through SO₂ (−297 kJ) and then
 * SO₂ + ½O₂ → SO₃ (unknown). Enthalpy is a state function, so the two routes
 * add to the same total and the unknown step is −396 − (−297) = −99 kJ: the
 * concept's worked example.
 *
 * Levels are drawn to scale (the arrows' lengths add up). Arrows and labels
 * fade in by opacity only. Pinned by tests/notes-cet-visuals-chem-c.test.ts.
 */
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

/** The worked example's two given enthalpy changes, in kJ. */
export const HESS = {
  /** S + 3/2 O₂ → SO₃ in one step. */
  direct: -396,
  /** S + O₂ → SO₂ (the other 1/2 O₂ waits). */
  step1: -297,
} as const;

/** Hess's law: the unknown second step is the direct change minus the first step. */
export function secondStep(direct: number, step1: number): number {
  return direct - step1;
}

/** ΔH of SO₂ + 1/2 O₂ → SO₃: −99 kJ. */
export const STEP2 = secondStep(HESS.direct, HESS.step1);

/** The three enthalpy levels, in kJ relative to the reactants. */
export const LEVELS = [
  { id: "start", label: "S + 3/2 O₂", H: 0 },
  { id: "mid", label: "SO₂ + 1/2 O₂", H: HESS.step1 },
  { id: "end", label: "SO₃", H: HESS.direct },
] as const;

export const HESS_STEPS: readonly FigureStep[] = [
  {
    title: "The direct route",
    caption: "S + 3/2 O₂ → SO₃ in one step gives out 396 kJ: ΔH = −396 kJ. The arrow points down because heat is released.",
  },
  {
    title: "Route 2, step 1",
    caption: "The same start can first make SO₂: S + O₂ → SO₂, ΔH = −297 kJ. The other 1/2 O₂ is carried along.",
  },
  {
    title: "Route 2, step 2",
    caption: "Then SO₂ + 1/2 O₂ → SO₃. Its ΔH is the unknown, x.",
  },
  {
    title: "Same start, same end",
    caption: "Enthalpy is a state function, so both routes add to the same total: −297 + x = −396.",
  },
  {
    title: "Solve for x",
    caption: "x = −396 − (−297) = −99 kJ. The two steps, −297 and −99, add to the direct −396 kJ.",
  },
];

// Geometry (viewBox units). H = 0 sits at TOP_Y; lower enthalpy is lower down.
export const TOP_Y = 46;
/** viewBox units per kJ: −396 kJ spans 150 units. */
export const H_SCALE = 150 / 396;

export function levelY(H: number): number {
  return Math.round((TOP_Y - H * H_SCALE) * 100) / 100;
}

/** The three arrows: x position, from-level and to-level enthalpy. */
export const ARROWS = {
  direct: { x: 112, from: 0, to: HESS.direct },
  step1: { x: 196, from: 0, to: HESS.step1 },
  step2: { x: 284, from: HESS.step1, to: HESS.direct },
} as const;

/** Length of an arrow in viewBox units. */
export function arrowLength(a: { from: number; to: number }): number {
  return levelY(a.to) - levelY(a.from);
}

/** Opacity of each part at a step. */
export function partOpacity(part: "direct" | "step1" | "mid" | "step2" | "unknown" | "answer" | "sum", step: number): number {
  switch (part) {
    case "direct":
      return 1;
    case "step1":
    case "mid":
      return step >= 1 ? 1 : 0;
    case "step2":
      return step >= 2 ? 1 : 0;
    case "unknown":
      return step === 2 || step === 3 ? 1 : 0;
    case "answer":
      return step >= 4 ? 1 : 0;
    case "sum":
      return step >= 3 ? 1 : 0;
  }
}

function DownArrow({ x, from, to, className }: { x: number; from: number; to: number; className: string }) {
  const y1 = levelY(from) + 2;
  const y2 = levelY(to) - 2;
  return (
    <g className={className}>
      <line x1={x} y1={y1} x2={x} y2={y2 - 7} strokeWidth={2.5} className="stroke-current" />
      <polygon points={`${x},${y2} ${x - 5},${y2 - 9} ${x + 5},${y2 - 9}`} className="fill-current" />
    </g>
  );
}

export default function CetHessCycle() {
  const yStart = levelY(0);
  const yMid = levelY(HESS.step1);
  const yEnd = levelY(HESS.direct);
  return (
    <StepFigure
      title="Animation · Hess's law: two routes, one total"
      label="Enthalpy level diagram. S plus 3/2 O2 goes to SO3 directly with delta H of minus 396 kJ, or through SO2 plus 1/2 O2 with minus 297 kJ and then minus 99 kJ. Both routes add to minus 396 kJ."
      viewBox="0 0 320 244"
      steps={HESS_STEPS}
      note="Levels are to scale. Down means enthalpy falls (heat given out)."
    >
      {(step) => (
        <g>
          <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {HESS_STEPS[step].title}
          </text>

          {/* Enthalpy axis */}
          <line x1={22} y1={yEnd + 10} x2={22} y2={yStart - 18} className="stroke-muted-foreground" />
          <polygon points={`22,${yStart - 24} 18,${yStart - 15} 26,${yStart - 15}`} className="fill-muted-foreground" />
          <text x={28} y={yStart - 16} className="fill-muted-foreground text-[10px]">
            H
          </text>

          {/* Levels */}
          <line x1={34} y1={yStart} x2={232} y2={yStart} strokeWidth={2} className="stroke-foreground" />
          <text x={36} y={yStart - 5} className="fill-foreground text-[11px] font-semibold">
            S + 3/2 O₂
          </text>
          <line x1={34} y1={yEnd} x2={306} y2={yEnd} strokeWidth={2} className="stroke-foreground" />
          <text x={36} y={yEnd + 14} className="fill-foreground text-[11px] font-semibold">
            SO₃
          </text>
          <g className={MOTION} style={{ opacity: partOpacity("mid", step) }}>
            <line x1={176} y1={yMid} x2={306} y2={yMid} strokeWidth={2} className="stroke-foreground" />
            <text x={204} y={yMid + 14} className="fill-foreground text-[11px] font-semibold">
              SO₂ + 1/2 O₂
            </text>
          </g>

          {/* Route 1: direct */}
          <DownArrow {...ARROWS.direct} className="text-indigo-600 dark:text-indigo-400" />
          <text x={ARROWS.direct.x + 8} y={(yStart + yEnd) / 2} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
            −396 kJ
          </text>
          <text x={ARROWS.direct.x + 8} y={(yStart + yEnd) / 2 + 13} className="fill-indigo-700 text-[10px] dark:fill-indigo-300">
            route 1
          </text>

          {/* Route 2, step 1 */}
          <g className={MOTION} style={{ opacity: partOpacity("step1", step) }}>
            <DownArrow {...ARROWS.step1} className="text-amber-600 dark:text-amber-400" />
            <text x={ARROWS.step1.x + 8} y={(yStart + yMid) / 2} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
              −297 kJ
            </text>
            <text x={ARROWS.step1.x + 8} y={(yStart + yMid) / 2 + 13} className="fill-amber-700 text-[10px] dark:fill-amber-300">
              route 2
            </text>
          </g>

          {/* Route 2, step 2 */}
          <g className={MOTION} style={{ opacity: partOpacity("step2", step) }}>
            <DownArrow {...ARROWS.step2} className="text-emerald-600 dark:text-emerald-400" />
          </g>
          <text
            x={ARROWS.step2.x - 7}
            y={yEnd - 6}
            textAnchor="end"
            className={`fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 ${MOTION}`}
            style={{ opacity: partOpacity("unknown", step) }}
          >
            x = ?
          </text>
          <text
            x={ARROWS.step2.x - 7}
            y={yEnd - 6}
            textAnchor="end"
            className={`fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300 ${MOTION}`}
            style={{ opacity: partOpacity("answer", step) }}
          >
            −99 kJ
          </text>

          {/* The sum */}
          <g className={`text-[11px] tabular-nums ${MOTION}`} style={{ opacity: partOpacity("sum", step) }}>
            <text x={160} y={yEnd + 24} textAnchor="middle" className="fill-foreground font-semibold">
              Route 1 = Route 2
            </text>
            <text x={160} y={yEnd + 38} textAnchor="middle" className="fill-foreground">
              −396 = −297 + {step >= 4 ? "(−99)" : "x"}
            </text>
          </g>
        </g>
      )}
    </StepFigure>
  );
}
