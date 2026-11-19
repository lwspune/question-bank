"use client";

/**
 * Animation: electrophilic substitution of benzene, using the concept's
 * nitration example (concept cetarom-eas-reactions). Its own three steps:
 * make the electrophile, let it attack the ring to form a σ-complex, lose H⁺
 * to get the ring back.
 *
 * 1. conc. HNO₃ + conc. H₂SO₄ make the nitronium ion:
 *    HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻.
 * 2. The ring's π electrons attack NO₂⁺. One carbon now carries both H and
 *    NO₂ (sp³), the + is spread over the other five: the σ-complex, no longer
 *    aromatic (drawn as an open ring with +).
 * 3. HSO₄⁻ takes the H⁺, the C–H electrons return to the ring, and
 *    nitrobenzene forms with H₂SO₄ given back.
 *
 * The moving H and NO₂ are single groups whose transform changes; the bonds
 * are stretched unit lines. Pinned by tests/notes-cet-visuals-chem-b.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export const EAS_STEPS: readonly FigureStep[] = [
  {
    title: "Making the electrophile",
    caption: "Concentrated H₂SO₄ takes water out of HNO₃, giving the nitronium ion NO₂⁺, the electrophile.",
  },
  {
    title: "Attack on the ring",
    caption: "The ring's π electrons attack NO₂⁺ and a new C–N bond forms.",
  },
  {
    title: "The σ-complex",
    caption:
      "One carbon now holds both H and NO₂, and the + is spread over the other five. This carbocation, the σ-complex, is not aromatic.",
  },
  {
    title: "Loss of H⁺",
    caption: "HSO₄⁻ pulls off the H⁺. The C–H bond's electron pair goes back into the ring.",
  },
  {
    title: "Ring restored",
    caption: "The aromatic ring is back: nitrobenzene, with H₂SO₄ given back. H has been substituted by NO₂.",
  },
];

/** The electrophile-forming equation, and its atom balance. */
export const NITRONIUM_EQUATION = "HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻";
type Atoms = { H: number; N: number; O: number; S: number; charge: number };
const add = (...xs: Atoms[]): Atoms =>
  xs.reduce((a, b) => ({ H: a.H + b.H, N: a.N + b.N, O: a.O + b.O, S: a.S + b.S, charge: a.charge + b.charge }), {
    H: 0,
    N: 0,
    O: 0,
    S: 0,
    charge: 0,
  });
const times = (n: number, a: Atoms): Atoms => ({ H: n * a.H, N: n * a.N, O: n * a.O, S: n * a.S, charge: n * a.charge });
export const SPECIES = {
  HNO3: { H: 1, N: 1, O: 3, S: 0, charge: 0 },
  H2SO4: { H: 2, N: 0, O: 4, S: 1, charge: 0 },
  NO2plus: { H: 0, N: 1, O: 2, S: 0, charge: 1 },
  H3Oplus: { H: 3, N: 0, O: 1, S: 0, charge: 1 },
  HSO4minus: { H: 1, N: 0, O: 4, S: 1, charge: -1 },
} as const satisfies Record<string, Atoms>;
export const NITRONIUM_SIDES = {
  left: add(SPECIES.HNO3, times(2, SPECIES.H2SO4)),
  right: add(SPECIES.NO2plus, SPECIES.H3Oplus, times(2, SPECIES.HSO4minus)),
};

/** What the ring is at each step. */
export function ringState(step: number): "aromatic" | "sigma-complex" {
  return step === 2 || step === 3 ? "sigma-complex" : "aromatic";
}
/** Groups on the reacting carbon at each step. */
export function groupsOnCarbon(step: number): string[] {
  if (step <= 1) return ["H"];
  if (step <= 3) return ["H", "NO₂"];
  return ["NO₂"];
}

