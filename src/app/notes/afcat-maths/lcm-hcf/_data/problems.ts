import type { SubtopicNote } from "@/app/notes/_types";

export const AF_LH_PROBLEMS_NOTE: SubtopicNote = {
  subtopicName: "Greatest and Least Number Problems",
  title: "Greatest and Least Number Problems: Tiles, Bells and Remainders",
  oneLineDefinition:
    "The greatest number that divides or measures a set of quantities is their HCF; the least number that they all divide, or the time when repeating events coincide, is their LCM; remainders and digit limits shift the answer by a known amount.",
  whyItMatters:
    "This is the largest page of the chapter and holds both of its HARD questions, plus an AFCAT question from 2016. The first decision is HCF or LCM: greatest that divides points to the HCF, least that is divisible or the next time together points to the LCM. Most marks are lost after that, by forgetting to take off or add back a remainder, or by missing the digit limit.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aflh-greatest-divisor",
      name: "The greatest number that divides or measures: tiles, containers and remainders",
      intuition:
        "A measure that fits each quantity exactly is a common factor of them all, and the biggest such measure is their HCF. If each division is to leave something over, remove what is left over first, and the rest must divide exactly.",
      definition:
        "- The largest container, rope length or weight that measures several amounts exactly: the HCF of the amounts.\n" +
        "- The largest square tile for an \\(l \\times b\\) floor: side \\(s = \\text{HCF}(l, b)\\) in one unit; the number of tiles is \\(\\dfrac ls \\times \\dfrac bs\\).\n" +
        "- The largest number dividing \\(a, b, c\\) and leaving remainder \\(r\\) in each: \\(\\text{HCF}(a - r, b - r, c - r)\\).\n" +
        "- Leaving remainders \\(r_1, r_2, r_3\\): \\(\\text{HCF}(a - r_1, b - r_2, c - r_3)\\).\n" +
        "- Leaving the same remainder, not stated: the HCF of the differences \\(b - a\\), \\(c - b\\), \\(c - a\\).",
      formula: {
        label: "Greatest divisor leaving remainders",
        latex: "\\text{HCF}(a - r_1,\\; b - r_2,\\; c - r_3)",
      },
      authoredExample: {
        prompt: "Find the largest number that divides 398, 436 and 542, leaving remainders 7, 11 and 15.",
        steps: [
          "Take off the remainders: 391, 425 and 527 must be divided exactly.",
          "\\(391 = 17 \\times 23\\), \\(425 = 17 \\times 25\\) and \\(527 = 17 \\times 31\\).",
          "23, 25 and 31 share no factor, so the HCF is 17.",
        ],
        answer: "\\(17\\).",
      },
      selfCheckExample: {
        prompt: "Find the largest number that divides 62, 132 and 237 and leaves the same remainder each time.",
        steps: [
          "The differences are \\(132 - 62 = 70\\), \\(237 - 132 = 105\\) and \\(237 - 62 = 175\\).",
          "\\(\\text{HCF}(70, 105, 175) = 35\\). Each number leaves remainder 27.",
        ],
        answer: "\\(35\\).",
      },
      practiceSet: [
        {
          prompt: "A hall is 7 m 20 cm long and 4 m 50 cm wide. Find the side of the largest square tile that paves it exactly, and the number of tiles.",
          answer: "90 cm; 40 tiles",
          method: "\\(\\text{HCF}(720, 450) = 90\\), and \\(8 \\times 5 = 40\\).",
        },
        { prompt: "Three drums hold 120 L, 168 L and 216 L. Find the largest can that measures each drum exactly.", answer: "24 L" },
        { prompt: "Find the largest number that divides 70 and 125, leaving remainders 5 and 8.", answer: "\\(13\\)", method: "\\(\\text{HCF}(65, 117)\\)." },
        { prompt: "Find the largest number that divides 43, 91 and 183 and leaves the same remainder each time.", answer: "\\(4\\)" },
      ],
      pyqExampleId: "4c4e5843-3a03-4769-ab17-ca1cbd2eb14b",
      traps: [
        {
          title: "Take the remainder off first",
          body: "The HCF of the original numbers answers a different question. If each division must leave 7, the divisor goes exactly into each number minus 7.",
        },
        {
          title: "One unit before the HCF",
          body: "A floor 3 m 60 cm by 2 m 40 cm is 360 cm by 240 cm, so the largest tile is 120 cm. Mixing metres and centimetres gives a meaningless HCF.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-together-again",
      name: "Bells, lights and laps: when events coincide again",
      intuition:
        "A bell that tolls every 6 seconds tolls at every multiple of 6. Several bells toll together at the common multiples of their intervals, so the first time after the start is the LCM.",
      definition:
        "- Events repeating every \\(a, b, c\\) units coincide every \\(\\text{LCM}(a, b, c)\\) units.\n" +
        "- Runners who start together are back at the start together after the LCM of their lap times.\n" +
        "- In a span of time \\(T\\), they coincide \\(\\left\\lfloor \\dfrac TL \\right\\rfloor\\) times after the start, and one more time if the start is counted.\n" +
        "- Work in one unit (seconds or minutes), then turn the LCM into a clock time at the end.",
      formula: {
        label: "Next time together",
        latex: "\\text{next meeting} = \\text{start} + \\text{LCM}(a, b, c)",
      },
      authoredExample: {
        prompt: "Three bells toll every 6, 8 and 12 seconds and toll together at the start. How many times do they toll together in the next 30 minutes?",
        steps: [
          "They toll together every \\(\\text{LCM}(6, 8, 12) = 24\\) seconds.",
          "30 minutes is 1,800 seconds, and \\(1800 \\div 24 = 75\\).",
        ],
        answer: "75 times (not counting the start).",
      },
      selfCheckExample: {
        prompt: "Three runners complete a lap in 36 s, 40 s and 50 s. They start together at 8:15:00. When are they next together at the start?",
        steps: [
          "\\(\\text{LCM}(36, 40, 50) = 2^3 \\times 3^2 \\times 5^2 = 1800\\) seconds.",
          "1,800 seconds is 30 minutes.",
        ],
        answer: "8:45:00.",
      },
      practiceSet: [
        { prompt: "Three lights flash every 15 s, 20 s and 25 s, and flash together at noon. When do they next flash together?", answer: "12:05 pm", method: "LCM is 300 s." },
        { prompt: "Bells ring every 4, 6 and 9 minutes. How many times do they ring together in 3 hours, not counting the start?", answer: "5", method: "LCM is 36 minutes." },
        { prompt: "Three cyclists lap a track in 24, 36 and 54 minutes. After how long are they first together at the start?", answer: "3 h 36 min", method: "LCM is 216 minutes." },
        { prompt: "Three signals change every 40 s, 60 s and 90 s. After how many minutes do they first change together?", answer: "6 minutes" },
      ],
      pyqExampleId: "ee294c0b-24cb-4395-bd00-ad5b827ad51c",
      traps: [
        {
          title: "Counting the start",
          body: "If bells coincide every 15 minutes, in 2 hours they coincide 8 times after the start, and 9 times if the start counts. Read which one the question asks.",
        },
        {
          title: "Together again is an LCM",
          body: "The next time together is the smallest common multiple of the intervals. Adding the intervals, or taking their HCF, gives a time when they are not all ringing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-least-remainder",
      name: "The least number leaving given remainders",
      intuition:
        "A number that leaves remainder 4 when divided by several numbers is 4 more than a common multiple of them. The least such number is the LCM plus 4. When each remainder falls short of its divisor by the same amount, the number is that amount less than a multiple of the LCM.",
      definition:
        "- Least number leaving remainder \\(r\\) with each of \\(a, b, c\\): \\(\\text{LCM}(a, b, c) + r\\).\n" +
        "- Remainders each \\(k\\) less than the divisors: \\(\\text{LCM} - k\\).\n" +
        "- Greatest \\(n\\)-digit number leaving remainder \\(r\\): the largest \\(n\\)-digit multiple of the LCM, plus \\(r\\). Check it still has \\(n\\) digits.\n" +
        "- With one more condition, such as divisible by 7: try \\(L \\times 1 + r\\), \\(L \\times 2 + r\\), and so on until it holds.",
      formula: {
        label: "Least number with a remainder",
        latex: "N = \\text{LCM}(a, b, c) \\times m + r, \\quad m = 1, 2, 3, \\ldots",
      },
      authoredExample: {
        prompt: "Find the least number which leaves remainder 4 when divided by 8, 9 and 15.",
        steps: [
          "\\(\\text{LCM}(8, 9, 15) = 2^3 \\times 3^2 \\times 5 = 360\\).",
          "The number is \\(360 + 4\\).",
        ],
        answer: "\\(364\\).",
      },
      selfCheckExample: {
        prompt: "Find the least number which leaves remainders 5, 9 and 15 when divided by 8, 12 and 18.",
        steps: [
          "Each remainder is 3 less than its divisor.",
          "\\(\\text{LCM}(8, 12, 18) = 72\\), so the number is \\(72 - 3\\).",
        ],
        answer: "\\(69\\).",
      },
      practiceSet: [
        { prompt: "Find the least number which leaves remainder 3 when divided by 5, 7 and 9.", answer: "\\(318\\)" },
        {
          prompt: "Find the least number which leaves remainder 2 when divided by 3, 4 and 5, and is divisible by 7.",
          answer: "\\(182\\)",
          method: "62 and 122 fail; \\(60 \\times 3 + 2 = 182 = 7 \\times 26\\).",
        },
        { prompt: "Find the greatest 3-digit number which leaves remainder 5 when divided by 9, 12 and 15.", answer: "\\(905\\)", method: "LCM 180; \\(5 \\times 180 = 900\\)." },
        { prompt: "Find the least number which leaves remainders 4, 5 and 10 when divided by 9, 10 and 15.", answer: "\\(85\\)" },
      ],
      pyqExampleId: "290bb747-6704-48a2-81e8-d93d9345b83a",
      traps: [
        {
          title: "Different remainders, same gap",
          body: "When the remainders differ, compare each with its divisor. Remainders 3, 8 and 13 on 7, 12 and 17 are each 4 short, so subtract 4 from the LCM; adding any of the remainders is wrong.",
        },
        {
          title: "Adding the remainder can add a digit",
          body: "For the greatest 3-digit number leaving remainder 7 on division by 333, 999 plus 7 has four digits. Step back one multiple: \\(666 + 7 = 673\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-lcm-multiples",
      name: "Multiples of the LCM in a range or with a condition",
      intuition:
        "Divisible by each of several numbers means divisible by their LCM. Every question here then asks for one particular multiple of the LCM: the first with four digits, the last below a bound, the one nearest a given number, or the smallest that is a perfect square.",
      definition:
        "- Divisible by all of \\(a, b, c\\) means a multiple of \\(L = \\text{LCM}(a, b, c)\\), not of their product.\n" +
        "- Least \\(n\\)-digit multiple: divide the smallest \\(n\\)-digit number by \\(L\\), round up, multiply back. Greatest: divide the largest, round down.\n" +
        "- Least number to add to \\(N\\): the next multiple of \\(L\\) minus \\(N\\). Least number to subtract: the remainder of \\(N \\div L\\).\n" +
        "- Largest number to subtract so that a positive multiple of \\(L\\) is left: \\(N - L\\).\n" +
        "- Multiples of \\(L\\) below \\(N\\): \\(\\left\\lfloor \\dfrac{N - 1}{L} \\right\\rfloor\\).\n" +
        "- Smallest multiple of \\(L\\) that is a perfect square: multiply in whatever primes make every power even.",
      formula: {
        label: "Multiples of the LCM",
        latex: "\\text{multiple} = L \\times m, \\quad L = \\text{LCM}(a, b, c)",
      },
      authoredExample: {
        prompt: "Find the least and the greatest 4-digit numbers divisible by 12, 15, 20 and 27.",
        steps: [
          "\\(L = 2^2 \\times 3^3 \\times 5 = 540\\).",
          "Least: \\(1000 \\div 540\\) is just under 2, so \\(2 \\times 540 = 1080\\).",
          "Greatest: \\(9999 \\div 540\\) is about 18.5, so \\(18 \\times 540 = 9720\\).",
        ],
        answer: "1,080 and 9,720.",
      },
      selfCheckExample: {
        prompt: "Find the least number that must be added to 3,100 so that the sum is divisible by 16, 24 and 40.",
        steps: [
          "\\(\\text{LCM}(16, 24, 40) = 240\\).",
          "\\(12 \\times 240 = 2880\\) and \\(13 \\times 240 = 3120\\), so the next multiple is 3,120.",
        ],
        answer: "\\(20\\).",
      },
      practiceSet: [
        { prompt: "How many numbers below 1,000 are divisible by 6, 8 and 12?", answer: "\\(41\\)", method: "LCM 24; \\(999 \\div 24 = 41.6\\)." },
        { prompt: "Find the least perfect square divisible by 8, 12 and 15.", answer: "\\(3600\\)", method: "LCM \\(120 = 2^3 \\times 3 \\times 5\\); multiply by 30." },
        { prompt: "Find the least number to subtract from 2,500 so that the result is divisible by 18 and 24.", answer: "\\(52\\)", method: "LCM 72; \\(72 \\times 34 = 2448\\)." },
        { prompt: "Find the greatest 3-digit number divisible by 15, 25 and 40.", answer: "\\(600\\)" },
      ],
      pyqExampleId: "e764a867-1191-489a-9e38-d474b0613f38",
      traps: [
        {
          title: "Divisible by all is the LCM, not the product",
          body: "A number divisible by 6 and 10 is a multiple of 30. Using the product, 60, misses 30 and 90.",
        },
        {
          title: "Largest to subtract leaves one copy, not zero",
          body: "Subtracting the whole number leaves 0, which every number divides, but the question means a positive result. Leave the smallest positive multiple, the LCM itself.",
        },
        {
          title: "Read which number is bounded",
          body: "'The greatest 5-digit number to be added' bounds the number added, not the sum. The sum can be as large as the given number plus 99,999.",
        },
      ],
    },
  ],
};
