/**
 * Discover and validate a CBSE Class-12 board-paper inventory, per subject.
 *
 *   npx tsx scripts/cbse-12-pyq/papers.ts --subject=maths
 *   npx tsx scripts/cbse-12-pyq/papers.ts --subject=physics --check
 *   npx tsx scripts/cbse-12-pyq/papers.ts --all
 *
 * Discovery, NOT a hand-written list, because CBSE's filenames are inconsistent
 * across the five years and a hand list would rot the moment a year is re-pulled.
 * What it enforces:
 *   • every PDF either parses to a paper code or is a known (B) VI exclusion;
 *   • byte-identical files collapse to ONE paper (the 2024 Maths ZIP ships three
 *     papers twice under two names each — a name-keyed pass would ingest them
 *     twice and a hash-keyed one will not);
 *   • no two DIFFERENT files claim the same paper code;
 *   • every paper has a marking scheme, since the official key is the whole
 *     reason this ingest can run a cross-check gate at all;
 *   • RECONCILES BOTH WAYS — every PDF on disk is accounted for as paper,
 *     marking scheme, VI exclusion or Hindi translation. A file that matches
 *     none of those is reported rather than silently ignored, because that is
 *     how a paper goes missing without anyone noticing.
 *
 * ⚠ THE HINDI EXCLUSION IS LOAD-BEARING. Chemistry 2025 ships
 * "043 Chemistry -Hindi Medium/" INSIDE the same archive, and those filenames
 * carry the same paper codes as the English ones. Ingesting one would put a
 * translated stem in the bank that can never dedup against the real English
 * paper, since content_hash is stem-derived (the mh-ssc-10 rule). Note the
 * Hindi folder is itself incomplete, so absence there says nothing about the
 * English set.
 *
 * ⚠ MERGED MARKING SCHEMES. Physics 2023 ships ALL FIVE series as 3-in-1 files
 * ("Marking scheme 55-1-1,2,3 meged.pdf", sic). Parsing the name yields only
 * the opener, so without splitMergedMs 10 of that year's 15 papers would appear
 * to have no marking scheme at all.
 */
