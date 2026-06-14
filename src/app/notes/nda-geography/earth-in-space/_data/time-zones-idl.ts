import type { SubtopicNote } from "@/app/notes/_types";

export const TIME_ZONES_IDL_NOTE: SubtopicNote = {
  subtopicName: "Time Zones and International Date Line",
  title: "Time Zones and the International Date Line",
  oneLineDefinition:
    "The Earth turns 360 degrees in 24 hours, so every 15 degrees of longitude equals one hour — going east adds time, going west subtracts it, and the date changes by a day at the International Date Line near 180 degrees.",
  whyItMatters:
    "3 PYQs, including the chapter's signature HARD calculation. The whole subtopic rests on one rule: 15 degrees of longitude = 1 hour, and east is ahead, west is behind. Add the International Date Line facts (it lies near 180 degrees, zig-zagging to avoid land, and crossing it changes the date) and you have every mark here.",
  concepts: [
    // 1. 15-degrees-per-hour rule (formula, no box)
    {
      kind: "formula" as const,
      slug: "fifteen-degrees-per-hour",
      name: "The 15-degrees-per-hour rule and the direction of time",
      intuition:
        "The Earth makes a full 360-degree spin in 24 hours. Divide and you get **15 degrees of longitude for every 1 hour** (or 1 degree = 4 minutes). Because the Earth spins west to east, places to the **EAST see the Sun first**, so their clocks are AHEAD; places to the **WEST are BEHIND**. To find another place's time, count the longitude difference, convert at 15 degrees per hour, then add if going east or subtract if going west.",
      definition:
        "- The Earth rotates **360 degrees in 24 hours**, so **15 degrees of longitude = 1 hour** (and **1 degree = 4 minutes**).\n" +
        "- The Earth spins **west to east**, so a place to the **EAST is AHEAD** in time and a place to the **WEST is BEHIND**.\n" +
        "- **Method:** find the longitude difference between the two places; divide by 15 to get hours (or multiply degrees by 4 to get minutes); **add** the result if the target place is to the east, **subtract** if it is to the west.\n" +
        "- India keeps a single standard time (IST) based on the **82.5 deg E** meridian, which is **5 hours 30 minutes ahead of GMT** (the 0 deg Prime Meridian).",
      authoredExample: {
        prompt:
          "If it is 12 noon at the Prime Meridian (0 deg), what is the local time at 30 deg E?",
        steps: [
          "The longitude difference is 30 degrees.",
          "At 15 degrees per hour, 30 degrees = 2 hours.",
          "30 deg E is EAST of 0 deg, so the place is AHEAD — add 2 hours.",
          "12 noon + 2 hours = 2 p.m.",
        ],
        answer: "2 p.m. (14:00) local time.",
      },
      selfCheckExample: {
        prompt:
          "It is 6:00 a.m. GMT at the Prime Meridian (0 deg). What is the local time at 45 deg E?",
        steps: [
          "The longitude difference is 45 degrees.",
          "At 15 degrees per hour, 45 degrees = 3 hours.",
          "45 deg E is EAST of 0 deg, so the place is AHEAD — add 3 hours.",
          "6:00 a.m. + 3 hours = 9:00 a.m.",
        ],
        answer: "9:00 a.m. local time.",
      },
      practiceSet: [
        { prompt: "How many degrees of longitude equal one hour?", answer: "15 degrees" },
        { prompt: "One degree of longitude equals how many minutes of time?", answer: "4 minutes" },
        { prompt: "Going east, do clocks run ahead or behind?", answer: "Ahead" },
        { prompt: "IST is how far ahead of GMT?", answer: "5 hours 30 minutes" },
      ],
      pyqExampleId: "ad33b6da-24cd-4edc-8126-46a0dddaf797", // 12 noon India -> 7 am at 7.5 deg E
      traps: [
        {
          title: "East adds, West subtracts",
          body:
            "The single biggest error is the sign. The Earth spins west to east, so an **eastern** place is AHEAD (add) and a **western** place is BEHIND (subtract). Decide east-or-west first, THEN add or subtract the converted hours.",
        },
      ],
    },

    // 2. Worked GMT-to-place time (formula)
    {
      kind: "formula" as const,
      slug: "local-time-from-gmt",
      name: "Finding a place's clock time from GMT",
      intuition:
        "Many questions give you the time in one city and ask the time in another. The fastest route is to go through **GMT (the 0-degree Prime Meridian)**: India is 5.5 hours ahead of GMT, so London (near 0 deg) is 5.5 hours BEHIND India. Subtract 5:30 from Delhi's time to get London's, ignoring summer-time shifts in the basic version.",
      definition:
        "- **London/UK sits near the Prime Meridian (0 deg)**, so it runs on (or near) GMT; **India (IST) is 5 hours 30 minutes ahead of GMT**.\n" +
        "- Therefore **London is 5 hours 30 minutes BEHIND New Delhi**.\n" +
        "- To convert Delhi time to London time, **subtract 5:30** (Delhi is to the east, so London is behind).\n" +
        "- (In the basic NDA version, ignore British Summer Time; the standard offset is 5:30.)",
      authoredExample: {
        prompt:
          "It is 6:00 p.m. in New Delhi. What is the standard time in London (GMT)?",
        steps: [
          "London is 5 hours 30 minutes behind New Delhi.",
          "Subtract 5:30 from 6:00 p.m.",
          "6:00 p.m. minus 5:30 = 12:30 p.m.",
        ],
        answer: "12:30 p.m. in London.",
      },
      selfCheckExample: {
        prompt: "If it is 12 noon in New Delhi, what is the time in London (GMT)?",
        steps: [
          "London is 5 hours 30 minutes behind Delhi.",
          "12:00 noon minus 5:30 = 6:30 a.m.",
        ],
        answer: "6:30 a.m. in London.",
      },
      practiceSet: [
        { prompt: "London is how many hours behind New Delhi?", answer: "5 hours 30 minutes" },
        { prompt: "Noon in Delhi means what time in London?", answer: "6:30 a.m." },
        { prompt: "To go from Delhi time to London time you add or subtract 5:30?", answer: "Subtract" },
      ],
      pyqExampleId: "2fcd6efc-6b24-4a4f-bc64-f59034035499", // 12 noon Delhi -> 6:30 a.m. London
    },

    // 3. International Date Line (formula + diagram)
    {
      kind: "formula" as const,
      slug: "international-date-line",
      name: "The International Date Line",
      intuition:
        "Travel far enough east or west and the clock alone is not enough — you also need a place to change the calendar date. That is the **International Date Line (IDL)**, running roughly along the **180-degree meridian**, zig-zagging east and west to keep island groups on the same date. Crossing it, the date jumps by one day. The catch the NDA tests: the date to the **EAST of the line is one day BEHIND** (earlier than) the date to the west.",
      definition:
        "- The **International Date Line (IDL)** runs roughly along the **180 deg meridian**, in the middle of the **Pacific Ocean** (not the Atlantic), **deviating east and west** to avoid splitting land/island groups.\n" +
        "- Crossing the IDL changes the **calendar date by one day**.\n" +
        "- The date to the **EAST of the line is EARLIER (one day behind)** the date to the **WEST**. (Going west-to-east across the line you SUBTRACT a day; east-to-west you ADD a day.)\n" +
        "- It is a practical, zig-zagging line, NOT a perfectly straight meridian.",
      visualizationSlug: "eis-time-zones-idl",
      authoredExample: {
        prompt:
          "A ship crosses the International Date Line travelling from west to east. Does it gain or repeat a calendar day?",
        steps: [
          "East of the line the date is one day behind the west.",
          "Moving west-to-east, you step into the 'behind' side, so you subtract a day — you REPEAT a date.",
        ],
        answer: "It repeats a day (the date is set back by one day going west to east).",
      },
      selfCheckExample: {
        prompt:
          "Statement: 'The date to the East of the International Date Line is 24 hours earlier than to the West.' Is this correct?",
        steps: [
          "The IDL lies near 180 degrees and the date jumps by a day across it.",
          "By convention, the eastern side is one day (24 hours) BEHIND the western side.",
        ],
        answer: "Correct — the date east of the line is one day earlier than to the west.",
      },
      practiceSet: [
        { prompt: "The IDL roughly follows which meridian?", answer: "180 degrees" },
        { prompt: "In which ocean does the IDL mostly lie?", answer: "The Pacific Ocean" },
        { prompt: "Why does the IDL zig-zag?", answer: "To avoid splitting land/island groups across two dates" },
        { prompt: "Crossing the IDL changes what?", answer: "The calendar date (by one day)" },
      ],
      pyqExampleId: "b9d60461-ceef-4c8d-9840-4f70a883d85c", // IDL: only statement 2 correct (date E is earlier)
      traps: [
        {
          title: "The IDL is in the Pacific, not the Atlantic",
          body:
            "A statement-trap says the date line deviates 'to avoid land surrounded by the **Atlantic** Ocean'. Wrong ocean — the IDL runs through the **Pacific** at ~180 degrees. That statement is treated as incorrect.",
        },
        {
          title: "East of the line is BEHIND, not ahead",
          body:
            "It is easy to assume 'east = ahead' (true for clocks) carries over to the date. Across the IDL it flips: the date to the **EAST is one day earlier (behind)** the date to the west.",
        },
      ],
    },
  ],
};
