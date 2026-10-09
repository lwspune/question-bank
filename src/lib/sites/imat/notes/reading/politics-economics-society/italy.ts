import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_PES_ITALY_NOTE: SubtopicNote = {
  subtopicName: "The Italian Republic",
  title: "The Italian Republic: Constitution, Institutions and Regions",
  oneLineDefinition:
    "How Italy's Constitution was made in 1946 to 1948, what its key articles say, and how Parliament, the President, the Government, the courts and the regions work.",
  whyItMatters:
    "The Cambridge papers asked which body enacted the Constitution, which Italian institution is chosen by direct universal suffrage, and what perfect bicameralism means. A test set by the Italian ministry is likely to keep returning to Italy's own institutions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-pes-italian-constitution",
      name: "The birth of the Italian Constitution and its key articles",
      intuition:
        "After fascism and the war, Italians voted on the same day to abolish the monarchy and to elect an assembly that would write a new constitution. The result is a rigid constitution: ordinary laws cannot change it, and its republican form can never be changed at all. A handful of articles state its core values.",
      definition:
        "- **2 June 1946**: an **institutional referendum** chose the **republic** over the monarchy, and the **Constituent Assembly** (556 members) was elected. It was the first national vote for Italian women. 2 June is Republic Day.\n" +
        "- The Constituent Assembly **approved** the Constitution on **22 December 1947**; it was promulgated on 27 December by the provisional head of state Enrico De Nicola, and came **into force on 1 January 1948**.\n" +
        "- It has **139 articles** plus transitional provisions. It is **rigid**: amendments need a special procedure (article 138).",
      table: {
        columns: ["Date or article", "What", "Detail"],
        rows: [
          { cells: ["2 June 1946", "Institutional referendum and election of the Constituent Assembly", "Republic chosen; women vote nationally for the first time"] },
          { cells: ["22 December 1947", "Constitution approved", "By the Constituent Assembly"] },
          { cells: ["1 January 1948", "Constitution enters into force", "139 articles"] },
          { cells: ["Article 1", "Founding principle", "Italy is a democratic republic founded on labour; sovereignty belongs to the people"] },
          { cells: ["Article 3", "Equality", "All citizens are equal before the law, without distinction of sex, race, language, religion, political opinion or personal and social condition"] },
          { cells: ["Article 11", "Peace", "Italy repudiates war as a means of offence and of settling international disputes"] },
          { cells: ["Article 32", "Health", "Health is a fundamental right of the individual and an interest of society; free care for the poor"] },
          { cells: ["Article 139", "Limit on amendment", "The republican form of the state cannot be changed by constitutional revision"] },
        ],
      },
      selfCheckExample: {
        prompt: "On what date did the Constitution of the Italian Republic come into force?",
        options: ["2 June 1946", "25 April 1945", "22 December 1947", "1 January 1948", "17 March 1861"],
        steps: [
          "The Constitution entered into force on 1 January 1948.",
          "2 June 1946 is the referendum, 22 December 1947 the approval by the Constituent Assembly, 25 April 1945 Liberation Day and 17 March 1861 the proclamation of the Kingdom of Italy.",
        ],
        answer: "(D) 1 January 1948",
      },
      practiceSet: [
        { prompt: "Which article of the Constitution protects health as a fundamental right?", answer: "Article 32" },
        { prompt: "On what is the Italian Republic \"founded\", according to Article 1?", answer: "On labour (work)" },
        { prompt: "What did Italians choose in the referendum of 2 June 1946?", answer: "A republic instead of the monarchy" },
      ],
      traps: [
        {
          title: "Approved in 1947, in force in 1948",
          body: "The Constitution was approved by the Constituent Assembly on 22 December 1947 but took effect only on 1 January 1948. The Government, the ministries and the courts played no part in enacting it; the Constituent Assembly did.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-italian-institutions",
      name: "Parliament, President of the Republic and Government of Italy",
      intuition:
        "Italian citizens elect only Parliament directly. Everything else flows from it: Parliament elects the President of the Republic, the President appoints the Prime Minister, and the Government survives only while both chambers support it. That chain is why Italy is a parliamentary republic.",
      definition:
        "- **Parliament**: the **Chamber of Deputies** (400 members) and the **Senate of the Republic** (200 elected members, plus a few **senators for life**). Both are **directly elected** for **5 years**, and both have the same powers (perfect bicameralism).\n" +
        "- The **President of the Republic** is elected by **Parliament in joint session**, joined by 58 regional delegates, for **7 years**; candidates must be at least **50**.\n" +
        "- The **President of the Council of Ministers** (Prime Minister) is appointed by the President of the Republic and must win a **confidence vote in both chambers** within ten days.\n" +
        "- The seat numbers were cut from 630 and 315 by a 2020 constitutional reform, applied from the 2022 election.",
      table: {
        columns: ["Institution", "How chosen", "Term", "Main role"],
        rows: [
          { cells: ["Chamber of Deputies", "Direct universal suffrage, voters aged 18 and over", "5 years", "Makes laws; gives or withdraws confidence"] },
          { cells: ["Senate of the Republic", "Direct universal suffrage on a regional basis, voters aged 18 and over (since 2021)", "5 years", "Same powers as the Chamber"] },
          { cells: ["President of the Republic", "Elected by Parliament in joint session plus regional delegates", "7 years", "Head of State; appoints the Prime Minister; promulgates laws; can dissolve the chambers; chairs the High Council of the Judiciary"] },
          { cells: ["President of the Council of Ministers", "Appointed by the President of the Republic; needs the confidence of both chambers", "No fixed term", "Head of Government; directs the Council of Ministers"] },
          { cells: ["Constitutional Court", "15 judges: a third each from the President, Parliament and the highest courts", "9 years", "Judges whether laws respect the Constitution"] },
          { cells: ["High Council of the Judiciary (CSM)", "Two thirds elected by judges, one third by Parliament; chaired by the President of the Republic", "4 years", "Self-government of judges: appointments, transfers, discipline"] },
        ],
      },
      selfCheckExample: {
        prompt: "For how long is the President of the Italian Republic elected?",
        options: ["5 years", "7 years", "4 years", "9 years", "6 years"],
        steps: [
          "The President of the Republic serves a seven-year term, longer than Parliament's five, so no single Parliament fully controls the presidency.",
          "5 years is Parliament's term, 9 years a Constitutional Court judge's, 4 years the CSM's.",
        ],
        answer: "(B) 7 years",
      },
      practiceSet: [
        { prompt: "How many deputies sit in the Chamber of Deputies since 2022?", answer: "400" },
        { prompt: "Who elects the President of the Italian Republic?", answer: "Parliament in joint session, plus delegates from the regions" },
        { prompt: "What is the minimum age to be President of the Italian Republic?", answer: "50" },
      ],
      traps: [
        {
          title: "Italians do not directly elect the President or the Prime Minister",
          body: "The only national bodies chosen by direct universal suffrage are the two chambers of Parliament. The President of the Republic is elected by Parliament; the Prime Minister and Government are appointed by the President and need Parliament's confidence. The CSM is chosen by judges and Parliament.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-italian-state-structure",
      name: "Regions, referendums and the National Health Service",
      intuition:
        "Italy is a unitary state, but much of daily government, including health care, is run by its regions. The national health service guarantees care to everyone, paid for by taxes, while the regions organise hospitals and local health authorities. Citizens can also repeal laws directly by referendum.",
      definition:
        "- **20 regions**, of which **5** have a **special statute** with extra autonomy: Sicily, Sardinia, Valle d'Aosta, Trentino-Alto Adige/Südtirol and Friuli Venezia Giulia.\n" +
        "- The 2001 reform of **Title V** of the Constitution gave regions more legislative power, including over the organisation of health care.\n" +
        "- The **Servizio Sanitario Nazionale (SSN)**, founded in **1978**, is universal and financed by general taxation.\n" +
        "- An **abrogative referendum** (article 75) can repeal a law; it is valid only if more than half of those entitled to vote take part.",
      table: {
        columns: ["Body or tool", "Number or date", "Fact to remember"],
        rows: [
          { cells: ["Regions", "20 (5 with special statute)", "Ordinary regions were set up in 1970"] },
          { cells: ["Autonomous provinces", "2", "Trento and Bolzano"] },
          { cells: ["Municipalities (comuni)", "About 7,900", "Led by an elected mayor (sindaco) and council"] },
          { cells: ["National Health Service (SSN)", "1978 (Law 833)", "Universal coverage, run regionally through local health authorities (ASL)"] },
          { cells: ["Abrogative referendum", "Article 75", "Repeals a law; needs a turnout above 50% of eligible voters"] },
          { cells: ["Constitutional referendum", "Article 138", "Can confirm a constitutional amendment; no turnout requirement"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many Italian regions have a special statute of autonomy?",
        options: ["5", "2", "15", "20", "3"],
        steps: [
          "Five regions have special statutes: Sicily, Sardinia, Valle d'Aosta, Trentino-Alto Adige/Südtirol and Friuli Venezia Giulia.",
          "20 is the total number of regions and 15 the ordinary ones; 2 is the number of autonomous provinces (Trento and Bolzano).",
        ],
        answer: "(A) 5",
      },
      practiceSet: [
        { prompt: "In which year was Italy's National Health Service founded?", answer: "1978" },
        { prompt: "Name the two autonomous provinces of Italy.", answer: "Trento and Bolzano" },
        { prompt: "What kind of referendum can repeal an existing Italian law?", answer: "An abrogative referendum (article 75)" },
      ],
      traps: [
        {
          title: "Regions run health care, but the SSN is national",
          body: "The SSN guarantees the same essential levels of care everywhere and is set up by national law, but the regions organise and manage hospitals and local health authorities. So both statements \"health care is national\" and \"health care is regional\" are half true.",
        },
      ],
    },
  ],
};
