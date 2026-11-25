import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_BIOT_NOTE: SubtopicNote = {
  subtopicName: "Biot-Savart Law and Field of a Circular Loop",
  title: "The Biot-Savart Law and the Field of a Circular Loop",
  oneLineDefinition:
    "The Biot-Savart law for the field of a current element, the field of a long straight wire and its direction, and the field at the centre and on the axis of a circular loop.",
  whyItMatters:
    "31 questions, twenty-seven of them from board papers. The board asks you to state the Biot-Savart law in vector form (2023, 2025, 2026), find the field of a short current element (2024, 2025, 2026), derive the field on the axis of a circular loop (2023, 2025, 2026), find the field at the centre of loops, coils and arcs (every year from 2023 to 2026) and add the fields of two straight wires at right angles (2024, 2025). The textbook adds the field of a coil at its centre and of a semicircular arc.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-biot-law",
      name: "The Biot-Savart law for a current element",
      intuition:
        "Break a wire into tiny pieces. Each piece makes a small field around it, stronger close by and weaker far away, and strongest to the side of the piece rather than in line with it. The field of the whole wire is the sum of all these small fields.",
      definition:
        "- **Biot-Savart law:** the field of a current element \\(I\\,d\\vec{l}\\) at a point whose position from the element is \\(\\vec{r}\\) is \\(d\\vec{B} = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,d\\vec{l} \\times \\vec{r}}{r^3}\\).\n" +
        "- **Size:** \\(dB = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,dl\\sin\\theta}{r^2}\\), where θ is the angle between \\(d\\vec{l}\\) and \\(\\vec{r}\\). It is proportional to the current and the length of the element, and inversely proportional to the square of the distance.\n" +
        "- **Constant:** \\(\\dfrac{\\mu_0}{4\\pi} = 10^{-7}\\) T m/A; \\(\\mu_0\\) is the permeability of free space.\n" +
        "- **Direction:** at right angles to the plane containing \\(d\\vec{l}\\) and \\(\\vec{r}\\), by the right-hand screw rule for \\(d\\vec{l} \\times \\vec{r}\\).\n" +
        "- The field is zero at points on the line of the element itself (θ = 0° or 180°).\n" +
        "- **Like Coulomb's law:** both fall as one over r squared and both obey superposition. **Unlike it:** the source of the magnetic field is a vector, \\(I\\,d\\vec{l}\\), the field is at right angles to \\(\\vec{r}\\), and it depends on the angle θ.",
      formula: {
        label: "Biot-Savart law",
        latex: "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l} \\times \\vec{r}}{r^{3}}, \\qquad dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\sin\\theta}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "A 2 cm element of wire at the origin carries 6 A along the +x direction. Find the magnetic field it produces at the point (0.8 m, 0.6 m, 0).",
        steps: [
          "Given: \\(I = 6\\) A, \\(d\\vec{l} = 0.02\\,\\hat{i}\\) m, \\(\\vec{r} = (0.8\\,\\hat{i} + 0.6\\,\\hat{j})\\) m, so \\(r = 1\\) m.",
          "Formula: \\(dB = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,dl\\sin\\theta}{r^2}\\). Here \\(\\sin\\theta = 0.6/1 = 0.6\\).",
          "\\(dB = 10^{-7} \\times \\dfrac{6 \\times 0.02 \\times 0.6}{1^2} = 7.2 \\times 10^{-9}\\) T.",
          "Direction: \\(\\hat{i} \\times (0.8\\,\\hat{i} + 0.6\\,\\hat{j}) = 0.6\\,\\hat{k}\\), so along +z.",
        ],
        answer: "\\(7.2 \\times 10^{-9}\\) T along +z",
      },
      selfCheckExample: {
        prompt: "At which points does a small current element produce no magnetic field?",
        steps: ["\\(dB \\propto \\sin\\theta\\).", "On the line of the element, θ = 0° or 180°, so \\(\\sin\\theta = 0\\)."],
        answer: "At points on the line along the element",
      },
      practiceSet: [
        { prompt: "Write the value of μ₀/4π in SI units.", answer: "\\(10^{-7}\\) T m/A" },
        {
          prompt: "A current element points along +x. In which direction is its field at a point on the +z axis?",
          answer: "Along −y, since \\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\)",
        },
        {
          prompt: "The distance from a current element is doubled along the same line. By what factor does its field change?",
          answer: "It becomes one quarter",
        },
      ],
      pyqExampleId: "44f87ba0-36b6-42f7-8387-6ff112236fee",
      traps: [
        {
          title: "Using the long-wire formula for a short element",
          body: "A segment a centimetre long seen from a metre away is a current element: use \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}\\), not \\(\\mu_0 I/(2\\pi r)\\).",
        },
        {
          title: "Mixing r squared and r cubed",
          body: "The vector form has \\(r^3\\) because \\(\\vec{r}\\) on top carries one power of r. The magnitude form has \\(r^2\\) and \\(\\sin\\theta\\). Do not use \\(\\vec{r}\\) on top with \\(r^2\\) below.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-straight-field",
      name: "Field of a long straight wire and its direction",
      intuition:
        "The field of a long straight wire goes round it in circles. Grip the wire with your right hand, thumb along the current, and your fingers curl the way the field goes. The field gets weaker as one over the distance.",
      definition:
        "- At a perpendicular distance r from a long straight wire carrying current I: \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\), with \\(\\dfrac{\\mu_0}{2\\pi} = 2 \\times 10^{-7}\\) T m/A. It is derived from Ampere's circuital law on the next page.\n" +
        "- **Field lines:** circles centred on the wire, in planes at right angles to it.\n" +
        "- **Direction (right-hand thumb rule):** grasp the wire in your right hand with the thumb along the current; the fingers curl in the direction of the field. In vectors, \\(\\vec{B}\\) is along \\(\\hat{I} \\times \\hat{r}\\), where \\(\\hat{r}\\) points from the wire to the point.\n" +
        "- **Several wires:** find each field and its direction separately, then add them as vectors. For wires along the x and y axes, every field at a point in the xy-plane is along +z or −z, so the sizes add or subtract.\n" +
        "- The distance from a wire along the x-axis to the point (x, y) is |y|; from a wire along the y-axis it is |x|.",
      formula: {
        label: "Field of a long straight wire",
        latex: "B = \\frac{\\mu_0 I}{2\\pi r}",
      },
      authoredExample: {
        prompt:
          "One long wire lies along the x-axis and carries 4 A in the +x direction. Another lies along the y-axis and carries 6 A in the +y direction. Find the net magnetic field at P(2 m, 4 m).",
        steps: [
          "Wire on the x-axis: distance 4 m. \\(B_1 = 2 \\times 10^{-7} \\times \\dfrac{4}{4} = 2 \\times 10^{-7}\\) T. Direction \\(\\hat{i} \\times \\hat{j} = +\\hat{k}\\) (out of the page).",
          "Wire on the y-axis: distance 2 m. \\(B_2 = 2 \\times 10^{-7} \\times \\dfrac{6}{2} = 6 \\times 10^{-7}\\) T. Direction \\(\\hat{j} \\times \\hat{i} = -\\hat{k}\\) (into the page).",
          "The two are opposite, so subtract: \\(B = 6 \\times 10^{-7} - 2 \\times 10^{-7} = 4 \\times 10^{-7}\\) T.",
        ],
        answer: "\\(4 \\times 10^{-7}\\) T along −z (into the page)",
      },
      selfCheckExample: {
        prompt: "A long vertical wire carries a current upwards. In which direction is its magnetic field at a point due east of the wire?",
        steps: [
          "Take east as \\(\\hat{i}\\), north as \\(\\hat{j}\\) and up as \\(\\hat{k}\\). The current is along \\(\\hat{k}\\) and the point is along \\(\\hat{i}\\) from the wire.",
          "\\(\\hat{k} \\times \\hat{i} = \\hat{j}\\), which is north.",
        ],
        answer: "Towards the north",
      },
      practiceSet: [
        { prompt: "Find the field 10 cm from a long straight wire carrying 5 A.", answer: "\\(1 \\times 10^{-5}\\) T" },
        { prompt: "What is the shape of the field lines of a long straight wire?", answer: "Circles centred on the wire, in planes at right angles to it" },
        { prompt: "The distance from a long wire is made three times as large. What happens to the field?", answer: "It becomes one third" },
      ],
      pyqExampleId: "a626d834-54a0-4e20-a8ad-9f4c7ef3cfe9",
      traps: [
        {
          title: "Taking the wrong distance",
          body: "The distance from a wire on the x-axis to a point is the point's y coordinate, and from a wire on the y-axis it is the x coordinate. Swapping them is the usual slip.",
        },
        {
          title: "Adding sizes without directions",
          body: "Find the direction of each field first. Two fields along +z and −z subtract; a point on the other side of a wire has its field from that wire reversed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-loop-centre",
      name: "Field at the centre of a circular loop, a coil and an arc",
      intuition:
        "At the centre of a loop every piece of wire is the same distance away and at right angles to the line joining it to the centre, so every piece's field points the same way along the axis and they all add up.",
      definition:
        "- **Derivation at the centre:** each element dl is at distance R and at right angles to the line to the centre, so \\(dB = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,dl}{R^2}\\), all along the axis. Adding over the loop, \\(\\sum dl = 2\\pi R\\), so \\(B = \\dfrac{\\mu_0 I}{2R}\\).\n" +
        "- For a tightly wound coil of N turns: \\(B = \\dfrac{\\mu_0 N I}{2R}\\).\n" +
        "- **Direction (right-hand thumb rule):** curl the fingers of the right hand along the current; the thumb gives the field at the centre. A current that looks anticlockwise to you gives a field towards you; clockwise gives a field away from you.\n" +
        "- **Arc:** an arc that turns through angle θ (in radians) gives \\(B = \\dfrac{\\mu_0 I \\theta}{4\\pi R}\\). A semicircle gives half the field of a full loop, \\(\\dfrac{\\mu_0 I}{4R}\\).\n" +
        "- Straight leads that point along a line through the centre give no field there, since \\(d\\vec{l}\\) and \\(\\vec{r}\\) are along the same line.\n" +
        "- **The same wire rewound into N turns:** the radius becomes R/N and the field at the centre becomes N² times as large.\n" +
        "- **Two loops with a common centre in planes at right angles:** their fields are at right angles, so \\(B = \\sqrt{B_1^2 + B_2^2}\\).",
      formula: {
        label: "Field at the centre of a coil",
        latex: "B = \\frac{\\mu_0 N I}{2R}",
      },
      authoredExample: {
        prompt: "A circular coil of 50 turns, each of radius 5.0 cm, carries a current of 0.30 A. Find the magnetic field at its centre.",
        steps: [
          "Given: N = 50, I = 0.30 A, R = 5.0 cm = 0.05 m.",
          "Formula: \\(B = \\dfrac{\\mu_0 N I}{2R}\\).",
          "\\(B = \\dfrac{4\\pi \\times 10^{-7} \\times 50 \\times 0.30}{2 \\times 0.05} = 4\\pi \\times 10^{-7} \\times 150 = 1.9 \\times 10^{-4}\\) T.",
          "Direction: along the axis of the coil, given by the right-hand thumb rule.",
        ],
        answer: "\\(1.9 \\times 10^{-4}\\) T along the axis",
      },
      selfCheckExample: {
        prompt:
          "A wire bent into one circular turn gives a field B at its centre. The same wire, with the same current, is rewound into a coil of 5 turns. Find the new field at the centre.",
        steps: [
          "The same length makes 5 turns, so each turn has radius R/5.",
          "\\(B' = \\dfrac{\\mu_0 (5) I}{2(R/5)} = 25 \\times \\dfrac{\\mu_0 I}{2R} = 25B\\).",
        ],
        answer: "25B",
      },
      practiceSet: [
        { prompt: "Find the field at the centre of a semicircular arc of radius R carrying current I.", answer: "\\(\\dfrac{\\mu_0 I}{4R}\\)" },
        { prompt: "The current in a loop looks anticlockwise to you. Which way is the field at its centre?", answer: "Towards you" },
        {
          prompt:
            "Two identical loops with a common centre lie in planes at right angles and carry equal currents. Each alone gives a field B₀ at the centre. Find the net field.",
          answer: "\\(\\sqrt{2}\\,B_0\\)",
        },
      ],
      pyqExampleId: "074c4e85-2a30-4c75-9748-7e81d28c82cc",
      traps: [
        {
          title: "2πR in place of 2R",
          body: "The field at the centre of a loop is \\(\\mu_0 I/(2R)\\). The \\(2\\pi r\\) belongs to a long straight wire. Mixing them makes the answer π times too small.",
        },
        {
          title: "Counting the straight leads",
          body: "Leads that run along a line through the centre add nothing at the centre. Only the circular parts count.",
        },
        {
          title: "Current entering a ring at two points",
          body: "If a current enters a uniform ring at one point and leaves at another, the two arcs carry currents in the ratio that makes their fields at the centre equal and opposite. The field at the centre is zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-loop-axis",
      name: "Field on the axis of a circular loop",
      intuition:
        "On the axis each piece of the loop makes a tilted field. The tilted parts of opposite pieces cancel sideways and add along the axis, so the field on the axis points along the axis and weakens as you move away.",
      definition:
        "- **Set-up:** a loop of radius R carries current I. P is on the axis at distance x from the centre. Each element dl is at distance \\(r = \\sqrt{x^2 + R^2}\\) from P.\n" +
        "- **Step 1:** dl is at right angles to \\(\\vec{r}\\), so \\(dB = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,dl}{x^2 + R^2}\\).\n" +
        "- **Step 2:** \\(d\\vec{B}\\) is at right angles to the plane of dl and \\(\\vec{r}\\). Resolve it into \\(dB_x\\) along the axis and \\(dB_\\perp\\) at right angles to the axis.\n" +
        "- **Step 3:** the \\(dB_\\perp\\) of an element and of the element opposite it cancel. Only \\(dB_x = dB\\cos\\theta\\) is left, with \\(\\cos\\theta = \\dfrac{R}{(x^2 + R^2)^{1/2}}\\).\n" +
        "- **Step 4:** add over the loop, \\(\\sum dl = 2\\pi R\\): \\(B = \\dfrac{\\mu_0 I R^2}{2(x^2 + R^2)^{3/2}}\\), along the axis.\n" +
        "- **Step 5:** at the centre, x = 0, this gives \\(B = \\dfrac{\\mu_0 I}{2R}\\). For N turns, multiply by N.\n" +
        "- Far from the loop (x ≫ R), \\(B = \\dfrac{\\mu_0 I R^2}{2x^3}\\): the field falls as one over x cubed, like that of a dipole.",
      formula: {
        label: "Field on the axis of a loop",
        latex: "B = \\frac{\\mu_0 I R^{2}}{2\\left(x^{2} + R^{2}\\right)^{3/2}}",
      },
      authoredExample: {
        prompt:
          "A circular loop of radius 6 cm carries a current of 5 A. Find the magnetic field at a point on its axis 8 cm from the centre, and at the centre.",
        steps: [
          "Given: R = 0.06 m, x = 0.08 m, I = 5 A. Then \\(x^2 + R^2 = 0.0064 + 0.0036 = 0.01\\) m², and \\((0.01)^{3/2} = 10^{-3}\\).",
          "Axis: \\(B = \\dfrac{4\\pi \\times 10^{-7} \\times 5 \\times 0.0036}{2 \\times 10^{-3}} = 4\\pi \\times 10^{-7} \\times 9 = 1.13 \\times 10^{-5}\\) T.",
          "Centre: \\(B_0 = \\dfrac{\\mu_0 I}{2R} = \\dfrac{4\\pi \\times 10^{-7} \\times 5}{0.12} = 5.24 \\times 10^{-5}\\) T.",
        ],
        answer: "\\(1.13 \\times 10^{-5}\\) T on the axis; \\(5.24 \\times 10^{-5}\\) T at the centre",
      },
      selfCheckExample: {
        prompt: "For a loop of radius R, find the ratio of the field at a point on its axis a distance R from the centre to the field at the centre.",
        steps: [
          "\\(\\dfrac{B_x}{B_0} = \\dfrac{R^3}{(x^2 + R^2)^{3/2}}\\).",
          "With x = R: \\(\\dfrac{R^3}{(2R^2)^{3/2}} = \\dfrac{1}{2\\sqrt{2}} \\approx 0.35\\).",
        ],
        answer: "\\(1 : 2\\sqrt{2}\\), about 0.35",
      },
      practiceSet: [
        { prompt: "In which direction is the field at a point on the axis of a current loop?", answer: "Along the axis, given by the right-hand thumb rule" },
        { prompt: "On the axis of a loop, which parts of the fields of the elements cancel?", answer: "The parts at right angles to the axis" },
        { prompt: "How does the field on the axis of a loop change with distance far from the loop?", answer: "It falls as one over the distance cubed" },
      ],
      pyqExampleId: "61ae7555-df32-4a38-bb97-c498f45100c2",
      traps: [
        {
          title: "A derivation with no figure",
          body: "Draw the loop, the point P on the axis, one element dl, the line \\(\\vec{r}\\), and \\(d\\vec{B}\\) split into its two parts, all labelled. The figure and the cancelling argument carry marks.",
        },
        {
          title: "Dropping the power 3/2",
          body: "The denominator is \\(2(x^2 + R^2)^{3/2}\\), not \\(2(x^2 + R^2)\\). Check by putting x = 0: you must get \\(\\mu_0 I/(2R)\\).",
        },
      ],
    },
  ],
};
