import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_VIJAYANAGARA_NOTE: SubtopicNote = {
  subtopicName: "The Vijayanagara Empire",
  title: "The Vijayanagara Empire: Amara-nayakas, Hampi and Visitors",
  oneLineDefinition:
    "How Vijayanagara was ruled through the amara-nayakas, the royal centre at Hampi and Krishnadeva Raya's court, and the foreign visitors who described the city.",
  whyItMatters:
    "Thirteen CDS questions, and ten of them only MODERATE, so this page pays off quickly. The amara-nayaka system alone was asked three times, and Krishnadeva Raya's Amuktamalyada twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-amaranayaka",
      name: "The amara-nayaka system and the walled city",
      intuition:
        "The rayas of Vijayanagara could not run a large empire from one city. So they handed out territories to military commanders, who collected the taxes and kept troops ready for the king. " +
        "The capital itself was built to survive a long siege.",
      definition:
        "- Vijayanagara was founded in **1336** by **Harihara and Bukka**; it was ruled in turn by the Sangama, Saluva, Tuluva and Aravidu dynasties.\n" +
        "- The **amara-nayaka system** was a **major political innovation** of Vijayanagara. Amara-nayakas were **military commanders** given **territories to govern** by the raya.\n" +
        "- They **collected taxes and dues** from peasants, craftspersons and traders, **kept part** for themselves and for a fixed contingent of **horses and elephants**, and also spent part on **temples and irrigation works**. They sent tribute to the king each year.\n" +
        "- Titles of the age: **Gajapati** (lord of elephants) for the rulers of **Odisha**, **Ashvapati** (lord of horses) for the **Deccan Sultans**, **Narapati** (lord of men) for the **rayas of Vijayanagara**.\n" +
        "- The fortifications **enclosed farmland** too, because a siege usually tried to **starve** the defenders into surrender.\n" +
        "- The empire's army was defeated at **Talikota (Rakshasi-Tangadi) in 1565**, and the city was sacked.",
      table: {
        columns: ["Fact", "Detail"],
        rows: [
          { cells: ["Founded", "1336, by Harihara and Bukka"] },
          {
            cells: ["Amara-nayakas", "Military commanders who governed territories and kept troops for the raya"],
            noteAmber: "Asked three times: CDS 2018 (II), 2021 (I) and 2025 (II).",
            pyqExampleId: "1eef2e30-c474-4b3c-9d51-98688c89c845",
          },
          {
            cells: ["Gajapati, Ashvapati, Narapati", "Rulers of Odisha, Deccan Sultans, rayas of Vijayanagara"],
            noteAmber: "CDS 2024 (II): all three pairs were correctly matched.",
            pyqExampleId: "d4ce784b-09b2-43ab-a643-665d9447aac7",
          },
          {
            cells: ["Fields inside the walls", "So the city could feed itself through a siege"],
            noteAmber: "CDS 2026 (II): to protect the farmland from a besieging army.",
            pyqExampleId: "434f7ab1-ce19-48f7-8245-cd453082c5be",
          },
          { cells: ["Battle of Talikota", "1565; the city was sacked"] },
        ],
      },
      pyqExampleId: "8a05c20a-4a2a-4a91-b3a0-6850aa5ec5ac",
      selfCheckExample: {
        prompt: "Why did the builders of Vijayanagara bring fields and canals inside the fortification walls?",
        steps: [
          "Medieval armies often surrounded a fort and waited for the food inside to run out.",
          "With farmland inside the walls, the city could keep growing food during a siege.",
        ],
        answer: "To protect the farmland so the city could not be starved out in a siege",
      },
      practiceSet: [
        { prompt: "Which rulers were called Gajapati, lord of elephants?", answer: "The rulers of Odisha" },
        { prompt: "Which rulers were called Ashvapati, lord of horses?", answer: "The Deccan Sultans" },
        { prompt: "Who founded Vijayanagara in 1336?", answer: "Harihara and Bukka" },
        { prompt: "In which battle was Vijayanagara defeated in 1565?", answer: "Talikota (Rakshasi-Tangadi)" },
      ],
      traps: [
        {
          title: "Commanders, not village chiefs",
          body: "Amara-nayakas were **military commanders** holding territory from the raya. Options calling them village chieftains, senior civil servants or tributary chiefs are wrong.",
        },
        {
          title: "Their share also kept temples",
          body: "Amara-nayakas **did** spend part of their revenue on temples and irrigation works. A statement saying they were not allowed to is the false one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-hampi",
      name: "Hampi and Krishnadeva Raya's court",
      intuition:
        "The ruins of Vijayanagara are at Hampi on the Tungabhadra. A royal centre with platforms and halls sits beside a sacred centre of temples. " +
        "Its greatest king, Krishnadeva Raya, was also a poet, and eight poets graced his court.",
      definition:
        "- **Colin Mackenzie**, an East India Company engineer who became the first Surveyor General of India, brought the **Hampi ruins** to light with the **first survey map in 1800**.\n" +
        "- The **Mahanavami Dibba** is the great stone **platform** in the royal centre from which the king led the rituals of the **Mahanavami** festival. Nearby are the **Lotus Mahal** and the **Hazara Rama** temple; the **Virupaksha** temple stands in the sacred centre.\n" +
        "- **Krishnadeva Raya** (1509 to 1529, Tuluva dynasty) wrote the **Amuktamalyada** in **Telugu**, a poem that is also a work on **statecraft**.\n" +
        "- His court poets, the **Ashtadiggajas**, included **Allasani Peddana**, **Nandi Timmana**, **Madayyagari Mallana**, **Dhurjati** and **Tenali Ramakrishna**.",
      table: {
        columns: ["Name", "What it is"],
        rows: [
          {
            cells: ["Mahanavami Dibba", "Platform for the king's rituals at the Mahanavami festival"],
            noteAmber: "CDS 2018 (I): the ritual platform of the Vijayanagara kings.",
            pyqExampleId: "4dd0fcc7-6596-470f-84d7-aa24978e866d",
          },
          { cells: ["Virupaksha temple", "The chief temple of the sacred centre"] },
          {
            cells: ["Amuktamalyada", "Krishnadeva Raya's Telugu work on statecraft"],
            noteAmber: "Asked twice: CDS 2022 (I) and 2023 (II). The language is Telugu.",
            pyqExampleId: "6c588bc5-4bc3-4e80-b8ce-93f65952c73d",
          },
          {
            cells: ["Ashtadiggajas", "Krishnadeva Raya's eight court poets, among them Peddana, Timmana, Mallana and Dhurjati"],
            pyqExampleId: "96bb7451-0ca8-4d49-9544-f7959dda5951",
          },
          {
            cells: ["Colin Mackenzie", "Brought the Hampi ruins to light with a survey map in 1800"],
            pyqExampleId: "190cf1c3-b7cc-4f98-8aed-ca2d9a69cd98",
          },
        ],
      },
      pyqExampleId: "4dd0fcc7-6596-470f-84d7-aa24978e866d",
      selfCheckExample: {
        prompt: "In which language did Krishnadeva Raya write the Amuktamalyada, and what is it about besides devotion?",
        steps: ["Krishnadeva Raya ruled from Vijayanagara and wrote in Telugu.", "The poem gives his views on kingship and how to rule."],
        answer: "Telugu; it is also a work on statecraft",
      },
      practiceSet: [
        { prompt: "Which East India Company officer prepared the first survey map of Hampi?", answer: "Colin Mackenzie" },
        { prompt: "Name two of Krishnadeva Raya's court poets.", answer: "Any two of: Allasani Peddana, Nandi Timmana, Madayyagari Mallana, Dhurjati, Tenali Ramakrishna" },
        { prompt: "Which temple is the chief temple of Hampi's sacred centre?", answer: "The Virupaksha temple" },
        { prompt: "To which dynasty did Krishnadeva Raya belong?", answer: "The Tuluva dynasty" },
      ],
      traps: [
        {
          title: "Mackenzie found Hampi, Prinsep read Brahmi",
          body: "The Hampi ruins were brought to light by **Colin Mackenzie**. James Prinsep deciphered the Brahmi script and William Jones founded the Asiatic Society; neither surveyed Hampi.",
        },
        {
          title: "Telugu, not Sanskrit or Kannada",
          body: "Vijayanagara is in Karnataka, which tempts Kannada. But the **Amuktamalyada** is in **Telugu**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-visitors",
      name: "Foreign visitors to Vijayanagara",
      intuition:
        "Vijayanagara was so large and rich that visitors from Italy, Persia and Portugal wrote about it. " +
        "CDS gives a name and asks which city it described, or slips in a traveller who came too early.",
      definition:
        "- **Marco Polo** (Venice) travelled in south India in the **1290s**, before Vijayanagara existed.\n" +
        "- **Niccolo de Conti** (Italy) visited about **1420**.\n" +
        "- **Abdur Razzaq**, envoy of the ruler of Persia (Shah Rukh), came in the **1440s**, by way of Calicut.\n" +
        "- **Domingo Paes** (Portugal) visited in the reign of **Krishnadeva Raya** and described the city and the **Mahanavami festival**.\n" +
        "- **Fernao Nuniz** (Portugal), a horse trader of the 1530s, wrote a history of the kingdom.",
      table: {
        columns: ["Visitor", "From", "When"],
        rows: [
          {
            cells: ["Marco Polo", "Venice", "1290s, before Vijayanagara was founded"],
            noteAmber: "CDS 2026 (II): the traveller who did NOT write about Vijayanagara.",
            pyqExampleId: "fc25d0c8-8f42-4fa3-bedb-c50d00abfa66",
          },
          { cells: ["Niccolo de Conti", "Italy", "About 1420"] },
          {
            cells: ["Abdur Razzaq", "Persia, envoy of Shah Rukh", "1440s, by way of Calicut"],
            pyqExampleId: "1919e871-f4cf-4db9-b4a4-28dc07782a32",
          },
          {
            cells: ["Domingo Paes", "Portugal", "Reign of Krishnadeva Raya"],
            noteAmber: "CDS 2021 (II): Paes described Vijayanagara.",
            pyqExampleId: "3c12418b-1416-4bde-b896-56b09e5308ab",
          },
          { cells: ["Fernao Nuniz", "Portugal", "1530s"] },
        ],
      },
      pyqExampleId: "fc25d0c8-8f42-4fa3-bedb-c50d00abfa66",
      selfCheckExample: {
        prompt: "In whose reign did Domingo Paes visit Vijayanagara, and which festival did he describe?",
        steps: ["Paes came in the early 16th century, the time of the empire's greatest king.", "He wrote about the royal rituals of the Mahanavami festival."],
        answer: "Krishnadeva Raya's reign; the Mahanavami festival",
      },
      practiceSet: [
        { prompt: "From which country did Fernao Nuniz come?", answer: "Portugal" },
        { prompt: "Whose envoy was Abdur Razzaq?", answer: "The ruler of Persia, Shah Rukh" },
        { prompt: "From which country did Niccolo de Conti come?", answer: "Italy" },
        { prompt: "What did Fernao Nuniz write about Vijayanagara?", answer: "A history of the kingdom" },
      ],
      traps: [
        {
          title: "Check the date before the name",
          body: "Vijayanagara was founded in **1336**. **Marco Polo** travelled in the 1290s, so he cannot have written about it, even though he visited south India.",
        },
      ],
    },
  ],
};
