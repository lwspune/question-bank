"use client";

/**
 * Animation: how the depletion layer of a p-n junction forms (concept
 * cetp-depletion-layer). The p-side holds holes, the n-side free electrons,
 * each beside a fixed ion (negative acceptor ions on the p-side, positive
 * donor ions on the n-side), so each side starts neutral.
 *
 * The carriers nearest the junction diffuse across: in two rows an electron
 * crosses into the p-side and meets a hole there, in the other two a hole
 * crosses into the n-side and meets an electron. They recombine (fade), which
 * uncovers the fixed ions next to the junction: negative on the p-side,
 * positive on the n-side. Those ions are the depletion layer, and their field
 * points from n to p, stopping further diffusion; the n-side sits at the
 * higher potential.
 *
 * Each moving carrier is one group whose style.transform and opacity change
 * between steps. The poses are exported and pinned by
 * tests/notes-cet-visuals-phys-a.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const DEPLETION_STEPS: readonly FigureStep[] = [
  {
    title: "Two regions",
    caption:
      "The p-side has many holes, the n-side many free electrons. Each carrier sits beside a fixed ion, so each side is neutral.",
  },
  {
    title: "Diffusion",
    caption:
      "Electrons diffuse from the n-side into the p-side and holes from the p-side into the n-side, from high to low concentration.",
  },
  {
    title: "Recombination",
    caption: "An electron that meets a hole fills it: the two recombine and both free carriers are gone.",
  },
  {
    title: "Uncovered ions",
    caption:
      "Near the junction only immobile ions are left: negative on the p-side, positive on the n-side. This thin region with no free carriers is the depletion layer.",
  },
  {
    title: "The junction field",
    caption:
      "The ions make a field from the n-side to the p-side, which stops further diffusion. The n-side is at the higher potential.",
  },
];

// Geometry (viewBox units).
export const JUNCTION_X = 160;
/** Lattice columns on each side; the one nearest the junction loses its carriers. */
export const P_COLUMNS = [40, 72, 104, 136] as const;
export const N_COLUMNS = [184, 216, 248, 280] as const;
export const ROWS = [66, 98, 130, 162] as const;
const REGION = { top: 46, bottom: 178, left: 16, right: 304 };
/** The depletion layer once it has formed: the two columns of uncovered ions. */
export const LAYER = { left: 126, right: 204 } as const;
/** The junction field arrow, drawn from its tail to its head. */
export const FIELD = { from: { x: 202, y: 194 }, to: { x: 128, y: 194 } } as const;

const RECOMBINE = 2;
const UNCOVER = 3;
const FIELD_STEP = 4;

/** Where each moving pair recombines: rows 0 and 2 in the n-side, rows 1 and 3 in the p-side. */
export const MEET_X = [172, 148, 172, 148] as const;

export type CarrierKind = "hole" | "electron";
export type CarrierPose = { x: number; y: number; opacity: number };

/** Pose of the moving hole or electron of a row (the ones next to the junction). */
export function carrierPose(step: number, kind: CarrierKind, row: number): CarrierPose {
  const y = ROWS[row];
  const home = kind === "hole" ? P_COLUMNS[3] : N_COLUMNS[0];
  if (step === 0) return { x: home, y, opacity: 1 };
  const meet = MEET_X[row];
  if (step === 1) return { x: meet + (kind === "hole" ? -6 : 6), y, opacity: 1 };
  return { x: meet, y, opacity: 0 };
}

/** The charge left uncovered next to the junction once recombination is done, per side. */
export function uncoveredCharge(step: number): { p: number; n: number } {
  if (step < RECOMBINE) return { p: 0, n: 0 };
  return { p: -ROWS.length, n: ROWS.length };
}

/** True from the step where the depletion layer is shaded and named. */
export const layerShown = (step: number) => step >= UNCOVER;
/** True from the step where the field arrow is drawn. */
export const fieldShown = (step: number) => step >= FIELD_STEP;

function Hole({ x, y }: { x: number; y: number }) {
  return (
    <g style={{ transform: svgTransform({ x, y }) }}>
      <circle r={6} className="fill-background stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.5} />
      <text y={3.5} textAnchor="middle" className="fill-rose-700 text-[10px] font-bold dark:fill-rose-300">
        +
      </text>
    </g>
  );
}

function Electron({ x, y }: { x: number; y: number }) {
  return (
    <g style={{ transform: svgTransform({ x, y }) }}>
      <circle r={6} className="fill-sky-600 dark:fill-sky-400" />
      <text y={3.5} textAnchor="middle" className="fill-background text-[10px] font-bold">
        −
      </text>
    </g>
  );
}

/** A fixed ion: a small square with its sign, set below-right of its carrier's spot. */
function Ion({ x, y, sign, opacity }: { x: number; y: number; sign: "+" | "−"; opacity: number }) {
  return (
    <g className={MOTION} style={{ transform: svgTransform({ x: x + 10, y: y + 8 }), opacity }}>
      <rect x={-5} y={-5} width={10} height={10} className="fill-amber-200 stroke-amber-700 dark:fill-amber-900 dark:stroke-amber-300" strokeWidth={1} />
      <text y={3.5} textAnchor="middle" className="fill-amber-900 text-[9px] font-bold dark:fill-amber-100">
        {sign}
      </text>
    </g>
  );
}

