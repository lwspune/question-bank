import type { SubtopicNote } from "@/app/notes/_types";

export const AMINO_ACIDS_BIO_NOTE: SubtopicNote = {
  subtopicName: "Amino Acids: Essential, Codes and Properties",
  title: "Amino Acids: Essential, Codes and Properties",
  oneLineDefinition:
    "The twenty α-amino acids differ only in their side chain, which fixes each one's one-letter code, its class (acidic, basic or neutral) and the test that picks it out; ten are essential, all but glycine are chiral, and as dipolar ions they are high-melting, water-soluble solids.",
  whyItMatters:
    "Nineteen PYQs, seventeen multiple choice and two asking for a number, five from 2026. Eight test the one-letter codes, which amino acids are essential, and which side chains are acidic, basic or contain sulphur. Seven are about the structure itself: chirality, the dipolar ion and its properties, counting atoms, and cysteine and tyrosine. Four match a side-chain group to the test that detects it, or ask what ninhydrin reacts with.",
  concepts: [
    // C1 — the twenty amino acids
    {
      kind: "reference" as const,
      slug: "jcbio-essential-and-codes",
      name: "The twenty amino acids: codes, side chains and the essential ones",
      intuition:
        "Every amino acid in a protein is \\(\\mathrm{H_2N{-}CH(R){-}COOH}\\); only R changes. Essential amino acids are the ones the body cannot make, so they must come from food. One-letter codes use the first letter where it is free (G, A, V, L, I, S, T, C, M, P, H); where it is taken, the code is another letter, and those are the ones that are asked.",
      definition:
        "- **Essential** (the ten NCERT marks): valine, leucine, isoleucine, arginine, lysine, threonine, methionine, phenylalanine, tryptophan, histidine. Arginine and histidine are called semi-essential in some books, but NCERT counts them as essential.\n" +
        "- **Non-essential**: glycine, alanine, serine, cysteine, aspartic acid, glutamic acid, asparagine, glutamine, proline, tyrosine.\n" +
        "- **Class** by the number of acid and amino groups: equal numbers → neutral; more COOH → **acidic** (aspartic, glutamic acid); more basic N groups → **basic** (lysine, arginine, histidine). The amide N of asparagine and glutamine is not basic, so those two are neutral.\n" +
        "- **Sulphur**: cysteine (\\(\\mathrm{-CH_2SH}\\)) and methionine (\\(\\mathrm{-CH_2CH_2SCH_3}\\)).\n" +
        "- **Rings**: histidine has an imidazole ring, tryptophan an indole ring, and proline's side chain closes back onto its own N to make a five-membered ring.\n" +
        "- **Codes that are asked**: D aspartic acid, E glutamic acid, N asparagine, Q glutamine, K lysine, R arginine, F phenylalanine, W tryptophan, Y tyrosine.",
      table: {
        columns: ["Amino acid", "Code", "Side chain R", "Class", "Essential?"],
        rows: [
          { cells: ["Glycine", "G", "\\(\\mathrm{-H}\\)", "Neutral", "No"] },
          { cells: ["Alanine", "A", "\\(\\mathrm{-CH_3}\\)", "Neutral", "No"] },
          { cells: ["Valine", "V", "\\(\\mathrm{-CH(CH_3)_2}\\)", "Neutral", "Yes"] },
          { cells: ["Leucine", "L", "\\(\\mathrm{-CH_2CH(CH_3)_2}\\)", "Neutral", "Yes"] },
          { cells: ["Isoleucine", "I", "\\(\\mathrm{-CH(CH_3)CH_2CH_3}\\)", "Neutral", "Yes"] },
          { cells: ["Arginine", "R", "\\(\\mathrm{-(CH_2)_3NHC(=NH)NH_2}\\)", "Basic", "Yes"] },
          { cells: ["Lysine", "K", "\\(\\mathrm{-(CH_2)_4NH_2}\\)", "Basic", "Yes"] },
          { cells: ["Glutamic acid", "E", "\\(\\mathrm{-CH_2CH_2COOH}\\)", "Acidic", "No"] },
          { cells: ["Aspartic acid", "D", "\\(\\mathrm{-CH_2COOH}\\)", "Acidic", "No"] },
          { cells: ["Glutamine", "Q", "\\(\\mathrm{-CH_2CH_2CONH_2}\\)", "Neutral", "No"] },
          { cells: ["Asparagine", "N", "\\(\\mathrm{-CH_2CONH_2}\\)", "Neutral", "No"], noteAmber: "Its amide N is not basic, so asparagine has only one basic group, the α-NH₂." },
          { cells: ["Threonine", "T", "\\(\\mathrm{-CH(OH)CH_3}\\)", "Neutral", "Yes"] },
          { cells: ["Serine", "S", "\\(\\mathrm{-CH_2OH}\\)", "Neutral", "No"] },
          { cells: ["Cysteine", "C", "\\(\\mathrm{-CH_2SH}\\)", "Neutral", "No"] },
          { cells: ["Methionine", "M", "\\(\\mathrm{-CH_2CH_2SCH_3}\\)", "Neutral", "Yes"] },
          { cells: ["Phenylalanine", "F", "\\(\\mathrm{-CH_2C_6H_5}\\)", "Neutral", "Yes"] },
          { cells: ["Tyrosine", "Y", "\\(\\mathrm{-CH_2C_6H_4OH}\\) (para)", "Neutral", "No"] },
          { cells: ["Tryptophan", "W", "\\(\\mathrm{-CH_2}\\)-indolyl, two fused rings, one with N", "Neutral", "Yes"] },
          { cells: ["Histidine", "H", "\\(\\mathrm{-CH_2}\\)-imidazolyl, a five-membered ring with two N", "Basic", "Yes"] },
          { cells: ["Proline", "P", "\\(\\mathrm{-CH_2CH_2CH_2-}\\) joined back to the α-N, a five-membered ring", "Neutral", "No"] },
        ],
        caption: "Ten are essential. The letters that are not the first letter of the name are D, E, N, Q, K, R, F, W and Y.",
      },
      selfCheckExample: {
        prompt: "Give the one-letter codes of glutamine, tryptophan and asparagine, and say which of the three is essential.",
        steps: [
          "G is glycine, so glutamine is Q.",
          "T is threonine, so tryptophan is W.",
          "A is alanine, so asparagine is N.",
          "Of the three, only tryptophan is on NCERT's essential list.",
        ],
        answer: "Q, W and N; tryptophan is essential.",
      },
      practiceSet: [
        { prompt: "How many amino acids does NCERT mark as essential?", answer: "10" },
        { prompt: "Which two amino acids contain sulphur?", answer: "Cysteine and methionine" },
        { prompt: "What is the one-letter code for tyrosine?", answer: "Y" },
        { prompt: "Is aspartic acid acidic, basic or neutral?", answer: "Acidic" },
      ],
      pyqExampleId: "9e5db5df-7233-48a6-a6cd-e4e81dfda219", // 2026 — R / D / K / E codes with essential or not
      traps: [
        {
          title: "Aspartic acid is D, asparagine is N",
          body: "A is alanine, so neither Asp nor Asn gets it. The acid takes D and the amide takes N; glutamic acid is E and glutamine is Q in the same way.",
        },
        {
          title: "Tyrosine is not essential",
          body: "The body makes tyrosine from phenylalanine, so tyrosine is non-essential while phenylalanine is essential. Proline is non-essential too.",
        },
        {
          title: "Proline's ring is five-membered, and histidine has a ring",
          body: "Proline's ring holds four carbons and the N. Histidine carries an imidazole ring, a heterocycle, so a statement that histidine has no heterocyclic ring is false.",
        },
      ],
    },

    // C2 — structure, dipolar ion and chirality
    {
      kind: "formula" as const,
      slug: "jcbio-amino-acid-structure",
      name: "Structure, dipolar ion and chirality of α-amino acids",
      intuition:
        "An amino acid carries an acid group and a basic group on the same carbon. In the solid and in water the COOH gives its proton to the NH₂, and the molecule becomes a dipolar ion (zwitterion). That makes amino acids behave like salts: crystalline, high-melting, soluble in water and not in benzene. The α-carbon carries four different groups in every amino acid except glycine, so all the others are chiral.",
      definition:
        "- Hydrolysis of proteins gives **α-amino acids** only: the \\(\\mathrm{NH_2}\\) is on the carbon next to the COOH.\n" +
        "- **Dipolar ion**: \\(\\mathrm{H_3\\overset{+}{N}{-}CH(R){-}COO^-}\\). Amino acids are colourless crystalline solids, fairly high melting, water soluble, insoluble in non-polar solvents such as benzene, and amphoteric. Each ionisable group has its own \\(pK_a\\), so an amino acid has more than one.\n" +
        "- **Chirality**: except glycine (R = H), all naturally occurring α-amino acids are optically active, and most have the L configuration. Threonine and isoleucine have **two** stereocentres, since their side chains carry one more.\n" +
        "- Aspartic acid and glutamic acid both carry a COOH in the side chain.\n" +
        "- Cysteine's SH is easily oxidised: two cysteines join through an \\(\\mathrm{-S{-}S-}\\) bridge to give **cystine**, the same disulphide link that holds protein chains.\n" +
        "- **Thyroxine**, the thyroid hormone, is an iodinated derivative of tyrosine (Y).\n" +
        "- To count atoms, add the backbone \\(\\mathrm{C_2H_4NO_2}\\) (as \\(\\mathrm{H_2N{-}CH{-}COOH}\\)) to the side chain R.",
      formula: {
        label: "An α-amino acid and its dipolar ion",
        latex: "\\mathrm{H_2N{-}CH(R){-}COOH} \\;\\rightleftharpoons\\; \\mathrm{H_3\\overset{+}{N}{-}CH(R){-}COO^-}",
      },
      authoredExample: {
        prompt: "Methionine has the side chain \\(\\mathrm{-CH_2CH_2SCH_3}\\). Find its molecular formula, the number of carbon atoms and the number of stereocentres.",
        steps: [
          "Backbone \\(\\mathrm{H_2N{-}CH{-}COOH}\\): 2 C, 4 H, 1 N, 2 O.",
          "Side chain \\(\\mathrm{CH_2CH_2SCH_3}\\): 3 C, 7 H, 1 S.",
          "Total: \\(\\mathrm{C_5H_{11}NO_2S}\\), so 5 carbon atoms.",
          "Only the α-carbon has four different groups; the side chain has no stereocentre.",
        ],
        answer: "\\(\\mathrm{C_5H_{11}NO_2S}\\); 5 carbons; 1 stereocentre.",
      },
      selfCheckExample: {
        prompt: "Serine has the side chain \\(\\mathrm{-CH_2OH}\\). Write its molecular formula and its dipolar ion.",
        steps: [
          "Backbone \\(\\mathrm{C_2H_4NO_2}\\) plus \\(\\mathrm{CH_2OH}\\) (1 C, 3 H, 1 O) gives \\(\\mathrm{C_3H_7NO_3}\\).",
          "The COOH proton moves to the \\(\\mathrm{NH_2}\\): \\(\\mathrm{H_3\\overset{+}{N}{-}CH(CH_2OH){-}COO^-}\\).",
        ],
        answer: "\\(\\mathrm{C_3H_7NO_3}\\); \\(\\mathrm{H_3\\overset{+}{N}{-}CH(CH_2OH){-}COO^-}\\).",
      },
      practiceSet: [
        { prompt: "How many carbon atoms does valine, \\(\\mathrm{H_2N{-}CH(CH(CH_3)_2){-}COOH}\\), have?", answer: "5" },
        { prompt: "Which naturally occurring α-amino acid is optically inactive?", answer: "Glycine" },
        { prompt: "How many stereocentres does isoleucine have?", answer: "2" },
        { prompt: "What forms when two cysteine molecules are oxidised together?", answer: "Cystine, joined by an S–S bond" },
      ],
      pyqExampleId: "73c1f664-5c5a-4279-826b-937e323b2832", // 2025 — chirality, side-chain COOH, cysteine dimerises
      traps: [
        {
          title: "Not every chiral amino acid has one stereocentre",
          body: "Threonine and isoleucine each have two. A statement that all naturally occurring amino acids except glycine have exactly one chiral centre is false.",
        },
        {
          title: "Amino acids are salts, not organic liquids",
          body: "As dipolar ions they are crystalline, high-melting and water soluble, and they do not dissolve in benzene. A statement that arginine is highly soluble in benzene is the false one.",
        },
        {
          title: "Protein hydrolysis gives α-amino acids",
          body: "Every amino acid from a protein has its NH₂ on the α-carbon. Options with β, γ or δ amino acids describe no natural protein.",
        },
      ],
    },

    // C3 — side-chain tests
    {
      kind: "reference" as const,
      slug: "jcbio-side-chain-tests",
      name: "Tests for amino-acid side chains and the ninhydrin test",
      intuition:
        "These questions borrow tests from other chapters. Find the functional group in the side chain, then recall which test that group answers: a phenol gives a violet colour with neutral ferric chloride, an alcohol a red colour with ceric ammonium nitrate, a primary amine reacts with Hinsberg's reagent, and a primary amide undergoes Hoffmann bromamide degradation. Ninhydrin, by contrast, reacts with the α-amino acid part that every amino acid and protein shares.",
      definition:
        "- NCERT's Biomolecules chapter does not list these tests. They come from the Alcohols, Phenols and Ethers chapter (FeCl₃, ceric ammonium nitrate) and the Amines chapter (Hinsberg's reagent, Hoffmann bromamide); here they only ask you to spot the group in the side chain.\n" +
        "- **Ninhydrin** gives a purple colour with α-amino acids, peptides and proteins such as egg albumin. Starch, cellulose and PVC have no amino group and give nothing. The purple product is called Ruhemann's purple; its structure is outside NCERT.\n" +
        "- Proteins with aromatic side chains (tyrosine, tryptophan, phenylalanine) also give the yellow xanthoproteic test with concentrated nitric acid.",
      table: {
        columns: ["Amino acid", "Side-chain group", "Test", "Result"],
        rows: [
          { cells: ["Tyrosine", "Phenolic OH", "Neutral FeCl₃", "Violet colour"] },
          { cells: ["Serine, threonine", "Alcoholic OH", "Ceric ammonium nitrate", "Red colour"] },
          { cells: ["Lysine", "Primary amine, \\(\\mathrm{-NH_2}\\)", "Hinsberg's reagent, \\(\\mathrm{C_6H_5SO_2Cl}\\)", "Sulphonamide that dissolves in alkali"] },
          { cells: ["Glutamine, asparagine", "Primary amide, \\(\\mathrm{-CONH_2}\\)", "Hoffmann bromamide, \\(\\mathrm{Br_2}\\) with NaOH", "Amine with one carbon fewer"] },
          { cells: ["Tyrosine, tryptophan, phenylalanine", "Benzene ring", "Xanthoproteic, concentrated \\(\\mathrm{HNO_3}\\)", "Yellow colour"] },
          { cells: ["Every α-amino acid and protein", "Free α-amino group", "Ninhydrin", "Purple colour"] },
        ],
        caption: "Match the group in the side chain first; the test follows from the group.",
      },
      selfCheckExample: {
        prompt: "Which test tells serine from alanine, and what does it show?",
        steps: [
          "Serine's side chain is \\(\\mathrm{-CH_2OH}\\), an alcohol; alanine's is \\(\\mathrm{-CH_3}\\), with no functional group.",
          "Ceric ammonium nitrate gives a red colour with an alcohol.",
        ],
        answer: "Ceric ammonium nitrate: serine gives a red colour, alanine does not.",
      },
      practiceSet: [
        { prompt: "Which reagent gives a violet colour with tyrosine?", answer: "Neutral FeCl₃" },
        { prompt: "What does Hoffmann bromamide degradation turn \\(\\mathrm{R{-}CONH_2}\\) into?", answer: "\\(\\mathrm{R{-}NH_2}\\)" },
        { prompt: "Which gives a purple colour with ninhydrin, egg albumin or cellulose?", answer: "Egg albumin" },
        { prompt: "Which amino acid's side chain gives Hinsberg's test?", answer: "Lysine" },
      ],
      pyqExampleId: "83ab3275-99c4-4d8a-b7df-7106fbc6b03c", // 2026 — Gln Hoffmann, Lys Hinsberg, Tyr FeCl3, Ser CAN
      traps: [
        {
          title: "Lysine carries an amine, glutamine an amide",
          body: "Lysine's side chain ends in NH₂ on a CH₂, a primary amine, so it answers Hinsberg's test. Glutamine's ends in CONH₂, a primary amide, so it undergoes Hoffmann bromamide degradation.",
        },
        {
          title: "Ferric chloride needs a phenol",
          body: "Serine and threonine have alcoholic OH and give no FeCl₃ colour. Only tyrosine, with its phenolic OH, gives the violet colour.",
        },
      ],
    },
  ],
};
