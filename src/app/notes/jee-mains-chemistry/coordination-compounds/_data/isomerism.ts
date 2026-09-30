import type { SubtopicNote } from "@/app/notes/_types";

export const ISOMERISM_COORD_NOTE: SubtopicNote = {
  subtopicName: "Isomerism",
  title: "Isomerism in Coordination Compounds",
  oneLineDefinition:
    "Structural isomers differ in which atoms are bonded to the metal; stereoisomers have the same bonds arranged differently in space, as cis–trans or fac–mer geometrical isomers and as non-superimposable mirror-image optical isomers.",
  whyItMatters:
    "Twenty-three PYQs, fifteen of them multiple choice, and two from 2026. Four name a type of structural isomerism; ten count geometrical isomers or pick the complex that shows cis–trans or fac–mer isomerism; nine count optical isomers or total stereoisomers, usually of an octahedral complex with bidentate ligands.",
  concepts: [
    // C1 — structural isomerism
    {
      kind: "reference" as const,
      slug: "jccoord-structural",
      name: "Types of structural isomerism in complexes",
      intuition:
        "Structural isomers have the same formula but different bonds. Either a ligand bonds through a different atom (linkage), or a ligand and a counter-ion swap places (ionisation), or ligands swap between a complex cation and a complex anion (coordination), or water moves between the inner sphere and the crystal (solvate). A simple test tells ionisation isomers apart: each gives a different free ion in water.",
      definition:
        "- **Linkage**: an ambidentate ligand bonds through a different atom: \\(\\mathrm{[Co(NH_3)_5(NO_2)]^{2+}}\\) (nitro, N-bonded, yellow) and \\(\\mathrm{[Co(NH_3)_5(ONO)]^{2+}}\\) (nitrito, O-bonded, red).\n" +
        "- **Ionisation**: a ligand inside and an ion outside the bracket exchange: \\(\\mathrm{[Co(NH_3)_5SO_4]Br}\\) (gives AgBr with \\(\\mathrm{AgNO_3}\\)) and \\(\\mathrm{[Co(NH_3)_5Br]SO_4}\\) (gives \\(\\mathrm{BaSO_4}\\) with \\(\\mathrm{BaCl_2}\\)).\n" +
        "- **Coordination** (NCERT definition): ligands exchange between the cationic and the anionic complex of DIFFERENT metal ions: \\(\\mathrm{[Co(NH_3)_6][Cr(CN)_6]}\\) and \\(\\mathrm{[Cr(NH_3)_6][Co(CN)_6]}\\).\n" +
        "- **Solvate (hydrate)**: water inside versus outside the sphere: \\(\\mathrm{[Cr(H_2O)_6]Cl_3}\\) (violet), \\(\\mathrm{[Cr(H_2O)_5Cl]Cl_2\\cdot H_2O}\\), \\(\\mathrm{[Cr(H_2O)_4Cl_2]Cl\\cdot 2H_2O}\\).",
      table: {
        columns: ["Type", "What changes", "Example pair or member", "How to tell"],
        rows: [
          { cells: ["Linkage", "Donor atom of an ambidentate ligand", "\\(\\mathrm{[Co(NH_3)_5(NO_2)]Cl_2}\\) and \\(\\mathrm{[Co(NH_3)_5(ONO)]Cl_2}\\)", "Colour and infrared spectrum differ"] },
          { cells: ["Ionisation", "Which anion is inside the bracket", "\\(\\mathrm{[Co(NH_3)_5SO_4]Br}\\) and \\(\\mathrm{[Co(NH_3)_5Br]SO_4}\\)", "\\(\\mathrm{AgNO_3}\\) test for the halide, \\(\\mathrm{BaCl_2}\\) test for sulphate"] },
          { cells: ["Coordination", "Which metal holds which ligands", "\\(\\mathrm{[Co(NH_3)_6][Cr(CN)_6]}\\) and \\(\\mathrm{[Cr(NH_3)_6][Co(CN)_6]}\\)", "Needs a complex cation AND a complex anion of different metals"] },
          { cells: ["Solvate (hydrate)", "Water inside or outside the sphere", "\\(\\mathrm{[Cr(H_2O)_6]Cl_3}\\) and \\(\\mathrm{[Cr(H_2O)_5Cl]Cl_2\\cdot H_2O}\\)", "Number of chlorides precipitated by \\(\\mathrm{AgNO_3}\\) (3 and 2)"] },
        ],
        caption: "Ionisation and hydrate isomers are told apart by what precipitates; linkage isomers need an ambidentate ligand.",
      },
      selfCheckExample: {
        prompt: "What type of isomerism relates \\(\\mathrm{[Cr(H_2O)_6]Cl_3}\\) and \\(\\mathrm{[Cr(H_2O)_4Cl_2]Cl\\cdot 2H_2O}\\), and how many moles of AgCl does 1 mol of each give?",
        steps: [
          "The formulas differ only in whether water is a ligand or water of crystallisation, so these are solvate (hydrate) isomers.",
          "The first has three chlorides outside the bracket, the second has one.",
        ],
        answer: "Hydrate isomerism; 3 mol and 1 mol of AgCl.",
      },
      practiceSet: [
        { prompt: "Which isomerism can \\(\\mathrm{[Co(NH_3)_5(SCN)]^{2+}}\\) show because of its thiocyanate?", answer: "Linkage isomerism" },
        { prompt: "Which reagent shows that \\(\\mathrm{[Co(NH_3)_5Br]SO_4}\\) has free sulphate?", answer: "\\(\\mathrm{BaCl_2}\\) (white \\(\\mathrm{BaSO_4}\\))" },
        { prompt: "Can \\(\\mathrm{[Co(NH_3)_6]Cl_3}\\) show coordination isomerism?", answer: "No; it has no complex anion" },
        { prompt: "Name the isomerism between \\(\\mathrm{[Pt(NH_3)_4][CuCl_4]}\\) and \\(\\mathrm{[Cu(NH_3)_4][PtCl_4]}\\).", answer: "Coordination isomerism" },
      ],
      pyqExampleId: "6e15b64f-2738-409b-9041-1169b09d8f25", // 2025 — AgNO3 and BaCl2 tests identify ionisation isomers
      traps: [
        {
          title: "Coordination isomerism needs two different metals",
          body: "NCERT defines coordination isomerism as an exchange of ligands between the cationic and anionic complexes of DIFFERENT metal ions. By that definition \\(\\mathrm{[Co(NH_3)_6][Co(CN)_6]}\\), with cobalt in both ions, is not counted. A 2026 key follows this definition.",
        },
        {
          title: "Ionisation isomers give different ions, not different amounts",
          body: "\\(\\mathrm{[Co(NH_3)_5SO_4]Cl}\\) gives chloride and \\(\\mathrm{[Co(NH_3)_5Cl]SO_4}\\) gives sulphate. If one isomer precipitates with \\(\\mathrm{AgNO_3}\\) and the other with \\(\\mathrm{BaCl_2}\\), the isomerism is ionisation, not linkage or coordination.",
        },
      ],
    },

    // C2 — geometrical isomerism
    {
      kind: "reference" as const,
      slug: "jccoord-geometrical",
      name: "Geometrical isomers of square planar and octahedral complexes",
      intuition:
        "Geometrical isomers differ in which ligands are next to each other (cis, 90° apart) and which are opposite (trans, 180°). A tetrahedron has every corner next to every other, so it never has cis–trans isomers. In an octahedron, three identical ligands can sit on one face (fac) or along a meridian through the metal (mer).",
      definition:
        "- Tetrahedral (sp³) complexes: no geometrical isomers, whatever the ligands.\n" +
        "- Square planar \\(\\mathrm{MA_2B_2}\\) and \\(\\mathrm{MA_2BC}\\): cis and trans, 2 isomers. \\(\\mathrm{MABCD}\\): 3 isomers (fix A; B, C or D can be trans to it).\n" +
        "- Octahedral \\(\\mathrm{MA_4B_2}\\) and \\(\\mathrm{M(AA)_2B_2}\\): cis and trans, 2 isomers.\n" +
        "- Octahedral \\(\\mathrm{MA_3B_3}\\): fac (all B–M–B angles 90°) and mer (B–M–B angles 90° and 180°), 2 isomers.\n" +
        "- \\(\\mathrm{MA_6}\\), \\(\\mathrm{MA_5B}\\) and \\(\\mathrm{M(AA)_3}\\): no geometrical isomers.",
      table: {
        columns: ["Type", "Example", "Geometrical isomers", "Names"],
        rows: [
          { cells: ["Tetrahedral \\(\\mathrm{MABCD}\\)", "An sp³ complex MABXL", "0", "All corners equivalent"] },
          { cells: ["Square planar \\(\\mathrm{MA_2B_2}\\)", "\\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\)", "2", "cis and trans (cisplatin is the cis form)"] },
          { cells: ["Square planar \\(\\mathrm{MABCD}\\)", "\\(\\mathrm{[Pt(py)(NH_3)BrCl]}\\)", "3", "Each of B, C, D trans to A in turn"] },
          { cells: ["Octahedral \\(\\mathrm{MA_4B_2}\\)", "\\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\)", "2", "cis and trans"] },
          { cells: ["Octahedral \\(\\mathrm{MA_3B_3}\\)", "\\(\\mathrm{[Co(NH_3)_3Cl_3]}\\)", "2", "fac and mer"] },
          { cells: ["Octahedral \\(\\mathrm{M(AA)_2B_2}\\)", "\\(\\mathrm{[Co(en)_2Cl_2]^+}\\)", "2", "cis and trans (cis is also chiral)"] },
          { cells: ["Octahedral \\(\\mathrm{M(AA)_3}\\)", "\\(\\mathrm{[Co(en)_3]^{3+}}\\)", "0", "Only optical isomers"] },
          { cells: ["Octahedral \\(\\mathrm{MA_5B}\\)", "\\(\\mathrm{[Co(CN)_5(NC)]^{3-}}\\)", "0", "One odd ligand has only one kind of position"] },
        ],
        caption: "Count geometrical isomers from the formula type; the metal and the ligands' names do not matter.",
      },
      selfCheckExample: {
        prompt: "What are the Cl–Co–Cl bond angles in mer-\\(\\mathrm{[Co(NH_3)_3Cl_3]}\\)?",
        steps: [
          "In the mer isomer the three chlorides lie along a meridian: two are trans to each other and the third is between them.",
          "The two trans chlorides make 180° through cobalt; each makes 90° with the middle one.",
        ],
        answer: "90° and 180°",
      },
      practiceSet: [
        { prompt: "How many geometrical isomers does square planar \\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\) have?", answer: "2" },
        { prompt: "How many geometrical isomers does tetrahedral \\(\\mathrm{[Zn(NH_3)_2Cl_2]}\\) have?", answer: "0" },
        { prompt: "How many geometrical isomers does \\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\) have?", answer: "2 (cis and trans)" },
        { prompt: "Which formula type shows fac–mer isomerism?", answer: "Octahedral \\(\\mathrm{MA_3B_3}\\)" },
      ],
      pyqExampleId: "be7a403d-69e3-4c86-90de-8397e54137b7", // 2023 — which complex can exist as a mer isomer
      traps: [
        {
          title: "Tetrahedral complexes have no cis–trans isomers",
          body: "Every pair of corners of a tetrahedron is adjacent, so no ligand can be trans to another. An sp³ complex MABXL has 0 geometrical isomers, even with four different ligands.",
        },
        {
          title: "Do not count the cis enantiomers as geometrical isomers",
          body: "\\(\\mathrm{[Co(en)_2Cl_2]^+}\\) has 2 geometrical isomers, cis and trans. The cis form also has a mirror image, which makes 3 stereoisomers, but the extra one is an optical isomer.",
        },
        {
          title: "Changing Ni²⁺ to Pt²⁺ changes the geometry",
          body: "\\(\\mathrm{[NiCl_2Br_2]^{2-}}\\) is tetrahedral and paramagnetic with no geometrical isomers. \\(\\mathrm{[PtCl_2Br_2]^{2-}}\\) is square planar, diamagnetic and has cis and trans forms.",
        },
      ],
    },

    // C3 — optical isomerism and total stereoisomers
    {
      kind: "formula" as const,
      slug: "jccoord-optical",
      name: "Optical isomers and total stereoisomers of octahedral complexes",
      intuition:
        "A complex is optically active when it has no mirror plane and no centre of symmetry, so its mirror image cannot be laid on it. Chelate rings wrapped around an octahedron like a propeller do this: the cis forms of \\(\\mathrm{M(AA)_2B_2}\\) and every \\(\\mathrm{M(AA)_3}\\) come as left- and right-handed pairs. To count stereoisomers, list the geometrical isomers first, then double each one that is chiral.",
      definition:
        "- \\(\\mathrm{M(AA)_3}\\), such as \\(\\mathrm{[Co(en)_3]^{3+}}\\) or \\(\\mathrm{[Cr(C_2O_4)_3]^{3-}}\\): one geometrical form, chiral, so 2 stereoisomers (d and l).\n" +
        "- \\(\\mathrm{M(AA)_2B_2}\\) and \\(\\mathrm{M(AA)_2BC}\\): trans is achiral (a mirror plane holds both rings); cis is chiral. Total 3 stereoisomers.\n" +
        "- \\(\\mathrm{MA_3B_3}\\): fac and mer are both achiral, so 2 stereoisomers.\n" +
        "- Square planar complexes are flat and always have a mirror plane: never optically active.",
      formula: {
        label: "Counting stereoisomers",
        latex: "N_{\\text{stereo}} = N_{\\text{achiral geometrical}} + 2\\,N_{\\text{chiral geometrical}}",
      },
      authoredExample: {
        prompt: "How many stereoisomers does \\(\\mathrm{[Co(en)_2Cl_2]^+}\\) have, and how many of them are optically active?",
        steps: [
          "It is an octahedral \\(\\mathrm{M(AA)_2B_2}\\) complex, so it has cis and trans geometrical isomers.",
          "trans: the two chlorides are opposite, and the plane holding both en rings is a mirror plane. It is achiral: 1 form.",
          "cis: no mirror plane and no centre of symmetry. It is chiral: 2 forms (d and l).",
          "Total \\(= 1 + 2 = 3\\); the two cis forms are optically active.",
        ],
        answer: "3 stereoisomers, 2 of them optically active.",
      },
      selfCheckExample: {
        prompt: "Which of these is chiral: trans-\\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\), \\(\\mathrm{[Co(en)_3]^{3+}}\\), cis-\\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\) or fac-\\(\\mathrm{[Co(NH_3)_3Cl_3]}\\)?",
        steps: [
          "trans-\\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\) and fac-\\(\\mathrm{[Co(NH_3)_3Cl_3]}\\) both have mirror planes.",
          "cis-\\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\) is square planar, so its own plane is a mirror plane.",
          "\\(\\mathrm{[Co(en)_3]^{3+}}\\) has three chelate rings in a propeller and no mirror plane.",
        ],
        answer: "\\(\\mathrm{[Co(en)_3]^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "How many optical isomers does \\(\\mathrm{[Co(en)_3]^{3+}}\\) have?", answer: "2" },
        { prompt: "Is trans-\\(\\mathrm{[Co(en)_2Cl_2]^+}\\) optically active?", answer: "No" },
        { prompt: "How many stereoisomers does \\(\\mathrm{[Co(NH_3)_3Cl_3]}\\) have?", answer: "2 (fac and mer, both achiral)" },
        { prompt: "Can a square planar complex be optically active?", answer: "No; its molecular plane is a mirror plane" },
      ],
      pyqExampleId: "f9c869ee-b863-4aee-be31-994c7a411560", // 2023 — stereoisomers of [Cr(ox)2ClBr]3-
      traps: [
        {
          title: "A stereoisomer count includes the optical isomers",
          body: "\\(\\mathrm{[CrCl_2(ox)_2]^{3-}}\\) has 2 geometrical isomers but 3 stereoisomers, because its cis form is chiral. \\(\\mathrm{[CrCl_3(py)_3]}\\) has 2 stereoisomers, since fac and mer are both achiral.",
        },
        {
          title: "Look for the mirror plane, not for four different groups",
          body: "The carbon rule of four different groups does not apply to complexes. cis-\\(\\mathrm{[PtCl_2(en)_2]^{2+}}\\), with only two kinds of ligand, is chiral; trans-\\(\\mathrm{[Co(NH_3)_4Cl_2]^+}\\) is not.",
        },
      ],
    },
  ],
};
