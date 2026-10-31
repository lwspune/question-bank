/**
 * Are students using animated solutions? Read-only.
 *
 *   npm run visuals:usage                          # since the events began, every grouping
 *   npm run visuals:usage -- --since=2026-11-03    # from an India day
 *   npm run visuals:usage -- --by=scene            # one grouping: all | surface | exam | scene | day
 *
 * Reads the `solution_visual` events (migration 0208, lib/visuals/usage) of
 * signed-in students, leaving out staff (org members and platform admins:
 * the owner's own taps are not student use). Counts are student-question
 * pairs: "shown" = the first run started on screen, "finished" = a run reached
 * the last step, "still" = switched that solution to Still. Signed-out
 * visitors are never recorded, so every number is a floor.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { istDayKey, istDayStartIso } from "../../src/lib/email/dueNudge";
import {
  summarizeVisualUsage,
  VISUAL_ACTIONS,
  VISUAL_SURFACES,
  type UsageGroupBy,
  type UsageRow,
  type VisualAction,
  type VisualSurface,
} from "../../src/lib/visuals/usage";

const PAGE = 1000;
const CHUNK = 150;
const GROUPINGS: UsageGroupBy[] = ["all", "day", "surface", "exam", "scene"];

async function staffIds(db: SupabaseClient): Promise<Set<string>> {
  const out = new Set<string>();
  for (const table of ["org_members", "platform_admins"]) {
    const { data, error } = await db.from(table).select("user_id").range(0, PAGE * 10);
    if (error) throw new Error(`${table}: ${error.message}`);
    for (const r of (data ?? []) as { user_id: string }[]) out.add(r.user_id);
  }
  return out;
}

async function examsOf(db: SupabaseClient, ids: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db.from("questions").select("id, exams(name)").in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`questions: ${error.message}`);
    for (const r of (data ?? []) as unknown as { id: string; exams: { name: string } | null }[]) out.set(r.id, r.exams?.name ?? "?");
  }
  return out;
}

function pad(s: string | number, n: number): string {
  return String(s).padStart(n);
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const since = process.argv.find((a) => a.startsWith("--since="))?.slice(8);
  const by = process.argv.find((a) => a.startsWith("--by="))?.slice(5) as UsageGroupBy | undefined;
  if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error("--since takes an India day, YYYY-MM-DD");
  if (by && !GROUPINGS.includes(by)) throw new Error(`--by takes one of ${GROUPINGS.join(", ")}`);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

  const staff = await staffIds(db);
  type Raw = { user_id: string; ref_id: string; created_at: string; metadata: { surface?: string; action?: string; scene?: string } };
  const raw: Raw[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = db.from("user_activity").select("user_id, ref_id, created_at, metadata").eq("kind", "solution_visual");
    if (since) q = q.gte("created_at", istDayStartIso(new Date(`${since}T12:00:00+05:30`)));
    const { data, error } = await q.order("id").range(from, from + PAGE - 1);
    if (error) throw new Error(`user_activity: ${error.message}`);
    raw.push(...((data ?? []) as Raw[]));
    if ((data ?? []).length < PAGE) break;
  }

  const students = raw.filter((r) => !staff.has(r.user_id));
  const exams = await examsOf(db, [...new Set(students.map((r) => r.ref_id))]);
  const rows: UsageRow[] = students
    .filter(
      (r) =>
        (VISUAL_ACTIONS as readonly string[]).includes(r.metadata.action ?? "") &&
        (VISUAL_SURFACES as readonly string[]).includes(r.metadata.surface ?? ""),
    )
    .map((r) => ({
      userId: r.user_id,
      questionId: r.ref_id,
      action: r.metadata.action as VisualAction,
      surface: r.metadata.surface as VisualSurface,
      scene: r.metadata.scene ?? "unknown",
      exam: exams.get(r.ref_id) ?? "?",
      day: istDayKey(new Date(r.created_at)),
    }));

  console.log(`Animated-solution events${since ? ` since ${since}` : ""}: ${rows.length} from students (${raw.length - students.length} staff rows left out)`);
  if (rows.length === 0) return;
  console.log("Counts are student-question pairs. finished% and still% are of shown.\n");
  for (const g of by ? [by] : GROUPINGS) {
    console.log(`By ${g}`);
    console.log(`${"".padEnd(28)}${pad("students", 9)}${pad("shown", 7)}${pad("finished", 9)}${pad("fin%", 6)}${pad("replay", 7)}${pad("still", 6)}${pad("still%", 7)}${pad("back", 5)}${pad("opened in still", 16)}`);
    for (const r of summarizeVisualUsage(rows, g)) {
      console.log(
        `${r.key.slice(0, 27).padEnd(28)}${pad(r.students, 9)}${pad(r.shown, 7)}${pad(r.finished, 9)}${pad(r.finishedPct ?? "-", 6)}${pad(r.replayed, 7)}${pad(r.choseStill, 6)}${pad(r.stillPct ?? "-", 7)}${pad(r.choseAnimated, 5)}${pad(r.openedStill, 16)}`,
      );
    }
    console.log("");
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
