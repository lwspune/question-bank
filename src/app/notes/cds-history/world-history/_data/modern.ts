import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_WO_MODERN_NOTE: SubtopicNote = {
  subtopicName: "Industrial Revolution and the Modern World",
  title: "Industrial Revolution and the Modern World",
  oneLineDefinition:
    "What the Industrial Revolution was and the machines that started it, then four facts from the twentieth century: China's Guomindang, the atomic bombs, Hong Kong and a war cemetery in Cairo.",
  whyItMatters:
    "Eight CDS questions from 2016 to 2026, four of them on the Industrial Revolution, including the newest two (2024 and 2026). Those ask what the revolution changed, as statements to judge, so learn its features, not just its inventors.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshiwo-industrial",
      name: "The Industrial Revolution: where, what and how",
      intuition:
        "Before it, cloth was spun and woven by hand at home. Then machines driven first by water and later by steam did the work in factories, and most people stopped farming for a living. It began in Britain because Britain had coal, iron, capital and colonies to supply raw cotton and buy the cloth.",
      definition:
        "What to know:\n" +
        "- **Where and when**: **Britain**, from the second half of the 18th century. Germany and the United States industrialised later, in the 19th century.\n" +
        "- **What changed**: power-driven **machines replaced handicrafts**; production moved into **large factories**; most workers moved from farming to industry.\n" +
        "- **Raw materials**: the factories needed cotton, rubber and minerals from abroad, so the industrial countries came to **depend on colonies** and other lands for raw materials and markets.\n" +
        "- **Iron and steam**: better **iron smelting** (Abraham Darby used coke, 1709), later **steel** (Henry Bessemer, 1856), and James Watt's improved **steam engine** (1769).",
      table: {
        columns: ["Machine", "Inventor and what it did"],
        rows: [
          { cells: ["Flying shuttle (1733)", "John Kay: wove cloth faster"] },
          { cells: ["Spinning jenny (1764)", "James Hargreaves: spun many threads at once, but weak ones"] },
          {
            cells: ["Water frame (1769)", "Richard Arkwright: driven by a water wheel, spun strong yarn"],
            noteAmber: "CDS 2016 (II): the water frame produced strong threads of yarn.",
            pyqExampleId: "b4922a52-0917-4283-94d6-add4008b75fc",
          },
          { cells: ["Spinning mule (1779)", "Samuel Crompton: strong and fine yarn"] },
          { cells: ["Power loom (1785)", "Edmund Cartwright: weaving by machine"] },
          { cells: ["Improved steam engine (1769)", "James Watt: steam power for mills and mines"] },
          { cells: ["Rocket locomotive (1829)", "George Stephenson: the railway age"] },
        ],
      },
      pyqExampleId: "e9a77af5-2a2b-4f29-8aa8-caaae8c06150",
      practiceSet: [
        { prompt: "Who invented the spinning jenny?", answer: "James Hargreaves" },
        { prompt: "Whose improved steam engine powered the mills of the Industrial Revolution?", answer: "James Watt's" },
        { prompt: "Which fuel did Abraham Darby use to smelt iron?", answer: "Coke" },
        { prompt: "Who invented the power loom?", answer: "Edmund Cartwright" },
      ],
      traps: [
        {
          title: "It began in Britain, not Germany",
          body: "A statement that the first Industrial Revolution began in **Germany** is false. It began in **Britain** in the second half of the 18th century; Germany industrialised in the 19th.",
        },
        {
          title: "The water frame made yarn",
          body: "The name makes it sound like irrigation. It was a **spinning** machine, called a water frame because a **water wheel** drove it.",
        },
        {
          title: "Dependence on raw materials is a feature, not a mistake",
          body: "A statement that industrial countries came to **depend on other countries for raw materials** is true. Their factories used far more cotton, rubber and minerals than they could grow or mine at home.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshiwo-twentieth",
      name: "Twentieth-century facts: China, the bomb, Hong Kong",
      intuition:
        "These questions are single facts from the last century: what a party promised, what a bomb was called, which territory went back to China. Learn each one with the near-miss it is usually paired with.",
      definition:
        "Four facts and their near-misses:\n" +
        "- **Guomindang** (Chinese Nationalist Party), led by **Sun Yat-sen**: its four great needs of the people were **clothing, food, housing and transportation**. Sun Yat-sen's Three Principles were nationalism, democracy and the people's livelihood.\n" +
        "- **Atomic bombs, 1945**: **Little Boy**, a uranium fission bomb, on **Hiroshima** (6 August); **Fat Man**, a plutonium fission bomb, on **Nagasaki** (9 August). The first test was **Trinity**, in New Mexico (16 July).\n" +
        "- **Hong Kong** returned from Britain to China on **1 July 1997** under **one country, two systems**. Macau followed, from Portugal, in 1999.\n" +
        "- The **Heliopolis** Commonwealth War Grave Cemetery is in **Cairo**, Egypt. Many Indian soldiers of the World Wars are buried or remembered there.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["The Guomindang's four great needs", "Clothing, food, housing and transportation"],
            noteAmber: "CDS 2016 (II): education and health care are not among the four.",
            pyqExampleId: "de78f80f-7503-4dfe-8d00-0986d4e7b4f9",
          },
          {
            cells: ["Little Boy", "Uranium fission bomb dropped on Hiroshima"],
            noteAmber: "CDS 2020 (II): Little Boy was the Hiroshima bomb.",
            pyqExampleId: "50426779-6877-46f6-bb7f-7aa0b09021ac",
          },
          { cells: ["Fat Man", "Plutonium fission bomb dropped on Nagasaki"] },
          {
            cells: ["One country, two systems (1997)", "Hong Kong, from Britain"],
            noteAmber: "CDS 2018 (I): Hong Kong became part of China in 1997.",
            pyqExampleId: "1e1283cc-b1cc-4394-a74e-edeccf7dfc43",
          },
          { cells: ["One country, two systems (1999)", "Macau, from Portugal"] },
          {
            cells: ["Heliopolis war cemetery", "Cairo, Egypt"],
            noteAmber: "CDS 2023 (II): the cemetery is in Cairo.",
            pyqExampleId: "bdcdbce3-56d0-4ae1-8995-515c4e85bc4b",
          },
        ],
      },
      pyqExampleId: "50426779-6877-46f6-bb7f-7aa0b09021ac",
      practiceSet: [
        { prompt: "Which bomb was dropped on Nagasaki in August 1945?", answer: "Fat Man, a plutonium fission bomb" },
        { prompt: "From which country did Macau pass to China in 1999?", answer: "Portugal" },
        { prompt: "Who led the Guomindang and gave it the Three Principles?", answer: "Sun Yat-sen" },
        { prompt: "Where was the first atomic bomb test, Trinity, held?", answer: "New Mexico, United States" },
      ],
      traps: [
        {
          title: "Both 1945 bombs were fission bombs",
          body: "An option calling the Nagasaki bomb a **fusion** bomb is wrong. Fat Man used plutonium fission; fusion (hydrogen) bombs came only in the 1950s.",
        },
        {
          title: "Hong Kong 1997, Macau 1999",
          body: "Both returned to China under **one country, two systems**, but Hong Kong came from **Britain** in **1997** and Macau from **Portugal** in **1999**. Tibet and Xinjiang never came under that formula.",
        },
        {
          title: "Heliopolis sounds Greek but is in Egypt",
          body: "Heliopolis is a Greek name (city of the sun), so Athens tempts. The war cemetery stands in **Cairo**, in a district called Heliopolis.",
        },
        {
          title: "The four great needs are material ones",
          body: "Options swap in **education** or **health care**. The Guomindang's four great needs were **clothing, food, housing and transportation**.",
        },
      ],
    },
  ],
};
