import type { SupabaseClient } from "@supabase/supabase-js";
import type { EditQuestionPayload } from "./edit";
import { deleteImage } from "@/lib/storage/images";
import { setTagsForQuestion } from "@/lib/tags/conceptTags";
import { validateConceptTag } from "@/lib/notes/subtopicSlugRegistry";

export type ApplyEditResult =
  | { kind: "ok"; orphanedImagePaths: string[] }
  | { kind: "not_found" }
  | { kind: "forbidden" }
  | { kind: "forbidden_field"; field: string; reason: string }
  | { kind: "invalid_image_path"; field: string; path: string }
  | { kind: "invalid_taxonomy"; reason: string }
  | { kind: "invalid_concept_tag"; reason: string }
  | { kind: "duplicate" }
  | { kind: "error"; message: string };

type Existing = {
  id: string;
  org_id: string;
  exam_id: string;
  image_url: string | null;
  set_id: string | null;
  context: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  options: { id: string; label: string; image_url: string | null }[];
};

export async function applyEdit(
  client: SupabaseClient,
  questionId: string,
  callerOrgId: string,
  payload: EditQuestionPayload,
  contentHashValue: string,
  /**
   * The user performing the edit. Stamped on the question's
   * `last_edited_by` + `last_edited_at` columns so admins can attribute
   * every edit. Optional only so the existing test fixtures keep compiling;
   * callers from real routes always pass it.
   */
  editorUserId?: string,
  /**
   * Caller role. When `TEACHER`, visibility changes are rejected
   * server-side even if a tampered request slips through the UI gating.
   * Omit to skip the check (existing tests + admin paths).
   */
  callerRole?: "ADMIN" | "TEACHER"
): Promise<ApplyEditResult> {
  const { data: existing, error: loadErr } = await client
    .from("questions")
    .select(
      "id, org_id, exam_id, image_url, set_id, context, visibility, options(id, label, image_url)"
    )
    .eq("id", questionId)
    .maybeSingle<Existing>();

  if (loadErr) return { kind: "error", message: loadErr.message };
  if (!existing) return { kind: "not_found" };
  if (existing.org_id !== callerOrgId) return { kind: "forbidden" };

  // Teachers can edit content but not the publishing decision.
  if (
    callerRole === "TEACHER" &&
    existing.visibility !== payload.visibility
  ) {
    return {
      kind: "forbidden_field",
      field: "visibility",
      reason: "Only admins can change a question's visibility",
    };
  }

  const pathCheck = checkImagePathPrefix(payload, callerOrgId);
  if (pathCheck) return pathCheck;

  const taxonomyCheck = await validateTaxonomy(
    client,
    existing.exam_id,
    payload
  );
  if (taxonomyCheck) return taxonomyCheck;

  // UPDATE the question first — this is where unique-violation on
  // (org_id, content_hash) surfaces.
  const isCorrect = (label: string) => label === payload.correct;
  const { error: qErr } = await client
    .from("questions")
    .update({
      text: payload.text,
      context: payload.context,
      difficulty: payload.difficulty,
      solution: payload.solution,
      image_url: payload.imageUrl,
      subject_id: payload.subjectId,
      chapter_id: payload.chapterId,
      subtopic_id: payload.subtopicId,
      visibility: payload.visibility,
      content_hash: contentHashValue,
      ...(editorUserId
        ? {
            last_edited_by: editorUserId,
            last_edited_at: new Date().toISOString(),
          }
        : {}),
    })
    .eq("id", questionId);

  if (qErr) {
    if (
      qErr.code === "23505" ||
      /duplicate key|unique constraint/i.test(qErr.message)
    ) {
      return { kind: "duplicate" };
    }
    return { kind: "error", message: qErr.message };
  }

  // Set fan-out: when the edited question is part of a set AND its context
  // changed, mirror the new context to every sibling sharing the set_id.
  // Other fields (text, options, taxonomy, images) stay row-local — only
  // the passage propagates, matching how it was loaded at upload time.
  if (existing.set_id && existing.context !== payload.context) {
    const { error: fanErr } = await client
      .from("questions")
      .update({ context: payload.context })
      .eq("set_id", existing.set_id)
      .neq("id", questionId);
    if (fanErr) return { kind: "error", message: fanErr.message };
  }

  // UPDATE each option row by id (looked up via label).
  const optionUpdates = payload.options.map(async (opt) => {
    const existingOpt = existing.options.find((o) => o.label === opt.label);
    if (!existingOpt) {
      return {
        error: `option ${opt.label} not found on question (data corruption?)`,
      };
    }
    const { error } = await client
      .from("options")
      .update({
        text: opt.text,
        is_correct: isCorrect(opt.label),
        image_url: opt.imageUrl,
      })
      .eq("id", existingOpt.id);
    return error ? { error: error.message } : null;
  });

  const optionResults = await Promise.all(optionUpdates);
  const optionError = optionResults.find((r) => r && "error" in r);
  if (optionError) {
    return { kind: "error", message: optionError.error };
  }

  // Concept-tags write (Phase 1). Only when the caller explicitly provides
  // `conceptTags` (omitted = leave existing tags untouched; empty array = clear).
  // Validates each (subtopicSlug, conceptSlug) against the question's final
  // subtopic via the notes registry; an invalid pair returns an error AFTER
  // the question UPDATE has already succeeded — last-write-wins for the
  // question, tags don't write on failure.
  if (payload.conceptTags !== undefined) {
    if (payload.conceptTags.length > 0) {
      if (!payload.subtopicId) {
        return {
          kind: "invalid_concept_tag",
          reason: "cannot tag a question with no subtopic",
        };
      }
      const { data: subtopicRow } = await client
        .from("subtopics")
        .select("name")
        .eq("id", payload.subtopicId)
        .maybeSingle<{ name: string }>();
      if (!subtopicRow) {
        return {
          kind: "invalid_concept_tag",
          reason: "subtopic for tagging could not be loaded",
        };
      }
      for (const tag of payload.conceptTags) {
        const err = validateConceptTag(
          subtopicRow.name,
          tag.subtopicSlug,
          tag.conceptSlug
        );
        if (err) return { kind: "invalid_concept_tag", reason: err };
      }
    }
    try {
      await setTagsForQuestion(client, questionId, payload.conceptTags);
    } catch (tagErr) {
      // Tag write failure is non-blocking — log and continue. The question
      // UPDATE has already succeeded; tags are metadata.
      console.warn(
        `concept tags write failed for question ${questionId}: ${
          tagErr instanceof Error ? tagErr.message : String(tagErr)
        }`
      );
    }
  }

  // Orphan cleanup: any old image path no longer referenced gets deleted.
  const newPaths = new Set<string>();
  if (payload.imageUrl) newPaths.add(payload.imageUrl);
  for (const opt of payload.options) {
    if (opt.imageUrl) newPaths.add(opt.imageUrl);
  }
  const oldPaths = new Set<string>();
  if (existing.image_url) oldPaths.add(existing.image_url);
  for (const opt of existing.options) {
    if (opt.image_url) oldPaths.add(opt.image_url);
  }
  const orphans = Array.from(oldPaths).filter((p) => !newPaths.has(p));
  await Promise.all(
    orphans.map(async (path) => {
      try {
        await deleteImage(client, path);
      } catch (err) {
        console.warn(
          `failed to delete orphaned image ${path}: ${err instanceof Error ? err.message : err}`
        );
      }
    })
  );

  return { kind: "ok", orphanedImagePaths: orphans };
}

