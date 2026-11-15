import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_CC_ADRENAL_NOTE: SubtopicNote = {
  subtopicName: "Adrenal, Pancreas and Gonads",
  title: "Adrenal, Pancreas and Gonads",
  oneLineDefinition:
    "The hormones of the adrenal medulla and the three zones of the adrenal cortex, the alpha and beta cells of the pancreatic islets, and the sex hormones of the testis and ovary.",
  whyItMatters:
    "Five NEET questions from 2024 to 2026. The adrenal medulla was asked as pick-the-correct-statements in NEET 2025, and cortisol and aldosterone in a match-the-columns in NEET 2026. Re-NEET 2026 asked which pancreatic cell makes insulin, and NEET 2025 matched progesterone with the corpus luteum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzocc-adrenal",
      name: "The adrenal medulla and the adrenal cortex",
      intuition:
        "Each adrenal gland is two glands in one. The inner medulla is the emergency gland: in danger it floods the blood with adrenaline, so the heart pounds, the pupils widen and sugar pours into the blood. The outer cortex works slowly and steadily: it controls sugar, salt and water, and calms inflammation.",
      definition:
        "Position and parts:\n" +
        "- One pair of adrenal glands, **one at the anterior part of each kidney**.\n" +
        "- Two tissues: the centrally placed **adrenal medulla** and, outside it, the **adrenal cortex**.\n\n" +
        "Adrenal medulla:\n" +
        "- Secretes **adrenaline (epinephrine)** and **noradrenaline (norepinephrine)**, together called **catecholamines**.\n" +
        "- They are released fast in any stress or emergency, so they are called **emergency hormones** or hormones of **fight or flight**.\n" +
        "- They increase alertness, **pupillary dilation**, **piloerection** (raising of hairs) and sweating. They increase the **heart beat**, the **strength of heart contraction** and the **rate of respiration**.\n" +
        "- They stimulate the **breakdown of glycogen**, raising blood glucose, and the breakdown of lipids and proteins.\n\n" +
        "Adrenal cortex:\n" +
        "- Three layers, from inside out: **zona reticularis** (inner), **zona fasciculata** (middle), **zona glomerulosa** (outer). Its hormones are the **corticoids**.\n" +
        "- **Glucocorticoids** handle carbohydrate metabolism. They stimulate **gluconeogenesis, lipolysis and proteolysis**, and inhibit cellular uptake and use of amino acids. **Cortisol** also maintains the cardiovascular system and kidney functions, produces **anti-inflammatory reactions**, **suppresses the immune response** and stimulates **RBC production**.\n" +
        "- **Mineralocorticoids** regulate water and electrolytes. The main one, **aldosterone**, acts mainly at the **renal tubules**: it stimulates reabsorption of **Na⁺ and water** and excretion of **K⁺ and phosphate**. This maintains electrolytes, body fluid volume, osmotic pressure and blood pressure.\n" +
        "- Small amounts of **androgenic steroids** help grow axial, pubic and facial hair at puberty.",
      table: {
        columns: ["Part", "Hormone", "Main actions"],
        rows: [
          { cells: ["Adrenal medulla", "Adrenaline and noradrenaline (catecholamines)", "Fight or flight: pupils dilate, piloerection, sweating, stronger and faster heart, faster breathing, more blood glucose"] },
          {
            cells: ["Adrenal cortex", "Cortisol (a glucocorticoid)", "Gluconeogenesis, lipolysis, proteolysis; anti-inflammatory; suppresses immunity; stimulates RBC production"],
            noteAmber: "NEET 2026: cortisol matched with anti-inflammatory reactions, and aldosterone with Na⁺ and water reabsorption.",
            pyqExampleId: "119bc767-1c19-44e3-bbfe-9ee9e53d5913",
          },
          { cells: ["Adrenal cortex", "Aldosterone (the main mineralocorticoid)", "Renal tubules reabsorb Na⁺ and water, excrete K⁺ and phosphate; keeps blood pressure and fluid volume"] },
          { cells: ["Adrenal cortex", "Androgenic steroids, small amounts", "Axial, pubic and facial hair at puberty"] },
        ],
      },
      pyqExampleId: "d70b4e7b-2935-499b-9066-5a789d2563c3",
      selfCheckExample: {
        prompt: "Name the three layers of the adrenal cortex, from the innermost to the outermost.",
        steps: [
          "The innermost layer is the zona reticularis.",
          "The middle layer is the zona fasciculata, and the outer layer is the zona glomerulosa.",
        ],
        answer: "Zona reticularis, zona fasciculata, zona glomerulosa.",
      },
      practiceSet: [
        { prompt: "Where does each adrenal gland sit?", answer: "At the anterior part of each kidney" },
        { prompt: "Which ions does aldosterone make the renal tubules excrete?", answer: "K⁺ and phosphate ions" },
        { prompt: "Which adrenal cortex hormone suppresses the immune response and produces anti-inflammatory reactions?", answer: "Cortisol (a glucocorticoid)" },
        { prompt: "What is the common name for adrenaline and noradrenaline?", answer: "Catecholamines" },
        { prompt: "What role do the small amounts of adrenal androgens play at puberty?", answer: "Growth of axial, pubic and facial hair" },
      ],
      traps: [
        {
          title: "Adrenaline dilates the pupils",
          body: "The catecholamines cause **pupillary dilation**, not constriction. They also cause **piloerection** and **raise blood glucose** by breaking down glycogen.",
        },
        {
          title: "Aldosterone is from the cortex, catecholamines from the medulla",
          body: "**Aldosterone** and **cortisol** are corticoids of the **adrenal cortex**. **Adrenaline and noradrenaline** come from the **medulla**. A pairing of aldosterone with the medulla is false.",
        },
        {
          title: "Aldosterone keeps sodium and loses potassium",
          body: "Aldosterone makes the tubules **reabsorb Na⁺ and water** and **excrete K⁺ and phosphate**. Swapping sodium and potassium is the false version.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-pancreas",
      name: "The pancreas: insulin and glucagon",
      intuition:
        "The pancreas makes digestive juice, but scattered through it are tiny islands of hormone cells. Two kinds matter. The alpha cells make glucagon, which pushes blood sugar up. The beta cells make insulin, which pulls it down. Together they hold blood glucose steady.",
      definition:
        "- The pancreas is a **composite gland**: both **exocrine** and **endocrine**.\n" +
        "- The endocrine part is the **islets of Langerhans**: about **1 to 2 million** islets in a normal human pancreas, only **1 to 2 per cent** of the pancreatic tissue.\n" +
        "- Two main islet cells: **α-cells secrete glucagon**, **β-cells secrete insulin**.\n\n" +
        "Glucagon:\n" +
        "- A **peptide** hormone. It acts mainly on liver cells (**hepatocytes**) and stimulates **glycogenolysis**, raising blood sugar (**hyperglycaemia**). It also stimulates **gluconeogenesis** and reduces cellular glucose uptake and use. So it is a **hyperglycaemic** hormone.\n\n" +
        "Insulin:\n" +
        "- A **peptide** hormone central to **glucose homeostasis**. It acts mainly on **hepatocytes and adipocytes** (fat cells), enhancing cellular glucose uptake and use. Glucose moves fast from the blood into these cells, so blood glucose falls (**hypoglycaemia**).\n" +
        "- It also stimulates the conversion of glucose to glycogen (**glycogenesis**) in its target cells.\n" +
        "- Glucose homeostasis is kept **jointly by insulin and glucagon**.\n\n" +
        "Diabetes mellitus:\n" +
        "- **Prolonged hyperglycaemia** leads to **diabetes mellitus**, with loss of glucose through the urine and formation of harmful **ketone bodies**. It is treated with **insulin therapy**.",
      table: {
        columns: ["Islet cell", "Hormone", "Target", "Effect on blood glucose"],
        rows: [
          {
            cells: ["α-cell", "Glucagon (peptide)", "Mainly hepatocytes", "Raises it: glycogenolysis and gluconeogenesis (hyperglycaemia)"],
            noteAmber: "Re-NEET 2024: glucagon matched with hyperglycaemia, epinephrine with emergency, thyroxine with BMR and oxytocin with smooth muscle contraction.",
            pyqExampleId: "562913f4-3a46-43f9-a18f-281ee60a4ac1",
          },
          { cells: ["β-cell", "Insulin (peptide)", "Hepatocytes and adipocytes", "Lowers it: glucose uptake and glycogenesis (hypoglycaemia)"] },
        ],
      },
      pyqExampleId: "9b5a657a-631c-465f-b731-a83bf7fb4319",
      selfCheckExample: {
        prompt: "About how many islets of Langerhans does a normal human pancreas have, and what share of the pancreatic tissue are they?",
        steps: [
          "NCERT gives about 1 to 2 million islets.",
          "They make up only 1 to 2 per cent of the pancreatic tissue.",
        ],
        answer: "About 1 to 2 million islets, only 1 to 2 per cent of the tissue.",
      },
      practiceSet: [
        { prompt: "Why is the pancreas called a composite gland?", answer: "Because it acts as both an exocrine and an endocrine gland" },
        { prompt: "Which two kinds of cells are the main targets of insulin?", answer: "Hepatocytes (liver cells) and adipocytes (fat cells)" },
        { prompt: "What is the conversion of glucose to glycogen, stimulated by insulin, called?", answer: "Glycogenesis" },
        { prompt: "Besides glycogenolysis, which other process that raises blood glucose does glucagon stimulate?", answer: "Gluconeogenesis" },
        { prompt: "How are diabetic patients treated, according to NCERT?", answer: "With insulin therapy" },
      ],
      traps: [
        {
          title: "Alpha makes glucagon, beta makes insulin",
          body: "**α-cells** secrete **glucagon**; **β-cells** secrete **insulin**. A statement that α-cells secrete insulin is the false one.",
        },
        {
          title: "Insulin is hypoglycaemic, glucagon hyperglycaemic",
          body: "**Insulin lowers** blood glucose by moving it into cells and storing it as glycogen. **Glucagon raises** it by glycogenolysis and gluconeogenesis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-gonads",
      name: "The testis and the ovary",
      intuition:
        "The testis and the ovary make sperm and eggs, and they are also endocrine glands. The testis makes androgens, the male hormones. The ovary makes estrogen while a follicle grows, and after ovulation the empty follicle turns into the corpus luteum, which makes progesterone to support pregnancy.",
      definition:
        "Testis:\n" +
        "- A pair in the **scrotal sac**: a primary sex organ and an endocrine gland, made of **seminiferous tubules** and stromal or interstitial tissue.\n" +
        "- The **Leydig cells (interstitial cells)** in the spaces between the tubules make **androgens**, mainly **testosterone**.\n" +
        "- Androgens regulate the development, maturation and functions of the male accessory sex organs (**epididymis, vas deferens, seminal vesicles, prostate gland, urethra**).\n" +
        "- They stimulate muscular growth, facial and axillary hair, aggressiveness and a **low-pitched voice**; play a major stimulatory role in **spermatogenesis**; act on the CNS and influence male sexual behaviour (**libido**); and have **anabolic** effects on protein and carbohydrate metabolism.\n\n" +
        "Ovary:\n" +
        "- A pair in the abdomen. It makes **one ovum** in each menstrual cycle and two groups of **steroid** hormones, **estrogen and progesterone**. It is made of ovarian follicles and stromal tissue.\n" +
        "- **Estrogen** is made mainly by the **growing ovarian follicles**. It stimulates the growth and activity of female secondary sex organs, the development of growing follicles, female secondary sex characters (such as a **high-pitched voice**), mammary gland development, and female sexual behaviour.\n" +
        "- After ovulation the ruptured follicle becomes the **corpus luteum**, which secretes mainly **progesterone**. Progesterone **supports pregnancy**, and acts on the mammary glands to form the **alveoli** (sacs that store milk) and to secrete milk.\n" +
        "- **Relaxin** is a further hormone the **ovary** secretes in the **later phase of pregnancy** (taught in Human Reproduction, Class XII).",
      table: {
        columns: ["Source", "Hormone", "Main actions"],
        rows: [
          { cells: ["Leydig (interstitial) cells of the testis", "Androgens, mainly testosterone", "Male accessory organs, secondary sex characters, spermatogenesis, libido, anabolic effects"] },
          { cells: ["Growing ovarian follicles", "Estrogen", "Female secondary sex organs and characters, follicle growth, mammary gland development"] },
          { cells: ["Corpus luteum", "Progesterone", "Supports pregnancy; forms mammary alveoli and milk secretion"] },
          { cells: ["Ovary, later phase of pregnancy", "Relaxin", "Secreted during the later phase of pregnancy"] },
        ],
      },
      pyqExampleId: "4a5b8d08-10fa-4a87-bf79-03f1c8aa7c5b",
      selfCheckExample: {
        prompt: "Which cells of the testis make androgens, and where exactly do they lie?",
        steps: [
          "The testis is made of seminiferous tubules and interstitial tissue.",
          "The Leydig cells, also called interstitial cells, lie in the spaces between the tubules and make the androgens.",
        ],
        answer: "The Leydig (interstitial) cells, in the intertubular spaces.",
      },
      practiceSet: [
        { prompt: "Which ovarian structures mainly make estrogen?", answer: "The growing ovarian follicles" },
        { prompt: "On the mammary glands, which structures does progesterone stimulate to form?", answer: "The alveoli, sac-like structures that store milk" },
        { prompt: "Name three male accessory sex organs whose functions androgens regulate.", answer: "Any three of: epididymis, vas deferens, seminal vesicles, prostate gland, urethra" },
        { prompt: "Which hormone influences male sexual behaviour (libido) by acting on the central nervous system?", answer: "Androgens (mainly testosterone)" },
        { prompt: "Are estrogen and progesterone peptide or steroid hormones?", answer: "Steroid hormones" },
      ],
      traps: [
        {
          title: "Progesterone comes from the corpus luteum",
          body: "**Estrogen** is made mainly by the **growing follicles**; **progesterone** mainly by the **corpus luteum** formed after ovulation. Swapping the two sources is the common mistake.",
        },
        {
          title: "Low voice is androgen, high voice is estrogen",
          body: "**Androgens** give the **low pitch** of the male voice; **estrogen** gives the **high pitch** of the female voice.",
        },
      ],
    },
  ],
};
