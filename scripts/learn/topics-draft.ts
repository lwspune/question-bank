/**
 * Drafts the lesson-to-topic table for every Learn course (2026-11-27) and writes, per course, a
 * draft and a review packet to generated-papers/learn-topics/ (gitignored). Read-only on the
 * database (anon: public topics and questions). Nothing here is committed data: a reviewer reads
 * each packet and writes the final rows, and scripts/learn/topics-commit.ts checks them in.
 *
 *   npx tsx scripts/learn/topics-draft.ts --from=<bundle dir> [--course=<slug>,...]
 *
 * Also scores the draft against the hand-checked rows of the three Maths courses (lib/learn/vLinks
 * LEARN_LESSON_TOPICS), so the review knows how far to trust it.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { LEARN_BANK_CHAPTERS } from "../../src/lib/learn/bankLinks.generated";
import { LEARN_LESSON_TOPICS, topicKey } from "../../src/lib/learn/vLinks";
import { agreement, draftChapter, tokens } from "../lib/learnTopicDraft";

const args = process.argv.slice(2);
const flag = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const from = flag("from");
const only = flag("course")?.split(",");
if (!from) {
  console.error("usage: npx tsx scripts/learn/topics-draft.ts --from=<bundle dir> [--course=a,b]");
  process.exit(1);
}
config({ path: join(process.cwd(), ".env.local") });
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
const OUT = join(process.cwd(), "generated-papers", "learn-topics");

type Item = { stem: string };
type Concept = { slug: string; code: string; title: string; one_liner: string; grp: string; status: string; body?: { hook?: { prompt?: string } }; items: Item[] };
type Bundle = {
  courses: { slug: string; chapters: { slug: string; title: string; parts: { chapter: string; concepts: string[] }[] }[] }[];
  chapters: { slug: string; concepts: Concept[] }[];
};
const bundle = JSON.parse(readFileSync(join(from, "bundle.json"), "utf8")) as Bundle;
const pools = new Map(bundle.chapters.map((c) => [c.slug, new Map(c.concepts.map((k) => [k.code, k]))]));

const plain = (s: string) => s.replace(/\$+/g, " ").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}^_]/g, " ").replace(/\s+/g, " ").trim();
const short = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

async function pages<T>(q: (from: number, to: number) => PromiseLike<{ data: unknown; error: { message: string } | null }>): Promise<T[]> {
  const out: T[] = [];
  for (let f = 0; ; f += 1000) {
    const { data, error } = await q(f, f + 999);
    if (error) throw new Error(error.message);
    out.push(...((data ?? []) as T[]));
    if (((data ?? []) as T[]).length < 1000) return out;
  }
}

type BankTopic = { name: string; questions: string[] };

async function bankChapter(exam: string, subject: string, chapter: string): Promise<BankTopic[]> {
  const { data: ch, error } = await db
    .from("chapters")
    .select("id, subjects!inner(name, exams!inner(name))")
    .eq("name", chapter)
    .eq("subjects.name", subject)
    .eq("subjects.exams.name", exam)
    .single();
  if (error || !ch) throw new Error(`${exam} / ${subject} / ${chapter}: ${error?.message}`);
  const subs = await pages<{ id: string; name: string }>((f, t) => db.from("subtopics").select("id, name").eq("chapter_id", ch.id).order("id").range(f, t));
  const qs = await pages<{ subtopic_id: string; text: string }>((f, t) =>
    db.from("questions").select("subtopic_id, text").eq("chapter_id", ch.id).eq("visibility", "PUBLIC").order("id").range(f, t),
  );
  return subs.map((s) => ({ name: s.name, questions: qs.filter((q) => q.subtopic_id === s.id).map((q) => plain(q.text ?? "")) }));
}

async function main() {
  mkdirSync(join(OUT, "draft"), { recursive: true });
  mkdirSync(join(OUT, "packet"), { recursive: true });
  const calib = { lessons: 0, exact: 0, overlap: 0, wrong: 0, empty: 0 };
  for (const course of bundle.courses) {
    if (only && !only.includes(course.slug)) continue;
    const draft: Record<string, Record<string, string[]>> = {};
    const md: string[] = [`# ${course.slug}: lesson to topic review`, ""];
    for (const ch of course.chapters) {
      const bank = LEARN_BANK_CHAPTERS[`${course.slug}/${ch.slug}`];
      if (!bank) throw new Error(`${course.slug}/${ch.slug}: not in bankLinks.generated.ts`);
      const topics = await bankChapter(bank.exam, bank.subject, bank.chapter);
      const seen = new Set<string>();
      const lessons = ch.parts.flatMap((p) =>
        p.concepts.flatMap((code) => {
          const c = pools.get(p.chapter)?.get(code);
          if (!c || c.status !== "approved" || seen.has(c.slug)) return [];
          seen.add(c.slug);
          return [c];
        }),
      );
      const rows = draftChapter(
        lessons.map((c) => ({ slug: c.slug, title: c.title, text: [c.grp, c.one_liner, c.body?.hook?.prompt ?? "", ...c.items.slice(0, 8).map((i) => i.stem)].map(plain).join(" ") })),
        topics.map((t) => ({ name: t.name, text: t.questions.slice(0, 40).join(" ") })),
      );
      draft[ch.slug] = Object.fromEntries(rows.map((r) => [r.slug, r.chosen]));
      md.push(`## ${ch.slug}: ${ch.title} (bank: ${bank.exam} / ${bank.subject} / ${bank.chapter})`, "", "Topics (questions, two sample stems):", "");
      for (const t of topics) md.push(`- **${t.name}** (${t.questions.length}): ${t.questions.slice(0, 2).map((q) => short(q, 110)).join(" | ")}`);
      md.push("", "| lesson | title | summary | draft | top scores |", "|---|---|---|---|---|");
      for (const [i, r] of rows.entries()) {
        const c = lessons[i];
        md.push(`| ${r.slug} | ${c.title} | ${short(plain(c.one_liner), 120)} | ${r.chosen.join(" ; ") || "(none)"} | ${r.scores.map((s) => `${s.topic} ${s.score}`).join(" ; ")} |`);
      }
      md.push("");
      const hand = LEARN_LESSON_TOPICS[`${course.slug}/${ch.slug}`];
      if (hand) {
        const key = (ts: readonly string[] | string) => (Array.isArray(ts) ? ts : [ts]).map((t) => topicKey(t as string));
        const a = agreement(
          Object.fromEntries(rows.map((r) => [r.slug, key(r.chosen)])),
          Object.fromEntries(Object.entries(hand).map(([s, ts]) => [s, key(ts as readonly string[] | string)])),
        );
        for (const k of Object.keys(calib) as (keyof typeof calib)[]) calib[k] += a[k];
      }
    }
    writeFileSync(join(OUT, "draft", `${course.slug}.json`), `${JSON.stringify(draft, null, 1)}\n`);
    writeFileSync(join(OUT, "packet", `${course.slug}.md`), md.join("\n"));
    const n = Object.values(draft).reduce((s, c) => s + Object.keys(c).length, 0);
    const empty = Object.values(draft).reduce((s, c) => s + Object.values(c).filter((t) => t.length === 0).length, 0);
    console.log(`${course.slug}: ${course.chapters.length} chapters, ${n} lessons, ${empty} with no topic`);
  }
  if (calib.lessons) console.log(`calibration vs hand-checked Maths rows: ${JSON.stringify(calib)}`);
  void tokens;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
