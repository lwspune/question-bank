import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LE_AGES_NOTE: SubtopicNote = {
  subtopicName: "Age Problems",
  title: "Age Problems",
  oneLineDefinition:
    "Write every age at the time the sentence talks about, remember that everyone ages by the same number of years, and the age problem becomes a linear equation or a pair of them.",
  whyItMatters:
    "Fourteen questions in the bank, seven EASY and seven MODERATE. Three give today's ages or their gap and ask when a condition holds, eight give conditions at two different times, and three tie three people together. One fact cuts most of them short: the gap between two people's ages never changes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscleag-gap",
      name: "The gap between two ages never changes",
      intuition:
        "In ten years both people are ten years older, so the difference between their ages stays exactly the same. Only the ratio of their ages changes. If you know the gap, a condition like \"three times as old\" tells you the ages at once.",
      definition:
        "- After \\(t\\) years, add \\(t\\) to **every** age; \\(t\\) years ago, subtract \\(t\\) from every age. Write each condition with the ages at its own time.\n" +
        "- The **difference** of two ages is the same at every time. The ratio is not.\n" +
        "- **Fast route, times as old:** if the elder is \\(k\\) times the younger at some moment, the gap is \\(k - 1\\) times the younger's age at that moment. So the younger was \\(\\frac{\\text{gap}}{k - 1}\\).\n" +
        "- **Fast route, ratio:** if the ages are in the ratio \\(m : n\\) at some moment, the gap is \\(m - n\\) parts, so one part \\(= \\frac{\\text{gap}}{m - n}\\).\n" +
        "- The full method always works: let the unknown number of years be \\(x\\) and write one equation.",
      formula: {
        label: "Age-gap shortcut",
        latex: "\\text{younger then} = \\frac{\\text{gap}}{k - 1} \\qquad \\text{one ratio part} = \\frac{\\text{gap}}{m - n}",
        symbols: [
          { symbol: "k", meaning: "how many times as old the elder is at that moment" },
          { symbol: "m : n", meaning: "the ratio of the elder's age to the younger's at that moment" },
        ],
      },
      authoredExample: {
        prompt: "A father is 44 and his son is 12. In how many years will the father be three times as old as the son?",
        steps: [
          "Full method: \\(44 + x = 3(12 + x)\\), so \\(44 + x = 36 + 3x\\), \\(2x = 8\\) and \\(x = 4\\).",
          "Fast route: the gap is 32 and stays 32. When the father is 3 times the son, the gap is 2 times the son, so the son is then 16: that is 4 years from now.",
          "Check: in 4 years they are 48 and 16, and \\(48 = 3 \\times 16\\).",
        ],
        answer: "4 years",
      },
      selfCheckExample: {
        prompt: "A is 45 and B is 33. How many years ago was the ratio of their ages \\(5 : 3\\)?",
        steps: [
          "The gap is 12 at every time. In the ratio \\(5 : 3\\) the gap is 2 parts, so one part is 6.",
          "A was then \\(5 \\times 6 = 30\\), which was 15 years ago.",
          "Check: 15 years ago they were 30 and 18, and \\(30 : 18 = 5 : 3\\).",
        ],
        answer: "15 years ago",
      },
      practiceSet: [
        {
          prompt: "A mother is 30 years older than her daughter. How old will the daughter be when the mother is 4 times as old as her?",
          answer: "10",
          method: "\\(\\frac{30}{4 - 1} = 10\\).",
        },
        {
          prompt: "A is 25 and B is 15. In how many years will the ratio of their ages be \\(3 : 2\\)?",
          answer: "5 years",
          method: "The gap of 10 is one part, so B will be 20.",
        },
        {
          prompt: "Two brothers are 18 and 10. How many years ago was the elder three times as old as the younger?",
          answer: "6 years ago",
          method: "\\(\\frac{8}{2} = 4\\), so the younger was 4.",
        },
        { prompt: "The difference between two people's ages is 12 years today. What will it be in 20 years?", answer: "12 years" },
      ],
      pyqExampleId: "8781d0d6-0623-45d5-af13-c61981a74ae7",
      traps: [
        {
          title: "Moving only one person in time",
          body:
            "\"In 5 years, A will be twice B\" means \\(A + 5 = 2(B + 5)\\). Adding the 5 years to A alone, \\(A + 5 = 2B\\), is the most common slip in age questions.",
        },
        {
          title: "Expecting the ratio of ages to stay fixed",
          body:
            "If a mother is twice her son's age today, she will be less than twice his age in 5 years. The difference of the ages stays fixed; the ratio moves towards 1 as both grow older.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscleag-twotimes",
      name: "Age conditions at two different times",
      intuition:
        "Two conditions, each about a different moment, give two equations in today's two ages. Write both in terms of today's ages and solve the pair.",
      definition:
        "- Let today's ages be two letters. Write each condition at its own time: \"6 years ago she was 5 times as old\" is \\(M - 6 = 5(D - 6)\\).\n" +
        "- Each condition usually gives one age in terms of the other; set the two expressions equal and solve.\n" +
        "- A ratio condition such as \\(\\frac{B + 9}{A + 9} = \\frac{4}{3}\\) becomes \\(3(B + 9) = 4(A + 9)\\) by cross-multiplying.\n" +
        "- **Fast route, the options:** when the options print both ages, test the simpler condition first. It usually leaves one option, and the other condition confirms it.\n" +
        "- **\"Times more than\":** \"5 times more than \\(a\\)\" strictly means \\(a + 5a = 6a\\), but some questions use it to mean \\(5a\\). Work out both readings and keep the one that reaches a printed option.",
      authoredExample: {
        prompt: "Five years ago a mother was 5 times as old as her son. Five years from now she will be 3 times as old as him. Find their present ages.",
        steps: [
          "Five years ago: \\(M - 5 = 5(S - 5)\\), so \\(M = 5S - 20\\).",
          "Five years on: \\(M + 5 = 3(S + 5)\\), so \\(M = 3S + 10\\).",
          "\\(5S - 20 = 3S + 10\\) gives \\(2S = 30\\), so \\(S = 15\\) and \\(M = 55\\).",
          "Check: five years ago 50 and 10 (5 times); five years on 60 and 20 (3 times).",
        ],
        answer: "Mother 55, son 15",
      },
      selfCheckExample: {
        prompt: "The ages of A and B are in the ratio \\(4 : 3\\) now. In 6 years the ratio will be \\(5 : 4\\). Find A's present age.",
        steps: [
          "Let the ages be \\(4k\\) and \\(3k\\). Then \\(\\frac{4k + 6}{3k + 6} = \\frac{5}{4}\\).",
          "\\(16k + 24 = 15k + 30\\), so \\(k = 6\\) and A is 24.",
          "Check: B is 18; in 6 years 30 and 24, and \\(30 : 24 = 5 : 4\\).",
        ],
        answer: "24 years",
      },
      practiceSet: [
        {
          prompt: "Three years ago P was 3 times as old as Q. In three years P will be twice as old as Q. Find Q's present age.",
          answer: "9",
          method: "\\(P = 3Q - 6\\) and \\(P = 2Q + 3\\).",
        },
        {
          prompt: "A father is 4 times as old as his son. In 10 years he will be twice as old as his son. Find the father's present age.",
          answer: "20",
          method: "\\(4S + 10 = 2(S + 10)\\) gives \\(S = 5\\).",
        },
        {
          prompt: "The ages of X and Y are in the ratio \\(3 : 5\\). Eight years ago the ratio was \\(1 : 3\\). Find X's present age.",
          answer: "12",
          method: "\\(3(3k - 8) = 5k - 8\\) gives \\(k = 4\\).",
        },
        {
          prompt: "B is 10 years old. Read strictly, how old is someone who is \"three times more than\" B's age?",
          answer: "40",
          method: "\\(10 + 3 \\times 10\\).",
        },
      ],
      pyqExampleId: "535eb3da-7d96-487a-b731-321821cceacd",
      traps: [
        {
          title: "Using today's ages inside a past condition",
          body:
            "\"Eight years ago he was 3 times as old as his son\" is \\(F - 8 = 3(S - 8)\\). Writing \\(F - 8 = 3S\\) moves the father back in time and leaves the son where he is.",
        },
        {
          title: "Reading \"times more than\" one way only",
          body:
            "\"Five times more than\" strictly means six times as much, but question setters also use it for five times. Try both readings; usually only one of them lands on a printed option.",
        },
        {
          title: "Stopping at one age when the question asks for a combination",
          body:
            "Age questions often ask for the sum of the present ages, their ratio or their difference. Solving for one person and choosing that number is a common way to pick a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscleag-family",
      name: "Three or more people linked by relations",
      intuition:
        "A family question chains people together: the mother through the son, the brother through the friend. Pick the one person everyone else is described by, write every age in terms of that one letter, and a single fact finishes it.",
      definition:
        "- Choose as \\(x\\) the person the other relations are measured from, and write every other age in terms of \\(x\\).\n" +
        "- Use the fact left over, a sum, a difference or a future condition, as the one equation.\n" +
        "- \"A and B differ by 7\" does not say who is older. Try both orders and keep the one that gives whole, sensible ages.\n" +
        "- A fraction in a relation (\"a quarter of his brother's age\") is easiest cleared by multiplying the whole equation early.",
      authoredExample: {
        prompt: "A is twice as old as B, and C is 4 years younger than B. The three ages add up to 56. How old is C?",
        steps: [
          "Everyone is described through B, so let B be \\(b\\): A is \\(2b\\) and C is \\(b - 4\\).",
          "\\(2b + b + (b - 4) = 56\\), so \\(4b = 60\\) and \\(b = 15\\).",
          "C is \\(15 - 4 = 11\\). Check: \\(30 + 15 + 11 = 56\\).",
        ],
        answer: "11 years",
      },
      selfCheckExample: {
        prompt: "P is 6 years older than Q. Q's sister R is half Q's age. The ages of P and R differ by 21 years. How old is Q?",
        steps: [
          "Let Q be \\(q\\): P is \\(q + 6\\) and R is \\(\\frac{q}{2}\\).",
          "\\(q + 6 - \\frac{q}{2} = 21\\), so \\(\\frac{q}{2} = 15\\) and \\(q = 30\\).",
          "Check: P is 36 and R is 15, and \\(36 - 15 = 21\\).",
        ],
        answer: "30 years",
      },
      practiceSet: [
        {
          prompt: "A is 5 years older than B, and C is twice as old as B. Their ages add up to 45. How old is C?",
          answer: "20",
          method: "\\((b + 5) + b + 2b = 45\\) gives \\(b = 10\\).",
        },
        {
          prompt: "A father is 3 times as old as his elder son, the younger son is 4 years younger than the elder, and the three ages add up to 61. How old is the younger son?",
          answer: "9",
          method: "\\(3e + e + (e - 4) = 61\\) gives \\(e = 13\\).",
        },
        {
          prompt: "The ages of two friends differ by 4 years, and one of them is 12. What can the other's age be?",
          answer: "8 or 16",
        },
      ],
      pyqExampleId: "9d952660-6c8c-4551-b761-c35ed85bd288",
      traps: [
        {
          title: "Deciding who is older when the question does not say",
          body:
            "\"Their ages differ by 7 years\" allows either person to be the elder. Settle the order from the other facts, or try both and keep the one that gives whole, sensible ages.",
        },
      ],
    },
  ],
};
