"use client";

/**
 * Animation: counting the particles in the three cubic unit cells (concept
 * cetss-particles-per-cell-and-coordination). A corner particle is shared by
 * 8 cells (it counts 1/8), a face particle by 2 (1/2), a body-centre particle
 * by none (1). So simple cubic holds 8 × 1/8 = 1, bcc 8 × 1/8 + 1 = 2 and fcc
 * 8 × 1/8 + 6 × 1/2 = 4, with coordination numbers 6, 8 and 12.
 *
 * The three cubes are drawn side by side in an oblique projection; each step
 * lights one of them (a highlight frame slides under it), and the last step
 * shows all three together. Pinned by tests/notes-cet-visuals-chem-a.test.ts.
 */
import StepFigure, { MOTION, svgTransform, type FigureStep } from "./StepFigure";

export type CellKind = "sc" | "bcc" | "fcc";
export type Site = "corner" | "face" | "body";
export type Point3 = { x: number; y: number; z: number };

export const CELL_KINDS: readonly CellKind[] = ["sc", "bcc", "fcc"];

/** How much of a particle at each site belongs to one cell. */
export const SHARE: Record<Site, number> = { corner: 1 / 8, face: 1 / 2, body: 1 };

/** Coordination number (nearest neighbours) in each cell. */
export const COORDINATION: Record<CellKind, number> = { sc: 6, bcc: 8, fcc: 12 };

export const CELL_NAME: Record<CellKind, string> = {
  sc: "Simple cubic",
  bcc: "Body-centred",
  fcc: "Face-centred",
};

/** The sum written under each cube, in two lines. */
export const CELL_SUM: Record<CellKind, readonly [string, string]> = {
  sc: ["8 × ⅛", "= 1 atom"],
  bcc: ["8 × ⅛ + 1", "= 2 atoms"],
  fcc: ["8 × ⅛ + 6 × ½", "= 4 atoms"],
};

const CORNERS: Point3[] = [0, 1].flatMap((x) => [0, 1].flatMap((y) => [0, 1].map((z) => ({ x, y, z }))));
const FACES: Point3[] = [
  { x: 0.5, y: 0.5, z: 0 },
  { x: 0.5, y: 0.5, z: 1 },
  { x: 0.5, y: 0, z: 0.5 },
  { x: 0.5, y: 1, z: 0.5 },
  { x: 0, y: 0.5, z: 0.5 },
  { x: 1, y: 0.5, z: 0.5 },
];

/** Every particle drawn in a cell, with the site it sits on. */
export function cellAtoms(kind: CellKind): { p: Point3; site: Site }[] {
  const atoms = CORNERS.map((p) => ({ p, site: "corner" as Site }));
  if (kind === "bcc") atoms.push({ p: { x: 0.5, y: 0.5, z: 0.5 }, site: "body" });
  if (kind === "fcc") for (const p of FACES) atoms.push({ p, site: "face" });
  return atoms;
}

/** Particles that belong to one cell: the sum of the sharing fractions. */
export function atomsPerCell(kind: CellKind): number {
  return cellAtoms(kind).reduce((n, a) => n + SHARE[a.site], 0);
}

export const COUNT_STEPS: readonly FigureStep[] = [
  {
    title: "Simple cubic",
    caption:
      "Particles sit only at the 8 corners, and each corner is shared by 8 cells: 8 × 1/8 = 1 particle per cell. Each particle has 6 nearest neighbours.",
  },
  {
    title: "Body-centred cubic",
    caption:
      "Add one particle at the body centre, which belongs wholly to this cell: 8 × 1/8 + 1 = 2. The centre particle touches the 8 corners: coordination number 8.",
  },
  {
    title: "Face-centred cubic",
    caption:
      "Add one particle at the centre of each of the 6 faces, each shared by 2 cells: 8 × 1/8 + 6 × 1/2 = 4. Coordination number 12, as in hcp.",
  },
  {
    title: "The three cells",
    caption:
      "Corner 1/8, face 1/2, body centre 1. Simple cubic, bcc and fcc hold 1, 2 and 4 particles, with coordination numbers 6, 8 and 12. Eight corners count as ONE particle, not 8.",
  },
];

/** True when a cube is drawn at full strength in a step. */
export function cellLit(step: number, kind: CellKind): boolean {
  return step >= CELL_KINDS.length || CELL_KINDS[step] === kind;
}

// Geometry (viewBox units).
const E = 54; // cube edge
const DX = 22; // depth offset, right
const DY = 16; // depth offset, up
const BASE_Y = 114; // screen y of the front bottom edge
export const CELL_X: Record<CellKind, number> = { sc: 14, bcc: 120, fcc: 226 };

