import type { SubtopicNote } from "@/app/notes/_types";

export const GATES_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Logic Gates: Reducing a Network to One Gate",
  title: "Logic Gates: Reducing a Network to One Gate",
  oneLineDefinition:
    "Write each gate's output in turn, from the inputs to Y, and simplify with De Morgan's laws until one basic gate, or a constant, is left.",
  whyItMatters:
    "Twenty-five PYQs, all but one multiple choice, and two from 2026. Nine are chains of NAND or NOR gates, often with tied inputs, that turn out to be a single AND, OR, NAND or NOR. Ten are mixed networks that need a line or two of Boolean algebra, and two of those reduce to a constant output. Six build gates from diodes, transistors or switches; none of those six is newer than 2023. Almost every question is a drawn circuit, so reading the symbols and the bubbles correctly is half the work.",
  concepts: [
    // C1 — universal gates and De Morgan
    {
      kind: "formula" as const,
      slug: "jpsemi-universal",
      name: "NAND and NOR as universal gates",
      intuition:
        "A NAND or NOR gate with its two inputs joined has only one input, and it simply inverts it. With that NOT in hand, De Morgan's laws turn NAND into OR and NOR into AND once the inputs are inverted. That is why either gate alone can build every other gate, and why so many questions are chains of them.",
      definition:
        "- Notation: \\(A\\cdot B\\) is AND, \\(A + B\\) is OR, \\(\\overline{A}\\) is NOT A.\n" +
        "- AND is 1 only when every input is 1. OR is 0 only when every input is 0. NAND and NOR are AND and OR followed by NOT.\n" +
        "- A small circle (bubble) on a gate's output inverts the output; a bubble on an input inverts that input.\n" +
        "- **Tied inputs:** NAND\\((A, A) = \\overline{A}\\) and NOR\\((A, A) = \\overline{A}\\), both NOT gates. AND or OR with tied inputs just passes A on.\n" +
        "- **De Morgan:** \\(\\overline{A\\cdot B} = \\overline{A} + \\overline{B}\\) and \\(\\overline{A + B} = \\overline{A}\\cdot\\overline{B}\\).\n" +
        "- So a NAND fed with \\(\\overline{A}\\) and \\(\\overline{B}\\) is an OR gate, and a NOR fed with \\(\\overline{A}\\) and \\(\\overline{B}\\) is an AND gate. One more tied-input gate after either inverts it again.\n" +
        "- Gate counts from NAND alone: NOT 1, AND 2, OR 3.",
      formula: {
        label: "De Morgan's laws",
        latex: "\\overline{A\\cdot B} = \\overline{A} + \\overline{B}, \\qquad \\overline{A + B} = \\overline{A}\\cdot\\overline{B}",
      },
      authoredExample: {
        prompt: "Build an AND gate using only NAND gates. How many are needed?",
        steps: [
          "A NAND gate on A and B gives \\(\\overline{A\\cdot B}\\).",
          "Feed that into a second NAND gate with both inputs tied together, which acts as NOT.",
          "Its output is \\(\\overline{\\overline{A\\cdot B}} = A\\cdot B\\).",
        ],
        answer: "Two NAND gates: a NAND followed by a tied-input NAND.",
      },
      selfCheckExample: {
        prompt: "Build an OR gate using only NOR gates. How many are needed?",
        steps: [
          "A NOR gate on A and B gives \\(\\overline{A + B}\\).",
          "A second NOR gate with tied inputs inverts it: \\(\\overline{\\overline{A + B}} = A + B\\).",
        ],
        answer: "Two NOR gates.",
      },
      practiceSet: [
        { prompt: "A NOR gate has both inputs tied to A. Output?", answer: "\\(\\overline{A}\\) (a NOT gate)" },
        { prompt: "Simplify \\(\\overline{\\overline{A} + \\overline{B}}\\).", answer: "\\(A\\cdot B\\)" },
        { prompt: "How many NAND gates are needed to make an OR gate?", answer: "Three" },
        { prompt: "Simplify \\(\\overline{\\overline{A}}\\).", answer: "A" },
      ],
      pyqExampleId: "0a9997e8-f308-4e15-80b4-84de668a85d1", // 2022: two tied NORs into a NOR, AND
      traps: [
        {
          title: "A tied-input NAND is a NOT",
          body: "A two-input gate drawn with its inputs joined has only one input. A NAND or NOR wired that way is an inverter, not a two-input gate, and missing this makes the whole chain come out wrong.",
        },
        {
          title: "De Morgan flips the operation and every bar",
          body: "Breaking a long bar changes AND into OR (or OR into AND) and puts a bar on each term. Changing only one of the two gives a wrong gate.",
        },
        {
          title: "Look for bubbles on the inputs",
          body: "A bubble where a wire enters a gate inverts that input before the gate acts. Reading such a gate as plain AND or OR gives the wrong expression from the first step.",
        },
      ],
    },

    // C2 — Boolean simplification
    {
      kind: "formula" as const,
      slug: "jpsemi-equivalent",
      name: "Reducing a gate network with Boolean algebra",
      intuition:
        "Any network of gates is just an expression in A and B. Write the output of each gate in turn, then simplify with a handful of rules. The answer is usually a single named gate; sometimes it is a constant that never changes. If the algebra stalls, a four-row truth table always settles it.",
      definition:
        "- Write each gate's output as an expression, working from the inputs towards Y.\n" +
        "- Basic rules: \\(A + A = A\\), \\(A\\cdot A = A\\), \\(A + \\overline{A} = 1\\), \\(A\\cdot\\overline{A} = 0\\), \\(A + 1 = 1\\), \\(A\\cdot 0 = 0\\).\n" +
        "- Absorption: \\(A + A\\cdot B = A\\) and \\(A\\cdot(A + B) = A\\). If AB is 1 then A + B is 1 too, so \\((A + B)\\cdot AB = AB\\).\n" +
        "- \\(A + \\overline{A}\\cdot B = A + B\\).\n" +
        "- **XOR:** \\(A\\overline{B} + \\overline{A}B\\), which is 1 when the inputs differ. **XNOR** is its complement, 1 when they are equal.\n" +
        "- A network can reduce to a constant: then Y is 0 (or 1) for every input.\n" +
        "- If unsure, evaluate Y for (0,0), (0,1), (1,0), (1,1) and match the pattern to a gate.",
      formula: {
        label: "Simplifying rules",
        latex: "A + AB = A, \\quad A(A + B) = A, \\quad A + \\overline{A}B = A + B, \\quad A \\oplus B = A\\overline{B} + \\overline{A}B",
      },
      authoredExample: {
        prompt:
          "An AND gate and an OR gate both take inputs A and B. Their outputs feed a NOR gate, whose output is Y. Which single gate is the network equal to?",
        steps: [
          "The AND gate gives \\(AB\\) and the OR gate gives \\(A + B\\).",
          "The NOR gate gives \\(Y = \\overline{AB + A + B}\\).",
          "Absorption: \\(A + AB = A\\), so \\(AB + A + B = A + B\\).",
          "\\(Y = \\overline{A + B}\\).",
        ],
        answer: "A NOR gate.",
      },
      selfCheckExample: {
        prompt:
          "A NAND gate takes A and B, and its output goes into an AND gate together with B. Find Y in its simplest form, and the only input pair that gives Y = 1.",
        steps: [
          "\\(Y = \\overline{AB}\\cdot B = (\\overline{A} + \\overline{B})\\cdot B\\).",
          "\\(= \\overline{A}B + \\overline{B}B = \\overline{A}B + 0 = \\overline{A}B\\).",
          "Y = 1 only when A = 0 and B = 1.",
        ],
        answer: "\\(Y = \\overline{A}B\\); only A = 0, B = 1.",
      },
      practiceSet: [
        { prompt: "Simplify \\(A + \\overline{A}\\).", answer: "1" },
        { prompt: "Simplify \\(A\\cdot(A + B)\\).", answer: "A" },
        { prompt: "Simplify \\(A\\cdot\\overline{A} + B\\).", answer: "B" },
        { prompt: "Which gate gives 1 exactly when its two inputs are equal?", answer: "XNOR" },
      ],
      pyqExampleId: "14237334-0378-4e57-8516-947e9c6fd30d", // 2023: OR and AND into NAND then NOT, AND
      traps: [
        {
          title: "AB already implies A + B",
          body: "Whenever AB is 1, A + B is 1 as well. So AB·(A + B) is just AB, and AB + (A + B) is just A + B. Missing this leaves an expression that looks like no gate at all.",
        },
        {
          title: "A constant answer is allowed",
          body: "Some networks combine a signal with its own inverse, as in A·Ā or A + Ā. The output is then 0 or 1 for every input, and an option such as 'Y = 0' is the right one.",
        },
        {
          title: "XOR and XNOR are complements",
          body: "XOR is 1 when the inputs differ; XNOR is 1 when they match. An extra inverter at the end swaps one for the other, so count the bubbles.",
        },
      ],
    },

    // C3 — gates from components
    {
      kind: "reference" as const,
      slug: "jpsemi-switch-gates",
      name: "Logic gates built from diodes, transistors and switches",
      intuition:
        "A gate can be built from parts you already know. A high voltage is logic 1 and 0 V is logic 0. Diodes decide whether any one input, or every input, can set the output. A transistor in common emitter turns a high input into a low output, so it is a NOT gate. Switches and a lamp work the same way, with a closed switch as 1 and a lit lamp as 1.",
      definition:
        "- **Diode OR:** anodes at the inputs, cathodes joined, output across a resistor to earth. Any high input drives the output high.\n" +
        "- **Diode AND:** cathodes at the inputs, anodes joined and pulled up to the supply through a resistor. Any low input pulls the output low.\n" +
        "- **Transistor NOT:** a high input at the base turns the transistor on, and the collector output falls to about 0 V.\n" +
        "- A diode AND or OR followed by a transistor NOT gives NAND or NOR.\n" +
        "- **Switches:** in series with a lamp they make AND; in parallel they make OR. Switches that short the lamp when closed invert the result.\n" +
        "- None of the six bank questions on this concept is newer than 2023.",
      table: {
        columns: ["Circuit", "Output is high when", "Gate"],
        rows: [
          { cells: ["Two diodes with anodes at the inputs; output across a resistor to earth", "either input is high", "OR"] },
          { cells: ["Two diodes with cathodes at the inputs; output pulled up to the supply through a resistor", "both inputs are high", "AND"] },
          { cells: ["Transistor in common emitter; input at the base, output at the collector", "the input is low", "NOT"] },
          { cells: ["Diode AND feeding a transistor inverter", "at least one input is low", "NAND"] },
          { cells: ["Diode OR feeding a transistor inverter", "both inputs are low", "NOR"] },
          { cells: ["Two switches in series with a lamp", "both switches are closed", "AND"] },
          { cells: ["Two switches in parallel, together in series with a lamp", "either switch is closed", "OR"] },
          { cells: ["Two switches in parallel across the lamp, shorting it when closed", "both switches are open", "NOR"] },
          { cells: ["Two switches in series across the lamp, shorting it when both are closed", "at least one switch is open", "NAND"] },
        ],
        caption: "The diodes' direction separates AND from OR; a transistor or a shorting switch adds the NOT.",
      },
      selfCheckExample: {
        prompt:
          "Two ideal diodes have their cathodes at inputs A and B and their anodes joined at X, which is pulled up to 5 V through a resistor. A is at 5 V and B is at 0 V. Is X high or low, and which gate is this?",
        steps: [
          "The diode at B has its anode pulled up and its cathode at 0 V, so it conducts.",
          "It holds X at about 0 V: the output is low.",
          "X is high only when both inputs are high: an AND gate.",
        ],
        answer: "Low; an AND gate.",
      },
      practiceSet: [
        { prompt: "A transistor in common emitter has its base driven high. Is the collector output high or low?", answer: "Low" },
        { prompt: "Which gate do two switches in series with a lamp make?", answer: "AND" },
        { prompt: "Logic 1 is 10 V. A diode OR gate with ideal diodes gets 10 V at one input and 0 V at the other. Output voltage?", answer: "10 V" },
        { prompt: "A diode OR circuit feeds a transistor inverter. Which gate is the whole circuit?", answer: "NOR" },
      ],
      pyqExampleId: "1a2261a5-83aa-4ac6-96e5-67d07f8b4a0a", // 2022: diode AND into an npn inverter, NAND
      traps: [
        {
          title: "The diodes' direction decides AND or OR",
          body: "Anodes at the inputs with the output pulled down make OR; cathodes at the inputs with the output pulled up make AND. Check which end of each diode faces the input before naming the gate.",
        },
        {
          title: "A transistor stage inverts",
          body: "Taking the output from the collector of a common-emitter transistor turns the diode gate before it into its inverse: AND becomes NAND, OR becomes NOR.",
        },
        {
          title: "Switches across the lamp invert",
          body: "Switches in line with a lamp light it when closed. Switches placed across the lamp short it out when closed, so the lamp is lit only when they are open: the gate is inverted.",
        },
      ],
    },
  ],
};
