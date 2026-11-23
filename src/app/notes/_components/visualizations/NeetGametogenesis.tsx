/**
 * Static figure: spermatogenesis beside oogenesis, in the words of the NEET
 * concept "Oogenesis and how it differs from spermatogenesis"
 * (nzohr-oogenesis) and its neighbour on spermatogenesis.
 *
 * - Left: a spermatogonium (46), a primary spermatocyte (46), meiosis I gives
 *   two equal secondary spermatocytes (23), meiosis II gives four equal
 *   spermatids (23), and spermiogenesis changes them into four sperms.
 * - Right: an oogonium (46), a primary oocyte (46) arrested in prophase I,
 *   meiosis I gives a large secondary oocyte (23) and a tiny first polar body,
 *   meiosis II gives the ovum (ootid) and a second polar body.
 * - Starts at puberty (male) and in the embryo (female), as the concept's table
 *   says. Nothing the concept does not state (no division of the first polar
 *   body).
 *
 * The data are exported and pinned by tests/notes-w2-17.test.ts.
 * Server component, no client state.
 */

export type Stage = {
  name: string;
  chromosomes: 46 | 23;
  /** Cells of this kind from one primary spermatocyte or oocyte line. */
  cells: number;
  /** The step that makes this stage from the one above it, if it is a division or change. */
  after?: "meiosis I" | "meiosis II" | "spermiogenesis";
  /** The polar body made beside it (oogenesis only). */
  polarBody?: "first polar body" | "second polar body";
};

export const SPERMATOGENESIS: readonly Stage[] = [
  { name: "spermatogonium", chromosomes: 46, cells: 1 },
  { name: "primary spermatocyte", chromosomes: 46, cells: 1 },
  { name: "secondary spermatocyte", chromosomes: 23, cells: 2, after: "meiosis I" },
  { name: "spermatid", chromosomes: 23, cells: 4, after: "meiosis II" },
  { name: "sperm", chromosomes: 23, cells: 4, after: "spermiogenesis" },
];

export const OOGENESIS: readonly Stage[] = [
  { name: "oogonium", chromosomes: 46, cells: 1 },
  { name: "primary oocyte", chromosomes: 46, cells: 1 },
  { name: "secondary oocyte", chromosomes: 23, cells: 1, after: "meiosis I", polarBody: "first polar body" },
  { name: "ovum (ootid)", chromosomes: 23, cells: 1, after: "meiosis II", polarBody: "second polar body" },
];

/** When each one starts (the concept's table). */
export const STARTS = { spermatogenesis: "at puberty", oogenesis: "in the embryo" } as const;

/** Where the primary oocyte waits. */
export const OOCYTE_ARREST = "prophase I";

/** Row heights of the cells, top to bottom. */
export const ROW_Y = [50, 110, 180, 250] as const;

/** Spermatid x positions (also where the sperms are drawn). */
export const SPERMATID_X = [50, 76, 102, 128] as const;

const MALE_X = 88;
const FEMALE_X = 232;
const POLAR_X = 288;

const MALE_CELL = "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400";
const FEMALE_CELL = "fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400";
const POLAR = "fill-rose-200 stroke-rose-500 dark:fill-rose-900 dark:stroke-rose-400";
const NUM = "fill-foreground text-[10px] font-semibold";
const NAME = "fill-foreground text-[10px]";
const SMALL = "fill-muted-foreground text-[10px]";
const ARROW = "stroke-muted-foreground";

function Cell({ x, y, r, n, tone }: { x: number; y: number; r: number; n: number; tone: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} strokeWidth={1.5} className={tone} />
      <text x={x} y={y + 3.5} textAnchor="middle" className={NUM}>
        {n}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.2} markerEnd="url(#gam-arrow)" className={ARROW} />;
}

function Sperm({ x }: { x: number }) {
  return (
    <g>
      <ellipse cx={x} cy={288} rx={4} ry={6} strokeWidth={1.2} className={MALE_CELL} />
      <path
        d={`M ${x} 294 q 3 4 0 8 q -3 4 0 8`}
        fill="none"
        strokeWidth={1.2}
        className="stroke-sky-600 dark:stroke-sky-400"
      />
    </g>
  );
}

