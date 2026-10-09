import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_ENDOMEMBRANE_NOTE: SubtopicNote = {
  subtopicName: "Nucleus and Endomembrane System",
  title: "Nucleus, Ribosomes, ER, Golgi and Lysosomes",
  oneLineDefinition:
    "The nucleus holds the DNA; ribosomes build proteins; the ER, Golgi and vesicles fold, label and ship them; lysosomes digest.",
  whyItMatters:
    "The ministry papers asked what the Golgi does (2023), what ribosomes are made of (2024) and how lysosomes form (2025). The older papers asked for the order of organelles that make a glycoprotein, which structures contain RNA but not DNA, and which can make vesicles.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-nucleus",
      name: "The nucleus, nuclear envelope and nucleolus",
      intuition:
        "The nucleus is the cell's library: the DNA stays inside, and working copies (mRNA) are sent out. Keeping DNA behind a membrane lets the cell control which messages leave. Inside the nucleus, one dense patch, the nucleolus, is a workshop for building ribosome parts.",
      definition:
        "The **nucleus** contains the cell's linear chromosomes. **DNA replication** and **transcription** (DNA to RNA) happen here; translation does not.\n" +
        "- The **nuclear envelope** is a **double membrane**. Its outer membrane is continuous with the rough ER.\n" +
        "- **Nuclear pores** let mRNA and ribosome subunits out and proteins (such as histones and enzymes) in.\n" +
        "- **Chromatin** is DNA wound round histone proteins. It condenses into visible chromosomes when the cell divides.\n" +
        "- The **nucleolus** has no membrane. It holds the genes for ribosomal RNA (rRNA), makes rRNA, and assembles ribosome subunits.\n" +
        "- In mitosis the envelope and nucleolus break down in prophase and reform in telophase, so a cell at metaphase shows no nucleus.\n" +
        "- Mature human red blood cells have no nucleus; skeletal muscle fibres have many.",
      table: {
        columns: ["Part", "Structure", "Job"],
        rows: [
          { cells: ["Nuclear envelope", "Two membranes; the outer one joins the rough ER", "Separates DNA from the cytoplasm"] },
          { cells: ["Nuclear pores", "Protein complexes through both membranes", "Control traffic: mRNA out, proteins in"] },
          { cells: ["Chromatin", "DNA wrapped round histones", "Carries the genes"] },
          { cells: ["Nucleolus", "Dense region with no membrane, containing DNA and RNA", "Makes rRNA and assembles ribosome subunits"] },
        ],
      },
      selfCheckExample: {
        prompt: "A human liver cell is in metaphase of mitosis. Which structure would you NOT see in it?",
        options: [
          "Condensed chromosomes",
          "Mitochondria",
          "The nuclear envelope",
          "Spindle microtubules",
          "Ribosomes",
        ],
        steps: [
          "The nuclear envelope breaks down in prophase and does not reform until telophase, so it is absent at metaphase: C.",
          "Chromosomes are most condensed at metaphase (A), the spindle is fully formed (D), and mitochondria and ribosomes stay in the cytoplasm throughout (B, E).",
        ],
        answer: "(C) The nuclear envelope",
      },
      practiceSet: [
        { prompt: "Which part of the nucleus assembles ribosome subunits?", answer: "The nucleolus" },
        { prompt: "How many membranes make up the nuclear envelope?", answer: "Two" },
        { prompt: "Which process happens in the nucleus: transcription or translation?", answer: "Transcription" },
      ],
      traps: [
        {
          title: "The nucleolus contains DNA and has no membrane",
          body: "The nucleolus is built around the genes for ribosomal RNA, so it contains DNA as well as RNA. It is not wrapped in a membrane of its own. A question asking for a structure with RNA but no DNA wants the ribosome, not the nucleolus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-ribosomes",
      name: "Ribosomes: what they are made of, their types and where they sit",
      intuition:
        "A ribosome is a small machine that reads mRNA and joins amino acids into a chain. It is made of RNA and protein, with no membrane round it, so it is found in every cell, prokaryotic or eukaryotic. Its size tells you where it came from.",
      definition:
        "**Ribosomes** carry out **translation**: they read mRNA and link amino acids, carried by tRNA, into a polypeptide.\n" +
        "- Made of **ribosomal RNA and protein**. They contain no DNA and have no membrane.\n" +
        "- Two subunits, large and small, which join on an mRNA.\n" +
        "- Sizes are given in **S** (Svedberg units, a measure of how fast a particle settles in a centrifuge). S values do not add: 50S + 30S makes a 70S ribosome.\n" +
        "- **Free** ribosomes make proteins that stay in the cytosol. Ribosomes **bound** to the rough ER make proteins for secretion, for membranes and for lysosomes. A single mRNA is often read by several ribosomes at once (a polysome).\n" +
        "- Some antibiotics (tetracycline, streptomycin) block 70S ribosomes, which is why they stop bacteria with little effect on the 80S ribosomes of human cytoplasm.",
      table: {
        columns: ["Feature", "Eukaryotic cytoplasm", "Prokaryotes, mitochondria and chloroplasts"],
        rows: [
          { cells: ["Whole ribosome", "80S", "70S"] },
          { cells: ["Subunits", "60S and 40S", "50S and 30S"] },
          { cells: ["Made of", "rRNA and protein", "rRNA and protein"] },
          { cells: ["Where found", "Free in cytosol, or on rough ER and the outer nuclear membrane", "Free in the cytoplasm, or in the mitochondrial matrix and chloroplast stroma"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "An antibiotic binds only to 70S ribosomes. In a human cell, protein synthesis in which structure is most likely to be affected?",
        options: [
          "The rough endoplasmic reticulum",
          "The nucleolus",
          "The Golgi apparatus",
          "The mitochondria",
          "The free ribosomes of the cytosol",
        ],
        steps: [
          "Mitochondria have their own 70S ribosomes, like bacteria: D.",
          "Ribosomes on the rough ER (A) and in the cytosol (E) are 80S. The nucleolus (B) assembles ribosome subunits but does not translate. The Golgi (C) modifies proteins but does not make them.",
        ],
        answer: "(D) The mitochondria",
      },
      practiceSet: [
        { prompt: "What two kinds of molecule make up a ribosome?", answer: "Ribosomal RNA and protein" },
        { prompt: "Which process happens on ribosomes: transcription or translation?", answer: "Translation" },
        { prompt: "Where would you find the ribosomes that make insulin for export?", answer: "On the rough endoplasmic reticulum" },
      ],
      traps: [
        {
          title: "Ribosomes contain RNA but not DNA, and do not transcribe",
          body: "Ribosomes are built of RNA and protein. Transcription, making RNA from DNA, happens in the nucleus; ribosomes do translation. Options saying ribosomes contain DNA or carry out transcription are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-secretory-pathway",
      name: "Endoplasmic reticulum and Golgi: the route of a secreted protein",
      intuition:
        "Think of a factory and a post office. The rough ER is the factory floor, with ribosomes on it making proteins and pushing them inside. Vesicles carry them to the Golgi, the post office, which finishes them, adds labels and sends each one to the right address. The smooth ER makes lipids instead of proteins.",
      definition:
        "The **endomembrane system** is the set of membranes linked by vesicles: nuclear envelope, ER, Golgi, lysosomes, vesicles and the plasma membrane.\n" +
        "- **Rough ER** (RER): flattened sacs covered in ribosomes. Proteins made there enter its lumen, fold, and get their first sugar chains, becoming **glycoproteins**.\n" +
        "- **Smooth ER** (SER): tubes with no ribosomes. Makes lipids, phospholipids and steroid hormones; detoxifies drugs and alcohol in liver cells; stores \\(\\mathrm{Ca^{2+}}\\) in muscle (where it is called the sarcoplasmic reticulum).\n" +
        "- **Golgi apparatus**: a stack of flattened sacs. Vesicles from the ER arrive at one face, proteins are modified (sugars trimmed and added), sorted and packed, and vesicles leave from the other face. It also makes lysosomes and, in plants, cell wall polysaccharides.\n" +
        "- Every eukaryotic cell that makes proteins has a Golgi, including neurons; it is largest in secretory cells such as pancreatic and mucus cells.\n" +
        "- Vesicles bud from the RER, the Golgi and the plasma membrane.",
      table: {
        columns: ["Step", "Structure", "What happens"],
        rows: [
          { cells: ["1", "Ribosome on the rough ER", "mRNA is translated; the growing chain is threaded into the ER lumen"] },
          { cells: ["2", "Rough ER lumen", "The protein folds and first sugar chains are added"] },
          { cells: ["3", "Transport vesicle", "Buds off the ER and carries the protein to the Golgi"] },
          { cells: ["4", "Golgi apparatus", "Modifies, sorts and packs the protein"] },
          { cells: ["5", "Secretory vesicle", "Moves to the plasma membrane and fuses with it, releasing the protein"] },
        ],
        caption: "Amino acids → ribosome → rough ER → vesicle → Golgi → vesicle → plasma membrane. The nucleus is not on the route.",
      },
      selfCheckExample: {
        prompt: "Which of the following is a job of the smooth endoplasmic reticulum rather than the rough endoplasmic reticulum?",
        options: [
          "Making steroid hormones in cells of the adrenal gland",
          "Translating mRNA for proteins that will be secreted",
          "Adding the first sugar chains to new proteins",
          "Packing proteins into lysosomes",
          "Sorting proteins into secretory vesicles",
        ],
        steps: [
          "Steroids are lipids, and lipid synthesis is the smooth ER's job: A.",
          "B and C happen on and in the rough ER. D and E are jobs of the Golgi apparatus.",
        ],
        answer: "(A) Making steroid hormones in cells of the adrenal gland",
      },
      practiceSet: [
        { prompt: "Put in order for a secreted enzyme: Golgi, ribosome, rough ER.", answer: "Ribosome, rough ER, Golgi" },
        { prompt: "Which organelle detoxifies alcohol in liver cells?", answer: "The smooth ER" },
        { prompt: "Name three structures that can produce vesicles.", answer: "Rough ER, Golgi apparatus and plasma membrane" },
      ],
      traps: [
        {
          title: "The Golgi modifies and ships proteins; it does not make them",
          body: "Proteins are made on ribosomes. The Golgi receives them from the rough ER in vesicles, modifies and packs them, and sends them to the membrane, to lysosomes or out of the cell. Secreted proteins never return to the nucleus for checking.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-lysosomes",
      name: "Lysosomes, peroxisomes and vacuoles",
      intuition:
        "A cell needs places to break things down safely. Lysosomes are sealed bags of digestive enzymes that only work in acid, so they are harmless if they leak into the neutral cytosol. Plant cells keep a large water-filled vacuole that both stores things and keeps the cell firm.",
      definition:
        "- **Lysosomes**: single-membrane vesicles holding about fifty **hydrolytic enzymes** (proteases, lipases, nucleases). Their enzymes are made on the rough ER, and lysosomes form by **budding from the Golgi apparatus**. A proton pump keeps the inside at about **pH 4.5 to 5**, where the enzymes work best; the cytosol is about pH 7.2.\n" +
        "- Lysosomes digest material taken in by the cell and worn-out organelles (**autophagy**). A missing lysosomal enzyme causes a **lysosomal storage disease** (for example Tay-Sachs disease).\n" +
        "- **Peroxisomes**: single-membrane vesicles with oxidase enzymes and **catalase**, which breaks down toxic hydrogen peroxide into water and oxygen. They also break down fatty acids.\n" +
        "- **Vacuoles**: a plant cell has one large central vacuole bounded by the **tonoplast**, holding cell sap (water, ions, sugars, pigments). It keeps the cell turgid and stores substances. Freshwater protists use contractile vacuoles to pump out excess water.",
      table: {
        columns: ["Organelle", "Membrane", "Contents", "Job"],
        rows: [
          { cells: ["Lysosome", "Single", "Hydrolytic enzymes at about pH 5", "Digestion of engulfed material and old organelles"] },
          { cells: ["Peroxisome", "Single", "Oxidases and catalase", "Breaks down \\(\\mathrm{H_2O_2}\\) and fatty acids"] },
          { cells: ["Central vacuole (plants)", "Single, the tonoplast", "Cell sap", "Turgor and storage"] },
          { cells: ["Contractile vacuole (protists)", "Single", "Water", "Removes excess water"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does a small leak of lysosomal enzymes into the cytosol usually do little damage to the cell?",
        options: [
          "The cytosol contains no proteins for them to digest.",
          "The enzymes work best near pH 5, and the cytosol is close to pH 7.",
          "The enzymes need light to become active.",
          "Ribosomes digest the enzymes as soon as they leave the lysosome.",
          "The cytosol is more acidic than the inside of the lysosome.",
        ],
        steps: [
          "Lysosomal enzymes are acid hydrolases: they are most active at pH 4.5 to 5 and work poorly at the near-neutral pH of the cytosol: B.",
          "E reverses the pH difference. The cytosol is full of proteins (A). Ribosomes build proteins; they do not digest them (D).",
        ],
        answer: "(B) The enzymes work best near pH 5, and the cytosol is close to pH 7.",
      },
      practiceSet: [
        { prompt: "Which organelle contains catalase?", answer: "The peroxisome" },
        { prompt: "From which organelle do lysosomes bud?", answer: "The Golgi apparatus" },
        { prompt: "What is the membrane around a plant cell's central vacuole called?", answer: "The tonoplast" },
      ],
      traps: [
        {
          title: "Lysosomal enzymes work below pH 7, not above",
          body: "The inside of a lysosome is acidic, about pH 4.5 to 5, and its enzymes work best there. Options giving an optimum above pH 7, saying lysosomes bud from the smooth ER, or saying their malfunction causes no disease are all wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-bulk-transport",
      name: "Endocytosis and exocytosis: moving large cargo in vesicles",
      intuition:
        "Some cargo is far too big for any channel or carrier: a bacterium, a drop of fluid, a load of hormone. The membrane deals with it by wrapping it in a bubble of membrane. Because the bilayer is fluid, a vesicle can pinch off from it or merge into it without tearing a hole.",
      definition:
        "**Bulk transport** moves large particles or large amounts in vesicles. It is **active**: it uses ATP.\n" +
        "- **Endocytosis** brings material in. The membrane folds in round it and pinches off as a vesicle, which often fuses with a lysosome.\n" +
        "- **Exocytosis** sends material out. A vesicle, usually from the Golgi, fuses with the plasma membrane and empties its contents outside. Its membrane becomes part of the plasma membrane.\n" +
        "- Exocytosis releases hormones (insulin), digestive enzymes, mucus, and neurotransmitters at every nerve ending.",
      table: {
        columns: ["Process", "Direction", "What moves", "Example"],
        rows: [
          { cells: ["Phagocytosis (cell eating)", "Into the cell", "Large particles or whole cells", "Macrophages and neutrophils engulfing bacteria"] },
          { cells: ["Pinocytosis (cell drinking)", "Into the cell", "Small droplets of extracellular fluid", "Most cells, continuously"] },
          { cells: ["Receptor-mediated endocytosis", "Into the cell", "Specific molecules bound to surface receptors", "LDL (cholesterol) uptake by liver cells"] },
          { cells: ["Exocytosis", "Out of the cell", "Contents of secretory vesicles", "Insulin from pancreas cells; neurotransmitter from neurons"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about exocytosis is correct?",
        options: [
          "It brings large particles into the cell.",
          "It needs no energy, because the vesicle moves down a gradient.",
          "It happens only in gland cells, never in neurons.",
          "It moves proteins out one molecule at a time through channel proteins.",
          "It adds membrane to the cell surface when the vesicle fuses with it.",
        ],
        steps: [
          "When a vesicle fuses with the plasma membrane, its membrane becomes part of the surface: E.",
          "A describes endocytosis. Bulk transport uses ATP (B). Neurons release neurotransmitters by exocytosis (C). Exocytosis moves cargo in bulk inside vesicles, not through channels (D).",
        ],
        answer: "(E) It adds membrane to the cell surface when the vesicle fuses with it.",
      },
      practiceSet: [
        { prompt: "What kind of endocytosis does a macrophage use to take in a bacterium?", answer: "Phagocytosis" },
        { prompt: "Does bulk transport use ATP?", answer: "Yes" },
        { prompt: "By which process does a nerve ending release its neurotransmitter?", answer: "Exocytosis" },
      ],
      traps: [
        {
          title: "Neurons secrete too",
          body: "Exocytosis is not only for gland cells. Every nerve ending releases neurotransmitter by exocytosis, and every neuron, like nearly every body cell, carries the full set of genes, including the insulin gene, even though it does not express it.",
        },
      ],
    },
  ],
};
