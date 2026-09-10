/**
 * Plan a fan-out wave: which papers to dispatch, and what each agent needs told.
 *
 *   npx tsx scripts/cbse-12-pyq/wave.ts --subject=chemistry --openers
 *   npx tsx scripts/cbse-12-pyq/wave.ts --subject=chemistry --followers --year=2023
 *   npx tsx scripts/cbse-12-pyq/wave.ts --subject=physics --openers --prep
 *
 * WHY OPENERS FIRST. A series ships three sets that are RESHUFFLES of largely
 * the same questions — Maths measured followers sharing ~41 of 54 rows with
 * their opener. So the cheap order is: transcribe each series' set 1 in full,
 * then give every follower its opener's JSON to match against. Transcribing all
 * three sets independently does the same work twice and relies on content_hash
 * to clean up afterwards.
 *
 * ⚠ A follower agent must match by CONTENT, never by position. The sets are
 * reshuffled, so block 1 against block 1 can only agree by coincidence — this
 * project has already published a wrong conclusion from a positional sample and
 * had to retract it. An all-pairs content comparison is the cheap fix.
 *
 * ⚠ Transcribing a true duplicate costs NOTHING — content_hash collapses it at
 * commit. Wrongly SKIPPING a question loses it silently. So when a follower
 * agent is unsure whether a question is new, it transcribes it.
 *
 * What this prints per paper, because an agent that is not told cannot know:
 *   • the measured paper pattern (they differ by year AND by subject);
 *   • whether CBSE's Section-A key is machine-readable for that paper, or
 *     whether its marking scheme has to be read by vision;
 *   • the marking-scheme page range, when the file is a merged multi-paper PDF
 *     (Physics ships these in every year 2022-2025; Chemistry never does).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SUBJECTS, subjectFromArg, DATA, type SubjectSpec } from "./config";
import { discover, type Paper } from "./papers";
import { patternForYear, PAPER_PATTERNS } from "./lib";

type KeyResult = { code: string; year: number; ok: boolean; reason?: string; key?: unknown[] };

/** Cached key-extraction results, if `keys.ts --write` has been run. */
function loadKeys(subject: SubjectSpec): Map<string, KeyResult> {
  const path = join(DATA, `_keys.${subject.key}.json`);
  if (!existsSync(path)) return new Map();
  const rows = JSON.parse(readFileSync(path, "utf8")) as KeyResult[];
  return new Map(rows.map((r) => [`${r.year} ${r.code}`, r]));
}

const paperId = (p: Paper) => `${p.year}-${p.code.replace(/\//g, "-")}`;
const setOf = (p: Paper) => p.code.split("/")[2];
const seriesOf = (p: Paper) => p.code.split("/")[1];

/** How many option-answered questions the paper has — 0 means no MCQs at all. */
function mcqCount(p: Paper, subject: SubjectSpec): number {
  const pattern = p.pattern ?? patternForYear(subject.key, p.year);
  return PAPER_PATTERNS[pattern]
    .filter((b) => b.kind === "mcq" || b.kind === "assertion_reason")
    .reduce((n, b) => n + (b.to - b.from + 1), 0);
}

function main() {
  const argv = process.argv.slice(2);
  const subject = subjectFromArg(argv.find((a) => a.startsWith("--subject="))?.split("=")[1]);
  const wantOpeners = argv.includes("--openers");
  const wantFollowers = argv.includes("--followers");
  const yearArg = argv.find((a) => a.startsWith("--year="))?.split("=")[1];
  const withPrep = argv.includes("--prep");
  if (!wantOpeners && !wantFollowers) {
    console.error("pass --openers or --followers (or both)");
    process.exit(2);
  }

  const { papers } = discover(subject, { readMerged: true });
  const keys = loadKeys(subject);
  const done = new Set(
    papers.map(paperId).filter((id) => existsSync(join(DATA, `${id}.questions.json`)))
  );

  const rows = papers
    .filter((p) => (yearArg ? String(p.year) === yearArg : true))
    .filter((p) => (setOf(p) === "1" ? wantOpeners : wantFollowers))
    .sort((a, b) => a.year - b.year || a.code.localeCompare(b.code));

  console.log(`\n════ ${subject.subjectName} — wave plan ════`);
  console.log(
    `${"paperId".padEnd(16)} ${"pattern".padEnd(17)} ${"key".padEnd(18)} ${"ms pages".padEnd(10)} status`
  );

  let todo = 0;
  for (const p of rows) {
    const id = paperId(p);
    const k = keys.get(`${p.year} ${p.code}`);
    const noMcq = mcqCount(p, subject) === 0;
    const keyCol = noMcq
      ? "n/a (no MCQs)"
      : !k
        ? "UNKNOWN (run keys.ts)"
        : k.ok
          ? `official (${k.key?.length ?? "?"})`
          : "VISION NEEDED";
    const ms = p.msPages ? `${p.msPages.from}:${p.msPages.to}` : "whole";
    const status = done.has(id) ? "done" : "TODO";
    if (!done.has(id)) todo++;
    console.log(
      `${id.padEnd(16)} ${String(p.pattern).padEnd(17)} ${keyCol.padEnd(18)} ${ms.padEnd(10)} ${status}`
    );
  }

  console.log(`\n${rows.length} paper(s) in scope | ${todo} TODO | ${rows.length - todo} already transcribed`);

  // Openers must exist before their followers can be matched against them.
  if (wantFollowers) {
    const missing = [
      ...new Set(
        rows
          .filter((p) => !done.has(`${p.year}-${p.code.replace(/\//g, "-")}`))
          .map((p) => `${p.year}-${subject.paperPrefix}-${seriesOf(p)}-1`)
          .filter((openerId) => !done.has(openerId))
      ),
    ];
    if (missing.length) {
      console.log(
        `\n⚠ ${missing.length} follower(s) have NO transcribed opener to match against:\n   ` +
          missing.join(", ") +
          `\n   Run the openers wave first, or those agents have nothing to compare to and will\n` +
          `   transcribe from scratch (correct, just twice the work).`
      );
    }
  }

  if (withPrep) {
    console.log(`\n── render commands (run → transcribe → DELETE out/<id> to keep disk flat) ──`);
    // The page range of a merged marking scheme is NOT passed on the command
    // line any more: prep.py reads it from the index emitted below, which is
    // the same discovery this planner uses. Printing it here as well would be a
    // second copy of the truth, free to disagree with the first.
    console.log(`npx tsx scripts/cbse-12-pyq/papers.ts --subject=${subject.key} --emit-index`);
    for (const p of rows) {
      if (done.has(paperId(p))) continue;
      console.log(
        `python scripts/cbse-12-pyq/prep.py ${p.year} ${p.code.replace(/\//g, "-")} --subject=${subject.key}`
      );
    }
  }
}

if (require.main === module) main();
