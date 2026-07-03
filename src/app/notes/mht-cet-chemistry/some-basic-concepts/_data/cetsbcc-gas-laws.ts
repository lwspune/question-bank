import type { SubtopicNote } from "@/app/notes/_types";

export const GAS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Gas Laws and Ideal Gas Equation",
  title: "Gas Laws and the Ideal Gas Equation",
  oneLineDefinition:
    "Four simple gas laws (Boyle, Charles, Gay-Lussac, combined) each fix one variable and relate the rest; the ideal gas equation PV = nRT ties pressure, volume, moles and temperature together in a single formula.",
  whyItMatters:
    "This subtopic is a reliable scoring block in MHT-CET Chemistry — most of its PYQs are direct one-step plug-ins (compress a gas, cool a balloon, find the temperature from PV = nRT). The recurring traps are always the same: temperature must be in kelvin, R's units must match the pressure's units, and for equal masses the lightest gas exerts the highest pressure. " +
    "Learn the four proportionalities plus PV = nRT cold and you can attempt every question here on sight.",
  concepts: [
    // Boyle's law — P1V1 = P2V2
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-boyle",
      name: "Boyle's law — pressure and volume",
      intuition:
        "Squeeze a gas into half the space and it pushes back with twice the pressure. At constant temperature, pressure and volume trade off inversely — one goes up exactly as much as the other goes down. " +
        "Their product P times V stays constant, so a P-versus-V graph is a hyperbola.",
      definition:
        "Boyle's law (constant temperature, fixed mass):\n" +
        "- Pressure is **inversely proportional** to volume: \\(P \\propto \\dfrac{1}{V}\\).\n" +
        "- Equivalently \\(PV = \\text{constant}\\), so \\(P_1 V_1 = P_2 V_2\\).\n" +
        "- The **P vs V** plot is a rectangular hyperbola; a plot of \\(PV\\) vs \\(P\\) is a horizontal straight line.\n" +
        "- Units of P and V may be anything as long as they are the **same on both sides** (atm with atm, mL with mL) — no unit conversion needed.",
      formula: {
        label: "Boyle's law",
        latex: "P_1 V_1 = P_2 V_2 \\qquad (T,\\, n \\text{ constant})",
        symbols: [
          { symbol: "P_1, V_1", meaning: "initial pressure and volume" },
          { symbol: "P_2, V_2", meaning: "final pressure and volume" },
        ],
      },
      pyqExampleId: "11e26608-9463-4cf4-add2-88f39ad4066c", // N2 compressed 9->3 L at 2 atm -> 6 atm
      authoredExample: {
        prompt:
          "A gas occupies 500 mL at 1 atm. It is compressed to 200 mL at the same temperature. What is the new pressure?",
        steps: [
          "Temperature is constant, so use Boyle's law \\(P_1 V_1 = P_2 V_2\\).",
          "\\(P_2 = \\dfrac{P_1 V_1}{V_2} = \\dfrac{1 \\times 500}{200}\\).",
        ],
        answer: "\\(P_2 = 2.5\\) atm.",
      },
      selfCheckExample: {
        prompt:
          "A gas occupies 11.2 dm3 at 105 kPa. What volume does it occupy if the pressure is increased to 210 kPa at constant temperature?",
        steps: [
          "Boyle's law: \\(P_1 V_1 = P_2 V_2\\).",
          "\\(V_2 = \\dfrac{P_1 V_1}{P_2} = \\dfrac{105 \\times 11.2}{210}\\).",
        ],
        answer: "\\(V_2 = 5.6\\ \\text{dm}^3\\) (doubling the pressure halves the volume).",
      },
      practiceSet: [
        { prompt: "Volume of a gas at 1 atm is 25 mL. Volume at 1.25 atm (same T)?", answer: "20 mL", method: "V2 = P1V1/P2 = 25/1.25" },
        { prompt: "Gas at 2 atm occupies 6 L. Pressure if squeezed to 3 L?", answer: "4 atm" },
        { prompt: "What shape is the P vs V graph for Boyle's law?", answer: "A hyperbola", method: "PV = constant" },
        { prompt: "1 dm3 of gas at NTP (1.013 x 10^5 Pa). Volume at 1.032 x 10^5 Pa?", answer: "\\(\\approx 0.982\\ \\text{dm}^3\\)", method: "V2 = P1V1/P2" },
      ],
      traps: [
        {
          title: "No unit conversion inside Boyle's law",
          body:
            "Because P and V appear on both sides, they only need to be **consistent**, not SI. Keep atm with atm and mL with mL — converting to Pa or m3 wastes time and invites arithmetic slips.",
        },
        {
          title: "Boyle's law is P vs V — not PV vs P",
          body:
            "In a 'which graph explains Boyle's law?' question, the answer is the **P-vs-V hyperbola**. A straight horizontal line is the \\(PV\\)-vs-\\(P\\) plot (also a consequence, but not the direct Boyle graph the bank usually wants).",
        },
      ],
    },

    // Charles' law — V/T
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-charles",
      name: "Charles' law — volume and temperature",
      intuition:
        "Heat a gas at constant pressure and it expands; cool it and it shrinks. Volume rises in lock-step with the ABSOLUTE (kelvin) temperature — double the kelvin temperature and you double the volume. " +
        "This is why a hot-air balloon rises: warmed air takes up more volume, so it is less dense.",
      definition:
        "Charles' law (constant pressure, fixed mass):\n" +
        "- Volume is **directly proportional** to absolute temperature: \\(V \\propto T\\).\n" +
        "- Equivalently \\(\\dfrac{V}{T} = \\text{constant}\\), so \\(\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}\\).\n" +
        "- **T must be in kelvin**: \\(T(\\text{K}) = t(^{\\circ}\\text{C}) + 273\\).\n" +
        "- Extrapolating V to zero gives \\(-273.15\\,^{\\circ}\\text{C}\\) = **absolute zero** (0 K), the lowest possible temperature.",
      formula: {
        label: "Charles' law",
        latex: "\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2} \\qquad (P,\\, n \\text{ constant})",
        symbols: [
          { symbol: "V_1, V_2", meaning: "initial and final volume" },
          { symbol: "T_1, T_2", meaning: "initial and final absolute temperature (K)" },
        ],
      },
      pyqExampleId: "58743130-d9a8-425d-a2e4-1b815b6d845a", // 273 K -> 373 K, 10 L -> 13.66 L
      authoredExample: {
        prompt:
          "A hot-air balloon holds 2000 dm3 of air at 99 degrees C. What volume does the air occupy when it cools to 80 degrees C at constant pressure?",
        steps: [
          "Convert to kelvin: \\(T_1 = 99 + 273 = 372\\ \\text{K}\\), \\(T_2 = 80 + 273 = 353\\ \\text{K}\\).",
          "Charles' law: \\(V_2 = \\dfrac{V_1 T_2}{T_1} = \\dfrac{2000 \\times 353}{372}\\).",
        ],
        answer: "\\(V_2 \\approx 1897.8\\ \\text{dm}^3\\) (cooling shrinks the gas).",
      },
      selfCheckExample: {
        prompt:
          "At 0 degrees C a gas occupies 22.4 L. To what temperature (in kelvin) must it be heated at constant pressure to occupy 224 L?",
        steps: [
          "Convert: \\(T_1 = 0 + 273 = 273\\ \\text{K}\\).",
          "Charles' law: \\(T_2 = T_1 \\times \\dfrac{V_2}{V_1} = 273 \\times \\dfrac{224}{22.4}\\).",
        ],
        answer: "\\(T_2 = 2730\\ \\text{K}\\) (ten times the volume needs ten times the kelvin temperature).",
      },
      practiceSet: [
        { prompt: "Gas heated 273 K to 373 K at 1 atm, initial volume 10 L. Final volume?", answer: "\\(\\approx 13.66\\ \\text{L}\\)", method: "V2 = 10 x 373/273" },
        { prompt: "Absolute zero in degrees Celsius?", answer: "\\(-273.15\\,^{\\circ}\\text{C}\\)" },
        { prompt: "Double the kelvin temperature of a gas at constant P. What happens to its volume?", answer: "It doubles" },
        { prompt: "Convert 27 degrees C to kelvin.", answer: "300 K", method: "27 + 273" },
      ],
      traps: [
        {
          title: "Kelvin, always — never Celsius in the ratio",
          body:
            "\\(V/T\\) is constant only for the **absolute** temperature. Plugging in \\(99\\) and \\(80\\) (degrees C) instead of \\(372\\) and \\(353\\) K gives a badly wrong answer. Convert first: \\(T(\\text{K}) = t(^{\\circ}\\text{C}) + 273\\).",
        },
        {
          title: "Absolute zero is negative",
          body:
            "\\(0\\ \\text{K} = -273.15\\,^{\\circ}\\text{C}\\), not \\(+273.15\\). All molecular motion ceases here, and it is the temperature at which a gas's extrapolated volume would reach zero.",
        },
      ],
    },

    // Gay-Lussac's / pressure law
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-gay-lussac",
      name: "Gay-Lussac's law — pressure and temperature",
      intuition:
        "Seal a gas in a rigid container (fixed volume) and heat it: the molecules hit the walls harder and more often, so the pressure climbs. At constant volume, pressure rises directly with the absolute temperature. " +
        "This is why an aerosol can warns against heating — trapped gas pressure grows with temperature.",
      definition:
        "Gay-Lussac's (pressure) law (constant volume, fixed mass):\n" +
        "- Pressure is **directly proportional** to absolute temperature: \\(P \\propto T\\).\n" +
        "- Equivalently \\(\\dfrac{P}{T} = \\text{constant}\\), so \\(\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}\\).\n" +
        "- **T must be in kelvin**, exactly as in Charles' law.\n" +
        "- Do not confuse the three simple laws: Boyle fixes T (\\(PV=\\)const), Charles fixes P (\\(V/T=\\)const), Gay-Lussac fixes V (\\(P/T=\\)const).",
      formula: {
        label: "Gay-Lussac's law",
        latex: "\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2} \\qquad (V,\\, n \\text{ constant})",
        symbols: [
          { symbol: "P_1, P_2", meaning: "initial and final pressure" },
          { symbol: "T_1, T_2", meaning: "initial and final absolute temperature (K)" },
        ],
      },
      pyqExampleId: "d21a5fa1-25b0-457f-8a19-8c293735af9c", // Gay-Lussac's law statement (P/T = const)
      authoredExample: {
        prompt:
          "A rigid gas cylinder reads 2 atm at 300 K. What is the pressure when it is heated to 450 K (volume unchanged)?",
        steps: [
          "Volume is fixed, so use Gay-Lussac's law \\(\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}\\).",
          "\\(P_2 = \\dfrac{P_1 T_2}{T_1} = \\dfrac{2 \\times 450}{300}\\).",
        ],
        answer: "\\(P_2 = 3\\) atm.",
      },
      selfCheckExample: {
        prompt:
          "State the mathematical form of Gay-Lussac's law and name the quantity held constant.",
        steps: [
          "Gay-Lussac's law fixes **volume** and mass.",
          "It states \\(P \\propto T\\), i.e. \\(\\dfrac{P}{T} = \\text{constant}\\).",
        ],
        answer: "\\(\\dfrac{P}{T} = \\text{constant}\\) at constant volume and fixed mass of gas.",
      },
      practiceSet: [
        { prompt: "Which quantity is held constant in Gay-Lussac's law?", answer: "Volume (and mass)" },
        { prompt: "Gas at 1 atm and 250 K. Pressure at 500 K (fixed volume)?", answer: "2 atm", method: "P/T constant" },
        { prompt: "Write Gay-Lussac's law as a ratio equation.", answer: "\\(\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}\\)" },
      ],
      traps: [
        {
          title: "Do not mix up the three simple laws",
          body:
            "\\(V/T = \\text{const}\\) is **Charles'** law, and \\(PV = \\text{const}\\) is **Boyle's** law. Gay-Lussac's law is \\(P/T = \\text{const}\\) at constant volume — the odd one out that fixes V, not T or P.",
        },
        {
          title: "Absolute temperature here too",
          body:
            "\\(P/T\\) is constant only with T in **kelvin**. Convert any Celsius temperature before forming the ratio.",
        },
      ],
    },

    // Combined gas law
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-combined",
      name: "Combined gas law",
      intuition:
        "When pressure, volume AND temperature all change at once, no single simple law works. Merge Boyle and Charles into one relation: the quantity PV/T stays constant for a fixed mass of gas. " +
        "It reduces to any one simple law when you hold the third variable fixed.",
      definition:
        "Combined gas law (fixed mass):\n" +
        "- \\(\\dfrac{PV}{T} = \\text{constant}\\), so \\(\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}\\).\n" +
        "- Set \\(T_1 = T_2\\) and it collapses to **Boyle's** law; set \\(P_1 = P_2\\) and it becomes **Charles'** law; set \\(V_1 = V_2\\) and it becomes **Gay-Lussac's** law.\n" +
        "- **T must be in kelvin.** P and V just need to be consistent on both sides.",
      formula: {
        label: "Combined gas law",
        latex: "\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}",
        symbols: [
          { symbol: "P_1, V_1, T_1", meaning: "initial pressure, volume, absolute temperature" },
          { symbol: "P_2, V_2, T_2", meaning: "final pressure, volume, absolute temperature" },
        ],
      },
      pyqExampleId: "299a1bc5-4c73-43a8-954e-5f696edc60af", // which equation combines Boyle + Charles
      authoredExample: {
        prompt:
          "A gas occupies 2 L at 300 K and 1 atm. What volume does it occupy at 600 K and 2 atm?",
        steps: [
          "All three change, so use \\(\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}\\).",
          "\\(V_2 = \\dfrac{P_1 V_1 T_2}{T_1 P_2} = \\dfrac{1 \\times 2 \\times 600}{300 \\times 2}\\).",
        ],
        answer: "\\(V_2 = 2\\) L (the doubled temperature and doubled pressure cancel out).",
      },
      selfCheckExample: {
        prompt:
          "Which single equation expresses the combined relationship of Boyle's and Charles' laws?",
        steps: [
          "Boyle: \\(PV = \\text{const}\\) at fixed T. Charles: \\(V/T = \\text{const}\\) at fixed P.",
          "Merging both: \\(\\dfrac{PV}{T} = \\text{const}\\).",
        ],
        answer: "\\(\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}\\).",
      },
      practiceSet: [
        { prompt: "Combined gas law reduces to which law when temperature is constant?", answer: "Boyle's law" },
        { prompt: "It reduces to which law when pressure is constant?", answer: "Charles' law" },
        { prompt: "Gas: 1 atm, 1 L, 273 K. Volume at 2 atm and 546 K?", answer: "1 L", method: "(1x1/273) = (2xV2/546)" },
      ],
      traps: [
        {
          title: "T on the DENOMINATOR, in kelvin",
          body:
            "The temperature sits under PV: \\(PV/T\\). A common slip is writing \\(PVT = \\text{const}\\) or leaving T in Celsius. Keep the form \\(\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}\\) with kelvin temperatures.",
        },
      ],
    },

    // Ideal gas equation PV = nRT
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-ideal-equation",
      name: "Ideal gas equation, PV = nRT",
      intuition:
        "The ideal gas equation is the master formula: it bundles all the simple laws and adds the amount of gas (moles) explicitly. Given any three of P, V, n, T you can find the fourth — as long as R's units match the pressure's units. " +
        "You can also swap n for mass/molar mass, which lets you weigh a gas.",
      definition:
        "The ideal gas equation:\n" +
        "- \\(PV = nRT\\), and since \\(n = \\dfrac{m}{M}\\): \\(PV = \\dfrac{m}{M}RT\\), which rearranges to \\(PM = \\rho RT\\) (\\(\\rho\\) = density).\n" +
        "- **The value of R decides the units:**\n" +
        "- \\(R = 8.314\\ \\text{J K}^{-1}\\text{mol}^{-1}\\) — use with **SI units**: P in Pa (N m\\(^{-2}\\)), V in m\\(^3\\).\n" +
        "- \\(R = 0.0821\\ \\text{L atm K}^{-1}\\text{mol}^{-1}\\) — use with **P in atm, V in litres**.\n" +
        "- **T is always in kelvin.** STP/NTP means \\(0\\,^{\\circ}\\text{C}\\) (273 K) or \\(25\\,^{\\circ}\\text{C}\\) (298 K) and 1 atm; convert \\(\\text{dm}^3 \\to \\text{m}^3\\) by \\(\\div 10^3\\) when using the SI R.",
      formula: {
        label: "Ideal gas equation",
        latex: "PV = nRT = \\dfrac{m}{M}RT",
        symbols: [
          { symbol: "P", meaning: "pressure (Pa with R = 8.314; atm with R = 0.0821)" },
          { symbol: "V", meaning: "volume (m^3 with R = 8.314; L with R = 0.0821)" },
          { symbol: "n", meaning: "number of moles, = m/M" },
          { symbol: "R", meaning: "gas constant (8.314 J K^-1 mol^-1 or 0.0821 L atm K^-1 mol^-1)" },
          { symbol: "T", meaning: "absolute temperature (K)" },
        ],
      },
      pyqExampleId: "638df7b6-3684-42b8-b1c9-6ca8a1f45b31", // n = PV/RT in SI units -> 1 mole
      authoredExample: {
        prompt:
          "What volume is occupied by 3.2 g of oxygen gas at 2 atm and 273 K? (O2 = 32 g/mol, R = 0.0821 L atm K^-1 mol^-1)",
        steps: [
          "Moles \\(n = \\dfrac{m}{M} = \\dfrac{3.2}{32} = 0.1\\) mol.",
          "P is in atm and the answer is wanted in litres, so use \\(R = 0.0821\\) and \\(V = \\dfrac{nRT}{P}\\).",
          "\\(V = \\dfrac{0.1 \\times 0.0821 \\times 273}{2} = \\dfrac{2.241}{2} = 1.12\\ \\text{L}\\).",
        ],
        answer: "\\(1.12\\) litres.",
      },
      selfCheckExample: {
        prompt:
          "Find the temperature (in degrees C) of 2 mol of an ideal gas that occupies 20 dm3 at 4.926 atm. (R = 0.0821 dm3 atm K^-1 mol^-1)",
        steps: [
          "P is in atm and V in dm3 (= L), so use \\(R = 0.0821\\) and \\(T = \\dfrac{PV}{nR}\\).",
          "\\(T = \\dfrac{4.926 \\times 20}{2 \\times 0.0821} = \\dfrac{98.52}{0.1642} = 600\\ \\text{K}\\).",
          "Convert to Celsius: \\(600 - 273 = 327\\,^{\\circ}\\text{C}\\).",
        ],
        answer: "\\(327\\,^{\\circ}\\text{C}\\).",
      },
      practiceSet: [
        { prompt: "Value of R in L atm K^-1 mol^-1?", answer: "\\(0.0821\\)" },
        { prompt: "Value of R in SI units (J K^-1 mol^-1)?", answer: "\\(8.314\\)" },
        { prompt: "Rearrange PV = nRT to make P the subject.", answer: "\\(P = \\dfrac{nRT}{V}\\)" },
        { prompt: "Convert 68 mL to m^3 for use with the SI value of R.", answer: "\\(68 \\times 10^{-6}\\ \\text{m}^3\\)", method: "1 mL = 10^-6 m^3" },
      ],
      traps: [
        {
          title: "Match R's units to the pressure and volume",
          body:
            "Using \\(R = 0.0821\\) with pressure in Pa, or \\(R = 8.314\\) with volume in litres, gives an answer off by orders of magnitude. Decide the R value FIRST from the units given, then convert everything to match (litres <-> m\\(^3\\), atm <-> Pa).",
        },
        {
          title: "Watch a printed exponent typo",
          body:
            "For \\(3.4\\) mol in \\(68\\ \\text{mL} = 68 \\times 10^{-6}\\ \\text{m}^3\\) at 300 K, \\(P = \\dfrac{nRT}{V} = \\dfrac{3.4 \\times 8.314 \\times 300}{68 \\times 10^{-6}} = 1.247 \\times 10^{8}\\ \\text{Pa} = 1.247 \\times 10^{5}\\ \\text{kPa}\\). Some printed papers mis-type this as \\(1.247 \\times 10^{2}\\) kPa — trust your derivation; the mantissa 1.247 is what matches.",
        },
      ],
    },

    // Same mass -> P proportional to 1/M
    {
      kind: "formula" as const,
      slug: "cetsbcc-gas-pressure-molar-mass",
      name: "Equal masses in equal volumes — lightest gas, highest pressure",
      intuition:
        "Take the same mass of several gases in identical containers at the same temperature. The lighter the gas, the more molecules that mass contains, so more molecules hammer the walls — higher pressure. " +
        "Pressure ends up inversely proportional to molar mass, so hydrogen always wins.",
      definition:
        "Same mass, same V and T:\n" +
        "- From \\(PV = nRT\\) with V and T fixed: \\(P \\propto n\\).\n" +
        "- With equal mass, \\(n = \\dfrac{m}{M} \\propto \\dfrac{1}{M}\\), hence \\(P \\propto \\dfrac{1}{M}\\).\n" +
        "- The gas with the **lowest molar mass** has the most moles and exerts the **highest pressure**.\n" +
        "- Related quantity: **vapour density** \\(= \\dfrac{M}{2}\\) (molar mass relative to \\(\\text{H}_2\\)), so a lighter gas also has a smaller vapour density.",
      formula: {
        label: "Pressure vs molar mass (equal mass, V, T)",
        latex: "P \\propto \\dfrac{1}{M} \\qquad \\left(n = \\dfrac{m}{M}\\right)",
        symbols: [
          { symbol: "P", meaning: "pressure exerted by the gas" },
          { symbol: "M", meaning: "molar mass of the gas" },
          { symbol: "m", meaning: "mass of gas (same for all in the comparison)" },
        ],
      },
      pyqExampleId: "c3838905-acd9-4983-9247-aa10f379332d", // equal masses H2, Cl2, N2, O2 -> H2 max pressure
      authoredExample: {
        prompt:
          "Four identical flasks each hold 4 g of a different gas at the same temperature: H2, N2, O2, Cl2. Which gas exerts the greatest pressure?",
        steps: [
          "Equal mass, equal V, equal T, so \\(P \\propto n \\propto \\dfrac{1}{M}\\).",
          "Molar masses: \\(\\text{H}_2 = 2 < \\text{N}_2 = 28 < \\text{O}_2 = 32 < \\text{Cl}_2 = 71\\).",
          "The smallest M gives the largest number of moles and the highest pressure.",
        ],
        answer: "\\(\\text{H}_2\\) exerts the greatest pressure (lowest molar mass).",
      },
      selfCheckExample: {
        prompt:
          "What is the vapour density of O2 gas? (molar mass of O2 = 32)",
        steps: [
          "Vapour density \\(= \\dfrac{\\text{molar mass of gas}}{\\text{molar mass of } \\text{H}_2} = \\dfrac{M}{2}\\).",
          "\\(= \\dfrac{32}{2}\\).",
        ],
        answer: "Vapour density \\(= 16\\).",
      },
      practiceSet: [
        { prompt: "Equal masses of H2 and O2 in identical flasks at the same T. Which has more moles?", answer: "H2", method: "n proportional to 1/M" },
        { prompt: "Same mass of gases, same V and T. Highest pressure goes to the gas with which molar mass?", answer: "The lowest molar mass" },
        { prompt: "Vapour density of a gas with molar mass 44 (e.g. CO2)?", answer: "22", method: "M/2 = 44/2" },
      ],
      traps: [
        {
          title: "Equal MASS, not equal moles",
          body:
            "This trick only works because the **masses** are equal — then \\(P \\propto 1/M\\). If instead the **moles** were equal, all four gases would exert the SAME pressure (same n, V, T). Read whether the question fixes mass or moles.",
        },
        {
          title: "Lightest gas = highest pressure",
          body:
            "It is easy to guess the heaviest gas (\\(\\text{Cl}_2\\)) exerts the most pressure — the opposite is true. Fewer moles per gram means \\(\\text{Cl}_2\\) gives the **lowest** pressure; \\(\\text{H}_2\\) gives the highest.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Mole concept and molar calculations",
      href: "/notes/mht-cet-chemistry/some-basic-concepts",
    },
  ],
};
