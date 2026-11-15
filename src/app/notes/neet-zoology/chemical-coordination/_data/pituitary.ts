import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_CC_PITUITARY_NOTE: SubtopicNote = {
  subtopicName: "Pituitary, Thyroid and Parathyroid",
  title: "Pituitary, Thyroid and Parathyroid",
  oneLineDefinition:
    "What a hormone is, how the hypothalamus controls the pituitary, the hormones of each part of the pituitary, the pineal, thyroid, parathyroid and thymus, and the disorders NCERT names when a hormone is too high or too low.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. The pituitary was asked three times (NEET 2025 and twice in Re-NEET 2026), the thyroid twice (NEET 2023 and NEET 2024) and the parathyroid once (NEET 2022). NEET 2024 set four hormone disorders as a match-the-columns.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzocc-hypothalamus",
      name: "Hormones, the hypothalamus and the posterior pituitary",
      intuition:
        "The nerves cannot reach every cell, and many body jobs need steady control. So ductless glands send chemical messages, the hormones, through the blood. The master switch sits in the brain: the hypothalamus. It sends hormones to the front part of the pituitary, and it makes two hormones of its own that the back part of the pituitary only stores and lets out.",
      definition:
        "Endocrine glands and hormones:\n" +
        "- Endocrine glands **lack ducts**, so they are called **ductless glands**. Their secretions are **hormones**.\n" +
        "- Classical definition: a hormone is a chemical made by an endocrine gland, released into the blood and carried to a **distantly located target organ**.\n" +
        "- Current definition: hormones are **non-nutrient chemicals** which act as **intercellular messengers** and are produced in **trace amounts**.\n" +
        "- The neural system does not innervate all cells, and cell functions need continuous regulation, so hormones provide this special kind of coordination.\n" +
        "- The human endocrine glands: **pituitary, pineal, thyroid, adrenal, pancreas, parathyroid, thymus and gonads**. The GI tract, liver, kidney and heart also make hormones.\n\n" +
        "The hypothalamus:\n" +
        "- The **basal part of the diencephalon** (forebrain). It has groups of **neurosecretory cells called nuclei** that make hormones.\n" +
        "- **Releasing hormones** stimulate the pituitary; **inhibiting hormones** stop it. Example: **GnRH** stimulates the pituitary to make and release gonadotrophins; **somatostatin** inhibits the release of growth hormone.\n" +
        "- These hormones leave through the axons, reach the pituitary through a **portal circulatory system**, and regulate the **anterior pituitary**.\n" +
        "- The **posterior pituitary** is under the **direct neural regulation** of the hypothalamus.\n\n" +
        "The posterior pituitary (neurohypophysis, **pars nervosa**):\n" +
        "- It **stores and releases** two hormones, **oxytocin** and **vasopressin**. Both are actually **synthesised by the hypothalamus** and carried along axons to it.\n" +
        "- **Oxytocin** acts on smooth muscles and makes them contract. In females it causes vigorous contraction of the **uterus at childbirth** and **milk ejection** from the mammary gland.\n" +
        "- **Vasopressin** acts mainly at the kidney: it makes the **distal tubules** reabsorb water and electrolytes, so less water is lost in urine (diuresis). So it is also called the **anti-diuretic hormone (ADH)**.\n" +
        "- If ADH synthesis or release is impaired, the kidney cannot conserve water, causing water loss and dehydration: **diabetes insipidus**.",
      table: {
        columns: ["Hormone", "Made in", "Released from", "Main action"],
        rows: [
          { cells: ["GnRH (a releasing hormone)", "Hypothalamus", "Hypothalamic nerve endings, to the portal circulation", "Stimulates the pituitary to make and release gonadotrophins"] },
          { cells: ["Somatostatin (an inhibiting hormone)", "Hypothalamus", "Hypothalamic nerve endings, to the portal circulation", "Inhibits the release of growth hormone"] },
          { cells: ["Vasopressin (ADH)", "Hypothalamus", "Posterior pituitary", "Water and electrolyte reabsorption by the distal tubules; less diuresis"] },
          { cells: ["Oxytocin", "Hypothalamus", "Posterior pituitary", "Contracts smooth muscle: uterus at childbirth, milk ejection"] },
        ],
      },
      pyqExampleId: "acd619d1-b654-4c8b-b2dc-9bddce97c9ee",
      selfCheckExample: {
        prompt: "A person cannot make or release enough vasopressin. Name the disorder and say what happens to the water in the body.",
        steps: [
          "Vasopressin (ADH) makes the distal tubules reabsorb water, which cuts the water lost in urine.",
          "Without it the kidney cannot conserve water, so much water is lost and the body dehydrates.",
          "NCERT calls this condition diabetes insipidus.",
        ],
        answer: "Diabetes insipidus: the kidney cannot conserve water, causing water loss and dehydration.",
      },
      practiceSet: [
        { prompt: "Which hypothalamic hormone inhibits the release of growth hormone from the pituitary?", answer: "Somatostatin" },
        { prompt: "How do the releasing hormones of the hypothalamus reach the anterior pituitary?", answer: "Through a portal circulatory system" },
        { prompt: "Which part of the pituitary is under direct neural regulation of the hypothalamus?", answer: "The posterior pituitary (neurohypophysis)" },
        { prompt: "Give the current definition of a hormone.", answer: "Non-nutrient chemicals which act as intercellular messengers and are produced in trace amounts" },
        { prompt: "Name the two actions of oxytocin in a female.", answer: "Vigorous contraction of the uterus at childbirth, and milk ejection from the mammary gland" },
      ],
      traps: [
        {
          title: "The posterior pituitary makes nothing",
          body: "The **pars nervosa stores and releases** oxytocin and vasopressin. Both are **synthesised in the hypothalamus** and carried down axons. A statement that the posterior pituitary synthesises them is false.",
        },
        {
          title: "The portal system serves the anterior lobe",
          body: "Hypothalamic releasing and inhibiting hormones reach the **anterior pituitary** through the **portal circulation**. The **posterior pituitary** is controlled **directly by nerves**, not by these hormones.",
        },
        {
          title: "Diabetes insipidus is about ADH",
          body: "**Diabetes insipidus** comes from impaired **ADH** synthesis or release, so water is lost. **Diabetes mellitus** is a different disorder, of prolonged high blood glucose.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-anterior",
      name: "The anterior pituitary and its hormones",
      intuition:
        "The pituitary is a pea-sized gland hanging below the hypothalamus. Its front part, the adenohypophysis, makes most of its hormones. Six come from the pars distalis, and nearly all of them act on another gland: they tell the thyroid, the adrenal cortex and the gonads when to work. One more, MSH, comes from the pars intermedia.",
      definition:
        "Structure:\n" +
        "- The pituitary sits in a bony cavity, the **sella turcica**, and is attached to the hypothalamus by a **stalk**.\n" +
        "- It is divided anatomically into the **adenohypophysis** and the **neurohypophysis**.\n" +
        "- The adenohypophysis has two parts: the **pars distalis** (commonly called the **anterior pituitary**) and the **pars intermedia**. In humans the pars intermedia is almost merged with the pars distalis.\n\n" +
        "Hormones:\n" +
        "- The **pars distalis** makes six: **GH, PRL, TSH, ACTH, LH and FSH**.\n" +
        "- The **pars intermedia** secretes only one: **MSH** (melanocyte stimulating hormone).\n" +
        "- **LH and FSH** stimulate gonadal activity, so they are called **gonadotrophins**.\n\n" +
        "Growth hormone disorders:\n" +
        "- Over-secretion of GH causes abnormal growth of the body, **gigantism**. Low secretion causes stunted growth, **pituitary dwarfism**.\n" +
        "- Excess GH in **adults, especially in middle age**, causes severe disfigurement, especially of the face: **acromegaly**. Unchecked, it can lead to serious complications and premature death.",
      table: {
        columns: ["Hormone", "Part of pituitary", "Main action"],
        rows: [
          {
            cells: ["Growth hormone (GH)", "Pars distalis", "Body growth; excess causes gigantism, or acromegaly in adults"],
            noteAmber: "Re-NEET 2026: excess growth hormone matched with acromegaly, and LH with ovulation.",
            pyqExampleId: "5fa81f53-c3da-4010-946d-ac0528b86091",
          },
          { cells: ["Prolactin (PRL)", "Pars distalis", "Growth of the mammary glands and formation of milk"] },
          { cells: ["TSH", "Pars distalis", "Synthesis and secretion of thyroid hormones"] },
          { cells: ["ACTH", "Pars distalis", "Synthesis and secretion of glucocorticoids from the adrenal cortex"] },
          { cells: ["LH", "Pars distalis", "Males: androgens from the testis. Females: ovulation of the Graafian follicle and upkeep of the corpus luteum"] },
          { cells: ["FSH", "Pars distalis", "Males: with androgens, regulates spermatogenesis. Females: growth and development of ovarian follicles"] },
          { cells: ["MSH", "Pars intermedia", "Acts on melanocytes and regulates skin pigmentation"] },
        ],
      },
      pyqExampleId: "02215e71-41d5-4923-8b26-af7452e850d6",
      selfCheckExample: {
        prompt: "Why are LH and FSH called gonadotrophins?",
        steps: [
          "Both come from the pars distalis of the pituitary.",
          "Both act on the gonads, the testis and the ovary, and stimulate their activity.",
        ],
        answer: "Because they stimulate gonadal activity.",
      },
      practiceSet: [
        { prompt: "What is the bony cavity that holds the pituitary gland called?", answer: "The sella turcica" },
        { prompt: "What disorder does excess growth hormone cause in a middle-aged adult?", answer: "Acromegaly, a severe disfigurement especially of the face" },
        { prompt: "What does low secretion of growth hormone cause in a child?", answer: "Stunted growth, pituitary dwarfism" },
        { prompt: "Which pituitary hormone stimulates the adrenal cortex to make glucocorticoids?", answer: "ACTH (adrenocorticotrophic hormone)" },
        { prompt: "In a female, which pituitary hormone stimulates the growth of ovarian follicles?", answer: "FSH" },
      ],
      traps: [
        {
          title: "Prolactin is an anterior pituitary hormone",
          body: "**Prolactin** is one of the six hormones of the **pars distalis**. A statement that the pituitary does not secrete prolactin is false.",
        },
        {
          title: "Gigantism and acromegaly are both excess GH",
          body: "Excess GH during growth gives **gigantism**; excess GH in **adults** gives **acromegaly**. Low GH gives **pituitary dwarfism**, not cretinism (a thyroid disorder).",
        },
        {
          title: "MSH is the pars intermedia's only hormone",
          body: "The **pars intermedia** makes just **MSH**. The other six adenohypophysis hormones come from the **pars distalis**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-thyroid",
      name: "The pineal, thyroid, parathyroid and thymus",
      intuition:
        "Four small glands with very different jobs. The pineal in the brain keeps the body on its 24-hour clock. The thyroid in the neck sets how fast the body burns fuel. The tiny parathyroids on its back raise blood calcium. The thymus behind the breastbone trains the immune system and shrinks with age.",
      definition:
        "Pineal gland:\n" +
        "- On the **dorsal side of the forebrain**. It secretes **melatonin**.\n" +
        "- Melatonin regulates the **24-hour (diurnal) rhythm**: the sleep-wake cycle and body temperature. It also influences metabolism, pigmentation, the menstrual cycle and our defence capability.\n\n" +
        "Thyroid gland:\n" +
        "- **Two lobes** on either side of the **trachea**, joined by a thin flap of connective tissue, the **isthmus**. It is made of **follicles** and stromal tissue.\n" +
        "- The follicular cells make **tetraiodothyronine (thyroxine, T4)** and **triiodothyronine (T3)**. **Iodine** is essential for their normal synthesis.\n" +
        "- Thyroid hormones regulate the **basal metabolic rate (BMR)**, support **RBC formation**, control the metabolism of carbohydrates, proteins and fats, and influence **water and electrolyte balance**.\n" +
        "- The thyroid also secretes a protein hormone, **thyrocalcitonin (TCT)**, which regulates blood calcium.\n\n" +
        "Parathyroid glands:\n" +
        "- **Four** glands on the **back side of the thyroid**, one pair in each lobe. They secrete the peptide **parathyroid hormone (PTH)**, whose release is regulated by the circulating level of Ca²⁺.\n" +
        "- PTH **increases blood Ca²⁺**: it stimulates **bone resorption** (demineralisation), stimulates **reabsorption of Ca²⁺ by the renal tubules**, and increases **Ca²⁺ absorption from digested food**. So it is a **hypercalcemic** hormone. With TCT it keeps the calcium balance.\n\n" +
        "Thymus:\n" +
        "- A lobular structure between the lungs, **behind the sternum** on the **ventral side of the aorta**. It has a major role in developing the **immune system**.\n" +
        "- It secretes peptide hormones, the **thymosins**: they drive the differentiation of **T-lymphocytes** (cell-mediated immunity) and promote antibody production (humoral immunity).\n" +
        "- The thymus **degenerates in old people**, so less thymosin is made and their immune responses become weak.",
      table: {
        columns: ["Gland", "Where it lies", "Hormone", "What it does"],
        rows: [
          {
            cells: ["Pineal", "Dorsal side of the forebrain", "Melatonin", "Diurnal rhythm: sleep-wake cycle, body temperature"],
            noteAmber: "NEET 2023: the normal rhythm of the sleep-wake cycle is not under thyroid control.",
          },
          { cells: ["Thyroid", "Two lobes on either side of the trachea, joined by the isthmus", "T4 (thyroxine) and T3", "BMR, RBC formation, water and electrolyte balance"] },
          { cells: ["Thyroid", "Same gland", "Thyrocalcitonin (TCT), a protein", "Regulates blood calcium"] },
          {
            cells: ["Parathyroid", "Four glands on the back of the thyroid", "PTH, a peptide", "Raises blood Ca²⁺: bone resorption, renal reabsorption, gut absorption"],
            noteAmber: "NEET 2022: lowering blood Ca²⁺ and cutting Ca²⁺ absorption from food are not effects of PTH.",
            pyqExampleId: "1313c739-7c59-49e7-bec0-9f162ab1046f",
          },
          { cells: ["Thymus", "Between the lungs, behind the sternum, ventral to the aorta", "Thymosins, peptides", "T-lymphocyte differentiation and antibody production"] },
        ],
      },
      pyqExampleId: "7965cf3f-507a-492b-8195-210ad778e9b9",
      selfCheckExample: {
        prompt: "Why do the immune responses of old people become weak?",
        steps: [
          "The thymus secretes thymosins, which drive the differentiation of T-lymphocytes and promote antibody production.",
          "The thymus degenerates in old people, so less thymosin is made.",
        ],
        answer: "Because the thymus degenerates with age, so less thymosin is made.",
      },
      practiceSet: [
        { prompt: "What is the thin flap of tissue joining the two lobes of the thyroid called?", answer: "The isthmus" },
        { prompt: "On which side of the forebrain does the pineal gland lie?", answer: "The dorsal side" },
        { prompt: "How many parathyroid glands does a human have, and where are they?", answer: "Four, on the back side of the thyroid gland, one pair in each lobe" },
        { prompt: "Which protein hormone of the thyroid regulates blood calcium?", answer: "Thyrocalcitonin (TCT)" },
        { prompt: "Which element is essential for the normal synthesis of thyroid hormones?", answer: "Iodine" },
      ],
      traps: [
        {
          title: "Melatonin, not thyroxine, keeps the body clock",
          body: "The **sleep-wake cycle** is regulated by **melatonin** from the **pineal**. Thyroid hormones control **BMR, RBC formation and water and electrolyte balance**, not the sleep rhythm.",
        },
        {
          title: "The immune system develops under the thymus",
          body: "The **thymus** and its **thymosins** have the major role in developing the immune system. This is not a thyroid hormone function.",
        },
        {
          title: "PTH raises blood calcium in every way",
          body: "PTH **increases** blood Ca²⁺: more bone resorption, more renal reabsorption, more absorption from food. Any statement where PTH lowers blood calcium or cuts its absorption is false. **TCT** is the thyroid hormone in the calcium balance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzocc-disorders",
      name: "Hormone disorders",
      intuition:
        "Too much or too little of one hormone gives a disorder with its own name. NEET pairs the name with the hormone and its signs. Learn each disorder as three things together: which hormone, too much or too little, and the sign that gives it away, such as bulging eyes or a disfigured face.",
      definition:
        "Thyroid:\n" +
        "- Iodine deficiency gives **hypothyroidism** and an enlarged thyroid, **goitre**.\n" +
        "- Hypothyroidism **during pregnancy** affects the baby: stunted growth (**cretinism**), mental retardation, low IQ, abnormal skin, deaf-mutism. In adult women it may make the menstrual cycle irregular.\n" +
        "- Thyroid cancer or nodules can raise hormone output to abnormally high levels: **hyperthyroidism**. **Exophthalmic goitre** is one form, with an enlarged thyroid, **protruding eyeballs**, raised BMR and weight loss. It is also called **Graves' disease**.\n\n" +
        "Other glands:\n" +
        "- Growth hormone: gigantism (excess), pituitary dwarfism (too little), acromegaly (excess in adults).\n" +
        "- ADH: impaired synthesis or release gives **diabetes insipidus**.\n" +
        "- Adrenal cortex: underproduction alters carbohydrate metabolism, causing acute weakness and fatigue: **Addison's disease**.\n" +
        "- Insulin and glucagon: **prolonged hyperglycaemia** gives **diabetes mellitus**, with loss of glucose in the urine and harmful **ketone bodies**.\n" +
        "- NEET 2024 also set **Cushing's syndrome** as excess cortisol with a moon face and hyperglycaemia. NCERT itself does not name it.",
      table: {
        columns: ["Disorder", "Cause", "Signs"],
        rows: [
          { cells: ["Goitre", "Iodine deficiency, hypothyroidism", "Enlarged thyroid"] },
          {
            cells: ["Cretinism", "Hypothyroidism during pregnancy", "Stunted growth, mental retardation, low IQ, abnormal skin, deaf-mutism"],
            noteAmber: "NEET 2024: cretinism matched with hyposecretion of thyroid hormone and stunted growth.",
          },
          { cells: ["Exophthalmic goitre (Graves' disease)", "Hyperthyroidism", "Enlarged thyroid, protruding eyeballs, raised BMR, weight loss"] },
          { cells: ["Acromegaly", "Excess GH in adults", "Severe disfigurement, especially of the face"] },
          { cells: ["Pituitary dwarfism", "Low GH", "Stunted growth"] },
          { cells: ["Diabetes insipidus", "Impaired ADH synthesis or release", "Water loss and dehydration"] },
          { cells: ["Addison's disease", "Underproduction of adrenal cortex hormones", "Acute weakness and fatigue"] },
          { cells: ["Diabetes mellitus", "Prolonged hyperglycaemia", "Glucose in urine, harmful ketone bodies"] },
          { cells: ["Cushing's syndrome (not named in NCERT)", "Excess cortisol", "Moon face, hyperglycaemia"] },
        ],
      },
      pyqExampleId: "b7a75a10-d94a-46e1-87b9-d5ce25cd8a48",
      selfCheckExample: {
        prompt: "An adult has acute weakness and fatigue because the adrenal cortex makes too little hormone. Name the disease and the kind of metabolism that is altered.",
        steps: [
          "Underproduction of the adrenal cortex hormones alters carbohydrate metabolism.",
          "This causes acute weakness and fatigue, the disease NCERT calls Addison's disease.",
        ],
        answer: "Addison's disease; carbohydrate metabolism is altered.",
      },
      practiceSet: [
        { prompt: "What is the other name of exophthalmic goitre?", answer: "Graves' disease" },
        { prompt: "Hypothyroidism during pregnancy can cause which defect of hearing and speech in the baby?", answer: "Deaf-mutism" },
        { prompt: "Lack of iodine in the diet leads to which enlargement of a gland?", answer: "Goitre, an enlarged thyroid" },
        { prompt: "According to NCERT, which two harmful results come with the prolonged hyperglycaemia of diabetes mellitus?", answer: "Loss of glucose through the urine and formation of harmful ketone bodies" },
        { prompt: "What effect can hypothyroidism have on the menstrual cycle of an adult woman?", answer: "It may make the cycle irregular" },
      ],
      traps: [
        {
          title: "Exophthalmic goitre is hyperthyroidism",
          body: "**Goitre** from iodine lack is **hypo**thyroidism, but **exophthalmic goitre** (Graves' disease) is **hyper**thyroidism, with protruding eyeballs and weight loss.",
        },
        {
          title: "Cretinism is thyroid, dwarfism is GH",
          body: "Both give stunted growth. **Cretinism** comes from **hypothyroidism** during pregnancy; **pituitary dwarfism** comes from **low growth hormone**.",
        },
      ],
    },
  ],
};
