import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import MeHeader from "@/components/me/MeHeader";
import { getSessionMember, getSessionSuperadmin, getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { surfaceViewedEvent } from "@/lib/activity/views";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { loadMeHeader } from "@/lib/me/header";
import { listBookmarkIds } from "@/lib/bookmarks/service";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { loadOwnPool } from "@/lib/drill/compose";
import { scopeToExam } from "@/lib/drill/select";
import { readTodayRow } from "@/lib/path/exemptions";
import { isIntlHost } from "@/lib/sites/intl";
import { buildFixList, chapterQuestions, fixSubjects, latestMisses, parseReviewParams } from "@/lib/review/fixList";
import { loadMissRows, loadMockTitles } from "@/lib/review/query";
import ReviewSwitch from "./ReviewSwitch";
import FixOverview from "./FixOverview";
import ChapterFix, { CHAPTER_CAP } from "./ChapterFix";
import SavedList from "./SavedList";
import { VaultPointsStatus } from "@/components/billing/useFixPoints";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review",
  robots: { index: false },
};

type Search = Record<string, string | string[] | undefined>;

/**
 * The Review tab (2026-11-08, step 2 of the Home · Review · Progress
 * redesign): everything a student wanted to come back to.
 *
 *   /review               To fix: every question waiting in Fix your mistakes,
 *                         by chapter, each with why it is there
 *   /review?chapter=<id>  one chapter's questions, to retry here or fix in the drill
 *   /review?list=saved    the saved list (the old /saved, which redirects here)
 *
 * The To fix questions are the drill's own pool, focused like the pulse, so
 * the total is the badge's number. Per student, never cached, never indexed.
 */
export default async function ReviewPage(props: { searchParams: Promise<Search> }) {
  const params = parseReviewParams(await props.searchParams);
  const here = params.list === "saved" ? "/review?list=saved" : "/review";
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(here)}`);

  const db = createSupabaseServerClient();
  const now = new Date();
  const saved = params.list === "saved";
  // On intl.pyqvault.com To fix holds the international exams alone, as the drill does.
  const intl = isIntlHost((await headers()).get("host"));

  // ROUND 1: everything that needs nothing else, at once.
  const [header, , savedIds, member, superadmin, pool, planRow] = await Promise.all([
    getExamIdMap().then((ids) => loadMeHeader(db, user, ids, { now })),
    logActivityOnce(db, user.id, surfaceViewedEvent(user.id, saved ? "review_saved" : "review", now)),
    listBookmarkIds(db, user.id),
    getSessionMember(),
    getSessionSuperadmin(),
    saved ? Promise.resolve(null) : loadOwnPool(db, user.id, now, intl),
    // Today's board-plan Fix questions, when the plan picked today already.
    // A failed read labels nothing: the list is right without it.
    saved
      ? Promise.resolve(null)
      : readTodayRow(db, user.id, now).catch((e: unknown) => {
          console.error("review plan read failed", e instanceof Error ? e.message : e);
          return null;
        }),
  ]);
  const canEdit = Boolean(member);
  const includeRawProvenance = Boolean(superadmin);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  // To fix, focused on the header's exam exactly as the badge is (lib/pulse/build).
  const focusExam = header.focus.filterExamName;
  const due = pool ? scopeToExam(pool.drillable, focusExam) : [];
  const planIds = new Set(planRow?.drillIds ?? []);

  let body: React.ReactNode;
  if (saved) {
    body = <SavedList cards={await cardsInOrder(db, savedIds, includeRawProvenance)} canEdit={canEdit} supabaseUrl={supabaseUrl} />;
  } else {
    // ROUND 2: why each question is here.
    const misses = latestMisses(await loadMissRows(db, user.id, due.map((q) => q.questionId)));
    if (params.chapterId) {
      const all = chapterQuestions(due, params.chapterId, misses, planIds);
      const shown = all.slice(0, CHAPTER_CAP);
      const [cards, titles] = await Promise.all([
        cardsInOrder(db, shown.map((q) => q.questionId), includeRawProvenance),
        loadMockTitles(db, shown.flatMap((q) => (q.mockId ? [q.mockId] : []))),
      ]);
      const chapter = due.find((q) => q.chapterId === params.chapterId);
      body = (
        <ChapterFix
          chapterId={params.chapterId}
          name={chapter?.chapter ?? null}
          place={chapter?.place ?? ""}
          total={all.length}
          items={shown}
          cards={cards}
          titles={titles}
          canEdit={canEdit}
          supabaseUrl={supabaseUrl}
        />
      );
    } else {
      body = (
        <FixOverview
          list={buildFixList(due, misses, planIds, params.subject)}
          focusExam={focusExam}
          savedCount={savedIds.length}
          subjects={fixSubjects(due)}
          subject={params.subject}
          allCount={due.length}
        />
      );
    }
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <MeHeader data={header} active="review" readOnly={false} />
        <ReviewSwitch list={params.list} fixCount={pool ? due.length : null} savedCount={savedIds.length} />
        {/* Vault Points (0245): what fixing this list is worth. www only. */}
        {!saved && !intl && <VaultPointsStatus />}
        {body}
      </main>
    </>
  );
}

/** The questions for these ids, in the ids' order (a deleted or hidden one drops out). */
async function cardsInOrder(
  db: ReturnType<typeof createSupabaseServerClient>,
  ids: string[],
  includeRawProvenance: boolean
): Promise<QuestionRow[]> {
  if (ids.length === 0) return [];
  const rows = await queryQuestionsByIds(db, ids, { includeRawProvenance });
  const byId = new Map(rows.map((q) => [q.id, q]));
  return ids.flatMap((id) => {
    const q = byId.get(id);
    return q ? [q] : [];
  });
}
