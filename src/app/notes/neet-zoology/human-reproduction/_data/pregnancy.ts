import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_HR_PREGNANCY_NOTE: SubtopicNote = {
  subtopicName: "Pregnancy and Birth",
  title: "Pregnancy and Birth",
  oneLineDefinition:
    "The placenta and its hormones, what the foetus has formed by each month of pregnancy, and how parturition and lactation work.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. The month-by-month growth of the foetus was asked in NEET 2025 and again in NEET 2026, colostrum twice in 2024 (NEET 2024 and Re-NEET 2024), and the hormones of pregnancy in NEET 2021 and Re-NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzohr-placenta",
      name: "The placenta and the hormones of pregnancy",
      intuition:
        "Once the embryo is fixed in the uterus, it needs a link to the mother for food, oxygen and waste. That link is the placenta, made partly by the embryo and partly by the uterus. The placenta is also a gland: it makes hormones that keep the pregnancy going.",
      definition:
        "Forming the placenta:\n" +
        "- After implantation, finger-like **chorionic villi** grow from the **trophoblast**. They are surrounded by uterine tissue and maternal blood.\n" +
        "- The chorionic villi and the uterine tissue interlock and together form the **placenta**, a structural and functional unit between the foetus and the mother.\n" +
        "- The placenta supplies **oxygen and nutrients** to the embryo and removes **carbon dioxide and wastes**. It is joined to the embryo by the **umbilical cord**, which carries substances to and from the embryo.\n\n" +
        "Hormones of pregnancy:\n" +
        "- The placenta is also an **endocrine tissue**. It makes **human chorionic gonadotropin (hCG)**, **human placental lactogen (hPL)**, **estrogens** and **progestogens**.\n" +
        "- In the **later phase of pregnancy**, the **ovary** also secretes **relaxin**.\n" +
        "- **hCG, hPL and relaxin are made in women only during pregnancy.**\n" +
        "- The levels of **estrogens, progestogens, cortisol, prolactin and thyroxine** in the mother's blood also rise several times during pregnancy. These support the growth of the foetus, the metabolic changes in the mother and the maintenance of pregnancy.\n\n" +
        "Germ layers:\n" +
        "- Right after implantation the inner cell mass forms an outer **ectoderm** and an inner **endoderm**, and the **mesoderm** soon appears between them. These three layers give rise to all the tissues and organs of the adult.\n" +
        "- The inner cell mass holds **stem cells**, which can give rise to all the tissues and organs.",
      table: {
        columns: ["Hormone", "Source in pregnancy", "Note"],
        rows: [
          {
            cells: ["hCG", "Placenta", "Made only during pregnancy"],
            noteAmber: "Re-NEET 2024: the placenta secretes the hormone hCG.",
          },
          { cells: ["hPL", "Placenta", "Made only during pregnancy"] },
          { cells: ["Estrogens and progestogens", "Placenta", "Their level in the mother's blood rises several times"] },
          {
            cells: ["Relaxin", "Ovary (the corpus luteum), in the later phase", "Made only during pregnancy"],
          },
          { cells: ["Cortisol, prolactin, thyroxine", "Their own glands", "Levels rise several times in the mother's blood"] },
          {
            cells: ["LH", "Anterior pituitary", "Not a placental hormone"],
            noteAmber: "Re-NEET 2026: hCG, estrogen and progesterone come from the human placenta; LH does not.",
            pyqExampleId: "7b031f08-c2d3-4db9-80f3-2c75209e3882",
          },
        ],
      },
      pyqExampleId: "90f896cc-47ac-4aff-a96b-cdc09eea18cd",
      selfCheckExample: {
        prompt: "Name the two parts that interlock to form the human placenta, and the structure that joins the placenta to the embryo.",
        steps: [
          "After implantation the trophoblast grows finger-like chorionic villi.",
          "The chorionic villi interlock with the uterine tissue to form the placenta.",
          "The placenta is joined to the embryo by the umbilical cord.",
        ],
        answer: "The chorionic villi and the uterine tissue; the umbilical cord.",
      },
      practiceSet: [
        { prompt: "Which three hormones are made in a woman only during pregnancy?", answer: "hCG, hPL and relaxin" },
        { prompt: "Name four hormones the human placenta makes.", answer: "hCG, hPL, estrogens and progestogens" },
        { prompt: "Which three germ layers does the inner cell mass form after implantation, and which appears last?", answer: "Ectoderm, endoderm and mesoderm; the mesoderm appears last, between the other two" },
        { prompt: "Which cells of the inner cell mass can give rise to all the tissues and organs?", answer: "The stem cells" },
      ],
      traps: [
        {
          title: "LH is not a placental hormone",
          body: "The placenta makes **hCG, hPL, estrogens and progestogens**. **LH** comes from the **anterior pituitary**.",
        },
        {
          title: "Relaxin comes from the ovary",
          body: "In the later phase of pregnancy **relaxin is secreted by the ovary** (its corpus luteum), not by the foetus, the uterus or a Graafian follicle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-development",
      name: "Growth of the foetus month by month",
      intuition:
        "Pregnancy is nine months, cut into three trimesters of about twelve weeks each. Learn the landmarks as a ladder: the heart at one month, limbs and digits at two, most organ systems by the end of the first trimester, movement and head hair in the fifth month, fine body hair and eyelashes by the end of the second trimester, and a baby ready to be born at nine months.",
      definition:
        "- **After one month:** the embryo's **heart** is formed. The first sign of a growing foetus can be noticed by listening to the **heart sound** with a stethoscope.\n" +
        "- **By the end of the second month (8 weeks):** the foetus develops **limbs and digits**.\n" +
        "- **By the end of 12 weeks (the first trimester):** **most of the major organ systems** are formed; the limbs and the **external genital organs** are well developed.\n" +
        "- **During the fifth month (about 20 weeks):** the **first movements** of the foetus and the **appearance of hair on the head** are usually seen.\n" +
        "- **By the end of about 24 weeks (the second trimester):** the body is covered with **fine hair**, the **eyelids separate** and the **eyelashes** form.\n" +
        "- **By the end of nine months:** the foetus is fully developed and ready for delivery.\n" +
        "- **Twins** (not in NCERT's chapter, asked once, in NEET 2025): identical (monozygotic) twins come from one zygote, so they are always the same sex. A boy and a girl born together must come from two separate zygotes: they are **fraternal (dizygotic) twins**.",
      table: {
        columns: ["Time in pregnancy", "Weeks", "What has formed"],
        rows: [
          {
            cells: ["After one month", "About 4", "The heart; its sound is the first sign of a growing foetus"],
            noteAmber: "NEET 2025: the heart forms after one month, and most major organ systems by the end of 12 weeks, not 8.",
            pyqExampleId: "c9ddda2d-f57e-4344-8582-3558aa11dec8",
          },
          { cells: ["End of second month", "8", "Limbs and digits"] },
          { cells: ["End of first trimester", "12", "Most major organ systems; limbs and external genital organs well developed"] },
          { cells: ["Fifth month", "About 20", "First movements of the foetus; hair appears on the head"] },
          { cells: ["End of second trimester", "About 24", "Body covered with fine hair; eyelids separate; eyelashes form"] },
          { cells: ["End of ninth month", "Nine months", "Fully developed and ready for delivery"] },
        ],
      },
      pyqExampleId: "01b95608-82d6-487b-b770-7f469cd3fb52",
      selfCheckExample: {
        prompt: "A doctor wants the first sign that a foetus is growing. What can be listened for, and from about when in pregnancy?",
        steps: [
          "NCERT says the embryo's heart is formed after one month of pregnancy.",
          "The first sign of a growing foetus is noticed by listening to the heart sound with a stethoscope.",
        ],
        answer: "The heart sound, with a stethoscope, from after the first month.",
      },
      practiceSet: [
        { prompt: "Which trimester of human pregnancy ends at about 24 weeks?", answer: "The second trimester" },
        { prompt: "By which week of pregnancy, the end of the first trimester, are most of the major organ systems formed?", answer: "By the end of 12 weeks" },
        { prompt: "How long does a human pregnancy last?", answer: "About nine months" },
        { prompt: "Twins born together are a boy and a girl. Are they identical or fraternal twins?", answer: "Fraternal (dizygotic): they came from two separate zygotes" },
      ],
      traps: [
        {
          title: "Organ systems by 12 weeks, not 8",
          body: "At **8 weeks** (end of the second month) the foetus has **limbs and digits**. **Most of the major organ systems** are formed only by the **end of 12 weeks**.",
        },
        {
          title: "Head hair at 20 weeks, fine body hair at 24",
          body: "**Hair on the head** and the **first movements** come in the **fifth month** (about 20 weeks). The **fine hair over the body**, separated eyelids and eyelashes come by about **24 weeks**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzohr-birth",
      name: "Parturition and lactation",
      intuition:
        "Birth is a loop that feeds itself. The ready baby and the placenta send a signal that causes mild contractions. These make the mother's pituitary release oxytocin, which makes the contractions stronger, which releases more oxytocin, until the baby is pushed out. Then the breasts, which got ready during pregnancy, make milk, and the first milk carries the mother's antibodies.",
      definition:
        "Parturition:\n" +
        "- Human pregnancy lasts about **9 months**: the **gestation period**. Delivery of the foetus by vigorous contraction of the uterus is **parturition**.\n" +
        "- Parturition is induced by a **complex neuroendocrine mechanism**. The signals come from the **fully developed foetus and the placenta**, which cause mild uterine contractions called the **foetal ejection reflex**.\n" +
        "- This reflex triggers the release of **oxytocin from the maternal pituitary**. Oxytocin acts on the uterine muscle and causes **stronger contractions**, which in turn cause **more oxytocin** to be secreted. The contractions grow stronger and stronger until the baby is expelled through the **birth canal**.\n" +
        "- Soon after the baby is delivered, the **placenta is also expelled**.\n\n" +
        "Lactation:\n" +
        "- The mammary glands differentiate during pregnancy and start producing milk towards its end: this is **lactation**.\n" +
        "- The milk of the first few days is **colostrum**. It contains **several antibodies absolutely essential to develop resistance** in the newborn baby.\n" +
        "- So doctors recommend **breast-feeding during the initial period** of the infant's growth for bringing up a healthy baby.",
      table: {
        columns: ["Term", "What it is", "Key fact"],
        rows: [
          { cells: ["Gestation period", "Length of human pregnancy", "About 9 months"] },
          { cells: ["Foetal ejection reflex", "Mild uterine contractions started by signals from the foetus and placenta", "Triggers oxytocin release"] },
          {
            cells: ["Oxytocin", "Hormone from the maternal pituitary", "Stronger uterine contractions, which release still more oxytocin"],
            noteAmber: "NEET 2021: release of prolactin is not part of the initiation of parturition.",
            pyqExampleId: "09ffe4d1-0b01-4a20-b8b8-58b25f70a6b3",
          },
          { cells: ["Lactation", "Milk production by the mammary glands", "Starts towards the end of pregnancy"] },
          {
            cells: ["Colostrum", "Milk of the first few days of lactation", "Several antibodies that build resistance in the newborn"],
            noteAmber: "NEET 2024: breast-feeding is recommended early because colostrum carries these antibodies.",
            pyqExampleId: "f883d123-cc37-4427-99f4-fc557cbe094c",
          },
        ],
      },
      pyqExampleId: "c41d79cb-e30d-4e3c-843c-23c29c7f9c5d",
      selfCheckExample: {
        prompt: "Explain why the uterine contractions of labour keep getting stronger once they begin.",
        steps: [
          "Mild contractions (the foetal ejection reflex) make the maternal pituitary release oxytocin.",
          "Oxytocin makes the uterine muscle contract more strongly.",
          "Stronger contractions cause still more oxytocin to be secreted, so the loop repeats and the contractions build until the baby is expelled.",
        ],
        answer: "Contraction and oxytocin secretion stimulate each other, so each round makes the next stronger.",
      },
      practiceSet: [
        { prompt: "From where do the signals for parturition come?", answer: "From the fully developed foetus and the placenta" },
        { prompt: "Which hormone, released from the maternal pituitary, causes the strong uterine contractions of labour?", answer: "Oxytocin" },
        { prompt: "What is expelled from the uterus soon after the baby is delivered?", answer: "The placenta" },
        { prompt: "What is the average duration of human pregnancy called?", answer: "The gestation period" },
        { prompt: "When do the mammary glands start producing milk?", answer: "Towards the end of pregnancy" },
      ],
      traps: [
        {
          title: "Prolactin does not start labour",
          body: "Labour is set off by the **foetal ejection reflex** and **oxytocin** from the maternal pituitary. **Prolactin** is a milk hormone and is not part of the initiation of parturition.",
        },
        {
          title: "Oxytocin comes from the mother",
          body: "The **foetus and the placenta** send the signal for birth, but the **oxytocin** that drives the strong contractions is released from the **maternal pituitary**.",
        },
      ],
    },
  ],
};
