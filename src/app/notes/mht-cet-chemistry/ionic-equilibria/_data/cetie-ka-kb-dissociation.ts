import type { SubtopicNote } from "@/app/notes/_types";

export const KA_KB_NOTE: SubtopicNote = {
  subtopicName: "Ionic Equilibrium, Ka, Kb and Degree of Dissociation",
  title: "Ionic Equilibrium: Ka, Kb and Degree of Dissociation",
  oneLineDefinition:
    "A weak acid or base only partly splits into ions; the fraction that splits is the degree of dissociation, and Ostwald's dilution law ties it to the dissociation constant so you can find Ka, Kb, the ion concentration or the solution's concentration from one another.",
  whyItMatters:
    "This is the arithmetic heart of Ionic Equilibria in MHT-CET Chemistry and one of its most reliable scoring blocks — almost every PYQ is a one-line plug-in of the same relation Ka = c times alpha squared, asked in four disguises: find Ka or Kb, find percent dissociation, find the H+ or OH- concentration, or find the solution's concentration. " +
    "Learn the single formula and its rearrangements, keep percent versus fraction straight, and you can attempt every question here on sight.",
  concepts: [
    // C1 — degree of dissociation and percent dissociation
    {
      kind: "formula" as const,
      slug: "cetie-kakb-degree-dissociation",
      name: "Degree of dissociation and percent dissociation",
      intuition:
        "A weak acid or base is lazy: only a small slice of the molecules break into ions, the rest stay whole. The degree of dissociation, written alpha, is exactly that slice — the fraction of molecules that have split. " +
        "Multiply alpha by 100 and you get percent dissociation; that single conversion is what most of these questions hinge on.",
      definition:
        "Degree of dissociation and percent dissociation:\n" +
        "- **Degree of dissociation** \\(\\alpha\\) = fraction of the dissolved acid/base that has actually ionised, \\(\\alpha = \\dfrac{\\text{moles dissociated}}{\\text{moles taken}}\\). It lies between 0 and 1.\n" +
        "- **Percent dissociation** \\(= \\alpha \\times 100\\). So \\(2\\%\\) means \\(\\alpha = 0.02 = 2\\times 10^{-2}\\), and \\(0.05\\%\\) means \\(\\alpha = 5\\times 10^{-4}\\).\n" +
        "- For a weak acid \\(\\alpha\\) can also be found from the constant and concentration: \\(\\alpha = \\sqrt{\\dfrac{K_a}{c}}\\) (from Ostwald's law, next concept).\n" +
        "- \\(\\alpha\\) is a **pure number** (no units); \\([\\text{H}^+]\\), \\(K_a\\) and \\(c\\) all carry units.",
      formula: {
        label: "Percent dissociation and alpha from Ka",
        latex: "\\text{\\% dissociation} = \\alpha \\times 100 \\qquad \\alpha = \\sqrt{\\dfrac{K_a}{c}}",
        symbols: [
          { symbol: "\\alpha", meaning: "degree of dissociation (fraction ionised, 0 to 1)" },
          { symbol: "K_a", meaning: "acid dissociation constant" },
          { symbol: "c", meaning: "initial molar concentration of the acid" },
        ],
      },
      pyqExampleId: "4bc09f9f-f9c0-4df0-b3b8-1411173d99c2", // alpha 4.2e-2 -> 4.2 %
      authoredExample: {
        prompt:
          "A weak acid HX has dissociation constant \\(K_a = 4 \\times 10^{-5}\\). Find its percent dissociation in a 0.01 M solution.",
        steps: [
          "Find \\(\\alpha\\) from Ostwald's law: \\(\\alpha = \\sqrt{\\dfrac{K_a}{c}} = \\sqrt{\\dfrac{4\\times 10^{-5}}{10^{-2}}}\\).",
          "\\(= \\sqrt{4\\times 10^{-3}} = \\sqrt{40\\times 10^{-4}} = 6.32\\times 10^{-2}\\).",
          "Percent dissociation \\(= \\alpha \\times 100 = 6.32\\%\\).",
        ],
        answer: "\\(\\alpha \\approx 6.3\\times 10^{-2}\\), i.e. about \\(6.3\\%\\) dissociation.",
      },
      selfCheckExample: {
        prompt:
          "A weak monobasic acid has \\(K_a = 1.0 \\times 10^{-5}\\). What is its percent dissociation in 0.1 M solution?",
        steps: [
          "\\(\\alpha = \\sqrt{\\dfrac{K_a}{c}} = \\sqrt{\\dfrac{10^{-5}}{0.1}} = \\sqrt{10^{-4}}\\).",
          "\\(= 10^{-2} = 0.01\\).",
          "Percent \\(= 0.01 \\times 100 = 1.0\\%\\).",
        ],
        answer: "\\(1.0\\%\\).",
      },
      practiceSet: [
        { prompt: "Convert a degree of dissociation \\(\\alpha = 0.015\\) into percent dissociation.", answer: "\\(1.5\\%\\)", method: "0.015 x 100" },
        { prompt: "Percent dissociation is 0.05%. Write \\(\\alpha\\) in scientific notation.", answer: "\\(5\\times 10^{-4}\\)", method: "0.05/100" },
        { prompt: "A 0.04 M acid has \\(K_a = 3.2\\times 10^{-4}\\). Find \\(\\alpha\\).", answer: "\\(\\approx 0.089\\)", method: "sqrt(3.2e-4 / 0.04) = sqrt(8e-3)" },
        { prompt: "Does \\(\\alpha\\) carry any unit?", answer: "No — it is a pure fraction between 0 and 1" },
      ],
      traps: [
        {
          title: "Percent is 100 times the fraction",
          body:
            "\\(\\alpha\\) (the fraction) and percent dissociation differ by a factor of 100. If a question quotes \\(1.2\\%\\), use \\(\\alpha = 1.2\\times 10^{-2}\\) in the formula, not \\(1.2\\). Reading \\(0.05\\%\\) as \\(\\alpha = 0.05\\) is the single commonest slip here.",
        },
        {
          title: "alpha from Ka needs the DIVISION form",
          body:
            "To get \\(\\alpha\\) from \\(K_a\\) use \\(\\alpha = \\sqrt{K_a/c}\\) — the constant is divided by concentration under the root. Writing \\(\\alpha = \\sqrt{K_a \\cdot c}\\) confuses it with the \\([\\text{H}^+]\\) formula and gives a wildly wrong answer.",
        },
      ],
    },

    // C2 — Ostwald's dilution law: Ka = c*alpha^2
    {
      kind: "formula" as const,
      slug: "cetie-kakb-ostwald-law",
      name: "Ostwald's dilution law: Ka and Kb from alpha and concentration",
      intuition:
        "Ostwald's dilution law is the workhorse formula of this whole subtopic. Write the equilibrium for a weak acid, plug the equilibrium amounts into the Ka expression, and everything collapses to Ka = c times alpha squared once alpha is small. " +
        "The identical relation with Kb works for a weak base — one formula covers both.",
      definition:
        "Ostwald's dilution law (weak monobasic acid \\(\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-\\)):\n" +
        "- Exact form: \\(K_a = \\dfrac{c\\alpha^2}{1-\\alpha}\\).\n" +
        "- When the acid is weak, \\(\\alpha\\) is tiny so \\(1-\\alpha \\approx 1\\), giving the working form \\(K_a \\approx c\\alpha^2\\).\n" +
        "- Rearranged: \\(\\alpha = \\sqrt{\\dfrac{K_a}{c}}\\) and \\(c = \\dfrac{K_a}{\\alpha^2}\\).\n" +
        "- For a **weak base** \\(\\text{BOH} \\rightleftharpoons \\text{B}^+ + \\text{OH}^-\\), the identical law holds with \\(K_b\\): \\(K_b \\approx c\\alpha^2\\).\n" +
        "- \\(K_a\\) and \\(K_b\\) are what stay **constant** as you dilute; \\(\\alpha\\) is what changes.",
      formula: {
        label: "Ostwald's dilution law",
        latex: "K_a = \\dfrac{c\\alpha^2}{1-\\alpha} \\approx c\\alpha^2 \\qquad (K_b \\approx c\\alpha^2 \\text{ for a base})",
        symbols: [
          { symbol: "K_a, K_b", meaning: "acid / base dissociation constant" },
          { symbol: "c", meaning: "initial molar concentration" },
          { symbol: "\\alpha", meaning: "degree of dissociation" },
        ],
      },
      pyqExampleId: "0fe08e53-9342-45d8-b6e7-24640bc519eb", // 2% base in 0.1 M -> Kb = 4e-5
      authoredExample: {
        prompt:
          "A weak monobasic acid is \\(3\\%\\) dissociated in its 0.05 M solution. Calculate its dissociation constant.",
        steps: [
          "Convert percent to fraction: \\(\\alpha = 3\\% = 3\\times 10^{-2}\\).",
          "Use the working form \\(K_a = c\\alpha^2\\) (\\(\\alpha\\) is small).",
          "\\(K_a = 0.05 \\times (3\\times 10^{-2})^2 = 5\\times 10^{-2} \\times 9\\times 10^{-4}\\).",
          "\\(= 45\\times 10^{-6} = 4.5\\times 10^{-5}\\).",
        ],
        answer: "\\(K_a = 4.5\\times 10^{-5}\\).",
      },
      selfCheckExample: {
        prompt:
          "A weak monoacidic base dissociates to \\(2\\%\\) in 0.1 M solution. Calculate \\(K_b\\).",
        steps: [
          "\\(\\alpha = 2\\% = 2\\times 10^{-2}\\), \\(c = 0.1\\ \\text{M} = 10^{-1}\\).",
          "\\(K_b = c\\alpha^2 = 10^{-1} \\times (2\\times 10^{-2})^2\\).",
          "\\(= 10^{-1} \\times 4\\times 10^{-4} = 4\\times 10^{-5}\\).",
        ],
        answer: "\\(K_b = 4\\times 10^{-5}\\).",
      },
      practiceSet: [
        { prompt: "Acetic acid is \\(1.2\\%\\) dissociated in 0.01 M solution. Find \\(K_a\\).", answer: "\\(1.44\\times 10^{-6}\\)", method: "0.01 x (1.2e-2)^2" },
        { prompt: "A weak base is \\(5\\%\\) dissociated in 0.01 M solution. Find \\(K_b\\).", answer: "\\(2.5\\times 10^{-5}\\)", method: "0.01 x (5e-2)^2" },
        { prompt: "Rearrange Ostwald's law (small \\(\\alpha\\)) to make c the subject.", answer: "\\(c = \\dfrac{K_a}{\\alpha^2}\\)" },
        { prompt: "\\(K_a = 1.8\\times 10^{-5}\\) and \\(\\alpha = 0.03\\). Find the concentration.", answer: "\\(0.02\\ \\text{M}\\)", method: "c = Ka/alpha^2 = 1.8e-5 / 9e-4" },
      ],
      traps: [
        {
          title: "Square the alpha, not just alpha",
          body:
            "It is \\(K_a = c\\alpha^2\\), so the fraction is SQUARED. For \\(\\alpha = 2\\times 10^{-2}\\), \\(\\alpha^2 = 4\\times 10^{-4}\\) — forgetting the square leaves you a factor of \\(\\alpha\\) (often \\(10^{-2}\\) or more) too big.",
        },
        {
          title: "Use the small-alpha approximation only when it is small",
          body:
            "\\(K_a \\approx c\\alpha^2\\) drops the \\((1-\\alpha)\\) denominator, which is safe only when \\(\\alpha \\ll 1\\) (a few percent). If a problem gives a large \\(\\alpha\\) or explicitly wants the exact value, use \\(K_a = \\dfrac{c\\alpha^2}{1-\\alpha}\\) instead.",
        },
      ],
    },

    // C3 — ion concentration [H+] = c*alpha = sqrt(Ka*c)
    {
      kind: "formula" as const,
      slug: "cetie-kakb-ion-concentration",
      name: "Ion concentration of a weak acid or base",
      intuition:
        "Once you know how big a fraction ionised (alpha) and how much acid you started with (c), the amount of H+ actually floating around is just their product: c times alpha. " +
        "If instead you are handed Ka and c, the same H+ concentration comes straight out as the square root of their product.",
      definition:
        "Ion concentration of a weak acid/base:\n" +
        "- Directly from \\(\\alpha\\): \\([\\text{H}^+] = c\\alpha\\) (weak acid) and \\([\\text{OH}^-] = c\\alpha\\) (weak base).\n" +
        "- From the constant and concentration: substitute \\(\\alpha = \\sqrt{K_a/c}\\) to get \\([\\text{H}^+] = c\\sqrt{K_a/c} = \\sqrt{K_a\\,c}\\).\n" +
        "- Likewise for a base: \\([\\text{OH}^-] = \\sqrt{K_b\\,c}\\).\n" +
        "- Note the two square-root forms differ: \\(\\alpha = \\sqrt{K_a/c}\\) (**divide**) but \\([\\text{H}^+] = \\sqrt{K_a\\,c}\\) (**multiply**).",
      formula: {
        label: "Hydrogen / hydroxide ion concentration",
        latex: "[\\text{H}^+] = c\\alpha = \\sqrt{K_a\\,c} \\qquad [\\text{OH}^-] = c\\alpha = \\sqrt{K_b\\,c}",
        symbols: [
          { symbol: "[\\text{H}^+]", meaning: "hydrogen (hydronium) ion concentration" },
          { symbol: "[\\text{OH}^-]", meaning: "hydroxide ion concentration" },
          { symbol: "c", meaning: "initial concentration of acid / base" },
          { symbol: "\\alpha", meaning: "degree of dissociation" },
          { symbol: "K_a, K_b", meaning: "dissociation constant" },
        ],
      },
      pyqExampleId: "748d5b71-dd10-4928-a671-65a87307d157", // [H3O+] = alpha*c = 1.34e-4
      authoredExample: {
        prompt:
          "A monobasic acid is \\(0.04\\%\\) dissociated in a 0.05 M solution. Find \\([\\text{H}_3\\text{O}^+]\\).",
        steps: [
          "Convert percent to fraction: \\(\\alpha = 0.04\\% = 4\\times 10^{-4}\\).",
          "Use \\([\\text{H}_3\\text{O}^+] = c\\alpha\\).",
          "\\(= 0.05 \\times 4\\times 10^{-4} = 5\\times 10^{-2} \\times 4\\times 10^{-4}\\).",
          "\\(= 2.0\\times 10^{-5}\\ \\text{mol L}^{-1}\\).",
        ],
        answer: "\\([\\text{H}_3\\text{O}^+] = 2.0\\times 10^{-5}\\ \\text{mol L}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A monoacidic base is \\(3\\%\\) ionised in its 0.04 M solution. Find \\([\\text{OH}^-]\\).",
        steps: [
          "\\(\\alpha = 3\\% = 0.03\\), \\(c = 0.04\\ \\text{M}\\).",
          "\\([\\text{OH}^-] = c\\alpha = 0.04 \\times 0.03\\).",
          "\\(= 1.2\\times 10^{-3}\\ \\text{mol L}^{-1}\\).",
        ],
        answer: "\\([\\text{OH}^-] = 1.2\\times 10^{-3}\\ \\text{mol L}^{-1}\\).",
      },
      practiceSet: [
        { prompt: "0.001 M acetic acid has \\(\\alpha = 0.134\\). Find \\([\\text{H}_3\\text{O}^+]\\).", answer: "\\(1.34\\times 10^{-4}\\ \\text{mol L}^{-1}\\)", method: "c*alpha = 0.001 x 0.134" },
        { prompt: "Give the formula for \\([\\text{OH}^-]\\) of a weak base in terms of \\(K_b\\) and c.", answer: "\\(\\sqrt{K_b\\,c}\\)" },
        { prompt: "Which uses multiply and which uses divide: \\([\\text{H}^+]\\) vs \\(\\alpha\\) from \\(K_a\\)?", answer: "[H+] = sqrt(Ka*c) multiplies; alpha = sqrt(Ka/c) divides" },
        { prompt: "A weak acid: \\(K_a = 10^{-6}\\), \\(c = 0.01\\ \\text{M}\\). Find \\([\\text{H}^+]\\).", answer: "\\(10^{-4}\\ \\text{mol L}^{-1}\\)", method: "sqrt(1e-6 x 1e-2) = sqrt(1e-8)" },
      ],
      traps: [
        {
          title: "c times alpha, not c times alpha squared",
          body:
            "The ION concentration is \\([\\text{H}^+] = c\\alpha\\) (first power of \\(\\alpha\\)). It is the CONSTANT \\(K_a = c\\alpha^2\\) that squares \\(\\alpha\\). Mixing the two — using \\(c\\alpha^2\\) for the H+ concentration — is a frequent trap.",
        },
        {
          title: "Multiply under the root for [H+]",
          body:
            "\\([\\text{H}^+] = \\sqrt{K_a\\,c}\\) multiplies \\(K_a\\) by \\(c\\), whereas \\(\\alpha = \\sqrt{K_a/c}\\) divides. Same square root, opposite operation — check which quantity the question asks for before you decide.",
        },
      ],
    },

    // C4 — Ka*Kb = Kw, relative strength, dilution effect
    {
      kind: "formula" as const,
      slug: "cetie-kakb-kw-relation",
      name: "Ka x Kb = Kw, relative strength and the effect of dilution",
      intuition:
        "A weak acid and its conjugate base are a team: the stronger one partner is at giving up its proton, the weaker the other is at taking it back — and their two constants always multiply to the same fixed number, Kw. " +
        "Dilution, meanwhile, always pushes a weak electrolyte to ionise MORE, so alpha rises as you add water even though Ka stays put.",
      definition:
        "Conjugate pair, relative strength and dilution:\n" +
        "- For a conjugate acid-base pair: \\(K_a \\times K_b = K_w = 1.0\\times 10^{-14}\\) at 298 K. Note it is a **product**, not a sum.\n" +
        "- A larger \\(K_a\\) means a stronger acid. **Relative strength** of two acids of the same concentration \\(= \\dfrac{\\alpha_1}{\\alpha_2} = \\sqrt{\\dfrac{K_{a1}}{K_{a2}}}\\).\n" +
        "- **Effect of dilution:** from \\(\\alpha = \\sqrt{K_a/c}\\), lowering \\(c\\) (adding water) **increases** \\(\\alpha\\). Diluting a weak electrolyte raises its degree of dissociation.\n" +
        "- \\(K_a\\) itself does **not** change with dilution or concentration — only with temperature. Only \\(\\alpha\\) responds to dilution.",
      formula: {
        label: "Conjugate-pair relation and relative strength",
        latex: "K_a \\times K_b = K_w \\qquad \\dfrac{\\alpha_1}{\\alpha_2} = \\sqrt{\\dfrac{K_{a1}}{K_{a2}}}",
        symbols: [
          { symbol: "K_a", meaning: "acid dissociation constant of an acid" },
          { symbol: "K_b", meaning: "base dissociation constant of its conjugate base" },
          { symbol: "K_w", meaning: "ionic product of water, \\(1.0\\times 10^{-14}\\) at 298 K" },
          { symbol: "K_{a1}, K_{a2}", meaning: "constants of the two acids being compared" },
        ],
      },
      pyqExampleId: "9635e86a-de77-4ebf-a26d-fa7c326d51ca", // c from Ka and alpha -> 0.02 M
      authoredExample: {
        prompt:
          "The dissociation constant of a weak acid is \\(K_a = 2.5\\times 10^{-5}\\). Find \\(K_b\\) of its conjugate base at 298 K.",
        steps: [
          "For a conjugate pair, \\(K_a \\times K_b = K_w = 1.0\\times 10^{-14}\\).",
          "\\(K_b = \\dfrac{K_w}{K_a} = \\dfrac{1.0\\times 10^{-14}}{2.5\\times 10^{-5}}\\).",
          "\\(= 0.4\\times 10^{-9} = 4.0\\times 10^{-10}\\).",
        ],
        answer: "\\(K_b = 4.0\\times 10^{-10}\\).",
      },
      selfCheckExample: {
        prompt:
          "Two weak acids have \\(K_{a1} = 4\\times 10^{-6}\\) and \\(K_{a2} = 1\\times 10^{-6}\\) at equal concentration. What is their relative strength?",
        steps: [
          "Relative strength \\(= \\sqrt{\\dfrac{K_{a1}}{K_{a2}}} = \\sqrt{\\dfrac{4\\times 10^{-6}}{1\\times 10^{-6}}}\\).",
          "\\(= \\sqrt{4} = 2\\).",
        ],
        answer: "Acid 1 is 2 times as strong as acid 2.",
      },
      practiceSet: [
        { prompt: "For a conjugate pair \\(K_a \\times K_b = ?\\) at 298 K.", answer: "\\(K_w = 1.0\\times 10^{-14}\\)" },
        { prompt: "On diluting a weak acid, does its degree of dissociation increase or decrease?", answer: "Increase", method: "alpha = sqrt(Ka/c); smaller c -> larger alpha" },
        { prompt: "Does \\(K_a\\) change when you dilute the solution?", answer: "No — Ka depends only on temperature" },
        { prompt: "\\(K_a = 5\\times 10^{-9}\\), \\(\\alpha = 5\\times 10^{-4}\\). Find the concentration.", answer: "\\(0.02\\ \\text{M}\\)", method: "c = Ka/alpha^2 = 5e-9 / 25e-8" },
      ],
      traps: [
        {
          title: "Ka times Kb equals Kw — a product, not a sum",
          body:
            "For a conjugate pair the constants MULTIPLY to \\(K_w\\): \\(K_a \\times K_b = 10^{-14}\\). Writing \\(K_a + K_b = K_w\\) is wrong. To get one constant from the other, divide \\(K_w\\) by the known constant.",
        },
        {
          title: "Dilution raises alpha but leaves Ka fixed",
          body:
            "Adding water lowers \\(c\\), and since \\(\\alpha = \\sqrt{K_a/c}\\) a smaller \\(c\\) gives a LARGER \\(\\alpha\\) — the acid ionises more. But \\(K_a\\) is unchanged: it only shifts with temperature, never with concentration.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Acid-base theory and electrolytes (NDA Chemistry)",
      href: "/notes/nda-chemistry/acids-bases-salts",
    },
  ],
};
