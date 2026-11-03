import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 9 Coordination Compounds. Definitions, naming
 * rules and VBT/CFT descriptions checked against the Balbharati text
 * (wordings are the book's own, trimmed); most-asked years from the 45 board
 * past-paper questions of the chapter in the bank, 2014-2026 (four more lines
 * filed here belong to other chapters and are left out).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Coordination Compounds",
  chapterSlug: "coordination-compounds",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Ligands and their types",
      text: "The species surrounding the central metal atom or ion are **ligands**, linked to it by coordinate bonds; they are Lewis bases (electron pair donors). **Monodentate:** one donor atom (\\(\\ce{Cl-}\\), \\(\\ce{OH-}\\), \\(\\ce{CN-}\\)). **Bidentate:** two (ethylenediamine, oxalate). \\(\\ce{EDTA^4-}\\) binds through four O and two N atoms: it is **hexadentate**.",
    },
    {
      term: "Ambidentate ligand",
      text: "A ligand which has two donor atoms and uses the electron pair of either donor atom to form a coordinate bond with the metal ion. \\(\\ce{NO2-}\\) links through N (nitro) or O (nitrito); \\(\\ce{SCN-}\\) through S (thiocyanato) or N (isothiocyanato).",
    },
    {
      term: "Coordination number",
      text: "The number of ligand donor atoms directly attached to the metal ion, or the number of electron pairs involved in the coordinate bonds. It is 6 in \\(\\ce{[Co(NH3)4Cl2]+}\\), and also 6 in \\(\\ce{[Co(en)3]^3+}\\), since each en has two donor atoms.",
    },
    {
      term: "Charge number and oxidation state",
      text: "The net charge on the complex ion is its **charge number**: the algebraic sum of the charges on the metal ion and the ligands. In \\(\\ce{[Fe(CN)6]^4-}\\), \\(-4 = x + 6(-1)\\), so Fe is +2. In \\(\\ce{[NiCl4]^2-}\\), Ni is +2.",
    },
    {
      term: "Classification of complexes",
      text: "**Homoleptic:** one type of ligand, \\(\\ce{[Co(NH3)6]^3+}\\). **Heteroleptic:** more than one type, \\(\\ce{[Co(NH3)4Cl2]+}\\). **Cationic sphere:** \\(\\ce{[Zn(NH3)4]^2+}\\), \\(\\ce{[Co(NH3)5Cl]SO4}\\). **Anionic sphere:** \\(\\ce{[Ni(CN)4]^2-}\\), \\(\\ce{K3[Fe(CN)6]}\\). **Neutral sphere:** neither cation nor anion, \\(\\ce{[Pt(NH3)2Cl2]}\\), \\(\\ce{[Ni(CO)4]}\\).",
    },
    {
      term: "IUPAC naming",
      text: "Name the cation first. In the complex, name the ligands first, in alphabetical order with di, tri, tetra (bis, tris for names already holding a number), then the metal, as one word, with its oxidation state in Roman numerals: \\(\\ce{[Cu(NH3)4]^2+}\\) is tetraamminecopper(II) ion, \\(\\ce{Na3[AlF6]}\\) sodium hexafluoroaluminate(III).",
    },
    {
      term: "EAN rule",
      text: "EAN is the total number of electrons around the central metal ion. A metal ion continues to accept electron pairs till it attains the configuration of the next noble gas: EAN 18, 36, 54 or 86 obeys the rule. \\(\\ce{[Co(NH3)6]^3+}\\) (36) obeys it; \\(\\ce{[Fe(CN)6]^3-}\\) and \\(\\ce{[Cu(NH3)4]^2+}\\) (35) do not.",
    },
    {
      term: "Geometric isomers (diastereoisomers)",
      text: "Stereoisomers that are **not** mirror images of each other, possible in heteroleptic complexes. **Cis:** identical ligands adjacent; **trans:** opposite. Shown by square planar \\(MA_2B_2\\), \\(MA_2BC\\) and octahedral \\(MA_4B_2\\), \\(MA_4BC\\), \\(M(AA)_2B_2\\); not by tetrahedral complexes. Cis-\\(\\ce{[Pt(NH3)2Cl2]}\\) (cisplatin) is polar and an anticancer drug; the trans isomer is inactive.",
    },
    {
      term: "Optical isomers (enantiomers)",
      text: "Complex molecules or ions that are nonsuperimposable mirror images of each other. They rotate plane-polarised light to the right (dextro, d) or to the left (laevo, l). In \\(\\ce{[PtCl2(en)2]^2+}\\) only the cis isomer exists as a pair of enantiomers. Square planar complexes show none.",
    },
    {
      term: "Structural isomers",
      text: "**Linkage:** \\(\\ce{[Co(NH3)5(NO2)]^2+}\\), \\(\\ce{[Co(NH3)5(ONO)]^2+}\\). **Ionization** (exchange between the two spheres): \\(\\ce{[Co(NH3)5SO4]Br}\\), \\(\\ce{[Co(NH3)5Br]SO4}\\). **Coordination:** \\(\\ce{[Co(NH3)6][Cr(CN)6]}\\), \\(\\ce{[Cr(NH3)6][Co(CN)6]}\\). **Solvate (hydrate):** \\(\\ce{[Cr(H2O)6]Cl3}\\), \\(\\ce{[Cr(H2O)5Cl]Cl2.H2O}\\).",
    },
    {
      term: "Inner and outer orbital complexes",
      text: "In VBT, vacant metal orbitals hybridise and overlap with filled ligand orbitals. If \\((n-1)d\\) orbitals are used (\\(d^2sp^3\\)), the complex is **inner orbital** (low spin); if \\(nd\\) orbitals are used (\\(sp^3d^2\\)), it is **outer orbital** (high spin). Unpaired electrons: paramagnetic; none: diamagnetic.",
    },
    {
      term: "Strong and weak field ligands",
      text: "**Strong field** ligands have C, N or P as donor atoms (\\(\\ce{CN-}\\), CO, \\(\\ce{NH3}\\), EDTA, en): larger splitting, pairing favoured, low spin complexes. **Weak field** ligands have a halogen, O or S as donor (\\(\\ce{F-}\\), \\(\\ce{Cl-}\\), \\(\\ce{SCN-}\\), \\(\\ce{C2O4^2-}\\)): smaller \\(\\Delta_o\\), high spin complexes.",
    },
    {
      term: "Stability of complexes",
      text: "Higher the stability constant K, larger the thermodynamic stability. Stability is governed by (a) the **charge to size ratio** of the metal ion (higher ratio, more stable: Irving-William order \\(\\ce{Cu^2+ > Ni^2+ > Co^2+ > Fe^2+ > Mn^2+ > Cd^2+}\\)) and (b) the **nature of the ligand**: stronger bases form more stable complexes.",
    },
    {
      term: "Applications",
      text: "**Biology:** chlorophyll is a complex of Mg, haemoglobin of iron. **Medicine:** cisplatin treats cancer; EDTA treats lead poisoning. **Hardness of water:** EDTA forms stable complexes with \\(\\ce{Ca^2+}\\) and \\(\\ce{Mg^2+}\\). **Electroplating:** \\(\\ce{K[Ag(CN)2]}\\) and \\(\\ce{K[Au(CN)2]}\\).",
    },
  ],
  formulas: [
    {
      label: "Effective atomic number",
      latex: "\\text{EAN} = Z - X + Y",
      symbols: [
        { symbol: "Z", meaning: "atomic number of the metal" },
        { symbol: "X", meaning: "electrons lost by the metal to form the ion (its oxidation state)" },
        { symbol: "Y", meaning: "electrons donated by the ligands (2 per donor atom)" },
      ],
    },
    {
      label: "EAN values to remember",
      latex:
        "\\ce{[Co(NH3)6]^3+}: 36 \\qquad \\ce{[Fe(CN)6]^4-}: 36 \\qquad \\ce{[Cu(NH3)4]^2+}: 35 \\qquad \\ce{[Fe(CN)6]^3-}: 35",
    },
    {
      label: "Oxidation state from charge number",
      latex: "\\text{charge number} = \\text{O.S. of metal} + \\textstyle\\sum \\text{charges of ligands}",
    },
    {
      label: "Hybridisation and geometry",
      latex:
        "\\text{C.N. } 4:\\ sp^3 \\text{ (tetrahedral)},\\ dsp^2 \\text{ (square planar)} \\qquad \\text{C.N. } 6:\\ d^2sp^3 \\text{ or } sp^3d^2 \\text{ (octahedral)}",
    },
    {
      label: "Stability constant",
      latex: "M^{a} + nL^{x} \\rightleftharpoons [ML_n]^{a+nx} \\qquad K = \\frac{[ML_n]^{a+nx}}{[M^{a}][L^{x}]^n}",
    },
    {
      label: "Octahedral crystal field splitting",
      latex: "e_g: +0.6\\,\\Delta_o \\qquad t_{2g}: -0.4\\,\\Delta_o \\qquad \\Delta_o = 10\\,Dq",
    },
    { label: "Tetrahedral splitting", latex: "\\Delta_t \\approx \\frac{4}{9}\\,\\Delta_o" },
    {
      label: "Spectrochemical series (weak to strong)",
      latex:
        "\\ce{I-} < \\ce{Br-} < \\ce{Cl-} < \\ce{S^2-} < \\ce{F-} < \\ce{OH-} < \\ce{C2O4^2-} < \\ce{H2O} < \\ce{NCS-} < \\text{EDTA} < \\ce{NH3} < \\text{en} < \\ce{CN-} < \\ce{CO}",
    },
    {
      label: "Formulas from names asked by the board",
      latex:
        "\\ce{Na3[Fe(CN)6]} \\text{ sodium hexacyanoferrate(III)} \\qquad \\ce{Na3[Co(NO2)6]} \\text{ sodium hexanitrocobaltate(III)} \\qquad \\ce{[PtBr2(NH3)4]Br2} \\text{ tetraamminedibromoplatinum(IV) bromide}",
    },
  ],
  derivations: [
    {
      title: "Write the postulates of Werner theory of coordination complexes",
      steps: [
        "(i) The metal in a complex has two types of valencies: **primary** (ionizable) and **secondary** (nonionizable).",
        "(ii) The ionizable sphere holds the entities that satisfy the primary valency; these are generally anions.",
        "(iii) The secondary (coordination) sphere holds anions or neutral ligands that satisfy the secondary valencies; they are non-ionizable, and their number equals the coordination number.",
        "(iv) The secondary valencies have a fixed spatial arrangement around the metal ion.",
        "Test: \\(\\ce{[Co(NH3)6]Cl3}\\) gives 3 mol AgCl with excess \\(\\ce{AgNO3}\\). A Co(III) ammine chloride giving 2 mol is \\(\\ce{[Co(NH3)5Cl]Cl2}\\); one giving 1 mol is \\(\\ce{[Co(NH3)4Cl2]Cl}\\).",
      ],
    },
    {
      title: "Explain the formation of \\(\\ce{[Co(NH3)6]^3+}\\) on the basis of VBT",
      steps: [
        "Oxidation state of Co is +3: \\(\\ce{Co^3+}\\) is \\(3d^6\\) (Z = 27).",
        "Six \\(\\ce{NH3}\\) ligands need six vacant orbitals. The complex is low spin, so the 3d electrons pair up before hybridisation, leaving two 3d orbitals empty.",
        "Two 3d, one 4s and three 4p orbitals give six \\(d^2sp^3\\) hybrid orbitals, which take the six \\(\\ce{NH3}\\) lone pairs.",
        "Octahedral, inner orbital, all electrons paired: **diamagnetic**.",
      ],
    },
    {
      title: "Explain the formation of \\(\\ce{[CoF6]^3-}\\) on the basis of VBT",
      steps: [
        "Oxidation state of Co is +3: \\(\\ce{Co^3+}\\) is \\(3d^6\\), with four unpaired electrons.",
        "Six \\(\\ce{F-}\\) ligands need six orbitals. The complex is high spin, so there is no pairing: the 3d configuration stays as in the free ion.",
        "One 4s, three 4p and two 4d orbitals give six \\(sp^3d^2\\) hybrid orbitals, which overlap with six \\(\\ce{F-}\\) orbitals.",
        "Octahedral, outer orbital, four unpaired electrons: **paramagnetic**.",
      ],
    },
    {
      title: "Explain the bonding in \\(\\ce{[NiCl4]^2-}\\) on the basis of VBT",
      steps: [
        "Oxidation state of Ni is +2: \\(\\ce{Ni^2+}\\) is \\(3d^8\\), with two unpaired electrons.",
        "Four \\(\\ce{Cl-}\\) need four orbitals: one 4s and three 4p give \\(sp^3\\) hybrid orbitals; the 3d electrons stay as they are.",
        "Tetrahedral, two unpaired electrons: **paramagnetic**.",
      ],
    },
    {
      title: "Explain the bonding in \\(\\ce{[Ni(CN)4]^2-}\\) on the basis of VBT",
      steps: [
        "Oxidation state of Ni is +2, \\(3d^8\\). The 3d electrons pair up before hybridisation, freeing one 3d orbital.",
        "One 3d, one 4s and two 4p orbitals give four \\(dsp^2\\) hybrid orbitals, which overlap with four \\(\\ce{CN-}\\) orbitals.",
        "Square planar, no unpaired electrons: **diamagnetic**.",
      ],
    },
    {
      title: "Calculate the effective atomic number of the central metal ion",
      steps: [
        "\\(\\text{EAN} = Z - X + Y\\): atomic number, minus the electrons lost (the oxidation state), plus 2 electrons for each donor atom.",
        "\\(\\ce{[Co(NH3)6]^3+}\\): \\(27 - 3 + 12 = 36\\) (Kr), so it obeys the EAN rule. \\(\\ce{[Zn(NH3)4]^2+}\\): \\(30 - 2 + 8 = 36\\).",
        "\\(\\ce{[Fe(CN)6]^4-}\\) (or \\(\\ce{K4[Fe(CN)6]}\\)): Fe is +2, so \\(26 - 2 + 12 = 36\\).",
        "\\(\\ce{[Cu(NH3)4]^2+}\\): \\(29 - 2 + 8 = 35\\), so it does not obey the rule.",
      ],
    },
    {
      title: "Splitting of d orbitals in an octahedral crystal field",
      steps: [
        "In a free metal ion the five d orbitals are degenerate. Ligands, treated as point charges, approach along the x, y and z axes.",
        "\\(e_g\\) (\\(d_{x^2-y^2}\\), \\(d_{z^2}\\)) is repelled more and rises by \\(0.6\\Delta_o\\); \\(t_{2g}\\) (\\(d_{xy}\\), \\(d_{yz}\\), \\(d_{zx}\\)) is lowered by \\(0.4\\Delta_o\\).",
        "\\(\\Delta_o = 10\\,Dq\\). It is larger for strong ligands and for a metal in a higher oxidation state (trivalent more than divalent).",
        "Only \\(d^4\\) to \\(d^7\\) give distinct high spin and low spin configurations.",
      ],
    },
    {
      title: "Explain the colour of \\(\\ce{[Ti(H2O)6]^3+}\\)",
      steps: [
        "\\(\\ce{Ti^3+}\\) is \\(d^1\\); in the octahedral field the electron sits in \\(t_{2g}\\).",
        "Light of energy \\(\\Delta_o\\) (20,300 cm⁻¹, 520 nm) promotes it to \\(e_g\\): a d-d transition.",
        "The complex shows the complementary colour: violet.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Box diagrams for \\(\\ce{[Co(NH3)6]^3+}\\) and \\(\\ce{[CoF6]^3-}\\)",
      labels: ["free Co3+ ion: 3d6, four unpaired", "NH3: 3d paired, d2sp3 boxes", "F⁻: 3d unpaired, sp3d2 boxes (4d used)", "ligand electron pairs in the hybrid boxes", "number of unpaired electrons"],
    },
    {
      title: "Box diagrams for \\(\\ce{[NiCl4]^2-}\\) and \\(\\ce{[Ni(CN)4]^2-}\\)",
      labels: ["free Ni2+ ion: 3d8, two unpaired", "Cl⁻: sp3 boxes, two unpaired", "CN⁻: 3d paired first, dsp2 boxes", "ligand electron pairs in the hybrid boxes"],
    },
    {
      title: "Crystal field splitting in an octahedral complex",
      labels: ["degenerate d orbitals of the free ion", "eg: dx²-y², dz² at +0.6 Δo", "t2g: dxy, dyz, dzx at -0.4 Δo", "Δo = 10 Dq"],
    },
    {
      title: "Splitting of d orbitals in tetrahedral and octahedral complexes",
      labels: ["tetrahedral: dxy, dyz, dzx higher", "tetrahedral: dx²-y², dz² lower", "Δt about 4/9 of Δo", "octahedral: eg higher, t2g lower"],
    },
    {
      title: "Cis and trans isomers of \\(\\ce{[Co(NH3)4Cl2]+}\\)",
      labels: ["Co at the centre of an octahedron", "cis: two Cl adjacent", "trans: two Cl opposite", "four NH3 at the other corners"],
    },
    {
      title: "Classification of isomers in coordination compounds",
      labels: ["stereoisomers: geometric and optical", "structural: linkage, coordination, ionization, solvate"],
    },
  ],
  mostAsked: [
    { topic: "IUPAC name of a complex, or its formula from the name", years: [2026, 2025, 2024, 2023, 2022, 2018, 2016, 2014] },
    {
      topic: "VBT: hybridisation, geometry and magnetic behaviour of \\(\\ce{[Co(NH3)6]^3+}\\), \\(\\ce{[CoF6]^3-}\\), \\(\\ce{[NiCl4]^2-}\\) or \\(\\ce{[Ni(CN)4]^2-}\\)",
      years: [2026, 2025, 2024, 2023, 2018, 2015],
    },
    { topic: "Effective atomic number: define it and calculate it", years: [2026, 2024, 2020, 2019, 2017, 2014] },
    {
      topic: "Define coordination number, ligand or ambidentate ligand; donor atoms of a ligand; oxidation state of the metal",
      years: [2026, 2025, 2018, 2016],
    },
    { topic: "Isomers: linkage, ionisation, hydrate, cis and trans", years: [2026, 2025, 2024, 2023] },
    { topic: "Postulates of Werner theory; moles of precipitate from a complex", years: [2026, 2025, 2024, 2015] },
    { topic: "Homoleptic and heteroleptic; cationic, anionic and neutral complexes", years: [2026, 2024, 2022] },
    { topic: "Uses of complexes in biology and medicine", years: [2026, 2023] },
  ],
  mistakes: [
    {
      title: "Spelling ammine as amine",
      body: "The ligand \\(\\ce{NH3}\\) is **ammine** (double m): tetraamminecopper(II). Water as a ligand is **aqua**, CO is **carbonyl**.",
    },
    {
      title: "Leaving out -ate in an anionic complex",
      body: "When the complex ion is an anion, the metal name ends in -ate: \\(\\ce{K4[Fe(CN)6]}\\) is potassium hexacyanoferrate(II), \\(\\ce{Na3[Co(NO2)6]}\\) sodium hexanitrocobaltate(III). A cationic or neutral complex keeps the plain metal name.",
    },
    {
      title: "Ordering ligands by their prefixes",
      body: "Ligands go in alphabetical order of their names, ignoring di, tri, tetra: tetraaqua comes before dichloro, triammine before trinitro.",
    },
    {
      title: "Forgetting to subtract X in the EAN",
      body: "Subtract the electrons the metal lost (its oxidation state) and add **two** electrons per donor atom: \\(\\ce{[Cu(NH3)4]^2+}\\) is \\(29 - 2 + 8 = 35\\).",
    },
    {
      title: "Counting ligands, not donor atoms",
      body: "\\(\\ce{[Co(en)3]^3+}\\) and \\(\\ce{[Fe(C2O4)3]^3-}\\) have three ligands but six donor atoms: the coordination number is 6, not 3.",
    },
    {
      title: "Mixing up the two cobalt(III) complexes",
      body: "Both are \\(\\ce{Co^3+}\\), \\(3d^6\\), octahedral. With \\(\\ce{NH3}\\) the electrons pair: \\(d^2sp^3\\), inner orbital, diamagnetic. With \\(\\ce{F-}\\) they do not: \\(sp^3d^2\\), outer orbital, four unpaired, paramagnetic.",
    },
  ],
};

export default sheet;
