import type { Difficulty, Filters } from "@/lib/questions/filters";

export type ActiveChip = {
  key: string;
  label: string;
  nextFilters: () => Filters;
};

export type ChipLabels = {
  examName: (id: string) => string;
  subjectName: (id: string) => string;
  chapterName: (id: string) => string;
  subtopicName: (id: string) => string;
  principleName: (slug: string) => string;
};

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

export function buildActiveChips(
  filters: Filters,
  labels: ChipLabels
): ActiveChip[] {
  const chips: ActiveChip[] = [];

  if (filters.examId) {
    chips.push({
      key: `exam:${filters.examId}`,
      label: `Exam: ${labels.examName(filters.examId)}`,
      nextFilters: () => ({
        ...filters,
        examId: null,
        subjectId: null,
        chapterIds: [],
        subtopicIds: [],
        page: 1,
      }),
    });
  }

  if (filters.subjectId) {
    chips.push({
      key: `subject:${filters.subjectId}`,
      label: `Subject: ${labels.subjectName(filters.subjectId)}`,
      nextFilters: () => ({
        ...filters,
        subjectId: null,
        chapterIds: [],
        subtopicIds: [],
        page: 1,
      }),
    });
  }

  for (const id of filters.chapterIds) {
    chips.push({
      key: `chapter:${id}`,
      label: `Chapter: ${labels.chapterName(id)}`,
      nextFilters: () => ({
        ...filters,
        chapterIds: filters.chapterIds.filter((x) => x !== id),
        subtopicIds: [],
        page: 1,
      }),
    });
  }

  for (const id of filters.subtopicIds) {
    chips.push({
      key: `subtopic:${id}`,
      label: `Subtopic: ${labels.subtopicName(id)}`,
      nextFilters: () => ({
        ...filters,
        subtopicIds: filters.subtopicIds.filter((x) => x !== id),
        page: 1,
      }),
    });
  }

  for (const d of filters.difficulties) {
    chips.push({
      key: `difficulty:${d}`,
      label: `Difficulty: ${DIFFICULTY_LABEL[d]}`,
      nextFilters: () => ({
        ...filters,
        difficulties: filters.difficulties.filter((x) => x !== d),
        page: 1,
      }),
    });
  }

  for (const y of filters.pyqYears) {
    chips.push({
      key: `year:${y}`,
      label: `Year: ${y}`,
      nextFilters: () => ({
        ...filters,
        pyqYears: filters.pyqYears.filter((x) => x !== y),
        page: 1,
      }),
    });
  }

  if (filters.principleSlug) {
    chips.push({
      key: `principle:${filters.principleSlug}`,
      label: `Principle: ${labels.principleName(filters.principleSlug)}`,
      nextFilters: () => ({ ...filters, principleSlug: null, page: 1 }),
    });
  }

  if (filters.q) {
    chips.push({
      key: `q:${filters.q}`,
      label: `Search: "${filters.q}"`,
      nextFilters: () => ({ ...filters, q: "", page: 1 }),
    });
  }

  return chips;
}
