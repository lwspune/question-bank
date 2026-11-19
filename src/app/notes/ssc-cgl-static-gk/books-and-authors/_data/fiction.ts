import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SBA_FICTION_NOTE: SubtopicNote = {
  subtopicName: "Novels, Authors and Literary Prizes",
  title: "Novels, Authors and Literary Prizes",
  oneLineDefinition:
    "Indian writers and the Booker Prize, Indian and diaspora novels with what each is about, and a short table of world classics with their prizes.",
  whyItMatters:
    "17 questions in the bank, all from the 2025 shifts. Only 6 of them simply ask who wrote a book; the other 11 ask what a book is about or which prize it won, often as two or three statements. So each table row gives the author, the kind of book and its prize.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsbafi-genre",
      name: "Read the kind of book first",
      intuition:
        "A theme question offers four descriptions, and usually three of them are a different KIND of book: a history, a travelogue, a biography, science fiction. If you know only that the book is a novel about a family, three options fall at once.",
      definition:
        "- **Step 1:** recall the kind of book: novel, short stories, a novel in verse, travelogue, history, essays.\n" +
        "- **Step 2:** strike every option that names another kind. A novel is not \"a historical account\"; a book of essays is not \"a fantasy saga\".\n" +
        "- **Step 3:** of what is left, pick the one whose place and people fit (an immigrant family in America, Mumbai, the Emergency).\n" +
        "- **For statements:** a prize claim is the usual false one. A book shortlisted or longlisted for the Booker did not **win** it.",
      authoredExample: {
        prompt:
          "Which best describes Interpreter of Maladies by Jhumpa Lahiri? (a) A history of the Mughal court (b) Short stories about Indian and Indian-American lives (c) A travelogue across Rajasthan (d) A biography of a freedom fighter",
        steps: [
          "Interpreter of Maladies is fiction: a book of short stories.",
          "A history, a travelogue and a biography are other kinds of book, so (a), (c) and (d) fall.",
        ],
        answer: "(b) Short stories about Indian and Indian-American lives",
      },
      selfCheckExample: {
        prompt: "Malgudi Days by R. K. Narayan is best described as: a travelogue, a book of short stories, or a history of Mysore?",
        steps: ["Malgudi is an invented small town, so the book is fiction.", "It is a collection of short stories set there."],
        answer: "A book of short stories",
      },
      practiceSet: [
        { prompt: "A book was shortlisted for the Booker Prize. Did it win the Booker?", answer: "No. Shortlisted means it reached the final list but did not win" },
        { prompt: "Which kind of book is The Golden Gate by Vikram Seth?", answer: "A novel in verse" },
        { prompt: "Which kind of book is A Fine Balance by Rohinton Mistry?", answer: "A novel" },
      ],
      traps: [
        {
          title: "Shortlisted is not won",
          body: "A book **shortlisted** or **longlisted** for the Booker did **not** win it. The Moor's Last Sigh and Sleeping on Jupiter are examples.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsbafi-booker",
      name: "Indian writers and the big prizes",
      intuition:
        "Four Indian-born novelists have won the Booker Prize, one book each. Learn the four with their books and years; for any other Indian novel in a Booker question, suspect a shortlist or a longlist.",
      definition:
        "The facts:\n" +
        "- The four Booker winners: **Salman Rushdie**, **Midnight's Children** (1981); **Arundhati Roy**, **The God of Small Things** (1997); **Kiran Desai**, **The Inheritance of Loss** (2006); **Aravind Adiga**, **The White Tiger** (2008, his first novel).\n" +
        "- **Anita Desai**, Kiran's mother, was **shortlisted three times** but never won.\n" +
        "- Rushdie's **The Moor's Last Sigh** (1995) was only **shortlisted** for the Booker; it won the **Whitbread** Novel Award. It blends history and magical realism.\n" +
        "- **Anuradha Roy's** **Sleeping on Jupiter** was **longlisted** in 2015.\n" +
        "- Adiga's second novel, **Last Man in Tower**, is about the residents of an old **Mumbai** housing society facing a builder's offer.\n" +
        "- **Vikram Seth's** **The Golden Gate** (1986), a **novel in verse** set in San Francisco, won the **Sahitya Akademi Award** (1988). It never won the Booker.",
      table: {
        columns: ["Book", "Author", "Prize or note"],
        rows: [
          { cells: ["Midnight's Children", "Salman Rushdie", "Booker Prize, 1981"] },
          { cells: ["The God of Small Things", "Arundhati Roy", "Booker Prize, 1997"] },
          { cells: ["The Inheritance of Loss", "Kiran Desai", "Booker Prize, 2006"] },
          { cells: ["The White Tiger", "Aravind Adiga", "Booker Prize, 2008; his first novel"] },
          { cells: ["The Moor's Last Sigh", "Salman Rushdie", "Booker shortlist, 1995; Whitbread Novel Award"] },
          { cells: ["Sleeping on Jupiter", "Anuradha Roy", "Booker longlist, 2015"] },
          { cells: ["Last Man in Tower", "Aravind Adiga", "A Mumbai housing society and a builder's offer"] },
          { cells: ["The Golden Gate", "Vikram Seth", "Novel in verse; Sahitya Akademi Award, 1988"] },
        ],
      },
      pyqExampleId: "07aafbb3-8b17-44b5-8078-2c9823a3785e",
      selfCheckExample: {
        prompt: "Which novel won Arundhati Roy the Booker Prize, and in which year?",
        steps: ["Arundhati Roy has won the Booker once.", "It was for her first novel, The God of Small Things."],
        answer: "The God of Small Things, 1997",
      },
      practiceSet: [
        { prompt: "Who wrote Midnight's Children?", answer: "Salman Rushdie" },
        { prompt: "Who wrote The Inheritance of Loss?", answer: "Kiran Desai" },
        { prompt: "Who wrote Sleeping on Jupiter?", answer: "Anuradha Roy" },
        { prompt: "Which major Indian prize did Vikram Seth's The Golden Gate win?", answer: "The Sahitya Akademi Award" },
        { prompt: "Which Aravind Adiga novel is set in an old Mumbai housing society?", answer: "Last Man in Tower" },
      ],
      traps: [
        {
          title: "Kiran won; her mother Anita did not",
          body: "**The Inheritance of Loss** won the Booker for **Kiran Desai**. **Anita Desai** was shortlisted three times and never won.",
        },
        {
          title: "Rushdie's Booker was Midnight's Children",
          body: "**The Moor's Last Sigh** was only shortlisted. Rushdie's Booker win was for **Midnight's Children** (1981).",
        },
        {
          title: "The Golden Gate is verse and American",
          body: "**The Golden Gate** is set in **San Francisco** and written in verse. It is not about Indian society and did not win the Booker.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsbafi-novels",
      name: "Indian and diaspora fiction and its themes",
      intuition:
        "Theme questions ask what a book is about. Keep each book with its place and its people: the Emergency, an immigrant family in America, a boy's friend in Bombay, a Bengali adventurer.",
      definition:
        "The facts:\n" +
        "- **Shashi Tharoor's** **The Great Indian Novel** (1989) retells the freedom struggle and early independent India through the **Mahabharata**, as satire.\n" +
        "- **Rohinton Mistry's** **A Fine Balance** (1995) follows four people through the **Emergency** of 1975 to 1977: caste violence, poverty, state excess.\n" +
        "- **Jhumpa Lahiri's** first novel is **The Namesake** (2003), about a Bengali family in America; her short stories **Interpreter of Maladies** won the **Pulitzer Prize for Fiction** (2000).\n" +
        "- **Chitra Banerjee Divakaruni**: **Arranged Marriage** (1995) is short stories of Indian women, many of them immigrants, and their marriages; **The Vine of Desire** (2002), the sequel to Sister of My Heart, follows two cousins as immigrants in America.\n" +
        "- **Amit Chaudhuri's** **Friend of My Youth** (2017) is autobiographical fiction: a writer named Amit returns to Bombay and thinks back on a childhood friend, family and memory.\n" +
        "- **Sunil Gangopadhyay** wrote the Bengali **Kakababu** adventure series, mystery mixed with history and travel.\n" +
        "- **R. K. Narayan's** **Malgudi Days** is a book of short stories set in the invented town of Malgudi.",
      table: {
        columns: ["Book", "Author", "What it is about"],
        rows: [
          { cells: ["The Great Indian Novel", "Shashi Tharoor", "The freedom struggle retold through the Mahabharata"] },
          { cells: ["A Fine Balance", "Rohinton Mistry", "Four lives during the Emergency"] },
          { cells: ["The Namesake", "Jhumpa Lahiri", "A Bengali family in America; her first novel"] },
          { cells: ["Interpreter of Maladies", "Jhumpa Lahiri", "Short stories; Pulitzer Prize for Fiction, 2000"] },
          { cells: ["Arranged Marriage", "Chitra Banerjee Divakaruni", "Short stories of Indian women and their marriages"] },
          { cells: ["The Vine of Desire", "Chitra Banerjee Divakaruni", "Two cousins as immigrants in America"] },
          { cells: ["Friend of My Youth", "Amit Chaudhuri", "Autobiographical fiction: Bombay, a friend, memory"] },
          { cells: ["The Adventures of Kakababu", "Sunil Gangopadhyay", "Bengali adventure and mystery stories"] },
          { cells: ["Malgudi Days", "R. K. Narayan", "Short stories set in the town of Malgudi"] },
        ],
      },
      pyqExampleId: "d5e6efab-4b69-455c-a472-c6d73ce93017",
      selfCheckExample: {
        prompt: "Which Shashi Tharoor novel retells India's freedom struggle through the story of the Mahabharata?",
        steps: ["Tharoor's history books are non-fiction; this one is a satirical novel.", "It is The Great Indian Novel (1989)."],
        answer: "The Great Indian Novel",
      },
      practiceSet: [
        { prompt: "Who wrote The Namesake?", answer: "Jhumpa Lahiri" },
        { prompt: "Which Jhumpa Lahiri book won the Pulitzer Prize for Fiction?", answer: "Interpreter of Maladies" },
        { prompt: "Who wrote The Vine of Desire?", answer: "Chitra Banerjee Divakaruni" },
        { prompt: "Who created the Bengali adventurer Kakababu?", answer: "Sunil Gangopadhyay" },
        { prompt: "Who wrote Friend of My Youth?", answer: "Amit Chaudhuri" },
        { prompt: "Who wrote Malgudi Days?", answer: "R. K. Narayan" },
      ],
      traps: [
        {
          title: "The Emergency novel is Mistry's",
          body: "**A Fine Balance**, set in the **Emergency**, is by **Rohinton Mistry**, not Rushdie, Lahiri or Roy.",
        },
        {
          title: "Lahiri's prize was for her stories",
          body: "**Interpreter of Maladies** (short stories) won Jhumpa Lahiri the Pulitzer. **The Namesake** is her first **novel**.",
        },
        {
          title: "Divakaruni writes fiction about immigrants",
          body: "**Arranged Marriage** and **The Vine of Desire** are fiction about Indian women and immigrant families. Neither is history or science fiction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsbafi-world",
      name: "World classics and their prizes",
      intuition:
        "A few world books keep coming back: an American Nobel winner, the classic of magical realism, a prize-winning story of a Native American boy. Each has one prize or one style to remember.",
      definition:
        "The facts:\n" +
        "- **Toni Morrison** won the **Pulitzer Prize for Fiction (1988)** for **Beloved** and the **Nobel Prize in Literature (1993)**.\n" +
        "- **Alice Walker** won the Pulitzer for **The Color Purple** (1983). **Maya Angelou** wrote **I Know Why the Caged Bird Sings**.\n" +
        "- **Gabriel García Márquez's** **One Hundred Years of Solitude** (1967) is the classic of **magical realism**: seven generations of the **Buendía** family in the invented town of **Macondo**. He won the Nobel in 1982.\n" +
        "- **Sherman Alexie's** **The Absolutely True Diary of a Part-Time Indian** (2007), about a Spokane boy who leaves the reservation school, won the **National Book Award** for Young People's Literature. It did **not** win the Pulitzer.",
      table: {
        columns: ["Book", "Author", "Prize or style"],
        rows: [
          { cells: ["Beloved", "Toni Morrison", "Pulitzer, 1988; she won the Nobel in 1993"] },
          { cells: ["The Color Purple", "Alice Walker", "Pulitzer Prize for Fiction, 1983"] },
          { cells: ["I Know Why the Caged Bird Sings", "Maya Angelou", "Autobiography"] },
          { cells: ["One Hundred Years of Solitude", "Gabriel García Márquez", "Magical realism; the Buendía family of Macondo"] },
          { cells: ["The Absolutely True Diary of a Part-Time Indian", "Sherman Alexie", "National Book Award, 2007"] },
        ],
      },
      pyqExampleId: "58788e2c-074a-41f7-ae8d-460eb1d7274e",
      selfCheckExample: {
        prompt: "Which novel won Alice Walker the Pulitzer Prize for Fiction?",
        steps: ["Toni Morrison's Pulitzer was for Beloved.", "Alice Walker's was for The Color Purple, in 1983."],
        answer: "The Color Purple",
      },
      practiceSet: [
        { prompt: "In which invented town is One Hundred Years of Solitude set?", answer: "Macondo" },
        { prompt: "Who wrote I Know Why the Caged Bird Sings?", answer: "Maya Angelou" },
        { prompt: "Which literary style is One Hundred Years of Solitude the classic of?", answer: "Magical realism" },
        { prompt: "Who wrote The Absolutely True Diary of a Part-Time Indian?", answer: "Sherman Alexie" },
      ],
      traps: [
        {
          title: "The Part-Time Indian won the National Book Award",
          body: "Sherman Alexie's novel won the **National Book Award** (2007), **not** the Pulitzer, and its Indian is a **Native American** boy.",
        },
        {
          title: "Macondo is not a history",
          body: "**One Hundred Years of Solitude** is magical realism, told in cycles. A statement calling it a linear political history of Colombia is false.",
        },
      ],
    },
  ],
};
