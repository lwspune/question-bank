import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_COMPANY_NOTE: SubtopicNote = {
  subtopicName: "The Company Takes India",
  title: "The Company Takes India",
  oneLineDefinition:
    "How the European trading companies did business in India, how the English Company won Bengal at Plassey and Buxar, how it bound the Marathas and other rulers by treaty, and why it fought on the Nepal and Afghan frontiers.",
  whyItMatters:
    "Fourteen CDS questions, five of them HARD, all from 2019 onwards. Two topics came back twice: the battle of Colachel (2022 and 2023) and the First Anglo-Maratha War (2021 and 2023). The rest ask for one term, treaty or reason each, so learning the tables in time order covers the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-traders",
      name: "From traders to rulers in Bengal and the south",
      intuition:
        "The Europeans came to buy cloth and spices. To get cloth cheaply they paid weavers in advance, and to move goods without paying tax the English carried a special pass. " +
        "Quarrels over that pass led to war in Bengal, and two victories made the Company the real power there. In the far south, Travancore showed that a European company could be beaten.",
      definition:
        "The terms and the turning points:\n" +
        "- **Dadni**: a cash advance paid to **weavers** for cloth they would deliver later. It tied the weaver to the buyer before the cloth was made.\n" +
        "- **Dastak**: a **trade permit** that let the Company's goods move without paying inland duties. Company servants misused it for their own private trade, which angered the Nawabs of Bengal.\n" +
        "- **Colachel (1741)**: **Marthanda Varma** of Travancore defeated the **Dutch** East India Company.\n" +
        "- **Plassey (1757)**: Robert Clive defeated **Siraj-ud-Daulah**, the Nawab of Bengal.\n" +
        "- **Buxar (1764)**: the Company defeated the combined army of **Mir Qasim** and **Shuja-ud-Daulah** of Awadh.\n" +
        "- **Allahabad (1765)**: the Company got the **Diwani**, the right to collect the revenue, of **Bengal, Bihar and Orissa**, in return for an annual tribute to the Mughal emperor.",
      table: {
        columns: ["Term or event", "When", "Meaning"],
        rows: [
          {
            cells: ["Dadni", "17th and 18th centuries", "Advance paid to weavers for cloth delivered later"],
            pyqExampleId: "6b5aeae5-3487-42c0-82b3-a60d718cdc1a",
          },
          {
            cells: ["Dastak", "18th century", "Duty-free trade permit of the English Company"],
            pyqExampleId: "b6d8377b-2ff0-4ffa-b4f1-88f3c75ecba1",
          },
          {
            cells: ["Battle of Colachel", "1741", "Travancore under Marthanda Varma defeated the Dutch"],
            noteAmber: "CDS 2022 (II) and CDS 2023 (I) both asked it.",
            pyqExampleId: "381e042f-18fd-433c-a757-cb1c291bbb9e",
          },
          { cells: ["Battle of Plassey", "1757", "Clive defeated Siraj-ud-Daulah"] },
          { cells: ["Battle of Buxar", "1764", "Company defeated Mir Qasim and the Nawab of Awadh"] },
          { cells: ["Treaty of Allahabad", "1765", "Diwani of Bengal, Bihar and Orissa for an annual tribute"] },
        ],
      },
      pyqExampleId: "6e040433-3c4d-4078-a5a6-85c3c8188207",
      selfCheckExample: {
        prompt: "Why did the Nawabs of Bengal complain about the English Company's dastaks?",
        steps: [
          "A dastak let the Company's goods pass without paying inland duties.",
          "Company servants used the same passes for their own private trade, so the Nawab lost duty and Indian merchants were undercut.",
        ],
        answer: "Because Company servants misused the duty-free pass for private trade, and the Nawab lost revenue.",
      },
      practiceSet: [
        { prompt: "In the dadni system, who received the cash advance?", answer: "The weavers" },
        { prompt: "Which battle of 1757 made the English Company powerful in Bengal?", answer: "Plassey" },
        { prompt: "What right did the Company get in Bengal, Bihar and Orissa in 1765?", answer: "The Diwani, the right to collect the revenue" },
        { prompt: "Whom did Robert Clive defeat at Plassey?", answer: "Siraj-ud-Daulah, the Nawab of Bengal" },
      ],
      traps: [
        {
          title: "A dastak is a pass, not a tax",
          body: "Options offer 'tax on textiles' or 'land document'. A dastak was a **permit** that freed goods from duty. The cloth advance to weavers is a different word: **dadni**.",
        },
        {
          title: "Colachel, not Wandiwash",
          body: "At **Colachel (1741)** Travancore beat the **Dutch**. **Wandiwash (1760)** was an English victory over the **French**, in the Carnatic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-marathas",
      name: "The Maratha treaties and the Subsidiary Alliance",
      intuition:
        "The English first meddled in a Maratha family quarrel and lost. A treaty at Salbai brought twenty years of peace. " +
        "Then Lord Wellesley offered rulers protection in return for their freedom: keep our troops, pay for them, and make no war or treaty without us. The Peshwa himself accepted it in 1802.",
      definition:
        "The First Anglo-Maratha War (1775 to 1782), treaty by treaty:\n" +
        "- **Treaty of Surat (1775)**: the English backed **Raghunath Rao** for the Peshwa's seat. This started the war.\n" +
        "- **Treaty of Purandar (1776)**: the Calcutta council replaced the Surat treaty.\n" +
        "- **Convention of Wadgaon (1779)**: signed by a beaten British force; the Company rejected it.\n" +
        "- **Treaty of Salbai (1782)**: **ended the war** and brought about twenty years of peace.\n\n" +
        "The **Subsidiary Alliance** of **Lord Wellesley** (from 1798):\n" +
        "- A British force was stationed in the ally's territory, and the **ally paid** for it.\n" +
        "- The British **protected** the ally.\n" +
        "- The ally could **not** keep its own army, make agreements with other rulers or go to war without the Company's permission.\n" +
        "- **Treaty of Bassein (31 December 1802)**: Peshwa **Baji Rao II** accepted it.",
      table: {
        columns: ["Treaty", "Year", "What it did"],
        rows: [
          { cells: ["Treaty of Surat", "1775", "English backed Raghunath Rao; war began"] },
          { cells: ["Treaty of Purandar", "1776", "Calcutta council replaced the Surat treaty"] },
          { cells: ["Convention of Wadgaon", "1779", "Signed after a British defeat; rejected"] },
          {
            cells: ["Treaty of Salbai", "1782", "Ended the First Anglo-Maratha War"],
            noteAmber: "CDS 2023 (I): Salbai concluded the war.",
            pyqExampleId: "e55d28fd-0d40-43c9-aa0e-0ddc3f1bc1ff",
          },
          {
            cells: ["Treaty of Bassein", "1802", "Baji Rao II accepted the Subsidiary Alliance"],
            pyqExampleId: "0ca01132-5f9f-477b-9083-f96e4f0fd07f",
          },
        ],
      },
      pyqExampleId: "5f0af288-7394-4e37-95d2-ce298dfd0b02",
      selfCheckExample: {
        prompt: "Under the Subsidiary Alliance, which three things could an allied ruler no longer do on his own?",
        steps: [
          "He had to keep the Company's troops, so he could not keep an army of his own.",
          "His foreign relations passed to the Company: no agreements with other rulers and no war without its permission.",
        ],
        answer: "Keep his own army, make agreements with other rulers, and go to war.",
      },
      practiceSet: [
        { prompt: "Which Governor-General introduced the Subsidiary Alliance?", answer: "Lord Wellesley" },
        { prompt: "Under the Subsidiary Alliance, who paid for the British troops stationed in an allied state?", answer: "The ally" },
        { prompt: "In which year did Peshwa Baji Rao II sign the Treaty of Bassein?", answer: "1802" },
        { prompt: "Which Maratha leader did the English support in the Treaty of Surat?", answer: "Raghunath Rao" },
      ],
      traps: [
        {
          title: "Wadgaon did not end the war",
          body: "The **Convention of Wadgaon (1779)** was signed by a defeated British force and the Company refused to honour it. The war ended only with the **Treaty of Salbai (1782)**.",
        },
        {
          title: "The ally paid, and lost its freedom",
          body: "An option saying the ally 'was free to make agreements or go to war' is the one **not** in the Subsidiary Alliance. Protection was bought with exactly that freedom.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-frontier",
      name: "Frontier wars and the fear of Russia",
      intuition:
        "Once the Company held the plains, it worried about the mountains. It fought Nepal and gained the hills where Simla grew. " +
        "Then it began to fear that Russia would come through Persia and Afghanistan, and it went to war in Afghanistan to stop that.",
      definition:
        "The frontier story:\n" +
        "- **Anglo-Gurkha (Nepal) War, 1814 to 1816**: **Simla** was founded during it, to station troops and guard the frontier. It later became the **summer capital**.\n" +
        "- The British feared a **Russian advance** through Persia and Afghanistan. **Lord Auckland**, Governor-General from **1836**, held this fear strongly.\n" +
        "- **Afghan policy** in the first half of the 19th century: keep Russian influence out of Afghanistan, **but do not let Afghanistan grow strong** either.\n" +
        "- This led to the **First Anglo-Afghan War (1839 to 1842)**, a disaster for the British.\n" +
        "- A document called the **Testament of Peter the Great** said that the commerce of India is the commerce of the world, and whoever commands it is the dictator of Europe.",
      table: {
        columns: ["Event", "Years", "Fact to remember"],
        rows: [
          { cells: ["Anglo-Gurkha War", "1814 to 1816", "Simla founded to billet troops and guard the frontier"] },
          { cells: ["Lord Auckland Governor-General", "1836 to 1842", "Feared a Russian advance on India"] },
          {
            cells: ["First Anglo-Afghan War", "1839 to 1842", "Aim: Russia out, Afghanistan kept weak"],
            pyqExampleId: "5e20e85a-c2d9-49b8-b60d-9412b99d5c3a",
          },
        ],
      },
      pyqExampleId: "ce063fe1-9d6a-4137-947b-53be57f52aa8",
      selfCheckExample: {
        prompt: "Why did the British not want a strong Afghanistan, even though they wanted Russia kept out of it?",
        steps: [
          "Afghanistan sat on the frontier of British India.",
          "A strong, united Afghanistan could itself threaten that frontier, so the British wanted it weak and dependent.",
        ],
        answer: "A strong Afghanistan on the frontier was itself seen as a danger, so the aim was a weak Afghanistan free of Russian influence.",
      },
      practiceSet: [
        { prompt: "Which Governor-General's fear of Russia led to the First Anglo-Afghan War?", answer: "Lord Auckland" },
        { prompt: "In which years was the First Anglo-Afghan War fought?", answer: "1839 to 1842" },
        { prompt: "Which Russian ruler's so-called Testament said the master of India's commerce would be the dictator of Europe?", answer: "Peter the Great" },
      ],
      traps: [
        {
          title: "Simla came from the Nepal war",
          body: "Simla was founded during the **Anglo-Gurkha War (1814 to 1816)**, not an Anglo-Afghan or Anglo-Burmese war. The Afghan wars came twenty years later.",
        },
      ],
    },
  ],
};
