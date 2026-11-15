import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CE_NUCLEUS_NOTE: SubtopicNote = {
  subtopicName: "Cytoskeleton, Cilia and the Nucleus",
  title: "Cytoskeleton, Cilia and the Nucleus",
  oneLineDefinition:
    "The cytoskeleton, the 9+2 build of cilia and flagella, the cartwheel centriole, the parts of the nucleus, and the four kinds of chromosome by where the centromere sits.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026. The chromosome types by centromere position were matched twice (NEET 2022 and Re-NEET 2024). The nucleolus as the site of ribosomal RNA synthesis was asked twice (NEET 2024 and NEET 2026), and so was the axoneme as the core of cilia (NEET 2024 and Re-NEET 2024). Most are match-the-columns, so each structure must be tied to its exact home.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboce-cytoskeleton",
      name: "Cytoskeleton, cilia, flagella and centrioles",
      intuition:
        "The cytoskeleton is a web of protein threads that holds the cell's shape and lets it move. Cilia and flagella are hair-like outgrowths that beat to move the cell or the fluid around it; inside each is a core of microtubules in a 9+2 pattern. Centrioles look different: nine bundles of three tubules around a hub, like a cartwheel.",
      definition:
        "Cytoskeleton:\n" +
        "- An elaborate network of filamentous protein structures in the cytoplasm: **microtubules, microfilaments and intermediate filaments**.\n" +
        "- Jobs: **mechanical support, motility and keeping the shape** of the cell.\n\n" +
        "Cilia and flagella:\n" +
        "- Hair-like outgrowths of the cell membrane. **Cilia** are small and work like oars, moving the cell or the fluid around it. **Flagella** are longer and move the cell. Prokaryotic flagella are built differently.\n" +
        "- Both are covered by the plasma membrane. Their core, the **axoneme**, has microtubules running along the long axis: **nine doublets** of peripheral microtubules around **a central pair**, the **9+2 array**.\n" +
        "- The central tubules are joined by bridges and wrapped in a central sheath, which connects to one tubule of each peripheral doublet by a **radial spoke** (nine spokes). Linkers join the peripheral doublets.\n" +
        "- Both grow out of centriole-like structures called **basal bodies**.\n\n" +
        "Centrosome and centrioles:\n" +
        "- The **centrosome** usually holds two cylindrical **centrioles**, surrounded by amorphous pericentriolar material. The two lie **perpendicular** to each other.\n" +
        "- Each centriole has a **cartwheel** organisation: **nine evenly spaced peripheral fibrils of tubulin, each a triplet**. Adjacent triplets are linked. The central part of the proximal region, the **hub**, is joined to the peripheral tubules by protein **radial spokes**.\n" +
        "- Centrioles form the **basal body** of cilia and flagella, and the **spindle fibres** of the spindle apparatus during cell division in animal cells.",
      table: {
        columns: ["Structure", "Built of", "Job"],
        rows: [
          {
            cells: ["Cytoskeleton", "Microtubules, microfilaments, intermediate filaments", "Mechanical support, motility, cell shape"],
            noteAmber: "NEET 2023: of nuclear division, protein synthesis, motility and transport, the cytoskeleton's job is motility.",
            pyqExampleId: "ef02e64d-53a2-4ef0-a26b-e0b476f4912f",
          },
          { cells: ["Cilium", "Axoneme of 9+2 microtubules under the plasma membrane", "Short; beats like an oar to move the cell or the fluid around it"] },
          { cells: ["Flagellum", "The same 9+2 axoneme, longer", "Moves the cell"] },
          { cells: ["Basal body", "Centriole-like structure", "The base a cilium or flagellum grows from"] },
          { cells: ["Centriole", "Nine peripheral triplet fibrils of tubulin around a hub (cartwheel)", "Forms basal bodies, and spindle fibres in animal cell division"] },
        ],
      },
      pyqExampleId: "b976d1fe-8588-4aa3-92f7-612fde4faa79",
      selfCheckExample: {
        prompt: "How many microtubules in all does a cross-section of a cilium's axoneme show?",
        steps: [
          "The axoneme has nine peripheral doublets, and a doublet is two microtubules: \\(9 \\times 2 = 18\\).",
          "Add the central pair: \\(18 + 2 = 20\\).",
        ],
        answer: "20 microtubules (the 9+2 array).",
      },
      practiceSet: [
        { prompt: "Is each peripheral fibril of a centriole a doublet or a triplet?", answer: "A triplet" },
        { prompt: "What is the central proteinaceous part of the proximal region of a centriole called?", answer: "The hub" },
        { prompt: "Name the three kinds of filament that make up the cytoskeleton.", answer: "Microtubules, microfilaments and intermediate filaments" },
        { prompt: "How do the two centrioles of a centrosome lie relative to each other?", answer: "Perpendicular to each other" },
        { prompt: "What do centrioles form during cell division in animal cells?", answer: "The spindle fibres of the spindle apparatus" },
      ],
      traps: [
        {
          title: "Cilia have doublets, centrioles have triplets",
          body: "The **axoneme** of a cilium or flagellum is **9 doublets + 2 central** microtubules. A **centriole** has **9 triplets** around a hub and no central pair. 'Nine triplets' in a flagellum is false.",
        },
        {
          title: "Axoneme belongs to cilia, cartwheel to the centriole",
          body: "The **axoneme** is the core of **cilia and flagella**. The **cartwheel** pattern is the **centriole's**. Matches swap these two.",
        },
        {
          title: "A bacterial flagellum is not 9+2",
          body: "Prokaryotic flagella are **structurally different**: a filament, a hook and a basal body, with no 9+2 axoneme.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-nucleus",
      name: "The nucleus, nucleolus and chromatin",
      intuition:
        "The nucleus holds the cell's DNA inside a double envelope with pores in it. Between divisions the DNA is spread out as loose chromatin. Inside the nucleus lie one or more nucleoli, which have no membrane and are busy making ribosomal RNA. Cells that make a lot of protein have bigger and more nucleoli.",
      definition:
        "The nucleus:\n" +
        "- Described by **Robert Brown** (1831). **Flemming** named **chromatin**, the nuclear material stained by basic dyes.\n" +
        "- The interphase nucleus has loose, extended nucleoprotein fibres called **chromatin**, the **nuclear matrix** and one or more spherical **nucleoli**.\n" +
        "- **Nuclear envelope:** two parallel membranes with a **10 to 50 nm** space between them, the **perinuclear space**, which is a barrier between the nucleus and the cytoplasm. The **outer membrane** is usually continuous with the **ER** and carries ribosomes.\n" +
        "- **Nuclear pores** form where the two membranes fuse. **RNA and protein** move through them **in both directions**.\n" +
        "- Usually one nucleus per cell. Some mature cells have **none**: the **erythrocytes of many mammals** and the **sieve tube cells** of vascular plants.\n" +
        "- **Nucleoli** are spherical and **not membrane-bound**, so their content is continuous with the nucleoplasm. Each is a site of **active ribosomal RNA synthesis**. Cells busy making protein have **larger and more numerous** nucleoli.\n" +
        "- **Chromatin** contains **DNA**, basic proteins called **histones**, some non-histone proteins and also **RNA**. One human cell has about **two metres** of DNA spread over **46 chromosomes** (23 pairs). During division, chromatin condenses into chromosomes.\n" +
        "- **Microbodies**, small membrane-bound vesicles holding various enzymes, occur in **both plant and animal cells**.",
      table: {
        columns: ["Part", "What it is", "Fact to remember"],
        rows: [
          { cells: ["Nuclear envelope", "Two membranes with a 10 to 50 nm perinuclear space", "Outer membrane continuous with the ER and bears ribosomes"] },
          { cells: ["Nuclear pores", "Gaps where the two membranes fuse", "RNA and proteins pass both ways"] },
          {
            cells: ["Nucleolus", "Spherical body with no membrane", "Site of active ribosomal RNA synthesis; larger and more numerous in protein-making cells"],
            noteAmber: "NEET 2024 also matched the nucleolus with the site for active ribosomal RNA synthesis.",
            pyqExampleId: "5d6984dc-9db8-43d6-ad43-dc824c6968b1",
          },
          {
            cells: ["Chromatin", "DNA, histones, non-histone proteins and RNA", "About 2 m of DNA in 46 chromosomes in one human cell"],
            noteAmber: "Re-NEET 2024: histones were matched with chromosomes.",
            pyqExampleId: "a6742a63-8061-462b-b431-1de05aa005d2",
          },
          { cells: ["Cells with no nucleus", "Mature cells that have lost it", "Red blood cells of many mammals; sieve tube cells of vascular plants"] },
        ],
      },
      pyqExampleId: "3639b2bc-398e-45ff-b0f7-54bd286d0eee",
      selfCheckExample: {
        prompt: "Name two kinds of mature cell that have no nucleus, one from animals and one from plants.",
        steps: [
          "Among animals, the erythrocytes (red blood cells) of many mammals lose their nucleus.",
          "Among plants, the sieve tube cells of vascular plants have none when mature.",
        ],
        answer: "Red blood cells of many mammals, and sieve tube cells of vascular plants.",
      },
      practiceSet: [
        { prompt: "What is the space between the two membranes of the nuclear envelope called, and how wide is it?", answer: "The perinuclear space, 10 to 50 nm" },
        { prompt: "Which basic proteins are part of chromatin?", answer: "Histones" },
        { prompt: "In which cells are nucleoli larger and more numerous?", answer: "Cells actively carrying out protein synthesis" },
        { prompt: "About how much DNA does one human cell hold, and in how many chromosomes?", answer: "About two metres, in 46 chromosomes" },
        { prompt: "Which molecules pass through nuclear pores, and in which direction?", answer: "RNA and protein molecules, in both directions" },
      ],
      traps: [
        {
          title: "The nucleolus has no membrane",
          body: "The **nucleolus** is not membrane-bound, so its content is continuous with the nucleoplasm. It is not an organelle with its own envelope.",
        },
        {
          title: "Nucleolus, not chromatin or centrosome, makes rRNA",
          body: "The site of **active ribosomal RNA synthesis** is the **nucleolus**. Chromatin, the centrosome and the kinetochore are the usual wrong options.",
        },
        {
          title: "Sieve tube cells have no nucleus",
          body: "A mature **sieve tube cell** has **no nucleus**, like the red blood cell of many mammals. A statement that it has a conspicuous nucleus is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-chromosomes",
      name: "Chromosome types by the position of the centromere",
      intuition:
        "Every chromosome has a pinched point, the centromere, that holds its two chromatids together. Where that point sits decides the chromosome's name: in the middle, a little off the middle, near one end, or right at the end. Learn the four in order from the middle to the tip.",
      definition:
        "Chromosomes and the centromere:\n" +
        "- Every chromosome has a **primary constriction**, the **centromere**, which holds the two **chromatids** together. On its sides are disc-shaped structures called **kinetochores**. The centromere and kinetochores are what the cell uses to pull chromatids apart, so the centromere is tied to **cell division**.\n" +
        "- By the position of the centromere, chromosomes are of four kinds:\n" +
        "- **Metacentric:** centromere in the **middle**, forming two equal arms.\n" +
        "- **Sub-metacentric:** centromere **slightly away from the middle**, so one arm is shorter and one longer.\n" +
        "- **Acrocentric:** centromere **close to its end**, so one arm is extremely short and one very long.\n" +
        "- **Telocentric:** centromere at the **terminal** position.\n" +
        "- Some chromosomes have non-staining **secondary constrictions** at a fixed place. This gives the look of a small fragment, the **satellite**.",
      table: {
        columns: ["Type", "Centromere position", "Arms"],
        rows: [
          { cells: ["Metacentric", "In the middle", "Two equal arms"] },
          { cells: ["Sub-metacentric", "Slightly away from the middle", "One shorter, one longer arm"] },
          { cells: ["Acrocentric", "Close to one end", "One extremely short, one very long arm"] },
          { cells: ["Telocentric", "At the very end (terminal)", "All of the chromosome on one side"] },
        ],
      },
      pyqExampleId: "0264277a-4834-470a-8d34-ae2f4ada9eb8",
      selfCheckExample: {
        prompt: "A chromosome has one extremely short arm and one very long arm. Name its type and say where its centromere lies.",
        steps: [
          "An extremely short arm means the centromere sits close to one end, but not at the very tip.",
          "That is the acrocentric chromosome.",
        ],
        answer: "Acrocentric; the centromere is close to one end.",
      },
      practiceSet: [
        { prompt: "What are the disc-shaped structures on the sides of the centromere called?", answer: "Kinetochores" },
        { prompt: "What does a non-staining secondary constriction give a chromosome the look of?", answer: "A small fragment called the satellite" },
        { prompt: "Name the chromosome whose centromere is at the terminal position.", answer: "Telocentric" },
        { prompt: "What does the centromere hold together?", answer: "The two chromatids of the chromosome" },
      ],
      traps: [
        {
          title: "Acrocentric is near the end, telocentric is at the end",
          body: "**Acrocentric:** centromere **close to** one end. **Telocentric:** centromere **at** the end. Putting the acrocentric centromere at the terminal position is false.",
        },
        {
          title: "Sub-metacentric is slightly off the middle",
          body: "A **metacentric** centromere is **in the middle**. 'Slightly away from the middle' describes the **sub-metacentric** chromosome, not the metacentric.",
        },
        {
          title: "The satellite comes from a secondary constriction",
          body: "The **centromere** is the **primary** constriction. The **satellite** is the small fragment set off by a non-staining **secondary** constriction.",
        },
      ],
    },
  ],
};
