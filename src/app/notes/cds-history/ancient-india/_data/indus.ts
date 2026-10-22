import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_INDUS_NOTE: SubtopicNote = {
  subtopicName: "Harappan Civilization",
  title: "Harappan Civilization",
  oneLineDefinition:
    "The Harappan sites and the states they lie in, what the cities, seals and crafts show, and how the Harappans farmed and ate.",
  whyItMatters:
    "Eleven questions, eight of them MODERATE. Site location is the favourite: Dholavira and Bhirrana each appear in three questions, and the 2026 (II) paper asked two Harappan map questions. Learn the map and most of this page is done.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-harappan-sites",
      name: "Harappan sites and where they are",
      intuition:
        "Harappan sites spread from Sindh and Punjab in Pakistan to Haryana, Rajasthan and Gujarat in India. " +
        "CDS gives you a site and asks for its state or district, so treat this as a map to learn by heart.",
      definition:
        "- **Dholavira** stands on **Khadir (Kadir) island** in the Rann of Kutch, **Gujarat**. Its citadel and lower town have large **cisterns and reservoirs** for storing water.\n" +
        "- **Rakhigarhi** is in **Hisar district, Haryana**, one of the largest Harappan sites.\n" +
        "- **Bhirrana** and **Banawali** are in **Fatehabad district, Haryana**. **Farmana** is in **Rohtak district, Haryana**.\n" +
        "- **Lakhmirwala** is in Mansa district of **Punjab** (India). **Ganweriwala** is in the **Cholistan** desert of **Punjab, Pakistan**.\n" +
        "- **Kot Diji** in Sindh lies close to **Mohenjo-daro** and gives its name to the Early Harappan Kot Dijian phase.\n" +
        "- The **Rohri and Sukkur hills** of Sindh were factory sites where chert blades were made in bulk and sent to other settlements.\n" +
        "- The **Bhogavo** is a river of the **Saurashtra** peninsula in Gujarat.",
      table: {
        columns: ["Site", "Where", "Known for"],
        rows: [
          {
            cells: ["Dholavira", "Khadir island, Rann of Kutch, Gujarat", "Cisterns and reservoirs in the citadel and lower town"],
            noteAmber: "CDS 2022 (II): Dholavira, not Mohenjodaro, was the city of reservoirs.",
            pyqExampleId: "99917039-9d91-4b80-adcd-51a4f8d2f386",
          },
          { cells: ["Rakhigarhi", "Hisar district, Haryana", "One of the largest Harappan sites"] },
          { cells: ["Bhirrana", "Fatehabad district, Haryana", "A site in the Ghaggar plain"] },
          { cells: ["Banawali", "Fatehabad district, Haryana", "A terracotta model of a plough"] },
          { cells: ["Farmana", "Rohtak district, Haryana", "A large Harappan burial ground"] },
          { cells: ["Ganweriwala", "Cholistan, Punjab (Pakistan)", "One of the largest Harappan cities"] },
          {
            cells: ["Kot Diji", "Sindh, near Mohenjo-daro", "Gives its name to the Early Harappan Kot Dijian phase"],
            pyqExampleId: "5de4a514-d8da-4678-9a0b-1fb1d0f4c2f1",
          },
          {
            cells: ["Rohri and Sukkur hills", "Sindh", "Factory sites for chert blades"],
            pyqExampleId: "38432a61-0b1b-4168-9750-3c87ee03e485",
          },
          {
            cells: ["Bhogavo", "Saurashtra, Gujarat", "A river of the Harappan region in Saurashtra"],
            pyqExampleId: "0dc723ce-f7c4-44fe-b4ad-7bacd57e6d75",
          },
        ],
      },
      pyqExampleId: "b9d841f4-5b6f-47a4-9af2-9a853d74319e",
      selfCheckExample: {
        prompt: "Which Harappan city stored water in large cisterns and reservoirs in both its citadel and its lower town?",
        steps: [
          "The Rann of Kutch is dry for much of the year, so water had to be stored.",
          "The city on Khadir island cut reservoirs into its citadel and lower town.",
        ],
        answer: "Dholavira, on Khadir island in the Rann of Kutch.",
      },
      practiceSet: [
        { prompt: "Near which major Harappan city is Kot Diji?", answer: "Mohenjo-daro" },
        { prompt: "From which hills in Sindh were chert blades sent to Harappan settlements?", answer: "The Rohri and Sukkur hills" },
        { prompt: "In which district of Haryana is Rakhigarhi?", answer: "Hisar" },
        { prompt: "Which Harappan site in Haryana gave a terracotta model of a plough?", answer: "Banawali" },
      ],
      traps: [
        {
          title: "Farmana is in Haryana",
          body: "Farmana is in Rohtak district of Haryana. An option placing it in Uttar Pradesh is the wrong pair.",
        },
        {
          title: "Two Punjabs",
          body: "Lakhmirwala is in Punjab in India; Ganweriwala is in the Cholistan desert of Punjab in Pakistan. Read which Punjab the option means.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-harappan-towns",
      name: "Cities, script, metals and seals",
      intuition:
        "The Harappans built the first cities of the subcontinent and wrote a script we still cannot read. " +
        "They lived in the Bronze Age: copper and bronze, but no iron at all.",
      definition:
        "- The Harappan culture saw the **first cities** in the subcontinent.\n" +
        "- Its **script** was written from **right to left** and has **not been deciphered**.\n" +
        "- The Harappans used **copper and bronze**. They **did not know iron**, which came into use in India much later.\n" +
        "- They made the earliest known **stone sculpture** of the subcontinent, such as the bearded figure from Mohenjo-daro called the **priest-king**, and bronze figures such as the **dancing girl**.\n" +
        "- **Seals** show the **unicorn** (the most common), the **humped bull**, **elephant**, **rhinoceros**, **tiger**, **buffalo** and **gharial** (a crocodile). The **lion never appears**.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          { cells: ["Cities", "The first cities of the subcontinent"] },
          { cells: ["Script", "Written right to left; still not read"] },
          { cells: ["Metals", "Copper and bronze; no iron at all"] },
          { cells: ["Sculpture", "Earliest stone sculpture, such as the priest-king; the bronze dancing girl"] },
          {
            cells: ["Seal animals", "Unicorn, humped bull, elephant, rhinoceros, tiger, buffalo, gharial"],
            noteAmber: "CDS 2025 (I): the lion was the animal that does not appear.",
            pyqExampleId: "c29f0e24-e76e-4d89-9ece-6be47daad468",
          },
        ],
      },
      pyqExampleId: "d9423195-6d64-4117-947e-328f19c2d965",
      selfCheckExample: {
        prompt: "Name three animals shown on Harappan seals and one big cat that never appears on them.",
        steps: [
          "The seals show tame and wild animals of the Indus plains and rivers.",
          "The big cat that does appear is the tiger.",
        ],
        answer: "For example the unicorn, humped bull and elephant; the lion never appears.",
      },
      practiceSet: [
        { prompt: "Which animal is the most common on Harappan seals?", answer: "The unicorn" },
        { prompt: "What is the bearded stone figure from Mohenjo-daro usually called?", answer: "The priest-king" },
        { prompt: "Has the Harappan script been deciphered?", answer: "No" },
      ],
      traps: [
        {
          title: "No iron in Harappan India",
          body: "The Harappans used copper and bronze only. Any statement crediting them with iron, for tools or for sculpture, is false.",
        },
        {
          title: "Tiger yes, lion no",
          body: "The big cat on Harappan seals is always the tiger. The lion does not appear anywhere in Harappan art.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-harappan-farming",
      name: "Farming and food",
      intuition:
        "Cities need farmers. The Harappans ploughed with oxen, grew several crops at once and stored water for their fields, " +
        "and new studies of food remains keep adding to what we know they ate.",
      definition:
        "- A **ploughed field** was found at **Kalibangan** in Rajasthan, from the **Early Harappan** level. It has two sets of furrows at right angles, which suggests **two crops were grown together**.\n" +
        "- **Terracotta models of the plough** come from **Cholistan** and **Banawali**, and bulls on seals suggest **oxen** pulled it.\n" +
        "- Crops included **wheat, barley, lentil, chickpea and sesame**; **millets** are found in Gujarat.\n" +
        "- **Canals** were found at **Shortughai** in Afghanistan, and **reservoirs** at Dholavira.\n" +
        "- The Harappans were the **first to grow cotton** in Eurasia, and remains show they ate **turmeric, ginger and banana**.",
      table: {
        columns: ["Evidence", "Where", "What it shows"],
        rows: [
          { cells: ["Ploughed field", "Kalibangan, Rajasthan", "Furrows at right angles: two crops in one field"] },
          { cells: ["Terracotta plough models", "Cholistan and Banawali", "The plough was in use"] },
          { cells: ["Canals", "Shortughai, Afghanistan", "Irrigation"] },
          {
            cells: ["Cotton", "Harappan region", "The earliest cotton growing in Eurasia"],
            noteAmber: "CDS 2026 (II): both the cotton and the turmeric, ginger and banana statements were correct.",
            pyqExampleId: "deccd94b-444d-4513-b029-b37a1fbb2fe7",
          },
          { cells: ["Grains", "Many sites", "Wheat, barley, lentil, chickpea, sesame; millets in Gujarat"] },
        ],
      },
      pyqExampleId: "fda9a2a4-b681-4e96-942d-4e3abf2c527f",
      selfCheckExample: {
        prompt: "Name two kinds of evidence that the Harappans stored or carried water for farming.",
        steps: [
          "Look for water works, not just crops.",
          "One is a canal far to the north-west; the other is a city of reservoirs in Gujarat.",
        ],
        answer: "Canals at Shortughai in Afghanistan and reservoirs at Dholavira.",
      },
      practiceSet: [
        { prompt: "Which two places gave terracotta models of a plough?", answer: "Cholistan and Banawali" },
        { prompt: "Name two grains the Harappans grew.", answer: "Wheat and barley (also lentil, chickpea, sesame)" },
        { prompt: "Which fibre crop did the Harappans grow first in Eurasia?", answer: "Cotton" },
      ],
      traps: [
        {
          title: "Kalibangan's field is Early Harappan",
          body: "The ploughed field at Kalibangan lies at the Early Harappan level, below the later city. It is not Mature or Late Harappan.",
        },
      ],
    },
  ],
};
