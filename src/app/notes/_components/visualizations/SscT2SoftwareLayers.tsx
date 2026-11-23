/**
 * Static figure: system software and application software (concept
 * ssc2cosos-software). Application software does a user's task (a word
 * processor, a browser, an antivirus); system software runs the computer (the
 * operating system, utilities). Applications sit on, and depend on, the
 * system software underneath them: an antivirus uses system utilities to scan
 * disks.
 * Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export type Layer = { name: string; job: string; items: readonly string[] };

export const LAYERS: readonly Layer[] = [
  { name: "Application software", job: "does a user's task", items: ["word processor", "browser", "antivirus"] },
  { name: "System software", job: "runs the computer", items: ["operating system", "utilities"] },
  { name: "The computer itself", job: "", items: [] },
];

/** Which layer (0 = top) a program belongs to. */
export const layerOf = (item: string) => LAYERS.findIndex((l) => l.items.includes(item));
/** An application depends on the layer directly under it. */
export const dependsOn = (layer: number) => (layer + 1 < LAYERS.length ? LAYERS[layer + 1].name : "");

const LAYER_Y = [10, 102, 188] as const;
const LAYER_H = [70, 66, 28] as const;
const LAYER_CLS = [
  "fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400",
  "fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950/50 dark:stroke-indigo-400",
  "fill-muted stroke-muted-foreground",
] as const;
const CHIP_W = 84;

function chipX(n: number, k: number) {
  const gap = 10;
  const total = n * CHIP_W + (n - 1) * gap;
  return 160 - total / 2 + k * (CHIP_W + gap);
}

const av = chipX(3, 2) + CHIP_W / 2;
const ut = chipX(2, 1) + CHIP_W / 2;
/** Arrowhead at the utilities chip, pointing along the line from the antivirus chip. */
const HEAD = (() => {
  const x1 = av;
  const y1 = LAYER_Y[0] + 53;
  const x2 = ut + 6;
  const y2 = LAYER_Y[1] + 27;
  const a = Math.atan2(y2 - y1, x2 - x1);
  const r = (n: number) => Math.round(n * 100) / 100;
  const p = (da: number) => `${r(x2 - 8 * Math.cos(a + da))},${r(y2 - 8 * Math.sin(a + da))}`;
  return `${x2},${y2} ${p(-0.45)} ${p(0.45)}`;
})();

export default function SscT2SoftwareLayers() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · applications sit on system software
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="Three layers. On top, application software, which does a user's task: a word processor, a browser, an antivirus. Under it, system software, which runs the computer: the operating system and utilities. At the bottom, the computer itself. Applications depend on the system software underneath; for example the antivirus uses system utilities to scan disks."
      >
        {LAYERS.map((l, i) => (
          <g key={l.name}>
            <rect x={14} y={LAYER_Y[i]} width={292} height={LAYER_H[i]} rx={6} strokeWidth={1.3} className={LAYER_CLS[i]} />
            <text x={24} y={LAYER_Y[i] + (i === 2 ? 18 : 17)} className="fill-foreground text-[11px] font-semibold">
              {l.name}
            </text>
            {l.job ? (
              <text x={296} y={LAYER_Y[i] + 17} textAnchor="end" className="fill-muted-foreground text-[10px]">
                {l.job}
              </text>
            ) : null}
            {l.items.map((item, k) => (
              <g key={item}>
                <rect x={chipX(l.items.length, k)} y={LAYER_Y[i] + 28} width={CHIP_W} height={24} rx={4} className="fill-background stroke-border" />
                <text x={chipX(l.items.length, k) + CHIP_W / 2} y={LAYER_Y[i] + 44} textAnchor="middle" className="fill-foreground text-[10.5px]">
                  {item}
                </text>
              </g>
            ))}
          </g>
        ))}

        {/* depends on: application layer down to system layer */}
        <line x1={40} y1={82} x2={40} y2={96} strokeWidth={1.5} className="stroke-foreground" />
        <polygon points="40,101 36,94 44,94" className="fill-foreground" />
        <text x={48} y={94} className="fill-foreground text-[10px]">
          depends on
        </text>
        <line x1={40} y1={170} x2={40} y2={182} strokeWidth={1.5} className="stroke-foreground" />
        <polygon points="40,187 36,180 44,180" className="fill-foreground" />
        <text x={48} y={182} className="fill-foreground text-[10px]">
          runs
        </text>

        {/* antivirus uses utilities */}
        <line x1={av} y1={LAYER_Y[0] + 53} x2={ut + 9} y2={LAYER_Y[1] + 20} strokeWidth={1.5} strokeDasharray="4 3" className="stroke-amber-600 dark:stroke-amber-400" />
        <polygon points={HEAD} className="fill-amber-600 dark:fill-amber-400" />
        <text x={av - 30} y={94} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          antivirus uses utilities
        </text>
      </svg>
    </div>
  );
}
