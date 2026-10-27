// Copied from Concept Ladder (src/figures/FigureView.tsx, afca8bf).
import { type CSSProperties, type ReactNode, useId } from "react";
import type { Figure, FigureElement, Pt, Shape } from "@/lib/learn/types";
import {
  arcPath,
  arrowHead,
  chartTicks,
  clipLine,
  clipRay,
  fmt,
  frameFor,
  halfPlanePolygon,
  hyperbolaPoints,
  outsideDiscPath,
  polygonPath,
  sectorPath,
  ticks,
  type Frame,
  type View,
} from "@/lib/learn/figures/geometry";

/**
 * A figure on the Argand plane, the xy-plane or a bare frame (Venn diagrams) as SVG. Plain markup with no browser APIs, so it renders
 * on the server and in client components alike.
 *
 * Steps (see FigureElement.step):
 * - `upTo`: worked example. Shows elements up to that step; the ones it
 *   introduces animate in.
 * - `stagger`: idea slide or solution. Shows everything; each step's elements
 *   animate in `stagger` seconds after the previous step's, or once its arms
 *   have stopped turning, whichever is later.
 * Animations are CSS (globals.css) and only run when the learner allows motion.
 */
type Props = { figure: Figure; upTo?: number; stagger?: number; className?: string };

const TONE = {
  accent: "var(--lf-accent)",
  muted: "var(--lf-muted)",
  good: "var(--lf-good)",
  bad: "var(--lf-bad)",
} as const;

const LABEL_OFFSET = {
  n: [0, -10, "middle"],
  s: [0, 18, "middle"],
  e: [9, 5, "start"],
  w: [-9, 5, "end"],
  ne: [7, -8, "start"],
  nw: [-7, -8, "end"],
  se: [7, 16, "start"],
  sw: [-7, 16, "end"],
} as const;

/** Label font size, and a generous per-character width estimate used to keep labels in frame. */
const LABEL_PX = 15;
const LABEL_CHAR_PX = 8.5;

/** Angle marks are drawn at a fixed size on screen: the arc's radius, the right angle's side, a tick's half-length and spacing. */
const ANGLE_MARK_PX = 22;
const RIGHT_MARK_PX = 12;
const TICK_HALF_PX = 6;
const TICK_GAP_PX = 6;

/** How fast a turning arm rotates, and the size of the pieces its trace draws in. */
const TURN_DEG_PER_S = 90;
const TRACE_PIECE_DEG = 15;

type Turn = Extract<FigureElement, { kind: "turn" }>;
const turnSeconds = (el: Turn) => Math.abs(el.to - (el.from ?? 0)) / TURN_DEG_PER_S;

type Motion = { className?: string; style?: CSSProperties };
/** `start`: seconds until the element animates in; absent when it is shown still. */
type Timing = { motion: Motion; start?: number };

const secs = (s: number) => `${+s.toFixed(3)}s`;

/** When each step starts in sequence mode: `stagger` apart, or later while an arm is still turning. */
function stepStarts(figure: Figure, stagger: number): number[] {
  const last = Math.max(0, ...figure.elements.map((e) => e.step ?? 0));
  const starts = [0, 0];
  for (let s = 1; s < last; s++) {
    const turns = figure.elements.filter((e): e is Turn => e.kind === "turn" && e.step === s).map(turnSeconds);
    starts.push(starts[s] + Math.max(stagger, ...turns));
  }
  return starts;
}

const animateFrom = (start: number): Timing => ({ start, motion: { className: "fig-in", ...(start > 0 && { style: { animationDelay: secs(start) } }) } });

function timingFor(el: FigureElement, props: Props, starts: number[]): Timing | null {
  let start: number | undefined;
  if (props.upTo !== undefined) {
    if (el.step !== undefined && el.step > props.upTo) return null; // not yet
    if (el.step === props.upTo) start = 0;
  } else if (props.stagger !== undefined && el.step !== undefined) {
    start = starts[el.step];
  }
  return start === undefined ? { motion: {} } : animateFrom(start);
}

/** A label fades in with its element; a turning arm's label waits for the arm to arrive. */
function labelMotion(el: FigureElement, t: Timing): Motion {
  if (t.start === undefined) return t.motion;
  return animateFrom(t.start + (el.kind === "turn" ? turnSeconds(el) : 0)).motion;
}

