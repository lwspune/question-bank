import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 14 Biomolecules. Statements checked against the
 * Balbharati text; most-asked years from the 32 board past-paper questions in
 * the bank, 2014-2026 (vitamins, hormones and lipids are no longer taught).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Biomolecules",
  chapterSlug: "biomolecules",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 14",
  keyPoints: [
    {
      term: "Carbohydrates",
      text: "Polyhydroxy aldehydes or ketones, or compounds which give rise to such units on hydrolysis. Many can be written as \\(\\ce{C_x(H2O)_y}\\) (hydrates of carbon), e.g. glucose \\(\\ce{C6H12O6}\\). Also called saccharides.",
    },
    {
      term: "Classification of carbohydrates",
      text: "By behaviour on hydrolysis. **Monosaccharides** do not hydrolyse further (glucose, fructose, ribose). **Oligosaccharides** give two to ten monosaccharide units (sucrose, maltose, lactose). **Polysaccharides** give a very large number (starch, cellulose, glycogen).",
    },
    {
      term: "Aldose and ketose",
      text: "A monosaccharide with one aldehydic carbonyl group is an **aldose**; with one ketonic carbonyl group, a **ketose**. Glucose is an aldohexose; fructose is a ketohexose.",
    },
    {
      term: "Anomers of glucose",
      text: "The ring forms by reaction of the \\(\\ce{-CHO}\\) group with the \\(\\ce{-OH}\\) at C-5 (a hemiacetal). The two ring structures differ only in the configuration of C-1: they are the α- and β-**anomers**, and C-1 is the **anomeric carbon**.",
    },
    {
      term: "Reducing and non-reducing sugars",
      text: "The hemiacetal group of glucopyranose is a potential aldehyde, so glucose gives positive Tollens and Fehling tests. Glucose, fructose, maltose and lactose are **reducing** sugars; **sucrose** is non-reducing, as both its anomeric groups are used in the glycosidic bond.",
    },
    {
      term: "Glycosidic linkage in disaccharides",
      text: "**Sucrose**: C-1 of α-glucose to C-2 of β-fructose. **Maltose**: C-1 of one α-glucose to C-4 of another (α-1,4). **Lactose**: C-1 of β-D-galactose to C-4 of glucose (β-1,4).",
    },
    {
      term: "Invert sugar",
      text: "Sucrose (+66.5°) on hydrolysis gives an equimolar mixture of D-(+)-glucose (+52.7°) and D-(-)-fructose (-92.4°). The product is laevorotatory, so the hydrolysis is called inversion of sucrose and the product invert sugar.",
    },
    {
      term: "Polysaccharides",
      text: "**Starch**: polymer of α-D-glucose; amylose (15-20%, water soluble, blue with iodine, α-1,4) and amylopectin (80-85%, branched). **Cellulose**: straight chain of β-glucose, β-1,4 links, not digested by humans. **Glycogen**: like amylopectin but more highly branched; stored in animals.",
    },
    {
      term: "Zwitter ion",
      text: "An α-amino acid has an acidic \\(\\ce{-COOH}\\) and a basic \\(\\ce{-NH2}\\) group. Proton transfer from the acidic group to the basic group forms a salt, a dipolar ion called **zwitter ion**. Hence amino acids are high melting, water soluble crystalline solids.",
    },
    {
      term: "Peptide bond",
      text: "The bond that connects α-amino acids to each other: the \\(\\ce{-CO-NH-}\\) link formed from the \\(\\ce{-COOH}\\) of one and the \\(\\ce{-NH2}\\) of the next, with loss of water. It is a secondary amide. More than ten amino acids give a polypeptide; proteins have more than hundred residues.",
    },
    {
      term: "Types of proteins",
      text: "**Globular**: spherical, coiled chain, usually soluble in water (insulin, egg albumin). **Fibrous**: elongated, rod like, chains held parallel by hydrogen and disulfide bonds, insoluble in water (keratin, myosin).",
    },
    {
      term: "Structure and denaturation of proteins",
      text: "Four levels: primary (sequence of residues), secondary (α-helix, β-pleated sheet, by hydrogen bonds), tertiary, quaternary. **Denaturation**: heat, acid, base or agitation changes the molecular shape without breaking the peptide bonds; biological activity is often lost (boiled egg, curdled milk).",
    },
    {
      term: "Enzymes",
      text: "Biological catalysts; chemically, proteins. Enzyme catalysis is highly specific. Lock-and-key mechanism: the substrate fits the active site, forms an enzyme-substrate complex of very low activation energy, and the products leave.",
    },
    {
      term: "Nucleosides and nucleotides",
      text: "A nucleotide has three components: a sugar (D-ribose in RNA, 2-deoxy-D-ribose in DNA), a nitrogen base and a phosphate group. **Nucleoside** = sugar + base, joined at C-1'. **Nucleotide** = nucleoside + phosphate at the 5'-OH. Uracil occurs only in RNA, thymine only in DNA.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Preparation of glucose from sucrose (cane sugar)",
      steps: [
        "Warm sucrose with dilute HCl or \\(\\ce{H2SO4}\\) for about two hours.",
        "\\(\\ce{C12H22O11 + H2O ->[H+] C6H12O6 (glucose) + C6H12O6 (fructose)}\\)",
        "Add ethanol while cooling: glucose, almost insoluble in alcohol, crystallises out first; filter to get the crystals.",
      ],
    },
    {
      title: "Commercial preparation of glucose from starch",
      steps: [
        "Boil starch with dilute \\(\\ce{H2SO4}\\) at 393 K under 2 to 3 atm pressure.",
        "\\(\\ce{(C6H10O5)_n + nH2O ->[H+][393 K, 2-3 atm] nC6H12O6}\\)",
      ],
    },
    {
      title: "Reactions of glucose that establish its open chain structure",
      steps: [
        "With HI on prolonged heating: n-hexane, so the six carbons form a straight chain.",
        "With hydroxylamine: an oxime; with HCN: a cyanohydrin. So there is one carbonyl group.",
        "With bromine water (mild oxidant): gluconic acid, \\(\\ce{HOOC-(CHOH)4-CH2OH}\\). So the carbonyl is an aldehyde.",
        "With acetic anhydride: glucose pentaacetate. So there are five \\(\\ce{-OH}\\) groups (5 mol anhydride per mol glucose).",
        "With dilute nitric acid: saccharic acid, \\(\\ce{HOOC-(CHOH)4-COOH}\\), the same as from gluconic acid. So there is one primary \\(\\ce{-CH2OH}\\).",
      ],
    },
    {
      title: "Formation of a peptide bond (dipeptide)",
      steps: [
        "The \\(\\ce{-COOH}\\) of one α-amino acid reacts with the \\(\\ce{-NH2}\\) of another, and water is lost.",
        "\\(\\ce{H2N-CH2-COOH + H2N-CH(CH3)-COOH -> H2N-CH2-CO-NH-CH(CH3)-COOH + H2O}\\) (glycine + alanine gives Gly-Ala).",
        "The \\(\\ce{-CO-NH-}\\) link is the peptide bond; a third amino acid gives a tripeptide.",
      ],
    },
    {
      title: "Formation of a nucleoside and a nucleotide",
      steps: [
        "Nucleoside: the anomeric carbon (C-1') of the furanose sugar joins the nitrogen of a base (N-1 of a pyrimidine, N-9 of a purine).",
        "Nucleotide: a phosphate group is added to the 5'-OH of the nucleoside (e.g. AMP, dAMP).",
        "Nucleotides join 3'-OH to 5'-phosphate to give the nucleic acid chain.",
      ],
    },
  ],
  diagrams: [
    { title: "Haworth formula of α- and β-D-glucopyranose", labels: ["ring oxygen", "carbons C-1 to C-6", "anomeric OH at C-1 (down for α, up for β)", "CH2OH at C-5"] },
    { title: "Haworth formula of maltose", labels: ["two α-D-glucopyranose rings", "α-1,4-glycosidic link", "free hemiacetal OH at C-1 of the second ring"] },
    { title: "Zwitter ion and three forms of alanine", labels: ["cation at pH below 2", "zwitter ion near pH 6", "anion at pH 10", "NH3+ and COO- groups"] },
    { title: "Peptide bond", labels: ["COOH of one amino acid", "NH2 of the next", "water lost", "the CO-NH link"] },
    { title: "Nucleoside and nucleotide (D-ribose)", labels: ["furanose sugar with primed numbers", "base at C-1'", "phosphate at 5'-OH", "OH at 2' in ribose, H in deoxyribose"] },
    { title: "Enzyme catalysis (lock and key)", labels: ["enzyme", "active site", "substrate", "enzyme-substrate complex", "products"] },
  ],
  mostAsked: [
    { topic: "Nucleic acids: nucleotides, nucleosides, their components, D-ribose and the bases in DNA and RNA", years: [2026, 2025, 2024, 2023, 2016] },
    { topic: "Reactions of glucose (bromine water, dilute nitric acid, HCN, acetic anhydride) and its chiral carbons", years: [2026, 2025, 2020, 2014] },
    { topic: "Preparation of glucose from sucrose (cane sugar) or from starch", years: [2026, 2025, 2023, 2019, 2017] },
    { topic: "Proteins: classification by molecular shape, denaturation, enzymes", years: [2024, 2020, 2015] },
    { topic: "Peptide bond: what it is and how it is formed", years: [2026, 2025, 2023, 2019] },
    { topic: "Glycosidic linkage in maltose or lactose; reducing and non-reducing sugars", years: [2026, 2024, 2023, 2015] },
    { topic: "Carbohydrates and monosaccharides: definitions, Haworth formula of α-D-glucopyranose", years: [2025, 2020, 2015] },
    { topic: "Zwitter ion: forms of alanine at different pH, amino acids without a chiral centre", years: [2026, 2025, 2024] },
  ],
  mistakes: [
    {
      title: "Calling sucrose a reducing sugar",
      body: "Both anomeric groups (C-1 of glucose, C-2 of fructose) are used in the glycosidic bond, so sucrose gives a negative Tollens test. Maltose and lactose keep a free hemiacetal and are reducing.",
    },
    {
      title: "Mixing up the linkages",
      body: "Maltose and starch: α-1,4. Lactose and cellulose: β-1,4. Sucrose: C-1 of α-glucose to C-2 of β-fructose. Write the carbons and α or β; the board marks the name of the linkage.",
    },
    {
      title: "Saying denaturation breaks peptide bonds",
      body: "Denaturation disturbs the secondary, tertiary or quaternary structure only. The primary structure (the peptide bonds) stays intact.",
    },
    {
      title: "Wrong count of chiral carbons",
      body: "Open chain glucose has four chiral carbons (C-2 to C-5), so \\(2^4 = 16\\) optical isomers. The ring form adds C-1 as a fifth. Glycine has no chiral carbon.",
    },
    {
      title: "Swapping uracil and thymine",
      body: "Uracil occurs only in RNA; thymine only in DNA. In DNA, A pairs with T (two hydrogen bonds) and G with C (three).",
    },
    {
      title: "Writing glucose from sucrose without fructose",
      body: "Hydrolysis of sucrose gives glucose **and** fructose in equal moles; name the acid catalyst and the separation by ethanol.",
    },
  ],
};

export default sheet;
