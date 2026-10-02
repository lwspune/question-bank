import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_CHARACTER_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Character and Temperament",
  title: "Words for character and temperament",
  oneLineDefinition:
    "The words CDS has tested for a person's temper, mind, values and inborn nature, each with its meaning and the option that was nearest.",
  whyItMatters:
    "Many CDS synonym questions describe a person: their temper, their mind or their values. Most of these words carry a clear charge, praising or blaming, so the charge alone often removes two options. Learn each word with its charge.",
  concepts: [
    // C1 — temper and mood
    {
      kind: "reference" as const,
      slug: "cdsensyn-temper",
      name: "Temper and mood",
      intuition:
        "These words describe how a person behaves with others. Most of them blame: haughty, malicious, sardonic, cantankerous. Hospitable is the one that praises. Sort the options by charge before you think about exact meaning.",
      definition:
        "How to use this table:\n" +
        "- Learn each word with its **charge** (praising or blaming).\n" +
        "- Look for a **clue in the sentence**. 'But', 'although' and 'yet' signal a contrast, so the clue after them points to the opposite of the underlined word.\n" +
        "- Mood words are often tested against their opposite: **complacent** (self-satisfied) against **discontented**.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["haughty", "proud, looking down on others", "arrogant", "2021 (I)"] },
          { cells: ["mercurial", "changing mood suddenly", "volatile", "2023 (I)"] },
          { cells: ["cantankerous", "bad-tempered and quarrelsome", "ill-tempered", "2024 (II)"] },
          { cells: ["hysterical", "wildly emotional, out of control", "berserk", "2019 (I)"] },
          { cells: ["malicious", "wanting to hurt others", "spiteful", "2022 (I)"] },
          { cells: ["hospitable", "friendly and welcoming to guests", "cordial", "2023 (I)"] },
          { cells: ["complacent", "too pleased with oneself to try harder", "contented", "2023 (II)"], noteAmber: "Not complaisant (eager to please). Complacent means smugly satisfied." },
          { cells: ["sardonic", "grimly mocking", "mocking", "2023 (I)"] },
          { cells: ["dogmatic", "sure of one’s opinions, allowing no doubt", "rigid", "2026 (II)"] },
          { cells: ["indignant", "angry at something unfair", "resentful", "2021 (I)"] },
        ],
        caption: "Most of these words blame. Hospitable is the one that praises.",
      },
      pyqExampleId: "4e16406b-f24d-4241-82a0-93fd9dbcb847",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: Her \\(\\underline{\\text{mercurial}}\\) moods made her hard to work with. (a) steady (b) changeable (c) cheerful (d) merciful",
        steps: [
          "Mercurial comes from mercury, the liquid metal that never stays still.",
          "So her moods change suddenly. Steady is the opposite.",
          "Merciful only looks alike, and cheerful is a single mood. Changeable keeps the meaning.",
        ],
        answer: "(b) changeable",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: hospitable = welcoming; sardonic = mocking; indignant = calm; malicious = spiteful.",
          answer: "indignant = calm",
          method: "Indignant means angry at something unfair.",
        },
        {
          prompt: "One word for a person who will not accept any doubt about his own beliefs?",
          answer: "dogmatic",
        },
        {
          prompt: "Nearest meaning of complacent: (a) self-satisfied (b) dissatisfied (c) obliging (d) worried",
          answer: "(a) self-satisfied",
          method: "Complaisant, not complacent, means obliging.",
        },
        {
          prompt: "One word for a bad-tempered old man who argues about everything?",
          answer: "cantankerous",
        },
      ],
      traps: [
        {
          title: "'But' turns the clue around",
          body: "In 'she looks shy, **but** she speaks up at every meeting', the clue after 'but' describes the opposite of shy. When a sentence has a contrast word, reverse the clue before you match it.",
        },
        {
          title: "Mood words come in look-alike pairs",
          body: "**Indignant** (angry at injustice) is not **indigent** (poor). **Complacent** (smug) is not **complaisant** (obliging). **Mercurial** (changeable) is not **merciful**.",
        },
      ],
    },

    // C2 — mind and ability
    {
      kind: "reference" as const,
      slug: "cdsensyn-ability",
      name: "Mind and ability",
      intuition:
        "These words grade a person's mind and skill, from doltish at the bottom to peerless and exemplary at the top. Place the underlined word on that scale, and the options sort themselves.",
      definition:
        "Two groups:\n" +
        "- **Low ability**: doltish, obtuse, ineptitude, and ingenuous (naive, too trusting).\n" +
        "- **High ability or effort**: industrious, competency, fastidious, precocious, peerless, exemplary, and ripe (mature in judgement).\n" +
        "- A **precocious** child is ahead of the usual age; a **fastidious** worker cares about every detail.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["doltish", "stupid", "imbecilic", "2024 (II)"] },
          { cells: ["obtuse", "slow to understand", "dull", "2023 (II)"] },
          { cells: ["industrious", "hard-working", "diligent", "2021 (I)"] },
          { cells: ["competency", "the ability to do something well", "capability", "2021 (I)"] },
          { cells: ["fastidious", "very careful about detail", "meticulous", "2024 (I)"] },
          { cells: ["ripe", "fully developed; of a person, mature in judgement", "mature", "2018 (I)"] },
          { cells: ["ingenuous", "innocent and too trusting", "naive", "2026 (I)"], noteAmber: "Not ingenious (clever). Ingenuous means innocent, so clever is a trap." },
          { cells: ["precocious", "developed earlier than usual", "unusually advanced", "2026 (II)"] },
          { cells: ["ineptitude", "lack of skill", "incompetence", "2018 (II)"] },
          { cells: ["peerless", "having no equal", "unequalled", "2022 (I)"] },
          { cells: ["exemplary", "so good that it can serve as a model", "ideal", "2018 (I)"] },
        ],
      },
      pyqExampleId: "5500b04c-b61b-4c4a-8c5f-303e75a44109",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: He is \\(\\underline{\\text{fastidious}}\\) about the way his uniform is pressed. (a) careless (b) particular (c) proud (d) quick",
        steps: [
          "Fastidious describes someone who cares about every small detail.",
          "Careless is the opposite. Proud and quick do not describe attention to detail.",
          "Particular (fussy about details) keeps the meaning.",
        ],
        answer: "(b) particular",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: industrious = hard-working; peerless = without equal; doltish = clever; competency = ability.",
          answer: "doltish = clever",
          method: "A dolt is a stupid person.",
        },
        {
          prompt: "Ineptitude means: (a) skill (b) lack of skill (c) rudeness (d) laziness",
          answer: "(b) lack of skill",
          method: "in (not) + apt (fit, skilled).",
        },
        {
          prompt: "One word from the table for a child who reads novels at the age of five?",
          answer: "precocious",
        },
      ],
      traps: [
        {
          title: "Ingenuous sits at the low end",
          body: "**Ingenuous** (naive) looks like **ingenious** (clever), but the two sit at opposite ends of this scale.",
        },
        {
          title: "Fastidious has nothing to do with speed",
          body: "**Fastidious** means very careful about detail, so the nearest word is **meticulous**. Do not let the 'fast' at the start mislead you.",
        },
        {
          title: "A ripe person is mature, not old",
          body: "Used of a person, **ripe** means fully developed in judgement: **mature**. Senior and seasoned are close, but they describe age and experience, not ripeness of mind.",
        },
      ],
    },

    // C3 — habits, values and attitudes
    {
      kind: "reference" as const,
      slug: "cdsensyn-values",
      name: "Habits, values and attitudes",
      intuition:
        "These words describe how a person treats money, rules and other people's views. Thrifty and forbearance praise; prejudiced and pleonexia blame. Utopian and dissident describe a person's views rather than their behaviour.",
      definition:
        "Group them:\n" +
        "- **Self-control**: thrifty (careful with money), forbearance (patient restraint), endurance (bearing hardship), high-mindedness (high principles).\n" +
        "- **Bias and greed**: prejudiced (judging before knowing), pleonexia (greed for more than one's share).\n" +
        "- **Views and will**: utopian (perfect but unreal), dissident (against the official line), reluctant (unwilling).",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["thrifty", "careful with money", "economical", "2018 (II)"] },
          { cells: ["forbearance", "patient self-control", "restraint", "2022 (I)"] },
          { cells: ["prejudiced", "judging before knowing the facts", "jaundiced", "2019 (I)"], noteAmber: "Jaundiced here means biased, not the illness." },
          { cells: ["utopian", "perfect in a way that cannot be real", "ideal", "2023 (II)"], noteAmber: "Ideal fits. Realistic and practicable are the opposite." },
          { cells: ["reluctant", "unwilling", "disinclined", "2019 (I)"] },
          { cells: ["dissident", "opposing the official view", "rebellious", "2020 (II)"] },
          { cells: ["high-mindedness", "having high moral standards", "strong principles", "2020 (II)"] },
          { cells: ["pleonexia", "greed to take more than one’s share", "greed to grab everything for oneself", "2020 (II)"] },
          { cells: ["endurance", "the power to bear hardship for a long time", "patience", "2022 (II)"] },
        ],
      },
      pyqExampleId: "43d8e38b-dcba-4e91-9e45-d72c3ba4ae2f",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The boy was \\(\\underline{\\text{reluctant}}\\) to leave his friends behind. (a) eager (b) unwilling (c) ready (d) sorry",
        steps: [
          "Reluctant means not wanting to do something.",
          "Eager and ready are the opposite.",
          "Sorry is a feeling after the event. Unwilling keeps the meaning.",
        ],
        answer: "(b) unwilling",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: forbearance = restraint; utopian = practical; dissident = rebellious; prejudiced = biased.",
          answer: "utopian = practical",
          method: "Utopian means perfect but unreal; practical is close to its opposite.",
        },
        {
          prompt: "In 'a jaundiced view of politics', jaundiced means: (a) yellow (b) ill (c) biased (d) tired",
          answer: "(c) biased",
        },
        {
          prompt: "What is the word for the greed to take more than one's share?",
          answer: "pleonexia",
        },
      ],
      traps: [
        {
          title: "Utopian carries a hidden charge",
          body: "**Utopian** means perfect, but usually too perfect to be real. **Ideal** fits; **realistic** and **practicable** are its opposites.",
        },
        {
          title: "Jaundiced can mean biased",
          body: "As an illness, jaundice turns the skin yellow. As a word for a view, **jaundiced** means biased or bitter. That is why it can be a synonym of **prejudiced**.",
        },
        {
          title: "Forbearance is not forbidding",
          body: "**Forbearance** is patient self-control. It shares letters with forbid but not its meaning; **restraint** is the match, and **constraint** (a limit set from outside) is the near-miss.",
        },
      ],
    },

    // C4 — inborn and inbuilt qualities
    {
      kind: "reference" as const,
      slug: "cdsensyn-inborn",
      name: "Inborn and inbuilt qualities",
      intuition:
        "Innate, inherent and indigenous all point inward: something present from birth, built into a thing, or native to a place. The options test whether you keep that 'from within' sense.",
      definition:
        "- **Innate**: present from birth (a quality of a person).\n" +
        "- **Inherent**: built into the nature of a thing (a danger, a weakness).\n" +
        "- **Tendency** and **predisposition**: a natural leaning. A predisposition to a disease means being more likely to get it.\n" +
        "- **Indigenous**: native to a place, home-grown.",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["innate", "present from birth", "intrinsic", "2019 (II)"] },
          { cells: ["inherent", "part of the basic nature of a thing", "inbuilt", "2021 (I)"] },
          { cells: ["tendency", "a natural leaning towards something", "predisposition", "2020 (II)"] },
          { cells: ["predisposition", "to a disease: a greater chance of getting it", "vulnerability", "2023 (I)"] },
          { cells: ["indigenous", "native to a place", "home-grown", "2020 (II)"] },
        ],
      },
      pyqExampleId: "3f8e66c3-9c8a-4deb-bb16-aa1415be516a",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The \\(\\underline{\\text{inherent}}\\) weakness of the plan was its cost. (a) hidden (b) built-in (c) outward (d) small",
        steps: [
          "Inherent describes something that is part of the basic nature of a thing.",
          "Outward is close to the opposite. Hidden and small describe other things.",
          "Built-in keeps the meaning: the cost was part of the plan itself.",
        ],
        answer: "(b) built-in",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: inherent = inbuilt; indigenous = foreign; tendency = inclination; predisposition = proneness.",
          answer: "indigenous = foreign",
          method: "Indigenous means native, the opposite of foreign.",
        },
        {
          prompt: "A predisposition to a disease means: (a) immunity (b) a greater chance of getting it (c) a cure (d) a fear of it",
          answer: "(b) a greater chance of getting it",
        },
        {
          prompt: "Home-grown products are ___ products (one word from the table).",
          answer: "indigenous",
        },
      ],
      traps: [
        {
          title: "Predisposition is not resistance",
          body: "A **predisposition** to a disease makes you more likely to catch it. **Resistance** and **immunity** are the opposite, so they are traps.",
        },
        {
          title: "The in- of indigenous means within",
          body: "Indigenous products are made at home, so **non-native** is the opposite. Do not read the in- as 'not'.",
        },
        {
          title: "Inherent belongs to a thing",
          body: "An **inherent** danger is built into the problem itself. **Outward** is its opposite, and **difficult** only describes the problem, not where the danger comes from.",
        },
      ],
    },
  ],
};
