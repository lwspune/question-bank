import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_SPELLING_NOTE: SubtopicNote = {
  subtopicName: "Spelling",
  title: "Spelling: double letters, silent letters and vowel traps",
  oneLineDefinition:
    "Four spellings of one word, three of them wrong. Check the double letters, the silent Greek letters and the vowels in the middle, in that order.",
  whyItMatters:
    "Spelling items came as a block in the 2019 (II) and 2020 papers. The words are ones every officer writes: commissioner, strategy, accommodate. " +
    "The wrong options fail in a few fixed ways, so a three-point check catches almost all of them.",
  concepts: [
    // C1 — double letters
    {
      kind: "formula" as const,
      slug: "cdsenwd-doubles",
      name: "Count the double letters",
      intuition:
        "Most spelling items turn on a **double consonant**: two of the same consonant side by side (cc, mm, ss). The wrong options drop one of the pair, or double the wrong letter. " +
        "So count the doubles first. It is the fastest check and it removes most options.",
      definition:
        "The method:\n" +
        "- Say the word in syllables: em-bar-rass-ment.\n" +
        "- At each syllable, ask whether the consonant is doubled.\n" +
        "- Strike every option with too few or too many doubles.\n" +
        "- Between the survivors, check the vowels (see the third concept on this page).\n" +
        "Words tested, with their doubles:\n" +
        "- 2019 (II): **accommodate** (cc and mm), **recommend** (one c, mm), **aggressive** (gg and ss), **assassination** (ss and ss), **embarrassment** (rr and ss).\n" +
        "- 2020 (I): **commissioner** (mm and ss), **supplementary** (pp, ending -ary), **vacuum** (uu, a double vowel).\n" +
        "- 2020 (II): **snobbery** (bb), **etiquette** (tt, ending -ette).",
      authoredExample: {
        prompt: "Choose the correctly spelt word. (a) Comittee (b) Committe (c) Committee (d) Commitee",
        steps: [
          "Syllables: com-mit-tee.",
          "com-mit: the m is doubled, mm. Strike (a).",
          "mit-tee: the t is doubled, tt. Strike (d).",
          "The ending -tee has a double e. Strike (b).",
        ],
        answer: "(c) Committee: three doubles, mm, tt and ee.",
      },
      selfCheckExample: {
        prompt: "Choose the correctly spelt word. (a) Occurence (b) Occurrence (c) Ocurrence (d) Occurrance",
        steps: [
          "Syllables: oc-cur-rence.",
          "cc at the start: strike (c).",
          "rr in the middle, because occur doubles the r before -ence: strike (a).",
          "The ending is -ence, not -ance: strike (d).",
        ],
        answer: "(b) Occurrence.",
      },
      practiceSet: [
        { prompt: "Millenium or millennium?", answer: "Millennium", method: "ll and nn: mille (thousand) + annus (year)" },
        { prompt: "Neccessary or necessary?", answer: "Necessary", method: "one c, two s" },
        { prompt: "Possession or posession?", answer: "Possession", method: "ss and ss" },
        { prompt: "Harrass or harass?", answer: "Harass", method: "one r, two s" },
      ],
      pyqExampleId: "6176e148-23d3-4023-8c87-0d48e1d3fc00",
      traps: [
        {
          title: "Recommend has one c",
          body:
            "**Accommodate** doubles both c and m, so students double both in **recommend** too. Recommend = re + commend: one c, two m.",
        },
        {
          title: "Harass is not like its neighbours",
          body:
            "**Harass** has one r and two s. Students double the r by analogy with words like arrest and arrange. Learn it as an exception.",
        },
        {
          title: "Doubles can be vowels",
          body:
            "**Vacuum** and **continuum** have a double u. Options such as 'vacum' or 'vacuem' fail because they drop or change the second u.",
        },
      ],
    },

    // C2 — Greek spellings and silent letters
    {
      kind: "reference" as const,
      slug: "cdsenwd-greek",
      name: "Greek spellings and silent letters (ps-, pn-, ph-)",
      intuition:
        "Many medical and scientific words come from Greek. They keep Greek letter groups that English does not say: a **silent letter** p in ps- and pn-, and ph for the f sound. " +
        "If a word names a science, a disease or a study, expect these letter groups.",
      definition:
        "Letter groups to expect:\n" +
        "- **ps-** at the start, p silent: psephology, pseudonym, psychology.\n" +
        "- **pn-** at the start, p silent: pneumonia (pneuma = breath, lung).\n" +
        "- **ph** for the f sound: nephrology (nephros = kidney), diphtheria.\n" +
        "- **eu** for the 'yoo' sound: pseudonym, pneumonia, neurosis.\n" +
        "- **-ology** = the study of; **-osis** = a condition.",
      table: {
        columns: ["Word", "Meaning", "Spelling point", "Sitting"],
        rows: [
          { cells: ["Psephology", "The study of elections and voting", "Silent p; ph for f", "2020 (I)"] },
          { cells: ["Nephrology", "The study of the kidneys", "ph for f; no u after Ne", "2020 (I)"] },
          { cells: ["Pseudonym", "A false name used by a writer", "Silent p; -eu-; -nym = name", "2020 (I)"] },
          { cells: ["Pneumonia", "An infection of the lungs", "Silent p; -eu-", "2020 (I)"] },
          { cells: ["Diphtheria", "A serious throat infection", "ph and then th", "2020 (II)"] },
          { cells: ["Neurosis", "A mental disorder marked by anxiety", "-eu-; ending -osis", "2020 (II)"] },
          { cells: ["Twelfth", "Coming after the eleventh", "Twelve turns its v into f: twel-f-th", "2020 (II)"] },
        ],
        caption: "Silent letters do not show in speech, so spell these from the meaning: pneuma (lung), pseudo (false), nephros (kidney).",
      },
      pyqExampleId: "ea840507-8bb7-4d74-a6c5-c694679cd8b2",
      selfCheckExample: {
        prompt: "Choose the correctly spelt word. (a) Rythm (b) Rhythm (c) Rhytm (d) Rhithm",
        steps: [
          "Greek rhythmos: the word keeps rh at the start and th before the m.",
          "(a) drops the h after r. (c) drops the h of th. (d) changes y to i.",
        ],
        answer: "(b) Rhythm.",
      },
      practiceSet: [
        { prompt: "Sychiatrist or psychiatrist?", answer: "Psychiatrist", method: "psych- = mind, silent p" },
        { prompt: "Flegm or phlegm?", answer: "Phlegm", method: "ph for f, silent g" },
        { prompt: "Physique or fysique?", answer: "Physique", method: "physi- = nature, body" },
        { prompt: "Spot the wrong spelling: psychology, nephrology, nuerosis.", answer: "Nuerosis. It is neurosis, with eu." },
      ],
      traps: [
        {
          title: "Dropping the silent letter",
          body:
            "Options like 'sephology' or 'sychology' spell the word as it sounds. The silent p is part of the word. If the word is medical or scientific, check the start for ps- or pn-.",
        },
        {
          title: "Ph followed by th",
          body:
            "**Diphtheria** has ph and then th. Students write 'diptheria' because they say it that way. Spell it as diph-the-ria.",
        },
        {
          title: "Twelfth keeps its f",
          body:
            "Twelve becomes **twelfth**, not 'twelth'. The f is weak in speech but must be written.",
        },
      ],
    },

    // C3 — vowel traps and word endings
    {
      kind: "reference" as const,
      slug: "cdsenwd-vowels",
      name: "Vowel traps and word endings",
      intuition:
        "Once the consonants are right, the wrong options change a vowel in the middle (stretegy) or the ending (magnificant). " +
        "The fix is to go back to the base word: argue gives argument, mountain gives mountainous, strata gives strategy.",
      definition:
        "Rules that help:\n" +
        "- **Drop the silent e** before -ment in a few words: argue becomes argument (not arguement).\n" +
        "- **Keep the base word** and add the ending: mountain + -ous = mountainous.\n" +
        "- **-ent / -ient** for adjectives from Latin -ens: magnificent, resilient.\n" +
        "- **-re** is the British ending in meagre, centre, theatre.\n" +
        "- Latin nouns end in **-um**: curriculum, continuum.",
      table: {
        columns: ["Word", "Spelling point", "Typical wrong option", "Sitting"],
        rows: [
          { cells: ["Argument", "argue drops its e before -ment", "Arguement", "2019 (II)"] },
          { cells: ["Decisive", "de-ci-sive: c then s", "Desisive", "2019 (II)"] },
          { cells: ["Continuum", "Latin -um after a double u", "Continuem", "2020 (I)"] },
          { cells: ["Strategy", "stra- then -tegy: a then e", "Stretegy", "2020 (I)"] },
          { cells: ["Resilient", "re- then -silient, ending -ient", "Risilient", "2020 (I)"] },
          { cells: ["Mountainous", "mountain + -ous, no extra vowel", "Mountaineous", "2020 (II)"] },
          { cells: ["Curriculum", "rr, then Latin -um", "Curriculam", "2020 (II)"] },
          { cells: ["Magnificent", "ending -cent", "Magnificant", "2020 (II)"] },
          { cells: ["Felicitation", "fe-li-ci-ta-tion: e, then i, i", "Falicitation", "2020 (II)"] },
          { cells: ["Meagre", "British -re ending", "Megare", "2020 (II)"] },
        ],
        caption: "Build the word from its base, then check the ending against a word you trust.",
      },
      pyqExampleId: "a37c3160-6001-41c7-a507-442f5ed87a70",
      selfCheckExample: {
        prompt: "Choose the correctly spelt word. (a) Pronounciation (b) Pronunciation (c) Pronunsiation (d) Pronuntiation",
        steps: [
          "The verb is pronounce, but the noun drops the o: pro-nun-ci-a-tion.",
          "(a) keeps the o of pronounce. (c) uses s for c. (d) uses t for c.",
        ],
        answer: "(b) Pronunciation.",
      },
      practiceSet: [
        { prompt: "Seperate or separate?", answer: "Separate", method: "there is 'a rat' in sep-a-rate" },
        { prompt: "Definate or definite?", answer: "Definite", method: "from finite" },
        { prompt: "Grammer or grammar?", answer: "Grammar", method: "ends in -ar" },
        { prompt: "Priviledge or privilege?", answer: "Privilege", method: "no d" },
      ],
      traps: [
        {
          title: "Keeping the e of the base word",
          body:
            "Most words keep their e before -ment (judgement in British use, movement), so students write 'arguement'. **Argument** is the exception to learn.",
        },
        {
          title: "Adding a vowel that is not there",
          body:
            "**Mountainous** is mountain + -ous. 'Mountaineous' borrows the e of mountaineer. Build the word from its base and add nothing.",
        },
        {
          title: "-ent or -ant",
          body:
            "**Magnificent**, **resilient** and **decisive** are checked by the middle and the ending. When unsure, think of a related word: magnificence, resilience.",
        },
      ],
    },
  ],
};
