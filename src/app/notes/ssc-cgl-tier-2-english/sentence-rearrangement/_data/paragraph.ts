import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ESR_PARAGRAPH_NOTE: SubtopicNote = {
  subtopicName: "Ordering Sentences in a Paragraph",
  title: "Ordering Sentences in a Paragraph",
  oneLineDefinition:
    "Four or five jumbled sentences to be put in the order that makes a clear paragraph, found from the opening sentence, the words that link sentences, and the order of events.",
  whyItMatters:
    "29 of the 38 Tier II rearrangement questions, 19 of them MODERATE. The options usually differ in only one or two places, so one sure pair of sentences often settles the answer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2esrpa-frame",
      name: "The opening sentence and the shape of the argument",
      intuition:
        "A paragraph opens with a sentence that can stand alone: it names the topic and leans on nothing before it. After that the ideas move in a pattern, usually general to particular, or cause to effect, and the conclusion comes last.",
      definition:
        "- **The opener** names its subject in full (not 'it' or 'this') and makes a general statement.\n" +
        "- **Cause to effect:** carbon emissions, then warming, then melting ice, then rising seas.\n" +
        "- **General to particular:** a broad claim first, then examples or numbers.\n" +
        "- **Given first and last:** when the first and last sentences are fixed, read them together; the middle must lead from one to the other.\n" +
        "- **Use the options:** check which sentences the options allow first, and test only those.",
      authoredExample: {
        prompt:
          "Order: A. As a result, many fields now lie dry for most of the year. B. Groundwater in the region has fallen sharply over two decades. C. Farmers are therefore moving to crops that need less water. D. Wells that once lasted all summer now fail by April.",
        steps: [
          "B names the topic and needs nothing before it: the opener.",
          "D gives the first effect (wells failing), A the result for fields, C the farmers' response.",
        ],
        answer: "BDAC",
      },
      selfCheckExample: {
        prompt:
          "Order: P. This leaves many villages without a doctor for weeks. Q. India has far fewer doctors per person than it needs. R. Mobile clinics are one answer now being tried. S. Most of those doctors work in large cities.",
        steps: ["Q states the general problem: the opener.", "S narrows it, P gives the result, R the answer."],
        answer: "QSPR",
      },
      practiceSet: [
        { prompt: "Which sentence opens a paragraph: (a) 'It was finished in two years.' (b) 'The new bridge over the river opened last week.'", answer: "(b), because it names its subject in full" },
        { prompt: "In a cause and effect paragraph, does 'Sea levels are rising' come before or after 'The ice caps are melting'?", answer: "After: the melting causes the rise" },
        { prompt: "A sentence begins 'In short, ...'. Where does it usually go?", answer: "Last, as the conclusion" },
      ],
      pyqExampleId: "21c16184-e3d2-40a0-8f6f-ed3f5d18ccf3",
      traps: [
        {
          title: "Opening with the most dramatic sentence",
          body: "A striking result (roads full of accidents, islands drowning) often comes last, as the effect. The opener is the plain statement of the topic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esrpa-links",
      name: "Pronouns, pointers and linkers",
      intuition:
        "Words like she, it, they, this, these and however point back to something already said. A sentence that uses one cannot come before the sentence it points to, and that fixes pairs.",
      definition:
        "- **Pronouns:** 'She was a masterpiece' must follow the sentence that names the ship. A full name comes before 'he', 'she' or 'it'.\n" +
        "- **This, these, such:** 'these foods', 'this reaction' come after the sentence that introduces the foods or the reaction.\n" +
        "- **Linkers:** 'However' and 'instead' follow the idea they turn against; 'also' and 'additionally' follow the idea they add to.\n" +
        "- **Build pairs:** mark every sure pair (C then B), then pick the option that keeps all of them.",
      authoredExample: {
        prompt:
          "Order: A. It took thousands of workers many years to finish. B. The Taj Mahal was built by Shah Jahan in memory of his wife. C. However, pollution has begun to yellow its white marble. D. Their skill still shows in every carved panel.",
        steps: [
          "B names the Taj Mahal: the opener.",
          "A's 'It' points to the Taj Mahal, and D's 'Their' points to A's workers: A then D. 'However' in C turns against the praise, so it comes last.",
        ],
        answer: "BADC",
      },
      selfCheckExample: {
        prompt:
          "Order: P. They spend most of the day resting in trees. Q. Koalas are found only in Australia. R. Instead, they get almost all their water from the leaves they eat. S. These animals rarely drink water.",
        steps: ["Q names the koalas: the opener.", "'They' in P and 'These animals' in S point back; 'Instead' in R must follow S."],
        answer: "QPSR",
      },
      practiceSet: [
        { prompt: "Which must come first: 'He refused the award.' or 'The writer was offered a national prize.'?", answer: "The writer was offered a national prize." },
        { prompt: "A sentence begins 'These steps ...'. What must come before it?", answer: "A sentence that names or lists the steps" },
        { prompt: "A sentence begins 'However, ...'. What does it follow?", answer: "The idea it contrasts with" },
      ],
      pyqExampleId: "d81e5a65-de24-4775-92e4-692a66211ddd",
      traps: [
        {
          title: "Opening with a sentence that starts with a pronoun",
          body: "'They stand undefeated ...' or 'It was the envy of ...' cannot open, because the reader does not yet know who they or it are.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esrpa-time",
      name: "Time order",
      intuition:
        "A story or a process runs in the order things happened. Time words (yesterday, then, after, at 10 a.m.) are the strongest clues in the paragraph.",
      definition:
        "- **Setting first:** 'Yesterday my friends and I went to...' or 'After the accident...' opens the story.\n" +
        "- **Time markers:** first, then, after that, finally; a clock time comes after the trip it belongs to.\n" +
        "- **Cause before reaction:** the shortage comes before the switch to a substitute; the switch comes before 'however, people still preferred...'.",
      authoredExample: {
        prompt:
          "Order: A. By noon we had reached the top. B. Last Sunday we set out to climb the hill behind our school. C. Then we started up the narrow path. D. We met at the gate at seven in the morning.",
        steps: ["B sets the scene: the opener.", "Then the events in time: meeting at seven (D), climbing (C), reaching the top at noon (A)."],
        answer: "BDCA",
      },
      selfCheckExample: {
        prompt:
          "Order: P. Finally, the bread is baked for thirty minutes. Q. First, flour, water and yeast are mixed. R. The dough is then left to rise for an hour. S. Making bread at home is simple.",
        steps: ["S introduces the topic.", "First (Q), then (R), finally (P)."],
        answer: "SQRP",
      },
      practiceSet: [
        { prompt: "Which comes first: 'We bought the tickets.' or 'We reached the cinema at six.'?", answer: "We reached the cinema at six." },
        { prompt: "Where does a sentence beginning 'Finally, ...' go?", answer: "Last" },
        { prompt: "Which comes first: 'Supplies ran short.' or 'Factories turned to a cheaper material.'?", answer: "Supplies ran short." },
      ],
      pyqExampleId: "3dcb281e-b346-427b-ace1-1e884b120c63",
      traps: [
        {
          title: "Following the order the sentences are printed in",
          body: "The labels A, B, C, D are shuffled on purpose. Rebuild the timeline from the time words, not from the letters.",
        },
      ],
    },
  ],
};
