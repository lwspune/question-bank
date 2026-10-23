import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_RATES_NOTE: SubtopicNote = {
  subtopicName: "Work Rates",
  title: "Work Rates",
  oneLineDefinition:
    "A worker who finishes a job in n days does one n-th of it each day, so rates add when people work together and subtract when you need one worker's share.",
  whyItMatters:
    "Fifty-two questions in the bank, forty-six of them EASY: two or three people working together, one worker found from a team, the part of the job left after a few days, and pay shared by work done. Every later page in this chapter reuses the one-day rate, so make it automatic here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwwr-together",
      name: "Workers together: add the one-day rates",
      intuition:
        "If Ravi paints a wall in 6 days, he paints a sixth of it each day. Two painters on the same wall each add their own share every day, so you add what each one does in a day. You never add the days.",
      definition:
        "- **One day's work:** a worker who needs \\(n\\) days does \\(\\frac{1}{n}\\) of the job each day. Hours and minutes work the same way.\n" +
        "- **Together:** add the rates. Time together \\(= 1 \\div\\) (sum of the rates).\n" +
        "- **Two workers, fast route:** time together \\(= \\frac{ab}{a + b}\\), product over sum. It is safe for exactly two workers only.\n" +
        "- **LCM units, fast route:** take the job as the LCM of the given times. Each worker's daily units are that LCM divided by their own time, always whole numbers, and the time is units divided by the daily total. This is the quickest way for three workers.\n" +
        "- **Output jobs** (pages typed, items made) work the same way with real units: pages per hour add.",
      formula: {
        label: "Working together",
        latex: "\\text{Rate} = \\frac{1}{n} \\qquad T = \\frac{ab}{a + b} \\qquad T = \\frac{1}{\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c}}",
        symbols: [
          { symbol: "n", meaning: "days one worker needs alone" },
          { symbol: "a, b, c", meaning: "days each worker needs alone" },
          { symbol: "T", meaning: "days needed when they work together" },
        ],
      },
      authoredExample: {
        prompt: "P can finish a job in 12 days, Q in 20 days and R in 30 days. How many days do all three take working together?",
        steps: [
          "Take the job as 60 units, the LCM of 12, 20 and 30.",
          "P does \\(60 \\div 12 = 5\\) units a day, Q does \\(60 \\div 20 = 3\\) and R does \\(60 \\div 30 = 2\\): together 10 units a day.",
          "Time \\(= 60 \\div 10 = 6\\) days.",
          "Check with fractions: \\(\\frac{1}{12} + \\frac{1}{20} + \\frac{1}{30} = \\frac{5 + 3 + 2}{60} = \\frac{1}{6}\\) of the job a day.",
        ],
        answer: "6 days",
      },
      selfCheckExample: {
        prompt: "Meera can stitch a set of curtains in 9 hours and Lata can stitch it in 18 hours. How long do they take working together?",
        steps: [
          "Two workers, so use product over sum: \\(\\frac{9 \\times 18}{9 + 18} = \\frac{162}{27} = 6\\).",
          "Check: \\(\\frac{1}{9} + \\frac{1}{18} = \\frac{2 + 1}{18} = \\frac{1}{6}\\) of the job an hour.",
        ],
        answer: "6 hours",
      },
      practiceSet: [
        {
          prompt: "A can do a job in 6 days and B in 12 days. In how many days can they do it together?",
          answer: "4 days",
          method: "\\(\\frac{6 \\times 12}{6 + 12} = \\frac{72}{18} = 4\\).",
        },
        {
          prompt: "X types 6 pages an hour and Y types 4 pages an hour. How long do they take together to type 150 pages?",
          answer: "15 hours",
          method: "Together 10 pages an hour, and \\(150 \\div 10 = 15\\).",
        },
        {
          prompt: "A, B and C can do a job in 6, 8 and 24 days. How many days do they take working together?",
          answer: "3 days",
          method: "Job \\(= 24\\) units; daily units \\(4 + 3 + 1 = 8\\); \\(24 \\div 8 = 3\\).",
        },
        {
          prompt: "Two workers can finish a job alone in 20 days and 30 days. How many days do they take together?",
          answer: "12 days",
          method: "\\(\\frac{20 \\times 30}{20 + 30} = 12\\).",
        },
      ],
      pyqExampleId: "e2887ec3-51f8-4d61-8e20-327c03ad8845",
      traps: [
        {
          title: "Adding the days instead of the rates",
          body:
            "Two workers taking 10 and 15 days do not take 25 days together, nor 12.5 days (the average). Together is always quicker than the faster worker alone: here \\(\\frac{10 \\times 15}{25} = 6\\) days.",
        },
        {
          title: "Using product over sum for three workers",
          body:
            "\\(\\frac{abc}{a + b + c}\\) is not the time for three workers. For 12, 20 and 30 days it gives about 116 days, while the true time is 6. For three or more workers, add the rates or use LCM units.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwwr-fraction",
      name: "Part of the job done in a given time",
      intuition:
        "Work done is rate times time, just as distance is speed times time. If the whole job takes 20 days, 5 days of it finish a quarter. Running the other way, if part of a job took some days, scale up to find the whole.",
      definition:
        "- **Work done** \\(=\\) rate \\(\\times\\) time \\(= \\frac{t}{n}\\) for a worker who needs \\(n\\) days and works \\(t\\) days.\n" +
        "- **Work left** \\(= 1 -\\) work done. For a team, use the team's daily rate, the sum of its members' rates.\n" +
        "- **Part known, whole wanted:** if a fraction \\(f\\) of the job takes \\(d\\) days, the whole job takes \\(\\frac{d}{f}\\) days, and any other fraction \\(g\\) takes \\(\\frac{d}{f} \\times g\\) days.\n" +
        "- **Fast route:** when two workers are described by the parts they finish in the SAME number of days, add the parts directly. There is no need to find each whole time.",
      formula: {
        label: "Work done and work left",
        latex: "W = \\frac{t}{n} \\qquad \\text{Left} = 1 - W \\qquad \\text{Whole time} = \\frac{d}{f}",
        symbols: [
          { symbol: "t", meaning: "days worked" },
          { symbol: "n", meaning: "days the worker needs for the whole job" },
          { symbol: "W", meaning: "fraction of the job done" },
          { symbol: "f", meaning: "fraction of the job finished in d days" },
          { symbol: "d", meaning: "days taken for that fraction" },
        ],
      },
      authoredExample: {
        prompt: "P can finish a job in 10 days and Q in 14 days. They work together for 5 days. What fraction of the job is left?",
        steps: [
          "Together each day: \\(\\frac{1}{10} + \\frac{1}{14} = \\frac{7 + 5}{70} = \\frac{12}{70} = \\frac{6}{35}\\).",
          "In 5 days: \\(5 \\times \\frac{6}{35} = \\frac{30}{35} = \\frac{6}{7}\\) of the job.",
          "Left: \\(1 - \\frac{6}{7} = \\frac{1}{7}\\).",
          "Check with a 70-unit job: P does 7 and Q does 5 units a day, so 60 units in 5 days and 10 of 70 are left, which is \\(\\frac{1}{7}\\).",
        ],
        answer: "\\(\\frac{1}{7}\\)",
      },
      selfCheckExample: {
        prompt: "A tailor finishes \\(\\frac{2}{5}\\) of an order in 6 days. At the same pace, how many days does he need for \\(\\frac{3}{5}\\) of the order?",
        steps: [
          "The whole order takes \\(6 \\div \\frac{2}{5} = 15\\) days.",
          "\\(\\frac{3}{5}\\) of it takes \\(15 \\times \\frac{3}{5} = 9\\) days.",
          "Fast route: \\(\\frac{3}{5}\\) is 1.5 times \\(\\frac{2}{5}\\), so 1.5 times 6 days.",
        ],
        answer: "9 days",
      },
      practiceSet: [
        { prompt: "A worker can finish a job in 25 days. What fraction of it does he finish in 10 days?", answer: "\\(\\frac{2}{5}\\)" },
        {
          prompt: "A and B can finish a job in 6 days and 12 days. What fraction of it is left after they work together for 2 days?",
          answer: "\\(\\frac{1}{2}\\)",
          method: "Together \\(\\frac{1}{6} + \\frac{1}{12} = \\frac{1}{4}\\) a day, so \\(\\frac{1}{2}\\) is done in 2 days.",
        },
        {
          prompt: "In 5 days, A does 15% of a job and B does 25% of it. What percentage of the job do they do together in 5 days?",
          answer: "40%",
          method: "Same 5 days, so add the parts.",
        },
        {
          prompt: "A machine completes \\(\\frac{3}{8}\\) of a print run in 12 hours. How long does the whole run take?",
          answer: "32 hours",
          method: "\\(12 \\div \\frac{3}{8} = 32\\).",
        },
      ],
      pyqExampleId: "0494de5c-4b92-40b2-9928-8d21ec98c997",
      traps: [
        {
          title: "Marking the part done when the part left is asked",
          body:
            "If a team does \\(\\frac{5}{8}\\) of a job in the days given, the part left is \\(\\frac{3}{8}\\). SSC usually prints both fractions among the options, so read the last line of the question again before marking.",
        },
        {
          title: "Scaling the days the wrong way",
          body:
            "If \\(\\frac{3}{4}\\) of a job takes 18 days, the whole takes \\(18 \\div \\frac{3}{4} = 24\\) days, not \\(18 \\times \\frac{3}{4} = 13.5\\). The whole job always takes longer than any part of it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwwr-missing",
      name: "One worker's time from the team's time",
      intuition:
        "A team's rate is the sum of its members' rates. Take away the members you know and what remains is the unknown worker's rate. When only pairs are given, each person sits in two of the pairs, so the three pair rates add to twice the whole team.",
      definition:
        "- **One worker missing:** rate of the missing worker \\(=\\) team rate \\(-\\) the known rates.\n" +
        "- **Two people, fast route:** if the pair takes \\(a\\) days and the known worker \\(b\\) days (\\(b > a\\)), the other takes \\(\\frac{ab}{b - a}\\) days.\n" +
        "- **Pages or units:** subtract pages per hour the same way, then time \\(=\\) pages \\(\\div\\) pages per hour.\n" +
        "- **Three pairs given** (A and B, B and C, C and A): add the three pair rates. The sum is twice the rate of all three, so halve it, then take away a pair to get one person.\n" +
        "- **LCM units** keep every step in whole numbers: take the job as the LCM of the pair times.",
      formula: {
        label: "Finding one worker",
        latex: "x = \\frac{ab}{b - a} \\qquad A + B + C = \\frac{(A + B) + (B + C) + (C + A)}{2}",
        symbols: [
          { symbol: "a", meaning: "days the pair takes together" },
          { symbol: "b", meaning: "days the known worker takes alone" },
          { symbol: "x", meaning: "days the other worker takes alone" },
          { symbol: "\\(A, B, C\\)", meaning: "each worker's one-day rate" },
        ],
      },
      authoredExample: {
        prompt: "A and B together can finish a job in 10 days. A alone takes 15 days. How long does B take alone?",
        steps: [
          "B's rate \\(= \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30}\\) of the job a day.",
          "So B alone takes 30 days.",
          "Fast route: \\(\\frac{10 \\times 15}{15 - 10} = \\frac{150}{5} = 30\\).",
        ],
        answer: "30 days",
      },
      selfCheckExample: {
        prompt: "A and B can finish a job in 9 days, B and C in 12 days, and C and A in 12 days. How many days does C take alone?",
        steps: [
          "Take the job as 36 units. The pairs do 4, 3 and 3 units a day.",
          "Adding, twice the rate of all three is 10, so A, B and C together do 5 units a day.",
          "C \\(= 5 - (A + B) = 5 - 4 = 1\\) unit a day, so C alone takes 36 days.",
        ],
        answer: "36 days",
      },
      practiceSet: [
        {
          prompt: "A, B and C together finish a job in 6 days. A alone takes 15 days and B alone takes 20 days. How long does C take alone?",
          answer: "20 days",
          method: "\\(\\frac{1}{6} - \\frac{1}{15} - \\frac{1}{20} = \\frac{10 - 4 - 3}{60} = \\frac{1}{20}\\).",
        },
        {
          prompt: "Two typists together type 9 pages an hour. One of them types 5 pages an hour. How long does the other take to type 60 pages?",
          answer: "15 hours",
          method: "The other types 4 pages an hour.",
        },
        {
          prompt: "A pair of workers finish a job in 12 days. One of them alone takes 28 days. How long does the other take alone?",
          answer: "21 days",
          method: "\\(\\frac{12 \\times 28}{28 - 12} = \\frac{336}{16} = 21\\).",
        },
        {
          prompt: "A and B finish a job in 12 days, B and C in 15 days, and C and A in 20 days. How many days do all three take together?",
          answer: "10 days",
          method: "Job \\(= 60\\) units; pairs 5, 4, 3 add to 12, so all three do 6 a day.",
        },
      ],
      pyqExampleId: "f4f3c1d9-1e38-4a99-a821-2547c036e721",
      traps: [
        {
          title: "Forgetting to halve the pair total",
          body:
            "When the times of A and B, B and C, and C and A are given, the sum of the three pair rates is twice the rate of all three, because each person appears in two pairs. Not halving doubles the team's speed and halves its time.",
        },
        {
          title: "Subtracting the times",
          body:
            "If a pair takes 10 days and one of them 15 days, the other does not take 5 days. Subtract rates: \\(\\frac{1}{10} - \\frac{1}{15} = \\frac{1}{30}\\), so 30 days.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwwr-pay",
      name: "Sharing the pay by work done",
      intuition:
        "The money is paid for the job, not for the days spent on it. Each person gets the same share of the money as the share of the work they did.",
      definition:
        "- Share of the pay \\(=\\) share of the work done \\(\\times\\) total pay.\n" +
        "- **Everyone works the whole time:** shares are in the ratio of the rates, \\(\\frac{1}{a} : \\frac{1}{b} : \\frac{1}{c}\\). LCM units give this ratio at once as whole numbers.\n" +
        "- **A helper joins:** find what the named workers did in the days worked. The helper's share of the work is 1 minus theirs.\n" +
        "- Days matter only through the work they produce: a slow worker who works many days can earn more than a fast one who works a few.",
      formula: {
        label: "Pay shared by work",
        latex: "\\text{Share} = \\frac{\\text{work done}}{\\text{whole job}} \\times \\text{total pay}",
      },
      authoredExample: {
        prompt: "A can finish a job in 6 days, B in 9 days and C in 18 days. They do it together and are paid ₹4,200. What is B's share?",
        steps: [
          "Take the job as 18 units. A does 3, B 2 and C 1 unit a day, so the shares are \\(3 : 2 : 1\\).",
          "B's share \\(= \\frac{2}{6} \\times 4200 = 1400\\).",
          "Check: A gets ₹2,100 and C gets ₹700, and \\(2100 + 1400 + 700 = 4200\\).",
        ],
        answer: "₹1,400",
      },
      selfCheckExample: {
        prompt: "P and Q take on a job for ₹3,600. P alone could do it in 10 days and Q in 15 days. With R's help they finish it in 4 days. How much should R get?",
        steps: [
          "In 4 days P does \\(\\frac{4}{10} = \\frac{6}{15}\\) of the job and Q does \\(\\frac{4}{15}\\).",
          "Together that is \\(\\frac{10}{15} = \\frac{2}{3}\\), so R did \\(\\frac{1}{3}\\).",
          "R's share \\(= \\frac{1}{3} \\times 3600 = 1200\\).",
        ],
        answer: "₹1,200",
      },
      practiceSet: [
        {
          prompt: "X can do a job in 4 days and Y in 12 days. They work together and earn ₹1,600. What is X's share?",
          answer: "₹1,200",
          method: "Rates \\(3 : 1\\), so X gets \\(\\frac{3}{4}\\) of 1600.",
        },
        { prompt: "Two workers share ₹900 for a job. One of them did \\(\\frac{2}{3}\\) of the work. How much does the other get?", answer: "₹300" },
        {
          prompt: "A, B and C can do a job in 5, 10 and 10 days. Working together they earn ₹2,000. How much does A get?",
          answer: "₹1,000",
          method: "Rates \\(2 : 1 : 1\\), so A gets half.",
        },
      ],
      pyqExampleId: "3e829db9-bfcf-4896-be71-ba70a6139713",
      traps: [
        {
          title: "Sharing the pay in the ratio of days",
          body:
            "Pay follows work, so it is shared in the ratio of the rates, which is the inverse of the days. When both work the whole time, a worker who needs 10 days earns more than one who needs 15.",
        },
        {
          title: "Giving a helper an equal share",
          body:
            "A helper who joins for all the days does not get an equal part of the money. His share is the work he did: 1 minus what the others did in those days.",
        },
      ],
    },
  ],
};
