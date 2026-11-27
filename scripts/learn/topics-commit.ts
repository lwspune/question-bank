/**
 * Checks reviewed lesson-to-topic files and checks them in (2026-11-27). A reviewed file is
 * generated-papers/learn-topics/final/<course>.json (the draft's shape); it is checked against
 * the draft's lessons and the packet's topic names (both from scripts/learn/topics-draft.ts, which
 * read the live bank), by checkFinal: every lesson once, at most three topics, every topic an
 * exact bank topic of its chapter. Offline: no database.
 *
 *   npx tsx scripts/learn/topics-commit.ts --course=<slug>[,<slug>]   # check only
 *   npx tsx scripts/learn/topics-commit.ts --course=<slug> --apply    # check, then write
 *       src/lib/learn/lessonTopics/<course>.json and the index's imports
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { checkFinal } from "../lib/learnTopicDraft";

const args = process.argv.slice(2);
const courses = args.find((a) => a.startsWith("--course="))?.slice("--course=".length).split(",") ?? [];
const apply = args.includes("--apply");
if (courses.length === 0) {
  console.error("usage: npx tsx scripts/learn/topics-commit.ts --course=<slug>[,<slug>] [--apply]");
  process.exit(1);
}
const WORK = join(process.cwd(), "generated-papers", "learn-topics");
const DATA = join(process.cwd(), "src", "lib", "learn", "lessonTopics");

type Rows = Record<string, Record<string, string[]>>;

/** The packet's topic names per chapter: "## <chapter>: ..." then "- **<name>** (<n>): ...". */
function packetTopics(md: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  let chapter: string | null = null;
  for (const line of md.split("\n")) {
    const h = /^## ([a-z0-9-]+): /.exec(line);
    if (h) {
      chapter = h[1];
      out[chapter] = [];
      continue;
    }
    const t = /^- \*\*(.+?)\*\* \(\d+\):/.exec(line);
    if (t && chapter) out[chapter].push(t[1]);
  }
  return out;
}

let failed = false;
for (const course of courses) {
  const finalPath = join(WORK, "final", `${course}.json`);
  if (!existsSync(finalPath)) {
    console.error(`${course}: no ${finalPath}`);
    failed = true;
    continue;
  }
  const draft = JSON.parse(readFileSync(join(WORK, "draft", `${course}.json`), "utf8")) as Rows;
  const topics = packetTopics(readFileSync(join(WORK, "packet", `${course}.md`), "utf8"));
  const final = JSON.parse(readFileSync(finalPath, "utf8")) as Rows;
  const lessons = Object.fromEntries(Object.entries(draft).map(([c, l]) => [c, Object.keys(l)]));
  const errors = checkFinal(lessons, topics, final);
  if (errors.length) {
    failed = true;
    console.error(`${course}: ${errors.length} problem(s)`);
    for (const e of errors.slice(0, 40)) console.error(`  ${e}`);
    continue;
  }
  const rows = Object.values(final).flatMap((c) => Object.values(c));
  const changed = Object.entries(final).reduce(
    (n, [c, l]) => n + Object.entries(l).filter(([s, t]) => JSON.stringify([...t].sort()) !== JSON.stringify([...(draft[c]?.[s] ?? [])].sort())).length,
    0,
  );
  console.log(`${course}: OK, ${rows.length} lessons, ${rows.filter((t) => t.length === 0).length} with no topic, ${changed} changed from the draft`);
  if (apply) {
    // Chapters and lessons in the draft's (the course's) order.
    const ordered = Object.fromEntries(Object.entries(draft).map(([c, l]) => [c, Object.fromEntries(Object.keys(l).map((s) => [s, final[c][s]]))]));
    writeFileSync(join(DATA, `${course}.json`), `${JSON.stringify(ordered, null, 1)}\n`);
  }
}

if (apply && !failed) {
  const files = readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")).sort();
  const ident = (c: string) => c.replace(/-([a-z0-9])/g, (_, x: string) => x.toUpperCase()).replace(/^(\d)/, "_$1");
  const index = readFileSync(join(DATA, "index.ts"), "utf8");
  const head = index.slice(0, index.indexOf("export type LessonTopicFile"));
  const body = [
    ...files.map((c) => `import ${ident(c)} from "./${c}.json";`),
    "",
    "export type LessonTopicFile = Readonly<Record<string, Readonly<Record<string, readonly string[]>>>>;",
    "",
    "export const LESSON_TOPIC_FILES: Readonly<Record<string, LessonTopicFile>> = {",
    ...files.map((c) => `  ${JSON.stringify(c)}: ${ident(c)},`),
    "};",
    "",
  ].join("\n");
  writeFileSync(join(DATA, "index.ts"), head.replace(/\n(import .*\n)+\n?$/, "\n") + body);
  console.log(`index: ${files.length} course file(s)`);
}
process.exit(failed ? 1 : 0);
