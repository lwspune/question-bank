/**
 * The readout's FUNNEL section (MENTOR_SPEC.md Phase 4, 2026-11-08): the start
 * offer seen and taken, Lighter / More, the weekly review, "Pick up here",
 * V's path card, the /board line, "Not taught yet" and stops. Counted by the
 * pure core lib/path/funnel summarizeFunnel; staff left out.
 *
 * The views exist only from the day the Phase 4 events shipped; before that
 * this section reads nothing for them (a floor, never a zero to trust).
 * Read-only, service role, paged at 1000 rows, `.in()` chunked at 200.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { istDayKey } from "@/lib/email/dueNudge";
import { PATH_SURFACES, summarizeFunnel } from "@/lib/path/funnel";

export async function reportFunnel(db: SupabaseClient, staff: ReadonlySet<string>): Promise<void> {
  const keep = (user: string) => !staff.has(user);
  const [viewRows, pacedRows, paths, deferralRows] = await Promise.all([
    readAllPages<{ user_id: string; surface: string; created_at: string }>((f, t) =>
      db
        .from("user_activity")
        .select("user_id, surface:metadata->>surface, created_at")
        .eq("kind", "surface_viewed")
        .in("metadata->>surface", [...PATH_SURFACES])
        .order("id")
        .range(f, t)
    ),
    readAllPages<{ user_id: string; direction: string; from: string; to: string }>((f, t) =>
      db
        .from("user_activity")
        .select("user_id, direction:metadata->>direction, from:metadata->>from, to:metadata->>to")
        .eq("kind", "path_paced")
        .order("id")
        .range(f, t)
    ),
    readAllPages<{ user_id: string; started_at: string; ended_at: string | null }>((f, t) =>
      db.from("study_paths").select("user_id, started_at, ended_at").order("id").range(f, t)
    ),
    readAllPages<{ user_id: string; chapter_id: string }>((f, t) =>
      db.from("study_path_deferrals").select("user_id, chapter_id").order("id").range(f, t)
    ),
  ]);
  const chapterIds = [...new Set(deferralRows.map((d) => d.chapter_id))];
  const names = new Map(
    (
      await readInChunks<{ id: string; name: string }>(chapterIds, (part, f, t) =>
        db.from("chapters").select("id, name").in("id", part).order("id").range(f, t)
      )
    ).map((c) => [c.id, c.name])
  );

  const s = summarizeFunnel({
    views: viewRows.filter((v) => keep(v.user_id)).map((v) => ({ user: v.user_id, surface: v.surface, day: istDayKey(new Date(v.created_at)) })),
    starts: paths.filter((p) => keep(p.user_id)).map((p) => ({ user: p.user_id, at: istDayKey(new Date(p.started_at)) })),
    paced: pacedRows
      .filter((p) => keep(p.user_id) && (p.direction === "lighter" || p.direction === "more"))
      .map((p) => ({ user: p.user_id, direction: p.direction as "lighter" | "more", from: Number(p.from), to: Number(p.to) })),
    deferrals: deferralRows.filter((d) => keep(d.user_id)).map((d) => ({ user: d.user_id, chapter: names.get(d.chapter_id) ?? d.chapter_id })),
    stops: paths.filter((p) => keep(p.user_id) && p.ended_at !== null).length,
  });

  console.log("\nFUNNEL  (views recorded from 2026-11-08; staff out)");
  console.log(`  start offer seen: ${s.offerSeen.either} students (on /me ${s.offerSeen.me}, on /board ${s.offerSeen.board})`);
  console.log(`  started: ${s.started} · of them after seeing the offer: ${s.startedAfterOffer} · stopped: ${s.stops}`);
  console.log(`  Lighter / More: ${s.pace.students} students, ${s.pace.more} More, ${s.pace.lighter} Lighter, net ${s.pace.netMinutes >= 0 ? "+" : ""}${s.pace.netMinutes} min a day`);
  console.log(`  seen: weekly review ${s.seen.review} · Pick up here ${s.seen.pickup} · V's path card ${s.seen.vCard} · /board line ${s.seen.boardLine}`);
  console.log(`  Not taught yet: ${s.deferrals.taps} taps by ${s.deferrals.students} students`);
  for (const [chapter, n] of s.deferrals.top) console.log(`    ${n}  ${chapter}`);
}
