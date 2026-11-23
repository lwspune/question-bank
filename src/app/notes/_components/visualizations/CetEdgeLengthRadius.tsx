/**
 * Diagram: where the atoms touch in each cubic cell (concept
 * cetss-edge-length-and-radius). Simple cubic: along the edge, a = 2r. bcc:
 * along the body diagonal, √3 a = 4r, drawn on the cut through two opposite
 * edges (a rectangle a by √2 a whose diagonal is the body diagonal). fcc: along
 * the face diagonal, √2 a = 4r. Each panel is drawn to scale for its own
 * relation, so the circles really do touch on the marked line.
 *
 * Numbers: the concept's worked example (bcc, r = 160 pm, a = 369.5 pm =
 * 3.695 × 10⁻⁸ cm) and its self-check (fcc, a = 361 pm, r = 127.6 pm).
 * Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */

export type Lattice = "sc" | "bcc" | "fcc";

/** a in terms of r for each cell. */
export function edgeFromRadius(kind: Lattice, r: number): number {
  if (kind === "sc") return 2 * r;
  if (kind === "bcc") return (4 * r) / Math.sqrt(3);
  return 2 * Math.SQRT2 * r;
}

/** r in terms of a for each cell. */
export function radiusFromEdge(kind: Lattice, a: number): number {
  if (kind === "sc") return a / 2;
  if (kind === "bcc") return (Math.sqrt(3) / 4) * a;
  return a / (2 * Math.SQRT2);
}

/** Length of the line along which the atoms touch, in units of a. */
export const CONTACT_LINE: Record<Lattice, { label: string; factor: number }> = {
  sc: { label: "edge", factor: 1 },
  bcc: { label: "body diagonal", factor: Math.sqrt(3) },
  fcc: { label: "face diagonal", factor: Math.SQRT2 },
};

/** Radii laid end to end on the contact line: 2 in simple cubic, 4 in bcc and fcc. */
export const RADII_ON_LINE: Record<Lattice, number> = { sc: 2, bcc: 4, fcc: 4 };

/** The worked example and the self-check, in pm. */
export const BCC_EXAMPLE = { r: 160 } as const;
export const FCC_SELF_CHECK = { a: 361 } as const;

const r1 = (x: number) => Math.round(x * 10) / 10;

// Drawing (viewBox units). Each panel: the face or cut, its corner circles, the contact line.
type Panel = {
  kind: Lattice;
  x: number; // left of the shape
  y: number; // top of the shape
  w: number;
  h: number;
  r: number;
  centre: boolean;
};

const BOTTOM = 100;
const A_SC = 60;
const A_BCC = 56;
const A_FCC = 70;

export const PANELS: readonly Panel[] = [
  { kind: "sc", x: 55 - A_SC / 2, y: BOTTOM - A_SC, w: A_SC, h: A_SC, r: radiusFromEdge("sc", A_SC), centre: false },
  {
    kind: "bcc",
    x: 160 - (Math.SQRT2 * A_BCC) / 2,
    y: BOTTOM - A_BCC,
    w: Math.SQRT2 * A_BCC,
    h: A_BCC,
    r: radiusFromEdge("bcc", A_BCC),
    centre: true,
  },
  { kind: "fcc", x: 265 - A_FCC / 2, y: BOTTOM - A_FCC, w: A_FCC, h: A_FCC, r: radiusFromEdge("fcc", A_FCC), centre: true },
];

/** Atom centres in a panel: the four corners, plus the centre for bcc and fcc. */
export function panelAtoms(p: Panel): { x: number; y: number }[] {
  const pts = [
    { x: p.x, y: p.y },
    { x: p.x + p.w, y: p.y },
    { x: p.x, y: p.y + p.h },
    { x: p.x + p.w, y: p.y + p.h },
  ];
  if (p.centre) pts.push({ x: p.x + p.w / 2, y: p.y + p.h / 2 });
  return pts;
}

