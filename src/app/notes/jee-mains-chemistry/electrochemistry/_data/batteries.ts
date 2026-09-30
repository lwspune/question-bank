import type { SubtopicNote } from "@/app/notes/_types";

export const BATTERIES_ELEC_NOTE: SubtopicNote = {
  subtopicName: "Batteries, Fuel Cells and Corrosion",
  title: "Batteries, Fuel Cells and Corrosion",
  oneLineDefinition:
    "The named cells of NCERT, with their electrodes, reactions and uses; the hydrogen–oxygen and methanol fuel cells; and rusting as a small galvanic cell on the surface of iron.",
  whyItMatters:
    "Eleven PYQs, every one of them multiple choice. Seven match a battery to its electrodes, reaction or use, or ask what happens on charging and discharging; four test fuel cells and the rusting of iron. It is a recall page: learn the two tables and it is done.",
  concepts: [
    // C1 — named batteries
    {
      kind: "reference" as const,
      slug: "jcelec-batteries",
      name: "Primary and secondary batteries",
      intuition:
        "Every battery is a galvanic cell with a named anode and cathode. A primary cell is used once and thrown away. A secondary cell is recharged by pushing current through it backwards, which runs its reaction as an electrolysis.",
      definition:
        "- **Dry (Leclanché) cell**: at the cathode \\(\\mathrm{MnO_2+NH_4^++e^-\\to MnO(OH)+NH_3}\\). Mn goes from +4 to +3. About 1.5 V.\n" +
        "- **Mercury cell**: \\(\\mathrm{Zn(Hg)+HgO\\to ZnO+Hg}\\). Its voltage stays at about 1.35 V, because no ion's concentration changes during its life.\n" +
        "- **Lead storage battery**, discharge: anode \\(\\mathrm{Pb+SO_4^{2-}\\to PbSO_4+2e^-}\\); cathode \\(\\mathrm{PbO_2+SO_4^{2-}+4H^++2e^-\\to PbSO_4+2H_2O}\\). Net: \\(\\mathrm{Pb+PbO_2+2H_2SO_4\\to 2PbSO_4+2H_2O}\\). The acid is used up.\n" +
        "- On charging, NCERT keeps the discharge names: \\(\\mathrm{PbSO_4}\\) on the anode becomes Pb, and \\(\\mathrm{PbSO_4}\\) on the cathode becomes \\(\\mathrm{PbO_2}\\). Both start at +2.\n" +
        "- **Nickel–cadmium cell**, discharge: \\(\\mathrm{Cd+2Ni(OH)_3\\to CdO+2Ni(OH)_2+H_2O}\\). Rechargeable, with a longer life than the lead battery.\n" +
        "- Metals used by the battery industry: Mn (as \\(\\mathrm{MnO_2}\\)), Zn, Ni, Cd, Pb, Hg.",
      table: {
        columns: ["Cell", "Anode", "Cathode", "Electrolyte", "Type and use"],
        rows: [
          { cells: ["Dry (Leclanché) cell", "Zn container", "Graphite rod in \\(\\mathrm{MnO_2}\\) and carbon", "Paste of \\(\\mathrm{NH_4Cl}\\) and \\(\\mathrm{ZnCl_2}\\)", "Primary; clocks, transistors, torches"] },
          { cells: ["Mercury cell", "Zn–Hg amalgam", "Paste of HgO and carbon", "Paste of KOH and ZnO", "Primary; hearing aids, watches; steady voltage"] },
          { cells: ["Lead storage battery", "Pb", "\\(\\mathrm{PbO_2}\\) packed on a lead grid", "About 38% \\(\\mathrm{H_2SO_4}\\)", "Secondary; cars and inverters"] },
          { cells: ["Nickel–cadmium cell", "Cd", "\\(\\mathrm{Ni(OH)_3}\\)", "KOH", "Secondary; long life, rechargeable devices"] },
          { cells: ["\\(\\mathrm{H_2}\\)–\\(\\mathrm{O_2}\\) fuel cell", "Porous carbon with \\(\\mathrm{H_2}\\) fed in", "Porous carbon with \\(\\mathrm{O_2}\\) fed in", "Concentrated aqueous NaOH or KOH", "Continuous feed; Apollo space programme"] },
        ],
        caption: "Primary: used once. Secondary: recharged. Fuel cell: reactants fed in continuously.",
      },
      selfCheckExample: {
        prompt:
          "In the cell used in a wall clock, what happens to manganese at the cathode? And which cell is chosen for a hearing aid, and why?",
        steps: [
          "A clock uses a dry cell. At its cathode \\(\\mathrm{MnO_2}\\) is reduced: Mn goes from +4 to +3.",
          "A hearing aid uses a mercury cell, because its voltage stays constant: no ion's concentration changes as it runs.",
        ],
        answer: "Mn is reduced from +4 to +3; the mercury cell, for its steady voltage.",
      },
      practiceSet: [
        { prompt: "Cell used in hearing aids?", answer: "Mercury cell" },
        { prompt: "Electrolyte of the lead storage battery?", answer: "About 38% sulphuric acid" },
        { prompt: "What forms on both plates as a lead battery discharges?", answer: "\\(\\mathrm{PbSO_4}\\)" },
        { prompt: "From Fe, Mn, Ni, Cr and Cd, which are used in the battery industry?", answer: "Mn, Ni and Cd" },
        { prompt: "Primary or secondary: the nickel–cadmium cell?", answer: "Secondary" },
      ],
      pyqExampleId: "aa11a936-cbc4-481b-b3c5-86237887e138", // 2025 — match transistors, hearing aids, inverters, Apollo to their cells
      traps: [
        {
          title: "Renaming the plates on charging",
          body: "When a lead battery is charged, NCERT still calls the Pb plate the anode and the \\(\\mathrm{PbO_2}\\) plate the cathode. Keys follow that naming.",
        },
        {
          title: "Why the mercury cell is steady",
          body: "Its overall reaction has only solids on both sides. Nothing in solution changes, so the Nernst term never moves.",
        },
      ],
    },

    // C2 — fuel cells and corrosion
    {
      kind: "reference" as const,
      slug: "jcelec-fuel-corrosion",
      name: "Fuel cells and corrosion",
      intuition:
        "A fuel cell burns its fuel electrochemically, so the energy comes out as electricity instead of heat. Rusting is the same chemistry running unwanted: one spot on the iron is an anode, another is a cathode, and the water film is the electrolyte.",
      definition:
        "- **Fuel cell**: a galvanic cell fed with fuel and oxygen continuously. \\(\\mathrm{H_2}\\)–\\(\\mathrm{O_2}\\): about 70% efficient, with platinum or palladium catalyst on porous carbon; its only product is water.\n" +
        "- In any fuel cell the fuel is oxidised at the anode and \\(\\mathrm{O_2}\\) is reduced at the cathode. So \\(E^\\circ(\\text{fuel couple})=E^\\circ(\\mathrm{O_2/H_2O})-E^\\circ_{cell}\\), with \\(E^\\circ(\\mathrm{O_2/H_2O})=1.229\\) V.\n" +
        "- **Rusting**: at an anodic spot \\(\\mathrm{Fe\\to Fe^{2+}+2e^-}\\). At a cathodic spot \\(\\mathrm{O_2+4H^++4e^-\\to 2H_2O}\\). \\(\\mathrm{Fe^{2+}}\\) is then oxidised to hydrated \\(\\mathrm{Fe_2O_3}\\).\n" +
        "- Acid speeds rusting; so do dissolved acidic oxides (\\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{NO_2}\\)). Above pH 9 to 10 it practically stops.\n" +
        "- Zinc (\\(-0.76\\) V) is oxidised before iron (\\(-0.44\\) V), so galvanised iron is protected even when scratched. Tin (\\(-0.14\\) V) is not: once the tin coat breaks, the iron corrodes faster.",
      table: {
        columns: ["Statement", "Verdict", "Reason"],
        rows: [
          { cells: ["The H₂–O₂ fuel cell was used in the Apollo space programme", "True", "Its water was drunk by the crew"] },
          { cells: ["The H₂–O₂ fuel cell is about 40% efficient", "False", "About 70%, far above a thermal power plant"] },
          { cells: ["Its electrodes use aluminium as a catalyst", "False", "Finely divided Pt or Pd on porous carbon"] },
          { cells: ["Reactants are fed in at one go", "False", "They are fed in continuously"] },
          { cells: ["A fuel cell is a galvanic cell", "True", "A spontaneous reaction gives electricity"] },
          { cells: ["In a methanol fuel cell, methanol is oxidised at the anode", "True", "The fuel is always the anode's reactant"] },
          { cells: ["Rusting is an electrochemical process", "True", "Anodic and cathodic spots on one piece of iron"] },
          { cells: ["Rusting is faster in alkaline water than in acid", "False", "\\(\\mathrm{H^+}\\) drives the cathode reaction; above pH 9 to 10 rusting stops"] },
          { cells: ["A tin coat protects iron even after it peels", "False", "Iron is below tin in the series, so exposed iron corrodes faster"] },
          { cells: ["A scratched zinc coat still protects iron", "True", "Zinc is oxidised first, as a sacrificial anode"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "An ethanol fuel cell has \\(E^\\circ_{cell}=1.145\\) V, and \\(E^\\circ(\\mathrm{O_2/H_2O})=1.229\\) V. Find \\(E^\\circ\\) for the reduction of \\(\\mathrm{CO_2}\\) to ethanol, and say at which electrode ethanol reacts.",
        steps: [
          "Ethanol is the fuel, so it is oxidised at the anode. \\(\\mathrm{O_2}\\) is reduced at the cathode.",
          "\\(E^\\circ_{cell}=E^\\circ(\\mathrm{O_2/H_2O})-E^\\circ(\\mathrm{CO_2/C_2H_5OH})\\).",
          "\\(E^\\circ(\\mathrm{CO_2/C_2H_5OH})=1.229-1.145=0.084\\) V.",
        ],
        answer: "\\(0.084\\) V; ethanol reacts at the anode.",
      },
      practiceSet: [
        { prompt: "How are reactants supplied to a fuel cell?", answer: "Continuously" },
        { prompt: "Catalyst on the electrodes of the H₂–O₂ fuel cell?", answer: "Finely divided Pt or Pd" },
        { prompt: "Does iron rust in water above pH 10?", answer: "Practically not" },
        { prompt: "Scratched galvanised iron or scratched tin-plated iron: which rusts?", answer: "Tin-plated iron" },
        { prompt: "Name two dissolved gases that speed up rusting.", answer: "Any two of \\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{NO_2}\\)" },
      ],
      pyqExampleId: "07f25bab-8ecd-432f-95c6-92cbd38a9ee3", // 2025 — methanol fuel cell: E°(CO₂/CH₃OH) and the correct statement
      traps: [
        {
          title: "Oxygen at the anode",
          body: "In a fuel cell \\(\\mathrm{O_2}\\) is consumed at the cathode. It is neither formed nor consumed at the anode.",
        },
        {
          title: "Tin protects like zinc",
          body: "Tin is a barrier only. Once it breaks, iron is the anode of the tin–iron couple and rusts faster than bare iron.",
        },
      ],
    },
  ],
};
