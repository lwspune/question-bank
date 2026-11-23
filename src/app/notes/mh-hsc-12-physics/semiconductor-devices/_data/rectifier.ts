import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_RECTIFIER_NOTE: SubtopicNote = {
  subtopicName: "p-n Junction Diode as a Rectifier",
  title: "Half Wave and Full Wave Rectifiers",
  oneLineDefinition:
    "How one diode turns AC into pulses of one direction in a half wave rectifier, how two diodes and a centre-tapped transformer use both half cycles in a full wave rectifier, and the Std XI ideas both rest on.",
  whyItMatters:
    "11 questions. Eight were set in board papers: explain the half wave rectifier with a diagram (2017, 2022, and in 2026 with waveforms), explain the full wave rectifier (2020, printed as 'null wave', and 2026 with waveforms), draw a labelled full wave rectifier (2025), and two Std XI questions on pure, p-type and n-type semiconductors (2018, 2019). The textbook adds the working of both rectifiers and the output frequency of each.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsd-semiconductors",
      name: "From Std XI: p-type, n-type and the diode as a switch",
      intuition:
        "The Std XII chapter starts from the p-n junction diode you met in Std XI. Two facts carry the whole chapter. A pure crystal has very few carriers, and doping it gives either extra free electrons (n-type) or extra holes (p-type). And a diode joined in forward bias behaves like a closed switch, while in reverse bias it behaves like an open switch.",
      definition:
        "- A pure semiconductor is an **intrinsic** semiconductor: its free electrons and holes are equal in number.\n" +
        "- Doping with a **pentavalent** impurity (phosphorus, arsenic, antimony) gives an **n-type** crystal; doping with a **trivalent** impurity (boron, aluminium, indium) gives a **p-type** crystal. Both are **extrinsic** semiconductors.\n" +
        "- A forward biased diode behaves as a **closed switch** and current flows; a reverse biased diode behaves as an **open switch** and only a negligible current flows. Every device in this chapter uses this.\n" +
        "- **How much time to give it:** the board asked about pure, p-type and n-type semiconductors in 2018 and 2019, before the present book. The present Std XII book does not teach them (they belong to Std XI), so revise this table once and spend your time on the rectifiers.",
      table: {
        columns: ["Point", "p-type", "n-type"],
        rows: [
          {
            cells: ["Impurity added", "Trivalent: boron, aluminium or indium", "Pentavalent: phosphorus, arsenic or antimony"],
            pyqExampleId: "b4dddfe2-4bd8-46ef-bbd4-104aec60a969",
            noteAmber: "Board 2019 asked you to distinguish p-type from n-type semiconductors.",
          },
          { cells: ["Name of the impurity", "Acceptor", "Donor"] },
          { cells: ["Majority carriers", "Holes", "Free electrons"] },
          { cells: ["Minority carriers", "Free electrons", "Holes"] },
          { cells: ["Charge on the impurity ion", "Negative", "Positive"] },
          { cells: ["Charge on the crystal as a whole", "Neutral", "Neutral"] },
        ],
      },
      practiceSet: [
        { prompt: "In an intrinsic semiconductor, how does the number of free electrons compare with the number of holes?", answer: "They are equal" },
        { prompt: "Which carriers are in the majority in an n-type semiconductor?", answer: "Free electrons" },
        { prompt: "A p-n junction diode is forward biased. Does it behave like an open switch or a closed switch?", answer: "A closed switch" },
      ],
      traps: [
        {
          title: "Calling a p-type crystal positive",
          body: "A p-type crystal has more holes than free electrons, but each impurity atom was neutral to begin with, so the crystal as a whole stays neutral. The same holds for n-type.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-half-wave",
      name: "The half wave rectifier",
      intuition:
        "A diode lets current through in one direction only. Put one diode in series with a load across the secondary of a transformer: in one half cycle it conducts and the load gets a pulse, in the next it blocks and the load gets nothing. Every pulse flows the same way through the load, so the output is DC, but it comes as one pulse per cycle with gaps between.",
      definition:
        "The board asks you to explain this with a neat circuit diagram, and in 2026 also the waveforms. Write it in this order:\n" +
        "- **Rectifier:** a circuit that converts an AC voltage or current into a unidirectional (DC) one. The process is rectification.\n" +
        "- **Circuit:** the secondary coil AB of a transformer is joined in series with a diode D and the load resistance \\(R_L\\). The output is taken across \\(R_L\\).\n" +
        "- **Why a transformer:** it steps the AC voltage up or down as the circuit needs, and it isolates the rectifier from the mains, which reduces the risk of electric shock.\n" +
        "- **Positive half cycle:** A is at a higher potential than B, so D is forward biased. It conducts and current flows through \\(R_L\\).\n" +
        "- **Negative half cycle:** A is at a lower potential than B, so D is reverse biased. It does not conduct and the output is zero.\n" +
        "- **Output:** pulses in alternate (positive) half cycles only, one pulse for each input cycle. So the output (ripple) frequency equals the input frequency. The maximum efficiency is 40.6%.\n" +
        "- **Waveforms:** draw the input as a full sine wave and the output as the positive humps only, with a flat zero in place of each negative half.",
      formula: {
        label: "Output frequency of a half wave rectifier",
        latex: "f_{\\text{out}} = f_{\\text{in}}",
        symbols: [
          { symbol: "\\(f_{\\text{in}}\\)", meaning: "frequency of the AC input" },
          { symbol: "\\(f_{\\text{out}}\\)", meaning: "frequency of the output pulses (the ripple)" },
        ],
      },
      authoredExample: {
        prompt:
          "An AC supply of frequency 60 Hz is fed to a half wave rectifier. Find the frequency of the output, and the number of output pulses that reach the load in 0.5 s.",
        steps: [
          "Given: \\(f_{\\text{in}} = 60\\) Hz, time \\(t = 0.5\\) s.",
          "Formula: a half wave rectifier gives one pulse for each input cycle, so \\(f_{\\text{out}} = f_{\\text{in}}\\).",
          "Substitution: \\(f_{\\text{out}} = 60\\) Hz.",
          "Pulses in 0.5 s \\(= f_{\\text{out}} \\times t = 60 \\times 0.5 = 30\\).",
        ],
        answer: "Output frequency 60 Hz; 30 pulses in 0.5 s",
      },
      selfCheckExample: {
        prompt: "A half wave rectifier delivers 25 output pulses every 0.5 s. Find the frequency of its AC input.",
        steps: ["Output frequency \\(= 25 / 0.5 = 50\\) Hz.", "For a half wave rectifier \\(f_{\\text{in}} = f_{\\text{out}} = 50\\) Hz."],
        answer: "50 Hz",
      },
      practiceSet: [
        { prompt: "The anode of the diode in a half wave rectifier is joined to end A of the secondary. In which half cycle does the diode conduct?", answer: "In the half cycle when A is at a higher potential than B" },
        { prompt: "What is the maximum efficiency of a half wave rectifier?", answer: "40.6%" },
        { prompt: "State two reasons for using a transformer in a rectifier circuit.", answer: "It steps the AC voltage up or down as needed, and it isolates the circuit from the mains, reducing the risk of shock" },
      ],
      pyqExampleId: "1d2b546d-4c10-4121-aa31-d911080e1f9a",
      traps: [
        {
          title: "No waveforms when they are asked for",
          body: "When the question says 'draw input and output waveforms', the circuit alone loses those marks. Draw the input as a full sine wave and, below it on the same time axis, the output as positive humps with gaps.",
        },
        {
          title: "Calling the output steady DC",
          body: "The output of a rectifier is unidirectional but pulsating. It is not a steady DC voltage until it is filtered and regulated.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-full-wave",
      name: "The full wave rectifier",
      intuition:
        "A half wave rectifier throws away every negative half cycle. The full wave rectifier uses two diodes and a centre-tapped transformer so that one diode conducts in each half cycle. The wiring sends both currents through the load in the same direction, so the load gets a pulse in every half cycle and the gaps disappear.",
      definition:
        "- **Circuit:** a transformer with a **centre-tapped** secondary, two diodes \\(D_1\\) and \\(D_2\\), and a load \\(R_L\\). The ends A and B of the secondary go to the p sides (anodes) of \\(D_1\\) and \\(D_2\\); their n sides are joined together, and \\(R_L\\) is joined between that common point and the centre tap C.\n" +
        "- **Positive half cycle:** A is at a higher potential than B. \\(D_1\\) is forward biased and conducts; \\(D_2\\) is reverse biased and does not. Current flows through \\(R_L\\).\n" +
        "- **Negative half cycle:** B is at a higher potential than A. \\(D_2\\) conducts and \\(D_1\\) does not. Current flows through \\(R_L\\) **in the same direction** as before.\n" +
        "- **Output:** a pulse in every half cycle, two pulses for each input cycle, so the output (ripple) frequency is twice the input frequency.\n" +
        "- **Advantages (textbook):** rectification takes place in both half cycles of the input, and the ripple is less than in a half wave rectifier. Maximum efficiency 81.2%, twice the 40.6% of a half wave rectifier.\n" +
        "- **Waveforms (as in the book):** the input; the output while \\(D_1\\) conducts; the output while \\(D_2\\) conducts; and the total output, a continuous row of positive humps.",
      formula: {
        label: "Output frequency of a full wave rectifier",
        latex: "f_{\\text{out}} = 2 f_{\\text{in}}",
        symbols: [
          { symbol: "\\(f_{\\text{in}}\\)", meaning: "frequency of the AC input" },
          { symbol: "\\(f_{\\text{out}}\\)", meaning: "frequency of the output pulses (the ripple)" },
        ],
      },
      authoredExample: {
        prompt:
          "A full wave rectifier is fed from an AC supply of frequency 60 Hz. Find (a) the frequency of the output and (b) the time between two neighbouring output peaks.",
        steps: [
          "Given: \\(f_{\\text{in}} = 60\\) Hz.",
          "Formula: a full wave rectifier gives two pulses for each input cycle, so \\(f_{\\text{out}} = 2 f_{\\text{in}}\\).",
          "(a) \\(f_{\\text{out}} = 2 \\times 60 = 120\\) Hz.",
          "(b) Time between peaks \\(= \\dfrac{1}{f_{\\text{out}}} = \\dfrac{1}{120} = 8.33 \\times 10^{-3}\\) s \\(= 8.33\\) ms.",
        ],
        answer: "(a) 120 Hz (b) 8.33 ms",
      },
      selfCheckExample: {
        prompt: "The output of a full wave rectifier has a frequency of 100 Hz. What is the frequency of its AC input?",
        steps: ["\\(f_{\\text{out}} = 2 f_{\\text{in}}\\), so \\(f_{\\text{in}} = 100 / 2 = 50\\) Hz."],
        answer: "50 Hz",
      },
      practiceSet: [
        { prompt: "Why is a centre-tapped transformer used in a full wave rectifier?", answer: "The two halves of the secondary give equal voltages of opposite polarity, so the two diodes conduct in turn" },
        { prompt: "In a full wave rectifier with a centre-tapped transformer, how many diodes conduct at any one time?", answer: "One" },
        { prompt: "Compare the maximum efficiency of a full wave rectifier with that of a half wave rectifier.", answer: "81.2% against 40.6%: twice as much" },
      ],
      pyqExampleId: "606a8c34-4dda-491e-96a9-09bb9f34ee8e",
      traps: [
        {
          title: "Showing the load current reversing",
          body: "In the negative half cycle \\(D_2\\) conducts, and the current through \\(R_L\\) flows in the SAME direction as in the positive half cycle. An arrow drawn the other way shows an AC output and loses the working mark.",
        },
        {
          title: "An unlabelled diagram",
          body: "'Neat and labelled' means every part named: AC input, primary, centre-tapped secondary with A, B and C, the diodes \\(D_1\\) and \\(D_2\\), the load \\(R_L\\) and the output terminals.",
        },
        {
          title: "'Null wave' in a question",
          body: "The 2020 paper printed 'null wave rectifier'. No such circuit exists: it is a misprint for full wave, so answer the full wave rectifier.",
        },
      ],
    },
  ],
};