/** Line-like strokes draw in instead of fading (unless dashed: dashes and draw-in both use the dash array). */
const drawn = (m: Motion, dashed?: boolean): Motion =>
  m.className && !dashed ? { ...m, className: "fig-draw" } : m;

const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
const polar = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] + r * Math.sin((deg * Math.PI) / 180)];

/** Where an element's label is anchored, in plane coordinates. */
function labelAnchor(el: FigureElement, view: View, f: Frame): Pt | null {
  switch (el.kind) {
    case "point":
    case "label":
      return el.at;
    case "vector":
      return el.to;
    case "segment":
      return mid(el.from, el.to);
    case "line": {
      const seg = clipLine(view, ...el.through);
      return seg && lerp(seg[0], seg[1], 0.85);
    }
    case "ray": {
      const seg = clipRay(view, el.from, el.angle);
      return seg && lerp(seg[0], seg[1], 0.75);
    }
    case "circle":
      return polar(el.centre, el.r, 45);
    case "ellipse":
      return [el.centre[0] + el.rx * Math.SQRT1_2, el.centre[1] + el.ry * Math.SQRT1_2];
    case "hyperbola":
      return el.axis === "x" ? [el.centre[0] + el.branch * el.a, el.centre[1]] : [el.centre[0], el.centre[1] + el.branch * el.a];
    case "arc":
      return polar(el.centre, el.r, (el.from + el.to) / 2);
    case "turn":
      return polar(el.centre ?? [0, 0], el.r, el.to);
    case "curve":
      return el.points.findLast(([x, y]) => x >= view.x[0] && x <= view.x[1] && y >= view.y[0] && y <= view.y[1]) ?? null;
    case "angle":
      return polar(el.at, (ANGLE_MARK_PX * 1.5) / f.scale, (el.from + el.to) / 2);
    case "rightAngle":
      return polar(el.at, (RIGHT_MARK_PX * 2) / f.scale, el.from + 45);
    case "region":
      return null; // label a region with a separate label element
  }
}

/** Room around a chart's plot for its numbers and titles. */
const CHART_PAD = { left: 40, top: 20, right: 12, bottom: 38 } as const;

const num = (v: number) => `${v < 0 ? "−" : ""}${Math.abs(v)}`;

/** A chart's axes: along the plot's bottom and left edges, numbered every step from the view's start. */
function ChartAxes({ view, f, chart }: { view: View; f: Frame; chart: NonNullable<Figure["chart"]> }) {
  const xs = chartTicks(view.x[0], view.x[1], chart.x);
  const ys = chartTicks(view.y[0], view.y[1], chart.y);
  // One 0 at the corner when both axes start there.
  const yNumbered = ys.filter((v) => !(v === 0 && xs[0] === 0 && view.y[0] === 0));
  return (
    <g aria-hidden="true">
      <g stroke="var(--lf-border)" strokeWidth={1}>
        {xs.map((v) => (
          <line key={`gx${v}`} x1={fmt(f.px([v, 0])[0])} x2={fmt(f.px([v, 0])[0])} y1={0} y2={fmt(f.height)} />
        ))}
        {ys.map((v) => (
          <line key={`gy${v}`} y1={fmt(f.px([0, v])[1])} y2={fmt(f.px([0, v])[1])} x1={0} x2={fmt(f.width)} />
        ))}
      </g>
      <g stroke="var(--lf-muted)" strokeWidth={1.5}>
        <line x1={0} x2={fmt(f.width)} y1={fmt(f.height)} y2={fmt(f.height)} />
        <line y1={0} y2={fmt(f.height)} x1={0} x2={0} />
      </g>
      <g fill="var(--lf-muted)" fontSize={11}>
        {xs.map((v) => (
          <text key={`tx${v}`} x={fmt(f.px([v, 0])[0])} y={fmt(f.height + 15)} textAnchor="middle">
            {num(v)}
          </text>
        ))}
        {yNumbered.map((v) => (
          <text key={`ty${v}`} x={-6} y={fmt(f.px([0, v])[1] + 4)} textAnchor="end">
            {num(v)}
          </text>
        ))}
        {chart.xTitle && (
          <text x={fmt(f.width / 2)} y={fmt(f.height + 32)} textAnchor="middle" fontStyle="italic">
            {chart.xTitle}
          </text>
        )}
        {chart.yTitle && (
          <text x={0} y={-8} textAnchor="start" fontStyle="italic">
            {chart.yTitle}
          </text>
        )}
      </g>
    </g>
  );
}

