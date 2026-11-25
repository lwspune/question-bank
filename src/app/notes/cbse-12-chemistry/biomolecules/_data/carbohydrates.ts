import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_BM_CARBOHYDRATES_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates",
  title: "Carbohydrates: Glucose, Disaccharides and Polysaccharides",
  oneLineDefinition:
    "How carbohydrates are classified, the reactions that fix the open-chain structure of glucose, the facts that need its ring form, and the structure and hydrolysis of sucrose, maltose, lactose, starch, cellulose and glycogen.",
  whyItMatters:
    "104 questions, and ninety-one of them come from board papers, in every year from 2023 to 2026. Every year the board asks you to write the reactions of glucose with HI, bromine water, nitric acid, hydroxylamine, HCN or acetic anhydride and say what each proves. It also asks what open-chain glucose cannot explain, anomers and the pyranose and furanose rings, the hydrolysis products of sucrose, maltose and lactose, invert sugar, reducing sugars, and how starch, cellulose and glycogen differ. Most of these are one-mark MCQs or two and three-mark reaction answers: learn the reagent, the product and what it proves as one line.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcbm-classes",
      name: "Classes of carbohydrates and reducing sugars",
      intuition:
        "Sort a carbohydrate by what water does to it. Some cannot be broken down any further: those are the single units. Some break into a few units, and the big ones break into hundreds. A second, separate question is whether the sugar can reduce Tollens' reagent or Fehling's solution. Every single unit can, and among the bigger sugars only those that keep a free aldehyde or ketone group can.",
      definition:
        "- **Carbohydrates** are optically active polyhydroxy aldehydes or ketones, or compounds which give such units on hydrolysis. Sweet ones are called sugars; they are also called saccharides.\n" +
        "- **Monosaccharides** cannot be hydrolysed further to a simpler polyhydroxy aldehyde or ketone. About 20 occur in nature: glucose, fructose, ribose.\n" +
        "- **Oligosaccharides** give **two to ten** monosaccharide units on hydrolysis. Disaccharides are the most common: sucrose gives glucose and fructose; maltose gives two molecules of glucose.\n" +
        "- **Polysaccharides** give a large number of monosaccharide units: starch, cellulose, glycogen, gums. They are not sweet, so they are also called **non-sugars**.\n" +
        "- A monosaccharide with an aldehyde group is an **aldose**; with a keto group, a **ketose**. The number of carbons goes into the name: glucose is an **aldohexose**, fructose a **ketohexose**, ribose an **aldopentose**.\n" +
        "- **Reducing sugars** reduce Fehling's solution and Tollens' reagent. **All monosaccharides, aldose or ketose, are reducing sugars.** A disaccharide is reducing only if an aldehydic or ketonic group is left free (maltose, lactose); sucrose is non-reducing.",
      table: {
        columns: ["Carbohydrate", "Class", "Key fact"],
        rows: [
          { cells: ["Glucose", "Monosaccharide, aldohexose", "Reducing sugar; the monomer of starch and cellulose"] },
          {
            cells: ["Fructose", "Monosaccharide, ketohexose", "Reducing sugar, although its carbonyl is a keto group"],
            noteAmber: "Board 2024 asked this as assertion-reason: fructose is reducing, so a Reason saying it does not reduce Fehling's solution is false.",
            pyqExampleId: "b71316f6-33d6-4309-81c0-d4cde6a4d095",
          },
          { cells: ["Ribose, 2-deoxyribose", "Monosaccharides, aldopentoses", "The sugars of RNA and DNA"] },
          { cells: ["Sucrose, maltose, lactose", "Oligosaccharides (disaccharides)", "Each gives two monosaccharide units; sucrose alone is non-reducing"] },
          {
            cells: ["Starch, cellulose, glycogen", "Polysaccharides", "Not sweet: called non-sugars"],
            noteAmber: "Board 2026 asked an MCQ: pick the polysaccharide (cellulose) from fructose, maltose, glucose and cellulose.",
            pyqExampleId: "4736756e-cd67-4b6e-a57f-653da7aeec1d",
          },
        ],
      },
      selfCheckExample: {
        prompt: "A carbohydrate gives three monosaccharide units on hydrolysis. Name its class, and name the most common members of that class with one example.",
        steps: [
          "Two to ten units on hydrolysis makes it an oligosaccharide.",
          "Three units makes it a trisaccharide; the most common oligosaccharides are the disaccharides, such as sucrose.",
        ],
        answer: "An oligosaccharide (a trisaccharide); the commonest are disaccharides, for example sucrose",
      },
      practiceSet: [
        { prompt: "Define a monosaccharide and give two examples.", answer: "A carbohydrate that cannot be hydrolysed further to a simpler polyhydroxy aldehyde or ketone; glucose and fructose" },
        { prompt: "Why are polysaccharides also called non-sugars?", answer: "They are not sweet in taste" },
        { prompt: "What are reducing sugars? Is every monosaccharide a reducing sugar?", answer: "Carbohydrates that reduce Fehling's solution and Tollens' reagent; yes, all monosaccharides, aldose or ketose, are reducing" },
        { prompt: "Glucose is an aldohexose. What do the two parts of this name tell you?", answer: "Aldo: it has an aldehyde group; hexose: it has six carbon atoms" },
      ],
      pyqExampleId: "94d0edeb-e597-4918-8ac5-b17565d61aaf",
      traps: [
        {
          title: "\"A ketose cannot be a reducing sugar\"",
          body: "All monosaccharides, aldoses and ketoses alike, reduce Tollens' reagent and Fehling's solution. Fructose is a ketose and a reducing sugar.",
        },
        {
          title: "Calling a disaccharide a polysaccharide",
          body: "Two to ten units on hydrolysis is an oligosaccharide. Sucrose, maltose and lactose are disaccharides; only starch, cellulose, glycogen and gums are polysaccharides in this chapter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-glucose",
      name: "Open-chain structure of glucose: what each reaction proves",
      intuition:
        "Chemists could not see the glucose molecule, so they asked it questions with reagents. Strip out every oxygen and a straight chain of six carbons is left. Add reagents that only a carbonyl group answers, and glucose answers. Use an oxidising agent mild enough to touch only an aldehyde, and glucose is oxidised. Count the acetyl groups it takes up and you have counted its hydroxyl groups. Put the answers together and you get CHO(CHOH)₄CH₂OH.",
      definition:
        "Preparation:\n" +
        "- **From sucrose:** boiled with dilute HCl or \\(\\text{H}_2\\text{SO}_4\\) in alcoholic solution, it gives glucose and fructose in equal amounts.\n" +
        "- **From starch (commercial):** boiled with dilute \\(\\text{H}_2\\text{SO}_4\\) at 393 K under pressure: \\((\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{H}^{+},\\ 393\\ \\text{K}} n\\,\\text{C}_6\\text{H}_{12}\\text{O}_6\\)\n" +
        "Structure (glucose is an aldohexose, also called dextrose; molecular formula \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\)):\n" +
        "- **HI, prolonged heating:** n-hexane, so all six carbons are in a **straight chain**. \\(\\text{CHO}(\\text{CHOH})_4\\text{CH}_2\\text{OH} \\xrightarrow{\\text{HI},\\ \\Delta} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3\\)\n" +
        "- **Hydroxylamine:** an oxime, \\(\\text{CH}({=}\\text{NOH})(\\text{CHOH})_4\\text{CH}_2\\text{OH}\\). **HCN:** a cyanohydrin, \\(\\text{CH}(\\text{OH})(\\text{CN})(\\text{CHOH})_4\\text{CH}_2\\text{OH}\\). Together they prove a **carbonyl group** (>C=O).\n" +
        "- **Bromine water** (mild oxidising agent): gluconic acid, a six-carbon acid. \\(\\text{CHO}(\\text{CHOH})_4\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Br}_2\\ \\text{water}} \\text{COOH}(\\text{CHOH})_4\\text{CH}_2\\text{OH}\\). So the carbonyl group is an **aldehydic group**.\n" +
        "- **Acetic anhydride:** glucose pentaacetate, so there are **five −OH groups**. It is a stable compound, so the five −OH groups are on **different carbon atoms**.\n" +
        "- **Nitric acid:** glucose, and gluconic acid too, give the dicarboxylic **saccharic acid**, \\(\\text{COOH}(\\text{CHOH})_4\\text{COOH}\\). So glucose has a **primary alcoholic (−CH₂OH) group**.\n" +
        "- **D-(+)-glucose:** D is the configuration: the −OH on the lowest asymmetric carbon is on the right, as in (+)-glyceraldehyde. (+) means dextrorotatory. D and L have no relation with the sign of rotation.",
      table: {
        columns: ["Reagent", "Product", "What it proves"],
        rows: [
          { cells: ["HI, prolonged heating", "n-Hexane", "The six carbons are in a straight chain"] },
          {
            cells: ["Hydroxylamine, NH₂OH", "Glucose oxime", "A carbonyl group is present"],
            noteAmber: "Board 2023 asked the reaction and the group it confirms.",
            pyqExampleId: "591c8e09-8769-471d-b0ff-36a9dabb8b8b",
          },
          {
            cells: ["Hydrogen cyanide, HCN", "Glucose cyanohydrin", "A carbonyl group is present"],
            noteAmber: "Board 2023 asked the reaction and the group it confirms.",
            pyqExampleId: "3fe7067c-5d98-4c46-90f3-1b87fc02cee2",
          },
          { cells: ["Bromine water (mild oxidant)", "Gluconic acid, COOH(CHOH)₄CH₂OH", "The carbonyl group is an aldehyde"] },
          {
            cells: ["Acetic anhydride", "Glucose pentaacetate", "Five −OH groups, on five different carbons"],
            noteAmber: "Board 2023 asked the reaction and the group it confirms.",
            pyqExampleId: "5e022978-93ff-41bf-b438-446ca6187fd0",
          },
          { cells: ["Nitric acid", "Saccharic acid, COOH(CHOH)₄COOH", "A primary alcoholic group (−CH₂OH)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Gluconic acid is oxidised with nitric acid. Name the product and say what this result tells you about glucose.",
        steps: [
          "Gluconic acid already has −COOH at one end and still has −CH₂OH at the other.",
          "Nitric acid oxidises the −CH₂OH to −COOH, giving the dicarboxylic saccharic acid, COOH(CHOH)₄COOH.",
          "Since glucose gives the same saccharic acid, glucose must carry a primary alcoholic group.",
        ],
        answer: "Saccharic acid; glucose has a primary alcoholic (−CH₂OH) group",
      },
      practiceSet: [
        { prompt: "Which reaction shows that the carbonyl group of glucose is an aldehyde and not a ketone?", answer: "Oxidation by bromine water, a mild oxidising agent, to the six-carbon gluconic acid" },
        { prompt: "How does the pentaacetate of glucose show that its five −OH groups are on different carbon atoms?", answer: "The pentaacetate is a stable compound, so no carbon carries two −OH groups" },
        { prompt: "What do the letter D and the sign (+) in D-(+)-glucose represent?", answer: "D is the configuration (−OH on the lowest asymmetric carbon on the right, as in (+)-glyceraldehyde); (+) means the compound is dextrorotatory" },
        { prompt: "Write the product of glucose with HCN and name it.", answer: "\\(\\text{CH}(\\text{OH})(\\text{CN})(\\text{CHOH})_4\\text{CH}_2\\text{OH}\\), glucose cyanohydrin" },
      ],
      pyqExampleId: "12b6ce13-cf57-44ef-8699-36ca7aba0523",
      traps: [
        {
          title: "Bromine water and nitric acid give different acids",
          body: "Bromine water oxidises only the −CHO and gives the monocarboxylic gluconic acid. Nitric acid oxidises both ends and gives the dicarboxylic saccharic acid. Swapping the two products loses the mark.",
        },
        {
          title: "Oxime and cyanohydrin do not prove an aldehyde",
          body: "Hydroxylamine and HCN prove only a carbonyl group. That the carbonyl is an aldehyde comes from bromine water. Name the right reaction for the group asked.",
        },
        {
          title: "Reaction without the conclusion",
          body: "\"Glucose gives n-hexane with HI\" earns half the marks. Add what it proves: the six carbons are in a straight chain. Every \"how do you explain\" answer needs the reagent, the product and the conclusion.",
        },
        {
          title: "D does not mean dextrorotatory",
          body: "D gives the configuration, compared with glyceraldehyde. The sign (+) or (−) gives the rotation. Fructose is D-(−)-fructose: a D sugar that is laevorotatory.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-cyclic",
      name: "Cyclic structure of glucose and fructose: anomers",
      intuition:
        "Glucose's open chain explains most of its reactions, but not all. It ignores some aldehyde tests, its pentaacetate ignores hydroxylamine, and it crystallises in two forms. All three puzzles vanish if the −OH on C-5 adds to the −CHO and closes a ring. C-1 then carries a new −OH that can point one way or the other: that is why there are two forms.",
      definition:
        "Facts the open-chain structure **cannot** explain:\n" +
        "- Despite having an aldehyde group, glucose does **not give Schiff's test** and does **not form the hydrogensulphite addition product with \\(\\text{NaHSO}_3\\)**.\n" +
        "- The **pentaacetate of glucose does not react with hydroxylamine**: no free −CHO group.\n" +
        "- Glucose exists in **two crystalline forms, α and β**. The α-form (m.p. 419 K) crystallises from a concentrated solution at 303 K; the β-form (m.p. 423 K) from a hot, saturated aqueous solution at 371 K.\n" +
        "The cyclic structure:\n" +
        "- The **−OH at C-5 adds to the −CHO group**, giving a **cyclic hemiacetal**: a six-membered ring of five carbons and one oxygen, called **pyranose** after pyran.\n" +
        "- The two cyclic forms differ only in the configuration of the −OH at **C-1, the anomeric carbon** (the aldehyde carbon before cyclisation). Such isomers, α and β, are called **anomers**. Both exist in equilibrium with the open chain.\n" +
        "- In the Haworth structure of α-D-glucopyranose the −OH on C-1 is on the opposite side of the ring to the −CH₂OH group; in the β-form it is on the same side.\n" +
        "- **Fructose** is a ketohexose with its keto group at **C-2**, written D-(−)-fructose (laevorotatory). The −OH at **C-5 adds to the C-2 carbonyl**, giving a **five-membered furanose** ring (four carbons and one oxygen, after furan). Its anomeric carbon is **C-2**.",
      table: {
        columns: ["Observation", "Why the open chain fails", "How the ring explains it"],
        rows: [
          {
            cells: ["No Schiff's test, no NaHSO₃ addition product", "An open chain has a free −CHO, which should give both", "In the ring the −CHO is tied up as a hemiacetal"],
            noteAmber: "Board 2025 MCQ: \"it does not give Schiff's test\" was one of the true statements about glucose.",
            pyqExampleId: "77433261-6b7f-4af7-a4be-c800217d84f1",
          },
          {
            cells: ["Glucose pentaacetate does not react with NH₂OH", "A free −CHO would form an oxime", "The C-1 −OH is acetylated, so the ring cannot open"],
            noteAmber: "Board 2026 asked this as assertion-reason: the Reason \"indicates the absence of free −CHO group\" is the right explanation (A).",
            pyqExampleId: "fb2001fd-7111-4d2e-b399-e68ac91ca926",
          },
          { cells: ["Two crystalline forms, α (m.p. 419 K) and β (m.p. 423 K)", "An open chain has no new stereocentre at C-1", "Ring closure makes C-1 asymmetric: two anomers"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the ring form of fructose, which carbon is the anomeric carbon, which −OH group closes the ring, and how many atoms make up the ring?",
        steps: [
          "Fructose is a ketohexose; its carbonyl carbon is C-2, so C-2 becomes the anomeric carbon.",
          "The −OH at C-5 adds to the C-2 carbonyl group.",
          "The ring holds C-2, C-3, C-4, C-5 and the oxygen: five atoms, the furanose ring.",
        ],
        answer: "C-2 is anomeric; the C-5 −OH closes the ring; a five-membered furanose ring",
      },
      practiceSet: [
        { prompt: "Define anomers and name the anomers of glucose.", answer: "Isomers that differ only in the configuration at the anomeric carbon (C-1 in glucose); α-D-glucose and β-D-glucose" },
        { prompt: "Which two groups of glucose react to form the pyranose ring?", answer: "The −OH at C-5 and the aldehyde group at C-1" },
        { prompt: "Why is the six-membered ring form of glucose called pyranose?", answer: "By analogy with pyran, a cyclic compound with one oxygen and five carbon atoms in its ring" },
        { prompt: "How is the β-form of glucose obtained, and what is its melting point?", answer: "By crystallisation from a hot, saturated aqueous solution at 371 K; m.p. 423 K" },
      ],
      pyqExampleId: "2e09ddac-297e-4c1e-9bdd-0f60cac1e4a3",
      traps: [
        {
          title: "α and β differ at C-1 only",
          body: "The two anomers of glucose have the same ring size and the same number of −OH groups. They differ only in the configuration at C-1. A 2025 MCQ offered ring size and C-2 as wrong options.",
        },
        {
          title: "Glucose is pyranose, fructose is furanose",
          body: "Glucose closes C-1 to C-5 into a six-membered pyranose ring; fructose closes C-2 to C-5 into a five-membered furanose ring. \"Glucose exists in furanose form\" was the false statement in a 2025 MCQ.",
        },
        {
          title: "The anomeric carbon of fructose is C-2",
          body: "The anomeric carbon is the carbonyl carbon of the open chain: C-1 in glucose, C-2 in fructose.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-disaccharides",
      name: "Sucrose, maltose and lactose: glycosidic linkage and invert sugar",
      intuition:
        "A disaccharide is two sugar units joined through an oxygen bridge. Whether it is a reducing sugar depends on which carbons the bridge uses. If it ties up the reducing group of both units, as in sucrose, nothing is left to reduce Tollens' reagent. If one unit's C-1 is left free, as in maltose and lactose, the sugar still reduces.",
      definition:
        "- Disaccharides on hydrolysis with dilute acids or enzymes give two molecules of the same or different monosaccharides.\n" +
        "- **Glycosidic linkage:** the oxide linkage joining two monosaccharide units **through an oxygen atom**, formed by the loss of a water molecule.\n" +
        "- If the reducing groups (aldehydic or ketonic) of both units are bonded, the sugar is **non-reducing** (sucrose); if one is free, it is **reducing** (maltose, lactose).\n" +
        "- **Sucrose** (cane sugar): glycosidic linkage between **C1 of α-D-glucose and C2 of β-D-fructose**; both reducing groups are used, so it is non-reducing. Hydrolysis gives an equimolar mixture of D-(+)-glucose and D-(−)-fructose: \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^{+}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{C}_6\\text{H}_{12}\\text{O}_6\\)\n" +
        "- **Invert sugar:** sucrose is dextrorotatory. Its hydrolysis gives dextrorotatory glucose (+52.5°) and laevorotatory fructose (−92.4°). The laevorotation of fructose is larger, so the mixture is laevorotatory. The sign of rotation changes from (+) to (−), so the hydrolysis is called **inversion** and the product is **invert sugar**.\n" +
        "- **Maltose:** two α-D-glucose units, **C1 of one linked to C4 of the other**. A free aldehyde group can be produced at C1 of the second glucose, so it is reducing.\n" +
        "- **Lactose** (milk sugar): **β-D-galactose and β-D-glucose**, linked from C1 of galactose to C4 of glucose. A free aldehyde group can be produced at C-1 of the glucose unit, so it is reducing.",
      table: {
        columns: ["Disaccharide", "Units and linkage", "Hydrolysis products", "Reducing?"],
        rows: [
          { cells: ["Sucrose (cane sugar)", "α-D-glucose C1 to β-D-fructose C2", "D-(+)-glucose and D-(−)-fructose (invert sugar)", "No: both reducing groups are bonded"] },
          {
            cells: ["Maltose", "Two α-D-glucose, C1 to C4", "Two molecules of glucose", "Yes: free aldehyde at C1 of the second glucose"],
            noteAmber: "Board 2025 asked this as assertion-reason: both true and the Reason explains it (A).",
            pyqExampleId: "ae6c342b-d600-4699-8b27-0870e74a22b3",
          },
          {
            cells: ["Lactose (milk sugar)", "β-D-galactose C1 to β-D-glucose C4", "Galactose and glucose", "Yes: free aldehyde at C-1 of the glucose unit"],
            noteAmber: "Board 2023 MCQ: lactose is the one that gives glucose and galactose.",
            pyqExampleId: "ec19fd92-8b70-4482-8d48-328b5e126f83",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Maltose and lactose are both reducing sugars. Which of them gives only glucose on hydrolysis, and at which carbon of which unit is the free aldehyde group produced in each?",
        steps: [
          "Maltose is two α-D-glucose units, so it gives only glucose. Its free aldehyde comes at C1 of the second glucose unit.",
          "Lactose is galactose plus glucose. Its linkage uses C1 of galactose, so the free aldehyde comes at C-1 of the glucose unit.",
        ],
        answer: "Maltose gives only glucose; free −CHO at C1 of its second glucose; in lactose at C-1 of the glucose unit",
      },
      practiceSet: [
        { prompt: "Define invert sugar.", answer: "The equimolar mixture of glucose and fructose formed by hydrolysis of sucrose, which is laevorotatory although sucrose is dextrorotatory" },
        { prompt: "Why does the mixture from hydrolysis of sucrose rotate light to the left?", answer: "The laevorotation of fructose (−92.4°) is more than the dextrorotation of glucose (+52.5°)" },
        { prompt: "What is a glycosidic linkage?", answer: "The oxide linkage joining two monosaccharide units through an oxygen atom, formed by the loss of a water molecule" },
        { prompt: "Name the sugar found in milk and its hydrolysis products.", answer: "Lactose; galactose and glucose" },
      ],
      pyqExampleId: "336e3da7-ae89-423a-b36e-00093d966e34",
      traps: [
        {
          title: "Invert sugar is the product, not sucrose",
          body: "Invert sugar is the mixture of glucose and fructose formed on hydrolysis. Sucrose itself is dextrorotatory. Even when the question says \"sucrose is known as invert sugar\", answer by explaining the change in sign on hydrolysis.",
        },
        {
          title: "Lactose is not glucose plus fructose",
          body: "Sucrose gives glucose and fructose; lactose gives galactose and glucose; maltose gives glucose alone. The board's MCQs mix up these three, often with a monosaccharide such as galactose, which cannot be hydrolysed at all, as the fourth option.",
        },
        {
          title: "\"Hydrolysis of sucrose\" has a name",
          body: "It is called inversion, because the sign of rotation inverts. Hydration, esterification and saponification are the usual wrong options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-polysaccharides",
      name: "Starch, cellulose and glycogen",
      intuition:
        "Plants and animals both store glucose by chaining thousands of units together, and plants also build their walls from it. What changes is the anomer and the branching. Starch and glycogen are chains of α-glucose; cellulose is a straight chain of β-glucose. Starch keeps one straight part and one branched part; glycogen is branched even more.",
      definition:
        "- Polysaccharides contain a large number of monosaccharide units joined by glycosidic linkages. They act mainly as **food storage** or **structural** materials.\n" +
        "- **Starch:** the main storage polysaccharide of plants and the most important dietary source for human beings (cereals, roots, tubers, some vegetables). A polymer of **α-glucose** with two components:\n" +
        "- **Amylose:** water soluble, about **15 to 20%** of starch; a long **unbranched** chain of 200 to 1000 α-D-(+)-glucose units held by **C1 to C4** glycosidic linkages.\n" +
        "- **Amylopectin:** insoluble in water, about **80 to 85%** of starch; a **branched** polymer of α-D-glucose: the chain is formed by **C1 to C4** linkages and the branching by **C1 to C6** linkages.\n" +
        "- **Cellulose:** occurs only in plants and is the most abundant organic substance in the plant kingdom; the main constituent of plant cell walls. A **straight-chain** polymer of **β-D-glucose** units joined from C1 of one unit to C4 of the next.\n" +
        "- **Glycogen (animal starch):** carbohydrates are stored in the animal body as glycogen. Its structure is similar to amylopectin but **more highly branched**. Present in liver, muscles and brain, and also in yeast and fungi. When the body needs glucose, enzymes break glycogen down to glucose.\n" +
        "- **Importance:** carbohydrates form a major part of our food (honey is an instant source of energy); starch and glycogen are storage molecules; cellulose forms the cell walls of bacteria and plants, and gives wood and cotton; they are raw materials for textiles, paper, lacquers and breweries.",
      table: {
        columns: ["Polysaccharide", "Built from", "Linkages and shape", "Found in"],
        rows: [
          {
            cells: ["Amylose (15 to 20% of starch, soluble)", "α-D-glucose", "C1 to C4 only; unbranched", "Starch of cereals, roots, tubers"],
            noteAmber: "Board 2023 MCQ: the linkage in the amylose part of starch is C1 to C4 α.",
            pyqExampleId: "e9d1a0f5-228b-4111-8ae4-7afe46e77a23",
          },
          { cells: ["Amylopectin (80 to 85% of starch, insoluble)", "α-D-glucose", "C1 to C4 chains, C1 to C6 branches", "Starch of cereals, roots, tubers"] },
          {
            cells: ["Cellulose", "β-D-glucose", "C1 to C4; straight chain", "Cell walls of plants"],
            noteAmber: "Board 2026 MCQ: cellulose is the carbohydrate that gives only β-glucose on hydrolysis.",
            pyqExampleId: "dc6aa85b-bab6-4332-a6ba-0886b32d1b54",
          },
          {
            cells: ["Glycogen (animal starch)", "α-D-glucose", "Like amylopectin, more highly branched", "Liver, muscles, brain; yeast and fungi"],
            noteAmber: "Board 2024 asked why glycogen is called animal starch.",
            pyqExampleId: "f54e8e37-aeab-4221-b88c-e3b8933248a8",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write two main functions of carbohydrates in plants.",
        steps: [
          "Starch is the main storage polysaccharide of plants: it stores food.",
          "Cellulose is the main constituent of the plant cell wall: it gives the plant its structure.",
        ],
        answer: "Food storage (as starch) and structural material of the cell wall (as cellulose)",
      },
      practiceSet: [
        { prompt: "Name the two components of starch and give the share of each.", answer: "Amylose, about 15 to 20%, and amylopectin, about 80 to 85%" },
        { prompt: "Which glycosidic linkage produces the branches in amylopectin?", answer: "The C1 to C6 glycosidic linkage" },
        { prompt: "Which polysaccharide is a straight chain of β-D-glucose units, and where is it found?", answer: "Cellulose; in the cell walls of plants" },
        { prompt: "Give one difference between amylose and amylopectin other than branching.", answer: "Amylose is soluble in water; amylopectin is insoluble" },
      ],
      pyqExampleId: "25b8bfb3-9b34-413d-b747-f51a6a15274b",
      traps: [
        {
          title: "Amylose dissolves, amylopectin does not",
          body: "Amylose is the water-soluble part (15 to 20%); amylopectin is the insoluble, larger part (80 to 85%). Students often swap them.",
        },
        {
          title: "Starch and cellulose differ in the anomer",
          body: "The basic structural difference is that starch is a polymer of α-glucose and cellulose of β-glucose. Saying \"cellulose is a polymer of glucose\" does not answer the question.",
        },
        {
          title: "Glycogen is more branched, not less",
          body: "Glycogen resembles amylopectin but is more highly branched. It is not a straight chain like cellulose.",
        },
      ],
    },
  ],
};
