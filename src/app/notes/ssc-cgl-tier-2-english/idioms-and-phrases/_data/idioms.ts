import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EID_IDIOMS_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Meaning and Use",
  title: "Idioms: Meaning and Use",
  oneLineDefinition:
    "Tier II asks idioms two ways: give the meaning of a highlighted idiom, or choose the idiom that completes a sentence or a dialogue.",
  whyItMatters:
    "16 questions in the Tier II bank, 10 asking for a meaning and 6 asking which idiom fits. Each is a one-line recall question worth full marks in seconds if the idiom is known.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2eidid-meaning",
      name: "Meaning of a given idiom",
      intuition:
        "The question shows an idiom, often in bold inside a sentence, and asks what it means. The literal reading is almost always one of the wrong options, so an option that talks about salt, teeth or tailoring is a trap.",
      definition:
        "How to answer:\n" +
        "- **Drop the literal picture.** 'A stitch in time' is not about sewing; the option about tailoring is the bait.\n" +
        "- **Use the sentence.** 'escaped by the skin of his teeth' sits next to 'escaped', so the meaning is about escaping narrowly.\n" +
        "- **Check the tone.** Is the idiom praising, warning or doubting? Remove options with the wrong tone first.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["With a pinch of salt", "With doubt about its truth", "2022"] },
          { cells: ["Running around in circles", "Very busy but achieving little", "2022"] },
          { cells: ["By the skin of one's teeth", "Only just, narrowly", "2022"] },
          { cells: ["A chip off the old block", "Like one's parent in nature", "2022"] },
          { cells: ["Achilles' heel", "A weak or vulnerable point", "2022"] },
          { cells: ["Water under the bridge", "Past matters no longer important", "2022"] },
          { cells: ["A Catch 22 situation", "A trap where every way out is blocked", "2022"] },
          { cells: ["Pull out all the stops", "Do everything possible to succeed", "2024"] },
          { cells: ["A stitch in time saves nine", "Acting early saves later trouble", "2025"] },
          { cells: ["Strain at a gnat and swallow a camel", "Fuss over small things, ignore big ones", "2025"] },
        ],
      },
      pyqExampleId: "a9be0f17-706b-4b66-874f-f9639a6a0e98",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Achilles' heel'. (a) A fast runner (b) A weak point (c) An injury to the foot (d) A brave warrior",
        steps: ["Achilles was a hero who could be hurt only at his heel.", "So the idiom means a weak or vulnerable point."],
        answer: "(b) A weak point",
      },
      practiceSet: [
        { prompt: "What does 'water under the bridge' mean?", answer: "Past matters that no longer matter" },
        { prompt: "What does 'a chip off the old block' mean?", answer: "Someone like their parent in nature" },
        { prompt: "What does 'pull out all the stops' mean?", answer: "Do everything possible to succeed" },
        { prompt: "What does 'by the skin of one's teeth' mean?", answer: "Only just, by a very narrow margin" },
      ],
      traps: [
        {
          title: "Picking the literal option",
          body: "SSC places an option that reads the words literally ('Tailoring is a valuable skill' for a stitch in time). An idiom's meaning is never its picture.",
        },
        {
          title: "Confusing 'running around in circles' with hard work",
          body: "It means being busy without getting anywhere. 'Very dynamic and hardworking' praises; the idiom criticises.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2eidid-use",
      name: "Choosing the idiom that fits",
      intuition:
        "Here the sentence or a short dialogue is given and the gap needs an idiom. Decide what the gap must mean first (nervous, undecided, near, made peace), then find the idiom with that meaning in its exact fixed form.",
      definition:
        "How to answer:\n" +
        "- **Say the meaning in plain words** before reading the options: 'After years of not speaking, the brothers decided to ___' needs 'make peace'.\n" +
        "- **Check the exact form.** Idioms do not change words: cold feet, not cold foot or hot feet; not my cup of tea, not my cup of coffee.\n" +
        "- **In a dialogue,** Person A's line gives the feeling (nervous, not interested) and Person B names it.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["At a stone's throw", "Very near", "2022"] },
          { cells: ["Bite the bullet", "Face something painful bravely", "2023"] },
          { cells: ["Bury the hatchet", "End a quarrel, make peace", "2023"] },
          { cells: ["Get cold feet", "Become too nervous to go ahead", "2024"] },
          { cells: ["Sit on the fence", "Not take a side", "2024"] },
          { cells: ["Not my cup of tea", "Not something I like", "2024"] },
        ],
      },
      pyqExampleId: "a968096e-40b7-4972-b4a3-fc4d4aeee568",
      selfCheckExample: {
        prompt: "Choose the idiom for the gap: My school is so close that it is just ___ from my house. (a) at sea (b) at a stone's throw (c) in hot water (d) up in the air",
        steps: ["The gap must mean 'very near'.", "At a stone's throw means very near."],
        answer: "(b) at a stone's throw",
      },
      practiceSet: [
        { prompt: "Which idiom means 'not take a side in an argument'?", answer: "Sit on the fence" },
        { prompt: "Which idiom means 'become too nervous to do something planned'?", answer: "Get cold feet" },
        { prompt: "Which idiom means 'face a painful situation bravely'?", answer: "Bite the bullet" },
      ],
      traps: [
        {
          title: "Accepting a changed word",
          body: "Options like 'cold foot', 'hot feet' or 'not my cup of coffee' look close but are not idioms. Only the fixed form is correct.",
        },
        {
          title: "Choosing an idiom that starts the same way",
          body: "Bury the hatchet, burn the midnight oil and blow off steam all begin with b; only the meaning the gap needs decides.",
        },
      ],
    },
  ],
};
