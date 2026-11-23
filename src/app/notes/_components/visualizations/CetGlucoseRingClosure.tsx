"use client";

/**
 * Animation: open-chain glucose closes into its ring (concept
 * cetbio-classification-and-glucose-structure). Fischer projections of
 * D-glucose, carbons numbered 1 to 6. The C-5 OH adds across the C-1
 * aldehyde: the C-5 oxygen bonds to C-1 and its H moves to the old carbonyl
 * oxygen, so C-1 now carries a new OH. The ring has five carbons and one
 * oxygen (six-membered, pyranose), and is a hemiacetal. C-1 becomes a new
 * stereocentre, the anomeric carbon: OH on the same side as the ring oxygen
 * (right) is alpha, on the other side beta. Final frame:
 * alpha ⇌ open chain ⇌ beta.
 *
 * The two ring forms slide out of the open chain (one group each, moved by
 * style.transform). Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type Form = "open" | "alpha" | "beta";
type Side = { left: string; right: string };

/** Open-chain D-glucose, C-2 to C-5, in the Fischer projection (C-1 is CHO, C-6 is CH₂OH). */
export const OPEN_CHAIN: Record<2 | 3 | 4 | 5, Side> = {
  2: { left: "H", right: "OH" },
  3: { left: "HO", right: "H" },
  4: { left: "H", right: "OH" },
  5: { left: "H", right: "OH" },
};

/** The ring: C-1 to C-5 and the oxygen that was the C-5 OH. */
export const RING_ATOMS = ["C1", "C2", "C3", "C4", "C5", "O"] as const;

/** Which carbon's OH closes the ring, and onto which carbon. */
export const RING_CLOSURE = { ohOn: 5, addsTo: 1 } as const;

/** The anomeric OH on C-1: right (same side as the ring O) is alpha, left is beta. */
export const ANOMER_OH: Record<"alpha" | "beta", "right" | "left"> = { alpha: "right", beta: "left" };

/** C-1 substituents in each ring form. */
export function c1Sides(form: "alpha" | "beta"): Side {
  return ANOMER_OH[form] === "right" ? { left: "H", right: "OH" } : { left: "HO", right: "H" };
}

/** Chiral carbons: C-2 to C-5 in the open chain; C-1 joins them in the ring. */
export function chiralCarbons(form: Form): number[] {
  return form === "open" ? [2, 3, 4, 5] : [1, 2, 3, 4, 5];
}

/** OH groups: C-2 to C-5 plus C-6 in the open chain; C-1 to C-4 plus C-6 in the ring. Both 5. */
export function ohCount(form: Form): number {
  const carbons = form === "open" ? ([2, 3, 4, 5] as const) : ([2, 3, 4] as const);
  const own = carbons.filter((c) => [OPEN_CHAIN[c].left, OPEN_CHAIN[c].right].some((g) => g === "OH" || g === "HO")).length;
  return own + 1 + (form === "open" ? 0 : 1);
}

export const GLUCOSE_STEPS: readonly FigureStep[] = [
  {
    title: "Open chain",
    caption:
      "Glucose is an aldohexose: an aldehyde (CHO) at C-1 and OH groups on C-2 to C-6. Its four chiral carbons are C-2 to C-5.",
  },
  {
    title: "C-5 OH reaches C-1",
    caption: "In water the chain bends so that the OH on C-5 adds across the C-1 aldehyde.",
  },
  {
    title: "The ring closes",
    caption:
      "The C-5 oxygen bonds to C-1 and its H moves to the old C=O oxygen, so C-1 now carries a new OH. Five carbons and one oxygen make a six-membered pyranose ring, a hemiacetal.",
  },
  {
    title: "Alpha and beta anomers",
    caption:
      "C-1 is now a new stereocentre, the anomeric carbon. OH on the same side as the ring oxygen gives alpha, on the other side beta. They differ only at C-1, and each opens back to the chain.",
  },
];

const RING_STEP = 2;
const BETA_STEP = 3;

