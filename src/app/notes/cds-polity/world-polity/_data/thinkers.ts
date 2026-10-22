import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_WO_THINKERS_NOTE: SubtopicNote = {
  subtopicName: "Political Thinkers",
  title: "Political Thinkers",
  oneLineDefinition:
    "Who said what: the Western thinkers behind consent, law and the managerial class, the Indian thinkers behind Chaukhamba Raj and Sapta Kranti, and the famous lines on freedom and dignity.",
  whyItMatters:
    "Nine CDS questions, seven MODERATE and two HARD. Each one gives an idea or a book and asks for its author, with three other thinkers of the same school as the wrong options, so learn each name with its one idea. Ram Manohar Lohia is the answer twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolwo-western",
      name: "Western thinkers and their ideas",
      intuition:
        "CDS names a book or a one-line idea and puts four thinkers of the same family in the options. The fix is to tie each name to one idea only: Locke to consent, Austin to law as command, Burnham to managers, Fukuyama to the end of history.",
      definition:
        "Learn them in pairs of name and idea:\n" +
        "- **John Locke**, Two Treatises of Government (1689): legitimate government rests on the **consent of the governed**.\n" +
        "- **Jean-Jacques Rousseau**, The Social Contract (1762): the **general will**.\n" +
        "- **Jeremy Bentham**: utilitarianism, **the greatest happiness of the greatest number**.\n" +
        "- **John Austin**, The Province of Jurisprudence Determined (1832): **legal positivism**. Law is the **command of a sovereign**, backed by punishment, and is kept apart from morality.\n" +
        "- **Elite theorists**: **Gaetano Mosca** and **Vilfredo Pareto** (a ruling minority always governs) and **Robert Michels** (the **iron law of oligarchy**, in Political Parties, 1911).\n" +
        "- **James Burnham**, The Managerial Revolution (1941): a **managerial class** rules both capitalist and communist industrial societies through its technical and administrative skill.\n" +
        "- **Francis Fukuyama**, The End of History and the Last Man (essay 1989, book 1992): after the Cold War, **liberal democracy** is the end point of the contest of ideologies.",
      table: {
        columns: ["Thinker", "Work", "Idea"],
        rows: [
          {
            cells: ["John Locke", "Two Treatises of Government (1689)", "Government by consent"],
            noteAmber: "CDS 2021 (I): 'Government by Consent' was Locke's, with Mill, Bentham and Rousseau as the other options.",
            pyqExampleId: "8649ea24-bc21-4413-b531-3fed0a6a1970",
          },
          { cells: ["Jean-Jacques Rousseau", "The Social Contract (1762)", "The general will"] },
          { cells: ["Jeremy Bentham", "Utilitarian writings", "Greatest happiness of the greatest number"] },
          {
            cells: ["John Austin", "The Province of Jurisprudence Determined (1832)", "Legal positivism: law is the sovereign's command"],
            pyqExampleId: "f4957677-e23e-43b7-872e-3bc054b939ec",
          },
          { cells: ["Robert Michels", "Political Parties (1911)", "Iron law of oligarchy"] },
          {
            cells: ["James Burnham", "The Managerial Revolution (1941)", "A managerial class rules capitalist and communist societies alike"],
            noteAmber: "CDS 2019 (II): the other options were the elite theorists Michels, Mosca and Pareto.",
            pyqExampleId: "6790ef9d-e02f-4aca-be54-44a4f262e1e8",
          },
          { cells: ["Francis Fukuyama", "The End of History and the Last Man (1992)", "Liberal democracy is the end point of ideological history"] },
        ],
      },
      pyqExampleId: "7cce83c6-6d79-4426-8988-1f448863f496",
      selfCheckExample: {
        prompt: "Which thinker defined law as the command of a sovereign backed by punishment, and what school of legal thought grew from this?",
        steps: [
          "The command theory belongs to John Austin.",
          "Separating law as it is from law as it ought to be is the mark of positivism.",
        ],
        answer: "John Austin; legal positivism.",
      },
      practiceSet: [
        { prompt: "Who described democracy as government by consent?", answer: "John Locke" },
        { prompt: "Whose idea is the iron law of oligarchy?", answer: "Robert Michels" },
        { prompt: "Who wrote The Managerial Revolution?", answer: "James Burnham" },
        { prompt: "Which idea is Rousseau known for?", answer: "The general will" },
      ],
      traps: [
        {
          title: "Michels, Mosca and Pareto did not write The Managerial Revolution",
          body: "They are the elite theorists: a ruling minority always governs, and Michels added the iron law of oligarchy. The managerial class is **James Burnham's** idea.",
        },
        {
          title: "Consent is Locke, the general will is Rousseau",
          body: "Both wrote about the social contract, which is why they are set side by side. Government by consent is **Locke's** phrase; Rousseau's is the general will, and Bentham's is the greatest happiness principle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-indian",
      name: "Indian thinkers: Lohia, JP, Ambedkar",
      intuition:
        "The Indian socialists gave their ideas Hindi names, and CDS asks the names. Two of them used the word Kranti (revolution), so keep the numbers apart: Lohia's seven, JP's total.",
      definition:
        "The names to know:\n" +
        "- **Ram Manohar Lohia**, **Chaukhamba Raj** (the **four-pillar State**): power shared among the **village, district, province and centre**, with an end to rule through the district magistrate.\n" +
        "- **Ram Manohar Lohia**, **Sapta Kranti** (seven revolutions) to be fought together: for equality of **men and women**; against inequality of **colour**; against **caste**; against **foreign rule**; for **economic equality**; against intrusion into **private life**; and against **weapons**, for civil disobedience (satyagraha).\n" +
        "- **Jayaprakash Narayan**, **Sampoorna Kranti** (**total revolution**), his call of 1974.\n" +
        "- **B. R. Ambedkar**, Annihilation of Caste (1936): caste is **graded inequality**, an ascending scale of reverence and a descending scale of contempt, which a just and compassionate society must dissolve.\n" +
        "- **Vinoba Bhave**: the **Bhoodan** (land gift) movement, begun in 1951.\n" +
        "- The **42nd Amendment (1976)** added the words **socialist** and secular to the Preamble.",
      table: {
        columns: ["Thinker", "Idea", "What it means"],
        rows: [
          { cells: ["Ram Manohar Lohia", "Chaukhamba Raj", "Four pillars of power: village, district, province, centre"] },
          {
            cells: ["Ram Manohar Lohia", "Sapta Kranti", "Seven revolutions fought together against inequality"],
            noteAmber: "CDS 2020 (II): Jayaprakash Narayan was the trap option; his slogan was Sampoorna Kranti.",
            pyqExampleId: "d3cc4174-ecc0-41d9-b46c-370e06429306",
          },
          { cells: ["Jayaprakash Narayan", "Sampoorna Kranti (1974)", "Total revolution"] },
          {
            cells: ["B. R. Ambedkar", "Graded inequality", "Caste ranks people by reverence upward and contempt downward"],
            pyqExampleId: "a0c4abb5-e3ec-4b04-a17e-37f1642559e6",
          },
          { cells: ["Vinoba Bhave", "Bhoodan (1951)", "Landowners give land to the landless"] },
        ],
      },
      pyqExampleId: "db8a110b-284a-4308-a0c5-147e66623882",
      selfCheckExample: {
        prompt: "Jayaprakash Narayan and Ram Manohar Lohia both named a revolution. Which name belongs to which leader?",
        steps: [
          "Lohia counted his revolutions: Sapta means seven.",
          "JP called for one complete change in 1974: Sampoorna means total.",
        ],
        answer: "Lohia: Sapta Kranti (seven revolutions). JP: Sampoorna Kranti (total revolution).",
      },
      practiceSet: [
        { prompt: "Who wrote Annihilation of Caste?", answer: "B. R. Ambedkar" },
        { prompt: "Which movement did Vinoba Bhave begin in 1951?", answer: "Bhoodan, the land gift movement" },
        { prompt: "What did Ambedkar call a caste order in which each group looks up to those above and down on those below?", answer: "Graded inequality" },
        { prompt: "Which amendment added the word socialist to the Preamble?", answer: "The 42nd Amendment (1976)" },
      ],
      traps: [
        {
          title: "Sapta is Lohia, Sampoorna is JP",
          body: "Both were socialists, and CDS puts them side by side. **Sapta Kranti** (seven revolutions) is Lohia's; **Sampoorna Kranti** (total revolution) is Jayaprakash Narayan's.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-freedom",
      name: "Lines on freedom and dignity",
      intuition:
        "Some questions quote a famous line and ask who wrote it. Each line has a fingerprint: dignity is Kant, ruling ourselves is Gandhi, freedom from fear is Suu Kyi. Liberty also has two classic definitions, Mill's and Berlin's.",
      definition:
        "The lines and their authors:\n" +
        "- **Immanuel Kant**: human beings have **dignity**, not a price, so a person must be treated as an end and never only as a means.\n" +
        "- **Mahatma Gandhi**, Hind Swaraj (1909): **it is swaraj when we learn to rule ourselves**.\n" +
        "- **Subhas Chandra Bose**: freedom means not only release from political bondage but also **equal distribution of wealth**.\n" +
        "- **Aung San Suu Kyi**, Freedom from Fear (1991): **real freedom is freedom from fear**.\n" +
        "- **J. S. Mill**, On Liberty (1859): the **harm principle**. The State may limit a person's freedom only to prevent harm to others.\n" +
        "- **Isaiah Berlin**, Two Concepts of Liberty (1958): **negative liberty** (freedom from interference) and **positive liberty** (freedom to be one's own master).",
      table: {
        columns: ["Thinker", "Line or idea"],
        rows: [
          { cells: ["Immanuel Kant", "Human beings, unlike things, possess dignity"] },
          { cells: ["Mahatma Gandhi", "It is swaraj when we learn to rule ourselves (Hind Swaraj, 1909)"] },
          { cells: ["Subhas Chandra Bose", "Freedom includes equal distribution of wealth"] },
          { cells: ["Aung San Suu Kyi", "Real freedom is freedom from fear"] },
          { cells: ["J. S. Mill", "Harm principle (On Liberty, 1859)"] },
          { cells: ["Isaiah Berlin", "Negative and positive liberty (1958)"] },
        ],
      },
      pyqExampleId: "22ccb05c-b666-4239-9ea5-46f094ceb5d6",
      selfCheckExample: {
        prompt: "A law bans smoking in buses because the smoke harms other passengers, but it does not ban smoking at home alone. Which thinker's principle justifies exactly this line?",
        steps: [
          "Freedom is limited only where the act harms others.",
          "Smoking alone at home harms only the smoker, so it is left free.",
        ],
        answer: "J. S. Mill's harm principle (On Liberty, 1859).",
      },
      practiceSet: [
        { prompt: "Which thinker split liberty into negative and positive liberty?", answer: "Isaiah Berlin" },
        { prompt: "What is negative liberty?", answer: "Freedom from interference by others" },
        { prompt: "In which year did Mill publish On Liberty?", answer: "1859" },
      ],
      traps: [
        {
          title: "Freedom from fear is Suu Kyi, not Bose",
          body: "Bose tied freedom to the equal sharing of wealth. 'Real freedom is freedom from fear' is **Aung San Suu Kyi's** line, the title of her 1991 book.",
        },
      ],
    },
  ],
};
