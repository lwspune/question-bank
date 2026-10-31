import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_EARLY_NOTE: SubtopicNote = {
  subtopicName: "Prehistory, Harappa and the Vedic Age",
  title: "Prehistory, Harappa and the Vedic Age",
  oneLineDefinition:
    "The Stone Ages in order, what the Harappan cities are known for, the four Vedas and the six Vedangas, and the words that describe early Vedic society.",
  whyItMatters:
    "Twenty-four questions in the bank: seven from the 2023 shifts, six from the 2024 shifts and 11 from the 2025 shifts, 17 of them EASY. Each one rests on a single fact: which Veda holds what, what a Vedic word meant, what a Harappan town made. Two short tables and one list cover the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschanea-harappa",
      name: "Stone Ages and Harappan cities",
      intuition:
        "First the order of the ages, then the cities. Each Harappan town is remembered for one thing it did better than the rest, and SSC asks that one thing.",
      definition:
        "The ages, oldest first: **Palaeolithic** (Old Stone Age), **Mesolithic** (Middle Stone Age), **Neolithic** (New Stone Age), then the **Metal Age**. Mesolithic hunters fixed tiny stone blades (**microliths**) onto shafts to make **barbed spears**, arrows and harpoons.\n\n" +
        "The Harappan (Indus Valley) civilisation:\n" +
        "- **Mohenjodaro**: each house drained into a **covered street drain**; the Great Bath.\n" +
        "- **Chanhudaro**: a **bead-making** town, the only Harappan city with no citadel.\n" +
        "- **Lothal**: a dockyard. **Kalibangan**: a ploughed field.\n" +
        "- **Seals**: mostly of **steatite**, a local soft stone, with an **animal** (often the unicorn) and a line of the **undeciphered** script. The **Pashupati** seal shows a horned male figure.\n" +
        "- **Crops**: mainly **wheat and barley**. Women wore ornaments of gold, silver, copper and bronze.\n" +
        "- There is **no evidence of sati** in the Harappan civilisation.",
      table: {
        columns: ["Site or feature", "Known for"],
        rows: [
          { cells: ["Mohenjodaro", "Covered street drains; the Great Bath"], pyqExampleId: "0979f38e-2aaf-4ffb-9b72-20499258b3f7" },
          { cells: ["Chanhudaro", "Bead-making; no citadel"] },
          { cells: ["Lothal", "Dockyard"] },
          { cells: ["Kalibangan", "Ploughed field"] },
          { cells: ["Seals", "Steatite; animal motifs; undeciphered script"], pyqExampleId: "e6bcd4fc-de4c-4b5e-9aa8-e2f866b3382d" },
        ],
      },
      pyqExampleId: "39c7ad27-e66a-48c6-9b46-1cfcd53055a4",
      selfCheckExample: {
        prompt: "Put the prehistoric ages in order and say what the Mesolithic people used to hunt.",
        steps: [
          "The order is Palaeolithic, Mesolithic, Neolithic, then the Metal Age.",
          "Mesolithic hunters fixed microliths onto shafts to make barbed spears, arrows and harpoons.",
        ],
        answer: "Palaeolithic, Mesolithic, Neolithic, Metal Age; barbed spears and arrows tipped with microliths.",
      },
      practiceSet: [
        { prompt: "Which Harappan site had a dockyard?", answer: "Lothal" },
        { prompt: "From which stone were most Harappan seals made?", answer: "Steatite" },
        { prompt: "What were the two main crops of the Harappans?", answer: "Wheat and barley" },
        { prompt: "Which Harappan city is known for its Great Bath?", answer: "Mohenjodaro" },
      ],
      traps: [
        {
          title: "Mesolithic sits between the other two",
          body: "The middle age is the **Mesolithic**. An option that puts the **Neolithic** before it reverses the order.",
        },
        {
          title: "No sati at Harappa",
          body: "Gold ornaments, the Pashupati seal and wheat and barley are all attested. **Sati** is not, so it is the false statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanea-vedas",
      name: "The four Vedas and the six Vedangas",
      intuition:
        "Each Veda has one job: hymns, melodies, sacrificial formulas or spells. The Vedangas are the six subjects you needed to read and use the Vedas, and SSC slips a philosophy school among them as the odd one out.",
      definition:
        "The four Vedas:\n" +
        "- **Rigveda**: hymns of praise (a **rik** is a hymn). Its **Samhita**, the compiled body of hymns, has **10 mandalas** and 1,028 hymns. The **battle of ten kings (Dasarajna)** is in its seventh mandala: King **Sudas** won it on the Parushni (Ravi).\n" +
        "- **Samaveda**: melodies for chanting.\n" +
        "- **Yajurveda**: formulas and procedures for **sacrifices**.\n" +
        "- **Atharvaveda**: **spells and charms** against evil spirits and disease.\n\n" +
        "The **six Vedangas**: **Shiksha** (phonetics), **Kalpa** (ritual), **Vyakarana** (grammar), **Nirukta** (etymology), **Chhandas** (metre) and **Jyotisha** (astronomy). **Vaisheshika** is not one of them: it is a school of philosophy (darshana), founded by Kanada.",
      table: {
        columns: ["Text", "What it holds"],
        rows: [
          { cells: ["Rigveda", "Hymns of praise; 10 mandalas"], pyqExampleId: "ff1b7a7d-5d1e-4ff8-bf7b-32fd5ce5e49e" },
          { cells: ["Samaveda", "Melodies for chanting"] },
          { cells: ["Yajurveda", "Sacrificial formulas and procedures"] },
          { cells: ["Atharvaveda", "Spells and charms against evil and disease"], pyqExampleId: "5b47a448-3810-4955-bc47-0c3b65e6eb3f" },
          { cells: ["Vedangas (six)", "Shiksha, Kalpa, Vyakarana, Nirukta, Chhandas, Jyotisha"], pyqExampleId: "1f3fcc9c-7645-4554-a6c3-38139ede738f" },
        ],
      },
      pyqExampleId: "35c2560b-0622-4ba8-9312-e9467edeb18e",
      selfCheckExample: {
        prompt: "Which of these is NOT a Vedanga: Nirukta, Chhandas, Nyaya, Shiksha? Say what the odd one is.",
        steps: [
          "The six Vedangas are Shiksha, Kalpa, Vyakarana, Nirukta, Chhandas and Jyotisha.",
          "Nyaya is not on the list: it is one of the six schools of philosophy.",
        ],
        answer: "Nyaya, a school of philosophy.",
      },
      practiceSet: [
        { prompt: "How many mandalas does the Rigveda have?", answer: "10" },
        { prompt: "Which Veda holds spells and charms against disease?", answer: "The Atharvaveda" },
        { prompt: "In which Veda is the battle of ten kings described?", answer: "The Rigveda" },
        { prompt: "How many Vedangas are there?", answer: "Six" },
        { prompt: "What does the word Samhita mean for a Veda?", answer: "A compiled collection of its hymns and mantras" },
      ],
      traps: [
        {
          title: "Sama is melody, Yajur is sacrifice",
          body: "The **Samaveda** is for **chanting**. The **sacrificial formulas** are in the **Yajurveda**. The two are easy to swap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanea-society",
      name: "Early Vedic society and its words",
      intuition:
        "Rigvedic people counted wealth in cows, so many of their words come from go, the cow. Their society was a tribe of three sections, which later hardened into four varnas and four stages of life.",
      definition:
        "Words and units:\n" +
        "- **Jana**: the tribe, the main social unit. The **rajan** was its chief. **Sabha** and **samiti** were assemblies.\n" +
        "- **Gomat**: a wealthy man, one who owned many cows. **Gavishti** (search for cows) meant war. **Duhitri** (one who milks) meant daughter.\n" +
        "- Rigvedic society had **three sections**: **priests**, **warriors** and **ordinary people (vish)**. Craftsmen were not a separate section.\n" +
        "- Later came **four varnas**: Brahmanas (priests), Kshatriyas (warriors), **Vaishyas** (farmers, herders and traders) and Shudras.\n" +
        "- The **four ashramas**, in order: **Brahmacharya** (student), **Grihastha** (householder), **Vanaprastha** (retiring to the forest), **Sanyasa** (renunciation).\n\n" +
        "**Sapta Sindhu**, the land of seven rivers, had the Indus, the five Punjab rivers and the Saraswati. The Rigvedic names: **Vitasta** (Jhelum), **Askini** (Chenab), **Parushni** (Ravi), **Vipash** (Beas), **Shutudri** (Sutlej).",
      table: {
        columns: ["Vedic name", "Modern river"],
        rows: [
          { cells: ["Vitasta", "Jhelum"], pyqExampleId: "ab948cdb-12f3-4f34-b632-cb44c6711278" },
          { cells: ["Askini", "Chenab"] },
          { cells: ["Parushni", "Ravi"] },
          { cells: ["Vipash", "Beas"] },
          { cells: ["Shutudri", "Sutlej"] },
        ],
      },
      pyqExampleId: "8b0c0012-6b16-461b-84b2-b52efe5d6dbd",
      selfCheckExample: {
        prompt: "A Vedic word list reads gomat, gavishti, duhitri. What did each mean, and what do they share?",
        steps: [
          "Gomat meant a rich man, one with many cows; gavishti meant war, the search for cows; duhitri meant daughter, the one who milks.",
          "All three come from go, the cow, because cattle were the measure of wealth.",
        ],
        answer: "Rich man, war, daughter: all built on go, the cow.",
      },
      practiceSet: [
        { prompt: "What was the main social unit of the Rigvedic people?", answer: "The jana (tribe)" },
        { prompt: "Which varna did farming, cattle-rearing and trade in the later Vedic period?", answer: "The Vaishyas" },
        { prompt: "What was the Rigvedic name of the Ravi?", answer: "Parushni" },
        { prompt: "Was the samiti a varna or an assembly?", answer: "An assembly" },
        { prompt: "Which river of central India is NOT one of the Sapta Sindhu: Sutlej, Shipra or Beas?", answer: "The Shipra" },
      ],
      traps: [
        {
          title: "Rajan is a chief, jana is the unit",
          body: "The **rajan** led the tribe, but the main social unit was the **jana** itself.",
        },
        {
          title: "Samiti is not a varna",
          body: "The four varnas are Brahmanas, Kshatriyas, Vaishyas and Shudras. The **samiti** and **sabha** were **assemblies**.",
        },
      ],
    },
  ],
};
