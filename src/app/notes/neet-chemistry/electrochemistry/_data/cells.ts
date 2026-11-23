import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EC_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Galvanic Cells and Electrode Potentials",
  title: "Galvanic Cells and Electrode Potentials",
  oneLineDefinition:
    "How a galvanic cell turns a redox reaction into a voltage, reading standard electrode potentials, the Nernst equation for non-standard concentrations, and the link between E°cell, Gibbs energy and the equilibrium constant.",
  whyItMatters:
    "Seven NEET questions from 2022 to 2026. Two read electrode potentials to judge a reaction: which displacement cannot occur (2022), and whether permanganate frees oxygen from acidified water (2022). Two use the Nernst equation: a cell emf in 2022 (a question NTA later dropped) and a hydrogen half cell at 2 atm in 2026. Three link the cell potential to Gibbs energy: ΔG° from E° (Re-NEET 2024), E° of Fe³⁺/Fe²⁺ from two other potentials (Re-NEET 2026), and an assertion on why ΔrG depends on n (2023).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchec-series",
      name: "Standard electrode potentials and the electrochemical series",
      intuition:
        "Every half cell is written as a reduction and given a number, its standard electrode potential E°, measured against the standard hydrogen electrode. A high E° means the couple badly wants electrons, so its oxidised form is a strong oxidising agent. A low (very negative) E° means the couple gives electrons away easily, so its reduced form is a strong reducing agent. Lined up in order, these numbers form the electrochemical series, and most questions are one look at it.",
      definition:
        "- **Standard hydrogen electrode (SHE):** a platinum electrode coated with platinum black, dipped in 1 M H⁺, with pure H₂ at 1 bar bubbled over it. Its E° is taken as zero at all temperatures.\n" +
        "- Standard conditions: every ion at 1 M, every gas at 1 bar. All tabulated values are **reduction** potentials.\n" +
        "- **Higher E°:** the oxidised form is a stronger oxidising agent. F₂ (2.87 V) is the strongest.\n" +
        "- **Lower E°:** the reduced form is a stronger reducing agent. Li (\\(-3.05\\) V) is the strongest.\n" +
        "- A negative E° means the couple is a stronger reducing agent than H⁺/H₂, so such a metal can give H₂ with a dilute acid. Copper (0.34 V) cannot; it dissolves in nitric acid because nitrate, not H⁺, oxidises it.\n" +
        "- A reaction between two couples goes forward when the couple with the higher E° is the one reduced.",
      table: {
        columns: ["Couple", "E° at 298 K (V)", "What it tells you"],
        rows: [
          { cells: ["\\(\\text{Li}^{+}/\\text{Li}\\)", "\\(-3.05\\)", "Li is the strongest reducing agent in the table"] },
          { cells: ["\\(\\text{K}^{+}/\\text{K}\\)", "\\(-2.93\\)", "A very strong reducing agent"] },
          { cells: ["\\(\\text{Al}^{3+}/\\text{Al}\\)", "\\(-1.66\\)", "Al is a strong reducing agent"] },
          { cells: ["\\(\\text{Zn}^{2+}/\\text{Zn}\\)", "\\(-0.76\\)", "Zn is the anode of the Daniell cell"] },
          { cells: ["\\(\\text{Fe}^{2+}/\\text{Fe}\\)", "\\(-0.44\\)", "Fe gives H₂ with dilute acid"] },
          { cells: ["\\(\\text{Ni}^{2+}/\\text{Ni}\\)", "\\(-0.25\\)", "Ni lies just below hydrogen"] },
          { cells: ["\\(\\text{H}^{+}/\\text{H}_2\\)", "\\(0.00\\)", "The zero of the scale, by definition"] },
          { cells: ["\\(\\text{Cu}^{2+}/\\text{Cu}\\)", "\\(+0.34\\)", "Cu gives no H₂ with dilute acid"] },
          { cells: ["\\(\\text{I}_2/\\text{I}^{-}\\)", "\\(+0.54\\)", "I⁻ is a fairly good reducing agent"] },
          { cells: ["\\(\\text{Fe}^{3+}/\\text{Fe}^{2+}\\)", "\\(+0.77\\)", "Fe³⁺ can oxidise I⁻ to I₂"] },
          { cells: ["\\(\\text{Ag}^{+}/\\text{Ag}\\)", "\\(+0.80\\)", "Ag cannot reduce Cu²⁺"], noteAmber: "NEET 2022: Ag cannot displace Cu from CuSO₄, because Ag⁺/Ag (0.80 V) lies above Cu²⁺/Cu (0.34 V)." },
          { cells: ["\\(\\text{Br}_2/\\text{Br}^{-}\\)", "\\(+1.09\\)", "Br₂ oxidises I⁻ but not Cl⁻"] },
          { cells: ["\\(\\text{Cl}_2/\\text{Cl}^{-}\\)", "\\(+1.36\\)", "Cl₂ oxidises Br⁻ and I⁻"] },
          { cells: ["\\(\\text{MnO}_4^{-}/\\text{Mn}^{2+}\\)", "\\(+1.51\\)", "Acidified permanganate is a strong oxidising agent"] },
          { cells: ["\\(\\text{F}_2/\\text{F}^{-}\\)", "\\(+2.87\\)", "F₂ is the strongest oxidising agent"] },
        ],
        caption:
          "Read down the table for stronger oxidising agents (the left-hand species); read up for stronger reducing agents (the right-hand species).",
      },
      pyqExampleId: "212cbe08-ef79-40f7-be34-66ca710efbe6",
      selfCheckExample: {
        prompt:
          "Using the table, arrange Ag, Zn, Fe and Cu in order of decreasing strength as reducing agents.",
        steps: [
          "The reducing agents are the reduced forms (the metals). The lower the E°, the stronger the reducing agent.",
          "Zn (\\(-0.76\\)) < Fe (\\(-0.44\\)) < Cu (\\(+0.34\\)) < Ag (\\(+0.80\\)) in E°.",
          "So the order of reducing strength is the reverse of the order of E°.",
        ],
        answer: "Zn > Fe > Cu > Ag",
      },
      practiceSet: [
        { prompt: "Which is the strongest oxidising agent in the electrochemical series?", answer: "F₂" },
        { prompt: "What is the standard electrode potential of the standard hydrogen electrode?", answer: "Zero, at all temperatures" },
        { prompt: "Which of zinc and copper gives hydrogen gas with dilute hydrochloric acid?", answer: "Zinc (its E° is negative)" },
        { prompt: "A couple has a higher E° than another. Is its oxidised form the stronger or the weaker oxidising agent?", answer: "The stronger oxidising agent" },
      ],
      traps: [
        {
          title: "Every tabulated value is a reduction potential",
          body: "The table lists reduction potentials only. To judge a reaction, find which couple is reduced in it and which is oxidised, then check that the reduced couple has the higher E°.",
        },
        {
          title: "More negative means a stronger reducing agent",
          body: "Lithium, at \\(-3.05\\) V, is the strongest reducing agent of all. A more negative E° means the metal gives up electrons more easily, not less.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-ecell",
      name: "Galvanic cells and E°cell",
      visualizationSlug: "imat-galvanic-cell",
      intuition:
        "A galvanic cell keeps the two halves of a redox reaction apart, so the electrons must travel through a wire to get from one to the other, and that flow is a current. In the Daniell cell zinc is oxidised and Cu²⁺ is reduced. The couple with the higher E° wins the electrons and is reduced at the cathode; the other couple runs backwards and is oxidised at the anode. The cell voltage is the gap between the two potentials.",
      definition:
        "- **Anode:** oxidation happens here; in a galvanic cell it is the negative terminal, written on the LEFT.\n" +
        "- **Cathode:** reduction happens here; it is the positive terminal, written on the RIGHT.\n" +
        "- Cell notation: \\(\\text{Zn(s)}|\\text{Zn}^{2+}\\text{(aq)}\\,\\|\\,\\text{Cu}^{2+}\\text{(aq)}|\\text{Cu(s)}\\). The double line is the salt bridge.\n" +
        "- \\(E^\\circ_{cell} = E^\\circ_{right} - E^\\circ_{left} = E^\\circ_{cathode} - E^\\circ_{anode}\\), both taken as reduction potentials. The Daniell cell gives 1.1 V.\n" +
        "- A positive \\(E^\\circ_{cell}\\) means the reaction as written is spontaneous; a negative one means the reverse reaction is.\n" +
        "- E° does not change when a half reaction is multiplied by a number to balance the electrons.\n" +
        "- An opposing outside potential greater than 1.1 V on a Daniell cell reverses the current: zinc is deposited at the zinc electrode and copper dissolves. The cell now works as an electrolytic cell.",
      formula: {
        label: "Standard cell potential",
        latex: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
        symbols: [
          { symbol: "\\(E^\\circ_{cathode}\\)", meaning: "reduction potential of the couple that is reduced (right electrode)" },
          { symbol: "\\(E^\\circ_{anode}\\)", meaning: "reduction potential of the couple that is oxidised (left electrode)" },
        ],
      },
      authoredExample: {
        prompt:
          "A cell is made from \\(\\text{Zn}^{2+}/\\text{Zn}\\) (\\(E^\\circ = -0.76\\) V) and \\(\\text{Ag}^{+}/\\text{Ag}\\) (\\(E^\\circ = +0.80\\) V). Name the anode, write the cell and its reaction, and find \\(E^\\circ_{cell}\\).",
        steps: [
          "Ag⁺/Ag has the higher E°, so silver is the cathode. Zinc is oxidised at the anode.",
          "Cell: \\(\\text{Zn}|\\text{Zn}^{2+}\\,\\|\\,\\text{Ag}^{+}|\\text{Ag}\\).",
          "Anode: \\(\\text{Zn} \\rightarrow \\text{Zn}^{2+} + 2e^-\\). Cathode: \\(2\\text{Ag}^{+} + 2e^- \\rightarrow 2\\text{Ag}\\).",
          "Reaction: \\(\\text{Zn} + 2\\text{Ag}^{+} \\rightarrow \\text{Zn}^{2+} + 2\\text{Ag}\\).",
          "\\(E^\\circ_{cell} = 0.80 - (-0.76) = 1.56\\) V. The silver half reaction was doubled, but its E° stays 0.80 V.",
        ],
        answer: "Anode Zn; \\(E^\\circ_{cell} = 1.56\\) V",
      },
      selfCheckExample: {
        prompt:
          "A cell is built from \\(\\text{Ni}^{2+}/\\text{Ni}\\) (\\(-0.25\\) V) and \\(\\text{Cu}^{2+}/\\text{Cu}\\) (\\(+0.34\\) V). Which electrode is the positive terminal, and what is \\(E^\\circ_{cell}\\)?",
        steps: [
          "Cu²⁺/Cu has the higher E°, so copper is the cathode, the positive terminal.",
          "\\(E^\\circ_{cell} = 0.34 - (-0.25) = 0.59\\) V.",
        ],
        answer: "Copper is positive; \\(E^\\circ_{cell} = 0.59\\) V",
      },
      practiceSet: [
        { prompt: "In a galvanic cell, at which electrode does oxidation take place, and what is its sign?", answer: "The anode; it is negative" },
        { prompt: "What is \\(E^\\circ_{cell}\\) of the Daniell cell, \\(\\text{Zn}|\\text{Zn}^{2+}\\,\\|\\,\\text{Cu}^{2+}|\\text{Cu}\\), given \\(-0.76\\) V and \\(+0.34\\) V?", answer: "1.10 V" },
        { prompt: "A reaction has \\(E^\\circ_{cell} = -0.30\\) V as written. Which direction is spontaneous?", answer: "The reverse reaction" },
        { prompt: "An opposing outside potential of 1.5 V is applied to a Daniell cell. What happens at the zinc electrode?", answer: "Zinc is deposited there; the cell works as an electrolytic cell" },
      ],
      pyqExampleId: "f834e980-b442-4b6b-aca1-c607823fa910",
      traps: [
        {
          title: "Subtract, do not add",
          body: "\\(E^\\circ_{cell}\\) is the cathode's reduction potential minus the anode's. Adding the two tabulated values gives a wrong answer whenever the anode's E° is not zero.",
        },
        {
          title: "Watch which way a potential is written",
          body: "A question may give an oxidation potential, such as \\(E^\\circ\\) of \\(\\text{Mn}^{2+}/\\text{MnO}_4^{-}\\) as \\(-1.51\\) V. Turn it into the reduction potential (\\(+1.51\\) V) by changing its sign before you subtract.",
        },
        {
          title: "Doubling a half reaction leaves E° alone",
          body: "Balancing the electrons may double a half reaction. Its E° stays the same, because E° does not depend on how much substance reacts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-nernst",
      name: "The Nernst equation",
      intuition:
        "E° is the voltage when every ion is at 1 M and every gas at 1 bar. At other concentrations the voltage shifts a little, by a log term. More product pushes the voltage down; more reactant pushes it up. When the reaction reaches equilibrium the voltage has fallen to zero.",
      definition:
        "- For a cell at 298 K: \\(E_{cell} = E^\\circ_{cell} - \\dfrac{0.059}{n}\\log Q\\), where \\(\\dfrac{2.303RT}{F} = 0.059\\) V.\n" +
        "- Q is products over reactants, each raised to its coefficient in the balanced equation. Solids count as 1; a gas enters as its pressure in bar.\n" +
        "- n is the number of electrons in the balanced reaction (2 for the Daniell cell).\n" +
        "- Daniell cell: \\(E_{cell} = 1.10 - \\dfrac{0.059}{2}\\log\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\).\n" +
        "- For one electrode written as a reduction: \\(E(\\text{M}^{n+}/\\text{M}) = E^\\circ - \\dfrac{0.059}{n}\\log\\dfrac{1}{[\\text{M}^{n+}]}\\).\n" +
        "- Hydrogen electrode at 1 bar: \\(E(\\text{H}^{+}/\\text{H}_2) = -0.059\\,\\text{pH}\\).\n" +
        "- At equilibrium \\(E_{cell} = 0\\); \\(E^\\circ_{cell}\\) itself never changes as the cell runs.",
      formula: {
        label: "Nernst equation at 298 K",
        latex: "E_{cell} = E^\\circ_{cell} - \\frac{0.059}{n}\\log Q",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "products over reactants, powers from the balanced equation" },
          { symbol: "\\(n\\)", meaning: "electrons transferred in the balanced reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the emf at 298 K of \\(\\text{Zn}|\\text{Zn}^{2+}(0.1\\ \\text{M})\\,\\|\\,\\text{Cu}^{2+}(0.001\\ \\text{M})|\\text{Cu}\\), given \\(E^\\circ_{cell} = 1.10\\) V.",
        steps: [
          "Reaction: \\(\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}\\), so \\(n = 2\\).",
          "\\(Q = \\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = \\dfrac{0.1}{0.001} = 100\\), so \\(\\log Q = 2\\).",
          "\\(E = 1.10 - \\dfrac{0.059}{2} \\times 2 = 1.10 - 0.059 = 1.041\\) V.",
        ],
        answer: "\\(E_{cell} = 1.041\\) V",
      },
      selfCheckExample: {
        prompt:
          "In a Daniell cell, \\([\\text{Zn}^{2+}]\\) is made 10 times larger while \\([\\text{Cu}^{2+}]\\) is kept the same. By how much does the emf change at 298 K?",
        steps: [
          "Q has \\([\\text{Zn}^{2+}]\\) on top, so Q also becomes 10 times larger and \\(\\log Q\\) rises by 1.",
          "The emf falls by \\(\\dfrac{0.059}{2} \\times 1 = 0.0295\\) V.",
        ],
        answer: "It falls by about 0.03 V",
      },
      practiceSet: [
        { prompt: "Write Q for the cell reaction \\(\\text{Cu} + 2\\text{Ag}^{+} \\rightarrow \\text{Cu}^{2+} + 2\\text{Ag}\\).", answer: "\\(Q = \\dfrac{[\\text{Cu}^{2+}]}{[\\text{Ag}^{+}]^2}\\)" },
        { prompt: "What is the emf of a cell once its reaction has reached equilibrium?", answer: "Zero" },
        { prompt: "Find the electrode potential of \\(\\text{Cu}^{2+}/\\text{Cu}\\) at 298 K when \\([\\text{Cu}^{2+}] = 0.01\\) M, given \\(E^\\circ = 0.34\\) V.", answer: "0.281 V", method: "\\(0.34 - \\dfrac{0.059}{2}\\log 100\\)" },
        { prompt: "To raise the emf of a Daniell cell, should \\([\\text{Cu}^{2+}]\\) be raised or lowered?", answer: "Raised" },
      ],
      pyqExampleId: "2b5d568e-55a2-48a5-b121-9df5276cf80f",
      traps: [
        {
          title: "Keep the powers in Q",
          body: "In \\(\\text{Ni} + 2\\text{Ag}^{+}\\), the silver ion is squared in Q. Balance the equation first; the same balancing gives both n and the powers.",
        },
        {
          title: "Oxidation or reduction potential",
          body: "A half cell written \\(\\text{Pt}|\\text{H}_2|\\text{H}^{+}\\) is an oxidation, \\(\\text{H}_2 \\rightarrow 2\\text{H}^{+} + 2e^-\\), and Q is \\(\\dfrac{[\\text{H}^{+}]^2}{p_{\\text{H}_2}}\\). The reduction potential of the same electrode has the same size and the opposite sign.",
        },
        {
          title: "Q upside down",
          body: "Q is products over reactants. Writing it the other way round flips the sign of the log term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchec-gibbs",
      name: "Gibbs energy, equilibrium constant and E°cell",
      intuition:
        "A cell's voltage is the Gibbs energy it releases per unit of charge. Multiply it by the charge that flows, nF, and you have the Gibbs energy of the reaction. A positive E° gives a negative ΔG°, so the reaction is spontaneous, and it also gives a large equilibrium constant. Potentials themselves do not add up, but Gibbs energies do, which is how two known potentials give a third.",
      definition:
        "- \\(\\Delta_r G^\\circ = -nFE^\\circ_{cell}\\) and \\(\\Delta_r G = -nFE_{cell}\\), with \\(F = 96487\\ \\text{C mol}^{-1}\\) (often rounded to 96500).\n" +
        "- \\(E_{cell}\\) is an intensive property; \\(\\Delta_r G\\) is extensive, so its value depends on n.\n" +
        "- \\(\\Delta_r G^\\circ = -2.303RT\\log K\\), so at 298 K \\(\\log K = \\dfrac{nE^\\circ_{cell}}{0.059}\\).\n" +
        "- Positive \\(E^\\circ_{cell}\\): \\(\\Delta_r G^\\circ\\) negative and \\(K > 1\\). Zero \\(E^\\circ_{cell}\\): \\(K = 1\\).\n" +
        "- To find a new E° from two others, add or subtract their \\(\\Delta G^\\circ = -nFE^\\circ\\), then divide by the new n. For iron: \\(E^\\circ(\\text{Fe}^{3+}/\\text{Fe}^{2+}) = 3E^\\circ(\\text{Fe}^{3+}/\\text{Fe}) - 2E^\\circ(\\text{Fe}^{2+}/\\text{Fe})\\).",
      formula: {
        label: "Gibbs energy and equilibrium constant",
        latex: "\\Delta_r G^\\circ = -nFE^\\circ_{cell}, \\qquad \\log K = \\frac{nE^\\circ_{cell}}{0.059}\\ \\text{(298 K)}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "electrons transferred in the balanced reaction" },
          { symbol: "\\(F\\)", meaning: "the Faraday, the charge on one mole of electrons" },
          { symbol: "\\(K\\)", meaning: "equilibrium constant of the cell reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\text{Cu(s)} + 2\\text{Ag}^{+}\\text{(aq)} \\rightarrow \\text{Cu}^{2+}\\text{(aq)} + 2\\text{Ag(s)}\\), \\(E^\\circ_{cell} = 0.46\\) V. Find the equilibrium constant at 298 K.",
        steps: [
          "Two electrons move from Cu to the two Ag⁺ ions, so \\(n = 2\\).",
          "\\(\\log K = \\dfrac{2 \\times 0.46}{0.059} = \\dfrac{0.92}{0.059} = 15.59\\).",
          "\\(K = 10^{15.59} \\approx 3.9 \\times 10^{15}\\).",
        ],
        answer: "\\(K \\approx 3.9 \\times 10^{15}\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = 0.34\\) V and \\(E^\\circ(\\text{Cu}^{+}/\\text{Cu}) = 0.52\\) V. Find \\(E^\\circ(\\text{Cu}^{2+}/\\text{Cu}^{+})\\).",
        steps: [
          "\\(\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}\\): \\(\\Delta G^\\circ_1 = -2F(0.34) = -0.68F\\).",
          "\\(\\text{Cu}^{+} + e^- \\rightarrow \\text{Cu}\\): \\(\\Delta G^\\circ_2 = -1F(0.52) = -0.52F\\).",
          "The first minus the second is \\(\\text{Cu}^{2+} + e^- \\rightarrow \\text{Cu}^{+}\\): \\(\\Delta G^\\circ_3 = -0.68F + 0.52F = -0.16F\\).",
          "With \\(n = 1\\): \\(E^\\circ_3 = 0.16\\) V.",
        ],
        answer: "0.16 V",
      },
      practiceSet: [
        { prompt: "A cell reaction has a positive \\(E^\\circ_{cell}\\). What is the sign of \\(\\Delta_r G^\\circ\\), and is K greater or less than 1?", answer: "\\(\\Delta_r G^\\circ\\) is negative and K > 1" },
        { prompt: "Find \\(\\log K\\) at 298 K for a reaction with \\(n = 2\\) and \\(E^\\circ_{cell} = 0.295\\) V.", answer: "10" },
        { prompt: "What are K and \\(\\Delta_r G^\\circ\\) for a reaction whose \\(E^\\circ_{cell}\\) is zero?", answer: "K = 1 and \\(\\Delta_r G^\\circ = 0\\)" },
        { prompt: "Is the cell potential an intensive or an extensive property?", answer: "Intensive" },
      ],
      pyqExampleId: "a62df5c9-80a8-4895-b37e-6f738166c499",
      traps: [
        {
          title: "Joules, not kilojoules",
          body: "\\(nFE^\\circ\\) comes out in joules per mole. Divide by 1000 before comparing with options in kJ mol⁻¹.",
        },
        {
          title: "Potentials do not subtract directly",
          body: "\\(E^\\circ(\\text{Fe}^{3+}/\\text{Fe}) - E^\\circ(\\text{Fe}^{2+}/\\text{Fe})\\) is not \\(E^\\circ(\\text{Fe}^{3+}/\\text{Fe}^{2+})\\). Multiply each potential by its own number of electrons first, because only Gibbs energies add.",
        },
      ],
    },
  ],
};
