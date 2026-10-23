import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RSY_TWO_NOTE: SubtopicNote = {
  subtopicName: "Two-Statement Syllogism",
  title: "Two-Statement Syllogism",
  oneLineDefinition:
    "Two statements about groups (All, Some, No) and two conclusions to test: a conclusion follows only if it must be true whenever both statements are true.",
  whyItMatters:
    "Nineteen questions in the bank, all from the 2025 shifts, and all but one EASY. The whole chapter rests on a short table of rules for turning a statement round and for joining two statements, and this page teaches that table.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrsytw-rules",
      name: "Turning a statement round and joining two",
      intuition:
        "Draw each group as a circle. \"All A are B\" puts circle A inside circle B; \"Some A are B\" makes them overlap. A conclusion follows only if every drawing that fits the statements also fits the conclusion. A few rules save drawing every time.",
      definition:
        "- **Turning round (the converse):** \"All A are B\" gives \"Some B are A\", never \"All B are A\". \"Some A are B\" gives \"Some B are A\".\n" +
        "- **Joining through the middle group B:**\n" +
        "- All A are B, and All B are C, give All A are C (and so Some C are A).\n" +
        "- Some A are B, and All B are C, give Some A are C.\n" +
        "- All A are B, and Some B are C, give nothing definite about A and C.\n" +
        "- Some A are B, and Some B are C, give nothing definite about A and C.\n" +
        "- Ignore what you know about the real world: the statements are the only facts.\n" +
        "- **Fast route:** test each conclusion against the rules one at a time, and pick the option that names exactly the ones that pass.",
      authoredExample: {
        prompt: "Statements: All cups are mugs. All mugs are jars. Conclusions: I. All cups are jars. II. Some jars are mugs. Which conclusions follow?",
        steps: [
          "I: All cups are mugs and all mugs are jars, so all cups are jars. I follows.",
          "II: \"All mugs are jars\" turned round gives \"Some jars are mugs\". II follows.",
        ],
        answer: "Both I and II",
      },
      selfCheckExample: {
        prompt: "Statements: Some pens are pencils. Some pencils are erasers. Conclusions: I. Some pens are erasers. II. Some erasers are pencils. Which conclusions follow?",
        steps: [
          "I: two Some statements give nothing definite about pens and erasers. I does not follow.",
          "II: \"Some pencils are erasers\" turned round gives \"Some erasers are pencils\". II follows.",
        ],
        answer: "Only II",
      },
      practiceSet: [
        { prompt: "What does \"All lions are cats\" give when turned round?", answer: "Some cats are lions" },
        { prompt: "Does \"Some A are B\" give \"Some B are A\"?", answer: "Yes" },
        { prompt: "From \"All A are B\" and \"Some B are C\", does \"Some A are C\" follow?", answer: "No" },
        { prompt: "Statements: All tables are chairs. All chairs are stools. Does \"All stools are tables\" follow?", answer: "No: only \"Some stools are tables\" follows." },
      ],
      pyqExampleId: "c445eb0a-b336-48bd-a185-c8638411c0a8",
      traps: [
        {
          title: "Turning \"All\" round into \"All\"",
          body:
            "All dogs are animals, but not all animals are dogs. \"All A are B\" turned round gives only \"Some B are A\".",
        },
        {
          title: "Joining two Some statements",
          body:
            "Some boys are players and some players are singers does not tell you that any boy sings: the players who sing may be other players. Two Some statements give no definite link.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrsytw-no",
      name: "Statements with No and Some not",
      intuition:
        "\"No A is B\" draws the two circles apart. Joined with an All or a Some statement, it tells you which things are kept out of a group, and the conclusion that follows is often a \"Some ... are not\" statement.",
      definition:
        "- **Turning round:** \"No A is B\" gives \"No B is A\". \"Some A are not B\" cannot be turned round.\n" +
        "- **Joining:**\n" +
        "- All A are B, and No B is C, give No A is C.\n" +
        "- Some A are B, and No B is C, give Some A are not C.\n" +
        "- No A is B, and All B are C, give Some C are not A (the Bs are Cs that are not A).\n" +
        "- No A is B, and No B is C, give nothing definite about A and C.\n" +
        "- A conclusion that says the opposite of a statement never follows.\n" +
        "- **Fast route:** a \"Some ... are not\" conclusion usually comes from a Some or All statement joined to a No statement; check that pair first.",
      authoredExample: {
        prompt: "Statements: No apple is a stone. All stones are rocks. Conclusions: I. Some rocks are not apples. II. No apple is a rock. Which conclusions follow?",
        steps: [
          "I: the stones are rocks, and no stone is an apple, so those rocks are not apples. I follows.",
          "II: rocks that are not stones may be apples, so II is not certain. II does not follow.",
        ],
        answer: "Only I",
      },
      selfCheckExample: {
        prompt: "Statements: All roses are flowers. No flower is a stone. Conclusions: I. No rose is a stone. II. Some stones are roses. Which conclusions follow?",
        steps: [
          "I: All roses are flowers and no flower is a stone, so no rose is a stone. I follows.",
          "II: it says the opposite of I, so it does not follow.",
        ],
        answer: "Only I",
      },
      practiceSet: [
        { prompt: "What does \"No A is B\" give when turned round?", answer: "No B is A" },
        { prompt: "Can \"Some A are not B\" be turned round?", answer: "No" },
        { prompt: "All A are B, and No B is C. What follows about A and C?", answer: "No A is C" },
        { prompt: "Some A are B, and No B is C. What follows about A and C?", answer: "Some A are not C" },
      ],
      pyqExampleId: "df648fd2-bdf2-4304-a698-5b6a4c643578",
      traps: [
        {
          title: "Reading \"Some A are not B\" into \"Some A are B\"",
          body:
            "\"Some students are runners\" does not mean some students are not runners: all of them might be. A \"Some ... are not\" conclusion needs a No statement behind it.",
        },
        {
          title: "Joining two No statements",
          body:
            "No cat is a dog and no dog is a fish say nothing about cats and fish. Two negative statements give no conclusion.",
        },
      ],
    },
  ],
};
