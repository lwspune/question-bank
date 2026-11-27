/**
 * Prints one Learn lesson as a lesson-to-topic reviewer needs it (2026-11-27): title, group,
 * summary, the opening question and its check questions' stems. Reads the bundle only.
 *
 *   npx tsx scripts/learn/topics-lesson.ts --course=<slug> --chapter=<course chapter> --lesson=<slug> [--items=8]
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const from = flag("from") ?? "generated-papers/learn-bundle-6da3085";
const [course, chapter, lesson] = [flag("course"), flag("chapter"), flag("lesson")];
const items = Number(flag("items") ?? 6);
if (!course || !chapter || !lesson) {
  console.error("usage: --course=<slug> --chapter=<course chapter> --lesson=<slug> [--items=8]");
  process.exit(1);
}
type Concept = { code: string; slug: string; title: string; grp: string; one_liner: string; sources?: string[]; body?: { hook?: { prompt?: string } }; items: { stem: string }[] };
const b = JSON.parse(readFileSync(join(from, "bundle.json"), "utf8")) as {
  courses: { slug: string; chapters: { slug: string; parts: { chapter: string; concepts: string[] }[] }[] }[];
  chapters: { slug: string; concepts: Concept[] }[];
};
const ch = b.courses.find((c) => c.slug === course)?.chapters.find((c) => c.slug === chapter);
if (!ch) {
  console.error("no such course chapter");
  process.exit(1);
}
for (const part of ch.parts) {
  const c = b.chapters.find((p) => p.slug === part.chapter)?.concepts.find((k) => k.slug === lesson && part.concepts.includes(k.code));
  if (!c) continue;
  const flat = (s: string) => s.replace(/\s+/g, " ").trim();
  console.log(`${c.title} [${c.grp}] (${part.chapter}/${c.code})`);
  console.log(`summary: ${flat(c.one_liner)}`);
  // The bank topics (mostly Maharashtra textbook ones) Concept Ladder built the lesson from: a hint, not this exam's topic names.
  const built = (c.sources ?? []).filter((x) => x.includes("#")).map((x) => x.split("#")[1]);
  if (built.length) console.log(`built from (another exam's topics, a hint): ${built.join(" ; ")}`);
  if (c.body?.hook?.prompt) console.log(`opens with: ${flat(c.body.hook.prompt)}`);
  for (const [i, it] of c.items.slice(0, items).entries()) console.log(`Q${i + 1}: ${flat(it.stem).slice(0, 260)}`);
  process.exit(0);
}
console.error("no such lesson in that chapter");
process.exit(1);
