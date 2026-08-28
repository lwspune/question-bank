/**
 * Batch invites + roster reads (migrations 0083/0084).
 *
 * WHY SERVICE-ROLE FOR WRITES. Neither table has an INSERT policy, on purpose:
 * enrollment is authorized by a grant only the server can verify (a pending
 * invite addressed to the caller's own verified email). RLS cannot express
 * that, so the check lives here and the tables are locked.
 *
 * WHY THE ROSTER READ IS NOT SERVICE-ROLE. It takes the caller's RLS client and
 * lets the 0083 policies decide which enrollments and attempts are visible.
 * Service-role is used ONLY to hydrate names/emails for user ids that already
 * passed RLS — the listMembers pattern. Reading the roster with service-role
 * and filtering by hand would make a route-guard bug a cross-org data leak.
 *
 * NOT marked "server-only", following src/lib/teacherAccess/service.ts: the
 * integration tests import these functions directly, which is the only way the
 * accept-path email check gets exercised. It is server-bound in practice
 * anyway — createSupabaseAdminClient() throws without the service-role key.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { buildBatchInviteEmail, SITE_URL } from "@/lib/email/templates";
import { parseInviteEmails, inviteState, type InviteState } from "./invites";
import { generateJoinCode, normalizeJoinCode } from "./joinCode";

/** Where an invited student lands to accept or decline. */
const INVITE_ACTION_URL = `${SITE_URL}/account`;

type AuthUserLite = {
  id: string;
  email: string | null;
  user_metadata: { name?: string; full_name?: string } | null;
};

/**
 * Every auth user, PAGED.
 *
 * listUsers({ perPage: 1000 }) silently returns only the first page — the same
 * shape as the PostgREST 1000-row cap this project has been bitten by five
 * times, and it fails the same way: no error, just a short list. members/admin
 * gets away with one page because it hydrates STAFF (7 rows). Both callers here
 * hydrate across ALL accounts — 156 today and growing with every signup — so a
 * single page would eventually render enrolled students as "(unknown)" and let
 * an already-enrolled student be re-invited. Paged, like listStudents.
 */
