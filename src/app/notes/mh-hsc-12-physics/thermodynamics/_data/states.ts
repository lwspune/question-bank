import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_STATES_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamic State Variables and the p-V Diagram",
  title: "Equilibrium, the Zeroth Law and the p-V Diagram",
  oneLineDefinition:
    "The three kinds of equilibrium a system needs before its state variables mean anything, the zeroth law that makes temperature measurable, and how to read work from a p-V diagram.",
  whyItMatters:
    "9 questions, five of them from board papers from 2022 to 2026. The board asks you to define mechanical, chemical and thermal equilibrium (2022, 2025 and twice in 2026) and to name the zeroth law from its statement (2025). The textbook adds the work done in 25 rounds of a cycle drawn on a p-V diagram, redrawing a V-T cycle as p-V and p-T diagrams, and p-V diagrams for positive and negative work.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscptd-equilibrium",
      name: "Mechanical, chemical and thermal equilibrium",
      intuition:
        "Pressure, volume and temperature describe a gas only when it has settled down. Settled means three things at once: no unbalanced push anywhere, no reaction or mixing going on, and one temperature throughout. Then a single set of values of p, V and T describes the whole system.",
      definition:
        "- A system is in **thermodynamic equilibrium** when it is in mechanical, chemical and thermal equilibrium at the same time.\n" +
        "- Only then can its state be described by one set of **state variables**: pressure p, volume V and temperature T. For an ideal gas they are linked by the equation of state \\(pV = nRT\\).\n" +
        "- Each definition is a one-mark answer: give the condition, and say that it does not change with time.",
      table: {
        columns: ["Equilibrium", "Condition", "What is uniform"],
        rows: [
          {
            cells: [
              "Mechanical",
              "No unbalanced force within the system, and none between the system and its surroundings",
              "Pressure: the same throughout and equal to that of the surroundings",
            ],
            pyqExampleId: "e8233a42-c494-43c7-84a9-5497ce34d6f7",
            noteAmber: "Board 2022 asked for mechanical and thermal equilibrium.",
          },
          {
            cells: [
              "Chemical",
              "No chemical reaction within the system and no transfer of matter (such as diffusion) from one part to another",
              "Chemical composition",
            ],
            pyqExampleId: "9c020eb2-bb2e-4f31-bb9f-4edc3ad45bf9",
            noteAmber: "Board 2026 asked for mechanical and chemical equilibrium.",
          },
          {
            cells: [
              "Thermal",
              "No flow of heat within the system or between it and its surroundings",
              "Temperature: the same throughout and equal to that of the surroundings",
            ],
            pyqExampleId: "8aaa4146-3fe2-4cd6-9881-ba6ae0b86669",
            noteAmber: "Board 2025 and 2026 asked all three definitions.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A gas in a cylinder is at the same temperature as the room, but its piston is still moving outward. Is the gas in thermodynamic equilibrium?",
        steps: [
          "The temperatures match, so thermal equilibrium holds.",
          "A moving piston means an unbalanced force, so there is no mechanical equilibrium.",
        ],
        answer: "No; it is not in mechanical equilibrium",
      },
      practiceSet: [
        { prompt: "Sugar is still dissolving in a glass of water. Which equilibrium is missing?", answer: "Chemical equilibrium" },
        { prompt: "Which quantity is the same throughout a system in mechanical equilibrium?", answer: "Pressure" },
        { prompt: "Two bodies in contact exchange no heat. Which equilibrium are they in?", answer: "Thermal equilibrium" },
      ],
      pyqExampleId: "3163fe10-ca7a-4361-abcc-471f3f061f5c",
      traps: [
        {
          title: "Leaving out 'does not change with time'",
          body: "Each definition needs the condition and that it stays so with time. A pressure that is uniform for one instant is not equilibrium.",
        },
        {
          title: "Describing only the inside of the system",
          body: "Mechanical and thermal equilibrium also need the system to match its surroundings: no unbalanced force, and the same temperature, across the boundary as well.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-zeroth-law",
      name: "The zeroth law of thermodynamics",
      intuition:
        "If a thermometer reads the same in two cups of water, you know the cups would exchange no heat if you put them in contact. That everyday idea is the zeroth law. It is what lets a thermometer compare the temperatures of bodies that never touch each other.",
      definition:
        "- **Statement:** if two systems are each in thermal equilibrium with a third system, they are also in thermal equilibrium with each other.\n" +
        "- **Thermal equilibrium:** two systems in thermal contact are in thermal equilibrium if they do not transfer heat between each other, that is, if they are at the same temperature.\n" +
        "- **Importance:** temperature is a property shared by all systems in thermal equilibrium. A thermometer kept in contact with a body until the two reach equilibrium reads the body's temperature.\n" +
        "- It is called the zeroth law because it was stated after the first and second laws, though it comes before them logically.",
      formula: {
        label: "Zeroth law",
        latex: "T_A = T_C \\ \\text{and} \\ T_B = T_C \\ \\Rightarrow \\ T_A = T_B",
      },
      authoredExample: {
        prompt:
          "A thermometer C reads 35 °C after it is left in body A until no more heat flows. Left in body B in the same way, it again reads 35 °C. Use the zeroth law to say what happens when A and B are put in thermal contact.",
        steps: [
          "A is in thermal equilibrium with C, and B is in thermal equilibrium with C.",
          "By the zeroth law, A and B are in thermal equilibrium with each other.",
          "So no heat flows between A and B; both are at 35 °C.",
        ],
        answer: "No heat flows between A and B",
      },
      selfCheckExample: {
        prompt: "Blocks P and Q are each in thermal equilibrium with block R. P is at 300 K. What is the temperature of Q?",
        steps: ["P and Q are in thermal equilibrium with each other, so they are at the same temperature."],
        answer: "300 K",
      },
      practiceSet: [
        { prompt: "Which law of thermodynamics makes the thermometer possible?", answer: "The zeroth law" },
        { prompt: "Why is the zeroth law called 'zeroth'?", answer: "It was stated after the first and second laws but comes before them logically" },
      ],
      pyqExampleId: "3264cb55-b1c6-46ba-bcca-e8bbd7822cb1",
      traps: [
        {
          title: "Calling it the first law",
          body: "The statement about three systems in thermal equilibrium is the zeroth law. The first law is about energy: \\(Q = \\Delta U + W\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-pv-diagram",
      name: "Reading a p-V diagram",
      intuition:
        "A p-V diagram is a map of a gas's journey. Every point is one equilibrium state, and a path between points is a process. The area under a path is the work done. If the path closes on itself into a loop, the gas comes back to where it started, and the area inside the loop is the net work done in one round.",
      definition:
        "- Plot p on the vertical axis and V on the horizontal axis. Each point is an equilibrium state; a curve with an arrow is a process.\n" +
        "- Work in a process is the area under its curve: positive when the curve is traced to the right (expansion), negative when it is traced to the left (compression).\n" +
        "- A vertical line (constant volume) has no area under it, so no work is done along it.\n" +
        "- For a closed loop, net work is the area enclosed: positive if the loop is traced clockwise, negative if anticlockwise.\n" +
        "- To turn a V-T or p-T diagram into a p-V diagram, use \\(pV = nRT\\). A straight line through the origin on a V-T graph means constant pressure. A line at constant T becomes an isotherm, a rectangular hyperbola, on the p-V diagram.",
      formula: {
        label: "Net work in a cycle",
        latex: "W = \\oint p\\,dV = \\text{area enclosed by the loop}",
      },
      authoredExample: {
        prompt:
          "A gas is taken clockwise round a rectangle on a p-V diagram, between pressures of \\(1 \\times 10^{5}\\) Pa and \\(3 \\times 10^{5}\\) Pa and volumes of \\(2 \\times 10^{-3}\\) m\\(^3\\) and \\(5 \\times 10^{-3}\\) m\\(^3\\). Find the net work done by the gas in one cycle and in 10 cycles.",
        steps: [
          "Given: \\(\\Delta p = (3 - 1) \\times 10^{5} = 2 \\times 10^{5}\\) Pa, \\(\\Delta V = (5 - 2) \\times 10^{-3} = 3 \\times 10^{-3}\\) m\\(^3\\).",
          "Formula: net work = area enclosed \\(= \\Delta p \\times \\Delta V\\).",
          "Substitution: \\(W = 2 \\times 10^{5} \\times 3 \\times 10^{-3} = 600\\) J per cycle, positive because the loop is clockwise.",
          "In 10 cycles: \\(10 \\times 600 = 6.0 \\times 10^{3}\\) J.",
        ],
        answer: "600 J per cycle; \\(6.0 \\times 10^{3}\\) J in 10 cycles",
      },
      selfCheckExample: {
        prompt:
          "A gas goes anticlockwise round a triangle on a p-V diagram. The triangle's base is \\(4 \\times 10^{-3}\\) m\\(^3\\) along the volume axis and its height is \\(2 \\times 10^{5}\\) Pa. Find the net work done by the gas.",
        steps: [
          "Area \\(= \\dfrac{1}{2} \\times 4 \\times 10^{-3} \\times 2 \\times 10^{5} = 400\\) J.",
          "Anticlockwise, so the net work done by the gas is negative.",
        ],
        answer: "\\(-400\\) J",
      },
      practiceSet: [
        { prompt: "A gas goes from state A to state B along a vertical line on a p-V diagram. How much work is done?", answer: "Zero" },
        { prompt: "A cycle on a p-V diagram is traced anticlockwise. Is the net work done by the gas positive or negative?", answer: "Negative" },
        { prompt: "On a V-T diagram, what kind of process does a straight line through the origin show?", answer: "A constant-pressure (isobaric) process" },
      ],
      pyqExampleId: "8c633fbb-ba15-4200-b65b-ea9ba0e74b88",
      traps: [
        {
          title: "Ignoring the units on the axes",
          body: "Read the scale printed on each axis. A volume axis in litres must be multiplied by \\(10^{-3}\\) to give m\\(^3\\), and a pressure axis marked in units of \\(10^{5}\\) Pa must be multiplied too.",
        },
        {
          title: "Treating a round loop as a circle",
          body: "When the two axes carry different scales, a loop drawn round on paper is an ellipse in p and V. Its area is \\(\\pi ab\\), with a the half-width in volume and b the half-height in pressure.",
        },
      ],
    },
  ],
};
