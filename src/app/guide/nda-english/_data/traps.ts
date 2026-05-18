/**
 * Content for /guide/nda-english/traps.
 *
 * English's trap shapes are fundamentally different from Maths' factor-of-2
 * and sign-flip patterns. They're meaning-based: near-synonym confusion,
 * direction-swap on antonyms, literal-reading of idioms, proximity-noun
 * S-V agreement, opener-cue mismatch in PQRS.
 *
 * No statistical distractor cells like Maths' SIGN_FLIP_CELLS — English
 * options are linguistic, not numeric, so detector queries don't apply.
 * Each trap is illustrated by a worked-example UUID + a 1-line "the fix" rule.
 */

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  {
    id: "near-synonym",
    title: "Near-synonym of a different sense",
    affects: ["vocab-synonyms", "fill-in-the-blanks"],
    mechanic:
      "The wrong option is a genuine synonym of the underlined word — but in a different sense than the sentence frames. 'CANDID' has 'frank' (right) and 'clear' (also a real synonym, but for a different meaning of candid). Without reading the sentence carefully, the wrong sense looks just as right.",
    fix: "Read the sentence's surrounding adjectives/verbs FIRST. Pick the synonym whose primary sense matches the register the sentence frames. If two options both look like synonyms, the more specific-to-this-context one wins.",
    exampleQuestionId: "89730917-1a70-4fdb-a4c9-37aa858eb1be", // 'obstreperous' MOD
  },
  {
    id: "opposite-direction",
    title: "Same-direction near-synonym in Antonyms",
    affects: ["vocab-antonyms"],
    mechanic:
      "On Antonyms, the most dangerous wrong option is the same-direction near-synonym. 'GENEROUS' → wrong option 'thrifty' (same axis as generous, milder direction). The student in a hurry picks any 'not generous' answer instead of the polar opposite 'miserly'.",
    fix: "Sort all 4 options by 'how-opposite'. The polar option (most distant, same axis) is the answer. Reject milder-same-direction options reflexively.",
    exampleQuestionId: "880b69da-5c14-407d-9c25-621c29b35fe2", // 'righteousness' antonym EASY
  },
  {
    id: "literal-idiom",
    title: "Literal-meaning interpretation of an idiom",
    affects: ["idioms-and-phrases"],
    mechanic:
      "'Cry over spilt milk' offered as 'lament dropped food'. 'Spill the beans' offered as 'drop legumes'. The literal reading is almost always present as one of the 4 options — it's the catch-the-tired-student trap.",
    fix: "On any idiom question, reject the literal-meaning option without thinking. Then choose among the figurative options based on the closest match to the standard meaning.",
  },
  {
    id: "sv-proximity",
    title: "S-V agreement by proximity, not by subject",
    affects: [
      "errors-subject-verb-agreement",
      "grammar-rules-bundle",
    ],
    mechanic:
      "A long prepositional phrase between subject and verb tempts the verb to agree with the proximity noun. 'The leader of the soldiers WERE brave' — 'were' agrees with 'soldiers' (the proximity noun), but the subject is 'leader' (singular). Should be 'was'.",
    fix: "Mentally bracket out every prepositional phrase between subject and verb. Then check agreement on the bare subject. If you can't tell which noun is the subject, ask 'which noun is the sentence ABOUT?' — that's the subject.",
    exampleQuestionId: "831abf6d-f23f-4842-8a07-2692f8a0e633", // S-V proximity MOD
  },
  {
    id: "tense-backshift-mismatch",
    title: "Reported-speech backshift fights an adverb",
    affects: ["errors-tense-and-verb-form"],
    mechanic:
      "'When I saw Arnab, he said he had taken his driving test YESTERDAY.' The backshift to past perfect is correctly applied — but the adverb 'yesterday' anchors the speech to the original time-of-saying, not the test-taking. The mismatch is the error.",
    fix: "When you see a past-perfect inside reported speech, check the adverb. 'Yesterday' / 'today' / 'now' belong to direct speech; reported speech needs 'the day before' / 'that day' / 'then'.",
    exampleQuestionId: "3425024c-9fa1-41b7-9ab1-2a6e1b4fc919",
  },
  {
    id: "pqrs-opener-mismatch",
    title: "PQRS / S1–S6 opener that's actually a middle sentence",
    affects: ["sentence-rearrangement"],
    mechanic:
      "A sentence that BEGINS with 'However', 'This', 'It', 'They' looks like a perfectly-formed opener. It can't be — those words reference backward, so they require a prior sentence to refer to. Picking a pronoun-starting sentence as opener is the most common PQRS mistake.",
    fix: "Before choosing an opener, scan all 4/5 candidates for backward-referencing words (However, Moreover, Therefore, This, That, It, They, Such). Eliminate those — what's left can open.",
    exampleQuestionId: "b9ab6118-ad1b-471b-bae4-bf2ae518c44d", // PQRS HARD
  },
  {
    id: "rc-outside-knowledge",
    title: "RC option that's true but not in the passage",
    affects: ["reading-comprehension"],
    mechanic:
      "An RC option is factually correct in the real world but never stated or implied by the passage. Picking it conflates 'what's true' with 'what THIS passage says' — exactly the trap RC questions test for.",
    fix: "For every RC option you're tempted by, ask: 'Could I locate the sentence(s) in the passage that commit the author to this?'. If no — drop it, even if it's factually right.",
    exampleQuestionId: "d257bf58-25cb-4a77-8384-ba5dfa0646fe",
  },
  {
    id: "rc-half-right-modifier",
    title: "RC option matches except for one inserted modifier",
    affects: ["reading-comprehension"],
    mechanic:
      "The option restates the passage almost verbatim, except for swapping 'often' → 'always', 'most' → 'all', 'some' → 'every'. The modifier swap turns a true statement into a false universal — but the eye glosses past single words.",
    fix: "Read RC options word-by-word, comparing each quantifier/modifier (always, never, all, only, must, exclusively) against the passage's hedging. Match the passage's qualifiers exactly.",
  },
  {
    id: "confusable-affect-effect",
    title: "Confusable pair embedded in a longer sentence",
    affects: [
      "errors-word-choice-prepositions-punctuation",
      "vocab-confusables-and-definitions",
    ],
    mechanic:
      "'Meaningful ecological AFFECTS of the handloom sector' — 'affects' (verb) used as a noun where 'effects' belongs. In the bare 'affect vs effect' framing, students get this right; embedded in a long underlined segment, the eye flies past.",
    fix: "On underline-the-error questions, scan each segment for confusable-pair words (affect/effect, accept/except, lose/loose, principle/principal, complement/compliment). If a segment contains one, double-check it.",
    exampleQuestionId: "6ede442f-c3b2-4030-bde5-fb55280a41a8",
  },
];

/** Bucket trap shapes by the playbook they most-commonly affect — used for
 *  the page's section grouping. */
export const TRAPS_BY_BUCKET = {
  recall: TRAP_SHAPES.filter((t) =>
    t.affects.some((a) => a.startsWith("vocab-") || a === "idioms-and-phrases")
  ),
  rule: TRAP_SHAPES.filter((t) =>
    t.affects.some(
      (a) => a.startsWith("errors-") || a.startsWith("grammar-")
    )
  ),
  reason: TRAP_SHAPES.filter((t) =>
    t.affects.some(
      (a) =>
        a === "reading-comprehension" ||
        a === "sentence-rearrangement" ||
        a === "cloze-test" ||
        a === "fill-in-the-blanks"
    )
  ),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  /** The trap that affects the most playbooks. */
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
