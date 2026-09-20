/**
 * Teaching-ARC probe for /notes — reads every chapter IN ORDER and reports
 * forward references: notation used before it is glossed, and vocabulary used
 * before the concept that introduces it.
 *
 * WHY. A chapter's `subtopicOrder` is an ASSERTION that each block rests on the
 * one before. Nothing verified it. notes:lint resolves taxonomy, tags and PYQ
 * ids; notes:latex checks delimiters; typecheck and build check compilation.
 * None of them reads a chapter in order, so a chapter can promise an arc it
 * does not have and stay green through the whole gate chain — which is exactly
 * what MHT-CET Mathematical Logic did until 2026-09-20.
 *
 * TRIAGE, EXITS 0. A hit is a question, not a verdict. Naming a thing before
 * defining it is sometimes the right teaching move ("we will call this a
 * contingency — the next block says why"); the probe's job is to put that
 * decision in front of a human once, at authoring time, rather than let it
 * happen by accident.
 *
 * No DB, no env, no network — pure over the TS editorial modules.
 *
 * Usage:
 *   npm run notes:arc                        # whole corpus, notation class
 *   npm run notes:arc -- mht-cet-maths       # filter by subject route
 *   npm run notes:arc -- mht-cet-maths mathematical-logic
 *   npm run notes:arc -- <route> <chapter> --terms   # + the vocabulary class
 *   npm run notes:arc -- <route> <chapter> --terms --all   # + same-subtopic
 *
 * The NOTATION class is the default because it is precise (12 hits corpus-wide).
 * The TERM class is opt-in: correct, but ~14 findings per chapter, which is a
 * chapter-review tool rather than a standing probe. Both numbers are measured,
 * not estimated — re-measure before changing a threshold.
 *
 * Pure core: src/lib/notes/arcOrder.ts (spec: tests/notes-arc-order.test.ts).
 */
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import { collectArcConcepts, findArcBreaks, type ArcFinding } from "../src/lib/notes/arcOrder";

const args = process.argv.slice(2);
/**
 * By default report only CROSS-subtopic forward references — the chapter ARC.
 * `--all` adds same-subtopic ones, which are far noisier: an author may
 * legitimately foreshadow inside a single block.
 */
const includeSameSubtopic = args.includes("--all");
/**
 * TERM_BEFORE_CONCEPT is OFF by default. It is not wrong — it is not
 * ACTIONABLE: measured over the whole corpus it returns ~1,135 cross-subtopic
 * findings across 82 chapters (~14 each), because a bolded key term genuinely
 * IS a declaration and an earlier mention genuinely IS a forward reference,
 * even when that is pedagogically fine ("**Proteins**" in Biochemistry). A
 * probe nobody reads finds nothing, so the default stays the high-precision
 * NOTATION class (12 corpus-wide) and this is opt-in for a chapter review.
 */
const includeTerms = args.includes("--terms");
const [routeFilter, chapterFilter] = args.filter((a) => !a.startsWith("--"));

type Row = { chapter: string; finding: ArcFinding };

const rows: Row[] = [];
let chaptersScanned = 0;
let conceptsScanned = 0;

for (const c of NOTES_CHAPTERS) {
  if (routeFilter && c.subjectRoute !== routeFilter) continue;
  if (chapterFilter && c.chapterSlug !== chapterFilter) continue;
  chaptersScanned += 1;

  const concepts = collectArcConcepts(c.chapter.subtopicOrder, c.notes, c.chapter.chapterName);
  conceptsScanned += concepts.length;

  for (const finding of findArcBreaks(concepts, c.chapter.chapterName)) {
    if (finding.sameSubtopic && !includeSameSubtopic) continue;
    if (finding.kind === "TERM_BEFORE_CONCEPT" && !includeTerms) continue;
    rows.push({ chapter: `${c.subjectRoute}/${c.chapterSlug}`, finding });
  }
}

const byChapter = new Map<string, ArcFinding[]>();
for (const r of rows) {
  const list = byChapter.get(r.chapter) ?? [];
  list.push(r.finding);
  byChapter.set(r.chapter, list);
}

for (const [chapter, findings] of [...byChapter].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${chapter} — ${findings.length} finding(s)`);
  for (const f of findings) {
    console.log(`  [${f.kind}] "${f.token}"`);
    console.log(`     used in : ${f.at.subtopicSlug} › ${f.at.conceptName}`);
    console.log(`     defined : ${f.introducedAt.subtopicSlug} › ${f.introducedAt.conceptName}`);
    if (f.excerpt) console.log(`     excerpt : ${f.excerpt}`);
  }
}

const notation = rows.filter((r) => r.finding.kind === "NOTATION_BEFORE_GLOSS").length;
const terms = rows.filter((r) => r.finding.kind === "TERM_BEFORE_CONCEPT").length;

console.log(
  `\nnotes-arc: ${chaptersScanned} chapter(s), ${conceptsScanned} concept(s) — ` +
    `${rows.length} finding(s) (${notation} notation, ${terms} term) across ${byChapter.size} chapter(s)`
);
console.log(
  includeTerms ? "" : "(notation class only — add `-- --terms` for the vocabulary class)"
);
console.log(
  includeSameSubtopic
    ? "triage only — includes same-subtopic foreshadowing (noisy); exits 0"
    : "triage only — cross-subtopic arc breaks; `-- --all` adds same-subtopic ones; exits 0"
);
