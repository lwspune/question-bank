import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTROLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Faraday's Laws of Electrolysis",
  title: "Faraday's Laws of Electrolysis",
  oneLineDefinition:
    "In an electrolytic cell an external current forces a non-spontaneous reaction; the mass deposited or gas evolved is proportional to the charge passed, one faraday (96500 C) per mole of electrons, so W = ItM/(nF).",
  whyItMatters:
    "20 PYQs, none HARD — the most formula-bound page in the chapter. Nearly every row is W = ItM/nF solved for a mass, a charge in faradays or coulombs, a time or a current; the trap is always n (2 for Cu, Mg, Ca, Cl₂; 3 for Al; 5 for MnO₄⁻; 6 for Cr₂O₇²⁻). " +
    "Three recall rows on what molten and aqueous NaCl give at each electrode.",
  concepts: [
    // 1 — electrolysis products
    {
      kind: "formula" as const,
      slug: "cetec-electrolysis-products",
      name: "What Forms at Each Electrode: Molten Versus Aqueous NaCl",
      intuition:
        "Electrolysis is a galvanic cell run backwards: electrical energy drives a reaction whose ΔG is positive. Cations move to the cathode and are reduced; anions to the anode and are oxidised. In WATER the easier reduction wins, so Na⁺ is left alone and water gives hydrogen.",
      definition:
        "- Molten NaCl: cathode \\(\\text{Na}^+ + e^- \\to \\text{Na}(l)\\); anode \\(2\\text{Cl}^- \\to \\text{Cl}_2 + 2e^-\\). Non-spontaneous — needs the applied voltage.\n" +
        "- Aqueous NaCl: cathode \\(2\\text{H}_2\\text{O} + 2e^- \\to \\text{H}_2 + 2\\text{OH}^-\\) (H₂, not Na); anode Cl₂ (brine). NaOH is left in solution.\n" +
        "- Electrolytic cell: anode is POSITIVE, cathode NEGATIVE — the reverse of a galvanic cell's signs; oxidation still at the anode.\n" +
        "- Molten AlCl₃ or Al₂O₃ gives Al at the cathode (3 e⁻ per atom); molten MgCl₂ and CaCl₂ give the metal (2 e⁻).",
      formula: {
        label: "Electrode reactions",
        latex:
          "\\text{cathode: } M^{n+} + n e^- \\to M;\\qquad \\text{anode: } 2X^- \\to X_2 + 2e^-",
      },
      authoredExample: {
        prompt: "Aqueous CuSO₄ is electrolysed with inert electrodes. What forms at each electrode?",
        steps: [
          "Cathode: Cu²⁺ is easier to reduce than water — copper deposits. Anode: water is oxidised — oxygen evolves, \\(2\\text{H}_2\\text{O} \\to \\text{O}_2 + 4\\text{H}^+ + 4e^-\\).",
        ],
        answer: "Cu at the cathode, O₂ at the anode",
      },
      selfCheckExample: {
        prompt: "Which statement about the electrolysis of molten NaCl is false: Cl₂ at the anode; Na at the cathode; the decomposition is spontaneous; electrical energy drives it?",
        steps: [
          "NaCl does not fall apart into Na and Cl₂ on its own — ΔG > 0. The spontaneity claim is the false one.",
        ],
        answer: "'The decomposition is spontaneous'",
      },
      practiceSet: [
        { prompt: "Cathode product from fused NaCl?", answer: "Na(l)" },
        { prompt: "Cathode product from aqueous NaCl?", answer: "H₂(g)" },
        { prompt: "Sign of the anode in an electrolytic cell?", answer: "Positive" },
        { prompt: "Electrons per Al atom from molten Al₂O₃?", answer: "3" },
      ],
      pyqExampleId: "2e862ff7-af52-438e-8c35-e96e3a7f81b2",
      traps: [
        {
          title: "Sodium at the cathode from BRINE",
          body:
            "Water is reduced before Na⁺ is. Aqueous NaCl gives H₂ (and OH⁻) at the cathode; only the MOLTEN salt gives sodium metal.",
        },
      ],
    },

    // 2 — Faraday's first law
    {
      kind: "formula" as const,
      slug: "cetec-faraday-mass-charge",
      name: "Faraday's First Law: W = ItM/nF",
      intuition:
        "Charge passed Q = It coulombs; divide by 96500 for moles of electrons; divide by n electrons per particle for moles of product; multiply by M for grams. Run the same chain backwards for a required charge, time or current.",
      definition:
        "- \\(W = \\dfrac{Q}{F}\\cdot\\dfrac{M}{n} = \\dfrac{I\\,t\\,M}{n\\,F}\\), \\(F = 96500\\ \\text{C mol}^{-1}\\); one coulomb is \\(6.24 \\times 10^{18}\\) electrons.\n" +
        "- Charge in faradays for a mass: \\(\\dfrac{W}{M} \\times n\\). 0.18 g Al: \\(\\dfrac{0.18}{27} \\times 3 = 0.02\\) F. 45 g Al: 5 F. 4.8 g Mg: 0.4 F.\n" +
        "- Gas: 1 mol Cl₂ or H₂ needs 2 F. 0.1 mol Cl₂: 19300 C. 1 mol H₂ from H⁺: 2 F. Volume at STP: moles × 22.4 L.\n" +
        "- Time: \\(t = \\dfrac{nFW}{IM}\\). 5.4 g Ag at 5 A: \\(\\dfrac{1 \\times 96500 \\times 0.05}{5} = 965\\) s. 0.5 mol Cl₂ at 100 A: 965 s.\n" +
        "- Current: \\(I = \\dfrac{nFW}{tM}\\). 4.8 g Cu in 30 min: \\(\\dfrac{2 \\times 96500 \\times 4.8}{1800 \\times 63} = 8.1\\) A.",
      formula: {
        label: "Faraday's first law",
        latex:
          "W = \\frac{I\\,t\\,M}{n\\,F},\\qquad Q = I\\,t,\\qquad F = 96500\\ \\text{C mol}^{-1}",
      },
      authoredExample: {
        prompt: "A current of 0.5 A flows through molten ZnCl₂ for 32 min 10 s. Find the mass of zinc deposited (M = 65).",
        steps: [
          "\\(Q = 0.5 \\times 1930 = 965\\) C \\(= 0.01\\) mol e⁻.",
          "Zn²⁺ needs 2 e⁻: 0.005 mol Zn = \\(0.005 \\times 65 = 0.325\\) g.",
        ],
        answer: "\\(0.325\\ \\text{g}\\)",
      },
      selfCheckExample: {
        prompt: "How many coulombs deposit 2.7 g of aluminium from molten Al₂O₃?",
        steps: [
          "\\(2.7/27 = 0.1\\) mol Al, 3 e⁻ each: 0.3 F \\(= 0.3 \\times 96500 = 28950\\) C.",
        ],
        answer: "\\(28950\\ \\text{C}\\)",
      },
      practiceSet: [
        { prompt: "0.05 F through CuSO₄: mass of Cu (63.5)?", answer: "1.59 g" },
        { prompt: "Faradays for 4.8 g Mg (24)?", answer: "0.4 F" },
        { prompt: "1 A for 965 s through fused NaCl: volume of Cl₂ at STP?", answer: "0.112 L" },
        { prompt: "2 A for 482.5 s through molten MgCl₂: mass of Mg?", answer: "0.12 g" },
      ],
      pyqExampleId: "551e7693-5c36-4ac4-9745-ab729aaf6f9a",
      traps: [
        {
          title: "Using n = 1 for a divalent metal",
          body:
            "Cu²⁺, Mg²⁺, Ca²⁺, Zn²⁺ each take TWO electrons, so a given charge deposits half a mole per faraday. The n = 1 answer (double the true mass) is always among the options.",
        },
      ],
    },

    // 3 — redox charge and cells in series
    {
      kind: "formula" as const,
      slug: "cetec-redox-charge-and-series",
      name: "Charge for a Redox Change, and Cells in Series",
      intuition:
        "For an ion changing oxidation state, n is the electrons per formula unit: MnO₄⁻ → Mn²⁺ is 5, Cr₂O₇²⁻ → 2Cr³⁺ is 6. Cells in series pass the SAME charge, so the masses deposited are in the ratio of the equivalent masses M/n.",
      definition:
        "- Charge \\(= \\text{moles} \\times n \\times F\\). 0.08 mol MnO₄⁻ → Mn²⁺: \\(0.08 \\times 5 \\times 96500 = 38600\\) C. 1.1 mol Cr₂O₇²⁻: \\(1.1 \\times 6 \\times 96500 = 6.369 \\times 10^5\\) C. 2 mol KMnO₄ → MnSO₄: 10 F.\n" +
        "- Cells in series (Faraday's second law): \\(\\dfrac{W_1}{W_2} = \\dfrac{M_1/n_1}{M_2/n_2}\\). 6.5 g Zn (65/2 = 32.5) ↔ Al (27/3 = 9): \\(6.5 \\times 9/32.5 = 1.8\\) g.\n" +
        "- Equivalent masses to know: Ag 108, Cu 31.75, Zn 32.5, Al 9, Mg 12, Ca 20.",
      formula: {
        label: "Charge for n electrons; series cells",
        latex:
          "Q = \\text{mol} \\times n \\times F,\\qquad \\frac{W_1}{W_2} = \\frac{M_1/n_1}{M_2/n_2}",
      },
      authoredExample: {
        prompt: "CuSO₄ and AgNO₃ cells are in series. If 3.175 g of Cu deposits, how much Ag deposits (Cu 63.5, Ag 108)?",
        steps: [
          "Equivalents: Cu 31.75, Ag 108. \\(W_{\\text{Ag}} = 3.175 \\times 108/31.75 = 10.8\\) g.",
        ],
        answer: "\\(10.8\\ \\text{g}\\)",
      },
      selfCheckExample: {
        prompt: "How many faradays reduce 0.5 mol of dichromate ion to Cr³⁺?",
        steps: [
          "6 e⁻ per Cr₂O₇²⁻: \\(0.5 \\times 6 = 3\\) F.",
        ],
        answer: "\\(3\\ \\text{F}\\)",
      },
      practiceSet: [
        { prompt: "Coulombs to convert 0.08 mol MnO₄⁻ to Mn²⁺?", answer: "38600 C" },
        { prompt: "Faradays for 2 mol KMnO₄ → MnSO₄?", answer: "10 F" },
        { prompt: "6.5 g Zn in one cell: Al in the series cell?", answer: "1.8 g" },
        { prompt: "Equivalent mass of Al?", answer: "9" },
      ],
      pyqExampleId: "e6e6d645-717a-40f0-8f23-711dfc297cd7",
      traps: [
        {
          title: "n = 3 for dichromate",
          body:
            "Each Cr goes +6 → +3, but Cr₂O₇²⁻ carries TWO chromiums: n = 6 per formula unit. Half the correct charge is always an option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Galvanic Cells — the spontaneous direction",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-galvanic-cells",
    },
    {
      label: "Batteries — recharging is electrolysis",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-batteries",
    },
  ],
};
