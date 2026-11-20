/**
 * Static figure: the homologous forelimbs NCERT names, in the words of the
 * NEET concept "Homology and divergent evolution" (nzoev-homology).
 *
 * The forelimbs of whales, bats, cheetah and human, each drawn as a plan with
 * the same six kinds of bone in the same order: humerus, radius, ulna,
 * carpals, metacarpals, phalanges. Only the lengths differ, because the limbs
 * do different work. The lengths are a sketch, not measurements, and the
 * figure says so.
 *
 * The data are exported and pinned by tests/notes-w2-17.test.ts.
 * Server component, no client state.
 */

/** The six kinds of bone, top (shoulder) to bottom (fingers), as the concept lists them. */
export const BONES = ["humerus", "radius", "ulna", "carpals", "metacarpals", "phalanges"] as const;
export type Bone = (typeof BONES)[number];

export type Limb = {
  animal: "Whale" | "Bat" | "Cheetah" | "Human";
  x: number;
  /** Sketch lengths of humerus, radius and ulna (side by side), carpals, metacarpals, phalanges. */
  humerus: number;
  forearm: number;
  carpals: number;
  metacarpals: number;
  phalanges: number;
  /** Half the spread of the five digits. */
  spread: number;
};

export const LIMBS: readonly Limb[] = [
  { animal: "Whale", x: 50, humerus: 22, forearm: 22, carpals: 8, metacarpals: 18, phalanges: 56, spread: 8 },
  { animal: "Bat", x: 125, humerus: 32, forearm: 46, carpals: 8, metacarpals: 44, phalanges: 40, spread: 18 },
  { animal: "Cheetah", x: 200, humerus: 46, forearm: 50, carpals: 8, metacarpals: 26, phalanges: 16, spread: 8 },
  { animal: "Human", x: 275, humerus: 52, forearm: 44, carpals: 8, metacarpals: 20, phalanges: 24, spread: 9 },
];

/** Digits drawn on every limb. */
export const DIGITS = 5;

export const TOP = 40;
export const GAP = 2;

/** The y where each bone starts on a limb, in BONES order (radius and ulna share a row). */
export function boneTops(l: Limb): Record<Bone, number> {
  const humerus = TOP;
  const forearm = humerus + l.humerus + GAP;
  const carpals = forearm + l.forearm + GAP;
  const metacarpals = carpals + l.carpals + GAP;
  const phalanges = metacarpals + l.metacarpals + GAP;
  return { humerus, radius: forearm, ulna: forearm, carpals, metacarpals, phalanges };
}

/** Bottom of the limb (end of the phalanges). */
export function limbBottom(l: Limb): number {
  return boneTops(l).phalanges + l.phalanges;
}

const TONE: Record<Bone, string> = {
  humerus: "fill-sky-500 dark:fill-sky-400",
  radius: "fill-emerald-500 dark:fill-emerald-400",
  ulna: "fill-lime-600 dark:fill-lime-400",
  carpals: "fill-amber-500 dark:fill-amber-400",
  metacarpals: "fill-violet-500 dark:fill-violet-400",
  phalanges: "fill-rose-500 dark:fill-rose-400",
};

function digitX(l: Limb, i: number): number {
  return l.x - l.spread + (i * 2 * l.spread) / (DIGITS - 1);
}

function LimbPlan({ l }: { l: Limb }) {
  const t = boneTops(l);
  const half = l.phalanges / 2 - 1;
  return (
    <g>
      <rect x={l.x - 4} y={t.humerus} width={8} height={l.humerus} rx={3} className={TONE.humerus} />
      <rect x={l.x - 6} y={t.radius} width={4.5} height={l.forearm} rx={2} className={TONE.radius} />
      <rect x={l.x + 1.5} y={t.ulna} width={4.5} height={l.forearm} rx={2} className={TONE.ulna} />
      {[-6, 0, 6].map((dx) => (
        <circle key={dx} cx={l.x + dx} cy={t.carpals + l.carpals / 2} r={3} className={TONE.carpals} />
      ))}
      {Array.from({ length: DIGITS }, (_, i) => {
        const x = digitX(l, i);
        return (
          <g key={i}>
            <rect x={x - 1.2} y={t.metacarpals} width={2.4} height={l.metacarpals} rx={1} className={TONE.metacarpals} />
            <rect x={x - 1.2} y={t.phalanges} width={2.4} height={half} rx={1} className={TONE.phalanges} />
            <rect x={x - 1.2} y={t.phalanges + half + 2} width={2.4} height={half} rx={1} className={TONE.phalanges} />
          </g>
        );
      })}
      <text x={l.x} y={20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {l.animal}
      </text>
    </g>
  );
}

export default function NeetForelimbHomology() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · homologous forelimbs
      </p>
      <svg
        viewBox="0 0 320 268"
        className="block h-auto w-full"
        role="img"
        aria-label="The forelimbs of a whale, a bat, a cheetah and a human drawn side by side. Each has a humerus, then a radius and an ulna, then carpals, metacarpals and phalanges, in the same order and the same colours; only the lengths differ."
      >
        {LIMBS.map((l) => (
          <LimbPlan key={l.animal} l={l} />
        ))}
        {BONES.map((b, i) => {
          const x = 14 + (i % 3) * 102;
          const y = 236 + Math.floor(i / 3) * 18;
          return (
            <g key={b}>
              <rect x={x} y={y - 9} width={10} height={10} rx={2} className={TONE[b]} />
              <text x={x + 15} y={y} className="fill-foreground text-[10px]">
                {b}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Same six kinds of bone in the same order, doing different work: homology, from divergent evolution. Drawn as a
        plan, not to scale.
      </p>
    </div>
  );
}
