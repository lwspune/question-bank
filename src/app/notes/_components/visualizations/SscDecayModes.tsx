/**
 * Static figure: how each kind of radioactive decay changes the atomic number
 * Z and the mass number A (concept sscfmpmo-decay).
 *
 * Exactly the concept's four rows: alpha (a helium-4 nucleus leaves: Z − 2,
 * A − 4), beta-minus (a neutron becomes a proton: Z + 1, A same), beta-plus
 * (a proton becomes a neutron: Z − 1, A same) and gamma (only energy leaves:
 * no change). The example is the concept's self-check: uranium-238 (Z = 92)
 * emits one alpha particle and becomes thorium-234 (Z = 90). Values pinned by
 * tests/notes-ssc-visuals-gk.test.ts. Server component, no client state.
 */

export type DecayMode = {
  name: string;
  /** Change in the atomic number Z. */
  dZ: number;
  /** Change in the mass number A. */
  dA: number;
  /** What happens, in the concept's words. */
  note: string;
};

export const DECAY_MODES: readonly DecayMode[] = [
  { name: "Alpha", dZ: -2, dA: -4, note: "a helium-4 nucleus leaves" },
  { name: "Beta-minus", dZ: 1, dA: 0, note: "a neutron becomes a proton" },
  { name: "Beta-plus", dZ: -1, dA: 0, note: "a proton becomes a neutron" },
  { name: "Gamma", dZ: 0, dA: 0, note: "only energy leaves" },
];

/** The new (Z, A) after one decay of the given mode. */
export function afterDecay(z: number, a: number, mode: DecayMode): { z: number; a: number } {
  return { z: z + mode.dZ, a: a + mode.dA };
}

/** The concept's self-check: uranium-238 emits one alpha particle. */
export const URANIUM_EXAMPLE = { parent: "uranium-238", z: 92, a: 238, daughter: "thorium-234" } as const;

/** "Z − 2" style label for a symbol and its change ("Z" when unchanged). */
export function changeLabel(symbol: string, d: number): string {
  if (d === 0) return symbol;
  return `${symbol} ${d > 0 ? "+" : "−"} ${Math.abs(d)}`;
}

const ROW_TOP = 30;
const ROW_H = 44;

const TONES = [
  { pill: "fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700", text: "fill-rose-800 dark:fill-rose-300" },
  { pill: "fill-sky-50 stroke-sky-400 dark:fill-sky-950/30 dark:stroke-sky-700", text: "fill-sky-800 dark:fill-sky-300" },
  { pill: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700", text: "fill-emerald-800 dark:fill-emerald-300" },
  { pill: "fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700", text: "fill-violet-800 dark:fill-violet-300" },
] as const;

export default function SscDecayModes() {
  const u = URANIUM_EXAMPLE;
  const th = afterDecay(u.z, u.a, DECAY_MODES[0]);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · what each decay does to the atomic and mass numbers
      </p>
      <svg
        viewBox="0 0 320 238"
        className="block h-auto w-full"
        role="img"
        aria-label="Four decays of a nucleus with atomic number Z and mass number A. Alpha: a helium-4 nucleus leaves, giving Z minus 2 and A minus 4. Beta-minus: a neutron becomes a proton, giving Z plus 1 and the same A. Beta-plus: a proton becomes a neutron, giving Z minus 1 and the same A. Gamma: only energy leaves, Z and A do not change. Example: uranium-238 with Z 92 emits an alpha particle and becomes thorium-234 with Z 90."
      >
        <text x={8} y={14} className="fill-muted-foreground text-[10px]">
          Z = atomic number, A = mass number
        </text>

        {DECAY_MODES.map((m, i) => {
          const y = ROW_TOP + i * ROW_H;
          const t = TONES[i];
          return (
            <g key={m.name}>
              <text x={8} y={y + 14} className={`${t.text} text-[11px] font-bold`}>
                {m.name}
              </text>
              <rect x={100} y={y} width={52} height={20} rx={10} className="fill-background stroke-foreground" strokeWidth={1} />
              <text x={126} y={y + 14} textAnchor="middle" className="fill-foreground text-[11px] font-medium">
                Z, A
              </text>
              <line x1={152} y1={y + 10} x2={174} y2={y + 10} className="stroke-foreground" strokeWidth={1.4} />
              <polygon points={`${180},${y + 10} ${172},${y + 6} ${172},${y + 14}`} className="fill-foreground" />
              <rect x={182} y={y} width={100} height={20} rx={10} className={t.pill} strokeWidth={1.2} />
              <text x={232} y={y + 14} textAnchor="middle" className={`${t.text} text-[11px] font-bold`}>
                {changeLabel("Z", m.dZ)}, {changeLabel("A", m.dA)}
              </text>
              <text x={100} y={y + 33} className="fill-muted-foreground text-[10px]">
                {m.note}
                {m.dZ === 0 && m.dA === 0 ? ": no change" : ""}
              </text>
            </g>
          );
        })}

        <line x1={8} y1={208} x2={312} y2={208} className="stroke-border" strokeWidth={1} />
        <text x={8} y={221} className="fill-foreground text-[10px] font-semibold">
          Alpha example: {u.parent} (Z = {u.z}, A = {u.a})
        </text>
        <text x={8} y={234} className="fill-foreground text-[10px]">
          → {u.daughter} (Z = {th.z}, A = {th.a})
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Beta-minus raises Z by 1 and beta-plus lowers it by 1; in both the mass number A stays the same.
      </p>
    </div>
  );
}
