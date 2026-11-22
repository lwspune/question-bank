/**
 * Drive V's "Your day" card (lib/chat/dayCard.ts) over real students, read-only.
 *
 *   npm run day-card:smoke          # 25 heaviest + 25 lighter students active in the last 14 days
 *   npm run day-card:smoke -- 40    # 40 of each
 *
 * WHY. The card is behind a tap on V, for a signed-in student, once a day: no
 * build or curl reaches it. This builds each student's card from the same
 * pieces the route uses (the drill pool, the performance payload, the board
 * plan, the exam pick) and checks it makes sense: no line shows a zero, the
 * Today count is the drill's own count, and a student with something to say
 * gets a card.
 *
 * WHAT IT DOES NOT PROVE. It reads with the SERVICE ROLE, so the practice
 * days come from a copy of get_own_day_card's rule here (0262 reads as the
 * student, auth.uid(); tests/own-day-card.integration.test.ts covers it), and
 * it renders no markup. Prints no student ids or names. Exits 1 on a broken check.
 */
import { join } from "node:path";
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

// Must precede the profile and path imports: those modules are `server-only`.
import "../lib/serverOnly";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { loadOwnPool } from "@/lib/drill/compose";
import { fixedCount } from "@/lib/drill/select";
import { fetchStudentPerformance } from "@/lib/performance/query";
import { selectAttempts } from "@/lib/performance/compute";
import { getOwnProfile } from "@/lib/profile/service";
import { getActivePath } from "@/lib/path/service";
import { isPathExam } from "@/lib/path/model";
import { resolveExamDate } from "@/lib/exam/calendar";
import { readExamCalendar } from "@/lib/exam/calendarRead";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { mockDays, movedUpSince, pickProgressExams } from "@/lib/chat/progressCard";
import { buildDayCard, fixedBetween, istDay, lastVisit, mergeDays, type DayCard, type DayPlan, type DaySpan } from "@/lib/chat/dayCard";

const N = Number(process.argv[2] ?? 25);
const DAY = 86_400_000;
const IST = 5.5 * 3_600_000;

type Act = { user_id: string; kind: string; ref_id: string | null; created_at: string; metadata: Record<string, unknown> | null };

