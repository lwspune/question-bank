/**
 * Structural rules for the ENGLISH section of an assembled GAT paper.
 *
 * WHY THIS EXISTS. The first NDA GAT HARD mock (150 q, 2026-08-21) selected and
 * ordered English per QUESTION, filtered by difficulty. `Cand` carries no
 * `setId`, so both selection and ordering were structurally blind to sets, and
 * the difficulty sort then actively tore them apart. Measured against the paper
 * it was imitating:
 *
 *                                  that mock     real GAT (2025-I/II, 2026-I)
 *     directions blocks for 50 q      41              7 - 10
 *     questions per block             1.2             5.0 - 7.1
 *     questions with no directions    3               0
 *
 * 47 set-bearing questions came out of 38 different sets holding 313 questions,
 * and in 32 of those 38 exactly ONE question was taken. Reading Comprehension
 * drew 3 questions from 2 passages (2 of 5, then 1 of 5), so a candidate reads
 * 3,274 characters of passage for 3 marks where the real paper gives 5. One
 * 366-character directions block landed at positions 7, 9, 12 and 19.
 *
 * These helpers make that shape unbuildable: `selectWholeSets` and
 * `orderEnglishBlocks` are the mechanism, `auditEnglishSection` is the gate.
 */
import type { Difficulty } from "./lib";

/**
 * R1 — two kinds of set, behaving oppositely, told apart by what the shared
 * text IS rather than by how long it is.
 *
 * A Reading Comprehension or Cloze set shares a PASSAGE: 1,441-1,833 characters
 * of content the questions are ABOUT. Every other English chapter shares only a
 * directions line (NDA 142-358 characters) — a label, not content, and each
 * question under it stands alone.
 *
 * Keyed on the chapter rather than a context-length threshold on purpose: the
 * two ranges happen not to overlap in today's bank, but a long directions block
 * is not a passage, and a rule that silently reclassifies one as the other when
 * an editor expands some instructions would be worse than no rule.
 */
export const STIMULUS_CHAPTERS = ["Reading Comprehension", "Cloze Test"] as const;

export function isStimulusChapter(chapter: string): boolean {
  return (STIMULUS_CHAPTERS as readonly string[]).includes(chapter);
}

/**
 * R4 — no printed block should be smaller than this. Real GAT English block
 * sizes are 2, 3, 5, 5, 5, 5, 5, 5, 10 (modal 5, never 1). A one-question block
 * prints a directions paragraph to ask a single question.
 */
export const MIN_BLOCK_SIZE = 2;

export type EnglishRow = {
  id: string;
  chapter: string;
  subtopic: string | null;
  setId: string | null;
  exam: string;
  difficulty: Difficulty;
  /** Length of the shared context/directions text; 0 means the question has none. */
  contextLen: number;
};

export type Violation = {
  rule: string;
  detail: string;
  questionIds?: string[];
};

const RANK: Record<Difficulty, number> = { EASY: 0, MODERATE: 1, HARD: 2 };

/**
 * Audit an English section IN PRINTED ORDER against the rules.
 *
 * `bankSetSizes` maps a set id to how many questions that set holds IN THE BANK
 * — without it a partially-taken passage is indistinguishable from a small one,
 * which is exactly the defect R2 exists to catch. A set missing from the map is
 * not judged on completeness rather than assumed complete.
 */
