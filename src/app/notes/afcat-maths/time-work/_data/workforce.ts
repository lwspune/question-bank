import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_WORKFORCE_NOTE: SubtopicNote = {
  subtopicName: "Workforce Changes Mid-Job",
  title: "When Workers Leave or Join Mid-Job",
  oneLineDefinition:
    "Take the man-days already done away from the job, give what is left to the team now on site, and compare with the plan only when the question asks.",
  whyItMatters:
    "No AFCAT past-year question is on this page yet, but it is the second largest in the chapter and most of it is MODERATE. The method is one line; the marks go on the question's last words, because 'more days', 'days in all' and 'days beyond the plan' are three different answers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-remaining-man-days",
      name: "Work left after the team changes",
      intuition:
        "Before the change, the full team put in some man-days. Take them away from the job, and what is left must be done by the team now on site. The plan is not needed at all unless the question compares with it.",
      definition:
        "- Work left = job minus (old team × days worked).\n" +
        "- More days = work left ÷ new team. Days in all = days already worked + more days.\n" +
        "- Several changes: take away each stage's man-days in turn.\n" +
        "- A change by a fraction, such as 'a third of them leave': call the team 3 parts, so 2 parts stay.",
      formula: {
        label: "Days after a change",
        latex: "\\text{more days} = \\dfrac{M D - M d}{M'}",
      },
      authoredExample: {
        prompt:
          "36 men can finish a road in 25 days. After 10 days, 12 men leave. How many more days does the road take, and how many days in all?",
        steps: [
          "The road is \\(36 \\times 25 = 900\\) man-days, and 10 days did \\(360\\), leaving \\(540\\).",
          "24 men need \\(540 \\div 24 = 22.5\\) more days.",
          "In all: \\(10 + 22.5\\) days.",
        ],
        answer: "22.5 more days; 32.5 days in all.",
      },
      selfCheckExample: {
        prompt: "A group can finish a job in 18 days. After 6 days, a third of the group leaves. How many more days does the job take?",
        steps: [
          "The full group still had 12 days of work left.",
          "Two thirds of the group take \\(12 \\times \\tfrac 32 = 18\\) days for it.",
        ],
        answer: "18 more days.",
      },
      practiceSet: [
        { prompt: "24 workers can finish a job in 15 days. After 5 days, 4 workers leave and 10 join. How many more days are needed?", answer: "8 days" },
        { prompt: "30 men can dig a canal in 32 days. After 12 days, 6 men leave. How many days does the canal take in all?", answer: "37 days" },
        {
          prompt: "28 workers can finish a job in 18 days. After 6 days, 7 leave, and 4 days later 7 join. How many more days are needed after that?",
          answer: "9 days",
        },
      ],
      pyqExampleId: "2d759eba-45fe-46fb-b9fe-65bcc3198153",
      traps: [
        {
          title: "Take away the work already done",
          body: "If 30 men need 16 days and 6 leave after 4 days, the 24 men share only the 360 man-days that are left: 15 more days. Dividing the whole 480 man-days by 24 counts the first 4 days twice.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-extra-days",
      name: "Extra days against the plan",
      intuition:
        "At the moment of the change, the plan still had some days to run. The new team needs more days than that, or fewer if workers joined. The extra days are the difference, and there is a quick formula for it.",
      definition:
        "- Planned days left = planned total minus days worked.\n" +
        "- Extra days = actual days left minus planned days left. If workers join, the same difference is the days saved.\n" +
        "- Shortcut when \\(L\\) workers leave a team of \\(M\\) with \\(R\\) planned days left: extra days = \\(\\dfrac{L R}{M - L}\\).\n" +
        "- Read the last words. 'Extra', 'beyond the plan' and 'after the planned date' ask for the difference; 'more days to finish' asks for the actual days left. 'Additional days' is used both ways, so check which reading is among the options.",
      formula: {
        label: "Extra days",
        latex: "\\text{extra} = \\dfrac{L \\times R}{M - L}",
      },
      authoredExample: {
        prompt:
          "40 workers were to finish a job in 30 days. After 10 days, 8 workers leave. How many days beyond the plan does the job take?",
        steps: [
          "The plan had \\(R = 20\\) days left.",
          "Extra days \\(= \\dfrac{8 \\times 20}{40 - 8} = \\dfrac{160}{32} = 5\\).",
          "Check: the 800 man-days left take 32 workers 25 days, 5 more than the 20 planned.",
        ],
        answer: "5 days.",
      },
      selfCheckExample: {
        prompt: "15 men were to finish a building in 40 days. After 10 days, 5 more men join. How many days early is it finished?",
        steps: [
          "The 450 man-days left take 20 men 22.5 days.",
          "The plan had 30 days left, so it ends \\(30 - 22.5 = 7.5\\) days early.",
        ],
        answer: "7.5 days early.",
      },
      practiceSet: [
        { prompt: "50 workers were to finish a job in 80 days. After 30 days, 10 leave. How many extra days are needed?", answer: "12.5 days" },
        { prompt: "40 men were to finish a road in 35 days. After 15 days, 8 leave. How many days late is the road?", answer: "5 days" },
        {
          prompt: "A job was planned for 25 workers over 30 days. After 10 days, 5 workers leave. How many days does the job take in all?",
          answer: "35 days",
        },
      ],
      pyqExampleId: "3ae2598b-071c-4148-be1e-3c5fb80d5673",
      traps: [
        {
          title: "Extra is not the same as more",
          body: "When 40 workers are planned for 30 days and 8 leave after 10 days, the job needs 25 more days, which is 5 beyond the plan. A question asking for extra days wants 5; one asking for more days wants 25.",
        },
        {
          title: "Joining saves days",
          body: "When \\(J\\) workers join, the days saved are \\(\\dfrac{J R}{M + J}\\): the team grows, so the sum goes below the line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-finish-on-time",
      name: "Keeping to the deadline",
      intuition:
        "Sometimes the deadline is fixed and the question asks what must change to meet it: how many workers to hire, or how many hours a day to work. Find the work left and the days left, then divide.",
      definition:
        "- Workers needed = work left ÷ days left. Hire the difference between that and the workers still on the job.\n" +
        "- Hours a day needed = man-hours left ÷ (workers × days left).\n" +
        "- 'Will it finish on time?': work out the days the new team needs and compare them with the days left in the plan.",
      formula: {
        label: "Team needed",
        latex: "\\text{workers} = \\dfrac{\\text{work left}}{\\text{days left}}",
      },
      authoredExample: {
        prompt: "10 workers were to finish a job in 16 days. After 6 days, 2 workers leave. How many must be hired to finish on time?",
        steps: [
          "The job is 160 man-days and 60 are done, so 100 are left for the last 10 days.",
          "That needs \\(100 \\div 10 = 10\\) workers. 8 are still there.",
        ],
        answer: "2 workers.",
      },
      selfCheckExample: {
        prompt:
          "24 men working 6 hours a day were to finish a job in 16 days. After 8 days, 8 men leave. How many hours a day must the rest work to finish on time?",
        steps: [
          "The man-hours left are \\(24 \\times 6 \\times 8 = 1152\\).",
          "16 men over 8 days give 128 man-days, so \\(1152 \\div 128 = 9\\) hours a day.",
        ],
        answer: "9 hours a day.",
      },
      practiceSet: [
        {
          prompt: "A job is planned for 14 workers over 26 days. After 6 days, the deadline is brought 6 days forward. How many more workers are needed?",
          answer: "6 more workers",
        },
        {
          prompt:
            "40 workers working 6 hours a day were to finish a task in 24 days. After 16 days, 10 leave and the rest work 8 hours a day. Is the task finished on time?",
          answer: "Yes, exactly on time",
        },
      ],
      pyqExampleId: "0ce19921-d1a6-4d62-a65a-0c2dfc824c94",
      traps: [
        {
          title: "Count from the workers still there",
          body: "If 10 workers are needed and 2 of the original 10 have left, hire 2. Answering 10 hires a whole new team on top of the one already working.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-changed-team",
      name: "Hours, efficiency and team size change together",
      intuition:
        "The hardest questions change more than one thing at once: the team shrinks and the hours grow, or new workers come in at a different efficiency. Count everyone as standard workers and every day as standard hours, and it is the same subtraction.",
      definition:
        "- When hours a day change, count the work in man-hours: men × hours × days.\n" +
        "- New workers at \\(p\\%\\) efficiency count as \\(\\tfrac{p}{100}\\) of a worker each. Overtime that raises efficiency by 25% makes each worker count as 1.25.\n" +
        "- **Unknown team size**: write the job as \\(n\\) × planned days, write it again from the story that happened, and solve for \\(n\\).\n" +
        "- A fixed end date with stages: the last group works whatever is left of the schedule.",
      formula: {
        label: "Standard workers",
        latex: "\\text{effective team} = \\text{regular workers} + \\tfrac{p}{100} \\times \\text{others}",
      },
      authoredExample: {
        prompt:
          "20 men working 8 hours a day can finish a job in 15 days. After 5 days, 4 men leave and the rest work 10 hours a day. How many more days are needed?",
        steps: [
          "The job is \\(20 \\times 8 \\times 15 = 2400\\) man-hours, and 5 days did 800.",
          "16 men at 10 hours put in 160 man-hours a day: \\(1600 \\div 160 = 10\\) days.",
        ],
        answer: "10 more days.",
      },
      selfCheckExample: {
        prompt:
          "30 workers can finish a job in 24 days. After 8 days, 12 leave and 8 trainees join, each 75% as efficient as a worker. How many more days are needed?",
        steps: [
          "Work left: \\(30 \\times 16 = 480\\) worker-days.",
          "The team is \\(18 + 8 \\times 0.75 = 24\\) workers, so \\(480 \\div 24 = 20\\) days.",
        ],
        answer: "20 more days.",
      },
      practiceSet: [
        {
          prompt: "A group planned to finish a job in 20 days. 4 men left after 5 days, and the job took 25 days in all. How many men were there at first?",
          answer: "16 men",
          method: "\\(20n = 5n + 20(n - 4)\\).",
        },
        {
          prompt: "24 workers can finish a job in 20 days. After 10 days, 8 leave and the rest raise their efficiency by 50%. How many more days are needed?",
          answer: "10 days",
        },
        {
          prompt: "Some men can finish a job in 30 days. With 10 more men it would take 6 days less. How many men are there?",
          answer: "40 men",
        },
      ],
      pyqExampleId: "4c357d59-8709-42e6-8431-baaf1c6fad7b",
      traps: [
        {
          title: "Efficiency changes the team, not the job",
          body: "Five trainees at 60% efficiency count as three workers. Adding all five as full workers makes the rest of the job look shorter than it is.",
        },
        {
          title: "Each stage at its own hours",
          body: "When the hours a day change partway, the work done so far was at the old hours. Only the work left is done at the new hours.",
        },
      ],
    },
  ],
};
