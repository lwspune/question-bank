import type { SubtopicNote } from "@/app/notes/_types";

export const KSP_EQ_NOTE: SubtopicNote = {
  subtopicName: "Solubility Product",
  title: "Solubility Product",
  oneLineDefinition:
    "Linking Ksp to the molar solubility of a sparingly soluble salt, lowering that solubility with a common ion, and deciding whether and in what order a precipitate forms.",
  whyItMatters:
    "Twenty-four PYQs, fifteen of them multiple choice, and three from 2026. Thirteen convert between Ksp and solubility; six add a common ion; five decide whether, or in what order, a precipitate forms. It is the biggest page in the chapter.",
  concepts: [
    // C1 — Ksp and solubility
    {
      kind: "formula" as const,
      slug: "jceq-ksp-solubility",
      name: "Ksp and molar solubility",
      intuition:
        "If s mol of a salt dissolves per litre, each ion's concentration is s times its count in the formula. Put those into the Ksp expression and every salt type gives a number times a power of s. The number is each count raised to itself, and the power is the total number of ions.",
      definition:
        "- \\(\\mathrm{A_xB_y}\\rightleftharpoons x\\mathrm{A^{y+}}+y\\mathrm{B^{x-}}\\): \\(K_{sp}=(xs)^x(ys)^y=x^xy^ys^{x+y}\\).\n" +
        "- AB: \\(s^2\\). \\(\\mathrm{AB_2}\\) or \\(\\mathrm{A_2B}\\): \\(4s^3\\). \\(\\mathrm{AB_3}\\), such as \\(\\mathrm{Cr(OH)_3}\\): \\(27s^4\\). \\(\\mathrm{A_2B_3}\\) or \\(\\mathrm{A_3B_2}\\): \\(108s^5\\). \\(\\mathrm{A_3B_4}\\): \\(6912s^7\\).\n" +
        "- Mass solubility to molar: divide g/L by the molar mass. A value in g per 100 mL is first multiplied by 10.\n" +
        "- Across different salt types, compare s, not Ksp.\n" +
        "- Increasing Ksp: \\(\\mathrm{HgS<PbS<AgBr<Ca(OH)_2}\\).",
      formula: {
        label: "Solubility product",
        latex: "K_{sp}=x^x\\,y^y\\,s^{x+y}\\qquad(\\mathrm{A_xB_y})",
      },
      authoredExample: {
        prompt: "\\(K_{sp}\\) of \\(\\mathrm{CaF_2}\\) is \\(3.2\\times10^{-11}\\). Find its molar solubility.",
        steps: [
          "\\(\\mathrm{CaF_2\\rightleftharpoons Ca^{2+}+2F^-}\\), so \\(K_{sp}=s(2s)^2=4s^3\\).",
          "\\(s^3=\\frac{3.2\\times10^{-11}}{4}=8\\times10^{-12}\\).",
          "\\(s=\\sqrt[3]{8\\times10^{-12}}=2\\times10^{-4}\\).",
        ],
        answer: "\\(s=2\\times10^{-4}\\ \\mathrm{mol\\,L^{-1}}\\).",
      },
      selfCheckExample: {
        prompt:
          "An \\(\\mathrm{AB_2}\\) salt (molar mass 100 g/mol) dissolves to 0.1 g per 100 mL. Find \\(K_{sp}\\).",
        steps: [
          "0.1 g per 100 mL is 1 g/L, so \\(s=\\frac{1}{100}=0.01\\) M.",
          "\\(K_{sp}=4s^3=4\\times10^{-6}\\).",
        ],
        answer: "\\(K_{sp}=4\\times10^{-6}\\).",
      },
      practiceSet: [
        { prompt: "\\(K_{sp}\\) of an AB salt is \\(1.6\\times10^{-9}\\). s?", answer: "\\(4\\times10^{-5}\\) M" },
        { prompt: "\\(K_{sp}\\) in terms of s for \\(\\mathrm{Al(OH)_3}\\)?", answer: "\\(27s^4\\)" },
        { prompt: "\\(K_{sp}\\) in terms of s for \\(\\mathrm{Ca_3(PO_4)_2}\\)?", answer: "\\(108s^5\\)" },
        { prompt: "An \\(\\mathrm{A_2B_3}\\) salt has \\(s=10^{-4}\\) M. \\(K_{sp}\\)?", answer: "\\(1.08\\times10^{-18}\\)" },
      ],
      pyqExampleId: "4660715b-d2ca-4c0b-9196-a701c423a4e1", // 2025 — zirconium phosphate, s = (Ksp/6912)^(1/7)
      traps: [
        {
          title: "Each ion is its count times s",
          body:
            "In \\(\\mathrm{Ag_2CrO_4}\\), \\([\\mathrm{Ag^+}]=2s\\), so \\(K_{sp}=(2s)^2s=4s^3\\). Writing \\(s^2\\cdot s\\) drops the factor 4.",
        },
        {
          title: "Divide first, then take the root",
          body:
            "From \\(K_{sp}=27s^4\\), \\(s=\\left(\\frac{K_{sp}}{27}\\right)^{1/4}\\). Taking the root of \\(K_{sp}\\) alone, or a square root out of habit, gives the offered wrong answers.",
        },
      ],
    },

    // C2 — common ion
    {
      kind: "formula" as const,
      slug: "jceq-common-ion",
      name: "Common ion and solubility",
      intuition:
        "If the solution already holds one of the salt's ions, the equilibrium is pushed back and much less salt dissolves. The added ion's concentration is fixed by the strong electrolyte, so it goes straight into Ksp and s is found by division. Solubility is highest in pure water.",
      definition:
        "- With the common ion at concentration C (from a strong electrolyte), put C for that ion in \\(K_{sp}\\).\n" +
        "- AB in C of \\(\\mathrm{B^-}\\): \\(s=\\frac{K_{sp}}{C}\\).\n" +
        "- \\(\\mathrm{AB_2}\\) in C of \\(\\mathrm{B^-}\\): \\(s=\\frac{K_{sp}}{C^2}\\).\n" +
        "- Count the common ion per formula: 0.02 M \\(\\mathrm{CaCl_2}\\) gives 0.04 M \\(\\mathrm{Cl^-}\\).\n" +
        "- Passing HCl gas into a saturated NaCl or \\(\\mathrm{BaCl_2}\\) solution raises \\([\\mathrm{Cl^-}]\\) and the salt precipitates.\n" +
        "- A salt of a weak acid dissolves **more** in acid: \\(\\mathrm{H^+}\\) removes its anion. For AgCN in acid, \\(s^2=\\frac{K_{sp}}{K_a}[\\mathrm{H^+}]\\).",
      formula: {
        label: "Solubility with a common ion",
        latex: "s=\\frac{K_{sp}}{C^{\\,n}}\\qquad(n=\\text{count of the common ion in the formula})",
      },
      authoredExample: {
        prompt:
          "\\(K_{sp}\\) of \\(\\mathrm{Mg(OH)_2}\\) is \\(1.2\\times10^{-11}\\). Find its molar solubility in 0.01 M NaOH.",
        steps: [
          "NaOH fixes \\([\\mathrm{OH^-}]=0.01\\) M; the little that dissolves adds almost nothing.",
          "\\(K_{sp}=[\\mathrm{Mg^{2+}}][\\mathrm{OH^-}]^2=s(0.01)^2\\).",
          "\\(s=\\frac{1.2\\times10^{-11}}{10^{-4}}=1.2\\times10^{-7}\\).",
        ],
        answer: "\\(s=1.2\\times10^{-7}\\) M.",
      },
      selfCheckExample: {
        prompt:
          "\\(K_{sp}\\) of AgCl is \\(1.8\\times10^{-10}\\). Find its molar solubility in 0.02 M \\(\\mathrm{CaCl_2}\\).",
        steps: [
          "Each \\(\\mathrm{CaCl_2}\\) gives two \\(\\mathrm{Cl^-}\\): \\([\\mathrm{Cl^-}]=0.04\\) M.",
          "\\(s=\\frac{1.8\\times10^{-10}}{0.04}=4.5\\times10^{-9}\\).",
        ],
        answer: "\\(s=4.5\\times10^{-9}\\) M.",
      },
      practiceSet: [
        { prompt: "An AB salt with \\(K_{sp}=10^{-10}\\) in 0.01 M NaB. s?", answer: "\\(10^{-8}\\) M" },
        { prompt: "An \\(\\mathrm{AB_2}\\) salt with \\(K_{sp}=4\\times10^{-12}\\) in 0.1 M NaB. s?", answer: "\\(4\\times10^{-10}\\) M" },
        { prompt: "Where is AgCl most soluble: pure water, 0.01 M KCl or 0.01 M \\(\\mathrm{AgNO_3}\\)?", answer: "Pure water" },
        { prompt: "Does a common ion change \\(K_{sp}\\)?", answer: "No, only the solubility" },
      ],
      pyqExampleId: "1e0363c4-a487-47a4-aa9e-2b055cc9f41b", // 2023 — BaSO4 in 0.1 M K2SO4, answer in g/L
      traps: [
        {
          title: "Square the common ion for AB₂",
          body:
            "For \\(\\mathrm{Zn(OH)_2}\\) in NaOH, \\(s=\\frac{K_{sp}}{[\\mathrm{OH^-}]^2}\\). Dividing by \\([\\mathrm{OH^-}]\\) once gives an answer too large by a factor of \\(1/[\\mathrm{OH^-}]\\).",
        },
        {
          title: "Convert to grams only at the end",
          body:
            "Find s in mol/L first, then multiply by the molar mass if the answer is asked in g/L. Using a mass concentration inside \\(K_{sp}\\) is wrong.",
        },
      ],
    },

    // C3 — precipitation
    {
      kind: "formula" as const,
      slug: "jceq-precipitation",
      name: "Will it precipitate, and in what order",
      intuition:
        "Write the ionic product Q in the same form as Ksp, using the concentrations actually present. If Q is more than Ksp, solid forms until Q falls back to Ksp. When a reagent is added slowly to a mixture, each salt starts to form when its own Q reaches its own Ksp, so the salt that needs the least reagent comes out first.",
      definition:
        "- Ionic product Q uses the concentrations **after** mixing. Equal volumes halve each one.\n" +
        "- \\(Q>K_{sp}\\): precipitate. \\(Q=K_{sp}\\): just saturated. \\(Q<K_{sp}\\): no precipitate.\n" +
        "- Onset for \\(\\mathrm{M(OH)_n}\\): \\([\\mathrm{OH^-}]=\\left(\\frac{K_{sp}}{[\\mathrm{M^{n+}}]}\\right)^{1/n}\\). The ion needing the smaller \\([\\mathrm{OH^-}]\\) precipitates first.\n" +
        "- The smaller Ksp does not decide the order when the salts are of different types.\n" +
        "- Sulphides: \\([\\mathrm{S^{2-}}]=\\frac{K_{a1}K_{a2}[\\mathrm{H_2S}]}{[\\mathrm{H^+}]^2}\\), so the pH controls which sulphide precipitates.",
      formula: {
        label: "Precipitation condition",
        latex: "Q>K_{sp}\\ \\Rightarrow\\ \\text{precipitate}",
      },
      authoredExample: {
        prompt:
          "Equal volumes of \\(2\\times10^{-4}\\) M \\(\\mathrm{AgNO_3}\\) and \\(2\\times10^{-4}\\) M NaCl are mixed. \\(K_{sp}(\\mathrm{AgCl})=1.8\\times10^{-10}\\). Does AgCl precipitate?",
        steps: [
          "Mixing equal volumes halves each: \\([\\mathrm{Ag^+}]=[\\mathrm{Cl^-}]=1\\times10^{-4}\\) M.",
          "\\(Q=(10^{-4})(10^{-4})=1\\times10^{-8}\\).",
          "\\(Q>K_{sp}\\), so a precipitate forms.",
        ],
        answer: "Yes, AgCl precipitates.",
      },
      selfCheckExample: {
        prompt:
          "A solution holds 0.01 M \\(\\mathrm{X^{2+}}\\) and 0.1 M \\(\\mathrm{Y^{3+}}\\). \\(K_{sp}(\\mathrm{X(OH)_2})=10^{-16}\\), \\(K_{sp}(\\mathrm{Y(OH)_3})=10^{-20}\\). NaOH is added slowly. Which hydroxide forms first?",
        steps: [
          "\\(\\mathrm{X(OH)_2}\\): \\([\\mathrm{OH^-}]=\\sqrt{10^{-16}/10^{-2}}=10^{-7}\\) M.",
          "\\(\\mathrm{Y(OH)_3}\\): \\([\\mathrm{OH^-}]=\\left(10^{-20}/10^{-1}\\right)^{1/3}=10^{-19/3}\\approx4.6\\times10^{-7}\\) M.",
          "\\(\\mathrm{X(OH)_2}\\) needs less hydroxide, so it forms first, although its Ksp is larger.",
        ],
        answer: "\\(\\mathrm{X(OH)_2}\\) precipitates first.",
      },
      practiceSet: [
        { prompt: "Equal volumes of 0.02 M solutions are mixed. Each concentration becomes?", answer: "\\(0.01\\) M" },
        { prompt: "\\(Q=K_{sp}\\). Is there a precipitate?", answer: "No, the solution is just saturated" },
        { prompt: "\\(K_{sp}(\\mathrm{M(OH)_2})=10^{-15}\\), \\([\\mathrm{M^{2+}}]=0.1\\) M. pH at which it starts to precipitate?", answer: "\\(7\\)" },
        {
          prompt: "\\([\\mathrm{H_2S}]=0.1\\) M, \\([\\mathrm{H^+}]=0.1\\) M, \\(K_{a1}K_{a2}=10^{-21}\\). \\([\\mathrm{S^{2-}}]\\)?",
          answer: "\\(10^{-20}\\) M",
        },
      ],
      pyqExampleId: "ac774be1-dbd4-4763-a513-33064753f337", // 2025 — A(OH)2 vs B(OH)3 with NH4OH; B(OH)3 first
      traps: [
        {
          title: "Mixing halves both concentrations",
          body:
            "When equal volumes of two solutions are mixed, each ion is at half its original concentration. Using the original values makes Q four times too large for an AB salt, and eight times for \\(\\mathrm{AY_2}\\).",
        },
        {
          title: "The smaller Ksp is not always first",
          body:
            "For salts of different types, compare the reagent concentration each one needs, not the Ksp values. A hydroxide with a larger Ksp can still start first.",
        },
      ],
    },
  ],
};
