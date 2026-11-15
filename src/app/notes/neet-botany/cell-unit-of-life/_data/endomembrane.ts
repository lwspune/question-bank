import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CE_ENDOMEMBRANE_NOTE: SubtopicNote = {
  subtopicName: "Membranes and the Endomembrane System",
  title: "Membranes and the Endomembrane System",
  oneLineDefinition:
    "What the plasma membrane and the plant cell wall are made of, which four organelles form the endomembrane system, and what the ER, Golgi apparatus, lysosomes and vacuoles each do.",
  whyItMatters:
    "Seven NEET questions from 2023 to 2026. Which organelles belong to the endomembrane system was asked three times (NEET 2023, NEET 2026 and Re-NEET 2026), and the cis and trans faces of the Golgi apparatus twice (Re-NEET 2024 and NEET 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboce-membranes",
      name: "The plasma membrane, the cell wall and the endomembrane system",
      intuition:
        "Every cell is wrapped in a thin membrane made mostly of a double layer of lipids, with proteins floating in it. A plant cell adds a stiff, non-living wall outside the membrane. Inside a eukaryotic cell, four membrane organelles work together as one team, the endomembrane system. Mitochondria, chloroplasts and peroxisomes have membranes too, but they are not on that team.",
      definition:
        "The plasma membrane:\n" +
        "- Its chemistry was worked out mostly on human red blood cells. The **lipids** are arranged in a **bilayer**, and the major lipids are **phospholipids**. Each lipid has its **polar head** facing outwards and its **hydrophobic tail** (saturated hydrocarbons) facing inwards, away from water. The membrane also has **cholesterol**.\n" +
        "- It also has **proteins and carbohydrates**. The ratio of protein to lipid varies: the membrane of human **RBCs has about 52% protein and 40% lipids**.\n" +
        "- Membrane proteins are **peripheral** (on the surface) or **integral** (partly or wholly buried).\n" +
        "- **Fluid mosaic model** (**Singer and Nicolson, 1972**): the lipid is quasi-fluid, so proteins can move sideways within the bilayer. This fluidity matters for cell growth, cell junctions, secretion, endocytosis and cell division.\n" +
        "- **Transport:** passive transport moves substances along their concentration gradient (simple diffusion; **osmosis** is the diffusion of water). Polar molecules need a **carrier protein** to cross. **Active transport** moves ions against the gradient using **ATP**, as the **sodium-potassium (Na+/K+) pump** does.\n\n" +
        "The cell wall (plants and fungi):\n" +
        "- A non-living rigid layer that gives shape and protects against damage and infection.\n" +
        "- Algae: cellulose, galactans, mannans and minerals such as **calcium carbonate**. Other plants: **cellulose, hemicellulose, pectins and proteins**.\n" +
        "- A young cell has a **primary wall** that can grow. The **secondary wall** forms later on its **inner side** (towards the membrane).\n" +
        "- The **middle lamella**, mainly **calcium pectate**, glues neighbouring cells together. **Plasmodesmata** cross the wall and middle lamella and join the cytoplasm of next-door cells.\n\n" +
        "The **endomembrane system** is the set of membranous organelles whose functions are coordinated: the **endoplasmic reticulum, Golgi complex, lysosomes and vacuoles**. Mitochondria, chloroplasts and peroxisomes are **not** part of it, because their functions are not coordinated with these four.",
      table: {
        columns: ["Organelle", "In the endomembrane system?", "Note"],
        rows: [
          {
            cells: ["Endoplasmic reticulum", "Yes", "A network of tubes that splits the cell into luminal and extra-luminal parts"],
            noteAmber: "Re-NEET 2026: the endomembrane system is the ER, Golgi complex, lysosomes and vacuole.",
            pyqExampleId: "59226339-ce85-40e7-ae47-30bcc4d1d304",
          },
          { cells: ["Golgi complex", "Yes", "Packages what the ER makes"] },
          { cells: ["Lysosomes", "Yes", "Formed by packaging in the Golgi"] },
          { cells: ["Vacuoles", "Yes", "Bound by a single membrane, the tonoplast"] },
          {
            cells: ["Mitochondria", "No", "Double membrane, but its work is not coordinated with the four above"],
            noteAmber: "NEET 2026: a statement putting mitochondria in the endomembrane system was false.",
            pyqExampleId: "a2ab3ebb-4b14-4368-b4de-950263cef6ef",
          },
          { cells: ["Chloroplasts", "No", "Double membrane, but its work is not coordinated with the four above"] },
          { cells: ["Peroxisomes", "No", "A microbody, not coordinated with the four above"] },
        ],
      },
      pyqExampleId: "23c3a17f-699c-4ca4-9565-22fa8cfb19a3",
      selfCheckExample: {
        prompt: "In the membrane of a human red blood cell, about what share is protein and what share is lipid?",
        steps: [
          "NCERT gives the human RBC membrane as an example of how protein and lipid can vary.",
          "It has about 52 per cent protein and about 40 per cent lipid.",
        ],
        answer: "About 52% protein and 40% lipid.",
      },
      practiceSet: [
        { prompt: "Who proposed the fluid mosaic model of the cell membrane, and in which year?", answer: "Singer and Nicolson, 1972" },
        { prompt: "What is the middle lamella of a plant cell wall mainly made of?", answer: "Calcium pectate" },
        { prompt: "In the lipid bilayer, which part of each lipid faces inwards, and why?", answer: "The hydrophobic tail, so that it is kept away from water" },
        { prompt: "Name the two kinds of membrane protein, by where they sit in the membrane.", answer: "Peripheral (on the surface) and integral (partly or wholly buried)" },
        { prompt: "Which pump uses ATP to move ions against their concentration gradient across the plasma membrane?", answer: "The sodium-potassium (Na+/K+) pump" },
      ],
      traps: [
        {
          title: "Membranes alone do not make an organelle endomembrane",
          body: "**Mitochondria** and **chloroplasts** have two membranes and **peroxisomes** have one, yet none is in the endomembrane system, because their functions are not coordinated with the **ER, Golgi, lysosomes and vacuoles**.",
        },
        {
          title: "Middle lamella is calcium pectate",
          body: "The layer that glues plant cells together is mainly **calcium pectate**. **Calcium carbonate** is a mineral in some algal walls, not the middle lamella.",
        },
        {
          title: "The secondary wall forms inside the primary wall",
          body: "The **secondary wall** is laid down on the **inner side** of the primary wall, towards the membrane, not outside it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-er-golgi",
      name: "The ER, Golgi apparatus, lysosomes and vacuoles",
      intuition:
        "Think of a factory line. Ribosomes on the rough ER make proteins, and the smooth ER makes lipids. Small vesicles carry these to the Golgi apparatus, which enters them at one face, modifies and packs them, and sends them out from the other face. Some packets become lysosomes full of digestive enzymes. The vacuole is the cell's big storage sac.",
      definition:
        "Endoplasmic reticulum (ER):\n" +
        "- A network of tiny tubes that divides the space in the cell into a **luminal** part (inside the ER) and an **extra-luminal** part (the cytoplasm).\n" +
        "- **Rough ER (RER):** ribosomes on its outer surface. Common in cells busy with **protein synthesis and secretion**. It is extensive and continuous with the outer membrane of the nucleus.\n" +
        "- **Smooth ER (SER):** no ribosomes. It is the **major site for synthesis of lipids**. In animal cells, lipid-like **steroidal hormones** are made in the SER.\n\n" +
        "Golgi apparatus:\n" +
        "- First seen by **Camillo Golgi** (1898). It is a stack of flat, disc-shaped sacs, the **cisternae**, **0.5 µm to 1.0 µm** across, lying parallel to each other.\n" +
        "- The cisternae are arranged concentrically near the nucleus, with a **convex cis or forming face** and a **concave trans or maturing face**. The two faces are different but interconnected.\n" +
        "- Its main job is **packaging materials**, to be delivered to targets inside the cell or secreted outside. Vesicles from the ER **fuse with the cis face** and the material moves towards the maturing face.\n" +
        "- Many proteins made by ribosomes on the ER are **modified in the cisternae** before they are released from the **trans face**.\n" +
        "- It is the important site of formation of **glycoproteins and glycolipids**.\n\n" +
        "Lysosomes and vacuoles:\n" +
        "- **Lysosomes** are membrane-bound vesicles formed by packaging in the Golgi. They are rich in **hydrolytic enzymes** (lipases, proteases, carbohydrases), which work best at **acidic pH** and can digest carbohydrates, proteins, lipids and nucleic acids.\n" +
        "- A **vacuole** is a membrane-bound space holding water, sap, excretory products and other materials the cell does not need. It is bound by a **single membrane, the tonoplast**. In plant cells it can take up **90%** of the cell's volume. The tonoplast moves ions **against** their gradient into the vacuole, so their concentration is higher inside.\n" +
        "- In *Amoeba* the **contractile vacuole** helps in osmoregulation and excretion; in many protists **food vacuoles** form by engulfing food.",
      table: {
        columns: ["Organelle", "Structure", "Main job"],
        rows: [
          { cells: ["Rough ER", "Ribosomes on the outer surface; continuous with the outer nuclear membrane", "Protein synthesis and secretion"] },
          {
            cells: ["Smooth ER", "No ribosomes", "Major site of lipid synthesis; steroid hormones in animal cells"],
            noteAmber: "Re-NEET 2026: the smooth ER is the major site for synthesis of lipids.",
            pyqExampleId: "6a86342e-cb93-4d2a-abfc-e19c92cae78f",
          },
          {
            cells: ["Golgi apparatus", "Stacked cisternae 0.5 to 1.0 µm across; convex cis (forming) face, concave trans (maturing) face", "Packaging; modifies proteins; forms glycoproteins and glycolipids"],
          },
          { cells: ["Lysosome", "Membrane-bound vesicle made by the Golgi", "Hydrolytic enzymes, active at acidic pH, digest all four kinds of biomolecule"] },
          { cells: ["Vacuole", "Single membrane (tonoplast); up to 90% of a plant cell", "Stores sap, water and excretory products; pumps ions in against the gradient"] },
        ],
      },
      pyqExampleId: "990aa11a-c5ae-480c-9f21-38260db96066",
      selfCheckExample: {
        prompt: "A gland cell secretes large amounts of protein. Which kind of ER would you expect to be extensive in it, and why?",
        steps: [
          "Proteins are made on ribosomes.",
          "The rough ER carries ribosomes on its surface and is common in cells busy with protein synthesis and secretion.",
        ],
        answer: "Rough ER, because its ribosomes make the protein the cell secretes.",
      },
      practiceSet: [
        { prompt: "In an animal cell, where are steroidal hormones made?", answer: "In the smooth endoplasmic reticulum" },
        { prompt: "At what pH do lysosomal enzymes work best?", answer: "Acidic pH" },
        { prompt: "What is the membrane around a plant vacuole called?", answer: "The tonoplast" },
        { prompt: "Up to how much of a plant cell's volume can its vacuole take up?", answer: "About 90%" },
        { prompt: "What is the diameter of a Golgi cisterna?", answer: "0.5 µm to 1.0 µm" },
      ],
      traps: [
        {
          title: "Cis is forming, trans is maturing",
          body: "The **convex cis** face is the **forming** face and the **concave trans** face is the **maturing** face. A statement that pairs cis with maturing, or trans with forming, is false.",
        },
        {
          title: "Material leaves from the trans face",
          body: "ER vesicles **enter at the cis face**; modified proteins are **released from the trans face**. 'Released from the cis face' is the false version.",
        },
        {
          title: "Smooth ER makes lipids, rough ER makes proteins",
          body: "The **SER** has no ribosomes, so it does not make proteins; it is the major site of **lipid** synthesis. Protein synthesis belongs to the ribosome-studded **RER**.",
        },
      ],
    },
  ],
};
