import type { SubtopicNote } from "@/app/notes/_types";

export const MOT_NOTE: SubtopicNote = {
  subtopicName: "Molecular Orbital Theory and Bond Order",
  title: "Molecular Orbital Theory and Bond Order",
  oneLineDefinition:
    "Molecular orbital theory fills electrons into bonding and antibonding molecular orbitals; bond order = half of (bonding electrons minus antibonding electrons), and it fixes a molecule's stability, bond length and magnetic behaviour.",
  whyItMatters:
    "One of the most bankable subtopics in MHT-CET Chemical Bonding — almost every PYQ is a direct plug-in: write the MO configuration of a small diatomic (or its ion), count the bonding and antibonding electrons, and read off the bond order, magnetic nature or a bond-length ordering. The recurring traps are always the same: count TOTAL electrons including the charge on an ion, remember O2 is paramagnetic (two unpaired electrons), and note that ions can carry a fractional bond order. " +
    "Learn the filling order plus the bond-order formula cold and you can attempt every question here on sight.",
  concepts: [
    // Concept 1 — MOT basics + filling order (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "cetcb-mot-basics-filling",
      name: "Molecular orbitals and the filling order",
      intuition:
        "When two atomic orbitals overlap they combine into two molecular orbitals: a low-energy bonding MO (electrons here glue the atoms together) and a high-energy antibonding MO, marked with a star (electrons here pull the atoms apart). " +
        "Electrons fill these MOs from lowest energy upward, and for the second-period diatomics one pair of levels swaps depending on which atoms are involved.",
      definition:
        "Molecular orbital basics:\n" +
        "- Overlap of two atomic orbitals gives one **bonding MO** (lower energy: \\(\\sigma,\\ \\pi\\)) and one **antibonding MO** (higher energy: \\(\\sigma^*,\\ \\pi^*\\)).\n" +
        "- Electrons fill MOs following the **Aufbau principle, Pauli exclusion and Hund's rule** — lowest energy first, one electron per degenerate orbital before pairing.\n" +
        "- **Order for \\(\\text{B}_2,\\ \\text{C}_2,\\ \\text{N}_2\\)** (and lighter): \\(\\sigma 1s < \\sigma^*1s < \\sigma 2s < \\sigma^*2s < \\pi 2p_x = \\pi 2p_y < \\sigma 2p_z < \\pi^*2p_x = \\pi^*2p_y < \\sigma^*2p_z\\).\n" +
        "- **Order swaps for \\(\\text{O}_2,\\ \\text{F}_2,\\ \\text{Ne}_2\\)**: here \\(\\sigma 2p_z\\) drops **below** the \\(\\pi 2p\\) pair, so the sequence is \\(\\ldots \\sigma^*2s < \\sigma 2p_z < \\pi 2p_x = \\pi 2p_y < \\pi^*2p_x = \\pi^*2p_y < \\sigma^*2p_z\\).\n" +
        "- First count the **total number of electrons** (add or subtract for an ion's charge), then fill.",
      pyqExampleId: "6bc624b4-8a26-4254-99fc-97d3c5326800", // bonding & antibonding electrons in F2 = 10 and 8
      authoredExample: {
        prompt:
          "Write the molecular orbital configuration of the N2 molecule and state how many electrons occupy antibonding orbitals.",
        steps: [
          "Total electrons in \\(\\text{N}_2\\) = 7 + 7 = 14. Use the \\(\\text{N}_2\\) order (\\(\\pi 2p\\) below \\(\\sigma 2p_z\\)).",
          "Configuration: \\((\\sigma 1s)^2(\\sigma^*1s)^2(\\sigma 2s)^2(\\sigma^*2s)^2(\\pi 2p_x)^2(\\pi 2p_y)^2(\\sigma 2p_z)^2\\).",
          "Antibonding orbitals occupied are \\(\\sigma^*1s\\) and \\(\\sigma^*2s\\): \\(2 + 2 = 4\\) electrons. The \\(\\pi^*2p\\) orbitals are empty.",
        ],
        answer: "N2 has 4 electrons in antibonding orbitals.",
      },
      selfCheckExample: {
        prompt:
          "Which molecule holds the maximum number of electrons in antibonding molecular orbitals: Li2, N2, O2 or F2?",
        steps: [
          "Count antibonding electrons for each. \\(\\text{Li}_2\\) (6 e): \\((\\sigma^*1s)^2\\) = 2.",
          "\\(\\text{N}_2\\) (14 e): \\((\\sigma^*1s)^2(\\sigma^*2s)^2\\) = 4.",
          "\\(\\text{O}_2\\) (16 e): \\((\\sigma^*1s)^2(\\sigma^*2s)^2(\\pi^*2p)^2\\) = 6.",
          "\\(\\text{F}_2\\) (18 e): \\((\\sigma^*1s)^2(\\sigma^*2s)^2(\\pi^*2p)^4\\) = 8 — the maximum.",
        ],
        answer: "F2, with 8 electrons in antibonding orbitals.",
      },
      practiceSet: [
        { prompt: "How many electrons in antibonding orbitals of N2?", answer: "4", method: "only σ*1s and σ*2s are filled" },
        { prompt: "How many electrons in bonding orbitals of O2?", answer: "10", method: "σ1s²σ2s²σ2p²π2p⁴ = 2+2+2+4" },
        { prompt: "Which pair of MOs swaps order for O2 and F2 versus N2?", answer: "σ2p and π2p", method: "σ2p drops below π2p for O2/F2" },
        { prompt: "Bonding and antibonding electrons in F2 respectively?", answer: "10 and 8" },
        { prompt: "Total electrons to fill for the O2 molecule?", answer: "16", method: "8 + 8" },
      ],
      traps: [
        {
          title: "Count TOTAL electrons, and adjust for an ion's charge",
          body:
            "Always start from the total electron count. \\(\\text{N}_2\\) has 14, \\(\\text{O}_2\\) has 16 — but an ion shifts this: \\(\\text{N}_2^+\\) has **13** (one removed), \\(\\text{O}_2^-\\) has **17** (one added). Filling the wrong number of electrons is the single biggest source of wrong bond orders here.",
        },
        {
          title: "Only σ* and π* orbitals count as antibonding",
          body:
            "When asked for antibonding electrons in \\(\\text{N}_2\\), count only \\(\\sigma^*1s\\) and \\(\\sigma^*2s\\) (= 4). The \\(\\pi^*2p\\) orbitals are empty in \\(\\text{N}_2\\), so do not add them; and never count the bonding \\(\\sigma\\)/\\(\\pi\\) electrons here.",
        },
      ],
    },

    // Concept 2 — bond order formula
    {
      kind: "formula" as const,
      slug: "cetcb-mot-bond-order-formula",
      name: "Bond order from the MO configuration",
      intuition:
        "Bond order tells you how many net bonds hold the two atoms together. Electrons in bonding MOs pull the atoms in; electrons in antibonding MOs push them apart. Subtract one from the other and halve it — that net count is the bond order. " +
        "For ions it can come out as a half-integer, which is perfectly normal.",
      definition:
        "Bond order in molecular orbital theory:\n" +
        "- Bond order \\(= \\tfrac12(N_b - N_a)\\), where \\(N_b\\) = electrons in bonding MOs and \\(N_a\\) = electrons in antibonding MOs.\n" +
        "- **Bond order 0** means the molecule does not exist (e.g. hypothetical \\(\\text{He}_2\\)); positive bond order means a stable molecule.\n" +
        "- Standard values: \\(\\text{H}_2 = 1\\), \\(\\text{Li}_2 = 1\\), \\(\\text{N}_2 = 3\\), \\(\\text{O}_2 = 2\\), \\(\\text{F}_2 = 1\\), \\(\\text{CO} = 3\\) (isoelectronic with \\(\\text{N}_2\\)).\n" +
        "- **Ions give fractional bond orders**: \\(\\text{N}_2^+ = 2.5\\), \\(\\text{O}_2^+ = 2.5\\), \\(\\text{O}_2^- = 1.5\\), \\(\\text{O}_2^{2-} = 1\\).",
      formula: {
        label: "Bond order",
        latex: "\\text{Bond order} = \\tfrac{1}{2}\\left(N_b - N_a\\right)",
        symbols: [
          { symbol: "N_b", meaning: "number of electrons in bonding molecular orbitals" },
          { symbol: "N_a", meaning: "number of electrons in antibonding molecular orbitals" },
        ],
      },
      pyqExampleId: "3c6f540d-741c-40fb-943d-72f75ecb7eec", // bond order of N2+ = 2.5
      authoredExample: {
        prompt: "What is the bond order of the F2 molecule?",
        steps: [
          "Total electrons in \\(\\text{F}_2\\) = 9 + 9 = 18. Use the \\(\\text{F}_2\\) filling order.",
          "\\(N_b = 10\\) (\\(\\sigma1s^2\\,\\sigma2s^2\\,\\sigma2p^2\\,\\pi2p^4\\)), \\(N_a = 8\\) (\\(\\sigma^*1s^2\\,\\sigma^*2s^2\\,\\pi^*2p^4\\)).",
          "Bond order \\(= \\tfrac12(10 - 8) = \\tfrac12(2) = 1\\).",
        ],
        answer: "Bond order of F2 = 1 (a single bond).",
      },
      selfCheckExample: {
        prompt:
          "Find the bond order of the N2+ ion.",
        steps: [
          "Total electrons = \\(\\text{N}_2\\) (14) minus 1 for the positive charge = 13.",
          "Filling 13 electrons: \\(N_b = 9\\) (the extra electron removed comes from the \\(\\sigma 2p_z\\) bonding orbital), \\(N_a = 4\\).",
          "Bond order \\(= \\tfrac12(9 - 4) = \\tfrac12(5) = 2.5\\).",
        ],
        answer: "Bond order of N2+ = 2.5.",
      },
      practiceSet: [
        { prompt: "Bond order of F2?", answer: "1", method: "½(10 − 8)" },
        { prompt: "Bond order of CO?", answer: "3", method: "isoelectronic with N2, ½(8 − 2) for valence e" },
        { prompt: "Bond order of N2+?", answer: "2.5", method: "½(9 − 4)" },
        { prompt: "Bond order of O2?", answer: "2", method: "½(10 − 6)" },
        { prompt: "Which molecule has bond order 2: N2, H2, O2 or F2?", answer: "O2" },
        { prompt: "A molecule with bond order 0 — does it exist?", answer: "No, it does not exist" },
      ],
      traps: [
        {
          title: "Ions can have a fractional bond order",
          body:
            "Removing or adding one electron changes \\(N_b - N_a\\) by 1, so the bond order shifts by \\(\\tfrac12\\). \\(\\text{N}_2^+\\) and \\(\\text{O}_2^+\\) are both **2.5**, \\(\\text{O}_2^-\\) is **1.5** — a half-integer answer is correct, not an arithmetic slip. Do not round it.",
        },
        {
          title: "MOT bond order can differ from the Lewis picture",
          body:
            "The Lewis structure of CO looks like a double bond, but MOT gives bond order **3** (CO is isoelectronic with \\(\\text{N}_2\\)). Trust the MO count \\(\\tfrac12(N_b - N_a)\\) over a quick Lewis guess.",
        },
      ],
    },

    // Concept 3 — magnetic behaviour + bond length/stability
    {
      kind: "formula" as const,
      slug: "cetcb-mot-magnetic-length",
      name: "Magnetic behaviour, bond length and stability",
      intuition:
        "Once you have the MO configuration, two more properties fall straight out. Any unpaired electron makes the molecule paramagnetic (attracted to a magnet); all-paired means diamagnetic. And a higher bond order pulls the atoms closer, so the bond is shorter and stronger. " +
        "The famous case is O2: MOT correctly predicts it is paramagnetic, which the Lewis structure cannot.",
      definition:
        "Reading properties off the MO configuration:\n" +
        "- **Paramagnetic** = one or more unpaired electrons (attracted by a magnetic field); **diamagnetic** = all electrons paired.\n" +
        "- \\(\\text{O}_2\\) has **two unpaired electrons** in its \\(\\pi^*2p\\) orbitals, so it is **paramagnetic** — a key success of MOT. \\(\\text{N}_2\\) and \\(\\text{F}_2\\) are fully paired, so **diamagnetic**.\n" +
        "- **Higher bond order → shorter bond length → greater stability** (more energy needed to break it): \\(\\text{N}_2\\) (BO 3) has the shortest, strongest bond; \\(\\text{Cl}_2\\) (BO 1) the longest.\n" +
        "- Odd-electron molecules like **NO** (11 valence-shell electrons) carry **one unpaired electron** → paramagnetic.",
      formula: {
        label: "Bond order controls length and strength",
        latex: "\\text{Bond order} \\uparrow \\;\\Rightarrow\\; \\text{bond length} \\downarrow,\\quad \\text{bond strength} \\uparrow",
      },
      pyqExampleId: "4fc53d5d-894c-4575-a0df-0a02124e1fae", // Li2 bond order 1 and diamagnetic
      authoredExample: {
        prompt:
          "Arrange N2, O2 and Cl2 in decreasing order of bond length.",
        steps: [
          "Find the bond orders: \\(\\text{N}_2 = 3\\) (triple), \\(\\text{O}_2 = 2\\) (double), \\(\\text{Cl}_2 = 1\\) (single).",
          "Higher bond order means a shorter bond, so the ordering of bond length is the reverse of bond order.",
          "Decreasing bond length: \\(\\text{Cl}_2 > \\text{O}_2 > \\text{N}_2\\).",
        ],
        answer: "Cl2 > O2 > N2 (longest to shortest).",
      },
      selfCheckExample: {
        prompt:
          "State the bond order and magnetic nature of the Li2 molecule.",
        steps: [
          "\\(\\text{Li}_2\\) has 6 electrons: \\((\\sigma1s)^2(\\sigma^*1s)^2(\\sigma2s)^2\\).",
          "Bond order \\(= \\tfrac12(4 - 2) = 1\\).",
          "All electrons are paired, so \\(\\text{Li}_2\\) is diamagnetic.",
        ],
        answer: "Bond order 1 and diamagnetic.",
      },
      practiceSet: [
        { prompt: "Is O2 paramagnetic or diamagnetic?", answer: "Paramagnetic", method: "2 unpaired electrons in π*2p" },
        { prompt: "Number of unpaired electrons in NO?", answer: "1", method: "odd (11) valence electrons" },
        { prompt: "Magnetic nature of N2?", answer: "Diamagnetic", method: "all electrons paired" },
        { prompt: "Which has the shortest bond: N2, O2 or Cl2?", answer: "N2", method: "highest bond order (3)" },
        { prompt: "Decreasing bond length order of N2, O2, Cl2?", answer: "Cl2 > O2 > N2" },
      ],
      traps: [
        {
          title: "O2 is paramagnetic — the two unpaired electrons",
          body:
            "The Lewis structure of \\(\\text{O}_2\\) shows all electrons paired, but MOT places **two unpaired electrons** in the \\(\\pi^*2p_x\\) and \\(\\pi^*2p_y\\) orbitals (one each, by Hund's rule). So \\(\\text{O}_2\\) is **paramagnetic** — a classic exam favourite. Never call it diamagnetic.",
        },
        {
          title: "Higher bond order = shorter bond, not longer",
          body:
            "Bond length runs **opposite** to bond order. \\(\\text{N}_2\\) (BO 3) has the shortest, strongest bond; \\(\\text{Cl}_2\\) (BO 1) the longest, weakest. In a 'decreasing bond length' question the order is the reverse of the bond-order order.",
        },
      ],
    },

    // Concept 4 — reference table of common species
    {
      kind: "reference" as const,
      slug: "cetcb-mot-species-table",
      name: "Bond order and magnetic nature of common species",
      intuition:
        "Most PYQs test a handful of standard diatomics and their ions. Memorise this small table — total electrons, bond order and magnetic nature — and you can answer 'which has bond order X', 'which is paramagnetic' or 'order by stability' instantly, without re-deriving each configuration.",
      definition:
        "The bank almost always draws from the species below. Two anchors to hold it together:\n" +
        "- **\\(\\text{N}_2\\) and CO** (both 14 electrons, isoelectronic) sit at bond order **3** — the most stable.\n" +
        "- **\\(\\text{O}_2\\)** is the paramagnetic one (bond order 2, two unpaired electrons); its ions \\(\\text{O}_2^+\\) and \\(\\text{O}_2^-\\) shift the bond order up or down by \\(\\tfrac12\\).",
      pyqExampleId: "97fd6c99-3bac-49f1-a059-4a313cace9c3", // which has bond order 2 -> O2
      table: {
        columns: ["Species", "Total electrons", "Bond order", "Magnetic nature"],
        rows: [
          { cells: ["\\(\\text{H}_2\\)", "2", "1", "Diamagnetic"] },
          { cells: ["\\(\\text{Li}_2\\)", "6", "1", "Diamagnetic"] },
          { cells: ["\\(\\text{N}_2\\)", "14", "3", "Diamagnetic"] },
          { cells: ["\\(\\text{N}_2^+\\)", "13", "2.5", "Paramagnetic"], noteAmber: "One electron removed from a bonding orbital, so bond order drops to 2.5." },
          {
            cells: ["\\(\\text{O}_2\\)", "16", "2", "Paramagnetic"],
            noteAmber: "Two unpaired electrons in \\(\\pi^*2p\\) — the classic paramagnetic diatomic.",
          },
          { cells: ["\\(\\text{O}_2^+\\)", "15", "2.5", "Paramagnetic"] },
          { cells: ["\\(\\text{O}_2^-\\)", "17", "1.5", "Paramagnetic"] },
          { cells: ["\\(\\text{F}_2\\)", "18", "1", "Diamagnetic"] },
          { cells: ["\\(\\text{CO}\\)", "14", "3", "Diamagnetic"], noteAmber: "Isoelectronic with \\(\\text{N}_2\\); MOT gives bond order 3, not the Lewis double bond." },
          { cells: ["\\(\\text{NO}\\)", "15", "2.5", "Paramagnetic"], noteAmber: "Odd-electron molecule: one unpaired electron in a \\(\\pi^*2p\\) orbital." },
        ],
        caption:
          "Bond order rises to a maximum of 3 at \\(\\text{N}_2\\)/CO; paramagnetic species are the ones with an unpaired electron.",
      },
      selfCheckExample: {
        prompt:
          "Among N2, H2, O2 and F2, which molecule has a bond order of exactly 2?",
        steps: [
          "From the table: \\(\\text{N}_2 = 3\\), \\(\\text{H}_2 = 1\\), \\(\\text{F}_2 = 1\\).",
          "\\(\\text{O}_2\\) has bond order \\(\\tfrac12(10 - 6) = 2\\).",
        ],
        answer: "O2 has bond order 2.",
      },
      practiceSet: [
        { prompt: "Bond order of N2?", answer: "3" },
        { prompt: "Which molecule with bond order 2 is also paramagnetic?", answer: "O2" },
        { prompt: "Bond order and magnetic nature of NO?", answer: "2.5, paramagnetic" },
        { prompt: "Bond order of O2+?", answer: "2.5", method: "15 electrons, ½(10 − 5)" },
        { prompt: "Which two species are isoelectronic with 14 electrons and bond order 3?", answer: "N2 and CO" },
      ],
      traps: [
        {
          title: "O2 is paramagnetic even though its bond order is a whole number",
          body:
            "Bond order being an integer (2) does **not** make \\(\\text{O}_2\\) diamagnetic — magnetic nature depends on *unpaired* electrons, not on the bond order. \\(\\text{O}_2\\) has two unpaired \\(\\pi^*2p\\) electrons, so it is paramagnetic. Read the two properties independently.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Bond counting and molecular structure (NDA Chemistry)",
      href: "/notes/nda-chemistry/chemical-bonding",
    },
  ],
};
