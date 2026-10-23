import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_PEOPLE_NOTE: SubtopicNote = {
  subtopicName: "Idioms: People and Character",
  title: "Idioms: People and Character",
  oneLineDefinition:
    "Idioms that describe what a person is like (honest, cowardly, sharp, secretive) and how people stand with others (in charge, in second place, blamed, flattering).",
  whyItMatters:
    "Twenty-seven questions in the bank, 8 from the 2023 shifts, 9 from the 2024 shifts and 10 from the 2025 shifts. Most turn on one quality, good or bad, so deciding whether an idiom praises or blames someone settles most options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidpe-character",
      name: "What a person is like",
      intuition:
        "Character idioms name one quality: honest (a straight shooter), dishonest (sharp practice), brave or cowardly (lily-livered, show the white feather), alert (on the ball, nobody's fool), loyal only in good times (a fair-weather friend). Decide whether the idiom praises or blames before you read the options.",
      definition:
        "The groups:\n" +
        "- **Honest or not:** a straight shooter (upright and direct), sharp practice (dishonest dealing), show one's true colours (reveal one's real nature).\n" +
        "- **Brave or not:** lily-livered and show the white feather (cowardly), throw caution to the wind (take a risk).\n" +
        "- **Alert and shrewd:** on the ball, nobody's fool.\n" +
        "- **Habits and secrets:** a creature of habit, keep one's cards close to one's chest (keep plans hidden).\n" +
        "- **Unreliable friends:** a fair-weather friend (loyal only when things go well).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Show one's true colours", "Reveal one's real nature", "2023"] },
          { cells: ["Throw caution to the wind", "Take a risk", "2023"] },
          { cells: ["Sharp practice", "Dishonest dealing", "2023"] },
          { cells: ["Lily-livered", "Cowardly", "2023"] },
          { cells: ["Nobody's fool", "Not easily deceived", "2024"] },
          { cells: ["On the ball", "Alert and quick to react", "2024"] },
          { cells: ["A creature of habit", "Someone who always does things the same way", "2024"] },
          { cells: ["A fair-weather friend", "A friend only in good times", "2024"] },
          { cells: ["Keep one's cards close to one's chest", "Keep one's plans hidden", "2024"] },
          { cells: ["Show the white feather", "Act cowardly", "2025"] },
          { cells: ["Mad as a hatter", "Completely mad or very odd", "2025"] },
        ],
      },
      pyqExampleId: "16b7d6a4-0727-4f9a-b93f-3fce13abb921",
      selfCheckExample: {
        prompt: "Choose the meaning of 'A fair-weather friend'. (a) A friend met on holiday (b) A friend only in good times (c) A loyal friend (d) A friend who likes the outdoors",
        steps: ["Fair weather is good weather.", "A fair-weather friend stays only while things go well."],
        answer: "(b) A friend only in good times",
      },
      practiceSet: [
        { prompt: "What does 'lily-livered' mean?", answer: "Cowardly" },
        { prompt: "What does 'nobody's fool' mean?", answer: "Not easily deceived" },
        { prompt: "What does 'sharp practice' mean?", answer: "Dishonest dealing" },
        { prompt: "What does 'keep one's cards close to one's chest' mean?", answer: "Keep one's plans hidden" },
      ],
      traps: [
        {
          title: "Reading 'sharp practice' as skill",
          body: "Sharp can mean clever, but sharp practice is dishonest dealing, not skilful work.",
        },
        {
          title: "Taking 'show the white feather' as surrender with honour",
          body: "A white feather stands for cowardice in this idiom. It means to act like a coward.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidpe-dealings",
      name: "Standing and dealings with others",
      intuition:
        "These idioms describe a person's place among others: in charge (rule the roost), in second place (play second fiddle), blamed (a scapegoat), shifting blame (pass the buck), flattering (curry favour), obeying (toe the line), or meeting someone stronger than expected (catch a tartar).",
      definition:
        "The groups:\n" +
        "- **Power and place:** rule the roost (be in charge), play second fiddle (take a lesser role), dance attendance on (wait on someone eagerly).\n" +
        "- **Blame:** pass the buck (shift blame to another), make someone a scapegoat (blame them for others' faults).\n" +
        "- **Pleasing and obeying:** curry favour (flatter to win approval), toe the line (obey the rules).\n" +
        "- **Comparisons:** not fit to hold a candle to (far inferior to).\n" +
        "- **Bad company and bad timing:** sup with the devil, fiddle while Rome burns (waste time on trifles in a crisis).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Catch a tartar", "Meet someone stronger or tougher than expected", "2023"] },
          { cells: ["Pass the buck", "Shift the blame to another person", "2023"] },
          { cells: ["Dance attendance on", "Wait on someone eagerly", "2023"] },
          { cells: ["Rule the roost", "Be in charge", "2023"] },
          { cells: ["Make someone a scapegoat", "Blame someone for others' mistakes", "2024"] },
          { cells: ["A henpecked husband", "A husband ruled by his wife", "2024"] },
          { cells: ["Curry favour", "Seek approval by flattery", "2025"] },
          { cells: ["Toe the line", "Obey the rules exactly", "2025"] },
          { cells: ["Come of age", "Reach adulthood", "2025"] },
          { cells: ["Fiddle while Rome burns", "Waste time on trifles during a crisis", "2025"] },
          { cells: ["Not fit to hold a candle to", "Far inferior to", "2025"] },
        ],
      },
      pyqExampleId: "56e8616e-3d5c-4cb9-9c5b-f45b65c5e161",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Pass the buck'. (a) Lend money (b) Shift the blame to another person (c) Win a race (d) Share a reward",
        steps: ["The buck is the responsibility.", "Passing it means pushing the blame onto someone else."],
        answer: "(b) Shift the blame to another person",
      },
      practiceSet: [
        { prompt: "What does 'rule the roost' mean?", answer: "Be in charge" },
        { prompt: "What does 'curry favour' mean?", answer: "Seek approval by flattery" },
        { prompt: "What does 'toe the line' mean?", answer: "Obey the rules exactly" },
        { prompt: "What does 'not fit to hold a candle to' mean?", answer: "Far inferior to" },
      ],
      traps: [
        {
          title: "Reading 'curry favour' as cooking",
          body: "Curry here comes from an old word for grooming a horse. To curry favour is to flatter someone for their approval.",
        },
        {
          title: "Taking 'play second fiddle' as music",
          body: "It means to take a lesser role under someone else, whatever the field.",
        },
      ],
    },
  ],
};
