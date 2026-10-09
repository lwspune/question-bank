import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_CLOCKS_NOTE: SubtopicNote = {
  subtopicName: "Clocks and Calendars",
  title: "Clock Hands, Elapsed Time and Days of the Week",
  oneLineDefinition:
    "Clock hands turn at fixed rates, and days repeat in cycles of 7, so time puzzles reduce to a rate times a time, or a remainder.",
  whyItMatters:
    "A 2025 ministry question gave a time on an analogue clock and asked what it shows after the minute hand completes a number of turns. A 2013 Cambridge question asked for the time shown by a clock with an unusual face.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-spa-hand-rotation",
      name: "Clock hands: rotations, degrees and elapsed time",
      intuition:
        "The minute hand makes one full turn every hour, so its turns are hours in disguise. The hour hand makes one full turn every 12 hours, so it moves 30° per hour. Convert the turn or the angle into minutes, then add the minutes to the starting time.",
      definition:
        "- **Minute hand**: 1 full turn = 60 minutes; it moves \\(360° / 60 = 6°\\) per minute.\n" +
        "- **Hour hand**: 1 full turn = 12 hours; it moves \\(360° / 12 = 30°\\) per hour, which is \\(0.5°\\) per minute.\n" +
        "- A quarter turn of the minute hand is 15 minutes; 0.75 of a turn is 45 minutes.\n" +
        "- Past 12:00 the time continues on the other half of the day: on a 24-hour clock, add 12 to afternoon hours.",
      formula: {
        label: "Converting hand movement to time",
        latex: "\\text{minutes} = 60 \\times (\\text{minute-hand turns}) = 2 \\times (\\text{hour-hand degrees})",
        symbols: [
          { symbol: "\\(6°\\)", meaning: "minute hand, per minute" },
          { symbol: "\\(0.5°\\)", meaning: "hour hand, per minute" },
        ],
      },
      authoredExample: {
        prompt:
          "A clock shows 10:10 in the morning. The minute hand then completes \\(2\\tfrac{1}{3}\\) turns. What time is it now, and through how many degrees has the hour hand turned?",
        steps: [
          "\\(2\\tfrac{1}{3}\\) turns \\(= 2\\tfrac{1}{3} \\times 60 = 140\\) minutes = 2 hours 20 minutes.",
          "10:10 plus 2 h 20 min is 12:30, just after midday.",
          "Hour hand: \\(140 \\times 0.5° = 70°\\).",
        ],
        answer: "12:30 pm; the hour hand turns 70°",
      },
      selfCheckExample: {
        prompt: "A clock shows 7:40. The hour hand then turns through 75°. What time does the clock show now?",
        options: ["10:10", "8:55", "10:40", "9:55", "7:52:30"],
        steps: [
          "The hour hand moves 30° per hour, so 75° is \\(75 / 30 = 2.5\\) hours.",
          "7:40 plus 2 h 30 min is 10:10.",
          "B treats 75° as 75 minutes. E uses the minute hand's rate of 6° per minute. C adds 3 hours instead of 2.5.",
        ],
        answer: "(A) 10:10",
      },
      practiceSet: [
        { prompt: "Through how many degrees does the minute hand turn in 25 minutes?", answer: "150°", method: "\\(25 \\times 6\\)" },
        { prompt: "How long does the hour hand take to turn through 90°?", answer: "3 hours", method: "\\(90 / 30\\)" },
        { prompt: "At 11:15 pm the minute hand starts 3.5 full turns. What time is it when it finishes?", answer: "2:45 am", method: "3.5 turns = 3 h 30 min" },
      ],
      traps: [
        {
          title: "Degrees of the hour hand are not minutes",
          body: "The hour hand moves only 0.5° per minute, so 75° of the hour hand is 150 minutes, not 75. Always say which hand has moved before converting.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-hand-angle",
      name: "The angle between the hour hand and the minute hand",
      intuition:
        "Measure both hands from 12 o'clock. The minute hand is at 6° per minute. The hour hand is at 30° per hour plus the extra 0.5° per minute it has crept since the hour began. The angle between them is the difference, and you take the smaller way round.",
      definition:
        "At \\(H\\) hours and \\(M\\) minutes, measured clockwise from 12:\n" +
        "- Minute hand: \\(6M\\) degrees.\n" +
        "- Hour hand: \\(30H + 0.5M\\) degrees (use \\(H\\) from 0 to 11).\n" +
        "- The angle between them is the difference; if it is over 180°, subtract it from 360°.\n" +
        "- The hands **overlap** when the difference is 0. This happens 11 times in 12 hours, about every 65.5 minutes.",
      formula: {
        label: "Angle between the hands",
        latex: "\\theta = \\lvert 30H - 5.5M \\rvert \\qquad (\\text{if } \\theta > 180°, \\text{ use } 360° - \\theta)",
        symbols: [
          { symbol: "\\(H\\)", meaning: "hour shown, 0 to 11" },
          { symbol: "\\(M\\)", meaning: "minutes past the hour" },
        ],
      },
      authoredExample: {
        prompt: "What is the angle between the hands of a clock at 4:20?",
        steps: [
          "Hour hand: \\(30 \\times 4 + 0.5 \\times 20 = 130°\\). Minute hand: \\(6 \\times 20 = 120°\\).",
          "Difference: \\(130 - 120 = 10°\\). With the formula: \\(\\lvert 120 - 110 \\rvert = 10°\\).",
        ],
        answer: "10°",
      },
      selfCheckExample: {
        prompt: "What is the smaller angle between the hands of a clock at 7:30?",
        options: ["60°", "30°", "45°", "15°", "0°"],
        steps: [
          "\\(\\theta = \\lvert 30 \\times 7 - 5.5 \\times 30 \\rvert = \\lvert 210 - 165 \\rvert = 45°\\).",
          "At 7:30 the hour hand is halfway between 7 and 8, not on the 7.",
          "B leaves the hour hand on the 7 (one 30° division from the 6). A counts two divisions.",
        ],
        answer: "(C) 45°",
      },
      practiceSet: [
        { prompt: "Angle between the hands at 3:00?", answer: "90°" },
        { prompt: "Angle between the hands at 9:45?", answer: "22.5°", method: "\\(\\lvert 270 - 247.5 \\rvert\\)" },
        { prompt: "Angle between the hands at 2:30?", answer: "105°", method: "\\(\\lvert 60 - 165 \\rvert\\)" },
        { prompt: "Between 3:00 and 4:00, at what time do the hands overlap?", answer: "\\(16\\tfrac{4}{11}\\) minutes past 3", method: "\\(90 = 5.5M\\)" },
      ],
      traps: [
        {
          title: "The hour hand moves between the hours",
          body: "At 7:30 the hour hand is not on the 7: it has moved \\(30 \\times 0.5° = 15°\\) towards the 8. Leaving it on the hour mark gives an angle that is off by \\(0.5M\\) degrees.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-spa-calendar",
      name: "Days of the week and times across midnight",
      intuition:
        "The days of the week repeat every 7 days, so only the remainder after dividing by 7 matters. In the same way the hours repeat every 24. The one real danger is counting: \"day 1\" is the start day itself, so day 100 is only 99 days later.",
      definition:
        "- **Day of the week**: \\(N\\) days after a given day, move forward by the remainder of \\(N \\div 7\\).\n" +
        "- **Inclusive counting**: if the start is day 1, then day \\(N\\) is \\(N - 1\\) days after it.\n" +
        "- A normal year has 365 days \\(= 52 \\times 7 + 1\\), so the same date falls one weekday later next year (two later after 29 February).\n" +
        "- **24-hour time**: add the hours and subtract 24 if the result passes midnight; the date moves on by one day.",
      formula: {
        label: "Weekday after N days",
        latex: "\\text{shift} = N \\bmod 7",
        symbols: [{ symbol: "\\(N \\bmod 7\\)", meaning: "the remainder when \\(N\\) is divided by 7" }],
      },
      authoredExample: {
        prompt: "Today is a Tuesday. What day of the week will it be in 45 days?",
        steps: [
          "\\(45 = 6 \\times 7 + 3\\), so the remainder is 3.",
          "Three days on from Tuesday: Wednesday, Thursday, Friday.",
        ],
        answer: "Friday",
      },
      selfCheckExample: {
        prompt:
          "A training course starts on a Thursday, which is day 1, and runs every day for 100 days. On which day of the week is day 100?",
        options: ["Saturday", "Friday", "Thursday", "Wednesday", "Sunday"],
        steps: [
          "Day 100 is 99 days after day 1. \\(99 = 14 \\times 7 + 1\\), so move on 1 day from Thursday.",
          "Day 100 is a Friday.",
          "A counts 100 days after the start (remainder 2), the classic off-by-one slip.",
        ],
        answer: "(B) Friday",
      },
      practiceSet: [
        { prompt: "What time is it 19 hours after 21:30?", answer: "16:30 the next day", method: "\\(21.5 + 19 - 24\\)" },
        { prompt: "1 March is a Monday. What day is 31 March?", answer: "Wednesday", method: "30 days later; remainder 2" },
        { prompt: "A normal year (365 days) starts on a Sunday. On which day does the next year start?", answer: "Monday", method: "365 leaves remainder 1" },
      ],
      traps: [
        {
          title: "Day 1 is the starting day",
          body: "If a course starts on day 1, day 100 is 99 days later, not 100. Counting both ends (or neither) moves the answer one weekday, and that neighbouring day is always an option.",
        },
      ],
    },
  ],
};
