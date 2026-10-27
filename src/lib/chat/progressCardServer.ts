/**
 * The reads behind V's "How's my progress" card (lib/chat/progressCard.ts),
 * all through the student's own login: get_own_performance and
 * get_own_progress_card take no user id (auth.uid() decides), and the profile
 * and drill reads are own-row under RLS. Only the exam's past-paper weights
 * are shared, read anonymously and cached a day (loadExamStrategy).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { createSupabaseServerClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { resolveExamDate } from "@/lib/exam/calendar";
import { getOwnProfile } from "@/lib/profile/service";
import { getOwnLadder } from "@/lib/drill/service";
import { getOwnPerformance } from "@/lib/performance/service";
import { selectAttempts } from "@/lib/performance/compute";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";
import { loadExamStrategy } from "./examStrategyServer";
import {
  buildProgressCard,
  notesChaptersOf,
  pickProgressExams,
  progressRows,
  type ProgressChapter,
  type ProgressExam,
  type ProgressRow,
  type Span,
} from "./progressCard";

/** What the window draws. `rows` empty = nothing to show yet in this exam. */
export type ProgressCardView = {
  exam: { slug: string; label: string };
  exams: { slug: string; label: string }[];
  daysLeft: number | null;
  due: number;
  rows: ProgressRow[];
};

type CardPayload = {
  exam_id: string | null;
  exam_name: string | null;
  week: Span;
  prev: Span;
  chapters: ProgressChapter[];
  notes: string[];
};

function examBySlug(slug: string): ProgressExam | null {
  const e = EXAM_REGISTRY.find((x) => x.slug === slug);
  return e ? { slug: e.slug, examName: e.examName, displayName: e.displayName } : null;
}

function examByName(name: string | null): ProgressExam | null {
  const e = name ? EXAM_REGISTRY.find((x) => x.examName === name) : undefined;
  return e ? { slug: e.slug, examName: e.examName, displayName: e.displayName } : null;
}

async function examIdOf(db: SupabaseClient, examName: string): Promise<string | null> {
  const { data, error } = await db.from("exams").select("id").eq("name", examName).maybeSingle();
  if (error) throw new Error(`progress card exam: ${error.message}`);
  return (data?.id as string | undefined) ?? null;
}

async function readCardPayload(db: SupabaseClient, examId: string | null): Promise<CardPayload> {
  const { data, error } = await db.rpc("get_own_progress_card", { p_exam_id: examId });
  if (error) throw new Error(`get_own_progress_card: ${error.message}`);
  const p = (data ?? {}) as Partial<CardPayload>;
  const span = (s: Partial<Span> | undefined): Span => ({ answered: Number(s?.answered ?? 0), right: Number(s?.right ?? 0) });
  return {
    exam_id: p.exam_id ?? null,
    exam_name: p.exam_name ?? null,
    week: span(p.week),
    prev: span(p.prev),
    chapters: (p.chapters ?? []).map((c) => ({ ...c, answered: Number(c.answered) })),
    notes: p.notes ?? [],
  };
}

/**
 * The card for `asked` (a slug the window sent), or the student's main exam.
 * Null when no exam can be named at all: no exam on the profile, no mock and
 * no practice.
 */
export async function loadProgressCard(
  db: ReturnType<typeof createSupabaseServerClient>,
  userId: string,
  asked: string | null,
  now: Date = new Date()
): Promise<ProgressCardView | null> {
  const [profile, perf, ladder] = await Promise.all([
    getOwnProfile(db, userId),
    getOwnPerformance(),
    getOwnLadder(db, userId, now),
  ]);

  const latest = perf ? selectAttempts(perf.attempts, perf.facts).kept.sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0] : undefined;
  const picked = pickProgressExams({
    asked,
    targetExams: profile.targetExams,
    latestMockExam: examByName(latest?.examName ?? null)?.slug ?? null,
  });

  let exam = picked.exam ? examBySlug(picked.exam) : null;
  const payload = await readCardPayload(db, exam ? await examIdOf(db, exam.examName) : null);
  exam ??= examByName(payload.exam_name);
  if (!exam) return null;

  const strategy = await loadExamStrategy(exam.slug).catch((e: unknown) => {
    // The weights only refine one line; the card falls back to chapters started.
    console.error("progress card: exam strategy read failed", e);
    return null;
  });

  const card = buildProgressCard({
    exam,
    now,
    daysLeft:
      resolveExamDate(
        { targetExams: [exam.slug], examDate: profile.targetExams[0] === exam.slug ? profile.examDate : null },
        now
      )?.daysLeft ?? null,
    practice: { week: payload.week, prev: payload.prev },
    perf,
    drill: { fixed: ladder.fixed, due: ladder.due.length },
    chapters: payload.chapters,
    strategy,
    notesChapters: notesChaptersOf(payload.notes, exam.examName, NOTES_NAV_INDEX),
  });

  const slugs = picked.exams.includes(exam.slug) ? picked.exams : [exam.slug, ...picked.exams];
  return {
    exam: { slug: exam.slug, label: exam.displayName },
    exams: slugs.flatMap((s) => {
      const e = examBySlug(s);
      return e ? [{ slug: e.slug, label: e.displayName }] : [];
    }),
    daysLeft: card.daysLeft,
    due: card.due,
    rows: progressRows(card),
  };
}
