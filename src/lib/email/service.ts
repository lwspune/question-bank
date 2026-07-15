/**
 * Service-role reads + the send-log write for the mock-recommendation campaign.
 * The DECISION lives in the pure `recommend.ts`; this module only fetches rows
 * and records outcomes.
 *
 * NOT marked "server-only" precisely so the tsx script can import it, and every
 * function takes the supabase client as a PARAMETER — the src/lib/quiz/
 * assemble.ts precedent for a core shared by a CLI and server code. These reads
 * all need service-role (mock_attempts is own-row RLS; auth.users needs the
 * admin API), so never call them with a user-scoped client.
 *
 * Paged reads throughout: mock_attempts and email_sends both grow past the
 * PostgREST 1000-row cap, and a row-derived answer from a truncated `.select()`
 * is silently wrong (the "1000-row cap" pitfall in CLAUDE.md — it has bitten
 * this codebase five times). Follows adminStats.ts's readAllAttempts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AttemptLite, MockLite, PriorSend, Recipient, StudentLite } from "./recommend";

const PAGE = 1000;

/** Published mocks, with the exam_id the recommender scopes on. NOT reusing
 *  getPublishedMocks: its MOCK_SELECT embeds `exam:exams(name)` but omits
 *  `exam_id`, and its MockListItem has no exam id to filter by. */
