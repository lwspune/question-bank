import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MI_CIVIL_NOTE: SubtopicNote = {
  subtopicName: "From the Swaraj Party to the Poona Pact",
  title: "From the Swaraj Party to the Poona Pact",
  oneLineDefinition:
    "The national movement from 1923 to 1932: the Swaraj Party, the Simon Commission, Purna Swaraj, the Salt March and Civil Disobedience, the Gandhi-Irwin Pact and the Poona Pact, with the books and songs of the movement.",
  whyItMatters:
    "Twelve questions in the bank, ten of them EASY. Three ask who formed the Swaraj Party and two ask about the Gandhi-Irwin Pact, so a few facts carry most of the page. The MODERATE ones ask why Gandhiji fasted in 1932 and who led the Muslim League in 1930.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimici-swaraj",
      name: "The Swaraj Party, the Simon Commission and Purna Swaraj",
      intuition:
        "After Non-Cooperation ended, the Congress split on what to do next. One group went into the councils to fight from inside. " +
        "Then a British commission with no Indian member united everyone against it, and in 1929 the Congress asked for complete independence.",
      definition:
        "- **C.R. Das** and **Motilal Nehru** formed the **Swaraj Party** within the Congress in **1923**, to contest the council elections.\n" +
        "- Younger leaders such as **Jawaharlal Nehru** and **Subhas Chandra Bose** pushed instead for complete independence.\n" +
        "- The **Simon Commission**, set up under Sir John Simon to look into the working of the constitutional system in India and suggest changes, reached India in **1928**. It had no Indian member and was met with the slogan \"Go back Simon\".\n" +
        "- At the **Lahore** session of **December 1929**, under **Jawaharlal Nehru**, the Congress adopted the demand for **Purna Swaraj** (complete independence). **26 January 1930** was celebrated as Independence Day.\n" +
        "- In **1930** **Sir Muhammad Iqbal**, as president of the **Muslim League**, spoke of the need for separate electorates for Muslims.",
      table: {
        columns: ["Event", "Year", "Key fact"],
        rows: [
          { cells: ["Swaraj Party formed", "1923", "**C.R. Das** and **Motilal Nehru**, within the Congress"] },
          { cells: ["Simon Commission reaches India", "1928", "No Indian member; \"Go back Simon\""] },
          { cells: ["Lahore Congress", "December 1929", "**Purna Swaraj** resolution; president Jawaharlal Nehru"] },
          { cells: ["First Independence Day", "26 January 1930", "Celebrated after the Lahore resolution"] },
          { cells: ["Muslim League president", "1930", "**Sir Muhammad Iqbal**"] },
          { cells: ["Karachi Congress", "1931", "Resolution on Fundamental Rights"] },
        ],
      },
      selfCheckExample: {
        prompt: "What slogan greeted the Simon Commission when it reached India in 1928, and why?",
        steps: ["The commission was to suggest changes to India's constitutional system.", "Not one of its members was Indian, so Indians protested."],
        answer: "\"Go back Simon\", because it had no Indian member",
      },
      practiceSet: [
        { prompt: "Who presided over the Lahore Congress of December 1929?", answer: "Jawaharlal Nehru" },
        { prompt: "Which day was celebrated as Independence Day after the Lahore resolution?", answer: "26 January 1930" },
        { prompt: "Who was president of the Muslim League in 1930?", answer: "Sir Muhammad Iqbal" },
        { prompt: "Which Congress session passed the resolution on Fundamental Rights in 1931?", answer: "The Karachi session" },
        { prompt: "Why was the Simon Commission sent to India?", answer: "To look into the working of the constitutional system and suggest changes" },
      ],
      pyqExampleId: "13c2d96a-bb3b-4793-9a6f-d87cdf5a16b6",
      traps: [
        {
          title: "Motilal, not Jawaharlal",
          body:
            "The Swaraj Party was formed by C.R. Das and Motilal Nehru, the father. His son Jawaharlal Nehru wanted complete independence instead, and an option pairing Jawaharlal with C.R. Das is wrong.",
        },
        {
          title: "Lahore for Purna Swaraj, Karachi for Fundamental Rights",
          body:
            "Purna Swaraj was adopted at Lahore in December 1929. The Karachi session of 1931 passed the resolution on Fundamental Rights. The two sessions are often printed side by side.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimici-civil",
      name: "Civil Disobedience, the Gandhi-Irwin Pact and the Poona Pact",
      intuition:
        "Gandhiji chose salt, something every Indian used, to start a new movement. This time people were asked not just to refuse cooperation but to break colonial laws. " +
        "A truce with Irwin paused it, and a quarrel with Ambedkar over separate electorates ended in a fast and a pact.",
      definition:
        "- The **Salt March** began from **Sabarmati** on **12 March 1930** and reached **Dandi** on **6 April 1930**, where Gandhiji broke the salt law by making salt.\n" +
        "- A key feature of Civil Disobedience was the **large-scale participation of women**: they joined protest marches, made salt and picketed foreign cloth and liquor shops.\n" +
        "- The **Gandhi-Irwin Pact** of **5 March 1931**: Gandhiji called off Civil Disobedience and agreed to attend the **Second Round Table Conference** in London; the government agreed to **release political prisoners**. It did not promise independence.\n" +
        "- **Dr B.R. Ambedkar** demanded **separate electorates** for the Dalits. Gandhiji felt they would slow the Dalits' joining society, and began a **fast unto death** in 1932.\n" +
        "- The **Poona Pact** of **September 1932** ended the fast: the Depressed Classes got **reserved seats** in the councils, but they were voted for by the general electorate.",
      table: {
        columns: ["Event", "Date", "What happened"],
        rows: [
          { cells: ["Salt March", "12 March to 6 April 1930", "Sabarmati to **Dandi**; Gandhiji broke the salt law"] },
          { cells: ["Civil Disobedience", "From 1930", "**Large-scale participation of women**"] },
          { cells: ["Gandhi-Irwin Pact", "5 March 1931", "Movement called off; **political prisoners released**; Gandhiji to attend the Round Table Conference"] },
          { cells: ["Second Round Table Conference", "London, 1931", "Gandhiji attended; talks broke down"] },
          { cells: ["Gandhiji's fast unto death", "1932", "Against **separate electorates** for Dalits"] },
          { cells: ["Poona Pact", "September 1932", "**Reserved seats** for the Depressed Classes, general electorate"] },
        ],
      },
      selfCheckExample: {
        prompt: "From where did Gandhiji start the Salt March, and where did he break the salt law?",
        steps: ["He walked from his ashram at Sabarmati.", "He reached the coast at Dandi on 6 April 1930 and made salt there."],
        answer: "From Sabarmati; he broke the law at Dandi",
      },
      practiceSet: [
        { prompt: "What did the Poona Pact of 1932 give the Depressed Classes?", answer: "Reserved seats in the councils, voted for by the general electorate" },
        { prompt: "Which conference did Gandhiji agree to attend under the Gandhi-Irwin Pact?", answer: "The Second Round Table Conference in London" },
        { prompt: "On what date was the Gandhi-Irwin Pact signed?", answer: "5 March 1931" },
        { prompt: "Name one thing women did in the Civil Disobedience Movement.", answer: "Any one of: joined protest marches, made salt, picketed foreign cloth and liquor shops" },
        { prompt: "Did the Gandhi-Irwin Pact promise India independence?", answer: "No. It released political prisoners and ended the movement for a time" },
      ],
      pyqExampleId: "2530497f-a321-43ec-972a-68d77720963e",
      traps: [
        {
          title: "The salt law was not abolished",
          body:
            "The Gandhi-Irwin Pact released political prisoners. It did not abolish the salt law and it did not promise independence.",
        },
        {
          title: "The 1932 fast was about electorates",
          body:
            "Gandhiji's fast unto death in 1932 was against separate electorates for Dalits, the clash with Dr Ambedkar. It was not about violence in the movement or the failure of a conference.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimici-symbols",
      name: "Books, songs and images of the movement",
      intuition:
        "A nation is also built from songs, pictures and books that people share. A few of these are asked by their author, so learn each one with its maker.",
      definition:
        "- **Vande Mataram**, the national song, was written by **Bankim Chandra Chattopadhyay** and included in his novel **Anandamath**.\n" +
        "- **Jana Gana Mana**, the national anthem, was written by **Rabindranath Tagore**.\n" +
        "- The best-known painting of **Bharat Mata** is by **Abanindranath Tagore**.\n" +
        "- **Hind Swaraj** (1909) was written by **Mahatma Gandhi**. It argued that British rule lasted only because Indians cooperated with it.",
      table: {
        columns: ["Work", "Kind", "By"],
        rows: [
          { cells: ["Vande Mataram", "National song (in the novel Anandamath)", "**Bankim Chandra Chattopadhyay**"] },
          { cells: ["Jana Gana Mana", "National anthem", "Rabindranath Tagore"] },
          { cells: ["Bharat Mata", "Painting", "Abanindranath Tagore"] },
          { cells: ["Hind Swaraj (1909)", "Book", "**Mahatma Gandhi**"] },
          { cells: ["The Discovery of India", "Book", "Jawaharlal Nehru"] },
          { cells: ["Gulamgiri (1873)", "Book", "Jyotirao Phule"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who painted the famous image of Bharat Mata?",
        steps: ["Two Tagores appear in these questions.", "Rabindranath wrote the anthem; Abanindranath was the painter."],
        answer: "Abanindranath Tagore",
      },
      practiceSet: [
        { prompt: "Who wrote Jana Gana Mana?", answer: "Rabindranath Tagore" },
        { prompt: "In which novel did Vande Mataram appear?", answer: "Anandamath" },
        { prompt: "Who wrote The Discovery of India?", answer: "Jawaharlal Nehru" },
        { prompt: "What did Hind Swaraj argue about British rule?", answer: "That it lasted only because Indians cooperated with it" },
      ],
      pyqExampleId: "1b25536e-e06a-40e4-baf8-54404a6ffd70",
      traps: [
        {
          title: "Two Tagores, two works",
          body:
            "Rabindranath Tagore wrote Jana Gana Mana; Abanindranath Tagore painted Bharat Mata. Neither wrote Vande Mataram, which is Bankim Chandra Chattopadhyay's.",
        },
      ],
    },
  ],
};
