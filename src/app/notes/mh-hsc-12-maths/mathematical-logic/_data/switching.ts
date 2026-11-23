import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_ML_SWITCHING_NOTE: SubtopicNote = {
  subtopicName: "Application of Logic to Switching Circuits",
  title: "Switching Circuits",
  oneLineDefinition:
    "Switches in series behave like 'and' and switches in parallel like 'or': how to draw a circuit from a statement pattern, read a circuit as a pattern with its switching table, and simplify it.",
  whyItMatters:
    "55 questions. Eleven were set in board papers, more than on any other page of the chapter: construct a circuit from a statement pattern (2015, 2017, and twice in 2026), write a printed circuit in symbolic form with its switching table (2019, 2020, 2024 and 2025), and simplify a circuit or give an equivalent one with fewer switches (2023, 2024 and 2025). Seven of the eleven come with a printed circuit. The textbook adds more circuits of all three kinds and checks whether two circuits are equivalent.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmml-construct-circuit",
      name: "From a statement pattern to a circuit",
      intuition:
        "A switch is either closed (current flows) or open (no current), just as a statement is either true or false. Two switches one after the other let current through only if both are closed: that is 'and'. Two switches side by side let it through if either is closed: that is 'or'. The lamp glows exactly when the pattern is true.",
      definition:
        "- A **switch** is a two-state device used to control the flow of current in a circuit. Let p: the switch \\(S_1\\) is closed, q: the switch \\(S_2\\) is closed.\n" +
        "- Switches always in the same state are denoted by the same letter (**equivalent switches**). A switch always in the opposite state of \\(S_1\\) is written \\(S_1'\\) (**complementary switch**) and stands for \\(\\sim p\\).\n" +
        "- \\(p \\land q\\): \\(S_1\\) and \\(S_2\\) in **series**.\n" +
        "- \\(p \\lor q\\): \\(S_1\\) and \\(S_2\\) in **parallel**.\n" +
        "- Build the circuit from the inside of the brackets outwards, then join the whole block in series with the lamp L and the battery.\n" +
        "- In the **switching table** (input-output table), 1 means a switch is closed or the lamp glows, and 0 means open or not glowing.",
      formula: {
        label: "Switching rules",
        latex: "p \\land q:\\ S_1, S_2 \\text{ in series}, \\qquad p \\lor q:\\ S_1, S_2 \\text{ in parallel}, \\qquad \\sim p:\\ S_1'",
      },
      authoredExample: {
        prompt: "Construct the switching circuit of \\((p \\lor q) \\land \\sim r\\).",
        steps: [
          "Let p: the switch \\(S_1\\) is closed, q: the switch \\(S_2\\) is closed, r: the switch \\(S_3\\) is closed. Then \\(\\sim r\\) is the switch \\(S_3'\\).",
          "\\(p \\lor q\\): \\(S_1\\) and \\(S_2\\) are joined in parallel.",
          "\\(\\land \\sim r\\): this parallel block is joined in series with \\(S_3'\\).",
          "The whole arrangement is joined in series with the lamp L and the battery.",
        ],
        answer: "\\(S_1\\) parallel to \\(S_2\\), that block in series with \\(S_3'\\), the lamp and the battery",
      },
      selfCheckExample: {
        prompt: "Describe the switching circuit of \\((p \\land q) \\lor r\\).",
        steps: ["\\(p \\land q\\): \\(S_1\\) and \\(S_2\\) in series, as one branch.", "\\(\\lor r\\): that branch in parallel with \\(S_3\\)."],
        answer: "\\(S_1\\) and \\(S_2\\) in series, in parallel with \\(S_3\\), the block in series with the lamp",
      },
      practiceSet: [
        { prompt: "Which connective stands for switches joined in parallel?", answer: "'or', \\(\\lor\\)" },
        { prompt: "If \\(S_1\\) stands for p, what does \\(S_1'\\) stand for?", answer: "\\(\\sim p\\): it is open whenever \\(S_1\\) is closed" },
        { prompt: "Describe the circuit of \\(p \\land q \\land r\\).", answer: "\\(S_1\\), \\(S_2\\) and \\(S_3\\) all in series with the lamp" },
      ],
      pyqExampleId: "81108f26-a77b-44f4-b6fa-3811f0dcec85",
      traps: [
        {
          title: "Swapping series and parallel",
          body: "'and' is series, 'or' is parallel. In series every switch must be closed for the lamp to glow, which is exactly when an 'and' is true.",
        },
        {
          title: "Leaving out the lamp and battery",
          body: "A circuit needs a lamp and a source. State the letters (p: \\(S_1\\) is closed, and so on), draw the switches, and join the block to the lamp and battery.",
        },
        {
          title: "Using a new switch for a negation",
          body: "\\(\\sim p\\) is not an unrelated switch. It is \\(S_1'\\), linked to \\(S_1\\): when one is closed the other is open.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-symbolic-form",
      name: "From a circuit to its symbolic form and switching table",
      intuition:
        "Read a printed circuit like a sentence: each branch in parallel is joined by 'or', each switch in a branch by 'and'. Then the switching table is just the truth table written with 1 and 0, and its last column says when the lamp glows.",
      definition:
        "- Name the letters: p for \\(S_1\\), q for \\(S_2\\), and \\(\\sim p\\) for \\(S_1'\\).\n" +
        "- Write each branch: switches in series joined by \\(\\land\\). Join parallel branches by \\(\\lor\\). A block in series with another is joined by \\(\\land\\).\n" +
        "- Make the switching table with 1 for closed and 0 for open; the last column is the lamp.\n" +
        "- **Interpret** the table: all 1 means the lamp always glows; all 0 means it never glows, whatever the switches; otherwise name the settings for which it glows.",
      authoredExample: {
        prompt: "A circuit has two branches in parallel: the first has switches \\(S_1\\) and \\(S_2\\) in series, the second has \\(S_1'\\) and \\(S_2'\\) in series. The block is in series with a lamp L and a battery. Write the symbolic form, construct the switching table and interpret it.",
        steps: [
          "Let p: \\(S_1\\) is closed, q: \\(S_2\\) is closed. Then \\(S_1'\\) is \\(\\sim p\\) and \\(S_2'\\) is \\(\\sim q\\).",
          "Symbolic form: \\((p \\land q) \\lor (\\sim p \\land \\sim q)\\).",
          "p = 1, q = 1: \\(1 \\lor 0 = 1\\).",
          "p = 1, q = 0: \\(0 \\lor 0 = 0\\).",
          "p = 0, q = 1: \\(0 \\lor 0 = 0\\).",
          "p = 0, q = 0: \\(0 \\lor 1 = 1\\).",
          "The lamp glows when both switches are closed or both are open.",
        ],
        answer: "\\((p \\land q) \\lor (\\sim p \\land \\sim q)\\); lamp column 1, 0, 0, 1: it glows only when \\(S_1\\) and \\(S_2\\) are in the same state",
      },
      selfCheckExample: {
        prompt: "A lamp is in series with \\(S_1\\) and with a block in which \\(S_2\\) and \\(S_2'\\) are in parallel. Write the symbolic form and say when the lamp glows.",
        steps: [
          "Symbolic form: \\(p \\land (q \\lor \\sim q)\\).",
          "\\(q \\lor \\sim q\\) is always 1, so the lamp column matches the column of p.",
        ],
        answer: "\\(p \\land (q \\lor \\sim q)\\); the lamp glows whenever \\(S_1\\) is closed",
      },
      practiceSet: [
        { prompt: "In a switching table, what does 1 mean for a switch?", answer: "The switch is closed (on)" },
        { prompt: "Every entry in the lamp column is 0. What does this tell you?", answer: "The lamp never glows; the pattern is a contradiction" },
        { prompt: "Write the symbolic form of three switches \\(S_1\\), \\(S_2\\), \\(S_3\\) joined in parallel.", answer: "\\(p \\lor q \\lor r\\)" },
      ],
      pyqExampleId: "c3a8112c-2062-4d45-ae9b-509b82e42a37",
      traps: [
        {
          title: "Skipping the interpretation",
          body: "When the question says 'interpret', write a sentence about the lamp: when it glows, or that it never glows. The table alone loses that mark.",
        },
        {
          title: "Reading the complementary switch as a new letter",
          body: "\\(S_1'\\) is \\(\\sim p\\), not a new letter r. Using a new letter gives a table with too many rows and a wrong conclusion.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmml-simplify-circuit",
      name: "Simplifying a circuit",
      intuition:
        "Two circuits are equivalent when their lamps behave the same way for every setting of the switches. So write the circuit as a pattern, simplify the pattern with the laws of logic, and draw the shorter pattern as a new circuit with fewer switches.",
      definition:
        "- Write the symbolic form of the given circuit and count its switches.\n" +
        "- Simplify with the laws (Distributive, Complement, Identity, Absorption, De Morgan's), naming each law.\n" +
        "- Draw the circuit of the simplified pattern and say how many switches it uses.\n" +
        "- A pattern that simplifies to c gives a lamp that never glows; one that simplifies to t gives a lamp that always glows.\n" +
        "- Two circuits are **equivalent** when their statement patterns are equivalent; show it with the laws or with switching tables.",
      authoredExample: {
        prompt: "Simplify the circuit whose symbolic form is \\((p \\lor q) \\land (p \\lor \\sim q)\\), and describe the simpler circuit.",
        steps: [
          "The given circuit: (\\(S_1\\) parallel \\(S_2\\)) in series with (\\(S_1\\) parallel \\(S_2'\\)). It uses 4 switches.",
          "\\((p \\lor q) \\land (p \\lor \\sim q) \\equiv p \\lor (q \\land \\sim q)\\)   [Distributive law]",
          "\\(\\equiv p \\lor c\\)   [Complement law]",
          "\\(\\equiv p\\)   [Identity law]",
          "The simpler circuit is the single switch \\(S_1\\) in series with the lamp and the battery.",
        ],
        answer: "\\(p\\): one switch \\(S_1\\) in place of four",
      },
      selfCheckExample: {
        prompt: "Simplify \\(p \\lor (p \\land q)\\) and say how many switches the simpler circuit needs.",
        steps: ["\\(p \\lor (p \\land q) \\equiv p\\)   [Absorption law]"],
        answer: "\\(p\\); one switch",
      },
      practiceSet: [
        { prompt: "Simplify \\((p \\land q) \\lor (\\sim p \\land q)\\).", answer: "\\(q\\)" },
        { prompt: "A circuit simplifies to t. What does the lamp do?", answer: "It glows for every setting of the switches" },
        { prompt: "Are the circuits \\(p \\land (q \\lor r)\\) and \\((p \\land q) \\lor (p \\land r)\\) equivalent?", answer: "Yes, by the distributive law" },
      ],
      pyqExampleId: "99e61c78-0296-45e5-baec-4c31ab29ffec",
      traps: [
        {
          title: "Stopping at the simplified pattern",
          body: "The question asks for a circuit. After simplifying, describe or draw the new circuit and state how many switches it saves.",
        },
        {
          title: "Not saying what a contradiction means for the lamp",
          body: "A pattern equal to c means the lamp never glows, whatever the switches. Say so in words as the conclusion.",
        },
      ],
    },
  ],
};
