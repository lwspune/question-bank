import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_MEMBRANE_NOTE: SubtopicNote = {
  subtopicName: "Plasma Membrane Structure",
  title: "The Plasma Membrane and the Fluid Mosaic Model",
  oneLineDefinition:
    "The plasma membrane is a fluid double layer of phospholipids with proteins, cholesterol and sugar chains set in it; it controls what enters and leaves the cell.",
  whyItMatters:
    "Membrane structure has been asked in most years since 2019. The ministry papers 2024 to 2026 asked what the membrane is made of and what its main job is; the older papers asked which parts are hydrophobic, what cholesterol does, and how membranes stay fluid in the cold.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-phospholipid",
      name: "Phospholipids and the lipid bilayer",
      intuition:
        "A phospholipid has a head that likes water and two tails that avoid it. Put many of them in water and they arrange themselves so the tails hide from the water: two layers, tails pointing inward, heads facing the water on both sides. Nothing has to build this; it forms by itself.",
      definition:
        "A **phospholipid** is glycerol joined to two fatty acids and a phosphate group (often with a small extra group such as choline).\n" +
        "- It is **amphipathic**: the phosphate head is **hydrophilic** (polar) and the fatty acid tails are **hydrophobic** (non-polar).\n" +
        "- In water, phospholipids form a **bilayer** about 7 to 10 nm thick: heads outward toward the watery cytoplasm and tissue fluid, tails inward forming an oily core.\n" +
        "- The core lets small non-polar molecules through (\\(\\mathrm{O_2}\\), \\(\\mathrm{CO_2}\\), steroids) and blocks ions and large polar molecules such as glucose. Water crosses slowly on its own, and fast through protein channels.\n" +
        "- The main job of the plasma membrane is to control exchange between the inside and the outside of the cell.",
      table: {
        columns: ["Part", "Made of", "Behaviour in water", "Position in the bilayer"],
        rows: [
          { cells: ["Head", "Phosphate group (plus glycerol, often choline)", "Hydrophilic, polar", "Faces the water on both surfaces"] },
          { cells: ["Tails", "Two fatty acid chains", "Hydrophobic, non-polar", "Point inward, forming the core"] },
          { cells: ["Saturated tail", "Only C-C single bonds, so straight", "Hydrophobic", "Packs tightly; makes the membrane less fluid"] },
          { cells: ["Unsaturated tail", "One or more C=C double bonds, each making a kink", "Hydrophobic", "Packs loosely; makes the membrane more fluid"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which region of a plasma membrane is hydrophobic?",
        options: [
          "The phosphate heads facing the tissue fluid",
          "The fatty acid tails in the centre of the bilayer",
          "The sugar chains of glycoproteins",
          "The phosphate heads facing the cytoplasm",
          "The parts of channel proteins that line the water-filled pore",
        ],
        steps: [
          "The fatty acid tails are non-polar, so they are hydrophobic and gather in the middle of the bilayer.",
          "Both layers of heads (A and D) are polar and touch water. Sugar chains (C) are full of OH groups and are hydrophilic. A channel's pore (E) is lined with polar groups so that ions and water can pass.",
        ],
        answer: "(B) The fatty acid tails in the centre of the bilayer",
      },
      practiceSet: [
        { prompt: "Which way do the tails of a membrane phospholipid face?", answer: "Inward, toward the other layer's tails" },
        { prompt: "Why can a sodium ion not cross the bilayer on its own?", answer: "It is charged, and the hydrophobic core repels it" },
        { prompt: "What word describes a molecule with one hydrophilic and one hydrophobic end?", answer: "Amphipathic" },
      ],
      traps: [
        {
          title: "Phospholipids, not triglycerides, and two layers, not one",
          body: "A triglyceride has three fatty acids and no polar head, so it cannot form a bilayer; it is a storage fat. The plasma membrane is a phospholipid bilayer, with tails inward. Options describing a single layer, a triglyceride layer or tails facing outward are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-fluid-mosaic",
      name: "The fluid mosaic model: proteins, cholesterol and carbohydrates",
      intuition:
        "Picture the bilayer as a thin film of oil with icebergs floating in it. The oil is the phospholipids, which drift sideways all the time; the icebergs are proteins, scattered like the tiles of a mosaic. Sugar chains stick out only on the outer face, where they act like name tags.",
      definition:
        "The **fluid mosaic model** (Singer and Nicolson, 1972):\n" +
        "- **Fluid**: phospholipids and many proteins move sideways within their layer. Flipping from one layer to the other is rare.\n" +
        "- **Mosaic**: proteins are scattered through the bilayer, not spread as a layer over it.\n" +
        "- The main components are **phospholipids and proteins**, roughly half and half by mass in a typical plasma membrane; the share of protein varies with the membrane's job.\n" +
        "- **Integral** (intrinsic) proteins sit in the bilayer; those crossing it completely are transmembrane proteins. **Peripheral** (extrinsic) proteins are attached to one surface.\n" +
        "- **Carbohydrate** chains are joined to proteins (**glycoproteins**) and lipids (**glycolipids**) on the outer surface only. Together they form the **glycocalyx**.",
      table: {
        columns: ["Component", "Where it sits", "Main job"],
        rows: [
          { cells: ["Phospholipids", "The bilayer itself", "Barrier to ions and polar molecules; gives fluidity"] },
          { cells: ["Integral proteins", "Embedded in the bilayer, often spanning it", "Channels, carriers, pumps, receptors"] },
          { cells: ["Peripheral proteins", "On the inner or outer surface", "Enzymes, links to the cytoskeleton, signalling"] },
          { cells: ["Cholesterol", "Between phospholipids in both layers (animal cells)", "Keeps fluidity within limits"] },
          { cells: ["Glycoproteins and glycolipids", "Outer surface, sugar chains facing out", "Cell recognition, receptors, blood group antigens"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about the fluid mosaic model of the plasma membrane is correct?",
        options: [
          "A continuous layer of protein covers each face of the lipid bilayer.",
          "Sugar chains of glycoproteins face the cytoplasm.",
          "Cholesterol is found only in the outer layer of the bilayer.",
          "The bilayer is made of triglycerides held together by peptide bonds.",
          "Phospholipids and many proteins can move sideways within the membrane.",
        ],
        steps: [
          "Sideways movement is what \"fluid\" means in the model, so E is correct.",
          "A describes an older sandwich model that the fluid mosaic model replaced. Sugar chains face outward, not inward (B). Cholesterol sits in both layers (C). Peptide bonds join amino acids, and the bilayer is made of phospholipids (D).",
        ],
        answer: "(E) Phospholipids and many proteins can move sideways within the membrane.",
      },
      practiceSet: [
        { prompt: "What are the two main components of the plasma membrane?", answer: "Phospholipids and proteins" },
        { prompt: "On which face of the plasma membrane are the carbohydrate chains?", answer: "The outer (extracellular) face" },
        { prompt: "What name is given to a protein that crosses the whole bilayer?", answer: "A transmembrane (integral) protein" },
        { prompt: "What do the ABO blood groups depend on?", answer: "Different sugar chains on glycolipids and glycoproteins of the red cell membrane" },
      ],
      traps: [
        {
          title: "The membrane is not a protein sandwich",
          body: "Proteins are dotted through and across the bilayer like tiles in a mosaic. They do not form continuous sheets on its two faces. Diagrams or options showing lipid enclosed between two protein layers describe an outdated model.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-fluidity",
      name: "Membrane fluidity: temperature, unsaturated tails and cholesterol",
      intuition:
        "A membrane has to stay about as runny as olive oil: too stiff and its proteins cannot move or change shape, too runny and it leaks. Cold makes the tails pack and set like butter in a fridge. Kinked, unsaturated tails cannot pack tightly, so organisms living in the cold put more of them in their membranes.",
      definition:
        "**Fluidity** is how freely the lipids and proteins of a membrane can move.\n" +
        "- Cold-adapted organisms (cold-water fish, plants that overwinter) raise the share of **unsaturated** fatty acids, whose C=C double bonds put kinks in the tails.\n" +
        "- **Cholesterol** is a fluidity buffer. At high temperature its rigid rings hold neighbouring tails still (less fluid); at low temperature it keeps tails apart so they cannot set solid (more fluid). It also makes the membrane less permeable to small water-soluble molecules.\n" +
        "- Cholesterol is also the raw material for steroid hormones, vitamin D and bile salts. Plant membranes use similar sterols; most bacteria have none.\n" +
        "- Membranes are damaged by organic solvents such as ethanol (they dissolve the lipids) and by heat or strong acid (they denature the membrane proteins). A damaged membrane leaks: beetroot pigment, for example, escapes into the water around the tissue.",
      table: {
        columns: ["Factor", "Effect on fluidity", "Why"],
        rows: [
          { cells: ["Higher temperature", "More fluid", "Molecules have more kinetic energy"] },
          { cells: ["More unsaturated tails (C=C)", "More fluid", "Kinks stop the tails packing closely"] },
          { cells: ["Shorter fatty acid tails", "More fluid", "Fewer attractions between neighbouring tails"] },
          { cells: ["Cholesterol, at body or higher temperature", "Less fluid", "Its rigid rings restrict tail movement"] },
          { cells: ["Cholesterol, at low temperature", "Stops the membrane setting solid", "It spaces the tails so they cannot pack"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A fish species lives in water that cools from 20 °C in summer to 4 °C in winter, yet its membranes stay equally fluid all year. Which change in its membrane lipids in winter best explains this?",
        options: [
          "More fatty acid tails containing C=C double bonds",
          "More fatty acid tails with only C-C single bonds",
          "Longer fatty acid tails",
          "Fewer protein molecules in the bilayer",
          "Replacement of phospholipids by triglycerides",
        ],
        steps: [
          "Cold makes tails pack tightly, so the membrane stiffens. To stay fluid it needs tails that cannot pack.",
          "C=C double bonds put kinks in the tails, which keeps them apart: A.",
          "Saturated (B) and longer (C) tails pack more tightly, the opposite effect. D does not change how lipids pack. E would destroy the bilayer.",
        ],
        answer: "(A) More fatty acid tails containing C=C double bonds",
      },
      practiceSet: [
        { prompt: "What happens to membrane fluidity when the temperature rises?", answer: "It increases" },
        { prompt: "Does cholesterol make a membrane more or less fluid at 37 °C?", answer: "Less fluid", method: "Its rings hold the tails still" },
        { prompt: "Beetroot cubes are put in ethanol. Why does the liquid turn red?", answer: "Ethanol dissolves the membrane lipids, so the pigment leaks out" },
      ],
      traps: [
        {
          title: "Cholesterol regulates fluidity; it is not an energy store or a universal hormone source",
          body: "Cholesterol's job in the membrane is to keep fluidity steady across temperatures. It is not used as a fuel, and it is the source only of steroid hormones (cortisol, testosterone, oestrogen). Protein hormones such as insulin are made from amino acids.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-junctions",
      name: "Cell junctions and cell signalling",
      intuition:
        "Cells in a tissue are not loose bricks. Some junctions seal the gaps, some rivet cells together, and some open little tunnels between neighbours. Cells also talk with chemical signals, and a signal acts only on a cell that has the right receptor for it.",
      definition:
        "In **cell signalling**, a signal molecule (a **ligand**) binds a specific **receptor** protein on or in the target cell.\n" +
        "- Water-soluble signals (insulin, adrenaline) cannot cross the bilayer. They bind receptors in the plasma membrane, which pass the message on inside, often through a **second messenger** such as cyclic AMP.\n" +
        "- Lipid-soluble signals (steroid hormones, thyroid hormone) cross the membrane and bind receptors in the cytoplasm or nucleus, changing which genes are expressed.\n" +
        "- Range: endocrine (hormones carried in the blood), paracrine (to nearby cells), autocrine (to the cell itself), and direct contact through junctions or surface molecules.\n" +
        "- The glycocalyx lets cells recognise each other, which matters in tissue formation and in the immune response.",
      table: {
        columns: ["Junction", "Structure", "Job", "Example"],
        rows: [
          { cells: ["Tight junction", "Rows of proteins that fuse neighbouring membranes", "Seals the gap so fluid cannot leak between cells", "Gut lining, kidney tubules, brain capillaries"] },
          { cells: ["Desmosome", "Protein plaques joined across the gap, anchored to intermediate filaments", "Holds cells together under stretching", "Skin, heart muscle"] },
          { cells: ["Gap junction", "Channels of connexin proteins linking two cytoplasms", "Lets ions and small molecules pass straight between cells", "Heart muscle, smooth muscle"] },
          { cells: ["Plasmodesma (plants)", "Membrane-lined channel through two cell walls", "Joins the cytoplasm of neighbouring plant cells", "Almost all living plant tissues"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Heart muscle cells contract in a coordinated wave because ions flow directly from the cytoplasm of one cell into the next. Which structure allows this?",
        options: [
          "Tight junctions",
          "Desmosomes",
          "Gap junctions",
          "Plasmodesmata",
          "The glycocalyx",
        ],
        steps: [
          "Only gap junctions form open channels between the cytoplasm of two animal cells.",
          "Tight junctions seal and desmosomes anchor; neither lets ions through. Plasmodesmata do a similar job but only in plants. The glycocalyx is for recognition.",
        ],
        answer: "(C) Gap junctions",
      },
      practiceSet: [
        { prompt: "Which junction stops gut contents leaking between the cells of the gut lining?", answer: "Tight junctions" },
        { prompt: "Why can a steroid hormone bind a receptor inside the cell?", answer: "It is lipid-soluble, so it crosses the phospholipid bilayer" },
        { prompt: "What is the plant equivalent of a gap junction?", answer: "A plasmodesma" },
      ],
      traps: [
        {
          title: "Where the receptor is depends on the signal",
          body: "Insulin is a protein and cannot cross the bilayer, so its receptor is in the plasma membrane. Steroid hormones are lipid-soluble and bind receptors inside the cell. Options putting the insulin receptor in the nucleus, or saying every hormone enters the cell, are wrong.",
        },
      ],
    },
  ],
};
