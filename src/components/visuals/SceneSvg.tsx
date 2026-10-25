import type { Shape, Tone } from "@/lib/visuals/types";

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

function paint(s: Exclude<Shape, { kind: "text" }>) {
  return {
    fill: s.fill ? VAR[s.fill] : "none",
    stroke: s.stroke ? VAR[s.stroke] : undefined,
    strokeWidth: s.width,
    strokeDasharray: s.dash,
    strokeLinecap: s.cap,
    opacity: s.opacity,
  };
}

/** Draws a scene's shapes. Pure and server-renderable; the player re-renders it every animation frame. */
export default function SceneSvg({ shapes, w, h, label }: { shapes: Shape[]; w: number; h: number; label: string }) {
  return (
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
  );
}
