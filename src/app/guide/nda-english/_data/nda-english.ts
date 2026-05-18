/**
 * Static content + numbers for the /guide/nda-english route.
 *
 * Pulled from the live NDA English (GAT) PUBLIC bank. Editorial numbers
 * snapshot is `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Structurally different from nda-maths:
 *   - No "principles" axis — English chapters are sealed question-types,
 *     with at most 27 q (S-V agreement) of cross-chapter reach. Each chapter
 *     IS the technique. Hence /playbooks (16 entries) replaces /principles.
 *   - %HARD is flat (0–7% for 6 of 8 chapters, only Sentence Rearrangement
 *     carries real difficulty at 22%). Tier A/B/C is replaced by a
 *     Recall/Rule/Reason split — see STRATEGY_BUCKETS in `strategy.ts`.
 *   - No compound-tricks page. The cross-chapter overlap is too thin.
 *   - Vocab-families page lives outside /playbooks/* — themed groupings of
 *     real PYQ-tested words, mined from the live bank.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-english (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/nda-english, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA English (GAT) actually works — what the 900-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Recall, Rule, Reason — the three skill buckets and how to allocate prep time.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "16 playbooks — one per major subtopic. How each question type is asked, the rules, the traps.",
  },
  {
    slug: "vocab-families",
    label: "Vocab Families",
    blurb:
      "270 PYQ-tested words clustered into 13 themes. The patterns NDA reuses.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA English shifted from 2017 to 2026 — Grammar exploded post-2024, Spotting Errors went quiet.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA reuses — near-synonym, opposite-direction, literal-idiom, S-V proximity, PQRS opener mismatch.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA-1 2017–2026 + NDA-2 2017–2025 minus the 2020
   *  COVID cancellation and 2026 NDA-2 not-yet-written. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — replaces the maths guide's "principles" headline. */
  playbooks: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 900,
  papers: 18,
  yearsCovered: 10,
  chapters: 8,
  playbooks: 16,
  // 534 EASY + 320 MODERATE + 46 HARD = 900 (SQL-derived 2026-05-18)
  difficulty: { easy: 534, moderate: 320, hard: 46 },
  asOf: "2026-05-18",
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within chapter (rounded integer). */
  pctHard: number;
  /** Top subtopics with counts, plus optional context. */
  focus: string;
};

/** 8 NDA English chapters, sorted by question count descending. SQL-derived
 *  against the 900-q PUBLIC bank as of OVERVIEW.asOf.
 *  Numbers in `focus` may drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Vocabulary",
    qCount: 316,
    pctTotal: 35.1,
    pctHard: 2,
    focus:
      "Synonyms (150), Antonyms (135), Confusable pairs (20), Word defn (11). The largest chapter — pure recall, EASY-heavy.",
  },
  {
    chapter: "Spotting Errors",
    qCount: 115,
    pctTotal: 12.8,
    pctHard: 3,
    focus:
      "Word Choice/Prep/Punct (29), S-V Agreement (17), Tense (16), Articles/Pronouns/Mixed (43). Underline-the-error format.",
  },
  {
    chapter: "Sentence Rearrangement",
    qCount: 114,
    pctTotal: 12.7,
    pctHard: 22,
    focus:
      "PQRS (92), S1–S6 paragraphs (22 — 36% HARD). The only chapter that carries real difficulty load.",
  },
  {
    chapter: "Grammar",
    qCount: 108,
    pctTotal: 12.0,
    pctHard: 4,
    focus:
      "Sentence Completion (30), Connectors (20), PoS (15), S-V (10), Prep (10). Exploded from 0 to 40 q/yr after 2024.",
  },
  {
    chapter: "Idioms and Phrases",
    qCount: 86,
    pctTotal: 9.6,
    pctHard: 3,
    focus:
      "Single subtopic — Idiom Meaning. 85 unique idioms in 10 years (only 'sit on the fence' repeats).",
  },
  {
    chapter: "Reading Comprehension",
    qCount: 61,
    pctTotal: 6.8,
    pctHard: 7,
    focus:
      "Inferential (43), Literal (14), Vocab-in-context (4). Set-bound — passages have 4–8 q each.",
  },
  {
    chapter: "Fill in the Blanks",
    qCount: 55,
    pctTotal: 6.1,
    pctHard: 2,
    focus:
      "Contextual (45), Phrasal/Collocation (10). Sentence-scoped (vs Cloze passages).",
  },
  {
    chapter: "Cloze Test",
    qCount: 45,
    pctTotal: 5.0,
    pctHard: 0,
    focus:
      "Word Selection in Passage. Zero HARD across the bank — pure transition/connector reasoning.",
  },
];
