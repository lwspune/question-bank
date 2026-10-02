import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ANT_METHOD_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: Method",
  title: "Antonyms: how to find the opposite",
  oneLineDefinition:
    "Fix the word's meaning and its charge, strike the options that mean the same, then pick the one option that runs the other way.",
  whyItMatters:
    "Most CDS English papers carry a block of antonym items, usually ten, each a single word underlined in a sentence. " +
    "The words rarely repeat from paper to paper, so a word list alone will not carry you. " +
    "The same few checks settle almost every item, and they also protect you from the traps the options are built around.",
  concepts: [
    // C1 — strike the three lookalikes
    {
      kind: "formula" as const,
      slug: "cdsenant-elim",
      name: "Strike out the three lookalikes",
      intuition:
        "An antonym item is a synonym item turned round. The examiner usually fills three options with words that MEAN THE SAME as the underlined word, because a hurried reader ticks the first familiar match. " +
        "So find the three that agree and strike them together. The one left standing should point the other way.",
      definition:
        "- **Say the meaning** of the underlined word in two or three plain words, using the sentence.\n" +
        "- **Name its charge.** Most words lean one way: **positive** (good, pleasant, approving: friendly, brave) or **negative** (bad, unpleasant, disapproving: hostile, cowardly). A neutral word has a **direction** instead: big or small, start or stop, join or split.\n" +
        "- **Reverse it.** The antonym has the opposite charge or direction, and it is about the same idea.\n" +
        "- **Strike the lookalikes.** If three options mean the same as the word, or the same as each other, none of them can be the single answer. Strike all three.\n" +
        "- **Check the survivor** in the sentence: it should turn the meaning of the sentence round.\n" +
        "**Words met in this pattern:**\n" +
        "- **soggy** (wet through) → dry · 2018 (II)\n" +
        "- **fanatical** (extreme and intolerant in belief) → moderate · 2018 (I)\n" +
        "- **ephemeral** (lasting a very short time) → everlasting · 2026 (I)\n" +
        "- **belligerent** (hostile, eager to fight) → amiable · 2024 (II)\n" +
        "- **mutinous** (rebelling against authority) → obedient · 2024 (II)\n" +
        "- **brevity** (shortness, using few words) → verbosity · 2023 (I)",
      authoredExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. They lived in an \\(\\underline{\\text{opulent}}\\) house. (a) lavish (b) luxurious (c) shabby (d) sumptuous",
        steps: [
          "Meaning: 'opulent' means rich and costly to look at.",
          "Charge: positive (wealth, comfort). So the antonym must be negative: poor, cheap, run-down.",
          "Lavish, luxurious and sumptuous all mean rich and costly. Three options that agree cannot hold the single answer, so strike all three.",
          "Shabby (worn out, run-down) is left. It has the opposite charge and is about the same idea: how the house looks.",
        ],
        answer: "(c) shabby",
      },
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. He gave a \\(\\underline{\\text{candid}}\\) account of his failures. (a) frank (b) evasive (c) open (d) forthright",
        steps: [
          "Meaning: 'candid' means honest and open.",
          "Charge: positive. The antonym must be negative: hiding the truth.",
          "Frank, open and forthright all mean honest: strike them.",
          "Evasive (avoiding the truth) is left, and it reverses the meaning.",
        ],
        answer: "(b) evasive",
      },
      practiceSet: [
        { prompt: "Opposite of 'lucid' (clear): (a) plain (b) muddled (c) intelligible (d) transparent", answer: "(b) muddled", method: "Plain, intelligible and transparent all mean clear." },
        { prompt: "Opposite of 'timid': (a) shy (b) meek (c) fearful (d) bold", answer: "(d) bold", method: "Three options mean easily scared." },
        { prompt: "Opposite of 'scarce': (a) rare (b) sparse (c) plentiful (d) meagre", answer: "(c) plentiful", method: "A direction word: few against many." },
        { prompt: "Opposite of 'diligent': (a) industrious (b) idle (c) assiduous (d) hard-working", answer: "(b) idle", method: "Three options mean hard-working." },
      ],
      pyqExampleId: "1e37911d-a2e0-4872-8e34-ffcf948e6678",
      traps: [
        {
          title: "Different is not opposite",
          body:
            "An option can have nothing to do with the word without being its opposite. For 'soggy' (wet through), 'hot' is different, but 'dry' is the opposite. Ask: is this the **same idea, turned round**?",
        },
        {
          title: "Ticking the synonym out of habit",
          body:
            "The antonym block often comes straight after the synonym block, and the eye is still hunting for a match. The three same-meaning options are placed there for exactly that reader. Read the word **opposite** in the directions before you start the block.",
        },
      ],
    },

    // C2 — sense and part of speech
    {
      kind: "formula" as const,
      slug: "cdsenant-sense",
      name: "Match the sense and the part of speech",
      intuition:
        "The opposite has to fit the same slot in the sentence. If the underlined word is a noun, the answer is a noun; if it is a verb, the answer is a verb. " +
        "And a word with several meanings has only one meaning in this sentence. The answer must reverse that one.",
      definition:
        "- **Part of speech.** A **noun** names a thing or a quality (courage, scarcity). An **adjective** describes a noun (brave, scarce). A **verb** is an action (admit, delay). A **preposition** links words (during, barring). An -ing word can act as a noun (Swimming is fun).\n" +
        "- **Match the form.** Find the opposite idea first, then pick the option in the same part of speech. An option with the right idea in the wrong form is a deliberate trap.\n" +
        "- **Find the sense.** Ask which meaning the sentence uses. 'Particular' can mean 'one specific' or 'fussy about details'. 'Condensation' can mean 'vapour turning into water' or 'shortening a text'. Reverse only the meaning in front of you.\n" +
        "- **Specialist words keep their specialist sense.** In a medical sentence, 'benign' means 'not dangerous'. In a sentence about church and state, 'temporal' means 'worldly'.\n" +
        "**Words met in this pattern:**\n" +
        "- **activity** (noun: being busy and at work) → indolence · 2018 (I)\n" +
        "- **erudition** (noun: deep learning) → ignorance · 2017 (II)\n" +
        "- **ecclesiastical** (of the church) → temporal · 2017 (II)\n" +
        "- **condensation** (vapour turning into liquid) → evaporation · 2023 (II)\n" +
        "- **barring** (preposition: except) → including · 2020 (II)\n" +
        "- **contrary** (opposite to, against) → similar · 2021 (I)\n" +
        "- **particular** (fussy and exact about details) → vague · 2021 (II)\n" +
        "- **fuzzy** (of sound: blurred, unclear) → clear · 2026 (II)\n" +
        "- **mortiferous** (deadly) → benign · 2026 (II)\n" +
        "- **suitable** (fitting, right for the purpose) → impertinent · 2018 (I)\n" +
        "- **persuasion** (noun: convincing someone) → discouraging · 2021 (I)",
      authoredExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The \\(\\underline{\\text{scarcity}}\\) of water worried the villagers. (a) abundant (b) abundance (c) shortage (d) dearth",
        steps: [
          "Meaning: 'scarcity' means a shortage. The opposite idea is a large supply.",
          "Part of speech: 'the scarcity of water' shows that scarcity is a noun.",
          "Shortage and dearth mean the same as scarcity: strike them.",
          "Abundant and abundance both carry the right idea. Abundant is an adjective ('the abundant of water' is not English). Abundance is the noun.",
        ],
        answer: "(b) abundance",
      },
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The umpire was \\(\\underline{\\text{fair}}\\) to both teams. (a) dark (b) biased (c) just (d) light",
        steps: [
          "'Fair' has several meanings: just, light in colour, average.",
          "An umpire and two teams: the sentence uses the meaning 'just'.",
          "Dark is the opposite of the colour sense, so it answers the wrong question. Just is a synonym; light belongs to the colour sense.",
          "Biased reverses 'just'.",
        ],
        answer: "(b) biased",
      },
      practiceSet: [
        { prompt: "Opposite of the noun 'generosity': (a) stingy (b) meanness (c) kindness (d) liberal", answer: "(b) meanness", method: "Stingy has the idea but is an adjective." },
        { prompt: "Opposite of 'hard' in 'a hard question'", answer: "easy", method: "Not 'soft': that reverses the touch sense." },
        { prompt: "Opposite of 'admitted' in 'He admitted his mistake': (a) denial (b) denied (c) confessed (d) accepted", answer: "(b) denied", method: "A verb for a verb; denial is a noun." },
        { prompt: "Opposite of 'light' in 'a light suitcase'", answer: "heavy", method: "'Dark' reverses the colour sense, not the weight sense." },
      ],
      pyqExampleId: "0fd1b6d9-eb5a-43e3-a821-fd88efae09bd",
      traps: [
        {
          title: "Right idea, wrong form",
          body:
            "For the noun 'courage', 'cowardly' has the right idea but is an adjective; the noun 'cowardice' is the answer. Say your answer inside the sentence before you tick it. If it does not fit the slot, it is the trap.",
        },
        {
          title: "The everyday meaning is not always the tested one",
          body:
            "'I am very particular about it' means 'fussy about details', so the opposite is 'vague', not 'general'. And 'impertinent' today usually means 'rude', but its older sense is 'not pertinent, not fitting', which is how it can be the opposite of 'suitable'.",
        },
        {
          title: "Prepositions have opposites too",
          body:
            "'Barring' means 'except'. Its opposite is 'including'. Options like 'excepting' and 'excluding' mean the same as 'barring', so they go first.",
        },
      ],
    },

    // C3 — prefixes and roots
    {
      kind: "formula" as const,
      slug: "cdsenant-prefix",
      name: "Opposites built from prefixes and roots",
      intuition:
        "Many English words are built from parts. A **prefix** sits at the front and changes the meaning; a **root** carries the core idea. " +
        "Some prefixes simply say 'not'. Others come in pairs that point opposite ways. Spot the part, flip it, and you often have the antonym.",
      definition:
        "- **'Not' prefixes:** un- (unkind), in- (inactive), im- before b, m, p (impatient), il- before l (illegal), ir- before r (irregular), dis- (dishonest), non- (non-stop).\n" +
        "- **Paired prefixes:** in-/im- 'into' against ex- 'out of' (import, export); sub- 'under' against super- 'above'; pre- 'before' against post- 'after'; over- against under-; bene- 'well' against mal- 'badly'.\n" +
        "- **Paired roots:** mis- 'hate' against phil- 'love' (with anthrop 'mankind': misanthrope, philanthropist); ascend against descend; include against exclude.\n" +
        "- **Removing** a 'not' prefix gives the opposite only if the plain word is offered. If it is not, look for a word that means the plain word.\n" +
        "- **Check the meaning** before you trust the shape. Some prefixes do not mean 'not' at all (see the traps).\n" +
        "**Words met in this pattern:**\n" +
        "- **misanthropic** (hating mankind) → philanthropic · 2019 (I)\n" +
        "- **readable** (easy to read) → illegible · 2019 (I)\n" +
        "- **vital** (essential, very important) → inessential · 2019 (I)\n" +
        "- **efficacy** (power to produce the intended result) → inefficiency · 2018 (II)\n" +
        "- **dissuaded** (advised not to do something) → persuaded · 2020 (II)\n" +
        "- **discontinued** (stopped) → resumed · 2022 (I)\n" +
        "- **discord** (disagreement; here, to disagree with) → accord · 2019 (II)",
      authoredExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The country has to \\(\\underline{\\text{import}}\\) most of its oil. (a) bring in (b) export (c) purchase (d) transport",
        steps: [
          "Split the word: im- 'into' + port 'carry'. To import is to carry goods into a country.",
          "Flip the prefix: ex- 'out of' + port gives export, carrying goods out.",
          "Check the options: 'bring in' is a synonym; purchase and transport are different, not opposite.",
          "Export reverses the direction and keeps the same idea.",
        ],
        answer: "(b) export",
      },
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The officer praised his \\(\\underline{\\text{subordinate}}\\). (a) junior (b) assistant (c) superior (d) deputy",
        steps: [
          "Split the word: sub- 'under' + ordinate 'ranked'. A subordinate is ranked under you.",
          "Flip the prefix: super- 'above' gives superior, one ranked above.",
          "Junior, assistant and deputy all describe someone lower: strike them.",
        ],
        answer: "(c) superior",
      },
      practiceSet: [
        { prompt: "Opposite of 'ascend'", answer: "descend", method: "de- 'down'." },
        { prompt: "Opposite of 'include'", answer: "exclude", method: "in- 'in' against ex- 'out'." },
        { prompt: "Opposite of 'overestimate'", answer: "underestimate", method: "over- against under-." },
        { prompt: "Opposite of 'precede' (come before)", answer: "follow (or succeed)", method: "pre- 'before'; the opposite is 'come after'." },
      ],
      pyqExampleId: "9b3d7f9f-0568-44aa-8fe4-3286e5bad1b3",
      traps: [
        {
          title: "Not every in- means 'not'",
          body:
            "'Inflammable' means 'burns easily', the same as 'flammable'. 'Invaluable' means 'priceless', so its opposite is 'worthless', not 'valuable'. 'Infamous' means 'famous for something bad'. Check the meaning before you flip the prefix.",
        },
        {
          title: "The opposite may carry no prefix at all",
          body:
            "For 'discontinued', the plain word 'continued' may not be offered. Then look for a word that means it: 'resumed'. For 'dissuaded', the answer is 'persuaded', a different word with the opposite pull.",
        },
        {
          title: "The near-twin that looks safe",
          body:
            "For 'efficacy' (the power to work), 'efficiency' and 'effectiveness' look and feel close to it. They are near-synonyms, so they go. The 'not' form, 'inefficiency', is the opposite.",
        },
      ],
    },

    // C4 — sound-alike and look-alike traps
    {
      kind: "reference" as const,
      slug: "cdsenant-trap",
      name: "Sound-alike and look-alike traps",
      intuition:
        "Some options are there because they LOOK or SOUND like the underlined word, not because they mean anything close to it. A reader who goes by shape picks them. " +
        "In an antonym item a look-alike is almost never the answer: settle what it means, and it falls out.",
      definition:
        "Three kinds of decoy:\n" +
        "- **Sound-alikes:** words that share most of their letters with the tested word or the answer (precarious, precious; impervious, imperious).\n" +
        "- **False splits:** an option built from a wrong break-up of the word (hoodwinked read as 'hook'; ensuing read as 'en suite').\n" +
        "- **Near-twins of the answer:** two options a few letters apart (purposely, purposively). Only one is the everyday opposite.\n" +
        "Rule: if you cannot say what an option means, do not pick it because it looks familiar.",
      table: {
        columns: ["Word", "Meaning", "Opposite", "Look-alike decoy", "Sitting"],
        rows: [
          { cells: ["vulnerable", "easily hurt or harmed", "impervious", "imperious: proud and bossy", "2019 (II)"], pyqExampleId: "4519eefc-b38a-462a-a033-d7e01e445385" },
          { cells: ["precarious", "uncertain, insecure", "stable", "precious: valuable; precipitous: very steep", "2026 (II)"], pyqExampleId: "34905918-e23b-4f2b-827c-e64cfb851ba0" },
          { cells: ["hoodwinked", "tricked", "disabused", "unhooked: freed from a hook", "2026 (II)"], pyqExampleId: "c2f66489-2f1d-4863-a56a-0c96e71676b5" },
          { cells: ["ensuing", "coming after, following", "retrospective", "en suite: of a room, with its own bathroom", "2020 (II)"], pyqExampleId: "f646fc01-f29d-4801-9b30-24cd5b5ccce7" },
          { cells: ["inadvertently", "by accident, without meaning to", "purposely", "purposively: with a definite aim", "2018 (II)"], pyqExampleId: "4830d7a2-ce50-430f-86d2-3c3fc230ea37" },
        ],
        caption: "Each decoy shares letters or sounds with the word or the answer, but its meaning is unrelated.",
      },
      pyqExampleId: "34905918-e23b-4f2b-827c-e64cfb851ba0",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. He was an \\(\\underline{\\text{eminent}}\\) scientist. (a) imminent (b) unknown (c) renowned (d) distinguished",
        steps: [
          "Meaning: 'eminent' means famous and respected.",
          "Renowned and distinguished are synonyms: strike them.",
          "Imminent sounds like eminent but means 'about to happen'. It is a sound-alike.",
          "Unknown reverses 'famous'.",
        ],
        answer: "(b) unknown",
      },
      practiceSet: [
        { prompt: "Opposite of 'credible' (believable)? Not 'creditable'.", answer: "unbelievable", method: "Creditable means 'deserving praise': a look-alike." },
        { prompt: "Opposite of 'ingenuous' (innocent, frank)? Not 'ingenious'.", answer: "cunning (or artful)", method: "Ingenious means 'clever at inventing'." },
        { prompt: "Opposite of 'judicious' (wise)? Not 'judicial'.", answer: "foolish", method: "Judicial means 'of a court or judge'." },
      ],
      traps: [
        {
          title: "A familiar shape feels safe",
          body:
            "When the tested word is hard, the option that looks most like it feels like a link to grab. It is usually a stranger with a similar spelling. Pick an option only when you can say what it means.",
        },
        {
          title: "A look-alike can sit beside real synonyms",
          body:
            "For 'vulnerable' (easily hurt), 'helpless' and 'defenceless' are synonyms and 'imperious' is a look-alike. Only 'impervious' (cannot be harmed) reverses it. Strike the synonyms, then the look-alike, and check what is left.",
        },
      ],
    },
  ],
};
