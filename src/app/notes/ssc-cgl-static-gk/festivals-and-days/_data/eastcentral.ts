import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_EASTCENTRAL_NOTE: SubtopicNote = {
  subtopicName: "Festivals of East and Central India",
  title: "Festivals of East and Central India",
  oneLineDefinition:
    "Odisha's Rath Yatra, Nuakhai and Raja Parba, the festivals of Bihar and West Bengal, the tribal festivals of Jharkhand, and those of Chhattisgarh and Madhya Pradesh.",
  whyItMatters:
    "18 questions in the bank, 10 of them from the 2025 shifts, and those 10 went deep: a tribal festival's ritual, its priest, its symbol. So beyond the state, each row below gives the one ritual detail SSC has asked.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfdec-odisha",
      name: "Odisha",
      intuition:
        "Odisha's festivals follow its two great themes: Lord Jagannath at Puri and the rice harvest of the west. Any chariot, any Jagannath, any new-rice question begins in Odisha.",
      definition:
        "The facts:\n" +
        "- The **Rath Yatra** of **Puri** carries three deities in three chariots: **Lord Jagannath**, his elder brother **Balabhadra** (Balarama) and his sister **Subhadra**, from the Jagannath temple to the **Gundicha temple**. It begins on the second day of the bright half of **Ashadha**.\n" +
        "- **Nuakhai** is the harvest festival of **western Odisha**, welcoming the **new rice**. In **Sambalpur** the first grain (nabanna) is offered to **Maa Samaleswari**, the town's presiding goddess.\n" +
        "- **Raja Parba** is a three-day festival in mid-June celebrating **womanhood** and the **earth**.\n" +
        "- **Bali Jatra** at **Cuttack** recalls Odisha's old sea trade with Bali.",
      table: {
        columns: ["Festival", "Where", "One fact"],
        rows: [
          { cells: ["Rath Yatra", "Puri", "Jagannath, Balabhadra and Subhadra; to the Gundicha temple"] },
          { cells: ["Nuakhai", "Western Odisha", "New rice; first offered to Maa Samaleswari at Sambalpur"] },
          { cells: ["Raja Parba", "Odisha", "Three days in mid-June; womanhood and the earth"] },
          { cells: ["Bali Jatra", "Cuttack", "Odisha's old sea voyages to Bali"] },
        ],
      },
      pyqExampleId: "725f3c4e-fe5a-4337-9627-5f4e0d69d489",
      selfCheckExample: {
        prompt: "To which temple do the chariots of the Puri Rath Yatra travel?",
        steps: ["The three chariots leave the Jagannath temple.", "They go to the Gundicha temple."],
        answer: "The Gundicha temple",
      },
      practiceSet: [
        { prompt: "Who is Lord Jagannath's elder brother in the Rath Yatra?", answer: "Balabhadra" },
        { prompt: "Which harvest festival of western Odisha welcomes the new rice?", answer: "Nuakhai" },
        { prompt: "In which month of the year is Raja Parba held?", answer: "June" },
        { prompt: "In which city is the Bali Jatra held?", answer: "Cuttack" },
      ],
      traps: [
        {
          title: "Balabhadra, not Krishna's friends",
          body: "The three chariots carry **Jagannath**, **Balabhadra** and **Subhadra**. Sudama, Arjuna and Hanuman are not part of the Rath Yatra trio.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdec-bihar",
      name: "Bihar and West Bengal",
      intuition:
        "Bihar's festivals are of the Sun and of Mithila's folk heroes; Bengal's are of the Goddess and of Tagore's Santiniketan.",
      definition:
        "The facts:\n" +
        "- **Chhath Puja**, in Kartika, is the main festival of **Bihar** (also Jharkhand and eastern Uttar Pradesh). It is dedicated to **Surya** and his consort **Usha**, thanking them for sustaining life on earth.\n" +
        "- The **Festival of Salhesh** in **Mithila**, Bihar, honours the folk hero Salhesh: a priest called the **Bhagat** leads it and performers called **Manarias** act out his legend.\n" +
        "- The **Sonepur Mela**, at the meeting of the Ganga and the Gandak, is Bihar's great **cattle fair** at Kartik Purnima.\n" +
        "- **Durga Puja** of **Kolkata** entered UNESCO's list of intangible heritage in **2021**.\n" +
        "- The **Poush Mela** is held every December (the month of Poush) at **Santiniketan** in Birbhum district, **West Bengal**, a tradition begun by the **Tagore** family.\n" +
        "- The **Gangasagar Mela**, on Sagar Island, West Bengal, is a holy dip at Makar Sankranti.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Chhath Puja", "Bihar", "Surya and Usha; Kartika"] },
          { cells: ["Festival of Salhesh", "Bihar", "Mithila; a Bhagat leads, Manarias act the legend"] },
          { cells: ["Sonepur Mela", "Bihar", "Cattle fair at Kartik Purnima"] },
          { cells: ["Durga Puja", "West Bengal", "UNESCO intangible heritage, 2021"] },
          { cells: ["Poush Mela", "West Bengal", "Santiniketan, December; begun by the Tagores"] },
          { cells: ["Gangasagar Mela", "West Bengal", "Holy dip on Sagar Island at Makar Sankranti"] },
        ],
      },
      pyqExampleId: "7260f00b-517c-4613-86c2-ad03ef445007",
      selfCheckExample: {
        prompt: "To which god and his consort is Chhath Puja dedicated?",
        steps: ["Chhath is offered to the setting and rising sun.", "It honours Surya and his consort Usha."],
        answer: "Surya and Usha",
      },
      practiceSet: [
        { prompt: "At which place is the Poush Mela held?", answer: "Santiniketan, West Bengal" },
        { prompt: "In which year did UNESCO list Kolkata's Durga Puja as intangible heritage?", answer: "2021" },
        { prompt: "What are the performers who act out Salhesh's legend called?", answer: "Manarias" },
        { prompt: "Where is the Gangasagar Mela held?", answer: "Sagar Island, West Bengal" },
      ],
      traps: [
        {
          title: "Chhath honours the Sun",
          body: "**Chhath** is for **Surya** and **Usha**. Vishwakarma Puja (the divine architect) and other options are different festivals.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdec-jharkhand",
      name: "Jharkhand's tribal festivals",
      intuition:
        "Jharkhand's tribal year turns on trees and crops: the Sal tree in spring, the Karam tree in the monsoon, the new harvest in winter. Each festival is named after one of them.",
      definition:
        "The facts:\n" +
        "- **Karma** (Karam) is the festival of the **Karam tree**, held on the Ekadashi of the bright half of **Bhadrapada** across **Jharkhand**, Chhattisgarh and Odisha: a branch of the tree is worshipped.\n" +
        "- **Jawa** is the festival of **unmarried tribal girls**, held with Karam: they sow seeds in baskets and tend the sprouts as a prayer for **fertility** and a good home. SSC's key: the **green melon** they offer stands for a **son and fertility**.\n" +
        "- **Sarhul** is the spring festival of the **Sal** tree's flowers.\n" +
        "- **Tusu** (Tusu Parab) is the harvest festival of the month of **Poush**, centred on the **Bundu, Tamar and Raidih** area; it ends at Makar Sankranti.\n" +
        "- **Sohrai** is a festival of **cattle** after the harvest.",
      table: {
        columns: ["Festival", "When", "One fact"],
        rows: [
          { cells: ["Sarhul", "Spring", "Flowers of the Sal tree"] },
          { cells: ["Karma (Karam)", "Bhadrapada", "A branch of the Karam tree is worshipped"] },
          { cells: ["Jawa", "With Karam", "Unmarried girls; sprouting seeds; fertility"] },
          { cells: ["Sohrai", "After the harvest", "Cattle are honoured"] },
          { cells: ["Tusu", "Poush, ending at Makar Sankranti", "Harvest; Bundu, Tamar and Raidih"] },
        ],
      },
      pyqExampleId: "1acc797a-f8f8-4b56-a92f-58f871639c7a",
      selfCheckExample: {
        prompt: "Which tribal festival of Jharkhand celebrates the flowering of the Sal tree?",
        steps: ["Karam is the tree of the monsoon festival.", "The spring festival of the Sal tree is Sarhul."],
        answer: "Sarhul",
      },
      practiceSet: [
        { prompt: "Which tree is worshipped in the Karma festival?", answer: "The Karam tree" },
        { prompt: "Tusu is the harvest festival of which Hindu month?", answer: "Poush" },
        { prompt: "Around which area of Jharkhand is the Tusu festival centred?", answer: "Bundu, Tamar and Raidih" },
        { prompt: "Sohrai honours which animals?", answer: "Cattle" },
      ],
      traps: [
        {
          title: "Jawa sits inside Karma",
          body: "**Jawa** is the girls' festival held **during** Karam; **Karma** is the main festival itself. A question about what the girls celebrate wants Jawa.",
        },
        {
          title: "Sarhul is Sal, Karma is Karam",
          body: "**Sarhul** is for the **Sal** tree in spring. **Karma** is for the **Karam** tree in Bhadrapada.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdec-central",
      name: "Chhattisgarh and Madhya Pradesh",
      intuition:
        "Bastar in Chhattisgarh keeps its own versions of all-India festivals: a Dussehra that lasts weeks, a Rath Yatra with bamboo guns. Western Madhya Pradesh adds the Bhil spring markets before Holi.",
      definition:
        "The facts:\n" +
        "- **Bastar Dussehra** (Chhattisgarh) lasts about **75 days** and honours **Goddess Danteshwari**, not Rama.\n" +
        "- **Goncha** is **Bastar's Rath Yatra**. Devotees fire the **tupki**, a hollow **bamboo** gun, with small wild **goncha fruits** as pellets. The Rath Yatra begins on the second day (Dwitiya) of the bright half of Ashadha.\n" +
        "- **Madai** is a travelling tribal fair of Chhattisgarh.\n" +
        "- **Bhagoria** is the spring festival of the **Bhil and Bhilala** tribes of western **Madhya Pradesh** (Jhabua, Alirajpur): its markets run through the **seven days before Holika Dahan**.\n" +
        "- The palanquin procession of **Baba Dharnath** in **Dhar** (Madhya Pradesh) is called the **Chhabina**.\n" +
        "- **Pola**, held by farmers of Maharashtra, Chhattisgarh and Madhya Pradesh (such as Balaghat), honours **bulls and oxen**: they are bathed, decorated and worshipped.",
      table: {
        columns: ["Festival", "State", "One fact"],
        rows: [
          { cells: ["Bastar Dussehra", "Chhattisgarh", "About 75 days; Goddess Danteshwari"] },
          { cells: ["Goncha", "Chhattisgarh", "Bastar's Rath Yatra; tupki bamboo guns"] },
          { cells: ["Madai", "Chhattisgarh", "Travelling tribal fair"] },
          { cells: ["Bhagoria", "Madhya Pradesh", "Bhil and Bhilala; the week before Holika Dahan"] },
          { cells: ["Chhabina", "Madhya Pradesh", "Baba Dharnath's procession at Dhar"] },
          { cells: ["Pola", "Maharashtra, Chhattisgarh, Madhya Pradesh", "Bulls and oxen are worshipped"] },
        ],
      },
      pyqExampleId: "08ec6d01-e8f6-493a-ae5b-dcfa462cc5eb",
      selfCheckExample: {
        prompt: "Which goddess does Bastar Dussehra honour?",
        steps: ["Bastar's Dussehra is not about Rama's victory.", "It honours Goddess Danteshwari, the region's presiding deity."],
        answer: "Goddess Danteshwari",
      },
      practiceSet: [
        { prompt: "What is the bamboo gun fired during Goncha called?", answer: "The tupki" },
        { prompt: "Which animals are worshipped at Pola?", answer: "Bulls and oxen" },
        { prompt: "What is the procession of Baba Dharnath in Dhar called?", answer: "The Chhabina" },
        { prompt: "Which tribes celebrate Bhagoria?", answer: "The Bhil and Bhilala" },
        { prompt: "About how many days does Bastar Dussehra last?", answer: "About 75 days" },
      ],
      traps: [
        {
          title: "Bastar Dussehra is not ten days",
          body: "**Bastar Dussehra** runs about **75 days** and honours **Danteshwari**. Only the name is shared with the ten-day Dussehra.",
        },
        {
          title: "The Rath Yatra starts on Dwitiya",
          body: "The Rath Yatra (and Goncha) begins on Ashadha Shukla **Dwitiya**; the return journey is on **Dashami**, eight days later. A statement that starts it on Dashami has the dates reversed.",
        },
        {
          title: "Pola is for bulls",
          body: "**Pola** worships **bulls and oxen**, the animals that plough. It is not cow worship, a rain prayer or a market.",
        },
      ],
    },
  ],
};
