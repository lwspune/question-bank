import type { SubtopicNote } from "@/app/notes/_types";

export const HYDROLYSIS_EQ_NOTE: SubtopicNote = {
  subtopicName: "Salt Hydrolysis and Indicators",
  title: "Salt Hydrolysis and Indicators",
  oneLineDefinition:
    "Finding the pH of a salt solution from the strengths of the acid and base that formed it, and choosing an acid-base indicator by its colour-change range.",
  whyItMatters:
    "Fourteen PYQs, ten of them multiple choice, and none yet from 2026. Five find the pH of a salt solution; nine test indicators: which one suits which titration, and what form it takes in acid and in base.",
  concepts: [
    // C1 — salt hydrolysis
    {
      kind: "formula" as const,
      slug: "jceq-hydrolysis",
      name: "pH of a salt solution",
      intuition:
        "A salt's ion reacts with water only if it came from a weak partner. Acetate, from a weak acid, takes \\(\\mathrm{H^+}\\) from water and leaves \\(\\mathrm{OH^-}\\), so sodium acetate is basic. Ammonium, from a weak base, gives \\(\\mathrm{H^+}\\) to water, so ammonium chloride is acidic. When both ions hydrolyse, the stronger partner wins.",
      definition:
        "- Weak acid + strong base salt (\\(\\mathrm{CH_3COONa}\\)): basic, \\(\\mathrm{pH}=7+\\tfrac12\\mathrm{p}K_a+\\tfrac12\\log C\\), C = concentration of the anion.\n" +
        "- Strong acid + weak base salt (\\(\\mathrm{NH_4Cl}\\)): acidic, \\(\\mathrm{pH}=7-\\tfrac12\\mathrm{p}K_b-\\tfrac12\\log C\\).\n" +
        "- Weak acid + weak base salt (\\(\\mathrm{CH_3COONH_4}\\)): \\(\\mathrm{pH}=7+\\tfrac12(\\mathrm{p}K_a-\\mathrm{p}K_b)\\), independent of C.\n" +
        "- Strong acid + strong base salt (NaCl): no hydrolysis, pH 7.\n" +
        "- For an anion such as \\(\\mathrm{CO_3^{2-}}\\), use the Ka of its own conjugate acid, \\(\\mathrm{HCO_3^-}\\) (\\(K_{a2}\\) of carbonic acid). Its \\(K_h=K_w/K_{a2}\\) is far larger than that of \\(\\mathrm{NH_4^+}\\), so ammonium carbonate is basic.",
      formula: {
        label: "Salt of a weak acid and a strong base",
        latex: "\\mathrm{pH}=7+\\tfrac12\\,\\mathrm{p}K_a+\\tfrac12\\log C",
      },
      authoredExample: {
        prompt: "Find the pH of 0.1 M sodium acetate. \\(\\mathrm{p}K_a(\\mathrm{CH_3COOH})=4.74\\).",
        steps: [
          "The salt is from a weak acid and a strong base, so it is basic.",
          "\\(\\mathrm{pH}=7+\\tfrac12(4.74)+\\tfrac12\\log0.1=7+2.37-0.5\\).",
        ],
        answer: "\\(\\mathrm{pH}=8.87\\).",
      },
      selfCheckExample: {
        prompt: "Find the pH of 0.01 M \\(\\mathrm{NH_4Cl}\\). \\(\\mathrm{p}K_b(\\mathrm{NH_3})=4.74\\).",
        steps: [
          "Strong acid + weak base salt, so it is acidic.",
          "\\(\\mathrm{pH}=7-\\tfrac12(4.74)-\\tfrac12\\log0.01=7-2.37+1\\).",
        ],
        answer: "\\(\\mathrm{pH}=5.63\\).",
      },
      practiceSet: [
        { prompt: "pH of NaCl solution?", answer: "\\(7\\)" },
        { prompt: "Ammonium acetate, where Ka of the acid equals Kb of the base. pH?", answer: "\\(7\\)" },
        { prompt: "A weak acid + weak base salt with \\(\\mathrm{p}K_a=4\\), \\(\\mathrm{p}K_b=6\\). pH?", answer: "\\(6\\)" },
        { prompt: "20 mL of 0.1 M HCl + 20 mL of 0.1 M \\(\\mathrm{NH_3}\\). What is in the flask?", answer: "Only \\(\\mathrm{NH_4Cl}\\), 0.05 M" },
      ],
      pyqExampleId: "6e1d6d05-a046-4dc7-94ee-0863d7fab96a", // 2022 — NH4OH exactly neutralised by HCl; NH4Cl hydrolysis, pH 5.2
      traps: [
        {
          title: "Use the anion's concentration",
          body:
            "Calcium lactate gives two lactate ions per formula, so a 0.005 M solution has 0.01 M lactate. Put 0.01 into the formula, not 0.005.",
        },
        {
          title: "Exact neutralisation leaves a salt, not a buffer",
          body:
            "Equal moles of a weak base and HCl leave only the salt, in the total volume. Use the hydrolysis formula, not the Henderson equation, and divide by the combined volume.",
        },
      ],
    },

    // C2 — indicators (reference)
    {
      kind: "reference" as const,
      slug: "jceq-indicators",
      name: "Acid-base indicators and titrations",
      intuition:
        "An indicator is itself a weak acid or base whose two forms have different colours. It changes colour over about two pH units around its own pK. It works only if that range falls on the steep jump of the titration curve, which is why the right indicator depends on which partners are strong.",
      definition:
        "- An indicator HIn changes colour over roughly \\(\\mathrm{p}K_{In}\\pm1\\).\n" +
        "- Phenolphthalein: \\(K_{In}=4\\times10^{-10}\\) gives \\(\\mathrm{p}K_{In}\\approx9.4\\), so it starts to change near 8.4.\n" +
        "- Weak acid vs strong base: the equivalence point is above 7, so phenolphthalein.\n" +
        "- Strong acid vs weak base: the equivalence point is below 7, so methyl orange.\n" +
        "- Strong acid vs strong base: the jump is long, so either works.\n" +
        "- Weak acid vs weak base: no sharp jump, so no indicator gives a clear end point.\n" +
        "- A titration curve for acid added to a weak base falls slowly through a buffer region, then drops to an acidic equivalence point.",
      table: {
        columns: ["Indicator", "Nature", "Colour in acid, then in base", "Works around", "Used for"],
        rows: [
          {
            cells: ["Phenolphthalein", "Weak acid", "Colourless (un-ionised HIn), then pink (ionised \\(\\mathrm{In^-}\\))", "pH 8.3 to 10", "Weak acid vs strong base; strong acid vs strong base"],
            noteAmber: "It does ionise in base; the pink colour is the ionised form.",
          },
          {
            cells: ["Methyl orange", "Weak base", "Red quinonoid form, then yellow benzenoid form", "pH 3.1 to 4.4", "Strong acid vs weak base; strong acid vs strong base"],
            noteAmber: "The quinonoid (acid) form is the more deeply coloured one.",
          },
          {
            cells: ["Eriochrome black T", "Metal-ion indicator", "Wine red with \\(\\mathrm{Ca^{2+}}\\) or \\(\\mathrm{Mg^{2+}}\\), then blue when free", "pH about 10", "EDTA titrations of \\(\\mathrm{Ca^{2+}}\\) and \\(\\mathrm{Mg^{2+}}\\)"],
          },
          {
            cells: ["Diphenylamine", "Redox indicator", "Colourless when reduced, then violet when oxidised", "A change in electrode potential, not pH", "Redox titrations, such as \\(\\mathrm{Fe^{2+}}\\) with dichromate"],
          },
        ],
        caption: "Acid-base indicators respond to pH; redox indicators respond to electrode potential.",
      },
      selfCheckExample: {
        prompt:
          "Ammonia solution is titrated with HCl. Choose the indicator, and say which form it is in at the end point.",
        steps: [
          "Strong acid vs weak base: the equivalence point is acidic, so use methyl orange.",
          "At the end point the solution has turned acidic, so methyl orange is in its red quinonoid form.",
        ],
        answer: "Methyl orange, in its quinonoid form.",
      },
      practiceSet: [
        { prompt: "Colour of phenolphthalein in base?", answer: "Pink" },
        { prompt: "Colour of methyl orange in acid?", answer: "Red" },
        { prompt: "An indicator has \\(K_{In}=10^{-5}\\). Its working range?", answer: "About pH 4 to 6" },
        { prompt: "Best indicator for weak acid vs weak base?", answer: "None gives a sharp end point" },
      ],
      pyqExampleId: "6350112a-4b5b-4e80-8e0f-76584fc1b3e0", // 2023 — incorrect statement: methyl orange for weak acid vs weak base
      traps: [
        {
          title: "Phenolphthalein is an acid, and it ionises in base",
          body:
            "Phenolphthalein is colourless in acid and pink in base because its ionised form is pink. \"It does not dissociate in basic medium\" is false.",
        },
        {
          title: "Redox and acid-base indicators are not swapped",
          body:
            "Acid-base indicators respond to pH; redox indicators respond to electrode potential. A statement pair that swaps the two makes both statements false.",
        },
      ],
    },
  ],
};
