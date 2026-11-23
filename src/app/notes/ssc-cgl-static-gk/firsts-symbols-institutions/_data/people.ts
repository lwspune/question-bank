import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFI_PEOPLE_NOTE: SubtopicNote = {
  subtopicName: "Firsts and Famous Personalities",
  title: "Firsts and Famous Personalities",
  oneLineDefinition:
    "Firsts in India (a scheme, a post, a company) and famous people with their nicknames, titles and best-known work.",
  whyItMatters:
    "Ten questions in the bank. The three from the 2025 shifts each gave four achievements and asked which one a person really has (Tessy Thomas, Kiran Mazumdar-Shaw, M. Visvesvaraya), so learn what each person did, not only the name.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfipe-firsts",
      name: "Firsts in India",
      intuition:
        "Each first is a pair: a person or a place, and the thing it did first. The options are usually other real names from the same field, so learn the field with the name.",
      definition:
        "The facts:\n" +
        "- **Mid-day meal**: began in **Tamil Nadu** (then Madras). The Madras Corporation started it in 1925 and Chief Minister **K. Kamaraj** spread it across the state's schools; the national programme followed in **1995**.\n" +
        "- **Justice Ranjana Prakash Desai**, a retired **Supreme Court judge**, became the **first woman to chair the Press Council of India** (2022).\n" +
        "- **Tessy Thomas**, the **\"Missile Woman of India\"**, a DRDO scientist, was project director of the **Agni-IV and Agni-V** missiles: the first woman to head a missile project in India.\n" +
        "- **Kiran Mazumdar-Shaw** founded **Biocon** in **1978** and became the first Indian woman to head a leading biotech company.\n" +
        "- **India's first petrochemical company**: SSC's answer is the government's **Indian Petrochemicals Corporation Limited (IPCL)**, set up in 1969 at Vadodara.",
      table: {
        columns: ["Person or thing", "First or known for"],
        rows: [
          { cells: ["Tamil Nadu", "First state to give a mid-day meal in schools"] },
          { cells: ["Ranjana Prakash Desai", "First woman chair of the Press Council of India; a former judge"] },
          { cells: ["Tessy Thomas", "Missile Woman of India; led the Agni-V project"] },
          { cells: ["Kiran Mazumdar-Shaw", "Founded Biocon in 1978"] },
        ],
      },
      pyqExampleId: "052bf1a5-8116-4015-a217-9ca0d3eb9c36",
      selfCheckExample: {
        prompt: "Which Chief Minister spread the mid-day meal to schools across Tamil Nadu?",
        steps: ["The meal began with the Madras Corporation in 1925.", "K. Kamaraj, as Chief Minister, extended it across the state."],
        answer: "K. Kamaraj.",
      },
      practiceSet: [
        { prompt: "Which company did Kiran Mazumdar-Shaw found?", answer: "Biocon" },
        { prompt: "Who was the first woman to chair the Press Council of India?", answer: "Justice Ranjana Prakash Desai" },
        { prompt: "Which state was the first to give a mid-day meal in its schools?", answer: "Tamil Nadu" },
        { prompt: "In which year did the national mid-day meal programme begin?", answer: "1995" },
      ],
      traps: [
        {
          title: "The mid-day meal began in one state",
          body: "The **mid-day meal** began in **Tamil Nadu**, decades before the national programme of **1995**.",
        },
        {
          title: "Ranjana Desai came from the judiciary",
          body: "Before the Press Council, **Ranjana Prakash Desai** was a **judge** of the Supreme Court, not an officer of the executive.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfipe-titles",
      name: "Famous people and their titles",
      intuition:
        "These questions give a nickname, a birthplace or a title and ask the person, or give the person and ask what they did. Keep each person with one fact that cannot be confused with a neighbour's.",
      definition:
        "The facts:\n" +
        "- **R. D. Burman**, the film composer, son of S. D. Burman, was called **\"Pancham Da\"**.\n" +
        "- **Lata Mangeshkar** was born on 28 September **1929** in **Indore**.\n" +
        "- **Norman Borlaug**, who bred high-yielding dwarf wheat (Nobel Peace Prize, 1970), is the **father of the Green Revolution in the world**; **M. S. Swaminathan** is the father of the Green Revolution **in India**.\n" +
        "- **Sir M. Visvesvaraya** was a **civil engineer**, known for dams and water projects such as the **Krishna Raja Sagara** dam, and a Diwan of Mysore. His birthday, **15 September**, is **Engineers' Day**. He received the **Bharat Ratna in 1955**; the first awards, in 1954, went to C. Rajagopalachari, S. Radhakrishnan and C. V. Raman.\n" +
        "- **A. P. J. Abdul Kalam** is called the **\"Missile Man of India\"**.\n" +
        "- The **President of India** is the **Supreme Commander** of the armed forces and takes the salute at the **Republic Day** parade.",
      table: {
        columns: ["Person", "Title or fact"],
        rows: [
          { cells: ["R. D. Burman", "Pancham Da"] },
          { cells: ["Lata Mangeshkar", "Born in Indore, 1929"] },
          { cells: ["Norman Borlaug", "Father of the Green Revolution in the world"] },
          { cells: ["M. S. Swaminathan", "Father of the Green Revolution in India"] },
          { cells: ["M. Visvesvaraya", "Engineer; Engineers' Day, 15 September"] },
          { cells: ["A. P. J. Abdul Kalam", "Missile Man of India"] },
          { cells: ["President of India", "Supreme Commander of the armed forces"] },
        ],
      },
      pyqExampleId: "9d0deb5d-287e-4fe1-8ac3-bd15d4a74e11",
      selfCheckExample: {
        prompt: "Who is the father of the Green Revolution in the world, and who in India?",
        steps: ["Norman Borlaug bred the high-yielding wheat that started it worldwide.", "M. S. Swaminathan led its spread in India."],
        answer: "Norman Borlaug in the world; M. S. Swaminathan in India.",
      },
      practiceSet: [
        { prompt: "Which music composer was called Pancham Da?", answer: "R. D. Burman" },
        { prompt: "In which city was Lata Mangeshkar born?", answer: "Indore" },
        { prompt: "Who takes the salute at the Republic Day parade as Supreme Commander of the armed forces?", answer: "The President of India" },
        { prompt: "Who is known as the Missile Man of India?", answer: "A. P. J. Abdul Kalam" },
      ],
      traps: [
        {
          title: "Pancham Da is the son, not the father",
          body: "**R. D. Burman** was Pancham Da. **S. D. Burman** was his father.",
        },
        {
          title: "Borlaug for the world, Swaminathan for India",
          body: "\"Father of the Green Revolution **in the world**\" is **Norman Borlaug**. M. S. Swaminathan is the answer only when the question says **India**.",
        },
        {
          title: "Visvesvaraya was not the first Bharat Ratna",
          body: "Visvesvaraya received the Bharat Ratna in **1955**. The first awards, in **1954**, went to Rajagopalachari, Radhakrishnan and C. V. Raman.",
        },
      ],
    },
  ],
};