function Axes({ view, f, xy }: { view: View; f: Frame; xy: boolean }) {
  const xs = ticks(...view.x);
  const ys = ticks(...view.y);
  const hasX = view.y[0] < 0 && view.y[1] > 0;
  const hasY = view.x[0] < 0 && view.x[1] > 0;
  const [ox, oy] = f.px([hasY ? 0 : view.x[0], hasX ? 0 : view.y[0]]);
  const yLabel = (v: number) => (xy ? num(v) : v === 1 ? "i" : v === -1 ? "−i" : `${num(v)}i`);
  return (
    <g aria-hidden="true">
      <g stroke="var(--lf-border)" strokeWidth={1}>
        {xs.map((v) => (
          <line key={`gx${v}`} x1={fmt(f.px([v, 0])[0])} x2={fmt(f.px([v, 0])[0])} y1={0} y2={fmt(f.height)} />
        ))}
        {ys.map((v) => (
          <line key={`gy${v}`} y1={fmt(f.px([0, v])[1])} y2={fmt(f.px([0, v])[1])} x1={0} x2={fmt(f.width)} />
        ))}
      </g>
      <g stroke="var(--lf-muted)" strokeWidth={1.5}>
        {hasX && <line x1={0} x2={fmt(f.width)} y1={fmt(oy)} y2={fmt(oy)} />}
        {hasY && <line y1={0} y2={fmt(f.height)} x1={fmt(ox)} x2={fmt(ox)} />}
      </g>
      <g fill="var(--lf-muted)" fontSize={11} stroke="var(--lf-bg)" strokeWidth={3} paintOrder="stroke" strokeLinejoin="round">
        {hasX &&
          xs.map((v) => (
            <text key={`tx${v}`} x={fmt(f.px([v, 0])[0])} y={fmt(oy + 14)} textAnchor="middle">
              {num(v)}
            </text>
          ))}
        {hasY &&
          ys.map((v) => (
            <text key={`ty${v}`} x={fmt(ox - 5)} y={fmt(f.px([0, v])[1] + 4)} textAnchor="end">
              {yLabel(v)}
            </text>
          ))}
        {hasX && (
          <text x={fmt(f.width - 4)} y={fmt(oy - 6)} textAnchor="end" fontStyle="italic">
            {xy ? "x" : "Re"}
          </text>
        )}
        {hasY && (
          <text x={fmt(ox + 6)} y={12} fontStyle="italic">
            {xy ? "y" : "Im"}
          </text>
        )}
      </g>
    </g>
  );
}

function shapeClip(id: string, sh: Shape, view: View, f: Frame) {
  switch (sh.kind) {
    case "disc": {
      const [cx, cy] = f.px(sh.centre);
      return (
        <clipPath id={id}>
          <circle cx={fmt(cx)} cy={fmt(cy)} r={fmt(sh.r * f.scale)} />
        </clipPath>
      );
    }
    case "outsideDisc":
      return (
        <clipPath id={id}>
          <path d={outsideDiscPath(f, view, sh.centre, sh.r)} clipRule="evenodd" />
        </clipPath>
      );
    case "halfPlane":
      return (
        <clipPath id={id}>
          <path d={polygonPath(f, halfPlanePolygon(view, ...sh.through))} />
        </clipPath>
      );
    case "sector":
      return (
        <clipPath id={id}>
          <path d={sectorPath(f, view, sh.centre, sh.from, sh.to)} />
        </clipPath>
      );
  }
}

/** The overlap of the shapes: a full-view fill inside one nested clip per shape. */
function Region({ el, id, view, f, color, motion }: { el: Extract<FigureElement, { kind: "region" }>; id: string; view: View; f: Frame; color: string; motion: Motion }) {
  const ids = el.within.map((_, i) => `${id}-${i}`);
  let fill: ReactNode = <rect x={0} y={0} width={fmt(f.width)} height={fmt(f.height)} fill={color} fillOpacity={0.18} />;
  for (const cid of [...ids].reverse()) fill = <g clipPath={`url(#${cid})`}>{fill}</g>;
  return (
    <g {...motion}>
      <defs>{el.within.map((sh, i) => <g key={ids[i]}>{shapeClip(ids[i], sh, view, f)}</g>)}</defs>
      {fill}
    </g>
  );
}

