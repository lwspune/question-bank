import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Instruments and Maestros",
  title: "Instruments and Maestros",
  oneLineDefinition:
    "Each great Indian instrumentalist paired with the one instrument SSC asks, the neighbours put beside them in the options, and the four families of instruments.",
  whyItMatters:
    "40 questions in the bank, more than any other page of this chapter: 19 from the 2023 shifts, 16 from 2024 and 5 from 2025. Almost all give a musician and ask the instrument, so the tables pair each maestro with one instrument and list the names SSC puts beside them as wrong options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsacin-sitar",
      name: "Sitar, surbahar, rudra veena and mandolin",
      intuition:
        "The plucked strings of Hindustani music have a few great families. Pin each maestro to one instrument; the options are usually other maestros' instruments.",
      definition:
        "- **Sitar:** **Ravi Shankar**, who as music director of All India Radio founded the **National Orchestra (Vadya Vrinda)** in **1949**; **Vilayat Khan** of the Imdadkhani (Etawah) gharana; **Shahid Parvez Khan**, **Budhaditya Mukherjee** and **Anoushka Shankar** (Ravi Shankar's daughter); **Arvind Parikh**, a pupil of Vilayat Khan.\n" +
        "- **Surbahar**, the bass sitar: **Annapurna Devi**, daughter of Allauddin Khan.\n" +
        "- **Rudra veena**, the dhrupad veena: **Asad Ali Khan** and **Zia Mohiuddin Dagar** of the Dagar family.\n" +
        "- **Mandolin:** **U. Srinivas** (\"Mandolin Srinivas\"), who brought it into Carnatic music.\n" +
        "- **Mohan veena**, a slide instrument: **Vishwa Mohan Bhatt**. **Hawaiian (slide) guitar:** **Brij Bhushan Kabra**.",
      table: {
        columns: ["Maestro", "Instrument", "Remember for"],
        rows: [
          { cells: ["Ravi Shankar", "Sitar", "Founded the National Orchestra, 1949"], pyqExampleId: "0f7f3a08-5f92-4a01-99f8-1c320a7c9b5b" },
          { cells: ["Vilayat Khan", "Sitar", "Imdadkhani (Etawah) gharana"], pyqExampleId: "7e8597b9-3e83-4512-9deb-6daa11bc3b54" },
          { cells: ["Shahid Parvez Khan, Budhaditya Mukherjee, Anoushka Shankar", "Sitar", "Anoushka is Ravi Shankar's daughter"], pyqExampleId: "4885bcbb-485e-4b85-81f6-4e913ad5cf2c" },
          { cells: ["Annapurna Devi", "Surbahar (bass sitar)", "Daughter of Allauddin Khan"], pyqExampleId: "381e5ecf-3c61-4bec-a844-bde79d8bd0de" },
          { cells: ["Asad Ali Khan", "Rudra veena", "Dhrupad tradition"], pyqExampleId: "08dc4727-70b2-4ded-8c93-bed0d1593b0c" },
          { cells: ["Zia Mohiuddin Dagar", "Rudra veena", "The Dagar family"], pyqExampleId: "08cdd024-e0c6-40db-8774-326425591caf" },
          { cells: ["U. Srinivas", "Mandolin", "Brought it into Carnatic music"], pyqExampleId: "91041b4b-5479-40c7-ba87-653962d67d3c" },
          { cells: ["Vishwa Mohan Bhatt", "Mohan veena", "A slide instrument of his own"] },
          { cells: ["Brij Bhushan Kabra", "Hawaiian guitar", "Slide guitar in Hindustani music"] },
        ],
      },
      pyqExampleId: "2fd110c4-9247-437a-8bac-c257873c94fa",
      selfCheckExample: {
        prompt: "Which instrument is Vishwa Mohan Bhatt known for?",
        steps: ["He plays a slide instrument he shaped himself.", "It is named after him: the Mohan veena."],
        answer: "The Mohan veena",
      },
      practiceSet: [
        { prompt: "Which instrument is called the bass sitar?", answer: "The surbahar" },
        { prompt: "Which sitar player founded the National Orchestra of India?", answer: "Ravi Shankar" },
        { prompt: "Zia Mohiuddin Dagar played which instrument?", answer: "The rudra veena" },
        { prompt: "U. Srinivas played which instrument?", answer: "The mandolin" },
        { prompt: "Anoushka Shankar plays which instrument?", answer: "The sitar" },
      ],
      traps: [
        {
          title: "Annapurna Devi is surbahar",
          body: "Annapurna Devi played the surbahar, the bass sitar. Rudra veena, ektara and the sitar itself are the distractors.",
        },
        {
          title: "Vilayat Khan is sitar; the other Khans are sarod",
          body: "In one SSC set Ali Akbar Khan, Bahadur Khan and Amjad Ali Khan were the sarod players around Vilayat Khan, the only sitarist.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacin-sarod",
      name: "Sarod, santoor, sarangi and violin",
      intuition:
        "Three more instrument families fill the options: the sarod of the Maihar and Bangash lines, the santoor of Kashmir and the bowed sarangi. One famous name anchors each.",
      definition:
        "- **Sarod:** **Allauddin Khan**, founder of the **Maihar gharana**; his son **Ali Akbar Khan**; **Amjad Ali Khan** of the Bangash gharana, called **\"Sarod Samrat\"**; **Buddhadev Dasgupta** of the Shahjahanpur gharana; **Sharan Rani**.\n" +
        "- **Santoor:** **Shivkumar Sharma**, who made it a concert instrument of Hindustani music; **Bhajan Sopori**; **Tarun Bhattacharya**.\n" +
        "- **Sarangi:** **Ram Narayan**, who made the sarangi a **solo** concert instrument; **Shakoor Khan** of the Kirana gharana; **Sabri Khan** of the Senia gharana of Moradabad.\n" +
        "- **Violin:** **N. Rajam** (Hindustani); **M. S. Gopalakrishnan** (Carnatic).",
      table: {
        columns: ["Maestro", "Instrument", "Remember for"],
        rows: [
          { cells: ["Allauddin Khan", "Sarod", "Founder of the Maihar gharana"], pyqExampleId: "393a52ea-9594-4c92-b114-bfffba38f951" },
          { cells: ["Ali Akbar Khan", "Sarod", "Son of Allauddin Khan; Maihar gharana"], pyqExampleId: "b76b5aa7-7a88-4605-a0a3-80d51616fe28" },
          { cells: ["Amjad Ali Khan", "Sarod", "Bangash gharana"] },
          { cells: ["Buddhadev Dasgupta", "Sarod", "Shahjahanpur gharana"], pyqExampleId: "192759d2-8801-4a3c-8cb9-2c27ddb23724" },
          { cells: ["Shivkumar Sharma", "Santoor", "Made it a concert instrument"], pyqExampleId: "e315f17b-190d-4f64-8d4e-2dcfb3549dfb" },
          { cells: ["Tarun Bhattacharya, Bhajan Sopori", "Santoor", "Other santoor players"], pyqExampleId: "7ebca8b9-e850-48d2-942a-be8a433a78a3" },
          { cells: ["Ram Narayan", "Sarangi", "Made it a solo concert instrument"], pyqExampleId: "5b46c489-64ed-4ddd-aadd-7aa38757a6ca" },
          { cells: ["Shakoor Khan, Sabri Khan", "Sarangi", "Kirana and Senia gharanas"], pyqExampleId: "e6c04a06-8bab-429e-8457-12ff24627793" },
          { cells: ["N. Rajam", "Violin", "Hindustani violinist"], pyqExampleId: "e3b71415-c658-4cfc-9c99-0afe9dad3aa3" },
        ],
      },
      pyqExampleId: "8c97ab89-d2a9-48ec-abbe-3d23b86f7d3c",
      selfCheckExample: {
        prompt: "Pandit Ram Narayan made which instrument a solo concert instrument?",
        steps: ["The sarangi was once used mainly to accompany singers.", "Ram Narayan brought it to the stage as a solo instrument."],
        answer: "The sarangi",
      },
      practiceSet: [
        { prompt: "Which gharana did Ali Akbar Khan belong to?", answer: "The Maihar gharana" },
        { prompt: "Which instrument does N. Rajam play?", answer: "The violin" },
        { prompt: "Shivkumar Sharma played which instrument?", answer: "The santoor" },
        { prompt: "Ustad Shakoor Khan played which instrument?", answer: "The sarangi" },
        { prompt: "Buddhadev Dasgupta played which instrument?", answer: "The sarod" },
      ],
      traps: [
        {
          title: "Ram Narayan is sarangi, not sarod",
          body: "The sarod and the sarangi sound alike as words. Ram Narayan played the sarangi; the pair \"Ram Narayan with sarod\" is the incorrect pair SSC wants you to spot.",
        },
        {
          title: "Maihar is an instrumental gharana",
          body: "Ali Akbar Khan's gharana is Maihar. Kirana, Gwalior and Agra are vocal gharanas, so they are wrong for him.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacin-percussion",
      name: "Tabla, other drums and wind",
      intuition:
        "The drummers and the wind players complete the list. Each name below goes with one instrument; the tabla family has a father and three sons to keep straight.",
      definition:
        "- **Tabla:** **Alla Rakha**, called **Abbaji**, of the Punjab gharana; father of **Zakir Hussain**, Fazal Qureshi and Taufiq Qureshi. In 1968 he recorded an album with the American jazz drummer Buddy Rich. **Kishan Maharaj** of the **Benares** gharana.\n" +
        "- **Pakhawaj**, a drum played by striking: **Totaram Sharma**, **Ayodhya Prasad**.\n" +
        "- **Ghatam**, a clay pot: **T. H. (Vikku) Vinayakram**.\n" +
        "- **Mridangam**, the Carnatic drum: **Umayalpuram K. Sivaraman**.\n" +
        "- **Drums:** **Sivamani**, the percussionist.\n" +
        "- **Shehnai:** **Bismillah Khan**, the first Indian invited to perform at the **Lincoln Center Hall** in the USA.\n" +
        "- **Bansuri** (bamboo flute): **Hariprasad Chaurasia**.",
      table: {
        columns: ["Maestro", "Instrument", "Remember for"],
        rows: [
          { cells: ["Alla Rakha", "Tabla", "Called Abbaji; Zakir Hussain's father"], pyqExampleId: "2f4bde94-c124-4790-9fa1-100632cf7cf2" },
          { cells: ["Kishan Maharaj", "Tabla", "Benares gharana"], pyqExampleId: "9c481ad6-c49c-4a16-ab28-f06e8f30b9d8" },
          { cells: ["Totaram Sharma, Ayodhya Prasad", "Pakhawaj", "Drum played by striking"], pyqExampleId: "cdc74cb8-ffe0-4175-88da-ca230ad20fcf" },
          { cells: ["T. H. Vinayakram", "Ghatam", "Clay pot"], pyqExampleId: "04f7c474-f32f-4ccf-b862-5718c8a61db2" },
          { cells: ["Sivamani", "Drums", "Percussionist"], pyqExampleId: "0f66077c-2116-465e-9f98-83c45f9d86cb" },
          { cells: ["Bismillah Khan", "Shehnai", "First Indian at the Lincoln Center Hall"], pyqExampleId: "9481abd1-04f4-486a-afbd-b872e024a36b" },
          { cells: ["Hariprasad Chaurasia", "Bansuri", "The bamboo flute"], pyqExampleId: "945af502-9873-4f95-bf63-cb68a6dd8be0" },
        ],
      },
      pyqExampleId: "a3f0ae9f-f45e-4d8f-8e07-852eeae00f07",
      selfCheckExample: {
        prompt: "Which instrument did T. H. Vinayakram make famous?",
        steps: ["He is a Carnatic percussionist.", "His instrument is the ghatam, a clay pot."],
        answer: "The ghatam",
      },
      practiceSet: [
        { prompt: "Which tabla player was called Abbaji?", answer: "Ustad Alla Rakha" },
        { prompt: "Bismillah Khan played which instrument?", answer: "The shehnai" },
        { prompt: "Hariprasad Chaurasia plays which instrument?", answer: "The bansuri (bamboo flute)" },
        { prompt: "Pandit Ayodhya Prasad played which drum?", answer: "The pakhawaj" },
        { prompt: "Which gharana did Kishan Maharaj belong to?", answer: "The Benares gharana" },
      ],
      traps: [
        {
          title: "Alla Rakha is the father",
          body: "Zakir Hussain, Fazal Qureshi and Taufiq Qureshi are Alla Rakha's sons. \"Abbaji\" was the father, Alla Rakha himself.",
        },
        {
          title: "Struck means percussion",
          body: "A \"played by striking\" question wants a drum. The pakhawaj is struck; the sitar and the Mohan veena are strings and the shehnai is wind.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacin-classes",
      name: "Families of instruments and regional instruments",
      intuition:
        "Indian texts sort instruments into four families by how they make sound. A few regional instruments complete the questions SSC has asked.",
      definition:
        "The four families, from the Natya Shastra:\n" +
        "- **Tata vadya:** strings (sitar, sarod, veena, violin).\n" +
        "- **Sushira vadya:** wind (flute, shehnai).\n" +
        "- **Avanaddha vadya:** drums with a skin (tabla, mridangam, pakhawaj).\n" +
        "- **Ghana vadya:** solid instruments that are struck and not tuned (cymbals, manjira, kartal, ghatam). They keep rhythm, mostly in folk music.\n\n" +
        "Regional instruments:\n" +
        "- **Timila** and **Maddalam**, Kerala: drums named in the Tamil epic **Silappadikaram** and still played in Panchavadyam.\n" +
        "- **Narsingha**, Himachal Pradesh and Uttarakhand: a long curved horn of copper or brass, blown at festivals.\n" +
        "- **Tambura**, Andhra Pradesh: played by the narrator of **Burrakatha**, the storytelling art.\n" +
        "- **Ravanahatha**, Rajasthan: a bowed folk fiddle.",
      table: {
        columns: ["Name", "Family or region", "Examples or use"],
        rows: [
          { cells: ["Tata vadya", "Strings", "Sitar, sarod, veena, violin"] },
          { cells: ["Sushira vadya", "Wind", "Flute, shehnai"] },
          { cells: ["Avanaddha vadya", "Skin drums", "Tabla, mridangam, pakhawaj"] },
          { cells: ["Ghana vadya", "Solid, struck, not tuned", "Cymbals, manjira, ghatam"] },
          { cells: ["Timila and Maddalam", "Kerala", "Drums named in the Silappadikaram"], pyqExampleId: "65df28c8-90cc-4175-bd26-62f9698190d4" },
          { cells: ["Narsingha", "Himachal Pradesh, Uttarakhand", "Curved copper or brass horn"], pyqExampleId: "b7820156-f928-4fb7-8d90-409b3f1b4536" },
          { cells: ["Tambura", "Andhra Pradesh", "The Burrakatha narrator's instrument"], pyqExampleId: "ccfb0f7b-1e59-4401-ba11-c1a1cc64c8cd" },
          { cells: ["Ravanahatha", "Rajasthan", "Bowed folk fiddle"] },
        ],
      },
      pyqExampleId: "504a8a37-4806-441a-a1e7-6af383a8585a",
      selfCheckExample: {
        prompt: "To which family of instruments do the flute and the shehnai belong?",
        steps: ["Both make sound by blown air.", "Wind instruments are sushira vadya."],
        answer: "Sushira vadya",
      },
      practiceSet: [
        { prompt: "To which family do the tabla and the mridangam belong?", answer: "Avanaddha vadya" },
        { prompt: "The Narsingha horn belongs to which state?", answer: "Himachal Pradesh (and Uttarakhand)" },
        { prompt: "The narrator of Burrakatha plays which instrument?", answer: "The tambura" },
        { prompt: "The Ravanahatha is a folk instrument of which state?", answer: "Rajasthan" },
      ],
      traps: [
        {
          title: "Ghana is not the drum family",
          body: "Ghana vadya are solid instruments struck together, such as cymbals. Drums with a skin are avanaddha vadya.",
        },
        {
          title: "Ravanahatha is Rajasthan's, not Kerala's",
          body: "The Ravanahatha is a bowed instrument of Rajasthan. Kerala's old instruments are drums such as the Timila and the Maddalam.",
        },
      ],
    },
  ],
};
