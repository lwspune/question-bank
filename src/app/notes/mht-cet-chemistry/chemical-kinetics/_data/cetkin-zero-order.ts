import type { SubtopicNote } from "@/app/notes/_types";

export const ZERO_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Zero-Order Kinetics",
  title: "Zero-Order Kinetics",
  oneLineDefinition:
    "A zero-order reaction runs at a constant rate k regardless of concentration: [A]ₜ = [A]₀ − kt, k has the unit of a rate (mol dm⁻³ s⁻¹), and the half-life [A]₀/2k grows with the initial concentration.",
  whyItMatters:
    "7 PYQs, none HARD — the shortest page in the chapter. Rate constant from a concentration drop over a time, percent unreacted after a time, the half-life formula and its proportionality to [A]₀, and the one statement question (rate independent of concentration). " +
    "It is worth five minutes because the contrast with first order — half-life dependent on [A]₀ here, independent there — is a favourite comparison stem.",
  concepts: [
    // 1 — integrated law and k
    {
      kind: "formula" as const,
      slug: "cetkin-zero-order-integrated-law",
      name: "[A]ₜ = [A]₀ − kt: Constant Rate, k in Concentration per Time",
      intuition:
        "With \\(r = k[A]^0 = k\\) the concentration falls in a straight line: the drop divided by the time IS the rate constant. Its unit is the unit of a rate, mol dm\\(^{-3}\\) s\\(^{-1}\\).",
      definition:
        "- \\(k = \\dfrac{[A]_0 - [A]_t}{t}\\): \\(1.2 \\to 0.4\\) in \\(240\\) s gives \\(\\dfrac{0.8}{240}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\) \\(= 0.2\\) mol dm\\(^{-3}\\) min\\(^{-1}\\); \\(0.8 \\to 0.2\\) in \\(6\\) min gives \\(0.1\\) mol dm\\(^{-3}\\) min\\(^{-1}\\).\n" +
        "- Percent unreacted: with \\(k = 1\\) mol dm\\(^{-3}\\) s\\(^{-1}\\) and \\([A]_0\\) taken as \\(100\\), after \\(90\\) s \\([A] = 100 - 90 = 10\\%\\).\n" +
        "- The rate is independent of the reactant's concentration; the rate constant's unit is mol dm\\(^{-3}\\) s\\(^{-1}\\), NOT s\\(^{-1}\\).\n" +
        "- Examples: decomposition of NH\\(_3\\) on a hot platinum surface, photochemical H\\(_2\\) + Cl\\(_2\\), enzyme reactions at saturation.",
      formula: {
        label: "Zero order",
        latex:
          "[A]_t = [A]_0 - kt,\\qquad k = \\frac{[A]_0 - [A]_t}{t}\\ \\ (\\text{mol dm}^{-3}\\,\\text{s}^{-1})",
      },
      authoredExample: {
        prompt: "A zero-order reaction has \\(k = 0.05\\) mol dm\\(^{-3}\\) min\\(^{-1}\\). Starting from \\(1.5\\) mol dm\\(^{-3}\\), what is the concentration after \\(12\\) minutes?",
        steps: [
          "\\([A] = 1.5 - 0.05 \\times 12 = 0.9\\) mol dm\\(^{-3}\\).",
        ],
        answer: "\\(0.9\\) mol dm\\(^{-3}\\)",
      },
      selfCheckExample: {
        prompt: "In a zero-order reaction the concentration falls from \\(0.5\\) to \\(0.2\\) mol dm\\(^{-3}\\) in \\(50\\) s. How long until it reaches zero?",
        steps: [
          "\\(k = \\dfrac{0.3}{50} = 0.006\\); time to exhaust \\(= \\dfrac{0.5}{0.006} = 83.3\\) s.",
        ],
        answer: "\\(83.3\\) s",
      },
      practiceSet: [
        { prompt: "\\(k\\) if \\(1.2 \\to 0.4\\) in \\(240\\) s (per minute)?", answer: "\\(0.2\\) mol dm\\(^{-3}\\) min\\(^{-1}\\)" },
        { prompt: "Unit of a zero-order \\(k\\)?", answer: "mol dm\\(^{-3}\\) s\\(^{-1}\\)" },
        { prompt: "Percent left after \\(90\\) s if \\(k = 1\\) and \\([A]_0 = 100\\)?", answer: "\\(10\\%\\)" },
        { prompt: "Does the rate depend on \\([A]\\)?", answer: "No" },
      ],
      pyqExampleId: "17ec4060-33fe-494b-8c23-87ece19301fe",
      traps: [
        {
          title: "Forgetting the seconds-to-minutes conversion",
          body:
            "\\(\\dfrac{0.8}{240} = 0.0033\\) per second is \\(0.2\\) per minute; the options are per minute. Convert before matching.",
        },
      ],
    },

    // 2 — half-life
    {
      kind: "formula" as const,
      slug: "cetkin-zero-order-half-life",
      name: "Zero-Order Half-Life: t½ = [A]₀/2k, Proportional to the Initial Concentration",
      intuition:
        "Half of \\([A]_0\\) must be removed at the constant rate \\(k\\), so \\(t_{1/2} = \\dfrac{[A]_0/2}{k}\\). Doubling the starting amount doubles the time — the opposite of first order, where the half-life is fixed.",
      definition:
        "- \\(t_{1/2} = \\dfrac{[A]_0}{2k}\\); with \\([A]_0 = a\\): \\(\\dfrac{a}{2k}\\).\n" +
        "- \\(k\\) from a half-life: \\(t_{1/2} = 0.2\\) min with \\([A]_0 = 0.2\\) gives \\(k = \\dfrac{0.2}{2 \\times 0.2} = 0.5\\) mol dm\\(^{-3}\\) min\\(^{-1}\\).\n" +
        "- Half-life is directly proportional to the initial concentration and inversely to \\(k\\); it does not depend on the amount of product or on temperature except through \\(k\\).",
      formula: {
        label: "Zero-order half-life",
        latex:
          "t_{1/2} = \\frac{[A]_0}{2k}",
      },
      authoredExample: {
        prompt: "A zero-order reaction with \\(k = 0.04\\) mol dm\\(^{-3}\\) s\\(^{-1}\\) starts at \\(0.8\\) mol dm\\(^{-3}\\). Find the half-life, and the half-life if the start were \\(1.6\\).",
        steps: [
          "\\(\\dfrac{0.8}{0.08} = 10\\) s; doubling \\([A]_0\\) doubles it: \\(20\\) s.",
        ],
        answer: "\\(10\\) s; \\(20\\) s",
      },
      selfCheckExample: {
        prompt: "The half-life of a zero-order reaction is \\(30\\) min when \\([A]_0 = 0.6\\) M. Find \\(k\\).",
        steps: [
          "\\(k = \\dfrac{0.6}{2 \\times 30} = 0.01\\) mol dm\\(^{-3}\\) min\\(^{-1}\\).",
        ],
        answer: "\\(0.01\\) mol dm\\(^{-3}\\) min\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "\\(t_{1/2}\\) for \\([A]_0 = a\\)?", answer: "\\(\\dfrac{a}{2k}\\)" },
        { prompt: "\\(k\\) if \\(t_{1/2} = 0.2\\) min and \\([A]_0 = 0.2\\)?", answer: "\\(0.5\\) mol dm\\(^{-3}\\) min\\(^{-1}\\)" },
        { prompt: "Zero-order \\(t_{1/2}\\) is proportional to?", answer: "\\([A]_0\\)" },
        { prompt: "First-order \\(t_{1/2}\\) depends on \\([A]_0\\)?", answer: "No" },
      ],
      pyqExampleId: "1c7c82d1-3a7d-46d1-b057-3f22ebb1afe2",
      traps: [
        {
          title: "Using 0.693/k",
          body:
            "\\(0.693/k\\) is the FIRST-order half-life. For zero order the half-life carries \\([A]_0\\); option (B) \\(\\dfrac{a}{k}\\) forgets the \\(2\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "First-Order Kinetics — the half-life that does not depend on [A]₀",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-first-order",
    },
  ],
};
