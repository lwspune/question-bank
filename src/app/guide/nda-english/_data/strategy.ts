/**
 * Content for /guide/nda-english/strategy.
 *
 * The strategic axis in NDA English is NOT %HARD (almost flat — 6 of 8
 * chapters are 0–7% HARD). It's *skill type*. Three buckets cover the bank:
 *
 *   - Recall  (Vocab 316 + Idioms 86 = 402 q / 45%) — memorisation
 *   - Rule    (Errors 115 + Grammar 108 = 223 q / 25%) — rule application
 *   - Reason  (Rearr 114 + RC 61 + FIB 55 + Cloze 45 = 275 q / 31%) — context
 *
 * Each bucket gets a distinct prep approach. Hours/yield are editorial
 * estimates calibrated against the cleaned bank as of OVERVIEW.asOf.
 */

import type { Difficulty } from "@/lib/questions/filters";

export type BucketChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  /** Subtopics that should be drilled (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Subtopics that should be skipped or deferred. */
  skipSubtopics?: string[];
  /** Marks the student should expect to harvest. NDA English GAT is 200
   *  marks / 50 q (4 marks each, –1.33 wrong). */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyBucket = {
  id: "recall" | "rule" | "reason";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this bucket is" pitch. */
  pitch: string;
  /** The prep approach — what makes this bucket distinct from the others. */
  approach: string[];
  chapters: BucketChapter[];
};

