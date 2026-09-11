import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Where an institute's nda-tracker lives, and the secret that identifies us to
 * it (migration 0094).
 *
 * SERVICE-ROLE ONLY, and that is the design rather than convenience:
 * `tracker_sync_targets` has RLS enabled with NO policies (the `platform_admins`
 * pattern), so a cookie-bound client reads zero rows — including a signed-in org
 * admin's. A tracker credential is platform configuration, not org-visible data.
 * Verified against a populated table: service_role 1, anon 0, authenticated 0.
 *
 * ROUTING NEVER COMES FROM A PAYLOAD. A caller-chosen destination means one
 * wrong value delivers institute B's paper into institute A's tracker — so the
 * destination is looked up from the org, here, and the caller cannot influence it.
 */
export type TrackerTarget = {
  trackerUrl: string;
  sharedSecret: string;
};

/** The org's tracker, or null when that institute has none provisioned. */
export async function getTrackerTarget(
  orgId: string
): Promise<TrackerTarget | null> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("tracker_sync_targets")
    .select("tracker_url, shared_secret")
    .eq("org_id", orgId)
    .maybeSingle();

  // Surface rather than swallow: a failed lookup and "no tracker configured"
  // are different facts, and degrading the first into the second would disable
  // the Push button with a confidently wrong explanation.
  if (error) throw new Error(`tracker target lookup failed: ${error.message}`);
  if (!data) return null;

  return {
    trackerUrl: data.tracker_url as string,
    sharedSecret: data.shared_secret as string,
  };
}

/**
 * Whether this org has a tracker at all — for rendering the button's enabled
 * state WITHOUT pulling the secret into a page's data. The secret is only ever
 * read at the moment of a push, server-side.
 */
export async function hasTrackerTarget(orgId: string): Promise<boolean> {
  const admin = createSupabaseAdminClient();
  const { count, error } = await admin
    .from("tracker_sync_targets")
    .select("org_id", { count: "exact", head: true })
    .eq("org_id", orgId);
  if (error) throw new Error(`tracker target lookup failed: ${error.message}`);
  return (count ?? 0) > 0;
}

/**
 * The tracker endpoint the push posts to.
 *
 * `tracker_url` is stored as the app's ORIGIN (e.g. https://nda-tracker.vercel.app)
 * so the same row can serve both directions and any future endpoint. The path is
 * appended here rather than stored, so a tracker-side route rename is a code
 * change in one place instead of a data migration across every institute's row.
 */
export function paperImportUrl(target: TrackerTarget): string {
  return `${target.trackerUrl.replace(/\/$/, "")}/api/quiz-import`;
}
