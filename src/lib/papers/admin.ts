/**
 * Data-access layer for the collaborative paper builder (migration 0039).
 *
 * Every function takes a SupabaseClient so callers control the auth context:
 * the dashboard server actions pass the cookie-bound authed client (RLS is the
 * security boundary — org-scoping + editor-only writes are enforced in Postgres,
 * not here), and the integration test passes per-user JWT clients to prove the
 * RLS walls hold. No service-role client is used for papers.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DEFAULT_GAT_TEMPLATE,
  subjectToSectionKey,
  UNASSIGNED_KEY,
} from "./template";
import { buildSnapshot, planBulkAdd } from "./sections";
import { formatBatchLabel } from "@/lib/batches/validate";
import type {
  SectionTemplate,
  MembershipRow,
  PaperStatus,
  PaperSnapshot,
} from "./types";

/** Flatten a PostgREST to-one embed that may arrive as an object or 1-array. */
function flattenBatch(
  b: { name: string; branch: string | null } | { name: string; branch: string | null }[] | null
): { name: string; branch: string | null } | null {
  return Array.isArray(b) ? b[0] ?? null : b;
}

export type PaperListItem = {
  id: string;
  title: string;
  status: PaperStatus;
  questionCount: number;
  updatedAt: string;
  createdBy: string | null;
  batchId: string | null;
  /** "FC Road · Morning" or the bare batch name; null when un-batched. */
  batchLabel: string | null;
};

export type PaperMembership = MembershipRow & { addedBy: string | null };

export type PaperDetail = {
  id: string;
  title: string;
  status: PaperStatus;
  examId: string | null;
  sectionTemplate: SectionTemplate;
  membership: PaperMembership[];
  snapshot: PaperSnapshot | null;
  createdBy: string | null;
  updatedAt: string;
  batchId: string | null;
  batchLabel: string | null;
};

// ── reads ─────────────────────────────────────────────────────────────────

/** The caller's org papers, most-recently-touched first. RLS scopes to own org. */
export async function listPapers(client: SupabaseClient): Promise<PaperListItem[]> {
  const { data, error } = await client
    .from("papers")
    .select(
      "id, title, status, updated_at, created_by, batch_id, batch:batches!batch_id(name, branch), paper_questions(count)"
    )
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`listPapers: ${error.message}`);

  type Raw = {
    id: string;
    title: string;
    status: PaperStatus;
    updated_at: string;
    created_by: string | null;
    batch_id: string | null;
    batch: { name: string; branch: string | null } | { name: string; branch: string | null }[] | null;
    paper_questions: { count: number }[] | null;
  };
  return ((data ?? []) as Raw[]).map((r) => {
    const batch = flattenBatch(r.batch);
    return {
      id: r.id,
      title: r.title,
      status: r.status,
      updatedAt: r.updated_at,
      createdBy: r.created_by,
      questionCount: r.paper_questions?.[0]?.count ?? 0,
      batchId: r.batch_id,
      batchLabel: batch ? formatBatchLabel(batch) : null,
    };
  });
}

export async function getPaperDetail(
  client: SupabaseClient,
  paperId: string
): Promise<PaperDetail | null> {
  const { data: paper, error } = await client
    .from("papers")
    .select(
      "id, title, status, exam_id, section_template, finalized_snapshot, created_by, updated_at, batch_id, batch:batches!batch_id(name, branch)"
    )
    .eq("id", paperId)
    .maybeSingle();
  if (error) throw new Error(`getPaperDetail: ${error.message}`);
  if (!paper) return null;

  const batch = flattenBatch(
    paper.batch as { name: string; branch: string | null } | { name: string; branch: string | null }[] | null
  );

  const { data: rows, error: mErr } = await client
    .from("paper_questions")
    .select("question_id, section_key, position, added_by")
    .eq("paper_id", paperId)
    .order("section_key", { ascending: true })
    .order("position", { ascending: true });
  if (mErr) throw new Error(`getPaperDetail membership: ${mErr.message}`);

  return {
    id: paper.id,
    title: paper.title,
    status: paper.status as PaperStatus,
    examId: paper.exam_id,
    sectionTemplate: (paper.section_template ?? []) as SectionTemplate,
    snapshot: (paper.finalized_snapshot ?? null) as PaperSnapshot | null,
    createdBy: paper.created_by,
    updatedAt: paper.updated_at,
    batchId: paper.batch_id,
    batchLabel: batch ? formatBatchLabel(batch) : null,
    membership: (rows ?? []).map((r) => ({
      questionId: r.question_id as string,
      sectionKey: r.section_key as string,
      position: r.position as number,
      addedBy: r.added_by as string | null,
    })),
  };
}