/** Where each form's centre line sits; the ring forms start inside the open chain and slide out. */
export const FORM_X: Record<Form, number> = { alpha: 42, open: 156, beta: 268 };
export function formPose(step: number, form: Form): { x: number; opacity: number } {
  if (form === "open") return { x: FORM_X.open, opacity: 1 };
  const shown = step >= (form === "alpha" ? RING_STEP : BETA_STEP);
  return { x: shown ? FORM_X[form] : FORM_X.open, opacity: shown ? 1 : 0 };
}

// Geometry (viewBox units), relative to a form's centre line.
const Y1 = 58;
const DYC = 24;
const cy = (c: number) => Y1 + (c - 1) * DYC;
const BRIDGE_X = 44;
const BOND = 13;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A filled arrow head at `tip`, pointing away from `from`. */
export function arrowHead(tip: { x: number; y: number }, from: { x: number; y: number }, len = 7, half = 3.5): string {
  const dx = tip.x - from.x;
  const dy = tip.y - from.y;
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  const bx = tip.x - len * ux;
  const by = tip.y - len * uy;
  const pts = [
    [tip.x, tip.y],
    [bx - half * uy, by + half * ux],
    [bx + half * uy, by - half * ux],
  ];
  return pts.map(([x, y]) => `${r2(x)},${r2(y)}`).join(" ");
}

const HI = "fill-amber-700 font-semibold dark:fill-amber-300";
const NEW = "fill-rose-700 font-semibold dark:fill-rose-300";

function Label({ x, y, text, anchor, cls }: { x: number; y: number; text: string; anchor: "start" | "end" | "middle"; cls?: string }) {
  return (
    <text x={x} y={y + 3.5} textAnchor={anchor} className={`text-[10px] ${cls ?? "fill-foreground"}`}>
      {text}
    </text>
  );
}

function Num({ c, x }: { c: number; x?: number }) {
  return (
    <text x={x ?? 3} y={cy(c) - 3} className="fill-muted-foreground text-[8px]">
      {c}
    </text>
  );
}

function Fischer({ form }: { form: Form }) {
  const ring = form !== "open";
  const c1 = ring ? c1Sides(form) : null;
  return (
    <g>
      {/* Backbone */}
      <line x1={0} y1={ring ? cy(1) : cy(1) + 6} x2={0} y2={cy(6) - 7} strokeWidth={1.2} className="stroke-foreground" />

      {/* C-1 */}
      {ring && c1 ? (
        <g>
          <line x1={-BOND} y1={cy(1)} x2={BOND} y2={cy(1)} strokeWidth={1.2} className="stroke-foreground" />
          <Label x={-BOND - 2} y={cy(1)} text={c1.left} anchor="end" cls={c1.left === "HO" ? NEW : undefined} />
          <Label x={BOND + 2} y={cy(1)} text={c1.right} anchor="start" cls={c1.right === "OH" ? NEW : undefined} />
          <Num c={1} />
        </g>
      ) : (
        <g>
          <Label x={0} y={cy(1)} text="CHO" anchor="middle" cls={HI} />
          <Num c={1} x={13} />
        </g>
      )}

      {/* C-2 to C-4 */}
      {([2, 3, 4] as const).map((c) => (
        <g key={c}>
          <line x1={-BOND} y1={cy(c)} x2={BOND} y2={cy(c)} strokeWidth={1.2} className="stroke-foreground" />
          <Label x={-BOND - 2} y={cy(c)} text={OPEN_CHAIN[c].left} anchor="end" />
          <Label x={BOND + 2} y={cy(c)} text={OPEN_CHAIN[c].right} anchor="start" />
          <Num c={c} />
        </g>
      ))}

      {/* C-5: OH in the chain, the ring bond in the ring */}
      <line x1={-BOND} y1={cy(5)} x2={ring ? 0 : BOND} y2={cy(5)} strokeWidth={1.2} className="stroke-foreground" />
      <Label x={-BOND - 2} y={cy(5)} text={OPEN_CHAIN[5].left} anchor="end" />
      {!ring && <Label x={BOND + 2} y={cy(5)} text="OH" anchor="start" cls={HI} />}
      <Num c={5} />

      {/* The ring oxygen bridge, C-1 to C-5 */}
      {ring && (
        <g>
          <path
            d={`M0,${cy(1)} V${cy(1) - 14} H${BRIDGE_X} V${cy(3) - 6} M${BRIDGE_X},${cy(3) + 7} V${cy(5)} H0`}
            fill="none"
            strokeWidth={1.4}
            className="stroke-rose-600 dark:stroke-rose-400"
          />
          <Label x={BRIDGE_X} y={cy(3)} text="O" anchor="middle" cls={NEW} />
        </g>
      )}

      {/* C-6 */}
      <Label x={0} y={cy(6)} text="CH₂OH" anchor="middle" />
      <Num c={6} x={19} />
    </g>
  );
}

