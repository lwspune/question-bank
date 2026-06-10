import type { SubtopicNote } from "@/app/notes/_types";

export const DIFFERENTIABILITY_NOTE: SubtopicNote = {
  subtopicName:
    "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
  title: "Differentiability — When the Derivative Exists",
  oneLineDefinition:
    "A function is differentiable at a point only if its left-hand and right-hand derivatives both exist and are equal — corners, jumps, and steps are where this fails.",
  whyItMatters:
    "NDA loves to test the gap between continuity and differentiability. The modulus, piecewise, and greatest-integer functions are the standard counter-examples, and parameter problems ('find a, b so f is differentiable') hinge entirely on matching one-sided derivatives.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "diff-differentiable-implies-continuous",
      name: "Differentiable implies continuous (not the converse)",
      intuition:
        "Differentiability is the **stronger** condition. If a function has a derivative at a point, it must be continuous there — but a continuous function can still fail to be differentiable (a sharp corner). So 'differentiable \\(\\Rightarrow\\) continuous' is a one-way street.",
      definition:
        "- If \\(f\\) is **differentiable** at \\(x=c\\), then \\(f\\) is **continuous** at \\(c\\).\n" +
        "- The **converse is false**: \\(|x|\\) is continuous at \\(0\\) but not differentiable there.\n" +
        "- Contrapositive (useful): if \\(f\\) is **discontinuous** at \\(c\\), it cannot be differentiable at \\(c\\).",
      authoredExample: {
        prompt:
          "A function has a jump discontinuity at \\(x=2\\). Can it be differentiable at \\(x=2\\)?",
        steps: [
          "Differentiability requires continuity first (differentiable \\(\\Rightarrow\\) continuous).",
          "The function is discontinuous at \\(x=2\\), so the necessary condition already fails.",
        ],
        answer: "No — a discontinuous point can never be a differentiable point.",
      },
      selfCheckExample: {
        prompt:
          "True or false: every continuous function is differentiable.",
        steps: [
          "Continuity is necessary but not sufficient for differentiability.",
          "\\(|x|\\) is the standard counter-example: continuous everywhere, not differentiable at \\(0\\).",
        ],
        answer: "False.",
      },
      practiceSet: [
        { prompt: "Differentiable at \\(c\\) \\(\\Rightarrow\\) ?", answer: "Continuous at \\(c\\)" },
        { prompt: "Continuous at \\(c\\) \\(\\Rightarrow\\) differentiable at \\(c\\)?", answer: "No (converse is false)" },
        { prompt: "If \\(f\\) is discontinuous at \\(c\\), is it differentiable there?", answer: "No" },
        { prompt: "Canonical continuous-but-not-differentiable function?", answer: "\\(|x|\\) at \\(x=0\\)" },
      ],
      // Foundation concept — the differentiable⇒continuous statement PYQs live in
      // the Core Techniques subtopic, so no featured PYQ here (lint-exempt).
      traps: [
        {
          title: "The implication only runs one way",
          body:
            "'Differentiable \\(\\Rightarrow\\) continuous' is true; 'continuous \\(\\Rightarrow\\) differentiable' is FALSE. NDA statement-questions plant the reversed (false) version to catch you.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-lhd-rhd-test",
      name: "The left-hand = right-hand derivative test",
      intuition:
        "At a join point of a piecewise function, compute the derivative from the left and from the right **separately**. The function is differentiable there only if both exist and are **equal**. This is the workhorse for every piecewise differentiability question.",
      definition:
        "\\(f\\) is differentiable at \\(x=c\\) iff the one-sided derivatives match:\n" +
        "- **LHD** \\(= \\lim_{h\\to 0^-}\\dfrac{f(c+h)-f(c)}{h}\\)\n" +
        "- **RHD** \\(= \\lim_{h\\to 0^+}\\dfrac{f(c+h)-f(c)}{h}\\)\n" +
        "Differentiable at \\(c\\) \\(\\iff\\) LHD \\(=\\) RHD (and both finite). In practice: differentiate each piece, then equate the two pieces' derivatives **at the join** (after first checking continuity there).",
      formula: {
        label: "One-sided derivative test",
        latex:
          "f'(c^-) = f'(c^+) \\iff f \\text{ differentiable at } c",
      },
      visualizationSlug: "diff-piecewise-join",
      authoredExample: {
        prompt:
          "Is \\(f(x)=\\begin{cases} x^2, & x\\le 1\\\\ 2x-1, & x>1\\end{cases}\\) differentiable at \\(x=1\\)?",
        steps: [
          "Continuity at \\(1\\): left value \\(1^2=1\\), right value \\(2(1)-1=1\\) — continuous.",
          "LHD: derivative of \\(x^2\\) is \\(2x\\), at \\(x=1\\) gives \\(2\\).",
          "RHD: derivative of \\(2x-1\\) is \\(2\\), at \\(x=1\\) gives \\(2\\).",
          "LHD \\(=\\) RHD \\(=2\\).",
        ],
        answer: "Yes — differentiable at \\(x=1\\) (the pieces meet smoothly).",
      },
      selfCheckExample: {
        prompt:
          "For \\(f(x)=\\begin{cases} x^2, & x\\le 1\\\\ x+1, & x>1\\end{cases}\\), is \\(f\\) differentiable at \\(x=1\\)?",
        steps: [
          "Continuity: left \\(=1\\), right \\(=2\\) — already discontinuous, so not differentiable.",
        ],
        answer: "No (it is not even continuous at \\(x=1\\)).",
      },
      practiceSet: [
        { prompt: "Condition for differentiability at a join?", answer: "LHD \\(=\\) RHD (both finite)" },
        { prompt: "Check before computing one-sided derivatives?", answer: "Continuity at the point" },
        { prompt: "RHD of \\(2x-1\\) at \\(x=1\\)?", answer: "\\(2\\)" },
        { prompt: "If LHD \\(=3\\), RHD \\(=5\\), differentiable?", answer: "No (slopes differ)" },
      ],
      pyqExampleId: "435fe67c-3cf4-4b7c-8f44-265c57cbc3be", // 2017 — piecewise 1-x^2 / ln x at x=1
      traps: [
        {
          title: "Continuity first, then slopes",
          body:
            "If the pieces don't even meet (discontinuous at the join), stop — it cannot be differentiable. Only when continuous do you compare LHD and RHD.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-modulus-corners",
      name: "Modulus corners — and the x|x| trap",
      intuition:
        "A modulus makes a **corner** at its split point, where the slope jumps. \\(|x|\\) has slope \\(-1\\) on the left and \\(+1\\) on the right, so it is not differentiable at \\(0\\). But not every modulus expression has a corner: \\(x|x|\\) smooths the kink out and **is** differentiable at \\(0\\). Always split at the modulus's zero and test.",
      definition:
        "Split \\(|g(x)|\\) at the points where \\(g(x)=0\\):\n" +
        "- \\(|x|\\) is continuous but **not differentiable** at \\(0\\) (LHD \\(=-1\\), RHD \\(=+1\\)).\n" +
        "- \\(|x-a|\\) has its corner at \\(x=a\\).\n" +
        "- \\(x|x|\\) equals \\(-x^2\\) for \\(x<0\\) and \\(x^2\\) for \\(x\\ge 0\\); both have derivative \\(0\\) at the join, so it **is** differentiable at \\(0\\) (the trap).",
      visualizationSlug: "diff-modulus-corner",
      authoredExample: {
        prompt:
          "Is \\(f(x)=|x-3|\\) differentiable at \\(x=3\\)?",
        steps: [
          "For \\(x>3\\): \\(f(x)=x-3\\), slope \\(+1\\). For \\(x<3\\): \\(f(x)=3-x\\), slope \\(-1\\).",
          "LHD \\(=-1\\), RHD \\(=+1\\) — not equal.",
        ],
        answer: "No — there is a corner at \\(x=3\\) (continuous, not differentiable).",
      },
      selfCheckExample: {
        prompt:
          "Is \\(f(x)=x|x|\\) differentiable at \\(x=0\\)?",
        steps: [
          "Write it piecewise: \\(f(x)=x^2\\) for \\(x\\ge 0\\), \\(f(x)=-x^2\\) for \\(x<0\\).",
          "RHD \\(= \\) derivative of \\(x^2\\) at \\(0 = 0\\); LHD \\(=\\) derivative of \\(-x^2\\) at \\(0 = 0\\).",
          "LHD \\(=\\) RHD \\(=0\\).",
        ],
        answer: "Yes — \\(x|x|\\) is differentiable at \\(0\\) (slope \\(0\\)); the kink is smoothed away.",
      },
      practiceSet: [
        { prompt: "Is \\(|x|\\) differentiable at \\(0\\)?", answer: "No (corner: slopes \\(-1, +1\\))" },
        { prompt: "Where is \\(|x-5|\\) non-differentiable?", answer: "\\(x=5\\)" },
        { prompt: "Is \\(x|x|\\) differentiable at \\(0\\)?", answer: "Yes (slope \\(0\\))" },
        { prompt: "Is \\(|x|\\) continuous at \\(0\\)?", answer: "Yes" },
      ],
      pyqExampleId: "49206ef2-3be1-4ed2-b160-982080dc5d99", // 2025 — x|x| increasing & differentiable
      traps: [
        {
          title: "Not every |·| means non-differentiable",
          body:
            "\\(|x|\\) has a corner, but \\(x|x|\\), \\(x^2|x|\\), and \\(e^{|x|}\\cdot(\\text{smoothing})\\) can be differentiable at the split. Always rewrite piecewise and compare one-sided derivatives — don't assume the modulus kills differentiability.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "diff-greatest-integer",
      name: "Greatest-integer and step functions",
      intuition:
        "The greatest-integer function \\(\\lfloor x\\rfloor\\) is a staircase — flat between integers, with a jump at each integer. On any flat step it is constant, so its derivative is \\(0\\); at each integer it is **discontinuous**, hence not differentiable.",
      definition:
        "- Between consecutive integers, \\(\\lfloor x\\rfloor\\) is **constant** \\(\\Rightarrow\\) derivative \\(=0\\) there.\n" +
        "- At every integer it **jumps** (discontinuous) \\(\\Rightarrow\\) not differentiable at integers.\n" +
        "- A function built from \\(\\lfloor x\\rfloor\\) inherits these jumps unless they cancel; check each integer in the domain.",
      authoredExample: {
        prompt:
          "What is \\(\\dfrac{d}{dx}\\lfloor x\\rfloor\\) for \\(2<x<3\\)?",
        steps: [
          "On \\((2,3)\\), \\(\\lfloor x\\rfloor = 2\\), a constant.",
          "The derivative of a constant is \\(0\\).",
        ],
        answer: "\\(0\\) (and the derivative does not exist at the integers \\(2, 3\\)).",
      },
      selfCheckExample: {
        prompt:
          "Is \\(y=\\lfloor x+1\\rfloor\\) differentiable on the open interval \\((-4,-3)\\)?",
        steps: [
          "For \\(-4<x<-3\\), \\(x+1\\in(-3,-2)\\), so \\(\\lfloor x+1\\rfloor=-3\\), a constant.",
          "A constant is differentiable with derivative \\(0\\).",
        ],
        answer: "Yes on the open interval — derivative \\(0\\) (it fails only at the integer endpoints).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{d}{dx}\\lfloor x\\rfloor\\) on \\((1,2)\\)?", answer: "\\(0\\)" },
        { prompt: "Is \\(\\lfloor x\\rfloor\\) differentiable at \\(x=3\\)?", answer: "No (jump discontinuity)" },
        { prompt: "Is \\(\\lfloor x\\rfloor\\) continuous on \\((0,1)\\)?", answer: "Yes (constant)" },
        { prompt: "Derivative of any constant function?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "9943643d-bcde-41fd-ba82-b6e87e5b2ba6", // 2022 — y=[x+1], -4<x<-3
    },

    {
      kind: "formula" as const,
      slug: "diff-parameter-problems",
      name: "Finding parameters so f is differentiable",
      intuition:
        "When a piecewise function carries unknown constants and is declared differentiable at the join, you get **two equations**: continuity (the values match) and differentiability (the one-sided derivatives match). Solve them together for the unknowns.",
      definition:
        "For a piecewise \\(f\\) differentiable at \\(x=c\\):\n" +
        "1. **Continuity:** set the two pieces' values equal at \\(c\\).\n" +
        "2. **Differentiability:** set the two pieces' derivatives equal at \\(c\\).\n" +
        "Two equations in the unknown constants — solve simultaneously.",
      authoredExample: {
        prompt:
          "Find \\(a, b\\) so that \\(f(x)=\\begin{cases} x^2, & x\\le 1\\\\ ax+b, & x>1\\end{cases}\\) is differentiable at \\(x=1\\).",
        steps: [
          "Continuity at \\(1\\): \\(1 = a+b\\).",
          "Differentiability at \\(1\\): LHD \\(=2x\\big|_{1}=2\\), RHD \\(=a\\), so \\(a=2\\).",
          "Then \\(b = 1-a = -1\\).",
        ],
        answer: "\\(a=2,\\ b=-1\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(f(x)=\\begin{cases} ax+1, & x\\le 0\\\\ \\sin x + b, & x>0\\end{cases}\\) is differentiable at \\(0\\), find \\(a, b\\).",
        steps: [
          "Continuity: \\(a(0)+1 = \\sin 0 + b \\Rightarrow 1 = b\\).",
          "Differentiability: LHD \\(=a\\), RHD \\(=\\cos 0 = 1\\), so \\(a=1\\).",
        ],
        answer: "\\(a=1,\\ b=1\\).",
      },
      practiceSet: [
        { prompt: "How many equations from 'differentiable at a join'?", answer: "Two (continuity + equal slopes)" },
        { prompt: "Continuity equation gives?", answer: "The two piece-values equal at the join" },
        { prompt: "Differentiability equation gives?", answer: "The two piece-derivatives equal at the join" },
        { prompt: "For \\(x^2\\) vs \\(ax+b\\) at \\(x=1\\): the slope equation?", answer: "\\(a=2\\)" },
      ],
      pyqExampleId: "d41fa32c-cde9-4247-8f76-06da4cf721b0", // 2023 — differentiable at x=1, find params
    },

    {
      kind: "formula" as const,
      slug: "diff-via-limit-definition",
      name: "Derivative at an awkward point via the limit definition",
      intuition:
        "When a point is special — a modulus, a \\(\\ln|x|\\), or a value patched in by hand (\\(f(0)=0\\)) — the rule-based derivative may not apply directly. Fall back to the **definition**: \\(f'(c)=\\lim_{h\\to 0}\\frac{f(c+h)-f(c)}{h}\\) and evaluate the limit.",
      definition:
        "At a point where the usual rules are unsafe, compute \\(f'(c)=\\lim_{h\\to 0}\\dfrac{f(c+h)-f(c)}{h}\\) directly. If the limit exists (and is the same from both sides), that value is the derivative; if it doesn't, \\(f\\) is not differentiable at \\(c\\).",
      formula: {
        label: "Derivative from first principles",
        latex: "f'(c) = \\lim_{h \\to 0} \\dfrac{f(c+h) - f(c)}{h}",
      },
      authoredExample: {
        prompt:
          "For \\(f(x)=x^2\\ln|x|\\) with \\(f(0)=0\\), find \\(f'(0)\\).",
        steps: [
          "Use the definition: \\(f'(0)=\\lim_{h\\to 0}\\dfrac{h^2\\ln|h| - 0}{h}=\\lim_{h\\to 0} h\\ln|h|\\).",
          "As \\(h\\to 0\\), \\(h\\ln|h|\\to 0\\) (the linear factor beats the log).",
        ],
        answer: "\\(f'(0)=0\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(f(x)=x|x|\\), find \\(f'(0)\\) from the definition.",
        steps: [
          "\\(f'(0)=\\lim_{h\\to 0}\\dfrac{h|h|-0}{h}=\\lim_{h\\to 0}|h|\\).",
          "\\(\\lim_{h\\to 0}|h| = 0\\).",
        ],
        answer: "\\(f'(0)=0\\).",
      },
      practiceSet: [
        { prompt: "Definition of \\(f'(c)\\)?", answer: "\\(\\lim_{h\\to 0}\\frac{f(c+h)-f(c)}{h}\\)" },
        { prompt: "\\(\\lim_{h\\to 0} h\\ln|h|\\)?", answer: "\\(0\\)" },
        { prompt: "When to fall back to the definition?", answer: "At moduli, \\(\\ln|x|\\), or hand-patched points" },
        { prompt: "If the two-sided limit fails, then?", answer: "Not differentiable there" },
      ],
      pyqExampleId: "156bca06-013d-4aa8-a4f6-fc393be77c80", // 2018 — x^2 ln|x|, f'(0)
    },
  ],
  related: [
    { label: "Core Techniques", href: "/notes/nda-maths/differentiation/diff-core-techniques" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
