import type { SupabaseClient } from "@supabase/supabase-js";

export type Taxonomy = {
  exams: Array<{
    name: string;
    subjects: Array<{
      name: string;
      chapters: Array<{
        name: string;
        orderIndex: number;
        subtopics: string[];
      }>;
    }>;
  }>;
};

export type SeedStats = {
  exams: number;
  subjects: number;
  chapters: number;
  subtopics: number;
};

export async function seedTaxonomy(
  client: SupabaseClient,
  taxonomy: Taxonomy
): Promise<SeedStats> {
  const stats: SeedStats = { exams: 0, subjects: 0, chapters: 0, subtopics: 0 };

  for (const exam of taxonomy.exams) {
    const examId = await ensureExam(client, exam.name, stats);
    for (const subject of exam.subjects) {
      const subjectId = await ensureSubject(client, examId, subject.name, stats);
      for (const chapter of subject.chapters) {
        const chapterId = await ensureChapter(
          client,
          subjectId,
          chapter.name,
          chapter.orderIndex,
          stats
        );
        for (const subtopicName of chapter.subtopics) {
          await ensureSubtopic(client, chapterId, subtopicName, stats);
        }
      }
    }
  }

  return stats;
}

async function ensureExam(
  client: SupabaseClient,
  name: string,
  stats: SeedStats
): Promise<string> {
  const { data: existing } = await client
    .from("exams")
    .select("id")
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;

  const { data, error } = await client
    .from("exams")
    .insert({ name })
    .select("id")
    .single();
  if (error) throw new Error(`exams insert(${name}): ${error.message}`);
  stats.exams++;
  return data.id;
}

async function ensureSubject(
  client: SupabaseClient,
  examId: string,
  name: string,
  stats: SeedStats
): Promise<string> {
  const { data: existing } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", examId)
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;

  const { data, error } = await client
    .from("subjects")
    .insert({ exam_id: examId, name })
    .select("id")
    .single();
  if (error) throw new Error(`subjects insert(${name}): ${error.message}`);
  stats.subjects++;
  return data.id;
}

async function ensureChapter(
  client: SupabaseClient,
  subjectId: string,
  name: string,
  orderIndex: number,
  stats: SeedStats
): Promise<string> {
  const { data: existing } = await client
    .from("chapters")
    .select("id")
    .eq("subject_id", subjectId)
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;

  const { data, error } = await client
    .from("chapters")
    .insert({ subject_id: subjectId, name, order_index: orderIndex })
    .select("id")
    .single();
  if (error) throw new Error(`chapters insert(${name}): ${error.message}`);
  stats.chapters++;
  return data.id;
}

async function ensureSubtopic(
  client: SupabaseClient,
  chapterId: string,
  name: string,
  stats: SeedStats
): Promise<string> {
  const { data: existing } = await client
    .from("subtopics")
    .select("id")
    .eq("chapter_id", chapterId)
    .eq("name", name)
    .maybeSingle();
  if (existing) return existing.id;

  const { data, error } = await client
    .from("subtopics")
    .insert({ chapter_id: chapterId, name })
    .select("id")
    .single();
  if (error) throw new Error(`subtopics insert(${name}): ${error.message}`);
  stats.subtopics++;
  return data.id;
}