const ATTACK = {
  start: { x: 27, y: cy(5) - 8 },
  c1: { x: 60, y: cy(5) - 22 },
  c2: { x: 60, y: cy(1) + 22 },
  end: { x: 15, y: cy(1) + 6 },
};

export default function CetGlucoseRingClosure() {
  return (
    <StepFigure
      title="Animation · glucose closes into a ring"
      label="Fischer projections of D-glucose. In the open chain C-1 is an aldehyde. The OH on C-5 adds to C-1, the C-5 oxygen bridges to C-1 and C-1 gets a new OH, making a six-membered pyranose ring, a hemiacetal. With the new OH on the right the ring form is alpha-D-glucose, on the left beta-D-glucose. Alpha and beta are each in equilibrium with the open chain."
      viewBox="0 0 320 222"
      steps={GLUCOSE_STEPS}
      note="Each crossing is a carbon; small numbers are carbon numbers. The ring: C-1, C-2, C-3, C-4, C-5 and the oxygen (red bridge)."
    >
      {(step) => {
        const alpha = formPose(step, "alpha");
        const beta = formPose(step, "beta");
        return (
          <g>
            <text x={160} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              C-5 OH adds to the C-1 aldehyde: a hemiacetal ring
            </text>

            {/* Open chain, with the curved arrow from the C-5 OH to C-1 */}
            <g style={{ transform: svgTransform({ x: FORM_X.open, y: 0 }) }}>
              <Fischer form="open" />
              <g className={MOTION} style={{ opacity: step >= 1 ? 1 : 0 }}>
                <path
                  d={`M${ATTACK.start.x},${ATTACK.start.y} C${ATTACK.c1.x},${ATTACK.c1.y} ${ATTACK.c2.x},${ATTACK.c2.y} ${ATTACK.end.x},${ATTACK.end.y}`}
                  fill="none"
                  strokeWidth={1.5}
                  className="stroke-rose-600 dark:stroke-rose-400"
                />
                <polygon points={arrowHead(ATTACK.end, ATTACK.c2)} className="fill-rose-600 dark:fill-rose-400" />
              </g>
            </g>
            <text x={FORM_X.open} y={200} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              open chain
            </text>
            <text x={FORM_X.open} y={213} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
              aldehyde at C-1
            </text>

            {/* Alpha */}
            <g className={MOTION} style={{ transform: svgTransform({ x: alpha.x, y: 0 }), opacity: alpha.opacity }}>
              <Fischer form="alpha" />
              <text x={0} y={200} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                α-D-glucose
              </text>
              <text x={0} y={213} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
                pyranose
              </text>
            </g>
            <text x={107} y={cy(3) + 4} textAnchor="middle" className={`fill-foreground text-[14px] ${MOTION}`} style={{ opacity: alpha.opacity }}>
              ⇌
            </text>

            {/* Beta */}
            <g className={MOTION} style={{ transform: svgTransform({ x: beta.x, y: 0 }), opacity: beta.opacity }}>
              <Fischer form="beta" />
              <text x={0} y={200} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                β-D-glucose
              </text>
              <text x={0} y={213} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
                pyranose
              </text>
            </g>
            <text x={219} y={cy(3) + 4} textAnchor="middle" className={`fill-foreground text-[14px] ${MOTION}`} style={{ opacity: beta.opacity }}>
              ⇌
            </text>
          </g>
        );
      }}
    </StepFigure>
  );
}
