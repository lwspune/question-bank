"use server";

/**
 * Server actions for the collaborative paper builder. Each runs as the signed-in
 * user (cookie-bound authed client) so RLS — org-scoping + editor-only writes —
 * is the real boundary; these wrappers just guard the session, call the data
 * layer, and revalidate. Any org member (ADMIN or TEACHER) is an editor.
 */
import { revalidatePath } from "next/cache";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createPaper,
  deletePaper,
  getPaperDetail,
  listPapers,
  addQuestion,
  addQuestionsToPaper,
  removeQuestion,
  moveQuestion,
  reorderQuestion,
  updatePaperTitle,
  updateSectionTemplate,
  finalizePaper,
  reopenPaper,
} from "@/lib/papers/admin";
import { queryQuestions } from "@/lib/questions/query";
import { EMPTY_FILTERS, type Difficulty } from "@/lib/questions/filters";
import type { SectionTemplate } from "@/lib/papers/types";
import { getQuestionUsage, type UsageRef } from "@/lib/papers/usage";

type Ok<T = unknown> = { ok: true } & T;
type Err = { ok: false; error: string };
type Result<T = unknown> = Ok<T> | Err;

async function requireMember() {
  const member = await getSessionMember();
  // getSessionMember only returns org members (ADMIN | TEACHER) — both are editors.
  if (!member) return null;
  return member;
}

function revalidatePaper(paperId?: string) {
  revalidatePath("/dashboard/papers");
  if (paperId) revalidatePath(`/dashboard/papers/${paperId}`);
}

export async function createPaperAction(title: string): Promise<Result<{ id: string }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  const clean = title.trim();
  if (!clean) return { ok: false, error: "Give the paper a title." };
  try {
    const client = createSupabaseServerClient();
    const id = await createPaper(client, {
      orgId: member.orgId,
      createdBy: member.user.id,
      title: clean,
    });
    revalidatePaper(id);
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Active (draft) papers in the caller's org — feeds the cart's "Add to paper" picker. */
export async function listActivePapersAction(): Promise<
  Result<{ papers: { id: string; title: string }[] }>
> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const all = await listPapers(client);
    const papers = all
      .filter((p) => p.status === "draft")
      .map((p) => ({ id: p.id, title: p.title }));
    return { ok: true, papers };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Commit a set of questions (the /browse cart) to a paper. Idempotent. */
export async function addCartToPaperAction(
  paperId: string,
  questionIds: string[]
): Promise<Result<{ added: number; alreadyIn: number }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const { added, alreadyIn } = await addQuestionsToPaper(
      client,
      paperId,
      questionIds,
      member.user.id
    );
    revalidatePaper(paperId);
    return { ok: true, added, alreadyIn };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function deletePaperAction(paperId: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await deletePaper(client, paperId);
    // RLS denies silently (0 rows) for a non-creator non-admin — verify.
    const still = await getPaperDetail(client, paperId);
    if (still) return { ok: false, error: "Only the paper's creator or an admin can delete it." };
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function updateTitleAction(paperId: string, title: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  const clean = title.trim();
  if (!clean) return { ok: false, error: "Title can't be empty." };
  try {
    const client = createSupabaseServerClient();
    await updatePaperTitle(client, paperId, clean);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function addQuestionAction(
  paperId: string,
  questionId: string,
  sectionKey?: string
): Promise<Result<{ sectionKey: string }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const { sectionKey: landed } = await addQuestion(client, paperId, questionId, {
      sectionKey,
      addedBy: member.user.id,
    });
    revalidatePaper(paperId);
    return { ok: true, sectionKey: landed };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function removeQuestionAction(paperId: string, questionId: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await removeQuestion(client, paperId, questionId);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function moveQuestionAction(
  paperId: string,
  questionId: string,
  toSectionKey: string
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await moveQuestion(client, paperId, questionId, toSectionKey);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function reorderQuestionAction(
  paperId: string,
  questionId: string,
  position: number
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await reorderQuestion(client, paperId, questionId, position);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function updateTemplateAction(
  paperId: string,
  template: SectionTemplate
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await updateSectionTemplate(client, paperId, template);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function finalizeAction(paperId: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await finalizePaper(client, paperId);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function reopenAction(paperId: string): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await reopenPaper(client, paperId);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export type SearchRow = {
  id: string;
  text: string;
  subject: string;
  chapter: string;
  difficulty: Difficulty;
  /** Other papers in the org that already use this question (soft-warn). */
  usedIn: UsageRef[];
};

/** Cross-paper usage for a set of questions, excluding the current paper.
 *  Feeds the cart "Add to paper" dialog's soft-warn summary. */
export async function questionUsageAction(
  questionIds: string[],
  excludePaperId?: string
): Promise<Result<{ usage: Record<string, UsageRef[]> }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const map = await getQuestionUsage(client, questionIds, excludePaperId);
    return { ok: true, usage: Object.fromEntries(map) };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Subjects for an exam — feeds the add panel's subject dropdown. */
export async function listSubjectsAction(
  examId: string
): Promise<Result<{ subjects: { id: string; name: string }[] }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const { data } = await client
      .from("subjects")
      .select("id, name")
      .eq("exam_id", examId)
      .order("name");
    return { ok: true, subjects: (data ?? []) as { id: string; name: string }[] };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Question search for the embedded add panel — reuses the bank query pipeline. */
export async function searchQuestionsAction(input: {
  examId?: string | null;
  subjectId?: string | null;
  q?: string;
  difficulty?: Difficulty | null;
  kind?: "pyq" | "practice" | "all";
  page?: number;
  /** The paper being edited — excluded from the usage soft-warn. */
  paperId?: string;
}): Promise<Result<{ rows: SearchRow[]; totalCount: number; pageSize: number }>> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const pageSize = 10;
    const result = await queryQuestions(
      client,
      null,
      {
        ...EMPTY_FILTERS,
        examId: input.examId ?? null,
        subjectId: input.subjectId ?? null,
        difficulties: input.difficulty ? [input.difficulty] : [],
        kind: input.kind ?? "all",
        q: input.q?.trim() ?? "",
        page: input.page && input.page > 0 ? input.page : 1,
      },
      pageSize
    );
    // Cross-paper soft-warn: which of these are already used elsewhere in the org.
    const usage = await getQuestionUsage(
      client,
      result.rows.map((r) => r.id),
      input.paperId
    );
    const rows: SearchRow[] = result.rows.map((r) => ({
      id: r.id,
      text: r.text,
      subject: r.subject.name,
      chapter: r.chapter.name,
      difficulty: r.difficulty,
      usedIn: usage.get(r.id) ?? [],
    }));
    return { ok: true, rows, totalCount: result.totalCount, pageSize };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