export default function NeetGametogenesis() {
  const [r0, r1, r2, r3] = ROW_Y;
  const sm = SPERMATOGENESIS;
  const oo = OOGENESIS;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · spermatogenesis and oogenesis
      </p>
      <svg
        viewBox="0 0 320 332"
        className="block h-auto w-full"
        role="img"
        aria-label="Spermatogenesis on the left: a spermatogonium and a primary spermatocyte with 46 chromosomes, meiosis I gives two equal secondary spermatocytes with 23, meiosis II gives four equal spermatids, which change into four sperms. Oogenesis on the right: an oogonium and a primary oocyte with 46, arrested in prophase I; meiosis I gives a large secondary oocyte with 23 and a tiny first polar body; meiosis II gives the ovum and a second polar body."
      >
        <defs>
          <marker id="gam-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* Titles. */}
        <text x={MALE_X} y={14} textAnchor="middle" className="fill-sky-700 text-[11px] font-bold dark:fill-sky-300">
          Spermatogenesis
        </text>
        <text x={MALE_X} y={27} textAnchor="middle" className={SMALL}>
          starts {STARTS.spermatogenesis}
        </text>
        <text x={240} y={14} textAnchor="middle" className="fill-rose-700 text-[11px] font-bold dark:fill-rose-300">
          Oogenesis
        </text>
        <text x={240} y={27} textAnchor="middle" className={SMALL}>
          starts {STARTS.oogenesis}
        </text>

        {/* The two meiotic divisions, shared by both columns. */}
        <text x={160} y={158} textAnchor="middle" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {sm[2].after}
        </text>
        <text x={160} y={228} textAnchor="middle" className="fill-violet-700 text-[10px] font-semibold dark:fill-violet-300">
          {sm[3].after}
        </text>

        {/* Spermatogenesis. */}
        <Cell x={MALE_X} y={r0} r={11} n={sm[0].chromosomes} tone={MALE_CELL} />
        <text x={MALE_X} y={74} textAnchor="middle" className={NAME}>
          {sm[0].name}
        </text>
        <Arrow x1={MALE_X} y1={79} x2={MALE_X} y2={93} />
        <Cell x={MALE_X} y={r1} r={15} n={sm[1].chromosomes} tone={MALE_CELL} />
        <text x={MALE_X} y={139} textAnchor="middle" className={NAME}>
          {sm[1].name}
        </text>
        <Arrow x1={MALE_X} y1={144} x2={66} y2={165} />
        <Arrow x1={MALE_X} y1={144} x2={110} y2={165} />
        <Cell x={62} y={r2} r={13} n={sm[2].chromosomes} tone={MALE_CELL} />
        <Cell x={114} y={r2} r={13} n={sm[2].chromosomes} tone={MALE_CELL} />
        <text x={MALE_X} y={207} textAnchor="middle" className={NAME}>
          {sm[2].cells} {sm[2].name}s
        </text>
        <Arrow x1={62} y1={212} x2={52} y2={237} />
        <Arrow x1={62} y1={212} x2={74} y2={237} />
        <Arrow x1={114} y1={212} x2={104} y2={237} />
        <Arrow x1={114} y1={212} x2={126} y2={237} />
        {SPERMATID_X.map((x) => (
          <Cell key={x} x={x} y={r3} r={10} n={sm[3].chromosomes} tone={MALE_CELL} />
        ))}
        <text x={MALE_X} y={272} textAnchor="middle" className={NAME}>
          {sm[3].cells} {sm[3].name}s
        </text>
        {SPERMATID_X.map((x) => (
          <Sperm key={x} x={x} />
        ))}
        <text x={MALE_X} y={324} textAnchor="middle" className={NAME}>
          {sm[4].cells} {sm[4].name}s ({sm[4].after})
        </text>

        {/* Oogenesis. */}
        <Cell x={FEMALE_X} y={r0} r={11} n={oo[0].chromosomes} tone={FEMALE_CELL} />
        <text x={FEMALE_X} y={74} textAnchor="middle" className={NAME}>
          {oo[0].name}
        </text>
        <Arrow x1={FEMALE_X} y1={79} x2={FEMALE_X} y2={93} />
        <Cell x={FEMALE_X} y={r1} r={16} n={oo[1].chromosomes} tone={FEMALE_CELL} />
        <text x={254} y={107} className={SMALL}>
          arrested in
        </text>
        <text x={254} y={118} className={SMALL}>
          {OOCYTE_ARREST}
        </text>
        <text x={FEMALE_X} y={139} textAnchor="middle" className={NAME}>
          {oo[1].name}
        </text>
        <Arrow x1={FEMALE_X} y1={144} x2={FEMALE_X} y2={160} />
        <Arrow x1={240} y1={144} x2={282} y2={172} />
        <Cell x={FEMALE_X} y={r2} r={18} n={oo[2].chromosomes} tone={FEMALE_CELL} />
        <circle cx={POLAR_X} cy={178} r={5} strokeWidth={1.2} className={POLAR} />
        <text x={318} y={193} textAnchor="end" className={SMALL}>
          first
        </text>
        <text x={318} y={203} textAnchor="end" className={SMALL}>
          polar body
        </text>
        <text x={FEMALE_X} y={216} textAnchor="middle" className={NAME}>
          {oo[2].name}
        </text>
        <Arrow x1={FEMALE_X} y1={220} x2={FEMALE_X} y2={230} />
        <Arrow x1={240} y1={220} x2={282} y2={244} />
        <Cell x={FEMALE_X} y={r3} r={18} n={oo[3].chromosomes} tone={FEMALE_CELL} />
        <circle cx={POLAR_X} cy={250} r={5} strokeWidth={1.2} className={POLAR} />
        <text x={318} y={266} textAnchor="end" className={SMALL}>
          second
        </text>
        <text x={318} y={276} textAnchor="end" className={SMALL}>
          polar body
        </text>
        <text x={FEMALE_X - 6} y={288} textAnchor="middle" className={NAME}>
          {oo[3].name}
        </text>
        <text x={240} y={324} textAnchor="middle" className={NAME}>
          1 ovum (plus polar bodies)
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Numbers are chromosomes: 46 is diploid, 23 haploid. Both meiotic divisions are equal in the male and unequal in
        the female, and the female&apos;s meiosis II is completed only after a sperm enters.
      </p>
    </div>
  );
}
