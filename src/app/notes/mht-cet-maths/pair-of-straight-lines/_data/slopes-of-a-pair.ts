import type { SubtopicNote } from "@/app/notes/_types";

export const SLOPES_OF_A_PAIR_NOTE: SubtopicNote = {
  subtopicName: "Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions",
  title: "Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions",
  oneLineDefinition:
    "For ax² + 2hxy + by² = 0 the slopes satisfy m₁ + m₂ = −2h/b and m₁m₂ = a/b; any relation between the slopes (a ratio, a reciprocal, a common line) becomes an equation in a, h, b.",
  whyItMatters:
    "10 PYQs at 50% HARD — the algebraic heart of the chapter. 'One slope is k times the other' has been set with k = 2, 3, 4 and the ratio 2 : 3; 'the slopes are reciprocals' once; 'a common line between two pairs' once; and the general identity (m₁ + m₂)²/(m₁m₂) = 4h²/(ab) twice, disguised as 16h² = 25ab and 4ab = 3h². " +
    "The HARD ones are the same identity with a parameter to eliminate; the trap is forgetting that b, not a, divides the coefficients.",
  concepts: [
    // 1 — sum and product
    {
      kind: "formula" as const,
      slug: "cetpsl-sum-and-product-of-slopes",
      name: "m₁ + m₂ = −2h/b and m₁m₂ = a/b",
      intuition:
        "Divide \\(ax^2 + 2hxy + by^2 = 0\\) by \\(x^2\\): \\(b\\left(\\dfrac{y}{x}\\right)^2 + 2h\\left(\\dfrac{y}{x}\\right) + a = 0\\) is a quadratic in the slope \\(m = \\dfrac{y}{x}\\). Vieta on it gives the sum and the product.",
      definition:
        "- \\(Kx^2 + 6xy + y^2 = 0\\): \\(m_1 + m_2 = -6\\), \\(m_1 m_2 = K\\). With \\(m_2 = 3m_1\\): \\(4m_1 = -6\\), \\(m_1 = -\\tfrac32\\), \\(K = 3m_1^2 = \\tfrac{27}{4}\\).\n" +
        "- \\(4x^2 + kxy + y^2 = 0\\), one slope four times the other: \\(4m_2^2 = 4\\), \\(m_2 = \\pm1\\), \\(5m_2 = -k\\), \\(k = \\mp5\\); the paper offers \\(5\\).\n" +
        "- \\(x^2 + 2hxy + 2y^2 = 0\\), slopes in \\(1 : 2\\): \\(2m^2 = \\tfrac12\\), \\(m = \\pm\\tfrac12\\); \\(3m = -h\\), \\(h = \\mp\\tfrac32\\); \\(\\tfrac32\\) is offered.\n" +
        "- Reciprocal slopes (\\(ax^2 + (2a + 1)xy + 2y^2 = 0\\)): \\(m_1 m_2 = \\tfrac{a}{2} = 1 \\Rightarrow a = 2\\); sum \\(-\\tfrac{5}{2}\\); \\(m_1^2 + m_2^2 = \\tfrac{25}{4} - 2 = \\tfrac{17}{4}\\).\n" +
        "- Divide by \\(b\\), the coefficient of \\(y^2\\). Dividing by \\(a\\) gives the sum and product of the RECIPROCAL slopes.",
      formula: {
        label: "Vieta for slopes",
        latex:
          "bm^2 + 2hm + a = 0:\\qquad m_1 + m_2 = -\\frac{2h}{b},\\qquad m_1 m_2 = \\frac{a}{b}",
      },
      authoredExample: {
        prompt: "One line of \\(2x^2 + kxy + 3y^2 = 0\\) has slope \\(-2\\). Find \\(k\\).",
        steps: [
          "\\(m_1 m_2 = \\dfrac23 \\Rightarrow m_2 = -\\dfrac13\\). \\(m_1 + m_2 = -\\dfrac73 = -\\dfrac{k}{3}\\).",
        ],
        answer: "\\(k = 7\\)",
      },
      selfCheckExample: {
        prompt: "The slopes of \\(px^2 - 8xy + 3y^2 = 0\\) differ by \\(2\\). Find \\(p\\).",
        steps: [
          "\\(m_1 + m_2 = \\dfrac83\\), \\(m_1 m_2 = \\dfrac{p}{3}\\). \\((m_1 - m_2)^2 = \\dfrac{64}{9} - \\dfrac{4p}{3} = 4 \\Rightarrow \\dfrac{4p}{3} = \\dfrac{28}{9} \\Rightarrow p = \\dfrac73\\).",
        ],
        answer: "\\(p = \\dfrac73\\)",
      },
      practiceSet: [
        {
          prompt: "\\(m_1 + m_2\\) for \\(3x^2 + 8xy + 2y^2 = 0\\)?",
          answer: "\\(-4\\)",
        },
        {
          prompt: "\\(m_1 m_2\\) for the same pair?",
          answer: "\\(\\dfrac32\\)",
        },
        {
          prompt: "\\(K\\) if \\(Kx^2 + 6xy + y^2 = 0\\) has one slope thrice the other?",
          answer: "\\(\\dfrac{27}{4}\\)",
        },
        {
          prompt: "\\(m_1^2 + m_2^2\\) in terms of sum \\(S\\) and product \\(P\\)?",
          answer: "\\(S^2 - 2P\\)",
        },
      ],
      pyqExampleId: "15c5681c-4be2-4ee3-bb60-e00a992a0204",
      traps: [
        {
          title: "Dividing by a instead of b",
          body:
            "\\(m_1 m_2 = \\dfrac{a}{b}\\), the \\(x^2\\) coefficient over the \\(y^2\\) coefficient. Inverting it gives \\(K = \\dfrac{4}{27}\\), option (D) on the \\(Kx^2 + 6xy + y^2\\) stem.",
        },
      ],
    },

    // 2 — ratio identity
    {
      kind: "formula" as const,
      slug: "cetpsl-slope-ratio-identity",
      name: "Slopes in a Ratio: (m + n)² ab = 4mn h², and the Reverse Direction",
      intuition:
        "If \\(m_1 : m_2 = m : n\\), write \\(m_1 = mt\\), \\(m_2 = nt\\) and eliminate \\(t\\) between the sum and the product: \\(\\dfrac{(m_1 + m_2)^2}{m_1 m_2} = \\dfrac{(m + n)^2}{mn} = \\dfrac{4h^2}{ab}\\). The same identity, read backwards, turns a given relation like \\(16h^2 = 25ab\\) into the ratio.",
      definition:
        "- Ratio \\(1 : 2\\): \\(\\dfrac{9}{2} = \\dfrac{4h^2}{ab} \\Rightarrow 9ab = 8h^2\\), so \\(ab : h^2 = 8 : 9\\).\n" +
        "- Ratio \\(2 : 3\\) for \\(6x^2 + 2hxy + y^2 = 0\\): \\(25 \\cdot 6 = 4 \\cdot 6 \\cdot h^2 \\Rightarrow h^2 = \\tfrac{25}{4}\\), \\(h = \\pm\\tfrac52\\).\n" +
        "- Given \\(16h^2 = 25ab\\): \\(\\dfrac{(k + 1)^2}{k} = \\dfrac{4h^2}{ab} = \\dfrac{25}{4} \\Rightarrow 4k^2 - 17k + 4 = 0 \\Rightarrow k = 4\\) or \\(\\tfrac14\\): one slope is four times the other.\n" +
        "- Given \\(4ab = 3h^2\\): \\((m_1 - m_2)^2 = \\dfrac{4h^2 - 4ab}{b^2} = \\dfrac{h^2}{b^2}\\), so \\(m_1 - m_2 = \\pm\\dfrac{h}{b}\\) with \\(m_1 + m_2 = -\\dfrac{2h}{b}\\): slopes \\(-\\dfrac{h}{2b}\\), \\(-\\dfrac{3h}{2b}\\), ratio \\(1 : 3\\).\n" +
        "- \\(\\dfrac{(m_1 + m_2)^2}{m_1 m_2}\\) is the quantity to compute in every ratio stem; it is \\(\\dfrac{4h^2}{ab}\\) whatever \\(b\\) is.",
      formula: {
        label: "Ratio identity",
        latex:
          "m_1 : m_2 = m : n \\iff (m + n)^2\\,ab = 4mn\\,h^2 \\qquad \\frac{(m_1 + m_2)^2}{m_1 m_2} = \\frac{4h^2}{ab}",
      },
      authoredExample: {
        prompt: "The slopes of \\(ax^2 + 2hxy + by^2 = 0\\) are in the ratio \\(2 : 5\\). Find \\(ab : h^2\\).",
        steps: [
          "\\((2 + 5)^2 ab = 4 \\cdot 2 \\cdot 5 \\cdot h^2 \\Rightarrow 49ab = 40h^2\\).",
        ],
        answer: "\\(ab : h^2 = 40 : 49\\)",
      },
      selfCheckExample: {
        prompt: "If \\(9ab = 8h^2\\) for \\(ax^2 + 2hxy + by^2 = 0\\), find the ratio of the slopes.",
        steps: [
          "\\(\\dfrac{(k + 1)^2}{k} = \\dfrac{4h^2}{ab} = \\dfrac{4 \\cdot 9}{8} = \\dfrac92 \\Rightarrow 2k^2 - 5k + 2 = 0 \\Rightarrow k = 2\\) or \\(\\dfrac12\\).",
        ],
        answer: "\\(1 : 2\\)",
      },
      practiceSet: [
        {
          prompt: "Ratio \\(1 : 2\\): \\(ab : h^2 = ?\\)",
          answer: "\\(8 : 9\\)",
        },
        {
          prompt: "Ratio \\(1 : 3\\): \\(ab : h^2 = ?\\)",
          answer: "\\(3 : 4\\)",
        },
        {
          prompt: "\\(16h^2 = 25ab\\): ratio?",
          answer: "\\(1 : 4\\)",
        },
        {
          prompt: "Equal slopes (\\(1 : 1\\)): condition?",
          answer: "\\(h^2 = ab\\)",
        },
      ],
      pyqExampleId: "2678bd2e-9e21-4b18-a6a1-af00305e9d4a",
      traps: [
        {
          title: "Writing the identity with h² and ab swapped",
          body:
            "\\((m + n)^2 ab = 4mn h^2\\), so \\(ab : h^2 = 8 : 9\\) for the ratio \\(1 : 2\\), not \\(9 : 8\\). Both orders are always offered; check with \\(m = n = 1\\), which must give \\(h^2 = ab\\).",
        },
      ],
    },

    // 3 — common line and perpendicular to a given line
    {
      kind: "formula" as const,
      slug: "cetpsl-common-line-and-perpendicular-to-a-given-line",
      name: "A Common Line Between Two Pairs, and a Line of the Pair Perpendicular to a Given Line",
      intuition:
        "A line \\(y = mx\\) belongs to a pair iff \\(m\\) satisfies its slope quadratic. So a common line means a common root; and 'one line of the pair is perpendicular to \\(mx + ny = 18\\)' means the slope \\(\\dfrac{n}{m}\\) is a root.",
      definition:
        "- \\(6x^2 - xy - 5y^2 = (6x + 5y)(x - y)\\): lines \\(x = y\\) and \\(x = -\\tfrac56 y\\). For \\(3x^2 - 5xy + py^2 = 0\\) to share one: \\(x = y\\) gives \\(3 - 5 + p = 0\\), \\(p = 2\\); \\(x = -\\tfrac56 y\\) gives \\(\\tfrac{75}{36} + \\tfrac{25}{6} + p = 0\\), \\(p = -\\tfrac{25}{4}\\).\n" +
        "- One line of \\(ax^2 + 2hxy + by^2 = 0\\) perpendicular to \\(mx + ny = 18\\) (slope \\(-\\tfrac{m}{n}\\)) has slope \\(\\tfrac{n}{m}\\): substitute \\(y = \\tfrac{n}{m}x\\): \\(am^2 + 2hmn + bn^2 = 0\\).\n" +
        "- Substituting a direction \\((x, y) = (m, n)\\) into the pair is the fastest membership test.\n" +
        "- Two pairs sharing BOTH lines are proportional equations; sharing one is a single common root.",
      formula: {
        label: "Membership test",
        latex:
          "y = kx \\text{ belongs to } ax^2 + 2hxy + by^2 = 0 \\iff a + 2hk + bk^2 = 0",
      },
      authoredExample: {
        prompt: "For what \\(p\\) do \\(x^2 - 3xy + 2y^2 = 0\\) and \\(px^2 - 4xy + y^2 = 0\\) have a common line?",
        steps: [
          "First pair: \\((x - y)(x - 2y)\\), lines \\(y = x\\) and \\(y = \\tfrac{x}{2}\\).",
          "\\(y = x\\) in the second: \\(p - 4 + 1 = 0 \\Rightarrow p = 3\\). \\(y = \\tfrac{x}{2}\\): \\(p - 2 + \\tfrac14 = 0 \\Rightarrow p = \\tfrac74\\).",
        ],
        answer: "\\(p = 3\\) or \\(p = \\dfrac74\\)",
      },
      selfCheckExample: {
        prompt: "One line of \\(3x^2 + 2hxy + y^2 = 0\\) is perpendicular to \\(x + 3y = 5\\). Find \\(h\\).",
        steps: [
          "Perpendicular slope is \\(3\\): \\(3 + 6h + 9 = 0 \\Rightarrow h = -2\\).",
        ],
        answer: "\\(h = -2\\)",
      },
      practiceSet: [
        {
          prompt: "Lines of \\(6x^2 - xy - 5y^2 = 0\\)?",
          answer: "\\(x = y\\), \\(6x + 5y = 0\\)",
        },
        {
          prompt: "Is \\(y = 2x\\) a line of \\(2x^2 - 5xy + 2y^2 = 0\\)?",
          answer: "Yes: \\(2 - 10 + 8 = 0\\).",
        },
        {
          prompt: "Slope perpendicular to \\(mx + ny = 18\\)?",
          answer: "\\(\\dfrac{n}{m}\\)",
        },
        {
          prompt: "Condition for \\(y = \\dfrac{n}{m}x\\) in \\(ax^2 + 2hxy + by^2 = 0\\)?",
          answer: "\\(am^2 + 2hmn + bn^2 = 0\\)",
        },
      ],
      pyqExampleId: "eb82350b-11a5-4329-a844-0f3d1ec51ed1",
      traps: [
        {
          title: "Substituting the given line's own slope",
          body:
            "Perpendicular to \\(mx + ny = 18\\) means slope \\(\\dfrac{n}{m}\\), which gives \\(am^2 + 2hmn + bn^2 = 0\\). Using \\(-\\dfrac{m}{n}\\) swaps \\(m\\) and \\(n\\) and flips a sign — options (A) and (D) on that stem.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Angle Between the Pair — the same sum and product inside the angle formula",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-angle-between-the-pair",
    },
    {
      label: "Joint Equation — factorising the pair to read the slopes directly",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-joint-equation",
    },
  ],
};
