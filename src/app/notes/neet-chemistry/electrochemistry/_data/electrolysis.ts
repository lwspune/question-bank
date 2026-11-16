import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EC_ELECTROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Electrolysis, Batteries and Corrosion",
  title: "Electrolysis, Batteries and Corrosion",
  oneLineDefinition:
    "Faraday's laws of electrolysis, the charge needed for a conversion, the products of electrolysis, the common primary and secondary batteries, fuel cells, and corrosion as an electrochemical process.",
  whyItMatters:
    "Four NEET questions from 2024 to 2026. Two find the mass of copper deposited from copper sulphate by a given current (2024, 2026). One matches four conversions to the number of faradays each needs (2024). One asks which of four processes is not corrosion (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchec-faraday",
      name: "Faraday's laws of electrolysis",
      intuition:
        "In electrolysis an outside battery pushes electrons into a solution or a melt and forces a reaction that would not go by itself. Every ion reduced at the cathode takes a fixed number of electrons, so the amount of substance deposited is set by how much charge has passed. Count the moles of electrons, divide by the electrons each ion needs, and you have the moles deposited.",
      definition:
        "- **First law:** the amount of chemical reaction at an electrode is proportional to the quantity of electricity passed: \\(m = ZQ\\), where Z is the electrochemical equivalent.\n" +
        "- **Second law:** the same quantity of electricity liberates different substances in amounts proportional to their chemical equivalent weights (atomic mass divided by the electrons needed to reduce the cation).\n" +
        "- Charge \\(Q = It\\), with I in amperes and t in seconds.\n" +
        "- One faraday (F) is the charge on one mole of electrons: \\(F = 96487\\ \\text{C mol}^{-1}\\), often rounded to 96500.\n" +
        "- Mass deposited: \\(m = \\dfrac{M\\,I\\,t}{nF}\\), where n is the number of electrons per ion (2 for \\(\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}\\)).",
      formula: {
        label: "Mass deposited in electrolysis",
        latex: "Q = It, \\qquad m = \\frac{M\\,I\\,t}{nF}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "molar mass of the substance deposited" },
          { symbol: "\\(n\\)", meaning: "electrons needed per ion" },
          { symbol: "\\(t\\)", meaning: "time, in seconds" },
        ],
      },
      authoredExample: {
        prompt:
          "Two cells, one with CuSO₄ solution and one with AgNO₃ solution, are joined in series, so the same charge passes through both. 0.635 g of copper is deposited in the first. What mass of silver is deposited in the second? (Cu = 63.5, Ag = 108 g mol⁻¹)",
        steps: [
          "By the second law, the masses are in the ratio of the equivalent weights.",
          "Equivalent weight of Cu \\(= \\dfrac{63.5}{2} = 31.75\\); of Ag \\(= \\dfrac{108}{1} = 108\\).",
          "Equivalents of Cu deposited \\(= \\dfrac{0.635}{31.75} = 0.02\\), so 0.02 equivalent of Ag is deposited too.",
          "\\(m(\\text{Ag}) = 0.02 \\times 108 = 2.16\\) g.",
        ],
        answer: "2.16 g",
      },
      selfCheckExample: {
        prompt:
          "For how long must a current of 5 A pass through molten sodium chloride to liberate 0.1 mol of chlorine gas? (F = 96500 C mol⁻¹)",
        steps: [
          "\\(2\\text{Cl}^{-} \\rightarrow \\text{Cl}_2 + 2e^-\\): each mole of Cl₂ needs 2 mol of electrons, so 0.1 mol needs 0.2 mol.",
          "\\(Q = 0.2 \\times 96500 = 19300\\) C.",
          "\\(t = \\dfrac{Q}{I} = \\dfrac{19300}{5} = 3860\\) s.",
        ],
        answer: "3860 s (about 64 minutes)",
      },
      practiceSet: [
        { prompt: "What charge, in coulombs, passes when a current of 2 A flows for 5 minutes?", answer: "600 C" },
        { prompt: "How many moles of electrons are there in 9650 C?", answer: "0.1 mol (taking F = 96500 C)" },
        { prompt: "The charge passed through a copper sulphate solution is doubled. What happens to the mass of copper deposited?", answer: "It doubles (first law)" },
        { prompt: "State Faraday's second law of electrolysis in one line.", answer: "The same charge liberates substances in proportion to their equivalent weights" },
      ],
      pyqExampleId: "d8262869-ecfc-4b04-886d-5f1a28da6c4c",
      traps: [
        {
          title: "Time in seconds",
          body: "\\(Q = It\\) needs t in seconds. Ten minutes is 600 s; putting in 10 gives an answer 60 times too small.",
        },
        {
          title: "Divide by the electrons per ion",
          body: "Cu²⁺ takes 2 electrons per atom, so the moles of copper are half the moles of electrons. Forgetting the 2 doubles the mass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-charge",
      name: "Charge for a conversion and products of electrolysis",
      intuition:
        "The faradays a conversion needs are the moles of electrons it moves, and that is just the change in oxidation number times the moles of atoms that change. Which product appears is a separate question: when more than one reaction is possible at an electrode, the easier one wins. Water itself can be reduced or oxidised, so an aqueous solution often gives a different product from the same salt melted.",
      definition:
        "- Faradays needed = moles of the species × electrons gained or lost per formula unit (the change in oxidation number).\n" +
        "- \\(\\text{MnO}_4^{-} \\rightarrow \\text{Mn}^{2+}\\): Mn goes from +7 to +2, so 5 F per mole.\n" +
        "- Molten NaCl: sodium metal at the cathode, Cl₂ at the anode.\n" +
        "- Aqueous NaCl: H₂ at the cathode (water is reduced more easily than Na⁺, since \\(E^\\circ(\\text{Na}^{+}/\\text{Na}) = -2.71\\) V); Cl₂ at the anode (oxygen would need an overpotential); NaOH is left in solution.\n" +
        "- Dilute H₂SO₄: O₂ at the anode. Concentrated H₂SO₄: peroxodisulphate, \\(\\text{S}_2\\text{O}_8^{2-}\\), at the anode.\n" +
        "- Aqueous CuSO₄ with copper electrodes: copper dissolves from the anode and is deposited on the cathode, the basis of refining copper.\n" +
        "- An inert electrode (platinum, gold) takes no part in the reaction; a reactive electrode can.",
      formula: {
        label: "Charge for a conversion",
        latex: "\\text{Faradays} = \\text{moles} \\times \\left|\\Delta(\\text{oxidation number})\\right| \\text{ per formula unit}",
      },
      authoredExample: {
        prompt:
          "How many faradays are needed to reduce 1 mol of dichromate ion, \\(\\text{Cr}_2\\text{O}_7^{2-}\\), to \\(\\text{Cr}^{3+}\\)?",
        steps: [
          "Each Cr goes from +6 to +3: a gain of 3 electrons.",
          "One dichromate ion has two Cr atoms, so it takes \\(2 \\times 3 = 6\\) electrons.",
          "For 1 mol of dichromate: 6 mol of electrons, that is 6 F.",
        ],
        answer: "6 F",
      },
      selfCheckExample: {
        prompt: "Aqueous sodium chloride is electrolysed between inert electrodes. Name the product at each electrode and what is left in the solution.",
        steps: [
          "At the cathode water is reduced rather than Na⁺: \\(\\text{H}_2\\text{O} + e^- \\rightarrow \\tfrac{1}{2}\\text{H}_2 + \\text{OH}^{-}\\).",
          "At the anode Cl⁻ is oxidised to Cl₂, because oxygen would need an overpotential.",
          "Na⁺ and OH⁻ stay in the solution.",
        ],
        answer: "H₂ at the cathode, Cl₂ at the anode, NaOH in solution",
      },
      practiceSet: [
        { prompt: "What are the products when molten sodium chloride is electrolysed?", answer: "Sodium at the cathode, chlorine at the anode" },
        { prompt: "Which gas forms at the anode when dilute sulphuric acid is electrolysed?", answer: "Oxygen" },
        { prompt: "In refining copper, what happens at the copper anode?", answer: "Copper dissolves as Cu²⁺" },
        { prompt: "Why is sodium not formed at the cathode when aqueous NaCl is electrolysed?", answer: "Water is reduced to H₂ more easily than Na⁺ is reduced" },
      ],
      pyqExampleId: "65ab4b64-09bc-445d-89ea-edb47efde236",
      traps: [
        {
          title: "Say per mole of what",
          body: "Getting aluminium from Al₂O₃ takes 3 F per mole of Al but 6 F per mole of Al₂O₃, which holds two Al atoms. Read which substance the question counts in moles before you multiply.",
        },
        {
          title: "Molten and aqueous give different products",
          body: "Molten NaCl gives sodium at the cathode. Aqueous NaCl gives hydrogen there, because water is reduced first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchec-batteries",
      name: "Batteries, fuel cells and corrosion",
      intuition:
        "A battery is a galvanic cell built to be useful: steady voltage, small and safe. A primary battery is used once and thrown away; a secondary battery can be recharged by passing current the other way. A fuel cell is a galvanic cell fed with fuel all the time. Corrosion is a galvanic cell nobody wanted: one spot of a metal surface acts as the anode and is slowly eaten away.",
      definition:
        "- **Primary batteries** cannot be recharged: the dry (Leclanché) cell and the mercury cell.\n" +
        "- **Secondary batteries** can be recharged: the lead storage battery and the nickel-cadmium cell.\n" +
        "- Lead storage battery on discharge: \\(\\text{Pb} + \\text{PbO}_2 + 2\\text{H}_2\\text{SO}_4 \\rightarrow 2\\text{PbSO}_4 + 2\\text{H}_2\\text{O}\\). Charging reverses it.\n" +
        "- **Fuel cells** turn the energy of combustion of a fuel such as hydrogen directly into electricity. In the hydrogen-oxygen cell: \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\). It runs at about 70% efficiency, against about 40% for a thermal power plant.\n" +
        "- **Corrosion** slowly coats a metal surface with its oxides or other salts: rusting of iron, tarnishing of silver, the green coating on copper and bronze.\n" +
        "- Rusting: at an anode spot \\(\\text{Fe} \\rightarrow \\text{Fe}^{2+} + 2e^-\\); at a cathode spot O₂ is reduced with H⁺ (from carbonic acid in the water). Overall \\(2\\text{Fe} + \\text{O}_2 + 4\\text{H}^{+} \\rightarrow 2\\text{Fe}^{2+} + 2\\text{H}_2\\text{O}\\), \\(E^\\circ_{cell} = 1.67\\) V. Fe²⁺ is oxidised further to rust, \\(\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}\\).\n" +
        "- Prevention: a coat of paint or chemicals, a coat of another metal (Sn, Zn), or a sacrificial electrode of a more active metal (Mg, Zn) that corrodes instead.",
      table: {
        columns: ["Cell or process", "Kind", "What to remember"],
        rows: [
          { cells: ["Dry (Leclanché) cell", "Primary", "Zinc container anode; carbon rod cathode in MnO₂ and carbon; moist NH₄Cl and ZnCl₂ paste; about 1.5 V"] },
          { cells: ["Mercury cell", "Primary", "Zinc-mercury amalgam anode; HgO and carbon cathode; KOH and ZnO paste; about 1.35 V, steady over its life"] },
          { cells: ["Lead storage battery", "Secondary", "Lead anode, PbO₂ cathode, 38% sulphuric acid; both electrodes turn to PbSO₄ on discharge"] },
          { cells: ["Nickel-cadmium cell", "Secondary", "Rechargeable, with a longer life than the lead storage battery"] },
          { cells: ["Hydrogen-oxygen fuel cell", "Fuel cell", "Porous carbon electrodes with Pt or Pd catalyst, concentrated NaOH electrolyte; used in the Apollo space programme"] },
          { cells: ["Rusting of iron", "Corrosion", "Iron is the anode and is oxidised; rust is hydrated ferric oxide"], noteAmber: "Re-NEET 2024: making hydrogen by electrolysis of water is not corrosion; rusting, tarnishing of silver and the green coat on copper are." },
        ],
      },
      pyqExampleId: "eb65733c-1fab-4dd3-9ede-4428f1db21d4",
      selfCheckExample: {
        prompt: "A lead storage battery is discharging. What forms at each electrode, and what happens to the sulphuric acid?",
        steps: [
          "Anode: \\(\\text{Pb} + \\text{SO}_4^{2-} \\rightarrow \\text{PbSO}_4 + 2e^-\\).",
          "Cathode: \\(\\text{PbO}_2 + \\text{SO}_4^{2-} + 4\\text{H}^{+} + 2e^- \\rightarrow \\text{PbSO}_4 + 2\\text{H}_2\\text{O}\\).",
          "The overall reaction uses up H₂SO₄ and makes water.",
        ],
        answer: "PbSO₄ at both electrodes; the sulphuric acid is used up",
      },
      practiceSet: [
        { prompt: "Is the dry cell a primary or a secondary battery?", answer: "Primary" },
        { prompt: "Why does the voltage of a mercury cell stay steady over its life?", answer: "Its overall reaction involves no ion whose concentration changes" },
        { prompt: "Name a metal that can protect iron as a sacrificial electrode.", answer: "Magnesium or zinc" },
        { prompt: "What is the electrolyte in the hydrogen-oxygen fuel cell?", answer: "Concentrated aqueous NaOH" },
      ],
      traps: [
        {
          title: "Electrolysis is not corrosion",
          body: "Corrosion is a metal being slowly oxidised by its surroundings. Splitting water by electrolysis is driven by an outside current and eats no metal.",
        },
        {
          title: "Primary cells are not rechargeable",
          body: "The dry cell and the mercury cell are primary: once used up they are thrown away. The lead storage battery and the nickel-cadmium cell are the secondary, rechargeable ones.",
        },
        {
          title: "Iron is the anode in rusting",
          body: "In rusting, iron loses electrons at an anode spot: iron is oxidised, never reduced. The species reduced is oxygen, together with H⁺, at another spot of the surface that acts as the cathode.",
        },
      ],
    },
  ],
};
