import type { SubtopicNote } from "@/app/notes/_types";

export const CELLS_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Galvanic Cells and Electrode Potentials",
  title: "Galvanic Cells and Electrode Potentials",
  oneLineDefinition:
    "Reading a table of standard reduction potentials: which couple is reduced, which species is the stronger oxidising or reducing agent, and how a cell is set up and written.",
  whyItMatters:
    "Fourteen PYQs, eleven of them multiple choice, and two from 2026. Six hand you a list of E° values and ask you to rank oxidising or reducing agents. Eight ask how a cell is built: which electrode is the anode, what E°cell is, and which cell runs a given reaction. Two ideas cover the page.",
  concepts: [
    // C1 — the electrochemical series
    {
      kind: "reference" as const,
      slug: "jcelec-series",
      name: "The electrochemical series",
      intuition:
        "A standard reduction potential measures how badly a couple wants to be reduced. The higher the \\(E^\\circ\\), the stronger the oxidised form is as an oxidising agent. The lower (more negative) the \\(E^\\circ\\), the stronger the reduced form is as a reducing agent. Every ranking question is this one table, read up or down.",
      definition:
        "- Each couple is written as a reduction: oxidised form \\(+\\,ne^-\\to\\) reduced form.\n" +
        "- **Higher \\(E^\\circ\\)**: the oxidised form is a stronger oxidising agent (\\(\\mathrm{F_2}\\), \\(\\mathrm{MnO_4^-}\\), \\(\\mathrm{Cl_2}\\)).\n" +
        "- **Lower \\(E^\\circ\\)**: the reduced form is a stronger reducing agent (\\(\\mathrm{Li}\\), \\(\\mathrm{Na}\\), \\(\\mathrm{Mg}\\)).\n" +
        "- An oxidant oxidises every reduced form whose couple lies BELOW it in the table.\n" +
        "- For a couple like \\(\\mathrm{Fe^{3+}/Fe^{2+}}\\), the reducing agent is the reduced form, \\(\\mathrm{Fe^{2+}}\\), not the metal.\n" +
        "- \\(E^\\circ(\\mathrm{M^+/M})\\) is built from a cycle: sublimation of the solid, ionisation of the GASEOUS atom, and hydration of the gaseous ion. Ionisation of the solid is not a step.\n" +
        "- \\(\\mathrm{Li^+/Li}\\) sits below \\(\\mathrm{Na^+/Na}\\) because the small \\(\\mathrm{Li^+}\\) ion has a very large hydration energy.",
      table: {
        columns: ["Couple", "E° at 298 K (V)", "What it tells you"],
        rows: [
          { cells: ["\\(\\mathrm{Li^+/Li}\\)", "\\(-3.05\\)", "Li is the strongest reducing agent in water"] },
          { cells: ["\\(\\mathrm{Na^+/Na}\\)", "\\(-2.71\\)", "Na ionises more easily than Li, yet its E° is higher"] },
          { cells: ["\\(\\mathrm{Mg^{2+}/Mg}\\)", "\\(-2.37\\)", "Mg displaces almost every metal ion from water"] },
          { cells: ["\\(\\mathrm{Al^{3+}/Al}\\)", "\\(-1.66\\)", "Al is a strong reducing agent"] },
          { cells: ["\\(\\mathrm{Zn^{2+}/Zn}\\)", "\\(-0.76\\)", "Zn is the anode of the Daniell cell"] },
          { cells: ["\\(\\mathrm{Cr^{3+}/Cr}\\)", "\\(-0.74\\)", "Cr is a reducing agent close to Zn"] },
          { cells: ["\\(\\mathrm{Fe^{2+}/Fe}\\)", "\\(-0.44\\)", "Fe dissolves in dilute acid and gives H₂"] },
          { cells: ["\\(\\mathrm{H^+/\\tfrac12 H_2}\\)", "\\(0.00\\)", "The zero of the scale, by definition"] },
          { cells: ["\\(\\mathrm{Cu^{2+}/Cu}\\)", "\\(+0.34\\)", "Cu does not release H₂ from dilute acid"] },
          { cells: ["\\(\\mathrm{I_2/I^-}\\)", "\\(+0.54\\)", "I⁻ is a fairly good reducing agent"] },
          { cells: ["\\(\\mathrm{Fe^{3+}/Fe^{2+}}\\)", "\\(+0.77\\)", "Fe³⁺ oxidises I⁻ to I₂"] },
          { cells: ["\\(\\mathrm{Ag^+/Ag}\\)", "\\(+0.80\\)", "Ag is oxidised by nitric acid"] },
          { cells: ["\\(\\mathrm{NO_3^-/NO}\\)", "\\(+0.97\\)", "Nitrate in acid oxidises Ag but not Au"] },
          { cells: ["\\(\\mathrm{Cr_2O_7^{2-}/Cr^{3+}}\\)", "\\(+1.33\\)", "Dichromate in acid oxidises Ag and Fe²⁺"] },
          { cells: ["\\(\\mathrm{Cl_2/Cl^-}\\)", "\\(+1.36\\)", "Cl₂ oxidises Br⁻ and I⁻"] },
          { cells: ["\\(\\mathrm{Au^{3+}/Au}\\)", "\\(+1.40\\)", "Au resists every common oxidant here"] },
          { cells: ["\\(\\mathrm{MnO_4^-/Mn^{2+}}\\)", "\\(+1.51\\)", "Permanganate in acid oxidises Cl⁻"] },
          { cells: ["\\(\\mathrm{F_2/F^-}\\)", "\\(+2.87\\)", "F₂ is the strongest oxidising agent"] },
        ],
        caption:
          "Read down the table for stronger oxidising agents (the left-hand species); read up for stronger reducing agents (the right-hand species).",
      },
      selfCheckExample: {
        prompt:
          "Given \\(E^\\circ\\): \\(\\mathrm{Zn^{2+}/Zn}=-0.76\\) V, \\(\\mathrm{Cu^{2+}/Cu}=+0.34\\) V, \\(\\mathrm{Ag^+/Ag}=+0.80\\) V and \\(\\mathrm{Br_2/Br^-}=+1.09\\) V. Rank \\(\\mathrm{Zn}\\), \\(\\mathrm{Cu}\\), \\(\\mathrm{Ag}\\) and \\(\\mathrm{Br^-}\\) as reducing agents. Which of the three metals can \\(\\mathrm{Br_2}\\) oxidise?",
        steps: [
          "The reducing agents are the reduced forms. The lower the \\(E^\\circ\\), the stronger they are.",
          "So \\(\\mathrm{Zn}\\,(-0.76) > \\mathrm{Cu}\\,(+0.34) > \\mathrm{Ag}\\,(+0.80) > \\mathrm{Br^-}\\,(+1.09)\\).",
          "\\(\\mathrm{Br_2}\\) oxidises every reduced form whose couple lies below \\(+1.09\\) V: all three metals.",
        ],
        answer: "\\(\\mathrm{Zn} > \\mathrm{Cu} > \\mathrm{Ag} > \\mathrm{Br^-}\\); \\(\\mathrm{Br_2}\\) oxidises Zn, Cu and Ag.",
      },
      practiceSet: [
        { prompt: "Stronger oxidising agent: \\(\\mathrm{Cl_2}\\) (1.36 V) or \\(\\mathrm{Br_2}\\) (1.09 V)?", answer: "\\(\\mathrm{Cl_2}\\)" },
        { prompt: "Can \\(\\mathrm{NO_3^-}\\) in acid (0.97 V) dissolve gold (1.40 V)?", answer: "No", method: "Gold's couple lies above nitrate's." },
        { prompt: "Why is \\(E^\\circ(\\mathrm{Li^+/Li})\\) below \\(E^\\circ(\\mathrm{Na^+/Na})\\)?", answer: "The large hydration energy of the small \\(\\mathrm{Li^+}\\) ion" },
        { prompt: "\\(E^\\circ(\\mathrm{M^+/M})\\) does not depend on: sublimation, ionisation of the gaseous atom, hydration, or ionisation of the solid atom?", answer: "Ionisation of the solid atom" },
        { prompt: "In the \\(\\mathrm{Fe^{3+}/Fe^{2+}}\\) couple, which species is the reducing agent?", answer: "\\(\\mathrm{Fe^{2+}}\\)" },
      ],
      pyqExampleId: "4312eaee-e16c-4211-a110-2429a542e35f", // 2026 — rank Al, Cr, Fe²⁺, Co²⁺ as reducing agents
      traps: [
        {
          title: "Picking the oxidised form as the reducing agent",
          body: "From \\(\\mathrm{Co^{3+}/Co^{2+}}\\) the candidate reducing agent is \\(\\mathrm{Co^{2+}}\\), not \\(\\mathrm{Co^{3+}}\\). Always read the right-hand species of a reduction couple when ranking reducing agents.",
        },
        {
          title: "Reading the sign backwards",
          body: "A more negative \\(E^\\circ\\) means a STRONGER reducing agent, not a weaker one. Lithium, at \\(-3.05\\) V, is the strongest of all.",
        },
      ],
    },

    // C2 — building and writing a cell
    {
      kind: "formula" as const,
      slug: "jcelec-cell-setup",
      name: "Setting up a galvanic cell",
      intuition:
        "Put two couples together and the one with the higher \\(E^\\circ\\) wins the electrons. It is reduced at the cathode; the other couple runs backwards and is oxidised at the anode. The cell voltage is the gap between the two potentials, never their sum.",
      definition:
        "- **Anode**: oxidation, the negative terminal, written on the LEFT. **Cathode**: reduction, the positive terminal, written on the RIGHT.\n" +
        "- Notation: anode \\(|\\) anode solution \\(\\|\\) cathode solution \\(|\\) cathode. The double line is the salt bridge.\n" +
        "- \\(E^\\circ_{cell}=E^\\circ_{cathode}-E^\\circ_{anode}\\), both taken as REDUCTION potentials.\n" +
        "- \\(E^\\circ\\) is intensive: multiplying a half-reaction by 2 does NOT double its \\(E^\\circ\\).\n" +
        "- A negative \\(E^\\circ_{cell}\\) for a reaction as written means the REVERSE reaction is spontaneous.\n" +
        "- Apply an external potential GREATER than \\(E_{cell}\\), in opposition, and the current reverses: the cell becomes electrolytic.\n" +
        "- Electrode types: gas electrode (\\(\\mathrm{Pt|H_2|H^+}\\)), metal–metal ion (\\(\\mathrm{Zn|Zn^{2+}}\\)), redox (\\(\\mathrm{Pt|Fe^{3+},Fe^{2+}}\\)), and metal–insoluble salt–anion (calomel \\(\\mathrm{Hg|Hg_2Cl_2|Cl^-}\\); \\(\\mathrm{Ag|AgCl|Cl^-}\\)).\n" +
        "- A good reference electrode keeps its potential steady, so it has the smallest \\((\\partial E/\\partial T)_P\\).\n" +
        "- To choose the cell for a reaction, check that its electrolyte supplies every ion in the equation.",
      formula: {
        label: "Standard cell potential",
        latex: "E^\\circ_{cell}=E^\\circ_{cathode}-E^\\circ_{anode}",
        symbols: [
          { symbol: "E^\\circ_{cathode}", meaning: "reduction potential of the couple that is reduced (higher)" },
          { symbol: "E^\\circ_{anode}", meaning: "reduction potential of the couple that is oxidised (lower)" },
        ],
      },
      authoredExample: {
        prompt:
          "A cell is made from \\(\\mathrm{Ni^{2+}/Ni}\\) (\\(E^\\circ=-0.25\\) V) and \\(\\mathrm{Ag^+/Ag}\\) (\\(E^\\circ=+0.80\\) V). Name the anode, write the cell and its reaction, and find \\(E^\\circ_{cell}\\).",
        steps: [
          "\\(\\mathrm{Ag^+/Ag}\\) has the higher \\(E^\\circ\\), so silver is the cathode. Nickel is oxidised at the anode.",
          "Cell: \\(\\mathrm{Ni|Ni^{2+}\\|Ag^+|Ag}\\).",
          "Anode: \\(\\mathrm{Ni\\to Ni^{2+}+2e^-}\\). Cathode: \\(\\mathrm{2Ag^++2e^-\\to 2Ag}\\).",
          "Reaction: \\(\\mathrm{Ni+2Ag^+\\to Ni^{2+}+2Ag}\\).",
          "\\(E^\\circ_{cell}=0.80-(-0.25)=1.05\\) V. The silver half-reaction was doubled, but its \\(E^\\circ\\) is not.",
        ],
        answer: "Anode Ni; \\(\\mathrm{Ni|Ni^{2+}\\|Ag^+|Ag}\\); \\(E^\\circ_{cell}=1.05\\) V.",
      },
      selfCheckExample: {
        prompt:
          "Couple \\(\\mathrm{Mg^{2+}/Mg}\\) (\\(-2.37\\) V) with \\(\\mathrm{Cu^{2+}/Cu}\\) (\\(+0.34\\) V). Write the cell and find \\(E^\\circ_{cell}\\). Is \\(\\mathrm{Cu+Mg^{2+}\\to Cu^{2+}+Mg}\\) spontaneous?",
        steps: [
          "Copper has the higher \\(E^\\circ\\), so it is the cathode. Magnesium is the anode.",
          "Cell: \\(\\mathrm{Mg|Mg^{2+}\\|Cu^{2+}|Cu}\\); \\(E^\\circ_{cell}=0.34-(-2.37)=2.71\\) V.",
          "The reaction asked about is the reverse of the cell reaction. Its \\(E^\\circ=-2.71\\) V, so it is not spontaneous.",
        ],
        answer: "\\(E^\\circ_{cell}=2.71\\) V; the reverse reaction is not spontaneous.",
      },
      practiceSet: [
        { prompt: "\\(E^\\circ_{cell}\\) of \\(\\mathrm{Zn|Zn^{2+}\\|Cu^{2+}|Cu}\\)?", answer: "\\(1.10\\) V", method: "\\(0.34-(-0.76)\\)." },
        { prompt: "An opposing external potential larger than \\(E_{cell}\\) is applied. What happens?", answer: "Current reverses; the cell becomes electrolytic" },
        { prompt: "What type of electrode is the calomel electrode?", answer: "Metal–insoluble salt–anion electrode" },
        { prompt: "Which cell runs \\(\\mathrm{\\tfrac12 H_2+AgCl\\to H^++Cl^-+Ag}\\): one with HCl or one with KCl as electrolyte?", answer: "HCl", method: "It must supply both \\(\\mathrm{H^+}\\) and \\(\\mathrm{Cl^-}\\)." },
        { prompt: "Two half-cells have \\((\\partial E/\\partial T)_P\\) of \\(3\\times10^{-4}\\) and \\(0.5\\times10^{-4}\\) V K⁻¹. Which is the better reference?", answer: "The \\(0.5\\times10^{-4}\\) one" },
      ],
      pyqExampleId: "4da06ff6-205d-47b2-bd2b-90f43feba41d", // 2026 — Fe(OH)₂/Fe with AgBr/Ag: overall reaction, sign of E°, intensive E°
      traps: [
        {
          title: "Adding the two potentials",
          body: "\\(E^\\circ_{cell}\\) is a difference of two reduction potentials. Flipping the anode's sign and then adding gives the same number, but adding the two tabulated values does not.",
        },
        {
          title: "Scaling E° with the equation",
          body: "Balancing electrons may double a half-reaction. Its \\(\\Delta G^\\circ\\) doubles; its \\(E^\\circ\\) does not, because \\(E^\\circ\\) is intensive.",
        },
      ],
    },
  ],
};
