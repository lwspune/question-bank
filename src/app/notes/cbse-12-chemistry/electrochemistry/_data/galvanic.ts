import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_GALVANIC_NOTE: SubtopicNote = {
  subtopicName: "Galvanic Cells",
  title: "Galvanic Cells and Standard Electrode Potentials",
  oneLineDefinition:
    "How a galvanic cell is built and written, what the salt bridge does, the standard cell potential from two standard electrode potentials, and how E° values predict whether a reaction will go.",
  whyItMatters:
    "20 questions, thirteen of them from board papers from 2022 to 2025. The board asks you to pick the right cell notation (2023), find E°cell from two electrode potentials (four MCQs in 2023, one in 2025), say which plate is the cathode and what happens without the salt bridge (2022), give the function of the salt bridge (2024), decide whether copper sulphate can be kept in a zinc pot (2024), and give the signs of E°cell and ΔG° for a spontaneous reaction (2023). The textbook adds measuring E° against the hydrogen electrode, depicting a cell, the order in which metals displace each other, and which pairs react.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcec-cell-notation",
      name: "Parts of a galvanic cell and how it is written",
      intuition:
        "A galvanic cell is two half-cells, each a metal dipping in a solution of its ions. Oxidation happens in one half-cell, which gives electrons to the outer wire; reduction happens in the other, which takes them. The salt bridge joins the two solutions so that ions can move and the circuit is complete. The cell notation is just a short way of writing all this from left to right.",
      definition:
        "- **Anode:** the electrode where oxidation takes place. In a galvanic cell it is the **negative** electrode, and it is written on the **left**.\n" +
        "- **Cathode:** the electrode where reduction takes place. In a galvanic cell it is the **positive** electrode, written on the **right**.\n" +
        "- Electrons flow in the outer wire from the anode to the cathode; current flows the other way.\n" +
        "- **Notation:** a single vertical line between a metal and its solution, a double vertical line for the salt bridge. For \\(\\text{Cu(s)} + 2\\text{Ag}^{+}(aq) \\rightarrow \\text{Cu}^{2+}(aq) + 2\\text{Ag(s)}\\) the cell is \\(\\text{Cu(s)} \\mid \\text{Cu}^{2+}(aq) \\parallel \\text{Ag}^{+}(aq) \\mid \\text{Ag(s)}\\).\n" +
        "- **Salt bridge:** joins the two solutions. It completes the circuit inside the cell by letting ions move, and keeps each solution electrically neutral. Without it the current stops. The chapter only names it; the board still asks its function, so learn these two jobs.\n" +
        "- **Standard hydrogen electrode (SHE):** platinum coated with platinum black, dipping in 1 M H⁺ with pure H₂ bubbled at 1 bar. Its potential is taken as zero at all temperatures, and every other electrode potential is measured against it.\n" +
        "- If an outside voltage greater than the cell's own opposes it, the cell stops being galvanic and works as an electrolytic cell.",
      table: {
        columns: ["Part", "What happens there", "Sign or rule"],
        rows: [
          {
            cells: ["Anode", "Oxidation: the metal gives up electrons and goes into solution", "Negative in a galvanic cell; written on the left as metal | ion"],
            pyqExampleId: "5cbc997c-c1e0-4081-8e38-b9d1709d59ed",
            noteAmber: "Board 2022 asked whether the silver plate of a zinc and silver cell is the anode or the cathode: it is the cathode.",
          },
          {
            cells: ["Cathode", "Reduction: ions take electrons and are deposited", "Positive in a galvanic cell; written on the right as ion | metal"],
          },
          {
            cells: ["Salt bridge", "Lets ions move between the two solutions", "Completes the circuit and keeps both solutions neutral"],
            pyqExampleId: "5e81224b-d879-40da-9785-b17725f6105d",
            noteAmber: "Board 2024 asked its function; Board 2022 asked what happens if it is removed (the current stops).",
          },
          {
            cells: ["Standard hydrogen electrode", "Reference half-cell, Pt | H₂(1 bar) | H⁺(1 M)", "Potential taken as 0 V; the other electrode's E° is read from the cell potential"],
            pyqExampleId: "6d9f60a9-1e0d-4d8f-81d1-24c10291380a",
          },
          {
            cells: ["Opposing outside voltage", "Greater than the cell potential: the reactions reverse", "The cell then works as an electrolytic cell, not a galvanic one"],
            pyqExampleId: "2fd84760-5690-4196-af6a-0f44d5775aea",
            noteAmber: "Board 2024 set this as assertion-reason with the reason \"the cell acts like a galvanic cell\", which is false.",
          },
        ],
      },
      practiceSet: [
        {
          prompt: "Write the cell in which the reaction Ni(s) + Pb²⁺(aq) → Ni²⁺(aq) + Pb(s) takes place, and name its negative electrode.",
          answer: "\\(\\text{Ni(s)} \\mid \\text{Ni}^{2+}(aq) \\parallel \\text{Pb}^{2+}(aq) \\mid \\text{Pb(s)}\\); nickel, the anode, is the negative electrode",
        },
        {
          prompt: "In the cell Mg(s) | Mg²⁺(aq) || Cu²⁺(aq) | Cu(s), in which direction do electrons flow in the outer wire?",
          answer: "From the magnesium electrode to the copper electrode",
        },
        {
          prompt: "Give two jobs of the salt bridge.",
          answer: "It completes the circuit inside the cell, and it keeps the two solutions electrically neutral",
        },
      ],
      pyqExampleId: "257705a6-10a6-47a1-a407-d66bbc6fa96d",
      traps: [
        {
          title: "Writing the anode half-cell the wrong way round",
          body: "The anode is written metal first, then its ion: \\(\\text{Zn} \\mid \\text{Zn}^{2+}\\). The cathode is ion first, then metal: \\(\\text{Ag}^{+} \\mid \\text{Ag}\\). Swapping either costs the notation mark.",
        },
        {
          title: "Carrying the electrolytic-cell signs into a galvanic cell",
          body: "In a galvanic cell the anode is negative and the cathode positive. In an electrolytic cell it is the other way. Oxidation is always at the anode in both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-standard-emf",
      name: "Standard cell potential from electrode potentials",
      intuition:
        "Every electrode has a standard reduction potential: a measure of how strongly it pulls electrons. Join two electrodes and the one with the higher reduction potential wins the electrons and becomes the cathode. The cell potential is the size of its win: the cathode's potential minus the anode's.",
      definition:
        "- By IUPAC convention, standard reduction potentials are called **standard electrode potentials** (E°). They are listed in NCERT's Table 2.1 at 298 K.\n" +
        "- A higher E° means a stronger oxidising agent; a lower (more negative) E° means a stronger reducing agent.\n" +
        "- The electrode with the higher E° is the **cathode**; the other is the **anode**.\n" +
        "- \\(E^{\\circ}_{cell} = E^{\\circ}_{right} - E^{\\circ}_{left} = E^{\\circ}_{cathode} - E^{\\circ}_{anode}\\), both taken as reduction potentials.\n" +
        "- E° is an **intensive** property: multiplying a half reaction by 2 or 3 to balance electrons does **not** change its E°.\n" +
        "- A spontaneous cell reaction has \\(E^{\\circ}_{cell}\\) **positive** and \\(\\Delta_r G^{\\circ}\\) **negative**, since \\(\\Delta_r G^{\\circ} = -nFE^{\\circ}_{cell}\\).",
      formula: {
        label: "Standard cell potential",
        latex: "E^{\\circ}_{cell} = E^{\\circ}_{cathode} - E^{\\circ}_{anode}",
        symbols: [
          { symbol: "\\(E^{\\circ}_{cathode}\\)", meaning: "standard reduction potential of the electrode where reduction happens" },
          { symbol: "\\(E^{\\circ}_{anode}\\)", meaning: "standard reduction potential of the electrode where oxidation happens" },
        ],
      },
      authoredExample: {
        prompt:
          "A galvanic cell is made from the Ni²⁺|Ni electrode (E° = −0.25 V) and the Cu²⁺|Cu electrode (E° = +0.34 V). Write the cell and its reaction, and calculate E°cell.",
        steps: [
          "Given: \\(E^{\\circ}_{\\text{Ni}^{2+}/\\text{Ni}} = -0.25\\) V, \\(E^{\\circ}_{\\text{Cu}^{2+}/\\text{Cu}} = +0.34\\) V.",
          "Copper has the higher E°, so Cu is the cathode and Ni the anode.",
          "Cell: \\(\\text{Ni(s)} \\mid \\text{Ni}^{2+}(aq) \\parallel \\text{Cu}^{2+}(aq) \\mid \\text{Cu(s)}\\).",
          "Reaction: \\(\\text{Ni(s)} + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Ni}^{2+}(aq) + \\text{Cu(s)}\\).",
          "Formula: \\(E^{\\circ}_{cell} = E^{\\circ}_{cathode} - E^{\\circ}_{anode}\\).",
          "Substitution: \\(E^{\\circ}_{cell} = 0.34\\ \\text{V} - (-0.25\\ \\text{V}) = 0.59\\ \\text{V}\\).",
        ],
        answer: "E°cell = +0.59 V",
      },
      selfCheckExample: {
        prompt: "Find E°cell for Zn(s) | Zn²⁺(aq) || Pb²⁺(aq) | Pb(s). E° of Zn²⁺|Zn = −0.76 V, E° of Pb²⁺|Pb = −0.13 V.",
        steps: ["Zinc, on the left, is the anode; lead is the cathode.", "\\(E^{\\circ}_{cell} = -0.13 - (-0.76) = 0.63\\) V."],
        answer: "0.63 V",
      },
      practiceSet: [
        {
          prompt: "Cr³⁺|Cr has E° = −0.74 V and Cu²⁺|Cu has E° = +0.34 V. Find the standard potential of the cell made from them.",
          answer: "\\(E^{\\circ}_{cell} = 0.34 - (-0.74) = 1.08\\) V, with Cr as the anode",
        },
        {
          prompt: "Al³⁺|Al has E° = −1.66 V and Zn²⁺|Zn has E° = −0.76 V. Which metal is the anode, and what is E°cell?",
          answer: "Aluminium is the anode; \\(E^{\\circ}_{cell} = -0.76 - (-1.66) = 0.90\\) V",
        },
        {
          prompt: "The half reaction Cu²⁺ + 2e⁻ → Cu (E° = +0.34 V) is multiplied by 3 to balance a cell reaction. What is its E° now?",
          answer: "Still +0.34 V. E° does not depend on how many times the half reaction is taken",
        },
      ],
      pyqExampleId: "4a236ba6-4a4d-445f-a37b-770c4100a7b4",
      traps: [
        {
          title: "Multiplying E° by the coefficient",
          body: "To balance electrons you multiply the half reaction, never its potential. If two silver ions are needed, the silver E° is still used once.",
        },
        {
          title: "Adding the two potentials",
          body: "The anode reaction is reversed, so its potential is subtracted: \\(E^{\\circ}_{cathode} - E^{\\circ}_{anode}\\). Adding the two values gives a wrong option that MCQs often offer.",
        },
        {
          title: "A negative answer for a working cell",
          body: "A cell that works on its own has a positive E°cell. If you get a negative value, you have taken the wrong electrode as the cathode.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcec-feasibility",
      name: "Will the reaction go? Feasibility from E° values",
      intuition:
        "To decide whether a metal will react with a solution, imagine the cell the reaction would make. If that cell would have a positive E°, the reaction goes by itself. A metal low in the table (very negative E°) is a strong reducing agent and pushes metals higher in the table out of their salt solutions.",
      definition:
        "- Write the reaction, decide which species is oxidised (anode) and which is reduced (cathode), then find \\(E^{\\circ}_{cell} = E^{\\circ}_{cathode} - E^{\\circ}_{anode}\\).\n" +
        "- \\(E^{\\circ}_{cell} > 0\\): \\(\\Delta_r G^{\\circ} < 0\\), the reaction is feasible.\n" +
        "- \\(E^{\\circ}_{cell} < 0\\): the reaction does not go as written.\n" +
        "- **Displacement:** a metal with a lower E° displaces a metal with a higher E° from the solution of its salt.\n" +
        "- **Reducing power** of metals increases as E° becomes more negative; **oxidising power** of the oxidised forms increases as E° becomes more positive.\n" +
        "- **Storage:** a solution can be kept in a metal vessel only if the metal does not reduce the ions in it, that is if the cell made by that reaction has a negative E°.",
      formula: {
        label: "Feasibility test",
        latex: "E^{\\circ}_{cell} > 0 \\;\\Rightarrow\\; \\Delta_r G^{\\circ} = -nFE^{\\circ}_{cell} < 0 \\;\\Rightarrow\\; \\text{feasible}",
      },
      authoredExample: {
        prompt:
          "Can iron(II) sulphate solution be stored in a nickel vessel? E° of Fe²⁺|Fe = −0.44 V and E° of Ni²⁺|Ni = −0.25 V.",
        steps: [
          "The reaction that would spoil the vessel: \\(\\text{Ni(s)} + \\text{Fe}^{2+}(aq) \\rightarrow \\text{Ni}^{2+}(aq) + \\text{Fe(s)}\\).",
          "Nickel would be oxidised (anode) and Fe²⁺ reduced (cathode).",
          "\\(E^{\\circ}_{cell} = E^{\\circ}_{cathode} - E^{\\circ}_{anode} = -0.44 - (-0.25) = -0.19\\) V.",
          "E°cell is negative, so \\(\\Delta_r G^{\\circ}\\) is positive and nickel does not react with Fe²⁺.",
        ],
        answer: "Yes, it can be stored: E°cell = −0.19 V, so no reaction",
      },
      selfCheckExample: {
        prompt: "Arrange Ag, Fe, Mg and Pb in increasing order of reducing power. E°: Ag⁺|Ag = +0.80 V, Pb²⁺|Pb = −0.13 V, Fe²⁺|Fe = −0.44 V, Mg²⁺|Mg = −2.37 V.",
        steps: ["Reducing power rises as E° becomes more negative.", "From the most positive E° to the most negative: Ag, Pb, Fe, Mg."],
        answer: "Ag < Pb < Fe < Mg",
      },
      practiceSet: [
        {
          prompt: "Will bromine water oxidise Fe²⁺ to Fe³⁺? E° of Br₂|Br⁻ = 1.09 V, E° of Fe³⁺|Fe²⁺ = 0.77 V.",
          answer: "Yes. \\(E^{\\circ}_{cell} = 1.09 - 0.77 = +0.32\\) V, which is positive",
        },
        {
          prompt: "Can a lead spoon be used to stir a solution of silver nitrate? E° of Pb²⁺|Pb = −0.13 V, E° of Ag⁺|Ag = +0.80 V.",
          answer: "No. Lead reducing Ag⁺ gives \\(E^{\\circ}_{cell} = 0.80 - (-0.13) = +0.93\\) V, so lead dissolves and silver deposits",
        },
        {
          prompt: "Which of the metals Mg (E° = −2.37 V) and Ag (E° = +0.80 V) will give hydrogen with dilute acid?",
          answer: "Magnesium. Its E° is below that of the hydrogen electrode (0 V); silver's is above it",
        },
      ],
      pyqExampleId: "a5055528-016c-4bc4-984c-1388845f7fa9",
      traps: [
        {
          title: "Answering yes or no without the E° value",
          body: "\"Explain with the help of E°cell\" means the calculation is the marks. Write the reaction, the cell potential with its sign, and then the conclusion.",
        },
        {
          title: "Confusing the metal with its ion",
          body: "A very negative E° makes the metal a strong reducing agent. It is the metal that reacts, not its ion, so check which form is actually in the vessel and which in the solution.",
        },
      ],
    },
  ],
};
