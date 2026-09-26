import type { SubtopicNote } from "@/app/notes/_types";

export const LOGIC_GATES_NOTE: SubtopicNote = {
  subtopicName: "Logic Gates and Boolean Algebra",
  title: "Logic Gates and Boolean Algebra",
  oneLineDefinition:
    "A logic gate turns 0s and 1s into a 0 or 1 by a fixed rule — AND, OR, NOT, and the inverted NAND and NOR; a circuit of gates is read by writing each gate's output in turn and simplifying with De Morgan's laws.",
  whyItMatters:
    "36 PYQs, three HARD — the largest page in the chapter, and most questions are a circuit drawn in a figure. Three shapes: " +
    "naming a gate from part of its truth table, finding which single gate a combination is equivalent to, and the output or Boolean expression of a circuit for given inputs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-basic-gates",
      name: "The Basic Gates and Their Truth Tables",
      intuition:
        "Learn two rows per gate and the rest follow. AND is 1 only when all inputs are 1; OR is 0 only when all are 0; NAND and NOR are those with the output flipped; XOR is 1 when the inputs differ — an odd number of 1s.",
      definition:
        "- AND \\(Y = A\\cdot B\\); OR \\(Y = A + B\\); NOT \\(Y = \\overline{A}\\).\n" +
        "- NAND \\(Y = \\overline{A\\cdot B}\\): 0 only for (1, 1). NOR \\(Y = \\overline{A + B}\\): 1 only for (0, 0).\n" +
        "- XOR \\(Y = A\\overline{B} + \\overline{A}B\\): 1 when an odd number of inputs are 1.\n" +
        "- NAND and NOR are UNIVERSAL: any gate can be built from either alone.\n" +
        "- Output 1 for (0, 0) AND for (0, 1) or (1, 0): NAND. Output 1 for (1, 0) and (0, 1) from two different gates: NAND and OR both qualify.",
      formula: {
        label: "NAND and NOR",
        latex: "\\text{NAND: } Y = \\overline{A\\cdot B}, \\qquad \\text{NOR: } Y = \\overline{A + B}",
      },
      authoredExample: {
        prompt: "A two-input gate gives 1 only when both inputs are 0. Which gate?",
        steps: ["Output 1 only at (0, 0): the complement of OR."],
        answer: "NOR",
      },
      selfCheckExample: {
        prompt: "A two-input gate is HIGH exactly when its inputs differ, and LOW when they match. Which gate?",
        steps: ["High exactly when the inputs differ."],
        answer: "XOR",
      },
      practiceSet: [
        { prompt: "Which gate outputs 1 only when an odd number of inputs are 1?", answer: "XOR" },
        { prompt: "Name a universal gate.", answer: "NAND (or NOR)" },
        { prompt: "Boolean expression of XOR?", answer: "\\(A\\overline{B} + \\overline{A}B\\)" },
      ],
      pyqExampleId: "0be773a5-c7d5-42f3-aa61-55d2e3dc99df",
      traps: [
        {
          title: "Reading one row and stopping",
          body:
            "(0, 0) → 1 fits NAND, NOR and XNOR alike. Check a second row before choosing: (0, 1) → 1 rules out NOR.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-gate-combinations",
      name: "Which Single Gate Is a Combination Equal To?",
      intuition:
        "A NAND or NOR with its inputs tied together is just a NOT. Put NOTs on both inputs of a NAND and De Morgan turns it into an OR; on a NOR, into an AND. Most 'equivalent gate' circuits reduce in two or three such steps — write the expression and simplify.",
      definition:
        "- NAND or NOR with inputs joined: NOT.\n" +
        "- \\(\\overline{\\overline{A}\\cdot\\overline{B}} = A + B\\) (NAND of NOTs is OR); \\(\\overline{\\overline{A} + \\overline{B}} = A\\cdot B\\) (NOR of NOTs is AND).\n" +
        "- OR then NOT is NOR; NOR then NOT is OR; NAND then NOT is AND.\n" +
        "- \\((A + B)\\cdot\\overline{A\\cdot B} = A \\oplus B\\): an OR and a NAND into an AND make XOR.\n" +
        "- De Morgan: \\(\\overline{A\\cdot B} = \\overline{A} + \\overline{B}\\), \\(\\overline{A + B} = \\overline{A}\\cdot\\overline{B}\\).",
      formula: {
        label: "De Morgan's laws",
        latex: "\\overline{A\\cdot B} = \\overline{A} + \\overline{B}, \\qquad \\overline{A + B} = \\overline{A}\\cdot\\overline{B}",
      },
      authoredExample: {
        prompt: "The output of an OR gate is fed to both inputs of a NAND gate. The combination behaves as?",
        steps: ["NAND with tied inputs is NOT: \\(Y = \\overline{A + B}\\)."],
        answer: "A NOR gate",
      },
      selfCheckExample: {
        prompt: "A and B each pass a NOT gate, and the two outputs feed a NOR gate. Equivalent gate?",
        steps: ["\\(\\overline{\\overline{A} + \\overline{B}} = A \\cdot B\\)."],
        answer: "AND",
      },
      practiceSet: [
        { prompt: "A NOR gate followed by a NOT gate is equivalent to?", answer: "OR" },
        { prompt: "(A + B) and \\(\\overline{A\\cdot B}\\) into an AND gate: equivalent to?", answer: "XOR" },
      ],
      pyqExampleId: "326bca64-918d-4afd-826f-bba133e14ae1",
      traps: [
        {
          title: "Missing the bubble",
          body:
            "A small circle on a gate's output (or input) is a NOT. Reading a NAND as an AND flips every answer that follows; check each gate's output for a bubble before writing its expression.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-boolean-output",
      name: "Output and Boolean Expression of a Circuit",
      intuition:
        "Label the output of every gate, left to right, as an expression of the inputs. The last label is Y. For given inputs, you can instead carry actual 0s and 1s through the gates — slower to write, but it cannot go wrong on a sign.",
      definition:
        "- Work gate by gate from the inputs to Y; write each intermediate output.\n" +
        "- For 'which inputs give Y = 1', find the one or two rows that make the last gate 1 and work backwards.\n" +
        "- Given four truth tables to choose from, compute only the rows where the candidates differ.\n" +
        "- \\(A + \\overline{A}B = A + B\\); \\(A\\cdot(A + B) = A\\); \\(\\overline{A\\cdot B} + \\overline{A}B = \\overline{A\\cdot B}\\).",
      formula: {
        label: "Absorption",
        latex: "A + \\overline{A}B = A + B, \\qquad A(A + B) = A",
      },
      authoredExample: {
        prompt: "\\(Y = (A + B)\\cdot C\\). Output for A = 1, B = 0, C = 1, and for A = 1, B = 1, C = 0?",
        steps: ["First: \\((1 + 0)\\cdot 1 = 1\\).", "Second: \\((1 + 1)\\cdot 0 = 0\\)."],
        answer: "1; 0",
      },
      selfCheckExample: {
        prompt: "\\(Y = \\overline{A\\cdot B} + C\\) with A = B = 1, C = 0?",
        steps: ["\\(\\overline{1} + 0 = 0\\)."],
        answer: "0",
      },
      practiceSet: [
        { prompt: "\\(Y = A\\cdot\\overline{B + C}\\). Which inputs make Y = 1?", answer: "A = 1, B = 0, C = 0" },
        { prompt: "Simplify \\(A + \\overline{A}B\\).", answer: "A + B" },
      ],
      pyqExampleId: "81e273f0-5924-492d-afb2-329e5e66bbb8",
      traps: [
        {
          title: "Trusting the pattern, not the gates",
          body:
            "Circuits that LOOK alike on paper can differ by one bubble, and a NAND–NAND pair gives a different answer from an AND–NAND pair. Carry the 0s and 1s through every gate yourself rather than matching the picture to one seen before.",
        },
      ],
    },
  ],
  related: [
    { label: "The Transistor and the CE Amplifier", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-transistors" },
    { label: "Energy Bands and Doping", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-band-theory" },
  ],
};
