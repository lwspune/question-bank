import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CB_MOT_NOTE: SubtopicNote = {
  subtopicName: "Molecular Orbital Theory",
  title: "Molecular Orbital Theory",
  oneLineDefinition:
    "Atomic orbitals combine into bonding and antibonding molecular orbitals; their energy order, bond order = ½(Nb − Na), and what bond order and unpaired electrons say about stability, bond length and magnetism.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026. Two turn on the energy order of the molecular orbitals: the order for B₂, C₂ and N₂ (2023), and the highest occupied orbital of Ne₂ (Re-NEET 2026). Two use bond order and magnetism: an incorrect statement about O₂⁺ being diamagnetic (2022), and two statements about a bond order of zero and bond length (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcb-mo-order",
      name: "Molecular orbitals and their energy order",
      intuition:
        "When two atoms come together, their atomic orbitals combine into molecular orbitals that belong to the whole molecule. Each pair of atomic orbitals gives two: a bonding orbital lower in energy, which holds the atoms together, and an antibonding orbital (marked with a star) higher in energy, which pushes them apart. Electrons fill these from the lowest energy up, like electrons in an atom.",
      definition:
        "- Atomic orbitals combine only if they have **comparable energy**, the **same symmetry** about the bond axis, and **maximum overlap**.\n" +
        "- n atomic orbitals give n molecular orbitals: half bonding, half antibonding (σ*, π*).\n" +
        "- Order for \\(\\text{B}_2\\), \\(\\text{C}_2\\), \\(\\text{N}_2\\) and lighter molecules (up to 14 electrons): \\(\\sigma 1s < \\sigma^*1s < \\sigma 2s < \\sigma^*2s < (\\pi 2p_x = \\pi 2p_y) < \\sigma 2p_z < (\\pi^*2p_x = \\pi^*2p_y) < \\sigma^*2p_z\\).\n" +
        "- Order for \\(\\text{O}_2\\), \\(\\text{F}_2\\) and \\(\\text{Ne}_2\\): the same, but \\(\\sigma 2p_z\\) comes BELOW the pair \\(\\pi 2p_x = \\pi 2p_y\\).\n" +
        "- Fill electrons in that order, two to an orbital, with Hund's rule for the equal-energy π pairs.",
      table: {
        columns: ["Molecule", "Electrons", "Order used", "Last orbital filled"],
        rows: [
          { cells: ["\\(\\text{B}_2\\)", "10", "π below σ2pz", "\\(\\pi 2p_x\\), \\(\\pi 2p_y\\) (one electron each)"] },
          { cells: ["\\(\\text{C}_2\\)", "12", "π below σ2pz", "\\(\\pi 2p_x\\), \\(\\pi 2p_y\\) (full)"] },
          { cells: ["\\(\\text{N}_2\\)", "14", "π below σ2pz", "\\(\\sigma 2p_z\\)"] },
          { cells: ["\\(\\text{O}_2\\)", "16", "σ2pz below π", "\\(\\pi^*2p_x\\), \\(\\pi^*2p_y\\) (one electron each)"] },
          { cells: ["\\(\\text{Ne}_2\\)", "20", "σ2pz below π", "\\(\\sigma^*2p_z\\)"], noteAmber: "Re-NEET 2026: the highest occupied molecular orbital of Ne₂ is σ*2p." },
        ],
      },
      pyqExampleId: "fc9f1ef0-0671-470c-b29c-6331f9dcc375",
      selfCheckExample: {
        prompt: "Why must the 1s orbital of one atom combine with the 1s orbital of the other, and not with its 2s orbital?",
        steps: [
          "Atomic orbitals combine only when their energies are comparable.",
          "A 1s and a 2s orbital differ too much in energy.",
        ],
        answer: "Only orbitals of comparable energy combine",
      },
      practiceSet: [
        { prompt: "Which is lower in energy: a bonding or an antibonding molecular orbital?", answer: "The bonding orbital" },
        { prompt: "How many molecular orbitals do two atomic orbitals form?", answer: "Two" },
        { prompt: "For O₂, which is lower in energy: σ2pz or the π2p pair?", answer: "σ2pz" },
        { prompt: "Name the three conditions for atomic orbitals to combine.", answer: "Comparable energy, same symmetry, maximum overlap" },
      ],
      traps: [
        {
          title: "Two orders, switched at oxygen",
          body: "Up to \\(\\text{N}_2\\) the π2p pair lies below \\(\\sigma 2p_z\\). From \\(\\text{O}_2\\) onwards \\(\\sigma 2p_z\\) lies below the π pair. Using the wrong order changes the last filled orbital.",
        },
        {
          title: "Antibonding orbitals fill too",
          body: "Once the bonding orbitals of a level are full, electrons go into the starred orbitals. In \\(\\text{Ne}_2\\) every orbital up to \\(\\sigma^*2p_z\\) is full.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcb-bond-order",
      name: "Bond order, stability and magnetism",
      intuition:
        "Electrons in bonding orbitals hold the atoms together; electrons in antibonding orbitals undo that. Bond order is the net count of bonds: half of (bonding electrons minus antibonding electrons). If it comes to zero, the molecule does not hold together. A bigger bond order means a stronger, shorter bond. And any unpaired electron makes the molecule paramagnetic, drawn into a magnetic field.",
      definition:
        "- \\(\\text{Bond order} = \\tfrac{1}{2}(N_b - N_a)\\), with \\(N_b\\) electrons in bonding and \\(N_a\\) in antibonding orbitals.\n" +
        "- Positive bond order: a stable molecule. Zero or negative: the molecule does not exist (\\(\\text{He}_2\\), \\(\\text{Ne}_2\\)).\n" +
        "- Higher bond order: higher bond enthalpy and SHORTER bond length.\n" +
        "- Unpaired electrons: **paramagnetic** (\\(\\text{B}_2\\), \\(\\text{O}_2\\), \\(\\text{O}_2^+\\), \\(\\text{O}_2^-\\)). All paired: **diamagnetic** (\\(\\text{N}_2\\), \\(\\text{C}_2\\), \\(\\text{F}_2\\), \\(\\text{O}_2^{2-}\\)).\n" +
        "- The oxygen family: \\(\\text{O}_2^+\\) 2.5, \\(\\text{O}_2\\) 2, \\(\\text{O}_2^-\\) 1.5, \\(\\text{O}_2^{2-}\\) 1. Each added electron goes into a π* orbital and lowers the bond order by ½.",
      formula: {
        label: "Bond order",
        latex: "\\text{Bond order} = \\tfrac{1}{2}\\left(N_b - N_a\\right)",
        symbols: [
          { symbol: "\\(N_b\\)", meaning: "electrons in bonding molecular orbitals" },
          { symbol: "\\(N_a\\)", meaning: "electrons in antibonding molecular orbitals" },
        ],
      },
      authoredExample: {
        prompt: "Find the bond order of the N₂⁺ ion and say whether it is paramagnetic.",
        steps: [
          "\\(\\text{N}_2^+\\) has 13 electrons. Order up to \\(\\text{N}_2\\): \\(\\sigma 1s^2\\,\\sigma^*1s^2\\,\\sigma 2s^2\\,\\sigma^*2s^2\\,(\\pi 2p_x^2 = \\pi 2p_y^2)\\,\\sigma 2p_z^1\\).",
          "Bonding: \\(2 + 2 + 4 + 1 = 9\\). Antibonding: \\(2 + 2 = 4\\).",
          "Bond order \\(= \\tfrac{1}{2}(9 - 4) = 2.5\\). The single electron in \\(\\sigma 2p_z\\) is unpaired.",
        ],
        answer: "2.5; paramagnetic",
      },
      selfCheckExample: {
        prompt: "Find the bond order of B₂ and say whether it is paramagnetic or diamagnetic.",
        steps: [
          "\\(\\text{B}_2\\) has 10 electrons: \\(\\sigma 1s^2\\,\\sigma^*1s^2\\,\\sigma 2s^2\\,\\sigma^*2s^2\\,\\pi 2p_x^1\\,\\pi 2p_y^1\\).",
          "Bonding 6, antibonding 4: bond order \\(\\tfrac{1}{2}(6 - 4) = 1\\).",
          "The two π electrons are unpaired (Hund's rule).",
        ],
        answer: "1; paramagnetic",
      },
      practiceSet: [
        { prompt: "What is the bond order of He₂?", answer: "0 (it does not exist)" },
        { prompt: "What is the bond order of the H₂⁺ ion?", answer: "0.5" },
        { prompt: "Is the C₂ molecule paramagnetic or diamagnetic?", answer: "Diamagnetic" },
        { prompt: "Of N₂ and F₂, which has the shorter bond?", answer: "N₂ (bond order 3 against 1)" },
      ],
      pyqExampleId: "21761850-23a3-4d84-9ecf-54c1f4e30c46",
      traps: [
        {
          title: "Zero bond order means no molecule",
          body: "A bond order of zero means the antibonding electrons cancel the bonding ones, so such a molecule is not stable. A statement calling it quite stable is false.",
        },
        {
          title: "O₂⁺ still has an unpaired electron",
          body: "Removing one π* electron from \\(\\text{O}_2\\) leaves one unpaired electron in \\(\\text{O}_2^+\\), so it is paramagnetic, not diamagnetic.",
        },
        {
          title: "Bond length falls as bond order rises",
          body: "More net bonding pulls the nuclei closer. Higher bond order means a shorter bond, never a longer one.",
        },
      ],
    },
  ],
};