// ── mutations ───────────────────────────────────────────────────────────────

export async function createPaper(
  client: SupabaseClient,
  input: {
    orgId: string;
    createdBy: string;
    title: string;
    examId?: string | null;
    batchId?: string | null;
    template?: SectionTemplate;
  }
): Promise<string> {
  const { data, error } = await client
    .from("papers")
    .insert({
      org_id: input.orgId,
      created_by: input.createdBy,
      title: input.title,
      exam_id: input.examId ?? null,
      batch_id: input.batchId ?? null,
      section_template: input.template ?? DEFAULT_GAT_TEMPLATE,
    })
    .select("id")
    .single();
  if (error) throw new Error(`createPaper: ${error.message}`);
  return data.id as string;
}

async function touch(client: SupabaseClient, paperId: string): Promise<void> {
  await client
    .from("papers")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", paperId);
}

/** Guard: a finalized paper is frozen — block edits until it's reopened. */
async function assertDraft(client: SupabaseClient, paperId: string): Promise<SectionTemplate> {
  const { data, error } = await client
    .from("papers")
    .select("status, section_template")
    .eq("id", paperId)
    .maybeSingle();
  if (error) throw new Error(`assertDraft: ${error.message}`);
  if (!data) throw new Error("Paper not found.");
  if (data.status !== "draft") throw new Error("This paper is finalized. Reopen it to make changes.");
  return (data.section_template ?? []) as SectionTemplate;
}

/**
 * Add a question to a paper. The section is taken from `opts.sectionKey`, else
 * DERIVED from the question's subject (the elegant tie-in), else UNASSIGNED.
 * Concurrent / repeat adds are idempotent via the (paper_id, question_id) PK +
 * ignoreDuplicates — two teachers clicking the same question never error.
 */
export async function addQuestion(
  client: SupabaseClient,
  paperId: string,
  questionId: string,
  opts: { sectionKey?: string; addedBy?: string | null } = {}
): Promise<{ sectionKey: string }> {
  const template = await assertDraft(client, paperId);

  let sectionKey = opts.sectionKey;
  if (!sectionKey) {
    const { data: q } = await client
      .from("questions")
      .select("subject:subjects!subject_id(name)")
      .eq("id", questionId)
      .maybeSingle();
    const subjectRaw = (q as { subject?: { name: string } | { name: string }[] } | null)?.subject;
    const subjectName = Array.isArray(subjectRaw) ? subjectRaw[0]?.name : subjectRaw?.name;
    sectionKey = (subjectName && subjectToSectionKey(subjectName, template)) || UNASSIGNED_KEY;
  }

  const { data: top } = await client
    .from("paper_questions")
    .select("position")
    .eq("paper_id", paperId)
    .eq("section_key", sectionKey)
    .order("position", { ascending: false })
    .limit(1);
  const position = ((top?.[0]?.position as number | undefined) ?? 0) + 1;

  const { error } = await client.from("paper_questions").upsert(
    {
      paper_id: paperId,
      question_id: questionId,
      section_key: sectionKey,
      position,
      added_by: opts.addedBy ?? null,
    },
    { onConflict: "paper_id,question_id", ignoreDuplicates: true }
  );
  if (error) throw new Error(`addQuestion: ${error.message}`);

  await touch(client, paperId);
  return { sectionKey };
}

/**
 * Bulk-add questions to a paper (commits the /browse cart). Idempotent: ids
 * already in the paper are skipped and reported as `alreadyIn`. Each new id is
 * filed into the section matching its subject (else Unassigned) and appended.
 */
export async function addQuestionsToPaper(
  client: SupabaseClient,
  paperId: string,
  questionIds: string[],
  addedBy: string | null
): Promise<{ added: number; alreadyIn: number }> {
  const template = await assertDraft(client, paperId);

  const { data: existingRows, error: exErr } = await client
    .from("paper_questions")
    .select("question_id, section_key, position")
    .eq("paper_id", paperId);
  if (exErr) throw new Error(`addQuestionsToPaper existing: ${exErr.message}`);
  const existing = (existingRows ?? []).map((r) => ({
    questionId: r.question_id as string,
    sectionKey: r.section_key as string,
    position: r.position as number,
  }));

  const ids = Array.from(new Set(questionIds.filter(Boolean)));
  if (ids.length === 0) return { added: 0, alreadyIn: 0 };

  const { data: qrows, error: qErr } = await client
    .from("questions")
    .select("id, subject:subjects!subject_id(name)")
    .in("id", ids);
  if (qErr) throw new Error(`addQuestionsToPaper subjects: ${qErr.message}`);
  const subjectById = new Map<string, string | null>();
  for (const q of (qrows ?? []) as { id: string; subject?: { name: string } | { name: string }[] }[]) {
    const name = Array.isArray(q.subject) ? q.subject[0]?.name : q.subject?.name;
    subjectById.set(q.id, name ?? null);
  }

  const plan = planBulkAdd(ids, (id) => subjectById.get(id) ?? null, template, existing);
  if (plan.rows.length === 0) return { added: 0, alreadyIn: plan.alreadyIn };

  const { error } = await client.from("paper_questions").upsert(
    plan.rows.map((r) => ({
      paper_id: paperId,
      question_id: r.questionId,
      section_key: r.sectionKey,
      position: r.position,
      added_by: addedBy,
    })),
    { onConflict: "paper_id,question_id", ignoreDuplicates: true }
  );
  if (error) throw new Error(`addQuestionsToPaper: ${error.message}`);

  await touch(client, paperId);
  return { added: plan.added, alreadyIn: plan.alreadyIn };
}

