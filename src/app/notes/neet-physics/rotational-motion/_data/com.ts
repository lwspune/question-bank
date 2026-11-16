import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RM_COM_NOTE: SubtopicNote = {
  subtopicName: "Centre of Mass and Momentum",
  title: "Centre of Mass and Momentum",
  oneLineDefinition:
    "Where the centre of mass of a few particles or a simple body lies, how it moves, and why the total momentum of a system stays the same when no outside force acts.",
  whyItMatters:
    "Three NEET questions from 2022 to 2026: two masses on a light rod (2022), a shell that breaks into three pieces (2022), and the total momentum of two beads sent round a ring in opposite directions (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphrm-centre-of-mass",
      name: "Locating the centre of mass",
      intuition:
        "The centre of mass is the one point that moves as if the whole mass of the system sat there. For two masses it lies on the line joining them, closer to the heavier one. For a uniform body with a centre of symmetry, it is at that centre.",
      definition:
        "- For particles: \\(x_{cm} = \\dfrac{m_1x_1 + m_2x_2 + \\dots}{m_1 + m_2 + \\dots}\\), and the same for y and z.\n" +
        "- Two masses a distance d apart: the centre of mass is \\(\\dfrac{m_2d}{m_1 + m_2}\\) from \\(m_1\\). Each distance carries the OTHER mass on top.\n" +
        "- Uniform rod: at its midpoint. Uniform ring, disc or sphere: at its centre. A uniform triangular plate: at its centroid.\n" +
        "- The centre of mass need not lie on the body: for a ring it is at the empty centre.\n" +
        "- A body with a piece cut out: treat the piece as a negative mass. \\(x_{cm} = \\dfrac{Mx_1 - mx_2}{M - m}\\), where M is the whole body and m the piece.",
      formula: {
        label: "Centre of mass",
        latex: "x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i}, \\qquad r_1 = \\frac{m_2\\,d}{m_1 + m_2}",
        symbols: [
          { symbol: "\\(x_{cm}\\)", meaning: "x coordinate of the centre of mass" },
          { symbol: "\\(r_1\\)", meaning: "distance of the centre of mass from the first mass" },
          { symbol: "\\(d\\)", meaning: "distance between the two masses" },
        ],
      },
      authoredExample: {
        prompt:
          "Masses of 1 kg, 2 kg and 3 kg sit at the points (0, 0), (3 m, 0) and (0, 4 m). Find their centre of mass.",
        steps: [
          "Total mass: \\(1 + 2 + 3 = 6\\) kg.",
          "\\(x_{cm} = \\dfrac{1(0) + 2(3) + 3(0)}{6} = 1\\) m.",
          "\\(y_{cm} = \\dfrac{1(0) + 2(0) + 3(4)}{6} = 2\\) m.",
        ],
        answer: "(1 m, 2 m)",
      },
      selfCheckExample: {
        prompt:
          "A uniform disc of radius R has a circular hole of radius R/2 cut out of it. The hole's edge passes through the disc's centre. How far from the disc's centre is the centre of mass of the remaining part?",
        steps: [
          "The hole has a quarter of the disc's area, so its mass is \\(\\dfrac{M}{4}\\), and its centre is \\(\\dfrac{R}{2}\\) from O.",
          "Treat the hole as a negative mass: \\(x = \\dfrac{M(0) - \\frac{M}{4}\\cdot\\frac{R}{2}}{M - \\frac{M}{4}} = \\dfrac{-MR/8}{3M/4} = -\\dfrac{R}{6}\\).",
          "The minus sign puts it on the side away from the hole.",
        ],
        answer: "R/6 from the centre, on the side away from the hole",
      },
      practiceSet: [
        { prompt: "Where is the centre of mass of a uniform thin ring?", answer: "At its centre, where there is no mass" },
        { prompt: "Three equal masses sit at (0, 0), (6 m, 0) and (0, 6 m). Find their centre of mass.", answer: "(2 m, 2 m)" },
        { prompt: "Four equal masses sit at the corners of a square of side 2 m, with one corner at the origin and two sides along the axes. Where is their centre of mass?", answer: "(1 m, 1 m)" },
        { prompt: "Does the position of the centre of mass of a system depend on the internal forces between its particles?", answer: "No; it depends only on the masses and their positions" },
      ],
      pyqExampleId: "82986366-3d66-4d6f-b2aa-2956ae1cc741",
      traps: [
        {
          title: "The other mass goes on top",
          body: "The distance of the centre of mass from \\(m_1\\) is \\(\\dfrac{m_2d}{m_1 + m_2}\\). Putting \\(m_1\\) on top puts the centre of mass nearer the lighter mass, which is backwards.",
        },
        {
          title: "A cut-out shifts the centre away from the hole",
          body: "Removing a piece moves the centre of mass of what is left away from the hole, never towards it. Subtract the piece as a negative mass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-momentum",
      name: "Motion of the centre of mass and conservation of momentum",
      intuition:
        "The forces the particles of a system exert on each other come in equal and opposite pairs, so they cancel in the total. Only outside forces can change how the centre of mass moves. With no outside force the total momentum stays fixed: when a shell bursts, the momenta of the pieces still add up to what the shell had.",
      definition:
        "- Total momentum: \\(\\vec{P} = \\sum m_i\\vec{v}_i = M\\vec{v}_{cm}\\), so \\(\\vec{v}_{cm} = \\dfrac{\\sum m_i\\vec{v}_i}{M}\\).\n" +
        "- \\(M\\vec{a}_{cm} = \\vec{F}_{ext}\\): the centre of mass moves like one particle of mass M acted on by the outside forces only.\n" +
        "- If \\(\\vec{F}_{ext} = 0\\), \\(\\vec{P}\\) is constant: a centre of mass at rest stays at rest.\n" +
        "- **Explosion or recoil** from rest: the momenta of the pieces add to zero as VECTORS. Two pieces fly apart with equal and opposite momenta; for three, the third cancels the vector sum of the other two.\n" +
        "- A shell that bursts in flight: its centre of mass carries on along the original path.",
      formula: {
        label: "Momentum of a system",
        latex: "\\vec{P} = \\sum m_i\\vec{v}_i = M\\vec{v}_{cm}, \\qquad M\\vec{a}_{cm} = \\vec{F}_{ext}",
      },
      authoredExample: {
        prompt:
          "A 2 kg ball moves at 3 m/s along +x and a 1 kg ball moves at 3 m/s along the negative x direction. Find the velocity of their centre of mass.",
        steps: [
          "Total momentum: \\(2(3) + 1(-3) = 3\\) kg m/s.",
          "\\(v_{cm} = \\dfrac{3}{2 + 1} = 1\\) m/s, positive, so along +x.",
        ],
        answer: "1 m/s along +x",
      },
      selfCheckExample: {
        prompt: "A 5 kg gun fires a 50 g bullet at 200 m/s. With what speed does the gun recoil?",
        steps: [
          "Before firing the total momentum is zero, so after firing the two momenta are equal and opposite.",
          "\\(5V = 0.05 \\times 200 = 10\\), so \\(V = 2\\) m/s.",
        ],
        answer: "2 m/s, opposite to the bullet",
      },
      practiceSet: [
        { prompt: "Two skaters stand at rest and push apart. Skater A (40 kg) moves off at 3 m/s. How fast does skater B (60 kg) move?", answer: "2 m/s, in the opposite direction" },
        { prompt: "What is the acceleration of the centre of mass of a system on which no external force acts?", answer: "Zero" },
        { prompt: "A body at rest breaks into two pieces whose masses are in the ratio 1 : 3. What is the ratio of their speeds?", answer: "3 : 1" },
        { prompt: "A shell bursts in mid-air. Ignoring air resistance, what path does the centre of mass of the pieces follow until a piece lands?", answer: "The same parabola the shell was on" },
      ],
      pyqExampleId: "a6ecc185-3f83-41a8-aff8-09840389b43e",
      traps: [
        {
          title: "Momenta add as vectors",
          body: "Two equal momenta p at right angles add to \\(\\sqrt{2}\\,p\\), not 2p. In an explosion from rest the last piece carries exactly this resultant, in the opposite direction.",
        },
        {
          title: "Inner forces cannot move the centre of mass",
          body: "An explosion, a recoil or a collision inside the system changes the pieces' velocities but not the velocity of the centre of mass. Only an external force can do that.",
        },
        {
          title: "Equal momenta, unequal speeds",
          body: "Two pieces from rest have equal momenta, so the lighter piece moves faster: the speeds are in the inverse ratio of the masses.",
        },
      ],
    },
  ],
};
