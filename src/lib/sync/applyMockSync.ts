import type { SupabaseClient } from "@supabase/supabase-js";
import { contentHash } from "@/lib/upload/hash";
import { makeTaxonomyResolver } from "@/lib/upload/taxonomy";
import {
  mergeAttemptStats,
  type AttemptStats,
} from "./mergeAttemptStats";
import type { SyncPayload, SyncQuestion } from "./payload";

export type ApplyMockSyncResult =
  | {
      kind: "ok";
      inserted: number;
      merged: number;
      skipped: number;
      errors: { sourceQuestionId: string; message: string }[];
    }
  | { kind: "fatal"; message: string };

type Options = {
  orgId: string;
};

export async function applyMockSync(
  client: SupabaseClient,
  payload: SyncPayload,
  opts: Options
): Promise<ApplyMockSyncResult> {
  const { orgId } = opts;

  const { data: exam, error: examErr } = await client
    .from("exams")
    .select("id")
    .eq("name", payload.exam.name)
    .maybeSingle();
  if (examErr) return { kind: "fatal", message: examErr.message };
  if (!exam) {
    return {
      kind: "fatal",
      message: `Exam "${payload.exam.name}" not found in canonical taxonomy`,
    };
  }
  const examId = exam.id as string;

  const { data: admin, error: adminErr } = await client
    .from("org_members")
    .select("user_id")
    .eq("org_id", orgId)
    .eq("role", "ADMIN")
    .limit(1)
    .maybeSingle();
  if (adminErr) return { kind: "fatal", message: adminErr.message };
  if (!admin) {
    return {
      kind: "fatal",
      message: "Destination org has no ADMIN to attribute synced rows to",
    };
  }
  const createdBy = admin.user_id as string;

  const taxonomy = makeTaxonomyResolver(client);
  const result = {
    kind: "ok" as const,
    inserted: 0,
    merged: 0,
    skipped: 0,
    errors: [] as { sourceQuestionId: string; message: string }[],
  };

  for (const q of payload.questions) {
    try {
      const outcome = await processOne(client, q, {
        orgId,
        examId,
        createdBy,
        sourceApp: payload.source.app,
        sourceMockId: payload.source.mockId,
        taxonomy,
      });
      if (outcome === "inserted") result.inserted++;
      else if (outcome === "merged") result.merged++;
      else if (outcome === "skipped") result.skipped++;
    } catch (err) {
      result.skipped++;
      result.errors.push({
        sourceQuestionId: q.sourceQuestionId,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return result;
}

type ProcessContext = {
  orgId: string;
  examId: string;
  createdBy: string;
  sourceApp: string;
  sourceMockId: string;
  taxonomy: ReturnType<typeof makeTaxonomyResolver>;
};

async function processOne(
  client: SupabaseClient,
  q: SyncQuestion,
  ctx: ProcessContext
): Promise<"inserted" | "merged" | "skipped"> {
  const subjectId = await ctx.taxonomy.findSubject(ctx.examId, q.subject.name);
  if (!subjectId) {
    throw new Error(
      `Subject "${q.subject.name}" does not exist for the canonical exam taxonomy`
    );
  }

  const chapterId = await ctx.taxonomy.resolveChapter(subjectId, q.chapter.name);
  const subtopicId = q.subtopic
    ? await ctx.taxonomy.resolveSubtopic(chapterId, q.subtopic.name)
    : null;

  const sortedTexts = q.options
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((o) => o.text);
  const correctLabel = q.options.find((o) => o.isCorrect)!.label;
  const hash = contentHash(q.text, sortedTexts, correctLabel);

  const { data: existing, error: lookupErr } = await client
    .from("questions")
    .select("id, attempt_stats")
    .eq("org_id", ctx.orgId)
    .eq("content_hash", hash)
    .maybeSingle();
  if (lookupErr) throw new Error(lookupErr.message);

  if (existing) {
    const existingStats =
      (existing.attempt_stats as AttemptStats | null) ?? null;
    const incomingStats = q.attemptStats ?? null;
    const merged = mergeAttemptStats(existingStats, incomingStats);

    const { error: updErr } = await client
      .from("questions")
      .update({
        attempt_stats: merged,
        source_mock_id: ctx.sourceMockId,
        source_app: ctx.sourceApp,
      })
      .eq("id", existing.id);
    if (updErr) throw new Error(updErr.message);
    return "merged";
  }

  const { data: inserted, error: insErr } = await client
    .from("questions")
    .insert({
      org_id: ctx.orgId,
      exam_id: ctx.examId,
      subject_id: subjectId,
      chapter_id: chapterId,
      subtopic_id: subtopicId,
      context: q.context ?? null,
      text: q.text,
      difficulty: q.difficulty,
      solution: q.solution ?? null,
      visibility: "PUBLIC",
      pyq_year: q.pyqYear ?? null,
      marks: q.marks ?? null,
      neg_marks: q.negMarks ?? null,
      attempt_stats: q.attemptStats ?? null,
      source_mock_id: ctx.sourceMockId,
      source_app: ctx.sourceApp,
      content_hash: hash,
      created_by: ctx.createdBy,
    })
    .select("id")
    .single();

  if (insErr) {
    // Race fallback: a parallel sync just inserted the same hash. Merge instead.
    if (
      insErr.code === "23505" ||
      /duplicate key|unique constraint/i.test(insErr.message)
    ) {
      const { data: race } = await client
        .from("questions")
        .select("id, attempt_stats")
        .eq("org_id", ctx.orgId)
        .eq("content_hash", hash)
        .maybeSingle();
      if (race) {
        const merged = mergeAttemptStats(
          (race.attempt_stats as AttemptStats | null) ?? null,
          q.attemptStats ?? null
        );
        await client
          .from("questions")
          .update({
            attempt_stats: merged,
            source_mock_id: ctx.sourceMockId,
            source_app: ctx.sourceApp,
          })
          .eq("id", race.id);
        return "merged";
      }
    }
    throw new Error(insErr.message);
  }

  const { error: optErr } = await client.from("options").insert(
    q.options.map((o) => ({
      question_id: inserted!.id,
      label: o.label,
      text: o.text,
      is_correct: o.isCorrect,
    }))
  );
  if (optErr) throw new Error(optErr.message);

  return "inserted";
}
