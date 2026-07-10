/**
 * Admin reads for the /dashboard/mocks performance view. Service-role
 * (mock_attempts is own-row RLS — an admin must bypass it to see every
 * student's attempts), same pattern as leadsAdmin. Emails come from the auth
 * admin API (listUsers), like the entitlements + members admin do.
 *
 * Paged reads: mock_attempts can exceed the PostgREST 1000-row cap as usage
 * grows, so every full-table scan pages in 1000-row windows (see the "1000-row
 * cap" pitfall in CLAUDE.md).
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { displayName } from "@/lib/students/derive";
import { summarizeAttempts, type MockSummary } from "./perf";

const PAGE = 1000;

async function readAllAttempts(
  db: SupabaseClient,
  cols: string,
  filter?: (q: any) => any // eslint-disable-line
): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    let q: any = db.from("mock_attempts").select(cols).range(from, from + PAGE - 1); // eslint-disable-line
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`readAllAttempts: ${error.message}`);
    out.push(...((data ?? []) as Record<string, unknown>[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

/** Map user ids → {name, email} for a set of ids (single listUsers page, like members admin). */
async function resolveUsers(
  db: SupabaseClient,
  ids: Set<string>
): Promise<Map<string, { name: string; email: string }>> {
  const map = new Map<string, { name: string; email: string }>();
  if (ids.size === 0) return map;
  const { data } = await db.auth.admin.listUsers({ perPage: 1000 });
  for (const u of data?.users ?? []) {
    if (u.id && ids.has(u.id)) {
      const email = u.email ?? "(no email)";
      map.set(u.id, {
        name: displayName((u.user_metadata as { full_name?: string; name?: string } | null) ?? null, u.email ?? null),
        email,
      });
    }
  }
  return map;
}

export type MockPerfRow = MockSummary & {
  slug: string;
  title: string;
  pyqYear: number;
  totalMarks: number;
};

/** Per published-mock performance summary, newest sitting first. */
export async function getMockPerformance(): Promise<MockPerfRow[]> {
  const db = createSupabaseAdminClient();
  const { data: mocks, error } = await db
    .from("mock_tests")
    .select("id, slug, title, pyq_year, total_marks")
    .eq("status", "published")
    .order("pyq_year", { ascending: false });
  if (error) throw new Error(`getMockPerformance mocks: ${error.message}`);

  const attempts = await readAllAttempts(db, "mock_id, user_id, score");
  const byMock = new Map<string, { userId: string; score: number | null }[]>();
  for (const a of attempts) {
    const arr = byMock.get(a.mock_id as string) ?? [];
    arr.push({ userId: a.user_id as string, score: a.score == null ? null : Number(a.score) });
    byMock.set(a.mock_id as string, arr);
  }

  return (mocks ?? []).map((m) => ({
    slug: m.slug as string,
    title: m.title as string,
    pyqYear: m.pyq_year as number,
    totalMarks: Number(m.total_marks),
    ...summarizeAttempts(byMock.get(m.id as string) ?? []),
  }));
}

export type MockAttemptDetail = {
  attemptId: string;
  userId: string;
  name: string;
  email: string;
  status: "in_progress" | "submitted" | "expired";
  score: number | null;
  maxScore: number | null;
  pct: number | null;
  correct: number | null;
  wrong: number | null;
  skipped: number | null;
  startedAt: string;
  submittedAt: string | null;
};

export type MockAttemptsDetail = {
  mock: { slug: string; title: string; totalMarks: number };
  attempts: MockAttemptDetail[];
  summary: MockSummary;
};

/** Full attempt list for one mock (admin drill-down). Null when mock absent. */
export async function getMockAttemptsDetail(slug: string): Promise<MockAttemptsDetail | null> {
  const db = createSupabaseAdminClient();
  const { data: mock } = await db
    .from("mock_tests")
    .select("id, slug, title, total_marks")
    .eq("slug", slug)
    .maybeSingle();
  if (!mock) return null;

  const rows = await readAllAttempts(
    db,
    "id, user_id, status, score, max_score, correct_count, wrong_count, skipped_count, started_at, submitted_at",
    (q) => q.eq("mock_id", mock.id).order("submitted_at", { ascending: false, nullsFirst: false })
  );

  const ids = new Set(rows.map((r) => r.user_id as string));
  const users = await resolveUsers(db, ids);

  const attempts: MockAttemptDetail[] = rows.map((r) => {
    const score = r.score == null ? null : Number(r.score);
    const maxScore = r.max_score == null ? null : Number(r.max_score);
    const user = users.get(r.user_id as string);
    return {
      attemptId: r.id as string,
      userId: r.user_id as string,
      name: user?.name ?? "(unknown)",
      email: user?.email ?? "(unknown)",
      status: r.status as MockAttemptDetail["status"],
      score,
      maxScore,
      pct: score != null && maxScore ? Math.round((score / maxScore) * 100) : null,
      correct: (r.correct_count as number | null) ?? null,
      wrong: (r.wrong_count as number | null) ?? null,
      skipped: (r.skipped_count as number | null) ?? null,
      startedAt: r.started_at as string,
      submittedAt: (r.submitted_at as string | null) ?? null,
    };
  });

  return {
    mock: { slug: mock.slug as string, title: mock.title as string, totalMarks: Number(mock.total_marks) },
    attempts,
    summary: summarizeAttempts(rows.map((r) => ({ userId: r.user_id as string, score: r.score == null ? null : Number(r.score) }))),
  };
}
