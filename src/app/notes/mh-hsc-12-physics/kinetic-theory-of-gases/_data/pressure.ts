import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Mean Free Path and Pressure of an Ideal Gas",
  title: "Kinetic Theory, Mean Free Path and Gas Pressure",
  oneLineDefinition:
    "The assumptions of kinetic theory, the mean free path of a molecule, and the derivation of the pressure of a gas, P = ⅓(N/V)m v̄², from molecules striking the walls.",
  whyItMatters:
    "10 questions. Six were set in board papers: state four assumptions of kinetic theory (2018), deduce Boyle's law from the pressure expression (2020), derive the expression for pressure (2022, 2023 and 2026), and pick the formula for the mean free path (2023). The derivation of pressure is the single most repeated long answer in this chapter. The textbook adds the mean free path of nitrogen, a change of mass and speed, and why pressure rises when a gas is compressed.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpkt-assumptions",
      name: "Assumptions of the kinetic theory of gases",
      intuition:
        "Kinetic theory explains pressure and temperature from the motion of molecules. To do the mechanics it pictures a gas in a simple way: a huge number of tiny, identical molecules flying about at random, bouncing off each other and the walls without losing energy. Each assumption below is one part of that picture.",
      definition:
        "- The board asks for 'any four' assumptions. Write each one as a full sentence; a bare phrase such as 'elastic collisions' earns less.\n" +
        "- A gas that obeys all these assumptions is an ideal gas.",
      table: {
        columns: ["Assumption", "What it means"],
        rows: [
          {
            cells: ["A gas consists of a very large number of identical molecules in continuous random motion", "Molecules move in all directions with all speeds; averages describe the gas"],
            pyqExampleId: "51f4d247-e51f-40d8-9647-32f8eacc1dac",
            noteAmber: "Board 2018 asked for any four assumptions.",
          },
          { cells: ["The size of a molecule is negligible compared with the distance between molecules", "Molecules are point particles; their own volume is negligible compared with the volume of the container"] },
          { cells: ["Molecules exert no force on one another except during a collision", "Between collisions a molecule moves in a straight line with constant velocity"] },
          { cells: ["All collisions, between molecules and with the walls, are perfectly elastic", "Kinetic energy and momentum are conserved in every collision"] },
          { cells: ["The time of a collision is negligible", "It is very small compared with the time between two successive collisions"] },
          { cells: ["Molecules obey Newton's laws of motion", "The momentum change in a collision with a wall can be calculated"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which assumption of kinetic theory lets us say that a molecule moves in a straight line between two collisions?",
        steps: ["A molecule changes its velocity only when a force acts on it.", "By assumption, molecules exert no force on one another except during a collision."],
        answer: "Molecules exert no force on one another except during a collision",
      },
      practiceSet: [
        { prompt: "According to kinetic theory, are collisions between gas molecules elastic or inelastic?", answer: "Perfectly elastic" },
        { prompt: "Which two quantities are conserved in a perfectly elastic collision?", answer: "Kinetic energy and momentum" },
        { prompt: "Why can a gas molecule be treated as a point particle?", answer: "Its size is negligible compared with the distance between molecules" },
      ],
      traps: [
        {
          title: "Writing phrases instead of assumptions",
          body: "'Elastic', 'random', 'small' are not assumptions. Write 'All collisions between molecules, and between molecules and the walls, are perfectly elastic.' Each full sentence is a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-mean-free-path",
      name: "Mean free path",
      intuition:
        "A molecule does not travel far before it bumps into another. Picture it sweeping out a thin tube as it moves: any molecule whose centre lies within one diameter of its path gets hit. The more crowded the gas and the bigger the molecules, the shorter the average run between hits.",
      definition:
        "- **Mean free path** λ is the average distance travelled by a molecule between two successive collisions.\n" +
        "- \\(\\lambda = \\dfrac{1}{\\sqrt{2}\\,\\pi d^2 n}\\), where d is the diameter of a molecule and \\(n = N/V\\) is the number of molecules per unit volume. The \\(\\sqrt{2}\\) appears because the other molecules are moving too.\n" +
        "- Using \\(PV = Nk_BT\\), \\(n = \\dfrac{P}{k_BT}\\), so \\(\\lambda = \\dfrac{k_BT}{\\sqrt{2}\\,\\pi d^2 P}\\).\n" +
        "- λ decreases when the gas is denser or the molecules are larger.",
      formula: {
        label: "Mean free path",
        latex: "\\lambda = \\frac{1}{\\sqrt{2}\\,\\pi d^2 n}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "diameter of a molecule" },
          { symbol: "\\(n\\)", meaning: "number of molecules per unit volume" },
        ],
      },
      authoredExample: {
        prompt:
          "Gas molecules of diameter \\(3 \\times 10^{-10}\\) m are present at \\(2.5 \\times 10^{25}\\) molecules per cubic metre. Find the mean free path.",
        steps: [
          "Given: \\(d = 3 \\times 10^{-10}\\) m, \\(n = 2.5 \\times 10^{25}\\) m⁻³.",
          "Formula: \\(\\lambda = \\dfrac{1}{\\sqrt{2}\\,\\pi d^2 n}\\).",
          "Substitution: \\(\\lambda = \\dfrac{1}{1.414 \\times 3.142 \\times (3 \\times 10^{-10})^2 \\times 2.5 \\times 10^{25}} = \\dfrac{1}{1.0 \\times 10^{7}}\\).",
          "\\(\\lambda = 1.0 \\times 10^{-7}\\) m.",
        ],
        answer: "λ ≈ 1.0 × 10⁻⁷ m",
      },
      selfCheckExample: {
        prompt: "The number of molecules per unit volume of a gas is doubled. What happens to the mean free path?",
        steps: ["\\(\\lambda \\propto \\dfrac{1}{n}\\).", "Doubling n halves λ."],
        answer: "It becomes half",
      },
      practiceSet: [
        { prompt: "Define mean free path.", answer: "The average distance travelled by a molecule between two successive collisions" },
        { prompt: "The diameter of the molecules of a gas is doubled, with the same number per unit volume. By what factor does the mean free path change?", answer: "It becomes one fourth, since \\(\\lambda \\propto 1/d^2\\)" },
        { prompt: "A gas in a sealed rigid vessel is heated. Does its mean free path change?", answer: "No. The number of molecules per unit volume stays the same" },
      ],
      pyqExampleId: "81616c57-fd5e-4bf7-ae87-39f3dc09bcef",
      traps: [
        {
          title: "d instead of d²",
          body: "The diameter enters through the area of the swept tube, \\(\\pi d^2\\). A formula with d to the first power cannot be right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-pressure-derivation",
      name: "Pressure exerted by a gas",
      intuition:
        "Every time a molecule bounces off a wall, it pushes on the wall. One push is tiny, but billions of them every second add up to a steady force. Pressure is that force on each square metre. Work out the push of one molecule, add up all the molecules, then use the fact that no direction is special.",
      definition:
        "**Derivation (cube of side L, N molecules each of mass m):**\n" +
        "- A molecule with velocity components \\(v_x, v_y, v_z\\) hits the wall perpendicular to the X axis and rebounds elastically. Its momentum changes from \\(mv_x\\) to \\(-mv_x\\), a change of \\(-2mv_x\\); the wall receives \\(2mv_x\\).\n" +
        "- It returns to the same wall after travelling \\(2L\\), so the time between hits is \\(\\Delta t = \\dfrac{2L}{v_x}\\).\n" +
        "- Force due to one molecule: \\(f = \\dfrac{2mv_x}{2L/v_x} = \\dfrac{mv_x^2}{L}\\).\n" +
        "- Total force: \\(F = \\dfrac{m}{L}(v_{x1}^2 + v_{x2}^2 + \\dots + v_{xN}^2) = \\dfrac{mN}{L}\\,\\overline{v_x^2}\\).\n" +
        "- Pressure: \\(P = \\dfrac{F}{L^2} = \\dfrac{mN}{V}\\,\\overline{v_x^2}\\), with \\(V = L^3\\).\n" +
        "- Motion is random, so \\(\\overline{v_x^2} = \\overline{v_y^2} = \\overline{v_z^2} = \\dfrac{1}{3}\\overline{v^2}\\).\n" +
        "- Hence \\(P = \\dfrac{1}{3}\\dfrac{N}{V}m\\overline{v^2} = \\dfrac{1}{3}\\rho\\,\\overline{v^2}\\), where \\(\\rho = Nm/V\\) is the density.\n" +
        "- Draw the cube with the X, Y, Z axes and mark the wall the molecule strikes.",
      formula: {
        label: "Pressure of an ideal gas",
        latex: "P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2} = \\frac{1}{3}\\rho\\,\\overline{v^2}",
        symbols: [
          { symbol: "\\(\\overline{v^2}\\)", meaning: "mean square speed of the molecules" },
          { symbol: "\\(\\rho\\)", meaning: "density of the gas" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas of density 1.25 kg/m³ exerts a pressure of \\(1.0 \\times 10^5\\) Pa. Find the mean square speed of its molecules and its square root.",
        steps: [
          "Given: \\(\\rho = 1.25\\) kg/m³, \\(P = 1.0 \\times 10^5\\) Pa.",
          "Formula: \\(P = \\dfrac{1}{3}\\rho\\,\\overline{v^2}\\), so \\(\\overline{v^2} = \\dfrac{3P}{\\rho}\\).",
          "Substitution: \\(\\overline{v^2} = \\dfrac{3 \\times 1.0 \\times 10^5}{1.25} = 2.4 \\times 10^5\\) m²/s².",
          "Square root: \\(\\sqrt{2.4 \\times 10^5} = 490\\) m/s.",
        ],
        answer: "Mean square speed 2.4 × 10⁵ m²/s²; its square root is 490 m/s",
      },
      selfCheckExample: {
        prompt: "In a box of gas, the speed of every molecule is doubled while the number of molecules and the volume stay the same. What happens to the pressure?",
        steps: ["P is proportional to the mean square speed.", "Doubling every speed makes \\(\\overline{v^2}\\) four times."],
        answer: "It becomes four times",
      },
      practiceSet: [
        { prompt: "A molecule of mass m moving with velocity component \\(v_x\\) rebounds elastically from a wall. What momentum does the wall receive?", answer: "\\(2mv_x\\)" },
        { prompt: "In a cube of side L, how long does a molecule take between two successive hits on the same wall?", answer: "\\(2L/v_x\\)" },
        { prompt: "Why is \\(\\overline{v_x^2}\\) equal to one third of \\(\\overline{v^2}\\)?", answer: "The motion is random, so no direction is preferred and the three components share \\(\\overline{v^2}\\) equally" },
      ],
      pyqExampleId: "f9ffa17c-3685-4a67-bd33-9d6dbf8670bf",
      traps: [
        {
          title: "Momentum change of mv instead of 2mv",
          body: "The molecule's velocity reverses, from \\(+v_x\\) to \\(-v_x\\), so its momentum changes by \\(2mv_x\\). Writing \\(mv_x\\) halves every later step.",
        },
        {
          title: "Skipping the step to one third",
          body: "The result has \\(\\dfrac{1}{3}\\) only because \\(\\overline{v_x^2} = \\dfrac{1}{3}\\overline{v^2}\\). State the reason (random motion, no preferred direction); examiners give a mark for it.",
        },
        {
          title: "No diagram",
          body: "The derivation is asked for 3 to 4 marks. Draw the cube with axes and the shaded wall, and label L and the velocity components.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-boyle-kinetic",
      name: "Boyle's law from kinetic theory",
      intuition:
        "Squeeze a gas without changing its temperature. The molecules keep the same speeds, but now they are packed closer, so they reach the walls more often. More hits each second on each square metre means more pressure, and the pressure rises exactly as the volume falls.",
      definition:
        "- From the pressure expression, \\(PV = \\dfrac{1}{3}Nm\\overline{v^2}\\).\n" +
        "- For a fixed mass of gas, N and m are constant.\n" +
        "- At constant temperature, \\(\\overline{v^2}\\) is constant, because the average kinetic energy of a molecule depends only on the temperature.\n" +
        "- So the right side is constant: \\(PV = \\text{constant}\\), which is Boyle's law.\n" +
        "- Physical reason: a smaller volume means more molecules per unit volume, so more collisions per second on each unit area of the wall. Each collision gives the same momentum as before.",
      formula: {
        label: "Kinetic form of PV",
        latex: "PV = \\frac{1}{3}N m \\overline{v^2} = \\text{constant at constant } T",
      },
      authoredExample: {
        prompt:
          "A fixed mass of gas at \\(2 \\times 10^5\\) Pa is compressed at constant temperature from 6 L to 4 L. Find the new pressure, and say which quantity in \\(P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2}\\) has changed.",
        steps: [
          "Given: \\(P_1 = 2 \\times 10^5\\) Pa, \\(V_1 = 6\\) L, \\(V_2 = 4\\) L, T constant.",
          "Formula: \\(P_1V_1 = P_2V_2\\).",
          "Substitution: \\(P_2 = \\dfrac{2 \\times 10^5 \\times 6}{4} = 3 \\times 10^5\\) Pa.",
          "Only \\(N/V\\), the number of molecules per unit volume, has changed. m and \\(\\overline{v^2}\\) are the same.",
        ],
        answer: "3 × 10⁵ Pa; the number of molecules per unit volume has increased",
      },
      selfCheckExample: {
        prompt: "The volume of a fixed mass of gas is halved at constant temperature. What happens to the number of collisions per second on each unit area of the wall?",
        steps: ["The number of molecules per unit volume doubles.", "The speeds are unchanged, so twice as many molecules reach each unit area each second."],
        answer: "It doubles, and so does the pressure",
      },
      practiceSet: [
        { prompt: "When a gas is compressed at constant temperature, does the speed of its molecules change?", answer: "No. The mean square speed depends only on the temperature" },
        { prompt: "Which quantity in \\(P = \\frac{1}{3}\\frac{N}{V}m\\overline{v^2}\\) changes when a gas is compressed at constant temperature?", answer: "N/V, the number of molecules per unit volume" },
      ],
      pyqExampleId: "a715ef96-0889-4f4c-8138-a2a44af908a9",
      traps: [
        {
          title: "Saying the molecules hit harder",
          body: "At constant temperature the molecules do not move faster, so each hit gives the same momentum. Pressure rises because the hits are more frequent, not stronger.",
        },
        {
          title: "Leaving out 'fixed mass' and 'constant temperature'",
          body: "\\(PV\\) is constant only when N is fixed and T is fixed. State both conditions in the deduction.",
        },
      ],
    },
  ],
};
