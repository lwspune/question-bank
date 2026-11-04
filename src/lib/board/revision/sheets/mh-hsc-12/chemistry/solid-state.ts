import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 1 Solid State. Definitions checked against the
 * Balbharati text (wordings are the book's own, trimmed); most-asked years from
 * the 27 board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Solid State",
  chapterSlug: "solid-state",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Crystalline and amorphous solids",
      text: "**Crystalline:** regular, periodic arrangement over a long range; sharp melting point; anisotropic (except cubic). **Amorphous:** particles randomly arranged with only short range order; melt gradually over a temperature range; isotropic. Glass, plastic and rubber are amorphous (supercooled liquids).",
    },
    {
      term: "Isomorphism and polymorphism",
      text: "**Isomorphous:** two or more substances having the same crystal structure, with the same atomic ratio (NaF and MgO; \\(\\ce{NaNO3}\\) and \\(\\ce{CaCO3}\\)). **Polymorphous:** a single substance that exists in two or more crystalline forms (calcite and aragonite). Polymorphism in elements is allotropy.",
    },
    {
      term: "Ionic and covalent network crystals",
      text: "**Ionic:** cations and anions held by electrostatic attraction; hard and brittle, high melting; nonconductors as solids, good conductors when melted or dissolved (NaCl). **Covalent network:** atoms linked by a continuous system of covalent bonds into one giant molecule; hardest, very high melting, poor conductors (diamond, quartz). Graphite is the exception that conducts.",
    },
    {
      term: "Molecular and metallic crystals",
      text: "**Molecular:** molecules held by weak dispersion, dipole-dipole or hydrogen-bond forces; soft, low melting, insulators (solid \\(\\ce{CO2}\\), ice, \\(\\ce{CH4}\\)). **Metallic:** positive ions in a sea of mobile electrons; malleable, ductile, good conductors (Na, Cu, Au).",
    },
    {
      term: "Unit cell",
      text: "The smallest repeating structural unit of a crystalline solid. Its parameters are the edge lengths a, b, c and the angles \\(\\alpha, \\beta, \\gamma\\). There are 7 crystal systems and 14 Bravais lattices.",
    },
    {
      term: "Particles per cubic unit cell",
      text: "A corner particle is shared by 8 cubes (counts \\(\\frac{1}{8}\\)), a face particle by 2 (\\(\\frac{1}{2}\\)), an edge particle by 4 (\\(\\frac{1}{4}\\)); a body-centre particle counts 1. So sc has 1, bcc has 2 and fcc has 4 particles per unit cell.",
    },
    {
      term: "Coordination number",
      text: "The number of neighbouring spheres that touch any given sphere. sc: 6 (four in the same layer, one above, one below). bcc: 8. hcp and ccp/fcc: 12 (six in the layer, three above, three below).",
    },
    {
      term: "Packing efficiency and voids",
      text: "Packing efficiency is the percentage of the total space occupied by the particles: sc 52.4%, bcc 68%, fcc/ccp/hcp 74%. In hcp and ccp, N particles give 2N tetrahedral voids and N octahedral voids.",
    },
    {
      term: "Schottky defect",
      text: "In an ionic solid, equal numbers of cations and anions are missing from their regular positions, creating vacancies. Mass falls, volume stays, so **density decreases**. Found when cation and anion are of similar size: NaCl, KCl, AgBr.",
    },
    {
      term: "Frenkel defect",
      text: "An ion (usually the smaller cation) is missing from its regular lattice site and occupies an interstitial position. A vacancy plus an interstitial defect; **density unchanged**. Needs a large size difference and a low coordination number: ZnS, AgCl, AgBr, AgI, \\(\\ce{CaF2}\\).",
    },
    {
      term: "Impurity defects",
      text: "Foreign atoms in the host lattice. **Substitutional:** foreign atoms take lattice sites in place of host atoms (Zn for Cu in brass; \\(\\ce{Sr^2+}\\) in NaCl leaves one cation vacancy). **Interstitial:** impurity atoms occupy interstitial spaces (C atoms between Fe atoms in steel).",
    },
    {
      term: "F-centre (metal excess defect)",
      text: "When NaCl is heated in sodium vapour, electrons occupy the anion vacancies: these sites are F-centres (colour centres). NaCl shows **yellow** colour; its formula becomes \\(\\ce{Na_{1+x}Cl}\\). ZnO turns yellow on heating for the same kind of reason.",
    },
    {
      term: "n-type and p-type semiconductors",
      text: "**n-type:** a group 15 element (P, As, Sb, Bi) added to Si or Ge; its fifth valence electron is extra, so electrons carry the current. **p-type:** a group 13 element (B, Ga, In) added; one electron short, so holes carry the current. Doping raises conductivity.",
    },
    {
      term: "Magnetic properties",
      text: "**Diamagnetic:** all electrons paired, weakly repelled (NaCl, \\(\\ce{H2O}\\), benzene). **Paramagnetic:** unpaired electrons, weakly attracted (\\(\\ce{O2}\\), \\(\\ce{Cu^2+}\\), \\(\\ce{Fe^3+}\\)). **Ferromagnetic:** a large number of unpaired electrons, strongly attracted (Fe, Co, Ni, \\(\\ce{CrO2}\\)).",
    },
  ],
  formulas: [
    { label: "Particles per unit cell", latex: "n_{sc} = 8 \\times \\tfrac{1}{8} = 1 \\qquad n_{bcc} = 1 + 1 = 2 \\qquad n_{fcc} = 1 + 6 \\times \\tfrac{1}{2} = 4" },
    {
      label: "Density of a cubic crystal",
      latex: "\\rho = \\frac{n\\,M}{a^3\\,N_A}",
      symbols: [
        { symbol: "n", meaning: "particles per unit cell" },
        { symbol: "M", meaning: "molar mass, g/mol" },
        { symbol: "a", meaning: "edge length in cm (1 pm = 10⁻¹⁰ cm)" },
        { symbol: "NA", meaning: "Avogadro number, 6.022 × 10²³ per mol" },
      ],
    },
    { label: "Radius and edge length", latex: "r_{sc} = \\frac{a}{2} \\qquad r_{bcc} = \\frac{\\sqrt{3}\\,a}{4} \\qquad r_{fcc} = \\frac{\\sqrt{2}\\,a}{4} = \\frac{a}{2\\sqrt{2}}" },
    { label: "Packing efficiency", latex: "\\text{PE} = \\frac{n \\times \\frac{4}{3}\\pi r^3}{a^3} \\times 100 \\qquad sc\\ 52.4\\% \\quad bcc\\ 68\\% \\quad fcc\\ 74\\%" },
    { label: "Voids in hcp and ccp", latex: "\\text{tetrahedral} = 2N \\qquad \\text{octahedral} = N" },
  ],
  derivations: [
    {
      title: "Derive the relationship between molar mass, density of the substance and unit cell edge length",
      steps: [
        "Edge length \\(a\\): volume of the unit cell \\(= a^3\\). With \\(n\\) particles of mass \\(m\\) each, mass of the unit cell \\(= n \\times m\\).",
        "Density of the unit cell, which is the density of the substance: \\(\\rho = \\frac{n m}{a^3}\\).",
        "Molar mass \\(M = m \\times N_A\\), so \\(m = \\frac{M}{N_A}\\).",
        "Combine: \\(\\rho = \\frac{n M}{a^3 N_A}\\). Knowing any four of the five quantities gives the fifth.",
      ],
    },
    {
      title: "Packing efficiency of a metal crystal in sc, bcc and fcc lattices",
      steps: [
        "\\(\\text{PE} = \\frac{\\text{volume occupied by particles in unit cell}}{\\text{total volume of unit cell}} \\times 100\\).",
        "sc: spheres touch along the edge, \\(a = 2r\\), \\(n = 1\\). \\(\\text{PE} = \\frac{\\frac{4}{3}\\pi r^3}{8r^3} \\times 100 = \\frac{\\pi}{6} \\times 100 = 52.4\\%\\).",
        "bcc: spheres touch along the body diagonal, \\(\\sqrt{3}a = 4r\\), \\(n = 2\\). \\(\\text{PE} = \\frac{\\sqrt{3}\\pi}{8} \\times 100 = 68\\%\\).",
        "fcc: spheres touch along the face diagonal, \\(\\sqrt{2}a = 4r\\), \\(n = 4\\). \\(\\text{PE} = \\frac{\\pi}{3\\sqrt{2}} \\times 100 = 74\\%\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Schottky defect", labels: ["regular cations and anions", "cation vacancy", "anion vacancy (paired with it)"] },
    { title: "Frenkel defect", labels: ["cation vacancy at its lattice site", "same cation at an interstitial site", "anions undisturbed"] },
    { title: "F-centre in a crystal", labels: ["Na⁺ and Cl⁻ ions", "anion vacancy", "electron trapped in the vacancy (F-centre)"] },
    { title: "bcc and fcc unit cells", labels: ["corner particles", "body-centre particle (bcc)", "face-centre particles (fcc)", "edge a", "body diagonal √3a = 4r (bcc)", "face diagonal √2a = 4r (fcc)"] },
    { title: "Tetrahedral and octahedral voids", labels: ["first layer A", "second layer B in the depressions", "tetrahedral void (4 spheres)", "octahedral void (6 spheres)"] },
    { title: "n-type and p-type semiconductors", labels: ["Si atoms", "P atom with an extra electron (n-type)", "B atom with a hole (p-type)", "valence band and conduction band"] },
  ],
  mostAsked: [
    { topic: "Relation between molar mass, density and edge length: derive it, or use it to find the density or the type of cubic cell", years: [2026, 2025, 2024, 2023] },
    { topic: "Number of particles per unit cell, coordination number, or the formula of a compound from its unit cell", years: [2025, 2024, 2022, 2020, 2017] },
    { topic: "Relation between radius and edge length (sc, bcc, fcc), or a radius from the edge", years: [2026, 2024, 2023] },
    { topic: "Point defects: Schottky, substitutional and interstitial impurity defects, the F-centre colour of NaCl", years: [2026, 2025, 2023] },
    { topic: "Types of solids: crystalline and amorphous, ionic and covalent, molecular", years: [2025, 2024, 2016] },
    { topic: "Define isomorphism, polymorphism or unit cell", years: [2026] },
    { topic: "Impurity added to silicon for an n-type semiconductor", years: [2014] },
  ],
  mistakes: [
    {
      title: "Leaving the edge length in pm",
      body: "Density is asked in g/cm³, so convert first: 1 pm = \\(10^{-10}\\) cm and 408 pm = \\(4.08 \\times 10^{-8}\\) cm. Cube the whole of it: \\(a^3 = 6.79 \\times 10^{-23}\\) cm³.",
    },
    {
      title: "Using the wrong diagonal for the radius",
      body: "Spheres touch along the **edge** in sc (\\(a = 2r\\)), along the **body diagonal** in bcc (\\(\\sqrt{3}a = 4r\\)) and along the **face diagonal** in fcc (\\(\\sqrt{2}a = 4r\\)).",
    },
    {
      title: "Not rounding n when finding the type of cell",
      body: "Solve \\(n = \\frac{\\rho a^3 N_A}{M}\\) and round to the nearest whole number: 1 is sc, 2 is bcc, 4 is fcc. Say the type of cell in words at the end.",
    },
    {
      title: "Counting a corner or face particle as whole",
      body: "A at the face centres and B at the corners gives \\(6 \\times \\frac{1}{2} = 3\\) A and \\(8 \\times \\frac{1}{8} = 1\\) B, so the formula is \\(\\ce{A3B}\\), not \\(\\ce{A6B8}\\).",
    },
    {
      title: "Mixing up the density change in defects",
      body: "Schottky defect **lowers** the density (ions are lost). Frenkel defect leaves it **unchanged** (ions only move). An extra particle at an interstitial site (self interstitial) raises it.",
    },
    {
      title: "Giving 12 as the coordination number of bcc",
      body: "bcc is 8 (the body-centre particle touches the 8 corners). Only hcp and ccp/fcc are 12; sc is 6.",
    },
  ],
};

export default sheet;
