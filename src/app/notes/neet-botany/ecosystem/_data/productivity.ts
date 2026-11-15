import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_EC_PRODUCTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Productivity and Decomposition",
  title: "Productivity and Decomposition",
  oneLineDefinition:
    "How fast plants make organic matter (gross and net primary productivity, secondary productivity), how decomposers break dead matter back into nutrients, and how those nutrients cycle through the ecosystem.",
  whyItMatters:
    "Eleven NEET questions: four EASY, six MODERATE and one HARD. Five were on productivity, and two of those (NEET 2021 and NEET 2023) asked only what R stands for in GPP minus R equals NPP. Four were on decomposition, from NEET 2022, NEET 2023 and NEET 2026. The two on nutrient cycling are from NEET 2021 and NEET 2022, none since 2022.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboec-productivity",
      name: "Primary and secondary productivity",
      intuition:
        "Think of plants as a factory that runs on sunlight. Production is how much the factory has made; productivity is how fast it makes it, per square metre per year. Plants use part of what they make to keep themselves alive, and only the rest is left over for animals and decomposers.",
      definition:
        "Productivity in NCERT:\n" +
        "- A constant input of **solar energy** is the basic requirement for any ecosystem to function and sustain.\n" +
        "- **Primary production** is the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis. It is expressed as weight (g m⁻²) or energy (kcal m⁻²).\n" +
        "- **Productivity** is the **rate of biomass production**. It is expressed in g m⁻² yr⁻¹ or **(kcal m⁻²) yr⁻¹**, so that different ecosystems can be compared.\n" +
        "- **Gross primary productivity (GPP)** is the rate of production of organic matter **during photosynthesis**.\n" +
        "- **Net primary productivity (NPP)** is GPP minus respiration losses. NPP is the biomass available to **heterotrophs** (herbivores and decomposers).\n" +
        "- **Secondary productivity** is the rate of formation of new organic matter **by consumers**.\n" +
        "- Primary productivity depends on the **plant species** of an area, on **environmental factors**, on the **availability of nutrients** and on the **photosynthetic capacity** of the plants, so it varies from one kind of ecosystem to another.\n" +
        "- The annual NPP of the whole biosphere is about **170 billion tons** (dry weight) of organic matter. The **oceans**, though they cover about **70 per cent** of the surface, make only **55 billion tons**; the rest is made on land.",
      table: {
        columns: ["Term", "What it means", "Who makes it"],
        rows: [
          {
            cells: ["Productivity", "Rate of biomass production, in g m⁻² yr⁻¹ or (kcal m⁻²) yr⁻¹", "Producers (primary) or consumers (secondary)"],
            noteAmber: "NEET 2025: the unit of productivity is (kcal m⁻²) yr⁻¹; kcal m⁻² alone has no time and is a unit of production, not productivity.",
            pyqExampleId: "30d69760-e2f6-4d88-a004-cf3ff0a74be9",
          },
          {
            cells: ["Gross primary productivity (GPP)", "Rate of production of organic matter during photosynthesis", "Producers (green plants)"],
            noteAmber: "NEET 2025: this is the definition of GPP. A statement that calls it NPP is false.",
            pyqExampleId: "d08ccc64-f88a-4229-9660-f49572dde9f9",
          },
          { cells: ["Net primary productivity (NPP)", "GPP minus respiration losses (R); the biomass left for heterotrophs", "Producers (green plants)"] },
          { cells: ["Secondary productivity", "Rate of formation of new organic matter", "Consumers"] },
        ],
      },
      pyqExampleId: "aee8c7da-be7e-405f-a001-6f07623dc038",
      selfCheckExample: {
        prompt: "The plants of a grassland add 1,500 g of dry organic matter per square metre in 3 years. Express the primary productivity of this grassland with its correct unit.",
        steps: [
          "Productivity is a rate: biomass per unit area per unit time.",
          "1,500 g m⁻² over 3 years is \\(1500 \\div 3 = 500\\) g m⁻² each year.",
        ],
        answer: "500 g m⁻² yr⁻¹.",
      },
      practiceSet: [
        { prompt: "In which two kinds of unit does NCERT express primary production (not productivity)?", answer: "Weight (g m⁻²) or energy (kcal m⁻²)" },
        { prompt: "What is the approximate annual net primary productivity of the whole biosphere?", answer: "About 170 billion tons (dry weight) of organic matter" },
        { prompt: "How much of the biosphere's annual net primary productivity comes from the oceans?", answer: "About 55 billion tons, though the oceans cover about 70 per cent of the surface" },
        { prompt: "Name four things on which the primary productivity of an area depends.", answer: "The plant species there, environmental factors, the availability of nutrients and the photosynthetic capacity of the plants" },
        { prompt: "Net primary productivity is the biomass available to which two groups of organisms?", answer: "Herbivores and decomposers (the heterotrophs)" },
      ],
      traps: [
        {
          title: "Productivity always carries a time unit",
          body: "Productivity is a **rate**, so its unit has a year in it: **(kcal m⁻²) yr⁻¹** or g m⁻² yr⁻¹. A unit with no time, such as kcal m⁻², measures production, not productivity.",
        },
        {
          title: "GPP is made during photosynthesis; NPP is what is left",
          body: "The rate of production of organic matter **during photosynthesis** is **gross** primary productivity. Net primary productivity is what remains **after respiration losses**.",
        },
        {
          title: "Oceans cover more but produce less",
          body: "The oceans cover about **70 per cent** of the surface but make only about **55 of the 170 billion tons** of annual NPP. Most net primary productivity is on land.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nboec-npp",
      name: "Gross minus respiration gives net primary productivity",
      intuition:
        "A shopkeeper's takings for the day are the gross amount. After paying the shop's own running costs, what is left is the profit. Plants are the same: what they make in photosynthesis is gross, and what is left after their own respiration is net.",
      definition:
        "The NPP equation in NCERT:\n" +
        "- A considerable amount of GPP is used by plants in **respiration**.\n" +
        "- **GPP minus respiration losses (R) is NPP**: \\(\\text{GPP} - R = \\text{NPP}\\).\n" +
        "- So R is the **respiration loss** (also called respiratory loss) of the plants themselves. It is not radiation, not a respiratory quotient and not reproductive allocation.\n" +
        "- NPP is what herbivores and decomposers can use. Turning the equation round, \\(\\text{GPP} = \\text{NPP} + R\\), and \\(R = \\text{GPP} - \\text{NPP}\\).",
      formula: {
        label: "Net primary productivity",
        latex: "\\text{NPP} = \\text{GPP} - R",
        symbols: [
          { symbol: "\\(\\text{GPP}\\)", meaning: "gross primary productivity, the rate of production of organic matter during photosynthesis" },
          { symbol: "\\(R\\)", meaning: "respiration losses of the producers" },
          { symbol: "\\(\\text{NPP}\\)", meaning: "net primary productivity, the biomass left for heterotrophs" },
        ],
      },
      authoredExample: {
        prompt: "In a forest, plants fix 24,000 kcal m⁻² yr⁻¹ in photosynthesis and use 14,000 kcal m⁻² yr⁻¹ in their own respiration. Find the NPP and the share of GPP lost to respiration.",
        steps: [
          "GPP is the photosynthesis figure: 24,000 kcal m⁻² yr⁻¹. R is 14,000 kcal m⁻² yr⁻¹.",
          "\\(\\text{NPP} = 24000 - 14000 = 10000\\) kcal m⁻² yr⁻¹.",
          "Share lost: \\(14000 \\div 24000 \\approx 0.58\\), about 58 per cent of GPP.",
        ],
        answer: "NPP is 10,000 (kcal m⁻²) yr⁻¹; about 58 per cent of GPP is lost in respiration.",
      },
      pyqExampleId: "95caf8e7-3d1c-4fb8-8ec8-9b132c0422ec",
      selfCheckExample: {
        prompt: "The NPP of a grassland is 3,000 (kcal m⁻²) yr⁻¹ and its plants lose 5,000 (kcal m⁻²) yr⁻¹ in respiration. What is its GPP?",
        steps: [
          "From \\(\\text{NPP} = \\text{GPP} - R\\), \\(\\text{GPP} = \\text{NPP} + R\\).",
          "\\(3000 + 5000 = 8000\\).",
        ],
        answer: "8,000 (kcal m⁻²) yr⁻¹.",
      },
      practiceSet: [
        { prompt: "A lake has a GPP of 9,000 (kcal m⁻²) yr⁻¹ and an NPP of 4,000 (kcal m⁻²) yr⁻¹. How much is lost in respiration?", answer: "5,000 (kcal m⁻²) yr⁻¹, since \\(R = \\text{GPP} - \\text{NPP}\\)" },
        { prompt: "Plants fix 1,200 g m⁻² yr⁻¹ of organic matter and respire away 700 g m⁻² yr⁻¹. What is the net primary productivity?", answer: "500 g m⁻² yr⁻¹" },
        { prompt: "Which is always larger in an ecosystem, GPP or NPP?", answer: "GPP, because NPP is GPP after respiration losses are taken away" },
        { prompt: "Rearrange \\(\\text{GPP} - R = \\text{NPP}\\) to give GPP.", answer: "\\(\\text{GPP} = \\text{NPP} + R\\)" },
      ],
      traps: [
        {
          title: "R in the NPP equation is respiration loss",
          body: "In \\(\\text{GPP} - R = \\text{NPP}\\), R is the **respiration loss** of the producers. Radiant energy, respiratory quotient, retardation factor and reproductive allocation are all distractors.",
        },
        {
          title: "Subtract respiration to go from gross to net",
          body: "NPP is GPP **minus** R, so NPP is the smaller number. To get GPP from NPP, **add** R back.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboec-decomposition",
      name: "Steps of decomposition",
      intuition:
        "An earthworm in a garden chops dead leaves into bits, rain washes the soluble parts down into the soil, and bacteria and fungi digest the rest. What is left becomes dark humus, which slowly releases nutrients back to the plants. That whole chain is decomposition.",
      definition:
        "Decomposition in NCERT:\n" +
        "- **Decomposers** break down complex organic matter into inorganic substances like carbon dioxide, water and nutrients. This is **decomposition**.\n" +
        "- **Detritus** is the raw material: dead plant remains such as leaves, bark and flowers, and dead remains of animals, **including fecal matter**.\n" +
        "- The important steps are **fragmentation, leaching, catabolism, humification and mineralisation**.\n" +
        "- Fragmentation, leaching and catabolism operate **simultaneously** on the detritus. Humification and mineralisation happen during decomposition **in the soil**.\n" +
        "- Decomposition is largely an **oxygen-requiring** process.\n" +
        "- Its rate depends on the **chemical composition** of the detritus and on **climatic factors**. Detritus rich in **lignin and chitin** decomposes **slowly**; detritus rich in **nitrogen** and water-soluble substances like **sugars** decomposes **quickly**.\n" +
        "- **Temperature** and **soil moisture** are the most important climatic factors, acting through soil microbes. **Warm and moist** conditions favour decomposition; **low temperature** and **anaerobiosis** inhibit it, so organic material builds up.\n" +
        "- The earthworm is called the **farmer's friend** because it helps break down complex organic matter and loosens the soil.",
      table: {
        columns: ["Step", "What happens", "Done by"],
        rows: [
          {
            cells: ["Fragmentation", "Detritus is broken into smaller particles", "Detritivores, such as the earthworm"],
            noteAmber: "NEET 2022: earthworms breaking detritus into smaller particles is fragmentation, not catabolism or humification.",
            pyqExampleId: "bb23d8e6-45eb-490d-8ec7-b55dbcef0616",
          },
          { cells: ["Leaching", "Water-soluble inorganic nutrients go down into the soil horizon and are precipitated as unavailable salts", "Water moving through the soil"] },
          {
            cells: ["Catabolism", "Detritus is degraded into simpler inorganic substances by enzymes", "Bacteria and fungi"],
            noteAmber: "NEET 2023: catabolism is the work of bacterial and fungal enzymes; a statement giving it to earthworms is false.",
            pyqExampleId: "b8404fbd-57ae-4d1d-b850-a7e62fc94562",
          },
          { cells: ["Humification", "A dark coloured amorphous substance, humus, accumulates; it is colloidal, highly resistant to microbes and a reservoir of nutrients", "Takes place in the soil"] },
          { cells: ["Mineralisation", "Humus is further degraded and inorganic nutrients are released", "Some soil microbes"] },
        ],
      },
      pyqExampleId: "2fc71c44-1571-4493-9251-67450eefb9e0",
      selfCheckExample: {
        prompt: "Sample P is a pile of wood shavings rich in lignin kept in a cold, waterlogged pit. Sample Q is fresh leaves rich in nitrogen and sugars kept on warm, moist soil. Which decomposes faster, and why?",
        steps: [
          "Chemical composition: lignin slows decomposition; nitrogen and sugars speed it up. This favours Q.",
          "Climate: warm and moist conditions favour decomposition; low temperature and lack of oxygen (a waterlogged pit) inhibit it. This also favours Q.",
        ],
        answer: "Sample Q decomposes faster: it is rich in nitrogen and sugars and sits in warm, moist, aerated conditions.",
      },
      practiceSet: [
        { prompt: "In which step of decomposition do water-soluble inorganic nutrients go down into the soil and get precipitated as unavailable salts?", answer: "Leaching" },
        { prompt: "List the five steps of decomposition named in NCERT.", answer: "Fragmentation, leaching, catabolism, humification and mineralisation" },
        { prompt: "Which three steps of decomposition operate simultaneously on detritus?", answer: "Fragmentation, leaching and catabolism" },
        { prompt: "Which two climatic factors are the most important in regulating decomposition?", answer: "Temperature and soil moisture" },
        { prompt: "Name two conditions that inhibit decomposition and lead to a build-up of organic matter.", answer: "Low temperature and anaerobiosis (lack of oxygen)" },
        { prompt: "Why does humus decompose at an extremely slow rate?", answer: "It is highly resistant to microbial action" },
      ],
      traps: [
        {
          title: "Lignin and chitin slow decomposition",
          body: "Detritus rich in **lignin and chitin** decomposes **slowly**. Fast decomposition comes with detritus rich in **nitrogen** and **water-soluble sugars**.",
        },
        {
          title: "Earthworms fragment; microbes catabolise",
          body: "**Fragmentation** is done by detritivores such as the **earthworm**. **Catabolism** is done by **bacterial and fungal enzymes**.",
        },
        {
          title: "Humification makes humus; mineralisation breaks it down",
          body: "**Humification** builds up dark, colloidal **humus**. **Mineralisation** is the later step in which microbes degrade humus and **release inorganic nutrients**.",
        },
        {
          title: "Leaching makes nutrients unavailable",
          body: "In **leaching**, water-soluble inorganic nutrients go down into the soil and are precipitated as **unavailable salts**. It does not release nutrients for plants; mineralisation does.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboec-nutrient-cycles",
      name: "Standing state and nutrient cycles",
      intuition:
        "Energy enters an ecosystem from the sun and leaves as heat, but nutrients are reused. Carbon, nitrogen and phosphorus pass from soil or air into plants, on to animals and back again through decomposers, going round and round.",
      definition:
        "Nutrient cycling in NCERT:\n" +
        "- The amount of nutrients such as **carbon, nitrogen, phosphorus and calcium** present in the soil at any given time is the **standing state**. It varies between ecosystems and with the season.\n" +
        "- Do not confuse it with **standing crop**, the mass of living material at a trophic level at a particular time.\n" +
        "- The movement of nutrient elements through the components of an ecosystem is **nutrient cycling**, also called **biogeochemical cycles**.\n" +
        "- Cycles are **gaseous** (reservoir in the **atmosphere**, such as the nitrogen and carbon cycles) or **sedimentary** (reservoir in the **Earth's crust**, such as the sulphur and phosphorus cycles).\n" +
        "- **Phosphorus** is a major constituent of biological membranes, nucleic acids and cellular energy transfer systems, and animals need it for shells, bones and teeth.\n" +
        "- The natural reservoir of phosphorus is **rock**, which holds it as phosphates. When rocks are **weathered**, minute amounts of phosphate dissolve in the soil solution and are absorbed by plant roots.\n" +
        "- **Phosphate-solubilising bacteria** decompose wastes and dead organisms and release phosphorus.\n" +
        "- Unlike the carbon cycle, there is **no respiratory release of phosphorus** into the atmosphere, and inputs of phosphorus through **rainfall** are much smaller than those of carbon.",
      table: {
        columns: ["Feature", "Carbon cycle", "Phosphorus cycle"],
        rows: [
          { cells: ["Type of cycle", "Gaseous", "Sedimentary"] },
          {
            cells: ["Reservoir", "Atmosphere", "Rock (the Earth's crust), as phosphates"],
            noteAmber: "NEET 2022: weathering of rocks, the phosphorus reservoir, is what speeds up the phosphorus cycle.",
            pyqExampleId: "26a51d17-9b19-4e4a-8c8a-3115321ced1f",
          },
          { cells: ["Respiratory release to the air", "Yes", "None"] },
          { cells: ["Input through rainfall", "Larger", "Much smaller than for carbon"] },
        ],
      },
      pyqExampleId: "26a51d17-9b19-4e4a-8c8a-3115321ced1f",
      selfCheckExample: {
        prompt: "A soil sample holds a certain amount of carbon, nitrogen, phosphorus and calcium today, while the grass on it holds a certain mass of living matter. Which of these two amounts is the standing state and which is the standing crop?",
        steps: [
          "Standing state is the amount of nutrients present in the soil at a given time.",
          "Standing crop is the mass of living material at a trophic level at a given time; the grass is the producer level.",
        ],
        answer: "The nutrients in the soil are the standing state; the living mass of the grass is the standing crop.",
      },
      practiceSet: [
        { prompt: "Where is the reservoir of a gaseous nutrient cycle, and where is that of a sedimentary cycle?", answer: "Gaseous: the atmosphere. Sedimentary: the Earth's crust" },
        { prompt: "Name two sedimentary nutrient cycles.", answer: "The sulphur cycle and the phosphorus cycle" },
        { prompt: "Which bacteria release phosphorus from wastes and dead organisms?", answer: "Phosphate-solubilising bacteria" },
        { prompt: "What is another name for nutrient cycles?", answer: "Biogeochemical cycles" },
        { prompt: "Does the phosphorus cycle have a respiratory release into the atmosphere?", answer: "No; unlike the carbon cycle, it has none" },
      ],
      traps: [
        {
          title: "Standing state is nutrients; standing crop is living mass",
          body: "The **standing state** is the amount of **nutrients in the soil** at a given time. The **standing crop** is the mass of **living material** at a trophic level.",
        },
        {
          title: "The phosphorus reservoir is rock, not air",
          body: "Phosphorus has a **sedimentary** cycle. Its reservoir is **rock**, and **weathering** releases it. There is no respiratory release of phosphorus, and rainfall brings in very little.",
        },
      ],
    },
  ],
};
