export type Difficulty = "EASY" | "MODERATE" | "HARD";

export type Filters = {
  examId: string | null;
  subjectId: string | null;
  chapterIds: string[];
  subtopicIds: string[];
  difficulties: Difficulty[];
  q: string;
  page: number;
};

const ALL_DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

export const EMPTY_FILTERS: Filters = {
  examId: null,
  subjectId: null,
  chapterIds: [],
  subtopicIds: [],
  difficulties: [],
  q: "",
  page: 1,
};

export function parseFilters(params: URLSearchParams): Filters {
  const examId = params.get("examId") || null;
  const subjectId = params.get("subjectId") || null;
  const chapterIds = csv(params.get("chapterIds"));
  const subtopicIds = csv(params.get("subtopicIds"));
  const difficulties = csv(params.get("difficulty")).filter(
    (d): d is Difficulty => ALL_DIFFICULTIES.includes(d as Difficulty)
  );
  const q = params.get("q") ?? "";
  const pageRaw = parseInt(params.get("page") ?? "1", 10);
  const page = Number.isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;
  return { examId, subjectId, chapterIds, subtopicIds, difficulties, q, page };
}

export function buildSearchParams(filters: Filters): URLSearchParams {
  const sp = new URLSearchParams();
  if (filters.examId) sp.set("examId", filters.examId);
  if (filters.subjectId) sp.set("subjectId", filters.subjectId);
  if (filters.chapterIds.length > 0)
    sp.set("chapterIds", filters.chapterIds.join(","));
  if (filters.subtopicIds.length > 0)
    sp.set("subtopicIds", filters.subtopicIds.join(","));
  if (filters.difficulties.length > 0)
    sp.set("difficulty", filters.difficulties.join(","));
  if (filters.q) sp.set("q", filters.q);
  if (filters.page > 1) sp.set("page", String(filters.page));
  return sp;
}

function csv(s: string | null): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}
