import type { SubtopicNote } from "@/app/notes/_types";

export const DIAZONIUM_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Diazonium Salts and Aromatic Amine Reactions",
  title: "Diazonium Salts and Aromatic Amine Reactions",
  oneLineDefinition:
    "Aniline with NaNO₂ and HCl at 273–278 K gives benzenediazonium chloride, whose N₂⁺ is replaced by OH (warm water), Cl or Br or CN (Sandmeyer, Cu(I) salts), F (Balz–Schiemann, HBF₄), I (KI) or H (ethanol or H₃PO₂) — and which couples with phenol in mild alkali to give the azo dye p-hydroxyazobenzene.",
  whyItMatters:
    "13 PYQs, none HARD. Ten are diazotisation and replacement — the reagent, the diazonium salt as A and phenol as B in the same two-step sequence four times, Sandmeyer's reagent and what it cannot make (iodobenzene), fluoroboric acid giving Ar–F, ethanol giving benzene; three are azo coupling — which reaction it is, what it makes, and the mild alkaline medium it needs. " +
    "Two cards.",
  concepts: [
    // 1 — diazotisation and replacement
    {
      kind: "formula" as const,
      slug: "cetam-diazotisation-and-replacement",
      name: "Diazotisation and the Replacement Reactions of the Diazonium Ion",
      intuition:
        "Nitrous acid, made in place from NaNO₂ and HCl in ice, turns a primary aromatic amine into a diazonium salt that is stable only cold. Its N₂⁺ is the best leaving group there is, so almost anything replaces it: water gives phenol, Cu(I) halides or cyanide give the halo- or cyanoarene (Sandmeyer), KI gives the iodide without copper, HBF₄ then heat gives the fluoride (Balz–Schiemann), and ethanol or hypophosphorous acid simply give benzene.",
      definition:
        "- **Diazotisation**: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{NaNO}_2 + \\text{HCl},\\ 273\\text{ K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-\\) (A). Reagent = NaNO₂ + HCl at low temperature.\n" +
        "- \\(+ \\text{H}_2\\text{O}, \\Delta\\) → **phenol** (B) + N₂ + HCl. Benzene → nitrobenzene → aniline → diazonium → phenol is the standard four-step chain (C = phenol).\n" +
        "- **Sandmeyer**: CuCl/HCl → chlorobenzene; CuBr/HBr → bromobenzene; **CuCN/KCN** → benzonitrile. NOT iodobenzene (use KI, no copper) and NOT fluorobenzene.\n" +
        "- **Balz–Schiemann**: \\(\\text{ArN}_2^+\\text{BF}_4^- \\xrightarrow{\\Delta} \\text{Ar-F}\\) + BF₃ + N₂ — fluoroboric acid gives **Ar–F**.\n" +
        "- Reduction: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_2\\text{H}_5\\text{OH} \\to \\text{C}_6\\text{H}_6 + \\text{CH}_3\\text{CHO} + \\text{N}_2 + \\text{HCl}\\) (A = benzene); H₃PO₂ does the same.",
      formula: {
        label: "Diazotisation and hydrolysis",
        latex:
          "\\text{ArNH}_2 \\xrightarrow{\\text{NaNO}_2/\\text{HCl},\\ 273\\text{ K}} \\text{ArN}_2^+\\text{Cl}^- \\xrightarrow{\\text{H}_2\\text{O},\\ \\Delta} \\text{ArOH} + \\text{N}_2 + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Convert aniline into (i) iodobenzene, (ii) fluorobenzene and (iii) benzonitrile, naming the reagent after diazotisation in each case.",
        steps: [
          "(i) KI. (ii) HBF₄ then heat (Balz–Schiemann). (iii) CuCN/KCN (Sandmeyer).",
        ],
        answer: "KI; HBF₄, Δ; CuCN/KCN",
      },
      selfCheckExample: {
        prompt: "Aniline → (NaNO₂ + HCl, 273 K) A → (H₂O, Δ) B + N₂. Name A and B, and say what A gives with ethanol instead.",
        steps: [
          "A = benzenediazonium chloride; B = phenol. With ethanol the diazonium group is replaced by H: benzene (and acetaldehyde).",
        ],
        answer: "Benzenediazonium chloride; phenol; benzene",
      },
      practiceSet: [
        { prompt: "Reagent for aniline → diazonium salt?", answer: "NaNO₂ + HCl, 273–278 K" },
        { prompt: "Product B: aniline → (NaNO₂/HCl) A → (H₂O, Δ) B?", answer: "Phenol" },
        { prompt: "Arenediazonium chloride + HBF₄, then heat, gives?", answer: "Ar–F" },
        { prompt: "NOT made by Sandmeyer: chlorobenzene, bromobenzene, benzonitrile, iodobenzene?", answer: "Iodobenzene" },
      ],
      pyqExampleId: "d9fed875-6ef1-4bf9-b6fd-1efc3b310267",
      traps: [
        {
          title: "Stopping at the diazonium salt",
          body:
            "The salt is A, the intermediate. When the sequence continues with warm water, B is PHENOL — 'benzenediazonium chloride' is offered as option (c) for B every time.",
        },
      ],
    },

    // 2 — azo coupling
    {
      kind: "formula" as const,
      slug: "cetam-azo-coupling",
      name: "Azo Coupling: Diazonium Ion Plus Phenol or Aniline",
      intuition:
        "The diazonium ion is a weak electrophile, so it attacks only a strongly activated ring — phenol (as phenoxide, in mild alkali) or aniline (in mild acid) — at the para position, keeping both nitrogens as an azo bridge –N=N–. The products are coloured: p-hydroxyazobenzene (orange) from phenol, p-aminoazobenzene (yellow) from aniline. Too much acid protonates the phenoxide; too much base turns the diazonium ion into a diazotate. Mild alkali is the medium.",
      definition:
        "- \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{OH}^-,\\ 273\\text{–}278\\text{ K}} \\text{C}_6\\text{H}_5\\text{-N=N-C}_6\\text{H}_4\\text{-OH}\\) (**p-hydroxyazobenzene**, orange) — this reaction IS azo coupling.\n" +
        "- With aniline in mildly acidic solution: p-aminoazobenzene (yellow).\n" +
        "- Medium for the phenol coupling: **mild alkaline** (converts phenol to the more reactive phenoxide); not strongly acidic, not alcoholic.\n" +
        "- Not azo coupling: aniline + HNO₂ (diazotisation), diazonium + HBF₄ (Balz–Schiemann), diazonium + Cu/HCl (Gattermann).",
      formula: {
        label: "Azo coupling",
        latex:
          "\\text{ArN}_2^+ + \\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{OH}^-} \\text{Ar-N=N-C}_6\\text{H}_4\\text{-OH}\\ (p)",
      },
      authoredExample: {
        prompt: "Write the product of benzenediazonium chloride with N,N-dimethylaniline in mildly acidic solution, and explain why strong acid stops the reaction.",
        steps: [
          "p-Dimethylaminoazobenzene (butter yellow), \\(\\text{C}_6\\text{H}_5\\text{N=NC}_6\\text{H}_4\\text{N(CH}_3)_2\\). Strong acid protonates the amine nitrogen, which deactivates the ring the electrophile needs.",
        ],
        answer: "p-Dimethylaminoazobenzene; the protonated amine no longer activates the ring",
      },
      selfCheckExample: {
        prompt: "Which compound is made by azo coupling: benzenediazonium chloride, fluoroarene, p-hydroxyazobenzene, N-ethylbenzenesulphonamide?",
        steps: [
          "The azo dye from diazonium + phenol.",
        ],
        answer: "p-Hydroxyazobenzene",
      },
      practiceSet: [
        { prompt: "Medium for diazonium + phenol → p-hydroxyazobenzene?", answer: "Mild alkaline" },
        { prompt: "Which is azo coupling: ArN₂Cl + HBF₄, or ArN₂Cl + C₆H₅OH/OH⁻?", answer: "ArN₂Cl + C₆H₅OH in OH⁻" },
        { prompt: "Product of benzenediazonium chloride with phenol?", answer: "p-Hydroxyazobenzene" },
        { prompt: "Colour of p-hydroxyazobenzene?", answer: "Orange" },
      ],
      pyqExampleId: "ceb9a6e6-e3b5-4037-b60f-04689cba76a2",
      traps: [
        {
          title: "Coupling in strong acid",
          body:
            "Strongly acidic medium keeps phenol as phenol, too weak a nucleophile for the diazonium ion; strongly basic medium destroys the diazonium ion. The window is mild alkali for phenol, mild acid for aniline.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Phenols — the Dow and diazonium routes to phenol",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-phenols",
    },
    {
      label: "Halogen Derivatives — Sandmeyer as a route to haloarenes",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-elimination-and-haloarenes",
    },
  ],
};
