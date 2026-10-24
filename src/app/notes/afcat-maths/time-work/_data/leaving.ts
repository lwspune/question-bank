import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_LEAVING_NOTE: SubtopicNote = {
  subtopicName: "Partial Work, Joining and Leaving",
  title: "Someone Leaves or Takes Over",
  oneLineDefinition:
    "When people join or leave partway through a job, cut it into stages, find the work done in each, and give what is left to whoever is still working.",
  whyItMatters:
    "Three AFCAT past-year questions are on this page, from 2016, 2017 and 2019, and over a third of its questions are HARD. The marks go on the stage boundaries: counting the last stage from the start of the job, or forgetting that 'leaves 3 days before the end' fixes the last stage, not the first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-then-takes-over",
      name: "Work in stages: one stops, another finishes",
      intuition:
        "Lay the job out as a timeline. Each stage has a fixed team, so its work is that team's rate × its days. The stages add up to the whole job, and the unknown is usually the length of the last stage or one person's rate.",
      definition:
        "- Work in a stage = (sum of the rates of those working) × (days in the stage).\n" +
        "- Work left after a stage = 1 minus the work done so far. Divide it by the rate of whoever carries on.\n" +
        "- If the finisher's rate is unknown, the stage they worked alone gives it: work left ÷ days.\n" +
        "- 'How many more days' is the last stage alone. 'In how many days was the work done' is all the stages added.\n" +
        "- With three people dropping out in turn, keep a running total. Taking the job as the LCM of the times keeps every stage a whole number of units.",
      formula: {
        label: "Stages",
        latex: "\\sum (\\text{rate} \\times \\text{days}) = 1",
      },
      authoredExample: {
        prompt:
          "A can do a job in 8 days and B in 24 days. They work together for 3 days, then A leaves. How many more days does B take to finish?",
        steps: [
          "Together they do \\(\\tfrac 18 + \\tfrac 1{24} = \\tfrac 4{24} = \\tfrac 16\\) a day, so 3 days do \\(\\tfrac 12\\).",
          "B does the other \\(\\tfrac 12\\) at \\(\\tfrac 1{24}\\) a day: \\(\\tfrac 12 \\times 24 = 12\\) days.",
        ],
        answer: "12 more days.",
      },
      selfCheckExample: {
        prompt:
          "A and B together can finish a job in 24 days. They work together for 16 days, then B leaves, and A finishes the rest in 14 days. How long would B take alone?",
        steps: [
          "In 16 days together they do \\(\\tfrac{16}{24} = \\tfrac 23\\).",
          "A does the last \\(\\tfrac 13\\) in 14 days, so A alone takes 42 days.",
          "B's rate is \\(\\tfrac 1{24} - \\tfrac 1{42} = \\tfrac{7 - 4}{168} = \\tfrac 1{56}\\).",
        ],
        answer: "56 days.",
      },
      practiceSet: [
        {
          prompt: "A can do a job in 20 days. He works for 5 days, then B finishes it in 12 days. How long would B take alone?",
          answer: "16 days",
        },
        {
          prompt: "A and B can finish a job in 12 and 24 days. They start together, but A leaves after 2 days. How many more days does B need?",
          answer: "18 days",
        },
        {
          prompt: "A and B do 4% and 8% of a job a day. They work together for 5 days, then A leaves. How many more days does B need?",
          answer: "5 days",
        },
        {
          prompt:
            "A, B and C can do a job in 12, 18 and 36 days. All three start, A leaves after 2 days, and B leaves 2 days after that. How many more days does C need?",
          answer: "18 days",
          method: "Job of 36 units: 12 units, then 6 units, then 18 left.",
        },
      ],
      pyqExampleId: "38562e9d-75c9-4186-ba0a-341cdc8daa37",
      traps: [
        {
          title: "More days, or days in all?",
          body: "If A works 5 days and B then needs 12 more, the job took 17 days. Check which of the two the question asks for before you answer.",
        },
        {
          title: "Use the rate of whoever is left",
          body: "After A leaves, the rest of the work goes at B's rate alone. Dividing it by the joint rate makes the last stage far too short.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-leaves-before-end",
      name: "Leaving a few days before the end",
      intuition:
        "When someone leaves 'k days before the work is finished', you do not know when they left, only when the job ended. Call the whole time \\(t\\). The one who left worked \\(t - k\\) days, everyone else worked \\(t\\), and one equation in \\(t\\) does the rest.",
      definition:
        "- Each person's work = their rate × the days they actually worked.\n" +
        "- A leaving \\(k\\) days early: \\(\\dfrac{t - k}{a} + \\dfrac tb = 1\\).\n" +
        "- Shortcut: B works alone for the last \\(k\\) days. Take that, \\(\\tfrac kb\\), off the job, and the rest was done together.\n" +
        "- Wages follow the work done, so once \\(t\\) is known, each person's pay is their share of the work, as on Combined Work.",
      formula: {
        label: "Leaving k days early",
        latex: "\\dfrac{t - k}{a} + \\dfrac{t}{b} = 1",
      },
      authoredExample: {
        prompt:
          "A can do a job in 12 days and B in 18 days. They start together, but A leaves 3 days before the job is finished. How long does the job take?",
        steps: [
          "A works \\(t - 3\\) days and B works \\(t\\): \\(\\dfrac{t - 3}{12} + \\dfrac t{18} = 1\\).",
          "Multiply by 36: \\(3(t - 3) + 2t = 36\\), so \\(5t = 45\\).",
          "Check with the shortcut: B's last 3 days do \\(\\tfrac 16\\), and the other \\(\\tfrac 56\\) at \\(\\tfrac 5{36}\\) a day takes 6 days.",
        ],
        answer: "9 days.",
      },
      selfCheckExample: {
        prompt:
          "P and Q can do a job in 9 and 18 days. They start together, but Q leaves 3 days before the end. They are paid ₹1,800 for the job. How much does Q get?",
        steps: [
          "\\(\\dfrac t9 + \\dfrac{t - 3}{18} = 1\\) gives \\(2t + t - 3 = 18\\), so \\(t = 7\\).",
          "Q worked 4 days and did \\(\\tfrac 4{18} = \\tfrac 29\\) of the job.",
          "Q's pay is \\(\\tfrac 29 \\times 1800\\).",
        ],
        answer: "₹400.",
      },
      practiceSet: [
        {
          prompt: "X and Y can do a job in 12 and 36 days. They start together, but X leaves 4 days before the end. How long does the job take?",
          answer: "12 days",
        },
        {
          prompt: "A, B and C can do a job in 12, 18 and 36 days. They start together, but C leaves 6 days before the end. How long does the job take?",
          answer: "7 days",
        },
      ],
      pyqExampleId: "d55914bf-f9e6-4dee-ac2c-6050798dd529",
      traps: [
        {
          title: "The one who left worked fewer days",
          body: "If the job takes \\(t\\) days and A leaves 3 days before the end, A worked \\(t - 3\\) days. Writing \\(t + 3\\), or giving A the full \\(t\\), loses the mark.",
        },
      ],
    },
  ],
};
