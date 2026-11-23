import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Heat, Internal Energy and Work",
  title: "Heat, Internal Energy and Work",
  oneLineDefinition:
    "What a thermodynamic system and its surroundings are, how heating changes the internal energy of a gas, and how to find the work a gas does when its volume changes.",
  whyItMatters:
    "9 questions, five of them from board papers from 2022 to 2025. The board asks you to define a thermodynamic system (2025) and its surroundings (2024), explain how heating changes the internal energy of a gas (2024), explain positive and negative work with p-V diagrams (2024) and find the final volume of a gas compressed at constant pressure (2022). The textbook adds the internal energy of argon and oxygen, work done at constant pressure, heat added without a rise in temperature, and a solar cooker compared with a pressure cooker.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscptd-system",
      name: "System, boundary and surroundings",
      intuition:
        "Thermodynamics always starts by drawing a line. Whatever you choose to study, such as the gas in a cylinder, is the system. The line around it is the boundary, and everything outside is the surroundings. Energy crosses that line as heat or as work, and what is allowed to cross decides the type of system.",
      definition:
        "- A **thermodynamic system** is a group of objects that forms one unit and may exchange energy with its surroundings.\n" +
        "- Everything that is not part of the system is its **surroundings** (or environment). The surface that separates the two is the **boundary**.\n" +
        "- Example: water kept in a vessel is the system, the vessel is its boundary and the air around it is the surroundings.\n" +
        "- The board asks each of these as a one-mark definition: name the term, say what it is, and give the water-in-a-vessel example.",
      table: {
        columns: ["System", "What can cross the boundary", "Example"],
        rows: [
          {
            cells: ["Open", "Both energy and matter", "Water boiling in an open kettle (heat and steam escape)"],
            pyqExampleId: "ed959b14-2b62-4559-b66f-7e4d28451a56",
            noteAmber: "Board 2025 asked what a thermodynamic system is; board 2024 asked what its surroundings are.",
          },
          { cells: ["Closed", "Energy only, not matter", "Water boiling in a closed boiler with its valve shut"] },
          { cells: ["Isolated", "Neither energy nor matter", "Hot tea in a thermos flask"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Food cooks in a pressure cooker. Before its weight lifts, only heat crosses the cooker's walls. After the weight lifts, steam escapes too. What type of system is the cooker before, and after, the weight lifts?",
        steps: [
          "Before: energy crosses the boundary but matter does not, so it is a closed system.",
          "After: steam (matter) escapes along with heat, so it is an open system.",
        ],
        answer: "Closed before the weight lifts; open after",
      },
      practiceSet: [
        { prompt: "What is the surface that separates a system from its surroundings called?", answer: "Its boundary" },
        { prompt: "Hot tea is sealed in a thermos flask. What type of system is the tea?", answer: "An isolated system" },
        { prompt: "Which type of system exchanges energy but not matter with its surroundings?", answer: "A closed system" },
      ],
      pyqExampleId: "ed959b14-2b62-4559-b66f-7e4d28451a56",
      traps: [
        {
          title: "Defining surroundings without the system",
          body: "Surroundings means everything that is not part of the system. Say what the system is first, then its boundary and its surroundings, with an example such as water in a vessel.",
        },
        {
          title: "Mixing up closed and isolated",
          body: "A closed system still exchanges energy (heat or work); only matter is kept in. An isolated system exchanges neither energy nor matter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-internal-energy",
      name: "Heat and internal energy",
      intuition:
        "Internal energy is the total energy of the random motion of all the molecules in a system. Heat is not something a body stores. It is energy on the move, flowing because two things are at different temperatures. When heat flows into a gas, its molecules move faster, so its internal energy and its temperature rise.",
      definition:
        "- **Internal energy U:** the total energy of all the molecules of a system, due to their random, disordered motion. For an ideal gas it depends only on the temperature.\n" +
        "- **Heat Q:** energy transferred between a system and its surroundings because of a temperature difference between them.\n" +
        "- If the surroundings are hotter than the gas, heat flows in, Q is positive and U rises. If the gas is hotter, heat flows out, Q is negative and U falls. At the same temperature no heat flows.\n" +
        "- Average energy of one molecule: \\(\\tfrac{3}{2}kT\\) for a monatomic gas such as argon, \\(\\tfrac{5}{2}kT\\) for a diatomic gas such as oxygen. For one mole these become \\(\\tfrac{3}{2}RT\\) and \\(\\tfrac{5}{2}RT\\).\n" +
        "- Heat can be added without a rise in temperature: while ice melts at 0 °C or water boils at 100 °C, the heat breaks the bonds between molecules instead of speeding them up.",
      formula: {
        label: "Internal energy of n moles of an ideal gas",
        latex: "U = \\frac{3}{2}nRT \\ (\\text{monatomic}), \\qquad U = \\frac{5}{2}nRT \\ (\\text{diatomic})",
      },
      authoredExample: {
        prompt:
          "Find the internal energy of 2 mol of helium, a monatomic gas, at 300 K. Take \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).",
        steps: [
          "Given: \\(n = 2\\) mol, \\(T = 300\\) K, \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).",
          "Formula: for a monatomic gas \\(U = \\dfrac{3}{2}nRT\\).",
          "Substitution: \\(U = \\dfrac{3}{2} \\times 2 \\times 8.314 \\times 300 = 7482.6\\) J.",
        ],
        answer: "\\(U = 7.48 \\times 10^{3}\\) J",
      },
      selfCheckExample: {
        prompt:
          "One mole of oxygen, a diatomic gas, is heated from 300 K to 400 K in a rigid container. By how much does its internal energy rise? Take \\(R = 8.314\\) J mol\\(^{-1}\\) K\\(^{-1}\\).",
        steps: ["\\(\\Delta U = \\dfrac{5}{2}R\\,\\Delta T = 2.5 \\times 8.314 \\times 100\\)."],
        answer: "2078.5 J, about 2.08 kJ",
      },
      practiceSet: [
        { prompt: "Heat flows from a burner into a gas held in a cylinder. Is Q positive or negative for the gas?", answer: "Positive" },
        { prompt: "On what alone does the internal energy of an ideal gas depend?", answer: "Its temperature" },
        { prompt: "Name a process in which heat is added to a body without changing its temperature.", answer: "Melting of ice at 0 °C (or boiling of water at 100 °C)" },
      ],
      pyqExampleId: "c3439095-d7a9-4513-9fc2-befc14734814",
      traps: [
        {
          title: "Saying a hot body contains heat",
          body: "A body has internal energy. Heat is the energy that crosses the boundary because of a temperature difference. Writing 'the heat in the gas' in a definition loses the mark.",
        },
        {
          title: "Explaining heating without the direction of flow",
          body: "Say which is hotter, the gas or its surroundings, so the examiner sees which way heat flows. Then say what happens to the motion of the molecules and to U.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-work",
      name: "Work done when a gas changes volume",
      intuition:
        "A gas pushing a piston out does work on its surroundings, just as you do when you push a door open. The work is the pressure times the change in volume. On a p-V graph it is the area under the curve, and the direction you travel decides the sign: expanding gives positive work, being squashed gives negative work.",
      definition:
        "- A gas at pressure p pushes a piston of area A through a small distance dx: \\(dW = pA\\,dx = p\\,dV\\).\n" +
        "- Over a whole change: \\(W = \\int_{V_i}^{V_f} p\\,dV\\), the area under the p-V curve between \\(V_i\\) and \\(V_f\\).\n" +
        "- At constant pressure: \\(W = p\\,(V_f - V_i)\\).\n" +
        "- **Positive work:** the gas expands (\\(V_f > V_i\\)) and does work on the surroundings.\n" +
        "- **Negative work:** the gas is compressed (\\(V_f < V_i\\)) and the surroundings do work on it.\n" +
        "- No change in volume means no work.",
      formula: {
        label: "Work done by a gas",
        latex: "W = \\int_{V_i}^{V_f} p\\,dV, \\qquad W = p\\,(V_f - V_i) \\ (\\text{constant } p)",
      },
      authoredExample: {
        prompt:
          "A gas at a constant pressure of \\(1.5 \\times 10^{5}\\) Pa expands from \\(2.0 \\times 10^{-3}\\) m\\(^3\\) to \\(5.0 \\times 10^{-3}\\) m\\(^3\\). Find the work done by the gas and say whether it is positive or negative.",
        steps: [
          "Given: \\(p = 1.5 \\times 10^{5}\\) Pa, \\(V_i = 2.0 \\times 10^{-3}\\) m\\(^3\\), \\(V_f = 5.0 \\times 10^{-3}\\) m\\(^3\\).",
          "Formula: \\(W = p\\,(V_f - V_i)\\).",
          "Substitution: \\(W = 1.5 \\times 10^{5} \\times 3.0 \\times 10^{-3} = 450\\) J.",
          "The gas expands, so the work done by it is positive.",
        ],
        answer: "450 J, positive (work done by the gas)",
      },
      selfCheckExample: {
        prompt:
          "On a p-V diagram a gas goes along a straight line from \\(1 \\times 10^{-3}\\) m\\(^3\\) at \\(2 \\times 10^{5}\\) Pa to \\(3 \\times 10^{-3}\\) m\\(^3\\) at \\(4 \\times 10^{5}\\) Pa. Find the work done by the gas.",
        steps: [
          "The area under the line is a trapezium.",
          "\\(W = \\dfrac{1}{2}(2 \\times 10^{5} + 4 \\times 10^{5}) \\times (2 \\times 10^{-3}) = 600\\) J.",
        ],
        answer: "600 J",
      },
      practiceSet: [
        { prompt: "A gas is compressed. Is the work done by the gas positive or negative?", answer: "Negative" },
        { prompt: "How much work does a gas do when it is heated in a rigid closed container?", answer: "None, because its volume does not change" },
        { prompt: "On a p-V diagram, what does the area under the curve between two volumes give?", answer: "The work done by the gas in that change" },
      ],
      pyqExampleId: "f928de51-b4d7-4e19-9e73-d88340d0af62",
      traps: [
        {
          title: "Using litres in W = pΔV",
          body: "Convert litres to cubic metres (1 litre \\(= 10^{-3}\\) m\\(^3\\)) before multiplying by a pressure in pascal, or the work comes out 1000 times too large.",
        },
        {
          title: "Dropping the sign of the work",
          body: "When a gas is compressed, the work done BY it is negative. If a question gives the work done in compressing a gas, write W with a minus sign before you solve for the volume.",
        },
        {
          title: "A p-V sketch without an arrow",
          body: "The same curve gives positive or negative work depending on the direction travelled. Label the axes p and V, mark the direction with an arrow and shade the area under the curve.",
        },
      ],
    },
  ],
};
