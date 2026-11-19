/**
 * Static figure: molecular orbital energy diagrams of N₂ and O₂ side by side
 * (concept jcbond-bond-order, with jcbond-lcao), counting every electron as the
 * concept does.
 *
 * - N₂, 14 electrons: the light order, π2p BELOW σ2pz (s–p mixing).
 *   Nb = 10, Na = 4, bond order (10 − 4)/2 = 3, no unpaired electron.
 * - O₂, 16 electrons: from 15 electrons σ2pz drops below the π2p pair.
 *   Nb = 10, Na = 6, bond order (10 − 6)/2 = 2, two unpaired electrons in
 *   π*2p (Hund's rule), so O₂ is paramagnetic.
 *
 * Levels are in order, not to scale. Server component, pure SVG. Pinned by
 * tests/notes-jee-visuals-chem.test.ts.
 */

export type MoId = "s1s" | "s1s*" | "s2s" | "s2s*" | "p2p" | "s2pz" | "p2p*" | "s2p*";

export type MoLevel = {
  id: MoId;
  /** σ or π. */
  kind: "σ" | "π";
  antibonding: boolean;
  /** Label after the Greek letter, e.g. "*2s". */
  rest: string;
  /** Orbitals at this level: 1 for σ, 2 for the π pair. */
  degeneracy: 1 | 2;
};

const L: Record<MoId, MoLevel> = {
  s1s: { id: "s1s", kind: "σ", antibonding: false, rest: "1s", degeneracy: 1 },
  "s1s*": { id: "s1s*", kind: "σ", antibonding: true, rest: "*1s", degeneracy: 1 },
  s2s: { id: "s2s", kind: "σ", antibonding: false, rest: "2s", degeneracy: 1 },
  "s2s*": { id: "s2s*", kind: "σ", antibonding: true, rest: "*2s", degeneracy: 1 },
  p2p: { id: "p2p", kind: "π", antibonding: false, rest: "2p", degeneracy: 2 },
  s2pz: { id: "s2pz", kind: "σ", antibonding: false, rest: "2p", degeneracy: 1 },
  "p2p*": { id: "p2p*", kind: "π", antibonding: true, rest: "*2p", degeneracy: 2 },
  "s2p*": { id: "s2p*", kind: "σ", antibonding: true, rest: "*2p", degeneracy: 1 },
};

/** Up to 14 electrons (B₂, C₂, N₂): π2p below σ2pz. Lowest first. */
export const LIGHT_ORDER: readonly MoLevel[] = [L.s1s, L["s1s*"], L.s2s, L["s2s*"], L.p2p, L.s2pz, L["p2p*"], L["s2p*"]];
/** From 15 electrons (O₂, F₂): σ2pz below π2p. Lowest first. */
export const HEAVY_ORDER: readonly MoLevel[] = [L.s1s, L["s1s*"], L.s2s, L["s2s*"], L.s2pz, L.p2p, L["p2p*"], L["s2p*"]];

export function orderFor(electrons: number): readonly MoLevel[] {
  return electrons <= 14 ? LIGHT_ORDER : HEAVY_ORDER;
}

/** Electrons in each orbital of each level, filled lowest first; a π pair fills singly first (Hund's rule). */
export function fill(electrons: number): { level: MoLevel; orbitals: number[] }[] {
  let left = electrons;
  return orderFor(electrons).map((level) => {
    const take = Math.min(left, 2 * level.degeneracy);
    left -= take;
    const orbitals = Array.from({ length: level.degeneracy }, (_, i) => {
      const singles = Math.min(take, level.degeneracy);
      const pairs = take - singles;
      return (i < singles ? 1 : 0) + (i < pairs ? 1 : 0);
    });
    return { level, orbitals };
  });
}

export function electronCounts(electrons: number): { nb: number; na: number; bondOrder: number; unpaired: number } {
  let nb = 0;
  let na = 0;
  let unpaired = 0;
  for (const { level, orbitals } of fill(electrons)) {
    const n = orbitals.reduce((a, b) => a + b, 0);
    if (level.antibonding) na += n;
    else nb += n;
    unpaired += orbitals.filter((o) => o === 1).length;
  }
  return { nb, na, bondOrder: (nb - na) / 2, unpaired };
}

export const MOLECULES = [
  { name: "N₂", electrons: 14, cx: 86 },
  { name: "O₂", electrons: 16, cx: 246 },
] as const;

/** y of each level by its place in the order (lowest first). */
export const LEVEL_Y = [238, 214, 186, 162, 134, 110, 82, 58] as const;

function Arrow({ x, y, up }: { x: number; y: number; up: boolean }) {
  const tip = up ? y - 7 : y + 7;
  const tail = up ? y + 7 : y - 7;
  const head = up ? `M${x - 3},${tip + 4} L${x},${tip} L${x + 3},${tip + 4}` : `M${x - 3},${tip - 4} L${x},${tip} L${x + 3},${tip - 4}`;
  return (
    <g className="stroke-foreground" fill="none" strokeWidth={1.5}>
      <line x1={x} y1={tail} x2={x} y2={tip} />
      <path d={head} />
    </g>
  );
}

