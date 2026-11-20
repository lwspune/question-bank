import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_TH_SPONTANEITY_NOTE: SubtopicNote = {
  subtopicName: "Entropy and Gibbs Energy",
  title: "Entropy and Gibbs Energy",
  oneLineDefinition:
    "Entropy as a measure of randomness, ΔS = q(rev)/T and the second law, Gibbs energy ΔG = ΔH − TΔS as the test of spontaneity, and the link ΔG° = −2.303RT log K with the equilibrium constant.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026. Three are on entropy: ΔU and the total entropy change for an irreversible isothermal expansion (2021), which processes raise entropy (2024), and the entropy change of the system and the surroundings in a free expansion (Re-NEET 2026). One finds ΔG° from ΔU and ΔS and judges spontaneity (2026), and two link ΔG° with the equilibrium constant: ΔG° from equilibrium concentrations (2023) and ΔS° of a protein at the temperature where K = 1 (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncht-entropy",
      name: "Entropy and the second law",
      intuition:
        "Energy alone does not decide whether a change happens by itself: ice melts in a warm room even though melting absorbs heat. The other factor is randomness. Entropy measures the disorder of a system: a gas is more random than a liquid, and a liquid more than a solid. A change happens on its own when the total entropy of the system and its surroundings goes up.",
      definition:
        "- **Entropy** S is a state function. For heat \\(q_{rev}\\) absorbed reversibly at temperature T (in kelvin), \\(\\Delta S = \\dfrac{q_{rev}}{T}\\).\n" +
        "- Entropy rises on melting, on vaporisation, on heating, and when a reaction makes more moles of gas: \\(\\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{Cl(g)}\\) raises it, crystallising a solid from solution lowers it.\n" +
        "- **Second law:** for a spontaneous process \\(\\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0\\). At equilibrium \\(\\Delta S_{total} = 0\\).\n" +
        "- At a phase change at its transition temperature (melting point, boiling point), \\(\\Delta S = \\dfrac{\\Delta H}{T}\\).\n" +
        "- Isothermal expansion of an ideal gas: \\(q_{rev} = -w_{rev}\\), so \\(\\Delta S_{sys} = 2.303\\,nR\\log\\dfrac{V_f}{V_i}\\). Because S is a state function, a free expansion between the same volumes has the same \\(\\Delta S_{sys}\\), even though no heat flows.\n" +
        "- **Third law:** the entropy of a perfectly crystalline substance is zero at 0 K.",
      formula: {
        label: "Entropy change",
        latex: "\\Delta S = \\frac{q_{rev}}{T}, \\qquad \\Delta S_{total} = \\Delta S_{sys} + \\Delta S_{surr} > 0 \\ \\text{(spontaneous)}",
        symbols: [
          { symbol: "\\(q_{rev}\\)", meaning: "heat absorbed by the system along a reversible path" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "The enthalpy of vaporisation of water is 40.7 kJ/mol at its boiling point, 373 K. Find the entropy change when one mole of water boils at 373 K.",
        steps: [
          "At the boiling point the change is reversible, so \\(\\Delta S = \\dfrac{\\Delta_{vap}H}{T}\\).",
          "\\(\\Delta S = \\dfrac{40700}{373} = 109.1\\) J/(K mol).",
        ],
        answer: "\\(\\Delta S \\approx +109\\) J/(K mol)",
      },
      selfCheckExample: {
        prompt:
          "Which of these raise the entropy of the system: (a) sugar crystallising from syrup, (b) camphor turning into vapour, (c) \\(\\text{H}_2\\text{(g)} \\rightarrow 2\\text{H(g)}\\)?",
        steps: [
          "(a) Molecules spread through a liquid settle into an ordered crystal: entropy falls.",
          "(b) A solid turns into a gas: entropy rises. (c) One mole of gas becomes two: entropy rises.",
        ],
        answer: "(b) and (c)",
      },
      practiceSet: [
        { prompt: "What is the entropy of a perfectly crystalline substance at 0 K?", answer: "Zero" },
        { prompt: "Ice melts at 273 K with an enthalpy of fusion of 6.0 kJ/mol. Find the entropy of fusion.", answer: "About 22 J/(K mol)" },
        { prompt: "Water boils at 100 °C and 1 atm. Is the entropy change of the surroundings positive or negative?", answer: "Negative: the surroundings give heat to the water" },
        { prompt: "What is the total entropy change for a process at equilibrium?", answer: "Zero" },
      ],
      pyqExampleId: "1754db94-1dc7-4b33-bd11-48f0eaba154d",
      traps: [
        {
          title: "Temperature in kelvin",
          body: "In \\(\\Delta S = \\dfrac{q_{rev}}{T}\\) the temperature must be in kelvin. Dividing by 100 for water boiling at 100 °C gives a value almost four times too big.",
        },
        {
          title: "No heat does not mean no entropy change",
          body: "In a free expansion \\(q = 0\\), yet the gas's entropy rises: S is a state function, so \\(\\Delta S_{sys}\\) is that of a reversible isothermal expansion between the same volumes. Only the surroundings, which exchange no heat, have \\(\\Delta S_{surr} = 0\\).",
        },
        {
          title: "It is the total entropy that must rise",
          body: "Water freezing below 0 °C lowers the system's entropy and is still spontaneous, because the heat it releases raises the surroundings' entropy by more. Judge spontaneity by \\(\\Delta S_{total}\\), not by \\(\\Delta S_{sys}\\) alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-gibbs",
      name: "Gibbs energy and spontaneity",
      visualizationSlug: "cet-gibbs-sign",
      intuition:
        "Working out the entropy of the surroundings every time is awkward. Gibbs energy rolls both tests into one quantity about the system alone. At constant temperature and pressure, a change is spontaneous when it lowers the Gibbs energy. A negative ΔH helps, a positive ΔS helps, and the temperature decides how much weight the entropy term gets.",
      definition:
        "- **Gibbs energy:** \\(G = H - TS\\), a state function and an extensive property. At constant temperature and pressure \\(\\Delta G = \\Delta H - T\\Delta S\\).\n" +
        "- \\(\\Delta G < 0\\): spontaneous. \\(\\Delta G > 0\\): non-spontaneous. \\(\\Delta G = 0\\): equilibrium.\n" +
        "- \\(-\\Delta G\\) is the useful work, other than expansion work, that the change can do.\n" +
        "- The signs decide when: \\(\\Delta H < 0, \\Delta S > 0\\): spontaneous at all temperatures. \\(\\Delta H < 0, \\Delta S < 0\\): spontaneous at low temperature. \\(\\Delta H > 0, \\Delta S > 0\\): spontaneous at high temperature. \\(\\Delta H > 0, \\Delta S < 0\\): non-spontaneous at all temperatures.\n" +
        "- Where the sign changes, \\(\\Delta G = 0\\), so \\(T = \\dfrac{\\Delta H}{\\Delta S}\\).\n" +
        "- If \\(\\Delta U\\) is given instead of \\(\\Delta H\\), first find \\(\\Delta H = \\Delta U + \\Delta n_g RT\\).",
      formula: {
        label: "Gibbs energy",
        latex: "\\Delta G = \\Delta H - T\\Delta S, \\qquad T_{\\text{change}} = \\frac{\\Delta H}{\\Delta S}",
        symbols: [
          { symbol: "\\(\\Delta G\\)", meaning: "Gibbs energy change; negative for a spontaneous change" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\text{CaCO}_3\\text{(s)} \\rightarrow \\text{CaO(s)} + \\text{CO}_2\\text{(g)}\\), \\(\\Delta H = +178\\) kJ/mol and \\(\\Delta S = +160\\) J/(K mol). Is it spontaneous at 298 K? Above what temperature does it become spontaneous?",
        steps: [
          "Change \\(\\Delta S\\) to kJ: \\(0.160\\) kJ/(K mol).",
          "At 298 K: \\(\\Delta G = 178 - 298 \\times 0.160 = 178 - 47.7 = +130.3\\) kJ/mol, so not spontaneous.",
          "It turns spontaneous where \\(\\Delta G = 0\\): \\(T = \\dfrac{178000}{160} = 1112.5\\) K.",
        ],
        answer: "Not at 298 K; spontaneous above about 1113 K",
      },
      selfCheckExample: {
        prompt: "A reaction is endothermic and its entropy falls. Can it be spontaneous at any temperature?",
        steps: [
          "\\(\\Delta H > 0\\) makes the first term positive.",
          "\\(\\Delta S < 0\\) makes \\(-T\\Delta S\\) positive too, so \\(\\Delta G > 0\\) at every temperature.",
        ],
        answer: "No, it is non-spontaneous at all temperatures",
      },
      practiceSet: [
        { prompt: "A reaction has ΔH = −40 kJ/mol and ΔS = −100 J/(K mol). Below what temperature is it spontaneous?", answer: "400 K" },
        { prompt: "What is ΔG for a system at equilibrium?", answer: "Zero" },
        { prompt: "An exothermic reaction has a positive ΔS. At which temperatures is it spontaneous?", answer: "At all temperatures" },
        { prompt: "Find ΔG at 300 K for ΔH = +20 kJ/mol and ΔS = +100 J/(K mol).", answer: "\\(-10\\) kJ/mol, so spontaneous" },
      ],
      pyqExampleId: "14bd8331-71c4-4668-80f3-a6aaa2118fd5",
      traps: [
        {
          title: "Put ΔS in kJ before you subtract",
          body: "\\(\\Delta S\\) is usually given in J/K and \\(\\Delta H\\) in kJ. Divide \\(T\\Delta S\\) by 1000 first, or the entropy term comes out a thousand times too big.",
        },
        {
          title: "A negative ΔH is not enough",
          body: "Spontaneity is decided by \\(\\Delta G\\), not by \\(\\Delta H\\) alone. An exothermic reaction with falling entropy stops being spontaneous at high temperature, and an endothermic one with rising entropy becomes spontaneous there.",
        },
        {
          title: "Change ΔU into ΔH first",
          body: "\\(\\Delta G = \\Delta H - T\\Delta S\\) uses \\(\\Delta H\\). When a question gives \\(\\Delta U\\) for a gas reaction, add \\(\\Delta n_g RT\\) before using it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-gibbs-k",
      name: "Gibbs energy and the equilibrium constant",
      intuition:
        "A reaction mixture slides towards lower Gibbs energy until it can go no lower: that is equilibrium. So the standard Gibbs energy change tells you where the equilibrium lies. A large negative ΔG° means the products are strongly favoured and K is large; a positive ΔG° means K is less than 1.",
      definition:
        "- At equilibrium \\(\\Delta_r G = 0\\), and the standard Gibbs energy change is linked to K: \\(\\Delta_r G^\\ominus = -RT\\ln K = -2.303\\,RT\\log K\\).\n" +
        "- \\(K > 1\\): \\(\\Delta_r G^\\ominus\\) is negative. \\(K = 1\\): \\(\\Delta_r G^\\ominus = 0\\). \\(K < 1\\): \\(\\Delta_r G^\\ominus\\) is positive.\n" +
        "- Combined with \\(\\Delta_r G^\\ominus = \\Delta_r H^\\ominus - T\\Delta_r S^\\ominus\\): when \\(K = 1\\), \\(\\Delta_r H^\\ominus = T\\Delta_r S^\\ominus\\).\n" +
        "- R sets the unit of the answer: 8.314 J/(K mol) gives joules, 2 cal/(K mol) gives calories.",
      formula: {
        label: "Gibbs energy and K",
        latex: "\\Delta_r G^\\ominus = -RT\\ln K = -2.303\\,RT\\log K",
        symbols: [
          { symbol: "\\(K\\)", meaning: "equilibrium constant of the reaction" },
          { symbol: "\\(\\Delta_r G^\\ominus\\)", meaning: "standard Gibbs energy change of the reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "A reaction has \\(\\Delta_r G^\\ominus = -11.49\\) kJ/mol at 300 K. Find its equilibrium constant (R = 8.314 J/(K mol)).",
        steps: [
          "\\(\\log K = \\dfrac{-\\Delta_r G^\\ominus}{2.303\\,RT} = \\dfrac{11490}{2.303 \\times 8.314 \\times 300}\\).",
          "The denominator is \\(5744\\), so \\(\\log K = 2.00\\).",
          "\\(K = 10^{2} = 100\\).",
        ],
        answer: "\\(K = 100\\)",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(\\Delta H^\\ominus = +40\\) kJ/mol and \\(\\Delta S^\\ominus = +125\\) J/(K mol). Find its equilibrium constant at 320 K.",
        steps: [
          "\\(\\Delta G^\\ominus = 40 - 320 \\times 0.125 = 40 - 40 = 0\\).",
          "\\(\\Delta G^\\ominus = -2.303\\,RT\\log K = 0\\) gives \\(\\log K = 0\\).",
        ],
        answer: "\\(K = 1\\)",
      },
      practiceSet: [
        { prompt: "If ΔG° of a reaction is positive, is its equilibrium constant greater or less than 1?", answer: "Less than 1" },
        { prompt: "At equilibrium, what is ΔG of a reaction (not ΔG°)?", answer: "Zero" },
        { prompt: "A reaction has ΔG° = +5.744 kJ/mol at 300 K. Find K (R = 8.314 J/(K mol)).", answer: "\\(K = 0.1\\)" },
        { prompt: "Write ΔG° in terms of the equilibrium constant using log to the base 10.", answer: "\\(\\Delta G^\\ominus = -2.303\\,RT\\log K\\)" },
      ],
      pyqExampleId: "cab6591d-8679-497a-9fdb-7a91a5871fdd",
      traps: [
        {
          title: "2.303 goes with log, not ln",
          body: "\\(-RT\\ln K\\) and \\(-2.303\\,RT\\log K\\) are the same quantity. Use 2.303 only when you take the logarithm to base 10.",
        },
        {
          title: "ΔG° is not ΔG",
          body: "At equilibrium \\(\\Delta_r G = 0\\) for every reaction. \\(\\Delta_r G^\\ominus\\) is zero only in the special case \\(K = 1\\).",
        },
        {
          title: "Products over reactants",
          body: "Build K with the products' concentrations on top. Turning it upside down changes the sign of \\(\\log K\\) and so the sign of \\(\\Delta_r G^\\ominus\\).",
        },
      ],
    },
  ],
};
