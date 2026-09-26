import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/aromatic-compounds";

export const TRANSFORMATIONS_NOTE: SubtopicNote = {
  subtopicName: "Side-Chain Reactions, Oxidation and Other Transformations",
  title: "Side-Chain Oxidation, Addition to Benzene, and Diazonium Chemistry",
  oneLineDefinition:
    "The reactions that do not substitute the ring: strong oxidants cut any alkyl side chain down to –COOH, chromyl chloride stops at –CHO, benzene adds Cl₂ or ozone under forcing conditions, and a diazonium salt or a Grignard reagent carries the ring into a new compound.",
  whyItMatters:
    "15 PYQs; the chapter's one HARD question is here. Eight are side-chain oxidation — KMnO₄, dilute HNO₃, chromyl chloride, CrO₃ on phenol; three are addition — ozonolysis to glyoxal and BHC; four are the other transformations — diazotisation, removing the diazo group, Wurtz–Fittig, a Grignard on a nitrile. " +
    "Three cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetarom-side-chain-oxidation",
      name: "Oxidising the Side Chain",
      intuition:
        "The ring survives oxidation; the side chain does not. Hot alkaline KMnO₄ (or dilute HNO₃) attacks the benzylic carbon and cuts off everything beyond it, so ethylbenzene, propylbenzene and cumene all end at benzoic acid. Chromyl chloride (the Étard reaction) is gentler and stops at the aldehyde.",
      definition:
        "- **Alk. KMnO₄, then H₃O⁺**: any side chain with a benzylic H → **C₆H₅COOH** (ethylbenzene, cumene).\n" +
        "- **Dilute HNO₃** also oxidises the side chain: ethylbenzene → **benzoic acid** (the paper's key).\n" +
        "- **Étard reaction**: toluene + **CrO₂Cl₂ in CS₂**, then H₃O⁺ → **benzaldehyde**.\n" +
        "- **Phenol + CrO₃** → **p-benzoquinone**.",
      table: {
        columns: ["Start", "Reagent", "Product"],
        rows: [
          { cells: ["Ethylbenzene", "i) alk. KMnO₄ ii) H₃O⁺", "**Benzoic acid**"], pyqExampleId: "b7942143-4213-4e47-a3ff-781029d3a9e8" },
          { cells: ["Cumene", "KMnO₄, KOH, Δ; then H₃O⁺", "**Benzoic acid**"], pyqExampleId: "a23e673b-6535-4da9-9a53-567fa0aab0bc" },
          { cells: ["Ethylbenzene", "Dilute HNO₃", "**Benzoic acid**"], pyqExampleId: "31ae720c-6295-4aeb-bb1b-282d390d6157" },
          { cells: ["Toluene", "CrO₂Cl₂ / CS₂; then H₃O⁺", "**Benzaldehyde**"], pyqExampleId: "124a38c4-4c0d-4492-88be-ef842915242f" },
          { cells: ["Phenol", "CrO₃", "**p-Benzoquinone**"], pyqExampleId: "7d3fa448-df54-406a-8c43-08023d7566ec" },
        ],
      },
      selfCheckExample: {
        prompt: "C₆H₅–CH₂–CH₃ with (i) alkaline KMnO₄ (ii) H₃O⁺ gives?",
        steps: ["The whole side chain is cut down to one –COOH on the ring."],
        answer: "C₆H₅COOH",
      },
      practiceSet: [
        { prompt: "Toluene + chromyl chloride in CS₂, then acid hydrolysis?", answer: "Benzaldehyde" },
        { prompt: "Cumene with hot alkaline KMnO₄ then acid?", answer: "Benzoic acid" },
      ],
      pyqExampleId: "dc59f0a1-3a61-46d7-b5fc-448a1c4e5466",
      traps: [
        {
          title: "Keeping the side-chain carbons",
          body: "C₆H₅CH₂COOH and longer acids are offered because they keep the chain length. KMnO₄ keeps only the benzylic carbon: the product is always C₆H₅COOH.",
        },
        {
          title: "Benzal chloride from chromyl chloride",
          body: "The Étard complex is hydrolysed to the aldehyde. Benzal chloride, C₆H₅CHCl₂, comes from chlorinating toluene's side chain in light — a different reaction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetarom-addition-ozonolysis",
      name: "Addition to Benzene: Ozonolysis and BHC",
      intuition:
        "Benzene resists addition, but under forcing conditions it adds three molecules at once: three O₃ give a triozonide, and three Cl₂ in UV light give benzene hexachloride. Each C=C of the Kekulé structure is cut or saturated.",
      definition:
        "- **Ozonolysis**: benzene + excess O₃ → **benzene triozonide**; **Zn/H₂O** → **3 glyoxal** (OHC–CHO) + H₂O₂. Zn is there to destroy the H₂O₂ so the aldehyde is not oxidised.\n" +
        "- **BHC**: benzene + 3Cl₂ in UV light → **C₆H₆Cl₆** (benzene hexachloride). Its γ-isomer is **gammexane (lindane)**, an **insecticide**.",
      table: {
        columns: ["Reaction", "Product"],
        rows: [
          { cells: ["Benzene triozonide + Zn/H₂O", "**Glyoxal**"], pyqExampleId: "21a25ee5-74ed-482d-b8ef-07c0a482a0a2" },
          { cells: ["Reagent that converts the triozonide to glyoxal", "**Zn + H₂O**"], pyqExampleId: "24b3c0c3-4a37-4e57-afec-3bcaa6fac8c3" },
          { cells: ["Benzene + Cl₂, UV", "BHC; γ-isomer = **gammexane**"], pyqExampleId: "9a8c86b2-a6ee-408b-98e4-08b484317af2" },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about gammexane is true: an isomer of BHC; a herbicide; made by bromination; a monochloro benzene?",
        steps: ["It is γ-C₆H₆Cl₆, made by chlorine addition, and used as an insecticide."],
        answer: "It is an isomer of BHC",
      },
      pyqExampleId: "21a25ee5-74ed-482d-b8ef-07c0a482a0a2",
      traps: [
        {
          title: "Gammexane as a herbicide",
          body: "Gammexane kills insects, not weeds — it is an insecticide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetarom-diazonium-and-coupling",
      name: "Diazonium Salts, Wurtz–Fittig and a Grignard on a Nitrile",
      intuition:
        "These carry the ring into a new compound. Aniline becomes a diazonium salt at 0–5 °C, and the –N₂⁺ can then be replaced — by H, using a mild reducing agent. Sodium couples an aryl halide with an alkyl halide. A Grignard reagent adds to a C≡N to give an imine that hydrolyses to a ketone.",
      definition:
        "- **Diazotisation**: aniline + **NaNO₂ + HCl, 0–5 °C** → **benzene diazonium chloride**.\n" +
        "- **Removing –N₂⁺**: C₆H₅N₂Cl + **CH₃CH₂OH** (or H₃PO₂) → **benzene**.\n" +
        "- **Wurtz–Fittig**: **aryl halide + alkyl halide + Na** (dry ether) → alkylbenzene. Two aryl halides = Fittig; two alkyl halides = Wurtz.\n" +
        "- **Nitrile + Grignard**: C₆H₅CN + C₆H₅MgBr → imine salt; **H₃O⁺** → **benzophenone**, C₆H₅COC₆H₅.",
      table: {
        columns: ["Reaction", "Product or reagent"],
        rows: [
          { cells: ["Aniline + NaNO₂/HCl, cold", "**Benzene diazonium chloride**"], pyqExampleId: "a356e8c4-12db-46a9-a028-e5c23ca632f8" },
          { cells: ["C₆H₅N₂Cl + R → benzene", "R = **ethanol** (paper's key)"], pyqExampleId: "e8e20455-df5d-4e0f-92df-85fd88d484d8", noteAmber: "H₃PO₂/H₂O does the same job; the paper keys ethanol." },
          { cells: ["Wurtz–Fittig", "**Aryl + alkyl halide with Na**"], pyqExampleId: "33c4aa7a-f094-4f8d-a67b-ab671bece65c" },
          { cells: ["Benzonitrile + C₆H₅MgBr, then H₃O⁺", "**Benzophenone**"], pyqExampleId: "d8abb9c7-5b6e-4991-af86-8b44740e3ed9" },
        ],
      },
      selfCheckExample: {
        prompt: "Benzonitrile with phenylmagnesium bromide in dry ether, then H₃O⁺. Product B?",
        steps: [
          "C₆H₅MgBr adds across C≡N: C₆H₅C(=NMgBr)C₆H₅.",
          "Acid hydrolyses the imine to C=O.",
        ],
        answer: "Benzophenone",
      },
      pyqExampleId: "d8abb9c7-5b6e-4991-af86-8b44740e3ed9",
      traps: [
        {
          title: "Stopping at the aldehyde",
          body: "The Grignard adds a SECOND carbon group to the nitrile carbon, so the product is a ketone. Benzaldehyde would need a hydride, not C₆H₅MgBr.",
        },
      ],
    },
  ],
  related: [
    { label: "Substitution on the ring", href: `${BASE}/cetarom-eas` },
  ],
};
