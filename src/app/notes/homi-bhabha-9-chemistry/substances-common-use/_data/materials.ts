import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SU_MATERIALS_NOTE: SubtopicNote = {
  subtopicName: "Cement, Glass and Plastics",
  title: "Cement, Glass and Plastics",
  oneLineDefinition:
    "Cement is lime, silica, alumina and iron oxide with a little gypsum; glass takes its colour from metal oxides; ceramics are fired clay or sintered powder; and plastics are either thermoplastics that remelt or thermosetting plastics that set for good.",
  whyItMatters:
    "Nine questions in the bank, two EASY, six MODERATE and one HARD. Four are about building materials (two on what Portland cement contains, one on the oxide that colours glass bluish green, one on sintering), and five about plastics: which kind can be remoulded, the uses of melamine and PVC, the properties all plastics share, the formula of Teflon and the cancers styrene is linked to.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9suma-cement",
      name: "Cement, glass and ceramics",
      intuition:
        "Cement, glass and ceramics are all made by heating earthy materials very strongly. Limestone and clay give cement; sand, soda ash and limestone give glass; clay gives pottery and porcelain. Small amounts of other substances change how each one behaves: gypsum slows the setting of cement, and metal oxides colour glass.",
      definition:
        "- **Portland cement** is made by heating **limestone** (lime) and **clay** strongly and grinding the product with a little **gypsum**, which **slows down setting**.\n" +
        "- Its components are **lime (calcium oxide)**, **silica**, **alumina** and **iron oxide**, with **gypsum**. Lime is the largest part.\n" +
        "- **Concrete** is cement mixed with sand, gravel and water. That is a mixture made with cement, not the cement itself.\n" +
        "- **Glass** is made by melting sand (silica) with soda ash and limestone. Metal oxides added to the melt give it colour.\n" +
        "- **Ceramics** are made by heating clay: they are hard, **brittle** and do not let water through. **Advanced ceramics** are made by **sintering**: a pressed powder is heated below its melting point until its particles fuse into a hard solid.",
      table: {
        columns: ["Oxide added to glass", "Colour of the glass"],
        rows: [
          { cells: ["Ferrous oxide (iron(II) oxide)", "Bluish green"] },
          { cells: ["Chromium oxide", "Green"] },
          { cells: ["Cobalt oxide", "Blue"] },
          { cells: ["Manganese dioxide", "Violet"] },
          { cells: ["Cuprous oxide", "Red"] },
        ],
        caption: "Calcium oxide is part of ordinary glass and gives it no colour.",
      },
      selfCheckExample: {
        prompt: "What is ground with the clinker of Portland cement, and why is it added?",
        steps: ["Cement clinker alone would set too quickly once water is added.", "A little gypsum is ground with it to slow the setting."],
        answer: "Gypsum, to slow down the setting of the cement",
      },
      practiceSet: [
        { prompt: "Which two raw materials are heated together to make Portland cement?", answer: "Limestone and clay" },
        { prompt: "Which oxide gives glass a blue colour?", answer: "Cobalt oxide" },
        { prompt: "What is the process of heating a pressed powder below its melting point so that its particles fuse called?", answer: "Sintering" },
        { prompt: "Is a ceramic plate tough or brittle?", answer: "Brittle: it breaks when dropped" },
      ],
      pyqExampleId: "74c13de3-9bc5-498b-8341-7f6abdb0122c",
      traps: [
        {
          title: "Listing urea (carbamide) as a cement component",
          body: "Carbamide is urea, a fertilizer. Cement is lime, silica, alumina and iron oxide with gypsum.",
        },
        {
          title: "Confusing cement with concrete",
          body: "Cement, water, sand and gravel together make concrete. Cement itself is the grey powder of lime, silica, alumina and iron oxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9suma-plastics",
      name: "Thermoplastics and thermosetting plastics",
      intuition:
        "A plastic bucket that touches a hot stove goes soft and bends: it is a thermoplastic, and it can be melted and moulded again. An electric switch stays hard even when hot, because it is a thermosetting plastic that set for good when it was first made.",
      definition:
        "- **Thermoplastics** soften on heating and harden on cooling, again and again, so they can be **remoulded**: **polythene**, **PVC**, **polystyrene**.\n" +
        "- **Thermosetting plastics** set permanently when first heated and **cannot be remoulded**: **Bakelite**, **melamine**.\n" +
        "- All plastics are **durable**, **light in weight** and **non-reactive** (they do not rust or react with water and most chemicals). They are **poor conductors** of heat and electricity.",
      table: {
        columns: ["Plastic", "Kind", "Uses"],
        rows: [
          { cells: ["Polythene (polyethylene)", "Thermoplastic", "Carry bags, bottles, buckets"] },
          { cells: ["PVC", "Thermoplastic", "Pipes, handbags, shoes, raincoats"] },
          { cells: ["Polystyrene", "Thermoplastic", "Packing material, disposable cups"] },
          { cells: ["Bakelite", "Thermosetting", "Electric switches, handles of pans"] },
          { cells: ["Melamine", "Thermosetting", "Cups, saucers, plates; fire-resistant fabric"], noteAmber: "Melamine resists fire, so it is used for fire-resistant fabric." },
        ],
        caption: "Polythene and PVC remelt; Bakelite and melamine do not.",
      },
      selfCheckExample: {
        prompt: "Why are the switches of an electric board made of Bakelite and not of polythene?",
        steps: ["Bakelite is a thermosetting plastic: it does not soften when it warms up.", "It is also a poor conductor of electricity."],
        answer: "Bakelite stays hard when heated and does not conduct electricity, while polythene would soften.",
      },
      practiceSet: [
        { prompt: "Can a thermosetting plastic be melted and remoulded?", answer: "No" },
        { prompt: "Is polythene a thermoplastic or a thermosetting plastic?", answer: "A thermoplastic" },
        { prompt: "Which plastic is used to make fire-resistant fabric?", answer: "Melamine" },
        { prompt: "Are plastics good or poor conductors of electricity?", answer: "Poor conductors" },
      ],
      pyqExampleId: "c07246e2-ef99-4a4f-a6df-3f9c73cda750",
      traps: [
        {
          title: "Thinking thermosetting plastics can be remoulded",
          body: "Once set, a thermosetting plastic such as Bakelite or melamine stays hard. Only thermoplastics can be softened and reshaped.",
        },
        {
          title: "Calling plastics good conductors",
          body: "Plastics are poor conductors of heat and electricity; that is why switches and pan handles are made of them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9suma-polymers",
      name: "Polymers, their formulas and health risks",
      intuition:
        "A plastic is a polymer: a very long chain made by joining thousands of small molecules called monomers. Its formula is just the monomer's formula in brackets with a small n, meaning repeated many times. Some monomers are harmful, which is why plastics need care.",
      definition:
        "- A **polymer** is a long chain of repeating units called **monomers**. Its formula is written \\(\\mathrm{(monomer)_n}\\).\n" +
        "- **Polythene** is made from ethene, \\(\\mathrm{C_2H_4}\\): \\(\\mathrm{(C_2H_4)_n}\\).\n" +
        "- **Teflon** (polytetrafluoroethylene, PTFE) is made from tetrafluoroethylene, \\(\\mathrm{C_2F_4}\\): \\(\\mathrm{(C_2F_4)_n}\\). It is used for **non-stick** pans.\n" +
        "- **Polystyrene** is made from **styrene**. Styrene is linked to cancers of the blood and lymph system: **leukaemia** and **lymphoma**.\n" +
        "- Burning plastic gives out harmful gases, and plastic waste does not rot.",
      table: {
        columns: ["Polymer", "Monomer", "Formula", "Use"],
        rows: [
          { cells: ["Polythene", "Ethene", "\\(\\mathrm{(C_2H_4)_n}\\)", "Bags, bottles"] },
          { cells: ["Teflon (PTFE)", "Tetrafluoroethylene", "\\(\\mathrm{(C_2F_4)_n}\\)", "Non-stick coating on pans"] },
          { cells: ["PVC", "Vinyl chloride", "\\(\\mathrm{(C_2H_3Cl)_n}\\)", "Pipes, shoes"] },
          { cells: ["Polystyrene", "Styrene", "\\(\\mathrm{(C_8H_8)_n}\\)", "Packing material"] },
        ],
        caption: "Tetra means four: Teflon's monomer has four fluorine atoms.",
      },
      selfCheckExample: {
        prompt: "What is the formula of polythene, and from which monomer is it made?",
        steps: ["Polythene is made by joining many ethene molecules, \\(\\mathrm{C_2H_4}\\)."],
        answer: "\\(\\mathrm{(C_2H_4)_n}\\), from ethene",
      },
      practiceSet: [
        { prompt: "What are the small repeating units of a polymer called?", answer: "Monomers" },
        { prompt: "For what is Teflon used in the kitchen?", answer: "As the non-stick coating on pans" },
        { prompt: "From which monomer is PVC made?", answer: "Vinyl chloride" },
        { prompt: "Which monomer of a common plastic is linked to leukaemia and lymphoma?", answer: "Styrene (of polystyrene)" },
      ],
      pyqExampleId: "5432279e-2f5f-45f0-9a41-2b644f223b4d",
      traps: [
        {
          title: "Writing Teflon with hydrogen",
          body: "Teflon has no hydrogen: its unit is \\(\\mathrm{C_2F_4}\\). \\(\\mathrm{(C_2H_4)_n}\\) is polythene.",
        },
        {
          title: "Counting blood cancer and leukaemia as two cancers",
          body: "Leukaemia is cancer of the blood. The two cancers linked to styrene are leukaemia and lymphoma.",
        },
      ],
    },
  ],
};