/** Oblique projection of a point of the unit cube (x right, y up, z back). */
export function project(p: Point3, ox: number): { x: number; y: number } {
  return { x: ox + p.x * E + p.z * DX, y: BASE_Y - p.y * E - p.z * DY };
}

const EDGES: [Point3, Point3][] = CORNERS.flatMap((a) =>
  CORNERS.filter((b) => (b.x - a.x) + (b.y - a.y) + (b.z - a.z) === 1 && (b.x >= a.x && b.y >= a.y && b.z >= a.z)).map(
    (b) => [a, b] as [Point3, Point3],
  ),
);
/** The back-bottom-left corner is hidden; its three edges are dashed. */
const hidden = (p: Point3) => p.x === 0 && p.y === 0 && p.z === 1;

const SITE_R: Record<Site, number> = { corner: 5, face: 4.5, body: 6 };
const SITE_CLASS: Record<Site, string> = {
  corner: "fill-sky-500 stroke-sky-800 dark:fill-sky-400 dark:stroke-sky-200",
  face: "fill-amber-400 stroke-amber-800 dark:fill-amber-300 dark:stroke-amber-100",
  body: "fill-rose-500 stroke-rose-800 dark:fill-rose-400 dark:stroke-rose-100",
};

function Cube({ kind }: { kind: CellKind }) {
  const ox = CELL_X[kind];
  const atoms = [...cellAtoms(kind)].sort((a, b) => b.p.z - a.p.z);
  const cx = ox + (E + DX) / 2;
  const [sum1, sum2] = CELL_SUM[kind];
  return (
    <g>
      {EDGES.map(([a, b], i) => {
        const pa = project(a, ox);
        const pb = project(b, ox);
        return (
          <line
            key={i}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            strokeWidth={1.2}
            strokeDasharray={hidden(a) || hidden(b) ? "3 3" : undefined}
            className="stroke-muted-foreground"
          />
        );
      })}
      {atoms.map((a, i) => {
        const s = project(a.p, ox);
        return <circle key={i} cx={s.x} cy={s.y} r={SITE_R[a.site]} strokeWidth={0.8} className={SITE_CLASS[a.site]} />;
      })}
      <text x={cx} y={136} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
        {CELL_NAME[kind]}
      </text>
      <text x={cx} y={152} textAnchor="middle" className="fill-foreground text-[10px]">
        {sum1}
      </text>
      <text x={cx} y={165} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {sum2}
      </text>
      <text x={cx} y={182} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        CN = {COORDINATION[kind]}
      </text>
    </g>
  );
}

const HIGHLIGHT_W = 102;

export default function CetUnitCellCounting() {
  return (
    <StepFigure
      title="Animation · counting particles in a cubic unit cell"
      label="Three cubic unit cells side by side. Simple cubic has particles at the 8 corners only, 8 times one eighth, so 1 particle, coordination number 6. Body-centred cubic adds one at the centre, 2 particles, coordination number 8. Face-centred cubic adds one on each of the 6 faces, each shared by 2 cells, so 4 particles, coordination number 12."
      viewBox="0 0 320 194"
      steps={COUNT_STEPS}
      note="CN: coordination number, the nearest neighbours of one particle. A particle on an edge (not drawn here) would count 1/4."
    >
      {(step) => {
        const active = CELL_KINDS[Math.min(step, CELL_KINDS.length - 1)];
        const frameX = CELL_X[active] + (E + DX) / 2 - HIGHLIGHT_W / 2;
        return (
          <g>
            {/* Sliding highlight under the cube of this step; gone on the overview */}
            <g className={MOTION} style={{ transform: svgTransform({ x: frameX, y: 0 }), opacity: step < CELL_KINDS.length ? 1 : 0 }}>
              <rect x={0} y={26} width={HIGHLIGHT_W} height={164} rx={8} className="fill-indigo-100/70 stroke-indigo-300 dark:fill-indigo-900/30 dark:stroke-indigo-700" />
            </g>

            {/* Key: what each site counts */}
            <circle cx={22} cy={12} r={5} className={SITE_CLASS.corner} strokeWidth={0.8} />
            <text x={31} y={16} className="fill-foreground text-[10px]">
              corner ⅛
            </text>
            <circle cx={112} cy={12} r={4.5} className={SITE_CLASS.face} strokeWidth={0.8} />
            <text x={121} y={16} className="fill-foreground text-[10px]">
              face centre ½
            </text>
            <circle cx={212} cy={12} r={6} className={SITE_CLASS.body} strokeWidth={0.8} />
            <text x={222} y={16} className="fill-foreground text-[10px]">
              body centre 1
            </text>

            {CELL_KINDS.map((kind) => (
              <g key={kind} className={MOTION} style={{ opacity: cellLit(step, kind) ? 1 : 0.25 }}>
                <Cube kind={kind} />
              </g>
            ))}
          </g>
        );
      }}
    </StepFigure>
  );
}
