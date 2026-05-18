/**
 * Per-playbook deep-dive content for /guide/nda-english/playbooks/{slug}.
 *
 * Each entry: trigger (one-line "when to reach for this"), story (2–3
 * paragraph teacherly explanation), sub-skills (the rules / patterns inside),
 * traps (chapter-specific distractor shapes), worked example UUIDs (3–4
 * per playbook, resolved via loadWorkedExamples at request time), and
 * relatedSlugs (cross-links to other playbooks).
 *
 * UUIDs were SQL-picked from the live bank — most recent year first,
 * difficulty-distributed where possible.
 */

export type PlaybookDetail = {
  /** One-line "when to use" cue. */
  trigger: string;
  /** 2–3 paragraph teacherly explanation. */
  story: string[];
  /** The rules / sub-skills inside this playbook. */
  subSkills: { name: string; description: string }[];
  /** Distractor patterns specific to this playbook. */
  traps: { name: string; description: string }[];
  /** Ordered worked-example UUIDs from the bank. */
  exampleQuestionIds: string[];
  /** Cross-link to 2–3 related playbook slugs. */
  relatedSlugs: string[];
};

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // ─────────────────────── RECALL ───────────────────────
  "vocab-synonyms": {
    trigger:
      "An underlined word inside a sentence; pick the option closest in meaning.",
    story: [
      "150 q in 10 years; every single stem uses a unique word — there's no overlap to memorise. So the prep isn't 'memorise 150 words'; it's 'build vocabulary breadth across the 13 thematic families NDA reuses' (see /guide/nda-english/vocab-families).",
      "The sentence frame around the underlined word is not decoration — it sets the register. 'meticulous attention' (positive) vs 'meticulous interrogation' (could be cold/clinical) shifts which synonym fits. Read the surrounding adjectives and the verb tense before scanning options.",
      "Distractor design: the wrong options are almost always real synonyms of *a different sense* of the word. 'CANDID' has options like (a) frank (b) careful (c) clear (d) honest — both frank and honest are correct in different registers, but the sentence's context picks one over the other.",
    ],
    subSkills: [
      {
        name: "Register matching",
        description:
          "Match the formality of the surrounding sentence. Formal stems get Latinate synonyms (commence); informal stems get Anglo-Saxon (start).",
      },
      {
        name: "Part-of-speech preservation",
        description:
          "If the underlined word is an adjective, all 4 options should be adjectives. If one option is a noun, it's almost certainly wrong — unless the wrap-around grammar would survive the swap.",
      },
      {
        name: "Polarity check",
        description:
          "If the sentence implies criticism, the synonym should be neutral-to-negative. The 'wrong sentiment' option is a common distractor.",
      },
    ],
    traps: [
      {
        name: "Near-synonym of a different sense",
        description:
          "The wrong option is a real synonym of the word in a sense that doesn't fit this sentence. ('clear' for CANDID is right in 'crystal clear' but wrong for 'a candid admission'.)",
      },
      {
        name: "False friend",
        description:
          "An option that LOOKS like it should be the answer (similar root, similar prefix) but isn't. 'inflammable' looks opposite of 'flammable' but means the same — recall the family.",
      },
    ],
    exampleQuestionIds: [
      "a50751db-d493-4c91-8617-e2163b086556", // EASY — 'allegories' (Jataka Tales)
      "89730917-1a70-4fdb-a4c9-37aa858eb1be", // MODERATE — 'obstreperous'
    ],
    relatedSlugs: ["vocab-antonyms", "vocab-confusables-and-definitions", "idioms-and-phrases"],
  },

  "vocab-antonyms": {
    trigger:
      "An underlined word inside a sentence; pick the option closest in opposite meaning.",
    story: [
      "135 q in 10 years. The mistake students make: treating Antonyms like 'Synonyms with a minus sign in front'. NDA designs Antonyms questions so that the closest-meaning synonym is *always* one of the 4 wrong options — picking it costs −1.33 marks.",
      "The right answer is the *most-opposite-in-direction* option. 'GENEROUS' has options like (a) miserly (b) thrifty (c) cheap (d) economical. Three of those (thrifty, cheap, economical) are also 'not generous' but in a milder or different-direction sense. Only 'miserly' is the polar opposite. That's the lever.",
      "270 different words have been tested across Synonyms + Antonyms in 10 years (only 5 repeated). So your prep target isn't 'memorise these 270 words' — it's 'recognise the 13 families they cluster into' so a new tested word's family triggers a fast 'opposite-direction' lookup.",
    ],
    subSkills: [
      {
        name: "Direction matters — find the polar opposite",
        description:
          "Sort the 4 options by 'how opposite is this?'. The polar option (most-distant on the same axis) is the answer. A milder-opposite or different-axis option is the trap.",
      },
      {
        name: "Recognise prefixes",
        description:
          "un-, in-, dis-, mis-, anti-, counter- often signal the antonym. If 3 options have these prefixes and 1 doesn't, the prefix-less one is often a same-direction near-synonym trap.",
      },
      {
        name: "Stay in register",
        description:
          "'Wealthy' and 'destitute' are opposites, but 'rich' and 'destitute' is a register mismatch. Keep the formality consistent.",
      },
    ],
    traps: [
      {
        name: "Same-direction near-synonym",
        description:
          "The wrong option is in the same direction as the underlined word but less intense. Picking it = picking 'less of the same thing' instead of 'the opposite'.",
      },
      {
        name: "Different-axis opposite",
        description:
          "BIG → SMALL is one axis; BIG → SHORT is another (size vs height). The wrong option opposes on a different axis than the sentence frames.",
      },
    ],
    exampleQuestionIds: [
      "880b69da-5c14-407d-9c25-621c29b35fe2", // EASY — 'righteousness'
      "c82136af-0bf6-4c07-8dd2-7f3415c2d380", // HARD — 'perspicacity'
    ],
    relatedSlugs: ["vocab-synonyms", "vocab-confusables-and-definitions", "idioms-and-phrases"],
  },

  "vocab-confusables-and-definitions": {
    trigger:
      "Two near-identical words (affect/effect, principle/principal) or a stem that asks for a one-word definition.",
    story: [
      "31 q across the two thin Vocabulary subtopics. Both reward the same skill: knowing the precise meaning, not the approximate one. Confusable Word Pairs (20 q) tests 'pick the right one of two look-alike words for the blank'. Word Definition (11 q) tests 'pick the word whose meaning matches the given description'.",
      "The work that pays off here is reading any standard confusable-pair list (affect/effect, accept/except, lose/loose, principle/principal, complement/compliment, stationary/stationery) and writing one sentence using each correctly. The bank rotates the same ~30 pairs.",
      "Word Definition is essentially 'reverse synonyms'. Given 'a person who hates humanity', pick MISANTHROPE. The trap is the close-but-wrong option (MISOGYNIST = hates women, not humans).",
    ],
    subSkills: [
      {
        name: "Master the top-30 confusable pairs",
        description:
          "affect/effect (verb/noun), accept/except (receive/exclude), lose/loose (misplace/loose), principle/principal (rule/head), complement/compliment (complete/praise), stationary/stationery (still/paper), discreet/discrete (careful/separate), elicit/illicit (extract/illegal), allusion/illusion (reference/false belief).",
      },
      {
        name: "Definition → word: think 'specific not approximate'",
        description:
          "A definition tests the precise word, not a similar one. 'Fear of enclosed spaces' is CLAUSTROPHOBIA, not 'phobia of small rooms'.",
      },
    ],
    traps: [
      {
        name: "Adjacent meaning",
        description:
          "PHILANTHROPIST (loves humanity) vs MISANTHROPIST (hates humanity) — same root, opposite meaning. Picking by half-recognition costs you the question.",
      },
      {
        name: "Sound-alike with different meaning",
        description:
          "'imminent' (about to happen) vs 'eminent' (distinguished). One vowel away, different meaning.",
      },
    ],
    exampleQuestionIds: [
      "7e5c3464-abb9-4185-87a5-a78b7e159dbd", // EASY — 'Confident and Confidant'
    ],
    relatedSlugs: ["vocab-synonyms", "vocab-antonyms", "errors-word-choice-prepositions-punctuation"],
  },

  "idioms-and-phrases": {
    trigger:
      "A common English idiom in the stem; pick its figurative meaning from 4 options.",
    story: [
      "86 q over 10 years, 85 unique idioms (only 'sit on the fence' has been tested twice). So the prep target is 'recognise the canon of ~200 widely-used English idioms', not 'memorise the 85 already-tested ones' — they won't repeat.",
      "Group idioms by image: animal idioms (a bag of bones, dark horse, hold your horses), body-part idioms (bite your tongue, show your hand, by hook or by crook), colour idioms (yellow journalism, white lie, in the red), weather idioms (in the eye of the storm, a fair-weather friend), money idioms (be in the red, break the bank). Image-grouping retrieves much faster than alphabetical lists.",
      "The 2026 paper introduced a multi-statement variant — 4 idiom-meaning pairs, identify how many are correctly matched. Same recall skill, doubled per question. Worth specifically practising because the wrong-match option is engineered to swap two adjacent idioms in the list.",
    ],
    subSkills: [
      {
        name: "Figurative-first reading",
        description:
          "On an idiom, the literal interpretation is almost always a wrong option. 'cry over spilt milk' is not about milk; it's about regretting irreversible past actions.",
      },
      {
        name: "Theme grouping (animal/body/colour/weather/money)",
        description:
          "Cluster idioms by visual theme. Retrieval is faster — if the stem mentions a colour, your brain reaches into the colour-idiom bucket first.",
      },
      {
        name: "Multi-statement variant",
        description:
          "Read each pair independently. The trap is a mid-list correct match flanked by two wrong ones — the count-correct framing makes it easy to overcount.",
      },
    ],
    traps: [
      {
        name: "Literal meaning",
        description:
          "Almost always one of the 4 options. 'spill the beans' offered as 'drop food'. Reject these reflexively.",
      },
      {
        name: "Adjacent-figurative",
        description:
          "An option that's a different idiom's meaning. 'bite your tongue' (stay silent) vs 'hold your tongue' (also silent) vs 'tongue-tied' (unable to speak) — overlapping but distinct.",
      },
    ],
    exampleQuestionIds: [
      "fa831f00-0839-4b41-bdee-27461fd68090", // EASY — 'a piece of cake'
      "387db7e3-45b8-4634-bcff-ab0248b6a723", // HARD — multi-statement idiom-meaning pairs
    ],
    relatedSlugs: ["vocab-synonyms", "vocab-antonyms", "vocab-confusables-and-definitions"],
  },

  // ─────────────────────── RULE ───────────────────────
  "errors-word-choice-prepositions-punctuation": {
    trigger:
      "4 segments of a sentence are underlined separately; identify which one contains an error.",
    story: [
      "Largest Spotting Errors subtopic (29 q). The error sits in one of four labelled segments. Wrong-preposition errors are the most-tested: 'depends from' (should be 'depends on'), 'different than' (should be 'different from'), 'married with' (should be 'married to'). Memorise the standard British-English preposition collocations.",
      "Word-choice errors in this bucket are mostly the affect/effect family — same confusable list as the Vocabulary playbook. The Spotting Errors format embeds them in a longer sentence, so they're harder to spot than the bare 'pick affect or effect' framing.",
      "Punctuation errors are rare (1–2 q across the bank) and almost always involve comma splices or oxford-comma differences. Don't over-drill these — preposition and word-choice are the bulk.",
    ],
    subSkills: [
      {
        name: "Master the standard preposition collocations",
        description:
          "depend on, different from, married to, comprise of (no preposition!), prefer X to Y (not 'than'), accuse someone of, suspect of, blame for/on.",
      },
      {
        name: "Scan for the confusable-pair errors",
        description:
          "affect/effect, accept/except, lose/loose. In a 4-segment underline, one segment containing a confusable pair is suspicious by default.",
      },
      {
        name: "Read each underline as a stand-alone phrase",
        description:
          "If you can't immediately spot an error, re-read each underlined segment as if it were a stand-alone phrase — disconnected from context. The error often pops out.",
      },
    ],
    traps: [
      {
        name: "Plausible-sounding wrong preposition",
        description:
          "'discuss about' and 'cope up with' are common spoken-English errors that look natural. Test against the standard collocation list, not against intuition.",
      },
      {
        name: "Distractor segment",
        description:
          "Often one underlined segment contains an unusual word that LOOKS suspicious but is correct — the error is in a more innocuous-looking segment.",
      },
    ],
    exampleQuestionIds: [
      "6ede442f-c3b2-4030-bde5-fb55280a41a8", // EASY — 'ecological affects' (should be 'effects')
    ],
    relatedSlugs: [
      "errors-subject-verb-agreement",
      "errors-tense-and-verb-form",
      "vocab-confusables-and-definitions",
    ],
  },

  "errors-subject-verb-agreement": {
    trigger:
      "A subject and a verb separated by a phrase or clause; check whether the verb agrees with the actual subject (not the nearest noun).",
    story: [
      "17 q under Spotting Errors + 10 q under Grammar = 27 q total across both chapters. The single biggest cross-chapter lever in NDA English, and the only one where 'drill across chapters' meaningfully pays off.",
      "The signature trap is the 'proximity error': a long prepositional phrase between subject and verb makes the verb agree with the *last noun* rather than the actual subject. 'The project staff are working on the weekend' — 'staff' is the subject (collective singular in BrE, often plural in IndE/AmE), the prepositional 'on the weekend' is decorative.",
      "Build the habit: when you see a subject + verb, mentally bracket out the entire prepositional phrase in between, then check agreement. 'The pile of books [on the table] is/are' — bracket out '[on the table]', then 'The pile is' confirms the singular.",
    ],
    subSkills: [
      {
        name: "Bracket-out the modifier",
        description:
          "Cross out any 'of X', 'in Y', 'with Z' between subject and verb. Then check S-V on the bare subject.",
      },
      {
        name: "Collective nouns + 'each/every/either/neither/none'",
        description:
          "team, staff, committee, government — singular by convention (BrE allows plural for collective acting individually). 'Each/every/either/neither/none of the X' — singular verb.",
      },
      {
        name: "Compound subjects: 'and' vs 'or'",
        description:
          "X and Y → plural. X or Y / Neither X nor Y → verb agrees with the noun closest to the verb (proximity rule, the one place it's correct).",
      },
    ],
    traps: [
      {
        name: "Proximity-noun verb",
        description:
          "The verb agrees with the noun nearest it, which is NOT the actual subject. 'The leader of the soldiers were brave' — 'soldiers' is the proximity noun, but the subject is 'leader' (singular).",
      },
      {
        name: "Inverted-order subject hiding behind verb",
        description:
          "'There is a book and three pencils on the table' — sounds fine, but 'is' should agree with the compound 'a book and three pencils' (plural).",
      },
    ],
    exampleQuestionIds: [
      "831abf6d-f23f-4842-8a07-2692f8a0e633", // MODERATE — 'The project staff are working'
    ],
    relatedSlugs: [
      "errors-tense-and-verb-form",
      "grammar-rules-bundle",
      "errors-word-choice-prepositions-punctuation",
    ],
  },

  "errors-tense-and-verb-form": {
    trigger:
      "An underlined verb in the wrong tense or wrong form for the surrounding sentence's time-frame.",
    story: [
      "16 q. The most-tested sub-pattern is reported-speech tense backshift: when the reporting verb (said, told, asked) is in past tense, the verb inside the reported clause shifts one tense back. 'He said he had taken the test' (past perfect) vs 'He said he took the test yesterday' (still wrong if 'yesterday' anchors the original speech).",
      "Conditional-clause verb forms are second-most-tested. 'If I were' (subjunctive, hypothetical) vs 'If I was' (factual, past). Type-2 conditionals always use 'were' across all persons.",
      "Past-perfect-vs-simple-past confusion: past perfect is for the earlier of two past events. 'When I arrived, he had left' — 'had left' is correct because the leaving happened *before* the arriving. 'He had left yesterday' (with a single past time-marker) is wrong.",
    ],
    subSkills: [
      {
        name: "Reported-speech backshift",
        description:
          "Present → past, past → past perfect. Modals: can → could, may → might, will → would. 'Yesterday' becomes 'the day before' in the report.",
      },
      {
        name: "Subjunctive in conditionals + wishes",
        description:
          "Type-2: 'If I were rich, I would travel'. Type-3: 'If I had studied, I would have passed'. 'I wish I were' (not 'was') — subjunctive after wish.",
      },
      {
        name: "Past perfect for the earlier event",
        description:
          "Two past events: the earlier one takes past perfect, the later takes simple past. One past event = simple past, regardless.",
      },
    ],
    traps: [
      {
        name: "Backshift with adverbial mismatch",
        description:
          "'When I saw Arnab, he said he had taken his driving test yesterday' — the backshift looks right, but 'yesterday' fights with the past-perfect anchor.",
      },
      {
        name: "False subjunctive",
        description:
          "'If I was wrong, please correct me' — factual, not hypothetical, so 'was' IS correct here. Don't apply 'were' reflexively.",
      },
    ],
    exampleQuestionIds: [
      "3425024c-9fa1-41b7-9ab1-2a6e1b4fc919", // MODERATE — 'had taken' + 'yesterday' mismatch
    ],
    relatedSlugs: [
      "errors-subject-verb-agreement",
      "errors-word-choice-prepositions-punctuation",
      "grammar-rules-bundle",
    ],
  },

  "errors-articles-pronouns-and-mixed": {
    trigger:
      "Article (a/an/the) misuse, pronoun-antecedent mismatch, or a mixed-error sentence with no single rule signature.",
    story: [
      "43 q across three thin subtopics — Articles+Determiners+Pronouns (14), No Error (14), Mixed Error Detection (15). Articles errors are mostly 'omitted the definite article' or 'used a/an before a vowel-sound noun' (an hour, not a hour). Pronoun errors are mostly antecedent-ambiguity or case errors (between you and I → me).",
      "The 'No Error' subtopic at 14% HARD is the bank's only Errors trap with real difficulty — and it's a calibration play. You can ONLY get good at it by also drilling the rule-positive subtopics, because the skill is 'recognise the absence of every error pattern'.",
      "Mixed Error Detection means the error isn't from a named rule category. Often these are register errors (using contractions in formal writing), punctuation errors (semi-colon vs colon), or weird parallelism breaks. Drill last — they reward general fluency more than rule recognition.",
    ],
    subSkills: [
      {
        name: "Articles: a vs an vs the vs zero",
        description:
          "a before consonant sound, an before vowel sound (an hour, a university). 'The' for specific reference; zero article for abstract/general nouns (love, education).",
      },
      {
        name: "Pronoun cases: I/me, who/whom, between you and ___",
        description:
          "Subject vs object cases. 'Between you and me' (object of preposition). 'Who is at the door' (subject) vs 'To whom were you speaking' (object).",
      },
      {
        name: "Pronoun-antecedent agreement",
        description:
          "If 'the team' is the antecedent, the pronoun is 'it' (singular collective in BrE) — not 'they'. Match the verb you'd use.",
      },
    ],
    traps: [
      {
        name: "Sentence with no error",
        description:
          "Don't force an error if you can't find one. 14 of 115 Errors questions have no error; if 3 segments look fine to you, the 4th probably is too.",
      },
      {
        name: "Double underline distractor",
        description:
          "Two segments look slightly off but only one is actually grammatical — focus on which one breaks a *named* rule, not which one 'sounds slightly informal'.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: [
      "errors-subject-verb-agreement",
      "errors-tense-and-verb-form",
      "grammar-rules-bundle",
    ],
  },

  "errors-sentence-improvement": {
    trigger:
      "A full sentence with one part underlined; pick the best rewrite of that part from 4 options (one of which is the original, unchanged).",
    story: [
      "10 q. Distinct from the other Errors subtopics because (a) the underline is a longer phrase, not a single word or short segment, and (b) one of the options is 'No change needed' — making the No-Error trap relevant here too.",
      "The improvement is usually conciseness + register: the original might be 'very different than the other' which is improved to 'very different from the other'. Or it might be parallelism: 'enjoys reading, swimming, and to run' improved to 'enjoys reading, swimming, and running'.",
      "Read all four options before deciding. The improvement is the option that fixes the violation *without introducing a new one*. A common trap: an option that fixes the original error but creates a tense mismatch elsewhere.",
    ],
    subSkills: [
      {
        name: "Conciseness as default",
        description:
          "Between two grammatically-correct options, prefer the shorter one. NDA's expected register is formal-concise.",
      },
      {
        name: "Parallelism check",
        description:
          "When a list appears, all items must share grammatical form. -ing, -ing, -ing — not -ing, -ing, infinitive.",
      },
      {
        name: "Read all options including 'no change'",
        description:
          "If the original sentence is correct, the answer is 'no change needed' — don't change for the sake of changing.",
      },
    ],
    traps: [
      {
        name: "Fix-and-introduce",
        description:
          "An option fixes the original error but adds a new one (tense, S-V, preposition). Check the whole sentence after substitution.",
      },
      {
        name: "Synonym swap with no improvement",
        description:
          "An option just swaps the underlined word for a synonym — same meaning, same correctness, just different vocabulary. Not an improvement.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: [
      "errors-tense-and-verb-form",
      "errors-subject-verb-agreement",
      "errors-articles-pronouns-and-mixed",
    ],
  },

  "grammar-sentence-completion": {
    trigger:
      "A sentence with two blanks to fill; pick the option whose word-pair best completes both.",
    story: [
      "30 q, all post-2024. The format is new — most students prepping from pre-2024 papers haven't seen it. Two blanks separated by a connector (and, but, although, because), each blank needing a word that fits BOTH the local grammar AND the relationship the connector implies.",
      "Approach: read the sentence with both blanks blank, identify the connector's logic (parallel/contrast/cause), then test each option's pair. The wrong options usually fail the second blank — the first blank looks fine, but the second creates a meaning mismatch.",
      "Examples: 'He was not only ___ but also ___' (parallel structure — both blanks should be the same part of speech, both positive or both negative). 'Although she was ___, she ___' (contrast — first blank's quality should contrast with second blank's action).",
    ],
    subSkills: [
      {
        name: "Connector logic — read it first",
        description:
          "and/also = parallel. but/although/yet = contrast. because/since = cause. The connector tells you what relationship the two blanks should have.",
      },
      {
        name: "Test both blanks, not just the first",
        description:
          "Wrong options usually have a plausible first word and a meaning-mismatched second. Always check the second blank against the connector logic.",
      },
      {
        name: "Maintain parallel grammar",
        description:
          "'Not only X but also Y' — X and Y must be same part of speech (both nouns, both verbs, both clauses).",
      },
    ],
    traps: [
      {
        name: "Plausible-first-blank",
        description:
          "The first word fits naturally; the second creates a meaning that contradicts the connector. Always finish reading.",
      },
    ],
    exampleQuestionIds: [
      "613bd0e0-da66-45c7-860a-34b39eed2f69", // MODERATE — 'I will not pay for the goods'
    ],
    relatedSlugs: [
      "grammar-discourse-markers-and-connectors",
      "fill-in-the-blanks",
      "cloze-test",
    ],
  },

  "grammar-discourse-markers-and-connectors": {
    trigger:
      "Pick the right connector (however / moreover / so / therefore / although / because) for the gap.",
    story: [
      "20 q. The same skill that Cloze rewards — both test 'which discourse-relation does this slot need?'. The Grammar version is sentence-scoped, the Cloze version is passage-scoped, but the toolkit is identical.",
      "Top 8 connectors to master: however (contrast), moreover (addition), therefore (cause→effect), so (cause→effect, informal), although (contrast within sentence), because (effect→cause), nevertheless (concession), instead (substitution). These cover ~90% of the bank.",
      "The trap is mistaking 'and' (mere addition) for 'therefore' (causal). Both link clauses, but the second-clause meaning differs. Read the second clause asking 'does this RESULT from the first, or just ADD to it?' to pick the right connector.",
    ],
    subSkills: [
      {
        name: "Map each connector to a logic-relation",
        description:
          "however/but/yet/although = contrast. moreover/furthermore = addition. so/therefore/thus/hence = cause→effect. because/since/as = effect→cause.",
      },
      {
        name: "Distinguish 'and' from 'therefore'",
        description:
          "'and' is neutral linking; 'therefore' adds causality. 'It rained, and we got wet' vs 'It rained, therefore we got wet' — only the second claims causation.",
      },
    ],
    traps: [
      {
        name: "Polarity-flip connector",
        description:
          "Using 'however' where 'moreover' is needed (or vice versa). Always re-read the two clauses asking 'do they agree or disagree?'.",
      },
    ],
    exampleQuestionIds: [
      "248c99a4-702e-4431-b6fd-63303c4b082d", // EASY — connector 'besides/anyway'
    ],
    relatedSlugs: [
      "grammar-sentence-completion",
      "cloze-test",
      "sentence-rearrangement",
    ],
  },

  "grammar-rules-bundle": {
    trigger:
      "A thin grammar question — parts of speech identification, preposition usage, direct/indirect speech conversion, voice change, article/determiner choice.",
    story: [
      "58 q across 7 thin subtopics. Each tests one foundational rule. They're bundled into one playbook because (a) each subtopic is too small for its own deep-dive, and (b) the prep is the same — read a standard grammar reference once, drill the bank.",
      "Highest-yield within the bundle: Parts of Speech (15 q — identify noun/verb/adjective/adverb in context), S-V (10 q — same as Errors S-V), Preposition Usage (10 q — same as Errors WCPP). These three account for 60% of the bundle.",
      "Direct↔Indirect Speech (7 q at 28% HARD) is the hardest sub-skill in the bundle. The conversion rules are mechanical (tense backshift + pronoun shift + adverb shift) but tedious. If short on time, drill conversions on 10 sentences and move on.",
    ],
    subSkills: [
      {
        name: "Parts of speech identification (in context)",
        description:
          "Same word, different POS depending on usage. 'I run fast' (verb) vs 'I went for a run' (noun). Identify by position and function, not by guess.",
      },
      {
        name: "Direct ↔ indirect speech conversion",
        description:
          "Tense backshift + pronouns shift to third person + adverbs shift (yesterday → the day before, today → that day, here → there).",
      },
      {
        name: "Active ↔ passive voice",
        description:
          "Subject swap + 'be' + past participle + 'by' agent. Only transitive verbs convert. Modal in passive: 'must be done', not 'must do'.",
      },
    ],
    traps: [
      {
        name: "Same-word, wrong-POS option",
        description:
          "An option that's the right word but in the wrong POS form. 'kindly' (adverb) vs 'kindness' (noun) — both feel right in casual reading.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: [
      "errors-subject-verb-agreement",
      "grammar-discourse-markers-and-connectors",
      "errors-tense-and-verb-form",
    ],
  },

  // ─────────────────────── REASON ───────────────────────
  "reading-comprehension": {
    trigger:
      "A passage of 150–400 words followed by 4–8 questions on its content, inference, or vocabulary.",
    story: [
      "61 q across 3 subtopics (Inferential 43, Literal 14, Vocab-in-context 4). Set-bound — every RC passage carries multiple questions, all sharing the same source text. Answer in batch, not piecemeal.",
      "Read the passage ONCE, fast, for *structure* — what's the author claiming, what's the evidence, what's the counter, what's the example? Then answer questions in their order. Inferential questions need the structure; Literal questions need the surface text. Vocab-in-context questions need the surrounding 1–2 sentences only.",
      "The single biggest mistake students make: bringing outside knowledge. RC answers are 'what does THIS passage say' — not 'what's actually true about the topic'. If your answer requires knowledge from outside the passage, it's wrong.",
    ],
    subSkills: [
      {
        name: "Structure-first reading",
        description:
          "Identify claim, evidence, counter, example, conclusion. Mark them mentally — paragraph 1 (claim), 2 (evidence), 3 (counter), etc.",
      },
      {
        name: "Inference = follows necessarily from text",
        description:
          "An inference is what the text COMMITS the author to. If the text says 'most experts agree X', an inference is NOT 'all experts agree X'. Match the text's hedging exactly.",
      },
      {
        name: "Vocabulary in context — use the surrounding sentences",
        description:
          "Don't pick the dictionary first-definition of the word. Pick the meaning that fits THIS sentence and the surrounding paragraph.",
      },
    ],
    traps: [
      {
        name: "Outside-knowledge correct answer",
        description:
          "An option is factually true in the real world but not stated/implied by the passage. Wrong — the passage is the only source.",
      },
      {
        name: "Half-right with one inserted word",
        description:
          "An option matches the passage except for one inserted modifier — 'always' instead of 'often', 'all' instead of 'most'. Read carefully for these single-word shifts.",
      },
      {
        name: "True but irrelevant",
        description:
          "A statement that's clearly supported by the passage but doesn't answer the specific question asked.",
      },
    ],
    exampleQuestionIds: [
      "d257bf58-25cb-4a77-8384-ba5dfa0646fe", // HARD — inferential
    ],
    relatedSlugs: ["cloze-test", "sentence-rearrangement", "fill-in-the-blanks"],
  },

  "cloze-test": {
    trigger:
      "A short passage (5–10 sentences) with several blanks; pick the right word for each blank from 4 options per blank.",
    story: [
      "45 q, zero HARD across the bank. The easiest single playbook in NDA English. The skill is reading for *transition logic* — which discourse-relation does the next sentence have to the previous one?",
      "Most blanks are connectors (however/moreover/so/although/because) or one-word transitions (firstly, finally, instead, despite). The connector logic from the Grammar > Discourse Markers playbook applies directly here — same rules, same toolkit.",
      "Approach: read the entire passage once with blanks ignored, to get the gist. Then fill blanks in order — each blank's correct answer is partly constrained by what came before AND by what comes after. Don't rush to fill the first blank without reading the rest.",
    ],
    subSkills: [
      {
        name: "Use the surrounding 2 sentences",
        description:
          "Each blank's right answer is determined by the sentence before AND the sentence after. Always read both.",
      },
      {
        name: "Discourse-relation toolkit",
        description:
          "Same logic-mapping as Grammar > Connectors. Contrast (however/but), addition (moreover/furthermore), cause (so/therefore), effect (because/since).",
      },
    ],
    traps: [
      {
        name: "Local-fit but global-mismatch word",
        description:
          "An option that fits the local sentence's grammar but contradicts the passage's overall claim. Always verify against the passage gist.",
      },
    ],
    exampleQuestionIds: [
      "baf07fe6-4fbb-419e-befa-cb18bc5ad6fd", // EASY — cloze passage opener
    ],
    relatedSlugs: [
      "grammar-discourse-markers-and-connectors",
      "fill-in-the-blanks",
      "sentence-rearrangement",
    ],
  },

  "sentence-rearrangement": {
    trigger:
      "4 sentence-parts (P/Q/R/S) inside one sentence, OR 4 middle sentences (P/Q/R/S) between a fixed S1 opener and S6 closer; arrange them.",
    story: [
      "114 q. The single hardest chapter in NDA English by load (22% HARD overall, Paragraph Sequencing at 36% HARD). PQRS (92 q) reorders 4 phrase-parts inside one sentence; S1–S6 (22 q) reorders 4 middle sentences in a fixed-opener-fixed-closer paragraph. Same lever for both — find the opener-cue and the closer-cue, then chain the rest by transition logic.",
      "Opener cues: noun without referring pronoun (a name, a topic-setting NP), a definitional or framing statement. Closer cues: 'thus', 'so', conclusion words, a generalisation that the body sets up. Middle pieces chain by transition words (However, Moreover, Therefore) and by repeated noun/pronoun reference (Sentence X uses 'it' → must follow a sentence that introduces the noun).",
      "Most students try to solve from the start. Try from the END: which sentence has 'thus' or 'therefore' or sums up? That's S5/S6 territory. Which sentence introduces a fresh noun? That's S1/S2. Pinning the boundaries shrinks the middle to a forced sequence.",
    ],
    subSkills: [
      {
        name: "Pin the opener — find the fresh noun",
        description:
          "S1 (or P, in PQRS) introduces a fresh noun without a referring pronoun. Pronouns (it/this/that) refer backwards, so they cannot start.",
      },
      {
        name: "Pin the closer — find the generalisation",
        description:
          "S6 (or last) often contains 'thus', 'so', 'therefore', 'in conclusion', or a generalising claim. Solve from the back if the front is unclear.",
      },
      {
        name: "Use transition + pronoun chains",
        description:
          "'However' starts a contrasting sentence — only after a contrasting claim. 'It' refers to the most-recent same-gender singular noun. Chain by these constraints.",
      },
    ],
    traps: [
      {
        name: "Plausible sentence-start that's actually middle",
        description:
          "A sentence with 'this' or 'however' looks like it could open. It can't — these reference back. Always check for backward-reference.",
      },
      {
        name: "Two-near-identical option orderings",
        description:
          "Often 2 of 4 options differ in just one swap (PRSQ vs PRQS). The hardest distinction — usually decided by a single transition word.",
      },
    ],
    exampleQuestionIds: [
      "b9ab6118-ad1b-471b-bae4-bf2ae518c44d", // HARD — PQRS aquatic ecology
      "1735953a-0e84-4846-ab8f-65c5becbfeb0", // HARD — S1-S6 South African Constitution
    ],
    relatedSlugs: ["cloze-test", "grammar-discourse-markers-and-connectors", "reading-comprehension"],
  },

  "fill-in-the-blanks": {
    trigger:
      "A single sentence with one blank; pick the word that best fits.",
    story: [
      "55 q. Sentence-scoped (vs Cloze's passage scope). Two flavours: Contextual (45 q — vocab/collocation in the blank) and Phrasal Verbs/Collocations (10 q — fixed phrasal verbs: look up, get over, take after, run into).",
      "Contextual blanks reward vocabulary breadth — same word families as the Vocab Synonyms playbook. The difference: FIB constrains the answer by sentence grammar (the blank's part of speech is fixed by the surrounding words), so options that don't fit grammatically are eliminable first.",
      "Phrasal Verbs reward memorising the standard ~50 phrasal verbs (look up/down/into/forward to/after; get up/over/by/around; take after/up/on/in). Idiom-style fixed phrases — there's no rule, only recognition.",
    ],
    subSkills: [
      {
        name: "Eliminate by part of speech first",
        description:
          "If the blank is followed by 'a' + noun, the blank is a verb or adjective — options that are nouns can be dropped immediately.",
      },
      {
        name: "Vocabulary breadth (Synonyms playbook word families)",
        description:
          "Most Contextual FIB blanks pick from the same word pool as Synonyms. Familiarity with the 13 vocab families pays double here.",
      },
      {
        name: "Phrasal-verb pattern recognition",
        description:
          "Memorise the standard 50 phrasal verbs and their meanings. 'Take after' (resemble) vs 'take up' (start hobby) vs 'take in' (deceive or absorb). Same root, very different meanings.",
      },
    ],
    traps: [
      {
        name: "Plausible word, wrong register",
        description:
          "A word that fits meaning but breaks formality. Formal stems take 'commence', not 'start' or 'kick off'.",
      },
      {
        name: "Near-collocation that doesn't pair",
        description:
          "'Do business' is correct; 'make business' is wrong. 'Take a decision' (IndE) vs 'make a decision' (BrE/AmE) — NDA usually accepts both.",
      },
    ],
    exampleQuestionIds: [
      "cf7e29f5-7d7c-45c2-ae64-03c6c0c8aa28", // EASY — monsoon FIB
    ],
    relatedSlugs: ["cloze-test", "vocab-synonyms", "grammar-discourse-markers-and-connectors"],
  },
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
