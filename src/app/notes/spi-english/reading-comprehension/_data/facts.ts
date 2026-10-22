import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_RC_FACTS_NOTE: SubtopicNote = {
  subtopicName: "Finding Stated Facts",
  title: "Finding Stated Facts",
  oneLineDefinition:
    "Most passage questions are answered by one line of the passage. Find that line first, then pick the option that says what it says, no more and no less.",
  whyItMatters:
    "Ten questions in the bank on two short passages, one about frogs and one about a CBSE ruling: six EASY and four MODERATE. Each answer sits in one line, so the marks go to the student who finds that line and cuts the options that only nearly match it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spircfa-find-line",
      name: "Find the line before you choose",
      intuition:
        "The passage is the answer book. Do not answer from memory of what you read, or from what you know about the topic. Go back, find the sentence the question is about, and read the options against it.",
      definition:
        "The method:\n" +
        "- Read the question and pick out its **key word** (frogs eat, the ruling, the problem, the threat).\n" +
        "- Scan the passage for that word or a word that means the same.\n" +
        "- Read that sentence, and the one before and after it.\n" +
        "- Choose the option that says what the line says. If the line gives two things, the right option gives both.\n" +
        "- Watch the small words in the line: **adult**, **some**, **most**, **only**. An option that drops one says something the passage did not.",
      authoredExample: {
        prompt:
          "Passage: 'Bees carry pollen from flower to flower. Without them, many fruit trees would give much less fruit. A single hive can visit thousands of flowers in a day.' Question: Why are bees useful to fruit growers? (a) They make honey. (b) They carry pollen, so the trees give more fruit. (c) They keep pests away. (d) They live in hives.",
        steps: [
          "Key word: useful to fruit growers, so look for fruit.",
          "The line: without bees, many fruit trees would give much less fruit, because bees carry pollen.",
          "(b) says exactly that. (a) honey and (c) pests are never mentioned. (d) is in the passage but does not answer why.",
        ],
        answer: "(b) They carry pollen, so the trees give more fruit.",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Camels can go a week without water, and grown camels can drink up to 100 litres at one time.' Question: How much can a grown camel drink at one time? (a) A week's water (b) Up to 100 litres (c) As much as it finds (d) Nothing definite is known",
        steps: [
          "Key words: drink at one time.",
          "The line: grown camels can drink up to 100 litres at one time.",
          "(b) repeats it. The others are not in the line.",
        ],
        answer: "(b) Up to 100 litres",
      },
      practiceSet: [
        {
          prompt:
            "Passage: 'The library opens at nine and closes at five, except on Sundays, when it is shut.' On which day is the library shut?",
          answer: "Sunday",
        },
        {
          prompt:
            "Passage: 'Trees give shade in summer and hold the soil together in the rains.' Which option gives both reasons the passage names for trees being useful: (a) shade only (b) shade and holding the soil (c) fruit and wood?",
          answer: "(b) shade and holding the soil",
          method: "The line names two things, so the right option names both.",
        },
        {
          prompt:
            "Passage: 'Young parrots learn words quickly.' True or false according to the passage: 'All parrots learn words quickly.'",
          answer: "False",
          method: "The passage says young parrots. Dropping 'young' changes the claim.",
        },
        {
          prompt:
            "Passage: 'When the river floods, the farmers lose their crops.' According to the passage, what happens to the farmers when the river floods?",
          answer: "They lose their crops.",
        },
      ],
      pyqExampleId: "afa6bb45-2457-4ced-9b21-8f7572bfb599",
      traps: [
        {
          title: "Half of the line",
          body:
            "When the line gives two reasons, an option giving only one of them is incomplete. Pick the option that covers the whole line, even if the half option is true.",
        },
        {
          title: "Dropping a small word",
          body:
            "If the passage says an adult animal does something, an option saying any animal does it claims more than the passage. Prefer the option that keeps the passage's own limit.",
        },
        {
          title: "Answering from what you know",
          body:
            "An option can be true in real life and still be wrong. The question asks what the passage says. If no line backs the option, cut it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spircfa-cut-options",
      name: "Cut the options that nearly match",
      intuition:
        "The wrong options are built from the passage's own words, so they all look familiar. Each one is wrong in a small, fixed way. Learn the ways and you can cut three options and keep the fourth.",
      definition:
        "Four ways a wrong option is built:\n" +
        "- **Not in the passage**: it fits the topic, but no line says it.\n" +
        "- **Wrong person**: the passage says one person or group did or thought it, the option gives it to another.\n" +
        "- **Reason swapped for result**: the option names a later effect as if it were the direct one.\n" +
        "- **Their view, not the writer's**: the passage reports what someone believes, and the option states it as the answer to a different question.\n" +
        "Cut every option you can, then check the one left against its line.",
      authoredExample: {
        prompt:
          "Passage: 'The coach said the team lost because the players were tired after a long bus journey. The captain blamed the wet ground.' Question: According to the coach, why did the team lose? (a) The ground was wet. (b) The players were tired after the journey. (c) The other team was stronger. (d) The captain played badly.",
        steps: [
          "The question asks for the coach's reason, so find the coach's line.",
          "(a) is in the passage but it is the captain's reason: wrong person. Cut.",
          "(c) and (d) are not in the passage. Cut.",
          "(b) is the coach's line.",
        ],
        answer: "(b) The players were tired after the journey.",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Heavy rain blocked the roads, so the milk vans could not reach the town, and the shops ran out of milk.' What was the direct result of the heavy rain? (a) The shops ran out of milk. (b) The roads were blocked. (c) People stopped buying milk. (d) The vans broke down.",
        steps: [
          "The chain is: rain, then blocked roads, then no vans, then no milk.",
          "The direct result of the rain is the first link: blocked roads.",
          "(a) is a later result. (c) and (d) are not in the passage.",
        ],
        answer: "(b) The roads were blocked.",
      },
      practiceSet: [
        {
          prompt:
            "Passage: 'The teacher praised Meena's drawing, and Ravi won the race.' According to the passage, who won the race?",
          answer: "Ravi",
          method: "Meena is praised for drawing; the race belongs to Ravi.",
        },
        {
          prompt:
            "Passage: 'The town built a new bridge so that buses could reach the village.' Is 'The bridge was built to reduce floods' stated in the passage?",
          answer: "No, it is not in the passage.",
        },
        {
          prompt:
            "Passage: 'Cold weather kept the farmers indoors, so the fields were not ploughed in time.' What was the direct result of the cold weather?",
          answer: "The farmers stayed indoors.",
          method: "Late ploughing is the next link in the chain, not the first.",
        },
        {
          prompt:
            "Passage: 'The shopkeepers believe that bright lights bring in customers.' Does the writer say that bright lights bring in customers?",
          answer: "No. The writer reports what the shopkeepers believe.",
        },
      ],
      pyqExampleId: "f8b23c86-e806-4100-bad7-5b23171480ea",
      traps: [
        {
          title: "Giving a group's words to another group",
          body:
            "If the passage says the players were tired, an option saying the coach was tired is a different claim. Check who the line is about.",
        },
        {
          title: "Taking someone's reason for the problem",
          body:
            "A passage often reports why people do a thing and then names the real problem. The reason they give is not the problem the question asks for.",
        },
        {
          title: "A later result for the direct one",
          body:
            "When one thing leads to another and then to a third, the question 'what happens when' wants the next link the passage names, not the end of the chain.",
        },
      ],
    },
  ],
};