export default function CetPnDepletion() {
  return (
    <StepFigure
      title="Animation · how the depletion layer forms"
      label="A p-type and an n-type region side by side. Electrons and holes near the junction diffuse across and recombine, leaving negative ions on the p-side and positive ions on the n-side. These ions form the depletion layer, and their field points from the n-side to the p-side."
      viewBox="0 0 320 214"
      steps={DEPLETION_STEPS}
      note="Open circle (+): hole. Filled circle (−): free electron. Square: fixed ion, negative on the p-side and positive on the n-side."
    >
      {(step) => {
        const ionsBright = step >= RECOMBINE;
        return (
          <g>
            {/* The two regions */}
            <rect
              x={REGION.left}
              y={REGION.top}
              width={JUNCTION_X - REGION.left}
              height={REGION.bottom - REGION.top}
              className="fill-rose-100/60 stroke-rose-300 dark:fill-rose-950/40 dark:stroke-rose-800"
            />
            <rect
              x={JUNCTION_X}
              y={REGION.top}
              width={REGION.right - JUNCTION_X}
              height={REGION.bottom - REGION.top}
              className="fill-sky-100/60 stroke-sky-300 dark:fill-sky-950/40 dark:stroke-sky-800"
            />
            <text x={(REGION.left + JUNCTION_X) / 2 - 30} y={38} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
              p-side
            </text>
            <text x={(JUNCTION_X + REGION.right) / 2 + 30} y={38} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
              n-side
            </text>

            {/* The depletion layer */}
            <g className={MOTION} style={{ opacity: layerShown(step) ? 1 : 0 }}>
              <rect
                x={LAYER.left}
                y={REGION.top}
                width={LAYER.right - LAYER.left}
                height={REGION.bottom - REGION.top}
                strokeDasharray="4 3"
                className="fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/40 dark:stroke-amber-400"
              />
              <text x={JUNCTION_X} y={38} textAnchor="middle" className="fill-amber-800 text-[11px] font-semibold dark:fill-amber-200">
                depletion layer
              </text>
            </g>
            <line x1={JUNCTION_X} y1={REGION.top} x2={JUNCTION_X} y2={REGION.bottom} strokeDasharray="2 3" className="stroke-muted-foreground" />

            {/* Fixed ions: faint while covered by their carriers, bright once uncovered */}
            {ROWS.map((y) =>
              P_COLUMNS.map((x, c) => (
                <Ion key={`p${x}-${y}`} x={x} y={y} sign="−" opacity={c === 3 && ionsBright ? 1 : 0.45} />
              )),
            )}
            {ROWS.map((y) =>
              N_COLUMNS.map((x, c) => (
                <Ion key={`n${x}-${y}`} x={x} y={y} sign="+" opacity={c === 0 && ionsBright ? 1 : 0.45} />
              )),
            )}

            {/* Carriers that stay where they are */}
            {ROWS.map((y) => P_COLUMNS.slice(0, 3).map((x) => <Hole key={`h${x}-${y}`} x={x} y={y} />))}
            {ROWS.map((y) => N_COLUMNS.slice(1).map((x) => <Electron key={`e${x}-${y}`} x={x} y={y} />))}

            {/* Carriers next to the junction: they diffuse across and recombine */}
            {ROWS.map((_, row) => {
              const h = carrierPose(step, "hole", row);
              const e = carrierPose(step, "electron", row);
              return (
                <g key={`m${row}`}>
                  <g className={MOTION} style={{ opacity: h.opacity }}>
                    <g className={MOTION} style={{ transform: svgTransform({ x: h.x - P_COLUMNS[3], y: 0 }) }}>
                      <Hole x={P_COLUMNS[3]} y={h.y} />
                    </g>
                  </g>
                  <g className={MOTION} style={{ opacity: e.opacity }}>
                    <g className={MOTION} style={{ transform: svgTransform({ x: e.x - N_COLUMNS[0], y: 0 }) }}>
                      <Electron x={N_COLUMNS[0]} y={e.y} />
                    </g>
                  </g>
                </g>
              );
            })}

            {/* The junction field, n to p */}
            <g className={MOTION} style={{ opacity: fieldShown(step) ? 1 : 0 }}>
              <line
                x1={FIELD.from.x}
                y1={FIELD.from.y}
                x2={FIELD.to.x + 6}
                y2={FIELD.to.y}
                className="stroke-indigo-600 dark:stroke-indigo-400"
                strokeWidth={2.5}
              />
              <polygon
                points={`${FIELD.to.x},${FIELD.to.y} ${FIELD.to.x + 9},${FIELD.to.y - 5} ${FIELD.to.x + 9},${FIELD.to.y + 5}`}
                className="fill-indigo-600 dark:fill-indigo-400"
              />
              <text x={FIELD.from.x + 6} y={FIELD.from.y + 4} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
                E: n → p
              </text>
              <text x={FIELD.to.x - 6} y={FIELD.to.y + 4} textAnchor="end" className="fill-foreground text-[10px]">
                Vₙ &gt; Vₚ
              </text>
            </g>
          </g>
        );
      }}
    </StepFigure>
  );
}
