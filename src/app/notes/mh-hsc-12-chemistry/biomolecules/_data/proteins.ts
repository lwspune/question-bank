import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_BM_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Proteins",
  title: "Proteins: Amino Acids, Peptide Bonds, Structure and Enzymes",
  oneLineDefinition:
    "The α-amino acids and their zwitter ion, how peptide bonds join them, globular and fibrous proteins, the four levels of protein structure and denaturation, and enzymes as biological catalysts.",
  whyItMatters:
    "21 questions, ten of them from board papers from 2015 to 2026. The board asks for the peptide bond and how it forms (2023, 2025 and 2026), denaturation (2020 and 2024), the classification of proteins by shape (2015 and 2024), the amino acid with no chiral centre (2024), the forms of alanine at low and high pH (2026) and what enzymes are (2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccbm-amino-acids",
      name: "α-Amino acids and the zwitter ion",
      intuition:
        "An α-amino acid carries an acid group and a base group on the same small molecule, so it neutralises itself: the proton of the -COOH hops onto the -NH₂. The result is an ion with a plus end and a minus end but no overall charge. That one fact explains why amino acids behave like salts, and why their form changes with the pH of the solution.",
      definition:
        "- Proteins on complete hydrolysis give **\\(\\alpha\\)-amino acids**: carboxylic acids with an amino (-NH₂) group on the \\(\\alpha\\)-carbon, the carbon next to the -COOH group. General formula \\(\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH}\\), where R is the side chain.\n" +
        "- The \\(\\alpha\\)-carbon is chiral in every \\(\\alpha\\)-amino acid except glycine (R = H). The \\(\\alpha\\)-amino acids obtained from proteins have the L configuration.\n" +
        "- If R contains a -COOH group, the amino acid is **acidic**; if R contains an amino group, it is **basic**; the others are **neutral**.\n" +
        "- **Essential amino acids:** ten of the twenty \\(\\alpha\\)-amino acids commonly found in proteins cannot be made in the human body and must come from the diet (for example valine, leucine, tryptophan, lysine).\n" +
        "- **Zwitter ion:** a proton moves from the acidic -COOH to the basic -NH₂ of the same molecule, giving a dipolar ion. This salt-like structure makes \\(\\alpha\\)-amino acids high melting, water soluble crystalline solids, unlike simple amines or carboxylic acids.\n" +
        "- **Forms of alanine with pH:** below pH 2 the cation \\(\\text{H}_3\\overset{+}{\\text{N}}-\\text{CH}(\\text{CH}_3)-\\text{COOH}\\) (charge +1); near pH 6 the zwitter ion; above pH 10 the anion \\(\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COO}^{-}\\) (charge -1). At the physiological pH of 7.4, neutral amino acids are mainly zwitter ions.",
      formula: {
        label: "Zwitter ion formation",
        latex: "\\text{H}_2\\text{N}-\\text{CHR}-\\text{COOH} \\longrightarrow \\text{H}_3\\overset{+}{\\text{N}}-\\text{CHR}-\\text{COO}^{-}",
      },
      authoredExample: {
        prompt: "Write the zwitter ion of glycine and explain why glycine is a high melting solid.",
        steps: [
          "Glycine is \\(\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}\\) (R = H).",
          "The acidic -COOH group gives its proton to the basic -NH₂ group of the same molecule.",
          "Zwitter ion: \\(\\text{H}_3\\overset{+}{\\text{N}}-\\text{CH}_2-\\text{COO}^{-}\\), a dipolar ion with no net charge.",
          "In the solid these ions are held by strong electrostatic forces, as in a salt, so much energy is needed to melt it.",
        ],
        answer: "\\(\\text{H}_3\\overset{+}{\\text{N}}-\\text{CH}_2-\\text{COO}^{-}\\); being an internal salt, glycine has a high melting point",
      },
      selfCheckExample: {
        prompt: "Is valine, \\((\\text{CH}_3)_2\\text{CH}-\\text{CH}(\\text{NH}_2)-\\text{COOH}\\), a neutral, acidic or basic amino acid?",
        steps: ["Its side chain, \\((\\text{CH}_3)_2\\text{CH}-\\), has no -COOH group and no amino group."],
        answer: "Neutral",
      },
      practiceSet: [
        { prompt: "Which \\(\\alpha\\)-amino acid has no chiral carbon, and why?", answer: "Glycine: its \\(\\alpha\\)-carbon carries two H atoms" },
        { prompt: "What is an essential amino acid?", answer: "One that the human body cannot make, so it must come from the diet" },
        { prompt: "In what form is a neutral amino acid mainly present at the physiological pH of 7.4?", answer: "As the zwitter ion" },
        { prompt: "The side chain of an \\(\\alpha\\)-amino acid carries a -COOH group. What type of amino acid is it?", answer: "Acidic" },
      ],
      pyqExampleId: "1873b791-3e0e-4a39-bf78-bb52f6b04d0d",
      traps: [
        {
          title: "Calling glycine an L-amino acid",
          body: "D and L describe the arrangement around a chiral carbon. Glycine has no chiral carbon, so it is neither D nor L.",
        },
        {
          title: "Reading 'essential' as 'important'",
          body: "An essential amino acid is one the body cannot make and must take in through food. It does not mean it is needed by enzymes.",
        },
        {
          title: "Charges on the wrong groups",
          body: "In the zwitter ion the plus charge is on the nitrogen (\\(-\\overset{+}{\\text{N}}\\text{H}_3\\)) and the minus charge on the carboxylate (\\(-\\text{COO}^{-}\\)). Overall it carries no charge.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-peptide",
      name: "The peptide bond and naming peptides",
      intuition:
        "Proteins are long chains of amino acids clipped together. The clip is made when the -COOH end of one amino acid meets the -NH₂ end of the next and a molecule of water drops out. The two ends of the chain are different, so the order of the amino acids matters: glycine then alanine is not the same compound as alanine then glycine.",
      definition:
        "- The **peptide bond** is the bond that connects \\(\\alpha\\)-amino acids to each other. It is the amide linkage -CO-NH- (a secondary amide), formed when the carboxyl group of one \\(\\alpha\\)-amino acid combines with the amino group of another, with elimination of a water molecule.\n" +
        "- Two units joined give a dipeptide, three a tripeptide, and so on. More than ten give a **polypeptide**. Proteins are polypeptides with more than a hundred amino acid residues (the line between the two is not sharp).\n" +
        "- The -CHR- units joined by peptide bonds are called **amino acid residues**.\n" +
        "- The end with the free -NH₂ group is the **N-terminal** and is written on the left; the end with the free -COOH group is the **C-terminal**, on the right. The N-terminal residue takes the ending -yl: Gly-Ala is glycylalanine.\n" +
        "- **Hydrolysis** reverses the reaction: one \\(\\text{H}_2\\text{O}\\) is added across each peptide bond, -OH to the -CO- and -H to the -NH-.",
      formula: {
        label: "Formation of a peptide bond",
        latex:
          "\\text{H}_2\\text{N}-\\text{CHR}-\\text{COOH} + \\text{H}_2\\text{N}-\\text{CHR}'-\\text{COOH} \\longrightarrow \\text{H}_2\\text{N}-\\text{CHR}-\\text{CO}-\\text{NH}-\\text{CHR}'-\\text{COOH} + \\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the structural formula and the name of the dipeptide formed when the carboxyl group of alanine combines with the amino group of glycine.",
        steps: [
          "Alanine: \\(\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COOH}\\). Glycine: \\(\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}\\).",
          "The -OH of alanine's -COOH and one H of glycine's -NH₂ are eliminated as water.",
          "\\(\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COOH} + \\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH} \\longrightarrow \\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{CO}-\\text{NH}-\\text{CH}_2-\\text{COOH} + \\text{H}_2\\text{O}\\)",
          "Alanine keeps the free amino group, so it is the N-terminal and takes the ending -yl.",
        ],
        answer: "Alanylglycine, Ala-Gly (a different compound from glycylalanine)",
      },
      selfCheckExample: {
        prompt: "Name the amino acids obtained when the tripeptide Gly-Ala-Val is completely hydrolysed.",
        steps: ["Each of the two peptide bonds takes up one molecule of water and breaks."],
        answer: "Glycine, alanine and valine",
      },
      practiceSet: [
        { prompt: "How many molecules of water are needed to hydrolyse a tetrapeptide completely into its amino acids?", answer: "Three, one for each peptide bond" },
        { prompt: "Which end of a polypeptide chain carries the free carboxyl group?", answer: "The C-terminal" },
        { prompt: "What is the product called when more than ten \\(\\alpha\\)-amino acids are joined by peptide bonds?", answer: "A polypeptide" },
        { prompt: "Chymotrypsin hydrolyses amide bonds whose carbonyl group comes from Phe, Tyr or Trp. What does it give from the tripeptide Ala-Phe-Gly?", answer: "Ala-Phe and Gly" },
      ],
      pyqExampleId: "5d3c362c-3dde-476f-b6ae-de82c84c6c12",
      traps: [
        {
          title: "Treating Gly-Ala and Ala-Gly as one compound",
          body: "The two ends of a peptide differ. Reversing the order gives a different dipeptide with a different name.",
        },
        {
          title: "Leaving out the water",
          body: "Forming a peptide bond eliminates a molecule of \\(\\text{H}_2\\text{O}\\). An equation without it is unbalanced and loses the mark.",
        },
        {
          title: "Writing the peptide bond as an ester",
          body: "The link is an amide, -CO-NH-, made from -COOH and -NH₂. It is not -CO-O-.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccbm-types",
      name: "Globular and fibrous proteins",
      intuition:
        "Proteins are sorted by the shape of their molecules. A chain that coils up into a ball gives a globular protein, the kind that dissolves in body fluids and does work. Chains laid side by side give a long rod, a fibrous protein, the kind that builds hair and muscle.",
      definition:
        "- Depending upon their **molecular shape**, proteins are classified into two types: globular and fibrous.\n" +
        "- The board asks this as 'classify proteins with an example'. Give both types, the shape, the reason for the shape and at least one example of each.",
      table: {
        columns: ["Point", "Globular proteins", "Fibrous proteins"],
        rows: [
          {
            cells: ["Shape of molecule", "Spherical", "Elongated, rod like"],
            pyqExampleId: "efc1af5c-c995-4227-9417-84ed1392d2e6",
            noteAmber: "Board 2024 asked for this classification with an example.",
          },
          {
            cells: ["Reason for the shape", "The polypeptide chain coils around", "The polypeptide chains are held parallel by hydrogen bonds and disulfide bonds"],
            pyqExampleId: "29c1b7d8-6c9d-46bb-b478-61a99a33c7ae",
            noteAmber: "Board 2015 asked how proteins are classified by molecular shape.",
          },
          { cells: ["Solubility in water", "Usually soluble", "Insoluble"] },
          { cells: ["Examples", "Insulin, egg albumin, serum albumin, legumelin (in pulses)", "Keratin (hair, nail, wool), myosin (muscle)"] },
        ],
      },
      practiceSet: [
        { prompt: "Is keratin a globular or a fibrous protein?", answer: "Fibrous" },
        { prompt: "Which bonds hold the chains of a fibrous protein parallel to each other?", answer: "Hydrogen bonds and disulfide bonds" },
        { prompt: "Is egg albumin soluble in water?", answer: "Yes. It is a globular protein" },
      ],
      pyqExampleId: "efc1af5c-c995-4227-9417-84ed1392d2e6",
      traps: [
        {
          title: "Insulin called fibrous",
          body: "Insulin is a globular protein. The fibrous examples are keratin and myosin.",
        },
        {
          title: "A classification with no examples",
          body: "The question says 'with an example'. Naming the two types without one example each loses a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-levels",
      name: "Four levels of protein structure and denaturation",
      intuition:
        "A protein is built up in layers. First the order of amino acids, then local coils and sheets held by hydrogen bonds, then the folding of the whole chain, then several chains packed together. Heat or acid can shake loose the weak forces of the upper layers without touching the chain itself, and the protein stops working.",
      definition:
        "- **Primary structure:** the sequence of \\(\\alpha\\)-amino acid residues linked by peptide bonds. Any change in the sequence gives a different protein.\n" +
        "- **Secondary structure:** the three dimensional arrangement of localised regions of the chain, from hydrogen bonding between the N-H of one amide linkage and the C=O of another. The two common types are the \\(\\alpha\\)-helix and the \\(\\beta\\)-pleated sheet.\n" +
        "- In a \\(\\beta\\)-pleated sheet, two or more chains lie side by side; hydrogen bonds form between N-H and C=O groups of neighbouring chains, and the R groups point above and below the sheet. Small R groups favour it.\n" +
        "- **Tertiary structure:** the three dimensional shape of the entire chain. It is held by hydrogen bonding, dipole-dipole attraction, electrostatic attraction, London dispersion forces and, finally, covalent **disulfide bonds** formed by oxidation of nearby -SH groups of cysteine residues.\n" +
        "- **Quaternary structure:** two or more folded chains (subunits) held together as one complex. Haemoglobin has four subunits.\n" +
        "- **Denaturation:** high temperature, acid, base and even agitation disrupt the noncovalent interactions that hold the shape of a protein. The shape changes **without breaking the peptide bonds**, so the primary structure is unchanged, while the secondary, tertiary or quaternary structure is disturbed. The properties change and the biological activity is often lost.\n" +
        "- A globular protein keeps its hydrophobic side chains inside. Denaturation exposes them, so the protein becomes insoluble in water.",
      authoredExample: {
        prompt: "Describe the \\(\\alpha\\)-helix structure of a protein.",
        steps: [
          "It is a secondary structure: the polypeptide chain twists into a right handed (clockwise) spiral.",
          "Each turn of the helix has 3.6 amino acids.",
          "The C=O group of one amino acid is hydrogen bonded to the N-H group of the fourth amino acid along the chain.",
          "The hydrogen bonds are parallel to the axis of the helix, and the R groups point outward from the helix core.",
          "Example: myosin in muscle and \\(\\alpha\\)-keratin in hair are almost entirely \\(\\alpha\\)-helical.",
        ],
        answer: "A right handed spiral with 3.6 amino acids a turn, held by C=O to N-H hydrogen bonds parallel to its axis",
      },
      selfCheckExample: {
        prompt: "Which covalent bond, formed by oxidising two -SH groups of cysteine residues, stabilises the tertiary structure of a protein?",
        steps: ["Nearby -SH groups of cysteine are oxidised to an -S-S- link."],
        answer: "The disulfide bond",
      },
      practiceSet: [
        { prompt: "What is the primary structure of a protein?", answer: "The sequence of its \\(\\alpha\\)-amino acid residues linked by peptide bonds" },
        { prompt: "Name the two common types of secondary structure of proteins.", answer: "The \\(\\alpha\\)-helix and the \\(\\beta\\)-pleated sheet" },
        { prompt: "Why does milk curdle when lemon juice is added to it?", answer: "The acid denatures the milk proteins: they lose their shape, become insoluble and separate as curd" },
        { prompt: "Give one example of a protein with a quaternary structure.", answer: "Haemoglobin, with four subunits" },
      ],
      pyqExampleId: "51f49973-6b0d-4756-91cb-41338e73688f",
      traps: [
        {
          title: "Saying denaturation breaks the peptide bonds",
          body: "Denaturation changes the shape only. The peptide bonds, and so the primary structure, are not broken.",
        },
        {
          title: "Calling the disulfide bond a weak interaction",
          body: "Hydrogen bonds and London forces are weak noncovalent interactions. The disulfide bond is a covalent bond.",
        },
        {
          title: "Hydrogen bonds of the sheet placed within one chain",
          body: "In the \\(\\alpha\\)-helix the hydrogen bonds are within one chain. In the \\(\\beta\\)-pleated sheet they join neighbouring chains.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccbm-enzymes",
      name: "Enzymes and the lock-and-key mechanism",
      intuition:
        "Our body runs thousands of reactions at only 37 °C and near neutral pH. It manages because of enzymes, protein catalysts with a pocket on their surface shaped for one particular substrate. Only a molecule of the right size and shape fits, which is why each enzyme does just one job, and does it very fast.",
      definition:
        "- **Enzymes** are biological catalysts. Chemically they are proteins. They bring about the body's reactions at the physiological pH of 7.4 and body temperature of 37 °C. Example: amylase in saliva hydrolyses starch.\n" +
        "- Every living cell contains at least 1000 different enzymes.\n" +
        "- **Enzyme catalysis is highly specific:** most enzymes catalyse only one reaction or one group of similar reactions. A mineral acid catalyses the hydrolysis of esters, acetals and amides, but an enzyme that hydrolyses an amide will not work on an ester or an acetal.\n" +
        "- **Lock-and-key mechanism:** the enzyme has an **active site** on its surface. A substrate attaches to it only if it has the right size and shape, forming the **enzyme-substrate complex**. The substrate is held in the correct orientation and reacts. The products leave, and the enzyme is ready to act again.\n" +
        "- Forming the enzyme-substrate complex has a very low activation energy, so the rate is very high: one molecule of some enzymes acts on 10000 substrate molecules in one second.\n" +
        "- Industrial uses: glucose isomerase turns glucose into fructose; penicillin G acylase makes new antibiotics; proteases are used in laundry detergents.",
      authoredExample: {
        prompt: "Explain enzyme catalysis by the lock-and-key mechanism.",
        steps: [
          "The enzyme has an active site, a region of particular size and shape, on its surface.",
          "A substrate molecule attaches to the active site only if it has the right size and shape (the key fits the lock).",
          "The two form the enzyme-substrate complex, in which the substrate is held in the correct orientation to react.",
          "The products are formed and leave the active site; the enzyme is unchanged and ready to act again.",
          "A labelled diagram shows: enzyme, active site, substrate, enzyme-substrate complex, products.",
        ],
        answer: "Substrate fits the active site, forms the enzyme-substrate complex, reacts, and the products leave the enzyme unchanged",
      },
      selfCheckExample: {
        prompt: "An enzyme catalyses the hydrolysis of an amide. Will it catalyse the hydrolysis of an ester? Give the reason.",
        steps: ["Enzyme catalysis is highly specific: only a substrate of the right size and shape fits the active site."],
        answer: "No, because enzyme catalysis is highly specific",
      },
      practiceSet: [
        { prompt: "Name the enzyme present in saliva and the reaction it catalyses.", answer: "Amylase; it hydrolyses starch" },
        { prompt: "Why is the rate of an enzyme catalysed reaction very high?", answer: "Formation of the enzyme-substrate complex has a very low activation energy" },
        { prompt: "Name one industrial use of an enzyme.", answer: "Glucose isomerase converts glucose to fructose (or proteases in laundry detergents)" },
      ],
      pyqExampleId: "4a7de8b1-7e54-40b7-8a80-4ad6103185c3",
      traps: [
        {
          title: "A diagram with no labels",
          body: "When the board asks for enzyme catalysis, label the active site, the substrate, the enzyme-substrate complex and the products. An unlabelled sketch earns little.",
        },
        {
          title: "Saying the enzyme is used up",
          body: "Like any catalyst, the enzyme comes out unchanged and is ready to act again.",
        },
      ],
    },
  ],
};
