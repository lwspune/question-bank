import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_FIRST_LAW_NOTE: SubtopicNote = {
  subtopicName: "First Law of Thermodynamics",
  title: "The First Law and Gas Processes",
  oneLineDefinition:
    "Heat given to a gas either raises its internal energy or comes out as work done by the gas; the four standard processes are special cases of that balance.",
  whyItMatters:
    "A 2017 question gave the heat into a gas and the work it did and asked which kind of process it was. The gas questions from 2022 and 2023 also lean on knowing that an ideal gas held at constant temperature keeps its internal energy.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-hth-energy-balance",
      name: "The first law of thermodynamics and the work done by a gas",
      intuition:
        "Energy is never created or lost, only moved around. Heat put into a gas can go two ways: it can stay inside as extra internal energy, or the gas can spend it pushing a piston outwards. When a gas expands against a pressure it does work, and that work is the pressure times the change in volume.",
      definition:
        "- **First law**: \\(\\Delta U = Q - W\\), where \\(Q\\) is the heat **given to** the gas and \\(W\\) is the work done **by** the gas.\n" +
        "- Signs: \\(Q > 0\\) when heat goes in, \\(Q < 0\\) when it comes out. \\(W > 0\\) when the gas expands, \\(W < 0\\) when it is compressed.\n" +
        "- Some books write \\(\\Delta U = Q + W\\), with \\(W\\) the work done **on** the gas. The physics is the same; check which work is meant.\n" +
        "- At constant pressure the work done by the gas is \\(W = p\\Delta V\\). In general it is the **area under the curve** on a \\(p\\) against \\(V\\) graph.",
      formula: {
        label: "First law and work at constant pressure",
        latex: "\\Delta U = Q - W \\qquad W = p\\,\\Delta V",
        symbols: [
          { symbol: "\\(\\Delta U\\)", meaning: "change in internal energy of the gas, in J" },
          { symbol: "\\(Q\\)", meaning: "heat given to the gas, in J" },
          { symbol: "\\(W\\)", meaning: "work done by the gas, in J" },
          { symbol: "\\(p,\\ \\Delta V\\)", meaning: "pressure in Pa, change in volume in m³" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas at a constant pressure of \\(2.0 \\times 10^5\\ \\text{Pa}\\) expands from 3.0 L to 5.0 L while absorbing 900 J of heat. Find the work it does and the change in its internal energy.",
        steps: [
          "\\(\\Delta V = 2.0\\ \\text{L} = 2.0 \\times 10^{-3}\\ \\text{m}^3\\).",
          "\\(W = p\\Delta V = 2.0 \\times 10^5 \\times 2.0 \\times 10^{-3} = 400\\ \\text{J}\\), done by the gas.",
          "\\(\\Delta U = Q - W = 900 - 400 = 500\\ \\text{J}\\): the internal energy rises, so the gas warms up.",
        ],
        answer: "Work 400 J; internal energy up by 500 J",
      },
      selfCheckExample: {
        prompt:
          "A gas is compressed: 600 J of work is done on it, and at the same time it gives out 250 J of heat. What is the change in its internal energy?",
        options: ["\\(-350\\ \\text{J}\\)", "\\(+350\\ \\text{J}\\)", "\\(+850\\ \\text{J}\\)", "\\(-850\\ \\text{J}\\)", "\\(+250\\ \\text{J}\\)"],
        steps: [
          "Work done by the gas is \\(W = -600\\ \\text{J}\\); heat given to it is \\(Q = -250\\ \\text{J}\\).",
          "\\(\\Delta U = Q - W = -250 - (-600) = +350\\ \\text{J}\\).",
          "Option C adds the two amounts as if both went in; A and D get a sign backwards.",
        ],
        answer: "(B) \\(+350\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "A gas expands by 0.010 m³ against a constant \\(1.0 \\times 10^5\\ \\text{Pa}\\). How much work does it do?", answer: "1000 J", method: "\\(p\\Delta V\\)" },
        { prompt: "A gas absorbs 500 J of heat and does 500 J of work. What is \\(\\Delta U\\)?", answer: "Zero", method: "\\(500 - 500\\)" },
        { prompt: "A gas does 200 J of work with no heat exchanged. What happens to its internal energy?", answer: "It falls by 200 J, so the gas cools" },
        { prompt: "What does the area under a \\(p\\) against \\(V\\) graph represent?", answer: "The work done by (or on) the gas" },
      ],
      traps: [
        {
          title: "Work done by the gas and work done on it have opposite signs",
          body: "Compression means work is done on the gas, so the work done by the gas is negative. Putting 600 J of compression into \\(\\Delta U = Q - W\\) as \\(+600\\) gives the internal energy change with the wrong sign.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hth-processes",
      name: "Isothermal, isobaric, isochoric and adiabatic processes",
      intuition:
        "Each named process holds one thing fixed, and that kills one term of the first law. Fix the temperature of an ideal gas and its internal energy cannot change. Fix the volume and no work is done. Block all heat flow and the only way to change the internal energy is through work.",
      definition:
        "Each process keeps one quantity constant:\n" +
        "- **Isothermal**: constant temperature. For an ideal gas \\(\\Delta U = 0\\), so \\(Q = W\\): all heat in comes out as work.\n" +
        "- **Isobaric**: constant pressure, \\(W = p\\Delta V\\).\n" +
        "- **Isochoric** (isovolumetric): constant volume, \\(W = 0\\), so \\(Q = \\Delta U\\).\n" +
        "- **Adiabatic**: no heat exchanged, \\(Q = 0\\), so \\(\\Delta U = -W\\). A gas that expands adiabatically cools; one compressed adiabatically warms. It happens when the change is fast or the container is insulated.",
      table: {
        columns: ["Process", "What stays constant", "First law becomes", "Line on a p against V graph"],
        rows: [
          { cells: ["Isothermal", "Temperature, so the internal energy of an ideal gas", "\\(Q = W\\)", "A hyperbola, \\(pV\\) constant"] },
          { cells: ["Isobaric", "Pressure", "\\(Q = \\Delta U + p\\Delta V\\)", "A horizontal line"] },
          { cells: ["Isochoric", "Volume, so no work is done", "\\(Q = \\Delta U\\)", "A vertical line"] },
          { cells: ["Adiabatic", "No heat in or out", "\\(\\Delta U = -W\\)", "A curve steeper than the isotherm through the same point"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "An ideal gas in a well-insulated cylinder expands quickly and does 120 J of work on a piston. Which statement is correct?",
        options: [
          "Its temperature rises",
          "Its internal energy is unchanged because the expansion is isothermal",
          "It absorbs 120 J of heat from the cylinder",
          "Its internal energy falls by 120 J and its temperature falls",
          "Its pressure stays constant",
        ],
        steps: [
          "Insulated and fast means adiabatic: \\(Q = 0\\).",
          "\\(\\Delta U = Q - W = 0 - 120 = -120\\ \\text{J}\\), so the internal energy and the temperature fall.",
          "Option B confuses adiabatic with isothermal; C contradicts the insulation; E is wrong because both the volume and the temperature change.",
        ],
        answer: "(D) Its internal energy falls by 120 J and its temperature falls",
      },
      practiceSet: [
        { prompt: "In which process does a gas do no work?", answer: "Isochoric (constant volume)" },
        { prompt: "300 J of heat is given to a gas in a rigid container. What is \\(\\Delta U\\)?", answer: "+300 J", method: "\\(W = 0\\), so \\(\\Delta U = Q\\)" },
        { prompt: "A bicycle pump gets warm when you pump fast. Which process is the air close to?", answer: "Adiabatic compression" },
        { prompt: "In which process does an ideal gas turn all the heat it absorbs into work?", answer: "Isothermal", method: "\\(\\Delta U = 0\\)" },
      ],
      traps: [
        {
          title: "Adiabatic does not mean constant temperature",
          body: "Adiabatic means no heat flows. The temperature changes, because work changes the internal energy. Isothermal is the opposite case: the temperature is constant, and heat does flow in or out.",
        },
      ],
    },
  ],
};
