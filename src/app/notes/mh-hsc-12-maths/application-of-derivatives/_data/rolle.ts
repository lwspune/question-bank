import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_ROLLE_NOTE: SubtopicNote = {
  subtopicName: "Rolle's Theorem",
  title: "Rolle's Theorem",
  oneLineDefinition:
    "If f is continuous on [a, b], differentiable on (a, b) and f(a) = f(b), then f'(c) = 0 for at least one c between a and b: somewhere the tangent is parallel to the X-axis.",
  whyItMatters:
    "22 questions, two of them from board papers, both recent: checking whether the conditions hold for x² − 4x + 3 on [1, 3] (2025) and verifying the theorem for x² − 5x + 9 on [1, 4] (2026). The textbook rows are Exercise 2.3 Q.1 to Q.6, the solved examples of section 2.3.1 and two Miscellaneous Exercise questions, including finding unknown coefficients from the theorem.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscmad-conditions",
      name: "The three conditions of Rolle's theorem",
      intuition:
        "Rolle's theorem promises a level tangent somewhere between a and b, but only when all three conditions hold. A 'check whether' question is marked on testing each condition by name, with a reason, before you look for c.",
      definition:
        "- **Statement:** if \\(f\\) is continuous on \\([a, b]\\), differentiable on \\((a, b)\\) and \\(f(a) = f(b)\\), then there is at least one \\(c \\in (a, b)\\) such that \\(f'(c) = 0\\).\n" +
        "- **Geometrical meaning:** at \\(x = c\\) the tangent to the curve is parallel to the X-axis.\n" +
        "- Polynomials, \\(\\sin x\\), \\(\\cos x\\) and \\(e^{x}\\) are continuous and differentiable everywhere.\n" +
        "- If any one condition fails, the theorem is not applicable to that function on that interval.",
      table: {
        columns: ["Condition", "How to check it", "A function that fails it"],
        rows: [
          {
            cells: [
              "Continuous on the closed interval [a, b]",
              "A polynomial is continuous everywhere; a quotient is continuous where its denominator is not zero",
              "\\(f(x) = \\dfrac{1}{x}\\) on \\([-1, 1]\\) is not defined at \\(x = 0\\)",
            ],
          },
          {
            cells: [
              "Differentiable on the open interval (a, b)",
              "Find \\(f'(x)\\) and see that it exists at every point inside; look out for a corner or a power like \\(x^{2/3}\\)",
              "\\(f(x) = x^{2/3}\\) on \\([-1, 1]\\) has no derivative at \\(x = 0\\)",
            ],
            pyqExampleId: "a65c7b05-f5b5-48eb-8c7e-db13bbebee58",
          },
          {
            cells: [
              "f(a) = f(b)",
              "Work out both end values separately and compare them",
              "\\(f(x) = 2x^2 - 5x + 3\\) on \\([1, 3]\\): \\(f(1) = 0\\) but \\(f(3) = 6\\)",
            ],
            pyqExampleId: "bf70989f-00fc-4520-a858-fa8a108802c7",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Does Rolle's theorem apply to \\(f(x) = x^2\\) on \\([-2, 2]\\)? If it does, find \\(c\\).",
        steps: [
          "\\(f\\) is a polynomial, so it is continuous on \\([-2, 2]\\) and differentiable on \\((-2, 2)\\).",
          "\\(f(-2) = 4 = f(2)\\).",
          "\\(f'(c) = 2c = 0\\), so \\(c = 0 \\in (-2, 2)\\).",
        ],
        answer: "Yes, with \\(c = 0\\)",
      },
      practiceSet: [
        { prompt: "Which condition of Rolle's theorem does \\(f(x) = x^2 + 1\\) fail on \\([0, 2]\\)?", answer: "\\(f(a) = f(b)\\): \\(f(0) = 1\\) but \\(f(2) = 5\\)" },
        { prompt: "Is a polynomial ever not differentiable inside an interval?", answer: "No, a polynomial is differentiable at every real number" },
      ],
      pyqExampleId: "f7d78351-0fee-4f23-8e61-21febb916f68",
      traps: [
        {
          title: "'Conditions satisfied' without testing each one",
          body: "Write the three conditions one by one, each with its reason: continuity, differentiability, and the two end values worked out. A one-line verdict loses most of the marks.",
        },
        {
          title: "Saying no c exists when a condition fails",
          body: "If a condition fails, write that Rolle's theorem is not applicable. The theorem then says nothing either way about \\(f'(c) = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-verify",
      name: "Verifying Rolle's theorem and finding c",
      intuition:
        "To verify the theorem you show all three conditions hold and then actually find the promised c by solving f'(c) = 0. Keep only the values of c that lie strictly between a and b; the verification ends with that check.",
      definition:
        "- **Step 1:** \\(f\\) is continuous on \\([a, b]\\), with the reason.\n" +
        "- **Step 2:** \\(f\\) is differentiable on \\((a, b)\\); write \\(f'(x)\\).\n" +
        "- **Step 3:** work out \\(f(a)\\) and \\(f(b)\\) and show they are equal.\n" +
        "- **Step 4:** solve \\(f'(c) = 0\\) and keep only the values with \\(a < c < b\\).\n" +
        "- **Step 5:** conclude 'Rolle's theorem is verified'.",
      formula: {
        label: "Rolle's theorem",
        latex: "f(a) = f(b) \\;\\Rightarrow\\; f'(c) = 0 \\text{ for some } c \\in (a, b)",
      },
      authoredExample: {
        prompt: "Verify Rolle's theorem for \\(f(x) = \\sin x + \\cos x\\) on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
        steps: [
          "\\(\\sin x\\) and \\(\\cos x\\) are continuous and differentiable everywhere, so \\(f\\) is continuous on \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\) and differentiable on \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\).",
          "\\(f(0) = 0 + 1 = 1\\) and \\(f\\left(\\dfrac{\\pi}{2}\\right) = 1 + 0 = 1\\), so \\(f(0) = f\\left(\\dfrac{\\pi}{2}\\right)\\).",
          "\\(f'(x) = \\cos x - \\sin x\\). Put \\(f'(c) = 0\\): \\(\\cos c = \\sin c\\), so \\(\\tan c = 1\\).",
          "\\(c = \\dfrac{\\pi}{4}\\), and \\(0 < \\dfrac{\\pi}{4} < \\dfrac{\\pi}{2}\\).",
        ],
        answer: "Rolle's theorem is verified, with \\(c = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = x^3 - 4x\\) satisfies the conditions of Rolle's theorem on \\([-2, 2]\\). Find \\(c\\).",
        steps: ["\\(f'(c) = 3c^2 - 4 = 0\\), so \\(c = \\pm\\dfrac{2}{\\sqrt{3}}\\), about \\(\\pm 1.155\\).", "Both lie in \\((-2, 2)\\)."],
        answer: "\\(c = \\dfrac{2}{\\sqrt{3}}\\) or \\(c = -\\dfrac{2}{\\sqrt{3}}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(c\\) of Rolle's theorem for \\(f(x) = \\cos 2x\\) on \\([0, \\pi]\\).", answer: "\\(c = \\dfrac{\\pi}{2}\\)" },
        {
          prompt: "Find \\(c\\) of Rolle's theorem for \\(f(x) = (x - 1)(x - 2)(x - 3)\\) on \\([1, 3]\\).",
          answer: "\\(c = 2 \\pm \\dfrac{1}{\\sqrt{3}}\\); both lie in \\((1, 3)\\)",
        },
      ],
      pyqExampleId: "2483eb14-cc1b-4d32-8549-04a260c65b8f",
      traps: [
        {
          title: "Keeping a c outside the interval",
          body: "Solving \\(f'(c) = 0\\) can give a root outside \\((a, b)\\) or at an end point. Reject it in writing, with the reason, and keep only those strictly inside.",
        },
        {
          title: "Finding only one angle",
          body: "On a wide interval such as \\([0, 2\\pi]\\), \\(\\tan c = 1\\) has two solutions, \\(\\dfrac{\\pi}{4}\\) and \\(\\dfrac{5\\pi}{4}\\). List every value in the interval.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-unknowns",
      name: "Using Rolle's theorem to find unknowns",
      intuition:
        "When a question says Rolle's theorem holds, it is handing you equations. Equal end values give one equation, and a given c with f'(c) = 0 gives another. Solve them together for the unknown coefficients or the unknown end of the interval.",
      definition:
        "- \\(f(a) = f(b)\\) gives one equation in the unknowns.\n" +
        "- A given \\(c\\) with \\(f'(c) = 0\\) gives a second equation.\n" +
        "- If \\(a\\) is known and \\(b\\) is not, solve \\(f(b) = f(a)\\) and reject \\(b = a\\).\n" +
        "- To show an equation has a root in \\((a, b)\\), find a function whose derivative equation is that equation and which satisfies Rolle's conditions on \\([a, b]\\).",
      formula: {
        label: "Two equations from the theorem",
        latex: "f(a) = f(b), \\qquad f'(c) = 0",
      },
      authoredExample: {
        prompt: "Rolle's theorem holds for \\(f(x) = x^2 + px + 5\\) on \\([1, 5]\\). Find \\(p\\) and the value of \\(c\\).",
        steps: [
          "\\(f(1) = 1 + p + 5 = 6 + p\\) and \\(f(5) = 25 + 5p + 5 = 30 + 5p\\).",
          "\\(f(1) = f(5)\\): \\(6 + p = 30 + 5p\\), so \\(4p = -24\\) and \\(p = -6\\).",
          "\\(f'(x) = 2x - 6\\). Put \\(f'(c) = 0\\): \\(c = 3\\).",
          "\\(3 \\in (1, 5)\\).",
        ],
        answer: "\\(p = -6\\) and \\(c = 3\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = kx^2 + 4x\\) satisfies Rolle's theorem on \\([0, 2]\\). Find \\(k\\).",
        steps: ["\\(f(0) = 0\\) and \\(f(2) = 4k + 8\\).", "\\(4k + 8 = 0\\), so \\(k = -2\\)."],
        answer: "\\(k = -2\\)",
      },
      practiceSet: [
        {
          prompt: "Use Rolle's theorem for \\(f(x) = x^2 - x\\) on \\([0, 1]\\) to show that \\(2x - 1 = 0\\) has a root in \\((0, 1)\\).",
          answer: "\\(f\\) is a polynomial and \\(f(0) = 0 = f(1)\\), so \\(f'(c) = 2c - 1 = 0\\) for some \\(c \\in (0, 1)\\); here \\(c = \\dfrac{1}{2}\\)",
        },
        { prompt: "Rolle's theorem holds for \\(f\\) on \\([2, 6]\\). What can you say about \\(f(2)\\) and \\(f(6)\\)?", answer: "They are equal" },
      ],
      pyqExampleId: "9930f995-e157-4da1-becc-fc3e57c68cb2",
      traps: [
        {
          title: "Using only f'(c) = 0",
          body: "With two unknown coefficients you need two equations. The condition \\(f(a) = f(b)\\) is the other one, and it is the one students forget.",
        },
        {
          title: "Accepting b = a",
          body: "\\(f(b) = f(a)\\) is always true when \\(b = a\\), so that root appears every time. An interval needs \\(b \\neq a\\); reject it and keep the other root.",
        },
      ],
    },
  ],
};
