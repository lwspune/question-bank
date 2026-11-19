import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_FOLK_CE_NOTE: SubtopicNote = {
  subtopicName: "Folk Dances of Central, East and North-East India",
  title: "Folk Dances of Central, East and North-East India",
  oneLineDefinition:
    "The folk dances of Chhattisgarh, Madhya Pradesh and Jharkhand, of Odisha with the three styles of Chhau, and of the North-East and Sikkim, each with its state, its people and one detail.",
  whyItMatters:
    "33 questions in the bank: 14 from the 2023 shifts, 5 from 2024 and 14 from 2025. Chhattisgarh's Panthi alone is asked four times and Tripura's Hojagiri three times. The three match-the-following questions of this chapter sit here because they pair these dances with the western ones of the page before.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsacfc-central",
      name: "Chhattisgarh, Madhya Pradesh and Jharkhand",
      intuition:
        "Central India's dances belong to named communities: the Satnamis, the Yadav cowherds, the Baiga, the Santhals. Learn the community with the dance and the state follows.",
      definition:
        "- **Panthi**, Chhattisgarh: the devotional dance of the **Satnami** community in praise of their founder **Guru Ghasidas**; its songs carry his teachings. The men wear white **dhotis**, waist bands and ankle bells. The Satnamis worship a formless god (Satnam), so no masks of god are worn.\n" +
        "- **Raut Nacha**, Chhattisgarh: the dance of the Yadav (Raut) cowherds around Diwali.\n" +
        "- **Baiga**, Madhya Pradesh: the dance of the Baiga tribe of Dindori and Mandla.\n" +
        "- **Matki**, Malwa, Madhya Pradesh: women dance balancing earthen pots (matkis) on the head.\n" +
        "- **Jhumar**, Jharkhand: a harvest dance in linked rows to the **mandar** and **nagara** drums. **Mardani Jhumar** is danced by **men**, Janani Jhumar by women. The tea-garden communities of Assam dance a Jhumar too.\n" +
        "- **Jhika Dasain**, Jharkhand: danced by **Santhal** men in the Durga Puja season.\n" +
        "- **Jamda**, Jharkhand: a tribal folk dance.\n" +
        "- **Karma**: danced at the Karma festival on Bhadra Ekadashi, a farming rite of Jharkhand and Chhattisgarh.",
      table: {
        columns: ["Dance", "State", "Who and how"],
        rows: [
          { cells: ["Panthi", "Chhattisgarh", "Satnamis; Guru Ghasidas; white dhoti"], pyqExampleId: "d70b6a8f-1285-4c36-9d93-2aceea525e5b" },
          { cells: ["Raut Nacha", "Chhattisgarh", "Yadav cowherds; Diwali"] },
          { cells: ["Baiga", "Madhya Pradesh", "Baiga tribe of Dindori"], pyqExampleId: "35c56927-1559-4474-98c9-606e72de48af" },
          { cells: ["Matki", "Madhya Pradesh (Malwa)", "Women balance earthen pots"], pyqExampleId: "904f457d-e1d7-4d5b-bd70-e1639d04dbf9" },
          { cells: ["Jhumar", "Jharkhand", "Harvest; mandar and nagara; Mardani by men"], pyqExampleId: "43254b80-55a6-4c67-a168-f8a867e058a3" },
          { cells: ["Jhika Dasain", "Jharkhand", "Santhal men; Durga Puja season"], pyqExampleId: "50ca4882-fa6c-421d-b3e3-56f0ce2942bf" },
          { cells: ["Jamda", "Jharkhand", "Tribal folk dance"], pyqExampleId: "b58e4b7a-b104-4d71-ad8a-1677151b7904" },
          { cells: ["Karma", "Jharkhand and Chhattisgarh", "Karma festival, Bhadra Ekadashi"] },
        ],
      },
      pyqExampleId: "30e8ef27-ccbf-45a2-bf39-a1183859398d",
      selfCheckExample: {
        prompt: "Which community dances Panthi?",
        steps: ["Panthi praises Guru Ghasidas.", "His followers, the Satnamis of Chhattisgarh, are the community that dances it."],
        answer: "The Satnami community",
      },
      practiceSet: [
        { prompt: "Matki is a dance of which region of Madhya Pradesh?", answer: "Malwa" },
        { prompt: "Who dances the Mardani Jhumar, men or women?", answer: "Men" },
        { prompt: "Jhika Dasain is danced by which tribe?", answer: "The Santhals" },
        { prompt: "Raut Nacha is a folk dance of which state?", answer: "Chhattisgarh" },
        { prompt: "The Baiga dance belongs to which state?", answer: "Madhya Pradesh" },
      ],
      traps: [
        {
          title: "Panthi dancers wear no masks of god",
          body: "The Satnamis worship a formless Satnam and reject idols, so Panthi has no masks of Satpurush. A statement saying it does is false.",
        },
        {
          title: "Mardani Jhumar is the men's dance",
          body: "Mardani means of men: Mardani Jhumar is danced by men, Janani Jhumar by women. A statement giving the Mardani form to women alone is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacfc-odisha",
      name: "Odisha, and Chhau across three states",
      intuition:
        "Odisha's folk dances come from warriors, temple boys, storytellers and village women. Chhau is the one dance that three states share, and SSC asks which style belongs where.",
      definition:
        "- **Chhau:** a masked martial dance with **three styles**, each named after its home: **Mayurbhanj** (Odisha), **Seraikella** (Jharkhand) and **Purulia** (West Bengal). It blends tribal, folk and martial traditions with stories from the Hindu epics. On UNESCO's intangible heritage list since **2010**.\n" +
        "- **Paika**, Odisha: the martial dance of the Paika warriors (the **Khandayat** caste) with shield and sword.\n" +
        "- **Gotipua**, Odisha: boys dressed as girls dance to songs of **Krishna** and **Jagannath**.\n" +
        "- **Dalkhai**, western Odisha: a women's dance at Dussehra.\n" +
        "- **Ghumra**, Kalahandi, Odisha: a drum dance.\n" +
        "- **Daskathia**, Odisha: two men tell Puranic and historical stories, keeping time with a wooden clapper (the **kathia**).",
      table: {
        columns: ["Dance", "State", "Who and how"],
        rows: [
          { cells: ["Chhau", "Odisha, Jharkhand, West Bengal", "Mayurbhanj, Seraikella and Purulia styles; UNESCO 2010"], pyqExampleId: "24a07849-554a-4ae9-b22d-41f14906d6ea" },
          { cells: ["Paika", "Odisha", "Khandayat warriors; shield and sword"], pyqExampleId: "deee06e4-5ea6-4ba0-87e8-ff7b5aff9041" },
          { cells: ["Gotipua", "Odisha", "Boys; Krishna and Jagannath songs"], pyqExampleId: "00404351-76e0-4588-b321-f3065871a1a0" },
          { cells: ["Dalkhai", "Odisha (west)", "Women; Dussehra"], pyqExampleId: "6d4f1e8d-7a05-4da5-91d5-54b4c548279b" },
          { cells: ["Ghumra", "Odisha (Kalahandi)", "Drum dance"], pyqExampleId: "25e8acc5-ae29-487d-9dd2-428a79cefa3d" },
          { cells: ["Daskathia", "Odisha", "Two men; the kathia clapper"], pyqExampleId: "edd3d946-eebc-4455-8c85-98dd3abb4855" },
        ],
      },
      pyqExampleId: "7a0ca2ab-8a78-43a8-a3f8-faffc818b377",
      selfCheckExample: {
        prompt: "Which style of Chhau belongs to Jharkhand?",
        steps: ["Each style is named after its home: Mayurbhanj in Odisha, Purulia in West Bengal.", "Seraikella is in Jharkhand."],
        answer: "Seraikella Chhau",
      },
      practiceSet: [
        { prompt: "Daskathia keeps time with which wooden instrument?", answer: "The kathia, a wooden clapper" },
        { prompt: "Who dances Gotipua?", answer: "Boys dressed as girls" },
        { prompt: "Dalkhai is a folk dance of which state?", answer: "Odisha" },
        { prompt: "Purulia Chhau belongs to which state?", answer: "West Bengal" },
        { prompt: "Paika was the dance of which warrior caste?", answer: "The Khandayats" },
      ],
      traps: [
        {
          title: "Chhau belongs to three states",
          body: "Chhau has three styles in Odisha, Jharkhand and West Bengal. Any of the three can be the answer; read the options for the one that is there.",
        },
        {
          title: "Bhavai is not Odisha's",
          body: "Paika, Ghumra and Dhap are dances of Odisha. Bhavai, the pot-balancing dance, is from Rajasthan and Gujarat, so it is the answer when SSC asks which dance is not from Odisha.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacfc-northeast",
      name: "The North-East, Sikkim and Bhutan",
      intuition:
        "Most North-East dances carry a tribe's name or a festival. The tribe usually gives away the state: the Reang are in Tripura, the Lepchas in Sikkim, the Chang Nagas in Nagaland.",
      definition:
        "- **Hojagiri**, Tripura: **Reang (Bru)** women balance a bottle and lit lamps on the head while standing on earthen pitchers.\n" +
        "- **Bhortal**, Assam: a group dance with cymbals (bhortal), built from the Sattriya tradition. **Bihu** is Assam's spring festival dance.\n" +
        "- **Thabal Chongba**, Manipur: \"dancing in the moonlight\" at **Yaoshang** (Holi).\n" +
        "- **Thang-Ta**, Manipur: the Meitei martial art of the sword (thang) and spear (ta), also danced as a ritual.\n" +
        "- **Changai**, Nagaland: the dance of the **Chang Naga** tribe. The **Kuki** dance is also listed among Nagaland's.\n" +
        "- **Cheraw**, Mizoram: the bamboo dance; dancers step in and out of bamboo staves clapped together. **Khuallam**, Mizoram: the dance of the guests.\n" +
        "- **Chu Faat**, Sikkim: the **Lepchas** honour Mount Kanchenjunga. **Maruni**, Sikkim: a Nepali women's dance at weddings and Tihar.\n" +
        "- **Joenpa Legso** is the welcome dance of **Bhutan**, not of any Indian state.",
      table: {
        columns: ["Dance", "State", "Who and how"],
        rows: [
          { cells: ["Hojagiri", "Tripura", "Reang women balance lamps on pitchers"], pyqExampleId: "601f9c75-62b0-4875-bb7a-6e6415a10796" },
          { cells: ["Bhortal", "Assam", "Cymbal dance"], pyqExampleId: "cf9a52b4-bc91-423c-8f63-62a98516eb87" },
          { cells: ["Thabal Chongba", "Manipur", "Moonlight dance at Yaoshang"], pyqExampleId: "fcd6d222-3fe2-40cb-8220-f85835ce735f" },
          { cells: ["Thang-Ta", "Manipur", "Sword and spear"], pyqExampleId: "b8de7567-d969-4f01-bf85-e731ba7d503f" },
          { cells: ["Changai", "Nagaland", "Chang Naga tribe"], pyqExampleId: "7df9f858-1c44-4e42-8df7-df7ead5c032a" },
          { cells: ["Kuki dance", "Nagaland", "Kuki tribe"], pyqExampleId: "be41bb29-d108-4456-8549-35abcc3f48c1" },
          { cells: ["Cheraw", "Mizoram", "Bamboo dance"], pyqExampleId: "1b2a84fe-1040-4bad-a713-e21546895155" },
          { cells: ["Khuallam", "Mizoram", "Dance of the guests"], pyqExampleId: "dbfcf7ac-4912-4435-a553-1bca97ea397a" },
          { cells: ["Chu Faat", "Sikkim", "Lepchas; Mount Kanchenjunga"], pyqExampleId: "ea4b13c3-1def-43ef-99a5-3f666ac25218" },
          { cells: ["Maruni", "Sikkim", "Nepali women; weddings and Tihar"], pyqExampleId: "8ff8a1a5-c3bd-40c3-8b6f-ea3b8c0aa366" },
          { cells: ["Joenpa Legso", "Bhutan (a country)", "Welcome dance"], pyqExampleId: "9680bb90-158d-4e94-955b-d0a071a456f3" },
        ],
      },
      pyqExampleId: "407eb643-26b1-475c-9380-e7b6bffc8fe0",
      selfCheckExample: {
        prompt: "Which Mizoram dance is called the dance of the guests?",
        steps: ["Mizoram's two dances here are Cheraw, the bamboo dance, and Khuallam.", "Khuallam is the dance of the guests."],
        answer: "Khuallam",
      },
      practiceSet: [
        { prompt: "Thabal Chongba is danced at which festival?", answer: "Yaoshang (Holi)" },
        { prompt: "Chu Faat is danced by which people?", answer: "The Lepchas of Sikkim" },
        { prompt: "Joenpa Legso is the welcome dance of which country?", answer: "Bhutan" },
        { prompt: "Changai is the dance of which tribe?", answer: "The Chang Naga tribe" },
        { prompt: "Maruni is a folk dance of which state?", answer: "Sikkim" },
      ],
      traps: [
        {
          title: "Hojagiri is Tripura's",
          body: "Hojagiri belongs to the Reang (Bru) of Tripura. Options that give it to the Bodo of Assam or the Angami of Nagaland are wrong.",
        },
        {
          title: "Thang-Ta is Manipur's",
          body: "Thang-Ta is the sword-and-spear art of Manipur. Nagaland, Assam and Tripura are the usual wrong options.",
        },
      ],
    },
  ],
};
