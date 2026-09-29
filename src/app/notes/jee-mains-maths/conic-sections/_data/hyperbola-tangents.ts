import type { SubtopicNote } from "@/app/notes/_types";

export const HYPERBOLA_TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents and Normals to a Hyperbola",
  title: "Tangents and Normals to a Hyperbola",
  oneLineDefinition:
    "When a line touches, cuts or misses a hyperbola, the tangent in point, parametric and slope form, tangents from a point, the chord with a given midpoint, and the normal.",
  whyItMatters:
    "Fifteen PYQs. Two formulas carry them: the tangency condition c² = a²m² − b², and the normal a²x/x₁ + b²y/y₁ = a² + b². Two ideas cover the page.",
  concepts: [
    // C1 — tangents and lines meeting a hyperbola
    {
      kind: "formula" as const,
      slug: "jcon-hyperbola-tangent",
      name: "Tangents, and when a line meets a hyperbola",
      intuition:
        "Everything mirrors the ellipse with \\(b^2\\) changed to \\(-b^2\\). A line \\(y=mx+c\\) touches \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\) when \\(c^2=a^2m^2-b^2\\). If \\(c^2\\) is smaller than that, and the slope is steeper than the asymptotes, the line misses the curve altogether. The chord with a given midpoint is again \\(T=S_1\\).",
      definition:
        "- **Tangency:** \\(c^2=a^2m^2-b^2\\); the slope form is \\(y=mx\\pm\\sqrt{a^2m^2-b^2}\\).\n" +
        "- **At \\((x_1,y_1)\\):** \\(\\frac{xx_1}{a^2}-\\frac{yy_1}{b^2}=1\\). At \\(\\theta\\): \\(\\frac{x\\sec\\theta}{a}-\\frac{y\\tan\\theta}{b}=1\\).\n" +
        "- **Misses the curve:** \\(|m|>\\frac{b}{a}\\) and \\(c^2<a^2m^2-b^2\\).\n" +
        "- **Tangents from \\((h,k)\\):** slopes solve \\((h^2-a^2)m^2-2hkm+(k^2+b^2)=0\\).\n" +
        "- **Chord with midpoint \\((h,k)\\):** \\(T=S_1\\); slope \\(\\frac{b^2h}{a^2k}\\).\n" +
        "- Feet of perpendiculars from the centre to tangents lie on \\((x^2+y^2)^2=a^2x^2-b^2y^2\\).",
      formula: {
        label: "Tangency condition",
        latex: "y=mx+c\\ \\text{touches}\\ \\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\iff c^2=a^2m^2-b^2",
      },
      authoredExample: {
        prompt: "Find the tangents of slope \\(2\\) to \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\).",
        steps: [
          "\\(c^2=9\\cdot4-16=20\\).",
        ],
        answer: "\\(y=2x\\pm2\\sqrt5\\).",
      },
      selfCheckExample: {
        prompt: "Does \\(y=x+1\\) meet \\(x^2-4y^2=4\\)?",
        steps: [
          "\\(a^2=4\\), \\(b^2=1\\), \\(m=1>\\frac{b}{a}=\\frac12\\).",
          "\\(a^2m^2-b^2=3>c^2=1\\), so the line misses. Check: \\(x^2-4(x+1)^2=4\\) gives \\(3x^2+8x+8=0\\), with negative discriminant.",
        ],
        answer: "No, it misses the hyperbola.",
      },
      practiceSet: [
        { prompt: "Tangent to \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\) at \\(\\left(5,\\frac{16}{3}\\right)\\)?", answer: "\\(\\frac{5x}{9}-\\frac{y}{3}=1\\)" },
        { prompt: "Slope of the chord of \\(x^2-y^2=4\\) with midpoint \\((3,1)\\)?", answer: "\\(3\\)" },
        { prompt: "Is \\(y=2x+3\\) a tangent to \\(\\frac{x^2}{4}-\\frac{y^2}{7}=1\\)?", answer: "Yes: \\(16-7=9\\)" },
        { prompt: "Slopes of lines through the centre that never meet \\(\\frac{x^2}{4}-y^2=1\\)?", answer: "\\(|m|\\geq\\frac12\\)" },
      ],
      pyqExampleId: "5ef88f32-87fd-4ce8-98aa-6b1f9c8da597", // 2022 — e = root 5/2, latus rectum 6 root 2, y = 2x + c tangent
      traps: [
        {
          title: "Minus \\(b^2\\) for the hyperbola",
          body: "For the ellipse \\(c^2=a^2m^2+b^2\\); for the hyperbola \\(c^2=a^2m^2-b^2\\). A slope with \\(a^2m^2<b^2\\) gives no tangent at all.",
        },
      ],
    },

    // C2 — normals
    {
      kind: "formula" as const,
      slug: "jcon-hyperbola-normal",
      name: "The normal to a hyperbola",
      intuition:
        "The normal at \\((x_1,y_1)\\) is perpendicular to the tangent there. Its equation has the same shape as the ellipse's normal with the sign of \\(b^2\\) flipped: \\(\\frac{a^2x}{x_1}+\\frac{b^2y}{y_1}=a^2+b^2\\). Questions ask where it crosses an axis, or which given point it passes through.",
      definition:
        "- **At \\((x_1,y_1)\\):** \\(\\frac{a^2x}{x_1}+\\frac{b^2y}{y_1}=a^2+b^2\\).\n" +
        "- **At \\(\\theta\\), \\((a\\sec\\theta,\\,b\\tan\\theta)\\):** \\(ax\\cos\\theta+by\\cot\\theta=a^2+b^2\\).\n" +
        "- **Slope** of the normal at \\((x_1,y_1)\\): \\(-\\frac{a^2y_1}{b^2x_1}\\).\n" +
        "- It meets the transverse axis at \\(x=\\frac{(a^2+b^2)x_1}{a^2}=e^2x_1\\).",
      formula: {
        label: "Normal at (x₁, y₁)",
        latex: "\\frac{a^2x}{x_1}+\\frac{b^2y}{y_1}=a^2+b^2",
      },
      authoredExample: {
        prompt: "Find the normal to \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\) at \\(\\left(5,\\frac{16}{3}\\right)\\).",
        steps: [
          "\\(\\frac{9x}{5}+\\frac{16y}{16/3}=9+16\\), i.e. \\(\\frac{9x}{5}+3y=25\\).",
        ],
        answer: "\\(9x+15y=125\\).",
      },
      selfCheckExample: {
        prompt: "Where does that normal meet the \\(x\\)-axis?",
        steps: [
          "Put \\(y=0\\): \\(x=\\frac{125}{9}\\). Check with \\(e^2x_1=\\frac{25}{9}\\cdot5\\).",
        ],
        answer: "\\(\\left(\\frac{125}{9},0\\right)\\).",
      },
      practiceSet: [
        { prompt: "Normal to \\(x^2-y^2=9\\) at \\((5,4)\\)?", answer: "\\(4x+5y=40\\)" },
        { prompt: "Normal at a vertex \\((a,0)\\)?", answer: "\\(y=0\\)" },
        { prompt: "Slope of the normal to \\(\\frac{x^2}{4}-y^2=1\\) at \\((2\\sqrt2,1)\\)?", answer: "\\(-\\sqrt2\\)", method: "\\(-\\frac{4\\cdot1}{1\\cdot2\\sqrt2}\\)" },
        { prompt: "Normal to \\(\\frac{x^2}{16}-\\frac{y^2}{9}=1\\) at \\((4\\sec\\theta,3\\tan\\theta)\\)?", answer: "\\(4x\\cos\\theta+3y\\cot\\theta=25\\)" },
      ],
      pyqExampleId: "f62c1b5d-b51e-4055-b690-ec2deba83c09", // 2022 — e = 5/4, normal at (8/root 5, 12/5) is 8 root 5 x + beta y = lambda
      traps: [
        {
          title: "PLUS in the normal, MINUS in the tangent",
          body: "The tangent is \\(\\frac{xx_1}{a^2}-\\frac{yy_1}{b^2}=1\\) and the normal is \\(\\frac{a^2x}{x_1}+\\frac{b^2y}{y_1}=a^2+b^2\\). The signs flip between them.",
        },
      ],
    },
  ],
};
