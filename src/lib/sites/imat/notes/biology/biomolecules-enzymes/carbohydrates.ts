import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_CARBOHYDRATES_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates",
  title: "Sugars, Glycosidic Bonds and Polysaccharides",
  oneLineDefinition:
    "Carbohydrates are built from simple sugars such as glucose; glycosidic bonds join them into disaccharides and into the polysaccharides starch, glycogen and cellulose.",
  whyItMatters:
    "The 2024 ministry paper asked two plain recall questions here: what kind of sugar glucose is, and which sugar is in RNA. The older papers asked which molecule is not a carbohydrate (2013, 2015) and which carbons of glucose form the bonds in starch (2012).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-monosaccharides",
      name: "Monosaccharides: trioses, pentoses and hexoses",
      intuition:
        "A monosaccharide is a single sugar unit, and the simplest way to name one is by its number of carbon atoms. Three carbons make a triose, five a pentose, six a hexose. Most have the formula \\(\\mathrm{(CH_2O)}_n\\), so once you know the carbon count you can write the formula.",
      definition:
        "- **Monosaccharides** are the monomers of carbohydrates: sweet, soluble, formula usually \\(\\mathrm{C}_n\\mathrm{H}_{2n}\\mathrm{O}_n\\).\n" +
        "- Named by carbon number: **triose** (3 C), **pentose** (5 C), **hexose** (6 C).\n" +
        "- **Glucose** is a hexose; **ribose** (in RNA and ATP) and **deoxyribose** (in DNA) are pentoses. Deoxyribose has one oxygen fewer than ribose.\n" +
        "- Glucose, fructose and galactose share the formula \\(\\mathrm{C_6H_{12}O_6}\\) but differ in structure (they are **isomers**).\n" +
        "- In its ring form glucose exists as **α-glucose** (the OH on carbon 1 points below the ring) and **β-glucose** (the OH on carbon 1 points above the ring). This small difference decides whether glucose builds starch or cellulose.",
      table: {
        columns: ["Sugar", "Type", "Formula", "Where it is found or used"],
        rows: [
          { cells: ["Glyceraldehyde", "Triose", "\\(\\mathrm{C_3H_6O_3}\\)", "Intermediate in respiration and photosynthesis"] },
          { cells: ["Ribose", "Pentose", "\\(\\mathrm{C_5H_{10}O_5}\\)", "RNA nucleotides, ATP, NAD"] },
          { cells: ["Deoxyribose", "Pentose", "\\(\\mathrm{C_5H_{10}O_4}\\)", "DNA nucleotides"] },
          { cells: ["Glucose", "Hexose", "\\(\\mathrm{C_6H_{12}O_6}\\)", "Main fuel for respiration; unit of starch, glycogen, cellulose"] },
          { cells: ["Fructose and galactose", "Hexoses", "\\(\\mathrm{C_6H_{12}O_6}\\)", "Fruit sugar; part of sucrose (fructose) and lactose (galactose)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which monosaccharide has the formula \\(\\mathrm{C_5H_{10}O_4}\\)?",
        options: ["Ribose", "Glucose", "Deoxyribose", "Fructose", "Glyceraldehyde"],
        steps: [
          "Five carbons means a pentose, which rules out glucose and fructose (hexoses) and glyceraldehyde (a triose).",
          "Ribose is \\(\\mathrm{C_5H_{10}O_5}\\). Four oxygens, one fewer, is deoxyribose: \"deoxy\" means one oxygen removed.",
        ],
        answer: "(C) Deoxyribose",
      },
      practiceSet: [
        { prompt: "What kind of monosaccharide is fructose?", answer: "A hexose (6 carbons)" },
        { prompt: "Which pentose is found in DNA?", answer: "Deoxyribose" },
        { prompt: "Write the formula of a triose that fits \\(\\mathrm{(CH_2O)}_n\\).", answer: "\\(\\mathrm{C_3H_6O_3}\\)" },
        { prompt: "In β-glucose, where does the OH on carbon 1 point?", answer: "Above the ring (in α-glucose it points below)" },
      ],
      traps: [
        {
          title: "Glycerol and glucagon are not sugars",
          body: "Glycerol is a three-carbon alcohol from lipids, and glucagon is a protein hormone that raises blood glucose. Neither is a carbohydrate, though both names sound like glucose. IMAT uses them as distractors in sugar questions.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-disaccharides",
      name: "The glycosidic bond and the three common disaccharides",
      intuition:
        "Two monosaccharides join by condensation: an OH from each ring reacts, a water molecule leaves, and an oxygen bridge is left between the two rings. That bridge is the glycosidic bond. Which carbons it joins, and whether the sugar was α or β, is written in the bond's name.",
      definition:
        "- A **glycosidic bond** joins two sugar units through an oxygen atom. It forms by condensation and is broken by hydrolysis.\n" +
        "- **α(1→4) glycosidic bond**: from carbon 1 of an α-glucose to carbon 4 of the next unit.\n" +
        "- Disaccharides have the formula \\(\\mathrm{C_{12}H_{22}O_{11}}\\) (two hexoses minus one water).\n" +
        "- **Reducing sugars** (all monosaccharides, maltose and lactose) turn **Benedict's reagent** from blue to brick-red on heating. **Sucrose is non-reducing**: it gives a positive result only after it has been hydrolysed (by boiling with acid, then neutralising).",
      table: {
        columns: ["Disaccharide", "Made from", "Bond", "Source"],
        rows: [
          { cells: ["Maltose", "α-glucose + α-glucose", "α(1→4)", "Digestion of starch by amylase; germinating seeds"] },
          { cells: ["Sucrose", "α-glucose + β-fructose", "α(1→2)", "Transport sugar in plant phloem; table sugar"] },
          { cells: ["Lactose", "β-galactose + glucose", "β(1→4)", "Milk sugar of mammals"] },
        ],
        caption: "Maltose and lactose are reducing sugars; sucrose is not.",
      },
      selfCheckExample: {
        prompt: "Which carbohydrate is formed when one molecule of glucose and one molecule of galactose join by a glycosidic bond?",
        options: ["Lactose", "Sucrose", "Maltose", "Amylose", "Fructose"],
        steps: [
          "Glucose with galactose gives lactose, the sugar of milk.",
          "Sucrose is glucose with fructose; maltose is two glucoses. Amylose is a polysaccharide, and fructose is a single sugar, not a product of joining two.",
        ],
        answer: "(A) Lactose",
      },
      practiceSet: [
        { prompt: "Which two monosaccharides make sucrose?", answer: "Glucose and fructose" },
        { prompt: "What is the formula of maltose?", answer: "\\(\\mathrm{C_{12}H_{22}O_{11}}\\)", method: "Two \\(\\mathrm{C_6H_{12}O_6}\\) minus one water" },
        { prompt: "Which common disaccharide gives no colour change with Benedict's reagent until it is hydrolysed?", answer: "Sucrose" },
      ],
      traps: [
        {
          title: "Sucrose is not a reducing sugar",
          body: "Maltose and lactose turn Benedict's reagent brick-red, but sucrose does not, because the bond between glucose and fructose ties up both reactive groups. A negative Benedict's test therefore does not prove there is no sugar: sucrose may be present.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-polysaccharides",
      name: "Polysaccharides: starch, glycogen and cellulose",
      intuition:
        "Starch, glycogen and cellulose are all long chains of glucose, yet they do very different jobs. α-glucose chains coil into compact stores that enzymes can nibble from the ends. β-glucose units must flip alternately to bond, which makes straight chains that lie side by side and lock together with hydrogen bonds into tough fibres.",
      definition:
        "- **Starch** (plant energy store) is a mixture of **amylose** (unbranched, α(1→4) bonds only, coils into a helix) and **amylopectin** (α(1→4) chains with **α(1→6) branches**).\n" +
        "- **Glycogen** (animal and fungal energy store, in liver and muscle) is like amylopectin but **more branched**, so it has more ends where glucose can be released quickly.\n" +
        "- **Cellulose** (plant cell walls) is made of **β-glucose** with β(1→4) bonds. Straight chains are cross-linked by hydrogen bonds into **microfibrils** of great strength. Humans have no enzyme to digest it.\n" +
        "- A glucose unit in the middle of an unbranched chain uses its **carbon 1 and carbon 4** for its two glycosidic bonds; a unit at a branch point also uses **carbon 6**.\n" +
        "- Stores are insoluble and compact, so they do not draw water into the cell by osmosis. Iodine solution turns starch **blue-black**.",
      table: {
        columns: ["Polysaccharide", "Monomer and bonds", "Shape", "Role"],
        rows: [
          { cells: ["Amylose", "α-glucose, α(1→4)", "Unbranched helix", "Compact plant store (part of starch)"] },
          { cells: ["Amylopectin", "α-glucose, α(1→4) with α(1→6) branches", "Branched", "Plant store (part of starch)"] },
          { cells: ["Glycogen", "α-glucose, α(1→4) with many α(1→6) branches", "Highly branched", "Animal store in liver and muscle"] },
          { cells: ["Cellulose", "β-glucose, β(1→4)", "Straight chains in microfibrils", "Strength of plant cell walls"] },
          { cells: ["Chitin", "Glucose with an N-containing group, β(1→4)", "Straight chains", "Insect exoskeleton, fungal walls"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which polysaccharide is built from β-glucose units?",
        options: ["Amylose", "Amylopectin", "Glycogen", "Cellulose", "Glucagon"],
        steps: [
          "Amylose, amylopectin and glycogen are all chains of α-glucose; they are energy stores.",
          "Cellulose is the β-glucose polymer, which is why its chains are straight and form fibres.",
          "Glucagon is a protein hormone, not a polysaccharide at all.",
        ],
        answer: "(D) Cellulose",
      },
      practiceSet: [
        { prompt: "Which bond makes the branches in amylopectin and glycogen?", answer: "α(1→6) glycosidic bonds" },
        { prompt: "Why can glycogen release glucose faster than amylose?", answer: "It is more branched, so it has many more chain ends for enzymes to work on" },
        { prompt: "Which carbon atoms of a glucose unit in the middle of an amylose chain take part in glycosidic bonds?", answer: "Carbon 1 and carbon 4" },
        { prompt: "Which test shows starch, and what colour does it give?", answer: "Iodine solution: blue-black" },
      ],
      traps: [
        {
          title: "Starch and cellulose differ in the glucose, not the sugar",
          body: "Both are polymers of glucose. Starch uses α-glucose and cellulose uses β-glucose. An option saying cellulose is made of fructose, or of a different sugar from starch, is wrong.",
        },
        {
          title: "Glycogen is the animal store, not starch",
          body: "Animals and fungi store glucose as glycogen, mainly in liver and muscle. Plants store starch. Animals do not make starch.",
        },
      ],
    },
  ],
};