async function listAllAuthUsers(admin: SupabaseClient): Promise<AuthUserLite[]> {
  const out: AuthUserLite[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`listAllAuthUsers: ${error.message}`);
    const batch = data?.users ?? [];
    for (const u of batch) {
      out.push({
        id: u.id,
        email: u.email ?? null,
        user_metadata: (u.user_metadata as AuthUserLite["user_metadata"]) ?? null,
      });
    }
    if (batch.length < 1000) break;
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────
// inviting
// ────────────────────────────────────────────────────────────────────

export type InviteResult =
  | {
      kind: "ok";
      /** Addresses now holding a pending invite. */
      invited: number;
      /** Already enrolled — no invite written, and that is not a failure. */
      alreadyEnrolled: number;
      /** Rejected by the parser, as typed. */
      invalid: string[];
      /** Dropped by MAX_INVITES_PER_REQUEST. */
      overflow: number;
      /** Addresses whose invite mail did not go out. */
      emailFailures: number;
      /** Previously DECLINED, so deliberately not re-invited. */
      declined: number;
    }
  | { kind: "no_valid_emails"; invalid: string[] }
  | { kind: "batch_not_found" }
  | { kind: "error"; message: string };

/**
 * Invite a pasted list of addresses to a batch.
 *
 * NEVER REVEALS WHETHER AN ADDRESS HAS AN ACCOUNT. The invite row is written
 * either way and the count reported is the same, so a teacher cannot use this
 * to probe who is registered on the platform.
 *
 * `client` is the CALLER's RLS client and is used to confirm they can actually
 * reach this batch — that check is the authorization for the service-role
 * writes that follow.
 */
export async function inviteToBatch(input: {
  client: SupabaseClient;
  batchId: string;
  invitedBy: string;
  raw: string;
}): Promise<InviteResult> {
  const { client, batchId, invitedBy, raw } = input;
  const parsed = parseInviteEmails(raw);
  if (parsed.valid.length === 0) {
    return { kind: "no_valid_emails", invalid: parsed.invalid };
  }

  try {
    // Authorization: if the caller's RLS client cannot see the batch, they may
    // not invite to it. batches_select_scoped (0057) is the rule being borrowed.
    const { data: batch } = await client
      .from("batches")
      .select("id, name, org_id, archived")
      .eq("id", batchId)
      .maybeSingle<{ id: string; name: string; org_id: string; archived: boolean }>();
    if (!batch) return { kind: "batch_not_found" };

    const admin = createSupabaseAdminClient();
    const { data: org } = await admin
      .from("organizations")
      .select("name")
      .eq("id", batch.org_id)
      .maybeSingle<{ name: string }>();
    const orgName = org?.name ?? "Your institute";

    // Skip anyone already on the roster — re-inviting an enrolled student would
    // ask them to consent to something they have already consented to.
    const allUsers = await listAllAuthUsers(admin);
    const idByEmail = new Map(
      allUsers.filter((u) => u.email).map((u) => [u.email!.toLowerCase(), u.id])
    );
    const { data: enrolled } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchId);
    const enrolledIds = new Set((enrolled ?? []).map((r) => r.user_id as string));

    // A DECLINED invite is NOT reset to pending. "No" has to stick, or a
    // one-click re-invite turns consent into accept-or-be-pestered. The
    // student is not locked out: the join code is still open to them, so this
    // costs a teacher a conversation rather than a route back in.
    const { data: declinedRows } = await admin
      .from("batch_invites")
      .select("email")
      .eq("batch_id", batchId)
      .eq("status", "declined");
    const declinedEmails = new Set((declinedRows ?? []).map((r) => r.email as string));

    const toInvite: string[] = [];
    let alreadyEnrolled = 0;
    let declined = 0;
    for (const email of parsed.valid) {
      const uid = idByEmail.get(email);
      if (uid && enrolledIds.has(uid)) alreadyEnrolled += 1;
      else if (declinedEmails.has(email)) declined += 1;
      else toInvite.push(email);
    }

    if (toInvite.length > 0) {
      // Re-inviting refreshes an EXPIRED or still-pending invite into a new
      // 30-day window. Declined addresses never reach here (filtered above).
      const { error } = await admin.from("batch_invites").upsert(
        toInvite.map((email) => ({
          batch_id: batchId,
          email,
          invited_by: invitedBy,
          status: "pending",
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 86_400_000).toISOString(),
          responded_at: null,
        })),
        { onConflict: "batch_id,email" }
      );
      if (error) return { kind: "error", message: error.message };
    }

    // Best-effort send: a provider failure must not roll back the invite, which
    // is still visible in-app on /account.
    let emailFailures = 0;
    const mail = buildBatchInviteEmail({
      orgName,
      batchName: batch.name,
      actionUrl: INVITE_ACTION_URL,
    });
    for (const email of toInvite) {
      const res = await sendEmail({
        to: email,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        replyTo: mail.replyTo,
      });
      if (!res.ok) emailFailures += 1;
    }

    return {
      kind: "ok",
      invited: toInvite.length,
      alreadyEnrolled,
      invalid: parsed.invalid,
      overflow: parsed.overflow,
      emailFailures,
      declined,
    };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// the student side
// ────────────────────────────────────────────────────────────────────

export type PendingInvite = {
  id: string;
  batchId: string;
  batchName: string;
  orgName: string;
  expiresAt: string;
};

/**
 * Pending invites addressed to a verified email. Service-role: the student has
 * no RLS read on batch_invites (that policy is staff-only), because matching
 * them means trusting an email claim and the server already knows the caller's
 * from their session.
 */
export async function listPendingInvitesForEmail(email: string): Promise<PendingInvite[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("batch_invites")
    .select("id, batch_id, expires_at, status, batches(name, org_id)")
    .eq("email", email.trim().toLowerCase())
    .eq("status", "pending");
  if (error || !data) return [];

  const orgIds = Array.from(
    new Set(
      data
        .map((r) => (r.batches as { org_id?: string } | null)?.org_id)
        .filter((v): v is string => Boolean(v))
    )
  );
  const { data: orgs } = await admin
    .from("organizations")
    .select("id, name")
    .in("id", orgIds.length > 0 ? orgIds : ["00000000-0000-0000-0000-000000000000"]);
  const orgName = new Map((orgs ?? []).map((o) => [o.id as string, o.name as string]));

  const now = Date.now();
  return data
    // expiry is DERIVED, never swept — filter it here or a stale invite would
    // still render as actionable.
    .filter((r) => inviteState({ status: r.status as string, expiresAt: r.expires_at as string }, now) === "pending")
    .map((r) => {
      const b = r.batches as { name?: string; org_id?: string } | null;
      return {
        id: r.id as string,
        batchId: r.batch_id as string,
        batchName: b?.name ?? "a batch",
        orgName: (b?.org_id && orgName.get(b.org_id)) || "An institute",
        expiresAt: r.expires_at as string,
      };
    });
}

export type RespondResult =
  | { kind: "ok"; action: "accept" | "decline" }
  | { kind: "not_found" }
  | { kind: "not_pending" }
  | { kind: "error"; message: string };

/**
 * Accept or decline an invite.
 *
 * THE SECURITY CHECK IS THE EMAIL MATCH. Invite ids are uuids but must not be
 * treated as secrets: the invite is only actionable by the account whose
 * VERIFIED email it names. Without this, holding an id would be enough to enrol
 * someone else — or to enrol yourself into a batch you were never invited to.
 */
export async function respondToInvite(input: {
  userId: string;
  userEmail: string;
  inviteId: string;
  action: "accept" | "decline";
}): Promise<RespondResult> {
  const { userId, userEmail, inviteId, action } = input;
  try {
    const admin = createSupabaseAdminClient();
    const { data: invite } = await admin
      .from("batch_invites")
      .select("id, batch_id, email, status, expires_at")
      .eq("id", inviteId)
      .maybeSingle<{
        id: string;
        batch_id: string;
        email: string;
        status: string;
        expires_at: string;
      }>();
    if (!invite) return { kind: "not_found" };

    // The match, and the reason ids are not secrets. Both sides are already
    // lowercase — the DB CHECK guarantees it for the stored side.
    if (invite.email !== userEmail.trim().toLowerCase()) return { kind: "not_found" };

    const state: InviteState = inviteState(
      { status: invite.status, expiresAt: invite.expires_at },
      Date.now()
    );
    if (state !== "pending") return { kind: "not_pending" };

    if (action === "accept") {
      const { error: enrollErr } = await admin
        .from("batch_enrollments")
        // Idempotent: accepting twice (double-click, retry) must not 23505.
        .upsert({ batch_id: invite.batch_id, user_id: userId }, { onConflict: "batch_id,user_id" });
      if (enrollErr) return { kind: "error", message: enrollErr.message };
    }

    const { error: updErr } = await admin
      .from("batch_invites")
      .update({
        status: action === "accept" ? "accepted" : "declined",
        responded_at: new Date().toISOString(),
      })
      .eq("id", inviteId);
    if (updErr) return { kind: "error", message: updErr.message };

    return { kind: "ok", action };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}

// ────────────────────────────────────────────────────────────────────
// the roster
// ────────────────────────────────────────────────────────────────────

export type RosterStudent = {
  userId: string;
  name: string | null;
  email: string;
  joinedAt: string;
  attempts: number;
  /** Percentage of max, most recent submitted attempt first. Null if none. */
  lastScorePct: number | null;
};

export type Roster = {
  students: RosterStudent[];
  pendingInvites: { id: string; email: string; expiresAt: string }[];
};

/**
 * The roster for one batch, read THROUGH the caller's RLS client so the 0083
 * policies decide what is visible. Service-role only hydrates display names for
 * ids that already came back through RLS.
 */
export async function loadRoster(client: SupabaseClient, batchId: string): Promise<Roster> {
  const { data: rows } = await client
    .from("batch_enrollments")
    .select("user_id, joined_at")
    .eq("batch_id", batchId)
    .order("joined_at", { ascending: true });
  const enrollments = (rows ?? []) as { user_id: string; joined_at: string }[];

  const { data: inviteRows } = await client
    .from("batch_invites")
    .select("id, email, expires_at, status")
    .eq("batch_id", batchId)
    .eq("status", "pending");
  const now = Date.now();
  const pendingInvites = ((inviteRows ?? []) as {
    id: string;
    email: string;
    expires_at: string;
    status: string;
  }[])
    .filter((r) => inviteState({ status: r.status, expiresAt: r.expires_at }, now) === "pending")
    .map((r) => ({ id: r.id, email: r.email, expiresAt: r.expires_at }));

  if (enrollments.length === 0) return { students: [], pendingInvites };

  const ids = enrollments.map((e) => e.user_id);

  // Attempts, also through RLS — the 0083 mock_attempts policy is what makes
  // these readable, and only for students enrolled in a batch this caller can
  // see. Chunked at 200: an .in() list rides in the URL.
  const attempts: { user_id: string; score: number | null; max_score: number | null }[] = [];
  for (let i = 0; i < ids.length; i += 200) {
    const { data } = await client
      .from("mock_attempts")
      .select("user_id, score, max_score, submitted_at")
      .in("user_id", ids.slice(i, i + 200))
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false });
    for (const r of (data ?? []) as typeof attempts) attempts.push(r);
  }

  const stats = new Map<string, { count: number; lastPct: number | null }>();
  for (const a of attempts) {
    const cur = stats.get(a.user_id) ?? { count: 0, lastPct: null };
    cur.count += 1;
    // Rows arrive newest-first, so the first one seen for a user is the latest.
    if (cur.lastPct === null && a.score !== null && a.max_score) {
      cur.lastPct = Math.round((Number(a.score) / Number(a.max_score)) * 100);
    }
    stats.set(a.user_id, cur);
  }

  const admin = createSupabaseAdminClient();
  const byId = new Map((await listAllAuthUsers(admin)).map((u) => [u.id, u]));

  const students = enrollments.map((e) => {
    const u = byId.get(e.user_id);
    const meta = (u?.user_metadata ?? {}) as { name?: string; full_name?: string };
    const s = stats.get(e.user_id);
    return {
      userId: e.user_id,
      name: meta.name ?? meta.full_name ?? null,
      email: u?.email ?? "(unknown)",
      joinedAt: e.joined_at,
      attempts: s?.count ?? 0,
      lastScorePct: s?.lastPct ?? null,
    };
  });

  return { students, pendingInvites };
}

