import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_MANDAYS_NOTE: SubtopicNote = {
  subtopicName: "Man-Days and Man-Hours",
  title: "Man-Days and Man-Hours",
  oneLineDefinition:
    "A job needs a fixed amount of labour, counted as workers times days (times hours a day), so more workers finish sooner in exact proportion.",
  whyItMatters:
    "Nineteen questions in the bank, eleven EASY and eight MODERATE, five of them from the 2025 shifts: more men for an earlier deadline, a change in hours a day, men added partway, or a few men leaving every day. Every one rests on a single product, workers × days × hours, which stays the same for the same work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwmd-rule",
      name: "Workers times days is fixed for a job",
      intuition:
        "10 men working for 6 days put in 60 man-days of labour. The job needs that same labour whoever does it, so 20 men need 3 days and 5 men need 12.",
      definition:
        "- **Man-days** of a job \\(=\\) workers \\(\\times\\) days. It is the same for any team of equally able workers.\n" +
        "- Fewer days need more workers: workers needed \\(=\\) man-days \\(\\div\\) days.\n" +
        "- **A different amount of work:** man-days scale with the work. Twice the work needs twice the man-days; a fraction \\(f\\) of the job needs \\(f\\) of them.\n" +
        "- **The full rule:** \\(\\frac{M_1 D_1}{W_1} = \\frac{M_2 D_2}{W_2}\\).\n" +
        "- **\"How many more\"** workers \\(=\\) workers needed \\(-\\) workers already there.",
      formula: {
        label: "Man-days rule",
        latex: "M_1 D_1 = M_2 D_2 \\qquad \\frac{M_1 D_1}{W_1} = \\frac{M_2 D_2}{W_2}",
        symbols: [
          { symbol: "\\(M_1, M_2\\)", meaning: "numbers of workers" },
          { symbol: "\\(D_1, D_2\\)", meaning: "days taken" },
          { symbol: "\\(W_1, W_2\\)", meaning: "amounts of work (1 for the whole job)" },
        ],
      },
      authoredExample: {
        prompt: "18 men can build a wall in 15 days. How many more men are needed to build it in 10 days?",
        steps: [
          "Labour \\(= 18 \\times 15 = 270\\) man-days.",
          "In 10 days the wall needs \\(270 \\div 10 = 27\\) men.",
          "More men needed \\(= 27 - 18 = 9\\).",
        ],
        answer: "9 more men",
      },
      selfCheckExample: {
        prompt: "12 workers can paint 3 identical houses in 20 days. How many days will 16 workers take to paint 5 such houses?",
        steps: [
          "\\(\\frac{12 \\times 20}{3} = \\frac{16 \\times D}{5}\\), so \\(80 = \\frac{16D}{5}\\).",
          "\\(D = \\frac{400}{16} = 25\\).",
        ],
        answer: "25 days",
      },
      practiceSet: [
        { prompt: "8 men finish a job in 21 days. How many days do 12 men take for the same job?", answer: "14 days" },
        {
          prompt: "A job takes 24 men 10 days. What percentage of it do 6 men finish in 8 days?",
          answer: "20%",
          method: "\\(\\frac{6 \\times 8}{240} = \\frac{1}{5}\\).",
        },
        {
          prompt: "10 men do \\(\\frac{1}{4}\\) of a job in 6 days. How many men are needed to do the whole job in 10 days?",
          answer: "24 men",
          method: "Whole job \\(= 60 \\times 4 = 240\\) man-days.",
        },
        { prompt: "20 boys can finish a job in 9 days. How many boys are needed to finish it in 6 days?", answer: "30 boys" },
      ],
      pyqExampleId: "5d123b60-10b7-4977-8c1c-eed2eaa62335",
      traps: [
        {
          title: "Working the proportion the wrong way",
          body:
            "More workers means fewer days. If 6 men take 20 days, 10 men take \\(20 \\times \\frac{6}{10} = 12\\) days, not \\(20 \\times \\frac{10}{6}\\).",
        },
        {
          title: "Giving the total when \"how many more\" is asked",
          body:
            "If 27 men are needed and 18 are already working, the answer to \"how many more\" is 9, and 27 is usually printed among the options too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwmd-hours",
      name: "Hours a day and part of a job",
      intuition:
        "A working day of 8 hours is more labour than a day of 6. When the hours a day differ, count labour in man-hours instead of man-days.",
      definition:
        "- **Man-hours** \\(=\\) workers \\(\\times\\) days \\(\\times\\) hours a day.\n" +
        "- **The rule:** \\(\\frac{M_1 D_1 H_1}{W_1} = \\frac{M_2 D_2 H_2}{W_2}\\). Put the part of the job each team does (40%, the remaining 60%) in \\(W\\).\n" +
        "- **One worker's hours:** if A needs 5 hours a day for 8 days, the job takes A 40 hours in all. For two workers, add their hourly rates, then divide the total hours by the hours worked each day.\n" +
        "- **Efficiency and hours together:** units done a day \\(=\\) efficiency per hour \\(\\times\\) hours a day.",
      formula: {
        label: "Man-hours rule",
        latex: "\\frac{M_1 D_1 H_1}{W_1} = \\frac{M_2 D_2 H_2}{W_2}",
        symbols: [
          { symbol: "\\(M_1, M_2\\)", meaning: "numbers of workers" },
          { symbol: "\\(D_1, D_2\\)", meaning: "days worked" },
          { symbol: "\\(H_1, H_2\\)", meaning: "hours worked each day" },
          { symbol: "\\(W_1, W_2\\)", meaning: "parts of the job done" },
        ],
      },
      authoredExample: {
        prompt: "12 men working 10 hours a day finish 30% of a job in 6 days. How many days will 14 men working 8 hours a day take to finish the rest?",
        steps: [
          "Labour for 30%: \\(12 \\times 6 \\times 10 = 720\\) man-hours, so the whole job needs \\(720 \\div 0.3 = 2400\\).",
          "The remaining 70% needs \\(1680\\) man-hours.",
          "14 men at 8 hours a day put in \\(112\\) man-hours a day, so \\(1680 \\div 112 = 15\\) days.",
        ],
        answer: "15 days",
      },
      selfCheckExample: {
        prompt: "Working 6 hours a day, A can finish a job in 12 days. Working 4 hours a day, B can finish it in 36 days. If both work together 6 hours a day, in how many days do they finish?",
        steps: [
          "A needs \\(6 \\times 12 = 72\\) hours and B needs \\(4 \\times 36 = 144\\) hours.",
          "Together each hour: \\(\\frac{1}{72} + \\frac{1}{144} = \\frac{3}{144} = \\frac{1}{48}\\), so they need 48 hours.",
          "At 6 hours a day: \\(48 \\div 6 = 8\\) days.",
        ],
        answer: "8 days",
      },
      practiceSet: [
        {
          prompt: "10 men working 6 hours a day finish a job in 12 days. How many days do 9 men working 8 hours a day take?",
          answer: "10 days",
          method: "\\(720 \\div 72 = 10\\).",
        },
        { prompt: "A finishes a job in 20 days working 3 hours a day. How many days does he need working 5 hours a day?", answer: "12 days" },
        {
          prompt: "P is twice as efficient as Q. P works 6 hours a day and finishes a job in 10 days. Q works 10 hours a day. How many days does Q take?",
          answer: "12 days",
          method: "Q does 1 unit an hour, P 2: job \\(= 2 \\times 6 \\times 10 = 120\\) units; Q does 10 a day.",
        },
      ],
      pyqExampleId: "7aa1fd92-e2ab-4ac0-837c-a697f23098a4",
      traps: [
        {
          title: "Ignoring a change in hours a day",
          body:
            "When the hours a day change, man-days are not equal; man-hours are. 10 men for 12 days at 6 hours is 720 man-hours, the same labour as 9 men for 10 days at 8 hours.",
        },
        {
          title: "Putting the part of the job on the wrong side",
          body:
            "Divide each team's labour by the work that team did. The 30% goes under the labour that did the 30%, and the remaining 70% under the labour that does the rest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwmd-change",
      name: "Workers added or leaving partway",
      intuition:
        "Labour already put in is banked. Work out what is left in man-days, then share it over the new team.",
      definition:
        "- **Man-days left** \\(=\\) total man-days \\(-\\) workers \\(\\times\\) days already worked.\n" +
        "- **Days for the rest** \\(=\\) man-days left \\(\\div\\) the new number of workers. If the hours a day change too, use man-hours.\n" +
        "- **A fixed number leave every day:** the workers present form a sequence \\(n, n - k, n - 2k, \\ldots\\). Over \\(d\\) days they put in \\(dn - k(0 + 1 + \\cdots + (d - 1)) = dn - \\frac{kd(d - 1)}{2}\\) man-days. Set that equal to the planned man-days.\n" +
        "- **Fast route for the sequence:** total \\(=\\) number of days \\(\\times\\) the average of the first and last day's workers.",
      formula: {
        label: "Changing workforce",
        latex: "\\text{Days left} = \\frac{n(D - t)}{n'} \\qquad dn - \\frac{kd(d - 1)}{2} = Dn",
        symbols: [
          { symbol: "n", meaning: "workers at the start" },
          { symbol: "D", meaning: "days the job would take them" },
          { symbol: "t", meaning: "days already worked" },
          { symbol: "n'", meaning: "workers after the change" },
          { symbol: "k", meaning: "workers who leave at the end of each day" },
          { symbol: "d", meaning: "days the job actually takes" },
        ],
      },
      authoredExample: {
        prompt: "20 men can finish a job in 18 days. After 6 days, 4 more men join. How many more days do they need?",
        steps: [
          "Total labour \\(= 20 \\times 18 = 360\\) man-days; in 6 days \\(120\\) are done, so 240 remain.",
          "Now 24 men work: \\(240 \\div 24 = 10\\) more days.",
        ],
        answer: "10 days",
      },
      selfCheckExample: {
        prompt: "A group planned to finish a job in 8 days, but 4 men left at the end of each day, and the job took 10 days. How many men were there at the start?",
        steps: [
          "With \\(n\\) men the job is \\(8n\\) man-days.",
          "Over 10 days the men present are \\(n, n - 4, \\ldots, n - 36\\), a total of \\(10n - 4(0 + 1 + \\cdots + 9) = 10n - 180\\).",
          "\\(10n - 180 = 8n\\), so \\(n = 90\\). Check: \\(10 \\times \\frac{90 + 54}{2} = 720 = 8 \\times 90\\).",
        ],
        answer: "90 men",
      },
      practiceSet: [
        {
          prompt: "16 men can finish a job in 25 days. After 10 days, 4 men leave. How many more days do the rest need?",
          answer: "20 days",
          method: "\\(400 - 160 = 240\\) man-days left for 12 men.",
        },
        {
          prompt: "A team of 50 men loses 2 men at the end of each day. How many man-days does it put in over 6 days?",
          answer: "270",
          method: "\\(6 \\times 50 - 2 \\times 15 = 270\\).",
        },
        {
          prompt: "20 men can finish a job in 12 days. After 4 days, 12 more men join. How many more days are needed?",
          answer: "5 days",
          method: "\\(240 - 80 = 160\\) man-days left for 32 men.",
        },
      ],
      pyqExampleId: "82a5a41c-f2b3-4595-ba40-e60e2755b9ad",
      traps: [
        {
          title: "Starting the leaving sequence one day early",
          body:
            "If \\(k\\) men leave after each day, day 1 still has all \\(n\\) men and the last of \\(d\\) days has \\(n - (d - 1)k\\). The amount taken away is \\(k(0 + 1 + \\cdots + (d - 1))\\), not \\(k(1 + 2 + \\cdots + d)\\).",
        },
      ],
    },
  ],
};
