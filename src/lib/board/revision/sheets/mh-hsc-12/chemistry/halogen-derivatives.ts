import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Halogen Derivatives (Balbharati Ch. 10). Definitions and
 * rules in the book's own words; most-asked years from the board past-paper
 * questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Halogen Derivatives",
  chapterSlug: "halogen-derivatives",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 10",
  keyPoints: [
    {
      term: "Classification of monohalogen compounds",
      text: "**Alkyl** halide: X on an sp³ carbon of a saturated chain. **Allylic**: X on an sp³ carbon next to a C=C. **Benzylic**: X on an sp³ carbon bonded to an aromatic ring. **Vinylic**: X on an sp² carbon of a C=C. **Aryl**: X directly on an sp² carbon of the ring.",
    },
    {
      term: "Chiral carbon",
      text: "A carbon atom in a molecule which carries four different groups/atoms. C-2 of 2-chlorobutane carries H, Cl, \\(\\ce{CH3}\\) and \\(\\ce{C2H5}\\), so it is chiral and the molecule is not superimposable on its mirror image.",
    },
    {
      term: "Optical activity",
      text: "The property of a substance by which it rotates the plane of polarization of incident plane polarized light. Rotation to the right: **dextrorotatory** (d or +); to the left: **laevorotatory** (l or \\(-\\)).",
    },
    {
      term: "Enantiomers",
      text: "The optical isomers which are non-superimposable mirror images of each other. They have identical physical properties except the sign of optical rotation: equal magnitude, opposite sign. 2-chlorobutane exists as a pair of enantiomers.",
    },
    {
      term: "Racemic modification",
      text: "An equimolar mixture of enantiomers (d and l). It is **optically inactive**, because the rotation due to one enantiomer is cancelled by the equal and opposite rotation of the other. Written (dl) or (±).",
    },
    {
      term: "Reactivity in nucleophilic substitution",
      text: "Depends on the substitution state of the carbon and the nature of the halogen: tertiary > secondary > primary, and R-I > R-Br > R-Cl. The halogen leaves as halide ion, taking the bond pair: it is the **leaving group**.",
    },
    {
      term: "Ambident nucleophiles",
      text: "Attack through more than one atom. KCN (ionic) attacks through C: **alkyl cyanide**. AgCN (covalent) attacks through N: **isocyanide**. Nitrite ion attacks through O or N: KNO2 gives **alkyl nitrite**, AgNO2 gives **nitroalkane**.",
    },
    {
      term: "Saytzeff rule",
      text: "In dehydrohalogenation reaction, the preferred product is that alkene which has greater number of alkyl groups attached to doubly bonded carbon atoms. So 2-bromobutane gives but-2-ene as the major product.",
    },
    {
      term: "Grignard reagent",
      text: "Alkyl halide with magnesium in dry ether gives alkyl magnesium halide, \\(\\ce{R-X + Mg ->[dry ether] R-Mg-X}\\). It reacts with water or compounds with H on an electronegative atom to give a hydrocarbon: \\(\\ce{CH3MgI + NH3 -> CH4 + Mg(NH2)I}\\).",
    },
    {
      term: "Low reactivity of aryl halides",
      text: "Due to (i) the resonance effect, which gives the C-Cl bond partial double bond character (169 pm in chlorobenzene against 178 pm in an alkyl chloride), and (ii) the sp² hybrid state of the carbon. Electron withdrawing groups at ortho/para raise the reactivity.",
    },
    {
      term: "Halogen in electrophilic substitution",
      text: "Electron density is more at ortho and para positions, so the electrophile attacks there; para usually predominates (steric hindrance at ortho). The -I effect is more powerful than the +R effect, so Cl is o-/p- directing but ring deactivating.",
    },
    {
      term: "Chloroform",
      text: "Colourless liquid with a peculiar sweet smell. Used to prepare the refrigerant R-22, as a solvent for gums, fats and resins, and as a **source of dichlorocarbene**. It depresses the central nervous system.",
    },
    {
      term: "Freons (CFCs)",
      text: "Chlorofluorocarbons, e.g. Freon-12 (\\(\\ce{CCl2F2}\\)): refrigerants, aerosol propellants, solvents, blowing agents for foams. They cause **ozone depletion**: UV breaks the C-Cl bond and one Cl atom can destroy up to 100,000 ozone molecules.",
    },
    {
      term: "DDT",
      text: "Dichlorodiphenyltrichloroethane: colourless, tasteless, odourless insecticide (houseflies, mosquitoes, body lice; malaria and typhus). A persistent organic pollutant: resists metabolism and accumulates in fatty tissues, so its use is banned.",
    },
  ],
  formulas: [
    { label: "SN2 rate law (bimolecular)", latex: "\\text{rate} = k[\\ce{CH3Br}][\\ce{OH-}]" },
    { label: "SN1 rate law (unimolecular)", latex: "\\text{rate} = k[\\ce{(CH3)3CBr}]" },
  ],
  derivations: [
    {
      title: "Mechanism of alkaline hydrolysis of bromomethane (SN2)",
      steps: [
        "\\(\\ce{CH3Br + OH- -> CH3OH + Br-}\\). Rate depends on both reactants: second order, bimolecular.",
        "Single step: bond breaking and bond forming happen simultaneously.",
        "Backside attack: \\(\\ce{OH-}\\) attacks from the side opposite to Br, to avoid steric and electrostatic repulsion.",
        "Transition state: pentacoordinate carbon, three σ bonds in one plane at 120°, partial bonds to OH and Br on a line perpendicular to it.",
        "At a chiral carbon the product has the opposite configuration: **Walden inversion** (like an umbrella flipping).",
      ],
    },
    {
      title: "Mechanism of SN1: hydrolysis of tert-butyl bromide",
      steps: [
        "\\(\\ce{(CH3)3CBr + OH- -> (CH3)3COH + Br-}\\). Rate depends on the substrate only: first order, unimolecular.",
        "Step 1 (slow, reversible): heterolysis of the C-Br bond gives a planar carbocation \\(\\ce{(CH3)3C+}\\).",
        "Step 2 (fast): the nucleophile attacks the carbocation from either side.",
        "At a chiral carbon the product is nearly racemic: **racemization**.",
        "Favoured by tertiary halides (stable carbocation by +I effect and hyperconjugation) and polar protic solvents.",
      ],
    },
    {
      title: "Preparation of alkyl halides from alcohols and alkenes",
      steps: [
        "With thionyl chloride: \\(\\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}\\). By-products are gases, so no separation is needed.",
        "With HBr (Markownikov): \\(\\ce{CH3-CH=CH2 + HBr -> CH3-CHBr-CH3}\\).",
        "With HBr and peroxide (anti-Markownikov): \\(\\ce{CH3-CH=CH2 + HBr ->[peroxide] CH3-CH2-CH2Br}\\).",
      ],
    },
    {
      title: "Halogen exchange: Finkelstein and Swartz reactions",
      steps: [
        "Finkelstein: \\(\\ce{R-Cl + NaI ->[acetone] R-I + NaCl}\\). NaCl precipitates and is filtered off.",
        "Swartz: alkyl chloride or bromide heated with a metal fluoride (AgF, \\(\\ce{Hg2F2}\\), \\(\\ce{AsF3}\\), \\(\\ce{SbF3}\\)): \\(\\ce{CH3Cl + AgF -> CH3F + AgCl}\\).",
        "With mercurous fluoride: \\(\\ce{2CH3Br + Hg2F2 -> 2CH3F + Hg2Br2}\\).",
      ],
    },
    {
      title: "Action of reagents on ethyl bromide (nucleophilic substitution)",
      steps: [
        "Alcoholic KCN: \\(\\ce{C2H5Br + KCN -> C2H5CN + KBr}\\) (ethyl cyanide). Likewise \\(\\ce{CH3Br + KCN -> CH3CN + KBr}\\) (acetonitrile).",
        "Silver nitrite: \\(\\ce{C2H5Br + AgNO2 -> C2H5NO2 + AgBr}\\) (nitroethane). KNO2 gives ethyl nitrite, \\(\\ce{C2H5-O-N=O}\\).",
        "Silver acetate: \\(\\ce{C2H5Br + CH3COOAg -> CH3COOC2H5 + AgBr}\\) (ethyl acetate).",
        "Sodium alkoxide: \\(\\ce{C2H5Br + CH3ONa -> C2H5-O-CH3 + NaBr}\\) (ethyl methyl ether, methoxyethane).",
      ],
    },
    {
      title: "Dehydrohalogenation of 2-chlorobutane",
      steps: [
        "Boil with alcoholic KOH: H leaves from a β-carbon and Cl from the α-carbon.",
        "\\(\\ce{CH3-CHCl-CH2-CH3 ->[alc. KOH] CH3-CH=CH-CH3 + CH2=CH-CH2-CH3}\\).",
        "By Saytzeff rule, but-2-ene (more substituted) is the major product; but-1-ene is the minor one.",
        "Ethyl bromide likewise gives ethene: \\(\\ce{C2H5Br + KOH -> CH2=CH2 + KBr + H2O}\\).",
      ],
    },
    {
      title: "Wurtz, Wurtz-Fittig and Fittig reactions",
      steps: [
        "Wurtz: \\(\\ce{2CH3Br + 2Na ->[dry ether] CH3-CH3 + 2NaBr}\\) (double the carbon atoms).",
        "Wurtz-Fittig: \\(\\ce{C6H5Br + CH3Br + 2Na ->[dry ether] C6H5CH3 + 2NaBr}\\) (bromobenzene to toluene).",
        "Fittig: \\(\\ce{2C6H5Cl + 2Na ->[dry ether] C6H5-C6H5 + 2NaCl}\\) (chlorobenzene to biphenyl).",
      ],
    },
    {
      title: "Electrophilic substitution in chlorobenzene",
      steps: [
        "Halogenation: \\(\\ce{Cl2}\\) with a ferric salt (Lewis acid) gives o- and p-dichlorobenzene.",
        "Nitration: conc. \\(\\ce{HNO3}\\) and conc. \\(\\ce{H2SO4}\\) give 1-chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene (major).",
        "Sulfonation: fuming \\(\\ce{H2SO4}\\) gives 2-chloro and 4-chlorobenzenesulfonic acid (major).",
        "Friedel-Crafts: \\(\\ce{CH3Cl}\\) or \\(\\ce{CH3COCl}\\) with anhydrous \\(\\ce{AlCl3}\\) gives the o- and p- methyl or acetyl products.",
      ],
    },
  ],
  diagrams: [
    { title: "Enantiomers of 2-chlorobutane (non-superimposable mirror images)", labels: ["chiral C-2 marked *", "H, Cl, CH3, C2H5", "mirror plane", "wedge and dashed bonds"] },
    { title: "Fischer projection formula", labels: ["chiral carbon at the cross", "horizontal bonds towards the viewer", "vertical bonds away from the viewer"] },
    { title: "SN2 mechanism", labels: ["backside attack of OH⁻", "transition state with partial bonds", "pentacoordinate carbon", "inversion of configuration"] },
    { title: "SN1 mechanism", labels: ["slow step: planar carbocation", "fast step: attack from either side", "racemic product"] },
    { title: "Structure of DDT", labels: ["two p-chlorophenyl rings", "CH carbon joining them", "CCl3 group"] },
  ],
  mostAsked: [
    {
      topic: "Action of reagents on ethyl bromide or bromomethane (KNO2, AgNO2, silver acetate, Mg, alcoholic KOH), Grignard reagent, or a conversion from it",
      years: [2026, 2025, 2024, 2023, 2022, 2019],
    },
    { topic: "Optical activity of 2-chlorobutane; define enantiomers", years: [2026, 2025, 2024] },
    { topic: "SN1 and SN2 mechanisms: salient features, alkaline hydrolysis of bromomethane, or distinguish them", years: [2026, 2025, 2024, 2014] },
    { topic: "Preparation: alkyl halide from propene (HBr, peroxide) or ethanol (SOCl2), then alkyl cyanide with alcoholic KCN", years: [2026, 2025, 2024] },
    { topic: "Swartz reaction: alkyl fluoride from alkyl chloride or bromide (metal fluorides, mercurous fluoride)", years: [2025, 2020, 2016] },
    { topic: "Reactions of chlorobenzene: nitration, sulfonation (fuming H2SO4), sodium in dry ether", years: [2026, 2023] },
    { topic: "Identify an allylic, benzylic or vinylic halide", years: [2024, 2023] },
    { topic: "Polyhalogen compounds: chloroform as a source of dichlorocarbene, uses and environmental effects of CFC", years: [2026, 2023] },
  ],
  mistakes: [
    {
      title: "Swapping the products of KCN and AgCN, or KNO2 and AgNO2",
      body: "KCN gives the alkyl **cyanide** (R-CN) and AgCN the **isocyanide** (R-NC). KNO2 gives the alkyl **nitrite** (R-O-N=O) and AgNO2 the **nitroalkane** (R-NO2).",
    },
    {
      title: "Swapping inversion and racemization",
      body: "SN2 (one step, backside attack) gives **inversion** of configuration. SN1 (planar carbocation, attack from either side) gives a nearly **racemic** product.",
    },
    {
      title: "Writing but-1-ene as the major product from 2-chlorobutane",
      body: "By Saytzeff rule the more substituted alkene, but-2-ene, is the major product.",
    },
    {
      title: "Mixing up allylic and vinylic, or benzylic and aryl",
      body: "Allylic and benzylic halogens sit on an **sp³** carbon next to the C=C or ring. Vinylic and aryl halogens sit on the **sp²** carbon itself.",
    },
    {
      title: "Calling a racemic mixture optically active",
      body: "A racemic modification contains equal amounts of d and l forms, so the rotations cancel: it is optically **inactive**.",
    },
    {
      title: "Calling Cl an activating group because it is o/p directing",
      body: "Chlorine directs to ortho and para (+R effect) but deactivates the ring (stronger -I effect), so chlorobenzene reacts more slowly than benzene.",
    },
  ],
};

export default sheet;