/** Headline numbers shown in the strategy hero. NDA English (GAT) is part of
 *  a 200-mark / 50-question English half — 4 marks per correct, ~1.33
 *  penalty per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 50,
  totalMarks: 200,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 140,
  targetAttempts: 40,
  targetAccuracyPct: 85,
};

export const RECALL_BUCKET: StrategyBucket = {
  id: "recall",
  label: "Recall — Vocabulary and Idioms (402 q / 45% of bank)",
  qCount: 402,
  pctOfBank: 45,
  pitch:
    "Pure recall — either you know the word/idiom or you don't. No partial credit, no reasoning route. The biggest bucket in the bank, the lowest-difficulty (Vocab 2% HARD, Idioms 3% HARD), and the most leverage per hour of focused word-list work.",
  approach: [
    "Build a tested-word list from the live bank (270 underlined words across Synonyms + Antonyms). Read /guide/nda-english/vocab-families for the thematic clusters.",
    "Drill in 20-word batches with spaced repetition (Anki, Quizlet). Test cold the next day. Words don't repeat across years (only 5 words tested twice in 10 yrs) — so memorise the *families*, not the stems.",
    "Idioms: 85 unique in 10 yrs. Group by theme (animal, body-part, colour, weather). The literal-meaning trap (Section 4 on /guide/nda-english/traps) is the only consistent distractor.",
  ],
  chapters: [
    {
      chapter: "Vocabulary",
      qCount: 316,
      pctHard: 2,
      mustDrill: ["Synonyms", "Antonyms"],
      skipSubtopics: ["Confusable Word Pairs", "Word Definition"],
      expectedYieldPerPaper: "12–14 marks",
      studyHours: 12,
      summary:
        "316 q in 10 yrs. 49% of attempts are EASY. Build a 300-word list across the 13 vocab families. Confusable pairs + Word Definition are too sparse to dedicate time to — they'll fall out of the same word work.",
    },
    {
      chapter: "Idioms and Phrases",
      qCount: 86,
      pctHard: 3,
      mustDrill: ["Idiom Meaning"],
      expectedYieldPerPaper: "4–5 marks",
      studyHours: 4,
      summary:
        "86 q / 85 unique idioms. Read them grouped by theme (body-parts, animals, colours, weather, money). The literal interpretation is almost always a wrong option — that's the trap shape NDA reuses.",
    },
  ],
};

export const RULE_BUCKET: StrategyBucket = {
  id: "rule",
  label: "Rule — Grammar and Spotting Errors (223 q / 25%)",
  qCount: 223,
  pctOfBank: 25,
  pitch:
    "Both chapters test the same ~10 grammar rules in different formats. Errors uses underline-the-mistake; Grammar uses fill-in-the-blank, identify-the-correct-sentence, or pick-the-right-connector. The rules are stable — they don't change year to year, so this bucket has the longest shelf life.",
  approach: [
    "Master the 5 most-tested rule clusters: subject-verb agreement, tense/verb-form, articles+determiners, prepositions, word choice (affect/effect, fewer/less, who/whom).",
    "Practice both formats in the same session — a S-V rule answered under Errors format trains the same muscle as the Grammar format. The cross-chapter overlap (27 q for S-V alone) is the highest in English.",
    "Grammar EXPLODED from 0 q in 2017–2018 to 30+ q/year after 2024. If you only practised pre-2024 papers, you're undertrained on Sentence Completion (30 q) and Connectors (20 q) which are post-2024 inventions.",
  ],
  chapters: [
    {
      chapter: "Spotting Errors",
      qCount: 115,
      pctHard: 3,
      mustDrill: [
        "Word Choice, Prepositions and Punctuation",
        "Subject-Verb Agreement",
        "Tense and Verb Form",
        "Articles, Determiners and Pronouns",
      ],
      skipSubtopics: ["Mixed Error Detection", "No Error (Correct Sentence)"],
      expectedYieldPerPaper: "5–6 marks",
      studyHours: 5,
      summary:
        "115 q. The underline-format that tests rule recognition. Drill the 4 named subtopics; Mixed + No-Error are calibration practice once you're solid on the rest.",
    },
    {
      chapter: "Grammar",
      qCount: 108,
      pctHard: 4,
      mustDrill: [
        "Sentence Completion",
        "Discourse Markers and Connectors",
        "Parts of Speech",
      ],
      skipSubtopics: ["Active and Passive Voice"],
      expectedYieldPerPaper: "5–6 marks",
      studyHours: 5,
      summary:
        "108 q, almost all post-2024. Sentence Completion + Connectors carry half the chapter (50 q). Drill Connectors aggressively — they test the same logic-of-discourse skill that Cloze and PQRS reward.",
    },
  ],
};

export const REASON_BUCKET: StrategyBucket = {
  id: "reason",
  label: "Reason — RC, Rearrangement, FIB, Cloze (275 q / 31%)",
  qCount: 275,
  pctOfBank: 31,
  pitch:
    "Context-driven. No vocabulary deficit and no rule lookup will save you here — these reward reading a passage carefully and following the logic of discourse. Sentence Rearrangement is the only chapter in NDA English with real HARD load (22% overall, Paragraph Sequencing at 36% HARD).",
  approach: [
    "Read 1 RC passage + 1 Cloze + 1 PQRS daily. Time-box: 8 min for RC, 4 min for Cloze, 2 min per PQRS. Don't read for comprehension; read for structure — what's the author claiming, what's the counter, what's the example?",
    "Paragraph Sequencing (S1–S6) is the hardest single subtopic in NDA English. The skill: locate the *opener cue* (a noun without a referring pronoun, a topic-setting statement) and the *closer cue* (a conclusion or a generalisation). Middle sentences fall into place by transition words (However, Moreover, So, Thus).",
    "FIB and Cloze look similar but test different things — FIB is sentence-scoped (vocabulary + collocation), Cloze is passage-scoped (logic + transition). Don't conflate them.",
  ],
  chapters: [
    {
      chapter: "Sentence Rearrangement",
      qCount: 114,
      pctHard: 22,
      mustDrill: [
        "Sentence Part Rearrangement (PQRS)",
        "Paragraph Sequencing (S1–S6)",
      ],
      expectedYieldPerPaper: "5–7 marks",
      studyHours: 6,
      summary:
        "114 q. PQRS is the bread (92 q), S1–S6 is the butter (22 q at 36% HARD). The hardest single subtopic in NDA English. Train opener/closer cue recognition.",
    },
    {
      chapter: "Reading Comprehension",
      qCount: 61,
      pctHard: 7,
      mustDrill: ["Inferential Comprehension", "Literal Comprehension"],
      expectedYieldPerPaper: "3–4 marks",
      studyHours: 4,
      summary:
        "61 q, set-bound (passages have 4–8 q each — answer them in order, not skipping). Inferential (43 q) dominates and is harder; Literal (14 q) is the easy plumbing question.",
    },
    {
      chapter: "Fill in the Blanks",
      qCount: 55,
      pctHard: 2,
      mustDrill: ["Contextual Fill-in-Blank"],
      expectedYieldPerPaper: "2–3 marks",
      studyHours: 2,
      summary:
        "55 q. Sentence-scoped — vocabulary + collocation. Phrasal-verb subset (10 q) is rare; drill the contextual main bucket.",
    },
    {
      chapter: "Cloze Test",
      qCount: 45,
      pctHard: 0,
      mustDrill: ["Word Selection in Passage"],
      expectedYieldPerPaper: "2–3 marks",
      studyHours: 2,
      summary:
        "45 q, zero HARD. Pure transition + discourse-connector reasoning. Often appears as one 5-blank passage. Easiest 5 marks if you can read for structure.",
    },
  ],
};

export const STRATEGY_BUCKETS = [RECALL_BUCKET, RULE_BUCKET, REASON_BUCKET];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — fastest-bucket-first to bank marks early. */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 15,
    label: "Sweep Recall (Vocab + Idioms)",
    detail:
      "Scan the paper, attack every Synonym/Antonym/Idiom question first. ~15 q × ~45 sec/q. Target: 12–13 correct in 15 minutes — that's already 50 marks banked. If you don't recognise the word, skip — don't guess; the −1.33 penalty kills.",
  },
  {
    durationMin: 20,
    label: "Sweep Rule (Errors + Grammar)",
    detail:
      "Attempt every Spotting Errors and Grammar question. ~12 q × ~90 sec/q. Pre-2024 you'd see 5 Grammar; in 2025+ you'll see ~15. Target: 10–11 correct.",
  },
  {
    durationMin: 25,
    label: "Reason (RC + Cloze + PQRS + FIB)",
    detail:
      "Tackle passages last — they're time-intensive. RC first (4–8 q per passage answers in batch), then Cloze (5-blank passage), then PQRS one-by-one. S1–S6 paragraph sequencing only if you have time spare — it's the bank's only chapter at 36% HARD.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Recall — Vocab + Idioms", hours: 16, outcome: "~16 marks/paper" },
  { label: "Rule — Errors + Grammar", hours: 10, outcome: "~11 marks/paper" },
  { label: "Reason — Rearr + RC + FIB + Cloze", hours: 14, outcome: "~13 marks/paper" },
  { label: "Past papers, timed", hours: 8, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
