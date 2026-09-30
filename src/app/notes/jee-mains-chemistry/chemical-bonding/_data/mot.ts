import type { SubtopicNote } from "@/app/notes/_types";

export const MOT_BOND_NOTE: SubtopicNote = {
  subtopicName: "Molecular Orbital Theory",
  title: "Molecular Orbital Theory",
  oneLineDefinition:
    "Atomic orbitals of the same symmetry combine into bonding and antibonding molecular orbitals; filling them in order gives the bond order, ½(Nb − Na), and the number of unpaired electrons.",
  whyItMatters:
    "Thirty-six PYQs, sixteen of them numerical, and three from 2026 — the chapter's largest page. Eight test how atomic orbitals combine: the conditions, symmetry about the axis and the shapes of bonding and antibonding orbitals; fifteen find or rank bond orders; thirteen count unpaired electrons or sort species into paramagnetic and diamagnetic. Three ideas cover the page.",
  concepts: [
    // C1 — how atomic orbitals combine
    {
      kind: "reference" as const,
      slug: "jcbond-lcao",
      name: "Combining atomic orbitals (LCAO)",
      intuition:
        "Two atomic orbitals that overlap make two molecular orbitals. Adding the waves in phase piles electron density between the nuclei and gives a bonding orbital of lower energy. Subtracting them leaves a node between the nuclei and gives an antibonding orbital of higher energy.",
      definition:
        "- Conditions: the atomic orbitals must have comparable energy, the same symmetry about the molecular axis, and overlap as much as possible.\n" +
        "- Bonding: \\(\\psi_{MO} = \\psi_A + \\psi_B\\). Antibonding: \\(\\psi_{MO} = \\psi_A - \\psi_B\\), with a node between the nuclei.\n" +
        "- \\(n\\) atomic orbitals give \\(n\\) molecular orbitals, half bonding and half antibonding. The 2s and 2p orbitals of two atoms (8 in all) give 8 molecular orbitals, 4 of them antibonding.\n" +
        "- Symmetry about the z axis: s, \\(p_z\\) and \\(d_{z^2}\\) are σ type; \\(p_x\\), \\(p_y\\), \\(d_{xz}\\) and \\(d_{yz}\\) are π type; \\(d_{xy}\\) and \\(d_{x^2-y^2}\\) are δ type.\n" +
        "- A π bonding orbital has its density above and below the axis and a nodal plane containing the axis; π* has, in addition, a node between the nuclei.",
      table: {
        columns: ["Pair of orbitals (axis z)", "Symmetry of each", "Do they combine?"],
        rows: [
          { cells: ["1s and 1s", "σ and σ", "Yes: σ1s and σ*1s"] },
          { cells: ["\\(2p_z\\) and \\(2p_z\\)", "σ and σ", "Yes: σ2p and σ*2p (head-on)"] },
          { cells: ["\\(2p_x\\) and \\(2p_x\\)", "π and π", "Yes: π2p and π*2p (sideways)"] },
          { cells: ["2s and \\(2p_z\\)", "σ and σ", "Yes, if their energies are close"] },
          { cells: ["2s and \\(2p_y\\)", "σ and π", "No: zero net overlap"] },
          { cells: ["\\(2p_x\\) and \\(2p_y\\)", "π, but at right angles", "No: they are orthogonal"] },
          { cells: ["\\(3d_{xz}\\) and \\(2p_x\\)", "π and π", "Yes: a π overlap"] },
          { cells: ["\\(3d_{xy}\\) and \\(3d_{x^2-y^2}\\)", "δ and δ, but rotated 45°", "No: orthogonal to each other"], noteAmber: "Both are δ type, yet they cancel; same symmetry label is not enough when the lobes are turned 45°." },
        ],
        caption: "Same symmetry about the axis and a matching orientation are both needed for a net overlap.",
      },
      selfCheckExample: {
        prompt: "With z as the internuclear axis, which of these pairs combine: (i) \\(2p_y\\) and \\(2p_y\\); (ii) 1s and \\(2p_x\\); (iii) \\(3d_{z^2}\\) and 2s?",
        steps: [
          "(i) Both π type and parallel: they combine sideways.",
          "(ii) 1s is σ type, \\(2p_x\\) is π type: no net overlap.",
          "(iii) Both σ type: they can combine.",
        ],
        answer: "(i) and (iii).",
      },
      practiceSet: [
        { prompt: "Which is σ*, \\(\\psi_A + \\psi_B\\) or \\(\\psi_A - \\psi_B\\)?", answer: "\\(\\psi_A - \\psi_B\\)" },
        { prompt: "How many molecular orbitals come from the 2s and 2p orbitals of two atoms?", answer: "8" },
        { prompt: "Does a π* orbital have a node between the nuclei?", answer: "Yes" },
        { prompt: "Must combining orbitals overlap as little or as much as possible?", answer: "As much as possible" },
      ],
      pyqExampleId: "8922b4e0-3658-4bc5-8a05-8a43c5972e02", // 2025 — which pairs of orbitals combine along z
      traps: [
        {
          title: "Bonding π density is not low above the axis",
          body: "A π bonding orbital puts its density above and below the internuclear axis, with none on the axis itself. A statement that it has lower density above and below the axis is false.",
        },
        {
          title: "Maximum overlap, not minimum",
          body: "The three LCAO conditions are comparable energy, same symmetry and maximum overlap. 'Minimum overlap' or 'different symmetry' in a list of conditions is always a wrong option.",
        },
      ],
    },

    // C2 — bond order
    {
      kind: "formula" as const,
      slug: "jcbond-bond-order",
      name: "Bond order from the MO diagram",
      intuition:
        "Electrons in bonding orbitals hold the atoms together and electrons in antibonding orbitals push them apart. Bond order is the net count of shared pairs. A higher bond order means a shorter, stronger bond; a bond order of zero means the molecule does not exist.",
      definition:
        "- Bond order \\(= \\tfrac{1}{2}(N_b - N_a)\\): \\(N_b\\) electrons in bonding orbitals, \\(N_a\\) in antibonding orbitals.\n" +
        "- Up to 14 electrons (\\(\\mathrm{B_2}\\), \\(\\mathrm{C_2}\\), \\(\\mathrm{N_2}\\)): \\(\\sigma1s < \\sigma^*1s < \\sigma2s < \\sigma^*2s < \\pi2p_x = \\pi2p_y < \\sigma2p_z < \\pi^* < \\sigma^*\\).\n" +
        "- From 15 electrons (\\(\\mathrm{O_2}\\), \\(\\mathrm{F_2}\\)): \\(\\sigma2p_z\\) drops below the two π2p orbitals.\n" +
        "- Values: \\(\\mathrm{B_2}\\) 1, \\(\\mathrm{C_2}\\) 2, \\(\\mathrm{N_2}\\) 3, \\(\\mathrm{O_2}\\) 2, \\(\\mathrm{F_2}\\) 1; \\(\\mathrm{He_2}\\), \\(\\mathrm{Be_2}\\), \\(\\mathrm{Ne_2}\\) 0 (they do not exist); \\(\\mathrm{He_2^+}\\) 0.5.\n" +
        "- Isoelectronic species share a bond order: 14 electrons (\\(\\mathrm{N_2}\\), CO, \\(\\mathrm{NO^+}\\), \\(\\mathrm{CN^-}\\), \\(\\mathrm{C_2^{2-}}\\), \\(\\mathrm{O_2^{2+}}\\)) all give 3.\n" +
        "- Removing an electron from an antibonding orbital strengthens the bond (\\(\\mathrm{O_2 \\to O_2^+}\\), \\(\\mathrm{NO \\to NO^+}\\)); removing one from a bonding orbital weakens it (\\(\\mathrm{N_2}\\), \\(\\mathrm{C_2}\\), \\(\\mathrm{B_2}\\)).",
      formula: {
        label: "Bond order",
        latex: "\\text{bond order} = \\tfrac{1}{2}(N_b - N_a)",
      },
      authoredExample: {
        prompt: "Find the bond orders of \\(\\mathrm{B_2}\\), \\(\\mathrm{C_2}\\) and \\(\\mathrm{N_2}\\) and rank their bond strengths.",
        steps: [
          "\\(\\mathrm{B_2}\\), 10 electrons: \\(\\sigma1s^2\\,\\sigma^*1s^2\\,\\sigma2s^2\\,\\sigma^*2s^2\\,\\pi2p^2\\). \\(N_b = 6\\), \\(N_a = 4\\), bond order 1.",
          "\\(\\mathrm{C_2}\\), 12 electrons: the π2p set holds 4. \\(N_b = 8\\), \\(N_a = 4\\), bond order 2.",
          "\\(\\mathrm{N_2}\\), 14 electrons: \\(\\sigma2p_z^2\\) is added. \\(N_b = 10\\), \\(N_a = 4\\), bond order 3.",
        ],
        answer: "1, 2 and 3; bond strength \\(\\mathrm{B_2 < C_2 < N_2}\\).",
      },
      selfCheckExample: {
        prompt: "Find the bond orders of \\(\\mathrm{NO^+}\\), NO and \\(\\mathrm{NO^-}\\) and arrange them by bond length.",
        steps: [
          "\\(\\mathrm{NO^+}\\): 14 electrons, like \\(\\mathrm{N_2}\\): bond order 3.",
          "NO: 15 electrons, one in π*: \\(\\tfrac{1}{2}(10 - 5) = 2.5\\).",
          "\\(\\mathrm{NO^-}\\): 16 electrons, two in π*: \\(\\tfrac{1}{2}(10 - 6) = 2\\).",
        ],
        answer: "3, 2.5 and 2; length \\(\\mathrm{NO^+ < NO < NO^-}\\).",
      },
      practiceSet: [
        { prompt: "Bond order of \\(\\mathrm{He_2^+}\\)?", answer: "0.5" },
        { prompt: "Bond order of \\(\\mathrm{F_2}\\)?", answer: "1" },
        { prompt: "Bond order of \\(\\mathrm{C_2^{2-}}\\) (the acetylide ion)?", answer: "3" },
        { prompt: "Does removing an electron strengthen or weaken the bond in \\(\\mathrm{N_2}\\)?", answer: "Weaken (3 to 2.5)" },
      ],
      pyqExampleId: "285ee353-0fb1-4f96-b204-ff73d7a62695", // 2026 — O2 species: bond-length order and unpaired-electron order
      traps: [
        {
          title: "Count every electron, core included, or none",
          body: "Either count all electrons (σ1s and σ*1s cancel) or only the valence ones; the bond order is the same. Mixing the two, for example counting σ1s as bonding but skipping σ*1s, adds one to the answer.",
        },
        {
          title: "A bond order of zero means no molecule",
          body: "\\(\\mathrm{Be_2}\\) and \\(\\mathrm{He_2}\\) have as many antibonding as bonding electrons, so they do not exist. \\(\\mathrm{He_2^+}\\), \\(\\mathrm{He_2^-}\\) and \\(\\mathrm{O_2^{2-}}\\) have positive bond orders and do.",
        },
      ],
    },

    // C3 — unpaired electrons and magnetism
    {
      kind: "reference" as const,
      slug: "jcbond-magnetism",
      name: "Unpaired electrons and magnetism",
      intuition:
        "A species with any unpaired electron is drawn into a magnetic field: it is paramagnetic. If every electron is paired, it is diamagnetic. The unpaired electrons sit in the highest filled orbitals, usually the π or π* pair, and Hund's rule spreads them out singly.",
      definition:
        "- Paramagnetic: at least one unpaired electron. Diamagnetic: none.\n" +
        "- \\(\\mathrm{O_2}\\) has two unpaired electrons in π*, which the Lewis structure cannot show; \\(\\mathrm{B_2}\\) has two in π2p.\n" +
        "- Any species with an odd electron count is paramagnetic: NO, \\(\\mathrm{NO_2}\\), \\(\\mathrm{ClO_2}\\), \\(\\mathrm{KO_2}\\) (the superoxide ion \\(\\mathrm{O_2^-}\\)).\n" +
        "- Spin-only magnetic moment: \\(\\mu = \\sqrt{n(n+2)}\\) BM, where \\(n\\) is the number of unpaired electrons.\n" +
        "- \\(\\mathrm{S_2}\\), like \\(\\mathrm{O_2}\\), is paramagnetic; \\(\\mathrm{N_2}\\), \\(\\mathrm{F_2}\\) and \\(\\mathrm{Cl_2}\\) are diamagnetic.",
      table: {
        columns: ["Species", "Electrons", "Bond order", "Unpaired electrons", "Magnetism"],
        rows: [
          { cells: ["\\(\\mathrm{H_2^+}\\), \\(\\mathrm{He_2^+}\\)", "1, 3", "0.5", "1", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{Li_2}\\)", "6", "1", "0", "Diamagnetic"] },
          { cells: ["\\(\\mathrm{B_2}\\)", "10", "1", "2", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{C_2}\\)", "12", "2", "0", "Diamagnetic"] },
          { cells: ["\\(\\mathrm{C_2^-}\\), \\(\\mathrm{N_2^+}\\)", "13", "2.5", "1", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{N_2}\\), CO, \\(\\mathrm{CN^-}\\), \\(\\mathrm{NO^+}\\)", "14", "3", "0", "Diamagnetic"] },
          { cells: ["\\(\\mathrm{N_2^-}\\), \\(\\mathrm{O_2^+}\\), NO", "15", "2.5", "1", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{O_2}\\), \\(\\mathrm{N_2^{2-}}\\)", "16", "2", "2", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{O_2^-}\\)", "17", "1.5", "1", "Paramagnetic"] },
          { cells: ["\\(\\mathrm{O_2^{2-}}\\), \\(\\mathrm{F_2}\\)", "18", "1", "0", "Diamagnetic"], noteAmber: "O₂²⁻ has 10 electrons in bonding orbitals and 8 in antibonding ones." },
        ],
        caption: "Species with the same electron count have the same bond order and the same number of unpaired electrons.",
      },
      selfCheckExample: {
        prompt: "Find the bond order of \\(\\mathrm{B_2}\\), its number of unpaired electrons, and its spin-only magnetic moment.",
        steps: [
          "10 electrons; the last two go singly into the two π2p orbitals (Hund's rule).",
          "Bond order \\(\\tfrac{1}{2}(6 - 4) = 1\\); \\(n = 2\\).",
          "\\(\\mu = \\sqrt{2 \\times 4} = \\sqrt{8} = 2.83\\) BM.",
        ],
        answer: "Bond order 1, two unpaired electrons, 2.83 BM.",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{O_2^{2-}}\\) paramagnetic?", answer: "No; all electrons paired" },
        { prompt: "How many unpaired electrons does \\(\\mathrm{O_2^-}\\) have?", answer: "1" },
        { prompt: "Is \\(\\mathrm{KO_2}\\) paramagnetic?", answer: "Yes; the superoxide ion has an odd electron" },
        { prompt: "Spin-only moment of a species with one unpaired electron?", answer: "\\(\\sqrt{3} = 1.73\\) BM" },
      ],
      pyqExampleId: "e0bd98a7-65b0-4ae8-bbe7-8ac8198280f4", // 2026 — pair with the same bond order, both paramagnetic
      traps: [
        {
          title: "O₂⁺ and O₂⁻ have the same number of unpaired electrons",
          body: "\\(\\mathrm{O_2^+}\\) has one π* electron and \\(\\mathrm{O_2^-}\\) has three, one of them unpaired. Both have exactly one unpaired electron, so any order that puts one above the other is false.",
        },
        {
          title: "N₂²⁻ looks like N₂ but behaves like O₂",
          body: "Adding two electrons to \\(\\mathrm{N_2}\\) gives 16, the count of \\(\\mathrm{O_2}\\). So \\(\\mathrm{N_2^{2-}}\\) has bond order 2 and two unpaired electrons: it is paramagnetic.",
        },
      ],
    },
  ],
};
