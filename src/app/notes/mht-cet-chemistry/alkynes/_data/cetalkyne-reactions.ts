import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkynes";

export const REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Alkynes",
  title: "Making Alkynes, Partial Hydrogenation, and Adding a Carbon",
  oneLineDefinition:
    "An alkyne is made by removing two HX from a dihalide, lengthened by alkylating its acetylide, and reduced to a cis-alkene over Lindlar's catalyst; a cyanide adds one carbon to an alkyl halide in the same spirit.",
  whyItMatters:
    "7 PYQs, all but one MODERATE. Three are elimination and acetylide sequences, two are Lindlar's catalyst, and two are the KCN-then-reduce route to an amine. " +
    "Three cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetalkyne-preparation-acetylide",
      name: "Double Dehydrohalogenation and Acetylide Alkylation",
      intuition:
        "Removing HX twice turns a C–C single bond into a triple bond: alcoholic KOH takes the first HX, and the stronger base sodamide takes the second. A terminal alkyne's H is weakly acidic, so a strong base removes it and the acetylide attacks an alkyl halide, adding carbons to the chain.",
      definition:
        "- **Vicinal or geminal dihalide + alc. KOH** → vinyl halide; **+ NaNH₂** → **alkyne**. 1,2-dibromoethane → **ethyne**.\n" +
        "- **Addition runs backwards too**: HC≡CH + 2HBr → CH₃CHBr₂; alc. KOH then NaNH₂ give **ethyne** back.\n" +
        "- **Acetylide**: HC≡CH + LiNH₂ → HC≡C⁻Li⁺; + CH₃CH₂Br → **but-1-yne**.",
      table: {
        columns: ["Sequence", "Product"],
        rows: [
          { cells: ["1,2-Dibromoethane → alc. KOH → A → NaNH₂ → B", "B = **ethyne**"], pyqExampleId: "f2bd9498-1bc0-42db-ab0c-cbc5301e74b1" },
          { cells: ["A → LiNH₂ → ethynyl lithium → C₂H₅Br → but-1-yne", "A = **ethyne**"], pyqExampleId: "484d2880-23f6-4ab0-8bd1-245f44776bc6" },
          { cells: ["HC≡CH → HBr → HBr → alc. KOH → NaNH₂ → D", "D = **ethyne**"], pyqExampleId: "6f1e632a-3fea-4b99-9737-d9771945c216" },
        ],
      },
      selfCheckExample: {
        prompt: "What must A be if A with lithium amide gives ethynyl lithium, which with bromoethane gives but-1-yne?",
        steps: ["Ethynyl lithium is HC≡C⁻Li⁺, so A had the H that LiNH₂ removed.", "2 + 2 carbons make but-1-yne."],
        answer: "Ethyne",
      },
      pyqExampleId: "f2bd9498-1bc0-42db-ab0c-cbc5301e74b1",
      traps: [
        {
          title: "Reading hydration into a sequence that has no water",
          body: "Ethyne → ethanal needs H₂O with Hg²⁺/H₂SO₄. The 2021 sequence is HBr, HBr, alcoholic KOH, NaNH₂ — add two HBr and take them off again, and you are back at ethyne (the official key).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetalkyne-lindlar",
      name: "Partial Hydrogenation to a cis-Alkene",
      intuition:
        "An ordinary catalyst would hydrogenate all the way to the alkane. Lindlar's catalyst is poisoned so it stops at the alkene, and both H atoms are delivered from the metal surface on the same side — cis.",
      definition:
        "- **Lindlar's catalyst**: **Pd–C (or Pd/CaCO₃) poisoned with quinoline** → **cis-alkene**.\n" +
        "- **Na / liquid NH₃** → **trans**-alkene.\n" +
        "- Pt, Pd or Ni with excess H₂ → alkane.",
      table: {
        columns: ["Reagent", "Product from R–C≡C–R"],
        rows: [
          { cells: ["**Pd–C / quinoline** (Lindlar)", "**cis**-alkene"], pyqExampleId: "59e1c049-d0df-4989-b147-463157598382" },
          { cells: ["Na / liquid NH₃", "trans-alkene"], pyqExampleId: "c9a36d9c-d664-415e-b0a7-20216cd98834" },
          { cells: ["Ni or Pt, excess H₂", "Alkane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which reagent converts C≡C into the cis alkene: ZnCl₂/HCl, Pd–C/quinoline, Na/liquid NH₃, Na/Hg in water?",
        steps: ["Lindlar's catalyst gives cis; sodium in ammonia gives trans."],
        answer: "Pd–C / quinoline",
      },
      pyqExampleId: "c9a36d9c-d664-415e-b0a7-20216cd98834",
      traps: [
        {
          title: "Na in liquid ammonia",
          body: "It stops at the alkene too, but it gives the TRANS isomer. Cis needs Lindlar's catalyst.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetalkyne-nitrile-step-up",
      name: "Adding One Carbon with Cyanide",
      intuition:
        "Cyanide substitutes a halide and brings its carbon with it, so CH₃X becomes CH₃CN. Reducing the C≡N with sodium in ethanol gives a primary amine one carbon longer than the halide — ethylamine from a methyl halide.",
      definition:
        "- **CH₃X + KCN → CH₃CN** (ethanenitrile).\n" +
        "- **Na / C₂H₅OH** (Mendius reduction) → **CH₃CH₂NH₂**.",
      table: {
        columns: ["Sequence", "B"],
        rows: [
          { cells: ["CH₃I + KCN → A; A + Na/C₂H₅OH → B", "**CH₃CH₂NH₂**"], pyqExampleId: "99bb5f81-3088-4efe-9818-4867c4d79f0b" },
          { cells: ["CH₃Br → KCN → A → Na/C₂H₅OH → B", "**CH₃CH₂NH₂**"], pyqExampleId: "2a4269dc-7292-4acc-8a41-44f4d6b89839" },
        ],
      },
      selfCheckExample: {
        prompt: "CH₃Br → (KCN) A → (Na, C₂H₅OH) B. How many carbons does B have?",
        steps: ["CN adds one carbon; reduction keeps it."],
        answer: "Two — ethylamine",
      },
      pyqExampleId: "99bb5f81-3088-4efe-9818-4867c4d79f0b",
    },
  ],
  related: [
    { label: "Haloalkynes and hybridisation", href: `${BASE}/cetalkyne-structure` },
    { label: "Amines — reduction of nitriles", href: "/notes/mht-cet-chemistry/amines" },
  ],
};
