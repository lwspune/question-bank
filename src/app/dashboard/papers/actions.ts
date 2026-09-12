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
  listDraftPapersForPicker,
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
import { getConductedExposure, type ConductedRef } from "@/lib/papers/conducted";
import { setPaperBatch, listBatches } from "@/lib/batches/admin";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";
import { queryQuestionsByIds } from "@/lib/questions/query";
import {
  buildPaperPushPayload,
  pushDisabledReason,
  planPush,
  trackerExamId,
  PUSH_CAP,
  type PriorSitting,
} from "@/lib/sync/paperPush";
import { listPaperSittings, recordPaperSitting } from "@/lib/sync/paperSittings";
import { getTrackerTarget, paperImportUrl } from "@/lib/sync/trackerTarget";

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

export async function createPaperAction(
  title: string,
  batchId?: string | null
): Promise<Result<{ id: string }>> {
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
      batchId: batchId || null,
    });
    revalidatePaper(id);
    return { ok: true, id };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Point a paper at a batch (or clear it). Drives the per-batch repeat warning. */
export async function setPaperBatchAction(
  paperId: string,
  batchId: string | null
): Promise<Result> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    await setPaperBatch(client, paperId, batchId || null);
    revalidatePaper(paperId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/**
 * Draft papers for the cart's "Add to paper" picker — recency-capped + optionally
 * narrowed by title/batch (filtered in SQL). Drafts accumulate, so an unbounded
 * list clogged the dropdown; this caps to the most recent and lets the caller
 * search / filter to reach the rest.
 */
export async function listActivePapersAction(
  opts: { query?: string; batchId?: string | null } = {}
): Promise<
  Result<{ papers: { id: string; title: string; batchLabel: string | null }[] }>
> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const papers = await listDraftPapersForPicker(client, {
      query: opts.query,
      batchId: opts.batchId ?? null,
    });
    return { ok: true, papers };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

/** Active batches (for the "Add to paper" picker's batch filter). */
export async function listPickerBatchesAction(): Promise<
  Result<{ batches: { id: string; label: string }[] }>
> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };
  try {
    const client = createSupabaseServerClient();
    const batches = await listBatches(client);
    return {
      ok: true,
      batches: batches
        .filter((b) => !b.archived)
        .map((b) => ({
          id: b.id,
          label: b.branchName ? `${b.branchName} · ${b.name}` : b.name,
        })),
    };
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
  /** Sittings this org actually CONDUCTED it in — a different fact from usedIn. */
  satBy: ConductedRef[];
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
  /** The paper's batch — scopes the repeat warning to that cohort (0054). */
  batchId?: string | null;
}): Promise<
  Result<{
    rows: SearchRow[];
    totalCount: number;
    pageSize: number;
    /** The target batch's name, for labelling an exposure chip. */
    batchName: string | null;
  }>
