import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_SE_GATES_NOTE: SubtopicNote = {
  subtopicName: "Logic Gates",
  title: "Logic Gates",
  oneLineDefinition:
    "The five basic gates OR, AND, NOT, NAND and NOR with their truth tables, and how to reduce a circuit of gates to one expression, one truth table or one equivalent gate.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2025, four of them from 2024, and none in the two 2026 papers. Six give a circuit of gates and ask for its output, its truth table or the single gate it equals; one of these, in 2021, gives the inputs as waveforms. One asks for the expression behind a truth table, and one for the gate made by an OR gate followed by a NOT gate.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphse-basic-gates",
      name: "The basic gates and their truth tables",
      intuition:
        "A logic gate works with only two levels: high, written 1, and low, written 0. Each two-input gate has one input pair whose output is different from the other three. AND gives 1 only for (1, 1); OR gives 0 only for (0, 0). NAND and NOR are AND and OR with every output flipped. Learn those single rows and you can write any table in seconds.",
      definition:
        "- **OR:** \\(Y = A + B\\). **AND:** \\(Y = A\\cdot B\\). **NOT:** \\(Y = \\overline{A}\\), one input.\n" +
        "- **NAND** is an AND gate followed by a NOT gate: \\(Y = \\overline{A\\cdot B}\\).\n" +
        "- **NOR** is an OR gate followed by a NOT gate: \\(Y = \\overline{A + B}\\).\n" +
        "- NAND and NOR are called **universal gates**: OR, AND and NOT can all be built from NAND gates alone, or from NOR gates alone.\n" +
        "- A truth table lists the output for every input combination: 4 rows for two inputs, 8 rows for three.",
      table: {
        columns: ["Gate", "Output Y", "Y for inputs 00, 01, 10, 11", "Y is 1 when"],
        rows: [
          { cells: ["OR", "\\(A + B\\)", "0, 1, 1, 1", "at least one input is 1"] },
          { cells: ["AND", "\\(A\\cdot B\\)", "0, 0, 0, 1", "both inputs are 1"] },
          { cells: ["NOT", "\\(\\overline{A}\\)", "1 for A = 0, 0 for A = 1", "the input is 0"] },
          { cells: ["NAND", "\\(\\overline{A\\cdot B}\\)", "1, 1, 1, 0", "at least one input is 0"] },
          {
            cells: ["NOR", "\\(\\overline{A + B}\\)", "1, 0, 0, 0", "both inputs are 0"],
            pyqExampleId: "3bf444a2-6c38-47e4-9b0a-2a2b30669df1",
            noteAmber: "Re-NEET 2024: an OR gate whose output feeds a NOT gate acts as a NOR gate.",
          },
        ],
        caption: "The one row that differs from the other three names each two-input gate.",
      },
      selfCheckExample: {
        prompt: "A two-input gate gives Y = 0 only when both inputs are 1, and Y = 1 otherwise. Name the gate.",
        steps: [
          "AND gives 1 only for (1, 1). This gate gives the opposite of AND in every row.",
          "AND followed by NOT is NAND.",
        ],
        answer: "NAND",
      },
      practiceSet: [
        { prompt: "What is the output of an AND gate for inputs A = 1 and B = 0?", answer: "0" },
        { prompt: "What is the output of a NAND gate for inputs A = 0 and B = 0?", answer: "1" },
        { prompt: "Why are NAND and NOR gates called universal gates?", answer: "OR, AND and NOT can all be built from either of them alone" },
        { prompt: "Which two-input gate gives an output of 1 when at least one input is 1?", answer: "OR" },
      ],
      pyqExampleId: "3bf444a2-6c38-47e4-9b0a-2a2b30669df1",
      traps: [
        {
          title: "NAND and NOR are easy to swap",
          body: "NAND is the NOT of AND, so it is 0 only for (1, 1). NOR is the NOT of OR, so it is 1 only for (0, 0). Check the row that differs.",
        },
        {
          title: "One row fits several gates",
          body: "An output of 1 for inputs (0, 0) is true of both NAND and NOR. Use a second row, such as (0, 1), to tell them apart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphse-boolean",
      name: "Reducing a circuit with Boolean algebra",
      intuition:
        "Most gate questions draw three or four gates joined together and ask what the whole circuit does. Write the output of each gate in turn, from the inputs to the last gate, and you have one expression for Y. A few rules then shrink it, often to a single basic gate. If you can't see the rule, evaluate Y for each input row and read off the table instead.",
      definition:
        "- Work from the inputs to the output, writing each gate's output in terms of A and B.\n" +
        "- Rules: \\(A + \\overline{A} = 1\\), \\(A\\cdot\\overline{A} = 0\\), \\(A + 1 = 1\\), \\(A\\cdot 1 = A\\), \\(A + A = A\\), \\(A\\cdot A = A\\), and \\(\\overline{\\overline{A}} = A\\).\n" +
        "- **De Morgan's theorems:** \\(\\overline{A + B} = \\overline{A}\\cdot\\overline{B}\\) and \\(\\overline{A\\cdot B} = \\overline{A} + \\overline{B}\\).\n" +
        "- Two results worth knowing: NOT gates on both inputs of a NAND make an OR gate, \\(\\overline{\\overline{A}\\cdot\\overline{B}} = A + B\\); NOT gates on both inputs of a NOR make an AND gate, \\(\\overline{\\overline{A} + \\overline{B}} = A\\cdot B\\).\n" +
        "- Reading a truth table: if Y does not change when A changes (with B held), Y does not depend on A.",
      formula: {
        label: "De Morgan's theorems",
        latex: "\\overline{A + B} = \\overline{A}\\cdot\\overline{B}, \\qquad \\overline{A\\cdot B} = \\overline{A} + \\overline{B}",
      },
      authoredExample: {
        prompt:
          "A and B go into an AND gate. A also goes through a NOT gate. The AND output and \\(\\overline{A}\\) are the two inputs of an OR gate. Find Y and its truth table.",
        steps: [
          "\\(Y = A\\cdot B + \\overline{A}\\).",
          "Inputs (0,0): \\(0 + 1 = 1\\). (0,1): \\(0 + 1 = 1\\). (1,0): \\(0 + 0 = 0\\). (1,1): \\(1 + 0 = 1\\).",
          "Y is 0 only for A = 1, B = 0, which is the table of \\(\\overline{A} + B\\).",
        ],
        answer: "\\(Y = \\overline{A} + B\\): 1, 1, 0, 1",
      },
      selfCheckExample: {
        prompt: "Simplify \\(Y = \\overline{\\overline{A}\\cdot B}\\), then find Y for A = 0 and B = 1.",
        steps: [
          "De Morgan: \\(\\overline{\\overline{A}\\cdot B} = \\overline{\\overline{A}} + \\overline{B} = A + \\overline{B}\\).",
          "For A = 0, B = 1: \\(Y = 0 + 0 = 0\\).",
        ],
        answer: "\\(Y = A + \\overline{B}\\); Y = 0",
      },
      practiceSet: [
        { prompt: "Simplify \\(A + \\overline{A}\\).", answer: "1" },
        { prompt: "Use De Morgan's theorem to rewrite \\(\\overline{A + B}\\).", answer: "\\(\\overline{A}\\cdot\\overline{B}\\)" },
        { prompt: "Both inputs of a NAND gate are first passed through NOT gates. Which single gate is the result?", answer: "OR" },
        { prompt: "Simplify \\(Y = A\\cdot B + A\\cdot\\overline{B}\\).", answer: "\\(Y = A\\)" },
      ],
      pyqExampleId: "17905e2d-8959-422a-a8c6-e55b1955fe5e",
      traps: [
        {
          title: "Break a bar only with De Morgan",
          body: "\\(\\overline{A + B}\\) is not \\(\\overline{A} + \\overline{B}\\). When the bar is split, the sign changes too: \\(\\overline{A + B} = \\overline{A}\\cdot\\overline{B}\\).",
        },
        {
          title: "Invert the right input",
          body: "A NOT gate on one input changes only that input. Writing \\(\\overline{A}\\) where the circuit inverts B gives a mirror-image table, and that table is usually one of the options.",
        },
        {
          title: "Check one row in the original circuit",
          body: "After simplifying, put one input pair through the circuit as drawn and compare. A slip in the algebra shows up at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphse-gate-circuits",
      name: "Joined inputs and waveform inputs",
      intuition:
        "Two set-ups come up again and again. A NAND or NOR gate with its two inputs joined together gets the same signal twice, and it simply inverts it, so it is a NOT gate in disguise. And when the inputs are drawn as waveforms, each stretch of time between changes is just one row of a truth table.",
      definition:
        "- A NAND gate with its inputs joined: \\(\\overline{A\\cdot A} = \\overline{A}\\). A NOR gate with its inputs joined: \\(\\overline{A + A} = \\overline{A}\\). Both act as NOT gates.\n" +
        "- So a NAND followed by a NAND with joined inputs is an AND gate, and a NOR followed by a NOR with joined inputs is an OR gate.\n" +
        "- **Waveforms:** a high level (such as 5 V) is 1 and 0 V is 0. Mark every instant where any input changes. In each interval read the inputs, find Y, then draw Y interval by interval.",
      formula: {
        label: "Joined inputs",
        latex: "\\overline{A\\cdot A} = \\overline{A}, \\qquad \\overline{A + A} = \\overline{A}",
      },
      authoredExample: {
        prompt:
          "The output of a NAND gate with inputs A and B is fed to both inputs of a second NAND gate. Which single gate does the pair make?",
        steps: [
          "First gate: \\(Y_1 = \\overline{A\\cdot B}\\).",
          "Second gate, inputs joined: \\(Y = \\overline{Y_1\\cdot Y_1} = \\overline{Y_1} = \\overline{\\overline{A\\cdot B}} = A\\cdot B\\).",
        ],
        answer: "An AND gate",
      },
      selfCheckExample: {
        prompt:
          "The inputs of an OR gate are drawn as waveforms over four equal intervals. A is 0, 1, 0, 1 and B is 0, 0, 1, 1 in those intervals. What is the output in each interval?",
        steps: [
          "Each interval is one row of the OR truth table.",
          "(0,0) gives 0; (1,0), (0,1) and (1,1) give 1.",
        ],
        answer: "0, 1, 1, 1",
      },
      practiceSet: [
        { prompt: "Both inputs of a NAND gate are joined and fed with A = 1. What is the output?", answer: "0" },
        { prompt: "During one interval of a waveform question, A is 1 and B is 0, and the gate is an AND gate. What is the output in that interval?", answer: "0" },
        { prompt: "The output of a NOR gate is fed into a NOT gate. Which gate does the combination make?", answer: "OR" },
        { prompt: "A NAND gate gets 5 V on one input and 0 V on the other. Is its output high or low?", answer: "High" },
      ],
      pyqExampleId: "a6d3f2b0-8bff-4614-b535-e6a441cda283",
      traps: [
        {
          title: "Joined inputs make a NOT gate",
          body: "A NAND or NOR gate with both inputs tied to the same signal inverts it. It does not pass the signal through unchanged.",
        },
        {
          title: "Cut the time axis at every change",
          body: "In a waveform question, an interval ends whenever any one input changes, not only when the first input changes. Missing a change merges two rows and gives a wrong output pulse.",
        },
      ],
    },
  ],
};
