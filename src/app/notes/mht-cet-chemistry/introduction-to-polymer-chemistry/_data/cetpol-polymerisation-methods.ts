import type { SubtopicNote } from "@/app/notes/_types";

export const POLYMERISATION_METHODS_NOTE: SubtopicNote = {
  subtopicName: "Polymerization Methods",
  title: "Polymerisation Methods: Addition, Condensation, Ring-Opening",
  oneLineDefinition:
    "Addition (chain-growth) polymerisation joins C=C monomers with nothing lost, usually through a free radical from a peroxide initiator; condensation (step-growth) joins two functional groups with loss of a small molecule such as water; ring-opening polymerisation unrolls a cyclic monomer — caprolactam to nylon 6 — with nothing lost and no C=C.",
  whyItMatters:
    "9 PYQs, none HARD. Six ask which listed polymer is made by which method — Teflon and PAN by addition (Teflon from C₂F₄; PAN needs a peroxide initiator), nylon 6,6 and dacron by condensation, nylon 6 by ring-opening (three times, once from drawn structures); three are the 'NOT addition' and monomer-pair forms of the same question. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetpol-addition-condensation-ring-opening",
      name: "Which Method Makes Which Polymer",
      intuition:
        "Look at the monomer. A C=C monomer polymerises by ADDITION: a peroxide initiator makes a radical that opens double bond after double bond, nothing is lost, and the repeat unit has the monomer's formula (ethene → polythene, CF₂=CF₂ → Teflon, CH₂=CHCN → PAN, CH₂=CHCl → PVC, styrene → polystyrene). Two bifunctional monomers polymerise by CONDENSATION, losing water (or HCl) at every link: a diacid and a diamine give the polyamide nylon 6,6, a diacid and a diol the polyester dacron, phenol or urea with formaldehyde the resins. A cyclic amide simply opens: caprolactam → nylon 6 by RING-OPENING, no small molecule lost, though the paper's key files it under condensation.",
      definition:
        "- **Addition (chain-growth)**: monomer has C=C; free-radical mechanism, **peroxide (or O₂) initiator**; no by-product. Polythene, PVC, **Teflon (from C₂F₄)**, **polyacrylonitrile**, polystyrene, PMMA, natural and synthetic rubbers.\n" +
        "- **Condensation (step-growth)**: two functional groups per monomer, small molecule eliminated. **Nylon 6,6** (hexamethylenediamine + adipic acid, −H₂O), **dacron/terylene** (ethylene glycol + terephthalic acid — a dihydric alcohol + an aromatic dicarboxylic acid), glyptal, bakelite, urea- and melamine-formaldehyde, PHBV, polycarbonate.\n" +
        "- **Ring-opening**: **nylon 6** from caprolactam (a cyclic amide); no by-product. Asked as 'ring-opening' and keyed 'NOT addition'.\n" +
        "- Polyamide test for a monomer pair: an acid + an amine (or an amino acid) gives –CO–NH–; two hydroxy acids (3-hydroxybutanoic + 3-hydroxypentanoic) give a polyESTER, not a polyamide.\n" +
        "- Perylene/glyptal, nylons and bakelite need no initiator; a peroxide is the mark of an addition polymer.",
      formula: {
        label: "Addition versus condensation",
        latex:
          "n\\,\\text{CF}_2\\text{=CF}_2 \\xrightarrow{\\text{peroxide}} \\text{–(CF}_2\\text{–CF}_2\\text{)}_n\\text{–};\\qquad n\\,\\text{HOOC(CH}_2)_4\\text{COOH} + n\\,\\text{H}_2\\text{N(CH}_2)_6\\text{NH}_2 \\to \\text{nylon 6,6} + 2n\\,\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Classify the method for each: PMMA from methyl methacrylate; glyptal from ethylene glycol and phthalic acid; nylon 6 from caprolactam.",
        steps: [
          "Methyl methacrylate has C=C → addition. Diol + diacid lose water → condensation (polyester). Cyclic amide opens → ring-opening.",
        ],
        answer: "Addition; condensation; ring-opening",
      },
      selfCheckExample: {
        prompt: "Which polymer needs a peroxide initiator: nylon 6,6, polyacrylonitrile, perylene (glyptal), bakelite?",
        steps: [
          "Only the C=C monomer polymerises by free radicals.",
        ],
        answer: "Polyacrylonitrile",
      },
      practiceSet: [
        { prompt: "Polymer obtained from C₂F₄?", answer: "Teflon" },
        { prompt: "Made by ring-opening polymerisation: PAN, nylon 6,6, nylon 6, terylene?", answer: "Nylon 6" },
        { prompt: "Needs a dihydric alcohol and an aromatic dicarboxylic acid?", answer: "Dacron" },
        { prompt: "Pair that does NOT give a polyamide: glycine + ε-aminocaproic acid, or two 3-hydroxy acids?", answer: "The two hydroxy acids (they give PHBV, a polyester)" },
      ],
      pyqExampleId: "1cb38dd3-3a8f-442e-8543-fa70fc1c1eed",
      traps: [
        {
          title: "Nylon 6 as an addition polymer because nothing is lost",
          body:
            "No by-product, but no C=C either — caprolactam opens its ring. The paper classes nylon 6 with the condensation polymers and keys it as the one NOT made by addition.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Polymers and Monomers — the monomer pairs behind each condensation polymer",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-polymers-and-monomers",
    },
    {
      label: "Properties and Uses — LDPE and HDPE are the same addition polymer made two ways",
      href: "/notes/mht-cet-chemistry/introduction-to-polymer-chemistry/cetpol-properties-and-uses",
    },
  ],
};
