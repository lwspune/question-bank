import type { SubtopicNote } from "@/app/notes/_types";

export const MODULUS_QE_NOTE: SubtopicNote = {
  subtopicName: "Equations with Modulus and Greatest Integer",
  title: "Equations with Modulus and Greatest Integer",
  oneLineDefinition:
    "Equations with |x| or [x] in them: split the line where each part changes form, solve an ordinary quadratic on each piece, and keep only the roots that lie in their piece.",
  whyItMatters:
    "Twenty-four PYQs, fifteen of them multiple choice, and five from 2026. Thirteen split the number line where each modulus changes sign and solve one quadratic per piece; eight take one modulus such as |x| or |x − 1| as the unknown, or use |A + B| = |A| + |B|; three mix [x] or {x} into a quadratic. Three ideas cover the page.",
  concepts: [
    // C1 — casework at critical points
    {
      kind: "formula" as const,
      slug: "jqe-casework",
      name: "Splitting at the critical points",
      intuition:
        "\\(|x-a|\\) equals \\(x-a\\) to the right of \\(a\\) and \\(a-x\\) to the left. Mark every such point on the line. On each piece every modulus has a fixed sign, so the equation is an ordinary quadratic. Solve it, then keep a root only if it lies in its own piece. Most questions ask how many roots there are, so this last check decides the answer.",
      definition:
        "- Critical points: where each expression inside a modulus is \\(0\\).\n" +
        "- On each piece, drop the bars with the right sign and solve.\n" +
        "- Keep a root only if it lies in its piece.\n" +
        "- \\(x|x-a|\\) is \\(x(x-a)\\) for \\(x\\ge a\\) and \\(-x(x-a)\\) for \\(x<a\\).",
      formula: {
        label: "Definition of modulus",
        latex: "|x-a|=\\begin{cases}x-a,& x\\ge a\\\\ a-x,& x<a\\end{cases}",
      },
      authoredExample: {
        prompt: "Solve \\(x^2-3|x-1|-1=0\\).",
        steps: [
          "The critical point is \\(x=1\\).",
          "\\(x\\ge1\\): \\(x^2-3x+2=0\\), so \\(x=1\\) or \\(2\\); both lie in the piece.",
          "\\(x<1\\): \\(x^2+3x-4=0\\), so \\(x=1\\) or \\(-4\\); only \\(-4\\) lies in the piece.",
        ],
        answer: "Three roots: \\(-4\\), \\(1\\), \\(2\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(|x^2-4|=3x\\).",
        steps: [
          "The right side must be \\(\\ge0\\), so \\(x\\ge0\\).",
          "\\(x\\ge2\\): \\(x^2-3x-4=0\\) gives \\(x=4\\). \\(0\\le x<2\\): \\(x^2+3x-4=0\\) gives \\(x=1\\).",
        ],
        answer: "\\(x=1\\) or \\(x=4\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(|x-2|=x^2-4\\)?", answer: "\\(x=2\\) or \\(x=-3\\)" },
        { prompt: "Critical points of \\(|x+1|+|x-3|\\)?", answer: "\\(x=-1\\) and \\(x=3\\)" },
        { prompt: "Real roots of \\(x|x|=4\\)?", answer: "One: \\(x=2\\)" },
        { prompt: "Number of roots of \\(|x-1|=x^2-2x-1\\)?", answer: "Two: \\(x=-1\\) and \\(x=3\\)" },
      ],
      pyqExampleId: "efce889c-e59f-4caa-89f9-81cb37361c87", // 2026 — count the real solutions of x|x + 3| + |x − 1| − 2 = 0
      traps: [
        {
          title: "A root on the boundary is counted once",
          body: "A critical point can solve the equation in both neighbouring pieces. Count it once. And reject a root from a piece it does not lie in, even though it solves that piece's quadratic.",
        },
      ],
    },

    // C2 — one modulus as the unknown
    {
      kind: "formula" as const,
      slug: "jqe-abs-substitution",
      name: "One modulus as the unknown",
      intuition:
        "\\(x^2=|x|^2\\), so \\(x^2-5|x|+6=0\\) is a quadratic in \\(t=|x|\\): solve for \\(t\\ge0\\), then each positive \\(t\\) gives two values of \\(x\\). The same works for \\((x-1)^2\\) with \\(|x-1|\\). A second shortcut: \\(|A+B|=|A|+|B|\\) holds exactly when \\(A\\) and \\(B\\) have the same sign, so such an equation becomes the inequality \\(AB\\ge0\\).",
      definition:
        "- \\(x^2=|x|^2\\): put \\(t=|x|\\) and keep roots \\(t\\ge0\\).\n" +
        "- \\(t>0\\) gives \\(x=\\pm t\\); \\(t=0\\) gives \\(x=0\\) only.\n" +
        "- \\(|A+B|=|A|+|B|\\) exactly when \\(AB\\ge0\\).\n" +
        "- \\(|A|<k\\) means \\(-k<A<k\\).",
      formula: {
        label: "Equality in the triangle inequality",
        latex: "|A+B|=|A|+|B|\\quad\\text{exactly when}\\quad AB\\ge0",
      },
      authoredExample: {
        prompt: "Find the sum of the squares of the roots of \\(x^2-5|x|+4=0\\).",
        steps: [
          "Put \\(t=|x|\\): \\(t^2-5t+4=0\\), so \\(t=1\\) or \\(4\\).",
          "Each gives two roots: \\(x=\\pm1,\\pm4\\).",
        ],
        answer: "\\(1+1+16+16=34\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(|x^2+x-6|=|x^2-4|+|x-2|\\).",
        steps: [
          "\\(x^2+x-6=(x^2-4)+(x-2)\\), so the equation is \\(|A+B|=|A|+|B|\\).",
          "\\(AB=(x-2)^2(x+2)\\ge0\\) gives \\(x\\ge-2\\).",
        ],
        answer: "Every \\(x\\ge-2\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2-|x|-2=0\\)?", answer: "\\(x=\\pm2\\)" },
        { prompt: "Roots of \\(x^2+3|x|+2=0\\)?", answer: "None: both values of \\(|x|\\) are negative" },
        { prompt: "Integers \\(n\\) with \\(|n^2-9|<7\\)?", answer: "Four: \\(n=\\pm2,\\pm3\\)" },
        { prompt: "Roots of \\((x-2)^2-3|x-2|+2=0\\)?", answer: "\\(0,1,3,4\\)" },
      ],
      pyqExampleId: "0e467065-44d5-4bea-85e3-972c8b5dbfa9", // 2026 — |x^2 + x − 9| = |x| + |x^2 − 9| as |A + B| = |A| + |B|
      traps: [
        {
          title: "Reject negative values of |x|",
          body: "The quadratic in \\(t=|x|\\) can have a negative root, and it gives no \\(x\\) at all. Count roots only from \\(t\\ge0\\), and remember that \\(t=0\\) gives one root, not two.",
        },
      ],
    },

    // C3 — greatest integer and fractional part
    {
      kind: "formula" as const,
      slug: "jqe-greatest-integer",
      name: "Greatest integer and fractional part",
      intuition:
        "Write \\(x=[x]+\\{x\\}\\), with \\([x]\\) an integer and \\(0\\le\\{x\\}<1\\). Two routes. Factor the equation and see what \\([x]\\) or \\(\\{x\\}\\) must equal — a factor that forces \\(\\{x\\}=3\\) gives nothing. Or put \\([x]=n\\), a constant: then \\(x\\) lies in \\([n,n+1)\\), the equation is a quadratic in \\(x\\), and only roots inside that interval count.",
      definition:
        "- \\(x=[x]+\\{x\\}\\), \\([x]\\in\\mathbb Z\\), \\(0\\le\\{x\\}<1\\).\n" +
        "- Put \\([x]=n\\): then \\(n\\le x<n+1\\), and the equation is a quadratic in \\(x\\).\n" +
        "- An equation forcing \\(\\{x\\}\\ge1\\) or \\(\\{x\\}<0\\) has no solution.",
      formula: {
        label: "Greatest integer",
        latex: "[x]=n\\quad\\text{exactly when}\\quad n\\le x<n+1",
      },
      authoredExample: {
        prompt: "Solve \\(x^2-3[x]-4=0\\).",
        steps: [
          "Put \\([x]=n\\): \\(x^2=3n+4\\), with \\(n\\le x<n+1\\).",
          "For \\(x\\ge0\\), \\(n\\le\\sqrt{3n+4}<n+1\\) holds only for \\(n=3\\) and \\(n=4\\): \\(x=\\sqrt{13}\\) or \\(4\\).",
          "For \\(x<0\\), \\(3n+4\\ge0\\) forces \\(n=-1\\), and \\(x=-1\\) lies in \\([-1,0)\\).",
        ],
        answer: "\\(x=-1\\), \\(\\sqrt{13}\\), \\(4\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\([x]^2-5[x]+6=0\\).",
        steps: [
          "A quadratic in \\(n=[x]\\): \\(n=2\\) or \\(n=3\\).",
        ],
        answer: "\\(2\\le x<4\\).",
      },
      practiceSet: [
        { prompt: "\\([x]=-2\\) means?", answer: "\\(-2\\le x<-1\\)" },
        { prompt: "\\(\\{x\\}\\) for \\(x=-1.3\\)?", answer: "\\(0.7\\)" },
        { prompt: "Solve \\([x]^2=4\\).", answer: "\\([-2,-1)\\cup[2,3)\\)" },
        { prompt: "Solve \\(x^2=[x]+2\\) for \\(x\\ge0\\).", answer: "\\(x=\\sqrt3\\) or \\(x=2\\)" },
      ],
      pyqExampleId: "8447ad07-14b3-46e9-9caf-2ac24f4a3980", // 2023 — factor out (x − 1); the other factor forces {x} = 3
      traps: [
        {
          title: "The fractional part is below 1",
          body: "\\(\\{x\\}\\) is never \\(1\\) or more and never negative. A factor that forces \\(\\{x\\}=3\\), or any value outside \\([0,1)\\), gives no root.",
        },
      ],
    },
  ],
};
