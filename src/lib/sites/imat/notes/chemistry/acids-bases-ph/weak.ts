import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_WEAK_NOTE: SubtopicNote = {
  subtopicName: "Weak Acids and Bases",
  title: "Weak Acids and Bases: Ka, pKa and Kb",
  oneLineDefinition:
    "A weak acid ionises only partly, so its strength is measured by an equilibrium constant, Ka, and its pH needs a square root rather than a straight logarithm.",
  whyItMatters:
    "The ministry papers asked for the pH of a weak acid from its Ka (2025) and for the weak diprotic acid among drawn structures (2023); an older paper asked which of three acids are weak. Kb and pKa have not been asked directly, but they are on the syllabus.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-abp-weak-list",
      name: "Common weak acids and bases, and how many protons they give",
      intuition:
        "Most acids you meet, including all the organic acids, are weak: only a small fraction of their molecules give up a proton at any moment. Only hydrogen atoms bonded to a strongly electronegative atom, usually oxygen, are acidic. That is why ethanoic acid has four hydrogens but gives only one proton.",
      definition:
        "- A **weak acid** ionises only partly; the equation uses \\(\\rightleftharpoons\\), and most molecules stay whole.\n" +
        "- **Monoprotic**, **diprotic** and **triprotic** acids can give 1, 2 or 3 protons per molecule.\n" +
        "- Only an H on O (or on another very electronegative atom) is acidic. The H atoms on carbon in \\(\\mathrm{CH_3COOH}\\) are not.\n" +
        "- A polyprotic acid gives its protons one at a time, each step weaker than the last, because a negative ion holds its next proton more tightly.\n" +
        "- **Ammonia** and the **amines** are the common weak bases: they accept a proton with their nitrogen lone pair.",
      table: {
        columns: ["Name", "Formula", "Strength", "Acidic protons"],
        rows: [
          { cells: ["Ethanoic (acetic) acid", "\\(\\mathrm{CH_3COOH}\\)", "Weak acid", "1 (only the COOH hydrogen)"] },
          { cells: ["Methanoic (formic) acid", "\\(\\mathrm{HCOOH}\\)", "Weak acid", "1"] },
          { cells: ["Carbonic acid", "\\(\\mathrm{H_2CO_3}\\)", "Weak acid", "2"] },
          { cells: ["Ethanedioic (oxalic) acid", "\\(\\mathrm{HOOC{-}COOH}\\)", "Weak acid", "2 (one per COOH group)"] },
          { cells: ["Phosphoric acid", "\\(\\mathrm{H_3PO_4}\\)", "Weak acid", "3"] },
          { cells: ["Hydrofluoric acid", "\\(\\mathrm{HF}\\)", "Weak acid", "1"] },
          { cells: ["Ammonia", "\\(\\mathrm{NH_3}\\)", "Weak base", "Accepts 1 to form \\(\\mathrm{NH_4^+}\\)"] },
        ],
        caption: "Compare: sulfuric acid is a STRONG diprotic acid. An alcohol OH (ethanol, ethane-1,2-diol) is far too weak to count as an acid in water.",
      },
      selfCheckExample: {
        prompt: "Which of these is a strong diprotic acid?",
        options: [
          "\\(\\mathrm{H_2CO_3}\\)",
          "\\(\\mathrm{HNO_3}\\)",
          "\\(\\mathrm{H_2SO_4}\\)",
          "\\(\\mathrm{H_3PO_4}\\)",
          "\\(\\mathrm{CH_3COOH}\\)",
        ],
        steps: [
          "Sulfuric acid gives two protons and is strong.",
          "A is diprotic but weak. B is strong but monoprotic. D is weak and triprotic. E is weak and monoprotic, though it has four H atoms.",
        ],
        answer: "(C) \\(\\mathrm{H_2SO_4}\\)",
      },
      practiceSet: [
        { prompt: "How many acidic protons does propanoic acid, \\(\\mathrm{CH_3CH_2COOH}\\), have?", answer: "1", method: "Only the H of the COOH group" },
        { prompt: "Is citric acid, found in lemons, a strong or a weak acid?", answer: "Weak", method: "All the common organic acids are weak" },
        { prompt: "Which step of phosphoric acid ionises most: the first, second or third?", answer: "The first", method: "Removing \\(\\mathrm{H^+}\\) from a negative ion is harder each time" },
      ],
      traps: [
        {
          title: "Counting every H atom gives the wrong number of protons",
          body: "Ethanoic acid, \\(\\mathrm{CH_3COOH}\\), has four hydrogen atoms but only one is acidic: the one on the oxygen of the COOH group. A molecule with two COOH groups is diprotic. A compound with OH groups only on carbon chains (an alcohol or a diol) is not an acid in water at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-ka",
      name: "Ka and pKa: measuring the strength of a weak acid",
      intuition:
        "A weak acid sets up an equilibrium between whole molecules and ions. The equilibrium constant, Ka, says how far the acid has gone towards ions. A bigger Ka means more ionisation and a stronger acid. Because Ka values are tiny powers of ten, chemists use pKa, which works like pH: a smaller pKa means a stronger acid.",
      definition:
        "- For \\(\\mathrm{HA \\rightleftharpoons H^+ + A^-}\\), the **acid dissociation constant** is \\(K_a = [\\mathrm{H^+}][\\mathrm{A^-}]/[\\mathrm{HA}]\\).\n" +
        "- \\(\\text{p}K_a = -\\log K_a\\). **Larger Ka, smaller pKa, stronger acid.**\n" +
        "- Ka depends on temperature only, not on concentration.\n" +
        "- Rough values at 25 °C: ethanoic acid \\(K_a \\approx 1.8 \\times 10^{-5}\\) (pKa about 4.7); methanoic acid about \\(1.8 \\times 10^{-4}\\) (pKa about 3.7); the ammonium ion about \\(5.6 \\times 10^{-10}\\) (pKa about 9.3).",
      formula: {
        label: "Acid dissociation constant",
        latex: "K_a = \\frac{[\\mathrm{H^+}][\\mathrm{A^-}]}{[\\mathrm{HA}]} \\qquad \\text{p}K_a = -\\log_{10} K_a",
        symbols: [
          { symbol: "\\([\\mathrm{HA}]\\)", meaning: "concentration of the un-ionised acid at equilibrium" },
          { symbol: "\\([\\mathrm{A^-}]\\)", meaning: "concentration of the conjugate base at equilibrium" },
        ],
      },
      authoredExample: {
        prompt:
          "Three acids are described as: X has pKa 3.2, Y has \\(K_a = 1.0 \\times 10^{-5}\\), Z has pKa 6.4. Put them in order from strongest to weakest.",
        steps: [
          "Convert Y to pKa: \\(-\\log(1.0 \\times 10^{-5}) = 5.0\\).",
          "Now compare pKa values: X 3.2, Y 5.0, Z 6.4.",
          "Smallest pKa is the strongest acid, so the order is X, Y, Z.",
        ],
        answer: "X > Y > Z",
      },
      selfCheckExample: {
        prompt: "Solutions of five weak acids all have the same concentration. Which acid gives the lowest pH?",
        options: [
          "An acid with pKa 4.8",
          "An acid with \\(K_a = 2.0 \\times 10^{-4}\\)",
          "An acid with pKa 9.2",
          "An acid with \\(K_a = 1.0 \\times 10^{-6}\\)",
          "An acid with pKa 3.2",
        ],
        steps: [
          "Lowest pH means the strongest acid, which has the smallest pKa.",
          "Convert: \\(K_a = 2.0 \\times 10^{-4}\\) is pKa \\(4 - 0.30 = 3.70\\); \\(K_a = 1.0 \\times 10^{-6}\\) is pKa 6.0.",
          "pKa 3.2 is the smallest. Choosing C confuses a large pKa with a strong acid; B is the next strongest, not the strongest.",
        ],
        answer: "(E) An acid with pKa 3.2",
      },
      practiceSet: [
        { prompt: "An acid has \\(K_a = 1.0 \\times 10^{-3}\\). What is its pKa?", answer: "3", method: "\\(-\\log 10^{-3}\\)" },
        { prompt: "Which is the stronger acid: pKa 4.2 or pKa 7.5?", answer: "pKa 4.2", method: "Smaller pKa, larger Ka" },
        { prompt: "Does diluting a weak acid change its Ka at constant temperature?", answer: "No", method: "Ka depends only on temperature" },
      ],
      traps: [
        {
          title: "A larger pKa is a weaker acid",
          body: "pKa runs the opposite way to Ka, just as pH runs the opposite way to \\([\\mathrm{H^+}]\\). The acid with the biggest Ka, or the smallest pKa, is the strongest. When options mix Ka and pKa values, convert them all to one form before comparing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-weak-ph",
      name: "pH of a weak acid solution",
      intuition:
        "A weak acid releases only a little \\(\\mathrm{H^+}\\), so the amount ionised is small next to the amount dissolved. Each ionised molecule gives one \\(\\mathrm{H^+}\\) and one \\(\\mathrm{A^-}\\), so \\(K_a \\approx [\\mathrm{H^+}]^2 / c\\). That gives \\([\\mathrm{H^+}]\\) as a square root, and in pH terms it means halving.",
      definition:
        "- Assume \\([\\mathrm{H^+}] = [\\mathrm{A^-}]\\) and that \\([\\mathrm{HA}]\\) stays about equal to the starting concentration \\(c\\).\n" +
        "- Then \\([\\mathrm{H^+}] \\approx \\sqrt{K_a\\,c}\\), or \\(\\text{pH} \\approx \\tfrac{1}{2}(\\text{p}K_a - \\log c)\\).\n" +
        "- The approximation works when the acid is only a few per cent ionised, which is true for typical IMAT numbers.\n" +
        "- **Degree of ionisation**: \\([\\mathrm{H^+}]/c\\). It rises as the acid is diluted.\n" +
        "- Diluting a weak acid 100 times raises its pH by only 1, not 2, because of the square root.",
      formula: {
        label: "Weak acid",
        latex: "[\\mathrm{H^+}] \\approx \\sqrt{K_a\\,c} \\qquad \\text{pH} \\approx \\tfrac{1}{2}\\left(\\text{p}K_a - \\log_{10} c\\right)",
        symbols: [
          { symbol: "\\(K_a\\)", meaning: "acid dissociation constant" },
          { symbol: "\\(c\\)", meaning: "concentration of acid dissolved, in mol/L" },
        ],
      },
      authoredExample: {
        prompt: "Find the pH of a 0.040 mol/L solution of a weak acid with \\(K_a = 4.0 \\times 10^{-6}\\). Take \\(\\log 4 = 0.60\\).",
        steps: [
          "\\(K_a \\, c = 4.0 \\times 10^{-6} \\times 0.040 = 1.6 \\times 10^{-7}\\).",
          "\\([\\mathrm{H^+}] = \\sqrt{1.6 \\times 10^{-7}} = \\sqrt{16 \\times 10^{-8}} = 4.0 \\times 10^{-4}\\ \\text{mol/L}\\).",
          "\\(\\text{pH} = 4 - \\log 4 = 4 - 0.60 = 3.40\\).",
          "Only 1% of the acid is ionised (\\(4.0 \\times 10^{-4} / 0.040\\)), so the approximation holds.",
        ],
        answer: "pH 3.40",
      },
      selfCheckExample: {
        prompt: "A weak monoprotic acid has pKa 4.0. What is the pH of its 0.010 mol/L solution?",
        options: [
          "3.0",
          "2.0",
          "6.0",
          "4.0",
          "1.0",
        ],
        steps: [
          "\\(\\text{pH} \\approx \\tfrac{1}{2}(4.0 - \\log 0.010) = \\tfrac{1}{2}(4.0 + 2.0) = 3.0\\).",
          "B treats the acid as strong. C forgets to halve. D gives the pKa itself. E halves the strong-acid answer.",
        ],
        answer: "(A) 3.0",
      },
      practiceSet: [
        { prompt: "A 0.010 mol/L weak acid has \\(K_a = 9.0 \\times 10^{-6}\\). Find \\([\\mathrm{H^+}]\\).", answer: "\\(3.0 \\times 10^{-4}\\ \\text{mol/L}\\)", method: "\\(\\sqrt{9.0 \\times 10^{-8}}\\)" },
        { prompt: "A 0.10 mol/L weak acid is 2% ionised. What is \\([\\mathrm{H^+}]\\)?", answer: "\\(2.0 \\times 10^{-3}\\ \\text{mol/L}\\)", method: "\\(0.02 \\times 0.10\\)" },
        { prompt: "A weak acid solution of pH 3.0 is diluted 100 times. About what is the new pH?", answer: "About 4.0", method: "\\([\\mathrm{H^+}]\\) falls by \\(\\sqrt{100} = 10\\)" },
      ],
      traps: [
        {
          title: "A weak acid's pH is not minus log of its concentration",
          body: "\\(-\\log c\\) gives the pH only for a strong acid. For a weak acid of the same concentration the pH is higher, because only a small fraction ionises. Treating a weak acid as strong is the most common wrong option in these questions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-kb",
      name: "Weak bases, Kb, and Ka × Kb = Kw for a conjugate pair",
      intuition:
        "A weak base pulls a proton off water and leaves \\(\\mathrm{OH^-}\\) behind, setting up its own equilibrium with its own constant, Kb. An acid and its conjugate base are linked: if the acid holds its proton loosely, the conjugate base has little pull on protons. Multiplying their constants gives Kw exactly.",
      definition:
        "- For \\(\\mathrm{B + H_2O \\rightleftharpoons BH^+ + OH^-}\\): \\(K_b = [\\mathrm{BH^+}][\\mathrm{OH^-}]/[\\mathrm{B}]\\), and \\(\\text{p}K_b = -\\log K_b\\).\n" +
        "- For a weak base, \\([\\mathrm{OH^-}] \\approx \\sqrt{K_b\\,c}\\); then find pOH and pH.\n" +
        "- For a **conjugate pair**: \\(K_a \\times K_b = K_w\\), so \\(\\text{p}K_a + \\text{p}K_b = 14\\) at 25 °C.\n" +
        "- **The stronger the acid, the weaker its conjugate base.** The conjugate base of a strong acid (\\(\\mathrm{Cl^-}\\), \\(\\mathrm{NO_3^-}\\)) has no measurable basic strength in water.",
      formula: {
        label: "Conjugate pair at 25 °C",
        latex: "K_a \\times K_b = K_w = 1.0 \\times 10^{-14} \\qquad \\text{p}K_a + \\text{p}K_b = 14",
        symbols: [
          { symbol: "\\(K_a\\)", meaning: "constant for the acid of the pair" },
          { symbol: "\\(K_b\\)", meaning: "constant for its conjugate base" },
        ],
      },
      authoredExample: {
        prompt:
          "A weak base has \\(K_b = 1.0 \\times 10^{-4}\\). Find the pH of its 0.010 mol/L solution at 25 °C, and the Ka of its conjugate acid.",
        steps: [
          "\\([\\mathrm{OH^-}] \\approx \\sqrt{1.0 \\times 10^{-4} \\times 0.010} = \\sqrt{10^{-6}} = 1.0 \\times 10^{-3}\\ \\text{mol/L}\\).",
          "pOH = 3, so pH = 14 - 3 = 11.",
          "Conjugate acid: \\(K_a = K_w / K_b = 10^{-14} / 10^{-4} = 1.0 \\times 10^{-10}\\).",
        ],
        answer: "pH 11; \\(K_a = 1.0 \\times 10^{-10}\\)",
      },
      selfCheckExample: {
        prompt: "Hydrocyanic acid, HCN, has a pKa of 9.2 at 25 °C. What is the pKb of the cyanide ion, \\(\\mathrm{CN^-}\\)?",
        options: [
          "9.2",
          "4.8",
          "23.2",
          "14",
          "7.0",
        ],
        steps: [
          "\\(\\mathrm{CN^-}\\) is the conjugate base of HCN, so \\(\\text{p}K_b = 14 - 9.2 = 4.8\\).",
          "A assumes the pair shares one constant. C adds instead of subtracting. D and E are not linked to the data.",
          "Because HCN is a very weak acid, its conjugate base pulls on protons quite strongly: cyanide solutions are clearly alkaline.",
        ],
        answer: "(B) 4.8",
      },
      practiceSet: [
        { prompt: "Ammonia has \\(K_b = 1.8 \\times 10^{-5}\\). What is Ka for the ammonium ion?", answer: "About \\(5.6 \\times 10^{-10}\\)", method: "\\(10^{-14} / (1.8 \\times 10^{-5})\\)" },
        { prompt: "Acid HX is stronger than acid HY. Which is the stronger base: \\(\\mathrm{X^-}\\) or \\(\\mathrm{Y^-}\\)?", answer: "\\(\\mathrm{Y^-}\\)", method: "Stronger acid, weaker conjugate base" },
        { prompt: "Ethanoic acid has pKa 4.7. What is the pKb of the ethanoate ion?", answer: "9.3", method: "\\(14 - 4.7\\)" },
      ],
      traps: [
        {
          title: "A strong acid has a weak conjugate base",
          body: "Strength runs in opposite directions within a pair. A strong acid such as HCl has a conjugate base (\\(\\mathrm{Cl^-}\\)) too weak to take protons from water. A very weak acid such as HCN has a fairly strong conjugate base. An option saying a strong acid has a strong conjugate base is wrong.",
        },
      ],
    },
  ],
};
