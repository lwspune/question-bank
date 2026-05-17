/**
 * Pure aggregator for principle-tag survey audits.
 *
 * Given a list of candidate question UUIDs (the proposal), question records
 * (joined chapter + subtopic + difficulty from Supabase), and the set of UUIDs
 * already tagged with the principle in DB, produce the summary shape used by
 * `scripts/principle-tag-audit.ts` to render the per-chapter / per-subtopic
 * counts and pre-flight warnings before INSERT.
 *
 * The mechanical aggregation lives here so it can be unit-tested without a
 * live database. See `[[principle-tag-survey-methodology]]` for the editorial
 * rules this script supports (COUNT-before-summary, ≥2-chapter spread).
 */

export type QuestionRecord = {
  id: string;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
};

export type SubtopicBucket = {
  subtopic: string;
  count: number;
  ids: string[];
};

export type ChapterBucket = {
  chapter: string;
  total: number;
  subtopics: SubtopicBucket[];
};

export type AuditResult = {
  totalCandidates: number;
  chapterSpread: number;
  byChapter: ChapterBucket[];
  alreadyTagged: string[];
  pendingTagged: string[];
  unresolvedIds: string[];
};

export function aggregateAudit(
  candidates: string[],
  records: QuestionRecord[],
  alreadyTaggedIds: string[]
): AuditResult {
  const candidateSet = new Set(candidates);
  const totalCandidates = candidateSet.size;
  const recordsById = new Map(records.map((r) => [r.id, r]));

  const unresolvedIds = Array.from(candidateSet).filter(
    (id) => !recordsById.has(id)
  );

  const alreadyTagged = Array.from(candidateSet)
    .filter((id) => alreadyTaggedIds.includes(id))
    .sort();
  const alreadyTaggedSet = new Set(alreadyTagged);
  const pendingTagged = Array.from(candidateSet)
    .filter((id) => !alreadyTaggedSet.has(id) && recordsById.has(id))
    .sort();

  // Bucket resolved records by chapter → subtopic.
  const chapterMap = new Map<string, Map<string, string[]>>();
  for (const id of candidateSet) {
    const rec = recordsById.get(id);
    if (!rec) continue;
    let subMap = chapterMap.get(rec.chapter);
    if (!subMap) {
      subMap = new Map();
      chapterMap.set(rec.chapter, subMap);
    }
    const ids = subMap.get(rec.subtopic) ?? [];
    ids.push(id);
    subMap.set(rec.subtopic, ids);
  }

  const byChapter: ChapterBucket[] = Array.from(chapterMap.entries()).map(
    ([chapter, subMap]) => {
      const subtopics: SubtopicBucket[] = Array.from(subMap.entries()).map(
        ([subtopic, ids]) => ({
          subtopic,
          count: ids.length,
          ids: [...ids].sort(),
        })
      );
      subtopics.sort(
        (a, b) => b.count - a.count || a.subtopic.localeCompare(b.subtopic)
      );
      const total = subtopics.reduce((sum, s) => sum + s.count, 0);
      return { chapter, total, subtopics };
    }
  );
  byChapter.sort(
    (a, b) => b.total - a.total || a.chapter.localeCompare(b.chapter)
  );

  return {
    totalCandidates,
    chapterSpread: byChapter.length,
    byChapter,
    alreadyTagged,
    pendingTagged,
    unresolvedIds,
  };
}
