import type { SubtopicNote } from "@/app/notes/_types";

export const SINE_COSINE_RULES_NOTE: SubtopicNote = {
  subtopicName: "Sine and Cosine Rules — Solving Triangles",
  title: "Sine & Cosine Rules — Solving Triangles",
  oneLineDefinition:
    "The sine rule links each side to the sine of its opposite angle (and to the circumradius); the cosine rule links one side to the other two and their included angle. Together they let you find any missing side, angle, or area.",
  whyItMatters:
    "The chapter's largest and hardest pocket (29 PYQs, 13 HARD). Once you fix the notation — side a opposite angle A — almost every question is 'which rule fits the given data?': sine rule when you have an angle and its opposite side, cosine rule when you have all three sides or two sides and the included angle.",
  concepts: [
    // FOUNDATION — notation (viz)
    {
      kind: "formula" as const,
      slug: "pt-triangle-notation",
      name: "Triangle Notation & Basic Relations",
      intuition:
        "Everything in this chapter rides on one convention: name each side with the lower-case letter of the angle OPPOSITE it. With that fixed, the angle sum and a few derived quantities (semi-perimeter, circumradius, inradius) give you a common language for every formula.",
      definition:
        "For triangle \\(ABC\\), the side opposite vertex \\(A\\) is \\(a = BC\\), opposite \\(B\\) is \\(b = CA\\), opposite \\(C\\) is \\(c = AB\\). Standard quantities:\n" +
        "- **Angle sum:** \\(A + B + C = \\pi\\) (so any one angle is determined by the other two).\n" +
        "- **Semi-perimeter:** \\(s = \\dfrac{a+b+c}{2}\\).\n" +
        "- **Circumradius \\(R\\)** (radius of the circle through all three vertices) and **inradius \\(r\\)** (radius of the circle touching all three sides).\n" +
        "- **Largest side faces the largest angle**, and the longest side is opposite the obtuse angle if there is one — a quick orientation check.",
      formula: {
        label: "Angle sum & semi-perimeter",
        latex: "A + B + C = \\pi, \\qquad s = \\dfrac{a+b+c}{2}",
      },
      visualizationSlug: "pt-triangle-labeled",
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(A = 50^\\circ\\) and \\(B = 60^\\circ\\). Which side is the longest?",
        steps: [
          "\\(C = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ\\) is the largest angle.",
          "The longest side faces the largest angle, so side \\(c\\) (opposite \\(C\\)) is longest.",
        ],
        answer: "Side \\(c\\) (\\(= AB\\)).",
      },
      practiceSet: [
        { prompt: "If \\(A = 90^\\circ\\), which side is the hypotenuse?", answer: "\\(a\\) (opposite the right angle).", method: "Largest angle faces the largest side." },
        { prompt: "Sides \\(5, 7, 8\\): which angle is largest?", answer: "The angle opposite \\(8\\).", method: "Largest side faces the largest angle." },
      ],
    },

    // sine rule
    {
      kind: "formula" as const,
      slug: "pt-sine-rule",
      name: "The Sine Rule",
      pyqExampleId: "4dfbde97-b43e-44a4-98d0-c6e307d979cd",
      intuition:
        "The ratio of a side to the sine of its opposite angle is the same for all three sides — and equals the diameter of the circumcircle. Use it whenever you know an angle and the side facing it.",
      definition:
        "For any triangle,\n" +
        "\\[\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R.\\]\n" +
        "Consequences: \\(a = 2R\\sin A\\), so the sides are proportional to the sines of the opposite angles; the perimeter is \\(2R(\\sin A + \\sin B + \\sin C)\\). Use the sine rule when you have an **angle and its opposite side** (plus one more angle or side). Beware the **ambiguous case**: knowing two sides and a non-included angle can give two valid triangles.",
      formula: {
        label: "Sine rule",
        latex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(A = 30^\\circ\\), \\(a = 5\\). Find the circumradius \\(R\\).",
        steps: [
          "Sine rule: \\(\\dfrac{a}{\\sin A} = 2R\\).",
          "\\(2R = \\dfrac{5}{\\sin 30^\\circ} = \\dfrac{5}{1/2} = 10\\).",
        ],
        answer: "\\(R = 5\\).",
      },
      practiceSet: [
        {
          prompt: "In \\(\\triangle ABC\\), \\(A = 30^\\circ\\), \\(B = 45^\\circ\\) and \\(a = 8\\). Find side \\(b\\).",
          answer: "\\(b = 8\\sqrt2\\).",
          method: "\\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}\\Rightarrow b = a\\,\\dfrac{\\sin B}{\\sin A} = 8\\cdot\\dfrac{1/\\sqrt2}{1/2} = 8\\sqrt2\\).",
        },
        {
          prompt: "In \\(\\triangle ABC\\), \\(B = 90^\\circ\\) and \\(b = 10\\). Find the circumradius \\(R\\).",
          answer: "\\(R = 5\\).",
          method: "\\(\\dfrac{b}{\\sin B} = 2R\\Rightarrow 2R = \\dfrac{10}{\\sin 90^\\circ} = 10\\), so \\(R = 5\\).",
        },
      ],
      traps: [
        {
          title: "Side over sine of its OWN opposite angle",
          body:
            "The sine rule pairs each side with the angle facing it: \\(\\frac{a}{\\sin A}\\), never \\(\\frac{a}{\\sin B}\\). Pairing a side with the wrong angle is the classic slip.",
        },
        {
          title: "The ratio is \\(2R\\), not \\(R\\)",
          body:
            "The common ratio \\(\\frac{a}{\\sin A}\\) equals the DIAMETER of the circumcircle, \\(2R\\) — not the radius \\(R\\). So \\(a = 2R\\sin A\\); forgetting the factor 2 halves your circumradius.",
        },
        {
          title: "The ambiguous SSA case can give TWO triangles",
          body:
            "Given two sides and a non-included angle, the sine rule can yield a sine value that fits two angles (\\(\\theta\\) and \\(180^\\circ-\\theta\\)), producing two valid triangles. Don't assume the answer is unique without checking the angle sum.",
        },
      ],
    },

    // cosine rule
    {
      kind: "formula" as const,
      slug: "pt-cosine-rule",
      name: "The Cosine Rule",
      pyqExampleId: "b9667d22-b6da-4750-a156-60efe1bf34e1",
      intuition:
        "The cosine rule is the Pythagorean theorem with a correction term for the angle. Use it when you have all three sides (to find an angle) or two sides and the angle between them (to find the third side).",
      definition:
        "For any triangle,\n" +
        "\\[c^2 = a^2 + b^2 - 2ab\\cos C, \\qquad \\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab},\\]\n" +
        "and cyclically for \\(A, B\\). The **sign of the cosine** reveals the angle: \\(\\cos C > 0\\) acute, \\(= 0\\) right (\\(c^2 = a^2 + b^2\\)), \\(< 0\\) obtuse. Once an angle's cosine is known, double/triple-angle formulas give \\(\\cos 2C\\), \\(\\cos 3C\\), etc.",
      formula: {
        label: "Cosine rule",
        latex: "\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\) with \\(a = 7,\\ b = 8,\\ c = 9\\), find \\(\\cos A\\).",
        steps: [
          "\\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = \\dfrac{64 + 81 - 49}{2\\cdot 8 \\cdot 9}\\).",
          "\\(= \\dfrac{96}{144}\\).",
        ],
        answer: "\\(\\cos A = \\dfrac{2}{3}\\).",
      },
      practiceSet: [
        {
          prompt: "A triangle has sides \\(3,\\ 5,\\ 7\\). Find its largest angle.",
          answer: "\\(120^\\circ\\).",
          method: "Largest angle faces side \\(7\\): \\(\\cos\\theta = \\dfrac{3^2+5^2-7^2}{2\\cdot3\\cdot5} = \\dfrac{-15}{30} = -\\tfrac12\\Rightarrow\\theta = 120^\\circ\\).",
        },
        {
          prompt: "In \\(\\triangle ABC\\), \\(b = 4,\\ c = 6,\\ A = 60^\\circ\\). Find side \\(a\\).",
          answer: "\\(a = 2\\sqrt7\\).",
          method: "\\(a^2 = b^2 + c^2 - 2bc\\cos A = 16 + 36 - 2\\cdot4\\cdot6\\cdot\\tfrac12 = 52 - 24 = 28\\), so \\(a = 2\\sqrt7\\).",
        },
      ],
      traps: [
        {
          title: "Put the opposite side as the one being squared on the left",
          body:
            "For angle \\(C\\), the formula has \\(c^2\\) (the side opposite \\(C\\)) isolated and \\(-2ab\\cos C\\). Mixing up which side is opposite the angle flips the sign of the cosine and the verdict on acute/obtuse.",
        },
        {
          title: "A negative cosine means an OBTUSE angle",
          body:
            "When \\(\\cos C = \\frac{a^2+b^2-c^2}{2ab}\\) comes out negative, the angle is obtuse (between \\(90^\\circ\\) and \\(180^\\circ\\)) — don't discard it as 'impossible'. It is acute only when the numerator \\(a^2+b^2-c^2 > 0\\).",
        },
      ],
    },

    // nature of triangle
    {
      kind: "formula" as const,
      slug: "pt-nature-of-triangle",
      name: "Determining the Nature of a Triangle",
      pyqExampleId: "2e4bd581-cdc3-49ca-9669-742c64f5e749",
      intuition:
        "Many questions hand you a relation among the sides or angles and ask 'what kind of triangle is it?'. The cosine rule (sign of a cosine) settles right vs obtuse; symmetric side conditions force equilateral or isosceles.",
      definition:
        "Tests for the type of triangle:\n" +
        "- **Right-angled:** \\(a^2 + b^2 = c^2\\) for the largest side \\(c\\); equivalently a cosine is 0, or \\(\\cos^2 A + \\cos^2 B + \\cos^2 C = 1\\), or \\(\\sin^2 A + \\sin^2 B + \\sin^2 C = 2\\).\n" +
        "- **Obtuse:** the largest side satisfies \\(c^2 > a^2 + b^2\\) (its cosine is negative).\n" +
        "- **Equilateral:** symmetric conditions like \\(a\\cos A = b\\cos B = c\\cos C\\) force \\(a = b = c\\).\n" +
        "- A condition like \\(c^2 = a^2 + b^2 + ab\\) gives \\(\\cos C = -\\tfrac12\\), so \\(C = 120^\\circ\\).",
      formula: {
        label: "Right-angle tests",
        latex: "c^2 = a^2 + b^2 \\iff C = 90^\\circ \\iff \\cos^2 A + \\cos^2 B + \\cos^2 C = 1",
      },
      authoredExample: {
        prompt: "The sides of a triangle are \\(p,\\ p,\\ p\\sqrt{2}\\). What is its nature?",
        steps: [
          "Check the largest side \\(p\\sqrt2\\): \\((p\\sqrt2)^2 = 2p^2\\) and \\(p^2 + p^2 = 2p^2\\).",
          "Since \\((p\\sqrt2)^2 = p^2 + p^2\\), the angle opposite it is \\(90^\\circ\\); the two equal sides make it isosceles.",
        ],
        answer: "Right-angled isosceles triangle.",
      },
      traps: [
        {
          title: "Test \\(a^2+b^2 = c^2\\) on the LARGEST side only",
          body:
            "The right-angle test \\(a^2 + b^2 = c^2\\) must use the largest side as \\(c\\). Plugging a shorter side in for \\(c\\) will fail even for a genuine right triangle — the right angle always faces the longest side.",
        },
      ],
    },

    // area
    {
      kind: "formula" as const,
      slug: "pt-area-of-triangle",
      name: "Area of a Triangle",
      pyqExampleId: "a13b4307-c04e-485d-a135-a3ab450c5b05",
      intuition:
        "Pick the area formula that matches your data: two sides and the included angle, or all three sides (Heron), or the circumradius, or the inradius and semi-perimeter. They all give the same Δ.",
      definition:
        "Let \\(\\Delta\\) be the area:\n" +
        "- **Two sides + included angle:** \\(\\Delta = \\tfrac12 ab\\sin C\\).\n" +
        "- **Three sides (Heron):** \\(\\Delta = \\sqrt{s(s-a)(s-b)(s-c)}\\).\n" +
        "- **Circumradius:** \\(\\Delta = \\dfrac{abc}{4R}\\).\n" +
        "- **Inradius:** \\(\\Delta = r s\\).",
      formula: {
        label: "Area formulas",
        latex: "\\Delta = \\tfrac12 ab\\sin C = \\sqrt{s(s-a)(s-b)(s-c)} = \\dfrac{abc}{4R} = rs",
      },
      authoredExample: {
        prompt: "Find the area of a triangle with sides \\(13,\\ 14,\\ 15\\).",
        steps: [
          "\\(s = \\tfrac{13+14+15}{2} = 21\\).",
          "Heron: \\(\\Delta = \\sqrt{21(21-13)(21-14)(21-15)} = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} = \\sqrt{7056}\\).",
        ],
        answer: "\\(\\Delta = 84\\).",
      },
      practiceSet: [
        {
          prompt: "Find the area of \\(\\triangle ABC\\) with \\(a = 6,\\ b = 8\\) and included angle \\(C = 30^\\circ\\).",
          answer: "\\(\\Delta = 12\\).",
          method: "Two sides + included angle: \\(\\Delta = \\tfrac12 ab\\sin C = \\tfrac12\\cdot6\\cdot8\\cdot\\sin30^\\circ = 24\\cdot\\tfrac12 = 12\\).",
        },
        {
          prompt: "A triangle has area \\(\\Delta = 30\\) and inradius \\(r = 2\\). Find its semi-perimeter \\(s\\).",
          answer: "\\(s = 15\\).",
          method: "\\(\\Delta = rs\\Rightarrow s = \\dfrac{\\Delta}{r} = \\dfrac{30}{2} = 15\\).",
        },
      ],
      traps: [
        {
          title: "Area uses \\(\\sin\\) of the angle, not \\(\\cos\\)",
          body:
            "The two-sides-and-included-angle area is \\(\\Delta = \\tfrac12 ab\\sin C\\). Writing \\(\\tfrac12 ab\\cos C\\) is a classic slip — \\(\\cos\\) belongs to the cosine rule, not the area.",
        },
        {
          title: "Heron's \\(s\\) is the SEMI-perimeter",
          body:
            "In \\(\\Delta = \\sqrt{s(s-a)(s-b)(s-c)}\\), \\(s = \\frac{a+b+c}{2}\\) — half the perimeter. Using the full perimeter \\(a+b+c\\) gives a badly wrong area.",
        },
      ],
    },

    // angles <-> sides relations
    {
      kind: "formula" as const,
      slug: "pt-angles-sides-relations",
      name: "Angle Ratios ↔ Side Ratios",
      pyqExampleId: "f90c8cbb-ab31-4ff6-9be8-c592495b57e3",
      intuition:
        "Because sides are proportional to the sines of opposite angles, any condition on the ANGLES (in AP, in a given ratio) converts to a condition on the SIDES, and vice versa. Use the angle sum to pin the angles, then the sine rule to get the sides.",
      definition:
        "- **Angles in AP:** \\(2B = A + C\\) together with \\(A+B+C = \\pi\\) forces the middle angle \\(B = 60^\\circ\\).\n" +
        "- **Angles in a given ratio** (e.g. \\(1:2:3\\)): split \\(180^\\circ\\) accordingly, then sides \\(\\propto \\sin A : \\sin B : \\sin C\\).\n" +
        "- **Given a side ratio**, the sine rule recovers the angles: \\(\\dfrac{b}{c} = \\dfrac{\\sin B}{\\sin C}\\).",
      formula: {
        label: "Sides proportional to sines",
        latex: "a : b : c = \\sin A : \\sin B : \\sin C",
      },
      authoredExample: {
        prompt: "The angles of a triangle are in the ratio \\(1 : 2 : 3\\). Find the ratio of the sides.",
        steps: [
          "Angles: \\(30^\\circ, 60^\\circ, 90^\\circ\\) (they sum to \\(180^\\circ\\)).",
          "Sides \\(\\propto \\sin 30^\\circ : \\sin 60^\\circ : \\sin 90^\\circ = \\tfrac12 : \\tfrac{\\sqrt3}{2} : 1\\).",
        ],
        answer: "\\(1 : \\sqrt{3} : 2\\).",
      },
      practiceSet: [
        {
          prompt: "The angles of a triangle are in AP. What is the middle angle?",
          answer: "\\(60^\\circ\\).",
          method: "Angles in AP: \\(2B = A + C\\). With \\(A+B+C = 180^\\circ\\), \\(3B = 180^\\circ\\), so \\(B = 60^\\circ\\).",
        },
        {
          prompt: "In \\(\\triangle ABC\\), \\(\\dfrac{a}{\\sin A} = 12\\) and \\(A = 30^\\circ\\). Find \\(a\\).",
          answer: "\\(a = 6\\).",
          method: "\\(a = 12\\sin A = 12\\sin30^\\circ = 12\\cdot\\tfrac12 = 6\\).",
        },
      ],
    },

    // sine rule in configurations
    {
      kind: "formula" as const,
      slug: "pt-sine-rule-configurations",
      name: "Sine Rule in Geometric Configurations",
      pyqExampleId: "47f4eb39-d3e3-4507-ba13-6e2454013537",
      intuition:
        "When a figure is split into sub-triangles (a cevian, a quadrilateral diagonal, an angle divided into two parts), apply the sine rule inside the relevant sub-triangle. The shared side or angle ties the pieces together.",
      definition:
        "In a sub-triangle, the sine rule still holds. Useful moves:\n" +
        "- In \\(\\triangle ABD\\), \\(\\dfrac{AB}{\\sin(\\angle ADB)} = \\dfrac{AD}{\\sin(\\angle ABD)} = \\dfrac{BD}{\\sin(\\angle DAB)}\\), and \\(\\angle DAB = \\pi - (\\text{the other two})\\).\n" +
        "- An angle \\(\\alpha\\) split into parts \\(A, B\\) with a tangent ratio: use \\(\\dfrac{\\tan A - \\tan B}{\\tan A + \\tan B} = \\dfrac{\\sin(A-B)}{\\sin(A+B)}\\) (componendo–dividendo on \\(\\tan A : \\tan B\\)).",
      formula: {
        label: "Sine rule in a sub-triangle",
        latex: "\\dfrac{AB}{\\sin(\\angle ADB)} = \\dfrac{AD}{\\sin(\\angle ABD)}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABD\\), \\(\\angle ADB = \\theta\\) and \\(\\angle ABD = \\alpha\\). Show \\(AD\\sin\\theta = AB\\sin\\alpha\\).",
        steps: [
          "Sine rule in \\(\\triangle ABD\\): \\(\\dfrac{AB}{\\sin\\theta} = \\dfrac{AD}{\\sin\\alpha}\\).",
          "Cross-multiplying gives \\(AB\\sin\\alpha = AD\\sin\\theta\\).",
        ],
        answer: "\\(AD\\sin\\theta = AB\\sin\\alpha\\).",
      },
    },
  ],
};
