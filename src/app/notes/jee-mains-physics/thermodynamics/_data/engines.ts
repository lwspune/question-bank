import type { SubtopicNote } from "@/app/notes/_types";

export const ENGINES_TD_NOTE: SubtopicNote = {
  subtopicName: "Heat Engines, Carnot Cycle and Refrigerators",
  title: "Heat Engines, Carnot Cycle and Refrigerators",
  oneLineDefinition:
    "A heat engine turns part of the heat it takes from a hot reservoir into work and rejects the rest; no engine between two temperatures beats the Carnot efficiency 1 − T₂/T₁, and a refrigerator runs the cycle backwards.",
  whyItMatters:
    "Twenty-three PYQs, five of them numerical, and none yet from 2026. Ten use the Carnot efficiency, and six of those change one reservoir temperature and write the efficiency twice. Eight move between heat, work and temperature: four find a heat or the work, three find a reservoir temperature from the heats, and one is a refrigerator. Five go beyond one engine: three put engines in series and two ask about entropy.",
  concepts: [
    // C1 — Carnot efficiency
    {
      kind: "formula" as const,
      slug: "jpthermo-carnot-efficiency",
      name: "Carnot efficiency η = 1 − T₂/T₁",
      intuition:
        "A heat engine takes heat from a hot reservoir, turns part of it into work and rejects the rest to a cold one. No engine working between two temperatures can beat a reversible (Carnot) engine, whose efficiency depends only on the two temperatures in kelvin. Most questions change one temperature and give the efficiency before and after: write the formula twice and solve.",
      definition:
        "- \\(\\eta = 1 - \\dfrac{T_2}{T_1}\\), with \\(T_1\\) the source and \\(T_2\\) the sink, **both in kelvin**.\n" +
        "- Any real engine between the same two temperatures has a lower efficiency than the Carnot engine.\n" +
        "- A hotter source or a colder sink raises η. A temperature **change** has the same size in °C and in K.\n" +
        "- Two conditions: write \\(T_2 = (1 - \\eta)T_1\\) for each and compare.\n" +
        "- \"Efficiency increases by 100%\" means it doubles. \"Increases by 30%\" is usually read as 1.3 times the old value; check that your reading gives an option.\n" +
        "- η = 1 would need a sink at 0 K, which cannot be reached.",
      formula: {
        label: "Carnot efficiency",
        latex: "\\eta = \\frac{W}{Q_1} = 1 - \\frac{T_2}{T_1}",
      },
      authoredExample: {
        prompt:
          "A Carnot engine has an efficiency of 40% with its sink at 87 °C. By how much must the source temperature rise to make the efficiency 50%?",
        steps: [
          "Sink: \\(T_2 = 87 + 273 = 360\\ \\text{K}\\).",
          "Now: \\(T_1 = \\dfrac{T_2}{1 - \\eta} = \\dfrac{360}{0.6} = 600\\ \\text{K}\\).",
          "Wanted: \\(T_1' = \\dfrac{360}{0.5} = 720\\ \\text{K}\\).",
          "Rise \\(= 720 - 600 = 120\\ \\text{K}\\), which is also 120 °C.",
        ],
        answer: "120 K",
      },
      selfCheckExample: {
        prompt:
          "A Carnot engine with its source at 500 K has an efficiency of 20%. By how much must the sink be cooled to raise the efficiency to 30%?",
        steps: [
          "Now: \\(T_2 = (1 - 0.2) \\times 500 = 400\\ \\text{K}\\).",
          "Wanted: \\(T_2' = (1 - 0.3) \\times 500 = 350\\ \\text{K}\\). Cool it by 50 K.",
        ],
        answer: "50 K",
      },
      practiceSet: [
        { prompt: "Efficiency of a Carnot engine between 227 °C and 27 °C?", answer: "40%" },
        { prompt: "A Carnot engine with its sink at 300 K has an efficiency of 60%. Source temperature?", answer: "750 K" },
        { prompt: "Can an engine working between 400 K and 300 K have an efficiency of 30%?", answer: "No: the Carnot limit is 25%" },
        { prompt: "Ratio of the efficiencies of Carnot engines working between 600 K and 300 K, and between 900 K and 300 K?", answer: "3/4" },
      ],
      pyqExampleId: "bba9e2eb-f1fc-4be4-a1da-c4d4d3b473e9", // 1 Feb 2023: η 1/3 → 1/6 as the sink is raised by x, hot reservoir 99 °C
      traps: [
        {
          title: "Kelvin, not Celsius",
          body: "For an engine between 327 °C and 27 °C, η = 1 − 300/600, not 1 − 27/327. Only temperature differences may stay in °C.",
        },
        {
          title: "Per cent or percentage points?",
          body: "\"Efficiency increases by 30%\" from 50% could mean 65% or 80%. Try the relative reading, 1.3 times, first, and check it against the options.",
        },
      ],
    },

    // C2 — heats, work and temperatures; refrigerator
    {
      kind: "formula" as const,
      slug: "jpthermo-engine-heat",
      name: "Heat, work and temperature in engines and refrigerators",
      intuition:
        "Energy is conserved round an engine: heat in = work out + heat rejected. For a Carnot engine the heats are also in the ratio of the temperatures, Q₂/Q₁ = T₂/T₁. With these two equations, any two of Q₁, Q₂, W, T₁ and T₂ give the rest. A refrigerator runs the cycle backwards: work put in carries heat out of the cold side.",
      definition:
        "- \\(Q_1 = W + Q_2\\) and \\(\\eta = \\dfrac{W}{Q_1} = 1 - \\dfrac{Q_2}{Q_1}\\).\n" +
        "- Carnot engine: \\(\\dfrac{Q_2}{Q_1} = \\dfrac{T_2}{T_1}\\), so \\(Q_1 = \\dfrac{W}{\\eta}\\).\n" +
        "- A real engine that takes \\(Q_1\\) and rejects \\(Q_2\\) cannot beat Carnot, so the **minimum** source temperature is \\(T_1 = T_2\\dfrac{Q_1}{Q_2}\\).\n" +
        "- Refrigerator: \\(\\text{COP} = \\dfrac{Q_2}{W} = \\dfrac{T_2}{T_1 - T_2}\\) for a Carnot refrigerator. Heat removed each second = COP × power.\n" +
        "- \\(1\\ \\text{kcal} \\approx 4.2 \\times 10^{3}\\ \\text{J}\\).",
      formula: {
        label: "Engine and refrigerator",
        latex: "Q_1 = W + Q_2 \\qquad \\frac{Q_2}{Q_1} = \\frac{T_2}{T_1} \\qquad \\text{COP} = \\frac{Q_2}{W} = \\frac{T_2}{T_1 - T_2}",
      },
      authoredExample: {
        prompt:
          "A Carnot engine works between 600 K and 450 K and rejects 1500 J of heat each cycle. Find the heat it takes in and the work it does each cycle.",
        steps: [
          "\\(Q_1 = Q_2\\dfrac{T_1}{T_2} = 1500 \\times \\dfrac{600}{450} = 2000\\ \\text{J}\\).",
          "\\(W = Q_1 - Q_2 = 2000 - 1500 = 500\\ \\text{J}\\).",
          "Check: \\(\\eta = 1 - \\dfrac{450}{600} = 0.25 = \\dfrac{500}{2000}\\).",
        ],
        answer: "2000 J taken in; 500 J of work",
      },
      selfCheckExample: {
        prompt:
          "A Carnot refrigerator keeps its inside at −23 °C in a room at 27 °C and draws 100 W. How much heat does it remove from the inside each second?",
        steps: [
          "\\(T_2 = 250\\ \\text{K}\\), \\(T_1 = 300\\ \\text{K}\\), so \\(\\text{COP} = \\dfrac{250}{300 - 250} = 5\\).",
          "Heat removed each second \\(= 5 \\times 100 = 500\\ \\text{J}\\).",
        ],
        answer: "500 J each second",
      },
      practiceSet: [
        { prompt: "An engine takes 400 J and rejects 300 J to a sink at 300 K. Minimum source temperature?", answer: "400 K" },
        { prompt: "A Carnot engine of efficiency 0.4 does 800 J of work. Heat taken in?", answer: "2000 J" },
        { prompt: "A Carnot engine with its source at 500 K takes in 1000 J and rejects 700 J. Sink temperature?", answer: "350 K" },
        { prompt: "Express 5 kcal in joules.", answer: "about \\(2.1 \\times 10^{4}\\ \\text{J}\\)" },
      ],
      pyqExampleId: "90ab4d82-3958-4aba-8d54-2e6e47ec43b2", // 8 Apr 2023: 2 kJ of work between 127 °C and 27 °C, heat from the source
      traps: [
        {
          title: "Efficiency divides by the heat taken in",
          body: "η = W/Q₁, with Q₁ the heat from the hot reservoir. Dividing the work by the rejected heat Q₂ gives a number that is too large.",
        },
        {
          title: "COP is not an efficiency",
          body: "A refrigerator's COP = Q₂/W = T₂/(T₁ − T₂) is usually larger than 1. The engine formula (T₁ − T₂)/T₁ is the wrong one for a refrigerator.",
        },
      ],
    },

    // C3 — engines in series and entropy
    {
      kind: "formula" as const,
      slug: "jpthermo-second-law",
      name: "Engines in series and entropy",
      intuition:
        "Two Carnot engines in series, the second taking all the heat the first rejects, act as one engine between the outer two temperatures. So the pair's efficiency is 1 − T₃/T₁, which is less than the sum of the two efficiencies. Entropy measures heat divided by the temperature at which it flows: reversible heating adds up dQ/T step by step, and an irreversible change makes the total entropy rise.",
      definition:
        "- Carnot engines in series between \\(T_1 \\to T_2 \\to T_3\\): \\(\\eta = 1 - \\dfrac{T_3}{T_1} = \\eta_1 + \\eta_2 - \\eta_1\\eta_2\\), so \\(\\eta < \\eta_1 + \\eta_2\\).\n" +
        "- If the two engines do equal work, the middle temperature is \\(T_2 = \\dfrac{T_1 + T_3}{2}\\).\n" +
        "- Entropy: \\(\\Delta S = \\int \\dfrac{dQ}{T}\\). At a fixed temperature \\(\\Delta S = \\dfrac{Q}{T}\\). Heating a mass m of specific heat s: \\(\\Delta S = ms\\ln\\dfrac{T_2}{T_1}\\), with m in kg when s is per kg.\n" +
        "- Entropy is extensive: for two parts already in equilibrium, \\(S = S_1 + S_2\\). Any irreversible process raises the total entropy.\n" +
        "- Second law (Kelvin): no engine turns all the heat it takes in into work.",
      formula: {
        label: "Engines in series and entropy",
        latex: "\\eta = \\eta_1 + \\eta_2 - \\eta_1\\eta_2 = 1 - \\frac{T_3}{T_1} \\qquad \\Delta S = ms\\ln\\frac{T_2}{T_1}",
      },
      authoredExample: {
        prompt:
          "Two Carnot engines run in series between 800 K, 400 K and 200 K, the second taking all the heat the first rejects. Find each efficiency and the efficiency of the pair.",
        steps: [
          "\\(\\eta_1 = 1 - \\dfrac{400}{800} = 0.5\\) and \\(\\eta_2 = 1 - \\dfrac{200}{400} = 0.5\\).",
          "The pair: \\(\\eta = 1 - \\dfrac{200}{800} = 0.75\\).",
          "Check: \\(\\eta_1 + \\eta_2 - \\eta_1\\eta_2 = 0.5 + 0.5 - 0.25 = 0.75\\), less than \\(\\eta_1 + \\eta_2 = 1\\).",
        ],
        answer: "0.5 and 0.5; 0.75 for the pair",
      },
      selfCheckExample: {
        prompt:
          "2 kg of water is heated slowly from 300 K to 360 K. Its specific heat is \\(4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\). Find its change in entropy. (ln 1.2 = 0.182)",
        steps: [
          "\\(\\Delta S = ms\\ln\\dfrac{T_2}{T_1} = 2 \\times 4200 \\times \\ln\\dfrac{360}{300}\\).",
          "\\(= 8400 \\times 0.182 \\approx 1530\\ \\text{J/K}\\).",
        ],
        answer: "about \\(1.53 \\times 10^{3}\\ \\text{J/K}\\)",
      },
      practiceSet: [
        { prompt: "1000 J of heat flows into a large reservoir at 250 K. Its change in entropy?", answer: "4 J/K" },
        { prompt: "Carnot engines in series between 600 K, 400 K and 300 K. Efficiency of the pair?", answer: "0.5" },
        { prompt: "Two Carnot engines in series do equal work between 500 K and 300 K. Middle temperature?", answer: "400 K" },
        { prompt: "A hot body cools in a cold room. Does the total entropy rise, fall or stay the same?", answer: "It rises" },
      ],
      pyqExampleId: "d769cdb7-edfd-45b1-88d8-3c86a3466407", // 28 Jan 2025: one engine 473 → 273 K against two staged engines
      traps: [
        {
          title: "Efficiencies in series do not add",
          body: "Two engines in series have η = η₁ + η₂ − η₁η₂, less than η₁ + η₂. The pair does no better than one Carnot engine across the whole range.",
        },
        {
          title: "Mass units in ΔS",
          body: "With s in J kg⁻¹ K⁻¹, the mass must be in kg. A mass given in grams brings a factor of 10⁻³.",
        },
      ],
    },
  ],
};
