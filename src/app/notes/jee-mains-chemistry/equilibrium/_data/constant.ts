import type { SubtopicNote } from "@/app/notes/_types";

export const CONSTANT_EQ_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium Constant and Its Forms",
  title: "Equilibrium Constant and Its Forms",
  oneLineDefinition:
    "Writing Kc and Kp from a balanced equation, leaving out solids, building a new K by reversing, scaling or adding equations, and converting Kp to Kc through the change in gas moles.",
  whyItMatters:
    "Nineteen PYQs, ten of them numerical, and four from 2026. Eight write K from the balanced equation, often with a solid that drops out; six build a new K by reversing, scaling or adding equations; five convert between Kp and Kc. Three rules cover the page.",
  concepts: [
    // C1 — law of mass action, heterogeneous equilibria
    {
      kind: "formula" as const,
      slug: "jceq-expression",
      name: "Writing K from the equation",
      intuition:
        "At equilibrium the forward and reverse rates are equal, so no amount changes any more. The amounts are constant, not equal to each other. K is products over reactants, each raised to its coefficient. A pure solid or liquid has a fixed concentration, so it is left out, and only gases and dissolved species remain.",
      definition:
        "- For \\(a\\mathrm{A}+b\\mathrm{B}\\rightleftharpoons c\\mathrm{C}+d\\mathrm{D}\\): \\(K_c=\\frac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}\\).\n" +
        "- \\(K_p\\) has the same shape with partial pressures of the gases.\n" +
        "- **Pure solids and liquids are left out** (their activity is 1).\n" +
        "- At equilibrium both rates are equal and every concentration is constant and non-zero.\n" +
        "- A physical equilibrium (liquid and vapour, a saturated solution) needs a closed system at a fixed temperature.",
      formula: {
        label: "Law of mass action",
        latex: "K_c=\\frac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}",
      },
      authoredExample: {
        prompt:
          "Solid \\(\\mathrm{NH_4Cl}\\) is heated in an evacuated flask: \\(\\mathrm{NH_4Cl(s)}\\rightleftharpoons\\mathrm{NH_3(g)}+\\mathrm{HCl(g)}\\). The total pressure at equilibrium is 0.6 atm. Find \\(K_p\\).",
        steps: [
          "The solid is left out, so \\(K_p=p_{\\mathrm{NH_3}}\\,p_{\\mathrm{HCl}}\\).",
          "The two gases form in equal amounts, so each has half the total: \\(p_{\\mathrm{NH_3}}=p_{\\mathrm{HCl}}=0.3\\) atm.",
          "\\(K_p=0.3\\times0.3=0.09\\).",
        ],
        answer: "\\(K_p=0.09\\ \\mathrm{atm^2}\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{Ag_2O(s)}\\rightleftharpoons 2\\mathrm{Ag(s)}+\\tfrac12\\mathrm{O_2(g)}\\), \\(K_p=0.2\\ \\mathrm{atm^{1/2}}\\). Find the partial pressure of oxygen at equilibrium.",
        steps: [
          "Only oxygen is a gas, so \\(K_p=p_{\\mathrm{O_2}}^{1/2}\\).",
          "\\(p_{\\mathrm{O_2}}=K_p^2=(0.2)^2=0.04\\) atm.",
        ],
        answer: "\\(0.04\\) atm.",
      },
      practiceSet: [
        {
          prompt: "Write \\(K_c\\) for \\(\\mathrm{N_2+3H_2\\rightleftharpoons 2NH_3}\\).",
          answer: "\\(\\frac{[\\mathrm{NH_3}]^2}{[\\mathrm{N_2}][\\mathrm{H_2}]^3}\\)",
        },
        {
          prompt: "Write \\(K_p\\) for \\(\\mathrm{CaCO_3(s)\\rightleftharpoons CaO(s)+CO_2(g)}\\).",
          answer: "\\(K_p=p_{\\mathrm{CO_2}}\\)",
        },
        { prompt: "For \\(\\mathrm{A}\\rightleftharpoons 2\\mathrm{B}\\), \\([\\mathrm{A}]=0.2\\) M and \\([\\mathrm{B}]=0.1\\) M. \\(K_c\\)?", answer: "\\(0.05\\)" },
        { prompt: "At equilibrium, are the reactant and product concentrations equal?", answer: "No. They are constant, not equal." },
      ],
      pyqExampleId: "00af2366-f730-4e05-8a05-703869cca4a1", // 2026 — CaCO3 and Boudouard equilibria together; solids drop out, p(CO)
      traps: [
        {
          title: "A solid left in the expression",
          body:
            "In \\(\\mathrm{C(s)+CO_2(g)\\rightleftharpoons 2CO(g)}\\), \\(K_p=p_{\\mathrm{CO}}^2/p_{\\mathrm{CO_2}}\\). Carbon does not appear. The same holds for \\(\\mathrm{CaCO_3}\\), \\(\\mathrm{CaO}\\), metals and liquid water in a reaction mixture.",
        },
        {
          title: "Equal rates, not equal amounts",
          body:
            "A concentration-time plot reaches equilibrium when every curve goes flat. The curves do not have to meet. A plot where the reactant falls to zero shows a reaction that went to completion, not an equilibrium.",
        },
      ],
    },

    // C2 — reverse, scale, add
    {
      kind: "formula" as const,
      slug: "jceq-combining",
      name: "Reversing, scaling and adding equations",
      intuition:
        "K follows the equation exactly as written. Turn the equation round and K turns upside down. Multiply every coefficient by n and every term in K is raised to the power n, so K becomes Kⁿ. Add two equations and their K values multiply, because the terms of one expression multiply the terms of the other.",
      definition:
        "- Reverse the equation: \\(K'=\\frac{1}{K}\\).\n" +
        "- Multiply every coefficient by \\(n\\): \\(K'=K^n\\). Halving gives \\(\\sqrt K\\); dividing by 3 gives \\(K^{1/3}\\).\n" +
        "- Add two equations: \\(K=K_1K_2\\).\n" +
        "- Subtract one equation from another: \\(K=\\frac{K_1}{K_2}\\).",
      formula: {
        label: "Combining equilibria",
        latex: "K_{\\text{reverse}}=\\frac1K,\\qquad K_{n\\times}=K^n,\\qquad K_{1+2}=K_1K_2",
      },
      authoredExample: {
        prompt:
          "\\(\\mathrm{A}\\rightleftharpoons 2\\mathrm{B}\\) has \\(K_1=16\\), and \\(\\mathrm{B}\\rightleftharpoons\\mathrm{C}\\) has \\(K_2=0.5\\). Find K for \\(\\mathrm{C}\\rightleftharpoons\\tfrac12\\mathrm{A}\\).",
        steps: [
          "Add the first equation to twice the second: \\(\\mathrm{A}\\rightleftharpoons 2\\mathrm{C}\\), \\(K=K_1K_2^2=16\\times0.25=4\\).",
          "Reverse it: \\(2\\mathrm{C}\\rightleftharpoons\\mathrm{A}\\), \\(K=\\frac14\\).",
          "Halve it: \\(\\mathrm{C}\\rightleftharpoons\\tfrac12\\mathrm{A}\\), \\(K=\\sqrt{1/4}=0.5\\).",
        ],
        answer: "\\(K=0.5\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{2SO_2(g)+O_2(g)\\rightleftharpoons 2SO_3(g)}\\), \\(K_c=400\\). Find \\(K_c\\) for \\(\\mathrm{SO_3(g)\\rightleftharpoons SO_2(g)+\\tfrac12O_2(g)}\\).",
        steps: [
          "Reverse: \\(K=\\frac{1}{400}\\).",
          "Halve the coefficients: \\(K=\\sqrt{\\frac{1}{400}}=\\frac{1}{20}\\).",
        ],
        answer: "\\(0.05\\).",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{A}\\rightleftharpoons\\mathrm{B}\\) has \\(K=100\\). K for \\(\\mathrm{B}\\rightleftharpoons\\mathrm{A}\\)?", answer: "\\(0.01\\)" },
        { prompt: "\\(2\\mathrm{A}\\rightleftharpoons\\mathrm{B}\\) has \\(K=9\\). K for \\(\\mathrm{A}\\rightleftharpoons\\tfrac12\\mathrm{B}\\)?", answer: "\\(3\\)" },
        { prompt: "Two equations with \\(K_1=2\\) and \\(K_2=5\\) are added. K?", answer: "\\(10\\)" },
        {
          prompt: "\\(\\mathrm{X}\\rightleftharpoons\\mathrm{Y}\\) has \\(K=4\\) and \\(\\mathrm{X}\\rightleftharpoons\\mathrm{Z}\\) has \\(K=8\\). K for \\(\\mathrm{Y}\\rightleftharpoons\\mathrm{Z}\\)?",
          answer: "\\(2\\)",
          method: "Subtract the first from the second: \\(8/4\\).",
        },
      ],
      pyqExampleId: "b2a791f4-7778-4a33-bca9-0792fe79b2c1", // 2026 — reverse and halve K1, then add K2
      traps: [
        {
          title: "Added equations multiply their K",
          body:
            "For \\(\\mathrm{X\\rightleftharpoons Y}\\), \\(\\mathrm{Y\\rightleftharpoons Z}\\) and \\(\\mathrm{Z\\rightleftharpoons W}\\) with \\(K=1,2,4\\), the K for \\(\\mathrm{X\\rightleftharpoons W}\\) is \\(1\\times2\\times4=8\\), not the sum 7.",
        },
        {
          title: "Scaling is a power, not a factor",
          body:
            "Dividing every coefficient by 3 turns K into \\(K^{1/3}\\), not \\(K/3\\). For \\(K=2.7\\times10^{-5}\\) that is \\(3\\times10^{-2}\\). Cubing it, or taking a square root, are the offered wrong answers.",
        },
      ],
    },

    // C3 — Kp and Kc
    {
      kind: "formula" as const,
      slug: "jceq-kp-kc",
      name: "Kp and Kc through the change in gas moles",
      intuition:
        "A partial pressure is a concentration times RT, because p = (n/V)RT. So each gas term in Kp carries one factor of RT. The factors cancel between top and bottom except for the extra gas moles, which is why only Δn, the gas moles of products minus the gas moles of reactants, appears.",
      definition:
        "- \\(K_p=K_c(RT)^{\\Delta n}\\), where \\(\\Delta n\\) = gas moles of products − gas moles of reactants.\n" +
        "- Count **gases only**. Solids and liquids add nothing to \\(\\Delta n\\).\n" +
        "- With \\(K_p\\) in atm, use \\(R=0.0821\\ \\mathrm{L\\,atm\\,K^{-1}mol^{-1}}\\).\n" +
        "- \\(\\Delta n=0\\): \\(K_p=K_c\\), and neither R nor T matters.\n" +
        "- A fractional \\(\\Delta n\\) gives a root: \\(\\Delta n=-\\tfrac12\\) makes \\(K_p/K_c=1/\\sqrt{RT}\\).",
      formula: {
        label: "Kp and Kc",
        latex: "K_p=K_c\\,(RT)^{\\Delta n}",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{PCl_5(g)\\rightleftharpoons PCl_3(g)+Cl_2(g)}\\), \\(K_c=0.04\\) at 500 K. Find \\(K_p\\). (\\(R=0.082\\ \\mathrm{L\\,atm\\,K^{-1}mol^{-1}}\\))",
        steps: [
          "\\(\\Delta n=2-1=1\\).",
          "\\(RT=0.082\\times500=41\\).",
          "\\(K_p=0.04\\times41=1.64\\).",
        ],
        answer: "\\(K_p=1.64\\) atm.",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{2SO_2(g)+O_2(g)\\rightleftharpoons 2SO_3(g)}\\), \\(K_p=0.5\\ \\mathrm{atm^{-1}}\\) at 500 K. Find \\(K_c\\). (\\(R=0.082\\))",
        steps: [
          "\\(\\Delta n=2-3=-1\\), so \\(K_p=K_c(RT)^{-1}\\).",
          "\\(K_c=K_p\\times RT=0.5\\times41=20.5\\).",
        ],
        answer: "\\(K_c=20.5\\ \\mathrm{L\\,mol^{-1}}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\Delta n\\) for \\(\\mathrm{N_2+3H_2\\rightleftharpoons 2NH_3}\\)?", answer: "\\(-2\\)" },
        { prompt: "\\(K_p/K_c\\) for \\(\\mathrm{H_2(g)+I_2(g)\\rightleftharpoons 2HI(g)}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(K_p/K_c\\) for \\(\\mathrm{C(s)+CO_2(g)\\rightleftharpoons 2CO(g)}\\)?", answer: "\\(RT\\)", method: "Carbon is a solid, so \\(\\Delta n=2-1\\)." },
        { prompt: "\\(K_p/K_c\\) for \\(\\mathrm{NO(g)+\\tfrac12O_2(g)\\rightleftharpoons NO_2(g)}\\)?", answer: "\\((RT)^{-1/2}\\)" },
      ],
      pyqExampleId: "cc64362f-99b2-4ff4-8b60-7c4dd003ac50", // 2026 — read x and y from the ratio Kp/Kc at 400 K
      traps: [
        {
          title: "The sign of Δn",
          body:
            "For \\(\\mathrm{CO+\\tfrac12O_2\\rightleftharpoons CO_2}\\), \\(\\Delta n=1-\\tfrac32=-\\tfrac12\\), so \\(K_p/K_c=1/\\sqrt{RT}\\). Writing reactants minus products gives \\(\\sqrt{RT}\\), which is always offered.",
        },
        {
          title: "Reading Δn from a ratio",
          body:
            "At 400 K, \\(RT\\approx32.8\\). If \\(K_p/K_c\\approx33\\), then \\(\\Delta n=+1\\); if it is about \\(1/33\\), \\(\\Delta n=-1\\). Work out the ratio first, then match coefficients.",
        },
      ],
    },
  ],
};
