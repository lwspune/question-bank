import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_EV_MEDICINES_NOTE: SubtopicNote = {
  subtopicName: "Medicines and Health Chemistry",
  title: "Antiseptics and the Barium Meal",
  oneLineDefinition:
    "What tincture of iodine is made of, and why insoluble barium sulphate is safe to swallow for an X-ray while soluble barium salts are poisons.",
  whyItMatters:
    "Three CDS questions, two of them on tincture of iodine (2017 and 2022) and one on the barium meal (2022).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschev-antiseptics",
      name: "Tincture of iodine and other antiseptics",
      intuition:
        "An antiseptic kills germs on living tissue, such as a fresh wound. Tincture of iodine is the classic: a little iodine dissolved in alcohol and water, with potassium iodide added so the iodine stays dissolved.",
      definition:
        "The facts:\n" +
        "- **Tincture of iodine** = a **dilute** (2–3%) solution of **iodine** with **potassium iodide**, in an **alcohol–water** mixture. It contains **no acetone**.\n" +
        "- It is an **antiseptic** for fresh wounds.\n" +
        "- **Dettol** (chloroxylenol and terpineol) and **boric acid** are other common antiseptics.\n" +
        "- **Antacids** (milk of magnesia, sodium hydrogen carbonate) neutralise excess stomach acid.",
      table: {
        columns: ["Component of tincture of iodine", "Present?"],
        rows: [
          { cells: ["Iodine (dilute)", "Yes"] },
          { cells: ["Potassium iodide", "Yes — keeps iodine dissolved"] },
          { cells: ["Alcohol (ethanol)", "Yes"] },
          { cells: ["Water", "Yes"] },
          {
            cells: ["Acetone", "No"],
            pyqExampleId: "31ab0498-ff51-49c9-97e7-a530fd23386c",
          },
        ],
      },
      pyqExampleId: "31ab0498-ff51-49c9-97e7-a530fd23386c",
      practiceSet: [
        { prompt: "In what liquid mixture is the iodine of tincture of iodine dissolved?", answer: "Alcohol and water" },
        { prompt: "Why is potassium iodide added to tincture of iodine?", answer: "To keep the iodine dissolved" },
        { prompt: "Is tincture of iodine concentrated or dilute?", answer: "Dilute (2–3%)" },
      ],
      traps: [
        {
          title: "No acetone in tincture of iodine",
          body: "Tincture of iodine is iodine and potassium iodide in **alcohol and water**. Acetone is not part of it.",
        },
        {
          title: "The iodine is dilute",
          body: "Tincture of iodine holds only about 2–3% iodine. Concentrated iodine would burn the skin, so a weak solution is used on wounds.",
        },
        {
          title: "An antacid is a base",
          body: "Antacids such as milk of magnesia and sodium hydrogen carbonate are **mild bases** that neutralise excess stomach acid. They are not acids and not antiseptics.",
        },
        {
          title: "Antiseptic, not antibiotic",
          body: "Tincture of iodine is applied to the skin to kill germs on contact. An antibiotic such as penicillin is a medicine taken to fight infection inside the body.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschev-barium-meal",
      name: "The barium meal",
      intuition:
        "Barium atoms block X-rays, so a meal containing barium makes the gut show up on an X-ray. Free barium ions are poisonous, though, so the salt must be one that does not dissolve: barium sulphate.",
      definition:
        "The facts:\n" +
        "- **Barium sulphate**, BaSO₄, is given as a **meal** before an **X-ray of the alimentary canal**.\n" +
        "- It is **opaque to X-rays** and **practically insoluble**, so no toxic barium ions are absorbed.\n" +
        "- **Soluble** barium salts such as **barium chloride** are **poisonous**.",
      table: {
        columns: ["Salt", "Soluble?", "Safe as an X-ray meal?"],
        rows: [
          {
            cells: ["Barium sulphate", "No", "Yes"],
            pyqExampleId: "4cec5da1-dbc5-4d62-9448-7cdbc54eb45e",
          },
          { cells: ["Barium chloride", "Yes", "No — poisonous"] },
        ],
      },
      pyqExampleId: "4cec5da1-dbc5-4d62-9448-7cdbc54eb45e",
      practiceSet: [
        { prompt: "Is barium sulphate soluble in water?", answer: "No — practically insoluble" },
        { prompt: "Why is barium chloride not used for a barium meal?", answer: "It is soluble, so its barium ions would poison the patient" },
      ],
      traps: [
        {
          title: "Barium sulphate, not barium chloride",
          body: "The barium meal uses **barium sulphate**, which does not dissolve. Barium chloride dissolves and is poisonous.",
        },
        {
          title: "It works because barium blocks X-rays",
          body: "Barium is heavy and absorbs X-rays, so the coated gut shows white on the film. Strontium sulphate or magnesium chloride would not do this job.",
        },
      ],
    },
  ],
};
