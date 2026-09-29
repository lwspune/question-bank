import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_SEQ_NOTE: SubtopicNote = {
  subtopicName: "Common Terms and Sub-Progressions",
  title: "Common Terms and Sub-Progressions",
  oneLineDefinition:
    "Terms shared by two progressions, and terms of one progression picked out by a divisibility condition, form a new progression: find its first term and step, then count and add.",
  whyItMatters:
    "Eleven PYQs, eight of them numerical-answer questions with no options to check against. Each asks for a count or a sum of the terms two progressions share, or of the terms that pass a divisibility test. Two ideas cover the page.",
  concepts: [
    // C1 — common terms of two progressions
    {
      kind: "formula" as const,
      slug: "jseq-common-terms",
      name: "Common terms of two progressions",
      intuition:
        "The terms two APs share form an AP of their own. Its step is the LCM of the two common differences. Find its first term by listing a few terms of each. Its last term is the largest one not beyond either progression's last term. For an AP and a GP, list the GP's terms (there are few) and test each against the AP.",
      definition:
        "- **Step of the common AP:** \\(D=\\operatorname{lcm}(d_1,d_2)\\).\n" +
        "- **First common term:** list terms of both until one repeats.\n" +
        "- **Last common term:** the largest \\(T+kD\\) not beyond either last term.\n" +
        "- **AP and GP:** a GP term lies in the AP \\(a+kd\\) exactly when it leaves remainder \\(a\\) on division by \\(d\\).",
      formula: {
        label: "Common difference of the shared terms",
        latex: "D=\\operatorname{lcm}(d_1,d_2)",
      },
      authoredExample: {
        prompt: "Add the terms common to \\(2,7,12,\\dots,197\\) and \\(3,7,11,\\dots,199\\).",
        steps: [
          "First common term \\(7\\); step \\(\\operatorname{lcm}(5,4)=20\\).",
          "\\(7+20k\\le197\\) gives \\(k\\le9\\): ten terms, the last \\(187\\).",
          "Sum \\(=5(7+187)\\).",
        ],
        answer: "\\(970\\).",
      },
      selfCheckExample: {
        prompt: "How many terms do \\(1,4,7,\\dots,88\\) and \\(1,6,11,\\dots,96\\) share?",
        steps: [
          "Step \\(15\\) from \\(1\\): \\(1,16,31,46,61,76\\), and \\(91>88\\).",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Step of the common terms for \\(d_1=6\\), \\(d_2=4\\)?", answer: "\\(12\\)" },
        { prompt: "First common term of \\(5,9,13,\\dots\\) and \\(4,11,18,\\dots\\)?", answer: "\\(25\\)" },
        { prompt: "Common terms of \\(2,4,6,\\dots\\) and \\(3,6,9,\\dots\\) up to 60: how many?", answer: "\\(10\\)" },
        { prompt: "First two terms of \\(2,4,8,\\dots\\) that lie in \\(1,4,7,\\dots\\)?", answer: "\\(4\\) and \\(16\\)" },
      ],
      pyqExampleId: "c05141b8-618b-443e-b7b4-d8e054c66ec1", // 2024 — sum of the terms common to 3,7,...,403 and 2,5,...,404
      traps: [
        {
          title: "Start at the first COMMON term",
          body: "The shared AP starts at the first term both lists contain, which is usually neither progression's first term.",
        },
      ],
    },

    // C2 — sub-progressions by divisibility
    {
      kind: "formula" as const,
      slug: "jseq-sub-progression",
      name: "Terms picked out by a divisibility condition",
      intuition:
        "In an AP, the terms divisible by a number \\(m\\) recur at a fixed interval, so they form a smaller AP. To add the terms that are NOT divisible, add everything and subtract that smaller AP. Numbers in a range with a fixed remainder on division by \\(m\\) are an AP with step \\(m\\). For a condition such as coprime to 45, remove the multiples of 3 and of 5, then add back the multiples of 15.",
      definition:
        "- **Required sum** \\(=\\) (sum of all terms) \\(-\\) (sum of the excluded sub-AP).\n" +
        "- **Fixed remainder \\(r\\) on division by \\(m\\):** an AP with step \\(m\\).\n" +
        "- **Two conditions:** inclusion–exclusion, since multiples of both were removed twice.",
      formula: {
        label: "Sum of the terms that pass",
        latex: "\\text{sum}=S_{\\text{all}}-S_{\\text{excluded}}",
      },
      authoredExample: {
        prompt: "Add all three-digit numbers that leave remainder 1 on division by 7.",
        steps: [
          "First \\(106=7\\cdot15+1\\); last \\(995=7\\cdot142+1\\).",
          "Count \\(\\frac{995-106}{7}+1=128\\).",
          "Sum \\(=64(106+995)\\).",
        ],
        answer: "\\(70464\\).",
      },
      selfCheckExample: {
        prompt: "Add the numbers from 1 to 100 that are not multiples of 4.",
        steps: [
          "All: \\(5050\\). Multiples of 4: \\(4(1+\\dots+25)=1300\\).",
        ],
        answer: "\\(3750\\).",
      },
      practiceSet: [
        { prompt: "Terms of \\(2,5,8,\\dots\\) divisible by 4 form an AP with step?", answer: "\\(12\\) (8, 20, 32, …)" },
        { prompt: "How many two-digit numbers leave remainder 2 on division by 5?", answer: "\\(18\\)" },
        { prompt: "Sum of the multiples of 6 up to 60?", answer: "\\(330\\)" },
        { prompt: "Even numbers from 2 to 100 that are not multiples of 5: how many?", answer: "\\(40\\)" },
      ],
      pyqExampleId: "67b9d554-cf15-46fe-9868-4996322754e4", // 2023 — terms of 3,8,...,373 not divisible by 3
      traps: [
        {
          title: "Add the overlap back",
          body: "Removing multiples of 3 and then multiples of 5 removes the multiples of 15 twice. Add their sum back once.",
        },
      ],
    },
  ],
};
