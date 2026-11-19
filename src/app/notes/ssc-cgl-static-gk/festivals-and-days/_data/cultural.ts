import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFD_CULTURAL_NOTE: SubtopicNote = {
  subtopicName: "State Dance, Music and Cultural Festivals",
  title: "State Dance, Music and Cultural Festivals",
  oneLineDefinition:
    "The arts festivals that state governments run at temples, monuments and tea towns: Madhya Pradesh's four, and those of Nagaland, Gujarat, Chhattisgarh, Maharashtra, Assam and others.",
  whyItMatters:
    "11 questions in the bank, 7 of them from the 2023 shifts. Four were about Madhya Pradesh alone (Lokrang, Lokranjan, the Tansen festival and Khajuraho), more than any other state in these questions. Pair each festival with its monument or city and the state is easy.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfdcu-mp",
      name: "Madhya Pradesh's festivals of the arts",
      intuition:
        "Madhya Pradesh holds its arts festivals at its famous places: classical dance at the Khajuraho temples, Hindustani music at Tansen's tomb in Gwalior, folk and tribal arts in Bhopal and Khajuraho. A festival at any of these places is Madhya Pradesh's.",
      definition:
        "The facts:\n" +
        "- The **Khajuraho Dance Festival** is held every February against the **Khajuraho temples**: a week of classical dance.\n" +
        "- The **Tansen Samaroh** is held every year in **Gwalior**, near **Tansen's tomb**, by the state's culture department through the Ustad Alauddin Khan Sangeet Evam Kala Academy.\n" +
        "- **Lokrang** is a five-day festival of folk and tribal arts in **Bhopal**, beginning every year on **26 January**.\n" +
        "- **Lokranjan** is a festival of folk and tribal dance held at **Khajuraho**.",
      table: {
        columns: ["Festival", "Place", "Art"],
        rows: [
          { cells: ["Khajuraho Dance Festival", "Khajuraho temples", "Classical dance, every February"] },
          { cells: ["Tansen Samaroh", "Gwalior, near Tansen's tomb", "Hindustani music"] },
          { cells: ["Lokrang", "Bhopal, from 26 January", "Folk and tribal arts, five days"] },
          { cells: ["Lokranjan", "Khajuraho", "Folk and tribal dance"] },
        ],
      },
      pyqExampleId: "f005ee3f-0c9d-4f59-ba18-2df332f7d291",
      selfCheckExample: {
        prompt: "In which city is the Tansen Samaroh held every year?",
        steps: ["The festival is held near the tomb of the singer Tansen.", "The tomb is in Gwalior, Madhya Pradesh."],
        answer: "Gwalior",
      },
      practiceSet: [
        { prompt: "On which date does the Lokrang festival begin every year?", answer: "26 January" },
        { prompt: "In which city is Lokrang held?", answer: "Bhopal" },
        { prompt: "At which place is the Lokranjan festival held?", answer: "Khajuraho" },
        { prompt: "Which state government organises the Tansen Samaroh?", answer: "Madhya Pradesh" },
      ],
      traps: [
        {
          title: "Lokrang and Lokranjan are both Madhya Pradesh's",
          body: "**Lokrang** (Bhopal) and **Lokranjan** (Khajuraho) sound alike and belong to the same state: **Madhya Pradesh**.",
        },
        {
          title: "Gwalior's festival is music, not dance",
          body: "The **Tansen Samaroh** at Gwalior is Hindustani **music**. The dance festival is at **Khajuraho**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfdcu-others",
      name: "Cultural festivals of other states",
      intuition:
        "Most of these festivals take the name of their place: Modhera, Sirpur, Banganga, Konark, Hampi, Majuli. Place the monument or town and you have the state.",
      definition:
        "The facts:\n" +
        "- The **Hornbill Festival**, the \"festival of festivals\", was started by the **Nagaland** government in **2000** to bring the tribes together. It is held from **1 to 10 December** at **Kisama Heritage Village** near **Kohima**. It is named after the **great hornbill**, a bird admired in Naga folklore for its alertness and **grandeur**.\n" +
        "- The **Modhera Dance Festival** (Uttarardh Mahotsav) is held at the **Sun Temple of Modhera**, **Mehsana** district, **Gujarat**. Gujarat also holds the **Rann Utsav** in Kutch.\n" +
        "- The **Sirpur National Dance and Music Festival** is held at **Sirpur**, an old site on the Mahanadi in Mahasamund district, **Chhattisgarh**.\n" +
        "- The **Banganga Festival** of music is held at the **Banganga Tank**, Malabar Hill, **Mumbai**. The **Elephanta Festival** is also in Mumbai.\n" +
        "- **Assam** holds the **Tea Festival** at **Jorhat**, home of the Tocklai Tea Research Institute, and the **Majuli Festival** every November on Majuli, the river island in the Brahmaputra.\n" +
        "- Others: the **Konark Dance Festival** (Odisha), **Hampi Utsav** (Karnataka), the **Mamallapuram Dance Festival** (Tamil Nadu), the **Taj Mahotsav** (Agra, Uttar Pradesh) and the **Sangai Festival** (Manipur), named after the brow-antlered deer.",
      table: {
        columns: ["Festival", "Place", "State"],
        rows: [
          { cells: ["Hornbill Festival", "Kisama, near Kohima; 1 to 10 December", "Nagaland"] },
          { cells: ["Modhera Dance Festival", "Sun Temple, Mehsana district", "Gujarat"] },
          { cells: ["Rann Utsav", "Kutch", "Gujarat"] },
          { cells: ["Sirpur National Dance and Music Festival", "Sirpur, Mahasamund district", "Chhattisgarh"] },
          { cells: ["Banganga Festival", "Banganga Tank, Mumbai", "Maharashtra"] },
          { cells: ["Elephanta Festival", "Mumbai", "Maharashtra"] },
          { cells: ["Tea Festival", "Jorhat", "Assam"] },
          { cells: ["Majuli Festival", "Majuli river island, November", "Assam"] },
          { cells: ["Konark Dance Festival", "Konark Sun Temple", "Odisha"] },
          { cells: ["Hampi Utsav", "Hampi", "Karnataka"] },
          { cells: ["Mamallapuram Dance Festival", "Mamallapuram", "Tamil Nadu"] },
          { cells: ["Taj Mahotsav", "Agra", "Uttar Pradesh"] },
          { cells: ["Sangai Festival", "Imphal", "Manipur"] },
        ],
      },
      pyqExampleId: "9700ef9d-de6a-4eb0-bb42-f8685d5895fc",
      selfCheckExample: {
        prompt: "In which district of Gujarat is the Modhera Dance Festival held?",
        steps: ["The festival is held at the Sun Temple of Modhera.", "Modhera is in Mehsana district."],
        answer: "Mehsana",
      },
      practiceSet: [
        { prompt: "In which city of Assam is the Tea Festival held?", answer: "Jorhat" },
        { prompt: "In which state is the Sirpur National Dance and Music Festival held?", answer: "Chhattisgarh" },
        { prompt: "In which city is the Banganga Festival held?", answer: "Mumbai" },
        { prompt: "In which month is the Majuli Festival held?", answer: "November" },
        { prompt: "In which state is the Konark Dance Festival held?", answer: "Odisha" },
        { prompt: "The Sangai Festival is named after which animal?", answer: "The sangai, the brow-antlered deer" },
      ],
      traps: [
        {
          title: "Jorhat, not Guwahati, for tea",
          body: "Assam's **Tea Festival** is at **Jorhat**, the tea town with the Tocklai institute, not at the capital Guwahati.",
        },
        {
          title: "Sirpur is in Chhattisgarh",
          body: "**Sirpur** lies on the Mahanadi in **Chhattisgarh**, which was part of Madhya Pradesh until 2000. Do not answer Madhya Pradesh.",
        },
        {
          title: "A Sun Temple festival needs its state",
          body: "**Modhera's** Sun Temple is in **Gujarat**; **Konark's** is in **Odisha**. Both hold dance festivals.",
        },
      ],
    },
  ],
};
