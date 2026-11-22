/**
 * PROD-CONTRACT: Learn's links for V (src/lib/learn/vLinks.ts) vs the live Learn
 * outlines and the live taxonomy (2026-11-22).
 *
 * Both files are hand-declared facts matched by NAME and SLUG at request time, so a
 * near-miss does not error: a renamed topic silently stops counting mistakes against
 * its lessons, a new Learn lesson silently gets none, a renamed bank chapter silently
 * stops getting Learn at all. This fails in each direction:
 *   - every chapter link resolves to a live Learn chapter (and its parts exist) and to
 *     a live bank chapter of that exam;
 *   - every lesson of a board course chapter is in the topic file, and every lesson
 *     in the file is still in the outline;
 *   - every topic named exists in that board chapter.
 * Read-only.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { LEARN_CHAPTER_LINKS, LEARN_LESSON_TOPICS, lessonTopics, topicKey } from "@/lib/learn/vLinks";
import type { Outline } from "@/lib/learn/lessonState";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/** The board exam a course belongs to, as the database names it. */
const BOARD_EXAM: Record<string, string> = { "cbse-12-maths": "CBSE Class 12", "mh-hsc-12-maths": "Maharashtra HSC Class 12" };

describe.skipIf(!HAS_ENV)("Learn links for V vs the live outlines and taxonomy", () => {
  let client: SupabaseClient;
  const outlines = new Map<string, Outline>();
  /** `${exam}|${chapter}` → topic names. */
  const bank = new Map<string, Set<string>>();

  beforeAll(async () => {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    for (const course of new Set(Object.values(LEARN_CHAPTER_LINKS).map((l) => l.course))) {
      const { data, error } = await client.rpc("learn_course_outline", { p_course: course });
      if (error) throw error;
      outlines.set(course, data as Outline);
    }
    const exams = [...new Set(Object.keys(LEARN_CHAPTER_LINKS).map((k) => k.split("|")[0]))];
    const { data, error } = await client
      .from("subtopics")
      .select("name, chapter:chapters!inner(name, subject:subjects!inner(name, exam:exams!inner(name)))")
      .in("chapter.subject.exam.name", exams)
      .in("chapter.subject.name", ["Mathematics", "Maths"])
      .limit(5000);
    if (error) throw error;
    for (const r of (data ?? []) as unknown as { name: string; chapter: { name: string; subject: { exam: { name: string } } } }[]) {
      const key = `${r.chapter.subject.exam.name}|${r.chapter.name}`;
      if (!bank.has(key)) bank.set(key, new Set());
      bank.get(key)!.add(topicKey(r.name));
    }
  });

  it("every chapter link resolves to a live Learn chapter, its parts, and a live bank chapter", () => {
    for (const [key, link] of Object.entries(LEARN_CHAPTER_LINKS)) {
      const ch = outlines.get(link.course)?.chapters.find((c) => c.slug === link.chapter);
      expect(ch, `${key}: no Learn chapter ${link.course}/${link.chapter}`).toBeDefined();
      for (const p of link.parts ?? []) expect(p <= (ch?.parts.length ?? 0), `${key}: no part ${p}`).toBe(true);
      expect(bank.has(key), `${key}: no such bank chapter`).toBe(true);
    }
  });

  it("every board lesson has topics, every listed lesson is live, and every topic exists", () => {
    for (const [course, exam] of Object.entries(BOARD_EXAM)) {
      const outline = outlines.get(course)!;
      for (const ch of outline.chapters) {
        const link = Object.entries(LEARN_CHAPTER_LINKS).find(([k, l]) => k.startsWith(`${exam}|`) && l.course === course && l.chapter === ch.slug);
        expect(link, `${course}/${ch.slug}: no chapter link from ${exam}`).toBeDefined();
        const topics = bank.get(link![0]) ?? new Set<string>();
        const live = ch.parts.flatMap((p) => p.concepts.map((code) => outline.pools[p.chapter].concepts.find((c) => c.code === code)!).filter((c) => c.published).map((c) => c.slug));
        const listed = Object.keys(LEARN_LESSON_TOPICS[`${course}/${ch.slug}`] ?? {});
        expect(listed.sort(), `${course}/${ch.slug}: lessons differ from the outline`).toEqual([...live].sort());
        for (const slug of live) {
          for (const t of lessonTopics(course, ch.slug, slug)) expect(topics.has(topicKey(t)), `${course}/${ch.slug}/${slug}: no topic "${t}" in ${link![0]}`).toBe(true);
        }
      }
    }
  });
});
