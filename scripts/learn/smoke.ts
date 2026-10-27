/**
 * Checks every concept the Learn courses show, the way its lesson page builds it (migration 0192):
 * slides to read, maths that renders, four options per question, and enough checked questions to
 * master it (src/lib/learn/lessonIssues.ts). Read-only, through the anon client like the pages.
 * Exits 1 on any issue. Run after every `learn:import`.
 *
 *   npm run learn:smoke                 # production (.env.local)
 *   npm run learn:smoke -- --target=test   # the test project (.env.test.local)
 */
import { join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { lessonFromRaw, type RawLesson } from "../../src/lib/learn/lessonFromRaw";
import { lessonIssues } from "../../src/lib/learn/lessonIssues";
import type { Outline } from "../../src/lib/learn/lessonState";

const target = process.argv.find((a) => a.startsWith("--target="))?.split("=")[1] ?? "prod";
config({ path: join(process.cwd(), target === "test" ? ".env.test.local" : ".env.local"), override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_ANON_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error(`Supabase settings for ${target} are missing`);
const db = createClient(url, key, { auth: { persistSession: false } });

async function rpc<T>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await db.rpc(fn, args);
  if (error) throw new Error(`${fn}: ${error.message}`);
  return data as T;
}

async function main() {
  const courses = await rpc<{ slug: string }[]>("learn_course_list");
  const seen = new Map<string, string[]>();
  let problems = 0;
  for (const { slug } of courses) {
    const outline = (await rpc<Outline>("learn_course_outline", { p_course: slug }))!;
    console.log(`\n${slug}: ${outline.chapters.length} chapters`);
    for (const ch of outline.chapters) {
      let ok = 0;
      const issues: string[] = [];
      for (const part of ch.parts) {
        for (const code of part.concepts) {
          const node = outline.pools[part.chapter]?.concepts.find((c) => c.code === code);
          if (!node) {
            issues.push(`${part.chapter}/${code}: not in the outline`);
            continue;
          }
          if (!node.published) continue;
          const id = `${part.chapter}/${node.slug}`;
          if (!seen.has(id)) {
            const raw = await rpc<RawLesson | null>("learn_concept", { p_chapter: part.chapter, p_concept: node.slug });
            seen.set(id, raw ? lessonIssues(lessonFromRaw(raw)) : ["learn_concept returned nothing"]);
          }
          const found = seen.get(id)!;
          if (found.length) issues.push(...found.map((f) => `${node.title} (${id}): ${f}`));
          else ok++;
        }
      }
      problems += issues.length;
      console.log(`  ${issues.length ? "FAIL" : "ok  "} ${ch.title}: ${ok} concepts fine${issues.length ? `, ${issues.length} issue(s)` : ""}`);
      for (const i of issues) console.log(`       - ${i}`);
    }
  }
  console.log(`\n${seen.size} distinct concepts checked, ${problems} issue(s)`);
  if (problems) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
