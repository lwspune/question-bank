/**
 * Playbook catalog for /guide/nda-english/playbooks.
 *
 * A "playbook" = one major subtopic (or a tight bundle of related thin
 * subtopics) of NDA English, treated as a self-contained question-type with
 * its own rules, traps, and drill links.
 *
 * 16 playbooks total — calibrated to the cleaned bank as of OVERVIEW.asOf.
 * `chapter` + `subtopics[]` are canonical names (matched at request time via
 * resolveTaxonomy → UUIDs for /browse links). `qCount` is the SQL-derived
 * sum across the listed subtopics.
 *
 * `bucket` tags map each playbook to one of the 3 strategy buckets (Recall /
 * Rule / Reason) defined in strategy.ts — used for the playbooks-index
 * grouping.
 */

export type PlaybookBucket = "recall" | "rule" | "reason";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** One or more canonical subtopic names within `chapter` that this
   *  playbook covers. Multiple = a tight bundle (e.g. Vocab Confusables +
   *  Word Definition combined). */
  subtopics: string[];
  qCount: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // ─────── Recall bucket (3 playbooks, 402 q) ───────
  {
    slug: "vocab-synonyms",
    name: "Vocabulary — Synonyms",
    summary:
      "150 stems, 150 unique words. Sentence-context picks the right register. 99% EASY+MOD.",
    chapter: "Vocabulary",
    subtopics: ["Synonyms"],
    qCount: 150,
    pctHard: 1,
    bucket: "recall",
  },
  {
    slug: "vocab-antonyms",
    name: "Vocabulary — Antonyms",
    summary:
      "135 stems. Closer to 'pick the most opposite' than 'pick the most-different' — the bank's most common Antonyms trap is the same-direction near-synonym wrong option.",
    chapter: "Vocabulary",
    subtopics: ["Antonyms"],
    qCount: 135,
    pctHard: 2,
    bucket: "recall",
  },
  {
    slug: "vocab-confusables-and-definitions",
    name: "Vocabulary — Confusable pairs and word definitions",
    summary:
      "31 q across two thin subtopics — affect vs effect, principle vs principal, immediate vs imminent. Mostly handled by recognising the family.",
    chapter: "Vocabulary",
    subtopics: ["Confusable Word Pairs", "Word Definition"],
    qCount: 31,
    pctHard: 3,
    bucket: "recall",
  },
  {
    slug: "idioms-and-phrases",
    name: "Idioms and Phrases",
    summary:
      "86 q, 85 unique idioms. The literal-meaning option is almost always a wrong choice — the figurative reading is the answer.",
    chapter: "Idioms and Phrases",
    subtopics: ["Idiom Meaning"],
    qCount: 86,
    pctHard: 3,
    bucket: "recall",
  },

  // ─────── Rule bucket (8 playbooks, 223 q) ───────
  {
    slug: "errors-word-choice-prepositions-punctuation",
    name: "Spotting Errors — Word choice, prepositions, punctuation",
    summary:
      "Largest Errors subtopic (29 q). Tests the confusables (affect/effect), preposition collocations (of/with/in), and oxford-comma edge cases.",
    chapter: "Spotting Errors",
    subtopics: ["Word Choice, Prepositions and Punctuation"],
    qCount: 29,
    pctHard: 0,
    bucket: "rule",
  },
  {
    slug: "errors-subject-verb-agreement",
    name: "Spotting Errors — Subject-verb agreement",
    summary:
      "17 q. Cross-chapter with Grammar's S-V subtopic (10 q) — same rule, different format. Proximity-error trap is the dominant distractor.",
    chapter: "Spotting Errors",
    subtopics: ["Subject-Verb Agreement"],
    qCount: 17,
    pctHard: 6,
    bucket: "rule",
  },
  {
    slug: "errors-tense-and-verb-form",
    name: "Spotting Errors — Tense and verb form",
    summary:
      "16 q. Past-perfect vs simple-past, reported speech tense-shift, conditional-clause verb form. Tense backshift in reported speech is the most-tested.",
    chapter: "Spotting Errors",
    subtopics: ["Tense and Verb Form"],
    qCount: 16,
    pctHard: 0,
    bucket: "rule",
  },
  {
    slug: "errors-articles-pronouns-and-mixed",
    name: "Spotting Errors — Articles, pronouns, and mixed",
    summary:
      "43 q bundled: Articles+Determiners+Pronouns (14), No Error (14), Mixed Error Detection (15). The 'No Error' subtopic at 14% HARD is the bank's only Errors trap with real difficulty.",
    chapter: "Spotting Errors",
    subtopics: [
      "Articles, Determiners and Pronouns",
      "No Error (Correct Sentence)",
      "Mixed Error Detection",
    ],
    qCount: 43,
    pctHard: 5,
    bucket: "rule",
  },
  {
    slug: "errors-sentence-improvement",
    name: "Spotting Errors — Sentence improvement",
    summary:
      "10 q. Full-sentence underline; pick the best rewrite from 4 options. Tests register + conciseness as much as grammar.",
    chapter: "Spotting Errors",
    subtopics: ["Sentence Improvement"],
    qCount: 10,
    pctHard: 10,
    bucket: "rule",
  },
  {
    slug: "grammar-sentence-completion",
    name: "Grammar — Sentence completion",
    summary:
      "30 q, all post-2024. Fill-in-the-blank with two parallel blanks; tests verb-form + connector + register together.",
    chapter: "Grammar",
    subtopics: ["Sentence Completion"],
    qCount: 30,
    pctHard: 0,
    bucket: "rule",
  },
  {
    slug: "grammar-discourse-markers-and-connectors",
    name: "Grammar — Discourse markers and connectors",
    summary:
      "20 q. Pick the right because/although/however/moreover/so. Same skill the Cloze chapter rewards — drill them together.",
    chapter: "Grammar",
    subtopics: ["Discourse Markers and Connectors"],
    qCount: 20,
    pctHard: 0,
    bucket: "rule",
  },
  {
    slug: "grammar-rules-bundle",
    name: "Grammar — Rules bundle (PoS, S-V, prepositions, speech, voice, articles)",
    summary:
      "58 q across the 7 thin grammar subtopics. Each tests one of the foundational rules — Parts of Speech (15), S-V (10), Prepositions (10), Direct/Indirect speech (7), Correct Sentence Identification (7), Articles+Determiners (6), Active/Passive (3).",
    chapter: "Grammar",
    subtopics: [
      "Parts of Speech",
      "Subject-Verb Agreement",
      "Preposition Usage",
      "Direct and Indirect Speech",
      "Correct Sentence Identification",
      "Articles, Determiners and Quantifiers",
      "Active and Passive Voice",
    ],
    qCount: 58,
    pctHard: 7,
    bucket: "rule",
  },

  // ─────── Reason bucket (5 playbooks, 275 q) ───────
  {
    slug: "reading-comprehension",
    name: "Reading Comprehension",
    summary:
      "61 q across all three RC subtopics. Set-bound (4–8 q/passage). Inferential (43 q) dominates and is harder than Literal (14 q) or Vocab-in-context (4 q).",
    chapter: "Reading Comprehension",
    subtopics: [
      "Inferential Comprehension",
      "Literal Comprehension",
      "Vocabulary in Context",
    ],
    qCount: 61,
    pctHard: 7,
    bucket: "reason",
  },
  {
    slug: "cloze-test",
    name: "Cloze Test",
    summary:
      "45 q, zero HARD across the bank. 5–10 blank passage, mostly tests transitions and connectors. The single highest marks-per-hour playbook.",
    chapter: "Cloze Test",
    subtopics: ["Word Selection in Passage"],
    qCount: 45,
    pctHard: 0,
    bucket: "reason",
  },
  {
    slug: "sentence-rearrangement",
    name: "Sentence Rearrangement (PQRS + Paragraph Sequencing)",
    summary:
      "114 q. PQRS (92, 19% HARD) reorders 4 sentence parts inside one sentence; S1–S6 (22, 36% HARD) reorders middle 4 of a 6-sentence paragraph. Same lever — opener and closer cues.",
    chapter: "Sentence Rearrangement",
    subtopics: [
      "Sentence Part Rearrangement (PQRS)",
      "Paragraph Sequencing (S1–S6)",
    ],
    qCount: 114,
    pctHard: 22,
    bucket: "reason",
  },
  {
    slug: "fill-in-the-blanks",
    name: "Fill in the Blanks",
    summary:
      "55 q. Sentence-scoped (vs Cloze's passage scope). Contextual (45 q) tests vocab + collocation; Phrasal/Collocation (10 q) tests fixed phrasal verbs (look up, get over, take after).",
    chapter: "Fill in the Blanks",
    subtopics: [
      "Contextual Fill-in-Blank",
      "Contextual Word Selection (Phrasal Verbs and Collocations)",
    ],
    qCount: 55,
    pctHard: 2,
    bucket: "reason",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  recall: PLAYBOOKS.filter((p) => p.bucket === "recall"),
  rule: PLAYBOOKS.filter((p) => p.bucket === "rule"),
  reason: PLAYBOOKS.filter((p) => p.bucket === "reason"),
};
