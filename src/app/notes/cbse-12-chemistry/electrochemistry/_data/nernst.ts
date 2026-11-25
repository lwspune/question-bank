import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_NERNST_NOTE: SubtopicNote = {
  subtopicName: "Nernst Equation",
  title: "Nernst Equation, Gibbs Energy and Equilibrium Constant",
  oneLineDefinition:
    "The Nernst equation for a single electrode and for a whole cell away from 1 M, how concentration changes the emf, and the links ΔrG° = −nFE°cell and E°cell = (0.059/n) log Kc.",
  whyItMatters:
    "57 questions, forty-eight of them from board papers from 2022 to 2026. Every year the board sets a cell to work out with the Nernst equation, often with n = 6 or a squared term. It also asks the potential of a single electrode (2024, 2025, 2026), ΔrG° from E°cell (every year from 2022 to 2026) and log Kc with it (2022 to 2025), E°cell back from ΔrG° (2022, 2026) or from Kc (2026), how the emf changes as concentrations change (2022, 2025, 2026), and why Kc is fixed by E°cell and not by Ecell (2026). The textbook adds NCERT's Examples 2.1 to 2.3 and its intext and exercise numericals.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcec-nernst-electrode",
      name: "Nernst equation for a single electrode",
      intuition:
        "E° is the potential of an electrode when its ions are at 1 M. Use a weaker solution and fewer ions are waiting to be reduced, so the electrode's pull for electrons drops and its potential falls. The Nernst equation tells you by how much: 0.059/n volt for every factor of ten in concentration, at 298 K.",
      definition:
        "- For the reduction \\(\\text{M}^{n+}(aq) + ne^{-} \\rightarrow \\text{M(s)}\\), the solid metal is taken as unity, so\n" +
        "- \\(E_{(\\text{M}^{n+}/\\text{M})} = E^{\\circ}_{(\\text{M}^{n+}/\\text{M})} - \\dfrac{RT}{nF}\\ln\\dfrac{1}{[\\text{M}^{n+}]}\\)\n" +
        "- At 298 K, with \\(R = 8.314\\) J K⁻¹ mol⁻¹ and \\(F = 96487\\) C mol⁻¹, \\(\\dfrac{2.303RT}{F} = 0.059\\) V, so \\(E = E^{\\circ} - \\dfrac{0.059}{n}\\log\\dfrac{1}{[\\text{M}^{n+}]}\\).\n" +
        "- Below 1 M the log term is positive, so E is **lower** than E°.\n" +
        "- **Hydrogen electrode** (H₂ at 1 bar): \\(E = -0.059\\,\\text{pH}\\).\n" +
        "- If H⁺ takes part in the half reaction, it goes into the quotient with its coefficient as a power. For \\(\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^{+} + 6e^{-} \\rightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}\\): \\(E = E^{\\circ} - \\dfrac{0.059}{6}\\log\\dfrac{[\\text{Cr}^{3+}]^2}{[\\text{Cr}_2\\text{O}_7^{2-}][\\text{H}^{+}]^{14}}\\).",
      formula: {
        label: "Electrode potential at 298 K",
        latex: "E_{(\\text{M}^{n+}/\\text{M})} = E^{\\circ}_{(\\text{M}^{n+}/\\text{M})} - \\frac{0.059}{n}\\log\\frac{1}{[\\text{M}^{n+}]}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of electrons in the half reaction" },
          { symbol: "\\([\\text{M}^{n+}]\\)", meaning: "concentration of the metal ion in mol L⁻¹" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the potential of a copper electrode dipping in 0.001 M Cu²⁺ solution at 298 K. E° of Cu²⁺|Cu = +0.34 V.",
        steps: [
          "Given: \\(E^{\\circ} = +0.34\\) V, \\([\\text{Cu}^{2+}] = 10^{-3}\\) M, \\(n = 2\\) for \\(\\text{Cu}^{2+} + 2e^{-} \\rightarrow \\text{Cu}\\).",
          "Formula: \\(E = E^{\\circ} - \\dfrac{0.059}{n}\\log\\dfrac{1}{[\\text{Cu}^{2+}]}\\).",
          "Substitution: \\(E = 0.34 - \\dfrac{0.059}{2}\\log\\dfrac{1}{10^{-3}} = 0.34 - 0.0295 \\times 3\\).",
          "\\(E = 0.34 - 0.0885 = 0.2515\\) V.",
        ],
        answer: "E = 0.2515 V (about 0.25 V)",
      },
      selfCheckExample: {
        prompt: "Find the potential of a hydrogen electrode (H₂ at 1 bar) in a solution of pH 3 at 298 K.",
        steps: ["\\(E = -0.059 \\times \\text{pH}\\).", "\\(E = -0.059 \\times 3 = -0.177\\) V."],
        answer: "−0.177 V",
      },
      practiceSet: [
        {
          prompt: "Find the potential of a silver electrode in 0.001 M Ag⁺ at 298 K. E° of Ag⁺|Ag = +0.80 V.",
          answer: "\\(E = 0.80 - 0.059\\log 10^{3} = 0.80 - 0.177 = 0.623\\) V",
        },
        {
          prompt: "A nickel rod dips in 0.1 M Ni²⁺ at 298 K. E° of Ni²⁺|Ni = −0.25 V. Find its electrode potential.",
          answer: "\\(E = -0.25 - 0.0295\\log 10 = -0.2795\\) V",
        },
        {
          prompt: "If the concentration of the metal ion is lowered, does the electrode potential become more positive or more negative?",
          answer: "More negative: the term \\(\\dfrac{0.059}{n}\\log\\dfrac{1}{[\\text{M}^{n+}]}\\) grows and is subtracted",
        },
      ],
      pyqExampleId: "01449e90-5225-4133-a2a5-d99e1a6082fd",
      traps: [
        {
          title: "Putting the ion on top of the fraction",
          body: "For an electrode written as a reduction the quotient is \\(1/[\\text{M}^{n+}]\\), not \\([\\text{M}^{n+}]\\). With the fraction upside down the correction comes out with the wrong sign.",
        },
        {
          title: "Forgetting the power on H⁺",
          body: "In a half reaction like the dichromate one, [H⁺] carries its coefficient (14) as a power. A small change in pH then moves the potential a lot; missing the power loses the step mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-nernst-cell",
      name: "Nernst equation for a cell",
      intuition:
        "A cell's emf is its standard emf corrected for the concentrations actually present. Products piling up push back against the reaction and lower the emf; more reactant pushes it forward and raises the emf. As a cell runs, products build up, so its voltage falls until it reaches zero at equilibrium.",
      definition:
        "- Write the cell reaction with the anode (left electrode) oxidised and the cathode (right electrode) reduced, and balance the electrons to find **n**.\n" +
        "- For \\(a\\text{A} + b\\text{B} \\rightarrow c\\text{C} + d\\text{D}\\): \\(E_{cell} = E^{\\circ}_{cell} - \\dfrac{RT}{nF}\\ln\\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}\\).\n" +
        "- At 298 K: \\(E_{cell} = E^{\\circ}_{cell} - \\dfrac{0.059}{n}\\log Q\\), with products over reactants.\n" +
        "- Pure solids and liquids are taken as unity. A gas at 1 bar contributes 1; a gas at another pressure enters as its pressure.\n" +
        "- Each concentration is raised to its coefficient in the **balanced** equation: in \\(\\text{Zn} + 2\\text{Ag}^{+}\\) the silver term is squared.\n" +
        "- **Effect of concentration:** raising a reactant ion (in the denominator) **raises** \\(E_{cell}\\); raising a product ion (in the numerator) **lowers** it.\n" +
        "- As the cell works, Q rises and \\(E_{cell}\\) falls; at equilibrium \\(E_{cell} = 0\\) and the concentrations stop changing.",
      formula: {
        label: "Cell emf at 298 K",
        latex: "E_{cell} = E^{\\circ}_{cell} - \\frac{0.059}{n}\\log\\frac{[\\text{products}]}{[\\text{reactants}]}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "electrons transferred in the balanced cell reaction" },
          { symbol: "\\(Q\\)", meaning: "reaction quotient: product concentrations over reactant concentrations, each to the power of its coefficient" },
        ],
      },
      authoredExample: {
        prompt:
          "Calculate the emf of the cell Ni(s) | Ni²⁺(0.02 M) || Cu²⁺(0.2 M) | Cu(s) at 298 K. E° of Ni²⁺|Ni = −0.25 V, E° of Cu²⁺|Cu = +0.34 V.",
        steps: [
          "Given: Ni is the anode (left), Cu the cathode (right). \\(E^{\\circ}_{cell} = 0.34 - (-0.25) = 0.59\\) V.",
          "Cell reaction: \\(\\text{Ni(s)} + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Ni}^{2+}(aq) + \\text{Cu(s)}\\), so \\(n = 2\\).",
          "Formula: \\(E_{cell} = E^{\\circ}_{cell} - \\dfrac{0.059}{2}\\log\\dfrac{[\\text{Ni}^{2+}]}{[\\text{Cu}^{2+}]}\\).",
          "Substitution: \\(E_{cell} = 0.59 - 0.0295\\log\\dfrac{0.02}{0.2} = 0.59 - 0.0295\\log 10^{-1}\\).",
          "\\(E_{cell} = 0.59 + 0.0295 = 0.6195\\) V.",
        ],
        answer: "Ecell = 0.6195 V (about 0.62 V)",
      },
      selfCheckExample: {
        prompt:
          "Find the emf at 298 K of Al(s) | Al³⁺(0.001 M) || Fe²⁺(0.001 M) | Fe(s). E° of Al³⁺|Al = −1.66 V, E° of Fe²⁺|Fe = −0.44 V.",
        steps: [
          "\\(E^{\\circ}_{cell} = -0.44 - (-1.66) = 1.22\\) V. Reaction \\(2\\text{Al} + 3\\text{Fe}^{2+} \\rightarrow 2\\text{Al}^{3+} + 3\\text{Fe}\\), so \\(n = 6\\).",
          "\\(Q = \\dfrac{(10^{-3})^2}{(10^{-3})^3} = 10^{3}\\).",
          "\\(E_{cell} = 1.22 - \\dfrac{0.059}{6} \\times 3 = 1.22 - 0.0295\\).",
        ],
        answer: "1.1905 V",
      },
      practiceSet: [
        {
          prompt: "Find the emf at 298 K of Cd(s) | Cd²⁺(0.002 M) || Ni²⁺(0.02 M) | Ni(s). E° of Cd²⁺|Cd = −0.40 V, E° of Ni²⁺|Ni = −0.25 V.",
          answer: "\\(E^{\\circ}_{cell} = 0.15\\) V; \\(E_{cell} = 0.15 - 0.0295\\log\\dfrac{0.002}{0.02} = 0.15 + 0.0295 = 0.1795\\) V",
        },
        {
          prompt: "For the Daniell cell Zn | Zn²⁺(1 M) || Cu²⁺(1 M) | Cu, E°cell = 1.10 V. What is Ecell?",
          answer: "1.10 V. With both ions at 1 M, Q = 1 and log Q = 0, so Ecell = E°cell",
        },
        {
          prompt: "As a Daniell cell gives current for a long time, what happens to its voltage, and what is the voltage when the reaction reaches equilibrium?",
          answer: "It falls steadily, because [Zn²⁺] rises and [Cu²⁺] falls; at equilibrium it is zero",
        },
      ],
      pyqExampleId: "c1d2266e-138f-451c-899c-8b280b5d6758",
      traps: [
        {
          title: "Wrong n for a 3 : 2 cell",
          body: "In a cell such as Al with Ni²⁺, aluminium gives 3 electrons and nickel takes 2, so the balanced reaction transfers 6. Taking n = 3 or n = 2 is the commonest lost mark in board numericals.",
        },
        {
          title: "Dropping the square",
          body: "When the balanced equation has 2Ag⁺, the quotient has [Ag⁺]². Square the concentration before taking the log.",
        },
        {
          title: "Turning the quotient upside down",
          body: "Q is products over reactants for the reaction as written, so the anode's ion goes on top and the cathode's ion below. Inverting it changes the sign of the correction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-gibbs",
      name: "Cell potential and Gibbs energy",
      intuition:
        "A working cell does electrical work, and that work comes out of the reaction's Gibbs energy. The work is charge times voltage: n moles of electrons carry nF coulombs, pushed through E volts. So the Gibbs energy falls by nFE. A positive emf means a negative ΔG, which means the reaction goes by itself.",
      definition:
        "- The maximum (reversible) electrical work done by a cell equals the decrease in its Gibbs energy: \\(\\Delta_r G = -nFE_{(cell)}\\).\n" +
        "- With all species at unit concentration: \\(\\Delta_r G^{\\circ} = -nFE^{\\circ}_{(cell)}\\).\n" +
        "- \\(E_{(cell)}\\) is **intensive**; \\(\\Delta_r G\\) is **extensive**. Doubling the equation doubles n and ΔrG, but E stays the same.\n" +
        "- E positive gives ΔG negative: the reaction is spontaneous. E negative gives ΔG positive: it is not.\n" +
        "- Use F = 96500 C mol⁻¹ unless the paper gives 96487. The answer comes in J mol⁻¹; divide by 1000 for kJ mol⁻¹.\n" +
        "- Going backwards: \\(E^{\\circ}_{cell} = \\dfrac{-\\Delta_r G^{\\circ}}{nF}\\), with ΔrG° first changed to joules.",
      formula: {
        label: "Gibbs energy of the cell reaction",
        latex: "\\Delta_r G^{\\circ} = -nFE^{\\circ}_{cell}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "moles of electrons transferred in the reaction as written" },
          { symbol: "\\(F\\)", meaning: "Faraday constant, the charge on one mole of electrons (96500 C mol⁻¹)" },
        ],
      },
      authoredExample: {
        prompt: "For Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s), E°cell = 0.46 V. Calculate ΔrG° at 298 K. (F = 96500 C mol⁻¹)",
        steps: [
          "Given: \\(E^{\\circ}_{cell} = 0.46\\) V; Cu gives 2 electrons, so \\(n = 2\\).",
          "Formula: \\(\\Delta_r G^{\\circ} = -nFE^{\\circ}_{cell}\\).",
          "Substitution: \\(\\Delta_r G^{\\circ} = -2 \\times 96500\\ \\text{C mol}^{-1} \\times 0.46\\ \\text{V}\\).",
          "\\(\\Delta_r G^{\\circ} = -88780\\ \\text{J mol}^{-1} = -88.78\\ \\text{kJ mol}^{-1}\\).",
          "It is negative, so the reaction is spontaneous.",
        ],
        answer: "ΔrG° = −88.78 kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt: "A two-electron cell reaction has ΔrG° = −135.1 kJ mol⁻¹. Find E°cell. (F = 96500 C mol⁻¹)",
        steps: ["Change to joules: \\(\\Delta_r G^{\\circ} = -135100\\) J mol⁻¹.", "\\(E^{\\circ}_{cell} = \\dfrac{-\\Delta_r G^{\\circ}}{nF} = \\dfrac{135100}{2 \\times 96500} = 0.70\\) V."],
        answer: "0.70 V",
      },
      practiceSet: [
        {
          prompt: "For Mg(s) + 2Ag⁺(aq) → Mg²⁺(aq) + 2Ag(s), E°cell = 3.17 V. Find ΔrG°. (F = 96500 C mol⁻¹)",
          answer: "\\(\\Delta_r G^{\\circ} = -2 \\times 96500 \\times 3.17 = -611810\\) J mol⁻¹ \\(= -611.81\\) kJ mol⁻¹",
        },
        {
          prompt: "A cell reaction has E°cell = −0.20 V. Is it spontaneous under standard conditions?",
          answer: "No. ΔrG° = −nFE° is positive",
        },
        {
          prompt: "If a cell equation is multiplied by 2, what happens to E°cell and to ΔrG°?",
          answer: "E°cell is unchanged; ΔrG° doubles, because n doubles",
        },
      ],
      pyqExampleId: "228f4971-250b-4f4e-bcf3-d7b7d7d7f0d1",
      traps: [
        {
          title: "Leaving ΔG in kJ inside the formula",
          body: "nFE gives joules. When going from ΔrG° to E°, change kJ to J first, or the answer comes out a thousand times too small.",
        },
        {
          title: "Losing the sign",
          body: "ΔrG° must have the opposite sign to E°cell. A positive ΔrG° for a working cell shows a sign slip; write the minus sign in every line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-equilibrium",
      name: "Equilibrium constant from E°cell",
      intuition:
        "Let a cell run until it is flat. Its voltage is then zero and the reaction is at equilibrium, so Q has become K. Put Ecell = 0 into the Nernst equation and E°cell is tied to K. A bigger E°cell means a much bigger K: each 0.059/n volt multiplies K by ten.",
      definition:
        "- At equilibrium \\(E_{cell} = 0\\) and \\(Q = K_c\\), so \\(0 = E^{\\circ}_{cell} - \\dfrac{2.303RT}{nF}\\log K_c\\).\n" +
        "- Hence \\(E^{\\circ}_{cell} = \\dfrac{2.303RT}{nF}\\log K_c\\), which at 298 K is \\(E^{\\circ}_{cell} = \\dfrac{0.059}{n}\\log K_c\\).\n" +
        "- So \\(\\log K_c = \\dfrac{nE^{\\circ}_{cell}}{0.059}\\).\n" +
        "- Also \\(\\Delta_r G^{\\circ} = -RT\\ln K = -2.303RT\\log K\\), so \\(\\log K_c = \\dfrac{-\\Delta_r G^{\\circ}}{2.303RT}\\). Both routes give nearly the same number.\n" +
        "- **Why E°cell and not Ecell?** Ecell depends on the concentrations present at that moment and falls to zero at equilibrium; Kc is a fixed number for the reaction at a given temperature, so only the fixed E°cell can decide it.",
      formula: {
        label: "Equilibrium constant at 298 K",
        latex: "E^{\\circ}_{cell} = \\frac{0.059}{n}\\log K_c, \\qquad \\Delta_r G^{\\circ} = -2.303RT\\log K_c",
      },
      authoredExample: {
        prompt: "For Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s), E°cell = 1.10 V. Calculate log Kc and Kc at 298 K.",
        steps: [
          "Given: \\(E^{\\circ}_{cell} = 1.10\\) V, \\(n = 2\\).",
          "Formula: \\(\\log K_c = \\dfrac{nE^{\\circ}_{cell}}{0.059}\\).",
          "Substitution: \\(\\log K_c = \\dfrac{2 \\times 1.10}{0.059} = \\dfrac{2.20}{0.059} = 37.29\\).",
          "\\(K_c = 10^{37.29} = 1.9 \\times 10^{37}\\).",
        ],
        answer: "log Kc = 37.29; Kc ≈ 1.9 × 10³⁷",
      },
      selfCheckExample: {
        prompt: "A one-electron cell reaction has E°cell = 0.059 V at 298 K. Find Kc.",
        steps: ["\\(\\log K_c = \\dfrac{1 \\times 0.059}{0.059} = 1\\).", "\\(K_c = 10\\)."],
        answer: "Kc = 10",
      },
      practiceSet: [
        {
          prompt: "A two-electron reaction has Kc = 10¹⁰ at 298 K. Find E°cell.",
          answer: "\\(E^{\\circ}_{cell} = \\dfrac{0.059}{2}\\log 10^{10} = 0.0295 \\times 10 = 0.295\\) V",
        },
        {
          prompt: "A reaction has ΔrG° = −11.4 kJ mol⁻¹ at 298 K. Find log K. (R = 8.314 J K⁻¹ mol⁻¹)",
          answer: "\\(\\log K = \\dfrac{11400}{2.303 \\times 8.314 \\times 298} = \\dfrac{11400}{5706} = 2.00\\), so K ≈ 100",
        },
        {
          prompt: "What is the emf of a cell whose reaction has reached equilibrium?",
          answer: "Zero",
        },
      ],
      pyqExampleId: "b3d704de-0795-4899-b217-659586292734",
      traps: [
        {
          title: "Using Ecell in place of E°cell",
          body: "The equilibrium constant comes from the standard emf only. Ecell is zero at equilibrium, so it can never give K.",
        },
        {
          title: "Stopping at log Kc when Kc is asked",
          body: "If the question asks for Kc, take the antilog and write the answer as a number times a power of ten. Read whether log Kc or Kc is wanted.",
        },
      ],
    },
  ],
};
