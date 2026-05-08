import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  parseFilters,
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";
import { queryQuestions, DEFAULT_PAGE_SIZE } from "@/lib/questions/query";
import FilterBar from "./FilterBar";
import QuestionCard from "./QuestionCard";
import Pagination from "./Pagination";
import DownloadDialog from "./DownloadDialog";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

function paramsFromSearch(
  searchParams: Record<string, string | string[] | undefined>
): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v == null) continue;
    sp.set(k, Array.isArray(v) ? v[0] : v);
  }
  return sp;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const member = await getSessionMember();
  if (!member) redirect("/login");

  const filters = parseFilters(paramsFromSearch(searchParams));
  const supabase = createSupabaseServerClient();

  const [
    { data: exams },
    { data: subjects },
    { data: chapters },
    { data: subtopics },
    questionsResult,
  ] = await Promise.all([
    supabase.from("exams").select("id, name").order("name"),
    filters.examId
      ? supabase
          .from("subjects")
          .select("id, name")
          .eq("exam_id", filters.examId)
          .order("name")
      : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    filters.subjectId
      ? supabase
          .from("chapters")
          .select("id, name, order_index")
          .eq("subject_id", filters.subjectId)
          .order("order_index")
      : Promise.resolve({
          data: [] as { id: string; name: string; order_index: number }[],
        }),
    filters.chapterIds.length > 0
      ? supabase
          .from("subtopics")
          .select("id, name, chapter_id")
          .in("chapter_id", filters.chapterIds)
          .order("name")
      : Promise.resolve({
          data: [] as { id: string; name: string; chapter_id: string }[],
        }),
    queryQuestions(supabase, member.orgId, filters, DEFAULT_PAGE_SIZE),
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(questionsResult.totalCount / DEFAULT_PAGE_SIZE)
  );

  return (
    <main className="mx-auto max-w-5xl p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Browse questions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {member.orgName} · {questionsResult.totalCount} question
            {questionsResult.totalCount === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Dashboard
        </Link>
      </header>

      <FilterBar
        filters={filters}
        exams={(exams ?? []).map((e) => ({ id: e.id, name: e.name }))}
        subjects={(subjects ?? []).map((s) => ({ id: s.id, name: s.name }))}
        chapters={(chapters ?? []).map((c) => ({ id: c.id, name: c.name }))}
        subtopics={(subtopics ?? []).map((s) => ({ id: s.id, name: s.name }))}
      />

      <DownloadDialog
        filters={filters}
        totalCount={questionsResult.totalCount}
      />

      {questionsResult.rows.length === 0 ? (
        <div className="mt-8 rounded-md border bg-muted/30 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No questions match these filters.{" "}
            {hasAnyFilter(filters) && (
              <Link
                href="/browse"
                className="underline hover:text-foreground"
              >
                Clear filters
              </Link>
            )}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {questionsResult.rows.map((q, i) => (
            <li key={q.id}>
              <QuestionCard
                question={q}
                index={(filters.page - 1) * DEFAULT_PAGE_SIZE + i + 1}
              />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          buildHref={(p) =>
            `/browse?${buildSearchParams({ ...filters, page: p }).toString()}`
          }
        />
      )}
    </main>
  );
}

function hasAnyFilter(f: Filters): boolean {
  return (
    f.examId != null ||
    f.subjectId != null ||
    f.chapterIds.length > 0 ||
    f.subtopicIds.length > 0 ||
    f.difficulties.length > 0 ||
    f.q.length > 0
  );
}
