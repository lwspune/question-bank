import katex from "katex";
import type { Shape, Tone } from "@/lib/visuals/types";

/**
 * KaTeX may trust ONE command, \htmlClass, and only with the three mark
 * classes (globals.css .viz-mark-*), so a stored maths line can colour a term
 * and can never add a link, a style or any other class. KaTeX escapes the rest.
 */
const MARK = /^viz-mark-[1-3]$/;
function mathHtml(tex: string): string {
  return katex.renderToString(tex, {
    throwOnError: false,
    strict: "ignore",
    trust: (ctx) => ctx.command === "\\htmlClass" && MARK.test((ctx as { class?: string }).class ?? ""),
  });
}

/** Tone -> theme variable (defined on .viz in globals.css). */
const VAR: Record<Tone, string> = {
  fg: "var(--viz-fg)",
  muted: "var(--viz-muted)",
  line: "var(--viz-line)",
  brand: "var(--viz-brand)",
  amber: "var(--viz-amber)",
  good: "var(--viz-good)",
  bad: "var(--viz-bad)",
  glass: "var(--viz-glass)",
  soft: "var(--viz-soft)",
  goodSoft: "var(--viz-good-soft)",
  card: "var(--viz-card)",
};
// Text in the brand tone takes the lighter shade in dark mode, so it stays AA.
const TEXT_VAR: Record<Tone, string> = { ...VAR, brand: "var(--viz-brand-text)" };

function paint(s: Exclude<Shape, { kind: "text" | "math" }>) {
  return {
    fill: s.fill ? VAR[s.fill] : "none",
    stroke: s.stroke ? VAR[s.stroke] : undefined,
    strokeWidth: s.width,
    strokeDasharray: s.dash,
    strokeLinecap: s.cap,
    opacity: s.opacity,
  };
}

const pct = (part: number, whole: number) => `${(part / whole) * 100}%`;

/**
 * Draws a scene's shapes. Pure and server-renderable; the player re-renders it every animation frame.
 *
 * A maths line is NOT drawn inside the SVG: iPhone Safari places the relatively
 * positioned parts of KaTeX's HTML (fractions, powers) in the wrong spot inside a
 * <foreignObject> once the picture is drawn smaller than its box, so in V's chat
 * the working slid down over its notes and onto the Play button (owner
 * screenshot, 2026-11-12). Each line is plain HTML laid over the picture instead,
 * placed as a share of the box. The wrapper is a size container and --viz-u is one
 * box unit in CSS pixels, so a line's font shrinks with the picture as it did
 * inside the SVG (lib/visuals/fitMath writes its fitted size in the same unit).
 */
export default function SceneSvg({ shapes, w, h, label }: { shapes: Shape[]; w: number; h: number; label: string }) {
  const maths = shapes.filter((s): s is Extract<Shape, { kind: "math" }> => s.kind === "math");
  return (
    <div className="relative" style={{ containerType: "inline-size", ["--viz-u" as string]: `calc(100cqw / ${w})` }}>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="block h-auto w-full rounded-lg bg-[var(--viz-bg)] font-sans">
        {shapes.map((s, i) => {
          switch (s.kind) {
            case "line":
              return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} {...paint(s)} />;
            case "circle":
              return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...paint(s)} />;
            case "rect":
              return <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} {...paint(s)} />;
            case "path":
              return <path key={i} d={s.d} {...paint(s)} />;
            case "polyline":
              return <polyline key={i} points={s.points.map((p) => p.join(",")).join(" ")} {...paint(s)} />;
            case "math":
              return null;
            case "text":
              return (
                <text
                  key={i}
                  x={s.x}
                  y={s.y}
                  fill={TEXT_VAR[s.tone]}
                  // A halo in the background colour, painted under the letters, so a
                  // curve or line passing beneath a label never makes it hard to read.
                  stroke="var(--viz-bg)"
                  strokeWidth={3}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  fontSize={s.size ?? 13}
                  fontWeight={s.weight ?? 400}
                  fontStyle={s.italic ? "italic" : undefined}
                  textAnchor={s.anchor ?? "start"}
                  opacity={s.opacity}
                >
                  {s.text}
                </text>
              );
          }
        })}
      </svg>
      {/* Hidden from screen readers, as it was inside the labelled picture: the step text beside it says the same. */}
      {maths.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: pct(s.x, w), top: pct(s.y, h), width: pct(s.w, w), height: pct(s.h, h), opacity: s.opacity }}
        >
          <div
            // The size to start from, in box units; lib/visuals/fitMath shrinks the line in the browser if KaTeX draws it wider than the box.
            data-viz-math={s.size ?? 15}
            // KaTeX output is escaped HTML; the trust rule above is the only door.
            dangerouslySetInnerHTML={{ __html: mathHtml(s.tex) }}
            style={{
              fontSize: `calc(var(--viz-u, 1px) * ${s.size ?? 15})`,
              lineHeight: `calc(var(--viz-u, 1px) * ${s.h})`,
              color: TEXT_VAR[s.tone],
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          />
        </div>
      ))}
    </div>
  );
}
