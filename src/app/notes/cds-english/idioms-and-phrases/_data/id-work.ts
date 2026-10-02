import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_WORK_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Work and Money",
  title: "Idioms for effort, responsibility and money",
  oneLineDefinition:
    "Idioms for hard work, taking responsibility, having too much to do, wasted effort, and things that cost a lot or a little.",
  whyItMatters:
    "Work idioms test the amount and kind of effort: hard, wasted, spread too thin, or done in someone else's place. " +
    "Money idioms nearly always turn on one question, expensive or cheap, so get the direction right and most options fall away.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-effort",
      name: "Effort and responsibility",
      intuition:
        "Effort idioms ask how much effort, and for what. Hard work (work like a dog, strain every nerve), getting ready for it (roll your sleeves up), too many jobs at once (irons in the fire), wasted effort (tilt at windmills), or standing in for someone (hold the fort).",
      definition:
        "The groups:\n" +
        "- **Hard work:** work like a dog, strain every nerve, roll your sleeves up (get ready for it).\n" +
        "- **Responsibility:** step up to the plate, hold the fort (take charge while someone is away), look to your laurels (work to keep your position).\n" +
        "- **Too much at once:** too many irons in the fire, a finger in every pie.\n" +
        "- **Wasted or overdone effort:** tilt at windmills, make heavy weather of something.\n" +
        "- **Method:** ways and means.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Step up to the plate", "Take responsibility; rise to a challenge", "Take control", "2018 (I)"],
            noteAmber: "Printed without 'to' in 2018 (I). The full idiom, from baseball, is 'step up to the plate'.",
            pyqExampleId: "4d2ed976-c530-4776-b6c8-12b210ef32da",
          },
          {
            cells: ["Roll your sleeves up", "Get ready for hard work", "To prepare for wrestling", "2020 (II)"],
            pyqExampleId: "23df2e58-09a9-410a-a530-9ae5e055bb01",
          },
          {
            cells: ["Strain every nerve", "Try as hard as you can", "Tried half-heartedly", "2023 (II)"],
            pyqExampleId: "7491f384-bc76-4544-bdf3-5612afab20d4",
          },
          {
            cells: ["Work like a dog", "Work very hard", "To work faithfully", "2026 (I)"],
            pyqExampleId: "97f51183-1896-43da-aecf-bb7346890e59",
          },
          {
            cells: ["Too many irons in the fire", "Too many tasks or plans at once", "Involvement in illegal activities", "2023 (II)"],
            pyqExampleId: "a63e72b6-fe46-4d1c-bd4d-3fbb47cea969",
          },
          {
            cells: ["Have a finger in every pie", "Be involved in many different activities", "To be familiar with the latest developments", "2026 (II)"],
            pyqExampleId: "162bcf09-7863-4d04-8035-8844b23cca94",
          },
          {
            cells: ["Ways and means", "Methods of getting something done", "Norms and regulations", "2021 (I)"],
            pyqExampleId: "be2007d9-eb92-4fb8-a293-f8348e46db89",
          },
          {
            cells: ["Hold the fort", "Take charge while the person responsible is away", "Be present at the moment one is needed", "2026 (I)"],
            pyqExampleId: "58dfac50-dbaa-47b9-8aca-611001d71462",
          },
          {
            cells: ["Make heavy weather of something", "Make a task seem harder than it is", "Complain about rainy weather", "2025 (II)"],
            pyqExampleId: "f55b8562-473a-47f0-ac39-1be61dd6eb60",
          },
          {
            cells: ["Look to your laurels", "Work harder to keep your position", "To guard one's trophies", "2024 (II)"],
            pyqExampleId: "99ecf581-2ce1-4c7b-acf0-aefe524da7d1",
          },
          {
            cells: ["Tilt at windmills", "Waste effort fighting enemies or problems that are not real", "To blow hot air", "2024 (II)"],
            noteAmber: "From the novel Don Quixote, whose hero attacks windmills, thinking they are giants.",
            pyqExampleId: "aba7367f-1709-4661-8340-628225b662c0",
          },
        ],
      },
      pyqExampleId: "58dfac50-dbaa-47b9-8aca-611001d71462",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Pull your weight'. (a) lift heavy things (b) lose weight (c) do your fair share of the work (d) use your influence over others",
        steps: [
          "Group: this is about effort in a team.",
          "(a) and (b) are about real weight: out.",
          "In a rowing boat, each rower must pull their own share. Influence over others is a different idea.",
        ],
        answer: "(c) do your fair share of the work.",
      },
      practiceSet: [
        { prompt: "'Work like a dog': faithfully, or very hard?", answer: "Very hard" },
        { prompt: "Which idiom in the table means to make a task seem harder than it is?", answer: "Make heavy weather of something" },
        { prompt: "'Look to your laurels' warns you to do what?", answer: "Work harder to keep your position" },
        {
          prompt: "Spot the wrong row: 'Too many irons in the fire' = involvement in illegal activities.",
          answer: "Wrong. It means having too many tasks at once.",
        },
      ],
      traps: [
        {
          title: "Dogs are loyal, but the idiom is about effort",
          body:
            "**Work like a dog** means to work very hard. 'To work faithfully' borrows the dog's loyalty, which is the wrong feature.",
        },
        {
          title: "Look to your laurels is a warning",
          body:
            "**Look to your laurels** means to work harder so that others do not overtake you. It is not guarding trophies, and it is not praising yourself. Do not confuse it with **rest on your laurels** (to stop trying because of past success).",
        },
        {
          title: "Heavy weather is not weather",
          body:
            "**Make heavy weather of something** means to make a task harder than it needs to be. Options about rain, clouds or pollution read the words literally.",
        },
        {
          title: "Involved, not informed",
          body:
            "**A finger in every pie** means being involved in many activities. 'Being familiar with the most recent developments' is knowing about things, not taking part in them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-money",
      name: "Money and cost",
      intuition:
        "Money idioms ask one question first: very expensive, very cheap, or short of money? Get the direction, then check the detail. A white elephant is costly **and** useless; a banana republic is poor **and** badly governed.",
      definition:
        "The groups:\n" +
        "- **Very expensive:** cost an arm and a leg, cost a bomb, big ticket, pay over the odds (pay more than it is worth).\n" +
        "- **Very cheap:** dirt cheap.\n" +
        "- **Short of money:** feel the pinch.\n" +
        "- **Costly and useless:** a white elephant.\n" +
        "- **A poor, weakly governed country:** a banana republic.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Cost an arm and a leg", "Be very expensive", "Severe punishment to someone", "2018 (I)"],
            pyqExampleId: "9ed279d5-6b5e-43d7-8198-2eb4ccd99f0d",
          },
          {
            cells: ["Cost a bomb", "Be very expensive", "To be with rich people", "2020 (II)"],
            pyqExampleId: "73fde556-70d3-4081-b8b6-7d27c36779df",
          },
          {
            cells: ["Dirt cheap", "Extremely cheap", "Very cheap person", "2019 (II)"],
            noteAmber: "It describes a price. A 'cheap person' would be a mean one, which is a different idea.",
            pyqExampleId: "85f28f77-ab04-49e1-bd8a-bec8330e3701",
          },
          {
            cells: ["Big ticket", "Very costly", "Very easy", "2021 (I)"],
            pyqExampleId: "777facaf-a1d2-42b6-9a0e-ec88c5734b8d",
          },
          {
            cells: ["Feel the pinch", "Have less money than before and feel the hardship", "Being hurt by someone", "2022 (I)"],
            pyqExampleId: "c274b3b9-636b-41a9-b8f0-d24267288565",
          },
          {
            cells: ["Pay over the odds", "Pay more for something than it is worth", "To get dividends for investments", "2023 (I)"],
            pyqExampleId: "46959485-bb81-4eba-8866-d8e3104869fd",
          },
          {
            cells: ["A white elephant", "Something that cost a lot but has no useful purpose", "Someone completely good and honest", "2023 (I)"],
            pyqExampleId: "f5e42890-1e8c-4f82-9076-49dceabf7181",
          },
          {
            cells: ["A banana republic", "A small, poor country with a weak government", "A poor country which produces bananas", "2020 (I)"],
            pyqExampleId: "594e8212-2c1c-4cca-ba0f-bf993abc6e52",
          },
        ],
      },
      pyqExampleId: "c274b3b9-636b-41a9-b8f0-d24267288565",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Break the bank'. (a) rob a bank (b) save a lot of money (c) cost more than one can afford (d) open a new account",
        steps: [
          "Direction: breaking suggests too much money going out, so it is about high cost.",
          "(a) and (d) are about a real bank: out.",
          "Saving (b) is the reverse direction.",
        ],
        answer: "(c) cost more than one can afford.",
      },
      practiceSet: [
        { prompt: "Expensive or cheap: 'big ticket'?", answer: "Expensive" },
        { prompt: "Which idiom in the table names something costly that has no use?", answer: "A white elephant" },
        { prompt: "'Pay over the odds': more or less than the thing is worth?", answer: "More" },
        {
          prompt: "Spot the wrong row: 'A banana republic' = a country that grows bananas.",
          answer: "Wrong. It is a small, poor country with a weak government.",
        },
      ],
      traps: [
        {
          title: "Direction first",
          body:
            "For **big ticket** the options were 'very less', 'very costly', 'very easy' and 'not much'. Fix the direction (a lot of money) and three of them fall at once.",
        },
        {
          title: "Both halves of the meaning",
          body:
            "**A white elephant** has cost a lot **and** is of no use. An option with only the cost, or only the uselessness, is incomplete.",
        },
        {
          title: "A price, not a person",
          body:
            "**Dirt cheap** describes how little something costs. 'Very cheap person' changes it into a remark about someone's character.",
        },
      ],
    },
  ],
};
