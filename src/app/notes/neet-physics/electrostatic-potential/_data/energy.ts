import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EP_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Equipotentials and Potential Energy",
  title: "Equipotentials and Potential Energy",
  oneLineDefinition:
    "Equipotential surfaces and why the field meets them at right angles, the field as the rate at which potential falls, and the work and potential energy of charges moved in a field.",
  whyItMatters:
    "Three NEET questions, from 2022 to 2026. One asks the angle between field lines and an equipotential surface (2022). Two from Re-NEET 2026 use energy: the speed of a charge that falls from 3R onto the surface of a charged sphere, and the work done in moving a unit charge between two points outside a charged sphere.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphep-equipotential",
      name: "Equipotential surfaces and the field",
      intuition:
        "Join all the points that have the same potential and you get an equipotential surface. Moving a charge along it takes no work, so the field can have no part along the surface: it must cross it at right angles. The field always points downhill, from higher potential to lower, and it is strongest where the surfaces crowd together.",
      definition:
        "- **Equipotential surface:** a surface with the same potential at every point.\n" +
        "- For a point charge the equipotentials are spheres centred on the charge. For a uniform field they are planes at right angles to the field.\n" +
        "- No work is done in moving a charge along an equipotential, so the field is normal to it at every point.\n" +
        "- The field points the way the potential falls fastest. Its size is the fall in potential per metre: \\(E = -\\dfrac{dV}{dr}\\).\n" +
        "- In a uniform field, two planes a distance d apart along the field differ in potential by \\(Ed\\).\n" +
        "- If V depends on x alone, \\(E_x = -\\dfrac{dV}{dx}\\).",
      formula: {
        label: "Field from potential",
        latex: "E = -\\frac{dV}{dr}, \\qquad E_x = -\\frac{dV}{dx}, \\qquad \\Delta V = Ed \\ \\text{(uniform field)}",
      },
      authoredExample: {
        prompt:
          "In a uniform field, the equipotential planes of 30 V and 10 V are 5 cm apart. Find the size and direction of the field.",
        steps: [
          "\\(E = \\dfrac{\\Delta V}{d} = \\dfrac{30 - 10}{0.05} = 400\\) V/m.",
          "The field points the way the potential falls: from the 30 V plane towards the 10 V plane, at right angles to both.",
        ],
        answer: "400 V/m, from the 30 V plane to the 10 V plane",
      },
      selfCheckExample: {
        prompt: "The potential in a region is \\(V = 2x^{2}\\) volts, with x in metres. Find the field at x = 3 m.",
        steps: [
          "\\(\\dfrac{dV}{dx} = 4x = 12\\) V/m at x = 3 m.",
          "\\(E_x = -\\dfrac{dV}{dx} = -12\\) V/m.",
        ],
        answer: "\\(-12\\hat{i}\\) V/m",
      },
      practiceSet: [
        { prompt: "What shape are the equipotential surfaces of a single point charge?", answer: "Spheres centred on the charge" },
        { prompt: "How much work is done in moving a 2 μC charge along an equipotential surface?", answer: "Zero" },
        { prompt: "Does the electric field point towards higher or lower potential?", answer: "Lower potential" },
        { prompt: "In a uniform field, equipotential planes 2 V apart are 1 cm apart. Find the field.", answer: "200 V/m" },
      ],
      pyqExampleId: "a26f9115-e344-46e7-b10f-4ac00ece014e",
      traps: [
        {
          title: "Field lines meet equipotentials at 90°",
          body: "A field line always crosses an equipotential surface at right angles, never along it. If it had a part along the surface, moving a charge there would need work.",
        },
        {
          title: "Keep the minus sign",
          body: "The field is \\(-dV/dx\\). A potential that rises with x gives a field pointing towards negative x.",
        },
        {
          title: "Crowded surfaces mean a strong field",
          body: "Where equipotentials of equal steps are close together the potential falls quickly, so the field is strong. Wide spacing means a weak field.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphep-potential-energy",
      name: "Potential energy and work",
      intuition:
        "A charge q at a point of potential V has potential energy qV. To move it slowly from A to B an outside force does work q times the change in potential. Let it go instead, and the field does the work: the potential energy it loses turns into kinetic energy. Like charges gain energy when pushed together; unlike charges lose energy as they come together.",
      definition:
        "- Work by an outside force to move q slowly from A to B: \\(W = q(V_B - V_A)\\). It does not depend on the path.\n" +
        "- Potential energy of a charge q at a point of potential V: \\(U = qV\\).\n" +
        "- Two charges r apart: \\(U = \\dfrac{kq_1q_2}{r}\\), sign included (negative for unlike charges). For three or more, add this over every pair.\n" +
        "- A charge released in a field: kinetic energy gained = potential energy lost, \\(\\dfrac{1}{2}mv^{2} = U_A - U_B\\).\n" +
        "- Outside a uniformly charged sphere the potential is \\(\\dfrac{kQ}{r}\\), measured from its centre, as for a point charge Q there.\n" +
        "- **Electron volt:** the energy an electron gains through 1 V. 1 eV = \\(1.6 \\times 10^{-19}\\) J.",
      formula: {
        label: "Work and potential energy",
        latex: "W = q(V_B - V_A), \\qquad U = \\frac{kq_1q_2}{r}, \\qquad \\frac{1}{2}mv^{2} = U_A - U_B",
      },
      authoredExample: {
        prompt:
          "Charges of +2 μC and +3 μC are 0.3 m apart. Find their potential energy, and the work needed to bring them to 0.1 m apart.",
        steps: [
          "\\(U_1 = \\dfrac{9 \\times 10^{9} \\times 2 \\times 10^{-6} \\times 3 \\times 10^{-6}}{0.3} = \\dfrac{0.054}{0.3} = 0.18\\) J.",
          "\\(U_2 = \\dfrac{0.054}{0.1} = 0.54\\) J.",
          "Work needed = rise in potential energy = 0.54 − 0.18 = 0.36 J.",
        ],
        answer: "0.18 J; 0.36 J of work",
      },
      selfCheckExample: {
        prompt:
          "An electron (charge \\(1.6 \\times 10^{-19}\\) C) starts from rest and moves through a potential difference of 500 V. How much kinetic energy does it gain?",
        steps: [
          "Kinetic energy gained = \\(e\\Delta V = 500\\) eV.",
          "In joules: \\(1.6 \\times 10^{-19} \\times 500 = 8 \\times 10^{-17}\\) J.",
        ],
        answer: "500 eV, that is \\(8 \\times 10^{-17}\\) J",
      },
      practiceSet: [
        { prompt: "How much work is needed to carry 3 C from a point at 10 V to a point at 25 V?", answer: "45 J" },
        { prompt: "Charges +q and −q are brought closer together. Does their potential energy rise or fall?", answer: "It falls (it becomes more negative)" },
        { prompt: "Write 1 eV in joules.", answer: "\\(1.6 \\times 10^{-19}\\) J" },
        { prompt: "Find the potential energy of two +1 μC charges 9 cm apart.", answer: "0.1 J" },
      ],
      pyqExampleId: "043c45b5-d470-4d74-8ddd-c9a5c4a5cd0a",
      traps: [
        {
          title: "Keep the signs of both charges",
          body: "\\(U = kq_1q_2/r\\) is negative for unlike charges. Dropping the signs makes an attracted charge seem to lose speed as it falls in.",
        },
        {
          title: "Measure from the centre of a sphere",
          body: "Outside a charged sphere use \\(kQ/r\\) with r from the centre. A charge at 3R from the centre is 2R from the surface, but its potential is \\(kQ/(3R)\\).",
        },
        {
          title: "The path does not matter",
          body: "The work to move a charge between two points depends only on their potentials, \\(q(V_B - V_A)\\), not on the route or tube it travels along.",
        },
      ],
    },
  ],
};
