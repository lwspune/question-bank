/**
 * Content for /guide/nda-english/vocab-families.
 *
 * The 13 thematic groupings of words actually tested in the live bank's
 * Synonyms + Antonyms subtopics (2017–2026). 270 underlined words extracted
 * via regex against `\(\underline{\text{WORD}}\)` markup, then editorially
 * clustered by meaning-family.
 *
 * Honest framing: words DON'T REPEAT across years (only 5 stems repeated in
 * 10 years). So this isn't a "memorise these to predict next year's words"
 * list — it's a "recognise these families so you can lookup an unfamiliar
 * word fast" list. The families are stable; the specific words rotate.
 *
 * Words from the Synonyms subtopic appear in (S); Antonyms in (A); when a
 * word tested in both, both letters.
 *
 * Refresh trigger: when new uploads land, re-run the SQL probe in
 * scripts/extract-vocab-words.ts (or in chat) and add new families' words to
 * the relevant cluster. New patterns can spawn new families.
 */

export type VocabWord = {
  word: string;
  /** Bank-side context — which subtopic(s) this word has appeared in. */
  sources: ("S" | "A")[];
  /** Editorial gloss — the most-tested sense of the word. */
  gloss: string;
};

export type VocabFamily = {
  /** Stable URL anchor — used as <section id> on the page. */
  slug: string;
  /** Display name. */
  name: string;
  /** One-line "what binds these words". */
  theme: string;
  /** The pedagogical note — why this family matters for NDA. */
  note: string;
  words: VocabWord[];
};

