import type { SubtopicNote } from "@/app/notes/_types";

export const CONFIGURATION_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Orbital Energies and Electronic Configuration",
  title: "Orbital Energies and Electronic Configuration",
  oneLineDefinition:
    "In a many-electron atom orbital energy follows the (n + l) rule; in a one-electron atom it depends on n alone. Filling orbitals in that order gives the configuration, with Cr and Cu as the exceptions.",
  whyItMatters:
    "Twenty-two PYQs, nineteen of them multiple choice. Seven order the orbitals of a many-electron atom by the (n + l) rule; seven test one-electron atoms, where energy depends on n alone, and how an orbital's energy falls as Z rises; eight write configurations, count electrons by l or mₗ, or explain the extra stability of half-filled and filled subshells. Three ideas cover the page.",
  concepts: [
    // C1 — (n + l) rule
    {
      kind: "formula" as const,
      slug: "jcatom-n-plus-l",
      name: "The (n + l) rule in many-electron atoms",
      intuition:
        "In an atom with many electrons, inner electrons shield the outer ones. An s electron gets closer to the nucleus than a p or d electron of the same shell, so it is held more tightly. The \\((n+l)\\) rule captures this: lower \\(n+l\\) means lower energy, and a tie goes to the lower \\(n\\).",
      definition:
        "- Lower \\((n+l)\\) \\(\\Rightarrow\\) lower energy.\n" +
        "- Equal \\((n+l)\\): the lower \\(n\\) is lower in energy (3d below 4p; 3p below 4s).\n" +
        "- Filling order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, …\n" +
        "- Orbitals with the same \\(n\\) and \\(l\\) are **degenerate**. \\(m_l\\) and \\(m_s\\) do not change the energy without an external field.",
      formula: {
        label: "Order of orbital energy",
        latex: "E\\uparrow\\ \\text{with}\\ (n+l);\\quad \\text{tie}\\Rightarrow\\text{lower } n \\text{ first}",
      },
      authoredExample: {
        prompt: "Arrange 4f, 5d, 6s, 6p and 5p in order of increasing energy in a many-electron atom.",
        steps: [
          "\\(n+l\\): 4f \\(=7\\), 5d \\(=7\\), 6s \\(=6\\), 6p \\(=7\\), 5p \\(=6\\).",
          "Sum 6: 5p (\\(n=5\\)) before 6s (\\(n=6\\)).",
          "Sum 7: 4f, then 5d, then 6p, by increasing \\(n\\).",
        ],
        answer: "\\(5p<6s<4f<5d<6p\\).",
      },
      selfCheckExample: {
        prompt:
          "In a many-electron atom, which pair is degenerate? (a) \\(n=3, l=1, m_l=0\\) and \\(n=3, l=1, m_l=+1\\) (b) \\(n=3, l=1\\) and \\(n=3, l=2\\) (c) 4s and 3d",
        steps: [
          "Degenerate needs the same \\(n\\) and the same \\(l\\).",
          "Only (a) has both; \\(m_l\\) does not change the energy.",
        ],
        answer: "(a).",
      },
      practiceSet: [
        { prompt: "Many-electron atom: 4s or 3d, which is higher?", answer: "3d (\\(n+l=5\\) against 4)" },
        { prompt: "\\(n+l\\) for 5f?", answer: "8" },
        { prompt: "Lower in energy: 4p or 5s?", answer: "4p (both 5; lower \\(n\\))" },
        { prompt: "Does \\(m_s\\) change an orbital's energy without a field?", answer: "No" },
      ],
      pyqExampleId: "2ab3c312-7dcf-4a4b-b149-052fac2aec71", // 2026 — order five (n, l, m) orbitals by energy
      traps: [
        {
          title: "A tie goes to the lower n",
          body: "3d and 4p both have \\(n+l=5\\). 3d is lower because its \\(n\\) is smaller. Do not order a tie by \\(l\\).",
        },
        {
          title: "m does not enter",
          body: "Orbitals given as \\((n, l, m)\\) are ordered by \\(n\\) and \\(l\\) only. Two sets that differ only in \\(m_l\\) or \\(m_s\\) have the same energy.",
        },
      ],
    },

    // C2 — one-electron atoms and the effect of Z
    {
      kind: "formula" as const,
      slug: "jcatom-one-electron-energy",
      name: "One-electron atoms and the effect of Z",
      intuition:
        "With only one electron there is no shielding. The energy depends on \\(n\\) alone, as in Bohr's formula. So in hydrogen 3s, 3p and 3d have exactly the same energy, and 4s sits above 3d. Across atoms, a larger nuclear charge pulls every orbital lower.",
      definition:
        "- One-electron species (H, \\(\\mathrm{He^+}\\), \\(\\mathrm{Li^{2+}}\\)): \\(E_n=-13.6\\dfrac{Z^2}{n^2}\\ \\mathrm{eV}\\), independent of \\(l\\).\n" +
        "- Hydrogen order: \\(1s<2s=2p<3s=3p=3d<4s=4p=4d=4f\\).\n" +
        "- Shell \\(n\\) of hydrogen has \\(n^2\\) degenerate orbitals.\n" +
        "- A jump between degenerate orbitals (\\(2p_x\\to2p_y\\)) has \\(\\Delta E=0\\), so gives no line.\n" +
        "- The same subshell falls in energy as \\(Z\\) rises: 2s of Li lies below 2s of H.\n" +
        "- Size grows with \\(n\\): \\(2p_x\\) is smaller than \\(3p_x\\).",
      formula: {
        label: "One-electron energy",
        latex: "E_n=-13.6\\,\\frac{Z^2}{n^2}\\ \\mathrm{eV}\\quad(\\text{no } l \\text{ dependence})",
      },
      authoredExample: {
        prompt: "Arrange 3d, 4s, 3s and 2p of \\(\\mathrm{He^+}\\) by increasing energy.",
        steps: [
          "\\(\\mathrm{He^+}\\) has one electron, so energy depends on \\(n\\) only.",
          "\\(n=2\\): 2p. \\(n=3\\): 3s and 3d, equal. \\(n=4\\): 4s.",
        ],
        answer: "\\(2p<3s=3d<4s\\).",
      },
      selfCheckExample: {
        prompt: "True or false: the 2s orbital of hydrogen has higher energy than the 2s orbital of lithium.",
        steps: [
          "Lithium has \\(Z=3\\) against hydrogen's \\(Z=1\\).",
          "A larger nuclear charge holds the same subshell more tightly, so its energy is lower (more negative).",
        ],
        answer: "True.",
      },
      practiceSet: [
        { prompt: "In H, compare 3p and 3d.", answer: "Equal energy" },
        { prompt: "Does a \\(3p_x\\to3d_{xy}\\) jump in H give a line?", answer: "No, \\(\\Delta E=0\\)" },
        { prompt: "Degenerate orbitals in the \\(n=3\\) shell of H?", answer: "9" },
        { prompt: "Which is larger, \\(2p_x\\) or \\(3p_x\\)?", answer: "\\(3p_x\\)" },
      ],
      pyqExampleId: "6fe04040-19c7-402e-b8bc-29dabf9f20f1", // 2025 — lowest-energy orbitals of H among 4s, 3p, 3d, 4p
      traps: [
        {
          title: "Hydrogen does not follow Aufbau",
          body: "In H, 4s is above 3d and 2s equals 2p. The \\((n+l)\\) order applies only to atoms with more than one electron.",
        },
        {
          title: "Higher Z lowers the orbital",
          body: "\"Energies of orbitals in the same subshell increase with atomic number\" is false. They decrease, because the nucleus pulls harder.",
        },
      ],
    },

    // C3 — configurations, exceptions and counting
    {
      kind: "formula" as const,
      slug: "jcatom-configuration",
      name: "Configurations, exceptions and electron counts",
      intuition:
        "Fill orbitals in \\((n+l)\\) order, one electron per orbital with parallel spins before any pairing (Hund), and at most two per orbital (Pauli). Chromium and copper break the order to reach a half-filled or full 3d. Once the configuration is written, any count by \\(l\\), by \\(m_l\\), or by noble-gas match is just reading it.",
      definition:
        "- **Hund's rule**: in degenerate orbitals, electrons spread out with parallel spins before pairing.\n" +
        "- Exceptions: Cr \\([\\mathrm{Ar}]3d^54s^1\\), Cu \\([\\mathrm{Ar}]3d^{10}4s^1\\).\n" +
        "- Half-filled and filled subshells are extra stable: symmetry, larger **exchange energy** (possible only among degenerate orbitals), smaller repulsion and shielding.\n" +
        "- Electrons with a given \\(l\\): add all the s (\\(l=0\\)), p (\\(l=1\\)) or d (\\(l=2\\)) electrons.\n" +
        "- Each subshell has exactly one orbital with \\(m_l=0\\). A filled one needs two electrons.\n" +
        "- Noble-gas configuration: the ion's electron count is 2, 10, 18, 36, 54 or 86 and it matches that gas's configuration.",
      formula: {
        label: "Electrons in a subshell",
        latex: "N_{max}=2(2l+1)",
      },
      authoredExample: {
        prompt: "For copper (\\(Z=29\\)), how many electrons have \\(l=0\\) and how many have \\(l=2\\)?",
        steps: [
          "Cu is an exception: \\(1s^22s^22p^63s^23p^63d^{10}4s^1\\).",
          "\\(l=0\\): \\(2+2+2+1=7\\).",
          "\\(l=2\\): the 10 electrons of 3d.",
        ],
        answer: "7 and 10.",
      },
      selfCheckExample: {
        prompt:
          "How many of \\(\\mathrm{Ba^{2+}}\\) (\\(Z=56\\)), \\(\\mathrm{Zn^{2+}}\\) (\\(Z=30\\)), \\(\\mathrm{Br^-}\\) (\\(Z=35\\)) and \\(\\mathrm{Ti^{4+}}\\) (\\(Z=22\\)) have a noble-gas configuration?",
        steps: [
          "\\(\\mathrm{Ba^{2+}}\\): 54 electrons, Xe. Yes.",
          "\\(\\mathrm{Zn^{2+}}\\): 28 electrons, \\([\\mathrm{Ar}]3d^{10}\\). No.",
          "\\(\\mathrm{Br^-}\\): 36 electrons, Kr. Yes.",
          "\\(\\mathrm{Ti^{4+}}\\): 18 electrons, Ar. Yes.",
        ],
        answer: "3.",
      },
      practiceSet: [
        { prompt: "Unpaired electrons in Cr?", answer: "6" },
        { prompt: "Configuration of Cu?", answer: "\\([\\mathrm{Ar}]3d^{10}4s^1\\)" },
        { prompt: "Filled orbitals with \\(m_l=0\\) in Ne?", answer: "3 (1s, 2s, \\(2p_z\\))" },
        { prompt: "s electrons in \\(\\mathrm{K^+}\\)?", answer: "6" },
      ],
      pyqExampleId: "ad8d3a3a-b874-4f97-a105-35b6b98cefde", // 2025 — electrons of Cr with l = 1 and l = 2
      traps: [
        {
          title: "Exchange energy needs degenerate orbitals",
          body: "Extra stability comes from same-spin electrons exchanging among orbitals of equal energy. A statement placing them in non-degenerate orbitals is false.",
        },
        {
          title: "Half-filled is not filled",
          body: "When counting completely filled orbitals with \\(m_l=0\\), a p orbital holding one electron does not count. In Ge (\\(4p^2\\)) the 4p electrons fill no orbital.",
        },
      ],
    },
  ],
};
