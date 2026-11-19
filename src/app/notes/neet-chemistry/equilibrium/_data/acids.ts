import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EQ_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Acids, Bases and pH",
  title: "Acids, Bases and pH",
  oneLineDefinition:
    "The Arrhenius, Brønsted-Lowry and Lewis ideas of acids and bases, the ionic product of water and the pH scale, weak acids and their ionisation constants, and the indicators used in acid-base titrations.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026. One picks the Lewis acid among NH₃, H₂O, BF₃ and OH⁻ (2023), one tests statements about the three stepwise ionisation constants of phosphoric acid (2025), and two ask about phenolphthalein when sodium hydroxide is titrated against oxalic acid: which indicator and what colour change (Re-NEET 2024), and the colour change near the end point (NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ncheq-acid-theories",
      name: "Arrhenius, Brønsted-Lowry and Lewis acids",
      intuition:
        "There are three ways of saying what an acid is, each wider than the last. Arrhenius looked at what a substance gives in water. Brønsted and Lowry looked at the proton: an acid hands one over, a base takes it. Lewis looked at the electron pair: a base has a lone pair to share, and an acid has room to accept it. That is why BF₃, which has no hydrogen at all, still counts as an acid.",
      definition:
        "- **Arrhenius:** an acid gives \\(\\text{H}^+\\) (as \\(\\text{H}_3\\text{O}^+\\)) in water; a base gives \\(\\text{OH}^-\\) in water.\n" +
        "- **Brønsted-Lowry:** an acid is a proton donor; a base is a proton acceptor. An acid and the base it forms by losing a proton are a **conjugate pair**, such as \\(\\text{NH}_4^+\\) and \\(\\text{NH}_3\\).\n" +
        "- A strong acid has a very weak conjugate base, and a weak acid has a fairly strong one.\n" +
        "- Water can give a proton or take one, so it acts as an acid and as a base (amphoteric).\n" +
        "- **Lewis:** an acid accepts an electron pair; a base donates one. Lewis acids include electron-deficient molecules (\\(\\text{BF}_3\\), \\(\\text{AlCl}_3\\)) and cations (\\(\\text{H}^+\\), \\(\\text{Mg}^{2+}\\), \\(\\text{Co}^{3+}\\)). Lewis bases have lone pairs (\\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{OH}^-\\), \\(\\text{F}^-\\)).",
      table: {
        columns: ["Theory", "Acid", "Base", "Example"],
        rows: [
          { cells: ["Arrhenius", "Gives H⁺ in water", "Gives OH⁻ in water", "HCl is an acid; NaOH is a base"] },
          { cells: ["Brønsted-Lowry", "Proton donor", "Proton acceptor", "In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, water is the acid and NH₃ the base"] },
          { cells: ["Lewis", "Electron-pair acceptor", "Electron-pair donor", "BF₃ is an acid; NH₃ is a base"], noteAmber: "NEET 2023: BF₃ is the Lewis acid; NH₃, H₂O and OH⁻ are Lewis bases." },
        ],
      },
      pyqExampleId: "5d1bd783-6ddf-41c5-b1b2-a3681f3c1add",
      selfCheckExample: {
        prompt: "Give the conjugate base of \\(\\text{H}_2\\text{SO}_4\\) and the conjugate acid of \\(\\text{NH}_3\\).",
        steps: [
          "A conjugate base has one proton fewer: \\(\\text{H}_2\\text{SO}_4\\) becomes \\(\\text{HSO}_4^-\\).",
          "A conjugate acid has one proton more: \\(\\text{NH}_3\\) becomes \\(\\text{NH}_4^+\\).",
        ],
        answer: "\\(\\text{HSO}_4^-\\) and \\(\\text{NH}_4^+\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\text{AlCl}_3\\) a Lewis acid or a Lewis base?", answer: "A Lewis acid" },
        { prompt: "What is the conjugate acid of \\(\\text{OH}^-\\)?", answer: "\\(\\text{H}_2\\text{O}\\)" },
        { prompt: "Is the fluoride ion \\(\\text{F}^-\\) a Lewis acid or a Lewis base?", answer: "A Lewis base: it has lone pairs to donate" },
        { prompt: "Why can water act as both a Brønsted acid and a Brønsted base?", answer: "It can give a proton (becoming OH⁻) or accept one (becoming H₃O⁺)" },
      ],
      traps: [
        {
          title: "A Lewis acid need not contain hydrogen",
          body: "\\(\\text{BF}_3\\) and \\(\\text{AlCl}_3\\) have no hydrogen, yet they are Lewis acids because boron and aluminium have room to accept an electron pair.",
        },
        {
          title: "Lone pairs make a Lewis base",
          body: "\\(\\text{H}_2\\text{O}\\), \\(\\text{NH}_3\\) and \\(\\text{OH}^-\\) all have lone pairs to donate, so in the Lewis sense they are bases, even though water can also give a proton.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-ph",
      name: "Kw, pH and weak acids",
      visualizationSlug: "acid-ph-scale-strip",
      intuition:
        "Even pure water ionises a little, into H⁺ and OH⁻, and the product of their concentrations is a constant at a given temperature. pH is just a short way of writing a tiny H⁺ concentration: take the log and change the sign. A weak acid ionises only partly, and how far it goes is set by its ionisation constant Ka.",
      definition:
        "- Ionic product of water: \\(K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}\\) at 298 K. It changes with temperature.\n" +
        "- \\(\\text{pH} = -\\log[\\text{H}^+]\\) and \\(\\text{pH} + \\text{pOH} = 14\\) at 298 K. Neutral water has pH 7 at 298 K.\n" +
        "- A weak acid HA: \\(K_a = \\dfrac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]}\\). With c the concentration and \\(\\alpha\\) small, \\(\\alpha = \\sqrt{\\dfrac{K_a}{c}}\\) and \\([\\text{H}^+] = c\\alpha = \\sqrt{K_a c}\\).\n" +
        "- \\(\\text{p}K_a = -\\log K_a\\): the smaller the \\(\\text{p}K_a\\), the stronger the acid.\n" +
        "- For a conjugate pair: \\(K_a \\times K_b = K_w\\), so \\(\\text{p}K_a + \\text{p}K_b = 14\\) at 298 K.\n" +
        "- A **polyprotic** acid such as \\(\\text{H}_3\\text{PO}_4\\) ionises in steps, each with its own constant: \\(K_{a_1} > K_{a_2} > K_{a_3}\\), because a proton is harder to remove from an ion that is already negative. The overall constant is the product, \\(K = K_{a_1} K_{a_2} K_{a_3}\\).",
      formula: {
        label: "pH and weak acids",
        latex: "\\text{pH} = -\\log[\\text{H}^+], \\qquad K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}, \\qquad [\\text{H}^+] = \\sqrt{K_a c}, \\qquad K_a K_b = K_w",
        symbols: [
          { symbol: "\\(K_w\\)", meaning: "ionic product of water" },
          { symbol: "\\(K_a\\)", meaning: "ionisation constant of the weak acid" },
          { symbol: "\\(c\\)", meaning: "concentration of the weak acid" },
          { symbol: "\\(\\alpha\\)", meaning: "degree of ionisation" },
        ],
      },
      authoredExample: {
        prompt:
          "A weak acid HA has \\(K_a = 1.0 \\times 10^{-5}\\). Find the pH and the degree of ionisation of a 0.1 M solution.",
        steps: [
          "\\([\\text{H}^+] = \\sqrt{K_a c} = \\sqrt{1.0 \\times 10^{-5} \\times 0.1} = \\sqrt{10^{-6}} = 10^{-3}\\) M.",
          "\\(\\text{pH} = -\\log 10^{-3} = 3\\).",
          "\\(\\alpha = \\dfrac{[\\text{H}^+]}{c} = \\dfrac{10^{-3}}{0.1} = 0.01\\), that is 1%.",
        ],
        answer: "pH 3; \\(\\alpha = 0.01\\)",
      },
      selfCheckExample: {
        prompt: "Find the pH of 0.001 M NaOH at 298 K.",
        steps: [
          "NaOH is a strong base, so \\([\\text{OH}^-] = 10^{-3}\\) M and pOH = 3.",
          "\\(\\text{pH} = 14 - 3 = 11\\).",
        ],
        answer: "pH 11",
      },
      practiceSet: [
        { prompt: "Find the pH of 0.01 M HCl.", answer: "2" },
        { prompt: "A weak acid has \\(K_a = 2 \\times 10^{-5}\\). Find \\(K_b\\) of its conjugate base at 298 K.", answer: "\\(5 \\times 10^{-10}\\)" },
        { prompt: "A solution has pH 4 at 298 K. What is \\([\\text{OH}^-]\\)?", answer: "\\(10^{-10}\\) M" },
        { prompt: "Which is the stronger acid: one with \\(\\text{p}K_a = 3\\) or one with \\(\\text{p}K_a = 5\\)?", answer: "The one with \\(\\text{p}K_a = 3\\)" },
      ],
      pyqExampleId: "1e71761a-9937-4005-b545-f9251e9f688d",
      traps: [
        {
          title: "pH is a log scale",
          body: "A tenfold rise in \\([\\text{H}^+]\\) lowers the pH by only 1. A solution of pH 3 is ten times as acidic as one of pH 4, not one unit more.",
        },
        {
          title: "Kw is fixed only at one temperature",
          body: "\\(K_w = 1.0 \\times 10^{-14}\\) and the neutral pH of 7 hold at 298 K. At another temperature \\(K_w\\) has a different value.",
        },
        {
          title: "Each step of a polyprotic acid is weaker",
          body: "For \\(\\text{H}_3\\text{PO}_4\\), \\(K_{a_1} > K_{a_2} > K_{a_3}\\). The overall constant is their product, so its log is the sum of their logs, not their average.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncheq-indicators",
      name: "Indicators in acid-base titrations",
      visualizationSlug: "imat-titration-curve",
      intuition:
        "An indicator is a weak acid or weak base whose two forms have different colours, so it changes colour over a small range of pH. At the end point of a titration of a weak acid with a strong base, the salt formed makes the solution slightly alkaline. So the indicator chosen must change colour in the alkaline range. Phenolphthalein does: colourless in acid, pink in alkali.",
      definition:
        "- **Phenolphthalein** is colourless in acidic solution and pink in alkaline solution. It is used when a weak acid such as oxalic acid is titrated with a strong base such as NaOH.\n" +
        "- With the acid in the flask and NaOH added from the burette, the first lasting pink colour marks the end point: **colourless to pink**.\n" +
        "- **Methyl orange** is pinkish red in acidic solution and yellow in alkaline solution. It is used when a strong acid is titrated with a weak base, such as HCl with sodium carbonate.\n" +
        "- The direction of the colour change depends on which solution is in the flask and which is added.",
      table: {
        columns: ["Indicator", "Colour in acid", "Colour in alkali", "Used for"],
        rows: [
          { cells: ["Phenolphthalein", "Colourless", "Pink", "Weak acid with strong base, such as oxalic acid with NaOH"], noteAmber: "NEET 2026: titrating oxalic acid with NaOH, phenolphthalein turns colourless to pink near the end point." },
          { cells: ["Methyl orange", "Pinkish red", "Yellow", "Strong acid with weak base, such as HCl with sodium carbonate"] },
        ],
      },
      pyqExampleId: "c0c1d5e2-aed2-4b2c-a822-a4b724f33809",
      selfCheckExample: {
        prompt: "Why is phenolphthalein, and not methyl orange, used to titrate oxalic acid with sodium hydroxide?",
        steps: [
          "Oxalic acid is weak and NaOH is strong, so the salt formed leaves the solution slightly alkaline at the end point.",
          "Phenolphthalein changes colour in the alkaline range; methyl orange changes in the acidic range, before the end point.",
        ],
        answer: "The end point is slightly alkaline, where phenolphthalein changes colour",
      },
      practiceSet: [
        { prompt: "What colour is methyl orange in an alkaline solution?", answer: "Yellow" },
        { prompt: "What colour is phenolphthalein in an acidic solution?", answer: "Colourless" },
        { prompt: "At the end point of a titration of a weak acid with a strong base, is the solution acidic, neutral or slightly alkaline?", answer: "Slightly alkaline" },
        { prompt: "Which indicator is used when sodium carbonate is titrated with HCl?", answer: "Methyl orange" },
      ],
      traps: [
        {
          title: "Phenolphthalein is colourless in acid",
          body: "Phenolphthalein has no colour in acid and turns pink in alkali. It is never yellow; yellow is methyl orange in alkali.",
        },
        {
          title: "Read which way the titration runs",
          body: "Adding NaOH to an acid with phenolphthalein gives colourless to pink. Adding acid to an alkali would give pink to colourless.",
        },
      ],
    },
  ],
};
