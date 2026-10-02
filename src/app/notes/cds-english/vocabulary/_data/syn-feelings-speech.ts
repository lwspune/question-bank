import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_FEELINGS_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Feelings, Speech and Persuasion",
  title: "Words for feelings, speech and persuasion",
  oneLineDefinition:
    "The words CDS has tested for feelings and reactions, for ways of speaking and writing, and for urging, praising and blaming.",
  whyItMatters:
    "A large part of the CDS synonym block describes how people feel and how they speak. The options for these words often differ only in strength or in charge, so you need the exact shade of each word, not just its rough idea.",
  concepts: [
    // C1 — feelings and reactions
    {
      kind: "reference" as const,
      slug: "cdsensyn-feelings",
      name: "Feelings and reactions",
      intuition:
        "Feeling words differ in strength and in charge. Aghast is stronger than shocked; exhilarating is stronger than pleasant. The answer keeps the charge and roughly the strength of the underlined word.",
      definition:
        "Sort them:\n" +
        "- **Shock and confusion**: aghast, shocked (appalled), nonplussed (perplexed).\n" +
        "- **Loneliness and suffering**: desolated, stranded, tormented, fatigued.\n" +
        "- **Joy, warmth and courage**: exhilarating, endearment, engaging, emboldened, effusive.\n" +
        "- **Wanting**: anxious for something means keen to get it, not worried about it.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["desolated", "lonely and abandoned", "deserted", "2018 (II)"] },
          { cells: ["aghast", "struck with shock and horror", "horrified", "2020 (I)"] },
          { cells: ["shocked", "upset by something unexpected and bad", "appalled", "2021 (II)"] },
          { cells: ["nonplussed", "so surprised that one cannot react", "perplexed", "2026 (II)"] },
          { cells: ["stranded", "left helpless, with no way out", "marooned", "2026 (I)"] },
          { cells: ["exhilarating", "very exciting and joyful", "thrilling", "2024 (I)"] },
          { cells: ["endearment", "a word or act that shows love", "fondness", "2022 (I)"] },
          { cells: ["tormented", "caused great suffering to", "distressed", "2022 (I)"] },
          { cells: ["fatigued", "made very tired", "exhausted", "2020 (I)"] },
          { cells: ["emboldened", "given courage", "encouraged", "2020 (II)"] },
          { cells: ["engaging", "attractive, holding attention", "appealing", "2018 (II)"] },
          { cells: ["anxious", "anxious for: keen to get", "eager", "2023 (I)"] },
          { cells: ["effusive", "pouring out feelings without restraint", "expressing approval while exhibiting strong feelings", "2026 (I)"] },
        ],
      },
      pyqExampleId: "ebfea0ae-59e2-4bb9-9d36-6d147bbbc51a",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The simple question left the expert \\(\\underline{\\text{nonplussed}}\\). (a) bored (b) puzzled (c) pleased (d) angry",
        steps: [
          "Nonplussed means so surprised that you do not know what to say or do.",
          "Bored, pleased and angry are other feelings with no surprise in them.",
          "Puzzled keeps the meaning.",
        ],
        answer: "(b) puzzled",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: fatigued = exhausted; endearment = fondness; stranded = liberated; tormented = distressed.",
          answer: "stranded = liberated",
          method: "Stranded means left helpless; liberated is nearly the opposite.",
        },
        {
          prompt: "Which is stronger: pleased or exhilarated?",
          answer: "exhilarated",
          method: "Exhilarated means very excited and joyful.",
        },
        {
          prompt: "Words that show love are words of ___ (one word from the table).",
          answer: "endearment",
        },
      ],
      traps: [
        {
          title: "Nonplussed does not mean unbothered",
          body: "In casual speech some people use **nonplussed** to mean calm. In the exam it means **perplexed**: confused and at a loss. **Petrified** (frozen with fear) is a near-miss.",
        },
        {
          title: "Check what the word describes",
          body: "**Exhilarating** describes the moment (thrilling). **Eager** describes the person waiting for it. An option can share the mood and still describe the wrong thing.",
        },
        {
          title: "Engaging here means attractive",
          body: "An **engaging** classroom holds your attention, so the match is **appealing**. It has nothing to do with being busy or being engaged to marry.",
        },
      ],
    },

    // C2 — speech and writing
    {
      kind: "reference" as const,
      slug: "cdsensyn-speech",
      name: "Speech and writing",
      intuition:
        "These words describe how much is said and how clearly. Brevity says little; tautology and verbose say too much; abstruse is hard to follow; clichéd is worn out. Place the word on one of these scales before you look at the options.",
      definition:
        "Three groups:\n" +
        "- **Amount**: brevity (few words) against verbose and tautology (too many words, or the same thing said twice). **Prolixity** also means too many words.\n" +
        "- **Clarity and freshness**: abstruse and recondite (hard to understand), clichéd and hackneyed (overused), conversational (informal), generic (general).\n" +
        "- **Other**: crux (the central point), exemplify (show by example), understatement (making something seem smaller), eavesdropping (listening secretly).",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["tautology", "saying the same thing twice in different words", "prolixity", "2019 (I)"] },
          { cells: ["brevity", "the use of few words", "concision", "2023 (II)"] },
          { cells: ["conversational", "like everyday talk", "informal", "2022 (I)"] },
          { cells: ["abstruse", "hard to understand", "recondite", "2026 (I)"] },
          { cells: ["clichéd", "overused, unoriginal", "hackneyed", "2020 (I)"] },
          { cells: ["generic", "general, not specific", "broad", "2020 (I)"] },
          { cells: ["crux", "the central point", "core", "2021 (I)"] },
          { cells: ["exemplify", "show by example", "demonstrate", "2021 (I)"] },
          { cells: ["understatement", "describing something as smaller than it is", "underplaying significance", "2026 (I)"] },
          { cells: ["eavesdropping", "listening secretly to others", "listening secretly", "2023 (I)"] },
          { cells: ["verbose", "using too many words", "exaggerate", "2024 (II)"], noteAmber: "No option meant wordy. Exaggerate was the only option meaning too much." },
        ],
      },
      pyqExampleId: "d3dfcb4c-21e8-48bf-8eff-b1effafd5f40",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The students found the lecture \\(\\underline{\\text{abstruse}}\\). (a) obscure (b) brief (c) lively (d) obvious",
        steps: [
          "Abstruse means hard to understand.",
          "Obvious is the opposite. Brief and lively describe length and energy, not difficulty.",
          "Obscure (not clear) keeps the meaning.",
        ],
        answer: "(a) obscure",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: crux = core; generic = specific; clichéd = hackneyed; exemplify = demonstrate.",
          answer: "generic = specific",
          method: "Generic means general; specific is its opposite.",
        },
        {
          prompt: "'A free gift' says 'free' twice. What is this fault called?",
          answer: "tautology",
        },
        {
          prompt: "Recondite means: (a) hard to understand (b) brief (c) repeated (d) informal",
          answer: "(a) hard to understand",
        },
      ],
      traps: [
        {
          title: "Verbose is about words, not size",
          body: "**Verbose** means using too many words. Exaggerating means making something bigger than it is. **Succinct** and **short** are opposites of verbose, not synonyms.",
        },
        {
          title: "Conversational is informal, not dialogical",
          body: "**Dialogical** means in the form of a dialogue. **Conversational** language is everyday, **informal** language, and formal is its opposite.",
        },
        {
          title: "Generic means general",
          body: "A **generic** statement is broad, not about one case. **Specific** is the opposite and is often placed among the options.",
        },
      ],
    },

    // C3 — urging, praising and blaming
    {
      kind: "reference" as const,
      slug: "cdsensyn-urge-blame",
      name: "Urging, praising and blaming",
      intuition:
        "These words push people or judge them. Exhort and advocate push forward; provocative and incendiary push towards anger; reprimand blames; condone lets a wrong pass. The opposite, praise for blame, is the usual trap.",
      definition:
        "Group them:\n" +
        "- **Urging**: exhorted (urged), advocacy (promotion), recommend (suggest).\n" +
        "- **Stirring anger**: provocative and incendiary (both inflammatory), derisive (mocking).\n" +
        "- **Blaming and forgiving**: reprimanded (admonished), condone (overlook), betrayal (treachery).\n" +
        "- **Reprimanded** has been set twice, and the answer both times was **admonished**.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["exhorted", "strongly urged", "urged", "2023 (I)"] },
          { cells: ["advocacy", "public support for a cause", "promotion", "2020 (II)"] },
          { cells: ["provocative", "meant to stir people to anger", "inflammatory", "2019 (I)"] },
          { cells: ["incendiary", "meant to stir up anger or conflict", "provocative", "2026 (II)"], noteAmber: "Literally fire-starting. Of remarks, it means stirring up anger." },
          { cells: ["reprimanded", "formally scolded", "admonished", "2019 (I), 2021 (I)"] },
          { cells: ["recommend", "put forward as suitable", "suggest", "2018 (I)"] },
          { cells: ["condone", "accept or overlook a wrong", "overlook", "2018 (II)"], noteAmber: "Condone means forgive or overlook. It is not condemn." },
          { cells: ["derisive", "showing scorn, mocking", "contemptuous", "2018 (II)"] },
          { cells: ["betrayal", "breaking someone’s trust", "treachery", "2019 (II)"] },
        ],
      },
      pyqExampleId: "d36dd5f5-8614-434a-bd6b-98ff10d7946e",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The coach \\(\\underline{\\text{exhorted}}\\) the team to give their best. (a) forbade (b) urged (c) watched (d) forced",
        steps: [
          "To exhort is to urge someone strongly, usually with words.",
          "Forbade is the opposite. Watched does not push anyone.",
          "Forced goes too far: exhorting persuades, it does not compel. Urged keeps the meaning.",
        ],
        answer: "(b) urged",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: condone = overlook; advocacy = opposition; incendiary = provocative; recommend = suggest.",
          answer: "advocacy = opposition",
          method: "Advocacy is active support for a cause.",
        },
        {
          prompt: "A speech meant to stir up a riot is ___ (one word from the table).",
          answer: "provocative, or incendiary",
        },
        {
          prompt: "To condone cheating is to: (a) punish it (b) overlook it (c) report it (d) condemn it",
          answer: "(b) overlook it",
        },
      ],
      traps: [
        {
          title: "Condone is not condemn",
          body: "To **condone** an act is to forgive or overlook it. To **condemn** it is to declare it wrong. The two look alike and mean nearly the opposite; **punish** is a trap for the same reason.",
        },
        {
          title: "Advocacy is support",
          body: "**Advocacy** comes from the same root as advocate (a lawyer who speaks for someone). In these sentences it means active support or **promotion**, and **opposition** is the opposite.",
        },
        {
          title: "Recommend is suggest, not advise",
          body: "To **recommend** a name is to put it forward as suitable. **Advise** and **counsel** mean to give guidance to a person, which does not fit 'recommend his name'.",
        },
      ],
    },
  ],
};
