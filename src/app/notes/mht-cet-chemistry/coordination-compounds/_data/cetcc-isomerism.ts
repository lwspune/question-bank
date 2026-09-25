import type { SubtopicNote } from "@/app/notes/_types";

export const ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism in Coordination Compounds",
  title: "Isomerism in Coordination Compounds: Structural and Geometric",
  oneLineDefinition:
    "Coordination isomers share a formula but differ either in which atoms are bonded to the metal — structural isomers: ionisation, solvate, linkage and coordination — or only in how the same ligands are arranged in space — stereoisomers: geometric (cis and trans) and optical.",
  whyItMatters:
    "6 PYQs, none HARD. Five are structural: name the isomerism of a given pair (ionisation for the sulphato/bromo pair, solvate for the chromium hydrates, asked twice) or pick the ligand that can form linkage isomers (nitro, SCN⁻). One asks which complex is of the MA₂BC type that shows cis and trans forms. " +
    "Two cards.",
  concepts: [
    // 1 — structural isomerism
    {
      kind: "reference" as const,
      slug: "cetcc-structural-isomerism",
      name: "The Four Structural Isomerisms",
      intuition:
        "Ask what has swapped places. If an anion inside the bracket has traded places with the counter ion outside, the pair are IONISATION isomers — they give different ions in water ([Co(NH₃)₅Br]SO₄ gives SO₄²⁻, its isomer gives Br⁻). If a water molecule has moved between the sphere and the crystal, they are SOLVATE (hydrate) isomers. If one ambidentate ligand binds through a different atom — NO₂ through N or O, SCN through S or N — they are LINKAGE isomers. If a complex cation and a complex anion have exchanged ligands between their metals, they are COORDINATION isomers.",
      definition:
        "- **Ionisation**: \\([\\text{Co(NH}_3)_5\\text{SO}_4]\\text{Br}\\) and \\([\\text{Co(NH}_3)_5\\text{Br}]\\text{SO}_4\\) — the first gives Br⁻ (AgBr with AgNO₃), the second SO₄²⁻ (BaSO₄ with BaCl₂).\n" +
        "- **Solvate (hydrate)**: \\([\\text{Cr(H}_2\\text{O)}_6]\\text{Cl}_3\\) (violet), \\([\\text{Cr(H}_2\\text{O)}_5\\text{Cl}]\\text{Cl}_2\\cdot\\text{H}_2\\text{O}\\), \\([\\text{Cr(H}_2\\text{O)}_4\\text{Cl}_2]\\text{Cl}\\cdot2\\text{H}_2\\text{O}\\).\n" +
        "- **Linkage**: needs an **ambidentate** ligand — NO₂⁻ (nitro/nitrito), SCN⁻ (thiocyanato/isothiocyanato), CN⁻. \\([\\text{Fe(H}_2\\text{O)}_5\\text{SCN}]^{2+}\\) and \\([\\text{Fe(H}_2\\text{O)}_5\\text{NCS}]^{2+}\\). Aqua, ammine, halo and oxalato cannot.\n" +
        "- **Coordination**: \\([\\text{Co(NH}_3)_6][\\text{Cr(CN)}_6]\\) and \\([\\text{Cr(NH}_3)_6][\\text{Co(CN)}_6]\\) — both ions must be complex.",
      table: {
        columns: ["Isomerism", "What differs", "Example pair"],
        rows: [
          { cells: ["Ionisation", "Anion inside ↔ anion outside", "[Co(NH₃)₅Br]SO₄ / [Co(NH₃)₅SO₄]Br"] },
          { cells: ["Solvate (hydrate)", "Water inside ↔ water of crystallisation", "[Cr(H₂O)₆]Cl₃ / [Cr(H₂O)₅Cl]Cl₂·H₂O"] },
          { cells: ["Linkage", "Donor atom of an ambidentate ligand", "–NO₂ / –ONO; –SCN / –NCS"], noteAmber: "Only an ambidentate ligand can do this." },
          { cells: ["Coordination", "Ligands swapped between cation and anion metals", "[Co(NH₃)₆][Cr(CN)₆] / [Cr(NH₃)₆][Co(CN)₆]"] },
        ],
        caption: "Find what moved: an anion, a water, a donor atom, or a whole set of ligands.",
      },
      selfCheckExample: {
        prompt: "What isomerism do [Cr(H₂O)₆]Cl₃ and [Cr(H₂O)₅Cl]Cl₂·H₂O show?",
        steps: [
          "One water has moved out of the sphere into the crystal and one chloride has moved in.",
        ],
        answer: "Solvate (hydrate) isomerism",
      },
      practiceSet: [
        { prompt: "Isomerism of [Co(NH₃)₅Br]SO₄ and [Co(NH₃)₅SO₄]Br?", answer: "Ionisation" },
        { prompt: "Ligand that can form linkage isomers: aqua, ammine, iodo, nitro?", answer: "Nitro" },
        { prompt: "Ligand that can form linkage isomers: SCN⁻, H₂O, C₂O₄²⁻?", answer: "SCN⁻" },
        { prompt: "Isomerism of [Fe(H₂O)₅SCN]²⁺ and [Fe(H₂O)₅NCS]²⁺?", answer: "Linkage" },
      ],
      pyqExampleId: "b8bc795a-b946-45cd-8388-ba21e65e6e24",
      traps: [
        {
          title: "Calling a water swap 'ionisation'",
          body:
            "In the chromium hydrates a chloride also moves, but what defines the pair is the WATER moving between sphere and crystal — solvate isomerism. Ionisation isomers exchange two different anions and contain the same water.",
        },
      ],
    },

    // 2 — geometric isomerism
    {
      kind: "formula" as const,
      slug: "cetcc-geometric-isomerism",
      name: "Geometric (cis–trans) Isomerism and the MA₂BC Type",
      intuition:
        "Write the complex as M with letters for its kinds of ligand. In a square planar complex, MA₂B₂ has two forms — the two A's side by side (cis) or opposite (trans) — and MA₂BC does too: the two identical A's are either adjacent or across. MA₄ or MA₃B cannot be arranged in two ways. A tetrahedral complex never shows cis–trans because every position is adjacent to every other. In octahedral MA₄B₂ the two B's are cis or trans, and MA₃B₃ gives fac and mer. Optical isomers need a complex with no mirror plane — [Co(en)₃]³⁺ and cis-[Co(en)₂Cl₂]⁺ are chiral; the trans form is not.",
      definition:
        "- **Square planar**: \\(\\text{MA}_2\\text{B}_2\\) (cisplatin and transplatin, \\([\\text{Pt(NH}_3)_2\\text{Cl}_2]\\)) → 2; \\(\\text{MA}_2\\text{BC}\\) (\\([\\text{Pt(NH}_3)(\\text{H}_2\\text{O})\\text{Cl}_2]\\)) → 2; \\(\\text{MABCD}\\) → 3. \\(\\text{MA}_4\\), \\(\\text{MA}_3\\text{B}\\) → none.\n" +
        "- **Tetrahedral**: no geometric isomers.\n" +
        "- **Octahedral**: \\(\\text{MA}_4\\text{B}_2\\) (\\([\\text{Co(NH}_3)_4\\text{Cl}_2]^+\\)) → cis and trans; \\(\\text{MA}_3\\text{B}_3\\) → fac and mer; \\([\\text{M(AA)}_2\\text{B}_2]\\) (\\([\\text{Co(en)}_2\\text{Cl}_2]^+\\)) → cis and trans, and the cis form is also optically active.\n" +
        "- Geometric isomers are **diastereoisomers**: not mirror images, with different physical properties (cisplatin is the anticancer drug, transplatin is not).",
      formula: {
        label: "Square planar geometric isomers",
        latex:
          "\\text{MA}_4, \\text{MA}_3\\text{B}: 0;\\quad \\text{MA}_2\\text{B}_2, \\text{MA}_2\\text{BC}: 2 \\ (\\textit{cis}, \\textit{trans});\\quad \\text{MABCD}: 3",
      },
      authoredExample: {
        prompt: "Classify [Pt(NH₃)₂ClBr] by type and say how many geometric isomers it has.",
        steps: [
          "A = NH₃ (two), B = Cl, C = Br: MA₂BC, square planar Pt(II).",
          "The two NH₃ are adjacent or opposite: two isomers.",
        ],
        answer: "MA₂BC; 2 (cis and trans)",
      },
      selfCheckExample: {
        prompt: "Which is an MA₂BC complex: [Co(en)₂Cl₂]⁺, [Pt(NH₃)(H₂O)Cl₂], Pt(NH₃)₂Cl₂, [Co(NH₃)₄Cl₂]⁺?",
        steps: [
          "Only [Pt(NH₃)(H₂O)Cl₂] has two identical ligands and two different single ones.",
        ],
        answer: "[Pt(NH₃)(H₂O)Cl₂]",
      },
      practiceSet: [
        { prompt: "Geometric isomers of square planar [Pt(NH₃)₂Cl₂]?", answer: "2 (cis and trans)" },
        { prompt: "Does tetrahedral [NiCl₂(PPh₃)₂] show cis–trans isomerism?", answer: "No — no tetrahedral complex does" },
        { prompt: "Which form of [Co(en)₂Cl₂]⁺ is optically active?", answer: "The cis form" },
      ],
      pyqExampleId: "299b2ec1-0b5b-4313-aa68-3b9ee83541bb",
      traps: [
        {
          title: "Reading MA₂B₂ as MA₂BC",
          body:
            "Pt(NH₃)₂Cl₂ also has cis and trans forms, but it is MA₂B₂ — two pairs of identical ligands. MA₂BC needs one pair and two DIFFERENT single ligands.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Ligands — the ambidentate ligands behind linkage isomers",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-ligands",
    },
    {
      label: "Bonding and Stability — which complexes are square planar",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-bonding-and-stability",
    },
  ],
};
