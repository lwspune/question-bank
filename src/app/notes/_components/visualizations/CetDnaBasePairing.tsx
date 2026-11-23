/**
 * Diagram: the Watson-Crick double helix drawn flat as a ladder (concept
 * cetbio-dna-double-helix-and-backbone). Two antiparallel strands: the left
 * runs 5′ (top) to 3′ (bottom), the right 5′ (bottom) to 3′ (top). Each
 * backbone is sugar, phosphate, sugar, linked C3′–O–P–O–C5′ (phosphodiester),
 * with a free phosphate at the 5′ end and a free OH at the 3′ end. The
 * backbones are outside, the bases inside, held by hydrogen bonds: A with T by
 * 2, G with C by 3. The concept's example: 22% A gives T 22%, G 28%, C 28%.
 *
 * Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */

export type Base = "A" | "T" | "G" | "C";

/** The complementary base. */
export const PARTNER: Record<Base, Base> = { A: "T", T: "A", G: "C", C: "G" };

/** Hydrogen bonds in each pair. */
export function hBonds(b: Base): 2 | 3 {
  return b === "A" || b === "T" ? 2 : 3;
}

/** The left strand, read top to bottom (5′ to 3′). */
export const LEFT_STRAND: readonly Base[] = ["A", "G", "T", "C"];
export const RIGHT_STRAND: readonly Base[] = LEFT_STRAND.map((b) => PARTNER[b]);

/** Direction of each strand from top to bottom of the picture. */
export const STRAND_ENDS = {
  left: { top: "5′", bottom: "3′" },
  right: { top: "3′", bottom: "5′" },
} as const;

/** What sits at each end of a strand. */
export const END_GROUP = { "5′": "phosphate", "3′": "OH" } as const;

/** Chargaff: A = T and G = C, so one percentage fixes the other three. */
export function chargaff(aPercent: number): Record<Base, number> {
  const gc = (100 - 2 * aPercent) / 2;
  return { A: aPercent, T: aPercent, G: gc, C: gc };
}
export const CHARGAFF_EXAMPLE = { A: 22 } as const;

// Geometry (viewBox units).
export const LEFT_X = 70;
export const RIGHT_X = 226;
export const SUGAR_Y = [52, 94, 136, 178] as const;
const HALF = 21;

/**
 * Phosphates sit on the 5′ side of each sugar: above it on the left strand
 * (5′ at the top), below it on the right strand (5′ at the bottom).
 */
export function phosphateYs(strand: "left" | "right"): number[] {
  return SUGAR_Y.map((y) => (strand === "left" ? y - HALF : y + HALF));
}
/** Where the free 3′ OH of each strand is drawn. */
export function threePrimeOhY(strand: "left" | "right"): number {
  return strand === "left" ? SUGAR_Y[SUGAR_Y.length - 1] + HALF : SUGAR_Y[0] - HALF;
}

const BASE_W = 56;
const BASE_H = 16;
const GAP = 16;
const L_BASE_X = 84;
const R_BASE_X = L_BASE_X + BASE_W + GAP;

const BASE_CLASS: Record<Base, string> = {
  A: "fill-emerald-200 stroke-emerald-700 dark:fill-emerald-900 dark:stroke-emerald-300",
  T: "fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300",
  G: "fill-amber-200 stroke-amber-700 dark:fill-amber-900 dark:stroke-amber-300",
  C: "fill-rose-200 stroke-rose-700 dark:fill-rose-900 dark:stroke-rose-300",
};

function pentagon(cx: number, cy: number, r = 9): string {
  return [-90, -18, 54, 126, 198]
    .map((deg) => {
      const a = (deg * Math.PI) / 180;
      return `${Math.round((cx + r * Math.cos(a)) * 100) / 100},${Math.round((cy + r * Math.sin(a)) * 100) / 100}`;
    })
    .join(" ");
}

function Phosphate({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} strokeWidth={1} className="fill-violet-200 stroke-violet-700 dark:fill-violet-900 dark:stroke-violet-300" />
      <text x={x} y={y + 3.5} textAnchor="middle" className="fill-violet-900 text-[9px] font-bold dark:fill-violet-100">
        P
      </text>
    </g>
  );
}

function Oh({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
      OH
    </text>
  );
}