// Geometry (viewBox units).
export const RING = { x: 116, y: 138, r: 34 } as const;
const INNER = 20;
export const TOP_C = { x: RING.x, y: RING.y - RING.r } as const;
export function ringVertices(): { x: number; y: number }[] {
  return Array.from({ length: 6 }, (_, k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180;
    return { x: Math.round((RING.x + RING.r * Math.cos(a)) * 10) / 10, y: Math.round((RING.y + RING.r * Math.sin(a)) * 10) / 10 };
  });
}

const BASE = { x: 34, y: 74 } as const;

type Pt = { x: number; y: number };
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Where the H bond ends, its label sits, and whether it shows. */
function hPose(step: number): { bond: Pt; label: Pt; opacity: number } {
  if (step <= 1) return { bond: { x: 0, y: -17 }, label: { x: TOP_C.x, y: TOP_C.y - 21 }, opacity: 1 };
  if (step <= 3) return { bond: { x: -13, y: -13 }, label: { x: TOP_C.x - 18, y: TOP_C.y - 16 }, opacity: 1 };
  return { bond: { x: -13, y: -13 }, label: { x: BASE.x + 22, y: BASE.y + 2 }, opacity: 0 };
}
/** Where the NO₂ label sits and its bond ends. */
function no2Pose(step: number): { label: Pt; bond: Pt; bonded: boolean } {
  if (step === 0) return { label: { x: 262, y: 124 }, bond: { x: 14, y: -13 }, bonded: false };
  if (step === 1) return { label: { x: 204, y: 118 }, bond: { x: 14, y: -13 }, bonded: false };
  if (step <= 3) return { label: { x: TOP_C.x + 26, y: TOP_C.y - 16 }, bond: { x: 13, y: -13 }, bonded: true };
  return { label: { x: TOP_C.x, y: TOP_C.y - 21 }, bond: { x: 0, y: -17 }, bonded: true };
}

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
      <path d={`M ${from.x} ${from.y} Q ${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`} fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.4} />
      <polygon points={arrowHead(ctrl, to)} className="fill-rose-600 dark:fill-rose-400" />
    </g>
  );
}

function StretchBond({ from, off, opacity }: { from: Pt; off: Pt; opacity: number }) {
  const len = Math.hypot(off.x, off.y);
  const angle = (Math.atan2(off.y, off.x) * 180) / Math.PI;
  return (
    <line
      x1={0}
      y1={0}
      x2={1}
      y2={0}
      vectorEffect="non-scaling-stroke"
      strokeWidth={1.4}
      className={`${MOTION} stroke-foreground`}
      style={{ transform: svgTransform({ x: from.x, y: from.y, angle, sx: len }), opacity }}
    />
  );
}

function Fade({ x, y, on, children, cls, anchor = "middle" }: { x: number; y: number; on: boolean; children: string; cls: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${MOTION} ${cls}`} style={{ opacity: on ? 1 : 0 }}>
      {children}
    </text>
  );
}

/** The open ring of a σ-complex: an arc round the five carbons away from the sp³ one. */
const HORSESHOE = (() => {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${r1(RING.x + INNER * Math.cos(a))} ${r1(RING.y + INNER * Math.sin(a))}`;
  };
  return `M ${p(-50)} A ${INNER} ${INNER} 0 1 1 ${p(230)}`;
})();

