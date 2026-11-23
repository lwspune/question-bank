import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_HYSTERESIS_NOTE: SubtopicNote = {
  subtopicName: "Hysteresis",
  title: "Hysteresis: the B-H Loop of a Ferromagnet",
  oneLineDefinition:
    "How the field B in a ferromagnetic rod lags behind the magnetising field H over one cycle, what retentivity and coercivity mean, and how the loop decides between soft and hard materials.",
  whyItMatters:
    "5 questions. Two were set in board papers: name the value of B when H = 0 on the hysteresis loop (2025), and an MCQ on why soft iron is used for the core of a transformer (2023). The textbook adds what the loop represents and the retentivity and coercivity a permanent magnet needs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpmm-hysteresis-loop",
      name: "Reading the hysteresis loop",
      intuition:
        "Put an iron rod in a solenoid and slowly take the current up, down, reversed and back. The field in the rod does not retrace its path on the way down: the domains, once lined up, do not fall back to random. So B always lags behind H, and the graph closes into a loop instead of a single line. That lag is what hysteresis means.",
      definition:
        "- A ferromagnetic rod sits in a solenoid. H = nI is set by the current; \\(M = \\chi H\\) and \\(B = \\mu_0(H + M)\\).\n" +
        "- The behaviour is **nonlinear** and **not reversible**: B depends on the magnetic history of the sample.\n" +
        "- Taking the rod once round the loop is a **hysteresis cycle**; the closed curve is the **hysteresis loop**.\n" +
        "- The **area** inside the loop is the energy lost as heat per unit volume in one cycle, just as the area of the stress-strain loop of Std XI is the energy lost in deforming a solid.\n" +
        "- Board answers on the loop need the labelled B-H graph (Fig. 11.11).",
      table: {
        columns: ["Point on the loop", "What happens", "Name"],
        rows: [
          { cells: ["O", "Unmagnetised rod; H and B are both zero", "Starting point"] },
          { cells: ["a", "B is largest; more H gives no more B, as all domains are aligned and merged", "Saturation"] },
          {
            cells: ["b", "Current made zero, so H = 0, but B is not zero: some domain alignment is kept", "Retentivity (remanence)"],
            pyqExampleId: "988fdc3f-a501-4e2f-8b87-cb56a1f03915",
            noteAmber: "Board 2025 asked what the value of B at H = 0 is called: retentivity.",
          },
          { cells: ["c", "Reverse current; B becomes zero at a certain reverse H; domain axes random again", "Coercivity (this value of H)"] },
          { cells: ["d", "Reverse current increased; B saturates in the reverse direction", "Reverse saturation"] },
          { cells: ["e", "H = 0 again; B is not zero but reversed in direction", "Reverse retentivity"] },
        ],
      },
      selfCheckExample: {
        prompt: "What does it mean to say that B depends on the magnetic history of a ferromagnetic sample? Use the hysteresis loop.",
        steps: [
          "At H = 0 the sample can have B = 0 (point O), B positive (point b) or B negative (point e).",
          "Which one it has depends on what fields it was put through before. That is its magnetic history.",
        ],
        answer: "The same H can give different B, depending on the sample's past fields",
      },
      practiceSet: [
        { prompt: "What does the area of a hysteresis loop represent?", answer: "The energy lost as heat per unit volume of the material in one cycle" },
        { prompt: "What is coercivity?", answer: "The reverse magnetising field H needed to bring B back to zero" },
        { prompt: "Why does B stop increasing at saturation?", answer: "All the domains are already aligned and merged" },
        { prompt: "When the current is reduced after saturation, does B retrace its earlier path?", answer: "No. The earlier domain structure is not recovered" },
      ],
      traps: [
        {
          title: "Retentivity is a value of B, coercivity a value of H",
          body: "Retentivity is the B left at H = 0. Coercivity is the H that makes B zero. Swapping them is the usual slip.",
        },
        {
          title: "Drawing the loop without labels",
          body: "Mark the axes B and H and the points of saturation, retentivity and coercivity. An unlabelled curve does not earn the diagram mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmm-soft-hard",
      name: "Soft and hard ferromagnetic materials",
      intuition:
        "Two shapes of loop, two jobs. A thin loop means the material magnetises and demagnetises easily and wastes little energy each cycle: right for a core that the current must switch on and off. A fat loop means the material keeps its magnetism and resists losing it: right for a permanent magnet.",
      definition:
        "- **Soft** ferromagnetic materials (soft iron) are easily magnetised and demagnetised.\n" +
        "- **Hard** ferromagnetic materials keep their magnetization to a large extent and are used for permanent magnets.\n" +
        "- A transformer core goes round the loop with every cycle of the alternating current, so it needs the narrow loop of soft iron.",
      table: {
        columns: ["Property", "Soft ferromagnetic material", "Hard ferromagnetic material"],
        rows: [
          { cells: ["Shape of loop", "Narrow", "Wide"] },
          {
            cells: ["Retentivity and coercivity", "Both low", "Both high"],
            pyqExampleId: "7453ca72-7fc5-49f9-823e-c1d72435e721",
            noteAmber: "Board 2023 MCQ: soft iron is used for a transformer core because of its low coercivity and low retentivity.",
          },
          { cells: ["Magnetised and demagnetised", "Easily", "Not easily"] },
          { cells: ["Energy lost per cycle (loop area)", "Small", "Large"] },
          { cells: ["Used for", "Electromagnets and transformer cores", "Permanent magnets"] },
        ],
      },
      practiceSet: [
        { prompt: "Which material makes a good permanent magnet: one with a narrow loop or a wide loop?", answer: "A wide loop, with high retentivity and high coercivity" },
        { prompt: "Why is a hard ferromagnetic rod, and not soft iron, used to make a permanent magnet?", answer: "A hard material keeps its magnetization after the magnetising current is switched off" },
        { prompt: "Is soft iron easy or hard to demagnetise?", answer: "Easy" },
      ],
      traps: [
        {
          title: "High retentivity for a core",
          body: "A core with high retentivity stays magnetised when the current stops. That is the property of a permanent magnet, not of a transformer core or an electromagnet.",
        },
        {
          title: "Naming only one property",
          body: "A permanent magnet needs BOTH high retentivity (keeps its magnetism) and high coercivity (is hard to demagnetise). Give both.",
        },
      ],
    },
  ],
};
