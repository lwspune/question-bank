import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Chemistry, Ch. 5 Coordination Compounds. Statements checked
 * against the NCERT text (definitions in the book's own words); most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Coordination Compounds",
  chapterSlug: "coordination-compounds",
  source: "NCERT Chemistry Part I (CBSE Class 12), Chapter 5",
  keyPoints: [
    {
      term: "Werner's theory",
      text: "Metals show two types of valences. **Primary** valences are normally ionisable and are satisfied by negative ions (the oxidation state). **Secondary** valences are non ionisable, satisfied by neutral molecules or negative ions; equal to the coordination number and fixed for a metal, with a characteristic spatial arrangement.",
    },
    {
      term: "Double salt and complex",
      text: "Both form from two or more stable compounds in stoichiometric ratio. Double salts (carnallite, Mohr's salt, potash alum) dissociate into simple ions completely in water. Complex ions such as \\(\\ce{[Fe(CN)6]^4-}\\) of \\(\\ce{K4[Fe(CN)6]}\\) do not dissociate into \\(\\ce{Fe^2+}\\) and \\(\\ce{CN-}\\) ions.",
    },
    {
      term: "Coordination sphere, number and oxidation number",
      text: "The central atom and its ligands in square brackets form the coordination sphere; ionisable groups outside are counter ions. Coordination number: the number of ligand donor atoms directly bonded to the metal (sigma bonds only). Oxidation number: the charge left on the metal when ligands are removed with their shared pairs.",
    },
    {
      term: "Denticity and ambidentate ligands",
      text: "Unidentate: one donor atom (\\(\\ce{Cl-}\\), \\(\\ce{H2O}\\), \\(\\ce{NH3}\\)). Didentate: two (en, oxalate). Polydentate: several; \\(\\ce{EDTA^4-}\\) is hexadentate (2 N, 4 O). Ambidentate: can ligate through two different atoms, \\(\\ce{NO2-}\\) (N or O) and \\(\\ce{SCN-}\\) (S or N).",
    },
    {
      term: "Chelate and chelate effect",
      text: "When a di- or polydentate ligand uses its two or more donor atoms simultaneously to bind a single metal ion, it is a chelate ligand. Chelate complexes tend to be more stable than similar complexes containing unidentate ligands: \\(\\ce{[Co(en)3]^3+}\\), \\(\\ce{[Fe(C2O4)3]^3-}\\).",
    },
    {
      term: "Homoleptic and heteroleptic",
      text: "Homoleptic: the metal is bound to only one kind of donor groups, \\(\\ce{[Co(NH3)6]^3+}\\). Heteroleptic: bound to more than one kind of donor groups, \\(\\ce{[Co(NH3)4Cl2]+}\\).",
    },
    {
      term: "IUPAC naming rules",
      text: "Cation first. Ligands in alphabetical order before the metal; anionic ligands end in -o (chlorido, cyanido), neutral ones keep their names except aqua, ammine, carbonyl, nitrosyl. Use bis, tris for ligands with a numerical prefix. Oxidation state in Roman numerals; an anionic complex ends in -ate (ferrate, cobaltate).",
    },
    {
      term: "Geometrical isomerism",
      text: "Arises in heteroleptic complexes from different geometric arrangements of ligands: cis and trans in square planar \\(\\ce{[MX2L2]}\\), octahedral \\(\\ce{[MX2L4]}\\) and \\(\\ce{[MX2(L-L)2]}\\); fac and mer in \\(\\ce{[Ma3b3]}\\). Not possible in tetrahedral complexes: all positions are equivalent.",
    },
    {
      term: "Optical isomerism",
      text: "Optical isomers are mirror images that cannot be superimposed on one another (enantiomers, d and l). Common in octahedral complexes with didentate ligands: \\(\\ce{[Co(en)3]^3+}\\). In \\(\\ce{[PtCl2(en)2]^2+}\\) only the cis isomer is optically active; trans has a mirror plane.",
    },
    {
      term: "Structural isomerism",
      text: "**Linkage:** an ambidentate ligand binds through different atoms (\\(\\ce{-NO2}\\) and \\(\\ce{-ONO}\\)). **Coordination:** ligands interchange between cation and anion, \\(\\ce{[Co(NH3)6][Cr(CN)6]}\\). **Ionisation:** counter ion and ligand swap, \\(\\ce{[Co(NH3)5SO4]Br}\\) and \\(\\ce{[Co(NH3)5Br]SO4}\\). **Solvate (hydrate):** water inside or outside the sphere.",
    },
    {
      term: "Valence bond theory",
      text: "The metal uses \\((n-1)d, ns, np\\) (inner orbital, low spin, \\(d^2sp^3\\)) or \\(ns, np, nd\\) (outer orbital, high spin, \\(sp^3d^2\\)) orbitals for octahedral complexes; \\(sp^3\\) gives tetrahedral and \\(dsp^2\\) square planar. Magnetic data tell the number of unpaired electrons.",
    },
    {
      term: "Crystal field splitting",
      text: "In an octahedral field \\(d_{x^2-y^2}\\) and \\(d_{z^2}\\) (\\(e_g\\)), pointing at the ligands, are raised; \\(d_{xy}, d_{yz}, d_{xz}\\) (\\(t_{2g}\\)) are lowered. The gap is \\(\\Delta_o\\). In a tetrahedral field the splitting is inverted and smaller, \\(\\Delta_t = \\frac{4}{9}\\Delta_o\\), so low spin tetrahedral complexes are rarely observed.",
    },
    {
      term: "Strong and weak field ligands; colour",
      text: "If \\(\\Delta_o > P\\) (strong field), electrons pair in \\(t_{2g}\\): low spin. If \\(\\Delta_o < P\\) (weak field): high spin. Colour comes from a d-d transition: \\(\\ce{[Ti(H2O)6]^3+}\\) absorbs blue-green light (\\(t_{2g}^1 \\to e_g^1\\)) and looks violet; heating removes the water and it turns colourless.",
    },
    {
      term: "Importance",
      text: "Chlorophyll is a complex of magnesium, haemoglobin of iron and vitamin \\(\\ce{B12}\\) (cyanocobalamine) of cobalt. Hardness of water is estimated by titration with \\(\\ce{Na2EDTA}\\). Wilkinson catalyst \\(\\ce{[(Ph3P)3RhCl]}\\) hydrogenates alkenes; gold is extracted as \\(\\ce{[Au(CN)2]-}\\).",
    },
  ],
  formulas: [
    {
      label: "Spin-only magnetic moment",
      latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      symbols: [{ symbol: "n", meaning: "unpaired electrons: 1, 2, 3, 4, 5 give 1.73, 2.83, 3.87, 4.90, 5.92 BM" }],
    },
    { label: "Octahedral splitting", latex: "e_g: +\\tfrac{3}{5}\\Delta_o \\qquad t_{2g}: -\\tfrac{2}{5}\\Delta_o" },
    { label: "Tetrahedral splitting", latex: "\\Delta_t = \\frac{4}{9}\\Delta_o" },
    {
      label: "Spectrochemical series",
      latex: "\\text{I}^- < \\text{Br}^- < \\text{SCN}^- < \\text{Cl}^- < \\text{S}^{2-} < \\text{F}^- < \\text{OH}^- < \\text{C}_2\\text{O}_4^{2-} < \\text{H}_2\\text{O} < \\text{NCS}^- < \\text{edta}^{4-} < \\text{NH}_3 < \\text{en} < \\text{CN}^- < \\text{CO}",
    },
    {
      label: "d4 and d5 in an octahedral field",
      latex: "d^4: t_{2g}^3e_g^1\\ (\\Delta_o < P),\\ t_{2g}^4e_g^0\\ (\\Delta_o > P) \\qquad d^5: t_{2g}^3e_g^2\\ (\\Delta_o < P),\\ t_{2g}^5e_g^0\\ (\\Delta_o > P)",
    },
    {
      label: "Hybridisation and shape",
      latex: "sp^3: \\text{tetrahedral} \\quad dsp^2: \\text{square planar} \\quad d^2sp^3\\ (\\text{inner}),\\ sp^3d^2\\ (\\text{outer}): \\text{octahedral}",
    },
  ],
  derivations: [
    {
      title: "Structure from the moles of AgCl precipitated",
      steps: [
        "Only Cl outside the bracket precipitates as AgCl; the rest of the secondary valency is filled by ligands.",
        "\\(\\ce{CoCl3.6NH3}\\), 3 mol AgCl: \\(\\ce{[Co(NH3)6]Cl3}\\). \\(\\ce{CoCl3.4NH3}\\), 1 mol: \\(\\ce{[Co(NH3)4Cl2]Cl}\\).",
        "\\(\\ce{CrCl3.6H2O}\\): 3 mol gives \\(\\ce{[Cr(H2O)6]Cl3}\\); 2 mol \\(\\ce{[Cr(H2O)5Cl]Cl2.H2O}\\); 1 mol \\(\\ce{[Cr(H2O)4Cl2]Cl.2H2O}\\).",
        "\\(\\ce{PtCl4.2KCl}\\), no AgCl: \\(\\ce{K2[PtCl6]}\\), potassium hexachloridoplatinate(IV).",
      ],
    },
    {
      title: "\\(\\ce{[Co(NH3)6]^3+}\\) is inner orbital and diamagnetic, \\(\\ce{[CoF6]^3-}\\) is outer orbital and paramagnetic",
      steps: [
        "\\(\\ce{Co^3+}\\) is \\(3d^6\\).",
        "\\(\\ce{NH3}\\) (strong field) pairs the six electrons in three 3d orbitals; two empty 3d, one 4s, three 4p give \\(d^2sp^3\\): octahedral, no unpaired electron, diamagnetic.",
        "\\(\\ce{F-}\\) (weak field) leaves four unpaired 3d electrons; 4s, 4p and two 4d give \\(sp^3d^2\\): octahedral, paramagnetic, \\(\\mu = 4.90\\) BM.",
      ],
    },
    {
      title: "\\(\\ce{[NiCl4]^2-}\\) is tetrahedral and paramagnetic, \\(\\ce{[Ni(CN)4]^2-}\\) is square planar and diamagnetic",
      steps: [
        "\\(\\ce{Ni^2+}\\) is \\(3d^8\\).",
        "\\(\\ce{Cl-}\\) (weak field) leaves two unpaired electrons; 4s and three 4p give \\(sp^3\\): tetrahedral, paramagnetic (2.83 BM).",
        "\\(\\ce{CN-}\\) (strong field) pairs the eight electrons in four 3d orbitals; one 3d, 4s and two 4p give \\(dsp^2\\): square planar, diamagnetic.",
      ],
    },
    {
      title: "\\(\\ce{[Fe(CN)6]^3-}\\) is inner orbital and weakly paramagnetic, \\(\\ce{[Fe(H2O)6]^3+}\\) is outer orbital and strongly paramagnetic",
      steps: [
        "\\(\\ce{Fe^3+}\\) is \\(3d^5\\).",
        "\\(\\ce{CN-}\\) pairs four of them, leaving one unpaired: \\(d^2sp^3\\), \\(\\mu = 1.73\\) BM.",
        "\\(\\ce{H2O}\\) is weak: five unpaired electrons stay, \\(sp^3d^2\\), \\(\\mu = 5.92\\) BM.",
      ],
    },
    {
      title: "\\(\\ce{[Ni(CO)4]}\\) is tetrahedral and diamagnetic",
      steps: [
        "Ni(0) is \\(3d^8 4s^2\\); strong field CO pushes the 4s electrons into 3d, giving \\(3d^{10}\\).",
        "Empty 4s and three 4p give \\(sp^3\\): tetrahedral, no unpaired electron, diamagnetic.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Geometrical isomers (cis and trans) of [Pt(NH₃)₂Cl₂] and [Co(NH₃)₄Cl₂]⁺",
      labels: ["cis: two Cl adjacent (90°)", "trans: two Cl opposite (180°)", "square planar Pt, octahedral Co"],
    },
    {
      title: "Optical isomers (d and l) of [Co(en)₃]³⁺ and cis-[PtCl₂(en)₂]²⁺",
      labels: ["mirror plane between the two", "en drawn as a curved didentate link", "non-superimposable images"],
    },
    {
      title: "fac and mer isomers of [Co(NH₃)₃(NO₂)₃]",
      labels: ["fac: three NO₂ on one octahedral face", "mer: three NO₂ round a meridian"],
    },
    {
      title: "d orbital splitting in an octahedral crystal field",
      labels: ["free ion and spherical field levels", "e_g raised by 3/5 Δo", "t₂g lowered by 2/5 Δo", "Δo marked"],
    },
    {
      title: "d orbital splitting in a tetrahedral crystal field",
      labels: ["inverted: t₂ above, e below", "Δt = 4/9 Δo, smaller"],
    },
  ],
  mostAsked: [
    {
      topic: "Werner's theory: primary and secondary valency, moles of AgCl precipitated, conductivity, coordination number and oxidation state of the metal",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "IUPAC names of complexes, or the formula from a name",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Valence bond theory: hybridisation, shape and magnetic behaviour, inner and outer orbital complexes, spin-only magnetic moment",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ligands and terms: didentate, ambidentate and polydentate ligands, chelate effect, homoleptic and heteroleptic complexes, double salt and complex",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Crystal field theory: octahedral and tetrahedral splitting, \\(d^4\\) or \\(d^5\\) with \\(\\Delta_o\\) against \\(P\\), spectrochemical series, colour",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Isomerism: geometrical and optical isomers (draw them), linkage, ionisation, coordination and solvate isomers",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Getting the oxidation state wrong",
      body: "Add up charges: ligand charges (\\(\\ce{Cl-}\\), \\(\\ce{CN-}\\) \\(-1\\); \\(\\ce{C2O4^2-}\\) \\(-2\\); \\(\\ce{NH3}\\), \\(\\ce{H2O}\\), en, CO 0) plus metal equals the charge of the bracket. In \\(\\ce{[Co(en)3]2(SO4)3}\\) each cation is +3, so Co is +3; in \\(\\ce{[Fe(CO)5]}\\) Fe is 0.",
    },
    {
      title: "Counting ligands instead of donor atoms",
      body: "Coordination number counts donor atoms: \\(\\ce{[Co(en)3]^3+}\\) and \\(\\ce{[Fe(C2O4)3]^3-}\\) are 6, \\(\\ce{[Co(en)2Cl2]+}\\) is 6, not 3 or 4. Secondary valency equals the coordination number.",
    },
    {
      title: "Naming slips",
      body: "Ligands go alphabetically by name, ignoring di, tri (ammine before aqua before chlorido). Anionic complexes take -ate: \\(\\ce{K3[Fe(CN)6]}\\) is potassium hexacyanidoferrate(III). Write ammine (\\(\\ce{NH3}\\)) with two m, and nitrito-N or nitrito-O for linkage isomers.",
    },
    {
      title: "Calling trans-\\(\\ce{[Co(en)2Cl2]+}\\) optically active",
      body: "Only the **cis** isomer of \\(\\ce{[M(en)2X2]}\\) is chiral; the trans isomer has a plane of symmetry. Draw both with en as a curved link and show the mirror.",
    },
    {
      title: "Ignoring the ligand field when predicting magnetism",
      body: "Same metal ion, different ligands, different result: \\(\\ce{[Fe(H2O)6]^3+}\\) has 5 unpaired electrons but \\(\\ce{[Fe(CN)6]^3-}\\) has 1. Check the spectrochemical series: CN⁻ and CO are strong, halides and \\(\\ce{H2O}\\) are weak.",
    },
    {
      title: "Writing \\(d^4\\) configurations the wrong way round",
      body: "Weak field (\\(\\Delta_o < P\\)): \\(t_{2g}^3e_g^1\\), high spin. Strong field (\\(\\Delta_o > P\\)): \\(t_{2g}^4e_g^0\\), low spin. Name which case each is.",
    },
  ],
};

export default sheet;
