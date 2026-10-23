import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCC_CALENDAR_NOTE: SubtopicNote = {
  subtopicName: "Calendar",
  title: "Calendar",
  oneLineDefinition:
    "The days of the week repeat every 7 days, so only the remainder after dividing a number of days by 7 (the odd days) moves the weekday; a year adds 1 odd day, a leap year 2.",
  whyItMatters:
    "Nine questions in the bank, five from the 2023 shifts and four from the 2025 shifts, seven EASY and two MODERATE. Three count dates forward or back, three find the weekday after a number of days, and three use the odd days in a year or the leap-year rule. None of the nine is about a clock.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrccca-dates",
      name: "Counting dates forward and back",
      intuition:
        "Inside one month, moving a date is plain adding and taking away. The only care needed is at the end of a month, where you must know how many days that month has.",
      definition:
        "- **n days after** a date in the same month is date \\(+ n\\); **n days before** is date \\(- n\\).\n" +
        "- **\"How many days after A was B?\"** is B's date minus A's date. Do not count both ends.\n" +
        "- **Crossing a month end:** take away the month's length. For example, 6 days after 28 April is 34 April, which is 4 May.\n" +
        "- **Month lengths:** 31 days for January, March, May, July, August, October and December; 30 for April, June, September and November; February has 28, or 29 in a leap year.\n" +
        "- **A chain of events:** fix the date of the event you are given first, then move from it to each of the others one at a time.",
      authoredExample: {
        prompt:
          "A fair opens in Pune 9 days after one in Nagpur. A fair in Nashik opens 5 days before the Pune fair. The Nagpur fair opens on 4 March. When does the Nashik fair open?",
        steps: [
          "Start from the date you know: Nagpur on 4 March.",
          "Pune is 9 days later: \\(4 + 9 = 13\\) March.",
          "Nashik is 5 days before Pune: \\(13 - 5 = 8\\) March.",
          "Shortcut: Nashik is \\(9 - 5 = 4\\) days after Nagpur, so \\(4 + 4 = 8\\) March.",
        ],
        answer: "8 March",
      },
      selfCheckExample: {
        prompt: "A course runs from 27 April to 4 May. How many days after the first day is the last day?",
        steps: [
          "April has 30 days, so 27 April to 30 April is 3 days.",
          "Then 4 more days to 4 May: \\(3 + 4 = 7\\).",
        ],
        answer: "7 days",
      },
      practiceSet: [
        { prompt: "A meeting is on 18 June. Another is held 9 days later. What is its date?", answer: "27 June" },
        { prompt: "A parcel arrived on 23 August, 5 days after it was ordered. On what date was it ordered?", answer: "18 August" },
        { prompt: "Two tests were held on 3 July and 21 July. How many days after the first was the second?", answer: "18 days" },
        { prompt: "An event is 6 days after 28 February in a year that is not a leap year. What is its date?", answer: "6 March" },
      ],
      pyqExampleId: "23653a24-1721-46f9-b1aa-2fc4ff18aad9",
      traps: [
        {
          title: "Counting both ends",
          body:
            "\"How many days after the 12th is the 20th?\" is \\(20 - 12 = 8\\). Counting both the 12th and the 20th gives 9, which is the number of days from the first to the last inclusive, a different question.",
        },
        {
          title: "Giving every month 30 days",
          body:
            "Crossing the end of a month, use that month's real length. Three days after 30 January is 2 February, but three days after 30 April is 3 May.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrccca-odd-days",
      name: "The weekday after a number of days",
      intuition:
        "Every 7 days the week comes back to the same day, so whole weeks can be thrown away. Only the days left over, the odd days, move you along the week.",
      definition:
        "- **Odd days:** divide the number of days by 7 and keep the remainder.\n" +
        "- **Forward:** move the weekday on by the odd days. **Backward** (days ago, or the day before): move it back.\n" +
        "- **Same weekday:** dates 7, 14, 21 or 28 days apart fall on the same weekday. If the 3rd is a Sunday, so are the 10th, 17th, 24th and 31st.\n" +
        "- **Across months:** count the days left in the first month, then the days into the next.\n" +
        "- **Fast route:** jump by 7s to the nearest date that has the weekday you know, then count the last few days by hand.",
      formula: {
        label: "Odd days",
        latex: "\\text{Odd days} = \\text{remainder when the number of days is divided by } 7",
      },
      authoredExample: {
        prompt: "Today is Wednesday. What day of the week will it be after 100 days?",
        steps: [
          "\\(100 = 14 \\times 7 + 2\\), so 100 days is 14 weeks and 2 odd days.",
          "Two days after Wednesday is Friday.",
        ],
        answer: "Friday",
      },
      selfCheckExample: {
        prompt: "The 3rd of a month is a Sunday. What day of the week is the 26th of the same month?",
        steps: [
          "The 26th is 23 days later: \\(23 = 3 \\times 7 + 2\\), so 2 odd days.",
          "Sunday plus 2 is Tuesday. Check: the 24th is a Sunday, so the 26th is a Tuesday.",
        ],
        answer: "Tuesday",
      },
      practiceSet: [
        { prompt: "Today is Monday. What day of the week was it 30 days ago?", answer: "Saturday", method: "30 days is 4 weeks and 2 days; go back 2." },
        { prompt: "If 1 March is a Thursday, what day of the week is 1 April?", answer: "Sunday", method: "March has 31 days: 3 odd days." },
        { prompt: "Today is Saturday. What day of the week will it be after 50 days?", answer: "Sunday" },
        {
          prompt: "The 10th of a 30-day month is a Friday. What day of the week is the 2nd of the next month?",
          answer: "Saturday",
          method: "20 days to the 30th, then 2 more: 22 days, 1 odd day.",
        },
      ],
      pyqExampleId: "2861f013-6abb-40d4-8e1f-504845b13205",
      traps: [
        {
          title: "Counting today as one of the days",
          body:
            "One day after Monday is Tuesday. The starting day is day 0, so after 7 days you are back on Monday, not on Sunday.",
        },
        {
          title: "Forgetting the month's length",
          body:
            "To move from a date in one month to a date in the next, you need the days left in the first month, and that depends on whether it has 28, 29, 30 or 31 days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrccca-years",
      name: "Odd days in a year and leap years",
      intuition:
        "A year is 52 whole weeks and one day more, so the same date next year falls one weekday later. A leap year has one more day again, so it moves the date two weekdays.",
      definition:
        "- **An ordinary year:** 365 days \\(= 52\\) weeks \\(+ 1\\) odd day. **A leap year:** 366 days \\(=\\) 2 odd days.\n" +
        "- **Same date a year later:** the weekday moves on by 1, or by 2 if a 29 February falls inside that year's span.\n" +
        "- **Leap-year rule:** a year divisible by 4 is a leap year. A century year (ending in 00) must be divisible by 400: 2000 was a leap year, 1900 was not.\n" +
        "- **Divisible by 4:** look only at the last two digits. 1996 is a leap year because 96 is a multiple of 4.\n" +
        "- **Over several years:** add 1 odd day for every year, plus 1 more for every 29 February in between, then take the remainder on division by 7.",
      formula: {
        label: "Odd days over whole years",
        latex: "\\text{Odd days} = \\text{number of years} + \\text{number of 29 Februarys in between}",
      },
      authoredExample: {
        prompt: "15 August 2019 was a Thursday. What day of the week was 15 August 2021?",
        steps: [
          "15 August 2019 to 15 August 2020 includes 29 February 2020: 2 odd days.",
          "15 August 2020 to 15 August 2021 has no 29 February: 1 odd day.",
          "Total 3 odd days. Thursday plus 3 is Sunday.",
        ],
        answer: "Sunday",
      },
      selfCheckExample: {
        prompt: "Which of these is a leap year: 1900, 2100, 2000, 1800?",
        steps: [
          "All four are century years, so each must be divisible by 400.",
          "Only 2000 is: \\(2000 = 5 \\times 400\\).",
        ],
        answer: "2000",
      },
      practiceSet: [
        {
          prompt: "Today is Friday. What day of the week will it be exactly 1 year and 3 days from now, if no 29 February falls in between?",
          answer: "Tuesday",
          method: "\\(1 + 3 = 4\\) odd days.",
        },
        { prompt: "Is 1996 a leap year?", answer: "Yes", method: "96 is a multiple of 4." },
        { prompt: "1 January 2023 was a Sunday. What day of the week was 1 January 2024?", answer: "Monday" },
        { prompt: "How many odd days are there in a leap year?", answer: "2" },
      ],
      pyqExampleId: "2525500d-9085-488f-9291-c4524d0c907a",
      traps: [
        {
          title: "Calling every century year a leap year",
          body:
            "1900 is divisible by 4 but not by 400, so it was not a leap year. Only century years such as 1600 and 2000 are.",
        },
        {
          title: "Giving the extra day to the wrong span",
          body:
            "The leap day counts only if 29 February lies inside the span. 1 March 2023 to 1 March 2024 contains it; 1 March 2024 to 1 March 2025 does not, although 2024 is a leap year.",
        },
      ],
    },
  ],
};
