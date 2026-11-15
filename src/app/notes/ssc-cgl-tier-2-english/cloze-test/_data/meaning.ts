import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ECZ_MEANING_NOTE: SubtopicNote = {
  subtopicName: "Cloze: Meaning and the Precise Word",
  title: "Cloze: Meaning and the Precise Word",
  oneLineDefinition:
    "Blanks where every option fits the grammar, so the answer is the word English pairs with its neighbour or the word the passage's meaning needs.",
  whyItMatters:
    "23 of the 35 Tier II cloze questions, 18 EASY and 5 MODERATE. All five MODERATE cloze questions are here, and each turns on reading the sentences before and after the blank.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2eczmn-collocation",
      name: "The word English pairs with its neighbour",
      intuition:
        "Several options can mean roughly the right thing, but only one is the word English uses with the next or previous word: gain momentum, public trust, source of energy, generations to come.",
      definition:
        "Pairs Tier II cloze passages have used:\n" +
        "- **gain** momentum, **engage** in dialogue, **consist** of\n" +
        "- public **trust**, source of **energy**, human rights **violations**\n" +
        "- the **fact** that, **tied** to (prices), **generations** to come\n" +
        "- **inhibiting** soil nutrients (holding back their action)\n" +
        "Fast route: read the gap with the word next to it and ask which pair you have heard before.",
      authoredExample: {
        prompt: "Fill the gap: The campaign ___ support quickly once the video was shared. (a) earned (b) gained (c) won (d) took",
        steps: ["Support is something a campaign builds up.", "The usual pair is 'gained support' (like gained momentum)."],
        answer: "(b) gained",
      },
      selfCheckExample: {
        prompt: "Fill the gap: Doctors enjoy a high level of public ___. (a) belief (b) idea (c) trust (d) thought",
        steps: ["The phrase is about how much people rely on doctors.", "English says 'public trust'."],
        answer: "(c) trust",
      },
      practiceSet: [
        { prompt: "Fill the gap: Wind is a clean ___ of power. (source / symbol)", answer: "source" },
        { prompt: "Fill the gap: Students should ___ in debate with respect. (engage / coincide)", answer: "engage" },
        { prompt: "Fill the gap: Farm incomes are closely ___ to the monsoon. (tied / tightly)", answer: "tied" },
      ],
      pyqExampleId: "7c483402-990f-4749-8e02-01c77560abc4",
      traps: [
        {
          title: "Choosing a near-synonym",
          body: "Belief, idea and trust are close in meaning, but only 'public trust' is the fixed phrase. The partner word decides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2eczmn-passage",
      name: "The word the passage's meaning needs",
      intuition:
        "Here the clue is not next to the gap but in the sentence before or after. A passage about solving a problem needs 'mitigate', not 'widen'; a sentence that goes on 'it has risen by 5%' needs 'recovered'.",
      definition:
        "- **Read on past the gap.** The next sentence often explains it: 'the rupee has ___ somewhat ... It has risen by almost 5%'.\n" +
        "- **Find the direction.** Is the passage for or against, rising or falling? Remove options that point the wrong way.\n" +
        "- **Match pairs inside a sentence.** 'poverty of ___ but also of ___' wants two kinds of lack, here loneliness and spirituality.\n" +
        "- **Watch the strength.** 'Reached its ___ in 1789' wants a high point: pinnacle, not middle.",
      authoredExample: {
        prompt: "Fill the gap: To ___ the damage from floods, the city built new drains. (a) increase (b) reduce (c) ignore (d) spread",
        steps: ["The city is acting against the damage.", "Only 'reduce' points that way."],
        answer: "(b) reduce",
      },
      selfCheckExample: {
        prompt: "Fill the gap: After a weak start, sales ___ in the second half and ended the year 8% higher. (a) collapsed (b) recovered (c) halted (d) vanished",
        steps: ["The sentence ends 8% higher.", "So sales came back up: recovered."],
        answer: "(b) recovered",
      },
      practiceSet: [
        { prompt: "Fill the gap: The festival reached its ___ on the final night with fireworks. (peak / start)", answer: "peak" },
        { prompt: "Fill the gap: Laws that ___ unfair treatment should be removed. (perpetuate / cease)", answer: "perpetuate" },
        { prompt: "Fill the gap: The river is honoured in ___ across the country. (cultures / scenes)", answer: "cultures" },
      ],
      pyqExampleId: "76f5d059-f963-4f2a-a462-3c5d827a0283",
      traps: [
        {
          title: "Answering from one sentence",
          body: "A word can fit its own sentence and still contradict the next one. Read one sentence past the gap before choosing.",
        },
      ],
    },
  ],
};
