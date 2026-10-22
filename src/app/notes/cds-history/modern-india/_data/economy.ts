import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_ECONOMY_NOTE: SubtopicNote = {
  subtopicName: "Land Revenue and the Colonial Economy",
  title: "Land Revenue and the Colonial Economy",
  oneLineDefinition:
    "How the British collected land revenue in Bengal and the south, how debt and the cotton boom led to the Deccan riots, and how weaving declined while tea, railways and the telegraph arrived.",
  whyItMatters:
    "Thirteen CDS questions, nine of them HARD: this is one of the hardest pages in the chapter. Four questions follow one story, the debt of the Deccan peasants, from the Limitation Law of 1859 to the Relief Act of 1879. Most of the facts are in the NCERT Class 12 chapter Colonialism and the Countryside.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-settlements",
      name: "The Permanent Settlement, ryotwari and the famine of 1770",
      intuition:
        "Once the Company had the right to collect revenue, it had to decide whom to collect it from. In Bengal it chose the zamindar and fixed his payment forever. " +
        "In the south and west it went past the zamindar and dealt with each cultivator. Either way, the demand was high, and in 1770 it turned a bad harvest into a famine.",
      definition:
        "The systems and their effects:\n" +
        "- **Bengal famine of 1769 to 1770**: after it got the Diwani, the Company kept collecting revenue at full and even higher rates, so a crop failure became a terrible famine.\n" +
        "- **Permanent Settlement (1793, Lord Cornwallis)**: the **zamindar** paid a revenue fixed for ever. The zamindars' **troops were disbanded** and their customs duties taken away.\n" +
        "- In the Bengal villages, the **jotedars** (rich peasants) were often more powerful than the zamindars.\n" +
        "- The Company ruled that the **property of women would not be taken over** for unpaid revenue, so zamindars made false transfers of land to the women of the family.\n" +
        "- The sharecroppers who worked the jotedars' land were called **adhiyars** or **bargadars**: two names for the same people.\n" +
        "- **Ryotwari** (Thomas Munro, Madras; later Bombay): a **direct contract between the ryot and the state**, usually fixed for about **30 years**. It went past the zamindars and weakened them.",
      table: {
        columns: ["System", "Where and when", "Who paid the state"],
        rows: [
          {
            cells: ["Permanent Settlement", "Bengal, 1793 (Cornwallis)", "The zamindar, a sum fixed for ever"],
            noteAmber: "CDS 2025 (II) asked four statements about the Bengal countryside under it.",
            pyqExampleId: "2da625d5-13fe-4be7-96ca-7aed5f989532",
          },
          {
            cells: ["Ryotwari", "Madras and Bombay, early 19th century", "The ryot (cultivator) directly"],
            pyqExampleId: "b3824ecd-2bf8-4d0d-b57e-194913099b48",
          },
          { cells: ["Mahalwari", "North-Western Provinces and Punjab, from 1822", "The village community as a whole"] },
        ],
      },
      pyqExampleId: "2da625d5-13fe-4be7-96ca-7aed5f989532",
      selfCheckExample: {
        prompt: "Why did the crop failure of 1769 turn into such a terrible famine in Bengal?",
        steps: [
          "The Company had just taken the Diwani and wanted as much revenue as it could get.",
          "It kept collecting at full or higher rates even when the harvest failed, and its servants speculated in grain.",
        ],
        answer: "High revenue collection by the Company (and grain speculation) on top of the crop failure.",
      },
      practiceSet: [
        { prompt: "Who introduced the Permanent Settlement in Bengal in 1793?", answer: "Lord Cornwallis" },
        { prompt: "Who introduced the ryotwari settlement in Madras?", answer: "Thomas Munro" },
        { prompt: "In the ryotwari system, with whom did the state make the revenue contract?", answer: "The ryot (the cultivator himself)" },
        { prompt: "Under the Mahalwari system, who was responsible for paying the revenue?", answer: "The village community as a whole" },
      ],
      traps: [
        {
          title: "Ryotwari weakened the zamindars",
          body: "Ryotwari dealt with the cultivator directly, so it went **past** the zamindars. 'It strengthened the zamindars and weakened the peasantry' is the **wrong** statement.",
        },
        {
          title: "Adhiyar and bargadar are one group",
          body: "Both words mean the **sharecroppers** who worked the jotedars' land. A statement making adhiyars sharecroppers on land owned by bargadars is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-debt",
      name: "Debt, the Deccan riots and the laws",
      intuition:
        "Deccan peasants borrowed to pay revenue and to grow cotton. A law meant to limit their debt was easily dodged. " +
        "When a cotton boom collapsed, the debt became unbearable, and in 1875 the peasants burnt the moneylenders' account books. The government then passed a law to protect their land.",
      definition:
        "The chain of events in the Bombay Deccan:\n" +
        "- **Limitation Law (1859)**: a loan bond was valid for only **three years**. Moneylenders made the ryot sign a **new bond** every three years, adding the unpaid interest.\n" +
        "- **Cotton boom (1861 to 1865)**: the **American Civil War** cut off cotton from America, so Deccan ryots borrowed to grow cotton. When the war ended, prices fell and the debt remained.\n" +
        "- **Deccan riots (1875)**: they began in **May 1875** at **Supa** in Poona district. Peasants attacked **sahukars** (moneylenders), burnt their **bahi khatas** (account books) and looted grain shops. The riots stayed mostly in **Poona and Ahmednagar** districts and were put down quickly.\n" +
        "- **Deccan Agriculturists' Relief Act (1879)**: protected the peasant's **land from being sold** to outsiders for debt.",
      table: {
        columns: ["Event or law", "Year", "Fact"],
        rows: [
          {
            cells: ["Limitation Law", "1859", "Loan bonds valid for three years only"],
            pyqExampleId: "39b2c73a-8b5b-46bd-9531-06986fb6a01d",
          },
          { cells: ["Cotton boom", "1861 to 1865", "American Civil War cut supply; Deccan ryots borrowed to grow cotton"] },
          {
            cells: ["Deccan riots", "1875", "Began at Supa; account books burnt; did not spread across Maharashtra"],
            pyqExampleId: "b028c182-fca9-48b7-89c8-47459f556e30",
          },
          {
            cells: ["Deccan Agriculturists' Relief Act", "1879", "Restricted the sale of land for debt"],
            pyqExampleId: "13f465fb-0fa3-4d1d-9da3-ff69874afea9",
          },
        ],
      },
      pyqExampleId: "af25f8da-936f-4f49-b55c-e2d6602b034c",
      selfCheckExample: {
        prompt: "How did moneylenders get round the Limitation Law of 1859?",
        steps: [
          "The law made a loan bond valid for only three years.",
          "So the moneylender made the ryot sign a fresh bond before the three years ran out, with the unpaid interest added as new principal.",
        ],
        answer: "By making the ryot sign a new bond every three years.",
      },
      practiceSet: [
        { prompt: "Which foreign war caused a cotton boom in the Bombay Deccan in the 1860s?", answer: "The American Civil War" },
        { prompt: "In which two districts were the Deccan riots of 1875 mostly confined?", answer: "Poona and Ahmednagar" },
        { prompt: "Which Act of 1879 followed the Deccan riots?", answer: "The Deccan Agriculturists' Relief Act" },
      ],
      traps: [
        {
          title: "Three years, not ten",
          body: "The Limitation Law of **1859** limited a loan bond to **three years**. It did not cancel bonds and did not give them ten years.",
        },
        {
          title: "The riots stayed local",
          body: "The Deccan riots were put down before they spread, so 'they spread throughout Maharashtra' is **false**. They stayed mostly in Poona and Ahmednagar.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-deindustrial",
      name: "Deindustrialisation, tea, railways and the telegraph",
      intuition:
        "Cheap machine-made cloth from Lancashire ruined India's handloom weavers. At the same time the British built what served their trade: tea gardens, railways and a telegraph line to Europe. " +
        "CDS asks who argued the decline, who brought tea, and how the railways were paid for.",
      definition:
        "The changes of the 19th century:\n" +
        "- **Deindustrialisation**: the industry hit hardest was **cotton textiles** (handloom weaving).\n" +
        "- **Amiya Kumar Bagchi** used the survey data of **Buchanan-Hamilton** (Gangetic Bihar) to support the thesis of deindustrialisation. **Tirthankar Roy** later questioned it.\n" +
        "- **Tea**: **Robert Fortune**, working for the Company around 1850, brought tea plants, seed and trained workers from **China** to the Himalayan plantations.\n" +
        "- **Railways (guarantee system)**: private British companies got **land free** from the government and a guaranteed **5 per cent return** on their capital. The companies ran the lines; there was no joint management.\n" +
        "- **Telegraph**: the first working telegraph link between **Europe and India** opened in **1865**.\n" +
        "- Indian business grew too: the Marwari house of **Soorajmull-Nagarmull** took over the British firm **Davenport and Company**.",
      table: {
        columns: ["Change", "Fact", "Name or year"],
        rows: [
          { cells: ["Deindustrialisation", "Hardest hit: cotton textiles", "19th century"] },
          {
            cells: ["Evidence for deindustrialisation", "Survey figures of Buchanan-Hamilton", "Amiya Kumar Bagchi"],
            pyqExampleId: "07bee368-ff40-46b2-8bc9-49c59c1115e5",
          },
          {
            cells: ["Tea growing in India", "Plants, seed and workers brought from China", "Robert Fortune"],
            pyqExampleId: "71084eff-d50e-474e-af96-b70f65418dc0",
          },
          {
            cells: ["Railway guarantee system", "Free land and a 5 per cent guaranteed return", "From 1849"],
            noteAmber: "CDS 2024 (I): two of its three statements were correct; joint management was the false one.",
            pyqExampleId: "56497e1c-c7a2-41da-8afc-6592391f4ead",
          },
          {
            cells: ["Europe to India telegraph", "First working link", "1865"],
            pyqExampleId: "384761c9-ce7d-4e49-a269-a52205fcc574",
          },
          {
            cells: ["Davenport and Company", "British firm taken over", "Soorajmull-Nagarmull"],
            pyqExampleId: "c2a2996b-429b-412d-a1f8-b15e9ec8850b",
          },
        ],
      },
      pyqExampleId: "78f9df8c-86c2-410a-ba17-32162d0530b2",
      selfCheckExample: {
        prompt: "Under the railway guarantee system, what did the government give the private companies, and who ran the lines?",
        steps: [
          "The government gave the land free of cost.",
          "It also promised a 5 per cent return on the capital, paying any shortfall from Indian revenue.",
          "The companies themselves ran the lines, under government supervision.",
        ],
        answer: "Free land and a guaranteed 5 per cent return; the private companies ran the lines.",
      },
      practiceSet: [
        { prompt: "Whose survey data did Amiya Kumar Bagchi use to argue for deindustrialisation?", answer: "Buchanan-Hamilton's" },
        { prompt: "Who brought tea plants and trained workers from China for India's plantations?", answer: "Robert Fortune" },
        { prompt: "In which year did the first telegraph link between Europe and India start working?", answer: "1865" },
      ],
      traps: [
        {
          title: "Bagchi for, Roy against",
          body: "**Amiya Kumar Bagchi** used Buchanan-Hamilton's data to **support** deindustrialisation. **Tirthankar Roy** is the historian who questioned it, so he is the wrong answer.",
        },
      ],
    },
  ],
};
