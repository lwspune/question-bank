import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GS_PARLIAMENT_NOTE: SubtopicNote = {
  subtopicName: "Organs of Government, Parliament and Elections",
  title: "Organs of Government, Parliament and Elections",
  oneLineDefinition:
    "The three organs of government and the levels they work at, how Parliament and a state legislature pass laws and who may sit in them, and how the Election Commission runs elections and recognises parties.",
  whyItMatters:
    "Eight questions in the bank, three of them from the 2022 paper: an article number, a minimum age and the rule for a national party. Six are EASY, but the 2022 HARD one prints the numbers 5, 6, four and five in its options, so a rule learnt nearly right still loses the mark. Learn the numbers exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigspe-organs",
      name: "The three organs and the levels of government",
      intuition:
        "Government does three jobs: make laws, carry them out, and settle disputes about them. Giving each job to a different organ means no one organ can do as it likes, because the other two can check it. " +
        "Government also works at three levels, and each level takes the problems of its own size.",
      definition:
        "- The **legislature** makes laws, the **executive** carries them out, and the **judiciary** interprets them and settles disputes.\n" +
        "- **Separation of powers** divides power among the three organs, so each checks the others: a system of **checks and balances**.\n" +
        "- India has three **levels** of government: the **Central (Union) Government** for the whole country, the **State Governments**, and **local government** (panchayats and municipalities).\n" +
        "- The Constitution divides subjects into three lists: the **Union List** (such as defence, foreign affairs, banking, currency), the **State List** (such as police, agriculture, irrigation) and the **Concurrent List** (such as education, forests, marriage), on which both may make laws.\n" +
        "- A problem bigger than one state, such as a flood across many states, needs the **Central Government**. The **National Disaster Management Authority** is chaired by the Prime Minister.",
      table: {
        columns: ["Organ or level", "Job"],
        rows: [
          { cells: ["Legislature", "Makes laws"] },
          { cells: ["Executive", "Carries out the laws"] },
          { cells: ["Judiciary", "Interprets laws and settles disputes"] },
          { cells: ["Central Government", "Union List and matters of the whole country"] },
          { cells: ["State Government", "State List: police, agriculture, irrigation"] },
          { cells: ["Local government", "Village and city matters"] },
        ],
        caption: "Concurrent List subjects such as education and forests can be made law by both the Centre and the states.",
      },
      selfCheckExample: {
        prompt: "Police is a subject on which list: Union, State or Concurrent?",
        steps: ["Law and order inside a state is run by the state.", "So police is on the State List."],
        answer: "The State List",
      },
      practiceSet: [
        { prompt: "Which organ of government interprets laws and settles disputes?", answer: "The judiciary" },
        { prompt: "Defence is on which list of subjects?", answer: "The Union List" },
        { prompt: "Name a subject on the Concurrent List.", answer: "Any one of: education, forests, marriage" },
        { prompt: "Which level of government deals with a problem that spreads over several states?", answer: "The Central Government" },
        { prompt: "Which organ of government carries out the laws?", answer: "The executive" },
      ],
      pyqExampleId: "4bb932a8-cfd1-4a55-b0cf-b258cf69def3",
      traps: [
        {
          title: "Separation is not sameness",
          body:
            "Separation of powers gives each organ a different job and lets each check the others. It does not make all organs do the same work, and it does not put all power with the judiciary.",
        },
        {
          title: "Many states means the Centre",
          body:
            "A flood in one district is first a state's job. A disaster across several states is beyond any one state, so the answer is the Central Government.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigspe-parliament",
      name: "Parliament, the state legislature and who may sit in them",
      intuition:
        "Parliament has two Houses. The Lok Sabha is chosen directly by the people, so it has the last word on money. The Rajya Sabha represents the states and can only advise on a money bill. " +
        "Every House sets a minimum age for its members, and the House with the longer view asks for an older member.",
      definition:
        "- **Parliament** is the President and the two Houses: the **Lok Sabha** (House of the People) and the **Rajya Sabha** (Council of States).\n" +
        "- The Lok Sabha is elected for **five years**. The Rajya Sabha is never dissolved: its members serve **six years** and one-third retire every two years. The President nominates **12** of its members.\n" +
        "- A **money bill** can be brought only in the Lok Sabha. The Rajya Sabha must return it within **14 days**, with or without recommendations, and the Lok Sabha need not accept them (Article 109).\n" +
        "- A state's legislature is the **Legislative Assembly** and, in a few states, also a **Legislative Council**.\n" +
        "- The Speaker presides over the Lok Sabha; the **Vice-President** is the Chairman of the Rajya Sabha.",
      table: {
        columns: ["Office or House", "Minimum age"],
        rows: [
          { cells: ["Voter", "18 years"] },
          { cells: ["Lok Sabha member", "25 years"] },
          { cells: ["Legislative Assembly member", "25 years"] },
          { cells: ["Rajya Sabha member", "30 years"] },
          { cells: ["Legislative Council member", "**30 years**"] },
          { cells: ["President or Vice-President", "35 years"] },
        ],
        caption: "The two directly elected Houses ask 25; the two upper Houses ask 30; the President asks 35.",
      },
      selfCheckExample: {
        prompt: "What is the minimum age to become a member of the Lok Sabha?",
        steps: ["The Lok Sabha is directly elected, like a Legislative Assembly.", "Both ask for 25 years."],
        answer: "25 years",
      },
      practiceSet: [
        { prompt: "Within how many days must the Rajya Sabha return a money bill to the Lok Sabha?", answer: "14 days" },
        { prompt: "In which House can a money bill be introduced?", answer: "Only in the Lok Sabha" },
        { prompt: "What is the minimum age to become a member of the Rajya Sabha?", answer: "30 years" },
        { prompt: "How many members of the Rajya Sabha does the President nominate?", answer: "12" },
        { prompt: "Who is the Chairman of the Rajya Sabha?", answer: "The Vice-President of India" },
        { prompt: "For how many years does a member of the Rajya Sabha serve?", answer: "Six years" },
      ],
      pyqExampleId: "c9a77a9b-3585-4bb5-9a5b-1af2d49f6343",
      traps: [
        {
          title: "25 for the lower Houses, 30 for the upper",
          body:
            "Lok Sabha and Legislative Assembly members must be 25; Rajya Sabha and Legislative Council members must be 30. 35 is for the President and the Vice-President.",
        },
        {
          title: "Fourteen days, not a month",
          body:
            "On a money bill the Rajya Sabha has only 14 days. If it does not return the bill in that time, the bill is taken as passed by both Houses.",
        },
        {
          title: "The Rajya Sabha is not dissolved",
          body:
            "The Lok Sabha is elected for five years and then dissolved. The Rajya Sabha goes on, with one-third of its members retiring every two years.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigspe-elections",
      name: "The Election Commission, party recognition and the words of elections",
      intuition:
        "Elections are run by an independent body set up by the Constitution itself, so the party in power cannot control them. " +
        "The same body decides which parties count as national or state parties, using fixed numbers that the bank asks exactly.",
      definition:
        "- The **Election Commission of India** is set up under **Article 324**. It is headed by the **Chief Election Commissioner**, appointed by the President.\n" +
        "- A party is recognised as a **national party** if it gets at least **6% of the votes** in Lok Sabha or Assembly elections in **four states** and wins at least **four seats** in the Lok Sabha.\n" +
        "- A party is a **state party** if it gets at least **6% of the votes** in a state's Assembly election and wins at least **two seats**.\n" +
        "- Every candidate files an **affidavit**, a signed and sworn statement, giving details of criminal cases, property and education.\n" +
        "- **Defection** is leaving the party on whose ticket one was elected for another party. The **anti-defection law** (the Tenth Schedule, added by the 52nd Amendment of 1985) can disqualify such a member.",
      table: {
        columns: ["Term or rule", "Meaning"],
        rows: [
          { cells: ["Election Commission", "Article 324; headed by the Chief Election Commissioner"] },
          { cells: ["National party", "**6%** of votes in **four** states and **4** Lok Sabha seats"] },
          { cells: ["State party", "**6%** of votes in a state's Assembly election and **2** seats"] },
          { cells: ["Affidavit", "A signed, sworn statement of one's own details"] },
          { cells: ["Defection", "Leaving one's party for another after being elected"] },
          { cells: ["Coalition", "Parties joining together to form a government"] },
        ],
      },
      selfCheckExample: {
        prompt: "What share of votes and how many seats does a party need in a state's Assembly election to be recognised as a state party?",
        steps: ["The vote share is the same as for a national party, 6%.", "The seats needed are fewer: two in that Assembly."],
        answer: "At least 6% of the votes and two seats",
      },
      practiceSet: [
        { prompt: "What is a signed, sworn statement of one's own details, filed by every election candidate, called?", answer: "An affidavit" },
        { prompt: "In how many states must a party get 6% of the votes to be a national party?", answer: "Four" },
        { prompt: "How many Lok Sabha seats must a national party win under the 6% rule?", answer: "At least four" },
        { prompt: "Which Schedule of the Constitution holds the anti-defection law?", answer: "The Tenth Schedule" },
        { prompt: "Who heads the Election Commission of India?", answer: "The Chief Election Commissioner" },
      ],
      pyqExampleId: "73834d7a-269d-44e4-8ed8-f95f3abdb050",
      traps: [
        {
          title: "6% and four, not 5% or five",
          body:
            "The national-party rule is 6% of the votes in four states with four Lok Sabha seats. If the options offer only 5 and four, 5 and five, or 6 and five, the answer is None of these.",
        },
        {
          title: "Defection is not a coalition",
          body:
            "Defection is one member switching parties after the election. A coalition is parties joining to form a government; partisanship is strong loyalty to one party.",
        },
      ],
    },
  ],
};
