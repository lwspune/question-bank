import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CL_GIVEN_NOTE: SubtopicNote = {
  subtopicName: "Hands Coinciding, Opposite or at an Angle",
  title: "When the Hands Meet, Point Opposite or Form an Angle",
  oneLineDefinition:
    "Turn the angle formula round: the hands are θ degrees apart at 2/11 of (30h ± θ) minutes past h, and in 12 hours each position comes round a fixed number of times.",
  whyItMatters:
    "This is the hardest page of the chapter: a third of its questions are HARD. The method is one formula with a ± sign, and marks go when one of its two answers is dropped, or kept when it falls outside the hour, and when the 11 meetings in 12 hours are taken to be 12.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afcl-meet-oppose",
      name: "When the hands coincide or point opposite",
      intuition:
        "At \\(h\\) o'clock the minute hand is \\(30h\\) degrees behind the hour hand and gains \\(5.5°\\) a minute. It catches the hour hand once it has closed that gap, and points opposite once it is \\(180°\\) ahead, or \\(180°\\) behind.",
      definition:
        "- Coincide between \\(h\\) and \\(h + 1\\): \\(m = \\dfrac{30h}{5.5} = \\dfrac{60h}{11}\\) minutes past \\(h\\).\n" +
        "- Opposite: \\(5.5m = 30h \\pm 180\\). Keep the value that lies between 0 and 60.\n" +
        "- 'In a straight line' covers both coinciding and opposite. 'In a straight line but not together' means opposite.\n" +
        "- Between 11 and 12 the hands meet only at 12:00 itself, so there are 11 meetings in 12 hours, not 12.",
      formula: {
        label: "Coinciding and opposite hands",
        latex: "m = \\dfrac{60h}{11} \\;\\text{(together)}, \\qquad m = \\dfrac{2}{11}\\left(30h \\pm 180\\right) \\;\\text{(opposite)}",
      },
      authoredExample: {
        prompt: "When do the hands coincide between 5 and 6 o'clock, and when are they opposite between 2 and 3?",
        steps: [
          "Together: \\(m = \\tfrac{60 \\times 5}{11} = \\tfrac{300}{11} = 27\\tfrac{3}{11}\\), so at about 5:27.",
          "Opposite: \\(5.5m = 60 + 180 = 240\\), so \\(m = \\tfrac{480}{11} = 43\\tfrac{7}{11}\\). With the minus sign \\(60 - 180\\) is negative, so this is the only time.",
          "Check at \\(2{:}43\\tfrac{7}{11}\\): \\(|60 - 5.5 \\times \\tfrac{480}{11}| = |60 - 240| = 180°\\).",
        ],
        answer: "\\(27\\tfrac{3}{11}\\) min past 5; \\(43\\tfrac{7}{11}\\) min past 2.",
      },
      selfCheckExample: {
        prompt: "At what time between 7 and 8 o'clock do the hands coincide?",
        steps: ["\\(m = \\tfrac{60 \\times 7}{11} = \\tfrac{420}{11} = 38\\tfrac{2}{11}\\)."],
        answer: "\\(38\\tfrac{2}{11}\\) min past 7, about 7:38.",
      },
      practiceSet: [
        { prompt: "At what time between 3 and 4 o'clock do the hands coincide?", answer: "\\(16\\tfrac{4}{11}\\) min past 3" },
        { prompt: "At what time between 4 and 5 o'clock are the hands opposite?", answer: "\\(54\\tfrac{6}{11}\\) min past 4", method: "\\(5.5m = 120 + 180\\)." },
        { prompt: "At what time between 7 and 8 o'clock are the hands opposite?", answer: "\\(5\\tfrac{5}{11}\\) min past 7", method: "\\(5.5m = 210 - 180\\)." },
      ],
      pyqExampleId: "10fce9fe-f6ca-401c-95a6-4a674417b963",
      traps: [
        {
          title: "Eleven meetings, not twelve",
          body: "The hands meet once in each hour except between 11 and 12, where the meeting is 12:00 itself. That is why a meeting comes every \\(65\\tfrac{5}{11}\\) minutes.",
        },
        {
          title: "A straight line includes together",
          body: "If a question asks only for 'in a straight line', the moment the hands coincide counts too. Between 1 and 2 that is about 1:05 as well as about 1:38.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-given-angle",
      name: "When the hands are at a given angle",
      intuition:
        "Set the angle formula equal to the angle you want: \\(|30h - 5.5m| = \\theta\\). The absolute value gives two equations, one before the minute hand passes the hour hand and one after.",
      definition:
        "- \\(m = \\dfrac{2}{11}(30h \\pm \\theta)\\) minutes past \\(h\\).\n" +
        "- Keep each value from 0 up to 60. Usually both lie inside the hour; near 3 and 9 one of them lands on the hour itself or past it.\n" +
        "- Right angles: \\(\\theta = 90\\). Hands '\\(k\\) minute spaces apart' are \\(6k\\) degrees apart.\n" +
        "- Options are often rounded down to the minute, so \\(27\\tfrac{3}{11}\\) minutes past 2 shows as 2:27.",
      formula: {
        label: "Time for a given angle",
        latex: "m = \\dfrac{2}{11}\\left(30h \\pm \\theta\\right)",
      },
      authoredExample: {
        prompt: "At what times between 5 and 6 o'clock are the hands at right angles?",
        steps: [
          "\\(m = \\tfrac{2}{11}(150 \\pm 90)\\).",
          "Minus: \\(\\tfrac{2}{11} \\times 60 = \\tfrac{120}{11} = 10\\tfrac{10}{11}\\). Plus: \\(\\tfrac{2}{11} \\times 240 = \\tfrac{480}{11} = 43\\tfrac{7}{11}\\).",
          "Both are under 60, so both times count.",
        ],
        answer: "\\(10\\tfrac{10}{11}\\) and \\(43\\tfrac{7}{11}\\) min past 5.",
      },
      selfCheckExample: {
        prompt: "At what times between 7 and 8 o'clock are the hands \\(50°\\) apart?",
        steps: [
          "\\(m = \\tfrac{2}{11}(210 \\pm 50)\\).",
          "Minus: \\(\\tfrac{320}{11} = 29\\tfrac{1}{11}\\). Plus: \\(\\tfrac{520}{11} = 47\\tfrac{3}{11}\\).",
        ],
        answer: "\\(29\\tfrac{1}{11}\\) and \\(47\\tfrac{3}{11}\\) min past 7.",
      },
      practiceSet: [
        { prompt: "At what time between 2 and 3 o'clock are the hands at right angles (other than 3:00)?", answer: "\\(27\\tfrac{3}{11}\\) min past 2" },
        { prompt: "At what times between 6 and 7 o'clock are the hands \\(120°\\) apart?", answer: "\\(10\\tfrac{10}{11}\\) and \\(54\\tfrac{6}{11}\\) min past 6" },
        {
          prompt: "At what times between 6 and 7 o'clock are the hands 4 minute spaces apart?",
          answer: "\\(28\\tfrac{4}{11}\\) and \\(37\\tfrac{1}{11}\\) min past 6",
          method: "4 spaces are \\(24°\\).",
        },
      ],
      pyqExampleId: "8f6ecbbe-1bc1-4365-b98a-25ea48761202",
      traps: [
        {
          title: "Drop a value outside the hour",
          body: "Between 10 and 11, \\(\\tfrac{2}{11}(300 + 90) = 70\\tfrac{10}{11}\\) is past the hour, so only \\(\\tfrac{2}{11}(300 - 90) = 38\\tfrac{2}{11}\\) counts.",
        },
        {
          title: "Minute spaces are not degrees",
          body: "Hands 5 minute spaces apart are \\(30°\\) apart. Putting \\(\\theta = 5\\) into the formula answers a different question.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afcl-counts",
      name: "How many times a position comes round",
      intuition:
        "The minute hand gains one full lap on the hour hand every \\(65\\tfrac{5}{11}\\) minutes, which makes 11 laps in 12 hours. Each lap brings the hands together once and opposite once, and brings every other angle round twice.",
      definition:
        "Multiply by 11 laps in 12 hours, or 22 in a day. For a stretch shorter than 12 hours, list the actual times and count the ones inside it, deciding whether the end times are included.",
      table: {
        columns: ["Position", "In 12 hours", "In 24 hours", "How often"],
        rows: [
          {
            cells: ["Coinciding", "11", "22", "every \\(65\\tfrac{5}{11}\\) min"],
            noteAmber: "Not 12 in 12 hours: the meeting between 11 and 12 is 12:00 itself.",
          },
          { cells: ["Opposite (\\(180°\\))", "11", "22", "every \\(65\\tfrac{5}{11}\\) min"] },
          { cells: ["In a straight line (together or opposite)", "22", "44", "every \\(32\\tfrac{8}{11}\\) min"] },
          {
            cells: ["At right angles", "22", "44", "every \\(32\\tfrac{8}{11}\\) min"],
            noteAmber: "Not 48 in a day: 3:00 and 9:00 are each shared by two neighbouring hours.",
          },
          { cells: ["Any other angle between \\(0°\\) and \\(180°\\)", "22", "44", "twice in each lap"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many times do the hands coincide from 1:00 PM to 6:00 PM?",
        steps: ["List the meetings: about 1:05, 2:11, 3:16, 4:22 and 5:27.", "The next one is at about 6:33, after the stretch ends."],
        answer: "5 times.",
      },
      practiceSet: [
        { prompt: "How many times are the hands opposite in 12 hours?", answer: "11" },
        { prompt: "How many times do the hands coincide in 3 days?", answer: "66" },
        { prompt: "How many times are the hands at right angles from noon to 6:00 PM?", answer: "11", method: "Half of the 22 in 12 hours." },
      ],
      pyqExampleId: "448cd8c3-6610-432a-b728-ed68aaf08999",
      traps: [
        {
          title: "Count a stretch by listing",
          body: "From 2:00 to 5:00 is 3 hours, but \\(3 \\times \\tfrac{11}{12} = 2.75\\) is not a count. List the meetings, about 2:11, 3:16 and 4:22, and there are 3.",
        },
        {
          title: "44 right angles a day, not 48",
          body: "Two right angles an hour would make 48. Around 3 and 9 the right angles of neighbouring hours fall on the same moment, 3:00 or 9:00, so 12 hours hold 22 and a day 44.",
        },
      ],
    },
  ],
};
