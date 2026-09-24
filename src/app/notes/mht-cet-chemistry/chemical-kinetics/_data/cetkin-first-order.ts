import type { SubtopicNote } from "@/app/notes/_types";

export const FIRST_ORDER_NOTE: SubtopicNote = {
  subtopicName: "First-Order Kinetics, Rate Constant and Half-Life",
  title: "First-Order Kinetics, Rate Constant and Half-Life",
  oneLineDefinition:
    "k = (2.303/t) log([A]₀/[A]ₜ) and t½ = 0.693/k: a first-order half-life is independent of the starting concentration, k has the unit time⁻¹, and 90%, 99% and 99.9% completion take 1, 2 and 3 times 2.303/k.",
  whyItMatters:
    "44 PYQs, none HARD — the chapter's largest page and the one the paper always draws from. Half are the integrated law solved for k from a percent decomposed (20%, 60%, 80%, 90%) or for the time to a given fraction; a third are the half-life conversion k = 0.693/t½ in either direction, often with an hours-to-seconds step; the rest count half-lives (100 g to 25 g is two) or read k off a plot's slope. " +
    "Learn log 2 = 0.301, log 4 = 0.602 and log 5 = 0.699 and the page is arithmetic.",
  concepts: [
    // 1 — k and half-life
    {
      kind: "formula" as const,
      slug: "cetkin-first-order-rate-constant-and-half-life",
      name: "k = 0.693/t½ and k = rate/[A]: the Half-Life Is Fixed, the Unit Is time⁻¹",
      intuition:
        "For \\(r = k[A]\\) each half-life removes half of whatever is left, so it takes the same time from any starting amount: \\(t_{1/2} = \\dfrac{\\ln 2}{k} = \\dfrac{0.693}{k}\\). Because the rate is \\(k[A]\\), dividing a measured rate by the concentration also gives \\(k\\).",
      definition:
        "- \\(k = \\dfrac{0.693}{t_{1/2}}\\): \\(t_{1/2} = 2.5\\) h \\(= 9000\\) s gives \\(7.7 \\times 10^{-5}\\) s\\(^{-1}\\); \\(40\\) min gives \\(1.733 \\times 10^{-2}\\) min\\(^{-1}\\). \\(t_{1/2} = \\dfrac{0.693}{k}\\): \\(k = 4.7672\\) min\\(^{-1}\\) gives \\(0.1454\\) min; \\(4.2 \\times 10^{-2}\\) day\\(^{-1}\\) gives \\(16.5\\) day; \\(2.772 \\times 10^{-3}\\) s\\(^{-1}\\) gives \\(250\\) s; \\(1.386 \\times 10^{-3}\\) s\\(^{-1}\\) gives \\(500\\) s.\n" +
        "- \\(k = \\dfrac{\\text{rate}}{[A]}\\): \\(\\dfrac{1.5 \\times 10^{-2}}{0.5} = 0.03\\) min\\(^{-1}\\) so \\(t_{1/2} = 23.1\\) min; \\(\\dfrac{5.4 \\times 10^{-6}}{0.3} = 1.8 \\times 10^{-5}\\) s\\(^{-1}\\); \\(\\dfrac{0.00352}{0.01} = 0.352\\) min\\(^{-1}\\) so \\(t_{1/2} = 1.969\\) min. Reverse: \\([\\text{N}_2\\text{O}_5] = \\dfrac{1.02 \\times 10^{-4}}{3.4 \\times 10^{-5}} = 3.0\\) mol L\\(^{-1}\\). First order in A and zero in B: \\(k = \\dfrac{6 \\times 10^{-4}}{0.3} = 2 \\times 10^{-3}\\) s\\(^{-1}\\).\n" +
        "- Doubling \\([A]_0\\) leaves \\(t_{1/2}\\) unchanged. Two first-order reactions with half-lives \\(75\\) min and \\(150\\) min have rate constants in the ratio \\(2 : 1\\).\n" +
        "- A \\(k\\) in s\\(^{-1}\\) or hour\\(^{-1}\\) is first order. Plots: rate against \\([A]\\) has slope \\(k\\); \\(\\log\\dfrac{[A]_0}{[A]_t}\\) against \\(t\\) has slope \\(+\\dfrac{k}{2.303}\\); \\(\\log[A]_t\\) against \\(t\\) has slope \\(-\\dfrac{k}{2.303}\\) (slope \\(-2.5 \\times 10^{-3}\\) gives \\(k = 5.757 \\times 10^{-3}\\) s\\(^{-1}\\)).",
      formula: {
        label: "First-order constant",
        latex:
          "t_{1/2} = \\frac{0.693}{k},\\qquad k = \\frac{r}{[A]}\\ \\ (\\text{s}^{-1}),\\qquad \\text{slope of } \\log[A]_t \\text{ vs } t = -\\frac{k}{2.303}",
      },
      authoredExample: {
        prompt: "A first-order reaction has a half-life of \\(20\\) minutes. Find \\(k\\) in s\\(^{-1}\\), and the rate when \\([A] = 0.5\\) mol dm\\(^{-3}\\).",
        steps: [
          "\\(k = \\dfrac{0.693}{1200} = 5.78 \\times 10^{-4}\\) s\\(^{-1}\\).",
          "Rate \\(= k[A] = 2.89 \\times 10^{-4}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\).",
        ],
        answer: "\\(5.78 \\times 10^{-4}\\) s\\(^{-1}\\); \\(2.89 \\times 10^{-4}\\) mol dm\\(^{-3}\\) s\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "The plot of \\(\\log[A]_t\\) against \\(t\\) (minutes) for a first-order reaction has slope \\(-0.03\\). Find \\(k\\) and \\(t_{1/2}\\).",
        steps: [
          "\\(k = 2.303 \\times 0.03 = 0.0691\\) min\\(^{-1}\\); \\(t_{1/2} = \\dfrac{0.693}{0.0691} = 10\\) min.",
        ],
        answer: "\\(0.0691\\) min\\(^{-1}\\); \\(10\\) min",
      },
      practiceSet: [
        { prompt: "\\(k\\) for \\(t_{1/2} = 40\\) min?", answer: "\\(1.733 \\times 10^{-2}\\) min\\(^{-1}\\)" },
        { prompt: "\\(t_{1/2}\\) for \\(k = 2.772 \\times 10^{-3}\\) s\\(^{-1}\\)?", answer: "\\(250\\) s" },
        { prompt: "\\(k\\) if rate \\(= 1.5 \\times 10^{-2}\\) at \\([A] = 0.5\\)?", answer: "\\(0.03\\) min\\(^{-1}\\)" },
        { prompt: "Slope of \\(\\log\\dfrac{[A]_0}{[A]_t}\\) vs \\(t\\)?", answer: "\\(+\\dfrac{k}{2.303}\\)" },
      ],
      pyqExampleId: "e19015ef-b911-41b1-b821-443bf8873950",
      traps: [
        {
          title: "Hours left as hours",
          body:
            "A half-life of \\(2.5\\) h with the answer wanted in s\\(^{-1}\\) needs \\(9000\\) s in the denominator. \\(\\dfrac{0.693}{2.5} = 0.277\\) h\\(^{-1}\\) is right in the wrong unit and matches nothing on the list.",
        },
      ],
    },

    // 2 — integrated law
    {
      kind: "formula" as const,
      slug: "cetkin-first-order-integrated-law",
      name: "k = (2.303/t) log([A]₀/[A]ₜ): Percent Decomposed, and the Time to 90%, 99%, 99.9%",
      intuition:
        "Integrating \\(r = k[A]\\) gives \\(\\ln\\dfrac{[A]_0}{[A]_t} = kt\\), written with base-10 logs as \\(k = \\dfrac{2.303}{t}\\log\\dfrac{[A]_0}{[A]_t}\\). Put \\([A]_0 = 100\\) and \\([A]_t = \\) percent REMAINING; a stem that says 60% decomposed means \\([A]_t = 40\\).",
      definition:
        "- \\(k\\) from percent: 20% decomposed in \\(40\\) min: \\(\\dfrac{2.303}{40}\\log\\dfrac{100}{80} = 5.6 \\times 10^{-3}\\) min\\(^{-1}\\); in \\(23.03\\) min: \\(0.1 \\times 0.0969 = 9.69 \\times 10^{-3}\\). 60% in \\(45\\) min: \\(\\dfrac{2.303 \\times 0.398}{45} = 0.0204\\). 80% in \\(15\\) min: \\(\\dfrac{2.303 \\times 0.699}{15} = 0.107 \\approx 0.11\\); in \\(60\\) min: \\(2.68 \\times 10^{-2}\\). 90% in \\(30\\) min: \\(\\dfrac{2.303}{30} = 7.67 \\times 10^{-2}\\).\n" +
        "- \\(k\\) from concentrations: \\(0.08 \\to 0.02\\) in \\(23.03\\) min: \\(0.1 \\times \\log 4 = 0.0602\\); \\(20 \\to 8\\) mM in \\(40\\) min: \\(\\dfrac{2.303 \\times 0.398}{40} = 0.023\\).\n" +
        "- Time: \\(t = \\dfrac{2.303}{k}\\log\\dfrac{[A]_0}{[A]_t}\\). To 20% left with \\(k = 0.02303\\) h\\(^{-1}\\): \\(\\dfrac{2.303 \\times 0.699}{0.02303} = 70\\) h. \\(5\\) g to \\(3\\) g with \\(k = 1.15 \\times 10^{-3}\\): \\(2003 \\times 0.222 = 444\\) s. Percent remaining after \\(60\\) min with \\(k = 0.02303\\): \\(\\log\\dfrac{100}{x} = 0.6\\), \\(x = 25\\%\\).\n" +
        "- The three landmarks: 90% completion takes \\(\\dfrac{2.303}{k}\\) (\\(\\log 10 = 1\\)); 99% takes \\(2 \\times\\); 99.9% takes \\(3 \\times\\). So \\(t_{99.9\\%} = 3\\,t_{90\\%}\\); with \\(k = 0.576\\) min\\(^{-1}\\), 99.9% takes \\(\\dfrac{2.303 \\times 3}{0.576} = 12\\) min; with \\(k = 23.03\\) min\\(^{-1}\\), 99% takes \\(0.2\\) min.\n" +
        "- Via the half-life: \\(t_{1/2} = 10\\) min → \\(k = 0.0693\\), 90% takes \\(33\\) min; \\(t_{1/2} = 3\\) min → \\(9.97\\) min; \\(t_{1/2} = 20\\) min → \\(66.46\\) min to one-tenth. \\(0.8 \\to 0.2\\) in \\(12\\) h is two half-lives, so \\(t_{1/2} = 6\\) h. \\([A]_0/[A]_t = 5\\) means \\(0.08 \\to 0.016\\).",
      formula: {
        label: "Integrated first-order law",
        latex:
          "k = \\frac{2.303}{t}\\log_{10}\\frac{[A]_0}{[A]_t} \\qquad t_{90\\%} = \\frac{2.303}{k},\\ t_{99\\%} = \\frac{4.606}{k},\\ t_{99.9\\%} = \\frac{6.909}{k}",
      },
      authoredExample: {
        prompt: "A first-order reaction is \\(75\\%\\) complete in \\(40\\) minutes. Find \\(k\\) and the time for \\(87.5\\%\\) completion.",
        steps: [
          "\\(75\\%\\) complete is two half-lives, so \\(t_{1/2} = 20\\) min, \\(k = \\dfrac{0.693}{20} = 0.0347\\) min\\(^{-1}\\).",
          "\\(87.5\\%\\) complete is three half-lives: \\(60\\) min.",
        ],
        answer: "\\(k = 0.0347\\) min\\(^{-1}\\); \\(60\\) min",
      },
      selfCheckExample: {
        prompt: "For a first-order reaction with \\(k = 4.606 \\times 10^{-2}\\) s\\(^{-1}\\), find the time for \\(99\\%\\) completion.",
        steps: [
          "\\(t = \\dfrac{2.303}{k}\\log 100 = \\dfrac{2.303 \\times 2}{4.606 \\times 10^{-2}} = 100\\) s.",
        ],
        answer: "\\(100\\) s",
      },
      practiceSet: [
        { prompt: "\\(k\\) if 90% decomposes in \\(30\\) min?", answer: "\\(7.67 \\times 10^{-2}\\) min\\(^{-1}\\)" },
        { prompt: "\\([A]_t\\) to use for '60% decomposed'?", answer: "\\(40\\)" },
        { prompt: "\\(t_{99.9\\%}\\) in terms of \\(t_{90\\%}\\)?", answer: "\\(3\\,t_{90\\%}\\)" },
        { prompt: "\\(\\log 4 = ?\\)", answer: "\\(0.602\\)" },
      ],
      pyqExampleId: "f14f20ae-1520-4574-8afc-6885ea58fbfd",
      traps: [
        {
          title: "Using the percent decomposed as [A]ₜ",
          body:
            "60% decomposed means \\(\\log\\dfrac{100}{40}\\), not \\(\\log\\dfrac{100}{60}\\). The second gives \\(0.0102\\), which is option (A) — exactly half the answer.",
        },
      ],
    },

    // 3 — counting half-lives
    {
      kind: "formula" as const,
      slug: "cetkin-half-life-counting",
      name: "Counting Half-Lives: Fraction Left After n Half-Lives Is (1/2)^n",
      intuition:
        "When the ratio \\([A]_0/[A]_t\\) is a power of \\(2\\), skip the logarithm: \\(100 \\to 25\\) g is two half-lives, \\(0.1 \\to 0.025\\) is two, and after three half-lives one-eighth remains — from ANY starting amount, because the half-life is fixed.",
      definition:
        "- Fraction remaining after \\(n\\) half-lives \\(= \\left(\\tfrac12\\right)^n\\): after \\(3\\) h with \\(t_{1/2} = 1\\) h, \\(\\tfrac18\\).\n" +
        "- \\(0.8 \\to 0.4\\) in \\(15\\) min sets \\(t_{1/2} = 15\\); \\(0.1 \\to 0.025\\) is two half-lives, \\(30\\) min. \\(100\\) g \\(\\to 25\\) g with \\(t_{1/2} = 5760\\) years takes \\(2 \\times 5760 \\approx 11520\\) years (the exact log route gives \\(11526\\)).\n" +
        "- The ratio, not the absolute amounts, decides the count: \\(0.8 \\to 0.2\\) and \\(0.1 \\to 0.025\\) are both two half-lives.",
      formula: {
        label: "Half-life counting",
        latex:
          "\\frac{[A]_t}{[A]_0} = \\left(\\frac12\\right)^{n},\\qquad t = n\\,t_{1/2}",
      },
      authoredExample: {
        prompt: "A first-order reaction has \\(t_{1/2} = 12\\) min. How long does \\(0.64\\) mol dm\\(^{-3}\\) take to fall to \\(0.04\\)?",
        steps: [
          "\\(\\dfrac{0.64}{0.04} = 16 = 2^4\\): four half-lives, \\(48\\) min.",
        ],
        answer: "\\(48\\) min",
      },
      selfCheckExample: {
        prompt: "What fraction of a first-order reactant remains after \\(5\\) half-lives, as a percentage?",
        steps: [
          "\\(\\left(\\tfrac12\\right)^5 = \\dfrac{1}{32} = 3.125\\%\\).",
        ],
        answer: "\\(3.125\\%\\)",
      },
      practiceSet: [
        { prompt: "Fraction left after \\(3\\) half-lives?", answer: "\\(\\dfrac18\\)" },
        { prompt: "Half-lives from \\(100\\) g to \\(25\\) g?", answer: "\\(2\\)" },
        { prompt: "Time for \\(0.1 \\to 0.025\\) if \\(t_{1/2} = 15\\) min?", answer: "\\(30\\) min" },
        { prompt: "Percent decomposed after \\(2\\) half-lives?", answer: "\\(75\\%\\)" },
      ],
      pyqExampleId: "c96a3cb6-de4f-41a8-b199-0667773cd06d",
      traps: [
        {
          title: "Scaling the time with the concentration",
          body:
            "\\(0.1 \\to 0.025\\) takes the same \\(30\\) min as \\(0.8 \\to 0.2\\) would; a first-order half-life does not shrink for smaller amounts. \\(7.5\\) min is the option for the student who scaled.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Zero-Order Kinetics — the half-life that DOES depend on [A]₀",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-zero-order",
    },
    {
      label: "Arrhenius — how k, and so the half-life, changes with temperature",
      href: "/notes/mht-cet-chemistry/chemical-kinetics/cetkin-arrhenius",
    },
  ],
};
