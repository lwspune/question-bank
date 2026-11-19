import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_RS_KREBS_NOTE: SubtopicNote = {
  subtopicName: "Krebs Cycle and Electron Transport",
  title: "Krebs Cycle and Electron Transport",
  oneLineDefinition:
    "How pyruvic acid enters the mitochondrion and becomes acetyl CoA, the steps of the Krebs (TCA) cycle, the five complexes of the electron transport system with ATP synthase, and which part of the mitochondrion does each job.",
  whyItMatters:
    "Six NEET questions from 2023 to 2026, four of them match-the-columns: one in NEET 2023, one in Re-NEET 2024, two in NEET 2024, one in 2025 and one in NEET 2026. Where each stage happens was asked twice (NEET 2024 and NEET 2026), and complex II was asked twice (Re-NEET 2024 and 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbors-krebs-cycle",
      name: "From pyruvic acid to the Krebs cycle",
      intuition:
        "With oxygen present, pyruvic acid moves into the mitochondrion to be burnt completely. First it loses one carbon as CO₂ and becomes acetyl CoA. Then acetyl CoA joins a four-carbon acid to make citric acid, and a cycle of steps strips off two more CO₂ and many hydrogens. The hydrogens are not wasted: they are loaded onto NAD⁺ and FAD to be cashed in later.",
      definition:
        "NCERT's account:\n" +
        "- Pyruvic acid is carried from the cytoplasm into the **mitochondrial matrix**. There it undergoes **oxidative decarboxylation**, catalysed by **pyruvic dehydrogenase**, which needs the coenzymes **NAD⁺** and **coenzyme A** (and Mg²⁺).\n" +
        "- \\(\\text{Pyruvic acid} + \\text{CoA} + \\text{NAD}^+ \\rightarrow \\text{Acetyl CoA} + \\text{CO}_2 + \\text{NADH} + \\text{H}^+\\). One glucose gives two pyruvic acid, so this step makes **2 NADH**.\n" +
        "- Acetyl CoA enters the **tricarboxylic acid (TCA) cycle**, also called the **Krebs cycle** after **Hans Krebs**, who first worked it out.\n" +
        "- The cycle needs a steady supply of **oxaloacetic acid (OAA)** and the regeneration of **NAD⁺** and **FAD⁺** from NADH and FADH₂.\n" +
        "- Per turn: **3 NADH + H⁺**, **1 FADH₂**, **1 GTP (ATP)** and **2 CO₂**.\n" +
        "- Summary for one pyruvic acid: \\(\\text{Pyruvic acid} + 4\\text{NAD}^+ + \\text{FAD}^+ + 2\\text{H}_2\\text{O} + \\text{ADP} + \\text{Pi} \\rightarrow 3\\text{CO}_2 + 4\\text{NADH} + 4\\text{H}^+ + \\text{FADH}_2 + \\text{ATP}\\).",
      table: {
        columns: ["Step of the cycle", "What happens", "Made at this step"],
        rows: [
          {
            cells: ["Acetyl CoA + OAA + water to citric acid", "Condensation by **citrate synthase**; CoA is released", "None"],
            noteAmber: "NEET 2023: a match-the-columns paired the TCA cycle with citrate synthase and oxidative decarboxylation with pyruvate dehydrogenase.",
            pyqExampleId: "dbc8721b-082f-4bac-b2fd-ed8ad2420ffb",
          },
          { cells: ["Citric acid to isocitrate", "Isomerisation", "None"] },
          { cells: ["Isocitrate to α-ketoglutaric acid", "First decarboxylation, an oxidation", "1 CO₂ and 1 NADH + H⁺"] },
          { cells: ["α-ketoglutaric acid to succinyl-CoA", "Second decarboxylation, an oxidation", "1 CO₂ and 1 NADH + H⁺"] },
          { cells: ["Succinyl-CoA to succinic acid", "**Substrate-level phosphorylation**; no oxidation of the substrate", "1 GTP, then GTP gives its phosphate to make ATP"] },
          { cells: ["Succinic acid to malic acid", "An oxidation", "1 FADH₂"] },
          { cells: ["Malic acid to oxaloacetic acid", "An oxidation; OAA is ready to take the next acetyl CoA", "1 NADH + H⁺"] },
        ],
        caption: "Carbon count: citric acid has 6 carbons, α-ketoglutaric acid 5, succinyl-CoA, succinic acid, malic acid and OAA 4 each. Acetyl CoA brings 2 carbons; the two decarboxylations remove 2.",
      },
      pyqExampleId: "9ca0478d-baf0-4444-9ff0-9cfa80b3f6ac",
      selfCheckExample: {
        prompt: "One molecule of pyruvic acid is completely oxidised in the mitochondrial matrix. How many NADH + H⁺, FADH₂, ATP and CO₂ are formed?",
        steps: [
          "Pyruvic acid to acetyl CoA: 1 NADH and 1 CO₂.",
          "One turn of the Krebs cycle: 3 NADH, 1 FADH₂, 1 ATP (as GTP) and 2 CO₂.",
          "Add them: NADH \\(1 + 3 = 4\\), CO₂ \\(1 + 2 = 3\\).",
        ],
        answer: "4 NADH + H⁺, 1 FADH₂, 1 ATP and 3 CO₂.",
      },
      practiceSet: [
        { prompt: "Which enzyme carries out the oxidative decarboxylation of pyruvic acid in the mitochondrial matrix?", answer: "Pyruvic (pyruvate) dehydrogenase" },
        { prompt: "Which two coenzymes does the conversion of pyruvic acid to acetyl CoA need?", answer: "NAD⁺ and coenzyme A" },
        { prompt: "Which enzyme joins acetyl CoA to oxaloacetic acid to make citric acid?", answer: "Citrate synthase" },
        { prompt: "After whom is the TCA cycle named the Krebs cycle?", answer: "Hans Krebs, who first worked it out" },
        { prompt: "In one turn of the Krebs cycle, at how many points is NAD⁺ reduced, and at how many is FAD⁺ reduced?", answer: "Three for NAD⁺, one for FAD⁺" },
        { prompt: "Which four-carbon acid must be replenished for the Krebs cycle to keep turning?", answer: "Oxaloacetic acid (OAA)" },
      ],
      traps: [
        {
          title: "The GTP step is not an oxidation",
          body: "**Succinyl-CoA to succinic acid** makes GTP by **substrate-level phosphorylation**. The substrate is not oxidised there. Isocitrate to α-ketoglutaric acid, succinic acid to malic acid and malic acid to OAA are all oxidations.",
        },
        {
          title: "Two CO₂ per turn, three per pyruvic acid",
          body: "One turn of the Krebs cycle releases **2 CO₂**. The third CO₂ of each pyruvic acid comes earlier, when pyruvic acid becomes **acetyl CoA**.",
        },
        {
          title: "Citric acid is made from OAA, not from pyruvic acid directly",
          body: "**Acetyl CoA** (2 carbons) joins **oxaloacetic acid** (4 carbons) to give **citric acid** (6 carbons). Pyruvic acid first has to become acetyl CoA.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbors-ets",
      name: "The electron transport system and ATP synthase",
      visualizationSlug: "imat-chemiosmosis",
      intuition:
        "NADH and FADH₂ carry hydrogen from the earlier stages. On the inner mitochondrial membrane a chain of carriers passes their electrons down, step by step, to oxygen. The energy given out pumps protons into the space between the membranes. The protons flow back through ATP synthase, and that flow makes ATP. Oxygen takes the electrons and hydrogen at the very end and becomes water.",
      definition:
        "NCERT's account:\n" +
        "- The **electron transport system (ETS)** lies in the **inner mitochondrial membrane**.\n" +
        "- Electrons from NADH are taken by **NADH dehydrogenase (complex I)** and passed to **ubiquinone**. Ubiquinone also gets reducing equivalents from **FADH₂ (complex II)**, made when succinate is oxidised in the Krebs cycle.\n" +
        "- Reduced ubiquinone (**ubiquinol**) passes its electrons to **cytochrome c** through the **cytochrome bc₁ complex (complex III)**.\n" +
        "- **Cytochrome c** is a small protein attached to the **outer surface of the inner membrane**. It is a **mobile carrier** between complex III and complex IV.\n" +
        "- **Complex IV**, the **cytochrome c oxidase** complex, contains **cytochromes a and a₃** and **two copper centres**.\n" +
        "- **Oxygen** is the **final hydrogen acceptor**. Its role is limited to the terminal stage, but it is vital: it drives the whole process by removing hydrogen.\n" +
        "- The energy of oxidation and reduction makes the proton gradient, so ATP made this way is **oxidative phosphorylation** (in photosynthesis, light makes the gradient: photophosphorylation).",
      table: {
        columns: ["Part", "Name", "What it does"],
        rows: [
          { cells: ["Complex I", "NADH dehydrogenase", "Oxidises NADH and passes the electrons to ubiquinone"] },
          {
            cells: ["Complex II", "Succinate dehydrogenase", "Passes electrons from FADH₂ to ubiquinone"],
            noteAmber: "NEET 2025 asked the other name of complex II.",
            pyqExampleId: "734f81ea-062a-4d1a-b27e-a311bef9bc8b",
          },
          { cells: ["Complex III", "Cytochrome bc₁ complex", "Takes electrons from ubiquinol and passes them to cytochrome c"] },
          { cells: ["Cytochrome c", "A small mobile protein", "Carries electrons from complex III to complex IV"] },
          { cells: ["Complex IV", "Cytochrome c oxidase", "Has cytochromes a and a₃ and two copper centres; passes electrons to oxygen"] },
          { cells: ["Complex V", "ATP synthase", "Makes ATP from ADP and inorganic phosphate as protons flow through it"] },
          { cells: ["F₁ of complex V", "Headpiece, a peripheral membrane protein complex", "Holds the site where ATP is made"] },
          { cells: ["F₀ of complex V", "An integral membrane protein complex", "Forms the channel through which protons cross the inner membrane"] },
        ],
        caption: "For each ATP made, 2 H⁺ pass through F₀ from the intermembrane space into the matrix, down the proton gradient.",
      },
      pyqExampleId: "160d4e5d-5068-4cfe-8ea8-987068a34be4",
      selfCheckExample: {
        prompt: "Trace the electrons of one NADH from the moment they enter the electron transport system until they reach oxygen.",
        steps: [
          "NADH dehydrogenase (complex I) takes the electrons and hands them to ubiquinone.",
          "Ubiquinol passes them through the cytochrome bc₁ complex (complex III) to cytochrome c.",
          "Cytochrome c carries them to cytochrome c oxidase (complex IV), which passes them to oxygen.",
        ],
        answer: "Complex I, ubiquinone, complex III, cytochrome c, complex IV, oxygen.",
      },
      practiceSet: [
        { prompt: "Ubiquinone receives reducing equivalents from which two complexes?", answer: "Complex I (from NADH) and complex II (from FADH₂)" },
        { prompt: "Which complex of the ETS has two copper centres?", answer: "Complex IV (cytochrome c oxidase)" },
        { prompt: "Which part of ATP synthase forms the channel for protons?", answer: "F₀, an integral membrane protein complex" },
        { prompt: "How many protons pass through F₀ for each ATP made?", answer: "2 H⁺" },
        { prompt: "What is the final hydrogen acceptor of aerobic respiration?", answer: "Oxygen" },
        { prompt: "Why is ATP synthesis in mitochondria called oxidative phosphorylation?", answer: "The energy of oxidation and reduction, not light, makes the proton gradient" },
      ],
      traps: [
        {
          title: "Cytochrome bc₁ in mitochondria, b₆f in chloroplasts",
          body: "Complex III of respiration is the **cytochrome bc₁ complex**. The **cytochrome b₆f** complex belongs to the light reaction of photosynthesis, not to the mitochondrial ETS.",
        },
        {
          title: "Complex II is not NADH dehydrogenase",
          body: "**Complex I** is NADH dehydrogenase. **Complex II** is **succinate dehydrogenase** and feeds in electrons from FADH₂.",
        },
        {
          title: "F₁ makes ATP, F₀ lets protons through",
          body: "The **F₁ headpiece** (peripheral) holds the ATP-making site. The **F₀** part (integral) is the proton channel. Swapping them is a common wrong statement.",
        },
        {
          title: "Oxygen acts only at the end",
          body: "Oxygen's role is limited to the **terminal stage**, as the final hydrogen acceptor. Yet without it the whole chain stops, because nothing removes the hydrogen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbors-sites",
      name: "Where each stage happens",
      intuition:
        "Think of the cell as three rooms. Glycolysis is done in the open cytoplasm. Pyruvic acid then moves into the mitochondrion's inner room, the matrix, where the Krebs cycle runs. The electron carriers sit in the inner membrane around that room, and they pump protons out into the narrow space between the two membranes. NEET asks you to match each job to its room.",
      definition:
        "NCERT names two crucial events of aerobic respiration:\n" +
        "- **Complete oxidation of pyruvate** by stepwise removal of all its hydrogen atoms, leaving three CO₂: in the **matrix** of the mitochondria.\n" +
        "- **Passing the electrons** removed with those hydrogen atoms to oxygen, with ATP made at the same time: on the **inner membrane** of the mitochondria.\n" +
        "- Protons build up in the **intermembrane space** and flow back into the matrix through ATP synthase.",
      table: {
        columns: ["Stage or event", "Where it happens"],
        rows: [
          { cells: ["Glycolysis", "Cytoplasm"] },
          { cells: ["Pyruvic acid to acetyl CoA", "Mitochondrial matrix"] },
          { cells: ["Krebs (citric acid) cycle", "Mitochondrial matrix"] },
          { cells: ["Electron transport system", "Inner mitochondrial membrane"] },
          { cells: ["ATP synthase (complex V)", "Inner mitochondrial membrane"] },
          {
            cells: ["Build-up of protons (the proton gradient)", "Intermembrane space"],
            noteAmber: "NEET 2026 matched the same four places, calling the proton gradient the accumulation of protons.",
            pyqExampleId: "ea97faec-25e6-4a69-8122-d4737c19ae78",
          },
          { cells: ["Cytochrome c", "Outer surface of the inner membrane"] },
        ],
      },
      pyqExampleId: "e0c9913e-d53f-4a21-90d5-1be5ee77ff27",
      selfCheckExample: {
        prompt: "During ATP synthesis in a mitochondrion, protons pass through the F₀ channel of ATP synthase. From which compartment to which do they move?",
        steps: [
          "The ETS pumps protons out of the matrix, so they pile up in the intermembrane space.",
          "They flow back down the gradient, through F₀, into the matrix.",
        ],
        answer: "From the intermembrane space into the mitochondrial matrix.",
      },
      practiceSet: [
        { prompt: "Where in the cell is pyruvic acid converted to acetyl CoA?", answer: "Mitochondrial matrix" },
        { prompt: "To which surface of which membrane is cytochrome c attached?", answer: "The outer surface of the inner mitochondrial membrane" },
        { prompt: "In which membrane of the mitochondrion is ATP synthase found?", answer: "The inner membrane" },
        { prompt: "Pyruvic acid is made in one compartment and oxidised in another. Name the two.", answer: "Made in the cytoplasm, oxidised in the mitochondrial matrix" },
      ],
      traps: [
        {
          title: "The ETS is in the inner membrane",
          body: "The electron transport system sits in the **inner** mitochondrial membrane, not the outer one and not the matrix.",
        },
        {
          title: "Protons gather outside the matrix",
          body: "Protons build up in the **intermembrane space**, not in the matrix. They return to the matrix through F₀, which is how ATP is made.",
        },
        {
          title: "The Krebs cycle is in the matrix",
          body: "The **Krebs cycle** runs in the **matrix**. Only the electron carriers and ATP synthase are in the inner membrane.",
        },
      ],
    },
  ],
};
