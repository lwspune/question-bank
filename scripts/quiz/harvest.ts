/**
 * Harvest /notes chapters into quiz atoms (candidate Level-1 recall MCQs) and
 * write them to scripts/quiz/atoms/<subjectRoute>__<chapterSlug>.json.
 *
 * Run:  npm run quiz:harvest                       # default sample chapters
 *       npm run quiz:harvest nda-maths/probability nda-biology/human-physiology
 *
 * Pure shaping lives in atoms.ts (unit-tested); this is just the NOTES_CHAPTERS
 * walk + file I/O. The JSON is a review artifact + the future `quiz_atoms` seed —
 * eyeball it, finalize needs_review distractors, then assemble daily quizzes.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { NOTES_CHAPTERS } from "../../src/lib/notes/chapters";
import { harvestConcept, type HarvestCtx, type QuizAtom } from "./atoms";

const DEFAULT_CHAPTERS = [
  "nda-maths/probability", // semi: practiceSet-heavy
  "nda-biology/human-physiology", // auto: reference-table-heavy
  "nda-maths/statistics", // mixed: formula + practiceSet
];

function harvestChapter(reg: (typeof NOTES_CHAPTERS)[number]): QuizAtom[] {
  // Chapter-wide formula pool — formula distractors come from OTHER concepts.
  const chapterFormulas: { slug: string; label: string; latex: string }[] = [];
  for (const slug of reg.slugs) {
    for (const c of reg.notes[slug].concepts) {
      if (c.kind === "formula" && c.formula) {
        chapterFormulas.push({ slug: c.slug, label: c.formula.label, latex: c.formula.latex });
      }
    }
  }

  const atoms: QuizAtom[] = [];
  for (const subtopicSlug of reg.slugs) {
    for (const concept of reg.notes[subtopicSlug].concepts) {
      const ctx: HarvestCtx = {
        exam: reg.examName,
        subjectRoute: reg.subjectRoute,
        chapterSlug: reg.chapterSlug,
        subtopicSlug,
        conceptSlug: concept.slug,
      };
      atoms.push(...harvestConcept(ctx, concept, chapterFormulas));
    }
  }
  return atoms;
}

function main() {
  const targets = process.argv.slice(2);
  const specs = targets.length > 0 ? targets : DEFAULT_CHAPTERS;
  const outDir = path.join(process.cwd(), "scripts", "quiz", "atoms");
  fs.mkdirSync(outDir, { recursive: true });

  let grand = 0;
  for (const spec of specs) {
    const [subjectRoute, chapterSlug] = spec.split("/");
    const reg = NOTES_CHAPTERS.find(
      (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
    );
    if (!reg) {
      console.error(`✗ no notes chapter for "${spec}" — skipping`);
      continue;
    }
    const atoms = harvestChapter(reg);
    const auto = atoms.filter((a) => a.status === "auto").length;
    const review = atoms.length - auto;
    const clean = atoms.filter((a) => a.status === "needs_review" && a.looksMcqClean).length;
    const file = path.join(outDir, `${subjectRoute}__${chapterSlug}.json`);
    fs.writeFileSync(file, JSON.stringify(atoms, null, 2) + "\n");
    grand += atoms.length;
    console.log(
      `✓ ${spec}: ${atoms.length} atoms  (auto ${auto} · needs_review ${review}, of which ${clean} look MCQ-clean)`
    );
    console.log(`  → ${path.relative(process.cwd(), file)}`);
  }
  console.log(`\nTotal: ${grand} atoms across ${specs.length} chapter(s).`);
}

main();
