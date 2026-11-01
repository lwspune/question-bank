import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XIE_PLANS_NOTE: SubtopicNote = {
  subtopicName: "Five Year Plans and Indian Planning",
  title: "Five-Year Plans and Indian Planning",
  oneLineDefinition:
    "Each Five-Year Plan with its years, model, slogan and the schemes it started, the breaks between plans, and the Planning Commission and the ideas behind early planning.",
  whyItMatters:
    "Thirty-nine questions in the bank: 14 from the 2023 shifts, nine from the 2024 shifts and 16 from the 2025 shifts, and none of them HARD. Nearly every question names one plan and asks its model, slogan or scheme, so the plan table is worth learning row by row.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxiepl-early",
      name: "The First and Second Plans",
      intuition:
        "The first two plans set the two directions SSC keeps asking about. The First fed the country after Partition; the Second built heavy industry. Each rests on a growth model with a person's name on it.",
      definition:
        "The **First Plan** (**1 April 1951** to 1956):\n" +
        "- Based on the **Harrod-Domar** model, which stresses **savings and investment**.\n" +
        "- Top priority: **agriculture**, with irrigation and power.\n" +
        "- Target growth **2.1%**; achieved **3.6%**.\n\n" +
        "The **Second Plan** (1956 to 1961):\n" +
        "- Based on the **P. C. Mahalanobis** model (not a Keynesian one).\n" +
        "- Aim: **rapid industrialisation**, with **heavy and basic industries** first, so that capital goods would build capacity for later growth.\n" +
        "- It carried the **socialist pattern of society** and the **Industrial Policy Resolution of 1956**, which gave the public sector the **commanding heights**.\n" +
        "- Steel plants, power and railways grew in this plan.",
      table: {
        columns: ["Plan", "Model", "Focus"],
        rows: [
          { cells: ["First, 1951-56", "Harrod-Domar", "Agriculture"], pyqExampleId: "fb8d30b8-1544-4750-9964-e791d52b6992" },
          { cells: ["Second, 1956-61", "Mahalanobis", "Heavy industry"], pyqExampleId: "426c9dbb-51f3-4b75-870d-0900b6028d65" },
          { cells: ["First Plan growth", "Target 2.1%", "Achieved 3.6%"], pyqExampleId: "debb16c7-8c62-4522-adcd-31cf3cd6cf8b" },
          { cells: ["1956 policy", "Commanding heights", "Public sector leads"], pyqExampleId: "f363890b-4370-4324-8a82-1cac381ec3fe" },
        ],
      },
      pyqExampleId: "91cbe5a7-a0de-423b-b855-001f091e2148",
      selfCheckExample: {
        prompt: "A statement says the Second Plan followed the Harrod-Domar model and put agriculture first. Correct it.",
        steps: ["Harrod-Domar and agriculture belong to the First Plan.", "The Second Plan followed the Mahalanobis model and put heavy industry first."],
        answer: "Second Plan: Mahalanobis model, heavy industry. Harrod-Domar and agriculture were the First Plan's.",
      },
      practiceSet: [
        { prompt: "On what date did the First Five-Year Plan begin?", answer: "1 April 1951" },
        { prompt: "Which plan reflected the socialist pattern of society?", answer: "The Second Plan" },
        { prompt: "What does the Harrod-Domar model stress?", answer: "Savings and investment" },
      ],
      traps: [
        {
          title: "No plan was Keynesian",
          body: "A statement that the Second Plan was based on the **Keynesian** model is false. It was the **Mahalanobis** model.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxiepl-later",
      name: "The Third Plan to the Eighth, and the breaks",
      intuition:
        "After the Second Plan, SSC asks each plan by its slogan or by a scheme launched in it. Learn the slogan, then place each scheme by its launch year.",
      definition:
        "The plans:\n" +
        "- **Third** (1961-66): a **self-reliant, self-generating** economy; wars and drought wrecked it.\n" +
        "- **Plan Holiday** (**1966-69**): three Annual Plans.\n" +
        "- **Fourth** (1969-74): **growth with stability**; the **Drought Prone Area Programme** (1973).\n" +
        "- **Fifth** (1974-79): **Garibi Hatao** and self-reliance, drafted by **D. P. Dhar**; the **Minimum Needs Programme**. The Janata government ended it in 1978.\n" +
        "- **Rolling Plan** (1978-80), under **Morarji Desai**.\n" +
        "- **Sixth** (1980-85): **removal of poverty** with modernisation; IRDP and NREP.\n" +
        "- **Seventh** (1985-90): **food, work and productivity**; the **Jawahar Rozgar Yojana** (1989).\n" +
        "- **Eighth** (1992-97): carried the **1991 reforms**; the **PM Rozgar Yojana** (1993).\n\n" +
        "So **seven** plans were completed between 1947 and 1990. Later plans: the Ninth (1997-2002) to the Twelfth (2012-17).",
      table: {
        columns: ["Period or plan", "Remember it by"],
        rows: [
          { cells: ["1966-69", "Plan Holiday"], pyqExampleId: "0c6bc087-39d1-49eb-8603-39c00fac246f" },
          { cells: ["Sixth, 1980-85", "Poverty removal and modernisation"], pyqExampleId: "316486cd-eb27-4a90-8a1f-e7e56467da67" },
          { cells: ["Seventh, 1985-90", "Food, work and productivity"], pyqExampleId: "b33fb685-fdc6-4e63-8d9a-7bd13823c736" },
          { cells: ["Eighth, 1992-97", "PM Rozgar Yojana; reforms"], pyqExampleId: "6ea38783-4e8b-422e-b80d-d7ecf0665010" },
          { cells: ["1978-80", "Rolling Plan, Morarji Desai"], pyqExampleId: "ccc32398-5ab8-49a5-8c9b-99700e86b875" },
        ],
      },
      pyqExampleId: "862b8794-8976-41ea-ae65-7070aefc689d",
      selfCheckExample: {
        prompt: "In which plans were the Minimum Needs Programme and the Jawahar Rozgar Yojana started?",
        steps: ["The Minimum Needs Programme came with the Fifth Plan (1974-79).", "The Jawahar Rozgar Yojana began in 1989, inside the Seventh Plan (1985-90)."],
        answer: "Fifth Plan; Seventh Plan.",
      },
      practiceSet: [
        { prompt: "Who drafted and launched the Fifth Plan?", answer: "D. P. Dhar" },
        { prompt: "In which plan did the Drought Prone Area Programme begin?", answer: "The Fourth Plan" },
        { prompt: "How many plans were completed between 1947 and 1990?", answer: "Seven" },
      ],
      traps: [
        {
          title: "The Plan Holiday is 1966-69",
          body: "The **Plan Holiday** came after the Third Plan, in **1966-69**. The 1990-92 gap had Annual Plans too, but SSC's Plan Holiday is the earlier one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxiepl-bodies",
      name: "The Planning Commission and early ideas",
      intuition:
        "Planning needed a body to draw up the plans and a set of goals to aim at. SSC asks who chaired it, when it began, and why India chose self-reliance and import substitution.",
      definition:
        "The body:\n" +
        "- The **Planning Commission** was set up on **15 March 1950** by a cabinet resolution. The **Prime Minister** chaired it, so **Jawaharlal Nehru** was its first chairman.\n" +
        "- It was replaced by **NITI Aayog** in 2015.\n" +
        "- Plans gave the government **long-term intervention** in the economy, and drafts were revised after public criticism.\n\n" +
        "Ideas before and in early planning:\n" +
        "- The **Bombay Plan** (1944), 'A Plan of Economic Development for India', came from industrialists such as **J. R. D. Tata** and **G. D. Birla**.\n" +
        "- **Self-reliance**: to cut dependence on foreign aid and imports.\n" +
        "- **Import substitution**: tariffs and quotas to protect **infant domestic industries**.\n" +
        "- **Land reforms**, for equity: **abolition of intermediaries** (zamindars) and **ceilings** on landholdings.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Bombay Plan", "1944, by industrialists"], pyqExampleId: "44556225-3a84-4688-ad39-81607d00f79b" },
          { cells: ["First chairman", "Jawaharlal Nehru, as Prime Minister"], pyqExampleId: "acfb0596-ac54-41e6-939a-14d43af3c7bd" },
          { cells: ["Import substitution", "Protect infant industries"], pyqExampleId: "40dc6f44-498a-4acc-9536-1955335f05ed" },
          { cells: ["Land reforms", "End intermediaries; land ceilings"], pyqExampleId: "0b3fbce8-38fb-4cb4-8694-977040f79877" },
        ],
      },
      pyqExampleId: "e6b7a26a-2866-4db1-9909-6f551b1275b0",
      selfCheckExample: {
        prompt: "Why did early Indian planning use tariffs and import quotas?",
        steps: ["New Indian industries could not yet compete with foreign firms.", "Tariffs and quotas kept imports out so they could grow: import substitution."],
        answer: "To protect infant domestic industries.",
      },
      practiceSet: [
        { prompt: "Who chaired the Planning Commission?", answer: "The Prime Minister" },
        { prompt: "Which body replaced the Planning Commission in 2015?", answer: "NITI Aayog" },
        { prompt: "What did land reforms abolish?", answer: "Intermediaries such as zamindars" },
      ],
      traps: [
        {
          title: "The Commission is 1950, not 1947",
          body: "The **Planning Commission** began in **1950** and the First Plan in **1951**. Options of 1947 or 1949 are decoys.",
        },
      ],
    },
  ],
};
