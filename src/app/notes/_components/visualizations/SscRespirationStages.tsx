/**
 * Static figure: the three steps of respiration, each in its own place
 * (concept sscbcbpr-respiration).
 *
 * Exactly the concept's table: glycolysis in the cytoplasm (glucose to pyruvic
 * acid, a net 2 ATP), the Krebs cycle in the mitochondrial matrix (about 2 ATP)
 * and the electron transport chain on the inner mitochondrial membrane (about
 * 32 to 34 ATP, the most), where oxygen, the final electron acceptor, becomes
 * water. The no-oxygen branch is the concept's yeast: fermentation, only the
 * 2 ATP of glycolysis. Values pinned by tests/notes-ssc-visuals-gk.test.ts.
 * Server component, no client state.
 */

export type RespirationStage = {
  step: number;
  name: string;
  place: string;
  /** ATP per glucose as the concept writes it. */
  atp: string;
  /** Lowest ATP count the concept gives for this step. */
  atpLow: number;
  /** Highest ATP count the concept gives for this step. */
  atpHigh: number;
};

export const STAGES: readonly RespirationStage[] = [
  { step: 1, name: "Glycolysis", place: "Cytoplasm", atp: "net 2", atpLow: 2, atpHigh: 2 },
  { step: 2, name: "Krebs cycle", place: "Mitochondrial matrix", atp: "about 2", atpLow: 2, atpHigh: 2 },
  { step: 3, name: "Electron transport chain", place: "Inner mitochondrial membrane", atp: "about 32 to 34", atpLow: 32, atpHigh: 34 },
];

/** Glycolysis turns glucose into this. */
export const GLYCOLYSIS_PRODUCT = "pyruvic acid";

/** The oxygen step on the inner membrane. */
export const OXYGEN_STEP = { acceptor: "oxygen", becomes: "water" } as const;

/** Without oxygen: the concept's yeast, which keeps only glycolysis's ATP. */
export const NO_OXYGEN = { organism: "yeast", process: "ferments sugar", atp: 2 } as const;

const MITO = { cx: 160, cy: 182, rx: 150, ry: 46 };
const INNER = { rx: 138, ry: 36 };

/** y of the inner membrane at x (top or bottom half). */
function innerY(x: number, half: "top" | "bottom"): number {
  const dx = (x - MITO.cx) / INNER.rx;
  const h = INNER.ry * Math.sqrt(Math.max(0, 1 - dx * dx));
  return half === "top" ? MITO.cy - h : MITO.cy + h;
}

const FOLDS: readonly { x: number; half: "top" | "bottom" }[] = [
  { x: 70, half: "top" },
  { x: 110, half: "top" },
  { x: 210, half: "top" },
  { x: 250, half: "top" },
  { x: 80, half: "bottom" },
  { x: 120, half: "bottom" },
  { x: 270, half: "bottom" },
];

const COMPLEX_X = [196, 214, 232];

function Arrow({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d: number, s: number) => (x2 - 7 * Math.cos(a) + s * d * Math.sin(a)).toFixed(2);
  const hy = (d: number, s: number) => (y2 - 7 * Math.sin(a) - s * d * Math.cos(a)).toFixed(2);
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={(x2 - 6 * Math.cos(a)).toFixed(2)}
        y2={(y2 - 6 * Math.sin(a)).toFixed(2)}
        className="stroke-foreground"
        strokeWidth={1.4}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
      <polygon points={`${x2},${y2} ${hx(4, 1)},${hy(4, 1)} ${hx(4, -1)},${hy(4, -1)}`} className="fill-foreground" />
    </g>
  );
}

