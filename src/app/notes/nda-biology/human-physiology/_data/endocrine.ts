import type { SubtopicNote } from "@/app/notes/_types";

export const ENDOCRINE_NOTE: SubtopicNote = {
  subtopicName: "Endocrine System and Hormones",
  title: "The Endocrine System and Hormones",
  oneLineDefinition:
    "Endocrine glands release hormones into the blood; each hormone has a gland of origin and a specific job, and the menstrual cycle is run jointly by the ovary and pituitary.",
  whyItMatters:
    "5 PYQs — all recall from one table: which gland makes which hormone, and what it does. Thyroxine, insulin, adrenaline, estrogen are the regulars. The reliable trap is swapping a hormone's gland or function.",
  concepts: [
    // hormones table (REFERENCE) — the big one
    {
      kind: "reference" as const,
      slug: "hormones-gland-function",
      name: "Hormones — gland and function",
      intuition:
        "A hormone is a chemical messenger released by an endocrine gland straight into the blood. Each NDA question gives you one of the three columns — hormone, gland, or function — and asks for another. Learn the table as triples.",
      definition:
        "The high-yield hormone triples:\n" +
        "- **Thyroxine** — from the **thyroid**; controls **metabolic rate**; needs **iodine** to be made (deficiency → goitre).\n" +
        "- **Insulin** — from the **pancreas**; lowers blood glucose.\n" +
        "- **Adrenaline** — from the **adrenal** medulla; increases **heartbeat** ('fight or flight').\n" +
        "- **Estrogen** — from the **ovary**; develops female sexual characters.\n" +
        "- **Oxytocin / Prolactin / FSH / LH** — from the **pituitary**.",
      table: {
        columns: ["Hormone", "Gland", "Function"],
        rows: [
          {
            cells: ["**Thyroxine**", "Thyroid", "Controls metabolic rate (needs iodine)"],
            noteAmber: "Iodised salt supplies the iodine the thyroid needs to make thyroxine.",
          },
          { cells: ["Insulin", "Pancreas", "Lowers blood glucose"] },
          { cells: ["**Adrenaline**", "Adrenal medulla", "Increases heartbeat (fight/flight)"] },
          { cells: ["**Estrogen**", "Ovary", "Female sexual characters"] },
          { cells: ["FSH / LH", "Pituitary", "Drive the menstrual cycle / reproduction"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which hormone increases the heartbeat, and from which gland is it released?",
        steps: [
          "Increased heartbeat is part of the 'fight or flight' response.",
          "That response is driven by adrenaline (epinephrine).",
          "Adrenaline is secreted by the adrenal medulla.",
        ],
        answer: "Adrenaline, from the adrenal gland (medulla).",
      },
      practiceSet: [
        { prompt: "Which hormone controls metabolic rate?", answer: "Thyroxine", method: "from the thyroid" },
        { prompt: "Which gland secretes insulin?", answer: "Pancreas" },
        { prompt: "Which hormone develops female sexual characters?", answer: "Estrogen" },
        { prompt: "Iodised salt is needed to synthesise which hormone?", answer: "Thyroxine" },
      ],
      pyqExampleId: "a8343857-d476-48b1-84de-5249fe5368cf", // adrenaline increases heartbeat
      traps: [
        {
          title: "Match the hormone to the RIGHT gland",
          body:
            "The bank swaps glands: insulin is pancreas (not thyroid), thyroxine is thyroid (not adrenal), adrenaline is adrenal (not thyroid). Learn the gland with the hormone, not separately.",
        },
      ],
    },

    // reproductive hormones (REFERENCE, 1 q)
    {
      kind: "reference" as const,
      slug: "reproductive-hormones",
      name: "Reproductive hormones and the menstrual cycle",
      intuition:
        "The menstrual cycle is not run by one organ — it is a conversation between the ovary and the pituitary gland. The pituitary releases FSH and LH; the ovary responds with estrogen and progesterone.",
      definition:
        "The two-gland control of the menstrual cycle:\n" +
        "- **Pituitary gland** — releases **FSH** and **LH** that drive the cycle.\n" +
        "- **Ovary** — responds with **estrogen** (follicular phase) and **progesterone** (after ovulation, maintains the uterus lining).\n" +
        "- So the cycle is controlled by hormones from the **ovary AND the pituitary gland**.",
      table: {
        columns: ["Gland", "Hormones", "Role"],
        rows: [
          { cells: ["Pituitary", "FSH, LH", "Trigger follicle growth and ovulation"] },
          { cells: ["Ovary", "Estrogen, Progesterone", "Build and maintain the uterus lining"] },
        ],
      },
      practiceSet: [
        { prompt: "Which two glands control the menstrual cycle?", answer: "Ovary and pituitary gland" },
        { prompt: "Which pituitary hormones drive the cycle?", answer: "FSH and LH" },
        { prompt: "Which ovarian hormone maintains the uterus lining after ovulation?", answer: "Progesterone" },
      ],
      pyqExampleId: "d828d0d3-a8e1-4417-8b62-5197bc2c7d16", // menstrual = ovary + pituitary
      traps: [
        {
          title: "Two glands, not one",
          body:
            "The menstrual cycle is controlled by the **ovary AND pituitary** together. Options pairing the ovary with the lacrimal, sebaceous or prostate gland are wrong — the partner gland is the pituitary.",
        },
      ],
    },
  ],
};
