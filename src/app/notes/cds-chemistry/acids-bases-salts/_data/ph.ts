import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AB_PH_NOTE: SubtopicNote = {
  subtopicName: "pH Scale and Indicators",
  title: "The pH Scale and Indicators",
  oneLineDefinition:
    "What pH measures, the 0 to 14 scale, the pH of everyday substances in order, and the indicators that show it.",
  whyItMatters:
    "Seven CDS questions, all EASY or MODERATE. Two ask what a pH value means, three ask for the pH of real substances (in order, or which is a mild base), and two ask about indicators.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschab-ph-scale",
      name: "The pH scale",
      intuition:
        "pH counts hydrogen ions backwards. More H⁺ means a LOWER pH. Below 7 is acidic, 7 is neutral, above 7 is basic. Each step of one unit is a factor of ten in H⁺.",
      definition:
        "The scale:\n" +
        "- **pH** is the negative logarithm of the hydrogen-ion concentration.\n" +
        "- It runs from **0 to 14** at room temperature: **below 7 acidic**, **7 neutral**, **above 7 basic**.\n" +
        "- **pH 0** means [H⁺] = 1 mol/L: a **highly acidic** solution. pH 14 is highly basic.\n" +
        "- One unit of pH is a **tenfold** change in [H⁺]: pH 3 has ten times the H⁺ of pH 4.",
      formula: {
        label: "Definition of pH",
        latex: "\\text{pH} = -\\log_{10}[\\text{H}^{+}]",
        symbols: [{ symbol: "\\([\\text{H}^{+}]\\)", meaning: "hydrogen-ion concentration in mol/L" }],
      },
      authoredExample: {
        prompt: "A solution has a hydrogen-ion concentration of \\(10^{-3}\\) mol/L. Find its pH and say whether it is acidic or basic.",
        steps: [
          "\\(\\text{pH} = -\\log_{10}(10^{-3})\\).",
          "\\(\\log_{10}(10^{-3}) = -3\\), so pH = 3.",
          "3 is below 7.",
        ],
        answer: "pH 3: an acidic solution.",
      },
      selfCheckExample: {
        prompt: "Solution P has pH 2 and solution Q has pH 4. Which has more hydrogen ions, and how many times more?",
        steps: [
          "Lower pH means more H⁺, so P has more.",
          "The pH differs by 2 units, and each unit is a factor of 10.",
          "\\(10 \\times 10 = 100\\).",
        ],
        answer: "P has 100 times as many hydrogen ions as Q.",
      },
      pyqExampleId: "67cb2652-7e92-4978-9c93-ce5a60e53821",
      practiceSet: [
        { prompt: "A solution has pH 9. Is it acidic, neutral or basic?", answer: "Basic" },
        { prompt: "What is the pH of a solution whose [H⁺] is \\(10^{-5}\\) mol/L?", answer: "5" },
        { prompt: "Does pH rise or fall as [H⁺] increases?", answer: "It falls" },
        { prompt: "What is the pH of a solution whose [H⁺] is \\(10^{-2}\\) mol/L?", answer: "2" },
      ],
      traps: [
        {
          title: "pH 0 is the most acidic, not neutral",
          body: "pH 0 means [H⁺] = 1 mol/L, the strong-acid end of the scale. Neutral is **7**, not 0.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-ph-values",
      name: "pH of everyday substances",
      intuition:
        "CDS asks you to put real substances in order of pH, or to say whether something is a mild or strong base. Learn a few landmarks and the rest falls into place: stomach acid at the bottom, blood just above 7, milk of magnesia around 10.",
      definition:
        "The landmarks:\n" +
        "- **Gastric juice** about 1.5–2, **lemon juice** about 2.2, **vinegar** about 3, **coffee** about 5.\n" +
        "- **Pure water** 7. **Blood** about 7.4, slightly basic.\n" +
        "- **Milk of magnesia** (Mg(OH)₂) about 10: a **mild base**, used as an antacid because it neutralises stomach acid without harming the stomach.\n" +
        "- **Sodium hydroxide** solution 13–14: a strong base.\n" +
        "- **Acidic soil** is corrected by adding a base such as **lime** or **dolomite** (calcium magnesium carbonate), which **raises** the pH.",
      table: {
        columns: ["Substance", "Approx. pH", "Nature"],
        rows: [
          { cells: ["Gastric juice", "1.5–2", "Strongly acidic"] },
          { cells: ["Lemon juice", "2.2", "Acidic"] },
          { cells: ["Coffee", "5", "Weakly acidic"] },
          { cells: ["Pure water", "7", "Neutral"] },
          { cells: ["Blood", "7.4", "Slightly basic"] },
          {
            cells: ["Milk of magnesia", "10", "Mild base (antacid)"],
            noteAmber: "CDS 2022 (II): milk of magnesia is a mild base.",
            pyqExampleId: "c5001c05-941e-44b6-aad2-bfd38ca732ff",
          },
          { cells: ["Sodium hydroxide solution", "13–14", "Strong base"] },
        ],
        caption: "CDS 2023 (I) order of increasing pH: lemon juice < coffee < blood < milk of magnesia.",
      },
      pyqExampleId: "007aa6fd-c5ac-4265-a96f-75636127890b",
      selfCheckExample: {
        prompt: "Arrange gastric juice, pure water, sodium hydroxide solution and vinegar in order of increasing pH.",
        steps: [
          "Gastric juice is the most acidic, about 1.5–2.",
          "Vinegar is next, about 3.",
          "Pure water is neutral, 7. Sodium hydroxide solution is strongly basic, 13–14.",
        ],
        answer: "Gastric juice < vinegar < pure water < sodium hydroxide solution.",
      },
      practiceSet: [
        { prompt: "Is the pH of blood slightly above or slightly below 7?", answer: "Slightly above (about 7.4)" },
        { prompt: "Why is dolomite powder spread on some farmland?", answer: "To raise the pH of acidic soil" },
        { prompt: "Which compound is milk of magnesia?", answer: "Magnesium hydroxide, Mg(OH)₂" },
        { prompt: "Which has the lower pH: coffee or lemon juice?", answer: "Lemon juice" },
      ],
      traps: [
        {
          title: "Liming soil RAISES its pH",
          body: "Lime and dolomite are bases. Spreading them neutralises soil acidity, so the pH goes **up**. They do not add nitrogen or phosphorus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-indicators",
      name: "Acid-base indicators",
      intuition:
        "An indicator is a dye whose colour depends on pH. Simple indicators only say acid or base. Universal indicator is a mixture, so it shows a different colour at almost every pH.",
      definition:
        "The indicators asked about:\n" +
        "- **Litmus** is a natural dye from **lichens**: red in acid, blue in base.\n" +
        "- **Phenolphthalein**: colourless in acid, pink in base.\n" +
        "- **Methyl orange**: red in acid, yellow in base.\n" +
        "- **Turmeric**: yellow, turning reddish-brown in a base such as soap.\n" +
        "- **Universal indicator** is a **mixture of several indicators**. It shows **different colours at different H⁺ concentrations**, so it gives the pH. It is **not** used to find the end point of a titration, which needs one indicator with a sharp change.",
      table: {
        columns: ["Indicator", "In acid", "In base"],
        rows: [
          {
            cells: ["Litmus (from lichen)", "Red", "Blue"],
            noteAmber: "CDS 2022 (I): litmus comes from a lichen.",
            pyqExampleId: "3a6c36e7-bce1-43c5-b588-344ee22de1ae",
          },
          { cells: ["Phenolphthalein", "Colourless", "Pink"] },
          { cells: ["Methyl orange", "Red", "Yellow"] },
          { cells: ["Turmeric", "Yellow", "Reddish-brown"] },
          {
            cells: ["Universal indicator", "Red to yellow as pH rises", "Green at 7, then blue to violet"],
            noteAmber: "CDS 2021 (II): it is a mixture and shows many colours, but it is not used for titrations.",
            pyqExampleId: "fe2453bd-2c32-44ef-bc04-16d3f91f7632",
          },
        ],
      },
      pyqExampleId: "fe2453bd-2c32-44ef-bc04-16d3f91f7632",
      practiceSet: [
        { prompt: "Which living organism gives litmus?", answer: "Lichen" },
        { prompt: "What colour is phenolphthalein in a basic solution?", answer: "Pink" },
        { prompt: "What colour is methyl orange in an acid?", answer: "Red" },
        { prompt: "What colour does turmeric turn in soap solution?", answer: "Reddish-brown" },
      ],
      traps: [
        {
          title: "Universal indicator is not a titration indicator",
          body: "Universal indicator changes colour gradually across the whole scale, so it cannot mark a sharp end point. Titrations use one indicator such as phenolphthalein or methyl orange.",
        },
      ],
    },
  ],
};