> {
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
    // Soft-warn: which of these are already used elsewhere. Batch-scoped when the
    // paper targets a batch (repeat FOR THIS COHORT), else org-wide.
    const usage = await getQuestionUsage(
      client,
      result.rows.map((r) => r.id),
      input.paperId,
      input.batchId ?? null
    );
    // The other kind of repeat: sittings the institute actually conducted.
    // Advisory, so a failure costs chips rather than the search.
    const conducted = await getConductedExposure(
      client,
      result.rows.map((r) => r.id),
      member.orgId
    ).catch(() => new Map<string, ConductedRef[]>());
    // The batch NAME, resolved server-side — exposure is matched against the
    // name the tracker recorded, and the client must not be able to supply it.
    let batchName: string | null = null;
    if (input.batchId) {
      const { data: b } = await client
        .from("batches")
        .select("name")
        .eq("id", input.batchId)
        .maybeSingle();
      batchName = (b as { name: string } | null)?.name ?? null;
    }
    const rows: SearchRow[] = result.rows.map((r) => ({
      id: r.id,
      text: r.text,
      subject: r.subject.name,
      chapter: r.chapter.name,
      difficulty: r.difficulty,
      usedIn: usage.get(r.id) ?? [],
      satBy: conducted.get(r.id) ?? [],
    }));
    return { ok: true, rows, totalCount: result.totalCount, pageSize, batchName };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/**
 * Push a paper to this institute's nda-tracker as a DRAFT exam.
 *
 * ADDITIVE — this does not replace the tagged sheet, and is not allowed to
 * become load-bearing. A failure here leaves the paper fully deliverable via
 * Tags + docx, which remain the proven path; the push exists to carry the
 * DIAGRAMS a text-only sheet drops.
 *
 * Reads run through the cookie-bound client so RLS scopes the paper and its
 * questions to the caller's org exactly as the rest of this file does. Only the
 * tracker credential is read service-role, because `tracker_sync_targets` is
 * deliberately unreadable to any JWT.
 */
/**
 * What a Push click produced.
 *
 * `needs_choice` is the third outcome and the reason this is not a plain
 * `Result`: the paper has been pushed before, so the click is ambiguous between
 * "update that draft" and "I am conducting it again". The UI must ASK, and it
 * needs the facts to ask with.
 */
export type PushOutcome =
  | {
      ok: true;
      examId: string;
      questionCount: number;
      sittingNo: number;
      warning?: string;
    }
  | { ok: false; needsChoice: true; sittings: PriorSitting[]; nextSittingNo: number; conducted: boolean; note: string }
  | { ok: false; error: string };

/**
 * Push a paper to this institute's nda-tracker as a DRAFT exam.
 *
 * Called with no `choice` this is the FIRST click: it pushes straight through
 * when the paper has never been pushed, and otherwise returns `needsChoice`
 * without touching the tracker. The UI then calls again with an explicit
 * sitting.
 */
export async function pushPaperToTrackerAction(
  paperId: string,
  /**
   * INTENT, never a sitting number. The server allocates the number from data
   * it reads itself, so a tab left open since before someone else pushed cannot
   * name a sitting that has since been taken — it simply gets the next one.
   */
  choice?: { intent: "new" | "update"; label?: string | null }
): Promise<PushOutcome> {
  const member = await requireMember();
  if (!member) return { ok: false, error: "Not authorized." };

  try {
    const client = createSupabaseServerClient();
    const detail = await getPaperDetail(client, paperId);
    if (!detail) return { ok: false, error: "Paper not found." };

    const ids = detail.membership.map((m) => m.questionId);

    // Resolve the target BEFORE validating the paper, so this agrees with
    // `pushDisabledReason`'s own precedence — "no tracker configured" outranks
    // "no questions", because it is the reason the user cannot fix by editing.
    // Checking the paper first would tell someone to add questions when the real
    // problem is that their institute has no tracker, and the button's tooltip
    // would then disagree with the error the click produces.
    const target = await getTrackerTarget(member.orgId);
    const reason = pushDisabledReason({
      hasTarget: !!target,
      count: ids.length,
      cap: PUSH_CAP,
    });
    if (reason || !target) {
      return { ok: false, error: reason ?? "No tracker configured for this institute." };
    }

    // Same ordered rows the docx and the tags sheet are built from — so the
    // pushed Q-numbers match the printed paper by construction.
    const questions = await queryQuestionsByIds(client, ids);
    const byId = new Map(questions.map((q) => [q.id, q]));
    const ordered = ids.map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => !!q);

    // A question the caller cannot read is a question the tracker must not be
    // told about. Report rather than silently push a short paper.
    if (ordered.length !== ids.length) {
      return {
        ok: false,
        error: `${ids.length - ordered.length} of ${ids.length} questions could not be read — not pushing a partial paper.`,
      };
    }

    const tagMap = await getResourceTagsForQuestions(client, ids);
    const conceptTags = new Map(
      Array.from(tagMap.entries())
        .filter(([, t]) => t.conceptTags.length > 0)
        .map(([id, t]) => [id, t.conceptTags[0]] as const)
    );

    // ── Which SITTING is this? ──────────────────────────────────────────
    // Re-derived server-side even when the UI supplied a choice: a tab left
    // open since before someone else pushed must not be able to allocate a
    // sitting number that has since been taken.
    const sittings = await listPaperSittings(client, paperId);
    const plan = planPush(sittings);

    if (!choice && plan.kind === "ask") {
      // THE TRIGGER IS "A SITTING EXISTS", NOT "IT HAS RESULTS", and that is
      // forced rather than chosen. The tracker cannot know a conduct happened
      // until the Evalbee sheet arrives days later — `date` defaults to the
      // push date and `batch` is only set at results upload — so results lag
      // the conduct, and keying on them leaves a window in which a push
      // silently overwrites an exam students have already sat.
      return {
        ok: false,
        needsChoice: true,
        sittings,
        nextSittingNo: plan.nextSittingNo,
        conducted: false,
        note: "",
      };
    }

    // Numbers are ALLOCATED HERE, from the rows just read. "update" targets the
    // latest existing sitting; "new" takes one past the highest ever used, never
    // a recycled number — a sitting deleted tracker-side must not free its id,
    // because the exam may still be there.
    const sittingNo =
      plan.kind === "create"
        ? 1
        : choice?.intent === "update"
          ? plan.latest.sittingNo
          : plan.nextSittingNo;
    // Updating without typing a new label KEEPS the existing one — otherwise a
    // re-push to fix a typo would silently blank the exam's name, and nothing
    // downstream could put it back.
    const keepExistingLabel =
      choice?.intent === "update" && !choice.label?.trim() && plan.kind === "ask";
    const label = keepExistingLabel
      ? plan.latest.label
      : choice?.label?.trim() || null;

    const body = buildPaperPushPayload({
      questions: ordered,
      paperId,
      title: detail.title,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      conceptTags,
      sittingNo,
      label,
    });

    const res = await fetch(paperImportUrl(target), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${target.sharedSecret}`,
      },
      body: JSON.stringify(body),
    });

    const json = (await res.json().catch(() => ({}))) as {
      error?: string;
      code?: string;
      examId?: string;
      questionCount?: number;
      resultCount?: number;
      warning?: string;
    };

    if (!res.ok) {
      // A 409 with `has_results` is NOT a dead end — it is the tracker telling
      // us this sitting was conducted. Two things follow. First, it is the only
      // evidence we get that a PRE-SITTINGS push exists (the vault kept no
      // record before migration 0097 and the tracker exposes no list endpoint),
      // so record it now — that is the whole backfill. Second, offer the next
      // sitting rather than making the operator read a refusal and guess.
      if (res.status === 409 && json.code === "has_results") {
        await recordPaperSitting(client, {
          paperId,
          sittingNo,
          trackerExamId: json.examId ?? trackerExamId(paperId, sittingNo),
          label,
          pushedBy: member.user.id ?? null,
        });
        const known = await listPaperSittings(client, paperId);
        const next = planPush(known);
        return {
          ok: false,
          needsChoice: true,
          sittings: known,
          nextSittingNo: next.kind === "ask" ? next.nextSittingNo : 1,
          conducted: true,
          note: json.error ?? "",
        };
      }
      // Otherwise surface the tracker's own words — the operator needs to know
      // WHICH exam, not a generic failure.
      return {
        ok: false,
        error: json.error ?? `Tracker returned ${res.status}.`,
      };
    }

    const examId = json.examId ?? trackerExamId(paperId, sittingNo);
    // Recorded AFTER the tracker confirms, never before: a row here claims an
    // exam exists, and claiming one that does not would make the next push
    // allocate around a sitting nobody can find.
    await recordPaperSitting(client, {
      paperId,
      sittingNo,
      trackerExamId: examId,
      label,
      pushedBy: member.user.id ?? null,
    });

    return {
      ok: true,
      examId,
      questionCount: json.questionCount ?? body.questions.length,
      sittingNo,
      warning: json.warning,
    };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}
