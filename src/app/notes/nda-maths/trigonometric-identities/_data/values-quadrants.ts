import type { SubtopicNote } from "@/app/notes/_types";

export const VALUES_QUADRANTS_NOTE: SubtopicNote = {
  subtopicName: "Specific Values and Quadrants",
  title: "Standard Values, Signs & Special Angles",
  oneLineDefinition:
    "The bedrock: the fundamental identities, the standard-angle table, which ratios are positive in which quadrant, how to recover every ratio from one, and the exact values of the special angles.",
  whyItMatters:
    "Almost every other identity question silently assumes you can read off a standard value, fix a sign by quadrant, or know that tan 15° = 2 − √3. These are the cheapest marks in the chapter — and the most common silent error is a sign wrong for the quadrant.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "trig-fundamental-identities",
      name: "The fundamental identities",
      intuition:
        "Three families generate everything: the **Pythagorean** identities, the **reciprocal** pairs, and the **quotient** relations. Every simplification eventually reduces to one of these.",
      definition:
        "- **Pythagorean:** \\(\\sin^2\\theta+\\cos^2\\theta=1\\), \\(1+\\tan^2\\theta=\\sec^2\\theta\\), \\(1+\\cot^2\\theta=\\csc^2\\theta\\).\n" +
        "- **Reciprocal:** \\(\\csc\\theta=\\tfrac{1}{\\sin\\theta}\\), \\(\\sec\\theta=\\tfrac{1}{\\cos\\theta}\\), \\(\\cot\\theta=\\tfrac{1}{\\tan\\theta}\\).\n" +
        "- **Quotient:** \\(\\tan\\theta=\\tfrac{\\sin\\theta}{\\cos\\theta}\\), \\(\\cot\\theta=\\tfrac{\\cos\\theta}{\\sin\\theta}\\).",
      formula: {
        label: "The three Pythagorean identities",
        latex: "\\sin^2\\theta+\\cos^2\\theta=1,\\quad \\sec^2\\theta-\\tan^2\\theta=1,\\quad \\csc^2\\theta-\\cot^2\\theta=1",
      },
      authoredExample: {
        prompt: "Simplify \\((1-\\cos^2\\theta)\\csc^2\\theta\\).",
        steps: [
          "\\(1-\\cos^2\\theta=\\sin^2\\theta\\) (Pythagorean).",
          "\\(\\sin^2\\theta\\cdot\\csc^2\\theta=\\sin^2\\theta\\cdot\\tfrac{1}{\\sin^2\\theta}=1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Express \\(\\sec\\theta-\\csc\\theta\\) over a common denominator in terms of \\(\\sin\\theta,\\cos\\theta\\).",
        steps: [
          "\\(\\sec\\theta-\\csc\\theta=\\tfrac{1}{\\cos\\theta}-\\tfrac{1}{\\sin\\theta}\\).",
          "Combine: \\(\\dfrac{\\sin\\theta-\\cos\\theta}{\\sin\\theta\\cos\\theta}\\).",
        ],
        answer: "\\(\\dfrac{\\sin\\theta-\\cos\\theta}{\\sin\\theta\\cos\\theta}\\).",
      },
      practiceSet: [
        { prompt: "\\(1+\\tan^2\\theta=?\\)", answer: "\\(\\sec^2\\theta\\)" },
        { prompt: "\\(1+\\cot^2\\theta=?\\)", answer: "\\(\\csc^2\\theta\\)" },
        { prompt: "\\(\\sec^2\\theta-\\tan^2\\theta=?\\)", answer: "\\(1\\)" },
        { prompt: "\\(\\sqrt{\\sec^2\\alpha-1}=?\\) (acute \\(\\alpha\\))", answer: "\\(\\tan\\alpha\\)" },
      ],
    },

    {
      kind: "reference" as const,
      slug: "trig-standard-values",
      name: "Standard-angle values and allied reductions",
      intuition:
        "The values at 0°, 30°, 45°, 60°, 90° must be instant. Everything outside the first quadrant reduces to these via the allied-angle rules — add or subtract a multiple of 90° and fix the sign.",
      definition:
        "Read the table left-to-right. For angles beyond 90°, reduce with allied rules: \\(\\sin(180°-\\theta)=\\sin\\theta\\), \\(\\cos(180°-\\theta)=-\\cos\\theta\\), \\(\\sin(360°+\\theta)=\\sin\\theta\\) (periodicity), and \\(90°\\pm\\theta\\) swaps sin\\(\\leftrightarrow\\)cos.",
      table: {
        columns: ["Angle", "sin", "cos", "tan"],
        rows: [
          { cells: ["0°", "0", "1", "0"] },
          { cells: ["30°", "1/2", "√3/2", "1/√3"] },
          { cells: ["45°", "1/√2", "1/√2", "1"] },
          { cells: ["60°", "√3/2", "1/2", "√3"] },
          { cells: ["90°", "1", "0", "∞ (undefined)"] },
        ],
        caption: "Beyond 90°, reduce by allied angles and fix the sign from the quadrant.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\csc\\!\\left(\\dfrac{7\\pi}{6}\\right)\\).",
        steps: [
          "\\(\\tfrac{7\\pi}{6}=\\pi+\\tfrac{\\pi}{6}\\), in the third quadrant where sine is negative.",
          "\\(\\sin\\tfrac{7\\pi}{6}=-\\sin\\tfrac{\\pi}{6}=-\\tfrac12\\), so \\(\\csc=-2\\).",
        ],
        answer: "\\(-2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan 45°\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\cos 30°\\)?", answer: "\\(\\tfrac{\\sqrt3}{2}\\)" },
        { prompt: "\\(\\sin(180°-\\theta)=?\\)", answer: "\\(\\sin\\theta\\)" },
        { prompt: "\\(\\cos(90°+\\theta)=?\\)", answer: "\\(-\\sin\\theta\\)" },
      ],
      pyqExampleId: "9ce41d7d-6d9e-4ff6-8015-a78e94565c65", // csc(7π/6)
    },

    {
      kind: "formula" as const,
      slug: "trig-quadrant-signs-allied",
      name: "Signs by quadrant (ASTC) and reductions",
      intuition:
        "Which ratios are positive depends only on the quadrant: **A**ll in I, **S**ine in II, **T**angent in III, **C**osine in IV (\"All Students Take Calculus\"). Pair this with allied reductions to collapse angles like 80° + 40° − 20°.",
      definition:
        "- **Quadrant I:** all positive. **II:** sin (and csc) positive. **III:** tan (and cot) positive. **IV:** cos (and sec) positive.\n" +
        "- A square root like \\(\\sqrt{1+\\sin A}=\\pm(\\sin\\tfrac{A}{2}+\\cos\\tfrac{A}{2})\\) — the **sign is decided by the quadrant** of \\(A/2\\), never assumed positive.\n" +
        "- Allied reductions (\\(\\cos 80°+\\cos 40°=\\cos 20°\\) etc.) shrink an awkward combination to a standard value.",
      visualizationSlug: "trig-astc-quadrants",
      authoredExample: {
        prompt: "If \\(\\sin\\theta>0\\) and \\(\\tan\\theta<0\\), which quadrant is \\(\\theta\\) in?",
        steps: [
          "\\(\\sin\\theta>0\\) → quadrant I or II.",
          "\\(\\tan\\theta<0\\) → quadrant II or IV.",
          "The overlap is quadrant II.",
        ],
        answer: "Quadrant II.",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\sin(180°+\\theta)\\cdot\\cos(90°-\\theta)\\).",
        steps: [
          "Allied rules: \\(\\sin(180°+\\theta)=-\\sin\\theta\\) and \\(\\cos(90°-\\theta)=\\sin\\theta\\).",
          "Product \\(=(-\\sin\\theta)(\\sin\\theta)=-\\sin^2\\theta\\).",
        ],
        answer: "\\(-\\sin^2\\theta\\).",
      },
      practiceSet: [
        { prompt: "Where is tan positive?", answer: "Quadrants I and III" },
        { prompt: "Sign of \\(\\cos\\theta\\) in quadrant II?", answer: "Negative" },
        { prompt: "\\(\\sin\\theta=-\\tfrac12\\), \\(\\tan\\theta>0\\): quadrant?", answer: "III" },
        { prompt: "Is \\(\\sqrt{1+\\sin A}\\) always \\(+(\\sin\\tfrac A2+\\cos\\tfrac A2)\\)?", answer: "No — the sign depends on the quadrant of \\(A/2\\)" },
      ],
      pyqExampleId: "dfcd683a-0e46-438b-b7c8-e90c7d567a81", // cos80+cos40-cos20
    },

    {
      kind: "formula" as const,
      slug: "trig-ratios-from-one",
      name: "All ratios from one ratio and a quadrant",
      intuition:
        "Given one ratio plus the quadrant, every other ratio is fixed. Build a right triangle from the given ratio for the magnitudes, then attach signs from the quadrant.",
      definition:
        "From a single ratio: get the third side by Pythagoras (e.g. \\(\\sin\\theta=\\tfrac{p}{r}\\Rightarrow\\cos\\theta=\\pm\\tfrac{\\sqrt{r^2-p^2}}{r}\\)), then the **quadrant fixes each sign**. The quadrant is essential — without it the signs are ambiguous.",
      authoredExample: {
        prompt: "If \\(\\cos\\theta=\\tfrac{3}{5}\\) and \\(\\theta\\) is in quadrant IV, find \\(\\sin\\theta\\) and \\(\\tan\\theta\\).",
        steps: [
          "\\(\\sin\\theta=\\pm\\sqrt{1-\\tfrac{9}{25}}=\\pm\\tfrac45\\); quadrant IV → sine negative, so \\(\\sin\\theta=-\\tfrac45\\).",
          "\\(\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}=\\dfrac{-4/5}{3/5}=-\\tfrac43\\).",
        ],
        answer: "\\(\\sin\\theta=-\\tfrac45,\\ \\tan\\theta=-\\tfrac43\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\csc\\theta=\\tfrac{29}{21}\\) with \\(0<\\theta<\\tfrac\\pi2\\), find \\(\\tan\\theta\\).",
        steps: [
          "\\(\\sin\\theta=\\tfrac{21}{29}\\Rightarrow\\cos\\theta=\\tfrac{20}{29}\\) (first quadrant, positive).",
          "\\(\\tan\\theta=\\tfrac{21}{20}\\).",
        ],
        answer: "\\(\\tan\\theta=\\tfrac{21}{20}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin\\theta=\\tfrac35\\), quadrant II: \\(\\cos\\theta\\)?", answer: "\\(-\\tfrac45\\)" },
        { prompt: "What extra fact fixes the signs?", answer: "The quadrant" },
        { prompt: "\\(\\tan\\theta=\\tfrac{21}{20}\\), Q I: \\(\\sec\\theta\\)?", answer: "\\(\\tfrac{29}{20}\\)" },
        { prompt: "From \\(\\cos\\theta\\) alone, is \\(\\sin\\theta\\) determined?", answer: "Only up to sign — need the quadrant" },
      ],
      pyqExampleId: "b815579a-7f6c-4256-907a-77626484cf08", // cscθ=29/21
    },

    {
      kind: "reference" as const,
      slug: "trig-special-angle-values",
      name: "Special-angle exact values (15°, 18°, 36°, 22.5°, 75°)",
      intuition:
        "A handful of non-standard angles recur with exact surd values. Either memorise them or derive on the spot — 15° and 75° from compound angles, 18° and 36° from the pentagon relations, 22.5° from the half-angle of 45°.",
      definition:
        "Derive when unsure: \\(\\tan 15°=\\tan(45°-30°)=2-\\sqrt3\\); \\(\\tan 75°=2+\\sqrt3\\); \\(\\tan 22.5°=\\sqrt2-1\\); \\(\\sin 18°=\\tfrac{\\sqrt5-1}{4}\\); \\(\\cos 36°=\\tfrac{\\sqrt5+1}{4}\\). Note \\(\\tan 15°\\) and \\(\\cot 15°\\) are conjugate surds, so \\(\\tan 15°+\\cot 15°=4\\).",
      table: {
        columns: ["Angle", "Exact value"],
        rows: [
          { cells: ["tan 15°", "2 − √3"] },
          { cells: ["tan 75°", "2 + √3"] },
          { cells: ["tan 22.5°", "√2 − 1"] },
          { cells: ["sin 18°", "(√5 − 1)/4"] },
          { cells: ["cos 36°", "(√5 + 1)/4"] },
          { cells: ["tan 18°", "√(25 − 10√5)/5"] },
        ],
        caption: "15°/75° via compound angle; 18°/36° via the pentagon; 22.5° via half-angle of 45°.",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cot^2 15° + \\tan^2 15°\\).",
        steps: [
          "\\(\\tan 15°=2-\\sqrt3\\Rightarrow\\tan^2 15°=7-4\\sqrt3\\); \\(\\cot 15°=2+\\sqrt3\\Rightarrow\\cot^2 15°=7+4\\sqrt3\\).",
          "Sum \\(=14\\).",
        ],
        answer: "\\(14\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan 15°\\)?", answer: "\\(2-\\sqrt3\\)" },
        { prompt: "\\(\\tan 15°\\cdot\\cot 15°\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\tan 15°+\\cot 15°\\)?", answer: "\\(4\\)" },
        { prompt: "\\(\\cos 36°-\\cos 72°\\)? (use the surd values)", answer: "\\(\\tfrac12\\)" },
      ],
      pyqExampleId: "4b28624d-ecb6-46a0-a3d9-42c5aa5bc17d", // tan 18°
    },
  ],
  related: [
    { label: "Compound Angles", href: "/notes/nda-maths/trigonometric-identities/trig-compound-angle" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
