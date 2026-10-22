import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_DIGESTION_NOTE: SubtopicNote = {
  subtopicName: "Digestion and Nutrition",
  title: "Digestion and Nutrition",
  oneLineDefinition:
    "How enzymes break food down along the gut, what bile, villi and tooth enamel do, and which disease comes from missing which nutrient.",
  whyItMatters:
    "Fourteen CDS questions from 2016 (II) to 2026 (I), the biggest group in Human Physiology; the 2022 (II) paper alone asked four. Five are about enzymes, four about the parts of the gut, and five about deficiency diseases.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-enzymes",
      name: "Digestive enzymes, from the mouth to the intestine",
      intuition:
        "Food is too big to pass into the blood, so enzymes cut it into small pieces. Each enzyme works on one kind of food and in one kind of medium. Digestion starts in the mouth, where saliva begins on starch. The stomach is acidic, so its enzyme for protein works in acid. The small intestine is made alkaline by bile and pancreatic juice, and the enzymes there finish the job.",
      definition:
        "Enzymes in general:\n" +
        "- **Biological catalysts**, almost all **proteins**. They **speed up** a reaction and are **unchanged** at the end.\n" +
        "- Each works best at an **optimum temperature** (about **37 °C**, body temperature, for human enzymes) and an optimum pH.\n\n" +
        "Along the gut:\n" +
        "- **Mouth**: **salivary amylase** starts breaking **starch** into sugar. It is the **first** enzyme to meet food. Saliva and tears also hold **lysozyme**, which kills bacteria.\n" +
        "- **Stomach**: hydrochloric acid makes it **acidic**; **pepsin** digests **proteins** and works only in acid.\n" +
        "- **Small intestine**: made **alkaline** by bile and pancreatic juice. **Trypsin** (protein), **pancreatic amylase** (starch) and **lipase** (fat) work here, and **lactase** splits **lactose** (milk sugar).\n" +
        "- Most people make less lactase after childhood; an adult who still digests milk easily still makes enough of it.",
      table: {
        columns: ["Enzyme", "Where it acts", "What it digests", "Medium"],
        rows: [
          { cells: ["Salivary amylase", "Mouth", "Starch", "About neutral"] },
          {
            cells: ["Lysozyme", "Saliva and tears", "Cell walls of bacteria", "About neutral"],
            noteAmber: "CDS 2024 (I): the antibacterial enzyme in saliva and tears is lysozyme.",
            pyqExampleId: "4309ed05-5392-42d3-9f19-9add3d1e0197",
          },
          {
            cells: ["Pepsin", "Stomach", "Proteins", "Acidic"],
            noteAmber: "CDS 2022 (II): trypsin and amylase are the pair that do not work in acid.",
            pyqExampleId: "f2beac45-1030-4aa9-9954-80931922496b",
          },
          { cells: ["Trypsin", "Small intestine (from the pancreas)", "Proteins", "Alkaline"] },
          { cells: ["Lipase", "Small intestine", "Fats", "Alkaline"] },
          {
            cells: ["Lactase", "Small intestine", "Lactose (milk sugar)", "Alkaline"],
            noteAmber: "CDS 2026 (I): an elderly person who can still digest milk is making enough lactase.",
            pyqExampleId: "cc95ebf8-b1f3-48fa-9fe3-837e78521035",
          },
        ],
      },
      pyqExampleId: "e4f7e026-0973-4c2a-8e6b-80dfca4b4b13",
      selfCheckExample: {
        prompt: "Pepsin digests protein well in the stomach but stops working once the food reaches the small intestine. Why?",
        steps: [
          "Pepsin works only in an acidic medium, and the stomach is acidic.",
          "In the small intestine bile and pancreatic juice make the medium alkaline, so pepsin can no longer act; trypsin takes over.",
        ],
        answer: "The small intestine is alkaline, and pepsin needs acid.",
      },
      practiceSet: [
        { prompt: "Which enzyme of the stomach digests proteins?", answer: "Pepsin" },
        { prompt: "Which enzyme digests milk sugar?", answer: "Lactase" },
        { prompt: "Is an enzyme used up in the reaction it speeds up?", answer: "No, it is unchanged at the end" },
        { prompt: "Which enzyme digests fats in the small intestine?", answer: "Lipase" },
      ],
      traps: [
        {
          title: "Amylase acts first, in the mouth",
          body: "Digestion begins in the **mouth**, so **salivary amylase** is the first enzyme to meet food. Pepsin (stomach) and trypsin (intestine) come later, and 'cellulose' in the options is not an enzyme at all.",
        },
        {
          title: "Only pepsin needs acid",
          body: "Of the common digestive enzymes, **pepsin** alone works in acid. **Trypsin** and **amylase** work in a neutral to alkaline medium, so they are the pair that do not work at acidic pH.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-gut",
      name: "The gut: bile, villi and teeth",
      intuition:
        "The food tube runs from the mouth to the anus, and most digestion and absorption happen in the small intestine, its longest part. The liver pours in bile, which has no enzymes but breaks fat into tiny drops and makes the food alkaline, so the pancreas's enzymes can work. The wall of the small intestine is covered in tiny finger-like villi that give it a huge surface for absorbing food.",
      definition:
        "Parts of the alimentary canal and helpers:\n" +
        "- Order: mouth, oesophagus, stomach, **small intestine**, large intestine, rectum, anus.\n" +
        "- The **small intestine** is the **longest** part, about **7.5 m**; the large intestine is about 1.5 m.\n" +
        "- **Villi**: finger-like projections of the small intestine lining that increase the area for **absorption**; each has blood capillaries.\n" +
        "- **Liver**: the largest gland; makes **bile**, stored in the **gall bladder**. Bile has **no enzymes**. It **emulsifies fats** (breaks them into small drops) and **neutralises the acid** from the stomach, making the medium alkaline for pancreatic enzymes.\n" +
        "- **Tooth enamel**: the hardest substance in the body, made mainly of **calcium phosphate** (hydroxyapatite).",
      table: {
        columns: ["Part", "Key fact"],
        rows: [
          {
            cells: ["Small intestine", "The longest part of the gut"],
            noteAmber: "CDS 2022 (II): of the stomach, small intestine, large intestine and rectum, the small intestine is longest.",
            pyqExampleId: "fde78dc9-c1d4-454f-9574-7a0a042b4d81",
          },
          {
            cells: ["Villi", "Finger-like projections that absorb digested food"],
            noteAmber: "CDS 2025 (II): the finger-like projections of the small intestine are villi.",
            pyqExampleId: "ca62f86f-8e4b-4f2a-8108-85dc6eb58ebf",
          },
          { cells: ["Bile", "No enzymes; emulsifies fat and makes the medium alkaline"] },
          { cells: ["Gall bladder", "Stores bile"] },
          {
            cells: ["Tooth enamel", "Calcium phosphate; the hardest substance in the body"],
            noteAmber: "CDS 2025 (II): enamel is made of calcium phosphate.",
            pyqExampleId: "8db881a5-b36c-4b41-915d-869074d84e2f",
          },
        ],
      },
      pyqExampleId: "877b9723-1523-43b6-9a3f-321a5ae0b537",
      selfCheckExample: {
        prompt: "After the gall bladder is removed, a patient is told to eat less fried and oily food. Why?",
        steps: [
          "The gall bladder stores bile and releases a lot of it when fatty food arrives.",
          "Bile emulsifies fat into tiny drops so lipase can digest it; without the store, less bile is available at once.",
        ],
        answer: "Without stored bile, large amounts of fat are emulsified, and so digested, poorly.",
      },
      practiceSet: [
        { prompt: "Where is bile stored?", answer: "In the gall bladder" },
        { prompt: "What is the hardest substance in the human body?", answer: "Tooth enamel" },
        { prompt: "Which organ makes bile?", answer: "The liver" },
        { prompt: "How long is the human small intestine, roughly?", answer: "About 7.5 m" },
      ],
      traps: [
        {
          title: "Bile has no enzymes",
          body: "Bile helps fat digestion but does not digest anything itself. It **emulsifies** fat and makes the medium **alkaline**; the fat is digested by **lipase** from the pancreas.",
        },
        {
          title: "Enamel is calcium phosphate",
          body: "Enamel is **calcium phosphate**. Lactic acid is what dissolves it in tooth decay, and sodium compounds have nothing to do with its structure.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-deficiency",
      name: "Deficiency diseases",
      intuition:
        "The body needs small amounts of vitamins and minerals, and larger amounts of protein. When one of them is missing for a long time, a particular disease follows, and each nutrient has its own. Most questions simply ask you to match the two, so the table below is worth learning by heart.",
      definition:
        "Nutrients and what their lack causes:\n" +
        "- **Vitamins**: A (night blindness), B1 (beriberi), C (**scurvy**: bleeding gums), D (**rickets** in children: soft, bent bones), K (slow blood clotting).\n" +
        "- **Minerals**: **iron** (**anaemia**), **iodine** (**goitre**), **calcium** (weak bones and teeth), **fluoride** (too little: **tooth decay**, caries; too much: **fluorosis**, with mottled teeth and stiff, bent bones).\n" +
        "- **Potassium** and sodium keep the **water balance** of the body fluids and blood.\n" +
        "- **Protein**: **kwashiorkor** (lack of protein even when calories are enough: swollen belly). **Marasmus**: lack of both protein and energy.",
      table: {
        columns: ["Missing nutrient", "Disease or effect"],
        rows: [
          { cells: ["Vitamin A", "Night blindness"] },
          { cells: ["Vitamin C", "Scurvy"] },
          {
            cells: ["Vitamin D", "Rickets in children"],
            noteAmber: "CDS 2022 (I): rickets comes from a lack of vitamin D.",
            pyqExampleId: "355c5966-8ccf-4439-8f36-406cbf9ca359",
          },
          {
            cells: ["Iron", "Anaemia"],
            noteAmber: "CDS 2022 (II): iron deficiency causes anaemia, not scurvy, rickets or cholera.",
            pyqExampleId: "c8b39ce8-93df-4b7b-8866-2502a69e091c",
          },
          { cells: ["Iodine", "Goitre"] },
          {
            cells: ["Protein", "Kwashiorkor"],
            noteAmber: "CDS 2022 (II): kwashiorkor is caused by a lack of protein.",
            pyqExampleId: "7c0737fc-55b0-418c-bfd1-b78e532b261b",
          },
          {
            cells: ["Fluoride", "Tooth decay (dental caries)"],
            noteAmber: "CDS 2016 (II): too little fluoride gives caries; mottled teeth and bent bones come from too much.",
            pyqExampleId: "9950554a-c79a-401d-9fbc-8864cf071f93",
          },
        ],
      },
      pyqExampleId: "355c5966-8ccf-4439-8f36-406cbf9ca359",
      selfCheckExample: {
        prompt: "A village draws water from a well very rich in fluoride. What would you expect to see in the teeth and bones of people who drink it for years?",
        steps: [
          "Too little fluoride causes tooth decay; too much causes fluorosis.",
          "Fluorosis shows as mottled, stained teeth and, after many years, stiff joints and bent bones.",
        ],
        answer: "Fluorosis: mottled teeth and, later, stiff and deformed bones.",
      },
      practiceSet: [
        { prompt: "Lack of which vitamin causes scurvy?", answer: "Vitamin C" },
        { prompt: "Which disease is caused by a lack of iodine?", answer: "Goitre" },
        { prompt: "Lack of which vitamin causes night blindness?", answer: "Vitamin A" },
        { prompt: "Which disease comes from a lack of both protein and energy (calories)?", answer: "Marasmus" },
      ],
      traps: [
        {
          title: "Fluoride: too little against too much",
          body: "A **deficiency** of fluoride causes **tooth caries**. **Mottled teeth**, bent bones and stiff joints are signs of **excess** fluoride (fluorosis).",
        },
        {
          title: "Kwashiorkor is protein, marasmus is protein plus energy",
          body: "**Kwashiorkor** comes from too little **protein** even when calories are enough. **Marasmus** is a lack of both. Minerals, vitamins and fats are not the cause of either.",
        },
        {
          title: "Rickets is D, scurvy is C",
          body: "Vitamin **D** lets the body absorb calcium for bones, so its lack gives **rickets**. Vitamin **C** keeps gums and skin healthy, so its lack gives **scurvy**.",
        },
      ],
    },
  ],
};
