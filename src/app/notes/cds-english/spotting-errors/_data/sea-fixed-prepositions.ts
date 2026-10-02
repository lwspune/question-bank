import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEA_FIXED_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions Fixed by the Word Before",
  title: "Prepositions fixed by the word before them",
  oneLineDefinition:
    "Many verbs, adjectives and nouns take one fixed preposition: prefer to, listen to, abide by, the reason for. The paper swaps in the wrong one, and you must know the right partner.",
  whyItMatters:
    "A wrong preposition is one of the most common errors in CDS spotting-errors and sentence-improvement items, and it has been asked from 2017 to 2026. " +
    "No rule tells you which preposition a word takes, so the only defence is to know the pairs. The tables on this page list the pairs the paper has used.",
  concepts: [
    // C1 — 'to' as a preposition: prefer X to Y, look forward to + -ing
    {
      kind: "formula" as const,
      slug: "cdsensea-prefer-to",
      name: "Prefer X to Y: 'to' as a preposition takes a noun or -ing",
      intuition:
        "The little word 'to' has two jobs. Before a verb it can mark the infinitive: 'I want to go'. After some words it is a **preposition**, like 'in' or 'of'. " +
        "A preposition is followed by a noun or by an **-ing form** (a **gerund**), never by a bare verb. 'Prefer' is the best-known word of this kind: it compares two things with 'to', never with 'than'.",
      definition:
        "**The 'to' test.**\n" +
        "- Put a noun after the 'to'. 'I look forward to **the holidays**' works, so this 'to' is a preposition, and a verb after it takes -ing: 'look forward to **meeting** you'.\n" +
        "- If only a verb fits ('I want to the holidays' fails), 'to' marks the infinitive and takes the base verb: 'I want to **meet** you'.\n" +
        "**Words whose 'to' is a preposition:**\n" +
        "- **prefer X to Y**: 'I prefer tea to coffee'; 'She prefers walking to driving'. Never 'prefer ... than' or 'prefer ... more than'.\n" +
        "- With two infinitives, use **rather than**: 'I prefer to walk rather than drive'.\n" +
        "- **look forward to, be used to, be accustomed to, accustom oneself to, object to, with a view to, devoted to** + noun or -ing.\n" +
        "- **senior, junior, superior, inferior, prior, preferable**: these compare with **to**, not 'than'.\n" +
        "**A different partner before -ing:** interested **in** doing, insist **on** doing, capable **of** doing.",
      authoredExample: {
        prompt: item("The new recruits objected", "to stand", "in the rain for an hour."),
        steps: [
          "Read the whole sentence first. It sounds almost right, because 'to stand' looks like a normal infinitive.",
          "Run the 'to' test on part (b): 'objected to **the plan**' works. So this 'to' is a preposition.",
          "A preposition takes a noun or an -ing form, so 'to stand' must be 'to standing'.",
          "Parts (a) and (c) are correct. The word to change sits in part (b).",
        ],
        answer: "(b). The new recruits objected to **standing** in the rain for an hour.",
      },
      selfCheckExample: {
        prompt: item("This laptop is", "superior than", "the one I bought last year."),
        steps: [
          "'Superior' is one of the comparing words that take 'to'.",
          "'Than' belongs to ordinary comparatives such as 'better than'. 'Superior' already means 'better', so it takes 'to'.",
          "The wrong word 'than' sits in part (b).",
        ],
        answer: "(b). This laptop is superior **to** the one I bought last year.",
      },
      practiceSet: [
        { prompt: "Correct it: 'She is used to wake up early.'", answer: "She is used to **waking** up early.", method: "'Be used to' means 'be in the habit of'; its 'to' is a preposition." },
        { prompt: "Correct it: 'He joined the gym with a view to lose weight.'", answer: "He joined the gym with a view to **losing** weight.", method: "Put a noun after 'with a view to': it works, so take -ing." },
        { prompt: "Correct it: 'My brother is senior than me by two years.'", answer: "My brother is senior **to** me by two years.", method: "senior, junior, superior, inferior compare with 'to'." },
        { prompt: "Correct it: 'He is capable to lift that box.'", answer: "He is capable **of lifting** that box.", method: "'Capable' takes 'of' + -ing." },
      ],
      pyqExampleId: "179dd16d-04ae-4b7c-be6b-32d1393ff016",
      traps: [
        {
          title: "'Prefer' never takes 'than'",
          body: "Not 'prefer this than that', and not 'prefer this much more than that'. Write 'prefer this **to** that'. 'Than' appears only in the pattern 'prefer to do X **rather than** do Y'.",
        },
        {
          title: "'Look forward to' + a bare verb",
          body: "'I look forward to hear from you' looks like an infinitive, but the 'to' is a preposition. Write 'look forward to **hearing** from you'. The same holds for 'object to', 'be used to' and 'with a view to'.",
        },
        {
          title: "'Used to' has two meanings",
          body: "'I **used to** swim' is a past habit and takes the base verb. 'I **am used to** swimming' means 'I am accustomed to it' and takes -ing. The 'am', 'is' or 'get' before it tells you which one you have.",
        },
        {
          title: "Changing the preposition, not just the verb",
          body: "In 'interested to joining the group', the -ing form is right but the partner is wrong: 'interested **in** joining'. Check both halves: the preposition and the form that follows it.",
        },
      ],
    },

    // C2 — verbs and their fixed prepositions
    {
      kind: "reference" as const,
      slug: "cdsensea-verb-prep",
      name: "Verbs and the preposition they demand",
      intuition:
        "Some verbs come with a fixed partner. You cannot work the partner out from the meaning: you abide **by** a rule but comply **with** it. " +
        "The exam swaps the partner for a plausible-looking one, so the sentence still sounds fine on a quick read.",
      definition:
        "Two terms:\n" +
        "- A **collocation** is a word that demands a fixed partner: 'abide' needs 'by', 'apprise' needs 'of'.\n" +
        "- A **phrasal verb** is a verb plus a small word that together make a new meaning: 'dispense with' (do without), 'look for' (search), 'meet with' (receive).\n" +
        "How the paper tests them:\n" +
        "- It changes the preposition: 'abide with', 'apprised with', 'ousted in'.\n" +
        "- It drops the preposition: 'listen the song'.\n" +
        "- It picks a partner that gives the wrong meaning: 'look after' means care for, 'look into' means investigate, 'look for' means search.\n" +
        "There is no rule to derive the partner. Learn the pairs below as pairs.",
      table: {
        columns: ["Verb", "Correct use", "Wrong form in the paper", "Sitting"],
        rows: [
          { cells: ["abide by", "He did not abide **by** my decision.", "abide with", "2017 (I)"], pyqExampleId: "7ca65656-291c-408c-af93-93e799405fb2" },
          { cells: ["apprise of", "Being apprised **of** our approach, ...", "apprised with", "2019 (I)"], pyqExampleId: "db7e9d19-561f-4d8f-b9ab-2cbef80ee5f6" },
          {
            cells: ["centre on", "Their attention was centred **on** the craftwork.", "centred around", "2024 (II), 2025 (II)"],
            noteAmber: "Both sittings treated 'centred around' as the error. Write 'centred on' or 'centred upon'.",
            pyqExampleId: "f83f6d0b-48fe-41d6-b96d-625453e8d229",
          },
          { cells: ["dispense with", "Your services are dispensed **with**. (= no longer needed)", "dispensed for", "2017 (I)"], pyqExampleId: "4713cba5-9bf6-4e91-823b-4823e58c3c0b" },
          { cells: ["due to", "They parted ways due **to** ideological differences.", "due towards", "2024 (I)"], pyqExampleId: "1e5a75a2-dacd-440a-aa80-0cda1920efd9" },
          { cells: ["hold under (a law)", "He was held **under** the Prevention of Terrorism Act.", "held in", "2018 (I)"], pyqExampleId: "1c5c3577-ac36-4f97-a308-91e8fca8266f" },
          { cells: ["listen to", "I like to listen **to** the song of the nightingale.", "listen the song", "2017 (II)"], pyqExampleId: "0c8aa597-4e4c-4105-96c0-095214778e4e" },
          { cells: ["live on (an income)", "He was living **on** remittances from his sons.", "living in remittances", "2017 (II)"], pyqExampleId: "f7680c46-dd18-4920-957b-0fa898bd32dd" },
          { cells: ["look for", "He is now looking **for** a job.", "looking about", "2017 (I)"], pyqExampleId: "0f76c61f-77f3-408d-abd9-ad7d29091cc4" },
          { cells: ["make into", "The fruit can be made **into** jam.", "made to jam", "2018 (I)"], pyqExampleId: "016fcc05-4b7b-419b-a487-b0147f4c2108" },
          { cells: ["oust from", "The party was ousted **from** power.", "ousted in power", "2018 (I)"], pyqExampleId: "3a107fd3-7065-4552-bff6-9d6b520ea0b6" },
          { cells: ["trickle down to", "The effects are trickling down **to** the next generation.", "trickling at", "2019 (I)"], pyqExampleId: "3c17f24c-da2a-4639-9990-0fe0bd7063da" },
        ],
        caption: "Verbs that take NO preposition at all (discuss, consider, order, emphasise) are taught under extra, missing and place-time prepositions.",
      },
      pyqExampleId: "0c8aa597-4e4c-4105-96c0-095214778e4e",
      selfCheckExample: {
        prompt: item("Every member of the club", "must comply to", "the rules on parking."),
        steps: [
          "'Comply' is a verb with a fixed partner.",
          "You comply **with** a rule, an order or a request, never 'comply to'.",
          "The wrong preposition sits in part (b).",
        ],
        answer: "(b). Every member of the club must comply **with** the rules on parking.",
      },
      practiceSet: [
        { prompt: "Fill the gap: 'The players must abide ___ the umpire's ruling.'", answer: "by" },
        { prompt: "Fill the gap: 'Let us dispense ___ the formalities and begin.'", answer: "with", method: "dispense with = do without" },
        { prompt: "Fill the gap: 'Please apprise me ___ any change in the plan.'", answer: "of" },
        { prompt: "Spot the wrong row: 'trickle at = the standard phrase for passing down to others'.", answer: "Wrong. The phrase is 'trickle down to'." },
      ],
      traps: [
        {
          title: "'Centred around' sounds natural",
          body: "Many good writers say 'centred around', but the CDS paper has marked it wrong in two sittings. The safe form is 'centred **on**' or 'centred **upon**'.",
        },
        {
          title: "Hear and listen are not twins",
          body: "'Hear' takes its object directly: 'I heard the radio'. 'Listen' needs 'to': 'I listened **to** the radio'. A sentence with 'listen' and no 'to' has an error.",
        },
        {
          title: "One verb, several partners",
          body: "'Look for' (search), 'look after' (take care of) and 'look into' (investigate) are all correct English. Read the sentence to see which meaning it needs: someone who wants a job is looking **for** one.",
        },
        {
          title: "'Due' takes only 'to'",
          body: "'Due to', never 'due towards' or 'due for' in the sense of 'because of'. 'Owing to' works the same way.",
        },
      ],
    },

    // C3 — adjectives and nouns with fixed prepositions
    {
      kind: "reference" as const,
      slug: "cdsensea-adj-noun-prep",
      name: "Adjectives and nouns and the preposition they demand",
      intuition:
        "Describing words and naming words have fixed partners too. A person is ignorant **of** something, not 'in' it. A cause is the reason **for** something, not 'of' it. " +
        "A word-for-word translation from another language often picks the wrong one, which is exactly what the paper relies on.",
      definition:
        "What to know:\n" +
        "- **Adjectives** (describing words) and **nouns** (naming words) take fixed prepositions: ignorant **of**, engrossed **in**, the reason **for**.\n" +
        "- A **superlative** (the most ..., the best ..., the tallest ...) picks one out of a group with **of** (or 'among'): 'the tallest **of** all the boys'.\n" +
        "- **Between** is for two people or things. **Among** is for more than two. 'The two of them' is two, so it takes 'between'.\n" +
        "- Some words change partner with their object: angry **with** a person, angry **at** or **about** a thing; answerable **to** a person, **for** an act.",
      table: {
        columns: ["Word", "Correct use", "Wrong form in the paper", "Sitting"],
        rows: [
          { cells: ["angry", "angry **with** a person; angry **at** or **about** a thing", "angry at me", "2017 (I)"] },
          { cells: ["answerable", "answerable **to** the court **for** any lies", "answerable for the court with", "2018 (I)"], pyqExampleId: "3e8ebc55-0d31-465f-9db1-14ce349236ce" },
          {
            cells: ["between / among", "bad blood **between** the two of them", "among the two of them", "2025 (II)"],
            noteAmber: "Two people take 'between'. Use 'among' only for three or more.",
            pyqExampleId: "3a7223df-e85a-4a44-9bdf-19e4bd3de0a9",
          },
          { cells: ["contemporary (noun)", "Patanjali was a contemporary **of** Pushyamitra Sunga.", "a contemporary to", "2019 (I)"], pyqExampleId: "4f515e6c-9be8-44d3-94f0-534b3aa1fe7c" },
          { cells: ["engrossed", "India is fully engrossed **in** the discussion.", "engrossed with", "2017 (II)"], pyqExampleId: "30cbdf3b-e492-4bb8-bbd5-58a97f28ecf5" },
          { cells: ["ignorant", "I am ignorant **of** many things.", "ignorant in", "2017 (II)"], pyqExampleId: "4b80e3a4-39e7-4e48-9e0b-b3f4a4573956" },
          { cells: ["liberalization", "the liberalization **of** her economy", "liberalization to", "2020 (II)"], pyqExampleId: "50b90925-8afe-4edf-8cf9-3dc76cdcc0db" },
          { cells: ["reason", "the reason **for** my absence", "the reason of", "2026 (II)"], pyqExampleId: "c8fc39e2-119f-412d-b5a5-6e6e94e1bf6d" },
          { cells: ["superlative + group", "Iron is the most useful **of** all metals.", "the most useful against all metals", "2019 (II)"], pyqExampleId: "ebc473d8-cff3-4559-bffc-1ed3d6cf6366" },
        ],
        caption: "In the 2026 (II) item, 'insisted on knowing' was correct: 'insist' takes 'on' + -ing.",
      },
      pyqExampleId: "c8fc39e2-119f-412d-b5a5-6e6e94e1bf6d",
      selfCheckExample: {
        prompt: item("She has always been", "fond with", "classical music."),
        steps: [
          "'Fond' is an adjective with a fixed partner.",
          "You are fond **of** something or someone.",
          "The wrong preposition 'with' sits in part (b).",
        ],
        answer: "(b). She has always been fond **of** classical music.",
      },
      practiceSet: [
        { prompt: "Fill the gap: 'He was so engrossed ___ the novel that he missed his stop.'", answer: "in" },
        { prompt: "Fill the gap: 'Share the sweets ___ the three children.'", answer: "among", method: "three or more: among" },
        { prompt: "Fill the gap: 'Everest is the highest ___ all mountains.'", answer: "of", method: "a superlative picks one out of a group with 'of'" },
        { prompt: "Fill both gaps: 'A minister is answerable ___ Parliament ___ his decisions.'", answer: "to, for", method: "answerable to a person or body, for an act" },
      ],
      traps: [
        {
          title: "'The two of them' still means two",
          body: "'Among the two of them' sounds formal, but two people always take 'between'. Count the people or things before you accept 'among'.",
        },
        {
          title: "Angry with a person, at a thing",
          body: "'The boss is angry at me' is marked wrong: a person is angry **with** someone. 'Angry at the delay' or 'angry about the result' is fine, because a delay is a thing.",
        },
        {
          title: "Translating word for word",
          body: "Several Indian languages use one small word where English uses several, so 'reason of', 'ignorant in' and 'married with' feel natural. English wants 'reason **for**', 'ignorant **of**', 'married **to**'.",
        },
        {
          title: "A superlative never takes 'against' or 'than'",
          body: "'Than' belongs to comparatives (taller **than**). A superlative takes 'of' or 'among': 'the most useful **of** all metals'.",
        },
      ],
    },
  ],
};
