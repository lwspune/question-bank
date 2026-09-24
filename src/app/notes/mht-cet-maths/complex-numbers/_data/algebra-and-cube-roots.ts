import type { SubtopicNote } from "@/app/notes/_types";

export const ALGEBRA_AND_CUBE_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity",
  title: "Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity",
  oneLineDefinition:
    "Everything algebraic about z = x + iy: reduce powers of i modulo 4, multiply by the conjugate to clear a denominator, equate real and imaginary parts, and reduce powers of ω modulo 3.",
  whyItMatters:
    "15 PYQs at 47% HARD — the chapter's largest and hardest page, though the difficulty is bookkeeping rather than ideas. " +
    "The recurring stems are a polynomial evaluated at a complex x (answered by its minimal quadratic, never by substitution), a cube of a binomial, an equation solved for z by equating parts, and a determinant or power built on the cube roots of unity. " +
    "Two of the fifteen carry stems the bank had garbled — a cube read as a division, an argument's denominator misprinted — both now repaired against the papers.",
  concepts: [
    // 1 — powers of i, standard form
    {
      kind: "formula" as const,
      slug: "cetcn-powers-of-i-and-standard-form",
      name: "Powers of i and the Standard Form x + iy",
      intuition:
        "\\(i^2 = -1\\), so \\(i^3 = -i\\) and \\(i^4 = 1\\): the powers of \\(i\\) cycle with period \\(4\\). Any \\(i^n\\) is one of \\(1, i, -1, -i\\), decided by \\(n \\bmod 4\\).",
      definition:
        "- \\(i^{4k} = 1\\), \\(i^{4k+1} = i\\), \\(i^{4k+2} = -1\\), \\(i^{4k+3} = -i\\). So \\(i^{40} = 1\\), \\(i^{35} = i^{32}\\cdot i^3 = -i\\), \\(i^{17} = i\\).\n" +
        "- Collect real and imaginary parts separately: \\(4i^{40} - 5i^{35} + 6i^{17} + 2 = 4 + 5i + 6i + 2 = 6 + 11i\\).\n" +
        "- Addition is componentwise; multiplication is FOIL with \\(i^2 = -1\\): \\((a + ib)(c + id) = (ac - bd) + i(ad + bc)\\).\n" +
        "- \\(\\sqrt{-3} = i\\sqrt3\\); a stem written with \\(\\sqrt{-1}\\) means \\(i\\).\n" +
        "- Two complex numbers are equal iff both real parts and both imaginary parts agree — the tool behind every 'find \\(x\\) and \\(y\\)' stem.",
      formula: {
        label: "Cycle of powers of i",
        latex:
          "i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1,\\qquad i^n = i^{\\,n \\bmod 4}",
      },
      authoredExample: {
        prompt: "Simplify \\(3i^{22} + 2i^{15} - i^{9} + 7\\).",
        steps: [
          "\\(22 \\bmod 4 = 2\\), so \\(i^{22} = -1\\); \\(15 \\bmod 4 = 3\\), so \\(i^{15} = -i\\); \\(9 \\bmod 4 = 1\\), so \\(i^{9} = i\\).",
          "\\(3(-1) + 2(-i) - i + 7 = 4 - 3i\\).",
        ],
        answer: "\\(4 - 3i\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(|Z|\\) where \\(Z = 2i^{100} - i^{50} + 3i^{7}\\).",
        steps: [
          "\\(i^{100} = 1\\), \\(i^{50} = i^{48}\\cdot i^2 = -1\\), \\(i^7 = -i\\).",
          "\\(Z = 2 + 1 - 3i = 3 - 3i\\), so \\(|Z| = \\sqrt{9 + 9} = 3\\sqrt2\\).",
        ],
        answer: "\\(3\\sqrt2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(i^{35} = ?\\)",
          answer: "\\(-i\\)",
        },
        {
          prompt: "\\(i^{40} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\((2 + 3i)(1 - i) = ?\\)",
          answer: "\\(5 + i\\)",
        },
        {
          prompt: "\\(1 + i + i^2 + i^3 = ?\\)",
          answer: "\\(0\\)",
        },
      ],
      pyqExampleId: "d2d9585c-71df-42ee-96cc-a8ca847641b7",
      traps: [
        {
          title: "i³ = i, and other lapses in the cycle",
          body:
            "\\(i^3 = i^2\\cdot i = -i\\). Reading \\(i^{35}\\) as \\(i\\) instead of \\(-i\\) flips a sign in the imaginary part and lands on the wrong modulus, which is always offered.",
        },
      ],
    },

    // 2 — conjugate and rationalising
    {
      kind: "formula" as const,
      slug: "cetcn-conjugate-and-rationalising",
      name: "The Conjugate: Rationalising a Denominator and Equating Conjugates",
      intuition:
        "\\(z\\bar z = |z|^2\\) is a real number, so multiplying top and bottom of a fraction by the conjugate of the denominator makes the denominator real — the single move that clears almost every fraction in the chapter.",
      definition:
        "- \\(\\bar z = x - iy\\); \\(z\\bar z = x^2 + y^2 = |z|^2\\); \\(\\overline{z_1/z_2} = \\bar z_1/\\bar z_2\\).\n" +
        "- \\(\\dfrac{2 - i}{3 + 4i} = \\dfrac{(2 - i)(3 - 4i)}{25} = \\dfrac{2 - 11i}{25}\\): then read off \\(a = \\frac{2}{25}\\), \\(b = -\\frac{11}{25}\\) and compute the asked combination.\n" +
        "- **Conjugates of each other**: \\(z_1 = \\bar z_2\\) means real parts equal and imaginary parts negatives. For \\((3x + 2) - (5y - 3)i\\) and \\((6x + 3) + (2y - 4)i\\): \\(3x + 2 = 6x + 3\\) and \\(5y - 3 = 2y - 4\\).\n" +
        "- Trigonometric pairs: \\(\\sin x + i\\cos 2x\\) and \\(\\cos x - i\\sin 2x\\) are conjugates iff \\(\\sin x = \\cos x\\) AND \\(\\cos 2x = \\sin 2x\\) — two conditions that may have no common solution.",
      formula: {
        label: "Conjugate identities",
        latex:
          "z\\bar z = |z|^2 \\qquad \\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2} \\qquad z_1 = \\bar z_2 \\iff \\operatorname{Re}z_1 = \\operatorname{Re}z_2,\\ \\operatorname{Im}z_1 = -\\operatorname{Im}z_2",
      },
      authoredExample: {
        prompt: "Write \\(\\dfrac{3 + 2i}{1 - i}\\) in the form \\(a + ib\\).",
        steps: [
          "Multiply by the conjugate of the denominator: \\(\\dfrac{(3 + 2i)(1 + i)}{(1 - i)(1 + i)} = \\dfrac{3 + 3i + 2i + 2i^2}{2}\\).",
          "\\(= \\dfrac{1 + 5i}{2}\\).",
        ],
        answer: "\\(\\dfrac12 + \\dfrac52 i\\)",
      },
      selfCheckExample: {
        prompt: "If \\((2x - 1) + 3i\\) and \\(5 - (y + 2)i\\) are conjugates of each other, find \\(x + y\\).",
        steps: [
          "Real parts equal: \\(2x - 1 = 5 \\Rightarrow x = 3\\). Imaginary parts negatives: \\(3 = y + 2 \\Rightarrow y = 1\\).",
        ],
        answer: "\\(4\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\overline{3 - 4i} = ?\\)",
          answer: "\\(3 + 4i\\)",
        },
        {
          prompt: "\\((2 + i)(2 - i) = ?\\)",
          answer: "\\(5\\)",
        },
        {
          prompt: "\\(\\dfrac{1}{i} = ?\\)",
          answer: "\\(-i\\)",
        },
        {
          prompt: "\\(\\dfrac{1 + i}{1 - i} = ?\\)",
          answer: "\\(i\\)",
        },
      ],
      pyqExampleId: "31694971-83f2-48cc-93cc-5a8b3ccc164d",
      traps: [
        {
          title: "Conjugating only the numerator",
          body:
            "\\(\\overline{Z_1}/\\overline{Z_2}\\) needs BOTH conjugates before the division; and the division itself still needs a second conjugate multiplication to clear the denominator. Two conjugations, not one.",
        },
      ],
    },

    // 3 — purely real / imaginary
    {
      kind: "formula" as const,
      slug: "cetcn-purely-real-or-imaginary-condition",
      name: "Purely Real or Purely Imaginary: Set the Other Part to Zero",
      intuition:
        "After rationalising, a complex expression has a real part and an imaginary part in the variable. 'Purely imaginary' means the real part is \\(0\\); 'purely real' means the imaginary part is \\(0\\). That equation is the whole question.",
      definition:
        "- Rationalise first, then separate: \\(\\dfrac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta} = \\dfrac{(3 - 4\\sin^2\\theta) + 8i\\sin\\theta}{1 + 4\\sin^2\\theta}\\).\n" +
        "- Purely imaginary \\(\\Rightarrow 3 - 4\\sin^2\\theta = 0 \\Rightarrow \\sin^2\\theta = \\dfrac34 \\Rightarrow \\theta = n\\pi \\pm \\dfrac{\\pi}{3}\\).\n" +
        "- Purely real would instead need \\(8\\sin\\theta = 0\\), i.e. \\(\\theta = n\\pi\\).\n" +
        "- Write the general solution in the form the options use: \\(\\sin^2\\theta = \\sin^2\\alpha \\Rightarrow \\theta = n\\pi \\pm \\alpha\\).",
      formula: {
        label: "Real and imaginary conditions",
        latex:
          "z \\text{ purely imaginary} \\iff \\operatorname{Re}z = 0 \\qquad z \\text{ purely real} \\iff \\operatorname{Im}z = 0 \\qquad \\sin^2\\theta = \\sin^2\\alpha \\Rightarrow \\theta = n\\pi \\pm \\alpha",
      },
      authoredExample: {
        prompt: "For what real \\(a\\) is \\(\\dfrac{a + 2i}{1 + i}\\) purely imaginary?",
        steps: [
          "Rationalise: \\(\\dfrac{(a + 2i)(1 - i)}{2} = \\dfrac{(a + 2) + i(2 - a)}{2}\\).",
          "Purely imaginary: real part \\(\\dfrac{a + 2}{2} = 0 \\Rightarrow a = -2\\).",
        ],
        answer: "\\(a = -2\\)",
      },
      selfCheckExample: {
        prompt: "For what real \\(k\\) is \\((2 + ki)(3 - i)\\) purely real?",
        steps: [
          "Expand: \\(6 - 2i + 3ki - ki^2 = (6 + k) + i(3k - 2)\\).",
          "Purely real: \\(3k - 2 = 0 \\Rightarrow k = \\dfrac23\\).",
        ],
        answer: "\\(k = \\dfrac23\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(i^{3}\\) purely imaginary?",
          answer: "Yes (\\(= -i\\)).",
        },
        {
          prompt: "Real part of \\(\\dfrac{1}{1 + i}\\)?",
          answer: "\\(\\dfrac12\\)",
        },
        {
          prompt: "\\(\\sin^2\\theta = \\dfrac34\\) gives \\(\\theta = ?\\)",
          answer: "\\(n\\pi \\pm \\dfrac{\\pi}{3}\\)",
        },
        {
          prompt: "\\((1 + i)^2\\) is purely?",
          answer: "Imaginary (\\(= 2i\\)).",
        },
      ],
      pyqExampleId: "9295bfb4-3524-45b9-b300-a516789ecf53",
      traps: [
        {
          title: "Setting the imaginary part to zero for 'purely imaginary'",
          body:
            "Purely imaginary means NO real part. The condition is \\(\\operatorname{Re} = 0\\); solving \\(\\operatorname{Im} = 0\\) gives \\(\\theta = n\\pi\\), which is offered as option (D).",
        },
      ],
    },

    // 4 — solve for z with a parameter
    {
      kind: "formula" as const,
      slug: "cetcn-solve-for-z-with-a-parameter",
      name: "Solving for z: Put z = x + iy and Equate Parts",
      intuition:
        "An equation in \\(z\\) is two real equations in disguise — one from the real parts, one from the imaginary parts. With \\(z = x + iy\\) (and any given value of \\(x\\) or \\(y\\) substituted early), the two equations fix the unknowns.",
      definition:
        "- \\(\\dfrac{2z - n}{2z + n} = 2i - 1\\): cross-multiply, \\(2z - n = (2i - 1)(2z + n)\\), collect \\(z\\): \\(4z(1 - i) = 2in\\), so \\(z = \\dfrac{in}{2(1 - i)} = \\dfrac{in(1 + i)}{4} = -\\dfrac{n}{4} + \\dfrac{n}{4}i\\).\n" +
        "- Given \\(\\operatorname{Im}z = 10\\): \\(\\dfrac{n}{4} = 10 \\Rightarrow n = 40\\), and then \\(\\operatorname{Re}z = -10\\).\n" +
        "- Alternatively substitute \\(z = x + 10i\\) at the start and equate parts of \\((2x - n) + 20i = (2i - 1)(2x + n + 20i)\\).\n" +
        "- Either way the answer is a pair \\((n, \\operatorname{Re}z)\\); check both against the option.",
      formula: {
        label: "Equating parts",
        latex:
          "a + ib = c + id \\iff a = c \\text{ and } b = d \\qquad \\frac{1}{1 - i} = \\frac{1 + i}{2}",
      },
      authoredExample: {
        prompt: "Solve \\(\\dfrac{z - 2}{z + 2} = i\\) for \\(z\\).",
        steps: [
          "\\(z - 2 = iz + 2i \\Rightarrow z(1 - i) = 2 + 2i\\).",
          "\\(z = \\dfrac{2(1 + i)}{1 - i} = \\dfrac{2(1 + i)^2}{2} = (1 + i)^2 = 2i\\).",
        ],
        answer: "\\(z = 2i\\)",
      },
      selfCheckExample: {
        prompt: "If \\(z = x + iy\\) satisfies \\((1 + i)z = 3 + i\\), find \\(x\\) and \\(y\\).",
        steps: [
          "\\(z = \\dfrac{3 + i}{1 + i} = \\dfrac{(3 + i)(1 - i)}{2} = \\dfrac{4 - 2i}{2} = 2 - i\\).",
        ],
        answer: "\\(x = 2,\\ y = -1\\)",
      },
      pyqExampleId: "42287c42-5627-472a-b6a8-cb8f9b92577b",
      traps: [
        {
          title: "Dividing by 1 − i without rationalising",
          body:
            "\\(\\dfrac{in}{2(1 - i)}\\) is not yet in standard form; multiply by \\(\\dfrac{1 + i}{1 + i}\\) first. Reading the real part off the un-rationalised form gives \\(\\operatorname{Re}z = 0\\) and a wrong sign on \\(n\\).",
        },
      ],
    },

    // 5 — minimal quadratic & polynomial values
    {
      kind: "formula" as const,
      slug: "cetcn-minimal-quadratic-and-polynomial-values",
      name: "A Polynomial at a Complex x: Use Its Minimal Quadratic, and Cube Expansions",
      intuition:
        "\\(x = 1 + 2i\\) satisfies \\(x^2 - 2x + 5 = 0\\). Divide the given polynomial by that quadratic; the remainder is the value, and substituting \\(1 + 2i\\) directly into a quartic is never necessary.",
      definition:
        "- From \\(x = a + ib\\): \\((x - a)^2 = -b^2\\), i.e. \\(x^2 - 2ax + (a^2 + b^2) = 0\\) — the **minimal quadratic**. For \\(x = 1 + 2i\\): \\(x^2 - 2x + 5 = 0\\); for \\(x = -2 + \\sqrt3 i\\): \\(x^2 + 4x + 7 = 0\\).\n" +
        "- Divide the polynomial by the quadratic (long division); \\(p(x) = q(x)\\cdot(\\text{quadratic}) + r(x)\\), and \\(p(x) = r(x)\\) at the root. \\(2x^4 + 5x^3 + 7x^2 - x + 38 = (x^2 + 4x + 7)(2x^2 - 3x + 5) + 3\\), so the value is \\(3\\).\n" +
        "- **Cubes**: \\(\\left(-2 - \\frac13 i\\right)^3 = \\dfrac{(-6 - i)^3}{27}\\) and \\((-6 - i)^3 = -216 - 108i + 18 + i = -198 - 107i\\) by the binomial expansion with \\(i^2 = -1\\), \\(i^3 = -i\\).\n" +
        "- **Cube root written as \\(p + iq\\)**: \\(z = (p + iq)^3 = (p^3 - 3pq^2) + i(3p^2q - q^3)\\), so \\(\\dfrac{x}{p} + \\dfrac{y}{q} = (p^2 - 3q^2) + (3p^2 - q^2) = 4(p^2 - q^2)\\).",
      formula: {
        label: "Minimal quadratic and the cube",
        latex:
          "x = a + ib \\Rightarrow x^2 - 2ax + (a^2 + b^2) = 0 \\qquad (p + iq)^3 = (p^3 - 3pq^2) + i(3p^2q - q^3)",
      },
      authoredExample: {
        prompt: "If \\(x = 2 + i\\), find the value of \\(x^3 - 3x^2 + 4x + 1\\).",
        steps: [
          "Minimal quadratic: \\((x - 2)^2 = -1 \\Rightarrow x^2 - 4x + 5 = 0\\).",
          "Divide: \\(x^3 - 3x^2 + 4x + 1 = (x^2 - 4x + 5)(x + 1) + (3x - 4)\\). Check: \\((x^2 - 4x + 5)(x + 1) = x^3 - 3x^2 + x + 5\\); remainder \\(3x - 4\\).",
          "Value \\(= 3(2 + i) - 4 = 2 + 3i\\).",
        ],
        answer: "\\(2 + 3i\\)",
      },
      selfCheckExample: {
        prompt: "Expand \\((1 - 2i)^3\\).",
        steps: [
          "\\((1 - 2i)^3 = 1 - 3(2i) + 3(2i)^2 - (2i)^3 = 1 - 6i - 12 + 8i\\).",
        ],
        answer: "\\(-11 + 2i\\)",
      },
      practiceSet: [
        {
          prompt: "Minimal quadratic of \\(x = 3 - i\\)?",
          answer: "\\(x^2 - 6x + 10 = 0\\)",
        },
        {
          prompt: "\\((1 + i)^3 = ?\\)",
          answer: "\\(-2 + 2i\\)",
        },
        {
          prompt: "If \\(x^2 - 2x + 5 = 0\\), then \\(x^2 = ?\\)",
          answer: "\\(2x - 5\\)",
        },
        {
          prompt: "Real part of \\((p + iq)^3\\)?",
          answer: "\\(p^3 - 3pq^2\\)",
        },
      ],
      pyqExampleId: "7d995954-9e62-4202-9e38-ebb2c8faf200",
      traps: [
        {
          title: "Substituting the complex number directly",
          body:
            "Raising \\(1 + 2i\\) to the fourth power by hand invites a sign error at every step. The minimal quadratic reduces the polynomial to its remainder in two lines of long division.",
        },
      ],
    },

    // 6 — cube roots of unity
    {
      kind: "formula" as const,
      slug: "cetcn-cube-roots-of-unity",
      name: "Cube Roots of Unity: ω³ = 1 and 1 + ω + ω² = 0",
      intuition:
        "\\(z^3 = 1\\) has three roots: \\(1\\), \\(\\omega\\) and \\(\\omega^2\\), spaced \\(120^\\circ\\) apart on the unit circle. Two facts — \\(\\omega^3 = 1\\) and \\(1 + \\omega + \\omega^2 = 0\\) — reduce any expression in \\(\\omega\\) to a number times \\(\\omega\\) or \\(\\omega^2\\).",
      definition:
        "- \\(\\omega = \\dfrac{-1 + i\\sqrt3}{2}\\), \\(\\omega^2 = \\dfrac{-1 - i\\sqrt3}{2} = \\bar\\omega\\); either may be called \\(\\omega\\) in a stem.\n" +
        "- \\(\\omega^3 = 1\\): reduce every exponent modulo \\(3\\) — \\(\\omega^4 = \\omega\\), \\(\\omega^{100} = \\omega\\). \\(1 + \\omega + \\omega^2 = 0\\): so \\(1 + \\omega = -\\omega^2\\), \\(\\omega + \\omega^2 = -1\\), \\(\\dfrac1\\omega = \\omega^2\\).\n" +
        "- \\(3 + \\omega + 3\\omega^2 = 3(1 + \\omega^2) + \\omega = -3\\omega + \\omega = -2\\omega\\), so \\((3 + \\omega + 3\\omega^2)^4 = 16\\omega^4 = 16\\omega\\).\n" +
        "- \\(z^2 + z + 1 = 0\\) means \\(z = \\omega\\): then \\(z^3 + z^{-3} = 2\\) and \\(z^4 + z^{-4} = \\omega + \\omega^2 = -1\\).\n" +
        "- **Determinants in \\(\\omega\\)**: a row or column summing to \\(1 + \\omega + \\omega^2 = 0\\) makes the determinant \\(0\\) (add all columns into one); otherwise expand and reduce — \\(\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & \\omega & \\omega^2 \\\\ 1 & \\omega^2 & \\omega \\end{vmatrix} = 3\\omega(\\omega - 1)\\) after replacing \\(-1 - \\omega^2\\) by \\(\\omega\\) and \\(\\omega^4\\) by \\(\\omega\\).",
      formula: {
        label: "The two facts",
        latex:
          "\\omega^3 = 1, \\qquad 1 + \\omega + \\omega^2 = 0, \\qquad \\omega^n = \\omega^{\\,n \\bmod 3}, \\qquad \\bar\\omega = \\omega^2 = \\frac{1}{\\omega}",
      },
      visualizationSlug: "cn-cube-roots-circle",
      authoredExample: {
        prompt: "Evaluate \\((1 + \\omega - \\omega^2)^{3}\\).",
        steps: [
          "\\(1 + \\omega = -\\omega^2\\), so \\(1 + \\omega - \\omega^2 = -2\\omega^2\\).",
          "\\((-2\\omega^2)^3 = -8\\omega^6 = -8(\\omega^3)^2 = -8\\).",
        ],
        answer: "\\(-8\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\omega^{2025} + \\omega^{2026} + \\omega^{2027}\\).",
        steps: [
          "\\(2025 = 3\\cdot675\\), so the three exponents are \\(0, 1, 2 \\pmod 3\\): the sum is \\(1 + \\omega + \\omega^2\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\omega^{10} = ?\\)",
          answer: "\\(\\omega\\)",
        },
        {
          prompt: "\\((1 + \\omega)(1 + \\omega^2) = ?\\)",
          answer: "\\(1\\)",
          method: "\\((-\\omega^2)(-\\omega) = \\omega^3\\).",
        },
        {
          prompt: "\\(\\omega + \\omega^2 = ?\\)",
          answer: "\\(-1\\)",
        },
        {
          prompt: "Determinant with rows \\((1, \\omega, \\omega^2)\\), \\((\\omega, \\omega^2, 1)\\), \\((\\omega^2, 1, \\omega)\\)?",
          answer: "\\(0\\)",
          method: "Every row sums to \\(0\\).",
        },
      ],
      pyqExampleId: "5e510c0d-ad56-4905-a6f8-e2cb4956a0ae",
      traps: [
        {
          title: "Stopping at ω⁴",
          body:
            "\\(16\\omega^4\\) is not an option; \\(16\\omega\\) is. Reduce every exponent modulo \\(3\\) before matching, and remember \\(\\omega^2\\) is a different option from \\(\\omega\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Modulus and Argument — the geometric reading of z̄ and of multiplication",
      href: "/notes/mht-cet-maths/complex-numbers/cetcn-modulus-argument-polar",
    },
    {
      label: "Determinants — expanding a 3 × 3 determinant, for the ω determinants",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-determinants-and-adjoint",
    },
  ],
};
