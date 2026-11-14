import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MO_ORGANS_NOTE: SubtopicNote = {
  subtopicName: "Root, Stem, Leaf and Inflorescence",
  title: "Root, Stem, Leaf and Inflorescence",
  oneLineDefinition:
    "The regions of a root, how roots and stems are modified, the parts of a leaf and the ways leaves are arranged, and the two kinds of inflorescence.",
  whyItMatters:
    "Four NEET questions: one MODERATE and three EASY. NEET 2022 asked which statements on modified roots and stems are true. Re-NEET 2026 asked what phyllotaxy is, and NEET 2026 asked how a racemose inflorescence grows and where root hairs arise.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomo-root-stem",
      name: "Root and stem, and how they are modified",
      intuition:
        "The root grows from the radicle of the seed and the stem from the plumule. Many plants change the shape of a root or a stem to do an extra job: store food, climb, defend, breathe or spread. NEET gives you a list of these changes with an example each and asks which are true, so learn the job, the organ it came from and the NCERT example together.",
      definition:
        "Root and stem in NCERT:\n" +
        "- **Tap root system** (dicots, such as mustard): the primary root grows from the **radicle** and bears lateral roots.\n" +
        "- **Fibrous root system** (monocots, such as wheat): the primary root is short-lived and many roots arise from the base of the stem.\n" +
        "- **Adventitious roots** arise from any part other than the radicle: grass, *Monstera*, the banyan tree.\n" +
        "- Regions of the root tip, from the tip upwards: **root cap** (a thimble-like cover that protects the tip), **region of meristematic activity** (small, thin-walled cells with dense protoplasm that divide again and again), **region of elongation** (cells lengthen and enlarge, so the root grows longer), **region of maturation** (cells differentiate; some epidermal cells form **root hairs** that absorb water and minerals).\n" +
        "- The **stem** grows from the **plumule** and bears **nodes** (where leaves arise) and **internodes** (the parts between nodes). It bears terminal and axillary buds.",
      table: {
        columns: ["Modification", "What it is", "NCERT example"],
        rows: [
          { cells: ["Storage roots", "Tap roots or adventitious roots swollen with food", "Carrot and turnip (tap root); sweet potato (adventitious)"] },
          { cells: ["Prop roots", "Hanging roots from branches that grow into the soil and hold the branches up", "Banyan tree"] },
          { cells: ["Stilt roots", "Supporting roots from the lower nodes of the stem", "Maize and sugarcane"] },
          {
            cells: ["Pneumatophores", "Roots of swampy plants that grow vertically upwards out of the soil to get oxygen for respiration", "*Rhizophora*, a mangrove"],
            noteAmber: "NEET 2022: the upward-growing breathing roots of Rhizophora were a true statement.",
            pyqExampleId: "ad284f5a-b648-4810-a3dd-a834173015ae",
          },
          { cells: ["Underground storage stems", "Stems below the soil that store food and help the plant survive bad seasons", "Potato, ginger, turmeric, zaminkand, *Colocasia*"] },
          { cells: ["Stem tendrils", "Slender, spirally coiled climbing organs that grow from axillary buds", "Cucumber, pumpkin, watermelon, grapevine"] },
          { cells: ["Thorns", "Axillary buds turned into woody, straight, pointed structures that protect the plant", "*Citrus*, *Bougainvillea*"] },
          { cells: ["Photosynthetic stems", "Green stems that do the work of leaves in dry places", "*Opuntia* (flattened), *Euphorbia* (fleshy and cylindrical)"] },
          { cells: ["Spreading stems", "Underground or creeping branches that spread to new places and form new plants", "Grass and strawberry; mint and jasmine"] },
        ],
      },
      pyqExampleId: "ad284f5a-b648-4810-a3dd-a834173015ae",
      selfCheckExample: {
        prompt: "A student writes that maize is held up by prop roots that hang down from its branches. Is the student right? If not, correct the statement.",
        steps: [
          "Prop roots hang down from the branches of a large tree and are the banyan tree example.",
          "Maize and sugarcane have supporting roots that grow from the lower nodes of the stem.",
          "Those are called stilt roots.",
        ],
        answer: "No. Maize has stilt roots from its lower nodes; prop roots are the banyan tree example.",
      },
      practiceSet: [
        { prompt: "From which part of the seed does the stem develop?", answer: "The plumule" },
        { prompt: "Which region of the root tip has small, thin-walled cells with dense protoplasm that keep dividing?", answer: "The region of meristematic activity" },
        { prompt: "Which root system do monocots such as wheat have?", answer: "A fibrous root system: many roots from the base of the stem" },
        { prompt: "Which region of the root tip makes the root longer?", answer: "The region of elongation" },
        { prompt: "Name two underground stems that NCERT lists as storing food.", answer: "Any two of potato, ginger, turmeric, zaminkand and *Colocasia*" },
      ],
      traps: [
        {
          title: "Thorns come from axillary buds, not leaflets",
          body: "In *Citrus* and *Bougainvillea* the thorns are **axillary buds** of the stem turned woody and pointed. A statement that calls them modified **leaflets** is false. Spines that come from leaves are the cactus example.",
        },
        {
          title: "Root hairs grow in the region of maturation",
          body: "Root hairs come from epidermal cells of the **region of maturation**, above the region of elongation. The **root cap** only protects the tip; it does not absorb water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-leaf",
      name: "The leaf and phyllotaxy",
      intuition:
        "A leaf is a flat, green outgrowth of the stem that grows at a node and has a bud in its axil. NCERT describes its three parts, how its veins run, whether it is simple or compound, and the pattern in which leaves sit on the stem. That pattern has its own name: phyllotaxy.",
      definition:
        "The leaf in NCERT:\n" +
        "- Three parts: **leaf base**, **petiole** and **lamina** (leaf blade). The leaf base may bear two small leaf-like **stipules**.\n" +
        "- In monocots the leaf base widens into a **sheath** around the stem. In some leguminous plants the leaf base is swollen: this is the **pulvinus**.\n" +
        "- **Venation**: **reticulate** (a network of veins) in most dicots; **parallel** in most monocots.\n" +
        "- **Simple leaf**: the cuts in the lamina do not reach the midrib. **Compound leaf**: the cuts reach the midrib and split the lamina into **leaflets**. A bud sits in the axil of the petiole, never in the axil of a leaflet.\n" +
        "- **Pinnately compound**: leaflets on a common axis, the **rachis** (neem). **Palmately compound**: leaflets joined at one point, the tip of the petiole (silk cotton).\n" +
        "- **Phyllotaxy** is the pattern in which **leaves** are arranged on a stem or branch.",
      table: {
        columns: ["Phyllotaxy", "Leaves at each node", "NCERT example"],
        rows: [
          {
            cells: ["Alternate", "One leaf at each node, in alternate manner", "China rose, mustard, sunflower"],
            noteAmber: "Re-NEET 2026: phyllotaxy is the arrangement of leaves, not of flowers, fruits or sepals.",
            pyqExampleId: "84bb52d8-2a0c-4a22-930a-43e62b4c24d3",
          },
          { cells: ["Opposite", "A pair of leaves at each node, facing each other", "*Calotropis*, guava"] },
          { cells: ["Whorled", "More than two leaves at a node, forming a whorl", "*Alstonia*"] },
        ],
      },
      pyqExampleId: "84bb52d8-2a0c-4a22-930a-43e62b4c24d3",
      selfCheckExample: {
        prompt: "A guava twig has two leaves at every node, standing on opposite sides of the stem. Name this type of phyllotaxy and give one more NCERT example of it.",
        steps: [
          "Two leaves at each node, facing each other, is opposite phyllotaxy.",
          "NCERT gives *Calotropis* as the other example.",
        ],
        answer: "Opposite phyllotaxy, as in *Calotropis*.",
      },
      practiceSet: [
        { prompt: "What are the small leaf-like structures that may grow at the leaf base called?", answer: "Stipules" },
        { prompt: "What is the swollen leaf base of some leguminous plants called?", answer: "The pulvinus" },
        { prompt: "In a pinnately compound leaf, what is the common axis that bears the leaflets called?", answer: "The rachis" },
        { prompt: "Which NCERT plant has more than two leaves at each node?", answer: "*Alstonia* (whorled phyllotaxy)" },
        { prompt: "Which type of venation do most monocots show?", answer: "Parallel venation" },
      ],
      traps: [
        {
          title: "No bud in the axil of a leaflet",
          body: "A compound leaf has a bud in the axil of its **petiole**, but **none** in the axil of a leaflet. That is how a leaflet is told apart from a simple leaf on a twig.",
        },
        {
          title: "Phyllotaxy is about leaves only",
          body: "**Phyllotaxy** is the arrangement of **leaves** on the stem. The arrangement of flowers on an axis is **inflorescence**, and the arrangement of sepals or petals in a bud is **aestivation**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-inflorescence",
      name: "Racemose and cymose inflorescence",
      intuition:
        "Inflorescence is the way flowers are arranged on the floral axis. The whole question is whether the tip of the main axis keeps growing. If it does, new flowers keep forming near the top, so the oldest are at the base. If the tip turns into a flower, growth stops, and the newer flowers form below it.",
      definition:
        "Two main types:\n" +
        "- **Racemose**: the main axis **continues to grow**; flowers are borne **laterally** in **acropetal** succession (older flowers at the base, younger towards the tip).\n" +
        "- **Cymose**: the main axis **ends in a flower**, so its growth is **limited**; flowers are borne in **basipetal** order (the oldest at the top).\n" +
        "- When the shoot tip itself turns into a flower, that flower is always **solitary**.",
      table: {
        columns: ["Feature", "Racemose", "Cymose"],
        rows: [
          {
            cells: ["Main axis", "Keeps growing", "Ends in a flower"],
            noteAmber: "NEET 2026: in racemose inflorescence the flowers are borne in acropetal succession.",
            pyqExampleId: "aedb01b6-32f2-4810-abc9-134d472a1ed8",
          },
          { cells: ["Growth of the axis", "Not limited", "Limited"] },
          { cells: ["Position of flowers", "Lateral", "Terminal flower first, then lateral ones below"] },
          { cells: ["Order of flowers", "Acropetal: oldest at the base", "Basipetal: oldest at the top"] },
        ],
      },
      pyqExampleId: "aedb01b6-32f2-4810-abc9-134d472a1ed8",
      selfCheckExample: {
        prompt: "On a flowering axis the top flower opened first and the flowers below it opened later, one after another. The tip of the axis has stopped growing. Which type of inflorescence is this, and in what order are its flowers borne?",
        steps: [
          "The tip of the axis became a flower, so its growth is limited.",
          "A main axis that ends in a flower marks a cymose inflorescence.",
          "Newer flowers form below the older top flower, which is basipetal order.",
        ],
        answer: "Cymose, with flowers in basipetal order.",
      },
      practiceSet: [
        { prompt: "What is the arrangement of flowers on the floral axis called?", answer: "Inflorescence" },
        { prompt: "In which type of inflorescence does the main axis end in a flower?", answer: "Cymose" },
        { prompt: "When the shoot tip itself turns into a flower, is that flower solitary or one of a group?", answer: "Solitary, always" },
      ],
      traps: [
        {
          title: "Acropetal goes with racemose",
          body: "**Racemose** means the axis keeps growing and flowers form **acropetally**. **Cymose** means the axis ends in a flower and flowers form **basipetally**. Swapping the two order words is the usual wrong option.",
        },
      ],
    },
  ],
};