/** The contact line drawn in each panel, from one atom centre to another. */
export function contactLine(p: Panel): { x1: number; y1: number; x2: number; y2: number } {
  if (p.kind === "sc") return { x1: p.x, y1: p.y + p.h, x2: p.x + p.w, y2: p.y + p.h };
  return { x1: p.x, y1: p.y + p.h, x2: p.x + p.w, y2: p.y };
}

const TEXT: Record<Lattice, { name: string; relation: string; solved: string }> = {
  sc: { name: "Simple cubic", relation: "a = 2r", solved: "touch along the edge" },
  bcc: { name: "bcc", relation: "√3 a = 4r", solved: "a = 2.309 r" },
  fcc: { name: "fcc", relation: "√2 a = 4r", solved: "a = 2.828 r" },
};

const SIDE_LABEL: Record<Lattice, { bottom: string; left?: string }> = {
  sc: { bottom: "a" },
  bcc: { bottom: "√2 a", left: "a" },
  fcc: { bottom: "a" },
};

export default function CetEdgeLengthRadius() {
  const aBcc = edgeFromRadius("bcc", BCC_EXAMPLE.r);
  const rFcc = radiusFromEdge("fcc", FCC_SELF_CHECK.a);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · where the atoms touch in each cubic cell
      </p>
      <svg
        viewBox="0 0 320 232"
        className="block h-auto w-full"
        role="img"
        aria-label="Three cells. Simple cubic: atoms touch along the edge, so a equals 2r. Body-centred cubic: the corner and centre atoms touch along the body diagonal, root 3 a equals 4r. Face-centred cubic: corner and face-centre atoms touch along the face diagonal, root 2 a equals 4r. Example: bcc with r 160 pm has a equal to 369.5 pm."
      >
        <defs>
          {PANELS.map((p) => (
            <clipPath key={p.kind} id={`cet-elr-${p.kind}`}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} />
            </clipPath>
          ))}
        </defs>

        {PANELS.map((p) => {
          const line = contactLine(p);
          const t = TEXT[p.kind];
          const side = SIDE_LABEL[p.kind];
          const cx = p.x + p.w / 2;
          return (
            <g key={p.kind}>
              <g clipPath={`url(#cet-elr-${p.kind})`}>
                {panelAtoms(p).map((c, i) => (
                  <circle
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    r={p.r}
                    strokeWidth={1}
                    className="fill-sky-200 stroke-sky-700 dark:fill-sky-900 dark:stroke-sky-300"
                  />
                ))}
              </g>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="none" strokeWidth={1.2} className="stroke-foreground" />
              <line {...line} strokeWidth={2.5} className="stroke-rose-600 dark:stroke-rose-400" />
              {panelAtoms(p).map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r={1.8} className="fill-foreground" />
              ))}
              <text x={cx} y={BOTTOM + 13} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {side.bottom}
              </text>
              {side.left && (
                <text x={p.x - 4} y={p.y + p.h / 2 + 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
                  {side.left}
                </text>
              )}
              <text x={cx} y={134} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                {t.name}
              </text>
              <text x={cx} y={150} textAnchor="middle" className="fill-rose-700 text-[12px] font-semibold dark:fill-rose-300">
                {t.relation}
              </text>
              <text x={cx} y={165} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {t.solved}
              </text>
            </g>
          );
        })}

        {/* The worked example and the self-check */}
        <rect x={8} y={178} width={304} height={50} rx={6} className="fill-background stroke-border" />
        <text x={18} y={194} className="fill-foreground text-[10px]">
          bcc, r = {BCC_EXAMPLE.r} pm: a = 4 × {BCC_EXAMPLE.r} / 1.732 = {r1(aBcc)} pm
        </text>
        <text x={18} y={208} className="fill-foreground text-[10px]">
          = 3.695 × 10⁻⁸ cm, larger than r as it must be
        </text>
        <text x={18} y={222} className="fill-foreground text-[10px]">
          fcc, a = {FCC_SELF_CHECK.a} pm: r = {FCC_SELF_CHECK.a} / 2.828 = {r1(rFcc)} pm
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Red line: the line along which the atoms touch. bcc is drawn on the cut through two opposite edges, whose diagonal is the body diagonal.
      </p>
    </div>
  );
}
