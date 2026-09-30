import type { SubtopicNote } from "@/app/notes/_types";

export const DISSOCIATION_EQ_NOTE: SubtopicNote = {
  subtopicName: "Degree of Dissociation and Gibbs Energy",
  title: "Degree of Dissociation and Gibbs Energy",
  oneLineDefinition:
    "Expressing Kp through the degree of dissociation α and the total pressure, and linking K to ΔG° and to ΔH° through its change with temperature.",
  whyItMatters:
    "Fifteen PYQs, eight of them numerical, and five from 2026. Ten link the degree of dissociation to Kp or K, usually as a formula to pick out; five turn K into ΔG° or read ΔH° from how K changes with temperature.",
  concepts: [
    // C1 — alpha and Kp
    {
      kind: "formula" as const,
      slug: "jceq-alpha-kp",
      name: "Degree of dissociation and Kp",
      intuition:
        "Start with 1 mol and let a fraction α break up. Every amount is then a simple expression in α, and so is the total. Each partial pressure is its mole fraction times the total pressure P. Put these into Kp and one formula links α, P and Kp for that reaction type.",
      definition:
        "- \\(\\mathrm{A\\rightleftharpoons B+C}\\): total \\(1+\\alpha\\), \\(K_p=\\frac{\\alpha^2P}{1-\\alpha^2}\\), so \\(\\alpha=\\sqrt{\\frac{K_p}{K_p+P}}\\).\n" +
        "- \\(\\mathrm{A\\rightleftharpoons 2B}\\): \\(K_p=\\frac{4\\alpha^2P}{1-\\alpha^2}\\).\n" +
        "- \\(\\mathrm{A\\rightleftharpoons B+\\tfrac12C}\\): total \\(\\frac{2+\\alpha}{2}\\), \\(K_p=\\frac{\\alpha^{3/2}P^{1/2}}{(2+\\alpha)^{1/2}(1-\\alpha)}\\). For small α, \\(\\alpha=\\left(\\frac{2K_p^2}{P}\\right)^{1/3}\\).\n" +
        "- When the products have more gas moles, a higher P lowers α.\n" +
        "- Weak electrolyte \\(\\mathrm{A_xB_y}\\) at concentration c, α small: \\(K=x^xy^yc^{x+y-1}\\alpha^{x+y}\\), so \\(\\alpha=\\left(\\frac{K}{x^xy^yc^{x+y-1}}\\right)^{1/(x+y)}\\).",
      formula: {
        label: "A ⇌ B + C",
        latex: "K_p=\\frac{\\alpha^2P}{1-\\alpha^2}\\qquad\\Longleftrightarrow\\qquad \\alpha=\\sqrt{\\frac{K_p}{K_p+P}}",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{PCl_5(g)\\rightleftharpoons PCl_3(g)+Cl_2(g)}\\), \\(K_p=1\\) atm. Find the degree of dissociation at a total pressure of 3 atm.",
        steps: [
          "From 1 mol: \\(\\mathrm{PCl_5}\\ 1-\\alpha\\), \\(\\mathrm{PCl_3}\\ \\alpha\\), \\(\\mathrm{Cl_2}\\ \\alpha\\); total \\(1+\\alpha\\).",
          "\\(K_p=\\frac{(\\frac{\\alpha}{1+\\alpha}P)^2}{\\frac{1-\\alpha}{1+\\alpha}P}=\\frac{\\alpha^2P}{1-\\alpha^2}\\).",
          "\\(\\alpha^2=\\frac{K_p}{K_p+P}=\\frac{1}{1+3}=0.25\\), so \\(\\alpha=0.5\\).",
        ],
        answer: "\\(\\alpha=0.5\\) (50% dissociated).",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{N_2O_4(g)\\rightleftharpoons 2NO_2(g)}\\) is 20% dissociated at a total pressure of 2.4 atm. Find \\(K_p\\).",
        steps: [
          "From 1 mol: \\(\\mathrm{N_2O_4}\\ 1-\\alpha\\), \\(\\mathrm{NO_2}\\ 2\\alpha\\); total \\(1+\\alpha\\).",
          "\\(K_p=\\frac{4\\alpha^2P}{1-\\alpha^2}=\\frac{4(0.04)(2.4)}{0.96}\\).",
          "\\(=\\frac{0.384}{0.96}=0.4\\).",
        ],
        answer: "\\(K_p=0.4\\) atm.",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{A\\rightleftharpoons B+C}\\), \\(K_p=1\\), \\(P=8\\). α?", answer: "\\(\\frac13\\)", method: "\\(\\alpha^2=\\frac{1}{9}\\)" },
        { prompt: "Total moles for \\(\\mathrm{A\\rightleftharpoons B+\\tfrac12C}\\) from 1 mol A?", answer: "\\(1+\\frac{\\alpha}{2}\\)" },
        { prompt: "For \\(\\mathrm{A\\rightleftharpoons 2B}\\), the pressure is raised. α?", answer: "Decreases" },
        { prompt: "K for a weak electrolyte \\(\\mathrm{A_2B_3}\\) in terms of c and α (α small)?", answer: "\\(108c^4\\alpha^5\\)" },
      ],
      pyqExampleId: "9281a8cb-f244-4c88-9008-e0a421d92d4b", // 2024 — A ⇌ B + ½C, pick the Kp–α–P relation
      traps: [
        {
          title: "Pressure pushes α down, not up",
          body:
            "From \\(\\alpha=\\sqrt{K_p/(K_p+P)}\\): when P is far larger than \\(K_p\\), α is close to 0; when \\(K_p\\) is far larger than P, α is close to 1. The options often swap these two.",
        },
        {
          title: "The fraction is K over the rest",
          body:
            "For \\(\\mathrm{A_xB_y}\\), \\(\\alpha=\\left(\\frac{K}{x^xy^yc^{x+y-1}}\\right)^{1/(x+y)}\\). The inverted fraction, or a power of \\(x+y\\) in place of the root, are the usual distractors.",
        },
      ],
    },

    // C2 — Gibbs energy and van't Hoff
    {
      kind: "formula" as const,
      slug: "jceq-gibbs",
      name: "K, ΔG° and temperature",
      intuition:
        "A reaction with a large K has a negative standard Gibbs energy change, and K = 1 means ΔG° = 0. The link is a logarithm. Temperature is the only thing that changes K, and how fast log K moves with 1/T gives ΔH°.",
      definition:
        "- \\(\\Delta G^\\circ=-RT\\ln K=-2.303\\,RT\\log K\\).\n" +
        "- \\(\\Delta G^\\circ<0\\Rightarrow K>1\\); \\(\\Delta G^\\circ=0\\Rightarrow K=1\\).\n" +
        "- From formation values: \\(\\Delta G^\\circ=\\sum\\Delta_fG^\\circ(\\text{products})-\\sum\\Delta_fG^\\circ(\\text{reactants})\\), each times its coefficient.\n" +
        "- Van't Hoff: \\(\\log K=-\\frac{\\Delta H^\\circ}{2.303R}\\cdot\\frac1T+\\text{constant}\\). The slope of \\(\\log K\\) against \\(\\frac1T\\) is \\(-\\frac{\\Delta H^\\circ}{2.303R}\\).\n" +
        "- \\(\\log\\frac{K_2}{K_1}=\\frac{\\Delta H^\\circ}{2.303R}\\left(\\frac{1}{T_1}-\\frac{1}{T_2}\\right)\\).",
      formula: {
        label: "Gibbs energy and K",
        latex: "\\Delta G^\\circ=-2.303\\,RT\\log K",
      },
      authoredExample: {
        prompt:
          "A reaction has \\(K=100\\) at 300 K. Find \\(\\Delta G^\\circ\\). (\\(R=8.314\\ \\mathrm{J\\,K^{-1}mol^{-1}}\\))",
        steps: [
          "\\(\\log K=2\\).",
          "\\(\\Delta G^\\circ=-2.303\\times8.314\\times300\\times2\\).",
          "\\(=-11\\,488\\ \\mathrm{J\\,mol^{-1}}\\).",
        ],
        answer: "\\(\\Delta G^\\circ\\approx-11.5\\ \\mathrm{kJ\\,mol^{-1}}\\).",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{A(g)\\rightleftharpoons 2B(g)}\\) is one-third dissociated at a total pressure of 2 atm and 400 K. Find \\(\\Delta G^\\circ\\).",
        steps: [
          "\\(K_p=\\frac{4\\alpha^2P}{1-\\alpha^2}=\\frac{4\\cdot\\frac19\\cdot2}{\\frac89}=1\\).",
          "\\(\\log 1=0\\), so \\(\\Delta G^\\circ=0\\).",
        ],
        answer: "\\(\\Delta G^\\circ=0\\).",
      },
      practiceSet: [
        { prompt: "\\(K=1\\). \\(\\Delta G^\\circ\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\Delta G^\\circ\\) is negative. Is K above or below 1?", answer: "Above 1" },
        {
          prompt: "The slope of \\(\\log K\\) against \\(\\frac1T\\) is \\(-500\\) K. \\(\\frac{\\Delta H^\\circ}{R}\\)?",
          answer: "\\(1151.5\\) K",
          method: "\\(2.303\\times500\\)",
        },
        {
          prompt: "\\(\\Delta_fG^\\circ\\) of A is \\(-20\\) and of B is \\(-15\\) kJ/mol. \\(\\Delta G^\\circ\\) for \\(\\mathrm{A\\rightleftharpoons 2B}\\)?",
          answer: "\\(-10\\) kJ/mol",
        },
      ],
      pyqExampleId: "c24307e1-4fad-4b8d-a97f-d89d37b9438a", // 2026 — 75% dissociation of X2Y4 at 1 atm, 600 K; |ΔG°| in kJ
      traps: [
        {
          title: "K belongs to the equation as written",
          body:
            "Doubling an equation squares K and doubles \\(\\Delta G^\\circ\\). For HI decomposition, \\(\\mathrm{HI\\rightleftharpoons\\tfrac12H_2+\\tfrac12I_2}\\) and \\(\\mathrm{2HI\\rightleftharpoons H_2+I_2}\\) give answers that differ by a factor of 2. Use the equation the question writes.",
        },
        {
          title: "Multiply the slope by 2.303",
          body:
            "The slope of a \\(\\log_{10}K\\) plot is \\(-\\frac{\\Delta H^\\circ}{2.303R}\\). A slope of \\(-100\\) gives \\(\\frac{\\Delta H^\\circ}{R}=230.3\\) K, not 100.",
        },
      ],
    },
  ],
};
