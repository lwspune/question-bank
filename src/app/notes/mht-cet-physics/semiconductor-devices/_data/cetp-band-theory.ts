import type { SubtopicNote } from "@/app/notes/_types";

export const BAND_THEORY_NOTE: SubtopicNote = {
  subtopicName: "Band Theory, Doping, and Semiconductor Types",
  title: "Energy Bands and Doping",
  oneLineDefinition:
    "Solids are sorted by the gap between their valence and conduction bands; a semiconductor's small gap lets heat free a few electrons, and doping with a pentavalent or trivalent impurity adds electrons (n-type) or holes (p-type) by the million.",
  whyItMatters:
    "18 PYQs, none HARD. Two things are asked: how the bands look in a conductor, an insulator and a semiconductor (and what temperature does to a semiconductor's resistance), " +
    "and which impurity makes which type — with the carrier counts that follow.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-energy-bands",
      name: "Conductors, Insulators and Semiconductors",
      intuition:
        "Electrons conduct only if they can move into empty energy states. A metal's bands overlap, so they always can; an insulator's gap is too wide to cross; a semiconductor's gap is small enough that at room temperature a few electrons jump it, leaving holes behind. Heat frees more of them, so a semiconductor conducts BETTER when hot.",
      definition:
        "- Insulator: valence band full, conduction band empty, gap large (\\(> 3\\) eV).\n" +
        "- Semiconductor at room temperature: conduction band partly filled, valence band partly empty; gap about 1 eV (Si 1.1 eV).\n" +
        "- Intrinsic (pure) semiconductor: every free electron leaves a hole, so \\(n_e = n_h\\); conduction only from broken covalent bonds.\n" +
        "- Temperature up: more carriers, so a semiconductor's resistivity FALLS steeply (a metal's rises).",
      formula: {
        label: "Intrinsic semiconductor",
        latex: "n_e = n_h = n_i",
      },
      authoredExample: {
        prompt: "Copper, silicon and diamond at room temperature: which has a partly filled conduction band because of thermal excitation across a small gap?",
        steps: ["Copper's bands overlap (a conductor); diamond's gap is about 5.5 eV (an insulator); silicon's 1.1 eV gap is crossed by a few electrons."],
        answer: "Silicon",
      },
      selfCheckExample: {
        prompt: "A semiconductor is in series in a circuit. It is warmed. The current?",
        steps: ["More carriers, lower resistance."],
        answer: "Increases",
      },
      practiceSet: [
        { prompt: "Band picture of an insulator: gap and conduction band?", answer: "Very large gap; empty conduction band" },
        { prompt: "In an intrinsic semiconductor, compare n_e and n_h.", answer: "Equal" },
        { prompt: "Conductivity due only to broken covalent bonds — what is the semiconductor called?", answer: "Intrinsic" },
      ],
      pyqExampleId: "96e78dc0-f584-436d-b828-e004583db716",
      traps: [
        {
          title: "A semiconductor's valence band is 'completely filled'",
          body:
            "Only at absolute zero. At room temperature some electrons have left it, so the valence band is partly EMPTY and the conduction band partly FILLED. The 'completely filled' options describe an insulator.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-doping",
      name: "n-type and p-type Doping",
      intuition:
        "Add a pentavalent atom (P, As, Sb) and its fifth electron is nearly free: electrons become the majority carriers — n-type. Add a trivalent atom (B, Al, In) and one bond is left with a hole: holes become the majority — p-type. Either way the carrier count rises enormously, so the resistivity falls.",
      definition:
        "- n-type: pentavalent donor; electrons majority, holes minority; donor levels sit in the gap just BELOW the conduction band.\n" +
        "- p-type: trivalent acceptor; holes majority, electrons minority; acceptor levels just above the valence band.\n" +
        "- The crystal stays electrically neutral either way.\n" +
        "- Mass-action law: \\(n_en_h = n_i^2\\). With donors \\(N_D \\gg n_i\\): \\(n_e \\approx N_D\\), \\(n_h = \\dfrac{n_i^2}{N_D}\\).\n" +
        "- 1 ppm of dopant in \\(4 \\times 10^{28}\\) atoms/m³ gives \\(4 \\times 10^{22}\\) carriers/m³.",
      formula: {
        label: "Mass-action law",
        latex: "n_e\\,n_h = n_i^2",
      },
      authoredExample: {
        prompt: "Silicon has \\(n_i = 1.5 \\times 10^{16}\\ \\text{m}^{-3}\\). It is doped with \\(10^{22}\\) donor atoms per m³. Electron and hole concentrations?",
        steps: [
          "\\(n_e \\approx 10^{22}\\ \\text{m}^{-3}\\).",
          "\\(n_h = \\dfrac{(1.5 \\times 10^{16})^2}{10^{22}} = 2.25 \\times 10^{10}\\ \\text{m}^{-3}\\).",
        ],
        answer: "\\(10^{22}\\) and \\(2.25 \\times 10^{10}\\ \\text{m}^{-3}\\)",
      },
      selfCheckExample: {
        prompt: "A crystal of \\(5 \\times 10^{28}\\) atoms/m³ is doped with one antimony atom per \\(10^7\\). Free electrons per m³?",
        steps: ["\\(\\dfrac{5 \\times 10^{28}}{10^{7}} = 5 \\times 10^{21}\\)."],
        answer: "\\(5 \\times 10^{21}\\ \\text{m}^{-3}\\)",
      },
      practiceSet: [
        { prompt: "Heavily doped with phosphorus: compare n_e and n_h.", answer: "\\(n_e \\gg n_h\\)" },
        { prompt: "A p-type semiconductor is doped with what, and what are its majority carriers?", answer: "Trivalent impurity; holes" },
        { prompt: "Does doping raise or lower a semiconductor's resistivity?", answer: "Lowers it" },
      ],
      pyqExampleId: "dfd767eb-f34b-48c6-b155-58a1e2758e71",
      traps: [
        {
          title: "n-type means negatively charged",
          body:
            "The 'n' names the majority CARRIER, not the charge of the crystal: every donor electron came with a donor atom, so the crystal is neutral.",
        },
      ],
    },
  ],
  related: [
    { label: "The p-n Junction — depletion layer and biasing", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-pn-junction" },
    { label: "Special Diodes — LED, photodiode, solar cell", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-special-diodes" },
  ],
};
