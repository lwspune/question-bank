import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_DIVIDING_NOTE: SubtopicNote = {
  subtopicName: "Dividing in a Ratio and Partnership",
  title: "Dividing a Total in a Ratio, and Partnership",
  oneLineDefinition:
    "Split a total into equal parts and hand out each share, including ratios written as fractions, a changed ratio, and profits shared by capital times time.",
  whyItMatters:
    "AFCAT itself asks this: four of the chapter's past-year questions are here, from 2016 and 2018, and none of the page is HARD. The whole skill is one number, the size of one part. Get it from the total or from one known share, and every answer is a multiple of it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-share-of-total",
      name: "Dividing a total in a ratio",
      intuition:
        "Dividing ₹1,200 in the ratio \\(2 : 3 : 5\\) cuts it into \\(2 + 3 + 5 = 10\\) equal parts. One part is ₹120, and each person gets their number of parts.",
      definition:
        "- The share for the term \\(p\\) when \\(T\\) is split \\(p : q : r\\) is \\(\\dfrac{p}{p + q + r} \\times T\\).\n" +
        "- Given one share instead of the total: that share divided by its term is one part. Multiply up from there.\n" +
        "- The difference between two shares is the difference of their terms times one part.\n" +
        "- 'A gets \\(\\tfrac 29\\) of what B and C together get' is the ratio \\(A : (B + C) = 2 : 9\\), so A has 2 of 11 parts.\n" +
        "- Money, weight and people all divide the same way. If the answer is asked in another unit, convert at the end.",
      formula: {
        label: "Share in a ratio",
        latex: "\\text{share of } p = \\dfrac{p}{p + q + r} \\times T",
      },
      visualizationSlug: "ratio-bar-model",
      authoredExample: {
        prompt:
          "₹1,200 is divided among X, Y and Z in the ratio \\(2 : 3 : 5\\). Find each share, and how much more Z gets than X.",
        steps: [
          "\\(2 + 3 + 5 = 10\\) parts, so one part is \\(1200 \\div 10 = 120\\).",
          "X gets \\(2 \\times 120 = 240\\), Y gets \\(360\\) and Z gets \\(600\\).",
          "Z gets 3 parts more than X: \\(3 \\times 120 = 360\\).",
        ],
        answer: "₹240, ₹360, ₹600; Z gets ₹360 more.",
      },
      selfCheckExample: {
        prompt:
          "Money is divided among P, Q, R and S in the ratio \\(1 : 4 : 6 : 9\\). Q gets ₹2,000. Find the total, and what P and S get together.",
        steps: [
          "Q's 4 parts are ₹2,000, so one part is ₹500.",
          "The total is 20 parts: ₹10,000.",
          "P and S together have \\(1 + 9 = 10\\) parts: ₹5,000.",
        ],
        answer: "₹10,000; ₹5,000.",
      },
      practiceSet: [
        { prompt: "Divide ₹560 in the ratio \\(3 : 5\\). Find the larger share.", answer: "₹350", method: "One part is 70." },
        { prompt: "Two numbers in the ratio \\(7 : 9\\) add up to 96. Find their difference.", answer: "\\(12\\)" },
        { prompt: "Boys and girls in a class are in the ratio \\(4 : 5\\). There are 36 boys. How many girls are there?", answer: "\\(45\\)" },
        { prompt: "A 40 kg sack holds rice and lentils in the ratio \\(3 : 2\\). How many kg of lentils are there?", answer: "\\(16\\) kg" },
      ],
      pyqExampleId: "624b531e-1003-431a-ab46-22bbf769dc55",
      traps: [
        {
          title: "Answer in the unit asked",
          body: "A 20 kg load split \\(1 : 4\\) has 16 kg in the larger part, which is 16,000 g. If the options are in grams, 16 is not among them.",
        },
        {
          title: "A share of 'the other two together'",
          body: "'A gets \\(\\tfrac 29\\) of what B and C get together' makes A 2 parts out of 11, not 2 out of 9.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-fraction-shares",
      name: "Dividing in a ratio of fractions",
      intuition:
        "A ratio such as \\(\\tfrac 13 : \\tfrac 14 : \\tfrac 16\\) is still a ratio. Clear the fractions first, by multiplying by the LCM of the denominators, then divide as usual. 'A third of the first equals a quarter of the second' says the same thing the other way round.",
      definition:
        "- \\(\\tfrac 1a : \\tfrac 1b : \\tfrac 1c\\): multiply every term by the LCM of \\(a, b, c\\). For example \\(\\tfrac 13 : \\tfrac 14 : \\tfrac 16 = 4 : 3 : 2\\).\n" +
        "- 'A third of A equals a quarter of B' means \\(\\tfrac A3 = \\tfrac B4 = k\\), so \\(A = 3k\\), \\(B = 4k\\) and \\(A : B = 3 : 4\\).\n" +
        "- 'Three times the first equals four times the second' is the equal-multiples case from Combining Ratios.",
      formula: {
        label: "Clearing fractions",
        latex: "\\tfrac 1a : \\tfrac 1b : \\tfrac 1c = \\tfrac La : \\tfrac Lb : \\tfrac Lc \\quad (L = \\text{LCM of } a, b, c)",
      },
      authoredExample: {
        prompt: "Divide ₹1,350 among three people in the ratio \\(\\tfrac 13 : \\tfrac 14 : \\tfrac 16\\).",
        steps: [
          "Multiply by 12: \\(4 : 3 : 2\\), which is 9 parts.",
          "One part is \\(1350 \\div 9 = 150\\).",
          "The shares are \\(4 \\times 150\\), \\(3 \\times 150\\) and \\(2 \\times 150\\).",
        ],
        answer: "₹600, ₹450, ₹300.",
      },
      selfCheckExample: {
        prompt: "Divide 1,540 into two parts so that a third of the first equals a quarter of the second.",
        steps: [
          "\\(\\tfrac A3 = \\tfrac B4 = k\\) gives \\(A = 3k\\) and \\(B = 4k\\).",
          "\\(7k = 1540\\), so \\(k = 220\\).",
        ],
        answer: "660 and 880.",
      },
      practiceSet: [
        { prompt: "Write \\(\\tfrac 12 : \\tfrac 15\\) in whole numbers.", answer: "\\(5 : 2\\)" },
        { prompt: "Write \\(\\tfrac 23 : \\tfrac 34 : \\tfrac 56\\) in whole numbers.", answer: "\\(8 : 9 : 10\\)", method: "Multiply by 12." },
        { prompt: "Divide 72 in the ratio \\(\\tfrac 12 : \\tfrac 13 : \\tfrac 16\\).", answer: "36, 24, 12" },
        { prompt: "\\(4A = 7B\\) and \\(A + B = 110\\). Find \\(A\\).", answer: "\\(70\\)", method: "\\(A : B = 7 : 4\\)." },
      ],
      pyqExampleId: "3897ba32-6999-4c2d-9d1d-de8df7908f10",
      traps: [
        {
          title: "The denominators are not the ratio",
          body: "In \\(\\tfrac 12 : \\tfrac 13\\) the first person gets more, 3 parts to 2. Reading the denominators as \\(2 : 3\\) turns the ratio round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-ratio-conditions",
      name: "Numbers in a ratio with one more condition",
      intuition:
        "Write the numbers as \\(2k, 3k, 4k\\) and turn the condition into one equation in \\(k\\). A sum gives \\(k\\) directly, a sum of squares gives \\(k^2\\), and a product gives \\(k^3\\).",
      definition:
        "- For numbers \\(pk, qk, rk\\): the sum is \\((p + q + r)k\\), the sum of squares \\((p^2 + q^2 + r^2)k^2\\), and the product \\(pqr\\,k^3\\).\n" +
        "- Shares described by differences ('A gets ₹7 more than B'): name the smallest share and build the others from it.\n" +
        "- 'Boys exceed girls by 20% of the total' is an equation: \\(B - G = 0.2(B + G)\\). Solve it for \\(B : G\\) (here \\(3 : 2\\)).",
      formula: {
        label: "Numbers from a ratio",
        latex: "x : y : z = p : q : r \\;\\Rightarrow\\; x = pk,\\ y = qk,\\ z = rk",
      },
      authoredExample: {
        prompt: "Three numbers are in the ratio \\(1 : 3 : 4\\) and the sum of their squares is 416. Find them.",
        steps: [
          "\\((1 + 9 + 16)k^2 = 26k^2 = 416\\), so \\(k^2 = 16\\) and \\(k = 4\\).",
          "The numbers are \\(4\\), \\(12\\) and \\(16\\).",
        ],
        answer: "4, 12, 16.",
      },
      selfCheckExample: {
        prompt: "Three numbers in the ratio \\(2 : 5 : 6\\) have a product of 7,500. Find the largest.",
        steps: [
          "\\(2k \\cdot 5k \\cdot 6k = 60k^3 = 7500\\), so \\(k^3 = 125\\) and \\(k = 5\\).",
          "The largest is \\(6k = 30\\).",
        ],
        answer: "\\(30\\).",
      },
      practiceSet: [
        { prompt: "Two numbers in the ratio \\(3 : 4\\) have a product of 192. Find them.", answer: "12 and 16" },
        { prompt: "Two numbers in the ratio \\(1 : 2\\) have squares adding to 180. Find them.", answer: "6 and 12" },
        { prompt: "Two numbers in the ratio \\(5 : 8\\) differ by 27. Find the larger.", answer: "\\(72\\)" },
        {
          prompt: "₹60 is shared by A, B and C. A gets ₹5 more than B, and B gets ₹5 more than C. Find C's share.",
          answer: "₹15",
        },
      ],
      pyqExampleId: "7bcb7d73-7aba-4a4b-a25b-ddf7b06c3ad1",
      traps: [
        {
          title: "A sum of squares gives k squared",
          body: "If \\(2k, 3k, 4k\\) have squares adding to 116, then \\(29k^2 = 116\\), so \\(k^2 = 4\\) and \\(k = 2\\). Stopping at \\(k = 4\\) doubles every number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-changed-division",
      name: "A changed ratio, or shares with an amount taken off",
      intuition:
        "Two ways of splitting the same total are compared share by share. Work out each person's share both ways; the gain or loss is the difference.",
      definition:
        "- Same total, two ratios: the share under one minus the share under the other.\n" +
        "- If one person's loss is given, write it as \\(\\left(\\dfrac{q}{p + q} - \\dfrac{s}{r + s}\\right)T\\) and solve for \\(T\\).\n" +
        "- 'If each had received ₹10 less, the shares would be \\(2 : 3 : 4\\)': take ₹10 from each first, split what is left, then add the ₹10 back.",
      formula: {
        label: "Gain or loss from a changed ratio",
        latex: "\\text{change} = \\left(\\dfrac{q}{p + q} - \\dfrac{s}{r + s}\\right) T",
      },
      authoredExample: {
        prompt:
          "₹2,100 was to be divided between A and B in the ratio \\(3 : 4\\), but was divided \\(1 : 2\\) by mistake. Who lost, and how much?",
        steps: [
          "Intended: one part is \\(2100 \\div 7 = 300\\), so A 900 and B 1,200.",
          "Actual: one part is \\(2100 \\div 3 = 700\\), so A 700 and B 1,400.",
          "A got ₹200 less than intended.",
        ],
        answer: "A lost ₹200 (and B gained ₹200).",
      },
      selfCheckExample: {
        prompt:
          "₹1,000 is shared by X, Y and Z. If each had received ₹40 less, their shares would be in the ratio \\(2 : 3 : 5\\). Find Z's share.",
        steps: [
          "Take ₹40 from each: \\(1000 - 120 = 880\\) is left.",
          "In \\(2 : 3 : 5\\), one part is 88, so Z would have 440.",
          "Add the ₹40 back.",
        ],
        answer: "₹480.",
      },
      practiceSet: [
        {
          prompt: "₹1,200 should have been split \\(1 : 2\\) between two people but was split equally. How much did the second person lose?",
          answer: "₹200",
        },
        {
          prompt: "₹300 is shared by P and Q. If each had got ₹30 less, the ratio would be \\(1 : 3\\). Find P's share.",
          answer: "₹90",
        },
        {
          prompt: "A sum meant to be split \\(2 : 3\\) is split equally, and the first person gains ₹50. Find the sum.",
          answer: "₹500",
          method: "\\(\\left(\\tfrac 12 - \\tfrac 25\\right)S = \\tfrac{S}{10}\\).",
        },
      ],
      pyqExampleId: "16caffda-f727-4fe6-aea2-c69398783f3d",
      traps: [
        {
          title: "Add the deduction back",
          body: "When shares less ₹10 each are in a given ratio, the ratio describes the reduced shares. Solve for those, then add the ₹10 back before you answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-partnership",
      name: "Partnership: profit in the ratio of capital times time",
      intuition:
        "Partners share profit by how much each put in and for how long. ₹10,000 for 6 months earns the same share as ₹5,000 for 12 months.",
      definition:
        "- Profit shares are in the ratio of **capital × months**: \\(C_1 t_1 : C_2 t_2 : \\dots\\)\n" +
        "- If everyone invests for the same time, the ratio of capitals alone decides.\n" +
        "- A partner who adds or withdraws money: add the pieces. ₹8,000 for 4 months then ₹5,000 for 8 months is \\(32 + 40 = 72\\) (in thousands of rupee-months).\n" +
        "- A partner who joins late invests for fewer months: joining after 3 months of a year means 9 months.",
      formula: {
        label: "Profit ratio",
        latex: "P_1 : P_2 = C_1 t_1 : C_2 t_2",
      },
      authoredExample: {
        prompt:
          "A puts in ₹30,000 for a year. B joins after 4 months with ₹45,000. Out of a year's profit of ₹24,000, how much does B get?",
        steps: [
          "A: \\(30{,}000 \\times 12 = 3{,}60{,}000\\). B: \\(45{,}000 \\times 8 = 3{,}60{,}000\\).",
          "The ratio is \\(1 : 1\\), so the profit is shared equally.",
        ],
        answer: "₹12,000.",
      },
      selfCheckExample: {
        prompt:
          "P and Q start a business with ₹6,000 and ₹8,000. After 6 months P adds ₹3,000. Find the ratio of their profits at the end of the year.",
        steps: [
          "P: \\(6{,}000 \\times 6 + 9{,}000 \\times 6 = 90{,}000\\).",
          "Q: \\(8{,}000 \\times 12 = 96{,}000\\).",
          "\\(90 : 96 = 15 : 16\\).",
        ],
        answer: "\\(15 : 16\\).",
      },
      practiceSet: [
        {
          prompt: "Two partners invest ₹4,000 and ₹6,000 for the same time. The profit is ₹2,500. Find the smaller share.",
          answer: "₹1,000",
        },
        { prompt: "Find the profit ratio for ₹5,000 invested for 12 months against ₹6,000 for 10 months.", answer: "\\(1 : 1\\)" },
        {
          prompt: "A joins after 2 months of a year with ₹12,000. B is in all year with ₹8,000. Find the ratio of A's profit to B's.",
          answer: "\\(5 : 4\\)",
          method: "\\(120 : 96\\).",
        },
      ],
      pyqExampleId: "f40d74a3-ae71-4e4f-9300-2792322dbed4",
      traps: [
        {
          title: "Time counts as much as money",
          body: "When partners stay for different numbers of months, the ratio of capitals alone is wrong. Multiply each capital by its months first.",
        },
      ],
    },
  ],
};
