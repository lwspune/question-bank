import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_SO_TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Animal Tissues",
  title: "Animal Tissues",
  oneLineDefinition:
    "The four basic animal tissues (epithelial, connective, muscle and neural), their kinds, where each is found, and the three cell junctions that hold cells together.",
  whyItMatters:
    "Twelve NEET questions from 2021 to 2024, none since Re-NEET 2024. Four were match-the-columns pairing a tissue with the place it is found, and goblet cells appeared in three of those. Four more tested the classes of connective tissue.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoso-epithelium",
      name: "Epithelial tissue and glands",
      visualizationSlug: "neet-simple-epithelium",
      intuition:
        "Epithelium is the body's covering and lining. Its cells sit packed close together with very little material between them, and one face is always free, facing a body fluid or the outside. One layer of cells makes a simple epithelium, good for lining tubes and letting things pass. Many layers make a compound epithelium, good for protection. Some epithelial cells turn into glands.",
      definition:
        "Epithelial tissue (epithelium):\n" +
        "- Has a **free surface** facing a body fluid or the outside, and gives a covering or lining to some part of the body.\n" +
        "- Its cells are **compactly packed** with **little intercellular matrix**.\n" +
        "- Two kinds: **simple epithelium** (a single layer, lining body cavities, ducts and tubes) and **compound epithelium** (two or more layers, mainly protective, as in the skin).\n\n" +
        "Simple epithelium has three shapes:\n" +
        "- **Squamous:** one thin layer of **flattened cells with irregular boundaries**. In the walls of **blood vessels** and the **air sacs of lungs**, where it forms a **diffusion boundary**.\n" +
        "- **Cuboidal:** one layer of **cube-like cells**. In the **ducts of glands** and the **tubular parts of nephrons**, for **secretion and absorption**. The epithelium of the **proximal convoluted tubule (PCT)** has **microvilli**.\n" +
        "- **Columnar:** one layer of **tall, slender cells** with their **nuclei at the base**; the free surface may have microvilli. Lines the **stomach and intestine**, for secretion and absorption.\n" +
        "- **Ciliated epithelium:** columnar or cuboidal cells that bear **cilia** on the free surface. They move particles or mucus in one direction. Mainly on the inner surface of hollow organs such as the **bronchioles and Fallopian tubes**.\n\n" +
        "Glandular epithelium (columnar or cuboidal cells specialised for **secretion**):\n" +
        "- **Unicellular:** isolated gland cells, such as the **goblet cells of the alimentary canal**.\n" +
        "- **Multicellular:** clusters of cells, such as the **salivary gland**.\n" +
        "- By how they pour out their product: **exocrine glands** release mucus, saliva, earwax, oil, milk, digestive enzymes and other products **through ducts**; **endocrine glands** have **no ducts** and release **hormones** straight into the fluid bathing the gland.\n\n" +
        "Compound epithelium: many layers, so only a **limited role in secretion and absorption**. Its main job is **protection against chemical and mechanical stress**. It covers the **dry surface of the skin**, the **moist surface of the buccal cavity** and the **pharynx**, and lines the **ducts of salivary glands** and the **pancreatic ducts**.",
      table: {
        columns: ["Epithelium", "Cells", "Where NCERT places it"],
        rows: [
          { cells: ["Squamous", "One layer of flat cells with irregular boundaries", "Walls of blood vessels; air sacs of lungs"] },
          { cells: ["Cuboidal", "One layer of cube-like cells; microvilli in the PCT", "Ducts of glands; tubular parts of nephrons"] },
          { cells: ["Columnar", "One layer of tall cells, nuclei at the base", "Lining of stomach and intestine"] },
          {
            cells: ["Ciliated", "Columnar or cuboidal cells with cilia", "Bronchioles; Fallopian tubes"],
            noteAmber: "NEET 2022: bronchioles were matched with ciliated epithelium.",
            pyqExampleId: "f9c31a06-eaea-4b3b-a706-e1b8b92a2d70",
          },
          {
            cells: ["Glandular, unicellular", "Isolated gland cells", "Goblet cells of the alimentary canal"],
            noteAmber: "NEET 2024: goblet cells were matched with unicellular glandular epithelium.",
            pyqExampleId: "8083bcec-ff74-4d53-9e3d-ffc2f5ad4e0e",
          },
          { cells: ["Glandular, multicellular", "Clusters of gland cells", "Salivary gland"] },
          { cells: ["Compound", "Two or more layers", "Skin; moist buccal cavity; pharynx; ducts of salivary glands and pancreatic ducts"] },
        ],
      },
      pyqExampleId: "1ad1acfe-3e1c-469a-9e2c-c7744968d2bf",
      selfCheckExample: {
        prompt: "The inner lining of the stomach is made of a single layer of tall, slender cells. Name this epithelium and give its two jobs there.",
        steps: [
          "One layer of tall, slender cells with nuclei at the base is columnar epithelium.",
          "NCERT places it in the lining of the stomach and intestine, where it helps in secretion and absorption.",
        ],
        answer: "Columnar epithelium; secretion and absorption.",
      },
      practiceSet: [
        { prompt: "Which part of the nephron has cuboidal epithelium bearing microvilli?", answer: "The proximal convoluted tubule (PCT)" },
        { prompt: "In columnar epithelium, where in the cell does the nucleus lie?", answer: "At the base" },
        { prompt: "What are the products of endocrine glands called, and how do they leave the gland?", answer: "Hormones; they are secreted directly into the fluid bathing the gland, since there are no ducts" },
        { prompt: "Why does compound epithelium play only a limited role in secretion and absorption?", answer: "Because it is made of more than one layer of cells" },
        { prompt: "Give the NCERT example of a multicellular gland.", answer: "The salivary gland" },
      ],
      traps: [
        {
          title: "Pancreatic ducts are lined by compound epithelium",
          body: "Cuboidal epithelium is found in the **ducts of glands** in general, but NCERT names the **inner lining of pancreatic ducts and of salivary gland ducts** as **compound** epithelium.",
        },
        {
          title: "Goblet cells are unicellular glands",
          body: "A **goblet cell** is a single isolated gland cell, so it is **unicellular** glandular epithelium. The **salivary gland** is the multicellular example.",
        },
        {
          title: "Squamous epithelium forms a diffusion boundary",
          body: "The walls of **blood vessels** and the **air sacs of the lungs** are **squamous** epithelium. Ciliated epithelium lines the **bronchioles** and **Fallopian tubes**, not the blood vessels.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-junctions",
      name: "Cell junctions",
      intuition:
        "Cells in a tissue are not just placed side by side. Special junctions join them. One kind seals the gaps so nothing leaks through, one kind glues the cells together, and one kind opens a little channel so the cells can pass ions and small molecules straight to each other.",
      definition:
        "In nearly all animal tissues, **specialised junctions** give both **structural and functional links** between neighbouring cells. NCERT describes **three** kinds:\n" +
        "- **Tight junctions:** help to **stop substances from leaking** across a tissue.\n" +
        "- **Adhering junctions:** perform **cementing** to keep neighbouring cells together.\n" +
        "- **Gap junctions:** help cells **communicate** by **connecting the cytoplasm** of adjoining cells, for **rapid transfer of ions, small molecules and sometimes big molecules**.\n\n" +
        "The same idea appears in muscle: **cell junctions** hold smooth muscle fibres together, and in cardiac muscle the communication junctions called **intercalated discs** let the cells contract as a unit.",
      table: {
        columns: ["Junction", "What it does"],
        rows: [
          {
            cells: ["Tight junction", "Stops substances from leaking across a tissue"],
            noteAmber: "Re-NEET 2024: the correct statement was that tight junctions stop substances leaking across a tissue.",
            pyqExampleId: "4e9bd139-5598-46fa-9b95-505355d6f5c2",
          },
          { cells: ["Adhering junction", "Cements neighbouring cells together"] },
          { cells: ["Gap junction", "Connects the cytoplasm of adjoining cells for rapid transfer of ions, small molecules and sometimes big molecules"] },
        ],
      },
      pyqExampleId: "165417b6-1423-46cc-9ed7-1c6c10935424",
      selfCheckExample: {
        prompt: "Two neighbouring cells must stay firmly stuck to each other. Which cell junction does this job, and how does NCERT describe its action?",
        steps: [
          "Of the three junctions, the tight junction seals and the gap junction communicates.",
          "The adhering junction performs cementing to keep neighbouring cells together.",
        ],
        answer: "The adhering junction, which cements the cells together.",
      },
      practiceSet: [
        { prompt: "How many kinds of cell junction does NCERT describe in animal tissues?", answer: "Three: tight, adhering and gap junctions" },
        { prompt: "Besides ions and small molecules, what can gap junctions sometimes pass between cells?", answer: "Big molecules" },
        { prompt: "What are the communication junctions of cardiac muscle called?", answer: "Intercalated discs" },
        { prompt: "In epithelial tissue, how much intercellular matrix lies between the cells?", answer: "Very little; the cells are compactly packed" },
      ],
      traps: [
        {
          title: "Adhering junctions cement, they do not communicate",
          body: "**Adhering** junctions keep cells stuck together. **Communication** between cells is the job of **gap** junctions.",
        },
        {
          title: "Gap junctions do not make gaps",
          body: "A **gap junction** connects the cytoplasm of two cells so that ions and molecules pass across. It does not create a space between cells or tissues.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-connective",
      name: "Connective tissue",
      intuition:
        "Connective tissue links and supports the other tissues. In every kind except blood, its cells make protein fibres (collagen or elastin) for strength and stretch, and a jelly-like ground substance between them. How the fibres are packed, and what the ground substance is like, decides the class.",
      definition:
        "Connective tissue is the **most abundant and widely distributed** tissue in complex animals, named for its job of **linking and supporting** other tissues and organs.\n" +
        "- In **all connective tissues except blood**, the cells secrete fibres of the structural proteins **collagen or elastin**, which give strength, elasticity and flexibility.\n" +
        "- The cells also secrete **modified polysaccharides**, which collect between cells and fibres as the **matrix (ground substance)**.\n\n" +
        "Three classes:\n" +
        "- **Loose connective tissue:** cells and fibres loosely arranged in a **semi-fluid ground substance**. **Areolar tissue** lies beneath the skin and supports epithelium; it has **fibroblasts** (which make and secrete fibres), **macrophages** and **mast cells**. **Adipose tissue**, mainly beneath the skin, is also loose connective tissue; its cells **store fats** made from extra nutrients.\n" +
        "- **Dense connective tissue:** fibres and fibroblasts **compactly packed**. In **dense regular** tissue, collagen fibres run in rows between parallel bundles of fibres: **tendons** (attach skeletal muscle to bone) and **ligaments** (attach bone to bone). In **dense irregular** tissue the fibres, mostly collagen, point in different directions: found in the **skin**.\n" +
        "- **Specialised connective tissue:** **cartilage, bone and blood**.\n" +
        "- **Cartilage:** intercellular material is **solid and pliable** and resists compression. Its cells, **chondrocytes**, sit in small cavities in the matrix they secrete. Most embryonic cartilage is replaced by bone in adults. In adults it remains at the tip of the nose, the outer ear joints, **between adjacent bones of the vertebral column**, and in the limbs and hands.\n" +
        "- **Bone:** hard, non-pliable ground substance **rich in calcium salts and collagen fibres**. The main tissue of the body's frame. Bone cells, **osteocytes**, sit in spaces called **lacunae**. The **bone marrow** of some bones makes blood cells.\n" +
        "- **Blood:** a **fluid connective tissue** of plasma, RBCs, WBCs and platelets; the main circulating fluid.",
      table: {
        columns: ["Tissue", "Class", "Key fact"],
        rows: [
          {
            cells: ["Areolar tissue", "Loose", "Beneath the skin; has fibroblasts, macrophages and mast cells"],
            noteAmber: "NEET 2023: mast cells were matched with areolar connective tissue, and blood with specialised connective tissue.",
            pyqExampleId: "dd707bee-ee3a-445f-b5d2-a7bbab53952e",
          },
          { cells: ["Adipose tissue", "Loose", "Mainly beneath the skin; stores fat"] },
          {
            cells: ["Tendon and ligament", "Dense regular", "Tendon joins muscle to bone; ligament joins bone to bone"],
            noteAmber: "NEET 2023: 'ligaments are dense irregular tissue' was false; they are dense regular.",
            pyqExampleId: "4b96dc20-467f-4605-8e5c-b82b71930662",
          },
          { cells: ["Connective tissue of the skin", "Dense irregular", "Collagen fibres oriented in different directions"] },
          {
            cells: ["Cartilage", "Specialised", "Chondrocytes in cavities; solid, pliable matrix; between vertebrae"],
            noteAmber: "NEET 2022: cartilage is what lies between adjacent bones of the vertebral column.",
            pyqExampleId: "d009eb60-550f-42ce-82ea-02642bdb68cc",
          },
          { cells: ["Bone", "Specialised", "Osteocytes in lacunae; calcium salts and collagen; marrow makes blood cells"] },
          { cells: ["Blood", "Specialised (fluid)", "The only connective tissue whose cells secrete no fibres"] },
        ],
      },
      pyqExampleId: "d1eeefd2-42b1-45d7-8adc-0d1fb548eff1",
      selfCheckExample: {
        prompt: "A band of tissue attaches a skeletal muscle to a bone. Name the structure and the class of connective tissue it belongs to.",
        steps: [
          "A structure joining muscle to bone is a tendon (a ligament joins bone to bone).",
          "NCERT gives tendons and ligaments as examples of dense regular connective tissue.",
        ],
        answer: "A tendon, which is dense regular connective tissue.",
      },
      practiceSet: [
        { prompt: "What are cartilage cells called, and where do they sit?", answer: "Chondrocytes, in small cavities within the matrix they secrete" },
        { prompt: "What are bone cells called, and what are the spaces they sit in called?", answer: "Osteocytes, in lacunae" },
        { prompt: "Which loose connective tissue stores fat?", answer: "Adipose tissue" },
        { prompt: "Where in the body is dense irregular connective tissue found?", answer: "In the skin" },
        { prompt: "What do connective tissue cells secrete that forms the matrix, or ground substance?", answer: "Modified polysaccharides" },
      ],
      traps: [
        {
          title: "Ligaments are dense regular, not dense irregular",
          body: "Both **tendons and ligaments** are **dense regular** connective tissue. NCERT's example of **dense irregular** tissue is the **skin**.",
        },
        {
          title: "Cartilage is specialised connective tissue",
          body: "Cartilage, bone and blood are the three **specialised** connective tissues. Cartilage is not a dense regular tissue.",
        },
        {
          title: "Blood is the exception for fibres",
          body: "The cells of every connective tissue **except blood** secrete collagen or elastin fibres. Cartilage, bone, adipose and areolar tissue all have them.",
        },
        {
          title: "Adipose tissue is loose connective tissue",
          body: "Adipose tissue is a **loose** connective tissue that stores fat. It is not a specialised connective tissue.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-muscle-neural",
      name: "Muscle tissue and neural tissue",
      intuition:
        "Muscle tissue is made of long fibres that shorten when stimulated and then relax. Skeletal muscle moves the bones and obeys your will. Smooth muscle in the walls of the gut and blood vessels works on its own. Cardiac muscle is found only in the heart, and its cells are linked so that they beat together. Neural tissue carries signals; its neurons do the signalling and the neuroglia look after them.",
      definition:
        "Muscle tissue:\n" +
        "- Each muscle is made of many long, cylindrical **fibres** in parallel arrays. Each fibre has many fine **myofibrils**. Fibres **contract** when stimulated, then **relax**.\n" +
        "- **Skeletal muscle:** closely attached to skeletal bones. In a typical muscle such as the **biceps**, **striated** fibres are bundled in parallel, and a sheath of tough connective tissue encloses several bundles.\n" +
        "- **Smooth muscle:** fibres **taper at both ends (fusiform)** and show **no striations**. **Cell junctions** hold them together, and they are bundled in a connective tissue sheath. In the walls of internal organs such as the **blood vessels, stomach and intestine**. **Involuntary:** we cannot make it contract just by thinking.\n" +
        "- **Cardiac muscle:** a contractile tissue found **only in the heart**. Cell junctions fuse the membranes of the cells; **communication junctions (intercalated discs)** at some fusion points let the cells **contract as a unit**. The chapter Locomotion and Movement adds that cardiac muscle is striated and involuntary.\n\n" +
        "Neural tissue:\n" +
        "- Exerts the **greatest control** over the body's response to changing conditions.\n" +
        "- **Neurons**, the units of the neural system, are **excitable cells**.\n" +
        "- **Neuroglia** protect and support the neurons and make up **more than one half of the volume** of neural tissue. They are part of neural tissue, not connective tissue.",
      table: {
        columns: ["Tissue", "Look", "Where", "Control"],
        rows: [
          { cells: ["Skeletal muscle", "Striated fibres in parallel bundles", "Attached to bones, as in the biceps", "Voluntary"] },
          { cells: ["Smooth muscle", "Fusiform, no striations, joined by cell junctions", "Walls of blood vessels, stomach, intestine", "Involuntary"] },
          { cells: ["Cardiac muscle", "Cells joined by intercalated discs", "Heart only", "Involuntary"] },
          {
            cells: ["Neural tissue", "Neurons plus neuroglia (over half the volume)", "Neural system", "Controls the body's responses"],
            noteAmber: "NEET 2022: neuroglia was the one tissue in the list that is not connective tissue.",
            pyqExampleId: "fa0a6a9b-b9d1-4587-bfe1-b16bb72d2c05",
          },
        ],
      },
      pyqExampleId: "3cfda7a0-28ac-48ed-b1c8-18aef9c3ad5e",
      selfCheckExample: {
        prompt: "Name the two kinds of cell in neural tissue and say what each does.",
        steps: [
          "Neurons are the units of the neural system; they are excitable cells that carry signals.",
          "Neuroglial cells make up the rest; they protect and support the neurons.",
        ],
        answer: "Neurons carry signals as excitable cells; neuroglia protect and support the neurons.",
      },
      practiceSet: [
        { prompt: "What are the fine fibrils inside a muscle fibre called?", answer: "Myofibrils" },
        { prompt: "What shape are smooth muscle fibres?", answer: "Fusiform: they taper at both ends" },
        { prompt: "What share of the volume of neural tissue is made up of neuroglia?", answer: "More than one half" },
        { prompt: "In a muscle such as the biceps, what encloses several bundles of skeletal muscle fibres?", answer: "A sheath of tough connective tissue" },
      ],
      traps: [
        {
          title: "Intercalated discs belong to cardiac muscle only",
          body: "**Intercalated discs** are the communication junctions of **cardiac** muscle. Smooth muscle fibres are held by ordinary cell junctions, with no intercalated discs.",
        },
        {
          title: "Neuroglia are neural tissue",
          body: "**Neuroglia** support neurons and are part of **neural** tissue. Blood, adipose tissue and cartilage are the connective tissues.",
        },
      ],
    },
  ],
};
