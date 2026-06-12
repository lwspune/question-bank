import type { SubtopicNote } from "@/app/notes/_types";

export const POWERS_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Powers and Roots",
  title: "Powers of i, De Moivre & Roots",
  oneLineDefinition:
    "The four-step cycle of powers of i, De Moivre's theorem for raising complex numbers to powers, and finding square/nth roots of a complex number.",
  whyItMatters:
    "Powers-of-i questions are fast marks once you use the period-4 cycle, and De Moivre turns an ugly (1+i)ⁿ computation into one angle multiplication.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cn-powers-of-i",
      name: "Powers of i (the period-4 cycle)",
      intuition:
        "Powers of \\(i\\) repeat every four: \\(i,-1,-i,1,\\) then back to \\(i\\). So any \\(i^n\\) is decided by \\(n \\bmod 4\\), and any block of four consecutive powers sums to zero — which collapses long sums instantly.",
      definition:
        "\\(i^1=i,\\;i^2=-1,\\;i^3=-i,\\;i^4=1\\); thereafter \\(i^n=i^{\\,n\\bmod 4}\\). **Block sum:** \\(i^k+i^{k+1}+i^{k+2}+i^{k+3}=0\\) for any \\(k\\). So \\(\\sum\\) of \\(i^n\\) over a full set of consecutive 4 is 0 — only the leftover terms survive.",
      formula: {
        label: "Powers of i",
        latex:
          "i^2=-1 \\qquad i^3=-i \\qquad i^4=1 \\qquad i^{4k+r}=i^r \\qquad i^k+i^{k+1}+i^{k+2}+i^{k+3}=0",
      },
      authoredExample: {
        prompt: "Evaluate \\(i^{1000}+i^{1001}+i^{1002}+i^{1003}\\).",
        steps: [
          "Four consecutive powers of \\(i\\) sum to 0.",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "What is \\(i^{2026}\\)?",
        steps: [
          "\\(2026\\bmod 4=2\\).",
          "\\(i^2=-1\\).",
        ],
        answer: "\\(-1\\).",
      },
      practiceSet: [
        { prompt: "\\(i^3=\\)?", answer: "\\(-i\\)" },
        { prompt: "\\(i^n\\) depends on?", answer: "\\(n \\bmod 4\\)" },
        { prompt: "\\(i^k+i^{k+1}+i^{k+2}+i^{k+3}=\\)?", answer: "\\(0\\)" },
        { prompt: "\\(i^{102}\\)?", answer: "\\(-1\\) (\\(102\\bmod4=2\\))" },
      ],
      pyqExampleId: "f6e225e5-c2f3-49c7-8b78-258c9d30d3fc", // i^{2n}+i^{2n+1}+...
      traps: [
        {
          title: "Reduce the **exponent** of \\(i\\) mod 4 — and watch the remainder",
          body:
            "\\(i^n=i^{\\,n\\bmod 4}\\): take the exponent mod 4, not the whole number mod something else. Remainder \\(0\\to1\\), \\(1\\to i\\), \\(2\\to-1\\), \\(3\\to-i\\). So \\(i^{102}\\): \\(102\\bmod4=2\\Rightarrow i^{102}=-1\\) (a frequent error is reading remainder 2 as \\(i\\) instead of \\(-1\\)).",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "cn-de-moivre-and-roots",
      name: "De Moivre's theorem and roots",
      intuition:
        "To raise a complex number to a power, put it in polar form and multiply the angle: \\((\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta\\). Running it backwards gives the \\(n\\) nth-roots, equally spaced around a circle. Square roots of \\(a+ib\\) can also be found by solving \\((x+iy)^2=a+ib\\).",
      definition:
        "**De Moivre:** \\((\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta\\) (also for the modulus: \\(z^n=r^n e^{in\\theta}\\)). **nth roots** of \\(re^{i\\theta}\\): \\(r^{1/n}e^{i(\\theta+2k\\pi)/n}\\), \\(k=0,\\ldots,n-1\\) — \\(n\\) points on a circle of radius \\(r^{1/n}\\). **Square root** of \\(a+ib\\): set \\((x+iy)^2=a+ib\\), match parts (\\(x^2-y^2=a\\), \\(2xy=b\\)).",
      formula: {
        label: "De Moivre's theorem and nth roots",
        latex:
          "(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta \\qquad z^n=r^n e^{in\\theta} \\qquad z^{1/n}=r^{1/n}e^{i(\\theta+2k\\pi)/n},\\ k=0,\\ldots,n-1",
      },
      authoredExample: {
        prompt: "Use De Moivre to find \\((1+i)^4\\).",
        steps: [
          "\\(1+i=\\sqrt2\\,e^{i\\pi/4}\\), so \\((1+i)^4=(\\sqrt2)^4 e^{i\\pi}=4(\\cos\\pi+i\\sin\\pi)\\).",
          "\\(=4(-1)=-4\\).",
        ],
        answer: "\\(-4\\).",
      },
      selfCheckExample: {
        prompt: "Find a square root of \\(-i\\).",
        steps: [
          "\\((x+iy)^2=-i\\Rightarrow x^2-y^2=0,\\;2xy=-1\\). So \\(x=\\pm\\tfrac1{\\sqrt2},\\,y=\\mp\\tfrac1{\\sqrt2}\\).",
        ],
        answer: "\\(\\tfrac{1}{\\sqrt2}(1-i)\\) (or its negative).",
      },
      practiceSet: [
        { prompt: "De Moivre: \\((\\cos\\theta+i\\sin\\theta)^n=\\)?", answer: "\\(\\cos n\\theta+i\\sin n\\theta\\)" },
        { prompt: "How many distinct nth roots does a complex number have?", answer: "\\(n\\)" },
        { prompt: "nth roots are spaced how, geometrically?", answer: "Equally on a circle" },
        { prompt: "\\((1+i)^4=\\)?", answer: "\\(-4\\)" },
      ],
      pyqExampleId: "936a9def-cfe0-4687-b907-d70a6bdabdb6", // square root of -i
    },
  ],
  related: [
    { label: "Modulus, Argument & Conjugate", href: "/notes/nda-maths/complex-numbers/cn-modulus-argument" },
    { label: "Cube Roots of Unity", href: "/notes/nda-maths/complex-numbers/cn-cube-roots-unity" },
  ],
};