export async function revokeInvite(
  client: SupabaseClient,
  batchId: string,
  inviteId: string
): Promise<{ kind: "ok" } | { kind: "error"; message: string }> {
  // Authorization by RLS: if the caller cannot see the invite, they cannot
  // revoke it. batch_invites_select_staff (0084) is the rule.
  const { data: visible } = await client
    .from("batch_invites")
    .select("id")
    .eq("id", inviteId)
    .eq("batch_id", batchId)
    .maybeSingle();
  if (!visible) return { kind: "error", message: "Invite not found" };

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("batch_invites")
    .update({ status: "revoked", responded_at: new Date().toISOString() })
    .eq("id", inviteId);
  return error ? { kind: "error", message: error.message } : { kind: "ok" };
}

export type MyBatch = {
  batchId: string;
  batchName: string;
  orgName: string;
  joinedAt: string;
};

/**
 * The batches a student is enrolled in, for /account.
 *
 * Service-role by necessity, not convenience: a student CAN read their own
 * batch_enrollments rows (0083), but batches_select_scoped (0057) requires an
 * org id and a student has none — so through RLS they can see that they belong
 * to some uuid and never what it is called. Hydrating the names here is the
 * only way the card can say who they are enrolled with.
 *
 * Scoped to one user id, which the caller takes from the session.
 */
