/**
 * Render smoke test for the IMAT notes: server-renders every concept card,
 * and every worked step, self-check step and answer (which the card hides
 * behind a click), with the same React components the preview page uses.
 *
 * The preview sits behind a superadmin sign-in, so no headless request can
 * reach it; this proves the CONTENT renders (KaTeX parses, tables become
 * tables, nothing throws). It does not prove the layout. Read-only.
 *
 *   npx tsx --tsconfig scripts/imat/notes/tsconfig.render.json --require ./scripts/imat/notes/ignore-css.cjs scripts/imat/notes/render-smoke.tsx
 */
import { renderToStaticMarkup } from "react-dom/server";
import ConceptUnitCard from "../../../src/app/notes/_components/ConceptUnitCard";
import BlockText from "../../../src/components/math/BlockText";
import { IMAT_NOTES_CHAPTERS } from "../../../src/lib/sites/imat/notes/registry";

const problems: string[] = [];
let concepts = 0;
let fragments = 0;

/** A KaTeX parse error renders as a .katex-error span or the destructive-text fallback. */
function inspect(html: string, where: string) {
  if (html.includes("katex-error") || html.includes("text-destructive"))
    problems.push(`${where}: KaTeX error in rendered output`);
  if (/\|\s*-{3,}\s*\|/.test(html)) problems.push(`${where}: a pipe-table printed as raw text`);
}

for (const c of IMAT_NOTES_CHAPTERS) {
  for (const [slug, note] of Object.entries(c.notes)) {
    note.concepts.forEach((concept, i) => {
      const where = `${c.subjectRoute}/${c.chapterSlug}/${slug}#${concept.slug}`;
      try {
        const html = renderToStaticMarkup(
          <ConceptUnitCard
            concept={concept}
            subtopicSlug={slug}
            index={i + 1}
            total={note.concepts.length}
            pyqExample={null}
            drillQuestionIds={[]}
            showReport={false}
          />
        );
        inspect(html, where);
        concepts += 1;
      } catch (e) {
        problems.push(`${where}: card threw ${(e as Error).message.slice(0, 120)}`);
      }
      const hidden = [
        ...(concept.kind === "formula" ? [...concept.authoredExample.steps, concept.authoredExample.answer] : []),
        ...(concept.selfCheckExample ? [...concept.selfCheckExample.steps, concept.selfCheckExample.answer] : []),
        ...(concept.practiceSet ?? []).flatMap((p) => [p.answer, p.method ?? ""]),
      ].filter(Boolean);
      for (const text of hidden) {
        try {
          inspect(renderToStaticMarkup(<BlockText text={text} />), `${where} (hidden step)`);
          fragments += 1;
        } catch (e) {
          problems.push(`${where}: step threw ${(e as Error).message.slice(0, 120)}`);
        }
      }
    });
  }
}

console.log(`rendered ${concepts} concept cards and ${fragments} hidden steps/answers`);
if (problems.length) {
  console.log(`FAIL: ${problems.length} problem(s)`);
  for (const p of problems.slice(0, 50)) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("PASS");
