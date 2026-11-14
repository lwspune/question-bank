import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_AN_TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Plant Tissues",
  title: "Plant Tissues",
  oneLineDefinition:
    "What a tissue is, where the three kinds of meristem sit, how parenchyma, collenchyma and sclerenchyma differ, and the elements that make up xylem and phloem.",
  whyItMatters:
    "Five NEET questions from 2021 to 2024. Sclereids were asked twice (NEET 2021 and Re-NEET 2024); the others turned on the missing nucleus of a sieve tube, collenchyma being a living tissue, and where endarch and exarch xylem are found.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboan-meristems",
      name: "Meristems, and simple against complex tissue",
      intuition:
        "A plant does not grow everywhere at once. It grows only at a few places where cells keep dividing, the meristems. Once a new cell takes on a fixed shape and job, it stops dividing and becomes part of a permanent tissue. A permanent tissue is simple if all its cells are alike, and complex if it mixes several kinds of cell.",
      definition:
        "- A **tissue** is a group of cells having a **common origin** and usually performing a **common function**. Plant tissues are **meristematic** (cells can divide) or **permanent** (cells have stopped dividing).\n" +
        "- **Apical meristems** sit at the tips of roots and shoots and make the primary tissues. The **root apical meristem** occupies the tip of the root; the **shoot apical meristem** occupies the distant most region of the stem axis. Cells left behind by the shoot apical meristem as leaves form and the stem lengthens make the **axillary bud**.\n" +
        "- The **intercalary meristem** lies between mature tissues. It is present in **grasses** and regrows the parts eaten by grazing herbivores.\n" +
        "- Apical and intercalary meristems are **primary meristems**: they appear early in the life of a plant and build the primary plant body.\n" +
        "- The **lateral meristem** is cylindrical and lies in the mature regions of roots and shoots, mostly of plants with a woody axis. It is a **secondary meristem** and makes the secondary tissues. Examples: **fascicular vascular cambium, interfascicular cambium and cork cambium**.\n" +
        "- New cells then become specialised and **lose the ability to divide**: they form **permanent tissue**. A **simple tissue** has cells all alike in structure and function; a **complex tissue** has several types of cell (xylem and phloem).",
      table: {
        columns: ["Meristem", "Position", "Primary or secondary", "What it does"],
        rows: [
          { cells: ["Apical", "Tips of the root and the shoot", "Primary", "Makes the primary tissues; the shoot apex also leaves behind the axillary buds"] },
          { cells: ["Intercalary", "Between mature tissues, for example in grasses", "Primary", "Regrows parts removed by grazing herbivores"] },
          { cells: ["Lateral", "Mature regions of roots and shoots of woody plants; cylindrical", "Secondary", "Makes secondary tissues: fascicular vascular cambium, interfascicular cambium, cork cambium"] },
        ],
      },
      pyqExampleId: "8ea8d645-aa55-4667-9275-442c16da420c",
      selfCheckExample: {
        prompt: "A cow grazes a lawn down to a few centimetres, yet the grass grows back from its base within days. Which meristem makes this possible?",
        steps: [
          "The tip of each grass shoot has been eaten, so the apical meristem cannot explain the regrowth.",
          "Grasses have a meristem lying between mature tissues, which regrows parts removed by grazing herbivores.",
        ],
        answer: "The intercalary meristem.",
      },
      practiceSet: [
        { prompt: "Which two meristems are called primary meristems, and why?", answer: "Apical and intercalary meristems, because they appear early in the life of a plant and build its primary plant body" },
        { prompt: "Name the three examples NCERT gives of lateral meristem.", answer: "Fascicular vascular cambium, interfascicular cambium and cork cambium" },
        { prompt: "Cells left behind by the shoot apical meristem while leaves form and the stem lengthens make which structure?", answer: "The axillary bud" },
        { prompt: "How does NCERT define a tissue?", answer: "A group of cells having a common origin and usually performing a common function" },
        { prompt: "What happens to a new cell from a meristem once it becomes specialised in structure and function?", answer: "It loses the ability to divide and becomes a permanent cell" },
      ],
      traps: [
        {
          title: "Intercalary is primary, lateral is secondary",
          body: "The **intercalary** meristem is a **primary** meristem, like the apical meristem. Only the **lateral** meristem (the cambia) is **secondary**.",
        },
        {
          title: "Simple or complex is about cell types",
          body: "A tissue is **simple** when all its cells are alike and **complex** when it has several types of cell. Xylem and phloem are complex; parenchyma, collenchyma and sclerenchyma are simple.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-simple",
      name: "Parenchyma, collenchyma and sclerenchyma",
      intuition:
        "The three simple tissues are told apart by their walls. Parenchyma has thin walls and does the everyday work. Collenchyma is still alive but thickened at the corners, so it gives bendy support to growing parts. Sclerenchyma has thick, lignified walls and is dead, so it gives hard support.",
      definition:
        "- **Parenchyma** forms the major part of most organs. Its cells are generally **isodiametric** (spherical, oval, round, polygonal or elongated), with **thin cellulose walls**, closely packed or with small intercellular spaces. It does **photosynthesis, storage and secretion**.\n" +
        "- **Collenchyma** occurs in layers **below the epidermis in dicot plants**, as a uniform layer or in patches. Its cells are **living**, oval, spherical or polygonal, often contain **chloroplasts**, and are **thickened at the corners** by **cellulose, hemicellulose and pectin**. There are **no intercellular spaces**. It gives mechanical support to growing parts such as the **young stem and the petiole** of a leaf.\n" +
        "- **Sclerenchyma** has long narrow cells with **thick, lignified walls** with few or many pits. The cells are usually **dead**, without protoplasts. Two kinds:\n" +
        "- **Fibres:** thick-walled, elongated, pointed cells, usually in groups.\n" +
        "- **Sclereids:** spherical, oval or cylindrical, highly thickened dead cells with a **very narrow lumen**. Found in the **fruit walls of nuts**, the **pulp of guava, pear and sapota**, the **seed coats of legumes** and the **leaves of tea**.",
      table: {
        columns: ["Tissue", "Living or dead", "Wall", "Where and what for"],
        rows: [
          { cells: ["Parenchyma", "Living", "Thin, of cellulose", "Major part of organs; photosynthesis, storage, secretion"] },
          {
            cells: ["Collenchyma", "Living", "Thickened at the corners with cellulose, hemicellulose and pectin", "Layers below the epidermis of dicots; supports the young stem and petiole"],
            noteAmber: "NEET 2024: collenchyma is a living tissue, so a statement calling it dead was false.",
            pyqExampleId: "7c04afa5-7378-445f-a75d-9221b1456a94",
          },
          { cells: ["Sclerenchyma fibres", "Dead", "Thick and lignified, with pits", "Elongated pointed cells in groups; mechanical support"] },
          { cells: ["Sclereids", "Dead", "Highly thickened, very narrow lumen", "Nut shells, pulp of guava, pear and sapota, legume seed coats, tea leaves"] },
        ],
      },
      pyqExampleId: "05388fd7-1ce0-4a8f-8f4a-1f51c46caa72",
      selfCheckExample: {
        prompt: "Under the epidermis of a young sunflower stem lies a tissue of living cells, often green, whose walls are thick only at the corners. Name the tissue and its job.",
        steps: [
          "Living cells thickened at the corners, with chloroplasts and no intercellular spaces, are collenchyma.",
          "Collenchyma lies below the epidermis of dicots and supports growing parts.",
        ],
        answer: "Collenchyma, which gives mechanical support to the growing stem.",
      },
      practiceSet: [
        { prompt: "Which three substances thicken the corners of collenchyma cells?", answer: "Cellulose, hemicellulose and pectin" },
        { prompt: "Name the three jobs NCERT gives for parenchyma.", answer: "Photosynthesis, storage and secretion" },
        { prompt: "Which simple tissue has living cells with no intercellular spaces and often has chloroplasts?", answer: "Collenchyma" },
        { prompt: "Name the two kinds of sclerenchyma.", answer: "Fibres and sclereids" },
        { prompt: "Apart from fruits, name two places in a plant where sclereids are found.", answer: "The seed coats of legumes and the leaves of tea" },
      ],
      traps: [
        {
          title: "Collenchyma is alive",
          body: "Only **sclerenchyma** is dead among the simple tissues. **Collenchyma** is **living**, like parenchyma, and often has chloroplasts.",
        },
        {
          title: "Sclereids are in soft pulp too",
          body: "Sclereids occur in hard parts like **nut shells** and also in the soft **pulp of pear, guava and sapota**. Do not reject pear pulp because it is soft.",
        },
        {
          title: "Corner thickening is not lignin",
          body: "Collenchyma corners are thickened with **cellulose, hemicellulose and pectin**. **Lignified** walls belong to **sclerenchyma**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-complex",
      name: "Xylem and phloem",
      intuition:
        "Xylem carries water and minerals up from the root; phloem carries food, usually from the leaves to the rest of the plant. Each is a team of four kinds of cell. The tubes that carry water are dead and empty. The tubes that carry food are alive but give up their nucleus, so a neighbouring cell has to run them.",
      definition:
        "Xylem (water and minerals from roots to stem and leaves; also gives strength):\n" +
        "- Four elements: **tracheids, vessels, xylem fibres and xylem parenchyma**.\n" +
        "- **Tracheids:** elongated, tube-like cells with thick lignified walls and **tapering ends**; dead, without protoplasm. In flowering plants, tracheids and vessels are the main water-carrying elements.\n" +
        "- **Vessels:** long tubes made of many **vessel members**, each with lignified walls and a large central cavity, joined through **perforations** in their common walls; no protoplasm. **Gymnosperms lack vessels**; vessels are a characteristic feature of **angiosperms**.\n" +
        "- **Xylem fibres:** highly thickened walls and obliterated lumens; septate or aseptate.\n" +
        "- **Xylem parenchyma:** **living**, thin cellulose walls; stores **starch, fat and tannins**. **Ray parenchyma** carries water sideways (radial conduction).\n" +
        "- Primary xylem is **protoxylem** (first formed) and **metaxylem** (later formed). **Endarch:** protoxylem towards the centre (pith), in **stems**. **Exarch:** protoxylem towards the periphery, in **roots**.\n\n" +
        "Phloem (food, usually from leaves to other parts):\n" +
        "- In angiosperms: **sieve tube elements, companion cells, phloem parenchyma and phloem fibres**. Gymnosperms have **albuminous cells and sieve cells**, and lack sieve tubes and companion cells.\n" +
        "- **Sieve tube elements:** long tubes in rows, with end walls perforated into **sieve plates**. A mature one has a **peripheral cytoplasm and a large vacuole but no nucleus**; its work is controlled by the **nucleus of the companion cell**.\n" +
        "- **Companion cells:** specialised parenchyma joined to the sieve tube by **pit fields** in their common longitudinal walls; they help keep the **pressure gradient** in the sieve tubes.\n" +
        "- **Phloem parenchyma:** elongated, tapering cells with dense cytoplasm and a nucleus; stores food, **resins, latex and mucilage**. **Absent in most monocots**.\n" +
        "- **Phloem (bast) fibres:** sclerenchyma, dead at maturity, generally **absent in primary phloem** and found in secondary phloem. Fibres of **jute, flax and hemp** are used commercially.\n" +
        "- First-formed primary phloem is **protophloem**; later-formed is **metaphloem**.",
      table: {
        columns: ["Element", "Tissue", "Key fact"],
        rows: [
          { cells: ["Tracheids", "Xylem", "Dead; thick lignified walls and tapering ends"] },
          { cells: ["Vessels", "Xylem", "Dead vessel members joined by perforations; found in angiosperms, absent in gymnosperms"] },
          { cells: ["Xylem parenchyma", "Xylem", "Living; stores starch, fat and tannins; rays conduct water sideways"] },
          {
            cells: ["Protoxylem position", "Primary xylem", "Endarch (towards the pith) in stems; exarch (towards the periphery) in roots"],
            noteAmber: "NEET 2023: exarch is the condition of the root; endarch belongs to the stem, not to the whole plant body.",
            pyqExampleId: "b97da525-7000-4a4e-904c-eb52b640b0d1",
          },
          { cells: ["Sieve tube elements", "Phloem", "Sieve plates; when mature: peripheral cytoplasm, large vacuole, no nucleus"] },
          { cells: ["Companion cells", "Phloem", "Joined by pit fields; their nucleus controls the sieve tube; keep the pressure gradient"] },
          { cells: ["Phloem parenchyma", "Phloem", "Stores food, resins, latex and mucilage; absent in most monocots"] },
          { cells: ["Phloem fibres", "Phloem", "Bast fibres, dead at maturity; jute, flax and hemp"] },
        ],
      },
      pyqExampleId: "24004424-e8ba-441a-8ccd-dd77b483220a",
      selfCheckExample: {
        prompt: "The xylem of a plant has tracheids, xylem fibres and xylem parenchyma, but no vessels. Is the plant more likely an angiosperm or a gymnosperm?",
        steps: [
          "Vessels are a characteristic feature of angiosperms.",
          "Gymnosperms lack vessels in their xylem.",
        ],
        answer: "A gymnosperm.",
      },
      practiceSet: [
        { prompt: "Name the four elements of xylem.", answer: "Tracheids, vessels, xylem fibres and xylem parenchyma" },
        { prompt: "Which xylem element has living, thin-walled cells that store starch, fat and tannins?", answer: "Xylem parenchyma" },
        { prompt: "What are the first-formed and the later-formed primary phloem called?", answer: "Protophloem and metaphloem" },
        { prompt: "Name three plants whose phloem fibres are used commercially.", answer: "Jute, flax and hemp" },
        { prompt: "Which two phloem cells do gymnosperms have in place of sieve tubes and companion cells?", answer: "Albuminous cells and sieve cells" },
      ],
      traps: [
        {
          title: "A mature sieve tube has no nucleus",
          body: "A mature sieve tube element keeps a **peripheral cytoplasm and a large vacuole** but **lacks a nucleus**. The **companion cell nucleus** controls it.",
        },
        {
          title: "Endarch is the stem, exarch is the root",
          body: "In **stems** the protoxylem faces the **pith** (endarch); in **roots** it faces the **periphery** (exarch). Neither is described as the condition of the whole plant body.",
        },
        {
          title: "Phloem parenchyma is missing in most monocots",
          body: "**Phloem parenchyma** is **absent in most monocots**, and **phloem fibres** are generally absent in **primary** phloem.",
        },
      ],
    },
  ],
};
