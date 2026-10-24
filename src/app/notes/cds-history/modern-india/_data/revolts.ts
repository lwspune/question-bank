import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_REVOLTS_NOTE: SubtopicNote = {
  subtopicName: "Early Revolts and 1857",
  title: "Early Revolts and 1857",
  oneLineDefinition:
    "The sanyasi, peasant and tribal risings against Company rule, the annexation of Awadh that fed the great revolt, and the leaders and centres of 1857.",
  whyItMatters:
    "Twelve CDS questions, seven of them HARD. The tribal and peasant risings make up half the page, and each one is asked for its cause or its people, never its date alone. The 1857 questions come from the NCERT Class 12 chapter Rebels and the Raj: Danka Shah, Shah Mal, the Azamgarh Proclamation and Awadh's talukdars.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-early-revolts",
      name: "Sanyasi, peasant and tribal risings",
      intuition:
        "Company rule changed who owned land, what could be grown and who could be taxed. Each change hit some group hard, and each group rose in its own way. " +
        "Learn each rising with its people and its cause: that is exactly how CDS asks them.",
      definition:
        "The risings, in time order:\n" +
        "- **Sanyasi and Faqir rebellion** (from the 1770s, Bengal and Bihar, under **Warren Hastings**): armed bands of Shaivite Naga sanyasis, and faqirs led by **Majnu Shah** from **1771**.\n" +
        "- **Damin-i-Koh (1832)**: land in the **Rajmahal hills** marked out for the **Santals** to settle and clear. The Santals rose in the **Santal hul (1855 to 1856)**.\n" +
        "- **Phulaguri Dhawa (1861)**, Nowgong, Assam: against the **ban on poppy (opium) cultivation** and new taxes.\n" +
        "- **Kherwar or Sapha Har movement (1870s)**, among the Santals: preached **monotheism** (one god) and internal social reform.\n" +
        "- **Khuntkatti**: the **Munda** system of joint clan ownership of land in **Chota Nagpur**. Its loss lay behind **Birsa Munda's Ulgulan (1899 to 1900)**.\n" +
        "- **Rampa rebellion (1879 to 1880)**: **Koya and Konda Dora** chiefs rose against the local **mansabdar**. A later **Rampa rising (1922 to 1924)** under **Alluri Sitarama Raju** was against the forest laws.",
      table: {
        columns: ["Rising", "Years", "People and cause"],
        rows: [
          {
            cells: ["Sanyasi and Faqir rebellion", "From the 1770s", "Naga sanyasis and Majnu Shah's faqirs, Bengal and Bihar"],
            pyqExampleId: "417c6aac-3f7f-46c1-a29f-5c6b4243d217",
          },
          { cells: ["Damin-i-Koh marked out", "1832", "Rajmahal hills land for the Santals"] },
          { cells: ["Santal hul", "1855 to 1856", "Santals against moneylenders and Company rule"] },
          {
            cells: ["Phulaguri Dhawa", "1861", "Assam peasants against the opium (poppy) ban and new taxes"],
            pyqExampleId: "a6691027-c45c-462a-9644-ec0b6ea17b32",
          },
          {
            cells: ["Kherwar (Sapha Har) movement", "1870s", "Santals: monotheism and social reform"],
            pyqExampleId: "3b3def77-c824-4ff3-bb4d-6ee465e2d899",
          },
          {
            cells: ["Rampa rebellion", "1879 to 1880", "Koya and Konda Dora chiefs against the mansabdar"],
            pyqExampleId: "728614f5-89c5-4a03-bbbb-7e4d64914235",
          },
          {
            cells: ["Birsa Munda's Ulgulan", "1899 to 1900", "Mundas of Chota Nagpur; loss of khuntkatti land"],
            pyqExampleId: "f1b9f434-526b-428c-9d90-fb5b1d8fca53",
          },
          { cells: ["Rampa rising", "1922 to 1924", "Alluri Sitarama Raju against the forest laws"] },
        ],
      },
      pyqExampleId: "2e18ac88-58d5-4e9b-b257-6f3578f35c8a",
      selfCheckExample: {
        prompt: "CDS lists two Rampa risings. How do you tell them apart?",
        steps: [
          "The first, in 1879 to 1880, was led by Koya and Konda Dora chiefs against the local mansabdar.",
          "The second, in 1922 to 1924, was led by Alluri Sitarama Raju against British forest laws.",
        ],
        answer: "1879 to 1880: tribal chiefs against the mansabdar. 1922 to 1924: Alluri Sitarama Raju against the forest laws.",
      },
      practiceSet: [
        { prompt: "Which faqir leader led armed bands into Bengal from 1771?", answer: "Majnu Shah" },
        { prompt: "What was khuntkatti?", answer: "The Munda system of joint ownership of land by the clan" },
        { prompt: "What did the Kherwar movement of the 1870s preach?", answer: "Monotheism (one god) and social reform" },
        { prompt: "Who led the Rampa rising of 1922 to 1924?", answer: "Alluri Sitarama Raju" },
      ],
      traps: [
        {
          title: "Match each rising to its cause",
          body: "**Phulaguri (1861)** was about the **opium** ban. The **Pabna revolt (1873)** was about rent, the **Deccan riots (1875)** about moneylenders and **Birsa's Ulgulan** about tribal land.",
        },
        {
          title: "Two Rampa risings",
          body: "The **Koya and Konda** chiefs against a **mansabdar** is **1879 to 1880**. Alluri Sitarama Raju's rising is **1922 to 1924**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-awadh",
      name: "Awadh annexed: the road to 1857",
      intuition:
        "Awadh was rich, and many sepoys of the Bengal army came from its villages. When the British took it over and then pushed aside its talukdars, the anger of the whole province reached the army.",
      definition:
        "What happened in Awadh:\n" +
        "- In **1851** **Lord Dalhousie** called Awadh \"a cherry that will drop into our mouth one day\".\n" +
        "- Awadh was **annexed in 1856** on the ground of **misgovernment**.\n" +
        "- The **Summary Settlement of 1856** assumed that the **talukdars were interlopers** with no permanent stake in the land. Many were dispossessed and their forts destroyed.\n" +
        "- Awadh was called the **nursery of the Bengal army**, so the sepoys felt its grievances at home.",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          {
            cells: ["\"A cherry that will drop into our mouth\"", "1851", "Dalhousie's words about Awadh"],
            pyqExampleId: "d4c4d175-02ac-4be0-90b9-ce65439f6bc1",
          },
          { cells: ["Annexation of Awadh", "1856", "On the ground of misgovernment"] },
          { cells: ["Summary Settlement", "1856", "Talukdars treated as interlopers and pushed out"] },
        ],
      },
      pyqExampleId: "f5c14f3f-e2ba-498f-abc1-698013fa41cb",
      selfCheckExample: {
        prompt: "Why did the annexation of Awadh matter so much to the sepoys of the Bengal army?",
        steps: [
          "A large share of the Bengal army's sepoys were recruited from Awadh's villages.",
          "So the loss of the Nawab and the ruin of the talukdars hit their own families and land.",
        ],
        answer: "Because many sepoys came from Awadh, its grievances became the army's grievances.",
      },
      practiceSet: [
        { prompt: "In which year was Awadh annexed?", answer: "1856" },
        { prompt: "On what ground did the British annex Awadh?", answer: "Misgovernment" },
        { prompt: "Which region was called the nursery of the Bengal army?", answer: "Awadh" },
      ],
      traps: [
        {
          title: "Interlopers, not owners",
          body: "The Summary Settlement assumed the talukdars were **interlopers** with no permanent stake in the land, not its rightful owners. That is why they lost their land and joined the revolt.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-1857",
      name: "Leaders and centres of 1857",
      intuition:
        "The revolt had big centres with famous leaders, and many local leaders whom only the NCERT names. CDS asks both kinds, and it also asks which town stayed in British hands.",
      definition:
        "Who led where:\n" +
        "- **Delhi**: Bahadur Shah Zafar. **Kanpur**: Nana Saheb, with Tantia Tope. **Lucknow**: Begum Hazrat Mahal. **Jhansi**: Rani Lakshmibai.\n" +
        "- **Faizabad** (Awadh): **Maulavi Ahmadullah Shah**, called **Danka Shah** because a drum (danka) was beaten before him.\n" +
        "- **Baraut** (Barout pargana, Uttar Pradesh): **Shah Mal** turned an Englishman's bungalow into a **hall of justice**.\n" +
        "- **Singhbhum** (Chotanagpur): **Gonoo**, a leader of the **Kol** tribals.\n" +
        "- **Azamgarh Proclamation (August 1857)**: issued in the name of the Mughal prince **Firoz Shah**, it appealed to zamindars, merchants, sepoys and artisans. It has nothing to do with 1942.\n" +
        "- **Agra** was **not** a centre of the revolt: the British held it, the Europeans sheltering in the fort.",
      table: {
        columns: ["Leader", "Where", "Fact"],
        rows: [
          { cells: ["Bahadur Shah Zafar", "Delhi", "Proclaimed leader by the sepoys"] },
          { cells: ["Nana Saheb", "Kanpur", "Led the revolt there, with Tantia Tope"] },
          { cells: ["Maulavi Ahmadullah Shah", "Faizabad, Awadh", "Called Danka Shah"] },
          {
            cells: ["Shah Mal", "Baraut, Uttar Pradesh", "Bungalow made a hall of justice"],
            noteAmber: "CDS 2025 (II) paired him with Gonoo, the Kol leader of Singhbhum.",
            pyqExampleId: "56f60ee9-b905-46f2-b020-cc3d35b7d7bd",
          },
          {
            cells: ["Firoz Shah", "Azamgarh", "Azamgarh Proclamation, August 1857"],
            pyqExampleId: "2c3acd06-7766-4d0d-8ea0-79a491021742",
          },
          {
            cells: ["(British held)", "Agra", "Not a rebel centre; Europeans in the fort"],
            pyqExampleId: "5e2dee86-a41a-4e33-9984-051aa34698f9",
          },
        ],
      },
      pyqExampleId: "401cd678-a047-435e-9d5a-eee1a3827866",
      selfCheckExample: {
        prompt: "What was the Azamgarh Proclamation, and to whom did it appeal?",
        steps: [
          "It was issued in August 1857 in the name of the Mughal prince Firoz Shah.",
          "It called on zamindars, merchants, sepoys and artisans to rise against Company rule.",
        ],
        answer: "A rebel declaration of 1857, appealing to zamindars, merchants, sepoys and artisans.",
      },
      practiceSet: [
        { prompt: "Who led the revolt of 1857 at Kanpur?", answer: "Nana Saheb" },
        { prompt: "Which tribe did Gonoo lead in Singhbhum in 1857?", answer: "The Kols" },
        { prompt: "What did Shah Mal turn an Englishman's bungalow into?", answer: "A hall of justice" },
        { prompt: "Which major town stayed in British hands in 1857, its Europeans sheltering in the fort?", answer: "Agra" },
      ],
      traps: [
        {
          title: "Azamgarh is 1857, not 1942",
          body: "The **Azamgarh Proclamation** was a rebel declaration of **1857**. A statement linking it to an underground leader of the 1942 movement is the **wrong** one.",
        },
        {
          title: "Danka Shah is not Shah Mal",
          body: "**Danka Shah** was Maulavi **Ahmadullah Shah** of Faizabad. **Shah Mal** was the village leader of Baraut. Nana Saheb and Tantia Tope had no such title.",
        },
      ],
    },
  ],
};
