import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_FUEL_NOTE: SubtopicNote = {
  subtopicName: "Fuel Cells",
  title: "Fuel Cells: The Hydrogen-Oxygen Cell",
  oneLineDefinition:
    "What a fuel cell is, the electrode reactions of the hydrogen-oxygen fuel cell used in the Apollo space programme, and why fuel cells beat thermal power plants.",
  whyItMatters:
    "12 questions, eleven of them from board papers from 2023 to 2026. Every year the board asks which cell powered the Apollo space programme. It also asks you to define a fuel cell and give its advantages (2023, 2024, 2025), to say why fuel cells are preferred to thermal plants (2025), and to name fuels other than hydrogen (2026). These are short, sure marks if the definition and two advantages are word-perfect.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcec-fuel-cell",
      name: "The hydrogen-oxygen fuel cell",
      intuition:
        "A thermal power plant burns fuel to boil water, spins a turbine with the steam, and only then makes electricity, losing energy at every step. A fuel cell skips all that: it is a galvanic cell whose reaction is the burning of the fuel, so the energy of combustion comes out directly as electricity. Its reactants are fed in from outside, so it keeps working as long as they are supplied.",
      definition:
        "- **Fuel cell:** a galvanic cell designed to convert the energy of combustion of fuels like hydrogen, methane or methanol **directly** into electrical energy. Reactants are fed continuously to the electrodes and products are removed continuously.\n" +
        "- **Hydrogen-oxygen fuel cell:** H₂ and O₂ are bubbled through porous carbon electrodes into concentrated aqueous sodium hydroxide. Finely divided platinum or palladium in the electrodes acts as a catalyst to speed up the electrode reactions.\n" +
        "- Cathode: \\(\\text{O}_2(g) + 2\\text{H}_2\\text{O(l)} + 4e^{-} \\rightarrow 4\\text{OH}^{-}(aq)\\).\n" +
        "- Anode: \\(2\\text{H}_2(g) + 4\\text{OH}^{-}(aq) \\rightarrow 4\\text{H}_2\\text{O(l)} + 4e^{-}\\).\n" +
        "- Overall: \\(2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{H}_2\\text{O(l)}\\).\n" +
        "- The cell runs continuously as long as the reactants are supplied.",
      formula: {
        label: "Hydrogen-oxygen fuel cell, overall",
        latex: "2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{H}_2\\text{O(l)}",
      },
      authoredExample: {
        prompt: "Write the reactions at the anode and the cathode, and the overall reaction, of the hydrogen-oxygen fuel cell.",
        steps: [
          "Hydrogen is oxidised at the anode, in the alkaline electrolyte: \\(2\\text{H}_2(g) + 4\\text{OH}^{-}(aq) \\rightarrow 4\\text{H}_2\\text{O(l)} + 4e^{-}\\).",
          "Oxygen is reduced at the cathode: \\(\\text{O}_2(g) + 2\\text{H}_2\\text{O(l)} + 4e^{-} \\rightarrow 4\\text{OH}^{-}(aq)\\).",
          "Adding, the electrons and OH⁻ cancel: \\(2\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{H}_2\\text{O(l)}\\).",
        ],
        answer: "Overall 2H₂ + O₂ → 2H₂O; the only product is water",
      },
      selfCheckExample: {
        prompt: "Why are finely divided platinum or palladium put into the electrodes of a hydrogen-oxygen fuel cell?",
        steps: ["They are catalysts.", "They increase the rate of the electrode reactions."],
        answer: "As catalysts, to speed up the electrode reactions",
      },
      practiceSet: [
        { prompt: "Name two fuels other than hydrogen that can be used in fuel cells.", answer: "Methane and methanol" },
        { prompt: "How many electrons does one O₂ molecule take at the cathode of the hydrogen-oxygen fuel cell?", answer: "Four" },
        { prompt: "For how long does a fuel cell keep giving electricity?", answer: "As long as the reactants are supplied" },
      ],
      pyqExampleId: "e1c6460c-031b-46c3-9924-d612c92b155d",
      traps: [
        {
          title: "A definition without \"directly\"",
          body: "A fuel cell converts the energy of combustion of a fuel directly into electrical energy. Leave out \"directly\" and the definition fits a thermal power plant too.",
        },
        {
          title: "Writing the electrode reactions in acid",
          body: "NCERT's cell has an alkaline electrolyte (concentrated aqueous NaOH), so the half reactions use OH⁻ and H₂O, not H⁺. Balance each one for both atoms and charge.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcec-fuel-advantages",
      name: "Uses and advantages of fuel cells",
      intuition:
        "Fuel cells won their place in space: the Apollo craft needed power that was light, reliable and clean, and the hydrogen-oxygen cell even gave the astronauts drinking water. On Earth the same points make them better than thermal plants: they waste less energy and do not pollute.",
      definition:
        "- The hydrogen-oxygen fuel cell provided electrical power in the **Apollo space programme**. The water vapour it produced was condensed and added to the astronauts' drinking water.\n" +
        "- **Efficiency:** fuel cells produce electricity with an efficiency of about **70%**, against about **40%** for thermal plants.\n" +
        "- **Pollution free:** the hydrogen-oxygen cell gives only water.\n" +
        "- **Continuous:** unlike a primary or secondary battery, it does not run down while fuel is fed in.\n" +
        "- Fuel cells have also been tried in automobiles on an experimental basis.",
      table: {
        columns: ["Point", "Fuel cell", "Compared with"],
        rows: [
          {
            cells: ["Efficiency", "About 70%: the energy of combustion becomes electricity directly", "Thermal plant, about 40%"],
            pyqExampleId: "6a685eac-4fb9-4889-9781-5564ae60fab5",
            noteAmber: "Board 2025 asked why fuel cells are preferred to thermal plants.",
          },
          {
            cells: ["Pollution", "Pollution free; the H₂-O₂ cell gives only water", "Thermal plants burning coal, gas or oil are a major source of pollution"],
          },
          {
            cells: ["Supply of reactants", "Fed in continuously, so it runs as long as fuel is supplied", "Primary and secondary batteries hold a fixed amount and run down"],
          },
          {
            cells: ["Famous use", "Powered the Apollo space programme; its water was drunk by the crew", "The other MCQ options (mercury cell, dry cell, Ni-Cd cell) are the wrong answers"],
            pyqExampleId: "1967b98a-04d3-4040-97f7-533a526b1b6b",
            noteAmber: "Board 2023, 2024, 2025 and 2026 each asked which cell was used in the Apollo space programme.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which cell was used to provide electrical power in the Apollo space programme?", answer: "The hydrogen-oxygen fuel cell" },
        { prompt: "What was done with the water produced by the fuel cell in the Apollo space programme?", answer: "It was condensed and added to the astronauts' drinking water" },
        { prompt: "Give the approximate efficiencies of a fuel cell and of a thermal power plant.", answer: "About 70% and about 40%" },
      ],
      pyqExampleId: "2499ba74-9395-4ddd-a492-3a46f84e3ce1",
      traps: [
        {
          title: "Advantages that are not advantages",
          body: "\"It is a good cell\" or \"it gives electricity\" earn nothing. Write the two marks the book gives: high efficiency (about 70%) and pollution free.",
        },
        {
          title: "Naming the mercury cell for Apollo",
          body: "The mercury cell is for hearing aids and watches. The Apollo programme used the hydrogen-oxygen fuel cell.",
        },
      ],
    },
  ],
};
