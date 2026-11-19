/**
 * Static figure: work done by a gas as the signed area under its P–V path
 * (concept jpthermo-work-area).
 *
 * Drawn with the concept's worked example: a straight line from A (1 L,
 * 500 kPa) to B (5 L, 200 kPa), then at constant pressure back to C (1 L,
 * 200 kPa); closing the loop, C to A is at constant volume. Three panels:
 * - A → B, a sloping expansion: the trapezium ½(500 + 200)(5 − 1) = +1400 J.
 * - B → C, a constant-pressure compression: the rectangle 200 × (1 − 5) = −800 J,
 *   negative because the path runs to the left.
 * - The whole loop: C → A is vertical, so W = 0, and the net work is the
 *   enclosed triangle ½ × 4 × 300 = +600 J, positive because the loop runs
 *   clockwise (the gas expands at the higher pressure).
 * kPa × L = J. Values pinned by tests/notes-jee-visuals-phys-a.test.ts.
 * Server component, no client state.
 */

export type PvPoint = { V: number; P: number };

/** The concept's worked example: V in litres, P in kPa. */
export const PV_POINTS: Readonly<Record<"A" | "B" | "C", PvPoint>> = {
  A: { V: 1, P: 500 },
  B: { V: 5, P: 200 },
  C: { V: 1, P: 200 },
};

/**
 * Work done by the gas along a straight leg from p to q, in J (kPa × L):
 * the trapezium ½(P₁ + P₂)(V₂ − V₁). It covers every straight leg: a
 * horizontal one gives P(V₂ − V₁), a vertical one gives 0, a leftward one is
 * negative.
 */
export function legWork(p: PvPoint, q: PvPoint): number {
  return 0.5 * (p.P + q.P) * (q.V - p.V);
}

export type Leg = { from: "A" | "B" | "C"; to: "A" | "B" | "C"; kind: string; work: number };

export const LEGS: readonly Leg[] = [
  { from: "A", to: "B", kind: "straight, expansion (trapezium)", work: legWork(PV_POINTS.A, PV_POINTS.B) },
  { from: "B", to: "C", kind: "constant pressure, compression", work: legWork(PV_POINTS.B, PV_POINTS.C) },
  { from: "C", to: "A", kind: "constant volume", work: legWork(PV_POINTS.C, PV_POINTS.A) },
];

/** Net work round the loop A → B → C → A. */
export const NET_WORK = LEGS.reduce((s, l) => s + l.work, 0);

/**
 * Signed area of a closed P–V loop by the shoelace formula, with V across and
 * P up: negative for a clockwise loop. The work done by the gas is MINUS this,
 * so a clockwise loop does positive work.
 */
export function loopSignedArea(pts: readonly PvPoint[]): number {
  let s = 0;
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k];
    const b = pts[(k + 1) % pts.length];
    s += a.V * b.P - b.V * a.P;
  }
  return s / 2;
}

// Panel geometry (viewBox units). Each panel: V from 0 to 6 L, P from 0 to 600 kPa.
export const PANEL_X0 = [30, 128, 226] as const;
const PANEL_W = 84;
const Y_AXIS = 150;
const Y_TOP = 40;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Screen position of a P–V point in panel k. */
export function toScreen(k: number, p: PvPoint): { x: number; y: number } {
  return { x: r2(PANEL_X0[k] + (p.V / 6) * PANEL_W), y: r2(Y_AXIS - (p.P / 600) * (Y_AXIS - Y_TOP)) };
}

const pointsAttr = (k: number, pts: readonly PvPoint[]) =>
  pts
    .map((p) => toScreen(k, p))
    .map((s) => `${s.x},${s.y}`)
    .join(" ");

/** A small arrow head at the middle of the leg p → q, pointing along it. */
function MidArrow({ k, p, q, className }: { k: number; p: PvPoint; q: PvPoint; className: string }) {
  const a = toScreen(k, p);
  const b = toScreen(k, q);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const tip = { x: mx + 4 * Math.cos(ang), y: my + 4 * Math.sin(ang) };
  const back = (s: number) => ({ x: tip.x - 8 * Math.cos(ang) + s * 4 * Math.sin(ang), y: tip.y - 8 * Math.sin(ang) - s * 4 * Math.cos(ang) });
  const l = back(1);
  const r = back(-1);
  return <polygon points={`${r2(tip.x)},${r2(tip.y)} ${r2(l.x)},${r2(l.y)} ${r2(r.x)},${r2(r.y)}`} className={className} />;
}

