/**
 * Render the taxonomy the map WOULD create, with live counts from data/build.
 *
 *   npx tsx scripts/ipmat/taxonomy-report.ts
 *   npx tsx scripts/ipmat/taxonomy-report.ts -- --exam=jipmat
 *   npx tsx scripts/ipmat/taxonomy-report.ts -- --thin
 *
 * Read-only, exits 0. This is the artifact Phase 2 is reviewed from: the
 * taxonomy is authored as data in taxonomy.ts, and nothing reaches the database
 * until this shape is approved.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { IPMAT_EXAMS, type IpmatExamSlug } from "./config";
import { SECTION_SUBJECTS, resolveTaxonomy, sourceKey, TAXONOMY_MAP } from "./taxonomy";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");
/** A subtopic under this many questions is worth a second look, not an error. */
const THIN = 3;

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

function main() {
  const only = arg("exam") as IpmatExamSlug | undefined;
  const thinOnly = process.argv.includes("--thin");

  const rows: BuiltQuestion[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    rows.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]));
  }

  // Only rows that would actually be committed shape the taxonomy.
  const live = rows.filter((r) => !r.reconstructed && !r.dropped && !r.problems.length);

  type Node = Map<string, Map<string, Map<string, number>>>; // subject > chapter > subtopic > n
  const tree = new Map<IpmatExamSlug, Node>();
  let unresolved = 0;

  for (const r of live) {
    if (only && r.exam !== only) continue;
    const res = resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic);
    if (!res) {
      unresolved++;
      continue;
    }
    const byExam = tree.get(r.exam) ?? tree.set(r.exam, new Map()).get(r.exam)!;
    const bySub = byExam.get(res.subject) ?? byExam.set(res.subject, new Map()).get(res.subject)!;
    const byChap = bySub.get(res.chapter) ?? bySub.set(res.chapter, new Map()).get(res.chapter)!;
    byChap.set(res.subtopic, (byChap.get(res.subtopic) ?? 0) + 1);
  }

  const thin: string[] = [];

  for (const exam of IPMAT_EXAMS) {
    if (only && exam.slug !== only) continue;
    const node = tree.get(exam.slug);
    if (!node) continue;
    const total = [...node.values()].flatMap((s) => [...s.values()]).flatMap((c) => [...c.values()]).reduce((a, b) => a + b, 0);
    console.log("");
    console.log("=".repeat(78));
    console.log(`${exam.displayName}  (${exam.examName})  —  ${total} questions`);
    console.log("=".repeat(78));

    for (const [subject, chapters] of [...node].sort()) {
      const sTotal = [...chapters.values()].flatMap((c) => [...c.values()]).reduce((a, b) => a + b, 0);
      console.log(`\n  ${subject}  [${sTotal}]`);
      for (const [chapter, subs] of [...chapters].sort((a, b) => a[0].localeCompare(b[0]))) {
        const cTotal = [...subs.values()].reduce((a, b) => a + b, 0);
        console.log(`    ${chapter}  (${cTotal})`);
        if (thinOnly) continue;
        for (const [sub, n] of [...subs].sort((a, b) => b[1] - a[1])) {
          console.log(`       - ${sub}  ${n}`);
          if (n < THIN) thin.push(`${exam.slug} / ${subject} / ${chapter} / ${sub} (${n})`);
        }
      }
    }
  }

  // ------------------------------------------------------------------ totals
  console.log("");
  console.log("=".repeat(78));
  console.log("SHAPE");
  console.log("=".repeat(78));
  const subjects = new Set<string>();
  const chapters = new Set<string>();
  const subtopics = new Set<string>();
  for (const [exam, node] of tree) {
    for (const [subject, chaps] of node) {
      subjects.add(`${exam}|${subject}`);
      for (const [chapter, subs] of chaps) {
        chapters.add(`${exam}|${subject}|${chapter}`);
        for (const sub of subs.keys()) subtopics.add(`${exam}|${subject}|${chapter}|${sub}`);
      }
    }
  }
  console.log(`  subject rows (exam-scoped)   ${subjects.size}`);
  console.log(`  chapter rows (subject-scoped) ${chapters.size}`);
  console.log(`  subtopic rows                ${subtopics.size}`);
  console.log(`  distinct chapter NAMES        ${new Set([...chapters].map((c) => c.split("|")[2])).size}`);
  console.log(`  source pairs mapped           ${Object.keys(TAXONOMY_MAP).length}`);
  console.log(`  rows placed                   ${live.filter((r) => !only || r.exam === only).length - unresolved}`);
  if (unresolved) console.log(`  UNRESOLVED ROWS               ${unresolved}  <-- must be 0`);

  // Indore's cost, stated rather than hidden.
  const ind = tree.get("ipmat-indore");
  if (ind) {
    const sa = ind.get(SECTION_SUBJECTS["ipmat-indore"].SA);
    const mcq = ind.get(SECTION_SUBJECTS["ipmat-indore"].MCQ);
    if (sa && mcq) {
      const shared = [...sa.keys()].filter((c) => mcq.has(c)).sort();
      console.log("");
      console.log(`  INDORE: ${shared.length} chapters exist under BOTH quant subjects, because the`);
      console.log("  paper's SA and MCQ sections cover the same topics at different answer formats:");
      for (const c of shared) {
        const a = [...sa.get(c)!.values()].reduce((x, y) => x + y, 0);
        const b = [...mcq.get(c)!.values()].reduce((x, y) => x + y, 0);
        console.log(`    ${c.padEnd(34)} SA ${String(a).padStart(3)} | MCQ ${String(b).padStart(3)}`);
      }
    }
  }

  if (thin.length && !thinOnly) {
    console.log(`\n  SUBTOPICS UNDER ${THIN} QUESTIONS (${thin.length}) — fine for a PYQ corpus, listed for review:`);
    for (const x of thin.slice(0, 30)) console.log(`    ${x}`);
    if (thin.length > 30) console.log(`    ...and ${thin.length - 30} more`);
  }
}

main();
