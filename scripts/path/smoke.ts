/**
 * `npm run path:smoke` — drive the board path's OWN read chain against live
 * data (MENTOR_SPEC.md Phase 1, 2026-11-07).
 *
 * WHY. /me is auth-gated `ƒ`, so `next build` never renders the path card, and
 * a unit test cannot say whether real content and real students produce a
 * sensible day. This proves, per board: every PCM chapter reads with its Top 10
 * and its chapter test, the queues come out in book order (HSC Maths as two),
 * and for real Class 12 students the states fold, a day of 2-4 tasks comes
 * back inside the free-limit caps, and the view builds.
 *
 * WHAT IT DOES NOT PROVE, said plainly: it reads with the SERVICE ROLE where
 * /me uses the student's own JWT (RLS is pinned by
 * tests/study-paths-rls.integration.test.ts); it treats each student as if
 * they had started a path today (no real path rows are read or written); it
 * renders no markup. Read-only: it never writes.
 *
 * Usage: npm run path:smoke [-- --students=N]   (N per board, default 8)
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readChapterTestEntries } from "@/lib/mocks/chapterTestsQuery";
import { loadOwnPool } from "@/lib/drill/compose";
import { istDayKey, istDayStartIso } from "@/lib/email/dueNudge";
import { nextSitting } from "@/lib/exam/calendar";
import { readPathContent } from "@/lib/path/contentRead";
import { readChapterStates } from "@/lib/path/stateRead";
import { PATH_EXAMS, PATH_SUBJECTS, chapterDone, type PathExam } from "@/lib/path/model";
import { bufferStart, startingDailyMinutes } from "@/lib/path/pace";
import { MAX_TASKS, fixQuestions, isChapterTask, pickToday, todayExemptions } from "@/lib/path/today";
import { buildPathView, chapterLine, pathRemainingMinutes } from "@/lib/path/view";
import { foldStates } from "@/lib/path/fold";
import { buildWeekReview, reviewLines } from "@/lib/path/review";
import { projectWeek, weekText } from "@/lib/path/week";
import { addDays } from "@/lib/path/pace";

const perBoard = Number(process.argv.find((a) => a.startsWith("--students="))?.split("=")[1] ?? 8);
const failures: string[] = [];
const check = (ok: boolean, what: string) => {
  if (!ok) failures.push(what);
};

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();
  const today = istDayKey(now);
  const tests = new Map(await readChapterTestEntries(db));

  const staff = new Set<string>();
  for (const t of ["org_members", "platform_admins"]) {
    const rows = await readAllPages<{ user_id: string }>((f, to) => db.from(t).select("user_id").range(f, to));
    for (const r of rows) staff.add(r.user_id);
  }

  for (const exam of PATH_EXAMS as readonly PathExam[]) {
    const chapters = await readPathContent(db, exam, tests);
    const sitting = nextSitting(exam, now);
    check(!!sitting, `${exam}: no board date in the calendar`);
    if (!sitting) continue;
    const buffer = bufferStart(sitting.date);

    // Content.
    const queues = [...new Set(chapters.map((c) => c.queue))];
    console.log(`\n${exam}  ${chapters.length} chapters · queues ${queues.join(", ")} · board ${sitting.date} · buffer ${buffer}`);
    for (const c of chapters) {
      check(c.top.length >= 10, `${exam} ${c.subject} ${c.name}: Top ${c.top.length}`);
      check(!!c.test, `${exam} ${c.subject} ${c.name}: no published chapter test`);
      check(c.boardPath.startsWith(`/board/${exam}/`), `${exam} ${c.name}: board path ${c.boardPath}`);
    }
    for (const s of PATH_SUBJECTS) {
      const ranks = chapters.filter((c) => c.subject === s).map((c) => c.rank);
      check(ranks.every((r, i) => r === i + 1), `${exam} ${s}: ranks not 1..n in book order`);
    }
    if (exam === "mh-hsc-12") {
      const m1 = chapters.filter((c) => c.queue === "mathematics-1").length;
      const m2 = chapters.filter((c) => c.queue === "mathematics-2").length;
      check(m1 === 7 && m2 === 8, `HSC Maths queues ${m1}/${m2}, want 7/8`);
    }
    const startMinutes = startingDailyMinutes(pathRemainingMinutes(chapters, new Map()), today, buffer);
    console.log(`  from zero: about ${startMinutes} min a day`);

    // Students: the most recently active of this board's Class 12 students.
    const profiles = await readAllPages<{ user_id: string }>((f, to) =>
      db.from("student_profiles").select("user_id").contains("target_exams", [exam]).order("user_id").range(f, to)
    );
    const cohort = profiles.map((p) => p.user_id).filter((u) => !staff.has(u));
    const recent: string[] = [];
    for (let i = 0; i < cohort.length && recent.length < perBoard; i += 200) {
      const { data } = await db
        .from("user_activity")
        .select("user_id")
        .in("user_id", cohort.slice(i, i + 200))
        .gte("created_at", new Date(now.getTime() - 7 * 86_400_000).toISOString())
        .limit(1000);
      for (const r of data ?? []) if (!recent.includes(r.user_id as string) && recent.length < perBoard) recent.push(r.user_id as string);
    }

    for (const userId of recent) {
      const { states, facts } = await readChapterStates(db, userId, chapters);
      const pool = await loadOwnPool(db, userId, now);
      const fix = fixQuestions(pool.drillable, new Set(chapters.map((c) => c.id)), istDayStartIso(now));
      const daily = startingDailyMinutes(pathRemainingMinutes(chapters, states), today, buffer);
      const tasks = pickToday({ chapters, states, deferred: new Set(), budget: daily, fix });
      const ex = todayExemptions(tasks, chapters);
      const view = buildPathView({
        exam,
        subjects: ["physics", "chemistry", "mathematics"],
        stream: null,
        dailyMinutes: daily,
        chapters,
        states,
        tasks,
        fixAnswered: new Set(),
        today,
        examDate: sitting.date,
        examOfficial: sitting.official,
      });
      const done = chapters.filter((c) => chapterDone(c, states.get(c.id)!)).length;
      const anyLeft = done < chapters.length;
      check(!anyLeft || (tasks.length >= 2 && tasks.length <= MAX_TASKS), `${userId.slice(0, 8)}: ${tasks.length} tasks`);
      check(ex.revealIds.length <= 200 && ex.drillIds.length <= 5, `${userId.slice(0, 8)}: exemptions over the column caps`);
      check(view.tasks.every((t) => t.href.startsWith("/")), `${userId.slice(0, 8)}: a task without a link`);
      // Phase 2 on live records: the dated fold agrees with the plain one as of
      // now (Postgres writes +00:00, JavaScript Z), a week's review reads, the
      // coming days never repeat a part, and the /board line has parts.
      const asOfNow = foldStates(chapters, facts, now.toISOString());
      check(
        chapters.every((c) => JSON.stringify(asOfNow.get(c.id)) === JSON.stringify(states.get(c.id))),
        `${userId.slice(0, 8)}: the dated fold disagrees with the plain one`
      );
      const review = reviewLines(
        buildWeekReview({ chapters, facts, from: addDays(today, -7), to: today, daily, fixed: 0, next: null })
      );
      check(!/\b0 /.test(review.join(" ")), `${userId.slice(0, 8)}: a zero in the review`);
      const week = projectWeek({ chapters, states, deferred: new Set(), budget: daily, today, todayTasks: tasks });
      const parts = week.flatMap((d) => d.tasks.flatMap((t) => (t.kind === "fix" ? [] : [`${t.kind}:${t.chapterId}`])));
      check(new Set(parts).size === parts.length, `${userId.slice(0, 8)}: the coming days repeat a part`);
      const first = tasks.find(isChapterTask);
      const firstChapter = first ? chapters.find((c) => c.id === first.chapterId) : undefined;
      if (firstChapter) {
        const line = chapterLine(firstChapter, states.get(firstChapter.id)!, tasks);
        check(line.parts.length > 0 && line.today !== null, `${userId.slice(0, 8)}: the /board line for today's chapter is empty`);
      }
      console.log(`      last 7 days: ${review.join(" ")}`);
      for (const l of weekText(week.slice(0, 3), chapters)) console.log(`      ${l}`);
      console.log(
        `  ${userId.slice(0, 8)}  done ${done}/${chapters.length} · ${daily} min/day · fix ${fix.length} · ` +
          `today ${tasks.map((t) => (t.kind === "fix" ? `fix${t.questionIds.length}` : t.kind)).join("+")} (${view.todayMinutes} min) · ${view.pace.onTrack ? "on track" : `behind ${view.pace.behindDays}d`}`
      );
    }
  }

  if (failures.length) {
    console.error(`\nFAIL (${failures.length})`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("\nOK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
