import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_RATE_LAW_NOTE: SubtopicNote = {
  subtopicName: "Rate Law, Order and Molecularity",
  title: "Rate Law, Order and Molecularity",
  oneLineDefinition:
    "Rate = k[A]ᵐ[B]ⁿ, with the exponents found by experiment; their sum is the order, which fixes how the rate responds to a change in concentration and the unit of k.",
  whyItMatters:
    "Fourteen PYQs, six of them multiple choice, and two from 2026. Five ask how the rate changes when concentrations, partial pressures or the volume change; five find the order from a table of initial rates and use it to fill a missing entry; four read the order from the unit of k or test statements about order and molecularity. Three ideas cover the page.",
  concepts: [
    // C1 — how the rate responds to a change
    {
      kind: "formula" as const,
      slug: "jckin-rate-law-change",
      name: "How the rate changes when concentrations change",
      intuition:
        "The rate law \\(r = k[A]^m[B]^n\\) says how strongly the rate feels each concentration. Multiply \\([A]\\) by \\(p\\) and the rate is multiplied by \\(p^m\\). For a single-step (elementary) reaction the exponents are the coefficients. The rate depends on concentration, not on how much solution you take.",
      definition:
        "- \\(\\dfrac{r_2}{r_1} = p^m q^n\\) when \\([A]\\) is multiplied by \\(p\\) and \\([B]\\) by \\(q\\).\n" +
        "- **Elementary** (single-step) reaction: the exponents equal the stoichiometric coefficients. Otherwise they come only from experiment.\n" +
        "- Squeezing a gas mixture to \\(\\dfrac{1}{f}\\) of its volume multiplies every concentration by \\(f\\), so the rate by \\(f^{m+n}\\).\n" +
        "- Gas reactions can use partial pressures. After some reaction, find each new partial pressure from the stoichiometry first.\n" +
        "- The rate is **intensive**: more solution at the same concentration gives the same rate; adding water dilutes it and lowers the rate.",
      formula: {
        label: "Ratio of rates",
        latex:
          "\\frac{r_2}{r_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^{m}\\left(\\frac{[B]_2}{[B]_1}\\right)^{n}",
      },
      authoredExample: {
        prompt:
          "The single-step gas reaction \\(A(g) + 2B(g) \\rightarrow C(g)\\) starts with \\(p_A = 0.8\\) atm and \\(p_B = 1.0\\) atm. Find the ratio of the initial rate to the rate when \\(p_C = 0.3\\) atm.",
        steps: [
          "Single step, so \\(r = k\\,p_A\\,p_B^2\\). Initially \\(r_1 = k(0.8)(1.0)^2 = 0.8k\\).",
          "Forming 0.3 atm of \\(C\\) uses 0.3 atm of \\(A\\) and 0.6 atm of \\(B\\): \\(p_A = 0.5\\), \\(p_B = 0.4\\).",
          "\\(r_2 = k(0.5)(0.4)^2 = 0.08k\\), so \\(\\dfrac{r_1}{r_2} = \\dfrac{0.8}{0.08} = 10\\).",
        ],
        answer: "\\(r_1 : r_2 = 10\\).",
      },
      selfCheckExample: {
        prompt:
          "For \\(r = k[X][Y]^2\\), \\([X]\\) is tripled and \\([Y]\\) is halved. By what factor does the rate change?",
        steps: ["\\(3 \\times \\left(\\tfrac12\\right)^2 = \\tfrac34\\)."],
        answer: "The rate becomes \\(0.75\\) times, a fall of 25%.",
      },
      practiceSet: [
        { prompt: "For \\(r = k[A]^2\\), \\([A]\\) is doubled. The rate becomes how many times?", answer: "\\(4\\)" },
        { prompt: "For the elementary reaction \\(\\mathrm{2NO + O_2 \\rightarrow 2NO_2}\\), the volume is halved. The rate becomes how many times?", answer: "\\(8\\)" },
        { prompt: "For \\(r = k[A]^{1/2}[B]\\), \\([A]\\) is made 4 times and \\([B]\\) halved. Change in rate?", answer: "None — \\(2 \\times \\tfrac12 = 1\\)" },
        { prompt: "A first-order reaction is run in 50 mL and in 250 mL of the same 2 M solution. Ratio of rates?", answer: "\\(1 : 1\\)" },
      ],
      pyqExampleId: "e42297ed-49fa-4e74-9eed-04e0df8e6adb", // 2024 — single-step gas reaction, r₁/r₂ from partial pressures
      traps: [
        {
          title: "Order read from the balanced equation",
          body:
            "Coefficients give the exponents only for an elementary (single-step) reaction. Otherwise the order comes from experiment: \\(\\mathrm{2N_2O_5 \\rightarrow 4NO_2 + O_2}\\) is first order, not second.",
        },
        {
          title: "More solution taken as a faster reaction",
          body:
            "The rate depends on concentration. Doubling the volume of the same solution leaves the rate unchanged; adding the same volume of water halves the concentration and lowers the rate.",
        },
      ],
    },

    // C2 — method of initial rates
    {
      kind: "formula" as const,
      slug: "jckin-initial-rates",
      name: "Order from a table of initial rates",
      intuition:
        "Pick two runs in which only one concentration changes. The rate ratio is then that concentration's ratio raised to its order. Do the same for the other reactant, then find \\(k\\) from any run and use it for a missing entry.",
      definition:
        "- Runs with \\([B]\\) fixed: \\(\\dfrac{r_2}{r_1} = \\left(\\dfrac{[A]_2}{[A]_1}\\right)^m\\), so \\(m = \\dfrac{\\log(r_2/r_1)}{\\log([A]_2/[A]_1)}\\).\n" +
        "- Repeat with \\([A]\\) fixed to get \\(n\\).\n" +
        "- \\(k = \\dfrac{r}{[A]^m[B]^n}\\) from any run; then fill the missing rate or concentration.\n" +
        "- A reactant of zero order does not affect the rate, whatever its concentration.\n" +
        "- If the table gives the rate of formation of one product, the ratios, and so the orders, are the same.",
      formula: {
        label: "Order in A from two runs",
        latex: "m = \\frac{\\log(r_2/r_1)}{\\log([A]_2/[A]_1)} \\quad ([B]\\ \\text{fixed})",
      },
      authoredExample: {
        prompt:
          "For \\(A + B \\rightarrow\\) products: run 1, \\([A] = 0.10\\) M, \\([B] = 0.10\\) M, rate \\(2.0 \\times 10^{-3}\\) M s\\(^{-1}\\); run 2, \\([A] = 0.20\\) M, \\([B] = 0.10\\) M, rate \\(8.0 \\times 10^{-3}\\); run 3, \\([A] = 0.10\\) M, \\([B] = 0.30\\) M, rate \\(6.0 \\times 10^{-3}\\). Find the orders and \\(k\\).",
        steps: [
          "Runs 1 and 2 (\\([B]\\) fixed): \\(4 = 2^m\\), so \\(m = 2\\).",
          "Runs 1 and 3 (\\([A]\\) fixed): \\(3 = 3^n\\), so \\(n = 1\\). Overall order 3.",
          "\\(k = \\dfrac{2.0 \\times 10^{-3}}{(0.10)^2(0.10)} = 2\\) L\\(^2\\) mol\\(^{-2}\\) s\\(^{-1}\\).",
        ],
        answer: "Second order in \\(A\\), first in \\(B\\); \\(k = 2\\) L\\(^2\\) mol\\(^{-2}\\) s\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A reaction is first order in \\(X\\) and zero order in \\(Y\\). With \\([X] = 0.05\\) M the rate is \\(1.5 \\times 10^{-4}\\) M s\\(^{-1}\\). Find the rate when \\([X] = 0.20\\) M and \\([Y]\\) is doubled.",
        steps: [
          "\\(k = \\dfrac{1.5 \\times 10^{-4}}{0.05} = 3 \\times 10^{-3}\\) s\\(^{-1}\\).",
          "\\([Y]\\) does not matter: rate \\(= 3 \\times 10^{-3} \\times 0.20 = 6 \\times 10^{-4}\\) M s\\(^{-1}\\).",
        ],
        answer: "\\(6 \\times 10^{-4}\\) M s\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Doubling \\([A]\\) with \\([B]\\) fixed makes the rate 8 times. Order in \\(A\\)?", answer: "\\(3\\)" },
        { prompt: "Tripling \\([B]\\) with \\([A]\\) fixed leaves the rate unchanged. Order in \\(B\\)?", answer: "\\(0\\)" },
        { prompt: "Halving \\([A]\\) halves the rate; doubling \\([B]\\) makes it 4 times. Overall order?", answer: "\\(3\\)" },
        { prompt: "Making \\([A]\\) 4 times makes the rate 2 times. Order in \\(A\\)?", answer: "\\(\\tfrac12\\)" },
      ],
      pyqExampleId: "643f877c-65cd-49b4-b85f-93e0c5cbf7bc", // 2023 — first order in A and B, fill x and y from k
      traps: [
        {
          title: "Two runs where both concentrations changed",
          body:
            "If \\([A]\\) and \\([B]\\) both change between two runs, the rate ratio mixes both orders. Choose a pair where only one changes, or divide out the factor from the order you already know.",
        },
      ],
    },

    // C3 — unit of k, order and molecularity
    {
      kind: "reference" as const,
      slug: "jckin-order-units",
      name: "Unit of the rate constant for each order, and order versus molecularity",
      intuition:
        "The rate always has the unit mol L\\(^{-1}\\) s\\(^{-1}\\), so \\(k\\) must absorb whatever the concentration terms bring. That makes the unit of \\(k\\) a label for the order. Order is measured; molecularity is a count of the particles that collide in one elementary step.",
      definition:
        "- **Order**: the sum of the exponents in the experimental rate law. It can be 0, a fraction or a whole number.\n" +
        "- **Molecularity**: the number of species that collide in one elementary step. Always 1, 2 or 3; never 0 or a fraction; defined only for an elementary step.\n" +
        "- A reactant in the equation may not appear in the rate law at all (zero order in it).\n" +
        "- Unit of \\(k\\) for order \\(n\\): \\((\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}\\). Only for zero order do the rate and \\(k\\) share a unit.\n" +
        "- The decomposition of \\(\\mathrm{N_2O_5}\\) is first order, although the equation has \\(\\mathrm{2N_2O_5}\\).",
      table: {
        columns: ["Order", "Rate law", "Unit of k", "Half-life"],
        rows: [
          { cells: ["0", "\\(r = k\\)", "mol L\\(^{-1}\\) s\\(^{-1}\\)", "\\(\\dfrac{[A]_0}{2k}\\), proportional to \\([A]_0\\)"] },
          { cells: ["1", "\\(r = k[A]\\)", "s\\(^{-1}\\)", "\\(\\dfrac{0.693}{k}\\), independent of \\([A]_0\\)"] },
          { cells: ["2", "\\(r = k[A]^2\\)", "L mol\\(^{-1}\\) s\\(^{-1}\\)", "\\(\\dfrac{1}{k[A]_0}\\), inversely proportional to \\([A]_0\\)"] },
          { cells: ["3", "\\(r = k[A]^3\\)", "L\\(^2\\) mol\\(^{-2}\\) s\\(^{-1}\\)", "Proportional to \\(\\dfrac{1}{[A]_0^2}\\)"] },
          { cells: ["\\(n\\)", "\\(r = k[A]^n\\)", "\\((\\text{mol L}^{-1})^{1-n}\\) s\\(^{-1}\\)", "Proportional to \\([A]_0^{\\,1-n}\\)"] },
        ],
        caption: "The unit of k names the order; the half-life column is used again on the zero-order page.",
      },
      selfCheckExample: {
        prompt:
          "A rate constant has the unit L\\(^2\\) mol\\(^{-2}\\) s\\(^{-1}\\). What is the order, and how does the rate change when the concentration is tripled?",
        steps: [
          "\\((\\text{mol L}^{-1})^{1-n} = \\text{mol}^{-2}\\text{L}^{2}\\) gives \\(1 - n = -2\\), so \\(n = 3\\).",
          "Rate \\(\\propto [A]^3\\): tripling gives \\(3^3 = 27\\) times.",
        ],
        answer: "Third order; the rate becomes 27 times.",
      },
      practiceSet: [
        { prompt: "Unit of \\(k\\) for a first-order reaction?", answer: "s\\(^{-1}\\)" },
        { prompt: "\\(k\\) has the unit mol L\\(^{-1}\\) s\\(^{-1}\\). Order?", answer: "Zero" },
        { prompt: "Can the molecularity of a step be \\(\\tfrac12\\)?", answer: "No — it is always 1, 2 or 3" },
        { prompt: "Order of the decomposition of \\(\\mathrm{N_2O_5}\\)?", answer: "First" },
      ],
      pyqExampleId: "74682ed1-24a5-46d2-8d40-4ce1c734f219", // 2023 — count the incorrect statements on order, molecularity, units
      traps: [
        {
          title: "Rate and k given the same unit",
          body:
            "Only for a zero-order reaction. For a first-order reaction the rate is in mol L\\(^{-1}\\) s\\(^{-1}\\) but \\(k\\) is in s\\(^{-1}\\).",
        },
        {
          title: "A fractional molecularity",
          body:
            "Order can be zero or a fraction, because it is measured. Molecularity counts colliding particles in one elementary step, so it is always 1, 2 or 3.",
        },
      ],
    },
  ],
};
