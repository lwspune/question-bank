import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CL_SPEEDS_NOTE: SubtopicNote = {
  subtopicName: "Angle Covered by the Hands",
  title: "How Fast the Hands Turn",
  oneLineDefinition:
    "The minute hand turns 6° a minute and the hour hand half a degree, so the minute hand gains 5.5° on the hour hand every minute.",
  whyItMatters:
    "This page holds the three speeds every other clock question is built on, and most of its questions are one multiplication. The marks go when the hour hand is taken to sit still on its number instead of creeping half a degree each minute, or when a gap is divided by 6 instead of 5.5.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afcl-hand-speeds",
      name: "The speeds of the two hands",
      intuition:
        "A hand's speed is one full turn, 360°, divided by the time that turn takes. The minute hand needs an hour for it and the hour hand needs 12 hours, so the minute hand is 12 times as fast.",
      definition:
        "- The dial has 12 hour marks, so two neighbouring numbers are \\(30°\\) apart.\n" +
        "- It has 60 minute marks, so two neighbouring minute marks are \\(6°\\) apart.\n" +
        "- The hour hand does not jump from number to number. Between 4 and 5 it moves steadily, a little each minute.",
      table: {
        columns: ["Hand", "One full turn takes", "Degrees per hour", "Degrees per minute"],
        rows: [
          { cells: ["Minute hand", "60 minutes", "\\(360°\\)", "\\(6°\\)"] },
          {
            cells: ["Hour hand", "12 hours", "\\(30°\\)", "\\(0.5°\\)"],
            noteAmber: "Half a degree a minute: in 20 minutes the hour hand moves 10°, a third of the way to the next number.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "How many degrees does each hand turn in 20 minutes?",
        steps: ["Minute hand: \\(20 \\times 6 = 120°\\).", "Hour hand: \\(20 \\times 0.5 = 10°\\)."],
        answer: "\\(120°\\) and \\(10°\\).",
      },
      practiceSet: [
        { prompt: "How many degrees does the hour hand turn in 3 hours?", answer: "\\(90°\\)" },
        { prompt: "How many minutes does the minute hand take to turn \\(90°\\)?", answer: "15 minutes" },
        { prompt: "How many degrees apart are the numbers 2 and 7 on a dial?", answer: "\\(150°\\)", method: "Five gaps of \\(30°\\)." },
        { prompt: "How many minutes does the hour hand take to turn \\(1°\\)?", answer: "2 minutes" },
      ],
      pyqExampleId: "e49881db-d82e-4439-9094-d7a3f1944068",
      traps: [
        {
          title: "6° a minute is the minute hand",
          body: "The hour hand covers only \\(30°\\) in a whole hour, so it moves \\(30 \\div 60 = 0.5°\\) a minute. Giving it \\(6°\\) a minute makes it as fast as the minute hand.",
        },
        {
          title: "Per hour or per minute",
          body: "The minute hand turns \\(360°\\) an hour and \\(6°\\) a minute. Read the unit in the question before picking, because the options often carry both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-angle-traced",
      name: "How far a hand turns in a given time",
      intuition:
        "Degrees turned are speed times time. For the hour hand measured from 12 o'clock, count the full hours at \\(30°\\) each and add half a degree for every minute past the hour.",
      definition:
        "- Minute hand: degrees turned \\(= 6 \\times\\) minutes.\n" +
        "- Hour hand from 12 o'clock at \\(h{:}m\\): \\(30h + 0.5m\\) degrees.\n" +
        "- Between two clock times, count the time first, going forward round the dial (11 o'clock to 2 o'clock is 3 hours), then multiply.",
      formula: {
        label: "Degrees turned",
        latex: "\\theta_{\\text{hour}} = 30h + 0.5m, \\qquad \\theta_{\\text{minute}} = 6m",
      },
      authoredExample: {
        prompt:
          "How far has the hour hand turned from 12 o'clock at 5:20? How far does the minute hand turn between 5:20 and 5:55?",
        steps: [
          "Hour hand: \\(5 \\times 30 + 20 \\times 0.5 = 150 + 10 = 160°\\).",
          "From 5:20 to 5:55 is 35 minutes, so the minute hand turns \\(35 \\times 6 = 210°\\).",
        ],
        answer: "\\(160°\\); \\(210°\\).",
      },
      selfCheckExample: {
        prompt: "How many degrees does the hour hand turn between 11 o'clock and 4 o'clock?",
        steps: ["Going forward from 11 to 4 is 5 hours.", "\\(5 \\times 30 = 150°\\)."],
        answer: "\\(150°\\).",
      },
      practiceSet: [
        { prompt: "How many degrees does the minute hand turn in 50 minutes?", answer: "\\(300°\\)" },
        { prompt: "How far is the hour hand from 12 o'clock at 7:30?", answer: "\\(225°\\)" },
        { prompt: "How many degrees does the hour hand turn in 1 hour 40 minutes?", answer: "\\(50°\\)", method: "100 minutes at \\(0.5°\\)." },
        { prompt: "How many degrees does the hour hand turn from 6 o'clock to 10 o'clock?", answer: "\\(120°\\)" },
      ],
      pyqExampleId: "f9b84f78-7396-43a8-b4d3-c1e7a9b4c45a",
      traps: [
        {
          title: "The hour hand is past its number",
          body: "At 2:40 the hour hand is not on the 2. It has moved \\(40 \\times 0.5 = 20°\\) beyond it, so it is \\(80°\\) from 12, not \\(60°\\).",
        },
        {
          title: "Count the hours forward",
          body: "From 10 o'clock to 2 o'clock is 4 hours (10 to 12, then 12 to 2), so the hour hand turns \\(120°\\). Taking \\(10 - 2 = 8\\) hours counts the wrong way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-relative-speed",
      name: "The minute hand gains 5.5° a minute",
      intuition:
        "Both hands turn the same way. Each minute the minute hand turns \\(6°\\) and the hour hand \\(0.5°\\), so the gap between them changes by \\(5.5°\\) a minute, like a faster runner gaining on a slower one.",
      definition:
        "- Relative speed \\(= 6 - 0.5 = 5.5°\\) per minute, which is \\(330°\\) per hour.\n" +
        "- Time to open or close a gap of \\(\\theta\\) degrees: \\(\\theta \\div 5.5 = \\tfrac{2\\theta}{11}\\) minutes.\n" +
        "- A full lap of \\(360°\\) takes \\(\\tfrac{720}{11} = 65\\tfrac{5}{11}\\) minutes, a little more than an hour.\n" +
        "- Dividing by 5.5 is multiplying by \\(\\tfrac{2}{11}\\). The elevenths in clock answers come from here.",
      formula: {
        label: "Time to change the gap",
        latex: "t = \\dfrac{\\theta}{5.5} = \\dfrac{2\\theta}{11} \\text{ minutes}",
      },
      authoredExample: {
        prompt:
          "At 12:00 the hands are together. After how many minutes are they \\(66°\\) apart for the first time, and what time is it then?",
        steps: [
          "The gap grows by \\(5.5°\\) a minute.",
          "\\(66 \\div 5.5 = 12\\) minutes.",
          "Check at 12:12: the minute hand is at \\(72°\\), the hour hand at \\(6°\\), a gap of \\(66°\\).",
        ],
        answer: "12 minutes, at 12:12.",
      },
      selfCheckExample: {
        prompt: "At 4:00 the hour hand is \\(120°\\) ahead of the minute hand. How many minutes until the minute hand catches it?",
        steps: ["\\(120 \\div 5.5 = \\tfrac{240}{11} = 21\\tfrac{9}{11}\\) minutes."],
        answer: "\\(21\\tfrac{9}{11}\\) minutes, at about 4:22.",
      },
      practiceSet: [
        { prompt: "How many degrees does the minute hand gain on the hour hand in 20 minutes?", answer: "\\(110°\\)" },
        { prompt: "From 12:00, after how many minutes are the hands \\(33°\\) apart?", answer: "6 minutes" },
        { prompt: "How many degrees does the minute hand gain on the hour hand in 2 hours?", answer: "\\(660°\\)" },
      ],
      pyqExampleId: "b1281f53-1f6e-443f-be40-3241ca6d3fd3",
      traps: [
        {
          title: "Use 5.5, not 6",
          body: "The gap does not grow at \\(6°\\) a minute, because the hour hand moves too. From 12:00 a gap of \\(44°\\) takes \\(44 \\div 5.5 = 8\\) minutes, not \\(44 \\div 6\\).",
        },
        {
          title: "A lap takes more than 60 minutes",
          body: "In 60 minutes the minute hand gains only \\(330°\\), short of a full lap. The hands meet every \\(65\\tfrac{5}{11}\\) minutes, not every hour.",
        },
      ],
    },
  ],
};
