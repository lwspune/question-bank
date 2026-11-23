import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MI_USES_NOTE: SubtopicNote = {
  subtopicName: "Microbes and Their Uses",
  title: "Microbes and Their Uses",
  oneLineDefinition:
    "Which microbe makes which product: curd, bread, toddy and cheese at home, and drinks, antibiotics, organic acids, enzymes and medicines in industry.",
  whyItMatters:
    "Ten NEET questions from 2021 to 2026, nine of them on which microbe makes which product or what it is used for. NEET 2021, NEET 2024, Re-NEET 2024 and NEET 2026 each set a match-the-columns on microbes and their products, NEET 2022 asked which fungus makes cyclosporin A, streptokinase as a clot buster came up in NEET 2025 and Re-NEET 2026, NEET 2025 asked about household microbes and non-distilled drinks, and NEET 2026 asked what makes the holes in Swiss cheese.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomi-household",
      name: "Microbes in household products",
      intuition:
        "Many foods in your kitchen are made by microbes. A bacterium turns milk into curd, yeast makes bread dough rise, and bacteria give each cheese its own holes, texture and taste. Learn each food with the exact microbe NCERT names for it.",
      definition:
        "Microbes at home:\n" +
        "- *Lactobacillus* and other **lactic acid bacteria (LAB)** turn milk into **curd**. The acids they make **coagulate and partly digest** the milk proteins.\n" +
        "- A little curd added to fresh milk is the **inoculum or starter**: it carries millions of LAB, which multiply at a suitable temperature.\n" +
        "- LAB improve the food value of curd by **increasing vitamin B12**. In our stomach, LAB also **check disease-causing microbes**.\n" +
        "- The dough for **idli and dosa** is fermented by **bacteria**; it puffs up because of **CO₂** gas.\n" +
        "- **Bread** dough is fermented by **baker's yeast**, *Saccharomyces cerevisiae*.\n" +
        "- **Toddy**, a traditional drink of parts of southern India, is made by fermenting the **sap of palms**.\n" +
        "- Microbes are also used to ferment **fish, soyabean and bamboo shoots** into foods.\n" +
        "- Each cheese gets its texture, flavour and taste from its own microbes. **Swiss cheese** has large holes from the **CO₂** made by the bacterium *Propionibacterium sharmanii*. **Roquefort cheese** is ripened by growing a **fungus** on it.",
      table: {
        columns: ["Food", "Microbe", "What the microbe does"],
        rows: [
          { cells: ["Curd", "*Lactobacillus* and other lactic acid bacteria (bacteria)", "Its acids coagulate and partly digest milk proteins; raises vitamin B12"] },
          { cells: ["Idli and dosa batter", "Bacteria", "Ferments the dough; CO₂ gas makes it puff up"] },
          {
            cells: ["Bread", "Baker's yeast, *Saccharomyces cerevisiae*", "Ferments the dough"],
            noteAmber: "NEET 2025: *Lactobacillus*, *Saccharomyces cerevisiae* and *Propionibacterium sharmanii* make household products; *Aspergillus niger* and *Trichoderma polysporum* do not.",
            pyqExampleId: "a5b87df2-2c8c-402a-a857-42d17314a595",
          },
          { cells: ["Toddy", "Microbes that ferment palm sap", "A traditional drink of parts of southern India"] },
          { cells: ["Fermented fish, soyabean and bamboo shoots", "Microbes", "Ferment them into foods"] },
          {
            cells: ["Swiss cheese", "The bacterium *Propionibacterium sharmanii*", "Makes a large amount of CO₂, which leaves the large holes"],
            noteAmber: "NEET 2026: the holes come from CO₂ made by *Propionibacterium sharmanii*.",
            pyqExampleId: "767b3e24-11e7-4fb3-ac16-24c76826bf64",
          },
          { cells: ["Roquefort cheese", "A fungus grown on the cheese", "Ripens it and gives its particular flavour"] },
        ],
      },
      pyqExampleId: "767b3e24-11e7-4fb3-ac16-24c76826bf64",
      selfCheckExample: {
        prompt: "A mother adds one spoon of curd to a bowl of warm milk, and by morning the whole bowl has set into curd. Why does the spoon of curd work, and what happens to the milk proteins?",
        steps: [
          "The spoon of curd is a starter: it carries millions of lactic acid bacteria such as *Lactobacillus*.",
          "In the warm milk these bacteria multiply.",
          "They make acids, which coagulate and partly digest the milk proteins, so the milk sets.",
        ],
        answer: "The curd adds lactic acid bacteria, whose acids coagulate and partly digest the milk proteins.",
      },
      practiceSet: [
        { prompt: "Which yeast is used to ferment bread dough?", answer: "Baker's yeast, *Saccharomyces cerevisiae*" },
        { prompt: "Which vitamin do lactic acid bacteria increase when milk turns into curd?", answer: "Vitamin B12" },
        { prompt: "Which gas makes idli and dosa batter puff up?", answer: "Carbon dioxide (CO₂), made by bacteria" },
        { prompt: "Toddy, a traditional drink of southern India, is made by fermenting what?", answer: "The sap of palms" },
        { prompt: "Which kind of microbe is grown on Roquefort cheese to ripen it?", answer: "A fungus" },
      ],
      traps: [
        {
          title: "Swiss cheese holes: a bacterium and CO₂",
          body: "The large holes in Swiss cheese come from **CO₂** made by the bacterium *Propionibacterium sharmanii*. *Lactobacillus* makes curd, not the holes.",
        },
        {
          title: "Roquefort uses a fungus",
          body: "**Roquefort** cheese is ripened by a **fungus** grown on it. The cheese with holes from a bacterium is **Swiss** cheese.",
        },
        {
          title: "Bread uses yeast, idli uses bacteria",
          body: "**Bread** dough is fermented by the yeast *Saccharomyces cerevisiae*. **Idli and dosa** batter is fermented by **bacteria**.",
        },
        {
          title: "Industrial microbes are not household microbes",
          body: "*Aspergillus niger* (citric acid) and *Trichoderma polysporum* (cyclosporin A) are used in **industry**. They make no product in the kitchen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomi-beverages",
      name: "Fermented drinks and antibiotics",
      visualizationSlug: "neet-brewed-drinks",
      intuition:
        "Yeast ferments sugary raw material into alcohol. Whether the fermented liquid is then distilled decides which drink you get. Antibiotics are a second gift from microbes: chemicals one microbe makes that kill or stop the growth of disease-causing microbes.",
      definition:
        "Fermented drinks:\n" +
        "- Yeasts have been used since ancient times to make **wine, beer, whisky, brandy and rum**.\n" +
        "- The yeast is *Saccharomyces cerevisiae*, the same one used for bread. Here it is called **brewer's yeast**.\n" +
        "- It ferments **malted cereals and fruit juices** to make **ethanol**.\n" +
        "- **Wine and beer** are made **without distillation**. **Whisky, brandy and rum** are made by **distilling** the fermented broth.\n\n" +
        "Antibiotics (anti means against, bio means life):\n" +
        "- **Penicillin** was the **first antibiotic**, found **by chance**.\n" +
        "- **Alexander Fleming**, working on *Staphylococci* bacteria, saw a mould on an unwashed culture plate around which *Staphylococci* could not grow. The mould was *Penicillium notatum*, and he named its chemical penicillin.\n" +
        "- **Ernest Chain and Howard Florey** later showed its full power as an antibiotic. It was used to treat soldiers wounded in World War II.\n" +
        "- Fleming, Chain and Florey shared the **Nobel Prize in 1945**.\n" +
        "- Antibiotics made it far easier to treat **plague, whooping cough, diphtheria and leprosy**.",
      table: {
        columns: ["Product", "Microbe or scientist", "What to remember"],
        rows: [
          { cells: ["Wine", "Brewer's yeast, *Saccharomyces cerevisiae*", "Made without distillation"] },
          {
            cells: ["Beer", "Brewer's yeast, *Saccharomyces cerevisiae*", "Made without distillation"],
            noteAmber: "NEET 2025: beer is the non-distilled drink among whisky, brandy, beer and rum.",
            pyqExampleId: "f65217a4-bb8c-4470-9402-30763359230a",
          },
          { cells: ["Whisky, brandy and rum", "Brewer's yeast, *Saccharomyces cerevisiae*", "The fermented broth is distilled"] },
          { cells: ["Ethanol", "Brewer's yeast, *Saccharomyces cerevisiae*", "Made by fermenting malted cereals and fruit juices"] },
          { cells: ["Penicillin, the first antibiotic", "The mould *Penicillium notatum*; found by Alexander Fleming", "Stopped *Staphylococci* growing around the mould"] },
          { cells: ["Penicillin as a medicine", "Ernest Chain and Howard Florey", "Showed its full power; Nobel Prize with Fleming in 1945"] },
        ],
      },
      pyqExampleId: "f65217a4-bb8c-4470-9402-30763359230a",
      selfCheckExample: {
        prompt: "A scientist working on Staphylococci finds that these bacteria will not grow around a mould on one unwashed plate. Name the chemical the mould makes, the mould, and the two scientists who later showed the chemical's full power as a medicine.",
        steps: [
          "This is Alexander Fleming's chance discovery.",
          "The mould was *Penicillium notatum*, and its chemical was named penicillin.",
          "Ernest Chain and Howard Florey later established it as an effective antibiotic.",
        ],
        answer: "Penicillin, from *Penicillium notatum*; its full power was shown by Ernest Chain and Howard Florey.",
      },
      practiceSet: [
        { prompt: "Which yeast is used to ferment malted cereals and fruit juices to make ethanol?", answer: "Brewer's yeast, *Saccharomyces cerevisiae*" },
        { prompt: "Which was the first antibiotic to be discovered?", answer: "Penicillin" },
        { prompt: "In which year did Fleming, Chain and Florey receive the Nobel Prize for penicillin?", answer: "1945" },
        { prompt: "Name two diseases that NCERT says antibiotics made easier to treat.", answer: "Any two of plague, whooping cough, diphtheria and leprosy" },
      ],
      traps: [
        {
          title: "Wine and beer are not distilled",
          body: "**Wine and beer** come straight from fermentation. **Whisky, brandy and rum** need the fermented broth to be **distilled**.",
        },
        {
          title: "Baker's yeast and brewer's yeast are one species",
          body: "Both names mean *Saccharomyces cerevisiae*. The same yeast ferments bread dough and makes alcoholic drinks.",
        },
        {
          title: "Fleming found it, Chain and Florey proved it",
          body: "**Alexander Fleming** discovered penicillin from *Penicillium notatum*. **Ernest Chain and Howard Florey** showed its full power as an antibiotic, and all three shared the 1945 Nobel Prize.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomi-chemicals",
      name: "Chemicals, enzymes and bioactive molecules",
      intuition:
        "Industry grows microbes in large amounts to make organic acids, alcohol, enzymes and medicines. NEET asks these as match-the-columns, so learn each microbe with three things: what kind of microbe it is, what it makes, and what that product is used for.",
      definition:
        "Microbes in industry:\n" +
        "- **Organic acids:** *Aspergillus niger* (a fungus) makes **citric acid**; *Acetobacter aceti* (a bacterium) makes **acetic acid**; *Clostridium butylicum* (a bacterium) makes **butyric acid**; *Lactobacillus* (a bacterium) makes **lactic acid**.\n" +
        "- **Alcohol:** the yeast *Saccharomyces cerevisiae* is used to make **ethanol** commercially.\n" +
        "- **Enzymes:** **lipases** are used in detergents to remove **oily stains** from laundry. Bottled fruit juices are made clearer with **pectinases and proteases**.\n" +
        "- **Streptokinase**, made by the bacterium *Streptococcus* and modified by genetic engineering, is a **clot buster**: it removes clots from the blood vessels of patients who have had a myocardial infarction (heart attack).\n" +
        "- **Cyclosporin A**, made by the fungus *Trichoderma polysporum*, is an **immunosuppressive agent** for **organ-transplant** patients.\n" +
        "- **Statins**, made by the yeast *Monascus purpureus*, **lower blood cholesterol**. They **competitively inhibit** the enzyme that makes cholesterol.",
      table: {
        columns: ["Microbe", "Kind of microbe", "Product", "Use"],
        rows: [
          {
            cells: ["*Aspergillus niger*", "Fungus", "Citric acid", "An organic acid made in industry"],
          },
          { cells: ["*Acetobacter aceti*", "Bacterium", "Acetic acid", "An organic acid made in industry"] },
          {
            cells: ["*Clostridium butylicum*", "Bacterium", "Butyric acid", "An organic acid made in industry"],
            noteAmber: "NEET 2024: *Clostridium butylicum* matched with butyric acid.",
            pyqExampleId: "dcade485-e6f3-4778-aa13-1f275f94bfab",
          },
          { cells: ["*Lactobacillus*", "Bacterium", "Lactic acid", "An organic acid made in industry"] },
          { cells: ["*Saccharomyces cerevisiae*", "Yeast", "Ethanol", "Commercial production of alcohol"] },
          { cells: ["*Streptococcus*", "Bacterium", "Streptokinase", "Clot buster for heart-attack patients"] },
          { cells: ["*Trichoderma polysporum*", "Fungus", "Cyclosporin A", "Suppresses immunity in organ-transplant patients"] },
          {
            cells: ["*Monascus purpureus*", "Yeast", "Statins", "Lower blood cholesterol"],
            noteAmber: "Re-NEET 2024: *Monascus purpureus* matched with statins.",
            pyqExampleId: "2fae64ba-5e7f-47ac-8dc1-e12aa055fa7d",
          },
        ],
        caption: "Enzymes: lipases in detergents for oily stains; pectinases and proteases to clear bottled fruit juices.",
      },
      pyqExampleId: "dcade485-e6f3-4778-aa13-1f275f94bfab",
      selfCheckExample: {
        prompt: "A patient takes a medicine made by a microbe to bring down the cholesterol in the blood. Name the medicine, the microbe that makes it, and how it lowers cholesterol.",
        steps: [
          "The cholesterol-lowering medicines made by a microbe are statins.",
          "Statins are made by the yeast *Monascus purpureus*.",
          "They competitively inhibit the enzyme the body uses to make cholesterol.",
        ],
        answer: "Statins, from the yeast *Monascus purpureus*; they competitively inhibit the enzyme that makes cholesterol.",
      },
      practiceSet: [
        { prompt: "Which bacterium is used to make acetic acid?", answer: "*Acetobacter aceti*" },
        { prompt: "Which fungus is used to make citric acid?", answer: "*Aspergillus niger*" },
        { prompt: "Which enzyme is added to detergents to remove oily stains from laundry?", answer: "Lipase" },
        { prompt: "Which two enzymes are used to make bottled fruit juices clearer?", answer: "Pectinases and proteases" },
      ],
      traps: [
        {
          title: "Streptokinase busts clots, statins lower cholesterol",
          body: "**Streptokinase** from the bacterium *Streptococcus* dissolves clots. **Statins** from the yeast *Monascus purpureus* lower blood cholesterol. Do not swap the products or the microbes.",
        },
        {
          title: "Cyclosporin A suppresses immunity",
          body: "**Cyclosporin A** from the fungus *Trichoderma polysporum* is used to **suppress** the immune system in organ-transplant patients. It is not a clot buster and not a cholesterol drug.",
        },
        {
          title: "Match the acid to the name",
          body: "*Clostridium butylicum* makes **butyric** acid and *Acetobacter aceti* makes **acetic** acid: the names match. Citric acid comes from the fungus *Aspergillus niger*, not from a bacterium.",
        },
        {
          title: "Monascus is a yeast, Trichoderma a fungus",
          body: "NCERT calls *Monascus purpureus* a **yeast** and *Trichoderma polysporum* and *Aspergillus niger* **fungi**. *Streptococcus*, *Clostridium*, *Acetobacter* and *Lactobacillus* are **bacteria**.",
        },
      ],
    },
  ],
};
