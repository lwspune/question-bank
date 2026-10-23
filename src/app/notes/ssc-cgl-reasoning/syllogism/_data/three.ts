import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSY_THREE_NOTE: SubtopicNote = {
  subtopicName: "Three-Statement Syllogism",
  title: "Three-Statement Syllogism",
  oneLineDefinition:
    "Three statements that link four groups in a chain, with two or three conclusions to test, some of them about what is possible rather than what is certain.",
  whyItMatters:
    "Ninety-four questions in the bank, 41 from the 2023 shifts, 40 from the 2024 shifts and 13 from the 2025 shifts, with 62 EASY and 32 MODERATE. The rules are the two-statement ones used twice along the chain, so the work is finding which pair of statements each conclusion depends on.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsyth-chain",
      name: "Following a chain of All and Some",
      intuition:
        "Three statements usually form a chain: A with B, B with C, C with D. A conclusion about two groups depends only on the statements that connect them. Find that path, apply the joining rules step by step, and stop as soon as a step gives nothing definite.",
      definition:
        "1. Write the chain in order: A, B, C, D, with All or Some between each pair.\n" +
        "2. For each conclusion, find the two groups it names and the statements between them.\n" +
        "3. Join step by step. All then All stays All; Some then All gives Some; a Some followed by a Some, or an All followed by a Some, breaks the chain.\n" +
        "4. Many conclusions are just one statement turned round (\"Some C are B\" from \"Some B are C\"). Check those first: they follow at once.\n" +
        "- **Fast route:** once one conclusion fails, strike every option that includes it, and test only the conclusions the remaining options differ on.",
      authoredExample: {
        prompt:
          "Statements: All bats are balls. Some balls are bells. All bells are books. Conclusions: I. Some balls are books. II. Some bats are bells. III. Some books are balls. Which conclusions follow?",
        steps: [
          "I: some balls are bells and all bells are books, so those balls are books. I follows.",
          "II: the balls that are bells need not be bats, so II does not follow.",
          "III: it is I turned round, so it follows.",
        ],
        answer: "I and III",
      },
      selfCheckExample: {
        prompt:
          "Statements: All ants are bees. All bees are cows. All cows are dogs. Conclusions: I. All ants are dogs. II. Some dogs are bees. Which conclusions follow?",
        steps: [
          "I: All, All, All stays All, so all ants are dogs. I follows.",
          "II: all bees are cows and all cows are dogs, so all bees are dogs; turned round, some dogs are bees. II follows.",
        ],
        answer: "Both I and II",
      },
      practiceSet: [
        { prompt: "In the chain All A are B, Some B are C, All C are D, does \"Some B are D\" follow?", answer: "Yes", method: "Some B are C, and all C are D." },
        { prompt: "In the same chain, does \"Some A are D\" follow?", answer: "No", method: "The Bs that are C need not be As." },
        { prompt: "Statements: Some X are Y. Some Y are Z. Some Z are W. Does \"Some W are Z\" follow?", answer: "Yes: it is the last statement turned round." },
        { prompt: "Which conclusions should you check first?", answer: "Those that just turn one statement round." },
      ],
      pyqExampleId: "aa5c3352-d7cf-4bf9-9eaa-4a5edc5da2f7",
      traps: [
        {
          title: "Carrying an All across a Some",
          body:
            "All bats are balls and some balls are bells does not put any bat among the bells. Once the chain reaches a Some after an All, nothing definite carries past it.",
        },
        {
          title: "Taking the order of the words for the order of the chain",
          body:
            "\"Some books are balls\" and \"Some balls are books\" say the same thing. Read which groups a conclusion links, not which comes first in the sentence.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsyth-no",
      name: "Chains with a No statement",
      intuition:
        "A No statement in the chain keeps two groups apart. Whatever lies inside one of them is kept apart from the other, but things outside them are not, so the safe conclusions are a No for groups inside, or a Some ... are not.",
      definition:
        "- **Inside a group kept apart:** if All A are B and No B is C, then No A is C.\n" +
        "- **Overlapping a group kept apart:** if Some A are B and No B is C, then Some A are not C.\n" +
        "- **Beyond the No:** a No statement says nothing about groups that only overlap the far side. In \"Some A are B, No B is C, Some C are D\", nothing definite links A and D.\n" +
        "- A conclusion that contradicts a No statement (\"Some B are C\" against \"No B is C\") never follows.\n" +
        "- **Fast route:** find the No statement first, then ask for each conclusion whether its groups are fully inside the two kept apart.",
      authoredExample: {
        prompt:
          "Statements: Some keys are locks. All locks are doors. No door is a window. Conclusions: I. Some keys are doors. II. Some keys are not windows. III. No lock is a window. Which conclusions follow?",
        steps: [
          "I: some keys are locks and all locks are doors, so those keys are doors. I follows.",
          "II: those keys are doors, and no door is a window, so they are not windows. II follows.",
          "III: all locks are doors and no door is a window, so no lock is a window. III follows.",
        ],
        answer: "All three",
      },
      selfCheckExample: {
        prompt:
          "Statements: All pins are clips. No clip is a ring. Some rings are bands. Conclusions: I. No pin is a ring. II. Some bands are not clips. Which conclusions follow?",
        steps: [
          "I: all pins are clips and no clip is a ring, so no pin is a ring. I follows.",
          "II: some rings are bands and no ring is a clip, so those bands are not clips. II follows.",
        ],
        answer: "Both I and II",
      },
      practiceSet: [
        { prompt: "All A are B and No B is C. What follows about A and C?", answer: "No A is C" },
        { prompt: "Some A are B, No B is C, Some C are D. Does anything definite link A and D?", answer: "No" },
        { prompt: "The statements say \"No B is C\". Can the conclusion \"Some B are C\" follow?", answer: "No: it contradicts a statement." },
        { prompt: "Some A are B and No B is C. Does \"No A is C\" follow?", answer: "No: only \"Some A are not C\" follows." },
      ],
      pyqExampleId: "8b5997ce-b0b5-4b8a-84bc-7352be1ece2e",
      traps: [
        {
          title: "Spreading a No to the whole group",
          body:
            "Some A are B and No B is C keeps only the As that are B away from C. Other As may still be C, so \"No A is C\" does not follow.",
        },
        {
          title: "Drawing a conclusion across the No",
          body:
            "A No statement separates two groups; it does not link the groups on either side. Groups joined to the far side by Some statements stay unlinked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsyth-possible",
      name: "Conclusions about what is possible",
      intuition:
        "Some conclusions do not claim a fact; they claim a possibility: \"Some A can be C\" or \"All A being C is a possibility\". Such a conclusion follows unless a statement rules it out, which only a No statement, or an All that forces the opposite, can do.",
      definition:
        "- **A possibility follows** when the statements leave room for it: there is no definite link either way, and nothing forbids it.\n" +
        "- **It does not follow** when a statement rules it out: \"Some A can be C\" fails if No A is C is already certain.\n" +
        "- \"All A can never be C\" follows when some A are certainly not C, or when No A is C.\n" +
        "- \"At least some A are C\" is a definite claim, not a possibility; test it with the joining rules.\n" +
        "- **Fast route:** for each possibility conclusion, look only for a No statement that forbids it. If there is none, it follows.",
      authoredExample: {
        prompt:
          "Statements: All dogs are pets. Some pets are cats. Conclusions: I. Some dogs can be cats. II. All cats being pets is a possibility. Which conclusions follow?",
        steps: [
          "I: nothing definite links dogs and cats, and nothing forbids an overlap, so it is possible. I follows.",
          "II: some cats are pets, and nothing stops the rest from being pets too. II follows.",
        ],
        answer: "Both I and II",
      },
      selfCheckExample: {
        prompt:
          "Statements: All dogs are pets. No pet is a fox. Conclusions: I. Some dogs can be foxes. II. Some foxes can be pets. Which conclusions follow?",
        steps: [
          "I: all dogs are pets and no pet is a fox, so no dog is a fox. The possibility is ruled out.",
          "II: no pet is a fox, so no fox can be a pet. Ruled out too.",
        ],
        answer: "Neither",
      },
      practiceSet: [
        { prompt: "Statements: Some A are B. Some B are C. Does \"Some A can be C\" follow?", answer: "Yes: nothing rules it out." },
        { prompt: "Statements: No A is B. Does \"Some A can be B\" follow?", answer: "No" },
        { prompt: "Statements: Some A are B, and No B is C. Does \"All A can never be C\" follow?", answer: "Yes: the As that are B are certainly not C." },
        { prompt: "Is \"At least some A are C\" a possibility or a definite claim?", answer: "A definite claim" },
      ],
      pyqExampleId: "2668559f-b98d-4c9e-ab4b-e427cadbbdbc",
      traps: [
        {
          title: "Rejecting a possibility because it is not certain",
          body:
            "\"Some A can be C\" does not need a definite link. It follows as long as no statement forbids it, which is exactly the case when the chain breaks.",
        },
        {
          title: "Treating \"At least some\" as a possibility",
          body:
            "\"At least some A are C\" claims that it is true, not that it could be. Test it like any definite conclusion.",
        },
      ],
    },
  ],
};
