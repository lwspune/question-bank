import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RBR_RELATIONS_NOTE: SubtopicNote = {
  subtopicName: "Family Trees from Statements and Codes",
  title: "Family Trees from Statements and Codes",
  oneLineDefinition:
    "Find how two people are related from a chain of family statements, given in plain words or in a code of symbols.",
  whyItMatters:
    "15 questions in the Tier II bank, all EASY. The answers are often chains like 'wife's father's mother', so reading the tree one step at a time matters more than speed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rbrre-coded",
      name: "Coded relations",
      intuition:
        "Each symbol stands for one relation. Decode the chain one link at a time, drawing each person as you go, and the chain becomes an ordinary family tree.",
      definition:
        "- **Decode link by link:** 'P @ Q $ R' is two statements: P @ Q, then Q $ R.\n" +
        "- **Mark gender** from the relation: wife, mother, sister, daughter are female; husband, father, brother, son are male.\n" +
        "- **Read the answer** from the first person named in the question to the second, step by step: 'Z's wife's father's mother'.",
      authoredExample: {
        prompt: "A # B means A is the mother of B; A & B means A is the brother of B; A % B means A is the husband of B. If X % Y # Z & W, how is X related to W?",
        steps: ["X is Y's husband; Y is Z's mother; Z is W's brother, so Y is W's mother too.", "X is the husband of W's mother: W's father."],
        answer: "Father",
      },
      selfCheckExample: {
        prompt: "Using the same code, how is M related to O if M & N # O?",
        steps: ["M is N's brother; N is O's mother.", "M is O's mother's brother."],
        answer: "Maternal uncle",
      },
      practiceSet: [
        { prompt: "A + B means A is the mother of B; A − B means A is the brother of B. If M + N − O, how is M related to O?", answer: "Mother" },
        { prompt: "Which relations tell you a person is female?", answer: "Wife, mother, sister, daughter" },
        { prompt: "How many links does 'U + V ÷ W − Y' have?", answer: "Three" },
      ],
      pyqExampleId: "585eeed2-3c3e-48a5-86f1-f32db1f1ec83",
      traps: [
        {
          title: "Reading the chain backwards",
          body: "'How is U related to Z' starts at Z and ends at U: Z's wife, her father, his mother. Reading from U gives the reverse relation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rbrre-direct",
      name: "Plain family statements",
      intuition:
        "Statements like 'pointing to a girl, he said...' are the same chains in words. Start from the speaker ('my'), work outward one relation at a time, and draw it.",
      definition:
        "- **Start from 'my' or 'I'** and move one relation at a time.\n" +
        "- **'The only son of my mother'** is the speaker himself (if male).\n" +
        "- **In-laws:** your spouse's father is your father-in-law; your daughter's husband is your son-in-law.",
      authoredExample: {
        prompt: "Pointing to a girl, Arun said, 'She is the daughter of my father's only son.' How is the girl related to Arun?",
        steps: ["Arun's father's only son is Arun himself.", "So the girl is Arun's daughter."],
        answer: "Daughter",
      },
      selfCheckExample: {
        prompt: "A is B's brother. C is A's mother. D is C's father. How is D related to B?",
        steps: ["C is the mother of both A and B.", "D is C's father: B's mother's father."],
        answer: "Grandfather (maternal)",
      },
      practiceSet: [
        { prompt: "Pointing to a boy, Ajay said, 'He is the son of my only brother.' How is the boy related to Ajay?", answer: "Nephew" },
        { prompt: "X is the husband of Y. Y is the mother of Z. How is X related to Z?", answer: "Father" },
        { prompt: "K is married to L. L is the mother of N. J is N's wife. How is K related to J?", answer: "Father-in-law" },
      ],
      pyqExampleId: "b6ad1a28-7a51-4bb2-9f5c-841ed9c5bf2a",
      traps: [
        {
          title: "Assuming a gender the statement does not give",
          body: "'R is the child of S' does not tell you whether R is a son or a daughter. Use only the genders the relations fix.",
        },
      ],
    },
  ],
};
