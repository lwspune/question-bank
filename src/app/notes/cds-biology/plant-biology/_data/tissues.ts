import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_PL_TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Tissues and Water Transport",
  title: "Tissues and Water Transport",
  oneLineDefinition:
    "Where a plant grows (the meristems), the simple and complex permanent tissues, what xylem and phloem carry, and how water rises, escapes and is saved in dry and salty places.",
  whyItMatters:
    "Thirteen CDS questions from 2018 (II) to 2024 (II), four of them in the 2024 (II) paper. Five are about xylem and phloem, and two of those ask exactly what xylem carries (water and the minerals dissolved in it). The intercalary meristem has been asked twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbipl-meristems",
      name: "Meristems: where a plant grows",
      intuition:
        "A plant does not grow all over its body. It grows only where it keeps a patch of young, dividing cells, called a meristem. Patches at the tips make the root and shoot longer. A patch at the base of a grass leaf lets the leaf grow back after a cow bites off the top. Rings of dividing cells along the sides make a tree trunk thicker each year.",
      definition:
        "The three meristems (NCERT Class 9, Tissues):\n" +
        "- **Apical meristem**: at the **tips** of the stem and root; increases **length**.\n" +
        "- **Intercalary meristem**: at the **base of the leaves or internodes** (on either side of the node); found in **grasses**, which is why they grow back after grazing or mowing.\n" +
        "- **Lateral meristem** (cambium): along the **sides** of stem and root; increases **girth**. The **vascular cambium** and the **cork cambium** are lateral meristems, and the growth in girth they make is **secondary growth**.\n" +
        "- Meristem cells are small, thin-walled, packed with dense cytoplasm, and keep **dividing**. Once they stop and take up a job, they form **permanent tissue**.",
      table: {
        columns: ["Meristem", "Where", "What it adds"],
        rows: [
          { cells: ["Apical", "Tips of root and shoot", "Length"] },
          {
            cells: ["Intercalary", "Base of the leaves or internodes", "Length of leaf and internode; regrowth of grass"],
            noteAmber: "Asked twice: CDS 2021 (II) and 2023 (I). The answer is the base of the leaves (or internodes), never the tip.",
            pyqExampleId: "a38a11c4-6892-447c-85ed-35fe4faa7194",
          },
          { cells: ["Lateral (vascular and cork cambium)", "Sides of stem and root", "Girth (secondary growth)"] },
        ],
      },
      pyqExampleId: "590b9cff-b922-408e-ad1a-1387bd8f1def",
      selfCheckExample: {
        prompt: "A nail is hammered into a tree trunk one metre above the ground. Ten years later, how high is the nail, and why?",
        steps: [
          "A trunk grows longer only at its tip, where the apical meristem is.",
          "Lower down, the trunk only grows thicker, through the lateral meristem.",
          "So the part holding the nail is not lifted up; it only widens around the nail.",
        ],
        answer: "Still about one metre up: length is added only at the tips, so the old part of the trunk is not lifted.",
      },
      practiceSet: [
        { prompt: "Which meristem makes the root and stem longer?", answer: "Apical meristem" },
        { prompt: "Which meristem lets grass grow back after it is mowed?", answer: "Intercalary meristem" },
        { prompt: "What is the tissue called whose cells have stopped dividing and taken up a fixed job?", answer: "Permanent tissue" },
        { prompt: "Where in a plant is the apical meristem found?", answer: "At the tips of the root and shoot" },
      ],
      traps: [
        {
          title: "Intercalary is at the base, not the tip",
          body: "The **intercalary** meristem sits at the **base of the leaves or internodes**. The tips belong to the **apical** meristem and the sides to the **lateral** meristem.",
        },
        {
          title: "Girth comes from the lateral meristem only",
          body: "The **apical** and **intercalary** meristems add **length**. Only the **lateral** meristem (vascular and cork cambium) adds **girth**. Pericycle and tracheids are not the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-simple",
      name: "Simple permanent tissues",
      intuition:
        "A simple tissue is made of one kind of cell. Parenchyma is the soft filling of a plant: living cells with thin walls that store food. Collenchyma is a little tougher, so a leaf stalk can bend without snapping. Sclerenchyma is the hard part: its cells build thick woody walls and then die, leaving a strong, stiff frame.",
      definition:
        "The three simple permanent tissues (NCERT Class 9):\n" +
        "- **Parenchyma**: **living** cells with thin **cellulose** walls and spaces between them; stores food. With chlorophyll it is **chlorenchyma**; with large air spaces in water plants it is **aerenchyma**, which helps them float.\n" +
        "- **Collenchyma**: **living** cells, walls thickened at the **corners**; gives **flexibility**, as in leaf stalks and young stems.\n" +
        "- **Sclerenchyma**: **dead** cells with thick walls hardened by **lignin**; gives **strength** and hardness, as in the husk of coconut and fibres such as jute.\n" +
        "- **Suberin** is the waxy substance in the walls of **cork** cells, not of sclerenchyma.",
      table: {
        columns: ["Tissue", "Living or dead", "Wall", "Job"],
        rows: [
          { cells: ["Parenchyma", "Living", "Thin, cellulose", "Storage; photosynthesis as chlorenchyma"] },
          { cells: ["Collenchyma", "Living", "Thickened at the corners", "Flexibility"] },
          {
            cells: ["Sclerenchyma", "Dead", "Thick, lignified", "Strength"],
            noteAmber: "CDS 2020 (II): mature sclerenchyma cells have lignified walls and are dead.",
            pyqExampleId: "bb03a2f0-52e8-4b1f-af64-6c912f5161e0",
          },
          { cells: ["Cork", "Dead", "Suberin", "Protection; keeps water and gases out"] },
        ],
      },
      pyqExampleId: "bb03a2f0-52e8-4b1f-af64-6c912f5161e0",
      selfCheckExample: {
        prompt: "The stalk of a leaf bends in a strong wind and springs back without breaking. Which simple tissue makes this possible, and what is special about its cells?",
        steps: [
          "Bending without breaking needs a tissue that is strong but not stiff.",
          "Collenchyma cells are living, with walls thickened only at the corners.",
          "That gives support while letting the stalk flex.",
        ],
        answer: "Collenchyma: living cells with walls thickened at the corners, which gives flexibility.",
      },
      practiceSet: [
        { prompt: "What is parenchyma that contains chlorophyll called?", answer: "Chlorenchyma" },
        { prompt: "What is parenchyma with large air spaces, which helps water plants float, called?", answer: "Aerenchyma" },
        { prompt: "Which substance makes the walls of cork cells waterproof?", answer: "Suberin" },
        { prompt: "Which simple tissue stores food in a potato?", answer: "Parenchyma" },
      ],
      traps: [
        {
          title: "Lignin with sclerenchyma, suberin with cork",
          body: "Sclerenchyma walls are hardened with **lignin**. **Suberin** is the waxy substance of **cork** cells. Both kinds of cell are dead, so match the wall, not just 'dead'.",
        },
        {
          title: "Two simple tissues are living",
          body: "**Parenchyma** and **collenchyma** are living; only **sclerenchyma** is dead at maturity.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-xylem",
      name: "Xylem and phloem",
      intuition:
        "Xylem and phloem are the plant's two sets of pipes, and each is a complex tissue made of several kinds of cell. Xylem carries water and the minerals dissolved in it up from the roots; most of its cells are dead, empty tubes. Phloem carries the food made in the leaves to every part of the plant, and most of its cells are alive.",
      definition:
        "The complex tissues (NCERT Class 9):\n" +
        "- **Xylem** carries **water and dissolved minerals** upward from the root. Its elements: **tracheids, vessels, xylem fibres** (all **dead**) and **xylem parenchyma** (the only **living** part, which stores food).\n" +
        "- **Phloem** carries the **food made by photosynthesis** (mainly sugar) both up and down. Its elements: **sieve tubes, companion cells, phloem parenchyma** (living) and **phloem fibres** (the only **dead** part).\n" +
        "- A **vascular bundle** is made of **xylem, phloem** and, in the open bundles of dicot stems, the **cambium** between them.\n" +
        "- The **endodermis** is the innermost layer of the cortex, outside the bundles. It is **not** part of a vascular bundle.",
      table: {
        columns: ["Element", "Tissue", "Living or dead"],
        rows: [
          { cells: ["Tracheids and vessels", "Xylem", "Dead"] },
          {
            cells: ["Xylem parenchyma", "Xylem", "Living"],
            noteAmber: "CDS 2023 (I): of tracheid, vessel, xylem parenchyma and xylem fibre, only xylem parenchyma is living.",
            pyqExampleId: "3cdcf3ad-b51b-420f-95db-fb201c6baf77",
          },
          { cells: ["Xylem fibres", "Xylem", "Dead"] },
          { cells: ["Sieve tubes and companion cells", "Phloem", "Living"] },
          { cells: ["Phloem parenchyma", "Phloem", "Living"] },
          { cells: ["Phloem fibres", "Phloem", "Dead"] },
        ],
        caption:
          "Two more questions ask what xylem carries: CDS 2018 (II) (a blocked xylem stops water AND solutes) and CDS 2024 (II) (water and dissolved minerals). CDS 2024 (II) also asks which is not part of a vascular bundle: the endodermis.",
      },
      pyqExampleId: "3f549a75-b53a-4b61-a8eb-090b7add1960",
      selfCheckExample: {
        prompt: "A ring of bark, with the phloem in it, is cut away all round a tree trunk. The xylem inside is left whole. Which part of the tree starves first, and why?",
        steps: [
          "Food made in the leaves travels down through the phloem.",
          "With the ring of phloem gone, food cannot pass below the cut.",
          "Water still rises through the intact xylem, so the leaves stay alive for a while; the roots below the ring get no food.",
        ],
        answer: "The roots, because the phloem that carries food down to them has been cut.",
      },
      practiceSet: [
        { prompt: "Which is the only dead element of phloem?", answer: "Phloem fibres" },
        { prompt: "Name the two dead, tube-like elements of xylem that carry water.", answer: "Tracheids and vessels" },
        { prompt: "What lies between the xylem and phloem in an open vascular bundle?", answer: "Cambium" },
        { prompt: "Does phloem carry food only downward, or both up and down?", answer: "Both up and down, to wherever it is needed" },
      ],
      traps: [
        {
          title: "Xylem carries water AND minerals",
          body: "Xylem does not carry water alone: the **minerals** absorbed by the roots are **dissolved** in that water and rise with it. So blocking xylem stops both.",
        },
        {
          title: "Phloem is complex, and it carries food",
          body: "Phloem is a **complex** tissue that carries the **products of photosynthesis**. Water, minerals and mechanical support belong to the xylem.",
        },
        {
          title: "Endodermis sits outside the bundle",
          body: "A vascular bundle is **xylem, phloem and cambium**. The **endodermis** is a layer of the cortex that rings the vascular tissue from outside.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-water",
      name: "How water rises and escapes",
      intuition:
        "As water evaporates from the leaves, it pulls on the water behind it in the xylem, like sucking on a straw. The water does not break, because its molecules cling to each other, and it does not slip back, because it also clings to the walls of the narrow tubes. Plants of dry places hold on to water by losing as little as they can, and plants of salty soil have their own ways to cope with salt.",
      definition:
        "Water in the plant (NCERT Class 11, Transport in Plants):\n" +
        "- **Transpiration**: loss of water as **vapour**, mostly through the **stomata**.\n" +
        "- **Ascent of sap** in tall trees is by **transpiration pull**, with the water column held by **cohesion** (water to water) and **adhesion** (water to the xylem walls).\n" +
        "- **Root pressure** pushes water up a little from below; it is not enough for a tall tree.\n" +
        "- **Guttation**: loss of **liquid water as drops**, through **hydathodes** at the leaf edges, seen on grass on cool, humid mornings. It is caused by **root pressure**.\n" +
        "- **Xerophytes** (dry places, such as cactus and Opuntia): small or spiny leaves, a thick **waxy cuticle**, **few stomata** sunk in **pits**, deep roots.\n" +
        "- **Halophytes** grow in **saline** (salty) soil, such as the mangroves, many of which have breathing roots (pneumatophores).\n" +
        "- **Hydrophytes** grow in water, such as the water lily and Hydrilla.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Transpiration", "Loss of water as vapour through stomata"] },
          {
            cells: ["Guttation", "Loss of water as liquid drops through hydathodes"],
            noteAmber: "CDS 2018 (II): water escaping as droplets is guttation, not transpiration.",
            pyqExampleId: "287ea4aa-a3e5-4c68-95c8-d614179a5958",
          },
          { cells: ["Cohesion", "Water molecules holding on to each other"] },
          { cells: ["Adhesion", "Water molecules holding on to the xylem walls"] },
          {
            cells: ["Xerophyte", "Plant of dry places: small leaves, waxy cuticle, few sunken stomata"],
            noteAmber: "CDS 2024 (II): a large number of stomata is NOT a feature of xerophytes.",
            pyqExampleId: "0b01ad6a-58ed-4b98-84a5-6865b4ace96d",
          },
          {
            cells: ["Halophyte", "Plant of saline soil, such as mangroves"],
            noteAmber: "CDS 2024 (II): halophytes grow on saline soil.",
            pyqExampleId: "0828ed23-11f4-4ab1-ae11-873458a75b32",
          },
          { cells: ["Hydrophyte", "Plant of water, such as the water lily"] },
        ],
      },
      pyqExampleId: "6ccaca5c-f1ec-46c9-950b-ca4ffa05f883",
      selfCheckExample: {
        prompt: "Early on a cool, humid morning, drops of water hang from the leaf tips of grass, though it did not rain. What is this, and what pushed the water out?",
        steps: [
          "Water is leaving the leaf as liquid drops, not as vapour, so this is not transpiration.",
          "Liquid water leaves through hydathodes at the leaf edges and tips: this is guttation.",
          "At night transpiration is low, so root pressure pushes water up and out.",
        ],
        answer: "Guttation, driven by root pressure.",
      },
      practiceSet: [
        { prompt: "Through which openings does guttation take place?", answer: "Hydathodes" },
        { prompt: "What is a plant that grows in water, such as the water lily, called?", answer: "A hydrophyte" },
        { prompt: "Why do many xerophytes have their stomata sunk in pits?", answer: "To reduce loss of water by transpiration" },
        { prompt: "Name a plant that grows in saline soil along the coast.", answer: "A mangrove" },
      ],
      traps: [
        {
          title: "Respiration does not lift water",
          body: "Water rises in a tall tree by **transpiration pull** held by **cohesion and adhesion**. **Root pressure** helps only a little and **respiration** not at all, so an option without transpiration pull is wrong.",
        },
        {
          title: "Drops mean guttation",
          body: "**Transpiration** loses water as **vapour**; **guttation** loses it as **liquid drops**. Secretion and excretion are not the names for either.",
        },
      ],
    },
  ],
};
