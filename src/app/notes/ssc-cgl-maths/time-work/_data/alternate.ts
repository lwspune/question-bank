import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_ALTERNATE_NOTE: SubtopicNote = {
  subtopicName: "Working on Alternate Days",
  title: "Working on Alternate Days",
  oneLineDefinition:
    "When workers take turns, find the work done in one full cycle of turns, count how many whole cycles fit, then finish the last part one day at a time.",
  whyItMatters:
    "Nineteen questions in the bank, sixteen of them MODERATE and one HARD: two people on alternate days, three in rotation, or helpers who join every second, third or fifth day. Nearly every wrong option comes from the last cycle, so this page always finishes it one day at a time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwal-cycle",
      name: "Taking turns on alternate days",
      intuition:
        "Two days of turns make one cycle, and every cycle does the same amount of work. Fill the job cycle by cycle until less than a cycle is left, then go day by day, starting with whoever's turn it is.",
      definition:
        "- Take the job as LCM units. **One cycle** does the sum of the turn-takers' daily units.\n" +
        "- **Whole cycles:** take as many as fit while some work is still left after them. Then go day by day in the same order. The last day may be a part day: units left \\(\\div\\) that worker's daily units.\n" +
        "- **Who starts matters** when the job ends inside a cycle. With the faster worker first, it can end sooner.\n" +
        "- **The job is a whole number of cycles:** the answer is cycles \\(\\times\\) cycle length, but check the first worker of the last cycle cannot already finish it.\n" +
        "- **Three people in rotation:** the cycle is 3 days, and the same steps apply.",
      authoredExample: {
        prompt: "A can finish a job in 6 days and B in 15 days. They work on alternate days, A starting. In how many days is the job done?",
        steps: [
          "Take the job as 30 units. A does 5 units a day and B does 2, so a 2-day cycle does 7.",
          "4 cycles (8 days) do 28 units, leaving 2. A fifth cycle would overshoot, so go day by day.",
          "Day 9 is A's turn: 2 units take A \\(\\frac{2}{5}\\) of a day. Total \\(8\\frac{2}{5}\\) days.",
          "If B had started, day 9 would be B's turn, and B's 2 units would finish it in exactly 9 days.",
        ],
        answer: "\\(8\\frac{2}{5}\\) days",
      },
      selfCheckExample: {
        prompt: "P can finish a job in 10 days and Q in 15 days. They work on alternate days, Q starting. In how many days is the job done?",
        steps: [
          "Take the job as 30 units. P does 3 units a day and Q does 2, so a cycle does 5.",
          "6 cycles do exactly 30 units, that is 12 days.",
          "Check that it is not done sooner: after 11 days (5 cycles and Q's day) only \\(25 + 2 = 27\\) units are done.",
        ],
        answer: "12 days",
      },
      practiceSet: [
        {
          prompt: "X and Y can do a job in 5 days and 10 days. They work on alternate days, X starting. In how many days is it done?",
          answer: "\\(6\\frac{1}{2}\\) days",
          method: "Job 10 units, cycle 3: 3 cycles (6 days) do 9, and X needs \\(\\frac{1}{2}\\) day for the last unit.",
        },
        {
          prompt: "A, B and C can do a job in 6, 12 and 12 days. They work in rotation A, B, C, one day each. In how many days is the job done?",
          answer: "9 days",
          method: "Job 12 units, cycle \\(2 + 1 + 1 = 4\\) units in 3 days; 3 cycles.",
        },
        {
          prompt: "Three workers of equal efficiency each take 12 days alone for a job. They work one at a time in rotation. How many days does the job take?",
          answer: "12 days",
          method: "Every day does the same work whoever's turn it is.",
        },
      ],
      pyqExampleId: "5705005c-b0de-4615-93d8-830c0ffd4151",
      traps: [
        {
          title: "Rounding a part day up to a whole day",
          body:
            "After the last whole cycle, work day by day. If 3 units are left and it is the turn of a worker who does 4 units a day, the last day is \\(\\frac{3}{4}\\) of a day.",
        },
        {
          title: "Ignoring who starts",
          body:
            "When the job ends inside a cycle, the starter matters. A 6-day worker and a 15-day worker on alternate days finish in \\(8\\frac{2}{5}\\) days if the faster one starts and in 9 days if the slower one starts.",
        },
        {
          title: "Taking one cycle too many",
          body:
            "Count whole cycles only while work remains after them. A 30-unit job with a 7-unit cycle takes 4 whole cycles (28 units) and then single days, not 5 cycles (35 units).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwal-assist",
      name: "Helpers who join every few days",
      intuition:
        "One person works every day and others join on a fixed rhythm. Treat the rhythm as a block of days: the regular worker's days plus the helpers' one day.",
      definition:
        "- **Helpers every \\(k\\)-th day:** one block is \\(k\\) days. Its work \\(=\\) the regular worker's \\(k\\) days \\(+\\) the helpers' work on their day.\n" +
        "- Fill whole blocks, then go day by day. The helpers' day is the LAST day of each block, so in a part block at the end they may not appear at all.\n" +
        "- **Days off:** a worker who rests after every 4 days of work rests on days 5, 10, 15 and so on. By day \\(n\\) he has worked \\(n - \\lfloor n/5 \\rfloor\\) days (\\(\\lfloor x \\rfloor\\) means \\(x\\) with its fraction dropped).\n" +
        "- **One works daily, two alternate:** if R works every day while S and T take turns, the cycle is 2 days: R and T, then R and S.",
      authoredExample: {
        prompt: "A can finish a job in 16 days, B in 24 days and C in 48 days. A works every day, and B and C both help him on every fourth day. In how many days is the job done?",
        steps: [
          "Take the job as 48 units. A does 3, B 2 and C 1 unit a day.",
          "One 4-day block: A's \\(4 \\times 3 = 12\\) units plus the helpers' 3 on day 4, so 15 units.",
          "3 blocks (12 days) do 45 units, leaving 3. Day 13 is A alone, and his 3 units finish the job.",
        ],
        answer: "13 days",
      },
      selfCheckExample: {
        prompt: "P can finish a job in 10 days, and Q and R can each finish it in 20 days. P works every day, and Q and R help him on every second day. How long does the job take?",
        steps: [
          "Take the job as 20 units. P does 2 units a day, Q and R 1 each.",
          "One 2-day block: \\(2 + (2 + 1 + 1) = 6\\) units. 3 blocks (6 days) do 18.",
          "Day 7 is P alone: his 2 units finish the job.",
        ],
        answer: "7 days",
      },
      practiceSet: [
        {
          prompt: "A worker works 4 days and then rests 1 day, again and again. By the end of day 23, how many days has he worked?",
          answer: "19 days",
          method: "He rests on days 5, 10, 15 and 20.",
        },
        {
          prompt: "A does 4 units of work a day and is helped by B, who does 2 units a day, on every third day. How many units are done in one 3-day block?",
          answer: "14 units",
        },
        {
          prompt: "R does 3 units of a 30-unit job every day. S (2 units a day) and T (4 units a day) work on alternate days, T first. In how many days is the job done?",
          answer: "\\(4\\frac{6}{7}\\) days",
          method: "A 2-day cycle does \\(7 + 5 = 12\\); 2 cycles do 24; on day 5, R and T do 7 a day and need \\(\\frac{6}{7}\\) day.",
        },
      ],
      pyqExampleId: "126b12f9-8f89-459a-aaed-c7adcbd1efc9",
      traps: [
        {
          title: "Putting the helpers' day first",
          body:
            "Helpers who join on every third day work on days 3, 6, 9 and so on, not on days 1, 4, 7. In a part block at the end they may never appear.",
        },
        {
          title: "Reading a day off after every 4 days as a 4-day rhythm",
          body:
            "A worker who takes a day off after every four days of work is off on days 5, 10, 15: the rhythm is 5 days long, 4 working and 1 off.",
        },
      ],
    },
  ],
};
