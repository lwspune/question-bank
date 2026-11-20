import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EX_URINE_NOTE: SubtopicNote = {
  subtopicName: "Urine Formation",
  title: "Urine Formation",
  oneLineDefinition:
    "Glomerular filtration with its exact numbers, what each part of the tubule takes back or adds, and the counter current mechanism that makes urine concentrated.",
  whyItMatters:
    "Four questions from 2024 to 2026, and both HARD ones in the chapter are here: statement questions on what the limbs of Henle's loop let through (NEET 2024, Re-NEET 2026), one on the counter current mechanism (Re-NEET 2024), and a diagram of what the proximal and distal tubules secrete (NEET 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoex-filtration",
      name: "Glomerular filtration and the proximal tubule",
      intuition:
        "The kidney works like a sieve followed by a careful sorter. The glomerulus pushes almost everything in the plasma, except the proteins, into Bowman's capsule. That is far too much to lose, so the tubule takes nearly all of it back, most of it in the very first coiled part, the PCT.",
      definition:
        "Urine forms in three steps: **glomerular filtration, reabsorption and secretion**.\n\n" +
        "**Filtration.** Blood pressure in the glomerular capillaries filters blood through three layers: the **endothelium** of the glomerular blood vessels, the **epithelium of Bowman's capsule** and the **basement membrane** between them. The epithelial cells of Bowman's capsule, the **podocytes**, leave minute spaces called **filtration slits or slit pores**. Almost all constituents of plasma **except the proteins** pass through, so this is **ultrafiltration**.\n\n" +
        "**Reabsorption.** 180 litres of filtrate a day against about 1.5 litres of urine means **nearly 99 per cent** of the filtrate is reabsorbed. **Glucose, amino acids and Na⁺** are reabsorbed **actively**; **nitrogenous wastes** passively; **water** passively in the initial segments.\n\n" +
        "**Secretion.** Tubular cells secrete **H⁺, K⁺ and ammonia** into the filtrate. This keeps the **ionic and acid base balance** of the body fluids.\n\n" +
        "**PCT.** It is lined by **simple cuboidal brush border epithelium**, which increases the surface for reabsorption. It takes back **nearly all essential nutrients and 70 to 80 per cent of the electrolytes and water**. It also keeps pH and ionic balance by secreting H⁺, ammonia and K⁺ into the filtrate and absorbing HCO₃⁻ from it.",
      table: {
        columns: ["Quantity or fact", "NCERT value"],
        rows: [
          { cells: ["Blood filtered by the kidneys", "1100 to 1200 ml a minute"] },
          { cells: ["Share of each ventricle's output", "Roughly one fifth of the blood pumped by each ventricle in a minute"] },
          { cells: ["Glomerular filtration rate (GFR)", "About 125 ml a minute in a healthy person"] },
          { cells: ["Filtrate a day", "180 litres"] },
          { cells: ["Urine a day in an adult", "1 to 1.5 litres"] },
          { cells: ["Share of filtrate reabsorbed", "Nearly 99 per cent"] },
          { cells: ["Reabsorbed in the PCT", "Nearly all essential nutrients, 70 to 80 per cent of electrolytes and water"] },
          { cells: ["Urine", "Light yellow, watery, slightly acidic (pH 6.0)"] },
          { cells: ["Urea excreted a day", "25 to 30 g on average"] },
          { cells: ["Glucose or ketone bodies in urine", "Glycosuria and ketonuria, signs of diabetes mellitus"] },
        ],
      },
      pyqExampleId: "d256095c-f5b3-4bac-b218-1ecae16cff5a",
      selfCheckExample: {
        prompt: "A healthy person has a GFR of 125 ml a minute and passes 1.5 litres of urine a day. How much filtrate forms in a day, and what share of it is reabsorbed?",
        steps: [
          "A day has \\(60 \\times 24 = 1440\\) minutes.",
          "Filtrate a day: \\(125 \\times 1440 = 180000\\) ml, which is 180 litres.",
          "Reabsorbed: 180 litres less 1.5 litres leaves 178.5 litres, and \\(178.5 \\div 180 \\approx 0.99\\).",
        ],
        answer: "180 litres of filtrate a day; nearly 99 per cent of it is reabsorbed.",
      },
      practiceSet: [
        { prompt: "How much blood do the two kidneys filter in a minute?", answer: "1100 to 1200 ml, roughly one fifth of each ventricle's output" },
        { prompt: "What are the minute spaces left between the podocytes called?", answer: "Filtration slits, or slit pores" },
        { prompt: "Which plasma constituents do not pass into Bowman's capsule?", answer: "The proteins" },
        { prompt: "Name the three substances tubular cells secrete into the filtrate.", answer: "H⁺, K⁺ and ammonia" },
        { prompt: "Which segment of the nephron reabsorbs 70 to 80 per cent of the electrolytes and water?", answer: "The PCT" },
        { prompt: "What is the pH of normal human urine?", answer: "About 6.0, slightly acidic" },
      ],
      traps: [
        {
          title: "GFR is filtrate, not blood",
          body: "**125 ml a minute** is the **filtrate** formed (the GFR). **1100 to 1200 ml a minute** is the **blood** the kidneys filter. Keep the two numbers apart.",
        },
        {
          title: "The PCT lining is cuboidal",
          body: "The PCT is lined by **simple cuboidal brush border epithelium**. A statement calling it columnar is false.",
        },
        {
          title: "Proteins stay in the blood",
          body: "Glomerular filtration lets through almost all of the plasma **except the proteins**, which is why NCERT calls it **ultrafiltration**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-tubules",
      name: "Henle's loop, the DCT and the collecting duct",
      intuition:
        "Each limb of Henle's loop lets through only one thing. Going down, water leaks out and salt stays in, so the filtrate gets stronger. Coming up, salt leaves and water stays in, so it gets weaker again. Further along, the DCT and the collecting duct fine tune what is left.",
      definition:
        "**Henle's loop.** Reabsorption here is **minimum**, but the loop keeps the **high osmolarity of the medullary interstitial fluid**.\n" +
        "- The **descending limb** is **permeable to water but almost impermeable to electrolytes**, so the filtrate gets **concentrated** as it moves down.\n" +
        "- The **ascending limb** is **impermeable to water** but allows transport of electrolytes **actively or passively**, so the filtrate gets **diluted** as it moves up.\n\n" +
        "**DCT.** **Conditional reabsorption of Na⁺ and water** takes place here. The DCT also reabsorbs **HCO₃⁻** and selectively secretes **H⁺, K⁺ and NH₃**, keeping the pH and the sodium potassium balance of blood.\n\n" +
        "**Collecting duct.** This long duct runs from the cortex to the inner medulla. **Large amounts of water** can be reabsorbed here to make **concentrated urine**. It lets **small amounts of urea** into the medullary interstitium to keep up its osmolarity, and it secretes H⁺ and K⁺.",
      table: {
        columns: ["Segment", "Water", "Electrolytes and other work"],
        rows: [
          { cells: ["Descending limb of Henle's loop", "Permeable", "Almost impermeable to electrolytes; filtrate gets concentrated"] },
          { cells: ["Ascending limb of Henle's loop", "Impermeable", "Electrolytes move out actively or passively; filtrate gets diluted"] },
          { cells: ["DCT", "Conditional reabsorption, with Na⁺", "Reabsorbs HCO₃⁻; secretes H⁺, K⁺ and NH₃"] },
          { cells: ["Collecting duct", "Large amounts reabsorbed for concentrated urine", "Passes small amounts of urea to the medulla; secretes H⁺ and K⁺"] },
        ],
      },
      pyqExampleId: "2d4c9fc4-9f9e-4efb-92fe-4a101ee1d062",
      selfCheckExample: {
        prompt: "Which two segments of the nephron both reabsorb HCO₃⁻ and secrete H⁺, K⁺ and ammonia into the filtrate?",
        steps: [
          "The PCT secretes H⁺, ammonia and K⁺ and absorbs HCO₃⁻.",
          "The DCT reabsorbs HCO₃⁻ and secretes H⁺, K⁺ and NH₃.",
        ],
        answer: "The PCT and the DCT.",
      },
      practiceSet: [
        { prompt: "In which segment does conditional reabsorption of Na⁺ and water take place?", answer: "The DCT" },
        { prompt: "Which segment lets small amounts of urea into the medullary interstitium?", answer: "The collecting duct" },
        { prompt: "Which two ions does the collecting duct selectively secrete?", answer: "H⁺ and K⁺" },
        { prompt: "Where can large amounts of water be reabsorbed to make concentrated urine?", answer: "The collecting duct" },
      ],
      traps: [
        {
          title: "Descending limb: water yes, salts no",
          body: "The **descending limb** is **permeable to water** and **almost impermeable to electrolytes**. A statement with these reversed is false.",
        },
        {
          title: "Ascending limb keeps its water",
          body: "The **ascending limb** is **impermeable to water**; electrolytes leave it, so the filtrate rising in it gets **diluted**, not concentrated.",
        },
        {
          title: "The loop reabsorbs little",
          body: "Reabsorption in **Henle's loop is minimum**. Its main job is keeping the medulla's high osmolarity; the bulk of reabsorption is in the **PCT**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-countercurrent",
      name: "The counter current mechanism",
      visualizationSlug: "neet-countercurrent",
      intuition:
        "Two tubes lie side by side with fluid running in opposite directions, like two lanes of a road. Salt handed from one lane to the other keeps building up at the far end. In the kidney this makes the deep medulla very salty, and that salt pulls water out of the collecting duct.",
      definition:
        "Mammals can make **concentrated urine**, and **Henle's loop and the vasa recta** do it.\n" +
        "- Filtrate flows in **opposite directions** in the two limbs of Henle's loop, a **counter current**. Blood in the two limbs of the vasa recta also flows in a counter current.\n" +
        "- Their closeness and the counter currents keep an **osmolarity rising towards the inner medulla**, from **300 mOsmol L⁻¹ in the cortex to about 1200 mOsmol L⁻¹ in the inner medulla**.\n" +
        "- The gradient is made mainly by **NaCl and urea**.\n" +
        "- **NaCl** is transported out by the **ascending limb of Henle's loop**, exchanged with the **descending limb of the vasa recta**, and returned to the interstitium by the **ascending portion of the vasa recta**.\n" +
        "- Small amounts of **urea** enter the **thin segment of the ascending limb** and are carried back to the interstitium by the **collecting tubule**.\n\n" +
        "This transport, made possible by the special arrangement of Henle's loop and the vasa recta, is the **counter current mechanism**. The gradient lets water pass easily out of the collecting tubule, concentrating the urine. Human kidneys can make urine **nearly four times as concentrated** as the initial filtrate.",
      table: {
        columns: ["Item", "NCERT fact"],
        rows: [
          { cells: ["Structures involved", "Henle's loop and the vasa recta"] },
          { cells: ["Osmolarity in the cortex", "300 mOsmol L⁻¹"] },
          { cells: ["Osmolarity in the inner medulla", "About 1200 mOsmol L⁻¹"] },
          { cells: ["Solutes that make the gradient", "Mainly NaCl and urea"] },
          { cells: ["Most concentrated urine", "Nearly four times the initial filtrate"] },
        ],
      },
      pyqExampleId: "92680ada-fa0c-4ab9-b2db-fd01b379fa77",
      selfCheckExample: {
        prompt: "Which two solutes mainly build the osmotic gradient of the medulla, and which vessel returns NaCl to the interstitium?",
        steps: [
          "NCERT says the gradient is mainly caused by NaCl and urea.",
          "NaCl from the ascending limb of Henle's loop passes to the descending limb of the vasa recta and is returned to the interstitium by the ascending portion of the vasa recta.",
        ],
        answer: "NaCl and urea; the ascending portion of the vasa recta.",
      },
      practiceSet: [
        { prompt: "What is the osmolarity of the inner medullary interstitium?", answer: "About 1200 mOsmol L⁻¹" },
        { prompt: "How many times more concentrated than the initial filtrate can human urine be?", answer: "Nearly four times" },
        { prompt: "Into which part of Henle's loop do small amounts of urea enter?", answer: "The thin segment of the ascending limb" },
        { prompt: "Which tubule carries urea back to the medullary interstitium?", answer: "The collecting tubule" },
      ],
      traps: [
        {
          title: "The gradient rises inwards",
          body: "Osmolarity is **lowest in the cortex (300 mOsmol L⁻¹)** and **highest in the inner medulla (about 1200 mOsmol L⁻¹)**, not the other way round.",
        },
        {
          title: "Blood flows counter current too",
          body: "Not only the two limbs of Henle's loop: blood in the two limbs of the **vasa recta** also flows in a **counter current** pattern.",
        },
        {
          title: "Urea helps build the gradient",
          body: "The medullary gradient is made mainly by **NaCl and urea**, not by NaCl alone.",
        },
      ],
    },
  ],
};
