import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_SANGAM_NOTE: SubtopicNote = {
  subtopicName: "Sangam Age and the Pallavas",
  title: "Sangam Age and the Pallavas",
  oneLineDefinition:
    "The five landscapes and the people of Sangam poetry, the Tamil grammar and epics, the ports and capitals of the Cholas, Cheras and Pandyas, and the Pallavas of Kanchi.",
  whyItMatters:
    "Fourteen questions, nine of them HARD. The Sangam words come back again and again: the vellalar and uzhavar were asked in 2018 (II) and again in 2026 (II), and the five landscapes in 2016 (II) and 2019 (II).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-tinai",
      name: "Sangam landscapes and people",
      intuition:
        "Sangam poets divided the Tamil country into five kinds of land, the tinai, and each land had its own people and work. " +
        "Society also had its ranks, from big landowners to ploughmen to slaves.",
      definition:
        "- The five **tinai** (landscapes): **kurinji** (hills), **mullai** (forest and pasture), **marutam** (farmed plains), **neytal** (seashore) and **palai** (dry, parched land).\n" +
        "- Their people: the **kuravar** of the hills, **herders** of the mullai, **ploughmen** of the marutam and **fishing people** of the neytal.\n" +
        "- Rural ranks: the **vellalar** were the **large landowners**, the **uzhavar** the **ploughmen**, and the **adimai** the **slaves**.\n" +
        "- **Gahapati** is a north Indian word for a landed householder; it is not from the Sangam texts.",
      table: {
        columns: ["Tinai", "Landscape", "People and work"],
        rows: [
          { cells: ["Kurinji", "Hills", "Hill people (kuravar); hunting and gathering"] },
          { cells: ["Mullai", "Forest and pasture", "Herders"] },
          {
            cells: ["Marutam", "Farmed plains", "Ploughmen"],
            noteAmber: "CDS 2019 (II): Maruta makkal were ploughmen and Neytal makkal fishing people.",
            pyqExampleId: "ca526dcd-9327-4433-ae51-a2c86fbc711c",
          },
          { cells: ["Neytal", "Seashore", "Fishing people"] },
          { cells: ["Palai", "Dry, parched land", "Little farming; poems of hard journeys"] },
        ],
      },
      pyqExampleId: "4068bacb-4d32-4cea-9782-79de26e03495",
      selfCheckExample: {
        prompt: "In Sangam texts, who were the vellalar, the uzhavar and the adimai?",
        steps: [
          "The three words rank rural people from top to bottom.",
          "Owners of land come first, then those who worked it, then the unfree.",
        ],
        answer: "Vellalar: large landowners; uzhavar: ploughmen; adimai: slaves.",
      },
      practiceSet: [
        { prompt: "Which Sangam landscape is the farmed plain?", answer: "Marutam" },
        { prompt: "What is the Tamil word for the landscapes of Sangam poetry?", answer: "Tinai" },
        { prompt: "Is gahapati a Sangam word?", answer: "No, it is a north Indian word for a landed householder" },
      ],
      traps: [
        {
          title: "Vellalar owned, uzhavar ploughed",
          body: "The vellalar were the large landowners and the uzhavar the ploughmen. CDS asked for each in turn, in 2018 (II) and 2026 (II).",
        },
        {
          title: "Kurinji is the hills, palai the dry land",
          body: "Kurinji is the hill country and palai the parched land. Mullai is pasture and neytal the coast; do not swap the hills with the dry land.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-sangam-texts",
      name: "Tamil grammar and epics",
      intuition:
        "The oldest Tamil book is a grammar. Then come the great epics, two of them linked: the second tells the story of the daughter of the first one's hero.",
      definition:
        "- The **Tolkappiyam** is the earliest Tamil work, a book of **grammar and poetics**.\n" +
        "- The **Silappadikaram** by **Ilango Adigal** tells the story of **Kovalan** and his wife **Kannagi**. It opens at **Puhar**, the Chola port at the mouth of the **Kaveri**, and praises the **Kaveri (Cauvery)**.\n" +
        "- The **Manimekalai** by **Sattanar**, a **Buddhist** epic, tells the story of **Manimekalai**, the daughter of Kovalan.\n" +
        "- The **Jivaka Chintamani** by **Tirutakkatevar** is a **Jain** epic.",
      table: {
        columns: ["Work", "Author", "Key fact"],
        rows: [
          {
            cells: ["Tolkappiyam", "Tolkappiyar", "Earliest Tamil work: grammar and poetics"],
            pyqExampleId: "b059745a-4778-4b8a-ae93-6f70fbe3cfce",
          },
          {
            cells: ["Silappadikaram", "Ilango Adigal", "Kovalan and Kannagi; praises the Kaveri"],
            noteAmber: "CDS 2017 (II): the river praised was the Cauvery.",
            pyqExampleId: "47355ca9-6a08-4061-ba0f-eb580cf2ef88",
          },
          { cells: ["Manimekalai", "Sattanar", "Buddhist epic about Kovalan's daughter"] },
          { cells: ["Jivaka Chintamani", "Tirutakkatevar", "A Jain epic"] },
        ],
      },
      pyqExampleId: "46f83648-97e7-46da-b875-238c8804447d",
      selfCheckExample: {
        prompt: "Which river does the Silappadikaram praise, and why that river?",
        steps: [
          "The story opens at Puhar, the Chola port.",
          "Puhar stands where the Kaveri meets the sea, and the Kaveri feeds the Chola country.",
        ],
        answer: "The Kaveri (Cauvery), the river of the Chola country.",
      },
      practiceSet: [
        { prompt: "What subject does the Tolkappiyam deal with?", answer: "Grammar and poetics" },
        { prompt: "Who are the hero and heroine of the Silappadikaram?", answer: "Kovalan and Kannagi" },
        { prompt: "Which religion does the Manimekalai celebrate?", answer: "Buddhism" },
      ],
      traps: [
        {
          title: "Ilango for the anklet, Sattanar for Manimekalai",
          body: "The Silappadikaram is by Ilango Adigal and the Manimekalai by Sattanar. Kovalan is a character in both stories, never an author.",
        },
        {
          title: "The Tolkappiyam is grammar",
          body: "The Tolkappiyam is a work of grammar and poetics, not a poem praising a Chola king or a play by a Chera king.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-sangam-ports",
      name: "Capitals and ports of the three kingdoms",
      intuition:
        "Three kingdoms shared the Tamil country, and each had an inland capital and a busy port. " +
        "Learn them as a set of three, because CDS uses the other two as wrong options.",
      definition:
        "- **Cholas**: capital **Uraiyur**, port **Puhar** (Kaveripattinam) at the mouth of the Kaveri.\n" +
        "- **Cheras**: capital **Vanji**, port **Muchiri** (Muziris) on the Malabar coast.\n" +
        "- **Pandyas**: capital **Madurai**, port **Korkai**, famous for its **pearls** in Sangam poems and Greek accounts.\n" +
        "- The poem **Maduraikkanchi** pictures Madurai as a great city walled on three sides with the **Vaigai** river on the fourth. The **Arthashastra** praises its fine cotton cloth, and other texts call it a busy centre of crafts.",
      table: {
        columns: ["Kingdom", "Capital", "Port"],
        rows: [
          { cells: ["Chola", "Uraiyur", "Puhar (Kaveripattinam)"] },
          { cells: ["Chera", "Vanji", "Muchiri (Muziris)"] },
          {
            cells: ["Pandya", "Madurai", "Korkai, famous for pearls"],
            pyqExampleId: "aae78249-6a54-4de0-a58b-c0667ae6a625",
          },
        ],
      },
      pyqExampleId: "2883e798-d43b-4ab5-b091-b17f4b3f501f",
      selfCheckExample: {
        prompt: "Which Sangam poem describes Madurai as a walled city with the Vaigai river on its fourth side?",
        steps: [
          "The poem's name carries the city's name.",
          "It is one of the ten long Sangam poems.",
        ],
        answer: "The Maduraikkanchi.",
      },
      practiceSet: [
        { prompt: "Which was the port of the Cheras?", answer: "Muchiri (Muziris)" },
        { prompt: "Which Chola port stood at the mouth of the Kaveri?", answer: "Puhar (Kaveripattinam)" },
        { prompt: "What was the Chola capital?", answer: "Uraiyur" },
      ],
      traps: [
        {
          title: "Korkai is the Pandya port",
          body: "Korkai was the Pandya pearl port. Muchiri was Chera and Puhar was Chola, and Arikamedu was a trading town near Puducherry, not a royal port.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-pallavas",
      name: "The Pallavas",
      intuition:
        "The Pallavas ruled from Kanchipuram. Their records moved from Prakrit to Sanskrit, " +
        "and their kings were proud builders and artists who carved temples out of rock.",
      definition:
        "- The **Pallavas** of **Tondaimandalam** ruled from **Kanchipuram**. Their earliest copper-plate grants are in **Prakrit**; later ones are in **Sanskrit**.\n" +
        "- **Mahendravarman I** began rock-cut temples and took titles such as **Vichitrachitta** (curious-minded), **Chaityakari** (temple builder) and **Chitrakarapuli** (tiger among painters). He also wrote the play **Mattavilasa Prahasana**.\n" +
        "- The **Adivaraha cave** at **Mamallapuram** carries carved portraits of **Simhavishnu** and **Mahendravarman I**, each with two queens.\n" +
        "- At **Kudumiyamalai** in **Pudukkottai district**, Tamil Nadu, a rock inscription of the seventh or eighth century sets out groups of **musical notes** arranged by a king for his pupils.",
      table: {
        columns: ["Name", "Fact"],
        rows: [
          {
            cells: ["Early Pallava grants", "Prakrit at first, Sanskrit later"],
            noteAmber: "CDS 2023 (II): the Pallavas were the dynasty that moved from Prakrit to Sanskrit.",
            pyqExampleId: "a7962d7e-c6e6-4116-be0c-efb77606d474",
          },
          { cells: ["Mahendravarman I", "Titles Vichitrachitta, Chaityakari, Chitrakarapuli; wrote Mattavilasa Prahasana"] },
          {
            cells: ["Adivaraha cave, Mamallapuram", "Portraits of Simhavishnu and Mahendravarman I"],
            pyqExampleId: "9ab30890-b9f2-45ce-8ea3-0d1e12c7dff4",
          },
          {
            cells: ["Kudumiyamalai", "Pudukkottai district: an inscription of musical notes"],
            pyqExampleId: "c2a44d64-a6e4-49e0-9e28-88ed77cbedc4",
          },
        ],
      },
      pyqExampleId: "e29e11d8-8edd-4229-80e7-faaac93532f7",
      selfCheckExample: {
        prompt: "Which cave temple at Mamallapuram carries the royal portraits of Simhavishnu and Mahendravarman I?",
        steps: [
          "Two Mamallapuram caves are named after Varaha.",
          "The portraits are in the one still used for worship, not in the Varaha cave with its myth panels.",
        ],
        answer: "The Adivaraha cave.",
      },
      practiceSet: [
        { prompt: "What was the Pallava capital?", answer: "Kanchipuram" },
        { prompt: "Which play did Mahendravarman I write?", answer: "Mattavilasa Prahasana" },
        { prompt: "In which district of Tamil Nadu is the musical inscription of Kudumiyamalai?", answer: "Pudukkottai" },
      ],
      traps: [
        {
          title: "Adivaraha, not Varaha",
          body: "The royal portraits are in the Adivaraha cave. The nearby Varaha cave has panels of Varaha, Trivikrama, Gajalakshmi and Durga.",
        },
        {
          title: "Chitrakarapuli is about art",
          body: "Chitrakarapuli means tiger among painters. Mahendravarman's titles point to art and temple building, not to literature or farming.",
        },
      ],
    },
  ],
};
