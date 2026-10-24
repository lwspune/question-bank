import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_EARLY_NOTE: SubtopicNote = {
  subtopicName: "Early Nationalism",
  title: "Early Nationalism",
  oneLineDefinition:
    "The regional associations that came before the Congress, the methods and newspapers of the Moderates, and the Swadeshi movement, the Ghadar Party and the events of 1916.",
  whyItMatters:
    "Twelve CDS questions, all from 2020 onwards. The three on the early associations are all HARD, and two of them turn on dates, so the order 1870, 1876, 1884, 1885 is worth learning by heart. The newspaper questions ask which founder does not match, so learn each paper with its person.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-associations",
      name: "Associations before the Congress",
      intuition:
        "Before there was an all-India Congress, educated Indians formed associations in Poona, Calcutta, Madras and Bombay. " +
        "When the Congress met in 1885, it drew these bodies together rather than competing with them.",
      definition:
        "The associations in order:\n" +
        "- **Poona Sarvajanik Sabha (1870)**: with **M.G. Ranade** among its leaders, a bridge between government and people.\n" +
        "- **Indian Association (1876)**: **Surendranath Banerjea**, Calcutta. It called the **Indian National Conference** at Calcutta.\n" +
        "- **Madras Mahajan Sabha (1884)**.\n" +
        "- **Bombay Presidency Association (1885)**: **Pherozeshah Mehta, Badruddin Tyabji** and **K.T. Telang**.\n" +
        "- **Indian National Congress (December 1885)**: organised by **A.O. Hume**; first session at **Bombay**, president **W.C. Bonnerjee**. It was **not** a rival to the associations and **not** a body of the poor: it was a forum for the educated classes.",
      table: {
        columns: ["Association", "Year", "Leaders"],
        rows: [
          {
            cells: ["Poona Sarvajanik Sabha", "1870", "M.G. Ranade and others"],
            pyqExampleId: "67bb7c43-231f-4057-adbd-57f031b89b26",
          },
          { cells: ["Indian Association", "1876", "Surendranath Banerjea, Calcutta"] },
          { cells: ["Madras Mahajan Sabha", "1884", "G. Subramania Iyer, P. Ananda Charlu, M. Viraraghavachari"] },
          {
            cells: ["Bombay Presidency Association", "1885", "Pherozeshah Mehta, Badruddin Tyabji, K.T. Telang"],
            pyqExampleId: "1b885fa1-a94e-40e9-9473-1676f944b152",
          },
          { cells: ["Indian National Congress", "1885", "A.O. Hume; first president W.C. Bonnerjee"] },
        ],
      },
      pyqExampleId: "c8562c51-e83e-4572-8fd9-3192e51bdb23",
      selfCheckExample: {
        prompt: "Was A.O. Hume's all-India body set up as a rival to the Bombay Presidency Association and the Indian Association?",
        steps: [
          "Those associations already spoke for the educated classes of their regions.",
          "Hume's Congress gave the same classes one all-India forum and drew the associations into it.",
        ],
        answer: "No. It drew those associations in; it was neither a rival nor a body of the poor.",
      },
      practiceSet: [
        { prompt: "Who founded the Indian Association in 1876?", answer: "Surendranath Banerjea" },
        { prompt: "Who presided over the first session of the Indian National Congress?", answer: "W.C. Bonnerjee" },
        { prompt: "In which city did the Congress hold its first session?", answer: "Bombay" },
      ],
      traps: [
        {
          title: "The Congress did not compete with them",
          body: "A statement that Hume set up an all-India body **as a rival** to these associations, for the poor and marginalised, is **false**. The Congress gathered the same educated leaders together.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-moderates",
      name: "The Moderates and the nationalist press",
      intuition:
        "The early Congress leaders believed in British fair play. They asked for reforms by petition and speech, step by step, and built public opinion through newspapers. They never asked the British to leave.",
      definition:
        "The Moderates:\n" +
        "- **Methods**: constitutional agitation, petitions and speeches, slow and orderly progress, and building public opinion. **Not** the overthrow of British rule.\n" +
        "- **Demands**: repeal of the **Arms Act**, higher posts for Indians in the **army** and services, extension of the **Permanent Settlement**. **Not** universal adult franchise, which came much later.\n\n" +
        "Papers and their people:\n" +
        "- **Kesari** (Marathi) and **Mahratta** (English): **Bal Gangadhar Tilak**, 1881.\n" +
        "- **Bengalee**: **Surendranath Banerjea**. **Voice of India**: **Dadabhai Naoroji**. **Bombay Chronicle**: **Pherozeshah Mehta**.\n" +
        "- **Navjivan**: **Gandhi**. **Kudi Arasu** (Tamil weekly): **Periyar**. **Kisan Bulletin**: **Indulal Yagnik**. **Bhawani Mandir** (revolutionary pamphlet): **Aurobindo Ghosh**.",
      table: {
        columns: ["Paper", "Kind", "Founder or editor"],
        rows: [
          {
            cells: ["Kesari", "Marathi weekly", "Bal Gangadhar Tilak"],
            pyqExampleId: "2e694120-e94d-48e9-9bc1-a19f244c04ea",
          },
          { cells: ["Mahratta", "English weekly", "Bal Gangadhar Tilak"] },
          { cells: ["Bengalee", "English newspaper", "Surendranath Banerjea"] },
          {
            cells: ["Voice of India", "English journal", "Dadabhai Naoroji"],
            pyqExampleId: "f4467b79-3029-4278-8bfc-81a74e86b60d",
          },
          { cells: ["Bombay Chronicle", "English daily", "Pherozeshah Mehta"] },
          { cells: ["Navjivan", "Gujarati weekly", "Mahatma Gandhi"] },
          {
            cells: ["Kudi Arasu", "Tamil weekly", "Periyar"],
            noteAmber: "CDS 2025 (II) matched it with the Kisan Bulletin, the Bombay Chronicle and Bhawani Mandir.",
            pyqExampleId: "431b35cb-79c8-41d6-b663-b4d0a4e12261",
          },
          { cells: ["Kisan Bulletin", "Peasant bulletin", "Indulal Yagnik"] },
          { cells: ["Bhawani Mandir", "Revolutionary pamphlet", "Aurobindo Ghosh"] },
        ],
      },
      pyqExampleId: "a10618f5-31c2-49fb-96d3-00bc6682263c",
      selfCheckExample: {
        prompt: "Which of these was not a Moderate demand: repeal of the Arms Act, higher army posts for Indians, extension of the Permanent Settlement, universal adult franchise?",
        steps: [
          "The first three ask for gradual concessions inside British rule, and the Moderates did ask for them.",
          "Votes for every adult was a demand of the later national movement.",
        ],
        answer: "Universal adult franchise.",
      },
      practiceSet: [
        { prompt: "Which English weekly did Tilak run alongside Kesari?", answer: "Mahratta" },
        { prompt: "Who edited the Bengalee?", answer: "Surendranath Banerjea" },
        { prompt: "Who founded the Bombay Chronicle?", answer: "Pherozeshah Mehta" },
        { prompt: "Whose Tamil weekly was Kudi Arasu?", answer: "Periyar's (E.V. Ramaswamy Naicker)" },
      ],
      traps: [
        {
          title: "Voice of India was Naoroji's",
          body: "**Voice of India** was started by **Dadabhai Naoroji**. Pairing it with **Gokhale** is the wrong match; Gokhale wrote for the Sudharak.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-swadeshi",
      name: "Swadeshi, the Ghadar Party and 1916",
      intuition:
        "The partition of Bengal turned petitions into boycott. Abroad, Indian emigrants in America planned a revolt. And in 1916 the Congress and the Muslim League came together while two Home Rule Leagues spread the demand for self-rule.",
      definition:
        "The events:\n" +
        "- **Partition of Bengal (1905, Lord Curzon)** led to the anti-partition agitation, from which the **Swadeshi Movement** grew: use Indian goods, **boycott** foreign ones.\n" +
        "- **Aurobindo Ghosh** and the Extremists wanted it spread to all India and turned into a full **political mass struggle**.\n" +
        "- **Ghadar Party (1913)**: founded by Indian emigrants on the American west coast, president **Sohan Singh Bhakna**, headquarters at **San Francisco**. It took its name from its weekly **Ghadar** (revolt), printed in several Indian languages.\n" +
        "- **1916**: the **Home Rule Leagues** of **Tilak** and **Annie Besant**; the **Lucknow session** of the Congress; and the **Lucknow Pact** between the Congress and the Muslim League.",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          { cells: ["Partition of Bengal", "1905", "Lord Curzon"] },
          {
            cells: ["Swadeshi Movement", "From 1905", "Grew from the anti-partition agitation; boycott of foreign goods"],
            pyqExampleId: "23383f55-3c58-40cf-816b-2787e60cb426",
          },
          {
            cells: ["Ghadar Party", "1913", "San Francisco; president Sohan Singh Bhakna"],
            pyqExampleId: "a768ddcf-6789-4702-812e-1186ef1e1f9a",
          },
          { cells: ["Home Rule Leagues", "1916", "Tilak (April) and Annie Besant (September)"] },
          {
            cells: ["Lucknow session and Lucknow Pact", "1916", "Congress and Muslim League agree"],
            pyqExampleId: "dab49003-49ca-436b-90ab-e77555c83061",
          },
        ],
      },
      pyqExampleId: "396c4f72-e4a9-4357-893e-d65f001cb2fc",
      selfCheckExample: {
        prompt: "How did Aurobindo Ghosh want to change the Swadeshi movement?",
        steps: [
          "It had begun in Bengal against the partition, with swadeshi and boycott.",
          "He wanted it carried to the rest of India and turned into a full political mass struggle.",
        ],
        answer: "Spread it across India and make it a full political mass struggle, beyond swadeshi and boycott.",
      },
      practiceSet: [
        { prompt: "Which Viceroy partitioned Bengal in 1905?", answer: "Lord Curzon" },
        { prompt: "Which two leaders founded Home Rule Leagues in 1916?", answer: "Bal Gangadhar Tilak and Annie Besant" },
        { prompt: "Which two bodies signed the Lucknow Pact of 1916?", answer: "The Congress and the Muslim League" },
      ],
      traps: [
        {
          title: "Three events, one year",
          body: "The **Lucknow session**, the **Lucknow Pact** and the **Home Rule Leagues** all belong to **1916**. An option dropping any one of them is wrong.",
        },
      ],
    },
  ],
};
