import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_TIME_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Time and Company",
  title: "Idioms for time, company and comparison",
  oneLineDefinition:
    "Idioms for when something happens and how suddenly, and for how people stand with each other: together, apart, alike or different.",
  whyItMatters:
    "Time idioms often test two features at once: when (soon, later) and how (suddenly, as planned). " +
    "Company idioms test whether people are united, quarrelling or simply close by, and comparison idioms test same against different.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-time",
      name: "Time and timing",
      intuition:
        "Ask two things: when does it happen, and how? 'Down the road' is later; 'around the corner' is soon. 'Out of the blue' and 'a bolt from the blue' are sudden and unexpected; 'at the drop of a hat' is at once, without a second thought.",
      definition:
        "The groups:\n" +
        "- **Unexpected:** out of the blue, a bolt from the blue (a sudden shock).\n" +
        "- **Future:** down the road (some time later), around the corner (very soon).\n" +
        "- **At once:** at the drop of a hat (without hesitation).\n" +
        "- **A season:** the dog days (the hottest days of summer).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Out of the blue", "Unexpectedly", "Unbelievably", "2018 (I)"],
            pyqExampleId: "8441d937-8fc8-464a-8761-9e62f50a58f2",
          },
          {
            cells: ["A bolt from the blue", "A sudden, unexpected event or piece of news", "News long expected that arrives late", "2021 (I)"],
            pyqExampleId: "7c3147da-c173-4b6a-8875-cf5736918939",
          },
          {
            cells: ["Down the road", "In the future", "In the past", "2018 (I)"],
            pyqExampleId: "e34ba5a1-38a3-4aba-a98d-cf02c44031fd",
          },
          {
            cells: ["Around the corner", "About to happen soon", "A thing at the end of a corner", "2020 (II)"],
            pyqExampleId: "7953a7d0-0b52-48f4-883d-fa3f5fb27ea2",
          },
          {
            cells: ["At the drop of a hat", "At once, without hesitation", "Doing something without much pressure", "2018 (I), 2021 (II)"],
            noteAmber: "Asked twice.",
            pyqExampleId: "94ebf45e-ab6c-4cc7-ae2f-864863ddbdc3",
          },
          {
            cells: ["The dog days", "The hottest days of summer", "The bitter days", "2020 (I)"],
            noteAmber: "Named after the Dog Star, Sirius, which rises with the sun in the hottest weeks.",
            pyqExampleId: "925abdc2-def2-4a69-ac04-643caa4cf518",
          },
        ],
      },
      pyqExampleId: "7c3147da-c173-4b6a-8875-cf5736918939",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'In the nick of time'. (a) too late to help (b) a long time ago (c) just in time, at the last moment (d) at a regular time each day",
        steps: [
          "When: right at the moment it is needed.",
          "How: only just, with no time to spare. A nick is a tiny cut, a very small margin.",
          "(a) is the opposite, and (b) and (d) are about a different time altogether.",
        ],
        answer: "(c) just in time, at the last moment.",
      },
      practiceSet: [
        { prompt: "'Down the road': past or future?", answer: "Future" },
        { prompt: "Which idiom in the table names the hottest part of summer?", answer: "The dog days" },
        { prompt: "'Around the corner': soon, or long ago?", answer: "Soon" },
        { prompt: "He agreed 'at the drop of a hat'. Did he hesitate?", answer: "No: he agreed at once." },
      ],
      traps: [
        {
          title: "Unexpected, not unbelievable",
          body:
            "**Out of the blue** means unexpectedly. 'Unbelievably' and 'undoubtedly' sound similar but describe belief, not surprise.",
        },
        {
          title: "Hot, not bitter",
          body:
            "**The dog days** are the hottest days of the year. 'The bitter days' and 'the coldest days' miss the season; 'days celebrating dogs' takes the picture literally.",
        },
        {
          title: "Without thought, not without pressure",
          body:
            "**At the drop of a hat** means at once, with no hesitation. 'Without much pressure' and 'a happy and easygoing man' describe mood, not speed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-together",
      name: "Together, apart and compared",
      intuition:
        "Ask how the people stand. Working closely (hand in glove), too close (living in each other's pockets), united against others (closing ranks), at peace (making one's peace), fighting (the feathers fly), or close by to help (at someone's elbow). " +
        "Comparison idioms add one more question: the same, or completely different?",
      definition:
        "The groups:\n" +
        "- **Together:** hand in glove (working very closely), a match made in heaven, live in each other's pockets (spend too much time together), close ranks (unite to defend a shared interest), at somebody's elbow (close by to help).\n" +
        "- **Quarrel and peace:** the feathers fly (a noisy quarrel), make one's peace (end a quarrel).\n" +
        "- **Different:** another kettle of fish, apples and oranges.\n" +
        "- **How many:** everyone and his brother (a very large number of people).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Hand in glove", "Working very closely together (often in something wrong)", "Working separately", "2019 (II)"],
            pyqExampleId: "0864d52c-3e01-4e7a-9a2e-64a41ddfe55b",
          },
          {
            cells: ["A match made in heaven", "A marriage or partnership likely to be very happy", "A marriage of convenience", "2019 (I)"],
            pyqExampleId: "5795ff60-2869-4e2b-93e7-9c96e978b6c1",
          },
          {
            cells: ["Live in each other's pockets", "Spend too much time together", "To live by borrowing from each other", "2026 (I)"],
            pyqExampleId: "62566a2d-e813-4383-ae96-b193b6a30e2a",
          },
          {
            cells: ["Close ranks", "Unite to defend a shared interest", "To stop communicating with one's colleagues", "2026 (I)"],
            pyqExampleId: "a52cd57f-9723-4773-a7aa-69fc8a2bb17d",
          },
          {
            cells: ["Make one's peace", "End a quarrel", "To experience serenity", "2026 (II)"],
            pyqExampleId: "c93cb8a2-584c-4025-b2d1-e4e6f13eb9cf",
          },
          {
            cells: ["The feathers fly", "People quarrel or fight noisily", "To lead a carefree life", "2022 (I)"],
            pyqExampleId: "00263f85-98c8-4378-9ef4-8f359497c5d1",
          },
          {
            cells: ["At somebody's elbow", "Close by, ready to help", "To be dominated by someone", "2022 (I)"],
            pyqExampleId: "06d5db21-2687-4266-8a05-09ed37383bfb",
          },
          {
            cells: ["Another kettle of fish", "A completely different matter", "Slightly different matter", "2023 (II)"],
            pyqExampleId: "152f3bd0-c4ac-4520-b44e-4a152515418c",
          },
          {
            cells: ["Apples and oranges", "People or things too different to compare", "People who argue a lot", "2023 (I)"],
            pyqExampleId: "9fc98212-f1c0-47d4-a86f-7171a1446762",
          },
          {
            cells: ["Everyone and his brother", "A very large number of people", "An individual and all his relatives", "2022 (I)"],
            pyqExampleId: "3fece4c9-3e9f-42e3-b8e9-a5f0f4448167",
          },
        ],
      },
      pyqExampleId: "0864d52c-3e01-4e7a-9a2e-64a41ddfe55b",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Birds of a feather'. (a) a family of birds (b) rivals who compete for the same prize (c) people with similar tastes who keep together (d) people who travel often",
        steps: [
          "Ask how the people stand: together, and alike.",
          "(a) keeps the birds: out. (d) takes 'birds' as travellers.",
          "Rivals (b) stand against each other, not together. The full saying is 'birds of a feather flock together'.",
        ],
        answer: "(c) people with similar tastes who keep together.",
      },
      practiceSet: [
        { prompt: "'Close ranks': unite, or separate?", answer: "Unite to defend a common interest" },
        { prompt: "'Another kettle of fish': slightly different, or completely different?", answer: "Completely different" },
        { prompt: "Which idiom in the table means a very large number of people?", answer: "Everyone and his brother" },
        {
          prompt: "Spot the wrong row: 'Make one's peace' = to experience serenity.",
          answer: "Wrong. It means to end a quarrel.",
        },
      ],
      traps: [
        {
          title: "Completely, not slightly",
          body:
            "**Another kettle of fish** is a completely different matter. 'Slightly different matter' changes only one word, and that word is the question.",
        },
        {
          title: "Peace with someone, not peace of mind",
          body:
            "To **make one's peace** is to end a quarrel with someone. 'To experience serenity' is inner calm, which needs no other person.",
        },
        {
          title: "Pockets are about time, not money",
          body:
            "People who **live in each other's pockets** are together too much. Options about sharing, exchanging or borrowing money read the pocket literally.",
        },
        {
          title: "Different, not quarrelling",
          body:
            "**Apples and oranges** are too unlike to compare. 'People who argue a lot' and 'people who fight over minor issues' turn a comparison into a quarrel.",
        },
      ],
    },
  ],
};
