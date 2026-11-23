import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BM_ENZYMES_NOTE: SubtopicNote = {
  subtopicName: "Enzymes",
  title: "Enzymes",
  oneLineDefinition:
    "What enzymes are and how they speed up reactions, the steps of the catalytic cycle, what temperature, pH, substrate and inhibitors do to them, the six enzyme classes, and the three kinds of cofactor.",
  whyItMatters:
    "Twelve NEET questions from 2023 to 2026, the largest share of the chapter. The enzyme classes were asked four times (Re-NEET 2024 twice, NEET 2025 and NEET 2026), with lyases in two of them. Cofactors were asked three times, and the inhibition of succinic dehydrogenase by malonate twice (NEET 2023 and NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobm-enzyme-action",
      name: "What enzymes are and how they act",
      visualizationSlug: "neet-enzyme-cycle",
      intuition:
        "An enzyme is a protein with a pocket, the active site, that fits its substrate. The substrate settles in, the enzyme closes around it, breaks its bonds and lets the products go. Then the enzyme is free to do it all again. Because it lowers the energy hill a reaction must climb, a reaction that would take hours happens in a blink.",
      definition:
        "What an enzyme is:\n" +
        "- **Almost all enzymes are proteins.** Some **nucleic acids** behave like enzymes: these are **ribozymes**.\n" +
        "- Like any protein, an enzyme has primary, secondary and tertiary structure. In the tertiary structure the chain criss-crosses itself and makes **crevices or pockets**. One such pocket is the **active site**, into which the **substrate fits**.\n" +
        "- **Inorganic catalysts** work well at **high temperature and pressure**; enzymes get **damaged at high temperature (say above 40°C)**. Enzymes from organisms living in **hot vents and sulphur springs** stay active up to **80 to 90°C** (thermal stability of enzymes from thermophiles).\n\n" +
        "Why enzyme reactions are fast:\n" +
        "- The rate of a reaction is the amount of product formed per unit time. Without a catalyst, the rate **doubles or halves for every 10°C** change in temperature.\n" +
        "- Example: \\(\\text{CO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{CO}_3\\). Without an enzyme about **200 molecules** of carbonic acid form **in an hour**. With **carbonic anhydrase**, about **600,000 molecules form every second**: the enzyme speeds the reaction about **10 million times**.\n" +
        "- A **metabolic pathway** is a chain of enzyme reactions. Glucose becomes **pyruvic acid** through **ten** enzyme-catalysed reactions: \\(\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{O}_2 \\rightarrow 2\\,\\text{C}_3\\text{H}_4\\text{O}_3 + 2\\,\\text{H}_2\\text{O}\\). Under **anaerobic** conditions **skeletal muscle** makes **lactic acid**, and **yeast** during fermentation makes **ethanol**.\n" +
        "- To become product, the substrate must pass through a high-energy **transition state**. The energy needed is the **activation energy**, and enzymes **lower this activation energy barrier**.\n\n" +
        "The nature of enzyme action:\n" +
        "- The enzyme (E) binds its substrate (S) to form a highly reactive, **short-lived enzyme-substrate complex (ES)**, which passes through an **enzyme-product complex (EP)** and releases the product (P) and the **unchanged enzyme**: \\(\\text{E} + \\text{S} \\rightleftharpoons \\text{ES} \\rightarrow \\text{EP} \\rightarrow \\text{E} + \\text{P}\\).",
      table: {
        columns: ["Step of the catalytic cycle", "What happens"],
        rows: [
          { cells: ["1. Binding", "The substrate binds to the active site of the enzyme, fitting into it"] },
          { cells: ["2. Fitting tighter", "Binding makes the enzyme change shape and fit more tightly around the substrate (the ES complex)"] },
          { cells: ["3. Bond breaking", "The active site breaks the chemical bonds of the substrate, and the enzyme-product complex forms"] },
          { cells: ["4. Release", "The enzyme releases the products, and the free enzyme is ready to bind another substrate molecule"] },
        ],
      },
      pyqExampleId: "12fbddc2-9aa9-4485-901f-a0189d0cdb04",
      selfCheckExample: {
        prompt: "Without an enzyme, about 200 molecules of carbonic acid form from carbon dioxide and water in an hour. About how many form each second with carbonic anhydrase?",
        steps: [
          "NCERT uses carbonic anhydrase to show how much an enzyme speeds up a reaction.",
          "With the enzyme, about 600,000 molecules form every second, about 10 million times faster.",
        ],
        answer: "About 600,000 molecules every second.",
      },
      practiceSet: [
        { prompt: "What are nucleic acids that behave like enzymes called?", answer: "Ribozymes" },
        { prompt: "What is the active site of an enzyme?", answer: "A crevice or pocket in the folded enzyme into which the substrate fits" },
        { prompt: "Above about what temperature do most enzymes get damaged?", answer: "About 40°C" },
        { prompt: "What do enzymes lower to speed up a reaction?", answer: "The activation energy barrier" },
        { prompt: "Through how many enzyme-catalysed reactions does glucose become pyruvic acid?", answer: "Ten" },
        { prompt: "What does yeast make from glucose during fermentation?", answer: "Ethanol" },
      ],
      traps: [
        {
          title: "Not every enzyme is a protein",
          body: "**Almost all** enzymes are proteins. **Ribozymes** are nucleic acids that act as enzymes, so 'all enzymes are proteins' is false.",
        },
        {
          title: "Enzymes, unlike inorganic catalysts, fail at high temperature",
          body: "**Inorganic catalysts** work at **high temperature and pressure**. Most enzymes are **damaged above about 40°C**; only enzymes from **thermophiles** stay active up to **80 to 90°C**.",
        },
        {
          title: "Bonds break before the products leave",
          body: "The order is: substrate **binds** the active site, the **ES complex** forms, the substrate's **bonds are broken**, the **products are released**, and the **free enzyme** is ready again.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-enzyme-factors",
      name: "Factors that affect enzyme activity, and inhibition",
      intuition:
        "An enzyme works best in a narrow band of temperature and pH. Cold puts it to sleep, heat breaks it for good. Adding more substrate speeds things up only until every enzyme molecule is busy. And a molecule that looks like the substrate can sit in the active site and block it, like a wrong key jammed in a lock.",
      definition:
        "- Enzyme activity changes with **temperature, pH, substrate concentration** and the binding of **specific chemicals**.\n" +
        "- **Temperature and pH:** enzymes work in a **narrow range**. Each shows its highest activity at an **optimum temperature** and an **optimum pH**, and activity falls **both below and above** the optimum.\n" +
        "- **Low temperature** keeps the enzyme in a **temporarily inactive** state. **High temperature destroys** enzyme activity, because proteins are **denatured by heat**.\n" +
        "- **Substrate concentration:** as substrate rises, the velocity of the reaction **rises at first** and then reaches a **maximum velocity (Vmax)** that no further substrate can raise. The reason: the enzyme molecules are **fewer than the substrate molecules**, and once they are all saturated there is **no free enzyme** for the extra substrate.\n" +
        "- **Inhibition:** when a chemical binds the enzyme and shuts off its activity, the process is **inhibition** and the chemical is an **inhibitor**.\n" +
        "- A **competitive inhibitor** **closely resembles the substrate** in molecular structure, so it **competes with the substrate for the substrate-binding site**. The substrate cannot bind, and enzyme action falls.\n" +
        "- Example: **malonate** inhibits **succinic dehydrogenase**, because malonate closely resembles the substrate **succinate**. Competitive inhibitors are often used in the **control of bacterial pathogens**.",
      table: {
        columns: ["Factor", "Effect on the enzyme"],
        rows: [
          {
            cells: ["Low temperature", "Temporarily inactive; activity returns when warmed"],
            noteAmber: "NEET 2023: both statements were true: low temperature preserves the enzyme, heat denatures it, and a competitive inhibitor resembles the substrate.",
            pyqExampleId: "e2dda9ed-8e4f-453c-85ad-c3c09bc05c08",
          },
          { cells: ["High temperature", "Activity destroyed, because the protein is denatured by heat"] },
          { cells: ["pH", "Highest activity at the optimum pH; falls on either side"] },
          { cells: ["Rising substrate concentration", "Velocity rises, then levels off at Vmax once every enzyme molecule is saturated"] },
          { cells: ["Competitive inhibitor", "Looks like the substrate and takes the substrate-binding site, so activity falls"] },
        ],
      },
      pyqExampleId: "e7aab965-cdad-42fe-9026-1606e52f32b0",
      selfCheckExample: {
        prompt: "One sample of an enzyme is kept in a refrigerator and another is boiled. Which one can work again when brought back to its optimum temperature, and why?",
        steps: [
          "Low temperature only keeps an enzyme temporarily inactive.",
          "High temperature denatures the protein, which destroys its activity.",
        ],
        answer: "The refrigerated one; the boiled enzyme has been denatured by heat.",
      },
      practiceSet: [
        { prompt: "What is Vmax in an enzyme reaction?", answer: "The maximum velocity, which no further rise in substrate concentration can exceed" },
        { prompt: "Why does the velocity of an enzyme reaction stop rising at high substrate concentration?", answer: "The enzyme molecules are fewer than the substrate molecules, and once all are saturated no free enzyme is left for extra substrate" },
        { prompt: "What is the pH at which an enzyme shows its highest activity called?", answer: "Its optimum pH" },
        { prompt: "What is a chemical that binds an enzyme and shuts off its activity called?", answer: "An inhibitor" },
        { prompt: "What practical use of competitive inhibitors does NCERT mention?", answer: "The control of bacterial pathogens" },
      ],
      traps: [
        {
          title: "Cold does not destroy an enzyme",
          body: "**Low temperature** keeps an enzyme **temporarily inactive**. Only **high temperature** destroys activity, by **denaturing** the protein.",
        },
        {
          title: "More substrate does not help past Vmax",
          body: "The velocity rises and then **levels off at Vmax**. It does not keep rising forever, and it does not fall back down as substrate keeps rising.",
        },
        {
          title: "Competitive inhibitors look like the substrate",
          body: "A **competitive** inhibitor works because it **resembles the substrate** and takes the **substrate-binding site**. Malonate blocking succinic dehydrogenase is **competitive** inhibition, not feedback inhibition.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-enzyme-classes",
      name: "The six classes of enzymes",
      intuition:
        "Enzymes are sorted by the kind of job they do. Some move hydrogen or electrons, some carry a group from one molecule to another, some split bonds with water, some pull groups off and leave a double bond, some rearrange a molecule into its isomer, and some join two molecules together.",
      definition:
        "- Enzymes are divided into **6 classes**, each with **4 to 13 subclasses**, and named by a **four-digit number**.\n" +
        "- **Oxidoreductases (dehydrogenases):** catalyse **oxidoreduction between two substrates** S and S'.\n" +
        "- **Transferases:** catalyse the **transfer of a group G (other than hydrogen)** between a pair of substrates: \\(\\text{S-G} + \\text{S}' \\rightarrow \\text{S} + \\text{S}'\\text{-G}\\).\n" +
        "- **Hydrolases:** catalyse **hydrolysis** of **ester, ether, peptide, glycosidic, C-C, C-halide or P-N** bonds.\n" +
        "- **Lyases:** catalyse **removal of groups** from substrates by mechanisms **other than hydrolysis**, **leaving double bonds**: \\(\\text{X-C-C-Y} \\rightarrow \\text{X-Y} + \\text{C=C}\\).\n" +
        "- **Isomerases:** catalyse **inter-conversion of optical, geometric or positional isomers**.\n" +
        "- **Ligases:** catalyse the **linking together of 2 compounds**, for example joining **C-O, C-S, C-N and P-O** bonds.",
      table: {
        columns: ["Class", "What it catalyses"],
        rows: [
          { cells: ["Oxidoreductases (dehydrogenases)", "Oxidoreduction between two substrates"] },
          { cells: ["Transferases", "Transfer of a group other than hydrogen from one substrate to another"] },
          { cells: ["Hydrolases", "Hydrolysis of ester, ether, peptide, glycosidic, C-C, C-halide or P-N bonds"] },
          {
            cells: ["Lyases", "Removal of groups without hydrolysis, leaving double bonds"],
            noteAmber: "Re-NEET 2024: lyases remove groups by mechanisms other than hydrolysis, leaving double bonds. NEET 2026 showed the same reaction as an equation.",
            pyqExampleId: "c9f0daab-d160-4899-a4f2-435264815644",
          },
          { cells: ["Isomerases", "Inter-conversion of optical, geometric or positional isomers"] },
          {
            cells: ["Ligases", "Linking two compounds: C-O, C-S, C-N and P-O bonds"],
            noteAmber: "Re-NEET 2024: ligases join C-O, C-N and P-O bonds; C-C was the bond not in NCERT's ligase list.",
            pyqExampleId: "622bf214-b367-493b-bc20-28c8a4aa7cb9",
          },
        ],
      },
      pyqExampleId: "54b8890b-0ad4-4c54-a2ad-3315b582772f",
      selfCheckExample: {
        prompt: "An enzyme pulls a group off its substrate without using water and leaves a double bond behind. Which class does it belong to?",
        steps: [
          "Hydrolases split bonds by adding water, so this is not a hydrolase.",
          "Removing groups by a mechanism other than hydrolysis and leaving a double bond is what lyases do.",
        ],
        answer: "Lyases.",
      },
      practiceSet: [
        { prompt: "Which class of enzymes catalyses the inter-conversion of optical, geometric or positional isomers?", answer: "Isomerases" },
        { prompt: "What is the other name NCERT gives for oxidoreductases?", answer: "Dehydrogenases" },
        { prompt: "Into how many classes are enzymes divided, and how is each enzyme numbered?", answer: "Six classes, each enzyme named by a four-digit number" },
        { prompt: "Which class of enzymes catalyses the hydrolysis of peptide and glycosidic bonds?", answer: "Hydrolases" },
        { prompt: "Name the four kinds of bond NCERT says ligases join.", answer: "C-O, C-S, C-N and P-O" },
      ],
      traps: [
        {
          title: "Ligases in NCERT do not list C-C",
          body: "NCERT's ligases join **C-O, C-S, C-N and P-O** bonds. **C-C** appears in the **hydrolases'** list of bonds they break.",
        },
        {
          title: "Lyases do not use water",
          body: "**Lyases** remove groups by mechanisms **other than hydrolysis** and **leave a double bond**. Splitting a bond with water is the job of **hydrolases**.",
        },
        {
          title: "Transferases move a group other than hydrogen",
          body: "A **transferase** carries a group G, **other than hydrogen**, from one substrate to another. Moving hydrogen (oxidoreduction) is the work of **oxidoreductases**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobm-cofactors",
      name: "Cofactors: prosthetic groups, coenzymes and metal ions",
      intuition:
        "Many enzymes cannot work with their protein alone. They need a helper, the cofactor. Some helpers are glued on tight, some drop in only during the reaction, and some are simple metal ions. Take the helper away and the enzyme stops working.",
      definition:
        "- Enzymes are made of one or several **polypeptide chains**. In many cases **non-protein** parts called **cofactors** must be bound to make the enzyme catalytically active. Then the **protein portion** is called the **apoenzyme**.\n" +
        "- There are **three kinds** of cofactor: **prosthetic groups, coenzymes and metal ions**.\n" +
        "- **Prosthetic groups** are **organic** compounds **tightly bound** to the apoenzyme. In **peroxidase and catalase**, which break hydrogen peroxide down to water and oxygen, **haem** is the prosthetic group and is part of the active site.\n" +
        "- **Coenzymes** are also **organic**, but their association with the apoenzyme is only **transient**, usually during catalysis. One coenzyme serves many different enzyme reactions. Many coenzymes contain **vitamins**: **NAD and NADP** contain the vitamin **niacin**.\n" +
        "- **Metal ions:** some enzymes need a metal ion, which forms coordination bonds with side chains at the active site and with the substrate. **Zinc** is the cofactor of the proteolytic enzyme **carboxypeptidase**.\n" +
        "- When the cofactor is **removed**, the enzyme **loses its catalytic activity**: this shows how crucial cofactors are.",
      table: {
        columns: ["Kind of cofactor", "Nature and binding", "NCERT example"],
        rows: [
          { cells: ["Prosthetic group", "Organic, tightly bound to the apoenzyme", "Haem in peroxidase and catalase"] },
          { cells: ["Coenzyme", "Organic, bound only for a short time during catalysis", "NAD and NADP, which contain niacin"] },
          {
            cells: ["Metal ion", "Forms coordination bonds with the active site and the substrate", "Zinc in carboxypeptidase"],
            noteAmber: "NEET 2024: the cofactor of carboxypeptidase is zinc.",
            pyqExampleId: "a5baa70d-c39e-4e81-a29e-0566d957024b",
          },
          {
            cells: ["Not a cofactor: the apoenzyme", "The protein portion of the enzyme", "Inactive until its cofactor binds"],
            noteAmber: "NEET 2025: the protein portion of an enzyme is the apoenzyme.",
            pyqExampleId: "a68ec4cb-256d-4a69-9ced-58f152697d3d",
          },
        ],
      },
      pyqExampleId: "8e860165-251c-4636-8a4e-79e747b7b9e5",
      selfCheckExample: {
        prompt: "Both a prosthetic group and a coenzyme are organic cofactors. How do they differ in the way they bind to the apoenzyme?",
        steps: [
          "A prosthetic group is tightly bound to the apoenzyme.",
          "A coenzyme associates with the apoenzyme only for a short time, usually while the reaction is going on.",
        ],
        answer: "A prosthetic group is bound tightly; a coenzyme is bound only transiently, during catalysis.",
      },
      practiceSet: [
        { prompt: "Name the three kinds of cofactor.", answer: "Prosthetic groups, coenzymes and metal ions" },
        { prompt: "Which vitamin is present in the coenzymes NAD and NADP?", answer: "Niacin" },
        { prompt: "Which metal ion is the cofactor of carboxypeptidase?", answer: "Zinc" },
        { prompt: "What happens to an enzyme's activity when its cofactor is removed?", answer: "It loses its catalytic activity" },
        { prompt: "What is the protein portion of an enzyme that needs a cofactor called?", answer: "The apoenzyme" },
      ],
      traps: [
        {
          title: "Haem belongs to catalase and peroxidase",
          body: "NCERT's prosthetic group example is **haem** in **peroxidase and catalase**. **Zinc** is the metal cofactor of **carboxypeptidase**; **niacin** is the vitamin in **NAD and NADP**.",
        },
        {
          title: "Apoenzyme is the protein, not the helper",
          body: "The **apoenzyme** is the **protein portion**. The non-protein helpers are the **cofactors**: prosthetic groups, coenzymes and metal ions.",
        },
        {
          title: "Tight versus transient",
          body: "A **prosthetic group** is **tightly bound**; a **coenzyme** joins only **transiently** during catalysis. A statement that says coenzymes are tightly bound is false.",
        },
      ],
    },
  ],
};
