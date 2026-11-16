import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CC_ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism in Coordination Compounds",
  title: "Isomerism in Coordination Compounds",
  oneLineDefinition:
    "Isomers have the same formula but a different arrangement: structural isomers differ in which atoms are bonded (ionisation, linkage, coordination, solvate), stereoisomers differ only in how the ligands are placed in space (geometrical, optical).",
  whyItMatters:
    "Four NEET questions from 2024 to 2026, three of them from 2026. Two match complexes with types of isomerism: linkage, ionisation, coordination and solvate in NEET 2024, and geometrical, optical, linkage and solvate in NEET 2026. Re-NEET 2026 asked which complex has facial and meridional isomers, and which of two oxalato complexes is chiral.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcc-structural",
      name: "Structural isomerism",
      intuition:
        "Structural isomers have the same atoms but different bonds. Ask what has moved: an ion between inside and outside the bracket (ionisation), the atom of a ligand that touches the metal (linkage), ligands between two metals in a salt made of two complex ions (coordination), or water between inside and outside the bracket (solvate).",
      definition:
        "- **Ionisation isomers**: an ion inside the bracket swaps with a counter ion. They give different ions in solution.\n" +
        "- **Linkage isomers**: an ambidentate ligand binds through a different atom: nitrito-N (\\(\\text{NO}_2\\)) or nitrito-O (\\(\\text{ONO}\\)).\n" +
        "- **Coordination isomers**: ligands swap between the cationic and the anionic complex of one salt.\n" +
        "- **Solvate isomers**: the solvent is a ligand in one and outside the bracket in the other. With water they are called hydrate isomers.",
      table: {
        columns: ["Type", "What differs", "Example pair"],
        rows: [
          { cells: ["Ionisation", "Which ion is inside the bracket", "\\(\\text{[Co(NH}_3\\text{)}_5\\text{SO}_4\\text{]Br}\\) and \\(\\text{[Co(NH}_3\\text{)}_5\\text{Br]SO}_4\\)"] },
          { cells: ["Linkage", "Which atom of the ligand binds", "\\(\\text{[Co(NH}_3\\text{)}_5\\text{(NO}_2\\text{)]Cl}_2\\) and \\(\\text{[Co(NH}_3\\text{)}_5\\text{(ONO)]Cl}_2\\)"], noteAmber: "NEET 2024 and NEET 2026 both matched this nitro complex with linkage isomerism." },
          { cells: ["Coordination", "Which metal holds which ligands", "\\(\\text{[Co(NH}_3\\text{)}_6\\text{][Cr(CN)}_6\\text{]}\\) and \\(\\text{[Cr(NH}_3\\text{)}_6\\text{][Co(CN)}_6\\text{]}\\)"] },
          { cells: ["Solvate (hydrate)", "Whether water is a ligand or outside", "\\(\\text{[Cr(H}_2\\text{O)}_6\\text{]Cl}_3\\) and \\(\\text{[Cr(H}_2\\text{O)}_5\\text{Cl]Cl}_2\\cdot\\text{H}_2\\text{O}\\)"], noteAmber: "NEET 2024 and NEET 2026 both matched a hexaaqua chloride with solvate isomerism." },
        ],
      },
      pyqExampleId: "c43bc011-d13c-409a-8e66-d8387c5daa86",
      selfCheckExample: {
        prompt: "\\(\\text{[Pt(NH}_3\\text{)}_4\\text{Cl}_2\\text{]Br}_2\\) and \\(\\text{[Pt(NH}_3\\text{)}_4\\text{Br}_2\\text{]Cl}_2\\) are isomers. Which kind, and which of the two gives a white precipitate of AgCl with silver nitrate?",
        steps: [
          "The chloride and bromide ions swap between inside and outside the bracket: ionisation isomers.",
          "Only an ion outside the bracket reacts with \\(\\text{Ag}^+\\).",
          "Chloride is outside only in the second compound.",
        ],
        answer: "Ionisation isomers; \\(\\text{[Pt(NH}_3\\text{)}_4\\text{Br}_2\\text{]Cl}_2\\) gives AgCl",
      },
      practiceSet: [
        { prompt: "Which kind of structural isomerism needs a ligand with two different donor atoms?", answer: "Linkage isomerism" },
        { prompt: "\\(\\text{[Cu(NH}_3\\text{)}_4\\text{][PtCl}_4\\text{]}\\) and \\(\\text{[Pt(NH}_3\\text{)}_4\\text{][CuCl}_4\\text{]}\\) are which kind of isomers?", answer: "Coordination isomers" },
        { prompt: "What is solvate isomerism called when the solvent is water?", answer: "Hydrate isomerism" },
        { prompt: "Do two ionisation isomers give the same ions in solution?", answer: "No, each gives a different counter ion" },
      ],
      traps: [
        {
          title: "Linkage needs an ambidentate ligand",
          body: "Only a ligand like \\(\\text{NO}_2^-\\) or \\(\\text{SCN}^-\\) can bind through two different atoms. A complex without one cannot show linkage isomerism.",
        },
        {
          title: "Ionisation and solvate isomers look alike",
          body: "If the ion that moves out of the bracket is water, it is solvate (hydrate) isomerism. If it is an ion such as \\(\\text{SO}_4^{2-}\\) or \\(\\text{Br}^-\\), it is ionisation isomerism.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcc-geometrical",
      name: "Geometrical isomerism: cis, trans, fac and mer",
      intuition:
        "Geometrical isomers have the same ligands bonded to the metal but placed differently around it. Two like ligands can sit next to each other (cis, at 90°) or opposite each other (trans, at 180°). With three like ligands on an octahedron, they can sit on one face (fac) or around a half circle through the metal (mer).",
      definition:
        "- Square planar \\(\\text{MA}_2\\text{B}_2\\): cis and trans isomers, as in \\(\\text{[Pt(NH}_3\\text{)}_2\\text{Cl}_2\\text{]}\\).\n" +
        "- Tetrahedral complexes show no geometrical isomers: every position is next to every other.\n" +
        "- Octahedral \\(\\text{MA}_4\\text{B}_2\\) and \\(\\text{M(AA)}_2\\text{B}_2\\): cis and trans.\n" +
        "- Octahedral \\(\\text{MA}_3\\text{B}_3\\): **facial (fac)**, the three A on one face, and **meridional (mer)**, the three A around a meridian.\n" +
        "- A complex with all its unidentate ligands the same, or only one different (\\(\\text{MA}_5\\text{B}\\)), has just one arrangement.",
      table: {
        columns: ["Type of complex", "Example", "Geometrical isomers"],
        rows: [
          { cells: ["Square planar MA₂B₂", "\\(\\text{[Pt(NH}_3\\text{)}_2\\text{Cl}_2\\text{]}\\)", "2: cis and trans"], noteAmber: "NEET 2026 matched this platinum complex with geometrical isomerism." },
          { cells: ["Octahedral MA₄B₂", "\\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]}^{+}\\)", "2: cis and trans"] },
          { cells: ["Octahedral M(AA)₂B₂", "\\(\\text{[CoCl}_2\\text{(en)}_2\\text{]}^{+}\\)", "2: cis and trans"] },
          { cells: ["Octahedral MA₃B₃", "\\(\\text{[Co(NH}_3\\text{)}_3\\text{(NO}_2\\text{)}_3\\text{]}\\)", "2: fac and mer"] },
          { cells: ["Octahedral MA₅B", "\\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]}^{2+}\\)", "None"] },
        ],
      },
      pyqExampleId: "86ddf7c5-837b-4947-a38c-0c840bf0c49b",
      selfCheckExample: {
        prompt: "How many geometrical isomers does \\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]}^{+}\\) have, and how do they differ?",
        steps: [
          "It is octahedral of the type \\(\\text{MA}_4\\text{B}_2\\).",
          "The two \\(\\text{Cl}\\) can be next to each other (90°) or opposite (180°).",
        ],
        answer: "Two: cis (Cl at 90°) and trans (Cl at 180°)",
      },
      practiceSet: [
        { prompt: "Why does a tetrahedral complex show no geometrical isomerism?", answer: "Every position is next to every other, so there is only one arrangement" },
        { prompt: "In trans-\\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]}^{+}\\), what is the Cl-Co-Cl angle?", answer: "180°" },
        { prompt: "Does \\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]}^{2+}\\) show geometrical isomerism?", answer: "No, it has only one arrangement" },
        { prompt: "How many geometrical isomers does square planar \\(\\text{[Pt(NH}_3\\text{)}_2\\text{Cl}_2\\text{]}\\) have?", answer: "2 (cis and trans)" },
      ],
      traps: [
        {
          title: "Fac and mer need three and three",
          body: "Facial and meridional isomers belong to octahedral \\(\\text{MA}_3\\text{B}_3\\) complexes. An \\(\\text{MA}_4\\text{B}_2\\) complex gives cis and trans instead.",
        },
        {
          title: "Same ligands, same formula, different places",
          body: "Geometrical isomers have exactly the same ligands on the metal. If a ligand has moved out of the bracket, the isomers are structural, not geometrical.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcc-optical",
      name: "Optical isomerism",
      intuition:
        "Some complexes are like your left and right hands: each is the mirror image of the other, but you cannot lay one on top of the other so they match. Such a complex is chiral, and its two forms rotate plane polarised light in opposite directions. A complex with a plane of symmetry is the same as its mirror image, so it is not chiral.",
      definition:
        "- **Optical isomers (enantiomers)**: mirror images that cannot be superimposed. The two forms are dextro (d) and laevo (l).\n" +
        "- Common in octahedral complexes with didentate ligands.\n" +
        "- \\(\\text{M(AA)}_3\\), such as \\(\\text{[Co(en)}_3\\text{]}^{3+}\\): chiral, a d and an l form.\n" +
        "- \\(\\text{M(AA)}_2\\text{B}_2\\): the cis isomer is chiral, the trans isomer has a plane of symmetry and is not.\n" +
        "- \\(\\text{MA}_4\\text{B}_2\\), cis or trans: a plane of symmetry, so no optical isomers.",
      table: {
        columns: ["Complex", "Optical isomers", "Why"],
        rows: [
          { cells: ["\\(\\text{[Co(en)}_3\\text{]}^{3+}\\)", "Yes, d and l", "No plane of symmetry"], noteAmber: "NEET 2026 matched [Co(en)₃]³⁺ with optical isomerism, and Re-NEET 2026 called [Fe(ox)₃]³⁻, the same type, chiral." },
          { cells: ["cis-\\(\\text{[PtCl}_2\\text{(en)}_2\\text{]}^{2+}\\)", "Yes, d and l", "No plane of symmetry"] },
          { cells: ["trans-\\(\\text{[PtCl}_2\\text{(en)}_2\\text{]}^{2+}\\)", "No", "Has a plane of symmetry"] },
          { cells: ["\\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]}^{+}\\)", "No", "Both cis and trans have a plane of symmetry"] },
        ],
      },
      pyqExampleId: "bccf8f61-5226-4901-9b2a-77fda3ba6570",
      selfCheckExample: {
        prompt: "How many stereoisomers does \\(\\text{[CoCl}_2\\text{(en)}_2\\text{]}^{+}\\) have in all?",
        steps: [
          "Geometrical: a cis and a trans form.",
          "The trans form has a plane of symmetry: one isomer.",
          "The cis form is chiral: a d and an l form.",
        ],
        answer: "Three: trans, and the d and l forms of cis",
      },
      practiceSet: [
        { prompt: "What is the test for a complex to show optical isomerism?", answer: "Its mirror image cannot be superimposed on it" },
        { prompt: "What are the two forms of an optically active complex called?", answer: "Dextro (d) and laevo (l)" },
        { prompt: "Does \\(\\text{[Co(NH}_3\\text{)}_6\\text{]}^{3+}\\) show optical isomerism?", answer: "No, it is the same as its mirror image" },
        { prompt: "In which kind of complex is optical isomerism most common?", answer: "Octahedral complexes with didentate ligands" },
      ],
      traps: [
        {
          title: "Trans with two chelates is not chiral",
          body: "In trans-\\(\\text{M(AA)}_2\\text{B}_2\\) a mirror plane runs through the metal and both chelate rings, so it has no optical isomer. Only the cis form is chiral.",
        },
        {
          title: "Three chelates make a chiral complex",
          body: "Any \\(\\text{M(AA)}_3\\) complex, whether the chelate is en or oxalate, has a d and an l form.",
        },
      ],
    },
  ],
};
