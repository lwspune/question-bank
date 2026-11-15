import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PS_C4_NOTE: SubtopicNote = {
  subtopicName: "C4 Pathway and Photorespiration",
  title: "C4 Pathway and Photorespiration",
  oneLineDefinition:
    "How C₄ plants such as maize and sorghum first fix CO₂ in the mesophyll and then run the Calvin cycle in the bundle sheath, how they differ from C₃ plants, and why photorespiration wastes energy in C₃ plants but does not occur in C₄ plants.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026. Four are on the C₄ pathway (NEET 2021, two in NEET 2022 and NEET 2026) and three on photorespiration (NEET 2024 and two in Re-NEET 2026). Most are statement questions, so learn which cell holds which enzyme and what photorespiration makes and does not make.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbops-c4",
      name: "The C₄ pathway and Kranz anatomy",
      intuition:
        "C₄ plants, adapted to dry tropical places, add one step before the Calvin cycle. Their mesophyll cells catch CO₂ quickly as a 4-carbon acid and pass it to the large bundle sheath cells round the veins. There the acid gives up its CO₂, so CO₂ stays high around RuBisCO, and the Calvin cycle runs well even in heat and bright light.",
      definition:
        "The C₄ (Hatch and Slack) pathway, as NCERT gives it:\n" +
        "- **Kranz anatomy** (Kranz means **wreath**): large **bundle sheath cells** round the vascular bundles, sometimes in several layers. They have **a large number of chloroplasts**, **thick walls impervious to gas exchange** and **no intercellular spaces**. NCERT examples: **maize** and **sorghum**.\n" +
        "- In the **mesophyll**, the 3-carbon **phosphoenol pyruvate (PEP)** is the primary CO₂ acceptor, fixed by **PEP carboxylase (PEPcase)**. The first product is the 4-carbon **oxaloacetic acid (OAA)**. Mesophyll cells **lack RuBisCO**.\n" +
        "- OAA forms other 4-carbon acids, **malic acid** or **aspartic acid**, which move to the **bundle sheath cells**.\n" +
        "- There the C₄ acid is broken down into **CO₂** and a **3-carbon molecule**. The CO₂ enters the **Calvin cycle**; the 3-carbon molecule goes back to the mesophyll and becomes PEP again.\n" +
        "- Bundle sheath cells are **rich in RuBisCO** but **lack PEPcase**. The Calvin cycle stays the **main biosynthetic pathway** of C₄ plants.\n" +
        "- **CO₂ as a factor**: C₄ plants saturate at about **360 µL per L** of CO₂, while C₃ plants keep responding and saturate only beyond **450 µL per L**. So today's CO₂ level **limits C₃ plants**. Greenhouse crops such as **tomatoes and bell pepper** are grown in CO₂-enriched air for higher yields.",
      table: {
        columns: ["Point", "C₃ plants", "C₄ plants"],
        rows: [
          { cells: ["First CO₂ acceptor", "RuBP (5-carbon)", "PEP (3-carbon), in mesophyll cells"] },
          { cells: ["Enzyme of the first fixation", "RuBisCO", "PEP carboxylase (PEPcase)"] },
          {
            cells: ["First stable product", "3-PGA (3-carbon)", "OAA (4-carbon)"],
            noteAmber: "NEET 2021: *Sorghum*, a C₄ plant, forms oxaloacetic acid first.",
            pyqExampleId: "574b8500-dc8d-4284-a073-192f4d9b56f3",
          },
          {
            cells: ["Leaf anatomy", "No Kranz anatomy", "Kranz anatomy: large bundle sheath cells round the veins"],
            noteAmber: "NEET 2022: the bundle sheath cells hold many chloroplasts to run the Calvin cycle.",
            pyqExampleId: "b6b8573c-d97c-4bc3-a0fc-dd9b5b44477f",
          },
          { cells: ["Calvin cycle runs in", "Mesophyll cells", "Bundle sheath cells"] },
          { cells: ["Photorespiration", "Present", "Does not occur"] },
          { cells: ["Temperature", "Much lower temperature optimum", "Tolerate higher temperatures and show a higher rate"] },
          { cells: ["CO₂ saturation", "Only beyond 450 µL per L", "About 360 µL per L"] },
          { cells: ["Biomass", "Lower productivity", "Greater productivity of biomass"] },
        ],
        caption: "NEET 2026 marked as false that C₃ plants show Kranz anatomy, and as true that C₄ plants use the C₃ pathway as their main biosynthetic pathway.",
      },
      pyqExampleId: "26d282d1-27e6-4663-99d6-597378de437f",
      selfCheckExample: {
        prompt: "In a C₄ leaf a 4-carbon acid reaches the bundle sheath cells and is broken down. What two things are formed, and where does each go next?",
        steps: [
          "The C₄ acid splits into CO₂ and a 3-carbon molecule.",
          "The CO₂ is fixed by RuBisCO in the Calvin cycle in the same cell.",
          "The 3-carbon molecule returns to the mesophyll to be turned back into PEP.",
        ],
        answer: "CO₂, which enters the Calvin cycle in the bundle sheath, and a 3-carbon molecule, which goes back to the mesophyll to make PEP.",
      },
      practiceSet: [
        { prompt: "What does the word Kranz mean?", answer: "Wreath" },
        { prompt: "Which enzyme fixes CO₂ in the mesophyll cells of C₄ plants?", answer: "PEP carboxylase (PEPcase)" },
        { prompt: "Into which two 4-carbon acids is oxaloacetic acid changed before moving to the bundle sheath?", answer: "Malic acid or aspartic acid" },
        { prompt: "Name the two C₄ plants NCERT gives as examples of Kranz anatomy.", answer: "Maize and sorghum" },
        { prompt: "At about what CO₂ concentration do C₄ plants show saturation?", answer: "About 360 µL per L" },
        { prompt: "Why are the walls of bundle sheath cells in C₄ plants special?", answer: "They are thick and impervious to gas exchange, with no intercellular spaces" },
      ],
      traps: [
        {
          title: "PEP is the acceptor, OAA the product",
          body: "**PEP** (3-carbon) accepts CO₂. **OAA** (4-carbon) is the first product. PEP is never the product.",
        },
        {
          title: "C₄ plants still run the Calvin cycle",
          body: "The Calvin cycle is the **main biosynthetic pathway** in C₄ plants too. It runs in their **bundle sheath** cells.",
        },
        {
          title: "Each cell lacks one enzyme",
          body: "**Mesophyll** cells of C₄ plants **lack RuBisCO**; **bundle sheath** cells **lack PEPcase**. First fixation is in the mesophyll, the Calvin cycle in the bundle sheath.",
        },
        {
          title: "360 is C₄, 450 is C₃",
          body: "**C₄** plants saturate at about **360 µL per L** of CO₂; **C₃** plants only beyond **450 µL per L**. That is why more CO₂ raises the yield of C₃ crops.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbops-photorespiration",
      name: "Photorespiration",
      intuition:
        "RuBisCO can grab O₂ instead of CO₂. When O₂ wins, RuBP is split without any sugar being made, and CO₂ is lost. This wasteful side path is photorespiration. C₄ plants avoid it by keeping CO₂ high around RuBisCO.",
      definition:
        "Photorespiration, as NCERT gives it:\n" +
        "- The active site of **RuBisCO** can bind **both CO₂ and O₂**. Binding is **competitive**: the **relative concentration** of O₂ and CO₂ decides which one binds, though RuBisCO has a much greater affinity for CO₂.\n" +
        "- In **C₃ plants** some O₂ does bind RuBisCO, so **CO₂ fixation decreases**.\n" +
        "- Then RuBP, instead of becoming two molecules of PGA, binds O₂ and forms **one phosphoglycerate** and **one phosphoglycolate (2-carbon)**.\n" +
        "- There is **no synthesis of sugars, ATP or NADPH**. Instead CO₂ is **released** and ATP is **used up**. So photorespiration is **wasteful**.\n" +
        "- In **C₄ plants photorespiration does not occur**. Breaking down the C₄ acid in the bundle sheath raises the CO₂ there, so RuBisCO works as a **carboxylase** and its oxygenase activity is minimised. This is why C₄ plants are more productive and tolerate higher temperatures.",
      table: {
        columns: ["Point", "Carboxylation (Calvin cycle)", "Oxygenation (photorespiration)"],
        rows: [
          { cells: ["Gas RuBisCO binds to RuBP", "CO₂", "O₂"] },
          {
            cells: ["Products from one RuBP", "Two molecules of 3-PGA", "One phosphoglycerate and one 2-carbon phosphoglycolate"],
            noteAmber: "Re-NEET 2026: RuBP + O₂ gives 3-phosphoglycerate + 2-phosphoglycolate.",
            pyqExampleId: "d2dcad14-56a3-4169-a1f9-edda56dd0abd",
          },
          { cells: ["Sugar made", "Yes", "No"] },
          { cells: ["ATP and NADPH", "Used to make sugar", "None made; ATP is used up"] },
          { cells: ["CO₂", "Taken in and fixed", "Released"] },
          {
            cells: ["Where it happens", "All photosynthetic plants", "C₃ plants; does not occur in C₄ plants"],
            noteAmber: "NEET 2024: a statement that C₄ mesophyll cells show very little photorespiration was false. It does not occur in C₄ plants.",
            pyqExampleId: "6bbb1656-7361-404c-9bc8-a77852b6ed2d",
          },
        ],
      },
      pyqExampleId: "38210438-1b30-4878-9bdc-26eececff0f6",
      selfCheckExample: {
        prompt: "Inside the leaf of a C₃ plant the amount of O₂ rises compared with CO₂. What happens to RuBisCO and to the rate of CO₂ fixation?",
        steps: [
          "O₂ and CO₂ compete for the same active site of RuBisCO.",
          "With relatively more O₂, more RuBP is oxygenated instead of carboxylated.",
        ],
        answer: "More photorespiration takes place, and the rate of CO₂ fixation falls.",
      },
      practiceSet: [
        { prompt: "What decides whether RuBisCO binds CO₂ or O₂?", answer: "The relative concentration of O₂ and CO₂" },
        { prompt: "How many carbon atoms does phosphoglycolate have?", answer: "Two" },
        { prompt: "In which cells of a C₄ leaf is CO₂ concentrated around RuBisCO?", answer: "The bundle sheath cells" },
        { prompt: "Name two advantages C₄ plants get from having no photorespiration.", answer: "Greater productivity and tolerance of higher temperatures" },
      ],
      traps: [
        {
          title: "Photorespiration uses O₂ and releases CO₂",
          body: "In photorespiration **O₂ is used** and **CO₂ is released**. It is not CO₂ being consumed and O₂ generated: that is ordinary photosynthesis.",
        },
        {
          title: "It does occur in C₃ plants",
          body: "Photorespiration happens in **C₃ plants**. It is **C₄ plants** in which it does **not** occur, in mesophyll and bundle sheath alike.",
        },
        {
          title: "Nothing useful is made",
          body: "Photorespiration makes **no sugar, no ATP and no NADPH**; it uses ATP. Its products are **phosphoglycerate** and **phosphoglycolate**, never PEP or OAA.",
        },
      ],
    },
  ],
};
