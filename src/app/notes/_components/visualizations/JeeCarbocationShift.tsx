"use client";

/**
 * Animation: the concept's own worked example (jcorm-carbocation-shifts).
 * 3,3-Dimethylbutan-2-ol, (CH₃)₃C–CH(OH)CH₃, heated with concentrated H₂SO₄:
 * loss of water gives the secondary cation, a 1,2-methyl shift from the
 * quaternary carbon next door gives the tertiary cation, and loss of a proton
 * from the neighbouring CH gives 2,3-dimethylbut-2-ene, (CH₃)₂C=C(CH₃)₂.
 *
 * `shiftState` is the whole chemistry of each frame; the test checks that every
 * neutral carbon has four bonds, the cation carbon three, and the cation's
 * class (2° then 3°). Pinned by tests/notes-w2-03.test.ts.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SHIFT_STEPS: readonly FigureStep[] = [
  {
    title: "The alcohol",
    caption: "3,3-Dimethylbutan-2-ol, (CH₃)₃C–CH(OH)CH₃, is heated with concentrated H₂SO₄.",
  },
  {
    title: "Secondary cation",
    caption: "Protonation of the OH and loss of water leave a secondary cation, (CH₃)₃C–C⁺H–CH₃.",
  },
  {
    title: "A methyl moves",
    caption:
      "The next carbon is quaternary: it has no H but three CH₃ groups. One CH₃ moves across with its bond pair: a 1,2-methyl shift.",
  },
  {
    title: "Tertiary cation",
    caption: "The charge is now on the carbon the CH₃ left: the tertiary cation (CH₃)₂C⁺–CH(CH₃)₂, more stable than the secondary one.",
  },
  {
    title: "Loss of a proton",
    caption: "A proton leaves from the neighbouring CH and gives the most substituted alkene (Saytzeff): 2,3-dimethylbut-2-ene, (CH₃)₂C=C(CH₃)₂.",
  },
];

export type ShiftState = {
  /** The OH is still on C-2. */
  oh: boolean;
  /** Where the moving CH₃ sits. */
  movedOn: "C2" | "C3";
  /** Which carbon carries the positive charge. */
  charge: "C2" | "C3" | null;
  /** C-2 still has its own H. */
  c2H: boolean;
  /** The C=C double bond has formed. */
  double: boolean;
  /** The curved arrow of the shift is shown. */
  arrow: boolean;
};

export function shiftState(step: number): ShiftState {
  if (step <= 0) return { oh: true, movedOn: "C3", charge: null, c2H: true, double: false, arrow: false };
  if (step === 1) return { oh: false, movedOn: "C3", charge: "C2", c2H: true, double: false, arrow: false };
  if (step === 2) return { oh: false, movedOn: "C3", charge: "C2", c2H: true, double: false, arrow: true };
  if (step === 3) return { oh: false, movedOn: "C2", charge: "C3", c2H: true, double: false, arrow: false };
  return { oh: false, movedOn: "C2", charge: null, c2H: false, double: true, arrow: false };
}

/** Bonds (a double bond counts 2) around C-2 and C-3. C-2: C-1, C-3. C-3: C-2, C-4 and the CH₃ that stays. */
export function bondCount(s: ShiftState, carbon: "C2" | "C3"): number {
  const moved = s.movedOn === carbon ? 1 : 0;
  const dbl = s.double ? 1 : 0;
  if (carbon === "C2") return 2 + (s.oh ? 1 : 0) + (s.c2H ? 1 : 0) + moved + dbl;
  return 3 + moved + dbl;
}

/** Carbons bonded to a carbon: its class (2 = secondary, 3 = tertiary). */
export function carbonNeighbours(s: ShiftState, carbon: "C2" | "C3"): number {
  const moved = s.movedOn === carbon ? 1 : 0;
  return carbon === "C2" ? 2 + moved : 3 + moved;
}

