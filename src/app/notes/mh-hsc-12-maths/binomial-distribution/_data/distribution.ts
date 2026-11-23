import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_BD_DISTRIBUTION_NOTE: SubtopicNote = {
  subtopicName: "The Binomial Distribution",
  title: "The Binomial Distribution: Probability of x Successes",
  oneLineDefinition:
    "In n Bernoulli trials with probability of success p, the number of successes X follows the binomial distribution B(n, p), with P(X = x) = ⁿCₓ pˣ qⁿ⁻ˣ for x = 0, 1, 2, ..., n.",
  whyItMatters:
    "70 questions, twelve of them from board papers. The board asked most often for the probability of exactly x successes (2015, 2016, 2017, 2024, 2025 twice and 2026), then for at least once (2017, 2020, 2024) and for at least or at most a number of successes (2022, 2023). Half of the board's questions on this page are textbook exercises with the same numbers, so work every exercise of the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmbd-pmf",
      name: "Probability of exactly x successes",
      intuition:
        "Think of n trials as n boxes, each filled with S (success) or F (failure). One particular arrangement with x successes has probability p multiplied x times and q multiplied n minus x times. The number of such arrangements is nCx, and they cannot happen together, so you add them all: nCx times p to the power x times q to the power n minus x. These n + 1 probabilities are the terms of (q + p) to the power n, which is why the distribution is called binomial and why they add up to 1.",
      definition:
        "- Let \\(X\\) be the number of successes in \\(n\\) Bernoulli trials, with \\(p\\) = probability of success and \\(q = 1 - p\\).\n" +
        "- Then \\(X \\sim B(n, p)\\), read as 'X follows the binomial distribution with parameters n and p'.\n" +
        "- \\(P(X = x) = {}^{n}C_{x}\\, p^{x} q^{n-x}\\), for \\(x = 0, 1, 2, \\ldots, n\\). This is the **probability function** of the distribution.\n" +
        "- \\(x\\) successes and \\(n - x\\) failures can be arranged in \\({}^{n}C_{x} = \\dfrac{n!}{x!\\,(n-x)!}\\) ways, and each arrangement has probability \\(p^{x} q^{n-x}\\).\n" +
        "- \\(P(X = x)\\) is the \\((x + 1)\\)th term of \\((q + p)^{n}\\), so all the probabilities add up to \\((q + p)^{n} = 1\\).\n" +
        "- \\(P(X = 0) = q^{n}\\) and \\(P(X = n) = p^{n}\\).\n" +
        "- **A full answer shows:** 'Let X be the number of ...', the values of \\(n\\), \\(p\\), \\(q\\), the line \\(X \\sim B(n, p)\\), the formula, the value of \\(x\\), the substitution and the answer.",
      formula: {
        label: "Binomial probability function",
        latex: "P(X = x) = {}^{n}C_{x}\\, p^{x} q^{n-x}, \\quad x = 0, 1, 2, \\ldots, n",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of trials" },
          { symbol: "\\(x\\)", meaning: "number of successes asked for" },
          { symbol: "\\(p\\)", meaning: "probability of success in one trial" },
          { symbol: "\\(q\\)", meaning: "probability of failure in one trial, 1 minus p" },
        ],
      },
      authoredExample: {
        prompt:
          "A test has 6 multiple choice questions, each with 4 answers of which only one is right. A student guesses every answer. Find the probability that exactly 2 answers are right.",
        steps: [
          "Let \\(X\\) be the number of right answers. Each guess is right or wrong, with the same chance every time, so the 6 guesses are Bernoulli trials.",
          "\\(n = 6\\), \\(p = \\dfrac{1}{4}\\), \\(q = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}\\). So \\(X \\sim B\\left(6, \\dfrac{1}{4}\\right)\\).",
          "\\(P(X = x) = {}^{6}C_{x}\\left(\\dfrac{1}{4}\\right)^{x}\\left(\\dfrac{3}{4}\\right)^{6-x}\\).",
          "Exactly 2 right means \\(x = 2\\): \\(P(X = 2) = {}^{6}C_{2}\\left(\\dfrac{1}{4}\\right)^{2}\\left(\\dfrac{3}{4}\\right)^{4}\\).",
          "\\(= 15 \\times \\dfrac{1}{16} \\times \\dfrac{81}{256} = \\dfrac{1215}{4096}\\).",
        ],
        answer: "\\(P(X = 2) = \\dfrac{1215}{4096} \\approx 0.2966\\)",
      },
      selfCheckExample: {
        prompt:
          "In a large batch, 20% of the bulbs are faulty. Four bulbs are picked at random. Find the probability that exactly one of them is faulty.",
        steps: [
          "Let \\(X\\) be the number of faulty bulbs: \\(n = 4\\), \\(p = 0.2\\), \\(q = 0.8\\).",
          "\\(P(X = 1) = {}^{4}C_{1}(0.2)^{1}(0.8)^{3} = 4 \\times 0.2 \\times 0.512\\).",
        ],
        answer: "\\(P(X = 1) = 0.4096\\)",
      },
      practiceSet: [
        { prompt: "For \\(X \\sim B(n, p)\\), write \\(P(X = 0)\\) and \\(P(X = n)\\).", answer: "\\(P(X = 0) = q^{n}\\) and \\(P(X = n) = p^{n}\\)" },
        { prompt: "For \\(X \\sim B\\left(4, \\dfrac{1}{2}\\right)\\), find \\(P(X = 2)\\).", answer: "\\({}^{4}C_{2}\\left(\\dfrac{1}{2}\\right)^{4} = \\dfrac{6}{16} = \\dfrac{3}{8}\\)" },
        { prompt: "A card is drawn 3 times with replacement from a well-shuffled pack of 52 cards. Find the probability that all three are hearts.", answer: "\\(\\left(\\dfrac{13}{52}\\right)^{3} = \\left(\\dfrac{1}{4}\\right)^{3} = \\dfrac{1}{64}\\)" },
      ],
      pyqExampleId: "6e04b36a-dbf8-4c7e-9322-bfa498e5f4fb",
      traps: [
        {
          title: "Leaving out nCx",
          body: "\\(p^{x}q^{n-x}\\) is the probability of ONE arrangement, such as SSFFF. The answer needs all \\({}^{n}C_{x}\\) arrangements, so multiply by \\({}^{n}C_{x}\\). It is 1 only when \\(x = 0\\) or \\(x = n\\).",
        },
        {
          title: "Putting the powers on the wrong letters",
          body: "The power of \\(p\\) is the number of successes \\(x\\); the power of \\(q\\) is the number of failures \\(n - x\\). The two powers always add up to \\(n\\), which is a quick check.",
        },
        {
          title: "Counting hits when the question counts misses",
          body: "If a question asks how many bombs miss, a miss is the success, so \\(p\\) is the probability of a miss. Read what is being counted before writing \\(p\\).",
        },
        {
          title: "Starting with the formula and no set-up",
          body: "A board answer that begins with numbers loses the first mark. Write 'Let X be the number of ...', the values of \\(n\\), \\(p\\) and \\(q\\), and \\(X \\sim B(n, p)\\) before the formula.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmbd-cumulative",
      name: "At least, at most, more than and less than",
      intuition:
        "Most board questions do not ask for one value of x but for a range: at least 5, at most 6, not more than one. Turn the words into a list of x values, then add \\(P(X = x)\\) for each one. When the list is long, the values NOT in it are fewer, so work out those and take the answer away from 1.",
      definition:
        "For \\(X \\sim B(n, p)\\), turn the words into values of \\(x\\):\n" +
        "- **at least \\(k\\)**: \\(x = k, k + 1, \\ldots, n\\), written \\(X \\geq k\\);\n" +
        "- **at most \\(k\\)**, or **not more than \\(k\\)**: \\(x = 0, 1, \\ldots, k\\), written \\(X \\leq k\\);\n" +
        "- **more than \\(k\\)**: \\(x = k + 1, \\ldots, n\\); **less than \\(k\\)**: \\(x = 0, \\ldots, k - 1\\).\n" +
        "- Add the terms: \\(P(X \\geq k) = P(X = k) + P(X = k + 1) + \\cdots + P(X = n)\\).\n" +
        "- If the list is long, use the complement: \\(P(X \\geq k) = 1 - P(X \\leq k - 1)\\) and \\(P(X \\leq k) = 1 - P(X \\geq k + 1)\\).\n" +
        "- When \\(p = q = \\dfrac{1}{2}\\), every term has the same denominator \\(2^{n}\\), so add the values of \\({}^{n}C_{x}\\) first and divide once.",
      formula: {
        label: "Complement rule",
        latex: "P(X \\geq k) = 1 - P(X \\leq k - 1)",
      },
      authoredExample: {
        prompt:
          "The probability that a student of a class is absent on a given day is 0.1. For a group of 6 students, find the probability that at most one is absent on that day.",
        steps: [
          "Let \\(X\\) be the number of students absent. \\(n = 6\\), \\(p = 0.1\\), \\(q = 0.9\\), so \\(X \\sim B(6, 0.1)\\).",
          "\\(P(X = x) = {}^{6}C_{x}(0.1)^{x}(0.9)^{6-x}\\).",
          "At most one means \\(x = 0\\) or \\(x = 1\\): \\(P(X \\leq 1) = P(X = 0) + P(X = 1)\\).",
          "\\(P(X = 0) = (0.9)^{6} = 0.531441\\).",
          "\\(P(X = 1) = {}^{6}C_{1}(0.1)(0.9)^{5} = 6 \\times 0.1 \\times 0.59049 = 0.354294\\).",
          "\\(P(X \\leq 1) = 0.531441 + 0.354294 = 0.885735\\).",
        ],
        answer: "\\(P(X \\leq 1) = 0.885735 \\approx 0.8857\\)",
      },
      selfCheckExample: {
        prompt: "Let \\(X \\sim B(4, 0.2)\\). Find \\(P(X > 2)\\).",
        steps: [
          "More than 2 means \\(x = 3\\) or \\(x = 4\\).",
          "\\(P(X = 3) = {}^{4}C_{3}(0.2)^{3}(0.8) = 4 \\times 0.008 \\times 0.8 = 0.0256\\).",
          "\\(P(X = 4) = (0.2)^{4} = 0.0016\\).",
        ],
        answer: "\\(P(X > 2) = 0.0256 + 0.0016 = 0.0272\\)",
      },
      practiceSet: [
        { prompt: "In 6 trials, which values of \\(x\\) make up 'more than 2 successes'?", answer: "\\(x = 3, 4, 5, 6\\)" },
        { prompt: "For \\(X \\sim B(5, p)\\), write \\(P(X \\leq 4)\\) using the complement.", answer: "\\(1 - P(X = 5) = 1 - p^{5}\\)" },
        { prompt: "For \\(X \\sim B\\left(6, \\dfrac{1}{3}\\right)\\), write the terms you add for \\(P(X < 2)\\).", answer: "\\(P(X = 0) + P(X = 1) = \\left(\\dfrac{2}{3}\\right)^{6} + 6\\left(\\dfrac{1}{3}\\right)\\left(\\dfrac{2}{3}\\right)^{5}\\)" },
      ],
      pyqExampleId: "a841931b-fa52-4df4-a41e-1c163dac36b2",
      traps: [
        {
          title: "Leaving k out of 'at least k'",
          body: "'At least k' includes k itself: \\(X \\geq k\\). Only 'more than k' starts from \\(k + 1\\). Write the list of \\(x\\) values in the answer so the examiner sees it.",
        },
        {
          title: "Taking 'at most one' as one term",
          body: "'At most one' and 'not more than one' mean \\(x = 0\\) and \\(x = 1\\): two terms. Writing only \\(P(X = 1)\\) answers a different question.",
        },
        {
          title: "Subtracting the wrong tail",
          body: "\\(P(X \\geq k) = 1 - P(X \\leq k - 1)\\), not \\(1 - P(X \\leq k)\\). Check that the values you take away and the values you want together cover \\(0\\) to \\(n\\) exactly once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmbd-atleastone",
      name: "At least once, and how many trials are needed",
      intuition:
        "'At least once' covers every value of x from 1 to n, a long list. Its opposite is a single case: no success at all, whose probability is q to the power n. So the answer is 1 minus q to the power n. The same idea answers 'how many times must you try so that the chance of at least one success is more than a given number'.",
      definition:
        "- 'At least once' means \\(X \\geq 1\\); its complement is 'none', \\(X = 0\\).\n" +
        "- \\(P(X = 0) = {}^{n}C_{0}\\,p^{0}q^{n} = q^{n}\\), so \\(P(X \\geq 1) = 1 - q^{n}\\).\n" +
        "- **How many trials:** to have \\(P(X \\geq 1) > a\\), you need \\(1 - q^{n} > a\\), that is \\(q^{n} < 1 - a\\).\n" +
        "- Try \\(n = 1, 2, 3, \\ldots\\) until \\(q^{n}\\) first drops below \\(1 - a\\). That \\(n\\) is the least number of trials; show that \\(n - 1\\) does not work.",
      formula: {
        label: "At least one success",
        latex: "P(X \\geq 1) = 1 - q^{n}",
      },
      authoredExample: {
        prompt:
          "A player hits a target with probability 0.3 on each shot, and the shots are independent. Find the probability that the player hits the target at least once in 4 shots.",
        steps: [
          "Let \\(X\\) be the number of hits. \\(n = 4\\), \\(p = 0.3\\), \\(q = 0.7\\), so \\(X \\sim B(4, 0.3)\\).",
          "At least once means \\(X \\geq 1\\), whose complement is \\(X = 0\\).",
          "\\(P(X = 0) = (0.7)^{4} = 0.2401\\).",
          "\\(P(X \\geq 1) = 1 - P(X = 0) = 1 - 0.2401\\).",
        ],
        answer: "\\(P(X \\geq 1) = 0.7599\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the least number of times a fair coin must be tossed so that the probability of getting at least one head is more than 0.9.",
        steps: [
          "\\(q = \\dfrac{1}{2}\\). We need \\(1 - \\left(\\dfrac{1}{2}\\right)^{n} > 0.9\\), that is \\(\\left(\\dfrac{1}{2}\\right)^{n} < 0.1\\).",
          "\\(n = 3\\): \\(\\dfrac{1}{8} = 0.125\\), not less than 0.1.",
          "\\(n = 4\\): \\(\\dfrac{1}{16} = 0.0625 < 0.1\\).",
        ],
        answer: "At least 4 tosses",
      },
      practiceSet: [
        { prompt: "For a binomial variable \\(X\\), \\(P(X = 0) = 0.3\\). Find \\(P(X \\geq 1)\\).", answer: "\\(1 - 0.3 = 0.7\\)" },
        { prompt: "Each of 3 machines breaks down on a given day with probability 0.1, independently. Find the probability that at least one breaks down that day.", answer: "\\(1 - (0.9)^{3} = 1 - 0.729 = 0.271\\)" },
      ],
      pyqExampleId: "1cd3017e-d55f-427e-a174-39526b5ddb40",
      traps: [
        {
          title: "Writing p or np for 'at least once'",
          body: "\\(p\\) is the chance of success in ONE trial and \\(np\\) is the mean. Neither is the probability of at least one success in \\(n\\) trials; that is \\(1 - q^{n}\\).",
        },
        {
          title: "Reversing the inequality for the number of trials",
          body: "\\(1 - q^{n} > a\\) becomes \\(q^{n} < 1 - a\\): the sign turns round when you move \\(q^{n}\\) across. Then give the least whole number \\(n\\) and show the one below it fails.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmbd-findp",
      name: "Finding p from two probabilities",
      intuition:
        "Sometimes p is hidden: the question gives a relation between two probabilities, such as \\(P(X = 4) = P(X = 3)\\), or gives their values. Write both terms in full. The same powers of \\(p\\) and \\(q\\) appear on both sides, so most of them cancel and a simple equation in \\(p\\) and \\(q\\) is left. Put \\(q = 1 - p\\) and solve.",
      definition:
        "- Write each probability in full with \\(P(X = x) = {}^{n}C_{x}\\,p^{x}q^{n-x}\\).\n" +
        "- Divide one by the other (or cancel the common factors) to get an equation in \\(\\dfrac{p}{q}\\).\n" +
        "- Put \\(q = 1 - p\\) and solve for \\(p\\); check that \\(0 < p < 1\\).\n" +
        "- If \\(P(X = 0) = q^{n}\\) or \\(P(X = n) = p^{n}\\) is given, take the \\(n\\)th root.\n" +
        "- Then answer what the question finally asks, which is often another probability.",
      formula: {
        label: "Ratio of two neighbouring terms",
        latex: "\\dfrac{P(X = x + 1)}{P(X = x)} = \\dfrac{{}^{n}C_{x+1}}{{}^{n}C_{x}} \\cdot \\dfrac{p}{q}",
      },
      authoredExample: {
        prompt: "Let \\(X \\sim B(6, p)\\) with \\(P(X = 2) = P(X = 3)\\). Find \\(p\\).",
        steps: [
          "\\(P(X = 2) = {}^{6}C_{2}\\,p^{2}q^{4} = 15p^{2}q^{4}\\) and \\(P(X = 3) = {}^{6}C_{3}\\,p^{3}q^{3} = 20p^{3}q^{3}\\).",
          "\\(15p^{2}q^{4} = 20p^{3}q^{3}\\). Divide both sides by \\(5p^{2}q^{3}\\): \\(3q = 4p\\).",
          "Put \\(q = 1 - p\\): \\(3 - 3p = 4p\\), so \\(7p = 3\\).",
        ],
        answer: "\\(p = \\dfrac{3}{7}\\)",
      },
      selfCheckExample: {
        prompt: "Let \\(X \\sim B(3, p)\\) with \\(P(X = 3) = \\dfrac{8}{27}\\). Find \\(p\\) and \\(P(X = 0)\\).",
        steps: [
          "\\(P(X = 3) = p^{3} = \\dfrac{8}{27}\\), so \\(p = \\dfrac{2}{3}\\) and \\(q = \\dfrac{1}{3}\\).",
          "\\(P(X = 0) = q^{3} = \\dfrac{1}{27}\\).",
        ],
        answer: "\\(p = \\dfrac{2}{3}\\), \\(P(X = 0) = \\dfrac{1}{27}\\)",
      },
      practiceSet: [
        { prompt: "Let \\(X \\sim B(5, p)\\) with \\(P(X = 1) = P(X = 2)\\). Find \\(p\\).", answer: "\\(5pq^{4} = 10p^{2}q^{3}\\) gives \\(q = 2p\\), so \\(p = \\dfrac{1}{3}\\)" },
        { prompt: "Let \\(X \\sim B(2, p)\\) with \\(P(X = 0) = 0.36\\). Find \\(p\\).", answer: "\\(q^{2} = 0.36\\), \\(q = 0.6\\), so \\(p = 0.4\\)" },
      ],
      pyqExampleId: "197ad2e4-fb3a-4397-8751-5baa29e363c5",
      traps: [
        {
          title: "Expanding instead of cancelling",
          body: "Do not expand \\(q^{4} = (1 - p)^{4}\\). Cancel the common powers of \\(p\\) and \\(q\\) first; what is left is a one-line equation.",
        },
        {
          title: "Stopping at p",
          body: "Many of these questions use \\(p\\) only as a step, for example 'find \\(P(X = 4)\\)'. Read the last line of the question again after finding \\(p\\).",
        },
      ],
    },
  ],
};
