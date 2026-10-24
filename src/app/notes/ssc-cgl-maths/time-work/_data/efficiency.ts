import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_EFFICIENCY_NOTE: SubtopicNote = {
  subtopicName: "Efficiency Ratios",
  title: "Efficiency Ratios",
  oneLineDefinition:
    "Efficiency is work done per day, so a worker who is k times as efficient takes one k-th of the time, and a ratio of times is a ratio of efficiencies turned upside down.",
  whyItMatters:
    "Thirteen questions in the bank, six EASY and seven MODERATE, four of them from the 2025 shifts: one worker 40% more efficient than another, one working 3.5 times as fast and taking 45 days less, times given in a ratio. Giving each worker its efficiency as units a day turns every one of them into whole numbers in one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwef-ratio",
      name: "Efficiency ratio and time ratio",
      intuition:
        "Twice as efficient means twice the work in a day, so the same job takes half as long. A ratio of efficiencies flips over to become the ratio of times.",
      definition:
        "- **Efficiency** is the work done per day, the same thing as the rate.\n" +
        "- **Time is inversely proportional to efficiency:** if the efficiencies are \\(p : q\\), the times are \\(q : p\\).\n" +
        "- **\"x% more efficient\"** means the efficiencies are \\((100 + x) : 100\\). Reduce it: 25% more is \\(5 : 4\\), 40% more is \\(7 : 5\\), 50% more is \\(3 : 2\\), 60% more is \\(8 : 5\\).\n" +
        "- **\"k times as efficient\"** multiplies the rate by \\(k\\) and divides the time by \\(k\\).\n" +
        "- **Fast route, units from efficiency:** give each worker its efficiency in units a day. The whole job \\(=\\) efficiency \\(\\times\\) own days for any one worker, and working together you add the efficiencies.",
      formula: {
        label: "Efficiency and time",
        latex: "\\frac{T_A}{T_B} = \\frac{E_B}{E_A} \\qquad \\text{Work} = E \\times T",
        symbols: [
          { symbol: "\\(E_A, E_B\\)", meaning: "efficiencies (work per day) of A and B" },
          { symbol: "\\(T_A, T_B\\)", meaning: "days each needs alone" },
          { symbol: "E, T", meaning: "one worker's efficiency and the days that worker needs" },
        ],
      },
      authoredExample: {
        prompt: "A is 25% more efficient than B. B alone can finish a job in 30 days. How long do A and B take working together?",
        steps: [
          "Efficiencies A : B \\(= 125 : 100 = 5 : 4\\). Give A 5 units a day and B 4.",
          "Job \\(= 4 \\times 30 = 120\\) units, using B's efficiency and B's days.",
          "Together they do \\(5 + 4 = 9\\) units a day, so they take \\(\\frac{120}{9} = 13\\frac{1}{3}\\) days.",
          "Check: A alone takes \\(\\frac{120}{5} = 24\\) days, and \\(\\frac{1}{24} + \\frac{1}{30} = \\frac{5 + 4}{120} = \\frac{9}{120}\\).",
        ],
        answer: "\\(13\\frac{1}{3}\\) days",
      },
      selfCheckExample: {
        prompt: "The efficiencies of P and Q are in the ratio 4 : 3. Q alone takes 20 days for a job. How long do P and Q take working together?",
        steps: [
          "Give P 4 units a day and Q 3. Job \\(= 3 \\times 20 = 60\\) units.",
          "Together they do 7 units a day, so they take \\(\\frac{60}{7} = 8\\frac{4}{7}\\) days.",
        ],
        answer: "\\(8\\frac{4}{7}\\) days",
      },
      practiceSet: [
        {
          prompt: "A is 50% more efficient than B. B takes 24 days alone for a job. How many days does A take alone?",
          answer: "16 days",
          method: "Efficiencies \\(3 : 2\\), so times \\(2 : 3\\): \\(24 \\times \\frac{2}{3} = 16\\).",
        },
        { prompt: "R takes 12 days and S takes 18 days for the same job. What is the ratio of their efficiencies, R : S?", answer: "3 : 2" },
        {
          prompt: "X is 3 times as efficient as Y. Together they finish a job in 9 days. How long does Y take alone?",
          answer: "36 days",
          method: "Y does 1 unit, X 3 units a day; job \\(= 4 \\times 9 = 36\\) units.",
        },
        { prompt: "The times taken by A and B for a job are in the ratio 5 : 3. What is the ratio of their efficiencies, A : B?", answer: "3 : 5" },
      ],
      pyqExampleId: "fd6effeb-c418-4035-a30f-c518cf3d199c",
      traps: [
        {
          title: "Not flipping the ratio",
          body:
            "If the efficiencies are \\(5 : 2\\), the times are \\(2 : 5\\), not \\(5 : 2\\). The more efficient worker always takes less time.",
        },
        {
          title: "Reading 60% more efficient as 60% less time",
          body:
            "A worker 60% more efficient takes \\(\\frac{100}{160} = \\frac{5}{8}\\) of the time, a cut of 37.5%, not 60%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwef-gap",
      name: "A faster worker who takes fewer days",
      intuition:
        "If A is 3 times as fast as B, B needs 3 times A's days. The gap between their times is then 2 of A's times, and that pins down A's time.",
      definition:
        "- If A works \\(k\\) times as fast as B and takes \\(t\\) days, B takes \\(kt\\) days.\n" +
        "- The gap is \\(kt - t = (k - 1)t\\). Set it equal to the stated difference \\(D\\): \\(t = \\frac{D}{k - 1}\\).\n" +
        "- Together they take \\(\\frac{t \\times kt}{t + kt} = \\frac{kt}{k + 1}\\) days.\n" +
        "- **Wording:** SSC's keys read \"k times more efficient\" as \\(k\\) times as efficient, although strictly the words mean \\(k + 1\\) times. Solve with \\(k\\) the way the key does, and look at the options before choosing.",
      formula: {
        label: "Faster worker, fewer days",
        latex: "t = \\frac{D}{k - 1} \\qquad T_{\\text{together}} = \\frac{kt}{k + 1}",
        symbols: [
          { symbol: "k", meaning: "how many times as fast A is as B" },
          { symbol: "t", meaning: "days A takes alone" },
          { symbol: "D", meaning: "how many fewer days A takes than B" },
        ],
      },
      authoredExample: {
        prompt: "A works 4 times as fast as B and takes 30 days less than B to finish a job. How long do they take working together?",
        steps: [
          "If A takes \\(t\\) days, B takes \\(4t\\). The gap is \\(3t = 30\\), so \\(t = 10\\): A takes 10 days and B 40.",
          "Together: \\(\\frac{10 \\times 40}{10 + 40} = \\frac{400}{50} = 8\\) days.",
          "Fast route: \\(\\frac{kt}{k + 1} = \\frac{4 \\times 10}{5} = 8\\).",
        ],
        answer: "8 days",
      },
      selfCheckExample: {
        prompt: "P works 2.5 times as fast as Q and finishes a job 24 days sooner than Q. How many days does Q take alone?",
        steps: [
          "If P takes \\(t\\) days, Q takes \\(2.5t\\). The gap is \\(1.5t = 24\\), so \\(t = 16\\).",
          "Q takes \\(2.5 \\times 16 = 40\\) days.",
        ],
        answer: "40 days",
      },
      practiceSet: [
        { prompt: "A is twice as fast as B and takes 12 days less than B for a job. How many days does A take alone?", answer: "12 days" },
        {
          prompt: "A works 3 times as fast as B. A takes 8 days alone for a job. How many days do A and B take together?",
          answer: "6 days",
          method: "B takes 24 days; \\(\\frac{8 \\times 24}{32} = 6\\).",
        },
        {
          prompt: "X is 5 times as efficient as Y and takes 20 days less than Y for a job. How long does Y take alone?",
          answer: "25 days",
          method: "\\(4t = 20\\), so X takes 5 days and Y 25.",
        },
      ],
      pyqExampleId: "5285779e-57f8-4a45-929b-27414c9569ef",
      traps: [
        {
          title: "Dividing the gap by k",
          body:
            "If A is 3 times as fast as B and takes 40 days less, A's time is \\(\\frac{40}{3 - 1} = 20\\) days, not \\(\\frac{40}{3}\\). The gap is \\(k - 1\\) of A's times.",
        },
      ],
    },
  ],
};
