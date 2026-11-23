"use client";

/**
 * Animation: the phenoxide ion spreads its negative charge from oxygen onto
 * the ortho and para carbons (concept jcalc-phenol-vs-alcohol), with the
 * concept's pKa values beside it: phenol 10.0, water 15.7, ethanol 15.9.
 *
 * Four resonance structures in order (charge on O, ortho, para, the other
 * ortho), each drawn from `STRUCTURES`; the last frame is the hybrid, with the
 * charge shared by all four places. The test checks every structure is a
 * valid Lewis structure: each neutral ring carbon has four bonds, the
 * charged one three. Pinned by tests/notes-w2-03.test.ts.
 */
import type { ReactNode } from "react";
import StepFigure, { MOTION, type FigureStep } from "./StepFigure";

export const PHENOXIDE_STEPS: readonly FigureStep[] = [
  {
    title: "Phenoxide ion",
    caption: "Phenol has lost H⁺. A lone pair on the negative oxygen moves into the ring, and a ring π bond moves onto the next carbon.",
  },
  {
    title: "Charge on an ortho carbon",
    caption: "The negative charge now sits on an ortho carbon, and it can move on round the ring.",
  },
  {
    title: "Charge on the para carbon",
    caption: "Next it sits on the para carbon.",
  },
  {
    title: "Charge on the other ortho carbon",
    caption: "Then on the other ortho carbon. The oxygen keeps a double bond to the ring in these three structures.",
  },
  {
    title: "Charge spread out",
    caption:
      "The real ion is a blend: the charge is shared by the oxygen, the two ortho carbons and the para carbon. A spread-out charge is stable, so phenol (pKa 10.0) gives up its proton far more easily than ethanol (pKa 15.9).",
  },
];

/** Ring atoms C1 (bearing O) to C6, clockwise from the top; edge k joins atom k and atom k+1. */
export type Charge = "O" | 0 | 1 | 2 | 3 | 4 | 5;
export type Structure = { doubles: readonly number[]; co: boolean; charge: Charge };

export const STRUCTURES: readonly Structure[] = [
  { doubles: [1, 3, 5], co: false, charge: "O" },
  { doubles: [1, 3], co: true, charge: 5 },
  { doubles: [1, 4], co: true, charge: 3 },
  { doubles: [2, 4], co: true, charge: 1 },
];

/** Bonds around ring atom i (a double bond counts 2): two ring bonds, O on C1 or H on the others, plus π bonds. */
export function ringBonds(s: Structure, i: number): number {
  const pi = s.doubles.filter((e) => e === i || (e + 1) % 6 === i).length;
  return 2 + 1 + pi + (i === 0 && s.co ? 1 : 0);
}

/** Bonds on oxygen: one to C1, plus the π bond when C=O. */
export const oxygenBonds = (s: Structure) => 1 + (s.co ? 1 : 0);

/** Where each charged ring atom sits relative to C1. */
export function position(i: number): "ipso" | "ortho" | "meta" | "para" {
  if (i === 0) return "ipso";
  if (i === 1 || i === 5) return "ortho";
  if (i === 2 || i === 4) return "meta";
  return "para";
}

export const PKA = [
  { name: "phenol", value: 10.0 },
  { name: "water", value: 15.7 },
  { name: "ethanol", value: 15.9 },
] as const;

// Geometry (viewBox 0 0 320 236).
type Pt = { x: number; y: number };
const C: Pt = { x: 100, y: 128 };
const R = 34;
export const ATOMS: Pt[] = Array.from({ length: 6 }, (_, k) => {
  const a = ((-90 + 60 * k) * Math.PI) / 180;
  return { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) };
});
const O: Pt = { x: C.x, y: C.y - R - 26 };

const r1 = (n: number) => Math.round(n * 10) / 10;
const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const out = (p: Pt, d: number): Pt => {
  const ux = p.x - C.x;
  const uy = p.y - C.y;
  const l = Math.hypot(ux, uy) || 1;
  return { x: p.x + (d * ux) / l, y: p.y + (d * uy) / l };
};

