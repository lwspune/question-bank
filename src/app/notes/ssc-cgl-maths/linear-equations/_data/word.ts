import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LE_WORD_NOTE: SubtopicNote = {
  subtopicName: "Word Problems and Applications",
  title: "Word Problems and Applications",
  oneLineDefinition:
    "Name the unknowns, turn each sentence into an equation, solve the system, and answer exactly what the question asks for.",
  whyItMatters:
    "Twenty-three questions in the bank, thirteen EASY and ten MODERATE. Eight need one unknown, eight need two, five swap two quantities and two count coins. Four of the swap questions come from the 2025 shifts and share one pattern: an order delivered with its quantities swapped, so the bill rises by a percentage. Writing the equations is the real work here; solving them is the first page of this chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssclewp-one",
      name: "Turning a word problem into one equation in one unknown",
      intuition:
        "Many word problems look as if they have two or three unknowns but really have one. Name one quantity x, write every other quantity in terms of x, and the story becomes a single equation.",
      definition:
        "- Call the quantity the question asks for, or the one everything else is described by, \\(x\\).\n" +
        "- Translate phrase by phrase: \"a quarter of the number\" is \\(\\frac{x}{4}\\), \"decreased by 3\" is \\(-\\,3\\), \"exceeds AB by 4\" is \\(AB + 4\\), \"3 less than twice AB\" is \\(2AB - 3\\).\n" +
        "- **Two kinds, one total:** if 15 items are of two kinds, call one kind \\(x\\) and the other \\(15 - x\\). One unknown, not two.\n" +
        "- **Steady change:** a quantity that starts at \\(a\\) and changes by \\(d\\) each step is \\(a + dt\\) after \\(t\\) steps. Two such quantities are equal when \\(a_1 + d_1t = a_2 + d_2t\\). From two known values, \\(d\\) is the change divided by the number of steps between them.\n" +
        "- **Seating:** with \\(c\\) seats, \"one person has no seat\" means \\(c + 1\\) people; \"two to a seat leaves one seat empty\" means \\(2(c - 1)\\) people.\n" +
        "- **Fast route for two kinds:** pretend every item is the cheaper kind; each swap to the dearer kind adds the price difference. The number of swaps is the shortfall divided by that difference. Safe only when there are exactly two kinds.",
      formula: {
        label: "Steady change",
        latex: "\\text{value after } t \\text{ steps} = a + dt \\qquad d = \\frac{\\text{later value} - \\text{earlier value}}{\\text{steps between them}}",
        symbols: [
          { symbol: "a", meaning: "the starting value" },
          { symbol: "d", meaning: "the change in each step (negative for a fall)" },
          { symbol: "t", meaning: "the number of steps" },
        ],
      },
      authoredExample: {
        prompt: "A purse holds 20 notes, each worth ₹10 or ₹5, and ₹130 in all. How many ₹10 notes are there?",
        steps: [
          "Let \\(n\\) notes be ₹10; then \\(20 - n\\) are ₹5.",
          "\\(10n + 5(20 - n) = 130\\), so \\(5n + 100 = 130\\) and \\(n = 6\\).",
          "Fast route: 20 notes of ₹5 would make ₹100. Each ₹10 note adds ₹5 more, and ₹30 more is needed, so there are 6 of them.",
          "Check: \\(6 \\times 10 + 14 \\times 5 = 60 + 70 = 130\\).",
        ],
        answer: "6 notes of ₹10",
      },
      selfCheckExample: {
        prompt: "Tank A holds 50 litres and gains 4 litres a day. Tank B holds 92 litres and loses 3 litres a day. After how many days do they hold the same amount?",
        steps: [
          "After \\(t\\) days: A holds \\(50 + 4t\\) and B holds \\(92 - 3t\\).",
          "\\(50 + 4t = 92 - 3t\\) gives \\(7t = 42\\), so \\(t = 6\\).",
          "Check: \\(50 + 24 = 74\\) and \\(92 - 18 = 74\\).",
        ],
        answer: "6 days",
      },
      practiceSet: [
        {
          prompt: "In a hall, if 3 students sit on each bench, 4 students have no seat. If 4 students sit on each bench, 2 benches are empty. How many benches are there?",
          answer: "12",
          method: "\\(3b + 4 = 4(b - 2)\\), so \\(b = 12\\) (and 40 students).",
        },
        {
          prompt: "A salary rises by the same amount every year. It is ₹20,000 after 3 years and ₹26,000 after 7 years. What is the yearly rise?",
          answer: "₹1,500",
          method: "₹6,000 over 4 steps.",
        },
        {
          prompt: "The sides of a triangle are \\(x\\), \\(x + 3\\) and \\(2x - 1\\) cm, and its perimeter is 26 cm. Find the longest side.",
          answer: "11 cm",
          method: "\\(4x + 2 = 26\\) gives \\(x = 6\\): the sides are 6, 9 and 11.",
        },
        {
          prompt: "A shop sold 15 items, some at ₹8 and the rest at ₹12, for ₹148 in all. How many were sold at ₹12?",
          answer: "7",
          method: "All at ₹8 would be ₹120; ₹28 more at ₹4 a swap is 7 swaps.",
        },
      ],
      pyqExampleId: "2b994993-1ea4-4c6e-96cf-c58d0b46b4b4",
      traps: [
        {
          title: "Using two letters where one will do",
          body:
            "When the total count is given, the second kind is the total minus the first. Two letters with one equation cannot be solved; one letter with one equation can.",
        },
        {
          title: "Miscounting the steps between two values",
          body:
            "From the value after year 6 to the value after year 15 there are 9 yearly steps, not 15 and not 10. Divide the change by the difference of the two step numbers.",
        },
        {
          title: "Answering x instead of the question",
          body:
            "Questions often ask for something built from x: half the number, the other kind of item, the smallest side. Read the last line again before picking an option, since x itself is usually one of the wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclewp-pair",
      name: "Two unknowns from two statements",
      intuition:
        "When the story gives two separate facts about two quantities, each fact is one equation. Two equations, two unknowns, then the elimination you already know.",
      definition:
        "- Name both unknowns, write one equation for each statement, and solve by elimination.\n" +
        "- **Transfers:** \"if A gives 1 to B, they are equal\" means \\(A - 1 = B + 1\\), so \\(A - B = 2\\). A transfer of \\(k\\) takes \\(k\\) from the giver **and** adds \\(k\\) to the receiver.\n" +
        "- **Rates per day:** when totals are earned over different numbers of days, divide each total by its days first, then compare.\n" +
        "- **Percentages of counts:** 18% of \\(y\\) is \\(0.18y\\); multiply the whole equation to clear the decimals.\n" +
        "- **Fast route, scaling:** if the asked combination is a fixed fraction of a given one (6 pens and 4 pencils is half of 12 pens and 8 pencils), scale the given price. No solving at all. It is safe only when **every** item scales by the same factor.\n" +
        "- **Fast route, combine:** if the question asks for a total such as \\(x + y\\), adding or subtracting the equations often gives it directly.",
      formula: {
        label: "Equal after a transfer of k",
        latex: "A - k = B + k \\;\\Rightarrow\\; A - B = 2k",
        symbols: [
          { symbol: "A, B", meaning: "the amounts the giver and the receiver hold before the transfer" },
          { symbol: "k", meaning: "the number of items handed over" },
        ],
      },
      authoredExample: {
        prompt: "3 pens and 2 notebooks cost ₹110. 2 pens and 5 notebooks cost ₹165. What does one notebook cost?",
        steps: [
          "Let a pen cost \\(p\\) and a notebook \\(n\\): \\(3p + 2n = 110\\) and \\(2p + 5n = 165\\).",
          "Make the \\(p\\) terms match: double the first, \\(6p + 4n = 220\\); triple the second, \\(6p + 15n = 495\\).",
          "Subtract: \\(11n = 275\\), so \\(n = 25\\), and then \\(3p = 110 - 50\\), so \\(p = 20\\).",
          "Check: \\(2(20) + 5(25) = 40 + 125 = 165\\).",
        ],
        answer: "₹25",
      },
      selfCheckExample: {
        prompt: "If P gives 2 marbles to Q, they have the same number. If Q gives 2 marbles to P, P has twice as many as Q. How many marbles do they have together?",
        steps: [
          "\\(P - 2 = Q + 2\\), so \\(P = Q + 4\\).",
          "\\(P + 2 = 2(Q - 2)\\), so \\(Q + 6 = 2Q - 4\\) and \\(Q = 10\\), \\(P = 14\\).",
          "Check: \\(12 = 12\\), and \\(16 = 2 \\times 8\\).",
        ],
        answer: "24",
      },
      practiceSet: [
        {
          prompt: "12 apples and 8 mangoes cost ₹520. What do 3 apples and 2 mangoes cost?",
          answer: "₹130",
          method: "3 apples and 2 mangoes are a quarter of 12 and 8.",
        },
        {
          prompt: "If \\(x + 2y = 11\\) and \\(2x + y = 13\\), find \\(x + y\\).",
          answer: "8",
          method: "Add: \\(3x + 3y = 24\\).",
        },
        {
          prompt: "5 men and 3 women together earn ₹2,600 in 2 days, and 2 men and 1 woman together earn ₹480 in 1 day. What does one woman earn in a day?",
          answer: "₹200",
          method: "Per day \\(5m + 3w = 1300\\) and \\(2m + w = 480\\); triple the second and subtract: \\(m = 140\\), \\(w = 200\\).",
        },
        { prompt: "If A gives 3 marbles to B, they have the same number. How many more marbles than B does A have?", answer: "6" },
      ],
      pyqExampleId: "ff0f0d3e-dc65-4424-8f7c-6003db2d4dc8",
      traps: [
        {
          title: "Taking the transfer as the difference",
          body:
            "If giving \\(k\\) items makes two people equal, they differed by \\(2k\\), not \\(k\\): the giver loses \\(k\\) and the receiver gains \\(k\\).",
        },
        {
          title: "Comparing totals over different numbers of days",
          body:
            "One group earning ₹4,200 in 6 days and another earning ₹6,300 in 7 days cannot go into the same pair of equations as they stand. Divide each total by its own number of days to get earnings per day first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclewp-swap",
      name: "Swapped quantities and the change in the bill",
      intuition:
        "In a delivery mix-up the two counts swap places while the prices stay where they were. Price everything in units of the cheaper item and both bills are short expressions in one unknown count.",
      definition:
        "- Call the cheaper item's price 1 unit and the dearer one's \\(r\\) units. If \\(q_1\\) of the dearer and \\(q_2\\) of the cheaper were ordered, the ordered bill is \\(rq_1 + q_2\\) units and the swapped bill is \\(rq_2 + q_1\\) units.\n" +
        "- \"The bill rose by \\(g\\%\\)\" means swapped bill \\(= \\left(1 + \\frac{g}{100}\\right) \\times\\) ordered bill. That is one linear equation in the unknown count.\n" +
        "- The change is \\((r - 1)(q_2 - q_1)\\) units, so the bill **rises** when more of the cheaper item was ordered and **falls** when more of the dearer one was.\n" +
        "- **Notes interchanged:** with \\(x\\) notes of ₹\\(a\\) and \\(y\\) of ₹\\(b\\), the amounts are \\(ax + by\\) and \\(bx + ay\\). Adding gives \\((a + b)(x + y)\\); subtracting gives \\((a - b)(x - y)\\).\n" +
        "- Finish with what is asked, often the ratio of the two ordered quantities.",
      formula: {
        label: "Swapped quantities",
        latex: "rq_1 + q_2 \\;\\to\\; rq_2 + q_1 \\qquad (a + b)(x + y) = P + Q \\qquad (a - b)(x - y) = P - Q",
        symbols: [
          { symbol: "r", meaning: "how many times the cheaper price the dearer price is" },
          { symbol: "\\(q_1, q_2\\)", meaning: "the ordered quantities of the dearer and the cheaper item" },
          { symbol: "P, Q", meaning: "the amounts before and after two kinds of notes are interchanged" },
        ],
      },
      authoredExample: {
        prompt:
          "A shop orders 10 large boxes and some small boxes. A large box costs 4 times as much as a small one. The delivery swaps the two quantities, and the bill rises by 50%. How many small boxes were ordered?",
        steps: [
          "Price a small box at 1 unit and a large one at 4 units; let \\(n\\) small boxes be ordered.",
          "Ordered bill \\(= 40 + n\\); delivered bill \\(= 4n + 10\\).",
          "\\(4n + 10 = 1.5(40 + n) = 60 + 1.5n\\), so \\(2.5n = 50\\) and \\(n = 20\\).",
          "Check: ordered 60 units, delivered 90 units, and \\(90 = 1.5 \\times 60\\).",
        ],
        answer: "20 small boxes",
      },
      selfCheckExample: {
        prompt: "Some ₹50 notes and some ₹20 notes make ₹480. With the numbers of the two kinds interchanged, they make ₹360. How many ₹50 notes are there?",
        steps: [
          "\\(50x + 20y = 480\\) and \\(20x + 50y = 360\\).",
          "Add: \\(70(x + y) = 840\\), so \\(x + y = 12\\). Subtract: \\(30(x - y) = 120\\), so \\(x - y = 4\\).",
          "So \\(x = 8\\) and \\(y = 4\\). Check: \\(400 + 80 = 480\\) and \\(160 + 200 = 360\\).",
        ],
        answer: "8",
      },
      practiceSet: [
        {
          prompt: "A buyer orders 4 kg of tea and some sugar. Tea costs 6 times as much per kg as sugar. The quantities are swapped in delivery and the bill doubles. How many kg of sugar were ordered?",
          answer: "11 kg",
          method: "\\(6s + 4 = 2(24 + s)\\), so \\(4s = 44\\).",
        },
        {
          prompt: "\\(x\\) notes of ₹10 and \\(y\\) notes of ₹5 make ₹80. With the numbers interchanged they make ₹70. Find \\(x\\) and \\(y\\).",
          answer: "\\(x = 6,\\ y = 4\\)",
          method: "\\(15(x + y) = 150\\) and \\(5(x - y) = 10\\).",
        },
        {
          prompt: "Two items are ordered, one dearer than the other. The quantities are swapped in delivery and the bill falls. Which item was ordered in the larger quantity?",
          answer: "The dearer item",
          method: "The change is \\((r - 1)(q_2 - q_1)\\), negative only when \\(q_1 > q_2\\).",
        },
      ],
      pyqExampleId: "a8da5053-b21e-4cc1-a4b7-612b715be853",
      traps: [
        {
          title: "Swapping the prices instead of the quantities",
          body:
            "In a delivery mix-up each item keeps its own price; only the counts change places. The swapped bill is (dearer price × the cheaper item's count) plus (cheaper price × the dearer item's count).",
        },
        {
          title: "Taking the percentage of the new bill",
          body:
            "\"The bill rose by 40%\" compares with the bill that was ordered: new bill \\(= 1.4 \\times\\) ordered bill, not ordered bill \\(= 0.6 \\times\\) new bill.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclewp-coins",
      name: "Whole-number answers: counting coins and notes",
      intuition:
        "A count of coins and their total value give two equations, but there are three kinds of coin. The equations alone allow many answers; the fact that every count is a whole number and none is negative narrows them to a short range, and the options do the rest.",
      definition:
        "- Write the count equation and the value equation, then subtract the count equation (times the smallest coin value) from the value equation. One kind of coin disappears.\n" +
        "- Write every other count in terms of the one the question asks about. Each must be 0 or more: that gives a **lower and an upper limit**.\n" +
        "- With one equation in two whole unknowns, such as \\(5x + 2y = 31\\), step through the values: \\(31 - 5x\\) must be even and not negative, so \\(x\\) is odd and at most 6.\n" +
        "- Test the options against the range: usually only one fits.",
      formula: {
        label: "Coins of ₹5, ₹2 and ₹1",
        latex: "x + y + z = N,\\quad 5x + 2y + z = V \\;\\Rightarrow\\; 4x + y = V - N",
        symbols: [
          { symbol: "x, y, z", meaning: "the numbers of ₹5, ₹2 and ₹1 coins" },
          { symbol: "N", meaning: "the total number of coins" },
          { symbol: "V", meaning: "the total value in rupees" },
        ],
      },
      authoredExample: {
        prompt:
          "₹50 is paid with ₹5, ₹2 and ₹1 coins, 20 coins in all. Which of 3, 5, 8 and 9 can be the number of ₹5 coins?",
        steps: [
          "\\(x + y + z = 20\\) and \\(5x + 2y + z = 50\\). Subtract: \\(4x + y = 30\\), so \\(y = 30 - 4x\\).",
          "Then \\(z = 20 - x - y = 3x - 10\\).",
          "\\(y \\ge 0\\) gives \\(x \\le 7\\); \\(z \\ge 0\\) gives \\(x \\ge 4\\). So \\(x\\) is 4, 5, 6 or 7, and only 5 is offered.",
          "Check \\(x = 5\\): \\(y = 10\\), \\(z = 5\\); \\(5 + 10 + 5 = 20\\) coins and \\(25 + 20 + 5 = 50\\) rupees.",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "₹31 is made with ₹5 and ₹2 coins only. How many ₹5 coins can there be?",
        steps: [
          "\\(5x + 2y = 31\\), so \\(2y = 31 - 5x\\) must be even and not negative.",
          "\\(31 - 5x\\) is even only for odd \\(x\\), and \\(x \\le 6\\). So \\(x = 1, 3\\) or \\(5\\), with \\(y = 13, 8\\) or \\(3\\).",
        ],
        answer: "1, 3 or 5",
      },
      practiceSet: [
        {
          prompt: "₹40 is paid with 14 coins, each worth ₹5 or ₹2. How many ₹5 coins are used?",
          answer: "4",
          method: "\\(5x + 2(14 - x) = 40\\), so \\(3x = 12\\).",
        },
        {
          prompt: "\\(x\\) and \\(y\\) are whole numbers, 0 or more, with \\(3x + 4y = 25\\). List the possible values of \\(x\\).",
          answer: "3 and 7",
          method: "\\(25 - 3x\\) must be a multiple of 4 and not negative.",
        },
        {
          prompt: "In how many ways can ₹20 be paid with ₹5 and ₹2 coins if at least one coin of each kind is used?",
          answer: "1",
          method: "\\(5x\\) must be even, so \\(x\\) is even: \\(x = 2\\), \\(y = 5\\) is the only way with both kinds.",
        },
      ],
      pyqExampleId: "4d28ff41-0763-43b9-b64d-a70cf48399ac",
      traps: [
        {
          title: "Checking only one count for a negative value",
          body:
            "Every count must be 0 or more, and each gives its own limit. In a three-coin question one count sets the upper limit and another the lower limit; an option outside either one is impossible.",
        },
      ],
    },
  ],
};