function checkImagePathPrefix(
  payload: EditQuestionPayload,
  callerOrgId: string
): ApplyEditResult | null {
  const requiredPrefix = `${callerOrgId}/`;
  if (payload.imageUrl && !payload.imageUrl.startsWith(requiredPrefix)) {
    return {
      kind: "invalid_image_path",
      field: "imageUrl",
      path: payload.imageUrl,
    };
  }
  for (const opt of payload.options) {
    if (opt.imageUrl && !opt.imageUrl.startsWith(requiredPrefix)) {
      return {
        kind: "invalid_image_path",
        field: `options.${opt.label}.imageUrl`,
        path: opt.imageUrl,
      };
    }
  }
  return null;
}

async function validateTaxonomy(
  client: SupabaseClient,
  examId: string,
  payload: EditQuestionPayload
): Promise<ApplyEditResult | null> {
  const { data: subject } = await client
    .from("subjects")
    .select("id, exam_id")
    .eq("id", payload.subjectId)
    .maybeSingle();
  if (!subject || subject.exam_id !== examId) {
    return {
      kind: "invalid_taxonomy",
      reason: "subject does not belong to the question's exam",
    };
  }

  const { data: chapter } = await client
    .from("chapters")
    .select("id, subject_id")
    .eq("id", payload.chapterId)
    .maybeSingle();
  if (!chapter || chapter.subject_id !== payload.subjectId) {
    return {
      kind: "invalid_taxonomy",
      reason: "chapter does not belong to the chosen subject",
    };
  }

  if (payload.subtopicId) {
    const { data: subtopic } = await client
      .from("subtopics")
      .select("id, chapter_id")
      .eq("id", payload.subtopicId)
      .maybeSingle();
    if (!subtopic || subtopic.chapter_id !== payload.chapterId) {
      return {
        kind: "invalid_taxonomy",
        reason: "subtopic does not belong to the chosen chapter",
      };
    }
  }

  return null;
}
