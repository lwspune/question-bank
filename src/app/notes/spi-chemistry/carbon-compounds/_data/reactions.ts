import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CC_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions, Ethanol and Ethanoic Acid",
  title: "Reactions, Ethanol and Ethanoic Acid",
  oneLineDefinition:
    "Carbon compounds burn, are oxidised, add hydrogen or swap atoms, and two of them, ethanol and ethanoic acid, have reactions you must know by name.",
  whyItMatters:
    "Five questions in the bank, three EASY and two MODERATE, one of them from the 2022 paper (the boiling point of ethanol). The rest ask which hydrocarbons add, what an aldehyde becomes when oxidised, what you see when sodium bicarbonate meets ethanoic acid, and which equation is saponification.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiccre-types",
      name: "Combustion, oxidation, addition and substitution",
      intuition:
        "Four kinds of reaction cover almost everything a Class 10 carbon compound does. Which one happens depends on the compound: anything burns, alcohols are oxidised, unsaturated compounds add, and saturated ones can only swap atoms.",
      definition:
        "- **Combustion**: burning in oxygen gives carbon dioxide, water, heat and light. Saturated compounds burn with a clean blue flame, unsaturated ones with a sooty yellow flame.\n" +
        "- **Oxidation**: alkaline potassium permanganate or acidified potassium dichromate turns an **alcohol** into a **carboxylic acid** (by way of an aldehyde). Ethanol becomes ethanoic acid.\n" +
        "- **Addition**: an **unsaturated** compound (double or triple bond) adds hydrogen with a **nickel** catalyst. This hydrogenation turns vegetable oils into vanaspati ghee.\n" +
        "- **Substitution**: in sunlight, chlorine replaces the hydrogen atoms of a **saturated** hydrocarbon one by one.",
      table: {
        columns: ["Reaction", "Which compounds", "Example"],
        rows: [
          { cells: ["Combustion", "All hydrocarbons", "\\(\\mathrm{CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O}\\)"] },
          { cells: ["Oxidation", "Alcohols, then aldehydes", "Ethanol to ethanoic acid, which turns blue litmus red"] },
          {
            cells: ["Addition", "Unsaturated only", "\\(\\mathrm{C_2H_4 + H_2 \\rightarrow C_2H_6}\\) (nickel catalyst)"],
            noteAmber: "Alkenes and alkynes add; alkanes cannot.",
          },
          { cells: ["Substitution", "Saturated hydrocarbons", "\\(\\mathrm{CH_4 + Cl_2 \\rightarrow CH_3Cl + HCl}\\) (sunlight)"] },
        ],
        caption: "Unsaturated means a double or triple bond: that is what lets a compound add.",
      },
      selfCheckExample: {
        prompt: "Which of butane, \\(\\mathrm{C_4H_{10}}\\), and butene, \\(\\mathrm{C_4H_8}\\), can add hydrogen in the presence of nickel?",
        steps: [
          "Butane fits \\(\\mathrm{C}_n\\mathrm{H}_{2n+2}\\): saturated.",
          "Butene fits \\(\\mathrm{C}_n\\mathrm{H}_{2n}\\) as an open chain: one double bond, so unsaturated.",
        ],
        answer: "Butene",
      },
      practiceSet: [
        { prompt: "What does ethanol become when it is oxidised by alkaline potassium permanganate?", answer: "Ethanoic acid" },
        { prompt: "Which metal is the catalyst when vegetable oils are hydrogenated?", answer: "Nickel" },
        { prompt: "Which kind of reaction does methane undergo with chlorine in sunlight?", answer: "Substitution" },
        { prompt: "What are the products of the complete combustion of a hydrocarbon?", answer: "Carbon dioxide and water" },
        { prompt: "An aldehyde is oxidised. What kind of compound does it form?", answer: "A carboxylic acid" },
      ],
      pyqExampleId: "a652eb6d-6f19-4851-87a6-ffba22d50fb6",
      traps: [
        {
          title: "Expecting an alkane to add",
          body:
            "Addition needs a double or triple bond to open. Alkanes are saturated, so with chlorine they substitute, and with hydrogen they do nothing.",
        },
        {
          title: "Calling ethanol a hydrocarbon",
          body: "A hydrocarbon contains only carbon and hydrogen. Ethanol, \\(\\mathrm{C_2H_5OH}\\), contains oxygen, so it is an alcohol, not a hydrocarbon.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiccre-ethanol",
      name: "Ethanol",
      intuition:
        "Ethanol is the alcohol in drinks and medicines and a common solvent. Two reactions matter: with sodium it gives off hydrogen, and with hot concentrated sulphuric acid it loses water and becomes ethene.",
      definition:
        "- Formula \\(\\mathrm{C_2H_5OH}\\): a colourless liquid that mixes with water in any proportion.\n" +
        "- It **boils at about 78 °C** (351 K), below water's 100 °C.\n" +
        "- With **sodium** it gives **hydrogen** gas and sodium ethoxide.\n" +
        "- Heated to 443 K with excess **concentrated sulphuric acid**, it loses water and gives **ethene**. The acid acts as a dehydrating agent.",
      table: {
        columns: ["Fact", "Ethanol"],
        rows: [
          { cells: ["Formula", "\\(\\mathrm{C_2H_5OH}\\)"] },
          { cells: ["Boiling point", "About 78 °C (351 K)"] },
          {
            cells: ["With sodium", "\\(\\mathrm{2Na + 2C_2H_5OH \\rightarrow 2C_2H_5ONa + H_2}\\)"],
            noteAmber: "The gas is hydrogen: it burns with a pop.",
          },
          { cells: ["With hot concentrated sulphuric acid", "Loses water to give ethene, \\(\\mathrm{C_2H_4}\\)"] },
          { cells: ["Uses", "Solvent, medicines such as cough syrups, fuel"] },
        ],
        caption: "Ethanol is the second member of the alcohols, after methanol.",
      },
      selfCheckExample: {
        prompt: "A small piece of sodium is dropped into ethanol. Which gas is given off, and how would you test it?",
        steps: [
          "Sodium reacts with ethanol to give sodium ethoxide and hydrogen.",
          "Bring a burning splinter near the gas: hydrogen burns with a pop.",
        ],
        answer: "Hydrogen; it burns with a pop.",
      },
      practiceSet: [
        { prompt: "What is the chemical formula of ethanol?", answer: "\\(\\mathrm{C_2H_5OH}\\)" },
        { prompt: "What does ethanol give when heated to 443 K with excess concentrated sulphuric acid?", answer: "Ethene" },
        { prompt: "What job does concentrated sulphuric acid do when it turns ethanol into ethene?", answer: "It removes water (a dehydrating agent)" },
        { prompt: "Is ethanol a solid, a liquid or a gas at room temperature?", answer: "A liquid" },
      ],
      pyqExampleId: "38a96f68-89c5-43ea-9c1d-14ba0f7bd7fd",
      traps: [
        {
          title: "Mixing up the boiling points",
          body: "Ethanol boils at about 78 °C, water at 100 °C and ethanoic acid at about 118 °C. Ethanol is the lowest of the three.",
        },
        {
          title: "Expecting carbon dioxide from sodium and ethanol",
          body: "A metal such as sodium gives hydrogen gas with ethanol. Carbon dioxide comes from an acid reacting with a carbonate or a hydrogencarbonate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiccre-acid",
      name: "Ethanoic acid",
      intuition:
        "Ethanoic acid (acetic acid) is the acid in vinegar. It behaves like any acid, only weaker: it turns blue litmus red, makes a salt and water with a base, and gives off carbon dioxide with a carbonate.",
      definition:
        "- Formula \\(\\mathrm{CH_3COOH}\\). **Vinegar** is a 5 to 8% solution of it in water.\n" +
        "- Pure ethanoic acid melts at 290 K (17 °C), so it freezes in cold weather: it is called **glacial acetic acid**.\n" +
        "- It is a **weak acid**: it turns blue litmus red, but it has a higher pH than hydrochloric acid of the same strength.\n" +
        "- With a base: salt + water. With a **carbonate or hydrogencarbonate**: salt + water + **carbon dioxide**, which turns lime water milky.",
      table: {
        columns: ["Reacts with", "Products"],
        rows: [
          { cells: ["Sodium hydroxide", "\\(\\mathrm{CH_3COOH + NaOH \\rightarrow CH_3COONa + H_2O}\\)"] },
          {
            cells: ["Sodium carbonate", "\\(\\mathrm{2CH_3COOH + Na_2CO_3 \\rightarrow 2CH_3COONa + H_2O + CO_2}\\)"],
            noteAmber: "The fizzing is carbon dioxide: it turns lime water milky.",
          },
          { cells: ["Blue litmus", "Turns red"] },
          { cells: ["Ethanol (concentrated sulphuric acid)", "Ethyl ethanoate, a sweet-smelling ester"] },
        ],
        caption: "Sodium ethanoate, \\(\\mathrm{CH_3COONa}\\), is the salt in every row that makes one.",
      },
      selfCheckExample: {
        prompt: "Write the products when ethanoic acid reacts with sodium hydroxide.",
        steps: ["An acid and a base give a salt and water.", "The salt of ethanoic acid with sodium is sodium ethanoate."],
        answer: "Sodium ethanoate and water.",
      },
      practiceSet: [
        { prompt: "Why is pure ethanoic acid called glacial acetic acid?", answer: "It melts at 290 K, so it freezes in cold weather" },
        { prompt: "What is vinegar?", answer: "A 5 to 8% solution of ethanoic acid in water" },
        { prompt: "Which is the stronger acid, hydrochloric acid or ethanoic acid?", answer: "Hydrochloric acid" },
        { prompt: "Which gas turns lime water milky?", answer: "Carbon dioxide" },
      ],
      pyqExampleId: "3074951a-c6b2-4ca5-996d-164e35c09677",
      traps: [
        {
          title: "Taking ethanoic acid for a strong acid",
          body: "Ethanoic acid is weak: only a little of it splits into ions. At the same concentration its pH is higher than that of hydrochloric acid.",
        },
        {
          title: "Saying the gas is hydrogen",
          body: "An acid with a carbonate or a hydrogencarbonate gives carbon dioxide. Hydrogen comes from an acid with a reactive metal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiccre-esters",
      name: "Esters, saponification and soap",
      intuition:
        "An acid and an alcohol join to make an ester, which smells sweet. An alkali can break the ester again into the salt of the acid and the alcohol. When the ester is a fat or oil, the salt is soap: that is why the reaction is called saponification.",
      definition:
        "- **Esterification**: carboxylic acid + alcohol, with a little **concentrated sulphuric acid** as catalyst, gives an **ester** + water.\n" +
        "- **Saponification**: ester + **sodium hydroxide** gives the sodium salt of the acid + the alcohol.\n" +
        "- **Soap** is made by saponification of oils and fats: it is the sodium salt of a long-chain acid.\n" +
        "- Soap forms an insoluble **scum** with the calcium and magnesium salts of **hard water**. Detergents do not.",
      table: {
        columns: ["Reaction", "Reactants", "Products"],
        rows: [
          {
            cells: ["Esterification", "\\(\\mathrm{CH_3COOH + C_2H_5OH}\\), with concentrated \\(\\mathrm{H_2SO_4}\\)", "\\(\\mathrm{CH_3COOC_2H_5 + H_2O}\\)"],
          },
          {
            cells: ["Saponification", "Ester + sodium hydroxide", "Sodium salt of the acid + alcohol"],
            noteAmber: "Saponification starts from an ester and an alkali.",
          },
          { cells: ["Soap making", "Oil or fat + sodium hydroxide", "Soap + glycerol"] },
        ],
        caption: "Ethyl ethanoate, \\(\\mathrm{CH_3COOC_2H_5}\\), is the ester of ethanoic acid and ethanol.",
      },
      selfCheckExample: {
        prompt: "Ethanoic acid and ethanol are warmed with a few drops of concentrated sulphuric acid. What forms, and how would you notice it?",
        steps: ["An acid and an alcohol give an ester and water.", "The ester, ethyl ethanoate, has a sweet, fruity smell."],
        answer: "Ethyl ethanoate (an ester), noticed by its sweet smell.",
      },
      practiceSet: [
        { prompt: "What is used as the catalyst when an acid and an alcohol form an ester?", answer: "Concentrated sulphuric acid" },
        { prompt: "Which alkali is used to make soap from oil?", answer: "Sodium hydroxide" },
        { prompt: "What is the reaction of an ester with an alkali called?", answer: "Saponification" },
        { prompt: "What does soap form with hard water?", answer: "An insoluble scum" },
      ],
      pyqExampleId: "28bf2b16-e40d-4fbf-a793-ae495398f526",
      traps: [
        {
          title: "Swapping esterification and saponification",
          body:
            "Acid + alcohol giving an ester is esterification. Ester + alkali giving a salt and an alcohol is saponification. One builds the ester, the other breaks it.",
        },
      ],
    },
  ],
};