function ElementView({ el, id, view, f, motion, start }: { el: FigureElement; id: string; view: View; f: Frame; motion: Motion; start?: number }) {
  const color = TONE[el.tone ?? "accent"];
  const stroke = { stroke: color, strokeWidth: 2.5, fill: "none", strokeLinecap: "round" as const };
  // Draw-in needs pathLength={1}, but that would stretch the dash pattern over the whole stroke.
  const dash = (d?: boolean) => (d ? { strokeDasharray: "7 6" } : { pathLength: 1 });
  const line = (a: Pt, b: Pt, m: Motion, dashed?: boolean) => {
    const [x1, y1] = f.px(a);
    const [x2, y2] = f.px(b);
    return <line {...m} {...stroke} {...dash(dashed)} x1={fmt(x1)} y1={fmt(y1)} x2={fmt(x2)} y2={fmt(y2)} />;
  };

  switch (el.kind) {
    case "point": {
      const [cx, cy] = f.px(el.at);
      return el.hollow ? (
        <circle {...motion} cx={fmt(cx)} cy={fmt(cy)} r={4.5} fill="var(--lf-bg)" stroke={color} strokeWidth={2} />
      ) : (
        <circle {...motion} cx={fmt(cx)} cy={fmt(cy)} r={4.5} fill={color} />
      );
    }
    case "vector": {
      const from = el.from ?? [0, 0];
      return (
        <g>
          {line(from, el.to, drawn(motion))}
          <polygon {...motion} points={arrowHead(f, from, el.to)} fill={color} />
        </g>
      );
    }
    case "segment":
      if (!el.ticks) return line(el.from, el.to, drawn(motion, el.dashed), el.dashed);
      return (
        <g>
          {line(el.from, el.to, drawn(motion, el.dashed), el.dashed)}
          {equalMarks(f, el.from, el.to, el.ticks).map(([a, b], i) => (
            <line key={i} {...motion} {...stroke} strokeWidth={2} x1={fmt(a[0])} y1={fmt(a[1])} x2={fmt(b[0])} y2={fmt(b[1])} />
          ))}
        </g>
      );
    case "line": {
      const seg = clipLine(view, ...el.through);
      return seg && line(seg[0], seg[1], drawn(motion, el.dashed), el.dashed);
    }
    case "ray": {
      const seg = clipRay(view, el.from, el.angle);
      if (!seg) return null;
      const [sx, sy] = f.px(el.from);
      return (
        <g>
          {line(seg[0], seg[1], drawn(motion))}
          <polygon {...motion} points={arrowHead(f, seg[0], seg[1])} fill={color} />
          <circle {...motion} cx={fmt(sx)} cy={fmt(sy)} r={4.5} fill="var(--lf-bg)" stroke={color} strokeWidth={2} />
        </g>
      );
    }
    case "circle": {
      const [cx, cy] = f.px(el.centre);
      return <circle {...drawn(motion, el.dashed)} {...stroke} {...dash(el.dashed)} cx={fmt(cx)} cy={fmt(cy)} r={fmt(el.r * f.scale)} />;
    }
    case "ellipse": {
      const [cx, cy] = f.px(el.centre);
      return (
        <ellipse {...drawn(motion, el.dashed)} {...stroke} {...dash(el.dashed)} cx={fmt(cx)} cy={fmt(cy)} rx={fmt(el.rx * f.scale)} ry={fmt(el.ry * f.scale)} />
      );
    }
    case "hyperbola": {
      const d = hyperbolaPoints(view, el.centre, el.a, el.b, el.axis, el.branch)
        .map((p, i) => `${i === 0 ? "M" : "L"} ${f.px(p).map(fmt).join(" ")}`)
        .join(" ");
      return <path {...drawn(motion, el.dashed)} {...stroke} {...dash(el.dashed)} strokeLinejoin="round" d={d} />;
    }
    case "arc":
      return <path {...drawn(motion)} {...stroke} pathLength={1} d={arcPath(f, el.centre, el.r, el.from, el.to)} />;
    case "curve": {
      const d = el.points.map((p, i) => `${i === 0 ? "M" : "L"} ${f.px(p).map(fmt).join(" ")}`).join(" ");
      return <path {...drawn(motion, el.dashed)} {...stroke} {...dash(el.dashed)} strokeLinejoin="round" d={d} />;
    }
    case "turn":
      return <TurnView el={el} f={f} color={color} start={start} />;
    case "angle":
      return <path {...drawn(motion)} {...stroke} strokeWidth={1.75} pathLength={1} d={arcPath(f, el.at, ANGLE_MARK_PX / f.scale, el.from, el.to)} />;
    case "rightAngle": {
      const [x, y] = f.px(el.at);
      const arm = (deg: number) => [Math.cos((deg * Math.PI) / 180) * RIGHT_MARK_PX, -Math.sin((deg * Math.PI) / 180) * RIGHT_MARK_PX];
      const [ux, uy] = arm(el.from);
      const [vx, vy] = arm(el.from + 90);
      const d = `M ${fmt(x + ux)} ${fmt(y + uy)} L ${fmt(x + ux + vx)} ${fmt(y + uy + vy)} L ${fmt(x + vx)} ${fmt(y + vy)}`;
      return <path {...drawn(motion)} {...stroke} strokeWidth={1.75} strokeLinejoin="round" pathLength={1} d={d} />;
    }
    case "label":
      return null; // drawn with the labels
    case "region":
      return <Region el={el} id={id} view={view} f={f} color={color} motion={motion} />;
  }
}

