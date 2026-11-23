import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism in Coordination Compounds",
  title: "Structural, Geometric and Optical Isomers of Complexes",
  oneLineDefinition:
    "The four kinds of structural isomers (linkage, ionisation, coordination and solvate), cis and trans geometric isomers, and the optical isomers (enantiomers) of octahedral complexes.",
  whyItMatters:
    "12 questions. Six were set in board papers: which complex gives a white precipitate with barium nitrate (2015), explain ionisation isomerism (2020, 2025), define diastereoisomers and give the cis and trans isomers of [Co(NH₃)₄Cl₂]⁺ (2023), one example each of ionisation, linkage and hydrate isomerism (2024), and name the isomerism of a nitro and a nitrito complex (2026). The textbook adds coordination isomers, which complexes are chiral, and drawing the isomers of square planar and octahedral complexes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscccc-structural-isomers",
      name: "Structural isomers: linkage, ionisation, coordination and solvate",
      intuition:
        "Structural isomers have the same formula but different links between the atoms. Ask what has moved. A ligand bonding through its other donor atom gives linkage isomers; an ion swapping between inside and outside the bracket gives ionisation isomers; ligands swapping between two metals gives coordination isomers; water moving in or out of the sphere gives hydrate isomers.",
      definition:
        "- **Isomers** are different compounds with the same molecular formula; their reactivity and physical properties (colour, solubility, melting point) differ.\n" +
        "- **Structural (constitutional) isomers** have different linkages among their atoms but the same formula. There are four kinds, in the table.\n" +
        "- Ionisation isomers are told apart by the ions they give in solution: \\(\\text{[Co(NH}_3)_5\\text{SO}_4]\\text{Br} \\to \\text{[Co(NH}_3)_5\\text{SO}_4]^{+} + \\text{Br}^-\\), but \\(\\text{[Co(NH}_3)_5\\text{Br]SO}_4 \\to \\text{[Co(NH}_3)_5\\text{Br]}^{2+} + \\text{SO}_4^{2-}\\). Only the second gives a white precipitate of \\(\\text{BaSO}_4\\) with a barium salt; only the first gives AgBr with \\(\\text{AgNO}_3\\).",
      table: {
        columns: ["Kind", "What differs", "Example pair from the textbook"],
        rows: [
          {
            cells: ["Linkage", "An ambidentate ligand bonds through a different donor atom", "\\(\\text{[Co(NH}_3)_5\\text{(NO}_2)]^{2+}\\) (Co to N, nitro) and \\(\\text{[Co(NH}_3)_5\\text{(ONO)]}^{2+}\\) (Co to O, nitrito)"],
            pyqExampleId: "a725234f-1816-47c3-8eb7-9e860f9dcd36",
            noteAmber: "Board 2026 gave this pair as an MCQ: linkage isomers.",
          },
          {
            cells: ["Ionisation", "A ligand and a counter ion exchange places between the coordination and ionisation spheres", "\\(\\text{[Co(NH}_3)_5\\text{SO}_4]\\text{Br}\\) and \\(\\text{[Co(NH}_3)_5\\text{Br]SO}_4\\)"],
            pyqExampleId: "10925e22-651c-467a-9ecf-f8e59c4defce",
            noteAmber: "Board 2015 asked which complex gives a white precipitate with barium nitrate: the one with sulphate outside the bracket.",
          },
          { cells: ["Coordination", "Ligands are interchanged between the cationic and anionic spheres of different metal ions", "\\(\\text{[Co(NH}_3)_6]\\text{[Cr(CN)}_6]\\) and \\(\\text{[Cr(NH}_3)_6]\\text{[Co(CN)}_6]\\)"] },
          {
            cells: ["Solvate (hydrate when water is the solvent)", "Solvent is bonded to the metal in one isomer and free in the crystal in the other", "\\(\\text{[Cr(H}_2\\text{O)}_6]\\text{Cl}_3\\) and \\(\\text{[Cr(H}_2\\text{O)}_5\\text{Cl]Cl}_2 \\cdot \\text{H}_2\\text{O}\\)"],
            pyqExampleId: "27b51b4b-c49f-480a-b6e2-69497068f83d",
            noteAmber: "Board 2024 asked one example each of ionisation, linkage and hydrate isomerism: learn the three pairs in this table.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Write the two linkage isomers of the ion \\(\\text{[Fe(H}_2\\text{O)}_5\\text{SCN]}^{2+}\\) and name the ligand in each.",
        steps: [
          "\\(\\text{SCN}^-\\) is ambidentate: it can bond through S or through N.",
          "\\(\\text{[Fe(H}_2\\text{O)}_5\\text{(SCN)]}^{2+}\\): Fe to S, thiocyanato. \\(\\text{[Fe(H}_2\\text{O)}_5\\text{(NCS)]}^{2+}\\): Fe to N, isothiocyanato.",
        ],
        answer: "[Fe(H₂O)₅(SCN)]²⁺ (thiocyanato) and [Fe(H₂O)₅(NCS)]²⁺ (isothiocyanato)",
      },
      practiceSet: [
        { prompt: "Which test shows that a complex has sulphate outside its coordination sphere?", answer: "Barium chloride or barium nitrate gives a white precipitate of \\(\\text{BaSO}_4\\)" },
        { prompt: "Why can \\(\\text{NO}_2^-\\) give linkage isomers while \\(\\text{NH}_3\\) cannot?", answer: "\\(\\text{NO}_2^-\\) has two different donor atoms (N and O); \\(\\text{NH}_3\\) has only one (N)" },
        { prompt: "What kind of isomerism needs both a complex cation and a complex anion in the same compound?", answer: "Coordination isomerism" },
      ],
      pyqExampleId: "f576b5f6-251b-4f84-98f1-0ff8aa33184a",
      traps: [
        {
          title: "Ionisation and hydrate isomers mixed up",
          body: "Ionisation isomers swap an anion between inside and outside the bracket. Hydrate isomers move water molecules in and out. The textbook calls them similar, but name them correctly.",
        },
        {
          title: "An explanation with no ionisation equations",
          body: "'Explain ionisation isomerism' needs the definition, the pair, and the equation for each showing the different ions in solution. The equations carry marks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-geometric-isomers",
      name: "Geometric (cis and trans) isomers",
      intuition:
        "Two identical ligands on a square or an octahedron can sit next to each other (cis) or across from each other (trans). Same ligands, same bonds, different arrangement in space, so these are stereoisomers. A tetrahedron has every corner next to every other, so it has no cis and trans.",
      definition:
        "- **Stereoisomers** have the same links between atoms but different arrangements in space. They are of two kinds: geometric isomers and optical isomers.\n" +
        "- **Geometric isomers (diastereoisomers):** stereoisomers that are not mirror images of each other. They occur in heteroleptic complexes as cis and trans forms.\n" +
        "- **Cis isomer:** identical ligands occupy adjacent positions. **Trans isomer:** identical ligands occupy opposite positions.\n" +
        "- Cis and trans isomers have different properties. In \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\) the cis isomer is polar (non zero dipole moment), more soluble in water and is the anticancer drug cisplatin; the trans isomer has zero dipole moment (the opposite bond moments cancel) and is physiologically inactive.\n" +
        "- Four coordinate **tetrahedral** complexes do not show cis and trans isomers.",
      table: {
        columns: ["Shape and type", "Example", "Cis and trans?"],
        rows: [
          { cells: ["Square planar \\(\\text{MA}_2\\text{B}_2\\)", "\\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\)", "Yes"] },
          { cells: ["Square planar \\(\\text{MA}_2\\text{BC}\\)", "\\(\\text{[Pt(NH}_3)\\text{(H}_2\\text{O)Cl}_2]\\)", "Yes"] },
          {
            cells: ["Octahedral \\(\\text{MA}_4\\text{B}_2\\)", "\\(\\text{[Co(NH}_3)_4\\text{Cl}_2]^{+}\\)", "Yes"],
            pyqExampleId: "be1a74ae-5e66-4076-b48b-86bb1c05c150",
            noteAmber: "Board 2023 asked for the cis and trans isomers of this ion with the definition of diastereoisomers.",
          },
          { cells: ["Octahedral \\(\\text{MA}_4\\text{BC}\\)", "\\(\\text{[Pt(NH}_3)_4\\text{ClBr]}^{2+}\\)", "Yes"] },
          { cells: ["Octahedral \\(\\text{M(AA)}_2\\text{B}_2\\)", "\\(\\text{[Co(en)}_2\\text{Cl}_2]^{+}\\)", "Yes"] },
          { cells: ["Tetrahedral, four ligands", "\\(\\text{[NiCl}_4]^{2-}\\)", "No"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these show cis and trans isomers: square planar \\(\\text{[PtCl}_2\\text{Br}_2]^{2-}\\), and tetrahedral \\(\\text{[FeCl}_2\\text{(NCS)}_2]^{2-}\\)? Give a reason.",
        steps: [
          "\\(\\text{[PtCl}_2\\text{Br}_2]^{2-}\\) is square planar \\(\\text{MA}_2\\text{B}_2\\): the two Cl can be adjacent or opposite. Yes.",
          "In a tetrahedron every corner is adjacent to every other, so no.",
        ],
        answer: "Only the square planar [PtCl₂Br₂]²⁻",
      },
      practiceSet: [
        { prompt: "Which isomer of \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\) has zero dipole moment?", answer: "The trans isomer" },
        { prompt: "In cisplatin, are the two chloride ligands on adjacent or on opposite corners of the square?", answer: "Adjacent corners" },
        { prompt: "Name the cis isomer of \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\) used as a drug, and the disease it treats.", answer: "Cisplatin; cancer" },
      ],
      pyqExampleId: "be1a74ae-5e66-4076-b48b-86bb1c05c150",
      traps: [
        {
          title: "Calling diastereoisomers mirror images",
          body: "Diastereoisomers (cis and trans forms) are stereoisomers that are NOT mirror images. Mirror image isomers that cannot be superimposed are enantiomers.",
        },
        {
          title: "Cis and trans in a tetrahedral complex",
          body: "A four coordinate complex shows cis and trans only if it is square planar. A tetrahedral complex never does.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-optical-isomers",
      name: "Optical isomers (enantiomers)",
      intuition:
        "Your left and right hands are mirror images, yet you cannot lay one exactly on the other. Some octahedral complexes, especially those with two or three chelate rings, are built like that: the complex and its mirror image are different, like a left handed and a right handed propeller. Such a complex is chiral.",
      definition:
        "- **Enantiomers (optical isomers):** complex molecules or ions that are non superimposable mirror images of each other. Such a complex is **chiral**.\n" +
        "- Enantiomers have identical properties except their response to plane polarised light. The **dextro (d)** isomer rotates the plane to the right (clockwise); the **laevo (l)** isomer rotates it to the left (anticlockwise).\n" +
        "- \\(\\text{[Co(en)}_3]^{3+}\\) exists as a d and l pair.\n" +
        "- In \\(\\text{[PtCl}_2\\text{(en)}_2]^{2+}\\) only the **cis** isomer exists as a pair of enantiomers; the trans isomer is not chiral.\n" +
        "- **Square planar** complexes do not show enantiomers, because they have a mirror plane and an axis of symmetry.\n" +
        "- Drawing an enantiomer: draw the octahedron, then draw its reflection in a mirror placed beside it.",
      table: {
        columns: ["Complex", "Type", "Chiral?"],
        rows: [
          { cells: ["\\(\\text{[Co(en)}_3]^{3+}\\)", "Octahedral \\(\\text{M(AA)}_3\\), three chelate rings", "Yes: d and l forms"] },
          { cells: ["cis \\(\\text{[PtCl}_2\\text{(en)}_2]^{2+}\\)", "Octahedral \\(\\text{M(AA)}_2\\text{B}_2\\), cis", "Yes: d and l forms"] },
          { cells: ["trans \\(\\text{[PtCl}_2\\text{(en)}_2]^{2+}\\)", "Octahedral \\(\\text{M(AA)}_2\\text{B}_2\\), trans", "No: it has a plane of symmetry"] },
          { cells: ["\\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\), cis or trans", "Square planar", "No: the molecular plane is a mirror plane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which form of \\(\\text{[Cr(H}_2\\text{O)}_2\\text{(C}_2\\text{O}_4)_2]^{-}\\), cis or trans, exists as a pair of enantiomers?",
        steps: [
          "It is octahedral \\(\\text{M(AA)}_2\\text{B}_2\\) with oxalate as the bidentate AA.",
          "As for \\(\\text{[PtCl}_2\\text{(en)}_2]^{2+}\\), only the cis form lacks a plane of symmetry.",
        ],
        answer: "The cis form",
      },
      practiceSet: [
        { prompt: "How do the d and l forms of a complex differ?", answer: "The d form rotates the plane of plane polarised light to the right (clockwise), the l form to the left (anticlockwise)" },
        { prompt: "Why does a square planar complex never show enantiomers?", answer: "It has a mirror plane and an axis of symmetry, so its mirror image can be superimposed on it" },
        { prompt: "How many geometric isomers does \\(\\text{[Co(en)}_3]^{3+}\\) have?", answer: "None; it shows only optical isomers (a d and l pair)" },
        { prompt: "Can a complex with only monodentate ligands of two kinds, such as \\(\\text{[Ru(NH}_3)_4\\text{Cl}_2]\\), be chiral? Give a reason.", answer: "No: both its cis and trans forms have a plane of symmetry" },
      ],
      pyqExampleId: "b5892731-6ac4-4f38-a26d-9ffbabece83c",
      traps: [
        {
          title: "Calling every M(AA)₂B₂ form chiral",
          body: "Only the cis form of an \\(\\text{M(AA)}_2\\text{B}_2\\) complex is chiral. The trans form has a plane of symmetry through the metal and is optically inactive.",
        },
      ],
    },
  ],
};
