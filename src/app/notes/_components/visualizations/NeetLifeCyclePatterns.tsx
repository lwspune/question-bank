/**
 * Static figure: the three patterns of plant life cycle, in the NEET
 * concept's own terms (nbopk-life-cycles).
 *
 * Every cycle alternates a haploid gametophyte (n) with a diploid sporophyte
 * (2n): gametes fuse (syngamy) to give the diploid stage, and meiosis gives
 * the haploid stage back. What changes is which phase is a real plant.
 * Haplontic: the sporophyte is only the one-celled zygote. Diplontic: the
 * gametophyte is one or a few cells. Haplo-diplontic: both are multicellular,
 * with the gametophyte dominant in bryophytes and the sporophyte dominant in
 * pteridophytes (the concept's second trap).
 *
 * The rows, box sizes and examples are exported and pinned by
 * tests/notes-w2-06.test.ts. Server component.
 */

export type PhaseSize = "small" | "medium" | "large";

export type CycleRow = {
  pattern: string;
  gametophyte: { size: PhaseSize; lines: readonly string[] };
  sporophyte: { size: PhaseSize; lines: readonly string[] };
  meiosisNote: string;
  examples: readonly string[];
};

export const ROWS: readonly CycleRow[] = [
  {
    pattern: "Haplontic",
    gametophyte: { size: "large", lines: ["gametophyte (n)", "dominant, free-living"] },
    sporophyte: { size: "small", lines: ["zygote (2n)", "one cell only"] },
    meiosisNote: "meiosis in the zygote",
    examples: ["Volvox, Spirogyra, some Chlamydomonas"],
  },
  {
    pattern: "Diplontic",
    gametophyte: { size: "small", lines: ["gametophyte (n)", "one or a few cells"] },
    sporophyte: { size: "large", lines: ["sporophyte (2n)", "dominant, photosynthetic"] },
    meiosisNote: "meiosis",
    examples: ["All seed plants (gymnosperms, angiosperms); Fucus"],
  },
  {
    pattern: "Haplo-diplontic",
    gametophyte: { size: "medium", lines: ["gametophyte (n)", "multicellular"] },
    sporophyte: { size: "medium", lines: ["sporophyte (2n)", "multicellular"] },
    meiosisNote: "meiosis",
    examples: ["Bryophytes: gametophyte dominant. Pteridophytes:", "sporophyte dominant. Ectocarpus, Polysiphonia, kelps"],
  },
];

export const BOX: Record<PhaseSize, { w: number; h: number }> = {
  small: { w: 92, h: 30 },
  medium: { w: 104, h: 38 },
  large: { w: 120, h: 44 },
};

export const ROW_H = 118;
export const ROW_TOP = 8;
/** Centres of the haploid (left) and diploid (right) boxes. */
export const N_X = 72;
export const DIPLOID_X = 248;

/** Box area, so a test can say which phase is drawn as the real plant. */
export function boxArea(size: PhaseSize): number {
  return BOX[size].w * BOX[size].h;
}

const N_BOX = "fill-sky-100 stroke-sky-700 dark:fill-sky-950/50 dark:stroke-sky-400";
const D_BOX = "fill-amber-100 stroke-amber-700 dark:fill-amber-950/50 dark:stroke-amber-400";

function PhaseBox({ cx, cy, size, lines, cls }: { cx: number; cy: number; size: PhaseSize; lines: readonly string[]; cls: string }) {
  const b = BOX[size];
  return (
    <g>
      <rect
        x={cx - b.w / 2}
        y={cy - b.h / 2}
        width={b.w}
        height={b.h}
        rx={6}
        className={cls}
        strokeWidth={size === "large" ? 2.4 : 1.2}
        strokeDasharray={size === "small" ? "4 3" : undefined}
      />
      <text x={cx} y={cy - 2} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {lines[0]}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        {lines[1]}
      </text>
    </g>
  );
}

export default function NeetLifeCyclePatterns() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · three patterns of life cycle
      </p>
      <svg
        viewBox={`0 0 320 ${ROW_TOP + ROWS.length * ROW_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Three life cycles, each a haploid gametophyte and a diploid stage joined by syngamy and meiosis. Haplontic: a large free-living gametophyte, the zygote the only diploid cell. Diplontic: a large dominant sporophyte, a gametophyte of one or a few cells. Haplo-diplontic: both multicellular"
      >
        <defs>
          <marker id="lc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>
        {ROWS.map((row, i) => {
          const y0 = ROW_TOP + i * ROW_H;
          const cy = y0 + 50;
          const left = N_X + BOX[row.gametophyte.size].w / 2 + 4;
          const right = DIPLOID_X - BOX[row.sporophyte.size].w / 2 - 4;
          const mid = (left + right) / 2;
          return (
            <g key={row.pattern}>
              {i > 0 && <line x1={4} y1={y0} x2={316} y2={y0} className="stroke-border" strokeWidth={1} />}
              <text x={4} y={y0 + 16} className="fill-foreground text-[11px] font-bold">
                {row.pattern}
              </text>
              <PhaseBox cx={N_X} cy={cy} size={row.gametophyte.size} lines={row.gametophyte.lines} cls={N_BOX} />
              <PhaseBox cx={DIPLOID_X} cy={cy} size={row.sporophyte.size} lines={row.sporophyte.lines} cls={D_BOX} />
              <line x1={left} y1={cy - 8} x2={right} y2={cy - 8} className="stroke-muted-foreground" strokeWidth={1.3} markerEnd="url(#lc-arrow)" />
              <text x={mid} y={cy - 27} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                gametes fuse
              </text>
              <line x1={right} y1={cy + 8} x2={left} y2={cy + 8} className="stroke-muted-foreground" strokeWidth={1.3} markerEnd="url(#lc-arrow)" />
              <text x={mid} y={cy + 33} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {row.meiosisNote}
              </text>
              {row.examples.map((line, k) => (
                <text key={line} x={4} y={y0 + 96 + k * 11} className="fill-muted-foreground text-[9.5px]">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Left: the haploid phase (n). Right: the diploid phase (2n). A thick box is the dominant phase; a dashed box is a
        phase of one or a few cells. Not all algae are haplontic: Fucus is diplontic.
      </p>
    </div>
  );
}
