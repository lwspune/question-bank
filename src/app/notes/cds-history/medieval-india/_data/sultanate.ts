import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_SULTANATE_NOTE: SubtopicNote = {
  subtopicName: "The Delhi Sultanate",
  title: "The Delhi Sultanate: Sultans, Sieges and Regional Courts",
  oneLineDefinition:
    "The Delhi Sultans from Iltutmish to Firuz Shah, the Mongol threat, the books written at their courts, the siege engine and the stirrup, and the 15th century courts of Mewar, Gwalior and Kashmir.",
  whyItMatters:
    "Eleven CDS questions, eight of them HARD and none before 2020. Siege engines and the stirrup have each come twice, in 2022 (II) and 2025 (I). The rest name a work and ask who wrote it or who was its patron.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-sultans",
      name: "Sultans, the Mongols and the court writers",
      intuition:
        "The early Sultans had two problems: their own nobles and the Mongols beyond the Indus. " +
        "Iltutmish built a group of forty loyal Turkish nobles; a later Sultan, Balban, found them too strong and broke them. Poets and historians at these courts left the books CDS asks about.",
      definition:
        "- **Iltutmish** (1211 to 1236) created the **Turkan-i-Chihalgani**, 'the Forty', a group of Turkish nobles.\n" +
        "- **Balban** (1266 to 1287) raised the Sultan's dignity and **finally broke the power of the Forty**.\n" +
        "- **Chenghiz Khan** reached the **Indus in 1221**, chasing the Khwarazmian prince Jalaluddin Mangbarni, but **did not cross** into India. Later Mongol commanders such as Tair Bahadur and **Qutlugh Khwaja** (who attacked Delhi in 1299, under Alauddin Khalji) did.\n" +
        "- **Amir Khusrau** (1253 to 1325) wrote the **Khazain-ul-Futuh** on Alauddin's conquests and, in **1318**, the **Nuh Sipihr**, which praises India's climate, its languages (Sanskrit above all), its music and even its animals.\n" +
        "- **Firuz Shah Tughlaq** (1351 to 1388) moved an **Ashokan pillar from Topra** to Delhi. A painting of the moving survives in the **Sirat-i-Firuz Shahi**.",
      table: {
        columns: ["Time", "Person", "Fact asked"],
        rows: [
          {
            cells: ["1221", "Chenghiz Khan", "Reached the Indus but did not cross it"],
            noteAmber: "CDS 2020 (I): the one Mongol leader in the list who did not cross the Indus.",
            pyqExampleId: "0c7d2591-0fea-4daa-b857-060825556033",
          },
          { cells: ["1211 to 1236", "Iltutmish", "Created the Forty (Turkan-i-Chihalgani)"] },
          {
            cells: ["1266 to 1287", "Balban", "Broke the power of the Forty"],
            noteAmber: "CDS 2020 (I): Balban, not Iltutmish or Alauddin.",
            pyqExampleId: "ac65451c-c064-47c9-80d5-4af0e4a67de3",
          },
          {
            cells: ["1318", "Amir Khusrau", "Nuh Sipihr: praise of India, its languages, music and animals"],
            noteAmber: "CDS 2025 (I): the work is the Nuh Sipihr.",
            pyqExampleId: "31f64433-cd4c-48e9-9c7f-7818b97012e3",
          },
          {
            cells: ["1351 to 1388", "Firuz Shah Tughlaq", "Moved the Topra pillar; painting in the Sirat-i-Firuz Shahi"],
            noteAmber: "CDS 2021 (II): the illustration is in the Sirat-i-Firuz Shahi.",
            pyqExampleId: "c6891b9a-ec52-4214-aeef-c5ba50f21b9d",
          },
        ],
      },
      pyqExampleId: "ac65451c-c064-47c9-80d5-4af0e4a67de3",
      selfCheckExample: {
        prompt: "A list of Mongol leaders includes Chenghiz Khan, Tair Bahadur and Qutlugh Khwaja. Which one never crossed the Indus to attack India?",
        steps: [
          "Chenghiz Khan came to the Indus in 1221 chasing Jalaluddin Mangbarni, then turned back.",
          "Tair Bahadur and Qutlugh Khwaja were later commanders who did raid across the river.",
        ],
        answer: "Chenghiz Khan",
      },
      practiceSet: [
        { prompt: "Which Mongol commander attacked Delhi in 1299, in the reign of Alauddin Khalji?", answer: "Qutlugh Khwaja" },
        { prompt: "Which Sultan had an Ashokan pillar moved from Topra to Delhi?", answer: "Firuz Shah Tughlaq" },
        { prompt: "Which work of Amir Khusrau describes Alauddin Khalji's conquests?", answer: "The Khazain-ul-Futuh" },
        { prompt: "In the Nuh Sipihr, which Indian language does Amir Khusrau praise most?", answer: "Sanskrit" },
      ],
      traps: [
        {
          title: "Iltutmish made the Forty, Balban broke them",
          body: "The Turkan-i-Chihalgani was created by **Iltutmish**. It was **Balban** who finally destroyed its power. Alauddin Khalji came later and did not deal with the Forty.",
        },
        {
          title: "Sirat, not Tarikh",
          body: "The painting of the Topra pillar is in the **Sirat-i-Firuz Shahi**. The **Tarikh-i-Firuz Shahi** is a different book, Barani's history, and it is the usual wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-warfare",
      name: "Siege engines and the stirrup",
      intuition:
        "Before guns, a fort wall was broken by hurling heavy stones at it. And a rider in armour stayed on his horse only if he could brace his feet. " +
        "The Turkish armies brought both tools to north India, and CDS asks about each of them by name.",
      definition:
        "- A **manjaniq** (also spelt munjaniq) was a **stone-throwing siege engine**, a **mangonel** or catapult, used to batter fort walls. It was not a gun: gunpowder artillery came much later.\n" +
        "- The **stirrup** in Indian evidence: a broad, probably **wooden** stirrup in **Khajuraho** sculpture (about the 10th century); a **ring-stirrup** on the **Konark** horse (about 1250); the **iron stirrup** in the **Delhi Sultans' armies from the 13th century**, brought by Turkish cavalry.\n" +
        "- The iron stirrup let an armoured rider **sit firmly** on his horse, and let him **charge with a lance held tight** to his body without being thrown off by the shock.",
      table: {
        columns: ["Device", "When and where", "What it did"],
        rows: [
          { cells: ["Wooden stirrup", "Khajuraho sculpture, about the 10th century", "A broad foot-rest for the rider"] },
          { cells: ["Ring-stirrup", "Konark horse, about 1250", "A ring for the foot"] },
          {
            cells: ["Iron stirrup", "Delhi Sultans' armies, from the 13th century", "Firm seat; a lance charge without being unhorsed"],
            noteAmber: "Asked twice: CDS 2022 (II) and 2025 (I). Every statement offered was true both times.",
            pyqExampleId: "256e7071-aa9e-4e2e-9aae-2373a76d7b09",
          },
          {
            cells: ["Manjaniq (munjaniq)", "Sultanate sieges", "Hurled stones at fort walls: a mangonel or catapult"],
            noteAmber: "Asked twice: CDS 2022 (II) and 2025 (I).",
            pyqExampleId: "4d0a0ad8-c341-416f-a29f-e73e75fff295",
          },
        ],
      },
      pyqExampleId: "b61a417d-0493-4c02-9851-b146a3289b55",
      selfCheckExample: {
        prompt: "Why did the iron stirrup make the cavalry charge with a lance possible?",
        steps: [
          "With his feet braced in stirrups, the rider sat firmly in the saddle.",
          "So when the lance struck, the shock pushed against the braced rider instead of throwing him off.",
        ],
        answer: "It gave the rider a firm seat, so he could hold the lance tight and take the shock of impact",
      },
      practiceSet: [
        { prompt: "Which sculpture of about 1250 shows a ring-stirrup?", answer: "The horse at Konark" },
        { prompt: "What was the stirrup in the Khajuraho sculptures probably made of?", answer: "Wood" },
        { prompt: "From which century did the Delhi Sultans' armies use the iron stirrup?", answer: "The 13th century" },
        { prompt: "Whose cavalry brought the iron stirrup into north India?", answer: "The Turkish armies of the Sultanate" },
      ],
      traps: [
        {
          title: "A manjaniq is not a cannon",
          body: "The manjaniq threw **stones**. Options such as cannon, gun carriage or a device for loading field guns are wrong, because it belongs to the age before gunpowder.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-courts",
      name: "Courts of the 15th century: Mewar, Gwalior and Kashmir",
      intuition:
        "As the Sultanate weakened, regional kings built courts full of poets, musicians and scholars. " +
        "Three of them are asked: a scholar king of Mewar, a music-loving king of Gwalior, and a tolerant Sultan of Kashmir.",
      definition:
        "- **Rana Kumbha** of **Mewar** (1433 to 1468) was a scholar king. He wrote the **Rasikapriya**, a **commentary on Jayadeva's Gitagovinda**, and is said to have written **four dramas** using provincial languages. He raised a great victory tower at **Chittor**.\n" +
        "- **Raja Man Singh Tomar** of **Gwalior** (1486 to 1516) had the **Man Kautuhal**, a work on music, prepared at his court. Gwalior became the home of the **dhrupad** style.\n" +
        "- **Zain-ul-Abidin** of **Kashmir** (1420 to 1470), remembered as **Budshah**, was tolerant and patronised Sanskrit learning. **Jonaraja** and then **Shrivara** carried Kalhana's **Rajatarangini** forward, and **Bhattavatara** wrote the **Zainavilas**, a history of Kashmir's rulers.",
      table: {
        columns: ["Ruler", "Kingdom and reign", "Work at the court"],
        rows: [
          {
            cells: ["Zain-ul-Abidin", "Kashmir, 1420 to 1470", "Rajatarangini continued by Jonaraja and Shrivara; Zainavilas by Bhattavatara"],
            pyqExampleId: "557399e5-2c13-41dd-91d3-f639afcd899d",
          },
          {
            cells: ["Rana Kumbha", "Mewar, 1433 to 1468", "Rasikapriya, a commentary on the Gitagovinda; four dramas"],
            pyqExampleId: "34925d31-70da-48af-a0ca-a8241e7038f6",
          },
          {
            cells: ["Raja Man Singh Tomar", "Gwalior, 1486 to 1516", "Man Kautuhal, a work on music"],
            noteAmber: "CDS 2024 (I): prepared under Raja Man Singh of Gwalior, not Tansen.",
            pyqExampleId: "3e048e04-20c3-421f-9604-16145177e8e0",
          },
        ],
      },
      pyqExampleId: "3e048e04-20c3-421f-9604-16145177e8e0",
      selfCheckExample: {
        prompt: "Who carried Kalhana's Rajatarangini forward in the time of Zain-ul-Abidin?",
        steps: ["Kalhana's chronicle stopped in the 12th century.", "Under Zain-ul-Abidin, Jonaraja continued it, and his pupil Shrivara continued it further."],
        answer: "Jonaraja, and after him Shrivara",
      },
      practiceSet: [
        { prompt: "Rana Kumbha's Rasikapriya is a commentary on which poem?", answer: "Jayadeva's Gitagovinda" },
        { prompt: "By what name is Sultan Zain-ul-Abidin of Kashmir remembered?", answer: "Budshah" },
        { prompt: "At which fort city did Rana Kumbha raise a great victory tower?", answer: "Chittor" },
        { prompt: "Of which kingdom was Rana Kumbha the ruler?", answer: "Mewar" },
      ],
      traps: [
        {
          title: "The patron, not the singer",
          body: "The Man Kautuhal was prepared under **Raja Man Singh Tomar**. **Tansen** learnt music in the Gwalior tradition but lived later, at Akbar's court; he did not prepare this work.",
        },
      ],
    },
  ],
};
