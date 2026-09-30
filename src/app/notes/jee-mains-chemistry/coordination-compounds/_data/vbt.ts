import type { SubtopicNote } from "@/app/notes/_types";

export const VBT_COORD_NOTE: SubtopicNote = {
  subtopicName: "Hybridization and Magnetism",
  title: "Hybridisation and Magnetism: Valence Bond Theory",
  oneLineDefinition:
    "Valence bond theory reads a complex's hybridisation, shape and magnetism from the metal's d-electron count and the ligand: a strong-field ligand pairs the d electrons and frees inner d orbitals (d²sp³, dsp²), a weak one leaves them unpaired and uses outer d orbitals (sp³d²).",
  whyItMatters:
    "Thirty-two PYQs, twenty-six of them multiple choice, and six from 2026. Thirteen decide between inner-orbital d²sp³ and outer-orbital sp³d² for an octahedral complex; thirteen sort the four-coordinate nickel, platinum and copper complexes by shape and magnetism; six match complexes to their hybridisation or test what valence bond theory cannot explain.",
  concepts: [
    // C1 — inner vs outer orbital octahedral complexes
    {
      kind: "formula" as const,
      slug: "jccoord-inner-outer",
      name: "Inner-orbital and outer-orbital octahedral complexes",
      intuition:
        "Six ligands need six empty orbitals on the metal. If two of the 3d orbitals can be emptied, the metal uses them: 3d + 4s + 4p gives d²sp³, an inner-orbital, low-spin complex. A strong-field ligand such as \\(\\mathrm{CN^-}\\), NH₃ with Co³⁺, en or oxalate with Co³⁺ forces the d electrons to pair and so empties them. A weak-field ligand such as F⁻ or Cl⁻ leaves the electrons spread out, and the metal must use the outer 4d orbitals: sp³d², outer-orbital, high spin.",
      definition:
        "- d¹, d², d³: two 3d orbitals are always empty, so the complex is d²sp³ whatever the ligand (\\(\\mathrm{[Cr(NH_3)_6]^{3+}}\\), 3 unpaired).\n" +
        "- d⁴ to d⁷: the ligand decides. Strong field: d²sp³, electrons paired (\\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) 0 unpaired, \\(\\mathrm{[Fe(CN)_6]^{3-}}\\) 1, \\(\\mathrm{[Mn(CN)_6]^{3-}}\\) 2). Weak field: sp³d², as many unpaired as possible (\\(\\mathrm{[CoF_6]^{3-}}\\) 4, \\(\\mathrm{[FeF_6]^{3-}}\\) 5, \\(\\mathrm{[Fe(H_2O)_6]^{2+}}\\) 4).\n" +
        "- d⁸ octahedral: only one 3d orbital could ever be emptied, so it is always sp³d² with 2 unpaired (\\(\\mathrm{[Ni(NH_3)_6]^{2+}}\\)).\n" +
        "- Low spin = spin paired = inner orbital. High spin = spin free = outer orbital.\n" +
        "- Cobalt(III) is low spin with NH₃, en, oxalate and CN⁻; F⁻ leaves it high spin.",
      formula: {
        label: "Octahedral hybridisation in valence bond theory",
        latex:
          "\\text{strong field: } d^2sp^3 = (n-1)d^2\\,ns\\,np^3 \\;(\\text{inner, low spin}) \\qquad \\text{weak field: } sp^3d^2 = ns\\,np^3\\,nd^2 \\;(\\text{outer, high spin})",
      },
      authoredExample: {
        prompt: "Give the hybridisation, the number of unpaired electrons and the magnetic nature of \\(\\mathrm{[Fe(CN)_6]^{4-}}\\).",
        steps: [
          "\\(x + 6(-1) = -4\\), so iron is +2: \\(\\mathrm{Fe^{2+}}\\) is 3d⁶.",
          "\\(\\mathrm{CN^-}\\) is strong field: the six electrons pair into three 3d orbitals, leaving two 3d orbitals empty.",
          "Two 3d + one 4s + three 4p: d²sp³, inner orbital, octahedral.",
          "No unpaired electron remains, so the complex is diamagnetic.",
        ],
        answer: "d²sp³, 0 unpaired electrons, diamagnetic.",
      },
      selfCheckExample: {
        prompt: "Is \\(\\mathrm{[Cr(NH_3)_6]^{3+}}\\) an inner- or an outer-orbital complex, and how many unpaired electrons does it have?",
        steps: [
          "\\(\\mathrm{Cr^{3+}}\\) is 3d³: three electrons in three separate 3d orbitals.",
          "Two 3d orbitals are empty without any pairing, so the metal uses them: d²sp³.",
          "The three electrons stay unpaired.",
        ],
        answer: "Inner-orbital (d²sp³), 3 unpaired electrons, paramagnetic.",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of \\(\\mathrm{[FeF_6]^{3-}}\\)?", answer: "sp³d² (outer orbital, 5 unpaired)" },
        { prompt: "Is \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) diamagnetic or paramagnetic?", answer: "Diamagnetic (d²sp³, all six electrons paired)" },
        { prompt: "How many unpaired electrons does \\(\\mathrm{[Mn(CN)_6]^{3-}}\\) have?", answer: "2" },
        { prompt: "What is the hybridisation of \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\)?", answer: "d²sp³ (low spin, diamagnetic)" },
      ],
      pyqExampleId: "e397feca-2b5c-4893-8bf6-7010036fd19f", // 2025 — hybridisation and magnetism of [MnCl6]3-
      traps: [
        {
          title: "Spin paired is low spin; spin free is high spin",
          body: "\\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) is a spin-paired (inner-orbital) complex and \\(\\mathrm{[CoF_6]^{3-}}\\) is spin free (outer orbital). Swapping the two terms is the whole of one recurring question.",
        },
        {
          title: "Octahedral nickel(II) is always outer orbital",
          body: "Ni²⁺ is d⁸. Even with ammonia or en, pairing can empty only one 3d orbital, so octahedral nickel(II) complexes are sp³d² with 2 unpaired electrons.",
        },
        {
          title: "Two textbook shortcuts that JEE keys have used",
          body: "Tris(carbonato)cobaltate(III) is, like the oxalato complex, low spin and diamagnetic; a 2026 key treated \\(\\mathrm{K_3[Co(CO_3)_3]}\\) as high spin sp³d² with 4.90 BM. And a 2023 key gave \\(\\mathrm{[Fe(NH_3)_6]^{2+}}\\) as d²sp³, although measured it is high spin. Answer with the key's rule only where the options force it.",
        },
      ],
    },

    // C2 — four-coordinate complexes
    {
      kind: "reference" as const,
      slug: "jccoord-four-coordinate",
      name: "Four-coordinate complexes: tetrahedral or square planar",
      intuition:
        "Four ligands can sit at the corners of a tetrahedron (sp³) or a square (dsp²). Square planar needs one empty 3d orbital, so it belongs to d⁸ ions with a strong-field ligand, and to all d⁸ Pd(II) and Pt(II) complexes. Nickel(0) in Ni(CO)₄ is special: CO pushes the two 4s electrons into 3d, giving 3d¹⁰ and a tetrahedral, diamagnetic complex.",
      definition:
        "- d⁸ + strong field (CN⁻): dsp², square planar, 0 unpaired: \\(\\mathrm{[Ni(CN)_4]^{2-}}\\).\n" +
        "- d⁸ + weak field (Cl⁻, Br⁻, PPh₃ with Cl⁻): sp³, tetrahedral, 2 unpaired: \\(\\mathrm{[NiCl_4]^{2-}}\\), \\(\\mathrm{[Ni(PPh_3)_2Cl_2]}\\).\n" +
        "- 4d⁸ and 5d⁸ (Pd²⁺, Pt²⁺): always square planar and diamagnetic, even with Cl⁻.\n" +
        "- d¹⁰ (Ni(0) in Ni(CO)₄, Cu⁺, Zn²⁺): sp³, tetrahedral, diamagnetic.\n" +
        "- \\(\\mathrm{[Cu(NH_3)_4]^{2+}}\\): Cu²⁺ is d⁹, square planar, 1 unpaired electron, paramagnetic.",
      table: {
        columns: ["Complex", "Metal and d count", "Hybridisation and shape", "Unpaired electrons"],
        rows: [
          { cells: ["\\(\\mathrm{Ni(CO)_4}\\)", "Ni(0), 3d¹⁰ after 4s → 3d", "sp³, tetrahedral", "0 (diamagnetic)"], noteAmber: "Ni(CO)₄ is diamagnetic; a statement calling it paramagnetic is false." },
          { cells: ["\\(\\mathrm{[Ni(CN)_4]^{2-}}\\)", "Ni²⁺, d⁸", "dsp², square planar", "0 (diamagnetic)"] },
          { cells: ["\\(\\mathrm{[NiCl_4]^{2-}}\\)", "Ni²⁺, d⁸", "sp³, tetrahedral", "2 (paramagnetic)"] },
          { cells: ["\\(\\mathrm{[PtCl_4]^{2-}}\\), \\(\\mathrm{[Pt(NH_3)_2Cl_2]}\\)", "Pt²⁺, 5d⁸", "dsp², square planar", "0 (diamagnetic)"] },
          { cells: ["\\(\\mathrm{[Cu(NH_3)_4]^{2+}}\\)", "Cu²⁺, d⁹", "Square planar", "1 (paramagnetic)"] },
          { cells: ["\\(\\mathrm{[Cu(CN)_4]^{3-}}\\)", "Cu⁺, d¹⁰", "sp³, tetrahedral", "0 (diamagnetic)"] },
          { cells: ["\\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\)", "Zn²⁺, d¹⁰", "sp³, tetrahedral", "0 (diamagnetic)"] },
          { cells: ["\\(\\mathrm{[CoCl_4]^{2-}}\\)", "Co²⁺, d⁷", "sp³, tetrahedral", "3 (paramagnetic)"] },
          { cells: ["\\(\\mathrm{[MnBr_4]^{2-}}\\)", "Mn²⁺, d⁵", "sp³, tetrahedral", "5 (paramagnetic)"] },
        ],
        caption: "For a four-coordinate complex decide the shape first; the magnetism follows from it.",
      },
      selfCheckExample: {
        prompt: "Give the shape and the number of unpaired electrons of \\(\\mathrm{[PdCl_4]^{2-}}\\) and of \\(\\mathrm{[NiBr_4]^{2-}}\\).",
        steps: [
          "Both metals are +2 and d⁸.",
          "Pd is a 4d metal, so its d⁸ complexes are square planar (dsp²) even with halides: 0 unpaired.",
          "Ni is a 3d metal and Br⁻ is weak field, so \\(\\mathrm{[NiBr_4]^{2-}}\\) is tetrahedral (sp³): 2 unpaired.",
        ],
        answer: "\\(\\mathrm{[PdCl_4]^{2-}}\\): square planar, 0; \\(\\mathrm{[NiBr_4]^{2-}}\\): tetrahedral, 2.",
      },
      practiceSet: [
        { prompt: "What is the shape of \\(\\mathrm{Ni(CO)_4}\\)?", answer: "Tetrahedral" },
        { prompt: "How many unpaired electrons does \\(\\mathrm{[Ni(CN)_4]^{2-}}\\) have?", answer: "0" },
        { prompt: "Is \\(\\mathrm{K_3[Cu(CN)_4]}\\) diamagnetic?", answer: "Yes; copper is +1, d¹⁰" },
        { prompt: "What is the hybridisation of platinum in cisplatin?", answer: "dsp² (square planar)" },
      ],
      pyqExampleId: "ac784d46-6695-45f8-bea5-b525ffed07ef", // 2026 — magnetism of Ni(CO)4, [Ni(CN)4]2- and [NiCl4]2-
      traps: [
        {
          title: "Ni(CO)₄ and [NiCl₄]²⁻ are both tetrahedral but differ in d count",
          body: "Ni(CO)₄ is nickel(0), 3d¹⁰, diamagnetic. \\(\\mathrm{[NiCl_4]^{2-}}\\) is nickel(II), d⁸, with 2 unpaired electrons. They share a shape, not a configuration.",
        },
        {
          title: "[Ni(CN)₄]²⁻ is dsp², not sp³",
          body: "Cyanide pairs the eight d electrons of Ni²⁺ into four orbitals, which empties one 3d orbital for dsp² bonding. The complex is square planar and diamagnetic.",
        },
      ],
    },

    // C3 — matching hybridisations; limits of VBT
    {
      kind: "reference" as const,
      slug: "jccoord-hybrid-match",
      name: "Hybridisation, geometry and the limits of valence bond theory",
      intuition:
        "Match-list questions pair a complex with a hybridisation and a magnetic character. Fix the coordination number, then the d count, then the ligand strength, and the row is decided. Valence bond theory gives these answers but cannot give numbers: it does not explain colour, it cannot say how strongly paramagnetic a complex is, and it cannot tell strong- from weak-field ligands on its own.",
      definition:
        "- Coordination number 2: sp, linear. 4: sp³ (tetrahedral) or dsp² (square planar). 5: dsp³, trigonal bipyramidal. 6: d²sp³ (inner) or sp³d² (outer), octahedral.\n" +
        "- Limitations of valence bond theory: it makes several assumptions; it gives no quantitative account of magnetic data; it does not explain colour; it gives no quantitative account of the thermodynamic or kinetic stability of complexes; it does not predict whether a four-coordinate complex is tetrahedral or square planar; and it does not distinguish weak- from strong-field ligands.\n" +
        "- Crystal field theory explains colour and magnetism, but it cannot explain the ORDER of the spectrochemical series (why neutral CO is stronger than the anions).",
      table: {
        columns: ["Hybridisation", "Coordination number and shape", "d orbital used", "Example"],
        rows: [
          { cells: ["sp", "2, linear", "None", "\\(\\mathrm{[Ag(NH_3)_2]^+}\\), \\(\\mathrm{[Ag(CN)_2]^-}\\)"] },
          { cells: ["sp³", "4, tetrahedral", "None", "\\(\\mathrm{[MnBr_4]^{2-}}\\), \\(\\mathrm{Ni(CO)_4}\\)"] },
          { cells: ["dsp²", "4, square planar", "Inner \\(3d_{x^2-y^2}\\)", "\\(\\mathrm{[Ni(CN)_4]^{2-}}\\)"] },
          { cells: ["dsp³", "5, trigonal bipyramidal", "Inner \\(3d_{z^2}\\)", "\\(\\mathrm{Fe(CO)_5}\\)"] },
          { cells: ["d²sp³", "6, octahedral (inner orbital)", "Inner \\(3d_{x^2-y^2}\\) and \\(3d_{z^2}\\)", "\\(\\mathrm{[Co(NH_3)_6]^{3+}}\\), \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\)"] },
          { cells: ["sp³d²", "6, octahedral (outer orbital)", "Outer \\(4d_{x^2-y^2}\\) and \\(4d_{z^2}\\)", "\\(\\mathrm{[CoF_6]^{3-}}\\), \\(\\mathrm{[FeF_6]^{3-}}\\)"] },
        ],
        caption: "The d orbitals used are the ones that point at the ligands.",
      },
      selfCheckExample: {
        prompt: "Match each complex to its hybridisation and magnetic character: \\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\), \\(\\mathrm{[Fe(CN)_6]^{3-}}\\), \\(\\mathrm{[PtCl_4]^{2-}}\\), \\(\\mathrm{[Fe(H_2O)_6]^{2+}}\\).",
        steps: [
          "\\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\): d¹⁰, sp³, diamagnetic.",
          "\\(\\mathrm{[Fe(CN)_6]^{3-}}\\): d⁵ with strong-field CN⁻, d²sp³, 1 unpaired, paramagnetic.",
          "\\(\\mathrm{[PtCl_4]^{2-}}\\): 5d⁸, dsp², diamagnetic.",
          "\\(\\mathrm{[Fe(H_2O)_6]^{2+}}\\): d⁶ with weak-field H₂O, sp³d², 4 unpaired, paramagnetic.",
        ],
        answer: "sp³ diamagnetic; d²sp³ paramagnetic; dsp² diamagnetic; sp³d² paramagnetic.",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of iron in \\(\\mathrm{Fe(CO)_5}\\)?", answer: "dsp³ (trigonal bipyramidal)" },
        { prompt: "What is the hybridisation of \\(\\mathrm{[Ag(NH_3)_2]^+}\\)?", answer: "sp (linear)" },
        { prompt: "Does valence bond theory explain the colour of complexes?", answer: "No" },
        { prompt: "Can crystal field theory explain the order of the spectrochemical series?", answer: "No" },
      ],
      pyqExampleId: "9bedef25-e38d-4aa1-9db3-1ad8f26cac16", // 2025 — match complexes to hybridisation and magnetism
      traps: [
        {
          title: "sp³ can be diamagnetic or paramagnetic",
          body: "Hybridisation alone does not fix the magnetism. \\(\\mathrm{Ni(CO)_4}\\) is sp³ and diamagnetic; \\(\\mathrm{[MnBr_4]^{2-}}\\) is sp³ with 5 unpaired electrons. Count the d electrons for each row of a match list.",
        },
        {
          title: "Anionic ligands are not the strongest",
          body: "A pure point-charge picture predicts that anions split the d orbitals most, yet halides sit at the weak end of the series and neutral CO at the strong end. So the statement that crystal field theory explains the strength of anionic ligands is false.",
        },
      ],
    },
  ],
};