const POS = { fill: "fill-emerald-500/30 dark:fill-emerald-400/25", text: "fill-emerald-700 dark:fill-emerald-300" };
const NEG = { fill: "fill-rose-500/30 dark:fill-rose-400/25", text: "fill-rose-700 dark:fill-rose-300" };
const NET = { fill: "fill-indigo-500/30 dark:fill-indigo-400/25", text: "fill-indigo-700 dark:fill-indigo-300" };
const PATH = "stroke-foreground";
const HEAD = "fill-foreground";

function Axes({ k }: { k: number }) {
  const o = toScreen(k, { V: 0, P: 0 });
  const right = toScreen(k, { V: 6, P: 0 });
  const top = toScreen(k, { V: 0, P: 600 });
  return (
    <g>
      {[200, 500].map((P) => {
        const y = toScreen(k, { V: 0, P }).y;
        return <line key={P} x1={o.x} y1={y} x2={right.x} y2={y} strokeDasharray="2 3" className="stroke-border" />;
      })}
      <line x1={o.x} y1={o.y} x2={right.x} y2={o.y} className="stroke-muted-foreground" />
      <line x1={o.x} y1={o.y} x2={top.x} y2={top.y} className="stroke-muted-foreground" />
      {[1, 5].map((V) => (
        <text key={V} x={toScreen(k, { V, P: 0 }).x} y={o.y + 11} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {V}
        </text>
      ))}
    </g>
  );
}

function Dot({ k, name, dx, dy }: { k: number; name: "A" | "B" | "C"; dx: number; dy: number }) {
  const s = toScreen(k, PV_POINTS[name]);
  return (
    <g>
      <circle cx={s.x} cy={s.y} r={2.5} className="fill-foreground" />
      <text x={s.x + dx} y={s.y + dy} className="fill-foreground text-[10px] font-semibold">
        {name}
      </text>
    </g>
  );
}

const ground = (V: number): PvPoint => ({ V, P: 0 });

