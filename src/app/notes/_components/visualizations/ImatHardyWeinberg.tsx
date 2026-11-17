"use client";

/**
 * Interactive: the Hardy-Weinberg principle of the IMAT concept
 * imat-evo-hardy-weinberg. A slider sets p, the frequency of the dominant
 * allele A (q = 1 - p for the recessive allele a). The square is split p / q
 * along both sides, so its four boxes are p², pq, pq and q², and the stacked
 * bar beside it shows p² (AA), 2pq (Aa) and q² (aa) always filling 1.
 *
 * Opens on the concept's self-check: 16% show the recessive phenotype, so
 * q² = 0.16, q = 0.4, p = 0.6 and 2pq = 0.48. A second button loads the worked
 * example (albinism, 1 in 10,000: q = 0.01, carriers 2pq = 0.0198). Pure maths
 * is exported and pinned by tests/notes-imat-visuals-bioevo.test.ts.
 */
import { useState } from "react";

export type Genotypes = { AA: number; Aa: number; aa: number };

/** p², 2pq and q² for a dominant-allele frequency p. */
export function hwGenotypes(p: number): Genotypes {
  const q = 1 - p;
  return { AA: p * p, Aa: 2 * p * q, aa: q * q };
}

/** From the share showing the recessive phenotype (q²) back to the alleles. */
export function allelesFromRecessiveShare(q2: number): { q: number; p: number } {
  const q = Math.sqrt(q2);
  return { q, p: 1 - q };
}

/** The two examples the concept works through, as the share of aa individuals. */
export const HW_EXAMPLES = {
  selfCheck: { label: "16% show the recessive trait", recessiveShare: 0.16 },
  albinism: { label: "Albinism: 1 in 10,000", recessiveShare: 1 / 10000 },
} as const;

export const P_RANGE = { min: 0, max: 1, step: 0.01 } as const;

