import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_SETS_NOTE: SubtopicNote = {
  subtopicName: "Number Set Analogy",
  title: "Number Set Analogy",
  oneLineDefinition:
    "A number set gives two or three groups of numbers built by the same rule. Find the rule inside each given group, then pick the option group (or the missing number) that follows it.",
  whyItMatters:
    "One hundred and eleven questions in the bank, sixty-five EASY, forty-one MODERATE and five HARD, all from the 2023 and 2024 shifts. This is the largest page of the chapter, and the HARD rows are here: the rule can join any two of the three numbers, so a fixed order of trials saves the most time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscranns-steps",
      name: "Sets that climb by fixed steps",
      intuition:
        "Before looking for a sum or a product, look along the set. Many sets simply climb or fall by the same steps, or each number is made from the one before it by the same little rule.",
      definition:
        "- Write the gaps inside each set: (15, 23, 31) climbs +8, +8.\n" +
        "- The gaps may differ but must match across the sets: +4 then +6 in every set.\n" +
        "- Or each number is made from the one before: double and add 1, multiply by 3 then by 2.\n" +
        "- **Fast route:** if the steps are equal, the middle number is the average of the outer two. Test 'middle \\(\\times\\) 2 = first + third' on each option without working out any steps.",
      formula: {
        label: "Equal steps",
        latex: "2b = a + c",
        symbols: [{ symbol: "a, b, c", meaning: "the three numbers of the set, in order" }],
      },
      authoredExample: {
        prompt: "(14, 31, 48) and (52, 69, 86). Which set is like them? (a) (20, 37, 55) (b) (33, 50, 67) (c) (41, 58, 76)",
        steps: [
          "Both sets climb by 17 and then 17 again.",
          "(a): \\(37 + 17 = 54\\), not 55. (c): \\(58 + 17 = 75\\), not 76.",
          "(b): \\(33 + 17 = 50\\) and \\(50 + 17 = 67\\). It fits.",
        ],
        answer: "(b) (33, 50, 67)",
      },
      selfCheckExample: {
        prompt: "(6, 13, 27) and (10, 21, 43) follow one rule. Find the missing number in (9, 19, ?).",
        steps: [
          "The gaps (7, 14 and 11, 22) are not equal, but each number is double the one before plus 1: \\(6 \\times 2 + 1 = 13\\), \\(13 \\times 2 + 1 = 27\\); \\(10 \\times 2 + 1 = 21\\), \\(21 \\times 2 + 1 = 43\\).",
          "\\(19 \\times 2 + 1 = 39\\).",
        ],
        answer: "39",
      },
      practiceSet: [
        { prompt: "(7, 12, 17) and (30, 35, 40) follow one rule. Find the missing number in (21, 26, ?).", answer: "31", method: "Add 5 each time." },
        { prompt: "(4, 12, 36) and (5, 15, 45) follow one rule. Find the missing number in (7, 21, ?).", answer: "63", method: "Multiply by 3 each time." },
        { prompt: "(50, 41, 32) and (90, 81, 72) fall by 9 each time. Does (64, 55, 47) follow the same rule?", answer: "No", method: "\\(55 - 9 = 46\\), not 47." },
        { prompt: "(8, 12, 18) and (20, 24, 30) follow one rule. Find the missing number in (11, 15, ?).", answer: "21", method: "Add 4, then add 6." },
      ],
      pyqExampleId: "4a5d9afc-6d6d-4338-9147-262615fb363d",
      traps: [
        {
          title: "Checking only the first step",
          body:
            "An option can match the first gap and break the second. SSC builds most wrong options this way, so check both gaps of every option you keep.",
        },
        {
          title: "Missing a falling set",
          body:
            "A set that drops by 22 each time is still a fixed-step set. Write the gaps with their signs, or the pattern looks random.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranns-sums",
      name: "One number from a sum or difference of the others",
      intuition:
        "In most sets one number is built from the other two. First find which number is the result: usually the largest, but it may stand in the middle. Then try sums and differences of the other two in a fixed order.",
      definition:
        "- Find the **result**: the number the rule makes. It is usually the largest; check the middle place too.\n" +
        "- Try, in order: a + b, a \\(-\\) b, 2a + b, a + 2b, then the same with a constant added (a + b + 10) or a multiplier outside (3 \\(\\times\\) (a \\(-\\) b)).\n" +
        "- Test the rule on **both** given sets before you look at the options.\n" +
        "- **'NOT related' questions:** three options follow the rule and one breaks it; the one that breaks it is the answer.\n" +
        "- **Missing number questions:** use the rule on the incomplete set.",
      formula: {
        label: "Linear rule inside a set",
        latex: "c = p\\,a + q\\,b + r",
        symbols: [
          { symbol: "a, b", meaning: "the two numbers the rule uses" },
          { symbol: "p, q, r", meaning: "small whole numbers, the same for every set" },
        ],
      },
      authoredExample: {
        prompt: "(17, 9, 52) and (12, 20, 64). Which set is like them? (a) (15, 6, 41) (b) (10, 14, 48) (c) (8, 22, 62)",
        steps: [
          "\\(17 + 9 = 26\\) and \\(52 = 2 \\times 26\\); \\(12 + 20 = 32\\) and \\(64 = 2 \\times 32\\). The third number is twice the sum of the first two.",
          "(a): \\(2 \\times 21 = 42\\), not 41. (c): \\(2 \\times 30 = 60\\), not 62.",
          "(b): \\(2 \\times 24 = 48\\). It fits.",
        ],
        answer: "(b) (10, 14, 48)",
      },
      selfCheckExample: {
        prompt: "(25, 9, 41) and (32, 14, 50) follow one rule. Find the missing number in (18, 7, ?).",
        steps: [
          "The sum fails (\\(25 + 9 = 34\\)). Twice the first less the second: \\(50 - 9 = 41\\) and \\(64 - 14 = 50\\). It fits both.",
          "\\(2 \\times 18 - 7 = 29\\).",
        ],
        answer: "29",
      },
      practiceSet: [
        { prompt: "(11, 8, 19) and (23, 15, 38) follow one rule. Find the missing number in (16, 9, ?).", answer: "25", method: "The third is the sum of the first two." },
        { prompt: "(40, 15, 75) and (32, 18, 42) follow one rule. Find the missing number in (29, 13, ?).", answer: "48", method: "Three times the difference: \\(3 \\times 16\\)." },
        { prompt: "(6, 4, 24) and (9, 5, 33) follow one rule. Find the missing number in (7, 8, ?).", answer: "38", method: "\\(2a + 3b\\): \\(14 + 24\\)." },
        { prompt: "Which set is NOT like (12, 5, 17) and (20, 9, 29)? (a) (14, 6, 20) (b) (8, 7, 15) (c) (13, 4, 18)", answer: "(c) (13, 4, 18)", method: "\\(13 + 4 = 17\\), not 18." },
      ],
      pyqExampleId: "f105bce3-da55-468f-8a53-309fb4db16f8",
      traps: [
        {
          title: "Looking for the result only in the last place",
          body:
            "In (6, 30, 4) the middle number is \\(3 \\times (6 + 4)\\). A search that tries only the third place misses it; check the largest number wherever it stands.",
        },
        {
          title: "Swapping the first two numbers",
          body:
            "For a rule such as 2a + b or a \\(-\\) b, the order of a and b matters: (5, 9) and (9, 5) give different results. Keep the positions the given sets use.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscranns-products",
      name: "One number from a product or quotient of the others",
      intuition:
        "When the result is far bigger than the other two numbers, sums cannot reach it: try their product. When it is smaller, try a quotient. A fixed multiplier or a small constant on top is common.",
      definition:
        "- Result much bigger: try a \\(\\times\\) b, then k \\(\\times\\) a \\(\\times\\) b, a \\(\\times\\) b + k, a \\(\\times\\) b \\(-\\) k.\n" +
        "- Result smaller: try a \\(\\div\\) b, (a \\(\\div\\) b) \\(\\times\\) k, a \\(\\div\\) b + k.\n" +
        "- If the result stands in the middle, the product is of the first and third numbers.\n" +
        "- **Fast route:** divide the result by a \\(\\times\\) b in each given set. If both give the same k, the rule is k \\(\\times\\) a \\(\\times\\) b, and you can test the options by the same division.",
      formula: {
        label: "Product rule",
        latex: "c = k \\times a \\times b",
        symbols: [{ symbol: "k", meaning: "the same multiplier for every set (often 1, 2, 3, 4 or 5)" }],
      },
      authoredExample: {
        prompt: "(6, 7, 210) and (4, 9, 180). Which set is like them? (a) (5, 8, 200) (b) (3, 11, 160) (c) (7, 6, 252)",
        steps: [
          "\\(210 \\div (6 \\times 7) = 5\\) and \\(180 \\div (4 \\times 9) = 5\\). The rule is 5 times the product.",
          "(a): \\(5 \\times 40 = 200\\). It fits.",
          "(b): \\(5 \\times 33 = 165\\), not 160. (c): \\(5 \\times 42 = 210\\), not 252.",
        ],
        answer: "(a) (5, 8, 200)",
      },
      selfCheckExample: {
        prompt: "(72, 8, 12) and (40, 5, 11) follow one rule. Find the missing number in (63, 7, ?).",
        steps: [
          "\\(72 \\div 8 = 9\\) and \\(9 + 3 = 12\\); \\(40 \\div 5 = 8\\) and \\(8 + 3 = 11\\). The rule is the quotient plus 3.",
          "\\(63 \\div 7 + 3 = 12\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "(3, 8, 24) and (5, 6, 30) follow one rule. Find the missing number in (7, 9, ?).", answer: "63", method: "The product." },
        { prompt: "(4, 5, 23) and (6, 3, 21) follow one rule. Find the missing number in (8, 2, ?).", answer: "19", method: "The product plus 3." },
        { prompt: "(84, 7, 36) and (54, 6, 27) follow one rule. Find the missing number in (40, 5, ?).", answer: "24", method: "The quotient times 3." },
        { prompt: "In (2, 28, 7) and (5, 60, 6) the middle number is twice the product of the outer two. Find the missing number in (3, ?, 8).", answer: "48" },
      ],
      pyqExampleId: "d060b402-11fe-45ff-90bc-a74206ce8953",
      traps: [
        {
          title: "Multiplying the wrong two numbers",
          body:
            "When the big number sits in the middle, the rule multiplies the first and the third. Multiplying the first two gives a rule that fits neither given set.",
        },
        {
          title: "Keeping an option whose quotient is not whole",
          body:
            "If the rule divides and an option's division leaves a remainder, that option fails at once. Use this to strike options out before doing any other working.",
        },
      ],
    },
  ],
};
