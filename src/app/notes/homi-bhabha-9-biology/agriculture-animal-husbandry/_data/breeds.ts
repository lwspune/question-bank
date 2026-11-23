import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AG_BREEDS_NOTE: SubtopicNote = {
  subtopicName: "Poultry and Cattle Breeds",
  title: "Poultry and Cattle Breeds",
  oneLineDefinition:
    "Chicken breeds are sorted by what they are reared for (eggs, meat, or both), and cattle breeds by the animal: Indian cow, foreign cow or buffalo.",
  whyItMatters:
    "The busiest page of the chapter: seven questions, all MODERATE. Five sort chicken breeds into egg layers, meat breeds and breeds kept for both (two of them read a Venn diagram or a flow chart), and two ask you to pick the buffalo among cows or the cow among buffaloes. Learn the two tables and all seven fall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9agbr-poultry",
      name: "Chicken breeds for eggs, meat or both",
      intuition:
        "A poultry farmer chooses a breed for the job. Light, active hens that lay many eggs are layers. Heavy birds that put on meat quickly are kept for meat. Some breeds lay well and also give good meat, so they are kept for both. Every question here is a matter of putting a name in the right one of these three boxes.",
      definition:
        "- **Layers** (reared for **eggs**): **White Leghorn**, **Minorca**, **Ancona**.\n" +
        "- **Meat breeds**: **Aseel** (an Indian breed, also a fighting bird), **Brahma**, **Cochin**, **Langshan**.\n" +
        "- **Dual-purpose** (reared for **eggs and meat**): **Plymouth Rock**, **Black Rock**, **Rhode Island Red**, **New Hampshire**.\n" +
        "- In a Venn diagram of egg breeds and meat breeds, a breed kept for both sits in the **overlap**.",
      table: {
        columns: ["Reared for", "Breeds"],
        rows: [
          { cells: ["Eggs (layers)", "White Leghorn, Minorca, Ancona"] },
          { cells: ["Meat", "Aseel, Brahma, Cochin, Langshan"] },
          { cells: ["Eggs and meat", "Plymouth Rock, Black Rock, Rhode Island Red, New Hampshire"], noteAmber: "The overlap of a Venn diagram of the two groups." },
        ],
        caption: "The 'Rock' breeds and Rhode Island Red are kept for both eggs and meat.",
      },
      selfCheckExample: {
        prompt: "A farmer wants as many eggs as possible. Which breed should he choose: Brahma, Ancona or Cochin?",
        steps: ["Brahma and Cochin are heavy meat breeds.", "Ancona is a layer."],
        answer: "Ancona",
      },
      practiceSet: [
        { prompt: "Is Aseel reared mainly for eggs or for meat?", answer: "For meat (it is also a fighting bird)" },
        { prompt: "Is the Rhode Island Red chicken reared for eggs, for meat or for both?", answer: "For both eggs and meat" },
        { prompt: "To which group does White Leghorn belong: layers, meat breeds or dual-purpose breeds?", answer: "Layers" },
        { prompt: "Find the odd one out: Minorca, Ancona, White Leghorn, Brahma.", answer: "Brahma: it is a meat breed, the others are layers" },
      ],
      pyqExampleId: "36279d7d-c863-4541-8291-8570faca920d",
      traps: [
        {
          title: "Putting Cochin among the layers",
          body: "Cochin is a heavy breed kept for meat. The layers are White Leghorn, Minorca and Ancona.",
        },
        {
          title: "Calling Plymouth Rock a meat breed only",
          body: "Plymouth Rock gives both eggs and meat. In a Venn diagram of the two groups it goes in the overlap.",
        },
        {
          title: "Taking Aseel as a layer because it is Indian",
          body: "Aseel is an Indian breed kept for meat and fighting, not for eggs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9agbr-cattle",
      name: "Breeds of cows and buffaloes",
      intuition:
        "Odd-one-out questions on cattle hide one buffalo among cows, or one cow among buffaloes. So learn the breeds as two lists. The buffalo list is short: Murrah, Mehsana, Surti, Jafarabadi, Nagpuri, Pandharpuri. Almost every other name you meet is a cow.",
      definition:
        "- **Indian cow breeds**: **Sahiwal**, **Gir**, **Red Sindhi**, **Tharparkar**, and from Maharashtra **Khillari**, **Dangi**, **Devni**, **Gaolao** and **Red Kandhari**.\n" +
        "- **Foreign cow breeds**: **Jersey**, **Holstein Friesian**, **Brown Swiss**. A **hybrid** cow is a cross of an Indian and a foreign breed.\n" +
        "- **Buffalo breeds**: **Murrah** (Haryana), **Mehsana**, **Surti** and **Jafarabadi** (Gujarat), **Nagpuri** and **Pandharpuri** (Maharashtra).",
      table: {
        columns: ["Animal", "Breeds"],
        rows: [
          { cells: ["Indian cow", "Sahiwal, Gir, Red Sindhi, Tharparkar"] },
          { cells: ["Maharashtra cow", "Khillari, Dangi, Devni, Gaolao, Red Kandhari"] },
          { cells: ["Foreign cow", "Jersey, Holstein Friesian, Brown Swiss"] },
          { cells: ["Buffalo", "Murrah, Mehsana, Surti, Jafarabadi, Nagpuri, Pandharpuri"] },
        ],
        caption: "Murrah is the best-known milk buffalo of India.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: Gir, Khillari, Jafarabadi, Red Sindhi.",
        steps: ["Gir, Khillari and Red Sindhi are breeds of cow.", "Jafarabadi is a breed of buffalo."],
        answer: "Jafarabadi",
      },
      practiceSet: [
        { prompt: "Is Murrah a breed of cow or of buffalo?", answer: "Buffalo" },
        { prompt: "Name two foreign breeds of cow.", answer: "Jersey and Holstein Friesian (or Brown Swiss)" },
        { prompt: "Name a cow breed of Maharashtra.", answer: "Khillari (or Dangi, Devni, Gaolao, Red Kandhari)" },
        { prompt: "What is a hybrid cow?", answer: "A cross between an Indian breed and a foreign breed of cow" },
      ],
      pyqExampleId: "8ce8d58b-5507-4e8b-a4e8-b310838aa12b",
      traps: [
        {
          title: "Calling Murrah a cow",
          body: "Murrah is a buffalo, and so are Mehsana and Surti. Sahiwal, Gir, Devni and Dangi are cows.",
        },
        {
          title: "Thinking every Indian breed name is a cow",
          body: "Nagpuri and Pandharpuri come from Maharashtra but are buffaloes. Check the short buffalo list first.",
        },
      ],
    },
  ],
};
