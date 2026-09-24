import type { SubtopicNote } from "@/app/notes/_types";

export const ARRHENIUS_NOTE: SubtopicNote = {
  subtopicName: "Temperature Dependence, Arrhenius and Collision Theory",
  title: "Temperature Dependence, Arrhenius and Collision Theory",
  oneLineDefinition:
    "k = A e^(−Ea/RT): log k against 1/T is a line of slope −Ea/2.303R and intercept log A; between two temperatures log(k₂/k₁) = (Ea/2.303R)(T₂ − T₁)/(T₁T₂); only temperature (and a catalyst) changes k.",
  whyItMatters:
    "8 PYQs at 38% HARD — the chapter's only HARD questions, all three from 2025 and all the two-temperature form: Ea from a doubled rate constant between 27 °C and 37 °C, Ea from two k values, and a half-life carried from 400 K to 300 K. " +
    "The rest are the slope and intercept of the Arrhenius plot, 'k rises only with temperature', and one collision-theory statement. Two formulas, both in base-10 logs.",
  concepts: [
    // 1 — Arrhenius equation and plot
    {
      kind: "formula" as const,
      slug: "cetkin-arrhenius-equation-and-plot",
      name: "The Arrhenius Equation and Its Plot: Slope −Ea/2.303R, Intercept log A",
      intuition:
        "\\(k = A\\,e^{-E_a/RT}\\): the fraction of collisions with energy at least \\(E_a\\) grows with \\(T\\). Taking base-10 logs, \\(\\log k = \\log A - \\dfrac{E_a}{2.303R}\\cdot\\dfrac1T\\) — a straight line in \\(\\dfrac1T\\).",
      definition:
        "- Plot of \\(\\log_{10}k\\) (y) against \\(\\dfrac1T\\) (x): slope \\(= -\\dfrac{E_a}{2.303R}\\), intercept \\(= \\log_{10}A\\). (With \\(\\ln k\\) the slope is \\(-\\dfrac{E_a}{R}\\).)\n" +
        "- \\(k\\) from \\(A\\) and the exponent: \\(A = 1.6 \\times 10^{13}\\) s\\(^{-1}\\), \\(\\dfrac{E_a}{2.303RT} = 21\\): \\(\\log k = 13.204 - 21 = -7.796\\), \\(k = 1.6 \\times 10^{-8}\\) s\\(^{-1}\\).\n" +
        "- \\(k\\) depends on temperature (and on a catalyst, which lowers \\(E_a\\)) and on NOTHING else: raising [NO] or [Cl\\(_2\\)] in \\(r = k[\\text{NO}]^2[\\text{Cl}_2]\\) raises the rate, not \\(k\\).\n" +
        "- \\(A\\) is the frequency (pre-exponential) factor; \\(e^{-E_a/RT}\\) is the fraction of molecules with energy at least \\(E_a\\).",
      formula: {
        label: "Arrhenius",
        latex:
          "k = A\\,e^{-E_a/RT},\\qquad \\log_{10}k = \\log_{10}A - \\frac{E_a}{2.303R}\\cdot\\frac{1}{T}",
      },
      authoredExample: {
        prompt: "The Arrhenius plot of \\(\\log_{10}k\\) against \\(1/T\\) for a reaction has slope \\(-5000\\) K. Find \\(E_a\\) (\\(R = 8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\)).",
        steps: [
          "\\(E_a = 5000 \\times 2.303 \\times 8.314 = 95{,}700\\) J mol\\(^{-1}\\).",
        ],
        answer: "\\(95.7\\) kJ mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A reaction has \\(A = 2 \\times 10^{10}\\) s\\(^{-1}\\) and \\(\\dfrac{E_a}{2.303RT} = 6\\) at some temperature. Find \\(k\\).",
        steps: [
          "\\(\\log k = 10.301 - 6 = 4.301\\); \\(k = 2 \\times 10^4\\) s\\(^{-1}\\).",
        ],
        answer: "\\(2 \\times 10^4\\) s\\(^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Slope of \\(\\log k\\) vs \\(1/T\\)?", answer: "\\(-\\dfrac{E_a}{2.303R}\\)" },
        { prompt: "Intercept of that plot?", answer: "\\(\\log_{10}A\\)" },
        { prompt: "What raises \\(k\\) in \\(r = k[\\text{NO}]^2[\\text{Cl}_2]\\)?", answer: "Temperature only" },
        { prompt: "\\(\\log(1.6 \\times 10^{13}) = ?\\)", answer: "\\(13.204\\)" },
      ],
      pyqExampleId: "be0c3336-dee4-4ec4-8ee2-7514c092d0e6",
      traps: [
        {
          title: "Dropping the 2.303 with a base-10 plot",
          body:
            "The slope is \\(-\\dfrac{E_a}{R}\\) only for \\(\\ln k\\). With \\(\\log_{10}k\\) it is \\(-\\dfrac{E_a}{2.303R}\\); option (B) inverts it and drops the sign.",
        },
      ],
    },

    // 2 — two-temperature form
    {
      kind: "formula" as const,
      slug: "cetkin-two-temperature-form",
      name: "Two Temperatures: log(k₂/k₁) = (Ea/2.303R)·(T₂ − T₁)/(T₁T₂)",
      intuition:
        "Subtract the Arrhenius equation at \\(T_1\\) from the one at \\(T_2\\): \\(\\log A\\) cancels and what remains links the ratio of rate constants to \\(E_a\\). Because \\(t_{1/2} \\propto \\dfrac1k\\) for first order, the same equation carries a half-life between temperatures.",
      definition:
        "- \\(k\\) doubles from \\(300\\) K to \\(310\\) K: \\(E_a = \\dfrac{0.301 \\times 2.303 \\times 8.314 \\times 300 \\times 310}{10} = 53{,}600\\) J \\(= 53.6\\) kJ mol\\(^{-1}\\).\n" +
        "- \\(k = 0.026\\) s\\(^{-1}\\) at \\(290\\) K and \\(0.58\\) s\\(^{-1}\\) at \\(300\\) K: \\(\\log 22.3 = 1.348\\); \\(E_a = \\dfrac{1.348 \\times 2.303 \\times 8.314 \\times 290 \\times 300}{10} = 224.5\\) kJ mol\\(^{-1}\\).\n" +
        "- Half-life across temperatures: \\(t_{1/2} = 900\\) min at \\(400\\) K with \\(\\dfrac{E_a}{2.303R} = 1305.6\\): \\(\\log\\dfrac{k_{400}}{k_{300}} = 1305.6\\left(\\dfrac{1}{300} - \\dfrac{1}{400}\\right) = 1.088\\), ratio \\(12.25\\); at \\(300\\) K the reaction is slower, so \\(t_{1/2} = 900 \\times 12.25 = 11{,}025\\) min.\n" +
        "- Keep \\(T\\) in kelvin, \\(R = 8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\), and report \\(E_a\\) in kJ when the options are in kJ.",
      formula: {
        label: "Two-temperature Arrhenius",
        latex:
          "\\log_{10}\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
      },
      authoredExample: {
        prompt: "The rate constant of a reaction triples when the temperature rises from \\(300\\) K to \\(320\\) K. Find \\(E_a\\).",
        steps: [
          "\\(\\log 3 = 0.477\\); \\(E_a = \\dfrac{0.477 \\times 2.303 \\times 8.314 \\times 300 \\times 320}{20} = 43{,}840\\) J.",
        ],
        answer: "\\(43.8\\) kJ mol\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A first-order reaction has \\(t_{1/2} = 100\\) s at \\(350\\) K and \\(E_a = 60\\) kJ mol\\(^{-1}\\). Find \\(t_{1/2}\\) at \\(400\\) K.",
        steps: [
          "\\(\\log\\dfrac{k_2}{k_1} = \\dfrac{60000}{2.303 \\times 8.314}\\cdot\\dfrac{50}{350 \\times 400} = 3133 \\times 3.571 \\times 10^{-4} = 1.119\\); ratio \\(13.2\\).",
          "\\(t_{1/2} = \\dfrac{100}{13.2} = 7.6\\) s.",
        ],
        answer: "\\(\\approx 7.6\\) s",
      },
      practiceSet: [
        { prompt: "\\(E_a\\) if \\(k\\) doubles from \\(300\\) to \\(310\\) K?", answer: "\\(53.6\\) kJ mol\\(^{-1}\\)" },
        { prompt: "\\(\\dfrac{1}{300} - \\dfrac{1}{400} = ?\\)", answer: "\\(\\dfrac{1}{1200}\\)" },
        { prompt: "If \\(k\\) is \\(12.25\\times\\) larger at \\(400\\) K, \\(t_{1/2}\\) at \\(300\\) K is?", answer: "\\(12.25\\times\\) longer" },
        { prompt: "\\(\\log 22.3 = ?\\)", answer: "\\(1.348\\)" },
      ],
      pyqExampleId: "72359cc8-facf-492d-96c5-d253476844c2",
      traps: [
        {
          title: "Dividing the half-life by the ratio at the LOWER temperature",
          body:
            "Cooling from \\(400\\) K to \\(300\\) K slows the reaction, so the half-life gets LONGER: \\(900 \\times 12.25\\), not \\(900 / 12.25\\). Decide the direction before touching the ratio.",
        },
      ],
    },

    // 3 — collision theory
    {
      kind: "formula" as const,
      slug: "cetkin-collision-theory",
      name: "Collision Theory: Only Effective Collisions Count",
      intuition:
        "Molecules react only when they collide with energy at least \\(E_a\\) AND in the right orientation. The rate equals the frequency of EFFECTIVE collisions, which is a small fraction of all collisions — so the observed rate of a gas reaction is far below the collision frequency.",
      definition:
        "- Rate \\(= \\) (collision frequency) \\(\\times\\) (fraction with \\(E \\ge E_a\\)) \\(\\times\\) (orientation factor).\n" +
        "- Not every collision reacts; proper orientation IS needed; for gases the number of collisions is far MORE than the observed rate, not less.\n" +
        "- The activation energy is the minimum extra energy the colliding molecules need to reach the activated complex; a catalyst provides a path with a lower \\(E_a\\).\n" +
        "- Raising temperature raises both the collision frequency (slightly) and the fraction of energetic collisions (greatly) — the second is why \\(k\\) roughly doubles for a \\(10\\) K rise.",
      formula: {
        label: "Effective collisions",
        latex:
          "\\text{rate} = Z \\cdot e^{-E_a/RT} \\cdot P \\qquad (Z \\text{ collision frequency, } P \\text{ orientation factor})",
      },
      authoredExample: {
        prompt: "Two statements: (i) every collision between reactant molecules leads to product; (ii) the rate of a reaction equals the rate of effective collisions. Which is correct?",
        steps: [
          "Only collisions with enough energy and the right orientation react, so (i) is false and (ii) is the statement of the theory.",
        ],
        answer: "(ii) only",
      },
      selfCheckExample: {
        prompt: "Why does a catalyst speed up a reaction without being consumed, in collision-theory terms?",
        steps: [
          "It offers a route with lower \\(E_a\\), so a larger fraction of the same collisions is effective.",
        ],
        answer: "It lowers the activation energy, raising the fraction of effective collisions.",
      },
      practiceSet: [
        { prompt: "Do all collisions lead to reaction?", answer: "No" },
        { prompt: "Is orientation needed?", answer: "Yes" },
        { prompt: "Gas collisions vs observed rate: which is larger?", answer: "Collisions, by far" },
        { prompt: "What does a catalyst change: \\(E_a\\) or \\(\\Delta H\\)?", answer: "\\(E_a\\)" },
      ],
      pyqExampleId: "44a61e23-5706-45e7-9cc5-9201ba17a54c",
      traps: [
        {
          title: "'Collisions are fewer than the observed rate'",
          body:
            "It is the other way round: collisions vastly outnumber reactions, which is the whole point of the effective-collision idea. Option (C) states the inversion.",
        },
      ],
    },
  ],
  related: [
    {
      label: "First-Order Kinetics — the half-life the two-temperature form carries",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-first-order",
    },
    {
      label: "Reaction Mechanism — catalysts and intermediates",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-mechanism",
    },
  ],
};
