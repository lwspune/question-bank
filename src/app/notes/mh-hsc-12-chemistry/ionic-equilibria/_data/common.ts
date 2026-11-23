import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_COMMON_NOTE: SubtopicNote = {
  subtopicName: "Common Ion Effect",
  title: "Common Ion Effect",
  oneLineDefinition:
    "How a strong electrolyte that shares an ion with a weak electrolyte suppresses its ionisation, and how a common ion lowers the solubility of a sparingly soluble salt.",
  whyItMatters:
    "5 questions, two of them from board papers: explain the common ion effect with an example (2025) and define it (2026). The textbook adds the suppression of HCN and of H₂S by HCl, and how a soluble salt with a common ion lowers the solubility of a sparingly soluble salt.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccie-common-ion",
      name: "Suppression of a weak electrolyte by a common ion",
      intuition:
        "A weak acid is in equilibrium with its ions. Pour in a strong electrolyte that supplies lots of one of those same ions, and the equilibrium is pushed back towards the whole molecules. The weak acid ionises even less than before. This is Le Chatelier's principle at work on an ionic equilibrium.",
      definition:
        "- **Common ion effect:** the ionisation of a weak electrolyte is suppressed in the presence of a strong electrolyte containing an ion common to the weak electrolyte.\n" +
        "- **Textbook example:** \\(\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+\\) (weak, slight). \\(\\text{CH}_3\\text{COONa} \\rightarrow \\text{CH}_3\\text{COO}^- + \\text{Na}^+\\) (strong, complete).\n" +
        "- The salt gives a high concentration of the common \\(\\text{CH}_3\\text{COO}^-\\) ion. By Le Chatelier's principle the dissociation of \\(\\text{CH}_3\\text{COOH}\\) shifts to the left: \\(\\text{CH}_3\\text{COO}^-\\) combines with \\(\\text{H}^+\\) to form unionised \\(\\text{CH}_3\\text{COOH}\\).\n" +
        "- It is a special case of **Le Chatelier's principle**: the stress is an increase in the concentration of one of the product ions, and it is relieved by a shift to the reactant side.\n" +
        "- The same effect: HCl suppresses the ionisation of HCN and of \\(\\text{H}_2\\text{S}\\) (common ion \\(\\text{H}^+\\)).",
      authoredExample: {
        prompt: "Explain how the ionisation of \\(\\text{NH}_4\\text{OH}\\) is suppressed by adding \\(\\text{NH}_4\\text{Cl}\\) to its solution.",
        steps: [
          "\\(\\text{NH}_4\\text{OH}\\) is a weak base and ionises slightly: \\(\\text{NH}_4\\text{OH} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-\\).",
          "\\(\\text{NH}_4\\text{Cl}\\) is a strong electrolyte and dissociates completely: \\(\\text{NH}_4\\text{Cl} \\rightarrow \\text{NH}_4^+ + \\text{Cl}^-\\).",
          "\\(\\text{NH}_4^+\\) is the common ion, and its concentration rises sharply.",
          "By Le Chatelier's principle the first equilibrium shifts to the left: \\(\\text{NH}_4^+\\) combines with \\(\\text{OH}^-\\) to form unionised \\(\\text{NH}_4\\text{OH}\\).",
        ],
        answer: "The common NH₄⁺ ion shifts the equilibrium left, so NH₄OH ionises less and [OH⁻] falls",
      },
      selfCheckExample: {
        prompt: "Name the common ion and say what happens to \\([\\text{HCOO}^-]\\) when \\(\\text{HNO}_3\\) is added to a solution of formic acid, HCOOH.",
        steps: [
          "\\(\\text{HCOOH} \\rightleftharpoons \\text{HCOO}^- + \\text{H}^+\\); \\(\\text{HNO}_3\\) gives a large \\([\\text{H}^+]\\).",
          "The equilibrium shifts to the left.",
        ],
        answer: "Common ion \\(\\text{H}^+\\); \\([\\text{HCOO}^-]\\) falls",
      },
      practiceSet: [
        { prompt: "The common ion effect is a special case of which principle?", answer: "Le Chatelier's principle" },
        { prompt: "Which is the common ion when NaCN is added to a solution of HCN?", answer: "\\(\\text{CN}^-\\)" },
        { prompt: "Does the dissociation constant \\(K_a\\) of acetic acid change when sodium acetate is added?", answer: "No. The degree of ionisation falls, but \\(K_a\\) stays the same at a given temperature" },
      ],
      pyqExampleId: "194e6605-e2cb-43df-88fe-f89d06742150",
      traps: [
        {
          title: "Shifting the equilibrium the wrong way",
          body: "Adding a product ion pushes the weak electrolyte's equilibrium to the LEFT, towards unionised molecules. Writing 'shifts to the right' reverses the whole answer.",
        },
        {
          title: "A definition without 'weak' and 'strong'",
          body: "The definition needs both words: the WEAK electrolyte is suppressed by a STRONG electrolyte that shares an ion with it. Leaving either out loses the mark.",
        },
        {
          title: "No example when one is asked",
          body: "'Explain with example' needs the two equations (the weak electrolyte's equilibrium and the strong electrolyte's full dissociation) and the direction of the shift.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-common-solubility",
      name: "Common ion and the solubility of a sparingly soluble salt",
      intuition:
        "The product of the ion concentrations in a saturated solution is fixed. If you raise one ion's concentration from outside, the other must fall, so less of the salt can stay dissolved. The extra comes out as a precipitate.",
      definition:
        "- Saturated AgCl: \\(\\text{AgCl(s)} \\rightleftharpoons \\text{Ag}^+ + \\text{Cl}^-\\), \\(K_{sp} = [\\text{Ag}^+][\\text{Cl}^-]\\).\n" +
        "- Adding \\(\\text{AgNO}_3\\) (a strong electrolyte) raises \\([\\text{Ag}^+]\\). By Le Chatelier's principle the solubility equilibrium shifts from right to left and AgCl precipitates until equilibrium is re-established.\n" +
        "- \\(K_{sp}\\) stays the same, since it is an equilibrium constant. The **solubility decreases** in the presence of a common ion.\n" +
        "- Textbook's 'Do you know': hard water is softened by adding lime, \\(\\text{Ca(OH)}_2\\). Its \\(\\text{OH}^-\\) turns \\(\\text{HCO}_3^-\\) into \\(\\text{CO}_3^{2-}\\), and since \\(K_{sp}\\) of \\(\\text{CaCO}_3\\) is very low (\\(4.5 \\times 10^{-9}\\)), IP far exceeds \\(K_{sp}\\) and \\(\\text{CaCO}_3\\) precipitates.",
      formula: {
        label: "Solubility in the presence of a common ion",
        latex: "S = \\frac{K_{sp}}{[\\text{common ion}]} \\quad (\\text{AB salt, common ion in large excess})",
      },
      authoredExample: {
        prompt:
          "\\(K_{sp}\\) of AgCl is \\(1.8 \\times 10^{-10}\\). Compare the molar solubility of AgCl in pure water with that in 0.01 M NaCl solution.",
        steps: [
          "In pure water: \\(S = \\sqrt{K_{sp}} = \\sqrt{1.8 \\times 10^{-10}} = 1.34 \\times 10^{-5}\\) mol dm\\(^{-3}\\).",
          "In 0.01 M NaCl, \\([\\text{Cl}^-] \\approx 0.01\\) M from the salt, and \\([\\text{Ag}^+] = S\\).",
          "\\(S = \\dfrac{K_{sp}}{[\\text{Cl}^-]} = \\dfrac{1.8 \\times 10^{-10}}{0.01} = 1.8 \\times 10^{-8}\\) mol dm\\(^{-3}\\).",
          "The common chloride ion has made the solubility about 750 times smaller.",
        ],
        answer: "\\(1.34 \\times 10^{-5}\\) M in water; \\(1.8 \\times 10^{-8}\\) M in 0.01 M NaCl",
      },
      selfCheckExample: {
        prompt: "Hard water containing \\(\\text{Ca}^{2+}\\) is treated with lime, \\(\\text{Ca(OH)}_2\\). Which compound precipitates, and why does adding more calcium remove calcium?",
        steps: [
          "\\(\\text{OH}^- + \\text{HCO}_3^- \\rightarrow \\text{CO}_3^{2-} + \\text{H}_2\\text{O}\\).",
          "\\(K_{sp}\\) of \\(\\text{CaCO}_3\\) is very low, so the ionic product far exceeds it.",
        ],
        answer: "\\(\\text{CaCO}_3\\) precipitates because IP becomes much larger than its \\(K_{sp}\\)",
      },
      practiceSet: [
        { prompt: "Does \\(K_{sp}\\) of AgCl change when \\(\\text{AgNO}_3\\) is added to its saturated solution?", answer: "No; only the solubility falls" },
        { prompt: "Is \\(\\text{BaSO}_4\\) more or less soluble in \\(\\text{Na}_2\\text{SO}_4\\) solution than in pure water?", answer: "Less soluble, because of the common \\(\\text{SO}_4^{2-}\\) ion" },
        { prompt: "Which salt lowers the solubility of AgCl: \\(\\text{AgNO}_3\\) or \\(\\text{KNO}_3\\)?", answer: "\\(\\text{AgNO}_3\\), which supplies the common \\(\\text{Ag}^+\\) ion" },
      ],
      pyqExampleId: "2e52b0cb-f725-446c-a53f-0fbc373a159d",
      traps: [
        {
          title: "Saying Ksp falls",
          body: "Adding a common ion lowers the SOLUBILITY, not \\(K_{sp}\\). \\(K_{sp}\\) is an equilibrium constant and changes only with temperature.",
        },
        {
          title: "Thinking a common ion makes a salt more soluble",
          body: "A common ion always pushes the solubility equilibrium towards the solid. The salt becomes LESS soluble and some of it precipitates.",
        },
      ],
    },
  ],
};