function BaseBox({ x, y, b }: { x: number; y: number; b: Base }) {
  return (
    <g>
      <rect x={x} y={y - BASE_H / 2} width={BASE_W} height={BASE_H} rx={3} strokeWidth={1} className={BASE_CLASS[b]} />
      <text x={x + BASE_W / 2} y={y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
        {b}
      </text>
    </g>
  );
}

function DirectionArrow({ x, down, label }: { x: number; down: boolean; label: string }) {
  const top = 40;
  const bottom = 190;
  const tip = down ? bottom : top;
  const mid = (top + bottom) / 2;
  return (
    <g>
      <line x1={x} y1={down ? top : bottom} x2={x} y2={down ? bottom - 6 : top + 6} strokeWidth={1.5} className="stroke-indigo-600 dark:stroke-indigo-400" />
      <polygon
        points={down ? `${x},${tip} ${x - 4},${tip - 8} ${x + 4},${tip - 8}` : `${x},${tip} ${x - 4},${tip + 8} ${x + 4},${tip + 8}`}
        className="fill-indigo-600 dark:fill-indigo-400"
      />
      <text
        x={x - 6}
        y={mid}
        textAnchor="middle"
        transform={`rotate(-90 ${x - 6} ${mid})`}
        className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300"
      >
        {label}
      </text>
    </g>
  );
}

export default function CetDnaBasePairing() {
  const ex = chargaff(CHARGAFF_EXAMPLE.A);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the two antiparallel strands of DNA
      </p>
      <svg
        viewBox="0 0 320 288"
        className="block h-auto w-full"
        role="img"
        aria-label="DNA drawn flat as a ladder. Two sugar-phosphate backbones on the outside run in opposite directions, the left from 5 prime at the top to 3 prime at the bottom and the right from 5 prime at the bottom to 3 prime at the top. Each 5 prime end has a free phosphate and each 3 prime end a free OH. The bases inside pair A with T by two hydrogen bonds and G with C by three."
      >
        {/* Ends and the middle */}
        <text x={LEFT_X} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {STRAND_ENDS.left.top}
        </text>
        <text x={RIGHT_X} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {STRAND_ENDS.right.top}
        </text>
        <text x={(LEFT_X + RIGHT_X) / 2} y={16} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          bases inside
        </text>
        <text x={LEFT_X} y={218} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {STRAND_ENDS.left.bottom}
        </text>
        <text x={RIGHT_X} y={218} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          {STRAND_ENDS.right.bottom}
        </text>

        <DirectionArrow x={36} down label="5′ to 3′" />
        <DirectionArrow x={306} down={false} label="5′ to 3′" />

        {/* Backbones */}
        <line x1={LEFT_X} y1={phosphateYs("left")[0]} x2={LEFT_X} y2={threePrimeOhY("left") - 6} strokeWidth={2} className="stroke-muted-foreground" />
        <line x1={RIGHT_X} y1={threePrimeOhY("right") + 6} x2={RIGHT_X} y2={phosphateYs("right")[3]} strokeWidth={2} className="stroke-muted-foreground" />

        {/* Base pairs and hydrogen bonds */}
        {SUGAR_Y.map((y, i) => {
          const l = LEFT_STRAND[i];
          const r = RIGHT_STRAND[i];
          const n = hBonds(l);
          const offs = n === 2 ? [-3, 3] : [-5, 0, 5];
          return (
            <g key={y}>
              <line x1={LEFT_X + 9} y1={y} x2={L_BASE_X} y2={y} strokeWidth={1.2} className="stroke-muted-foreground" />
              <line x1={R_BASE_X + BASE_W} y1={y} x2={RIGHT_X - 9} y2={y} strokeWidth={1.2} className="stroke-muted-foreground" />
              {offs.map((o) => (
                <line
                  key={o}
                  x1={L_BASE_X + BASE_W}
                  y1={y + o}
                  x2={R_BASE_X}
                  y2={y + o}
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  className="stroke-foreground"
                />
              ))}
              <BaseBox x={L_BASE_X} y={y} b={l} />
              <BaseBox x={R_BASE_X} y={y} b={r} />
              <text x={RIGHT_X + 14} y={y + 3.5} className="fill-muted-foreground text-[9.5px]">
                {n} H-bonds
              </text>
            </g>
          );
        })}

        {/* Sugars, phosphates and the free ends */}
        {SUGAR_Y.map((y) => (
          <g key={`s${y}`}>
            <polygon points={pentagon(LEFT_X, y)} strokeWidth={1} className="fill-orange-200 stroke-orange-700 dark:fill-orange-900 dark:stroke-orange-300" />
            <polygon points={pentagon(RIGHT_X, y)} strokeWidth={1} className="fill-orange-200 stroke-orange-700 dark:fill-orange-900 dark:stroke-orange-300" />
          </g>
        ))}
        {phosphateYs("left").map((y) => (
          <Phosphate key={`pl${y}`} x={LEFT_X} y={y} />
        ))}
        {phosphateYs("right").map((y) => (
          <Phosphate key={`pr${y}`} x={RIGHT_X} y={y} />
        ))}
        <Oh x={LEFT_X} y={threePrimeOhY("left")} />
        <Oh x={RIGHT_X} y={threePrimeOhY("right")} />

        {/* What it says */}
        <rect x={8} y={228} width={304} height={56} rx={6} className="fill-background stroke-border" />
        <text x={18} y={243} className="fill-foreground text-[10px] font-semibold">
          A = T: 2 H-bonds. G ≡ C: 3 H-bonds.
        </text>
        <text x={18} y={257} className="fill-foreground text-[10px]">
          Backbone link: C3′–O–P–O–C5′ (phosphodiester)
        </text>
        <text x={18} y={271} className="fill-foreground text-[10px]">
          If A is {ex.A}%: T {ex.T}%, G {ex.G}%, C {ex.C}%
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Pentagon: deoxyribose sugar. P: phosphate. A adenine, T thymine, G guanine, C cytosine. The backbone (sugar and phosphate) is outside, the bases inside; in the real molecule the ladder twists into a right-handed helix.
      </p>
    </div>
  );
}