/** A curved arrow from `a` to `b`, bulging away from the ring centre. */
export function curve(a: Pt, b: Pt, bulge = 12): { d: string; head: string } {
  const m = mid(a, b);
  let nx = -(b.y - a.y);
  let ny = b.x - a.x;
  const l = Math.hypot(nx, ny) || 1;
  nx /= l;
  ny /= l;
  if (nx * (m.x - C.x) + ny * (m.y - C.y) < 0) {
    nx = -nx;
    ny = -ny;
  }
  const ctrl = { x: m.x + nx * bulge, y: m.y + ny * bulge };
  const ang = Math.atan2(b.y - ctrl.y, b.x - ctrl.x);
  const bx = b.x - 6 * Math.cos(ang);
  const by = b.y - 6 * Math.sin(ang);
  const px = -Math.sin(ang) * 3;
  const py = Math.cos(ang) * 3;
  return {
    d: `M ${r1(a.x)} ${r1(a.y)} Q ${r1(ctrl.x)} ${r1(ctrl.y)} ${r1(b.x)} ${r1(b.y)}`,
    head: `${r1(b.x)},${r1(b.y)} ${r1(bx + px)},${r1(by + py)} ${r1(bx - px)},${r1(by - py)}`,
  };
}

/** The two arrows drawn on structure `step` (leading to the next one). */
function arrowsFor(step: number): { a: Pt; b: Pt }[] {
  const e = (k: number) => mid(ATOMS[k], ATOMS[(k + 1) % 6]);
  if (step === 0)
    return [
      { a: { x: O.x - 11, y: O.y - 3 }, b: { x: O.x - 3, y: (O.y + ATOMS[0].y) / 2 + 4 } },
      { a: e(5), b: out(ATOMS[5], 5) },
    ];
  if (step === 1)
    return [
      { a: out(ATOMS[5], 6), b: out(e(4), 4) },
      { a: e(3), b: out(ATOMS[3], 5) },
    ];
  if (step === 2)
    return [
      { a: out(ATOMS[3], 6), b: out(e(2), 4) },
      { a: e(1), b: out(ATOMS[1], 5) },
    ];
  return [];
}

function Fade({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <g className={MOTION} style={{ opacity: on ? 1 : 0 }}>
      {children}
    </g>
  );
}

/** A full negative charge: a minus sign in a small circle. */
function Minus({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5.5} strokeWidth={1.1} className="fill-background stroke-rose-600 dark:stroke-rose-400" />
      <line x1={x - 3} y1={y} x2={x + 3} y2={y} strokeWidth={1.4} className="stroke-rose-600 dark:stroke-rose-400" />
    </g>
  );
}

const pkaY = (v: number) => r1(52 + (v - 9) * 15);

