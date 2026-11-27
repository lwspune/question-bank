/**
 * Writes a course's reviewed lesson-to-topic file from the topics its lessons were BUILT from
 * (Concept Ladder's `<book file>#<bank topic>` sources, lib sourceTopics), for the Maharashtra
 * courses whose lessons were made from that same bank chapter (2026-11-27). A lesson with no
 * recorded topic of its chapter is left empty and listed, for a person to read. Offline: reads the
 * bundle, the draft (lessons) and the packet (topic names). The result still goes through
 * topics-commit.ts like any reviewed file.
 *
 *   npx tsx scripts/learn/topics-from-sources.ts --course=<slug>[,<slug>] [--from=<bundle dir>]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { sourceTopics } from "../lib/learnTopicDraft";

const courses = process.argv.find((a) => a.startsWith("--course="))?.slice("--course=".length).split(",") ?? [];
const WORK = join(process.cwd(), "generated-papers", "learn-topics");
type Concept = { code: string; slug: string; status: string; sources?: string[] };
const from = process.argv.find((a) => a.startsWith("--from="))?.slice("--from=".length) ?? join("generated-papers", "learn-bundle-6da3085");
const b = JSON.parse(readFileSync(join(from, "bundle.json"), "utf8")) as {
  courses: { slug: string; chapters: { slug: string; parts: { chapter: string; concepts: string[] }[] }[] }[];
  chapters: { slug: string; concepts: Concept[] }[];
};

function packetTopics(md: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  let ch: string | null = null;
  for (const line of md.split("\n")) {
    const h = /^## ([a-z0-9-]+): /.exec(line);
    if (h) {
      ch = h[1];
      out[ch] = [];
      continue;
    }
    const t = /^- \*\*(.+?)\*\* \(\d+\):/.exec(line);
    if (t && ch) out[ch].push(t[1]);
  }
  return out;
}

for (const course of courses) {
  const c = b.courses.find((x) => x.slug === course);
  if (!c) throw new Error(`no course ${course}`);
  const draft = JSON.parse(readFileSync(join(WORK, "draft", `${course}.json`), "utf8")) as Record<string, Record<string, string[]>>;
  const topics = packetTopics(readFileSync(join(WORK, "packet", `${course}.md`), "utf8"));
  const final: Record<string, Record<string, string[]>> = {};
  const empty: string[] = [];
  for (const ch of c.chapters) {
    final[ch.slug] = {};
    for (const lesson of Object.keys(draft[ch.slug])) {
      const concept = ch.parts
        .flatMap((p) => p.concepts.map((code) => b.chapters.find((x) => x.slug === p.chapter)?.concepts.find((k) => k.code === code)))
        .find((k) => k?.slug === lesson);
      const ts = sourceTopics(concept?.sources ?? [], topics[ch.slug] ?? []);
      final[ch.slug][lesson] = ts;
      if (ts.length === 0) empty.push(`${ch.slug}/${lesson}`);
    }
  }
  writeFileSync(join(WORK, "final", `${course}.json`), `${JSON.stringify(final, null, 1)}\n`);
  console.log(`${course}: ${Object.values(final).reduce((n, x) => n + Object.keys(x).length, 0)} lessons, ${empty.length} with no recorded topic`);
  for (const e of empty) console.log(`  ${e}`);
}