/** get_own_day_card's answer rule (0262), for one student, read with the service role. */
async function practiceDays(
  db: ReturnType<typeof createSupabaseAdminClient>,
  rows: Act[],
  examId: string | null
): Promise<{ examId: string | null; days: DaySpan[] }> {
  const answers = rows.filter(
    (r) =>
      (r.kind === "question_practiced" && r.metadata && "correct" in r.metadata) ||
      ((r.kind === "answer_wrong" || r.kind === "answer_correct") && r.metadata?.surface === "drill")
  );
  const ids = [...new Set(answers.map((a) => a.ref_id).filter((x): x is string => !!x && /^[0-9a-f-]{36}$/i.test(x)))];
  const place = new Map<string, { exam: string; chapter: string | null }>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db.from("questions").select("id, exam_id, chapters(name)").in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) {
      const ch = (q as { chapters: { name: string } | { name: string }[] | null }).chapters;
      place.set(q.id as string, { exam: q.exam_id as string, chapter: Array.isArray(ch) ? (ch[0]?.name ?? null) : (ch?.name ?? null) });
    }
  }
  const placed = answers.flatMap((a) => {
    const p = a.ref_id ? place.get(a.ref_id) : undefined;
    if (!p) return [];
    const right = (a.kind === "question_practiced" && a.metadata?.correct === true) || (a.kind === "answer_correct" && a.metadata?.surface === "drill");
    return [{ day: istDay(a.created_at), exam: p.exam, chapter: p.chapter, right }];
  });
  let chosen = examId;
  if (!chosen) {
    const n = new Map<string, number>();
    for (const p of placed) n.set(p.exam, (n.get(p.exam) ?? 0) + 1);
    chosen = [...n.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? null;
  }
  const byDay = new Map<string, { answered: number; right: number; ch: Map<string, number> }>();
  for (const p of placed) {
    if (p.exam !== chosen) continue;
    const d = byDay.get(p.day) ?? { answered: 0, right: 0, ch: new Map<string, number>() };
    d.answered++;
    if (p.right) d.right++;
    if (p.chapter) d.ch.set(p.chapter, (d.ch.get(p.chapter) ?? 0) + 1);
    byDay.set(p.day, d);
  }
  const days = [...byDay.entries()].map(([day, d]) => {
    const top = [...d.ch.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
    return { day, answered: d.answered, right: d.right, topChapter: top ? { name: top[0], answered: top[1] } : null };
  });
  return { examId: chosen, days };
}

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();
  const calendar = await readExamCalendar(db);
  const istNow = now.getTime() + IST;
  const todayStart = new Date(istNow - (istNow % DAY) - IST);
  const since = new Date(todayStart.getTime() - 30 * DAY).toISOString();

  const { data: exams, error: examErr } = await db.from("exams").select("id, name");
  if (examErr) throw new Error(examErr.message);
  const idByName = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));
  const nameById = new Map((exams ?? []).map((e) => [e.id as string, e.name as string]));
  const staff = new Set(((await db.from("org_members").select("user_id")).data ?? []).map((r) => r.user_id as string));

  // Active in the last 14 days, by answer rows: the heaviest N and N lighter ones (2-20 rows).
  const recent = await readAllPages<{ user_id: string }>((from, to) =>
    db
      .from("user_activity")
      .select("user_id")
      .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
      .gte("created_at", new Date(now.getTime() - 14 * DAY).toISOString())
      .order("id")
      .range(from, to)
      .returns<{ user_id: string }[]>()
  );
  const counts = new Map<string, number>();
  for (const r of recent) if (!staff.has(r.user_id)) counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const heavy = ranked.slice(0, N).map(([u]) => u);
  const light = ranked.filter(([, n]) => n >= 2 && n <= 20).slice(0, N).map(([u]) => u);
  // Board-plan students, whose card leads with the plan's own task.
  const { data: paths, error: pathErr } = await db.from("study_paths").select("user_id").is("ended_at", null).limit(500);
  if (pathErr) throw new Error(pathErr.message);
  const onPlan = (paths ?? []).map((p) => p.user_id as string).filter((u) => !staff.has(u)).slice(0, N);
  const users = [...new Set([...heavy, ...light, ...onPlan])];
  console.log(
    `students: ${heavy.length} heaviest + ${light.length} lighter + ${onPlan.length} on the board plan = ${users.length} (staff left out)\n`
  );

  const broken: string[] = [];
  const kinds: Record<DayCard["kind"] | "none", number> = { yesterday: 0, since: 0, fresh: 0, none: 0 };
  const lines: Record<string, number> = {};
  const samples: { who: string; card: DayCard }[] = [];

  for (const [i, userId] of users.entries()) {
    const who = `student ${i + 1}${heavy.includes(userId) ? " (heavy)" : ""}`;
    const [profile, perf, pool, acts, active] = await Promise.all([
      getOwnProfile(db, userId),
      fetchStudentPerformance(db, userId),
      loadOwnPool(db, userId, now),
      readAllPages<Act>((from, to) =>
        db
          .from("user_activity")
          .select("user_id, kind, ref_id, created_at, metadata")
          .eq("user_id", userId)
          .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
          .gte("created_at", since)
          .lt("created_at", todayStart.toISOString())
          .order("id")
          .range(from, to)
          .returns<Act[]>()
      ),
      getActivePath(db, userId).catch(() => null),
    ]);

    const latest = selectAttempts(perf.attempts, perf.facts).kept.sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];
    const latestSlug = latest ? (EXAM_REGISTRY.find((e) => e.examName === latest.examName)?.slug ?? null) : null;
    const planExam = active && isPathExam(active.exam) ? active.exam : null;
    const picked = pickProgressExams({ asked: planExam, targetExams: profile.targetExams, latestMockExam: latestSlug });
    let exam = picked.exam ? EXAM_REGISTRY.find((e) => e.slug === picked.exam) : undefined;
    const prac = await practiceDays(db, acts, exam ? (idByName.get(exam.examName) ?? null) : null);
    exam ??= EXAM_REGISTRY.find((e) => e.examName === nameById.get(prac.examId ?? ""));
    if (!exam) {
      kinds.none++;
      continue;
    }

    const days = mergeDays(prac.days, mockDays(perf, exam.examName));
    const last = lastVisit(days, now);
    const lastStart = last ? new Date(Date.parse(`${last.day}T00:00:00Z`) - IST) : null;
    // The plan's own read (getPathToday) runs through Next's page cache and cannot run in a
    // script, so its lines are proven by tests/chat-day-card.test.ts and the phone check.
    // What this checks for a plan student is that the card is for the plan's exam.
    const plan: DayPlan | null = null;
    if (planExam && profile.targetExams.includes(planExam)) {
      lines["(on the plan)"] = (lines["(on the plan)"] ?? 0) + 1;
      if (exam.slug !== planExam) broken.push(`${who}: on the ${planExam} plan but the card is for ${exam.slug}`);
    }
    const fixedOnDay = last ? fixedBetween(pool.events, last.day) : 0;
    const card = buildDayCard({
      exam: { slug: exam.slug, displayName: exam.displayName },
      now,
      daysLeft:
        resolveExamDate({ targetExams: [exam.slug], examDate: profile.targetExams[0] === exam.slug ? profile.examDate : null }, now, calendar)
          ?.daysLeft ?? null,
      days,
      fixedOnDay,
      fixedTotal: fixedCount(pool.events, now),
      dueChapters: pool.drillable.map((d) => d.chapter),
      movedUp: lastStart ? movedUpSince(perf, exam.examName, now, lastStart) : [],
      plan,
    });

    if (!card) {
      kinds.none++;
      if (last || pool.drillable.length > 0) broken.push(`${who}: has a last visit or mistakes waiting but no card`);
      continue;
    }
    kinds[card.kind]++;
    for (const r of card.rows) lines[r.label] = (lines[r.label] ?? 0) + 1;
    for (const r of card.rows) if (/^0 /.test(r.value)) broken.push(`${who}: a line shows zero: ${r.label} "${r.value}"`);
    const today = card.rows.find((r) => r.label === "Today");
    if (today && !today.value.startsWith(`${pool.drillable.length} `)) broken.push(`${who}: Today says "${today.value}", drill has ${pool.drillable.length}`);
    const rightThatDay = last ? pool.events.filter((e) => e.correct && istDay(e.at) === last.day).length : 0;
    if (fixedOnDay > rightThatDay) broken.push(`${who}: fixed ${fixedOnDay} on a day with ${rightThatDay} right drill-log answers`);
    if (samples.length < 6 && (samples.length < 3 || card.kind === "since" || planExam)) samples.push({ who, card });
  }

  console.log("cards:", kinds);
  console.log("lines shown:", lines);
  for (const s of samples) {
    console.log(`\n${s.who} · ${s.card.title} · ${s.card.subtitle}`);
    console.log(`  V: ${s.card.greeting}`);
    for (const r of s.card.rows) console.log(`  ${r.label}: ${r.value}${r.detail ? ` (${r.detail})` : ""}`);
    console.log(`  [${s.card.primary.label}]${s.card.secondary ? ` [${s.card.secondary.label}]` : ""}`);
  }
  if (broken.length) {
    console.log(`\nBROKEN (${broken.length}):`);
    for (const b of broken) console.log(`  ${b}`);
    process.exit(1);
  }
  console.log("\nOK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
