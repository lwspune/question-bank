import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_RDX_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Electrochemical Cells",
  title: "Electrochemical Cells and Electrolysis",
  oneLineDefinition:
    "A galvanic cell lets a spontaneous redox reaction push electrons through a wire; an electrolytic cell uses a power supply to drive a redox reaction that would not happen by itself.",
  whyItMatters:
    "One older question, from 2014, asked for the oxidation number changes in a car battery as it discharges. Cells and electrolysis are on the syllabus at outline level; expect facts about which electrode does what rather than long calculations.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-rdx-cell-types",
      name: "Galvanic and electrolytic cells compared",
      intuition:
        "In both kinds of cell the two half-reactions happen at separate electrodes, and the electrons travel between them through a wire. In a galvanic cell the reaction runs by itself and the moving electrons are the electric current we use. In an electrolytic cell we pump electrons in with a supply to force a reaction that would not otherwise happen.",
      definition:
        "- The **anode** is always where **oxidation** happens; the **cathode** is always where **reduction** happens. Memory aid: AN OX, RED CAT.\n" +
        "- In a **galvanic (voltaic) cell** the anode is the **negative** electrode, because the oxidation there releases electrons into the wire.\n" +
        "- In an **electrolytic cell** the anode is the **positive** electrode, because the supply pulls electrons out of it.\n" +
        "- A **salt bridge** (or porous barrier) in a galvanic cell lets ions move between the two solutions so that the circuit is complete and each solution stays electrically neutral.\n" +
        "- Electrons flow through the external wire; ions carry the current through the solution.",
      table: {
        columns: ["Feature", "Galvanic (voltaic) cell", "Electrolytic cell"],
        rows: [
          { cells: ["Energy change", "Chemical to electrical; the reaction is spontaneous", "Electrical to chemical; the reaction is forced"] },
          { cells: ["Anode", "Oxidation; negative electrode", "Oxidation; positive electrode"] },
          { cells: ["Cathode", "Reduction; positive electrode", "Reduction; negative electrode"] },
          { cells: ["Electrons in the wire", "From anode to cathode", "Pushed by the supply into the cathode and drawn out of the anode"] },
          { cells: ["Examples", "Daniell cell (zinc and copper), batteries, fuel cells", "Electrolysis of brine, aluminium extraction, electroplating"] },
        ],
      },
      selfCheckExample: {
        prompt: "In both galvanic and electrolytic cells, the anode is the electrode at which:",
        options: [
          "oxidation takes place",
          "reduction takes place",
          "the electrode is always positive",
          "the electrode is always negative",
          "a metal is always deposited",
        ],
        steps: [
          "By definition, oxidation happens at the anode in every kind of cell.",
          "The sign of the anode changes: negative in a galvanic cell, positive in an electrolytic cell, so C and D are each true for only one type.",
          "Metal is deposited by reduction, which happens at the cathode.",
        ],
        answer: "(A) oxidation takes place",
      },
      practiceSet: [
        { prompt: "In a zinc and copper galvanic cell, which metal is the anode?", answer: "Zinc", method: "Zinc is oxidised to \\(\\mathrm{Zn^{2+}}\\)" },
        { prompt: "In electrolysis, to which electrode do positive ions move?", answer: "The cathode (negative)", method: "Opposite charges attract" },
        { prompt: "What is the job of a salt bridge?", answer: "To let ions flow between the solutions and complete the circuit", method: "It keeps each half-cell electrically neutral" },
      ],
      traps: [
        {
          title: "The anode's sign changes, its job does not",
          body: "Oxidation always happens at the anode, and reduction at the cathode. But the anode is negative in a galvanic cell and positive in an electrolytic cell. Learn the electrodes by their reactions, not by their charges.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdx-e-standard",
      name: "Standard reduction potentials and the cell voltage",
      intuition:
        "Each half-cell has a tendency to take electrons, measured as its standard reduction potential, E°. Join two half-cells and the one with the higher E° wins: it is reduced, and it forces the other to be oxidised. The voltage of the cell is how far apart the two values are.",
      definition:
        "- The **standard reduction potential**, E°, is measured against the standard hydrogen electrode, which is set at 0.00 V, at 25 °C with 1 mol/L solutions and 1 atm of gas.\n" +
        "- The **more positive** E°, the stronger the oxidising agent on the left of the half-equation (it is reduced more easily). The **more negative** E°, the stronger the reducing agent on the right.\n" +
        "- In a cell, the half-cell with the higher E° is the **cathode**; the lower one is the **anode**.\n" +
        "- A **positive** cell potential means the reaction is spontaneous as written.\n" +
        "- Useful values: \\(\\mathrm{Mg^{2+}/Mg}\\) \\(-2.37\\) V, \\(\\mathrm{Zn^{2+}/Zn}\\) \\(-0.76\\) V, \\(\\mathrm{Fe^{2+}/Fe}\\) \\(-0.44\\) V, \\(\\mathrm{H^+/H_2}\\) 0.00 V, \\(\\mathrm{Cu^{2+}/Cu}\\) \\(+0.34\\) V, \\(\\mathrm{Ag^+/Ag}\\) \\(+0.80\\) V, \\(\\mathrm{Cl_2/Cl^-}\\) \\(+1.36\\) V. The order matches the reactivity series.",
      formula: {
        label: "Standard cell potential",
        latex: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
        symbols: [
          { symbol: "\\(E^\\circ_{\\text{cathode}}\\)", meaning: "reduction potential of the half-cell that is reduced (the higher value)" },
          { symbol: "\\(E^\\circ_{\\text{anode}}\\)", meaning: "reduction potential of the half-cell that is oxidised" },
        ],
      },
      authoredExample: {
        prompt:
          "A Daniell cell joins a zinc half-cell (\\(E^\\circ = -0.76\\) V) to a copper half-cell (\\(E^\\circ = +0.34\\) V). Find the anode, the cathode and the cell voltage.",
        steps: [
          "Copper has the higher E°, so \\(\\mathrm{Cu^{2+}}\\) is reduced: copper is the cathode.",
          "Zinc is oxidised: zinc is the anode.",
          "\\(E^\\circ_{\\text{cell}} = 0.34 - (-0.76) = 1.10\\ \\text{V}\\). Overall: \\(\\mathrm{Zn + Cu^{2+} \\rightarrow Zn^{2+} + Cu}\\).",
        ],
        answer: "Anode Zn, cathode Cu, 1.10 V",
      },
      selfCheckExample: {
        prompt:
          "A cell is built from a magnesium half-cell (\\(E^\\circ = -2.37\\) V) and a silver half-cell (\\(E^\\circ = +0.80\\) V). What is the standard cell potential?",
        options: [
          "1.57 V",
          "3.97 V",
          "3.17 V",
          "\\(-3.17\\) V",
          "0.80 V",
        ],
        steps: [
          "Silver has the higher E°, so it is the cathode; magnesium is the anode.",
          "\\(E^\\circ_{\\text{cell}} = 0.80 - (-2.37) = 3.17\\ \\text{V}\\).",
          "A adds the two values with their signs and drops the minus. B doubles the silver value because two \\(\\mathrm{Ag^+}\\) react per Mg: E° is never multiplied by coefficients. D subtracts in the wrong order.",
        ],
        answer: "(C) 3.17 V",
      },
      practiceSet: [
        { prompt: "Using the values above, find the voltage of an iron and copper cell.", answer: "0.78 V", method: "\\(0.34 - (-0.44)\\)" },
        { prompt: "Which is the stronger oxidising agent: \\(\\mathrm{Cu^{2+}}\\) or \\(\\mathrm{Zn^{2+}}\\)?", answer: "\\(\\mathrm{Cu^{2+}}\\)", method: "Its E° is more positive" },
        { prompt: "Will silver ions oxidise copper metal?", answer: "Yes", method: "\\(0.80 - 0.34 = +0.46\\) V, positive, so spontaneous" },
        { prompt: "Which is the strongest oxidising agent: \\(\\mathrm{Cl_2}\\), \\(\\mathrm{Ag^+}\\) or \\(\\mathrm{Cu^{2+}}\\)?", answer: "\\(\\mathrm{Cl_2}\\)", method: "Highest E°, +1.36 V" },
      ],
      traps: [
        {
          title: "Never multiply E° by the equation's coefficients",
          body: "E° is a property of the half-reaction, like a temperature, not an amount. Doubling a half-equation to balance electrons leaves its E° unchanged. Options that double or triple a potential are built from this mistake.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-rdx-electrolysis",
      name: "Electrolysis: what forms at each electrode",
      intuition:
        "In electrolysis the supply drags electrons out of the anode and pushes them into the cathode. Positive ions travel to the cathode and are reduced; negative ions travel to the anode and are oxidised. In water there is competition: water itself can be reduced to hydrogen or oxidised to oxygen, and whichever needs less energy happens.",
      definition:
        "- **Molten** ionic compound: the metal forms at the cathode, the non-metal at the anode.\n" +
        "- **Aqueous** solution, cathode: a metal **below hydrogen** (Cu, Ag) is deposited; for a reactive metal (K, Na, Ca, Mg, Al) **hydrogen** forms instead: \\(\\mathrm{2H_2O + 2e^- \\rightarrow H_2 + 2OH^-}\\).\n" +
        "- **Aqueous** solution, inert anode: a halide in **concentrated** solution gives the halogen: \\(\\mathrm{2Cl^- \\rightarrow Cl_2 + 2e^-}\\). Otherwise (sulfate, nitrate, dilute solutions) **oxygen** forms: \\(\\mathrm{2H_2O \\rightarrow O_2 + 4H^+ + 4e^-}\\).\n" +
        "- **Faraday's law** in outline: the amount of product is proportional to the charge passed. One mole of electrons carries about 96 500 C (the Faraday constant), and charge = current × time.",
      table: {
        columns: ["Electrolyte (inert electrodes unless stated)", "At the cathode (negative)", "At the anode (positive)"],
        rows: [
          { cells: ["Molten sodium chloride", "Sodium metal", "Chlorine"] },
          { cells: ["Concentrated aqueous sodium chloride (brine)", "Hydrogen; sodium hydroxide is left in solution", "Chlorine"] },
          { cells: ["Dilute sulfuric acid", "Hydrogen", "Oxygen, half the volume of the hydrogen"] },
          { cells: ["Aqueous copper(II) sulfate", "Copper", "Oxygen; the solution becomes acidic"] },
          { cells: ["Aqueous copper(II) sulfate, copper electrodes", "Copper is deposited", "The copper anode dissolves as \\(\\mathrm{Cu^{2+}}\\) (used to purify copper)"] },
          { cells: ["Molten aluminium oxide in cryolite", "Aluminium", "Oxygen, which burns the carbon anode to \\(\\mathrm{CO_2}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Aqueous potassium nitrate is electrolysed with inert electrodes. What forms at the cathode?",
        options: [
          "Potassium metal",
          "Hydrogen",
          "Oxygen",
          "Nitrogen dioxide",
          "Nitrogen",
        ],
        steps: [
          "Potassium is far above hydrogen, so in water the \\(\\mathrm{K^+}\\) ions stay in solution and water is reduced to hydrogen.",
          "Potassium metal forms only from the molten salt. Oxygen forms at the anode, not the cathode. Nitrate is not discharged at either electrode in dilute solution.",
        ],
        answer: "(B) Hydrogen",
      },
      practiceSet: [
        { prompt: "How many moles of electrons are needed to deposit 1 mol of copper from \\(\\mathrm{Cu^{2+}}\\)?", answer: "2 mol", method: "\\(\\mathrm{Cu^{2+} + 2e^- \\rightarrow Cu}\\)" },
        { prompt: "About how much charge deposits 1 mol of silver from \\(\\mathrm{Ag^+}\\)?", answer: "About 96 500 C", method: "One mole of electrons" },
        { prompt: "Molten lead(II) bromide is electrolysed. What forms at each electrode?", answer: "Lead at the cathode, bromine at the anode", method: "A molten salt gives its own elements" },
        { prompt: "When water is electrolysed, what is the volume ratio of hydrogen to oxygen?", answer: "2 : 1", method: "\\(\\mathrm{2H_2O \\rightarrow 2H_2 + O_2}\\)" },
      ],
      traps: [
        {
          title: "A reactive metal is not deposited from its aqueous solution",
          body: "Electrolysing aqueous sodium, potassium or magnesium salts gives hydrogen at the cathode, because water is reduced more easily than those ions. The metal itself is obtained only by electrolysing the molten compound.",
        },
      ],
    },
  ],
};
