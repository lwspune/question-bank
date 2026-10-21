/**
 * Answer-sheet uploads, server side (migration 0153). Service role: the
 * routes check the session first and pass the session user's id, never one
 * from the request body.
 *
 * Start issues one signed upload link per file into the student's own folder;
 * finish checks the files really arrived before the sheet joins the grading
 * queue. One unfinished upload per student: starting again discards the old
 * one and its files.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExamBySlug } from "@/lib/exam/examContext";
import { istDayKey } from "@/lib/email/dueNudge";
import { ANSWER_SHEETS_BUCKET, markedPagePath, reportPdfPath, scanPath, type StartRequest } from "./upload";

export type PublishedPaperRef = { id: string; title: string };

/** A published board paper by its exam's URL slug and its own slug, or null. */
export async function findPublishedPaper(
  admin: SupabaseClient,
  examSlug: string,
  paperSlug: string
): Promise<PublishedPaperRef | null> {
  const exam = getExamBySlug(examSlug);
  if (!exam?.boardExam) return null;
  const { data: ex, error: exErr } = await admin.from("exams").select("id").eq("name", exam.examName).maybeSingle();
  if (exErr) throw new Error(`answer sheet exam: ${exErr.message}`);
  if (!ex) return null;
  const { data, error } = await admin
    .from("board_papers")
    .select("id, title")
    .eq("exam_id", ex.id)
    .eq("slug", paperSlug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`answer sheet paper: ${error.message}`);
  return data ? { id: data.id as string, title: data.title as string } : null;
}

/** Has this student already sent a sheet today (IST)? A rejected one does not count. */
export async function submittedToday(admin: SupabaseClient, userId: string, now = new Date()): Promise<boolean> {
  const { count, error } = await admin
    .from("answer_submissions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("ist_day", istDayKey(now))
    .in("status", ["submitted", "graded"]);
  if (error) throw new Error(`answer sheets today: ${error.message}`);
  return (count ?? 0) > 0;
}

async function removeFolder(admin: SupabaseClient, folder: string): Promise<void> {
  const { data } = await admin.storage.from(ANSWER_SHEETS_BUCKET).list(folder, { limit: 100 });
  const paths = (data ?? []).map((f) => `${folder}/${f.name}`);
  if (paths.length > 0) await admin.storage.from(ANSWER_SHEETS_BUCKET).remove(paths);
}

export type StartOutcome =
  | { kind: "ok"; submissionId: string; uploads: { path: string; token: string }[] }
  | { kind: "limit" };

/** The paper is resolved by the caller (findPublishedPaper); `files` come from validateStartRequest. */
export async function startSubmission(
  admin: SupabaseClient,
  userId: string,
  paperId: string,
  files: StartRequest["files"]
): Promise<StartOutcome> {
  if (await submittedToday(admin, userId)) return { kind: "limit" };

  const { data: stale, error: staleErr } = await admin
    .from("answer_submissions")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "uploading");
  if (staleErr) throw new Error(`answer sheet stale read: ${staleErr.message}`);
  for (const s of stale ?? []) {
    await removeFolder(admin, `${userId}/${s.id}`);
    await admin.from("answer_submissions").delete().eq("id", s.id);
  }

  const { data: row, error } = await admin
    .from("answer_submissions")
    .insert({
      user_id: userId,
      board_paper_id: paperId,
      file_count: files.length,
      consent_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) throw new Error(`answer sheet insert: ${error.message}`);
  const submissionId = row!.id as string;

  const uploads: { path: string; token: string }[] = [];
  for (let i = 0; i < files.length; i++) {
    const path = scanPath(userId, submissionId, i, files[i].ext);
    const { data, error: signErr } = await admin.storage.from(ANSWER_SHEETS_BUCKET).createSignedUploadUrl(path);
    if (signErr || !data) throw new Error(`answer sheet upload link: ${signErr?.message ?? "no link"}`);
    uploads.push({ path: data.path, token: data.token });
  }
  return { kind: "ok", submissionId, uploads };
}

export type FinishOutcome = "ok" | "not-found" | "missing-files" | "limit";

/** The files are up: check them and put the sheet in the grading queue. */
export async function finishSubmission(admin: SupabaseClient, userId: string, submissionId: string): Promise<FinishOutcome> {
  const { data: sub, error } = await admin
    .from("answer_submissions")
    .select("id, file_count, status")
    .eq("id", submissionId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`answer sheet read: ${error.message}`);
  if (!sub || sub.status !== "uploading") return "not-found";

  const { data: files, error: listErr } = await admin.storage
    .from(ANSWER_SHEETS_BUCKET)
    .list(`${userId}/${submissionId}`, { limit: 100 });
  if (listErr) throw new Error(`answer sheet files: ${listErr.message}`);
  if ((files ?? []).length !== sub.file_count) return "missing-files";

  const { error: upErr } = await admin
    .from("answer_submissions")
    .update({ status: "submitted", submitted_at: new Date().toISOString(), ist_day: istDayKey(new Date()) })
    .eq("id", submissionId)
    .eq("status", "uploading");
  if (upErr?.code === "23505") return "limit";
  if (upErr) throw new Error(`answer sheet submit: ${upErr.message}`);
  return "ok";
}

/** How long a marked page or report link works: the report page is rendered per request. */
const MARKED_LINK_SECONDS = 60 * 60;

export type MarkedFiles = { pages: string[]; pdf: string | null };

/**
 * Short-lived links to a checked sheet's marked pages and report PDF
 * (migration 0175). The bucket has no read policies, so the student cannot
 * read their own folder: the caller has already found the sheet with the
 * STUDENT'S session (row-level security) and passes the session user's id,
 * so a path can only ever be that student's.
 */
export async function signMarkedFiles(
  admin: SupabaseClient,
  userId: string,
  submissionId: string,
  pageCount: number
): Promise<MarkedFiles> {
  const bucket = admin.storage.from(ANSWER_SHEETS_BUCKET);
  const paths = Array.from({ length: pageCount }, (_, i) => markedPagePath(userId, submissionId, i));
  const [pages, pdf] = await Promise.all([
    bucket.createSignedUrls(paths, MARKED_LINK_SECONDS),
    bucket.createSignedUrl(reportPdfPath(userId, submissionId), MARKED_LINK_SECONDS, { download: "marked-answer-sheet.pdf" }),
  ]);
  if (pages.error) console.error(`marked pages ${submissionId}: ${pages.error.message}`);
  if (pdf.error) console.error(`marked report ${submissionId}: ${pdf.error.message}`);
  return {
    pages: (pages.data ?? []).map((p) => p.signedUrl).filter((u): u is string => !!u),
    pdf: pdf.data?.signedUrl ?? null,
  };
}
