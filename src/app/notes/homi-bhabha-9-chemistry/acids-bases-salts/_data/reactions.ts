import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AB_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Acids and Bases",
  title: "Reactions of Acids and Bases",
  oneLineDefinition:
    "A dilute acid with an active metal gives a salt and hydrogen gas; metal oxides are basic and non-metal oxides acidic; and an acid with a base gives a salt and water, which is neutralisation.",
  whyItMatters:
    "Six questions in the bank, two EASY and four MODERATE. Three are about acids with metals and oxides (zinc in dilute sulphuric acid, a magnesium ribbon lifted by bubbles, a Venn diagram of acidic, basic, amphoteric and neutral oxides), and three are about neutralisation (an antacid, citric acid with baking soda, and a graph of pH as acid is added to an alkali).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9abre-metals",
      name: "Acids with metals, and the four kinds of oxides",
      intuition:
        "Drop a strip of magnesium into dilute hydrochloric acid and it fizzes: the metal pushes hydrogen out of the acid and takes its place, making a salt. Oxides behave in a pattern too. Oxides of metals act like bases, oxides of non-metals act like acids, and a few, like aluminium oxide, can act as either.",
      definition:
        "- **Active metal + dilute acid → salt + hydrogen gas**: \\(\\mathrm{Zn + H_2SO_4 \\rightarrow ZnSO_4 + H_2}\\) and \\(\\mathrm{Mg + 2HCl \\rightarrow MgCl_2 + H_2}\\).\n" +
        "- Hydrogen burns with a **pop** sound. Its bubbles can cling to a light metal strip and lift it. The salt formed stays **dissolved**.\n" +
        "- **Copper** does not react with dilute hydrochloric or sulphuric acid, so no hydrogen is given off.\n" +
        "- **Metal carbonate or bicarbonate + acid → salt + water + carbon dioxide**. The carbon dioxide turns lime water milky.\n" +
        "- **Oxides**: metal oxides are **basic**, non-metal oxides are **acidic**, a few are **amphoteric** (react with both acids and bases), and a few are **neutral** (react with neither).",
      table: {
        columns: ["Kind of oxide", "Reacts with", "Examples"],
        rows: [
          { cells: ["Basic (oxides of metals)", "Acids, giving salt and water", "\\(\\mathrm{MgO}\\), \\(\\mathrm{CaO}\\), \\(\\mathrm{Na_2O}\\), \\(\\mathrm{CuO}\\)"] },
          { cells: ["Acidic (oxides of non-metals)", "Bases, giving salt and water", "\\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{P_2O_5}\\)"] },
          { cells: ["Amphoteric", "Both acids and bases", "\\(\\mathrm{Al_2O_3}\\), \\(\\mathrm{ZnO}\\)"], noteAmber: "In a Venn diagram of acidic and basic oxides, these sit in the overlap." },
          { cells: ["Neutral", "Neither acids nor bases", "\\(\\mathrm{CO}\\), \\(\\mathrm{N_2O}\\), \\(\\mathrm{NO}\\)"] },
        ],
        caption: "Not every non-metal oxide is acidic: carbon monoxide and nitrous oxide are neutral.",
      },
      selfCheckExample: {
        prompt: "Iron filings are added to dilute hydrochloric acid. Name the gas given off and a test for it.",
        steps: ["An active metal with a dilute acid gives a salt and hydrogen.", "Hydrogen burns with a pop sound when a burning splint is brought near."],
        answer: "Hydrogen; it burns with a pop sound.",
      },
      practiceSet: [
        { prompt: "Name the salt formed when magnesium reacts with dilute hydrochloric acid.", answer: "Magnesium chloride" },
        { prompt: "Is calcium oxide an acidic oxide or a basic oxide?", answer: "A basic oxide, because calcium is a metal" },
        { prompt: "Name an oxide that reacts with both acids and bases.", answer: "Aluminium oxide (or zinc oxide)" },
        { prompt: "Which gas is given off when an acid reacts with a metal carbonate?", answer: "Carbon dioxide" },
      ],
      pyqExampleId: "240df271-43fa-4538-8216-a992b3513712",
      traps: [
        {
          title: "Naming the salt a sulphide",
          body: "Zinc with sulphuric acid gives zinc sulphate, \\(\\mathrm{ZnSO_4}\\). A sulphide contains no oxygen and is not formed here.",
        },
        {
          title: "Thinking the acid's other element is given off",
          body: "A metal with dilute hydrochloric acid gives hydrogen, not chlorine. The chlorine stays in the salt.",
        },
        {
          title: "Calling every non-metal oxide acidic",
          body: "Carbon monoxide, nitrous oxide and nitric oxide are neutral oxides: they react with neither acids nor bases.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9abre-neutral",
      name: "Neutralisation: acid + base gives salt + water",
      intuition:
        "An acid and a base cancel each other. The H⁺ of the acid and the OH⁻ of the base join to make water, and what is left of each forms a salt. Add acid little by little to an alkali and the pH falls: high at first, 7 when they exactly cancel, and low once there is extra acid.",
      definition:
        "- **Neutralisation**: an acid reacts with a base to form a **salt and water**. The \\(\\mathrm{H^+}\\) and \\(\\mathrm{OH^-}\\) ions join: \\(\\mathrm{H^+ + OH^- \\rightarrow H_2O}\\).\n" +
        "- The salt takes its **metal (or ammonium) part from the base** and its **acid part from the acid**.\n" +
        "- An acid with a **bicarbonate** or **carbonate** is a neutralisation too, but it also gives **carbon dioxide**: citric acid with baking soda gives sodium citrate, water and carbon dioxide.\n" +
        "- **In daily life**: an **antacid** such as milk of magnesia, \\(\\mathrm{Mg(OH)_2}\\), neutralises extra stomach acid; baking soda on an ant sting neutralises its formic acid; **lime** neutralises acidic soil.\n" +
        "- **Adding acid to an alkali**: at first only base (pH high); then salt and leftover base; at the **neutral point** only salt and water (pH 7); after it, **salt and extra acid** (pH low).",
      formula: {
        label: "Neutralisation",
        latex: "\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water} \\qquad \\mathrm{H^+ + OH^- \\rightarrow H_2O}",
        symbols: [
          { symbol: "salt", meaning: "the metal or ammonium part of the base joined to the acid part of the acid" },
        ],
      },
      authoredExample: {
        prompt: "Write the balanced equation for the neutralisation of sulphuric acid by potassium hydroxide, and name the salt.",
        steps: [
          "The salt takes K from the base and \\(\\mathrm{SO_4}\\) from the acid: potassium sulphate, \\(\\mathrm{K_2SO_4}\\).",
          "Two H⁺ from the acid need two OH⁻, so two KOH are needed: \\(\\mathrm{H_2SO_4 + 2KOH \\rightarrow K_2SO_4 + 2H_2O}\\).",
          "Check: 2 K, 1 S, 6 O and 4 H on each side.",
        ],
        answer: "\\(\\mathrm{H_2SO_4 + 2KOH \\rightarrow K_2SO_4 + 2H_2O}\\); the salt is potassium sulphate.",
      },
      selfCheckExample: {
        prompt: "Name the salt formed when magnesium hydroxide neutralises hydrochloric acid, and write the balanced equation.",
        steps: ["The salt takes Mg from the base and Cl from the acid: magnesium chloride.", "\\(\\mathrm{Mg(OH)_2 + 2HCl \\rightarrow MgCl_2 + 2H_2O}\\)."],
        answer: "Magnesium chloride, \\(\\mathrm{MgCl_2}\\)",
      },
      practiceSet: [
        { prompt: "What two products are formed when an acid neutralises a base?", answer: "A salt and water" },
        { prompt: "Which base is used as an antacid?", answer: "Magnesium hydroxide (milk of magnesia)" },
        { prompt: "Why is baking soda rubbed on an ant sting?", answer: "It is a mild base and neutralises the formic acid of the sting" },
        { prompt: "A farmer spreads lime on a field whose soil is too acidic. What kind of reaction takes place in the soil?", answer: "Neutralisation: the base (lime) neutralises the acid in the soil" },
      ],
      pyqExampleId: "ba958133-154d-45a2-8e2c-014b32fbb7be",
      traps: [
        {
          title: "Giving a strong alkali as an antacid",
          body: "Sodium hydroxide and potassium hydroxide are far too harsh to swallow. A mild base, magnesium hydroxide, is the antacid.",
        },
        {
          title: "Forgetting the gas with a bicarbonate",
          body: "An acid with baking soda gives a salt and water and also carbon dioxide: that is why the mixture fizzes.",
        },
        {
          title: "Thinking acid is present before the neutral point",
          body: "While the pH is still above 7 the base is not used up: the solution holds salt and leftover base. Extra acid appears only after the neutral point.",
        },
      ],
    },
  ],
};
