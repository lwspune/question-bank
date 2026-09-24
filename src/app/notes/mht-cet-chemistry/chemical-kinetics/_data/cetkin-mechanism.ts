import type { SubtopicNote } from "@/app/notes/_types";

export const MECHANISM_NOTE: SubtopicNote = {
  subtopicName: "Reaction Mechanism, Intermediates and Rate-Determining Step",
  title: "Reaction Mechanism, Intermediates and Rate-Determining Step",
  oneLineDefinition:
    "A complex reaction is a sequence of elementary steps; the slowest step sets the rate and its molecularity writes the rate law; a species made in one step and consumed in a later one is an intermediate and never appears in the overall equation.",
  whyItMatters:
    "8 PYQs, none HARD — a recall page. Which step decides the rate (the slowest), which species is the intermediate in a two-step mechanism (set four times with the ClO⁻ and SO₂/NO pairs), which of four reactions is elementary, the rate law from a slow step, and one catalyst name (Fe–Cr for the water-gas shift). " +
    "Ten minutes covers it.",
  concepts: [
    // 1 — RDS and rate law from mechanism
    {
      kind: "formula" as const,
      slug: "cetkin-rds-and-rate-law-from-mechanism",
      name: "The Rate-Determining Step Writes the Rate Law",
      intuition:
        "A multistep reaction can go no faster than its slowest step, so that step's molecularity gives the rate law: for a slow step \\(\\text{NO}_2\\text{Cl} \\to \\text{NO}_2 + \\text{Cl}\\) the rate is \\(k[\\text{NO}_2\\text{Cl}]\\), whatever the fast step does afterwards.",
      definition:
        "- The rate of a multistep reaction is the rate of the SLOWEST step — not the fastest, not an average.\n" +
        "- Slow step \\(\\text{NO}_2\\text{Cl} \\to \\text{NO}_2 + \\text{Cl}\\), fast step \\(\\text{NO}_2\\text{Cl} + \\text{Cl} \\to \\text{NO}_2 + \\text{Cl}_2\\): \\(r = k[\\text{NO}_2\\text{Cl}]\\), first order, though the overall equation is \\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\).\n" +
        "- An **elementary** reaction happens in one step and its rate law follows its equation: \\(2\\text{NO}_2 + \\text{F}_2 \\to 2\\text{NO}_2\\text{F}\\) is the exam's example. Decompositions like \\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\) and \\(\\text{C}_2\\text{H}_5\\text{I} \\to \\text{C}_2\\text{H}_4 + \\text{HI}\\) proceed through mechanisms.\n" +
        "- Molecularity is defined for each elementary step, not for the overall reaction.",
      formula: {
        label: "Rate from the slow step",
        latex:
          "\\text{slow step } aA + bB \\to \\dots \\ \\Rightarrow\\ r = k[A]^a[B]^b",
      },
      authoredExample: {
        prompt: "A mechanism is: (slow) \\(\\text{A} + \\text{B} \\to \\text{C}\\); (fast) \\(\\text{C} + \\text{B} \\to \\text{D}\\). Write the rate law and the overall reaction.",
        steps: [
          "Slow step is bimolecular: \\(r = k[\\text{A}][\\text{B}]\\). Adding the steps: \\(\\text{A} + 2\\text{B} \\to \\text{D}\\) (C cancels).",
        ],
        answer: "\\(r = k[\\text{A}][\\text{B}]\\); \\(\\text{A} + 2\\text{B} \\to \\text{D}\\)",
      },
      selfCheckExample: {
        prompt: "If the slow step of a mechanism is \\(2\\text{X} \\to \\text{Y}\\), what is the order of the overall reaction?",
        steps: [
          "The slow step is bimolecular in X: \\(r = k[\\text{X}]^2\\), order \\(2\\).",
        ],
        answer: "\\(2\\)",
      },
      practiceSet: [
        { prompt: "Which step decides the rate of a multistep reaction?", answer: "The slowest" },
        { prompt: "Rate law if the slow step is \\(\\text{NO}_2\\text{Cl} \\to \\text{NO}_2 + \\text{Cl}\\)?", answer: "\\(r = k[\\text{NO}_2\\text{Cl}]\\)" },
        { prompt: "Which is elementary: \\(2\\text{NO}_2 + \\text{F}_2 \\to 2\\text{NO}_2\\text{F}\\) or \\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\)?", answer: "\\(2\\text{NO}_2 + \\text{F}_2\\)" },
        { prompt: "Molecularity is defined for?", answer: "Each elementary step" },
      ],
      pyqExampleId: "02a5697c-614a-427b-ab34-7a8cdf015681",
      traps: [
        {
          title: "Writing the rate law from the overall equation",
          body:
            "\\(2\\text{NO}_2\\text{Cl} \\to 2\\text{NO}_2 + \\text{Cl}_2\\) suggests \\(k[\\text{NO}_2\\text{Cl}]^2\\), option (D); the slow step is unimolecular and the law is first order.",
        },
      ],
    },

    // 2 — intermediates and catalysts
    {
      kind: "formula" as const,
      slug: "cetkin-intermediates-and-catalysts",
      name: "Intermediates: Made in One Step, Used in the Next; Catalysts: Used, Then Regenerated",
      intuition:
        "Add the steps of a mechanism and cancel what appears on both sides. A species that cancels because it is PRODUCED first and CONSUMED later is an intermediate; one that is consumed first and regenerated later is a catalyst. Neither appears in the overall equation.",
      definition:
        "- \\(2\\text{ClO}^- \\to \\text{ClO}_2^- + \\text{Cl}^-\\), then \\(\\text{ClO}_2^- + \\text{ClO}^- \\to \\text{ClO}_3^- + \\text{Cl}^-\\): \\(\\text{ClO}_2^-\\) is the intermediate; overall \\(3\\text{ClO}^- \\to \\text{ClO}_3^- + 2\\text{Cl}^-\\).\n" +
        "- \\(2\\text{SO}_2 + 2\\text{NO}_2 \\to 2\\text{SO}_3 + 2\\text{NO}\\), then \\(2\\text{NO} + \\text{O}_2 \\to 2\\text{NO}_2\\): NO is the intermediate (made in step i, used in step ii); NO\\(_2\\) is consumed first and regenerated — it acts as a catalyst; overall \\(2\\text{SO}_2 + \\text{O}_2 \\to 2\\text{SO}_3\\).\n" +
        "- Catalysts to know: Fe–Cr (iron–chromium oxide) for the water-gas shift \\(\\text{CO} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CO}_2 + \\text{H}_2\\); platinised asbestos for SO\\(_2\\) oxidation (contact process); MnO\\(_2\\) for KClO\\(_3\\) decomposition; Co–Th for Fischer–Tropsch.\n" +
        "- A catalyst lowers the activation energy and raises \\(k\\); it does not change the equilibrium position or the overall equation.",
      formula: {
        label: "Cancelling species",
        latex:
          "\\text{intermediate: produced then consumed;}\\qquad \\text{catalyst: consumed then regenerated}",
      },
      authoredExample: {
        prompt: "Mechanism: (i) \\(\\text{H}_2\\text{O}_2 + \\text{I}^- \\to \\text{H}_2\\text{O} + \\text{IO}^-\\); (ii) \\(\\text{H}_2\\text{O}_2 + \\text{IO}^- \\to \\text{H}_2\\text{O} + \\text{O}_2 + \\text{I}^-\\). Identify the intermediate and the catalyst.",
        steps: [
          "\\(\\text{IO}^-\\) is made in (i) and used in (ii): intermediate. \\(\\text{I}^-\\) is used in (i) and regenerated in (ii): catalyst. Overall \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\).",
        ],
        answer: "Intermediate \\(\\text{IO}^-\\); catalyst \\(\\text{I}^-\\)",
      },
      selfCheckExample: {
        prompt: "In the SO\\(_2\\)/NO\\(_2\\)/NO mechanism above, which species is the catalyst?",
        steps: [
          "NO\\(_2\\) is consumed in step (i) and regenerated in step (ii).",
        ],
        answer: "NO\\(_2\\)",
      },
      practiceSet: [
        { prompt: "Intermediate in the ClO\\(^-\\) mechanism?", answer: "\\(\\text{ClO}_2^-\\)" },
        { prompt: "Intermediate in the SO\\(_2\\)/NO\\(_2\\) mechanism?", answer: "NO" },
        { prompt: "Catalyst for \\(\\text{CO} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CO}_2 + \\text{H}_2\\)?", answer: "Fe–Cr" },
        { prompt: "Does an intermediate appear in the overall equation?", answer: "No" },
      ],
      pyqExampleId: "c3a1b6d2-02fe-45e1-a1ad-c7c0f668f06b",
      traps: [
        {
          title: "Picking the product that appears in both steps",
          body:
            "\\(\\text{Cl}^-\\) is formed in BOTH ClO\\(^-\\) steps and never consumed — it is a product, not an intermediate. The intermediate is the one that disappears again.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Rate Law and Order — molecularity versus order",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-rate-law-and-order",
    },
    {
      label: "Arrhenius — what a catalyst does to the activation energy",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-arrhenius",
    },
  ],
};
