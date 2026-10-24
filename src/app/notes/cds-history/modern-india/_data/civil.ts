import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_CIVIL_NOTE: SubtopicNote = {
  subtopicName: "Swarajists, Civil Disobedience and the Left",
  title: "Swarajists, Civil Disobedience and the Left",
  oneLineDefinition:
    "The national movement from 1918 to the late 1930s: the Liberals, Swarajists and No-Changers, Purna Swaraj and Civil Disobedience, the trade unions and kisan sabhas, and the revolutionaries and socialists.",
  whyItMatters:
    "Twenty-two CDS questions, the largest page in the chapter, and fourteen of them HARD. Ten come from 2020, seven of those from the single paper of CDS 2020 (II). Civil Disobedience is asked in order of events; the trade union and party questions ask who founded what, often with a close name as the trap.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-swarajists",
      name: "Liberals, Swarajists and No-Changers",
      intuition:
        "After 1918 the Congress lost its Moderates, who formed their own Liberal party. After Non-Cooperation ended in 1922, it split again: one group wanted to fight from inside the councils, the other to keep up constructive work in the villages.",
      definition:
        "The groups:\n" +
        "- **National Liberal Federation (1918)**: the Moderates who left the Congress over the Montagu-Chelmsford reforms, such as **Surendranath Banerjea, Tej Bahadur Sapru** and **Srinivasa Sastri**.\n" +
        "- **Pro-Changers (Swarajists)**: wanted to enter the councils. **C.R. Das** and **Motilal Nehru** formed the **Swaraj Party (1923)**; **Vithalbhai Patel** became Speaker of the Central Legislative Assembly.\n" +
        "- **No-Changers**: stayed with Gandhi's constructive work, such as **C. Rajagopalachari, M.A. Ansari, Kasturi Ranga Iyengar**, Vallabhbhai Patel and Rajendra Prasad.\n" +
        "- **S.B. Tambe**, a Swarajist of the **Central Provinces**, was the first to accept a ministerial post (**October 1925**). The **Responsivists** (Jayakar, Moonje, Kelkar) defended him.",
      table: {
        columns: ["Group", "Year", "Leaders"],
        rows: [
          {
            cells: ["National Liberal Federation", "1918", "Moderates: Surendranath Banerjea, T.B. Sapru, Srinivasa Sastri"],
            pyqExampleId: "c6d77b8e-7389-436a-867c-d76777ad460b",
          },
          { cells: ["Swaraj Party (Pro-Changers)", "1923", "C.R. Das, Motilal Nehru, Vithalbhai Patel"] },
          { cells: ["No-Changers", "1922 to 1923", "C. Rajagopalachari, M.A. Ansari, Kasturi Ranga Iyengar"] },
          {
            cells: ["First Swarajist minister", "October 1925", "S.B. Tambe, Central Provinces"],
            pyqExampleId: "b192fb48-fdd2-4616-ad89-fb5c2f314d72",
          },
        ],
      },
      pyqExampleId: "7f92c63f-82af-4418-8cf6-ee5ee8a40bfa",
      selfCheckExample: {
        prompt: "After Non-Cooperation ended in 1922, what divided the Pro-Changers from the No-Changers?",
        steps: [
          "The Pro-Changers wanted to contest the council elections and oppose the government from inside.",
          "The No-Changers wanted to keep away from the councils and continue Gandhi's constructive work.",
        ],
        answer: "Whether to enter the councils (Pro-Changers) or stay with constructive work (No-Changers).",
      },
      practiceSet: [
        { prompt: "Which two leaders formed the Swaraj Party in 1923?", answer: "C.R. Das and Motilal Nehru" },
        { prompt: "Over which reforms did the Moderates leave the Congress in 1918?", answer: "The Montagu-Chelmsford reforms" },
        { prompt: "In which province did S.B. Tambe accept a ministerial post in 1925?", answer: "The Central Provinces" },
      ],
      traps: [
        {
          title: "C.R. Das was no Liberal",
          body: "**C.R. Das** led the **Swarajists** inside the Congress. Any pair naming him as a founder of the Liberal Federation is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-civil-disobedience",
      name: "From Purna Swaraj to the Round Table",
      intuition:
        "In 1929 the Congress asked for complete independence. Gandhi then picked salt, which every Indian used, and this time asked people to break the law. " +
        "A pact with Irwin paused the movement and took Gandhi to London, but the conference gave nothing, and the struggle over separate electorates followed.",
      definition:
        "The events in order:\n" +
        "- **Lahore session (31 December 1929)**, president **Jawaharlal Nehru**: **Purna Swaraj** adopted. **26 January 1930** was the first Independence Day.\n" +
        "- **Dandi March (12 March to 6 April 1930)**: Gandhi broke the **salt law** (salt is sodium chloride). **Kamaladevi Chattopadhyay** persuaded him not to keep it to men. In Karnataka salt was made at **Sanikatta**.\n" +
        "- **Gandhi-Irwin Pact (5 March 1931)**: Civil Disobedience suspended; the Congress to attend the Round Table Conference; prisoners not convicted of violence released.\n" +
        "- **Karachi session (1931)**, president **Vallabhbhai Patel**: the resolution on **Fundamental Rights and Economic Policy**.\n" +
        "- **Second Round Table Conference (1931)**: the British refused the basic demand for freedom. Under **Lord Willingdon** the revived movement met **repression**, not reconciliation.\n" +
        "- **1931, Bombay**: the Depressed Classes leaders demanded **separate electorates**. The **Communal Award (1932)** granted them; the **Poona Pact (September 1932)** replaced them with reserved seats.\n" +
        "- The Muslim League's **Lahore (Pakistan) Resolution** came much later, in **March 1940**.",
      table: {
        columns: ["Event", "Date", "Fact"],
        rows: [
          {
            cells: ["Lahore Congress", "31 December 1929", "Purna Swaraj; president Jawaharlal Nehru"],
            pyqExampleId: "52dee210-a400-467e-8eec-b8ad3ec85e28",
          },
          {
            cells: ["Dandi March", "12 March to 6 April 1930", "Salt law broken at Dandi"],
            noteAmber: "CDS 2025 (II) order: Dandi March, Gandhi-Irwin Pact, Second Round Table, Pakistan Resolution (1940).",
            pyqExampleId: "fb0183ce-30cd-4f36-a7f5-ca4e016de718",
          },
          {
            cells: ["Sanikatta salt satyagraha", "1930", "Ankola, Uttara Kannada, Karnataka"],
            pyqExampleId: "120de56a-116b-41ea-8d20-79be0f20ca18",
          },
          { cells: ["Gandhi-Irwin Pact", "5 March 1931", "Movement suspended; Congress to go to London"] },
          {
            cells: ["Karachi Congress", "1931", "Fundamental Rights and Economic Policy"],
            pyqExampleId: "1415e4ab-4e2b-4355-a20b-e923b012c40b",
          },
          {
            cells: ["Second Round Table Conference", "Late 1931", "Demand for freedom refused"],
            pyqExampleId: "5efe8940-a072-417d-b616-ced45054f5d5",
          },
          {
            cells: ["Depressed Classes conference, Bombay", "1931", "Separate electorates demanded"],
            pyqExampleId: "fe9e4708-93eb-483f-80b8-85a041089574",
          },
          { cells: ["Poona Pact", "September 1932", "Reserved seats instead of separate electorates"] },
        ],
      },
      pyqExampleId: "bb63ff06-a65f-4632-9c99-114af749e3ce",
      selfCheckExample: {
        prompt: "What did the Depressed Classes leaders demand at Bombay in 1931, and how was the question settled in 1932?",
        steps: [
          "Backing Ambedkar, they demanded separate electorates for the untouchables.",
          "The Communal Award of 1932 granted them; Gandhi fasted against it.",
          "The Poona Pact of September 1932 gave reserved seats in the general electorate instead.",
        ],
        answer: "Separate electorates; granted by the Communal Award, then replaced by reserved seats in the Poona Pact.",
      },
      practiceSet: [
        { prompt: "Which day was celebrated as the first Independence Day after the Lahore session?", answer: "26 January 1930" },
        { prompt: "Who presided over the Karachi Congress of 1931?", answer: "Vallabhbhai Patel" },
        { prompt: "Who persuaded Gandhi not to keep the salt satyagraha to men only?", answer: "Kamaladevi Chattopadhyay" },
        { prompt: "Which Viceroy met the revived Civil Disobedience Movement with repression?", answer: "Lord Willingdon" },
      ],
      traps: [
        {
          title: "Lahore for Purna Swaraj, Karachi for rights",
          body: "**Purna Swaraj** was adopted at **Lahore (1929)**. The **Fundamental Rights and Economic Policy** resolution was passed at **Karachi (1931)**.",
        },
        {
          title: "No dominion status in 1932",
          body: "India was **not** given dominion status in 1932, and **Willingdon** did not seek reconciliation. Statements saying so are false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-labour",
      name: "Workers' and peasants' organisations",
      intuition:
        "From 1918 workers and peasants built their own organisations. Trade unions came first, then an all-India union congress, and in the 1930s the kisan sabhas and caste alliances of the middle peasants. The Communists first joined these bodies and then split from them.",
      definition:
        "The organisations:\n" +
        "- **Madras Labour Union (1918)**, organised by **B.P. Wadia**: India's first trade union in the proper sense.\n" +
        "- **All India Trade Union Congress (1920, Bombay)**: set up largely on the initiative of **N.M. Joshi**; its first president was **Lala Lajpat Rai**.\n" +
        "- Women led strikes in the 1920s: **Anasuya Behn** (Ahmedabad textile workers), **Ushabai Dange** (Bombay mill workers), **Prabhabati Devi**. **Sarala Devi Chaudhurani** worked in the nationalist and women's movements, not in trade unions.\n" +
        "- From **1928** the Communists stopped working with the mainstream national movement, and in **1931** they left the AITUC to form the **Red Trade Union Congress**.\n" +
        "- **Triveni Sangh** (Bihar): an alliance of the **Ahirs (Yadavs), Kurmis and Koeris**.\n" +
        "- **All India Kisan Sabha (1936)**: its first president was **Swami Sahajanand Saraswati**.",
      table: {
        columns: ["Organisation", "Year", "Founder or leader"],
        rows: [
          { cells: ["Madras Labour Union", "1918", "B.P. Wadia"] },
          {
            cells: ["All India Trade Union Congress", "1920", "N.M. Joshi; first president Lala Lajpat Rai"],
            pyqExampleId: "7ce4489c-6d52-469a-9563-daaecc2d9557",
          },
          {
            cells: ["Communists leave the AITUC", "1931", "Red Trade Union Congress formed"],
            pyqExampleId: "5c1e2ccb-1ede-46d8-a98b-56b113050623",
          },
          {
            cells: ["Triveni Sangh", "1930s", "Ahirs, Kurmis and Koeris of Bihar"],
            pyqExampleId: "3f3e4438-fc1c-49b4-a822-264106334833",
          },
          { cells: ["All India Kisan Sabha", "1936", "Swami Sahajanand Saraswati"] },
        ],
      },
      pyqExampleId: "8bbb8ab4-9c1d-463a-b595-be40489c4d67",
      selfCheckExample: {
        prompt: "Why did the Communists leave the All India Trade Union Congress in 1931?",
        steps: [
          "From 1928 they followed a new line and stopped working with the Congress-led national movement.",
          "In keeping with it they walked out of the AITUC in 1931 and set up the Red Trade Union Congress.",
        ],
        answer: "Because they had broken with the mainstream national movement from 1928; they formed the Red Trade Union Congress.",
      },
      practiceSet: [
        { prompt: "Who was the first president of the All India Trade Union Congress?", answer: "Lala Lajpat Rai" },
        { prompt: "Who led the textile workers of Ahmedabad in the 1920s?", answer: "Anasuya Behn" },
        { prompt: "Who was the first president of the All India Kisan Sabha in 1936?", answer: "Swami Sahajanand Saraswati" },
      ],
      traps: [
        {
          title: "Wadia for Madras, Joshi for the AITUC",
          body: "**B.P. Wadia** organised the **Madras Labour Union**. The **AITUC** came from **N.M. Joshi's** initiative. S.A. Dange and B.T. Ranadive were later Communist leaders.",
        },
        {
          title: "Sarala Devi was not a union leader",
          body: "**Sarala Devi Chaudhurani** worked for nationalism and women's rights. Among the women who led strikes in the 1920s she is the one that does **not** belong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-revolutionaries",
      name: "Revolutionaries and socialists",
      intuition:
        "Young people who lost faith in non-violence turned to revolution and to socialism. They argued their case in writing too: a pamphlet answering Gandhi, and a Communist thesis on how to work with the Congress. Inside the Congress, the socialists formed their own party.",
      definition:
        "The groups and texts:\n" +
        "- **Hindustan Socialist Republican Association (September 1928)**: formed at **Feroz Shah Kotla**, Delhi, by **Bhagat Singh** and other young revolutionaries, with **Chandrashekhar Azad** as its commander.\n" +
        "- **The Philosophy of the Bomb (1930)**: written by **Bhagwati Charan Vohra**, approved by Azad, as a reply to Gandhi's article **The Cult of the Bomb**.\n" +
        "- **Congress Socialist Party (1934, Patna)**: **Acharya Narendra Dev** president, **Jayaprakash Narayan** general secretary.\n" +
        "- **Dutt-Bradley thesis (1936)**: a **Communist** document by **R. Palme Dutt and Ben Bradley**. It said the Congress could play a great part in an **anti-imperialist people's front**.",
      table: {
        columns: ["Group or text", "Year", "Who"],
        rows: [
          { cells: ["Hindustan Socialist Republican Association", "September 1928", "Bhagat Singh, Chandrashekhar Azad and others, at Feroz Shah Kotla"] },
          {
            cells: ["The Philosophy of the Bomb", "1930", "Bhagwati Charan Vohra"],
            pyqExampleId: "34b9749f-9670-456e-bcce-e57f42da54a0",
          },
          { cells: ["Congress Socialist Party", "1934", "Narendra Dev (president), Jayaprakash Narayan (secretary)"] },
          {
            cells: ["Dutt-Bradley thesis", "1936", "R. Palme Dutt and Ben Bradley, Communists"],
            pyqExampleId: "b1d9450c-389f-4e8f-ac47-b36617fd9199",
          },
        ],
      },
      pyqExampleId: "1c583f47-9e0c-4710-96eb-a0bdc5640a39",
      selfCheckExample: {
        prompt: "Why was The Philosophy of the Bomb written?",
        steps: [
          "Gandhi had condemned the attempt on the Viceroy's train in an article called The Cult of the Bomb.",
          "Bhagwati Charan Vohra wrote The Philosophy of the Bomb as the revolutionaries' reply, defending their methods.",
        ],
        answer: "As the revolutionaries' reply to Gandhi's article The Cult of the Bomb.",
      },
      practiceSet: [
        { prompt: "Where was the Hindustan Socialist Republican Association formed in September 1928?", answer: "At Feroz Shah Kotla, Delhi" },
        { prompt: "To which party did R. Palme Dutt and Ben Bradley belong?", answer: "The Communist Party" },
        { prompt: "Which article of Gandhi did The Philosophy of the Bomb answer?", answer: "The Cult of the Bomb" },
      ],
      traps: [
        {
          title: "Vohra wrote it, not Bhagat Singh",
          body: "**The Philosophy of the Bomb** was written by **Bhagwati Charan Vohra**. Bhagat Singh, Sukhdev and Azad are the distractors.",
        },
        {
          title: "The thesis was Communist",
          body: "The **Dutt-Bradley thesis** came from the **Communist** side, not from the Congress Working Committee or the Socialists.",
        },
      ],
    },
  ],
};
