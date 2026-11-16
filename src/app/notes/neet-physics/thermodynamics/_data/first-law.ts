import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_TD_FIRST_LAW_NOTE: SubtopicNote = {
  subtopicName: "Heat, Work and the First Law",
  title: "Heat, Work and the First Law",
  oneLineDefinition:
    "The variables that describe a state, heat and work as energy in transfer, the first law ΔQ = ΔU + ΔW, and work as the area under a P-V graph.",
  whyItMatters:
    "Five NEET questions from 2024 to 2026. One picks the variables that describe an equilibrium state (Re-NEET 2024), two use the first law (two pistons pushed out by equal heat in 2025, a heater and the work a system does in 2026), and two read work off a P-V graph (the work along one side of a cycle in 2024, the heat taken in over a whole cycle in Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphtd-state-variables",
      name: "State variables and thermal equilibrium",
      intuition:
        "A gas in equilibrium is fully described by a few numbers: its pressure, volume and temperature. These are state variables: they depend only on the state the gas is in, not on how it got there. Heat and work are different. They are energy on the move, and how much of each flows depends on the path taken from one state to another.",
      definition:
        "- **Zeroth law:** two systems each in thermal equilibrium with a third are in thermal equilibrium with each other. This is what makes temperature a meaningful quantity.\n" +
        "- An equilibrium state is described by state variables such as pressure, volume, temperature and internal energy. An equation of state links them; for an ideal gas it is \\(PV = \\mu RT\\).\n" +
        "- **Heat** is energy that flows because of a temperature difference. **Work** is energy transferred by other means, such as a moving piston. Neither is held by a body, so neither is a state variable.\n" +
        "- **Intensive** variables do not depend on the amount (pressure, temperature, density). **Extensive** ones do (volume, mass, internal energy).",
      table: {
        columns: ["Quantity", "State variable?", "Why"],
        rows: [
          { cells: ["Pressure P", "Yes", "fixed by the equilibrium state"] },
          { cells: ["Volume V", "Yes", "fixed by the equilibrium state"] },
          { cells: ["Temperature T", "Yes", "fixed by the equilibrium state"] },
          { cells: ["Internal energy U", "Yes", "depends only on the state; for an ideal gas only on T"] },
          {
            cells: ["Heat Q", "No", "depends on the path from one state to another"],
            pyqExampleId: "260f092b-77fb-4984-90b0-690e587e87f2",
            noteAmber: "Re-NEET 2024: pick the quantities that describe an equilibrium state from pressure, total heat, temperature, volume and work done.",
          },
          { cells: ["Work W", "No", "depends on the path; it is the area under the P-V curve"] },
        ],
        caption: "P, V, T and U describe a state; heat and work describe a change between states.",
      },
      selfCheckExample: {
        prompt:
          "A gas is taken from state A to state B along two different paths. Which of these is the same along both paths: the heat given, the work done or the change in internal energy?",
        steps: [
          "Internal energy is a state variable, so its change depends only on A and B.",
          "Heat and work depend on the path, so they can differ between the two paths.",
        ],
        answer: "The change in internal energy",
      },
      practiceSet: [
        { prompt: "State the zeroth law of thermodynamics.", answer: "Two systems each in thermal equilibrium with a third are in thermal equilibrium with each other" },
        { prompt: "Is volume an intensive or an extensive variable?", answer: "Extensive" },
        { prompt: "Is temperature an intensive or an extensive variable?", answer: "Intensive" },
        { prompt: "A gas goes round a full cycle and returns to its starting state. What is its change in internal energy?", answer: "Zero" },
      ],
      pyqExampleId: "260f092b-77fb-4984-90b0-690e587e87f2",
      traps: [
        {
          title: "A body holds internal energy, not heat",
          body: "Heat is energy on its way from a hotter body to a colder one. Once it arrives it is part of the internal energy, so 'the heat in a body' is not a state variable.",
        },
        {
          title: "Work depends on the path",
          body: "Two paths between the same two states can need different amounts of work, so work done can never describe a state.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphtd-first-law",
      name: "The first law of thermodynamics",
      intuition:
        "The first law is energy conservation for heat. Heat given to a gas does two jobs: part of it raises the internal energy, and the rest is spent as work when the gas pushes its surroundings back. Whatever goes in must be accounted for by these two.",
      definition:
        "- \\(\\Delta Q = \\Delta U + \\Delta W\\).\n" +
        "- Signs: \\(\\Delta Q\\) is positive for heat given to the system. \\(\\Delta W\\) is positive for work done by the system, negative for work done on it.\n" +
        "- At constant pressure the work done by a gas is \\(\\Delta W = P\\Delta V\\).\n" +
        "- For an ideal gas U depends only on T: \\(\\Delta U = \\mu C_v\\Delta T\\) for any process.\n" +
        "- The law holds moment by moment too: heat supplied per second = rise in internal energy per second + work done per second.",
      formula: {
        label: "First law",
        latex: "\\Delta Q = \\Delta U + \\Delta W, \\qquad \\Delta W = P\\Delta V\\ (P\\ \\text{fixed}), \\qquad \\Delta U = \\mu C_v\\Delta T",
        symbols: [
          { symbol: "\\(\\Delta Q\\)", meaning: "heat given to the system" },
          { symbol: "\\(\\Delta U\\)", meaning: "rise in internal energy" },
          { symbol: "\\(\\Delta W\\)", meaning: "work done by the system" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas takes in 500 J of heat and expands at a constant pressure of \\(1.0 \\times 10^{5}\\) Pa from 2 litres to 4 litres. Find the work done by the gas and the change in its internal energy.",
        steps: [
          "\\(\\Delta V = 2\\) litres \\(= 2 \\times 10^{-3}\\ \\text{m}^{3}\\), so \\(\\Delta W = P\\Delta V = 1.0 \\times 10^{5} \\times 2 \\times 10^{-3} = 200\\) J.",
          "\\(\\Delta U = \\Delta Q - \\Delta W = 500 - 200 = 300\\) J.",
        ],
        answer: "200 J of work; internal energy rises by 300 J",
      },
      selfCheckExample: {
        prompt:
          "One mole of a monatomic ideal gas is heated at constant volume from 300 K to 320 K. How much heat is needed? (\\(C_v = \\dfrac{3}{2}R\\), R = 8.3 J/mol K)",
        steps: [
          "At constant volume no work is done, so \\(\\Delta Q = \\Delta U\\).",
          "\\(\\Delta U = \\mu C_v\\Delta T = 1 \\times 1.5 \\times 8.3 \\times 20 = 249\\) J.",
        ],
        answer: "249 J",
      },
      practiceSet: [
        { prompt: "A system gives out 200 J of heat while 300 J of work is done on it. What is the change in its internal energy?", answer: "It rises by 100 J" },
        { prompt: "No heat enters or leaves a gas while it does 150 J of work. What is the change in its internal energy?", answer: "It falls by 150 J" },
        { prompt: "Write the first law of thermodynamics with \\(\\Delta W\\) as the work done by the system.", answer: "\\(\\Delta Q = \\Delta U + \\Delta W\\)" },
      ],
      pyqExampleId: "f5e84fbb-b2f2-409c-91d6-5020ebc14f69",
      traps: [
        {
          title: "Work done on the gas is negative",
          body: "In \\(\\Delta Q = \\Delta U + \\Delta W\\), \\(\\Delta W\\) is work done by the gas. When 300 J of work is done on the gas, put \\(\\Delta W = -300\\) J.",
        },
        {
          title: "Heat given out is negative",
          body: "A system that loses 200 J of heat has \\(\\Delta Q = -200\\) J. Keeping it positive flips the answer for the internal energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphtd-pv-work",
      name: "Work as the area under a P-V graph",
      intuition:
        "When a gas pushes a piston out a little, the work it does is its pressure times the small change in volume. Add up all these small pieces as the gas expands and you get the area under its curve on a P-V graph. So a P-V graph turns work into geometry: a rectangle, a triangle or a trapezium.",
      definition:
        "- Work done by a gas = area under its P-V curve between the starting and final volumes. Positive when the volume grows, negative when it shrinks.\n" +
        "- Constant volume (a vertical line): no area, so \\(\\Delta W = 0\\).\n" +
        "- Constant pressure (a horizontal line): \\(\\Delta W = P(V_2 - V_1)\\).\n" +
        "- **Cycle:** the gas returns to its start, so \\(\\Delta U = 0\\) and the net heat taken in equals the net work, the area enclosed by the loop. With P up and V across, a clockwise loop means positive work by the gas; anticlockwise, negative.",
      formula: {
        label: "Work from a graph",
        latex: "\\Delta W = \\text{area under the } P\\text{-}V \\text{ curve}, \\qquad \\Delta Q_{cycle} = \\Delta W_{cycle} = \\text{area of the loop}",
      },
      authoredExample: {
        prompt:
          "A gas expands from 1 litre at \\(1 \\times 10^{5}\\) Pa to 3 litres at \\(3 \\times 10^{5}\\) Pa along a straight line on its P-V graph. How much work does it do?",
        steps: [
          "The area under a straight line is a trapezium: half the sum of the parallel sides times the width.",
          "\\(\\Delta W = \\dfrac{1}{2}(1 \\times 10^{5} + 3 \\times 10^{5}) \\times (3 - 1) \\times 10^{-3} = 2 \\times 10^{5} \\times 2 \\times 10^{-3} = 400\\) J.",
        ],
        answer: "400 J",
      },
      selfCheckExample: {
        prompt:
          "A gas is taken clockwise round a cycle that is a triangle on its P-V graph, with a base of \\(2 \\times 10^{-3}\\ \\text{m}^{3}\\) along V and a height of \\(3 \\times 10^{5}\\) Pa. What net heat does it take in per cycle?",
        steps: [
          "Over a cycle \\(\\Delta U = 0\\), so net heat = net work = area of the loop.",
          "Area \\(= \\dfrac{1}{2} \\times 2 \\times 10^{-3} \\times 3 \\times 10^{5} = 300\\) J, positive because the loop is clockwise.",
        ],
        answer: "300 J",
      },
      practiceSet: [
        { prompt: "A gas is compressed at a constant pressure of \\(10^{5}\\) Pa from 3 litres to 1 litre. What work does the gas do?", answer: "\\(-200\\) J (200 J of work is done on it)" },
        { prompt: "On a P-V graph with P up and V across, a gas goes round a cycle anticlockwise. Is the net work done by the gas positive or negative?", answer: "Negative" },
        { prompt: "In one full cycle a gas does 300 J of net work. What net heat does it take in?", answer: "300 J" },
      ],
      pyqExampleId: "1c5cdf34-a02c-4f35-8161-9a87252420b3",
      traps: [
        {
          title: "A vertical line does no work",
          body: "A step at constant volume is a vertical line on a P-V graph. It has no area under it, so the work along it is zero however much the pressure changes.",
        },
        {
          title: "Net heat over a cycle is not zero",
          body: "Only the internal energy returns to its start after a cycle. The net heat taken in equals the net work, the area of the loop.",
        },
      ],
    },
  ],
};
