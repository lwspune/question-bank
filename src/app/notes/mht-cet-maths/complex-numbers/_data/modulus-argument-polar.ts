import type { SubtopicNote } from "@/app/notes/_types";

export const MODULUS_ARGUMENT_POLAR_NOTE: SubtopicNote = {
  subtopicName: "Modulus and Argument — Polar Form, De Moivre and Square Roots",
  title: "Modulus and Argument — Polar Form, De Moivre and Square Roots",
  oneLineDefinition:
    "|z| is the distance from the origin and arg z the angle from the positive real axis — the modulus multiplies and divides, the argument adds and subtracts, and z = r(cos θ + i sin θ) makes powers routine.",
  whyItMatters:
    "18 PYQs at 28% HARD — the chapter's biggest page and its softest, which is why it is the half worth owning. " +
    "The modulus of a product or quotient of factors is asked every year and needs no expansion at all; the argument questions are wrong only when the quadrant is ignored; and |z| + z = a + ib has been set four times with two different right-hand sides. " +
    "Three stems here were repaired against the papers this session: a magnitude that belonged to the twin sitting, an argument denominator, and a key that pointed at the twin's answer.",
  concepts: [
    // 1 — modulus properties
    {
      kind: "formula" as const,
      slug: "cetcn-modulus-and-its-properties",
      name: "Modulus and Its Properties: |z₁z₂| = |z₁||z₂|",
      intuition:
        "\\(|z| = \\sqrt{x^2 + y^2}\\) is the length of the arrow from \\(0\\) to \\(z\\). Lengths multiply when complex numbers multiply and divide when they divide — so the modulus of a big product is computed factor by factor, never by expanding.",
      definition:
        "- \\(|x + iy| = \\sqrt{x^2 + y^2}\\); \\(|\\bar z| = |z|\\); \\(|z|^2 = z\\bar z\\).\n" +
        "- \\(|z_1z_2| = |z_1||z_2|\\), \\(\\left|\\dfrac{z_1}{z_2}\\right| = \\dfrac{|z_1|}{|z_2|}\\), \\(|z^n| = |z|^n\\). So \\(\\left|\\dfrac{(\\sqrt3 + i)^3(4 + 3i)^2}{(8 + 6i)^2}\\right| = \\dfrac{2^3\\cdot5^2}{10^2} = 2\\).\n" +
        "- \\(|z_1 + z_2| \\ne |z_1| + |z_2|\\) in general (triangle inequality: \\(\\le\\)).\n" +
        "- **Modulus of a square root**: if \\(w^2 = z\\) then \\(|w|^2 = |z|\\), so \\(|\\sqrt z| = \\sqrt{|z|}\\). For \\(6 + 8i\\): \\(\\sqrt{10}\\); for the conjugate of \\(-7 + 24i\\): \\(\\sqrt{25} = 5\\).\n" +
        "- Memorise the Pythagorean moduli: \\(|3 + 4i| = 5\\), \\(|8 + 6i| = 10\\), \\(|5 + 12i| = 13\\), \\(|7 + 24i| = 25\\), \\(|\\sqrt3 + i| = 2\\), \\(|1 + i| = \\sqrt2\\).",
      formula: {
        label: "Modulus rules",
        latex:
          "|z_1z_2| = |z_1||z_2| \\qquad \\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|} \\qquad |z^n| = |z|^n \\qquad |\\sqrt z| = \\sqrt{|z|}",
      },
      authoredExample: {
        prompt: "Find \\(|z|\\) for \\(z = \\dfrac{(1 + i)^4(5 + 12i)}{(3 - 4i)^2}\\).",
        steps: [
          "\\(|1 + i| = \\sqrt2\\), so \\(|(1 + i)^4| = 4\\); \\(|5 + 12i| = 13\\); \\(|3 - 4i| = 5\\), so \\(|(3 - 4i)^2| = 25\\).",
          "\\(|z| = \\dfrac{4\\cdot13}{25} = \\dfrac{52}{25}\\).",
        ],
        answer: "\\(\\dfrac{52}{25}\\)",
      },
      selfCheckExample: {
        prompt: "Find the modulus of the square root of \\(5 - 12i\\).",
        steps: [
          "\\(|5 - 12i| = 13\\), so \\(|\\sqrt{5 - 12i}| = \\sqrt{13}\\).",
        ],
        answer: "\\(\\sqrt{13}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(|3 - 4i| = ?\\)",
          answer: "\\(5\\)",
        },
        {
          prompt: "\\(|(1 + i)^{10}| = ?\\)",
          answer: "\\(32\\)",
          method: "\\((\\sqrt2)^{10}\\).",
        },
        {
          prompt: "\\(\\left|\\dfrac{2 + i}{2 - i}\\right| = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(|\\sqrt{-7 + 24i}| = ?\\)",
          answer: "\\(5\\)",
        },
      ],
      pyqExampleId: "fc83f271-76d6-491c-9213-d6b0bb8d5355",
      traps: [
        {
          title: "Expanding the product to find its modulus",
          body:
            "\\((\\sqrt3 + i)^3(4 + 3i)^2\\) expanded is a page of algebra with several sign traps. Moduli multiply: \\(2^3\\cdot5^2\\). Never expand for a modulus.",
        },
      ],
    },

    // 2 — argument and quadrant
    {
      kind: "formula" as const,
      slug: "cetcn-argument-and-quadrant",
      name: "The Argument: Reference Angle Plus the Quadrant",
      intuition:
        "\\(\\tan^{-1}\\dfrac{y}{x}\\) only gives a reference angle; the quadrant of the point decides whether to keep it, add \\(\\pi\\), or subtract from \\(\\pi\\). \\(-\\dfrac12 + \\dfrac{\\sqrt3}{2}i\\) is in the second quadrant, so its argument is \\(\\pi - \\dfrac{\\pi}{3}\\), not \\(-\\dfrac{\\pi}{3}\\).",
      definition:
        "- \\(\\arg z = \\theta\\) with \\(\\cos\\theta = \\dfrac{x}{|z|}\\), \\(\\sin\\theta = \\dfrac{y}{|z|}\\); principal value in \\((-\\pi, \\pi]\\).\n" +
        "- **Quadrant rule** with reference angle \\(\\alpha = \\tan^{-1}\\left|\\dfrac{y}{x}\\right|\\): I → \\(\\alpha\\); II → \\(\\pi - \\alpha\\); III → \\(-(\\pi - \\alpha)\\) (or \\(\\pi + \\alpha\\) if \\([0, 2\\pi)\\) is used); IV → \\(-\\alpha\\).\n" +
        "- **Rationalise first** when \\(z\\) is a fraction: \\(\\dfrac{-2}{1 + \\sqrt3 i} = -\\dfrac12 + \\dfrac{\\sqrt3}{2}i\\), argument \\(\\dfrac{2\\pi}{3}\\).\n" +
        "- \\(\\arg(z_1z_2) = \\arg z_1 + \\arg z_2\\), \\(\\arg\\dfrac{z_1}{z_2} = \\arg z_1 - \\arg z_2\\): \\(\\arg\\dfrac{1 + i\\sqrt3}{\\sqrt3 - i} = \\dfrac{\\pi}{3} - \\left(-\\dfrac{\\pi}{6}\\right) = \\dfrac{\\pi}{2}\\) — or rationalise to \\(i\\) directly.\n" +
        "- When the argument is not a standard angle, leave it as \\(\\tan^{-1}\\) of the simplified ratio: \\(\\dfrac{z_1 + z_2}{z_1 - z_2} = \\dfrac{19 + 22i}{13}\\) has argument \\(\\tan^{-1}\\dfrac{22}{19}\\).",
      formula: {
        label: "Argument rules",
        latex:
          "\\arg(z_1z_2) = \\arg z_1 + \\arg z_2 \\qquad \\arg\\frac{z_1}{z_2} = \\arg z_1 - \\arg z_2 \\qquad \\arg\\bar z = -\\arg z",
      },
      visualizationSlug: "cn-argand-plane",
      authoredExample: {
        prompt: "Find the argument of \\(z = \\dfrac{-4}{1 + i}\\).",
        steps: [
          "Rationalise: \\(z = \\dfrac{-4(1 - i)}{2} = -2 + 2i\\).",
          "Second quadrant, reference angle \\(\\tan^{-1}1 = \\dfrac{\\pi}{4}\\); argument \\(\\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
        ],
        answer: "\\(\\dfrac{3\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Find the argument of \\(\\dfrac{1 + i}{\\sqrt3 + i}\\).",
        steps: [
          "\\(\\arg(1 + i) = \\dfrac{\\pi}{4}\\), \\(\\arg(\\sqrt3 + i) = \\dfrac{\\pi}{6}\\).",
          "Difference \\(\\dfrac{\\pi}{4} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{12}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{12}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\arg(-1 + i) = ?\\)",
          answer: "\\(\\dfrac{3\\pi}{4}\\)",
        },
        {
          prompt: "\\(\\arg(-\\sqrt3 - i) = ?\\)",
          answer: "\\(-\\dfrac{5\\pi}{6}\\)",
        },
        {
          prompt: "\\(\\arg(i) = ?\\)",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
        {
          prompt: "\\(\\arg\\dfrac{1 + i\\sqrt3}{\\sqrt3 - i} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{2}\\)",
        },
      ],
      pyqExampleId: "2cfda9a1-e93f-4b2e-bcc9-073f3a7b211c",
      traps: [
        {
          title: "The argument from the ratio alone",
          body:
            "\\(\\tan^{-1}\\dfrac{\\sqrt3/2}{-1/2} = \\tan^{-1}(-\\sqrt3) = -\\dfrac{\\pi}{3}\\) is the fourth-quadrant answer for a second-quadrant point. Plot the point first; the un-adjusted angle is always an option.",
        },
      ],
    },

    // 3 — polar form and De Moivre
    {
      kind: "formula" as const,
      slug: "cetcn-polar-form-and-de-moivre",
      name: "Polar Form and De Moivre: Powers, Rotations and sin θ + i cos θ",
      intuition:
        "Write \\(z = r(\\cos\\theta + i\\sin\\theta)\\). Then \\(z^n = r^n(\\cos n\\theta + i\\sin n\\theta)\\): multiply the angle, raise the modulus. Multiplying by \\(i\\) is a rotation by \\(\\dfrac{\\pi}{2}\\), which is how a 'particle moves through an angle' stem is answered.",
      definition:
        "- **Polar coordinates**: \\((-2\\sqrt3, 2)\\) has \\(r = 4\\) and, being in quadrant II, \\(\\theta = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}\\).\n" +
        "- **De Moivre**: \\((\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta\\) for any integer \\(n\\).\n" +
        "- \\(\\sin\\theta + i\\cos\\theta = i(\\cos\\theta - i\\sin\\theta) = i\\,e^{-i\\theta}\\) — NOT a polar form as written. So \\(\\dfrac{(\\cos\\theta + i\\sin\\theta)^4}{(\\sin\\theta + i\\cos\\theta)^5} = \\dfrac{e^{4i\\theta}}{i\\,e^{-5i\\theta}} = -i\\,e^{9i\\theta} = \\sin 9\\theta - i\\cos 9\\theta\\).\n" +
        "- **Rotation**: multiplying \\(z\\) by \\(i\\) rotates it \\(\\dfrac{\\pi}{2}\\) anticlockwise about the origin: \\((x, y) \\to (-y, x)\\). Translations are additions: 'moves \\(5\\) units horizontally' is \\(z + 5\\); '\\(\\sqrt2\\) units along \\(\\hat i + \\hat j\\)' is \\(z + (1 + i)\\).",
      formula: {
        label: "De Moivre and the rotation by i",
        latex:
          "(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta \\qquad iz \\text{ is } z \\text{ rotated by } \\tfrac{\\pi}{2} \\qquad \\sin\\theta + i\\cos\\theta = i(\\cos\\theta - i\\sin\\theta)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\left(\\cos\\dfrac{\\pi}{9} + i\\sin\\dfrac{\\pi}{9}\\right)^{6}\\).",
        steps: [
          "De Moivre: \\(\\cos\\dfrac{6\\pi}{9} + i\\sin\\dfrac{6\\pi}{9} = \\cos\\dfrac{2\\pi}{3} + i\\sin\\dfrac{2\\pi}{3}\\).",
        ],
        answer: "\\(-\\dfrac12 + \\dfrac{\\sqrt3}{2}i\\)",
      },
      selfCheckExample: {
        prompt: "A point starts at \\(z_0 = 3 + i\\), moves \\(2\\) units to the left, then is rotated by \\(\\dfrac{\\pi}{2}\\) anticlockwise about the origin. Where does it end?",
        steps: [
          "Move left: \\(3 + i - 2 = 1 + i\\).",
          "Rotate by \\(\\dfrac{\\pi}{2}\\): multiply by \\(i\\): \\(i(1 + i) = -1 + i\\).",
        ],
        answer: "\\(-1 + i\\)",
      },
      practiceSet: [
        {
          prompt: "Polar coordinates of \\((1, \\sqrt3)\\)?",
          answer: "\\(\\left(2, \\dfrac{\\pi}{3}\\right)\\)",
        },
        {
          prompt: "\\((\\cos\\theta + i\\sin\\theta)^{-1} = ?\\)",
          answer: "\\(\\cos\\theta - i\\sin\\theta\\)",
        },
        {
          prompt: "\\(i(2 + 3i) = ?\\), and what rotation is it?",
          answer: "\\(-3 + 2i\\); a quarter turn anticlockwise.",
        },
        {
          prompt: "\\(\\sin\\theta + i\\cos\\theta\\) in the form \\(i\\times(\\cdot)\\)?",
          answer: "\\(i(\\cos\\theta - i\\sin\\theta)\\)",
        },
      ],
      pyqExampleId: "40077a87-8baa-4e74-b6f9-a00183eb4df6",
      traps: [
        {
          title: "Applying De Moivre to sin θ + i cos θ",
          body:
            "\\((\\sin\\theta + i\\cos\\theta)^5\\) is NOT \\(\\sin 5\\theta + i\\cos 5\\theta\\). Rewrite it as \\(i(\\cos\\theta - i\\sin\\theta)\\) first; the \\(i^5 = i\\) in front is where the final \\(\\sin 9\\theta - i\\cos 9\\theta\\) comes from.",
        },
      ],
    },

    // 4 — |z| + z = a + ib
    {
      kind: "formula" as const,
      slug: "cetcn-modulus-plus-z-equation",
      name: "|z| + z = a + ib: Equate the Imaginary Part, Then Solve for |z|",
      intuition:
        "\\(|z|\\) is real, so in \\(|z| + z = a + ib\\) the imaginary part of \\(z\\) must be \\(b\\), and \\(|z| + x = a\\). Substituting \\(|z| = \\sqrt{x^2 + b^2}\\) gives one equation in \\(x\\) whose \\(x^2\\) terms cancel.",
      definition:
        "- Put \\(z = x + iy\\): \\(y = b\\) and \\(\\sqrt{x^2 + b^2} = a - x\\).\n" +
        "- Square: \\(x^2 + b^2 = a^2 - 2ax + x^2 \\Rightarrow x = \\dfrac{a^2 - b^2}{2a}\\), and then \\(|z| = a - x = \\dfrac{a^2 + b^2}{2a}\\).\n" +
        "- \\(|z| + z = 2 + i\\): \\(|z| = \\dfrac{4 + 1}{4} = \\dfrac54\\). \\(|z| + z = 3 + i\\): \\(|z| = \\dfrac{9 + 1}{6} = \\dfrac53\\).\n" +
        "- Both versions have been set; the two answers \\(\\dfrac54\\) and \\(\\dfrac53\\) appear in each other's option lists, and the 2022 sitting's stored key once pointed at the wrong one.",
      formula: {
        label: "Closed form",
        latex:
          "|z| + z = a + ib \\ \\Rightarrow\\ \\operatorname{Im}z = b,\\quad |z| = \\frac{a^2 + b^2}{2a}",
      },
      authoredExample: {
        prompt: "If \\(|z| + z = 4 + 2i\\), find \\(|z|\\).",
        steps: [
          "\\(y = 2\\) and \\(\\sqrt{x^2 + 4} = 4 - x\\).",
          "\\(x^2 + 4 = 16 - 8x + x^2 \\Rightarrow x = \\dfrac32\\), so \\(|z| = 4 - \\dfrac32 = \\dfrac52\\). (Closed form: \\(\\dfrac{16 + 4}{8} = \\dfrac52\\).)",
        ],
        answer: "\\(\\dfrac52\\)",
      },
      selfCheckExample: {
        prompt: "If \\(|z| - z = 1 + 2i\\), find \\(|z|\\).",
        steps: [
          "\\(-y = 2 \\Rightarrow y = -2\\); \\(|z| - x = 1 \\Rightarrow \\sqrt{x^2 + 4} = 1 + x\\).",
          "\\(x^2 + 4 = 1 + 2x + x^2 \\Rightarrow x = \\dfrac32\\), so \\(|z| = 1 + \\dfrac32 = \\dfrac52\\).",
        ],
        answer: "\\(\\dfrac52\\)",
      },
      practiceSet: [
        {
          prompt: "\\(|z| + z = 2 + i\\): \\(|z| = ?\\)",
          answer: "\\(\\dfrac54\\)",
        },
        {
          prompt: "\\(|z| + z = 3 + i\\): \\(|z| = ?\\)",
          answer: "\\(\\dfrac53\\)",
        },
        {
          prompt: "In \\(|z| + z = a + ib\\), \\(\\operatorname{Im}z = ?\\)",
          answer: "\\(b\\)",
        },
        {
          prompt: "\\(|z| + z = 5 + 5i\\): \\(|z| = ?\\)",
          answer: "\\(5\\)",
          method: "\\((25 + 25)/10\\).",
        },
      ],
      pyqExampleId: "8b8503ba-fdc4-4596-89a4-05a5b74863fa",
      traps: [
        {
          title: "Answering the twin sitting's value",
          body:
            "\\(\\frac54\\) belongs to \\(2 + i\\) and \\(\\frac53\\) to \\(3 + i\\); each list offers both. Read the right-hand side before recalling the number.",
        },
      ],
    },

    // 5 — find z from a given modulus
    {
      kind: "formula" as const,
      slug: "cetcn-find-z-from-a-given-modulus",
      name: "Find z From a Given Modulus: Simplify, Then Fix the Parameter",
      intuition:
        "\\(z = \\dfrac{(1 + i)^2}{a - i}\\) simplifies to \\(\\dfrac{2i}{a - i}\\), whose modulus is \\(\\dfrac{2}{\\sqrt{a^2 + 1}}\\). A given magnitude fixes \\(a\\); then rationalising gives \\(z\\), and the stem may ask for \\(z\\) or \\(\\bar z\\).",
      definition:
        "- Simplify the numerator: \\((1 + i)^2 = 2i\\). Then \\(|z| = \\dfrac{|2i|}{|a - i|} = \\dfrac{2}{\\sqrt{a^2 + 1}}\\) — moduli divide, no rationalising needed yet.\n" +
        "- \\(|z| = \\dfrac{2}{\\sqrt5}\\) gives \\(a = 2\\); \\(|z| = \\sqrt{\\dfrac25}\\) gives \\(a = 3\\). Two sittings used the two magnitudes, and their option lists differ accordingly.\n" +
        "- Then \\(z = \\dfrac{2i(a + i)}{a^2 + 1} = \\dfrac{-2 + 2ai}{a^2 + 1}\\): with \\(a = 2\\), \\(z = -\\dfrac25 + \\dfrac45 i\\); with \\(a = 3\\), \\(z = -\\dfrac15 + \\dfrac35 i\\) and \\(\\bar z = -\\dfrac15 - \\dfrac35 i\\).\n" +
        "- A modulus expression can also replace the algebra entirely: for \\(a + ib = \\dfrac{3}{2 + \\cos\\theta + i\\sin\\theta}\\), \\((a - 2)^2 + b^2 = |a + ib - 2|^2 = \\left|\\dfrac{3 - 2w}{w}\\right|^2\\) with \\(w = 2 + e^{i\\theta}\\); since \\(|3 - 2w| = |{-1} - 2e^{i\\theta}| = |w|\\) (both equal \\(\\sqrt{5 + 4\\cos\\theta}\\)), the value is \\(1\\).",
      formula: {
        label: "Modulus first, algebra second",
        latex:
          "\\left|\\frac{(1 + i)^2}{a - i}\\right| = \\frac{2}{\\sqrt{a^2 + 1}} \\qquad |2 + \\cos\\theta + i\\sin\\theta|^2 = 5 + 4\\cos\\theta",
      },
      authoredExample: {
        prompt: "If \\(a > 0\\) and \\(z = \\dfrac{(1 - i)^2}{a + i}\\) has modulus \\(\\dfrac{2}{\\sqrt{10}}\\), find \\(z\\).",
        steps: [
          "\\((1 - i)^2 = -2i\\), so \\(|z| = \\dfrac{2}{\\sqrt{a^2 + 1}} = \\dfrac{2}{\\sqrt{10}} \\Rightarrow a = 3\\).",
          "\\(z = \\dfrac{-2i}{3 + i} = \\dfrac{-2i(3 - i)}{10} = \\dfrac{-6i + 2i^2}{10} = \\dfrac{-2 - 6i}{10}\\).",
        ],
        answer: "\\(z = -\\dfrac15 - \\dfrac35 i\\)",
      },
      selfCheckExample: {
        prompt: "If \\(z = \\dfrac{4}{a - 2i}\\), \\(a > 0\\), has modulus \\(\\dfrac{4}{\\sqrt{13}}\\), find \\(a\\) and \\(\\operatorname{Re}z\\).",
        steps: [
          "\\(|z| = \\dfrac{4}{\\sqrt{a^2 + 4}} = \\dfrac{4}{\\sqrt{13}} \\Rightarrow a = 3\\).",
          "\\(z = \\dfrac{4(3 + 2i)}{13}\\), so \\(\\operatorname{Re}z = \\dfrac{12}{13}\\).",
        ],
        answer: "\\(a = 3,\\ \\operatorname{Re}z = \\dfrac{12}{13}\\)",
      },
      pyqExampleId: "535cd736-e7c1-4923-ae20-b368455abd23",
      traps: [
        {
          title: "z or z̄?",
          body:
            "The 2023 sitting asks for \\(\\bar z\\) and the 2024 sitting for \\(z\\), with sign-flipped options in each. Compute \\(z\\), then read the last word of the stem before choosing.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Locus in the Argand Plane — |z − a| = r as a circle",
      href: "/notes/mht-cet-maths/complex-numbers/cetcn-locus",
    },
    {
      label: "Algebra of Complex Numbers — the conjugate multiplication every argument question starts with",
      href: "/notes/mht-cet-maths/complex-numbers/cetcn-algebra-and-cube-roots",
    },
  ],
};