export default function CetEasMechanism() {
  const verts = ringVertices();
  const hex = verts.map((v) => `${v.x},${v.y}`).join(" ");
  return (
    <StepFigure
      title="Animation · nitration of benzene, step by step"
      label="Nitration of benzene. Nitric and sulphuric acids make the nitronium ion NO₂⁺. The ring's π electrons attack it, giving the σ-complex, a carbocation that is not aromatic. HSO₄⁻ removes H⁺ and the aromatic ring returns as nitrobenzene."
      viewBox="0 0 320 212"
      steps={EAS_STEPS}
      note="Red curved arrows show where an electron pair moves. Circle in the ring: aromatic. Open ring with +: the σ-complex."
    >
      {(step) => {
        const h = hPose(step);
        const n = no2Pose(step);
        const sigma = ringState(step) === "sigma-complex";
        return (
          <g>
            <text x={160} y={18} textAnchor="middle" className={`${MOTION} text-[11px] ${step === 0 ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}>
              {NITRONIUM_EQUATION}
            </text>

            {/* Benzene ring */}
            <polygon points={hex} fill="none" strokeWidth={1.5} className="stroke-foreground" />
            <circle cx={RING.x} cy={RING.y} r={INNER} fill="none" strokeWidth={1.3} className={`${MOTION} stroke-foreground`} style={{ opacity: sigma ? 0 : 1 }} />
            <path d={HORSESHOE} fill="none" strokeWidth={1.3} className={`${MOTION} stroke-rose-600 dark:stroke-rose-400`} style={{ opacity: sigma ? 1 : 0 }} />
            <Fade x={RING.x} y={RING.y + 5} on={sigma} cls="fill-rose-700 text-[14px] font-bold dark:fill-rose-300">
              +
            </Fade>

            {/* H on the reacting carbon */}
            <StretchBond from={TOP_C} off={h.bond} opacity={step <= 3 ? 1 : 0} />
            <g className={MOTION} style={{ transform: svgTransform({ x: h.label.x, y: h.label.y }), opacity: h.opacity }}>
              <text textAnchor="middle" className="fill-foreground text-[11px]">
                H
              </text>
            </g>

            {/* NO₂: the free ion, then the bonded group */}
            <StretchBond from={TOP_C} off={n.bond} opacity={n.bonded ? 1 : 0} />
            <g className={MOTION} style={{ transform: svgTransform({ x: n.label.x, y: n.label.y }) }}>
              <Fade x={0} y={0} on={!n.bonded} cls="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                NO₂⁺
              </Fade>
              <Fade x={0} y={0} on={n.bonded} cls="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
                NO₂
              </Fade>
            </g>

            {/* The base */}
            <Fade x={BASE.x} y={BASE.y} on={step === 3} cls="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
              HSO₄⁻
            </Fade>
            <Fade x={BASE.x} y={BASE.y} on={step === 4} cls="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
              H₂SO₄
            </Fade>

            {/* Electron-pair arrows */}
            <CurvedArrow from={{ x: RING.x + 15, y: RING.y - 14 }} ctrl={{ x: 160, y: 104 }} to={{ x: 199, y: 106 }} show={step === 1} />
            <CurvedArrow from={{ x: BASE.x + 18, y: BASE.y - 9 }} ctrl={{ x: 70, y: 52 }} to={{ x: TOP_C.x - 22, y: TOP_C.y - 26 }} show={step === 3} />
            <CurvedArrow from={{ x: TOP_C.x - 8, y: TOP_C.y - 8 }} ctrl={{ x: TOP_C.x - 18, y: TOP_C.y + 8 }} to={{ x: TOP_C.x - 9, y: TOP_C.y + 17 }} show={step === 3} />

            {/* What the ring is */}
            <Fade x={RING.x} y={194} on={step <= 1} cls="fill-muted-foreground text-[11px]">
              benzene
            </Fade>
            <Fade x={RING.x} y={194} on={sigma} cls="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
              σ-complex: not aromatic
            </Fade>
            <Fade x={RING.x} y={194} on={step === 4} cls="fill-foreground text-[11px] font-semibold">
              nitrobenzene, C₆H₅NO₂
            </Fade>

            {/* Steps summary on the right */}
            <Fade x={204} y={164} on={step === 4} anchor="start" cls="fill-muted-foreground text-[10px]">
              1. make NO₂⁺
            </Fade>
            <Fade x={204} y={178} on={step === 4} anchor="start" cls="fill-muted-foreground text-[10px]">
              2. attack: σ-complex
            </Fade>
            <Fade x={204} y={192} on={step === 4} anchor="start" cls="fill-muted-foreground text-[10px]">
              3. lose H⁺: ring back
            </Fade>
          </g>
        );
      }}
    </StepFigure>
  );
}
