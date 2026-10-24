import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AV_CRICKET_NOTE: SubtopicNote = {
  subtopicName: "Cricket Scores",
  title: "Batting Averages, Runs Needed and Run Rates",
  oneLineDefinition:
    "A batting average is runs divided by innings (or by dismissals), a run rate is runs divided by overs, and every cricket question is a total of runs read against a count.",
  whyItMatters:
    "Two AFCAT past-year questions are cricket ones, from 2016 and 2017, and the bank adds about fifty more like them. Most are EASY. The marks go on the divisor: dismissals rather than innings when some innings were not out, the overs still left rather than all the overs, wickets rather than matches for a bowler.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afav-batting-average",
      name: "Batting average and the next innings",
      intuition:
        "Runs pile up into a total. After one more innings, the new average is the new total over one more innings.",
      definition:
        "- Runs so far = average × innings.\n" +
        "- After the next innings: \\(\\dfrac{\\text{runs} + \\text{new score}}{\\text{innings} + 1}\\).\n" +
        "- Part of a run of matches: runs in the last \\(k\\) = all the runs − runs in the first ones.\n" +
        "- With **not-out** innings, the batting average divides runs by dismissals: innings − not-outs.",
      formula: {
        label: "Batting average",
        latex: "\\text{batting average} = \\dfrac{\\text{runs}}{\\text{innings}} \\quad \\left(\\text{or } \\dfrac{\\text{runs}}{\\text{dismissals}}\\right)",
      },
      authoredExample: {
        prompt: "A batsman averages 36 over 14 innings. He scores 66 in the 15th. Find his new average.",
        steps: [
          "Runs so far \\(= 14 \\times 36 = 504\\).",
          "After the 15th: \\(504 + 66 = 570\\), and \\(570 \\div 15 = 38\\).",
        ],
        answer: "\\(38\\).",
      },
      selfCheckExample: {
        prompt: "A batsman has made 950 runs in 22 innings, 3 of them not out. Find his batting average.",
        steps: [
          "He was dismissed \\(22 - 3 = 19\\) times.",
          "\\(950 \\div 19 = 50\\).",
        ],
        answer: "\\(50\\).",
      },
      practiceSet: [
        { prompt: "A batsman averages 33 over 11 innings and is out for 0 in the 12th. Find his new average.", answer: "\\(30.25\\)" },
        { prompt: "A cricketer averages 45 over 12 matches. His first 8 matches average 43. Find his average in the last 4.", answer: "\\(49\\)" },
        { prompt: "A team averages 250 over 6 matches and scores 320 in the 7th. Find its new average.", answer: "\\(260\\)" },
      ],
      pyqExampleId: "9caea3b8-88d2-453a-b641-cb33756fc176",
      traps: [
        {
          title: "Not-outs change the divisor",
          body: "1,000 runs in 25 innings with 5 not-outs is a batting average of \\(1000 \\div 20 = 50\\), not \\(1000 \\div 25 = 40\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-runs-needed",
      name: "Runs needed for a target, and how many innings",
      intuition:
        "A target average is a target total. The next score has to fill the gap between the runs already made and the runs needed.",
      definition:
        "- **Score needed** = new average × \\((n + 1)\\) − old average × \\(n\\). Shortcut: new average + \\(n\\) × the rise.\n" +
        "- **Unknown number of innings:** if a score of \\(x\\) moves the average from \\(A\\) to \\(A'\\), then \\(An + x = A'(n + 1)\\), so \\(n = \\dfrac{x - A'}{A' - A}\\).\n" +
        "- A **bowling average** is runs conceded per wicket. Taking \\(w\\) wickets for \\(r\\) runs after \\(w_0\\) wickets: \\(Aw_0 + r = A'(w_0 + w)\\).\n" +
        "- Several matches at a fixed score \\(s\\): \\(An + sk = A'(n + k)\\); solve for \\(k\\).",
      formula: {
        label: "Score needed in the next innings",
        latex: "x = A'(n + 1) - An",
      },
      authoredExample: {
        prompt: "A batsman averages 30 over 16 innings. How many must he score in the 17th to average 33?",
        steps: [
          "He needs \\(17 \\times 33 = 561\\) runs in all and has \\(16 \\times 30 = 480\\).",
          "So he must score \\(561 - 480 = 81\\). Shortcut: \\(33 + 16 \\times 3 = 81\\).",
        ],
        answer: "\\(81\\).",
      },
      selfCheckExample: {
        prompt: "A bowler averages 20 runs a wicket. He takes 4 wickets for 40 runs in his next match, and his average drops to 19. How many wickets had he taken before?",
        steps: [
          "With \\(w\\) wickets before: \\(20w + 40 = 19(w + 4)\\).",
          "\\(20w + 40 = 19w + 76\\), so \\(w = 36\\).",
        ],
        answer: "36 wickets.",
      },
      practiceSet: [
        { prompt: "A batsman averages 25 after 9 innings. What must he score in the 10th to average 27?", answer: "\\(45\\)" },
        { prompt: "A batting average rises from 40 to 42 when he scores 80. How many innings had he played before?", answer: "\\(19\\)", method: "\\(n = (80 - 42) \\div 2\\)." },
        { prompt: "A team averages 200 over 8 matches. How many matches at 240 will bring its average to 220?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "5c62af40-a8e1-4c46-8d10-21f0696ef2f5",
      traps: [
        {
          title: "Count the innings still to come",
          body: "To average 33 after 17 innings he needs \\(17 \\times 33\\) runs in all, not \\(16 \\times 33\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afav-run-rate",
      name: "Run rate, required rate and economy",
      intuition:
        "A run rate is a speed: runs per over. An overall rate is total runs over total overs, never the plain average of two rates.",
      definition:
        "- **Overall run rate** = total runs ÷ total overs.\n" +
        "- **Required rate** = runs still needed ÷ overs still left.\n" +
        "- A bowler's **economy rate** = runs conceded ÷ overs bowled.\n" +
        "- A target rate over the whole innings sets a target total first: 6 an over for 40 overs is 240 runs.",
      formula: {
        label: "Run rates",
        latex: "\\text{run rate} = \\dfrac{\\text{runs}}{\\text{overs}}, \\qquad \\text{required rate} = \\dfrac{\\text{target} - \\text{runs so far}}{\\text{overs left}}",
      },
      authoredExample: {
        prompt: "A team scores 4.5 an over for the first 15 overs of a 40-over innings. What rate does it need in the remaining overs to reach 260?",
        steps: [
          "Runs so far \\(= 15 \\times 4.5 = 67.5\\), so 192.5 are still needed.",
          "Overs left \\(= 40 - 15 = 25\\).",
          "\\(192.5 \\div 25 = 7.7\\) an over.",
        ],
        answer: "7.7 runs an over.",
      },
      selfCheckExample: {
        prompt: "A bowler gives away 27 runs in his first 6 overs and 21 runs in the next 4. Find his economy rate.",
        steps: [
          "48 runs in 10 overs.",
          "\\(48 \\div 10 = 4.8\\).",
        ],
        answer: "4.8 runs an over.",
      },
      practiceSet: [
        { prompt: "A team scores at 7 an over for 6 overs and at 9 an over for 10 overs. Find the overall run rate.", answer: "\\(8.25\\)" },
        { prompt: "The target is 150 in 25 overs. After 10 overs the score is 60. Find the required rate.", answer: "\\(6\\)" },
        { prompt: "A team scores 5 an over for 24 overs and 7.5 an over for 16 overs. Find the overall run rate.", answer: "\\(6\\)" },
      ],
      pyqExampleId: "013ea087-1366-477a-a1d0-3b5fcbbb7619",
      traps: [
        {
          title: "Do not average two rates",
          body: "12 overs at 5 an over and 4 overs at 9 make 96 runs in 16 overs, a rate of 6, not \\((5 + 9) \\div 2 = 7\\).",
        },
      ],
    },
  ],
};