export default function JeePhenoxideResonance() {
  return (
    <StepFigure
      title="Animation · how phenoxide spreads its charge"
      label="The phenoxide ion. A lone pair on the negative oxygen moves into the ring, so the negative charge moves in turn to an ortho carbon, the para carbon and the other ortho carbon. The real ion shares the charge over all four places. Beside it, pKa: phenol 10.0, water 15.7, ethanol 15.9; lower pKa means a stronger acid."
      viewBox="0 0 320 236"
      steps={PHENOXIDE_STEPS}
      note="Red curved arrows show where an electron pair moves. Circled minus: the full negative charge. δ⁻: a share of it."
    >
      {(step) => {
        const s = step <= 3 ? STRUCTURES[step] : null;
        const hybrid = step >= 4;
        return (
          <g>
            {/* Ring single bonds */}
            {ATOMS.map((p, k) => {
              const q = ATOMS[(k + 1) % 6];
              return <line key={`e${k}`} x1={r1(p.x)} y1={r1(p.y)} x2={r1(q.x)} y2={r1(q.y)} strokeWidth={1.4} className="stroke-foreground" />;
            })}
            {/* Ring π bonds: an inner line per edge, shown when that structure has it */}
            {ATOMS.map((p, k) => {
              const q = ATOMS[(k + 1) % 6];
              const pi = { x: p.x + (C.x - p.x) * 0.2, y: p.y + (C.y - p.y) * 0.2 };
              const qi = { x: q.x + (C.x - q.x) * 0.2, y: q.y + (C.y - q.y) * 0.2 };
              const a = { x: pi.x + (qi.x - pi.x) * 0.15, y: pi.y + (qi.y - pi.y) * 0.15 };
              const b = { x: pi.x + (qi.x - pi.x) * 0.85, y: pi.y + (qi.y - pi.y) * 0.85 };
              return (
                <line
                  key={`p${k}`}
                  x1={r1(a.x)}
                  y1={r1(a.y)}
                  x2={r1(b.x)}
                  y2={r1(b.y)}
                  strokeWidth={1.4}
                  className={`${MOTION} stroke-foreground`}
                  style={{ opacity: s && s.doubles.includes(k) ? 1 : 0 }}
                />
              );
            })}
            {/* Hybrid: delocalised ring */}
            <circle cx={C.x} cy={C.y} r={17} fill="none" strokeWidth={1.2} strokeDasharray="3 2" className={`${MOTION} stroke-indigo-500 dark:stroke-indigo-400`} style={{ opacity: hybrid ? 1 : 0 }} />

            {/* C–O bond, and its π bond */}
            <line x1={O.x} y1={O.y + 8} x2={ATOMS[0].x} y2={ATOMS[0].y} strokeWidth={1.4} className="stroke-foreground" />
            <line
              x1={O.x + 4}
              y1={O.y + 9}
              x2={O.x + 4}
              y2={ATOMS[0].y - 1}
              strokeWidth={1.4}
              strokeDasharray={hybrid ? "2 2" : undefined}
              className={`${MOTION} stroke-foreground`}
              style={{ opacity: hybrid || (s && s.co) ? 1 : 0 }}
            />
            <text x={O.x} y={O.y + 4} textAnchor="middle" className="fill-sky-700 text-[13px] font-semibold dark:fill-sky-300">
              O
            </text>

            {/* Full charges, one structure at a time */}
            <Fade on={!!s && s.charge === "O"}>
              <Minus x={O.x + 13} y={O.y - 6} />
            </Fade>
            {[5, 3, 1].map((i) => {
              const p = out(ATOMS[i], 13);
              return (
                <Fade key={`c${i}`} on={!!s && s.charge === i}>
                  <Minus x={r1(p.x)} y={r1(p.y)} />
                </Fade>
              );
            })}

            {/* Hybrid: partial charges and position names */}
            <Fade on={hybrid}>
              <text x={O.x + 9} y={O.y - 3} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
                δ⁻
              </text>
              {[5, 3, 1].map((i) => {
                const p = out(ATOMS[i], 13);
                return (
                  <text key={`d${i}`} x={r1(p.x)} y={r1(p.y) + 4} textAnchor="middle" className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
                    δ⁻
                  </text>
                );
              })}
            </Fade>
            {[5, 3, 1].map((i) => {
              const p = out(ATOMS[i], 36);
              const show = hybrid || (!!s && s.charge === i);
              return (
                <Fade key={`n${i}`} on={show}>
                  <text x={r1(p.x)} y={r1(p.y) + 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    {position(i)}
                  </text>
                </Fade>
              );
            })}

            {/* Curved arrows for the move to the next structure */}
            {[0, 1, 2].map((st) => (
              <Fade key={`a${st}`} on={step === st}>
                {arrowsFor(st).map((ar, j) => {
                  const c = curve(ar.a, ar.b, 14);
                  return (
                    <g key={j}>
                      <path d={c.d} fill="none" strokeWidth={1.3} className="stroke-rose-600 dark:stroke-rose-400" />
                      <polygon points={c.head} className="fill-rose-600 dark:fill-rose-400" />
                    </g>
                  );
                })}
              </Fade>
            ))}

            {/* pKa scale */}
            <text x={250} y={20} textAnchor="middle" className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
              pKa
            </text>
            <line x1={250} y1={pkaY(9)} x2={250} y2={pkaY(16.6)} strokeWidth={1.2} className="stroke-muted-foreground" />
            {[10, 12, 14, 16].map((v) => (
              <g key={v}>
                <line x1={247} y1={pkaY(v)} x2={253} y2={pkaY(v)} className="stroke-muted-foreground" />
                <text x={244} y={pkaY(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
                  {v}
                </text>
              </g>
            ))}
            <circle cx={250} cy={pkaY(PKA[0].value)} r={3.5} className="fill-indigo-600 dark:fill-indigo-400" />
            <text x={258} y={pkaY(PKA[0].value) + 4} className="fill-foreground text-[11px] font-semibold">
              phenol 10.0
            </text>
            <circle cx={250} cy={pkaY(PKA[1].value)} r={3} className="fill-muted-foreground" />
            <text x={258} y={pkaY(PKA[1].value) - 2} className="fill-muted-foreground text-[10px]">
              water 15.7
            </text>
            <circle cx={250} cy={pkaY(PKA[2].value)} r={3} className="fill-foreground" />
            <text x={258} y={pkaY(PKA[2].value) + 10} className="fill-foreground text-[10px]">
              ethanol 15.9
            </text>
            <text x={318} y={pkaY(9) - 2} textAnchor="end" className="fill-muted-foreground text-[9px]">
              stronger acid ↑
            </text>

            <text x={160} y={228} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              In ethoxide, CH₃CH₂O⁻, the charge stays on the oxygen.
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
