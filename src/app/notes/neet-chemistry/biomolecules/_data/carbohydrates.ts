import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_BM_CARBS_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates",
  title: "Carbohydrates",
  oneLineDefinition:
    "How carbohydrates are classed by the units they give on hydrolysis, the reactions of glucose and why it is drawn as a ring with α and β forms, and how sucrose, maltose, lactose, starch, cellulose and glycogen are built from their units.",
  whyItMatters:
    "Three NEET questions, from 2024 to 2025, each on one NCERT fact. One lists five reagents and asks which two glucose does not react with: Schiff's reagent and NaHSO₃ (2024). One describes a sugar that is a keto sugar, forms α and β anomers and is laevorotatory, and asks its name: D-fructose (2025). One asks whether glycogen is like amylose and whether yeast and fungi contain it (Re-NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchbm-classification",
      name: "Classes of carbohydrates and reducing sugars",
      intuition:
        "Carbohydrates are sorted by one question: how many sugar units does hydrolysis give? One, a few, or a very large number. A single unit, a monosaccharide, is then named by its carbonyl group and its number of carbons. Glucose and fructose share the formula C₆H₁₂O₆, but glucose carries an aldehyde group and fructose a ketone group.",
      definition:
        "- **Carbohydrates** are optically active polyhydroxy aldehydes or ketones, or compounds that give such units on hydrolysis.\n" +
        "- **Monosaccharides** cannot be hydrolysed into simpler units: glucose, fructose, ribose.\n" +
        "- **Oligosaccharides** give 2 to 10 monosaccharide units. Disaccharides such as sucrose, maltose and lactose give two.\n" +
        "- **Polysaccharides** give a very large number of units: starch, cellulose, glycogen, gums. They are not sweet, so they are called **non-sugars**; sweet, crystalline, water-soluble carbohydrates are called **sugars**.\n" +
        "- A monosaccharide with an aldehyde group is an **aldose**, one with a ketone group a **ketose**. The number of carbons gives triose (3), tetrose (4), pentose (5), hexose (6) or heptose (7), and the two names combine. Glucose is an aldohexose. Fructose is a ketohexose with its C=O at C-2.\n" +
        "- **D and L** give the configuration, compared with glyceraldehyde. **(+) and (−)** give the direction of rotation of plane polarised light. The two are independent: D-(+)-glucose is dextrorotatory, D-(−)-fructose is laevorotatory.\n" +
        "- **Reducing sugars** reduce Fehling's solution and Tollens' reagent. **All monosaccharides, aldose or ketose, are reducing sugars.**\n" +
        "- Fructose also closes into a ring: the OH at C-5 adds to the C=O at C-2, giving a five-membered (furanose) ring with α and β anomers.",
      table: {
        columns: ["Class", "Units on hydrolysis", "Examples", "Sweet?"],
        rows: [
          { cells: ["Monosaccharide", "One; it cannot be hydrolysed further", "Glucose, fructose, ribose", "Yes, a sugar"], pyqExampleId: "c32c1ba5-6397-48d9-ad0c-24ddcea1962e", noteAmber: "NEET 2025: a keto sugar that forms α and β anomers and is laevorotatory was D-fructose." },
          { cells: ["Oligosaccharide", "2 to 10", "Sucrose, maltose, lactose (disaccharides)", "Yes, a sugar"] },
          { cells: ["Polysaccharide", "A very large number", "Starch, cellulose, glycogen, gums", "No, a non-sugar"] },
        ],
        caption: "Every monosaccharide is a reducing sugar, the ketose fructose included.",
      },
      pyqExampleId: "c32c1ba5-6397-48d9-ad0c-24ddcea1962e",
      selfCheckExample: {
        prompt: "Ribose has five carbons and an aldehyde group; glyceraldehyde has three carbons and an aldehyde group. Classify each by carbonyl group and chain length, and say whether ribose is a reducing sugar.",
        steps: [
          "An aldehyde group makes a sugar an aldose; the carbon count gives pentose (5) or triose (3).",
          "Ribose is an aldopentose and glyceraldehyde an aldotriose.",
          "Ribose is a monosaccharide, and every monosaccharide is a reducing sugar.",
        ],
        answer: "Ribose is an aldopentose and glyceraldehyde an aldotriose; ribose is a reducing sugar",
      },
      practiceSet: [
        { prompt: "How many monosaccharide units does an oligosaccharide give on hydrolysis?", answer: "2 to 10" },
        { prompt: "Why are polysaccharides such as starch called non-sugars?", answer: "They are not sweet in taste" },
        { prompt: "In the name D-(+)-glucose, what does the D tell you and what does the (+) tell you?", answer: "D gives the configuration; (+) says it is dextrorotatory" },
        { prompt: "Is a ketose such as fructose a reducing sugar?", answer: "Yes: all monosaccharides, aldose or ketose, are reducing sugars" },
      ],
      traps: [
        {
          title: "D does not mean dextrorotatory",
          body: "D and L describe configuration; (+) and (−) are measured with a polarimeter. Fructose is a D-sugar and yet laevorotatory, written D-(−)-fructose.",
        },
        {
          title: "A ketose is still a reducing sugar",
          body: "Fructose has no aldehyde group, but NCERT counts all monosaccharides, aldose or ketose, as reducing sugars. Only some disaccharides, such as sucrose, are non-reducing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchbm-glucose",
      name: "Glucose: reactions and ring structure",
      visualizationSlug: "cet-glucose-ring-closure",
      intuition:
        "Each reaction of glucose answers one question about its open chain. HI removes every oxygen and leaves n-hexane, so the six carbons lie in a straight chain. Hydroxylamine and HCN show a carbonyl group, and bromine water shows that it is an aldehyde. Acetic anhydride counts five OH groups. But glucose fails some aldehyde tests and comes in two crystalline forms. A ring explains both: the OH at C-5 adds to the aldehyde group.",
      definition:
        "- **Preparation:** sucrose boiled with dilute HCl or \\(\\text{H}_2\\text{SO}_4\\) in alcoholic solution gives glucose and fructose. Commercially, starch is boiled with dilute \\(\\text{H}_2\\text{SO}_4\\) at 393 K under 2 to 3 atm.\n" +
        "- **HI**, long heating, gives n-hexane: the six carbons are in a straight chain.\n" +
        "- **\\(\\text{NH}_2\\text{OH}\\)** gives an oxime and **HCN** a cyanohydrin: a carbonyl group is present.\n" +
        "- **Bromine water** gives gluconic acid: the carbonyl group is an aldehyde.\n" +
        "- **Acetic anhydride** gives glucose pentaacetate: there are five OH groups.\n" +
        "- **Nitric acid** gives saccharic acid, with COOH at both ends: the other end is a primary alcohol, \\(\\text{CH}_2\\text{OH}\\).\n" +
        "- **What the open chain cannot explain:** glucose gives no Schiff's test and no hydrogensulphite addition product with \\(\\text{NaHSO}_3\\); glucose pentaacetate does not react with hydroxylamine; and glucose exists in two crystalline forms.\n" +
        "- **The ring:** the OH at C-5 adds to the CHO group, giving a six-membered cyclic hemiacetal (a pyranose). C-1 becomes a new stereocentre, the **anomeric carbon**, so there are two forms, **α** and **β**, called **anomers**.\n" +
        "- α-D-glucose (m.p. 419 K) crystallises from a concentrated solution at 303 K; β-D-glucose (m.p. 423 K) crystallises from a hot saturated solution at 371 K.",
      formula: {
        label: "Oxidation of glucose by bromine water and by nitric acid",
        latex:
          "\\text{CHO(CHOH)}_4\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Br}_2\\text{ water}} \\text{COOH(CHOH)}_4\\text{CH}_2\\text{OH} \\qquad \\text{CHO(CHOH)}_4\\text{CH}_2\\text{OH} \\xrightarrow{\\text{HNO}_3} \\text{COOH(CHOH)}_4\\text{COOH}",
        symbols: [
          { symbol: "\\(\\text{CHO(CHOH)}_4\\text{CH}_2\\text{OH}\\)", meaning: "open-chain glucose" },
          { symbol: "\\(\\text{COOH(CHOH)}_4\\text{CH}_2\\text{OH}\\)", meaning: "gluconic acid, only the aldehyde end oxidised" },
          { symbol: "\\(\\text{COOH(CHOH)}_4\\text{COOH}\\)", meaning: "saccharic acid, both ends oxidised" },
        ],
      },
      authoredExample: {
        prompt: "Glucose, C₆H₁₂O₆, is oxidised once with bromine water and once with nitric acid. Name each product and give its molecular formula.",
        steps: [
          "Bromine water oxidises only the CHO to COOH, giving gluconic acid, \\(\\text{COOH(CHOH)}_4\\text{CH}_2\\text{OH}\\).",
          "Count its atoms: C = 6; H = 1 + 4 × 2 + 3 = 12; O = 2 + 4 + 1 = 7. So \\(\\text{C}_6\\text{H}_{12}\\text{O}_7\\).",
          "Nitric acid also oxidises the \\(\\text{CH}_2\\text{OH}\\) end to COOH, giving saccharic acid, \\(\\text{COOH(CHOH)}_4\\text{COOH}\\).",
          "Count its atoms: C = 6; H = 1 + 4 × 2 + 1 = 10; O = 2 + 4 + 2 = 8. So \\(\\text{C}_6\\text{H}_{10}\\text{O}_8\\).",
        ],
        answer: "Gluconic acid, \\(\\text{C}_6\\text{H}_{12}\\text{O}_7\\), with bromine water; saccharic acid, \\(\\text{C}_6\\text{H}_{10}\\text{O}_8\\), with nitric acid",
      },
      selfCheckExample: {
        prompt: "Glucose crystallised from a concentrated solution at 303 K melts at 419 K. Which form is it, at which carbon does it differ from the other form, and what are the two forms called?",
        steps: [
          "The form crystallised at 303 K, melting at 419 K, is α-D-glucose; β-D-glucose melts higher, at 423 K.",
          "The two differ only in the arrangement at C-1, the carbon that became a stereocentre when the ring closed.",
          "Ring forms that differ only at that carbon are anomers.",
        ],
        answer: "α-D-glucose; it differs at C-1, the anomeric carbon; the two forms are anomers",
      },
      practiceSet: [
        { prompt: "What does glucose give on prolonged heating with HI, and what does that show?", answer: "n-Hexane; the six carbons are in a straight chain" },
        { prompt: "Glucose forms a pentaacetate with acetic anhydride. How many OH groups does glucose have?", answer: "Five" },
        { prompt: "In the ring form of glucose, which OH group adds to the aldehyde group, and how many atoms are in the ring?", answer: "The OH at C-5; a six-membered ring (a pyranose)" },
        { prompt: "How is glucose made commercially?", answer: "By boiling starch with dilute \\(\\text{H}_2\\text{SO}_4\\) at 393 K under 2 to 3 atm" },
      ],
      pyqExampleId: "7996bca4-088f-4301-8520-57b35e61257d",
      traps: [
        {
          title: "Glucose fails two aldehyde tests",
          body: "Glucose has an aldehyde group in its open chain, yet it gives no Schiff's test and no addition product with \\(\\text{NaHSO}_3\\). It still reacts with HCN, hydroxylamine and Tollens' reagent. These failures are part of the evidence for the ring.",
        },
        {
          title: "Bromine water oxidises only the aldehyde end",
          body: "Bromine water gives gluconic acid, with one COOH group. Saccharic acid, with COOH at both ends, needs nitric acid.",
        },
        {
          title: "The α form melts lower",
          body: "α-D-glucose melts at 419 K and β-D-glucose at 423 K. A statement that the α form has the higher melting point is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchbm-glycosides",
      name: "Disaccharides and polysaccharides",
      intuition:
        "Two monosaccharides join when an OH of one condenses with an OH of the other and water is lost. The oxide link formed is a glycosidic linkage. Which carbons it joins decides whether the sugar still reduces Fehling's solution: if the link uses up the reducing group of both units, nothing is left free to reduce. Starch, cellulose and glycogen are long chains of glucose units, told apart by the glucose form and by branching.",
      definition:
        "- **Sucrose** gives equal amounts of D-(+)-glucose and D-(−)-fructose on hydrolysis. It joins C-1 of α-D-glucose to C-2 of β-D-fructose, so both reducing groups are used: sucrose is **non-reducing**.\n" +
        "- Sucrose is dextrorotatory, but after hydrolysis the mixture is laevorotatory, because fructose (−92.4°) rotates more strongly than glucose (+52.5°). The sign changes, so the product is called **invert sugar**.\n" +
        "- **Maltose** is two α-D-glucose units, C-1 of one joined to C-4 of the next. The C-1 of the second unit is free, so maltose is **reducing**.\n" +
        "- **Lactose** (milk sugar) is β-D-galactose and β-D-glucose, C-1 of galactose joined to C-4 of glucose. It is **reducing**.\n" +
        "- **Starch**, the main storage carbohydrate of plants, is a polymer of α-glucose with two parts: **amylose** (15 to 20%, water soluble, an unbranched chain of 200 to 1000 units joined C-1 to C-4) and **amylopectin** (80 to 85%, insoluble, chains joined C-1 to C-4 with branches joined C-1 to C-6).\n" +
        "- **Cellulose** is a straight chain of β-D-glucose units joined C-1 to C-4. It is the main constituent of plant cell walls.\n" +
        "- **Glycogen** is how animals store carbohydrate, called animal starch. Its structure is like amylopectin but more highly branched. It is present in the liver, muscles and brain, and also in yeast and fungi.",
      table: {
        columns: ["Carbohydrate", "Units", "Glycosidic linkage", "Remark"],
        rows: [
          { cells: ["Sucrose", "α-D-glucose and β-D-fructose", "C-1 of glucose to C-2 of fructose", "Non-reducing; hydrolysis gives invert sugar"] },
          { cells: ["Maltose", "Two α-D-glucose units", "C-1 of one to C-4 of the next", "Reducing"] },
          { cells: ["Lactose", "β-D-galactose and β-D-glucose", "C-1 of galactose to C-4 of glucose", "Reducing; found in milk"] },
          { cells: ["Amylose", "α-D-glucose, 200 to 1000 units", "C-1 to C-4, no branches", "Water soluble; 15 to 20% of starch"] },
          { cells: ["Amylopectin", "α-D-glucose", "C-1 to C-4 in chains, C-1 to C-6 at branches", "Insoluble in water; 80 to 85% of starch"] },
          { cells: ["Cellulose", "β-D-glucose", "C-1 to C-4, straight chain", "Main constituent of plant cell walls"] },
          { cells: ["Glycogen", "α-D-glucose", "Like amylopectin, more highly branched", "Liver, muscles and brain; also yeast and fungi"], pyqExampleId: "29ee1d0d-1fad-4d48-8b91-b28a8c4d9858", noteAmber: "Re-NEET 2024: glycogen is like amylopectin, not amylose, and it is also found in yeast and fungi." },
        ],
        caption: "Only sucrose joins the reducing groups of both its units, so only sucrose of the three is non-reducing.",
      },
      pyqExampleId: "29ee1d0d-1fad-4d48-8b91-b28a8c4d9858",
      selfCheckExample: {
        prompt: "Sucrose is hydrolysed. Name the two products and explain why the solution turns from dextrorotatory to laevorotatory.",
        steps: [
          "Hydrolysis breaks the C-1 to C-2 link and gives equal amounts of D-(+)-glucose and D-(−)-fructose.",
          "Fructose rotates the light by −92.4° and glucose by +52.5°.",
          "The larger laevorotation of fructose wins, so the mixture is laevorotatory and is called invert sugar.",
        ],
        answer: "D-(+)-glucose and D-(−)-fructose in equal amounts; fructose's laevorotation is larger than glucose's dextrorotation",
      },
      practiceSet: [
        { prompt: "Which two units does lactose give on hydrolysis?", answer: "β-D-galactose and β-D-glucose" },
        { prompt: "Is maltose a reducing sugar? Give the reason.", answer: "Yes: C-1 of its second glucose unit is free" },
        { prompt: "Which form of glucose builds cellulose, α or β?", answer: "β-D-glucose" },
        { prompt: "Which part of starch is soluble in water, and what share of starch is it?", answer: "Amylose, about 15 to 20%" },
      ],
      traps: [
        {
          title: "Sucrose is non-reducing",
          body: "Sucrose joins C-1 of glucose to C-2 of fructose, so the reducing groups of both units are used up. Maltose and lactose leave one reducing group free and are reducing sugars.",
        },
        {
          title: "Lactose contains galactose, not fructose",
          body: "Lactose is β-D-galactose joined to β-D-glucose. Fructose is a unit of sucrose.",
        },
        {
          title: "Amylose is the soluble part of starch",
          body: "Amylose, the unbranched 15 to 20%, is water soluble. Amylopectin, the branched 80 to 85%, is insoluble.",
        },
      ],
    },
  ],
};
