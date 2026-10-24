import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_BHAKTI_NOTE: SubtopicNote = {
  subtopicName: "The Bhakti Movement",
  title: "The Bhakti Movement: Saints and Their Songs",
  oneLineDefinition:
    "The Tamil Alvars and Nayanars, Basavanna and the Virashaivas, the saints of Maharashtra, north India, Punjab and Assam, and the devotional poems of Bengal and Braj.",
  whyItMatters:
    "Sixteen CDS questions. The Alvars and Nayanars alone account for five, and Basavanna's Virashaivas for three, the newest in 2026 (I). Half the page is only MODERATE, so the god each group worshipped and the book each saint left are quick marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-alvars",
      name: "Alvars and Nayanars",
      intuition:
        "Bhakti began in the Tamil country between the 6th and 9th centuries. Two groups of saint-poets sang in Tamil and travelled from temple to temple: one for Vishnu, one for Shiva. " +
        "Fix which group belongs to which god and most questions are done.",
      definition:
        "- The **Alvars** (12 saints) were devoted to **Vishnu**. Their hymns were compiled in the **10th century** as the **Nalayira Divya Prabandham**, called the Tamil Veda. **Andal** was a woman Alvar.\n" +
        "- The **Nayanars** (63 saints) were devoted to **Shiva**. Appar, Sambandar and Sundarar were Nayanars; their hymns are in the **Tevaram**. The women Nayanars include **Karaikkal Ammaiyar**, **Mangayarkkarasiyar** and **Isaignaniyar**.\n" +
        "- **Saguna** bhakti worships God **with attributes** (a form such as Rama or Krishna); **nirguna** bhakti worships God **without attributes**.",
      table: {
        columns: ["Group", "God", "Saints named in CDS", "Hymn collection"],
        rows: [
          {
            cells: ["Alvars (12)", "Vishnu", "Andal, the woman Alvar", "Nalayira Divya Prabandham, compiled in the 10th century"],
            noteAmber: "CDS 2018 (I): the Nalayira Divya Prabandham is the work of the Alvars.",
            pyqExampleId: "e0721830-e06d-4dac-aa6c-609320356a95",
          },
          {
            cells: ["Nayanars (63)", "Shiva", "Appar, Sambandar, Sundarar; women: Karaikkal Ammaiyar, Mangayarkkarasiyar, Isaignaniyar", "Tevaram"],
            noteAmber: "Alvars or Nayanars were asked five times, from CDS 2018 (I) to 2023 (II).",
            pyqExampleId: "d747224c-a5d9-4f8f-9c04-da382a64324e",
          },
        ],
      },
      pyqExampleId: "edb1b0e3-c299-4351-bb15-d3ea3c144e81",
      selfCheckExample: {
        prompt: "A collection of Tamil hymns compiled in the 10th century is called the Tamil Veda. Whose hymns are in it?",
        steps: ["That collection is the Nalayira Divya Prabandham.", "It gathers the hymns of the Vishnu devotees of the Tamil country."],
        answer: "The Alvars",
      },
      practiceSet: [
        { prompt: "How many Nayanars are there in the Tamil tradition?", answer: "63" },
        { prompt: "To which group did Appar, Sambandar and Sundarar belong?", answer: "The Nayanars" },
        { prompt: "What does nirguna bhakti mean?", answer: "Devotion to God without attributes" },
        { prompt: "What is the collection of the Nayanars' hymns called?", answer: "The Tevaram" },
      ],
      traps: [
        {
          title: "Vishnu for Alvars, Shiva for Nayanars, Shakti for neither",
          body: "The **Alvars** worshipped **Vishnu** and the **Nayanars** worshipped **Shiva**. A pairing of the Alvars with Shakti is the false one.",
        },
        {
          title: "Andal is an Alvar",
          body: "In a list of women saints, **Andal** is the odd one out of the Nayanars because she was an **Alvar**, a devotee of Vishnu.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-virashaiva",
      name: "Basavanna and the Virashaivas",
      intuition:
        "In 12th century Karnataka a minister named Basavanna started a Shiva movement that rejected caste and temple ritual. His followers carry a small linga on their body, which gives them their other name, Lingayats.",
      definition:
        "- **Basavanna** (1106 to 1168) was a minister at the court of a **Kalachuri** ruler. He founded the **Virashaiva** movement in **Karnataka**; his followers are the **Virashaivas** or **Lingayats**.\n" +
        "- They worship Shiva as the **linga**, reject caste and Brahmanical ritual, and wrote short poems called **vachanas** in **Kannada**.\n" +
        "- Tradition traces Virashaivism to **five teachers**: Renuka, Daruka, Ghantakarna, Dhenukarna and Vishvakarna.\n" +
        "- Its philosophy is called **Shaktivishishtadvaita**, and the **Ashtavarana** are its **eight observances** (guru, linga, jangama, padodaka, prasada, vibhuti, rudraksha, mantra).",
      table: {
        columns: ["Item", "Detail"],
        rows: [
          {
            cells: ["Founder", "Basavanna, a minister at the Kalachuri court, 12th century"],
            noteAmber: "Asked three times: CDS 2022 (I), 2024 (I) and 2026 (I).",
            pyqExampleId: "2f7f5a27-e8eb-4724-ba2c-7e10644e363f",
          },
          { cells: ["Followers", "Virashaivas, also called Lingayats"] },
          { cells: ["Writings", "Vachanas in Kannada"] },
          {
            cells: ["Doctrine", "Five founding teachers; Shaktivishishtadvaita; the eight Ashtavarana"],
            noteAmber: "CDS 2024 (I): all three statements were correct.",
            pyqExampleId: "3ebc97dc-1243-4add-b377-071f9c00b84c",
          },
        ],
      },
      pyqExampleId: "657d82a5-a299-48f5-abd8-829f35193298",
      selfCheckExample: {
        prompt: "What is the philosophy of the Virashaivas called, and what are the Ashtavarana?",
        steps: ["Their philosophy is a qualified non-dualism of Shiva and his Shakti: Shaktivishishtadvaita.", "The Ashtavarana are the eight observances that guard the devotee."],
        answer: "Shaktivishishtadvaita; the Ashtavarana are its eight observances",
      },
      practiceSet: [
        { prompt: "At which dynasty's court was Basavanna a minister?", answer: "The Kalachuris" },
        { prompt: "In which language are the Virashaiva vachanas written?", answer: "Kannada" },
        { prompt: "By what other name are the Virashaivas known?", answer: "Lingayats" },
        { prompt: "Name two of the five teachers to whom Virashaivism traces its origin.", answer: "Any two of: Renuka, Daruka, Ghantakarna, Dhenukarna, Vishvakarna" },
      ],
      traps: [
        {
          title: "Basavanna was not a Nayanar",
          body: "Appar, Sambandar and Sundarar are Tamil **Nayanars**. The founder of the Virashaiva movement in Karnataka is **Basavanna**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-north-saints",
      name: "Saints of Maharashtra, the north, Punjab and Assam",
      intuition:
        "From the 13th century bhakti spread north and east. Each saint is asked with one fact: where he taught, whom he followed, and what his followers did with his songs.",
      definition:
        "- **Namdev** (13th to 14th century) of Maharashtra, a devotee of **Vitthal**, carried bhakti north as far as Punjab. He was a strict monotheist who opposed caste. He lived well **before Kabir**.\n" +
        "- **Kabir** (15th century), of **Varanasi**: his verses are kept in three traditions, the **Bijak** (Kabirpanth, Varanasi), the **Kabir Granthavali** (Dadupanth, Rajasthan) and the **Adi Granth Sahib**.\n" +
        "- **Guru Nanak** (1469 to 1539) organised his followers into a community and set the **rules for congregational worship (sangat)** with collective recitation. **Guru Arjan** compiled the **Adi Granth** in 1604.\n" +
        "- **Shankaradeva** (late 15th century) of **Assam**: his teaching is the **Bhagavati dharma** (based on the Bhagavad Gita and the Bhagavata Purana). He set up **satras** (monasteries) and **namghars** (prayer halls); his major work is the **Kirtana-ghosha**.",
      table: {
        columns: ["Saint", "Region and time", "Key fact"],
        rows: [
          {
            cells: ["Namdev", "Maharashtra, 13th to 14th century", "Took bhakti to the north; opposed caste; earlier than Kabir"],
            pyqExampleId: "ed49908c-f4c2-4394-9a3c-c08628981cb7",
          },
          {
            cells: ["Kabir", "Varanasi, 15th century", "Verses in the Bijak, the Kabir Granthavali and the Adi Granth"],
            noteAmber: "CDS 2018 (I): all three compilations hold his verses.",
            pyqExampleId: "d1450a21-011c-4911-a2e4-5816be0a7295",
          },
          {
            cells: ["Shankaradeva", "Assam, late 15th century", "Bhagavati dharma; satras and namghars; Kirtana-ghosha"],
            pyqExampleId: "b969538f-2139-4857-8bbc-206e1a7e3eab",
          },
          {
            cells: ["Guru Nanak", "Punjab, 1469 to 1539", "Rules for the sangat, congregational worship"],
            noteAmber: "CDS 2021 (II): Guru Nanak, not Guru Arjan.",
            pyqExampleId: "b3d8eaee-8cff-43db-b34b-9137f0bfdb66",
          },
        ],
      },
      pyqExampleId: "b969538f-2139-4857-8bbc-206e1a7e3eab",
      selfCheckExample: {
        prompt: "Could Namdev have been a follower of Kabir?",
        steps: ["Namdev lived in the 13th and 14th centuries.", "Kabir lived in the 15th century, more than a century later."],
        answer: "No. Namdev lived long before Kabir",
      },
      practiceSet: [
        { prompt: "Which sect preserves Kabir's Bijak in Varanasi?", answer: "The Kabirpanth" },
        { prompt: "Which Sikh Guru compiled the Adi Granth in 1604?", answer: "Guru Arjan" },
        { prompt: "Which god did Namdev worship?", answer: "Vitthal" },
        { prompt: "With which sect in Rajasthan is the Kabir Granthavali linked?", answer: "The Dadupanth" },
      ],
      traps: [
        {
          title: "Nanak set the rules, Arjan compiled the book",
          body: "The rules for congregational worship (**sangat**) go back to **Guru Nanak**. **Guru Arjan** compiled the Adi Granth; do not swap the two.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-bhakti-texts",
      name: "Devotional writing in Bengal and Braj",
      intuition:
        "Bengal produced long narrative poems in praise of a god or goddess, called mangal-kavya, and verse lives of the saint Chaitanya. " +
        "The questions match authors to titles that sound alike, so learn them in pairs.",
      definition:
        "- **Mangal-kavya** are long Bengali poems in praise of a deity.\n" +
        "- **Chandimangal** (in Bengali, 16th century): by **Mukundaram Chakravarti**, called Kavikankan.\n" +
        "- Lives of Chaitanya: **Chaitanyamangal** (later called Chaitanya Bhagavata) by **Brindavan Das**; **Chaitanyacharitamrita** by **Krishnadas Kaviraj**.\n" +
        "- **Shivasankirtan** (also called Shivayan), early 18th century: by **Rameshwar Bhattacharya**.\n" +
        "- **Annadamangal**, with its tale Vidyasundar: by **Bharatchandra Ray**.\n" +
        "- **Vraja Bhakti Vilasa** (in **Sanskrit**, 16th century): by **Narayana Bhatta**, mapping the sacred sites of the **Braj** region around Mathura and Vrindavan.",
      table: {
        columns: ["Work", "Author", "Language and time"],
        rows: [
          {
            cells: ["Chandimangal", "Mukundaram Chakravarti", "Bengali, 16th century"],
            noteAmber: "CDS 2019 (II): the language is Bengali.",
            pyqExampleId: "be28708b-9c8c-47c5-a009-87cfb9c611e8",
          },
          {
            cells: ["Vraja Bhakti Vilasa", "Narayana Bhatta", "Sanskrit, 16th century"],
            pyqExampleId: "31ab5d03-6069-4c70-a5b0-9ee79eaec19e",
          },
          { cells: ["Chaitanyamangal", "Brindavan Das", "Bengali, 16th century"] },
          { cells: ["Chaitanyacharitamrita", "Krishnadas Kaviraj", "Bengali, 16th century"] },
          {
            cells: ["Shivasankirtan (Shivayan)", "Rameshwar Bhattacharya", "Bengali, early 18th century"],
            noteAmber: "Asked twice: CDS 2021 (I) and 2025 (I).",
            pyqExampleId: "8efa6de1-710a-41af-8ee3-23923764bf68",
          },
          { cells: ["Annadamangal (Vidyasundar)", "Bharatchandra Ray", "Bengali, 18th century"] },
        ],
      },
      pyqExampleId: "3d5b30f4-36eb-4f69-8ee1-47d7b2f02c6c",
      selfCheckExample: {
        prompt: "In which language did Narayana Bhatta write the Vraja Bhakti Vilasa, and which region does it describe?",
        steps: ["It is a 16th century Sanskrit text.", "It maps the pilgrimage sites of Braj, around Mathura and Vrindavan."],
        answer: "Sanskrit; the Braj region",
      },
      practiceSet: [
        { prompt: "In which language was the Chandimangal composed?", answer: "Bengali" },
        { prompt: "Who wrote the Annadamangal, with its tale Vidyasundar?", answer: "Bharatchandra Ray" },
        { prompt: "What is a mangal-kavya?", answer: "A long Bengali poem in praise of a deity" },
        { prompt: "In which century did Rameshwar Bhattacharya write?", answer: "The early 18th century" },
      ],
      traps: [
        {
          title: "Two lives of Chaitanya",
          body: "**Chaitanyamangal** is by **Brindavan Das**; **Chaitanyacharitamrita** is by **Krishnadas Kaviraj**. The titles look alike, so match the author to the exact title.",
        },
      ],
    },
  ],
};
