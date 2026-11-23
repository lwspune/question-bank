import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_AMPERE_NOTE: SubtopicNote = {
  subtopicName: "Ampere's Law, Solenoid and Toroid",
  title: "Ampere's Law, the Solenoid and the Toroid",
  oneLineDefinition:
    "Ampere's circuital law, how a well chosen loop gives the field of a long wire, a coaxial cable, a long solenoid and a toroid without the Biot-Savart integration, and the formulas μ₀nI and μ₀NI/(2πr).",
  whyItMatters:
    "13 questions. Five were set in board papers: state and explain Ampere's circuital law (2018), obtain the field of a toroid (2023, 2026), find the field at the centre of a long solenoid (2025) and the field of a coaxial cable between and outside its conductors (2026). The textbook adds the use of the law in different cases, the sign of the current through an Amperian loop, the field inside a wire with uniform or varying current density, and the current needed in a toroid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-ampere-law",
      name: "Ampere's circuital law",
      intuition:
        "Walk round any closed loop and add up the field along your path. Ampere's law says the total depends only on the current that passes through the loop, not on the loop's shape or on currents outside it. When the currents are arranged with symmetry, you can choose a loop on which the field is the same everywhere, and then the field drops straight out.",
      definition:
        "- **Statement:** the line integral of the magnetic field round any closed path is \\(\\mu_0\\) times the net current passing through the area bounded by the path: \\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}\\).\n" +
        "- The closed path is called an **Amperian loop**; it is imaginary and can have any shape.\n" +
        "- **Sign of a current:** curl the fingers of the right hand along the direction in which the loop is traversed. A current along the stretched thumb is positive; one opposite to it is negative. Currents outside the loop are not counted.\n" +
        "- **Use:** choose a loop on which \\(\\vec{B}\\) has the same size everywhere and is along \\(d\\vec{l}\\) (or perpendicular to it). Then \\(\\oint \\vec{B} \\cdot d\\vec{l} = B \\times\\) (length of the loop) and B follows at once.\n" +
        "- The Biot-Savart law plays the role in magnetism that Coulomb's law plays in electrostatics; Ampere's law plays the role of Gauss's law.\n" +
        "- Example: a circle of radius \\(r\\) round a long straight wire gives \\(B(2\\pi r) = \\mu_0 I\\), so \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\).",
      formula: {
        label: "Ampere's circuital law",
        latex: "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}",
        symbols: [
          { symbol: "\\(d\\vec{l}\\)", meaning: "small length of the Amperian loop, along the direction of travel" },
          { symbol: "\\(I_{enclosed}\\)", meaning: "net current passing through the loop" },
        ],
      },
      authoredExample: {
        prompt:
          "Four long straight wires run perpendicular to the page. Three of them pass through a closed Amperian loop, carrying 5 A upwards, 3 A downwards and 2 A upwards. The fourth, carrying 4 A, lies outside the loop. Taking upwards as positive, find \\(\\oint \\vec{B} \\cdot d\\vec{l}\\) round the loop.",
        steps: [
          "Only the currents through the loop count: \\(I_{enclosed} = 5 - 3 + 2 = 4\\) A.",
          "Formula: \\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}\\).",
          "Substitution: \\(4\\pi \\times 10^{-7} \\times 4 = 5.03 \\times 10^{-6}\\) T m.",
        ],
        answer: "\\(5.03 \\times 10^{-6}\\) T m",
      },
      selfCheckExample: {
        prompt: "No current passes through a certain Amperian loop. Does this mean the magnetic field is zero at every point of the loop?",
        steps: [
          "Ampere's law then gives \\(\\oint \\vec{B} \\cdot d\\vec{l} = 0\\).",
          "That is the sum round the loop. Currents outside the loop can still make a field at its points; their contributions to the sum cancel.",
        ],
        answer: "No. Only the line integral is zero, not the field",
      },
      practiceSet: [
        { prompt: "What is the SI unit of \\(\\oint \\vec{B} \\cdot d\\vec{l}\\)?", answer: "T m" },
        { prompt: "What does a current flowing outside an Amperian loop add to \\(\\oint \\vec{B} \\cdot d\\vec{l}\\)?", answer: "Nothing" },
      ],
      pyqExampleId: "e78213e9-d80a-4092-a329-de78a820c35b",
      traps: [
        {
          title: "Reading a zero integral as a zero field",
          body: "\\(\\oint \\vec{B} \\cdot d\\vec{l} = 0\\) means the contributions round the loop add to zero. It does not mean \\(B = 0\\) at each point, unless symmetry makes B the same all round.",
        },
        {
          title: "Getting the sign of the enclosed current wrong",
          body: "The sign of each current comes from the right hand rule applied to the direction you go round the loop. Reversing the direction of travel reverses every sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-wire-cable",
      name: "Field of a long wire and a coaxial cable",
      intuition:
        "Draw a circle round the axis of a wire or cable and ask how much current passes through it. Outside a wire that is the whole current; inside, only the part within the circle. In a coaxial cable the inner and outer conductors carry equal and opposite currents, so a circle outside both encloses nothing and the field there is zero.",
      definition:
        "- Take a circle of radius \\(r\\) about the axis; by symmetry \\(B\\) is the same all round it and along it, so \\(B(2\\pi r) = \\mu_0 I_{enclosed}\\).\n" +
        "- **Outside a long wire:** \\(I_{enclosed} = I\\), so \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\).\n" +
        "- **Inside a wire of radius \\(a\\) with uniform current density \\(J\\):** \\(I_{enclosed} = J\\pi r^2 = I\\dfrac{r^2}{a^2}\\), so \\(B = \\dfrac{\\mu_0 J r}{2} = \\dfrac{\\mu_0 I r}{2\\pi a^2}\\). B grows in proportion to \\(r\\) and is largest at the surface.\n" +
        "- If \\(J\\) varies with \\(r\\), find \\(I_{enclosed}\\) by adding the current in thin rings of area \\(2\\pi r\\,dr\\).\n" +
        "- **Coaxial cable** (core radius \\(a\\), outer conductor radius \\(b\\), equal and opposite currents): for \\(a < r < b\\), \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\); for \\(r > b\\), \\(I_{enclosed} = I - I = 0\\), so \\(B = 0\\). The field lines are circles about the axis.",
      formula: {
        label: "Long wire and coaxial cable",
        latex: "B = \\frac{\\mu_0 I}{2\\pi r} \\ (\\text{outside}), \\qquad B = \\frac{\\mu_0 I r}{2\\pi a^2} \\ (\\text{inside, uniform } J)",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of the Amperian circle, from the axis" },
          { symbol: "\\(a\\)", meaning: "radius of the wire" },
          { symbol: "\\(J\\)", meaning: "current density, current per unit area" },
        ],
      },
      authoredExample: {
        prompt:
          "A long straight wire of radius 2 mm carries a current of 10 A spread uniformly over its cross section. Find the magnetic field at 1 mm and at 4 mm from its axis.",
        steps: [
          "Given: \\(a = 2 \\times 10^{-3}\\) m, \\(I = 10\\) A.",
          "At \\(r = 1\\) mm (inside): \\(B = \\dfrac{\\mu_0 I r}{2\\pi a^2} = \\dfrac{2 \\times 10^{-7} \\times 10 \\times 10^{-3}}{(2 \\times 10^{-3})^2} = 5 \\times 10^{-4}\\) T.",
          "At \\(r = 4\\) mm (outside): \\(B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{2 \\times 10^{-7} \\times 10}{4 \\times 10^{-3}} = 5 \\times 10^{-4}\\) T.",
          "Both are \\(5 \\times 10^{-4}\\) T: the field rises to \\(10^{-3}\\) T at the surface and falls again outside.",
        ],
        answer: "\\(5 \\times 10^{-4}\\) T at both points",
      },
      selfCheckExample: {
        prompt: "A long wire of radius 5 mm carries 20 A uniformly over its cross section. Find the field on its axis and at its surface.",
        steps: [
          "On the axis \\(r = 0\\), so no current is enclosed and \\(B = 0\\).",
          "At the surface: \\(B = \\dfrac{2 \\times 10^{-7} \\times 20}{5 \\times 10^{-3}} = 8 \\times 10^{-4}\\) T.",
        ],
        answer: "Zero on the axis; \\(8 \\times 10^{-4}\\) T at the surface",
      },
      practiceSet: [
        { prompt: "Inside a long wire carrying a uniform current, how does B depend on the distance r from the axis?", answer: "B is proportional to r" },
        { prompt: "Outside a long wire, how does B depend on the distance r from the axis?", answer: "B is proportional to 1/r" },
      ],
      pyqExampleId: "5709d65a-6b3e-4510-8dd3-5fa3185e8572",
      traps: [
        {
          title: "Using the whole current inside the wire",
          body: "A circle inside the wire encloses only part of the current, \\(I r^2/a^2\\) for a uniform current. Using all of I gives the outside formula at a point where it does not apply.",
        },
        {
          title: "Giving a direction where there is no field",
          body: "Outside a coaxial cable the field is zero, so there is no direction to give. Between the conductors, give the direction as circles about the axis, by the right hand thumb rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-solenoid",
      name: "Field of a long solenoid",
      intuition:
        "A long, closely wound solenoid packs many turns side by side. Inside, their fields add up along the axis into a strong, even field; outside, they nearly cancel. So a rectangular loop with one side inside gets its whole line integral from that one side, and the field is just μ0 times the current per metre of winding.",
      definition:
        "Derivation outline (Ampere's law):\n" +
        "- Take a rectangular Amperian loop with one side of length \\(L\\) inside the solenoid, parallel to the axis, and the opposite side outside.\n" +
        "- Outside an ideal solenoid \\(B = 0\\); on the two short sides \\(\\vec{B}\\) is perpendicular to \\(d\\vec{l}\\). So \\(\\oint \\vec{B} \\cdot d\\vec{l} = BL\\).\n" +
        "- With \\(n\\) turns per unit length, the loop encloses \\(nL\\) turns, each carrying \\(I\\): \\(I_{enclosed} = nLI\\).\n" +
        "- \\(BL = \\mu_0 nLI\\), so \\(B = \\mu_0 nI\\), uniform inside and along the axis. \\(n = N/(\\text{length})\\).\n" +
        "- The diameter does not appear. A real solenoid of finite length has a uniform, strong field near its centre and a weaker one near its ends.",
      formula: {
        label: "Long solenoid",
        latex: "B = \\mu_0 n I, \\qquad n = \\frac{N}{\\text{length}}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of turns per metre of length" },
          { symbol: "\\(I\\)", meaning: "current in the winding" },
        ],
      },
      authoredExample: {
        prompt: "A solenoid 60 cm long has 600 turns and carries a current of 2.5 A. Find the magnetic field inside it.",
        steps: [
          "Given: \\(N = 600\\), length \\(= 0.6\\) m, so \\(n = \\dfrac{600}{0.6} = 1000\\) turns/m; \\(I = 2.5\\) A.",
          "Formula: \\(B = \\mu_0 nI\\).",
          "Substitution: \\(B = 4\\pi \\times 10^{-7} \\times 1000 \\times 2.5\\).",
          "\\(B = 3.14 \\times 10^{-3}\\) T, along the axis.",
        ],
        answer: "\\(3.14 \\times 10^{-3}\\) T",
      },
      selfCheckExample: {
        prompt: "A long solenoid has 2000 turns per metre. What current gives a field of \\(6.28 \\times 10^{-3}\\) T inside it?",
        steps: ["\\(I = \\dfrac{B}{\\mu_0 n} = \\dfrac{6.28 \\times 10^{-3}}{4\\pi \\times 10^{-7} \\times 2000}\\).", "\\(I = 2.5\\) A."],
        answer: "2.5 A",
      },
      practiceSet: [
        { prompt: "Does the diameter of a long solenoid affect the field inside it?", answer: "No. \\(B = \\mu_0 nI\\) has no diameter in it" },
        { prompt: "What is the field outside an ideal long solenoid?", answer: "Zero" },
      ],
      pyqExampleId: "3ebdf4fd-f256-44ae-bcfb-101cf103e0c2",
      traps: [
        {
          title: "Using N for n",
          body: "\\(n\\) is turns per metre, \\(N\\) divided by the length in metres. Putting the total N into \\(\\mu_0 nI\\) makes the answer wrong unless the solenoid is exactly 1 m long.",
        },
        {
          title: "Bringing the diameter into the answer",
          body: "A question may give the diameter only to show the solenoid is long. It does not enter \\(B = \\mu_0 nI\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-toroid",
      name: "Field of a toroid",
      intuition:
        "A toroid is a solenoid bent round into a ring, like the tube inside a tyre. Its field lines run round inside the ring as circles and never leave it. A circle drawn inside the ring threads every turn once, so all N turns count. A circle drawn in the open middle threads none, and one drawn outside threads each turn twice in opposite directions, so the field there is zero.",
      definition:
        "Derivation outline (Ampere's law):\n" +
        "- Take as the Amperian loop a circle of radius \\(r\\) inside the core, concentric with the toroid. By symmetry \\(B\\) is the same all round it and along it: \\(\\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r)\\).\n" +
        "- Each of the \\(N\\) turns passes through this circle once, so \\(I_{enclosed} = NI\\).\n" +
        "- \\(B(2\\pi r) = \\mu_0 NI\\), so \\(B = \\dfrac{\\mu_0 NI}{2\\pi r}\\).\n" +
        "- With \\(n = \\dfrac{N}{2\\pi r}\\) turns per unit length, \\(B = \\mu_0 nI\\), as for a long solenoid.\n" +
        "- \\(B \\propto 1/r\\), so unlike a solenoid the field is not the same across the cross section of the core.\n" +
        "- In the open space inside the ring and outside the toroid, \\(I_{enclosed} = 0\\), so \\(B = 0\\).",
      formula: {
        label: "Toroid",
        latex: "B = \\frac{\\mu_0 N I}{2\\pi r}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "total number of turns" },
          { symbol: "\\(r\\)", meaning: "radius of the circle inside the core (the mean radius)" },
        ],
      },
      authoredExample: {
        prompt: "A toroid of mean radius 20 cm has 1500 turns and carries a current of 0.8 A. Find the magnetic field inside its core along the mean circle.",
        steps: [
          "Given: \\(N = 1500\\), \\(I = 0.8\\) A, \\(r = 0.2\\) m.",
          "Formula: \\(B = \\dfrac{\\mu_0 NI}{2\\pi r}\\).",
          "Substitution: \\(B = \\dfrac{2 \\times 10^{-7} \\times 1500 \\times 0.8}{0.2}\\).",
          "\\(B = 1.2 \\times 10^{-3}\\) T.",
        ],
        answer: "\\(1.2 \\times 10^{-3}\\) T",
      },
      selfCheckExample: {
        prompt: "What is the magnetic field at a point in the open space at the middle of a toroid carrying a current?",
        steps: [
          "A circle through that point inside the inner radius encloses no turn.",
          "\\(I_{enclosed} = 0\\), so \\(B = 0\\).",
        ],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "Why is the field outside a toroid zero?", answer: "A circle outside it is crossed by each turn twice in opposite directions, so the enclosed current is zero" },
        { prompt: "How does the field inside the core of a toroid vary with the distance r from its centre?", answer: "As 1/r" },
      ],
      pyqExampleId: "938742a6-f1fa-4514-81d6-47295a463c7b",
      traps: [
        {
          title: "Taking the field of a toroid as uniform",
          body: "\\(B = \\mu_0 NI/(2\\pi r)\\) changes with r across the core. The field is uniform only along one circle of the core.",
        },
        {
          title: "A derivation with no Amperian loop named",
          body: "Say which loop you chose (the circle of radius r inside the core), why B is constant on it, and why \\(I_{enclosed} = NI\\). The formula alone earns only a small part of the marks.",
        },
      ],
    },
  ],
};
