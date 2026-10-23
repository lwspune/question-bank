import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RST_CONCLUSIONS_NOTE: SubtopicNote = {
  subtopicName: "Statement and Conclusions",
  title: "Statement and Conclusions",
  oneLineDefinition:
    "A short statement and two conclusions or inferences: a conclusion follows only if the statement says it or plainly implies it, without adding anything new.",
  whyItMatters:
    "Twenty-nine questions in the bank, all from the 2025 shifts, with 23 EASY and 6 MODERATE. The wrong conclusions are almost always ones that go further than the statement, so the skill is spotting the word or idea the statement never gave you.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrstco-follows",
      name: "What the statement does and does not say",
      intuition:
        "Treat the statement as the only fact you know, even if real life suggests more. A conclusion follows if it restates the statement or is the plain meaning behind it. It fails if it needs a fact the statement never gave, claims more than the statement does, or says the opposite.",
      definition:
        "- **Follows:** says the same thing in other words, or is the direct, obvious meaning (a closed library cannot be used).\n" +
        "- **Does not follow:** adds a new fact, cause or forecast; goes from \"some\" or \"most\" to \"all\"; or contradicts the statement.\n" +
        "- **Warning words:** all, only, never, always, must, will certainly. A conclusion with one of these usually claims more than the statement does.\n" +
        "- **Softer words:** may, can, likely. A conclusion worded this way often follows when the statement points that way.\n" +
        "- **Fast route:** test each conclusion with one question: \"Could the statement be true and this conclusion false?\" If yes, it does not follow.",
      authoredExample: {
        prompt:
          "Statement: The museum is closed every Monday. Conclusions: I. The museum is open on Tuesday. II. Visitors cannot enter the museum on a Monday. Which conclusions follow?",
        steps: [
          "I: the statement says nothing about Tuesday. The museum could be closed then too. I does not follow.",
          "II: a museum closed every Monday cannot be entered on a Monday. II follows.",
        ],
        answer: "Only II",
      },
      selfCheckExample: {
        prompt:
          "Statement: The price of onions rose sharply after heavy rain damaged the crop. Conclusions: I. Weather can affect onion prices. II. Onion prices will stay high all year. Which conclusions follow?",
        steps: [
          "I: the statement links damage from rain to a price rise, so weather can affect prices. I follows.",
          "II: the statement says nothing about how long prices stay high; \"all year\" adds a forecast. II does not follow.",
        ],
        answer: "Only I",
      },
      practiceSet: [
        { prompt: "Which words in a conclusion most often make it claim more than the statement?", answer: "All, only, never, always, must" },
        { prompt: "Statement: The shop accepts only cash. Does \"The shop does not accept card payments\" follow?", answer: "Yes" },
        { prompt: "Statement: The train leaves at 6 AM. Does \"A passenger must arrive by 6 AM to catch it\" follow?", answer: "Yes" },
        { prompt: "A conclusion needs a fact the statement never gives. Does it follow?", answer: "No" },
      ],
      pyqExampleId: "cdd66ebd-5084-4bf9-9f28-5dddef4bd48b",
      traps: [
        {
          title: "Using what you know instead of what is stated",
          body:
            "A conclusion can be true in real life and still not follow. If the statement does not give it, it does not follow, however sensible it sounds.",
        },
        {
          title: "Turning \"affects\" into \"prevents\"",
          body:
            "\"Noise affects children's concentration\" does not mean children cannot study at all. A conclusion that turns a partial effect into a total one goes too far.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrstco-criteria",
      name: "Applying a stated rule or criterion",
      intuition:
        "Some questions give a set of rules, such as the conditions for a job, and a case. The answer is a check, condition by condition: the case passes only if it meets every one.",
      definition:
        "1. List the conditions one by one: marks, speed, certificate, age.\n" +
        "2. Check the case against each. A range such as \"18 to 28 years\" includes both ends.\n" +
        "3. The case is eligible only if every condition is met. If one fails, the answer names that condition.\n" +
        "- **Fast route:** check the conditions in the order the options name them, and stop at the first that fails.",
      authoredExample: {
        prompt:
          "Conditions: a graduate with at least 55% marks, aged 21 to 30, with a driving licence. Case: Meena is a graduate with 58% marks, aged 31, and has a licence. Is she eligible?",
        steps: [
          "Marks: 58% meets 55%. Licence: she has one.",
          "Age: 31 is above 30, so this condition fails.",
        ],
        answer: "Not eligible, because of her age",
      },
      selfCheckExample: {
        prompt:
          "Conditions: at least 50% in Class 12, a typing speed of at least 35 words a minute, aged 18 to 25. Case: Arun has 52%, types 36 words a minute, and is 25. Is he eligible?",
        steps: ["52% meets 50%, and 36 words a minute meets 35.", "25 lies within 18 to 25, since a range includes its ends."],
        answer: "Eligible",
      },
      practiceSet: [
        { prompt: "A condition says \"aged 18 to 28\". Is a candidate aged 28 within it?", answer: "Yes" },
        { prompt: "A case meets every condition but one. Is it eligible?", answer: "No" },
        { prompt: "A condition asks for at least 30 words a minute and the candidate types 33. Is it met?", answer: "Yes" },
        { prompt: "In what order should you check the conditions?", answer: "The order the options name them, stopping at the first that fails." },
      ],
      pyqExampleId: "232a812b-1745-406c-a31d-17ea2b105a06",
      traps: [
        {
          title: "Reading a range as excluding its ends",
          body:
            "\"Between 18 and 28 years\" in these questions includes 18 and 28. A candidate exactly at an end meets the condition.",
        },
        {
          title: "Stopping after the conditions that pass",
          body:
            "A case that meets three conditions and misses the fourth is not eligible. Check every condition before you mark a case eligible.",
        },
      ],
    },
  ],
};
