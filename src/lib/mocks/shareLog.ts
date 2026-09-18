/**
 * Best-effort write of a share_events row (migration 0109).
 *
 * WHY: the mock result screen now offers a share, and without an outbound
 * counter "no signups from shares" reads the same whether nobody tapped the
 * button or plenty did and nobody clicked through — opposite fixes. See the
 * migration header for the full argument.
 *
 * SERVICE-ROLE by necessity: share_events has RLS enabled with ZERO policies,
 * so no JWT-bound client can write to it. Same posture as export_events (0104).
 *
 * NEVER THROWS. A failed analytics insert must not break a student's share —
 * the sheet has usually already opened by the time this resolves. Failures are
 * logged at the boundary and swallowed, like the activity spine's writer.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ShareChannel } from "./share";

export type ShareEvent = {
  userId: string | null;
  subjectKind: "mock";
  subjectSlug: string;
  channel: ShareChannel;
  includedScore: boolean;
};

export async function recordShareEvent(ev: ShareEvent): Promise<void> {
  try {
    const db = createSupabaseAdminClient();
    const { error } = await db.from("share_events").insert({
      user_id: ev.userId,
      subject_kind: ev.subjectKind,
      subject_slug: ev.subjectSlug.slice(0, 200),
      channel: ev.channel,
      included_score: ev.includedScore,
    });
    if (error) console.error("recordShareEvent", error.message);
  } catch (e) {
    console.error("recordShareEvent", e instanceof Error ? e.message : e);
  }
}
