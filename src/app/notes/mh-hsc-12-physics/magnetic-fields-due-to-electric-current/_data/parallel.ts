import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_PARALLEL_NOTE: SubtopicNote = {
  subtopicName: "Force Between Two Parallel Currents",
  title: "The Force Between Two Parallel Currents",
  oneLineDefinition:
    "The force per unit length μ₀I₁I₂/(2πd) between two long parallel wires, why like currents attract and opposite currents repel, and the definition of the ampere that rests on it.",
  whyItMatters:
    "4 questions. Two were set in board papers, and both are the same numerical: find the equal currents in two wires 1.35 cm apart from the force per unit length between them (2023, 2026). The textbook sets the same numerical and asks for the field of one wire at the other and the force it causes, with its direction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-parallel-force",
      name: "Force per unit length between parallel wires",
      intuition:
        "Each wire sits in the circular field of the other, and a current in a field feels a force. Work it out and the wires pull together when their currents flow the same way and push apart when they flow opposite ways. That is the reverse of charges, where likes repel, so it is worth fixing in memory.",
      definition:
        "Derivation outline:\n" +
        "- Wire 1, carrying \\(I_1\\), produces at wire 2 (distance \\(d\\) away) the field \\(B_1 = \\dfrac{\\mu_0 I_1}{2\\pi d}\\), perpendicular to wire 2.\n" +
        "- A length \\(L\\) of wire 2, carrying \\(I_2\\), feels \\(F = I_2 L B_1 = \\dfrac{\\mu_0 I_1 I_2 L}{2\\pi d}\\).\n" +
        "- So the force per unit length is \\(\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\). Wire 1 feels an equal and opposite force.\n" +
        "- **Parallel currents attract; antiparallel currents repel.**\n" +
        "- **The ampere:** one ampere is the current which, flowing in each of two infinitely long parallel wires 1 m apart in vacuum, produces a force of \\(2 \\times 10^{-7}\\) N per metre of length between them.",
      formula: {
        label: "Force per unit length between parallel wires",
        latex: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
        symbols: [
          { symbol: "\\(I_1, I_2\\)", meaning: "currents in the two wires" },
          { symbol: "\\(d\\)", meaning: "distance between the wires" },
          { symbol: "\\(F/L\\)", meaning: "force on each metre of either wire" },
        ],
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 5 cm apart carry currents of 10 A and 20 A in the same direction. Find the force on a 2 m length of either wire and say whether it is attractive or repulsive.",
        steps: [
          "Given: \\(I_1 = 10\\) A, \\(I_2 = 20\\) A, \\(d = 0.05\\) m, \\(L = 2\\) m.",
          "Formula: \\(\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\).",
          "Substitution: \\(\\dfrac{F}{L} = \\dfrac{2 \\times 10^{-7} \\times 10 \\times 20}{0.05} = 8 \\times 10^{-4}\\) N/m.",
          "On 2 m: \\(F = 8 \\times 10^{-4} \\times 2 = 1.6 \\times 10^{-3}\\) N. The currents are in the same direction, so the force is attractive.",
        ],
        answer: "\\(1.6 \\times 10^{-3}\\) N, attractive",
      },
      selfCheckExample: {
        prompt:
          "Two long parallel wires carry currents and attract each other with a certain force per unit length. Both currents are doubled and the distance between the wires is also doubled. By what factor does the force per unit length change?",
        steps: ["\\(\\dfrac{F}{L} \\propto \\dfrac{I_1 I_2}{d}\\).", "The factor is \\(\\dfrac{2 \\times 2}{2} = 2\\)."],
        answer: "It doubles",
      },
      practiceSet: [
        { prompt: "What is the force per metre between two infinitely long parallel wires 1 m apart in vacuum, each carrying 1 A?", answer: "\\(2 \\times 10^{-7}\\) N/m" },
        { prompt: "Do two parallel wires carrying currents in opposite directions attract or repel?", answer: "They repel" },
      ],
      pyqExampleId: "0a3abf92-7d7e-41bf-90fb-f8415033942e",
      traps: [
        {
          title: "Taking like currents to repel",
          body: "For currents, like attracts: currents in the same direction pull the wires together. This is the opposite of electric charges, so say it carefully.",
        },
        {
          title: "Forgetting the square root",
          body: "When the two currents are equal, the formula gives \\(I^2\\). The last step is to take the square root; stopping at \\(I^2\\) gives a number in A² and loses the answer mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmg-parallel-direction",
      name: "Directions of the field and the force between two wires",
      intuition:
        "Two rules settle every direction here. The thumb rule gives the field of one wire at the other, and \\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\) gives the push that field causes. Do them in that order and the answer comes out right every time.",
      definition:
        "- Step 1: the field of wire 2 at wire 1, from the right hand thumb rule (thumb along the current in wire 2).\n" +
        "- Step 2: the force on wire 1 from \\(\\vec{F} = I_1\\vec{L} \\times \\vec{B}_2\\).\n" +
        "- By Newton's third law the force on wire 2 due to wire 1 is equal and opposite, even when the currents are different.",
      table: {
        columns: ["Situation", "Rule", "Result"],
        rows: [
          { cells: ["Field of a long wire", "Right hand thumb rule: thumb along the current, curled fingers give the field", "Circles round the wire, perpendicular to the plane of the two wires at the other wire"] },
          { cells: ["Currents in the same direction", "\\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\) on each wire", "The wires attract"] },
          {
            cells: ["Currents in opposite directions", "\\(\\vec{F} = I\\vec{L} \\times \\vec{B}\\) on each wire", "The wires repel"],
            pyqExampleId: "754b83ae-e272-4cb6-9cec-a170de9925f6",
            noteAmber: "The textbook asks for the field of one wire at the other and the force it causes, each with its direction: give both.",
          },
          { cells: ["Unequal currents", "Newton's third law", "The two forces are still equal in size and opposite in direction"] },
        ],
      },
      selfCheckExample: {
        prompt: "Wire A carries 2 A and a parallel wire B carries 8 A. The force on a metre of wire A is F. What is the force on a metre of wire B?",
        steps: ["\\(F/L = \\mu_0 I_A I_B/(2\\pi d)\\) is the same expression for both wires.", "So wire B feels F, in the opposite direction."],
        answer: "F, opposite in direction",
      },
      practiceSet: [
        { prompt: "Which law tells you that two parallel wires exert equal forces on each other?", answer: "Newton's third law" },
        { prompt: "Which rule gives the direction of the field round a long straight wire?", answer: "The right hand thumb rule" },
      ],
      traps: [
        {
          title: "Thinking the larger current feels the larger force",
          body: "Both wires feel the same force per unit length, \\(\\mu_0 I_1 I_2/(2\\pi d)\\). The product of the currents is shared.",
        },
        {
          title: "Giving the force but not the field direction",
          body: "When a question asks for the field of one wire at the other and the force, each needs its own direction. Two directions, two marks.",
        },
      ],
    },
  ],
};
