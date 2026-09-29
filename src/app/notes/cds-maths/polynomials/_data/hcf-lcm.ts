import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_HCF_LCM_NOTE: SubtopicNote = {
  subtopicName: "HCF and LCM of Polynomials",
  title: "HCF and LCM of Polynomials",
  oneLineDefinition:
    "Factorise every polynomial; the HCF is the product of the common factors to their lowest power, the LCM of all factors to their highest power, and HCF × LCM equals the product of two polynomials.",
  whyItMatters:
    "Twenty-five PYQs, the largest page in the chapter and one of the most reliable in the paper. Everything is factorising: once each polynomial is in factors, the HCF and LCM are read off, and the product rule finds a missing polynomial.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspo-hcf-lcm-factorise",
      name: "Reading off the HCF and LCM",
      intuition:
        "The HCF of numbers uses the common primes to their smallest powers; the LCM uses every prime to its largest power. Polynomials work the same way with irreducible factors in place of primes.",
      definition:
        "- Factorise each polynomial completely.\n" +
        "- HCF = product of factors common to ALL, each to the LOWEST power present.\n" +
        "- LCM = product of EVERY factor appearing, each to the HIGHEST power present.\n" +
        "- Useful factorisations: \\(x^6 - y^6 = (x - y)(x + y)(x^2 + xy + y^2)(x^2 - xy + y^2)\\), \\(x^8 + x^4 + 1 = (x^4 + x^2 + 1)(x^4 - x^2 + 1)\\).",
      formula: {
        label: "HCF and LCM",
        latex: "\\text{HCF}: \\text{common factors, lowest power}; \\quad \\text{LCM}: \\text{all factors, highest power}",
      },
      authoredExample: {
        prompt: "Find the HCF and LCM of \\(x^2 - 1\\), \\(x^2 + 2x + 1\\) and \\(x^3 + 1\\).",
        steps: [
          "\\((x - 1)(x + 1)\\), \\((x + 1)^2\\), \\((x + 1)(x^2 - x + 1)\\).",
          "Common to all: \\(x + 1\\). All factors, highest powers: \\((x - 1)(x + 1)^2(x^2 - x + 1)\\).",
        ],
        answer: "HCF \\(x + 1\\); LCM \\((x - 1)(x + 1)^2(x^2 - x + 1)\\).",
      },
      selfCheckExample: {
        prompt: "Find the HCF of \\(x^3 - 8\\) and \\(x^2 - 5x + 6\\).",
        steps: ["\\((x - 2)(x^2 + 2x + 4)\\) and \\((x - 2)(x - 3)\\)."],
        answer: "\\(x - 2\\).",
      },
      practiceSet: [
        { prompt: "HCF of \\(x^2 - 9\\) and \\(x^2 + 6x + 9\\)?", answer: "\\(x + 3\\)" },
        { prompt: "LCM of \\(x^2 - 9\\) and \\(x^2 + 6x + 9\\)?", answer: "\\((x - 3)(x + 3)^2\\)" },
        { prompt: "HCF of \\(x^4 - 1\\) and \\(x^3 - 1\\)?", answer: "\\(x - 1\\)" },
        { prompt: "LCM of \\(x^3 - y^3\\) and \\(x^3 + y^3\\)?", answer: "\\(x^6 - y^6\\)" },
      ],
      pyqExampleId: "fd786b80-dbfc-42b4-90b5-67f2f1a1d925", // 2021 (I) — HCF of x³ − 19x + 30 and x² − 5x + 6
      traps: [
        {
          title: "Lowest power for the HCF",
          body:
            "\\((x + 1)^3\\) and \\((x + 1)^2(x - 1)\\) share \\((x + 1)^2\\), not \\((x + 1)^3\\). Taking the higher power belongs to the LCM.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-hcf-times-lcm",
      name: "HCF × LCM = product",
      intuition:
        "Every factor of two polynomials appears once in the HCF-and-LCM pair for each time it appears in the two polynomials. So their product equals HCF × LCM, which finds a missing polynomial by one division.",
      definition:
        "- For two polynomials: \\(p(x)\\,q(x) = \\text{HCF} \\times \\text{LCM}\\).\n" +
        "- So \\(q(x) = \\dfrac{\\text{HCF} \\times \\text{LCM}}{p(x)}\\).\n" +
        "- The HCF must divide the LCM; if it does not, the data are inconsistent.\n" +
        "- If the HCF is \\(1\\), the LCM is the product.",
      formula: {
        label: "Product rule",
        latex: "p(x)\\,q(x) = \\text{HCF}(p, q)\\times\\text{LCM}(p, q)",
      },
      authoredExample: {
        prompt: "The HCF of two polynomials is \\(x - 1\\) and their LCM is \\((x - 1)(x + 2)(x - 3)\\). One is \\(x^2 + x - 2\\). Find the other.",
        steps: [
          "\\(x^2 + x - 2 = (x - 1)(x + 2)\\).",
          "Other \\(= \\dfrac{(x - 1)\\cdot(x - 1)(x + 2)(x - 3)}{(x - 1)(x + 2)} = (x - 1)(x - 3)\\).",
        ],
        answer: "\\(x^2 - 4x + 3\\).",
      },
      selfCheckExample: {
        prompt: "The product of two expressions is \\(a^3b^2c\\) and their HCF is \\(ab\\). Find their LCM.",
        steps: ["\\(\\dfrac{a^3b^2c}{ab}\\)."],
        answer: "\\(a^2bc\\).",
      },
      practiceSet: [
        { prompt: "HCF \\(1\\), product \\(pq\\). LCM?", answer: "\\(pq\\)" },
        { prompt: "HCF \\(x\\), LCM \\(x^3 - x\\), one is \\(x^2 - x\\). The other?", answer: "\\(x^2 + x\\)" },
        { prompt: "Product \\(12x^3\\), HCF \\(2x\\). LCM?", answer: "\\(6x^2\\)" },
        { prompt: "Does the rule hold for three polynomials?", answer: "No, only for two" },
      ],
      pyqExampleId: "9ccd3b7b-d61b-4415-8377-dcfddd071db4", // 2018 (II) — HCF x + 3, one polynomial x² − 4x − 21
      traps: [
        {
          title: "Only for two polynomials",
          body:
            "\\(p q = \\text{HCF}\\times\\text{LCM}\\) is true for a pair. For three polynomials the product is generally not HCF \\(\\times\\) LCM.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-hcf-parameters",
      name: "Unknowns from a given HCF",
      intuition:
        "If \\(x - k\\) is a common factor, then \\(k\\) is a root of both polynomials. That gives two equations; subtracting them removes the \\(x^2\\) term.",
      definition:
        "- \\(x - k\\) divides both \\(\\Rightarrow\\) substitute \\(x = k\\) in each: two equations.\n" +
        "- Subtracting two monic quadratics' equations at \\(x = k\\) gives \\(k\\) directly: \\((a - c)k + (b - d) = 0\\).\n" +
        "- A given quadratic HCF: factorise it and use both roots.",
      formula: {
        label: "Common root",
        latex: "k^2 + ak + b = 0,\\ k^2 + ck + d = 0 \\;\\Rightarrow\\; k = \\dfrac{d - b}{a - c}",
      },
      authoredExample: {
        prompt: "\\(x - 2\\) is the HCF of \\(x^2 + ax - 6\\) and \\(x^2 - 5x + b\\). Find \\(a\\) and \\(b\\).",
        steps: ["\\(4 + 2a - 6 = 0\\), so \\(a = 1\\).", "\\(4 - 10 + b = 0\\), so \\(b = 6\\)."],
        answer: "\\(a = 1\\), \\(b = 6\\).",
      },
      selfCheckExample: {
        prompt: "\\(x + k\\) is the HCF of \\(x^2 + 3x + 2\\) and \\(x^2 + 5x + 4\\). Find \\(k\\).",
        steps: ["\\((x + 1)(x + 2)\\) and \\((x + 1)(x + 4)\\)."],
        answer: "\\(k = 1\\).",
      },
      practiceSet: [
        { prompt: "\\(x - 3\\) divides \\(x^2 + px - 3\\). \\(p\\)?", answer: "\\(-2\\)" },
        { prompt: "Common root of \\(x^2 + px + q\\) and \\(x^2 + qx + p\\) (\\(p \\ne q\\))?", answer: "\\(x = 1\\)" },
        { prompt: "HCF \\(x - 1\\) of \\(x^2 + ax + 2\\) and \\(x^2 + bx - 3\\). \\(a + b\\)?", answer: "\\(-1\\)" },
        { prompt: "HCF \\((x + 2)(x - 1)\\): which roots to substitute?", answer: "\\(-2\\) and \\(1\\)" },
      ],
      pyqExampleId: "b7a1f370-94c3-43d7-86d7-f0d33f5c0bb3", // 2026 (I) — HCF x − 5 of x² − x − p and x² − qx − 10
      traps: [
        {
          title: "x + k has root −k",
          body:
            "If the HCF is \\(x + k\\), substitute \\(x = -k\\). The answer for \\(k\\) then comes out with the opposite sign to the root.",
        },
      ],
    },
  ],
};
