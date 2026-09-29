/**
 * The quotable header of a /questions landing page, as sentences.
 *
 * Pure. The page and its `metadata.description` both render from these, so
 * the facts a crawler reads in the <meta> tag and the facts a student reads
 * on the page are the same string. Spec: tests/landing-summary.test.ts.
 *
 * Every helper degrades to something TRUE rather than something wrong: a
 * missing profile keeps the plain count sentence, a zero bucket is omitted,
 * a practice-only chapter never claims papers or years.
 */

/** One chapter's profile from `get_chapter_profile` (migration 0126). */
export type ChapterProfile = {
  minYear: number | null;
  maxYear: number | null;
  /** Distinct (year, month, sitting-note) papers the chapter draws from. */
  sittings: number;
  easy: number;
  moderate: number;
  hard: number;
};

export type LandingSubtopic = { name: string; count: number };

const fmt = (n: number) => n.toLocaleString("en-IN");

/**
 * "176 NDA Mathematics past-year questions from 19 papers, 2017 to 2026, with
 * answers and worked solutions."
 */
export function landingLead(input: {
  questionCount: number;
  examName: string;
  subjectName: string;
  practiceOnly: boolean;
  profile: ChapterProfile | null;
}): string {
  const { questionCount, examName, subjectName, practiceOnly, profile } = input;
  const kind = practiceOnly ? "practice questions" : "past-year questions";
  const head = `${fmt(questionCount)} ${examName} ${subjectName} ${kind}`;
  const tail = "with answers and worked solutions.";

  if (practiceOnly || !profile || profile.minYear === null || profile.maxYear === null) {
    return `${head} ${tail}`;
  }

  const oneYear = profile.minYear === profile.maxYear;
  const when = oneYear ? `in ${profile.minYear}` : `${profile.minYear} to ${profile.maxYear}`;

  // "from 19 papers, 2017 to 2026," / "from 2 papers in 2026," — the comma
  // only separates a range, never "papers in".
  if (profile.sittings >= 2) {
    const papers = `from ${fmt(profile.sittings)} papers`;
    return oneYear
      ? `${head} ${papers} ${when}, ${tail}`
      : `${head} ${papers}, ${when}, ${tail}`;
  }
  return `${head}, ${when}, ${tail}`;
}

/**
 * "Difficulty: 61 easy · 84 moderate · 31 hard." — zero buckets omitted.
 *
 * Null when fewer than TWO buckets are populated: a chapter whose every row is
 * MODERATE (JEE Mains Matrices, 115 of 115 — the corpus was never graded) has
 * no split to report, and "Difficulty: 115 moderate" would read as a finding.
 */
export function difficultyLine(profile: ChapterProfile | null): string | null {
  if (!profile) return null;
  const parts = [
    [profile.easy, "easy"],
    [profile.moderate, "moderate"],
    [profile.hard, "hard"],
  ]
    .filter(([n]) => (n as number) > 0)
    .map(([n, label]) => `${fmt(n as number)} ${label}`);
  return parts.length >= 2 ? `Difficulty: ${parts.join(" · ")}.` : null;
}

/** "Most-asked subtopics: A (48), B (31), C (27)." — top `limit` by count. */
export function subtopicsLine(
  subtopics: readonly LandingSubtopic[],
  limit = 3
): string | null {
  const top = subtopics
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
  if (top.length === 0) return null;
  const noun = top.length === 1 ? "subtopic" : "subtopics";
  return `Most-asked ${noun}: ${top.map((s) => `${s.name} (${fmt(s.count)})`).join(", ")}.`;
}

/** "Updated 15 September 2026." — the newest PUBLIC question's date, in IST. */
export function updatedLine(lastAdded: string | null): string | null {
  if (!lastAdded) return null;
  const d = new Date(lastAdded);
  if (Number.isNaN(d.getTime())) return null;
  const text = d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  return `Updated ${text}.`;
}
