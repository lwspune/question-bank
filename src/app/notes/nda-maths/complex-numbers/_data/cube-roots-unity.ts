import type { SubtopicNote } from "@/app/notes/_types";

export const CUBE_ROOTS_UNITY_NOTE: SubtopicNote = {
  subtopicName: "Cube Roots of Unity",
  title: "Cube Roots of Unity",
  oneLineDefinition:
    "The three cube roots of 1 — namely 1, ω, ω² — and the two identities (ω³ = 1 and 1 + ω + ω² = 0) that answer a large, predictable family of NDA questions.",
  whyItMatters:
    "Cube roots of unity are the single most reliable pattern in this chapter — and one of the most HARD-concentrated. Almost every question reduces to 'powers of ω cycle every 3' plus '1 + ω + ω² = 0'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cn-cube-roots-properties",
      name: "1, ω, ω² and their identities",
      intuition:
        "The equation \\(x^3=1\\) has three roots: \\(1\\) and the two non-real ones, \\(\\omega\\) and \\(\\omega^2\\), which are complex conjugates sitting on the unit circle 120° apart. Two facts do all the work: their powers cycle every 3, and the three sum to zero.",
      definition:
        "\\(\\omega=\\dfrac{-1+i\\sqrt3}{2},\\;\\omega^2=\\dfrac{-1-i\\sqrt3}{2}=\\bar\\omega\\). The two identities:\n" +
        "- **\\(\\omega^3=1\\)** — so \\(\\omega^n=\\omega^{\\,n\\bmod 3}\\) (powers cycle every 3).\n" +
        "- **\\(1+\\omega+\\omega^2=0\\)** — so \\(\\omega+\\omega^2=-1\\) and \\(\\omega^2=-1-\\omega\\).\n" +
        "Also \\(\\omega\\cdot\\omega^2=1\\) (they are reciprocals/conjugates), and \\(|\\omega|=1\\).",
      formula: {
        label: "Cube roots of unity identities",
        latex:
          "\\omega^3=1 \\qquad 1+\\omega+\\omega^2=0 \\qquad \\bar\\omega=\\omega^2 \\qquad \\omega^n=\\omega^{\\,n\\bmod 3}",
      },
      visualizationSlug: "cn-cube-roots-circle",
      authoredExample: {
        prompt: "Simplify \\(1+\\omega^4+\\omega^8\\), where \\(\\omega\\) is a non-real cube root of unity.",
        steps: [
          "Reduce exponents mod 3: \\(\\omega^4=\\omega\\), \\(\\omega^8=\\omega^2\\).",
          "\\(1+\\omega+\\omega^2=0\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "If \\(1,\\omega,\\omega^2\\) are the cube roots of unity, what is \\((1+\\omega)(1+\\omega^2)\\)?",
        steps: [
          "\\(1+\\omega=-\\omega^2\\) and \\(1+\\omega^2=-\\omega\\) (from \\(1+\\omega+\\omega^2=0\\)).",
          "Product \\(=(-\\omega^2)(-\\omega)=\\omega^3=1\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\omega^3=\\)?", answer: "\\(1\\)" },
        { prompt: "\\(1+\\omega+\\omega^2=\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\omega^2\\) equals which other quantity?", answer: "\\(\\bar\\omega\\) (the conjugate)" },
        { prompt: "\\(1+\\omega^4+\\omega^8=\\)?", answer: "\\(0\\) (\\(\\omega^4=\\omega,\\ \\omega^8=\\omega^2\\))" },
      ],
      pyqExampleId: "674e10ff-8a12-430a-8595-8fcf9f5d17d3", // 1,ω,ω² cube roots
      traps: [
        {
          title: "\\(\\omega^2=\\bar\\omega\\), but \\(\\omega^2\\ne-\\omega\\)",
          body:
            "\\(\\omega^2\\) is the **conjugate** \\(\\bar\\omega\\) (both unit-circle cube roots, 120° apart). From \\(1+\\omega+\\omega^2=0\\) you get \\(\\omega^2=-1-\\omega\\) — **not** \\(-\\omega\\). Treating \\(\\omega^2\\) as \\(-\\omega\\) (or forgetting to reduce \\(\\omega^n\\) by \\(n\\bmod 3\\) first) wrecks the algebra. Also note \\(\\omega\\cdot\\omega^2=\\omega^3=1\\).",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "cn-cube-roots-applications",
      name: "Applying ω: powers, expressions, related roots",
      intuition:
        "Most ω questions are recognition: spot that a given number IS ω (e.g. \\((-1+\\sqrt{-3})/2\\)), reduce every exponent mod 3, and collapse using \\(1+\\omega+\\omega^2=0\\). The roots of \\(x^2+x+1=0\\) are \\(\\omega,\\omega^2\\); the roots of \\(x^2-x+1=0\\) are \\(-\\omega,-\\omega^2\\); and \\(x^3=k\\) has roots \\(k^{1/3}\\{1,\\omega,\\omega^2\\}\\).",
      definition:
        "- **Reduce then collapse:** \\(\\omega^n=\\omega^{\\,n\\bmod3}\\), then apply \\(1+\\omega+\\omega^2=0\\).\n" +
        "- **Quadratic roots:** \\(x^2+x+1=0\\Rightarrow x=\\omega,\\omega^2\\); \\(x^2-x+1=0\\Rightarrow x=-\\omega,-\\omega^2\\) (primitive 6th roots).\n" +
        "- **Cube roots of \\(k\\):** the roots of \\(z^3=k\\) are \\(k^{1/3},\\,k^{1/3}\\omega,\\,k^{1/3}\\omega^2\\) — they sum to 0 and form an equilateral triangle.\n" +
        "- Sums like \\(\\alpha^n+\\beta^n\\) for \\(\\alpha,\\beta\\) cube/6th-roots are a small-case match on \\(n\\bmod 3\\) (or 6).",
      authoredExample: {
        prompt: "If \\(x^2+x+1=0\\), find \\(x^{2026}+x^{2027}\\).",
        steps: [
          "Roots are \\(\\omega,\\omega^2\\), so take \\(x=\\omega\\). Reduce: \\(2026\\bmod3=1\\), \\(2027\\bmod3=2\\).",
          "\\(\\omega^{2026}+\\omega^{2027}=\\omega+\\omega^2=-1\\).",
        ],
        answer: "\\(-1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(x^2-x+1=0\\), what is \\(x^6\\)?",
        steps: [
          "Roots are \\(-\\omega,-\\omega^2\\), primitive 6th roots of unity, so \\(x^6=1\\).",
          "(Check: \\((-\\omega)^6=\\omega^6=(\\omega^3)^2=1\\).)",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(x^2+x+1=0\\)?", answer: "\\(\\omega,\\omega^2\\)" },
        { prompt: "Roots of \\(x^2-x+1=0\\)?", answer: "\\(-\\omega,-\\omega^2\\)" },
        { prompt: "First step on any \\(\\omega^n\\)?", answer: "Reduce \\(n \\bmod 3\\)" },
        { prompt: "The three cube roots of \\(k\\) sum to?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "cc84732b-9e62-407c-9509-02e498df740b", // x^2-x+1=0
    },
  ],
  related: [
    { label: "Powers & Roots", href: "/notes/nda-maths/complex-numbers/cn-powers-roots" },
    { label: "Modulus, Argument & Conjugate", href: "/notes/nda-maths/complex-numbers/cn-modulus-argument" },
  ],
};
