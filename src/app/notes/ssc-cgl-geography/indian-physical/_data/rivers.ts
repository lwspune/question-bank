import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIP_RIVERS_NOTE: SubtopicNote = {
  subtopicName: "Rivers, Lakes and Water Resources",
  title: "Rivers, Lakes and Water Resources",
  oneLineDefinition:
    "The Himalayan rivers with their sources, names and tributaries, the peninsular rivers by the sea they reach, and India's lakes, dams and traditional water harvesting.",
  whyItMatters:
    "Forty-one questions in the bank, the most of any page in this chapter: 16 from the 2023 shifts, 18 from the 2024 shifts and seven from the 2025 shifts, 28 of them EASY. Most ask a river's source, its tributary or the sea it reaches, so learn each river with those three facts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgipri-himalayan",
      name: "The Himalayan rivers",
      intuition:
        "Three great river systems come down from the Himalayas: the Indus, the Ganga and the Brahmaputra. Each has its own source, its own tributaries and, for the Brahmaputra, different names in different countries.",
      definition:
        "**Indus**: rises near Lake Mansarovar in Tibet, where it is called **Singi Khamban** (Lion's Mouth). It flows north-west between the Ladakh and Zaskar ranges and enters Pakistan near Nanga Parbat. Its Punjab tributaries are the Jhelum, Chenab, **Ravi** (through Chamba, about 720 km), Beas and Sutlej.\n" +
        "- The land between two rivers is a **doab**: **Bist** (Beas and Sutlej), Bari (Beas and Ravi), Rachna (Ravi and Chenab), Chaj (Chenab and Jhelum).\n\n" +
        "**Ganga**: the **Bhagirathi** and the **Alaknanda** meet at **Devaprayag** to form it. Its tributaries include the Yamuna, the **Ghaghara** (fed in Nepal by the Tila, Seti and Bheri), the **Gandak** and the Kosi.\n\n" +
        "**Brahmaputra**: called the **Tsangpo** in Tibet, the Siang or Dihang in Arunachal Pradesh, and the **Jamuna** in Bangladesh. Its tributaries include the **Subansiri, Jia Bharali, Dhansiri** and the **Lohit**. **Majuli**, in the Brahmaputra in Assam, is the world's largest inhabited river island.",
      table: {
        columns: ["River", "Fact"],
        rows: [
          { cells: ["Ganga", "Bhagirathi and Alaknanda meet at Devaprayag"], pyqExampleId: "9666e5da-3b75-45e2-96c4-aad6bd9d3010" },
          { cells: ["Brahmaputra", "Tsangpo in Tibet, Jamuna in Bangladesh"], pyqExampleId: "667405a5-6ef1-4288-91c7-a1456ab64a87" },
          { cells: ["Lohit", "Tributary of the Brahmaputra"], pyqExampleId: "015f0ff6-7a00-4917-805e-f119b2b0bd7e" },
          { cells: ["Gandak", "Tributary of the Ganga"], pyqExampleId: "6acb53c5-1f31-4506-aa07-7d8f2db9948f" },
          { cells: ["Ravi", "Rises near Rohtang; flows through Chamba"], pyqExampleId: "ef0c8f2a-6244-4465-bd5c-8b76565313ba" },
          { cells: ["Bist Doab", "Between the Beas and the Sutlej"], pyqExampleId: "c605a99d-cfbb-47ff-8d7b-fec4adb6a1aa" },
        ],
      },
      pyqExampleId: "498fc84a-8539-4cf6-9511-9ff8bf2435f0",
      selfCheckExample: {
        prompt: "Which of these is NOT a tributary of the Ganga: Yamuna, Kosi, Lohit, Gandak?",
        steps: ["The Yamuna, the Kosi and the Gandak all join the Ganga.", "The Lohit joins the Brahmaputra in Assam."],
        answer: "The Lohit.",
      },
      practiceSet: [
        { prompt: "Where do the Bhagirathi and the Alaknanda meet?", answer: "Devaprayag" },
        { prompt: "What is the Brahmaputra called in Bangladesh?", answer: "Jamuna" },
        { prompt: "What is the world's largest inhabited river island?", answer: "Majuli, in the Brahmaputra" },
        { prompt: "Which State has the greatest length of rivers and canals?", answer: "Uttar Pradesh" },
      ],
      traps: [
        {
          title: "Bist Doab is Beas and Sutlej",
          body: "The **Bist** Doab lies between the **Beas and the Sutlej**. A pair giving it the Beas and the Chenab is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipri-peninsular",
      name: "The peninsular rivers",
      intuition:
        "Most peninsular rivers flow east into the Bay of Bengal because the plateau tilts that way. A few flow west into the Arabian Sea, two of them through rift valleys. Sort every river into east or west first.",
      definition:
        "**East-flowing** (to the Bay of Bengal):\n" +
        "- **Mahanadi**: rises near Sihawa, Chhattisgarh.\n" +
        "- **Godavari**: rises at **Trimbakeshwar** (Maharashtra). Tributaries: Purna, **Pranhita** (formed by the **Wardha** and Wainganga), Manjra, Indravati. Its branch the **Gautami** reaches the sea past Yanam.\n" +
        "- **Krishna**: rises at **Mahabaleshwar**. Also the Kaveri and the Penner.\n\n" +
        "**West-flowing** (to the Arabian Sea):\n" +
        "- **Narmada**: rises at **Amarkantak** and flows through a rift valley. The **Sardar Sarovar** dam on it serves Gujarat, Madhya Pradesh, Maharashtra and Rajasthan.\n" +
        "- **Tapi**: rises at Betul and flows through Madhya Pradesh, Maharashtra and Gujarat; tributaries include the Aner, Panzara and Waghur.\n" +
        "- **Mahi** and **Sabarmati**, to the Gulf of Khambhat; Kerala's rivers such as the Periyar and Pamba.\n\n" +
        "Others: the **Luni** flows from Rajasthan into the Rann of Kutch in Gujarat; the **Chambal** and its ravines cross Madhya Pradesh, Rajasthan and Uttar Pradesh.",
      table: {
        columns: ["River", "Source", "Sea"],
        rows: [
          { cells: ["Godavari", "Trimbakeshwar", "Bay of Bengal"], pyqExampleId: "ee385fa2-0b77-4654-8f2a-0d600a79bb94" },
          { cells: ["Krishna", "Mahabaleshwar", "Bay of Bengal"], pyqExampleId: "f1e60e11-c809-4e8c-91ee-ec81bdf91b70" },
          { cells: ["Mahanadi", "Sihawa", "Bay of Bengal"] },
          { cells: ["Narmada", "Amarkantak", "Arabian Sea"], pyqExampleId: "30b124cc-243f-4b84-b673-ab72efd6a800" },
          { cells: ["Sabarmati", "Aravallis", "Arabian Sea"], pyqExampleId: "e2d2ae16-e630-4452-bb4b-64364060dcf3" },
          { cells: ["Tapi", "Betul", "Arabian Sea"], pyqExampleId: "f35a36dd-fd10-47ef-96fd-787d1de30a9f" },
        ],
      },
      pyqExampleId: "1ccd3f4b-e546-41dd-98d8-e2087ef58394",
      selfCheckExample: {
        prompt: "Which of these flows east: Narmada, Mahi, Godavari, Tapi?",
        steps: ["The Narmada, the Mahi and the Tapi flow west into the Arabian Sea.", "The Godavari flows east into the Bay of Bengal."],
        answer: "The Godavari.",
      },
      practiceSet: [
        { prompt: "Where does the Narmada rise?", answer: "Amarkantak" },
        { prompt: "Which two rivers join to form the Pranhita?", answer: "The Wardha and the Wainganga" },
        { prompt: "Which four States share the Sardar Sarovar project?", answer: "Gujarat, Madhya Pradesh, Maharashtra and Rajasthan" },
        { prompt: "Into which water body does the Luni drain?", answer: "The Rann of Kutch" },
      ],
      traps: [
        {
          title: "The Sutlej does not start at Dal Lake",
          body: "The **Sutlej** rises near Lake Mansarovar in Tibet. **Dal Lake** is in Srinagar. The other source pairs (Godavari at Trimbakeshwar, Mahanadi at Sihawa) are right.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipri-lakes",
      name: "Lakes, dams and water harvesting",
      intuition:
        "Lake questions ask which is largest by some measure, and whether its water is fresh or salty. Water harvesting questions ask which old method belongs to which region.",
      definition:
        "Lakes:\n" +
        "- **Wular** (Jammu and Kashmir): the largest **freshwater** lake.\n" +
        "- **Chilika** (Odisha): the largest **brackish** lagoon. **Pulicat** is brackish too. **Vembanad** (Kerala) is the longest lake.\n" +
        "- Loktak, Bhimtal and Nainital are freshwater lakes.\n" +
        "- Bhopal's **Upper Lake**, built in the 11th century, is often called Asia's largest artificial lake.\n\n" +
        "Dams: **Maharashtra** has the most large dams. A dam can be classed by structure, purpose and height; **spillways** let surplus water out.\n\n" +
        "Traditional water harvesting:\n" +
        "- **Guls or kuls**: channels in the **Western Himalayas**.\n" +
        "- **Khadins**: run-off farms of **Jaisalmer**. **Kunds or tankas**: covered tanks of **Rajasthan**. Johads: earthen dams.\n\n" +
        "The **Thar** streams flow only after rain and most vanish into the sand. The richest **groundwater** lies in the loose (**unconsolidated**) alluvium of the northern plains.",
      table: {
        columns: ["Lake or method", "Fact"],
        rows: [
          { cells: ["Wular", "Largest freshwater lake"] },
          { cells: ["Pulicat", "Brackish lagoon, not freshwater"], pyqExampleId: "79a0ac6a-7cbd-4a41-85f0-484b0cfa5ce5" },
          { cells: ["Upper Lake, Bhopal", "Largest artificial lake in Asia"], pyqExampleId: "0665bec7-8085-43a1-a79a-4680eb768b3d" },
          { cells: ["Guls or kuls", "Western Himalayas"], pyqExampleId: "b8c589d4-7403-4b13-ac44-f5a88a6a97b8" },
          { cells: ["Khadins", "Jaisalmer"], pyqExampleId: "b4095a45-845f-4c8f-bfd8-df9a6aaa3c2f" },
          { cells: ["Kunds or tankas", "Rajasthan"], pyqExampleId: "0258cb91-a268-452c-877b-bd41e2c64146" },
        ],
      },
      pyqExampleId: "ed3de76d-0573-4e91-8379-6da46a9239dd",
      selfCheckExample: {
        prompt: "Match each water-harvesting method to its region: guls, khadins, tankas.",
        steps: ["Guls (kuls) are channels in the Western Himalayas.", "Khadins belong to Jaisalmer, and tankas are covered tanks across dry Rajasthan."],
        answer: "Guls: Western Himalayas. Khadins: Jaisalmer. Tankas: Rajasthan.",
      },
      practiceSet: [
        { prompt: "Which State has the most large dams?", answer: "Maharashtra" },
        { prompt: "Is Pulicat a freshwater lake?", answer: "No, it is a brackish lagoon" },
        { prompt: "Which lake is India's largest brackish-water lagoon?", answer: "Chilika" },
        { prompt: "What happens to most streams in the Thar desert?", answer: "They disappear into the sand" },
      ],
      traps: [
        {
          title: "Largest freshwater, largest brackish, longest",
          body: "**Wular** is the largest **freshwater** lake, **Chilika** the largest **brackish** lagoon and **Vembanad** the **longest**. Read which 'largest' the question means.",
        },
      ],
    },
  ],
};
