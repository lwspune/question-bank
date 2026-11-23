import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_WORK_NOTE: SubtopicNote = {
  subtopicName: "Pressure-Volume Work and Maximum Work",
  title: "Pressure-Volume Work and Maximum Work",
  oneLineDefinition:
    "Work done when a gas expands or is compressed against an external pressure, W = −Pext ΔV, its sign convention, free expansion, and the maximum work of an isothermal reversible expansion.",
  whyItMatters:
    "24 questions. Twelve were set in board papers: work against a constant pressure in L atm, joules and calories (2014), in a compression (2025) and as an MCQ in dm³ bar (2025); the sign convention for work in an expansion (2024); expansion into vacuum (2023); derive the expression for maximum work (2017 and 2024) and state the conditions for it (2019); maximum work numericals (2022, 2023 and 2025); and the work done when sulphur dioxide is oxidised (2026). The textbook adds the derivation of PV work, finding a final pressure or volume, and one gas expanded in three different ways.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccth-pv-work",
      name: "Pressure-volume work against a constant external pressure",
      intuition:
        "A gas pushing a piston out against the atmosphere is like you pushing a door against a strong wind. The work depends on how hard the outside pushes back (Pext) and how far the piston moves (the volume change). The gas's own pressure does not set the work; the opposing pressure does. A volume change does no work unless something outside opposes it.",
      definition:
        "Derivation (book §4.4), one step a line:\n" +
        "- Gas in a cylinder with a frictionless, rigid, movable piston of area A; the opposing pressure is \\(P_{ext}\\).\n" +
        "- Force on the piston: \\(f = -P_{ext} \\times A\\) ... (1)\n" +
        "- Piston moves a distance d: \\(W = f \\times d\\) ... (2)\n" +
        "- From (1) and (2): \\(W = -P_{ext} \\times A \\times d\\) ... (3)\n" +
        "- Area times distance is the volume change: \\(\\Delta V = A \\times d\\) ... (4)\n" +
        "- From (3) and (4): \\(W = -P_{ext}\\,\\Delta V = -P_{ext}(V_2 - V_1)\\)\n" +
        "- **Units:** with P in bar and V in dm³, W is in dm³ bar, and \\(1\\ \\text{dm}^3\\ \\text{bar} = 100\\ \\text{J}\\). Also \\(1\\ \\text{J} = 1\\ \\text{Pa m}^3\\).",
      formula: {
        label: "Pressure-volume work",
        latex: "W = -P_{ext}\\,\\Delta V = -P_{ext}\\,(V_2 - V_1)",
        symbols: [
          { symbol: "\\(P_{ext}\\)", meaning: "external (opposing) pressure" },
          { symbol: "\\(V_1, V_2\\)", meaning: "initial and final volumes" },
          { symbol: "\\(W\\)", meaning: "work done on the system" },
        ],
      },
      authoredExample: {
        prompt:
          "2.0 mol of an ideal gas expands isothermally from 10 dm³ to 16 dm³ against a constant external pressure of 2.5 bar. Calculate the work done in dm³ bar and in joules, and say whether work is done on or by the system.",
        steps: [
          "Given: \\(P_{ext} = 2.5\\ \\text{bar}\\), \\(V_1 = 10\\ \\text{dm}^3\\), \\(V_2 = 16\\ \\text{dm}^3\\).",
          "Formula: \\(W = -P_{ext}(V_2 - V_1)\\).",
          "Substitution: \\(W = -2.5\\ \\text{bar} \\times (16 - 10)\\ \\text{dm}^3 = -15\\ \\text{dm}^3\\ \\text{bar}\\).",
          "In joules: \\(W = -15 \\times 100\\ \\text{J} = -1500\\ \\text{J}\\).",
          "W is negative, so work is done by the system on the surroundings (an expansion).",
        ],
        answer: "W = −15 dm³ bar = −1500 J; work is done by the system",
      },
      selfCheckExample: {
        prompt:
          "A gas is compressed from 12 dm³ to 7 dm³ by a constant external pressure of 4 bar. Find the work in joules and say whether it is done on or by the system.",
        steps: [
          "\\(W = -4\\ \\text{bar} \\times (7 - 12)\\ \\text{dm}^3 = +20\\ \\text{dm}^3\\ \\text{bar}\\).",
          "\\(W = 20 \\times 100 = +2000\\ \\text{J}\\), positive, so work is done on the system.",
        ],
        answer: "+2000 J, done on the system",
      },
      practiceSet: [
        { prompt: "Convert 2.5 dm³ bar into joules.", answer: "250 J" },
        { prompt: "A gas expands from 1.0 dm³ to 3.5 dm³ against a constant pressure of 0.8 bar. Find the work in joules.", answer: "\\(W = -0.8 \\times 2.5 = -2.0\\ \\text{dm}^3\\ \\text{bar} = -200\\ \\text{J}\\)" },
        { prompt: "Write 1 joule in terms of pascal and cubic metre.", answer: "\\(1\\ \\text{J} = 1\\ \\text{Pa m}^3\\)" },
      ],
      pyqExampleId: "5de250d7-c02d-4ed1-b864-cb2b433daa69",
      traps: [
        {
          title: "Using the gas pressure instead of the external pressure",
          body: "In \\(W = -P_{ext}\\Delta V\\) the pressure is the opposing (external) pressure. The pressure of the gas itself does not go into this formula.",
        },
        {
          title: "Mixing up the two energy units",
          body: "\\(1\\ \\text{dm}^3\\ \\text{bar} = 100\\ \\text{J}\\), but \\(1\\ \\text{L atm} = 101.3\\ \\text{J}\\). Use the one that matches the pressure unit in the question, and say which you used.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccth-work-sign",
      name: "Sign convention and free expansion",
      intuition:
        "Stand inside the system. Anything that comes in (heat absorbed, work done on you) is positive; anything that goes out (heat released, work you do on the outside) is negative. In an expansion the gas pushes the surroundings back, so energy leaves it as work and W is negative.",
      definition:
        "- Energy entering the system is positive; energy leaving the system is negative.\n" +
        "- Expansion: \\(V_2 > V_1\\), so \\(\\Delta V > 0\\) and \\(W < 0\\): work is done by the system.\n" +
        "- Compression: \\(V_2 < V_1\\), so \\(W > 0\\): work is done on the system.\n" +
        "- **Free expansion:** expansion against zero opposing force, as into a vacuum. \\(P_{ext} = 0\\), so \\(W = 0\\) whatever the volume change.\n" +
        "- W and Q are path functions.",
      table: {
        columns: ["Situation", "Sign", "Meaning"],
        rows: [
          { cells: ["Heat absorbed by the system", "\\(+Q\\)", "Energy enters the system as heat"] },
          { cells: ["Heat released by the system", "\\(-Q\\)", "Energy leaves the system as heat"] },
          { cells: ["Work done on the system (compression)", "\\(+W\\)", "The surroundings push the piston in"] },
          {
            cells: ["Work done by the system (expansion)", "\\(-W\\)", "The gas pushes the surroundings back"],
            pyqExampleId: "7f696e9c-4d3b-44c3-b70c-c1079169d551",
            noteAmber: "Board 2024 asked the sign convention of work in an expansion.",
          },
          {
            cells: ["Expansion into vacuum (free expansion)", "\\(W = 0\\)", "Nothing opposes the gas, so \\(P_{ext} = 0\\)"],
            pyqExampleId: "5e77944c-f300-40fd-98c2-d2e04012682d",
            noteAmber: "Board 2023 asked for the work done when a gas expands into vacuum.",
          },
        ],
      },
      practiceSet: [
        { prompt: "A gas expands into an evacuated vessel from 2 L to 10 L. How much work does it do?", answer: "None. \\(P_{ext} = 0\\), so \\(W = 0\\)" },
        { prompt: "W is positive for a process. In which direction does energy flow as work?", answer: "Into the system: work is done on it" },
        { prompt: "What sign does Q carry when a system releases heat?", answer: "Negative" },
      ],
      pyqExampleId: "7f696e9c-4d3b-44c3-b70c-c1079169d551",
      traps: [
        {
          title: "A large volume change does not mean large work",
          body: "Into a vacuum the volume can grow a lot and still \\(W = 0\\), because there is no opposing pressure. Say 'no opposing force' as the reason.",
        },
        {
          title: "Writing a positive sign for expansion",
          body: "Expansion work is negative in this book's convention. A sign error costs the mark even when the number is right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-max-work-derivation",
      name: "Maximum work: why reversible, and its derivation",
      intuition:
        "The harder the outside pushes back, the more work an expanding gas does. But the outside cannot push harder than the gas, or the piston moves the other way. So the most work comes when Pext is kept just a tiny bit less than the gas pressure at every stage: a reversible expansion. Taking masses off the piston one grain at a time does exactly that.",
      definition:
        "Derivation (book §4.5.1), one step a line:\n" +
        "- n mol of ideal gas in a cylinder with a frictionless, movable, rigid piston expands isothermally and reversibly from \\(V_1\\) to \\(V_2\\) at temperature T.\n" +
        "- In each step \\(P_{ext}\\) is made infinitesimally smaller than P by removing masses; volume rises by dV: \\(dW = -P_{ext}\\,dV\\) ... (1)\n" +
        "- Reversible, so \\(P - P_{ext} = dP\\), that is \\(P_{ext} = P - dP\\) ... (2)\n" +
        "- From (1) and (2): \\(dW = -(P - dP)\\,dV = -P\\,dV + dP\\,dV\\)\n" +
        "- Neglect the very small product \\(dP\\,dV\\): \\(dW = -P\\,dV\\) ... (3)\n" +
        "- Integrate from \\(V_1\\) to \\(V_2\\); the expansion is reversible, so this is the maximum work: \\(W_{max} = -\\int_{V_1}^{V_2} P\\,dV\\)\n" +
        "- Ideal gas, \\(P = nRT/V\\), T constant: \\(W_{max} = -nRT\\int_{V_1}^{V_2} \\dfrac{dV}{V} = -nRT \\ln \\dfrac{V_2}{V_1}\\)\n" +
        "- \\(W_{max} = -2.303\\,nRT \\log_{10} \\dfrac{V_2}{V_1}\\)\n" +
        "- Boyle's law, \\(P_1V_1 = P_2V_2\\): \\(W_{max} = -2.303\\,nRT \\log_{10} \\dfrac{P_1}{P_2}\\)\n" +
        "- **Conditions:** isothermal, reversible, ideal gas.",
      formula: {
        label: "Maximum work, isothermal reversible",
        latex: "W_{max} = -\\int_{V_1}^{V_2} P\\,dV = -nRT \\ln \\frac{V_2}{V_1}",
      },
      authoredExample: {
        prompt:
          "1 mol of an ideal gas at 300 K doubles its volume from 10 L to 20 L. Compare the work done (a) isothermally and reversibly, and (b) in one step against a constant external pressure equal to the final pressure of the gas. Which is larger in size, and why?",
        steps: [
          "Given: \\(n = 1\\ \\text{mol}\\), \\(T = 300\\ \\text{K}\\), \\(V_2/V_1 = 2\\), \\(R = 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1}\\).",
          "(a) \\(W_{max} = -2.303 \\times 1 \\times 8.314 \\times 300 \\times \\log_{10} 2 = -5744 \\times 0.3010 = -1729\\ \\text{J}\\).",
          "(b) Final pressure \\(P_{ext} = nRT/V_2\\), so \\(W = -\\dfrac{nRT}{V_2}(V_2 - V_1) = -nRT\\left(1 - \\dfrac{V_1}{V_2}\\right)\\).",
          "\\(W = -8.314 \\times 300 \\times 0.5 = -1247\\ \\text{J}\\).",
          "The reversible expansion does more work (1729 J against 1247 J) because the opposing pressure is kept as high as possible at every stage.",
        ],
        answer: "Reversible: −1729 J; one-step: −1247 J; the reversible path gives the maximum work",
      },
      selfCheckExample: {
        prompt: "In the derivation of maximum work, why is the term dP dV dropped?",
        steps: [
          "dP and dV are both infinitesimally small.",
          "Their product is smaller still, negligible beside \\(P\\,dV\\), so \\(dW = -P\\,dV\\).",
        ],
        answer: "It is the product of two infinitesimals and is negligibly small",
      },
      practiceSet: [
        { prompt: "Write the maximum work expression in terms of initial and final pressures.", answer: "\\(W_{max} = -2.303\\,nRT \\log_{10} \\dfrac{P_1}{P_2}\\)" },
        { prompt: "Which law lets you replace \\(V_2/V_1\\) by \\(P_1/P_2\\)?", answer: "Boyle's law, \\(P_1V_1 = P_2V_2\\) at constant temperature" },
        { prompt: "How must Pext compare with the gas pressure P for the work to be maximum?", answer: "Pext must be infinitesimally smaller than P at every stage" },
      ],
      pyqExampleId: "e2de69e3-a579-42f5-8d43-9f218e0dda6a",
      traps: [
        {
          title: "Taking T inside the integral as a variable",
          body: "n, R and T come out of the integral only because the process is isothermal. State 'T is constant' at that step, or the derivation loses a mark.",
        },
        {
          title: "Saying Pext is greater than P",
          body: "If Pext were greater, the gas would be compressed. For a reversible expansion Pext is infinitesimally smaller than P.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-max-work-numeric",
      name: "Maximum work numericals",
      intuition:
        "Every maximum work numerical is the same four lines: find n (convert grams or mmol), pick the volume ratio or the pressure ratio, take the common log, multiply by −2.303 nRT. Expansion gives a negative answer; compression gives a positive one.",
      definition:
        "- \\(W_{max} = -2.303\\,nRT \\log_{10} \\dfrac{V_2}{V_1} = -2.303\\,nRT \\log_{10} \\dfrac{P_1}{P_2}\\)\n" +
        "- n from mass: \\(n = m/M\\); from millimoles: divide by 1000.\n" +
        "- With R in J K⁻¹ mol⁻¹ the answer is in joules; divide by 1000 for kJ.\n" +
        "- Expansion (\\(V_2 > V_1\\), \\(P_1 > P_2\\)): \\(W_{max} < 0\\). Compression: \\(W_{max} > 0\\).",
      formula: {
        label: "Maximum work in common logs",
        latex: "W_{max} = -2.303\\,nRT \\log_{10} \\frac{V_2}{V_1} = -2.303\\,nRT \\log_{10} \\frac{P_1}{P_2}",
      },
      authoredExample: {
        prompt:
          "Two moles of nitrogen expand isothermally and reversibly at 300 K from 5 dm³ to 25 dm³. Calculate the work done. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(n = 2\\ \\text{mol}\\), \\(T = 300\\ \\text{K}\\), \\(V_1 = 5\\ \\text{dm}^3\\), \\(V_2 = 25\\ \\text{dm}^3\\).",
          "Formula: \\(W_{max} = -2.303\\,nRT \\log_{10} \\dfrac{V_2}{V_1}\\).",
          "Substitution: \\(W_{max} = -2.303 \\times 2\\ \\text{mol} \\times 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 300\\ \\text{K} \\times \\log_{10} 5\\).",
          "\\(= -11488\\ \\text{J} \\times 0.6990 = -8030\\ \\text{J}\\).",
          "Negative, as an expansion must be: the gas does work on the surroundings.",
        ],
        answer: "W = −8030 J = −8.03 kJ",
      },
      selfCheckExample: {
        prompt:
          "14 g of nitrogen gas is expanded isothermally and reversibly at 300 K from 3 bar to 1 bar. Find the maximum work.",
        steps: [
          "\\(n = 14/28 = 0.5\\ \\text{mol}\\).",
          "\\(W_{max} = -2.303 \\times 0.5 \\times 8.314 \\times 300 \\times \\log_{10} 3 = -2872 \\times 0.4771 = -1370\\ \\text{J}\\).",
        ],
        answer: "−1370 J (about −1.37 kJ)",
      },
      practiceSet: [
        { prompt: "1 mol of an ideal gas expands isothermally and reversibly at 298 K to ten times its volume. Find the work.", answer: "\\(-2.303 \\times 8.314 \\times 298 \\times 1 = -5706\\ \\text{J}\\)" },
        { prompt: "A gas is compressed isothermally and reversibly. Is \\(W_{max}\\) positive or negative?", answer: "Positive: work is done on the system" },
        { prompt: "How many moles are 500 mmol?", answer: "0.5 mol" },
      ],
      pyqExampleId: "0e674ec7-e4f2-4ab1-bfec-a19f12116d31",
      traps: [
        {
          title: "Turning the pressure ratio upside down",
          body: "The volume ratio is final over initial, \\(V_2/V_1\\), but the pressure ratio is initial over final, \\(P_1/P_2\\). For an expansion both are greater than 1.",
        },
        {
          title: "Forgetting 2.303 with log",
          body: "\\(\\ln x = 2.303 \\log_{10} x\\). Using \\(\\log_{10}\\) without the 2.303 gives an answer 2.3 times too small.",
        },
        {
          title: "Leaving n in grams or millimoles",
          body: "Convert mass to moles with the molar mass, and mmol to mol by dividing by 1000, before you substitute.",
        },
      ],
    },
  ],
};
