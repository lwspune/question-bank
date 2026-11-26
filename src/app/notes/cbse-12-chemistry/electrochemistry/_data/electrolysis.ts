import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_ELECTROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Electrolytic Cells and Electrolysis",
  title: "Electrolysis: Faraday's Laws and the Products",
  oneLineDefinition:
    "Faraday's two laws, the charge in faradays needed for a change, the mass of a substance deposited by a current, and how to predict the products of electrolysis at each electrode.",
  whyItMatters:
    "34 questions. Twenty-four were set in board papers from 2022 to 2026. The board asks how many faradays a change needs (MnO₄⁻ to Mn²⁺ in 2023, 2024 and 2025; MnO₄⁻ to MnO₂, H₂O to O₂ and FeO to Fe₂O₃ in 2024 or 2025; Cr₂O₇²⁻ to Cr³⁺ and Ag⁺ to Ag in 2026), the products of electrolysis of aqueous NaCl (every year from 2023 to 2026), of CuCl₂ (2024, 2026) and of H₂SO₄ (2025, 2026), and Faraday's second law (2024, 2026). The textbook adds NCERT's Example 2.10, the mass deposited by a current, and cells joined in series.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcec-faraday-laws",
      name: "Faraday's laws and the mass deposited",
      intuition:
        "Electrolysis is counting electrons. A current of I amperes for t seconds delivers a charge It. One faraday is the charge of one mole of electrons. Divide the charge by F and you know how many moles of electrons were delivered; the electrode reaction tells you how many moles of metal those electrons deposit.",
      definition:
        "- **Faraday's first law:** the amount of chemical reaction which occurs at any electrode during electrolysis by a current is proportional to the quantity of electricity passed through the electrolyte (solution or melt).\n" +
        "- **Faraday's second law:** the amounts of different substances liberated by the same quantity of electricity passing through the electrolytic solution are proportional to their chemical equivalent weights (atomic mass of the metal divided by the number of electrons needed to reduce the cation).\n" +
        "- **Quantity of electricity:** \\(Q = It\\), in coulombs when I is in amperes and t in seconds.\n" +
        "- **1 faraday** (F) is the charge on one mole of electrons: \\(F = 96487\\) C mol⁻¹, taken as 96500 C mol⁻¹ in board papers.\n" +
        "- For \\(\\text{M}^{n+} + ne^{-} \\rightarrow \\text{M}\\): moles of M deposited \\(= \\dfrac{Q}{nF}\\), so mass \\(m = \\dfrac{ItM}{nF}\\).\n" +
        "- Cells in **series** carry the same charge: find Q from one cell and use it in the others.",
      formula: {
        label: "Mass deposited by a current",
        latex: "Q = It, \\qquad m = \\frac{Q}{nF} \\times M = \\frac{ItM}{nF}",
        symbols: [
          { symbol: "\\(I\\)", meaning: "current in amperes" },
          { symbol: "\\(t\\)", meaning: "time in seconds" },
          { symbol: "\\(M\\)", meaning: "molar mass of the substance deposited, in g mol⁻¹" },
          { symbol: "\\(n\\)", meaning: "electrons needed per ion deposited" },
        ],
      },
      authoredExample: {
        prompt: "A current of 2 A is passed through silver nitrate solution for 15 minutes. What mass of silver is deposited at the cathode? (Ag = 108 g mol⁻¹, F = 96500 C mol⁻¹)",
        steps: [
          "Given: I = 2 A, t = 15 min = 900 s, \\(\\text{Ag}^{+} + e^{-} \\rightarrow \\text{Ag}\\), so n = 1.",
          "Charge: \\(Q = It = 2\\ \\text{A} \\times 900\\ \\text{s} = 1800\\) C.",
          "Formula: \\(m = \\dfrac{QM}{nF}\\).",
          "Substitution: \\(m = \\dfrac{1800\\ \\text{C} \\times 108\\ \\text{g mol}^{-1}}{1 \\times 96500\\ \\text{C mol}^{-1}} = 2.01\\) g.",
        ],
        answer: "2.01 g of silver",
      },
      selfCheckExample: {
        prompt: "What mass of zinc is deposited from ZnSO₄ solution by 0.5 A in 30 minutes? (Zn = 65.4 g mol⁻¹, F = 96500 C mol⁻¹)",
        steps: ["\\(Q = 0.5 \\times 1800 = 900\\) C; n = 2.", "\\(m = \\dfrac{900 \\times 65.4}{2 \\times 96500} = 0.305\\) g."],
        answer: "0.305 g",
      },
      practiceSet: [
        {
          prompt: "Silver nitrate and copper sulphate cells are joined in series. When 1.08 g of silver is deposited, what mass of copper is deposited? (Ag = 108, Cu = 63.5 g mol⁻¹)",
          answer: "Ag: 0.01 mol, so 0.01 mol of electrons; Cu needs 2 per ion: 0.005 mol × 63.5 = 0.3175 g",
        },
        {
          prompt: "How long must a current of 1 A flow to deposit 0.635 g of copper from CuSO₄ solution? (Cu = 63.5 g mol⁻¹, F = 96500 C mol⁻¹)",
          answer: "0.01 mol Cu needs 0.02 mol of electrons: Q = 0.02 × 96500 = 1930 C, so t = 1930 s",
        },
        { prompt: "State Faraday's first law of electrolysis.", answer: "The amount of chemical reaction at an electrode is proportional to the quantity of electricity passed through the electrolyte" },
      ],
      pyqExampleId: "6d4fc87d-19b5-45c0-89a0-06551a5a95fc",
      traps: [
        {
          title: "Leaving the time in minutes",
          body: "Q = It needs t in seconds. Convert minutes or hours first; a time left in minutes gives an answer sixty times too small.",
        },
        {
          title: "A law stated without its condition",
          body: "The second law is about the same quantity of electricity passed through different electrolytes. Leave out \"the same quantity of electricity\" and the statement is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-charge-faradays",
      name: "Charge needed for a change, in faradays",
      intuition:
        "To find how much charge a change needs, find how many electrons each formula unit gains or loses. That number, per mole, is the number of faradays. The oxidation numbers tell you this quickly, but count every atom that changes.",
      definition:
        "- Charge needed = (moles of electrons) × F. For 1 mol of a species, the number of faradays = electrons gained or lost per formula unit.\n" +
        "- Find it from the change in oxidation number, **times the number of atoms that change** in one formula unit, or from the balanced half reaction.\n" +
        "- \\(\\text{Al}^{3+} + 3e^{-} \\rightarrow \\text{Al}\\): 3 F per mol. \\(\\text{Cu}^{2+} + 2e^{-} \\rightarrow \\text{Cu}\\): 2 F per mol.\n" +
        "- \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^{+} + 6e^{-} \\rightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\): 6 F per mol (two Cr, each +6 to +3).\n" +
        "- In coulombs: multiply the faradays by 96500 (or 96487) C.",
      formula: {
        label: "Charge for 1 mol of a species",
        latex: "Q = n_e F",
        symbols: [{ symbol: "\\(n_e\\)", meaning: "moles of electrons gained or lost by 1 mol of the species" }],
      },
      authoredExample: {
        prompt: "How much electricity, in faradays and in coulombs, is needed to reduce 1 mol of Cr₂O₇²⁻ to Cr³⁺? (F = 96500 C mol⁻¹)",
        steps: [
          "Each Cr goes from +6 in Cr₂O₇²⁻ to +3 in Cr³⁺: 3 electrons per Cr.",
          "There are 2 Cr in one Cr₂O₇²⁻, so 6 electrons per ion: \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^{+} + 6e^{-} \\rightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\).",
          "1 mol needs 6 mol of electrons = 6 F.",
          "\\(Q = 6 \\times 96500 = 579000\\) C.",
        ],
        answer: "6 F, that is 5.79 × 10⁵ C",
      },
      selfCheckExample: {
        prompt: "How many coulombs are needed to reduce 1 mol of Al³⁺ to Al? (F = 96500 C mol⁻¹)",
        steps: ["\\(\\text{Al}^{3+} + 3e^{-} \\rightarrow \\text{Al}\\): 3 F.", "\\(Q = 3 \\times 96500 = 289500\\) C."],
        answer: "289500 C (3 F)",
      },
      practiceSet: [
        { prompt: "How many faradays are needed to oxidise 1 mol of FeO to Fe₂O₃?", answer: "1 F. Each Fe goes from +2 to +3, and 1 mol of FeO has 1 mol of Fe" },
        { prompt: "How many faradays are needed to produce 20.0 g of calcium from molten CaCl₂? (Ca = 40 g mol⁻¹)", answer: "0.5 mol Ca × 2 = 1 F" },
        { prompt: "How many faradays are needed to reduce 1 mol of Cu²⁺ to Cu?", answer: "2 F" },
      ],
      pyqExampleId: "b3118519-00ce-4273-aeff-2c5e17e577c2",
      traps: [
        {
          title: "Counting one atom when two change",
          body: "In Cr₂O₇²⁻ both chromium atoms are reduced, so the change of 3 per Cr counts twice: 6 F, not 3 F.",
        },
        {
          title: "Being tricked by a subscript",
          body: "For FeO to Fe₂O₃ the question is about 1 mol of FeO, which holds 1 mol of Fe. The 2 in Fe₂O₃ does not double the answer: it is 1 F.",
        },
        {
          title: "Reading the product carelessly",
          body: "The same reactant can need different charges for different products. Find the oxidation number in the product actually named before counting electrons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcec-electrolysis-products",
      name: "Products of electrolysis",
      intuition:
        "At each electrode several species compete. At the cathode the one that is easiest to reduce wins (higher E°); at the anode the one easiest to oxidise wins (lower E°). But some reactions are so slow that they need an extra push, the overpotential. Oxygen needs a big one, so chloride usually beats water at the anode even though water has the lower E°.",
      definition:
        "- An electrolytic cell uses an outside source of voltage to bring about a chemical reaction. A galvanic cell becomes one when the opposing outside voltage is greater than its own.\n" +
        "- Products depend on the material electrolysed and the **type of electrode**: an inert electrode (Pt, Au) only gives or takes electrons; a reactive electrode takes part.\n" +
        "- **Cathode:** the reduction with the **higher** E° takes place. **Anode:** the oxidation with the **lower** E° takes place, unless an **overpotential** makes it too slow.\n" +
        "- **Aqueous NaCl:** at the cathode \\(\\text{Na}^{+} + e^{-} \\rightarrow \\text{Na}\\) (E° = −2.71 V) loses to \\(\\text{H}^{+} + e^{-} \\rightarrow \\tfrac{1}{2}\\text{H}_2\\) (E° = 0.00 V), so H₂ forms: \\(\\text{H}_2\\text{O} + e^{-} \\rightarrow \\tfrac{1}{2}\\text{H}_2 + \\text{OH}^{-}\\).\n" +
        "- At the anode \\(2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2 + 4\\text{H}^{+} + 4e^{-}\\) (E° = 1.23 V) should win over \\(\\text{Cl}^{-} \\rightarrow \\tfrac{1}{2}\\text{Cl}_2 + e^{-}\\) (E° = 1.36 V), but the overpotential of oxygen makes Cl₂ form.\n" +
        "- Net: \\(\\text{NaCl(aq)} + \\text{H}_2\\text{O(l)} \\rightarrow \\text{Na}^{+}(aq) + \\text{OH}^{-}(aq) + \\tfrac{1}{2}\\text{H}_2(g) + \\tfrac{1}{2}\\text{Cl}_2(g)\\). NaOH is left in solution, so the pH rises.\n" +
        "- **Sulphuric acid:** at the anode, dilute acid gives O₂; concentrated acid gives \\(2\\text{SO}_4^{2-} \\rightarrow \\text{S}_2\\text{O}_8^{2-} + 2e^{-}\\) (E° = 1.96 V).",
      table: {
        columns: ["Electrolyte and electrodes", "At the cathode", "At the anode"],
        rows: [
          { cells: ["Molten NaCl", "Na metal", "Cl₂ gas"] },
          {
            cells: ["Aqueous NaCl, Pt electrodes", "H₂ gas (water is reduced, not Na⁺)", "Cl₂ gas (O₂ is held back by its overpotential)"],
            pyqExampleId: "2abc78d4-d83c-454d-979d-e9cab3c3b894",
            noteAmber: "Board 2023, 2024, 2025 and 2026 all asked about this electrolysis, as an MCQ, an assertion-reason item or a reason to give.",
          },
          {
            cells: ["Aqueous CuCl₂, Pt electrodes", "Cu metal (Cu²⁺ has a higher E° than water)", "Cl₂ gas"],
            pyqExampleId: "815d5752-bfcb-457c-8878-b8926298c0d9",
            noteAmber: "Board 2024 and 2026 asked this as an MCQ; 2026 also asked it as a written answer.",
          },
          {
            cells: ["Aqueous AgNO₃, silver electrodes", "Ag metal", "The silver anode dissolves as Ag⁺"],
            pyqExampleId: "1b63226d-2817-48d9-8ae5-09d13d9a2fc7",
          },
          { cells: ["Aqueous AgNO₃, Pt electrodes", "Ag metal", "O₂ gas from water"] },
          {
            cells: ["Dilute H₂SO₄, Pt electrodes", "H₂ gas", "O₂ gas"],
            pyqExampleId: "94b0d252-4ace-4a61-8f98-7566bf37b709",
            noteAmber: "Board 2025 asked the gas at the anode: oxygen.",
          },
          {
            cells: ["Concentrated H₂SO₄, Pt electrodes", "H₂ gas", "S₂O₈²⁻ (peroxodisulphate) ion"],
            pyqExampleId: "54de1b57-99ed-41c1-a599-0ab7bcf58b10",
          },
        ],
      },
      practiceSet: [
        { prompt: "Why can sodium not be obtained by electrolysis of aqueous NaCl?", answer: "Water (H⁺) is reduced in preference to Na⁺, whose E° (−2.71 V) is far lower, so H₂ forms at the cathode instead" },
        { prompt: "Name the products at each electrode when molten NaCl is electrolysed.", answer: "Sodium metal at the cathode and chlorine gas at the anode" },
        { prompt: "What happens to the pH of aqueous NaCl as it is electrolysed, and why?", answer: "It rises, because OH⁻ ions are left in solution as water is reduced at the cathode" },
      ],
      pyqExampleId: "78839c3e-90ca-42a9-95cb-1f54421d4515",
      traps: [
        {
          title: "Choosing by E° alone at the anode",
          body: "On E° values water (1.23 V) should be oxidised before Cl⁻ (1.36 V). Chlorine forms because of the overpotential of oxygen. Write the word overpotential; without it the reason is incomplete.",
        },
        {
          title: "Ignoring a reactive electrode",
          body: "With a silver anode, the anode itself dissolves; nothing in the solution is oxidised. Always check whether the electrodes are inert (Pt) or not before predicting the anode product.",
        },
      ],
    },
  ],
};
