import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EQ_KSP_NOTE: SubtopicNote = {
  subtopicName: "Solubility Product",
  title: "Solubility Product",
  oneLineDefinition:
    "The solubility product Ksp of a sparingly soluble salt, how to get the molar solubility from it for each type of salt, the common ion effect, and when a precipitate forms.",
  whyItMatters:
    "Three NEET questions, all from 2024 or later. One ranks AgBr, Zn(OH)₂ and Hg₂Cl₂ by solubility from their Ksp values (Re-NEET 2026), one finds the pH of a solution in equilibrium with solid BiO(OH) (NEET 2026), and one compares the solubility of AgCl in 0.1 M KCl with its solubility in water (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncheq-ksp",
      name: "Solubility product and molar solubility",
      intuition:
        "A sparingly soluble salt dissolves only a little, and the solid then sits in equilibrium with its ions in the saturated solution. The solid is left out, so the equilibrium constant is just the product of the ion concentrations: the solubility product. From it you can work back to how many moles of salt dissolve per litre, the molar solubility. The formula depends on how many ions each formula unit gives.",
      definition:
        "- For \\(\\text{M}_x\\text{X}_y(s) \\rightleftharpoons x\\text{M}^{y+} + y\\text{X}^{x-}\\): \\(K_{sp} = [\\text{M}^{y+}]^{x}[\\text{X}^{x-}]^{y}\\).\n" +
        "- With molar solubility S, \\([\\text{M}^{y+}] = xS\\) and \\([\\text{X}^{x-}] = yS\\), so \\(K_{sp} = x^{x}y^{y}S^{x+y}\\).\n" +
        "- **AB** type (AgCl, AgBr, \\(\\text{BaSO}_4\\)): \\(K_{sp} = S^{2}\\).\n" +
        "- **AB₂ or A₂B** type (\\(\\text{CaF}_2\\), \\(\\text{Zn(OH)}_2\\), \\(\\text{Ag}_2\\text{CrO}_4\\)): \\(K_{sp} = 4S^{3}\\). \\(\\text{Hg}_2\\text{Cl}_2\\) gives one \\(\\text{Hg}_2^{2+}\\) and two \\(\\text{Cl}^-\\), so it is this type too.\n" +
        "- **AB₃** type: \\(K_{sp} = 27S^{4}\\).\n" +
        "- Salts of different types must be compared by S, not by \\(K_{sp}\\).\n" +
        "- From S, each ion's concentration follows. For a hydroxide, \\([\\text{OH}^-]\\) gives pOH and then pH.",
      formula: {
        label: "Solubility product",
        latex: "K_{sp} = x^{x}\\,y^{y}\\,S^{x+y}, \\qquad \\text{AB}: K_{sp} = S^{2}, \\quad \\text{AB}_2: K_{sp} = 4S^{3}, \\quad \\text{AB}_3: K_{sp} = 27S^{4}",
        symbols: [
          { symbol: "\\(S\\)", meaning: "molar solubility, mol of salt dissolved per litre" },
          { symbol: "\\(x, y\\)", meaning: "numbers of cations and anions in one formula unit" },
        ],
      },
      authoredExample: {
        prompt: "\\(K_{sp}\\) of \\(\\text{CaF}_2\\) is \\(3.2 \\times 10^{-11}\\). Find its molar solubility in water.",
        steps: [
          "\\(\\text{CaF}_2 \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{F}^-\\): \\([\\text{Ca}^{2+}] = S\\), \\([\\text{F}^-] = 2S\\).",
          "\\(K_{sp} = S(2S)^{2} = 4S^{3} = 3.2 \\times 10^{-11}\\), so \\(S^{3} = 8 \\times 10^{-12}\\).",
          "\\(S = 2 \\times 10^{-4}\\) M.",
        ],
        answer: "\\(2 \\times 10^{-4}\\) M",
      },
      selfCheckExample: {
        prompt: "The molar solubility of \\(\\text{BaSO}_4\\) in water is \\(1.0 \\times 10^{-5}\\) M. Find its \\(K_{sp}\\).",
        steps: [
          "\\(\\text{BaSO}_4\\) is an AB salt: \\([\\text{Ba}^{2+}] = [\\text{SO}_4^{2-}] = S\\).",
          "\\(K_{sp} = S^{2} = (1.0 \\times 10^{-5})^{2} = 1.0 \\times 10^{-10}\\).",
        ],
        answer: "\\(1.0 \\times 10^{-10}\\)",
      },
      practiceSet: [
        { prompt: "A salt AB has \\(K_{sp} = 1.6 \\times 10^{-9}\\). Find its molar solubility.", answer: "\\(4 \\times 10^{-5}\\) M" },
        { prompt: "Write \\(K_{sp}\\) of \\(\\text{Ag}_2\\text{CrO}_4\\) in terms of its molar solubility S.", answer: "\\(K_{sp} = 4S^{3}\\)" },
        { prompt: "A hydroxide \\(\\text{M(OH)}_2\\) has \\(K_{sp} = 4.0 \\times 10^{-15}\\). Find \\([\\text{OH}^-]\\) in its saturated solution.", answer: "\\(2 \\times 10^{-5}\\) M" },
        { prompt: "Write \\(K_{sp}\\) of an AB₃ salt in terms of its molar solubility S.", answer: "\\(K_{sp} = 27S^{4}\\)" },
      ],
      pyqExampleId: "50d100f4-4fb6-424d-8fd5-39323f7bf5f8",
      traps: [
        {
          title: "A larger Ksp is not always more soluble",
          body: "\\(K_{sp}\\) compares solubility directly only for salts of the same type. An AB₂ salt with a smaller \\(K_{sp}\\) can still dissolve more than an AB salt, so work out S for each.",
        },
        {
          title: "The anion counts twice in AB₂",
          body: "In \\(\\text{CaF}_2\\), \\([\\text{F}^-] = 2S\\), and it is squared: \\(K_{sp} = S(2S)^{2} = 4S^{3}\\), not \\(S^{3}\\) or \\(2S^{3}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-common-ion",
      name: "Common ion effect and precipitation",
      intuition:
        "If the solution already contains one of the salt's ions, the equilibrium is pushed back towards the solid, so less salt dissolves. This is the common ion effect, Le Chatelier's principle applied to solubility. The same product of ion concentrations, worked out for any mixture, tells you whether a solid will form: if it is larger than Ksp, the extra must come out as a precipitate.",
      definition:
        "- A **common ion** (an ion the salt also gives) lowers the solubility of the salt.\n" +
        "- For an AB salt in c M of a common ion, with c much larger than S: \\(S = \\dfrac{K_{sp}}{c}\\). For an AB₂ salt in c M of the common anion: \\(S = \\dfrac{K_{sp}}{c^{2}}\\).\n" +
        "- The **ionic product** \\(Q_{sp}\\) has the same form as \\(K_{sp}\\) but uses the concentrations actually present.\n" +
        "- \\(Q_{sp} > K_{sp}\\): a precipitate forms. \\(Q_{sp} = K_{sp}\\): the solution is just saturated. \\(Q_{sp} < K_{sp}\\): no precipitate; more solid can dissolve.\n" +
        "- When two solutions are mixed, find each ion's concentration in the final volume before working out \\(Q_{sp}\\).",
      formula: {
        label: "Common ion and precipitation",
        latex: "S = \\frac{K_{sp}}{c}\\ (\\text{AB in } c \\text{ M of a common ion}), \\qquad Q_{sp} > K_{sp} \\Rightarrow \\text{precipitate}",
      },
      authoredExample: {
        prompt:
          "Equal volumes of \\(2 \\times 10^{-4}\\) M \\(\\text{BaCl}_2\\) and \\(2 \\times 10^{-4}\\) M \\(\\text{Na}_2\\text{SO}_4\\) are mixed. \\(K_{sp}\\) of \\(\\text{BaSO}_4\\) is \\(1.0 \\times 10^{-10}\\). Does a precipitate form?",
        steps: [
          "Mixing equal volumes halves each concentration: \\([\\text{Ba}^{2+}] = [\\text{SO}_4^{2-}] = 1 \\times 10^{-4}\\) M.",
          "\\(Q_{sp} = (1 \\times 10^{-4})(1 \\times 10^{-4}) = 1 \\times 10^{-8}\\).",
          "\\(Q_{sp} = 10^{-8} > K_{sp} = 10^{-10}\\), so \\(\\text{BaSO}_4\\) precipitates.",
        ],
        answer: "Yes, \\(\\text{BaSO}_4\\) precipitates",
      },
      selfCheckExample: {
        prompt: "\\(K_{sp}\\) of \\(\\text{CaF}_2\\) is \\(3.2 \\times 10^{-11}\\). Find its molar solubility in 0.1 M NaF.",
        steps: [
          "\\([\\text{F}^-] \\approx 0.1\\) M from NaF, far more than the fluoride from \\(\\text{CaF}_2\\).",
          "\\(K_{sp} = S(0.1)^{2}\\), so \\(S = \\dfrac{3.2 \\times 10^{-11}}{0.01} = 3.2 \\times 10^{-9}\\) M.",
        ],
        answer: "\\(3.2 \\times 10^{-9}\\) M",
      },
      practiceSet: [
        { prompt: "Does adding NaCl increase or decrease the solubility of AgCl in water?", answer: "It decreases it" },
        { prompt: "The ionic product of a salt in a solution is less than its \\(K_{sp}\\). Does a precipitate form?", answer: "No" },
        { prompt: "\\(K_{sp}\\) of AgCl is \\(1.8 \\times 10^{-10}\\). What \\([\\text{Ag}^+]\\) is needed just to start precipitating AgCl from 0.01 M NaCl?", answer: "\\(1.8 \\times 10^{-8}\\) M" },
        { prompt: "What name is given to the lowering of a salt's solubility by an ion it shares with another solute?", answer: "The common ion effect" },
      ],
      pyqExampleId: "a7a001a1-ec2a-4280-8d47-3ee6c33d1d94",
      traps: [
        {
          title: "Square the common anion for AB₂",
          body: "For \\(\\text{CaF}_2\\) in NaF, \\(K_{sp} = S[\\text{F}^-]^{2}\\), so S is \\(K_{sp}\\) divided by the fluoride concentration squared, not by the concentration alone.",
        },
        {
          title: "Mixing dilutes both solutions",
          body: "When two solutions are mixed, each ion is now in the combined volume. With equal volumes, halve both concentrations before you compare \\(Q_{sp}\\) with \\(K_{sp}\\).",
        },
      ],
    },
  ],
};
