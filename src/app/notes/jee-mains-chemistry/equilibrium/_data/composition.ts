import type { SubtopicNote } from "@/app/notes/_types";

export const COMPOSITION_EQ_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium Composition from ICE Tables",
  title: "Equilibrium Composition from ICE Tables",
  oneLineDefinition:
    "Tracking initial, change and equilibrium amounts to find K or the equilibrium mixture, in concentrations or in partial pressures, with Q deciding the direction and inert gases counted only in the total.",
  whyItMatters:
    "Fourteen PYQs, nine of them numerical, and two from 2026. Six track amounts through an ICE table in moles or concentration; eight work in pressures, often with an inert gas in the flask or a solid that adds no pressure. The table is the same in both.",
  concepts: [
    // C1 — ICE in concentration, Q vs K
    {
      kind: "formula" as const,
      slug: "jceq-ice-conc",
      name: "ICE tables in moles and concentration",
      intuition:
        "Write three rows under the equation: Initial, Change, Equilibrium. The change row follows the coefficients, so one unknown x fixes every amount. Put the equilibrium row into K and solve for x. If the mixture already holds products, compare Q with K first to see which way it moves.",
      definition:
        "- Work in moles; divide by the volume to get concentrations for \\(K_c\\).\n" +
        "- The change row is x times each coefficient: minus for the side that is used up, plus for the side that forms.\n" +
        "- If \\(\\Delta n=0\\), the volume cancels and moles can go straight into K.\n" +
        "- \\(Q\\) has the same form as K but uses the amounts at any moment. \\(Q<K\\): forward. \\(Q>K\\): backward. \\(Q=K\\): at equilibrium.\n" +
        "- A quadratic has two roots. Keep the one that leaves every amount positive.",
      formula: {
        label: "Reaction quotient",
        latex: "Q=\\frac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}\\ \\text{(any moment)},\\qquad Q<K\\Rightarrow\\text{forward}",
      },
      authoredExample: {
        prompt:
          "2 mol each of A and B are placed in a 5 L flask. For \\(\\mathrm{A+B\\rightleftharpoons C+D}\\), \\(K_c=9\\). Find the equilibrium concentration of C.",
        steps: [
          "Let x mol of A react. At equilibrium: A and B are \\(2-x\\), C and D are \\(x\\).",
          "\\(\\Delta n=0\\), so the volume cancels: \\(\\frac{x^2}{(2-x)^2}=9\\).",
          "Take the positive root: \\(\\frac{x}{2-x}=3\\), so \\(x=1.5\\) mol.",
          "\\([\\mathrm{C}]=\\frac{1.5}{5}=0.3\\) M.",
        ],
        answer: "\\([\\mathrm{C}]=0.3\\) M.",
      },
      selfCheckExample: {
        prompt:
          "1.0 mol of \\(\\mathrm{PCl_5}\\) is placed in a 1 L vessel. For \\(\\mathrm{PCl_5\\rightleftharpoons PCl_3+Cl_2}\\), \\(K_c=0.5\\). Find \\([\\mathrm{PCl_5}]\\) at equilibrium.",
        steps: [
          "At equilibrium: \\(\\mathrm{PCl_5}=1-x\\), \\(\\mathrm{PCl_3}=\\mathrm{Cl_2}=x\\).",
          "\\(\\frac{x^2}{1-x}=0.5\\), so \\(x^2+0.5x-0.5=0\\).",
          "\\(x=\\frac{-0.5+\\sqrt{0.25+2}}{2}=0.5\\). The other root, \\(-1\\), is impossible.",
          "\\([\\mathrm{PCl_5}]=1-0.5=0.5\\) M.",
        ],
        answer: "\\(0.5\\) M.",
      },
      practiceSet: [
        { prompt: "\\(Q=2\\) and \\(K=5\\). Which way does the reaction go?", answer: "Forward" },
        { prompt: "For \\(\\mathrm{A+B\\rightleftharpoons C+D}\\), does the flask volume change the equilibrium moles?", answer: "No, \\(\\Delta n=0\\)" },
        { prompt: "\\(\\mathrm{A\\rightleftharpoons B}\\), \\(K=1\\), 1 mol A at the start. Moles of B at equilibrium?", answer: "\\(0.5\\)" },
        { prompt: "In \\(\\mathrm{2NOCl\\rightleftharpoons 2NO+Cl_2}\\), 0.4 M NO forms. How much \\(\\mathrm{Cl_2}\\)?", answer: "\\(0.2\\) M" },
      ],
      pyqExampleId: "084d8298-fe66-4ce8-86ce-839996b63664", // 2026 — He and A in 10 L at 400 K, Kc = 4; partial pressures of He and B
      traps: [
        {
          title: "The change row follows the coefficients",
          body:
            "In \\(\\mathrm{H_2+I_2\\rightleftharpoons 2HI}\\), forming 3 mol of HI uses 1.5 mol each of \\(\\mathrm{H_2}\\) and \\(\\mathrm{I_2}\\), not 3 mol. Write x in front of each coefficient before filling the row.",
        },
        {
          title: "Check the direction before you write the table",
          body:
            "If all four species of \\(\\mathrm{A+B\\rightleftharpoons C+D}\\) start at 1 M and \\(K=100\\), then \\(Q=1<K\\), so C and D grow. A table that lets them shrink gives a root that leaves a negative amount.",
        },
      ],
    },

    // C2 — pressures, total moles, inert gas
    {
      kind: "formula" as const,
      slug: "jceq-ice-pressure",
      name: "ICE tables in partial pressures",
      intuition:
        "At a fixed volume and temperature, pressure is proportional to moles. So an ICE table can be written directly in atmospheres, and the total pressure tells you x. When only the total pressure is given, the gas law turns it into total moles. An inert gas adds to the total moles and pressure but never appears in K.",
      definition:
        "- Partial pressure: \\(p_i=\\frac{n_iRT}{V}=x_iP\\), where \\(x_i\\) is the mole fraction and P the total pressure.\n" +
        "- Total moles at equilibrium: \\(n=\\frac{PV}{RT}\\).\n" +
        "- At fixed V and T, write the ICE table in pressures and use the total to find x.\n" +
        "- An **inert gas** (He, Ar, \\(\\mathrm{N_2}\\) when it does not react) counts in the total, not in K.\n" +
        "- A solid adds nothing to the pressure: in \\(\\mathrm{C(s)+CO_2\\rightleftharpoons 2CO}\\), the total is \\(p_0+x\\).",
      formula: {
        label: "Partial pressure",
        latex: "p_i=\\frac{n_iRT}{V}=x_i\\,P",
      },
      authoredExample: {
        prompt:
          "A sealed flask holds \\(\\mathrm{N_2O_4}\\) at 0.6 atm. It reaches \\(\\mathrm{N_2O_4(g)\\rightleftharpoons 2NO_2(g)}\\) at constant volume and temperature, and the total pressure becomes 0.9 atm. Find \\(K_p\\).",
        steps: [
          "Let the \\(\\mathrm{N_2O_4}\\) pressure fall by x. Then \\(p_{\\mathrm{N_2O_4}}=0.6-x\\) and \\(p_{\\mathrm{NO_2}}=2x\\).",
          "Total: \\(0.6+x=0.9\\), so \\(x=0.3\\).",
          "\\(p_{\\mathrm{N_2O_4}}=0.3\\), \\(p_{\\mathrm{NO_2}}=0.6\\).",
          "\\(K_p=\\frac{0.6^2}{0.3}=1.2\\).",
        ],
        answer: "\\(K_p=1.2\\) atm.",
      },
      selfCheckExample: {
        prompt:
          "3 mol of \\(\\mathrm{PCl_5}\\) and 1 mol of argon are put in a 49.2 L flask at 600 K. At equilibrium, \\(\\mathrm{PCl_5\\rightleftharpoons PCl_3+Cl_2}\\), the total pressure is 5.0 atm. Find \\(K_p\\). (\\(R=0.082\\))",
        steps: [
          "\\(RT=0.082\\times600=49.2\\), so total moles \\(=\\frac{5.0\\times49.2}{49.2}=5\\).",
          "Gas moles: \\(\\mathrm{PCl_5}\\ 3-x\\), \\(\\mathrm{PCl_3}\\ x\\), \\(\\mathrm{Cl_2}\\ x\\), Ar 1. Total \\(4+x=5\\), so \\(x=1\\).",
          "Each mole gives \\(\\frac{RT}{V}=1\\) atm: \\(p_{\\mathrm{PCl_5}}=2\\), \\(p_{\\mathrm{PCl_3}}=p_{\\mathrm{Cl_2}}=1\\).",
          "\\(K_p=\\frac{1\\times1}{2}=0.5\\). Argon is left out.",
        ],
        answer: "\\(K_p=0.5\\) atm.",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{CO_2}\\) at 1 atm over hot carbon reaches a total of 1.4 atm. \\(p_{\\mathrm{CO}}\\)?", answer: "\\(0.8\\) atm" },
        { prompt: "A gas has mole fraction 0.25 at a total pressure of 4 atm. Its partial pressure?", answer: "\\(1\\) atm" },
        { prompt: "Does argon in the flask appear in \\(K_p\\)?", answer: "No, only in the total moles" },
        { prompt: "At fixed V and T, the moles of gas double. The pressure?", answer: "Doubles" },
      ],
      pyqExampleId: "12898ed3-2096-422e-b054-0d858a432d1f", // 2025 — CO2 over graphite, total pressure rises; Kp = 1.8 atm
      traps: [
        {
          title: "The inert gas is in the total, not in K",
          body:
            "Subtract the inert gas's moles before you find x, and leave it out of K. Using the total pressure as if it came only from the reacting gases gives the wrong x.",
        },
        {
          title: "Carbon adds nothing to the pressure",
          body:
            "In \\(\\mathrm{C(s)+CO_2\\rightleftharpoons 2CO}\\), x of \\(\\mathrm{CO_2}\\) gives 2x of CO, so the total rises by x, not by 2x.",
        },
      ],
    },
  ],
};
