import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ERC_FACTS_NOTE: SubtopicNote = {
  subtopicName: "Finding Facts in the Passage",
  title: "Finding Facts in the Passage",
  oneLineDefinition:
    "Questions whose answer is stated in the passage: what the passage says about something, or why the author mentions it. The work is finding the right sentence and matching its meaning to an option.",
  whyItMatters:
    "Sixty-four questions in the bank, all from the 2025 shifts and all but one EASY. They are the quickest marks in a passage, because the answer is written there; the only risk is choosing an option that borrows the passage's words but not its meaning.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscercfa-locate",
      name: "Locating the answer line",
      intuition:
        "The question names something from the passage: a person, a term, a cause. Find that name in the passage, read the sentence it sits in and the one after it, and the answer is a restatement of what those sentences say.",
      definition:
        "1. Pick the key word of the question (\"second-generation biofuels\", \"the author's view of cities\").\n" +
        "2. Scan the passage for that word or a close form of it.\n" +
        "3. Read that sentence and the next one in full.\n" +
        "4. Choose the option that says the same thing in other words.\n" +
        "- The right option is usually a paraphrase; an option that repeats the passage word for word but adds or changes one detail is a trap.\n" +
        "- **Fast route:** read the questions before the passage, so you know which key words to watch for as you read.",
      authoredExample: {
        prompt:
          "Passage: \"Honeybees communicate the location of food by a waggle dance. The angle of the dance shows the direction of the flowers, and its length shows how far away they are.\" Question: According to the passage, what does the length of the dance show? (a) The kind of flower (b) The distance to the food (c) The direction of the hive (d) The number of bees needed",
        steps: [
          "Key word: length. The passage says \"its length shows how far away they are\".",
          "\"How far away\" is the distance to the food.",
        ],
        answer: "(b) The distance to the food",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"Mangrove forests protect coasts by breaking the force of waves. Their roots also trap mud, which slowly builds new land.\" Question: According to the passage, how do mangrove roots help? (a) They break the waves (b) They trap mud that builds land (c) They feed fish (d) They stop rain",
        steps: ["Key word: roots. The passage says the roots \"trap mud, which slowly builds new land\".", "Breaking the waves is said of the forests, not the roots."],
        answer: "(b) They trap mud that builds land",
      },
      practiceSet: [
        { prompt: "What should you read before the passage to save time?", answer: "The questions" },
        { prompt: "An option repeats the passage's words exactly but changes one detail. Is it likely to be right?", answer: "No: it is a common trap." },
        { prompt: "Having found the key word in the passage, how much should you read?", answer: "Its sentence and the next one" },
        { prompt: "Is the right answer usually an exact quotation or a restatement?", answer: "A restatement" },
      ],
      pyqExampleId: "20c706fb-26dc-4f1e-9de5-5baa4c0a56bc",
      traps: [
        {
          title: "Answering from memory of the topic",
          body:
            "An option can be true about the world and still not be what the passage says. The answer must come from the passage's own sentences.",
        },
        {
          title: "Reading only the line with the key word",
          body:
            "The answer often finishes in the next sentence. Read one sentence beyond the key word before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscercfa-why",
      name: "Why the author mentions something",
      intuition:
        "\"Why is X mentioned?\" asks for the job X does in the passage: an example of a point, evidence for a claim, a contrast with something else, or a warning. Find the point X sits beside and the job becomes clear.",
      definition:
        "- **Example:** X follows \"for example\", \"such as\", or comes right after a general claim it illustrates.\n" +
        "- **Evidence:** X is a fact or study given to support a claim.\n" +
        "- **Contrast:** X is set against something with \"but\", \"unlike\", \"while\".\n" +
        "- **Reason questions** (\"Why are young buyers important?\"): the answer is the reason the passage gives, often after \"because\" or in the next sentence.\n" +
        "- **Fast route:** read the sentence before X; it usually states the point that X serves.",
      authoredExample: {
        prompt:
          "Passage: \"Many inventions came about by accident. Penicillin, for example, was found when mould grew on a forgotten dish.\" Question: Why does the author mention penicillin? (a) To praise a scientist (b) To give an example of an accidental invention (c) To explain how mould grows (d) To warn about forgotten dishes",
        steps: ["Penicillin follows \"for example\", right after the claim that many inventions came by accident.", "So it is an example of that claim."],
        answer: "(b) To give an example of an accidental invention",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"Desert plants survive dry months in different ways. Cactus stores water in its thick stem, while some grasses simply die back and wait for rain.\" Question: Why are grasses mentioned? (a) To show another way of surviving the dry months (b) To show that grasses need more water than cactus (c) To describe a desert flower (d) To explain rainfall",
        steps: ["The first sentence says plants survive \"in different ways\".", "Grasses, set against cactus with \"while\", are a second way."],
        answer: "(a) To show another way of surviving the dry months",
      },
      practiceSet: [
        { prompt: "An item follows the words \"for example\". What job does it do?", answer: "It illustrates the claim before it." },
        { prompt: "Which sentence should you read first to see why something is mentioned?", answer: "The sentence just before it" },
        { prompt: "An item is introduced with \"unlike\". What job does it usually do?", answer: "It gives a contrast." },
        { prompt: "Where is the reason in a \"why\" question usually found?", answer: "After \"because\", or in the next sentence" },
      ],
      pyqExampleId: "7d3b7cb8-5d5a-462e-9a9c-fe4b509fa4db",
      traps: [
        {
          title: "Describing the item instead of its purpose",
          body:
            "\"Why is geothermal energy mentioned?\" is not answered by a fact about geothermal energy. The answer names the point it serves in the passage, such as an example of a wider use.",
        },
      ],
    },
  ],
};
