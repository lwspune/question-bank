import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Ratio Basics and Types of Ratio",
  title: "What a Ratio Means, and Its Named Forms",
  oneLineDefinition:
    "A ratio splits quantities into equal parts. Simplify it like a fraction, and know the inverse, duplicate, triplicate and sub-duplicate forms by name.",
  whyItMatters:
    "This is the most common page in the chapter's practice bank and the easiest: most of it is one step. Every later page leans on the same idea, that a : b = p : q means a = pk and b = qk, so a mistake here repeats on every page after it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-ratio-as-parts",
      name: "A ratio as equal parts",
      intuition:
        "A ratio \\(3 : 5\\) does not say there are 3 and 5 of anything. It says the two quantities are built from equal parts, 3 parts against 5 parts. Find the size of one part and every quantity follows.",
      definition:
        "- In \\(a : b\\), \\(a\\) is the **antecedent** and \\(b\\) the **consequent**. The ratio is the fraction \\(\\dfrac ab\\), so \\(a : b = 4 : 7\\) means \\(\\dfrac ab = \\dfrac 47\\).\n" +
        "- \\(a : b = p : q\\) means \\(a = pk\\) and \\(b = qk\\) for one number \\(k\\), the size of **one part**.\n" +
        "- Knowing one term fixes \\(k\\): if \\(a : b = 2 : 7\\) and \\(a = 12\\), one part is \\(6\\) and \\(b = 42\\).\n" +
        "- A ratio is also a percentage: \\(a : b = 2 : 5\\) means \\(a\\) is \\(\\dfrac 25 = 40\\%\\) of \\(b\\).",
      formula: {
        label: "A ratio as parts",
        latex: "a : b = p : q \\;\\text{means}\\; a = pk,\\ b = qk",
      },
      authoredExample: {
        prompt:
          "The ratio of oranges to apples in a basket is \\(5 : 9\\). There are 45 apples. How many oranges are there, and what percentage of the apples is that?",
        steps: [
          "Apples are 9 parts, so one part is \\(45 \\div 9 = 5\\).",
          "Oranges are 5 parts: \\(5 \\times 5 = 25\\).",
          "As a share of the apples: \\(\\dfrac{25}{45} = \\dfrac 59 \\approx 55.6\\%\\).",
        ],
        answer: "25 oranges, about \\(55.6\\%\\) of the apples.",
      },
      selfCheckExample: {
        prompt: "In a ratio equal to \\(6 : 11\\), the consequent is 66. Find the antecedent.",
        steps: ["11 parts are 66, so one part is 6.", "The antecedent is 6 parts: \\(36\\)."],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "If \\(p : q = 2 : 9\\), what is \\(\\dfrac pq\\)?", answer: "\\(\\dfrac 29\\)" },
        { prompt: "\\(x : y = 5 : 4\\) and \\(y = 28\\). Find \\(x\\).", answer: "\\(35\\)", method: "One part is \\(7\\)." },
        { prompt: "In the ratio \\(3 : 4\\), the first term is what percentage of the second?", answer: "\\(75\\%\\)" },
        { prompt: "In the ratio \\(12 : 17\\), which term is the consequent?", answer: "\\(17\\)" },
      ],
      pyqExampleId: "2238d276-6689-4a5a-a16a-a0401a37d36f",
      traps: [
        {
          title: "The ratio is not the amount",
          body: "Two numbers in the ratio \\(3 : 5\\) adding to 40 are 15 and 25, not 3 and 5. Find one part before you answer.",
        },
        {
          title: "Order matters",
          body: "\\(a : b\\) and \\(b : a\\) are different ratios. 'The ratio of X to Y' puts X first, so read which quantity the question names first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-simplest-form",
      name: "Simplest form of a ratio",
      intuition:
        "Multiplying or dividing both terms by the same number leaves a ratio unchanged, as with a fraction. So \\(12 : 16\\), \\(3 : 4\\) and \\(0.75 : 1\\) are one ratio. Simplest form means whole numbers with no common factor.",
      definition:
        "- Whole numbers: divide both terms by their HCF (\\(18 : 30 = 3 : 5\\), HCF 6).\n" +
        "- Decimals: multiply both terms by 10, 100, ... until both are whole (\\(0.6 : 1.5 = 6 : 15 = 2 : 5\\)).\n" +
        "- Fractions: multiply both by the LCM of the denominators (\\(\\tfrac 23 : \\tfrac 45\\), times 15, is \\(10 : 12 = 5 : 6\\)).\n" +
        "- Mixed numbers: write them as improper fractions first.\n" +
        "- Quantities: put both in the **same unit** first (40 minutes : 1.5 hours is \\(40 : 90 = 4 : 9\\)).",
      formula: {
        label: "Scaling both terms",
        latex: "a : b = ka : kb \\quad (k \\neq 0)",
      },
      authoredExample: {
        prompt: "Write \\(1\\tfrac 14 : 2\\tfrac 16\\) in simplest form.",
        steps: [
          "As improper fractions: \\(\\tfrac 54 : \\tfrac{13}{6}\\).",
          "Multiply both by 12, the LCM of 4 and 6: \\(15 : 26\\).",
          "15 and 26 share no factor, so this is the simplest form.",
        ],
        answer: "\\(15 : 26\\).",
      },
      selfCheckExample: {
        prompt: "Find the ratio of 750 g to 2 kg in simplest form.",
        steps: ["Same unit: 2 kg is 2000 g.", "\\(750 : 2000\\); divide both by 250: \\(3 : 8\\)."],
        answer: "\\(3 : 8\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(35 : 56\\).", answer: "\\(5 : 8\\)", method: "HCF 7." },
        { prompt: "Simplify \\(0.4 : 1.6\\).", answer: "\\(1 : 4\\)" },
        { prompt: "Simplify \\(\\tfrac 12 : \\tfrac 35\\).", answer: "\\(5 : 6\\)", method: "Multiply by 10." },
        { prompt: "Find the ratio of 20 paise to ₹2.", answer: "\\(1 : 10\\)", method: "₹2 is 200 paise." },
      ],
      pyqExampleId: "a80bd62d-a84b-4263-a290-a16c7bd89e3b",
      traps: [
        {
          title: "Units first",
          body: "45 minutes : 2 hours is not \\(45 : 2\\). Convert to one unit, \\(45 : 120 = 3 : 8\\), before simplifying.",
        },
        {
          title: "A ratio answer keeps both terms",
          body: "\\(0.75 : 1.25\\) simplifies to \\(3 : 5\\). Its value 0.6 is a fraction, and an option written as a ratio will not show it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afrp-named-ratios",
      name: "Inverse, duplicate, triplicate and sub-duplicate ratios",
      intuition:
        "AFCAT names the ratios you get from \\(a : b\\) by flipping it, squaring it, cubing it or taking roots. Each name is one operation applied to both terms.",
      definition:
        "Apply the operation to both terms, then simplify. A ratio 'compounded with itself' or 'taken twice' is multiplied by itself, which is the duplicate ratio. (Compounding two different ratios comes on the next page.)",
      table: {
        columns: ["Name", "Of a : b", "Example"],
        rows: [
          { cells: ["Inverse (reciprocal)", "\\(b : a\\)", "\\(3 : 10 \\to 10 : 3\\)"] },
          {
            cells: ["Duplicate", "\\(a^2 : b^2\\)", "\\(2 : 7 \\to 4 : 49\\)"],
            noteAmber: "'The compound ratio of a : b taken twice' is this same ratio.",
          },
          { cells: ["Triplicate", "\\(a^3 : b^3\\)", "\\(1 : 3 \\to 1 : 27\\)"] },
          { cells: ["Sub-duplicate", "\\(\\sqrt a : \\sqrt b\\)", "\\(49 : 64 \\to 7 : 8\\)"] },
          { cells: ["Sub-triplicate", "\\(\\sqrt[3]{a} : \\sqrt[3]{b}\\)", "\\(8 : 125 \\to 2 : 5\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the sub-duplicate ratio of \\(121 : 196\\)?",
        steps: ["Take the square root of both terms: \\(11 : 14\\)."],
        answer: "\\(11 : 14\\).",
      },
      practiceSet: [
        { prompt: "What is the duplicate ratio of \\(5 : 6\\)?", answer: "\\(25 : 36\\)" },
        { prompt: "What is the inverse ratio of \\(2 : 9\\)?", answer: "\\(9 : 2\\)" },
        { prompt: "What is the sub-triplicate ratio of \\(64 : 343\\)?", answer: "\\(4 : 7\\)" },
        { prompt: "What is the triplicate ratio of \\(2 : 5\\)?", answer: "\\(8 : 125\\)" },
      ],
      pyqExampleId: "da767bc8-07f7-4b15-8082-13f0fdf83f7e",
      traps: [
        {
          title: "Duplicate is not double",
          body: "The duplicate ratio of \\(3 : 4\\) is \\(9 : 16\\), not \\(6 : 8\\). Doubling both terms gives back the same ratio, \\(3 : 4\\).",
        },
        {
          title: "Sub-duplicate is not half",
          body: "The sub-duplicate ratio of \\(16 : 25\\) is \\(4 : 5\\), the square roots, not \\(8 : 12.5\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-undo-powers",
      name: "Working back from a duplicate or triplicate ratio",
      intuition:
        "If you are given the duplicate ratio, the ratio itself is its sub-duplicate: undo the square with a square root. Figures work the same way. Areas go with the square of lengths and volumes with the cube.",
      definition:
        "- If \\(a^2 : b^2 = p : q\\), then \\(a : b = \\sqrt p : \\sqrt q\\).\n" +
        "- If the sub-duplicate ratio of \\(a : b\\) is \\(m : n\\), then \\(a : b = m^2 : n^2\\).\n" +
        "- Quantities in the ratio \\(p : q : r\\) have squares in the ratio \\(p^2 : q^2 : r^2\\).\n" +
        "- Similar figures: areas are in the duplicate ratio of lengths, volumes in the triplicate ratio. So lengths are the sub-duplicate of the areas.\n" +
        "- A ratio with an unknown that equals a named ratio: work out the named ratio, then cross-multiply.",
      formula: {
        label: "Undoing a duplicate ratio",
        latex: "a^2 : b^2 = p : q \\;\\Rightarrow\\; a : b = \\sqrt p : \\sqrt q",
      },
      authoredExample: {
        prompt: "\\((x + 2) : (x + 12)\\) is the duplicate ratio of \\(2 : 3\\). Find \\(x\\).",
        steps: [
          "The duplicate ratio of \\(2 : 3\\) is \\(4 : 9\\).",
          "So \\(9(x + 2) = 4(x + 12)\\): \\(9x + 18 = 4x + 48\\).",
          "\\(5x = 30\\), so \\(x = 6\\). Check: \\(8 : 18 = 4 : 9\\).",
        ],
        answer: "\\(x = 6\\).",
      },
      selfCheckExample: {
        prompt: "Two cubes have volumes in the ratio \\(8 : 27\\). Find the ratio of their edges, and of their surface areas.",
        steps: [
          "Edges are the sub-triplicate ratio of the volumes: \\(2 : 3\\).",
          "Surface areas are the duplicate ratio of the edges: \\(4 : 9\\).",
        ],
        answer: "Edges \\(2 : 3\\); surface areas \\(4 : 9\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2 : y^2 = 49 : 100\\) with \\(x, y > 0\\). Find \\(x : y\\).", answer: "\\(7 : 10\\)" },
        { prompt: "The sub-duplicate ratio of \\(a : b\\) is \\(2 : 5\\). Find \\(a : b\\).", answer: "\\(4 : 25\\)" },
        { prompt: "Three numbers are in the ratio \\(1 : 2 : 3\\). In what ratio are their squares?", answer: "\\(1 : 4 : 9\\)" },
        { prompt: "The triplicate ratio of \\(a : b\\) is \\(27 : 125\\). Find \\(a : b\\).", answer: "\\(3 : 5\\)" },
      ],
      pyqExampleId: "723ca56b-fdc4-4f36-9fb7-0324eba1c6c5",
      traps: [
        {
          title: "One operation per name",
          body: "If the sub-duplicate ratio of \\(a : b\\) is \\(2 : 3\\), then \\(a : b = 4 : 9\\) and its duplicate is \\(16 : 81\\). That is two squarings, so write each step down.",
        },
        {
          title: "Roots do not always come out whole",
          body: "\\(a^2 : b^2 = 2 : 5\\) gives \\(a : b = \\sqrt 2 : \\sqrt 5\\). Leave the surds in; an option that has 'cleaned them up' to whole numbers is wrong.",
        },
      ],
    },
  ],
};
