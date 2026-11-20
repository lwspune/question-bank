/**
 * Static figure: a coded relation chain decoded link by link into a family
 * tree (concept ssc2rbrre-coded), with the concept's own example. A # B: A is
 * the mother of B; A & B: A is the brother of B; A % B: A is the husband of B.
 * X % Y # Z & W gives three links: X is Y's husband, Y is Z's mother, Z is W's
 * brother. So Y is W's mother too, and X, her husband, one level above W and
 * male, is W's father. W's gender is never given, so W has a dashed outline.
 * Signs: a square for male, a circle for female, a double line for a married
 * couple. Server component. Pinned by tests/notes-w2-09.test.ts.
 */

export const CODE = { "#": "mother", "&": "brother", "%": "husband" } as const;
export type CodeSign = keyof typeof CODE;
export const CHAIN = "X % Y # Z & W";

export type Link = { a: string; sign: CodeSign; b: string };

/** Split "X % Y # Z & W" into its links: X % Y, then Y # Z, then Z & W. */
export function links(chain: string): Link[] {
  const parts = chain.split(" ");
  const out: Link[] = [];
  for (let i = 0; i + 2 < parts.length; i += 2) out.push({ a: parts[i], sign: parts[i + 1] as CodeSign, b: parts[i + 2] });
  return out;
}

export const linkSentence = (l: Link) => `${l.a} is ${l.b}'s ${CODE[l.sign]}`;

export type Gender = "male" | "female" | "unknown";
/** Level 0 is the top row. Gender comes only from the relation words. */
export const TREE: Record<string, { level: number; gender: Gender }> = {
  X: { level: 0, gender: "male" },
  Y: { level: 0, gender: "female" },
  Z: { level: 1, gender: "male" },
  W: { level: 1, gender: "unknown" },
};

/** X stands this many levels above W. */
export const levelsAbove = (a: string, b: string) => TREE[b].level - TREE[a].level;

/** The word for a parent: one level up, through a marriage to the child's mother. */
export const parentWord = (g: Gender) => (g === "male" ? "father" : g === "female" ? "mother" : "parent");

const LINKS = links(CHAIN);
const S = 10;
const XX = 130;
const YX = 200;
const TOP_Y = 120;
const LOW_Y = 186;

const MALE = "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400";
const FEMALE = "fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400";

function Node({ x, y, name }: { x: number; y: number; name: string }) {
  const g = TREE[name].gender;
  return (
    <g>
      {g === "female" ? (
        <circle cx={x} cy={y} r={S} strokeWidth={1.5} className={FEMALE} />
      ) : g === "male" ? (
        <rect x={x - S} y={y - S} width={2 * S} height={2 * S} strokeWidth={1.5} className={MALE} />
      ) : (
        <rect x={x - S} y={y - S} width={2 * S} height={2 * S} rx={5} strokeWidth={1.5} strokeDasharray="3 2" className="fill-background stroke-muted-foreground" />
      )}
      <text x={x} y={y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {name}
      </text>
    </g>
  );
}

export default function SscT2CodedRelations() {
  const mid = (XX + YX) / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · decode one link at a time, then draw
      </p>
      <svg
        viewBox="0 0 320 262"
        className="block h-auto w-full"
        role="img"
        aria-label="The chain X percent Y hash Z and W, where hash means mother of, and means brother of, percent means husband of. Three links: X is Y's husband, Y is Z's mother, Z is W's brother. In the tree X and Y are a married couple on the top row, and their children Z and W are on the row below. W's gender is not given. X is one level above W and male, the husband of W's mother, so X is W's father."
      >
        <text x={160} y={18} textAnchor="middle" className="fill-foreground text-[15px] font-semibold">
          {CHAIN}
        </text>
        {LINKS.map((l, i) => (
          <g key={i}>
            <rect x={46} y={28 + i * 21} width={228} height={18} rx={3} className="fill-background stroke-border" />
            <text x={56} y={41 + i * 21} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
              {l.a} {l.sign} {l.b}
            </text>
            <text x={112} y={41 + i * 21} className="fill-foreground text-[11px]">
              {linkSentence(l)}
            </text>
          </g>
        ))}

        {/* Generation rows */}
        <line x1={0} y1={TOP_Y} x2={320} y2={TOP_Y} strokeDasharray="2 4" className="stroke-border" />
        <line x1={0} y1={LOW_Y} x2={320} y2={LOW_Y} strokeDasharray="2 4" className="stroke-border" />

        {/* Couple: double line */}
        <line x1={XX + S} y1={TOP_Y - 2} x2={YX - S} y2={TOP_Y - 2} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={XX + S} y1={TOP_Y + 2} x2={YX - S} y2={TOP_Y + 2} strokeWidth={1.5} className="stroke-foreground" />
        {/* Children: drop from the couple, bar, drops */}
        <line x1={mid} y1={TOP_Y + 2} x2={mid} y2={LOW_Y - 30} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={XX} y1={LOW_Y - 30} x2={YX} y2={LOW_Y - 30} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={XX} y1={LOW_Y - 30} x2={XX} y2={LOW_Y - S} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={YX} y1={LOW_Y - 30} x2={YX} y2={LOW_Y - S} strokeWidth={1.5} className="stroke-foreground" />
        <Node x={XX} y={TOP_Y} name="X" />
        <Node x={YX} y={TOP_Y} name="Y" />
        <Node x={XX} y={LOW_Y} name="Z" />
        <Node x={YX} y={LOW_Y} name="W" />
        <text x={YX + 16} y={TOP_Y + 4} className="fill-muted-foreground text-[10px]">
          mother of Z and W
        </text>
        <text x={YX + 16} y={LOW_Y + 4} className="fill-muted-foreground text-[10px]">
          gender not given
        </text>
        <text x={XX - 16} y={LOW_Y + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          W&apos;s brother
        </text>

        {/* Key */}
        <rect x={8} y={TOP_Y - 18} width={12} height={12} strokeWidth={1.2} className={MALE} />
        <text x={24} y={TOP_Y - 8} className="fill-muted-foreground text-[10px]">
          male
        </text>
        <circle cx={14} cy={TOP_Y + 8} r={6} strokeWidth={1.2} className={FEMALE} />
        <text x={24} y={TOP_Y + 12} className="fill-muted-foreground text-[10px]">
          female
        </text>

        <text x={160} y={228} textAnchor="middle" className="fill-foreground text-[11px]">
          X: one level above W, male, husband of W&apos;s mother
        </text>
        <text x={160} y={248} textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-300">
          X is W&apos;s {parentWord(TREE.X.gender)}
        </text>
      </svg>
    </div>
  );
}
