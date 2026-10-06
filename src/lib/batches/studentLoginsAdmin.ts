/**
 * Staff-created student logins for a batch (the "Create student logins" card on
 * /dashboard/batches/[id]/roster).
 *
 * A teacher types or pastes name + email (+ optional password); each NEW email
 * gets a confirmed login and is enrolled in the batch at once, and the
 * credentials come back for the teacher to share. The account is an ordinary
 * org-less student account: no org_members row, the student can leave the
 * batch from /account like any other enrollment.
 *
 * AN EXISTING ACCOUNT IS NEVER TOUCHED. No password write, no enrollment: it
 * gets the ordinary batch invite (inviteToBatch), which the owner accepts or
 * declines. Writing to an existing account here would let any teacher take over
 * any student, the hole closed in members/admin.ts on 2026-10-06.
 *
 * AUTHORIZATION follows inviteToBatch: `client` is the CALLER's RLS client and
 * must be able to see the batch (batches_select_scoped, 0057). That check is
 * what licenses the service-role writes after it.
 *
 * Not "server-only", like invitesAdmin.ts: the integration tests import it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listAllAuthUsers } from "@/lib/supabase/authUsers";
import { inviteToBatch } from "./invitesAdmin";
import { generatePassword, type Credential, type StudentLine } from "./studentLogins";

export type CreateStudentLoginsResult =
  | {
      kind: "ok";
      /** New logins, with the password to share. Shown once, never stored. */
      created: Credential[];
      /** Had a login already, so sent a batch invite instead. */
      existing: string[];
      /** Already on this batch's roster; nothing to do. */
      alreadyInBatch: string[];
      failed: { email: string; reason: string }[];
      /** Of `existing`: declined this batch before, so not re-invited. */
      declined: number;
      /** Of `existing`: invite saved but its email did not go out. */
      inviteEmailFailures: number;
    }
  | { kind: "batch_not_found" }
  | { kind: "error"; message: string };

export async function createStudentLogins(input: {
  client: SupabaseClient;
  batchId: string;
  createdBy: string;
  students: StudentLine[];
}): Promise<CreateStudentLoginsResult> {
  const { client, batchId, createdBy, students } = input;
  try {
    const { data: batch } = await client
      .from("batches")
      .select("id")
      .eq("id", batchId)
      .maybeSingle<{ id: string }>();
    if (!batch) return { kind: "batch_not_found" };

    const admin = createSupabaseAdminClient();
    const idByEmail = new Map(
      (await listAllAuthUsers(admin))
        .filter((u) => u.email)
        .map((u) => [u.email!.toLowerCase(), u.id])
    );
    const { data: enrolledRows } = await admin
      .from("batch_enrollments")
      .select("user_id")
      .eq("batch_id", batchId);
    const enrolledIds = new Set((enrolledRows ?? []).map((r) => r.user_id as string));

    const created: Credential[] = [];
    const existing: string[] = [];
    const alreadyInBatch: string[] = [];
    const failed: { email: string; reason: string }[] = [];

    for (const s of students) {
      const uid = idByEmail.get(s.email);
      if (uid) {
        if (enrolledIds.has(uid)) alreadyInBatch.push(s.email);
        else existing.push(s.email);
        continue;
      }

      const password = s.password ?? generatePassword();
      const { data, error } = await admin.auth.admin.createUser({
        email: s.email,
        password,
        email_confirm: true,
        user_metadata: {
          name: s.name,
          signup_source: "staff",
          created_by_staff: createdBy,
          created_for_batch: batchId,
        },
      });
      if (error || !data.user) {
        console.error("createStudentLogins: createUser failed", s.email, error?.message);
        failed.push({ email: s.email, reason: error?.message ?? "Could not create the login" });
        continue;
      }

      const { error: enrollErr } = await admin
        .from("batch_enrollments")
        .insert({ batch_id: batchId, user_id: data.user.id });
      if (enrollErr) {
        // No half-made student: a login the teacher was never told about.
        console.error("createStudentLogins: enrollment failed", s.email, enrollErr.message);
        await admin.auth.admin.deleteUser(data.user.id);
        failed.push({ email: s.email, reason: "Could not add to the batch" });
        continue;
      }
      created.push({ name: s.name, email: s.email, password });
    }

    let declined = 0;
    let inviteEmailFailures = 0;
    if (existing.length > 0) {
      const inv = await inviteToBatch({
        client,
        batchId,
        invitedBy: createdBy,
        raw: existing.join("\n"),
      });
      if (inv.kind === "ok") {
        declined = inv.declined;
        inviteEmailFailures = inv.emailFailures;
      } else {
        const reason = inv.kind === "error" ? inv.message : "Could not send the invite";
        for (const email of existing.splice(0)) failed.push({ email, reason });
      }
    }

    return {
      kind: "ok",
      created,
      existing,
      alreadyInBatch,
      failed,
      declined,
      inviteEmailFailures,
    };
  } catch (err) {
    console.error("createStudentLogins:", err);
    return { kind: "error", message: err instanceof Error ? err.message : String(err) };
  }
}
