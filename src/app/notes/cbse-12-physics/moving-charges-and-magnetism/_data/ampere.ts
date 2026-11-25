import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_AMPERE_NOTE: SubtopicNote = {
  subtopicName: "Ampere's Circuital Law and the Solenoid",
  title: "Ampere's Circuital Law and the Solenoid",
  oneLineDefinition:
    "Ampere's circuital law, the field of a long straight wire found from it, the field inside and outside a thick wire, and the uniform field inside a long solenoid.",
  whyItMatters:
    "16 questions, ten of them from board papers. The board asks you to state Ampere's circuital law (2024, 2025), use it to derive the field of a long straight wire (2025), find the field inside and outside a thick wire (2023, 2026), add the fields of several long wires (2024, 2025, 2026), say how to make a solenoid's field stronger (2023) and explain why the field outside a long solenoid is nearly zero (2025). The textbook adds numericals on straight wires and solenoids.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-ampere-law",
      name: "Ampere's circuital law and the field of a long straight wire",
      intuition:
        "Walk round any closed path and add up the field along your steps. Ampere's law says the total depends only on how much current passes through the path. When the field is the same all along a well-chosen path, this gives the field in one line.",
      definition:
        "- **Ampere's circuital law:** \\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_e\\). The integral is taken round a closed loop (the Amperian loop), and \\(I_e\\) is the total current passing through the surface bounded by that loop.\n" +
        "- **Sign:** curl the fingers of the right hand in the sense the loop is traversed; the thumb gives the direction in which current counts as positive.\n" +
        "- **When it is useful:** choose the loop so that at each point B is either tangential to it with a constant value, or normal to it, or zero. Then \\(BL = \\mu_0 I_e\\), where L is the length of loop on which B is tangential.\n" +
        "- **Field of a long straight wire, step 1:** take as the Amperian loop a circle of radius r centred on the wire, in a plane at right angles to it.\n" +
        "- **Step 2:** by symmetry B has the same size at every point of the circle and is tangential to it.\n" +
        "- **Step 3:** \\(\\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r)\\), and the current through the circle is I.\n" +
        "- **Step 4:** \\(B(2\\pi r) = \\mu_0 I\\), so \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\).\n" +
        "- Ampere's law is not independent of the Biot-Savart law; both relate the field to the current. Ampere's law is used here because the wire's cylindrical symmetry makes B constant on the circle, while the Biot-Savart law would need an integration along the whole wire.",
      formula: {
        label: "Ampere's circuital law",
        latex: "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_e, \\qquad B = \\frac{\\mu_0 I}{2\\pi r}",
      },
      authoredExample: {
        prompt: "Use Ampere's circuital law to find the magnetic field 8 cm from a long straight wire carrying a current of 12 A.",
        steps: [
          "Amperian loop: a circle of radius r = 0.08 m centred on the wire. On it B is tangential and has the same size everywhere.",
          "\\(\\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I\\).",
          "\\(B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{2 \\times 10^{-7} \\times 12}{0.08} = 3 \\times 10^{-5}\\) T.",
          "Direction: along the circle, given by the right-hand thumb rule.",
        ],
        answer: "\\(3 \\times 10^{-5}\\) T, tangential to the circle round the wire",
      },
      selfCheckExample: {
        prompt:
          "Three long wires pass through a closed loop: one carries 5 A upwards, one 3 A downwards and one 2 A upwards. Taking upwards as positive, find \\(\\oint \\vec{B} \\cdot d\\vec{l}\\) round the loop.",
        steps: [
          "\\(I_e = 5 - 3 + 2 = 4\\) A.",
          "\\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_e = 4\\pi \\times 10^{-7} \\times 4 = 5.0 \\times 10^{-6}\\) T m.",
        ],
        answer: "\\(5.0 \\times 10^{-6}\\) T m",
      },
      practiceSet: [
        { prompt: "What does I in Ampere's circuital law stand for?", answer: "The total current passing through the surface bounded by the closed loop" },
        { prompt: "Find the field 5 cm from a long straight wire carrying 10 A.", answer: "\\(4 \\times 10^{-5}\\) T" },
        {
          prompt: "Describe the field lines of a long vertical wire carrying a current upwards.",
          answer: "Horizontal circles centred on the wire, going anticlockwise when seen from above",
        },
      ],
      pyqExampleId: "7ac5c684-74b4-4e6d-b0c6-11e19f298a46",
      traps: [
        {
          title: "Counting current outside the loop",
          body: "Only the current that passes through the loop goes into \\(I_e\\). A wire outside the loop adds to the field but not to \\(\\oint \\vec{B} \\cdot d\\vec{l}\\).",
        },
        {
          title: "Choosing a loop with no symmetry",
          body: "Ampere's law gives B only when B is constant along the loop. For a straight wire, say why the circle works: same distance from the wire at every point, and B tangential.",
        },
        {
          title: "Drawing B against r as a straight line outside the wire",
          body: "Outside a wire, \\(B \\propto 1/r\\): a curve that falls steeply and then flattens, never a straight line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-thick-wire",
      name: "Field inside and outside a thick wire",
      intuition:
        "Outside a thick wire, all the current is inside your circle, so the wire acts like a thin one. Inside, a smaller circle holds only part of the current, so the field gets smaller towards the centre and is zero on the axis.",
      definition:
        "- A long wire of radius a carries current I spread evenly over its cross-section.\n" +
        "- **Outside, r > a:** the circle of radius r encloses all of I, so \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\): it falls as 1/r.\n" +
        "- **Inside, r < a:** the circle encloses \\(I_e = I\\,\\dfrac{\\pi r^2}{\\pi a^2} = \\dfrac{I r^2}{a^2}\\). Then \\(B(2\\pi r) = \\mu_0 \\dfrac{I r^2}{a^2}\\), so \\(B = \\dfrac{\\mu_0 I}{2\\pi a^2}\\,r\\): it grows in proportion to r.\n" +
        "- **At the surface,** r = a, both give \\(\\dfrac{\\mu_0 I}{2\\pi a}\\), the largest value. On the axis B = 0.\n" +
        "- **Graph:** a straight line from zero up to r = a, then a curve falling as 1/r.",
      formula: {
        label: "Field of a thick wire",
        latex: "B = \\frac{\\mu_0 I r}{2\\pi a^{2}}\\ (r < a), \\qquad B = \\frac{\\mu_0 I}{2\\pi r}\\ (r > a)",
      },
      authoredExample: {
        prompt:
          "A long wire of radius 2 mm carries a current of 10 A spread evenly over its cross-section. Find the field at 0.5 mm and at 3 mm from its axis, and at its surface.",
        steps: [
          "Given: a = \\(2 \\times 10^{-3}\\) m, I = 10 A, \\(\\dfrac{\\mu_0 I}{2\\pi} = 2 \\times 10^{-7} \\times 10 = 2 \\times 10^{-6}\\) T m.",
          "Inside, r = \\(5 \\times 10^{-4}\\) m: \\(B = 2 \\times 10^{-6} \\times \\dfrac{5 \\times 10^{-4}}{(2 \\times 10^{-3})^2} = 2.5 \\times 10^{-4}\\) T.",
          "Outside, r = \\(3 \\times 10^{-3}\\) m: \\(B = \\dfrac{2 \\times 10^{-6}}{3 \\times 10^{-3}} = 6.7 \\times 10^{-4}\\) T.",
          "Surface: \\(B = \\dfrac{2 \\times 10^{-6}}{2 \\times 10^{-3}} = 1.0 \\times 10^{-3}\\) T.",
        ],
        answer: "\\(2.5 \\times 10^{-4}\\) T; \\(6.7 \\times 10^{-4}\\) T; \\(1.0 \\times 10^{-3}\\) T at the surface",
      },
      selfCheckExample: {
        prompt:
          "A long uniform wire of radius a carries current I. At what distance outside the wire is the field equal to its value at a/4 inside the wire?",
        steps: [
          "Inside at a/4: \\(B = \\dfrac{\\mu_0 I (a/4)}{2\\pi a^2} = \\dfrac{\\mu_0 I}{8\\pi a}\\).",
          "Outside: \\(\\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{\\mu_0 I}{8\\pi a}\\) gives r = 4a.",
        ],
        answer: "At 4a from the axis",
      },
      practiceSet: [
        { prompt: "What is the magnetic field on the axis of a long uniform current-carrying wire?", answer: "Zero" },
        { prompt: "Inside a long uniform current-carrying wire, how does B depend on the distance r from the axis?", answer: "B is proportional to r" },
        { prompt: "Where is the field of a long uniform current-carrying wire largest?", answer: "At its surface" },
      ],
      pyqExampleId: "7026d3a3-b6ec-407e-9e25-45dc00547602",
      traps: [
        {
          title: "Using the whole current inside the wire",
          body: "Inside the wire, the Amperian circle holds only the fraction \\(r^2/a^2\\) of the current. Using all of I there gives \\(\\mu_0 I/(2\\pi r)\\), which wrongly grows towards the axis.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-solenoid",
      name: "The field of a long solenoid",
      intuition:
        "A solenoid is many loops stacked side by side. Inside, the fields of all the loops point the same way along the axis and add to a strong, even field. Outside, a long solenoid's field spreads over so much space that it is almost zero.",
      definition:
        "- A **long solenoid** is a wire wound as a closely spaced helix whose length is large compared with its radius. Each turn acts as a circular loop.\n" +
        "- **Inside:** the field is uniform, strong and along the axis. **Outside:** as the solenoid is made longer it looks like a long cylindrical sheet, and the field outside approaches zero.\n" +
        "- **Derivation with a rectangular Amperian loop abcd, step 1:** let side ab, of length h, lie inside along the axis, and cd lie outside.\n" +
        "- **Step 2:** along cd the field is zero; along the sides bc and ad the field has no component along the path. Only ab counts: \\(\\oint \\vec{B} \\cdot d\\vec{l} = Bh\\).\n" +
        "- **Step 3:** with n turns per unit length, the loop encloses nh turns, so \\(I_e = nhI\\).\n" +
        "- **Step 4:** \\(Bh = \\mu_0 nhI\\), so \\(B = \\mu_0 n I\\).\n" +
        "- n = N/L, the turns per unit length. The field does not depend on the radius or on the position inside, away from the ends.\n" +
        "- To make the field stronger: increase the current, or the number of turns per unit length; inserting a soft iron core gives a much larger field.",
      formula: {
        label: "Field inside a long solenoid",
        latex: "B = \\mu_0 n I, \\qquad n = \\frac{N}{L}",
      },
      authoredExample: {
        prompt: "A solenoid 40 cm long has 800 turns and carries a current of 2.5 A. Find the magnetic field inside it near its centre.",
        steps: [
          "Given: N = 800, L = 0.40 m, I = 2.5 A, so \\(n = \\dfrac{800}{0.40} = 2000\\) turns per metre.",
          "Formula: \\(B = \\mu_0 n I\\).",
          "\\(B = 4\\pi \\times 10^{-7} \\times 2000 \\times 2.5 = 2\\pi \\times 10^{-3} = 6.3 \\times 10^{-3}\\) T.",
        ],
        answer: "\\(6.3 \\times 10^{-3}\\) T along the axis",
      },
      selfCheckExample: {
        prompt: "The radius of the turns of a long solenoid is doubled, keeping the turns per unit length and the current the same. What happens to the field inside?",
        steps: ["\\(B = \\mu_0 n I\\) has no radius in it.", "n and I are unchanged."],
        answer: "The field stays the same",
      },
      practiceSet: [
        { prompt: "What is the field just outside a long solenoid?", answer: "Nearly zero" },
        { prompt: "Find the field inside a long solenoid with 1000 turns per metre carrying 3 A.", answer: "\\(3.8 \\times 10^{-3}\\) T" },
        { prompt: "A long solenoid has 500 turns on a length of 25 cm. Find the number of turns per unit length.", answer: "2000 turns per metre" },
      ],
      pyqExampleId: "cf53f29b-87bc-460f-a936-6bbd6796d4ae",
      traps: [
        {
          title: "Using the total number of turns",
          body: "In \\(B = \\mu_0 n I\\), n is the number of turns per metre, N/L. Doubling both N and L leaves the field unchanged.",
        },
        {
          title: "Putting the radius into the formula",
          body: "The field inside a long solenoid does not depend on its radius. Do not mix in the \\(\\mu_0 N I/(2R)\\) of a flat coil.",
        },
      ],
    },
  ],
};
