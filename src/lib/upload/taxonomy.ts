import type { SupabaseClient } from "@supabase/supabase-js";

export type TaxonomyResolver = {
  findSubject(examId: string, name: string): Promise<string | null>;
  resolveChapter(subjectId: string, name: string): Promise<string>;
  resolveSubtopic(chapterId: string, name: string): Promise<string>;
};

export function makeTaxonomyResolver(client: SupabaseClient): TaxonomyResolver {
  const subjectCache = new Map<string, string | null>();
  const chapterCache = new Map<string, string>();
  const subtopicCache = new Map<string, string>();

  return {
    async findSubject(examId, name) {
      const k = `${examId}::${name}`;
      if (subjectCache.has(k)) return subjectCache.get(k)!;
      const { data } = await client
        .from("subjects")
        .select("id")
        .eq("exam_id", examId)
        .eq("name", name)
        .maybeSingle();
      const id = data?.id ?? null;
      subjectCache.set(k, id);
      return id;
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
        throw new Error(`failed to create subtopic "${name}": ${error?.message}`);
      }
      subtopicCache.set(k, created.id);
      return created.id;
    },
  };
}
