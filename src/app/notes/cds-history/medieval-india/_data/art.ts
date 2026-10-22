import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_ART_NOTE: SubtopicNote = {
  subtopicName: "Art, Architecture and Science",
  title: "Art, Architecture and Science",
  oneLineDefinition:
    "Chola bronzes and the Thanjavur temple, the Sultanate and Mughal buildings of Delhi and Agra, Indo-Islamic building terms, and the astronomy and medicine of medieval India.",
  whyItMatters:
    "Ten CDS questions, seven of them HARD and eight since 2023, so this theme is growing. The Chola questions test the meaning of an image, part by part; the science questions are statement sets where each line must be checked.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-chola-art",
      name: "Chola bronzes and the Thanjavur temple",
      intuition:
        "Chola metal-workers cast images of the gods by the lost-wax method, and their Nataraja, Shiva as Lord of Dance, is the most famous Indian bronze. " +
        "Every hand and foot of the Nataraja means something, and CDS asks which part means what.",
      definition:
        "- The **Chola** period is known for the **beauty and technical skill** of its **bronze** images, cast by the **lost-wax** method. Their **iconography and style match** the stone images of the same temples.\n" +
        "- **Nataraja**: the **right leg** stands on **Apasmara**, the dwarf of ignorance. The **left leg** is raised in the **bhujangatrasita** pose; it stands for **tirobhava**, kicking away the veil of illusion. The **upper right hand** holds the **damaru** (drum) and the upper left hand holds fire. The **main right hand** is raised in **abhaya** (do not fear).\n" +
        "- **Rajaraja I's** Brihadishvara temple at **Thanjavur** shows Shiva most often as **Tripurantaka**, destroyer of the three cities.\n" +
        "- In **1931**, Chola **murals** were found in the temple's inner passage; one shows **Shiva as Yoga-Dakshinamurti**, the teacher.",
      table: {
        columns: ["Image or part", "What it shows"],
        rows: [
          {
            cells: ["Chola bronzes", "Finest metal images of India; same iconography as the stone images"],
            noteAmber: "CDS 2024 (II): both statements were correct.",
            pyqExampleId: "b034ea93-cddd-47a6-b6c8-8e41bd6e4ea6",
          },
          { cells: ["Nataraja's right leg", "Stands on Apasmara, the dwarf of ignorance"] },
          {
            cells: ["Nataraja's raised left leg", "Bhujangatrasita pose: tirobhava, kicking away illusion"],
            pyqExampleId: "980785cd-f9dc-4ef2-8121-8292a3284f68",
          },
          { cells: ["Nataraja's hands", "Upper right: damaru; upper left: fire; main right: abhaya"] },
          {
            cells: ["Brihadishvara, Thanjavur", "Shiva most often as Tripurantaka"],
            pyqExampleId: "868b77c8-4cdf-40f8-9ede-8c525cd8110e",
          },
          {
            cells: ["Thanjavur murals, found 1931", "Shiva as Yoga-Dakshinamurti"],
            noteAmber: "CDS 2024 (I): the Buddhist and Jain subjects in the options belong to other sites.",
            pyqExampleId: "1d0b8b6f-d74a-4e61-a8de-f2ee47bd99f9",
          },
        ],
      },
      pyqExampleId: "980785cd-f9dc-4ef2-8121-8292a3284f68",
      selfCheckExample: {
        prompt: "Which form of Shiva appears most often at Rajaraja Chola's temple at Thanjavur?",
        steps: ["The temple was built to proclaim a conquering king.", "So its panels favour Shiva as Tripurantaka, the warrior who destroyed three demon cities."],
        answer: "Tripurantaka",
      },
      practiceSet: [
        { prompt: "By what method were Chola bronzes cast?", answer: "The lost-wax method" },
        { prompt: "What painting of Shiva was found at the Thanjavur temple in 1931?", answer: "Shiva as Yoga-Dakshinamurti" },
        { prompt: "Did Chola bronze images follow the same iconography as their stone images?", answer: "Yes" },
        { prompt: "Who built the Brihadishvara temple at Thanjavur?", answer: "Rajaraja I" },
      ],
      traps: [
        {
          title: "Tirobhava is the raised leg",
          body: "Kicking away illusion (**tirobhava**) is shown by the **raised left leg**. The **right leg** stands on Apasmara. A statement linking tirobhava to the right leg is false.",
        },
        {
          title: "The drum is in an upper hand",
          body: "The **damaru** is held in the **upper right hand**. The **main right hand** gives abhaya, assurance, so 'the main right hand holds the damaru' is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-buildings",
      name: "Buildings and painting styles",
      intuition:
        "Delhi's monuments line up by dynasty: Slave, Tughlaq, Lodi, then the Mughals at Agra. Put the dynasties in order and the buildings fall into place. " +
        "Two more items are words: a building part and a school of painting.",
      definition:
        "- **Qutb Minar**: begun by **Qutbuddin Aibak** about **1199**, finished by **Iltutmish**.\n" +
        "- **Tughlaqabad Fort**: built by **Ghiyasuddin Tughlaq** in the **1320s**.\n" +
        "- **Bada Gumbad** in the Lodi Garden: **1490s**, reign of **Sikandar Lodi**.\n" +
        "- **Fatehpur Sikri**: built by **Akbar** from **1571**.\n" +
        "- A **pendentive** is the curved **triangular piece** in the corner between two walls that **carries a round dome** over a square room by passing its weight down to the arches.\n" +
        "- **Basohli** painting is a **Pahari** style of the hill states, known for **bold, intense colour**.",
      table: {
        columns: ["Building or term", "Builder or meaning", "Time"],
        rows: [
          {
            cells: ["Qutb Minar", "Begun by Qutbuddin Aibak, finished by Iltutmish", "About 1199 onward"],
            noteAmber: "CDS 2017 (II): the order is Qutb Minar, Tughlaqabad, Bada Gumbad, Fatehpur Sikri.",
            pyqExampleId: "254bea23-5e13-46c3-ae19-c671f78195fd",
          },
          { cells: ["Tughlaqabad Fort", "Ghiyasuddin Tughlaq", "1320s"] },
          { cells: ["Bada Gumbad, Lodi Garden", "Reign of Sikandar Lodi", "1490s"] },
          { cells: ["Fatehpur Sikri", "Akbar", "From 1571"] },
          {
            cells: ["Pendentive", "Triangular corner piece carrying a dome on its arches", "Indo-Islamic buildings"],
            noteAmber: "CDS 2026 (II): the bracket that joins the base of the dome to its arches.",
            pyqExampleId: "025d22b7-7a3b-42c0-8ad5-c52ca2c08f87",
          },
          {
            cells: ["Basohli", "A Pahari style with bold, intense colour", "17th to 18th century"],
            pyqExampleId: "41e36419-8af4-4c0d-80af-d0d6671e8232",
          },
        ],
      },
      pyqExampleId: "254bea23-5e13-46c3-ae19-c671f78195fd",
      selfCheckExample: {
        prompt: "In a Delhi tomb, a round dome sits on a square room. What is the curved triangular piece in each corner called?",
        steps: ["The square must be turned into a circle for the dome to rest on.", "The curved triangles in the corners that do this are pendentives."],
        answer: "A pendentive",
      },
      practiceSet: [
        { prompt: "Which Sultan finished the Qutb Minar?", answer: "Iltutmish" },
        { prompt: "Who built Tughlaqabad Fort?", answer: "Ghiyasuddin Tughlaq" },
        { prompt: "In whose reign was the Bada Gumbad in the Lodi Garden built?", answer: "Sikandar Lodi's" },
        { prompt: "To which broad school of painting does Basohli belong?", answer: "The Pahari (hill) school" },
      ],
      traps: [
        {
          title: "The Qutb Minar has two builders",
          body: "The Qutb Minar was **begun by Qutbuddin Aibak** and **finished by Iltutmish**. It is still the oldest building in any list with Tughlaq, Lodi or Mughal monuments.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-science",
      name: "Astronomy and medicine",
      intuition:
        "Medieval India kept up its own science and learnt from others. Kerala's astronomers worked out the moon and eclipses; Mughal doctors practised Greek-Arab medicine; an 18th century Rajput king used European tables to build his observatories.",
      definition:
        "- **Kerala**: **Vararuchi**, author of the **Chandravakyas**, devised the **katapayadi** system that writes numbers as letters, used to work out the **moon's position** on any day. **Achyuta Pisharati** (1550 to 1621) wrote the **Uparagakriyakrama** on **eclipses**. **Ravi Varma** of **Mahodayapuram** set up an observatory and is said to have begun the **Kollam era**.\n" +
        "- **Medicine**: Indian **Tibb-i-Yunani** (Graeco-Arabic medicine) was almost the same as Persian medicine of the time. **Bernier**, a physician, explained **Harvey's discovery of the circulation of blood** to the noble **Danishmand Khan**. **Smallpox inoculation** was a folk practice and is **not described** in the Yunani or Ayurvedic texts.\n" +
        "- **Sawai Jai Singh II** of Jaipur (ruled 1699 to 1743) built observatories (**Jantar Mantar**) at Delhi, Jaipur, Ujjain, Varanasi and Mathura and compiled the **Zij-i Muhammad Shahi**. He obtained **de La Hire's** tables and copied a **refraction table** from them; his astronomers built a **telescope** of their own and observed the **phases of Venus**.",
      table: {
        columns: ["Scholar or practice", "Time", "Work"],
        rows: [
          {
            cells: ["Vararuchi; Achyuta Pisharati; Ravi Varma", "Kerala, up to the 17th century", "Katapayadi numbers; a text on eclipses; an observatory and the Kollam era"],
            pyqExampleId: "6ceb0001-9006-4ba0-9fbf-6605b2a42075",
          },
          {
            cells: ["Tibb-i-Yunani and Bernier", "17th century", "Medicine like Persia's; Harvey's discovery explained to Danishmand Khan"],
            noteAmber: "CDS 2024 (I): two of the three statements were correct; smallpox inoculation was not in the texts.",
            pyqExampleId: "666b46cb-297e-4942-a997-e08932618315",
          },
          {
            cells: ["Sawai Jai Singh II", "1699 to 1743", "Jantar Mantars; de La Hire's tables; a home-made telescope"],
            noteAmber: "CDS 2024 (I): both statements about his astronomy were correct.",
            pyqExampleId: "4ec6a13a-d5e8-44f1-b757-5a32b410d895",
          },
        ],
      },
      pyqExampleId: "6ceb0001-9006-4ba0-9fbf-6605b2a42075",
      selfCheckExample: {
        prompt: "To whom did Francois Bernier explain Harvey's discovery of the circulation of blood?",
        steps: ["Bernier was a physician and, after Dara Shikoh's death, served a learned noble.", "That noble was Danishmand Khan."],
        answer: "Danishmand Khan",
      },
      practiceSet: [
        { prompt: "Which European astronomer's tables did Sawai Jai Singh obtain?", answer: "Philippe de La Hire's" },
        { prompt: "Name two cities where Sawai Jai Singh built a Jantar Mantar.", answer: "Any two of: Delhi, Jaipur, Ujjain, Varanasi, Mathura" },
        { prompt: "Indian Tibb-i-Yunani was almost the same as the medicine of which country?", answer: "Persia" },
        { prompt: "Was smallpox inoculation described in the Yunani and Ayurvedic texts?", answer: "No. It was a folk practice" },
      ],
      traps: [
        {
          title: "A folk practice, not a textbook one",
          body: "Smallpox inoculation was practised in India, but it was a **folk** practice. A statement that the **Yunani and Ayurvedic texts** described it is false.",
        },
      ],
    },
  ],
};
