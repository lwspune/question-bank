import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DAT_DECISIONS_NOTE: SubtopicNote = {
  subtopicName: "Decisions from Data",
  title: "Choosing, Scheduling and Judging Claims from Data",
  oneLineDefinition:
    "Strike out every option that breaks a condition before comparing what is left, follow timetables in one clock, and accept only the claims the data actually shows.",
  whyItMatters:
    "Choosing the cheapest item that meets several conditions is the commonest shape in this chapter, and the 2023 paper asked it. Timetables, time zones and \"which statement does the data support\" appear in the Cambridge papers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dat-constraints",
      name: "Combining conditions: filter first, then optimise",
      intuition:
        "A question that lists several conditions and then asks for the cheapest (or fastest, or lightest) option has two separate jobs. First remove every row that breaks any condition; only then compare the survivors. Doing it in the other order sends you straight to the cheapest row, which the setter has usually made break one condition.",
      definition:
        "- **Step 1, filter**: write the conditions as a short checklist and strike out each row that fails **any** of them.\n" +
        "- **Step 2, optimise**: among the rows left, compute what the question asks (total cost for the whole period, cost for the number needed) and choose the best.\n" +
        "- **Boundary words**: \"at least 8\" includes 8; \"more than 8\" does not. \"Less than 1.5\" excludes 1.5; \"at most 1.5\" includes it.\n" +
        "- **Packs and bundles**: you may need to buy more than you need; try mixtures of pack sizes and compare totals.",
      authoredExample: {
        prompt:
          "A student compares five phone plans:\n\n" +
          "| Plan | Monthly fee (€) | Data (GB) | Contract (months) | 5G |\n" +
          "|---|---|---|---|---|\n" +
          "| Alfa | 12 | 20 | 24 | No |\n" +
          "| Beta | 15 | 30 | 12 | Yes |\n" +
          "| Gamma | 10 | 15 | 12 | Yes |\n" +
          "| Delta | 18 | 50 | 1 | Yes |\n" +
          "| Epsilon | 14 | 25 | 24 | Yes |\n\n" +
          "She needs at least 25 GB, 5G, and a contract of at most 12 months. Which plan is cheapest over a year?",
        steps: [
          "Filter: Alfa fails on data and 5G. Gamma fails on data. Epsilon fails on contract length (24 months).",
          "Survivors: Beta \\(12 \\times 15 = 180\\) euros a year; Delta \\(12 \\times 18 = 216\\) euros a year.",
          "Beta is cheapest. Gamma has the lowest fee overall but does not give enough data.",
        ],
        answer: "Beta, at €180 a year",
      },
      selfCheckExample: {
        prompt:
          "A cyclist wants a lock that weighs less than 1.5 kg, has a security rating of at least 8 and is at least 80 cm long. The options are:\n\n" +
          "| Lock | Weight (kg) | Security rating | Length (cm) | Price (€) |\n" +
          "|---|---|---|---|---|\n" +
          "| P | 1.2 | 9 | 85 | 48 |\n" +
          "| Q | 1.6 | 10 | 90 | 42 |\n" +
          "| R | 1.4 | 8 | 80 | 45 |\n" +
          "| S | 0.9 | 7 | 100 | 30 |\n" +
          "| T | 1.5 | 9 | 95 | 39 |\n\n" +
          "What is the least she can pay for a suitable lock?",
        options: ["€48", "€42", "€45", "€30", "€39"],
        steps: [
          "Q is too heavy. S has a rating below 8. T weighs exactly 1.5 kg, which is not less than 1.5 kg.",
          "R passes: rating 8 is \"at least 8\" and 80 cm is \"at least 80 cm\". P also passes.",
          "Of P (€48) and R (€45), R is cheaper. Options D and E are the cheapest locks, but each breaks a condition.",
        ],
        answer: "(C) €45",
      },
      practiceSet: [
        { prompt: "A school needs 70 notebooks. They come in packs of 10 for €6.50, 25 for €14.00 and 50 for €26.00. What is the cheapest way to buy at least 70?", answer: "€39.00: one pack of 50 and two of 10", method: "Compare 50 + 10 + 10 (€39) with 50 + 25 (€40)" },
        { prompt: "A rule says \"fewer than 10 g of fat\". Does an item with exactly 10 g qualify?", answer: "No", method: "\"Fewer than\" excludes the boundary" },
        { prompt: "Three hotels charge €80 a night with breakfast, €70 plus €12 for breakfast, and €65 plus €18 for breakfast. Which is cheapest for 3 nights with breakfast?", answer: "The first, at €240", method: "€240, €246, €249" },
      ],
      traps: [
        {
          title: "The cheapest row usually breaks a condition",
          body: "Setters put the lowest price on an option that fails one requirement, often by a boundary such as exactly 1.5 kg for \"less than 1.5 kg\". Filter every row first; compare prices only among the survivors.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dat-timetables",
      name: "Timetables, schedules and time zones",
      intuition:
        "A timetable is a table where each column is one bus or train and each row is a stop. Follow one column down to travel, and move to a later column when you have to wait. With time zones, the safe method is to convert every time into one clock (one city's local time), solve, and convert back only at the end.",
      definition:
        "- **Reading**: one column is one service; read down it for the arrival time at each stop.\n" +
        "- **Connections**: add any waiting or task time on arrival, then take the **first** service that leaves **at or after** that time.\n" +
        "- **Durations**: subtract in minutes; across midnight add 24 hours.\n" +
        "- **Time zones**: local time = reference time + offset. Put everything on one clock, check every condition there, then convert.\n" +
        "- **Working hours** in several cities: each gives a window on the common clock; the answer must lie in the overlap of all windows.",
      authoredExample: {
        prompt:
          "Part of a bus timetable:\n\n" +
          "| Stop | Bus 1 | Bus 2 | Bus 3 | Bus 4 |\n" +
          "|---|---|---|---|---|\n" +
          "| Station | 07:10 | 07:40 | 08:15 | 08:50 |\n" +
          "| Hospital | 07:32 | 08:05 | 08:37 | 09:12 |\n" +
          "| University | 07:51 | 08:24 | 08:58 | 09:31 |\n\n" +
          "Sara reaches the Station at 07:35. She must collect a parcel at the Hospital, which takes 10 minutes, and be at the University by 09:00. Which buses should she take, and when does she arrive?",
        steps: [
          "The first bus after 07:35 is Bus 2 at 07:40. It reaches the Hospital at 08:05.",
          "With the parcel she is ready at 08:15. Bus 2 has gone; the next bus at the Hospital is Bus 3 at 08:37.",
          "Bus 3 reaches the University at 08:58, which is before 09:00.",
        ],
        answer: "Bus 2 then Bus 3, arriving at 08:58",
      },
      selfCheckExample: {
        prompt:
          "A team has members in Rome (UTC+1), Dubai (UTC+4) and New York (UTC−5). Each member is available only between 08:00 and 18:00 local time. They need a one-hour video call that starts on the hour. At what Rome time must it start?",
        options: ["09:00", "11:00", "15:00", "16:00", "14:00"],
        steps: [
          "On Rome time, Dubai is 3 hours ahead and New York is 6 hours behind.",
          "New York's 08:00 is Rome's 14:00, so the call cannot start before 14:00 Rome time.",
          "Dubai's 18:00 is Rome's 15:00, so the call must end by 15:00 Rome time and start by 14:00.",
          "Only 14:00 works: Dubai 17:00 to 18:00, New York 08:00 to 09:00. Option C (15:00) runs past 18:00 in Dubai; options A and B are before 08:00 in New York.",
        ],
        answer: "(E) 14:00",
      },
      practiceSet: [
        { prompt: "A flight leaves at 22:40 and lands at 01:15 the next day, in the same time zone. How long is the flight?", answer: "2 h 35 min", method: "1 h 20 min to midnight plus 1 h 15 min" },
        { prompt: "Paris is 1 hour ahead of London. A flight leaves London at 09:20 local time and takes 1 h 15 min. What is the local time in Paris on landing?", answer: "11:35", method: "10:35 London time, plus 1 hour" },
        { prompt: "Trains leave every 20 minutes from 06:05. What is the first train at or after 08:30?", answer: "08:45", method: "06:05, 06:25, ..., 08:25, 08:45" },
      ],
      traps: [
        {
          title: "Allow the waiting and task time before choosing the next service",
          body: "If you arrive at 08:05 and need 10 minutes, you are ready at 08:15, and any bus before 08:15 has gone. Picking the next bus after your arrival time rather than after your ready time is the usual slip.",
        },
        {
          title: "Convert to one clock before comparing times",
          body: "Comparing a Dubai local time with a New York local time directly is meaningless. Put every time on one city's clock, check the conditions there, and convert only the final answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-dat-claims",
      name: "What the data can and cannot support",
      intuition:
        "Some items ask which statement is supported by a table or chart. The right option says no more than the data shows. Wrong options go one step too far: they claim a cause, generalise from a sample, ignore a missing category, or read a ratio off bar lengths. Check each option against the numbers, and reject it if it needs anything the data does not give.",
      definition:
        "A statement is **supported** only if it follows from the numbers shown, with no extra information.\n" +
        "- Data showing two things change together does not show that one **causes** the other.\n" +
        "- A **sample** describes the group measured, not everyone.\n" +
        "- Words such as **all, never, only** are refuted by a single counter-example in the table.\n" +
        "- \"Most\" or \"a majority\" means **more than half**, not just the largest group.\n" +
        "- A rate (per 1,000, per person) can fall while the count rises, and the other way round.",
      table: {
        columns: ["Claim in an option", "What you must check", "Common reason it fails"],
        rows: [
          { cells: ["X increased over the period", "Values at the start and end, in the same units", "Only part of the period is shown, or the rise is in a different measure"] },
          { cells: ["X is twice Y", "The actual values, not the bar lengths", "The chart's axis does not start at zero"] },
          { cells: ["X caused Y", "A controlled comparison where only X differs", "The data only shows that X and Y occur together"] },
          { cells: ["Most people chose X", "X is more than half of the total", "X is the largest group but under half"] },
          { cells: ["X always or never happens", "Every row of the table", "One row is a counter-example"] },
        ],
        caption: "Use the table as a checklist for each option in a \"which statement is supported\" item.",
      },
      selfCheckExample: {
        prompt:
          "A city counted cyclists, cycle lanes and cycling accidents:\n\n" +
          "| Year | Cyclists counted | Cycle lanes (km) | Accidents involving cyclists |\n" +
          "|---|---|---|---|\n" +
          "| 2021 | 4,000 | 20 | 60 |\n" +
          "| 2022 | 5,000 | 26 | 62 |\n" +
          "| 2023 | 6,500 | 35 | 65 |\n\n" +
          "Which statement is supported by the data?",
        options: [
          "Building cycle lanes caused more people to cycle.",
          "Cycling became more dangerous between 2021 and 2023.",
          "Accidents per 1,000 cyclists counted fell from 2021 to 2023.",
          "More than half of the accidents in 2023 happened in cycle lanes.",
          "The number of cyclists counted doubled from 2021 to 2023.",
        ],
        steps: [
          "Accidents per 1,000 cyclists: \\(60 / 4 = 15\\) in 2021 and \\(65 / 6.5 = 10\\) in 2023. It fell, so C is supported.",
          "A claims a cause; the table only shows lanes and cyclists rising together. B ignores the larger number of cyclists: the count of accidents rose, but the rate fell.",
          "D needs data on where accidents happened, which the table does not give. E is wrong: \\(6500 / 4000 = 1.625\\), not 2.",
        ],
        answer: "(C) Accidents per 1,000 cyclists counted fell from 2021 to 2023.",
      },
      practiceSet: [
        { prompt: "A table shows ice-cream sales and sunburn cases both rising from May to August. Does ice cream cause sunburn?", answer: "No", method: "Both follow sunny weather; together is not cause" },
        { prompt: "Party A won 40% of the vote, more than any other party. Did a majority vote for A?", answer: "No", method: "A majority means more than 50%" },
        { prompt: "A survey of 50 gym members finds that 80% exercise every week. Does this show that 80% of adults exercise every week?", answer: "No", method: "Gym members are not a fair sample of all adults" },
      ],
      traps: [
        {
          title: "Together is not cause",
          body: "Two columns rising together (cycle lanes and cyclists) do not show that one causes the other. A statement claiming a cause is not supported by a table of figures alone.",
        },
        {
          title: "Count and rate can move in opposite directions",
          body: "Accidents rose from 60 to 65 while the rate per 1,000 cyclists fell from 15 to 10. \"More dangerous\" is about the rate, so read which one a statement is about.",
        },
      ],
    },
  ],
};
