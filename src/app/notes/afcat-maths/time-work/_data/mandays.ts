import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_MANDAYS_NOTE: SubtopicNote = {
  subtopicName: "Man-Days and Group Work",
  title: "Man-Days, Man-Hours and Groups of Workers",
  oneLineDefinition:
    "Measure a job in man-days or man-hours: more workers need fewer days, longer working days need fewer days, and a bigger job needs more of both.",
  whyItMatters:
    "This is the largest page in the chapter, and over half of it is EASY. Two AFCAT past-year questions sit here, both from 2016. Marks go when a question mixes men, women and children: turn everyone into one kind of worker before you count anything.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-man-days",
      name: "Man-days: workers × days",
      intuition:
        "A job needs a fixed amount of labour. 12 workers for 10 days is 120 **man-days**, and any team that puts in 120 man-days finishes it: 20 workers in 6 days, or 8 workers in 15. Ratio and Proportion met this as inverse variation; here it becomes the main tool.",
      definition:
        "- Work = workers × days. For the same job, \\(M_1 D_1 = M_2 D_2\\).\n" +
        "- More workers means fewer days. Halving the team doubles the time.\n" +
        "- If only part of the job is done, scale the man-days: \\(\\tfrac 35\\) of a job in 300 man-days means the whole job is 500 man-days.\n" +
        "- Anything used at a steady rate works the same way: food eaten, pages typed.",
      formula: {
        label: "Man-days",
        latex: "M_1 D_1 = M_2 D_2",
      },
      authoredExample: {
        prompt: "14 men can build a wall in 30 days. How many men are needed to build it in 21 days?",
        steps: ["The wall is \\(14 \\times 30 = 420\\) man-days.", "In 21 days it needs \\(420 \\div 21 = 20\\) men."],
        answer: "20 men.",
      },
      selfCheckExample: {
        prompt: "9 workers do \\(\\tfrac 35\\) of a job in 10 days. How many workers are needed to do the whole job in 15 days?",
        steps: [
          "\\(\\tfrac 35\\) of the job is \\(9 \\times 10 = 90\\) man-days, so the whole job is \\(90 \\times \\tfrac 53 = 150\\).",
          "In 15 days that needs \\(150 \\div 15 = 10\\) workers.",
        ],
        answer: "10 workers.",
      },
      practiceSet: [
        { prompt: "8 women can finish a task in 21 days. How long do 12 women take?", answer: "14 days" },
        { prompt: "A camp has food for 40 cadets for 15 days. How long does it last 30 cadets?", answer: "20 days" },
        { prompt: "6 painters take 20 days to paint a building. How many painters can paint it in 8 days?", answer: "15 painters" },
      ],
      pyqExampleId: "866e6dd1-b043-48f8-ac75-9bbdd1e77016",
      traps: [
        {
          title: "More workers, fewer days",
          body: "If 10 men take 12 days, 15 men take 8 days, not 18. Multiply men by days and divide; never scale the days up with the men.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-man-hours",
      name: "Man-hours: when the working day changes",
      intuition:
        "If the length of the working day changes, count hours instead of days. 10 men working 9 hours a day for 4 days put in 360 **man-hours**, and that is the job, whatever the mix of men, hours and days.",
      definition:
        "- Work = men × hours a day × days. For the same job, \\(M_1 H_1 D_1 = M_2 H_2 D_2\\).\n" +
        "- The unknown can be any one of the three: men, hours a day or days.\n" +
        "- Weeks work the same way: men × days a week × hours a day × weeks.",
      formula: {
        label: "Man-hours",
        latex: "M_1 H_1 D_1 = M_2 H_2 D_2",
      },
      authoredExample: {
        prompt: "12 men working 10 hours a day finish a job in 9 days. How many days do 9 men working 12 hours a day take?",
        steps: ["The job is \\(12 \\times 10 \\times 9 = 1080\\) man-hours.", "9 men at 12 hours put in 108 man-hours a day, so \\(1080 \\div 108 = 10\\) days."],
        answer: "10 days.",
      },
      selfCheckExample: {
        prompt:
          "4 programmers working 9 hours a day finish a project in 10 days. How many hours a day must the same team work to finish it in 9 days?",
        steps: ["The project is \\(4 \\times 9 \\times 10 = 360\\) man-hours.", "In 9 days the team must put in \\(360 \\div 9 = 40\\) a day, which is \\(40 \\div 4 = 10\\) hours each."],
        answer: "10 hours a day.",
      },
      practiceSet: [
        {
          prompt: "20 workers working 9 hours a day take 10 days for a job. How many workers finish it in 12 days working 5 hours a day?",
          answer: "30 workers",
        },
        {
          prompt:
            "A team works 4 days a week, 9 hours a day, and finishes a task in 10 weeks. How many weeks does the same team take working 3 days a week, 10 hours a day?",
          answer: "12 weeks",
        },
        { prompt: "Workers on 10-hour days finish an order in 12 days. How many days do they take on 5-hour days?", answer: "24 days" },
      ],
      pyqExampleId: "7dcf52ee-975f-4ace-8f1c-febd3affda90",
      traps: [
        {
          title: "Hours a day are part of the work",
          body: "If the hours a day change and you count only men × days, the answer is out by the ratio of the hours. A team that halves its hours needs twice the days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-output-work",
      name: "When the amount of work changes",
      intuition:
        "When the job itself changes size, say 90 shirts instead of 60, find the labour for one unit of output first. Then multiply by the new output and share it out among the new team.",
      definition:
        "- \\(\\dfrac{M_1 H_1 D_1}{W_1} = \\dfrac{M_2 H_2 D_2}{W_2}\\), where \\(W\\) is the output: walls, metres, chairs, books.\n" +
        "- Labour for one unit of output is \\(\\tfrac{MHD}{W}\\). Leave out \\(H\\) when hours are not mentioned.\n" +
        "- An unknown output is the labour available ÷ the labour per unit.\n" +
        "- Phases of a job split in a ratio: the labour for each phase is in that ratio.",
      formula: {
        label: "Work with output",
        latex: "\\dfrac{M_1 H_1 D_1}{W_1} = \\dfrac{M_2 H_2 D_2}{W_2}",
      },
      authoredExample: {
        prompt: "15 tailors stitch 60 shirts in 8 days. How many shirts do 20 tailors stitch in 9 days?",
        steps: [
          "One shirt takes \\(\\dfrac{15 \\times 8}{60} = 2\\) tailor-days.",
          "20 tailors for 9 days give 180 tailor-days, so \\(180 \\div 2 = 90\\) shirts.",
        ],
        answer: "90 shirts.",
      },
      selfCheckExample: {
        prompt:
          "24 men working 5 hours a day lay 80 m of road in 10 days. How many days do 30 men working 8 hours a day take to lay 128 m?",
        steps: [
          "One metre takes \\(\\dfrac{24 \\times 5 \\times 10}{80} = 15\\) man-hours, so 128 m take 1,920.",
          "30 men at 8 hours put in 240 man-hours a day: \\(1920 \\div 240 = 8\\) days.",
        ],
        answer: "8 days.",
      },
      practiceSet: [
        { prompt: "9 printers print 540 books in 4 days. How many printers print 900 books in 6 days?", answer: "10 printers" },
        {
          prompt: "A job has three phases with work in the ratio \\(1 : 2 : 3\\). Phase 1 takes 8 workers 15 days. How long does phase 3 take 24 workers?",
          answer: "15 days",
        },
        {
          prompt:
            "8 gardeners working 5 hours a day plant 240 saplings in 5 days. How many saplings do 9 gardeners plant in 5 days working 8 hours a day?",
          answer: "432 saplings",
        },
      ],
      pyqExampleId: "af94f374-ddc5-4838-b9ba-6e887de4fc5f",
      traps: [
        {
          title: "Output goes under the labour",
          body: "More output needs more labour. Writing \\(\\tfrac{MHD}{W}\\) keeps that straight: doubling the walls doubles the man-days instead of halving them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-equivalent-workers",
      name: "Converting men, women and children",
      intuition:
        "'2 men or 3 women can do the job in 18 days' says that 2 men do as much as 3 women. Turn everyone into one kind of worker, and the question becomes man-days again.",
      definition:
        "- '\\(p\\) men or \\(q\\) women' in the same time means \\(p\\) men = \\(q\\) women, so 1 man = \\(\\tfrac qp\\) women.\n" +
        "- Convert the new team into women (or men). The job is then women × days.\n" +
        "- Three kinds at once, such as '1 man or 2 women or 4 children': convert everyone to children, or give each a rate and add.\n" +
        "- Half of one team plus half of the other makes one full team, which takes the same time.",
      formula: {
        label: "Equivalent workers",
        latex: "p \\text{ men} = q \\text{ women} \\;\\Rightarrow\\; 1 \\text{ man} = \\tfrac qp \\text{ women}",
      },
      authoredExample: {
        prompt: "2 men or 3 women can do a job in 18 days. How long do 2 men and 6 women take together?",
        steps: [
          "The job is \\(3 \\times 18 = 54\\) woman-days, and 2 men count as 3 women.",
          "The team is \\(3 + 6 = 9\\) women, so \\(54 \\div 9 = 6\\) days.",
        ],
        answer: "6 days.",
      },
      selfCheckExample: {
        prompt: "1 man, 2 women or 4 children can finish a job in 36 days. How long do 1 man, 1 woman and 2 children take together?",
        steps: [
          "In children, a man is 4 and a woman is 2. The job is \\(4 \\times 36 = 144\\) child-days.",
          "The team is \\(4 + 2 + 2 = 8\\) children, so \\(144 \\div 8 = 18\\) days.",
        ],
        answer: "18 days.",
      },
      practiceSet: [
        { prompt: "6 men or 10 women can do a job in 30 days. How long do 3 men and 5 women take together?", answer: "30 days" },
        { prompt: "9 men or 15 women can finish a task in 20 days. How long do 6 men and 10 women take together?", answer: "15 days" },
        {
          prompt:
            "2 men do as much work as 3 women or 6 boys. A job needs 8 men and 6 women for 10 days. How many boys can finish it in 20 days?",
          answer: "18 boys",
        },
      ],
      pyqExampleId: "bf80ab57-55c2-4022-b45a-2ec6817930c0",
      traps: [
        {
          title: "'Or' is not 'and'",
          body: "'4 men or 6 women in 20 days' means either group alone takes 20 days. 4 men and 6 women working together are two full teams and take 10 days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-two-teams",
      name: "Two mixed teams: solve for one worker",
      intuition:
        "When two different teams finish the same job, their total labour is equal. Write a man's daily work as \\(m\\) and a woman's as \\(w\\). The equal-work equation gives \\(m : w\\), and then everything is in one unit.",
      definition:
        "- Same job: (team 1's daily work) × its days = (team 2's daily work) × its days.\n" +
        "- That gives the ratio \\(m : w\\), and the job becomes a number of woman-days.\n" +
        "- If the two teams take the same time, their daily work is equal.\n" +
        "- From 'x men take a days and y women take b days', the efficiency ratio is \\(m : w = yb : xa\\).",
      formula: {
        label: "Equal work",
        latex: "(p\\,m + q\\,w)\\, d_1 = (r\\,m + s\\,w)\\, d_2",
      },
      authoredExample: {
        prompt:
          "1 man and 4 women finish a job in 15 days; 2 men and 1 woman finish it in 18 days. How long does 1 man take alone?",
        steps: [
          "\\((m + 4w) \\times 15 = (2m + w) \\times 18\\), so \\(15m + 60w = 36m + 18w\\).",
          "\\(42w = 21m\\), so \\(m = 2w\\).",
          "The job is \\((2w + 4w) \\times 15 = 90w\\), and one man does \\(2w\\) a day: \\(90 \\div 2 = 45\\) days.",
        ],
        answer: "45 days.",
      },
      selfCheckExample: {
        prompt: "8 men can do a job in 15 days and 12 women can do it in 20 days. Find the ratio of a man's work to a woman's.",
        steps: ["The job is 120 man-days or 240 woman-days.", "So one man's day equals two women's days."],
        answer: "\\(2 : 1\\).",
      },
      practiceSet: [
        {
          prompt: "5 men and 2 boys finish a job in 6 days; 2 men and 5 boys finish it in 8 days. Find the ratio of a man's daily work to a boy's.",
          answer: "\\(2 : 1\\)",
        },
        {
          prompt:
            "9 men working 6 hours a day finish a job in 20 days; 15 women working 8 hours a day finish it in 18 days. Find the ratio of a man's efficiency to a woman's.",
          answer: "\\(2 : 1\\)",
        },
        {
          prompt: "3 men and 5 women finish a job in 8 days, and 4 men and 3 women also take 8 days. How long do 8 women take alone?",
          answer: "11 days",
        },
      ],
      pyqExampleId: "c15fd938-2c78-4789-be26-31712e5596e7",
      traps: [
        {
          title: "Equal work, not equal daily work",
          body: "Two teams finishing the same job in different times have equal TOTAL work. Setting their daily work equal is right only when their days are equal too.",
        },
      ],
    },
  ],
};
