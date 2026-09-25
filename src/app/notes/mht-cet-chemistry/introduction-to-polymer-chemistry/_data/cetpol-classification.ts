import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Polymers",
  title: "Classification of Polymers",
  oneLineDefinition:
    "Polymers are classed four ways — by source (natural, semisynthetic, synthetic), by chain structure (linear, branched, cross-linked), by the number of monomer kinds (homopolymer, copolymer) and by the strength of the intermolecular forces (elastomer, fibre, thermoplastic, thermosetting) — and the same polymer answers a different question under each.",
  whyItMatters:
    "22 PYQs, none HARD. Eleven are the force-based classes — pick the thermosetting one (urea-formaldehyde, bakelite), the thermoplastic (polythene, polyvinyls), the fibre (polyesters, nylon 6,6) or the elastomer (Buna-S, neoprene) from a mixed list, asked in one wording or another almost every sitting; eleven are the other three axes — copolymer or homopolymer (five times), linear or branched, semisynthetic, biodegradable, and the source of linen. " +
    "Two cards.",
  concepts: [
    // 1 — source, structure, monomer count
    {
      kind: "formula" as const,
      slug: "cetpol-source-structure-and-copolymers",
      name: "By Source, by Chain Structure, by Number of Monomers",
      intuition:
        "Three quick axes. SOURCE: made by nature (rubber, cellulose, starch, proteins), made by modifying a natural polymer (cellulose nitrate, cellulose acetate, rayon — semisynthetic), or made from small molecules (everything else). STRUCTURE: a linear chain packs well (HDPE), a branched one cannot (LDPE), and a cross-linked network cannot move at all (bakelite, melamine). MONOMERS: one kind gives a homopolymer (polythene, PVC, PAN, thermocol), two kinds a copolymer (Buna-S, Buna-N, PHBV, glyptal, polycarbonate). The paper's convention for 'identify the copolymer' is the rubber — Buna-S is keyed over nylon 6,6 every time both appear.",
      definition:
        "- **Natural**: natural rubber, cellulose, starch, proteins, wool, silk. **Linen comes from the flax plant.** **Semisynthetic**: cellulose nitrate, cellulose acetate, viscose rayon. **Synthetic**: nylon, dacron, polythene, PVC, Buna-S…\n" +
        "- **Linear**: HDPE, PVC, nylon, polyesters. **Branched**: LDPE, glycogen. **Cross-linked (network)**: bakelite, melamine-formaldehyde, urea-formaldehyde, vulcanised rubber.\n" +
        "- **Homopolymer** (one monomer): polythene, PVC, PAN, polystyrene (thermocol), Teflon, PMMA, natural rubber, nylon 6. **Copolymer** (two or more): Buna-S (SBR), Buna-N, PHBV, glyptal, polycarbonate, dacron, nylon 6,6.\n" +
        "- Paper convention: with Buna-S and nylon 6,6 in the same list, the keyed **copolymer is Buna-S** and the keyed polyamide/condensation polymer is nylon 6,6.\n" +
        "- **Biodegradable**: PHBV, nylon 2-nylon 6 (glycine + ε-aminocaproic acid). Teflon, LDPE, PAN, terylene, nylon 6 and 6,6 are not.",
      formula: {
        label: "Three axes",
        latex:
          "\\text{source: natural / semisynthetic / synthetic};\\quad \\text{chain: linear / branched / cross-linked};\\quad \\text{monomers: homo- / co-polymer}",
      },
      authoredExample: {
        prompt: "Classify cellulose acetate, LDPE and Buna-N on the three axes.",
        steps: [
          "Cellulose acetate: semisynthetic, linear, homopolymer (modified cellulose). LDPE: synthetic, branched, homopolymer. Buna-N: synthetic, linear, copolymer (butadiene + acrylonitrile).",
        ],
        answer: "Semisynthetic / linear / homo; synthetic / branched / homo; synthetic / linear / co",
      },
      selfCheckExample: {
        prompt: "Which pair are both copolymers: neoprene and isoprene; orlon and teflon; bakelite and orlon; SBR and PHBV?",
        steps: [
          "SBR = styrene + butadiene; PHBV = two hydroxy acids. Neoprene, orlon (PAN) and teflon are homopolymers.",
        ],
        answer: "SBR and PHBV",
      },
      practiceSet: [
        { prompt: "Semisynthetic: dacron, nylon 6, wool, cellulose nitrate?", answer: "Cellulose nitrate" },
        { prompt: "Linear polymer: HDPE, LDPE, bakelite, melamine?", answer: "High density polythene" },
        { prompt: "Homopolymer: polycarbonate, Buna-N, glyptal, thermocol?", answer: "Thermocol (polystyrene)" },
        { prompt: "Biodegradable: nylon-2-nylon-6, terylene, nylon 6, nylon 6,6?", answer: "Nylon-2-nylon-6" },
      ],
      pyqExampleId: "bdb6d928-81a1-48b4-afb1-200fd84e6d33",
      traps: [
        {
          title: "Nylon 6,6 as the copolymer",
          body:
            "It is made from two monomers, and the paper still keys Buna-S when both are offered. Reserve nylon 6,6 for 'polyamide', 'condensation' and 'fibre'.",
        },
      ],
    },

    // 2 — intermolecular forces
    {
      kind: "reference" as const,
      slug: "cetpol-classes-by-intermolecular-forces",
      name: "Elastomer, Fibre, Thermoplastic, Thermosetting: Ranked by Intermolecular Force",
      intuition:
        "Rank the forces between chains and the class falls out. Weakest: ELASTOMERS — chains coil and a few cross-links pull them back (rubbers: natural, Buna-S, Buna-N, neoprene). Strongest: FIBRES — hydrogen bonds or dipoles line the chains up into threads (nylons, polyesters/terylene, PAN). In between: THERMOPLASTICS — linear or lightly branched, soften on heating and can be remoulded (polythene, PVC, polystyrene, PMMA, Teflon). THERMOSETTING plastics are the odd class: heavily cross-linked on heating, they set once and cannot be remelted (bakelite, urea-formaldehyde, melamine-formaldehyde).",
      definition:
        "- **Elastomers** (weakest forces): natural rubber, Buna-S, Buna-N, neoprene, vulcanised rubber.\n" +
        "- **Fibres** (strongest — H-bonds/dipole): nylon 6, nylon 6,6, terylene/dacron/polyesters, polyacrylonitrile.\n" +
        "- **Thermoplastics** (intermediate; soften and remould): polythene, polyvinyls (PVC), polystyrene, PMMA, Teflon, novolac.\n" +
        "- **Thermosetting** (cross-linked on heating, cannot be remoulded): bakelite, urea-formaldehyde resin, melamine-formaldehyde.\n" +
        "- NOT true of a thermoplastic: 'possesses extensive covalent cross-linking' — that is the thermoset.",
      table: {
        columns: ["Class", "Intermolecular force", "Heating", "Examples"],
        rows: [
          { cells: ["Elastomer", "Weakest (a few cross-links)", "Stretch and recover", "Natural rubber, Buna-S, Buna-N, neoprene"] },
          { cells: ["Thermoplastic", "Intermediate", "Softens, remouldable", "Polythene, PVC, polystyrene, Teflon, PMMA"], noteAmber: "Thermoplastics have NO extensive cross-linking." },
          { cells: ["Thermosetting", "Cross-linked network", "Sets once, cannot remelt", "Bakelite, urea-formaldehyde, melamine-formaldehyde"] },
          { cells: ["Fibre", "Strongest (H-bond / dipole)", "High tensile strength, drawn to thread", "Nylon 6, nylon 6,6, terylene, PAN"] },
        ],
        caption: "The force ranking is elastomer < thermoplastic < fibre; thermosets are a structure, not a force level.",
      },
      selfCheckExample: {
        prompt: "From urea-formaldehyde resin, polythene, polystyrene, polyvinyls, pick the thermosetting polymer; from nylon 6,6, terylene, Buna-S, polythene pick the elastomer.",
        steps: [
          "The cross-linked resin; the synthetic rubber.",
        ],
        answer: "Urea-formaldehyde resin; Buna-S",
      },
      practiceSet: [
        { prompt: "Fibre: polyesters, vulcanised rubber, polythene, polyvinyls?", answer: "Polyesters" },
        { prompt: "Thermoplastic: urea-formaldehyde, bakelite, polythene, Buna-N?", answer: "Polythene" },
        { prompt: "Elastomer: neoprene, terylene, polystyrene, bakelite?", answer: "Neoprene" },
        { prompt: "Plastic dinner ware is made of?", answer: "Melamine-formaldehyde" },
      ],
      pyqExampleId: "f769b0f6-3b11-4152-9bc6-4822babc3951",
      traps: [
        {
          title: "Neoprene as a fibre, bakelite as a thermoplastic",
          body:
            "Anything called a rubber (Buna, neoprene) is an elastomer; anything ending in '-formaldehyde' or called bakelite is thermosetting. Fibres are the nylons, polyesters and PAN.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Properties and Uses — what each class is made into",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-properties-and-uses",
    },
    {
      label: "Polymers and Monomers — which monomers make each named polymer",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-polymers-and-monomers",
    },
  ],
};
