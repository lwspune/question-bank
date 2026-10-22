import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_RC_INFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Inference and the Writer's Meaning",
  title: "Inference and the Writer's Meaning",
  oneLineDefinition:
    "Some questions ask what the passage suggests, or what the writer means by a line. The answer is one short step from the words, never a guess and never a fact from outside.",
  whyItMatters:
    "Eight questions in the bank, all on one passage from the 2022 paper: four EASY, two MODERATE and two HARD. The hard ones ask what a line suggests, or offer 'None of these' and 'Cannot be said', so you must know whether the passage states a point, implies it or never gives it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spircin-three-kinds",
      name: "Stated, implied or not given",
      intuition:
        "Before you pick an option, sort it. Either the passage says it in words, or the words lead to it in one step, or the passage never gives it. Only the first two can be right.",
      definition:
        "Three kinds of option:\n" +
        "- **Stated**: a line says it, perhaps in other words.\n" +
        "- **Implied**: a line does not say it, but it must be true if the line is true.\n" +
        "- **Not given**: it might be true, but no line proves it.\n" +
        "The special options:\n" +
        "- **All of these**: choose it only if every option is stated or implied. One unproved option sinks it.\n" +
        "- **None of these**: choose it when you have found the line and no option matches it.\n" +
        "- **Cannot be said** (inadequate information): choose it when the passage truly never gives the answer, not because the answer is hard to find.",
      authoredExample: {
        prompt:
          "Passage: 'Asha missed the morning bus, so she walked the three kilometres to school and reached after the bell.' Sort each: (1) Asha walked to school. (2) Asha was late. (3) Asha's mother was angry.",
        steps: [
          "(1) A line says she walked: stated.",
          "(2) She reached after the bell, so she must have been late: implied.",
          "(3) Her mother is never mentioned: not given.",
        ],
        answer: "(1) stated, (2) implied, (3) not given.",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'The new road was opened in May. Since then, trucks reach the market in half the time.' Question: Who paid for the new road? (a) The traders (b) The state (c) The truck owners (d) Cannot be said",
        steps: [
          "Look for a line about payment. There is none.",
          "No option is stated or implied, and the passage never gives the answer.",
        ],
        answer: "(d) Cannot be said",
      },
      practiceSet: [
        {
          prompt:
            "Passage: 'The lamp in the window was still burning at dawn.' Stated, implied or not given: 'Someone left the lamp burning all night.'",
          answer: "Implied",
          method: "Burning at dawn means it burned through the night.",
        },
        {
          prompt:
            "Passage: 'The lamp in the window was still burning at dawn.' Stated, implied or not given: 'The lamp used kerosene.'",
          answer: "Not given",
        },
        {
          prompt:
            "Passage: 'Raju is honest, hardworking and kind.' Which is right: (a) honest (b) hardworking (c) kind (d) all of these?",
          answer: "(d) all of these",
          method: "The line states all three.",
        },
        {
          prompt:
            "Passage: 'The guard is tall and strict.' When should you choose 'All of these' for the options (a) tall (b) strict (c) old?",
          answer: "Never: 'old' is not given, so 'All of these' is wrong.",
        },
      ],
      traps: [
        {
          title: "Cannot be said, chosen too early",
          body:
            "'Inadequate information' is right only when no line gives the answer. If a line gives even a small clue the question asks you to use, the answer is that clue, not 'cannot be said'.",
        },
        {
          title: "All of these with one weak option",
          body:
            "Check every option before choosing 'All of these'. If one of them is only a guess, that option is wrong and so is 'All of these'.",
        },
        {
          title: "None of these when the right words are missing",
          body:
            "If the passage has a line that answers the question and none of the four options repeats it or follows from it, 'None of these' is the answer. Do not force the nearest option to fit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spircin-meaning",
      name: "What the writer means by a line",
      intuition:
        "A quoted line often says one thing on the surface and makes a point in its place in the passage. Ask why the writer put the line there: what does it show about the people, or what is the writer arguing?",
      definition:
        "The method:\n" +
        "- Read the quoted line, then the lines around it.\n" +
        "- Ask: what is the writer showing or arguing with this line?\n" +
        "- Pick the option that states that point in one step. Cut options that only repeat the line's surface words, or that blame or praise someone the line does not.\n" +
        "- For 'what is suggested' or 'who is likely' questions, use the clue the passage gives, and do not add a story of your own.\n" +
        "- Words like **likely**, **suggests**, **implies** and **indicated** mean an inference is wanted, not a quoted fact.",
      authoredExample: {
        prompt:
          "Passage: 'People call a greedy man a vulture. Yet a vulture eats only what is already dead and harms no living thing.' What does the writer mean? (a) Vultures are greedy birds. (b) Calling a greedy man a vulture is unfair to the vulture. (c) Vultures should be protected by law. (d) Greedy men eat too much.",
        steps: [
          "The first line gives the common view: a vulture stands for greed.",
          "The second line, with 'Yet', shows the vulture does no harm to the living.",
          "So the writer is saying the comparison is unfair to the bird: (b).",
          "(a) is the common view the writer argues against. (c) and (d) are not in the lines.",
        ],
        answer: "(b) Calling a greedy man a vulture is unfair to the vulture.",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Grandfather put on his old uniform, polished his medals and sat by the door long before the parade began.' What does the line suggest about him? (a) He was proud of his years in the army. (b) He was the oldest man in town. (c) He wanted to lead the parade. (d) He disliked parades.",
        steps: [
          "The clues: old uniform, polished medals, waiting early.",
          "One step from these: he valued his army years and looked forward to the parade.",
          "(b) and (c) need facts not given. (d) goes against the clues.",
        ],
        answer: "(a) He was proud of his years in the army.",
      },
      practiceSet: [
        {
          prompt:
            "Passage: 'Even the stray dogs went quiet when the headmaster walked past.' What does the writer suggest about the headmaster?",
          answer: "He was strict and feared.",
        },
        {
          prompt:
            "Passage: 'Of the two brothers, only Arun could read the letter aloud.' Which is the inference: (a) Arun could read and his brother could not (b) Arun was a teacher?",
          answer: "(a) Arun could read and his brother could not",
          method: "(b) needs a fact the line does not give.",
        },
        {
          prompt:
            "Passage: 'She wiped her eyes and smiled when her son walked through the gate.' What does the line show about how she felt?",
          answer: "She was deeply relieved and happy to see him.",
        },
        {
          prompt:
            "Which word in a question tells you an inference is wanted, not a quoted fact: 'according to', 'likely' or 'states'?",
          answer: "'likely'",
        },
      ],
      pyqExampleId: "772408d7-3f37-4825-b8f3-34cd0983eab8",
      traps: [
        {
          title: "Repeating the surface of the line",
          body:
            "When the writer contrasts a common view with his own, the option that repeats the common view is a trap. The writer's meaning is the point he makes against it.",
        },
        {
          title: "Adding your own story",
          body:
            "An inference uses only the passage's clues. If you need to imagine a fact the passage never gives, such as who paid or who was punished, the option is too far.",
        },
        {
          title: "Reading a feeling as giving up",
          body:
            "Tiredness, waiting or crying shows misery, not that a person has lost hope. Choose the option whose line says the exact point the question names.",
        },
      ],
    },
  ],
};
