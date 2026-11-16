import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RST_LOGIC_NOTE: SubtopicNote = {
  subtopicName: "Inferences, Causes and Courses of Action",
  title: "Inferences, Causes and Courses of Action",
  oneLineDefinition:
    "Decide which inferences or conclusions follow from a statement, how two events are linked as cause and effect, and which suggested actions are sensible.",
  whyItMatters:
    "21 questions in the Tier II bank, 16 EASY and 5 MODERATE. Most wrong options say too much: 'all', 'only' and 'always' are the words that usually make an inference fail.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rstlg-infer",
      name: "Inferences, conclusions and assumptions",
      intuition:
        "An inference follows if the statement makes it true or very likely; it fails if it goes further than the statement. Words like all, only and every usually push an option past what was said.",
      definition:
        "- **Follows:** a careful restatement or a direct result of the statement.\n" +
        "- **Does not follow:** an option that widens 'some' to 'all', or names the 'only' cause.\n" +
        "- **Assumption:** something the writer must take for granted for the statement to make sense.\n" +
        "- **Argument strengthens or weakens:** does it support the claim, or give a reason against it?",
      authoredExample: {
        prompt:
          "Statement: Regular exercise lowers the risk of heart disease. I: People who exercise regularly are less likely to get heart disease. II: Exercise cures heart disease.",
        steps: ["I restates the statement.", "II goes much further: lowering a risk is not a cure."],
        answer: "Only I follows",
      },
      selfCheckExample: {
        prompt:
          "Statement: The new bridge has cut travel time between the two towns by half. I: Travel between the towns is now faster. II: Everyone in both towns uses the bridge.",
        steps: ["I follows directly.", "II says 'everyone', which the statement does not support."],
        answer: "Only I follows",
      },
      practiceSet: [
        { prompt: "Statement: Some students use the library daily. Does 'All students use the library' follow?", answer: "No: 'some' does not give 'all'" },
        { prompt: "Statement: Prices rose after the rains failed. Does 'The failed rains are the only reason prices rose' follow?", answer: "No: 'only' goes too far" },
        { prompt: "Which words usually make an inference fail?", answer: "All, only, always, never, every" },
      ],
      pyqExampleId: "6916c7e6-1094-498f-ab08-9413f4f21aaa",
      traps: [
        {
          title: "Accepting an option because it is true in real life",
          body: "An option can be true in the world and still not follow from the statement. Judge it only on what the statement says.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rstlg-cause",
      name: "Cause and effect",
      intuition:
        "Two events can be linked in three ways: one causes the other, both come from one common cause, or they are unrelated (independent causes). Ask what would naturally lead to each event.",
      definition:
        "- **I causes II** (or II causes I): one event directly brings about the other.\n" +
        "- **Common cause:** both follow from one hidden event (crowded hospitals and closed schools both from a flu outbreak).\n" +
        "- **Independent causes:** each has its own separate reason.\n" +
        "- **'Possible effects' questions:** pick the effects that would naturally follow the event given.",
      authoredExample: {
        prompt: "I: The price of onions has doubled this month. II: Heavy rain destroyed much of the onion crop.",
        steps: ["Less crop means less supply.", "Less supply raises the price: II causes I."],
        answer: "II is the cause and I is its effect",
      },
      selfCheckExample: {
        prompt: "I: Schools in the city are closed today. II: Offices in the city are closed today.",
        steps: ["Neither closing causes the other.", "Both would follow one event, such as a storm or a holiday."],
        answer: "Both are effects of a common cause",
      },
      practiceSet: [
        { prompt: "I: A factory shut down. II: Many workers in the town lost their jobs. How are they linked?", answer: "I is the cause, II the effect" },
        { prompt: "I: Wheat output fell in one state. II: Car sales rose in another country. How are they linked?", answer: "Effects of independent causes" },
        { prompt: "A heavy storm hit a city. Which is a possible effect: trains cancelled, or exam results declared early?", answer: "Trains cancelled" },
      ],
      pyqExampleId: "464e68c7-5105-4d2b-9f0f-99d4d51e7810",
      traps: [
        {
          title: "Linking two events because they happened together",
          body: "Two events in the same period are not linked unless one explains the other or both come from one source. Unrelated events have independent causes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rstlg-action",
      name: "Courses of action",
      intuition:
        "A course of action follows if it is practical and deals with the problem stated. Actions that are extreme, impossible, or about something else do not follow.",
      definition:
        "- **Follows:** a sensible step that reduces the problem or its harm.\n" +
        "- **Does not follow:** an extreme step (close all, ban everything), or one that does not address the problem.\n" +
        "- **Both can follow:** one step may fix the cause and another may limit the harm.",
      authoredExample: {
        prompt:
          "Problem: Many children in a village fell ill after drinking water from the old well. I: The well should be closed and its water tested. II: All the village's children should be moved to a city.",
        steps: ["I deals directly with the cause and is practical.", "II is extreme and impractical."],
        answer: "Only I follows",
      },
      selfCheckExample: {
        prompt:
          "Problem: Accidents have increased at a busy crossing. I: Traffic lights should be put up at the crossing. II: Drivers found speeding there should be fined.",
        steps: ["Both are practical.", "Both reduce accidents at that crossing."],
        answer: "Both I and II follow",
      },
      practiceSet: [
        { prompt: "Problem: A city's water supply is polluted. Does 'Ban all water use in the city' follow?", answer: "No: it is extreme and impractical" },
        { prompt: "Problem: Train passengers face long delays. Does 'Refund part of the fare for long delays' follow?", answer: "Yes: it limits the harm" },
        { prompt: "When do both courses of action follow?", answer: "When both are practical and each helps with the problem" },
      ],
      pyqExampleId: "4cb760b1-d7ac-4919-90af-8246b2c4f052",
      traps: [
        {
          title: "Rejecting a sensible step because it is not complete",
          body: "A course of action need not solve the whole problem. If it is practical and helps, it follows.",
        },
      ],
    },
  ],
};