function LevelLabel({ level, x, y }: { level: MoLevel; x: number; y: number }) {
  return (
    <text x={x} y={y + 3.5} textAnchor="end" className={`${level.antibonding ? "fill-rose-700 dark:fill-rose-300" : "fill-sky-700 dark:fill-sky-300"} text-[10px]`}>
      {level.kind}
      {level.rest}
      {level.id === "s2pz" && (
        <tspan dy={3} className="text-[8px]">
          z
        </tspan>
      )}
    </text>
  );
}

function Panel({ name, electrons, cx }: { name: string; electrons: number; cx: number }) {
  const rows = fill(electrons);
  const c = electronCounts(electrons);
  const light = electrons <= 14;
  return (
    <g>
      <text x={cx} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {name}: {electrons} electrons
      </text>
      <text x={cx} y={28} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
        {light ? "π2p below σ2p" : "σ2p"}
        <tspan dy={3} className="text-[8px]">
          z
        </tspan>
        <tspan dy={-3}>{light ? "" : " below π2p"}</tspan>
      </text>
      {rows.map(({ level, orbitals }, i) => {
        const y = LEVEL_Y[i];
        const xs = level.degeneracy === 1 ? [cx] : [cx - 15, cx + 15];
        const w = level.degeneracy === 1 ? 26 : 22;
        const tone = level.antibonding ? "stroke-rose-600 dark:stroke-rose-400" : "stroke-sky-600 dark:stroke-sky-400";
        const mixed = level.id === "p2p" || level.id === "s2pz";
        return (
          <g key={level.id}>
            {mixed && (
              <rect x={cx - 31} y={y - 10} width={62} height={20} rx={3} className="fill-amber-100/60 dark:fill-amber-900/25" />
            )}
            <LevelLabel level={level} x={cx - 34} y={y} />
            {xs.map((x, j) => (
              <g key={j}>
                <line x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} strokeWidth={2} className={tone} />
                {orbitals[j] >= 1 && <Arrow x={x - 4} y={y} up />}
                {orbitals[j] === 2 && <Arrow x={x + 4} y={y} up={false} />}
              </g>
            ))}
          </g>
        );
      })}
      <text x={cx} y={262} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
        N
        <tspan dy={3} className="text-[8px]">
          b
        </tspan>
        <tspan dy={-3}> = {c.nb}, N</tspan>
        <tspan dy={3} className="text-[8px]">
          a
        </tspan>
        <tspan dy={-3}> = {c.na}</tspan>
      </text>
      <text x={cx} y={276} textAnchor="middle" className="fill-foreground text-[10px] font-semibold tabular-nums">
        bond order ({c.nb} − {c.na})/2 = {c.bondOrder}
      </text>
      <text
        x={cx}
        y={290}
        textAnchor="middle"
        className={`${c.unpaired ? "fill-rose-700 dark:fill-rose-300" : "fill-muted-foreground"} text-[10px] font-semibold`}
      >
        {c.unpaired} unpaired: {c.unpaired ? "paramagnetic" : "diamagnetic"}
      </text>
    </g>
  );
}

export default function JeeMoDiagram() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · molecular orbitals of nitrogen and oxygen
      </p>

      <svg
        viewBox="0 0 320 298"
        className="block h-auto w-full"
        role="img"
        aria-label="Molecular orbital diagrams. N2, 14 electrons, with pi 2p below sigma 2pz: 10 bonding and 4 antibonding electrons, bond order 3, no unpaired electron, diamagnetic. O2, 16 electrons, with sigma 2pz below pi 2p: 10 bonding and 6 antibonding electrons, bond order 2, two unpaired electrons in pi star 2p, paramagnetic."
      >
        <line x1={166} y1={40} x2={166} y2={292} strokeWidth={0.8} strokeDasharray="3 3" className="stroke-border" />
        <text x={4} y={52} className="fill-muted-foreground text-[10px]">
          E
        </text>
        <line x1={7} y1={244} x2={7} y2={60} strokeWidth={1} className="stroke-muted-foreground" />
        <polygon points="7,56 4,63 10,63" className="fill-muted-foreground" />
        {MOLECULES.map((m) => (
          <Panel key={m.name} name={m.name} electrons={m.electrons} cx={m.cx} />
        ))}
      </svg>

      <p className="mt-2 text-sm text-foreground tabular-nums">
        Bond order = (N<sub>b</sub> − N<sub>a</sub>)/2. Both molecules have 10 bonding electrons; the two extra electrons of O₂ go into π*2p, one in
        each orbital, so its bond order drops from 3 to 2 and it has two unpaired electrons.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Blue: bonding orbitals. Red, with a star: antibonding. Shaded: the two levels that swap places. Up to 14 electrons the π2p
        pair lies below σ2p<sub>z</sub>; from 15 electrons σ2p<sub>z</sub> drops below it.
      </p>
    </div>
  );
}