export function auditEnglishSection(
  rows: EnglishRow[],
  bankSetSizes: Map<string, number>
): Violation[] {
  const out: Violation[] = [];
  if (!rows.length) return out;

  // ── R7: every question carries directions ────────────────────────────────
  const bare = rows.filter((q) => q.contextLen <= 0);
  if (bare.length) {
    out.push({
      rule: "R7-no-directions",
      detail: `${bare.length} question(s) carry no directions text`,
      questionIds: bare.map((q) => q.id),
    });
  }

  // ── group the printed order into runs of consecutive same-set questions ──
  const bySet = new Map<string, EnglishRow[]>();
  const positions = new Map<string, number[]>();
  rows.forEach((q, i) => {
    if (!q.setId) return;
    if (!bySet.has(q.setId)) bySet.set(q.setId, []);
    bySet.get(q.setId)!.push(q);
    if (!positions.has(q.setId)) positions.set(q.setId, []);
    positions.get(q.setId)!.push(i);
  });

  for (const [setId, members] of bySet) {
    const pos = positions.get(setId)!;

    // ── R5: a set must print contiguously or its directions repeat ─────────
    if (pos[pos.length - 1] - pos[0] + 1 !== pos.length) {
      out.push({
        rule: "R5-scattered-set",
        detail: `set ${setId} occupies positions ${pos.map((p) => p + 1).join(", ")} — its directions would print ${pos.length} times`,
        questionIds: members.map((m) => m.id),
      });
    }

    // ── R2: a shared-stimulus set is atomic ────────────────────────────────
    if (isStimulusChapter(members[0].chapter)) {
      const size = bankSetSizes.get(setId);
      if (size != null && members.length < size) {
        out.push({
          rule: "R2-partial-stimulus-set",
          detail: `${members.length} of ${size} questions taken from passage ${setId} — the rest of the passage is read for no marks`,
          questionIds: members.map((m) => m.id),
        });
      }
    }

    // ── R8: one block, one exam's directions convention ────────────────────
    const exams = [...new Set(members.map((m) => m.exam))];
    if (exams.length > 1) {
      out.push({
        rule: "R8-mixed-exam-block",
        detail: `set ${setId} mixes ${exams.join(" + ")} in one printed block`,
        questionIds: members.map((m) => m.id),
      });
    }

    // ── R4: block size ─────────────────────────────────────────────────────
    if (members.length < MIN_BLOCK_SIZE) {
      out.push({
        rule: "R4-undersized-block",
        detail: `set ${setId} contributes ${members.length} question(s); a printed block should be at least ${MIN_BLOCK_SIZE}`,
        questionIds: members.map((m) => m.id),
      });
    }
  }

  // ── R5 (subtopic level): the user's "same concept scattered" ─────────────
  // Skipped for stimulus chapters: R9 — one real passage legitimately spans
  // Inferential / Literal / Vocabulary-in-Context, and grouping RC by subtopic
  // would SPLIT the passage, which is the opposite of R2.
  const seen = new Map<string, number[]>();
  rows.forEach((q, i) => {
    if (!q.subtopic || isStimulusChapter(q.chapter)) return;
    const key = `${q.chapter}||${q.subtopic}`;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key)!.push(i);
  });
  for (const [key, pos] of seen) {
    if (pos[pos.length - 1] - pos[0] + 1 !== pos.length) {
      out.push({
        rule: "R5-scattered-subtopic",
        detail: `${key.replace("||", " / ")} occupies positions ${pos.map((p) => p + 1).join(", ")} instead of one run`,
      });
    }
  }

  return out;
}

/**
 * R6 — draw COMPLETE sets, ranked by how hard each set is.
 *
 * Per-question difficulty filtering is unavailable here: of 398 English sets in
 * the bank only FIVE are 100% HARD (1 NDA, 4 CDS), and overall HARD density is
 * 4.8% (NDA) / 12.9% (CDS). So "all-HARD" and "whole passages" cannot both hold,
 * and difficulty becomes a property of the SET. Sets are ranked by mean
 * difficulty, then by count of HARD, then by id so the pick is deterministic.
 *
 * A set the candidate pool holds only PARTIALLY is skipped, never truncated —
 * taking the fragment is the defect this function exists to prevent.
 */
export function selectWholeSets(
  cands: EnglishRow[],
  wantQuestions: number,
  bankSetSizes: Map<string, number>
): { picked: EnglishRow[]; shortfall: number } {
  if (wantQuestions <= 0) return { picked: [], shortfall: 0 };

  const grouped = new Map<string, EnglishRow[]>();
  for (const c of cands) {
    if (!c.setId) continue;
    if (!grouped.has(c.setId)) grouped.set(c.setId, []);
    grouped.get(c.setId)!.push(c);
  }

  const complete = [...grouped.entries()]
    .filter(([sid, members]) => {
      const size = bankSetSizes.get(sid);
      return size == null ? false : members.length === size;
    })
    .map(([sid, members]) => ({
      sid,
      members: [...members].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
      meanDifficulty: members.reduce((s, m) => s + RANK[m.difficulty], 0) / members.length,
      hardCount: members.filter((m) => m.difficulty === "HARD").length,
    }))
    .sort(
      (a, b) =>
        b.meanDifficulty - a.meanDifficulty ||
        b.hardCount - a.hardCount ||
        (a.sid < b.sid ? -1 : a.sid > b.sid ? 1 : 0)
    );

  const picked: EnglishRow[] = [];
  for (const set of complete) {
    if (picked.length + set.members.length > wantQuestions) continue; // never overshoot
    picked.push(...set.members);
    if (picked.length === wantQuestions) break;
  }

  return { picked, shortfall: Math.max(0, wantQuestions - picked.length) };
}

/**
 * R5 — lay a chapter's picks out so same-concept questions print together and
 * no set is split.
 *
 * Grouping is by SUBTOPIC then set, except in a stimulus chapter where the set
 * is the outer unit (R9 — a passage spans subtopics and must not be broken up).
 * Ordering is alphabetical throughout so a re-run reproduces the paper.
 */
export function orderEnglishBlocks(rows: EnglishRow[]): EnglishRow[] {
  const key = (q: EnglishRow) =>
    isStimulusChapter(q.chapter)
      ? `${q.chapter} ${q.setId ?? ""}`
      : `${q.chapter} ${q.subtopic ?? ""} ${q.setId ?? ""}`;

  const buckets = new Map<string, EnglishRow[]>();
  for (const q of rows) {
    const k = key(q);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(q);
  }

  return [...buckets.keys()]
    .sort()
    .flatMap((k) =>
      [...buckets.get(k)!].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    );
}
