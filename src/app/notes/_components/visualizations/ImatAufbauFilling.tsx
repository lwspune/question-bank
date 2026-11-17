"use client";

/**
 * Animation: filling the orbitals of oxygen (Z = 8), the concept's
 * self-check, one rule at a time. Orbital boxes are drawn at their energy
 * levels (1s lowest, then 2s, then the three equal 2p boxes); each electron is
 * a half-arrow (up or down spin) that drops into its box when its step comes.
 *   1. 1s¹   Aufbau: lowest-energy orbital first
 *   2. 1s²   Pauli: a second electron only with the opposite spin
 *   3. 2s²   Aufbau: next level up
 *   4. 2p³   Hund: one in each 2p box, parallel spins (this is nitrogen)
 *   5. 2p⁴   the 8th electron must pair: 1s² 2s² 2p⁴, 2 unpaired
 * Pinned by tests/notes-imat-visuals-chem1.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type OrbitalId = "1s" | "2s" | "2px" | "2py" | "2pz";
export type Electron = { orbital: OrbitalId; spin: "up" | "down"; step: number };

/** Oxygen's 8 electrons, in the order they are added, and the step that adds each. */
export const ELECTRONS: readonly Electron[] = [
  { orbital: "1s", spin: "up", step: 0 },
  { orbital: "1s", spin: "down", step: 1 },
  { orbital: "2s", spin: "up", step: 2 },
  { orbital: "2s", spin: "down", step: 2 },
  { orbital: "2px", spin: "up", step: 3 },
  { orbital: "2py", spin: "up", step: 3 },
  { orbital: "2pz", spin: "up", step: 3 },
  { orbital: "2px", spin: "down", step: 4 },
];

export const AUFBAU_STEPS: readonly FigureStep[] = [
  {
    title: "First electron: 1s",
    caption: "Aufbau principle: the first electron goes into the lowest-energy orbital, 1s.",
  },
  {
    title: "1s full",
    caption: "Pauli: a second electron can share the 1s box only with the opposite spin. Two is the most one orbital holds: 1s².",
  },
  {
    title: "Then 2s",
    caption: "Aufbau again: 1s is full, so the next two electrons go into 2s, the next level up, with opposite spins: 1s² 2s².",
  },
  {
    title: "One in each 2p box",
    caption: "Hund's rule: the next three electrons go one into each 2p orbital, all with parallel spins, before any pair up (1s² 2s² 2p³ is nitrogen).",
  },
  {
    title: "The 8th electron pairs",
    caption: "No empty 2p box is left, so the 8th electron pairs up with opposite spin. Oxygen: 1s² 2s² 2p⁴, with 2 unpaired electrons.",
  },
];

const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶"];

/** Electrons placed after step `step` (0-based, inclusive). */
export const placedBy = (step: number) => ELECTRONS.filter((e) => e.step <= step);

/** Configuration such as "1s² 2s² 2p⁴" after a step. */
export function configAfter(step: number): string {
  const e = placedBy(step);
  const count = (pre: string) => e.filter((x) => x.orbital.startsWith(pre)).length;
  return (["1s", "2s", "2p"] as const)
    .filter((sub) => count(sub) > 0)
    .map((sub) => `${sub}${SUP[count(sub)]}`)
    .join(" ");
}

/** Orbitals holding exactly one electron after a step. */
export function unpairedAfter(step: number): number {
  const by = new Map<OrbitalId, number>();
  for (const e of placedBy(step)) by.set(e.orbital, (by.get(e.orbital) ?? 0) + 1);
  return [...by.values()].filter((n) => n === 1).length;
}

const W = 320;
const H = 214;
const BOX = 30;
const BOX_H = 28;
export const BOXES: Record<OrbitalId, { x: number; y: number }> = {
  "1s": { x: 120, y: 160 },
  "2s": { x: 120, y: 104 },
  "2px": { x: 196, y: 56 },
  "2py": { x: 196 + BOX, y: 56 },
  "2pz": { x: 196 + 2 * BOX, y: 56 },
};

