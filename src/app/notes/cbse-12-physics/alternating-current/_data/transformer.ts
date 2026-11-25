import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AC_TRANSFORMER_NOTE: SubtopicNote = {
  subtopicName: "Transformers",
  title: "The Transformer: Working, Turns Ratio and Energy Losses",
  oneLineDefinition:
    "The construction and principle of a transformer, the ratio of voltages and currents in terms of the turns, numericals on ideal transformers, the causes of energy loss, and why ac and not dc can be transformed.",
  whyItMatters:
    "18 questions, every one of them from board papers. The board asks you to draw a labelled diagram of a step-up transformer, explain its working and derive the ratio of voltages (2023, 2024, 2025, 2026), state the causes of energy loss in a real transformer (2023, 2024), find voltages, currents, turns or power in an ideal transformer (2023, 2024, 2025, 2026), say what stays the same in the two coils (2024), and answer reasoning items on dc supplies, on conservation of energy and on why ac is used (2024, 2025, 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpac-transformer-ratio",
      name: "Construction, principle and the turns ratio",
      intuition:
        "A transformer is two coils on one iron core, with no wire joining them. An alternating current in the first coil makes an alternating flux in the core, and that same flux passes through the second coil, inducing an emf in it. Since every turn of either coil links the same flux, each turn has the same emf, so the voltage of each coil is simply proportional to its number of turns.",
      definition:
        "- **Construction:** a primary coil of \\(N_p\\) turns and a secondary coil of \\(N_s\\) turns, insulated from each other, wound on a soft-iron core, either one on top of the other or on separate limbs. The core is laminated.\n" +
        "- **Principle:** mutual induction.\n" +
        "- **Derivation outline (ideal transformer):** let \\(\\phi\\) be the flux in each turn of the core.\n" +
        "- Emf induced in the secondary: \\(\\varepsilon_s = -N_s \\dfrac{d\\phi}{dt}\\). Back emf in the primary: \\(\\varepsilon_p = -N_p \\dfrac{d\\phi}{dt}\\).\n" +
        "- With negligible primary resistance, \\(\\varepsilon_p = v_p\\); with a small secondary current, \\(\\varepsilon_s = v_s\\).\n" +
        "- Dividing: \\(\\dfrac{v_s}{v_p} = \\dfrac{N_s}{N_p}\\).\n" +
        "- If no energy is lost, power in = power out: \\(i_p v_p = i_s v_s\\), so \\(\\dfrac{i_s}{i_p} = \\dfrac{v_p}{v_s} = \\dfrac{N_p}{N_s}\\).\n" +
        "- The relation rests on three assumptions: small primary resistance and current, the same flux linking both coils, and a small secondary current.\n" +
        "- **Step-up:** \\(N_s > N_p\\), so \\(V_s > V_p\\) and \\(I_s < I_p\\). **Step-down:** \\(N_s < N_p\\), so \\(V_s < V_p\\) and \\(I_s > I_p\\).\n" +
        "- **The diagram:** draw a closed laminated soft-iron core, the primary on one limb joined to the ac input, the secondary on the other limb joined to the output, and label the core, both coils, \\(N_p\\), \\(N_s\\), \\(v_p\\) and \\(v_s\\).",
      formula: {
        label: "Ideal transformer",
        latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}, \\qquad V_p I_p = V_s I_s",
        symbols: [
          { symbol: "\\(N_p, N_s\\)", meaning: "turns in the primary and the secondary" },
          { symbol: "\\(V_p, V_s\\)", meaning: "primary and secondary voltages" },
          { symbol: "\\(I_p, I_s\\)", meaning: "primary and secondary currents" },
        ],
      },
      authoredExample: {
        prompt:
          "An ideal transformer has 500 turns in its primary and 2500 turns in its secondary. The primary is connected to a 120 V ac supply and the secondary delivers 0.4 A. Find the secondary voltage and the primary current. Is it a step-up or a step-down transformer?",
        steps: [
          "Given: \\(N_p = 500\\), \\(N_s = 2500\\), \\(V_p = 120\\) V, \\(I_s = 0.4\\) A.",
          "Formula: \\(V_s = \\dfrac{N_s}{N_p} V_p\\), \\(I_p = \\dfrac{N_s}{N_p} I_s\\).",
          "\\(V_s = \\dfrac{2500}{500} \\times 120 = 5 \\times 120 = 600\\) V.",
          "\\(I_p = 5 \\times 0.4 = 2\\) A. Check: \\(V_p I_p = 240\\) W \\(= V_s I_s = 600 \\times 0.4\\).",
          "\\(N_s > N_p\\), so it is a step-up transformer.",
        ],
        answer: "600 V; 2 A; step-up",
      },
      selfCheckExample: {
        prompt: "A transformer gives 12 V from a 240 V supply. Its primary has 1200 turns. How many turns does its secondary have?",
        steps: ["\\(N_s = N_p \\dfrac{V_s}{V_p} = 1200 \\times \\dfrac{12}{240} = 60\\)."],
        answer: "60 turns",
      },
      practiceSet: [
        { prompt: "On what principle does a transformer work?", answer: "Mutual induction" },
        { prompt: "In a step-up transformer, is the secondary current more or less than the primary current?", answer: "Less, in the ratio \\(N_p/N_s\\)" },
        { prompt: "An ideal transformer has \\(N_s/N_p = 4\\). The primary voltage is 50 V. Find the secondary voltage.", answer: "200 V" },
      ],
      pyqExampleId: "59a6051f-84db-4ab3-95c8-a8d35ecaca79",
      traps: [
        {
          title: "No labelled diagram",
          body: "When the question says 'draw a labelled diagram', the diagram carries marks of its own. Show the laminated core, both coils on their limbs, and label the input, the output and the turns.",
        },
        {
          title: "Turning the ratio upside down",
          body: "Voltage goes with turns: \\(V_s/V_p = N_s/N_p\\). Current goes the other way: \\(I_s/I_p = N_p/N_s\\). Check that a step-up answer has the larger voltage on the side with more turns.",
        },
        {
          title: "Dropping the reason the flux cancels",
          body: "In the derivation say that the SAME flux links every turn of both coils. That is the step that lets \\(d\\phi/dt\\) cancel; without it the ratio is only asserted.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-transformer-sums",
      name: "Numericals on an ideal transformer",
      intuition:
        "Every transformer sum uses two facts. The voltage changes in the ratio of the turns, and the power stays the same, so the current changes in the opposite ratio. Find the side you know fully, carry the power across, and the rest follows. A load on the secondary decides the secondary current by Ohm's law.",
      definition:
        "- \\(V_s = \\dfrac{N_s}{N_p} V_p\\); then \\(I_s\\) from the load (\\(I_s = V_s/R\\)) or from the power (\\(I_s = P/V_s\\)).\n" +
        "- Ideal: \\(P_{in} = V_p I_p = V_s I_s = P_{out}\\), so \\(I_p = P/V_p\\).\n" +
        "- Volts per turn is the same on every winding: \\(\\dfrac{V_p}{N_p} = \\dfrac{V_s}{N_s}\\).\n" +
        "- The frequency does not change: the output alternates at the frequency of the source.\n" +
        "- If the input is given as \\(v_p = v_0 \\sin \\omega t\\), the output is \\(v_s = \\dfrac{N_s}{N_p} v_0 \\sin \\omega t\\): the same \\(\\omega\\), the amplitude scaled by the turns ratio. Use \\(v_0/\\sqrt{2}\\) for the rms value.",
      formula: {
        label: "Power through an ideal transformer",
        latex: "P = V_p I_p = V_s I_s, \\qquad \\frac{V_p}{N_p} = \\frac{V_s}{N_s}",
      },
      authoredExample: {
        prompt:
          "An ideal step-up transformer has 50 turns in its primary and 1500 turns in its secondary. A power of 2 kW is supplied to the primary at 100 V. Find (a) the primary current, (b) the output voltage, and (c) the secondary current.",
        steps: [
          "Given: \\(N_p = 50\\), \\(N_s = 1500\\), \\(P = 2000\\) W, \\(V_p = 100\\) V.",
          "(a) \\(I_p = \\dfrac{P}{V_p} = \\dfrac{2000}{100} = 20\\) A.",
          "(b) \\(V_s = \\dfrac{N_s}{N_p} V_p = \\dfrac{1500}{50} \\times 100 = 30 \\times 100 = 3000\\) V.",
          "(c) \\(I_s = \\dfrac{P}{V_s} = \\dfrac{2000}{3000} = 0.667\\) A.",
        ],
        answer: "(a) 20 A; (b) 3000 V; (c) 0.667 A",
      },
      selfCheckExample: {
        prompt: "An ideal transformer with turns ratio \\(N_p : N_s = 10 : 1\\) has its primary on a 230 V supply and a 4.6 Ω resistor across its secondary. Find the current drawn from the supply.",
        steps: [
          "\\(V_s = \\dfrac{230}{10} = 23\\) V, so \\(I_s = \\dfrac{23}{4.6} = 5\\) A.",
          "\\(I_p = \\dfrac{V_s I_s}{V_p} = \\dfrac{23 \\times 5}{230} = 0.5\\) A.",
        ],
        answer: "0.5 A",
      },
      practiceSet: [
        { prompt: "The primary of a transformer is fed from a 50 Hz supply. What is the frequency of the output?", answer: "50 Hz" },
        { prompt: "An input \\(v_p = 100 \\sin(100\\pi t)\\) V is applied to an ideal transformer with \\(N_s/N_p = 3\\). Write the output voltage.", answer: "\\(v_s = 300 \\sin(100\\pi t)\\) V" },
        { prompt: "A primary of 100 turns is on a 50 V supply. How many secondary turns give 10 V?", answer: "20 turns" },
      ],
      pyqExampleId: "6ef90c13-81ab-4ea0-98a3-092332c7551d",
      traps: [
        {
          title: "Changing the frequency",
          body: "A transformer changes the voltage, not the frequency. An option that steps the frequency up or down with the voltage is wrong.",
        },
        {
          title: "Treating a peak input as rms",
          body: "If the input is written \\(v_0 \\sin \\omega t\\), the rms input is \\(v_0/\\sqrt{2}\\). Use the rms value when the question asks for a current from a power.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpac-transformer-losses",
      name: "Energy losses in a real transformer",
      intuition:
        "A real transformer warms up a little, and that heat is energy lost. Some flux misses the second coil, the copper wire has resistance, the changing flux drives stray currents round the iron core, and the core's magnetism is reversed again and again. Each loss has its own cure, and the board wants both: the cause and how it is reduced.",
      definition:
        "- An ideal transformer loses no energy. A real one always loses a little, yet a well designed transformer may have an efficiency of more than 95%.\n" +
        "- The board asks for two, three or four causes, so learn all four with the way each is reduced.",
      table: {
        columns: ["Loss", "Cause", "How it is reduced"],
        rows: [
          { cells: ["Flux leakage", "Not all the flux of the primary passes through the secondary, because of poor design or air gaps in the core", "Wind the primary and secondary one over the other"] },
          {
            cells: ["Resistance of the windings", "The wires have resistance, so heat \\(I^2R\\) is produced in them", "Use thick wire in the high current, low voltage winding"],
          },
          {
            cells: ["Eddy currents", "The alternating flux induces eddy currents in the iron core, which heat it", "Use a laminated core"],
            pyqExampleId: "ebb0a723-ff35-4788-845e-7cf7fe20f174",
            noteAmber: "Board 2024 asked for two causes of energy loss in a real transformer.",
          },
          { cells: ["Hysteresis", "The magnetisation of the core is reversed again and again, and the energy spent appears as heat", "Use a core material with a low hysteresis loss"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is the core of a transformer laminated?", answer: "To reduce the eddy currents in it, and so the heating" },
        { prompt: "How is flux leakage in a transformer reduced?", answer: "By winding the primary and secondary coils one over the other" },
        { prompt: "Why is thick wire used for the high current winding?", answer: "Its low resistance cuts the \\(I^2R\\) heating" },
      ],
      pyqExampleId: "26684828-243e-45be-b564-959ce21cc469",
      traps: [
        {
          title: "Naming a loss without its remedy",
          body: "'Discuss the causes of energy loss' expects each cause with how it is reduced. A bare list of names earns about half the marks.",
        },
        {
          title: "Laminating does not stop flux leakage",
          body: "Lamination cuts eddy currents. Flux leakage is reduced by winding one coil over the other. Keep each remedy with its own loss.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpac-transformer-facts",
      name: "Reasoning questions on transformers and ac supply",
      intuition:
        "Most one-mark transformer questions are settled by two ideas. A transformer needs a changing flux, so it works only on ac. And it can trade voltage for current but cannot make energy, so whatever goes up, the other comes down.",
      definition:
        "- An ideal transformer keeps the power the same; it raises the voltage only by lowering the current in the same ratio.\n" +
        "- In each answer give the reason, not only yes or no: the reason carries the mark.",
      table: {
        columns: ["Question", "Answer", "Reason"],
        rows: [
          { cells: ["Can a transformer step up or step down a dc supply?", "No", "A steady current gives a steady flux, which induces no emf in the secondary"] },
          { cells: ["Does a step-up transformer break the law of conservation of energy?", "No", "The current is reduced in the same ratio as the voltage is raised, so the output power is not more than the input"] },
          { cells: ["Can a step-up transformer be used to step down?", "Yes", "Feed the ac to the coil with more turns; then \\(N_s/N_p\\) is less than 1"] },
          {
            cells: ["What stays the same in both coils of an ideal transformer?", "The flux in each turn, and the power", "Both coils link the same core flux, and no energy is lost; voltage and current change with the turns"],
            pyqExampleId: "fe33639d-b193-4fad-9143-c3f9b6d6675b",
            noteAmber: "Board 2024 asked which of current, voltage, power and magnetic flux stay the same.",
          },
          { cells: ["Does a transformer change the frequency?", "No", "The output alternates at the frequency of the source"] },
          {
            cells: ["Why is electrical energy supplied as ac rather than dc?", "Ac voltages are easily changed", "Transformers change ac voltages easily and efficiently, and ac can be transmitted economically over long distances"],
            pyqExampleId: "a0eb71c2-4ece-4bfb-985c-72a40fac393e",
            noteAmber: "Board 2026 asked which statement about ac is NOT true; the false one was that ac is less dangerous.",
          },
        ],
      },
      practiceSet: [
        { prompt: "An ideal transformer raises the voltage ten times. What happens to the secondary current compared with the primary current?", answer: "It is one tenth of the primary current" },
        { prompt: "A step-up transformer converts a low ac voltage with a large current into what?", answer: "A high ac voltage with a small current" },
        { prompt: "Assertion (A): The output of a transformer has the same frequency as its input. Reason (R): The secondary emf is induced by the same alternating flux that the primary current sets up. Choose: both true and R explains A / both true and R does not explain A / A true, R false / A false, R true.", answer: "Both true and R explains A" },
      ],
      pyqExampleId: "5b4160ea-850a-43ee-8914-f389db71ad00",
      traps: [
        {
          title: "Saying 'step-up' means more energy",
          body: "A step-up transformer raises the voltage but lowers the current by the same factor. It is not an amplifier and gives out no more power than it takes in.",
        },
        {
          title: "A true reason that is not the explanation",
          body: "That the voltage falls and the current rises is true of a step-down transformer, but it is not why no energy is lost. Energy is conserved because the transformer is ideal. Mark that as both true, R not the explanation.",
        },
      ],
    },
  ],
};
