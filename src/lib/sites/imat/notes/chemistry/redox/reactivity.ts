import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_RDX_REACTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Reactivity Series and Displacement",
  title: "The Reactivity Series and Displacement Reactions",
  oneLineDefinition:
    "Metals can be ranked by how easily they lose electrons; a metal higher in the series pushes a lower one out of its compounds, and halogens follow the same rule in reverse.",
  whyItMatters:
    "No past question has been about the reactivity series alone, but displacement reactions appear among the options of the oxidising and reducing agent questions. It is on the syllabus and links redox to the metals met in other chapters.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-rdx-series",
      name: "The reactivity series of metals",
      intuition:
        "Every metal reacts by losing electrons, so it acts as a reducing agent. Some give their electrons up very easily (potassium, sodium), others hardly at all (silver, gold). Listing metals in that order predicts how they react with water and acids and how hard they are to extract from their ores.",
      definition:
        "The **reactivity series** lists metals from the most easily oxidised (best reducing agent) to the least.\n" +
        "- Order to learn: K, Na, Ca, Mg, Al, (C), Zn, Fe, Pb, (H), Cu, Ag, Au.\n" +
        "- Metals **above hydrogen** release \\(\\mathrm{H_2}\\) from dilute acids: \\(\\mathrm{Mg + 2HCl \\rightarrow MgCl_2 + H_2}\\). Metals below hydrogen do not.\n" +
        "- Metals **below carbon** can be extracted by heating their oxides with carbon; metals above carbon need electrolysis.\n" +
        "- Aluminium looks less reactive than it is, because a thin oxide layer protects it.",
      table: {
        columns: ["Metal", "With cold water", "With dilute HCl", "How it is extracted"],
        rows: [
          { cells: ["Potassium, sodium", "Violent: hydroxide and \\(\\mathrm{H_2}\\)", "Dangerously violent", "Electrolysis of the molten chloride"] },
          { cells: ["Calcium", "Steady: hydroxide and \\(\\mathrm{H_2}\\)", "Vigorous", "Electrolysis of the molten chloride"] },
          { cells: ["Magnesium", "Very slow (fast with steam)", "Vigorous, \\(\\mathrm{H_2}\\)", "Electrolysis"] },
          { cells: ["Aluminium", "None (oxide layer)", "Slow at first, then steady", "Electrolysis of molten \\(\\mathrm{Al_2O_3}\\)"] },
          { cells: ["Zinc, iron", "None (react with steam when hot)", "Moderate, \\(\\mathrm{H_2}\\)", "Heating the oxide with carbon or CO"] },
          { cells: ["Lead", "None", "Very slow", "Heating the oxide with carbon"] },
          { cells: ["Copper, silver, gold", "None", "None", "Reduction of ores; silver and gold also found as the metal"] },
        ],
        caption: "Higher in the table means a stronger reducing agent; the ions of metals lower down are stronger oxidising agents.",
      },
      selfCheckExample: {
        prompt: "Which of these metals does NOT release hydrogen gas from dilute hydrochloric acid?",
        options: [
          "Magnesium",
          "Zinc",
          "Iron",
          "Aluminium",
          "Copper",
        ],
        steps: [
          "Only metals above hydrogen in the series can reduce \\(\\mathrm{H^+}\\) to \\(\\mathrm{H_2}\\).",
          "Copper is below hydrogen, so it does not react with dilute hydrochloric acid.",
          "Aluminium reacts once its oxide layer is broken through, so D is not the answer.",
        ],
        answer: "(E) Copper",
      },
      practiceSet: [
        { prompt: "Which is the stronger reducing agent: zinc or copper?", answer: "Zinc", method: "It is higher in the series" },
        { prompt: "Why can iron be extracted with carbon but aluminium cannot?", answer: "Aluminium is above carbon in the series", method: "Carbon cannot take oxygen from a more reactive metal" },
        { prompt: "What gas forms when calcium reacts with water?", answer: "Hydrogen", method: "\\(\\mathrm{Ca + 2H_2O \\rightarrow Ca(OH)_2 + H_2}\\)" },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-displacement",
      name: "Predicting displacement reactions of metals and halogens",
      intuition:
        "Put a more reactive metal into a solution of a less reactive metal's ions and the electrons move downhill: the more reactive metal dissolves as ions, and the less reactive metal comes out as solid. Halogens work the other way round, because they react by gaining electrons: the more reactive halogen takes electrons from the halide ion of a less reactive one.",
      definition:
        "- **Metal displacement**: a metal displaces any metal **below** it from a solution of its salt. The metal is the reducing agent; the metal ion in solution is the oxidising agent.\n" +
        "- If the metal is below the one in solution, **no reaction** occurs.\n" +
        "- **Halogen displacement**: reactivity order \\(\\mathrm{F_2 > Cl_2 > Br_2 > I_2}\\). A halogen displaces the halides **below** it: \\(\\mathrm{Cl_2 + 2I^- \\rightarrow 2Cl^- + I_2}\\). The halogen is the oxidising agent.\n" +
        "- The spectator ions (sulfate, nitrate, the alkali-metal ion) do not take part; write the ionic equation without them.",
      formula: {
        label: "Metal displacement, as an ionic equation",
        latex: "\\mathrm{M_{(more\\ reactive)} + N^{n+}_{(aq)} \\rightarrow M^{n+}_{(aq)} + N_{(less\\ reactive)}}",
        symbols: [
          { symbol: "\\(\\mathrm{M}\\)", meaning: "the metal higher in the series (reducing agent)" },
          { symbol: "\\(\\mathrm{N^{n+}}\\)", meaning: "the ion of the metal lower in the series (oxidising agent)" },
        ],
      },
      authoredExample: {
        prompt:
          "An iron nail is left in blue copper(II) sulfate solution. What happens? What would happen to a copper wire left in iron(II) sulfate solution?",
        steps: [
          "Iron is above copper, so it displaces it: \\(\\mathrm{Fe + Cu^{2+} \\rightarrow Fe^{2+} + Cu}\\).",
          "A pink-brown layer of copper forms on the nail, and the blue colour of \\(\\mathrm{Cu^{2+}}\\) fades.",
          "Iron is oxidised (0 to +2) and is the reducing agent; \\(\\mathrm{Cu^{2+}}\\) is reduced and is the oxidising agent.",
          "Copper is below iron, so copper in iron(II) sulfate does nothing.",
        ],
        answer: "Copper deposits on the iron and the blue fades; the reverse gives no reaction",
      },
      selfCheckExample: {
        prompt: "Which of these mixtures reacts?",
        options: [
          "Copper metal in zinc sulfate solution",
          "Silver metal in dilute hydrochloric acid",
          "Iodine solution added to sodium bromide solution",
          "Bromine water added to potassium iodide solution",
          "Iron metal in magnesium chloride solution",
        ],
        steps: [
          "Bromine is more reactive than iodine, so it oxidises iodide: \\(\\mathrm{Br_2 + 2I^- \\rightarrow 2Br^- + I_2}\\). The solution turns brown.",
          "A and E put a metal into a solution of a MORE reactive metal's ions: no reaction. B: silver is below hydrogen.",
          "C is the reverse of the right reaction: iodine is less reactive than bromine.",
        ],
        answer: "(D) Bromine water added to potassium iodide solution",
      },
      practiceSet: [
        { prompt: "Copper wire is placed in silver nitrate solution. What forms?", answer: "Silver crystals, and the solution turns blue", method: "\\(\\mathrm{Cu + 2Ag^+ \\rightarrow Cu^{2+} + 2Ag}\\)" },
        { prompt: "Does zinc react with lead(II) nitrate solution?", answer: "Yes, lead is displaced", method: "Zinc is above lead" },
        { prompt: "Does chlorine water react with potassium fluoride solution?", answer: "No", method: "Fluorine is more reactive than chlorine" },
      ],
      traps: [
        {
          title: "For halogens, the more reactive one is the oxidising agent",
          body: "A reactive metal is a strong REDUCING agent because it loses electrons easily. A reactive halogen is a strong OXIDISING agent because it gains electrons easily. In \\(\\mathrm{Cl_2 + 2NaI \\rightarrow 2NaCl + I_2}\\), chlorine is reduced and the iodide ion is oxidised.",
        },
      ],
    },
  ],
};
