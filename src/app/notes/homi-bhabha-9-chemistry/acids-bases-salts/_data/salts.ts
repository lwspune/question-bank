import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AB_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Salts and Water of Crystallisation",
  title: "Salts and Water of Crystallisation",
  oneLineDefinition:
    "A salt is neutral, acidic or basic according to the strength of the acid and base it comes from; many salts also hold a fixed number of water molecules in their crystals, called water of crystallisation.",
  whyItMatters:
    "Ten questions in the bank, two EASY, six MODERATE and two HARD. Five ask the type of a salt or its formula (sodium sulphate, ammonium sulphate, calcium nitrate, and the salts strong acids form), and the calcium nitrate question was asked in 2021 and again in 2024. The other five count or name water of crystallisation: Epsom salt, borax, washing soda, green ferrous sulphate and bleaching powder.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9absa-types",
      name: "Neutral, acidic and basic salts",
      intuition:
        "A salt remembers its parents. If a strong acid met a strong base, they cancel fully and the salt's solution is neutral. If the acid was the stronger parent, the solution is a little acidic; if the base was stronger, a little basic. So to judge a salt, name the acid and the base it came from.",
      definition:
        "- **Strong acid + strong base → neutral salt** (solution pH 7).\n" +
        "- **Strong acid + weak base → acidic salt** (pH below 7).\n" +
        "- **Weak acid + strong base → basic salt** (pH above 7).\n" +
        "- A salt has a **basic radical** (the positive ion, from the base, such as \\(\\mathrm{Na^+}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{Ca^{2+}}\\)) and an **acidic radical** (the negative ion, from the acid, such as \\(\\mathrm{Cl^-}\\), \\(\\mathrm{SO_4^{2-}}\\), \\(\\mathrm{NO_3^-}\\)).\n" +
        "- Balance the charges to write the formula: \\(\\mathrm{NH_4^+}\\) and \\(\\mathrm{SO_4^{2-}}\\) give \\(\\mathrm{(NH_4)_2SO_4}\\); \\(\\mathrm{Ca^{2+}}\\) and \\(\\mathrm{NO_3^-}\\) give \\(\\mathrm{Ca(NO_3)_2}\\).\n" +
        "- Names of lime: **quicklime** is \\(\\mathrm{CaO}\\), **slaked lime** is \\(\\mathrm{Ca(OH)_2}\\), **limestone** is \\(\\mathrm{CaCO_3}\\).",
      table: {
        columns: ["Made from", "Type of salt", "pH of its solution", "Examples"],
        rows: [
          { cells: ["Strong acid + strong base", "Neutral", "7", "\\(\\mathrm{NaCl}\\), \\(\\mathrm{Na_2SO_4}\\), \\(\\mathrm{KNO_3}\\), \\(\\mathrm{Ca(NO_3)_2}\\)"] },
          { cells: ["Strong acid + weak base", "Acidic", "Below 7", "\\(\\mathrm{NH_4Cl}\\), \\(\\mathrm{(NH_4)_2SO_4}\\), \\(\\mathrm{AlCl_3}\\)"], noteAmber: "Ammonium sulphate is an acidic salt and a nitrogen fertilizer." },
          { cells: ["Weak acid + strong base", "Basic", "Above 7", "\\(\\mathrm{Na_2CO_3}\\), \\(\\mathrm{NaHCO_3}\\), \\(\\mathrm{CH_3COONa}\\)"] },
        ],
        caption: "Name the parent acid and base first; the type of salt follows.",
      },
      selfCheckExample: {
        prompt: "Is a solution of potassium nitrate acidic, basic or neutral?",
        steps: ["Potassium nitrate comes from nitric acid (strong) and potassium hydroxide (strong)."],
        answer: "Neutral, with pH 7",
      },
      practiceSet: [
        { prompt: "Is a solution of ammonium chloride acidic, basic or neutral?", answer: "Acidic: it comes from a strong acid (HCl) and a weak base (NH₄OH)" },
        { prompt: "Is a solution of sodium carbonate acidic, basic or neutral?", answer: "Basic: it comes from a weak acid (carbonic acid) and a strong base (NaOH)" },
        { prompt: "Name the basic radical in sodium chloride.", answer: "The sodium ion, Na⁺" },
        { prompt: "What is the chemical name of slaked lime?", answer: "Calcium hydroxide, Ca(OH)₂" },
      ],
      pyqExampleId: "adfb2e0e-a802-4f75-a780-bdd4c46586a6",
      traps: [
        {
          title: "Taking the acidic radical as the basic radical",
          body: "The basic radical is the positive ion that comes from the base, such as NH₄⁺. The negative ion, such as SO₄²⁻, is the acidic radical.",
        },
        {
          title: "Calling slaked lime simply lime",
          body: "Lime or quicklime is calcium oxide, CaO. Calcium hydroxide, Ca(OH)₂, is slaked lime.",
        },
        {
          title: "Judging a salt by the hydrogen in its formula",
          body: "Sodium bicarbonate, NaHCO₃, still has a replaceable hydrogen, yet its solution is basic, because it comes from a weak acid and a strong base. Judge a salt's pH by its parents.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9absa-water",
      name: "Water of crystallisation",
      intuition:
        "Blue copper sulphate crystals feel dry, yet each unit of the crystal holds five water molecules. Heat them and the water is driven off as steam, the crystals crumble and turn into a white powder. Add water back and the blue colour returns. That fixed share of water is the water of crystallisation.",
      definition:
        "- **Water of crystallisation** is the fixed number of water molecules joined to one unit of a salt in its crystals. It is written after a dot: \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\).\n" +
        "- On **heating**, the water is driven off and the crystals lose their shape and colour: blue copper sulphate turns **white**, and green ferrous sulphate crystals lose their green colour.\n" +
        "- **Ferrous sulphate** crystals are **green** (green vitriol); **copper sulphate** crystals are **blue** (blue vitriol).\n" +
        "- **Bleaching powder**, \\(\\mathrm{CaOCl_2}\\), has **no** water of crystallisation.",
      table: {
        columns: ["Common name", "Formula", "Water molecules"],
        rows: [
          { cells: ["Blue vitriol (copper sulphate)", "\\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\)", "5"] },
          { cells: ["Green vitriol (ferrous sulphate)", "\\(\\mathrm{FeSO_4 \\cdot 7H_2O}\\)", "7"] },
          { cells: ["White vitriol (zinc sulphate)", "\\(\\mathrm{ZnSO_4 \\cdot 7H_2O}\\)", "7"] },
          { cells: ["Epsom salt (magnesium sulphate)", "\\(\\mathrm{MgSO_4 \\cdot 7H_2O}\\)", "7"] },
          { cells: ["Gypsum (calcium sulphate)", "\\(\\mathrm{CaSO_4 \\cdot 2H_2O}\\)", "2"] },
          { cells: ["Barium chloride", "\\(\\mathrm{BaCl_2 \\cdot 2H_2O}\\)", "2"] },
          { cells: ["Washing soda (sodium carbonate)", "\\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\)", "10"] },
          { cells: ["Glauber's salt (sodium sulphate)", "\\(\\mathrm{Na_2SO_4 \\cdot 10H_2O}\\)", "10"] },
          { cells: ["Borax", "\\(\\mathrm{Na_2B_4O_7 \\cdot 10H_2O}\\)", "10"] },
          { cells: ["Potash alum", "\\(\\mathrm{K_2SO_4 \\cdot Al_2(SO_4)_3 \\cdot 24H_2O}\\)", "24"], noteAmber: "The most water of any salt here." },
        ],
        caption: "The 10s are the three sodium salts; alum has 24.",
      },
      selfCheckExample: {
        prompt: "How many molecules of water of crystallisation are there in one unit of blue vitriol, and what is seen when its crystals are heated strongly?",
        steps: ["Blue vitriol is \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\).", "Heating drives the water off and leaves anhydrous copper sulphate."],
        answer: "Five; the blue crystals turn into a white powder.",
      },
      practiceSet: [
        { prompt: "How many water molecules are there in one unit of gypsum?", answer: "2 (\\(\\mathrm{CaSO_4 \\cdot 2H_2O}\\))" },
        { prompt: "What is the colour of ferrous sulphate crystals?", answer: "Green" },
        { prompt: "How many water molecules are there in one unit of potash alum?", answer: "24" },
        { prompt: "Does bleaching powder contain water of crystallisation?", answer: "No" },
      ],
      pyqExampleId: "01bf4dd9-da07-4ba7-b187-327c00777c0d",
      traps: [
        {
          title: "Calling ferrous sulphate blue",
          body: "Ferrous sulphate crystals are green (green vitriol). Blue crystals are copper sulphate.",
        },
        {
          title: "Mixing up Epsom salt and Glauber's salt",
          body: "Epsom salt is magnesium sulphate with 7 water molecules. Glauber's salt is sodium sulphate with 10.",
        },
        {
          title: "Thinking dry-looking crystals hold no water",
          body: "Crystals of blue vitriol or washing soda feel dry, yet the water is locked inside them and comes out only on heating.",
        },
      ],
    },
  ],
};
