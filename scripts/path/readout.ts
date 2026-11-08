/**
 * `npm run path:readout` — the mentor path's numbers (MENTOR_SPEC.md §9).
 *
 * PHASE 0 (2026-11-07): the BASELINE on the students the path is for:
 * signed-in Class 12 students (target exam cbse-12 or mh-hsc-12), staff left
 * out, active in the last 30 days.
 *
 * PHASE 1 adds STARTERS (./starters.ts): students who started a path, judged
 * against the §9 targets, plus the chapter tests the path granted.
 *
 * What it reads, all through the path's own rules (lib/path/done):
 *   - active days: distinct IST days with any recorded activity, last 30 days;
 *   - chapters done: every PCM chapter of the student's board(s), each with its
 *     three parts (revision sheet opened · Top 10 worked · chapter test
 *     finished with answers), over ALL recorded time;
 *   - fixing mistakes: students with a recorded miss in 30 days who answered
 *     in the drill on 2+ IST days.
 *
 * Read-only, service role. Reads are paged (1000-row cap) and `.in()` lists
 * chunked at 200 (URL length).
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { getSubjectChapterTop } from "@/lib/homework/query";
import { readChapterTestEntries } from "@/lib/mocks/chapterTestsQuery";
import { istDayKey } from "@/lib/email/dueNudge";
import type { ProgressEvent, QuestionFormat } from "@/lib/homework/progress";
import { chapterParts, isFinishedTest, revisionPath, topWorked, type TopSlot } from "@/lib/path/done";
import { reportStarters } from "./starters";

const BOARDS = [
  { slug: "cbse-12", name: "CBSE Class 12" },
  { slug: "mh-hsc-12", name: "Maharashtra HSC Class 12" },
] as const;
const PCM = ["Physics", "Chemistry", "Mathematics"];
const CHUNK = 200;
const DAY_MS = 86_400_000;

type Chapter = {
  board: string;
  subject: string;
  id: string;
  name: string;
  revisionPath: string;
  top: TopSlot[];
  testMockId: string | null;
};

const chunks = <T,>(xs: T[]) => Array.from({ length: Math.ceil(xs.length / CHUNK) }, (_, i) => xs.slice(i * CHUNK, (i + 1) * CHUNK));

async function staffIds(db: SupabaseClient): Promise<Set<string>> {
  const out = new Set<string>();
  for (const t of ["org_members", "platform_admins"]) {
    const rows = await readAllPages<{ user_id: string }>((f, to) => db.from(t).select("user_id").range(f, to));
    for (const r of rows) out.add(r.user_id);
  }
  return out;
}

async function loadChapters(db: SupabaseClient): Promise<Chapter[]> {
  const tests = new Map(await readChapterTestEntries(db));
  const slugs = [...tests.values()].map((t) => t.slug);
  const mockIdBySlug = new Map<string, string>();
  for (const part of chunks(slugs)) {
    const { data, error } = await db.from("mock_tests").select("id, slug").in("slug", part);
    if (error) throw new Error(`mock_tests: ${error.message}`);
    for (const r of data ?? []) mockIdBySlug.set(r.slug as string, r.id as string);
  }

  const out: Chapter[] = [];
  for (const b of BOARDS) {
    const { data: exam } = await db.from("exams").select("id").eq("name", b.name).single();
    const { data: subjects } = await db.from("subjects").select("id, name").eq("exam_id", exam!.id).in("name", PCM);
    for (const s of subjects ?? []) {
      const { data: chs } = await db
        .from("chapters").select("id, name, order_index").eq("subject_id", s.id).order("order_index");
      for (const c of chs ?? []) {
        if (/\[Outdated\]/i.test(c.name as string)) continue;
        const top = await getSubjectChapterTop(db, { examId: exam!.id, subjectId: s.id, chapterId: c.id as string });
        const items = top?.items ?? [];
        const formats = new Map<string, QuestionFormat>();
        if (items.length) {
          const { data: qs } = await db.from("questions").select("id, question_format").in("id", items.map((i) => i.questionId));
          for (const q of qs ?? []) formats.set(q.id as string, (q.question_format ?? "mcq") as QuestionFormat);
        }
        const bySlot = new Map<number, { id: string; format: QuestionFormat }[]>();
        for (const it of items) {
          const parts = bySlot.get(it.position) ?? [];
          parts.push({ id: it.questionId, format: formats.get(it.questionId) ?? "mcq" });
          bySlot.set(it.position, parts);
        }
        const test = tests.get(c.id as string);
        out.push({
          board: b.slug,
          subject: s.name as string,
          id: c.id as string,
          name: c.name as string,
          revisionPath: revisionPath(b.slug, s.name as string, c.name as string),
          top: [...bySlot.entries()].sort((x, y) => x[0] - y[0]).map(([, p]) => p),
          testMockId: test ? mockIdBySlug.get(test.slug) ?? null : null,
        });
      }
    }
  }
  return out;
}

type Cohort = Map<string, Set<string>>; // user → boards

async function loadCohort(db: SupabaseClient, staff: Set<string>): Promise<Cohort> {
  const rows = await readAllPages<{ user_id: string; target_exams: string[] | null }>((f, to) =>
    db.from("student_profiles").select("user_id, target_exams").overlaps("target_exams", BOARDS.map((b) => b.slug)).order("user_id").range(f, to)
  );
  const out: Cohort = new Map();
  for (const r of rows) {
    if (staff.has(r.user_id)) continue;
    out.set(r.user_id, new Set((r.target_exams ?? []).filter((e) => BOARDS.some((b) => b.slug === e))));
  }
  return out;
}

type Ev = { user_id: string; kind: string; ref_id: string | null; created_at: string; surface: string | null; path: string | null; mark: string | null };

async function loadEvents(db: SupabaseClient, users: string[]): Promise<Ev[]> {
  const out: Ev[] = [];
  for (const part of chunks(users)) {
    out.push(
      ...(await readAllPages<Ev>((f, to) =>
        db
          .from("user_activity")
          .select("user_id, kind, ref_id, created_at, surface:metadata->>surface, path:metadata->>path, mark:metadata->>mark")
          .in("user_id", part)
          .order("id")
          .range(f, to)
      ))
    );
  }
  return out;
}

async function loadAttempts(db: SupabaseClient, users: string[], mockIds: string[]) {
  const out: { user_id: string; mock_id: string; status: string; answered: number; submitted_at: string | null }[] = [];
  for (const part of chunks(users)) {
    const rows = await readAllPages<{ user_id: string; mock_id: string; status: string; submitted_at: string | null; correct_count: number | null; wrong_count: number | null; partial_count: number | null }>((f, to) =>
      db.from("mock_attempts").select("user_id, mock_id, status, submitted_at, correct_count, wrong_count, partial_count").in("user_id", part).in("mock_id", mockIds).order("id").range(f, to)
    );
    for (const r of rows)
      out.push({
        user_id: r.user_id,
        mock_id: r.mock_id,
        status: r.status,
        answered: (r.correct_count ?? 0) + (r.wrong_count ?? 0) + (r.partial_count ?? 0),
        submitted_at: r.submitted_at,
      });
  }
  return out;
}

const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "-");
const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};

async function main() {
  const db = createSupabaseAdminClient();
  const now = new Date();
  const since30 = new Date(now.getTime() - 30 * DAY_MS).toISOString();

  const [staff, chapters] = await Promise.all([staffIds(db), loadChapters(db)]);
  const cohort = await loadCohort(db, staff);
  const users = [...cohort.keys()];
  const events = await loadEvents(db, users);
  const attempts = await loadAttempts(db, users, chapters.flatMap((c) => (c.testMockId ? [c.testMockId] : [])));

  // Content readiness: what a chapter can be done with today.
  console.log("CONTENT (PCM, outdated chapters left out)");
  for (const b of BOARDS) {
    const cs = chapters.filter((c) => c.board === b.slug);
    const numeric = cs.reduce((s, c) => s + c.top.flat().filter((p) => p.format === "numeric").length, 0);
    console.log(
      `  ${b.slug.padEnd(10)} ${cs.length} chapters · Top 10 on ${cs.filter((c) => c.top.length >= 10).length} · ` +
        `published test on ${cs.filter((c) => c.testMockId).length} · numeric Top 10 parts ${numeric}`
    );
    for (const c of cs.filter((c) => !c.testMockId || c.top.length < 10))
      console.log(`    ! ${c.subject} · ${c.name}: ${c.testMockId ? "" : "no published test "}${c.top.length < 10 ? `Top ${c.top.length}` : ""}`);
  }

  // Index events.
  const activeDays = new Map<string, Set<string>>();
  const revisionSeen = new Map<string, Set<string>>();
  const marks = new Map<string, ProgressEvent[]>();
  const missed30 = new Set<string>();
  const drillDays = new Map<string, Set<string>>();
  const MARK_KINDS = new Set(["self_mark", "question_practiced", "answer_wrong", "answer_correct"]);
  for (const e of events) {
    if (e.created_at >= since30) {
      const d = activeDays.get(e.user_id) ?? new Set();
      d.add(istDayKey(new Date(e.created_at)));
      activeDays.set(e.user_id, d);
      if (e.kind === "answer_wrong") missed30.add(e.user_id);
      if (e.surface === "drill" && (e.kind === "answer_wrong" || e.kind === "answer_correct" || e.kind === "drill_completed")) {
        const dd = drillDays.get(e.user_id) ?? new Set();
        dd.add(istDayKey(new Date(e.created_at)));
        drillDays.set(e.user_id, dd);
      }
    }
    if (e.kind === "surface_viewed" && e.surface === "board_revision" && e.path) {
      const s = revisionSeen.get(e.user_id) ?? new Set();
      s.add(e.path);
      revisionSeen.set(e.user_id, s);
    }
    if (MARK_KINDS.has(e.kind) && e.ref_id) {
      const list = marks.get(e.user_id) ?? [];
      list.push({
        questionId: e.ref_id,
        kind: e.kind as ProgressEvent["kind"],
        at: e.created_at,
        ...(e.mark === "understood" || e.mark === "review" ? { mark: e.mark } : {}),
      });
      marks.set(e.user_id, list);
    }
  }
  const finished = new Set(attempts.filter(isFinishedTest).map((a) => `${a.user_id}|${a.mock_id}`));

  const active = users.filter((u) => activeDays.has(u));
  console.log(`\nCOHORT  ${users.length} Class 12 students (staff out) · ${active.length} active in 30 days`);
  for (const b of BOARDS) {
    const a = active.filter((u) => cohort.get(u)!.has(b.slug));
    const four = a.filter((u) => activeDays.get(u)!.size >= 4).length;
    console.log(`  ${b.slug.padEnd(10)} active ${a.length} · on 4+ days ${four} (${pct(four, a.length)})`);
  }

  // Chapters done, per active student, over all recorded time.
  const doneCounts: number[] = [];
  let anySheet = 0, anyTop = 0, anyTest = 0, anyTwo = 0, anyTopWork = 0, topHalf = 0;
  for (const u of active) {
    const mine = chapters.filter((c) => cohort.get(u)!.has(c.board));
    const evs = marks.get(u) ?? [];
    let done = 0, sheet = false, top = false, test = false, two = false, bestTop = 0;
    for (const c of mine) {
      const tw = topWorked(c.top, evs);
      bestTop = Math.max(bestTop, tw.worked);
      const p = chapterParts({
        sheet: revisionSeen.get(u)?.has(c.revisionPath) ?? false,
        top: tw.complete,
        test: c.testMockId ? finished.has(`${u}|${c.testMockId}`) : false,
      });
      if (p.done) done++;
      sheet ||= p.sheet;
      top ||= p.top;
      test ||= p.test;
      two ||= p.partsDone >= 2;
    }
    doneCounts.push(done);
    if (sheet) anySheet++;
    if (top) anyTop++;
    if (test) anyTest++;
    if (two) anyTwo++;
    if (bestTop > 0) anyTopWork++;
    if (bestTop >= 5) topHalf++;
  }
  console.log(`\nCHAPTERS DONE (all time, ${active.length} active students)`);
  console.log(`  median ${median(doneCounts)} · with 1+ done ${doneCounts.filter((n) => n > 0).length} · with 8+ done ${doneCounts.filter((n) => n >= 8).length}`);
  console.log(`  Top 10 progress: worked 1+ of a chapter's ${anyTopWork} · 5+ of one chapter's ${topHalf}`);
  console.log(`  students with any chapter's: sheet ${anySheet} · Top 10 complete ${anyTop} · test finished ${anyTest} · 2 of 3 parts ${anyTwo}`);

  const withMiss = active.filter((u) => missed30.has(u));
  const fixers = withMiss.filter((u) => (drillDays.get(u)?.size ?? 0) >= 2).length;
  console.log(`\nFIXING MISTAKES (30 days)  ${fixers} of ${withMiss.length} with a miss drilled on 2+ days (${pct(fixers, withMiss.length)})`);

  // Phase 1: the students who started a path (./starters.ts).
  await reportStarters(db, { now, staff, cohort: new Set(users), chapters, events, attempts });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
