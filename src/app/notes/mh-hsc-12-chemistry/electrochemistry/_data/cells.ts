import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Galvanic Cells in Day-to-Day Life and Fuel Cells",
  title: "Dry Cells, the Lead Accumulator and Fuel Cells",
  oneLineDefinition:
    "Primary and secondary cells, the dry cell, NICAD and mercury cells, the lead accumulator on discharge and recharge, and the hydrogen and oxygen fuel cell.",
  whyItMatters:
    "15 questions. Nine were set in board papers: what fuel cells are with their reactions (2017), the electrolyte of the hydrogen and oxygen fuel cell (2018 and 2026), a labelled diagram of the lead accumulator (2018, 2025 and 2026), the fuel cell diagram with two uses (2023), the net discharge reaction of the lead accumulator (2024), two advantages of the fuel cell (2026), and its electrode reactions (2026). The textbook adds the dry cell, the NICAD cell, and recharging the lead accumulator.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccec-batteries",
      name: "Primary and secondary cells",
      intuition:
        "A primary cell is used once: when its chemicals are spent, the reaction cannot be run backwards. A secondary cell can be recharged: an outside voltage pushes the reaction back and remakes the chemicals. While it gives current it is a galvanic cell; while it is being charged it is an electrolytic cell.",
      definition:
        "- **Primary cell:** the cell reaction cannot be reversed by reversing the current, so the cell cannot be recharged. Example: the dry cell.\n" +
        "- **Secondary cell:** an external potential slightly greater than the cell potential reverses the reaction and regenerates the chemicals. Examples given by the textbook: lead storage battery, mercury cell and nickel cadmium cell.\n" +
        "- **Dry cell (Leclanché cell):** anode, the zinc container lined with porous paper; cathode, a graphite rod in a paste of MnO₂ and carbon black; electrolyte, a moist paste of NH₄Cl and ZnCl₂ thickened with starch.\n" +
        "- Dry cell anode: \\(\\text{Zn}(s) \\to \\text{Zn}^{2+}(aq) + 2e^-\\). Cathode: \\(2\\text{NH}_4^+(aq) + 2\\text{MnO}_2(s) + 2e^- \\to \\text{Mn}_2\\text{O}_3(s) + 2\\text{NH}_3(aq) + \\text{H}_2\\text{O}(l)\\). MnO₂ removes the hydrogen so it does not collect on the cathode.\n" +
        "- **Alkaline dry cell:** NaOH or KOH replaces NH₄Cl; zinc corrodes more slowly, so it lasts longer.\n" +
        "- **NICAD:** \\(\\text{Cd}(s) + \\text{NiO}_2(s) + 2\\text{H}_2\\text{O}(l) \\to \\text{Cd(OH)}_2(s) + \\text{Ni(OH)}_2(s)\\). The products are solids that stick to the electrodes, so it can be recharged.\n" +
        "- **Mercury battery:** \\(\\text{Zn(Hg)} + \\text{HgO}(s) \\to \\text{ZnO}(s) + \\text{Hg}(l)\\). Only solids take part and the electrolyte does not change, so the voltage stays constant at 1.35 V.",
      table: {
        columns: ["Cell", "Anode", "Cathode", "Electrolyte", "Potential and uses"],
        rows: [
          { cells: ["Dry cell", "Zinc container", "Graphite rod in MnO₂ and carbon black", "Moist paste of NH₄Cl and ZnCl₂", "Flashlights, radios, clocks"] },
          { cells: ["NICAD cell", "Cadmium", "NiO₂ on nickel", "Basic solution", "About 1.4 V; watches, calculators, cameras"] },
          { cells: ["Mercury battery", "Zinc amalgamated with mercury", "Paste of mercury and carbon", "Paste of KOH and ZnO", "1.35 V; hearing aids, watches, pacemakers"] },
        ],
      },
      practiceSet: [
        { prompt: "Why can a dry cell not be recharged?", answer: "It is a primary cell: its cell reaction cannot be reversed by reversing the current" },
        { prompt: "Why does the mercury battery give a more constant voltage than the dry cell?", answer: "Only solids take part in its reaction, so the electrolyte composition does not change" },
        { prompt: "Why does an alkaline dry cell last longer than the Leclanché cell?", answer: "With NaOH or KOH in place of NH₄Cl, the zinc anode corrodes more slowly" },
      ],
      pyqExampleId: "457aa61d-b32d-46ca-a519-674de3e2e974",
      traps: [
        {
          title: "Calling the graphite rod the anode",
          body: "In the dry cell the zinc container is the anode (−) and the graphite rod the cathode (+). Zinc is what gets oxidised.",
        },
        {
          title: "Forgetting MnO₂'s job",
          body: "At the cathode NH₄⁺ is reduced, and MnO₂ takes up the hydrogen so it cannot collect on the rod. The net cathode reaction includes MnO₂ and gives Mn₂O₃.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-lead-accumulator",
      name: "The lead accumulator",
      intuition:
        "A car battery stores energy as chemicals. On discharge both plates turn into lead sulphate and the acid is used up, so the acid gets thinner and the voltage drops. On charging, current is forced backwards: lead and lead dioxide are remade and the acid gets stronger again.",
      definition:
        "- **Construction:** lead plates packed with spongy lead are the anode (−); lead plates bearing PbO₂ are the cathode (+). Several plates of each kind are arranged alternately for a large surface. Electrolyte: 38% (by mass) H₂SO₄ of density 1.2 g/mL.\n" +
        "- **Cell notation:** \\(\\text{Pb}(s) \\mid \\text{PbSO}_4(s) \\mid 38\\%\\ \\text{H}_2\\text{SO}_4(aq) \\mid \\text{PbSO}_4(s) \\mid \\text{PbO}_2(s) \\mid \\text{Pb}(s)\\).\n" +
        "- **Discharge, anode (−):** \\(\\text{Pb}(s) + \\text{SO}_4^{2-}(aq) \\to \\text{PbSO}_4(s) + 2e^-\\).\n" +
        "- **Discharge, cathode (+):** \\(\\text{PbO}_2(s) + 4\\text{H}^+(aq) + \\text{SO}_4^{2-}(aq) + 2e^- \\to \\text{PbSO}_4(s) + 2\\text{H}_2\\text{O}(l)\\).\n" +
        "- H₂SO₄ is consumed, so its concentration (density) and the cell potential fall.\n" +
        "- **Recharging:** each cell gives 2 V and is recharged when it falls to 1.8 V, by applying slightly more than 2 V. It now works as an electrolytic cell: the PbO₂ electrode is the anode (+) and the lead electrode the cathode (−), and both discharge reactions run in reverse.\n" +
        "- **Uses:** a source of direct current in the laboratory; six 2 V cells in series make the 12 V battery of automobiles and inverters.",
      formula: {
        label: "Net reaction on discharge",
        latex: "\\text{Pb}(s) + \\text{PbO}_2(s) + 2\\text{H}_2\\text{SO}_4(aq) \\to 2\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O}(l)",
      },
      authoredExample: {
        prompt: "Write the electrode reactions and the net reaction of a lead accumulator while it is being recharged.",
        steps: [
          "During recharging the cell is an electrolytic cell; the PbO₂ electrode is the anode (+) and the lead electrode the cathode (−).",
          "Oxidation at the anode: \\(\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O}(l) \\to \\text{PbO}_2(s) + 4\\text{H}^+(aq) + \\text{SO}_4^{2-}(aq) + 2e^-\\).",
          "Reduction at the cathode: \\(\\text{PbSO}_4(s) + 2e^- \\to \\text{Pb}(s) + \\text{SO}_4^{2-}(aq)\\).",
          "Net: \\(2\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O}(l) \\to \\text{Pb}(s) + \\text{PbO}_2(s) + 2\\text{H}_2\\text{SO}_4(aq)\\). H₂SO₄ is regenerated.",
        ],
        answer: "2PbSO₄ + 2H₂O → Pb + PbO₂ + 2H₂SO₄ on recharging",
      },
      selfCheckExample: {
        prompt: "Each cell of a lead accumulator gives 2 V. How many cells, joined in which way, make a 12 V car battery?",
        steps: ["\\(12 \\div 2 = 6\\) cells.", "Voltages add only in series."],
        answer: "Six cells in series",
      },
      practiceSet: [
        { prompt: "What happens to the density of the acid in a lead accumulator while it gives current?", answer: "It decreases, because H₂SO₄ is consumed" },
        { prompt: "At what cell potential should a lead accumulator be recharged?", answer: "When it falls to 1.8 V" },
        { prompt: "What is coated on both electrodes of a discharged lead accumulator?", answer: "Lead sulphate, PbSO₄" },
      ],
      pyqExampleId: "b8cab09b-0287-4686-9979-a10492944ef2",
      traps: [
        {
          title: "Same anode on discharge and recharge",
          body: "On discharge the lead plate is the anode; on recharging the anode and cathode are interchanged and the PbO₂ plate is the anode.",
        },
        {
          title: "A diagram with no labels",
          body: "For the lead accumulator diagram, label the spongy lead plates (anode, −), the PbO₂ plates (cathode, +), the 38% H₂SO₄ and the alternate arrangement of the plates.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-fuel-cell",
      name: "The hydrogen and oxygen fuel cell",
      intuition:
        "A fuel cell burns hydrogen without a flame. The hydrogen and the oxygen never meet: hydrogen gives up its electrons at one electrode, they travel through the wire to the other, where oxygen takes them. The net change is just hydrogen and oxygen making water, and the energy comes out as electricity.",
      definition:
        "- A **fuel cell** is a galvanic cell in which the reactants, a fuel such as hydrogen or methanol and an oxidant such as oxygen, are not stored in the cell but supplied continuously to the electrodes.\n" +
        "- **Construction:** anode and cathode are porous carbon rods containing a little finely divided platinum as catalyst; the electrolyte is hot aqueous KOH. H₂ is bubbled through the anode and O₂ through the cathode.\n" +
        "- **Anode (−):** \\(2\\text{H}_2(g) + 4\\text{OH}^-(aq) \\to 4\\text{H}_2\\text{O}(l) + 4e^-\\).\n" +
        "- **Cathode (+):** \\(\\text{O}_2(g) + 2\\text{H}_2\\text{O}(l) + 4e^- \\to 4\\text{OH}^-(aq)\\).\n" +
        "- **Net:** \\(2\\text{H}_2(g) + \\text{O}_2(g) \\to 2\\text{H}_2\\text{O}(l)\\), the combustion of hydrogen.\n" +
        "- **Advantages:** reactants are supplied continuously, so the cell is not thrown away; it causes no pollution, the only product being water; it is about 70% efficient, twice a thermal power plant (40%).\n" +
        "- **Uses:** in automobiles on an experimental basis; for electric power in the space programme, where the water formed is condensed and drunk by the astronauts.\n" +
        "- **Drawback:** hydrogen is hazardous to handle and costly to prepare.",
      formula: {
        label: "Net fuel cell reaction",
        latex: "2\\text{H}_2(g) + \\text{O}_2(g) \\to 2\\text{H}_2\\text{O}(l)",
      },
      authoredExample: {
        prompt:
          "In the hydrogen and oxygen fuel cell, the standard potential of the cathode (O₂ reduced to OH⁻) is 0.40 V and that of the anode is −0.83 V. Calculate the standard cell potential.",
        steps: [
          "Given: \\(E^0_{\\text{cathode}} = 0.40\\) V, \\(E^0_{\\text{anode}} = -0.83\\) V.",
          "Formula: \\(E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}\\).",
          "Substitution: \\(E^0_{\\text{cell}} = 0.40\\ \\text{V} - (-0.83\\ \\text{V})\\).",
          "\\(E^0_{\\text{cell}} = 1.23\\) V.",
        ],
        answer: "E⁰cell = 1.23 V",
      },
      selfCheckExample: {
        prompt: "In a hydrogen and oxygen fuel cell, 4 mol of electrons pass through the external circuit. What mass of water is formed?",
        steps: ["The net reaction transfers 4 electrons for 2 mol of water.", "Mass \\(= 2\\ \\text{mol} \\times 18\\ \\text{g mol}^{-1} = 36\\) g."],
        answer: "36 g of water",
      },
      practiceSet: [
        { prompt: "Name the electrolyte in the hydrogen and oxygen fuel cell.", answer: "Hot aqueous KOH" },
        { prompt: "Give two advantages of fuel cells.", answer: "They cause no pollution (only water forms), and they are about 70% efficient; also, reactants are supplied continuously" },
        { prompt: "What acts as catalyst in the electrodes of a hydrogen and oxygen fuel cell?", answer: "Finely divided platinum" },
      ],
      pyqExampleId: "3303c3c4-536a-4021-86c3-d9ef53767f5e",
      traps: [
        {
          title: "Writing the reactions in acid",
          body: "The textbook's fuel cell uses KOH, so both electrode reactions are written with OH⁻: H₂ reacts with OH⁻ at the anode and O₂ gives OH⁻ at the cathode.",
        },
        {
          title: "Unbalanced electrons",
          body: "Write the anode reaction for 2H₂ so it releases 4 electrons, the same 4 that one O₂ takes up. Then the net reaction has no electrons or OH⁻ left.",
        },
      ],
    },
  ],
};
