import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_PL_ORGANS_NOTE: SubtopicNote = {
  subtopicName: "Plant Organs",
  title: "Plant Organs",
  oneLineDefinition:
    "How to tell a modified stem from a modified root, what a leaf does and how leaves are arranged, and how fruits form and seeds are carried away.",
  whyItMatters:
    "Seven CDS questions from 2018 (II) to 2024 (I), five of them in the 2018 (II) paper. Two ask which vegetable is really a stem, and the others ask about the root, the leaf, true fruits and seed dispersal.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbipl-stems",
      name: "Modified roots and stems",
      intuition:
        "Many vegetables that grow underground are not roots at all. A stem has nodes, and at each node there is a bud or a leaf. A root never has buds or leaves. So look for buds, scale leaves and rings of nodes: if you find them, the organ is a stem, however deep it grows.",
      definition:
        "Stem or root (NCERT Class 11, Morphology of Flowering Plants):\n" +
        "- The **root** absorbs water and minerals from the soil through its **root hairs**; it has no nodes or buds.\n" +
        "- A **stem** has **nodes and internodes**, with **buds** at the nodes.\n" +
        "- **Underground stems** store food: **potato** (tuber; its **eyes** are nodes with buds), **ginger** and turmeric (rhizome), **onion and garlic** (bulb: a short disc-shaped stem with fleshy scale leaves), Colocasia (corm).\n" +
        "- **Modified roots** that store food: **carrot, radish, turnip**, beetroot and **sweet potato**.\n" +
        "- Some parts are **modified leaves**: the **tendril of pea** (a leaflet), the **spines of cactus**, the fleshy **scales of onion**.",
      table: {
        columns: ["Plant part", "What it really is"],
        rows: [
          { cells: ["Potato", "Underground stem (tuber); eyes are nodes with buds"] },
          {
            cells: ["Onion and garlic", "Underground stem (bulb) with fleshy scale leaves"],
            noteAmber: "CDS 2024 (I): potato, onion and garlic is the set of modified stems; carrot and turnip are roots.",
            pyqExampleId: "281ee011-6369-4faf-86fc-4f503ef0a554",
          },
          { cells: ["Ginger and turmeric", "Underground stem (rhizome)"] },
          { cells: ["Carrot, radish, turnip, sweet potato", "Modified root"] },
          { cells: ["Pea tendril", "Modified leaflet"] },
          { cells: ["Cactus spines", "Modified leaves"] },
          {
            cells: ["Root hairs", "The main absorbing surface of the plant"],
            noteAmber: "CDS 2018 (II): the main absorbing organ of a plant is the root only.",
            pyqExampleId: "733e7091-c20b-41ca-803c-1f0ea3e4d438",
          },
        ],
      },
      pyqExampleId: "2b39688b-fdcb-4f8d-86cf-9995debb429f",
      selfCheckExample: {
        prompt: "Ginger grows under the soil. What would you look for to show that it is a stem and not a root?",
        steps: [
          "A stem has nodes and internodes; a root does not.",
          "At the nodes of a stem there are buds and small scale leaves.",
          "Ginger shows ring-like nodes, scale leaves and buds that sprout into shoots.",
        ],
        answer: "Its nodes, scale leaves and buds: ginger is an underground stem (a rhizome).",
      },
      practiceSet: [
        { prompt: "Is a sweet potato a modified root or a modified stem?", answer: "A modified root" },
        { prompt: "What kind of underground stem is ginger?", answer: "A rhizome" },
        { prompt: "What kind of underground stem is the Colocasia (arbi)?", answer: "A corm" },
        { prompt: "What are the spines of a cactus?", answer: "Modified leaves" },
      ],
      traps: [
        {
          title: "Underground does not mean root",
          body: "Potato, ginger, onion and garlic grow under the soil but are **stems**. Carrot, radish, turnip and **sweet potato** are **roots**. Sweet potato and potato sit in different groups.",
        },
        {
          title: "Onion scales are leaves, the bulb is a stem",
          body: "The fleshy **scales** of an onion are **leaves**, so a scale is not a sign of a stem. The onion **bulb** as a whole is an underground stem, built on a short flat disc of stem at its base.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-leaf",
      name: "The leaf and its work",
      intuition:
        "A leaf is the plant's kitchen. It is flat and thin to catch light, it has tiny pores to let gases in and out, and water evaporates from it all the time. Carrying water up from the roots and food down to them is not the leaf's job: the pipes of the stem and root do that.",
      definition:
        "The primary functions of a green leaf:\n" +
        "- **Photosynthesis**: making food.\n" +
        "- **Exchange of gases** through the **stomata**.\n" +
        "- **Transpiration**: loss of water as vapour, which also cools the leaf.\n" +
        "- Long-distance **conduction** of water and food is done by the **xylem and phloem** of the stem and root, not by the leaf.\n" +
        "- **Phyllotaxy** is the pattern in which **leaves are arranged** on the stem: **alternate** (one leaf at a node, as in mustard), **opposite** (two at a node, as in guava) or **whorled** (more than two at a node, as in Alstonia).\n" +
        "- **Venation**, the pattern of veins: **reticulate** (a net) in dicots, **parallel** in monocots such as grasses.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Phyllotaxy", "Arrangement of leaves on the stem"],
            noteAmber: "CDS 2023 (II): phyllotaxy is the pattern of arrangement of leaves.",
            pyqExampleId: "35b19733-aa1b-42e1-94ef-1bb0668cd15e",
          },
          { cells: ["Alternate", "One leaf at each node (mustard)"] },
          { cells: ["Opposite", "Two leaves at each node, facing each other (guava)"] },
          { cells: ["Whorled", "More than two leaves at a node (Alstonia)"] },
          { cells: ["Reticulate venation", "Net of veins; dicots"] },
          { cells: ["Parallel venation", "Veins side by side; monocots"] },
          { cells: ["Stomata", "Pores for exchange of gases and loss of water vapour"] },
        ],
      },
      pyqExampleId: "9b97a812-b338-4d08-965f-4cbd7dba5902",
      selfCheckExample: {
        prompt: "A leaf of wheat has veins running side by side, and a leaf of mango has a net of veins. What does this tell you about each plant?",
        steps: [
          "Parallel venation is the mark of a monocot.",
          "Reticulate (net) venation is the mark of a dicot.",
          "So wheat is a monocot and mango is a dicot.",
        ],
        answer: "Wheat is a monocot (parallel veins); mango is a dicot (net of veins).",
      },
      practiceSet: [
        { prompt: "Through which pores does a leaf exchange gases?", answer: "The stomata" },
        { prompt: "What is the leaf arrangement called when more than two leaves arise at one node?", answer: "Whorled" },
        { prompt: "What kind of venation does a grass leaf have?", answer: "Parallel" },
        { prompt: "What is the leaf arrangement called when there is one leaf at each node?", answer: "Alternate" },
      ],
      traps: [
        {
          title: "Conduction is the stem's job",
          body: "A leaf makes food, exchanges gases and loses water. Carrying water and food over long distances is the work of the **xylem and phloem** in the stem and root, so it is the one that is **not** a primary function of the leaf.",
        },
        {
          title: "Phyllotaxy is leaves, not flowers",
          body: "**Phyllotaxy** (phyllon means leaf) is the arrangement of **leaves**. The arrangement of flowers on a stalk has its own name, inflorescence.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-fruits",
      name: "Fruits and seed dispersal",
      intuition:
        "After fertilisation the ovary of a flower swells into a fruit and the ovules inside become seeds. When only the ovary forms the fruit, it is a true fruit. When another part of the flower, usually the thalamus, also swells and makes the fleshy part, it is a false fruit. Then the seeds must travel away from the parent, and wind, water and animals carry them.",
      definition:
        "Fruits and seeds (NCERT Class 10 and 12):\n" +
        "- After fertilisation the **ovary** becomes the **fruit** and the **ovules** become the **seeds**.\n" +
        "- A **true fruit** develops **only from the ovary**: mango, tomato, pea pod.\n" +
        "- A **false fruit** has other floral parts in it, usually the **thalamus** (receptacle): apple, strawberry, cashew.\n" +
        "- A **parthenocarpic** fruit forms without fertilisation and has no seeds, such as the banana.\n" +
        "- **Seed dispersal agents**: **wind** (light seeds with wings or hairs: drumstick, maple, cotton), **water** (coconut, which floats), **animals** (hooks and spines as in Xanthium, or juicy fruits that are eaten), and **explosion** of the fruit (balsam, castor).",
      table: {
        columns: ["Kind or agent", "Examples"],
        rows: [
          {
            cells: ["True fruit (from the ovary only)", "Mango, tomato, pea pod"],
            noteAmber: "CDS 2018 (II): a true fruit is one where only the ovary grows into the fruit.",
            pyqExampleId: "c98c2a13-e841-48e9-b7ce-274dafa1a26c",
          },
          { cells: ["False fruit (thalamus included)", "Apple, strawberry, cashew"] },
          { cells: ["Seedless (parthenocarpic) fruit", "Banana"] },
          { cells: ["Dispersal by wind", "Drumstick and maple (wings), cotton (hairs)"] },
          { cells: ["Dispersal by water", "Coconut"] },
          {
            cells: ["Dispersal by animals", "Xanthium (hooks), fleshy fruits that are eaten"],
            noteAmber: "CDS 2018 (II): wind, water and animals disperse seeds; a fungus does not.",
            pyqExampleId: "1786dca9-089a-45de-b1a2-c268f51b57f3",
          },
          { cells: ["Dispersal by explosion", "Balsam, castor"] },
        ],
      },
      pyqExampleId: "c98c2a13-e841-48e9-b7ce-274dafa1a26c",
      selfCheckExample: {
        prompt: "The spiny fruits of Xanthium stick to a dog's fur, and the fruit of a coconut floats for weeks at sea. Name the agent of dispersal for each and the feature that suits it.",
        steps: [
          "Hooks and spines catch on the fur of passing animals, so Xanthium is carried by animals.",
          "The coconut's fibrous husk is light and full of air, so it floats.",
          "So the coconut is carried by water.",
        ],
        answer: "Xanthium: animals (hooks and spines). Coconut: water (light, fibrous husk that floats).",
      },
      practiceSet: [
        { prompt: "How does a balsam fruit scatter its seeds?", answer: "It bursts open (explosion)" },
        { prompt: "After fertilisation, what do the ovules of a flower become?", answer: "Seeds" },
        { prompt: "Name a seed dispersed by wind that has wings.", answer: "Drumstick (or maple)" },
        { prompt: "What is a fruit that forms without fertilisation, and so has no seeds, called?", answer: "Parthenocarpic fruit" },
      ],
      traps: [
        {
          title: "Thalamus and receptacle are the same part",
          body: "The **thalamus** and the **receptacle** are two names for one part of the flower. A fruit that grows from either one is a **false** fruit. Only the **ovary** makes a true fruit.",
        },
        {
          title: "Fungi do not disperse seeds",
          body: "Seeds travel by **wind, water and animals** (and by bursting fruits). A **fungus** is a decomposer or a disease-maker; it has no way to carry seeds.",
        },
      ],
    },
  ],
};
