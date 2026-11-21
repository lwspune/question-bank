import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_UN_TIME_NOTE: SubtopicNote = {
  subtopicName: "Time and Calendar",
  title: "Time and Calendar",
  oneLineDefinition:
    "Change every time into the same unit before comparing, count across midnight to the next day, and use the 7-day week to find the day of any date.",
  whyItMatters:
    "4 of the chapter's 7 questions: 2 EASY and 2 MODERATE. Two are about clock time (who takes longest, a late train after midnight) and two are about the calendar (which days come five times, and the day of Children's Day).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4unti-clock",
      name: "Hours, minutes and seconds",
      intuition:
        "Times can only be compared in the same unit. Turn hours, quarter hours and seconds into minutes, and then the biggest number is the longest time.",
      definition:
        "- 1 hour = 60 minutes; 1 minute = 60 seconds.\n" +
        "- Quarter of an hour = 15 minutes; half an hour = 30 minutes; three quarters of an hour = 45 minutes.\n" +
        "- 12 midnight ends one day and starts the next: 11.00 p.m. Monday plus 2 hours is 1.00 a.m. **Tuesday**.\n" +
        "- a.m. is from midnight to noon, p.m. from noon to midnight.",
      authoredExample: {
        prompt: "A bus leaves at 10.00 p.m. on Friday and the trip takes 7 hours. When does it reach?",
        steps: [
          "10.00 p.m. plus 2 hours is 12 midnight, and Friday ends.",
          "5 more hours is 5.00 a.m. on Saturday.",
        ],
        answer: "5.00 a.m. on Saturday",
      },
      selfCheckExample: {
        prompt: "How many minutes are there in 600 seconds?",
        steps: ["600 ÷ 60 = 10."],
        answer: "10 minutes",
      },
      practiceSet: [
        { prompt: "How many minutes are there in half an hour?", answer: "30 minutes" },
        { prompt: "Which is longer: 1200 seconds or a quarter of an hour?", answer: "1200 seconds, which is 20 minutes; a quarter of an hour is 15 minutes" },
        { prompt: "A show starts at 11.30 a.m. and lasts 2 hours. When does it end?", answer: "1.30 p.m." },
        { prompt: "How many minutes are there in three quarters of an hour?", answer: "45 minutes" },
      ],
      pyqExampleId: "ff61a484-70e8-411e-a2ba-fb551f00c142",
      traps: [
        {
          title: "Forgetting the day changes at midnight",
          body: "A time after 12 midnight belongs to the next day. Count to midnight first, then carry on into the new day.",
        },
        {
          title: "Comparing numbers with different units",
          body: "900 seconds looks bigger than 30 minutes, but it is only 15 minutes. Turn everything into minutes first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4unti-calendar",
      name: "Days of the week for a date",
      intuition:
        "The week repeats every 7 days. Dates 7 days apart fall on the same day of the week, so you can jump in sevens to any date you need.",
      definition:
        "- Dates **7, 14, 21 or 28 days** apart fall on the same weekday: if the 15th is a Friday, so is the 1st.\n" +
        "- **Days in each month**: 31 in January, March, May, July, August, October, December; 30 in April, June, September, November; 28 (29 in a leap year) in February.\n" +
        "- In a **31-day month** the first 3 weekdays of the month come 5 times; in a **30-day month** the first 2.\n" +
        "- To go across months, add the days left in the first month to the days in the next.\n" +
        "- Some dates to know: Independence Day is 15 August, Teachers' Day 5 September, Children's Day 14 November.",
      authoredExample: {
        prompt: "If 10 March is a Wednesday, what day is 1 March?",
        steps: [
          "7 days before 10 March is 3 March, also a Wednesday.",
          "1 March is 2 days before that: Tuesday on 2 March, Monday on 1 March.",
        ],
        answer: "Monday",
      },
      selfCheckExample: {
        prompt: "If 1 June is a Tuesday, what day is 29 June?",
        steps: ["29 June is 28 days, exactly 4 weeks, after 1 June."],
        answer: "Tuesday",
      },
      practiceSet: [
        { prompt: "How many days are there in October?", answer: "31" },
        { prompt: "1 April is a Sunday. Which days come five times in April?", answer: "Sunday and Monday, because April has 30 days" },
        { prompt: "How many weeks are there from 5 January to 26 January?", answer: "3 weeks (21 days)" },
        { prompt: "Today is Thursday. What day will it be after 15 days?", answer: "Friday, because 15 days is 2 weeks and 1 day" },
      ],
      pyqExampleId: "fe67fa1d-7251-48c0-8dc6-8d8f3574fd41",
      traps: [
        {
          title: "Counting the starting day",
          body: "From 5 September, the days left in September are 30 − 5 = 25, not 26. Do not count the start date itself.",
        },
        {
          title: "Using 30 days for every month",
          body: "Seven months have 31 days. One extra day moves the weekday on by one, so get each month's length right.",
        },
      ],
    },
  ],
};
