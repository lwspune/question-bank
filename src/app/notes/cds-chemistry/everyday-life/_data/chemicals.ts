import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_EV_CHEMICALS_NOTE: SubtopicNote = {
  subtopicName: "Common Chemicals and Their Uses",
  title: "Elements and Compounds in Everyday Use",
  oneLineDefinition:
    "What magnesium, calcium, strontium, barium and the noble gases do in life and industry, and the everyday uses of carbon dioxide, nitrogen and potassium nitrate.",
  whyItMatters:
    "Six CDS questions, each a use matched to a substance. Two of them pack several facts into one item (a four-element match-the-list and a three-statement check), so a single table of uses covers most of the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschev-element-uses",
      name: "Uses of group 2 metals and noble gases",
      intuition:
        "A handful of elements have one famous job each. Magnesium sits at the heart of chlorophyll, calcium makes muscles contract, strontium colours fireworks red, and barium sulphate shows the gut on an X-ray. Among the noble gases, xenon gives the bright flash in a camera.",
      definition:
        "The uses:\n" +
        "- **Magnesium**: the central atom of **chlorophyll**, so it traps sunlight in photosynthesis.\n" +
        "- **Calcium**: controls **muscle contraction**; also builds bones and teeth.\n" +
        "- **Strontium**: gives a **crimson-red flame** (fireworks, flares).\n" +
        "- **Barium**: **barium sulphate** is the X-ray contrast meal for the **alimentary canal**; barium salts give a green flame.\n" +
        "- **Xenon**: fills **photographic flash tubes**. **Neon**: red advertising signs. **Argon**: electric bulbs.",
      table: {
        columns: ["Element", "Use or property"],
        rows: [
          { cells: ["Magnesium", "Traps sunlight in chlorophyll"] },
          { cells: ["Calcium", "Controls muscle contraction"] },
          { cells: ["Strontium", "Red colour in flames"] },
          { cells: ["Barium", "Sulphate used to X-ray the alimentary canal"] },
          {
            cells: ["Xenon", "Bright flash in a photographer's flashgun"],
            pyqExampleId: "5ee88ea4-a809-4666-903f-35ed1ab2bc9f",
          },
          { cells: ["Neon", "Red glow in advertising signs"] },
        ],
        caption: "CDS 2016 (II) matched Mg, Ca, Sr and Ba to these four uses in one item.",
      },
      pyqExampleId: "d4d1c317-1f66-4447-a2fa-32f35da1ac12",
      practiceSet: [
        { prompt: "Which metal is at the centre of chlorophyll?", answer: "Magnesium" },
        { prompt: "Which element gives fireworks a crimson-red colour?", answer: "Strontium" },
        { prompt: "Which noble gas fills a camera's flash tube?", answer: "Xenon" },
        { prompt: "Which element controls muscle contraction?", answer: "Calcium" },
      ],
      traps: [
        {
          title: "Strontium is red, barium is green",
          body: "In flame colours and fireworks, **strontium** gives crimson red and **barium** gives green. CDS swaps the pair in match-the-list options.",
        },
        {
          title: "Flash tubes use xenon, not neon",
          body: "A photographic flash is **xenon**, which gives a near-white burst. Neon glows red and is used in signs; argon fills bulbs.",
        },
        {
          title: "Magnesium, not iron, is in chlorophyll",
          body: "Chlorophyll has **magnesium** at its centre. Iron is the central atom of haemoglobin in blood.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschev-compound-uses",
      name: "Everyday uses of carbon dioxide, nitrogen and potassium nitrate",
      intuition:
        "These are the household-and-shop uses CDS asks about: the gas that makes drinks fizz, the gas in a crisp packet, the chemical in a fire extinguisher, and the salt that is a fertilizer, a gunpowder ingredient and a meat preservative all at once.",
      definition:
        "The uses:\n" +
        "- **Carbon dioxide** is dissolved under pressure to make **soft drinks** fizzy; it also forms a little carbonic acid.\n" +
        "- A **soda-acid fire extinguisher** holds **sodium hydrogen carbonate** solution and **sulphuric acid**; mixing them gives CO₂.\n" +
        "- **Nitrogen** is flushed into **food packets** to stop the food oxidising.\n" +
        "- **Potassium nitrate** is a **fertilizer**, the oxidiser in **gunpowder**, and a **meat preservative** (E252).\n" +
        "- **Tooth decay** starts when the mouth's pH falls **below 5.5**.",
      table: {
        columns: ["Substance", "Everyday use"],
        rows: [
          {
            cells: ["Carbon dioxide", "Makes soft drinks fizzy"],
            pyqExampleId: "c49e2192-8e41-457d-9794-57557eca5d50",
          },
          { cells: ["Sodium hydrogen carbonate + sulphuric acid", "Soda-acid fire extinguisher"] },
          {
            cells: ["Nitrogen", "Flushed into food packets against oxidation"],
            noteAmber: "CDS 2026 (I): this statement and 'tooth decay below pH 5.5' were correct; 'Mg > Fe > Zn' was the wrong one (zinc is above iron).",
            pyqExampleId: "564f3031-539f-4266-8323-aa20a6c3b169",
          },
          {
            cells: ["Potassium nitrate", "Fertilizer, gunpowder, meat preservative"],
            pyqExampleId: "6f087d01-014b-4947-ac91-adcc75dab22a",
          },
        ],
      },
      pyqExampleId: "856d11bc-f8d2-4185-816c-4e3ecbc50a37",
      practiceSet: [
        { prompt: "Which gas is used to make soft drinks?", answer: "Carbon dioxide" },
        { prompt: "What is the role of potassium nitrate in gunpowder?", answer: "It is the oxidiser" },
        { prompt: "Below what pH of the mouth does tooth decay start?", answer: "5.5" },
        { prompt: "Why are chip packets flushed with nitrogen?", answer: "To stop the food oxidising" },
      ],
      traps: [
        {
          title: "The extinguisher uses the hydrogen carbonate",
          body: "Soda-acid extinguishers use **sodium hydrogen carbonate** with sulphuric acid. Sodium carbonate or sodium chloride in the options is wrong.",
        },
        {
          title: "Zinc is above iron",
          body: "The reactivity order is Mg > **Zn** > Fe. A statement with 'Mg > Fe > Zn' is the incorrect one.",
        },
        {
          title: "Soft drinks hold carbon dioxide, not ammonia or phosgene",
          body: "Fizz comes from **CO₂** dissolved under pressure. NH₃, PH₃ and COCl₂ (phosgene) are toxic gases offered as distractors.",
        },
      ],
    },
  ],
};
