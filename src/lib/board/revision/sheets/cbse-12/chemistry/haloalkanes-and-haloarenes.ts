import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Chemistry, Haloalkanes and Haloarenes (NCERT Part II, Ch. 6).
 * Definitions and name reactions in NCERT's words; most-asked topics and marks
 * from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Haloalkanes and Haloarenes",
  chapterSlug: "haloalkanes-and-haloarenes",
  source: "NCERT Chemistry Part II (CBSE Class 12), Chapter 6",
  keyPoints: [
    {
      term: "Allylic, benzylic, vinylic and aryl halides",
      text: "**Allylic:** X on an \\(sp^3\\) carbon next to a C=C. **Benzylic:** X on an \\(sp^3\\) carbon attached to an aromatic ring. **Vinylic:** X on an \\(sp^2\\) carbon of a C=C. **Aryl:** X directly on an \\(sp^2\\) carbon of an aromatic ring.",
    },
    {
      term: "Why thionyl chloride is preferred",
      text: "\\(\\ce{R-OH + SOCl2 -> R-Cl + SO2 + HCl}\\). The two by-products are gases that escape, so the reaction gives **pure alkyl halide**.",
    },
    {
      term: "Boiling points",
      text: "Higher than the parent hydrocarbon (greater polarity and mass). For the same alkyl group: **RI > RBr > RCl > RF** (van der Waals forces grow with the size and mass of the halogen). Boiling points of isomeric haloalkanes **decrease with branching**.",
    },
    {
      term: "Melting point of p-dichlorobenzene",
      text: "Boiling points of isomeric dihalobenzenes are nearly the same, but the **para isomer melts highest**: its symmetry fits better in the crystal lattice.",
    },
    {
      term: "Solubility in water",
      text: "Haloalkanes are very slightly soluble in water: less energy is released by the new haloalkane-water attractions than is needed to break the hydrogen bonds between water molecules. They dissolve in organic solvents.",
    },
    {
      term: "Ambident nucleophiles",
      text: "Groups with two nucleophilic centres, e.g. cyanide and nitrite. **KCN** is ionic, attack is through C, giving **alkyl cyanide** (C-C bond is more stable). **AgCN** is covalent, N donates, giving **isocyanide**. \\(\\ce{KNO2}\\) gives alkyl nitrite (R-O-N=O); \\(\\ce{AgNO2}\\) gives **nitroalkane**.",
    },
    {
      term: "SN2 reaction",
      text: "Second order: rate depends on both alkyl halide and nucleophile. One step, no intermediate; the nucleophile attacks from the side opposite the leaving group. Bulky groups hinder it: **methyl > 1° > 2° > 3°**. Optically active halides give **inversion of configuration**.",
    },
    {
      term: "SN1 reaction",
      text: "First order: rate depends only on the alkyl halide. Two steps: slow ionisation to a **carbocation**, then attack by the nucleophile. Favoured by polar protic solvents. **3° > 2° > 1°**; allylic and benzylic halides are very reactive (resonance stabilised carbocation). Optically active halides give **racemisation**.",
    },
    {
      term: "Chirality and enantiomers",
      text: "Objects non-superimposable on their mirror image are **chiral**; a carbon with four different groups is an asymmetric carbon (stereocentre). Non-superimposable mirror images are **enantiomers**: same physical properties, differing only in the direction they rotate plane polarised light.",
    },
    {
      term: "Racemic mixture and racemisation",
      text: "A mixture of two enantiomers in equal proportions has zero optical rotation: a **racemic mixture**, written dl or (±), e.g. (±)-butan-2-ol. Conversion of an enantiomer into a racemic mixture is **racemisation**. SN1 racemises because the planar carbocation is attacked from either side.",
    },
    {
      term: "Retention and inversion",
      text: "**Retention:** the spatial arrangement of bonds at the asymmetric centre is kept (no bond to it is broken). **Inversion:** the product has the opposite configuration, as in SN2.",
    },
    {
      term: "Saytzeff (Zaitsev) rule",
      text: "In dehydrohalogenation reactions, the preferred product is that alkene which has the **greater number of alkyl groups** attached to the doubly bonded carbon atoms. 2-Bromopentane gives pent-2-ene as the major product.",
    },
    {
      term: "Chlorine is ortho, para directing yet deactivating",
      text: "Chlorine withdraws electrons by inductive effect (net deactivation, slower than benzene) but releases them by **resonance**, which raises electron density at **ortho and para** positions. So substitution is slow and goes ortho and para.",
    },
    {
      term: "Chloroform stored in dark bottles",
      text: "Chloroform is slowly oxidised by air in light to **phosgene** (carbonyl chloride), an extremely poisonous gas: \\(\\ce{2CHCl3 + O2 ->[light] 2COCl2 + 2HCl}\\). So it is stored in closed **dark coloured bottles**, completely filled. DDT is the first chlorinated insecticide; it is not metabolised fast and builds up in fatty tissue.",
    },
  ],
  formulas: [
    { label: "SN2 reactivity (steric hindrance)", latex: "\\mathrm{CH_3X} > 1^\\circ > 2^\\circ > 3^\\circ" },
    { label: "SN1 reactivity (carbocation stability)", latex: "3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3X}" },
    { label: "Leaving group order (both mechanisms)", latex: "\\mathrm{R{-}I} > \\mathrm{R{-}Br} > \\mathrm{R{-}Cl} \\gg \\mathrm{R{-}F}" },
  ],
  derivations: [
    {
      title: "Finkelstein and Swarts reactions",
      steps: [
        "Finkelstein: alkyl chloride or bromide with NaI in dry acetone gives alkyl iodide: \\(\\ce{R-X + NaI ->[dry acetone] R-I + NaX}\\) (X = Cl, Br).",
        "NaCl or NaBr precipitates in dry acetone, which drives the forward reaction (Le Chatelier's principle).",
        "Swarts (best for alkyl fluorides): heat with AgF, \\(\\ce{Hg2F2}\\), \\(\\ce{CoF2}\\) or \\(\\ce{SbF3}\\): \\(\\ce{H3C-Br + AgF -> H3C-F + AgBr}\\).",
      ],
    },
    {
      title: "Wurtz, Wurtz-Fittig and Fittig reactions (sodium in dry ether)",
      steps: [
        "Wurtz: alkyl halide gives an alkane with double the carbons: \\(\\ce{2CH3CH2Br + 2Na ->[dry ether] CH3CH2CH2CH3 + 2NaBr}\\).",
        "Wurtz-Fittig: alkyl halide and aryl halide give an alkylarene: \\(\\ce{C6H5Cl + CH3Cl + 2Na ->[dry ether] C6H5CH3 + 2NaCl}\\).",
        "Fittig: two aryl groups join: \\(\\ce{2C6H5Cl + 2Na ->[dry ether] C6H5-C6H5 + 2NaCl}\\) (chlorobenzene to biphenyl).",
      ],
    },
    {
      title: "Grignard reagent: preparation and why it needs dry conditions",
      steps: [
        "Haloalkane with magnesium in dry ether: \\(\\ce{CH3CH2Br + Mg ->[dry ether] CH3CH2MgBr}\\) (bromobenzene gives \\(\\ce{C6H5MgBr}\\)).",
        "It reacts with any source of proton to give a hydrocarbon: \\(\\ce{RMgX + H2O -> RH + Mg(OH)X}\\).",
        "So even traces of moisture must be avoided: the reaction is carried out in dry ether.",
      ],
    },
    {
      title: "Mechanism of SN2 and SN1 reactions",
      steps: [
        "SN2: \\(\\ce{CH3Cl + OH- -> CH3OH + Cl-}\\); OH attacks from the back, C-O forms as C-Cl breaks in one step; in the transition state the three C-H bonds lie in one plane; configuration inverts.",
        "SN1, step I (slow, rate-determining): \\(\\ce{(CH3)3C-Br -> (CH3)3C+ + Br-}\\).",
        "SN1, step II (fast): \\(\\ce{(CH3)3C+ + OH- -> (CH3)3C-OH}\\). Rate depends only on [alkyl halide].",
      ],
    },
    {
      title: "Why are haloarenes less reactive towards nucleophilic substitution?",
      steps: [
        "Resonance: the lone pair of Cl is in conjugation with the ring, so the C-Cl bond gets partial double bond character and is hard to break.",
        "Hybridisation: C is \\(sp^2\\) (more s-character, more electronegative), so the C-Cl bond is shorter: 169 pm in haloarene against 177 pm in haloalkane.",
        "The phenyl cation is not stabilised by resonance, so SN1 is ruled out.",
        "The electron rich nucleophile is repelled by the electron rich ring.",
      ],
    },
    {
      title: "Replacement by OH, and the effect of -NO2 at ortho and para positions",
      steps: [
        "\\(\\ce{C6H5Cl + 2NaOH ->[623 K, 300 atm] C6H5ONa + NaCl + H2O}\\), then \\(\\ce{C6H5ONa + HCl -> C6H5OH + NaCl}\\).",
        "-NO2 at ortho or para stabilises the carbanion by resonance, so conditions get milder: p-nitrochlorobenzene at 443 K, 2,4-dinitrochlorobenzene at 368 K, 2,4,6-trinitrochlorobenzene with warm water at 322 K.",
        "-NO2 at meta has no such effect: no resonance structure puts the negative charge on the carbon bearing it.",
      ],
    },
    {
      title: "Electrophilic substitution in chlorobenzene",
      steps: [
        "Halogenation: \\(\\ce{C6H5Cl + Cl2 ->[anhyd. FeCl3] ClC6H4Cl + HCl}\\) (1,2- and 1,4-dichlorobenzene, para major).",
        "Nitration with conc. \\(\\ce{HNO3}\\) and conc. \\(\\ce{H2SO4}\\): 1-chloro-2-nitro and 1-chloro-4-nitrobenzene (major).",
        "Friedel-Crafts: \\(\\ce{C6H5Cl + CH3Cl ->[anhyd. AlCl3] ClC6H4CH3 + HCl}\\) (2- and 4-chlorotoluene).",
      ],
    },
    {
      title: "Dehydrohalogenation (beta-elimination) with alcoholic KOH",
      steps: [
        "H from the β-carbon and X from the α-carbon are removed on heating with alcoholic KOH; an alkene forms.",
        "\\(\\ce{CH3CH(Br)CH2CH2CH3 + KOH ->[alc., heat] CH3CH=CHCH2CH3 + KBr + H2O}\\): pent-2-ene is major (Saytzeff), pent-1-ene minor.",
        "With aqueous KOH the same halide gives the alcohol instead (substitution).",
      ],
    },
  ],
  diagrams: [
    {
      title: "SN2 mechanism and its transition state (Fig. 6.2)",
      labels: ["OH- attacking from the back side", "partial bonds HO...C...Cl", "three C-H bonds in one plane", "inverted product (umbrella flip)"],
    },
    {
      title: "A chiral molecule and its mirror image (Fig. 6.7)",
      labels: ["four different groups on carbon", "mirror plane", "non-superimposable images", "wedge and dash bonds"],
    },
  ],
  mostAsked: [
    {
      topic: "SN1 or SN2: which halide reacts faster and why (C4H9Br isomers, allylic and benzylic halides, leaving group)",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Major products: HX addition to alkenes (Markovnikov, peroxide), alcohols with SOCl2 or HBr, ring halogenation, dehydrohalogenation by alcoholic KOH",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Chirality, enantiomers and racemic mixture; inversion in SN2 and racemisation in SN1",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Haloarenes: why less reactive to nucleophilic substitution, effect of -NO2 at ortho or para, and why Cl is ortho, para directing",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Name reactions: Finkelstein, Swarts, Wurtz, Wurtz-Fittig and Fittig; Grignard reagent in dry ether",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Types of halide (allylic, benzylic, vinylic, aryl) and IUPAC names",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Ambident nucleophiles: KCN gives cyanide, AgCN isocyanide, AgNO2 nitroalkane",
      marks: 3,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Boiling points of alkyl halides, melting point of p-dichlorobenzene, solubility in water",
      marks: 1,
      years: [2026, 2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Mixing up KCN and AgCN",
      body: "KCN (ionic) gives **alkyl cyanide** R-CN; AgCN (covalent) gives **isocyanide** R-NC. Likewise \\(\\ce{KNO2}\\) gives alkyl nitrite and \\(\\ce{AgNO2}\\) gives nitroalkane.",
    },
    {
      title: "Writing an alcohol for alcoholic KOH",
      body: "**Aqueous** KOH substitutes (alcohol). **Alcoholic** KOH eliminates (alkene), and the major alkene follows Saytzeff: the more substituted one.",
    },
    {
      title: "Ignoring peroxide in HBr addition",
      body: "Without peroxide, HBr adds by Markovnikov's rule: propene gives 2-bromopropane. **With peroxide**, HBr adds the other way: propene gives 1-bromopropane. (Only HBr shows this.)",
    },
    {
      title: "Giving SN1 inversion or SN2 racemisation",
      body: "SN2: one step, back side attack, **inversion**, second order. SN1: planar carbocation, attack from both sides, **racemisation**, first order. A tertiary halide goes SN1; a primary halide goes SN2.",
    },
    {
      title: "Using Wurtz for chlorobenzene to biphenyl",
      body: "Two aryl halides with Na in dry ether is **Fittig**; aryl halide plus alkyl halide is **Wurtz-Fittig**; two alkyl halides is **Wurtz**. Write 2Na and 2NaX so the equation balances.",
    },
    {
      title: "Saying -NO2 at meta activates haloarenes",
      body: "Only ortho and para -NO2 stabilise the carbanion by resonance. A meta -NO2 has no effect on the rate of nucleophilic substitution.",
    },
  ],
};

export default sheet;
