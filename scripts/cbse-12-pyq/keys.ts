/**
 * Extract CBSE's OFFICIAL Section-A MCQ key from every marking scheme, and
 * report how far it actually reaches.
 *
 *   npx tsx scripts/cbse-12-pyq/keys.ts --subject=chemistry
 *   npx tsx scripts/cbse-12-pyq/keys.ts --subject=physics --write
 *
 * WHY THIS EXISTS. Every other board corpus in this bank (mh-ssc-10, mh-sb-9,
 * mh-hsc-12, cds-gs) ships NO answer key, so every answer there is derived and
 * the end-of-source cross-check gate cannot run at all. CBSE publishes a
 * marking scheme paired 1:1 with each paper, and — uniquely in this project —
 * its Section-A block is machine readable. That makes the MCQ half of these
 * papers the strongest-evidenced content the bank has.
 *
 * ⚠ AND IT IS NOT UNIFORM, which is the whole point of measuring rather than
 * assuming. Some marking schemes' two-column layout collapses in extraction.
 * `parseSectionAKey` fails closed on those, and this script reports them as
 * NO-KEY so they can be read by vision instead. A key that silently covered
 * only some papers would be worse than none, because the gate would look green.
 *
 * ⚠ A PUBLISHED KEY IS EVIDENCE, NOT PROOF. This bank has already found a whole
 * shift-2 key block displaced by +2 in a JEE paper. The key is the primary
 * evidence for Section A and is still diffed against an independent derivation
 * before anything ships.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { SUBJECTS, subjectFromArg, DATA, type SubjectSpec } from "./config";
import { discover, type Paper } from "./papers";
import { parseSectionAKey, patternForYear, PAPER_PATTERNS, type KeyEntry } from "./lib";

/**
 * How many OPTION-ANSWERED questions this paper has, from its measured pattern.
 *
 * ⚠ Keyed on the question KIND, not on the section letter. The 2022 Term-II
 * paper has a Section A of three SUBJECTIVE questions, so counting by section
 * would demand a 3-entry MCQ key from a paper that has no MCQs at all — and
 * then report all 30 of those papers as a key-extraction failure rather than as
 * the "no MCQs" they are.
 */
function expectedSectionA(paper: Paper, subject: SubjectSpec): number {
  const pattern = paper.pattern ?? patternForYear(subject.key, paper.year);
  return PAPER_PATTERNS[pattern]
    .filter((b) => b.kind === "mcq" || b.kind === "assertion_reason")
    .reduce((n, b) => n + (b.to - b.from + 1), 0);
}

/** Pull a marking scheme's text, honouring the page range when it is a merged file. */
function msText(file: string, pages: { from: number; to: number } | null): string {
  const script = `
import fitz, sys, json
d = fitz.open(sys.argv[1])
lo = int(sys.argv[2]); hi = int(sys.argv[3])
if hi < 0: hi = d.page_count - 1
print(json.dumps("".join(d[i].get_text() for i in range(lo, min(hi, d.page_count - 1) + 1))))
`;
  const raw = execFileSync(
    "python",
    ["-c", script, file, String(pages?.from ?? 0), String(pages?.to ?? -1)],
    { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 }
  );
  return JSON.parse(raw) as string;
}

export type KeyResult =
  | { code: string; year: number; ok: true; key: KeyEntry[]; grace: KeyEntry[] }
  | { code: string; year: number; ok: false; reason: string };

export function extractKeys(subject: SubjectSpec): KeyResult[] {
  const { papers } = discover(subject, { readMerged: true });
  const out: KeyResult[] = [];

  for (const p of papers.sort((a, b) => a.year - b.year || a.code.localeCompare(b.code))) {
    if (!p.ms) {
      out.push({ code: p.code, year: p.year, ok: false, reason: "no marking scheme" });
      continue;
    }
    // 2022 is the Term-II paper and has no MCQs at all — not a failure.
    const want = expectedSectionA(p, subject);
    if (want === 0) {
      out.push({ code: p.code, year: p.year, ok: false, reason: "paper has no MCQs (Term-II)" });
      continue;
    }
    try {
      // `want` comes from the paper's own measured pattern and bounds the scan,
      // which matters because several marking schemes lose their "SECTION B"
      // header in extraction and would otherwise run on into Section E.
      const key = parseSectionAKey(msText(p.ms, p.msPages), want);
      if (key.length === 0) {
        out.push({ code: p.code, year: p.year, ok: false, reason: "no Section-A block in text layer" });
      } else {
        out.push({ code: p.code, year: p.year, ok: true, key, grace: key.filter((e) => e.graceNote) });
      }
    } catch (e) {
      out.push({ code: p.code, year: p.year, ok: false, reason: (e as Error).message.split("\n")[0] });
    }
  }
  return out;
}

function main() {
  const argv = process.argv.slice(2);
  const write = argv.includes("--write");
  const all = argv.includes("--all");
  const subjArg = argv.find((a) => a.startsWith("--subject="))?.split("=")[1];
  const subjects = all ? Object.values(SUBJECTS) : [subjectFromArg(subjArg)];

  for (const subject of subjects) {
    const results = extractKeys(subject);
    const ok = results.filter((r): r is Extract<KeyResult, { ok: true }> => r.ok);
    const bad = results.filter((r) => !r.ok);

    console.log(`\n════ ${subject.subjectName} — official Section-A key coverage ════`);
    for (const year of [...new Set(results.map((r) => r.year))].sort()) {
      const y = results.filter((r) => r.year === year);
      const yOk = y.filter((r) => r.ok).length;
      console.log(`  ${year}: ${String(yOk).padStart(2)} of ${String(y.length).padStart(2)} papers keyed`);
    }
    console.log(`\n  TOTAL: ${ok.length} of ${results.length} papers, ${ok.reduce((n, r) => n + r.key.length, 0)} answers`);

    // CBSE's own voided questions — the Board declaring its own paper defective.
    const grace = ok.flatMap((r) => r.grace.map((g) => ({ ...g, code: r.code, year: r.year })));
    if (grace.length) {
      console.log(`\n  ${grace.length} question(s) CBSE ITSELF voided (full marks to all):`);
      for (const g of grace) console.log(`    ${g.year} ${g.code} Q${g.q} — ${g.graceNote}`);
    }

    if (bad.length) {
      const byReason = new Map<string, number>();
      for (const b of bad) if (!b.ok) byReason.set(b.reason, (byReason.get(b.reason) ?? 0) + 1);
      console.log(`\n  ${bad.length} paper(s) WITHOUT a machine-readable key — these need vision:`);
      for (const [reason, n] of [...byReason].sort((a, b) => b[1] - a[1])) {
        console.log(`    ${String(n).padStart(2)} × ${reason}`);
      }
    }

    if (write) {
      if (!existsSync(DATA)) mkdirSync(DATA, { recursive: true });
      const path = join(DATA, `_keys.${subject.key}.json`);
      writeFileSync(path, JSON.stringify(results, null, 2) + "\n", "utf-8");
      console.log(`\n  wrote ${path}`);
    }
  }
}

if (require.main === module) main();
