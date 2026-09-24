import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_FUNCTIONS_NOTE: SubtopicNote = {
  subtopicName: "Discontinuities of [x], |x| and sgn x — Counting the Points",
  title: "Discontinuities of [x], |x| and sgn x — Counting the Points",
  oneLineDefinition:
    "The greatest-integer, modulus and sign functions carry built-in jumps — the question is where they land, whether another factor cancels them, and how many there are in a given interval.",
  whyItMatters:
    "The smallest page in the chapter — 6 PYQs at 50% HARD — but a distinct question type with no coverage anywhere else: 'how many points of discontinuity' and 'discontinuous at which set'. " +
    "It reuses the one-sided habit from the first page and the three-part test from the continuity pages; what is new is the counting, and the one case where a vanishing factor swallows a jump. " +
    "One of the six carries an exam key that contradicts the mathematics, and knowing which is part of the preparation.",
  concepts: [
    // 1 — [x] at every integer, counting
    {
      kind: "formula" as const,
      slug: "cetlim-gif-discontinuous-at-integers",
      name: "[x] Is Discontinuous at Every Integer — Counting Them",
      intuition:
        "The staircase \\([x]\\) steps up by \\(1\\) at each integer and is flat in between. So its discontinuities are exactly the integers, and 'how many in \\((a, b)\\)' is a counting question: how many integers lie strictly inside.",
      definition:
        "- At an integer \\(n\\): left limit \\(n - 1\\), right limit \\(n\\), value \\(n\\). The left limit disagrees, so \\([x]\\) is **discontinuous at every integer** and continuous everywhere else.\n" +
        "- \\([x]\\) is **right-continuous** at integers (right limit \\(=\\) value). At a closed left endpoint that is an integer, there is no left approach, so no discontinuity there; at a closed right endpoint that is an integer, the left approach fails, so it counts.\n" +
        "- Counting integers in an open interval \\((a, b)\\): from \\(\\lceil a \\rceil\\) (or \\(a + 1\\) if \\(a\\) is an integer) to \\(\\lfloor b \\rfloor\\) (or \\(b - 1\\) if \\(b\\) is an integer). In \\(\\left(-\\frac{7}{2}, 100\\right)\\): \\(-3, -2, \\dots, 99\\) — that is \\(3 + 1 + 99 = 103\\).\n" +
        "- \\([kx]\\) jumps where \\(kx\\) is an integer, i.e. at multiples of \\(\\dfrac{1}{k}\\); \\(\\left[\\dfrac{x}{2}\\right]\\) jumps at even integers.",
      formula: {
        label: "Jumps of the greatest-integer function",
        latex:
          "\\lim_{x\\to n^-}[x] = n - 1 \\ne n = [n] \\quad (n \\in \\mathbb{Z}) \\qquad [kx] \\text{ jumps at } x = \\frac{m}{k},\\ m \\in \\mathbb{Z}",
      },
      visualizationSlug: "greatest-integer-staircase",
      authoredExample: {
        prompt: "How many points of discontinuity does \\(f(x) = [x]\\) have on \\((-2.5, 6)\\)?",
        steps: [
          "Discontinuities are at the integers inside the open interval.",
          "Integers strictly between \\(-2.5\\) and \\(6\\): \\(-2, -1, 0, 1, 2, 3, 4, 5\\).",
          "Count: \\(8\\).",
        ],
        answer: "\\(8\\)",
      },
      selfCheckExample: {
        prompt: "How many points of discontinuity does \\(f(x) = [2x]\\) have on \\((0, 3)\\)?",
        steps: [
          "\\([2x]\\) jumps where \\(2x\\) is an integer, i.e. at \\(x = \\dfrac{m}{2}\\).",
          "In \\((0, 3)\\): \\(x = \\dfrac{1}{2}, 1, \\dfrac{3}{2}, 2, \\dfrac{5}{2}\\).",
        ],
        answer: "\\(5\\)",
      },
      practiceSet: [
        {
          prompt: "Points of discontinuity of \\([x]\\) on \\((0, 10)\\)?",
          answer: "\\(9\\)",
          method: "Integers \\(1\\) to \\(9\\).",
        },
        {
          prompt: "Points of discontinuity of \\([x]\\) on \\((-3.5, 4.5)\\)?",
          answer: "\\(8\\)",
          method: "\\(-3\\) to \\(4\\).",
        },
        {
          prompt: "Points of discontinuity of \\(\\left[\\dfrac{x}{2}\\right]\\) on \\((0, 8)\\)?",
          answer: "\\(3\\)",
          method: "\\(x = 2, 4, 6\\).",
        },
        {
          prompt: "Is \\([x]\\) continuous at \\(x = 2.5\\)?",
          answer: "Yes — constant (\\(= 2\\)) on an interval around it.",
        },
      ],
      pyqExampleId: "02d9b586-e5e5-4ccc-b7a9-15ba4271e87d",
      traps: [
        {
          title: "Miscounting the negative side",
          body:
            "In \\(\\left(-\\frac{7}{2}, 100\\right)\\) the integers are \\(-3, -2, -1\\) (three of them), then \\(0\\), then \\(1\\) to \\(99\\). Forgetting \\(0\\), or including \\(100\\), gives \\(102\\) or \\(104\\) — both offered.",
        },
      ],
    },

    // 2 — sign jumps
    {
      kind: "formula" as const,
      slug: "cetlim-sign-jumps-modulus-over-itself",
      name: "Signum-Type Jumps: (x − a)/|x − a| and Products with It",
      intuition:
        "\\(\\dfrac{x - a}{|x - a|}\\) is \\(+1\\) on one side of \\(a\\) and \\(-1\\) on the other: a jump of size \\(2\\) that no choice of \\(f(a)\\) can bridge. Anything multiplied by it inherits the jump unless the other factor is \\(0\\) at \\(a\\).",
      definition:
        "- \\(\\dfrac{x - a}{|x - a|} = \\dfrac{|x - a|}{x - a} = \\begin{cases} 1, & x > a \\\\ -1, & x < a \\end{cases}\\); it is undefined at \\(a\\) and discontinuous there whatever value is assigned.\n" +
        "- \\(\\dfrac{p(x)}{|(x - 1)(x - 2)|}\\) with \\(p\\) divisible by \\((x - 1)(x - 2)\\): the polynomial parts cancel, leaving sign factors at \\(1\\) and \\(2\\). Each gives a jump, so \\(f\\) is continuous on \\(\\mathbb{R} - \\{1, 2\\}\\) and nowhere else can be repaired.\n" +
        "- A piecewise function built from \\(\\dfrac{x - 3}{|x - 3|} + a\\) on the left and \\(\\dfrac{|x - 3|}{x - 3} + b\\) on the right **can** be continuous — the sign factors evaluate to \\(-1\\) and \\(+1\\), giving ordinary equations \\(-1 + a = 1 + b = f(3)\\).\n" +
        "- \\(|x|\\) itself is continuous everywhere; only \\(|x|\\) **divided by** something vanishing at the same point produces a jump.",
      formula: {
        label: "The sign factor",
        latex:
          "\\frac{x - a}{|x - a|} = \\begin{cases} 1, & x > a \\\\ -1, & x < a \\end{cases} \\qquad \\text{jump of size } 2 \\text{ at } a",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{x^2 - 1}{|x - 1|}\\) for \\(x \\neq 1\\). Can \\(f(1)\\) be chosen so that \\(f\\) is continuous at \\(1\\)?",
        steps: [
          "\\(x^2 - 1 = (x - 1)(x + 1)\\), so \\(f(x) = (x + 1)\\cdot\\dfrac{x - 1}{|x - 1|}\\).",
          "Right of \\(1\\): \\((x + 1)(1) \\to 2\\). Left of \\(1\\): \\((x + 1)(-1) \\to -2\\).",
          "The one-sided limits differ; no value of \\(f(1)\\) bridges a jump.",
        ],
        answer: "No — \\(f\\) is discontinuous at \\(1\\) for every choice of \\(f(1)\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{|x - 2|}{x - 2} + 3\\) for \\(x \\neq 2\\) and \\(f(2) = 3\\). Is \\(f\\) continuous at \\(2\\)?",
        steps: [
          "Left of \\(2\\): \\(-1 + 3 = 2\\). Right of \\(2\\): \\(1 + 3 = 4\\).",
          "\\(2 \\neq 4\\): a jump; \\(f(2) = 3\\) cannot help.",
        ],
        answer: "No — discontinuous at \\(2\\).",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 3^+}\\dfrac{|x - 3|}{x - 3} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "Size of the jump of \\(\\dfrac{x^2 - 4}{|x - 2|}\\) at \\(x = 2\\)?",
          answer: "\\(8\\)",
          method: "One-sided limits \\(\\pm 4\\).",
        },
        {
          prompt: "Is \\(|x|\\) continuous at \\(0\\)?",
          answer: "Yes.",
        },
        {
          prompt: "On which set is \\(\\dfrac{|x|}{x}\\) continuous?",
          answer: "\\(\\mathbb{R} - \\{0\\}\\).",
        },
      ],
      pyqExampleId: "33a41771-4efb-4ee4-af66-bcbd3aa9f853",
      traps: [
        {
          title: "Cancelling |x − 1| against (x − 1)",
          body:
            "\\(\\dfrac{x - 1}{|x - 1|}\\) is not \\(1\\); it is \\(\\pm 1\\) depending on the side. Cancelling as if the modulus were absent loses the jump and produces 'continuous on \\(\\mathbb{R}\\)', which is always an option.",
        },
      ],
    },

    // 3 — piecewise with [x] and |x|
    {
      kind: "formula" as const,
      slug: "cetlim-piecewise-gif-modulus-every-join",
      name: "Piecewise with [x] and |x|: Check Every Join and Both Endpoints",
      intuition:
        "A function built from \\([x]\\) and \\(|x|\\) on several intervals can fail at the seams between pieces AND at the integers inside each piece. List every candidate, test each with left/right/value, and count only the failures.",
      definition:
        "- **Candidates**: every seam between pieces, every integer inside a piece that contains \\([x]\\), and both endpoints of a closed domain.\n" +
        "- At each candidate compute left limit, right limit and value using the correct piece for each side.\n" +
        "- **Endpoints**: at a closed left endpoint only the right limit exists, so continuity there means right limit \\(=\\) value; symmetrically at a closed right endpoint. \\(x + [x]\\) at the right endpoint \\(3\\) has left limit \\(3 + 2 = 5\\) but value \\(6\\) — discontinuous.\n" +
        "- Two pieces that happen to agree at a seam (\\(x + |x|\\) and \\(x + [x]\\) both give \\(4\\) at \\(2\\)) make that seam continuous even though the formulas differ.\n" +
        "- Report the **count** or the **set**, as asked; 'only three points' means exactly three.",
      formula: {
        label: "Continuity at a closed endpoint",
        latex:
          "\\text{left endpoint } a:\\ \\lim_{x\\to a^+} f(x) = f(a) \\qquad \\text{right endpoint } b:\\ \\lim_{x\\to b^-} f(x) = f(b)",
      },
      authoredExample: {
        prompt: "\\(f(x) = [x] + |x|\\) on \\([-1, 2)\\). At how many points is \\(f\\) discontinuous?",
        steps: [
          "Candidates: the integers in the domain, \\(-1, 0, 1\\). (\\(|x|\\) is continuous; only \\([x]\\) can jump.)",
          "At \\(-1\\) (left endpoint): value \\(-1 + 1 = 0\\); right limit \\(-1 + 1 = 0\\). Continuous.",
          "At \\(0\\): left limit \\(-1 + 0 = -1\\); right limit \\(0 + 0 = 0\\). Jump.",
          "At \\(1\\): left limit \\(0 + 1 = 1\\); right limit \\(1 + 1 = 2\\). Jump.",
        ],
        answer: "\\(2\\) points (\\(x = 0\\) and \\(x = 1\\)).",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = x + [x]\\) on \\((-2, 2)\\). At how many points is \\(f\\) discontinuous?",
        steps: [
          "\\(x\\) is continuous; \\([x]\\) jumps at every integer inside \\((-2, 2)\\): \\(-1, 0, 1\\).",
          "At each, the left limit is \\(1\\) less than the right limit, so all three are jumps.",
        ],
        answer: "\\(3\\)",
      },
      pyqExampleId: "37b04a6a-30e2-459c-9a73-451a541ab7d8",
      traps: [
        {
          title: "Forgetting the closed right endpoint",
          body:
            "On \\([-1, 3]\\) with \\(f(x) = x + [x]\\) near \\(3\\), the value \\(f(3) = 6\\) is not the left limit \\(5\\). A student who only checks interior seams reports two points; the answer is three.",
        },
      ],
    },

    // 4 — composites of [x]
    {
      kind: "formula" as const,
      slug: "cetlim-composite-greatest-integer",
      name: "Composites of [x]: Where Does the Inner Function Cross an Integer?",
      intuition:
        "\\([g(x)]\\) jumps whenever \\(g(x)\\) crosses an integer. For \\([x^2]\\) that happens at \\(x = \\pm\\sqrt{n}\\); for \\(\\left[x\\left[\\frac{x}{2}\\right]\\right]\\) you have to track both the inner staircase and the product it feeds into.",
      definition:
        "- \\([g(x)]\\) is discontinuous at each \\(x\\) where \\(g(x)\\) passes **through** an integer value, provided \\(g\\) is continuous and strictly monotone there. Where \\(g\\) merely **touches** an integer without crossing, check separately.\n" +
        "- \\([x^2]\\) on \\((0, 2)\\): \\(x^2\\) crosses \\(1, 2, 3\\) at \\(x = 1, \\sqrt2, \\sqrt3\\) — three jumps.\n" +
        "- \\([-x^2]\\) uses \\([-u] = -[u] - 1\\) for non-integer \\(u\\): as \\(x^2 \\to 9^-\\), \\([x^2] = 8\\) and \\([-x^2] = -9\\); as \\(x^2 \\to 9^+\\), \\([x^2] = 9\\) and \\([-x^2] = -10\\). So \\([x^2] - [-x^2]\\) has left limit \\(17\\) and right limit \\(19\\) at \\(x = 3\\) — **no** \\(k\\) makes it continuous.\n" +
        "- \\(\\left[x\\left[\\frac{x}{2}\\right]\\right]\\) on \\((-10, 10)\\): the inner \\(\\left[\\frac{x}{2}\\right]\\) is constant on each \\([2m, 2m + 2)\\), so the product is \\(mx\\) there, and \\([mx]\\) jumps at multiples of \\(\\frac{1}{|m|}\\) inside that block; the seams \\(x = 2m\\) must also be tested. The bank's answer is \\(8\\) points.",
      formula: {
        label: "Jumps of a composite",
        latex:
          "[g(x)] \\text{ jumps where } g(x) \\in \\mathbb{Z} \\text{ and } g \\text{ crosses it} \\qquad [-u] = -[u] - 1 \\ (u \\notin \\mathbb{Z})",
      },
      authoredExample: {
        prompt: "How many points of discontinuity does \\(f(x) = [x^2]\\) have on \\((0, 2)\\)?",
        steps: [
          "On \\((0, 2)\\), \\(x^2\\) increases from \\(0\\) to \\(4\\), crossing the integers \\(1, 2, 3\\).",
          "Crossings at \\(x = 1, \\sqrt2, \\sqrt3\\), all inside \\((0, 2)\\).",
        ],
        answer: "\\(3\\)",
      },
      selfCheckExample: {
        prompt: "Find the one-sided limits of \\(f(x) = [x^2] - [-x^2]\\) as \\(x \\to 2\\).",
        steps: [
          "As \\(x \\to 2^-\\), \\(x^2 \\to 4^-\\): \\([x^2] = 3\\), \\([-x^2] = -4\\); \\(f \\to 3 + 4 = 7\\).",
          "As \\(x \\to 2^+\\), \\(x^2 \\to 4^+\\): \\([x^2] = 4\\), \\([-x^2] = -5\\); \\(f \\to 4 + 5 = 9\\).",
        ],
        answer: "Left limit \\(7\\), right limit \\(9\\) — \\(f\\) cannot be made continuous at \\(2\\).",
      },
      practiceSet: [
        {
          prompt: "Points of discontinuity of \\([x^2]\\) on \\((0, 3)\\)?",
          answer: "\\(8\\)",
          method: "\\(x^2\\) crosses \\(1\\) to \\(8\\).",
        },
        {
          prompt: "Points of discontinuity of \\([\\sqrt{x}]\\) on \\((0, 10)\\)?",
          answer: "\\(3\\)",
          method: "\\(x = 1, 4, 9\\).",
        },
        {
          prompt: "\\([-u]\\) for \\(u = 2.3\\)?",
          answer: "\\(-3\\)",
          method: "\\(-[u] - 1 = -2 - 1\\).",
        },
        {
          prompt: "Where does \\([2x]\\) jump?",
          answer: "At every multiple of \\(\\dfrac{1}{2}\\).",
        },
      ],
      pyqExampleId: "9aae2667-aef5-4ffa-81ca-4fd23f357ee5",
      traps: [
        {
          title: "Answering the 'find k' question when no k exists",
          body:
            "\\([x^2] - [-x^2]\\) at \\(3\\) has one-sided limits \\(17\\) and \\(19\\). The exam key takes the right-hand value \\(19\\); mathematically no \\(k\\) works. On the paper choose \\(19\\); in your notes, know why the question is flawed.",
        },
      ],
    },

    // 5 — vanishing factor swallows the jump
    {
      kind: "formula" as const,
      slug: "cetlim-vanishing-factor-swallows-the-jump",
      name: "When the Other Factor Vanishes at the Jump",
      intuition:
        "\\([x]\\) jumps by \\(1\\) at \\(n\\). Multiply it by something that is \\(0\\) at \\(n\\) and continuous there, and the jump is multiplied by \\(0\\): both one-sided limits become \\(0\\), the value is \\(0\\), and the product is continuous.",
      definition:
        "- If \\(g\\) is continuous at \\(n\\) with \\(g(n) = 0\\), and \\(h\\) is **bounded** near \\(n\\) (any \\([\\cdot]\\) or sign function is), then \\(g\\cdot h \\to 0 = g(n)h(n)\\): the product is **continuous** at \\(n\\).\n" +
        "- \\([x]\\sin\\pi x\\): \\(\\sin\\pi n = 0\\) at every integer, so the product is continuous on all of \\(\\mathbb{R}\\).\n" +
        "- \\([x]\\cos\\dfrac{(2x - 1)\\pi}{2}\\): at \\(x = n\\), \\(\\cos\\dfrac{(2n - 1)\\pi}{2} = 0\\) — the cosine of an odd multiple of \\(\\dfrac{\\pi}{2}\\) — so this too is continuous at every integer, hence everywhere.\n" +
        "- If \\(g(n) \\neq 0\\) the jump survives: \\([x](x - 1)(x - 2)\\) is discontinuous at every integer **except** \\(1\\) and \\(2\\).\n" +
        "- The test is at each integer separately: which integers make the other factor zero?",
      formula: {
        label: "A zero swallows a bounded jump",
        latex:
          "g \\text{ continuous at } n,\\ g(n) = 0,\\ |h| \\le M \\text{ near } n \\ \\Rightarrow\\ \\lim_{x\\to n} g(x)h(x) = 0 = g(n)h(n)",
      },
      authoredExample: {
        prompt: "Where is \\(f(x) = [x]\\sin\\pi x\\) discontinuous?",
        steps: [
          "Away from integers both factors are continuous, so \\(f\\) is continuous there.",
          "At an integer \\(n\\): \\(\\sin\\pi x\\) is continuous with \\(\\sin\\pi n = 0\\), and \\([x]\\) is bounded near \\(n\\) (it is \\(n - 1\\) or \\(n\\)).",
          "So \\(f(x) \\to 0\\) from both sides, and \\(f(n) = n\\sin\\pi n = 0\\). Continuous at \\(n\\) as well.",
        ],
        answer: "Nowhere — \\(f\\) is continuous on \\(\\mathbb{R}\\).",
      },
      selfCheckExample: {
        prompt: "At which integers is \\(f(x) = [x](x - 1)(x - 2)\\) discontinuous?",
        steps: [
          "At an integer \\(n\\), \\([x]\\) jumps by \\(1\\); the product's jump is \\((n - 1)(n - 2)\\) times that.",
          "The jump vanishes exactly when \\((n - 1)(n - 2) = 0\\), i.e. \\(n = 1\\) or \\(n = 2\\).",
        ],
        answer: "At every integer except \\(1\\) and \\(2\\).",
      },
      practiceSet: [
        {
          prompt: "Is \\([x]\\sin\\pi x\\) continuous at \\(x = 5\\)?",
          answer: "Yes — \\(\\sin 5\\pi = 0\\) swallows the jump.",
        },
        {
          prompt: "Is \\([x]\\cos\\pi x\\) continuous at \\(x = 5\\)?",
          answer: "No — \\(\\cos 5\\pi = -1 \\neq 0\\); the jump survives.",
        },
        {
          prompt: "\\(\\cos\\dfrac{(2n - 1)\\pi}{2}\\) for integer \\(n\\) equals?",
          answer: "\\(0\\)",
          method: "Odd multiple of \\(\\pi/2\\).",
        },
        {
          prompt: "Is \\(x[x]\\) continuous at \\(x = 0\\)?",
          answer: "Yes — the factor \\(x\\) is \\(0\\) there.",
        },
      ],
      pyqExampleId: "25a45112-2983-4823-b0c2-a0536bb2731b",
      traps: [
        {
          title: "The exam key that contradicts the mathematics",
          body:
            "For \\([x]\\cos\\dfrac{(2x - 1)\\pi}{2}\\) the official MHT-CET key marks 'all integer points', reasoning only that \\([x]\\) jumps there. The cosine is \\(0\\) at every integer, so the function is in fact continuous everywhere. " +
            "Know the correct mathematics; on that particular paper, the marked answer was the key's.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Limits — Existence, One-Sided Limits and Limits at Infinity (where [x] and |x| near a point are introduced)",
      href: "/notes/mht-cet-maths/limits/cetlim-existence-and-infinity",
    },
    {
      label: "Continuity of Piecewise Functions — the seam test this page extends",
      href: "/notes/mht-cet-maths/limits/cetlim-piecewise-continuity",
    },
  ],
};
