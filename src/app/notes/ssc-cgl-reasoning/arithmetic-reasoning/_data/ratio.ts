import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_RATIO_NOTE: SubtopicNote = {
  subtopicName: "Ratio and Mixtures",
  title: "Ratio and Mixtures",
  oneLineDefinition:
    "A ratio splits a total into equal parts; find the size of one part, and in a mixture keep fixed the ingredient that is not being added.",
  whyItMatters:
    "Ten questions in the bank, eight EASY and two MODERATE, all from the 2025 shifts. Three split a total in a ratio, two chain two ratios or share a profit, and five add water or milk to a mixture to reach a new ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrarra-split",
      name: "Splitting a total in a ratio",
      intuition:
        "A ratio of 3 : 5 means the total is cut into 8 equal parts, 3 for one and 5 for the other. Once you know the size of one part, every number in the question follows.",
      definition:
        "- **Ratio a : b with total T:** one part \\(= T \\div (a + b)\\). The numbers are \\(a\\) parts and \\(b\\) parts.\n" +
        "- **Difference given instead:** one part \\(= \\) difference \\(\\div (b - a)\\).\n" +
        "- **One number given:** one part \\(=\\) that number divided by its own term of the ratio.\n" +
        "- **Option elimination:** the right pair must add up to the total AND be in the ratio. SSC builds wrong options that add up correctly, so check the ratio too. A quick ratio check: both numbers must be multiples of the same part.",
      formula: {
        label: "Size of one part",
        latex: "\\text{One part} = \\frac{T}{a + b} \\qquad \\text{One part} = \\frac{\\text{Difference}}{b - a}",
        symbols: [
          { symbol: "a : b", meaning: "the ratio" },
          { symbol: "T", meaning: "the total" },
        ],
      },
      authoredExample: {
        prompt: "Two numbers are in the ratio 5 : 8 and their sum is 195. Find the numbers.",
        steps: [
          "\\(5 + 8 = 13\\) parts make 195, so one part is \\(195 \\div 13 = 15\\).",
          "The numbers are \\(5 \\times 15 = 75\\) and \\(8 \\times 15 = 120\\).",
          "Check: \\(75 + 120 = 195\\), and dividing both by 15 gives 5 : 8.",
        ],
        answer: "75 and 120",
      },
      selfCheckExample: {
        prompt: "Two numbers are in the ratio 3 : 7 and their difference is 48. What is the larger number?",
        steps: [
          "\\(7 - 3 = 4\\) parts make 48, so one part is 12.",
          "Larger \\(= 7 \\times 12 = 84\\). Check: the smaller is 36, and \\(84 - 36 = 48\\).",
        ],
        answer: "84",
      },
      practiceSet: [
        { prompt: "Divide ₹560 in the ratio 3 : 5.", answer: "₹210 and ₹350" },
        { prompt: "Two numbers in the ratio 2 : 3 add up to 85. What is the smaller number?", answer: "34" },
        { prompt: "The ratio of boys to girls in a class is 4 : 5, and there are 36 boys. How many girls are there?", answer: "45" },
        {
          prompt: "Which pair is in the ratio 4 : 9 and adds up to 130: 40 and 90, or 50 and 80?",
          answer: "40 and 90",
          method: "Both pairs add to 130, but 50 : 80 is 5 : 8.",
        },
      ],
      pyqExampleId: "b391f15a-7867-42f5-8dc0-2aaf5ca54a48",
      traps: [
        {
          title: "Dividing the total by one term",
          body:
            "For a ratio of 3 : 5 and a total of 96, one part is \\(96 \\div 8 = 12\\), not \\(96 \\div 3\\) or \\(96 \\div 5\\). Divide by the sum of the terms.",
        },
        {
          title: "Checking only the sum",
          body:
            "Wrong options are often built to add up to the total. A pair that adds up correctly but is not in the ratio is still wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarra-chain",
      name: "Chained ratios and profit shares",
      intuition:
        "Two ratios that share a middle term can be joined into one, but only after the middle term is made the same in both. Partners share profit in the ratio of what each put in and for how long.",
      definition:
        "- **A : B and B : C:** multiply each ratio so that B is the same number in both, then read A : B : C. Or multiply fractions: \\(\\frac{A}{C} = \\frac{A}{B} \\times \\frac{B}{C}\\).\n" +
        "- **Partnership:** profit is shared in the ratio of capital \\(\\times\\) time for each partner.\n" +
        "- If every partner invests for the same time, the ratio of capitals alone decides the shares.\n" +
        "- Once the ratio is known, one partner's share gives the size of one part, as in any ratio split.",
      formula: {
        label: "Joining ratios and sharing profit",
        latex: "\\frac{A}{C} = \\frac{A}{B} \\times \\frac{B}{C} \\qquad \\text{Share} \\propto \\text{Capital} \\times \\text{Time}",
      },
      authoredExample: {
        prompt: "If A : B = 3 : 4 and B : C = 6 : 7, find A : B : C.",
        steps: [
          "B is 4 in the first ratio and 6 in the second. The LCM of 4 and 6 is 12.",
          "A : B \\(= 9 : 12\\) and B : C \\(= 12 : 14\\).",
          "So A : B : C \\(= 9 : 12 : 14\\). Check: \\(\\frac{3}{4} \\times \\frac{6}{7} = \\frac{18}{28} = \\frac{9}{14}\\), which matches A : C.",
        ],
        answer: "9 : 12 : 14",
      },
      selfCheckExample: {
        prompt: "P invests ₹15,000 for 4 months and Q invests ₹10,000 for 9 months. The total profit is ₹4,800. What is Q's share?",
        steps: [
          "Capital \\(\\times\\) time: P \\(= 60{,}000\\), Q \\(= 90{,}000\\), a ratio of 2 : 3.",
          "Q's share \\(= \\frac{3}{5} \\times 4800 = 2880\\).",
        ],
        answer: "₹2,880",
      },
      practiceSet: [
        { prompt: "If X : Y = 5 : 6 and Y : Z = 3 : 2, find X : Z.", answer: "5 : 4", method: "\\(\\frac{5}{6} \\times \\frac{3}{2} = \\frac{5}{4}\\)." },
        { prompt: "A and B invest ₹8,000 and ₹12,000 for the same time. In what ratio do they share the profit?", answer: "2 : 3" },
        { prompt: "If A : B = 2 : 5 and B : C = 5 : 3, find A : C.", answer: "2 : 3" },
        {
          prompt: "M invests ₹5,000 for 6 months and N invests ₹6,000 for 5 months. In what ratio do they share the profit?",
          answer: "1 : 1",
          method: "Both make 30,000.",
        },
      ],
      pyqExampleId: "d1424465-8d2d-4cde-bf76-25fe66c39388",
      traps: [
        {
          title: "Joining ratios without matching the middle term",
          body:
            "A : B = 2 : 3 and B : C = 4 : 5 do not give A : C = 2 : 5. Make B equal first (12 in both): 8 : 12 : 15, so A : C = 8 : 15.",
        },
        {
          title: "Ignoring time in a partnership",
          body:
            "When partners invest for different lengths of time, share the profit by capital times time. The capitals alone decide only when the times are equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarra-mixture",
      name: "Adding to a mixture",
      intuition:
        "When you pour water into a mixture, the other ingredient does not change. Hold that fixed amount steady, scale the new ratio to it, and the amount to add is the gap.",
      definition:
        "- **Step 1:** split the mixture into its two parts using the ratio.\n" +
        "- **Step 2:** the part you do not add stays the same. Use the new ratio to find what the added part must become.\n" +
        "- **Step 3:** amount to add \\(=\\) new amount \\(-\\) old amount of that part.\n" +
        "- **Fast route in units:** work in ratio units. Keep the unchanged part's units equal in the old and new ratio, read how many units the added part gains, and multiply by the size of one unit (total \\(\\div\\) units in the old ratio).\n" +
        "- This works when one part is added and the other is left alone. If some mixture is taken out and replaced, both parts change and you need a different method.",
      formula: {
        label: "Amount to add",
        latex:
          "\\text{New amount of added part} = \\text{Fixed part} \\times \\frac{\\text{its new ratio term}}{\\text{fixed part's new ratio term}}",
      },
      authoredExample: {
        prompt: "A 45 L mixture has juice and water in the ratio 7 : 2. How much water must be added to make the ratio 7 : 3?",
        steps: [
          "Full method: juice \\(= \\frac{7}{9} \\times 45 = 35\\) L, water \\(= 10\\) L.",
          "Juice stays 35 L. For 7 : 3 the water must be \\(35 \\times \\frac{3}{7} = 15\\) L, so add \\(15 - 10 = 5\\) L.",
          "Fast route: 9 units make 45 L, so one unit is 5 L. Juice stays at 7 units and water goes from 2 units to 3, a gain of 1 unit, which is 5 L.",
        ],
        answer: "5 L",
      },
      selfCheckExample: {
        prompt: "A 60 L solution has alcohol and water in the ratio 2 : 1. How much water must be added to make the ratio 1 : 1?",
        steps: [
          "Alcohol \\(= 40\\) L, water \\(= 20\\) L.",
          "For 1 : 1 the water must also be 40 L, so add \\(40 - 20 = 20\\) L.",
        ],
        answer: "20 L",
      },
      practiceSet: [
        { prompt: "A 24 L mixture has milk and water in the ratio 5 : 1. How much water must be added to make the ratio 2 : 1?", answer: "6 L" },
        { prompt: "A 20 L mixture has syrup and water in the ratio 3 : 1. How much water must be added to make the ratio 3 : 2?", answer: "5 L" },
        { prompt: "A 35 L mixture has milk and water in the ratio 4 : 3. How much milk must be added to make the ratio 2 : 1?", answer: "10 L" },
        { prompt: "A 16 L mixture has acid and water in the ratio 1 : 3. How much acid must be added to make the ratio 1 : 1?", answer: "8 L" },
      ],
      pyqExampleId: "ca035d2f-a64f-48b0-84d2-71fcc7cf97d1",
      traps: [
        {
          title: "Changing the part that was not added",
          body:
            "Adding water leaves the milk exactly as it was. Scale the new ratio to the unchanged part, never to the old total.",
        },
        {
          title: "Giving the new amount instead of the amount added",
          body:
            "If the water must become 15 L and there is already 10 L, the answer is the 5 L poured in, not 15 L.",
        },
      ],
    },
  ],
};
