import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOUND_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Compound Angle Formulas",
  title: "Compound Angles — sin/cos/tan(A ± B)",
  oneLineDefinition:
    "The sin(A±B), cos(A±B), tan(A±B) formulas — the base identity that double-angle, product-to-sum, and most manipulation are built on. The skill is spotting when an expression is a disguised compound angle.",
  whyItMatters:
    "This is the highest-leverage subtopic in the chapter: the NDA hides compound angle behind expressions like (cos 17° − sin 17°)/(cos 17° + sin 17°), √3 cos 10° − sin 10°, or tan α, tan β as roots of a quadratic. Each collapses to one application of a compound-angle formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "trig-compound-sin-cos",
      name: "sin(A ± B) and cos(A ± B)",
      intuition:
        "The two workhorses. Sine of a sum keeps the function order and adds; cosine of a sum swaps to the opposite sign. Get the sign rule right and these unlock the rest.",
      definition:
        "- \\(\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B\\).\n" +
        "- \\(\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B\\) (note the **flipped** sign).",
      formula: {
        label: "Sum and difference",
        latex: "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B,\\quad \\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
      },
      authoredExample: {
        prompt: "Find the exact value of \\(\\cos 75°\\).",
        steps: [
          "\\(\\cos 75°=\\cos(45°+30°)=\\cos 45°\\cos 30°-\\sin 45°\\sin 30°\\).",
          "\\(=\\tfrac{1}{\\sqrt2}\\cdot\\tfrac{\\sqrt3}{2}-\\tfrac{1}{\\sqrt2}\\cdot\\tfrac12=\\dfrac{\\sqrt3-1}{2\\sqrt2}\\).",
        ],
        answer: "\\(\\cos 75°=\\dfrac{\\sqrt3-1}{2\\sqrt2}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin 105° + \\cos 105°\\).",
        steps: [
          "Use \\(\\sin x+\\cos x=\\sqrt2\\sin(x+45°)\\): \\(\\sqrt2\\sin(150°)\\).",
          "\\(=\\sqrt2\\cdot\\tfrac12=\\tfrac{1}{\\sqrt2}\\).",
        ],
        answer: "\\(\\tfrac{1}{\\sqrt2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin(A+B)=?\\)", answer: "\\(\\sin A\\cos B+\\cos A\\sin B\\)" },
        { prompt: "\\(\\cos(A+B)=?\\)", answer: "\\(\\cos A\\cos B-\\sin A\\sin B\\)" },
        { prompt: "\\(\\sin 75°\\)?", answer: "\\(\\tfrac{\\sqrt3+1}{2\\sqrt2}\\)" },
        { prompt: "\\(\\cos(A-B)-\\cos(A+B)=?\\)", answer: "\\(2\\sin A\\sin B\\)" },
      ],
      traps: [
        {
          title: "\\(\\sin(A+B)\\neq\\sin A+\\sin B\\) — sine is NOT linear",
          body:
            "The single most common error in the chapter: treating \\(\\sin(A+B)\\) as \\(\\sin A+\\sin B\\) (or \\(\\cos(A+B)\\) as \\(\\cos A+\\cos B\\)). A quick disproof: \\(\\sin(30°+60°)=\\sin 90°=1\\), but \\(\\sin 30°+\\sin 60°=\\tfrac12+\\tfrac{\\sqrt3}{2}\\approx1.37\\). You **must** expand: \\(\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B\\).",
        },
      ],
      pyqExampleId: "3053d523-d1b3-4a8c-b94b-9fea0b70d329", // sin105+cos105
    },

    {
      kind: "formula" as const,
      slug: "trig-compound-tan",
      name: "tan(A ± B) and cot(A ± B)",
      intuition:
        "The tangent sum formula is the engine behind every \"tan of a non-standard angle\" question — write the angle as a sum or difference of known angles.",
      definition:
        "\\(\\tan(A\\pm B)=\\dfrac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}\\). A useful corollary: \\(\\tan(45°+\\theta)=\\dfrac{1+\\tan\\theta}{1-\\tan\\theta}\\). For cotangent, \\(\\cot(A\\pm B)=\\dfrac{\\cot A\\cot B\\mp 1}{\\cot B\\pm\\cot A}\\).",
      formula: {
        label: "Tangent of a sum/difference",
        latex: "\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}",
      },
      authoredExample: {
        prompt: "Find \\(\\tan 75°\\) using the tangent formula.",
        steps: [
          "\\(\\tan 75°=\\tan(45°+30°)=\\dfrac{\\tan 45°+\\tan 30°}{1-\\tan 45°\\tan 30°}=\\dfrac{1+\\tfrac{1}{\\sqrt3}}{1-\\tfrac{1}{\\sqrt3}}\\).",
          "Multiply by \\(\\tfrac{\\sqrt3}{\\sqrt3}\\): \\(\\dfrac{\\sqrt3+1}{\\sqrt3-1}=2+\\sqrt3\\).",
        ],
        answer: "\\(\\tan 75°=2+\\sqrt3\\).",
      },
      selfCheckExample: {
        prompt: "Express \\(\\tan 54°\\) in terms of \\(\\tan 9°\\).",
        steps: [
          "\\(\\tan 54°=\\tan(45°+9°)=\\dfrac{1+\\tan 9°}{1-\\tan 9°}\\).",
        ],
        answer: "\\(\\dfrac{1+\\tan 9°}{1-\\tan 9°}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan(A+B)=?\\)", answer: "\\(\\dfrac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\)" },
        { prompt: "\\(\\tan(45°+\\theta)=?\\)", answer: "\\(\\dfrac{1+\\tan\\theta}{1-\\tan\\theta}\\)" },
        { prompt: "\\(\\tan 75°\\)?", answer: "\\(2+\\sqrt3\\)" },
        { prompt: "If \\(\\tan A\\tan B=1\\), \\(\\tan(A+B)\\) is?", answer: "Undefined (\\(A+B=90°\\))" },
      ],
      traps: [
        {
          title: "The \\(\\tan(A+B)\\) denominator is \\(1-\\tan A\\tan B\\), and the signs OPPOSE",
          body:
            "Two errors cluster here: forgetting the denominator entirely (writing \\(\\tan(A+B)=\\tan A+\\tan B\\)), and getting the denominator sign wrong. The rule is \\(\\tan(A+B)=\\dfrac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\) — **the bottom sign is opposite the top**, so a *sum* on top means a *minus* on the bottom. (And \\(\\tan(A-B)=\\dfrac{\\tan A-\\tan B}{1+\\tan A\\tan B}\\).)",
        },
      ],
      pyqExampleId: "e7c7822c-5396-4f31-8a24-c363068101b0", // tan 54°
    },

    {
      kind: "formula" as const,
      slug: "trig-compound-applications",
      name: "Spotting a disguised compound angle",
      intuition:
        "The marks are in **recognition**, not the formula. A ratio like (cos−sin)/(cos+sin), a combination √3 cos θ − sin θ, or a difference of squares of sines — each is one compound-angle step in disguise.",
      definition:
        "Common disguises:\n" +
        "- \\(\\dfrac{\\cos\\theta-\\sin\\theta}{\\cos\\theta+\\sin\\theta}=\\tan(45°-\\theta)\\) (divide by \\(\\cos\\theta\\)).\n" +
        "- \\(a\\cos\\theta+b\\sin\\theta=R\\cos(\\theta-\\varphi)\\) with \\(R=\\sqrt{a^2+b^2}\\) (e.g. \\(\\sqrt3\\cos\\theta-\\sin\\theta=2\\cos(\\theta+30°)\\)).\n" +
        "- \\(\\sin^2 A-\\sin^2 B=\\sin(A+B)\\sin(A-B)\\); \\(\\cos^2 A-\\sin^2 B=\\cos(A+B)\\cos(A-B)\\).\n" +
        "- Complementary pairs: \\(\\tan\\theta\\cdot\\tan(90°-\\theta)=1\\).",
      authoredExample: {
        prompt: "Simplify \\(\\sin^2\\!\\left(\\tfrac{\\pi}{4}+\\theta\\right)-\\sin^2\\!\\left(\\tfrac{\\pi}{4}-\\theta\\right)\\).",
        steps: [
          "Use \\(\\sin^2 A-\\sin^2 B=\\sin(A+B)\\sin(A-B)\\) with \\(A=\\tfrac\\pi4+\\theta,\\ B=\\tfrac\\pi4-\\theta\\).",
          "\\(A+B=\\tfrac\\pi2,\\ A-B=2\\theta\\Rightarrow\\sin\\tfrac\\pi2\\,\\sin 2\\theta=\\sin 2\\theta\\).",
        ],
        answer: "\\(\\sin 2\\theta\\).",
      },
      selfCheckExample: {
        prompt: "Express \\(\\sqrt3\\sin\\theta+\\cos\\theta\\) as a single sine.",
        steps: [
          "\\(R=\\sqrt{(\\sqrt3)^2+1^2}=2\\); write \\(2\\!\\left(\\tfrac{\\sqrt3}{2}\\sin\\theta+\\tfrac12\\cos\\theta\\right)\\).",
          "\\(=2(\\sin\\theta\\cos 30°+\\cos\\theta\\sin 30°)=2\\sin(\\theta+30°)\\).",
        ],
        answer: "\\(2\\sin(\\theta+30°)\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{\\cos\\theta-\\sin\\theta}{\\cos\\theta+\\sin\\theta}=?\\)", answer: "\\(\\tan(45°-\\theta)\\)" },
        { prompt: "\\(\\sqrt3\\cos\\theta-\\sin\\theta=?\\)", answer: "\\(2\\cos(\\theta+30°)\\)" },
        { prompt: "\\(\\sin^2 A-\\sin^2 B=?\\)", answer: "\\(\\sin(A+B)\\sin(A-B)\\)" },
        { prompt: "\\(\\tan 1°\\tan 2°\\cdots\\tan 89°=?\\)", answer: "\\(1\\) (complementary pairing)" },
      ],
      pyqExampleId: "71bd3a26-d9b8-4195-8e94-4eb81b22fd5d", // (cos17-sin17)/(cos17+sin17)
    },

    {
      kind: "formula" as const,
      slug: "trig-compound-identities",
      name: "Conditional ratio manipulation (a sin²+b cos²=c, etc.)",
      intuition:
        "A second family of compound-subtopic questions is pure algebraic manipulation of ratios: given a constraint like \\(a\\sin^2 x+b\\cos^2 x=c\\), divide through to extract \\(\\tan^2 x\\); or simplify a fearsome-looking product of \\((1\\pm\\sec)(1\\pm\\csc)\\) expressions.",
      definition:
        "Standard moves: **divide by \\(\\cos^2 x\\)** to turn \\(a\\sin^2 x+b\\cos^2 x=c\\) into \\(a\\tan^2 x+b=c\\sec^2 x=c(1+\\tan^2 x)\\), then solve for \\(\\tan^2 x\\). Convert all functions to \\(\\sin/\\cos\\) over a common denominator when a product looks unmanageable. \\(\\dfrac{1+\\tan^2\\theta}{1+\\cot^2\\theta}=\\tan^2\\theta\\).",
      authoredExample: {
        prompt: "If \\(3\\sin^2 x+\\cos^2 x=2\\), find \\(\\tan^2 x\\).",
        steps: [
          "Divide by \\(\\cos^2 x\\): \\(3\\tan^2 x+1=2\\sec^2 x=2(1+\\tan^2 x)\\).",
          "\\(3\\tan^2 x+1=2+2\\tan^2 x\\Rightarrow\\tan^2 x=1\\).",
        ],
        answer: "\\(\\tan^2 x=1\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{1+\\tan^2\\theta}{1+\\cot^2\\theta}\\).",
        steps: [
          "\\(=\\dfrac{\\sec^2\\theta}{\\csc^2\\theta}=\\dfrac{1/\\cos^2\\theta}{1/\\sin^2\\theta}=\\tan^2\\theta\\).",
        ],
        answer: "\\(\\tan^2\\theta\\).",
      },
      practiceSet: [
        { prompt: "Turn \\(a\\sin^2x+b\\cos^2x=c\\) into a \\(\\tan\\) equation by?", answer: "Dividing by \\(\\cos^2 x\\)" },
        { prompt: "\\(\\dfrac{1+\\tan^2\\theta}{1+\\cot^2\\theta}=?\\)", answer: "\\(\\tan^2\\theta\\)" },
        { prompt: "\\(\\sqrt{\\sec^2\\alpha-1}\\) for acute \\(\\alpha\\)?", answer: "\\(\\tan\\alpha\\)" },
        { prompt: "\\(2\\sin^2x+\\cos^2x=\\tfrac{3}{2}\\Rightarrow\\sin^2x=?\\)", answer: "\\(\\tfrac12\\)" },
      ],
      traps: [
        {
          title: "\\(\\cos(A+B)\\cos(A-B)=\\cos^2 A-\\sin^2 B\\), not \\(\\cos^2 A-\\cos^2 B\\)",
          body:
            "When collapsing a product like \\(\\cos(A+B)\\cos(A-B)\\), students misremember the result as \\(\\cos^2 A-\\cos^2 B\\). Expanding gives \\(\\cos^2 A-\\sin^2 B\\) (equivalently \\(\\cos^2 B-\\sin^2 A\\)). The companion is \\(\\sin(A+B)\\sin(A-B)=\\sin^2 A-\\sin^2 B\\). **The leftover square is \\(\\sin^2 B\\), a different function from the \\(\\cos^2 A\\) it sits beside.**",
        },
      ],
      pyqExampleId: "d39ff110-fcd7-406a-9331-5951671efbfa", // (1+tan²)/(1+cot²)
    },

    {
      kind: "formula" as const,
      slug: "trig-compound-conditional-roots",
      name: "Roots, componendo, and conditional compound angles",
      intuition:
        "When \\(\\tan\\alpha,\\tan\\beta\\) are the roots of a quadratic, Vieta's formulas hand you \\(\\tan\\alpha+\\tan\\beta\\) and \\(\\tan\\alpha\\tan\\beta\\) — exactly the ingredients of \\(\\tan(\\alpha+\\beta)\\). For ratio equations, componendo-dividendo collapses sin(x+y)/sin(x−y) cleanly.",
      definition:
        "- **Roots → compound:** if \\(\\tan\\alpha,\\tan\\beta\\) are roots of \\(x^2-bx+c=0\\), then \\(\\tan(\\alpha+\\beta)=\\dfrac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}=\\dfrac{b}{1-c}\\).\n" +
        "- **Componendo-dividendo:** from \\(\\dfrac{\\sin(x+y)}{\\sin(x-y)}=\\dfrac{a}{b}\\), apply componendo-dividendo and expand to get \\(\\dfrac{\\tan x}{\\tan y}=\\dfrac{a+b}{a-b}\\).",
      authoredExample: {
        prompt: "If \\(\\tan\\alpha,\\tan\\beta\\) are roots of \\(x^2-6x+8=0\\), find \\(\\tan(\\alpha+\\beta)\\).",
        steps: [
          "Vieta: \\(\\tan\\alpha+\\tan\\beta=6\\), \\(\\tan\\alpha\\tan\\beta=8\\).",
          "\\(\\tan(\\alpha+\\beta)=\\dfrac{6}{1-8}=-\\tfrac{6}{7}\\).",
        ],
        answer: "\\(\\tan(\\alpha+\\beta)=-\\tfrac67\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{\\sin(x+y)}{\\sin(x-y)}=\\dfrac{a+b}{a-b}\\), find \\(\\dfrac{\\tan x}{\\tan y}\\).",
        steps: [
          "Componendo-dividendo: \\(\\dfrac{\\sin(x+y)+\\sin(x-y)}{\\sin(x+y)-\\sin(x-y)}=\\dfrac{(a+b)+(a-b)}{(a+b)-(a-b)}\\).",
          "Left side \\(=\\dfrac{2\\sin x\\cos y}{2\\cos x\\sin y}=\\dfrac{\\tan x}{\\tan y}\\); right side \\(=\\dfrac{2a}{2b}=\\tfrac{a}{b}\\).",
        ],
        answer: "\\(\\dfrac{\\tan x}{\\tan y}=\\dfrac{a}{b}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan\\alpha,\\tan\\beta\\) roots of \\(x^2-bx+c\\): \\(\\tan(\\alpha+\\beta)\\)?", answer: "\\(\\dfrac{b}{1-c}\\)" },
        { prompt: "Roots give which two quantities directly?", answer: "Sum and product of \\(\\tan\\alpha,\\tan\\beta\\)" },
        { prompt: "Tool for \\(\\sin(x+y)/\\sin(x-y)\\) equations?", answer: "Componendo-dividendo" },
        { prompt: "\\(\\tan\\alpha+\\tan\\beta=6,\\tan\\alpha\\tan\\beta=8\\): \\(\\tan(\\alpha+\\beta)\\)?", answer: "\\(-\\tfrac67\\)" },
      ],
      pyqExampleId: "6531efe3-56e2-457a-a839-9cdcb95b8f4c", // tanα,tanβ roots
    },
  ],
  related: [
    { label: "Standard Values & Special Angles", href: "/notes/nda-maths/trigonometric-identities/trig-values-quadrants" },
    { label: "Double, Triple & Half-Angle", href: "/notes/nda-maths/trigonometric-identities/trig-multiple-half-angle" },
  ],
};
