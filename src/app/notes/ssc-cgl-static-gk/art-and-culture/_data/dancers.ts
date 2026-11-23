import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_DANCERS_NOTE: SubtopicNote = {
  subtopicName: "Classical Dancers, Gurus and Institutions",
  title: "Classical Dancers, Gurus and Institutions",
  oneLineDefinition:
    "The guru who revived each classical dance, the dancers SSC has named with their dance, and the dance schools with their founders and cities.",
  whyItMatters:
    "30 questions in the bank: 20 from the 2023 shifts and 10 from the 2024 shifts. Nearly every one names a dancer or a guru and asks the dance, or names a school and asks its city. Learn one guru for each dance first, then the dancers known for two dances, because SSC likes to ask for the second one.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsacdn-gurus",
      name: "The guru or reviver of each dance",
      intuition:
        "Each classical dance has one great name who revived it or carried it to the stage in the 20th century. Fix that one name per dance and most guru questions answer themselves.",
      definition:
        "- **Kelucharan Mohapatra** led the 20th-century revival of **Odissi**.\n" +
        "- **Vempati Chinna Satyam** took **Kuchipudi** from Kuchipudi village to the concert stage and taught it from his academy in Chennai.\n" +
        "- **Guru Bipin Singh** is called the father of modern **Manipuri**; the Maharaja of Manipur gave him the title **Hanjaba**.\n" +
        "- **Rukmini Devi Arundale**, a theosophist, revived **Bharatanatyam** and founded Kalakshetra.\n" +
        "- **Birju Maharaj** of the Lucknow gharana was the best-known **Kathak** dancer of his time.\n" +
        "- **Srimanta Sankardeva** created **Sattriya** in the 15th century.\n" +
        "- **Uday Shankar** blended Indian classical and folk forms with European stagecraft and is called the **father of modern dance in India**.",
      table: {
        columns: ["Dance", "Guru or reviver", "Remember for"],
        rows: [
          { cells: ["Odissi", "Kelucharan Mohapatra", "Led its 20th-century revival"], pyqExampleId: "a49bcc91-bf13-4462-b56d-ef1b969f8476" },
          { cells: ["Kuchipudi", "Vempati Chinna Satyam", "Took it from the village to the stage"], pyqExampleId: "3bdd88aa-9bd2-45cc-8fe2-42c02d43e12c" },
          { cells: ["Manipuri", "Guru Bipin Singh", "Given the title Hanjaba"], pyqExampleId: "e8258722-92e2-4929-a8e7-9d6931b127f5" },
          { cells: ["Bharatanatyam", "Rukmini Devi Arundale", "Founded Kalakshetra"] },
          { cells: ["Kathak", "Birju Maharaj", "Lucknow gharana"] },
          { cells: ["Sattriya", "Srimanta Sankardeva", "Created it in the 15th century"] },
          { cells: ["Modern Indian dance", "Uday Shankar", "Father of modern dance in India"], pyqExampleId: "bb735d53-d439-43a0-aab8-f56aac2a232c" },
        ],
      },
      pyqExampleId: "fa0331e8-77f1-4234-a151-3e073620fbe5",
      selfCheckExample: {
        prompt: "Who is called the father of modern dance in India?",
        steps: [
          "Modern Indian dance mixed classical and folk forms with European theatre.",
          "Uday Shankar created it, so he carries the title.",
        ],
        answer: "Uday Shankar",
      },
      practiceSet: [
        { prompt: "Kelucharan Mohapatra led the revival of which dance?", answer: "Odissi" },
        { prompt: "Which title did the Maharaja of Manipur give Guru Bipin Singh?", answer: "Hanjaba" },
        { prompt: "Who created Sattriya?", answer: "Srimanta Sankardeva" },
        { prompt: "Birju Maharaj was a dancer of which form?", answer: "Kathak" },
      ],
      traps: [
        {
          title: "Uday Shankar is not a Kathak guru",
          body: "Uday Shankar created modern Indian dance. Birju Maharaj and Gopi Krishna were the Kathak names, and Guru Bipin Singh is Manipuri.",
        },
        {
          title: "Bipin Singh is Manipuri, never Kathak",
          body: "Guru Bipin Singh revived Manipuri. If Manipuri is among the options for him, it is the answer; Kathak and Odissi are distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacdn-exponents",
      name: "Dancers SSC has asked, by dance",
      intuition:
        "SSC names a dancer and asks the dance, or gives three dancers and asks which group shares one dance. A few dancers are known for two dances, and SSC asks for the second.",
      definition:
        "Group the names by dance and learn the double-dance dancers apart:\n" +
        "- **Sonal Mansingh** and **Alarmel Valli:** Bharatanatyam and **Odissi** (both learnt Odissi from Kelucharan Mohapatra).\n" +
        "- **Yamini Krishnamurthy:** Bharatanatyam and **Kuchipudi**; she was made the resident dancer (Asthana Nartaki) of the Tirumala Tirupati Devasthanams.\n" +
        "- **Mrinalini Sarabhai:** Bharatanatyam and **Kathakali**.\n\n" +
        "In a group question one name you are sure of is enough: if it belongs to another dance, the whole option is wrong.",
      table: {
        columns: ["Dance", "Dancers SSC asked"],
        rows: [
          { cells: ["Bharatanatyam", "Padma Subrahmanyam, Urmila Sathyanarayanan, Malavika Sarukkai, Sucheta Chaphekar"], pyqExampleId: "b34ae6a5-2370-44de-b12a-1d2a6d487ef7" },
          { cells: ["Bharatanatyam and Odissi", "Sonal Mansingh, Alarmel Valli"], pyqExampleId: "c510703c-3099-4db3-85e1-cbf7d3a3b5c9" },
          { cells: ["Bharatanatyam and Kuchipudi", "Yamini Krishnamurthy"], pyqExampleId: "1778e94d-d58a-427b-9303-cd2b098b27e9" },
          { cells: ["Bharatanatyam and Kathakali", "Mrinalini Sarabhai"], pyqExampleId: "e786b49d-5858-4152-97e5-58339549f63e" },
          { cells: ["Kathak", "Sitara Devi, Shaswati Sen, Urmila Nagar, Kumudini Lakhia, Rohini Bhate, Geetanjali Lal, Shovana Narayan, Uma Sharma"], pyqExampleId: "cbbe27d1-0b73-4ffd-94c5-440a05e59105" },
          { cells: ["Odissi", "Kumkum Mohanty, Kiran Segal, Mayadhar Raut, Ranjana Gauhar, Sanjukta Panigrahi"], pyqExampleId: "4affac8e-7695-4a74-8adb-ff9345d81e68" },
          { cells: ["Kuchipudi", "Vedantam Satyanarayana Sarma, Shobha Naidu, Swapnasundari"] },
          { cells: ["Manipuri", "Darshana Jhaveri, Kalavati Devi"], pyqExampleId: "1cea1f1d-626a-4d4a-bd4e-dd1aaaa4cb15" },
          { cells: ["Sattriya", "Sharodi Saikia, Meenakshi Medhi, Ramkrishna Talukdar"] },
        ],
      },
      pyqExampleId: "293cc78c-bcf2-4c92-8225-1a02270e86ee",
      selfCheckExample: {
        prompt: "Mrinalini Sarabhai was known for Bharatanatyam and which other dance?",
        steps: ["Of the double-dance dancers, Sonal Mansingh and Alarmel Valli added Odissi and Yamini Krishnamurthy added Kuchipudi.", "Mrinalini Sarabhai added Kathakali."],
        answer: "Kathakali",
      },
      practiceSet: [
        { prompt: "Darshana Jhaveri is a dancer of which form?", answer: "Manipuri" },
        { prompt: "Geetanjali Lal is known for which dance?", answer: "Kathak" },
        { prompt: "Kumkum Mohanty is an exponent of which dance?", answer: "Odissi" },
        { prompt: "Which dance is Meenakshi Medhi known for?", answer: "Sattriya" },
        { prompt: "Besides Bharatanatyam, which dance did Alarmel Valli learn from Kelucharan Mohapatra?", answer: "Odissi" },
      ],
      traps: [
        {
          title: "Yamini Krishnamurthy fits two answers",
          body: "Yamini Krishnamurthy danced both Bharatanatyam and Kuchipudi. If only one of the two is among the options, that one is the answer.",
        },
        {
          title: "Do not swap the second dances",
          body: "Sonal Mansingh and Alarmel Valli added Odissi; Mrinalini Sarabhai added Kathakali. Giving Kathakali to Sonal Mansingh is the usual slip.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacdn-institutions",
      name: "Dance schools and their cities",
      intuition:
        "A dance school question asks its founder, its city or its year. Each school below has one founder and one city; two of them are in the same city.",
      definition:
        "- **Kalakshetra**, Chennai (1936): founded by **Rukmini Devi Arundale** for Bharatanatyam.\n" +
        "- **Darpana Academy of Performing Arts**, Ahmedabad (1949): founded by **Mrinalini Sarabhai**.\n" +
        "- **Kadamb Centre for Dance**, Ahmedabad (1964): founded by **Kumudini Lakhia** for Kathak.\n" +
        "- **Nrityagram**, Hesaraghatta near Bengaluru, **Karnataka** (1990): an Odissi dance village founded by **Protima Gauri Bedi**.\n" +
        "- **Jawaharlal Nehru Manipur Dance Academy**, **Imphal** (1954): a unit of the Sangeet Natak Akademi for Manipuri dance.\n" +
        "- **Govindji Nartanalaya**, Manipur: a Manipuri dance school; Shri Govindajee is the royal temple of Imphal.",
      table: {
        columns: ["School", "Place", "Dance", "Founder or year"],
        rows: [
          { cells: ["Kalakshetra", "Chennai", "Bharatanatyam", "Rukmini Devi Arundale, 1936"], pyqExampleId: "ab628a1e-a4fe-4e06-a526-e7d6b8b774a1" },
          { cells: ["Darpana Academy", "Ahmedabad", "Bharatanatyam and Kathakali", "Mrinalini Sarabhai, 1949"], pyqExampleId: "0b8c2565-ab4a-4f06-9132-bc1bdf822f4b" },
          { cells: ["Kadamb Centre for Dance", "Ahmedabad", "Kathak", "Kumudini Lakhia, 1964"], pyqExampleId: "40c89dc2-b7d0-4d5e-9faa-2f68f71fb56e" },
          { cells: ["Nrityagram", "Near Bengaluru, Karnataka", "Odissi", "Protima Gauri Bedi, 1990"] },
          { cells: ["Jawaharlal Nehru Manipur Dance Academy", "Imphal, Manipur", "Manipuri", "Set up in 1954"], pyqExampleId: "b8a7a48f-ed2f-4c22-8e0c-880ee6965de7" },
          { cells: ["Govindji Nartanalaya", "Manipur", "Manipuri", "Named after the god of Imphal's royal temple"], pyqExampleId: "462a2054-caa4-47e7-b071-c84253d60345" },
        ],
      },
      pyqExampleId: "e6047e16-45ec-40ea-ae11-ed9390883fb1",
      selfCheckExample: {
        prompt: "In which city is Kalakshetra?",
        steps: ["Rukmini Devi Arundale founded Kalakshetra in 1936.", "She set it up at Adyar, in Chennai."],
        answer: "Chennai",
      },
      practiceSet: [
        { prompt: "In which year was the Jawaharlal Nehru Manipur Dance Academy set up?", answer: "1954" },
        { prompt: "In which city is the Kadamb Centre for Dance?", answer: "Ahmedabad" },
        { prompt: "Who founded Nrityagram?", answer: "Protima Gauri Bedi" },
        { prompt: "In which city is the Jawaharlal Nehru Manipur Dance Academy?", answer: "Imphal" },
      ],
      traps: [
        {
          title: "Nrityagram is in Karnataka",
          body: "Nrityagram teaches Odissi but stands near Bengaluru, Karnataka. Do not choose Odisha just because of the dance.",
        },
        {
          title: "Two schools in Ahmedabad",
          body: "Darpana (Mrinalini Sarabhai, 1949) and Kadamb (Kumudini Lakhia, 1964) are both in Ahmedabad. Kadamb is the Kathak one.",
        },
      ],
    },
  ],
};
