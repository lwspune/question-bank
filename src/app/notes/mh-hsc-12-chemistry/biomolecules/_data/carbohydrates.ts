import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_BM_CARBOHYDRATES_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates",
  title: "Carbohydrates: Glucose, Its Structure and the Glycosidic Linkages",
  oneLineDefinition:
    "What carbohydrates are and how they are classified, how glucose is prepared, the reactions that prove its structure, its chiral carbons and ring form, and the linkages in disaccharides and polysaccharides.",
  whyItMatters:
    "28 questions, nineteen of them from board papers from 2014 to 2026. The board asks most often how glucose is prepared from cane sugar or starch (2017, 2019, 2023, 2025 and 2026), what glucose gives with bromine water, nitric acid, HCN and acetic anhydride (2014, 2020 and 2026), the glycosidic linkage in maltose or lactose (2023, 2024 and 2026), and the chiral carbons and optical isomers of glucose (2020 and 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccbm-classification",
      name: "What carbohydrates are and how they are classified",
      intuition:
        "Glucose, sucrose and starch look very different, but break any of them down with acid and you end up with the same kind of unit: a sugar molecule carrying several hydroxyl groups and one carbonyl group. Carbohydrates are sorted by how many such units one molecule gives on hydrolysis, and a single sugar is named by its carbonyl group and its number of carbons.",
      definition:
        "- **Carbohydrates** are polyhydroxy aldehydes or ketones, or compounds which give rise to such units on hydrolysis.\n" +
        "- They are also called saccharides (the Greek word for sugar is sakkharon). The name carbohydrate comes from the formula of many of them, \\(\\text{C}_x(\\text{H}_2\\text{O})_y\\), a hydrate of carbon: glucose is \\(\\text{C}_6(\\text{H}_2\\text{O})_6\\).\n" +
        "- They are classified by their behaviour on hydrolysis into **monosaccharides, oligosaccharides and polysaccharides**. Oligosaccharides give two to ten monosaccharide units and are further called disaccharides, trisaccharides and so on.\n" +
        "- **Naming a monosaccharide:** one aldehydic carbonyl group makes it an **aldose**, one ketonic carbonyl group a **ketose**; the name then adds the total number of carbons. Glucose is an aldohexose, fructose a ketohexose, ribose an aldopentose. The IUPAC general name for a monosaccharide is glycose.\n" +
        "- **Reducing and non-reducing sugars:** a sugar with a free hemiacetal group (a potential aldehyde group) reduces Tollens and Fehling reagents, so it is a reducing sugar: glucose, fructose, maltose, lactose. Sucrose has no free hemiacetal group and is a non-reducing sugar.\n" +
        "- Board 2014 asked you to define complex lipids and give two functions of lipids. The present book mentions lipids in one line only (the main ingredient of vegetable oils and milk fats), so give that question less time.",
      table: {
        columns: ["Class", "On hydrolysis gives", "Examples"],
        rows: [
          {
            cells: ["Monosaccharides", "No smaller sugar units", "Glucose, fructose, ribose"],
            pyqExampleId: "b5dbea54-72d4-47e8-9dec-9c4abca51005",
            noteAmber: "Board 2025 asked what monosaccharides are.",
          },
          {
            cells: ["Disaccharides", "Two monosaccharide units", "Sucrose (glucose + fructose), maltose (two glucose), lactose (glucose + galactose)"],
          },
          { cells: ["Trisaccharides", "Three monosaccharide units", "Raffinose (glucose, fructose and galactose)"] },
          { cells: ["Tetrasaccharides", "Four monosaccharide units", "Stachyose (glucose, fructose and two galactose)"] },
          { cells: ["Polysaccharides", "A very large number of monosaccharide units", "Starch, glycogen, cellulose"] },
        ],
      },
      practiceSet: [
        { prompt: "Which class of carbohydrates gives two to ten monosaccharide units on hydrolysis?", answer: "Oligosaccharides" },
        { prompt: "Ribose, \\(\\text{CHO}-(\\text{CHOH})_3-\\text{CH}_2\\text{OH}\\), has an aldehyde group. Give its class name using both its carbonyl group and its number of carbons.", answer: "Aldopentose" },
        { prompt: "Fructose, \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\), has one ketonic carbonyl group. Give its class name.", answer: "Ketohexose" },
        { prompt: "Why are carbohydrates also called hydrates of carbon?", answer: "The formula of many of them can be written as \\(\\text{C}_x(\\text{H}_2\\text{O})_y\\)" },
      ],
      pyqExampleId: "badd1027-f505-4a1b-a8ab-fac403c1b0d4",
      traps: [
        {
          title: "Defining a carbohydrate by its formula",
          body: "\\(\\text{C}_x(\\text{H}_2\\text{O})_y\\) only explains the name. The definition the board wants is 'polyhydroxy aldehydes or ketones, or compounds which give such units on hydrolysis'.",
        },
        {
          title: "Counting only the chain in brackets",
          body: "To name a monosaccharide, count every carbon, including the carbonyl carbon and both end carbons. A chain with \\(\\text{CH}_2\\text{OH}\\) at both ends and a \\(\\text{CO}\\) inside is a ketose, never an aldose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-glucose-prep",
      name: "Preparing glucose from cane sugar and from starch",
      intuition:
        "Glucose is locked up inside bigger carbohydrates, so it is made by breaking them apart with water and an acid catalyst. Cane sugar gives glucose mixed with fructose, so a second step is needed to separate them. Starch is made of glucose units only, which is why industry uses it.",
      definition:
        "- **From sucrose (cane sugar):** sucrose is warmed with dilute hydrochloric acid or dilute sulfuric acid for about two hours. It is hydrolysed to a mixture of glucose and fructose.\n" +
        "- **Separation:** ethanol is added while the solution cools. Glucose is almost insoluble in alcohol, so it crystallises out first. The solution is filtered to collect the crystals of glucose.\n" +
        "- **Commercial method, from starch:** starch is boiled with dilute sulfuric acid at 393 K under a pressure of 2 to 3 atm.\n" +
        "- \\((\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{dil. H}_2\\text{SO}_4,\\ 393\\ \\text{K},\\ 2\\text{ to }3\\ \\text{atm}} n\\,\\text{C}_6\\text{H}_{12}\\text{O}_6\\)",
      formula: {
        label: "Hydrolysis of sucrose",
        latex:
          "\\underset{\\text{sucrose}}{\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}} + \\text{H}_2\\text{O} \\xrightarrow{\\text{dil. HCl, warm}} \\underset{\\text{glucose}}{\\text{C}_6\\text{H}_{12}\\text{O}_6} + \\underset{\\text{fructose}}{\\text{C}_6\\text{H}_{12}\\text{O}_6}",
      },
      authoredExample: {
        prompt: "How is glucose prepared by the commercial method? Write the reaction.",
        steps: [
          "Raw material: starch, \\((\\text{C}_6\\text{H}_{10}\\text{O}_5)_n\\).",
          "Condition: starch is boiled with dilute sulfuric acid at 393 K under a pressure of 2 to 3 atm.",
          "Reaction: \\((\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\,\\text{H}_2\\text{O} \\xrightarrow{\\text{dil. H}_2\\text{SO}_4,\\ 393\\ \\text{K}} n\\,\\text{C}_6\\text{H}_{12}\\text{O}_6\\)",
          "The acid breaks the glycosidic linkages and sets the glucose units free.",
        ],
        answer: "Glucose is made commercially by boiling starch with dilute sulfuric acid at 393 K and 2 to 3 atm.",
      },
      selfCheckExample: {
        prompt: "Ethanol is added to the cooling solution obtained by hydrolysing cane sugar. Which sugar crystallises out first, and why?",
        steps: ["Glucose is almost insoluble in alcohol, while fructose stays dissolved."],
        answer: "Glucose, because it is almost insoluble in alcohol",
      },
      practiceSet: [
        { prompt: "Name the two acids either of which is used to hydrolyse cane sugar to glucose.", answer: "Dilute hydrochloric acid or dilute sulfuric acid" },
        { prompt: "At what temperature and pressure is starch hydrolysed in the commercial preparation of glucose?", answer: "393 K and 2 to 3 atm" },
        { prompt: "In what ratio are glucose and fructose formed when sucrose is hydrolysed?", answer: "Equal amounts: an equimolar mixture" },
      ],
      pyqExampleId: "24874d28-12a7-42fa-9f6c-cc2809d5c9b7",
      traps: [
        {
          title: "Writing only the equation",
          body: "A preparation question carries marks for the conditions (dilute acid, warming for about two hours) and for separating glucose with ethanol. The equation alone earns only part of them.",
        },
        {
          title: "Mixing up the two methods",
          body: "Cane sugar is warmed with dilute HCl or dilute \\(\\text{H}_2\\text{SO}_4\\) and gives glucose plus fructose. Starch is boiled with dilute \\(\\text{H}_2\\text{SO}_4\\) at 393 K and 2 to 3 atm and gives glucose only.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccbm-glucose-reactions",
      name: "Reactions of glucose and what each one proves",
      intuition:
        "Nobody could see the glucose molecule, so its open chain structure was pieced together one reaction at a time. Each reagent attacks one group, and the product tells you that group is there. Learn the reactions as pairs: what glucose gives, and what that proves.",
      definition:
        "- Glucose is an aldohexose, \\(\\text{CHO}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH}\\): one formyl group at C-1, four secondary -OH groups at C-2 to C-5 and one primary -OH group at C-6.\n" +
        "- Its molecular formula \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\) was found from its elemental composition and colligative properties.\n" +
        "- **Bromine water** (a mild oxidising agent): \\(\\text{CHO}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH} \\xrightarrow{\\text{Br}_2\\text{ water}} \\text{COOH}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH}\\) (gluconic acid).\n" +
        "- **Dilute nitric acid:** \\(\\text{CHO}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH} \\xrightarrow{\\text{dil. HNO}_3} \\text{COOH}-(\\text{CHOH})_4-\\text{COOH}\\) (saccharic acid). Gluconic acid gives the same acid.\n" +
        "- **HCN:** \\(\\text{CHO}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH} + \\text{HCN} \\longrightarrow \\text{NC}-\\text{CH(OH)}-(\\text{CHOH})_4-\\text{CH}_2\\text{OH}\\) (cyanohydrin).\n" +
        "- **Acetylation:** each -OH group has its H replaced by an acetyl group, \\(-\\text{COCH}_3\\). One mole of glucose takes five moles of acetic anhydride and gives glucose pentaacetate. Each acetylated -OH raises the molecular mass by 42 u.",
      table: {
        columns: ["Reagent", "Product", "What it proves"],
        rows: [
          { cells: ["Prolonged heating with HI", "n-Hexane", "The six carbons form a straight chain"] },
          { cells: ["Hydroxylamine, \\(\\text{NH}_2\\text{OH}\\)", "Oxime", "A carbonyl group is present"] },
          {
            cells: ["Hydrogen cyanide, HCN", "Cyanohydrin", "A carbonyl group is present"],
            pyqExampleId: "e9809880-0f2c-45a5-8457-ab414479619f",
            noteAmber: "Board 2014 asked what glucose gives with bromine water, dilute nitric acid and HCN.",
          },
          {
            cells: ["Bromine water, a mild oxidising agent", "Gluconic acid, a six carbon monocarboxylic acid", "The carbonyl group is an aldehyde (formyl) group"],
            pyqExampleId: "1ed06516-ca66-4d62-8fa2-a443307c0e48",
            noteAmber: "Board 2026 asked for this reaction.",
          },
          {
            cells: ["Acetic anhydride", "Glucose pentaacetate", "Five -OH groups, on five different carbons"],
            pyqExampleId: "e8c98f76-338b-44ee-a501-2fade457fe4d",
            noteAmber: "Board 2020 asked which reagent shows the five hydroxyl groups.",
          },
          { cells: ["Dilute nitric acid", "Saccharic acid, a dicarboxylic acid", "One primary alcoholic (\\(-\\text{CH}_2\\text{OH}\\)) group"] },
        ],
      },
      practiceSet: [
        { prompt: "How many moles of acetic anhydride react with 3 moles of glucose to form glucose pentaacetate?", answer: "15 moles (5 for each mole of glucose)" },
        { prompt: "A compound of molecular mass 92 u gives an acetyl derivative of molecular mass 218 u. How many -OH groups does it have?", answer: "\\((218-92)/42 = 126/42 = 3\\)" },
        { prompt: "Which reaction of glucose shows that its six carbons form a straight chain?", answer: "Prolonged heating with HI gives n-hexane" },
        { prompt: "Name the acid formed when glucose is oxidised by dilute nitric acid.", answer: "Saccharic acid" },
      ],
      pyqExampleId: "1ed06516-ca66-4d62-8fa2-a443307c0e48",
      traps: [
        {
          title: "Gluconic and saccharic acid swapped",
          body: "Bromine water is mild and oxidises only the -CHO, giving gluconic acid (one -COOH). Dilute nitric acid also oxidises the \\(-\\text{CH}_2\\text{OH}\\) at C-6, giving saccharic acid (two -COOH).",
        },
        {
          title: "Saying HCN proves an aldehyde",
          body: "The oxime and the cyanohydrin prove only that a carbonyl group is present. That it is an aldehyde is proved by oxidation with bromine water.",
        },
        {
          title: "Six hydroxyl groups for glucose",
          body: "Glucose has five -OH groups; the sixth oxygen is in the -CHO group. So one mole needs five moles of acetic anhydride.",
        },
        {
          title: "Adding 43 for each acetyl group",
          body: "The acetyl group (43 u) replaces an H atom (1 u), so the mass rises by 42 u for each -OH acetylated.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-optical-ring",
      name: "Chiral carbons, D and L, and the ring form of glucose",
      intuition:
        "A carbon carrying four different groups can hold them in two mirror image arrangements. Every such chiral carbon doubles the number of possible isomers. Glucose also curls up: its -CHO meets its own C-5 hydroxyl and closes a ring, and that ring closure makes C-1 a new chiral centre.",
      definition:
        "- A carbon atom with four different groups is chiral. A formula with n chiral carbons has at most \\(2^n\\) optical isomers.\n" +
        "- In open chain glucose, C-2, C-3, C-4 and C-5 are chiral; C-1 (-CHO) and C-6 (\\(-\\text{CH}_2\\text{OH}\\)) are not. An aldohexose can exist as sixteen optical isomers, and glucose is one of them.\n" +
        "- Glucose is dextrorotatory, specific rotation +52.7°, so it is also called dextrose.\n" +
        "- **D and L** give the relative configuration, compared with glyceraldehyde: (+)-glyceraldehyde, with -OH on C-2 on the right, is D. A monosaccharide is D or L by the -OH on its **lowest chiral carbon** in the Fischer projection: on the right, D; on the left, L.\n" +
        "- **Ring form:** the -CHO group reacts with the -OH at C-5 to give a hemiacetal ring of five carbons and one oxygen. A six membered ring is called pyranose (after pyran), so ring glucose is glucopyranose.\n" +
        "- Ring closure makes C-1 a new chiral centre, the **anomeric carbon**. The \\(\\alpha\\) and \\(\\beta\\) anomers differ only at C-1. In water the two ring forms are in equilibrium through the open chain form.\n" +
        "- **Haworth formula:** the ring is drawn in a plane perpendicular to the paper. The lower side is the \\(\\alpha\\) side and the upper side the \\(\\beta\\) side. The \\(\\alpha\\) anomer has its C-1 -OH below, the \\(\\beta\\) anomer above. A group on the right in the Fischer formula appears below the ring, a group on the left appears above.\n" +
        "- Board 2020 paired the Haworth formula with 'define hormones'. The present book only says that insulin, a hormone secreted by the pancreas, controls the blood sugar level, so give that part little time.",
      formula: {
        label: "Maximum number of optical isomers",
        latex: "N = 2^n",
        symbols: [
          { symbol: "\\(N\\)", meaning: "the largest possible number of optical isomers (stereostructures)" },
          { symbol: "\\(n\\)", meaning: "the number of chiral carbon atoms" },
        ],
      },
      authoredExample: {
        prompt: "How many optical isomers are possible for an aldopentose such as ribose, \\(\\text{CHO}-(\\text{CHOH})_3-\\text{CH}_2\\text{OH}\\)? Explain.",
        steps: [
          "C-1 is the -CHO carbon and C-5 the \\(-\\text{CH}_2\\text{OH}\\) carbon: neither carries four different groups.",
          "C-2, C-3 and C-4 each carry H, -OH and two different parts of the chain, so each is chiral: \\(n = 3\\).",
          "Formula: \\(N = 2^n\\).",
          "Substitution: \\(N = 2^3 = 8\\).",
        ],
        answer: "Three chiral carbons, so at most 8 optical isomers",
      },
      selfCheckExample: {
        prompt: "In the Fischer projection of an aldopentose, the -OH on C-4, its lowest chiral carbon, is written on the left. Is the sugar D or L?",
        steps: ["The configuration is read from the lowest chiral carbon: -OH on the left means L."],
        answer: "L",
      },
      practiceSet: [
        { prompt: "What is the anomeric carbon of glucopyranose?", answer: "C-1, the new chiral centre formed when the ring closes" },
        { prompt: "Which two groups of glucose react to form its pyranose ring?", answer: "The -CHO group at C-1 and the -OH group at C-5" },
        { prompt: "In the Haworth formula of \\(\\alpha\\)-D-glucopyranose, is the -OH at C-1 above or below the ring?", answer: "Below, on the \\(\\alpha\\) side" },
        { prompt: "Why is the ring form of glucose called a pyranose?", answer: "Its ring is six membered (five carbons and one oxygen), like pyran" },
      ],
      pyqExampleId: "ba2e0aa7-2292-460e-a115-dc27b82eedb1",
      traps: [
        {
          title: "Counting the end carbons as chiral",
          body: "The -CHO carbon and the \\(-\\text{CH}_2\\text{OH}\\) carbon never carry four different groups. Count only the CHOH carbons of the open chain.",
        },
        {
          title: "D and L read from the wrong carbon",
          body: "Look at the lowest chiral carbon, the one farthest from the carbonyl group, not C-2. And D or L tells the configuration, not the sign of rotation: D-fructose is laevorotatory.",
        },
        {
          title: "Alpha and beta swapped",
          body: "In the Haworth formula the \\(\\alpha\\) anomer has its C-1 -OH on the lower side; the \\(\\beta\\) anomer has it on the upper side.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccbm-disaccharides",
      name: "Disaccharides, polysaccharides and reducing sugars",
      intuition:
        "Two sugar rings join through an oxygen bridge, the glycosidic linkage. Which carbons the bridge joins decides everything: whether a free hemiacetal group is left over (a reducing sugar), what the sugar is called, and whether our body can break it.",
      definition:
        "- Monosaccharide units are joined by an ether oxide linkage (-O-) called the **glycosidic linkage**, formed by removing water from two -OH groups. At least one unit uses its anomeric -OH.\n" +
        "- A sugar is **reducing** if a hemiacetal group (a potential aldehyde group) is left free: it gives positive Tollens and Fehling tests. Maltose and lactose are reducing. In sucrose both anomeric groups are used in the linkage, so it is **non-reducing**.\n" +
        "- **Inversion of sucrose:** sucrose is dextrorotatory (+66.5°). Hydrolysis with dilute acid or the enzyme invertase gives an equimolar mixture of D-(+)-glucose (+52.7°) and D-(-)-fructose (-92.4°). The laevorotation of fructose is larger, so the mixture is laevorotatory: the sign of rotation is inverted. The product is called invert sugar.\n" +
        "- Maltose gives glucose on hydrolysis with dilute acid or the enzyme maltase.",
      table: {
        columns: ["Carbohydrate", "Made of", "Glycosidic linkage", "Key fact"],
        rows: [
          { cells: ["Sucrose", "\\(\\alpha\\)-D-glucose and \\(\\beta\\)-D-fructose", "\\(\\alpha,\\beta\\)-1,2 (C-1 of glucose to C-2 of fructose)", "Non-reducing; its hydrolysis is called inversion"] },
          {
            cells: ["Maltose", "Two D-glucose units", "\\(\\alpha\\)-1,4 (C-1 of one ring to C-4 of the other)", "Reducing: C-1 of the second ring is free"],
            pyqExampleId: "485733ad-f183-4367-9c34-f388f8d3deaf",
            noteAmber: "Board 2023 (multiple choice) and 2026 asked for this linkage.",
          },
          {
            cells: ["Lactose", "D-galactose and D-glucose", "\\(\\beta\\)-1,4 (C-1 of galactose to C-4 of glucose)", "Reducing: C-1 of the glucose unit is free; the sugar of milk"],
            pyqExampleId: "4734b5f3-4d08-4a99-a9eb-2f2f8bcaedd6",
            noteAmber: "Board 2024 asked for this linkage (multiple choice).",
          },
          { cells: ["Amylose (15 to 20% of starch)", "200 to 1000 \\(\\alpha\\)-D-glucose units, unbranched", "\\(\\alpha\\)-1,4", "Soluble in water; blue colour with iodine"] },
          { cells: ["Amylopectin (80 to 85% of starch)", "\\(\\alpha\\)-D-glucose units, branched", "\\(\\alpha\\)-1,4 in the chains, \\(\\alpha\\)-1,6 at the branches", "Insoluble in water; blue-violet colour with iodine"] },
          { cells: ["Cellulose", "\\(\\beta\\)-D-glucose units, straight chain", "\\(\\beta\\)-1,4", "Humans cannot digest it; it is the fibre of food"] },
          { cells: ["Glycogen", "\\(\\alpha\\)-D-glucose units, very highly branched", "Like amylopectin", "The animal store of carbohydrate, in liver, muscles and brain"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is sucrose a non-reducing sugar?", answer: "Its linkage joins C-1 of glucose to C-2 of fructose, so neither unit has a free hemiacetal group" },
        { prompt: "Which two sugars are formed when sucrose is hydrolysed by invertase?", answer: "D-(+)-glucose and D-(-)-fructose, in equal amounts" },
        { prompt: "Which component of starch is soluble in water and gives a blue colour with iodine?", answer: "Amylose" },
        { prompt: "Why can human beings not digest cellulose?", answer: "They have no enzyme that can hydrolyse its \\(\\beta\\)-1,4 glycosidic linkages" },
      ],
      pyqExampleId: "485733ad-f183-4367-9c34-f388f8d3deaf",
      traps: [
        {
          title: "Maltose and lactose given the same linkage",
          body: "Both are 1,4 linkages, but maltose is \\(\\alpha\\)-1,4 (two glucose units) and lactose is \\(\\beta\\)-1,4 (galactose to glucose).",
        },
        {
          title: "Calling sucrose a reducing sugar",
          body: "Sucrose joins C-1 of glucose to C-2 of fructose, using up both anomeric groups. No hemiacetal group is left, so it gives a negative Tollens test.",
        },
        {
          title: "Thinking sucrose itself is laevorotatory",
          body: "Sucrose is dextrorotatory. It is the product mixture that is laevorotatory, because the laevorotation of fructose is larger than the dextrorotation of glucose.",
        },
        {
          title: "Glycogen and amylose confused",
          body: "Amylose is unbranched. Glycogen is built like amylopectin but is even more highly branched.",
        },
      ],
    },
  ],
};