export const NAMES = {
  start: "3,3-dimethylbutan-2-ol",
  product: "2,3-dimethylbut-2-ene",
} as const;

// Geometry (viewBox 0 0 320 196).
const Y = 112;
export const ATOMS = { C1: 50, C2: 122, C3: 194, C4: 266 } as const;
const UP_Y = 64;
const DOWN_Y = 164;

type Pt = { x: number; y: number };
const r1 = (n: number) => Math.round(n * 10) / 10;

function head(ctrl: Pt, tip: Pt): string {
  const a = Math.atan2(tip.y - ctrl.y, tip.x - ctrl.x);
  const bx = tip.x - 7 * Math.cos(a);
  const by = tip.y - 7 * Math.sin(a);
  const px = -Math.sin(a) * 3.2;
  const py = Math.cos(a) * 3.2;
  return `${r1(tip.x)},${r1(tip.y)} ${r1(bx + px)},${r1(by + py)} ${r1(bx - px)},${r1(by - py)}`;
}

function Fade({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <g className={MOTION} style={{ opacity: on ? 1 : 0 }}>
      {children}
    </g>
  );
}

function Label({ x, y, children, cls = "fill-foreground" }: { x: number; y: number; children: string; cls?: string }) {
  return (
    <text x={x} y={y + 4} textAnchor="middle" className={`${cls} text-[12px] font-semibold`}>
      {children}
    </text>
  );
}

