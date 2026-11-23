import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Nanomaterials",
  title: "Applications, Advantages and Disadvantages of Nanomaterials",
  oneLineDefinition:
    "Silver nanoparticles in water purification, the lotus effect, nanostructured materials in tyres, sunscreen and glass, and the advantages and disadvantages of nanotechnology.",
  whyItMatters:
    "12 questions. Eight were set in board papers, the most of any page: name the nanoparticle that is a bacterial disinfectant (2022, 2024 and 2026), the material in car tyres (2023 and 2026), the flower that cleans itself (2024), two disadvantages of nanotechnology (2022), and two advantages with the definition of green chemistry (2023). The textbook adds sunscreen and the role of nanotechnology in water purification.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgn-water-lotus",
      name: "Water purification and self-cleaning surfaces",
      intuition:
        "Two of nature's tricks, put to work. Silver kills bacteria, and spread as nanoparticles over a filter it offers a huge surface to the water flowing past. A lotus leaf is covered in nanostructures that make water roll off as beads, picking up dirt on the way.",
      definition:
        "- **Water purification:** water contains waterborne pathogens such as viruses and bacteria, and 1.1 billion people lack an improved water supply. Cost effective filter materials coated with **silver nanoparticles (AgNps)** are an alternative technology, for example in a water purifier. Silver nanoparticles act as a **highly effective bacterial disinfectant** and **remove E. coli** from water.\n" +
        "- **Self-cleaning materials:** the **lotus** (Nelumbo nucifera) grows in muddy water, yet its leaves always look clean. The leaves are **superhydrophobic**: nanostructures on them repel water, which carries the dirt away as it rolls off.\n" +
        "- The **lotus effect** is the basis of **self-cleaning windows**.\n" +
        "- Other uses in the textbook: scratchproof eyeglasses, crack resistant paints and sunscreen, and electronic devices such as magnetoresistive random access memory (MRAM).",
      authoredExample: {
        prompt: "What is the lotus effect? Give one application of it.",
        steps: [
          "The lotus plant grows in muddy water, yet its leaves always appear clean.",
          "Its leaves are superhydrophobic: nanostructures on the leaf surface repel water.",
          "Water rolls off the leaf and carries the dirt away with it. This is the lotus effect.",
          "Application: the lotus effect is the basis of self-cleaning windows.",
        ],
        answer: "Self-cleaning of superhydrophobic, nanostructured lotus leaves; used in self-cleaning windows",
      },
      selfCheckExample: {
        prompt: "Why does a filter coated with silver nanoparticles disinfect water better than the same mass of silver as one lump?",
        steps: [
          "Nanoparticles have a very high surface-to-volume ratio.",
          "The same mass spread as nanoparticles offers far more surface, so far more contact with the water and its bacteria.",
        ],
        answer: "The nanoparticles present a much larger surface to the water",
      },
      practiceSet: [
        { prompt: "What is the botanical name of the lotus?", answer: "Nelumbo nucifera" },
        { prompt: "What property of lotus leaves keeps them clean?", answer: "They are superhydrophobic: nanostructures on them repel water" },
        { prompt: "Name two kinds of waterborne pathogens mentioned in the textbook.", answer: "Viruses and bacteria" },
        { prompt: "Give one use of nanomaterials in electronic devices.", answer: "Magnetoresistive random access memory (MRAM)" },
      ],
      pyqExampleId: "9e7344ee-8613-4c50-b41d-dc95355f7487",
      traps: [
        {
          title: "Silver, not gold, purifies water",
          body: "Gold nanoparticles give ruby red glass and act as catalysts. The bacterial disinfectant in water purifiers is silver.",
        },
        {
          title: "Hydrophobic is not enough",
          body: "Write superhydrophobic, and say what does the work: nanostructures on the leaf repel water, which carries the dirt away.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-everyday",
      name: "Nanostructured materials in everyday products",
      intuition:
        "Nanomaterials are not new. People used them for centuries in glass, pottery and tyres without knowing it; only modern instruments showed their nanostructure.",
      definition:
        "- Nanomaterials have been produced and used by humans for hundreds of years. Understanding them as nanostructured materials is recent, thanks to sophisticated instruments.\n" +
        "- **Carbon nanotubes** are made up of graphite sheets with a nanosized diameter, and they have the highest strength.\n" +
        "- A one-word question names the use and asks for the material, so learn the table both ways.",
      table: {
        columns: ["Material", "Where it is used", "What it does"],
        rows: [
          {
            cells: ["Carbon black (discovered 1900)", "Tyres of cars", "Increases the life of the tyre"],
            pyqExampleId: "9aaf1892-716b-4aaf-984a-ab5edea24971",
            noteAmber: "Board 2023 and Board 2026 both asked for this material.",
          },
          {
            cells: ["Nanoparticles of zinc oxide (ZnO) and titanium dioxide (TiO₂)", "Sunscreen", "Protect the skin from harmful UV rays by absorbing or reflecting the light"],
            pyqExampleId: "4aa4c64d-492e-4197-b32d-6fe93416152a",
          },
          { cells: ["Gold and silver nanoparticles trapped in a glass matrix", "Some ancient glass paintings", "Give the beautiful ruby red colour"] },
          { cells: ["Spherical metallic nanoparticles", "Some medieval pottery", "Give the decorative glaze or metallic film called lustre"] },
          { cells: ["Fumed silica", "Silicone rubber, coatings, sealants and adhesives", "A nanostructured component of these products"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which nanoparticles give the ruby red colour of some ancient glass paintings?",
        steps: ["Gold and silver nanoparticles trapped in the glass matrix."],
        answer: "Gold and silver nanoparticles",
      },
      practiceSet: [
        { prompt: "Which nanostructured material is a component of silicone rubber, sealants and adhesives?", answer: "Fumed silica" },
        { prompt: "Name the two oxides whose nanoparticles are used in sunscreen.", answer: "Zinc oxide (ZnO) and titanium dioxide (TiO₂)" },
        { prompt: "What gives the lustre found on some medieval pottery?", answer: "Spherical metallic nanoparticles" },
        { prompt: "What are carbon nanotubes made of?", answer: "Graphite sheets with a nanosized diameter" },
      ],
      pyqExampleId: "c4f32d14-b1bc-4c42-8544-0f4611b6decc",
      traps: [
        {
          title: "Carbon black, not carbon nanotubes, in tyres",
          body: "The textbook names carbon black for tyres. Carbon nanotubes are known for their strength, but they are not the tyre answer.",
        },
        {
          title: "Sunscreen needs both oxides and the use",
          body: "Name ZnO and TiO₂, and say what they do: protect the skin from UV rays by absorbing or reflecting the light. The question usually asks for both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-pros-cons",
      name: "Advantages and disadvantages of nanotechnology",
      intuition:
        "Nanotechnology is powerful in both directions. The same tiny size that makes nanoparticles so useful lets them float in the air and reach deep into the lungs.",
      definition:
        "- **Advantages:** a revolution in electronics and computing; cheaper solar power and more efficient energy storage; smart drugs and cures for serious diseases.\n" +
        "- **Disadvantages:** nano pollution and lung damage.\n" +
        "- The characteristics of nanoparticles that matter for health are their **size, chemical composition and shape**.",
      table: {
        columns: ["Side", "Point", "What the textbook says"],
        rows: [
          {
            cells: ["Advantage", "Electronics and computing", "A revolution in electronics and computing"],
            pyqExampleId: "b43ab406-8a4d-4814-bcd4-6c7d9650134c",
            noteAmber: "Board 2023 asked for two advantages together with the definition of green chemistry.",
          },
          { cells: ["Advantage", "Energy sector", "Solar power will become more economical; energy storage devices will become more efficient"] },
          { cells: ["Advantage", "Medical field", "Smart drugs that cure faster and without side effects; cures for life threatening diseases such as cancer and diabetes"] },
          {
            cells: ["Disadvantage", "Nano pollution", "Nanotechnology has raised the standard of living but increased pollution, including air pollution. This nano pollution is very dangerous for living organisms"],
            pyqExampleId: "76201343-f9d0-4ee3-b3ad-fd0cd193be17",
            noteAmber: "Board 2022 asked for two disadvantages.",
          },
          { cells: ["Disadvantage", "Lung damage", "Inhaled particulate matter is deposited throughout the respiratory tract and then in the lungs"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give two advantages of nanotechnology in the energy sector.",
        steps: ["The textbook names solar power and energy storage."],
        answer: "Solar power becomes more economical; energy storage devices become more efficient",
      },
      practiceSet: [
        { prompt: "What is nano pollution?", answer: "The pollution, including air pollution, caused by nanotechnology; it is very dangerous for living organisms" },
        { prompt: "Name the three characteristics of nanoparticles that decide their effect on health.", answer: "Size, chemical composition and shape" },
        { prompt: "Name two life threatening diseases nanotechnology helps to cure, according to the textbook.", answer: "Cancer and diabetes" },
      ],
      pyqExampleId: "76201343-f9d0-4ee3-b3ad-fd0cd193be17",
      traps: [
        {
          title: "Advantages for a disadvantage question",
          body: "Read which side is asked. Nano pollution and lung damage are the textbook's two disadvantages; write both with one line of explanation each.",
        },
        {
          title: "A point with no explanation",
          body: "'Medical field' alone is a heading, not an advantage. Add what it does: smart drugs that cure faster and without side effects.",
        },
      ],
    },
  ],
};
