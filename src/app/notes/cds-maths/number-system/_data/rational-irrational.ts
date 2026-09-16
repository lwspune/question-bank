import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_RATIONAL_IRRATIONAL_NOTE: SubtopicNote = {
  subtopicName: "Rational and Irrational Numbers",
  title: "Rational & Irrational Numbers",
  oneLineDefinition:
    "The one test that separates the two — a rational number's decimal expansion terminates or recurs, an irrational number's does neither — plus the mechanical way to turn any recurring decimal back into a fraction.",
  whyItMatters:
    "Six PYQs, the smallest unit in the chapter and none of them HARD. Every question is either the terminate-or-recur test applied to a list, or a recurring decimal converted to a fraction. The recurring-to-fraction recipe is worth memorising outright because it appears in half of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsns-rational-irrational-definitions",
      name: "What makes a number rational, and what the decimal expansion reveals",
      intuition:
        "A rational number is a ratio of integers, and that forces its decimal expansion either to stop or to fall into a repeating block. An irrational number's expansion does neither — it runs forever without settling into a pattern, which is exactly why you can bracket it by fractions but never land on it.",
      definition:
        "A number is **rational** if it can be written \\(\\dfrac pq\\) with \\(p,q\\) integers and \\(q \\ne 0\\); otherwise it is **irrational**.\n" +
        "- A rational number's decimal expansion **terminates or recurs** — those are the only options, and either one is a guarantee of rationality.\n" +
        "- An irrational number's expansion is **non-terminating and non-repeating**.\n" +
        "- A terminating decimal is always rational, since it is a fraction over a power of 10.\n" +
        "- Both kinds are **dense**: between any two numbers lie infinitely many of each.",
      visualizationSlug: "cds-rational-irrational-line",
      table: {
        columns: ["Number", "Rational?", "Reason"],
        rows: [
          { cells: ["0.5", "Rational", "Terminates"] },
          { cells: ["0.333...", "Rational", "Recurs, equals one third"] },
          { cells: ["\\(\\sqrt{75}\\)", "Irrational", "Equals \\(5\\sqrt3\\), and 75 is not a perfect square"] },
          { cells: ["\\(\\sqrt{59049}\\)", "Rational", "Equals 243, since \\(59049=3^{10}\\)"] },
          {
            cells: ["0.12112211122211112222...", "Irrational", "Blocks grow, so it never repeats"],
            noteAmber:
              "A visible pattern is not a repeating block. Recurrence needs a fixed block repeated forever.",
          },
          { cells: ["\\(\\pi\\)", "Irrational", "Non-terminating, non-repeating"] },
          { cells: ["\\(4\\pi r^{2}\\) with \\(r\\) rational", "Irrational", "A non-zero rational multiple of \\(\\pi\\)"] },
          { cells: ["\\(\\sqrt2 \\times \\sqrt{50}\\)", "Rational", "Equals 10 — a product of irrationals can be rational"] },
        ],
        caption:
          "The decimal expansion is the test. Note the two rows that go against first instinct: a square root can be rational, and a product of irrationals can be too.",
      },
      selfCheckExample: {
        prompt:
          "If the radius of a sphere is rational, is its surface area rational? Is its volume?",
        steps: [
          "Surface area is \\(4\\pi r^{2}\\). With \\(r\\) rational and non-zero, \\(4r^{2}\\) is a non-zero rational, so the area is a non-zero rational multiple of \\(\\pi\\).",
          "Since \\(\\pi\\) is irrational, no non-zero rational multiple of it can be rational. So the surface area is irrational.",
          "Volume is \\(\\tfrac43\\pi r^{3}\\) — the same argument applies.",
          "So **neither** is rational, which is the opposite of the instinctive answer.",
        ],
        answer: "Neither — both are non-zero rational multiples of \\(\\pi\\).",
      },
      practiceSet: [
        { prompt: "Is \\(\\sqrt{16}\\) rational?", answer: "Yes", method: "It equals 4" },
        { prompt: "Is a terminating decimal always rational?", answer: "Yes" },
        { prompt: "Can an irrational number have a terminating expansion?", answer: "No" },
        { prompt: "Is \\(\\sqrt3\\times\\sqrt{12}\\) rational?", answer: "Yes", method: "\\(\\sqrt{36}=6\\)" },
      ],
      pyqExampleId: "e748023f-2c86-46a9-a8f1-9479dc4ca022", // 2018 — which one of the following is correct
      traps: [
        {
          title: "A square root is not automatically irrational",
          body:
            "\\(\\sqrt{59049} = 243\\) because \\(59049 = 3^{10}\\), so it is rational. \\(\\sqrt{n}\\) is irrational exactly when \\(n\\) is **not** a perfect square. Check for squareness before calling a root irrational — CDS plants a large perfect square in the option list precisely to catch this.",
        },
        {
          title: "A pattern is not the same as a recurring block",
          body:
            "\\(0.12112211122211112222\\ldots\\) is clearly patterned, but the blocks lengthen, so no fixed block repeats and the number is irrational. Recurrence means one unchanging block forever, as in \\(0.\\overline{45}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-recurring-to-fraction",
      name: "Converting a recurring decimal to a fraction",
      intuition:
        "A purely recurring decimal with a block of \\(k\\) digits equals that block over \\(k\\) nines. That is the whole recipe, and it comes straight from multiplying by \\(10^{k}\\) and subtracting so the infinite tail cancels.",
      definition:
        "For a **purely** recurring decimal, put the repeating block over as many 9s as it has digits:\n" +
        "\\[0.\\overline{d} = \\frac{d}{9}, \\qquad 0.\\overline{d_1d_2} = \\frac{d_1d_2}{99}, \\qquad 0.\\overline{d_1d_2d_3} = \\frac{d_1d_2d_3}{999}.\\]\n" +
        "- Then **reduce to lowest terms** — that is usually where the answer lives.\n" +
        "- Useful factorisations of the denominators: \\(99 = 9\\times 11\\) and \\(999 = 27\\times 37\\).\n" +
        "- If the recurrence starts later, shift it: \\(0.0\\overline{459} = \\frac{1}{10}\\times 0.\\overline{459}\\).\n" +
        "- A famous consequence: \\(0.\\overline{9} = \\frac99 = 1\\) exactly.",
      formula: {
        label: "Purely recurring decimal",
        latex: "0.\\overline{d_1d_2\\cdots d_k}=\\frac{d_1d_2\\cdots d_k}{\\underbrace{99\\cdots9}_{k}}",
      },
      authoredExample: {
        prompt: "Express \\(0.\\overline{45}\\) as a fraction in lowest terms.",
        steps: [
          "The repeating block \\(45\\) has two digits, so the fraction is \\(\\dfrac{45}{99}\\).",
          "Both are divisible by 9: \\(45 = 9\\times 5\\) and \\(99 = 9\\times 11\\).",
          "So it reduces to \\(\\dfrac{5}{11}\\).",
          "Check by division: \\(5 \\div 11 = 0.454545\\ldots\\)",
        ],
        answer: "\\(\\dfrac{5}{11}\\).",
      },
      selfCheckExample: {
        prompt:
          "Express \\(0.\\overline{135}\\) as a fraction, and name its denominator in lowest terms.",
        steps: [
          "The block has three digits, so the fraction is \\(\\dfrac{135}{999}\\).",
          "Factorise: \\(135 = 27\\times 5\\) and \\(999 = 27\\times 37\\).",
          "Cancelling 27 gives \\(\\dfrac{5}{37}\\).",
          "So the denominator in lowest terms is 37 — which is why \\(999\\) is the denominator to watch whenever a question mentions 37.",
        ],
        answer: "\\(\\dfrac{5}{37}\\), denominator 37.",
      },
      practiceSet: [
        { prompt: "\\(0.\\overline{7}\\) as a fraction?", answer: "\\(\\frac79\\)" },
        { prompt: "\\(0.\\overline{23}\\) as a fraction?", answer: "\\(\\frac{23}{99}\\)" },
        { prompt: "Factorise 999.", answer: "\\(27\\times37\\)" },
        { prompt: "\\(0.\\overline{9}\\) equals?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "6b9783e5-84b8-465b-be3f-9dfb70aaaef0", // 2018 — which decimal is a rational number with denominator 37
      traps: [
        {
          title: "The recurring bar changes the value, and the question turns on it",
          body:
            "\\(0.\\overline{9} = 1\\) exactly, so \\(0.\\overline{9} - 0.9 = 0.1\\), not \\(0.0999\\ldots\\). Likewise \\(0.\\overline{459}\\) is \\(\\frac{17}{37}\\) while the terminating \\(0.459459459\\) is a fraction over a power of 10 and has no 37 in its denominator. Read whether the bar is present before converting.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-irrationality-tests",
      name: "Deciding irrationality of roots, sums and products",
      intuition:
        "For a root, the test is whether the number under it is a perfect power. For combinations, the useful facts are asymmetric: adding a rational to an irrational always stays irrational, but multiplying two irrationals can land back on a rational.",
      definition:
        "Working rules:\n" +
        "- \\(\\sqrt{n}\\) is **rational** exactly when \\(n\\) is a perfect square; simplify first, since \\(\\sqrt{75} = 5\\sqrt3\\).\n" +
        "- rational \\(+\\) irrational is **always irrational**.\n" +
        "- non-zero rational \\(\\times\\) irrational is **always irrational** — which settles every question about \\(\\pi\\).\n" +
        "- irrational \\(+\\) irrational and irrational \\(\\times\\) irrational **may be either**: \\(\\sqrt2+(-\\sqrt2)=0\\) and \\(\\sqrt2\\times\\sqrt{50}=10\\) are both rational.\n" +
        "So a question asking which of several expressions is irrational is answered by elimination, and the ones to check hardest are the products.",
      formula: {
        label: "Root test",
        latex: "\\sqrt{n} \\in \\mathbb{Q} \\iff n \\text{ is a perfect square}",
      },
      authoredExample: {
        prompt: "Is \\(\\sqrt{18}\\) rational or irrational?",
        steps: [
          "Simplify: \\(18 = 9\\times 2\\), so \\(\\sqrt{18} = 3\\sqrt2\\).",
          "\\(\\sqrt2\\) is irrational, and 3 is a non-zero rational.",
          "A non-zero rational times an irrational is irrational.",
          "So \\(\\sqrt{18}\\) is irrational. (Equivalently: 18 is not a perfect square.)",
        ],
        answer: "Irrational.",
      },
      selfCheckExample: {
        prompt:
          "Is \\(\\sqrt{50}\\times\\sqrt2\\) rational? What does that tell you about products of irrationals?",
        steps: [
          "Both factors are irrational, since neither 50 nor 2 is a perfect square.",
          "But \\(\\sqrt{50}\\times\\sqrt2 = \\sqrt{100} = 10\\).",
          "So the product is rational.",
          "Hence there is **no** rule that a product of two irrationals is irrational — unlike the rational-times-irrational case, which is always irrational.",
        ],
        answer:
          "Rational, equal to 10 — so products of irrationals can be rational.",
      },
      practiceSet: [
        { prompt: "Is \\(\\sqrt{75}\\) rational?", answer: "No", method: "\\(5\\sqrt3\\)" },
        { prompt: "Is \\(2+\\sqrt3\\) rational?", answer: "No" },
        { prompt: "Is \\(\\sqrt8\\times\\sqrt2\\) rational?", answer: "Yes", method: "\\(\\sqrt{16}=4\\)" },
        { prompt: "Is \\(3\\pi\\) rational?", answer: "No" },
      ],
      pyqExampleId: "65175e46-91f8-433d-b587-61a033eed819", // 2019 — which one of the following is an irrational number
      traps: [
        {
          title: "Simplify the surd before judging it",
          body:
            "\\(\\sqrt{75}\\) looks irreducible but equals \\(5\\sqrt3\\); \\(\\sqrt{59049}\\) looks irrational but equals 243. Pull out every square factor first. The 2019 statement question hinges on exactly this: \\(\\sqrt{75}\\) being called rational is the planted falsehood.",
        },
      ],
    },
  ],
  related: [
    { label: "Perfect squares, cubes and difference of squares", href: "/notes/cds-maths/number-system/cds-ns-squares-cubes" },
    { label: "Place value and digit problems", href: "/notes/cds-maths/number-system/cds-ns-place-value" },
  ],
};