/** Equal-side marks: `count` short strokes across the segment's middle, in pixels. */
function equalMarks(f: Frame, from: Pt, to: Pt, count: number): [[number, number], [number, number]][] {
  const [ax, ay] = f.px(from);
  const [bx, by] = f.px(to);
  const len = Math.hypot(bx - ax, by - ay);
  const [dx, dy] = [(bx - ax) / len, (by - ay) / len];
  const [mx, my] = [(ax + bx) / 2, (ay + by) / 2];
  return Array.from({ length: count }, (_, k) => {
    const shift = (k - (count - 1) / 2) * TICK_GAP_PX;
    const [cx, cy] = [mx + shift * dx, my + shift * dy];
    return [
      [cx + TICK_HALF_PX * dy, cy - TICK_HALF_PX * dx],
      [cx - TICK_HALF_PX * dy, cy + TICK_HALF_PX * dx],
    ];
  });
}

/**
 * The trace's points, in pieces of TRACE_PIECE_DEG along the sweep. It keeps a fixed radius
 * within one turn and winds outward past it, so the turns stay apart.
 */
function tracePieces(el: Turn): { from: number; to: number; points: Pt[] }[] {
  const centre = el.centre ?? [0, 0];
  const from = el.from ?? 0;
  const sweep = Math.abs(el.to - from);
  const dir = Math.sign(el.to - from);
  const grow = sweep > 360 ? 0.15 * el.r : 0;
  const at = (phi: number) => polar(centre, el.r * 0.3 + (grow * phi) / 360, from + dir * phi);
  const pieces = [];
  for (let a = 0; a < sweep; a += TRACE_PIECE_DEG) {
    const b = Math.min(a + TRACE_PIECE_DEG, sweep);
    const n = Math.max(2, Math.ceil((b - a) / 3));
    pieces.push({ from: a, to: b, points: Array.from({ length: n + 1 }, (_, i) => at(a + ((b - a) * i) / n)) });
  }
  return pieces;
}

/**
 * A turning arm. The arm is drawn at its terminal position; animated, it rotates there from
 * the initial arm at a steady pace while its trace draws in alongside, piece by piece.
 */
