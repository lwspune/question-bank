import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MC_FORCE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Force on Charges and Wires",
  title: "Magnetic Force on Charges and Wires",
  oneLineDefinition:
    "The force F = q v × B on a moving charge, the circular path it follows in a uniform field, and the force F = I L × B on a current-carrying wire.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. One finds a field from the force it puts on a moving charge (2021), one balances an electric and a magnetic force on an electron so it goes straight (2025), one uses an electron's circular orbit to find its magnetic moment (2025) and one finds the force on a wire in a field with three components (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmc-lorentz",
      name: "Magnetic force on a moving charge",
      intuition:
        "A magnetic field pushes only on charges that move, and it pushes sideways. The force is at right angles to both the velocity and the field. Because it is always sideways to the motion, it can turn a charge but never speed it up or slow it down.",
      definition:
        "- Magnetic force: \\(\\vec{F} = q(\\vec{v} \\times \\vec{B})\\), of size \\(F = qvB\\sin\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{v}\\) and \\(\\vec{B}\\).\n" +
        "- The force is perpendicular to both \\(\\vec{v}\\) and \\(\\vec{B}\\), so it does **no work**: the speed and kinetic energy stay the same.\n" +
        "- A charge at rest, or one moving along the field, feels no magnetic force.\n" +
        "- **Lorentz force**: with both fields present, \\(\\vec{F} = q\\left[\\vec{E} + \\vec{v} \\times \\vec{B}\\right]\\).\n" +
        "- For a negative charge such as an electron, the force is opposite to \\(\\vec{v} \\times \\vec{B}\\).\n" +
        "- Unit vectors: \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), \\(\\hat{j} \\times \\hat{k} = \\hat{i}\\), \\(\\hat{k} \\times \\hat{i} = \\hat{j}\\). Reversing the order flips the sign, and \\(\\hat{i} \\times \\hat{i} = 0\\).\n" +
        "- Crossed fields: when \\(\\vec{E}\\), \\(\\vec{B}\\) and \\(\\vec{v}\\) are all at right angles and the two forces cancel, \\(qE = qvB\\), so the charge goes straight when \\(v = \\dfrac{E}{B}\\).",
      formula: {
        label: "Lorentz force",
        latex: "\\vec{F} = q\\left[\\vec{E} + \\vec{v} \\times \\vec{B}\\right], \\qquad F_{\\text{mag}} = qvB\\sin\\theta, \\qquad v = \\frac{E}{B} \\ \\text{(no deflection)}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the velocity and the field" },
          { symbol: "\\(\\vec{E}\\)", meaning: "electric field" },
          { symbol: "\\(\\vec{B}\\)", meaning: "magnetic field" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton moves with velocity \\(\\vec{v} = 2 \\times 10^{5}\\,\\hat{i}\\) m/s through a field \\(\\vec{B} = 0.5\\,\\hat{j}\\) T. Find the size and direction of the magnetic force on it.",
        steps: [
          "\\(\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q\\,(2 \\times 10^{5})(0.5)\\,(\\hat{i} \\times \\hat{j})\\).",
          "\\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), and the proton's charge is positive.",
          "\\(F = 1.6 \\times 10^{-19} \\times 2 \\times 10^{5} \\times 0.5 = 1.6 \\times 10^{-14}\\) N.",
        ],
        answer: "\\(1.6 \\times 10^{-14}\\) N along \\(+\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "An electron moves along the +x direction in a magnetic field that points along +y. In which direction is the force on it?",
        steps: [
          "\\(\\vec{v} \\times \\vec{B}\\) points along \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), that is +z.",
          "The electron's charge is negative, so the force is opposite: along −z.",
        ],
        answer: "Along −z",
      },
      practiceSet: [
        { prompt: "A charge moves parallel to a uniform magnetic field. What magnetic force does it feel?", answer: "Zero" },
        { prompt: "Why can a magnetic field not change the speed of a moving charge?", answer: "The force is always perpendicular to the velocity, so it does no work" },
        { prompt: "A charge passes through crossed fields E = 3000 V/m and B = 0.02 T, with E, B and its velocity all at right angles. At what speed does it go straight?", answer: "\\(1.5 \\times 10^{5}\\) m/s" },
        { prompt: "Find the cross product \\(\\hat{i} \\times \\hat{k}\\).", answer: "\\(-\\hat{j}\\)" },
      ],
      pyqExampleId: "92f1c9cf-88c9-480a-8d32-a914fb946147",
      traps: [
        {
          title: "A negative charge reverses the force",
          body: "Find the direction of \\(\\vec{v} \\times \\vec{B}\\) first, then turn it round for an electron. Forgetting the sign of the charge gives the exact opposite direction.",
        },
        {
          title: "A magnetic force does no work",
          body: "The magnetic force is always at right angles to the velocity, so the kinetic energy of a charge in a pure magnetic field never changes. Only the direction of motion changes.",
        },
        {
          title: "The angle is between v and B",
          body: "In \\(F = qvB\\sin\\theta\\), \\(\\theta\\) is the angle between the velocity and the field. A charge moving along the field has \\(\\theta = 0\\) and feels no force.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-circular",
      name: "Circular motion of a charge in a magnetic field",
      intuition:
        "A charge that enters a uniform field at right angles keeps getting a sideways push of the same size. A steady sideways push is exactly what keeps a body moving in a circle, so the charge goes round in a circle at constant speed. A heavier or faster charge makes a bigger circle; a stronger field or a larger charge makes a smaller one.",
      definition:
        "- With \\(\\vec{v}\\) perpendicular to \\(\\vec{B}\\), the magnetic force is the centripetal force: \\(qvB = \\dfrac{mv^{2}}{r}\\), so \\(r = \\dfrac{mv}{qB}\\).\n" +
        "- Period \\(T = \\dfrac{2\\pi m}{qB}\\) and frequency \\(\\nu = \\dfrac{qB}{2\\pi m}\\). Neither depends on the speed or the radius.\n" +
        "- If the velocity makes some other angle with \\(\\vec{B}\\), the part along \\(\\vec{B}\\) is unchanged and the part across it makes the circle, so the path is a **helix**.\n" +
        "- A charge going round a circle is a small current \\(I = \\dfrac{q}{T} = \\dfrac{qv}{2\\pi r}\\). Its magnetic moment is \\(\\mu = I\\pi r^{2} = \\dfrac{qvr}{2}\\).",
      formula: {
        label: "Radius and period",
        latex: "r = \\frac{mv}{qB}, \\qquad T = \\frac{2\\pi m}{qB}, \\qquad \\mu_{\\text{orbit}} = \\frac{qvr}{2}",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of the circular path" },
          { symbol: "\\(T\\)", meaning: "time for one revolution" },
          { symbol: "\\(\\mu_{\\text{orbit}}\\)", meaning: "magnetic moment of the orbiting charge" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton (mass \\(1.6 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C) moves at \\(2 \\times 10^{6}\\) m/s at right angles to a field of 0.1 T. Find the radius of its path.",
        steps: [
          "\\(r = \\dfrac{mv}{qB} = \\dfrac{1.6 \\times 10^{-27} \\times 2 \\times 10^{6}}{1.6 \\times 10^{-19} \\times 0.1}\\).",
          "\\(r = \\dfrac{3.2 \\times 10^{-21}}{1.6 \\times 10^{-20}} = 0.2\\) m.",
        ],
        answer: "0.2 m",
      },
      selfCheckExample: {
        prompt:
          "A proton and an alpha particle (four times the mass, twice the charge) enter the same field at right angles with equal speeds. What is the ratio of their radii, proton to alpha?",
        steps: [
          "\\(r = \\dfrac{mv}{qB}\\), so with v and B equal, \\(r \\propto \\dfrac{m}{q}\\).",
          "Proton: \\(\\dfrac{m}{e}\\). Alpha: \\(\\dfrac{4m}{2e} = \\dfrac{2m}{e}\\).",
        ],
        answer: "1 : 2",
      },
      practiceSet: [
        { prompt: "Does the period of a charge moving in a circle in a uniform magnetic field depend on its speed?", answer: "No: \\(T = 2\\pi m/(qB)\\)" },
        { prompt: "A charge's speed is doubled in the same uniform field. What happens to the radius of its circle?", answer: "It doubles" },
        { prompt: "An electron enters a uniform magnetic field at 30° to the field. What shape is its path?", answer: "A helix" },
        { prompt: "A charge q moves round a circle of radius r at speed v. Write its magnetic moment.", answer: "\\(\\mu = \\dfrac{qvr}{2}\\)" },
      ],
      pyqExampleId: "091f7d1e-174d-407e-a132-0fd7c59113b2",
      traps: [
        {
          title: "The period does not depend on speed",
          body: "A faster charge makes a bigger circle but takes the same time to go round: \\(T = \\dfrac{2\\pi m}{qB}\\) has no v in it.",
        },
        {
          title: "Only the part of v across B makes the circle",
          body: "When the velocity is at an angle to the field, use \\(v\\sin\\theta\\) in \\(r = \\dfrac{mv}{qB}\\). The part along the field carries the charge forward, giving a helix.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-wire-force",
      name: "Force on a current-carrying wire",
      intuition:
        "A current is a stream of moving charges, so a wire in a magnetic field feels the sum of the sideways pushes on all its charges. The force is largest when the wire lies across the field and vanishes when it lies along the field.",
      definition:
        "- For a straight wire of length L in a uniform field: \\(\\vec{F} = I(\\vec{L} \\times \\vec{B})\\), where \\(\\vec{L}\\) points along the current.\n" +
        "- Size: \\(F = BIL\\sin\\theta\\), with \\(\\theta\\) the angle between the wire and the field.\n" +
        "- The force is perpendicular to both the wire and the field.\n" +
        "- With the field given in components, only the components across the wire push: for a wire along x, the \\(B_x\\) part gives \\(\\hat{i} \\times \\hat{i} = 0\\).",
      formula: {
        label: "Force on a wire",
        latex: "\\vec{F} = I\\,\\vec{L} \\times \\vec{B}, \\qquad F = BIL\\sin\\theta",
        symbols: [
          { symbol: "\\(\\vec{L}\\)", meaning: "length of wire, pointing along the current" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the wire and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A straight wire 0.5 m long carries 2 A and lies at 30° to a uniform field of 0.4 T. Find the force on it.",
        steps: [
          "\\(F = BIL\\sin\\theta = 0.4 \\times 2 \\times 0.5 \\times \\sin 30^{\\circ}\\).",
          "\\(F = 0.4 \\times 0.5 = 0.2\\) N.",
        ],
        answer: "0.2 N",
      },
      selfCheckExample: {
        prompt:
          "A straight wire 20 cm long carries 5 A and lies along the direction of a uniform 0.8 T field. What force does it feel?",
        steps: [
          "The wire is parallel to the field, so \\(\\theta = 0\\) and \\(\\sin\\theta = 0\\).",
          "\\(F = BIL\\sin 0 = 0\\).",
        ],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "A wire 1 m long carries 3 A at right angles to a 0.2 T field. Find the force on it.", answer: "0.6 N" },
        { prompt: "At what angle between a straight wire and a uniform field is the force on the wire largest?", answer: "90°" },
        { prompt: "A horizontal wire has mass 0.1 kg per metre and lies at right angles to a horizontal 0.5 T field. What current makes the magnetic force equal its weight? (g = 10 m/s²)", answer: "2 A" },
        { prompt: "Write the force on a straight wire of length L carrying current I at angle θ to a field B.", answer: "\\(F = BIL\\sin\\theta\\)" },
      ],
      pyqExampleId: "be737ca4-231d-48d7-b35e-d0789b37b4c6",
      traps: [
        {
          title: "The field along the wire does nothing",
          body: "A wire lying along x feels no force from the x part of the field, since \\(\\hat{i} \\times \\hat{i} = 0\\). Only the field components across the wire count.",
        },
        {
          title: "Add the force components as vectors",
          body: "When the cross product gives two perpendicular parts, the size is \\(\\sqrt{F_1^{2} + F_2^{2}}\\), not \\(F_1 + F_2\\).",
        },
      ],
    },
  ],
};
