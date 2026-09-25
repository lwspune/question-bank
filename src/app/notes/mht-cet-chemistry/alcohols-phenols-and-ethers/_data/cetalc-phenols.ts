import type { SubtopicNote } from "@/app/notes/_types";

export const PHENOLS_NOTE: SubtopicNote = {
  subtopicName: "Phenols, Preparation and Reactions",
  title: "Phenols: Preparation and Reactions",
  oneLineDefinition:
    "Phenol is made industrially from cumene (air oxidation, then acid) and from chlorobenzene (Dow); its ring is so activated by OH that bromine water gives 2,4,6-tribromophenol and mixed acid gives picric acid, while the phenoxide gives salicylic acid with CO₂ (Kolbe) and salicylaldehyde with chloroform (Reimer–Tiemann).",
  whyItMatters:
    "26 PYQs, 2 HARD. Eight are ring substitution — the reagent for picric acid (mixed acid), dilute HNO₃ giving the o/p mixture, bromine water giving the tribromo product; ten are named reactions — Kolbe's substrate and product, Reimer–Tiemann's reagent, CrO₃ to p-benzoquinone, zinc dust to benzene, H₂/Ni to cyclohexanol; five are the cumene and Dow preparations; three are natural phenols — gallic acid, eugenol, the phloroglucinol drawing. " +
    "Four cards.",
  concepts: [
    // 1 — preparation
    {
      kind: "formula" as const,
      slug: "cetalc-phenol-preparation",
      name: "Making Phenol: Cumene and Dow",
      intuition:
        "Two routes, both from benzene derivatives. Cumene (isopropylbenzene) is oxidised by air with cobalt naphthenate to cumene hydroperoxide, which dilute acid splits into phenol AND acetone. Chlorobenzene with fused NaOH at 623 K and 300 atm gives sodium phenoxide through a phenoxide-ion intermediate; acid then frees phenol.",
      definition:
        "- **Cumene process**: \\(\\text{C}_6\\text{H}_5\\text{CH(CH}_3)_2 \\xrightarrow{\\text{O}_2,\\ \\text{Co-naphthenate},\\ 423\\text{ K}} \\text{cumene hydroperoxide} \\xrightarrow{\\text{dil. HCl}} \\text{C}_6\\text{H}_5\\text{OH} + \\text{CH}_3\\text{COCH}_3\\). Substrate X = isopropylbenzene; product = phenol + acetone (not phenol + CO₂).\n" +
        "- Cumene with \\(\\text{KMnO}_4/\\text{KOH}\\) instead gives potassium benzoate → **benzoic acid** on acidification (side-chain oxidation, not phenol).\n" +
        "- **Dow process**: chlorobenzene + NaOH, 623 K / 300 atm → sodium phenoxide (intermediate: phenoxide ion) \\(\\xrightarrow{\\text{H}_3\\text{O}^+}\\) phenol; the phenol then gives 2,4,6-tribromophenol with bromine water.\n" +
        "- Also: benzene sulphonic acid + fused NaOH; benzene diazonium chloride + warm water.",
      formula: {
        label: "Cumene route",
        latex:
          "\\text{C}_6\\text{H}_5\\text{CH(CH}_3)_2 \\xrightarrow{\\text{O}_2} \\text{C}_6\\text{H}_5\\text{C(CH}_3)_2\\text{OOH} \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_5\\text{OH} + (\\text{CH}_3)_2\\text{CO}",
      },
      authoredExample: {
        prompt: "Identify A and B: benzene \\(\\xrightarrow{\\text{CH}_3\\text{CH=CH}_2,\\ \\text{H}^+}\\) A \\(\\xrightarrow{\\text{O}_2;\\ \\text{H}_3\\text{O}^+}\\) B + acetone.",
        steps: [
          "Friedel–Crafts alkylation gives cumene (A); the cumene process gives phenol (B).",
        ],
        answer: "A = cumene; B = phenol",
      },
      selfCheckExample: {
        prompt: "What does cumene give with (i) air and cobalt naphthenate then dilute acid, and (ii) alkaline KMnO₄ then acid?",
        steps: [
          "(i) Phenol + acetone. (ii) Benzoic acid.",
        ],
        answer: "Phenol and acetone; benzoic acid",
      },
      practiceSet: [
        { prompt: "Products of the cumene process?", answer: "Phenol + acetone" },
        { prompt: "Substrate X giving phenol + acetone with air/Co-naphthenate?", answer: "Isopropylbenzene (cumene)" },
        { prompt: "Intermediate when chlorobenzene meets fused NaOH under pressure (as keyed)?", answer: "Phenoxide ion" },
        { prompt: "Cumene + KMnO₄/KOH then H₃O⁺ gives?", answer: "Benzoic acid" },
      ],
      pyqExampleId: "dcf0bfc9-b1a6-4a98-ba9e-dc1cfc1d1e60",
      traps: [
        {
          title: "Stopping at cumene hydroperoxide",
          body:
            "The hydroperoxide is the intermediate; the question asks for the products after dilute acid — phenol AND acetone, both of them, which is why the process pays.",
        },
      ],
    },

    // 2 — ring reactions
    {
      kind: "formula" as const,
      slug: "cetalc-phenol-ring-reactions",
      name: "Nitration and Bromination of Phenol",
      intuition:
        "OH activates the ring strongly at ortho and para. So mild reagents go far: dilute HNO₃ at low temperature gives a MIXTURE of o- and p-nitrophenol, and bromine WATER goes all the way to 2,4,6-tribromophenol as a white precipitate without any catalyst. Only concentrated HNO₃ with H₂SO₄ (mixed acid) reaches picric acid; in CS₂ at low temperature bromine stops at monobromination.",
      definition:
        "- Dilute \\(\\text{HNO}_3\\), 298 K: **o- + p-nitrophenol** (mixture; ortho separated by steam distillation).\n" +
        "- Conc. \\(\\text{HNO}_3\\) + conc. \\(\\text{H}_2\\text{SO}_4\\): **picric acid** (2,4,6-trinitrophenol). Dilute nitric acid alone cannot trinitrate.\n" +
        "- \\(\\text{Br}_2\\) in WATER: **2,4,6-tribromophenol** (white precipitate). \\(\\text{Br}_2\\) in \\(\\text{CS}_2\\) or \\(\\text{CHCl}_3\\), 273 K: o- and p-bromophenol (para major).\n" +
        "- Phenol + \\(\\text{H}_2\\text{SO}_4\\): o-hydroxybenzenesulphonic acid at 288 K, para at 373 K.",
      formula: {
        label: "How far the reaction goes",
        latex:
          "\\text{dil. HNO}_3 \\to o/p\\text{-nitrophenol};\\quad \\text{HNO}_3/\\text{H}_2\\text{SO}_4 \\to \\text{picric acid};\\quad \\text{Br}_2(\\text{aq}) \\to 2,4,6\\text{-tribromophenol}",
      },
      authoredExample: {
        prompt: "Phenol is treated with (i) bromine in CS₂ at 0 °C and (ii) bromine water. Name the major product of each.",
        steps: [
          "(i) Non-polar solvent, cold: p-bromophenol (with some ortho). (ii) Water ionises phenol to the even more activated phenoxide: 2,4,6-tribromophenol.",
        ],
        answer: "p-Bromophenol; 2,4,6-tribromophenol",
      },
      selfCheckExample: {
        prompt: "Which reagent converts phenol to picric acid: dilute HNO₃, concentrated HNO₂, concentrated H₂SO₄, or concentrated HNO₃ + concentrated H₂SO₄?",
        steps: [
          "Trinitration needs the nitronium ion from mixed acid.",
        ],
        answer: "Conc. HNO₃ + conc. H₂SO₄",
      },
      practiceSet: [
        { prompt: "Phenol + dilute HNO₃ at low temperature gives?", answer: "Mixture of o- and p-nitrophenol" },
        { prompt: "Solvent for bromination to 2,4,6-tribromophenol?", answer: "Water" },
        { prompt: "Phenol + bromine water gives?", answer: "2,4,6-Tribromophenol" },
        { prompt: "Reagent for picric acid from phenol?", answer: "Conc. HNO₃ + conc. H₂SO₄" },
      ],
      pyqExampleId: "3039e9d0-f7db-4f0e-a2e3-16e172452353",
      traps: [
        {
          title: "Trinitrating with dilute acid",
          body:
            "Dilute HNO₃ gives the mononitro mixture; 2,4,6-trinitrophenol needs the mixed acid. Bromine is the opposite case — WATER gives the tri-substituted product, the organic solvent the mono.",
        },
      ],
    },

    // 3 — named reactions
    {
      kind: "formula" as const,
      slug: "cetalc-kolbe-reimer-tiemann-and-others",
      name: "Kolbe, Reimer–Tiemann, Oxidation and Reduction of Phenol",
      intuition:
        "The phenoxide ion is a better nucleophile than phenol, so the named reactions start from it. Kolbe: sodium phenoxide + CO₂ at 398 K and 6 atm gives sodium salicylate, acidified to salicylic acid. Reimer–Tiemann: phenol + CHCl₃ + aqueous NaOH puts CHO ortho — salicylaldehyde. Chromic oxide oxidises phenol to p-benzoquinone; zinc dust strips the OH to give benzene; H₂ over nickel saturates the ring to cyclohexanol.",
      definition:
        "- **Kolbe (Kolbe–Schmitt)**: \\(\\text{C}_6\\text{H}_5\\text{ONa} \\xrightarrow{\\text{CO}_2,\\ 398\\text{ K},\\ 6\\text{ atm}} \\text{sodium salicylate} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{salicylic acid}\\). Substrate A = sodium phenoxide; product B = salicylic acid.\n" +
        "- **Reimer–Tiemann**: reagent \\(\\text{CHCl}_3\\), aq. NaOH, then \\(\\text{H}_3\\text{O}^+\\) → salicylaldehyde (2-hydroxybenzaldehyde).\n" +
        "- **Oxidation** \\(\\text{CrO}_3\\) (or \\(\\text{Na}_2\\text{Cr}_2\\text{O}_7/\\text{H}_2\\text{SO}_4\\)): **p-benzoquinone**. \\(\\text{KMnO}_4\\) oxidises the side chain of cumene, not the ring.\n" +
        "- **Zn dust, heat**: phenol → **benzene** (the OH is removed). **H₂/Ni, 433 K**: phenol → **cyclohexanol**.\n" +
        "- Phenol + acyl chloride/pyridine → aryl ester (O-acylation); phenol + FeCl₃ → violet colour (test).",
      formula: {
        label: "Kolbe and Reimer–Tiemann",
        latex:
          "\\text{ArONa} + \\text{CO}_2 \\to o\\text{-HOC}_6\\text{H}_4\\text{COONa} \\to \\text{salicylic acid};\\qquad \\text{ArOH} + \\text{CHCl}_3/\\text{NaOH} \\to o\\text{-HOC}_6\\text{H}_4\\text{CHO}",
      },
      authoredExample: {
        prompt: "Starting from phenol, how would you make (i) salicylic acid and (ii) salicylaldehyde?",
        steps: [
          "(i) Convert to sodium phenoxide with NaOH, heat with CO₂ at 6 atm, acidify (Kolbe). (ii) Heat with chloroform and aqueous NaOH, then acidify (Reimer–Tiemann).",
        ],
        answer: "Kolbe for the acid; Reimer–Tiemann for the aldehyde",
      },
      selfCheckExample: {
        prompt: "Name the product of phenol with (i) CrO₃, (ii) zinc dust, (iii) H₂ over Ni at 433 K.",
        steps: [
          "(i) p-Benzoquinone. (ii) Benzene. (iii) Cyclohexanol.",
        ],
        answer: "p-Benzoquinone; benzene; cyclohexanol",
      },
      practiceSet: [
        { prompt: "Reimer–Tiemann reagent?", answer: "CHCl₃, aq. NaOH, then H₃O⁺" },
        { prompt: "Product B of sodium phenoxide + CO₂ (398 K, 6 atm) then H₃O⁺?", answer: "Salicylic acid" },
        { prompt: "Phenol heated with zinc dust gives?", answer: "Benzene" },
        { prompt: "Phenol + CrO₃ gives?", answer: "p-Benzoquinone" },
      ],
      pyqExampleId: "d792101c-0d62-42bc-a9e6-ab86ec6a9536",
      traps: [
        {
          title: "Starting Kolbe from phenol itself",
          body:
            "The substrate is SODIUM PHENOXIDE — the phenoxide ion is what attacks CO₂. 'Phenol' is offered as option (a) and is wrong.",
        },
      ],
    },

    // 4 — natural phenols
    {
      kind: "reference" as const,
      slug: "cetalc-natural-phenols",
      name: "Phenols in Nature: Eugenol, Gallic Acid, Curcumin and the Polyols",
      intuition:
        "A short list of naturally occurring phenols with a source and a use each. Eugenol from clove oil is the dentist's analgesic and antimicrobial; gallic acid comes from gall nuts and Indian gooseberry (amla); curcumin from turmeric; methyl salicylate from wintergreen. Ascorbic acid is the one on the list that is NOT a phenol.",
      definition:
        "- **Eugenol** (4-allyl-2-methoxyphenol): clove oil; analgesic and antimicrobial, local anaesthetic in dentistry.\n" +
        "- **Gallic acid** (3,4,5-trihydroxybenzoic acid): gall nuts, Indian gooseberry; antioxidant.\n" +
        "- **Curcumin**: turmeric; antioxidant, anti-inflammatory. **Methyl salicylate**: wintergreen oil.\n" +
        "- Drawn structures to recognise: phloroglucinol (1,3,5-triol, symmetric), pyrogallol (1,2,3), hydroxyhydroquinone (1,2,4), resorcinol (1,3).",
      table: {
        columns: ["Phenol", "Source", "Property / use"],
        rows: [
          { cells: ["Eugenol", "Clove", "Analgesic and antimicrobial"], noteAmber: "Not 'antiseptic' alone — the paper keys the analgesic-and-antimicrobial pair." },
          { cells: ["Gallic acid", "Indian gooseberry (amla), gall nuts", "Antioxidant"] },
          { cells: ["Curcumin", "Turmeric", "Antioxidant, anti-inflammatory"] },
          { cells: ["Methyl salicylate", "Wintergreen", "Liniment"] },
          { cells: ["Ascorbic acid", "Citrus fruits", "Vitamin C — NOT a phenol"], noteAmber: "No OH on a benzene ring." },
        ],
        caption: "Source and use are asked in both directions.",
      },
      selfCheckExample: {
        prompt: "Which natural phenol comes from Indian gooseberry, and what is eugenol's medicinal property?",
        steps: [
          "Gallic acid; analgesic and antimicrobial.",
        ],
        answer: "Gallic acid; analgesic and antimicrobial",
      },
      practiceSet: [
        { prompt: "Source of gallic acid?", answer: "Indian gooseberry (amla)" },
        { prompt: "Medicinal property of eugenol?", answer: "Analgesic and antimicrobial" },
        { prompt: "Source of eugenol?", answer: "Clove" },
        { prompt: "Structure of phloroglucinol?", answer: "Benzene-1,3,5-triol (symmetric)" },
      ],
      pyqExampleId: "96bcf5a1-7e5a-40ea-aa10-a05fcce0e181",
      traps: [
        {
          title: "Confusing the 1,2,3 and 1,3,5 triol drawings",
          body:
            "Phloroglucinol is the SYMMETRIC one — OH at alternate carbons. Three OH in a row is pyrogallol; the paper draws both and asks for one.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Physical Properties — why the nitrophenols differ",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-physical-properties",
    },
    {
      label: "Halogen Derivatives — the Dow process from the chlorobenzene side",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-elimination-and-haloarenes",
    },
  ],
};
