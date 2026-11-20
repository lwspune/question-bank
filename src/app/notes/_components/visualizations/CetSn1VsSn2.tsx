"use client";

/**
 * Animation: SN2 against SN1 on the concept's own substrate, (R)-2-bromooctane
 * (concept cethal-sn1-vs-sn2).
 *
 * Top panel, SN2 with OH⁻: the nucleophile comes in from the back (opposite
 * Br), one step through a transition state with five groups around C, and
 * the other three groups flip like an umbrella: inversion, (S)-octan-2-ol.
 * Rate = k[RBr][OH⁻].
 *
 * Bottom panel, SN1 with water: the C–Br bond breaks first (slow step) to a
 * planar carbocation; water adds from either face, so (R) and (S) form 50:50,
 * a racemic mixture. Rate = k[RBr].
 *
 * The carbon's three other groups are true 3D directions (CH₃, C₆H₁₃ on a
 * wedge, H on a dashed bond), projected obliquely; `configuration` reads R or
 * S from them, so the test proves the drawn substrate IS (R) and each product
 * is what the label says. Pinned by tests/notes-cet-visuals-chem-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const SN_STEPS: readonly FigureStep[] = [
  {
    title: "SN2: backside attack",
    caption: "OH⁻ approaches the carbon from the side opposite the bromine, the back side.",
  },
  {
    title: "SN2: transition state",
    caption:
      "In one step the C–O bond forms while the C–Br bond breaks. For a moment five groups surround the carbon; there is no carbocation.",
  },
  {
    title: "SN2: inversion",
    caption:
      "Br⁻ leaves and the other three groups flip like an umbrella in the wind: (R)-2-bromooctane gives (S)-octan-2-ol only. Rate = k[RBr][OH⁻].",
  },
  {
    title: "SN1: the slow step",
    caption: "With water in acetone the C–Br bond breaks first, on its own. This is the slow step, so the rate depends only on the halide.",
  },
  {
    title: "SN1: planar carbocation",
    caption: "The carbocation is planar: its three groups lie flat, and both faces are open. Rate = k[RBr].",
  },
  {
    title: "SN1: attack from either face",
    caption:
      "Water adds from the left face, giving (S), or from the right face, giving (R), equally: a racemic mixture.",
  },
];

/** The rate laws the two panels print. */
export const RATE_LAW = { sn2: "rate = k[RBr][OH⁻]", sn1: "rate = k[RBr]" } as const;

export type Vec3 = readonly [number, number, number];
export type Lean = 1 | 0 | -1;

/**
 * The carbon's three other groups as 3D directions (x right, y up, z towards
 * the reader). Lean +1: they point away from a group on the RIGHT (Br in the
 * substrate); 0: flat, as in the transition state or the carbocation; −1:
 * flipped, pointing away from a group on the LEFT.
 */
export function groupVectors(lean: Lean): { CH3: Vec3; C6H13: Vec3; H: Vec3 } {
  const x = -lean / 3;
  return {
    CH3: [x, 0.94, 0],
    C6H13: [x, -0.47, 0.81],
    H: [x, -0.47, -0.81],
  };
}

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/**
 * R or S from the directions of the three highest-priority groups, a > b > c
 * (the lowest is the fourth). Seen with the lowest pointing away, a → b → c
 * clockwise is R, which is a negative triple product a · (b × c).
 */
export function configuration(a: Vec3, b: Vec3, c: Vec3): "R" | "S" {
  return dot(a, cross(b, c)) < 0 ? "R" : "S";
}

/** Left and right along the reaction axis. */
export const LEFT: Vec3 = [-1, 0, 0];
export const RIGHT: Vec3 = [1, 0, 0];

/** Each structure in the figure, with what it is labelled. Priorities: Br or OH > C₆H₁₃ > CH₃ > H. */
export const STRUCTURES = {
  substrate: { label: "(R)-2-bromooctane", top: RIGHT, lean: 1 as Lean },
  sn2Product: { label: "(S)-octan-2-ol", top: LEFT, lean: -1 as Lean },
  sn1FromLeft: { label: "(S)-octan-2-ol", top: LEFT, lean: -1 as Lean },
  sn1FromRight: { label: "(R)-octan-2-ol", top: RIGHT, lean: 1 as Lean },
} as const;

