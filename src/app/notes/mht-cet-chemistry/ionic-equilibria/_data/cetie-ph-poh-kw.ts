import type { SubtopicNote } from "@/app/notes/_types";

export const PH_POH_NOTE: SubtopicNote = {
  subtopicName: "pH, pOH and Ionic Product of Water",
  title: "pH, pOH and the Ionic Product of Water",
  oneLineDefinition:
    "Water self-ionises so that the product of its hydrogen- and hydroxide-ion concentrations is fixed; pH and pOH are the logarithmic measures of those concentrations, and together they add up to 14 at 25 degrees C.",
  whyItMatters:
    "This is one of the most reliable scoring blocks in MHT-CET Chemistry — around two dozen PYQs, almost all one- or two-step plug-ins. Nearly every question reduces to the same routine: find the ion concentration, take a negative log, and use pH + pOH = 14. The recurring traps are a strong acid or base that furnishes more than one ion per formula unit (dibasic, diacidic), a weak acid or base where you must first multiply by the degree of dissociation, and the special case of an extremely dilute strong acid where the pH creeps back toward 7. " +
    "Learn the four formulas cold — Kw, pH, pOH, and pH + pOH = 14 — and you can attempt every question here on sight.",
  concepts: [
    // Concept 1 — Ionic product of water (Kw)
    {
      kind: "formula" as const,
      slug: "cetie-ph-kw",
      name: "Ionic product of water, Kw",
      intuition:
        "Even pure water conducts a tiny bit of electricity because a few molecules split into H+ and OH- ions. At any temperature the product of these two concentrations is a fixed number called Kw. At 25 degrees C that number is 10 to the minus 14, so if you know one ion concentration you can always get the other by dividing.",
      definition:
        "The ionic product of water:\n" +
        "- Water self-ionises: \\(2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-\\).\n" +
        "- The product \\(K_w = [\\text{H}^+][\\text{OH}^-]\\) is **constant at a given temperature**; at \\(25\\,^{\\circ}\\text{C}\\) it equals \\(10^{-14}\\).\n" +
        "- In pure (neutral) water the two ions are equal: \\([\\text{H}^+] = [\\text{OH}^-] = 10^{-7}\\,\\text{M}\\) at \\(25\\,^{\\circ}\\text{C}\\).\n" +
        "- \\(K_w\\) is **temperature-dependent** — self-ionisation is endothermic, so heating water raises \\(K_w\\) (and lowers the neutral pH below 7), while the product of the two ions still stays constant at that new temperature.\n" +
        "- Rearranged: \\([\\text{OH}^-] = \\dfrac{K_w}{[\\text{H}^+]}\\) and \\([\\text{H}^+] = \\dfrac{K_w}{[\\text{OH}^-]}\\).",
      formula: {
        label: "Ionic product of water",
        latex: "K_w = [\\text{H}^+][\\text{OH}^-] = 10^{-14} \\quad (25\\,^{\\circ}\\text{C})",
        symbols: [
          { symbol: "K_w", meaning: "ionic product of water (mol^2 L^-2)" },
          { symbol: "\\([\\text{H}^+]\\)", meaning: "hydrogen-ion (hydronium) concentration (mol/L)" },
          { symbol: "\\([\\text{OH}^-]\\)", meaning: "hydroxide-ion concentration (mol/L)" },
        ],
      },
      pyqExampleId: "0fbe488f-15a3-4c2f-aa44-b2f8a5ec9c6c", // [OH-] from 0.05 M H+ -> 2.0e-13 M
      authoredExample: {
        prompt:
          "A solution has a hydrogen-ion concentration of \\(2 \\times 10^{-3}\\,\\text{M}\\) at 25 degrees C. Find its hydroxide-ion concentration.",
        steps: [
          "At \\(25\\,^{\\circ}\\text{C}\\), \\([\\text{H}^+][\\text{OH}^-] = K_w = 10^{-14}\\).",
          "\\([\\text{OH}^-] = \\dfrac{K_w}{[\\text{H}^+]} = \\dfrac{10^{-14}}{2 \\times 10^{-3}}\\).",
          "\\(= \\dfrac{1}{2} \\times 10^{-14+3} = 0.5 \\times 10^{-11} = 5 \\times 10^{-12}\\,\\text{M}\\).",
        ],
        answer: "\\([\\text{OH}^-] = 5 \\times 10^{-12}\\,\\text{M}\\).",
      },
      selfCheckExample: {
        prompt:
          "A solution contains \\(0.05\\,\\text{M}\\) hydrogen ions. What is its hydroxide-ion concentration at 25 degrees C?",
        steps: [
          "Use \\([\\text{OH}^-] = \\dfrac{K_w}{[\\text{H}^+]} = \\dfrac{10^{-14}}{0.05}\\).",
          "\\(0.05 = 5 \\times 10^{-2}\\), so \\([\\text{OH}^-] = \\dfrac{10^{-14}}{5 \\times 10^{-2}} = 0.2 \\times 10^{-12}\\).",
          "\\(= 2.0 \\times 10^{-13}\\,\\text{M}\\).",
        ],
        answer: "\\([\\text{OH}^-] = 2.0 \\times 10^{-13}\\,\\text{M}\\).",
      },
      practiceSet: [
        { prompt: "Value of Kw for water at 25 degrees C?", answer: "\\(10^{-14}\\)", method: "Kw = [H+][OH-]" },
        { prompt: "[H+] in pure neutral water at 25 degrees C?", answer: "\\(10^{-7}\\,\\text{M}\\)" },
        { prompt: "If [H+] = 10^-3 M, find [OH-] at 25 degrees C.", answer: "\\(10^{-11}\\,\\text{M}\\)", method: "Kw / [H+]" },
        { prompt: "Does Kw increase or decrease when water is heated?", answer: "Increases (self-ionisation is endothermic)" },
      ],
      traps: [
        {
          title: "Kw = 10 to the minus 14 only at 25 degrees C",
          body:
            "The value \\(K_w = 10^{-14}\\) holds **only at \\(25\\,^{\\circ}\\text{C}\\)**. Self-ionisation is endothermic, so at higher temperatures \\(K_w\\) is larger and neutral water has a pH below 7 — even though it is still neutral (\\([\\text{H}^+] = [\\text{OH}^-]\\)).",
        },
        {
          title: "Divide into Kw, do not subtract",
          body:
            "To get one ion from the other, **divide \\(K_w\\) by the known concentration** — do not subtract exponents casually. \\([\\text{OH}^-] = K_w/[\\text{H}^+]\\); mixing up which ion you started with flips the answer between acidic and basic.",
        },
      ],
    },

    // Concept 2 — pH, pOH and their relationship
    {
      kind: "formula" as const,
      slug: "cetie-ph-poh-relation",
      name: "pH, pOH and the relation pH + pOH = 14",
      intuition:
        "Ion concentrations are awkward tiny numbers like 10 to the minus 4, so we take the negative base-10 log to get a friendly 0-to-14 scale. pH measures the H+ side, pOH measures the OH- side, and because their product Kw is fixed, the two scales are locked together: pH + pOH = 14 at 25 degrees C. You can also go backwards — raise 10 to the minus pH to recover the concentration.",
      definition:
        "The logarithmic pH/pOH scale:\n" +
        "- \\(\\text{pH} = -\\log[\\text{H}^+]\\) and \\(\\text{pOH} = -\\log[\\text{OH}^-]\\) (base-10 logs).\n" +
        "- Taking \\(-\\log\\) of \\(K_w = [\\text{H}^+][\\text{OH}^-] = 10^{-14}\\) gives \\(\\text{pH} + \\text{pOH} = 14\\) at \\(25\\,^{\\circ}\\text{C}\\).\n" +
        "- The relationship is **inverse**: a rise of one pH unit means \\([\\text{H}^+]\\) has fallen by a factor of 10.\n" +
        "- To recover a concentration from pH: \\([\\text{H}^+] = 10^{-\\text{pH}}\\), and likewise \\([\\text{OH}^-] = 10^{-\\text{pOH}}\\).\n" +
        "- Useful log values: \\(\\log 2 = 0.301\\), \\(\\log 3 = 0.477\\), \\(\\log 5 = 0.699\\).",
      formula: {
        label: "pH, pOH and their sum",
        latex: "\\text{pH} = -\\log[\\text{H}^+], \\quad \\text{pOH} = -\\log[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14",
        symbols: [
          { symbol: "\\(\\text{pH}\\)", meaning: "negative log of hydrogen-ion concentration" },
          { symbol: "\\(\\text{pOH}\\)", meaning: "negative log of hydroxide-ion concentration" },
          { symbol: "\\([\\text{H}^+]\\)", meaning: "hydrogen-ion concentration (mol/L)" },
        ],
      },
      pyqExampleId: "8f439652-c9e3-47c4-a745-3f118dc9496b", // [H+] from pH 3.76 -> 1.738e-4
      authoredExample: {
        prompt:
          "A solution has \\([\\text{H}^+] = 4.62 \\times 10^{-4}\\,\\text{M}\\). Find its pH.",
        steps: [
          "\\(\\text{pH} = -\\log(4.62 \\times 10^{-4}) = 4 - \\log 4.62\\).",
          "\\(\\log 4.62 \\approx 0.665\\).",
          "\\(\\text{pH} = 4 - 0.665 = 3.34\\).",
        ],
        answer: "\\(\\text{pH} = 3.34\\).",
      },
      selfCheckExample: {
        prompt:
          "The pH of a vinegar sample is 3.76. Calculate its hydrogen-ion concentration in mol dm^-3.",
        steps: [
          "Invert the definition: \\([\\text{H}^+] = 10^{-\\text{pH}} = 10^{-3.76}\\).",
          "Split the exponent: \\(10^{-3.76} = 10^{0.24} \\times 10^{-4}\\).",
          "\\(10^{0.24} \\approx 1.738\\), so \\([\\text{H}^+] = 1.738 \\times 10^{-4}\\,\\text{mol dm}^{-3}\\).",
        ],
        answer: "\\([\\text{H}^+] = 1.738 \\times 10^{-4}\\,\\text{mol dm}^{-3}\\).",
      },
      practiceSet: [
        { prompt: "pH changes from 4 to 5. How does [H3O+] change?", answer: "Decreases by 10 times", method: "10^-5 / 10^-4 = 1/10" },
        { prompt: "pH of a solution with [H+] = 2.2 x 10^-6 M?", answer: "\\(5.66\\)", method: "6 - log 2.2" },
        { prompt: "pOH of a solution is 11. Find [H+].", answer: "\\(10^{-3}\\,\\text{M}\\)", method: "pH = 14 - 11 = 3" },
        { prompt: "[OH-] if pOH = 4.94?", answer: "\\(1.148 \\times 10^{-5}\\,\\text{M}\\)", method: "10^-4.94" },
        { prompt: "Write the relation between pH and pOH at 25 degrees C.", answer: "\\(\\text{pH} + \\text{pOH} = 14\\)" },
      ],
      traps: [
        {
          title: "pH + pOH = 14 only at 25 degrees C",
          body:
            "The sum \\(\\text{pH} + \\text{pOH} = 14\\) comes from \\(K_w = 10^{-14}\\), which is a **\\(25\\,^{\\circ}\\text{C}\\) value**. At other temperatures \\(K_w\\) differs, so the sum is no longer exactly 14. In every MHT-CET numerical it is 14 — but the conceptual questions test whether you know why.",
        },
        {
          title: "Higher pH means LOWER concentration",
          body:
            "Because pH is a **negative** log, a bigger pH means a **smaller** \\([\\text{H}^+]\\). Going from pH 4 to pH 5 the acidity falls 10-fold — the concentration **decreases** by 10 times, it does not increase.",
        },
      ],
    },

    // Concept 3 — pH of strong acids and bases
    {
      kind: "formula" as const,
      slug: "cetie-ph-strong",
      name: "pH of strong acids and strong bases",
      intuition:
        "A strong acid or base is fully dissociated, so the ion concentration is just the concentration you put in — times how many H+ or OH- ions each formula unit releases. Diprotic acids like H2SO4 give two H+, and bases like Ba(OH)2 give two OH-, so remember to double before taking the log. For a base, find pOH first, then subtract from 14.",
      definition:
        "Strong acids/bases dissociate completely:\n" +
        "- For a strong monoprotic acid, \\([\\text{H}^+] = c\\); take \\(\\text{pH} = -\\log c\\) directly.\n" +
        "- **Multiply by the number of ionisable ions**: a strong **dibasic/diprotic** acid gives \\([\\text{H}^+] = 2c\\) (e.g. \\(\\text{H}_2\\text{SO}_4\\)); a **diacidic** base like \\(\\text{Ba(OH)}_2\\) gives \\([\\text{OH}^-] = 2c\\).\n" +
        "- For a strong base, first find \\(\\text{pOH} = -\\log[\\text{OH}^-]\\), then \\(\\text{pH} = 14 - \\text{pOH}\\).\n" +
        "- Convert grams to molarity when needed: \\(c = \\dfrac{\\text{mass}/\\text{molar mass}}{\\text{volume in litres}}\\).",
      formula: {
        label: "Strong acid / strong base",
        latex: "[\\text{H}^+] = Z\\,c \\;\\Rightarrow\\; \\text{pH} = -\\log(Z\\,c); \\qquad \\text{pH} = 14 - \\text{pOH}",
        symbols: [
          { symbol: "c", meaning: "molar concentration of the acid or base" },
          { symbol: "Z", meaning: "number of H+ (or OH-) furnished per formula unit" },
          { symbol: "\\(\\text{pOH}\\)", meaning: "= -log[OH-], for a base" },
        ],
      },
      pyqExampleId: "e7f5e96e-b083-42b7-bc43-1134746273cb", // 4g NaOH in 500 mL -> pH 13.301
      authoredExample: {
        prompt:
          "Calculate the pH of a \\(0.005\\,\\text{M}\\) NaOH solution at 25 degrees C.",
        steps: [
          "NaOH is a strong monoacidic base: \\([\\text{OH}^-] = 0.005 = 5 \\times 10^{-3}\\,\\text{M}\\).",
          "\\(\\text{pOH} = -\\log(5 \\times 10^{-3}) = 3 - \\log 5 = 3 - 0.699 = 2.30\\).",
          "\\(\\text{pH} = 14 - 2.30 = 11.70\\).",
        ],
        answer: "\\(\\text{pH} = 11.7\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the pH of a \\(0.05\\,\\text{M}\\) \\(\\text{H}_2\\text{SO}_4\\) solution at 25 degrees C. (\\(\\text{H}_2\\text{SO}_4\\) is a strong diprotic acid.)",
        steps: [
          "\\(\\text{H}_2\\text{SO}_4\\) furnishes 2 H+ per formula unit: \\([\\text{H}^+] = 2 \\times 0.05 = 0.1\\,\\text{M}\\).",
          "\\(\\text{pH} = -\\log(0.1) = 1\\).",
        ],
        answer: "\\(\\text{pH} = 1\\).",
      },
      practiceSet: [
        { prompt: "pH of 0.01 M H2SO4 (strong diprotic)?", answer: "\\(1.7\\)", method: "[H+] = 2 x 0.01 = 0.02; pH = 2 - log 2" },
        { prompt: "pH of 1.36 x 10^-2 M perchloric acid (HClO4)?", answer: "\\(1.86\\)", method: "2 - log 1.36" },
        { prompt: "pOH of a millimolar Ba(OH)2 solution?", answer: "\\(2.7\\)", method: "[OH-] = 2 x 10^-3; 3 - log 2" },
        { prompt: "pH of 0.002 M KOH?", answer: "\\(11.3\\)", method: "pOH = 2.699; pH = 14 - 2.699" },
        { prompt: "pH of 1 x 10^-4 M strong monoacidic base?", answer: "\\(10\\)", method: "pOH = 4; pH = 14 - 4" },
      ],
      traps: [
        {
          title: "Double for dibasic / diacidic",
          body:
            "\\(\\text{H}_2\\text{SO}_4\\) and other diprotic acids give **two** H+ per formula unit, so \\([\\text{H}^+] = 2c\\), not \\(c\\). Likewise \\(\\text{Ba(OH)}_2\\) gives \\([\\text{OH}^-] = 2c\\). For \\(0.01\\,\\text{M } \\text{H}_2\\text{SO}_4\\) the pH is \\(1.7\\) (from \\(0.02\\,\\text{M H}^+\\)), **not** \\(2.0\\).",
        },
        {
          title: "For a base, do not forget the 14 - pOH step",
          body:
            "A strong base gives you \\([\\text{OH}^-]\\) directly, so you naturally compute **pOH**. The question almost always wants **pH** — finish with \\(\\text{pH} = 14 - \\text{pOH}\\). Stopping at pOH is the most common careless loss of marks here.",
        },
      ],
    },

    // Concept 4 — pH of weak acids and bases
    {
      kind: "formula" as const,
      slug: "cetie-ph-weak",
      name: "pH of weak acids and weak bases",
      intuition:
        "A weak acid or base only partly dissociates, so the ion concentration is a fraction of what you added. If the question gives a degree of dissociation (a percentage), just multiply: ion concentration = alpha times concentration. If instead it gives the dissociation constant Ka, use the square-root formula [H+] = sqrt(Ka times c). Everything after that is the same negative-log routine as before.",
      definition:
        "Weak electrolytes dissociate partially:\n" +
        "- Given a **degree of dissociation** \\(\\alpha\\) (a percentage \\(\\div 100\\)): \\([\\text{H}^+] = \\alpha c\\) for a weak acid, or \\([\\text{OH}^-] = \\alpha c\\) for a weak base.\n" +
        "- Given a **dissociation constant** \\(K_a\\): \\([\\text{H}^+] = \\sqrt{K_a\\,c}\\), which also gives \\(\\text{pH} = \\tfrac12\\!\\left(pK_a - \\log c\\right)\\) where \\(pK_a = -\\log K_a\\).\n" +
        "- The two are linked by **Ostwald's dilution law** \\(\\alpha = \\sqrt{K_a/c}\\), so \\([\\text{H}^+] = \\alpha c = \\sqrt{K_a c}\\).\n" +
        "- For a weak **base**, form \\(\\text{pOH} = -\\log[\\text{OH}^-]\\) first, then \\(\\text{pH} = 14 - \\text{pOH}\\).\n" +
        "- A weak **dibasic** acid still furnishes 2 ionisable H+, so \\([\\text{H}^+] = \\alpha c Z\\) with \\(Z = 2\\).",
      formula: {
        label: "Weak acid / base",
        latex: "[\\text{H}^+] = \\alpha c = \\sqrt{K_a\\,c} \\;\\Rightarrow\\; \\text{pH} = \\tfrac12\\!\\left(pK_a - \\log c\\right)",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "degree of dissociation (percentage / 100)" },
          { symbol: "c", meaning: "molar concentration of the weak electrolyte" },
          { symbol: "K_a", meaning: "acid dissociation constant" },
        ],
      },
      pyqExampleId: "2b2097ef-b035-4831-a4ae-d25863ab381b", // [H3O+] = sqrt(Ka c) = 6e-4
      authoredExample: {
        prompt:
          "Calculate the pH of a \\(0.1\\,\\text{M}\\) weak monobasic acid whose dissociation constant \\(K_a\\) is \\(1 \\times 10^{-5}\\).",
        steps: [
          "\\([\\text{H}^+] = \\sqrt{K_a\\,c} = \\sqrt{(1 \\times 10^{-5})(0.1)} = \\sqrt{1 \\times 10^{-6}}\\).",
          "\\([\\text{H}^+] = 1 \\times 10^{-3}\\,\\text{M}\\).",
          "\\(\\text{pH} = -\\log(10^{-3}) = 3\\).",
        ],
        answer: "\\(\\text{pH} = 3\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the pH of a centimolar (\\(0.01\\,\\text{M}\\)) solution of a monoacidic weak base that is 10% dissociated.",
        steps: [
          "\\(\\alpha = 10\\% = 0.10\\), \\(c = 0.01\\,\\text{M}\\).",
          "\\([\\text{OH}^-] = \\alpha c = 0.10 \\times 0.01 = 10^{-3}\\,\\text{M}\\).",
          "\\(\\text{pOH} = -\\log(10^{-3}) = 3\\), so \\(\\text{pH} = 14 - 3 = 11\\).",
        ],
        answer: "\\(\\text{pH} = 11\\).",
      },
      practiceSet: [
        { prompt: "pH of 0.02 M monobasic acid that is 2% dissociated?", answer: "\\(3.4\\)", method: "[H+] = 0.02 x 0.02 = 4 x 10^-4; 4 - log 4" },
        { prompt: "pH of a weak dibasic acid, 2% dissociated in M/100 solution?", answer: "\\(3.398\\)", method: "[H+] = 0.02 x 0.01 x 2 = 4 x 10^-4" },
        { prompt: "pH of NaOH-type base, 2% dissociated in 0.01 M solution?", answer: "\\(10.301\\)", method: "[OH-] = 2 x 10^-4; pOH 3.699; 14 - 3.699" },
        { prompt: "Ostwald's dilution law for a weak acid: alpha = ?", answer: "\\(\\alpha = \\sqrt{K_a / c}\\)" },
      ],
      traps: [
        {
          title: "Apply the degree of dissociation before the log",
          body:
            "For a weak electrolyte the reacting ion is only \\(\\alpha c\\), **not** the full concentration \\(c\\). For \\(0.02\\,\\text{M}\\) acid at 2% dissociation, \\([\\text{H}^+] = 0.02 \\times 0.02 = 4 \\times 10^{-4}\\,\\text{M}\\) (pH \\(3.4\\)) — using the full \\(0.02\\,\\text{M}\\) gives a wrong pH of \\(1.7\\).",
        },
        {
          title: "sqrt(Ka c), not Ka c",
          body:
            "When a **dissociation constant** is given, \\([\\text{H}^+] = \\sqrt{K_a\\,c}\\) — take the **square root** of the product. Forgetting the root (using \\(K_a c\\) itself) makes the concentration far too small and the pH far too high.",
        },
        {
          title: "A weak dibasic acid still furnishes 2 H+",
          body:
            "The 'weak' label controls \\(\\alpha\\); the 'dibasic' label controls the ion count. Keep both: \\([\\text{H}^+] = \\alpha c Z\\) with \\(Z = 2\\). For 2% dissociation in \\(M/100\\): \\([\\text{H}^+] = 0.02 \\times 0.01 \\times 2 = 4 \\times 10^{-4}\\,\\text{M}\\), pH \\(3.398\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Acids, bases and salts — the pH scale",
      href: "/notes/nda-chemistry/acids-bases-salts",
    },
  ],
};
