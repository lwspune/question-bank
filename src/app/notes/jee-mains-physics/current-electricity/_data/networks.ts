import type { SubtopicNote } from "@/app/notes/_types";

export const NETWORKS_CE_NOTE: SubtopicNote = {
  subtopicName: "Equivalent Resistance: Series, Parallel and Symmetry",
  title: "Equivalent Resistance: Series, Parallel and Symmetry",
  oneLineDefinition:
    "Resistances in series add and in parallel add as reciprocals; a network that is neither is first redrawn, by merging points joined by plain wire and by using symmetry to find points at the same potential.",
  whyItMatters:
    "Thirty-one PYQs, nineteen of them multiple choice, and four from 2026. Fifteen use series and parallel rules directly: the largest and smallest values from equal resistors, a wire cut into pieces and regrouped, choosing a combination that gives a stated value, and wires bent into triangles, squares, polygons and circles. Sixteen give a network that must be redrawn first, by merging points joined by plain wire or by using symmetry; fifteen of those come with a figure.",
  concepts: [
    // C1 — series and parallel
    {
      kind: "formula" as const,
      slug: "jpce-series-parallel",
      name: "Series, parallel and bent wires",
      intuition:
        "In series the same current passes through every resistor, so their voltages add and so do their resistances. In parallel every resistor has the same voltage, so their currents add and so do their conductances 1/R. A wire bent into a loop and tapped at two points is just two arcs in parallel, each with resistance in proportion to its length.",
      definition:
        "- Series: \\(R = R_1 + R_2 + \\dots\\). Parallel: \\(\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots\\); for two, \\(R = \\dfrac{R_1R_2}{R_1 + R_2}\\).\n" +
        "- n equal resistors R: nR in series, R/n in parallel. The largest value over the smallest is \\(n^{2}\\).\n" +
        "- A wire of resistance R cut into n equal pieces: each piece is R/n; all n in parallel give \\(R/n^{2}\\).\n" +
        "- A uniform loop of total resistance R tapped at two points that split its length in the fraction x and 1 − x: \\(R_{AB} = R\\,x(1 - x)\\). It is largest when the points are opposite (x = 1/2).\n" +
        "- A regular polygon of n sides is a loop: adjacent corners split it as 1 side and n − 1 sides.\n" +
        "- To find which combination gives a stated value, work out each option's value; do not guess from the shape.\n" +
        "- A resistance that depends on a variable (say m) is least where its derivative is zero.",
      formula: {
        label: "Series, parallel, loops",
        latex: "R_s = \\sum R_i, \\qquad \\frac{1}{R_p} = \\sum \\frac{1}{R_i}, \\qquad R_{\\text{loop}} = R\\,x(1 - x)",
      },
      authoredExample: {
        prompt:
          "A 12 Ω wire is bent into a regular hexagon. Find the resistance between two adjacent corners and between two opposite corners.",
        steps: [
          "Each side is 2 Ω. Adjacent corners: one side (2 Ω) in parallel with the other five (10 Ω): \\(\\dfrac{2 \\times 10}{12} = \\dfrac{5}{3}\\ \\Omega\\).",
          "Check with the loop rule: \\(x = 1/6\\), so \\(12 \\times \\tfrac{1}{6} \\times \\tfrac{5}{6} = \\tfrac{5}{3}\\ \\Omega\\).",
          "Opposite corners: two halves of 6 Ω in parallel: \\(3\\ \\Omega\\).",
        ],
        answer: "5/3 Ω between adjacent corners, 3 Ω between opposite corners",
      },
      selfCheckExample: {
        prompt:
          "Using one each of 3 Ω, 6 Ω and 4 Ω, how do you get exactly 6 Ω?",
        steps: [
          "Try 3 Ω in parallel with 6 Ω: \\(\\dfrac{3 \\times 6}{9} = 2\\ \\Omega\\).",
          "Add 4 Ω in series: \\(2 + 4 = 6\\ \\Omega\\).",
        ],
        answer: "3 Ω and 6 Ω in parallel, then 4 Ω in series",
      },
      practiceSet: [
        { prompt: "Seven equal resistors. Ratio of the largest to the smallest equivalent resistance?", answer: "49" },
        { prompt: "An 18 Ω wire is bent into a circle. Resistance between the ends of a diameter?", answer: "4.5 Ω" },
        { prompt: "A 32 Ω wire is cut into 4 equal pieces, all joined in parallel. Resistance?", answer: "2 Ω" },
        { prompt: "Three 6 Ω resistors. List the four values you can make using all three.", answer: "18 Ω, 2 Ω, 9 Ω and 4 Ω" },
      ],
      pyqExampleId: "261436c4-26f4-4b82-8f1b-88ce4d109a06", // 2023: regular n-sided polygon, adjacent corners
      traps: [
        {
          title: "A cut wire divides twice",
          body: "Cutting into n pieces makes each R/n, and putting them in parallel divides by n again. The answer is R/n², not R/n.",
        },
        {
          title: "Arcs go by length",
          body: "On a bent wire the resistance of an arc is in proportion to its length. Equal angles at the centre of a circle mean equal resistances; unequal sides of a shape do not.",
        },
        {
          title: "Check every option numerically",
          body: "Combination questions offer several plausible drawings. Compute each one; the right one is often not the most symmetric.",
        },
      ],
    },

    // C2 — redrawing and symmetry
    {
      kind: "formula" as const,
      slug: "jpce-symmetry",
      name: "Redrawing networks: shorts and symmetry",
      intuition:
        "Many networks look complicated only because of how they are drawn. Points joined by a plain wire are one point. Points that are mirror images across the line from input to output sit at the same potential, so a resistor between them carries nothing and can be removed. Once those moves are made, the network usually falls into series and parallel pieces.",
      definition:
        "- Label every junction. Points joined by a wire with no resistor get the same label.\n" +
        "- A resistor whose two ends have the same label carries no current: remove it.\n" +
        "- **Mirror symmetry**: if the network looks the same reflected across the line joining the input and output, mirror-image points are at the same potential. They may be joined, or a resistor between them removed.\n" +
        "- Points midway between input and output (on the perpendicular bisector of a symmetric network) are all at half the applied potential.\n" +
        "- Ladders and trees: start at the far end and work back, each step \"add in series, then put in parallel\".\n" +
        "- If nothing simplifies, set the input at potential 1 and the output at 0, write the junction law at each unknown node, find the total current I, and then \\(R = 1/I\\).\n" +
        "- Two wires that cross without a dot are not joined.",
      formula: {
        label: "The two moves",
        latex: "V_P = V_Q \\ \\Rightarrow\\ I_{PQ} = 0, \\qquad R_{\\text{eq}} = \\frac{V_{\\text{in}} - V_{\\text{out}}}{I_{\\text{total}}}",
      },
      authoredExample: {
        prompt:
          "Between A and B: a 4 Ω from A to P, a 4 Ω from P to B, an 8 Ω from A to B, and a plain wire from P to B. Find the resistance between A and B.",
        steps: [
          "The plain wire makes P and B the same point.",
          "The 4 Ω from P to B now has both ends on one point, so it carries nothing: remove it.",
          "What is left is 4 Ω (A to P, which is B) in parallel with 8 Ω: \\(\\dfrac{4 \\times 8}{12} = \\dfrac{8}{3}\\ \\Omega\\).",
        ],
        answer: "8/3 Ω",
      },
      selfCheckExample: {
        prompt:
          "A square ABCD has four sides of resistance r and two diagonals AC and BD, also of resistance r each, crossing without touching. Find the resistance between A and C.",
        steps: [
          "B and D are mirror images across AC, so they are at the same potential. The diagonal BD carries nothing: remove it.",
          "Three paths remain from A to C: the diagonal (r), A–B–C (2r) and A–D–C (2r).",
          "\\(\\dfrac{1}{R} = \\dfrac{1}{r} + \\dfrac{1}{2r} + \\dfrac{1}{2r} = \\dfrac{2}{r}\\), so \\(R = r/2\\).",
        ],
        answer: "r/2",
      },
      practiceSet: [
        { prompt: "Between A and B: 2 Ω from A to P; from P to B two paths, a 2 Ω and a 4 Ω. Resistance between A and B?", answer: "10/3 Ω" },
        { prompt: "A 5 Ω resistor sits between two points that are also joined by a plain wire. Current in it?", answer: "Zero" },
        { prompt: "A square of four 4 Ω sides has a 4 Ω diagonal AC. Resistance between B and D?", answer: "4 Ω", method: "A and C are mirror images across BD, so the diagonal carries nothing: 8 Ω ∥ 8 Ω." },
        { prompt: "Two wires in a figure cross with a small hump and no dot. Are they joined?", answer: "No" },
      ],
      pyqExampleId: "a413986c-392b-4b49-a580-428f0366ba59", // 2026: hexagon of r with spokes to the centre, opposite corners
      traps: [
        {
          title: "A missed short",
          body: "A plain wire drawn along the edge of a figure is easy to overlook. It merges two points and can remove a whole resistor. Label the nodes before writing any formula.",
        },
        {
          title: "A crossing is not a junction",
          body: "Wires that cross without a dot, or with a hump, are separate. Joining them changes the network and the answer.",
        },
        {
          title: "Symmetry must be about the input–output line",
          body: "A network can look symmetric in many ways, but only symmetry with respect to where the current enters and leaves gives equal potentials.",
        },
      ],
    },
  ],
};
