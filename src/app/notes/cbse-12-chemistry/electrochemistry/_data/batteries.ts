import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_BATTERIES_NOTE: SubtopicNote = {
  subtopicName: "Batteries",
  title: "Batteries: Primary and Secondary Cells",
  oneLineDefinition:
    "Primary batteries (the dry cell and the mercury cell) and secondary batteries (the lead storage battery and the nickel-cadmium cell): their electrodes, electrolytes, reactions and uses.",
  whyItMatters:
    "15 questions, fourteen of them from board papers from 2023 to 2026. The board asks which cell is used in hearing aids, watches, inverters and automobiles (every year from 2023 to 2026), why the mercury cell gives a constant 1.35 V (2023, 2024, 2026), the reactions of the lead storage battery in use (2025) and while charging (2023, 2024), and how a primary battery differs from a secondary one (2024). The textbook adds the chemistry of recharging the lead storage battery.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcec-primary-cells",
      name: "Primary batteries: dry cell and mercury cell",
      intuition:
        "A battery is a galvanic cell made light and compact, with a voltage that should not change much as it is used. In a primary battery the reaction happens only once: when the chemicals are used up, the battery is dead and cannot be used again. The mercury cell is prized because its voltage stays steady all its life.",
      definition:
        "- **Primary battery:** the reaction occurs only once; after use over a period of time the battery becomes dead and cannot be reused.\n" +
        "- **Dry cell (Leclanché cell):** zinc container as the anode; a carbon (graphite) rod surrounded by powdered MnO₂ and carbon as the cathode; a moist paste of NH₄Cl and ZnCl₂ between them.\n" +
        "- Anode: \\(\\text{Zn(s)} \\rightarrow \\text{Zn}^{2+} + 2e^{-}\\). Cathode: \\(\\text{MnO}_2 + \\text{NH}_4^{+} + e^{-} \\rightarrow \\text{MnO(OH)} + \\text{NH}_3\\). Mn goes from +4 to +3; NH₃ forms the complex [Zn(NH₃)₄]²⁺. Potential nearly 1.5 V.\n" +
        "- **Mercury cell:** zinc-mercury amalgam as the anode; a paste of HgO and carbon as the cathode; a paste of KOH and ZnO as the electrolyte.\n" +
        "- Anode: \\(\\text{Zn(Hg)} + 2\\text{OH}^{-} \\rightarrow \\text{ZnO(s)} + \\text{H}_2\\text{O} + 2e^{-}\\). Cathode: \\(\\text{HgO} + \\text{H}_2\\text{O} + 2e^{-} \\rightarrow \\text{Hg(l)} + 2\\text{OH}^{-}\\).\n" +
        "- Overall: \\(\\text{Zn(Hg)} + \\text{HgO(s)} \\rightarrow \\text{ZnO(s)} + \\text{Hg(l)}\\). The potential is about 1.35 V and stays constant, because the overall reaction has no ion in solution whose concentration can change.",
      table: {
        columns: ["Cell", "Anode, cathode, electrolyte", "Voltage", "Used in"],
        rows: [
          {
            cells: ["Dry cell (Leclanché)", "Zn container; graphite rod with MnO₂ and carbon; moist paste of NH₄Cl and ZnCl₂", "Nearly 1.5 V, falls during use", "Transistors and clocks"],
            pyqExampleId: "53dfd980-3896-4a4b-8a6f-fdd71a81e5c4",
            noteAmber: "Board 2023 asked you to name the cells used in Apollo, in automobiles, in hearing aids and in transistors.",
          },
          {
            cells: ["Mercury cell", "Zn-Hg amalgam; paste of HgO and carbon; paste of KOH and ZnO", "About 1.35 V, constant for its whole life", "Hearing aids and watches"],
            pyqExampleId: "91d86dee-3d2c-42d3-985c-0c35b541f8ad",
            noteAmber: "Board 2023, 2024 and 2026 asked why its potential stays constant.",
          },
          {
            cells: ["Which cell for which device", "Hearing aid or wrist watch: mercury cell. Wall clock: dry cell", "Small steady current needed", "Low-current devices"],
            pyqExampleId: "8c0a5518-d856-4cfa-ab36-589b4ac2e399",
            noteAmber: "Board 2024 asked the hearing-aid MCQ twice in one year; 2025 set a match-the-columns item.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Name the electrolyte in a dry cell.", answer: "A moist paste of ammonium chloride and zinc chloride" },
        { prompt: "In the dry cell, what is the oxidation state of manganese before and after the cathode reaction?", answer: "+4 in MnO₂, +3 in MnO(OH)" },
        { prompt: "Is the mercury cell a primary or a secondary battery?", answer: "Primary; it cannot be recharged" },
      ],
      pyqExampleId: "875d6f48-7e3b-43a5-85f2-0c78070c3195",
      traps: [
        {
          title: "A vague reason for the steady voltage",
          body: "\"Because it is a good cell\" earns nothing. The reason is that the overall reaction involves no ion in solution whose concentration changes, so nothing in the Nernst equation changes.",
        },
        {
          title: "Swapping the electrodes of the dry cell",
          body: "The zinc container is the anode; the graphite rod is the cathode. The rod itself does not react: MnO₂ around it is reduced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-lead-storage",
      name: "Secondary batteries: the lead storage battery",
      intuition:
        "A secondary battery can be recharged: pass current through it the opposite way and the reactions run backwards, rebuilding the starting chemicals. In the lead storage battery both plates turn into lead sulphate as it is used; charging turns them back into lead and lead dioxide, and the sulphuric acid is made again.",
      definition:
        "- **Secondary battery:** after use it can be recharged by passing current through it in the opposite direction, and it can go through a large number of discharging and charging cycles.\n" +
        "- **Lead storage battery** (automobiles and inverters): lead anode; a grid of lead packed with PbO₂ as the cathode; a 38% solution of sulphuric acid as the electrolyte.\n" +
        "- In use: anode \\(\\text{Pb(s)} + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{PbSO}_4(s) + 2e^{-}\\); cathode \\(\\text{PbO}_2(s) + \\text{SO}_4^{2-}(aq) + 4\\text{H}^{+}(aq) + 2e^{-} \\rightarrow \\text{PbSO}_4(s) + 2\\text{H}_2\\text{O(l)}\\).\n" +
        "- On charging the reaction is reversed, and PbSO₄ on the anode and cathode is converted back into Pb and PbO₂ respectively.\n" +
        "- **Nickel-cadmium cell:** another secondary cell, with a longer life than the lead storage cell but more expensive to make. Discharge: \\(\\text{Cd(s)} + 2\\text{Ni(OH)}_3(s) \\rightarrow \\text{CdO(s)} + 2\\text{Ni(OH)}_2(s) + \\text{H}_2\\text{O(l)}\\).",
      formula: {
        label: "Lead storage battery, overall",
        latex: "\\text{Pb(s)} + \\text{PbO}_2(s) + 2\\text{H}_2\\text{SO}_4(aq) \\underset{\\text{charging}}{\\overset{\\text{discharging}}{\\rightleftharpoons}} 2\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O(l)}",
      },
      authoredExample: {
        prompt: "Write the reactions at the two electrodes and the overall reaction when a lead storage battery is being charged.",
        steps: [
          "Charging reverses the reactions of discharge; the battery now works as an electrolytic cell.",
          "At the electrode that was the anode: \\(\\text{PbSO}_4(s) + 2e^{-} \\rightarrow \\text{Pb(s)} + \\text{SO}_4^{2-}(aq)\\) (reduction).",
          "At the electrode that was the cathode: \\(\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O(l)} \\rightarrow \\text{PbO}_2(s) + \\text{SO}_4^{2-}(aq) + 4\\text{H}^{+}(aq) + 2e^{-}\\) (oxidation).",
          "Overall: \\(2\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O(l)} \\rightarrow \\text{Pb(s)} + \\text{PbO}_2(s) + 2\\text{H}_2\\text{SO}_4(aq)\\).",
        ],
        answer: "PbSO₄ is turned back into Pb and PbO₂, and H₂SO₄ is formed again",
      },
      selfCheckExample: {
        prompt: "What happens to the amount of sulphuric acid in a lead storage battery while it is in use, and why?",
        steps: ["The overall discharge reaction uses up 2 H₂SO₄ for each Pb.", "So the acid is used up as the battery is used."],
        answer: "It decreases, because H₂SO₄ is consumed in forming PbSO₄",
      },
      practiceSet: [
        { prompt: "Give one difference between a primary and a secondary battery, with an example of each.", answer: "A primary battery cannot be recharged (dry cell); a secondary battery can be recharged and reused (lead storage battery)" },
        { prompt: "Which secondary cell has a longer life than the lead storage cell?", answer: "The nickel-cadmium cell" },
        { prompt: "What is the electrolyte of a lead storage battery?", answer: "A 38% solution of sulphuric acid" },
      ],
      pyqExampleId: "78d8920f-c7bf-4c64-bcca-d0208ac3058d",
      traps: [
        {
          title: "Writing the discharge reactions when charging is asked",
          body: "Read whether the battery is \"in use\" (discharging, a galvanic cell) or \"being charged\" (an electrolytic cell). The reactions are the same equations run the other way.",
        },
        {
          title: "Leaving out sulphate ions",
          body: "Both electrodes form PbSO₄, so SO₄²⁻ appears in both half reactions, and H⁺ only at the PbO₂ electrode. A half reaction without them is not balanced.",
        },
      ],
    },
  ],
};
