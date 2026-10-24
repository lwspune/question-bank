import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_REFORM_NOTE: SubtopicNote = {
  subtopicName: "Religious Reform Movements",
  title: "Religious Reform Movements",
  oneLineDefinition:
    "The Brahmo tradition of Bengal and its orthodox rivals, the Arya Samaj, Vivekananda and the Theosophists, and the Aligarh and Ahmadiyya movements among Muslims.",
  whyItMatters:
    "Eleven CDS questions, seven of them MODERATE, from 2017 to 2026. Almost every one asks who founded what, so each table pairs a body with its founder and year. Watch for a list of four bodies when the person founded only two of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-bengal",
      name: "Ram Mohan Roy and the Brahmo tradition",
      intuition:
        "In Bengal, Western education and missionary printing met an old society. Ram Mohan Roy wanted Hinduism cleaned of idol worship and of sati. " +
        "Others carried his work on, and the orthodox set up their own society to defend the old ways.",
      definition:
        "The Bengal bodies:\n" +
        "- **Serampore Mission (1800)**: the Baptist trio **William Carey, Joshua Marshman and William Ward**. David Hare was a Calcutta philanthropist, not one of them.\n" +
        "- **Raja Ram Mohan Roy** founded the **Atmiya Sabha (1814)** and the **Brahmo Sabha (1828)**, later the Brahmo Samaj. He campaigned against **sati**, which **Lord William Bentinck** banned in **1829**.\n" +
        "- **Radhakanta Deb** founded the **Dharma Sabha (1830)** to defend orthodox practice; it petitioned against the ban on sati.\n" +
        "- **Debendranath Tagore** founded the **Tattvabodhini Sabha (1839)**, which later merged with the Brahmo Samaj.\n" +
        "- The **Prarthana Samaj (1867, Bombay)** was founded by **Atmaram Pandurang**, and the **Arya Samaj (1875)** by Dayanand Saraswati: neither by Ram Mohan Roy.",
      table: {
        columns: ["Body", "Year", "Founder"],
        rows: [
          {
            cells: ["Serampore Mission", "1800", "William Carey, Joshua Marshman, William Ward"],
            pyqExampleId: "6af58652-014b-461c-b25c-12d332d28d53",
          },
          { cells: ["Atmiya Sabha", "1814", "Ram Mohan Roy"] },
          { cells: ["Brahmo Sabha (Brahmo Samaj)", "1828", "Ram Mohan Roy"] },
          {
            cells: ["Dharma Sabha", "1830", "Radhakanta Deb (orthodox)"],
            pyqExampleId: "a4066dae-3ea5-4469-b2b3-bfa38efdf1e6",
          },
          {
            cells: ["Tattvabodhini Sabha", "1839", "Debendranath Tagore"],
            pyqExampleId: "77ecad67-489f-416c-b80a-bfbb86da45ae",
          },
          { cells: ["Prarthana Samaj", "1867", "Atmaram Pandurang, Bombay"] },
        ],
      },
      pyqExampleId: "30177786-b36a-4e70-851b-18383288bc28",
      selfCheckExample: {
        prompt: "Why was the Dharma Sabha founded in Calcutta in 1830?",
        steps: [
          "Ram Mohan Roy's campaign had just led to the ban on sati in 1829.",
          "Radhakanta Deb and the orthodox founded the Dharma Sabha to defend traditional practice and petition against the ban.",
        ],
        answer: "To defend orthodox Hindu practice and oppose the ban on sati.",
      },
      practiceSet: [
        { prompt: "Which Governor-General banned sati in 1829?", answer: "Lord William Bentinck" },
        { prompt: "Name the three Baptist missionaries of Serampore.", answer: "William Carey, Joshua Marshman and William Ward" },
        { prompt: "Who founded the Prarthana Samaj in Bombay in 1867?", answer: "Atmaram Pandurang" },
        { prompt: "Which body founded by Debendranath Tagore later merged with the Brahmo Samaj?", answer: "The Tattvabodhini Sabha" },
      ],
      traps: [
        {
          title: "Two bodies, not four",
          body: "Ram Mohan Roy founded the **Atmiya Sabha** and the **Brahmo Samaj** only. The Prarthana Samaj and the Arya Samaj came decades later, from other founders.",
        },
        {
          title: "Dharma Sabha was the orthodox side",
          body: "Radhakanta Deb's **Dharma Sabha** opposed reform. Do not place it with Ram Mohan Roy or Keshab Chandra Sen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-revival",
      name: "Arya Samaj, Vivekananda and the Theosophists",
      intuition:
        "A second group of reformers looked back rather than outward. Dayanand wanted a return to the Vedas, Vivekananda took Vedanta to the world, and Annie Besant, a Theosophist, built a Hindu school that grew into a university.",
      definition:
        "The revival:\n" +
        "- **Swami Dayanand Saraswati** founded the **Arya Samaj (1875)** with the call **\"Go back to the Vedas\"**. He rejected idol worship and the later Puranic rituals.\n" +
        "- **Swami Vivekananda** spoke at the **World's Parliament of Religions, Chicago, on 11 September 1893**, opening with **\"Sisters and brothers of America\"**. He founded the **Ramakrishna Mission (1897)**.\n" +
        "- **Annie Besant** founded the **Central Hindu School** at Benaras in **1898**. It became the nucleus of **Banaras Hindu University (1916)**, founded by **Madan Mohan Malaviya**.\n" +
        "- The **Hindu Mahasabha** took shape at the **Haridwar Kumbh Mela in 1915**.",
      table: {
        columns: ["Person or body", "Year", "Fact"],
        rows: [
          {
            cells: ["Arya Samaj", "1875", "Dayanand Saraswati; inspired by the Vedas"],
            pyqExampleId: "94b2cbfc-810b-4764-aaba-8415fb02fea6",
          },
          {
            cells: ["Vivekananda at Chicago", "1893", "\"Sisters and brothers of America\""],
            pyqExampleId: "c3bb2578-6d8c-4ffe-8e42-897b058a1ecf",
          },
          { cells: ["Ramakrishna Mission", "1897", "Vivekananda"] },
          { cells: ["Central Hindu School, Benaras", "1898", "Annie Besant"] },
          {
            cells: ["Hindu Mahasabha", "1915", "Formed at the Haridwar Kumbh Mela"],
            pyqExampleId: "493c0fe5-4cec-480d-a1a5-ccafea1b9b3b",
          },
          { cells: ["Banaras Hindu University", "1916", "Madan Mohan Malaviya"] },
        ],
      },
      pyqExampleId: "9d24ebc4-9405-49e8-8475-4e0c48638b1a",
      selfCheckExample: {
        prompt: "What did Dayanand Saraswati mean by \"Go back to the Vedas\"?",
        steps: [
          "He treated the Vedas as the only true authority.",
          "So he rejected what came later: idol worship and the Puranic rituals.",
        ],
        answer: "The Vedas alone were authority; idol worship and later rituals should be given up.",
      },
      practiceSet: [
        { prompt: "In which year did Dayanand Saraswati found the Arya Samaj?", answer: "1875" },
        { prompt: "Which mission did Swami Vivekananda found in 1897?", answer: "The Ramakrishna Mission" },
        { prompt: "On what date did Vivekananda address the Parliament of Religions in Chicago?", answer: "11 September 1893" },
        { prompt: "Which body took shape at the Haridwar Kumbh Mela in 1915?", answer: "The Hindu Mahasabha" },
      ],
      traps: [
        {
          title: "Besant's school, Malaviya's university",
          body: "**Annie Besant** founded the **Central Hindu School**. The university that grew out of it was **Madan Mohan Malaviya's** BHU. Madame Blavatsky, a fellow Theosophist, founded neither.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-muslim",
      name: "Aligarh and the Ahmadiyya movement",
      intuition:
        "Among Muslims, Sir Syed Ahmad Khan wanted modern education with loyalty to the British, and he kept away from the Congress. In Punjab a new sect, the Ahmadiyya, grew from one small town.",
      definition:
        "The Muslim movements:\n" +
        "- **Sir Syed Ahmad Khan** founded the **Mohammedan Anglo-Oriental (MAO) College** at **Aligarh (1875)**. Its course blended **Muslim theology with European science**.\n" +
        "- He saw India as a **federation of communities** based on common descent, not as a nation of individual citizens, and he **opposed** the Congress.\n" +
        "- The **Mohammedan Anglo-Oriental Defence Association of Upper India (1893)** worked from Aligarh to keep educated Muslims loyal to the Raj and away from the Congress.\n" +
        "- **Mirza Ghulam Ahmad** started the **Ahmadiyya** movement in **1889** at **Qadian**, in **Gurdaspur** district of Punjab.",
      table: {
        columns: ["Movement", "Year", "Fact"],
        rows: [
          {
            cells: ["MAO College, Aligarh", "1875", "Sir Syed; Muslim theology with European science"],
            pyqExampleId: "4796ff5a-6fc5-466f-9030-b6e89bc24542",
          },
          { cells: ["Ahmadiyya movement", "1889", "Mirza Ghulam Ahmad, Qadian (Gurdaspur)"] },
          { cells: ["MAO Defence Association", "1893", "Aligarh; kept Muslims away from the Congress"] },
        ],
      },
      pyqExampleId: "6b60bf28-ddef-4401-a66b-c5e174d2430d",
      selfCheckExample: {
        prompt: "How did Sir Syed Ahmad Khan's idea of India differ from the Congress idea?",
        steps: [
          "The Congress spoke of one nation of individual citizens with rights.",
          "Sir Syed saw India as a federation of communities defined by common descent, and he opposed the Congress.",
        ],
        answer: "He saw a federation of communities, not a nation of citizens, and stood against the Congress.",
      },
      practiceSet: [
        { prompt: "Which college did Sir Syed Ahmad Khan found at Aligarh in 1875?", answer: "The Mohammedan Anglo-Oriental College" },
        { prompt: "What did the curriculum of the MAO College combine?", answer: "Muslim theology and European science" },
        { prompt: "Who founded the Ahmadiyya movement?", answer: "Mirza Ghulam Ahmad" },
      ],
      traps: [
        {
          title: "Sir Syed was not close to the Congress",
          body: "'His philosophy was very similar to that of the Congress' is **false**. He opposed the Congress and kept his followers away from it.",
        },
      ],
    },
  ],
};
