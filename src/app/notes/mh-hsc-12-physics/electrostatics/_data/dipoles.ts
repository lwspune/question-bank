import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_ES_DIPOLES_NOTE: SubtopicNote = {
  subtopicName: "Potential Energy of Charges and Dipoles",
  title: "Potential Energy of Charges and of a Dipole in a Field",
  oneLineDefinition:
    "The potential energy of two or more charges, the torque on an electric dipole in a uniform field, and its potential energy and the work needed to turn it.",
  whyItMatters:
    "10 questions. Three were set in board papers: the angle at which the torque on a dipole is greatest (2022), the maximum torque and the work to turn a dipole through 180° (2023), and the work an external agent does to turn a dipole through 180° (2026). The textbook adds the potential energy of two, three and four charges and of two charges in an external field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpes-system-energy",
      name: "Potential energy of a system of charges",
      intuition:
        "Pushing two like charges together takes work, and that work is stored as potential energy, ready to fling them apart again. Two unlike charges pull together on their own, so their potential energy is negative: you would have to do work to separate them. For many charges, add the energy of every pair once.",
      definition:
        "- **Definition:** the electrostatic potential energy of a system is the work done by an external agent in bringing its charges from infinity to their places.\n" +
        "- Bringing the first charge \\(q_1\\) needs no work, as there is no field yet. Bringing \\(q_2\\) to a distance \\(r_{12}\\) needs \\(W = q_2 V_1 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r_{12}}\\).\n" +
        "- For three or more charges, add one such term for **every pair**: \\(U = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1 q_2}{r_{12}} + \\dfrac{q_1 q_3}{r_{13}} + \\dfrac{q_2 q_3}{r_{23}}\\right)\\).\n" +
        "- Put the charges in with their signs: like charges give positive energy, unlike charges negative.\n" +
        "- **In an external field** of potential V: a single charge has \\(U = qV(\\vec{r})\\); two charges have \\(U = \\dfrac{q_1 q_2}{4\\pi\\varepsilon_0 r_{12}} + q_1 V(\\vec{r_1}) + q_2 V(\\vec{r_2})\\).",
      formula: {
        label: "Potential energy of two charges",
        latex: "U = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r_{12}}",
      },
      authoredExample: {
        prompt:
          "Three charges, each of 2 µC, are placed at the corners of an equilateral triangle of side 20 cm in air. Find the potential energy of the system. (\\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) SI units)",
        steps: [
          "Given: \\(q = 2 \\times 10^{-6}\\) C for each charge, every pair 0.20 m apart, 3 pairs.",
          "Formula: \\(U = \\dfrac{1}{4\\pi\\varepsilon_0}\\sum \\dfrac{q_j q_k}{r_{jk}}\\), one term per pair.",
          "One pair: \\(\\dfrac{9 \\times 10^{9} \\times (2 \\times 10^{-6})^2}{0.20} = \\dfrac{0.036}{0.20} = 0.18\\) J.",
          "Three pairs: \\(U = 3 \\times 0.18 = 0.54\\) J.",
        ],
        answer: "0.54 J",
      },
      selfCheckExample: {
        prompt:
          "Charges of +1 µC and −4 µC are 40 cm apart in air. Find their potential energy, and the work needed to pull them infinitely far apart.",
        steps: [
          "\\(U = \\dfrac{9 \\times 10^{9} \\times (1 \\times 10^{-6}) \\times (-4 \\times 10^{-6})}{0.40} = \\dfrac{-0.036}{0.40} = -0.09\\) J.",
          "At infinity U = 0, so the work needed is \\(0 - (-0.09) = 0.09\\) J.",
        ],
        answer: "U = −0.09 J; work needed 0.09 J",
      },
      practiceSet: [
        { prompt: "What is the sign of the potential energy of a positive charge and a negative charge near each other?", answer: "Negative" },
        { prompt: "How many pair terms are added to find the potential energy of four charges?", answer: "Six" },
        { prompt: "The distance between two charges is doubled. What happens to their potential energy?", answer: "It is halved" },
      ],
      pyqExampleId: "526defc8-c944-4e9d-8311-8cddadeab0b2",
      traps: [
        {
          title: "Counting each pair twice",
          body: "For charges 1, 2 and 3 the pairs are 12, 13 and 23. Writing 21, 31 and 32 as well doubles the energy.",
        },
        {
          title: "Taking the wrong distance on a line",
          body: "For three charges on a line with equal gaps r, the two end charges are 2r apart, not r. The end-to-end pair is where most mistakes happen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-dipole-torque",
      name: "Torque on a dipole in a uniform field",
      intuition:
        "In a uniform field the + end of a dipole is pushed one way and the − end the other way with equal forces. The forces cancel, so the dipole does not move off, but they form a couple that twists it to line up with the field. The twist is strongest when the dipole is across the field.",
      definition:
        "- A dipole of moment p (charges ±q, separation 2l) makes an angle \\(\\theta\\) with a uniform field E.\n" +
        "- Forces: \\(+q\\vec{E}\\) on +q and \\(-q\\vec{E}\\) on −q. Equal and opposite, so the net force is zero.\n" +
        "- They form a couple of torque \\(\\tau = pE\\sin\\theta\\), or \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\). It tends to turn the dipole into line with the field.\n" +
        "- Greatest torque \\(\\tau_{\\max} = pE\\) at \\(\\theta = 90°\\). Zero torque at \\(\\theta = 0°\\) and \\(180°\\).",
      formula: {
        label: "Torque on a dipole",
        latex: "\\vec{\\tau} = \\vec{p} \\times \\vec{E}, \\qquad \\tau = pE\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A dipole of moment \\(4 \\times 10^{-9}\\) C m lies at 30° to a uniform field of \\(5 \\times 10^{4}\\) N/C. Find the torque on it.",
        steps: [
          "Given: \\(p = 4 \\times 10^{-9}\\) C m, \\(E = 5 \\times 10^{4}\\) N/C, \\(\\theta = 30°\\).",
          "Formula: \\(\\tau = pE\\sin\\theta\\).",
          "Substitution: \\(\\tau = 4 \\times 10^{-9} \\times 5 \\times 10^{4} \\times \\sin 30° = 2 \\times 10^{-4} \\times 0.5\\).",
          "\\(\\tau = 1 \\times 10^{-4}\\) N m.",
        ],
        answer: "1 × 10⁻⁴ N m",
      },
      selfCheckExample: {
        prompt:
          "A dipole is made of charges ±5 nC, 4 mm apart. It is held at right angles to a field of \\(2 \\times 10^{5}\\) N/C. Find the torque.",
        steps: [
          "\\(p = q \\times 2l = 5 \\times 10^{-9} \\times 4 \\times 10^{-3} = 2 \\times 10^{-11}\\) C m.",
          "\\(\\tau = pE\\sin 90° = 2 \\times 10^{-11} \\times 2 \\times 10^{5} = 4 \\times 10^{-6}\\) N m.",
        ],
        answer: "4 × 10⁻⁶ N m",
      },
      practiceSet: [
        { prompt: "What is the net force on an electric dipole in a uniform electric field?", answer: "Zero" },
        { prompt: "What is the torque on a dipole whose moment points along the field?", answer: "Zero" },
        { prompt: "At 30° to a field, the torque on a dipole is what fraction of its greatest value?", answer: "One half, since sin 30° = 0.5" },
      ],
      pyqExampleId: "469463c8-22be-4646-aa39-769946b427e8",
      traps: [
        {
          title: "Saying the dipole moves along the field",
          body: "In a UNIFORM field the two forces cancel, so there is no net force. The dipole only turns.",
        },
        {
          title: "Leaving out the separation 2l",
          body: "\\(p = q \\times 2l\\), the full distance between the charges. Using half the separation halves every torque and energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpes-dipole-pe",
      name: "Potential energy of a dipole and the work to turn it",
      intuition:
        "Turning a dipole away from the field means working against the twist, and that work is stored as potential energy. Its energy is least when it points along the field and greatest when it points against it. Turning it all the way round, from along the field to against it, takes the most work: 2pE.",
      definition:
        "- An external torque turns the dipole slowly from \\(\\theta_1\\) to \\(\\theta_2\\). Work done: \\(W = \\displaystyle\\int_{\\theta_1}^{\\theta_2} pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- This work is stored as potential energy: \\(U(\\theta) - U(\\theta_0) = pE(\\cos\\theta_0 - \\cos\\theta)\\).\n" +
        "- Taking U = 0 when the dipole is perpendicular to the field (\\(\\theta_0 = 90°\\)): \\(U = -pE\\cos\\theta = -\\vec{p} \\cdot \\vec{E}\\).\n" +
        "- U is least, \\(-pE\\), at \\(\\theta = 0°\\), and greatest, \\(+pE\\), at \\(\\theta = 180°\\).\n" +
        "- Turning from 0° to 180°: \\(W = pE(\\cos 0° - \\cos 180°) = 2pE\\). This is the work by the external agent; the field itself does \\(-2pE\\).",
      formula: {
        label: "Dipole energy and work",
        latex: "W = pE(\\cos\\theta_1 - \\cos\\theta_2), \\qquad U = -pE\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "A dipole of moment \\(3 \\times 10^{-8}\\) C m lies along a uniform field of \\(2 \\times 10^{4}\\) N/C. Find the work needed to turn it (i) through 60°, (ii) through 90°.",
        steps: [
          "Given: \\(p = 3 \\times 10^{-8}\\) C m, \\(E = 2 \\times 10^{4}\\) N/C, \\(\\theta_1 = 0°\\). So \\(pE = 6 \\times 10^{-4}\\) J.",
          "Formula: \\(W = pE(\\cos\\theta_1 - \\cos\\theta_2)\\).",
          "(i) \\(\\theta_2 = 60°\\): \\(W = 6 \\times 10^{-4} \\times (1 - 0.5) = 3 \\times 10^{-4}\\) J.",
          "(ii) \\(\\theta_2 = 90°\\): \\(W = 6 \\times 10^{-4} \\times (1 - 0) = 6 \\times 10^{-4}\\) J.",
        ],
        answer: "3 × 10⁻⁴ J; 6 × 10⁻⁴ J",
      },
      selfCheckExample: {
        prompt:
          "A dipole of moment \\(2 \\times 10^{-9}\\) C m makes 60° with a uniform field of \\(10^{4}\\) N/C. Find its potential energy, taking zero when it is perpendicular to the field.",
        steps: [
          "\\(U = -pE\\cos\\theta = -2 \\times 10^{-9} \\times 10^{4} \\times \\cos 60°\\).",
          "\\(U = -2 \\times 10^{-5} \\times 0.5 = -1 \\times 10^{-5}\\) J.",
        ],
        answer: "−1 × 10⁻⁵ J",
      },
      practiceSet: [
        { prompt: "With zero energy taken at 90°, what is the potential energy of a dipole perpendicular to the field?", answer: "Zero" },
        { prompt: "In which position is the potential energy of a dipole least?", answer: "When its moment points along the field (θ = 0°)" },
        { prompt: "How much work is needed to turn a dipole from 90° to 180° in a field E?", answer: "pE" },
      ],
      pyqExampleId: "70af07d2-a9ee-4414-a9f2-fd50eeb51a16",
      traps: [
        {
          title: "Work by the agent or by the field",
          body: "\\(pE(\\cos\\theta_1 - \\cos\\theta_2)\\) is the work done by the EXTERNAL agent. The field does the same amount with the opposite sign. Read which one the question asks for, and say it in your answer.",
        },
        {
          title: "Using sin for energy",
          body: "Torque uses \\(\\sin\\theta\\); energy and work use \\(\\cos\\theta\\). Mixing them gives zero work for a half-turn, which is plainly wrong.",
        },
      ],
    },
  ],
};