export async function readPublishedMocks(db: SupabaseClient): Promise<MockLite[]> {
  const out: MockLite[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_tests")
      .select("id, slug, title, exam_id, paper_code, pyq_year, pyq_month, total_questions, duration_secs")
      .eq("status", "published")
      .order("pyq_year", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPublishedMocks: ${error.message}`);
    const rows = data ?? [];
    for (const r of rows as Record<string, unknown>[]) {
      out.push({
        id: r.id as string,
        slug: r.slug as string,
        title: r.title as string,
        examId: r.exam_id as string,
        paperCode: r.paper_code as string,
        pyqYear: r.pyq_year as number,
        pyqMonth: (r.pyq_month as string | null) ?? null,
        totalQuestions: r.total_questions as number,
        durationSecs: r.duration_secs as number,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/** EVERY user's attempts (service-role — mock_attempts is own-row RLS), with the
 *  parent mock's exam + paper joined on so the recommender can scope. */
export async function readAllAttempts(db: SupabaseClient): Promise<AttemptLite[]> {
  const out: AttemptLite[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("user_id, mock_id, status, started_at, expires_at, score, max_score, mock:mock_tests(exam_id, paper_code)")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readAllAttempts: ${error.message}`);
    const rows = data ?? [];
    for (const r of rows as Record<string, unknown>[]) {
      const mock = (Array.isArray(r.mock) ? r.mock[0] : r.mock) as
        | { exam_id: string; paper_code: string }
        | null;
      if (!mock) continue; // mock deleted — the attempt can't be scoped
      out.push({
        userId: r.user_id as string,
        mockId: r.mock_id as string,
        examId: mock.exam_id,
        paperCode: mock.paper_code,
        status: r.status as AttemptLite["status"],
        startedAt: r.started_at as string,
        expiresAt: r.expires_at as string,
        score: r.score == null ? null : Number(r.score),
        maxScore: r.max_score == null ? null : Number(r.max_score),
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

export async function readPriorSends(db: SupabaseClient): Promise<PriorSend[]> {
  const out: PriorSend[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("email_sends")
      .select("user_id, dedupe_key, created_at")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPriorSends: ${error.message}`);
    const rows = data ?? [];
    for (const r of rows as Record<string, unknown>[]) {
      out.push({
        userId: r.user_id as string,
        dedupeKey: r.dedupe_key as string,
        createdAt: r.created_at as string,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/**
 * The mailable roster: auth users with no org_members row (the deriveStudents
 * definition of "student"), carrying their consent flag.
 *
 * A student with NO student_profiles row (25 of 41 today) is NOT opted out —
 * they simply never gave a mobile. Absent ⇒ `emailOptOut: false`.
 */
export async function readStudents(db: SupabaseClient): Promise<StudentLite[]> {
  const { data: members, error: mErr } = await db.from("org_members").select("user_id");
  if (mErr) throw new Error(`readStudents members: ${mErr.message}`);
  const staff = new Set((members ?? []).map((m) => m.user_id as string));

  const optOutById = new Map<string, boolean>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("student_profiles")
      .select("user_id, email_opt_out")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readStudents profiles: ${error.message}`);
    const rows = data ?? [];
    for (const p of rows as Record<string, unknown>[]) {
      optOutById.set(p.user_id as string, Boolean(p.email_opt_out));
    }
    if (rows.length < PAGE) break;
  }

  const out: StudentLite[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: PAGE });
    if (error) throw new Error(`readStudents users: ${error.message}`);
    const batch = data?.users ?? [];
    for (const u of batch) {
      if (staff.has(u.id)) continue;
      const meta = (u.user_metadata ?? null) as { full_name?: string; name?: string } | null;
      out.push({
        userId: u.id,
        email: u.email ?? null,
        name: (meta?.full_name ?? meta?.name ?? "").trim() || (u.email ?? ""),
        createdAt: u.created_at,
        emailOptOut: optOutById.get(u.id) ?? false,
      });
    }
    if (batch.length < PAGE) break;
  }
  return out;
}

/**
 * Mint (or read) the per-student unsubscribe token. 25 of 41 students have no
 * profile row, so the send path creates one — the token is minted by the column
 * DEFAULT. `mobile` is nullable since 0048, so a bare user_id insert is valid.
 *
 * ignoreDuplicates so an existing row keeps its token (rotating it would break
 * unsubscribe links in mail already delivered).
 */
export async function ensureUnsubscribeTokens(
  db: SupabaseClient,
  userIds: string[]
): Promise<Map<string, string>> {
  if (userIds.length === 0) return new Map();

  const { error: upErr } = await db
    .from("student_profiles")
    .upsert(userIds.map((user_id) => ({ user_id })), { onConflict: "user_id", ignoreDuplicates: true });
  if (upErr) throw new Error(`ensureUnsubscribeTokens: ${upErr.message}`);

  const tokens = new Map<string, string>();
  const CHUNK = 300;
  for (let i = 0; i < userIds.length; i += CHUNK) {
    const { data, error } = await db
      .from("student_profiles")
      .select("user_id, unsubscribe_token")
      .in("user_id", userIds.slice(i, i + CHUNK));
    if (error) throw new Error(`ensureUnsubscribeTokens read: ${error.message}`);
    for (const r of (data ?? []) as Record<string, unknown>[]) {
      tokens.set(r.user_id as string, r.unsubscribe_token as string);
    }
  }
  return tokens;
}

export type SendOutcome =
  | { ok: true; providerId: string }
  | { ok: false; error: string };

/**
 * Record one attempt — sent OR failed. The UNIQUE dedupe_key is the idempotency
 * backstop: if two runs race, the second insert loses and we know not to have
 * sent twice. Recording a FAILURE also consumes the key, which is deliberate for
 * a hard bounce; a transient outage is better handled by fixing the cause than
 * by silently retrying into a bad address.
 */
export async function recordSend(
  db: SupabaseClient,
  r: Recipient,
  subject: string,
  outcome: SendOutcome
): Promise<void> {
  const { error } = await db.from("email_sends").insert({
    user_id: r.userId,
    kind: r.kind,
    to_email: r.email,
    subject,
    ref_id: r.mock.id,
    ref_kind: "mock_test",
    dedupe_key: r.dedupeKey,
    status: outcome.ok ? "sent" : "failed",
    provider_id: outcome.ok ? outcome.providerId : null,
    error: outcome.ok ? null : outcome.error.slice(0, 1000),
    metadata: { mockSlug: r.mock.slug, paperCode: r.mock.paperCode },
  });
  if (error) throw new Error(`recordSend(${r.dedupeKey}): ${error.message}`);
}

/** Everything the campaign needs, in one service-role round-trip set. */
export async function loadCampaignInputs(): Promise<{
  db: SupabaseClient;
  students: StudentLite[];
  mocks: MockLite[];
  attempts: AttemptLite[];
  priorSends: PriorSend[];
}> {
  const db = createSupabaseAdminClient();
  const [students, mocks, attempts, priorSends] = await Promise.all([
    readStudents(db),
    readPublishedMocks(db),
    readAllAttempts(db),
    readPriorSends(db),
  ]);
  return { db, students, mocks, attempts, priorSends };
}
