"use client";

/**
 * Interactive: a monohybrid Punnett square (IMAT concept imat-gen-monohybrid).
 * Pick each parent's genotype; the square lists one parent's gametes across
 * the top and the other's down the side, and every box is one equally likely
 * child. Below it: the genotype and phenotype ratios, and the expected counts
 * out of 64 offspring.
 *
 * Opens on the concept's worked example: guinea pigs, black fur (B) dominant
 * to white (b), Bb × Bb, 64 offspring: 16 BB, 32 Bb, 16 bb, so 48 black and
 * 16 white. The cross is exported and pinned for every parent pair by
 * tests/notes-imat-visuals-biometab.test.ts.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

export const GENOTYPES = ["BB", "Bb", "bb"] as const;
export type Genotype = (typeof GENOTYPES)[number];

export const EXAMPLE = { p1: "Bb" as Genotype, p2: "Bb" as Genotype, offspring: 64 };

/** The two gametes a parent makes, each with probability 1/2. */
export function gametes(g: Genotype): [string, string] {
  return [g[0], g[1]];
}

/** Dominant allele first: "bB" becomes "Bb". */
export function genotypeOf(a: string, b: string): Genotype {
  return (a === "B" ? a + b : b + a) as Genotype;
}

/** The four boxes: rows = parent 2's gametes, columns = parent 1's. */
export function cross(p1: Genotype, p2: Genotype): Genotype[][] {
  const top = gametes(p1);
  const side = gametes(p2);
  return side.map((s) => top.map((t) => genotypeOf(t, s)));
}

export function phenotypeOf(g: Genotype): "black" | "white" {
  return g.includes("B") ? "black" : "white";
}

/** Counts out of 4 boxes. */
export function tally(p1: Genotype, p2: Genotype) {
  const cells = cross(p1, p2).flat();
  const genotypes = GENOTYPES.map((g) => cells.filter((c) => c === g).length);
  const black = cells.filter((c) => phenotypeOf(c) === "black").length;
  return { genotypes, phenotypes: [black, 4 - black] as [number, number] };
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** "1 BB : 2 Bb : 1 bb", or "all Bb" when only one kind appears. */
export function ratioText(counts: readonly number[], names: readonly string[]): string {
  const present = counts.map((c, i) => ({ c, name: names[i] })).filter((p) => p.c > 0);
  if (present.length === 1) return `all ${present[0].name}`;
  const d = present.reduce((acc, p) => gcd(acc, p.c), 0);
  return present.map((p) => `${p.c / d} ${p.name}`).join(" : ");
}

export function genotypeRatio(p1: Genotype, p2: Genotype): string {
  return ratioText(tally(p1, p2).genotypes, GENOTYPES);
}

export function phenotypeRatio(p1: Genotype, p2: Genotype): string {
  return ratioText(tally(p1, p2).phenotypes, ["black", "white"]);
}

const CELL = 72;
const OX = 104;
const OY = 40;

function ParentPicker({ name, value, onChange }: { name: string; value: Genotype; onChange: (g: Genotype) => void }) {
  return (
    <div role="group" aria-label={`${name} genotype`} className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-foreground">{name}:</span>
      {GENOTYPES.map((g) => (
        <button
          key={g}
          type="button"
          aria-pressed={value === g}
          onClick={() => onChange(g)}
          className={cn(
            "rounded-md border px-3 py-1 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            value === g
              ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-500"
              : "border-border bg-background text-foreground hover:bg-muted",
          )}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

export default function ImatPunnettSquare() {
  const [p1, setP1] = useState<Genotype>(EXAMPLE.p1);
  const [p2, setP2] = useState<Genotype>(EXAMPLE.p2);
  const grid = cross(p1, p2);
  const top = gametes(p1);
  const side = gametes(p2);
  const t = tally(p1, p2);
  const per = EXAMPLE.offspring / 4;

  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Visualization · a Punnett square for one gene
      </p>

      <div className="mb-3 flex flex-col gap-2">
        <ParentPicker name="Parent 1" value={p1} onChange={setP1} />
        <ParentPicker name="Parent 2" value={p2} onChange={setP2} />
      </div>

      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label={`Punnett square for ${p1} × ${p2}: ${genotypeRatio(p1, p2)}, so ${phenotypeRatio(p1, p2)}`}
      >
        <text x={OX + CELL} y={14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Parent 1 ({p1}) gametes
        </text>
        <text x={14} y={OY + CELL} textAnchor="middle" transform={`rotate(-90 14 ${OY + CELL})`} className="fill-muted-foreground text-[10px]">
          Parent 2 ({p2}) gametes
        </text>
        {top.map((g, i) => (
          <text key={`t-${i}`} x={OX + CELL * i + CELL / 2} y={OY - 8} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
            {g}
          </text>
        ))}
        {side.map((g, i) => (
          <text key={`s-${i}`} x={OX - 12} y={OY + CELL * i + CELL / 2 + 4} textAnchor="end" className="fill-foreground text-[12px] font-semibold">
            {g}
          </text>
        ))}
        {grid.map((row, r) =>
          row.map((g, c) => {
            const black = phenotypeOf(g) === "black";
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={OX + CELL * c}
                  y={OY + CELL * r}
                  width={CELL}
                  height={CELL}
                  className={cn(
                    "stroke-border",
                    black ? "fill-slate-700 dark:fill-slate-600" : "fill-white dark:fill-slate-100",
                  )}
                  strokeWidth={1.5}
                />
                <text
                  x={OX + CELL * c + CELL / 2}
                  y={OY + CELL * r + CELL / 2}
                  textAnchor="middle"
                  className={cn("text-[12px] font-bold", black ? "fill-white" : "fill-slate-900")}
                >
                  {g}
                </text>
                <text
                  x={OX + CELL * c + CELL / 2}
                  y={OY + CELL * r + CELL / 2 + 14}
                  textAnchor="middle"
                  className={cn("text-[10px]", black ? "fill-slate-200" : "fill-slate-600")}
                >
                  {phenotypeOf(g)}
                </text>
              </g>
            );
          }),
        )}
      </svg>

      <div className="mt-3 space-y-1 text-sm">
        <p className="font-medium text-foreground">
          Genotypes: <span className="tabular-nums">{genotypeRatio(p1, p2)}</span>
        </p>
        <p className="font-medium text-foreground">
          Phenotypes: <span className="tabular-nums">{phenotypeRatio(p1, p2)}</span>
        </p>
        <p className="text-muted-foreground">
          Out of {EXAMPLE.offspring} offspring:{" "}
          <span className="tabular-nums">
            {t.phenotypes[0] * per} black, {t.phenotypes[1] * per} white
          </span>
        </p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Black fur (B) is dominant to white (b). Each box is one equally likely child, a chance of 1 in 4. The
        ratios are chances for each child, not a promise for a small family.
      </p>
    </div>
  );
}
