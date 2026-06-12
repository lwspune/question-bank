import type { SubtopicNote } from "@/app/notes/_types";

export const BY_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Parts",
  title: "Integration by Parts",
  oneLineDefinition:
    "Integration by parts is the product rule run backwards: it trades an integral of a product for a simpler one, choosing which factor to differentiate by the LIATE order.",
  whyItMatters:
    "Only 3 PYQs sit here, all MODERATE — but they are reliable marks once the formula and the LIATE choice are automatic. " +
    "The NDA favours two shapes: integrating a lone logarithm (treat it as ln x times 1), and a difference of integrals that telescopes once you apply parts. " +
    "This is also where the eˣ·trig cyclic results from Standard Forms actually come from.",
  concepts: [
    // 1 — formula + LIATE (foundation)
    {
      kind: "formula" as const,
      slug: "byparts-formula-liate",
      name: "The By-Parts Formula and LIATE",
      intuition:
        "When an integrand is a product of two unlike functions, by parts lets you differentiate one and integrate the other. The art is choosing which is which — LIATE names the priority order for what to differentiate.",
      definition:
        "The formula:\n" +
        "\\[\\int u\\,dv = uv - \\int v\\,du.\\]\n" +
        "Choose \\(u\\) (the part to differentiate) by **LIATE** — the earlier in this list, the better a choice for \\(u\\):\n" +
        "- **L** — Logarithmic (\\(\\ln x\\))\n" +
        "- **I** — Inverse trig (\\(\\tan^{-1}x\\))\n" +
        "- **A** — Algebraic (\\(x^2, x\\))\n" +
        "- **T** — Trigonometric (\\(\\sin x\\))\n" +
        "- **E** — Exponential (\\(e^x\\))\n" +
        "Whatever is left becomes \\(dv\\), which you integrate to get \\(v\\). A good choice makes \\(\\int v\\,du\\) simpler than the original.",
      formula: {
        label: "Integration by parts",
        latex: "\\int u\\,dv = uv - \\int v\\,du",
        symbols: [
          { symbol: "u", meaning: "factor you differentiate (pick by LIATE)" },
          { symbol: "dv", meaning: "remaining factor, which you integrate to \\(v\\)" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int x\\,e^x\\,dx\\).",
        steps: [
          "LIATE: Algebraic beats Exponential, so \\(u=x\\) (differentiate) and \\(dv=e^x\\,dx\\) (integrate to \\(v=e^x\\)).",
          "Apply the formula: \\(uv - \\int v\\,du = x e^x - \\int e^x\\cdot 1\\,dx\\).",
          "Finish: \\(x e^x - e^x\\).",
        ],
        answer: "\\(e^x(x-1) + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int x\\,\\cos x\\,dx\\).",
          answer: "\\(x\\sin x + \\cos x + C\\)",
          method: "LIATE: \\(u=x\\), \\(dv=\\cos x\\,dx\\) so \\(v=\\sin x\\). Then \\(x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x\\).",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int x\\,e^{2x}\\,dx\\).",
          answer: "\\(\\dfrac{e^{2x}}{2}\\Big(x-\\dfrac12\\Big) + C\\)",
          method: "\\(u=x\\), \\(dv=e^{2x}dx\\) so \\(v=\\tfrac12 e^{2x}\\): \\(\\tfrac{x}{2}e^{2x}-\\tfrac12\\int e^{2x}dx=\\tfrac{x}{2}e^{2x}-\\tfrac14 e^{2x}\\).",
        },
      ],
      traps: [
        {
          title: "Choosing u backwards makes it worse",
          body:
            "If \\(\\int v\\,du\\) is harder than where you started, you picked \\(u\\) and \\(dv\\) the wrong way round. LIATE almost always points to the right \\(u\\) — trust it.",
        },
      ],
    },

    // 2 — integrating logarithms (PYQ 07c2a908)
    {
      kind: "formula" as const,
      slug: "byparts-logarithms",
      name: "Integrating a Lone Logarithm",
      pyqExampleId: "07c2a908-c509-47d7-891a-91ecccf3c9df",
      intuition:
        "A logarithm has no elementary integral on its own, so you manufacture a product: write ln x as ln x times 1, then integrate by parts with the 1 as dv. Log laws first turn ln of a power into a constant times ln x.",
      definition:
        "The standard result, via parts with \\(u=\\ln x,\\ dv=dx\\):\n" +
        "\\[\\int \\ln x\\,dx = x\\ln x - x + C.\\]\n" +
        "Use \\(\\ln(x^k) = k\\ln x\\) to pull constants out first, so \\(\\int \\ln(x^k)\\,dx = k\\int \\ln x\\,dx = k(x\\ln x - x) + C\\).",
      formula: {
        label: "Integral of the logarithm",
        latex: "\\int \\ln x\\,dx = x\\ln x - x + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\ln(x^3)\\,dx\\).",
        steps: [
          "Pull the power out: \\(\\ln(x^3) = 3\\ln x\\), so the integral is \\(3\\int \\ln x\\,dx\\).",
          "Use the standard result \\(\\int \\ln x\\,dx = x\\ln x - x\\).",
          "Multiply by 3.",
        ],
        answer: "\\(3(x\\ln x - x) + C = 3x\\ln x - 3x + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\ln x\\,dx\\).",
          answer: "\\(x\\ln x - x + C\\)",
          method: "By parts with \\(u=\\ln x\\), \\(dv=dx\\): \\(x\\ln x-\\int x\\cdot\\tfrac1x\\,dx=x\\ln x-x\\).",
        },
      ],
      traps: [
        {
          title: "ln x has no naive antiderivative",
          body:
            "\\(\\int \\ln x\\,dx\\) is NOT \\(\\dfrac{1}{x}\\) (that is the derivative) and NOT \\(\\dfrac{(\\ln x)^2}{2}\\). It is \\(x\\ln x - x\\) — derive it by parts if you ever forget it.",
        },
      ],
    },

    // 3 — products & the (ln x)^-n cancellation (PYQ c26d866b)
    {
      kind: "formula" as const,
      slug: "byparts-products-cancellation",
      name: "Products and Telescoping Cancellations",
      pyqExampleId: "c26d866b-7e2d-48ee-a4c8-7a6cd46b1281",
      intuition:
        "By parts shines on algebraic-times-trig or algebraic-times-exponential products. It also creates clean cancellations: a difference of two awkward integrals can collapse because applying parts to one produces the other.",
      definition:
        "Two NDA shapes:\n" +
        "- **Algebraic × trig/exp:** e.g. \\(\\int x\\cos x\\,dx\\) with \\(u=x\\) gives \\(x\\sin x + \\cos x + C\\). Simplify any disguised factor first — \\(e^{\\ln x} = x\\) turns \\(\\int (e^{\\ln x}+\\sin x)\\cos x\\,dx\\) into \\(\\int x\\cos x\\,dx + \\int \\sin x\\cos x\\,dx\\).\n" +
        "- **Telescoping difference:** integrals like \\(\\int (\\ln x)^{-1}\\,dx - \\int (\\ln x)^{-2}\\,dx\\) collapse because applying parts to one of them throws off exactly the other, leaving a single closed term \\(\\dfrac{x}{\\ln x}\\).",
      formula: {
        label: "The product-rule trade",
        latex: "\\int u\\,dv = uv - \\int v\\,du",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int x\\,\\sin x\\,dx\\).",
        steps: [
          "LIATE: \\(u=x\\) (differentiate), \\(dv=\\sin x\\,dx\\) so \\(v=-\\cos x\\).",
          "Apply: \\(uv-\\int v\\,du = -x\\cos x - \\int(-\\cos x)\\,dx = -x\\cos x + \\int \\cos x\\,dx\\).",
          "Finish: \\(-x\\cos x + \\sin x\\).",
        ],
        answer: "\\(\\sin x - x\\cos x + C\\)",
      },
      traps: [
        {
          title: "Simplify disguised factors before applying parts",
          body:
            "\\(e^{\\ln x}\\) is just \\(x\\); \\(e^{\\ln(\\tan x)}\\) is just \\(\\tan x\\). Collapse these FIRST — applying by-parts to the disguised form wastes a step and invites errors.",
        },
      ],
    },
  ],
};
