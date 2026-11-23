/**
 * Static figure: dehydrohalogenation of 2-bromobutane with alcoholic KOH and
 * the Saytzeff rule (concept cethal-dehydrohalogenation, whose own example it
 * is: "2-Bromobutane → but-2-ene (major), but-1-ene (minor)").
 *
 * Br sits on C2 (the α carbon). The base can take a β-hydrogen from C1 or
 * from C3, and the C=C forms between C2 and that carbon:
 * - H from C3: CH₃–CH=CH–CH₃, but-2-ene, two alkyl groups on C=C: major.
 * - H from C1: CH₂=CH–CH₂–CH₃, but-1-ene, one alkyl group on C=C: minor.
 * Aqueous KOH would substitute instead (butan-2-ol), as the concept warns.
 *
 * `eliminate` and `alkylGroupsOnDoubleBond` work the products out from the
 * chain, so the test checks the labels. Server component. Pinned by
 * tests/notes-cet-visuals-chem-b.test.ts.
 */

/** Carbons of butane, C1 to C4; Br is on C2. */
export const CHAIN_LENGTH = 4;
export const HALOGEN_CARBON = 2;

/** The β carbons: neighbours of the carbon holding Br. */
export function betaCarbons(alpha = HALOGEN_CARBON, n = CHAIN_LENGTH): number[] {
  return [alpha - 1, alpha + 1].filter((c) => c >= 1 && c <= n);
}

/** The alkene formed when the base removes H from `beta`: the C=C runs from the α carbon to it. */
export function eliminate(beta: number, alpha = HALOGEN_CARBON): { from: number; to: number; name: string } {
  const from = Math.min(alpha, beta);
  const to = Math.max(alpha, beta);
  // A four-carbon chain is numbered from the end nearer the double bond.
  const locant = Math.min(from, CHAIN_LENGTH - to + 1);
  return { from, to, name: `but-${locant}-ene` };
}

/** Alkyl groups on the C=C: chain carbons bonded to either alkene carbon, other than each other. */
export function alkylGroupsOnDoubleBond(db: { from: number; to: number }, n = CHAIN_LENGTH): number {
  const neighbours = (c: number) => [c - 1, c + 1].filter((x) => x >= 1 && x <= n);
  return [...neighbours(db.from), ...neighbours(db.to)].filter((x) => x !== db.from && x !== db.to).length;
}

export const PRODUCTS = {
  major: { formula: "CH₃–CH=CH–CH₃", name: "but-2-ene", fromBeta: 3, alkyl: 2 },
  minor: { formula: "CH₂=CH–CH₂–CH₃", name: "but-1-ene", fromBeta: 1, alkyl: 1 },
} as const;

// Geometry (viewBox units).
export const CARBON_X = [70, 130, 190, 250] as const;
const CHAIN_Y = 62;
const LABELS = ["CH₃", "CH", "CH₂", "CH₃"] as const;
const GREEK = ["β", "α", "β", ""] as const;

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const bx = x2 - 8 * Math.cos(a);
  const by = y2 - 8 * Math.sin(a);
  const px = -Math.sin(a) * 3.5;
  const py = Math.cos(a) * 3.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={r1(bx)} y2={r1(by)} strokeWidth={1.5} className="stroke-muted-foreground" />
      <polygon points={`${x2},${y2} ${r1(bx + px)},${r1(by + py)} ${r1(bx - px)},${r1(by - py)}`} className="fill-muted-foreground" />
    </g>
  );
}

function ProductBox({ cx, major }: { cx: number; major: boolean }) {
  const p = major ? PRODUCTS.major : PRODUCTS.minor;
  return (
    <g>
      <rect
        x={cx - 72}
        y={142}
        width={144}
        height={66}
        rx={6}
        strokeWidth={major ? 2 : 1}
        className={
          major
            ? "fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400"
            : "fill-background stroke-border"
        }
      />
      <text x={cx} y={161} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {p.formula}
      </text>
      <text x={cx} y={176} textAnchor="middle" className="fill-foreground text-[11px]">
        {p.name}
      </text>
      <text
        x={cx}
        y={190}
        textAnchor="middle"
        className={`text-[11px] font-semibold ${major ? "fill-emerald-700 dark:fill-emerald-300" : "fill-muted-foreground"}`}
      >
        {major ? "major (Saytzeff)" : "minor"}
      </text>
      <text x={cx} y={203} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {p.alkyl === 1 ? "1 alkyl group on C=C" : `${p.alkyl} alkyl groups on C=C`}
      </text>
    </g>
  );
}

export default function CetSaytzeffElimination() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which alkene is major
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="2-Bromobutane with alcoholic KOH. Removing a β-hydrogen from carbon 3 gives but-2-ene, with two alkyl groups on the double bond, the major product. Removing one from carbon 1 gives but-1-ene, with one alkyl group, the minor product."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          2-bromobutane + alc. KOH
        </text>

        {/* The chain */}
        {CARBON_X.map((x, i) => (
          <g key={x}>
            <text x={x} y={CHAIN_Y + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              {LABELS[i]}
            </text>
            <text x={x} y={CHAIN_Y - 14} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              C{i + 1}
            </text>
            {GREEK[i] && (
              <text
                x={x}
                y={CHAIN_Y - 26}
                textAnchor="middle"
                className={`text-[11px] font-semibold ${GREEK[i] === "β" ? "fill-sky-700 dark:fill-sky-300" : "fill-amber-700 dark:fill-amber-300"}`}
              >
                {GREEK[i]}
              </text>
            )}
            {i < 3 && <line x1={x + 15} y1={CHAIN_Y} x2={CARBON_X[i + 1] - 15} y2={CHAIN_Y} strokeWidth={1.4} className="stroke-foreground" />}
          </g>
        ))}
        <line x1={CARBON_X[1]} y1={CHAIN_Y + 8} x2={CARBON_X[1]} y2={CHAIN_Y + 20} strokeWidth={1.4} className="stroke-foreground" />
        <text x={CARBON_X[1]} y={CHAIN_Y + 32} textAnchor="middle" className="fill-amber-700 text-[12px] font-semibold dark:fill-amber-300">
          Br
        </text>

        {/* The two ways */}
        <Arrow x1={CARBON_X[0] + 2} y1={CHAIN_Y + 12} x2={84} y2={136} />
        <text x={86} y={108} className="fill-sky-700 text-[10px] dark:fill-sky-300">
          H from C1
        </text>
        <Arrow x1={CARBON_X[2] + 4} y1={CHAIN_Y + 12} x2={236} y2={136} />
        <text x={226} y={98} className="fill-sky-700 text-[10px] dark:fill-sky-300">
          H from C3
        </text>
        <text x={160} y={126} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          each way: −HBr
        </text>

        <ProductBox cx={82} major={false} />
        <ProductBox cx={238} major />

        <text x={160} y={228} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Aqueous KOH substitutes instead: butan-2-ol.
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Saytzeff rule: the alkene with more alkyl groups on C=C is more stable, so it is the major product.
      </p>
    </div>
  );
}
