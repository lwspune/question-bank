// No `server-only` here (the rosterQuery pattern): the caller passes the
// service-role client, so scripts/play/smoke.ts can drive this same loader.
import type { createTypedAdminClient } from "@/lib/supabase/admin";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { namesForUsers } from "@/lib/supabase/authUsers";
import { buildPlayStats, STUDY_KINDS, type PlayRoundRow, type PlayStats, type StudyRow } from "@/lib/play/adminStats";

type Admin = ReturnType<typeof createTypedAdminClient>;

const WEEK_MS = 7 * 86_400_000;

/**
 * Everything /dashboard/play shows. Service role, so call it only after a
 * superadmin check. Staff (org members + platform admins) are left out, as in
 * scripts/play/readout.sql. Every read is paged past PostgREST's 1000-row cap.
 */
export async function loadPlayStats(admin: Admin, now: Date = new Date()): Promise<PlayStats> {
  const [rawRounds, members, platform] = await Promise.all([
    readAllPages<{ user_id: string; created_at: string; metadata: unknown }>((from, to) =>
      admin
        .from("user_activity")
        .select("user_id, created_at, metadata")
        .eq("kind", "play_round")
        .order("created_at")
        .order("id")
        .range(from, to)
    ),
    readAllPages<{ user_id: string }>((from, to) =>
      admin.from("org_members").select("user_id").order("user_id").range(from, to)
    ),
    readAllPages<{ user_id: string }>((from, to) =>
      admin.from("platform_admins").select("user_id").order("user_id").range(from, to)
    ),
  ]);

  const staff = new Set([...members, ...platform].map((r) => r.user_id));
  const rounds: PlayRoundRow[] = rawRounds
    .filter((r) => !staff.has(r.user_id))
    .map((r) => ({
      userId: r.user_id,
      createdAt: r.created_at,
      metadata: r.metadata && typeof r.metadata === "object" && !Array.isArray(r.metadata)
        ? (r.metadata as Record<string, unknown>)
        : null,
    }));

  // First round per player bounds the study window: 7 days either side.
  const firstMs = new Map<string, number>();
  for (const r of rounds) {
    const ms = Date.parse(r.createdAt);
    const prev = firstMs.get(r.userId);
    if (prev === undefined || ms < prev) firstMs.set(r.userId, ms);
  }
  const userIds = [...firstMs.keys()];

  const study: StudyRow[] = [];
  if (userIds.length) {
    const firsts = [...firstMs.values()];
    const from = new Date(Math.min(...firsts) - WEEK_MS).toISOString();
    const to = new Date(Math.max(...firsts) + WEEK_MS).toISOString();
    // readInChunks: `.in()` puts the ids in the URL, so they go 200 at a time (CLAUDE.md).
    const rows = await readInChunks<{ user_id: string; created_at: string }>(userIds, (ids, a, b) =>
      admin
        .from("user_activity")
        .select("user_id, created_at")
        .in("user_id", ids)
        .in("kind", [...STUDY_KINDS])
        .gte("created_at", from)
        .lt("created_at", to)
        .order("id")
        .range(a, b)
    );
    for (const r of rows) study.push({ userId: r.user_id, createdAt: r.created_at });
  }

  const names = await namesForUsers(admin, userIds);

  return buildPlayStats({ rounds, study, names, now });
}
