/**
 * Best-effort write of an export_events row (migration 0104).
 *
 * WHY: /api/export served the teacher-gated Word/PPT download and recorded
 * nothing, so the gate's whole premise — that a downloadable paper is a teacher
 * artifact worth gating — was untestable. This makes download volume, artifact
 * mix and staff-vs-other use measurable.
 *
 * SERVICE-ROLE by necessity: export_events has RLS enabled with ZERO policies,
 * so no JWT-bound client can write to it. That is the intended posture — the
 * table is written by the server and read only by admin surfaces.
 *
 * NEVER THROWS. A failed analytics insert must not turn a successful download
 * into a 500 for a teacher who is mid-lesson-prep. Failures are logged at the
 * boundary and swallowed, exactly like the activity spine's writer.
 *
 * NO `server-only` IMPORT, deliberately: this is reachable from /api/export,
 * whose route tests import the handler directly, and vitest cannot resolve that
 * module. Same posture as lib/supabase/admin.ts and lib/rate-limit.ts, which the
 * same route already imports — the protection is the doc comment plus the fact
 * that the service-role key does not exist in a browser bundle.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ExportKind } from "./access";

export type ExportEvent = {
  userId: string | null;
  orgId: string | null;
  kind: ExportKind;
  questionCount: number;
  /** 'cart' = explicit question ids; 'filters' = a filtered slice of the bank. */
  mode: "cart" | "filters";
  isStaff: boolean;
};

export async function recordExportEvent(ev: ExportEvent): Promise<void> {
  try {
    const db = createSupabaseAdminClient();
    const { error } = await db.from("export_events").insert({
      user_id: ev.userId,
      org_id: ev.orgId,
      kind: ev.kind,
      question_count: Math.max(0, Math.floor(ev.questionCount)),
      mode: ev.mode,
      is_staff: ev.isStaff,
    });
    if (error) console.error("recordExportEvent", error.message);
  } catch (e) {
    console.error("recordExportEvent", e instanceof Error ? e.message : e);
  }
}
