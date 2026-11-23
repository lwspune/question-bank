import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_CARNOT_NOTE: SubtopicNote = {
  subtopicName: "Carnot Cycle and Carnot Engine",
  title: "The Carnot Cycle and the Carnot Engine",
  oneLineDefinition:
    "The ideal reversible engine: its four steps, two isothermal and two adiabatic, and its efficiency η = 1 − Tc/Th, the highest any engine can have between two temperatures.",
  whyItMatters:
    "5 questions, one of them from a board paper: the work done and the efficiency of a Carnot engine that takes 4000 J at 500 K and rejects 2000 J at 200 K (2025). The textbook adds a solved example on the work done and the heat rejected, the sink temperature for 75% efficiency, when the efficiency is large, and why the cycle needs two isothermal and two adiabatic steps.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscptd-carnot-cycle",
      name: "The four steps of the Carnot cycle",
      intuition:
        "Carnot imagined the best engine possible: no friction, and no heat ever flowing across a temperature gap, so every step can be run backwards. Heat may be exchanged only while the gas is at the same temperature as the reservoir, so those steps are isothermal. The gas is carried between the two temperatures with no heat at all, so those steps are adiabatic.",
      definition:
        "- A **Carnot engine** is an ideal engine in which every step is reversible. Its working substance is an ideal gas in a cylinder with a frictionless piston.\n" +
        "- Heat is exchanged only at a constant temperature, so the two heat-exchange steps are **isothermal**. The temperature changes only when no heat is exchanged, so the other two steps are **adiabatic**.\n" +
        "- On a p-V diagram the cycle is traced clockwise: A to B and C to D are isotherms, and B to C and D to A are the steeper adiabatic curves.",
      table: {
        columns: ["Step", "Process", "What happens"],
        rows: [
          { cells: ["A to B", "Isothermal expansion at \\(T_H\\)", "The gas absorbs heat \\(Q_H\\) from the source and does work"] },
          { cells: ["B to C", "Adiabatic expansion", "The gas does work and cools from \\(T_H\\) to \\(T_C\\); no heat is exchanged"] },
          { cells: ["C to D", "Isothermal compression at \\(T_C\\)", "Work is done on the gas and it rejects heat \\(Q_C\\) to the sink"] },
          { cells: ["D to A", "Adiabatic compression", "Work is done on the gas and it warms from \\(T_C\\) back to \\(T_H\\); no heat is exchanged"] },
        ],
      },
      selfCheckExample: {
        prompt: "During which step of the Carnot cycle does the gas cool from \\(T_H\\) to \\(T_C\\), and is any heat exchanged in that step?",
        steps: ["Cooling with no heat exchanged is the adiabatic expansion."],
        answer: "B to C, the adiabatic expansion; no heat is exchanged",
      },
      practiceSet: [
        { prompt: "In which step of the Carnot cycle is heat taken from the source?", answer: "A to B, the isothermal expansion" },
        { prompt: "In which step of the Carnot cycle is heat given to the sink?", answer: "C to D, the isothermal compression" },
        { prompt: "Is the Carnot cycle traced clockwise or anticlockwise on a p-V diagram when it works as an engine?", answer: "Clockwise" },
      ],
      pyqExampleId: "76f4ff37-872c-46cb-a977-3d7457e92a41",
      traps: [
        {
          title: "Drawing the cycle as a rectangle",
          body: "The Carnot cycle on a p-V diagram has four curved sides: two isotherms and two steeper adiabatics. A rectangle is a different cycle.",
        },
        {
          title: "Exchanging heat while the temperature changes",
          body: "Heat flows only in the two isothermal steps. If your answer has heat flowing during B to C or D to A, the steps are in the wrong order.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscptd-carnot-efficiency",
      name: "Efficiency of a Carnot engine",
      intuition:
        "For a Carnot engine the heats are in the same ratio as the absolute temperatures, so its efficiency depends only on the temperatures of the two reservoirs. No engine working between the same two temperatures can do better. To raise it, make the source hotter or the sink colder.",
      definition:
        "- Efficiency: \\(\\eta = 1 - \\dfrac{Q_C}{Q_H}\\), using the sizes of the heats.\n" +
        "- **Derivation outline.** Isothermal expansion A to B: \\(Q_H = nRT_H\\ln\\dfrac{V_B}{V_A}\\). Isothermal compression C to D: \\(Q_C = nRT_C\\ln\\dfrac{V_C}{V_D}\\).\n" +
        "- The adiabatics give \\(T_HV_B^{\\gamma - 1} = T_CV_C^{\\gamma - 1}\\) (B to C) and \\(T_HV_A^{\\gamma - 1} = T_CV_D^{\\gamma - 1}\\) (D to A). Dividing, \\(\\dfrac{V_B}{V_A} = \\dfrac{V_C}{V_D}\\).\n" +
        "- So \\(\\dfrac{Q_C}{Q_H} = \\dfrac{T_C}{T_H}\\) and \\(\\eta = 1 - \\dfrac{T_C}{T_H} = \\dfrac{T_H - T_C}{T_H}\\).\n" +
        "- Temperatures must be in kelvin. The efficiency is large when \\(T_H - T_C\\) is large: keep the source as hot and the sink as cold as possible.",
      formula: {
        label: "Carnot efficiency",
        latex: "\\eta = 1 - \\frac{T_C}{T_H} = \\frac{T_H - T_C}{T_H}, \\qquad \\frac{Q_C}{Q_H} = \\frac{T_C}{T_H}",
      },
      authoredExample: {
        prompt:
          "A Carnot engine works between a source at 627 °C and a sink at 27 °C and does 1200 J of work in each cycle. Find its efficiency, the heat it takes from the source and the heat it rejects per cycle.",
        steps: [
          "Given: \\(T_H = 627 + 273 = 900\\) K, \\(T_C = 27 + 273 = 300\\) K, \\(W = 1200\\) J.",
          "Efficiency: \\(\\eta = 1 - \\dfrac{T_C}{T_H} = 1 - \\dfrac{300}{900} = \\dfrac{2}{3} = 0.667\\).",
          "Heat taken: \\(Q_H = \\dfrac{W}{\\eta} = \\dfrac{1200}{2/3} = 1800\\) J.",
          "Heat rejected: \\(Q_C = Q_H - W = 1800 - 1200 = 600\\) J.",
        ],
        answer: "η = 66.7%; \\(Q_H = 1800\\) J; \\(Q_C = 600\\) J",
      },
      selfCheckExample: {
        prompt: "A Carnot engine has its sink at 300 K and an efficiency of 40%. Find the temperature of its source.",
        steps: ["\\(T_C/T_H = 1 - 0.40 = 0.60\\).", "\\(T_H = 300/0.60 = 500\\) K."],
        answer: "500 K",
      },
      practiceSet: [
        { prompt: "A Carnot engine works between 227 °C and 27 °C. Find its efficiency.", answer: "\\(1 - 300/500 = 0.4\\), that is 40%" },
        { prompt: "The sink of a Carnot engine is kept fixed and its source is made hotter. Does the efficiency rise or fall?", answer: "It rises" },
        { prompt: "What sink temperature would a Carnot engine need for an efficiency of 100%?", answer: "0 K, which cannot be reached" },
      ],
      pyqExampleId: "114f4142-4ec1-43c0-8fcc-f6aa9e0cc127",
      traps: [
        {
          title: "Putting Celsius temperatures into 1 − Tc/Th",
          body: "The formula works only in kelvin. A source at 127 °C is 400 K; using 127 gives a wrong efficiency.",
        },
        {
          title: "Heats that do not match the temperatures",
          body: "If a question gives both the heats and the temperatures, find W from the heats, \\(W = Q_H - Q_C\\), and \\(\\eta = W/Q_H\\). Then compare with \\(1 - T_C/T_H\\) and say which you used if the two differ.",
        },
      ],
    },
  ],
};
