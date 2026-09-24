import type { SubtopicNote } from "@/app/notes/_types";

export const BATTERIES_NOTE: SubtopicNote = {
  subtopicName: "Batteries, Primary, Secondary and Fuel Cells",
  title: "Batteries, Primary, Secondary and Fuel Cells",
  oneLineDefinition:
    "A primary cell (dry cell, mercury cell) is used once; a secondary cell (lead accumulator, nickel–cadmium) is recharged by running its reaction backwards as an electrolysis; a fuel cell is fed its reactants continuously.",
  whyItMatters:
    "9 PYQs, none HARD — one short recall page. The paper asks what happens at the positive electrode of a dry cell (MnO₂ reduced to Mn₂O₃), what is consumed or produced when a lead accumulator discharges or recharges, and which statement about the H₂–O₂ fuel cell is wrong. " +
    "Know the four half-reactions and the page is done.",
  concepts: [
    // 1 — dry cell and lead accumulator
    {
      kind: "reference" as const,
      slug: "cetec-dry-cell-and-lead-accumulator",
      name: "Dry Cell, Lead Accumulator and Nickel–Cadmium Cell",
      intuition:
        "Every battery is a galvanic cell with the anode metal named first. Dry cell: zinc case oxidised, MnO₂ reduced. Lead accumulator: lead oxidised and PbO₂ reduced on discharge, both to PbSO₄ while sulphuric acid is consumed — and recharging runs both electrodes backwards.",
      definition:
        "- **Dry cell (Leclanché)**, primary, 1.5 V. Anode \\(\\text{Zn} \\to \\text{Zn}^{2+} + 2e^-\\). Cathode (positive, a graphite rod in MnO₂ + NH₄Cl paste): \\(2\\text{MnO}_2 + 2\\text{NH}_4^+ + 2e^- \\to \\text{Mn}_2\\text{O}_3 + 2\\text{NH}_3 + \\text{H}_2\\text{O}\\) — MnO₂ is reduced to Mn₂O₃. NH₄⁺ reduction also gives some H₂. n = 2, so \\(E^\\circ = -\\Delta G^\\circ/2F\\).\n" +
        "- **Mercury (button) cell**, primary: Zn–Hg amalgam anode, HgO cathode, KOH paste; steady 1.35 V.\n" +
        "- **Lead accumulator**, secondary, 2 V per cell, 38% H₂SO₄. Discharge — anode \\(\\text{Pb} + \\text{SO}_4^{2-} \\to \\text{PbSO}_4 + 2e^-\\); cathode \\(\\text{PbO}_2 + 4\\text{H}^+ + \\text{SO}_4^{2-} + 2e^- \\to \\text{PbSO}_4 + 2\\text{H}_2\\text{O}\\); net \\(\\text{Pb} + \\text{PbO}_2 + 2\\text{H}_2\\text{SO}_4 \\to 2\\text{PbSO}_4 + 2\\text{H}_2\\text{O}\\): H₂SO₄ CONSUMED, PbSO₄ PRODUCED, density of the acid falls.\n" +
        "- **Recharge** reverses it: at the positive plate PbSO₄ is OXIDISED to PbO₂; at the negative plate PbSO₄ is reduced to Pb.\n" +
        "- **Nickel–cadmium**, secondary: Cd anode, NiO(OH) cathode, KOH; longer life than lead–acid.",
      table: {
        columns: ["Cell", "Type", "Anode (−)", "Cathode (+)", "Note"],
        rows: [
          { cells: ["Dry cell", "Primary", "Zn → Zn²⁺ + 2e⁻", "MnO₂ → Mn₂O₃ (reduced); NH₄⁺ → NH₃ + H₂", "1.5 V; n = 2"] },
          { cells: ["Mercury cell", "Primary", "Zn(Hg) → Zn²⁺", "HgO → Hg", "1.35 V, steady"], noteAmber: "PRIMARY — the 2022 paper's key called only the dry cell primary; the textbook counts the mercury cell too." },
          { cells: ["Lead accumulator (discharge)", "Secondary", "Pb → PbSO₄", "PbO₂ → PbSO₄", "H₂SO₄ consumed, water formed"] },
          { cells: ["Lead accumulator (recharge)", "Secondary", "PbSO₄ → Pb (reduced)", "PbSO₄ → PbO₂ (oxidised)", "Electrolysis: an external source drives it"], noteAmber: "On recharge the POSITIVE plate is oxidised — the reverse of normal cathode behaviour." },
          { cells: ["Ni–Cd", "Secondary", "Cd → Cd(OH)₂", "NiO(OH) → Ni(OH)₂", "KOH electrolyte"] },
        ],
        caption: "Discharge is galvanic (spontaneous); recharge is electrolytic (driven).",
      },
      selfCheckExample: {
        prompt: "During discharge of a lead accumulator, which is true: Pb is reduced; H₂SO₄ is consumed; PbSO₄ is consumed; PbO₂ is produced?",
        steps: [
          "Pb is oxidised, PbSO₄ is produced at both plates, PbO₂ is consumed. Sulphuric acid is used up.",
        ],
        answer: "H₂SO₄ is consumed",
      },
      practiceSet: [
        { prompt: "Positive-electrode change in a working dry cell?", answer: "MnO₂ reduced to Mn₂O₃" },
        { prompt: "Gas from NH₄⁺ reduction in a dry cell?", answer: "Hydrogen" },
        { prompt: "Positive-electrode change on RECHARGING a lead accumulator?", answer: "PbSO₄ oxidised to PbO₂" },
        { prompt: "Which is NOT secondary: lead storage, dry cell, Ni–Cd?", answer: "Dry cell" },
      ],
      pyqExampleId: "ececfeff-c8ee-4079-89fd-2d595d1980e4",
      traps: [
        {
          title: "Swapping discharge and recharge at the positive plate",
          body:
            "On DISCHARGE the positive plate reduces PbO₂ → PbSO₄. On RECHARGE the same plate oxidises PbSO₄ → PbO₂. The paper asks for one and offers the other.",
        },
      ],
    },

    // 2 — fuel cell
    {
      kind: "formula" as const,
      slug: "cetec-hydrogen-oxygen-fuel-cell",
      name: "The Hydrogen–Oxygen Fuel Cell",
      intuition:
        "A fuel cell is a galvanic cell that never runs down because hydrogen (the fuel and reducing agent) and oxygen (the oxidising agent) are fed in continuously. The electrodes are porous carbon impregnated with a platinum or palladium catalyst, sitting in hot aqueous KOH; the only product is water.",
      definition:
        "- Anode: \\(2\\text{H}_2 + 4\\text{OH}^- \\to 4\\text{H}_2\\text{O} + 4e^-\\) — H₂ is oxidised, so H₂ is the REDUCING agent.\n" +
        "- Cathode: \\(\\text{O}_2 + 2\\text{H}_2\\text{O} + 4e^- \\to 4\\text{OH}^-\\) — O₂ is the oxidising agent.\n" +
        "- Net: \\(2\\text{H}_2 + \\text{O}_2 \\to 2\\text{H}_2\\text{O}\\); \\(E^\\circ = 1.23\\) V; efficiency ~70%, pollution-free; used in spacecraft.\n" +
        "- Electrodes are POROUS CARBON (graphite) with Pt/Pd catalyst — 'platinum wires' is the planted false statement. Electrolyte: hot concentrated KOH (not NaOH as a reagent).",
      formula: {
        label: "Fuel cell net reaction",
        latex:
          "2\\text{H}_2(g) + \\text{O}_2(g) \\to 2\\text{H}_2\\text{O}(l),\\qquad E^\\circ = 1.23\\ \\text{V}",
      },
      authoredExample: {
        prompt: "Identify the oxidising agent, the reducing agent and the electrolyte of the H₂–O₂ fuel cell.",
        steps: [
          "O₂ is reduced at the cathode (oxidising agent); H₂ is oxidised at the anode (reducing agent); hot aqueous KOH carries the OH⁻.",
        ],
        answer: "O₂; H₂; KOH",
      },
      selfCheckExample: {
        prompt: "Which is NOT correct about the H₂–O₂ fuel cell: H₂ is the fuel; O₂ is the oxidising agent; platinum wires serve as electrodes; hot KOH is the electrolyte?",
        steps: [
          "The electrodes are porous carbon with a platinum catalyst — not platinum wires.",
        ],
        answer: "'Platinum wires serve as electrodes'",
      },
      practiceSet: [
        { prompt: "Reducing agent in the H₂–O₂ fuel cell?", answer: "H₂" },
        { prompt: "Electrolyte of the H₂–O₂ fuel cell?", answer: "Hot aqueous KOH" },
        { prompt: "Electrode material?", answer: "Porous carbon with Pt/Pd catalyst" },
        { prompt: "Product of the cell?", answer: "Water" },
      ],
      pyqExampleId: "83dbdd72-fa3e-4826-a0ce-ffd6b228c5fc",
      traps: [
        {
          title: "Calling H₂ the oxidising agent because it 'burns'",
          body:
            "Burning IS oxidation — of the hydrogen. The species that is oxidised is the reducing agent. H₂ reduces; O₂ oxidises.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Galvanic Cells — the E° and ΔG° behind every battery",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-galvanic-cells",
    },
    {
      label: "Electrolysis — what recharging actually is",
      href: "/notes/mht-cet-chemistry/electrochemistry/cetec-electrolysis",
    },
  ],
};
