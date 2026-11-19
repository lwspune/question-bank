import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LP_TRANSPORT_NOTE: SubtopicNote = {
  subtopicName: "Transport and Excretion",
  title: "Transport and Excretion",
  oneLineDefinition:
    "Plants take in water by osmosis, carry it in the xylem and lose it by transpiration; the kidneys' nephrons filter wastes out of blood as urine, and plants store their wastes as resins and gums.",
  whyItMatters:
    "Eight questions in the bank, four EASY and four MODERATE. Three are about transport in plants (what transportation means, how roots take in water, a figure of transpiration) and five about excretion: the organs of the excretory system, Bowman's capsule, dialysis, the season with the least urine, and where plants store their wastes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9lptr-plants",
      name: "Osmosis, transport and transpiration in plants",
      intuition:
        "Water moves from where there is more of it to where there is less, across a cell's membrane. A root hair's sap is thicker than soil water, so water seeps in. From the roots, pipes of xylem carry it up to the leaves, and the leaves lose it as vapour through tiny pores, which pulls more water up behind it.",
      definition:
        "- **Transportation** is carrying a substance that is made or absorbed in one part of the body to another part.\n" +
        "- **Osmosis**: water moves through a membrane from a weaker solution to a stronger one. **Endosmosis**: water moves **into** a cell. **Exosmosis**: water moves **out** of a cell.\n" +
        "- Root hairs take in soil water by **endosmosis**, because their sap is more concentrated than the soil water.\n" +
        "- **Xylem** carries water and minerals **up** from the roots to the leaves. **Phloem** carries food made in the leaves to **all parts**.\n" +
        "- **Transpiration** is the loss of water as **vapour** through the **stomata** of leaves, each pore opened and closed by two **guard cells**. It pulls water up the xylem (transpiration pull), helped by **root pressure** from below.",
      table: {
        columns: ["Process", "What moves", "Example or place"],
        rows: [
          { cells: ["Endosmosis", "Water into a cell", "Root hairs taking in soil water; raisins swelling in water"] },
          { cells: ["Exosmosis", "Water out of a cell", "Cells shrinking in strong salt water"] },
          { cells: ["Conduction in xylem", "Water and minerals, upwards", "From the roots to the leaves"] },
          { cells: ["Conduction in phloem", "Food, up and down", "From the leaves to every part"] },
          { cells: ["Transpiration", "Water vapour, out of the plant", "Through the stomata of leaves"] },
        ],
        caption: "Endo: water in. Exo: water out.",
      },
      selfCheckExample: {
        prompt: "Which tissue carries the food made in the leaves down to the roots?",
        steps: ["Xylem carries water and minerals up; food is carried by the other conducting tissue."],
        answer: "Phloem",
      },
      practiceSet: [
        { prompt: "Through which tiny openings on a leaf does transpiration take place?", answer: "Through the stomata" },
        { prompt: "Which tissue carries water from the roots to the leaves?", answer: "Xylem" },
        { prompt: "What is the movement of water out of a cell into a stronger salt solution called?", answer: "Exosmosis" },
        { prompt: "What is the carrying of a substance from the part where it is made to another part called?", answer: "Transportation" },
      ],
      pyqExampleId: "981a12fa-9e31-42b6-8e38-597d8e99bd40",
      traps: [
        {
          title: "Mixing up endosmosis and exosmosis",
          body: "In endosmosis water enters the cell; in exosmosis water leaves it. Roots take in water by endosmosis.",
        },
        {
          title: "Thinking phloem carries water",
          body: "Xylem carries water and minerals up from the roots. Phloem carries food from the leaves.",
        },
        {
          title: "Calling transpiration the transport of water",
          body: "Transpiration is the loss of water vapour through the stomata. It helps pull water up, but the water itself travels in the xylem.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lptr-excretion",
      name: "Excretion in humans and plants",
      intuition:
        "Every cell makes wastes, such as urea, that would poison the body if they stayed. The kidneys clean the blood all day: millions of tiny filters, the nephrons, let water and wastes through, take back what is useful, and send the rest out as urine. Plants have no kidneys, so they lock their wastes away in old wood and in leaves they shed.",
      definition:
        "- The **kidneys** are a pair of **bean-shaped** organs. Each holds about **10 lakh nephrons**, the **filtering units** of the kidney.\n" +
        "- A nephron begins with **Bowman's capsule**, a **thin-walled, cup-shaped** structure around the **glomerulus**, a knot of fine blood capillaries where blood is filtered.\n" +
        "- Urine goes from the kidney through the **ureter** to the **urinary bladder** and out through the **urethra**. Its main waste is **urea**.\n" +
        "- **Dialysis** does the work of the kidneys **artificially** when they fail: a machine filters the blood outside the body and returns it.\n" +
        "- In **summer (March to May)** we lose much water as sweat, so the kidneys save water and **less urine** is made.\n" +
        "- Plants store wastes as **resins and gums** in **old xylem**, and lose others in falling leaves and bark.",
      table: {
        columns: ["Part", "What it is", "Its job"],
        rows: [
          { cells: ["Kidney", "A pair of bean-shaped organs", "Filter blood and make urine"] },
          { cells: ["Nephron", "The filtering unit of the kidney", "Filters blood and takes back useful substances"] },
          { cells: ["Bowman's capsule", "A thin-walled cup at the start of the nephron", "Holds the glomerulus and collects the filtered liquid"] },
          { cells: ["Glomerulus", "A knot of fine blood capillaries", "Blood is filtered here"] },
          { cells: ["Ureter", "A tube from each kidney", "Carries urine to the urinary bladder"] },
          { cells: ["Urinary bladder", "A muscular bag", "Stores urine"] },
          { cells: ["Urethra", "A tube from the bladder", "Passes urine out of the body"] },
        ],
        caption: "The uterus and the fallopian tubes belong to the reproductive system, not to this one.",
      },
      selfCheckExample: {
        prompt: "A patient's kidneys have stopped working. How is his blood kept clean until he can get a new kidney?",
        steps: ["The wastes must still be filtered out of his blood.", "A machine can do this outside his body."],
        answer: "By dialysis, which does the kidneys' work artificially",
      },
      practiceSet: [
        { prompt: "What is the filtering unit of the kidney called?", answer: "The nephron" },
        { prompt: "Which tube carries urine from a kidney to the urinary bladder?", answer: "The ureter" },
        { prompt: "In which part of a plant are wastes such as resins and gums stored?", answer: "In the old xylem" },
        { prompt: "What is the main nitrogen waste in human urine?", answer: "Urea" },
      ],
      pyqExampleId: "cf3458d6-df0c-456e-b008-9e04ad059c8c",
      traps: [
        {
          title: "Calling Bowman's capsule thick and muscular",
          body: "Bowman's capsule is a thin-walled cup. It is the whole kidney, not the capsule, that is bean-shaped.",
        },
        {
          title: "Putting reproductive organs in the excretory system",
          body: "The uterus and the fallopian tubes are reproductive organs. The excretory organs are the kidneys, nephrons, ureters, bladder and urethra.",
        },
        {
          title: "Thinking we pass more urine in summer",
          body: "In summer much water leaves the body as sweat, so the kidneys keep water back and less urine is made.",
        },
      ],
    },
  ],
};
