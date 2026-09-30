import type { SubtopicNote } from "@/app/notes/_types";

export const SPONTANEITY_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Entropy, Gibbs Energy and Spontaneity",
  title: "Entropy, Gibbs Energy and Spontaneity",
  oneLineDefinition:
    "Whether a change goes on its own: ΔG = ΔH − TΔS, the four sign cases, the entropy change of a reaction or a phase change, and the temperature at which ΔG crosses zero.",
  whyItMatters:
    "Twenty PYQs, twelve of them numerical, and two from 2026. Five read the signs of ΔH and ΔS, five compute an entropy or Gibbs energy change, and ten find the temperature at which ΔG changes sign — the largest single cluster in the chapter.",
  concepts: [
    // C1 — sign cases
    {
      kind: "reference" as const,
      slug: "jcthermo-gibbs-signs",
      name: "Spontaneity from the signs of ΔH and ΔS",
      intuition:
        "ΔG = ΔH − TΔS. The enthalpy term hardly changes with temperature, but the entropy term grows with T. So the sign of ΔS decides which way a rise in temperature pushes ΔG, and the two signs together decide whether a change is always, never or only sometimes spontaneous.",
      definition:
        "- At constant \\(T\\) and \\(p\\): \\(\\Delta G < 0\\) spontaneous; \\(\\Delta G = 0\\) equilibrium (a reversible change); \\(\\Delta G > 0\\) non-spontaneous, and the reverse change is spontaneous.\n" +
        "- When \\(\\Delta H\\) and \\(\\Delta S\\) share a sign, \\(\\Delta G\\) changes sign at \\(T = \\frac{\\Delta H}{\\Delta S}\\).\n" +
        "- Second law: \\(\\Delta S_{\\mathrm{sys}} + \\Delta S_{\\mathrm{surr}} > 0\\) for a spontaneous change, and \\(\\frac{\\Delta G_{\\mathrm{sys}}}{\\Delta S_{\\mathrm{total}}} = -T\\) at constant pressure.\n" +
        "- Partial derivatives: \\(\\left(\\frac{\\partial G}{\\partial T}\\right)_p = -S\\), \\(\\left(\\frac{\\partial G}{\\partial p}\\right)_T = V\\), \\(\\left(\\frac{\\partial H}{\\partial T}\\right)_p = C_p\\), \\(\\left(\\frac{\\partial U}{\\partial T}\\right)_V = C_V\\).",
      table: {
        columns: ["ΔH", "ΔS", "Sign of ΔG", "Spontaneous"],
        rows: [
          { cells: ["Negative", "Positive", "Negative at every temperature", "At all temperatures"] },
          { cells: ["Positive", "Negative", "Positive at every temperature", "At no temperature"] },
          {
            cells: ["Positive", "Positive", "Negative above ΔH/ΔS", "At high temperature"],
            noteAmber: "An endothermic change that goes at 373 K but not at 273 K belongs in this row.",
          },
          { cells: ["Negative", "Negative", "Negative below ΔH/ΔS", "At low temperature"] },
        ],
        caption: "The sign of ΔS decides which way a rise in temperature pushes ΔG.",
      },
      selfCheckExample: {
        prompt: "A reaction is spontaneous at 250 K but not at 400 K. What are the signs of ΔH and ΔS?",
        steps: [
          "Raising T makes it stop, so \\(-T\\Delta S\\) grows positive: \\(\\Delta S < 0\\).",
          "At low T it still goes, so \\(\\Delta H\\) must be negative enough to make \\(\\Delta G < 0\\) there.",
        ],
        answer: "ΔH negative and ΔS negative.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta H < 0\\) and \\(\\Delta S > 0\\). At which temperatures is the change spontaneous?", answer: "All temperatures" },
        { prompt: "What does \\(\\Delta G = 0\\) mean for a process at constant T and p?", answer: "It is at equilibrium" },
        { prompt: "What is \\(\\left(\\partial G/\\partial T\\right)_p\\)?", answer: "\\(-S\\)" },
        {
          prompt: "\\(\\Delta H > 0\\), \\(\\Delta S > 0\\), and the equilibrium temperature is \\(T_e\\). When is the change spontaneous?",
          answer: "When \\(T > T_e\\)",
        },
      ],
      pyqExampleId: "f8db79cf-4fba-498c-8799-d4a8d5080dd9", // 24 Jan 2025 — endothermic, spontaneous at 373 K but not 273 K
      traps: [
        {
          title: "Exothermic is not enough",
          body:
            "An exothermic change with \\(\\Delta S < 0\\) stops being spontaneous above \\(\\Delta H/\\Delta S\\). Only \\(\\Delta H < 0\\) with \\(\\Delta S > 0\\) is spontaneous at every temperature.",
        },
        {
          title: "Swapping the two derivatives of G",
          body:
            "G falls as temperature rises, at the rate S, and rises with pressure, at the rate V: \\(\\left(\\partial G/\\partial T\\right)_p = -S\\) and \\(\\left(\\partial G/\\partial p\\right)_T = V\\). Matching lists swap them.",
        },
      ],
    },

    // C2 — entropy change and ΔG of a reaction
    {
      kind: "formula" as const,
      slug: "jcthermo-entropy-change",
      name: "Entropy change and Gibbs energy of a reaction",
      intuition:
        "Entropy measures how spread out the energy and the particles are. Making gas raises it; freezing, losing gas molecules or sticking molecules to a surface lowers it. For a reaction, use tabulated entropies just like formation enthalpies — except that no element has zero entropy.",
      definition:
        "- \\(\\Delta_r S^\\circ = \\sum\\nu S^\\circ(\\text{products}) - \\sum\\nu S^\\circ(\\text{reactants})\\). Elements have non-zero \\(S^\\circ\\).\n" +
        "- \\(\\Delta_r G^\\circ = \\Delta_r H^\\circ - T\\Delta_r S^\\circ\\). Put \\(\\Delta S\\) in kJ K⁻¹ (divide by 1000) first.\n" +
        "- Phase change at its transition temperature: \\(\\Delta S = \\frac{\\Delta H_{\\mathrm{trans}}}{T_{\\mathrm{trans}}}\\).\n" +
        "- Heating with no phase change: \\(\\Delta S = \\int \\frac{C_p}{T}\\,dT = C_p\\ln\\frac{T_2}{T_1}\\) for constant \\(C_p\\). A path through phase changes adds one term per step.\n" +
        "- Surroundings: \\(\\Delta S_{\\mathrm{surr}} = -\\frac{q_{\\mathrm{sys}}}{T}\\).\n" +
        "- \\(\\Delta S < 0\\): freezing (at any temperature), \\(\\mathrm{N_2 + 3H_2 \\to 2NH_3}\\), adsorption. \\(\\Delta S > 0\\): melting, vaporising, dissolving NaCl.",
      formula: {
        label: "Entropy and Gibbs energy of reaction",
        latex:
          "\\Delta_r S^\\circ = \\sum \\nu S^\\circ_{\\mathrm{products}} - \\sum \\nu S^\\circ_{\\mathrm{reactants}},\\qquad \\Delta_r G^\\circ = \\Delta_r H^\\circ - T\\Delta_r S^\\circ",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{CaCO_3(s) \\to CaO(s) + CO_2(g)}\\), \\(\\Delta_r H^\\circ = +178\\) kJ mol⁻¹. \\(S^\\circ\\) (J K⁻¹ mol⁻¹): \\(\\mathrm{CaCO_3}\\) 92.9, CaO 39.8, \\(\\mathrm{CO_2}\\) 213.7. Find \\(\\Delta_r S^\\circ\\) and \\(\\Delta_r G^\\circ\\) at 298 K.",
        steps: [
          "\\(\\Delta_r S^\\circ = (39.8 + 213.7) - 92.9 = +160.6\\) J K⁻¹ mol⁻¹ = 0.1606 kJ K⁻¹ mol⁻¹.",
          "\\(\\Delta_r G^\\circ = 178 - 298 \\times 0.1606 = 178 - 47.9 = +130.1\\) kJ mol⁻¹.",
          "Positive: limestone does not decompose at room temperature.",
        ],
        answer: "\\(\\Delta_r S^\\circ = +160.6\\) J K⁻¹ mol⁻¹, \\(\\Delta_r G^\\circ \\approx +130\\) kJ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "1 mol of ice melts at 273 K, taking in 6.01 kJ from surroundings also at 273 K. Find \\(\\Delta S_{\\mathrm{sys}}\\), \\(\\Delta S_{\\mathrm{surr}}\\) and \\(\\Delta S_{\\mathrm{total}}\\).",
        steps: [
          "\\(\\Delta S_{\\mathrm{sys}} = \\frac{6010}{273} = +22.0\\) J K⁻¹.",
          "\\(\\Delta S_{\\mathrm{surr}} = -\\frac{6010}{273} = -22.0\\) J K⁻¹.",
          "\\(\\Delta S_{\\mathrm{total}} = 0\\): at the melting point, ice and water are at equilibrium.",
        ],
        answer: "+22.0 J K⁻¹, −22.0 J K⁻¹, and 0.",
      },
      practiceSet: [
        {
          prompt: "\\(S^\\circ\\): A 100, B 60, C 150 J K⁻¹ mol⁻¹. Find \\(\\Delta S^\\circ\\) for \\(\\mathrm{A + B \\to C}\\).",
          answer: "\\(-10\\) J K⁻¹ mol⁻¹",
        },
        { prompt: "\\(\\Delta H = -10\\) kJ, \\(\\Delta S = -20\\) J K⁻¹ and T = 300 K. Find \\(\\Delta G\\).", answer: "\\(-4\\) kJ" },
        { prompt: "A system gives 600 J of heat to surroundings at 300 K. Find \\(\\Delta S_{\\mathrm{surr}}\\).", answer: "\\(+2\\) J K⁻¹" },
        { prompt: "Does entropy rise or fall when a gas is adsorbed on a metal surface?", answer: "It falls" },
      ],
      pyqExampleId: "83c54ff3-8d16-4002-a34a-fb30f72dbda6", // 5 Apr 2026 S2 — ΔrG at 600 K from a ΔfH and S table
      traps: [
        {
          title: "ΔS in joules, ΔH in kilojoules",
          body:
            "This is the most common slip in the chapter. With \\(\\Delta H = 50\\) kJ, \\(\\Delta S = 100\\) J K⁻¹ and T = 400 K, \\(50 - 400 \\times 100\\) is nonsense; \\(50 - 400 \\times 0.100 = 10\\) kJ is right.",
        },
        {
          title: "Heating entropy needs the 1/T",
          body:
            "The entropy of warming is \\(\\int C_p\\,dT/T\\), not \\(\\int C_p\\,dT\\) (that is the enthalpy). Each phase change on the way adds its own \\(\\Delta H/T\\), at its own temperature.",
        },
      ],
    },

    // C3 — crossover temperature
    {
      kind: "formula" as const,
      slug: "jcthermo-crossover-temperature",
      name: "Temperature at which ΔG changes sign",
      intuition:
        "When ΔH and ΔS have the same sign, the two terms of ΔG pull against each other, and at one temperature they balance. There ΔG = 0. That temperature is a boiling point, a melting point, a transition point, or the lowest temperature at which a reduction starts to work.",
      definition:
        "- \\(T = \\frac{\\Delta H}{\\Delta S}\\), with \\(\\Delta H\\) in J (or \\(\\Delta S\\) in kJ K⁻¹).\n" +
        "- \\(\\Delta H > 0\\), \\(\\Delta S > 0\\): spontaneous ABOVE this temperature. \\(\\Delta H < 0\\), \\(\\Delta S < 0\\): spontaneous BELOW it.\n" +
        "- Boiling and melting points: \\(T_b = \\frac{\\Delta_{\\mathrm{vap}}H}{\\Delta_{\\mathrm{vap}}S}\\), \\(T_f = \\frac{\\Delta_{\\mathrm{fus}}H}{\\Delta_{\\mathrm{fus}}S}\\).\n" +
        "- If \\(\\Delta G^\\circ\\) is given as a function of T, set it to zero and solve. If \\(\\Delta S\\) itself depends on T, solve \\(\\Delta H = T\\,\\Delta S(T)\\).\n" +
        "- From a table: find \\(\\Delta_r H^\\circ\\) and \\(\\Delta_r S^\\circ\\) first, then divide.",
      formula: {
        label: "Temperature at which ΔG changes sign",
        latex: "\\Delta G = 0\\ \\Rightarrow\\ T = \\frac{\\Delta H}{\\Delta S}",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{Br_2(l) \\to Br_2(g)}\\), \\(\\Delta H = 30.9\\) kJ mol⁻¹ and \\(\\Delta S = 93.0\\) J K⁻¹ mol⁻¹. Find the boiling point of bromine.",
        steps: [
          "At the boiling point \\(\\Delta G = 0\\), so \\(T = \\frac{\\Delta H}{\\Delta S}\\).",
          "\\(T = \\frac{30\\,900}{93.0} = 332\\) K.",
          "Both terms are positive, so vaporisation is spontaneous above 332 K (about 59 °C).",
        ],
        answer: "\\(\\approx 332\\) K.",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{2Ag_2O(s) \\to 4Ag(s) + O_2(g)}\\), \\(\\Delta H^\\circ = +62\\) kJ and \\(\\Delta S^\\circ = +133\\) J K⁻¹. Above what temperature does silver oxide decompose?",
        steps: [
          "Both positive: spontaneous above \\(T = \\frac{\\Delta H}{\\Delta S}\\).",
          "\\(T = \\frac{62\\,000}{133} = 466\\) K.",
        ],
        answer: "Above about 466 K.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta H = 45\\) kJ mol⁻¹ and \\(\\Delta S = 150\\) J K⁻¹ mol⁻¹. At what temperature is \\(\\Delta G = 0\\)?", answer: "\\(300\\) K" },
        {
          prompt: "\\(\\Delta H = -80\\) kJ and \\(\\Delta S = -200\\) J K⁻¹. Is the change spontaneous above or below a temperature, and which?",
          answer: "Below 400 K",
        },
        { prompt: "\\(\\Delta G^\\circ = 80 - 40\\log T\\) (kJ). Find the transition temperature.", answer: "\\(100\\) K" },
        {
          prompt: "\\(\\Delta H = 50\\) kJ mol⁻¹ and \\(\\Delta S = 0.5T\\) J K⁻¹ mol⁻¹. Find the lowest temperature at which the change is spontaneous.",
          answer: "\\(\\approx 316\\) K",
        },
      ],
      pyqExampleId: "aa644a64-1406-47eb-acb4-076115969361", // 2021 Paper 21 — FeO + C, minimum temperature from a data table
      traps: [
        {
          title: "A factor of a thousand",
          body:
            "With \\(\\Delta H = 60\\) kJ and \\(\\Delta S = 150\\) J K⁻¹, \\(T = 60\\,000/150 = 400\\) K, not 0.4 K. Convert before dividing.",
        },
        {
          title: "Below, not above",
          body:
            "For an exothermic change with falling entropy, \\(\\Delta H/\\Delta S\\) is the temperature to stay BELOW. Quoting it as a minimum temperature reverses the answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Gibbs Energy and the Equilibrium Constant — how far a change goes",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-equilibrium",
    },
  ],
};