export async function listMyBatches(userId: string): Promise<MyBatch[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("batch_enrollments")
    .select("batch_id, joined_at, batches(name, org_id)")
    .eq("user_id", userId)
    .order("joined_at", { ascending: false });
  if (error || !data) return [];

  const orgIds = Array.from(
    new Set(
      data
        .map((r) => (r.batches as { org_id?: string } | null)?.org_id)
        .filter((v): v is string => Boolean(v))
    )
  );
  const { data: orgs } = await admin
    .from("organizations")
    .select("id, name")
    .in("id", orgIds.length > 0 ? orgIds : ["00000000-0000-0000-0000-000000000000"]);
  const orgName = new Map((orgs ?? []).map((o) => [o.id as string, o.name as string]));

  return data.map((r) => {
    const b = r.batches as { name?: string; org_id?: string } | null;
    return {
      batchId: r.batch_id as string,
      batchName: b?.name ?? "a batch",
      orgName: (b?.org_id && orgName.get(b.org_id)) || "An institute",
      joinedAt: r.joined_at as string,
    };
  });
}

// ────────────────────────────────────────────────────────────────────
// join codes (migration 0085)
// ────────────────────────────────────────────────────────────────────

/**
 * Mint (or replace) a batch's join code.
 *
 * Rotating INVALIDATES the old code, which is the point: it is the only way to
 * shut out a code that has escaped the classroom. Existing enrollments are
 * untouched — the code is a door, not a membership.
 *
 * Authorization is the caller's RLS client: batches_update_scoped (0057)
 * rejects a teacher writing to another branch's batch.
 */
