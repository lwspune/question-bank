/**
 * IMAT originality check: are our questions our own? Compares them with all
 * 1,000 transcribed past questions (2011-2026) through the pure core in
 * src/lib/sites/imat/originality.ts, which documents each signal and what it
 * deliberately ignores.
 *
 *   npx tsx scripts/imat/originality.ts                 every IMAT notes chapter
 *   npx tsx scripts/imat/originality.ts --file=<json>   a file of new questions:
 *                                                       [{ id, text, options? }]
 *   npx tsx scripts/imat/originality.ts --past          the ministry papers (2023+)
 *                                                       against Cambridge's (2011-2022)
 *
 * A finding a person has looked at and cleared is recorded, with the reason,
 * in scripts/imat/originality-reviews.json, tied to the question's exact
 * wording; only UNREVIEWED findings are printed (`--all` prints every one).
 * To clear one, add an entry: candidate, source, wording (the key printed
 * beside the question) and a one-line reason.
 *
 * Exits 1 when our questions have an unreviewed finding. `--past` is a report and exits 0:
 * it lists ministry questions that repeat a Cambridge one, which matters for
 * publishing those papers, not for anything we wrote. Read-only.
 */
import { readFileSync } from "node:fs";
import {
  buildOriginalityIndex,
  checkOriginality,
  notesCandidates,
  unreviewed,
  wordingKey,
  type OriginalityCandidate,
  type OriginalityFinding,
} from "../../src/lib/sites/imat/originality";
import { IMAT_NOTES_CHAPTERS } from "../../src/lib/sites/imat/notes/registry";
import { FIRST_MINISTRY_YEAR, loadPastQuestions, loadReviews } from "./notes/bank";

function print(findings: OriginalityFinding[], candidates: OriginalityCandidate[] = []) {
  const keys = new Map(candidates.map((c) => [c.id, wordingKey(c)]));
  const byCandidate = new Map<string, OriginalityFinding[]>();
  for (const f of findings) byCandidate.set(f.candidateId, [...(byCandidate.get(f.candidateId) ?? []), f]);
  for (const [id, fs] of byCandidate) {
    console.log(`\n${id}${keys.has(id) ? `  (wording ${keys.get(id)})` : ""}`);
    for (const f of fs) console.log(`  ${f.kind.padEnd(12)} ${f.sourceId.padEnd(9)} ${f.detail}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const past = loadPastQuestions();
  const year = (id: string) => Number(id.slice(0, 4));

  if (args.includes("--past")) {
    // The full index, so "common" means the same as in the main run.
    const idx = buildOriginalityIndex(past);
    const ministry = past.filter((s) => year(s.id) >= FIRST_MINISTRY_YEAR);
    const cambridge = past.filter((s) => year(s.id) < FIRST_MINISTRY_YEAR);
    // Both directions: word overlap is a share of the CANDIDATE's words, so a
    // ministry rewrite that ADDS material (2023 Q7 adds a third requirement to
    // Cambridge 2016 Q8) only shows when the Cambridge question is the candidate.
    const findings = [
      ...ministry.flatMap((q) => checkOriginality(idx, q)).filter((f) => year(f.sourceId) < FIRST_MINISTRY_YEAR),
      ...cambridge
        .flatMap((q) => checkOriginality(idx, q))
        .filter((f) => year(f.sourceId) >= FIRST_MINISTRY_YEAR)
        .map((f) => ({ ...f, candidateId: f.sourceId, sourceId: f.candidateId })),
    ];
    print(findings);
    console.log(
      `\n${new Set(findings.map((f) => f.candidateId)).size} of ${ministry.length} ministry questions resemble a Cambridge question.`
    );
    return;
  }

  const file = args.find((a) => a.startsWith("--file="))?.slice("--file=".length);
  const candidates: OriginalityCandidate[] = file
    ? (JSON.parse(readFileSync(file, "utf8")) as OriginalityCandidate[])
    : IMAT_NOTES_CHAPTERS.flatMap((c) => notesCandidates(c.chapterSlug, c.notes));

  const idx = buildOriginalityIndex(past);
  const all = candidates.flatMap((c) => checkOriginality(idx, c));
  const open = unreviewed(all, candidates, loadReviews());
  print(args.includes("--all") ? all : open, candidates);
  const hit = new Set(open.map((f) => f.candidateId)).size;
  const reviewed = new Set(all.map((f) => f.candidateId)).size - hit;
  console.log(
    `\n${hit} of ${candidates.length} questions have an unreviewed finding; ${reviewed} more were reviewed (${file ?? "IMAT notes"}).`
  );
  if (hit) process.exit(1);
}

main();
