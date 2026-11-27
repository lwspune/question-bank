/**
 * The reviewed lesson-to-topic files (src/lib/learn/lessonTopics/<course>.json, 2026-11-27): one
 * per Learn course beyond the three Maths courses whose rows live in vLinks. Each is
 * `{ <course chapter>: { <lesson>: [bank topic, ...] } }`; an empty list means a reviewer read the
 * lesson and found no bank topic it teaches (better none than a wrong one). The live check
 * (tests/learn-v-links-live.test.ts) proves every lesson is listed and every topic exists.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEARN_BANK_CHAPTERS } from "@/lib/learn/bankLinks.generated";
import { LESSON_TOPIC_FILES } from "@/lib/learn/lessonTopics";
import { LEARN_LESSON_TOPICS, lessonTopics } from "@/lib/learn/vLinks";

const DIR = join(process.cwd(), "src/lib/learn/lessonTopics");
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const courses = new Set(Object.keys(LEARN_BANK_CHAPTERS).map((k) => k.split("/")[0]));
const handCourses = new Set(Object.keys(LEARN_LESSON_TOPICS).map((k) => k.split("/")[0]));

describe("lesson-to-topic files", () => {
  it("every course has its rows: in vLinks (the three Maths courses) or a file here, never both", () => {
    const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
    expect(new Set(files)).toEqual(new Set(Object.keys(LESSON_TOPIC_FILES)));
    for (const c of courses) expect(handCourses.has(c) !== Object.hasOwn(LESSON_TOPIC_FILES, c), c).toBe(true);
  });

  it("names only the course's own chapters, every one of them, with lists of at most three distinct topics", () => {
    for (const [course, chapters] of Object.entries(LESSON_TOPIC_FILES)) {
      const own = Object.keys(LEARN_BANK_CHAPTERS).filter((k) => k.startsWith(`${course}/`)).map((k) => k.split("/")[1]);
      expect(Object.keys(chapters).sort(), course).toEqual(own.sort());
      for (const [chapter, lessons] of Object.entries(chapters)) {
        for (const [lesson, topics] of Object.entries(lessons)) {
          const at = `${course}/${chapter}/${lesson}`;
          expect(lesson, at).toMatch(SLUG);
          expect(Array.isArray(topics), at).toBe(true);
          expect(topics.length, at).toBeLessThanOrEqual(3);
          expect(new Set(topics).size, at).toBe(topics.length);
          for (const t of topics) expect(t.trim().length, at).toBeGreaterThan(0);
        }
      }
    }
  });

  it("lessonTopics reads a file's rows, and an empty row gives none", () => {
    const [course, chapters] = Object.entries(LESSON_TOPIC_FILES)[0];
    const [chapter, lessons] = Object.entries(chapters)[0];
    for (const [lesson, topics] of Object.entries(lessons)) expect(lessonTopics(course, chapter, lesson)).toEqual(topics);
  });
});
