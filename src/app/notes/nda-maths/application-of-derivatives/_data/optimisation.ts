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
        "1. Express the target \\(Q\\) and the constraint. 2. Eliminate a variable so \\(Q=Q(t)\\) in one variable. 3. Solve \\(Q'(t)=0\\) for critical \\(t\\). 4. Verify with \\(Q''\\) or the first-derivative test (and check the domain's endpoints). Classic set-ups: a cylinder/box of fixed volume with least surface, the shortest distance from a point to a curve, \\(\\sum (x-a_j)^2\\) minimised at the mean.",
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
        "Model the area/volume, use the geometric constraint (perimeter, radius, given side), reduce to one variable (often an angle \\(\\theta\\)), and optimise. Useful facts: max-area triangle inscribed in a circle of radius \\(R\\) is equilateral (area \\(\\tfrac{3\\sqrt3}{4}R^2\\)); fixed-perimeter rectangle ⇒ square; a sector of fixed perimeter has max area at a specific radius/angle.",
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
      slug: "aod-am-gm-shortcut",
      name: "AM-GM: the calculus-free shortcut",
      intuition:
        "When you want the **minimum of a sum** or the **maximum of a product** under a fixed-sum or fixed-product constraint, AM-GM gives the answer in one line — no derivatives. Equality (the optimum) occurs when the terms are equal.",
      definition:
        "For positive terms, AM \\(\\ge\\) GM: \\(\\dfrac{u+v}{2}\\ge\\sqrt{uv}\\), equality at \\(u=v\\). So a **sum with fixed product** is minimised, and a **product with fixed sum** is maximised, when the terms are equal. Examples: \\(a^2x+b^2y\\) with \\(xy=c^2\\) has min \\(2abc\\); \\(x+y=k\\Rightarrow xy\\) is max at \\(x=y=k/2\\).",
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
