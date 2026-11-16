import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_CC_ACTION_NOTE: SubtopicNote = {
  subtopicName: "Other Organs and Hormone Action",
  title: "Other Organs and Hormone Action",
  oneLineDefinition:
    "The hormones made by the heart, the kidney and the gut, which are not endocrine glands, and how hormones act on their target cells through receptors, sorted by their chemical nature.",
  whyItMatters:
    "Five NEET questions from 2021 to 2025. Erythropoietin from the juxtaglomerular cells of the kidney was asked three times (NEET 2021, Re-NEET 2024 and NEET 2025), and ANF from the heart three times too (NEET 2023, Re-NEET 2024 and NEET 2025). NEET 2024 asked which hormone is not a steroid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzocc-heart-kidney",
      name: "Hormones of the heart and the kidney",
      intuition:
        "Some organs that are not endocrine glands still make hormones. The heart watches blood pressure: when it rises, the atria release a hormone that widens the blood vessels. The kidney watches the blood too, and its hormone tells the bone marrow to make more red blood cells.",
      definition:
        "- Besides the endocrine glands, the **GI tract, liver, kidney and heart** also produce hormones.\n" +
        "- **Heart:** the **atrial wall** secretes a peptide hormone, **atrial natriuretic factor (ANF)**, which **decreases blood pressure**. When blood pressure rises, ANF is secreted and causes **dilation of the blood vessels**, which lowers the pressure.\n" +
        "- **Kidney:** the **juxtaglomerular (JG) cells** produce a peptide hormone, **erythropoietin**, which stimulates **erythropoiesis** (formation of RBCs).\n" +
        "- Several other non-endocrine tissues secrete hormones called **growth factors**. They are essential for the normal growth of tissues and for their repair and regeneration.",
      table: {
        columns: ["Organ", "Cells", "Hormone", "Action"],
        rows: [
          { cells: ["Heart", "Atrial wall", "Atrial natriuretic factor (ANF), a peptide", "Dilates blood vessels, so blood pressure falls"] },
          {
            cells: ["Kidney", "Juxtaglomerular cells", "Erythropoietin, a peptide", "Stimulates erythropoiesis (RBC formation)"],
            noteAmber: "NEET 2025: heart matched with ANF, kidney with erythropoietin, the GI tract with secretin and the adrenal cortex with aldosterone.",
            pyqExampleId: "076899ee-6b61-4f1e-8e67-b06f557582bb",
          },
          { cells: ["Several non-endocrine tissues", "Various", "Growth factors", "Normal growth of tissues, and their repair and regeneration"] },
        ],
      },
      pyqExampleId: "1865f8e5-f67c-4e38-b5a4-82a87227bdee",
      selfCheckExample: {
        prompt: "Name the four organs, other than the endocrine glands, that NCERT says also produce hormones.",
        steps: [
          "NCERT lists the endocrine glands first: pituitary, pineal, thyroid, adrenal, pancreas, parathyroid, thymus and gonads.",
          "It then adds four other organs that also make hormones.",
        ],
        answer: "The gastrointestinal tract, liver, kidney and heart.",
      },
      practiceSet: [
        { prompt: "Which part of the heart secretes atrial natriuretic factor?", answer: "The atrial wall" },
        { prompt: "How does ANF lower a raised blood pressure?", answer: "It causes dilation of the blood vessels" },
        { prompt: "Is erythropoietin a peptide or a steroid hormone?", answer: "A peptide hormone" },
        { prompt: "What is erythropoiesis?", answer: "The formation of red blood cells (RBCs)" },
        { prompt: "What do the growth factors secreted by non-endocrine tissues do?", answer: "They are essential for normal growth of tissues and for their repair and regeneration" },
      ],
      traps: [
        {
          title: "ANF comes from the atria, not the testes",
          body: "**ANF** is a peptide secreted by the **atrial wall of the heart**. A statement putting its source in the **seminiferous tubules** or any other organ is false.",
        },
        {
          title: "The bone marrow is the target, not the source",
          body: "**Erythropoietin** is made by the **juxtaglomerular cells of the kidney**. The bone marrow forms the RBCs it stimulates; it does not make the hormone.",
        },
        {
          title: "ANF lowers blood pressure",
          body: "ANF **decreases** blood pressure by dilating vessels. It does not raise it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-gut",
      name: "Hormones of the gastrointestinal tract",
      intuition:
        "Digestion needs good timing. When food arrives, endocrine cells in the walls of the gut release small peptide hormones that switch on the right juices at the right place: acid in the stomach, bicarbonate and enzymes from the pancreas, bile from the gall bladder. One of them slows the stomach down.",
      definition:
        "- Endocrine cells in different parts of the **gastrointestinal tract** secrete **four major peptide hormones**: **gastrin, secretin, cholecystokinin (CCK) and gastric inhibitory peptide (GIP)**.\n" +
        "- **Gastrin** acts on the **gastric glands** and stimulates the secretion of **hydrochloric acid and pepsinogen**.\n" +
        "- **Secretin** acts on the **exocrine pancreas** and stimulates the secretion of **water and bicarbonate ions**.\n" +
        "- **CCK** acts on **both the pancreas and the gall bladder**, and stimulates the secretion of **pancreatic enzymes** and **bile juice** respectively.\n" +
        "- **GIP** **inhibits gastric secretion and motility**.",
      table: {
        columns: ["Hormone", "Acts on", "Effect"],
        rows: [
          {
            cells: ["Gastrin", "Gastric glands", "Secretion of hydrochloric acid and pepsinogen"],
            noteAmber: "Re-NEET 2024: gastrin acting on the intestinal wall was a wrong statement; it acts on the gastric glands.",
            pyqExampleId: "4f2be8ae-e174-41ef-9a10-036fc8787dd6",
          },
          { cells: ["Secretin", "Exocrine pancreas", "Secretion of water and bicarbonate ions"] },
          { cells: ["Cholecystokinin (CCK)", "Pancreas and gall bladder", "Pancreatic enzymes and bile juice"] },
          { cells: ["Gastric inhibitory peptide (GIP)", "Stomach (gastric glands)", "Inhibits gastric secretion and motility"] },
        ],
      },
      pyqExampleId: "cec70fdb-7fef-4779-a59f-3e7caa14d40c",
      selfCheckExample: {
        prompt: "Which gut hormone makes the exocrine pancreas release water and bicarbonate ions?",
        steps: [
          "Of the four gut hormones, two act on the pancreas: secretin and CCK.",
          "CCK brings out the pancreatic enzymes; secretin brings out water and bicarbonate ions.",
        ],
        answer: "Secretin.",
      },
      practiceSet: [
        { prompt: "Name the four major peptide hormones of the gastrointestinal tract.", answer: "Gastrin, secretin, cholecystokinin (CCK) and gastric inhibitory peptide (GIP)" },
        { prompt: "Which two secretions of the gastric glands does gastrin stimulate?", answer: "Hydrochloric acid and pepsinogen" },
        { prompt: "What does CCK make the gall bladder secrete?", answer: "Bile juice" },
        { prompt: "Which cells make the hormones of the gastrointestinal tract?", answer: "Endocrine cells present in different parts of the gastrointestinal tract" },
        { prompt: "Are the four major gut hormones peptides or steroids?", answer: "Peptides" },
      ],
      traps: [
        {
          title: "Gastrin works on the gastric glands",
          body: "**Gastrin** acts on the **gastric glands** to release **HCl and pepsinogen**. It does not act on the intestinal wall.",
        },
        {
          title: "CCK has two targets",
          body: "**CCK** acts on **both the pancreas** (enzymes) **and the gall bladder** (bile). **Secretin** acts on the pancreas for water and bicarbonate, not enzymes.",
        },
        {
          title: "GIP slows the stomach",
          body: "**GIP inhibits** gastric secretion and motility. It is not a stimulator of acid, which is gastrin's job.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-mechanism",
      name: "How hormones act, and their chemical groups",
      intuition:
        "A hormone travels everywhere in the blood, yet only its target cells respond. The reason is the receptor: a protein that fits one hormone only, found only in the target tissue. A water-loving peptide hormone stays outside and sends a second messenger in. A fat-soluble steroid slips inside and works on the genes directly.",
      definition:
        "Receptors:\n" +
        "- Hormones act by binding to specific proteins, the **hormone receptors**, found **in the target tissues only**.\n" +
        "- Receptors on the cell membrane are **membrane-bound receptors**. Receptors inside the cell are **intracellular receptors**, mostly **nuclear receptors**.\n" +
        "- Binding forms a **hormone-receptor complex**, which causes biochemical changes in the target tissue. Each receptor is **specific to one hormone only**.\n\n" +
        "Two ways of acting:\n" +
        "- Hormones that bind **membrane-bound receptors** normally **do not enter** the target cell. They generate **second messengers** (such as **cyclic AMP, IP₃ and Ca²⁺**), which regulate cell metabolism. NCERT draws a **protein hormone** acting this way.\n" +
        "- Hormones that bind **intracellular receptors** (such as **steroid hormones and iodothyronines**) mostly regulate **gene expression** or chromosome function, through the hormone-receptor complex acting on the genome.\n\n" +
        "Chemical groups:\n" +
        "- **Peptide, polypeptide and protein hormones:** insulin, glucagon, pituitary hormones, hypothalamic hormones.\n" +
        "- **Steroids:** cortisol, testosterone, estradiol, progesterone.\n" +
        "- **Iodothyronines:** the thyroid hormones.\n" +
        "- **Amino-acid derivatives:** epinephrine.",
      table: {
        columns: ["Chemical group", "NCERT examples"],
        rows: [
          { cells: ["Peptide, polypeptide and protein", "Insulin, glucagon, pituitary hormones, hypothalamic hormones"] },
          { cells: ["Steroids", "Cortisol, testosterone, estradiol, progesterone"] },
          { cells: ["Iodothyronines", "Thyroid hormones (T3 and T4)"] },
          { cells: ["Amino-acid derivatives", "Epinephrine"] },
        ],
      },
      pyqExampleId: "2cd73e9f-111e-4532-885a-9fa321a99ec3",
      selfCheckExample: {
        prompt: "A hormone reaches every cell through the blood. Why does it act only on its target tissue?",
        steps: [
          "A hormone acts by binding to its receptor, and receptors are found in the target tissues only.",
          "Each receptor is specific to one hormone, so other cells have nothing for it to bind.",
        ],
        answer: "Because its specific receptors are present only in the target tissue.",
      },
      practiceSet: [
        { prompt: "Name three second messengers that hormones on membrane-bound receptors generate.", answer: "Cyclic AMP, IP₃ and Ca²⁺" },
        { prompt: "Where are most intracellular hormone receptors found?", answer: "In the nucleus (nuclear receptors)" },
        { prompt: "What do hormones acting through intracellular receptors mostly regulate?", answer: "Gene expression or chromosome function" },
        { prompt: "To which chemical group do the thyroid hormones belong?", answer: "Iodothyronines" },
        { prompt: "To which chemical group does epinephrine belong?", answer: "Amino-acid derivatives" },
      ],
      traps: [
        {
          title: "Membrane-receptor hormones stay outside",
          body: "A hormone on a **membrane-bound receptor** normally **does not enter** the cell; a **second messenger** carries the signal in. It is the **steroids and iodothyronines** that work on receptors inside the cell.",
        },
        {
          title: "Thyroid hormones are not steroids or peptides",
          body: "T3 and T4 are **iodothyronines**, a group of their own. (The thyroid's **thyrocalcitonin** is a protein, so the thyroid makes two kinds.)",
        },
        {
          title: "Pancreatic hormones are peptides",
          body: "**Insulin** and **glucagon** are **peptide** hormones. The NCERT steroids are **cortisol, testosterone, estradiol and progesterone**.",
        },
      ],
    },
  ],
};
