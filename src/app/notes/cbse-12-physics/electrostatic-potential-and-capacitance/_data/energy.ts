import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Potential Energy of a System of Charges",
  title: "Potential Energy of a System of Charges",
  oneLineDefinition:
    "The work needed to assemble a group of point charges, the energy of charges placed in an external field, and the potential energy of a dipole in a uniform field.",
  whyItMatters:
    "18 questions. Fifteen were set in board papers: the potential energy of three charges on a triangle, a square or a line (every year from 2023 to 2026), the charge that makes the energy of a system zero (2024), the energy of two charges placed in an external field (2024, 2025), and the potential energy of a dipole in a uniform field, derived, with when it is largest and smallest (2024). The NCERT examples add four charges on a square and the heat given out when dipoles turn to a new field direction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpep-pairs",
      name: "Potential energy of a system of point charges",
      intuition:
        "The potential energy of a group of charges is the work you must do to bring them in from very far away, one by one, and fix them in place. Every pair of charges adds one term. Like charges pushed together store positive energy; unlike charges give negative energy, which means the group holds together and you must do work to pull it apart.",
      definition:
        "Derivation (NCERT), bringing the charges in from infinity one at a time:\n" +
        "- Bringing \\(q_1\\): no field is present yet, so no work is done.\n" +
        "- Bringing \\(q_2\\) to a distance \\(r_{12}\\) from \\(q_1\\): \\(W_2 = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r_{12}}\\).\n" +
        "- Bringing \\(q_3\\): \\(W_3 = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1q_3}{r_{13}} + \\dfrac{q_2q_3}{r_{23}}\\right)\\).\n" +
        "- Total: \\(U = \\dfrac{1}{4\\pi\\varepsilon_0}\\left(\\dfrac{q_1q_2}{r_{12}} + \\dfrac{q_1q_3}{r_{13}} + \\dfrac{q_2q_3}{r_{23}}\\right)\\). It does not depend on the order in which the charges are brought.\n" +
        "- For any number of charges, add one term for **every distinct pair**, each counted once.\n" +
        "- **Negative U** means attractive forces win: the system is **bound** (stable), and a work of \\(-U\\) is needed to separate the charges to infinity.\n" +
        "- The work needed to bring one more charge \\(q_0\\) to a point is \\(q_0V\\), where V is the potential there due to the charges already present.",
      formula: {
        label: "Energy of point charges",
        latex: "U = \\frac{1}{4\\pi\\varepsilon_0}\\sum_{\\text{all pairs}} \\frac{q_i q_j}{r_{ij}}",
      },
      authoredExample: {
        prompt:
          "Charges of +1 µC, −2 µC and +6 µC are placed at the corners of an equilateral triangle of side 0.6 m. Find the electrostatic potential energy of the system.",
        steps: [
          "Given: every pair is 0.6 m apart. Formula: \\(U = \\dfrac{1}{4\\pi\\varepsilon_0 r}(q_1q_2 + q_2q_3 + q_3q_1)\\).",
          "Products in \\((\\mu\\text{C})^2\\): \\((1)(-2) = -2\\), \\((-2)(6) = -12\\), \\((6)(1) = 6\\). Sum \\(= -8\\), that is \\(-8 \\times 10^{-12}\\ \\text{C}^2\\).",
          "Substitution: \\(U = \\dfrac{9 \\times 10^{9} \\times (-8 \\times 10^{-12})}{0.6}\\).",
          "\\(U = -0.12\\) J. The system is bound: 0.12 J of work would separate the charges completely.",
        ],
        answer: "−0.12 J",
      },
      selfCheckExample: {
        prompt:
          "Charges of 6 µC and −2 µC are 0.2 m apart. How much work must be done to separate them to infinity?",
        steps: [
          "\\(U = \\dfrac{9 \\times 10^{9} \\times (6 \\times 10^{-6})(-2 \\times 10^{-6})}{0.2} = -0.54\\) J.",
          "Work needed \\(= 0 - U = 0.54\\) J.",
        ],
        answer: "0.54 J",
      },
      practiceSet: [
        { prompt: "What does a negative potential energy of a system of charges tell you?", answer: "The forces are attractive overall: the system is bound, and work must be done to separate the charges" },
        { prompt: "How many pair terms are there in the potential energy of four point charges?", answer: "Six" },
        { prompt: "Two equal charges q are a distance r apart. What is their potential energy?", answer: "\\(\\dfrac{q^2}{4\\pi\\varepsilon_0 r}\\)" },
        { prompt: "Does the potential energy of a system of charges depend on the order in which they were brought together?", answer: "No, only on the final arrangement" },
      ],
      pyqExampleId: "b20b1c54-1e27-49e1-9386-b67e1f1bafdc",
      traps: [
        {
          title: "Counting a pair twice",
          body: "Three charges give three terms, not six. Writing \\(q_1q_2\\) and \\(q_2q_1\\) as two terms doubles the answer.",
        },
        {
          title: "Losing the signs of the charges",
          body: "Put each charge in with its sign. A product of unlike charges is negative, and the sign of the final U is part of the answer.",
        },
        {
          title: "Work to dissociate written as U",
          body: "The work needed to pull a system apart to infinity is \\(-U\\). For a bound system with \\(U < 0\\), this work is positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-external",
      name: "Potential energy of charges in an external field",
      intuition:
        "Put charges into a field made by something else, and each charge gains energy equal to its charge times the potential where it sits. If there are two charges, their energy with each other is still there too. Switching the outside field on changes only the first part.",
      definition:
        "- One charge q at a point where the external potential is \\(V(\\vec{r})\\): \\(U = qV(\\vec{r})\\).\n" +
        "- Two charges in an external field: \\(U = q_1V(\\vec{r}_1) + q_2V(\\vec{r}_2) + \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r_{12}}\\).\n" +
        "- In the field terms, the potential is taken where each charge sits; in the last term, \\(r_{12}\\) is the distance between the two charges.\n" +
        "- For a field \\(E = \\dfrac{A}{r^2}\\) pointing away from the origin, the potential is \\(V = \\dfrac{A}{r}\\), with r measured from the origin.\n" +
        "- **Electron volt:** the energy gained by an electron moved through 1 V, \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J.",
      formula: {
        label: "Two charges in an external field",
        latex: "U = q_1V(\\vec{r}_1) + q_2V(\\vec{r}_2) + \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1q_2}{r_{12}}",
      },
      authoredExample: {
        prompt:
          "Charges of 3 µC and −1 µC are placed at \\((-0.1\\ \\text{m}, 0, 0)\\) and \\((0.2\\ \\text{m}, 0, 0)\\) in an external field \\(E = A/r^2\\), where \\(A = 3 \\times 10^{4}\\ \\text{N C}^{-1}\\,\\text{m}^2\\). Find the electrostatic potential energy of the configuration.",
        steps: [
          "External potentials, using distances from the origin: \\(V_1 = \\dfrac{A}{0.1} = 3 \\times 10^{5}\\) V and \\(V_2 = \\dfrac{A}{0.2} = 1.5 \\times 10^{5}\\) V.",
          "Field terms: \\(q_1V_1 = 3 \\times 10^{-6} \\times 3 \\times 10^{5} = 0.9\\) J and \\(q_2V_2 = -1 \\times 10^{-6} \\times 1.5 \\times 10^{5} = -0.15\\) J.",
          "Mutual term, separation 0.3 m: \\(\\dfrac{9 \\times 10^{9} \\times (3 \\times 10^{-6})(-1 \\times 10^{-6})}{0.3} = -0.09\\) J.",
          "\\(U = 0.9 - 0.15 - 0.09 = 0.66\\) J.",
        ],
        answer: "0.66 J",
      },
      selfCheckExample: {
        prompt: "An electron is accelerated from rest through a potential difference of 100 V. How much energy does it gain, in eV and in joules?",
        steps: ["Energy \\(= eV = 100\\) eV.", "\\(100 \\times 1.6 \\times 10^{-19} = 1.6 \\times 10^{-17}\\) J."],
        answer: "100 eV = 1.6 × 10⁻¹⁷ J",
      },
      practiceSet: [
        { prompt: "In the energy of two charges in an external field, which distance goes in the mutual term?", answer: "The distance between the two charges" },
        { prompt: "What is 1 eV in joules?", answer: "\\(1.6 \\times 10^{-19}\\) J" },
        { prompt: "When an external field is switched on, which part of the energy of two charges does not change?", answer: "Their mutual energy, \\(\\dfrac{q_1q_2}{4\\pi\\varepsilon_0 r_{12}}\\)" },
      ],
      pyqExampleId: "a618369c-b0a1-4be2-b0ae-1f7611e5b6f6",
      traps: [
        {
          title: "Mixing up the two distances",
          body: "In \\(V = A/r\\) the distance is from the origin; in the mutual term it is between the charges. Using one for the other is the usual slip.",
        },
        {
          title: "Leaving out the mutual term",
          body: "When the question asks for the total energy, include \\(\\dfrac{q_1q_2}{4\\pi\\varepsilon_0 r_{12}}\\). Only the change caused by switching on the field leaves it out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-dipole-energy",
      name: "Potential energy of a dipole in a uniform field",
      intuition:
        "A uniform field twists a dipole to line it up with the field. Turning it away from that line takes work, which is stored as potential energy. The energy is lowest when the dipole points along the field, and highest when it points against it.",
      definition:
        "Derivation (NCERT):\n" +
        "- A dipole \\(\\vec{p}\\) at angle \\(\\theta\\) to a uniform field \\(\\vec{E}\\) feels a torque \\(\\tau = pE\\sin\\theta\\), with no net force.\n" +
        "- An external torque turns it slowly from \\(\\theta_0\\) to \\(\\theta_1\\), doing work \\(W = \\displaystyle\\int_{\\theta_0}^{\\theta_1} pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_0 - \\cos\\theta_1)\\).\n" +
        "- This work is stored as potential energy. Choosing \\(U = 0\\) at \\(\\theta_0 = 90^\\circ\\): \\(U(\\theta) = -pE\\cos\\theta = -\\vec{p}\\cdot\\vec{E}\\).\n" +
        "- **Minimum** \\(U = -pE\\) at \\(\\theta = 0\\): stable equilibrium. **Maximum** \\(U = +pE\\) at \\(\\theta = 180^\\circ\\): unstable equilibrium.\n" +
        "- When dipoles in a substance turn to line up with a new field direction, the fall in their potential energy is given out as heat.",
      formula: {
        label: "Dipole in a uniform field",
        latex: "U(\\theta) = -pE\\cos\\theta = -\\vec{p}\\cdot\\vec{E}, \\qquad W_{\\theta_1 \\to \\theta_2} = pE(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt:
          "A dipole of moment \\(2 \\times 10^{-8}\\) C m is in a uniform field of \\(5 \\times 10^{4}\\) N/C. Find its potential energy when it points along the field and when it is at right angles to it, and the work needed to turn it from along the field to against the field.",
        steps: [
          "Given: \\(pE = 2 \\times 10^{-8} \\times 5 \\times 10^{4} = 1 \\times 10^{-3}\\) J.",
          "Along the field, \\(\\theta = 0\\): \\(U = -pE = -1 \\times 10^{-3}\\) J.",
          "At right angles, \\(\\theta = 90^\\circ\\): \\(U = 0\\).",
          "From \\(0\\) to \\(180^\\circ\\): \\(W = pE(\\cos 0 - \\cos 180^\\circ) = pE(1 + 1) = 2 \\times 10^{-3}\\) J.",
        ],
        answer: "−1 × 10⁻³ J; 0; 2 × 10⁻³ J",
      },
      selfCheckExample: {
        prompt:
          "A dipole of moment \\(4 \\times 10^{-9}\\) C m lies along a uniform field of \\(2 \\times 10^{5}\\) N/C. How much work is needed to turn it through \\(60^\\circ\\)?",
        steps: ["\\(pE = 4 \\times 10^{-9} \\times 2 \\times 10^{5} = 8 \\times 10^{-4}\\) J.", "\\(W = pE(\\cos 0 - \\cos 60^\\circ) = 8 \\times 10^{-4} \\times 0.5 = 4 \\times 10^{-4}\\) J."],
        answer: "4 × 10⁻⁴ J",
      },
      practiceSet: [
        { prompt: "At what angle between \\(\\vec{p}\\) and \\(\\vec{E}\\) is the potential energy of a dipole least?", answer: "\\(0^\\circ\\), dipole along the field" },
        { prompt: "At what angle is the potential energy of a dipole greatest?", answer: "\\(180^\\circ\\), dipole against the field" },
        { prompt: "With the usual choice of zero, what is the potential energy of a dipole at right angles to the field?", answer: "Zero" },
      ],
      pyqExampleId: "aeb75c48-887c-42b4-95f9-5091f8ec4371",
      traps: [
        {
          title: "Where the energy is zero",
          body: "With \\(U = -pE\\cos\\theta\\), the energy is zero at \\(90^\\circ\\), not at \\(0^\\circ\\). At \\(0^\\circ\\) it is \\(-pE\\), the lowest value.",
        },
        {
          title: "Torque and energy extremes mixed up",
          body: "The torque is largest at \\(90^\\circ\\), where the energy is zero. The energy is largest at \\(180^\\circ\\), where the torque is zero.",
        },
      ],
    },
  ],
};
