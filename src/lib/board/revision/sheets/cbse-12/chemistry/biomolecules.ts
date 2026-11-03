import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Chemistry, Biomolecules (NCERT Part II, Ch. 10). Definitions in
 * NCERT's words; most-asked topics and marks from the CBSE board past-paper
 * questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Biomolecules",
  chapterSlug: "biomolecules",
  source: "NCERT Chemistry Part II (CBSE Class 12), Chapter 10",
  keyPoints: [
    {
      term: "Carbohydrates and their classes",
      text: "Optically active polyhydroxy aldehydes or ketones, or compounds that give such units on hydrolysis. **Monosaccharide:** cannot be hydrolysed further (glucose, fructose, ribose). **Oligosaccharide:** gives 2 to 10 monosaccharide units (disaccharides most common). **Polysaccharide:** gives a large number (starch, cellulose, glycogen); not sweet, so non-sugars.",
    },
    {
      term: "Reducing sugars",
      text: "Carbohydrates that reduce **Fehling's solution and Tollens' reagent**. All monosaccharides (aldoses and ketoses) are reducing. In a disaccharide, if the aldehydic or ketonic groups are bonded it is non-reducing (**sucrose**); if one is free it is reducing (**maltose, lactose**).",
    },
    {
      term: "D(+)-glucose",
      text: "**D** gives the relative configuration: the -OH on the lowest asymmetric carbon is on the right, as in (+) glyceraldehyde. **(+)** means dextrorotatory. D and L have no relation with optical activity. Glucose is an aldohexose, also called dextrose.",
    },
    {
      term: "Cyclic structure and anomers",
      text: "The -OH at C-5 adds to the -CHO to form a six-membered cyclic hemiacetal (**pyranose**). α and β forms differ only in the configuration of the -OH at **C1, the anomeric carbon**: they are **anomers**. Fructose forms a five-membered **furanose** ring (C2 anomeric).",
    },
    {
      term: "Disaccharides and invert sugar",
      text: "**Sucrose:** α-D-glucose C1 to β-D-fructose C2; hydrolysis gives glucose (+52.5°) and fructose (-92.4°), so the sign of rotation changes from dextro to laevo: **invert sugar**. **Maltose:** two α-D-glucose, C1 to C4. **Lactose** (milk sugar): β-D-galactose C1 to β-D-glucose C4. A link between two monosaccharides through O is a **glycosidic linkage**.",
    },
    {
      term: "Starch, cellulose and glycogen",
      text: "**Starch** (α-glucose): amylose, water soluble, 15-20%, unbranched C1-C4; amylopectin, insoluble, 80-85%, C1-C4 chain with **C1-C6 branching**. **Cellulose:** straight chain of **β-D-glucose**, C1-C4. **Glycogen** is **animal starch**: like amylopectin but more branched; in liver, muscles and brain.",
    },
    {
      term: "Amino acids",
      text: "Only α-amino acids come from protein hydrolysis. **Neutral, acidic or basic** by the number of -NH2 and -COOH groups. **Non-essential** amino acids can be synthesised in the body; **essential** ones cannot and must come from the diet. All except glycine are optically active; most natural ones are L.",
    },
    {
      term: "Zwitter ion",
      text: "In water the -COOH loses a proton and -NH2 gains one: a dipolar **zwitter ion**, \\(\\ce{H3N+ -CHR-COO-}\\), neutral overall. So amino acids are high melting, water soluble, salt-like and **amphoteric** (react with acids and bases).",
    },
    {
      term: "Peptide linkage; fibrous and globular proteins",
      text: "**Peptide linkage** is an amide -CO-NH- between -COOH of one amino acid and -NH2 of another, losing water. **Fibrous:** chains parallel, held by hydrogen and disulphide bonds, insoluble (keratin, myosin). **Globular:** chains coil into a sphere, usually soluble (insulin, albumins).",
    },
    {
      term: "Structure of proteins",
      text: "**Primary:** the sequence of amino acids. **Secondary:** α-helix (right handed, -NH H-bonded to C=O of the next turn) and β-pleated sheet (chains side by side, intermolecular H-bonds). **Tertiary:** overall folding. **Quaternary:** arrangement of sub-units. 2° and 3° are held by H-bonds, disulphide links, van der Waals and electrostatic forces.",
    },
    {
      term: "Native protein and denaturation",
      text: "A protein with its unique 3D structure and biological activity is **native**. A change in temperature or pH disturbs the hydrogen bonds: globules unfold, helix uncoils, activity is lost. **Secondary and tertiary structures are destroyed; primary stays intact.** Examples: coagulation of egg white on boiling, curdling of milk.",
    },
    {
      term: "Fat soluble and water soluble vitamins",
      text: "**Fat soluble: A, D, E, K**, stored in liver and adipose tissue. **Water soluble: B group and C**, readily excreted in urine, so they **cannot be stored** (except \\(B_{12}\\)) and must be supplied regularly in the diet.",
    },
    {
      term: "Vitamin deficiency diseases",
      text: "A: xerophthalmia, night blindness. \\(B_1\\) (thiamine): beri beri. \\(B_2\\) (riboflavin): cheilosis. \\(B_6\\) (**pyridoxine**): convulsions. \\(B_{12}\\): pernicious anaemia. C (ascorbic acid): scurvy. D: rickets, osteomalacia. E: increased fragility of RBCs, muscular weakness. K: increased blood clotting time.",
    },
    {
      term: "Nucleic acids",
      text: "Polymers of **nucleotides**. Hydrolysis gives a pentose sugar, phosphoric acid and bases. **Nucleoside** = base + sugar (at 1'); **nucleotide** = nucleoside + phosphate (at 5'). Nucleotides are joined by **phosphodiester** links (5' and 3'). DNA: 2-deoxyribose, A G C **T**, double helix; RNA: ribose, A G C **U**, single strand.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Evidence for the open chain structure of glucose",
      steps: [
        "Prolonged heating with HI gives **n-hexane**: all six carbons in a straight chain.",
        "\\(\\ce{HOCH2(CHOH)4CHO + NH2OH -> HOCH2(CHOH)4CH=NOH + H2O}\\) (oxime) and \\(\\ce{HOCH2(CHOH)4CHO + HCN -> HOCH2(CHOH)4CH(OH)CN}\\) (cyanohydrin): a carbonyl group.",
        "Bromine water, a mild oxidant, gives **gluconic acid**, \\(\\ce{HOCH2(CHOH)4COOH}\\): the carbonyl group is an aldehyde.",
        "\\(\\ce{HOCH2(CHOH)4CHO + 5(CH3CO)2O -> CHO(CHOCOCH3)4CH2OCOCH3 + 5CH3COOH}\\): a stable pentaacetate, so five -OH on different carbons.",
        "Nitric acid gives **saccharic acid**, \\(\\ce{HOOC(CHOH)4COOH}\\), as gluconic acid does: a primary alcoholic -OH.",
      ],
    },
    {
      title: "Facts the open chain structure cannot explain",
      steps: [
        "Despite having -CHO, glucose does not give Schiff's test and does not form the hydrogensulphite addition product with \\(\\ce{NaHSO3}\\).",
        "The pentaacetate of glucose does not react with hydroxylamine: no free -CHO.",
        "Glucose exists in two crystalline forms, α (m.p. 419 K) and β (m.p. 423 K).",
        "Explained by the cyclic hemiacetal (C-5 -OH added to -CHO), in equilibrium with the open chain.",
      ],
    },
    {
      title: "Hydrolysis of sucrose (inversion)",
      steps: [
        "\\(\\ce{C12H22O11 + H2O ->[H+] C6H12O6 + C6H12O6}\\): D-(+)-glucose and D-(-)-fructose, equimolar.",
        "Laevorotation of fructose (-92.4°) exceeds dextrorotation of glucose (+52.5°), so the mixture is laevorotatory: invert sugar.",
      ],
    },
    {
      title: "Formation of a dipeptide",
      steps: [
        "The -COOH of glycine combines with the -NH2 of alanine, losing water.",
        "\\(\\ce{H2N-CH2-COOH + H2N-CH(CH3)-COOH -> H2N-CH2-CO-NH-CH(CH3)-COOH + H2O}\\) (glycylalanine).",
        "Three amino acids give a tripeptide; more than ten, a polypeptide; above about a hundred (mass over 10,000 u), a protein.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Haworth structures of α-D-glucose and β-D-glucose (pyranose)",
      labels: ["six-membered ring with one O", "C1 anomeric carbon", "-OH at C1 down (α) or up (β)", "CH2OH at C5"],
    },
    {
      title: "α-Helix structure of proteins (Fig. 10.1)",
      labels: ["right handed helix", "N-H...O=C hydrogen bonds", "R groups pointing outwards"],
    },
    {
      title: "Structure of a nucleoside and a nucleotide (Fig. 10.5)",
      labels: ["base at 1' of sugar", "pentose sugar, primed numbering", "phosphate at 5' (nucleotide)"],
    },
    {
      title: "Double strand helix structure for DNA (Fig. 10.7)",
      labels: ["two strands wound round each other", "sugar-phosphate backbone", "base pairs A=T and G≡C by hydrogen bonds"],
    },
  ],
  mostAsked: [
    {
      topic: "Reactions of glucose and what they prove: HI, NH2OH, HCN, bromine water, HNO3, acetic anhydride; what the open chain cannot explain",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Classification of carbohydrates, reducing sugars, hydrolysis products of sucrose, maltose and lactose, invert sugar, starch, cellulose and glycogen",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Proteins: primary, secondary (α-helix, β-pleated sheet) structure, fibrous and globular, native and denatured proteins",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Vitamins: fat or water soluble, why vitamin C cannot be stored, deficiency diseases",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Nucleic acids: hydrolysis products, nucleoside and nucleotide, phosphodiester link, DNA against RNA, complementary strands",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Cyclic glucose and fructose: anomers, anomeric carbon, pyranose and furanose, Haworth structure, meaning of D and (+)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Amino acids: essential and non-essential, zwitter ion and amphoteric nature, peptide linkage",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Reading D as dextrorotatory",
      body: "In D(+)-glucose, **D** is the configuration (relative to glyceraldehyde) and **(+)** is the dextrorotation. D and L have no relation to the direction of rotation.",
    },
    {
      title: "Calling sucrose a reducing sugar",
      body: "In sucrose both reducing groups (C1 of glucose, C2 of fructose) are in the glycosidic bond: **non-reducing**. Maltose and lactose have a free C1 aldehyde in one unit: **reducing**.",
    },
    {
      title: "Saying denaturation breaks the primary structure",
      body: "Denaturation destroys the **secondary and tertiary** structure (H-bonds broken) and the protein loses its biological activity, but peptide bonds survive: the **primary** structure stays.",
    },
    {
      title: "Mixing up which vitamins are stored",
      body: "A, D, E, K are fat soluble and **stored**. B group and C are water soluble and excreted in urine, so **vitamin C cannot be stored**; \\(B_{12}\\) is the one exception that can.",
    },
    {
      title: "Putting uracil in DNA",
      body: "DNA: β-D-2-deoxyribose with **thymine**. RNA: β-D-ribose with **uracil**. So a DNA nucleotide with thymine hydrolyses to 2-deoxyribose, phosphoric acid and thymine.",
    },
    {
      title: "Confusing nucleoside and nucleotide",
      body: "Nucleoside = base + sugar. Nucleotide = base + sugar + **phosphate**. The strands are complementary because H-bonds form only between specific base pairs (A with T, G with C).",
    },
  ],
};

export default sheet;
