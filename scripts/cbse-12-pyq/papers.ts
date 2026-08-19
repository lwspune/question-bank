/**
 * Discover and validate the CBSE Class-12 Maths board-paper inventory.
 *
 *   npx tsx scripts/cbse-12-pyq/papers.ts            # print the registry
 *   npx tsx scripts/cbse-12-pyq/papers.ts --check    # exit 1 on any anomaly
 *
 * Discovery, NOT a hand-written list, because CBSE's filenames are inconsistent
 * across the five years and a hand list would rot the moment a year is re-pulled.
 * What it enforces:
 *   • every PDF either parses to a paper code or is a known 65(B) VI exclusion;
 *   • byte-identical files collapse to ONE paper (the 2024 ZIP ships three
 *     papers twice under two names each — a name-keyed pass would ingest them
 *     twice and a hash-keyed one will not);
 *   • no two DIFFERENT files claim the same paper code;
 *   • every paper has a marking scheme, since the official key is the whole
 *     reason this ingest can run a cross-check gate at all.
 */
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { SOURCE_ROOT, YEARS, sourceFile } from "./config";
import { parsePaperCode, paperCodeLabel, patternForYear, type PatternName } from "./lib";

export type Paper = {
  year: number;
  code: string; // "65/5/1"
  pattern: PatternName;
  qp: string; // absolute path to the question paper
  ms: string | null; // absolute path to its marking scheme
  sourceFile: string;
};

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.toLowerCase().endsWith(".pdf") ? [p] : [];
  });
}

const sha = (p: string) => createHash("sha256").update(readFileSync(p)).digest("hex");

export type Discovery = { papers: Paper[]; problems: string[]; excludedVi: number };

export function discover(): Discovery {
  const papers: Paper[] = [];
  const problems: string[] = [];
  let excludedVi = 0;

  for (const year of YEARS) {
    const pattern = patternForYear(year);

    // Marking schemes first, keyed by code, so a paper can be paired to one.
    const msByCode = new Map<string, string>();
    for (const f of walk(join(SOURCE_ROOT, String(year), "ms"))) {
      const c = parsePaperCode(f);
      if (!c) continue;
      const code = paperCodeLabel(c);
      if (!msByCode.has(code)) msByCode.set(code, f);
    }

    const byHash = new Map<string, string>(); // file hash → first path seen
    const byCode = new Map<string, string>(); // paper code → first path seen
    for (const f of walk(join(SOURCE_ROOT, String(year), "qp"))) {
      const c = parsePaperCode(f);
      if (!c) {
        excludedVi++;
        continue;
      }
      const h = sha(f);
      if (byHash.has(h)) continue; // byte-identical twin — same paper, two names
      byHash.set(h, f);

      const code = paperCodeLabel(c);
      const prior = byCode.get(code);
      if (prior) {
        // Two DIFFERENT files claiming one code. Never silently pick one.
        problems.push(
          `${year}: code ${code} claimed by two different files — ${prior} and ${f}`
        );
        continue;
      }
      byCode.set(code, f);

      const ms = msByCode.get(code) ?? null;
      if (!ms) problems.push(`${year}: paper ${code} has NO marking scheme`);
      papers.push({ year, code, pattern, qp: f, ms, sourceFile: sourceFile(year, code) });
    }
  }
  return { papers, problems, excludedVi };
}

function main() {
  const check = process.argv.includes("--check");
  const { papers, problems, excludedVi } = discover();

  for (const year of YEARS) {
    const v = papers.filter((p) => p.year === year);
    const codes = v.map((p) => p.code).sort();
    console.log(`${year} [${v[0]?.pattern ?? "-"}] ${String(v.length).padStart(2)} papers  ${codes.join(" ")}`);
  }
  const noMs = papers.filter((p) => !p.ms).length;
  console.log(
    `\ntotal papers: ${papers.length} | with marking scheme: ${papers.length - noMs} | 65(B) VI excluded: ${excludedVi}`
  );

  if (problems.length) {
    console.log(`\n${problems.length} PROBLEM(S):`);
    for (const p of problems) console.log(`  - ${p}`);
  } else {
    console.log("no anomalies.");
  }
  if (check && problems.length) process.exit(1);
}

if (require.main === module) main();
