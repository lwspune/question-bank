import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Isomerism in Coordination Compounds",
  title: "Isomerism in Coordination Compounds: Structural, Geometrical and Optical",
  oneLineDefinition:
    "The four structural isomerisms (linkage, coordination, ionisation, solvate or hydrate) with a test for each, geometrical cis and trans and fac and mer isomers with how many each complex has, and optical isomers of octahedral complexes with didentate ligands.",
  whyItMatters:
    "36 questions, twenty-six of them from board papers from 2023 to 2026. The board asks you to name the type of isomerism shown by a pair of compounds or a complex (2023, 2024, 2025), to name an ionisation isomer (2023), to give a chemical test that tells ionisation isomers apart (2026), to draw the cis and trans isomers of [Co(en)₂Cl₂]⁺, [Pt(en)₂Cl₂]²⁺ or [Pt(NH₃)₂Cl₂]²⁺ (2023, 2024, 2025), to count geometrical isomers or stereoisomers (2026) and to say which isomer is not optically active (2023, 2025). Name the type, then draw or test: both carry marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-structural",
      name: "Structural isomerism: linkage, coordination, ionisation and hydrate",
      intuition:
        "Structural isomers have the same formula but different bonds. Ask what has moved. If an ambidentate ligand now holds on by its other atom, it is linkage. If ligands have swapped between a complex cation and a complex anion, it is coordination. If a ligand and a counter ion have swapped places, it is ionisation. If a water molecule has moved in or out of the sphere, it is hydrate.",
      definition:
        "- **Stereoisomers** have the same formula and the same bonds but a different arrangement in space (geometrical, optical). **Structural isomers** have different bonds (linkage, coordination, ionisation, solvate).\n" +
        "- **Linkage:** a complex with an **ambidentate ligand** binds through a different atom. \\([\\text{Co}(\\text{NH}_3)_5(\\text{NO}_2)]\\text{Cl}_2\\) is red when the nitrite is bound through O (\\(-\\text{ONO}\\)) and yellow when bound through N (\\(-\\text{NO}_2\\)).\n" +
        "- **Coordination:** ligands are **interchanged between a complex cation and a complex anion** of different metals: \\([\\text{Co}(\\text{NH}_3)_6][\\text{Cr}(\\text{CN})_6]\\) and \\([\\text{Cr}(\\text{NH}_3)_6][\\text{Co}(\\text{CN})_6]\\).\n" +
        "- **Ionisation:** the **counter ion is itself a potential ligand** and changes place with a ligand: \\([\\text{Co}(\\text{NH}_3)_5(\\text{SO}_4)]\\text{Br}\\) and \\([\\text{Co}(\\text{NH}_3)_5\\text{Br}]\\text{SO}_4\\). They give different ions in water.\n" +
        "- **Solvate (hydrate):** a solvent molecule is directly bonded to the metal in one and only present in the crystal lattice in the other. With water it is called hydrate isomerism: \\([\\text{Cr}(\\text{H}_2\\text{O})_6]\\text{Cl}_3\\) (violet) and \\([\\text{Cr}(\\text{H}_2\\text{O})_5\\text{Cl}]\\text{Cl}_2\\cdot\\text{H}_2\\text{O}\\) (grey-green).\n" +
        "- **Test for ionisation isomers:** \\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{SO}_4\\) gives a white precipitate of \\(\\text{BaSO}_4\\) with \\(\\text{BaCl}_2\\) and none with \\(\\text{AgNO}_3\\); \\([\\text{Co}(\\text{NH}_3)_5(\\text{SO}_4)]\\text{Cl}\\) gives white AgCl with \\(\\text{AgNO}_3\\) and none with \\(\\text{BaCl}_2\\).",
      table: {
        columns: ["Isomerism", "What changes", "Example pair"],
        rows: [
          {
            cells: ["Linkage", "Donor atom of an ambidentate ligand", "[Co(NH₃)₅(NO₂)]²⁺ and [Co(NH₃)₅(ONO)]²⁺"],
            noteAmber: "Board 2024 asked which ligand can show linkage isomerism: NO₂⁻.",
            pyqExampleId: "3a69ab92-48c0-4424-85e6-d70460285620",
          },
          { cells: ["Coordination", "Ligands swap between the cation and the anion, both complex", "[Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]"] },
          { cells: ["Ionisation", "A ligand and a counter ion swap places", "[Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄"] },
          {
            cells: ["Hydrate (solvate)", "Water inside the sphere or in the crystal lattice", "[Cr(H₂O)₆]Cl₃ and [Cr(H₂O)₅Cl]Cl₂·H₂O"],
            noteAmber: "Board 2023 asked the type for three chromium chloride hydrates: hydrate isomerism.",
            pyqExampleId: "f395d453-a52a-4898-8dce-689e8e87fb37",
          },
        ],
      },
      selfCheckExample: {
        prompt: "What type of isomerism do \\([\\text{Co}(\\text{NH}_3)_5\\text{Br}]\\text{SO}_4\\) and \\([\\text{Co}(\\text{NH}_3)_5(\\text{SO}_4)]\\text{Br}\\) show? Give a test to tell them apart.",
        steps: [
          "Bromide and sulphate have swapped between ligand and counter ion: ionisation isomerism.",
          "\\([\\text{Co}(\\text{NH}_3)_5\\text{Br}]\\text{SO}_4\\) has free sulphate: white precipitate with \\(\\text{BaCl}_2\\).",
          "\\([\\text{Co}(\\text{NH}_3)_5(\\text{SO}_4)]\\text{Br}\\) has free bromide: pale yellow AgBr with \\(\\text{AgNO}_3\\), and no precipitate with \\(\\text{BaCl}_2\\).",
        ],
        answer: "Ionisation isomers; \\(\\text{BaCl}_2\\) precipitates only the first, \\(\\text{AgNO}_3\\) only the second",
      },
      practiceSet: [
        { prompt: "Write the linkage isomer of \\([\\text{Co}(\\text{NH}_3)_5(\\text{NO}_2)]\\text{Cl}_2\\).", answer: "\\([\\text{Co}(\\text{NH}_3)_5(\\text{ONO})]\\text{Cl}_2\\), with the nitrite bound through oxygen" },
        { prompt: "What type of isomerism do \\([\\text{Cr}(\\text{H}_2\\text{O})_6]\\text{Cl}_3\\) and \\([\\text{Cr}(\\text{H}_2\\text{O})_5\\text{Cl}]\\text{Cl}_2\\cdot\\text{H}_2\\text{O}\\) show?", answer: "Hydrate (solvate) isomerism" },
        { prompt: "What must a compound contain to show coordination isomerism?", answer: "Both a complex cation and a complex anion, with different metals, so that ligands can be exchanged between them" },
      ],
      pyqExampleId: "b61e97de-41c2-4fbf-ad66-bd1654b30781",
      traps: [
        {
          title: "Mixing up ionisation and coordination isomerism",
          body: "In ionisation isomers only one ion is a complex, and a ligand trades places with the counter ion. In coordination isomers both ions are complexes and ligands move between the two metals.",
        },
        {
          title: "A test that names one reagent only",
          body: "For ionisation isomers say what each compound gives with the reagent: one precipitates and the other does not. Naming \"AgNO₃ test\" without the two results earns no mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-geometrical",
      name: "Geometrical isomers: cis, trans, fac and mer",
      intuition:
        "Geometrical isomers have the same ligands in different places. In a square or an octahedron two like ligands can sit next to each other (cis) or opposite each other (trans). In a tetrahedron every corner is next to every other corner, so there is no opposite position and no cis or trans.",
      definition:
        "- Geometrical isomerism arises in **heteroleptic** complexes with coordination number 4 (square planar) and 6 (octahedral).\n" +
        "- **Square planar \\([\\text{MX}_2\\text{L}_2]\\):** the two X adjacent (cis) or opposite (trans), as \\([\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]\\). Square planar \\([\\text{MABXL}]\\) gives three isomers: two cis and one trans.\n" +
        "- **Octahedral \\([\\text{MX}_2\\text{L}_4]\\):** cis or trans, as \\([\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]^{+}\\). The same happens with didentate ligands in \\([\\text{MX}_2(\\text{L}-\\text{L})_2]\\), as \\([\\text{CoCl}_2(\\text{en})_2]^{+}\\).\n" +
        "- **Octahedral \\([\\text{Ma}_3\\text{b}_3]\\):** if the three like donor atoms are on one face of the octahedron it is **facial (fac)**; if they lie around a meridian it is **meridional (mer)**, as \\([\\text{Co}(\\text{NH}_3)_3(\\text{NO}_2)_3]\\).\n" +
        "- **Tetrahedral** complexes do not show geometrical isomerism, because the relative positions of the ligands are the same with respect to each other.\n" +
        "- \\([\\text{M(AA)}_3]\\), such as \\([\\text{Cr}(\\text{C}_2\\text{O}_4)_3]^{3-}\\), and \\([\\text{Ma}_5\\text{b}]\\) have no geometrical isomers.\n" +
        "- Drawing: show the octahedron with the six positions, and label cis and trans under each structure.",
      table: {
        columns: ["Type of complex", "Example", "Geometrical isomers"],
        rows: [
          { cells: ["Square planar MX₂L₂", "[Pt(NH₃)₂Cl₂]", "2: cis and trans"] },
          { cells: ["Square planar MABXL", "[Pt(NH₃)(Br)(Cl)(py)]", "3: two cis and one trans"] },
          { cells: ["Octahedral MX₂L₄", "[Co(NH₃)₄Cl₂]⁺", "2: cis and trans"] },
          { cells: ["Octahedral MX₂(L-L)₂", "[CoCl₂(en)₂]⁺", "2: cis and trans"] },
          { cells: ["Octahedral Ma₃b₃", "[Co(NH₃)₃(NO₂)₃]", "2: fac and mer"] },
          { cells: ["Octahedral M(AA)₃ or Ma₅b", "[Cr(C₂O₄)₃]³⁻, [Co(NH₃)₅Cl]²⁺", "None"] },
          { cells: ["Tetrahedral, any", "[Ni(CO)₄]", "None"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many geometrical isomers does \\([\\text{Fe}(\\text{NH}_3)_2(\\text{CN})_4]^{-}\\) have? Describe them.",
        steps: [
          "It is octahedral of the type \\(\\text{MX}_2\\text{L}_4\\), with two \\(\\text{NH}_3\\) and four \\(\\text{CN}^{-}\\).",
          "The two \\(\\text{NH}_3\\) can be adjacent (cis) or opposite (trans).",
        ],
        answer: "Two: cis, with the two NH₃ next to each other, and trans, with them opposite",
      },
      practiceSet: [
        { prompt: "How many geometrical isomers does \\([\\text{Co}(\\text{NH}_3)_3\\text{Cl}_3]\\) have?", answer: "Two: fac and mer" },
        { prompt: "Why do tetrahedral complexes not show geometrical isomerism?", answer: "All four positions are next to one another, so the relative positions of the ligands are the same in every arrangement" },
        { prompt: "Does \\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]^{2+}\\) show geometrical isomerism?", answer: "No: with a single chlorido ligand every position is the same, so there is no cis or trans" },
      ],
      pyqExampleId: "94f990b3-9d23-4c9f-979f-b47120f93587",
      traps: [
        {
          title: "Giving cis and trans to a tetrahedral complex",
          body: "Tetrahedral complexes never show geometrical isomerism. A geometry must be square planar or octahedral before cis and trans mean anything.",
        },
        {
          title: "Counting the optical forms as geometrical isomers",
          body: "\\([\\text{CoCl}_2(\\text{en})_2]^{+}\\) has two geometrical isomers. The cis form also has a mirror image, but that is optical isomerism, counted only when the question asks for stereoisomers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-optical",
      name: "Optical isomers of octahedral complexes",
      intuition:
        "Your left and right hands are mirror images, but you cannot lay one exactly on the other. Three en rings round a metal twist like a propeller, and a propeller twisting left cannot be turned into one twisting right. So the complex exists as two mirror-image forms. The trans isomer is different: it is the same as its own mirror image, so it has no optical isomer.",
      definition:
        "- **Optical isomers** are mirror images that cannot be superimposed on one another. They are called **enantiomers**. A molecule or ion that cannot be superimposed on its mirror image is **chiral**.\n" +
        "- The two forms are **dextro (d)**, which rotates plane polarised light to the right, and **laevo (l)**, which rotates it to the left, in a polarimeter.\n" +
        "- Optical isomerism is common in **octahedral complexes with didentate ligands**: \\([\\text{Co}(\\text{en})_3]^{3+}\\) exists as d and l forms.\n" +
        "- In \\([\\text{PtCl}_2(\\text{en})_2]^{2+}\\) **only the cis isomer** shows optical activity. Likewise cis-\\([\\text{CrCl}_2(\\text{ox})_2]^{3-}\\) is chiral and the trans form is not.\n" +
        "- The trans form of \\([\\text{MX}_2(\\text{L}-\\text{L})_2]\\) has a mirror plane through the two X and the metal, so it is the same as its mirror image.\n" +
        "- **Stereoisomers** = geometrical + optical: for \\([\\text{PtCl}_2(\\text{en})_2]^{2+}\\) these are trans, d-cis and l-cis.",
      table: {
        columns: ["Complex", "Optically active?", "Number of optical forms"],
        rows: [
          { cells: ["[Co(en)₃]³⁺, [Cr(C₂O₄)₃]³⁻", "Yes", "2 (d and l)"] },
          { cells: ["cis-[CoCl₂(en)₂]⁺, cis-[PtCl₂(en)₂]²⁺", "Yes", "2 (d and l)"] },
          { cells: ["trans-[CoCl₂(en)₂]⁺, trans-[PtCl₂(en)₂]²⁺", "No: same as its mirror image", "None"] },
          { cells: ["cis-[CrCl₂(ox)₂]³⁻", "Yes", "2 (d and l)"] },
          { cells: ["trans-[CrCl₂(ox)₂]³⁻", "No", "None"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many stereoisomers does \\([\\text{Cr}(\\text{C}_2\\text{O}_4)_3]^{3-}\\) have?",
        steps: [
          "Three identical didentate ligands: no geometrical isomers.",
          "The three rings form a propeller that is not the same as its mirror image: d and l forms.",
        ],
        answer: "Two stereoisomers, the d and l forms (both optical)",
      },
      practiceSet: [
        { prompt: "Which of cis-\\([\\text{CrCl}_2(\\text{ox})_2]^{3-}\\) and trans-\\([\\text{CrCl}_2(\\text{ox})_2]^{3-}\\) is chiral?", answer: "The cis form" },
        { prompt: "What are enantiomers?", answer: "Optical isomers: mirror images that cannot be superimposed on one another" },
        { prompt: "How many isomers in all does \\([\\text{Co}(\\text{NH}_3)\\text{Cl}(\\text{en})_2]^{2+}\\) have?", answer: "Three: trans, and the d and l forms of cis" },
      ],
      pyqExampleId: "ad4f2a02-ec2c-4b98-961b-009badb1cd29",
      traps: [
        {
          title: "Calling the trans isomer optically active",
          body: "The trans form is the same as its mirror image. A 2023 assertion that trans \\([\\text{CrCl}_2(\\text{ox})_2]^{3-}\\) shows optical isomerism was false while the reason was true: code (D) in Chemistry.",
        },
        {
          title: "Stopping at two when stereoisomers are asked",
          body: "\"Geometrical isomers\" counts cis and trans. \"Stereoisomers\" or \"all isomers\" also counts the d and l forms of each chiral one. Read which the question wants.",
        },
      ],
    },
  ],
};
