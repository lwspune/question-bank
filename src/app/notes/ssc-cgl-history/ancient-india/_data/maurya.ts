import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_MAURYA_NOTE: SubtopicNote = {
  subtopicName: "Mahajanapadas, Magadha and Mauryan Empire",
  title: "Mahajanapadas, Magadha and Mauryan Empire",
  oneLineDefinition:
    "The sixteen great kingdoms and why Magadha won, the Buddhist, Jain and Ajivika teachers, Chandragupta and Kautilya's state, and Ashoka's war and Dhamma.",
  whyItMatters:
    "Thirty-three questions in the bank, the most of any page in this chapter: 18 from the 2023 shifts, nine from the 2024 shifts and six from the 2025 shifts. Chandragupta's state, Kautilya's officers and the Greek envoys account for 13 of them, so that concept is the one to learn first.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschanma-janapadas",
      name: "The mahajanapadas and the rise of Magadha",
      intuition:
        "In the sixth century BCE there were sixteen big kingdoms. Magadha beat the rest because it had iron, rich land, elephants and rivers that guarded it, and because its kings used marriage as well as war.",
      definition:
        "The kingdoms SSC asks about:\n" +
        "- **Magadha** (south Bihar): bounded by the **Ganga** and the **Son**; capital Rajagriha, later **Pataliputra**. Its strengths: **iron ore** nearby (now Jharkhand), fertile land and forest elephants.\n" +
        "- **Vajji**: a confederacy led by the Lichchhavis, capital **Vaishali**.\n" +
        "- **Kosala**: capitals **Shravasti** and Ayodhya, in present **Uttar Pradesh**.\n" +
        "- **Anga**: capital Champa. **Avanti**: capital Ujjain.\n\n" +
        "Magadha's dynasties, in order: **Haryanka** (Bimbisara, Ajatashatru), **Shishunaga**, **Nanda**. **Bimbisara** married a Kosalan princess, a sister of King Prasenajit, which kept **peace with Kosala** while he expanded east.",
      table: {
        columns: ["Kingdom", "Capital", "Present region"],
        rows: [
          { cells: ["Magadha", "Rajagriha, then Pataliputra", "South Bihar"], pyqExampleId: "31b83fef-a82f-47da-bfd6-233d91a7820f" },
          { cells: ["Vajji", "Vaishali", "North Bihar"], pyqExampleId: "236a0d30-c7c6-4d41-bdfd-dcb12be3b851" },
          { cells: ["Kosala", "Shravasti, Ayodhya", "Uttar Pradesh"], pyqExampleId: "b603a4aa-9876-4043-897c-2144f44b4bd0" },
          { cells: ["Anga", "Champa", "East Bihar"] },
          { cells: ["Avanti", "Ujjain", "Madhya Pradesh"] },
        ],
      },
      pyqExampleId: "a4fad8d0-92eb-4a8d-9bcc-5a43d5d86a50",
      selfCheckExample: {
        prompt: "Give three reasons why Magadha became the strongest mahajanapada.",
        steps: [
          "It had rich iron ore nearby, for better tools and weapons.",
          "It had fertile Ganga land and forest elephants for its army.",
          "The Ganga and the Son guarded it, and its kings were ambitious.",
        ],
        answer: "Iron ore, fertile land with elephants, and river defences.",
      },
      practiceSet: [
        { prompt: "What was the capital of the Vajji confederacy?", answer: "Vaishali" },
        { prompt: "Which two rivers bounded Magadha?", answer: "The Ganga and the Son" },
        { prompt: "Which dynasty did Bimbisara belong to?", answer: "The Haryanka dynasty" },
        { prompt: "In which present state was the Kosala mahajanapada?", answer: "Uttar Pradesh" },
      ],
      traps: [
        {
          title: "Pataliputra was not Vajji's capital",
          body: "**Vaishali** was the Vajji capital. **Pataliputra** became **Magadha's** capital later.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanma-religions",
      name: "Buddhism, Jainism and the Ajivikas",
      intuition:
        "Several new teachers arose in the same century. SSC asks the people around each: the Buddha's disciples and the first nun, the first Tirthankara, the councils that split Buddhism, and the fatalist Ajivikas.",
      definition:
        "**Buddhism**:\n" +
        "- **Mahapajapati Gotami**, the Buddha's foster mother, was the **first woman ordained**, starting the order of nuns.\n" +
        "- His chief disciples included **Ananda, Upali and Sariputta**. (Susima was Ashoka's half-brother, not a disciple.)\n" +
        "- The **Fourth Buddhist Council** met in **Kashmir** under the Kushana king **Kanishka**; there Buddhism split into **Hinayana and Mahayana**.\n" +
        "- A **stupa** has a dome (**anda**) holding the relics, a square railing on top (**harmika**), seen as the abode of the gods, and an umbrella (chhatra).\n" +
        "- **Vikramshila** university was founded by the Pala king **Dharmapala**.\n\n" +
        "**Jainism**: 24 Tirthankaras. The first is **Rishabhadeva (Adinatha)**, the 23rd **Parshvanatha** and the 24th **Mahavira**.\n\n" +
        "**Ajivikas**: their chief teacher was **Makkhali Gosala**, and they believed in **niyati**, fate: everything is fixed and effort changes nothing.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["First Buddhist nun", "Mahapajapati Gotami"], pyqExampleId: "7b67e3dc-8902-4c7f-8ca2-c0e96fe15012" },
          { cells: ["Fourth Council and the Hinayana-Mahayana split", "Kashmir, under Kanishka"], pyqExampleId: "8eaf8939-8cf3-4aa8-a71b-ea3fc837f048" },
          { cells: ["Vikramshila university", "Dharmapala (Pala)"], pyqExampleId: "1898177b-e67a-46fa-b3d2-802ce0451f0a" },
          { cells: ["23rd and 24th Tirthankaras", "Parshvanatha, Mahavira"] },
          { cells: ["Ajivika teacher and belief", "Makkhali Gosala; fatalism (niyati)"], pyqExampleId: "77148a61-5cb2-4967-af8e-b9b9ae892b74" },
        ],
      },
      pyqExampleId: "07cd617f-96a4-4b5f-8456-5c0138786ca5",
      selfCheckExample: {
        prompt: "In a stupa, where were the relics kept, and what is the harmika?",
        steps: [
          "The relics were placed in a casket inside the dome, the anda.",
          "The harmika is the square railing on top of the dome, seen as the abode of the gods.",
        ],
        answer: "Relics inside the anda; the harmika is the railing on top, the abode of the gods.",
      },
      practiceSet: [
        { prompt: "Name the first woman admitted to the Buddhist order of nuns.", answer: "Mahapajapati Gotami" },
        { prompt: "Under which king was the Fourth Buddhist Council held?", answer: "Kanishka" },
        { prompt: "Who was the 24th Tirthankara?", answer: "Mahavira" },
        { prompt: "Which Pala king founded Vikramshila university?", answer: "Dharmapala" },
        { prompt: "Who was the chief teacher of the Ajivikas?", answer: "Makkhali Gosala" },
      ],
      traps: [
        {
          title: "Parshvanatha is 23rd, not first",
          body: "**Parshvanatha** is the 23rd Tirthankara and the best known before Mahavira, so he appears as a wrong option for the first. The first is **Rishabhadeva**.",
        },
        {
          title: "The relics are in the dome",
          body: "The **harmika** is the railing on top. The relics lie **inside the anda**, so a statement putting them in the harmika is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanma-chandragupta",
      name: "Chandragupta, Kautilya and the Greeks",
      intuition:
        "Chandragupta Maurya built the first large, tightly run empire, with Kautilya's Arthashastra as its handbook and Greek envoys as its witnesses. SSC asks the officers' titles and the names of the Greeks.",
      definition:
        "**Chandragupta Maurya** overthrew the Nandas with the help of **Kautilya** (Chanakya), whose personal name was **Vishnugupta** and who wrote the **Arthashastra**. He defeated **Seleucus Nicator** (about 305 BCE), who then sent **Megasthenes** to his court. Megasthenes wrote the **Indica** and divided Indian society into **seven classes**. Later, **Deimachus** came to **Bindusara's** court, sent by Antiochus I.\n\n" +
        "Kautilya's **seven limbs (saptanga)** of the state: Swami (king), **Amatya** (ministers and officials), Janapada (territory), Durga (fort), Kosha (treasury), Danda (army), Mitra (ally).\n\n" +
        "The Mauryan state was **highly centralised**: the king ruled through a large paid staff, army and spies. **Princes (Kumaras)** governed the provinces.",
      table: {
        columns: ["Officer", "Duty"],
        rows: [
          { cells: ["Samaharta", "Assessing and collecting revenue"], pyqExampleId: "dd12e352-41f1-4f5f-a208-adecf1b18e67" },
          { cells: ["Sannidhata", "Treasury"] },
          { cells: ["Ashwadhyaksha", "Cavalry (horses)"], pyqExampleId: "8fdfc2df-952e-4475-a57b-341a5a931686" },
          { cells: ["Hastyadhyaksha", "Elephants"] },
          { cells: ["Rathadhyaksha", "Chariots"] },
          { cells: ["Kumara", "Governor of a province (a prince)"] },
        ],
      },
      pyqExampleId: "cffc9076-e755-4f89-bc39-e81833cab632",
      selfCheckExample: {
        prompt: "Two Greek envoys came to Pataliputra. Who sent each, and to which king?",
        steps: [
          "Megasthenes was sent by Seleucus Nicator to Chandragupta Maurya.",
          "Deimachus was sent by Antiochus I to Bindusara.",
        ],
        answer: "Megasthenes: Seleucus to Chandragupta. Deimachus: Antiochus I to Bindusara.",
      },
      practiceSet: [
        { prompt: "What was Kautilya's personal name?", answer: "Vishnugupta" },
        { prompt: "Which Greek king did Chandragupta Maurya defeat?", answer: "Seleucus Nicator" },
        { prompt: "Into how many classes did Megasthenes divide Indian society?", answer: "Seven" },
        { prompt: "In Kautilya's saptanga, what does Amatya mean?", answer: "Ministers and officials" },
        { prompt: "Which Mauryan officer was in charge of the treasury?", answer: "The Sannidhata" },
      ],
      traps: [
        {
          title: "Samaharta collects, Sannidhata stores",
          body: "The **Samaharta** assessed and collected revenue; the **Sannidhata** kept the treasury. SSC offers each as the other's job.",
        },
        {
          title: "Deimachus came to Bindusara",
          body: "**Megasthenes** is the envoy of **Chandragupta's** time. **Deimachus** came later, to **Bindusara**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanma-ashoka",
      name: "Ashoka, Kalinga and the Dhamma",
      intuition:
        "One war changed Ashoka. After Kalinga he gave up conquest, preached a moral code he called Dhamma, and sent missions abroad. His own inscriptions tell the story, under a title rather than his name.",
      definition:
        "The facts:\n" +
        "- **Kalinga** was conquered about **261 BCE**, **eight years** after Ashoka's coronation. After its bloodshed he **gave up war**.\n" +
        "- His inscriptions call him **Devanampiya Piyadasi**. The **Maski** edict is the one that names him as Ashoka.\n" +
        "- His son **Mahendra** and daughter **Sanghamitra** took Buddhism to **Sri Lanka (Ceylon)**.\n" +
        "- **Dhamma** was a moral code for ordinary people: **non-violence**, **tolerance of all sects**, respect for elders and kindness to servants. Historians also read it as a way to hold the empire together. It did not preach **celibacy**, which is a rule for monks.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Year of the Kalinga war", "About 261 BCE"], pyqExampleId: "78b6fe9b-3686-48a8-b822-a473c41f6758" },
          { cells: ["Years after his coronation", "Eight"], pyqExampleId: "807b5c16-3cd6-4028-ae9f-e80fd98a60b4" },
          { cells: ["Title in his inscriptions", "Devanampiya Piyadasi"], pyqExampleId: "4869b925-d8d5-4240-b878-bede27f7d822" },
          { cells: ["Mission to Sri Lanka", "Mahendra and Sanghamitra"], pyqExampleId: "50f730f8-d151-4f11-b406-3ece446a7de4" },
        ],
      },
      pyqExampleId: "2a32e579-9a8a-42cc-9790-be63ac4c50a9",
      selfCheckExample: {
        prompt: "Which of these was NOT part of Ashoka's Dhamma: tolerance of all sects, non-violence, celibacy, respect for elders?",
        steps: [
          "Dhamma was a code for householders: non-violence, tolerance and respect for elders all belong to it.",
          "Celibacy is a rule for monks and nuns, which Dhamma never asked of ordinary people.",
        ],
        answer: "Celibacy.",
      },
      practiceSet: [
        { prompt: "Which Mauryan ruler conquered Kalinga?", answer: "Ashoka" },
        { prompt: "Which edict was the first to name Ashoka by his own name?", answer: "The Maski edict" },
        { prompt: "To which country did Ashoka send Mahendra and Sanghamitra?", answer: "Sri Lanka (Ceylon)" },
        { prompt: "How many years after his coronation did Ashoka conquer Kalinga?", answer: "Eight" },
      ],
      traps: [
        {
          title: "Mahinda was a monk, not a king",
          body: "Ashoka's son **Mahinda (Mahendra)** became a Buddhist monk. An option naming him as the king who gave up war is wrong: that was **Ashoka**.",
        },
      ],
    },
  ],
};
