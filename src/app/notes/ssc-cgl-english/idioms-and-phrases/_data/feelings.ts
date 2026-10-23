import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_FEELINGS_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Feelings and States of Mind",
  title: "Idioms: Feelings and States of Mind",
  oneLineDefinition:
    "Idioms for joy, sadness, anger and contempt, and for states of mind such as confusion, doubt and deep thought.",
  whyItMatters:
    "Twenty-four questions in the bank, 8 from the 2023 shifts, 10 from the 2024 shifts and 6 from the 2025 shifts. Each idiom names one feeling, so placing it as happy, sad, angry or confused is usually enough to choose.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidfe-emotions",
      name: "Joy, sadness, anger and contempt",
      intuition:
        "These idioms name a feeling, and each has a clear direction: delighted (walking on air, on cloud nine), low (a long face, at a low ebb, in the doldrums), angry (hit the roof, fly off the handle) or scornful (turn up one's nose at).",
      definition:
        "The groups:\n" +
        "- **Joy:** walking on air, on cloud nine.\n" +
        "- **Sadness and low spirits:** a long face, at a low ebb, in the doldrums, get up on the wrong side of the bed (be in a bad mood all day).\n" +
        "- **Anger and irritation:** hit the roof, get on someone's nerves, in high dudgeon (offended and indignant).\n" +
        "- **Scorn and ill feeling:** turn up one's nose at, bad blood (bitter feeling between people), care a hang (not care at all).\n" +
        "- **Disappointing someone:** take the wind out of someone's sails.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Walking on air", "Very happy", "2023"] },
          { cells: ["Get on someone's nerves", "Irritate someone", "2023"] },
          { cells: ["Bad blood", "Bitter feeling between people", "2023"] },
          { cells: ["Take the wind out of someone's sails", "Spoil someone's confidence or plans", "2023"] },
          { cells: ["On cloud nine", "Very delighted", "2024"] },
          { cells: ["Hit the roof", "Become very angry", "2024"] },
          { cells: ["At a low ebb", "In a weak or low state", "2024"] },
          { cells: ["Pull a long face", "Look sad", "2024"] },
          { cells: ["Turn up one's nose at", "Treat with contempt", "2024"] },
          { cells: ["In the doldrums", "In low spirits or inactive", "2025"] },
          { cells: ["In high dudgeon", "Offended and indignant", "2025"] },
        ],
      },
      pyqExampleId: "1e090077-e1e8-4b02-b8cc-81aa5dfc2080",
      selfCheckExample: {
        prompt: "Choose the meaning of 'On cloud nine'. (a) Very worried (b) Very delighted (c) Very tired (d) Lost",
        steps: ["Being high up on a cloud suggests floating with happiness.", "It means very delighted."],
        answer: "(b) Very delighted",
      },
      practiceSet: [
        { prompt: "What does 'hit the roof' mean?", answer: "Become very angry" },
        { prompt: "What does 'in the doldrums' mean?", answer: "In low spirits or inactive" },
        { prompt: "What does 'bad blood' mean?", answer: "Bitter feeling between people" },
        { prompt: "What does 'turn up one's nose at' mean?", answer: "Treat with contempt" },
      ],
      traps: [
        {
          title: "Reading 'at a low ebb' as calm",
          body: "Ebb is the tide going out; at a low ebb means weak or in low spirits, not peaceful.",
        },
        {
          title: "Taking 'walking on air' as dreaming",
          body: "It means feeling very happy, as if too light to touch the ground.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidfe-mind",
      name: "Confusion, doubt and deep thought",
      intuition:
        "These idioms describe the state of a person's mind rather than a feeling: confused (at sea, at one's wits' end), undecided (in two minds, on the fence), out of place (a fish out of water), lost in thought (chew the cud) or hoping for the impossible (a pipe dream).",
      definition:
        "The groups:\n" +
        "- **Confused or desperate:** at sea, at one's wits' end.\n" +
        "- **Undecided:** in two minds, on the fence.\n" +
        "- **Uncomfortable:** like a fish out of water.\n" +
        "- **Thinking:** chew the cud (think over carefully).\n" +
        "- **Unreal hopes:** a pipe dream.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["A pipe dream", "A hope that will never come true", "2023"] },
          { cells: ["Chew the cud", "Think something over carefully", "2023, 2025"] },
          { cells: ["In two minds", "Unable to decide", "2023"] },
          { cells: ["At one's wits' end", "So worried that one does not know what to do", "2024"] },
          { cells: ["On the fence", "Undecided between two choices", "2024"] },
          { cells: ["Like a fish out of water", "Uncomfortable in a strange place", "2024"] },
        ],
      },
      pyqExampleId: "f8c8eca7-ed69-4566-bacc-e1c0e53a7ac5",
      selfCheckExample: {
        prompt: "Choose the meaning of 'A pipe dream'. (a) A sound sleep (b) A hope that will never come true (c) A plumbing job (d) A clear plan",
        steps: ["A pipe dream is a wish with no chance of happening.", "It means a hope that will never come true."],
        answer: "(b) A hope that will never come true",
      },
      practiceSet: [
        { prompt: "What does 'in two minds' mean?", answer: "Unable to decide" },
        { prompt: "What does 'chew the cud' mean?", answer: "Think something over carefully" },
        { prompt: "What does 'like a fish out of water' mean?", answer: "Uncomfortable in a strange place" },
        { prompt: "What does 'at one's wits' end' mean?", answer: "So worried that one does not know what to do" },
      ],
      traps: [
        {
          title: "Reading 'at sea' as being on holiday",
          body: "At sea here means confused or lost, not on a voyage.",
        },
        {
          title: "Taking 'chew the cud' as eating",
          body: "Cows chew the cud slowly over and over; for people it means thinking something over carefully.",
        },
      ],
    },
  ],
};
