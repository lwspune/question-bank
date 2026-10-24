import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_WO_REVOLUTIONS_NOTE: SubtopicNote = {
  subtopicName: "Classical World to the Age of Revolutions",
  title: "Classical World to the Age of Revolutions",
  oneLineDefinition:
    "The Greek, Roman and Arab scholars behind words we still use, the first Europeans to trade in Africa, and the thinkers, dates and laws of the age of revolutions.",
  whyItMatters:
    "Seven CDS questions from 2017 to 2020. Each one asks a single name, word or date, and the wrong options are real people and real years from the same story, so the tables below teach the distractors too.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshiwo-classical",
      name: "Greek, Roman and Arab learning",
      intuition:
        "Many words in everyday use began as the name of a scholar or a Greek word. CDS asks you to trace a word back: who first said geography, whose name gave us algorithm, what barbarian first meant.",
      definition:
        "Words and the scholars behind them:\n" +
        "- **Barbarian** comes from the Greek **barbaros**: anyone who did not speak Greek. The **Romans** later used it for the peoples on their frontiers: the **Germanic tribes**, the **Gauls** and the **Huns**.\n" +
        "- **Eratosthenes** (3rd century BCE) coined the word **geography** and measured the circumference of the earth.\n" +
        "- **Al-Khwarizmi** (9th century, Baghdad) gave his name to the **algorithm** (from the Latin form Algoritmi). His book on al-jabr gave us **algebra**.\n" +
        "- The other great scholars of the Islamic world: **Ibn Sina** (Avicenna, medicine), **Ibn Rushd** (Averroes, commentaries on Aristotle), **Ibn al-Haytham** (Alhazen, optics).",
      table: {
        columns: ["Name or word", "What to remember"],
        rows: [
          {
            cells: ["Barbarian", "Greek barbaros, a non-Greek; Romans used it for Germans, Gauls and Huns"],
            noteAmber: "CDS 2018 (I): both statements, the Greek origin and the Roman use, are correct.",
            pyqExampleId: "efabc244-edc6-4dec-959c-38e9d84cbd07",
          },
          {
            cells: ["Eratosthenes", "Coined the word geography; measured the earth's circumference"],
            noteAmber: "CDS 2019 (II): the Greek who coined geography in the 3rd century BCE.",
            pyqExampleId: "c18ddbad-9d13-438a-abac-53b62fa4cca4",
          },
          { cells: ["Euclid", "Geometry (the Elements)"] },
          { cells: ["Clio", "The Greek muse of history, not a philosopher"] },
          {
            cells: ["Al-Khwarizmi", "Algorithm (from his name) and algebra (from his book)"],
            noteAmber: "CDS 2019 (I): the scholar who gave the algorithm its name.",
            pyqExampleId: "f5de30ac-5f73-436e-8717-f93b7e1d6d48",
          },
          { cells: ["Ibn al-Haytham", "Optics: how light and vision work"] },
          { cells: ["Ibn Sina", "Medicine: the Canon of Medicine"] },
          { cells: ["Ibn Rushd", "Philosophy: commentaries on Aristotle"] },
        ],
      },
      pyqExampleId: "c18ddbad-9d13-438a-abac-53b62fa4cca4",
      practiceSet: [
        { prompt: "To a Greek, who was a barbaros?", answer: "Anyone who did not speak Greek" },
        { prompt: "Which branch of mathematics takes its name from a book by al-Khwarizmi?", answer: "Algebra" },
        { prompt: "Which scholar of the Islamic world is known for his work on optics?", answer: "Ibn al-Haytham" },
        { prompt: "Clio was the Greek muse of which subject?", answer: "History" },
      ],
      traps: [
        {
          title: "Clio is a muse, not a scholar",
          body: "An option list of Greek thinkers may slip in **Clio**. She is the muse of history from Greek myth, so she never coined or wrote anything.",
        },
        {
          title: "Algorithm and algebra both come from al-Khwarizmi",
          body: "**Algorithm** comes from his name and **algebra** from the title of his book. Ibn Sina, Ibn Rushd and Ibn al-Haytham are real scholars of the same age, but of medicine, philosophy and optics.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshiwo-exploration",
      name: "The first Europeans on the African coast",
      intuition:
        "In the fifteenth century the Portuguese sailed down the west coast of Africa, looking for gold and a sea route to India. Their trading posts came first; the other European powers followed, and the full colonisation of Africa came four centuries later.",
      definition:
        "The order of arrival:\n" +
        "- **Portugal** first: trading posts on the West African coast in the 15th century. **Bartolomeu Dias** rounded the Cape of Good Hope in **1488**, and **Vasco da Gama** reached Calicut in **1498**.\n" +
        "- The **Dutch** came later and founded Cape Town in **1652**.\n" +
        "- The **scramble for Africa**, when European powers divided almost the whole continent, came in the late 19th century (the Berlin Conference of 1884-85).",
      table: {
        columns: ["Event", "When"],
        rows: [
          {
            cells: ["Portuguese trading posts on the West African coast", "15th century"],
            noteAmber: "CDS 2020 (I): the Portuguese were the first Europeans to arrive in Africa as traders.",
            pyqExampleId: "658be060-64a0-44ab-b4bc-b658e810e835",
          },
          { cells: ["Bartolomeu Dias rounds the Cape of Good Hope", "1488"] },
          { cells: ["Vasco da Gama reaches Calicut", "1498"] },
          { cells: ["The Dutch found Cape Town", "1652"] },
          { cells: ["Berlin Conference divides Africa", "1884 to 1885"] },
        ],
      },
      pyqExampleId: "658be060-64a0-44ab-b4bc-b658e810e835",
      practiceSet: [
        { prompt: "Who first sailed round the Cape of Good Hope, in 1488?", answer: "Bartolomeu Dias" },
        { prompt: "Which European people founded Cape Town in 1652?", answer: "The Dutch" },
        { prompt: "In which century did the European scramble for Africa take place?", answer: "The late 19th century" },
      ],
      traps: [
        {
          title: "Portugal came first, not the Dutch",
          body: "The Dutch at the Cape (1652) are the best-known early settlers, so they pull wrong answers. The **Portuguese** had been trading on the African coast for almost two hundred years by then.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshiwo-revolutions",
      name: "Thinkers, dates and laws of the revolutions",
      intuition:
        "The age of revolutions rested on a few books, a handful of dates and, in America, a fight over slavery. CDS pairs a book with its author, a year with an event, or a law with what it changed.",
      definition:
        "Books behind the revolutions:\n" +
        "- **Rousseau**, The Social Contract (1762). **Hobbes** (Leviathan) and **Locke** (Two Treatises of Government) also argued from a social contract, but neither book has that title. **Montesquieu**, The Spirit of the Laws (1748), separated the powers of government.\n\n" +
        "The French Revolution in five dates:\n" +
        "- **1789**: the Estates General meets, the **Tennis Court Oath** (June), the fall of the Bastille (14 July).\n" +
        "- **1791**: a constitution makes France a constitutional monarchy.\n" +
        "- **1792**: the **National Convention** meets and abolishes the monarchy; France becomes a republic.\n" +
        "- **1793**: Louis XVI is executed.\n" +
        "- **1804**: Napoleon becomes emperor and the **Napoleonic Code** (Civil Code) comes in.\n\n" +
        "Slavery in the United States:\n" +
        "- The **Missouri Compromise** (1820) banned slavery north of a fixed line.\n" +
        "- The **Kansas-Nebraska Act** (1854) **repealed** it and let the settlers of each territory vote on slavery (popular sovereignty). The fighting that followed was called Bleeding Kansas.",
      table: {
        columns: ["Year", "Event"],
        rows: [
          {
            cells: ["1762", "Rousseau publishes The Social Contract"],
            noteAmber: "CDS 2017 (II): the author of The Social Contract.",
            pyqExampleId: "b713f4b4-ab7e-4243-abc0-89975a93cf29",
          },
          { cells: ["1789", "Tennis Court Oath; fall of the Bastille"] },
          { cells: ["1791", "France's first written constitution"] },
          { cells: ["1792", "National Convention meets; France a republic"] },
          { cells: ["1804", "Napoleon emperor; Napoleonic Code"] },
          { cells: ["1820", "Missouri Compromise"] },
          {
            cells: ["1854", "Kansas-Nebraska Act repeals the Missouri Compromise"],
            noteAmber: "CDS 2019 (I): the act let the people of each territory decide on slavery.",
            pyqExampleId: "69d94f45-33ea-42b2-abd8-b2fd833d5249",
          },
        ],
      },
      pyqExampleId: "69d94f45-33ea-42b2-abd8-b2fd833d5249",
      selfCheckExample: {
        prompt: "How many years passed between the fall of the Bastille and the day France became a republic?",
        steps: [
          "The Bastille fell on 14 July 1789.",
          "The National Convention ended the monarchy in September 1792.",
          "1792 minus 1789 is 3.",
        ],
        answer: "About three years (1789 to 1792).",
      },
      practiceSet: [
        { prompt: "Who wrote The Spirit of the Laws?", answer: "Montesquieu" },
        { prompt: "In which year was the Tennis Court Oath taken?", answer: "1789" },
        { prompt: "In which year did France first become a republic?", answer: "1792" },
        { prompt: "Which 1820 agreement banned slavery north of a fixed line in the United States?", answer: "The Missouri Compromise" },
      ],
      traps: [
        {
          title: "Social contract ideas are not all The Social Contract",
          body: "Hobbes and Locke both built their theories on a social contract, so their names sit in the options. The book with that **title** is **Rousseau**'s (1762).",
        },
        {
          title: "The French dates are moved by one or two years",
          body: "Wrong pairs shift a real event to a near year: the Tennis Court Oath to 1791, the Napoleonic Code to 1789. Learn the five dates as a chain: 1789 oath, 1791 constitution, 1792 republic, 1793 execution, 1804 empire and code.",
        },
        {
          title: "Kansas-Nebraska gave the choice to the settlers",
          body: "The act did not hand slavery to the federal government or take the vote away. It **repealed** the Missouri Compromise and let each territory's people vote on slavery.",
        },
      ],
    },
  ],
};
