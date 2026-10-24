import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_ALTERNATE_NOTE: SubtopicNote = {
  subtopicName: "Working on Alternate Days",
  title: "Working on Alternate Days, and Other Work Patterns",
  oneLineDefinition:
    "When people take turns, or work and rest in a fixed pattern, count whole cycles first, then finish the last part day by day, keeping track of who works next.",
  whyItMatters:
    "One AFCAT past-year question is here, from 2015, and over a quarter of the page is HARD. Almost every slip is in the last cycle: running the whole cycles too far, or forgetting that the person who starts also works first in the final, partial cycle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-alternate-days",
      name: "Two people on alternate days",
      intuition:
        "A day of A and then a day of B make one cycle. Add their rates to get the work per cycle, run as many whole cycles as fit, then let the starter work the next day. If something is still left, the other person finishes it, perhaps in part of a day.",
      definition:
        "- Work per 2-day cycle = \\(\\tfrac 1a + \\tfrac 1b\\). Take the largest number of whole cycles that does not overshoot the job.\n" +
        "- After the whole cycles, the starter works first. If the starter's day covers what is left, the job ends on that day.\n" +
        "- A partial last day counts as a fraction: work left ÷ that person's rate.\n" +
        "- Who starts matters: when the faster person starts, the job can end sooner.\n" +
        "- Working backwards: if the total time is given, count each person's days (the starter has the extra or partial day), then solve for the unknown rate.",
      formula: {
        label: "One cycle",
        latex: "\\text{work per cycle} = \\dfrac 1a + \\dfrac 1b",
      },
      authoredExample: {
        prompt: "A can do a job in 6 days and B in 12 days. They work on alternate days, A first. How long does the job take?",
        steps: [
          "One cycle does \\(\\tfrac 16 + \\tfrac 1{12} = \\tfrac 14\\), so 3 cycles (6 days) do \\(\\tfrac 34\\).",
          "Day 7 is A's, which leaves \\(\\tfrac 14 - \\tfrac 16 = \\tfrac 1{12}\\).",
          "Day 8 is B's, and B does exactly \\(\\tfrac 1{12}\\).",
        ],
        answer: "8 days.",
      },
      selfCheckExample: {
        prompt:
          "P can do a job in 4 days and Q in 6 days. They work on alternate days. How long does the job take if P starts, and if Q starts?",
        steps: [
          "One cycle does \\(\\tfrac 14 + \\tfrac 16 = \\tfrac 5{12}\\), so 2 cycles (4 days) do \\(\\tfrac{10}{12}\\), leaving \\(\\tfrac 16\\).",
          "P starts: on day 5 P needs \\(\\tfrac 16 \\div \\tfrac 14 = \\tfrac 23\\) of a day.",
          "Q starts: on day 5 Q does exactly \\(\\tfrac 16\\).",
        ],
        answer: "\\(4\\tfrac 23\\) days if P starts; 5 days if Q starts.",
      },
      practiceSet: [
        {
          prompt: "A and B can do a job in 10 and 30 days and work on alternate days, A first. How long does the job take?",
          answer: "\\(14\\tfrac 23\\) days",
        },
        {
          prompt: "A and B can do a job in 12 and 24 days and work on alternate days, A first. After how many days is 75% of the job done?",
          answer: "12 days",
        },
        {
          prompt:
            "A and B work on alternate days, B first. A alone would take 16 days. The job is finished in exactly 8 days. How long would B take alone?",
          answer: "\\(5\\tfrac 13\\) days",
          method: "A worked 4 days and did \\(\\tfrac 14\\); B did \\(\\tfrac 34\\) in 4 days.",
        },
      ],
      pyqExampleId: "b5cd0185-c2d0-4add-9b5a-db9d07f1c074",
      traps: [
        {
          title: "Do not run the cycles past the job",
          body: "If each cycle does \\(\\tfrac 27\\), three cycles do \\(\\tfrac 67\\) and a fourth would overshoot. Stop at three and finish day by day.",
        },
        {
          title: "The starter works first in the last cycle",
          body: "After the whole cycles, the next day belongs to whoever started. Giving it to the other person changes the answer whenever their rates differ.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-work-patterns",
      name: "Turns, helpers and rest days",
      intuition:
        "Any repeating pattern works like the alternate-day cycle. Find the length of one repeat and the work it does, fit in whole repeats, and finish by hand. The repeat might be three people in turn, helpers who join every few days, or work days followed by rest days.",
      definition:
        "- **Helpers every k-th day**: a block of \\(k\\) days does \\(k\\) days of the main worker plus one day of each helper.\n" +
        "- **Three in turn**: a 3-day block does \\(\\tfrac 1a + \\tfrac 1b + \\tfrac 1c\\).\n" +
        "- **Work and rest**: with \\(w\\) days on and \\(r\\) days off, count the working days needed, then place the last one on the calendar. No rest day comes after the last working day.\n" +
        "- **Together, then in turns**: do the joint stage first, then run the cycles on what is left.",
      formula: {
        label: "Repeating blocks",
        latex: "\\text{blocks} = \\dfrac{\\text{work}}{\\text{work per block}}",
      },
      authoredExample: {
        prompt:
          "A can do a job in 10 days. B and C, who would each take 40 days, join him every second day. How long does the job take?",
        steps: [
          "One 2-day block: A works both days, \\(\\tfrac 2{10} = \\tfrac 8{40}\\), and B and C one day each, \\(\\tfrac 2{40}\\).",
          "The block does \\(\\tfrac{10}{40} = \\tfrac 14\\) of the job.",
          "Four blocks finish it exactly.",
        ],
        answer: "8 days.",
      },
      selfCheckExample: {
        prompt:
          "A worker needs 10 working days for a job. He works 4 days, rests 2, and repeats. On which calendar day does he finish?",
        steps: [
          "He works days 1 to 4 and 7 to 10, which is 8 working days.",
          "After resting on days 11 and 12, he works days 13 and 14.",
        ],
        answer: "Day 14.",
      },
      practiceSet: [
        {
          prompt: "A, B and C can do a job in 12, 18 and 36 days and work one day each in turn, A first. How long does the job take?",
          answer: "18 days",
        },
        {
          prompt:
            "A machine runs for 3 hours, then stops for 1 hour to cool, and makes 50 units in each running hour. How many units does it make in a 24-hour schedule?",
          answer: "900 units",
        },
        {
          prompt:
            "A and B take 12 and 6 days for a job. They work together for 2 days, then on alternate days with A first. How many more days does the job take?",
          answer: "4 more days",
        },
      ],
      pyqExampleId: "17cd30c7-0cb4-4a0e-befc-5a8f768c9864",
      traps: [
        {
          title: "Rest after the end does not count",
          body: "Someone working 6 days a week who needs 16 working days finishes on day 18, not day 19: the rest days after the last working day are never taken.",
        },
        {
          title: "A helper's day is one day per block",
          body: "If helpers join every fourth day, a 4-day block has four days of the main worker but only one day of each helper.",
        },
      ],
    },
  ],
};