export const VOCAB_FAMILIES: VocabFamily[] = [
  // ─────── 1. Praise / virtue / good character ───────
  {
    slug: "praise-virtue",
    name: "Praise, virtue, good character",
    theme: "Positive moral / aspirational vocabulary.",
    note:
      "On Synonyms, the wrong option is often a near-virtue from a different axis (humble vs honest). On Antonyms, the wrong option is the same-axis milder word (good vs bad — pick 'evil' not 'mean').",
    words: [
      { word: "candid", sources: ["S"], gloss: "frank, open, honest" },
      { word: "benevolent", sources: ["A"], gloss: "kind, generous (opp: hostile, malevolent)" },
      { word: "laudable", sources: ["S"], gloss: "praiseworthy" },
      { word: "praiseworthy", sources: ["A"], gloss: "deserving praise (opp: deplorable)" },
      { word: "righteousness", sources: ["A"], gloss: "moral integrity (opp: wickedness)" },
      { word: "integrity", sources: ["A"], gloss: "honesty, moral wholeness" },
      { word: "generous", sources: ["A"], gloss: "giving freely (opp: miserly)" },
      { word: "diligent", sources: ["S"], gloss: "hardworking, careful" },
      { word: "industrious", sources: ["A"], gloss: "hardworking (opp: idle, indolent)" },
      { word: "meticulous", sources: ["S"], gloss: "carefully precise" },
      { word: "competent", sources: ["S"], gloss: "capable, skilled" },
      { word: "conscientiously", sources: ["A"], gloss: "carefully, thoroughly (opp: carelessly)" },
    ],
  },

  // ─────── 2. Greed / excess / extravagance ───────
  {
    slug: "excess-extravagance",
    name: "Greed, excess, extravagance",
    theme: "Over-doing, over-spending, over-showing.",
    note:
      "NDA frequently tests prodigal, ostentatious, lavish, squander. All sit on the same 'too-much' axis. Antonym is almost always thrifty/frugal/restrained.",
    words: [
      { word: "prodigal", sources: ["A"], gloss: "wastefully extravagant (opp: thrifty)" },
      { word: "ostentatious", sources: ["A"], gloss: "showy, intended to impress (opp: modest)" },
      { word: "lavishly", sources: ["S"], gloss: "abundantly, extravagantly" },
      { word: "squander", sources: ["A"], gloss: "waste recklessly (opp: save, conserve)" },
      { word: "indolence", sources: ["S"], gloss: "laziness" },
      { word: "inordinate", sources: ["S"], gloss: "excessive, beyond reasonable" },
      { word: "audacity", sources: ["A"], gloss: "boldness, often impertinent (opp: timidity)" },
      { word: "audaciousness", sources: ["A"], gloss: "boldness, daring (opp: timidity)" },
    ],
  },

  // ─────── 3. Cleverness / wit / insight ───────
  {
    slug: "cleverness-insight",
    name: "Cleverness, wit, insight",
    theme: "Mental sharpness — perceptive, shrewd, quick-witted.",
    note:
      "The 'perspicacity', 'sagacity', 'acumen' triplet has all been tested. They overlap heavily; on Synonyms, the right answer is usually 'insight' or 'discernment'.",
    words: [
      { word: "acumen", sources: ["S"], gloss: "sharp judgment, insight" },
      { word: "perspicacity", sources: ["A"], gloss: "keenness of insight (opp: obtuseness)" },
      { word: "sagacity", sources: ["S"], gloss: "wisdom, shrewdness" },
      { word: "candid", sources: ["S"], gloss: "frank, plainspoken" },
      { word: "incisive", sources: ["A"], gloss: "sharp, penetrating (opp: dull)" },
      { word: "dynamic", sources: ["S"], gloss: "energetic, active" },
      { word: "captious", sources: ["S"], gloss: "fault-finding, hard-to-please" },
    ],
  },

  // ─────── 4. Deceit / dishonesty / malice ───────
  {
    slug: "deceit-malice",
    name: "Deceit, dishonesty, malice",
    theme: "Negative-character vocabulary — sneaky, harmful, untrustworthy.",
    note:
      "On Synonyms here, options often include 'cunning' and 'sneaky' as decoys for 'insidious' (which is more 'subtly harmful'). Read the register — insidious is formal/serious.",
    words: [
      { word: "disingenuous", sources: ["A"], gloss: "dishonest, insincere (opp: candid)" },
      { word: "dubious", sources: ["A"], gloss: "doubtful, questionable (opp: trustworthy)" },
      { word: "insidious", sources: ["S"], gloss: "subtly harmful, stealthy" },
      { word: "sycophancy", sources: ["S"], gloss: "obsequious flattery" },
      { word: "slanderous", sources: ["S"], gloss: "spreading false damaging statements" },
      { word: "maleficent", sources: ["S"], gloss: "doing harm, evil" },
      { word: "malign", sources: ["S"], gloss: "speak harmfully about" },
      { word: "vitriolic", sources: ["S"], gloss: "bitter, scathing" },
      { word: "clandestine", sources: ["A"], gloss: "secret, often illicit (opp: open)" },
      { word: "counterfeit", sources: ["S"], gloss: "fake, forged" },
      { word: "biased", sources: ["A"], gloss: "prejudiced (opp: impartial)" },
      { word: "cunning", sources: ["S"], gloss: "crafty, sly" },
    ],
  },

  // ─────── 5. Hardship / suffering / hard work ───────
  {
    slug: "hardship-suffering",
    name: "Hardship, suffering, arduous work",
    theme: "Difficult / painful experience.",
    note:
      "All these cluster around 'hard' or 'painful'. Watch for register — arduous and onerous are formal; gruelling/hapless are slightly more conversational.",
    words: [
      { word: "arduous", sources: ["A"], gloss: "extremely difficult (opp: easy)" },
      { word: "excruciating", sources: ["A"], gloss: "intensely painful (opp: pleasant)" },
      { word: "onerous", sources: ["S"], gloss: "burdensome, demanding" },
      { word: "gruelling", sources: ["S"], gloss: "exhausting, demanding" },
      { word: "calamitous", sources: ["S"], gloss: "disastrous" },
      { word: "hapless", sources: ["A"], gloss: "unlucky (opp: fortunate)" },
      { word: "miseries", sources: ["S"], gloss: "great sufferings" },
      { word: "deplorable", sources: ["A"], gloss: "shocking, contemptible (opp: praiseworthy)" },
      { word: "holocaust", sources: ["S"], gloss: "great destruction" },
    ],
  },

  // ─────── 6. Anger / displeasure ───────
  {
    slug: "anger-displeasure",
    name: "Anger, displeasure, strong negative emotion",
    theme: "Vehement / irritated / hostile feelings.",
    note:
      "Vehement is the trickiest — students often confuse it with violent (which is action, not emotion).",
    words: [
      { word: "vehement", sources: ["A"], gloss: "showing strong feeling (opp: mild)" },
      { word: "vexed", sources: ["S"], gloss: "annoyed, frustrated" },
      { word: "repulsive", sources: ["A"], gloss: "causing disgust (opp: attractive)" },
      { word: "hostility", sources: ["A"], gloss: "unfriendliness (opp: friendliness)" },
      { word: "morose", sources: ["S"], gloss: "sullen, gloomy" },
      { word: "obdurate", sources: ["A"], gloss: "stubbornly resistant (opp: flexible)" },
      { word: "obstinate", sources: ["A"], gloss: "stubborn (opp: yielding)" },
      { word: "perplexed", sources: ["A"], gloss: "puzzled (opp: clear)" },
    ],
  },

  // ─────── 7. Doubt / uncertainty / vagueness ───────
  {
    slug: "doubt-uncertainty",
    name: "Doubt, uncertainty, ambiguity",
    theme: "Lack of clarity or commitment.",
    note:
      "On Synonyms, distractors often include words like 'wavering' or 'hesitant' — close but not quite right.",
    words: [
      { word: "ambiguous", sources: ["S"], gloss: "open to multiple interpretations" },
      { word: "dubious", sources: ["A"], gloss: "doubtful, suspicious" },
      { word: "sceptical", sources: ["S"], gloss: "doubting" },
      { word: "fickle", sources: ["A", "S"], gloss: "changeable, inconstant" },
      { word: "vague", sources: ["A"], gloss: "indistinct, unclear (opp: precise)" },
      { word: "reticent", sources: ["S"], gloss: "reserved, reluctant to speak" },
    ],
  },

  // ─────── 8. Abundance / vastness / fullness ───────
  {
    slug: "abundance-vastness",
    name: "Abundance, vastness, fullness",
    theme: "Large quantity / size / extent.",
    note:
      "Antonyms in this cluster ALWAYS pair with the scarcity family (next).",
    words: [
      { word: "abundant", sources: ["S"], gloss: "plentiful" },
      { word: "boundless", sources: ["A"], gloss: "limitless (opp: finite)" },
      { word: "plenitude", sources: ["A"], gloss: "abundance (opp: scarcity)" },
      { word: "plenty", sources: ["A"], gloss: "abundance" },
      { word: "monumental", sources: ["A"], gloss: "of enormous size" },
      { word: "gigantic", sources: ["S"], gloss: "huge" },
      { word: "massive", sources: ["S"], gloss: "very large" },
      { word: "huge", sources: ["A"], gloss: "very large (opp: tiny)" },
      { word: "bounty", sources: ["S"], gloss: "generous gift; abundance" },
      { word: "inordinate", sources: ["S"], gloss: "excessive in amount" },
    ],
  },

  // ─────── 9. Scarcity / weakness / lacking ───────
  {
    slug: "scarcity-weakness",
    name: "Scarcity, weakness, lacking",
    theme: "Low quantity / energy / capacity.",
    note:
      "Pairs systematically with the abundance family. The wrong option in either direction often comes from the same family but at the wrong magnitude.",
    words: [
      { word: "indigent", sources: ["S"], gloss: "very poor" },
      { word: "broke", sources: ["S"], gloss: "having no money (informal)" },
      { word: "frail", sources: ["A"], gloss: "weak, fragile (opp: robust)" },
      { word: "parched", sources: ["A"], gloss: "very dry (opp: drenched)" },
      { word: "exhausted", sources: ["S"], gloss: "drained, worn out" },
      { word: "listless", sources: ["A"], gloss: "lacking energy (opp: energetic)" },
      { word: "microscopic", sources: ["A"], gloss: "extremely small (opp: huge)" },
      { word: "minute", sources: ["S"], gloss: "very small" },
    ],
  },

  // ─────── 10. Transient / brief / sudden ───────
  {
    slug: "transient-brief",
    name: "Transient, brief, sudden",
    theme: "Things that pass quickly or happen suddenly.",
    note:
      "Three closely-related words: transient (passing), instantaneous (immediate), imminent (about to happen). Confusing them is the cluster's trap.",
    words: [
      { word: "transient", sources: ["A"], gloss: "short-lived (opp: permanent)" },
      { word: "instantaneous", sources: ["S"], gloss: "occurring immediately" },
      { word: "imminent", sources: ["S"], gloss: "about to happen" },
      { word: "fickle", sources: ["A", "S"], gloss: "changeable, inconstant" },
      { word: "opportune", sources: ["S"], gloss: "well-timed" },
      { word: "concurrent", sources: ["A"], gloss: "happening at the same time (opp: successive)" },
    ],
  },

  // ─────── 11. Courage / steadfastness / perseverance ───────
  {
    slug: "courage-perseverance",
    name: "Courage, steadfastness, perseverance",
    theme: "Strength under pressure — physical, mental, moral.",
    note:
      "Antonym set here often points to cowardly, weak, or yielding.",
    words: [
      { word: "persevere", sources: ["A"], gloss: "persist despite difficulty (opp: give up)" },
      { word: "fortify", sources: ["A"], gloss: "strengthen (opp: weaken)" },
      { word: "brave", sources: ["A"], gloss: "courageous (opp: cowardly)" },
      { word: "intrepid", sources: ["S"], gloss: "fearless" },
      { word: "stubborn", sources: ["S"], gloss: "obstinate, unyielding" },
      { word: "obdurate", sources: ["A"], gloss: "stubbornly resistant" },
      { word: "confident", sources: ["A"], gloss: "self-assured (opp: doubtful)" },
      { word: "confidence", sources: ["A"], gloss: "self-assurance" },
    ],
  },

  // ─────── 12. Unusual / non-conformist / eccentric ───────
  {
    slug: "unusual-nonconformist",
    name: "Unusual, eccentric, non-conformist",
    theme: "Diverging from norm — by behaviour, opinion, or origin.",
    note:
      "'Orthodox' is the anchor opposite for several words here. On its Antonym, options often offer 'progressive' (correct), 'modern' (close), 'radical' (different magnitude).",
    words: [
      { word: "eccentric", sources: ["A"], gloss: "unconventional (opp: conventional)" },
      { word: "orthodox", sources: ["A"], gloss: "conforming to established belief (opp: unorthodox)" },
      { word: "indigenous", sources: ["A"], gloss: "native to a place (opp: foreign)" },
      { word: "dissident", sources: ["A"], gloss: "person who opposes official policy" },
      { word: "dogmatic", sources: ["A"], gloss: "asserting opinions as absolutely true" },
      { word: "clandestine", sources: ["A"], gloss: "secret, hidden" },
      { word: "lopsided", sources: ["A"], gloss: "uneven (opp: balanced)" },
      { word: "lowbrow", sources: ["S"], gloss: "not intellectual" },
    ],
  },

  // ─────── 13. Confusable word pairs (PYQ-tested family) ───────
  {
    slug: "confusable-pairs",
    name: "Confusable pairs (the affect/effect cluster)",
    theme: "Pairs of look-alike words with distinct meanings.",
    note:
      "Almost every NDA Vocabulary Confusable-Pairs question and many WCPP errors come from this cluster. Memorise the ~30 standard pairs and write one sentence using each side correctly. The cluster also rotates through the Word Definition subtopic.",
    words: [
      { word: "confident / confidant", sources: ["S"], gloss: "self-assured / trusted friend" },
      { word: "affect / effect", sources: ["S"], gloss: "(v) influence / (n) result; or (v rare) bring about" },
      { word: "accept / except", sources: ["S"], gloss: "receive / exclude" },
      { word: "principle / principal", sources: ["S"], gloss: "rule / head, chief" },
      { word: "complement / compliment", sources: ["S"], gloss: "complete / praise" },
      { word: "stationary / stationery", sources: ["S"], gloss: "not moving / writing materials" },
      { word: "discreet / discrete", sources: ["S"], gloss: "careful / separate" },
      { word: "elicit / illicit", sources: ["S"], gloss: "draw out / illegal" },
      { word: "allusion / illusion", sources: ["S"], gloss: "reference / false belief" },
      { word: "imminent / eminent", sources: ["S"], gloss: "about-to-happen / distinguished" },
      { word: "indelible / inedible", sources: ["S"], gloss: "permanent / not edible" },
      { word: "ascent / assent", sources: ["S"], gloss: "climb / agreement" },
    ],
  },
];

export const VOCAB_FAMILY_SLUGS = VOCAB_FAMILIES.map((f) => f.slug);

export const VOCAB_FAMILY_STATS = {
  families: VOCAB_FAMILIES.length,
  totalWords: VOCAB_FAMILIES.reduce((s, f) => s + f.words.length, 0),
  /** Live PYQ-tested word count (the regex matched 270 stems; the families
   *  here are a representative sample, not the full list). */
  bankTested: 270,
};
