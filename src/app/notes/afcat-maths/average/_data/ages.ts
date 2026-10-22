import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_AGES_NOTE: SubtopicNote = {
  subtopicName: "Ages",
  title: "Ages Over Time, and a New Baby",
  oneLineDefinition:
    "Every member of a family gets a year older each year, so the family's total age grows by its size every year; a baby adds a member but little or nothing to the total.",
  whyItMatters:
    "One AFCAT past-year question (2019) is here, and nearly a quarter of the page is HARD, mostly births at different times that each have to be carried forward to today. The slip is to age the family but not the children, or the children but not the family.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-ages-time",
      name: "Moving a family through time",
      intuition:
        "If 6 people each get 4 years older, their total age rises by 24 and their average by 4.",
      definition:
        "- After \\(t\\) years, every age is \\(t\\) more: the average rises by \\(t\\) and the total by \\(nt\\), as long as nobody joins or leaves.\n" +
        "- \\(t\\) years ago: subtract \\(t\\) from the average.\n" +
        "- The **difference** between two people's ages never changes.\n" +
        "- **Years and months:** turn everything into months, work, then turn back (12 months = 1 year).",
      formula: {
        label: "A family's total after t years",
        latex: "\\text{total after } t \\text{ years} = \\text{total now} + n\\,t",
      },
      authoredExample: {
        prompt: "A husband and wife averaged 26 years when they married 6 years ago. Their son is now 5. Find the family's average age now.",
        steps: [
          "At the wedding the couple totalled \\(2 \\times 26 = 52\\); now they total \\(52 + 2 \\times 6 = 64\\).",
          "With the son: \\(64 + 5 = 69\\) over 3 people.",
          "\\(69 \\div 3 = 23\\).",
        ],
        answer: "23 years.",
      },
      selfCheckExample: {
        prompt: "P was born when Q was 6 years 8 months old. Find their average age when P is 2 years 10 months old.",
        steps: [
          "Q is then 6 y 8 m + 2 y 10 m = 9 y 6 m.",
          "Together: 12 y 4 m = 148 months.",
          "\\(148 \\div 2 = 74\\) months = 6 years 2 months.",
        ],
        answer: "6 years 2 months.",
      },
      practiceSet: [
        { prompt: "Six people average 20 years now. What will their average be in 5 years?", answer: "25 years" },
        { prompt: "Six years ago, 4 friends averaged 18 years. Find their average now.", answer: "24 years" },
        { prompt: "A mother and father average 40 years. With their son, the three average 30. How old is the son?", answer: "10 years" },
        {
          prompt: "A is 2 years 10 months older than B, who is 6 years 5 months old. Find their average age.",
          answer: "7 years 10 months",
          method: "188 months in all.",
        },
      ],
      pyqExampleId: "530c5523-a960-4669-bf12-296e4d9666d5",
      traps: [
        {
          title: "The gap stays, the ratio does not",
          body: "A mother 24 years older than her daughter is always 24 years older, but 'twice as old' is true for only one year.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-child-joins",
      name: "A child or a baby joins the family",
      intuition:
        "A newborn adds a member and nothing to the total, so the average drops. An older child adds its own age to the total.",
      definition:
        "- **Newborn:** new average = family total ÷ \\((n + 1)\\).\n" +
        "- **Born \\(t\\) years later:** first add \\(nt\\) to the family total, then let the baby join.\n" +
        "- Twins or triplets add 2 or 3 to the count and 0 to the total.\n" +
        "- A child of known age joins: add its age to the total and 1 to the count.",
      formula: {
        label: "A child joins",
        latex: "\\text{new average} = \\dfrac{\\text{family total} + \\text{child's age}}{n + 1}",
      },
      authoredExample: {
        prompt: "A family of 5 has an average age of 30. Three years later a baby is born. Find the average age just after the birth.",
        steps: [
          "Total now \\(= 150\\); three years later \\(150 + 5 \\times 3 = 165\\).",
          "The baby adds a member but 0 years: \\(165 \\div 6 = 27.5\\).",
        ],
        answer: "27.5 years.",
      },
      selfCheckExample: {
        prompt: "A family of 6 averages 30 years. A 9-year-old adopted child joins. Find the new average.",
        steps: [
          "Total \\(= 180\\); with the child \\(189\\) over 7 people.",
          "\\(189 \\div 7 = 27\\).",
        ],
        answer: "27 years.",
      },
      practiceSet: [
        { prompt: "Five family members average 24 years. A newborn joins. Find the new average.", answer: "20 years" },
        { prompt: "A couple averages 30 years. Two years later twins are born. Find the family's average just after.", answer: "16 years" },
        { prompt: "Eight family members average 35 years. A 17-year-old joins. Find the new average.", answer: "33 years" },
      ],
      pyqExampleId: "d1bd1054-244b-44bd-9e83-6df5f9bc22cb",
      traps: [
        {
          title: "Age the family first",
          body: "If the baby arrives 3 years later, the five older members are 15 years older in total. Adding the baby to the old total misses those 15 years.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-baby-age",
      name: "Finding the baby's age",
      intuition:
        "Bring the older members' total up to today, then compare it with today's total for the whole family. What is left over is the baby's age.",
      definition:
        "- Older members' total now = their past total + \\(n\\) × the years since.\n" +
        "- Family total now = \\((n + 1)\\) × today's average.\n" +
        "- **Baby's age** = the difference. Two babies: the difference is the sum of their ages.\n" +
        "- **Check:** a baby born after the old average was taken must be younger than the years since. A larger answer means the question is inconsistent.",
      formula: {
        label: "The baby's age",
        latex: "\\text{baby} = (n + 1)A_{\\text{now}} - \\left(nA_{\\text{then}} + n\\,t\\right)",
      },
      authoredExample: {
        prompt: "Six years ago the average age of 6 family members was 23. A baby has been born since, and today the average of all 7 is 25.5. Find the baby's age.",
        steps: [
          "The 6 then totalled 138; today they total \\(138 + 6 \\times 6 = 174\\).",
          "All 7 today total \\(7 \\times 25.5 = 178.5\\).",
          "The baby is \\(178.5 - 174 = 4.5\\) years old, which is less than 6, as it must be.",
        ],
        answer: "4.5 years.",
      },
      selfCheckExample: {
        prompt: "Four years ago the average age of a family of 6 was 20. Two children have been born since, and today the 8 average 18.5. Find the sum of the children's ages.",
        steps: [
          "The 6 total \\(120 + 6 \\times 4 = 144\\) today.",
          "All 8 total \\(8 \\times 18.5 = 148\\).",
          "The children's ages add up to \\(148 - 144 = 4\\).",
        ],
        answer: "4 years.",
      },
      practiceSet: [
        { prompt: "Four years ago, 6 family members averaged 22. A baby has been born since and the 7 now average 22.5. How old is the baby?", answer: "1.5 years" },
        { prompt: "A couple married 6 years ago at an average age of 25. With their child, the three now average 21.5. How old is the child?", answer: "2.5 years" },
        {
          prompt: "Seven years ago a family of 4 averaged 20. Twins have been born since, and the 6 now average 19.5. How old is each twin?",
          answer: "4.5 years",
          method: "The twins total \\(117 - 108 = 9\\).",
        },
      ],
      pyqExampleId: "09c9fd70-7743-437d-b37a-f1ed8b3f1755",
      traps: [
        {
          title: "Age the older members first",
          body: "If 6 members totalled 120 four years ago, they total 144 now. Forgetting those 24 years makes the baby 24 years too old.",
        },
        {
          title: "A just-born baby is 0",
          body: "If a question says a baby is born 'today' and the arithmetic gives the baby an age of 3, the question is inconsistent. A newborn adds nothing to the total.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-births-later",
      name: "Births at different times",
      intuition:
        "Bring everyone to today. The parents age by the full gap; each child has only the years since its own birth.",
      definition:
        "- **Step 1:** the older members' total now = past total + their number × the years since.\n" +
        "- **Step 2:** each child's age now = the years since that child was born.\n" +
        "- **Step 3:** add everything and divide by everyone alive today.\n" +
        "- With three or more events, draw a short time line first.",
      formula: {
        label: "Today's total",
        latex: "\\text{total now} = \\text{past total} + n\\,t + (\\text{each child's age now})",
      },
      authoredExample: {
        prompt: "Eight years ago a couple's average age was 24. Their first child was born 6 years ago and their second 3 years ago. Find the family's average age now.",
        steps: [
          "The couple then totalled 48; now \\(48 + 2 \\times 8 = 64\\).",
          "The children are 6 and 3: the total is \\(64 + 6 + 3 = 73\\).",
          "\\(73 \\div 4 = 18.25\\).",
        ],
        answer: "18.25 years.",
      },
      selfCheckExample: {
        prompt: "Six years ago a family of 3 averaged 22 years. One child was born 4 years ago and another 1 year ago. Find today's average.",
        steps: [
          "The 3 now total \\(66 + 3 \\times 6 = 84\\).",
          "With the children: \\(84 + 4 + 1 = 89\\) over 5 people.",
          "\\(89 \\div 5 = 17.8\\).",
        ],
        answer: "17.8 years.",
      },
      practiceSet: [
        { prompt: "Ten years ago a couple averaged 22 years. Their child was born 8 years ago. Find the family's average now.", answer: "24 years" },
        { prompt: "Six years ago, 4 family members averaged 31. Twins were born 4 years ago. Find the average now.", answer: "26 years" },
        { prompt: "Three years ago, 6 family members averaged 33. A baby was born a year ago. Find the average now.", answer: "31 years" },
      ],
      pyqExampleId: "589d440b-a1c9-48f7-a0fd-7e44dc31c987",
      traps: [
        {
          title: "Children age from their own birth",
          body: "A child born 6 years ago adds 6 to today's total, not the 8 years since the old average was taken.",
        },
      ],
    },
  ],
};
