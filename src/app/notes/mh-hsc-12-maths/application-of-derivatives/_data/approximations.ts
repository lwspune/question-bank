import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_APPROXIMATIONS_NOTE: SubtopicNote = {
  subtopicName: "Approximations",
  title: "Approximate Values by Derivatives",
  oneLineDefinition:
    "For a small h, f(a + h) is close to f(a) + h f'(a): start from a value you know exactly and correct it with the derivative.",
  whyItMatters:
    "36 questions, the second largest page of the chapter, six of them from board papers: e to the power 1.005 (2020), sin 30°30′ (2023), tan 44°30′ (an MCQ in 2024), the inverse tangent of 1.002 (2024) and the value of a cubic near x = 2 (2024, and an MCQ in 2026). The textbook rows are Exercise 2.2, the seven solved examples of section 2.2.1 and three Miscellaneous Exercise questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-powers",
      name: "Roots, powers and polynomials",
      intuition:
        "Close to a point a, a curve is almost the same as its tangent line. So if you know f(a) exactly, the value a little way off is f(a) plus the step h times the slope f'(a). Choose a so that the root or power is exact, and let h be the small leftover.",
      definition:
        "- \\(f(a + h) \\approx f(a) + h\\,f'(a)\\), for a small \\(h\\).\n" +
        "- Choose \\(a\\) near the given number with \\(f(a)\\) known exactly: a perfect square, cube or fifth power, or a whole number in a polynomial.\n" +
        "- \\(h\\) = the given number minus \\(a\\), with its sign: negative when the number is below \\(a\\).\n" +
        "- Board layout: \\(f(x)\\), \\(f'(x)\\), the values of \\(a\\) and \\(h\\), \\(f(a)\\) and \\(f'(a)\\), the formula, the substitution and the answer.",
      formula: {
        label: "Approximation formula",
        latex: "f(a + h) \\approx f(a) + h\\,f'(a)",
        symbols: [
          { symbol: "\\(a\\)", meaning: "a nearby value where f is known exactly" },
          { symbol: "\\(h\\)", meaning: "the small step from a to the given value" },
        ],
      },
      authoredExample: {
        prompt: "Find the approximate value of \\(\\sqrt{25.3}\\).",
        steps: [
          "Let \\(f(x) = \\sqrt{x}\\), so \\(f'(x) = \\dfrac{1}{2\\sqrt{x}}\\).",
          "Take \\(a = 25\\) and \\(h = 0.3\\).",
          "\\(f(a) = \\sqrt{25} = 5\\) and \\(f'(a) = \\dfrac{1}{2(5)} = \\dfrac{1}{10}\\).",
          "\\(f(a + h) \\approx f(a) + h\\,f'(a) = 5 + (0.3)\\left(\\dfrac{1}{10}\\right) = 5 + 0.03\\).",
        ],
        answer: "\\(\\sqrt{25.3} \\approx 5.03\\)",
      },
      selfCheckExample: {
        prompt: "Find the approximate value of \\((2.01)^4\\).",
        steps: ["\\(f(x) = x^4\\), \\(a = 2\\), \\(h = 0.01\\), \\(f(2) = 16\\), \\(f'(2) = 4(8) = 32\\).", "\\(16 + (0.01)(32) = 16.32\\)."],
        answer: "16.32",
      },
      practiceSet: [
        { prompt: "Find the approximate value of \\(\\sqrt[3]{63.9}\\).", answer: "About 3.9979 (\\(a = 64\\), \\(h = -0.1\\), \\(f'(64) = \\dfrac{1}{48}\\))" },
        { prompt: "Find the approximate value of \\((0.99)^5\\).", answer: "0.95" },
      ],
      pyqExampleId: "c8040d0a-5c07-4361-a96c-e5a1db221774",
      traps: [
        {
          title: "The wrong sign of h",
          body: "\\(h\\) is the given number minus \\(a\\). For \\((3.97)^4\\) with \\(a = 4\\), \\(h = -0.03\\); writing \\(+0.03\\) moves the answer the wrong way.",
        },
        {
          title: "Choosing an a whose value is not exact",
          body: "The method only helps if \\(f(a)\\) is known exactly. For \\(\\sqrt{8.95}\\) take \\(a = 9\\), not \\(a = 8\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-trig",
      name: "Trigonometric values near a standard angle",
      intuition:
        "Start from the nearest standard angle (30°, 45° or 60°) and let h be the difference. The derivative formulas for sin, cos and tan are true only in radians, so h must be changed from degrees to radians with the value the question gives.",
      definition:
        "- Take \\(a\\) as a standard angle near the given one.\n" +
        "- Change \\(h\\) to radians: with \\(1^\\circ = 0.0175^c\\), \\(30' = 0.5^\\circ = 0.00875^c\\).\n" +
        "- \\(\\dfrac{d}{dx}\\sin x = \\cos x\\), \\(\\dfrac{d}{dx}\\cos x = -\\sin x\\), \\(\\dfrac{d}{dx}\\tan x = \\sec^2 x\\).\n" +
        "- Use only the values the question supplies (such as \\(\\cos 30^\\circ = 0.866\\)).",
      formula: {
        label: "Trigonometric approximations",
        latex: "\\sin(a + h) \\approx \\sin a + h\\cos a, \\quad \\cos(a + h) \\approx \\cos a - h\\sin a, \\quad \\tan(a + h) \\approx \\tan a + h\\sec^2 a",
      },
      authoredExample: {
        prompt: "Find the approximate value of \\(\\cos 31^\\circ\\), given that \\(1^\\circ = 0.0175^c\\) and \\(\\cos 30^\\circ = 0.866\\).",
        steps: [
          "Let \\(f(x) = \\cos x\\), so \\(f'(x) = -\\sin x\\).",
          "Take \\(a = 30^\\circ\\) and \\(h = 1^\\circ = 0.0175^c\\).",
          "\\(f(a) = \\cos 30^\\circ = 0.866\\) and \\(f'(a) = -\\sin 30^\\circ = -0.5\\).",
          "\\(f(a + h) \\approx 0.866 + (0.0175)(-0.5) = 0.866 - 0.00875 = 0.85725\\).",
        ],
        answer: "\\(\\cos 31^\\circ \\approx 0.85725\\)",
      },
      selfCheckExample: {
        prompt: "To approximate \\(\\sin(45^\\circ 30')\\) from \\(a = 45^\\circ\\), what is \\(h\\) in radians, given \\(1^\\circ = 0.0175^c\\)?",
        steps: ["\\(30' = 0.5^\\circ\\).", "\\(h = 0.5 \\times 0.0175 = 0.00875\\)."],
        answer: "\\(h = 0.00875^c\\)",
      },
      practiceSet: [
        { prompt: "Find the approximate value of \\(\\tan 46^\\circ\\), given \\(1^\\circ = 0.0175^c\\).", answer: "\\(1 + (0.0175)(2) = 1.035\\)" },
        { prompt: "Find the approximate value of \\(\\cos 61^\\circ\\), given \\(1^\\circ = 0.0175^c\\) and \\(\\sin 60^\\circ = 0.866\\).", answer: "\\(0.5 - (0.0175)(0.866) = 0.484845\\), about 0.4848" },
      ],
      pyqExampleId: "0395c093-a889-45bf-b7e2-35202da0a0e9",
      traps: [
        {
          title: "Leaving h in degrees",
          body: "With \\(h = 0.5\\) instead of \\(0.00875\\), the correction is about 57 times too big and the answer is nonsense. Always convert \\(h\\) with the given value of \\(1^\\circ\\).",
        },
        {
          title: "The sign in the cosine formula",
          body: "The derivative of \\(\\cos x\\) is \\(-\\sin x\\), so a slightly larger angle gives a slightly smaller cosine: \\(\\cos(a + h) \\approx \\cos a - h\\sin a\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-explog",
      name: "Exponential, logarithmic and inverse trigonometric values",
      intuition:
        "The same formula works for every function whose derivative you know. Pick a where the value is easy: e to a whole power, the log of a power of 10, or the inverse tangent of 1, which is π/4. Then add h times the derivative there.",
      definition:
        "- \\(f(x) = e^{x}\\): \\(f'(x) = e^{x}\\), so \\(e^{a + h} \\approx e^{a}(1 + h)\\).\n" +
        "- \\(f(x) = \\log x\\) (base \\(e\\)): \\(f'(x) = \\dfrac{1}{x}\\), so \\(\\log(a + h) \\approx \\log a + \\dfrac{h}{a}\\).\n" +
        "- \\(f(x) = \\log_{10} x = (\\log_{10} e)\\log x\\): \\(f'(x) = \\dfrac{\\log_{10} e}{x} = \\dfrac{0.4343}{x}\\).\n" +
        "- \\(f(x) = a^{x}\\): \\(f'(x) = a^{x}\\log a\\).\n" +
        "- \\(\\dfrac{d}{dx}\\tan^{-1}x = \\dfrac{1}{1 + x^2}\\), \\(\\dfrac{d}{dx}\\cot^{-1}x = -\\dfrac{1}{1 + x^2}\\), \\(\\dfrac{d}{dx}\\cos^{-1}x = -\\dfrac{1}{\\sqrt{1 - x^2}}\\). An inverse trigonometric answer is in radians.",
      formula: {
        label: "Common cases",
        latex: "e^{a + h} \\approx e^{a}(1 + h), \\quad \\log(a + h) \\approx \\log a + \\frac{h}{a}, \\quad \\tan^{-1}(a + h) \\approx \\tan^{-1}a + \\frac{h}{1 + a^2}",
      },
      authoredExample: {
        prompt: "Find the approximate value of \\(\\log_e(10.02)\\), given \\(\\log_e 10 = 2.3026\\).",
        steps: [
          "Let \\(f(x) = \\log x\\), so \\(f'(x) = \\dfrac{1}{x}\\).",
          "Take \\(a = 10\\) and \\(h = 0.02\\).",
          "\\(f(a) = 2.3026\\) and \\(f'(a) = \\dfrac{1}{10} = 0.1\\).",
          "\\(f(a + h) \\approx 2.3026 + (0.02)(0.1) = 2.3026 + 0.002 = 2.3046\\).",
        ],
        answer: "\\(\\log_e(10.02) \\approx 2.3046\\)",
      },
      selfCheckExample: {
        prompt: "Find the approximate value of \\(e^{0.01}\\).",
        steps: ["\\(a = 0\\), \\(h = 0.01\\), \\(e^{0} = 1\\).", "\\(e^{0.01} \\approx 1(1 + 0.01)\\)."],
        answer: "1.01",
      },
      practiceSet: [
        { prompt: "Find the approximate value of \\(e^{3.02}\\), given \\(e^{3} = 20.0855\\).", answer: "\\(20.0855 \\times 1.02 = 20.48721\\), about 20.4872" },
        { prompt: "Find the approximate value of \\(\\log_{10}(101)\\), given \\(\\log_{10} e = 0.4343\\).", answer: "\\(2 + \\dfrac{0.4343}{100} = 2.004343\\)" },
      ],
      pyqExampleId: "afac01d2-a281-403d-b923-ce846d5fa5aa",
      traps: [
        {
          title: "Forgetting the factor for base 10",
          body: "For \\(\\log_{10} x\\) the derivative is \\(\\dfrac{0.4343}{x}\\), not \\(\\dfrac{1}{x}\\). Leaving out \\(\\log_{10} e\\) makes the correction more than twice too big.",
        },
        {
          title: "Using the wrong sign for the inverse cotangent",
          body: "\\(\\cot^{-1}x\\) decreases as \\(x\\) grows, because its derivative is \\(-\\dfrac{1}{1 + x^2}\\). A number a little below 1 gives a value a little above \\(\\dfrac{\\pi}{4}\\).",
        },
      ],
    },
  ],
};
