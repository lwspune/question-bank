import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Electrode Potential and Cell Potential",
  title: "Electrode Potential, Cell Potential and the Nernst Equation",
  oneLineDefinition:
    "What electrode and cell potentials are, the standard cell potential from standard reduction potentials, and the Nernst equation for a cell and for a single electrode away from 1 M.",
  whyItMatters:
    "14 questions. Four were set in board papers: the standard potential of a copper electrode from a cell's potential (2020), the standard potential of a cadmium and copper cell (2022), the standard potential of a zinc and chromium cell (2024), and the potential of a copper electrode in 0.02 M Cu²⁺ (2026). The textbook adds standard conditions, the Nernst equation and its correction term, and the potentials of cells away from 1 M.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccec-standard-potential",
      name: "Standard cell potential",
      intuition:
        "Each electrode has its own pull on electrons, measured as a reduction potential. Put two electrodes together and the one with the stronger pull (the higher reduction potential) takes the electrons: it becomes the cathode. The cell potential is how much stronger that pull is, so it is the cathode's potential minus the anode's.",
      definition:
        "- **Electrode potential:** the potential difference between a metal and the solution of its ions, set up by the half reaction at the electrode surface. It is called an oxidation potential or a reduction potential depending on the half reaction.\n" +
        "- **Cell potential (emf)** is the algebraic sum of the two electrode potentials, \\(E_{\\text{cell}} = E_{\\text{oxi}}(\\text{anode}) + E_{\\text{red}}(\\text{cathode})\\). It pushes electrons from the anode to the cathode.\n" +
        "- **Standard conditions:** 1 M solutions, 1 atm for gases, pure solids and liquids, and 25 °C. The potential under these conditions is the standard potential \\(E^0\\).\n" +
        "- By IUPAC convention the standard potential of an electrode is its standard reduction potential. The standard oxidation potential has the same size and the opposite sign: Zn has an oxidation potential of 0.76 V and a reduction potential of −0.76 V.\n" +
        "- So \\(E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}\\), both as reduction potentials.\n" +
        "- The electrode with the higher standard potential is the cathode (+); the lower is the anode (−).\n" +
        "- \\(E^0\\) is not multiplied when a half reaction is multiplied to balance the electrons.",
      formula: {
        label: "Standard cell potential",
        latex: "E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}",
      },
      authoredExample: {
        prompt:
          "A galvanic cell is built from the electrodes Mg²⁺ | Mg (E⁰ = −2.37 V) and Ni²⁺ | Ni (E⁰ = −0.257 V). Write the cell formula and calculate the standard cell potential.",
        steps: [
          "Given: \\(E^0_{\\text{Mg}} = -2.37\\) V, \\(E^0_{\\text{Ni}} = -0.257\\) V. Nickel has the higher potential, so Ni is the cathode and Mg the anode.",
          "Cell formula: \\(\\text{Mg}(s) \\mid \\text{Mg}^{2+}(1\\ \\text{M}) \\parallel \\text{Ni}^{2+}(1\\ \\text{M}) \\mid \\text{Ni}(s)\\).",
          "Formula: \\(E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}\\).",
          "Substitution: \\(E^0_{\\text{cell}} = -0.257\\ \\text{V} - (-2.37\\ \\text{V}) = 2.113\\) V.",
        ],
        answer: "E⁰cell = 2.113 V",
      },
      selfCheckExample: {
        prompt: "Find the standard potential of the cell Zn(s) | Zn²⁺(1 M) || Pb²⁺(1 M) | Pb(s). E⁰ of Zn = −0.763 V, E⁰ of Pb = −0.126 V.",
        steps: ["Zinc on the left is the anode, lead the cathode.", "\\(E^0_{\\text{cell}} = -0.126 - (-0.763) = 0.637\\) V."],
        answer: "0.637 V",
      },
      practiceSet: [
        { prompt: "State the standard conditions for measuring a standard potential.", answer: "1 M solutions, 1 atm gas pressure, pure solids and liquids, 25 °C" },
        { prompt: "The electrodes Zn²⁺ | Zn (E⁰ = −0.763 V) and Cu²⁺ | Cu (E⁰ = 0.337 V) are combined. Which is the cathode?", answer: "Cu²⁺ | Cu, the electrode with the higher standard potential" },
        { prompt: "The standard oxidation potential of an electrode is 0.44 V. What is its standard reduction potential?", answer: "−0.44 V" },
        { prompt: "When the half reaction Ag⁺ + e⁻ → Ag is multiplied by 2, what happens to its E⁰?", answer: "Nothing; E⁰ stays the same" },
      ],
      pyqExampleId: "113aa6dd-21a2-4f1a-9d96-eea63c7806c8",
      traps: [
        {
          title: "Dropping the minus sign",
          body: "Subtract a negative anode potential carefully: \\(-0.257 - (-2.37)\\) is \\(+2.113\\), not \\(-2.627\\). Write the brackets in every line.",
        },
        {
          title: "Multiplying E⁰ by the coefficient",
          body: "To balance electrons you multiply the equation, never its potential. E⁰ does not depend on the amount of substance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-nernst",
      name: "The Nernst equation for a cell",
      intuition:
        "The standard potential is the cell's voltage when everything is at 1 M. Away from 1 M the voltage shifts: more reactant pushes the reaction forward and raises the voltage, more product pushes back and lowers it. The Nernst equation measures that shift with a log term.",
      definition:
        "- For a cell reaction \\(a\\text{A} + b\\text{B} \\to c\\text{C} + d\\text{D}\\): \\(E_{\\text{cell}} = E^0_{\\text{cell}} - \\dfrac{2.303\\,RT}{nF}\\log_{10}\\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}\\).\n" +
        "- n is the moles of electrons in the reaction, F = 96500 C, R = 8.314 J K⁻¹ mol⁻¹, T in kelvin.\n" +
        "- At 25 °C, \\(\\dfrac{2.303\\,RT}{F} = 0.0592\\) V, so \\(E_{\\text{cell}} = E^0_{\\text{cell}} - \\dfrac{0.0592}{n}\\log_{10}\\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}\\).\n" +
        "- The first term is for standard conditions; the second term is the **correction for nonstandard conditions**. When all concentrations are 1 M it becomes zero.\n" +
        "- A pure solid or liquid has its concentration term replaced by unity; a gas has its partial pressure in atm.\n" +
        "- Steps: write the cell reaction and n, find \\(E^0_{\\text{cell}}\\), then substitute.",
      formula: {
        label: "Nernst equation at 25 °C",
        latex: "E_{\\text{cell}} = E^0_{\\text{cell}} - \\frac{0.0592}{n}\\log_{10}\\frac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}",
      },
      authoredExample: {
        prompt:
          "Calculate the emf of the cell Ni(s) | Ni²⁺(0.05 M) || Cu²⁺(0.5 M) | Cu(s) at 25 °C. E⁰ of Ni = −0.257 V, E⁰ of Cu = 0.337 V.",
        steps: [
          "Cell reaction: \\(\\text{Ni}(s) + \\text{Cu}^{2+}(aq) \\to \\text{Ni}^{2+}(aq) + \\text{Cu}(s)\\), so \\(n = 2\\).",
          "\\(E^0_{\\text{cell}} = 0.337 - (-0.257) = 0.594\\) V.",
          "Formula: \\(E_{\\text{cell}} = E^0_{\\text{cell}} - \\dfrac{0.0592}{2}\\log_{10}\\dfrac{[\\text{Ni}^{2+}]}{[\\text{Cu}^{2+}]}\\).",
          "Substitution: \\(E_{\\text{cell}} = 0.594 - 0.0296 \\log_{10}\\dfrac{0.05}{0.5} = 0.594 - 0.0296 \\times (-1)\\).",
          "\\(E_{\\text{cell}} = 0.594 + 0.0296 = 0.624\\) V.",
        ],
        answer: "emf = 0.624 V",
      },
      selfCheckExample: {
        prompt: "In a cell reaction with n = 2, the concentration of the only product ion is made 100 times larger while everything else stays the same. By how much does the emf change at 25 °C?",
        steps: ["The log term rises by \\(\\log_{10} 100 = 2\\).", "Change in emf \\(= -\\dfrac{0.0592}{2} \\times 2 = -0.0592\\) V."],
        answer: "The emf falls by 0.0592 V",
      },
      practiceSet: [
        { prompt: "What is the value of 2.303RT/F at 25 °C?", answer: "0.0592 V" },
        { prompt: "Which part of the Nernst equation is the correction for nonstandard conditions?", answer: "The second term, \\(-\\dfrac{0.0592}{n}\\log_{10}Q\\)" },
        { prompt: "In the Nernst equation, what replaces the concentration of a pure solid?", answer: "Unity (1)" },
        { prompt: "Write the Nernst equation at 25 °C for the cell reaction Zn + Cu²⁺ → Zn²⁺ + Cu.", answer: "\\(E_{\\text{cell}} = E^0_{\\text{cell}} - \\dfrac{0.0592}{2}\\log_{10}\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\)" },
      ],
      pyqExampleId: "417df272-07d7-46f1-ab13-f6ad1e335c22",
      traps: [
        {
          title: "Products and reactants swapped in the log",
          body: "The log term is products over reactants, each raised to its coefficient. Swapping them changes the sign of the correction.",
        },
        {
          title: "Wrong n",
          body: "n is the moles of electrons in the balanced cell reaction, after the half reactions are multiplied. For Zn with Cr³⁺, n is 6, not 2 or 3.",
        },
        {
          title: "Forgetting the power",
          body: "A coefficient becomes a power: with 2Ag⁺ in the reaction the term is \\([\\text{Ag}^+]^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-electrode-potential",
      name: "Potential of a single electrode",
      intuition:
        "The same idea works for one electrode written as a reduction. More metal ions in the solution push the reduction forward, so the electrode potential rises; a dilute solution lowers it.",
      definition:
        "- For the electrode \\(\\text{M}^{n+}(aq) \\mid \\text{M}(s)\\), written as the reduction \\(\\text{M}^{n+} + ne^- \\to \\text{M}\\):\n" +
        "- \\(E = E^0 - \\dfrac{0.0592}{n}\\log_{10}\\dfrac{1}{[\\text{M}^{n+}]}\\) at 25 °C, which is the same as \\(E = E^0 + \\dfrac{0.0592}{n}\\log_{10}[\\text{M}^{n+}]\\).\n" +
        "- Below 1 M the log is negative and the potential is lower than \\(E^0\\); above 1 M it is higher.",
      formula: {
        label: "Nernst equation for an electrode at 25 °C",
        latex: "E = E^0 - \\frac{0.0592}{n}\\log_{10}\\frac{1}{[\\text{M}^{n+}]}",
      },
      authoredExample: {
        prompt: "Calculate the potential of the electrode Ag⁺(0.001 M) | Ag(s) at 25 °C. E⁰ of Ag = 0.799 V.",
        steps: [
          "Given: \\(E^0 = 0.799\\) V, \\([\\text{Ag}^+] = 0.001\\) M. Electrode reaction: \\(\\text{Ag}^+ + e^- \\to \\text{Ag}\\), so \\(n = 1\\).",
          "Formula: \\(E = E^0 - \\dfrac{0.0592}{n}\\log_{10}\\dfrac{1}{[\\text{Ag}^+]}\\).",
          "Substitution: \\(E = 0.799 - 0.0592 \\times \\log_{10} 1000 = 0.799 - 0.0592 \\times 3\\).",
          "\\(E = 0.799 - 0.1776 = 0.621\\) V.",
        ],
        answer: "Electrode potential = 0.621 V",
      },
      selfCheckExample: {
        prompt: "The ions of a metal M²⁺ | M electrode are made 10 times more dilute. By how much does its potential change at 25 °C?",
        steps: ["\\(E = E^0 + \\dfrac{0.0592}{2}\\log_{10}[\\text{M}^{2+}]\\), and \\(\\log_{10}\\) of the concentration falls by 1.", "Change \\(= 0.0296 \\times (-1) = -0.0296\\) V."],
        answer: "It falls by 0.0296 V",
      },
      practiceSet: [
        { prompt: "What is the potential of an electrode whose ion concentration is 1 M?", answer: "Its standard potential, E⁰" },
        { prompt: "Write the Nernst equation at 25 °C for the electrode Al³⁺ | Al.", answer: "\\(E = E^0 - \\dfrac{0.0592}{3}\\log_{10}\\dfrac{1}{[\\text{Al}^{3+}]}\\)" },
      ],
      pyqExampleId: "affe9823-25c1-4a7c-9010-0fe0f5b38e88",
      traps: [
        {
          title: "Using 1/[M] with a plus sign",
          body: "Write either \\(-\\dfrac{0.0592}{n}\\log\\dfrac{1}{[\\text{M}^{n+}]}\\) or \\(+\\dfrac{0.0592}{n}\\log[\\text{M}^{n+}]\\). Mixing the two gives a potential on the wrong side of E⁰.",
        },
      ],
    },
  ],
};
