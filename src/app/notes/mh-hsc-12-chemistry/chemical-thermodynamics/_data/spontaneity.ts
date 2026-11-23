import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_SPONTANEITY_NOTE: SubtopicNote = {
  subtopicName: "Spontaneity and Entropy",
  title: "Spontaneity, Entropy and Gibbs Energy",
  oneLineDefinition:
    "Spontaneous processes, entropy as a measure of disorder, the second law in terms of total entropy, Gibbs energy ΔG = ΔH − TΔS as the test of spontaneity, the change-over temperature, and ΔG° and the equilibrium constant.",
  whyItMatters:
    "30 questions. Eleven were set in board papers: decide whether reactions are spontaneous from ΔH and ΔS (2015 and 2025); find the temperatures at which a reaction is spontaneous, or its change-over temperature (2020 and 2026); state the condition for spontaneity in terms of Gibbs energy (2023) and of entropy (2024); state the second law (twice in 2026); say whether ΔS is positive or negative for melting and vaporisation (2025); and state the third law or how absolute entropies are found (2016 and 2018), which the present book does not teach. The textbook adds the entropy change of the surroundings, the relation between ΔG and total entropy, and ΔG° with the equilibrium constant.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccth-entropy",
      name: "Entropy and its sign",
      intuition:
        "Ice melts by itself above 0 °C even though it absorbs heat, so giving out energy is not the whole story. The other factor is disorder. In ice the molecules sit in a neat order; in water they wander; in steam they fly freely. Entropy measures that disorder, and it rises from solid to liquid to gas. Heat added at a low temperature stirs things up more than the same heat added at a high temperature.",
      definition:
        "- **Entropy (S):** a measure of molecular disorder or randomness. The greater the disorder, the larger the entropy.\n" +
        "- **Quantitatively:** the entropy change of a system is the heat transferred to it reversibly divided by the kelvin temperature at which it is transferred, \\(\\Delta S = Q_{rev}/T\\). Unit: J K⁻¹.\n" +
        "- Entropy is a state function.\n" +
        "- \\(\\Delta S > 0\\) for melting, vaporisation, dissolving a solid such as iodine in water, and \\(\\text{H}_2\\text{(g)} \\to 2\\text{H(g)}\\).\n" +
        "- \\(\\Delta S < 0\\) when the system becomes more ordered: freezing, condensing, fewer moles of gas.\n" +
        "- The same heat causes more disorder at a lower temperature, so \\(\\Delta S\\) is inversely related to T.\n" +
        "- Board 2016 and 2018 asked about the **third law** (the entropy of a perfectly crystalline solid is zero at 0 K, which lets absolute entropies be found from heat capacity measurements). The present book does not teach it, so give it less time.",
      formula: {
        label: "Entropy change",
        latex: "\\Delta S = \\frac{Q_{rev}}{T}",
      },
      authoredExample: {
        prompt:
          "A system absorbs 2.0 kJ of heat reversibly at 400 K. Another identical system absorbs the same heat reversibly at 200 K. Find the entropy change of each and explain the difference.",
        steps: [
          "Given: \\(Q_{rev} = 2.0\\ \\text{kJ} = 2000\\ \\text{J}\\); \\(T_1 = 400\\ \\text{K}\\), \\(T_2 = 200\\ \\text{K}\\).",
          "Formula: \\(\\Delta S = Q_{rev}/T\\).",
          "At 400 K: \\(\\Delta S = 2000/400 = 5\\ \\text{J K}^{-1}\\).",
          "At 200 K: \\(\\Delta S = 2000/200 = 10\\ \\text{J K}^{-1}\\).",
          "The same heat causes more disorder in the colder system, so its entropy rises more.",
        ],
        answer: "5 J K⁻¹ at 400 K and 10 J K⁻¹ at 200 K",
      },
      selfCheckExample: {
        prompt: "State whether ΔS is positive or negative for CaCO₃(s) → CaO(s) + CO₂(g), and why.",
        steps: ["A gas is formed from a solid.", "Disorder increases, so \\(\\Delta S > 0\\)."],
        answer: "Positive: a gas is formed from a solid",
      },
      practiceSet: [
        { prompt: "What is the unit of entropy change?", answer: "J K⁻¹" },
        { prompt: "State the sign of ΔS for 2H₂(g) + O₂(g) → 2H₂O(l).", answer: "Negative: three moles of gas become two moles of liquid" },
        { prompt: "State the sign of ΔS when solid iodine dissolves in water.", answer: "Positive: the iodine molecules move randomly in solution" },
      ],
      pyqExampleId: "7cf4086c-7c0f-4ae5-bd81-c417e41ca3a2",
      traps: [
        {
          title: "A sign with no reason",
          body: "'Positive' alone earns little. Add the reason in terms of disorder: particles become freer to move, or more moles of gas are formed.",
        },
        {
          title: "Celsius in ΔS = Qrev/T",
          body: "T is the kelvin temperature. Using °C gives a wrong value, and at 0 °C it would mean dividing by zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-second-law",
      name: "Second law: total entropy and spontaneity",
      intuition:
        "Water forming from hydrogen and oxygen lowers the system's entropy, yet it happens readily. The reason is that the reaction pours heat into the surroundings and makes them much more disordered. The universe keeps score with the total: the system plus the surroundings. If the total rises, the change goes by itself.",
      definition:
        "- **Spontaneous process:** occurs of its own without any external agency; proceeds in one direction; can be fast or slow (spontaneity says nothing about rate); continues till equilibrium is reached.\n" +
        "- **Second law:** the total entropy of a system and its surroundings increases in a spontaneous process, \\(\\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0\\).\n" +
        "- If the system's enthalpy change is \\(\\Delta H\\), the surroundings receive \\(-\\Delta H\\): \\(\\Delta S_{surr} = -\\Delta H/T\\).\n" +
        "- \\(\\Delta S_{total} > 0\\): spontaneous. \\(\\Delta S_{total} < 0\\): nonspontaneous. \\(\\Delta S_{total} = 0\\): at equilibrium.\n" +
        "- Exothermicity alone is not the test: ice melting and NaCl dissolving are endothermic yet spontaneous.",
      formula: {
        label: "Second law",
        latex: "\\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0, \\qquad \\Delta S_{surr} = -\\frac{\\Delta H}{T}",
      },
      authoredExample: {
        prompt:
          "For a reaction at 300 K, ΔH = −90 kJ and the entropy change of the system is −120 J K⁻¹. Calculate the entropy change of the surroundings and the total entropy change. Is the reaction spontaneous?",
        steps: [
          "Given: \\(\\Delta H = -90\\ \\text{kJ} = -90000\\ \\text{J}\\), \\(\\Delta S_{sys} = -120\\ \\text{J K}^{-1}\\), \\(T = 300\\ \\text{K}\\).",
          "\\(\\Delta S_{surr} = -\\dfrac{\\Delta H}{T} = -\\dfrac{-90000\\ \\text{J}}{300\\ \\text{K}} = +300\\ \\text{J K}^{-1}\\).",
          "\\(\\Delta S_{total} = -120 + 300 = +180\\ \\text{J K}^{-1}\\).",
          "\\(\\Delta S_{total} > 0\\), so the reaction is spontaneous, even though the system's entropy falls.",
        ],
        answer: "ΔSsurr = +300 J K⁻¹; ΔStotal = +180 J K⁻¹; spontaneous",
      },
      selfCheckExample: {
        prompt: "A change at 400 K has ΔH = +30 kJ and ΔSsys = +50 J K⁻¹. Is it spontaneous?",
        steps: [
          "\\(\\Delta S_{surr} = -30000/400 = -75\\ \\text{J K}^{-1}\\).",
          "\\(\\Delta S_{total} = 50 - 75 = -25\\ \\text{J K}^{-1}\\), negative.",
        ],
        answer: "No: ΔStotal = −25 J K⁻¹, so it is nonspontaneous",
      },
      practiceSet: [
        { prompt: "What does ΔStotal = 0 tell you about a process?", answer: "It is at equilibrium" },
        { prompt: "Find ΔSsurr for a reaction with ΔH = −60 kJ at 300 K.", answer: "+200 J K⁻¹" },
        { prompt: "Does spontaneity tell you how fast a reaction goes?", answer: "No. A spontaneous change can be rapid or slow" },
      ],
      pyqExampleId: "6556a7c3-709e-497a-ab7e-2f1966be9d12",
      traps: [
        {
          title: "Leaving out 'total'",
          body: "The second law is about the total entropy of the system and its surroundings. The system's entropy alone can fall in a spontaneous change.",
        },
        {
          title: "Losing the minus sign in ΔSsurr",
          body: "\\(\\Delta S_{surr} = -\\Delta H/T\\). An exothermic reaction (\\(\\Delta H < 0\\)) makes \\(\\Delta S_{surr}\\) positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-gibbs",
      name: "Gibbs energy and the test of spontaneity",
      intuition:
        "Checking the surroundings every time is a nuisance. Gibbs energy rolls the system's two tendencies into one number: lower enthalpy is good, higher entropy is good, and temperature decides how much the entropy counts. If ΔG is negative, the change goes by itself. Where ΔH and ΔS pull in opposite directions, there is a temperature where they balance: the change-over temperature.",
      definition:
        "- **Gibbs energy:** \\(G = H - TS\\), a state function. At constant T and P: \\(\\Delta G = \\Delta H - T\\Delta S\\).\n" +
        "Relation between \\(\\Delta G\\) and \\(\\Delta S_{total}\\), one step a line:\n" +
        "- \\(\\Delta S_{total} = \\Delta S + \\Delta S_{surr}\\) and \\(\\Delta S_{surr} = -\\Delta H/T\\)\n" +
        "- \\(\\Delta S_{total} = \\Delta S - \\Delta H/T\\)\n" +
        "- Multiply by T: \\(T\\Delta S_{total} = T\\Delta S - \\Delta H\\), so \\(\\Delta H - T\\Delta S = -T\\Delta S_{total}\\)\n" +
        "- \\(\\Delta G = -T\\Delta S_{total}\\)\n" +
        "- **Criteria:** \\(\\Delta G < 0\\) spontaneous; \\(\\Delta G > 0\\) nonspontaneous; \\(\\Delta G = 0\\) equilibrium.\n" +
        "- **Four cases:** \\(\\Delta H < 0, \\Delta S > 0\\): spontaneous at all temperatures. \\(\\Delta H > 0, \\Delta S < 0\\): nonspontaneous at all temperatures. Both negative: spontaneous at low temperatures. Both positive: spontaneous at high temperatures.\n" +
        "- **Change-over temperature:** set \\(\\Delta G = 0\\): \\(T = \\Delta H/\\Delta S\\) (ΔH and ΔS taken as independent of temperature).",
      formula: {
        label: "Gibbs energy change",
        latex: "\\Delta G = \\Delta H - T\\Delta S = -T\\Delta S_{total}, \\qquad T_{eq} = \\frac{\\Delta H}{\\Delta S}",
      },
      authoredExample: {
        prompt:
          "For a reaction ΔH = +30 kJ and ΔS = +100 J K⁻¹. (a) Is it spontaneous at 250 K? (b) Above what temperature does it become spontaneous?",
        steps: [
          "Given: \\(\\Delta H = +30\\ \\text{kJ}\\), \\(\\Delta S = +100\\ \\text{J K}^{-1} = +0.100\\ \\text{kJ K}^{-1}\\).",
          "(a) \\(\\Delta G = \\Delta H - T\\Delta S = 30 - 250 \\times 0.100 = 30 - 25 = +5\\ \\text{kJ}\\). Positive, so nonspontaneous at 250 K.",
          "(b) Change-over: \\(T = \\Delta H/\\Delta S = 30\\ \\text{kJ} / 0.100\\ \\text{kJ K}^{-1} = 300\\ \\text{K}\\).",
          "Both ΔH and ΔS are positive, so the reaction is spontaneous above 300 K.",
        ],
        answer: "(a) ΔG = +5 kJ, nonspontaneous; (b) spontaneous above 300 K",
      },
      selfCheckExample: {
        prompt: "ΔH = −20 kJ and ΔS = +35 J K⁻¹ for a reaction at 300 K. Find ΔG and comment on spontaneity.",
        steps: ["\\(\\Delta G = -20 - 300 \\times 0.035 = -20 - 10.5 = -30.5\\ \\text{kJ}\\).", "ΔH negative and ΔS positive, so it is spontaneous at every temperature."],
        answer: "ΔG = −30.5 kJ; spontaneous at all temperatures",
      },
      practiceSet: [
        { prompt: "ΔH and ΔS are both positive. At what temperatures is the reaction spontaneous?", answer: "At high temperatures, when \\(T\\Delta S > \\Delta H\\)" },
        { prompt: "Find the change-over temperature for ΔH = +45 kJ and ΔS = +180 J K⁻¹.", answer: "\\(T = 45000/180 = 250\\ \\text{K}\\)" },
        { prompt: "What is the sign of ΔG when ΔStotal is positive?", answer: "Negative, since \\(\\Delta G = -T\\Delta S_{total}\\)" },
      ],
      pyqExampleId: "b2d524c9-05b2-4ed9-b839-2bb5d3a5aedc",
      traps: [
        {
          title: "kJ for ΔH but J for ΔS",
          body: "Convert ΔS from J K⁻¹ to kJ K⁻¹ (divide by 1000), or ΔH to J, before using \\(\\Delta G = \\Delta H - T\\Delta S\\) or \\(T = \\Delta H/\\Delta S\\). This is the commonest lost mark in the chapter.",
        },
        {
          title: "Spontaneous above or below?",
          body: "Finding T is half the answer. Both negative: spontaneous below it. Both positive: spontaneous above it. Say which.",
        },
        {
          title: "A change-over temperature that cannot exist",
          body: "If ΔH and ΔS have opposite signs, \\(\\Delta H/\\Delta S\\) is negative: there is no change-over, and the reaction is always or never spontaneous.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-gibbs-k",
      name: "Gibbs energy and the equilibrium constant",
      intuition:
        "ΔG° tells you how far a reaction would like to go when everything starts in its standard state. A large equilibrium constant means the products are strongly favoured, which matches a large negative ΔG°. The reaction quotient Q tracks where a mixture is now; at equilibrium Q becomes K and ΔG becomes zero.",
      definition:
        "Derivation (book §4.11.9), one step a line:\n" +
        "- \\(\\Delta G = \\Delta G^0 + RT \\ln Q\\), Q being the reaction quotient (\\(Q_c\\) or \\(Q_p\\)).\n" +
        "- At equilibrium \\(\\Delta G = 0\\) and Q becomes K: \\(0 = \\Delta G^0 + RT \\ln K\\)\n" +
        "- \\(\\Delta G^0 = -RT \\ln K_c\\) and \\(\\Delta G^0 = -RT \\ln K_p\\)\n" +
        "- \\(\\Delta G^0 = -2.303\\,RT \\log_{10} K\\)\n" +
        "- K greater than 1 gives a negative \\(\\Delta G^0\\); K less than 1 gives a positive \\(\\Delta G^0\\).",
      formula: {
        label: "Standard Gibbs energy and K",
        latex: "\\Delta G^0 = -2.303\\,RT \\log_{10} K, \\qquad \\Delta G = \\Delta G^0 + 2.303\\,RT \\log_{10} Q",
      },
      authoredExample: {
        prompt: "The equilibrium constant of a reaction at 298 K is 1.0 × 10⁴. Calculate ΔG°. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(K = 1.0 \\times 10^4\\), \\(T = 298\\ \\text{K}\\).",
          "Formula: \\(\\Delta G^0 = -2.303\\,RT \\log_{10} K\\).",
          "Substitution: \\(\\Delta G^0 = -2.303 \\times 8.314 \\times 298 \\times \\log_{10}(1.0 \\times 10^4) = -5706 \\times 4\\).",
          "\\(\\Delta G^0 = -22823\\ \\text{J mol}^{-1} = -22.8\\ \\text{kJ mol}^{-1}\\).",
        ],
        answer: "ΔG° = −22.8 kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt: "ΔG° for a reaction at 298 K is +11.41 kJ mol⁻¹. Find K.",
        steps: [
          "\\(\\log_{10} K = -\\dfrac{11410}{2.303 \\times 8.314 \\times 298} = -\\dfrac{11410}{5706} = -2.0\\).",
          "\\(K = 10^{-2} = 0.01\\).",
        ],
        answer: "K = 0.01",
      },
      practiceSet: [
        { prompt: "If K is greater than 1, what is the sign of ΔG°?", answer: "Negative" },
        { prompt: "What does the reaction quotient Q become at equilibrium?", answer: "The equilibrium constant K" },
      ],
      pyqExampleId: "0cda5e4a-e7eb-4e69-9fa7-a106e2a08d93",
      traps: [
        {
          title: "Setting ΔG° to zero at equilibrium",
          body: "At equilibrium ΔG = 0, not ΔG°. ΔG° is a fixed number for the reaction, linked to K by \\(\\Delta G^0 = -RT \\ln K\\).",
        },
        {
          title: "R in J with ΔG° in kJ",
          body: "With R = 8.314 J K⁻¹ mol⁻¹ the answer comes out in J mol⁻¹. Convert before comparing with a value in kJ.",
        },
      ],
    },
  ],
};