export async function rotateJoinCode(
  client: SupabaseClient,
  batchId: string
): Promise<{ kind: "ok"; code: string } | { kind: "error"; message: string }> {
  // The DB holds the uniqueness constraint, so a collision is a retry, not a
  // pre-check — checking first would be a race.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateJoinCode();
    const { data, error } = await client
      .from("batches")
      .update({ join_code: code, join_open: true })
      .eq("id", batchId)
      .select("id")
      .maybeSingle();
    if (!error) {
      // RLS returning no row means the caller may not touch this batch — NOT
      // that the batch is missing, and definitely not something to retry.
      if (!data) return { kind: "error", message: "Batch not found" };
      return { kind: "ok", code };
    }
    if (error.code !== "23505") return { kind: "error", message: error.message };
  }
  return { kind: "error", message: "Could not generate a unique code. Try again." };
}

/** Open or close the door without archiving the cohort. */
export async function setJoinOpen(
  client: SupabaseClient,
  batchId: string,
  open: boolean
): Promise<{ kind: "ok" } | { kind: "error"; message: string }> {
  const { data, error } = await client
    .from("batches")
    .update({ join_open: open })
    .eq("id", batchId)
    .select("id")
    .maybeSingle();
  if (error) return { kind: "error", message: error.message };
  if (!data) return { kind: "error", message: "Batch not found" };
  return { kind: "ok" };
}

export type JoinByCodeResult =
  | { kind: "ok"; batchName: string; orgName: string }
  | { kind: "already_member"; batchName: string }
  | { kind: "invalid_code" }
  | { kind: "closed" }
  | { kind: "error"; message: string };

/**
 * A student joins by typing the code.
 *
 * Service-role by necessity: a student cannot read `batches` at all (its policy
 * needs an org id and they have none), so nothing but the server can turn a
 * code into a batch. Presenting a valid code IS the grant, which is why
 * batch_enrollments still has no INSERT policy.
 *
 * `closed` is reported distinctly from `invalid_code`, which does concede that
 * a valid-but-closed code exists. That is a deliberate trade: over a 1.1e12
 * space behind a rate-limited endpoint the leak is negligible, and the student
 * standing in the classroom needs to know the difference between "you mistyped
 * it" and "ask your teacher to reopen it".
 */
export async function joinByCode(input: {
  userId: string;
  rawCode: string;
}): Promise<JoinByCodeResult> {
  const code = normalizeJoinCode(input.rawCode);
  if (!code) return { kind: "invalid_code" };

  try {
    const admin = createSupabaseAdminClient();
    const { data: batch } = await admin
      .from("batches")
      .select("id, name, org_id, archived, join_open")
      .eq("join_code", code)
      .maybeSingle<{
        id: string;
        name: string;
        org_id: string;
        archived: boolean;
        join_open: boolean;
      }>();
    if (!batch) return { kind: "invalid_code" };
    if (!batch.join_open || batch.archived) return { kind: "closed" };

    const { data: existing } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batch.id)
      .eq("user_id", input.userId)
      .maybeSingle();
    if (existing) return { kind: "already_member", batchName: batch.name };

    const { error } = await admin
      .from("batch_enrollments")
      .upsert(
        { batch_id: batch.id, user_id: input.userId },
        { onConflict: "batch_id,user_id" }
      );
    if (error) return { kind: "error", message: error.message };

    // Any pending invite to this batch is now moot — resolve it so the student
    // is not asked to accept something they have already joined.
    const { data: user } = await admin.auth.admin.getUserById(input.userId);
    const email = user?.user?.email?.toLowerCase();
    if (email) {
      await admin
        .from("batch_invites")
        .update({ status: "accepted", responded_at: new Date().toISOString() })
        .eq("batch_id", batch.id)
        .eq("email", email)
        .eq("status", "pending");
    }

    const { data: org } = await admin
      .from("organizations")
      .select("name")
      .eq("id", batch.org_id)
      .maybeSingle<{ name: string }>();

    return { kind: "ok", batchName: batch.name, orgName: org?.name ?? "An institute" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
