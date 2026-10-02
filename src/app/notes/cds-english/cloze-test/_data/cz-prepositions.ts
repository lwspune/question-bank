import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions in the Blank",
  title: "Prepositions: Time, Place and Fixed Partners",
  oneLineDefinition:
    "A preposition is chosen by the words next to it: in for a month, on for a date, between for two, and many words that always take the same partner.",
  whyItMatters:
    "Prepositions are a large group of cloze blanks. The four options are short words that all look possible, so meaning alone rarely decides. " +
    "The right one is fixed by the noun after the blank or by the word before it, and many of those pairs simply have to be learnt.",
  concepts: [
    // C1 — time, place, between
    {
      kind: "formula" as const,
      slug: "cdsencz-prep-time-place",
      name: "Time, place and between: the preposition the noun needs",
      intuition:
        "Time and place words come with their own preposition. A month or a year takes in; a day or a date takes on; a clock time takes at. " +
        "Between links two things; among links more than two.",
      definition:
        "The terms:\n" +
        "- **Preposition**: a small word before a noun that shows time, place or relation: in, on, at, from, between.\n" +
        "The method:\n" +
        "- Find the noun after the blank and ask what kind of noun it is.\n" +
        "- Time: at + a clock time (at 6 a.m.); on + a day or a date (on Monday, on 15 August); in + a month, a year, a season or a century (in winter, in the 12th century).\n" +
        "- Place: in + a country, a city or an area (in all parts of India); at + a point (at the gate); all over + the whole surface (all over the world).\n" +
        "- A starting point: from (from the beginning). Inside a limit: within (within a week, within a democratic structure).\n" +
        "- Two things or two groups named: between X and Y. Three or more, or a crowd: among.\n" +
        "- by + a time means 'not later than': by Friday.",
      authoredExample: {
        prompt:
          "Fill the three blanks: 'The ceasefire began ___ 2 March. The talks ___ the two generals lasted ___ dawn till midnight.' Options: (on / in / at); (among / between / with); (from / since / by)",
        steps: [
          "'2 March' is a date. A date takes on.",
          "'the two generals' are two people. Two takes between.",
          "'dawn till midnight' is a span with a start and an end. The start takes from: from dawn till midnight.",
        ],
        answer: "on; between; from",
      },
      selfCheckExample: {
        prompt: "The prize was shared ___ the five members of the team. (a) between (b) among (c) with (d) to",
        steps: [
          "Count the people: five members, more than two.",
          "More than two, taken as a group: among.",
        ],
        answer: "(b) among",
      },
      practiceSet: [
        { prompt: "The exam starts ___ 9 a.m.", answer: "at", method: "A clock time." },
        { prompt: "Diwali falls ___ a Monday this year.", answer: "on", method: "A day." },
        { prompt: "Submit the form ___ Friday at the latest.", answer: "by", method: "Not later than a time." },
        { prompt: "Cricket is played all ___ the country.", answer: "over", method: "all over = across the whole area." },
      ],
      pyqExampleId: "5d7fc674-a07b-4ba7-8293-7d53ed818614",
      traps: [
        {
          title: "Counting people instead of groups",
          body:
            "'any difference ___ Indian students and their counterparts in the other country': each group has many students, but there are **two groups**. So between, not among.",
        },
        {
          title: "on with a month",
          body:
            "on needs a day or a date: on 5 October. A month alone, with or without the year, takes in.",
        },
        {
          title: "with for 'from the start'",
          body:
            "'___ the beginning, India was committed to ...' marks a starting point that runs on, so **from**. with and for do not mark a start.",
        },
      ],
    },

    // C2 — reference: words with a fixed preposition
    {
      kind: "reference" as const,
      slug: "cdsencz-prep-partners",
      name: "Words that carry their own preposition",
      intuition:
        "Many words always take the same preposition after them. Logic will not tell you which one; you have to know the pair. " +
        "Learn each word together with its partner, as one unit.",
      definition:
        "The terms:\n" +
        "- **Fixed preposition**: the one preposition a word always takes after it: conscious of, different from, contribute to.\n" +
        "How to handle them:\n" +
        "- When the blank comes right after a verb, an adjective or a noun, ask whether that word has a fixed preposition.\n" +
        "- Say the word and its partner as one unit in your head.\n" +
        "- If two prepositions both seem to make sense, the fixed partner wins.\n" +
        "- The pairs below are the ones CDS cloze passages have tested.",
      table: {
        columns: ["Word and partner", "In the passage", "Wrong options offered", "Sitting"],
        rows: [
          { cells: ["force itself upon", "has been forcing itself upon the attention of all thoughtful men", "at, over", "2019 (I)"] },
          { cells: ["a course on", "The idea of a course on 'peace education'", "to, for", "2021 (I)"] },
          { cells: ["fight against", "One should fight against the force of habit.", "from, for", "2022 (I)"] },
          { cells: ["conscious of", "conscious of his bad habits", "about, with regard to", "2022 (I)"] },
          { cells: ["in excess", "harmful when done in excess", "to, with", "2022 (I)"] },
          { cells: ["the sight of", "the sight of him simply terrifies me", "at, by", "2017 (II)"] },
          { cells: ["different from", "Giving up cigarettes is different from curbing overeating", "since, into", "2020 (II)"] },
          { cells: ["predicated on", "Modern lifestyles are predicated on debt.", "with, for", "2022 (II)"] },
          { cells: ["a range of", "access to a range of modern financial products", "to, with", "2022 (II)"] },
          { cells: ["contribute to", "say 'No' to plastic bags and contribute to society", "by, into", "2021 (II)"] },
          { cells: ["smile at", "You are listening to me and smiling at each other", "smiling for, smiling to", "2018 (II)"] },
          { cells: ["diversity in", "regional diversity in expenditure or political engagement", "on, for", "2025 (II)"] },
          { cells: ["the relations of X to Y", "the relations of living creatures to other organisms", "for, within", "2019 (II)"] },
          { cells: ["along with", "eating waste food along with these polythene bags", "besides, beside", "2021 (II)"] },
          { cells: ["in regard to", "It is necessary, in regard to any war, to consider ...", "connecting, linking", "2023 (I)"] },
        ],
        caption: "Learn the word and its partner together. The wrong options are all real prepositions; only the pair decides.",
      },
      pyqExampleId: "b05691e3-546b-4735-b4de-baad2214e027",
      selfCheckExample: {
        prompt: "Fill both blanks: 'He was conscious ___ the danger, but he had to fight ___ his fear.'",
        steps: [
          "conscious takes of.",
          "fight, in the sense of struggling to overcome something, takes against.",
        ],
        answer: "of; against",
      },
      practiceSet: [
        { prompt: "Hard work will contribute ___ your success.", answer: "to" },
        { prompt: "Spot the wrong row: 'diversity on food habits'.", answer: "Wrong. The pair is diversity in.", method: "diversity in something" },
        { prompt: "She was afraid at the sight ___ the snake.", answer: "of" },
        { prompt: "Eating ___ excess is bad for health.", answer: "in", method: "in excess is a fixed pair." },
      ],
      traps: [
        {
          title: "smile to, smile with",
          body:
            "Many speakers say 'she smiled to me'. In standard English you **smile at** someone. smile with means sharing a smile, which is not the same.",
        },
        {
          title: "Choosing the preposition that 'makes sense'",
          body:
            "'conscious about' sounds reasonable, and 'with regard to' even means 'about'. But conscious has one partner: **of**. When a word has a fixed preposition, sense does not decide.",
        },
        {
          title: "beside and besides",
          body:
            "beside means next to; besides means in addition to. Neither replaces **along with**, which means together with: the animals ate the food along with the bags.",
        },
      ],
    },

    // C3 — by for means/agent, for for purpose
    {
      kind: "formula" as const,
      slug: "cdsencz-prep-means-purpose",
      name: "by for the means or agent, for the purpose",
      intuition:
        "by answers 'how?' or 'by whom?'. for answers 'for what?'. Ask which question the phrase after the blank is answering.",
      definition:
        "The terms:\n" +
        "- **Means**: the method by which something is done: by solving it, by train.\n" +
        "- **Agent**: the doer of an action in a passive sentence: decomposed by micro-organisms.\n" +
        "- **Purpose**: what something is for: a fund for flood relief.\n" +
        "The method:\n" +
        "- Ask what the phrase after the blank tells you.\n" +
        "- How something is done: by. by + -ing is very common: by using new methods.\n" +
        "- Who does it, in a passive sentence: by. written by a soldier.\n" +
        "- A tool held in the hand: with. cut with a knife.\n" +
        "- The purpose, or the thing a word is used for: for. the term used for the study of ...; aims for change.\n" +
        "- Read on. A matching 'or by ...' or 'and for ...' later in the sentence repeats the same preposition.",
      authoredExample: {
        prompt:
          "Fill the three blanks with by, with or for: 'The bridge was repaired ___ army engineers, who cut the steel ___ gas torches. The money came from a fund ___ flood relief.'",
        steps: [
          "'was repaired ___ army engineers': a passive sentence; the engineers did it. The agent takes by.",
          "'cut the steel ___ gas torches': the torches are a tool held in the hand. A tool takes with.",
          "'a fund ___ flood relief': the fund exists for that purpose. Purpose takes for.",
        ],
        answer: "by; with; for",
      },
      selfCheckExample: {
        prompt: "You can improve your speed ___ practising daily. (a) for (b) by (c) with (d) to",
        steps: [
          "The phrase answers 'how can you improve?'. That is the means.",
          "The means, followed by an -ing form, takes by.",
        ],
        answer: "(b) by",
      },
      practiceSet: [
        { prompt: "This room is used ___ storing weapons.", answer: "for", method: "Purpose." },
        { prompt: "The letter was signed ___ the colonel.", answer: "by", method: "The agent of a passive." },
        { prompt: "He opened the tin ___ a knife.", answer: "with", method: "A tool in the hand." },
        { prompt: "We travelled to Delhi ___ train.", answer: "by", method: "A means of transport." },
      ],
      pyqExampleId: "e0ce33b7-ec69-4e44-9938-9dc763712ccf",
      traps: [
        {
          title: "with for the doer",
          body:
            "'they cannot be decomposed ___ micro-organisms': the micro-organisms do the decomposing. The doer in a passive sentence takes **by**, not with or through.",
        },
        {
          title: "by for a purpose",
          body:
            "'used the term ___ the study of the relations ...': the term names the study; it is not done by it. Purpose takes **for**.",
        },
        {
          title: "Missing the match later in the line",
          body:
            "When the sentence goes on with 'or by doing X' or 'and for Y', the first blank usually takes the same preposition. Read to the end before you choose.",
        },
      ],
    },
  ],
};
