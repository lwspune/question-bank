import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_BM_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Proteins",
  title: "Proteins: Amino Acids, Structure and Denaturation",
  oneLineDefinition:
    "α-Amino acids and their classes, the zwitter ion and amphoteric behaviour, the peptide bond, fibrous and globular proteins, the four levels of protein structure, and denaturation.",
  whyItMatters:
    "56 questions, and forty-seven of them come from board papers, in every year from 2023 to 2026. The board keeps returning to a short list of definitions: essential and non-essential amino acids, peptide linkage, denaturation and its effect on structure, and primary structure. It also asks why amino acids are amphoteric or have high melting points (the zwitter ion), the two secondary structures and the forces that hold them, and how fibrous and globular proteins differ, with examples. Each is a one or two-mark answer: give the definition with its condition and one named example.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcbm-aminoacids",
      name: "Amino acids, the zwitter ion and amphoteric behaviour",
      intuition:
        "An amino acid carries an acid group and a base group on the same small molecule. In water the acid group simply hands its proton to the base group next door. The molecule is then a zwitter ion: plus at one end, minus at the other, neutral overall. That one fact explains why amino acids melt high, dissolve in water, behave like salts and react with both acids and bases.",
      definition:
        "- Proteins are polymers of **α-amino acids**: the −NH₂ group is on the carbon next to the −COOH group. Only α-amino acids are obtained on hydrolysis of proteins.\n" +
        "- **Acidic, basic, neutral:** more carboxyl than amino groups makes an amino acid acidic (glutamic acid, aspartic acid); more amino than carboxyl groups makes it basic (lysine, arginine); equal numbers make it neutral (glycine, alanine).\n" +
        "- **Non-essential** amino acids can be synthesised in the body (glycine, alanine). **Essential** amino acids cannot be synthesised in the body and must be obtained through diet. NCERT marks ten: valine, leucine, isoleucine, arginine, lysine, threonine, methionine, phenylalanine, tryptophan, histidine.\n" +
        "- Amino acids are colourless, crystalline, water-soluble, high-melting solids that **behave like salts** rather than simple amines or carboxylic acids.\n" +
        "- **Zwitter ion:** in aqueous solution the carboxyl group loses a proton and the amino group accepts it, giving a dipolar ion that is neutral but carries both a positive and a negative charge: \\(\\text{R}{-}\\text{CH}(\\text{NH}_2){-}\\text{COOH} \\rightleftharpoons \\text{R}{-}\\text{CH}(\\overset{+}{\\text{N}}\\text{H}_3){-}\\text{COO}^{-}\\)\n" +
        "- **Amphoteric:** in the zwitter ionic form, amino acids react with both acids and bases.\n" +
        "- Except glycine, all naturally occurring α-amino acids are **optically active**, since the α-carbon is asymmetric. Most naturally occurring amino acids have the **L-configuration**.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Essential amino acid", "Cannot be synthesised in the body; must come from the diet", "Valine, leucine, lysine"] },
          { cells: ["Non-essential amino acid", "Can be synthesised in the body", "Glycine, alanine"] },
          {
            cells: ["Acidic / basic amino acid", "More −COOH than −NH₂ groups / more −NH₂ than −COOH groups", "Glutamic acid, aspartic acid / lysine, arginine"],
            noteAmber: "Board 2026 asked: differentiate between acidic and basic amino acids.",
            pyqExampleId: "5e9f3a6a-a3b4-48e2-a4b6-495450399d59",
          },
          { cells: ["Zwitter ion", "Dipolar ion: neutral overall, with both + and − charges", "R−CH(NH₃⁺)−COO⁻"] },
          {
            cells: ["Optically active", "α-carbon is asymmetric; every natural α-amino acid except glycine", "Alanine (glycine is not)"],
            noteAmber: "Board 2025 asked this as assertion-reason: both true, but the L-configuration Reason does not explain optical activity (B).",
            pyqExampleId: "06e04981-64a1-45d2-9901-e78b10db8715",
          },
        ],
      },
      selfCheckExample: {
        prompt: "The melting points and solubility in water of amino acids are higher than those of the corresponding halo acids. Explain.",
        steps: [
          "An amino acid has an acidic −COOH and a basic −NH₂ group in the same molecule, so it exists as a zwitter ion with full positive and negative charges.",
          "Its crystals are held by strong electrostatic attractions, as in a salt, so the melting point is high.",
          "The charged ends attract water molecules strongly, so it is more soluble. A halo acid has no such dipolar ion.",
        ],
        answer: "Amino acids exist as salt-like zwitter ions, held by strong electrostatic forces and strongly attracted by water",
      },
      practiceSet: [
        { prompt: "Give two examples each of essential and non-essential amino acids.", answer: "Essential: valine, leucine; non-essential: glycine, alanine" },
        { prompt: "Why is glycine the one natural α-amino acid that is optically inactive?", answer: "Its side chain is H, so its α-carbon carries two H atoms and is not asymmetric" },
        { prompt: "Classify lysine as acidic, basic or neutral, and give the reason.", answer: "Basic: it has more amino groups than carboxyl groups" },
        { prompt: "What is a zwitter ion?", answer: "A dipolar ion formed when the −COOH of an amino acid loses a proton to its own −NH₂; it is neutral but carries both positive and negative charges" },
      ],
      pyqExampleId: "758fc1a0-664a-4b0b-bf62-c40b0b4d93d5",
      traps: [
        {
          title: "\"Essential\" is about the diet",
          body: "Essential amino acids are the ones the body cannot make, so the diet must supply them. Both kinds are needed to build proteins. The definition must say \"cannot be synthesised in the body\".",
        },
        {
          title: "Amphoteric without the zwitter ion",
          body: "Write that the amino acid exists as a zwitter ion, then that it reacts with both acids and bases. \"It has an acidic and a basic group\" alone is half the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcbm-peptide",
      name: "Peptide bond, polypeptides and proteins",
      intuition:
        "Amino acids link head to tail. The −COOH of one meets the −NH₂ of the next, a water molecule leaves, and an amide bond, −CO−NH−, is left behind. Each new amino acid adds one more bond, so a chain always has one bond fewer than it has amino acids.",
      definition:
        "- **Peptide linkage (peptide bond):** an amide, −CO−NH−, formed between the −COOH group of one amino acid and the −NH₂ group of another, with the elimination of a water molecule.\n" +
        "- When the carboxyl group of glycine combines with the amino group of alanine, the dipeptide **glycylalanine** is formed.\n" +
        "- Two amino acids give a dipeptide; three a tripeptide, with two peptide linkages; then tetrapeptide, pentapeptide, hexapeptide. More than ten amino acids give a **polypeptide**.\n" +
        "- A polypeptide with more than a hundred amino acid residues and a molecular mass above 10,000 u is called a **protein**. The line is not sharp: insulin, with 51 amino acids, is called a protein because it has a well-defined conformation.\n" +
        "- **Peptide linkage vs glycosidic linkage:** a peptide linkage joins two amino acids through −CO−NH−; a glycosidic linkage joins two monosaccharide units through an oxygen atom. Both form with loss of water.",
      formula: {
        label: "Peptide bonds in a chain of n amino acids",
        latex: "\\text{number of peptide bonds} = \\text{number of water molecules eliminated} = n - 1",
        symbols: [{ symbol: "\\(n\\)", meaning: "number of amino acids joined in one open chain" }],
      },
      authoredExample: {
        prompt: "A hexapeptide is built from six amino acids. How many peptide bonds does it contain, and how many water molecules are eliminated in making it? What is a chain of more than ten amino acids called?",
        steps: [
          "Each peptide bond joins two neighbouring amino acids, so six amino acids in a chain have \\(6-1=5\\) links.",
          "One water molecule is eliminated for each peptide bond formed: 5 molecules.",
          "More than ten amino acids linked in this way make a polypeptide.",
        ],
        answer: "5 peptide bonds; 5 water molecules; a polypeptide",
      },
      selfCheckExample: {
        prompt: "Write the peptide bond and name the dipeptide formed when the carboxyl group of glycine combines with the amino group of alanine.",
        steps: [
          "The −COOH of glycine and the −NH₂ of alanine lose a water molecule between them.",
          "The amide group left behind, −CO−NH−, is the peptide bond.",
        ],
        answer: "−CO−NH−; glycylalanine",
      },
      practiceSet: [
        { prompt: "What do all proteins give on complete hydrolysis?", answer: "α-Amino acids" },
        { prompt: "Give one difference between a peptide linkage and a glycosidic linkage.", answer: "A peptide linkage joins amino acids through −CO−NH−; a glycosidic linkage joins monosaccharides through an oxygen atom" },
        { prompt: "When is a polypeptide called a protein?", answer: "When it has more than a hundred amino acid residues and a molecular mass above 10,000 u" },
      ],
      pyqExampleId: "24536ad1-5168-4bd5-92d8-361ba919a5fb",
      traps: [
        {
          title: "One bond fewer than the amino acids",
          body: "A chain of n amino acids has n − 1 peptide bonds. \"A tetrapeptide has four peptide bonds\" was the false Reason in a 2023 assertion-reason item.",
        },
        {
          title: "\"Covalent bond\" is not the name asked",
          body: "The peptide bond is covalent, but when the board asks what joins amino acids in a protein the answer is the peptide bond (−CO−NH−). Write the group as well as the name.",
        },
        {
          title: "Peptides break down to amino acids, not polypeptides",
          body: "Complete hydrolysis of a protein gives α-amino acids. Polypeptides are only the partly broken chains, and a 2024 MCQ used them as the wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-shapes",
      name: "Fibrous and globular proteins",
      intuition:
        "Lay polypeptide chains side by side and tie them together, and you get a rope: tough, stringy and insoluble. Let one chain coil up on itself, and you get a ball that dissolves in water. Hair and muscle are made of the ropes; insulin and egg albumin are the balls.",
      definition:
        "Proteins are classified into two types on the basis of their **molecular shape**:\n" +
        "- **Fibrous proteins:** the polypeptide chains run **parallel** and are held together by **hydrogen and disulphide bonds**, giving a **fibre-like** structure. Generally **insoluble in water**. Examples: **keratin** (in hair, wool, silk) and **myosin** (in muscles).\n" +
        "- **Globular proteins:** the chains of polypeptides **coil around to give a spherical shape**. Usually **soluble in water**. Examples: **insulin** and **albumins**.\n" +
        "- These two shapes arise from the tertiary structure, the overall folding of the polypeptide chains.",
      table: {
        columns: ["Point", "Fibrous proteins", "Globular proteins"],
        rows: [
          { cells: ["Arrangement of chains", "Run parallel to one another", "Coil around on themselves"] },
          { cells: ["Held by", "Hydrogen and disulphide bonds between the chains", "Folding of the chain into a ball"] },
          { cells: ["Shape", "Fibre-like", "Spherical"] },
          { cells: ["Solubility in water", "Generally insoluble", "Usually soluble"] },
          { cells: ["Examples", "Keratin (hair, wool, silk), myosin (muscles)", "Insulin, albumins"] },
        ],
      },
      selfCheckExample: {
        prompt: "Myosin and albumin are both proteins. Which is fibrous and which is globular, and which of the two would you expect to dissolve in water?",
        steps: [
          "Myosin, the protein of muscles, has parallel chains: fibrous.",
          "Albumin coils into a spherical shape: globular.",
          "Globular proteins are usually soluble in water; fibrous ones are generally insoluble.",
        ],
        answer: "Myosin fibrous, albumin globular; albumin dissolves in water",
      },
      practiceSet: [
        { prompt: "Name the fibrous protein present in hair, wool and silk.", answer: "Keratin" },
        { prompt: "Which two kinds of bond hold the parallel chains of a fibrous protein together?", answer: "Hydrogen bonds and disulphide bonds" },
        { prompt: "On what basis are proteins classified as fibrous and globular?", answer: "On the basis of their molecular shape" },
      ],
      pyqExampleId: "c51efb46-de5f-42af-b8d2-5050f88e6318",
      traps: [
        {
          title: "A difference needs both sides",
          body: "\"Fibrous proteins are insoluble\" is one side only. Write each point for both: parallel chains, fibre-like, insoluble against coiled chains, spherical, soluble.",
        },
        {
          title: "Insulin is globular",
          body: "Insulin and albumins are NCERT's globular examples; keratin and myosin its fibrous ones. Putting insulin under fibrous is a common slip.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-levels",
      name: "Primary, secondary, tertiary and quaternary structure",
      intuition:
        "Think of a protein as a necklace. The order of the beads is the primary structure. The chain coiling like a spring, or lying in folded pleats, is the secondary structure. The whole necklace folding into a final shape is the tertiary structure. If several such necklaces pack together, their arrangement is the quaternary structure.",
      definition:
        "- **Primary structure:** the specific **sequence of amino acids** in each polypeptide chain. Any change in this sequence creates a different protein.\n" +
        "- **Secondary structure:** the shape in which a long polypeptide chain exists: the **α-helix** and the **β-pleated sheet**. Both arise from regular folding of the backbone due to **hydrogen bonding between the >C=O and −NH− groups of the peptide bond**.\n" +
        "- **α-Helix:** the chain forms all possible hydrogen bonds by twisting into a **right-handed screw**, with the −NH group of each amino acid residue hydrogen bonded to the >C=O of an adjacent turn of the helix.\n" +
        "- **β-Pleated sheet:** all peptide chains are stretched out to nearly maximum extension and laid side by side, held together by **intermolecular hydrogen bonds**, like the pleated folds of drapery.\n" +
        "- **Tertiary structure:** the overall folding of the polypeptide chains, that is, further folding of the secondary structure. It gives the two molecular shapes, fibrous and globular.\n" +
        "- The main forces that stabilise the **secondary and tertiary** structures are **hydrogen bonds, disulphide linkages, van der Waals forces and electrostatic forces of attraction**.\n" +
        "- **Quaternary structure:** some proteins have two or more polypeptide chains (sub-units); the spatial arrangement of these sub-units with respect to each other is the quaternary structure.",
      table: {
        columns: ["Level", "What it describes", "Key point"],
        rows: [
          {
            cells: ["Primary", "Sequence of amino acids in a polypeptide chain", "A change in sequence gives a different protein"],
            noteAmber: "Board 2024 and 2026 MCQs asked the name of this sequence, in two sets each year.",
            pyqExampleId: "557cb842-2f87-425a-b085-bd3c112fd717",
          },
          {
            cells: ["Secondary", "α-Helix or β-pleated sheet", "Hydrogen bonds between >C=O and −NH− of peptide bonds"],
            noteAmber: "Board 2023 MCQ: the β-pleated sheet is a secondary structure.",
            pyqExampleId: "ef85afd6-5bad-4ccb-a059-6c1c89476f88",
          },
          { cells: ["Tertiary", "Overall folding of the polypeptide chains", "Gives fibrous and globular shapes"] },
          { cells: ["Quaternary", "Spatial arrangement of two or more sub-units", "Only in proteins with more than one chain"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the β-pleated sheet, how are the chains arranged, and do the hydrogen bonds run within one chain or between chains?",
        steps: [
          "The peptide chains are stretched out to nearly maximum extension and laid side by side.",
          "They are held together by hydrogen bonds between neighbouring chains: intermolecular hydrogen bonds.",
        ],
        answer: "Stretched chains laid side by side, held by intermolecular hydrogen bonds between the chains",
      },
      practiceSet: [
        { prompt: "What type of bonding stabilises the α-helix?", answer: "Hydrogen bonding between the −NH of each residue and the >C=O of an adjacent turn" },
        { prompt: "Define the quaternary structure of a protein.", answer: "The spatial arrangement of two or more polypeptide sub-units with respect to each other" },
        { prompt: "The α-helix belongs to which level of protein structure?", answer: "The secondary structure" },
        { prompt: "Which level of structure is changed if one amino acid in the chain is replaced by another?", answer: "The primary structure; the result is a different protein" },
      ],
      pyqExampleId: "c3659e59-93b1-45a6-a20a-aed374fd9a5d",
      traps: [
        {
          title: "The helix is secondary, not tertiary",
          body: "Both the α-helix and the β-pleated sheet are secondary structures. Tertiary structure is the overall folding of the chain.",
        },
        {
          title: "Name the forces, do not just say \"bonds\"",
          body: "Asked for forces that stabilise the secondary and tertiary structures, name two of: hydrogen bonds, disulphide linkages, van der Waals forces, electrostatic attraction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-denaturation",
      name: "Native protein and denaturation",
      intuition:
        "A protein works because of its exact folded shape, and that shape is held mostly by weak hydrogen bonds. Heat it or change the pH and those bonds give way: the helix uncoils, the ball unfolds, and the protein stops working. The chain itself is not cut, so the amino acid sequence is still there. Only the shape is lost, which is enough.",
      definition:
        "- **Native protein:** a protein found in a biological system with a **unique three-dimensional structure and biological activity**.\n" +
        "- **Denaturation:** when a native protein is subjected to a **physical change** such as a change in **temperature**, or a **chemical change** such as a change in **pH**, the hydrogen bonds are disturbed. The globules unfold and the helix gets uncoiled, and the protein **loses its biological activity**.\n" +
        "- **Effect on structure:** during denaturation the **secondary and tertiary structures are destroyed** but the **primary structure remains intact**.\n" +
        "- **Examples:** the **coagulation of egg white on boiling**, and the **curdling of milk**, caused by lactic acid formed by the bacteria present in milk.",
      table: {
        columns: ["Point", "Native protein", "Denatured protein"],
        rows: [
          {
            cells: ["Three-dimensional structure", "Unique and intact", "Globules unfolded, helix uncoiled"],
            noteAmber: "Board 2025 asked to define a native protein.",
            pyqExampleId: "36f515d8-cda8-4ae2-9f7f-7577725625d0",
          },
          { cells: ["Secondary and tertiary structure", "Present", "Destroyed"] },
          { cells: ["Primary structure", "Present", "Remains intact"] },
          { cells: ["Biological activity", "Present", "Lost"] },
          {
            cells: ["Everyday example", "Raw egg white, fresh milk", "Boiled egg white, curdled milk"],
            noteAmber: "Board 2025 MCQ: coagulation of egg white and curdling of milk are both denaturation; clotting of blood is not.",
            pyqExampleId: "31dff215-c5b2-4bbb-a4c7-90ea884c4d23",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Milk curdles when it is left standing. What causes the change, what is it called, and which levels of protein structure are lost?",
        steps: [
          "Bacteria present in milk form lactic acid, which changes the pH.",
          "The change in pH disturbs the hydrogen bonds of the milk protein: this is denaturation.",
          "The secondary and tertiary structures are destroyed; the primary structure stays intact.",
        ],
        answer: "Lactic acid from bacteria; denaturation; secondary and tertiary structures are lost",
      },
      practiceSet: [
        { prompt: "Define a native protein.", answer: "A protein found in a biological system with a unique three-dimensional structure and biological activity" },
        { prompt: "Name two changes that can denature a protein.", answer: "A change in temperature (physical) and a change in pH (chemical)" },
        { prompt: "Which structure of a protein survives denaturation?", answer: "The primary structure (the sequence of amino acids)" },
      ],
      pyqExampleId: "f21b26e7-6392-45cc-971c-8d99cc32bbc4",
      traps: [
        {
          title: "Denaturation does not touch the primary structure",
          body: "Only the secondary and tertiary structures are destroyed. Writing \"the protein breaks into amino acids\" confuses denaturation with hydrolysis.",
        },
        {
          title: "A definition needs its cause and its result",
          body: "State the cause (change in temperature or pH), what happens (hydrogen bonds disturbed, helix uncoils) and the result (biological activity lost). One example earns the last mark when asked.",
        },
      ],
    },
  ],
};