function TurnView({ el, f, color, start }: { el: Turn; f: Frame; color: string; start?: number }) {
  const centre = el.centre ?? [0, 0];
  const tip = polar(centre, el.r, el.to);
  const [cx, cy] = f.px(centre);
  const [tx, ty] = f.px(tip);
  const stroke = { stroke: color, strokeWidth: 2.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const path = (pts: Pt[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${f.px(p).map(fmt).join(" ")}`).join(" ");
  const pieces = tracePieces(el);
  const arm = (
    <>
      <line {...stroke} x1={fmt(cx)} y1={fmt(cy)} x2={fmt(tx)} y2={fmt(ty)} />
      <polygon points={arrowHead(f, centre, tip)} fill={color} />
    </>
  );
  if (start === undefined) {
    return (
      <g>
        <path {...stroke} d={path(pieces.flatMap((p, i) => (i === 0 ? p.points : p.points.slice(1))))} />
        {arm}
      </g>
    );
  }
  const from = el.from ?? 0;
  const turning = {
    "--turn-from": `${el.to - from}deg`,
    transformOrigin: `${fmt(cx)}px ${fmt(cy)}px`,
    transformBox: "view-box",
    animationDuration: secs(turnSeconds(el)),
    ...(start > 0 && { animationDelay: secs(start) }),
  } as CSSProperties;
  return (
    <g>
      {pieces.map((p, i) => (
        <path
          key={i}
          className="fig-draw"
          style={{
            animationDelay: secs(start + p.from / TURN_DEG_PER_S),
            animationDuration: secs((p.to - p.from) / TURN_DEG_PER_S),
            animationTimingFunction: "linear",
          }}
          {...stroke}
          pathLength={1}
          d={path(p.points)}
        />
      ))}
      {/* Hidden until it starts: waiting, the arm would sit on the initial arm. */}
      <g {...animateFrom(start).motion}>
        <g className="fig-turn" style={turning}>
          {arm}
        </g>
      </g>
    </g>
  );
}

function Label({ el, view, f, motion }: { el: FigureElement; view: View; f: Frame; motion: Motion }) {
  if (!el.label) return null;
  const anchor = labelAnchor(el, view, f);
  if (!anchor) return null;
  const [ax, ay] = f.px(anchor);
  const [dx, dy, textAnchor] = LABEL_OFFSET[el.labelAt ?? (el.kind === "label" ? "n" : "ne")];
  // Clamp into the frame: a label anchored near an edge would otherwise be cut off.
  const w = el.label.length * LABEL_CHAR_PX;
  const lead = textAnchor === "start" ? 0 : textAnchor === "end" ? w : w / 2;
  const x = Math.min(Math.max(ax + dx, lead + 2), f.width - (w - lead) - 2);
  const y = Math.min(Math.max(ay + dy, LABEL_PX - 1), f.height - 4);
  return (
    <text
      {...motion}
      x={fmt(x)}
      y={fmt(y)}
      textAnchor={textAnchor}
      fontSize={LABEL_PX}
      fontWeight={500}
      fill={el.tone && el.tone !== "accent" ? TONE[el.tone] : "var(--lf-fg)"}
      stroke="var(--lf-bg)"
      strokeWidth={4}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {el.label}
    </text>
  );
}

export function FigureView(props: Props) {
  const { figure, className } = props;
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const f = frameFor(figure.view, figure.chart);
  const pad = figure.chart ? CHART_PAD : { left: 0, top: 0, right: 0, bottom: 0 };
  const starts = stepStarts(figure, props.stagger ?? 0);
  const visible = figure.elements
    .flatMap((el, i) => {
      const t = timingFor(el, props, starts);
      return t ? [{ el, i, ...t }] : [];
    });
  // Regions underneath the axes; everything else above; labels on top.
  const regions = visible.filter((v) => v.el.kind === "region");
  const others = visible.filter((v) => v.el.kind !== "region");

  return (
    <svg
      viewBox={`${fmt(-pad.left)} ${fmt(-pad.top)} ${fmt(f.width + pad.left + pad.right)} ${fmt(f.height + pad.top + pad.bottom)}`}
      role="img"
      aria-labelledby={`${id}-title`}
      className={className}
      style={{ maxHeight: "60vh" }}
    >
      <title id={`${id}-title`}>{figure.alt}</title>
      {regions.map(({ el, i, motion }) => (
        <ElementView key={i} el={el} id={`${id}-r${i}`} view={figure.view} f={f} motion={motion} />
      ))}
      {figure.chart ? (
        <ChartAxes view={figure.view} f={f} chart={figure.chart} />
      ) : (
        figure.axes !== "none" && <Axes view={figure.view} f={f} xy={figure.axes === "xy"} />
      )}
      {others.map(({ el, i, motion, start }) => (
        <ElementView key={i} el={el} id={`${id}-e${i}`} view={figure.view} f={f} motion={motion} start={start} />
      ))}
      {visible.map(({ el, i, motion, start }) => (
        <Label key={`l${i}`} el={el} view={figure.view} f={f} motion={labelMotion(el, { motion, start })} />
      ))}
    </svg>
  );
}
