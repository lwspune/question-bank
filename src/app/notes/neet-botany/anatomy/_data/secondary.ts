import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_AN_SECONDARY_NOTE: SubtopicNote = {
  subtopicName: "Secondary Growth",
  title: "Secondary Growth",
  oneLineDefinition:
    "How the vascular cambium forms a ring and thickens a dicot stem and root, how spring wood, autumn wood, heartwood and sapwood arise, and how the cork cambium makes the periderm, bark and lenticels.",
  whyItMatters:
    "Six NEET questions from 2021 to 2023, and none since 2023. Spring and autumn wood were asked twice (NEET 2022 and NEET 2023), and the cork cambium, bark and lenticels twice (NEET 2021 and NEET 2023); heartwood and the interfascicular cambium were asked once each.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboan-cambium",
      name: "The vascular cambium and its ring",
      intuition:
        "A young dicot stem has a thin strip of cambium inside each bundle. To thicken the whole stem, these strips must join into one ring, so the cells between the bundles wake up and divide too. The ring then adds wood on its inner side and new phloem on its outer side, much more wood than phloem.",
      definition:
        "- The **vascular cambium** is the meristem that cuts off xylem and phloem. In a young stem it lies in patches, a single layer between xylem and phloem; later it becomes a **complete ring**.\n" +
        "- **Intrafascicular cambium:** the cambium inside each bundle, between primary xylem and primary phloem.\n" +
        "- **Interfascicular cambium:** the **medullary ray cells** next to the intrafascicular cambium become meristematic. The two together make a **continuous cambial ring**.\n" +
        "- Cells cut off **towards the pith** become **secondary xylem**; cells cut off **towards the periphery** become **secondary phloem**. The cambium is **more active on the inner side**, so **more secondary xylem** forms than secondary phloem.\n" +
        "- The **primary and secondary phloem** are gradually **crushed** by the growing xylem; the **primary xylem** stays more or less intact, in or around the centre.\n" +
        "- In places the cambium makes narrow bands of parenchyma running **radially** through the secondary xylem and phloem: the **secondary medullary rays**.\n" +
        "- **Dicot root:** the vascular cambium is **completely secondary in origin**. It arises from tissue **just below the phloem bundles** and from the **pericycle above the protoxylem**, as a **wavy ring** that later becomes circular.\n" +
        "- Secondary growth also happens in the stems and roots of **gymnosperms**; it does **not** happen in **monocots**.",
      table: {
        columns: ["Part", "Where it comes from or goes", "Result"],
        rows: [
          { cells: ["Intrafascicular cambium", "Inside each bundle, between primary xylem and phloem", "Strips of cambium in the young stem"] },
          { cells: ["Interfascicular cambium", "Medullary ray cells beside the intrafascicular cambium", "Joins the strips into a continuous ring"] },
          { cells: ["Inner derivatives", "Cut off towards the pith", "Secondary xylem, the larger amount"] },
          { cells: ["Outer derivatives", "Cut off towards the periphery", "Secondary phloem, the smaller amount"] },
          { cells: ["Secondary medullary rays", "Narrow parenchyma bands made by the cambium", "Run radially through secondary xylem and phloem"] },
          { cells: ["Root cambium", "Tissue below the phloem bundles and pericycle above the protoxylem", "A wavy ring that later becomes circular"] },
        ],
      },
      pyqExampleId: "2573cb8f-0d80-4b7c-b1d8-1c5f3e4026b7",
      selfCheckExample: {
        prompt: "After some years of secondary growth, a dicot stem has a thick core of secondary xylem but only a thin band of secondary phloem. Why?",
        steps: [
          "The cambial ring cuts off xylem towards the inside and phloem towards the outside.",
          "It is more active on the inner side, and the older phloem is crushed as xylem keeps building up.",
        ],
        answer: "The cambium makes far more cells on its inner (xylem) side, and the phloem gets crushed.",
      },
      practiceSet: [
        { prompt: "In a dicot root, from which tissues does the vascular cambium arise?", answer: "From tissue just below the phloem bundles and from the pericycle above the protoxylem" },
        { prompt: "What happens to the primary phloem as secondary growth goes on?", answer: "It is gradually crushed by the growing secondary xylem" },
        { prompt: "What are the narrow radial bands of parenchyma made by the cambium through the secondary xylem and phloem called?", answer: "Secondary medullary rays" },
        { prompt: "Do gymnosperms show secondary growth? Do monocots?", answer: "Gymnosperms do, in stems and roots; monocots do not" },
        { prompt: "What is the cambium inside a vascular bundle, between primary xylem and primary phloem, called?", answer: "Intrafascicular cambium" },
      ],
      traps: [
        {
          title: "Interfascicular cambium comes from medullary rays",
          body: "In the stem, the **interfascicular cambium** forms from **medullary ray cells**. The **pericycle** gives cambium only in the **root**.",
        },
        {
          title: "More xylem than phloem",
          body: "The cambium is **more active on the inner side**, so **secondary xylem** outweighs secondary phloem. A statement saying they are made in equal amounts is false.",
        },
        {
          title: "The root cambium is wholly secondary",
          body: "In the dicot **root** the vascular cambium is **completely secondary in origin**; it starts as a **wavy** ring, not a circle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-wood",
      name: "Spring wood, autumn wood, heartwood and sapwood",
      intuition:
        "Where seasons change, the cambium works hard in spring and slows down in winter. Fast spring growth gives pale wood with wide pipes; slow winter growth gives dark wood with narrow pipes. One pale band and one dark band make a year. In an old trunk, the centre fills with dark chemicals and stops carrying water, while the outer wood keeps working.",
      definition:
        "- The cambium is controlled by many physiological and environmental factors. In **temperate regions** the climate is not uniform through the year.\n" +
        "- **Spring wood (early wood):** in spring the cambium is **very active** and makes **many xylary elements with wide vessels**. It is **lighter in colour** and has **lower density**.\n" +
        "- **Autumn wood (late wood):** in winter the cambium is **less active** and makes **fewer xylary elements with narrow vessels**. It is **darker** and has **higher density**.\n" +
        "- Spring wood and autumn wood appear as **alternate concentric rings**, and together they make an **annual ring**. Counting annual rings gives an estimate of the **age of the tree**.\n" +
        "- **Heartwood:** in old trees most of the secondary xylem is **dark brown** from **tannins, resins, oils, gums, aromatic substances and essential oils** deposited in the **central or innermost layers** of the stem. These make it hard, durable and **resistant to micro-organisms and insects**. It is made of **dead elements with highly lignified walls**, does **not conduct water**, and gives **mechanical support**.\n" +
        "- **Sapwood:** the **peripheral**, **lighter** part of the secondary xylem; it **conducts water and minerals** from root to leaf.",
      table: {
        columns: ["Wood", "When or where", "Features"],
        rows: [
          { cells: ["Spring wood (early wood)", "Spring, cambium very active", "Many xylary elements, wide vessels; lighter, lower density"] },
          {
            cells: ["Autumn wood (late wood)", "Winter, cambium less active", "Fewer xylary elements, narrow vessels; darker, higher density"],
            noteAmber: "NEET 2023: autumn wood has fewer xylary elements with narrow vessels because the cambium is less active in winter.",
            pyqExampleId: "2aca67d8-1ad2-4bb1-ad43-820dc2a62bd5",
          },
          { cells: ["Annual ring", "One year of growth", "Spring and autumn wood as alternate concentric rings; estimate the age of the tree"] },
          {
            cells: ["Heartwood", "Central, innermost layers of an old stem", "Dark brown with tannins, resins, gums and oils; dead and lignified; resists insects; no water conduction"],
            noteAmber: "NEET 2022: heartwood resists insects because organic compounds like tannins and resins are deposited in the central layers.",
            pyqExampleId: "14dc80b8-55d1-4a58-b783-d045a5fbac24",
          },
          { cells: ["Sapwood", "Peripheral secondary xylem", "Lighter; conducts water and minerals from root to leaf"] },
        ],
      },
      pyqExampleId: "fc8c39bf-1430-47d2-a75c-521e8d02c87a",
      selfCheckExample: {
        prompt: "A cut trunk from a temperate forest shows 40 pairs of light and dark bands. About how old was the tree, and why?",
        steps: [
          "Each year the cambium makes a light band of spring wood and a dark band of autumn wood.",
          "One light band plus one dark band is one annual ring, so the number of rings estimates the age.",
        ],
        answer: "About 40 years old.",
      },
      practiceSet: [
        { prompt: "In an old tree, which part of the secondary xylem still carries water and minerals?", answer: "The sapwood, the peripheral lighter part" },
        { prompt: "Does heartwood conduct water? What job does it do?", answer: "No; it gives mechanical support to the stem" },
        { prompt: "Name four substances deposited in heartwood.", answer: "Any four of tannins, resins, oils, gums, aromatic substances and essential oils" },
        { prompt: "In which kind of region is the climate uneven through the year, so that the cambium makes distinct seasonal wood?", answer: "Temperate regions" },
        { prompt: "What are the walls of the dead elements of heartwood like?", answer: "Highly lignified" },
      ],
      traps: [
        {
          title: "Heartwood deposits are in the centre",
          body: "Tannins, resins and gums collect in the **central or innermost** layers. The **peripheral** layers are **sapwood**, which still conducts water.",
        },
        {
          title: "Spring wood has wide vessels",
          body: "**Spring wood** has **wide** vessels and is **light** and less dense. **Narrow** vessels belong to **autumn wood**.",
        },
        {
          title: "Suberin is in cork, not heartwood",
          body: "**Suberin** is laid down in the walls of **cork** cells. Heartwood is darkened by **tannins, resins, oils and gums**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-cork",
      name: "Cork cambium, periderm, bark and lenticels",
      intuition:
        "As the stem widens, its old skin splits. A second cambium, the cork cambium, grows in the cortex to make a new protective cover: cork on the outside and a little extra cortex on the inside. Everything outside the vascular cambium is loosely called bark. Here and there loose cells break through the cork to let air in.",
      definition:
        "- As girth increases, the outer cortex and epidermis break and must be replaced. A meristem called the **cork cambium (phellogen)** develops, **usually in the cortex**.\n" +
        "- Phellogen is **a couple of layers thick**, of narrow, thin-walled, nearly rectangular cells. It cuts off cells on **both sides**.\n" +
        "- **Outer** cells become **cork (phellem)**, impervious to water because of **suberin** in their walls. **Inner** cells become the **secondary cortex (phelloderm)**, which is parenchymatous.\n" +
        "- **Phellogen, phellem and phelloderm** together are the **periderm**. Pressure from the cork cambium makes the layers outside it die and slough off.\n" +
        "- **Bark** is a **non-technical** term for **all tissues outside the vascular cambium**, so it includes the **secondary phloem**: it is the **periderm plus the secondary phloem**. Bark made early in the season is **early or soft bark**; bark made towards the end is **late or hard bark**.\n" +
        "- In places the phellogen cuts off closely arranged **parenchyma** on the outer side instead of cork. These cells rupture the epidermis and form **lens-shaped openings, the lenticels**, which allow **exchange of gases** between the air and the inner tissue of the stem. They occur in **most woody trees**.",
      table: {
        columns: ["Term", "What it is"],
        rows: [
          { cells: ["Cork cambium (phellogen)", "A couple of layers of narrow, thin-walled cells, usually in the cortex; divides on both sides"] },
          { cells: ["Cork (phellem)", "Outer product of the phellogen; suberin makes it impervious to water"] },
          { cells: ["Secondary cortex (phelloderm)", "Inner product of the phellogen; parenchymatous"] },
          { cells: ["Periderm", "Phellogen, phellem and phelloderm together"] },
          {
            cells: ["Bark", "Non-technical term for all tissues outside the vascular cambium: periderm and secondary phloem"],
            noteAmber: "NEET 2023: bark refers to periderm and secondary phloem, and lenticels are lens-shaped openings for gas exchange.",
            pyqExampleId: "72878ec6-4c44-43f7-868f-5a252e7872f7",
          },
          { cells: ["Soft and hard bark", "Early bark is soft; late bark, formed towards the end of the season, is hard"] },
          { cells: ["Lenticels", "Lens-shaped openings where loose parenchyma breaks the epidermis; gas exchange in most woody trees"] },
        ],
      },
      pyqExampleId: "343ae140-7b0e-4302-8f74-e872436015b4",
      selfCheckExample: {
        prompt: "Why do the epidermis and outer cortex of a woody stem die and peel away after some years?",
        steps: [
          "The vascular cambium keeps widening the stem, so the outer layers break.",
          "The cork cambium forms new cork, and the pressure it builds kills the layers outside it, which slough off.",
        ],
        answer: "Growth in girth breaks them, and pressure from the cork cambium makes them die and slough off.",
      },
      practiceSet: [
        { prompt: "Which three layers together make the periderm?", answer: "Phellogen, phellem and phelloderm" },
        { prompt: "How thick is the phellogen?", answer: "A couple of layers thick" },
        { prompt: "What is bark formed towards the end of the season called?", answer: "Late or hard bark" },
        { prompt: "In which region of the stem does the cork cambium usually develop?", answer: "In the cortex" },
        { prompt: "Is bark a technical term, and does it include the secondary phloem?", answer: "No, it is a non-technical term, and yes, it includes the secondary phloem" },
      ],
      traps: [
        {
          title: "Phellogen is not single-layered",
          body: "The cork cambium is **a couple of layers thick**. A statement calling it single-layered is false.",
        },
        {
          title: "Early bark is soft, late bark is hard",
          body: "Bark formed **early** in the season is **soft**; **hard** bark is formed **late**, towards the end of the season.",
        },
        {
          title: "Bark is a non-technical word",
          body: "**Bark** is a **non-technical** term for everything outside the **vascular cambium**, so it includes the **secondary phloem**, not just the periderm.",
        },
        {
          title: "Phellem outside, phelloderm inside",
          body: "The phellogen gives **cork (phellem)** to the **outside** and **secondary cortex (phelloderm)** to the **inside**. Swapping them is a common wrong match.",
        },
      ],
    },
  ],
};