export function configOf(s: { top: Vec3; lean: Lean }): "R" | "S" {
  const g = groupVectors(s.lean);
  return configuration(s.top, g.C6H13, g.CH3);
}

/** The lean of each panel's carbon at a step. */
export function sn2Lean(step: number): Lean {
  if (step === 0) return 1;
  if (step === 1) return 0;
  return -1;
}
export function sn1Lean(step: number): Lean {
  return step >= 4 ? 0 : 1;
}

/** True while the panel still shows a bond from C to Br. */
export const sn2HasBr = (step: number) => step < 2;
export const sn1HasBr = (step: number) => step < 4;

// Geometry (viewBox units).
const BOND = 30;
const OBLIQUE = 0.35;
export const SN2_C = { x: 165, y: 66 } as const;
export const SN1_C = { x: 165, y: 192 } as const;

/** Screen offset of a 3D direction from the carbon. */
export function project(v: Vec3): { x: number; y: number } {
  return { x: BOND * (v[0] + OBLIQUE * v[2]), y: -BOND * v[1] };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

type Pt = { x: number; y: number };

/** Arrowhead polygon at `tip`, pointing along the curve's last tangent (from `ctrl`). */
export function arrowHead(ctrl: Pt, tip: Pt, len = 7, half = 3.2): string {
  const a = Math.atan2(tip.y - ctrl.y, tip.x - ctrl.x);
  const bx = tip.x - len * Math.cos(a);
  const by = tip.y - len * Math.sin(a);
  const px = -Math.sin(a) * half;
  const py = Math.cos(a) * half;
  return `${r1(tip.x)},${r1(tip.y)} ${r1(bx + px)},${r1(by + py)} ${r1(bx - px)},${r1(by - py)}`;
}

function CurvedArrow({ from, ctrl, to, show }: { from: Pt; ctrl: Pt; to: Pt; show: boolean }) {
  return (
    <g className={MOTION} style={{ opacity: show ? 1 : 0 }}>
      <path
        d={`M ${from.x} ${from.y} Q ${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`}
        fill="none"
        className="stroke-rose-600 dark:stroke-rose-400"
        strokeWidth={1.4}
      />
      <polygon points={arrowHead(ctrl, to)} className="fill-rose-600 dark:fill-rose-400" />
    </g>
  );
}

/** A bond from (cx, cy) along `off`, drawn as a stretched unit line or wedge so it can turn smoothly. */
function Bond({ cx, cy, off, kind }: { cx: number; cy: number; off: Pt; kind: "plain" | "wedge" | "dash" }) {
  const len = Math.hypot(off.x, off.y);
  const angle = (Math.atan2(off.y, off.x) * 180) / Math.PI;
  const style = { transform: svgTransform({ x: cx, y: cy, angle, sx: len }) };
  if (kind === "wedge")
    return <polygon points="0,0 1,-2.6 1,2.6" className={`${MOTION} fill-foreground`} style={style} />;
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      strokeDasharray={kind === "dash" ? "2 2" : undefined}
      className={`${MOTION} stroke-foreground`}
      strokeWidth={1.3}
      style={style}
    />
  );
}

/** The carbon with its CH₃, C₆H₁₃ (wedge) and H (dashed) at a given lean. */
function Centre({ cx, cy, lean, plus }: { cx: number; cy: number; lean: Lean; plus: boolean }) {
  const g = groupVectors(lean);
  const me = project(g.CH3);
  const hex = project(g.C6H13);
  const h = project(g.H);
  return (
    <g>
      <Bond cx={cx} cy={cy} off={me} kind="plain" />
      <Bond cx={cx} cy={cy} off={hex} kind="wedge" />
      <Bond cx={cx} cy={cy} off={h} kind="dash" />
      <g className={MOTION} style={{ transform: svgTransform({ x: cx + me.x, y: cy + me.y - 4 }) }}>
        <text textAnchor="middle" className="fill-foreground text-[11px]">
          CH₃
        </text>
      </g>
      <g className={MOTION} style={{ transform: svgTransform({ x: cx + hex.x + 2, y: cy + hex.y + 11 }) }}>
        <text className="fill-foreground text-[11px]">C₆H₁₃</text>
      </g>
      <g className={MOTION} style={{ transform: svgTransform({ x: cx + h.x - 2, y: cy + h.y + 11 }) }}>
        <text textAnchor="end" className="fill-foreground text-[11px]">
          H
        </text>
      </g>
      <circle cx={cx} cy={cy} r={7} className="fill-background" />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        C
      </text>
      <text x={cx + 8} y={cy - 5} className={`${MOTION} fill-rose-700 text-[11px] font-bold dark:fill-rose-300`} style={{ opacity: plus ? 1 : 0 }}>
        +
      </text>
    </g>
  );
}

