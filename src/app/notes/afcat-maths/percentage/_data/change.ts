import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Percentage Change and Comparison",
  title: "Percentage Change, and Comparing Two Quantities",
  oneLineDefinition:
    "Measure a change on the starting value, recover the value before a change, and compare two quantities by how much one is more or less than the other.",
  whyItMatters:
    "Three AFCAT past-year questions are on this page, from 2015 and 2018, and all three compare two quantities rather than track one. The marks go on the base: 'A is 60% more than B' and 'B is 60% less than A' are different statements, and the options always carry both readings.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-percent-change",
      name: "Percentage change measured on the old value",
      intuition:
        "A price that goes from ₹480 to ₹600 rises by ₹120. As a percentage it is 120 out of the ₹480 it started from, so 25%.",
      definition:
        "- Percentage change \\(= \\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\). A negative answer is a decrease.\n" +
        "- The **old** value is always the base, whether the change is a rise or a fall.\n" +
        "- So a rise and the fall that undoes it have different percentages: 480 to 600 is +25%, and 600 back to 480 is −20%.\n" +
        "- An improvement in rank from 60 to 51 is a fall of 9 on 60, which is 15%.",
      formula: {
        label: "Percentage change",
        latex: "\\%\\text{ change} = \\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100",
      },
      authoredExample: {
        prompt: "A price rises from ₹480 to ₹600. Find the percentage rise, and the percentage fall if it later goes back to ₹480.",
        steps: ["The rise is 120 on 480: \\(\\tfrac{120}{480} = 25\\%\\).", "The fall is 120 on 600: \\(\\tfrac{120}{600} = 20\\%\\)."],
        answer: "25% rise; 20% fall.",
      },
      selfCheckExample: {
        prompt: "A town's population falls from 40,000 to 37,400. Find the percentage decrease.",
        steps: ["The fall is 2,600.", "\\(\\tfrac{2600}{40000} \\times 100 = 6.5\\)."],
        answer: "6.5%.",
      },
      practiceSet: [
        { prompt: "A value goes from 250 to 300. Find the percentage increase.", answer: "20%" },
        { prompt: "A weight falls from 80 kg to 68 kg. Find the percentage decrease.", answer: "15%" },
        { prompt: "A price index rises from 160 to 200. Find the percentage rise.", answer: "25%" },
      ],
      pyqExampleId: "77405713-aa35-427b-87ec-bb780812f5d5",
      traps: [
        {
          title: "Divide by the starting value",
          body: "From 40,000 to 37,400 is 2,600 on 40,000, which is 6.5%. Dividing by 37,400 gives about 6.95%, a common distractor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-original-value",
      name: "The value before a percentage change",
      intuition:
        "A 20% rise multiplies a number by 1.2. To get back the number before the rise, divide by 1.2. Taking 20% off the new number does not undo it.",
      definition:
        "- After a rise of \\(r\\%\\): new \\(=\\) old \\(\\times \\left(1 + \\tfrac{r}{100}\\right)\\), so old \\(=\\) new \\(\\div \\left(1 + \\tfrac{r}{100}\\right)\\).\n" +
        "- After a fall of \\(r\\%\\): old \\(=\\) new \\(\\div \\left(1 - \\tfrac{r}{100}\\right)\\).\n" +
        "- Then answer what the question asks of the original: the number itself, or another percentage of it.\n" +
        "- Given both 'up by \\(x\\%\\) gives \\(A\\)' and 'down by \\(x\\%\\) gives \\(B\\)': adding the two equations gives the number, \\(N = \\tfrac{A + B}{2}\\).",
      formula: {
        label: "Undoing a change",
        latex: "\\text{old} = \\dfrac{\\text{new}}{1 \\pm \\tfrac{r}{100}}",
      },
      authoredExample: {
        prompt: "After a 20% rise, a salary is ₹27,000. What was it before the rise?",
        steps: ["\\(1.2 \\times \\text{old} = 27000\\).", "\\(27000 \\div 1.2 = 22500\\)."],
        answer: "₹22,500.",
      },
      selfCheckExample: {
        prompt: "A number decreased by 35% becomes 182. What does the number become if it is increased by 15% instead?",
        steps: ["\\(0.65N = 182\\), so \\(N = 280\\).", "\\(280 \\times 1.15 = 322\\)."],
        answer: "\\(322\\).",
      },
      practiceSet: [
        { prompt: "A number increased by 8% becomes 540. Find it.", answer: "\\(500\\)" },
        { prompt: "A number decreased by 40% becomes 72. Find it.", answer: "\\(120\\)" },
        { prompt: "After a 15% rise a price is ₹690. Find the old price.", answer: "₹600" },
        {
          prompt: "A number increased by x% gives 156 and decreased by x% gives 84. Find x.",
          answer: "\\(30\\)",
          method: "The number is \\(\\tfrac{156 + 84}{2} = 120\\).",
        },
      ],
      pyqExampleId: "7dcb8e9c-5b54-4d94-9f39-13c88d486145",
      traps: [
        {
          title: "Do not take the percentage off the new value",
          body: "₹27,000 after a 20% rise came from ₹22,500. Taking 20% off ₹27,000 gives ₹21,600, which is wrong, because the 20% was of the old salary.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-more-less",
      name: "More than and less than: the base changes",
      intuition:
        "If A is 60% more than B, take B as 100, so A is 160. B is 60 less than A, but as a share of A's 160 that is 37.5%, not 60%.",
      definition:
        "- 'A is \\(r\\%\\) more than B' uses B as the base. 'B is ?% less than A' uses A as the base.\n" +
        "- If A is \\(r\\%\\) more than B, then B is \\(\\dfrac{r}{100 + r} \\times 100\\%\\) less than A.\n" +
        "- If A is \\(r\\%\\) less than B, then B is \\(\\dfrac{r}{100 - r} \\times 100\\%\\) more than A.\n" +
        "- The fastest check is to put the base at 100 and read the other number.",
      formula: {
        label: "Swapping the base",
        latex: "\\text{more by } r\\% \\;\\to\\; \\text{less by } \\dfrac{100r}{100 + r}\\%, \\qquad \\text{less by } r\\% \\;\\to\\; \\text{more by } \\dfrac{100r}{100 - r}\\%",
      },
      authoredExample: {
        prompt: "A's income is 60% more than B's. By what percent is B's income less than A's?",
        steps: ["Take B = 100, so A = 160.", "B is 60 less, on A's 160: \\(\\tfrac{60}{160} = 37.5\\%\\)."],
        answer: "37.5%.",
      },
      selfCheckExample: {
        prompt: "X is 20% less than Y. By what percent is Y more than X?",
        steps: ["Take Y = 100, so X = 80.", "Y is 20 more, on X's 80: \\(\\tfrac{20}{80} = 25\\%\\)."],
        answer: "25%.",
      },
      practiceSet: [
        { prompt: "A is 40% more than B. By what percent is B less than A?", answer: "\\(28\\tfrac 47\\%\\)" },
        { prompt: "A is 10% less than B. By what percent is B more than A?", answer: "\\(11\\tfrac 19\\%\\)" },
        { prompt: "P is 75% more than Q. By what percent is Q less than P?", answer: "\\(42\\tfrac 67\\%\\)" },
        { prompt: "M is 37.5% less than N. By what percent is N more than M?", answer: "60%" },
      ],
      pyqExampleId: "d4fe08f4-736b-4d38-90b1-9dd01dc1a6b4",
      traps: [
        {
          title: "The two percentages are never equal",
          body: "If A is 60% more than B, B is 37.5% less than A. The same gap is measured on a different base, so the percentages differ.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-against-a-third",
      name: "Two quantities measured against a third",
      intuition:
        "When both numbers are described against a third one, set the third at 100. Both numbers then appear as plain values and can be compared directly.",
      definition:
        "- 'Two numbers are 30% and 50% more than a third': with the third at 100 they are 130 and 150.\n" +
        "- 'Less than a third by 35% and 61%' makes them 65 and 39.\n" +
        "- A chain (A against B, B against C) works the same way: put the last one at 100 and walk back along the chain.\n" +
        "- Then compare as in the last concept, on whichever base the question names.",
      formula: {
        label: "Set the reference at 100",
        latex: "\\text{third} = 100 \\;\\Rightarrow\\; \\text{first} = 100 \\pm a, \\quad \\text{second} = 100 \\pm b",
      },
      authoredExample: {
        prompt: "Two numbers are 30% and 50% more than a third number. What percent of the second number is the first?",
        steps: ["Take the third as 100: the first is 130 and the second 150.", "\\(\\tfrac{130}{150} \\times 100 = 86\\tfrac 23\\)."],
        answer: "\\(86\\tfrac 23\\%\\).",
      },
      selfCheckExample: {
        prompt: "P's salary is 15% less than Q's, and Q's is 40% more than R's. By what percent is P's salary more than R's?",
        steps: ["Take R = 100. Then Q = 140.", "P = \\(0.85 \\times 140 = 119\\), which is 19 more than R."],
        answer: "19%.",
      },
      practiceSet: [
        { prompt: "Two numbers are 35% and 61% less than a third number. By what percent is the second less than the first?", answer: "40%" },
        { prompt: "A is 30% more than C and B is 35% less than C. A is what percent of B?", answer: "200%" },
        { prompt: "B earns 15% more than C, and A earns 40% more than B. C earns ₹5,000. Find A's earnings.", answer: "₹8,050" },
      ],
      pyqExampleId: "98a461a4-bc80-43a6-917f-bc890cc86cd5",
      traps: [
        {
          title: "Percentages along a chain multiply",
          body: "30% less than 60% more is \\(0.7 \\times 1.6 = 1.12\\), so 12% more. Subtracting the percentages gives 30%, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-equal-percents",
      name: "When x% of one equals y% of another",
      intuition:
        "40% of A being equal to 25% of B means B must be the bigger number. The equation \\(0.4A = 0.25B\\) is a ratio in disguise: \\(A : B = 25 : 40\\).",
      definition:
        "- \\(x\\%\\) of \\(A = y\\%\\) of \\(B\\) gives \\(A : B = y : x\\) (the percentages cross over).\n" +
        "- B as a percentage of A is then \\(\\dfrac{x}{y} \\times 100\\).\n" +
        "- With a sum or a difference of A and B, split it in that ratio.\n" +
        "- If the percentages are of sums and differences, \\(a\\%\\) of \\((P + Q) = b\\%\\) of \\((P - Q)\\), expand and collect P and Q.",
      formula: {
        label: "Equal percentages",
        latex: "\\dfrac{x}{100}A = \\dfrac{y}{100}B \\;\\Rightarrow\\; A : B = y : x",
      },
      authoredExample: {
        prompt: "40% of A equals 25% of B. Find A : B, and B as a percentage of A.",
        steps: ["\\(0.4A = 0.25B\\), so \\(A : B = 25 : 40 = 5 : 8\\).", "B is \\(\\tfrac 85 = 1.6\\) times A."],
        answer: "\\(5 : 8\\); 160%.",
      },
      selfCheckExample: {
        prompt: "15% of A equals 21% of B, and A + B = 2,160. Find A.",
        steps: ["\\(A : B = 21 : 15 = 7 : 5\\), which is 12 parts.", "One part is \\(2160 \\div 12 = 180\\), so \\(A = 7 \\times 180\\)."],
        answer: "\\(1260\\).",
      },
      practiceSet: [
        { prompt: "12% of x equals 18% of y. Find x : y.", answer: "\\(3 : 2\\)" },
        { prompt: "30% of \\((P + Q)\\) equals 50% of \\((P - Q)\\). Q is what percent of P?", answer: "25%", method: "\\(0.8Q = 0.2P\\)." },
        { prompt: "2.5% of a equals 10% of b. a is what percent of b?", answer: "400%" },
      ],
      pyqExampleId: "bc9ff712-5cb1-4954-bc0b-ffb25ca8b5ba",
      traps: [
        {
          title: "The ratio crosses over",
          body: "40% of A = 25% of B gives \\(A : B = 25 : 40\\), not \\(40 : 25\\). The number with the smaller percentage is the larger number.",
        },
      ],
    },
  ],
};
