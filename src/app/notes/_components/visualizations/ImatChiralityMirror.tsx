/**
 * Static figure: the two enantiomers of butan-2-ol, the concept's
 * self-check molecule, CH₃CH(OH)CH₂CH₃. Its carbon 2 carries four different
 * groups (H, OH, CH₃, C₂H₅), drawn in wedge and dash style; the right-hand
 * molecule is its reflection in the dashed mirror.
 *
 * Pedagogical aim: see "non-superimposable mirror images". Each molecule's
 * handedness is computed from its 3D bond directions (in the plane, towards
 * the reader on a wedge, away on a dash); a reflection flips its sign and no
 * rotation can, which tests/notes-imat-visuals-chem2.test.ts pins. Server
 * component, no client state.
 */

export type Bond = { group: string; dx: number; dy: number; depth: "plane" | "wedge" | "dash" };

/** The four groups on the chiral carbon of butan-2-ol. */
export const GROUPS = ["H", "OH", "CH₃", "C₂H₅"] as const;

/** Left molecule: bond directions from the carbon (screen units, y down). */
export const LEFT: readonly Bond[] = [
  { group: "CH₃", dx: 0, dy: -50, depth: "plane" },
  { group: "C₂H₅", dx: -50, dy: 18, depth: "plane" },
  { group: "OH", dx: 40, dy: 22, depth: "wedge" },
  { group: "H", dx: 14, dy: 48, depth: "dash" },
];

export const MIRROR_X = 160;
const LEFT_C = { x: 82, y: 94 };
const RIGHT_C = { x: 2 * MIRROR_X - LEFT_C.x, y: LEFT_C.y };

/** Reflect a molecule in the vertical mirror: x flips, the depth (towards or away from you) does not. */
export function mirror(bonds: readonly Bond[]): Bond[] {
  return bonds.map((b) => ({ ...b, dx: -b.dx }));
}

export const RIGHT: readonly Bond[] = mirror(LEFT);

const DEPTH = { plane: 0, wedge: 30, dash: -30 } as const;

function vec(bonds: readonly Bond[], group: string): [number, number, number] {
  const b = bonds.find((x) => x.group === group);
  if (!b) throw new Error(`no bond to ${group}`);
  return [b.dx, -b.dy, DEPTH[b.depth]];
}

/**
 * Sign of the triple product of the OH, CH₃ and C₂H₅ bond vectors: +1 or -1.
 * A rotation keeps it; a reflection flips it.
 */
export function handedness(bonds: readonly Bond[]): number {
  const [a, b, c] = [vec(bonds, "OH"), vec(bonds, "CH₃"), vec(bonds, "C₂H₅")];
  const det =
    a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
  return Math.sign(det);
}

const W = 320;
const H = 200;
const R0 = 8; // bonds start this far from the carbon's letter

function BondMark({ cx, cy, b }: { cx: number; cy: number; b: Bond }) {
  const len = Math.hypot(b.dx, b.dy);
  const ux = b.dx / len;
  const uy = b.dy / len;
  const sx = cx + ux * R0;
  const sy = cy + uy * R0;
  const ex = cx + b.dx;
  const ey = cy + b.dy;
  const px = -uy;
  const py = ux;
  if (b.depth === "wedge") {
    return (
      <polygon
        points={`${sx},${sy} ${ex + px * 5},${ey + py * 5} ${ex - px * 5},${ey - py * 5}`}
        className="fill-foreground"
      />
    );
  }
  if (b.depth === "dash") {
    const n = 6;
    return (
      <g>
        {Array.from({ length: n }, (_, i) => {
          const f = (i + 1) / n;
          const mx = sx + (ex - sx) * f;
          const my = sy + (ey - sy) * f;
          const half = 1 + 4 * f;
          return (
            <line key={i} x1={mx + px * half} y1={my + py * half} x2={mx - px * half} y2={my - py * half} className="stroke-foreground" strokeWidth={1.4} />
          );
        })}
      </g>
    );
  }
  return <line x1={sx} y1={sy} x2={ex} y2={ey} className="stroke-foreground" strokeWidth={2} />;
}

const GROUP_TONE: Record<string, string> = {
  H: "fill-muted-foreground",
  OH: "fill-rose-700 dark:fill-rose-300",
  "CH₃": "fill-sky-700 dark:fill-sky-300",
  "C₂H₅": "fill-emerald-700 dark:fill-emerald-300",
};

function Molecule({ cx, cy, bonds }: { cx: number; cy: number; bonds: readonly Bond[] }) {
  return (
    <g>
      {bonds.map((b) => (
        <BondMark key={b.group} cx={cx} cy={cy} b={b} />
      ))}
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        C
      </text>
      {bonds.map((b) => {
        const len = Math.hypot(b.dx, b.dy);
        const lx = cx + b.dx + (b.dx / len) * 14;
        const ly = cy + b.dy + (b.dy / len) * 12 + 4;
        return (
          <text key={`l-${b.group}`} x={lx} y={ly} textAnchor="middle" className={`${GROUP_TONE[b.group]} text-[11px] font-semibold`}>
            {b.group}
          </text>
        );
      })}
    </g>
  );
}

export default function ImatChiralityMirror() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a chiral carbon and its mirror image
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="The two enantiomers of butan-2-ol. A carbon carries H, OH, CH3 and C2H5, shown with one wedge bond towards you and one dashed bond away from you. The right molecule is the left one reflected in a mirror. They are not superimposable."
      >
        <line x1={MIRROR_X} y1={20} x2={MIRROR_X} y2={160} strokeDasharray="5 4" stroke="currentColor" className="text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
        <text x={MIRROR_X} y={14} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          mirror
        </text>

        <Molecule cx={LEFT_C.x} cy={LEFT_C.y} bonds={LEFT} />
        <Molecule cx={RIGHT_C.x} cy={RIGHT_C.y} bonds={RIGHT} />

        <text x={W / 2} y={178} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          butan-2-ol: four different groups on one carbon
        </text>
        <text x={W / 2} y={194} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          mirror images, not superimposable
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Carbon 2 of butan-2-ol, CH₃CH(OH)CH₂CH₃, carries H, OH, CH₃ and C₂H₅: four different groups, so it is a chiral
        centre. A solid wedge points towards you, a dashed bond away. However you turn the right-hand molecule, it
        will not fit exactly on the left one, like a left and a right hand. The two enantiomers have the same boiling
        point and density; they rotate plane-polarised light in opposite directions.
      </p>
    </div>
  );
}
