import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_GATES_NOTE: SubtopicNote = {
  subtopicName: "Logic Gates",
  title: "Logic Gates",
  oneLineDefinition:
    "What a logic gate, a truth table and a Boolean expression are, the basic NOT, OR and AND gates, and the NAND, NOR and X-OR gates built from them.",
  whyItMatters:
    "12 questions. Seven were set in board papers: name the gate that is high when at least one input is high (2019), write the Boolean expression of the X-OR gate (2022), name the gate whose expression is Y = NOT (A + B) (2023), what a logic gate is (2024), the gate that is high when both inputs are high (2025), define a logic gate and say why a NOT gate is called an inverter (2025), and the Boolean equation of the NOR gate (2026). The textbook adds truth tables, Boolean expressions and the uses of logic gates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsd-logic-gate",
      name: "Logic gate, truth table and Boolean expression",
      intuition:
        "A digital circuit deals with only two levels: low (0) and high (1). A logic gate looks at its inputs and decides whether its single output is 0 or 1 by a fixed rule. A truth table lists that decision for every possible input, and a Boolean expression says the same rule in one line of algebra.",
      definition:
        "- **Analog signal:** varies continuously, like a sine wave. **Digital signal:** has only two values, low (0, about 0 V) and high (1, about +5 V), like a square wave.\n" +
        "- **Logic gate:** a digital circuit with one or more inputs but only one output, which follows a definite logical relationship between input and output. Gates are so called because they control the flow of signal or information.\n" +
        "- **Truth table:** lists all possible combinations of the inputs with the output for each. A gate with \\(n\\) inputs has \\(2^n\\) rows.\n" +
        "- **Boolean expression:** the mathematical statement that gives the relationship between the inputs and the output of a gate.\n" +
        "- The five common gates are NOT, AND, OR, NAND and NOR; the X-OR gate is also in the book.\n" +
        "- **Uses:** logic gates are the building blocks of digital circuits; they take logical decisions. The X-OR gate compares two logic levels in computational circuits. NAND and NOR are **universal gates**: any gate can be built from NAND gates alone or from NOR gates alone.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Logic gate", "A digital circuit with one or more inputs and only one output, following a definite logical relationship between them"],
            pyqExampleId: "69ced365-35e1-4d4a-8b88-26bd06589604",
            noteAmber: "Board 2024 asked what a logic gate is, and 2025 asked you to define it.",
          },
          { cells: ["Truth table", "All possible combinations of the inputs, with the output for each"] },
          { cells: ["Boolean expression", "The mathematical statement relating the output of a gate to its inputs"] },
          { cells: ["Digital signal", "A signal with only two values: low (0) and high (1)"] },
          { cells: ["Universal gate", "A gate from which any gate can be built: NAND or NOR"] },
        ],
      },
      practiceSet: [
        { prompt: "How many rows does the truth table of a gate with three inputs have?", answer: "8" },
        { prompt: "Name the two universal gates.", answer: "NAND and NOR" },
        { prompt: "Why are logic gates called gates?", answer: "They control the flow of signal or information" },
      ],
      traps: [
        {
          title: "A gate that lets current flow one way",
          body: "Allowing current in one direction only describes a diode. A logic gate makes a logical decision: its output is high or low according to its inputs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-basic-gates",
      name: "The NOT, OR and AND gates",
      intuition:
        "Read each gate as a sentence. NOT says 'the opposite of the input'. OR says 'high if A or B (or both) is high'. AND says 'high only if A and B are both high'. Every other gate is one of these followed by a NOT.",
      definition:
        "- **NOT gate:** one input, one output. Input 0 gives 1; input 1 gives 0. It produces a negated version of its input, which is why it is called an **inverter**. \\(Y = \\overline{X}\\).\n" +
        "- **OR gate:** two or more inputs. The output is 1 when either input or both are 1; it is 0 only when all inputs are 0. Logical addition: \\(Y = A + B\\). Outputs for AB = 00, 01, 10, 11: 0, 1, 1, 1.\n" +
        "- **AND gate:** two or more inputs. The output is 1 only when all inputs are 1. Logical multiplication: \\(Y = A \\cdot B\\). Outputs for AB = 00, 01, 10, 11: 0, 0, 0, 1.\n" +
        "- For a definition question, give the symbol, the truth table and the Boolean expression together.",
      formula: {
        label: "Boolean expressions",
        latex: "\\text{NOT: } Y = \\overline{X}, \\qquad \\text{OR: } Y = A + B, \\qquad \\text{AND: } Y = A \\cdot B",
      },
      authoredExample: {
        prompt:
          "Inputs A = 1 and B = 0 are applied to an OR gate and to an AND gate. Find each output. The output of the AND gate is then fed to a NOT gate; find its output.",
        steps: [
          "OR: \\(Y = A + B = 1 + 0 = 1\\).",
          "AND: \\(Y = A \\cdot B = 1 \\cdot 0 = 0\\).",
          "NOT of the AND output: \\(\\overline{0} = 1\\).",
        ],
        answer: "OR gives 1, AND gives 0, and the NOT gate gives 1",
      },
      selfCheckExample: {
        prompt: "Both inputs of an OR gate are 0, and its output feeds a NOT gate. Find the final output.",
        steps: ["OR: \\(0 + 0 = 0\\).", "NOT: \\(\\overline{0} = 1\\)."],
        answer: "1",
      },
      practiceSet: [
        { prompt: "What is the output of an OR gate when both its inputs are 0?", answer: "0" },
        { prompt: "Which logical operation does the AND gate represent?", answer: "Logical multiplication" },
        { prompt: "Why is a NOT gate called an inverter?", answer: "Its output is always the opposite (negation) of its input: 0 becomes 1 and 1 becomes 0" },
      ],
      pyqExampleId: "347eec85-fe62-410d-9449-edb81eb82d72",
      traps: [
        {
          title: "Reading + as ordinary addition",
          body: "In Boolean algebra \\(1 + 1 = 1\\) for an OR gate, not 2. The output can only be 0 or 1.",
        },
        {
          title: "Swapping 'at least one' and 'both'",
          body: "'High when at least one input is high' is the OR gate; 'high only when both inputs are high' is the AND gate. Read the condition twice before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-derived-gates",
      name: "The NAND, NOR and X-OR gates",
      intuition:
        "NAND is AND turned upside down, and NOR is OR turned upside down: take the AND or OR output and invert it. X-OR is the 'are they different?' gate: high when the two inputs disagree, low when they agree.",
      definition:
        "- **NAND gate:** an AND gate whose output is fed to a NOT gate. Its output is the opposite of AND: 0 only when both inputs are 1. \\(Y = \\overline{A \\cdot B}\\). Outputs for AB = 00, 01, 10, 11: 1, 1, 1, 0.\n" +
        "- **NOR gate:** an OR gate whose output is fed to a NOT gate. Its output is the opposite of OR: 1 only when both inputs are 0. \\(Y = \\overline{A + B}\\). Outputs: 1, 0, 0, 0.\n" +
        "- **X-OR (Exclusive-OR) gate:** high only when its two inputs are at different logic levels (an odd number of 1s at the input). \\(Y = A \\oplus B = A\\overline{B} + \\overline{A}B\\). Outputs: 0, 1, 1, 0.\n" +
        "- NAND and NOR are universal gates.",
      formula: {
        label: "NAND, NOR and X-OR",
        latex: "\\text{NAND: } Y = \\overline{A \\cdot B}, \\qquad \\text{NOR: } Y = \\overline{A + B}, \\qquad \\text{X-OR: } Y = A\\overline{B} + \\overline{A}B",
      },
      authoredExample: {
        prompt: "Inputs A = 1 and B = 0 are applied in turn to a NAND gate, a NOR gate and an X-OR gate. Find each output.",
        steps: [
          "NAND: \\(A \\cdot B = 0\\), so \\(Y = \\overline{0} = 1\\).",
          "NOR: \\(A + B = 1\\), so \\(Y = \\overline{1} = 0\\).",
          "X-OR: \\(Y = A\\overline{B} + \\overline{A}B = 1 \\cdot 1 + 0 \\cdot 0 = 1\\) (the inputs differ).",
        ],
        answer: "NAND 1, NOR 0, X-OR 1",
      },
      selfCheckExample: {
        prompt: "For which combination of inputs is the output of a two-input NAND gate 0?",
        steps: ["NAND is the opposite of AND, and AND is 1 only for A = B = 1."],
        answer: "A = 1 and B = 1",
      },
      practiceSet: [
        { prompt: "For which inputs is the output of a two-input NOR gate 1?", answer: "Only when both inputs are 0" },
        { prompt: "Which gate gives 0 only when both its inputs are 1?", answer: "The NAND gate" },
        { prompt: "The output of a NOR gate is fed to a NOT gate. Which single gate does the pair act as?", answer: "An OR gate" },
      ],
      pyqExampleId: "e16ade18-613a-4682-8484-f2b9a2be650b",
      traps: [
        {
          title: "One bar or two",
          body: "\\(\\overline{A + B}\\) has ONE bar over the whole sum: it is NOR. \\(\\overline{A} + \\overline{B}\\), with a bar over each letter, is a different expression.",
        },
        {
          title: "X-OR with both inputs high",
          body: "X-OR is high only when the inputs differ, so with both inputs 1 its output is 0. OR would give 1 there.",
        },
        {
          title: "The book's wording for NAND and NOR",
          body: "The textbook says NAND is formed by joining the output of a NOT gate to the input of an AND gate, but its truth table is that of an AND gate followed by a NOT gate. Write it that way: the AND (or OR) output goes into the NOT gate.",
        },
      ],
    },
  ],
};
