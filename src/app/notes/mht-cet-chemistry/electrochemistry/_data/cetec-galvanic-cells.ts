import type { SubtopicNote } from "@/app/notes/_types";

export const GALVANIC_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Galvanic Cells, EMF, Nernst Equation and Thermodynamics",
  title: "Galvanic Cells, EMF, Nernst Equation and Thermodynamics",
  oneLineDefinition:
    "A galvanic cell turns a spontaneous redox reaction into a voltage: E°cell = E°cathode − E°anode from the electrochemical series, corrected for concentration by the Nernst equation, and tied to ΔG° = −nFE° and to K.",
  whyItMatters:
    "49 PYQs, 12 HARD — every HARD row in the chapter is here, and all twelve are Nernst: the electrode potential of M → Mⁿ⁺ at 0.1 or 0.01 M, or how much the emf moves when one ion's concentration drops tenfold. " +
    "The rest are E°cell subtractions, ΔG° = −nFE° in kJ, E° from K, and recall of which electrode is positive and which species is the strongest reducing or oxidising agent.",
  concepts: [
    // 1 — cell notation and electrodes
    {
      kind: "formula" as const,
      slug: "cetec-cell-notation-and-electrodes",
      name: "Reading a Cell: Anode Left, Cathode Right",
      intuition:
        "In cell notation the anode (oxidation) is written on the left and the cathode (reduction) on the right, the double bar being the salt bridge. In a GALVANIC cell the anode is the negative electrode and the cathode the positive one; electrons flow through the wire from anode to cathode. The electrode with the higher reduction potential is the cathode.",
      definition:
        "- \\(\\text{Zn}(s)\\,|\\,\\text{Zn}^{2+}\\,\\|\\,\\text{Ag}^+\\,|\\,\\text{Ag}(s)\\): Zn oxidised at the left (anode, −), Ag⁺ reduced at the right (cathode, +). Net: \\(\\text{Zn} + 2\\text{Ag}^+ \\to \\text{Zn}^{2+} + 2\\text{Ag}\\) — balance the electrons.\n" +
        "- A galvanic (voltaic) cell converts CHEMICAL energy to electrical; an electrolytic cell does the reverse. A dry cell is a voltaic cell.\n" +
        "- With SHE: whichever has the higher E° is the cathode. Zn/SHE — zinc is the anode, the positive electrode carries \\(2\\text{H}^+ + 2e^- \\to \\text{H}_2\\). Cu/SHE — copper is the cathode, net \\(\\text{H}_2 + \\text{Cu}^{2+} \\to 2\\text{H}^+ + \\text{Cu}\\).\n" +
        "- SHE difficulties: pure H₂, exactly 1 bar, exactly 1 M H⁺ — NOT 'running the reaction in reverse', which is easy.",
      formula: {
        label: "Cell notation",
        latex:
          "\\text{anode (–)}\\ \\big|\\ \\text{anode ion}\\ \\big\\|\\ \\text{cathode ion}\\ \\big|\\ \\text{cathode (+)}",
      },
      authoredExample: {
        prompt: "Write the cell in which \\(\\text{Ni} + 2\\text{Ag}^+ \\to \\text{Ni}^{2+} + 2\\text{Ag}\\) occurs and name the positive electrode.",
        steps: [
          "Ni is oxidised (anode, left); Ag⁺ reduced (cathode, right): \\(\\text{Ni}\\,|\\,\\text{Ni}^{2+}\\,\\|\\,\\text{Ag}^+\\,|\\,\\text{Ag}\\). The cathode, silver, is positive.",
        ],
        answer: "\\(\\text{Ni}\\,|\\,\\text{Ni}^{2+}(1\\,\\text{M})\\,\\|\\,\\text{Ag}^+(1\\,\\text{M})\\,|\\,\\text{Ag}\\); silver is positive",
      },
      selfCheckExample: {
        prompt: "For \\(\\text{A}\\,|\\,\\text{A}^{2+}\\,\\|\\,\\text{B}^+\\,|\\,\\text{B}\\) with positive emf, write the balanced cell reaction.",
        steps: [
          "A gives 2 e⁻, each B⁺ takes 1: \\(\\text{A} + 2\\text{B}^+ \\to \\text{A}^{2+} + 2\\text{B}\\).",
        ],
        answer: "\\(\\text{A}(s) + 2\\text{B}^+(aq) \\to \\text{A}^{2+}(aq) + 2\\text{B}(s)\\)",
      },
      practiceSet: [
        { prompt: "Which electrode is negative in a galvanic cell?", answer: "Anode" },
        { prompt: "Reaction at the positive electrode of a Zn–SHE cell?", answer: "\\(2\\text{H}^+ + 2e^- \\to \\text{H}_2\\)" },
        { prompt: "A voltaic cell converts which energy to which?", answer: "Chemical to electrical" },
        { prompt: "Is 'reversing the reaction' a difficulty of setting up SHE?", answer: "No" },
      ],
      pyqExampleId: "2c9a37a4-4c6e-434a-a907-91880f5951dd",
      traps: [
        {
          title: "Anode = positive",
          body:
            "That is true in an ELECTROLYTIC cell only. In a galvanic cell electrons leave the anode, so it is negative; the cathode, where they arrive, is positive.",
        },
      ],
    },

    // 2 — standard cell potential
    {
      kind: "formula" as const,
      slug: "cetec-standard-cell-potential",
      name: "E°cell = E°cathode − E°anode",
      intuition:
        "Both tabulated values are REDUCTION potentials. The cathode reduces, so its value is used as is; the anode oxidises, so its reduction potential is subtracted. Subtracting a negative number adds — the Zn/Pb cell with two negative E° still has a positive emf.",
      definition:
        "- \\(E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}\\) (reduction potentials). Cd/Ag: \\(0.799 - (-0.403) = 1.202\\) V. Zn/Pb: \\(-0.126 - (-0.763) = 0.637\\) V.\n" +
        "- Against SHE (\\(E^\\circ = 0\\)): Al anode, \\(0 - (-1.66) = 1.66\\) V.\n" +
        "- A known cell gives an unknown electrode: Zn/calomel, \\(1.007 = 0.242 - E^\\circ_{\\text{Zn}}\\) → \\(E^\\circ_{\\text{Zn}} = -0.765\\) V.\n" +
        "- Coefficients do NOT change E°: \\(2\\text{Al} + 3\\text{Ni}^{2+}\\) still gives \\(-0.25 - (-1.66) = 1.41\\) V.\n" +
        "- Positive E°cell means spontaneous as written; negative means the reverse runs.",
      formula: {
        label: "Standard emf",
        latex:
          "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
      },
      authoredExample: {
        prompt: "E°(Fe²⁺/Fe) = −0.44 V, E°(Cu²⁺/Cu) = +0.34 V. Find E°cell for the spontaneous cell and write it.",
        steps: [
          "Higher E° is the cathode: Cu. \\(E^\\circ = 0.34 - (-0.44) = 0.78\\) V.",
        ],
        answer: "\\(0.78\\) V; \\(\\text{Fe}\\,|\\,\\text{Fe}^{2+}\\,\\|\\,\\text{Cu}^{2+}\\,|\\,\\text{Cu}\\)",
      },
      selfCheckExample: {
        prompt: "E°(Fe²⁺/Fe) = −0.44 V and E°(Sn²⁺/Sn) = −0.14 V. Standard emf of the cell they form?",
        steps: [
          "Sn is the cathode (less negative): \\(-0.14 - (-0.44) = +0.30\\) V.",
        ],
        answer: "\\(+0.30\\) V",
      },
      practiceSet: [
        { prompt: "Cd (−0.403) / Ag (0.799): E°cell?", answer: "1.202 V" },
        { prompt: "Mg (−2.37) / Ag (0.80): E°cell?", answer: "3.17 V" },
        { prompt: "Zn (−0.763) / Cd (−0.403): E°cell?", answer: "0.36 V" },
        { prompt: "Al | Al³⁺ || H⁺ | H₂, E°(Al) = −1.66: E°cell?", answer: "1.66 V" },
      ],
      pyqExampleId: "223e294b-0101-492c-b663-1c37c256c3cc",
      traps: [
        {
          title: "Adding the two potentials",
          body:
            "\\(E^\\circ_{\\text{anode}} + E^\\circ_{\\text{cathode}}\\) is offered as a 'relation' and as a number. Reduction potentials are SUBTRACTED; for Zn/Cd that gives 0.36 V, not −1.17 V.",
        },
      ],
    },

    // 3 — electrochemical series
    {
      kind: "formula" as const,
      slug: "cetec-electrochemical-series",
      name: "The Electrochemical Series: Who Reduces, Who Oxidises, Who Deposits",
      intuition:
        "Arrange reduction potentials from most negative (Li, K) to most positive (F₂). The bottom of that list are the metals most eager to give electrons — the strongest reducing agents; the top are the species most eager to take them — the strongest oxidising agents. A metal displaces from solution any ion above it.",
      definition:
        "- Most negative E°: Li⁺/Li (−3.04), K⁺/K (−2.93), Mg (−2.37), Al (−1.66), Zn (−0.76), Fe (−0.44), Sn (−0.14), Pb (−0.13), H (0), Cu (+0.34), Ag (+0.80), Cl₂ (+1.36), F₂ (+2.87).\n" +
        "- **Strongest reducing agent** = most negative E° metal (K among K, Al, Mg, Ag). **Strongest oxidising agent** = most positive E° species (F₂ over Li, Li⁺, F⁻).\n" +
        "- **Deposition order**: higher E° deposits first: Ag > Cu > Sn > Cd.\n" +
        "- **Spontaneous** displacement: the metal LOWER in the series reduces the ion of one higher. Zn + Cu²⁺ (E° = +1.10 V) yes; Cu + Mg²⁺ no.",
      formula: {
        label: "Spontaneity test",
        latex:
          "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} > 0 \\iff \\text{spontaneous}",
      },
      authoredExample: {
        prompt: "Will Sn displace Cd²⁺ from solution? E°(Sn) = −0.14, E°(Cd) = −0.40 V.",
        steps: [
          "Sn as anode, Cd as cathode: \\(-0.40 - (-0.14) = -0.26\\) V < 0. No; Cd would displace Sn²⁺ instead.",
        ],
        answer: "No",
      },
      selfCheckExample: {
        prompt: "Among Li⁺/Li (−3.04), F₂/F⁻ (+2.87), Cl₂/Cl⁻ (+1.36) and H⁺/H₂ (0), which has the minimum reduction potential and which is the strongest oxidising agent?",
        steps: [
          "Minimum: Li⁺/Li. Strongest oxidiser: F₂, the highest E°.",
        ],
        answer: "Li⁺/Li; F₂",
      },
      practiceSet: [
        { prompt: "Strongest reducing agent: K, Al, Mg, Ag?", answer: "K" },
        { prompt: "Strongest oxidising agent: Li, Li⁺, F₂, F⁻?", answer: "F₂" },
        { prompt: "Deposition order of Ag (0.80), Cu (0.337), Sn (−0.136), Cd (−0.403)?", answer: "Ag > Cu > Sn > Cd" },
        { prompt: "Is \\(\\text{Zn} + \\text{Cu}^{2+}\\) spontaneous?", answer: "Yes (E° = +1.10 V)" },
      ],
      pyqExampleId: "a28de855-d0c6-41d7-a9ee-97c666154ede",
      traps: [
        {
          title: "Picking F⁻ as the strongest oxidising agent",
          body:
            "F⁻ is already reduced — it can only be oxidised. The oxidising agent is the species that GETS reduced: F₂. Likewise Li (the metal), not Li⁺, is the reducing agent.",
        },
      ],
    },

    // 4 — Nernst equation
    {
      kind: "formula" as const,
      slug: "cetec-nernst-equation",
      name: "The Nernst Equation: E = E° − (0.0592/n) log Q",
      intuition:
        "Away from 1 M the emf shifts by (0.0592/n) volts per power of ten in Q, where Q puts product ions over reactant ions with their stoichiometric powers. More product ion lowers E; less product ion (or more reactant ion) raises it. Equal 0.1 M on both sides of a 1:1 reaction gives Q = 1 and no shift at all.",
      definition:
        "- \\(E = E^\\circ - \\dfrac{RT}{nF}\\ln Q = E^\\circ - \\dfrac{0.0592}{n}\\log_{10} Q\\) at 298 K, \\(Q = \\dfrac{[\\text{products}]}{[\\text{reactants}]}\\) (ions only).\n" +
        "- Cd | Cd²⁺ || Cu²⁺ | Cu: \\(E = E^\\circ - 0.0296\\log\\dfrac{[\\text{Cd}^{2+}]}{[\\text{Cu}^{2+}]}\\). [Cd²⁺] ten times [Cu²⁺]: E is LOWER by 0.0296 V.\n" +
        "- Zn | Zn²⁺(1 M) || Ag⁺ | Ag, n = 2, \\(Q = [\\text{Zn}^{2+}]/[\\text{Ag}^+]^2\\): [Zn²⁺] → 0.1 M raises E by 0.0296 V; [Ag⁺] → 0.1 M lowers E by 0.0592 V (the square); [Ag⁺] = 10 M raises it by 0.0592 V.\n" +
        "- E lower than E° by 0.0592 V means \\(\\log Q = 2\\): \\([\\text{Zn}^{2+}] = 1\\), \\([\\text{Ag}^+] = 0.1\\).\n" +
        "- Zn | Zn²⁺(0.1) || Cr³⁺(0.1) | Cr: n = 6, \\(Q = (0.1)^3/(0.1)^2 = 0.1\\), \\(E = 0.02 + 0.0592/6 = 0.03\\) V.\n" +
        "- Hydrogen electrode at 1 atm: \\(E = -0.0592 \\times \\text{pH}\\); pH 1 → −0.0592 V.",
      formula: {
        label: "Nernst equation (298 K)",
        latex:
          "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0592}{n}\\log_{10} Q",
      },
      authoredExample: {
        prompt: "For Ni | Ni²⁺(0.01 M) || Cu²⁺(1 M) | Cu with E° = 0.59 V, find E at 298 K.",
        steps: [
          "\\(Q = [\\text{Ni}^{2+}]/[\\text{Cu}^{2+}] = 0.01\\), n = 2.",
          "\\(E = 0.59 - 0.0296\\log(0.01) = 0.59 + 0.0592 = 0.649\\) V.",
        ],
        answer: "\\(0.649\\) V",
      },
      selfCheckExample: {
        prompt: "In Cu | Cu²⁺(1 M) || Ag⁺(x M) | Ag the emf is 0.0296 V BELOW E°. Find x.",
        steps: [
          "\\(Q = 1/x^2\\), n = 2: \\(0.0296\\log(1/x^2) = 0.0296\\) → \\(\\log(1/x^2) = 1\\) → \\(x^2 = 0.1\\), \\(x = 0.316\\) M.",
        ],
        answer: "\\(x \\approx 0.32\\) M",
      },
      practiceSet: [
        { prompt: "Zn/Ag cell, [Zn²⁺] 1 → 0.1 M: emf change?", answer: "Increases by 0.0296 V" },
        { prompt: "Zn/Ag cell, [Ag⁺] 1 → 0.1 M: emf change?", answer: "Decreases by 0.0592 V" },
        { prompt: "Zn + Cu²⁺(0.1) → Zn²⁺(0.1) + Cu, E° = 1.1: E?", answer: "1.1 V" },
        { prompt: "H₂ electrode at 1 atm in pH 1 solution: E?", answer: "−0.0592 V" },
      ],
      pyqExampleId: "2072bbbb-7096-4286-94ba-873a2b11ecd8",
      traps: [
        {
          title: "Forgetting the square on [Ag⁺]",
          body:
            "Two Ag⁺ per Zn, so Q carries \\([\\text{Ag}^+]^2\\). Dropping Ag⁺ to 0.1 M multiplies Q by 100, a two-decade shift of 0.0592 V — twice the 0.0296 V that dropping Zn²⁺ gives.",
        },
      ],
    },

    // 5 — single electrode potential at concentration
    {
      kind: "formula" as const,
      slug: "cetec-electrode-potential-at-concentration",
      name: "Potential of One Electrode at a Given Concentration",
      intuition:
        "For the OXIDATION M → Mⁿ⁺(c) + ne⁻, the standard oxidation potential is the negative of the tabulated reduction value, and the Nernst term is −(0.0592/n) log c. Since c < 1 makes the log negative, the oxidation potential comes out MORE positive than E°ox by (0.0592/n) per decade. Doubling the equation changes nothing — potential is intensive.",
      definition:
        "- \\(E_{\\text{ox}} = E^\\circ_{\\text{ox}} - \\dfrac{0.0592}{n}\\log[\\text{M}^{n+}]\\), with \\(E^\\circ_{\\text{ox}} = -E^\\circ_{\\text{red}}\\).\n" +
        "- Mg → Mg²⁺(0.01 M): \\(+2.37 + 0.0592 = +2.4292\\) V. At 0.1 M: \\(+2.37 + 0.0296 = +2.3996\\) V.\n" +
        "- Zn → Zn²⁺(0.01): \\(+0.76 + 0.0592 = +0.8192\\) V. Al → Al³⁺(0.1): \\(+1.66 + 0.0197 = +1.679\\) V.\n" +
        "- Metals with POSITIVE E°red: Cu → Cu²⁺(0.1): \\(-0.34 + 0.0296 = -0.3104\\) V. Ag → Ag⁺(0.01): \\(-0.80 + 0.1184 = -0.6816\\) V.\n" +
        "- Intensive: \\(2\\text{Cu} \\to 2\\text{Cu}^{2+} + 4e^-\\) has \\(E^\\circ = -0.34\\) V, the same as for one Cu. \\(2\\text{Zn} \\to 2\\text{Zn}^{2+} + 4e^-\\): \\(+0.76\\) V.",
      formula: {
        label: "Oxidation electrode potential",
        latex:
          "E_{\\text{ox}} = -E^\\circ_{\\text{red}} - \\frac{0.0592}{n}\\log[\\text{M}^{n+}]",
      },
      authoredExample: {
        prompt: "E°(Ni²⁺/Ni) = −0.25 V. Find the potential for Ni → Ni²⁺(0.001 M) + 2e⁻ at 298 K.",
        steps: [
          "\\(E^\\circ_{\\text{ox}} = +0.25\\) V; \\(E = 0.25 - 0.0296\\log(10^{-3}) = 0.25 + 0.0888 = +0.3388\\) V.",
        ],
        answer: "\\(+0.339\\) V",
      },
      selfCheckExample: {
        prompt: "E°(Fe²⁺/Fe) = −0.44 V. Potential of Fe → Fe²⁺(0.1 M) + 2e⁻, and of 3Fe → 3Fe²⁺(0.1 M) + 6e⁻?",
        steps: [
          "\\(+0.44 + 0.0296 = +0.4696\\) V for both — multiplying the equation leaves the potential unchanged.",
        ],
        answer: "\\(+0.4696\\) V; the same",
      },
      practiceSet: [
        { prompt: "Mg → Mg²⁺(0.01 M), E°red = −2.37: E?", answer: "+2.4292 V" },
        { prompt: "Ag → Ag⁺(0.01 M), E°red = +0.80: E?", answer: "−0.6816 V" },
        { prompt: "Cu²⁺ + 2e⁻ → Cu is +0.34 V: E° of 2Cu → 2Cu²⁺ + 4e⁻?", answer: "−0.34 V" },
        { prompt: "Al → Al³⁺(0.1 M), E°red = −1.66: E?", answer: "+1.679 V" },
      ],
      pyqExampleId: "5cc0acd5-bdaf-4e0e-8d2b-a2ec5e64c225",
      traps: [
        {
          title: "Doubling E° when the equation is doubled",
          body:
            "Electrode potential is intensive — it does not scale with the amount. 2Zn → 2Zn²⁺ + 4e⁻ is still +0.76 V; +1.52 V and −1.52 V are the planted options.",
        },
      ],
    },

    // 6 — Gibbs energy and K
    {
      kind: "formula" as const,
      slug: "cetec-gibbs-energy-and-k",
      name: "ΔG° = −nFE° and the Bridge to K",
      intuition:
        "The electrical work a cell can do is the fall in Gibbs energy: ΔG° = −nFE°, in joules when F = 96500 and E in volts. At equilibrium E = 0, which turns the Nernst equation into E° = (0.0592/n) log K. E° is intensive; ΔG°, carrying n, is extensive.",
      definition:
        "- \\(\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}\\). Mg/Sn, E° = 2.23: \\(-2 \\times 96500 \\times 2.23 = -430.4\\) kJ. Sn/Ag, 0.90 V: −173.7 kJ. Zn/Ni, 0.5 V: −96.5 kJ.\n" +
        "- Reverse: \\(E^\\circ = \\dfrac{-\\Delta G^\\circ}{nF}\\). 2Al + 3Cu²⁺, ΔG° = −1158 kJ, n = 6: \\(1158000/(6 \\times 96500) = 2\\) V. A + B²⁺, −386 kJ, n = 2: 2 V. Dry cell: n = 2, \\(E^\\circ = -\\Delta G^\\circ/2F\\).\n" +
        "- \\(E^\\circ = \\dfrac{0.0592}{n}\\log_{10} K\\). K = 10⁴, n = 2: \\(0.0296 \\times 4 = 0.1184\\) V. (Not \\(\\dfrac{0.0592}{nF}\\), not \\(\\ln K\\) with 0.0592.)\n" +
        "- Maximum electrical work \\(= -\\Delta G^\\circ = nFE^\\circ\\); work done BY the cell is reported negative: Zn/Ag at 1.55 V, −299.15 kJ.\n" +
        "- Intensive: E°cell, electrode potential. Extensive: ΔG°. Electrode potential DOES depend on concentration.",
      formula: {
        label: "Gibbs energy and K",
        latex:
          "\\Delta G^\\circ = -nFE^\\circ,\\qquad E^\\circ = \\frac{0.0592}{n}\\log_{10} K",
      },
      authoredExample: {
        prompt: "For Cu | Cu²⁺ || Ag⁺ | Ag, E° = 0.46 V. Find ΔG° and K at 298 K.",
        steps: [
          "n = 2: \\(\\Delta G^\\circ = -2 \\times 96500 \\times 0.46 = -88.8\\) kJ.",
          "\\(\\log K = nE^\\circ/0.0592 = 2 \\times 0.46/0.0592 = 15.5\\), \\(K \\approx 3 \\times 10^{15}\\).",
        ],
        answer: "\\(-88.8\\) kJ; \\(K \\approx 3 \\times 10^{15}\\)",
      },
      selfCheckExample: {
        prompt: "A cell reaction with n = 1 has K = 10⁶ at 298 K. Find E° and ΔG°.",
        steps: [
          "\\(E^\\circ = 0.0592 \\times 6 = 0.355\\) V; \\(\\Delta G^\\circ = -96500 \\times 0.355 = -34.3\\) kJ.",
        ],
        answer: "\\(0.355\\) V; \\(-34.3\\) kJ",
      },
      practiceSet: [
        { prompt: "n = 2, E° = 2.23 V: ΔG°?", answer: "−430.4 kJ" },
        { prompt: "2Al + 3Cu²⁺, ΔG° = −1158 kJ: E°?", answer: "2 V" },
        { prompt: "n = 2, K = 10⁴: E°?", answer: "0.1184 V" },
        { prompt: "Which is extensive: E°cell or ΔG°?", answer: "ΔG°" },
      ],
      pyqExampleId: "aed6476b-1484-4362-8ced-908309f71566",
      traps: [
        {
          title: "Losing the minus sign",
          body:
            "\\(E^\\circ = \\Delta G^\\circ/nF\\) without the minus is the planted FALSE relation, and −ΔG° written as ΔG° flips the sign of a spontaneous cell's 'work'. A positive E° always goes with a negative ΔG°.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Electrolysis — the non-spontaneous direction and Faraday's laws",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-electrolysis",
    },
    {
      label: "Batteries — the named galvanic cells",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-batteries",
    },
  ],
};
