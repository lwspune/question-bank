import type { SubtopicNote } from "@/app/notes/_types";

export const COMPLEX_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Complex Types, Homoleptic, Heteroleptic, Cationic, Anionic, Neutral",
  title: "Types of Complexes: Homoleptic or Heteroleptic, Cationic, Anionic or Neutral",
  oneLineDefinition:
    "A complex is homoleptic when all its ligands are the same kind and heteroleptic when they differ; its coordination sphere is cationic, anionic or neutral according to the sum of the metal's oxidation state and the ligand charges, and a salt may pair a complex cation with simple anions, a complex anion with simple cations, or a complex cation with a complex anion.",
  whyItMatters:
    "13 PYQs, none HARD. Five ask homoleptic or heteroleptic from a list of names or formulas; eight ask the charge type — the neutral complex (triamminetrinitrocobalt(III), diamminedichloroplatinum(II)), the cationic one, the anionic one, the compound with a complex anion, and the one with both complex cation and anion. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetcc-homoleptic-heteroleptic-and-sphere-charge",
      name: "Same Ligands or Mixed, and the Charge on the Sphere",
      intuition:
        "Two independent labels. LIGAND KINDS: [Co(NH₃)₆]³⁺, [Co(C₂O₄)₃]³⁻, Fe(CO)₅, [Ni(CN)₄]²⁻ have one kind of ligand — homoleptic; anything with two names before the metal (tetraamminediaqua…, pentaammineaqua…, triamminetrinitro…, pentaaquaisothiocyanato…) is heteroleptic. SPHERE CHARGE: add the metal's oxidation state to the ligand charges. Co(III) with three NO₂⁻ and three NH₃ gives +3 − 3 = 0, a neutral complex with no counter ion; Co(III) with five NH₃ and one Cl⁻ gives +2, a cation that needs SO₄²⁻ outside; Fe(II) with six CN⁻ gives −4, an anion that needs four K⁺. In [Pt(NH₃)₄Br₂]Br₂ the sphere is a cation and the bromides outside are simple anions; [Co(NH₃)₆][Cr(CN)₆] pairs a complex cation with a complex anion.",
      definition:
        "- **Homoleptic** (one ligand type): \\([\\text{Co(NH}_3)_6]^{3+}\\), \\([\\text{Cu(NH}_3)_4]^{2+}\\), \\(\\text{K}_3[\\text{Al(C}_2\\text{O}_4)_3]\\), \\(\\text{Na}_3[\\text{AlF}_6]\\), \\(\\text{Ni(CO)}_4\\), \\(\\text{K}_2[\\text{Zn(OH)}_4]\\).\n" +
        "- **Heteroleptic** (two or more): \\([\\text{Co(NH}_3)_4(\\text{H}_2\\text{O})_2]\\text{Cl}_3\\), \\([\\text{Co(H}_2\\text{O)(NH}_3)_5]\\text{I}_3\\), \\([\\text{Co(NH}_3)_3(\\text{NO}_2)_3]\\), \\([\\text{Fe(H}_2\\text{O)}_5\\text{NCS}]^{2+}\\), \\([\\text{Pt(NH}_3)_2\\text{Cl}_2]\\).\n" +
        "- **Neutral sphere** (no counter ion): \\([\\text{Co(NO}_2)_3(\\text{NH}_3)_3]\\), \\([\\text{Pt(NH}_3)_2\\text{Cl}_2]\\), \\(\\text{Ni(CO)}_4\\), \\(\\text{Fe(CO)}_5\\).\n" +
        "- **Cationic sphere**: \\([\\text{Co(NH}_3)_5\\text{Cl}]\\text{SO}_4\\), \\([\\text{Co(NH}_3)_6]\\text{Cl}_3\\), \\([\\text{Pt(NH}_3)_4\\text{Br}_2]\\text{Br}_2\\). **Anionic sphere**: \\(\\text{K}_4[\\text{Fe(CN)}_6]\\), \\(\\text{Na}_3[\\text{Co(NO}_2)_6]\\), \\(\\text{K}_3[\\text{Fe(CN)}_6]\\), \\(\\text{Na}_3[\\text{AlF}_6]\\).\n" +
        "- Both complex cation and complex anion: \\([\\text{Co(NH}_3)_6][\\text{Cr(CN)}_6]\\). A name ending in **-ate** marks an anionic sphere.",
      formula: {
        label: "Sphere charge",
        latex:
          "\\text{charge on sphere} = \\text{oxidation state of metal} + \\sum \\text{ligand charges}",
      },
      authoredExample: {
        prompt: "Classify [Cr(en)₂Cl₂]Cl and K[Ag(CN)₂] as homo/heteroleptic and by sphere charge.",
        steps: [
          "[Cr(en)₂Cl₂]⁺: en and Cl⁻ — heteroleptic; Cr(III) + 2(0) + 2(−1) = +1 — cationic, Cl⁻ outside. [Ag(CN)₂]⁻: one ligand type — homoleptic; Ag(I) + 2(−1) = −1 — anionic, K⁺ outside.",
        ],
        answer: "Heteroleptic cation; homoleptic anion",
      },
      selfCheckExample: {
        prompt: "Which is a neutral complex: [Co(H₂O)(NH₃)₅]I₃, [Co(NO₂)₃(NH₃)₃], Na₃[Co(NO₂)₆], [Fe(H₂O)₃(NCS)₃]Cl₂?",
        steps: [
          "Co(III) + 3(−1) + 3(0) = 0 with no counter ion.",
        ],
        answer: "[Co(NO₂)₃(NH₃)₃]",
      },
      practiceSet: [
        { prompt: "Heteroleptic: Na₃[Co(NO₂)₆], [Fe(H₂O)₅NCS]²⁺, [Cu(NH₃)₄]²⁺, [Co(C₂O₄)₃]³⁻?", answer: "[Fe(H₂O)₅NCS]²⁺" },
        { prompt: "Cationic complex: Na₄[Fe(CN)₆], [Co(NH₃)₅Cl]SO₄, Ni(CO)₄, K₃[Fe(CN)₆]?", answer: "[Co(NH₃)₅Cl]SO₄" },
        { prompt: "Compound with a complex anion: sodium hexanitrocobaltate(III) or triamminetrinitrocobalt(III)?", answer: "Sodium hexanitrocobaltate(III)" },
        { prompt: "Contains complex cation AND simple anions: tetraamminedibromoplatinum(IV) bromide?", answer: "Yes — [Pt(NH₃)₄Br₂]²⁺ with 2 Br⁻ outside" },
      ],
      pyqExampleId: "b4d3ec4f-94a6-478b-8c5a-79271b591792",
      traps: [
        {
          title: "Calling a salt 'neutral' because the whole compound is",
          body:
            "K₄[Fe(CN)₆] is a neutral salt with an ANIONIC complex. 'Neutral complex' means the sphere itself carries no charge — [Co(NO₂)₃(NH₃)₃], cisplatin, the carbonyls.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nomenclature — the -ate ending and counter ions in a name",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-nomenclature",
    },
    {
      label: "Ligands — the charges that set the sphere charge",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-ligands",
    },
  ],
};