export default function SscRespirationStages() {
  const [gly, krebs, etc] = STAGES;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the three steps of respiration and where they happen
      </p>
      <svg
        viewBox="0 0 320 284"
        className="block h-auto w-full"
        role="img"
        aria-label="A cell. In the cytoplasm, glycolysis turns glucose into pyruvic acid for a net 2 ATP. Without oxygen, yeast ferments sugar and gets only these 2 ATP. With oxygen, pyruvic acid goes into the mitochondrion: the Krebs cycle in the matrix gives about 2 ATP, and the electron transport chain on the inner membrane gives about 32 to 34 ATP, the most, where oxygen becomes water."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Each step in its own place
        </text>

        <rect x={4} y={22} width={312} height={258} rx={16} className="fill-muted/40 stroke-border" strokeWidth={1.2} />
        <text x={14} y={38} className="fill-muted-foreground text-[10px] font-semibold">
          Cell: cytoplasm
        </text>

        {/* Step 1: glycolysis in the cytoplasm */}
        <rect x={14} y={50} width={52} height={20} rx={10} className="fill-background stroke-foreground" strokeWidth={1} />
        <text x={40} y={63.5} textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          glucose
        </text>
        <Arrow x1={66} y1={60} x2={84} y2={60} />
        <rect
          x={84}
          y={46}
          width={104}
          height={30}
          rx={4}
          className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700"
          strokeWidth={1.2}
        />
        <text x={136} y={58} textAnchor="middle" className="fill-amber-900 text-[11px] font-bold dark:fill-amber-200">
          {gly.step} {gly.name}
        </text>
        <text x={136} y={71} textAnchor="middle" className="fill-amber-900 text-[10px] dark:fill-amber-200">
          {gly.atp} ATP
        </text>
        <Arrow x1={188} y1={60} x2={204} y2={60} />
        <rect x={204} y={50} width={82} height={20} rx={10} className="fill-background stroke-foreground" strokeWidth={1} />
        <text x={245} y={63.5} textAnchor="middle" className="fill-foreground text-[10px] font-medium">
          {GLYCOLYSIS_PRODUCT}
        </text>
        <text x={136} y={88} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          in the cytoplasm
        </text>

        {/* No oxygen: yeast */}
        <Arrow x1={222} y1={70} x2={186} y2={94} dashed />
        <text x={14} y={104} className="fill-foreground text-[10px] font-semibold">
          No oxygen: {NO_OXYGEN.organism} {NO_OXYGEN.process},
        </text>
        <text x={14} y={117} className="fill-foreground text-[10px]">
          only the {NO_OXYGEN.atp} ATP of glycolysis
        </text>

        {/* With oxygen: into the mitochondrion */}
        <Arrow x1={262} y1={70} x2={262} y2={146} />
        <text x={256} y={112} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          with oxygen
        </text>

        <text x={14} y={142} className="fill-rose-800 text-[10px] font-semibold dark:fill-rose-300">
          mitochondrion
        </text>
        <ellipse
          cx={MITO.cx}
          cy={MITO.cy}
          rx={MITO.rx}
          ry={MITO.ry}
          className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/20 dark:stroke-rose-700"
          strokeWidth={1.4}
        />
        <ellipse
          cx={MITO.cx}
          cy={MITO.cy}
          rx={INNER.rx}
          ry={INNER.ry}
          className="fill-rose-100/60 stroke-rose-600 dark:fill-rose-950/30 dark:stroke-rose-400"
          strokeWidth={1.4}
        />
        {FOLDS.map((f) => {
          const y0 = innerY(f.x, f.half);
          const y1 = f.half === "top" ? y0 + 12 : y0 - 12;
          return (
            <line
              key={`${f.x}-${f.half}`}
              x1={f.x}
              y1={y0.toFixed(2)}
              x2={f.x}
              y2={y1.toFixed(2)}
              className="stroke-rose-600 dark:stroke-rose-400"
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        })}

        {/* Step 2: Krebs cycle in the matrix */}
        <text x={160} y={178} textAnchor="middle" className="fill-rose-900 text-[11px] font-bold dark:fill-rose-200">
          {krebs.step} {krebs.name}
        </text>
        <text x={160} y={192} textAnchor="middle" className="fill-rose-900 text-[10px] dark:fill-rose-200">
          in the matrix · {krebs.atp} ATP
        </text>

        {/* Step 3: electron transport chain on the inner membrane */}
        {COMPLEX_X.map((x) => (
          <rect
            key={x}
            x={x - 5}
            y={(innerY(x, "bottom") - 5).toFixed(2)}
            width={10}
            height={10}
            rx={2}
            className="fill-violet-500 dark:fill-violet-400"
          />
        ))}
        <line x1={214} y1={(innerY(214, "bottom") + 5).toFixed(2)} x2={214} y2={235} className="stroke-foreground" strokeWidth={1} />
        <text x={14} y={246} className="fill-violet-800 text-[10px] font-bold dark:fill-violet-300">
          {etc.step} {etc.name}, on the inner membrane
        </text>
        <text x={14} y={259} className="fill-foreground text-[10px]">
          {etc.atp} ATP: the most
        </text>
        <text x={14} y={272} className="fill-foreground text-[10px]">
          Oxygen, the final electron acceptor, becomes water
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Glycolysis happens in the cytoplasm, not in the mitochondria. The last step, using oxygen, makes far more ATP than the first two
        together.
      </p>
    </div>
  );
}