export default function JeePvWorkArea() {
  const { A, B, C } = PV_POINTS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · work as the signed area under a gas&apos;s path
      </p>
      <svg
        viewBox="0 0 320 196"
        className="block h-auto w-full"
        role="img"
        aria-label="Three pressure against volume plots of one path. A to B, a straight expansion from 1 litre at 500 kilopascal to 5 litres at 200 kilopascal: the trapezium under it, plus 1400 joules. B to C, back to 1 litre at a constant 200 kilopascal: the rectangle under it counts minus 800 joules because the path runs to the left. The whole loop, closed by C to A at constant volume with zero work: the enclosed triangle, plus 600 joules, because the loop runs clockwise."
      >
        <text x={6} y={14} className="fill-muted-foreground text-[10px]">
          P (kPa)
        </text>
        {[200, 500].map((P) => (
          <text key={P} x={PANEL_X0[0] - 3} y={toScreen(0, { V: 0, P }).y + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {P}
          </text>
        ))}
        <text x={316} y={14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          V (L)
        </text>

        {/* Panel 1: A → B, trapezium, positive */}
        <Axes k={0} />
        <polygon points={pointsAttr(0, [A, B, ground(5), ground(1)])} className={POS.fill} />
        <line {...lineAttr(0, A, B)} strokeWidth={2} className={PATH} />
        <MidArrow k={0} p={A} q={B} className={HEAD} />
        <Dot k={0} name="A" dx={-9} dy={-3} />
        <Dot k={0} name="B" dx={2} dy={-5} />
        <text x={toScreen(0, { V: 3, P: 0 }).x} y={30} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          A → B
        </text>
        <text x={toScreen(0, { V: 3, P: 0 }).x} y={172} textAnchor="middle" className={`${POS.text} text-[11px] font-semibold tabular-nums`}>
          +1400 J
        </text>
        <text x={toScreen(0, { V: 3, P: 0 }).x} y={186} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          rightward
        </text>

        {/* Panel 2: B → C, rectangle, negative */}
        <Axes k={1} />
        <polygon points={pointsAttr(1, [C, B, ground(5), ground(1)])} className={NEG.fill} />
        <line {...lineAttr(1, B, C)} strokeWidth={2} className={PATH} />
        <MidArrow k={1} p={B} q={C} className={HEAD} />
        <Dot k={1} name="B" dx={2} dy={-5} />
        <Dot k={1} name="C" dx={-9} dy={-4} />
        <text x={toScreen(1, { V: 3, P: 0 }).x} y={30} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          B → C
        </text>
        <text x={toScreen(1, { V: 3, P: 0 }).x} y={172} textAnchor="middle" className={`${NEG.text} text-[11px] font-semibold tabular-nums`}>
          −800 J
        </text>
        <text x={toScreen(1, { V: 3, P: 0 }).x} y={186} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          leftward
        </text>

        {/* Panel 3: the loop, net = enclosed area */}
        <Axes k={2} />
        <polygon points={pointsAttr(2, [A, B, C])} className={NET.fill} />
        <line {...lineAttr(2, A, B)} strokeWidth={2} className={PATH} />
        <line {...lineAttr(2, B, C)} strokeWidth={2} className={PATH} />
        <line {...lineAttr(2, C, A)} strokeWidth={2} className={PATH} />
        <MidArrow k={2} p={A} q={B} className={HEAD} />
        <MidArrow k={2} p={B} q={C} className={HEAD} />
        <MidArrow k={2} p={C} q={A} className={HEAD} />
        <Dot k={2} name="A" dx={-9} dy={-3} />
        <Dot k={2} name="B" dx={2} dy={-5} />
        <Dot k={2} name="C" dx={-9} dy={10} />
        <text x={toScreen(2, C).x + 4} y={toScreen(2, { V: 0, P: 250 }).y} className="fill-muted-foreground text-[9px]">
          W = 0
        </text>
        <text x={toScreen(2, { V: 3, P: 0 }).x} y={30} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          whole loop
        </text>
        <text x={toScreen(2, { V: 3, P: 0 }).x} y={172} textAnchor="middle" className={`${NET.text} text-[11px] font-semibold tabular-nums`}>
          +600 J
        </text>
        <text x={toScreen(2, { V: 3, P: 0 }).x} y={186} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          clockwise
        </text>
      </svg>

      <table className="mt-3 w-full text-left text-xs">
        <thead>
          <tr className="text-muted-foreground">
            <th className="py-1 font-medium">Leg</th>
            <th className="py-1 font-medium">kind</th>
            <th className="py-1 font-medium">work by the gas</th>
          </tr>
        </thead>
        <tbody className="tabular-nums text-foreground">
          <tr className="border-t border-border">
            <td className="py-1 font-semibold">A → B</td>
            <td className="py-1">straight, expansion</td>
            <td className="py-1">½(500 + 200) × (5 − 1) = +1400 J</td>
          </tr>
          <tr className="border-t border-border">
            <td className="py-1 font-semibold">B → C</td>
            <td className="py-1">constant pressure, compression</td>
            <td className="py-1">200 × (1 − 5) = −800 J</td>
          </tr>
          <tr className="border-t border-border">
            <td className="py-1 font-semibold">C → A</td>
            <td className="py-1">constant volume</td>
            <td className="py-1">0</td>
          </tr>
          <tr className="border-t border-border font-semibold">
            <td className="py-1">Loop</td>
            <td className="py-1">clockwise</td>
            <td className="py-1">1400 − 800 + 0 = +600 J</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-2 text-xs text-muted-foreground">
        kPa × L = J. A leg to the right (expansion) adds its area, a leg to the left (compression) takes its area away, however high the pressure,
        and a vertical leg adds nothing. Round a loop the net work is the enclosed area, ½ × 4 × 300 = 600 J: positive when the loop runs
        clockwise, because the gas expands at the higher pressure and is compressed at the lower.
      </p>
    </div>
  );
}

function lineAttr(k: number, p: PvPoint, q: PvPoint) {
  const a = toScreen(k, p);
  const b = toScreen(k, q);
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}
