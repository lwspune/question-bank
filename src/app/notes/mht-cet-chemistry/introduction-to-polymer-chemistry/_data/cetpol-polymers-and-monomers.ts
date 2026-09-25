import type { SubtopicNote } from "@/app/notes/_types";

export const POLYMERS_AND_MONOMERS_NOTE: SubtopicNote = {
  subtopicName: "Polymers and Their Monomers",
  title: "Polymers and Their Monomers",
  oneLineDefinition:
    "Every named polymer is one or two monomers: isoprene for natural rubber, chloroprene for neoprene, butadiene with styrene for Buna-S and with acrylonitrile for Buna-N, acrylonitrile for PAN, styrene for thermocol, methyl methacrylate for perspex, adipic acid with hexamethylenediamine for nylon 6,6, caprolactam for nylon 6, ethylene glycol with terephthalic acid for dacron and with phthalic acid for glyptal, two 3-hydroxy acids for PHBV, phenol or urea with formaldehyde for the resins — and the linkage between them (amide, ester, or plain C–C) is what the paper asks next.",
  whyItMatters:
    "29 PYQs, one HARD. Nineteen are straight monomer lookups — Buna-S, Buna-N, PAN (the wool substitute), thermocol (twice), natural rubber (twice), neoprene, novolac, dacron (three times), glyptal, PHBV (three times), nylon salt, nylon 2-nylon 6; ten are the linkage — which polymer carries –CO–NH– (urea-formaldehyde, keyed twice), which is the polyamide, which monomer pair does not give one, which carries an ester (PHBV), which carries neither (thermocol), the neoprene and natural-rubber statement questions, and the HARD cellulose-xanthate formula. " +
    "Two cards.",
  concepts: [
    // 1 — the lookup table
    {
      kind: "reference" as const,
      slug: "cetpol-monomer-lookup",
      name: "Polymer to Monomer: the Table the Paper Draws From",
      intuition:
        "Group the monomers by family and the table is half memorised. The DIENE rubbers: isoprene (2-methylbuta-1,3-diene) gives natural rubber, chloroprene (2-chlorobuta-1,3-diene) gives neoprene, and buta-1,3-diene copolymerised with styrene gives Buna-S, with acrylonitrile Buna-N. The VINYL plastics: one substituted ethene each — vinyl chloride, styrene (thermocol), acrylonitrile (PAN, orlon), tetrafluoroethene (Teflon), methyl methacrylate (perspex), acrylamide. The CONDENSATION pairs: an acid with an amine (nylon 6,6, nylon 2-nylon 6), an acid with a diol (dacron, glyptal), hydroxy acids with themselves (PHBV), formaldehyde with phenol, urea or melamine.",
      definition:
        "- **Rubbers**: natural rubber ← isoprene (cis-1,4); neoprene ← chloroprene (a homopolymer — 'copolymer in presence of MgO' is the false statement); Buna-S ← buta-1,3-diene + styrene; Buna-N ← buta-1,3-diene + acrylonitrile.\n" +
        "- **Vinyl addition polymers**: PVC ← vinyl chloride; thermocol/polystyrene ← styrene; PAN (orlon, wool substitute) ← acrylonitrile CH₂=CHCN; Teflon ← CF₂=CF₂; perspex (PMMA, acrylic glass) ← methyl methacrylate; polyacrylamide ← acrylamide.\n" +
        "- **Polyamides**: nylon 6,6 ← adipic acid + hexamethylenediamine (the **nylon salt**); nylon 6 ← caprolactam; nylon 2-nylon 6 ← glycine + ε-aminocaproic acid.\n" +
        "- **Polyesters**: dacron/terylene ← ethylene glycol + terephthalic acid; glyptal ← ethylene glycol + phthalic acid; PHBV ← 3-hydroxybutanoic acid + 3-hydroxypentanoic acid.\n" +
        "- **Formaldehyde resins**: novolac/bakelite ← phenol + HCHO; urea-formaldehyde; melamine-formaldehyde. **Polycarbonate** ← bisphenol A + diphenyl carbonate (or phosgene).",
      table: {
        columns: ["Polymer", "Monomer(s)", "Type"],
        rows: [
          { cells: ["Natural rubber", "Isoprene (2-methylbuta-1,3-diene)", "Addition, homo"] },
          { cells: ["Neoprene", "Chloroprene (2-chlorobuta-1,3-diene)", "Addition, homo"], noteAmber: "A homopolymer — the 'copolymer' statement about it is the false one." },
          { cells: ["Buna-S / Buna-N", "Buta-1,3-diene + styrene / + acrylonitrile", "Addition, co"] },
          { cells: ["PAN (orlon)", "Acrylonitrile CH₂=CHCN", "Addition, homo — wool substitute"] },
          { cells: ["Thermocol", "Styrene", "Addition, homo"] },
          { cells: ["Perspex (PMMA)", "Methyl methacrylate", "Addition, homo"] },
          { cells: ["Teflon", "Tetrafluoroethene CF₂=CF₂", "Addition, homo"] },
          { cells: ["Nylon 6,6", "Adipic acid + hexamethylenediamine", "Condensation, polyamide"] },
          { cells: ["Nylon 6", "Caprolactam", "Ring-opening, polyamide"] },
          { cells: ["Nylon 2-nylon 6", "Glycine + ε-aminocaproic acid", "Condensation, biodegradable polyamide"] },
          { cells: ["Dacron / terylene", "Ethylene glycol + terephthalic acid", "Condensation, polyester"], noteAmber: "Phthalic acid instead of terephthalic gives glyptal." },
          { cells: ["Glyptal", "Ethylene glycol + phthalic acid", "Condensation, polyester"] },
          { cells: ["PHBV", "3-Hydroxybutanoic + 3-hydroxypentanoic acid", "Condensation, biodegradable polyester"] },
          { cells: ["Novolac / bakelite", "Phenol + formaldehyde", "Condensation resin"] },
        ],
        caption: "Terephthalic (1,4) acid → dacron; phthalic (1,2) acid → glyptal.",
      },
      selfCheckExample: {
        prompt: "Name the monomers of PHBV and of nylon 2-nylon 6, and say which linkage each polymer carries.",
        steps: [
          "PHBV: 3-hydroxybutanoic + 3-hydroxypentanoic acid — ester links. Nylon 2-nylon 6: glycine + ε-aminocaproic acid — amide links.",
        ],
        answer: "Two 3-hydroxy acids, polyester; glycine + ε-aminocaproic acid, polyamide",
      },
      practiceSet: [
        { prompt: "Monomer of neoprene?", answer: "2-Chlorobuta-1,3-diene (chloroprene)" },
        { prompt: "Monomer whose polymer resembles wool?", answer: "Acrylonitrile, CH₂=CHCN" },
        { prompt: "Compounds that form nylon salt?", answer: "Adipic acid + hexamethylenediamine" },
        { prompt: "Monomers of glyptal?", answer: "Ethylene glycol + phthalic acid" },
      ],
      pyqExampleId: "99439c88-552a-4744-86e6-225e870a8538",
      traps: [
        {
          title: "Terephthalic acid for glyptal",
          body:
            "Both are ethylene-glycol polyesters; the para acid (terephthalic) gives dacron, the ortho acid (phthalic) gives glyptal. The options always offer both acids.",
        },
      ],
    },

    // 2 — linkages and structures
    {
      kind: "formula" as const,
      slug: "cetpol-linkages-and-repeat-units",
      name: "The Linkage in the Repeat Unit: Amide, Ester or None",
      intuition:
        "Read the repeat unit for the bond that joins monomers. –CO–NH– means a POLYAMIDE: the nylons, urea-formaldehyde resin (–NH–CO–NH–CH₂–), and polyacrylamide carries the amide as a side group. –COO– means a POLYESTER: dacron, glyptal, PHBV, and perspex has the ester as a side group. A pure carbon backbone with no heteroatom link is an addition polymer: thermocol, polythene, PVC, Teflon; PAN's side group is a nitrile, not an amide. Two structures the paper asks by formula: cellulose xanthate (Cell–O–CS–S⁻Na⁺, the viscose intermediate) and natural rubber, a linear cis-polyisoprene made by addition.",
      definition:
        "- **–CO–NH– (amide)**: nylon 6 –[NH(CH₂)₅CO]–, nylon 6,6 –[CO(CH₂)₄CO–NH(CH₂)₆NH]–, nylon 2-nylon 6, **urea-formaldehyde** –[NH–CO–NH–CH₂]–, polyacrylamide –[CH₂–CH(CONH₂)]– (side-chain amide).\n" +
        "- **–COO– (ester)**: dacron, glyptal, **PHBV**, perspex –[CH₂–C(CH₃)(COOCH₃)]– (side-chain ester).\n" +
        "- **Neither**: thermocol –[CH₂–CH(C₆H₅)]–, polythene, PVC, Teflon; PAN –[CH₂–CH(CN)]– has no amide despite the N.\n" +
        "- **Cellulose xanthate**: Cell–OH + CS₂ + NaOH → **Cell–O–CS–S⁻Na⁺** (viscose; regenerated as rayon in acid).\n" +
        "- **Natural rubber**: linear, addition polymer of isoprene, **cis** C=C, soft and tacky until vulcanised. NOT butadiene + styrene (that is SBR).",
      formula: {
        label: "Three repeat units",
        latex:
          "\\text{nylon 6: } \\text{–[NH(CH}_2)_5\\text{CO]}_n\\text{–};\\quad \\text{urea-formaldehyde: } \\text{–[NH–CO–NH–CH}_2]_n\\text{–};\\quad \\text{thermocol: } \\text{–[CH}_2\\text{–CH(C}_6\\text{H}_5)]_n\\text{–}",
      },
      authoredExample: {
        prompt: "A polymer's repeat unit is –[O–CH(CH₃)–CH₂–CO]–. Name the linkage, the monomer and the class of polymer.",
        steps: [
          "O–C(=O) within the chain is an ester; the monomer is 3-hydroxybutanoic acid; a polyester (the butyrate half of PHBV), biodegradable.",
        ],
        answer: "Ester; 3-hydroxybutanoic acid; polyester",
      },
      selfCheckExample: {
        prompt: "Which contains neither –COO– nor –CO–NH–: perspex, polyacrylamide, glyptal, thermocol?",
        steps: [
          "Perspex has a side ester, polyacrylamide a side amide, glyptal chain esters; polystyrene is all carbon.",
        ],
        answer: "Thermocol",
      },
      practiceSet: [
        { prompt: "Contains –CO–NH–: glyptal, thermocol, Buna-N, urea-formaldehyde resin?", answer: "Urea-formaldehyde resin" },
        { prompt: "Contains an ester linkage: nylon 6, PAN, Teflon, PHBV?", answer: "PHBV" },
        { prompt: "Formula of cellulose xanthate (Cell–OH = cellulose)?", answer: "Cell–O–CS–S⁻Na⁺" },
        { prompt: "NOT true of natural rubber: addition polymer / linear / cis C=C / made of butadiene + styrene?", answer: "Made of butadiene + styrene" },
      ],
      pyqExampleId: "df3b1783-45d2-4cb8-88d2-7abbce7bb5f2",
      traps: [
        {
          title: "PAN as a polyamide",
          body:
            "The nitrogen in polyacrylonitrile is a nitrile, –C≡N; there is no carbonyl beside it. Among PAN, nylon 6, nylon 6,6 and nylon 2,6 it is the one WITHOUT the amide linkage.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Classification — homopolymer or copolymer follows from the monomer count",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-classification",
    },
    {
      label: "Amines and Biomolecules — the amide bond elsewhere",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-amino-acids-and-proteins",
    },
  ],
};
