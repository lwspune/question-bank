import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_COLLIGATIVE_NOTE: SubtopicNote = {
  subtopicName: "Colligative Properties and Determination of Molar Mass",
  title: "Colligative Properties and Molar Mass",
  oneLineDefinition:
    "The four colligative properties (relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure), the formula for each, and how each one gives the molar mass of a solute.",
  whyItMatters:
    "71 questions, the biggest page of the chapter. Fifty-six were set in board papers, in every year from 2023 to 2026. The board asks for the molar mass from the lowering of vapour pressure (2023, 2024), from the elevation of boiling point (2024, and twice in 2026) and from the depression of freezing point (2024, twice); the freezing point of a glucose or an ethylene glycol solution (2026) and the mass of antifreeze for a radiator (2024); Kf and its relation to the enthalpy of fusion (2024, 2026); which of four solutions boils highest or freezes lowest (2023, 2025, 2026); why osmotic pressure is used for proteins and polymers (every year); isotonic solutions and molar mass from them (2023, 2025, and four times in 2024); reverse osmosis (2025, 2026); cells, mangoes and raisins in solutions (2025, 2026); salt on snowy roads (2025, 2026); and assertion-reason items on why the boiling point rises and the freezing point falls (2023, 2024). A 2024 question (60 g of a solute in 250 g of water freezing at 270.67 K: find the molar mass) came back in 2026 turned round: 60 g of glucose in 250 g of water, find the freezing point.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcso-rlvp",
      name: "Colligative properties and the relative lowering of vapour pressure",
      intuition:
        "Some properties of a solution depend only on how many solute particles there are, not on what they are: these are colligative properties. All four grow out of one fact, that a non-volatile solute lowers the vapour pressure of the solvent. The fraction by which it falls, the relative lowering, is exactly the mole fraction of the solute.",
      definition:
        "- **Colligative properties** depend on the number of solute particles, irrespective of their nature, relative to the total number of particles in the solution. The four: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmotic pressure.\n" +
        "- **Relative lowering of vapour pressure** equals the mole fraction of the solute: \\(\\dfrac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = x_2 = \\dfrac{n_2}{n_1 + n_2}\\).\n" +
        "- For a dilute solution \\(n_2 \\ll n_1\\), so \\(\\dfrac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = \\dfrac{n_2}{n_1} = \\dfrac{w_2 \\times M_1}{M_2 \\times w_1}\\), which gives the molar mass \\(M_2\\).\n" +
        "- The relative lowering has no unit; the lowering itself, \\(p_1^{\\circ} - p_1\\), is in pressure units.",
      formula: {
        label: "Relative lowering of vapour pressure",
        latex: "\\frac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = x_2 \\approx \\frac{w_2 \\times M_1}{M_2 \\times w_1}",
        symbols: [
          { symbol: "\\(p_1^{\\circ}, p_1\\)", meaning: "vapour pressure of the pure solvent and of the solution" },
          { symbol: "\\(w_1, M_1\\)", meaning: "mass and molar mass of the solvent" },
          { symbol: "\\(w_2, M_2\\)", meaning: "mass and molar mass of the solute" },
        ],
      },
      authoredExample: {
        prompt: "The vapour pressure of pure benzene (molar mass 78 g mol⁻¹) is 640 mm Hg at a certain temperature. When 2.0 g of a non-volatile solute is dissolved in 78 g of benzene, the vapour pressure falls to 632 mm Hg. Calculate the molar mass of the solute.",
        steps: [
          "Given: \\(p_1^{\\circ} = 640\\) mm Hg, \\(p_1 = 632\\) mm Hg, \\(w_2 = 2.0\\) g, \\(w_1 = 78\\) g, \\(M_1 = 78\\) g mol⁻¹.",
          "Formula (dilute solution): \\(\\dfrac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = \\dfrac{w_2 \\times M_1}{M_2 \\times w_1}\\).",
          "Substitution: \\(\\dfrac{640 - 632}{640} = \\dfrac{2.0 \\times 78}{M_2 \\times 78}\\), so \\(0.0125 = \\dfrac{2.0}{M_2}\\).",
          "\\(M_2 = \\dfrac{2.0}{0.0125} = 160\\) g mol⁻¹.",
        ],
        answer: "160 g mol⁻¹",
      },
      selfCheckExample: {
        prompt: "The relative lowering of vapour pressure of a solution of a non-volatile solute is 0.04. What is the mole fraction of the solvent?",
        steps: ["Relative lowering = mole fraction of solute = 0.04.", "Mole fraction of solvent = 1 − 0.04."],
        answer: "0.96",
      },
      practiceSet: [
        { prompt: "Name the four colligative properties.", answer: "Relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure" },
        { prompt: "The vapour pressure of water is 23.8 mm Hg. A solution has a solute mole fraction of 0.01. Find its vapour pressure.", answer: "\\(23.8 \\times 0.99 = 23.56\\) mm Hg" },
        { prompt: "Why is the relative lowering of vapour pressure a colligative property?", answer: "It equals the mole fraction of the solute, which depends on the number of solute particles and not on their nature" },
      ],
      pyqExampleId: "622d3ab1-7a7b-432b-b42b-d5f694193c47",
      traps: [
        {
          title: "Taking 100 g of water from a percentage",
          body: "A 5% solution by mass has 5 g of solute in 95 g of water. Using 100 g for the water is the commonest slip in these questions.",
        },
        {
          title: "Confusing the lowering with the relative lowering",
          body: "The lowering \\(p_1^{\\circ} - p_1\\) has a pressure unit; the relative lowering divides it by \\(p_1^{\\circ}\\) and has none. Answer what is asked: the lowering, the relative lowering or the vapour pressure of the solution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-boiling",
      name: "Elevation of boiling point",
      intuition:
        "A liquid boils when its vapour pressure reaches the atmospheric pressure. A non-volatile solute lowers the vapour pressure at every temperature, so the solution has to be heated further before it boils. The rise is proportional to the molality, and the constant depends only on the solvent.",
      definition:
        "- The vapour pressure of a solution is lower than that of the pure solvent, so its boiling point \\(T_b\\) is higher than \\(T_b^{\\circ}\\) of the solvent. Elevation: \\(\\Delta T_b = T_b - T_b^{\\circ}\\).\n" +
        "- For dilute solutions \\(\\Delta T_b = K_b\\,m\\). \\(K_b\\) is the **boiling point elevation constant** or **molal elevation constant** (ebullioscopic constant), unit K kg mol⁻¹. For water \\(K_b = 0.52\\) K kg mol⁻¹.\n" +
        "- **Molar mass:** with \\(m = \\dfrac{w_2 \\times 1000}{M_2 \\times w_1}\\), \\(M_2 = \\dfrac{K_b \\times w_2 \\times 1000}{\\Delta T_b \\times w_1}\\) (\\(w_1, w_2\\) in grams).\n" +
        "- \\(K_b = \\dfrac{R \\times M_1 \\times T_b^2}{1000 \\times \\Delta_{\\text{vap}}H}\\): it depends on the nature of the solvent only, not on the solute or its amount.\n" +
        "- A difference of two temperatures is the same number in °C and in K.\n" +
        "- More particles give a larger elevation: at the same concentration KCl (two ions) or K₂SO₄ (three ions) raises the boiling point more than glucose. A VOLATILE solute such as methyl alcohol adds its own vapour pressure, so it lowers the boiling point instead.",
      formula: {
        label: "Elevation of boiling point",
        latex: "\\Delta T_b = K_b\\,m, \\qquad M_2 = \\frac{K_b \\times w_2 \\times 1000}{\\Delta T_b \\times w_1}",
      },
      authoredExample: {
        prompt: "3.42 g of sucrose (molar mass 342 g mol⁻¹) is dissolved in 50 g of water. Find the boiling point of the solution. (\\(K_b\\) for water = 0.52 K kg mol⁻¹, boiling point of water = 373.15 K)",
        steps: [
          "Given: \\(w_2 = 3.42\\) g, \\(M_2 = 342\\) g mol⁻¹, \\(w_1 = 50\\) g = 0.050 kg.",
          "Molality: \\(m = \\dfrac{3.42/342}{0.050} = \\dfrac{0.010}{0.050} = 0.20\\) mol kg⁻¹.",
          "Formula: \\(\\Delta T_b = K_b\\,m = 0.52 \\times 0.20 = 0.104\\) K.",
          "\\(T_b = 373.15 + 0.104 = 373.254\\) K.",
        ],
        answer: "373.25 K (an elevation of 0.104 K)",
      },
      selfCheckExample: {
        prompt: "What molality of a non-volatile non-electrolyte in water raises the boiling point by 0.26 K? (\\(K_b\\) = 0.52 K kg mol⁻¹)",
        steps: ["\\(m = \\dfrac{\\Delta T_b}{K_b} = \\dfrac{0.26}{0.52}\\)."],
        answer: "0.50 mol kg⁻¹",
      },
      practiceSet: [
        { prompt: "What does \\(K_b = 0.52\\) K kg mol⁻¹ for water mean?", answer: "A 1 molal solution of a non-volatile non-electrolyte in water boils 0.52 K above pure water" },
        { prompt: "Which boils at the higher temperature: 0.1 m glucose or 0.1 m NaCl in water?", answer: "0.1 m NaCl, because each formula unit gives two ions, so there are more particles" },
        { prompt: "If the molality of a dilute solution is tripled, what happens to \\(K_b\\)?", answer: "Nothing. \\(K_b\\) depends only on the solvent; it is \\(\\Delta T_b\\) that triples" },
      ],
      pyqExampleId: "29f655d7-b603-4f95-aeab-0dd8bb83f9c5",
      traps: [
        {
          title: "Thinking Kb changes with the amount of solute",
          body: "\\(K_b\\) is a property of the solvent alone. When the molality changes, the elevation changes and \\(K_b\\) stays the same. The board set this as a 2023 MCQ.",
        },
        {
          title: "A reason that only names the property",
          body: "\"Elevation of boiling point is a colligative property\" classifies the effect; it does not explain why adding NaCl raises the boiling point. The explanation is the lowering of vapour pressure. The 2024 item on this was code (B).",
        },
        {
          title: "Forgetting to add the elevation",
          body: "When the boiling point is asked, add \\(\\Delta T_b\\) to the solvent's boiling point and give the unit. Stopping at \\(\\Delta T_b\\) loses the last mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-freezing",
      name: "Depression of freezing point",
      intuition:
        "A liquid freezes where its vapour pressure equals that of its solid. The solute lowers the liquid's vapour pressure, so the two become equal only at a lower temperature. That is why sea water freezes below 0 °C and why ethylene glycol in a car radiator stops the water freezing in winter.",
      definition:
        "- A solution freezes when its vapour pressure equals that of the pure solid solvent. The solute lowers the vapour pressure, so the freezing point falls: \\(\\Delta T_f = T_f^{\\circ} - T_f\\).\n" +
        "- For dilute solutions \\(\\Delta T_f = K_f\\,m\\). \\(K_f\\) is the **freezing point depression constant** or **molal depression constant** (cryoscopic constant), unit K kg mol⁻¹. For water \\(K_f = 1.86\\) K kg mol⁻¹.\n" +
        "- **Molar mass:** \\(M_2 = \\dfrac{K_f \\times w_2 \\times 1000}{\\Delta T_f \\times w_1}\\) (\\(w_1, w_2\\) in grams).\n" +
        "- **Relation to the enthalpy of fusion:** \\(K_f = \\dfrac{R \\times M_1 \\times T_f^2}{1000 \\times \\Delta_{\\text{fus}}H}\\), with \\(M_1\\) the molar mass of the solvent and \\(T_f\\) its freezing point in kelvin. It depends on the solvent only.\n" +
        "- Ethylene glycol is used as an antifreeze in car radiators. Salt sprinkled on snow-covered roads dissolves in the film of water on the snow; the solution freezes below 0 °C, so the snow melts. The present NCERT chapter does not discuss salt on roads, but the board asked it in 2023, 2025 and 2026.",
      formula: {
        label: "Depression of freezing point",
        latex: "\\Delta T_f = K_f\\,m, \\qquad M_2 = \\frac{K_f \\times w_2 \\times 1000}{\\Delta T_f \\times w_1}, \\qquad K_f = \\frac{R\\,M_1\\,T_f^2}{1000\\,\\Delta_{\\text{fus}}H}",
      },
      authoredExample: {
        prompt: "0.50 g of a non-volatile non-electrolyte dissolved in 20 g of benzene lowers its freezing point by 0.64 K. \\(K_f\\) for benzene is 5.12 K kg mol⁻¹. Find the molar mass of the solute.",
        steps: [
          "Given: \\(w_2 = 0.50\\) g, \\(w_1 = 20\\) g, \\(\\Delta T_f = 0.64\\) K, \\(K_f = 5.12\\) K kg mol⁻¹.",
          "Formula: \\(M_2 = \\dfrac{K_f \\times w_2 \\times 1000}{\\Delta T_f \\times w_1}\\).",
          "Substitution: \\(M_2 = \\dfrac{5.12 \\times 0.50 \\times 1000}{0.64 \\times 20} = \\dfrac{2560}{12.8}\\).",
          "\\(M_2 = 200\\) g mol⁻¹.",
        ],
        answer: "200 g mol⁻¹",
      },
      selfCheckExample: {
        prompt: "Find the freezing point of a 0.20 m solution of naphthalene in benzene. (\\(K_f\\) for benzene = 5.12 K kg mol⁻¹; benzene freezes at 278.6 K)",
        steps: ["\\(\\Delta T_f = K_f\\,m = 5.12 \\times 0.20 = 1.024\\) K.", "\\(T_f = 278.6 - 1.024 = 277.58\\) K."],
        answer: "277.58 K",
      },
      practiceSet: [
        { prompt: "Why is salt sprinkled on snow-covered roads in hilly areas? Name the colligative property.", answer: "The salt solution formed freezes below 0 °C, so the snow melts; depression of freezing point" },
        { prompt: "Which freezes at the lower temperature: 0.1 M KCl or 0.1 M Na₂SO₄?", answer: "0.1 M Na₂SO₄, which gives three ions per formula unit against two" },
        { prompt: "On which quantities of the solvent does \\(K_f\\) depend?", answer: "Its molar mass, its freezing point and its enthalpy of fusion (and the gas constant R)" },
      ],
      pyqExampleId: "1f265118-27c8-4c92-a6d6-468328daa52b",
      traps: [
        {
          title: "Giving the depression as the freezing point",
          body: "\\(\\Delta T_f\\) is a fall. Subtract it from the freezing point of the pure solvent (273.15 K or 0 °C for water). A freezing point above 0 °C for an aqueous solution is always wrong.",
        },
        {
          title: "Saying the solute raises the vapour pressure",
          body: "A non-volatile solute LOWERS the vapour pressure, and that lowering causes the depression. A 2023 reason that said the vapour pressure increases was false.",
        },
        {
          title: "Using the dissociation as the cause",
          body: "Glucose and urea lower the freezing point too, without dissociating. Dissociation of NaCl changes the size of the depression, not the reason for it. The 2024 item on this was code (B).",
        },
        {
          title: "Kf for water with another solvent",
          body: "Use the \\(K_f\\) of the solvent named in the question. Benzene, acetic acid and water each have their own value; picking water's value out of habit wrecks the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-osmotic",
      name: "Osmosis, osmotic pressure and reverse osmosis",
      intuition:
        "Put a membrane with tiny pores between water and a sugar solution. Water molecules pass through, sugar molecules cannot, and water flows into the solution. Push on the solution just hard enough and the flow stops: that push is the osmotic pressure. Push harder and the water is squeezed out of the solution: reverse osmosis, which turns sea water into drinking water.",
      definition:
        "- **Semipermeable membrane (SPM):** lets solvent molecules through but hinders solute molecules. Natural: pig's bladder, parchment. Synthetic: cellophane.\n" +
        "- **Osmosis:** the flow of solvent through an SPM from pure solvent to solution, or from a dilute to a concentrated solution.\n" +
        "- **Osmotic pressure (π):** the excess pressure that must be applied to a solution to prevent osmosis. For dilute solutions \\(\\pi = CRT = \\dfrac{n_2}{V}RT\\), so \\(M_2 = \\dfrac{w_2 RT}{\\pi V}\\). C is the MOLARITY.\n" +
        "- **Why it suits proteins and polymers:** it is measured around room temperature, uses molarity, and is large even for very dilute solutions; biomolecules are not stable at higher temperatures and polymers have poor solubility.\n" +
        "- **Isotonic:** same osmotic pressure at a given temperature; no osmosis between them. For the same volume, \\(\\dfrac{w_1}{M_1} = \\dfrac{w_2}{M_2}\\). Blood cells are isotonic with 0.9% (mass/volume) NaCl (normal saline). Above 0.9% the solution is hypertonic and cells shrink; below it, hypotonic and cells swell.\n" +
        "- **Reverse osmosis:** a pressure larger than the osmotic pressure applied to the solution side drives pure solvent out through the SPM. Used for desalination of sea water, with a film of cellulose acetate as the membrane.\n" +
        "- Everyday osmosis: raw mangoes shrivel in brine, wilted flowers revive in fresh water, meat is preserved by salting.",
      formula: {
        label: "Osmotic pressure",
        latex: "\\pi = CRT = \\frac{n_2 RT}{V}, \\qquad M_2 = \\frac{w_2 RT}{\\pi V}",
        symbols: [
          { symbol: "\\(C\\)", meaning: "molarity of the solution, mol per litre" },
          { symbol: "\\(V\\)", meaning: "volume of the solution in litres" },
          { symbol: "\\(R\\)", meaning: "0.083 L bar K⁻¹ mol⁻¹ (or 0.0821 L atm K⁻¹ mol⁻¹)" },
        ],
      },
      authoredExample: {
        prompt: "0.50 g of a polymer is dissolved in water to make 250 mL of solution. Its osmotic pressure at 300 K is 1.0 × 10⁻³ bar. Find the molar mass of the polymer. (R = 0.083 L bar K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(w_2 = 0.50\\) g, \\(V = 250\\) mL = 0.250 L, \\(T = 300\\) K, \\(\\pi = 1.0 \\times 10^{-3}\\) bar.",
          "Formula: \\(M_2 = \\dfrac{w_2 RT}{\\pi V}\\).",
          "Substitution: \\(M_2 = \\dfrac{0.50 \\times 0.083 \\times 300}{1.0 \\times 10^{-3} \\times 0.250} = \\dfrac{12.45}{2.5 \\times 10^{-4}}\\).",
          "\\(M_2 = 4.98 \\times 10^{4}\\) g mol⁻¹.",
        ],
        answer: "4.98 × 10⁴ g mol⁻¹ (49 800 g mol⁻¹)",
      },
      selfCheckExample: {
        prompt: "Find the osmotic pressure of a 0.05 M glucose solution at 300 K. (R = 0.083 L bar K⁻¹ mol⁻¹)",
        steps: ["\\(\\pi = CRT = 0.05 \\times 0.083 \\times 300\\)."],
        answer: "1.245 bar",
      },
      practiceSet: [
        { prompt: "What happens to red blood cells placed in a 1.5% (mass/volume) NaCl solution?", answer: "They shrink: the solution is hypertonic, so water flows out of the cells" },
        { prompt: "Name the membrane commonly used for desalination of sea water by reverse osmosis.", answer: "A film of cellulose acetate on a suitable support" },
        { prompt: "Two solutions are isotonic. What is equal for them at the same temperature?", answer: "Their osmotic pressures, and so their molar concentrations of solute particles" },
        { prompt: "Wilted flowers revive in fresh water. Name the process.", answer: "Osmosis" },
      ],
      pyqExampleId: "219d99db-fee3-45a5-88d8-63dbf73be334",
      traps: [
        {
          title: "Using molality in the osmotic pressure equation",
          body: "Osmotic pressure is proportional to MOLARITY. A 2023 reason that said molality was false. The other three colligative properties use molality.",
        },
        {
          title: "Leaving T in °C or V in mL",
          body: "Convert the temperature to kelvin and the volume to litres before substituting. 27 °C in place of 300 K makes the answer about eleven times wrong.",
        },
        {
          title: "Isotonic means equal mass",
          body: "Isotonic solutions have equal osmotic pressure, so equal MOLES of particles per litre. The heavier solute needs a larger mass for the same effect.",
        },
        {
          title: "Getting reverse osmosis backwards",
          body: "In reverse osmosis the applied pressure is MORE than the osmotic pressure, and it is applied on the SOLUTION side, so pure solvent comes out of the solution.",
        },
      ],
    },
  ],
};
