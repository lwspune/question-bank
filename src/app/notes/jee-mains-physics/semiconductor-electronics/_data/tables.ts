import type { SubtopicNote } from "@/app/notes/_types";

export const TABLES_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Logic Gates: Truth Tables, Waveforms and Input Conditions",
  title: "Logic Gates: Truth Tables, Waveforms and Input Conditions",
  oneLineDefinition:
    "Reduce the network to one expression for Y, then evaluate it: for every input row of a truth table, for every interval of a waveform, or backwards, for the inputs that give a required output.",
  whyItMatters:
    "Thirty-two PYQs, every one multiple choice, and eight from 2026: the largest page in the chapter and the one asked most recently. Sixteen ask for the truth table or the output of a drawn network. Eight ask which inputs make an LED or bulb glow, or make the output go low. Eight give the inputs as waveforms and ask for the output waveform, or for the gate that made it. All of them are the same skill applied three ways, so one careful method is worth more than any shortcut.",
  concepts: [
    // C1 — truth tables
    {
      kind: "reference" as const,
      slug: "jpsemi-truth-tables",
      name: "Truth tables of the basic gates",
      intuition:
        "Each basic gate has one row that is different from the other three. AND is 1 only for (1, 1); OR is 0 only for (0, 0); NAND and NOR are those with every output flipped. XOR is 1 when the inputs differ and XNOR when they match. Learn those single rows and any table can be written out in seconds.",
      definition:
        "- For a network, write Y gate by gate, simplify, then evaluate it for every input row.\n" +
        "- Read the row order the options use before matching. (0,0), (0,1), (1,1), (1,0) is a common order, not only (0,0), (0,1), (1,0), (1,1).\n" +
        "- One row is rarely enough: (0,0) → 1 fits NAND, NOR and XNOR alike. Check a second row.\n" +
        "- Multi-bit inputs, such as two 4-bit numbers, are evaluated bit by bit, place by place.",
      table: {
        columns: ["Gate", "Output Y", "Y for (0,0), (0,1), (1,0), (1,1)", "Y is 1 when"],
        rows: [
          { cells: ["AND", "\\(A\\cdot B\\)", "0, 0, 0, 1", "both inputs are 1"] },
          { cells: ["OR", "\\(A + B\\)", "0, 1, 1, 1", "at least one input is 1"] },
          { cells: ["NOT", "\\(\\overline{A}\\)", "1 for A = 0; 0 for A = 1", "the input is 0"] },
          { cells: ["NAND", "\\(\\overline{A\\cdot B}\\)", "1, 1, 1, 0", "at least one input is 0"] },
          { cells: ["NOR", "\\(\\overline{A + B}\\)", "1, 0, 0, 0", "both inputs are 0"] },
          { cells: ["XOR", "\\(A\\overline{B} + \\overline{A}B\\)", "0, 1, 1, 0", "the inputs differ"] },
          { cells: ["XNOR", "\\(AB + \\overline{A}\\,\\overline{B}\\)", "1, 0, 0, 1", "the inputs are equal"] },
        ],
        caption: "The row that differs from the other three identifies each two-input gate.",
      },
      selfCheckExample: {
        prompt:
          "Y is the output of a NOR gate whose inputs are A and \\(\\overline{B}\\). Write the truth table for (A, B) = (0,0), (0,1), (1,0), (1,1).",
        steps: [
          "\\(Y = \\overline{A + \\overline{B}} = \\overline{A}\\cdot B\\) by De Morgan.",
          "Y = 1 only when A = 0 and B = 1.",
          "In order: 0, 1, 0, 0.",
        ],
        answer: "Y = 0, 1, 0, 0",
      },
      practiceSet: [
        { prompt: "A = 1100 and B = 1010 go into an XOR gate bit by bit. Output?", answer: "0110" },
        { prompt: "A two-input gate's output is 0 only when both inputs are 1. Which gate?", answer: "NAND" },
        { prompt: "\\(Y = A + \\overline{B}\\). Value of Y for A = 0, B = 1?", answer: "0" },
        { prompt: "Which two-input gate gives 1, 0, 0, 1 for (0,0), (0,1), (1,0), (1,1)?", answer: "XNOR" },
      ],
      pyqExampleId: "10bc0de0-2581-41d3-8ed6-10d7b3a6e47a", // 2024: Y = Ā + AB = Ā + B, table 1, 1, 0, 1
      traps: [
        {
          title: "Check the row order",
          body: "Options often list the inputs as (0,0), (0,1), (1,1), (1,0). Matching outputs against the order you wrote, rather than the order printed, picks a wrong table that looks right.",
        },
        {
          title: "One row fits several gates",
          body: "An output of 1 for (0,0) is true of NAND, NOR and XNOR. Use a second row, such as (0,1), to tell them apart.",
        },
        {
          title: "Invert the right input",
          body: "A NOT gate on one input changes only that input. Writing Ā where the circuit inverts B gives the mirror-image table, which is usually an option.",
        },
      ],
    },

    // C2 — inputs for a required output
    {
      kind: "formula" as const,
      slug: "jpsemi-find-inputs",
      name: "Finding the inputs that give a required output",
      intuition:
        "Here the output is given and the inputs are asked for, so work backwards. An AND output of 1 needs every input 1; an OR output of 0 needs every input 0. Follow that back gate by gate. With only four options, putting each one through the circuit is just as quick, and it checks the backward working.",
      definition:
        "- Write the expression for every output the question names: Y, or the outputs driving each LED.\n" +
        "- An AND gate's output is 1 only if all its inputs are 1; an OR gate's output is 0 only if all its inputs are 0. A NAND output is 0 only if all its inputs are 1; a NOR output is 1 only if all its inputs are 0.\n" +
        "- An LED from a gate output to earth glows when that output is 1. An LED between two outputs glows only when its anode side is 1 and its cathode side is 0.\n" +
        "- A wire from an input can run to a later gate as well. Trace every wire from each input before writing the expression.\n" +
        "- An input that does not appear in the simplified expression is free: either value works.",
      authoredExample: {
        prompt:
          "An LED from Y to earth is driven by \\(Y = \\overline{A + B}\\cdot C\\). For which inputs does it glow?",
        steps: [
          "The LED glows when Y = 1.",
          "Y is an AND of \\(\\overline{A + B}\\) and C, so both must be 1: C = 1.",
          "\\(\\overline{A + B} = 1\\) means A + B = 0, so A = 0 and B = 0.",
        ],
        answer: "Only A = 0, B = 0, C = 1.",
      },
      selfCheckExample: {
        prompt:
          "LED-1 is driven by \\(P = A\\cdot B\\) and LED-2 by \\(Q = \\overline{B} + C\\), each to earth. Which inputs make both glow?",
        steps: [
          "LED-1 needs P = 1: A = 1 and B = 1.",
          "With B = 1, \\(\\overline{B} = 0\\), so Q = 1 needs C = 1.",
        ],
        answer: "A = 1, B = 1, C = 1.",
      },
      practiceSet: [
        { prompt: "\\(Y = A\\cdot\\overline{B}\\). For which inputs is Y = 1?", answer: "A = 1, B = 0" },
        { prompt: "\\(Y = \\overline{A\\cdot B}\\). For which inputs is Y = 0?", answer: "A = 1, B = 1" },
        { prompt: "\\(Y = (A + B)\\cdot\\overline{C}\\). What does Y = 1 need?", answer: "C = 0, and at least one of A and B equal to 1" },
        { prompt: "An LED has its anode side on output P = A and its cathode side on output Q = B. When does it glow?", answer: "A = 1, B = 0" },
      ],
      pyqExampleId: "644b2fc8-0417-4340-beb7-a599760c601b", // 2026: two LEDs, Q = A·C, both glow for A = 1, C = 1
      traps: [
        {
          title: "Trace every wire from each input",
          body: "An input wire can branch and feed a gate further along as well as the first gate. Missing that branch gives an expression with a variable left out and the wrong set of inputs.",
        },
        {
          title: "An LED between two outputs needs a difference",
          body: "If both ends of an LED are at logic 1, or both at 0, no current flows and it stays dark. It glows only when its anode side is 1 and its cathode side is 0.",
        },
        {
          title: "Do not over-constrain a free input",
          body: "If an input drops out of the simplified expression, any value of it works. An option is not wrong just because that input is 0 rather than 1.",
        },
      ],
    },

    // C3 — waveforms
    {
      kind: "formula" as const,
      slug: "jpsemi-waveforms",
      name: "Output waveforms of a gate network",
      intuition:
        "A waveform question is a truth table spread out in time. Between two moments when an input changes, both inputs are steady, so the output is steady too. Mark every edge of either input, read the pair (A, B) in each interval, and the output in that interval is one row of the truth table.",
      definition:
        "- Reduce the network to one expression for Y first.\n" +
        "- Mark every instant where either input switches. Between two marks, A and B are constant.\n" +
        "- Evaluate Y for each interval and draw it. Y can change only at an input edge.\n" +
        "- The reverse question gives A, B and Y: read the triple (A, B, Y) in each interval and match the rows to a gate's truth table.",
      authoredExample: {
        prompt:
          "Over 8 ms, A is high from 0 to 4 ms and low from 4 to 8 ms. B is high from 2 to 6 ms and low otherwise. Find the output of an XOR gate in each interval.",
        steps: [
          "Input edges at 2, 4 and 6 ms give four intervals.",
          "0 to 2 ms: (1, 0), Y = 1. 2 to 4 ms: (1, 1), Y = 0.",
          "4 to 6 ms: (0, 1), Y = 1. 6 to 8 ms: (0, 0), Y = 0.",
        ],
        answer: "Y is high from 0 to 2 ms and from 4 to 6 ms, low otherwise.",
      },
      selfCheckExample: {
        prompt:
          "Over 6 s, A is high from 0 to 3 s and low from 3 to 6 s. B is low from 0 to 1 s, high from 1 to 5 s and low from 5 to 6 s. Find the output of a NAND gate.",
        steps: [
          "Intervals: 0 to 1 s (1, 0); 1 to 3 s (1, 1); 3 to 5 s (0, 1); 5 to 6 s (0, 0).",
          "NAND is 0 only for (1, 1): Y = 1, 0, 1, 1.",
        ],
        answer: "Y is low only from 1 to 3 s.",
      },
      practiceSet: [
        { prompt: "In three intervals the inputs (A, B) are (1, 1), (0, 1) and (0, 0). Output of an OR gate in each?", answer: "1, 1, 0" },
        { prompt: "When is the output of an AND gate high, read from two waveforms?", answer: "Only where both inputs are high at the same time" },
        { prompt: "Intervals read (A, B, Y) = (0,0,1), (1,0,0), (0,1,0), (1,1,0). Which gate?", answer: "NOR" },
        { prompt: "Can the output change in the middle of an interval where neither input changes?", answer: "No" },
      ],
      pyqExampleId: "8f4d6b84-46f3-4ded-8619-c8fa54cdc369", // 2023: tied NANDs into a NAND, OR on waveforms
      traps: [
        {
          title: "Mark the edges of both inputs",
          body: "Splitting time only where A changes misses the intervals where B alone switches. Every edge of either input starts a new interval.",
        },
        {
          title: "Reduce first, then read the waveforms",
          body: "Working gate by gate through every interval invites slips. Reduce the network to one gate first; a chain of tied NANDs into a NAND, for example, is just OR.",
        },
        {
          title: "Name the gate from all the intervals",
          body: "When the question gives the output waveform and asks for the gate, collect every (A, B, Y) triple. Two intervals can fit more than one gate; four rows fix it.",
        },
      ],
    },
  ],
};