import { readdirSync, statSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { YEARS, SUBJECTS, subjectFromArg, sourceFile, DATA, type SubjectSpec } from "./config";
import {
  parsePaperCode,
  paperCodeLabel,
  patternForYear,
  hasPattern,
  splitMergedMs,
  codesInMsFilename,
  type PatternName,
  type MsBlock,
} from "./lib";

export type Paper = {
  subject: string;
  year: number;
  code: string; // "65/5/1" | "55/1/1" | "56/7/3"
  /** null when that subject-year's structure has NOT been read off the page yet. */
  pattern: PatternName | null;
  qp: string; // absolute path to the question paper
  ms: string | null; // absolute path to its marking scheme
  /** Set when the marking scheme is a merged multi-paper PDF: the page range to use. */
  msPages: { from: number; to: number } | null;
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

/**
 * Is this path inside a Hindi-medium folder, or a Hindi file?
 *
 * Folder first because that is how CBSE actually separates them; the `_H`
 * filename suffix is a second, weaker signal for archives that do not foldered.
 */
/**
 * Is this a visually-impaired paper — a DELIBERATE exclusion, not a parse miss?
 *
 * Keeping the two apart is the whole reason this reconciliation exists: the
 * unmodified pipeline conflated them and so reported Physics as "0 papers, 90
 * VI excluded" while exiting 0.
 */
export function isViName(path: string, anchors: string[]): boolean {
  const base = path.replace(/^.*[\\/]/, "");
  return anchors.some((a) => new RegExp(`${a}[\\s_\\-(]*B`, "i").test(base));
}

export function isHindi(path: string): boolean {
  const p = path.replace(/\\/g, "/");
  if (/\/[^/]*hindi[^/]*\//i.test(p)) return true;
  const base = p.replace(/^.*\//, "");
  return /[_-]H[_\s-]*\.pdf$/i.test(base) || /_H_+\.pdf$/i.test(base);
}

export type Discovery = {
  papers: Paper[];
  problems: string[];
  excludedVi: number;
  excludedHindi: number;
  /** PDFs on disk that were neither ingested nor deliberately excluded. */
  unaccounted: string[];
  mergedMs: { file: string; blocks: MsBlock[] }[];
};

/**
 * Read the two block-boundary signals off a merged marking scheme.
 *
 * Kept behind a lazy require so `discover()` has no hard dependency on a PDF
 * library for the (common) case of ordinary single-paper marking schemes.
 */
function msPagesOf(file: string, prefix: string): { codes: string[]; firstLine: string; index: number }[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { execFileSync } = require("node:child_process") as typeof import("node:child_process");
  const script = `
import fitz, json, re, sys
d = fitz.open(sys.argv[1]); pre = sys.argv[2]
out = []
for i, pg in enumerate(d):
    t = pg.get_text()
    first = next((l.strip() for l in t.split("\\n") if l.strip()), "")
    out.append({"index": i, "codes": sorted(set(re.findall(pre + r"/\\d/\\d", t))), "firstLine": first})
print(json.dumps(out))
`;
  const raw = execFileSync("python", ["-c", script, file, prefix], {
    encoding: "utf-8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(raw);
}

export function discover(subject: SubjectSpec, opts: { readMerged?: boolean } = {}): Discovery {
  const papers: Paper[] = [];
  const problems: string[] = [];
  const unaccounted: string[] = [];
  const mergedMs: { file: string; blocks: MsBlock[] }[] = [];
  let excludedVi = 0;
  let excludedHindi = 0;
  const prefix = subject.paperPrefix;
  // Physics 2026 names its marking schemes off the SUBJECT code (XII-2-042-1-1.pdf)
  // rather than the paper code, so the subject code is a fallback anchor.
  const anchors = [subject.paperPrefix, subject.cbseCode];

  for (const year of YEARS) {
    const pattern = hasPattern(subject.key, year) ? patternForYear(subject.key, year) : null;

    // ── marking schemes first, keyed by code, so a paper can be paired to one ──
    const msByCode = new Map<string, { file: string; pages: { from: number; to: number } | null }>();
    for (const f of walk(join(subject.sourceRoot, String(year), "ms"))) {
      if (isHindi(f)) {
        excludedHindi++;
        continue;
      }
      const advertised = codesInMsFilename(f, anchors);
      if (advertised.length === 0) {
        if (isViName(f, anchors)) {
          excludedVi++;
        } else {
          unaccounted.push(f);
        }
        continue;
      }

      if (advertised.length === 1) {
        if (!msByCode.has(advertised[0])) msByCode.set(advertised[0], { file: f, pages: null });
        continue;
      }

      // A merged multi-paper marking scheme. Split it, or say why we could not.
      if (!opts.readMerged) {
        // Without reading the PDF we can only honour the opener; the rest would
        // silently look unpaired. Say so rather than pretending.
        problems.push(
          `${year}: ${advertised.length}-in-1 marking scheme not split (re-run with --read-merged): ${f}`
        );
        if (!msByCode.has(advertised[0])) msByCode.set(advertised[0], { file: f, pages: null });
        continue;
      }
      try {
        const blocks = splitMergedMs(msPagesOf(f, prefix), advertised);
        mergedMs.push({ file: f, blocks });
        for (const b of blocks) {
          if (b.shortBy) {
            // CBSE's own merged PDF has lost pages off the end of this marking
            // scheme. The key is still usable but INCOMPLETE, and whoever
            // transcribes this paper has to know before trusting its tail.
            problems.push(
              `${year}: marking scheme ${b.code} is INCOMPLETE — its running header states ` +
                `${b.shortBy} more page(s) than the file contains (source defect, not a parse error). ` +
                `The tail of the official key is missing: ${f}`
            );
          }
          if (!msByCode.has(b.code)) {
            msByCode.set(b.code, { file: f, pages: { from: b.from, to: b.to } });
          }
        }
      } catch (e) {
        problems.push(`${year}: could not split merged marking scheme ${f} — ${(e as Error).message}`);
      }
    }

    // ── question papers ──
    const byHash = new Map<string, string>(); // file hash → first path seen
    const byCode = new Map<string, string>(); // paper code → first path seen
    for (const f of walk(join(subject.sourceRoot, String(year), "qp"))) {
      if (isHindi(f)) {
        excludedHindi++;
        continue;
      }
      const c = parsePaperCode(f, anchors);
      if (!c) {
        // Distinguish a deliberate VI exclusion from a file we simply failed to
        // read. Conflating them is what made the unmodified pipeline report
        // "0 papers, 90 VI excluded" for Physics and exit 0.
        if (isViName(f, anchors)) excludedVi++;
        else unaccounted.push(f);
        continue;
      }
      const h = sha(f);
      if (byHash.has(h)) continue; // byte-identical twin — same paper, two names
      byHash.set(h, f);

      const code = paperCodeLabel(c, prefix);
      const prior = byCode.get(code);
      if (prior) {
        // Two DIFFERENT files claiming one code. Never silently pick one.
        problems.push(`${year}: code ${code} claimed by two different files — ${prior} and ${f}`);
        continue;
      }
      byCode.set(code, f);

      const ms = msByCode.get(code) ?? null;
      if (!ms) problems.push(`${year}: paper ${code} has NO marking scheme`);
      papers.push({
        subject: subject.key,
        year,
        code,
        pattern,
        qp: f,
        ms: ms?.file ?? null,
        msPages: ms?.pages ?? null,
        sourceFile: sourceFile(year, code),
      });
    }

    // A marking scheme with no question paper is just as much a gap.
    for (const code of msByCode.keys()) {
      if (!byCode.has(code)) problems.push(`${year}: marking scheme ${code} has NO question paper`);
    }
  }
  return { papers, problems, excludedVi, excludedHindi, unaccounted, mergedMs };
}

function report(subject: SubjectSpec, readMerged: boolean): number {
  const d = discover(subject, { readMerged });
  console.log(`\n════ ${subject.subjectName} (${subject.cbseCode}) — prefix ${subject.paperPrefix} ════`);

  for (const year of YEARS) {
    const v = d.papers.filter((p) => p.year === year);
    const codes = v.map((p) => p.code.split("/").slice(1).join("/")).sort();
    const pat = v[0]?.pattern ?? "UNMEASURED";
    const withMs = v.filter((p) => p.ms).length;
    console.log(
      `${year} [${String(pat).padEnd(10)}] ${String(v.length).padStart(2)} papers  ms:${String(withMs).padStart(2)}  ${codes.join(" ")}`
    );
  }

  const noMs = d.papers.filter((p) => !p.ms).length;
  const unmeasured = new Set(d.papers.filter((p) => !p.pattern).map((p) => p.year));
  console.log(
    `\ntotal papers: ${d.papers.length} | with marking scheme: ${d.papers.length - noMs}` +
      ` | VI excluded: ${d.excludedVi} | Hindi excluded: ${d.excludedHindi}`
  );
  if (d.mergedMs.length) {
    console.log(`merged marking schemes split: ${d.mergedMs.length}`);
    for (const m of d.mergedMs) {
      console.log(
        `  ${m.file.replace(/^.*[\\/]/, "")} → ${m.blocks.map((b) => `${b.code} p${b.from}-${b.to}`).join(", ")}`
      );
    }
  }
  if (unmeasured.size) {
    console.log(
      `⚠ paper pattern UNMEASURED for ${[...unmeasured].sort().join(", ")} — read those General Instructions before transcribing.`
    );
  }
  if (d.unaccounted.length) {
    console.log(`\n⚠ ${d.unaccounted.length} PDF(s) on disk accounted for as NOTHING:`);
    for (const u of d.unaccounted) console.log(`  - ${u}`);
  }
  if (d.problems.length) {
    console.log(`\n${d.problems.length} PROBLEM(S):`);
    for (const p of d.problems) console.log(`  - ${p}`);
  } else if (!d.unaccounted.length) {
    console.log("no anomalies.");
  }
  return d.problems.length + d.unaccounted.length;
}

/**
 * Write the resolved inventory to `data/_papers.<subject>.json`, for prep.py.
 *
 * ⚠ THIS EXISTS TO KILL A SECOND MATCHER. prep.py used to re-derive each
 * paper's PDF paths with its own filename search, and that search had diverged
 * from this one — silently, because its miss is a non-fatal warning and the
 * paper then renders with NO marking scheme. Measured 2026-09-10: it failed to
 * find the marking scheme for 62 of 78 PHYSICS papers and 6 of 78 Chemistry
 * ones. Two causes, and only the first was known:
 *   • it normalises [_\s] to "-" without collapsing runs, so
 *     "MS_56_2- 1-.pdf" becomes "56-2--1-" and never contains "56-2-1";
 *   • it substring-matches the code, so a MERGED name advertising "55-1-1,2,3"
 *     can never match "55-1-2" — which is most of the Physics corpus.
 * Rather than teach the Python half the same tricks (and let the two drift
 * again), prep.py now READS this file. One matcher, the tested one.
 *
 * It also carries msPages, so a merged marking scheme renders the RIGHT block
 * automatically instead of relying on someone passing --ms-pages by hand.
 */
function emitIndex(subject: SubjectSpec): void {
  // readMerged is forced: without it every follower of a merged scheme resolves
  // to the opener's file with no page range, which is precisely the silent
  // wrong-key hazard the index is meant to remove.
  const d = discover(subject, { readMerged: true });
  const rows = d.papers.map((p) => ({
    year: p.year,
    code: p.code,
    paperId: `${p.year}-${p.code.replace(/\//g, "-")}`,
    qp: p.qp,
    ms: p.ms,
    msPages: p.msPages,
    pattern: p.pattern,
  }));
  if (!existsSync(DATA)) mkdirSync(DATA, { recursive: true });
  const path = join(DATA, `_papers.${subject.key}.json`);
  writeFileSync(path, JSON.stringify(rows, null, 1) + "\n", "utf-8");
  const merged = rows.filter((r) => r.msPages).length;
  console.log(
    `wrote ${path} — ${rows.length} papers, ${rows.filter((r) => r.ms).length} with a marking scheme` +
      ` (${merged} of them a page-range into a merged file)`
  );
}

function main() {
  const argv = process.argv.slice(2);
  const check = argv.includes("--check");
  const readMerged = argv.includes("--read-merged");
  const all = argv.includes("--all");
  const emit = argv.includes("--emit-index");
  const subjArg = argv.find((a) => a.startsWith("--subject="))?.split("=")[1];

  const subjects = all ? Object.values(SUBJECTS) : [subjectFromArg(subjArg)];
  if (emit) {
    for (const s of subjects) emitIndex(s);
    return;
  }
  let bad = 0;
  for (const s of subjects) bad += report(s, readMerged);
  if (check && bad) process.exit(1);
}

if (require.main === module) main();
