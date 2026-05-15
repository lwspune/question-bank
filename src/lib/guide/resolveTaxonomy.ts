import type { SupabaseClient } from "@supabase/supabase-js";

export type ResolvedChapter = {
  id: string;
  /** Map subtopic name → subtopic id, within this chapter. */
  subtopics: Map<string, string>;
};

export type ResolvedTaxonomy = {
  examId: string;
  subjectId: string;
  /** Map chapter name → resolved chapter (id + subtopic lookups). */
  chapters: Map<string, ResolvedChapter>;
};

/**
 * Resolve display names (exam, subject, chapter, subtopic) to UUIDs so the
 * guide pages can build /browse deep-links without hard-coding env-specific
 * IDs. One call returns the full lookup tree.
 *
 * Used by Server Components on /guide/* routes; cheap on a populated bank
 * (~3 sequential queries, all primary-key or unique-index reads).
 */
export async function resolveTaxonomy(
  client: SupabaseClient,
  examName: string,
  subjectName: string
): Promise<ResolvedTaxonomy> {
  const { data: exam, error: eErr } = await client
    .from("exams")
    .select("id")
    .eq("name", examName)
    .single();
  if (eErr || !exam) throw new Error(`Exam not found: ${examName}`);

  const { data: subject, error: sErr } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", exam.id)
    .eq("name", subjectName)
    .single();
  if (sErr || !subject) {
    throw new Error(`Subject not found: ${subjectName} under ${examName}`);
  }

  const { data: chapters } = await client
    .from("chapters")
    .select("id, name")
    .eq("subject_id", subject.id);

  const chapterRows = chapters ?? [];
  const chapterIds = chapterRows.map((c) => c.id);

  const { data: subtopics } =
    chapterIds.length > 0
      ? await client
          .from("subtopics")
          .select("id, name, chapter_id")
          .in("chapter_id", chapterIds)
      : { data: [] as Array<{ id: string; name: string; chapter_id: string }> };

  const chaptersMap = new Map<string, ResolvedChapter>();
  // Map chapter_id → name so we can attach subtopics to their chapter by name.
  const idToName = new Map<string, string>();
  for (const c of chapterRows) {
    chaptersMap.set(c.name, { id: c.id, subtopics: new Map() });
    idToName.set(c.id, c.name);
  }
  for (const s of subtopics ?? []) {
    const chapterName = idToName.get(s.chapter_id);
    if (!chapterName) continue;
    chaptersMap.get(chapterName)?.subtopics.set(s.name, s.id);
  }

  return { examId: exam.id, subjectId: subject.id, chapters: chaptersMap };
}
