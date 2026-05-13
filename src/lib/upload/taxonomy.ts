import type { SupabaseClient } from "@supabase/supabase-js";
import {
  normalizeSubjectName,
  subjectMatchKeys,
} from "./subjectAliases";

export type TaxonomyResolver = {
  findSubject(examId: string, name: string): Promise<string | null>;
  resolveChapter(subjectId: string, name: string): Promise<string>;
  resolveSubtopic(chapterId: string, name: string): Promise<string>;
};

export function makeTaxonomyResolver(client: SupabaseClient): TaxonomyResolver {
  // Per-exam normalized-name → subject-id map. Built once on first
  // findSubject() call for a given examId; subsequent lookups are
  // pure-memory walks across the alias family.
  const examSubjectMaps = new Map<string, Map<string, string>>();
  const chapterCache = new Map<string, string>();
  const subtopicCache = new Map<string, string>();

  async function loadSubjectsForExam(
    examId: string
  ): Promise<Map<string, string>> {
    const cached = examSubjectMaps.get(examId);
    if (cached) return cached;

    const { data, error } = await client
      .from("subjects")
      .select("id, name")
      .eq("exam_id", examId);
    if (error) throw new Error(`load subjects: ${error.message}`);

    const map = new Map<string, string>();
    for (const row of (data ?? []) as { id: string; name: string }[]) {
      const norm = normalizeSubjectName(row.name);
      if (map.has(norm)) {
        // Same exam shouldn't have two subjects whose normalized names
        // collide (e.g. "Maths" and "MATHS"). Catch it early rather than
        // silently bind uploads to whichever inserted first.
        throw new Error(
          `ambiguous seeded subjects for exam ${examId}: "${row.name}" collides with another row on normalized key "${norm}"`
        );
      }
      map.set(norm, row.id);
    }
    examSubjectMaps.set(examId, map);
    return map;
  }

  return {
    async findSubject(examId, name) {
      const map = await loadSubjectsForExam(examId);
      // Walk the alias family in canonical-first order; first hit wins.
      for (const key of subjectMatchKeys(name)) {
        const id = map.get(key);
        if (id) return id;
      }
      return null;
    },

    async resolveChapter(subjectId, name) {
      const k = `${subjectId}::${name}`;
      if (chapterCache.has(k)) return chapterCache.get(k)!;

      const { data: existing } = await client
        .from("chapters")
        .select("id")
        .eq("subject_id", subjectId)
        .eq("name", name)
        .maybeSingle();
      if (existing) {
        chapterCache.set(k, existing.id);
        return existing.id;
      }

      const { data: maxRow } = await client
        .from("chapters")
        .select("order_index")
        .eq("subject_id", subjectId)
        .order("order_index", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextOrder = ((maxRow?.order_index as number | undefined) ?? -1) + 1;

      const { data: created, error } = await client
        .from("chapters")
        .insert({ subject_id: subjectId, name, order_index: nextOrder })
        .select("id")
        .single();
      if (error || !created) {
        // Race: another concurrent commit (parallel test, or two near-simultaneous
        // user uploads sharing a new chapter name) inserted the same row first.
        // Re-find and adopt their id rather than failing the whole batch.
        if (
          error?.code === "23505" ||
          /duplicate key|unique constraint/i.test(error?.message ?? "")
        ) {
          const { data: refound } = await client
            .from("chapters")
            .select("id")
            .eq("subject_id", subjectId)
            .eq("name", name)
            .single();
          if (refound?.id) {
            chapterCache.set(k, refound.id);
            return refound.id;
          }
        }
        throw new Error(`failed to create chapter "${name}": ${error?.message}`);
      }
      chapterCache.set(k, created.id);
      return created.id;
    },

    async resolveSubtopic(chapterId, name) {
      const k = `${chapterId}::${name}`;
      if (subtopicCache.has(k)) return subtopicCache.get(k)!;

      const { data: existing } = await client
        .from("subtopics")
        .select("id")
        .eq("chapter_id", chapterId)
        .eq("name", name)
        .maybeSingle();
      if (existing) {
        subtopicCache.set(k, existing.id);
        return existing.id;
      }

      const { data: created, error } = await client
        .from("subtopics")
        .insert({ chapter_id: chapterId, name })
        .select("id")
        .single();
      if (error || !created) {
        // Same race protection as resolveChapter — adopt the winner's id.
        if (
          error?.code === "23505" ||
          /duplicate key|unique constraint/i.test(error?.message ?? "")
        ) {
          const { data: refound } = await client
            .from("subtopics")
            .select("id")
            .eq("chapter_id", chapterId)
            .eq("name", name)
            .single();
          if (refound?.id) {
            subtopicCache.set(k, refound.id);
            return refound.id;
          }
        }
        throw new Error(`failed to create subtopic "${name}": ${error?.message}`);
      }
      subtopicCache.set(k, created.id);
      return created.id;
    },
  };
}