export default function JeeCarbocationShift() {
  const arrowFrom = { x: ATOMS.C3 - 4, y: 86 };
  const arrowCtrl = { x: 158, y: 50 };
  const arrowTo = { x: ATOMS.C2 + 8, y: 98 };
  return (
    <StepFigure
      title="Animation · a 1,2-methyl shift"
      label="3,3-Dimethylbutan-2-ol loses water to give a secondary cation. A methyl group on the next, quaternary carbon moves across with its bond pair, leaving a tertiary cation. Loss of a proton from the neighbouring CH gives 2,3-dimethylbut-2-ene."
      viewBox="0 0 320 196"
      steps={SHIFT_STEPS}
      note="Amber: the CH₃ that moves. Red curved arrow: the bond pair moving with it."
    >
      {(step) => {
        const s = shiftState(step);
        return (
          <g>
            {/* Chain bonds */}
            <line x1={ATOMS.C1 + 16} y1={Y} x2={ATOMS.C2 - 14} y2={Y} strokeWidth={1.4} className="stroke-foreground" />
            <line x1={ATOMS.C2 + 12} y1={Y} x2={ATOMS.C3 - 10} y2={Y} strokeWidth={1.4} className="stroke-foreground" />
            <line
              x1={ATOMS.C2 + 12}
              y1={Y - 5}
              x2={ATOMS.C3 - 10}
              y2={Y - 5}
              strokeWidth={1.4}
              className={`${MOTION} stroke-foreground`}
              style={{ opacity: s.double ? 1 : 0 }}
            />
            <line x1={ATOMS.C3 + 10} y1={Y} x2={ATOMS.C4 - 16} y2={Y} strokeWidth={1.4} className="stroke-foreground" />
            {/* The CH₃ that stays on C-3 */}
            <line x1={ATOMS.C3} y1={Y + 10} x2={ATOMS.C3} y2={DOWN_Y - 13} strokeWidth={1.4} className="stroke-foreground" />
            <Label x={ATOMS.C3} y={DOWN_Y}>
              CH₃
            </Label>

            <Label x={ATOMS.C1} y={Y}>
              CH₃
            </Label>
            <Label x={ATOMS.C4} y={Y}>
              CH₃
            </Label>
            {/* C-2: CH, then C once its H has gone */}
            <Fade on={s.c2H}>
              <Label x={ATOMS.C2} y={Y}>
                CH
              </Label>
            </Fade>
            <Fade on={!s.c2H}>
              <Label x={ATOMS.C2} y={Y}>
                C
              </Label>
            </Fade>
            <Label x={ATOMS.C3} y={Y}>
              C
            </Label>

            {/* Charges */}
            <Fade on={s.charge === "C2"}>
              <text x={ATOMS.C2 + 14} y={Y - 8} className="fill-rose-700 text-[13px] font-bold dark:fill-rose-300">
                +
              </text>
              <text x={ATOMS.C2} y={Y + 26} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
                2° cation
              </text>
            </Fade>
            <Fade on={s.charge === "C3"}>
              <text x={ATOMS.C3 + 9} y={Y - 8} className="fill-rose-700 text-[13px] font-bold dark:fill-rose-300">
                +
              </text>
              <text x={ATOMS.C3 + 30} y={Y + 26} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
                3° cation
              </text>
            </Fade>

            {/* The OH, which leaves as water */}
            <g className={MOTION} style={{ transform: svgTransform({ x: s.oh ? ATOMS.C2 : 64, y: s.oh ? UP_Y : 34 }), opacity: s.oh ? 1 : 0.55 }}>
              <line x1={0} y1={10} x2={0} y2={Y - UP_Y - 12} strokeWidth={1.4} className={`${MOTION} stroke-foreground`} style={{ opacity: s.oh ? 1 : 0 }} />
              <text y={4} textAnchor="middle" className={`${MOTION} fill-sky-700 text-[12px] font-semibold dark:fill-sky-300`} style={{ opacity: s.oh ? 1 : 0 }}>
                OH
              </text>
              <text y={4} textAnchor="middle" className={`${MOTION} fill-sky-700 text-[12px] font-semibold dark:fill-sky-300`} style={{ opacity: s.oh ? 0 : 1 }}>
                H₂O lost
              </text>
            </g>
            <Fade on={step === 0}>
              <text x={20} y={40} className="fill-muted-foreground text-[11px]">
                H⁺ from conc. H₂SO₄
              </text>
            </Fade>

            {/* The CH₃ that moves, with its bond */}
            <g className={MOTION} style={{ transform: svgTransform({ x: s.movedOn === "C3" ? ATOMS.C3 : ATOMS.C2, y: UP_Y }) }}>
              <line x1={0} y1={10} x2={0} y2={Y - UP_Y - 12} strokeWidth={1.6} className="stroke-amber-600 dark:stroke-amber-400" />
              <text y={4} textAnchor="middle" className="fill-amber-700 text-[12px] font-semibold dark:fill-amber-300">
                CH₃
              </text>
            </g>

            {/* Curved arrow of the shift */}
            <Fade on={s.arrow}>
              <path
                d={`M ${arrowFrom.x} ${arrowFrom.y} Q ${arrowCtrl.x} ${arrowCtrl.y} ${arrowTo.x} ${arrowTo.y}`}
                fill="none"
                strokeWidth={1.4}
                className="stroke-rose-600 dark:stroke-rose-400"
              />
              <polygon points={head(arrowCtrl, arrowTo)} className="fill-rose-600 dark:fill-rose-400" />
              <text x={160} y={32} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
                1,2-methyl shift
              </text>
            </Fade>

            {/* Proton leaving */}
            <Fade on={step >= 4}>
              <text x={ATOMS.C2 - 26} y={Y + 32} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                H⁺ lost
              </text>
            </Fade>

            {/* Name of what is drawn */}
            <Fade on={step === 0}>
              <text x={160} y={190} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {NAMES.start}
              </text>
            </Fade>
            <Fade on={step === 1 || step === 2}>
              <text x={160} y={190} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                secondary cation: a better one is one shift away
              </text>
            </Fade>
            <Fade on={step === 3}>
              <text x={160} y={190} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                tertiary cation: more stable, so the shift happens
              </text>
            </Fade>
            <Fade on={step >= 4}>
              <text x={160} y={190} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {NAMES.product}, after a 1,2-methyl shift
              </text>
            </Fade>
          </g>
        );
      }}
    </StepFigure>
  );
}
