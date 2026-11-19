/**
 * Static figure: the mature embryo sac, in the NEET concept's own terms
 * (nbosr-embryo-sac).
 *
 * At the micropylar end, the egg apparatus: two synergids, with the filiform
 * apparatus at their micropylar tip, and one egg cell. At the chalazal end,
 * three antipodals. In the middle, the large central cell with its two polar
 * nuclei. So the sac is 8-nucleate and 7-celled, and every cell is haploid.
 *
 * Drawn lying on its side, micropylar end on the left, so that "below the egg
 * apparatus" in the text is not contradicted by an up-down picture. The
 * cell list and positions are exported and pinned by
 * tests/notes-neet-visuals-bio-a.test.ts: 7 cells, 8 nuclei, and the polar
 * nuclei outside the egg apparatus (the concept's trap). Server component, no
 * client state.
 */

/** The embryo sac outline. */
export const SAC = { cx: 160, cy: 112, rx: 118, ry: 50 } as const;

/** The cells of the mature embryo sac (the concept's table). */
export const CELLS = [
  { name: "synergid", count: 2, nucleiEach: 1, end: "micropylar", inEggApparatus: true },
  { name: "egg cell", count: 1, nucleiEach: 1, end: "micropylar", inEggApparatus: true },
  { name: "central cell", count: 1, nucleiEach: 2, end: "middle", inEggApparatus: false },
  { name: "antipodal", count: 3, nucleiEach: 1, end: "chalazal", inEggApparatus: false },
] as const;

export const SYNERGIDS = [
  { x: 70, y: 96 },
  { x: 70, y: 128 },
] as const;
export const SYNERGID_SIZE = { rx: 20, ry: 12 } as const;
export const EGG = { x: 106, y: 112, r: 15 } as const;
export const POLAR_NUCLEI = [
  { x: 152, y: 112 },
  { x: 172, y: 112 },
] as const;
export const ANTIPODALS = [
  { x: 246, y: 92 },
  { x: 246, y: 132 },
  { x: 264, y: 112 },
] as const;
export const ANTIPODAL_R = 11;

/** The dashed box round the egg apparatus. */
export const EGG_APPARATUS_BOX = { x0: 44, x1: 124, y0: 80, y1: 146 } as const;

/** Is a point inside the embryo sac outline? */
export function insideSac(p: { x: number; y: number }): boolean {
  return ((p.x - SAC.cx) / SAC.rx) ** 2 + ((p.y - SAC.cy) / SAC.ry) ** 2 <= 1;
}

export function totals(): { cells: number; nuclei: number } {
  return {
    cells: CELLS.reduce((a, c) => a + c.count, 0),
    nuclei: CELLS.reduce((a, c) => a + c.count * c.nucleiEach, 0),
  };
}

const CELL = "fill-background stroke-pink-600 dark:stroke-pink-400";
const NUCLEUS = "fill-pink-700 dark:fill-pink-300";

