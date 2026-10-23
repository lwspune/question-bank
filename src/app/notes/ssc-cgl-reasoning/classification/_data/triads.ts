import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_TRIADS_NOTE: SubtopicNote = {
  subtopicName: "Number Triads and Sets",
  title: "Number Triads and Sets",
  oneLineDefinition:
    "Each option is a set of three numbers tied together by one rule: equal steps, a fixed ratio, two numbers made from one, or one number made from the other two.",
  whyItMatters:
    "Twenty-two questions in the bank, 9 EASY, 12 MODERATE and the chapter's only HARD one. Thirteen of them come from the 2024 shifts. A set has more ways to be linked than a pair, so a fixed order of tests saves the most time here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcltr-steps",
      name: "Equal steps, equal ratios and growing gaps in a set",
      intuition:
        "Read a set of three like a short series. The numbers may rise by the same amount, grow by the same multiple, or have gaps that follow their own pattern.",
      definition:
        "- **Equal steps**: the middle number minus the first equals the last minus the middle (11, 17, 23).\n" +
        "- **Equal ratio**: each number is the same multiple of the one before (8, 24, 72 is ×3, ×3).\n" +
        "- **Gaps with a pattern**: write the two gaps and compare them across options (10 then 20 is 'the second gap is double the first').\n" +
        "- **A number and its powers**: \\(n, n^2, n^3\\) (4, 16, 64).\n" +
        "- Test steps first, then ratios, then the gap pattern. These rules use no outside number, so they are the quickest to check.",
      formula: {
        label: "Steps and ratios in a set a, b, c",
        latex: "b - a = c - b \\qquad \\frac{b}{a} = \\frac{c}{b}",
      },
      authoredExample: {
        prompt: "Find the odd set: (a) 8, 24, 72 (b) 5, 20, 80 (c) 7, 21, 63 (d) 6, 18, 54",
        steps: [
          "Steps: (a) 16 then 48. Not equal, so try ratios.",
          "Ratios: (a) ×3, ×3. (c) ×3, ×3. (d) ×3, ×3.",
          "(b) is ×4, ×4. It still has a fixed ratio, so the rule the other three share is the narrower one: a ratio of exactly 3.",
        ],
        answer: "(b) 5, 20, 80",
      },
      selfCheckExample: {
        prompt: "Find the odd set: (a) 11, 17, 23 (b) 30, 38, 46 (c) 52, 61, 69 (d) 9, 21, 33",
        steps: [
          "Steps: (a) 6 and 6. (b) 8 and 8. (d) 12 and 12.",
          "(c) 9 and then 8. The two steps are not equal.",
        ],
        answer: "(c) 52, 61, 69",
      },
      practiceSet: [
        { prompt: "Find the odd set: 3, 9, 27; 4, 16, 64; 6, 36, 216; 5, 25, 120", answer: "5, 25, 120", method: "The rule is \\(n, n^2, n^3\\); \\(5^3 = 125\\)." },
        { prompt: "In the set 12, 20, 36, is the second gap twice the first?", answer: "Yes: 8, then 16" },
        { prompt: "Find the odd set: 40, 31, 22; 75, 64, 53; 58, 49, 40; 90, 82, 75", answer: "90, 82, 75", method: "Its steps are −8 and −7; every other set has two equal steps." },
        { prompt: "What is the common ratio of the set 7, 28, 112?", answer: "4" },
      ],
      pyqExampleId: "73efbbae-ac00-41ce-ae25-f9b64a5defb6",
      traps: [
        {
          title: "Mixing up equal steps and equal ratios",
          body:
            "5, 20, 80 has steps 15 and 60 but ratios 4 and 4. 11, 17, 23 has steps 6 and 6 but no fixed ratio. Test both before you decide which rule the three options share.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcltr-from-one",
      name: "Two numbers of a triad built from one",
      intuition:
        "In many triads one number is the seed and the other two are made from it in two separate ways. The odd triad breaks just one of the two links, so both have to be checked.",
      definition:
        "- Find the seed. It is usually the first number, but sometimes the last (first = \\(c^2 - 1\\) and middle = 5c, where c is the third).\n" +
        "- Find each link on its own: one is often a small change (2a + 1, 3a, 4a − 1) and the other a power (\\(a^2\\), \\(a^3\\), \\(a^3 - 1\\)).\n" +
        "- **Fast route**: check the easier link in all four options first. If it already leaves one option out, check only the harder link on that one, to make sure.\n" +
        "- If the easy link holds in all four, the answer is decided by the harder link.",
      authoredExample: {
        prompt: "Find the odd triad: (a) 3 : 10 : 27 (b) 5 : 16 : 125 (c) 4 : 13 : 64 (d) 6 : 19 : 210",
        steps: [
          "Middle number: \\(3 \\times 3 + 1 = 10\\), \\(3 \\times 5 + 1 = 16\\), \\(3 \\times 4 + 1 = 13\\), \\(3 \\times 6 + 1 = 19\\). This link holds in all four, so it cannot decide.",
          "Last number: \\(3^3 = 27\\), \\(5^3 = 125\\), \\(4^3 = 64\\).",
          "\\(6^3 = 216\\), not 210. (d) breaks the second link.",
        ],
        answer: "(d) 6 : 19 : 210",
      },
      selfCheckExample: {
        prompt: "Find the odd triad: (a) 7 : 49 : 14 (b) 9 : 81 : 18 (c) 12 : 144 : 24 (d) 8 : 64 : 18",
        steps: [
          "Middle number: \\(7^2\\), \\(9^2\\), \\(12^2\\), \\(8^2\\). All four hold.",
          "Last number: \\(2 \\times 7 = 14\\), \\(2 \\times 9 = 18\\), \\(2 \\times 12 = 24\\).",
          "\\(2 \\times 8 = 16\\), not 18.",
        ],
        answer: "(d) 8 : 64 : 18",
      },
      practiceSet: [
        { prompt: "In the triad 6 : 20 : 36, how are the second and third numbers made from the first?", answer: "Second = 3 × first + 2; third = first squared." },
        { prompt: "Find the odd triad: 2 : 6 : 8, 3 : 9 : 27, 4 : 12 : 64, 5 : 15 : 100", answer: "5 : 15 : 100", method: "Middle = 3 × first, last = first cubed; \\(5^3 = 125\\)." },
        { prompt: "In the triad 48 : 35 : 7 the first number is \\(c^2 - 1\\), where c is the third. What rule gives the middle number from c?", answer: "5c", method: "\\(5 \\times 7 = 35\\)." },
        { prompt: "Find the odd triad: 10 : 21 : 100, 7 : 15 : 49, 3 : 7 : 9, 4 : 9 : 15", answer: "4 : 9 : 15", method: "Middle = 2 × first + 1, last = first squared; \\(4^2 = 16\\)." },
      ],
      pyqExampleId: "a7186cc0-3ece-4450-9f1c-e607351bc2de",
      traps: [
        {
          title: "Checking only one link of a triad",
          body:
            "A triad can keep one link and break the other. If the first link holds in every option, the second link decides; skipping it means guessing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcltr-from-two",
      name: "One number of a set made from the other two",
      intuition:
        "Here no single number is the seed. The third number comes from the first two together (their sum, difference or product, then adjusted), or the middle comes from the two ends.",
      definition:
        "- **Order of tests**: sum, difference, product. Then divide the third number by the sum or the difference: if three options give the same whole number k, the rule is k(a + b) or k(a − b).\n" +
        "- Product rules are often adjusted: ab + 5, ab − 5.\n" +
        "- Mixed rules use squares or cubes: \\(a^2 - b\\), \\(a^2 + b^2\\).\n" +
        "- **Middle from the ends**: test first + third against the middle (equal, double, three times) and twice the first plus the third.\n" +
        "- A step that gives a fraction in only one option often marks that option as the odd one, since the setter builds the other three to come out whole.\n" +
        "- Keep the order: \\(a - b\\) and \\(b - a\\) are different rules.",
      formula: {
        label: "Rules linking a set a, b, c",
        latex: "c = k(a + b) \\qquad c = k(a - b) \\qquad c = ab \\pm k \\qquad a + c = k b",
      },
      authoredExample: {
        prompt: "Find the odd set: (a) 6, 4, 32 (b) 9, 11, 70 (c) 5, 7, 18 (d) 8, 10, 56",
        steps: [
          "Sum: 10, 20, 12, 18. Product: 24, 99, 35, 80. Neither matches the third number.",
          "The third number tracks the square of the first: 36 against 32, 81 against 70, 25 against 18, 64 against 56.",
          "What is taken away: 4, 11, 7, 8. In (a), (b) and (c) that is the second number, so the rule is \\(a^2 - b\\).",
          "(d): \\(64 - 10 = 54\\), not 56.",
        ],
        answer: "(d) 8, 10, 56",
      },
      selfCheckExample: {
        prompt: "Find the odd set: (a) 15, 8, 49 (b) 22, 13, 63 (c) 30, 21, 72 (d) 17, 5, 84",
        steps: [
          "Sums (23, 35, 51, 22) and products do not fit. Try the difference: 7, 9, 9, 12.",
          "Third ÷ difference: \\(49 \\div 7 = 7\\), \\(63 \\div 9 = 7\\), \\(84 \\div 12 = 7\\). The rule is 7 × (a − b).",
          "(c): \\(7 \\times 9 = 63\\), not 72.",
        ],
        answer: "(c) 30, 21, 72",
      },
      practiceSet: [
        { prompt: "Find the odd set: 4, 5, 21; 6, 3, 19; 7, 2, 15; 8, 4, 34", answer: "8, 4, 34", method: "The rule is ab + 1, which gives 33." },
        { prompt: "In the set 45, 18, 27, how is the first number made from the other two?", answer: "It is their sum: \\(18 + 27 = 45\\)." },
        { prompt: "In the set 30, 19, 8, which rule holds: middle = first ÷ 2 + 2, or first + third = 2 × middle?", answer: "First + third = 2 × middle", method: "\\(30 + 8 = 38 = 2 \\times 19\\), while \\(30 \\div 2 + 2 = 17\\)." },
        { prompt: "Find the odd set: 2, 3, 13; 3, 4, 25; 1, 5, 26; 4, 2, 21", answer: "4, 2, 21", method: "The rule is \\(a^2 + b^2\\), which gives 20." },
      ],
      pyqExampleId: "7af48a9e-215d-494a-b276-7172da8f83ce",
      traps: [
        {
          title: "Taking a rule that only two options obey",
          body:
            "In 4, 5, 9 and 6, 3, 9 the sum works, but if the other two options fail it, the sum is not the rule. A rule must hold in exactly three options.",
        },
        {
          title: "Throwing out an option because a step gives a fraction",
          body:
            "When a rule divides by 3 and only one option is not a multiple of 3, that option is usually the answer, not a sign the rule is wrong. Check that the other three come out whole.",
        },
      ],
    },
  ],
};
