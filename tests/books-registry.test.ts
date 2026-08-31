/**
 * PROD-CONTRACT: the book registry vs the live taxonomy.
 *
 * `src/lib/books/registry.ts` names its subject and chapters as STRINGS and
 * the query layer matches them against `subjects.name` / `chapters.name`. A
 * near-miss does not error — it silently yields an empty chapter, or an empty
 * half of a chapter. That is the same failure that would have split the
 * mh-ssc-10 textbook corpus in two when the book printed
 * "Historiography : Development in the West" and the DB had no space before
 * the colon.
 *
 * So this is the standing probe for a hand-declared fact, the bargain
 * tests/mocks-registry.test.ts and tests/format-mix-registry.test.ts already
 * make. It fails in both directions:
 *
 *   - a registry name that no longer resolves in one or both exams -> that
 *     chapter (or half of it) silently empties out of the book;
 *   - a chapter that exists in the bank for this subject and is NOT in the
 *     registry -> real questions are missing from the book with nothing on
 *     screen to say so. This is the one that loses content quietly.
 *
 * Read-only. It asserts the registry can be RESOLVED, never how many questions
 * a chapter should hold — the bank grows, and a count assertion would fail on
 * every ingest.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BOOKS, bookExams } from "@/lib/books/registry";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("book registry vs the live taxonomy", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  it("declares slugs that are unique and URL-safe", () => {
    for (const book of BOOKS) {
      const slugs = book.chapters.map((c) => c.slug);
      expect(new Set(slugs).size, `${book.slug}: duplicate chapter slug`).toBe(
        slugs.length
      );
      for (const slug of slugs) {
        expect(slug, `${book.slug}/${slug} is not URL-safe`).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  it.each(BOOKS.map((b) => [b.slug, b] as const))(
    "%s: every chapter resolves in every exam the book draws from",
    async (_slug, book) => {
      const { data: exams, error: examErr } = await client
        .from("exams")
        .select("id, name")
        .in("name", bookExams(book));
      if (examErr) throw new Error(`exams: ${examErr.message}`);

      const examIdByName = new Map(
        (exams ?? []).map((e) => [e.name as string, e.id as string])
      );
      for (const exam of bookExams(book)) {
        expect(examIdByName.get(exam), `exam "${exam}" is missing`).toBeTruthy();
      }

      // `subjects.exam_id` is NOT NULL, so "English" is a different row per
      // exam and each must resolve on its own.
      const { data: subjects, error: subjErr } = await client
        .from("subjects")
        .select("id, exam_id")
        .eq("name", book.subject)
        .in("exam_id", Array.from(examIdByName.values()));
      if (subjErr) throw new Error(`subjects: ${subjErr.message}`);

      const subjectIdByExam = new Map<string, string>();
      for (const [name, examId] of examIdByName) {
        const hit = (subjects ?? []).find((s) => s.exam_id === examId);
        expect(hit, `subject "${book.subject}" missing under ${name}`).toBeTruthy();
        subjectIdByExam.set(name, hit!.id as string);
      }

      const { data: chapters, error: chapErr } = await client
        .from("chapters")
        .select("name, subject_id")
        .in("subject_id", Array.from(subjectIdByExam.values()));
      if (chapErr) throw new Error(`chapters: ${chapErr.message}`);

      const liveByExam = new Map<string, Set<string>>();
      for (const [exam, subjectId] of subjectIdByExam) {
        liveByExam.set(
          exam,
          new Set(
            (chapters ?? [])
              .filter((c) => c.subject_id === subjectId)
              .map((c) => c.name as string)
          )
        );
      }

      // Direction 1: nothing in the registry has stopped resolving.
      for (const exam of bookExams(book)) {
        const live = liveByExam.get(exam)!;
        const missing = book.chapters.filter((c) => !live.has(c.name)).map((c) => c.name);
        expect(
          missing,
          `${exam}: registry names no longer in the bank — the book would render these empty`
        ).toEqual([]);
      }

      // Direction 2: nothing in the bank is missing from the registry. This is
      // the direction that loses content silently, so it names what to add.
      const declared = new Set(book.chapters.map((c) => c.name));
      const undeclared = Array.from(
        new Set(Array.from(liveByExam.values()).flatMap((s) => Array.from(s)))
      )
        .filter((name) => !declared.has(name))
        .sort();
      expect(
        undeclared,
        `${book.subject} chapters in the bank but absent from the registry — their questions are missing from the book`
      ).toEqual([]);
    }
  );

  /**
   * `groupSubtopics` names bank subtopics as strings too, and a near-miss there
   * is quieter than a bad chapter name: the declared block simply never
   * matches, and those questions are APPENDED under their own raw subtopic in
   * alphabetical order instead. The chapter still renders, still holds every
   * question, and silently disagrees with the order and the headings someone
   * authored — including the contents table's ranges.
   *
   * Checked in both directions, per exam, because a subtopic that exists in one
   * exam and not the other is normal (Grammar's Subject-Verb Agreement is NDA
   * only) — so a name must resolve in AT LEAST ONE, and every subtopic the bank
   * holds for that chapter must be covered by some block.
   */
  it.each(BOOKS.map((b) => [b.slug, b] as const))(
    "%s: every declared subtopic resolves, and every live subtopic is declared",
    async (_slug, book) => {
      const grouped = book.chapters.filter((c) => c.groupSubtopics?.length);
      if (grouped.length === 0) return;

      const { data: rows, error } = await client
        .from("subtopics")
        .select("name, chapter:chapters!chapter_id(name, subject:subjects!subject_id(name))")
        .in(
          "chapter_id",
          await chapterIdsFor(client, book, grouped.map((c) => c.name))
        );
      if (error) throw new Error(`subtopics: ${error.message}`);

      const liveByChapter = new Map<string, Set<string>>();
      for (const row of rows ?? []) {
        const chapterName = embedName(row.chapter);
        if (!chapterName) continue;
        const set = liveByChapter.get(chapterName) ?? new Set<string>();
        set.add(row.name as string);
        liveByChapter.set(chapterName, set);
      }

      for (const chapter of grouped) {
        const live = liveByChapter.get(chapter.name) ?? new Set<string>();
        const declared = chapter.groupSubtopics!.flatMap((g) => g.members ?? [g.name]);

        // Direction 1: a declared name that matches nothing is a typo, and the
        // block it names would silently never render.
        const unresolved = declared.filter((n) => !live.has(n));
        expect(
          unresolved,
          `${chapter.name}: declared subtopic names not in the bank — their blocks would never render`
        ).toEqual([]);

        // Direction 2: a live subtopic no block covers gets appended in
        // alphabetical order, out of the authored sequence, with nothing on
        // screen to say so.
        const covered = new Set(declared);
        const uncovered = Array.from(live).filter((n) => !covered.has(n)).sort();
        expect(
          uncovered,
          `${chapter.name}: bank subtopics no block declares — they would be appended out of order`
        ).toEqual([]);

        // A subtopic listed under two blocks would silently land in whichever
        // is declared first, dropping it from the other.
        expect(
          new Set(declared).size,
          `${chapter.name}: a subtopic is declared by more than one block`
        ).toBe(declared.length);
      }
    }
  );
});

/** A PostgREST to-one embed arrives as an object but is typed as possibly an array. */
function embedName(value: unknown): string | null {
  const row = Array.isArray(value) ? value[0] : value;
  const name = (row as { name?: unknown } | null | undefined)?.name;
  return typeof name === "string" ? name : null;
}

/** Chapter row ids for the book's subject, across every exam it draws from. */
async function chapterIdsFor(
  client: SupabaseClient,
  book: (typeof BOOKS)[number],
  chapterNames: string[]
): Promise<string[]> {
  const { data: exams } = await client
    .from("exams")
    .select("id, name")
    .in("name", bookExams(book));
  const { data: subjects } = await client
    .from("subjects")
    .select("id")
    .eq("name", book.subject)
    .in("exam_id", (exams ?? []).map((e) => e.id));
  const { data: chapters } = await client
    .from("chapters")
    .select("id")
    .in("subject_id", (subjects ?? []).map((s) => s.id))
    .in("name", chapterNames);
  return (chapters ?? []).map((c) => c.id as string);
}
