/**
 * Reads and writes for mock assignments (migration 0115). The DECISIONS live
 * in the pure core.ts; this module moves rows.
 *
 * STAFF PATHS TAKE THE CALLER'S RLS CLIENT, so batches_select_scoped and the
 * 0115 policies are the boundary — a teacher of another branch is refused by
 * the database, not by an `if` here. The STUDENT path is service-role like
 * `listMyBatches`: a student's own enrollment lets them read the assignment
 * row, but `batches` needs an org id to read and a student has none, so the
 * batch NAME can only be hydrated here. It is scoped to one user id that the
 * caller takes from the session.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  studentAssignmentViews,
  type AssignmentFields,
  type AttemptLite,
  type StudentAssignmentRow,
  type StudentAssignmentView,
} from "./core";

export type BatchAssignment = {
  id: string;
  batchId: string;
  mockId: string;
  mockSlug: string;
  mockTitle: string;
  dueAt: string;
  note: string | null;
  createdAt: string;
};

const SELECT = "id, batch_id, mock_id, due_at, note, created_at, mock:mock_tests(slug, title)";

function toAssignment(r: Record<string, unknown>): BatchAssignment {
  const mock = (Array.isArray(r.mock) ? r.mock[0] : r.mock) as { slug?: string; title?: string } | null;
  return {
    id: r.id as string,
    batchId: r.batch_id as string,
    mockId: r.mock_id as string,
    mockSlug: mock?.slug ?? "",
    mockTitle: mock?.title ?? "(mock removed)",
    dueAt: r.due_at as string,
    note: (r.note as string | null) ?? null,
    createdAt: r.created_at as string,
  };
}

/** A batch's assignments, soonest due first. Through RLS. */
export async function listBatchAssignments(client: SupabaseClient, batchId: string): Promise<BatchAssignment[]> {
  const { data, error } = await client
    .from("mock_assignments")
    .select(SELECT)
    .eq("batch_id", batchId)
    .order("due_at", { ascending: true });
  if (error) throw new Error(`listBatchAssignments: ${error.message}`);
  return ((data ?? []) as Record<string, unknown>[]).map(toAssignment);
}

export type CreateResult = { kind: "ok"; id: string } | { kind: "error"; message: string };

export async function createAssignment(
  client: SupabaseClient,
  input: { batchId: string; assignedBy: string; fields: AssignmentFields }
): Promise<CreateResult> {
  const { data, error } = await client
    .from("mock_assignments")
    .insert({
      batch_id: input.batchId,
      mock_id: input.fields.mockId,
      due_at: input.fields.dueAt,
      note: input.fields.note,
      assigned_by: input.assignedBy,
    })
    .select("id")
    .single();
  if (error) {
    // 23505 = the (batch, mock) UNIQUE: the paper is already assigned here.
    if (error.code === "23505") return { kind: "error", message: "That paper is already assigned to this batch." };
    // 42501 = RLS: not this caller's batch. Say so without naming the batch.
    if (error.code === "42501") return { kind: "error", message: "You cannot assign papers to this batch." };
    return { kind: "error", message: error.message };
  }
  return { kind: "ok", id: data.id as string };
}

/** Delete through RLS. A row the caller may not touch is filtered out, so the
 *  count tells the truth: 0 means it was not theirs (or already gone). */
export async function deleteAssignment(client: SupabaseClient, id: string): Promise<boolean> {
  const { data, error } = await client.from("mock_assignments").delete().eq("id", id).select("id");
  if (error) throw new Error(`deleteAssignment: ${error.message}`);
  return (data ?? []).length > 0;
}

/**
 * Graded attempts of the given mocks by the given students — the completion
 * read. Through RLS: the 0083 mock_attempts policy is what lets staff see
 * their enrolled students' attempts, and only theirs. Chunked at 200 because
 * an `.in()` list rides in the URL.
 */
export async function readCompletionAttempts(
  client: SupabaseClient,
  userIds: readonly string[],
  mockIds: readonly string[]
): Promise<AttemptLite[]> {
  if (userIds.length === 0 || mockIds.length === 0) return [];
  const out: AttemptLite[] = [];
  for (let i = 0; i < userIds.length; i += 200) {
    const { data, error } = await client
      .from("mock_attempts")
      .select("user_id, mock_id, submitted_at")
      .in("user_id", userIds.slice(i, i + 200))
      .in("mock_id", mockIds.slice(0, 200))
      .not("submitted_at", "is", null);
    if (error) throw new Error(`readCompletionAttempts: ${error.message}`);
    for (const r of (data ?? []) as { user_id: string; mock_id: string; submitted_at: string | null }[]) {
      out.push({ userId: r.user_id, mockId: r.mock_id, submittedAt: r.submitted_at });
    }
  }
  return out;
}

/**
 * The student's own assignments across every batch they are enrolled in,
 * with whether they have sat each paper. Service-role, scoped to `userId`.
 */
export async function listMyAssignments(userId: string, now: Date = new Date()): Promise<StudentAssignmentView[]> {
  const admin = createSupabaseAdminClient();
  const { data: enr, error: eErr } = await admin
    .from("batch_enrollments")
    .select("batch_id")
    .eq("user_id", userId);
  if (eErr) throw new Error(`listMyAssignments enrollments: ${eErr.message}`);
  const batchIds = (enr ?? []).map((r) => r.batch_id as string);
  if (batchIds.length === 0) return [];

  const { data, error } = await admin
    .from("mock_assignments")
    .select("id, batch_id, mock_id, due_at, note, batch:batches(name), mock:mock_tests(slug, title, status)")
    .in("batch_id", batchIds.slice(0, 200))
    .order("due_at", { ascending: true });
  if (error) throw new Error(`listMyAssignments: ${error.message}`);

  const rows: StudentAssignmentRow[] = [];
  for (const r of (data ?? []) as Record<string, unknown>[]) {
    const mock = (Array.isArray(r.mock) ? r.mock[0] : r.mock) as { slug?: string; title?: string; status?: string } | null;
    // An unpublished mock cannot be sat; do not ask for it.
    if (!mock || mock.status !== "published") continue;
    const batch = (Array.isArray(r.batch) ? r.batch[0] : r.batch) as { name?: string } | null;
    rows.push({
      id: r.id as string,
      mockId: r.mock_id as string,
      mockSlug: mock.slug ?? "",
      mockTitle: mock.title ?? "",
      batchName: batch?.name ?? "your batch",
      dueAt: r.due_at as string,
      note: (r.note as string | null) ?? null,
    });
  }
  if (rows.length === 0) return [];

  const { data: att, error: aErr } = await admin
    .from("mock_attempts")
    .select("mock_id, submitted_at")
    .eq("user_id", userId)
    .in("mock_id", [...new Set(rows.map((r) => r.mockId))].slice(0, 200))
    .not("submitted_at", "is", null);
  if (aErr) throw new Error(`listMyAssignments attempts: ${aErr.message}`);
  const own: AttemptLite[] = ((att ?? []) as { mock_id: string; submitted_at: string | null }[]).map((a) => ({
    userId,
    mockId: a.mock_id,
    submittedAt: a.submitted_at,
  }));

  return studentAssignmentViews(rows, own, now);
}
