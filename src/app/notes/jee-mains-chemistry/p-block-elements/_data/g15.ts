import type { SubtopicNote } from "@/app/notes/_types";

export const G15_PB_NOTE: SubtopicNote = {
  subtopicName: "Group 15: Periodic Trends and Hydrides",
  title: "Group 15: Periodic Trends and Hydrides",
  oneLineDefinition:
    "Nitrogen, phosphorus, arsenic, antimony and bismuth (ns² np³) change from non-metal to metal down the group; nitrogen is the exception in almost every property, and the hydrides EH₃ lose stability and basicity while gaining reducing power.",
  whyItMatters:
    "Twenty-one PYQs, twenty of them multiple choice, and six from 2026, more than any other page of the chapter. Twelve test the group trends and nitrogen's anomalies: electronegativity, the N–N bond, maximum covalency, oxidation states, the halides and the oxides; nine compare the hydrides from NH₃ to BiH₃ by stability, basicity, reducing power, bond angle and boiling point.",
  concepts: [
    // C1 — group trends and nitrogen's anomalies
    {
      kind: "reference" as const,
      slug: "jcpb-g15-trends",
      name: "Group 15 trends and the anomalous behaviour of nitrogen",
      intuition:
        "Nitrogen is small, very electronegative and has no d orbitals. Each of these explains an exception. Being small, it forms strong pπ–pπ multiple bonds, so it exists as N≡N while phosphorus exists as P₄. Its lone pairs sit close together, so the N–N single bond is weaker than P–P even though it is shorter. Having only four valence orbitals (2s and three 2p), it can form at most four bonds, so NCl₅ cannot exist while PCl₅ does. Down the group the atoms grow, but from arsenic to bismuth the growth is small because filled d and f shells shield poorly.",
      definition:
        "- **Radius:** a big jump from N to P, only a small rise from As to Bi.\n" +
        "- **Oxidation states:** −3, +3, +5 are common. Down the group +5 becomes less stable and +3 more stable (inert pair). Bismuth is the only metal.\n" +
        "- **Nitrogen:** maximum covalency 4; forms \\(p\\pi\\)–\\(p\\pi\\) multiple bonds with itself and with small electronegative atoms (C, O); no pentahalides; NF₃ is its only stable trihalide.\n" +
        "- **N–N single bond** is weaker than P–P (lone-pair repulsion) but shorter.\n" +
        "- **Disproportionation:** nitrogen in +1 to +4 disproportionates in acid. For As, Sb and Bi the +3 state is stable to disproportionation.\n" +
        "- **P and As** (not N) form \\(d\\pi\\)–\\(d\\pi\\) bonds with transition metals, for example as \\(\\mathrm{P(C_2H_5)_3}\\) ligands.\n" +
        "- **Oxides:** for one element \\(\\mathrm{E_2O_5}\\) is more acidic than \\(\\mathrm{E_2O_3}\\). Down the group the acidity falls: oxides of N and P acidic, As and Sb amphoteric, Bi basic.\n" +
        "- **Halides:** \\(\\mathrm{SbCl_5}\\) is more covalent than \\(\\mathrm{SbCl_3}\\); the higher oxidation state polarises chloride more.",
      table: {
        columns: ["Element", "Covalent radius (pm)", "First ionisation enthalpy (kJ/mol)", "Electronegativity", "Character"],
        rows: [
          { cells: ["N", "70", "1402", "3.0", "Non-metal, diatomic gas \\(\\mathrm{N_2}\\)"], noteAmber: "No d orbitals: maximum covalency 4." },
          { cells: ["P", "110", "1012", "2.1", "Non-metal, \\(\\mathrm{P_4}\\) molecules"] },
          { cells: ["As", "121", "947", "2.0", "Metalloid"] },
          { cells: ["Sb", "141", "834", "1.9", "Metalloid"] },
          { cells: ["Bi", "148", "703", "1.9", "Metal, the only one in the group"] },
        ],
        caption: "The biggest steps are between N and P in every column; below arsenic the changes are small.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{N_2O_3}\\), \\(\\mathrm{P_2O_3}\\), \\(\\mathrm{Sb_2O_3}\\) and \\(\\mathrm{Bi_2O_3}\\) from most acidic to most basic, and name the amphoteric one.",
        steps: [
          "The oxides are all \\(\\mathrm{E_2O_3}\\), so compare down the group: metallic character rises, acidity falls.",
          "Oxides of N and P are acidic, of Sb amphoteric, of Bi basic.",
        ],
        answer: "\\(\\mathrm{N_2O_3 > P_2O_3 > Sb_2O_3 > Bi_2O_3}\\) in acidity; \\(\\mathrm{Sb_2O_3}\\) is amphoteric.",
      },
      practiceSet: [
        { prompt: "Why is \\(\\mathrm{PCl_5}\\) known but \\(\\mathrm{NCl_5}\\) is not?", answer: "Nitrogen has no d orbitals to expand beyond four bonds" },
        { prompt: "Which is the most stable trihalide of nitrogen?", answer: "\\(\\mathrm{NF_3}\\)" },
        { prompt: "Which is more acidic, \\(\\mathrm{N_2O_3}\\) or \\(\\mathrm{N_2O_5}\\)?", answer: "\\(\\mathrm{N_2O_5}\\); the higher oxidation state gives the more acidic oxide" },
        { prompt: "Which group 15 element has electronegativity 2.1?", answer: "Phosphorus" },
      ],
      pyqExampleId: "74514de2-9f8b-477c-9d6a-b7ff71386e44", // 5 Apr 2026 S1 — correct statements on nitrogen's behaviour
      traps: [
        {
          title: "The N–N single bond is weaker AND shorter than P–P",
          body: "Nitrogen's small size makes the N–N bond short, but the lone pairs on the two nitrogens are then close and repel, so the bond is weaker than P–P. A statement that it is 'weaker and longer' or 'stronger' is false.",
        },
        {
          title: "The +5 state becomes LESS stable down group 15",
          body: "Because of the inert pair effect, +3 grows more stable and +5 less stable from N to Bi. Bismuth(V) is a strong oxidising agent.",
        },
        {
          title: "Nitrogen's multiple bonds are pπ–pπ",
          body: "Nitrogen has no d orbitals, so it cannot form \\(d\\pi\\)–\\(p\\pi\\) bonds. Its maximum covalency is 4, never 5 or 6.",
        },
      ],
    },

    // C2 — hydrides
    {
      kind: "reference" as const,
      slug: "jcpb-g15-hydrides",
      name: "Hydrides of group 15 from NH₃ to BiH₃",
      intuition:
        "Down the group the central atom grows, so the E–H bond gets longer and weaker. A weaker bond means a less stable hydride that gives up hydrogen more easily, so the reducing power rises from NH₃ to BiH₃. The lone pair also spreads over a bigger atom, so the hydride holds a proton less well and basicity falls. The bond angle shrinks towards 90° because the heavier atoms use almost pure p orbitals. Boiling points follow size, except that ammonia is lifted by hydrogen bonding.",
      definition:
        "- **Thermal stability:** \\(\\mathrm{NH_3 > PH_3 > AsH_3 > SbH_3 > BiH_3}\\).\n" +
        "- **Reducing power:** \\(\\mathrm{NH_3 < PH_3 < AsH_3 < SbH_3 < BiH_3}\\); \\(\\mathrm{BiH_3}\\) is the strongest reducing agent.\n" +
        "- **Basicity:** \\(\\mathrm{NH_3 > PH_3 > AsH_3 > SbH_3 > BiH_3}\\).\n" +
        "- **Bond angle** falls from 107.8° in \\(\\mathrm{NH_3}\\) to about 91° in \\(\\mathrm{SbH_3}\\).\n" +
        "- **Boiling point:** \\(\\mathrm{PH_3 < AsH_3 < NH_3 < SbH_3}\\). Ammonia is hydrogen bonded in the liquid; phosphine is not.",
      table: {
        columns: ["Hydride", "H–E–H angle (°)", "Boiling point (K)", "E–H bond enthalpy (kJ/mol)", "Character"],
        rows: [
          { cells: ["\\(\\mathrm{NH_3}\\)", "107.8", "238.5", "389", "Most stable and most basic; weakest reducing agent; hydrogen bonded"] },
          { cells: ["\\(\\mathrm{PH_3}\\)", "93.6", "185.5", "322", "Lowest boiling point in the group: no hydrogen bonding and a small molar mass"], noteAmber: "The lowest boiling point is PH₃, not NH₃." },
          { cells: ["\\(\\mathrm{AsH_3}\\)", "91.8", "210.6", "297", "Less basic and more reducing than \\(\\mathrm{PH_3}\\)"] },
          { cells: ["\\(\\mathrm{SbH_3}\\)", "91.3", "254.6", "255", "Highest boiling point of the four: the largest dispersion forces"] },
        ],
        caption: "BiH₃, not listed because it is too unstable to measure well, continues every trend: least stable, least basic, strongest reducing agent.",
      },
      selfCheckExample: {
        prompt: "Which group 15 hydride has the lowest boiling point, and why is ammonia not the lowest even though it is the lightest?",
        steps: [
          "Without hydrogen bonding the boiling point would rise with molar mass, making \\(\\mathrm{NH_3}\\) the lowest.",
          "Ammonia molecules are hydrogen bonded in the liquid, which lifts its boiling point above those of \\(\\mathrm{PH_3}\\) and \\(\\mathrm{AsH_3}\\).",
        ],
        answer: "\\(\\mathrm{PH_3}\\); hydrogen bonding raises the boiling point of \\(\\mathrm{NH_3}\\).",
      },
      practiceSet: [
        { prompt: "Which is the strongest reducing agent among the group 15 hydrides?", answer: "\\(\\mathrm{BiH_3}\\)" },
        { prompt: "Which is the most basic group 15 hydride?", answer: "\\(\\mathrm{NH_3}\\)" },
        { prompt: "Which group 15 element is a metal and forms the most reducing hydride?", answer: "Bismuth" },
        { prompt: "Among the elements that form \\(d\\pi\\)–\\(d\\pi\\) bonds with transition metals, which forms the most basic hydride? Give its atomic number.", answer: "Phosphorus, 15" },
      ],
      pyqExampleId: "5da1ac97-5e78-4bd3-8916-19cb37c66f7a", // 8 Apr 2026 S2 — reducing nature, basicity, stability and bond angle
      traps: [
        {
          title: "Boiling point does not rise steadily down group 15",
          body: "Phosphine boils lowest. Ammonia is raised by hydrogen bonding, so the order is \\(\\mathrm{PH_3 < AsH_3 < NH_3 < SbH_3}\\), not a steady rise from NH₃.",
        },
        {
          title: "Ammonia is the weakest reducing agent, not the strongest",
          body: "The N–H bond is the strongest E–H bond in the group, so ammonia gives up hydrogen least easily. Reducing power rises down the group to \\(\\mathrm{BiH_3}\\).",
        },
        {
          title: "Basicity decreases down group 15",
          body: "The lone pair on a large atom such as Sb or Bi is spread out and held loosely in a large orbital, so it binds a proton poorly. Basicity falls from \\(\\mathrm{NH_3}\\) to \\(\\mathrm{BiH_3}\\).",
        },
      ],
    },
  ],
};
