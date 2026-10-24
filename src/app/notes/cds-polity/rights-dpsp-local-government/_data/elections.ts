import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FR_ELECTIONS_NOTE: SubtopicNote = {
  subtopicName: "Elections and Electoral Systems",
  title: "Elections and Electoral Systems",
  oneLineDefinition:
    "Who runs elections and keeps the voter lists, how parties are recognised, how constituencies are redrawn, and the two ways of turning votes into seats.",
  whyItMatters:
    "13 CDS questions: 8 MODERATE, 4 HARD and 1 EASY. Several are dates and names that only a list can give you: the year of the first Delimitation Commission, the year photo identity cards began, what VVPAT stands for. Learn them as facts; there is nothing to work out.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolfr-commission",
      name: "The Election Commission, voters and electoral rolls",
      intuition:
        "One body, the Election Commission of India, runs the elections to Parliament, the State legislatures and the offices of President and Vice-President. It also keeps the list of voters. Every adult citizen has one vote and one place on that list.",
      definition:
        "The Articles and tools:\n" +
        "- **Article 324**: superintendence, direction and control of the **preparation of electoral rolls** and the **conduct of elections** rest with the **Election Commission**.\n" +
        "- **Article 325**: **one general electoral roll** for every territorial constituency; nobody is left off it on grounds only of religion, race, caste or sex.\n" +
        "- **Article 326**: elections on **adult suffrage**: every citizen aged **18** or more may vote unless disqualified by law. The age came down from 21 by the **61st Amendment (1988)**.\n" +
        "- **Article 329**: an election can be questioned **only by an election petition**.\n" +
        "- The **Model Code of Conduct** comes into force as soon as the election schedule is **announced**. The **cVIGIL** app lets a citizen report a violation with a photo or video.\n" +
        "- **EPIC** (Electors Photo Identity Cards) began in **1993**, under Chief Election Commissioner **T. N. Seshan**.\n" +
        "- **VVPAT** is the **Voter Verifiable Paper Audit Trail**, the printer beside the voting machine that shows the voter a paper slip.\n" +
        "- An **overseas elector** must be a citizen of India with no other citizenship, be enrolled at the address in the passport, and **vote in person** at that polling station.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Article 324", "Election Commission controls electoral rolls and the conduct of elections"] },
          { cells: ["Article 325", "One general electoral roll per constituency, no exclusion by religion, race, caste or sex"] },
          { cells: ["Article 326", "Adult suffrage at 18"] },
          { cells: ["Article 329", "An election can be challenged only by an election petition"] },
          {
            cells: ["cVIGIL", "App to report breaches of the Model Code of Conduct"],
            pyqExampleId: "b703eb05-6094-48dc-ba58-48d8793338d2",
          },
          {
            cells: ["EPIC", "Photo identity cards for voters, from 1993"],
            pyqExampleId: "f9f587f8-e773-4cf8-9a86-c0a93f16e544",
          },
          {
            cells: ["VVPAT", "Voter Verifiable Paper Audit Trail"],
            pyqExampleId: "bc9ffe43-95fd-43aa-9335-3de0129e8a81",
          },
          {
            cells: ["Overseas elector", "Indian citizen, on the roll at the passport address, votes in person"],
            pyqExampleId: "a2435fa8-c2e6-4c37-9a29-5547e646f11b",
          },
        ],
      },
      pyqExampleId: "6fcc923b-b62f-4bfa-a3f2-240d13cd00d5",
      selfCheckExample: {
        prompt: "An Indian citizen working in Dubai, with no other citizenship, is enrolled as an overseas elector. Can she vote in the Lok Sabha election by post from Dubai?",
        steps: [
          "An overseas elector is enrolled at the address in her passport.",
          "Postal or proxy voting has not been extended to overseas electors, so she must vote in person.",
        ],
        answer: "No. She must come to her polling station and vote in person.",
      },
      practiceSet: [
        { prompt: "Which Election Commission app lets a citizen report a breach of the Model Code of Conduct?", answer: "cVIGIL" },
        { prompt: "In which year did the Election Commission start issuing Electors Photo Identity Cards?", answer: "1993" },
        { prompt: "Which Article gives the Election Commission control over the conduct of elections?", answer: "Article 324" },
        { prompt: "How can the result of a Lok Sabha election be challenged?", answer: "Only by an election petition (Article 329)" },
        { prompt: "When does the Model Code of Conduct come into force?", answer: "As soon as the election schedule is announced" },
      ],
      traps: [
        {
          title: "The Model Code starts at the announcement",
          body: "The Model Code of Conduct applies from the day the election schedule is announced, not from nomination day or polling day.",
        },
        {
          title: "Overseas voters must be present",
          body: "An overseas elector must be a citizen, be on the roll and vote in person. There is no postal vote for overseas electors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-parties",
      name: "Recognition of political parties",
      intuition:
        "The Election Commission sorts parties into three kinds under its Symbols Order. A national party must show strength across several States; one of the ways is to be a recognised State party in four of them.",
      definition:
        "The rules:\n" +
        "- The Commission recognises parties under the **Election Symbols (Reservation and Allotment) Order, 1968**.\n" +
        "- Three categories only: **national parties**, **State parties** and **registered unrecognised parties**.\n" +
        "- 'Regional party' is a newspaper word, **not** an Election Commission category.\n" +
        "- A party is a **national party** if it meets any one of three tests: recognised as a State party in **at least four States**; or **6%** of valid votes in four or more States plus **four Lok Sabha seats**; or **2%** of Lok Sabha seats from at least **three States**.",
      table: {
        columns: ["Category", "How a party gets there"],
        rows: [
          { cells: ["National party", "State party in 4 States, or 6% votes in 4 States and 4 Lok Sabha seats, or 2% of Lok Sabha seats from 3 States"] },
          { cells: ["State party", "Meets the vote or seat test in one State"] },
          { cells: ["Registered unrecognised party", "Registered with the Commission but not yet recognised"] },
          {
            cells: ["Regional party", "Not a category at all"],
            noteAmber: "CDS 2020 (II): 'Regional Parties' was the item that is not a classified category.",
            pyqExampleId: "f07b5089-3e78-4b8a-8724-51ecf216988e",
          },
        ],
      },
      pyqExampleId: "833513ba-99b4-4a70-ba53-bc8d7b91ffa1",
      selfCheckExample: {
        prompt: "In a Lok Sabha election a party polls 6% of the valid votes in each of four States and wins four Lok Sabha seats. Does it qualify as a national party?",
        steps: [
          "One of the three tests is 6% of valid votes in four or more States plus four Lok Sabha seats.",
          "The party meets both parts of that test.",
        ],
        answer: "Yes, on the vote-and-seat test.",
      },
      practiceSet: [
        { prompt: "Under which Order does the Election Commission recognise parties and allot symbols?", answer: "The Election Symbols (Reservation and Allotment) Order, 1968" },
        { prompt: "Name the three categories of party the Election Commission uses.", answer: "National, State, and registered unrecognised" },
        { prompt: "Is 'regional party' an Election Commission category?", answer: "No" },
      ],
      traps: [
        {
          title: "Regional is not a legal status",
          body: "The Commission's categories are national, State and registered unrecognised. A 'regional party' has no status under the Symbols Order.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-delimitation",
      name: "Delimitation of constituencies",
      intuition:
        "Delimitation redraws the boundaries of constituencies so that each holds a fair share of people. Parliament makes the law, and a Delimitation Commission does the drawing after a census.",
      definition:
        "The facts:\n" +
        "- Parliament passes a **Delimitation Act**; the Election Commission does **not** make the law.\n" +
        "- Delimitation Commissions were set up in **1952, 1963, 1973 and 2002**. The 2002 Commission used the **2001 census**.\n" +
        "- **Assam, 2023**: the Election Commission redrew the State's constituencies on the **2001 census**. Assembly seats reserved for **Scheduled Tribes went up from 16 to 19**.",
      table: {
        columns: ["Exercise", "Year", "Note"],
        rows: [
          { cells: ["First Delimitation Commission", "1952", "Under the Delimitation Commission Act of 1952"] },
          { cells: ["Second", "1963", "After the 1961 census"] },
          { cells: ["Third", "1973", "After the 1971 census"] },
          { cells: ["Fourth", "2002", "Based on the 2001 census"] },
          {
            cells: ["Assam", "2023", "On the 2001 census; ST Assembly seats raised from 16 to 19"],
            noteAmber: "CDS 2026 (II): the ST seats did go up, so only the 2001 census statement was correct.",
            pyqExampleId: "516c803f-1a62-4cd7-9b0e-e1532eed4dcf",
          },
        ],
      },
      pyqExampleId: "21d3f64f-14b8-4b44-80d6-0e0ca8b27794",
      selfCheckExample: {
        prompt: "True or false: the laws on delimitation of constituencies are made by the Election Commission of India.",
        steps: [
          "Parliament passes a Delimitation Act.",
          "A Delimitation Commission set up under that Act draws the boundaries.",
        ],
        answer: "False. Parliament makes the law.",
      },
      practiceSet: [
        { prompt: "On which census was the 2023 delimitation in Assam based?", answer: "The 2001 census" },
        { prompt: "In which year was the fourth Delimitation Commission set up?", answer: "2002" },
        { prompt: "How many Assembly seats were reserved for Scheduled Tribes in Assam after the 2023 delimitation?", answer: "19 (up from 16)" },
      ],
      traps: [
        {
          title: "The Election Commission does not make delimitation law",
          body: "Delimitation follows an Act of Parliament. In CDS 2016 (II) the claim that the Election Commission makes these laws was the statement that is not correct.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-systems",
      name: "First past the post and proportional representation",
      intuition:
        "There are two broad ways to turn votes into seats. In first past the post, each area elects one person and whoever polls the most votes wins. In proportional representation, a party's share of seats follows its share of votes.",
      definition:
        "The two systems:\n" +
        "- **First past the post (FPTP)**: the country is cut into small constituencies, each elects **one** member, and the candidate with the **most votes** wins. A party can win more seats than its share of votes.\n" +
        "- **Proportional representation (PR)**: a large area may elect several members, and seats are shared in proportion to votes. Israel and the Netherlands use a party-list form.\n" +
        "- In India, FPTP elects the **Lok Sabha** and the **State Legislative Assemblies**.\n" +
        "- PR by the **single transferable vote** elects the **President** (Article 55), the Vice-President, the **Rajya Sabha** and the Legislative Councils.",
      table: {
        columns: ["Point", "First past the post", "Proportional representation"],
        rows: [
          { cells: ["Members per constituency", "One", "Can be more than one"] },
          { cells: ["Seats and votes", "A party may win more or fewer seats than its vote share", "Seats follow the vote share"] },
          { cells: ["Voter chooses", "A candidate", "Often a party list"] },
          {
            cells: ["Used in India for", "Lok Sabha, State Assemblies", "President, Vice-President, Rajya Sabha, Legislative Councils"],
            noteAmber: "CDS 2022 (II): the President is elected by proportional representation by means of the single transferable vote.",
            pyqExampleId: "a1666268-6840-4114-a368-80259a056dbf",
          },
        ],
      },
      pyqExampleId: "98a7f7bf-aeca-4d29-aaf7-e8b854255be7",
      selfCheckExample: {
        prompt: "A party wins 40% of the votes across a country. About what share of seats should it get under pure proportional representation, and can it get more under first past the post?",
        steps: [
          "Under PR, seats follow votes, so about 40%.",
          "Under FPTP, seats are won one constituency at a time, so the seat share can be well above or below the vote share.",
        ],
        answer: "About 40% under PR; under FPTP it can win more (or fewer).",
      },
      practiceSet: [
        { prompt: "Which electoral system elects the Lok Sabha?", answer: "First past the post" },
        { prompt: "How are members of the Rajya Sabha elected?", answer: "By the elected members of the State Assemblies, by proportional representation through the single transferable vote" },
        { prompt: "Which Article lays down how the President is elected?", answer: "Article 55" },
        { prompt: "Name one country that elects its legislature by a national party-list system.", answer: "Israel (or the Netherlands)" },
      ],
      traps: [
        {
          title: "The President is not elected by first past the post",
          body: "The President is chosen by an electoral college through proportional representation by the single transferable vote, under Article 55.",
        },
        {
          title: "India uses both systems",
          body: "FPTP elects the Lok Sabha and the Assemblies; PR by single transferable vote elects the President, Vice-President, Rajya Sabha and Legislative Councils.",
        },
      ],
    },
  ],
};
