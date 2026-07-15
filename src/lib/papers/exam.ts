/** The `exam` slice this module needs — structurally satisfied by QuestionRow. */
type HasExam = { exam: { id: string } | null };

/**
 * The exam a paper is "about" — the most common exam across its questions.
 *
 * Drives the Add-questions exam filter default. Without this the panel fell back
 * to the alphabetically-first exam in the org, so an NDA paper opened its search
 * on CBSE Class 12.
 *
 * Ties break by first appearance (insertion order), which keeps a 50/50
 * two-exam paper defaulting to whatever leads the paper rather than to an
 * arbitrary id ordering.
 */
export function dominantExamId(questions: HasExam[]): string | null {
  const counts = new Map<string, number>();
  for (const q of questions) {
    const id = q.exam?.id;
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  // Map preserves insertion order, so a strict `>` keeps the first-seen winner.
  for (const [id, n] of counts) {
    if (n > bestCount) {
      best = id;
      bestCount = n;
    }
  }
  return best;
}
