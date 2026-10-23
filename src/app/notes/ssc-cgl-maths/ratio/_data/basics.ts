import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Ratio Basics",
  title: "Ratio Basics",
  oneLineDefinition:
    "A ratio a : b says the two quantities are a parts and b parts of one common unit, so every ratio question comes down to finding that unit once.",
  whyItMatters:
    "Thirty-four questions in the bank, thirty-one of them EASY: twelve turn fractions, percentages or equal parts into a ratio, eleven share a quantity, four count coins and seven find an expression's value from a ratio. Every later page in this chapter uses the ratio unit taught here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrabs-convert",
      name: "Turning fractions, percentages and equal parts into a ratio",
      intuition:
        "A ratio does not change when both terms are multiplied or divided by the same number, just as a recipe for 4 tastes the same as the same recipe doubled for 8. So any messy ratio can be scaled until its terms are small whole numbers.",
      definition:
        "- **Lowest terms:** divide every term by their highest common factor. 18 : 24 : 30 is 3 : 4 : 5.\n" +
        "- **Fractions:** multiply every term by the LCM of the denominators. \\(\\frac{1}{2} : \\frac{2}{3}\\) times 6 is 3 : 4.\n" +
        "- **Decimals:** multiply by 10 or 100 until the decimals go. 0.6 : 1.5 is 6 : 15 = 2 : 5.\n" +
        "- **Comparing two ratios:** write each as a fraction and cross-multiply, or bring them to a common denominator.\n" +
        "- **Each term changes by its own percentage:** multiply each term by its own factor (a 15% rise is \\(\\times 1.15\\)), then clear the decimals.\n" +
        "- **Equal parts:** if \\(pA = qB = rC\\), then \\(A : B : C = \\frac{1}{p} : \\frac{1}{q} : \\frac{1}{r}\\). For two quantities this is the fast route \\(A : B = q : p\\): the bigger multiplier sits with the smaller quantity.",
      formula: {
        label: "Scaling and equal parts",
        latex:
          "a : b = ka : kb \\qquad pA = qB \\Rightarrow A : B = q : p \\qquad pA = qB = rC \\Rightarrow A : B : C = \\frac{1}{p} : \\frac{1}{q} : \\frac{1}{r}",
        symbols: [
          { symbol: "k", meaning: "any non-zero number" },
          { symbol: "p, q, r", meaning: "the multipliers in the equal statement" },
        ],
      },
      authoredExample: {
        prompt: "If 30% of P = 0.75 of Q = \\(\\frac{2}{5}\\) of R, find P : Q : R.",
        steps: [
          "Full method: let \\(0.3P = 0.75Q = 0.4R = k\\). Then \\(P = \\frac{10k}{3}\\), \\(Q = \\frac{4k}{3}\\) and \\(R = \\frac{5k}{2}\\).",
          "Multiply all three by \\(\\frac{6}{k}\\) to clear the fractions: P : Q : R = 20 : 8 : 15.",
          "Fast route: the ratio is the reciprocals \\(\\frac{10}{3} : \\frac{4}{3} : \\frac{5}{2}\\), and times 6 that is 20 : 8 : 15.",
          "Check: \\(0.3 \\times 20 = 6\\), \\(0.75 \\times 8 = 6\\) and \\(0.4 \\times 15 = 6\\).",
        ],
        answer: "20 : 8 : 15",
      },
      selfCheckExample: {
        prompt: "Write \\(\\frac{2}{3} : \\frac{3}{4} : \\frac{5}{6}\\) as a ratio of whole numbers.",
        steps: [
          "The LCM of 3, 4 and 6 is 12.",
          "\\(\\frac{2}{3} \\times 12 = 8\\), \\(\\frac{3}{4} \\times 12 = 9\\), \\(\\frac{5}{6} \\times 12 = 10\\).",
        ],
        answer: "8 : 9 : 10",
      },
      practiceSet: [
        { prompt: "Write 0.4 : 1.2 in its lowest terms.", answer: "1 : 3" },
        {
          prompt: "Two prices are in the ratio 5 : 4. The first rises by 20% and the second by 50%. What is the new ratio?",
          answer: "1 : 1",
          method: "\\(5 \\times 1.2 = 6\\) and \\(4 \\times 1.5 = 6\\).",
        },
        { prompt: "If 3A = 5B, what is A : B?", answer: "5 : 3" },
        {
          prompt: "Which ratio is greater, 5 : 7 or 7 : 10?",
          answer: "5 : 7",
          method: "Cross-multiply: \\(5 \\times 10 = 50\\) is more than \\(7 \\times 7 = 49\\).",
        },
      ],
      pyqExampleId: "b04996b8-f599-48f4-90fa-8c9b56432983",
      traps: [
        {
          title: "Putting the multipliers straight into the ratio",
          body:
            "From 2A = 3B the ratio A : B is 3 : 2, not 2 : 3. A quantity multiplied by a bigger number must itself be smaller to give the same product.",
        },
        {
          title: "Adding the percentage to the ratio term",
          body:
            "Terms 6 and 4 raised by 20% and 40% become \\(6 \\times 1.2 = 7.2\\) and \\(4 \\times 1.4 = 5.6\\). Writing 26 : 44 or 6.2 : 4.4 adds the percentage instead of multiplying by it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrabs-share",
      name: "Sharing a quantity in a ratio with the ratio unit",
      intuition:
        "In a ratio 3 : 5 : 7, the three amounts are 3, 5 and 7 copies of one hidden amount, the ratio unit. Any single fact about the amounts (their total, one share, or a gap between two shares) tells you that unit, and then every share follows.",
      definition:
        "- Write the amounts as \\(ak, bk, ck\\), where \\(k\\) is one part.\n" +
        "- **Total given:** \\(k = \\frac{\\text{total}}{a + b + c}\\).\n" +
        "- **One share given:** \\(k = \\frac{\\text{that share}}{\\text{its term}}\\).\n" +
        "- **A difference given:** \\(k = \\frac{\\text{difference}}{\\text{difference of the terms}}\\).\n" +
        "- **Part to whole:** boys : all students = 7 : 17 means boys : girls = 7 : 10.\n" +
        "- Fast route: a share is its fraction of the total, \\(\\frac{a}{a + b + c} \\times \\text{total}\\), and a gap between two shares is \\(\\frac{c - a}{a + b + c} \\times \\text{total}\\).",
      formula: {
        label: "Share and ratio unit",
        latex: "\\text{share of A} = \\frac{a}{a + b + c} \\times \\text{total} \\qquad k = \\frac{\\text{difference}}{c - a}",
        symbols: [
          { symbol: "a, b, c", meaning: "the terms of the ratio" },
          { symbol: "k", meaning: "the ratio unit, one part" },
        ],
      },
      authoredExample: {
        prompt: "₹4,500 is shared among P, Q and R in the ratio 3 : 5 : 7. How much does R get, and how much more does R get than P?",
        steps: [
          "Total parts \\(= 3 + 5 + 7 = 15\\), so one part \\(= \\frac{4500}{15} = 300\\).",
          "R gets \\(7 \\times 300 = 2100\\) rupees.",
          "R minus P is \\(7 - 3 = 4\\) parts \\(= 1200\\) rupees.",
          "Fast route for the gap: \\(\\frac{4}{15} \\times 4500 = 1200\\).",
        ],
        answer: "R gets ₹2,100, which is ₹1,200 more than P",
      },
      selfCheckExample: {
        prompt: "Two numbers are in the ratio 4 : 9, and the larger is 35 more than the smaller. What is the smaller number?",
        steps: [
          "The gap is \\(9 - 4 = 5\\) parts, so one part \\(= \\frac{35}{5} = 7\\).",
          "Smaller \\(= 4 \\times 7 = 28\\). Check: the larger is 63, and \\(63 - 28 = 35\\).",
        ],
        answer: "28",
      },
      practiceSet: [
        { prompt: "A rope 72 m long is cut in the ratio 1 : 3 : 5. How long is the longest piece?", answer: "40 m" },
        {
          prompt: "In a class, girls : all students = 5 : 12, and there are 35 girls. How many boys are there?",
          answer: "49",
          method: "Boys are \\(12 - 5 = 7\\) parts and one part is 7.",
        },
        { prompt: "Three shares are in the ratio 2 : 3 : 6, and the middle share is ₹210. What is the total?", answer: "₹770" },
        { prompt: "₹1,800 is divided between A and B in the ratio 7 : 5. What is A's share?", answer: "₹1,050" },
      ],
      pyqExampleId: "9c30d8f3-1305-4754-8554-4a1224bf26ef",
      traps: [
        {
          title: "Dividing a gap by the total parts",
          body:
            "If two numbers in the ratio 4 : 9 differ by 35, the 35 is the gap of 5 parts. Dividing it by 13, the total of the terms, gives a wrong unit.",
        },
        {
          title: "Reading a part-to-whole ratio as part to part",
          body:
            "Boys : total = 7 : 17 does not mean boys : girls = 7 : 17. The girls are the other 10 parts of the 17.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrabs-coins",
      name: "Coins in a ratio: number of coins against their value",
      intuition:
        "A ratio of coins counts coins, not rupees. Ten ₹5 coins and ten ₹1 coins are equal in number but very unequal in money, so the count ratio must be turned into money before it meets the total.",
      definition:
        "- If the coins number \\(ak, bk, ck\\) and are worth \\(v_1, v_2, v_3\\) rupees each, their value is \\(k(av_1 + bv_2 + cv_3)\\).\n" +
        "- Set that value equal to the total in the bag to find \\(k\\), then the number of each coin.\n" +
        "- Write paise as rupees: 50 p is ₹0.50, 25 p is ₹0.25, 20 p is ₹0.20.\n" +
        "- The ratio of the VALUES is the count term times the coin value: ₹10 and ₹5 coins in the number ratio 1 : 4 have values in the ratio 10 : 20 = 1 : 2.\n" +
        "- Option check: the counts must be whole numbers in the given ratio, which removes most options at sight.",
      formula: {
        label: "Value of coins in a ratio",
        latex: "\\text{total value} = k(av_1 + bv_2 + cv_3)",
        symbols: [
          { symbol: "a, b, c", meaning: "the ratio of the NUMBERS of coins" },
          { symbol: "v_1, v_2, v_3", meaning: "the value of one coin of each kind, in rupees" },
        ],
      },
      authoredExample: {
        prompt: "A purse has ₹1, ₹2 and ₹5 coins in the ratio 4 : 3 : 2. The total is ₹240. How many ₹2 coins are there?",
        steps: [
          "One set of \\(4 + 3 + 2\\) coins is worth \\(4 \\times 1 + 3 \\times 2 + 2 \\times 5 = 20\\) rupees.",
          "So \\(20k = 240\\) and \\(k = 12\\).",
          "₹2 coins \\(= 3 \\times 12 = 36\\). Check: \\(48 + 72 + 120 = 240\\).",
        ],
        answer: "36",
      },
      selfCheckExample: {
        prompt: "A box holds 50 p and ₹1 coins in the ratio 3 : 2. The coins are worth ₹56 in all. How many coins are in the box?",
        steps: [
          "One set is worth \\(3 \\times 0.5 + 2 \\times 1 = 3.5\\) rupees, so \\(k = \\frac{56}{3.5} = 16\\).",
          "Coins \\(= 5k = 80\\). Check: 48 coins of 50 p are ₹24 and 32 coins of ₹1 are ₹32.",
        ],
        answer: "80",
      },
      practiceSet: [
        { prompt: "₹10 and ₹5 coins are in the number ratio 1 : 4. What is the ratio of their values?", answer: "1 : 2" },
        { prompt: "The ₹2 coins and ₹1 coins in a bag are worth the same amount. What is the ratio of the number of ₹2 coins to ₹1 coins?", answer: "1 : 2" },
        { prompt: "₹5 and ₹2 coins are in the number ratio 2 : 5 and are worth ₹120 together. How many ₹5 coins are there?", answer: "12" },
      ],
      pyqExampleId: "c58cb235-0eab-48bb-b411-865dfe1654ed",
      traps: [
        {
          title: "Sharing the money in the coin ratio",
          body:
            "If coins are in the number ratio 2 : 3 : 5, the rupees are not split 2 : 3 : 5. Multiply each count term by its coin value first; only then does the total fix the unit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrabs-expression",
      name: "Value of an expression when a ratio is given",
      intuition:
        "If a : b is fixed, then a and b are the same multiple of two known numbers. In an expression where every term has the same power, that multiple cancels from top and bottom, so you may simply put the ratio terms in.",
      definition:
        "- **Substitute:** if a : b = m : n, put a = m and b = n in any expression whose terms all have the same power, such as \\(\\frac{6a + 2b}{6a - 2b}\\) or \\(\\frac{a^3 + b^3}{a^3 - b^3}\\).\n" +
        "- Safe only when the powers match. \\(\\frac{a^2 + b}{a}\\) is NOT fixed by a : b, because the multiple does not cancel.\n" +
        "- **Working backwards:** cross-multiply the given equation and collect terms. From \\(\\frac{x - 2y}{x + 2y} = \\frac{1}{3}\\): \\(3x - 6y = x + 2y\\), so x : y = 4 : 1.\n" +
        "- **Componendo and dividendo:** if \\(\\frac{x + y}{x - y} = \\frac{p}{q}\\), then \\(\\frac{x}{y} = \\frac{p + q}{p - q}\\).\n" +
        "- **Equal ratios add:** if a : b = c : d = e : f = m : n, then (pa + qc + re) : (pb + qd + rf) = m : n for any p, q, r.",
      formula: {
        label: "Rules for given ratios",
        latex:
          "\\frac{x + y}{x - y} = \\frac{p}{q} \\Rightarrow \\frac{x}{y} = \\frac{p + q}{p - q} \\qquad \\frac{a}{b} = \\frac{c}{d} = k \\Rightarrow \\frac{pa + qc}{pb + qd} = k",
      },
      authoredExample: {
        prompt: "If m : n = 3 : 2, find \\((4m - n) : (2m + 3n)\\).",
        steps: [
          "Every term has power 1, so put m = 3 and n = 2.",
          "\\(4m - n = 12 - 2 = 10\\) and \\(2m + 3n = 6 + 6 = 12\\).",
          "\\(10 : 12 = 5 : 6\\). Check with m = 6, n = 4: \\(20 : 24 = 5 : 6\\).",
        ],
        answer: "5 : 6",
      },
      selfCheckExample: {
        prompt: "If \\((x + y) : (x - y) = 7 : 3\\), find x : y.",
        steps: [
          "Componendo and dividendo: \\(\\frac{x}{y} = \\frac{7 + 3}{7 - 3} = \\frac{10}{4}\\).",
          "So x : y = 5 : 2. Check: \\((5 + 2) : (5 - 2) = 7 : 3\\).",
        ],
        answer: "5 : 2",
      },
      practiceSet: [
        { prompt: "If p : q = 3 : 4, find (2p + q) : (p + 2q).", answer: "10 : 11" },
        {
          prompt: "If \\((a + 2b) : (a - 2b) = 5 : 3\\), find a : b.",
          answer: "8 : 1",
          method: "Cross-multiply: \\(3a + 6b = 5a - 10b\\), so \\(2a = 16b\\).",
        },
        { prompt: "If a : b = 2 : 1, find \\((a^2 + b^2) : (a^2 - b^2)\\).", answer: "5 : 3" },
        { prompt: "If a : b = c : d = 3 : 4, find (a + c) : (b + d).", answer: "3 : 4" },
      ],
      pyqExampleId: "73ddb518-f95f-40ee-b2a2-a91f7a490f44",
      traps: [
        {
          title: "Substituting when the powers differ",
          body:
            "a : b = 1 : 2 fixes \\(\\frac{a + b}{a - b}\\), but not \\(\\frac{a^2 + b}{a}\\): with a = 1, b = 2 it is 3, and with a = 2, b = 4 it is 4. Substitution is safe only when every term has the same power.",
        },
        {
          title: "Stopping at the given ratio",
          body:
            "From \\((x + y) : (x - y) = 7 : 3\\), the ratio x : y is \\((7 + 3) : (7 - 3) = 5 : 2\\). The given ratio is about \\(x + y\\) and \\(x - y\\), not about x and y.",
        },
      ],
    },
  ],
};
