import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEA_EXTRA_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Extra, Missing and Place-Time Prepositions",
  title: "Extra, missing and place-time prepositions",
  oneLineDefinition:
    "Some verbs take their object with no preposition at all (discuss the matter, order coffee), a few need one the sentence left out, and place and time words need the right one of in, on, at, to, since and for.",
  whyItMatters:
    "These errors come up across the CDS papers from 2017 to 2025, in both spotting-errors and sentence-improvement items. " +
    "They are hard to see because the extra word sounds normal in everyday Indian English: 'discuss about', 'order for', 'called as'. A quick drop test catches all of them.",
  concepts: [
    // C1 — the drop test for an extra (or missing) preposition
    {
      kind: "formula" as const,
      slug: "cdsensea-extra-prep",
      name: "One preposition too many (or too few): the drop test",
      intuition:
        "Many verbs take their object straight away, with nothing in between: you discuss a plan, you reach a place, you order a meal. These are **transitive verbs**. " +
        "Putting 'about', 'for' or 'at' after them is a very common mistake, and the paper tests it again and again. A few verbs work the other way: in one sense they need a partner the sentence has left out.",
      definition:
        "**The drop test** for an extra preposition:\n" +
        "- Find the verb just before the preposition.\n" +
        "- Drop the preposition. If the verb now takes its object directly and the sentence still makes sense, the verb is **transitive** and the preposition was extra.\n" +
        "- No preposition after: **discuss, consider, order, emphasise, regret, reach, enter, pass** (each other), **describe, resemble, attack**.\n" +
        "**Three more extras the paper uses:**\n" +
        "- **called as**: 'He is called the Father of the Nation', no 'as'. ('Regarded **as**' and 'known **as**' are correct.)\n" +
        "- **as to** before why, how or what: 'No one knows why he did it', not 'knows as to why'.\n" +
        "- **cope up with**: the phrase is 'cope **with**'.\n" +
        "**The reverse error, a missing preposition:**\n" +
        "- Some verbs need a partner in a given sense: '**meet with** a poor response' (receive it), '**deprive** someone **of** something'. The sentence leaves the partner out.",
      authoredExample: {
        prompt: item("The witness", "described about the accident", "in great detail."),
        steps: [
          "Read the whole sentence. 'Described about' sounds normal in everyday speech, which is why it is tested.",
          "Run the drop test on part (b): 'The witness described **the accident**.' The verb takes its object directly.",
          "So 'describe' is transitive and 'about' is an extra word.",
          "Parts (a) and (c) are fine. The word to remove sits in part (b).",
        ],
        answer: "(b). The witness **described the accident** in great detail.",
      },
      selfCheckExample: {
        prompt: item("Nobody can", "deprive a citizen his", "right to vote."),
        steps: [
          "This time a word is missing. 'Deprive' takes a person and then 'of' + the thing taken away.",
          "'Deprive a citizen his right' has no 'of'.",
          "The gap sits inside part (b), after 'citizen'.",
        ],
        answer: "(b). Nobody can deprive a citizen **of** his right to vote.",
      },
      practiceSet: [
        { prompt: "Correct it: 'We reached at the station by noon.'", answer: "We **reached the station** by noon.", method: "'Reach' is transitive; 'arrive at' needs 'at'." },
        { prompt: "Correct it: 'The judge ordered for a fresh inquiry.'", answer: "The judge **ordered a fresh inquiry**.", method: "Drop test: 'ordered a fresh inquiry' works." },
        { prompt: "Correct it: 'Sarojini Naidu is called as the Nightingale of India.'", answer: "Sarojini Naidu is **called the** Nightingale of India.", method: "'Called' takes no 'as'." },
        { prompt: "Correct it: 'She could not cope up with the pressure.'", answer: "She could not **cope with** the pressure." },
      ],
      pyqExampleId: "20cb6d2b-c2f1-4fe3-8510-8327d313b981",
      traps: [
        {
          title: "The noun takes a preposition, the verb does not",
          body: "'A discussion **about** the plan' and 'an emphasis **on** discipline' are correct, because these are nouns. The verbs are bare: 'discuss the plan', 'emphasise discipline'. Do not carry the noun's preposition over to the verb.",
        },
        {
          title: "'Called as' versus 'regarded as'",
          body: "'Called', 'named' and 'termed' take no 'as'. 'Regarded as', 'known as' and 'described as' do take it. Learn the two groups separately.",
        },
        {
          title: "Not every bare verb is an error",
          body: "In a sentence-improvement item the options may offer 'emphasised on', 'emphasised over' and 'emphasised upon'. If the bare verb is already right, the answer is **No improvement**. The same holds for 'cope with': the option 'cope up with' is the trap.",
        },
        {
          title: "'Met' in the sense of 'received'",
          body: "When a plan or appeal receives a reaction, the paper wants '**met with**': 'met with a poor response', 'met with success', 'met with an accident'.",
        },
      ],
    },

    // C2 — place and time
    {
      kind: "reference" as const,
      slug: "cdsensea-place-time",
      name: "Prepositions of place and time: in, on, at, to; since and for",
      intuition:
        "Place words tell you where: **in** a closed space, **on** a surface, **at** a point, **to** a destination. " +
        "Time words split into two kinds: a **point of time** (Monday, 2019, morning) and a **duration**, a length of time (five days, two hours). Each kind takes its own preposition.",
      definition:
        "**Place:**\n" +
        "- **in** = inside a space or area: in the box, in the compartment, in the body, in public places, in a city.\n" +
        "- **on** = on a surface or line: on the table, on the roof, on the road.\n" +
        "- **at** = a point, or a place where an activity happens: at the office, at the station, at the door. Also fixed phrases: **at risk**, at a high speed, at once.\n" +
        "- **to** = movement towards a place: go to school, taken to hospital. **Onto** = moving on to a surface: jumped onto the stage.\n" +
        "**Time:**\n" +
        "- **since** + a point of time: since Monday, since 2019, since morning.\n" +
        "- **for** + a duration: for five days, for the last two hours, for fifteen minutes.\n" +
        "- **from** + a starting point, with an end point: from Monday **to** Friday.\n" +
        "- With since and for, the verb is usually in a perfect tense: 'It **has been** raining for two hours.'",
      table: {
        columns: ["Correct use", "Wrong form in the paper", "Rule", "Sitting"],
        rows: [
          { cells: ["**For** the last five days it has been raining.", "From the last five days", "for + a duration", "2017 (I)"], pyqExampleId: "43c10859-cdc8-45dd-a8c1-039dc29a6ec0" },
          { cells: ["**For** the fifteen minutes that she drives, ...", "Since the 15 minutes", "for (or during) + a duration; since needs a point", "2019 (I)"], pyqExampleId: "fa0f09e2-bfc5-4e5a-af05-f44d0faf1243" },
          { cells: ["whims and fancies **in** public places", "on public places", "in = within an area", "2020 (II)"], pyqExampleId: "192ed6fd-4e33-4474-9415-9a50cdd5a0e8" },
          { cells: ["Food is converted **in** the body into glucose.", "converted on the body", "in = inside", "2022 (II)"], pyqExampleId: "cb99632c-80af-4ce8-b286-921cc1b04a68" },
          { cells: ["after five hours **at** the office", "five hours of office", "at = a place of activity", "2022 (II)"], pyqExampleId: "71306fe1-d077-49d8-abd1-b488e5f7e0fa" },
          { cells: ["A species is **at** a very high risk of extinction.", "in a very high risk", "fixed phrase: at risk", "2021 (I)"], pyqExampleId: "88b04a82-0211-400d-9271-143b530fb91c" },
          { cells: ["The boy was taken **to** hospital.", "taken onto hospital", "to = movement to a destination", "2024 (II)"], pyqExampleId: "4c2fd5c7-2831-414d-9b66-44b8f8a73eda" },
          { cells: ["baggage discovered **in** the luggage compartment", "on the luggage compartment", "in = inside a closed space", "2025 (I)"], pyqExampleId: "5470b4c0-aa21-4c26-b045-5d16bf950269" },
        ],
      },
      pyqExampleId: "43c10859-cdc8-45dd-a8c1-039dc29a6ec0",
      selfCheckExample: {
        prompt: item("He always keeps", "his documents on", "a locked drawer."),
        steps: [
          "A drawer is a closed space: things go inside it.",
          "Inside a closed space takes 'in', not 'on'.",
          "The wrong preposition 'on' sits in part (b).",
        ],
        answer: "(b). He always keeps his documents **in** a locked drawer.",
      },
      practiceSet: [
        { prompt: "Fill the gap: 'I have lived in Pune ___ 2019.'", answer: "since", method: "2019 is a point of time" },
        { prompt: "Fill the gap: 'The injured man was rushed ___ hospital.'", answer: "to", method: "movement to a destination" },
        { prompt: "Fill the gap: 'The coins were found ___ the bottom of the well.'", answer: "at", method: "a point" },
        { prompt: "Fill the gap: 'Several old buildings in the city are ___ risk of collapse.'", answer: "at", method: "fixed phrase: at risk" },
      ],
      traps: [
        {
          title: "'From' needs an end point",
          body: "'From' marks a start and pairs with 'to' or 'till': 'from June to August'. To say how long something has gone on up to now, use 'for' (a length) or 'since' (a starting point), never 'from' alone.",
        },
        {
          title: "Since + point, for + length",
          body: "'Since 2019', 'since morning', 'since he left': a point. 'For six years', 'for the last hour', 'for fifteen minutes': a length. 'Since ten years' and 'since the fifteen minutes' are both wrong.",
        },
        {
          title: "In a car, but on a bus",
          body: "Small closed spaces take 'in': in a car, in a drawer, in a compartment. Large public transport takes 'on': on a bus, on a train, on a plane. Do not apply one rule to both.",
        },
        {
          title: "Onto is only for surfaces",
          body: "'Onto' means moving on to a surface: 'climbed onto the roof'. A destination such as a hospital, a school or a city takes 'to'.",
        },
      ],
    },
  ],
};
