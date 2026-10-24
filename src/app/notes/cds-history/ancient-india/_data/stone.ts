import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_STONE_NOTE: SubtopicNote = {
  subtopicName: "Stone Age and Chalcolithic Cultures",
  title: "Stone Age and Chalcolithic Cultures",
  oneLineDefinition:
    "How historians study the distant past, the tools and sites of the Old, Middle and New Stone Ages, and the copper-using farming cultures of Rajasthan and Maharashtra.",
  whyItMatters:
    "Twelve questions, all from 2020 onward and ten of them from 2023 or later, so this is one of the newest favourites in the paper. Most ask where a site is or what a tool word means, which a short table answers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-palaeolithic",
      name: "Studying the past and Palaeolithic tools",
      intuition:
        "Before writing, the only record of people is what they left behind: stone tools, bones, pits and paintings. " +
        "Historians sort the Stone Age into periods by the kind of tool and the way it was made, but no region followed exactly the same path.",
      definition:
        "- The Stone Age is split into the **Palaeolithic** (Old), **Mesolithic** (Middle) and **Neolithic** (New) periods, told apart by the **type and technology of the stone tools**.\n" +
        "- Tools **varied from region to region**, and the periods did not unfold in one neat line across the whole subcontinent.\n" +
        "- The **Levallois technique** is a Middle Palaeolithic method: a core is shaped first so that a flake of a planned size and shape can be struck off it.\n" +
        "- A **blade** is a flake tool more than **twice as long as it is wide**.\n" +
        "- **Isampur** in Gulbarga district of Karnataka was a Palaeolithic tool factory beside a small seasonal stream, the **Kamta Halla**.\n" +
        "- An **anthropologist** studies human societies and cultures from the oldest times to the present. An **archaeologist** works from material remains, a **palaeontologist** from fossils and a **geologist** from rocks.\n" +
        "- **Alexander Cunningham**, the first Director-General of the Archaeological Survey of India, identified the site of ancient **Taxila** using the accounts of Chinese pilgrims.",
      table: {
        columns: ["Term or name", "What it is"],
        rows: [
          {
            cells: ["Levallois technique", "A Middle Palaeolithic way of making flake tools from a prepared core"],
            noteAmber: "CDS 2023 (II): it has nothing to do with Harappan pottery.",
            pyqExampleId: "95c8e410-0ef9-4399-909f-7c4c2c056e41",
          },
          {
            cells: ["Blade", "A flake tool more than twice as long as it is wide"],
            pyqExampleId: "fa58f6a8-8e43-4301-8788-3fc0b31517a6",
          },
          { cells: ["Isampur", "Palaeolithic tool factory in Gulbarga district, Karnataka, beside the Kamta Halla stream"] },
          {
            cells: ["Anthropology", "The study of human societies and cultures from the oldest times to the present"],
            pyqExampleId: "dc8a40cc-83d0-4cb8-a653-82b927f82e48",
          },
          {
            cells: ["Alexander Cunningham", "First Director-General of the Archaeological Survey; identified Taxila"],
            pyqExampleId: "45457201-7387-4dc4-9562-b1c63880cab7",
          },
        ],
      },
      pyqExampleId: "d6325fe0-9732-4a25-b247-2a382c1a587e",
      selfCheckExample: {
        prompt: "What is the difference between a stone blade and the Levallois technique?",
        steps: [
          "A blade is a SHAPE of tool: a flake more than twice as long as it is wide.",
          "The Levallois technique is a METHOD: the core is shaped first, then a flake of planned size is struck off.",
        ],
        answer: "A blade is a kind of tool; Levallois is a way of making flake tools from a prepared core.",
      },
      practiceSet: [
        { prompt: "Which kind of scholar studies human societies and cultures from the oldest times to the present?", answer: "An anthropologist" },
        { prompt: "Who identified the site of ancient Taxila?", answer: "Alexander Cunningham" },
        { prompt: "In which state is the Palaeolithic tool site of Isampur?", answer: "Karnataka" },
        { prompt: "What does a palaeontologist study?", answer: "Fossils" },
      ],
      traps: [
        {
          title: "Levallois is a stone-tool method, not pottery",
          body: "The Levallois technique is a Middle Palaeolithic way of striking flakes from a prepared core. An option linking it to Harappan pottery is wrong.",
        },
        {
          title: "Cunningham found Taxila, Marshall dug it",
          body: "Alexander Cunningham identified the site of Taxila. John Marshall excavated it much later, so he is the wrong answer to who identified it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-mesolithic",
      name: "Mesolithic sites and rock art",
      intuition:
        "In the Middle Stone Age people made tiny stone tools called microliths and began to keep animals. " +
        "They also painted the walls of rock shelters, and some of those shelters were found in surprising ways.",
      definition:
        "- The Mesolithic is the age of **microliths**: very small stone tools, often set into wood or bone handles.\n" +
        "- **Bagor** on the Kothari river in **Bhilwara district, Rajasthan** is one of the best documented Mesolithic sites, with early evidence of keeping animals.\n" +
        "- **Adamgarh** (Madhya Pradesh) and **Birbhanpur** (West Bengal) are other Mesolithic microlith sites.\n" +
        "- The first rock paintings in India were reported at **Sohagighat** in the Kaimur hills of Uttar Pradesh by **Archibald Carlleyle** in the 1860s.\n" +
        "- **Bhimbetka**, near **Bhopal**, was found by **V.S. Wakankar**, who saw the rocks from a train between Bhopal and Itarsi and got off to explore.\n" +
        "- The **Vikramkhol** cave, an inscribed rock shelter, is in **Jharsuguda district of Odisha**.",
      table: {
        columns: ["Site", "Where", "Known for"],
        rows: [
          { cells: ["Bagor", "Bhilwara district, Rajasthan", "A long Mesolithic record; early keeping of animals"] },
          { cells: ["Adamgarh", "Madhya Pradesh", "Mesolithic microliths"] },
          { cells: ["Birbhanpur", "West Bengal", "Mesolithic microliths"] },
          { cells: ["Bhimbetka", "Near Bhopal, Madhya Pradesh", "Painted rock shelters, found by V.S. Wakankar"] },
          { cells: ["Sohagighat", "Kaimur hills, Uttar Pradesh", "First rock paintings reported in India, by Archibald Carlleyle"] },
          {
            cells: ["Vikramkhol", "Jharsuguda district, Odisha", "An inscribed rock shelter"],
            pyqExampleId: "8a36d1b4-d5d6-414e-a224-ab4d9bde9fb3",
          },
        ],
      },
      pyqExampleId: "08ebdbc3-cdfd-4171-b0a8-8420955393f1",
      selfCheckExample: {
        prompt: "Who first reported rock paintings in India, and who found the Bhimbetka shelters?",
        steps: [
          "The first report came from Sohagighat in the Kaimur hills, in the 1860s.",
          "Bhimbetka was spotted much later from a train near Bhopal.",
        ],
        answer: "Archibald Carlleyle reported the first paintings; V.S. Wakankar found Bhimbetka.",
      },
      practiceSet: [
        { prompt: "In which state is the Mesolithic site of Adamgarh?", answer: "Madhya Pradesh" },
        { prompt: "What are microliths?", answer: "Very small stone tools of the Mesolithic" },
        { prompt: "In which district of Odisha is the Vikramkhol cave?", answer: "Jharsuguda" },
        { prompt: "Near which city are the Bhimbetka rock shelters?", answer: "Bhopal" },
      ],
      traps: [
        {
          title: "Carlleyle, not Burns, at Sohagighat",
          body: "The first rock paintings in India were reported at Sohagighat by Archibald Carlleyle. An option giving the credit to another explorer is wrong.",
        },
        {
          title: "Bagor is in Rajasthan",
          body: "Bagor is in Bhilwara district of Rajasthan. Bhimbetka and Adamgarh are the Madhya Pradesh sites, so do not move Bagor there with them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-neolithic",
      name: "Neolithic sites",
      intuition:
        "In the New Stone Age people polished their stone tools, farmed, herded cattle and lived in villages. " +
        "Each region adapted to its own climate: pits against the Kashmir cold, cattle pens in the dry south.",
      definition:
        "- Neolithic tools were **ground and polished**, and people **farmed and herded** in settled villages.\n" +
        "- **Burzahom** and **Gufkral** in the **Kashmir valley** had **pit dwellings** dug into the ground against the cold. At Burzahom dogs were buried with their owners.\n" +
        "- The southern Neolithic is known for **ash mounds**, heaps of burnt cattle dung at old cattle pens. **Utnur** in Telangana is the best known.\n" +
        "- **Piklihal**, **Maski** and **Tekkalakota** in Karnataka are other southern Neolithic sites.\n" +
        "- **Chirand** in Bihar is a Neolithic site known for its bone tools.",
      table: {
        columns: ["Site", "Region", "Known for"],
        rows: [
          { cells: ["Burzahom", "Kashmir valley", "Pit dwellings; dogs buried with their owners"] },
          { cells: ["Gufkral", "Kashmir valley", "Pit dwellings"] },
          {
            cells: ["Utnur", "Telangana", "Ash mounds of the southern Neolithic"],
            noteAmber: "CDS 2026 (I): Utnur was the Neolithic site; Bhimbetka, Adamgarh and Birbhanpur were the other options.",
            pyqExampleId: "395b32e8-f1e2-438a-9e61-0292eab2132a",
          },
          { cells: ["Piklihal, Maski, Tekkalakota", "Karnataka", "Southern Neolithic villages"] },
          { cells: ["Chirand", "Bihar", "Neolithic bone tools"] },
        ],
      },
      pyqExampleId: "262810e9-7790-4845-933d-159c5afd3a6c",
      selfCheckExample: {
        prompt: "What are the ash mounds of the southern Neolithic, and which site is famous for them?",
        steps: [
          "Herders kept cattle in pens and burnt the dung that piled up there.",
          "The burnt heaps survive as mounds of ash.",
        ],
        answer: "Mounds of burnt cattle dung at old cattle pens; Utnur in Telangana.",
      },
      practiceSet: [
        { prompt: "In which state is the Neolithic site of Chirand?", answer: "Bihar" },
        { prompt: "How were Neolithic stone tools finished, compared with earlier ones?", answer: "They were ground and polished" },
        { prompt: "Which animal was buried with its owner at Burzahom?", answer: "The dog" },
        { prompt: "Name a southern Neolithic site in Karnataka.", answer: "Piklihal, Maski or Tekkalakota" },
      ],
      traps: [
        {
          title: "Pit houses belong to Kashmir",
          body: "The deep pit dwellings were at Burzahom and Gufkral in the Kashmir valley. Southern sites such as Utnur are known for ash mounds, not pit houses.",
        },
        {
          title: "Bhimbetka is not a Neolithic answer",
          body: "Bhimbetka is famous for Palaeolithic and Mesolithic rock shelters, and Adamgarh and Birbhanpur are Mesolithic. When CDS asks for a Neolithic site, look for Burzahom, Utnur or Chirand.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-chalcolithic",
      name: "Chalcolithic cultures",
      intuition:
        "Chalcolithic means copper and stone: farming villages that used a little copper beside their stone tools. " +
        "CDS asks two of them, one in Rajasthan and one in Maharashtra, and wants you to know their rivers.",
      definition:
        "- **Chalcolithic** cultures used **copper** along with stone tools, and lived by settled farming.\n" +
        "- The **Ahar** or **Banas** culture of south-east Rajasthan lies along the **Banas** and its tributary the **Berach**, around Udaipur. It worked copper and made black-and-red pottery.\n" +
        "- The **Jorwe** culture covers almost all of **Maharashtra except the coastal Konkan**. Its core zone was the **Pravara and Godavari valleys**.\n" +
        "- Large Jorwe sites such as **Daimabad** and **Inamgaon** show **settled farming**, not shifting cultivation.",
      table: {
        columns: ["Culture", "Region", "Key fact"],
        rows: [
          { cells: ["Ahar or Banas", "Banas and Berach valleys, south-east Rajasthan", "Copper working; black-and-red pottery"] },
          {
            cells: ["Jorwe", "Almost all of Maharashtra except the Konkan coast", "Core in the Pravara and Godavari valleys; sites Daimabad and Inamgaon"],
            noteAmber: "CDS 2024 (I): the large Jorwe sites show settled farming, not shifting agriculture.",
            pyqExampleId: "a95e97ac-b2ad-47db-adb6-1ac1022f258a",
          },
        ],
      },
      pyqExampleId: "a001e1da-befa-4aea-9944-501f550153fb",
      selfCheckExample: {
        prompt: "Which Chalcolithic culture had its core in the Pravara and Godavari valleys, and did its big sites practise shifting farming?",
        steps: [
          "The Pravara and Godavari flow through Maharashtra, the home of the Jorwe culture.",
          "Sites such as Inamgaon were lived in for a long time, with fields farmed year after year.",
        ],
        answer: "The Jorwe culture; its large sites show settled farming, not shifting farming.",
      },
      practiceSet: [
        { prompt: "What does the word Chalcolithic mean?", answer: "Copper and stone" },
        { prompt: "Name a large Jorwe site in Maharashtra.", answer: "Daimabad or Inamgaon" },
        { prompt: "What kind of pottery is linked with the Ahar culture?", answer: "Black-and-red pottery" },
      ],
      traps: [
        {
          title: "Ahar is Rajasthan, Jorwe is Maharashtra",
          body: "The Ahar culture lies on the Banas and Berach in Rajasthan. The Krishna and Tungabhadra valleys belong to the southern Neolithic, not to Ahar.",
        },
      ],
    },
  ],
};
