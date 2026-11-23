import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_SYNTHESIS_NOTE: SubtopicNote = {
  subtopicName: "Synthesis of Nanomaterials",
  title: "Making Nanomaterials: the Sol-Gel Process and Characterization",
  oneLineDefinition:
    "The bottom-up and top-down approaches, the sol-gel process with its hydrolysis and condensation reactions, and the five instruments used to characterize nanomaterials.",
  whyItMatters:
    "6 questions. Two were set in board papers: name the technique that gives the geometry of nanoparticles (2023), and define nanomaterial with the hydrolysis reaction of the sol-gel process (2024). The textbook adds sol and gel with the whole sol-gel method, the technique for surface structure, what FTIR tells you, and the full forms of five instruments.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgn-sol-gel",
      name: "Bottom-up, top-down and the sol-gel process",
      intuition:
        "There are two ways to reach the nanoscale. Build up from atoms and molecules, like laying bricks, or break a big lump down into finer and finer pieces. The sol-gel process builds up: a metal alkoxide reacts with water, and the pieces link into a network that becomes a solid oxide.",
      definition:
        "- **Bottom-up approach:** molecular components arrange themselves into more complex assemblies atom by atom, molecule by molecule and cluster by cluster. Example: synthesis of nanoparticles by colloidal dispersion.\n" +
        "- **Top-down approach:** nanomaterials are made by breaking a bulk material into finer pieces until each has only a few atoms.\n" +
        "- **Sol:** a dispersion of colloidal particles in a liquid; colloids are solid particles 1 to 100 nm across.\n" +
        "- **Gel:** an interconnected rigid network with pores of submicrometre size and polymeric chains averaging more than a micrometre in length.\n" +
        "- The sol-gel process is a wet chemical method based on inorganic polymerization reactions, generally carried out at room temperature and widely used to prepare **oxide materials**.\n" +
        "- The textbook names four steps (hydrolysis, polycondensation, drying, thermal decomposition), then sets out five numbered steps, given below.\n" +
        "- 1. Formation of a stable solution of the alkoxide or solvated metal precursor.\n" +
        "- 2. Gelation: an oxide or alcohol bridged network (the gel) forms by polycondensation.\n" +
        "- 3. Aging of the gel, during which it turns into a solid mass.\n" +
        "- 4. Drying: water and other volatile liquids are removed from the gel network.\n" +
        "- 5. Dehydration: the material is heated at temperatures up to 800 °C.",
      formula: {
        label: "Sol-gel reactions",
        latex: "\\text{MOR} + \\text{H}_2\\text{O} \\longrightarrow \\text{MOH} + \\text{ROH}\\ (\\text{hydrolysis}), \\qquad \\text{MOH} + \\text{ROM} \\longrightarrow \\text{M{-}O{-}M} + \\text{ROH}\\ (\\text{condensation})",
        symbols: [
          { symbol: "\\(\\text{MOR}\\)", meaning: "metal alkoxide (M is the metal, OR the alkoxide group)" },
          { symbol: "\\(\\text{ROH}\\)", meaning: "the alcohol set free" },
          { symbol: "\\(\\text{M{-}O{-}M}\\)", meaning: "the oxygen bridge that builds the network" },
        ],
      },
      authoredExample: {
        prompt: "Distinguish between the bottom-up and the top-down approaches to the synthesis of nanomaterials.",
        steps: [
          "Starting point: bottom-up starts from atoms and molecules; top-down starts from a bulk material.",
          "How: in bottom-up, molecular components arrange themselves into larger assemblies atom by atom, molecule by molecule and cluster by cluster; in top-down, the bulk solid is broken into finer pieces.",
          "End point: both stop at particles in the nanoscale; in top-down each piece is made of only a few atoms.",
          "Example: bottom-up, synthesis of nanoparticles by colloidal dispersion.",
        ],
        answer: "Bottom-up builds from atoms and molecules (colloidal dispersion); top-down breaks down bulk material",
      },
      selfCheckExample: {
        prompt: "In the sol-gel process, in which step is the material heated at temperatures up to 800 °C?",
        steps: ["The last of the five steps heats the dried gel to drive out water."],
        answer: "Dehydration",
      },
      practiceSet: [
        { prompt: "What is a sol?", answer: "A dispersion of colloidal particles (1 to 100 nm) in a liquid" },
        { prompt: "What happens to a gel during aging?", answer: "It transforms into a solid mass" },
        { prompt: "What kind of materials is the sol-gel process widely used to prepare?", answer: "Oxide materials" },
        { prompt: "Name the condensation product that builds the network in the sol-gel process.", answer: "The oxygen bridged \\(\\text{M{-}O{-}M}\\) network, with alcohol set free" },
        { prompt: "Give one use of sol-gel coatings in the motor vehicle industry.", answer: "Water repellent coatings for windscreens or exterior mirrors" },
      ],
      pyqExampleId: "8ae37434-5334-449d-94fb-2f46050e17ee",
      traps: [
        {
          title: "Hydrolysis gives a hydroxide, not an oxide",
          body: "Hydrolysis of the alkoxide gives the metal hydroxide MOH and alcohol. The M-O-M oxide bridge forms only in the next step, condensation.",
        },
        {
          title: "Drying is not the last step",
          body: "After the gel is dried, it is dehydrated by heating up to 800 °C. Dehydration is the last step.",
        },
        {
          title: "Four steps or five",
          body: "The textbook first names four steps and then lists five, adding the forming of the solution and aging of the gel. For a full answer, write the five numbered steps.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-characterisation",
      name: "Characterization techniques (Table 16.1)",
      intuition:
        "Once a nanomaterial is made, you must check what you made. Each instrument answers one question: has a nanoparticle formed, how big is it, what is its crystal structure, what does its surface look like, which groups does it carry.",
      definition:
        "- Learn the table as three columns: the technique, the instrument, and the information it gives.\n" +
        "- **Particle size** comes from both XRD and TEM; **geometry** and **crystal structure** from XRD alone; **surface structure (morphology)** from SEM alone.\n" +
        "- **STM** is the scanning tunneling microscope (invented 1980), not part of this table.",
      table: {
        columns: ["Technique", "Instrument", "Information"],
        rows: [
          { cells: ["UV-visible spectroscopy", "UV-visible spectrophotometer", "Preliminary confirmation of formation of nanoparticles"] },
          {
            cells: ["X-ray diffraction (XRD)", "X-ray diffractometer", "Particle size, crystal structure, geometry"],
            pyqExampleId: "de4e4c81-d901-49ce-bea6-4e1ac50181de",
            noteAmber: "Board 2023 asked which technique gives the geometry of nanoparticles.",
          },
          {
            cells: ["Scanning electron microscopy (SEM)", "Scanning electron microscope", "Structure of the surface of the material, that is morphology"],
            pyqExampleId: "16d747bc-619b-4190-a1ad-0abe787ce09a",
          },
          { cells: ["Transmission electron microscopy (TEM)", "Transmission electron microscope", "Particle size"] },
          {
            cells: ["FTIR (Fourier transform infrared spectroscopy)", "Fourier transform infrared spectrophotometer", "Absorption by functional groups, binding nature"],
            pyqExampleId: "ac344c9c-14ec-446b-b939-3b5e2088ef34",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which technique gives the first, preliminary confirmation that nanoparticles have formed?",
        steps: ["Table 16.1 lists UV-visible spectroscopy for this."],
        answer: "UV-visible spectroscopy",
      },
      practiceSet: [
        { prompt: "Give the full form of TEM.", answer: "Transmission electron microscope (or microscopy)" },
        { prompt: "Which two techniques in Table 16.1 give particle size?", answer: "XRD and TEM" },
        { prompt: "Give the full form of STM.", answer: "Scanning tunneling microscope" },
        { prompt: "Which technique tells you the binding nature of a nanomaterial?", answer: "FTIR, Fourier transform infrared spectroscopy" },
      ],
      pyqExampleId: "de4e4c81-d901-49ce-bea6-4e1ac50181de",
      traps: [
        {
          title: "SEM and TEM swapped",
          body: "SEM (scanning) shows the surface, the morphology. TEM (transmission) gives particle size. Remember: scanning sweeps over the surface; transmission passes through.",
        },
        {
          title: "Technique or instrument",
          body: "XRD is the technique, X-ray diffraction; the instrument is the X-ray diffractometer. Read whether the question asks for the technique or the instrument.",
        },
      ],
    },
  ],
};
