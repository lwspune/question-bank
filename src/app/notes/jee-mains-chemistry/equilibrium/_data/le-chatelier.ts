import type { SubtopicNote } from "@/app/notes/_types";

export const LE_CHATELIER_EQ_NOTE: SubtopicNote = {
  subtopicName: "Le Chatelier's Principle",
  title: "Le Chatelier's Principle",
  oneLineDefinition:
    "Predicting which way an equilibrium moves when concentration, pressure, temperature, an inert gas or a catalyst changes, and computing the new equilibrium after a species is added.",
  whyItMatters:
    "Eleven PYQs, eight of them multiple choice, and three from 2026. Seven ask which way an equilibrium moves when pressure, temperature, an inert gas or a catalyst changes; four add a species and ask for the new amounts.",
  concepts: [
    // C1 — direction of shift (reference)
    {
      kind: "reference" as const,
      slug: "jceq-shift",
      name: "Which way the equilibrium shifts",
      intuition:
        "A system at equilibrium that is disturbed moves in the direction that partly undoes the change. Add a reactant and some of it is used up; squeeze the gas and it moves to fewer gas moles; heat it and it moves in the direction that absorbs heat. Only a change of temperature changes K itself.",
      definition:
        "- Concentration and pressure change the **position**, never K.\n" +
        "- Temperature changes K: an exothermic forward reaction has a smaller K when hot.\n" +
        "- A catalyst speeds both directions equally. It changes neither K nor the equilibrium mixture; equilibrium is only reached sooner.\n" +
        "- Pure solids and liquids are not in K, so adding more of one does not disturb the equilibrium.\n" +
        "- An inert gas matters only if it changes the partial pressures, which happens at constant pressure, not at constant volume.",
      table: {
        columns: ["Change", "Which way it shifts", "Effect on K"],
        rows: [
          { cells: ["Add a reactant gas or solute", "Forward, using up some of it", "None"] },
          { cells: ["Add a pure solid or liquid", "No shift", "None"], noteAmber: "Adding \\(\\mathrm{Fe_2O_3}\\) to the blast-furnace equilibrium changes nothing." },
          { cells: ["Raise the pressure by compressing", "Toward fewer gas moles", "None"] },
          { cells: ["Compress when \\(\\Delta n=0\\), as in \\(\\mathrm{H_2+I_2\\rightleftharpoons 2HI}\\)", "No shift", "None"] },
          { cells: ["Add an inert gas at constant volume", "No shift", "None"] },
          { cells: ["Add an inert gas at constant pressure", "Toward more gas moles", "None"], noteAmber: "The volume grows, so every partial pressure falls, like a pressure drop." },
          { cells: ["Heat an exothermic forward reaction", "Backward", "K falls"] },
          { cells: ["Heat an endothermic forward reaction", "Forward", "K rises"] },
          { cells: ["Add a catalyst", "No shift; equilibrium comes sooner", "None"] },
          { cells: ["Raise the pressure on ice and water at 0 °C", "Toward water, which takes less volume", "Melting point falls"] },
        ],
        caption: "Only temperature changes K. Every other change moves the mixture while K stays fixed.",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{N_2(g)+3H_2(g)\\rightleftharpoons 2NH_3(g)}\\), \\(\\Delta H<0\\). Which of these raise the yield of ammonia: (i) heating, (ii) compressing, (iii) removing \\(\\mathrm{NH_3}\\), (iv) adding iron as a catalyst?",
        steps: [
          "(i) The forward reaction is exothermic, so heating shifts it backward. No.",
          "(ii) 4 gas moles become 2, so compressing shifts it forward. Yes.",
          "(iii) Removing a product shifts it forward. Yes.",
          "(iv) A catalyst does not change the yield. No.",
        ],
        answer: "(ii) and (iii).",
      },
      practiceSet: [
        { prompt: "Neon is added to \\(\\mathrm{PCl_5\\rightleftharpoons PCl_3+Cl_2}\\) at constant volume. Shift?", answer: "None" },
        { prompt: "The same, at constant pressure?", answer: "Forward, toward more gas moles" },
        { prompt: "An exothermic reaction is heated. What happens to K?", answer: "K decreases" },
        { prompt: "More \\(\\mathrm{CaCO_3(s)}\\) is added to \\(\\mathrm{CaCO_3\\rightleftharpoons CaO+CO_2}\\). Shift?", answer: "None" },
      ],
      pyqExampleId: "50ca8764-c87f-4f1f-b541-f7eb7f908bc0", // 2025 — CO + 3H2 ⇌ CH4 + H2O, pressure doubled; (A) and (B) only
      traps: [
        {
          title: "Pressure moves the mixture, not K",
          body:
            "Compressing \\(\\mathrm{CO+3H_2\\rightleftharpoons CH_4+H_2O}\\) raises every concentration and shifts it forward, but K is unchanged. \"K increases because products increase\" is the offered wrong statement.",
        },
        {
          title: "Read how the inert gas is added",
          body:
            "At constant volume the partial pressures do not change, so nothing moves. At constant pressure the volume grows and the reaction shifts toward more gas moles. If the question does not say, the standard answer assumes constant volume.",
        },
      ],
    },

    // C2 — new equilibrium after a disturbance
    {
      kind: "formula" as const,
      slug: "jceq-new-equilibrium",
      name: "Finding the new equilibrium",
      intuition:
        "Le Chatelier tells you the direction; K tells you how far. K does not change when a species is added at the same temperature. So find K from the old mixture, add the new amount, and solve an ICE table that starts from the disturbed mixture.",
      definition:
        "- Step 1: K from the old equilibrium amounts.\n" +
        "- Step 2: add the species and compute Q. \\(Q>K\\): backward; \\(Q<K\\): forward.\n" +
        "- Step 3: ICE table from the disturbed mixture, solved with the same K.\n" +
        "- If \\(\\Delta n=0\\), moles can be used in place of concentrations.\n" +
        "- The new mixture only partly undoes the change: an added species ends above its old value.",
      formula: {
        label: "Same K before and after",
        latex: "K=\\frac{[\\mathrm{B}]_{\\text{old}}}{[\\mathrm{A}]_{\\text{old}}}=\\frac{[\\mathrm{B}]_{\\text{new}}}{[\\mathrm{A}]_{\\text{new}}}\\quad(\\mathrm{A\\rightleftharpoons B},\\ \\text{same }T)",
      },
      authoredExample: {
        prompt:
          "In a 1 L flask, \\(\\mathrm{A(g)\\rightleftharpoons B(g)}\\) is at equilibrium with \\([\\mathrm{A}]=0.4\\) M and \\([\\mathrm{B}]=0.8\\) M. Then 0.2 mol of B is added. Find the new concentrations.",
        steps: [
          "\\(K=\\frac{0.8}{0.4}=2\\).",
          "After adding: \\([\\mathrm{B}]=1.0\\), so \\(Q=\\frac{1.0}{0.4}=2.5>K\\). The reaction goes backward.",
          "Let x of B turn into A: \\(\\frac{1.0-x}{0.4+x}=2\\), so \\(1.0-x=0.8+2x\\) and \\(x=0.0667\\).",
          "\\([\\mathrm{A}]=0.467\\) M, \\([\\mathrm{B}]=0.933\\) M.",
        ],
        answer: "\\([\\mathrm{A}]\\approx0.467\\) M, \\([\\mathrm{B}]\\approx0.933\\) M.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{H_2(g)+I_2(g)\\rightleftharpoons 2HI(g)}\\) is at equilibrium with 1 mol \\(\\mathrm{H_2}\\), 1 mol \\(\\mathrm{I_2}\\) and 2 mol HI. Then 2 mol of HI are added at the same temperature. Find the new amounts.",
        steps: [
          "\\(\\Delta n=0\\), so use moles: \\(K=\\frac{2^2}{1\\times1}=4\\).",
          "HI is now 4 mol: \\(Q=16>4\\), so the reaction goes backward. Let x mol of \\(\\mathrm{H_2}\\) form.",
          "\\(\\frac{(4-2x)^2}{(1+x)^2}=4\\), so \\(4-2x=2(1+x)\\) and \\(x=0.5\\).",
          "\\(\\mathrm{H_2}=1.5\\), \\(\\mathrm{I_2}=1.5\\), \\(\\mathrm{HI}=3\\) mol. Check: \\(\\frac{9}{2.25}=4\\).",
        ],
        answer: "\\(\\mathrm{H_2}\\) 1.5 mol, \\(\\mathrm{I_2}\\) 1.5 mol, HI 3 mol.",
      },
      practiceSet: [
        { prompt: "After adding a species, \\(Q>K\\). Which way?", answer: "Backward" },
        { prompt: "Does adding a reactant at the same T change K?", answer: "No" },
        { prompt: "For \\(\\Delta n=0\\), may moles replace concentrations in K?", answer: "Yes, the volume cancels" },
        {
          prompt: "\\(\\mathrm{A\\rightleftharpoons B}\\), \\(K=1\\), 1 M each in 1 L. 1 mol of A is added. New \\([\\mathrm{B}]\\)?",
          answer: "\\(1.5\\) M",
          method: "\\(\\frac{1+x}{2-x}=1\\), \\(x=0.5\\)",
        },
      ],
      pyqExampleId: "fff2abe5-6c96-442c-a146-a3c0c1b88a14", // 2026 — A ⇌ B, 0.1 mol A added; new concentrations
      traps: [
        {
          title: "Start from the disturbed mixture",
          body:
            "The Initial row of the new table holds the amounts just after the addition, not the original starting amounts and not the old equilibrium without the addition.",
        },
        {
          title: "The change is only partly undone",
          body:
            "An added species ends above its old equilibrium value. In the example, B was 0.8 M, rose to 1.0 M on adding, and settles at 0.933 M. An answer that returns B to 0.8 M or below is wrong.",
        },
      ],
    },
  ],
};