export async function removeQuestion(
  client: SupabaseClient,
  paperId: string,
  questionId: string
): Promise<void> {
  await assertDraft(client, paperId);
  const { error } = await client
    .from("paper_questions")
    .delete()
    .eq("paper_id", paperId)
    .eq("question_id", questionId);
  if (error) throw new Error(`removeQuestion: ${error.message}`);
  await touch(client, paperId);
}

/** Move a question to another section (appended to the end of the target). */
export async function moveQuestion(
  client: SupabaseClient,
  paperId: string,
  questionId: string,
  toSectionKey: string
): Promise<void> {
  await assertDraft(client, paperId);
  const { data: top } = await client
    .from("paper_questions")
    .select("position")
    .eq("paper_id", paperId)
    .eq("section_key", toSectionKey)
    .order("position", { ascending: false })
    .limit(1);
  const position = ((top?.[0]?.position as number | undefined) ?? 0) + 1;
  const { error } = await client
    .from("paper_questions")
    .update({ section_key: toSectionKey, position })
    .eq("paper_id", paperId)
    .eq("question_id", questionId);
  if (error) throw new Error(`moveQuestion: ${error.message}`);
  await touch(client, paperId);
}

/** Set a question's absolute position within its section (fractional reorder). */
export async function reorderQuestion(
  client: SupabaseClient,
  paperId: string,
  questionId: string,
  position: number
): Promise<void> {
  await assertDraft(client, paperId);
  const { error } = await client
    .from("paper_questions")
    .update({ position })
    .eq("paper_id", paperId)
    .eq("question_id", questionId);
  if (error) throw new Error(`reorderQuestion: ${error.message}`);
  await touch(client, paperId);
}

export async function updatePaperTitle(
  client: SupabaseClient,
  paperId: string,
  title: string
): Promise<void> {
  const { error } = await client
    .from("papers")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", paperId);
  if (error) throw new Error(`updatePaperTitle: ${error.message}`);
}

/**
 * Replace the section template. Deleting a section is non-destructive: its
 * questions keep their section_key and simply render under "Unassigned" (any
 * membership whose key isn't a current template key) until re-filed — so no
 * teacher's contribution is ever silently dropped.
 */
export async function updateSectionTemplate(
  client: SupabaseClient,
  paperId: string,
  template: SectionTemplate
): Promise<void> {
  await assertDraft(client, paperId);
  const { error } = await client
    .from("papers")
    .update({ section_template: template, updated_at: new Date().toISOString() })
    .eq("id", paperId);
  if (error) throw new Error(`updateSectionTemplate: ${error.message}`);
}

/** Freeze composition + flip to finalized (snapshot mirrors quizzes.questions, 0035). */
export async function finalizePaper(
  client: SupabaseClient,
  paperId: string
): Promise<void> {
  const detail = await getPaperDetail(client, paperId);
  if (!detail) throw new Error("Paper not found.");
  const snapshot = buildSnapshot(detail.sectionTemplate, detail.membership);
  const { error } = await client
    .from("papers")
    .update({
      status: "finalized",
      finalized_snapshot: snapshot,
      finalized_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", paperId);
  if (error) throw new Error(`finalizePaper: ${error.message}`);
}

export async function reopenPaper(
  client: SupabaseClient,
  paperId: string
): Promise<void> {
  const { error } = await client
    .from("papers")
    .update({
      status: "draft",
      finalized_snapshot: null,
      finalized_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", paperId);
  if (error) throw new Error(`reopenPaper: ${error.message}`);
}

/** Delete a paper. RLS allows this only for the creator or an org ADMIN. */
export async function deletePaper(
  client: SupabaseClient,
  paperId: string
): Promise<void> {
  const { error } = await client.from("papers").delete().eq("id", paperId);
  if (error) throw new Error(`deletePaper: ${error.message}`);
}
