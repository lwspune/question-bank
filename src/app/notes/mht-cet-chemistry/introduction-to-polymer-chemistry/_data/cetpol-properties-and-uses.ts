import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_AND_USES_NOTE: SubtopicNote = {
  subtopicName: "Properties and Applications of Polymers",
  title: "Properties and Applications of Polymers",
  oneLineDefinition:
    "Low-density polythene is branched, amorphous and made at 1000 to 2000 atm with an oxygen or peroxide initiator; high-density polythene is linear, crystalline and made at low pressure over a Ziegler–Natta catalyst; rubber is vulcanised with sulphur and an accelerator; and each commercial polymer has a household use the paper asks by name — PVC for pipes and floor tiles, polystyrene for disposable cups, polypropylene for straws, nylon 6 for tyre cords, nylon 6,6 for bristles and sutures, Teflon for oil seals, glyptal for paints.",
  whyItMatters:
    "26 PYQs, none HARD. Nineteen are uses — PVC (pipes, floor tiles), polystyrene (cups and plates, twice, and the carcinogen it leaches), polypropylene (straws), HDPE (toys), nylon 6 (tyre cords), nylon 6,6 (bristles, sutures), PAN (wool substitute, twice), dacron (terycot), glyptal (paints, twice), Teflon (oil seals), Buna-N (belts, shoe soles), perspex (LCD), melamine (dinner ware); seven are properties — the LDPE and HDPE statements (four times), what is NOT true of a thermoplastic or of natural rubber, and the vulcanisation accelerator. " +
    "Two cards.",
  concepts: [
    // 1 — LDPE vs HDPE, thermoplastics, vulcanisation
    {
      kind: "formula" as const,
      slug: "cetpol-ldpe-hdpe-and-vulcanisation",
      name: "LDPE against HDPE, and Vulcanisation",
      intuition:
        "Same monomer, two processes, two materials. Free-radical polymerisation of ethene at very high pressure (1000–2000 atm, 350–570 K, O₂ or peroxide initiator) lets chains branch: LOW-density polythene, amorphous, flexible, a poor conductor, moisture-resistant, made into films and bags and cable insulation. Ziegler–Natta catalysis at low pressure (6–7 atm, 333–343 K) gives unbranched chains that pack: HIGH-density polythene, crystalline, tougher, higher melting, made into buckets, bottles, toys, pipes. Rubber is made useful the same way steel is hardened: heating with sulphur (373–415 K) and an accelerator cross-links the chains — vulcanisation.",
      definition:
        "- **LDPE**: **branched**, amorphous (NOT crystalline), **1000–2000 atm**, 350–570 K, **O₂ or peroxide** initiator; flexible films, squeeze bottles, bags, insulation of cables. 'Needs low pressure' is the false statement.\n" +
        "- **HDPE**: **linear**, crystalline, **low pressure (6–7 atm)**, 333–343 K, **Ziegler–Natta** catalyst; harder, higher m.p. than LDPE; buckets, dustbins, bottles, pipes, **toys**. 'Needs 1000–2000 atm' is the false statement.\n" +
        "- **Thermoplastics**: soften on heating, moderately strong forces (between elastomers and fibres), easily moulded and remoulded — NOT extensively cross-linked.\n" +
        "- **Vulcanisation**: natural rubber + sulphur, 373–415 K, accelerator **zinc butyl xanthate** (or ZnO) → sulphur cross-links; harder, less tacky, elastic over a wider range.\n" +
        "- **Natural rubber**: addition polymer of isoprene, linear, cis C=C — not butadiene + styrene.",
      formula: {
        label: "Two polythenes",
        latex:
          "\\text{LDPE: } 10^3\\text{–}2\\times10^3\\ \\text{atm, O}_2/\\text{peroxide, branched};\\quad \\text{HDPE: } 6\\text{–}7\\ \\text{atm, Ziegler–Natta, linear}",
      },
      authoredExample: {
        prompt: "Two samples of polythene: one melts at 105 °C and is used for carrier bags, the other at 130 °C and is used for buckets. Assign LDPE/HDPE and give each one's catalyst or initiator.",
        steps: [
          "Lower melting, flexible film → LDPE, peroxide/O₂ at high pressure. Higher melting, rigid → HDPE, Ziegler–Natta at low pressure.",
        ],
        answer: "Bags = LDPE (O₂/peroxide); buckets = HDPE (Ziegler–Natta)",
      },
      selfCheckExample: {
        prompt: "Which is NOT true of HDPE: obtained from ethene; needs 1000–2000 atm; Ziegler–Natta catalyst; melts above LDPE?",
        steps: [
          "The high-pressure route is LDPE's.",
        ],
        answer: "Needs 1000–2000 atm",
      },
      practiceSet: [
        { prompt: "Property NOT shown by LDPE: crystalline / moisture-resistant / flexible films / poor conductor?", answer: "Crystalline" },
        { prompt: "Catalyst for HDPE?", answer: "Ziegler–Natta" },
        { prompt: "Accelerator used in vulcanisation?", answer: "Zinc butyl xanthate" },
        { prompt: "Use of HDPE: cable insulation, toys, extruded films, submarine cables?", answer: "Manufacture of toys" },
      ],
      pyqExampleId: "3424e5c6-06b8-4808-81dc-c14c4fcdcfeb",
      traps: [
        {
          title: "Reading '6–7 atm' as LDPE",
          body:
            "Low density needs HIGH pressure; the low-pressure Ziegler–Natta process gives the HIGH-density polymer. The paper plants each pressure under the wrong polymer.",
        },
      ],
    },

    // 2 — uses
    {
      kind: "reference" as const,
      slug: "cetpol-uses-by-polymer",
      name: "Which Polymer Makes Which Article",
      intuition:
        "Match the property to the job. Rigid and chemically inert: PVC for pipes and floor tiles, Teflon for oil seals and non-stick coatings. Cheap, light and foamable: polystyrene for disposable cups and plates and thermocol packaging (it can leach styrene, a suspected carcinogen, into food). Heat-resistant and stiff: polypropylene for straws and microwavable trays. Strong threads: nylon 6 for tyre cords, nylon 6,6 for bristles, sutures and ropes, dacron blended with cotton as terycot, PAN as synthetic wool. Oil-resistant rubber: Buna-N for belts, hoses, shoe soles. Hard thermosets: melamine dinner ware, bakelite switches. Clear: perspex for LCD screens and lenses. Coatings: glyptal for paints.",
      definition:
        "- **PVC**: water pipes, floor tiles, raincoats. **LDPE**: bags, films, cable insulation. **HDPE**: toys, buckets, bottles. **PP**: drinking straws, microwavable food trays. **PS**: disposable cups and plates, thermocol; leaches styrene (carcinogen).\n" +
        "- **Nylon 6**: tyre cords, fabrics. **Nylon 6,6**: bristles for brushes, surgical sutures, ropes, carpets. **PAN**: wool substitute (orlon). **Dacron**: terycot with cotton, fabrics.\n" +
        "- **Teflon**: oil seals, gaskets, non-stick cookware. **Buna-N**: rubber belts, hoses for gasoline, shoe soles. **Neoprene**: gasoline hose pipes, conveyor belts.\n" +
        "- **Glyptal**: paints and lacquers. **Perspex**: LCD screens, lenses, windows. **Polycarbonate**: bullet-proof glass, CDs. **Melamine-formaldehyde**: unbreakable dinner ware. **Bakelite**: electrical switches, handles. **Polyacrylamide**: electrophoresis gels.",
      table: {
        columns: ["Article", "Polymer", "Why"],
        rows: [
          { cells: ["Water pipes, floor tiles", "PVC", "Rigid, chemically resistant"] },
          { cells: ["Disposable cups and plates", "Polystyrene", "Cheap, foamable; leaches styrene"] },
          { cells: ["Drinking straws", "Polypropylene", "Rigid, heat-resistant"] },
          { cells: ["Toys, buckets", "HDPE", "Tough, crystalline"] },
          { cells: ["Tyre cords", "Nylon 6", "High tensile strength"], noteAmber: "Nylon 6 → tyre cords; nylon 6,6 → bristles and sutures." },
          { cells: ["Brush bristles, surgical sutures", "Nylon 6,6", "Stiff, strong polyamide"] },
          { cells: ["Wool substitute", "Polyacrylonitrile", "Soft, warm fibre"] },
          { cells: ["Terycot", "Dacron + cotton", "Wrinkle-free blend"] },
          { cells: ["Oil seals, gaskets", "Teflon", "Inert, low friction"] },
          { cells: ["Rubber belts, shoe soles", "Buna-N", "Oil- and abrasion-resistant"] },
          { cells: ["Paints", "Glyptal", "Alkyd resin"] },
          { cells: ["LCD screens", "Perspex", "Transparent PMMA"] },
          { cells: ["Plastic dinner ware", "Melamine-formaldehyde", "Hard thermoset"] },
        ],
        caption: "The two nylons split the jobs: 6 for tyre cords, 6,6 for bristles and sutures.",
      },
      selfCheckExample: {
        prompt: "Which polymer is used for tyre cords, and which for bristles of brushes?",
        steps: [
          "Nylon 6; nylon 6,6.",
        ],
        answer: "Nylon 6; nylon 6,6",
      },
      practiceSet: [
        { prompt: "Polymer for floor tiles?", answer: "PVC" },
        { prompt: "Polymer that leaches a human carcinogen into food?", answer: "Polystyrene (PS)" },
        { prompt: "Polymer used to obtain paints?", answer: "Glyptal" },
        { prompt: "Polymer for surgical sutures?", answer: "Nylon 6,6" },
      ],
      pyqExampleId: "b21f3050-4f12-4cfe-ab29-264f4d926c7c",
      traps: [
        {
          title: "Nylon 6 for bristles",
          body:
            "Both nylons are strong, but the paper's split is fixed: nylon 6 → tyre cords, nylon 6,6 → bristles and sutures. Swapping them is the standard wrong answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Classification — the force-based classes these uses follow from",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-classification",
    },
    {
      label: "Polymerisation Methods — the addition route both polythenes share",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-polymerisation-methods",
    },
  ],
};
