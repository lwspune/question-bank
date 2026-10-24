import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_EXCRETION_NOTE: SubtopicNote = {
  subtopicName: "Excretion and Reproductive Organs",
  title: "Excretion and Reproductive Organs",
  oneLineDefinition:
    "Where urea comes from, how the kidneys, ureters, bladder and urethra get rid of it, and what each organ of the male reproductive system does.",
  whyItMatters:
    "Six CDS questions from 2017 (II) to 2025 (II). Four are about urea and urine: where urea is made, from which food, why spilled urine smells, and the path urine takes. Two are about the male reproductive organs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-urea",
      name: "Urea, the kidneys and the path of urine",
      intuition:
        "When the body breaks down extra protein, the nitrogen part comes off as ammonia, which is poisonous. The liver quickly turns it into urea, which is much safer. The blood carries the urea to the kidneys, which filter it out with water to make urine. Urine then runs down to the bladder, is stored, and leaves the body through the urethra.",
      definition:
        "Excretion of urea:\n" +
        "- **Urea** is made in the **liver**, from the ammonia released when **amino acids** (from **proteins**) are broken down. Carbohydrates and fats have no nitrogen, so they make no urea.\n" +
        "- The **kidneys** filter urea, salts and extra water out of the blood. Each kidney has about a million filtering units called **nephrons**.\n" +
        "- Path of urine: **kidney → ureter → urinary bladder → urethra**.\n" +
        "- Fresh urine hardly smells. Spilled urine smells sharp because **bacteria break urea down into ammonia**.\n" +
        "- When both kidneys fail, the blood is cleaned by a machine: **haemodialysis**.",
      table: {
        columns: ["Organ", "Its part in removing urea"],
        rows: [
          {
            cells: ["Liver", "Makes urea from the ammonia of broken-down proteins"],
            noteAmber: "Asked twice: CDS 2019 (I) (urea is produced in the liver) and 2022 (II) (from proteins).",
            pyqExampleId: "752ae66f-284e-4c50-a456-cfec642e8ea9",
          },
          { cells: ["Kidney", "Filters urea and water from the blood to make urine"] },
          { cells: ["Ureter", "Carries urine from the kidney to the bladder"] },
          { cells: ["Urinary bladder", "Stores urine"] },
          { cells: ["Urethra", "Carries urine out of the body"] },
          {
            cells: ["Bacteria on the floor", "Break urea into ammonia, the smell of stale urine"],
            noteAmber: "CDS 2017 (II): the smell is from bacteria turning urea into ammonia.",
            pyqExampleId: "d8a6e088-9652-498e-99f7-2b774ba551d8",
          },
        ],
      },
      pyqExampleId: "7280e13e-8af6-40b6-9fab-3f4ba1714a05",
      selfCheckExample: {
        prompt: "A bodybuilder eats a diet very high in protein. Which waste will rise in his urine, and which organ makes it?",
        steps: [
          "Extra protein is broken down to amino acids, and their nitrogen is removed as ammonia.",
          "The liver turns the ammonia into urea, which the kidneys pass out in urine.",
        ],
        answer: "Urea, made in the liver.",
      },
      practiceSet: [
        { prompt: "What are the filtering units of the kidney called?", answer: "Nephrons" },
        { prompt: "From which class of food does urea come?", answer: "Proteins" },
        { prompt: "What is the cleaning of blood by a machine, when the kidneys fail, called?", answer: "Haemodialysis" },
        { prompt: "Which gas gives stale urine its sharp smell?", answer: "Ammonia" },
      ],
      traps: [
        {
          title: "Urea is made in the liver, not the kidney",
          body: "The kidneys **remove** urea; the **liver** **makes** it. Blood, lungs and the digestion of starch have nothing to do with making urea.",
        },
        {
          title: "Ureter before bladder, urethra after",
          body: "The **ureters** lead from the kidneys to the **bladder**; the **urethra** leads from the bladder out. The two names are close, so check which tube is on which side of the bladder.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-male",
      name: "The male reproductive organs",
      intuition:
        "Sperm are made in the testes, which hang outside the body in the scrotum because sperm form best a little below body temperature. From there sperm move to the epididymis to mature, then along the vas deferens. On the way, the seminal vesicles and the prostate add a fluid that feeds the sperm and lets them swim. The cervix, by contrast, is the neck of the womb in a woman.",
      definition:
        "The male system:\n" +
        "- **Testes** (in the **scrotum**): make **sperm** (in the seminiferous tubules) and the hormone **testosterone**.\n" +
        "- **Epididymis**: stores the sperm while they **mature**.\n" +
        "- **Vas deferens**: carries sperm towards the urethra.\n" +
        "- **Seminal vesicles** and **prostate gland**: add fluid that nourishes the sperm and makes them **motile** (able to swim). Sperm plus this fluid is semen.\n" +
        "- **Urethra**: common passage for urine and semen.\n\n" +
        "The female system: **ovaries**, **oviducts** (fallopian tubes), **uterus**, **cervix** (the neck of the uterus) and vagina.",
      table: {
        columns: ["Male organ", "What it does"],
        rows: [
          { cells: ["Testis", "Makes sperm and testosterone"] },
          { cells: ["Scrotum", "Keeps the testes a little cooler than the body"] },
          {
            cells: ["Epididymis", "Stores sperm while they mature"],
            noteAmber: "CDS 2018 (II): epididymis, vas deferens, seminal vesicles and prostate together serve maturation and motility, not spermatogenesis.",
            pyqExampleId: "61d2897b-f6ed-40e7-b81a-8ffea572e36c",
          },
          { cells: ["Vas deferens", "Carries sperm towards the urethra"] },
          { cells: ["Seminal vesicles and prostate", "Add fluid that feeds the sperm and lets them swim"] },
        ],
      },
      pyqExampleId: "dbf5a0f9-8c57-4bc8-aebc-c0c30d4f88b9",
      selfCheckExample: {
        prompt: "In a vasectomy, the vas deferens on each side is cut and tied. Why does this stop a man from fathering a child, though the testes still work?",
        steps: [
          "Sperm are still made in the testes and stored in the epididymis.",
          "But the vas deferens is the only path from there to the urethra, so with it blocked no sperm leave the body.",
        ],
        answer: "Sperm can no longer travel out, because their only route, the vas deferens, is blocked.",
      },
      practiceSet: [
        { prompt: "In which organ are sperm made?", answer: "The testis" },
        { prompt: "Which hormone do the testes make?", answer: "Testosterone" },
        { prompt: "Why do the testes lie in the scrotum, outside the body cavity?", answer: "Sperm form best at a temperature a little below body temperature" },
        { prompt: "Which tube is the common passage for urine and semen in a man?", answer: "The urethra" },
      ],
      traps: [
        {
          title: "Sperm are made only in the testis",
          body: "The epididymis, vas deferens, seminal vesicles and prostate **mature, carry and activate** sperm. **Spermatogenesis** itself happens in the **testis**, so any option that gives it to the other organs is wrong.",
        },
        {
          title: "The cervix is female",
          body: "The **cervix** is the narrow neck of the **uterus**. The testis, scrotum and prostate are male.",
        },
      ],
    },
  ],
};
