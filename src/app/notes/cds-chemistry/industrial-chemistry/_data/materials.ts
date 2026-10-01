import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_IC_MATERIALS_NOTE: SubtopicNote = {
  subtopicName: "Glass, Cement and Polymers",
  title: "Glass, Cement and Polymers",
  oneLineDefinition:
    "Kinds of glass and why glass is called a supercooled liquid, why new concrete is kept wet, and thermoplastics against thermosetting plastics, with nylon's monomers.",
  whyItMatters:
    "Five CDS questions, two of them from the 2024 (II) paper. The nylon-6 question is the hardest: its monomer is caprolactam, while nylon-6,6 needs two.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschic-glass",
      name: "Kinds of glass",
      intuition:
        "Glass is a melt cooled so fast that its particles freeze in a disordered jumble instead of forming crystals. That is why it is called an amorphous solid or a supercooled liquid. Adding different oxides gives glass for different jobs.",
      definition:
        "The facts:\n" +
        "- Glass is **amorphous**: **no crystals form** on cooling, so it is called a **supercooled liquid**.\n" +
        "- **Soda (soft) glass**: windows, bottles. **Hard (potash) glass**: laboratory ware.\n" +
        "- **Pyrex (borosilicate)**: resists heat; cookware and lab flasks.\n" +
        "- **Flint glass** (contains lead oxide): high refractive index; **optical instruments**, lenses and prisms.\n" +
        "- **Coloured glass**: metal oxides added (cobalt oxide blue, chromium oxide green).\n" +
        "- **Water glass** is **sodium silicate**.",
      table: {
        columns: ["Glass", "Special property", "Used for"],
        rows: [
          { cells: ["Soda (soft) glass", "Cheap, melts easily", "Windows, bottles"] },
          { cells: ["Pyrex (borosilicate)", "Withstands heat", "Cookware, lab flasks"] },
          {
            cells: ["Flint glass", "High refractive index (lead oxide)", "Optical instruments"],
            pyqExampleId: "55213c82-1904-4b65-aba8-72a09281fa2c",
          },
          { cells: ["Coloured glass", "Metal oxides added", "Decorative and signal glass"] },
          { cells: ["Water glass", "Sodium silicate (soluble)", "Adhesive, fireproofing"] },
        ],
      },
      pyqExampleId: "31407c66-6625-424f-b077-98ab8f7f1ade",
      practiceSet: [
        { prompt: "Which glass is used to make lenses and prisms?", answer: "Flint glass" },
        { prompt: "What is water glass?", answer: "Sodium silicate" },
        { prompt: "Which glass is used for laboratory flasks that are heated?", answer: "Pyrex (borosilicate)" },
      ],
      traps: [
        {
          title: "Glass does not crystallise",
          body: "'Crystallinity develops on cooling molten glass' is **false**. Glass is cooled too fast for crystals to form; that is why it is amorphous.",
        },
        {
          title: "Pyrex is for heat, flint for optics",
          body: "Pyrex and hard glass are chosen to **survive heat**. Optical instruments use **flint glass**, chosen for its high refractive index.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschic-cement",
      name: "Cement and the curing of concrete",
      intuition:
        "Cement does not dry to get hard; it reacts with water. If the water evaporates too soon, the reaction stops and the concrete stays weak. So new concrete is kept wet, often under wet sacks, for days.",
      definition:
        "The facts:\n" +
        "- **Portland cement** is made by heating **limestone and clay**; **gypsum** is added to slow its setting.\n" +
        "- Cement sets by **hydration**, a reaction with water.\n" +
        "- **Curing**: new concrete is covered with wet straw or gunny bags to **prevent fast evaporation until hydration has gone far enough**.\n" +
        "- **Concrete** = cement + sand + gravel + water; with steel bars inside, reinforced concrete (RCC).",
      table: {
        columns: ["Material or step", "What it is"],
        rows: [
          { cells: ["Raw materials of cement", "Limestone and clay"] },
          { cells: ["Gypsum in cement", "Slows down setting"] },
          {
            cells: ["Curing concrete", "Keeping it wet so water stays for hydration"],
            pyqExampleId: "88592aad-fbca-4ead-a5ab-aa45c6214cb3",
          },
          { cells: ["Concrete", "Cement, sand, gravel and water"] },
        ],
      },
      pyqExampleId: "88592aad-fbca-4ead-a5ab-aa45c6214cb3",
      practiceSet: [
        { prompt: "Which substance is added to cement to slow its setting?", answer: "Gypsum" },
        { prompt: "What are the raw materials of Portland cement?", answer: "Limestone and clay" },
      ],
      traps: [
        {
          title: "Cement hardens by reacting, not by drying",
          body: "Curing keeps concrete **wet** because cement hardens by **hydration**. Wet sacks are not there to keep dust or fungus off.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschic-polymers",
      name: "Plastics and nylon",
      intuition:
        "Plastics come in two kinds. Thermoplastics have separate long chains that slide apart when heated, so they soften. Thermosetting plastics have chains cross-linked into one rigid network, so heat cannot soften them again.",
      definition:
        "The facts:\n" +
        "- **Thermoplastic**: softens on heating, can be remoulded (polythene, PVC, polystyrene).\n" +
        "- **Thermosetting plastic**: cross-linked, stays **rigid when heated** (bakelite, melamine).\n" +
        "- **Nylon-6**: one monomer, **caprolactam**.\n" +
        "- **Nylon-6,6**: two monomers, **hexamethylenediamine and adipic acid**.\n" +
        "- **Bakelite**: phenol + formaldehyde. Urea-formaldehyde resin: urea + formaldehyde.",
      table: {
        columns: ["Polymer", "Monomer(s)", "Kind"],
        rows: [
          {
            cells: ["Nylon-6", "Caprolactam", "Thermoplastic fibre"],
            noteAmber: "CDS 2019 (I), HARD: nylon-6 is made from caprolactam alone.",
            pyqExampleId: "1989585d-0027-49af-a476-01c58ebefdc6",
          },
          { cells: ["Nylon-6,6", "Hexamethylenediamine + adipic acid", "Thermoplastic fibre"] },
          { cells: ["Bakelite", "Phenol + formaldehyde", "Thermosetting"] },
          { cells: ["Polythene", "Ethene", "Thermoplastic"] },
        ],
      },
      pyqExampleId: "22f09f13-2e0e-4799-bf71-21009ff112f9",
      selfCheckExample: {
        prompt: "An electric switch must not soften when it warms up. Should it be made of a thermoplastic or a thermosetting plastic? Name one.",
        steps: [
          "A thermoplastic softens on heating, so it would deform.",
          "A thermosetting plastic is cross-linked and stays rigid.",
        ],
        answer: "A thermosetting plastic, such as bakelite.",
      },
      practiceSet: [
        { prompt: "What is the monomer of nylon-6?", answer: "Caprolactam" },
        { prompt: "Is bakelite a thermoplastic or a thermosetting plastic?", answer: "Thermosetting" },
        { prompt: "Which two monomers make nylon-6,6?", answer: "Hexamethylenediamine and adipic acid" },
      ],
      traps: [
        {
          title: "Nylon-6 has one monomer, nylon-6,6 two",
          body: "**Nylon-6** comes from **caprolactam** alone. Hexamethylenediamine with adipic acid gives **nylon-6,6**.",
        },
        {
          title: "Rigid when hot means thermosetting",
          body: "A plastic that keeps its shape in hot water is **thermosetting**. PVC and polythene are thermoplastics and soften.",
        },
      ],
    },
  ],
};
