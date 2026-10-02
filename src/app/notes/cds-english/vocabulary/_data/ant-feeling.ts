import type { SubtopicNote } from "@/app/notes/_types";

const COLUMNS = ["Word", "Meaning", "Opposite", "Other options", "Sitting"];

export const CDSEN_ANT_FEELING_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: Feelings and Calm",
  title: "Antonyms: words for feelings and calm",
  oneLineDefinition:
    "Words for happy and sad moods, for a steady or a shaken mind, and for peace or uproar, with the opposites CDS has asked for.",
  whyItMatters:
    "Feeling words are easy to place on a scale: happy or sad, calm or shaken, peaceful or wild. The examiner then fills the options with other words from the same end of the scale. " +
    "If you know which end the tested word sits at, the answer is the one option at the other end.",
  concepts: [
    // C1 — joy and gloom
    {
      kind: "reference" as const,
      slug: "cdsenant-mood",
      name: "Joy and gloom",
      intuition:
        "Picture a line from deep sadness to great joy. Every word here sits near one end. The opposite is the word near the other end, not a word in the middle such as 'sober' or 'thoughtful'.",
      definition:
        "- **Gloom:** morose (gloomy, sullen), woebegone (miserable), plaintive (sad-sounding), melancholic, doleful, despondent, despair (loss of hope), depressed.\n" +
        "- **Joy:** cheerful, gleeful, elated and elation (overjoyed), sanguine (cheerfully hopeful), hilarious (very funny), jovial.\n" +
        "- **Comfort and worry:** solace (comfort in distress) against aggravation (making a trouble worse).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["sanguine", "cheerfully hopeful", "pessimistic", "optimistic (synonym), humorous, rebellious", "2018 (II)"], pyqExampleId: "a224ce62-1163-4221-8319-813eca34098c" },
          { cells: ["woebegone", "sad and miserable", "cheerful", "sad (synonym), sleepy, thoughtful", "2018 (II)"], pyqExampleId: "96dd6fa4-1290-4f85-a0c9-b0a39de58ede" },
          { cells: ["elated", "very happy, overjoyed", "depressed", "feels good, excited (synonyms), sober", "2020 (I)"], pyqExampleId: "aa2646c4-0052-48a8-9f33-8a6890cc37b2" },
          { cells: ["despair", "loss of all hope", "elation", "despondency (synonym), determination, dependant", "2021 (II)"], pyqExampleId: "5b544c8e-1738-4d23-85ee-e67fa14aab69" },
          { cells: ["plaintive", "sad, mournful (of a sound)", "gleeful", "melancholic, doleful (synonyms), adventurous", "2019 (II)"], pyqExampleId: "2c183c7b-0318-4894-a011-382b4f527c7b" },
          { cells: ["morose", "gloomy and sullen", "cheerful", "melancholic, sullen (synonyms), disinterested", "2026 (II)"], pyqExampleId: "933909ff-a954-4b19-b201-e6f74d1abf27" },
          { cells: ["hilarious", "extremely funny", "serious", "amusing, delightful (synonyms), momentous", "2017 (II)"], pyqExampleId: "d01539ff-97cb-4c21-92e1-e754805f8727" },
          { cells: ["hilarious", "extremely funny", "tragic", "uproarious, jovial (synonyms), serious", "2021 (II)"], noteAmber: "Serious also runs against hilarious. For a film, tragic is the closer opposite: a tragedy against a comedy.", pyqExampleId: "de4579ca-f7c3-4195-a8dc-18414e0ab9a1" },
          { cells: ["solace", "comfort in a time of distress", "aggravation", "comfort, relief (synonyms), punishment", "2021 (I)"], pyqExampleId: "520beaf6-95b3-47fb-ab8c-5c70ee1b435d" },
        ],
        caption: "Hilarious has been set twice: serious was the opposite once, tragic once.",
      },
      pyqExampleId: "933909ff-a954-4b19-b201-e6f74d1abf27",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The children were \\(\\underline{\\text{jubilant}}\\) after the match. (a) overjoyed (b) dejected (c) thrilled (d) exultant",
        steps: [
          "Meaning: 'jubilant' means full of joy after a success.",
          "Overjoyed, thrilled and exultant sit at the same end: strike them.",
          "Dejected (sad and low in spirit) is at the other end.",
        ],
        answer: "(b) dejected",
      },
      practiceSet: [
        { prompt: "Opposite of 'elated'?", answer: "depressed" },
        { prompt: "Opposite of 'plaintive' (sad-sounding)?", answer: "gleeful" },
        { prompt: "Opposite of 'sanguine' (cheerfully hopeful)?", answer: "pessimistic", method: "Optimistic is its synonym." },
        { prompt: "Opposite of 'solace' (comfort)?", answer: "aggravation" },
      ],
      traps: [
        {
          title: "A middle word is not the far end",
          body:
            "For a joyful word, 'sober' or 'thoughtful' may look like opposites because they are not cheerful. They sit in the middle of the scale. The answer is the word at the far end: depressed, gloomy, miserable.",
        },
      ],
    },

    // C2 — composure and fear
    {
      kind: "reference" as const,
      slug: "cdsenant-nerve",
      name: "Composure and fear",
      intuition:
        "Words for a mind that stays steady, and words for a mind that is shaken by worry or fear. 'Composed' is the main opposite in this family: it was the answer for two different worried words.",
      definition:
        "- **Steady:** composed (calm and in control), equanimity (calmness of mind), tranquillity, placidity.\n" +
        "- **Shaken:** distraught (deeply upset), anxious (worried), agitated, flustered, rattled, perturbed.\n" +
        "- **Frightening and encouraging:** daunting and intimidating (making someone afraid) against encouraging and supportive.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["distraught", "deeply upset, out of one's mind with worry", "composed", "flustered, rattled, perturbed (synonyms)", "2026 (I)"], pyqExampleId: "1c1c974c-11d7-470c-a337-6fdb5b4d9968" },
          { cells: ["equanimity", "calmness of mind", "agitation", "tranquillity, composure, placidity (synonyms)", "2024 (I)"], pyqExampleId: "0559ffc6-fd8f-41ab-91e1-d3200b27e057" },
          { cells: ["anxious", "worried, uneasy", "composed", "careless, heedless (a pair of each other), certain", "2018 (I)"], pyqExampleId: "dfc976ea-6d7d-4c6c-9fcd-404fbc7f14b7" },
          { cells: ["daunting", "frightening, discouraging", "encouraging", "demoralizing, off-putting (synonyms), uncomfortable", "2019 (II)"], pyqExampleId: "a1af89cf-c028-433d-aa73-83a28f25baca" },
          { cells: ["intimidation", "frightening someone into obeying", "support", "wiles, conviction, persuasion (unrelated)", "2019 (II)"], pyqExampleId: "c3845812-14fc-46a1-adfb-0bcd52bb3d26" },
        ],
        caption: "Composed was the opposite of both distraught and anxious.",
      },
      pyqExampleId: "0559ffc6-fd8f-41ab-91e1-d3200b27e057",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. She remained \\(\\underline{\\text{unruffled}}\\) during the interview. (a) calm (b) serene (c) flustered (d) collected",
        steps: [
          "Meaning: 'unruffled' means calm, not upset.",
          "Calm, serene and collected mean the same: strike them.",
          "Flustered (confused and nervous) is the opposite.",
        ],
        answer: "(c) flustered",
      },
      practiceSet: [
        { prompt: "Opposite of 'distraught'?", answer: "composed" },
        { prompt: "Opposite of 'daunting'?", answer: "encouraging" },
        { prompt: "Opposite of the noun 'intimidation'?", answer: "support", method: "A noun for a noun." },
      ],
      traps: [
        {
          title: "Not caring is not the same as calm",
          body:
            "For a worried word, options like 'careless' or 'carefree' can look like opposites: a worried person cares too much. But they describe not paying attention, not a steady mind. The opposite of worried is a calm word such as 'composed'. Two options that mean the same as each other also cannot both be right.",
        },
      ],
    },

    // C3 — calm and turmoil
    {
      kind: "reference" as const,
      slug: "cdsenant-turmoil",
      name: "Calm and turmoil",
      intuition:
        "These words describe a scene or a relationship rather than one mind: is it peaceful or stormy, orderly or wild? Many of them come from the weather: a storm is a tempest, and a stormy person or time is tempestuous.",
      definition:
        "- **Calm:** tranquil and tranquillity, peace, order, serenity, relaxed.\n" +
        "- **Turmoil:** tempestuous (stormy), turbulent, tumultuous, unrest, uproar, pandemonium (wild noise and confusion), chaos (total disorder), riotous.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["tempestuous", "stormy, violent in temper", "calm", "violent, fierce, vehement (synonyms)", "2019 (I)"], pyqExampleId: "b79dca95-0562-4539-bc2e-514bde6680f5" },
          { cells: ["tempestuous", "stormy, violent in temper", "relaxed", "passionate, intense (synonyms), windy (the weather sense)", "2020 (I)"], pyqExampleId: "391acf98-2f4d-4d79-ae6f-859423bdcb14" },
          { cells: ["tempestuous", "stormy, full of quarrels", "tranquil", "tumultuous, riotous (synonyms), belligerent", "2026 (I)"], pyqExampleId: "cd6cfea7-d13b-4ebd-b17d-c6d44ba7abe3" },
          { cells: ["turbulent", "full of disorder and conflict", "tranquil", "obstreperous (near-synonym), capricious, desolate", "2024 (I)"], pyqExampleId: "19041333-f3d5-47c3-a353-7e6a31dab07b" },
          { cells: ["tranquility", "peace and calm", "uproar", "calm, serenity (synonyms), sound", "2020 (II)"], pyqExampleId: "e34dc55e-e7a5-4768-a0ca-66fd8f263307" },
          { cells: ["unrest", "disturbance, public discontent", "calm", "turbulence, unease, apprehension (synonyms)", "2020 (II)"], pyqExampleId: "0ba88b6b-712d-41ea-9791-ba6bf2f9fc64" },
          { cells: ["pandemonium", "wild noise and confusion", "peace", "hullaballoo, uproar (synonyms), accolade", "2021 (II)"], pyqExampleId: "cfba9a7f-cc42-4395-bf87-7643b0a60e14" },
          { cells: ["chaos", "complete disorder", "order", "disorder, confusion (synonyms), uniformity", "2022 (I)"], pyqExampleId: "559eab9c-f32f-481a-8464-0f8dc6311885" },
        ],
        caption: "Tempestuous has been set three times, more than any other word in the antonym block; calm, relaxed and tranquil all served as its opposite.",
      },
      pyqExampleId: "cd6cfea7-d13b-4ebd-b17d-c6d44ba7abe3",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The meeting ended in \\(\\underline{\\text{commotion}}\\). (a) uproar (b) tumult (c) disturbance (d) quiet",
        steps: [
          "Meaning: 'commotion' means noisy confusion.",
          "Uproar, tumult and disturbance mean the same: strike them.",
          "Quiet reverses it.",
        ],
        answer: "(d) quiet",
      },
      practiceSet: [
        { prompt: "Opposite of 'pandemonium'?", answer: "peace" },
        { prompt: "Opposite of 'chaos'? (a) disorder (b) confusion (c) uniformity (d) order", answer: "(d) order", method: "Uniformity means sameness, not order." },
        { prompt: "Opposite of 'unrest'?", answer: "calm" },
        { prompt: "Opposite of the noun 'tranquillity'?", answer: "uproar" },
      ],
      traps: [
        {
          title: "The weather sense is a decoy",
          body:
            "When 'tempestuous' describes a person's behaviour, 'windy' is offered because a tempest is a storm. The sentence is about temper, not weather, so 'windy' is the wrong sense. The answer is a calm word.",
        },
        {
          title: "Sameness is not order",
          body:
            "For 'chaos', 'uniformity' looks tidy, but it means everything being the same. The opposite of disorder is 'order'.",
        },
      ],
    },
  ],
};
