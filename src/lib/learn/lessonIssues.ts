import type { Lesson } from "./lessonFromRaw";
import type { RenderedBlock, RenderedInline } from "./renderedText";
import type { RenderedSlide } from "./lesson/renderDeckCore";
import { MASTERY_NEEDED } from "./links";

/**
 * What would stop a student on this lesson, as plain sentences (empty when it is fine): checked by
 * `npm run learn:smoke` over every concept a course shows. The content passed Concept Ladder's own
 * checks; this checks what changes on the way here: PYQ Vault's KaTeX renders the maths (a red
 * `katex-error` on screen), the import's verified items (fewer than MASTERY_NEEDED and the concept
 * can never be mastered), and the shapes the screens assume (four options, slides to read).
 */
export function lessonIssues(lesson: Lesson): string[] {
  const issues: string[] = [];
  const teaching = lesson.slides.filter((s) => s.kind !== "questions");
  if (teaching.length === 0) issues.push("no slides");
  if (lesson.items.length < MASTERY_NEEDED) {
    issues.push(`only ${lesson.items.length} checked question${lesson.items.length === 1 ? "" : "s"}; mastery needs ${MASTERY_NEEDED}`);
  }
  for (const s of teaching) if (slideBroken(s)) issues.push(`maths does not render on slide ${s.id}`);
  for (const i of lesson.items) {
    if (blocksBroken(i.stem) || i.options.some((o) => inlineBroken(o.text))) issues.push(`maths does not render in question ${i.code}`);
    if (i.options.length !== 4) issues.push(`question ${i.code} has ${i.options.length} options`);
  }
  return issues;
}

// A parse error is a `katex-error` span; an unknown command is drawn in KaTeX's error colour with no class.
const broken = (html: string) => html.includes("katex-error") || html.includes("#cc0000");
const inlineBroken = (nodes: RenderedInline[]) => nodes.some((n) => n.type === "math" && broken(n.html));
const blocksBroken = (blocks: RenderedBlock[]) =>
  blocks.some((b) => (b.type === "math" ? broken(b.html) : b.type === "list" ? b.items.some(inlineBroken) : inlineBroken(b.inline)));

function slideBroken(s: RenderedSlide): boolean {
  if (inlineBroken(s.heading)) return true;
  switch (s.kind) {
    case "hook":
      return blocksBroken(s.prompt);
    case "reveal":
      return blocksBroken(s.prompt) || blocksBroken(s.reveal);
    case "text":
      return blocksBroken(s.body);
    case "points":
      return s.points.some(inlineBroken);
    case "worked":
      return blocksBroken(s.prompt) || s.steps.some(inlineBroken) || (s.answer !== null && inlineBroken(s.answer));
    case "questions":
      return false;
  }
}
