/**
 * Service-role reads and writes for the grading scripts (scripts/grading/).
 * Not "server-only": the tsx runners import it. Takes the client as a
 * parameter, like the email services.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadBoardQuestions } from "@/lib/questionPapers/query";
import type { BoardQuestion } from "@/lib/board/query";
import type { PaperItemRow } from "@/lib/questionPapers/listing";
import type { BriefPaper } from "./brief";
import { ANSWER_SHEETS_BUCKET, isScanFile } from "./upload";
import type { GradeFile, GradeOutcome } from "./grade";
import { getExamByName } from "@/lib/exam/examContext";
import { slugify } from "@/lib/board/query";
import { SITE_URL } from "@/lib/email/templates";

export type QueuedSheet = {
  id: string;
  userId: string;
  paperId: string;
  fileCount: number;
  submittedAt: string;
};

/** Sheets waiting to be graded, oldest first. */
export async function readQueue(admin: SupabaseClient): Promise<QueuedSheet[]> {
  const { data, error } = await admin
    .from("answer_submissions")
    .select("id, user_id, board_paper_id, file_count, submitted_at")
    .eq("status", "submitted")
    .order("submitted_at")
    .limit(500);
  if (error) throw new Error(`grading queue: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id as string,
    userId: r.user_id as string,
    paperId: r.board_paper_id as string,
    fileCount: r.file_count as number,
    submittedAt: r.submitted_at as string,
  }));
}

/** One sheet in any state (a regrade). Throws if it does not exist. */
export async function readSheet(admin: SupabaseClient, id: string): Promise<QueuedSheet> {
  const { data: r, error } = await admin
    .from("answer_submissions")
    .select("id, user_id, board_paper_id, file_count, submitted_at, status")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`answer sheet ${id}: ${error.message}`);
  if (!r || !r.submitted_at) throw new Error(`answer sheet ${id}: not found, or never sent`);
  return {
    id: r.id as string,
    userId: r.user_id as string,
    paperId: r.board_paper_id as string,
    fileCount: r.file_count as number,
    submittedAt: r.submitted_at as string,
  };
}

/**
 * A graded sheet's saved grade, in grade.json form, or null if it has none.
 * Its page marks come back as they were placed (migration 0175), so a regrade
 * moves or fixes marks rather than placing them all again.
 */
export async function readSavedGrade(admin: SupabaseClient, id: string): Promise<GradeFile | null> {
  const { data: sub, error } = await admin
    .from("answer_submissions")
    .select("status, went_well, next_steps")
    .eq("id", id)
    .single();
  if (error) throw new Error(`saved grade ${id}: ${error.message}`);
  if (sub.status !== "graded") return null;
  const [{ data: rows, error: gErr }, { data: marks, error: mErr }] = await Promise.all([
    admin
      .from("answer_grades")
      .select("position, max_marks, outcome, awarded, earned, missing, cause, topic")
      .eq("submission_id", id)
      .order("position"),
    admin
      .from("answer_page_marks")
      .select("position, page, kind, x, y, w, h, text, to_x, to_y")
      .eq("submission_id", id)
      .order("seq"),
  ]);
  if (gErr) throw new Error(`saved grade rows ${id}: ${gErr.message}`);
  if (mErr) throw new Error(`saved page marks ${id}: ${mErr.message}`);
  return {
    submissionId: id,
    wentWell: (sub.went_well as string) ?? "",
    nextSteps: (sub.next_steps as string) ?? "",
    grades: (rows ?? []).map((g) => ({
      position: g.position as number,
      max: Number(g.max_marks),
      outcome: g.outcome as GradeOutcome,
      awarded: g.awarded === null ? null : Number(g.awarded),
      earned: (g.earned as string | null) ?? "",
      missing: (g.missing as string | null) ?? "",
      cause: (g.cause as string | null) ?? "",
      topic: (g.topic as string | null) ?? "",
    })),
    marks: (marks ?? []).map((m) => ({
      page: m.page as number,
      position: m.position as number,
      kind: m.kind as string,
      x: Number(m.x),
      y: Number(m.y),
      ...(m.kind === "circle" ? { w: Number(m.w), h: Number(m.h) } : {}),
      ...(m.kind === "note" ? { text: m.text as string } : {}),
      ...(m.to_x !== null ? { to: { x: Number(m.to_x), y: Number(m.to_y) } } : {}),
    })),
  };
}

export type SheetMeta = {
  status: string;
  userId: string;
  paperTitle: string;
  /** The paper's public page, for the rejection email. */
  paperUrl: string | null;
  totalAwarded: number | null;
  totalMax: number | null;
  /** The scans (and marked pages) were purged 30 days after checking. */
  scansDeleted: boolean;
  /** Each page's quarter-turns at the last commit (0175), for a regrade pull; null before. */
  pageTurns: number[] | null;
};

export async function readSheetMeta(admin: SupabaseClient, id: string): Promise<SheetMeta> {
  const { data, error } = await admin
    .from("answer_submissions")
    .select("status, user_id, total_awarded, total_max, scans_deleted_at, page_turns, board_papers(title, group_slug, exams(name), subjects(name))")
    .eq("id", id)
    .single();
  if (error) throw new Error(`answer sheet ${id}: ${error.message}`);
  type Named = { name: string } | { name: string }[] | null;
  const one = <T,>(v: T | T[] | null): T | null => (Array.isArray(v) ? v[0] ?? null : v);
  const p = one(data.board_papers as unknown as { title: string; group_slug: string; exams: Named; subjects: Named } | null);
  const examSlug = p ? getExamByName(one(p.exams)?.name ?? "")?.slug : undefined;
  return {
    status: data.status as string,
    userId: data.user_id as string,
    paperTitle: p?.title ?? "your board paper",
    paperUrl:
      p && examSlug ? `${SITE_URL}/question-papers/${examSlug}/${slugify(one(p.subjects)?.name ?? "")}/${p.group_slug}` : null,
    totalAwarded: data.total_awarded === null ? null : Number(data.total_awarded),
    totalMax: data.total_max === null ? null : Number(data.total_max),
    scansDeleted: data.scans_deleted_at !== null,
    pageTurns: (data.page_turns as number[] | null) ?? null,
  };
}

export type OpenQuestion = { submissionId: string; position: number; message: string; createdAt: string };

export async function readOpenQuestions(admin: SupabaseClient): Promise<OpenQuestion[]> {
  const { data, error } = await admin
    .from("answer_grade_disputes")
    .select("submission_id, position, message, created_at")
    .is("resolved_at", null)
    .order("created_at")
    .limit(500);
  if (error) throw new Error(`grade questions: ${error.message}`);
  return (data ?? []).map((r) => ({
    submissionId: r.submission_id as string,
    position: r.position as number,
    message: r.message as string,
    createdAt: r.created_at as string,
  }));
}

export type GradingPaper = { paper: BriefPaper & { id: string }; items: PaperItemRow[]; questions: BoardQuestion[] };

/** A paper as the grader needs it, published or not (service role). */
export async function loadGradingPaper(admin: SupabaseClient, paperId: string): Promise<GradingPaper> {
  const { data: p, error } = await admin
    .from("board_papers")
    .select("id, title, total_marks, duration_minutes, sections")
    .eq("id", paperId)
    .single();
  if (error) throw new Error(`grading paper ${paperId}: ${error.message}`);
  const { data: rows, error: itemErr } = await admin
    .from("board_paper_items")
    .select("position, printed_number, section, marks, alternative_to, part_of, case_key, question_id")
    .eq("paper_id", paperId)
    .order("position");
  if (itemErr) throw new Error(`grading paper items: ${itemErr.message}`);
  const items: PaperItemRow[] = (rows ?? []).map((i) => ({
    position: i.position as number,
    printedNumber: i.printed_number as string,
    section: i.section as string,
    marks: i.marks === null ? null : Number(i.marks),
    alternativeTo: (i.alternative_to as number | null) ?? null,
    partOf: (i.part_of as number | null) ?? null,
    caseKey: (i.case_key as string | null) ?? null,
    questionId: i.question_id as string,
  }));
  const questions = await loadBoardQuestions(
    admin,
    items.map((i) => i.questionId)
  );
  return {
    paper: {
      id: p.id as string,
      title: p.title as string,
      totalMarks: Number(p.total_marks),
      durationMinutes: (p.duration_minutes as number | null) ?? null,
      sections: (p.sections ?? []) as BriefPaper["sections"],
    },
    items,
    questions,
  };
}

/** Every scan of a sheet, in upload order, as bytes. */
export async function downloadScans(
  admin: SupabaseClient,
  userId: string,
  submissionId: string
): Promise<{ name: string; bytes: Buffer }[]> {
  const folder = `${userId}/${submissionId}`;
  const { data: files, error } = await admin.storage.from(ANSWER_SHEETS_BUCKET).list(folder, {
    limit: 100,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw new Error(`scans list: ${error.message}`);
  const out: { name: string; bytes: Buffer }[] = [];
  // The listing also returns the `marked` folder once a sheet is graded.
  for (const f of (files ?? []).filter((x) => isScanFile(x.name))) {
    const { data, error: dlErr } = await admin.storage.from(ANSWER_SHEETS_BUCKET).download(`${folder}/${f.name}`);
    if (dlErr || !data) throw new Error(`scan ${f.name}: ${dlErr?.message ?? "empty"}`);
    out.push({ name: f.name, bytes: Buffer.from(await data.arrayBuffer()) });
  }
  return out;
}

/**
 * Delete a sheet's scans and its marked pages and report from storage (the
 * grade and its marks stay). Storage has no recursive delete: the `marked`
 * folder is listed and emptied on its own.
 */
export async function removeScans(admin: SupabaseClient, userId: string, submissionId: string): Promise<number> {
  const folder = `${userId}/${submissionId}`;
  const bucket = admin.storage.from(ANSWER_SHEETS_BUCKET);
  const [{ data: top, error: tErr }, { data: marked, error: mErr }] = await Promise.all([
    bucket.list(folder, { limit: 100 }),
    bucket.list(`${folder}/marked`, { limit: 100 }),
  ]);
  if (tErr) throw new Error(`scans list: ${tErr.message}`);
  if (mErr) throw new Error(`marked pages list: ${mErr.message}`);
  const paths = [
    ...(top ?? []).filter((f) => isScanFile(f.name)).map((f) => `${folder}/${f.name}`),
    ...(marked ?? []).filter((f) => f.id !== null).map((f) => `${folder}/marked/${f.name}`),
  ];
  if (paths.length > 0) {
    const { error } = await bucket.remove(paths);
    if (error) throw new Error(`scans remove: ${error.message}`);
  }
  return paths.length;
}

export type OverviewRow = {
  id: string;
  paperTitle: string;
  status: string;
  fileCount: number;
  submittedAt: string | null;
  gradedAt: string | null;
  totalAwarded: number | null;
  totalMax: number | null;
};

/** /dashboard/answer-sheets: the waiting queue, and the most recent checked sheets. */
export async function readGradingOverview(
  admin: SupabaseClient
): Promise<{ waiting: OverviewRow[]; recent: OverviewRow[]; openQuestions: number }> {
  const cols = "id, status, file_count, submitted_at, graded_at, total_awarded, total_max, board_papers(title)";
  const [w, r, q] = await Promise.all([
    admin.from("answer_submissions").select(cols).eq("status", "submitted").order("submitted_at").limit(500),
    admin.from("answer_submissions").select(cols).in("status", ["graded", "rejected"]).order("graded_at", { ascending: false }).limit(30),
    admin.from("answer_grade_disputes").select("id", { count: "exact", head: true }).is("resolved_at", null),
  ]);
  for (const res of [w, r, q]) if (res.error) throw new Error(`grading overview: ${res.error.message}`);
  const toRow = (x: Record<string, unknown>): OverviewRow => {
    const p = x.board_papers as { title: string } | { title: string }[] | null;
    return {
      id: x.id as string,
      paperTitle: (Array.isArray(p) ? p[0]?.title : p?.title) ?? "",
      status: x.status as string,
      fileCount: x.file_count as number,
      submittedAt: (x.submitted_at as string | null) ?? null,
      gradedAt: (x.graded_at as string | null) ?? null,
      totalAwarded: x.total_awarded === null ? null : Number(x.total_awarded),
      totalMax: x.total_max === null ? null : Number(x.total_max),
    };
  };
  return {
    waiting: ((w.data ?? []) as Record<string, unknown>[]).map(toRow),
    recent: ((r.data ?? []) as Record<string, unknown>[]).map(toRow),
    openQuestions: q.count ?? 0,
  };
}

/** The superadmins' email addresses: who the daily queue email goes to. */
export async function readGraderEmails(admin: SupabaseClient): Promise<string[]> {
  const { data, error } = await admin.from("platform_admins").select("user_id");
  if (error) throw new Error(`platform admins: ${error.message}`);
  const out: string[] = [];
  for (const r of data ?? []) {
    const { data: u } = await admin.auth.admin.getUserById(r.user_id as string);
    if (u?.user?.email) out.push(u.user.email);
  }
  return out;
}
