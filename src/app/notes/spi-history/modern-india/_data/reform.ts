import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MI_REFORM_NOTE: SubtopicNote = {
  subtopicName: "Social Reform and the Fight Against Caste",
  title: "Social Reform and the Fight Against Caste",
  oneLineDefinition:
    "The reform societies of the 19th century, each with its founder, city and year, and the leaders who fought caste and untouchability into the 1930s.",
  whyItMatters:
    "Eight questions in the bank, six of them MODERATE. Most give a year and a city and ask for the society, so the four that sound alike (Brahmo Samaj, Prarthana Samaj, Veda Samaj, Arya Samaj) are the trap. The rest ask who founded the Depressed Classes Association, what Periyar started, and who the Sanatanis were.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimirf-samaj",
      name: "Reform societies: founder, city and year",
      intuition:
        "In the 19th century Indian reformers set up societies to change customs they thought unjust: sati, child marriage, the ban on widow remarriage and caste. " +
        "The bank asks each society by its year and city, so learn them as a timeline from 1828 to 1897.",
      definition:
        "- **Raja Rammohun Roy** founded the **Brahmo Sabha** (later the Brahmo Samaj) in Calcutta in **1828** and campaigned against **sati**, which was banned in **1829**.\n" +
        "- **Ishwarchandra Vidyasagar** worked for widow remarriage; the law allowing it was passed in **1856**.\n" +
        "- The **Paramhans Mandali** (Bombay, **1840**) worked for the abolition of caste.\n" +
        "- The **Veda Samaj** (Madras, **1864**) was inspired by the Brahmo Samaj and worked against caste and for widow remarriage and girls' education.\n" +
        "- The **Prarthana Samaj** (Bombay, **1867**) followed the **Bhakti** tradition, which held that all castes are spiritually equal.\n" +
        "- The **Singh Sabhas**, the Sikh reform bodies, began at **Amritsar in 1873** and at Lahore in 1879.",
      table: {
        columns: ["Society", "Founded", "Founder or idea"],
        rows: [
          { cells: ["Brahmo Sabha (Brahmo Samaj)", "Calcutta, 1828", "Raja Rammohun Roy; drew on the Upanishads"] },
          { cells: ["Paramhans Mandali", "Bombay, 1840", "Worked for the **abolition of caste**"] },
          { cells: ["Veda Samaj", "Madras, 1864", "Inspired by the **Brahmo Samaj**; against caste, for widow remarriage"] },
          { cells: ["Prarthana Samaj", "Bombay, 1867", "Followed the **Bhakti** tradition of spiritual equality of castes"] },
          { cells: ["Singh Sabha", "Amritsar, 1873", "Sikh reform; a second Sabha at Lahore in 1879"] },
          { cells: ["Satyashodhak Samaj", "1873", "**Jyotirao Phule**, for caste equality"] },
          { cells: ["Arya Samaj", "1875", "**Swami Dayanand Saraswati**; drew on the Vedas"] },
          { cells: ["Muhammadan Anglo-Oriental College", "Aligarh, 1875", "**Sayyid Ahmed Khan**, modern education for Muslims"] },
          { cells: ["Ramakrishna Mission", "1897", "**Swami Vivekananda**, named after his guru Ramakrishna"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which reform society did Swami Dayanand Saraswati found in 1875?",
        steps: ["Dayanand Saraswati wanted Hindus to return to the Vedas.", "His society was the Arya Samaj."],
        answer: "The Arya Samaj",
      },
      practiceSet: [
        { prompt: "Who founded the Brahmo Sabha in 1828?", answer: "Raja Rammohun Roy" },
        { prompt: "In which city was the Veda Samaj set up in 1864?", answer: "Madras" },
        { prompt: "Which society, founded in Bombay in 1867, followed the Bhakti tradition of spiritual equality of all castes?", answer: "The Prarthana Samaj" },
        { prompt: "Who founded the Satyashodhak Samaj?", answer: "Jyotirao Phule" },
        { prompt: "Who set up the Muhammadan Anglo-Oriental College at Aligarh?", answer: "Sayyid Ahmed Khan" },
        { prompt: "Which reformer worked for widow remarriage, allowed by law in 1856?", answer: "Ishwarchandra Vidyasagar" },
      ],
      pyqExampleId: "1686b3bd-9bac-47d4-ae30-5659deef0fa6",
      traps: [
        {
          title: "Prarthana Samaj and Paramhans Mandali are both from Bombay",
          body:
            "Both were founded in Bombay. The Paramhans Mandali came first, in 1840, to abolish caste; the Prarthana Samaj came in 1867 and followed the Bhakti saints.",
        },
        {
          title: "Veda Samaj, not Arya Samaj",
          body:
            "The Veda Samaj of Madras (1864) took its lead from the Brahmo Samaj. The Arya Samaj (1875) was Dayanand Saraswati's and looked back to the Vedas. The similar names hide two different societies.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimirf-caste",
      name: "Leaders against caste and untouchability",
      intuition:
        "Reform from above was not enough for the people at the bottom of the caste order. In the late 19th and early 20th centuries leaders from these communities organised for themselves and demanded equal rights.",
      definition:
        "- **Jyotirao Phule** wrote **Gulamgiri** (slavery) in 1873 and founded the Satyashodhak Samaj.\n" +
        "- **Sree Narayana Guru** of Kerala taught \"one caste, one religion, one god for humankind\".\n" +
        "- **Dr B.R. Ambedkar** started a temple entry movement in **1927** and organised the Dalits into the **Depressed Classes Association** in **1930**.\n" +
        "- **E.V. Ramaswamy Naicker (Periyar)** started the **Self Respect Movement** in 1925.\n" +
        "- **Gandhiji** called the untouchables **Harijans**, children of God.\n" +
        "- The **Sanatanis** were orthodox **high-caste Hindus** who opposed these efforts to end untouchability.",
      table: {
        columns: ["Leader or group", "Known for"],
        rows: [
          { cells: ["Jyotirao Phule", "Book **Gulamgiri** (1873); Satyashodhak Samaj"] },
          { cells: ["Sree Narayana Guru", "Kerala; \"one caste, one religion, one god for humankind\""] },
          { cells: ["Periyar (E.V. Ramaswamy Naicker)", "**Self Respect Movement**, 1925"] },
          { cells: ["Dr B.R. Ambedkar", "Temple entry movement (1927); **Depressed Classes Association** (1930)"] },
          { cells: ["Gandhiji", "Called the untouchables Harijans, children of God"] },
          { cells: ["Sanatanis", "Orthodox **high-caste Hindus**"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which leader started a temple entry movement in 1927?",
        steps: ["The movement was for Dalits to enter temples.", "It was led by the leader who later founded the Depressed Classes Association."],
        answer: "Dr B.R. Ambedkar",
      },
      practiceSet: [
        { prompt: "What did E.V. Ramaswamy Naicker (Periyar) start in 1925?", answer: "The Self Respect Movement" },
        { prompt: "Who wrote the book Gulamgiri?", answer: "Jyotirao Phule" },
        { prompt: "Who taught \"one caste, one religion, one god for humankind\"?", answer: "Sree Narayana Guru" },
        { prompt: "What name did Gandhiji give to the untouchables?", answer: "Harijans (children of God)" },
        { prompt: "Who were the Sanatanis?", answer: "Orthodox high-caste Hindus" },
      ],
      pyqExampleId: "203aa6dc-83a4-4cde-89e2-2229acbc0b32",
      traps: [
        {
          title: "Sanatanis were the high castes",
          body:
            "The Sanatanis were orthodox high-caste Hindus who opposed the work against untouchability. The Dalits were the people that work was meant to help.",
        },
        {
          title: "Ambedkar's association, not Gandhi's",
          body:
            "The Depressed Classes Association of 1930 was founded by Dr B.R. Ambedkar. Gandhiji worked among Dalits too, but through his own campaigns, not this association.",
        },
      ],
    },
  ],
};