function SpinArrow({ up }: { up: boolean }) {
  // Drawn about (0,0), 20 tall: a shaft and a full head (a one-sided head read as the digit 1).
  return up ? (
    <>
      <line x1={0} y1={10} x2={0} y2={-10} stroke="currentColor" strokeWidth={2} />
      <path d="M-5,-3 L0,-10 L5,-3" stroke="currentColor" strokeWidth={2} fill="none" />
    </>
  ) : (
    <>
      <line x1={0} y1={-10} x2={0} y2={10} stroke="currentColor" strokeWidth={2} />
      <path d="M-5,3 L0,10 L5,3" stroke="currentColor" strokeWidth={2} fill="none" />
    </>
  );
}

export default function ImatAufbauFilling() {
  return (
    <StepFigure
      title="Animation · filling orbitals: Aufbau, Pauli and Hund"
      label="Orbital boxes for oxygen filling one electron at a time: two in 1s with opposite spins, two in 2s, then one in each 2p box with parallel spins, then the eighth electron pairs in the first 2p box. Final configuration 1s2 2s2 2p4, two unpaired electrons."
      viewBox={`0 0 ${W} ${H}`}
      steps={AUFBAU_STEPS}
      note="Each box is one orbital and holds at most two electrons, with opposite spins (up and down arrows)."
    >
      {(step) => (
        <g>
          {/* Energy axis */}
          <line x1={34} y1={196} x2={34} y2={34} className="stroke-muted-foreground" strokeWidth={1.2} />
          <path d="M30,40 L34,30 L38,40 Z" className="fill-muted-foreground" />
          <text x={22} y={120} textAnchor="middle" transform="rotate(-90 22 120)" className="fill-muted-foreground text-[10px]">
            energy
          </text>

          {/* Boxes and their names */}
          {(Object.keys(BOXES) as OrbitalId[]).map((id) => (
            <rect
              key={id}
              x={BOXES[id].x}
              y={BOXES[id].y}
              width={BOX}
              height={BOX_H}
              className="fill-background stroke-foreground"
              strokeWidth={1.2}
            />
          ))}
          <text x={BOXES["1s"].x - 8} y={BOXES["1s"].y + 18} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
            1s
          </text>
          <text x={BOXES["2s"].x - 8} y={BOXES["2s"].y + 18} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
            2s
          </text>
          <text x={BOXES["2px"].x - 8} y={BOXES["2px"].y + 18} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
            2p
          </text>
          <text x={BOXES["2py"].x + BOX / 2} y={BOXES["2py"].y + BOX_H + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            three equal 2p orbitals
          </text>

          {/* The electrons: each drops into its box when its step comes */}
          {ELECTRONS.map((e, i) => {
            const b = BOXES[e.orbital];
            const shown = e.step <= step;
            const x = b.x + BOX / 2 + (e.spin === "up" ? -6 : 6);
            const y = b.y + BOX_H / 2 + (shown ? 0 : -18);
            const isNew = e.step === step;
            return (
              <g
                key={i}
                className={`${isNew ? "text-rose-600 dark:text-rose-400" : "text-indigo-700 dark:text-indigo-300"} ${MOTION}`}
                style={{ transform: svgTransform({ x, y }), opacity: shown ? 1 : 0 }}
              >
                <SpinArrow up={e.spin === "up"} />
              </g>
            );
          })}

          {/* Running configuration */}
          <text x={W - 10} y={150} textAnchor="end" className="fill-muted-foreground text-[10px]">
            configuration
          </text>
          <text x={W - 10} y={168} textAnchor="end" className="fill-foreground text-[12px] font-semibold">
            {configAfter(step)}
          </text>
          <text x={W - 10} y={184} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {placedBy(step).length} electrons, {unpairedAfter(step)} unpaired
          </text>
          <text x={W / 2} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            Oxygen, Z = 8: {AUFBAU_STEPS[step].title}
          </text>
        </g>
      )}
    </StepFigure>
  );
}
