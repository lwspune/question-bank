/**
 * PROD-CONTRACT: Learn's links for V (src/lib/learn/vLinks.ts) vs the live Learn
 * outlines and the live taxonomy (2026-11-22; every subject and the generated chapter links 2026-11-27).
 *
 * Both files are hand-declared facts matched by NAME and SLUG at request time, so a
 * near-miss does not error: a renamed topic silently stops counting mistakes against
 * its lessons, a new Learn lesson silently gets none, a renamed bank chapter silently
 * stops getting Learn at all. This fails in each direction:
 *   - every chapter link resolves to a live Learn chapter (and its parts exist) and to
 *     a live bank chapter of that exam;
 *   - every lesson of every course chapter is in its topic rows (vLinks or lessonTopics/),
 *     and every listed lesson is still in the outline;
 *   - every topic named exists in that course chapter's bank chapter.
 * Read-only.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { LEARN_BANK_CHAPTERS } from "@/lib/learn/bankLinks.generated";
import { LESSON_TOPIC_FILES } from "@/lib/learn/lessonTopics";
import { LEARN_CHAPTER_LINKS, LEARN_LESSON_TOPICS, lessonTopics, topicKey } from "@/lib/learn/vLinks";
import type { Outline } from "@/lib/learn/lessonState";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Every course's lesson rows: the three Maths courses in vLinks, the rest in lessonTopics/ (2026-11-27). */
const listedLessons = (course: string, chapter: string) =>
  Object.keys(LEARN_LESSON_TOPICS[`${course}/${chapter}`] ?? LESSON_TOPIC_FILES[course]?.[chapter] ?? {});

/** The pages of a read, 1,000 rows at a time (PostgREST's cap). */
async function allRows<T>(page: (from: number, to: number) => PromiseLike<{ data: unknown; error: unknown }>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await page(from, from + 999);
    if (error) throw error;
    const rows = (data ?? []) as T[];
    out.push(...rows);
    if (rows.length < 1000) return out;
  }
}

describe.skipIf(!HAS_ENV)("Learn links for V vs the live outlines and taxonomy", () => {
  let client: SupabaseClient;
  const outlines = new Map<string, Outline>();
  /** `${exam}|${subject}|${chapter}` of every bank chapter in the linked exams. */
  const chapters = new Set<string>();
  /** `${exam}|${subject}|${chapter}` → topic names, for the board courses' exams. */
  const bank = new Map<string, Set<string>>();

  beforeAll(async () => {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    for (const course of new Set(Object.values(LEARN_CHAPTER_LINKS).map((l) => l.course))) {
      const { data, error } = await client.rpc("learn_course_outline", { p_course: course });
      if (error) throw error;
      outlines.set(course, data as Outline);
    }
    const exams = [...new Set(Object.keys(LEARN_CHAPTER_LINKS).map((k) => k.split("|")[0]))];
    type ChapterRow = { name: string; subject: { name: string; exam: { name: string } } };
    const chapterRows = await allRows<ChapterRow>((from, to) =>
      client.from("chapters").select("name, subject:subjects!inner(name, exam:exams!inner(name))").in("subject.exam.name", exams).order("id").range(from, to),
    );
    for (const r of chapterRows) chapters.add(`${r.subject.exam.name}|${r.subject.name}|${r.name}`);
    type TopicRow = { name: string; chapter: ChapterRow };
    const topicRows = await allRows<TopicRow>((from, to) =>
      client
        .from("subtopics")
        .select("name, chapter:chapters!inner(name, subject:subjects!inner(name, exam:exams!inner(name)))")
        .in("chapter.subject.exam.name", exams)
        .order("id")
        .range(from, to),
    );
    for (const r of topicRows) {
      const key = `${r.chapter.subject.exam.name}|${r.chapter.subject.name}|${r.chapter.name}`;
      if (!bank.has(key)) bank.set(key, new Set());
      bank.get(key)!.add(topicKey(r.name));
    }
  });

  it("every chapter link resolves to a live Learn chapter, its parts, and a live bank chapter", () => {
    for (const [key, link] of Object.entries(LEARN_CHAPTER_LINKS)) {
      const ch = outlines.get(link.course)?.chapters.find((c) => c.slug === link.chapter);
      expect(ch, `${key}: no Learn chapter ${link.course}/${link.chapter}`).toBeDefined();
      for (const p of link.parts ?? []) expect(p <= (ch?.parts.length ?? 0), `${key}: no part ${p}`).toBe(true);
      expect(chapters.has(key), `${key}: no such bank chapter`).toBe(true);
    }
  });

  it("every live course chapter has a link, so V can teach from it (2026-11-27)", () => {
    const linked = new Set(Object.values(LEARN_CHAPTER_LINKS).map((l) => `${l.course}/${l.chapter}`));
    for (const [course, outline] of outlines) for (const ch of outline.chapters) expect(linked.has(`${course}/${ch.slug}`), `${course}/${ch.slug}`).toBe(true);
  });

  it("every course's lessons are all listed, every listed lesson is live, and every topic exists in its bank chapter", () => {
    for (const [course, outline] of outlines) {
      for (const ch of outline.chapters) {
        const bankChapter = LEARN_BANK_CHAPTERS[`${course}/${ch.slug}`];
        expect(bankChapter, `${course}/${ch.slug}: no bank chapter`).toBeDefined();
        const key = `${bankChapter.exam}|${bankChapter.subject}|${bankChapter.chapter}`;
        const link = [key];
        const topics = bank.get(key) ?? new Set<string>();
        const live = ch.parts.flatMap((p) => p.concepts.map((code) => outline.pools[p.chapter].concepts.find((c) => c.code === code)!).filter((c) => c.published).map((c) => c.slug));
        const listed = listedLessons(course, ch.slug);
        // A slug taken from two books (NDA's minors-and-cofactors) has one entry for both.
        expect(listed.sort(), `${course}/${ch.slug}: lessons differ from the outline`).toEqual([...new Set(live)].sort());
        for (const slug of live) {
          for (const t of lessonTopics(course, ch.slug, slug)) expect(topics.has(topicKey(t)), `${course}/${ch.slug}/${slug}: no topic "${t}" in ${link![0]}`).toBe(true);
        }
      }
    }
  });
});
