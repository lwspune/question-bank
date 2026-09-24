import type { SubtopicNote } from "@/app/notes/_types";

export const OPTIMISATION_NOTE: SubtopicNote = {
  subtopicName: "Optimisation — Geometric, Trigonometric, AM-GM",
  title: "Optimisation — Word Problems & AM-GM",
  oneLineDefinition:
    "Maximise or minimise a real quantity: model it, reduce to one variable using the constraint, then either set the derivative to zero or — often faster — apply AM-GM.",
  whyItMatters:
    "Optimisation word problems look intimidating but follow one recipe, and a large share collapse to a single AM-GM step that beats calculus. Geometric set-ups (max area/volume) recur every year.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aod-optimisation-method",
      name: "The optimisation recipe",
      intuition:
        "Every optimisation problem is the same four steps: write the quantity to optimise, use the constraint to get it in **one** variable, set the derivative to zero, and confirm it's a max or min. The hard part is the modelling, not the calculus.",
      definition:
        "1. Express the target \\(Q\\) and the constraint. 2. Eliminate a variable so \\(Q=Q(t)\\) in one variable. 3. Solve \\(Q'(t)=0\\) for critical \\(t\\). 4. Verify with \\(Q''\\) or the first-derivative test (and check the domain's endpoints). Classic set-ups: a cylinder/box of fixed volume with least surface, the shortest distance from a point to a curve, \\(\\sum (x-a_j)^2\\) minimised at the mean.\n" +
        "**Shortest distance from a point to a curve — parametrise the curve.** On \\(y^2=4ax\\) use \\((at^2,2at)\\); on \\(x^2=4ay\\) use \\((2at,at^2)\\); on a circle \\((r\\cos\\theta,r\\sin\\theta)\\). Minimise the SQUARED distance \\(D(t)=(x(t)-x_0)^2+(y(t)-y_0)^2\\) (same minimiser, no square root), and check the answer: at the nearest point the segment is NORMAL to the curve. For \\(y^2=4x\\) and \\((a,0)\\) with \\(a>2\\): \\(t^2=a-2\\), distance \\(2\\sqrt{a-1}\\); for \\(a\\le2\\) the vertex is nearest.",
      authoredExample: {
        prompt: "A closed cylinder of volume \\(V\\) has least surface area when its height equals what?",
        steps: [
          "\\(S=2\\pi r^2+2\\pi rh\\), with \\(V=\\pi r^2h\\Rightarrow h=\\dfrac{V}{\\pi r^2}\\).",
          "\\(S(r)=2\\pi r^2+\\dfrac{2V}{r}\\); \\(S'(r)=4\\pi r-\\dfrac{2V}{r^2}=0\\Rightarrow V=2\\pi r^3\\), giving \\(h=2r\\).",
        ],
        answer: "Height \\(=2r\\) (equals the diameter).",
      },
      selfCheckExample: {
        prompt: "Where is \\(f(x)=\\sum_{j=1}^{n}(x-a_j)^2\\) minimised?",
        steps: [
          "\\(f'(x)=2\\sum (x-a_j)=2(nx-\\sum a_j)=0\\).",
          "\\(x=\\dfrac{\\sum a_j}{n}\\) — the mean.",
        ],
        answer: "At the mean of the \\(a_j\\).",
      },
      practiceSet: [
        { prompt: "Step 2 of the recipe?", answer: "Use the constraint to get one variable" },
        { prompt: "How to confirm a min?", answer: "\\(Q''>0\\) (or first-derivative test)" },
        { prompt: "\\(\\sum(x-a_j)^2\\) is least at?", answer: "The mean of the \\(a_j\\)" },
        { prompt: "Closed cylinder least surface: \\(h=\\)?", answer: "\\(2r\\)" },
      ],
      pyqExampleId: "5e0f758f-26a0-4df0-9f8b-b96e59c09eb4", // cylindrical jar
    },

    {
      kind: "formula" as const,
      slug: "aod-geometric-optimisation",
      name: "Geometric maxima (area, volume, inscribed figures)",
      intuition:
        "Geometry problems carry standard results worth knowing outright: the largest-area triangle in a circle is equilateral, a fixed-perimeter rectangle is largest as a square, and many max-area set-ups land on a 60° or equilateral configuration. Recognise the figure, then run the recipe or quote the result.",
      definition:
        "Model the area/volume, use the geometric constraint (perimeter, radius, given side), reduce to one variable (often an angle \\(\\theta\\)), and optimise.\n" +
        "**Standard results to quote:**\n" +
        "- Max-area triangle inscribed in a circle of radius \\(R\\) is equilateral, area \\(\\tfrac{3\\sqrt3}{4}R^2\\); max-area **rectangle** inscribed in a circle of radius \\(r\\) is a square, area \\(2r^2\\) (sides \\(r\\sqrt2\\)).\n" +
        "- Fixed-perimeter rectangle ⇒ square; fixed-perimeter **triangle** of greatest area ⇒ equilateral (side \\(\\tfrac P3\\), altitude \\(\\tfrac{\\sqrt3}{2}\\cdot\\tfrac P3\\), area \\(\\tfrac{\\sqrt3}{36}P^2\\)).\n" +
        "- **Sector** of radius \\(r\\), angle \\(\\theta\\) (radians): arc \\(l=r\\theta\\), perimeter \\(2r+r\\theta\\), area \\(\\tfrac12r^2\\theta=\\tfrac12rl\\). For fixed perimeter \\(P\\) the area \\(\\tfrac12r(P-2r)\\) is a quadratic in \\(r\\): max at \\(r=\\tfrac P4\\), i.e. \\(\\theta=2\\) radians, area \\(\\tfrac{P^2}{16}\\).\n" +
        "- **Mensuration the set-ups borrow:** trapezium area \\(\\tfrac12(a+b)h\\) (the max-area trapezium inscribed in a semicircle of radius \\(r\\) has its top side \\(r\\) and area \\(\\tfrac{3\\sqrt3}{4}r^2\\)); right triangle area \\(\\tfrac12\\times\\)legs; cylinder \\(V=\\pi r^2h\\), \\(S=2\\pi rh+2\\pi r^2\\); cone \\(V=\\tfrac13\\pi r^2h\\); sphere \\(V=\\tfrac43\\pi r^3\\).",
      authoredExample: {
        prompt: "A wire of length \\(20\\) cm is bent into a rectangle of maximum area. Find the area.",
        steps: [
          "Perimeter \\(2(l+b)=20\\Rightarrow l+b=10\\); area \\(A=l(10-l)\\).",
          "\\(A'(l)=10-2l=0\\Rightarrow l=5\\) (a square); \\(A=25\\).",
        ],
        answer: "\\(25\\) cm² (a \\(5\\times5\\) square).",
      },
      selfCheckExample: {
        prompt: "What is the maximum area of a triangle inscribed in a circle of radius \\(R\\)?",
        steps: [
          "The maximiser is the equilateral triangle.",
          "Its area is \\(\\dfrac{3\\sqrt3}{4}R^2\\).",
        ],
        answer: "\\(\\dfrac{3\\sqrt3}{4}R^2\\).",
      },
      practiceSet: [
        { prompt: "Max-area triangle in a circle is?", answer: "Equilateral" },
        { prompt: "Fixed-perimeter max-area rectangle is?", answer: "A square" },
        { prompt: "Wire \\(20\\) cm, max rectangle area?", answer: "\\(25\\) cm²" },
        { prompt: "Variable to reduce to in many geometry problems?", answer: "An angle \\(\\theta\\)" },
      ],
      pyqExampleId: "be0cda5e-6ec3-43a6-beff-6c69f6b911bd", // sector flower-bed
    },

    {
      kind: "formula" as const,
      slug: "aod-trig-max-without-calculus",
      name: "Trigonometric maxima without a derivative",
      intuition:
        "Nine of this chapter's PYQs never need a derivative: the expression collapses to a single sine or cosine, whose range is \\([-1,1]\\). Recognise the collapse, read off the extreme, and — if asked WHERE — solve \\(\\sin(\\cdot)=\\pm1\\). Reaching for \\(f'(x)=0\\) here is slower and error-prone.",
      definition:
        "Collapses to memorise, each followed by 'max = coefficient × 1':\n" +
        "- **Harmonic form:** \\(a\\sin x+b\\cos x=\\sqrt{a^2+b^2}\\,\\sin(x+\\alpha)\\), so \\(a\\sin x+b\\cos x+c\\) has **maximum \\(c+\\sqrt{a^2+b^2}\\)** and **minimum \\(c-\\sqrt{a^2+b^2}\\)**. \\(\\sin\\theta+\\cos\\theta=\\sqrt2\\sin(\\theta+\\tfrac\\pi4)\\), maximum \\(\\sqrt2\\) attained where \\(\\theta+\\tfrac\\pi4=\\tfrac\\pi2\\).\n" +
        "- **Double angle:** \\(\\sin x\\cos x=\\tfrac12\\sin2x\\) (max \\(\\tfrac12\\)); \\(\\sin2x\\cos2x=\\tfrac12\\sin4x\\) (max \\(\\tfrac12\\)); \\(2\\cos^2x-1=\\cos2x\\); \\(\\sin^2x=\\tfrac{1-\\cos2x}{2}\\) so \\(4\\sin^2x+1\\) has max 5 and min 1.\n" +
        "- **Reciprocal pair:** \\(\\tan x+\\cot x=\\dfrac{1}{\\sin x\\cos x}=\\dfrac{2}{\\sin2x}\\ge2\\) on \\((0,\\tfrac\\pi2)\\), so \\(\\dfrac{1}{\\tan x+\\cot x}=\\tfrac12\\sin2x\\) has max \\(\\tfrac12\\).\n" +
        "- **Triple angle:** \\(3\\sin x-4\\sin^3x=\\sin3x\\), \\(4\\cos^3x-3\\cos x=\\cos3x\\) — range \\([-1,1]\\).\n" +
        "- **Sum of squares of sine and cosine of the SAME angle is 1**, so \\(a\\sin^2x+b\\cos^2x\\) lies between \\(\\min(a,b)\\) and \\(\\max(a,b)\\).\n" +
        "For a quadratic in \\(\\sin x\\) or \\(\\cos x\\) that does not collapse, put \\(t=\\sin x\\in[-1,1]\\) and use the vertex or the endpoints — still no derivative.",
      formula: {
        label: "Range of a sin x + b cos x",
        latex: "-\\sqrt{a^2+b^2}\\ \\le\\ a\\sin x+b\\cos x\\ \\le\\ \\sqrt{a^2+b^2}, \\qquad \\sin x\\cos x=\\tfrac12\\sin 2x\\in\\left[-\\tfrac12,\\tfrac12\\right]",
      },
      authoredExample: {
        prompt: "Find the maximum value of \\(3\\sin x+4\\cos x+2\\).",
        steps: [
          "\\(3\\sin x+4\\cos x=\\sqrt{9+16}\\,\\sin(x+\\alpha)=5\\sin(x+\\alpha)\\) for some \\(\\alpha\\).",
          "Its maximum is \\(5\\), when \\(\\sin(x+\\alpha)=1\\).",
          "Add the constant: \\(5+2=7\\).",
        ],
        answer: "\\(7\\) (and the minimum is \\(-3\\)).",
      },
      selfCheckExample: {
        prompt: "What is the maximum value of \\(\\sin x\\cos x\\), and at which \\(x\\) in \\((0,\\pi)\\) is it attained?",
        steps: [
          "\\(\\sin x\\cos x=\\tfrac12\\sin2x\\).",
          "\\(\\sin2x\\le1\\), so the maximum is \\(\\tfrac12\\), attained when \\(2x=\\tfrac\\pi2\\).",
        ],
        answer: "\\(\\tfrac12\\), at \\(x=\\tfrac\\pi4\\).",
      },
      practiceSet: [
        { prompt: "Max of \\(a\\sin x+b\\cos x\\)?", answer: "\\(\\sqrt{a^2+b^2}\\)" },
        { prompt: "Max of \\(\\sin2x\\cos2x\\)?", answer: "\\(\\tfrac12\\)", method: "\\(=\\tfrac12\\sin4x\\)" },
        { prompt: "Min of \\(\\tan x+\\cot x\\) on \\((0,\\tfrac\\pi2)\\)?", answer: "\\(2\\)", method: "\\(=2/\\sin2x\\)" },
        { prompt: "Max of \\(4\\sin^2x+1\\)?", answer: "\\(5\\)", method: "\\(\\sin^2x\\le1\\)" },
        { prompt: "Range of \\(3\\sin x-4\\sin^3x\\)?", answer: "\\([-1,1]\\)", method: "\\(=\\sin3x\\)" },
      ],
      pyqExampleId: "cc15c869-5b0c-4875-b7a7-18bfb47c6d2d", // match-list: four trig maxima
      traps: [
        {
          title: "Differentiating \\(a\\sin x+b\\cos x\\) works but wastes a minute",
          body:
            "\\(f'=a\\cos x-b\\sin x=0\\Rightarrow\\tan x=\\tfrac ab\\), then substituting back needs \\(\\sin x=\\tfrac{a}{\\sqrt{a^2+b^2}}\\), \\(\\cos x=\\tfrac{b}{\\sqrt{a^2+b^2}}\\) with the right signs — three places to slip. The harmonic form gives \\(\\sqrt{a^2+b^2}\\) in one line and never asks about signs.",
        },
        {
          title: "Collapse BEFORE asking about intervals or periods",
          body:
            "\\(2\\cos^2x-1\\) looks like it has period \\(\\pi\\) and monotone runs of length \\(\\pi\\); it IS \\(\\cos2x\\), period \\(\\pi\\), monotone runs of length \\(\\tfrac\\pi2\\). The un-collapsed form invites the wrong period.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "aod-am-gm-shortcut",
      name: "AM-GM: the calculus-free shortcut",
      intuition:
        "When you want the **minimum of a sum** or the **maximum of a product** under a fixed-sum or fixed-product constraint, AM-GM gives the answer in one line — no derivatives. Equality (the optimum) occurs when the terms are equal.",
      definition:
        "For positive terms, AM \\(\\ge\\) GM: \\(\\dfrac{u+v}{2}\\ge\\sqrt{uv}\\), equality at \\(u=v\\). So a **sum with fixed product** is minimised, and a **product with fixed sum** is maximised, when the terms are equal. Examples: \\(a^2x+b^2y\\) with \\(xy=c^2\\) has min \\(2abc\\); \\(x+y=k\\Rightarrow xy\\) is max at \\(x=y=k/2\\).\n" +
        "- **The squared face of AM–GM:** \\(ab\\le\\dfrac{a^2+b^2}{2}\\) (apply it to \\(a^2,b^2\\)), equality at \\(a=b\\). So under \\(a^2+b^2=64\\) the product \\(ab\\) is at most 32, and a rectangle inscribed in a circle of radius \\(r\\) (\\(a^2+b^2=4r^2\\)) has area at most \\(2r^2\\) — a square.\n" +
        "- **The other calculus-free move — the quadratic vertex:** \\(ax^2+bx+c\\) has its extreme at \\(x=-\\dfrac{b}{2a}\\), value \\(c-\\dfrac{b^2}{4a}=-\\dfrac{D}{4a}\\) (a minimum if \\(a>0\\), a maximum if \\(a<0\\)). Anything that reduces to a quadratic in one variable — including \\(\\sin^2x\\) or \\(\\cos x\\) as the variable — is finished this way, provided the vertex lies in the variable's allowed range (else use the endpoints).",
      formula: {
        label: "AM-GM",
        latex: "\\frac{u+v}{2}\\ge\\sqrt{uv}\\quad(u,v>0),\\ \\text{equality at } u=v",
      },
      authoredExample: {
        prompt: "If \\(x+y=20\\), what is the maximum of \\(P=xy\\)?",
        steps: [
          "Product with fixed sum is greatest when \\(x=y\\).",
          "\\(x=y=10\\Rightarrow P=100\\).",
        ],
        answer: "\\(100\\).",
      },
      selfCheckExample: {
        prompt: "Find the minimum of \\(a^2x+b^2y\\) subject to \\(xy=c^2\\).",
        steps: [
          "AM-GM: \\(a^2x+b^2y\\ge 2\\sqrt{a^2x\\cdot b^2y}=2ab\\sqrt{xy}\\).",
          "\\(=2ab\\,c\\), attained when \\(a^2x=b^2y\\).",
        ],
        answer: "\\(2abc\\).",
      },
      practiceSet: [
        { prompt: "AM-GM equality holds when?", answer: "The terms are equal" },
        { prompt: "\\(x+y=k\\): \\(xy\\) is max at?", answer: "\\(x=y=k/2\\)" },
        { prompt: "Min of \\(a^2x+b^2y\\) with \\(xy=c^2\\)?", answer: "\\(2abc\\)" },
        { prompt: "AM-GM beats calculus for which problems?", answer: "Min-of-sum / max-of-product under a constraint" },
      ],
      pyqExampleId: "0f2ce6a6-71c1-45fb-82c3-81255ed845fd", // min a^2 x + b^2 y, xy=c^2
    },
  ],
  related: [
    { label: "Monotonicity & Extrema", href: "/notes/nda-maths/application-of-derivatives/aod-monotonicity-extrema" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
