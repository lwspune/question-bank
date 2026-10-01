import type { SubtopicNote } from "@/app/notes/_types";

export const FIRST_LAW_TD_NOTE: SubtopicNote = {
  subtopicName: "First Law and Energy Bookkeeping",
  title: "First Law and Energy Bookkeeping",
  oneLineDefinition:
    "The heat given to a gas goes into its internal energy and into the work it does, ΔQ = ΔU + W, with W counted positive when the gas expands.",
  whyItMatters:
    "Fifteen PYQs, all multiple choice, and four from 2026. Six test the law's statements: the sign of work, which quantities depend on the path, and which are intensive. Nine are energy balances: a liquid turning to vapour, water warming, heat and work given as rates, or a gas pushing a piston. Each needs only the first law and the work done against a steady pressure.",
  concepts: [
    // C1 — the law and its sign convention
    {
      kind: "formula" as const,
      slug: "jpthermo-first-law",
      name: "The first law and its sign convention",
      intuition:
        "Heat given to a gas does two jobs: it raises the internal energy and it lets the gas do work by expanding. The first law is this energy account, ΔQ = ΔU + W. These notes use the physics convention throughout: heat INTO the gas is positive, and W is the work done BY the gas, positive when it expands. Some books count the work done ON the gas instead; then the same law reads ΔQ = ΔU − W.",
      definition:
        "- \\(\\Delta Q = \\Delta U + W\\), with W the work done **by** the gas: positive when V increases, negative when V decreases.\n" +
        "- With \\(W'\\) the work done **on** the gas, \\(W' = -W\\) and the law reads \\(\\Delta Q = \\Delta U - W'\\).\n" +
        "- ΔU depends only on the start and end states (a **state function**). Heat and work depend on the path (**path functions**).\n" +
        "- Heat in need not raise the temperature: if the gas does more work than the heat it gets, ΔU < 0 and it cools.\n" +
        "- Positive work by the gas means its volume grew, since \\(W = \\int P\\,dV\\) and P > 0.\n" +
        "- The zeroth law gives the idea of temperature; the first law gives the idea of internal energy.\n" +
        "- **Extensive** quantities grow with the amount of gas (U, V, mass); **intensive** ones do not (P, T, density). Extensive ÷ extensive, such as energy per kilogram, is intensive; intensive × extensive is extensive.",
      formula: {
        label: "First law (work done by the gas positive)",
        latex: "\\Delta Q = \\Delta U + W \\qquad W = \\int_{V_1}^{V_2} P\\,dV",
      },
      authoredExample: {
        prompt:
          "A gas absorbs \\(300\\ \\text{J}\\) of heat while it expands and does \\(450\\ \\text{J}\\) of work. Find ΔU. Does its temperature rise or fall?",
        steps: [
          "Heat in: \\(\\Delta Q = +300\\ \\text{J}\\). Work by the gas: \\(W = +450\\ \\text{J}\\).",
          "\\(\\Delta U = \\Delta Q - W = 300 - 450 = -150\\ \\text{J}\\).",
          "The internal energy of an ideal gas falls only if its temperature falls, so the gas cools even though heat was added.",
        ],
        answer: "\\(\\Delta U = -150\\ \\text{J}\\); the temperature falls",
      },
      selfCheckExample: {
        prompt:
          "A gas is compressed: \\(200\\ \\text{J}\\) of work is done on it, and it gives out \\(80\\ \\text{J}\\) of heat. Taking W as the work done by the gas, find ΔU.",
        steps: [
          "Work done by the gas: \\(W = -200\\ \\text{J}\\). Heat into the gas: \\(\\Delta Q = -80\\ \\text{J}\\).",
          "\\(\\Delta U = \\Delta Q - W = -80 - (-200) = +120\\ \\text{J}\\).",
        ],
        answer: "\\(+120\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "Is the heat given to a gas a state function?", answer: "No: it depends on the path. Only ΔU is a state function" },
        { prompt: "A gas does \\(50\\ \\text{J}\\) of work and exchanges no heat. Find ΔU.", answer: "\\(-50\\ \\text{J}\\)" },
        { prompt: "Density is mass divided by volume. Is it intensive or extensive?", answer: "Intensive" },
        { prompt: "A gas gets \\(100\\ \\text{J}\\) of heat at constant volume. Find the work it does and ΔU.", answer: "W = 0 and \\(\\Delta U = 100\\ \\text{J}\\)" },
      ],
      pyqExampleId: "032dc7fb-967e-421e-b4e6-a9e714ef05d8", // 8 Apr 2023: heat added need not raise T; W > 0 means V grew
      traps: [
        {
          title: "Two sign conventions for work",
          body: "Physics counts the work done BY the gas as positive and writes ΔQ = ΔU + W. Chemistry counts the work done ON the gas and writes ΔQ = ΔU − W. Both describe the same energy; mixing them flips the sign of W.",
        },
        {
          title: "Heat added does not mean hotter",
          body: "If a gas does more work than the heat it receives, its internal energy falls and so does its temperature. Heat in only fixes ΔU = Q − W, not the sign of ΔT.",
        },
      ],
    },

    // C2 — numeric energy balances
    {
      kind: "formula" as const,
      slug: "jpthermo-energy-balance",
      name: "Energy balances: phase changes, rates and pistons",
      intuition:
        "Many questions give two of Q, ΔU and W and ask for the third. The work usually comes from a steady outside pressure: W = PΔV for boiling at atmospheric pressure, W = PAΔx for a piston of area A. In a phase change the heat is mL, and not all of it stays as internal energy, because the vapour pushes back the atmosphere. When the data are rates, the same law holds for each second.",
      definition:
        "- Phase change at constant pressure: \\(Q = mL\\), \\(W = P\\Delta V\\), \\(\\Delta U = mL - P\\Delta V\\).\n" +
        "- Boiling: the volume grows a lot, so W is large enough to matter. Melting ice: the volume falls, so W < 0, and the atmosphere does work **on** the ice–water system.\n" +
        "- A liquid or solid warmed: ΔV is tiny, so \\(\\Delta U = mc\\Delta T - P\\Delta V\\) is very close to \\(mc\\Delta T\\).\n" +
        "- Rate form: \\(\\dfrac{dQ}{dt} = \\dfrac{dU}{dt} + \\dfrac{dW}{dt}\\). Heat supplied per second minus work done per second is the rate at which U rises.\n" +
        "- Piston of area A moving out a distance Δx at pressure P: \\(W = PA\\,\\Delta x\\).\n" +
        "- If a stated fraction of the heat goes into work, the rest is ΔU.\n" +
        "- Units: \\(1\\ \\text{cm}^{3} = 10^{-6}\\ \\text{m}^{3}\\), \\(1\\ \\text{L} = 10^{-3}\\ \\text{m}^{3}\\), and Pa × m³ = J.",
      formula: {
        label: "Energy balance at a steady pressure",
        latex: "\\Delta U = Q - P\\Delta V \\qquad \\frac{dU}{dt} = \\frac{dQ}{dt} - \\frac{dW}{dt}",
      },
      authoredExample: {
        prompt:
          "10 g of a liquid boils at a steady pressure of \\(2 \\times 10^{5}\\ \\text{Pa}\\), and its volume grows by \\(5000\\ \\text{cm}^{3}\\). Its latent heat of vaporisation is \\(1.2 \\times 10^{6}\\ \\text{J/kg}\\). Find the heat taken, the work done by the vapour and ΔU.",
        steps: [
          "\\(Q = mL = 0.010 \\times 1.2 \\times 10^{6} = 12\\,000\\ \\text{J}\\).",
          "\\(\\Delta V = 5000 \\times 10^{-6} = 5 \\times 10^{-3}\\ \\text{m}^{3}\\), so \\(W = P\\Delta V = 2 \\times 10^{5} \\times 5 \\times 10^{-3} = 1000\\ \\text{J}\\).",
          "\\(\\Delta U = Q - W = 12\\,000 - 1000 = 11\\,000\\ \\text{J}\\).",
        ],
        answer: "\\(Q = 12\\ \\text{kJ}\\), \\(W = 1\\ \\text{kJ}\\), \\(\\Delta U = 11\\ \\text{kJ}\\)",
      },
      selfCheckExample: {
        prompt:
          "A heater supplies \\(500\\ \\text{W}\\) to a gas, and the gas does work at \\(150\\ \\text{W}\\). How long does its internal energy take to rise by \\(7000\\ \\text{J}\\)?",
        steps: [
          "\\(\\dfrac{dU}{dt} = 500 - 150 = 350\\ \\text{W}\\).",
          "\\(t = \\dfrac{7000}{350} = 20\\ \\text{s}\\).",
        ],
        answer: "20 s",
      },
      practiceSet: [
        { prompt: "A piston of area \\(50\\ \\text{cm}^{2}\\) moves out 4 cm against \\(10^{5}\\ \\text{Pa}\\). Work done by the gas?", answer: "20 J" },
        { prompt: "A gas gets 60 J of heat each second and does 45 J of work each second. How fast does its internal energy rise?", answer: "15 W" },
        { prompt: "Ice melts at atmospheric pressure. Is the work done by the ice–water system positive or negative?", answer: "Negative: its volume falls" },
        { prompt: "A gas receives 200 J of heat and 30% of it goes into work. Find ΔU.", answer: "140 J" },
      ],
      pyqExampleId: "445cfc7c-4207-49f2-8eaf-245b42556fa9", // 11 Apr 2023: 1 kg water boiled at 1 atm, ΔU = mL − PΔV
      traps: [
        {
          title: "Subtract the work against the atmosphere",
          body: "When a liquid boils, ΔU is the latent heat minus PΔV, not the latent heat itself. The PΔV term is often what separates two of the options.",
        },
        {
          title: "Convert volumes before multiplying",
          body: "cm³ to m³ is a factor 10⁻⁶ and litres to m³ is 10⁻³. Pressure in Pa times volume in m³ gives joules; so does kPa times litres. Any other pair needs converting first.",
        },
      ],
    },
  ],
};