/** Round to 4 decimals and drop trailing zeros: 0.36, 0.0198, 0.0001. */
export function fmt(n: number): string {
  return String(Number(n.toFixed(4)));
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const pFor = (share: number) => r2(allelesFromRecessiveShare(share).p);

const SQ = { x: 30, y: 36, side: 150 } as const;
const BAR = { x: 200, y: 36, w: 26, h: 150 } as const;

const TONE = {
  AA: { fill: "fill-sky-500/80 dark:fill-sky-400/80", text: "fill-sky-800 dark:fill-sky-200" },
  Aa: { fill: "fill-violet-500/80 dark:fill-violet-400/80", text: "fill-violet-800 dark:fill-violet-200" },
  aa: { fill: "fill-rose-500/80 dark:fill-rose-400/80", text: "fill-rose-800 dark:fill-rose-200" },
} as const;

export default function ImatHardyWeinberg() {
  const [p, setP] = useState<number>(pFor(HW_EXAMPLES.selfCheck.recessiveShare));
  const q = 1 - p;
  const g = hwGenotypes(p);

  const a = r2(SQ.side * p); // width of the A column / height of the A row
  const b = r2(SQ.side - a);
  const cell = (x: number, y: number, w: number, h: number, tone: keyof typeof TONE, name: string, sym: string) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} className={`${TONE[tone].fill} stroke-background`} strokeWidth={1.5} />
      {w >= 30 && h >= 26 && (
        <>
          <text x={x + w / 2} y={y + h / 2 - 1} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
            {name}
          </text>
          <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" className="fill-foreground text-[10px]">
            {sym}
          </text>
        </>
      )}
    </g>
  );

  const hAA = r2(BAR.h * g.AA);
  const hAa = r2(BAR.h * g.Aa);
  const hAa2 = r2(BAR.h - hAA - hAa);
  const rows: { key: keyof typeof TONE; name: string; sym: string; v: number; y: number }[] = [
    { key: "AA", name: "AA", sym: "p²", v: g.AA, y: 62 },
    { key: "Aa", name: "Aa", sym: "2pq", v: g.Aa, y: 114 },
    { key: "aa", name: "aa", sym: "q²", v: g.aa, y: 166 },
  ];

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · allele and genotype frequencies
      </p>

      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Hardy-Weinberg square with p = ${fmt(p)} and q = ${fmt(q)}: AA is ${fmt(g.AA)}, Aa is ${fmt(g.Aa)}, aa is ${fmt(g.aa)}, and the three add up to 1`}
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          p = {fmt(p)}, q = {fmt(q)}
        </text>

        {/* Allele labels along the top and the left side. */}
        {a >= 16 && (
          <text x={SQ.x + a / 2} y={SQ.y - 6} textAnchor="middle" className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
            A (p)
          </text>
        )}
        {b >= 16 && (
          <text x={SQ.x + a + b / 2} y={SQ.y - 6} textAnchor="middle" className="fill-rose-800 text-[10px] font-semibold dark:fill-rose-200">
            a (q)
          </text>
        )}
        {a >= 12 && (
          <text x={SQ.x - 6} y={SQ.y + a / 2 + 3} textAnchor="end" className="fill-sky-800 text-[10px] font-semibold dark:fill-sky-200">
            A
          </text>
        )}
        {b >= 12 && (
          <text x={SQ.x - 6} y={SQ.y + a + b / 2 + 3} textAnchor="end" className="fill-rose-800 text-[10px] font-semibold dark:fill-rose-200">
            a
          </text>
        )}

        {/* The square: p by p is AA, the two p by q boxes are Aa, q by q is aa. */}
        {cell(SQ.x, SQ.y, a, a, "AA", "AA", "p²")}
        {cell(SQ.x + a, SQ.y, b, a, "Aa", "Aa", "pq")}
        {cell(SQ.x, SQ.y + a, a, b, "Aa", "Aa", "pq")}
        {cell(SQ.x + a, SQ.y + a, b, b, "aa", "aa", "q²")}
        <rect x={SQ.x} y={SQ.y} width={SQ.side} height={SQ.side} fill="none" className="stroke-muted-foreground/60" />

        {/* The three genotypes stacked: always the whole bar, 1. */}
        <rect x={BAR.x} y={BAR.y} width={BAR.w} height={hAA} className={TONE.AA.fill} />
        <rect x={BAR.x} y={r2(BAR.y + hAA)} width={BAR.w} height={hAa} className={TONE.Aa.fill} />
        <rect x={BAR.x} y={r2(BAR.y + hAA + hAa)} width={BAR.w} height={Math.max(0, hAa2)} className={TONE.aa.fill} />
        <rect x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} fill="none" className="stroke-muted-foreground/60" />
        <text x={BAR.x + BAR.w / 2} y={BAR.y - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          total 1
        </text>

        {rows.map((row) => (
          <g key={row.key}>
            <text x={234} y={row.y} className={`${TONE[row.key].text} text-[11px] font-semibold`}>
              {row.name}: {row.sym}
            </text>
            <text x={234} y={row.y + 13} className="fill-foreground text-[11px] tabular-nums">
              = {fmt(row.v)}
            </text>
          </g>
        ))}
      </svg>

      <label className="mt-3 flex flex-col gap-1 text-xs">
        <span className="font-medium text-foreground">
          p (allele A): <span className="tabular-nums">{fmt(p)}</span>, so q (allele a) = <span className="tabular-nums">{fmt(q)}</span>
        </span>
        <input
          type="range"
          min={P_RANGE.min}
          max={P_RANGE.max}
          step={P_RANGE.step}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="accent-sky-600"
          aria-label="p, the frequency of the dominant allele A"
        />
      </label>

      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {Object.values(HW_EXAMPLES).map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => setP(pFor(ex.recessiveShare))}
            className="rounded-md border border-indigo-300 px-2 py-1 text-indigo-800 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:border-indigo-700 dark:text-indigo-200 dark:hover:bg-indigo-900/40"
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-foreground">
          p² + 2pq + q² = <span className="tabular-nums">{fmt(g.AA + g.Aa + g.aa)}</span>
        </span>
        <span className="text-muted-foreground">
          Carriers (Aa): <span className="tabular-nums">{fmt(g.Aa)}</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        It opens on 16% showing the recessive trait: q² = 0.16, so q = 0.4, p = 0.6 and 2pq = 0.48 are carriers. For
        albinism (1 in 10,000), q² = 0.0001, so q = 0.01, p = 0.99 and about 2% (0.0198) are carriers. Start from the
        aa share, which is q², never q.
      </p>
    </div>
  );
}
