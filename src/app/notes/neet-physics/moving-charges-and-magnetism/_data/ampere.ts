import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MC_AMPERE_NOTE: SubtopicNote = {
  subtopicName: "Ampere's Law, Solenoids and Parallel Wires",
  title: "Ampere's Law, Solenoids and Parallel Wires",
  oneLineDefinition:
    "Ampere's circuital law and the fields it gives for a long straight wire, a thick wire and a long solenoid, and the force between two parallel currents.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Three ask how the field of a thick wire varies inside and outside it (2021, 2022, 2026), one finds the field in a solenoid (2022), one balances the pull between two parallel wires against a wire's weight (Re-NEET 2026) and one finds the force on an electron moving beside a long wire (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmc-ampere",
      name: "Ampere's circuital law and the field of a straight wire",
      intuition:
        "Walk round any closed path and add up the field along your steps. Ampere's law says the total depends only on the current passing through the path, not on the shape of the path. Round a long straight wire the field is the same at every point of a circle, so the law gives the field in one line.",
      definition:
        "- Ampere's circuital law: \\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}\\), where \\(I_{\\text{enc}}\\) is the net current through the closed path. Currents outside the path do not count.\n" +
        "- Long straight wire: \\(B \\cdot 2\\pi r = \\mu_0 I\\), so \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\). The field lines are circles round the wire; the right-hand thumb along the current gives their sense.\n" +
        "- **Thick (solid) wire of radius a, current spread evenly:**\n" +
        "- Inside (\\(r < a\\)) the path encloses only \\(I\\dfrac{r^{2}}{a^{2}}\\), so \\(B = \\dfrac{\\mu_0 I r}{2\\pi a^{2}}\\): zero on the axis, rising in a straight line with r.\n" +
        "- Outside (\\(r > a\\)) \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\): falling as \\(\\dfrac{1}{r}\\). The field is largest at the surface.",
      formula: {
        label: "Ampere's law",
        latex: "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}, \\qquad B_{\\text{wire}} = \\frac{\\mu_0 I}{2\\pi r}, \\qquad B_{\\text{inside}} = \\frac{\\mu_0 I r}{2\\pi a^{2}}",
        symbols: [
          { symbol: "\\(I_{\\text{enc}}\\)", meaning: "net current through the closed path" },
          { symbol: "\\(a\\)", meaning: "radius of the thick wire" },
          { symbol: "\\(r\\)", meaning: "distance from the axis of the wire" },
        ],
      },
      authoredExample: {
        prompt: "A long straight wire carries 10 A. Find the magnetic field 5 cm from it.",
        steps: [
          "\\(B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{2 \\times 10^{-7} \\times 10}{0.05}\\).",
          "\\(B = \\dfrac{2 \\times 10^{-6}}{0.05} = 4 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(4 \\times 10^{-5}\\) T",
      },
      selfCheckExample: {
        prompt:
          "The field 4 cm from a long straight wire is \\(5 \\times 10^{-5}\\) T. What is the field 10 cm from it?",
        steps: [
          "Outside the wire \\(B \\propto \\dfrac{1}{r}\\).",
          "\\(B' = 5 \\times 10^{-5} \\times \\dfrac{4}{10} = 2 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(2 \\times 10^{-5}\\) T",
      },
      practiceSet: [
        { prompt: "State Ampere's circuital law in words.", answer: "The line integral of B round a closed path equals \\(\\mu_0\\) times the net current through the path" },
        { prompt: "A long straight wire carries 5 A. Find the field 10 cm from it.", answer: "\\(1 \\times 10^{-5}\\) T" },
        { prompt: "Describe the field lines round a long straight current-carrying wire.", answer: "Circles centred on the wire, in planes perpendicular to it" },
        { prompt: "A closed path encloses 3 A flowing up and 1 A flowing down. What is \\(\\oint \\vec{B} \\cdot d\\vec{l}\\) round it?", answer: "\\(2\\mu_0\\) (in SI units)" },
      ],
      pyqExampleId: "8c74379c-7585-4dc9-8a6c-c579adac3256",
      traps: [
        {
          title: "Inside a thick wire B grows with r",
          body: "Inside a solid wire with evenly spread current the enclosed current grows as \\(r^{2}\\), so \\(B \\propto r\\), not \\(\\dfrac{1}{r}\\). The field is zero on the axis and largest at the surface.",
        },
        {
          title: "Only enclosed current counts",
          body: "In Ampere's law, currents outside the closed path add nothing to \\(\\oint \\vec{B} \\cdot d\\vec{l}\\), and opposite currents inside the path subtract.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-solenoid",
      name: "Field inside a long solenoid",
      intuition:
        "A solenoid is a long coil of many closely wound turns. Inside, the fields of all the turns point the same way along the axis and add up to a strong, uniform field. Outside, they nearly cancel. Only how tightly the turns are packed and the current matter, not how wide the coil is.",
      definition:
        "- Inside a long solenoid: \\(B = \\mu_0 n I\\), where \\(n = \\dfrac{N}{L}\\) is the number of turns per **metre**.\n" +
        "- The field inside is uniform and along the axis; outside a long solenoid it is nearly zero.\n" +
        "- B does not depend on the radius of the solenoid.\n" +
        "- If the coil has several layers, count every turn of every layer in N.",
      formula: {
        label: "Solenoid",
        latex: "B = \\mu_0 n I, \\qquad n = \\frac{N}{L}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "turns per metre" },
          { symbol: "\\(N\\)", meaning: "total number of turns" },
          { symbol: "\\(L\\)", meaning: "length of the solenoid" },
        ],
      },
      authoredExample: {
        prompt: "A solenoid 50 cm long has 500 turns and carries 2 A. Find the field inside it.",
        steps: [
          "\\(n = \\dfrac{500}{0.5} = 1000\\) turns per metre.",
          "\\(B = \\mu_0 n I = 4\\pi \\times 10^{-7} \\times 1000 \\times 2 = 8\\pi \\times 10^{-4}\\) T.",
        ],
        answer: "\\(8\\pi \\times 10^{-4}\\) T, about \\(2.5 \\times 10^{-3}\\) T",
      },
      selfCheckExample: {
        prompt:
          "The current in a long solenoid is doubled and the coil is rewound with half as many turns per metre. What happens to the field inside?",
        steps: [
          "\\(B = \\mu_0 n I\\), so B changes by the product of the two factors.",
          "\\(2 \\times \\dfrac{1}{2} = 1\\).",
        ],
        answer: "It stays the same",
      },
      practiceSet: [
        { prompt: "Does the field inside a long solenoid depend on its radius?", answer: "No" },
        { prompt: "What is the field just outside a long solenoid, compared with inside?", answer: "Nearly zero" },
        { prompt: "Write 20 turns per centimetre as turns per metre.", answer: "2000 turns per metre" },
        { prompt: "The field inside a long solenoid is \\(2 \\times 10^{-3}\\) T. The current is tripled. What is the new field?", answer: "\\(6 \\times 10^{-3}\\) T" },
      ],
      pyqExampleId: "3b7e6b9b-e51d-40fb-bf7c-bbdf958fdb38",
      traps: [
        {
          title: "Turns per millimetre must become turns per metre",
          body: "In \\(B = \\mu_0 n I\\), n is turns per metre. 100 turns per mm is \\(10^{5}\\) turns per metre; leaving it per mm makes the answer 1000 times too small.",
        },
        {
          title: "The radius does not enter",
          body: "The field inside a long solenoid is \\(\\mu_0 n I\\) whatever its radius. A radius given in the question is not needed.",
        },
        {
          title: "Count every layer",
          body: "A coil with 4 layers of 500 turns has 2000 turns in all. Use the total turns over the length for n.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-parallel",
      name: "Force between parallel currents",
      intuition:
        "Each wire sits in the field of the other, so each feels a force. When the currents run the same way the wires pull together; when they run opposite ways they push apart. This is the reverse of charges, where likes repel. A single charge moving beside a wire is a tiny current of its own and feels the same kind of pull or push.",
      definition:
        "- Two long parallel wires a distance d apart: force per unit length \\(\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\).\n" +
        "- **Currents in the same direction attract; opposite directions repel.**\n" +
        "- The forces on the two wires are equal and opposite (Newton's third law), even when the currents differ.\n" +
        "- One ampere is the current that, in two long parallel wires 1 m apart in vacuum, gives a force of \\(2 \\times 10^{-7}\\) N per metre.\n" +
        "- A charge moving beside a long wire feels \\(F = qvB\\) with \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\). A positive charge moving along the current is pulled toward the wire.",
      formula: {
        label: "Parallel currents",
        latex: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance between the wires" },
          { symbol: "\\(I_1, I_2\\)", meaning: "currents in the two wires" },
        ],
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 10 cm apart carry 5 A and 10 A in the same direction. Find the force per metre and say whether it attracts or repels.",
        steps: [
          "\\(\\dfrac{F}{L} = \\dfrac{2 \\times 10^{-7} \\times 5 \\times 10}{0.1}\\).",
          "\\(\\dfrac{F}{L} = \\dfrac{10^{-5}}{0.1} = 10^{-4}\\) N/m. Same direction, so the wires attract.",
        ],
        answer: "\\(10^{-4}\\) N per metre, attractive",
      },
      selfCheckExample: {
        prompt:
          "Two parallel wires carry currents. Both currents are doubled and the distance between the wires is also doubled. By what factor does the force per metre change?",
        steps: [
          "\\(\\dfrac{F}{L} \\propto \\dfrac{I_1 I_2}{d}\\).",
          "\\(\\dfrac{2 \\times 2}{2} = 2\\).",
        ],
        answer: "It doubles",
      },
      practiceSet: [
        { prompt: "Two parallel wires carry currents in opposite directions. Do they attract or repel?", answer: "They repel" },
        { prompt: "What is the force per metre between two long parallel wires 1 m apart, each carrying 1 A?", answer: "\\(2 \\times 10^{-7}\\) N/m" },
        { prompt: "Two parallel wires carry 2 A and 6 A. How do the forces on the two wires compare?", answer: "Equal in size and opposite in direction" },
        { prompt: "A proton moves parallel to a long wire, in the same direction as the wire's current. Is it pulled toward the wire or pushed away?", answer: "Pulled toward the wire" },
      ],
      pyqExampleId: "a6fb3e9a-ddee-4018-9fcc-56377f22ec81",
      traps: [
        {
          title: "Like currents attract",
          body: "Parallel currents in the same direction pull together, the opposite of like charges, which push apart.",
        },
        {
          title: "The force goes as the product",
          body: "The force per metre is proportional to \\(I_1 I_2\\), not \\(I_1 + I_2\\). Doubling one current doubles the force; doubling both makes it four times.",
        },
        {
          title: "Both wires feel the same force",
          body: "A wire with a larger current does not feel a larger force. Each wire feels \\(\\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\) per metre.",
        },
      ],
    },
  ],
};