function Swap({ x, y, on, children, anchor = "middle", cls = "fill-muted-foreground" }: { x: number; y: number; on: boolean; children: string; anchor?: "start" | "middle" | "end"; cls?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${MOTION} ${cls} text-[11px]`} style={{ opacity: on ? 1 : 0 }}>
      {children}
    </text>
  );
}

export default function CetSn1VsSn2() {
  return (
    <StepFigure
      title="Animation · substitution in one step or in two"
      label="Top: SN2. OH⁻ attacks (R)-2-bromooctane from the back, five groups surround carbon in the transition state, bromide leaves and the molecule inverts to (S)-octan-2-ol. Bottom: SN1. The C–Br bond breaks first to a planar carbocation, and water adds from either face, giving a racemic mixture of (R) and (S)-octan-2-ol."
      viewBox="0 0 320 268"
      steps={SN_STEPS}
      note="Wedge: towards you. Dashed bond: away from you. Red curved arrows show where an electron pair moves."
    >
      {(step) => {
        const a = SN2_C;
        const b = SN1_C;
        const nuIn = step >= 1;
        return (
          <g>
            {/* SN2 panel */}
            <text x={8} y={16} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
              SN2: one step
            </text>
            <text x={312} y={16} textAnchor="end" className="fill-foreground text-[11px]">
              {RATE_LAW.sn2}
            </text>

            {/* C–O bond: dashed while forming, solid once made */}
            <line x1={a.x - 27} y1={a.y} x2={a.x - 7} y2={a.y} strokeDasharray="3 2" strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: step === 1 ? 1 : 0 }} />
            <line x1={a.x - 27} y1={a.y} x2={a.x - 7} y2={a.y} strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: step >= 2 ? 1 : 0 }} />
            {/* C–Br bond: solid, then breaking, then gone */}
            <line x1={a.x + 7} y1={a.y} x2={a.x + 28} y2={a.y} strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: step === 0 ? 1 : 0 }} />
            <line x1={a.x + 7} y1={a.y} x2={a.x + 28} y2={a.y} strokeDasharray="3 2" strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: step === 1 ? 1 : 0 }} />

            <Centre cx={a.x} cy={a.y} lean={sn2Lean(step)} plus={false} />

            {/* The nucleophile */}
            <g className={MOTION} style={{ transform: svgTransform({ x: nuIn ? a.x - 28 : a.x - 72, y: a.y + 4 }) }}>
              <Swap x={0} y={0} on={!nuIn} anchor="end" cls="fill-sky-700 font-semibold dark:fill-sky-300">
                HO⁻
              </Swap>
              <Swap x={0} y={0} on={nuIn} anchor="end" cls="fill-sky-700 font-semibold dark:fill-sky-300">
                HO
              </Swap>
            </g>
            {/* The leaving group */}
            <g className={MOTION} style={{ transform: svgTransform({ x: sn2HasBr(step) ? a.x + 30 : a.x + 86, y: a.y + 4 }) }}>
              <Swap x={0} y={0} on={sn2HasBr(step)} anchor="start" cls="fill-amber-700 font-semibold dark:fill-amber-300">
                Br
              </Swap>
              <Swap x={0} y={0} on={!sn2HasBr(step)} anchor="start" cls="fill-amber-700 font-semibold dark:fill-amber-300">
                Br⁻
              </Swap>
            </g>
            <Swap x={a.x - 40} y={a.y - 9} on={step === 1}>δ⁻</Swap>
            <Swap x={a.x + 38} y={a.y - 9} on={step === 1}>δ⁻</Swap>

            <CurvedArrow from={{ x: a.x - 68, y: a.y - 10 }} ctrl={{ x: a.x - 40, y: a.y - 30 }} to={{ x: a.x - 11, y: a.y - 8 }} show={step === 0} />
            <CurvedArrow from={{ x: a.x + 16, y: a.y - 3 }} ctrl={{ x: a.x + 24, y: a.y - 20 }} to={{ x: a.x + 34, y: a.y - 9 }} show={step === 0} />

            <Swap x={a.x} y={112} on={step === 0}>
              (R)-2-bromooctane
            </Swap>
            <Swap x={a.x} y={112} on={step === 1}>
              transition state: five groups on C
            </Swap>
            <Swap x={a.x} y={112} on={step >= 2} cls="fill-foreground font-semibold">
              (S)-octan-2-ol: inverted
            </Swap>

            <line x1={8} y1={124} x2={312} y2={124} className="stroke-border" />

            {/* SN1 panel */}
            <text x={8} y={142} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
              SN1: two steps
            </text>
            <text x={312} y={142} textAnchor="end" className="fill-foreground text-[11px]">
              {RATE_LAW.sn1}
            </text>

            <line x1={b.x + 7} y1={b.y} x2={b.x + 28} y2={b.y} strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: sn1HasBr(step) ? 1 : 0 }} />
            <Centre cx={b.x} cy={b.y} lean={sn1Lean(step)} plus={step >= 4} />
            <g className={MOTION} style={{ transform: svgTransform({ x: sn1HasBr(step) ? b.x + 30 : b.x + 100, y: sn1HasBr(step) ? b.y + 4 : b.y + 22 }) }}>
              <Swap x={0} y={0} on={sn1HasBr(step)} anchor="start" cls="fill-amber-700 font-semibold dark:fill-amber-300">
                Br
              </Swap>
              <Swap x={0} y={0} on={!sn1HasBr(step)} anchor="start" cls="fill-amber-700 font-semibold dark:fill-amber-300">
                Br⁻
              </Swap>
            </g>
            <CurvedArrow from={{ x: b.x + 16, y: b.y - 3 }} ctrl={{ x: b.x + 24, y: b.y - 20 }} to={{ x: b.x + 34, y: b.y - 9 }} show={step === 3} />
            <Swap x={b.x + 58} y={b.y - 16} on={step === 3} anchor="start" cls="fill-rose-700 dark:fill-rose-300">
              slow
            </Swap>

            {/* Water from both faces */}
            <Swap x={b.x - 56} y={b.y + 4} on={step >= 5} anchor="end" cls="fill-sky-700 font-semibold dark:fill-sky-300">
              H₂O
            </Swap>
            <Swap x={b.x + 56} y={b.y + 4} on={step >= 5} anchor="start" cls="fill-sky-700 font-semibold dark:fill-sky-300">
              H₂O
            </Swap>
            <CurvedArrow from={{ x: b.x - 56, y: b.y - 8 }} ctrl={{ x: b.x - 34, y: b.y - 24 }} to={{ x: b.x - 10, y: b.y + 1 }} show={step >= 5} />
            <CurvedArrow from={{ x: b.x + 56, y: b.y - 8 }} ctrl={{ x: b.x + 34, y: b.y - 24 }} to={{ x: b.x + 10, y: b.y + 1 }} show={step >= 5} />

            <Swap x={b.x} y={240} on={step <= 3}>
              (R)-2-bromooctane
            </Swap>
            <Swap x={b.x} y={240} on={step === 4}>
              planar carbocation
            </Swap>
            <Swap x={10} y={240} on={step >= 5} anchor="start" cls="fill-foreground">
              left face: (S)-octan-2-ol
            </Swap>
            <Swap x={310} y={240} on={step >= 5} anchor="end" cls="fill-foreground">
              right face: (R)-octan-2-ol
            </Swap>
            <Swap x={b.x} y={258} on={step >= 5} cls="fill-foreground font-semibold">
              50 : 50, racemic mixture
            </Swap>
          </g>
        );
      }}
    </StepFigure>
  );
}
