import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CE_ORGANELLES_NOTE: SubtopicNote = {
  subtopicName: "Mitochondria, Plastids and Ribosomes",
  title: "Mitochondria, Plastids and Ribosomes",
  oneLineDefinition:
    "The structure of the mitochondrion and the chloroplast, the kinds of plastid and what each stores, the 80S and 70S ribosomes, and the names of the sacs inside organelles.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026. The sacs of the cell (cristae, cisternae, thylakoids) were matched twice, NEET 2021 and Re-NEET 2026. The rest are single NCERT lines: what the inner mitochondrial membrane encloses, chloroplast DNA, the plastid that stores xanthophyll, and the two subunits of each ribosome.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboce-mitochondria",
      name: "The mitochondrion",
      intuition:
        "The mitochondrion is where the cell burns food with oxygen to make ATP, so it is called the power house of the cell. It has two membranes. The inner one folds again and again into cristae, which gives far more surface for this work. Inside the inner membrane is the matrix, which even holds its own small circular DNA and ribosomes.",
      definition:
        "The mitochondrion:\n" +
        "- Hard to see under the microscope unless specially stained. Their number per cell depends on how active the cell is.\n" +
        "- Sausage-shaped or cylindrical: **0.2 to 1.0 µm** across (average **0.5 µm**) and **1.0 to 4.1 µm** long.\n" +
        "- **Double membrane-bound.** The outer and inner membranes divide its lumen into two watery compartments, the outer compartment and the inner compartment.\n" +
        "- The inner compartment, enclosed by the inner membrane, is the **matrix**: dense and homogeneous.\n" +
        "- The outer membrane is the smooth outer boundary. The inner membrane folds into the matrix as **cristae**, which **increase the surface area**. Each membrane has its own enzymes.\n" +
        "- **Sites of aerobic respiration:** they make cellular energy as **ATP**, hence power houses of the cell. The inner membrane carries the **F₁ particles (oxysomes)**.\n" +
        "- The matrix holds a single **circular DNA**, a few RNA molecules, **ribosomes (70S)** and what is needed to make proteins.\n" +
        "- Mitochondria **divide by fission**.",
      table: {
        columns: ["Part", "NCERT fact"],
        rows: [
          { cells: ["Membranes", "Two: an outer and an inner membrane"] },
          { cells: ["Matrix", "The inner compartment, enclosed by the inner membrane; dense and homogeneous"] },
          { cells: ["Cristae", "Infoldings of the inner membrane into the matrix; increase the surface area"] },
          { cells: ["Own machinery", "Single circular DNA, a few RNAs, 70S ribosomes"] },
          { cells: ["Size", "0.2 to 1.0 µm across (average 0.5 µm), 1.0 to 4.1 µm long"] },
          { cells: ["Job", "Aerobic respiration; makes ATP"] },
          { cells: ["Division", "By fission"] },
        ],
      },
      pyqExampleId: "34e46bbf-5d28-4d55-a175-8f92b83bd0cf",
      selfCheckExample: {
        prompt: "A mitochondrion can make some of its own proteins. Name three things in its matrix that make this possible.",
        steps: [
          "To make a protein, a structure needs DNA for the instructions and ribosomes to read them.",
          "The matrix holds a single circular DNA, a few RNA molecules and 70S ribosomes.",
        ],
        answer: "Its circular DNA, a few RNA molecules and 70S ribosomes.",
      },
      practiceSet: [
        { prompt: "How does a mitochondrion divide?", answer: "By fission" },
        { prompt: "What is the average diameter of a mitochondrion?", answer: "About 0.5 µm" },
        { prompt: "Which kind of respiration happens in mitochondria: aerobic or anaerobic?", answer: "Aerobic" },
        { prompt: "What do the infoldings of the inner mitochondrial membrane achieve?", answer: "They increase the surface area" },
      ],
      traps: [
        {
          title: "The matrix lies inside the inner membrane",
          body: "The inner membrane encloses the **matrix**. The **cytosol** is the cytoplasm outside the mitochondrion, and the outer compartment lies between the two membranes.",
        },
        {
          title: "Aerobic, and only in eukaryotes",
          body: "Mitochondria carry out **aerobic** respiration, not anaerobic. **Prokaryotes have no mitochondria**, so 'an organelle of both prokaryotes and eukaryotes' is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-plastids",
      name: "Plastids: chloroplasts, chromoplasts and leucoplasts",
      intuition:
        "Plastids are found in plant cells and in euglenoids. They are sorted by what they hold. Chloroplasts hold chlorophyll and catch light. Chromoplasts hold yellow, orange and red pigments. Leucoplasts have no colour and store food: starch, oil or protein. The chloroplast has two membranes, a fluid stroma, and stacks of flat sacs called thylakoids.",
      definition:
        "Kinds of plastid:\n" +
        "- Found in all plant cells and in **euglenoids**. Large, so easily seen. By their pigments they are **chloroplasts, chromoplasts and leucoplasts**.\n" +
        "- **Chloroplasts:** chlorophyll and carotenoid pigments; they trap light energy for photosynthesis.\n" +
        "- **Chromoplasts:** fat-soluble **carotenoid** pigments such as **carotene and xanthophylls**, which give yellow, orange or red colours.\n" +
        "- **Leucoplasts:** colourless plastids that store food. **Amyloplasts** store carbohydrates (starch), as in potato; **elaioplasts** store oils and fats; **aleuroplasts** store proteins.\n\n" +
        "The chloroplast:\n" +
        "- Mainly in the **mesophyll** cells of leaves. Lens-shaped, oval, spherical, discoid or ribbon-like; **5 to 10 µm** long and **2 to 4 µm** wide. From **one** per cell in *Chlamydomonas* to **20 to 40** per mesophyll cell.\n" +
        "- **Double membrane-bound**; the **inner** chloroplast membrane is relatively **less permeable**.\n" +
        "- The space inside the inner membrane is the **stroma**. In it lie flattened membranous sacs, the **thylakoids**, stacked like piles of coins into **grana**. Flat tubes called **stroma lamellae** join the thylakoids of different grana. The thylakoid membrane encloses a space, the **lumen**. Chlorophyll is in the thylakoids.\n" +
        "- The stroma has the enzymes for making carbohydrates and proteins, plus small, **double-stranded circular DNA** and **70S ribosomes** (smaller than the 80S ribosomes of the cytoplasm).",
      table: {
        columns: ["Plastid", "Holds or stores", "Note"],
        rows: [
          { cells: ["Chloroplast", "Chlorophyll and carotenoids", "Traps light; has double-stranded circular DNA and 70S ribosomes"] },
          {
            cells: ["Chromoplast", "Fat-soluble carotenoids: carotene, xanthophylls", "Yellow, orange or red colour"],
            noteAmber: "Re-NEET 2026: the plastid that stores xanthophyll is the chromoplast, not the aleuroplast or amyloplast.",
            pyqExampleId: "e75aec97-e5a0-4700-9b8d-999a9b3609f3",
          },
          { cells: ["Amyloplast", "Carbohydrates (starch)", "A leucoplast, as in potato"] },
          { cells: ["Elaioplast", "Oils and fats", "A leucoplast"] },
          { cells: ["Aleuroplast", "Proteins", "A leucoplast"] },
        ],
      },
      pyqExampleId: "c9fb6a1a-4571-4656-b2e6-8f9fa7ccd9ff",
      selfCheckExample: {
        prompt: "A potato tuber cell stores starch in colourless plastids. Name this plastid and the group it belongs to.",
        steps: [
          "Colourless plastids that store food are leucoplasts.",
          "The leucoplast that stores carbohydrate (starch) is the amyloplast.",
        ],
        answer: "An amyloplast, a kind of leucoplast.",
      },
      practiceSet: [
        { prompt: "How many chloroplasts does a *Chlamydomonas* cell have?", answer: "One" },
        { prompt: "Which leucoplast stores proteins?", answer: "The aleuroplast" },
        { prompt: "Of the two chloroplast membranes, which is relatively less permeable?", answer: "The inner membrane" },
        { prompt: "What flat tubes join the thylakoids of different grana?", answer: "Stroma lamellae" },
        { prompt: "Besides plant cells, which group of organisms has plastids?", answer: "Euglenoids" },
      ],
      traps: [
        {
          title: "Xanthophyll means chromoplast",
          body: "Carotene and **xanthophylls** are the pigments of **chromoplasts**. Amyloplasts and aleuroplasts are colourless leucoplasts that store starch and protein.",
        },
        {
          title: "The inner chloroplast membrane is the less permeable one",
          body: "NCERT says that of the chloroplast's two membranes, the **inner** one is relatively **less permeable**. A statement that gives this property to the inner mitochondrial membrane is not an NCERT fact.",
        },
        {
          title: "Organelle DNA is circular",
          body: "Both chloroplasts and mitochondria carry **circular, double-stranded DNA** and 70S ribosomes. Linear or single-stranded is the wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-ribosomes",
      name: "Ribosomes: 80S and 70S",
      intuition:
        "A ribosome is a tiny granule of RNA and protein, with no membrane, that makes proteins. Every ribosome is built from a large and a small subunit. Eukaryotic ribosomes in the cytoplasm are 80S; prokaryotic ones are 70S, and so are the ribosomes inside mitochondria and chloroplasts. The S numbers measure how fast a particle settles, so they do not simply add up.",
      definition:
        "Ribosomes:\n" +
        "- Granular structures first seen under the electron microscope as dense particles by **George Palade** (1953).\n" +
        "- Made of **RNA and proteins**; **not surrounded by any membrane**.\n" +
        "- Eukaryotic ribosomes are **80S**; prokaryotic ribosomes are **70S**. Each has **two subunits**: 80S = **60S + 40S**; 70S = **50S + 30S**.\n" +
        "- **S** is the **sedimentation coefficient** (Svedberg unit). It indirectly measures density and size, which is why 60S and 40S make 80S, not 100S.\n" +
        "- Found free in the cytoplasm, on the rough ER, and inside mitochondria and chloroplasts (70S there).\n" +
        "- Several ribosomes attached to one mRNA form a **polysome** (polyribosome).",
      table: {
        columns: ["Ribosome", "Found in", "Subunits"],
        rows: [
          { cells: ["80S", "Cytoplasm and rough ER of eukaryotic cells", "60S (large) + 40S (small)"] },
          { cells: ["70S", "Prokaryotic cells; also mitochondria and chloroplasts", "50S (large) + 30S (small)"] },
        ],
      },
      pyqExampleId: "3255109b-4522-4fb0-bcec-df3a567ebe91",
      selfCheckExample: {
        prompt: "A 60S subunit and a 40S subunit join to make one ribosome. Why is the whole ribosome 80S and not 100S?",
        steps: [
          "S is a sedimentation coefficient: it tells how fast a particle settles.",
          "That depends on density and size together, not on mass alone, so S values do not add.",
        ],
        answer: "S measures the rate of sedimentation, not mass, so the values of the subunits do not add up.",
      },
      practiceSet: [
        { prompt: "What does the S in 80S stand for?", answer: "The Svedberg unit, a sedimentation coefficient" },
        { prompt: "What kind of ribosome is found inside mitochondria and chloroplasts?", answer: "70S" },
        { prompt: "What are ribosomes made of?", answer: "RNA and proteins" },
        { prompt: "Who first saw ribosomes, and with what kind of microscope?", answer: "George Palade, with the electron microscope" },
      ],
      traps: [
        {
          title: "S values do not add",
          body: "**60S + 40S = 80S** and **50S + 30S = 70S**. An option that pairs 80S with 60S and 20S, or 70S with 50S and 20S, has been made to add up and is wrong.",
        },
        {
          title: "70S ribosomes in a eukaryotic cell too",
          body: "A eukaryotic cell is not 80S everywhere: its **mitochondria and chloroplasts** have **70S** ribosomes, like a bacterium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-sacs",
      name: "Cristae, cisternae and thylakoids: naming the parts",
      intuition:
        "NEET often hands you a list of names (cristae, cisternae, thylakoids, centromere, axoneme, phospholipid) and asks where each one belongs. The names look alike, so learn each with its organelle in one line. Cristae go with the mitochondrion, cisternae with the Golgi, and thylakoids with the chloroplast.",
      definition:
        "Match each name to its home:\n" +
        "- **Cristae:** infoldings of the **inner mitochondrial membrane**.\n" +
        "- **Cisternae:** flat, **disc-shaped sacs of the Golgi apparatus**, 0.5 to 1.0 µm across.\n" +
        "- **Thylakoids:** flattened **membranous sacs in the stroma of plastids** (chloroplasts), stacked into **grana**.\n" +
        "- **Centromere:** the **primary constriction** of a chromosome, which holds its two chromatids together.\n" +
        "- **Phospholipid:** the main lipid of the **cell membrane** bilayer.\n" +
        "- **Axoneme:** the core of microtubules in a **cilium or flagellum**.\n" +
        "- The fluid inside a chloroplast is the **stroma**; inside a mitochondrion it is the **matrix**.",
      table: {
        columns: ["Name", "Where it is found", "What it is"],
        rows: [
          { cells: ["Cristae", "Mitochondrion", "Infoldings of the inner membrane"] },
          {
            cells: ["Cisternae", "Golgi apparatus", "Flat, disc-shaped sacs"],
            noteAmber: "Re-NEET 2026: cristae, cisternae, thylakoids and phospholipid were matched in one list.",
            pyqExampleId: "50a0c679-9180-4eb7-9ba6-dc83bef4ab13",
          },
          { cells: ["Thylakoids", "Stroma of a chloroplast", "Flattened membranous sacs, stacked into grana"] },
          { cells: ["Centromere", "Chromosome", "Primary constriction holding the two chromatids"] },
          { cells: ["Phospholipid", "Cell membrane", "The main lipid of the bilayer"] },
          { cells: ["Axoneme", "Cilium or flagellum", "Its core of microtubules"] },
        ],
      },
      pyqExampleId: "c9057e3c-6670-4008-b411-f55fb1e172e8",
      selfCheckExample: {
        prompt: "Name the core of microtubules inside a cilium, and the main lipid that forms the bilayer of the cell membrane.",
        steps: [
          "The microtubule core of a cilium or flagellum is the axoneme.",
          "The lipid bilayer of the membrane is made mainly of phospholipids.",
        ],
        answer: "The axoneme; phospholipid.",
      },
      practiceSet: [
        { prompt: "What are stacks of thylakoids in a chloroplast called?", answer: "Grana" },
        { prompt: "Which organelle has a stroma, and which has a matrix?", answer: "The chloroplast has a stroma; the mitochondrion has a matrix" },
        { prompt: "What is the space enclosed by the thylakoid membrane called?", answer: "The lumen" },
        { prompt: "How wide is a Golgi cisterna?", answer: "0.5 µm to 1.0 µm" },
      ],
      traps: [
        {
          title: "Cristae and cisternae are different organelles",
          body: "**Cristae** are folds of the inner **mitochondrial** membrane. **Cisternae** are the flat sacs of the **Golgi apparatus**. The two words look alike; their homes do not.",
        },
        {
          title: "Thylakoids sit in the stroma, not the matrix",
          body: "**Thylakoids** lie in the **stroma** of a chloroplast. The **matrix** belongs to the mitochondrion, which has cristae, not thylakoids.",
        },
      ],
    },
  ],
};
