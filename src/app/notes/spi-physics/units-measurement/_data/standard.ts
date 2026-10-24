import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_UN_STANDARD_NOTE: SubtopicNote = {
  subtopicName: "Standard Units and Time",
  title: "Standard Units and Time",
  oneLineDefinition:
    "A standard unit is one agreed quantity used by everyone, so that the same thing gives the same measurement anywhere; time is measured in such units, from the second up to the millennium.",
  whyItMatters:
    "Four questions in the bank, all EASY: why a standard unit is needed, how small lengths were measured in ancient India, which of four phrases is not a time interval, and the name for 1000 years. Each is one fact from the two tables on this page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiunst-standard",
      name: "Why we need standard units",
      intuition:
        "Measure a table with your handspan and a friend measures it with theirs: you get different numbers for the same table. Body measures change from person to person, so people agreed on fixed units that mean the same thing for everyone.",
      definition:
        "- **Measurement** compares a quantity with a fixed amount called a **unit**: '2 metres' means two of the unit 'metre'.\n" +
        "- A **standard unit** is the same everywhere. Its purpose is **uniformity in measurement**; trade and record keeping only benefit from it.\n" +
        "- Old body measures were not standard, because hands, arms and feet differ in size.\n" +
        "- The French made the metric system around 1790. Today the **SI** (International System of Units) is used worldwide; its unit of length is the **metre**.",
      table: {
        columns: ["Old unit", "Measured with"],
        rows: [
          { cells: ["Angul", "The width of a finger"] },
          { cells: ["Mutthi", "A closed fist"] },
          { cells: ["Handspan (balisht)", "The stretch from thumb tip to little finger tip"] },
          { cells: ["Cubit", "The length from the elbow to the tip of the fingers"] },
          { cells: ["Foot", "The length of a person's foot"] },
          { cells: ["Pace", "The length of one step"] },
        ],
        caption: "Ancient India measured small lengths in anguls and mutthis; the cubit was for longer lengths such as cloth.",
      },
      selfCheckExample: {
        prompt: "Two students measure the same desk with their handspans and get 8 spans and 9 spans. Why do they differ, and what is the remedy?",
        steps: ["Their handspans are of different sizes.", "A standard unit, the same for everyone, removes the difference."],
        answer: "Handspans differ; use a standard unit such as the metre",
      },
      practiceSet: [
        { prompt: "What part of the body is a mutthi?", answer: "A closed fist" },
        { prompt: "What length is a cubit?", answer: "From the elbow to the tip of the fingers" },
        { prompt: "Which country first made the metric system?", answer: "France" },
        { prompt: "Why are body parts not reliable units of length?", answer: "They differ in size from person to person" },
      ],
      pyqExampleId: "d52f7369-3cab-4f82-9a18-1a704fbef19c",
      traps: [
        {
          title: "Giving a use as the purpose",
          body: "Buying, selling and keeping records all use standard units, but the reason a standard exists is uniformity: the same measurement for the same quantity everywhere.",
        },
        {
          title: "Calling the yard an ancient Indian unit",
          body: "The yard and the foot are British units and the metre is modern. Ancient India measured small lengths with the angul and the mutthi.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiunst-time",
      name: "Instants, intervals and units of time",
      intuition:
        "'At sunrise' names a moment; 'for a minute' names a stretch of time. A clock reading is an instant, and the time between two readings is an interval. Units of time measure intervals.",
      definition:
        "- An **instant** is a single moment: the time of sunrise, 9 o'clock, noon.\n" +
        "- A **time interval** is the time between two instants: a second, a minute, a day, a year.\n" +
        "- The SI unit of time is the **second** (s).",
      table: {
        columns: ["Unit", "Equal to"],
        rows: [
          { cells: ["Minute", "60 seconds"] },
          { cells: ["Hour", "60 minutes, or 3600 seconds"] },
          { cells: ["Day", "24 hours, or 86400 seconds"] },
          { cells: ["Year", "365 days (a leap year has 366)"] },
          { cells: ["Decade", "10 years"] },
          { cells: ["Century", "100 years"] },
          {
            cells: ["Millennium", "1000 years"],
            noteAmber: "Ten centuries make a millennium.",
          },
        ],
        caption: "A trillion is a number (a million million), not a unit of time.",
      },
      selfCheckExample: {
        prompt: "How many seconds are there in one day?",
        steps: ["One day is 24 hours, and each hour is 3600 s.", "\\(24 \\times 3600 = 86400\\) s."],
        answer: "86400 s",
      },
      practiceSet: [
        { prompt: "How many years are there in three centuries?", answer: "300" },
        { prompt: "Is 'noon' an instant or a time interval?", answer: "An instant" },
        { prompt: "How many days does a leap year have?", answer: "366" },
        { prompt: "How many years make two decades?", answer: "20" },
      ],
      pyqExampleId: "9723f2ee-00fb-4596-81e5-e9223cf26b30",
      traps: [
        {
          title: "Calling a moment an interval",
          body: "The time of sunrise, or 'at 5 o'clock', is an instant. An interval always lasts for some time, like a minute or a day.",
        },
        {
          title: "Mixing up century and millennium",
          body: "A century is 100 years and a millennium is 1000 years. A decade is 10 years.",
        },
        {
          title: "Taking a trillion for a span of time",
          body: "A trillion is a number, a million million. It is not a unit of time, so it cannot name 1000 years.",
        },
      ],
    },
  ],
};
