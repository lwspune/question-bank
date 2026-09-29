import type { SubtopicNote } from "@/app/notes/_types";

export const DOMAIN_FN_NOTE: SubtopicNote = {
  subtopicName: "Domain of a Function",
  title: "Domain of a Function",
  oneLineDefinition:
    "Finding where a function is defined: the conditions set by roots, logarithms, denominators and inverse trigonometric functions, nested logarithms and greatest-integer parts, and composite functions.",
  whyItMatters:
    "Thirty-four PYQs, the second-largest page in the chapter. Most give the domain as a union of intervals and asks for a sum of its endpoints, so a single wrong bracket or a missed exclusion costs the whole question. Three ideas cover the page.",
  concepts: [
    // C1 — the rules
    {
      kind: "formula" as const,
      slug: "jfn-domain-rules",
      name: "The conditions that fix a domain",
      intuition:
        "Write down the condition each part of the formula imposes, solve each one, and intersect the answers. An even root needs its inside \\(\\ge0\\), or \\(>0\\) if it sits in a denominator. A logarithm needs its argument \\(>0\\) and its base positive and not 1. A denominator must not be 0. \\(\\sin^{-1}u\\) and \\(\\cos^{-1}u\\) need \\(-1\\le u\\le1\\); for \\(\\left|\\frac pq\\right|\\le1\\) with \\(q\\) of either sign, square to \\(p^2\\le q^2\\) and keep \\(q\\ne0\\).",
      definition:
        "- \\(\\sqrt u\\): \\(u\\ge0\\). \\(\\frac1u\\): \\(u\\ne0\\).\n" +
        "- \\(\\log_b u\\): \\(u>0\\), \\(b>0\\), \\(b\\ne1\\).\n" +
        "- \\(\\sin^{-1}u,\\ \\cos^{-1}u\\): \\(-1\\le u\\le1\\).\n" +
        "- The domain of a sum or product is the **intersection** of the parts' domains.",
      formula: {
        label: "Inverse-sine domain",
        latex: "\\sin^{-1}u,\\ \\cos^{-1}u:\\ -1\\le u\\le1",
      },
      authoredExample: {
        prompt: "Find the domain of \\(f(x)=\\sqrt{x-1}+\\log(5-x)\\).",
        steps: [
          "\\(x-1\\ge0\\) and \\(5-x>0\\).",
        ],
        answer: "\\([1,5)\\).",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(\\sin^{-1}\\frac{x-2}{3}\\).",
        steps: [
          "\\(-3\\le x-2\\le3\\).",
        ],
        answer: "\\([-1,5]\\).",
      },
      practiceSet: [
        { prompt: "Domain of \\(\\frac{1}{\\sqrt{4-x^2}}\\)?", answer: "\\((-2,2)\\)" },
        { prompt: "Domain of \\(\\log_x5\\)?", answer: "\\(x>0\\), \\(x\\ne1\\)" },
        { prompt: "Domain of \\(\\cos^{-1}(2x)\\)?", answer: "\\(\\left[-\\frac12,\\frac12\\right]\\)" },
        { prompt: "Domain of \\(\\sqrt x+\\sqrt{1-x}\\)?", answer: "\\([0,1]\\)" },
      ],
      pyqExampleId: "e082aa98-b4f2-4301-946a-bc0da198b063", // 2024 — domain of sin^-1((x - 1)/(2x + 3)) is R - (a, b)
      traps: [
        {
          title: "A logarithm in a denominator",
          body: "\\(\\frac1{\\log u}\\) needs \\(\\log u\\ne0\\) as well as \\(u>0\\): the argument \\(u=1\\) is excluded. This is the usual missing point in a domain written as 'an interval minus a point'.",
        },
      ],
    },

    // C2 — nested logs and greatest-integer parts
    {
      kind: "formula" as const,
      slug: "jfn-domain-nested",
      name: "Nested logarithms and greatest-integer parts",
      intuition:
        "Work from the outside in. \\(\\log_a(\\log_bu)\\) needs \\(\\log_bu>0\\), which for \\(b>1\\) means \\(u>1\\); a third logarithm pushes the threshold up again, to \\(u>b\\). A base below 1 reverses each inequality. When the formula has \\([x]\\), put \\(n=[x]\\), solve for the integer \\(n\\) first, and then turn each allowed \\(n\\) into the interval \\([n,n+1)\\).",
      definition:
        "- \\(\\log_a\\log_b u\\) (bases \\(>1\\)): \\(u>1\\).\n" +
        "- \\(\\log_a\\log_b\\log_c u\\) (bases \\(>1\\)): \\(u>c\\).\n" +
        "- \\(\\log_{b}u\\ge0\\) with \\(0<b<1\\): \\(0<u\\le1\\).\n" +
        "- \\([x]=n\\iff n\\le x<n+1\\).",
      formula: {
        label: "Two nested logarithms",
        latex: "\\log_a(\\log_b u)\\ \\text{defined}\\iff u>1\\quad(a,b>1)",
      },
      authoredExample: {
        prompt: "Find the domain of \\(\\log_2\\log_3(x-1)\\).",
        steps: [
          "Need \\(\\log_3(x-1)>0\\), so \\(x-1>1\\).",
        ],
        answer: "\\(x>2\\).",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(\\frac{1}{\\sqrt{[x]-2}}\\).",
        steps: [
          "\\([x]>2\\), so \\([x]\\ge3\\).",
        ],
        answer: "\\([3,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "Domain of \\(\\log_2\\log_2x\\)?", answer: "\\(x>1\\)" },
        { prompt: "Domain of \\(\\log_3\\log_2\\log_2x\\)?", answer: "\\(x>2\\)" },
        { prompt: "\\([x]\\in\\{-1,0\\}\\) as an interval?", answer: "\\([-1,1)\\)" },
        { prompt: "\\(\\log_{0.5}u\\ge0\\)?", answer: "\\(0<u\\le1\\)" },
      ],
      pyqExampleId: "3a6fea6c-0951-4303-9201-9ffb3d440a7c", // 2023 — domain of 1/sqrt([x]^2 - 3[x] - 10)
      traps: [
        {
          title: "Turn integers back into intervals",
          body: "\\([x]\\le-3\\) means \\(x<-2\\), not \\(x\\le-3\\): every \\(x\\) with integer part \\(-3\\) lies in \\([-3,-2)\\).",
        },
      ],
    },

    // C3 — composite functions
    {
      kind: "formula" as const,
      slug: "jfn-domain-composite",
      name: "Domain of a composite function",
      intuition:
        "\\(f(g(x))\\) needs two things: \\(x\\) must be in the domain of \\(g\\), and \\(g(x)\\) must be in the domain of \\(f\\). Solve the second condition as an inequality in \\(x\\) and intersect it with the first. Simplifying \\(f(g(x))\\) first can hide a point where \\(g\\) itself is undefined.",
      definition:
        "- \\(\\operatorname{dom}(f\\circ g)=\\{x\\in\\operatorname{dom}g:\\ g(x)\\in\\operatorname{dom}f\\}\\).\n" +
        "- Keep every exclusion of \\(g\\), even if it cancels later.",
      formula: {
        label: "Domain of f∘g",
        latex: "\\{x\\in\\operatorname{dom}g:\\ g(x)\\in\\operatorname{dom}f\\}",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\sqrt x\\), \\(g(x)=1-x^2\\). Find the domain of \\(f\\circ g\\).",
        steps: [
          "\\(1-x^2\\ge0\\).",
        ],
        answer: "\\([-1,1]\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\log x\\), \\(g(x)=x^2-4\\). Find the domain of \\(f\\circ g\\).",
        steps: [
          "\\(x^2-4>0\\).",
        ],
        answer: "\\((-\\infty,-2)\\cup(2,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=\\frac1x\\), \\(g(x)=x-3\\): domain of \\(f\\circ g\\)?", answer: "\\(x\\ne3\\)" },
        { prompt: "\\(f=\\sin^{-1}\\), \\(g(x)=\\frac x2\\): domain of \\(f\\circ g\\)?", answer: "\\([-2,2]\\)" },
        { prompt: "\\(f(x)=\\sqrt x\\), \\(g(x)=x^2+1\\): domain of \\(f\\circ g\\)?", answer: "\\(\\mathbb R\\)" },
        { prompt: "\\(f(x)=\\frac1{x-1}\\), \\(g(x)=x^2\\): domain of \\(f\\circ g\\)?", answer: "\\(x\\ne\\pm1\\)" },
      ],
      pyqExampleId: "adcffec3-1b69-41f8-bffa-7078ef5069c9", // 2024 — domain of fog, f = (2x+3)/(2x+1), g = (|x|+1)/(2x+5)
      traps: [
        {
          title: "The inner function's gaps stay",
          body: "If \\(g\\) is undefined at a point, so is \\(f\\circ g\\), whatever the simplified formula says.",
        },
      ],
    },
  ],
};
