import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_MOMENTS_NOTE: SubtopicNote = {
  subtopicName: "Moments and Equilibrium",
  title: "Moments, Couples, Equilibrium and Centre of Mass",
  oneLineDefinition:
    "A force's turning effect is the force times its perpendicular distance from the pivot; a body is in equilibrium when both the forces and the turning effects cancel.",
  whyItMatters:
    "Four of the older papers asked about moments: balancing a pivoted uniform bar (2011) and a suspended beam (2013), choosing the diagram that shows a couple (2015), and finding the support forces under a loaded beam (2016). The ministry papers have not asked yet.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-moment",
      name: "The moment of a force, and couples",
      intuition:
        "A door is easy to open when you push at the handle and very hard when you push next to the hinge. The turning effect of a force depends on how hard you push and how far from the pivot, measured at right angles to the force. Two equal and opposite forces that do not act along the same line cannot move a body along, but they can spin it: that is a couple.",
      definition:
        "- **Moment** (torque) of a force about a point = force × **perpendicular** distance from the point to the line of action of the force. Unit: N m.\n" +
        "- A force whose line passes through the pivot has **zero moment**.\n" +
        "- If the force acts at angle \\(\\theta\\) to a lever of length \\(r\\), the moment is \\(Fr\\sin\\theta\\).\n" +
        "- A **couple** is two equal, opposite, parallel forces not in the same line. Its resultant force is zero, but its torque is \\(F \\times d\\), where \\(d\\) is the perpendicular distance between the two lines. The torque of a couple is the same about any point.",
      formula: {
        label: "Moment and couple",
        latex: "M = F d_{\\perp} \\qquad \\tau_{\\text{couple}} = F d",
        symbols: [
          { symbol: "\\(d_{\\perp}\\)", meaning: "perpendicular distance from the pivot to the line of the force, in m" },
          { symbol: "\\(d\\)", meaning: "perpendicular distance between the two forces of a couple, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A mechanic pulls on the end of a spanner 0.25 m long with a force of 40 N. Find the moment about the nut when she pulls at right angles to the spanner, and when she pulls at 30° to the spanner.",
        steps: [
          "At right angles: \\(M = 40 \\times 0.25 = 10\\ \\text{N m}\\).",
          "At 30°: the perpendicular distance is \\(0.25 \\sin 30^\\circ = 0.125\\ \\text{m}\\), so \\(M = 40 \\times 0.125 = 5.0\\ \\text{N m}\\).",
          "Pulling at an angle halves the turning effect here; pulling along the spanner would give none.",
        ],
        answer: "10 N m; 5.0 N m",
      },
      selfCheckExample: {
        prompt:
          "A driver turns a steering wheel with two forces of 15 N, equal, opposite and parallel, applied on opposite sides of the rim. Their lines of action are 0.40 m apart. What torque do they produce?",
        options: ["3.0 N m", "6.0 N m", "12 N m", "0 N m", "37.5 N m"],
        steps: [
          "This is a couple: torque \\(= F \\times d = 15 \\times 0.40 = 6.0\\ \\text{N m}\\).",
          "A counts only one force about the centre (\\(15 \\times 0.20\\)). C counts both forces at the full 0.40 m. D confuses zero resultant force with zero torque. E divides instead of multiplying.",
        ],
        answer: "(B) 6.0 N m",
      },
      practiceSet: [
        { prompt: "A 50 N force acts at right angles to a lever, 0.80 m from the pivot. What is its moment?", answer: "40 N m", method: "\\(50 \\times 0.80\\)" },
        { prompt: "What is the moment of a force whose line of action passes through the pivot?", answer: "Zero", method: "Perpendicular distance is zero" },
        { prompt: "Why are door handles placed far from the hinges?", answer: "A larger distance gives the same moment for a smaller force", method: "\\(M = Fd\\)" },
      ],
      traps: [
        {
          title: "A couple has zero resultant force but a non-zero torque",
          body: "Two equal and opposite forces on different lines cancel as forces, so the body does not accelerate along, but they still turn it. The torque is one force times the distance between the lines, not zero and not twice that.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-equilibrium",
      name: "Equilibrium and the principle of moments",
      intuition:
        "A see-saw balances when the turning effect pushing one way equals the turning effect pushing the other way. A beam resting on supports must also not move up or down, so the supports must push up with exactly the total weight. Two conditions, two equations: that is enough to find two unknown forces.",
      definition:
        "A body is in **equilibrium** when:\n" +
        "- the **resultant force** on it is zero (up forces = down forces, left = right), and\n" +
        "- the **resultant moment** about any point is zero.\n" +
        "**Principle of moments**: in equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments about that point.\n" +
        "- The weight of a **uniform** beam acts at its middle.\n" +
        "- Taking moments about a point where an unknown force acts removes that force from the equation.",
      formula: {
        label: "Principle of moments",
        latex: "\\sum M_{\\text{clockwise}} = \\sum M_{\\text{anticlockwise}} \\qquad \\sum F_{\\text{up}} = \\sum F_{\\text{down}}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "moment about the chosen point, in N m" },
        ],
      },
      authoredExample: {
        prompt:
          "A uniform beam 4.0 m long and of weight 100 N rests on supports at its ends A and B. A 300 N load sits 1.0 m from A. Find the upward force from each support.",
        steps: [
          "Moments about A (removes the force at A): \\(R_B \\times 4.0 = 300 \\times 1.0 + 100 \\times 2.0 = 500\\), so \\(R_B = 125\\ \\text{N}\\).",
          "Forces: \\(R_A + R_B = 300 + 100 = 400\\ \\text{N}\\), so \\(R_A = 275\\ \\text{N}\\).",
          "The support nearer the load carries more of it, as expected.",
        ],
        answer: "275 N at A; 125 N at B",
      },
      selfCheckExample: {
        prompt:
          "A uniform rod 2.0 m long weighs 30 N. It is pivoted 0.40 m from its left end. What weight must hang from the left end to keep the rod horizontal?",
        options: ["30 N", "20 N", "45 N", "75 N", "15 N"],
        steps: [
          "The rod's weight acts at its middle, 1.0 m from the left end, so 0.60 m to the right of the pivot.",
          "Moments about the pivot: \\(W \\times 0.40 = 30 \\times 0.60\\), so \\(W = 18/0.40 = 45\\ \\text{N}\\).",
          "A assumes the weights must be equal. B swaps the two distances (the reversed ratio). D adds the rod's weight to the answer.",
        ],
        answer: "(C) 45 N",
      },
      practiceSet: [
        { prompt: "A 300 N child sits 2.0 m from the pivot of a light see-saw. Where must a 400 N child sit on the other side to balance?", answer: "1.5 m from the pivot", method: "\\(300 \\times 2.0 = 400 \\times d\\)" },
        { prompt: "A light beam rests on two end supports with a 600 N load at its centre. What does each support provide?", answer: "300 N each", method: "Symmetry, and the forces must total 600 N" },
        { prompt: "Name the two conditions for a body to be in equilibrium.", answer: "Zero resultant force and zero resultant moment", method: "No acceleration and no turning" },
      ],
      traps: [
        {
          title: "Include the beam's own weight, at its centre",
          body: "Unless the beam is called light or of negligible mass, its weight acts at its midpoint and has a moment like any other load. Leaving it out, or placing it at the pivot, gives the wrong balance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-centre-of-mass",
      name: "Centre of mass and stability",
      intuition:
        "For many purposes a whole body behaves as if all its mass were at one point, the centre of mass, and its weight acts there. For a uniform body it is at the geometric centre. For two masses on a light rod it sits nearer the heavier one, just where you would balance the rod on a finger.",
      definition:
        "- The **centre of mass** is the point where the whole mass can be taken to act; in a uniform gravitational field it is the same as the **centre of gravity**, where the weight acts.\n" +
        "- A uniform rod, plate or sphere: at its geometric centre.\n" +
        "- Two point masses on a line: \\(x_{\\text{cm}} = \\dfrac{m_1x_1 + m_2x_2}{m_1 + m_2}\\), closer to the heavier mass.\n" +
        "- A body hung from one point comes to rest with its centre of mass directly below that point.\n" +
        "- A standing body **topples** when its centre of mass moves outside its base. A low centre of mass and a wide base make it more stable.",
      formula: {
        label: "Centre of mass of two masses",
        latex: "x_{\\text{cm}} = \\frac{m_1x_1 + m_2x_2}{m_1 + m_2}",
        symbols: [
          { symbol: "\\(x_1, x_2\\)", meaning: "positions of the two masses along the line" },
          { symbol: "\\(m_1, m_2\\)", meaning: "the two masses" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2.0 kg mass sits at \\(x = 0\\) and a 3.0 kg mass at \\(x = 1.0\\ \\text{m}\\) on a light rod. Where is the centre of mass?",
        steps: [
          "\\(x_{\\text{cm}} = \\dfrac{2.0 \\times 0 + 3.0 \\times 1.0}{2.0 + 3.0} = \\dfrac{3.0}{5.0} = 0.60\\ \\text{m}\\).",
          "It is 0.60 m from the 2.0 kg mass, nearer the heavier 3.0 kg mass, as expected.",
        ],
        answer: "At \\(x = 0.60\\ \\text{m}\\)",
      },
      selfCheckExample: {
        prompt:
          "A light rod 1.2 m long has a 1.0 kg mass at one end and a 5.0 kg mass at the other. How far from the 1.0 kg mass is the centre of mass?",
        options: ["0.20 m", "0.24 m", "0.60 m", "1.0 m", "0.50 m"],
        steps: [
          "Measure from the 1.0 kg end: \\(x_{\\text{cm}} = \\dfrac{1.0 \\times 0 + 5.0 \\times 1.2}{6.0} = 1.0\\ \\text{m}\\).",
          "So it is 0.20 m from the 5.0 kg mass, near the heavy end.",
          "A is the distance from the wrong end (the reversed answer). C ignores the masses. B divides the length by the larger mass.",
        ],
        answer: "(D) 1.0 m",
      },
      practiceSet: [
        { prompt: "Where is the centre of mass of a uniform metre ruler?", answer: "At the 50 cm mark", method: "Uniform, so at the middle" },
        { prompt: "Two equal masses sit at the ends of a light rod. Where is the centre of mass?", answer: "At the midpoint", method: "Equal weighting" },
        { prompt: "Why is a lorry with its load piled high more likely to tip over on a bend?", answer: "Its centre of mass is higher, so it moves outside the base more easily", method: "Stability needs a low centre of mass" },
      ],
      traps: [
        {
          title: "The centre of mass is nearer the heavier mass",
          body: "The heavier mass pulls the balance point towards itself. Using the mass ratio the wrong way round puts the centre of mass near the light end, and that reversed answer is usually one of the options.",
        },
      ],
    },
  ],
};
