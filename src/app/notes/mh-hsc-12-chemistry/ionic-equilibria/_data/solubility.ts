import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_SOLUBILITY_NOTE: SubtopicNote = {
  subtopicName: "Solubility Product",
  title: "Solubility Product and Precipitation",
  oneLineDefinition:
    "The solubility equilibrium of a sparingly soluble salt, the solubility product Ksp and its relation to molar solubility, and how the ionic product decides whether a precipitate forms.",
  whyItMatters:
    "9 questions, three of them from board papers: the relation between solubility and solubility product for PbI₂ (2023) and for Al(OH)₃ (2024), each as the second part of a question, and the solubility of AgBr in mol dm⁻³ and in g dm⁻³ (2026). The textbook adds the ionic product and the condition of precipitation, with two solved mixing problems, and why group II and group IIIB sulfides precipitate under different conditions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccie-ksp-expression",
      name: "Solubility product and its relation to solubility",
      intuition:
        "A sparingly soluble salt dissolves only a little, and the little that dissolves is fully split into ions. These ions are in equilibrium with the undissolved solid. Because the solid's concentration is constant, the equilibrium is described by the product of the ion concentrations alone. Each ion's concentration is a multiple of the solubility S, so the solubility product is a number times a power of S.",
      definition:
        "- **Solubility equilibrium:** \\(\\text{AgCl(s)} \\rightleftharpoons \\text{Ag}^+(aq) + \\text{Cl}^-(aq)\\). The concentration of the solid is constant, so \\(K_{sp} = [\\text{Ag}^+][\\text{Cl}^-]\\).\n" +
        "- **Solubility product:** in the saturated solution of a sparingly soluble salt, the product of the equilibrium concentrations of its ions, each raised to the power equal to its coefficient in the balanced equation, at a given temperature.\n" +
        "- General salt: \\(\\text{B}_x\\text{A}_y\\text{(s)} \\rightleftharpoons x\\text{B}^{y+} + y\\text{A}^{x-}\\), \\(K_{sp} = [\\text{B}^{y+}]^x[\\text{A}^{x-}]^y\\).\n" +
        "- If S is the molar solubility, \\([\\text{B}^{y+}] = xS\\) and \\([\\text{A}^{x-}] = yS\\), so \\(K_{sp} = (xS)^x(yS)^y = x^x y^y S^{x+y}\\).\n" +
        "- Textbook results: AgBr, \\(K_{sp} = S^2\\); \\(\\text{PbI}_2\\), \\(K_{sp} = 4S^3\\); \\(\\text{Al(OH)}_3\\), \\(K_{sp} = 27S^4\\).\n" +
        "- Expressions to know: \\(\\text{BaSO}_4\\): \\([\\text{Ba}^{2+}][\\text{SO}_4^{2-}]\\); \\(\\text{CaF}_2\\): \\([\\text{Ca}^{2+}][\\text{F}^-]^2\\); \\(\\text{Bi}_2\\text{S}_3\\): \\([\\text{Bi}^{3+}]^2[\\text{S}^{2-}]^3\\); \\(\\text{Ca}_3(\\text{PO}_4)_2\\): \\([\\text{Ca}^{2+}]^3[\\text{PO}_4^{3-}]^2\\).",
      formula: {
        label: "Solubility product",
        latex: "K_{sp} = [\\text{B}^{y+}]^x[\\text{A}^{x-}]^y = x^x\\,y^y\\,S^{x+y}",
        symbols: [
          { symbol: "\\(S\\)", meaning: "molar solubility, moles dissolved per litre of saturated solution" },
          { symbol: "\\(x, y\\)", meaning: "numbers of cations and anions given by one formula unit" },
        ],
      },
      authoredExample: {
        prompt: "Obtain the relation between the solubility product and the molar solubility S of \\(\\text{Ca}_3(\\text{PO}_4)_2\\).",
        steps: [
          "\\(\\text{Ca}_3(\\text{PO}_4)_2\\text{(s)} \\rightleftharpoons 3\\text{Ca}^{2+} + 2\\text{PO}_4^{3-}\\); here \\(x = 3\\), \\(y = 2\\).",
          "At saturation \\([\\text{Ca}^{2+}] = 3S\\) and \\([\\text{PO}_4^{3-}] = 2S\\).",
          "\\(K_{sp} = [\\text{Ca}^{2+}]^3[\\text{PO}_4^{3-}]^2 = (3S)^3(2S)^2 = 27S^3 \\times 4S^2\\).",
          "\\(K_{sp} = 108\\,S^5\\).",
        ],
        answer: "\\(K_{sp} = 108\\,S^5\\)",
      },
      selfCheckExample: {
        prompt: "Write the relation between \\(K_{sp}\\) and molar solubility S for \\(\\text{Ag}_2\\text{CrO}_4\\).",
        steps: ["\\(\\text{Ag}_2\\text{CrO}_4 \\rightleftharpoons 2\\text{Ag}^+ + \\text{CrO}_4^{2-}\\).", "\\(K_{sp} = (2S)^2(S) = 4S^3\\)."],
        answer: "\\(K_{sp} = 4S^3\\)",
      },
      practiceSet: [
        { prompt: "Write the \\(K_{sp}\\) expression for \\(\\text{Bi}_2\\text{S}_3\\).", answer: "\\(K_{sp} = [\\text{Bi}^{3+}]^2[\\text{S}^{2-}]^3\\)" },
        { prompt: "Write the relation between \\(K_{sp}\\) and S for \\(\\text{Cr(OH)}_3\\).", answer: "\\(K_{sp} = 27S^4\\)" },
        { prompt: "Write the relation between \\(K_{sp}\\) and S for \\(\\text{BaSO}_4\\).", answer: "\\(K_{sp} = S^2\\)" },
      ],
      pyqExampleId: "8068ecc2-7d95-46ea-8359-580b09b74e57",
      traps: [
        {
          title: "Using the coefficient only once",
          body: "The coefficient of an ion appears twice: as a multiplier of S and as the power. For \\(\\text{Bi}_2\\text{S}_3\\), \\([\\text{Bi}^{3+}] = 2S\\) is squared and \\([\\text{S}^{2-}] = 3S\\) is cubed, giving \\(4 \\times 27\\,S^5 = 108\\,S^5\\), not \\(6S^5\\) or \\(S^5\\).",
        },
        {
          title: "Putting the solid in the expression",
          body: "The undissolved solid has a constant concentration and is left out. \\(K_{sp}\\) contains only the ion concentrations in the saturated solution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-ksp-solubility",
      name: "Calculating solubility from Ksp",
      intuition:
        "Once you know how Ksp depends on S, you can run it backwards: take the right root of Ksp to get the molar solubility. Multiply by the molar mass and you have the solubility in grams per litre.",
      definition:
        "- **Solubility:** the amount in grams that dissolves per unit volume (100 mL or 1 L) of the saturated solution.\n" +
        "- **Molar solubility:** the number of moles of a compound that dissolve to give one litre of saturated solution.\n" +
        "- Solubility in g/L = molar solubility in mol/L × molar mass in g/mol.\n" +
        "- For a salt of type AB, \\(S = \\sqrt{K_{sp}}\\); for \\(\\text{AB}_2\\), \\(S = \\sqrt[3]{K_{sp}/4}\\); for \\(\\text{AB}_3\\), \\(S = \\sqrt[4]{K_{sp}/27}\\).\n" +
        "- Before a square root, make the power of ten even, so the root is easy to take.",
      formula: {
        label: "Solubility from Ksp (AB salt)",
        latex: "S = \\sqrt{K_{sp}}\\ \\text{mol dm}^{-3}, \\qquad \\text{solubility in g dm}^{-3} = S \\times M",
      },
      authoredExample: {
        prompt:
          "The solubility product of \\(\\text{CaF}_2\\) is \\(3.2 \\times 10^{-11}\\). Calculate its solubility in mol dm\\(^{-3}\\) and in g dm\\(^{-3}\\). (Molar mass of \\(\\text{CaF}_2\\) = 78 g mol\\(^{-1}\\).)",
        steps: [
          "Given: \\(K_{sp} = 3.2 \\times 10^{-11}\\), \\(M = 78\\) g mol\\(^{-1}\\).",
          "\\(\\text{CaF}_2 \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{F}^-\\), so \\(K_{sp} = (S)(2S)^2 = 4S^3\\).",
          "\\(S^3 = \\dfrac{3.2 \\times 10^{-11}}{4} = 8 \\times 10^{-12}\\), so \\(S = 2 \\times 10^{-4}\\) mol dm\\(^{-3}\\).",
          "Solubility in g dm\\(^{-3}\\) \\(= 2 \\times 10^{-4} \\times 78 = 1.56 \\times 10^{-2}\\) g dm\\(^{-3}\\).",
        ],
        answer: "\\(2 \\times 10^{-4}\\) mol dm\\(^{-3}\\); \\(1.56 \\times 10^{-2}\\) g dm\\(^{-3}\\)",
      },
      selfCheckExample: {
        prompt: "A sparingly soluble salt of type \\(\\text{AB}_3\\) has \\(K_{sp} = 2.7 \\times 10^{-15}\\). Find its molar solubility.",
        steps: ["\\(K_{sp} = 27S^4\\), so \\(S^4 = \\dfrac{2.7 \\times 10^{-15}}{27} = 1 \\times 10^{-16}\\).", "\\(S = 1 \\times 10^{-4}\\) mol dm\\(^{-3}\\)."],
        answer: "\\(1 \\times 10^{-4}\\) mol dm\\(^{-3}\\)",
      },
      practiceSet: [
        { prompt: "The molar solubility of AgCl is \\(1.0 \\times 10^{-5}\\) mol dm\\(^{-3}\\). Find its \\(K_{sp}\\).", answer: "\\(1.0 \\times 10^{-10}\\)" },
        { prompt: "A salt of molar mass 100 g mol\\(^{-1}\\) has a molar solubility of \\(2 \\times 10^{-3}\\) mol L\\(^{-1}\\). Find its solubility in g L\\(^{-1}\\).", answer: "0.2 g L\\(^{-1}\\)" },
        { prompt: "Which has the larger molar solubility: a salt AB with \\(K_{sp} = 1 \\times 10^{-10}\\), or a salt \\(\\text{AB}_2\\) with \\(K_{sp} = 4 \\times 10^{-12}\\)?", answer: "\\(\\text{AB}_2\\): its S is \\(1 \\times 10^{-4}\\) against \\(1 \\times 10^{-5}\\) for AB, though its \\(K_{sp}\\) is smaller" },
      ],
      pyqExampleId: "94903fa8-810d-40df-929c-4f723fe494bc",
      traps: [
        {
          title: "Giving one unit when two are asked",
          body: "When the question asks for solubility in mol dm\\(^{-3}\\) AND g dm\\(^{-3}\\), each is a separate mark. Multiply the molar solubility by the molar mass for the second.",
        },
        {
          title: "Square root of an odd power of ten",
          body: "To take the square root of a number with an odd power of ten, first move one power into the number, for example \\(4.9 \\times 10^{-9} = 49 \\times 10^{-10}\\), whose root is \\(7 \\times 10^{-5}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-ionic-product",
      name: "Ionic product and the condition of precipitation",
      intuition:
        "The ionic product is written exactly like Ksp, but with whatever concentrations the ions happen to have right now. If it is bigger than Ksp, there are more ions than the solution can hold and the extra comes out as a precipitate. If it is smaller, more could dissolve and nothing precipitates.",
      definition:
        "- **Ionic product (IP):** defined in the same way as \\(K_{sp}\\), but it uses the concentrations of the ions under ANY condition; \\(K_{sp}\\) uses only the equilibrium concentrations.\n" +
        "- \\(IP = K_{sp}\\): the solution is saturated and solubility equilibrium exists.\n" +
        "- \\(IP > K_{sp}\\): the solution is supersaturated and the compound precipitates.\n" +
        "- \\(IP < K_{sp}\\): the solution is unsaturated and no precipitate forms.\n" +
        "- On mixing two solutions, first find each ion's concentration in the TOTAL volume: \\(c_{\\text{new}} = c \\times \\dfrac{V}{V_{\\text{total}}}\\). Mixing equal volumes halves each concentration.\n" +
        "- In qualitative analysis, group II sulfides precipitate from acidic \\(\\text{H}_2\\text{S}\\), where the common \\(\\text{H}^+\\) ion keeps \\([\\text{S}^{2-}]\\) very low, so their \\(K_{sp}\\) must be very low. Group IIIB sulfides need the higher \\([\\text{S}^{2-}]\\) of ammoniacal \\(\\text{H}_2\\text{S}\\), so their \\(K_{sp}\\) is higher.",
      formula: {
        label: "Condition of precipitation",
        latex: "IP > K_{sp}: \\text{precipitate}; \\quad IP = K_{sp}: \\text{saturated}; \\quad IP < K_{sp}: \\text{no precipitate}",
      },
      authoredExample: {
        prompt:
          "A solution contains 0.001 M chloride ions. Above what concentration of \\(\\text{Ag}^+\\) ions will AgCl start to precipitate? \\(K_{sp}\\) of AgCl \\(= 1.8 \\times 10^{-10}\\).",
        steps: [
          "Given: \\([\\text{Cl}^-] = 1 \\times 10^{-3}\\) M, \\(K_{sp} = 1.8 \\times 10^{-10}\\).",
          "Precipitation begins when \\(IP\\) just exceeds \\(K_{sp}\\): \\([\\text{Ag}^+][\\text{Cl}^-] > K_{sp}\\).",
          "Substitution: \\([\\text{Ag}^+] > \\dfrac{1.8 \\times 10^{-10}}{1 \\times 10^{-3}} = 1.8 \\times 10^{-7}\\) M.",
        ],
        answer: "When \\([\\text{Ag}^+]\\) exceeds \\(1.8 \\times 10^{-7}\\) M",
      },
      selfCheckExample: {
        prompt:
          "A solution has \\([\\text{Pb}^{2+}] = 0.01\\) M and \\([\\text{I}^-] = 0.01\\) M. \\(K_{sp}\\) of \\(\\text{PbI}_2 = 7.1 \\times 10^{-9}\\). Will \\(\\text{PbI}_2\\) precipitate?",
        steps: [
          "\\(IP = [\\text{Pb}^{2+}][\\text{I}^-]^2 = 0.01 \\times (0.01)^2 = 1 \\times 10^{-6}\\).",
          "\\(1 \\times 10^{-6} > 7.1 \\times 10^{-9}\\), so \\(IP > K_{sp}\\).",
        ],
        answer: "Yes, PbI₂ precipitates",
      },
      practiceSet: [
        { prompt: "Equal volumes of two solutions are mixed. What happens to the concentration of each ion?", answer: "It is halved, because the volume doubles" },
        { prompt: "What does \\(IP = K_{sp}\\) tell you about a solution?", answer: "It is just saturated; solubility equilibrium exists" },
        { prompt: "Which have the lower solubility products: group II sulfides or group IIIB sulfides?", answer: "Group II sulfides" },
      ],
      pyqExampleId: "3a2fab87-a41f-40f2-af28-ac9ba6e9e8d8",
      traps: [
        {
          title: "Forgetting the dilution on mixing",
          body: "Each solution is diluted by the other. Using the concentrations before mixing makes IP too large and can turn a 'no' into a wrong 'yes'.",
        },
        {
          title: "Leaving out the power in IP",
          body: "IP has the same powers as \\(K_{sp}\\). For \\(\\text{CaF}_2\\) the fluoride concentration is squared; leaving it unsquared changes the answer.",
        },
      ],
    },
  ],
};
