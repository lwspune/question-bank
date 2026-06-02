import type { SupabaseClient } from "@supabase/supabase-js";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { getConceptIdentity } from "./conceptIdentity";
import {
  REPORT_DETAILS_MAX,
  isConceptReportCategory,
  type ConceptReportCategory,
} from "./types";

export type CreateConceptReportInput = {
  /** Globally-unique notes subtopic slug. */
  subtopicSlug: string;
  /** Concept slug within that subtopic. */
  conceptSlug: string;
  /** Must equal auth.uid() for the calling JWT — RLS enforces this. */
  reportedBy: string;
  category: ConceptReportCategory;
  /** Optional free-text context. Capped at REPORT_DETAILS_MAX. */
  details: string | null;
};

export type CreateConceptReportResult =
  | { kind: "ok"; id: string }
  | { kind: "duplicate_open_report" }
  | { kind: "unknown_concept" }
  | { kind: "org_unresolved" }
  | { kind: "invalid_category" }
  | { kind: "invalid_details" }
  | { kind: "error"; message: string };

const UNIQUE_VIOLATION = "23505";

/**
 * Creates a concept_reports row on behalf of the authenticated caller.
 *
 * A concept has no DB row and the taxonomy is org-less, so we (1) validate the
 * (subtopicSlug, conceptSlug) pair against the shipped notes registry — a
 * tampered request for a non-existent concept is rejected — and (2) resolve
 * the owning org from a PUBLIC question in the concept's subtopic, mirroring
 * the question-report model ("routes to the admins who own the content").
 *
 * RLS enforces `reported_by = auth.uid()`. The partial unique index on
 * (reported_by, subtopic_slug, concept_slug) WHERE status='open' blocks repeat
 * reports while a previous one is unresolved.
 *
 * Must be called with a user-bound SupabaseClient (not service role).
 */
export async function createConceptReport(
  client: SupabaseClient,
  input: CreateConceptReportInput
): Promise<CreateConceptReportResult> {
  if (!isConceptReportCategory(input.category)) {
    return { kind: "invalid_category" };
  }
  if (input.details !== null && input.details.length > REPORT_DETAILS_MAX) {
    return { kind: "invalid_details" };
  }

  const identity = getConceptIdentity(input.subtopicSlug, input.conceptSlug);
  if (!identity) {
    return { kind: "unknown_concept" };
  }

  // Resolve the owning org from a PUBLIC question in the concept's subtopic.
  // Taxonomy is global (no org_id), so the bank content is the only org anchor.
  let subtopicId: string | null = null;
  try {
    const taxonomy = await resolveTaxonomy(
      client,
      identity.examName,
      identity.subjectName
    );
    subtopicId =
      taxonomy.chapters
        .get(identity.chapterName)
        ?.subtopics.get(identity.subtopicName) ?? null;
  } catch (err) {
    return {
      kind: "error",
      message: `taxonomy resolve failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
  if (!subtopicId) {
    return { kind: "org_unresolved" };
  }

  const { data: question, error: qErr } = await client
    .from("questions")
    .select("org_id")
    .eq("subtopic_id", subtopicId)
    .eq("visibility", "PUBLIC")
    .limit(1)
    .maybeSingle();
  if (qErr) {
    return { kind: "error", message: `org lookup failed: ${qErr.message}` };
  }
  if (!question) {
    return { kind: "org_unresolved" };
  }

  const { data: inserted, error: insErr } = await client
    .from("concept_reports")
    .insert({
      subtopic_slug: identity.subtopicSlug,
      concept_slug: identity.conceptSlug,
      exam_name: identity.examName,
      subject_name: identity.subjectName,
      chapter_name: identity.chapterName,
      subtopic_name: identity.subtopicName,
      concept_name: identity.conceptName,
      subject_route: identity.subjectRoute,
      chapter_slug: identity.chapterSlug,
      reported_by: input.reportedBy,
      org_id: (question as { org_id: string }).org_id,
      category: input.category,
      details: input.details ?? null,
    })
    .select("id")
    .single();

  if (insErr) {
    if (insErr.code === UNIQUE_VIOLATION) {
      return { kind: "duplicate_open_report" };
    }
    return { kind: "error", message: insErr.message };
  }

  return { kind: "ok", id: (inserted as { id: string }).id };
}
