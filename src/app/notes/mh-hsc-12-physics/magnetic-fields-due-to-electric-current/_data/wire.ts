import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_WIRE_NOTE: SubtopicNote = {
  subtopicName: "Force on a Current-Carrying Wire",
  title: "The Force on a Current-Carrying Wire",
  oneLineDefinition:
    "The force F = I(L × B) on a straight wire carrying a current in a magnetic field, the force on a wire of any shape, and why the net force on a closed circuit in a uniform field is zero.",
  whyItMatters:
    "5 questions. Two were set in board papers, both on a closed circuit: state the force on it (2023) and obtain the expression for it from the force on a wire of any shape (2025). The textbook adds the force on a rod at the equator, a loop that holds up a hanging mass, and the field needed to levitate a wire.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-wire-force",
      name: "Force on a straight current-carrying wire",
      intuition:
        "A current is a crowd of charges drifting along the wire. Each one feels the sideways magnetic force, and the wire holds them in, so the whole wire is pushed. Add up the force on every drifting charge in a length L and you get a force proportional to the current, the length and the field.",
      definition:
        "- In a length \\(L\\) of wire the drifting charge is \\(q = It\\), where \\(t = L/v_d\\) is the time it takes to cross that length. So \\(q\\vec{v}_d = I\\vec{L}\\).\n" +
        "- The force on it is \\(\\vec{F} = q(\\vec{v}_d \\times \\vec{B}) = I(\\vec{L} \\times \\vec{B})\\), where \\(\\vec{L}\\) points along the current.\n" +
        "- Magnitude: \\(F = BIL\\sin\\theta\\), \\(\\theta\\) being the angle between the wire and the field. It is \\(BIL\\) when the wire is perpendicular to \\(\\vec{B}\\) and zero when the wire lies along \\(\\vec{B}\\).\n" +
        "- For a wire of any shape, add the forces on its small elements: \\(d\\vec{F} = I\\,d\\vec{l} \\times \\vec{B}\\), so \\(\\vec{F} = \\int I\\,d\\vec{l} \\times \\vec{B}\\).",
      formula: {
        label: "Force on a straight wire",
        latex: "\\vec{F} = I(\\vec{L} \\times \\vec{B}), \\qquad F = BIL\\sin\\theta",
        symbols: [
          { symbol: "\\(I\\)", meaning: "current in the wire" },
          { symbol: "\\(\\vec{L}\\)", meaning: "length of wire in the field, pointing along the current" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the wire and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A straight wire 0.5 m long carries a current of 4 A. It lies at 30° to a uniform magnetic field of 0.2 T. Find the force on the wire.",
        steps: [
          "Given: \\(L = 0.5\\) m, \\(I = 4\\) A, \\(B = 0.2\\) T, \\(\\theta = 30^\\circ\\).",
          "Formula: \\(F = BIL\\sin\\theta\\).",
          "Substitution: \\(F = 0.2 \\times 4 \\times 0.5 \\times \\sin 30^\\circ = 0.2 \\times 4 \\times 0.5 \\times 0.5\\).",
          "\\(F = 0.2\\) N, perpendicular to both the wire and the field.",
        ],
        answer: "0.2 N",
      },
      selfCheckExample: {
        prompt:
          "A straight wire 0.3 m long is placed perpendicular to a uniform magnetic field of 0.4 T. What current must it carry to feel a force of 0.06 N?",
        steps: ["\\(F = BIL\\), so \\(I = \\dfrac{F}{BL} = \\dfrac{0.06}{0.4 \\times 0.3}\\).", "\\(I = 0.5\\) A."],
        answer: "0.5 A",
      },
      practiceSet: [
        { prompt: "What is the force on a current-carrying wire that lies along the magnetic field?", answer: "Zero, because \\(\\sin 0^\\circ = 0\\)" },
        { prompt: "A current flows along \\(+x\\) in a magnetic field along \\(+z\\). In which direction is the force on the wire?", answer: "Along \\(-y\\) (\\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\))" },
        { prompt: "The current in a wire is doubled and the length in the field is halved. What happens to the force?", answer: "It stays the same" },
      ],
      pyqExampleId: "8cbfc819-0246-4d12-a379-f656e134a645",
      traps: [
        {
          title: "Taking the angle between the wire and the force",
          body: "In \\(F = BIL\\sin\\theta\\), \\(\\theta\\) is the angle between the wire (the current) and the field. The force itself is always at 90° to both.",
        },
        {
          title: "Mass left in grams",
          body: "When a magnetic force balances a weight, \\(BIL = mg\\), the mass must be in kilograms. A mass left in grams makes the field a thousand times too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-closed-circuit",
      name: "Force on a closed circuit in a uniform field",
      intuition:
        "Walk once round any closed loop and you end where you started, so all your small steps add up to nothing. The force on each element of a loop is \\(I\\,d\\vec{l} \\times \\vec{B}\\), and in a uniform field the same \\(I\\) and \\(\\vec{B}\\) multiply every step. So the forces on a closed loop add up to zero, whatever its shape. They can still turn the loop, which is how a motor works.",
      definition:
        "Derivation outline:\n" +
        "- Force on an element: \\(d\\vec{F} = I\\,d\\vec{l} \\times \\vec{B}\\). For the whole circuit, \\(\\vec{F} = \\oint I\\,d\\vec{l} \\times \\vec{B}\\).\n" +
        "- In a uniform field \\(I\\) and \\(\\vec{B}\\) are constant, so \\(\\vec{F} = I\\left(\\oint d\\vec{l}\\right) \\times \\vec{B}\\).\n" +
        "- \\(\\oint d\\vec{l}\\) is the sum of the small displacement vectors round a closed path. The path returns to its start, so \\(\\oint d\\vec{l} = 0\\).\n" +
        "- Hence \\(\\vec{F} = 0\\): the **net force on a closed circuit in a uniform magnetic field is zero**.\n" +
        "- The **torque** need not be zero: forces on opposite sides are equal and opposite but may act along different lines.",
      formula: {
        label: "Closed circuit in a uniform field",
        latex: "\\vec{F} = I\\left(\\oint d\\vec{l}\\right) \\times \\vec{B} = 0",
      },
      authoredExample: {
        prompt:
          "A square loop of side 10 cm carries a current of 2 A. It is placed with its plane perpendicular to a uniform magnetic field of 0.5 T. Find the force on each side and the net force on the loop.",
        steps: [
          "Given: side \\(a = 0.1\\) m, \\(I = 2\\) A, \\(B = 0.5\\) T. Each side is perpendicular to \\(\\vec{B}\\).",
          "Force on each side: \\(F = BIa = 0.5 \\times 2 \\times 0.1 = 0.1\\) N.",
          "Opposite sides carry the current in opposite directions, so their forces are equal and opposite.",
          "The four forces cancel in pairs: net force \\(= 0\\).",
        ],
        answer: "0.1 N on each side; net force zero",
      },
      selfCheckExample: {
        prompt:
          "A wire bent into a semicircle with its diameter closing the loop carries a current I in a uniform field B perpendicular to its plane. The straight diameter, of length 2R, feels a force 2BIR. What force acts on the curved part?",
        steps: [
          "The whole loop is a closed circuit in a uniform field, so the net force on it is zero.",
          "So the curved part feels a force equal and opposite to that on the diameter.",
        ],
        answer: "2BIR, opposite to the force on the diameter",
      },
      practiceSet: [
        { prompt: "The net force on a closed current loop in a uniform field is zero. Can the torque on it be non-zero?", answer: "Yes. The equal and opposite forces may act along different lines and form a couple" },
        { prompt: "Why is \\(\\oint d\\vec{l}\\) zero for a closed circuit?", answer: "The small displacements round a closed path end where they began, so their vector sum is zero" },
      ],
      pyqExampleId: "45a9a80a-6d1c-4c99-9b4b-484e17d5026e",
      traps: [
        {
          title: "Dropping the word 'uniform'",
          body: "The net force is zero only in a uniform field, where \\(\\vec{B}\\) can be taken out of the integral. State that condition in the derivation and in a one-line answer.",
        },
        {
          title: "Concluding that the loop does not move at all",
          body: "Zero net force means the loop is not pushed as a whole. It can still be turned by a torque, which is how a coil turns in a galvanometer or a motor.",
        },
      ],
    },
  ],
};
