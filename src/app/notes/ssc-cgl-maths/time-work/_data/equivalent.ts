import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TW_EQUIVALENT_NOTE: SubtopicNote = {
  subtopicName: "Men, Women and Equivalent Workers",
  title: "Men, Women and Equivalent Workers",
  oneLineDefinition:
    "When men, women and boys work at different rates, turn every worker into one common unit, such as woman-days, and the question becomes a man-days question.",
  whyItMatters:
    "Twenty-two questions in the bank, sixteen of them MODERATE: \"1 man or 2 women\", two mixed teams doing the same job, or a team's time with one worker's time given. Find how many women one man is worth, and the rest is a single division.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctwmw-teams",
      name: "Whole teams working together",
      intuition:
        "A team that finishes a job in 6 days does a sixth of it each day, exactly like one worker who needs 6 days. Two teams on the same job add their rates.",
      definition:
        "- Treat each named team as one worker: team rate \\(= 1 \\div\\) the team's days.\n" +
        "- Two teams together: add the rates, or use product over sum of the two times.\n" +
        "- **\"Team A or team B in \\(d\\) days\":** the two teams have the same rate, so together they take \\(\\frac{d}{2}\\) days.",
      authoredExample: {
        prompt: "12 men can lay a road in 18 days, and 20 women can lay it in 9 days. If all of them work together, how many days do they take?",
        steps: [
          "The men's team does \\(\\frac{1}{18}\\) of the road a day and the women's team \\(\\frac{1}{9}\\).",
          "Together: \\(\\frac{1}{18} + \\frac{2}{18} = \\frac{3}{18} = \\frac{1}{6}\\), so 6 days.",
          "Fast route: \\(\\frac{18 \\times 9}{18 + 9} = \\frac{162}{27} = 6\\).",
        ],
        answer: "6 days",
      },
      selfCheckExample: {
        prompt: "A team of 9 women can harvest a field in 12 days, and a team of 6 men can harvest it in 24 days. Working together, how many days do the two teams take?",
        steps: [
          "\\(\\frac{12 \\times 24}{12 + 24} = \\frac{288}{36} = 8\\).",
          "Check: \\(\\frac{1}{12} + \\frac{1}{24} = \\frac{3}{24} = \\frac{1}{8}\\) of the field a day.",
        ],
        answer: "8 days",
      },
      practiceSet: [
        { prompt: "Team P can paint a hall in 10 days and team Q in 15 days. How long do the two teams take working together?", answer: "6 days" },
        { prompt: "Either 6 men or 10 women can finish a job in 16 days. How long do the 6 men and the 10 women take working together?", answer: "8 days" },
        {
          prompt: "One team finishes a job in 12 days and a second team in 24 days. What fraction of the job do they finish together in 4 days?",
          answer: "\\(\\frac{1}{2}\\)",
          method: "\\(4\\left(\\frac{1}{12} + \\frac{1}{24}\\right) = \\frac{12}{24}\\).",
        },
      ],
      pyqExampleId: "ab603946-fcd9-45ca-be6c-7fccfd4790ec",
      traps: [
        {
          title: "Averaging the two teams' times",
          body:
            "Two teams that take 12 and 24 days alone take 8 days together, not 18. Teams combine like single workers: add the rates.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwmw-convert",
      name: "Converting men into women",
      intuition:
        "If 8 men or 12 women do the same job in the same time, then 8 men do the work of 12 women, and one man is worth 1.5 women. Swap every man for 1.5 women and you have an all-women team, which is a man-days question.",
      definition:
        "- **Same job, same time:** \\(a\\) men \\(= b\\) women, so 1 man \\(= \\frac{b}{a}\\) women.\n" +
        "- **Same job, different times:** compare labour. \\(a\\) men in \\(d_1\\) days and \\(b\\) women in \\(d_2\\) days give \\(a d_1\\) man-days \\(= b d_2\\) woman-days.\n" +
        "- Then turn the team in the question into women, find the job in woman-days, and divide.\n" +
        "- **Three kinds of worker, fast route:** if 1 man = 2 women = 3 boys, give them daily units from the LCM: a man 6, a woman 3 and a boy 2.\n" +
        "- **A team that changes partway:** take the labour already done off the total and divide the rest by the new team, as with men added partway.",
      formula: {
        label: "Equivalent workers",
        latex: "a \\, d_1 \\text{ man-days} = b \\, d_2 \\text{ woman-days} \\qquad 1 \\text{ man} = \\frac{b \\, d_2}{a \\, d_1} \\text{ women}",
        symbols: [
          { symbol: "a", meaning: "men in the first team" },
          { symbol: "b", meaning: "women in the second team" },
          { symbol: "\\(d_1, d_2\\)", meaning: "days each team takes" },
        ],
      },
      authoredExample: {
        prompt: "6 men can do a job in 20 days and 10 women can do it in 18 days. How many days will 4 men and 6 women take working together?",
        steps: [
          "Labour: \\(6 \\times 20 = 120\\) man-days \\(= 10 \\times 18 = 180\\) woman-days, so 1 man \\(= 1.5\\) women.",
          "4 men and 6 women \\(= 6 + 6 = 12\\) women.",
          "Time \\(= 180 \\div 12 = 15\\) days.",
          "Check in men: 6 women \\(= 4\\) men, so the team is 8 men, and \\(120 \\div 8 = 15\\).",
        ],
        answer: "15 days",
      },
      selfCheckExample: {
        prompt: "1 man, 2 women or 4 boys can each finish a job in 70 days. How long do 1 man, 1 woman and 1 boy take working together?",
        steps: [
          "Give a man 4 units a day, a woman 2 and a boy 1. The job is \\(4 \\times 70 = 280\\) units.",
          "Together they do \\(4 + 2 + 1 = 7\\) units a day, so \\(280 \\div 7 = 40\\) days.",
        ],
        answer: "40 days",
      },
      practiceSet: [
        { prompt: "4 men or 6 women can do a job in the same time. How many women is one man worth?", answer: "1.5 women" },
        {
          prompt: "3 men can finish a job in 10 days and 5 women can finish it in 12 days. How many women is one man worth?",
          answer: "2 women",
          method: "30 man-days \\(= 60\\) woman-days.",
        },
        {
          prompt: "One man does the work of 2 women. A job takes 4 men 15 days. How long do 2 men and 4 women take?",
          answer: "15 days",
          method: "4 women are 2 men, so the team is 4 men.",
        },
      ],
      pyqExampleId: "f9c07d1a-0bf1-42ee-9612-a87b5acb2c36",
      traps: [
        {
          title: "Setting men equal to women without the days",
          body:
            "8 men in 10 days and 10 women in 12 days do not make 8 men equal to 10 women. Compare labour: 80 man-days \\(= 120\\) woman-days, so 1 man \\(= 1.5\\) women.",
        },
        {
          title: "Converting the wrong way",
          body:
            "If 1 man \\(= 1.5\\) women, then 4 men \\(= 6\\) women and 1 woman \\(= \\frac{2}{3}\\) of a man. Multiply when going from men to women, and divide when going back.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctwmw-groups",
      name: "Two mixed teams doing the same job",
      intuition:
        "Two mixed teams finish the same job, so the labour they put in is equal. Writing that as an equation in one man's and one woman's daily work tells you how many women a man is worth.",
      definition:
        "- Team 1 has \\(x_1\\) men and \\(y_1\\) women and takes \\(d_1\\) days; team 2 takes \\(d_2\\) days. Same job: \\(d_1(x_1 m + y_1 w) = d_2(x_2 m + y_2 w)\\).\n" +
        "- Solve for \\(m\\) in terms of \\(w\\). The job is then \\(d_1(x_1 m + y_1 w)\\), written in woman-days.\n" +
        "- **Same days:** if both teams take the same number of days, set the two teams equal directly.\n" +
        "- **One worker's time given:** if one woman alone would take a known time, the women's share of the team's daily work is known, and the rest is the men's.\n" +
        "- **Earnings instead of days:** divide each team's pay by its days to get daily pay, then solve the two equations for one man's (or woman's, or boy's) daily pay.",
      formula: {
        label: "Two mixed teams",
        latex: "d_1(x_1 m + y_1 w) = d_2(x_2 m + y_2 w)",
        symbols: [
          { symbol: "\\(x_1, x_2\\)", meaning: "men in each team" },
          { symbol: "\\(y_1, y_2\\)", meaning: "women in each team" },
          { symbol: "\\(d_1, d_2\\)", meaning: "days each team takes" },
          { symbol: "m, w", meaning: "one man's and one woman's daily work" },
        ],
      },
      authoredExample: {
        prompt: "3 men and 4 women can finish a job in 11 days, while 2 men and 7 women can finish it in 10 days. How many days will 5 women take?",
        steps: [
          "\\(11(3m + 4w) = 10(2m + 7w)\\), so \\(33m + 44w = 20m + 70w\\), giving \\(13m = 26w\\) and \\(m = 2w\\).",
          "The first team is \\(6 + 4 = 10\\) women, so the job is \\(10 \\times 11 = 110\\) woman-days.",
          "Check with the second team: \\(4 + 7 = 11\\) women for 10 days is also 110.",
          "5 women take \\(110 \\div 5 = 22\\) days.",
        ],
        answer: "22 days",
      },
      selfCheckExample: {
        prompt: "4 men and 3 boys finish a job in 6 days, and 2 men and 9 boys also finish it in 6 days. How long will 9 boys take?",
        steps: [
          "Same days, so \\(4m + 3b = 2m + 9b\\), giving \\(m = 3b\\).",
          "The first team is \\(12 + 3 = 15\\) boys, so the job is \\(15 \\times 6 = 90\\) boy-days.",
          "9 boys take \\(90 \\div 9 = 10\\) days.",
        ],
        answer: "10 days",
      },
      practiceSet: [
        {
          prompt: "2 men and 3 women do a job in the same time as 1 man and 5 women. How many women is one man worth?",
          answer: "2 women",
        },
        {
          prompt: "8 women and 3 men finish a job in 9 days, and one man does the work of 2 women. How many days will 7 women take?",
          answer: "18 days",
          method: "The team is 14 women, so the job is 126 woman-days.",
        },
        {
          prompt: "A team of 10 women and 6 men finishes a job in 5 days. One woman alone would take 100 days. How many days would one man alone take?",
          answer: "60 days",
          method: "Women do \\(\\frac{10}{100} = \\frac{1}{10}\\) a day of the team's \\(\\frac{1}{5}\\), so 6 men do \\(\\frac{1}{10}\\).",
        },
      ],
      pyqExampleId: "8e4a5029-01ee-4001-9aba-273144065fbe",
      traps: [
        {
          title: "Setting the teams equal when the days differ",
          body:
            "If the two teams take different numbers of days, multiply each team by its days before setting them equal. Only when the days are the same can the teams be set equal directly.",
        },
        {
          title: "Not checking with the second team",
          body:
            "After finding \\(m\\) in terms of \\(w\\), work out the job in woman-days from both teams. If the two totals differ, the ratio is wrong.",
        },
      ],
    },
  ],
};
