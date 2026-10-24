import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_JOINING_NOTE: SubtopicNote = {
  subtopicName: "Workers Joining and Leaving",
  title: "Workers Joining and Leaving",
  oneLineDefinition:
    "When people work for different stretches of time, add each stretch's work (rate times days) and set the total equal to one whole job.",
  whyItMatters:
    "Twenty-one questions in the bank, thirteen MODERATE and one HARD, eight of them from the 2025 shifts: one worker hands over to another, a helper joins, someone leaves after a few days or a few days before the end. The method never changes: one line for each stretch, then add the lines.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwjl-handover",
      name: "One worker starts and another finishes",
      intuition:
        "Split the job into stretches. Each stretch has its own worker or team, and the work done in it is that rate times its days. The stretches together make exactly one job.",
      definition:
        "- **Work in a stretch** \\(=\\) daily rate of whoever is working \\(\\times\\) days of that stretch.\n" +
        "- **All stretches add to 1** (or to the whole job in LCM units).\n" +
        "- **An unknown rate:** if A works first and does \\(\\frac{t}{a}\\) of the job, the rest, \\(1 - \\frac{t}{a}\\), took B the stated days. So B's rate \\(=\\) the rest \\(\\div\\) B's days, and B's time for the whole job follows.\n" +
        "- **Regroup, fast route:** if A works \\(p\\) days and B works \\(q\\) days (\\(p < q\\)) and you know how long A and B take together, write \\(pA + qB = p(A + B) + (q - p)B\\). The pair part is known, so B comes out in one step.",
      formula: {
        label: "Work in stretches",
        latex: "\\sum (\\text{rate} \\times \\text{days}) = 1 \\qquad pA + qB = p(A + B) + (q - p)B",
        symbols: [
          { symbol: "\\(A, B\\)", meaning: "one-day rates of the two workers" },
          { symbol: "p, q", meaning: "days each of them works" },
        ],
      },
      authoredExample: {
        prompt: "A can finish a job in 24 days. He works for 6 days, and then B finishes the rest in 27 days. How long would A and B take working together?",
        steps: [
          "In 6 days A does \\(\\frac{6}{24} = \\frac{1}{4}\\) of the job.",
          "B does the other \\(\\frac{3}{4}\\) in 27 days, so B needs \\(27 \\div \\frac{3}{4} = 36\\) days for the whole job.",
          "Together: \\(\\frac{24 \\times 36}{24 + 36} = \\frac{864}{60} = 14.4\\) days.",
          "Check: \\(\\frac{1}{24} + \\frac{1}{36} = \\frac{3 + 2}{72} = \\frac{5}{72}\\), and \\(\\frac{72}{5} = 14.4\\).",
        ],
        answer: "14.4 days",
      },
      selfCheckExample: {
        prompt: "P and Q together can finish a job in 20 days. P works on it alone for 8 days, and then Q alone finishes it in 26 more days. How long does Q take alone?",
        steps: [
          "Regroup: \\(8P + 26Q = 8(P + Q) + 18Q\\).",
          "\\(8(P + Q) = \\frac{8}{20} = \\frac{2}{5}\\), so \\(18Q = \\frac{3}{5}\\) and \\(Q = \\frac{1}{30}\\).",
          "Q alone takes 30 days. Check: \\(P = \\frac{1}{20} - \\frac{1}{30} = \\frac{1}{60}\\), and \\(\\frac{8}{60} + \\frac{26}{30} = \\frac{8 + 52}{60} = 1\\).",
        ],
        answer: "30 days",
      },
      practiceSet: [
        { prompt: "A can do a job in 15 days. He works on it for 5 days and leaves. What fraction of the job is left?", answer: "\\(\\frac{2}{3}\\)" },
        {
          prompt: "A can do a job in 20 days and B in 30 days. A works for 8 days, then B finishes the rest. How many days does B work?",
          answer: "18 days",
          method: "A does \\(\\frac{2}{5}\\); \\(\\frac{3}{5} \\times 30 = 18\\).",
        },
        {
          prompt: "X does \\(\\frac{1}{3}\\) of a job in 5 days, and then Y finishes the rest in 20 days. How many days would Y take for the whole job alone?",
          answer: "30 days",
          method: "Y does \\(\\frac{2}{3}\\) in 20 days.",
        },
      ],
      pyqExampleId: "8f31415c-cad0-45f1-8f72-3cc42993ac51",
      traps: [
        {
          title: "Taking the days for the rest as the whole time",
          body:
            "If B finishes the remaining \\(\\frac{3}{4}\\) of a job in 27 days, B's time for the whole job is \\(27 \\div \\frac{3}{4} = 36\\) days, not 27.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwjl-leaves",
      name: "A team that changes partway",
      intuition:
        "The team works together for a while, then someone leaves or a helper joins and the new team finishes. That is two stretches with two different rates.",
      definition:
        "- **Stretch 1:** team rate \\(\\times\\) days. **Stretch 2:** new team rate \\(\\times\\) days. The two add to 1.\n" +
        "- **When did A leave?** If A left after \\(x\\) days and B alone finished in \\(d\\) days, \\(x(A + B) + dB = 1\\). Fast route: take B's \\(d\\) days of work off first; what is left was done by the pair at the pair's rate.\n" +
        "- **A joiner's rate:** work left after stretch 1 \\(\\div\\) days of stretch 2 gives the new team's rate; take away the members you know.\n" +
        "- **Efficiencies given:** use them as units a day, with the whole job \\(=\\) one worker's efficiency \\(\\times\\) that worker's days.\n" +
        "- **Pay** still follows work done: add up each person's work across both stretches.\n" +
        "- Read what is asked: only the days after the change, or the total from the start.",
      formula: {
        label: "Team changes partway",
        latex: "x(A + B) + dB = 1",
        symbols: [
          { symbol: "x", meaning: "days the full team works" },
          { symbol: "d", meaning: "days the smaller team works after the change" },
          { symbol: "\\(A, B\\)", meaning: "one-day rates" },
        ],
      },
      authoredExample: {
        prompt: "A and B can finish a job in 15 days and 30 days. They start together, but after 4 days A leaves. How many more days does B take to finish the job?",
        steps: [
          "Take the job as 30 units. A does 2 units a day and B does 1.",
          "In 4 days together they do \\(4 \\times 3 = 12\\) units, leaving 18.",
          "B alone needs \\(18 \\div 1 = 18\\) more days.",
        ],
        answer: "18 days",
      },
      selfCheckExample: {
        prompt: "P and Q can finish a job in 20 days and 25 days. They start together, P leaves after some days, and Q finishes the rest alone in 16 days. For how many days did P work?",
        steps: [
          "Take the job as 100 units. P does 5 units a day and Q does 4.",
          "Q's 16 days alone do 64 units, so the pair did \\(100 - 64 = 36\\) units at 9 a day: 4 days.",
        ],
        answer: "4 days",
      },
      practiceSet: [
        {
          prompt: "A and B can do a job in 10 days and 15 days. They work together for 3 days, then A leaves. How many more days does B need?",
          answer: "7.5 days",
          method: "Together \\(\\frac{1}{6}\\) a day, so \\(\\frac{1}{2}\\) is done; \\(\\frac{1}{2} \\times 15 = 7.5\\).",
        },
        {
          prompt: "Two workers together do \\(\\frac{2}{5}\\) of a job in 4 days. Then one of them leaves and the other finishes the rest in 12 days. How long would the one who stayed take alone for the whole job?",
          answer: "20 days",
          method: "\\(\\frac{3}{5}\\) in 12 days.",
        },
        {
          prompt: "A job is 60 units. A team does 8 units a day for 5 days, and then a new team doing 5 units a day finishes it. How many days does the new team work?",
          answer: "4 days",
        },
      ],
      pyqExampleId: "665951d4-cd54-44bd-8410-ea196a63a056",
      traps: [
        {
          title: "Giving the days after the change when the total is asked",
          body:
            "\"How many more days\" wants only the second stretch. \"In how many days was the work completed\" wants both stretches added. SSC prints both numbers among the options.",
        },
        {
          title: "Forgetting the old members in a joiner's rate",
          body:
            "If a team finishes the rest at \\(\\frac{1}{12}\\) of the job a day after C joins, C's rate is \\(\\frac{1}{12}\\) minus the rates of those already working, not \\(\\frac{1}{12}\\) itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwjl-before-end",
      name: "Leaving a few days before the end",
      intuition:
        "When someone leaves k days before the job ends, you do not know when they left, but you know they missed the last k days. Call the total time T and give each person T minus the days they missed.",
      definition:
        "- Let the job take \\(T\\) days. A worker who leaves \\(k\\) days before the end works \\(T - k\\) days; one who stays works all \\(T\\).\n" +
        "- Write \\(\\sum \\text{rate} \\times (\\text{days worked}) = 1\\) and solve for \\(T\\).\n" +
        "- **LCM units, fast route:** with whole-number rates, \\(T \\times\\) (all the rates added) minus each leaver's rate \\(\\times\\) the days they missed equals the job's units.",
      formula: {
        label: "Leaving k days before the end",
        latex: "\\sum r_i (T - k_i) = 1",
        symbols: [
          { symbol: "T", meaning: "total days the job takes" },
          { symbol: "\\(r_i\\)", meaning: "one-day rate of worker i" },
          { symbol: "\\(k_i\\)", meaning: "days before the end that worker i leaves (0 if they stay)" },
        ],
      },
      authoredExample: {
        prompt: "A, B and C can finish a job in 20, 30 and 60 days. They start together. A leaves 2 days before the end and B leaves 3 days before the end, while C works to the finish. How many days does the job take?",
        steps: [
          "Take the job as 60 units. A does 3, B 2 and C 1 unit a day.",
          "\\(3(T - 2) + 2(T - 3) + T = 60\\), so \\(6T - 12 = 60\\) and \\(T = 12\\).",
          "Check: A works 10 days (30 units), B 9 days (18) and C 12 days (12): \\(30 + 18 + 12 = 60\\).",
        ],
        answer: "12 days",
      },
      selfCheckExample: {
        prompt: "P and Q can finish a job in 12 days and 18 days. They start together, but P leaves 3 days before the job is finished. How many days does the job take in all?",
        steps: [
          "Take the job as 36 units. P does 3 and Q does 2 units a day.",
          "\\(3(T - 3) + 2T = 36\\), so \\(5T = 45\\) and \\(T = 9\\).",
          "Check: P works 6 days (18 units) and Q 9 days (18 units).",
        ],
        answer: "9 days",
      },
      practiceSet: [
        {
          prompt: "A and B can do a job in 10 days and 15 days. They start together and A leaves 5 days before the end. How long does the job take?",
          answer: "9 days",
          method: "Job 30 units: \\(3(T - 5) + 2T = 30\\).",
        },
        {
          prompt: "X and Y can do a job in 6 days and 12 days. They start together and X leaves 3 days before the end. For how many days does X work?",
          answer: "3 days",
          method: "Job 12 units: \\(2(T - 3) + T = 12\\) gives \\(T = 6\\).",
        },
      ],
      pyqExampleId: "ed13461a-3971-46a9-bd85-ea63fd1cc0d2",
      traps: [
        {
          title: "Taking the leaving days off the leaver's own time",
          body:
            "Leaving 4 days before the END means working \\(T - 4\\) of the job's \\(T\\) days. It does not turn the leaver's own time of, say, 24 days into 20.",
        },
      ],
    },
  ],
};
