import type { SubtopicNote } from "@/app/notes/_types";

export const RATE_LAW_AND_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Rate Law, Order, Molecularity and Rate Expression",
  title: "Rate Law, Order, Molecularity and Rate Expression",
  oneLineDefinition:
    "rate = k[A]ˣ[B]ʸ with x + y the (experimental) order; k is the rate at unit concentrations, depends only on temperature, and its unit depends on the order; molecularity is the number of species in an elementary step and equals the order only for elementary reactions.",
  whyItMatters:
    "38 PYQs, none HARD — the chapter's second-largest page. A third are k from a rate and concentrations (or the reverse), a third are the order read off a rate law or a concentration experiment, and the rest are the change in rate when concentrations are doubled or halved, the order-versus-molecularity contrast, and three named examples (H₂O₂ decomposition first order, H₂ + I₂ second, H₂ + Br₂ order 3/2). " +
    "Nothing here needs more than substitution; the traps are conceptual — order is experimental, k is concentration-independent.",
  concepts: [
    // 1 — rate law and order
    {
      kind: "formula" as const,
      slug: "cetkin-rate-law-and-order",
      name: "The Rate Law and the Order: Exponents Come From Experiment, Not From the Equation",
      intuition:
        "The rate law \\(r = k[A]^x[B]^y\\) is measured, and \\(x + y\\) is the order. The exponents need not match the stoichiometric coefficients, can be fractional or zero, and a species with exponent zero does not affect the rate at all.",
      definition:
        "- \\(2\\text{NO} + 2\\text{H}_2 \\to \\text{N}_2 + 2\\text{H}_2\\text{O}\\) with \\(r = k[\\text{NO}]^2[\\text{H}_2]\\): first order in H\\(_2\\), overall order \\(3\\). \\(r = k[\\text{H}_2][\\text{I}_2]\\): overall \\(2\\), first in each. \\(r = k[A]^{1.5}[B]^{2.5}\\): order \\(4\\).\n" +
        "- Rate proportional to \\([\\text{NO}_2]^2\\) and independent of [CO]: \\(r = k[\\text{NO}_2]^2[\\text{CO}]^0\\). Second order in NO, first in Cl\\(_2\\): \\(r = k[\\text{NO}]^2[\\text{Cl}_2]\\). First in CHCl\\(_3\\), half in Cl\\(_2\\): \\(r = k[\\text{CHCl}_3][\\text{Cl}_2]^{1/2}\\), order \\(\\tfrac32\\).\n" +
        "- From an experiment: tenfold \\([A]\\) giving \\(100\\times\\) the rate means \\(10^x = 100\\), \\(x = 2\\).\n" +
        "- Order is an experimental quantity; it may be an integer, a fraction or zero; it is NOT a theoretical quantity.\n" +
        "- Named examples: \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\) and CH\\(_3\\)CHO → CH\\(_4\\) + CO are first order; \\(\\text{H}_2 + \\text{I}_2 \\to 2\\text{HI}\\) and \\(2\\text{NO}_2 \\to 2\\text{NO} + \\text{O}_2\\) are second; \\(2\\text{NO} + 2\\text{H}_2\\) and \\(2\\text{NO}_2 + \\text{F}_2\\) are third.",
      formula: {
        label: "Rate law",
        latex:
          "r = k[A]^x[B]^y,\\qquad \\text{order} = x + y \\ (\\text{experimental; may be } 0, \\text{ fractional})",
      },
      authoredExample: {
        prompt: "Doubling \\([A]\\) doubles the rate; doubling \\([B]\\) quadruples it. Write the rate law and the overall order.",
        steps: [
          "\\(2^x = 2 \\Rightarrow x = 1\\); \\(2^y = 4 \\Rightarrow y = 2\\).",
        ],
        answer: "\\(r = k[A][B]^2\\); order \\(3\\)",
      },
      selfCheckExample: {
        prompt: "For \\(r = k[X]^{1/2}[Y]^{3/2}\\), state the order with respect to each reactant and overall, and the factor by which the rate changes if \\([Y]\\) is quadrupled.",
        steps: [
          "Orders \\(\\tfrac12\\), \\(\\tfrac32\\), overall \\(2\\); \\(4^{3/2} = 8\\).",
        ],
        answer: "\\(\\tfrac12\\), \\(\\tfrac32\\), overall \\(2\\); rate \\(\\times 8\\)",
      },
      practiceSet: [
        { prompt: "Order of \\(r = k[\\text{NO}]^2[\\text{H}_2]\\)?", answer: "\\(3\\)" },
        { prompt: "Order of H\\(_2\\)O\\(_2\\) decomposition?", answer: "\\(1\\)" },
        { prompt: "\\(x\\) if \\(10\\times[A]\\) gives \\(100\\times\\) rate?", answer: "\\(2\\)" },
        { prompt: "Is order theoretical or experimental?", answer: "Experimental" },
      ],
      pyqExampleId: "2c89e0a5-3a2c-4ae2-9173-b650134d23e6",
      traps: [
        {
          title: "Reading the order off the balanced equation",
          body:
            "\\(2\\text{N}_2\\text{O}_5 \\to 4\\text{NO}_2 + \\text{O}_2\\) is first order, and H\\(_2\\) + Br\\(_2\\) is order \\(\\tfrac32\\). The coefficients give molecularity for an elementary step; the order is measured.",
        },
      ],
    },

    // 2 — rate constant calculations
    {
      kind: "formula" as const,
      slug: "cetkin-rate-constant-calculations",
      name: "The Rate Constant: k = rate/([A]ˣ[B]ʸ), Its Units and Its Properties",
      intuition:
        "Substitute the given concentrations into the rate law and divide the rate by the concentration product. The unit of \\(k\\) is whatever makes the equation balance — (mol dm\\(^{-3}\\))\\(^{1 - n}\\) s\\(^{-1}\\) for order \\(n\\) — so a unit of s\\(^{-1}\\) means first order.",
      definition:
        "- \\(r = k[A][B]^2\\): \\(k = \\dfrac{7.2 \\times 10^{-2}}{0.4 \\times 0.01} = 18\\), \\(\\dfrac{3.6 \\times 10^{-2}}{0.2 \\times 0.01} = 18\\) mol\\(^{-2}\\) dm\\(^6\\) s\\(^{-1}\\); \\(r = k[A]^2[B]\\): \\(\\dfrac{0.22}{1 \\times 0.25} = 0.88\\), \\(\\dfrac{1.8 \\times 10^{-2}}{0.04 \\times 0.1} = 4.5\\), \\(\\dfrac{0.24}{0.25 \\times 0.2} = 4.8\\).\n" +
        "- Rate from \\(k\\): \\(6.25 \\times 1^2 \\times 0.2 = 1.25\\) (\\(r = k[A]^2[B]\\)); \\(6.25 \\times 1 \\times 0.2^2 = 0.25\\) (\\(r = k[A][B]^2\\)). Concentration from a rate: \\([A] = \\dfrac{0.25}{6.25 \\times 0.25} = 0.16\\).\n" +
        "- Units: zero order mol dm\\(^{-3}\\) s\\(^{-1}\\); first s\\(^{-1}\\); second mol\\(^{-1}\\) dm\\(^3\\) s\\(^{-1}\\); third mol\\(^{-2}\\) dm\\(^6\\) s\\(^{-1}\\). A \\(k\\) in hour\\(^{-1}\\) or s\\(^{-1}\\) is first order.\n" +
        "- \\(k\\) is independent of concentration, varies with temperature, equals the rate at unit concentrations; its unit DEPENDS on the order. For a first-order reaction the slope of rate against concentration is \\(k\\).",
      formula: {
        label: "Rate constant",
        latex:
          "k = \\frac{r}{[A]^x[B]^y},\\qquad [k] = (\\text{mol dm}^{-3})^{1-n}\\,\\text{s}^{-1}",
      },
      authoredExample: {
        prompt: "For \\(r = k[A]^2[B]\\), the rate is \\(3.2 \\times 10^{-3}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\) when \\([A] = 0.4\\) M and \\([B] = 0.05\\) M. Find \\(k\\) with its unit.",
        steps: [
          "\\(k = \\dfrac{3.2 \\times 10^{-3}}{0.16 \\times 0.05} = \\dfrac{3.2 \\times 10^{-3}}{8 \\times 10^{-3}} = 0.4\\).",
        ],
        answer: "\\(0.4\\) mol\\(^{-2}\\) dm\\(^6\\) s\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A reaction has \\(k = 2.5\\) mol\\(^{-1}\\) dm\\(^3\\) min\\(^{-1}\\). What is its order, and what is the rate when the single reactant is at \\(0.2\\) M?",
        steps: [
          "The unit mol\\(^{-1}\\) dm\\(^3\\) min\\(^{-1}\\) is second order; \\(r = 2.5 \\times 0.04 = 0.1\\).",
        ],
        answer: "Second order; \\(0.1\\) mol dm\\(^{-3}\\) min\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(k\\) for \\(r = 0.072\\), \\([A] = 0.4\\), \\([B] = 0.1\\), \\(r = k[A][B]^2\\)?", answer: "\\(18\\) mol\\(^{-2}\\) dm\\(^6\\) s\\(^{-1}\\)" },
        { prompt: "Unit of \\(k\\) for a second-order reaction?", answer: "mol\\(^{-1}\\) dm\\(^3\\) s\\(^{-1}\\)" },
        { prompt: "Order if \\(k\\) is in hour\\(^{-1}\\)?", answer: "First" },
        { prompt: "Does \\(k\\) change when \\([A]\\) doubles?", answer: "No" },
      ],
      pyqExampleId: "5a711ad7-6c4f-4bcf-a555-e9f64c64cf95",
      traps: [
        {
          title: "Squaring the wrong concentration",
          body:
            "\\(r = k[A][B]^2\\) squares \\([B]\\). With \\([A] = 1\\) and \\([B] = 0.2\\), squaring the wrong one turns \\(0.25\\) into \\(1.25\\) — and both are on the list, because the two rate laws appear on twin stems.",
        },
      ],
    },

    // 3 — effect of changing concentration
    {
      kind: "formula" as const,
      slug: "cetkin-effect-of-changing-concentration",
      name: "How the Rate Changes When Concentrations Change: Multiply the Factors",
      intuition:
        "Scale each concentration by its factor raised to its order and multiply. Doubling a first-order reactant doubles the rate; doubling a second-order one quadruples it; halving one and doubling another with equal orders leaves it unchanged.",
      definition:
        "- \\(r = k[A][B]^2\\): doubling \\([A]\\) → \\(\\times 2\\); doubling both → \\(\\times 8\\); doubling A, B and a zero-order C → still \\(\\times 8\\).\n" +
        "- \\(r = k[A][B]\\): doubling both → \\(\\times 4\\); doubling \\([A]\\) alone → \\(\\times 2\\); doubling \\([B]\\) and halving \\([A]\\) → \\(\\times 1\\); halving \\([B]\\) alone → \\(\\times \\tfrac12\\).\n" +
        "- 'Which change does NOT affect the rate' is the one whose factors multiply to \\(1\\).",
      formula: {
        label: "Rate factor",
        latex:
          "\\frac{r'}{r} = \\left(\\frac{[A]'}{[A]}\\right)^x\\left(\\frac{[B]'}{[B]}\\right)^y",
      },
      authoredExample: {
        prompt: "For \\(r = k[A]^2[B]\\), by what factor does the rate change if \\([A]\\) is tripled and \\([B]\\) is halved?",
        steps: [
          "\\(3^2 \\times \\tfrac12 = 4.5\\).",
        ],
        answer: "\\(\\times 4.5\\)",
      },
      selfCheckExample: {
        prompt: "For \\(r = k[A]^{1/2}[B]\\), what happens to the rate if \\([A]\\) is quadrupled and \\([B]\\) halved?",
        steps: [
          "\\(4^{1/2} \\times \\tfrac12 = 1\\).",
        ],
        answer: "Unchanged",
      },
      practiceSet: [
        { prompt: "\\(r = k[A][B]^2\\), both doubled: factor?", answer: "\\(8\\)" },
        { prompt: "\\(r = k[A][B]\\), both doubled: factor?", answer: "\\(4\\)" },
        { prompt: "\\(r = k[A][B]\\), \\([A]\\) halved and \\([B]\\) doubled: factor?", answer: "\\(1\\)" },
        { prompt: "\\(r = k[A]^2\\), \\([A]\\) tripled: factor?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "d1cdfc5b-0390-4006-9e5e-739b1e8453a1",
      traps: [
        {
          title: "Adding the factors",
          body:
            "Doubling A and B in \\(r = k[A][B]^2\\) gives \\(2 \\times 4 = 8\\), not \\(2 + 4 = 6\\). Factors multiply because the rate law is a product.",
        },
      ],
    },

    // 4 — order vs molecularity
    {
      kind: "formula" as const,
      slug: "cetkin-order-vs-molecularity",
      name: "Order Versus Molecularity",
      intuition:
        "Molecularity counts the species that collide in ONE elementary step — always a positive whole number, never zero or fractional — and is a theoretical idea. Order is measured from the rate law and can be anything. For an elementary reaction the two coincide.",
      definition:
        "- \\(\\text{O}_3 + \\text{O} \\to 2\\text{O}_2\\), elementary, \\(r = k[\\text{O}_3][\\text{O}]\\): order \\(2\\), molecularity \\(2\\). \\(\\text{NO}_2 + \\text{NO}_2 \\to 2\\text{NO} + \\text{O}_2\\): order \\(2\\), molecularity \\(2\\).\n" +
        "- \\(\\text{C}_2\\text{H}_5\\text{I} \\to \\text{C}_2\\text{H}_4 + \\text{HI}\\), \\(r = k[\\text{C}_2\\text{H}_5\\text{I}]\\): order \\(1\\), molecularity \\(1\\) (unimolecular).\n" +
        "- \\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\), \\(r = k[\\text{H}_2][\\text{Br}_2]^{1/2}\\): bimolecular, order \\(\\tfrac32\\) — the standard example of the two differing.\n" +
        "- For a complex (multistep) reaction, molecularity is defined per step and the overall order comes from the slow step.",
      formula: {
        label: "The contrast",
        latex:
          "\\text{molecularity} \\in \\{1, 2, 3\\} \\text{ (theoretical, per step)};\\qquad \\text{order} \\in \\mathbb{R}_{\\ge 0} \\text{ (experimental)}",
      },
      authoredExample: {
        prompt: "For the elementary reaction \\(2\\text{NO} + \\text{O}_2 \\to 2\\text{NO}_2\\), state the molecularity, the rate law and the order.",
        steps: [
          "Three species collide: molecularity \\(3\\); elementary, so \\(r = k[\\text{NO}]^2[\\text{O}_2]\\), order \\(3\\).",
        ],
        answer: "Molecularity \\(3\\); \\(r = k[\\text{NO}]^2[\\text{O}_2]\\); order \\(3\\)",
      },
      selfCheckExample: {
        prompt: "Can a reaction have molecularity \\(\\tfrac32\\)? Can it have order \\(\\tfrac32\\)?",
        steps: [
          "Molecularity is a count of molecules and must be a whole number; order is measured and may be fractional (H\\(_2\\) + Br\\(_2\\)).",
        ],
        answer: "No; yes.",
      },
      practiceSet: [
        { prompt: "Molecularity of \\(\\text{O}_3 + \\text{O} \\to 2\\text{O}_2\\)?", answer: "\\(2\\)" },
        { prompt: "Order of \\(r = k[\\text{H}_2][\\text{Br}_2]^{1/2}\\)?", answer: "\\(\\tfrac32\\)" },
        { prompt: "Can molecularity be zero?", answer: "No" },
        { prompt: "When does order equal molecularity?", answer: "For an elementary reaction" },
      ],
      pyqExampleId: "49d8deef-dee0-4418-a7f6-155cafb5f991",
      traps: [
        {
          title: "Calling H₂ + Br₂ 'monomolecular' because the order is fractional",
          body:
            "Two molecules collide, so it is bimolecular whatever the order. Options pairing 'monomolecular' with \\(\\tfrac32\\) are the planted confusion of the two ideas.",
        },
      ],
    },
  ],
  related: [
    {
      label: "First-Order Kinetics — the integrated law for order 1",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-first-order",
    },
    {
      label: "Reaction Mechanism — molecularity per step and the rate-determining step",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-mechanism",
    },
  ],
};