export default function NeetEmbryoSac() {
  const t = totals();
  const box = EGG_APPARATUS_BOX;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the mature embryo sac
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="The mature embryo sac on its side: two synergids with the filiform apparatus and one egg cell at the micropylar end, the central cell with two polar nuclei in the middle, and three antipodals at the chalazal end; 7 cells and 8 nuclei"
      >
        {/* The sac: the space not taken by the other six cells is the central cell. */}
        <ellipse
          cx={SAC.cx}
          cy={SAC.cy}
          rx={SAC.rx}
          ry={SAC.ry}
          className="fill-pink-50 stroke-pink-700 dark:fill-pink-950/30 dark:stroke-pink-300"
          strokeWidth={1.8}
        />

        {/* Egg apparatus outline. */}
        <rect
          x={box.x0}
          y={box.y0}
          width={box.x1 - box.x0}
          height={box.y1 - box.y0}
          rx={10}
          fill="none"
          strokeDasharray="4 3"
          className="stroke-muted-foreground"
          strokeWidth={1}
        />

        {/* Synergids, with the filiform apparatus at their micropylar tip. */}
        {SYNERGIDS.map((s) => (
          <g key={`syn-${s.y}`}>
            <ellipse cx={s.x} cy={s.y} rx={SYNERGID_SIZE.rx} ry={SYNERGID_SIZE.ry} className={CELL} strokeWidth={1.3} />
            <circle cx={s.x + 6} cy={s.y} r={3.5} className={NUCLEUS} />
            {[-4, 0, 4].map((dy) => (
              <line
                key={dy}
                x1={s.x - SYNERGID_SIZE.rx + 1}
                y1={s.y + dy}
                x2={s.x - SYNERGID_SIZE.rx + 7}
                y2={s.y + dy}
                className="stroke-pink-800 dark:stroke-pink-200"
                strokeWidth={1.5}
              />
            ))}
          </g>
        ))}

        {/* Egg cell. */}
        <circle cx={EGG.x} cy={EGG.y} r={EGG.r} className={CELL} strokeWidth={1.3} />
        <circle cx={EGG.x + 3} cy={EGG.y} r={5} className={NUCLEUS} />

        {/* Polar nuclei, in the central cell. */}
        {POLAR_NUCLEI.map((p) => (
          <circle key={`pn-${p.x}`} cx={p.x} cy={p.y} r={6} className={NUCLEUS} />
        ))}

        {/* Antipodals. */}
        {ANTIPODALS.map((a) => (
          <g key={`ant-${a.x}-${a.y}`}>
            <circle cx={a.x} cy={a.y} r={ANTIPODAL_R} className={CELL} strokeWidth={1.3} />
            <circle cx={a.x} cy={a.y} r={3.5} className={NUCLEUS} />
          </g>
        ))}

        {/* Labels and leaders. */}
        <g className="stroke-muted-foreground" strokeWidth={1}>
          <line x1={30} y1={26} x2={SYNERGIDS[0].x - SYNERGID_SIZE.rx + 3} y2={SYNERGIDS[0].y - 3} />
          <line x1={74} y1={44} x2={SYNERGIDS[0].x} y2={SYNERGIDS[0].y - SYNERGID_SIZE.ry} />
          <line x1={196} y1={26} x2={200} y2={78} />
          <line x1={280} y1={26} x2={ANTIPODALS[0].x + 4} y2={ANTIPODALS[0].y - ANTIPODAL_R} />
          <line x1={EGG.x} y1={174} x2={EGG.x} y2={EGG.y + EGG.r} />
          <line x1={166} y1={174} x2={POLAR_NUCLEI[0].x + 6} y2={POLAR_NUCLEI[0].y + 6} />
          <line x1={34} y1={192} x2={box.x0 + 6} y2={box.y1} />
        </g>
        <text x={4} y={22} className="fill-foreground text-[10px] font-semibold">
          filiform apparatus
        </text>
        <text x={62} y={40} className="fill-foreground text-[10px] font-semibold">
          2 synergids
        </text>
        <text x={196} y={22} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          central cell
        </text>
        <text x={316} y={22} textAnchor="end" className="fill-foreground text-[10px] font-semibold">
          3 antipodals
        </text>
        <text x={EGG.x} y={186} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          egg cell
        </text>
        <text x={176} y={186} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          2 polar nuclei
        </text>
        <text x={4} y={204} className="fill-foreground text-[10px] font-semibold">
          egg apparatus
        </text>
        <text x={4} y={224} className="fill-muted-foreground text-[10px] font-semibold">
          Micropylar end
        </text>
        <text x={316} y={224} textAnchor="end" className="fill-muted-foreground text-[10px] font-semibold">
          Chalazal end
        </text>
        <text x={160} y={244} textAnchor="middle" className="fill-pink-800 text-[11px] font-bold dark:fill-pink-300">
          {`${t.cells} cells, ${t.nuclei} nuclei, every cell haploid`}
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The two polar nuclei share one cell, the central cell, so the sac has 8 nuclei but 7 cells. The polar nuclei are not
        part of the egg apparatus.
      </p>
    </div>
  );
}
