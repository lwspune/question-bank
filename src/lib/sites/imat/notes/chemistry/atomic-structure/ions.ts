import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ATS_IONS_NOTE: SubtopicNote = {
  subtopicName: "Configurations of Ions",
  title: "Electron Configurations of Ions and Valence Electrons",
  oneLineDefinition:
    "An ion's configuration comes from adding or removing electrons at the outermost shell of the atom; most main-group ions end up with eight electrons in their outer shell.",
  whyItMatters:
    "Ion configurations were asked in 2015, 2017 and 2021, each time as five configurations to choose from. The 2026 ministry paper asked about the outer shell of Mg²⁺ and the valence electrons of Cl⁻.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ats-ion-configurations",
      name: "Writing the electron configuration of an ion",
      intuition:
        "First count the electrons the ion really has, then write the configuration as you would for any atom with that many electrons. For a positive ion, the electrons that leave are the outermost ones, the ones furthest from the nucleus. In a transition metal the 4s electrons are outermost, so they leave before the 3d ones, even though 4s filled first.",
      definition:
        "- **Negative ions**: add the extra electrons into the next available orbitals. \\(\\mathrm{N^{3-}}\\) (\\(7 + 3 = 10\\) electrons) is \\(1s^2\\,2s^2\\,2p^6\\).\n" +
        "- **Positive main-group ions**: remove electrons from the highest shell. \\(\\mathrm{Ca^{2+}}\\) loses both 4s electrons.\n" +
        "- **Transition-metal ions**: remove the **4s electrons first**, then 3d. \\(\\mathrm{Fe^{2+}}\\) is \\([\\mathrm{Ar}]\\,3d^6\\), not \\([\\mathrm{Ar}]\\,3d^4\\,4s^2\\).\n" +
        "- Always check: the superscripts must add up to \\(Z - q\\).",
      authoredExample: {
        prompt:
          "Write the ground-state configurations of \\(\\mathrm{Ca^{2+}}\\) (\\(Z = 20\\)), \\(\\mathrm{N^{3-}}\\) (\\(Z = 7\\)) and \\(\\mathrm{Fe^{2+}}\\) (\\(Z = 26\\)).",
        steps: [
          "Calcium atom: \\([\\mathrm{Ar}]\\,4s^2\\). Removing the two 4s electrons leaves 18: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\), the argon arrangement.",
          "Nitrogen atom: \\(1s^2\\,2s^2\\,2p^3\\). Adding three electrons fills 2p: \\(1s^2\\,2s^2\\,2p^6\\), the neon arrangement.",
          "Iron atom: \\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\). The two 4s electrons leave first: \\([\\mathrm{Ar}]\\,3d^6\\). Check: \\(18 + 6 = 24 = 26 - 2\\).",
        ],
        answer: "\\(\\mathrm{Ca^{2+}}\\): \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\). \\(\\mathrm{N^{3-}}\\): \\(1s^2\\,2s^2\\,2p^6\\). \\(\\mathrm{Fe^{2+}}\\): \\([\\mathrm{Ar}]\\,3d^6\\)",
      },
      selfCheckExample: {
        prompt: "What is the ground-state electron configuration of the \\(\\mathrm{Fe^{3+}}\\) ion? (Fe: \\(Z = 26\\))",
        options: [
          "\\([\\mathrm{Ar}]\\,3d^3\\,4s^2\\)",
          "\\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\)",
          "\\([\\mathrm{Ar}]\\,3d^4\\,4s^1\\)",
          "\\([\\mathrm{Ar}]\\,3d^8\\)",
          "\\([\\mathrm{Ar}]\\,3d^5\\)",
        ],
        steps: [
          "\\(\\mathrm{Fe^{3+}}\\) has \\(26 - 3 = 23\\) electrons. From \\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\), remove both 4s electrons and then one 3d electron: \\([\\mathrm{Ar}]\\,3d^5\\).",
          "A removes the electrons from 3d instead of 4s. B is the neutral atom. C removes one from each subshell.",
          "D has 26 electrons: it moved electrons around but removed none.",
        ],
        answer: "(E) \\([\\mathrm{Ar}]\\,3d^5\\)",
      },
      practiceSet: [
        { prompt: "Write the configuration of \\(\\mathrm{S^{2-}}\\) (\\(Z = 16\\)).", answer: "\\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\)", method: "18 electrons" },
        { prompt: "Write the configuration of \\(\\mathrm{Zn^{2+}}\\) (\\(Z = 30\\)).", answer: "\\([\\mathrm{Ar}]\\,3d^{10}\\)", method: "Zinc is \\([\\mathrm{Ar}]\\,3d^{10}\\,4s^2\\); lose the 4s pair" },
        { prompt: "Write the configuration of \\(\\mathrm{Li^+}\\) (\\(Z = 3\\)).", answer: "\\(1s^2\\)", method: "2 electrons, the helium arrangement" },
        { prompt: "Write the configuration of \\(\\mathrm{Mg^{+}}\\) (\\(Z = 12\\)).", answer: "\\(1s^2\\,2s^2\\,2p^6\\,3s^1\\)", method: "11 electrons: only one 3s electron removed" },
      ],
      traps: [
        {
          title: "Transition metals lose 4s electrons before 3d",
          body: "4s fills before 3d, but once 3d holds electrons the 4s electrons are the outermost ones, and they leave first. \\(\\mathrm{Fe^{2+}}\\) is \\([\\mathrm{Ar}]\\,3d^6\\) and \\(\\mathrm{Cu^{2+}}\\) is \\([\\mathrm{Ar}]\\,3d^9\\). An option that keeps 4s electrons in such an ion is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-valence-electrons",
      name: "Valence electrons and the outer shell of an ion",
      intuition:
        "Valence electrons are the ones in the outermost shell, the ones that take part in bonding. A metal atom that loses its valence electrons is left with the full shell underneath as its new outer shell. A non-metal that gains electrons fills its outer shell. Either way, a main-group ion usually ends with eight outer electrons, like a noble gas.",
      definition:
        "- **Valence electrons** are the electrons in the shell with the highest \\(n\\).\n" +
        "- For main-group atoms, the number of valence electrons is set by the group: groups 1 and 2 have 1 and 2; groups 13 to 17 have 3 to 7; group 18 has 8 (helium 2).\n" +
        "- Main-group ions usually have a full outer shell of **8 electrons** (an octet): \\(\\mathrm{Na^+}\\), \\(\\mathrm{Mg^{2+}}\\), \\(\\mathrm{Cl^-}\\), \\(\\mathrm{O^{2-}}\\).\n" +
        "- Ions with the helium arrangement have **2**: \\(\\mathrm{H^-}\\), \\(\\mathrm{Li^+}\\), \\(\\mathrm{Be^{2+}}\\).\n" +
        "- Losing a whole shell is why a cation is smaller than its atom (see the Periodic Table chapter).",
      authoredExample: {
        prompt:
          "Compare the outer shell of a sulfur atom (\\(Z = 16\\)) with that of \\(\\mathrm{S^{2-}}\\), and the outer shell of a magnesium atom (\\(Z = 12\\)) with that of \\(\\mathrm{Mg^{2+}}\\).",
        steps: [
          "Sulfur: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^4\\). The outer shell is \\(n = 3\\) with \\(2 + 4 = 6\\) electrons.",
          "\\(\\mathrm{S^{2-}}\\): two more electrons go into 3p, giving \\(3s^2\\,3p^6\\): 8 outer electrons in the same shell.",
          "Magnesium: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\). Outer shell \\(n = 3\\) with 2 electrons.",
          "\\(\\mathrm{Mg^{2+}}\\) loses both 3s electrons. Shell 3 is now empty, so the outer shell is \\(n = 2\\), with \\(2 + 6 = 8\\) electrons.",
        ],
        answer: "S has 6, \\(\\mathrm{S^{2-}}\\) has 8 (both in shell 3). Mg has 2 (shell 3); \\(\\mathrm{Mg^{2+}}\\) has 8 (shell 2)",
      },
      selfCheckExample: {
        prompt: "How many electrons are in the outermost shell of the \\(\\mathrm{Al^{3+}}\\) ion? (Al: \\(Z = 13\\))",
        options: ["3", "8", "0", "10", "13"],
        steps: [
          "Aluminium is \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^1\\). The 3+ ion loses all three shell-3 electrons.",
          "The outermost shell is now \\(n = 2\\): \\(2s^2\\,2p^6\\), 8 electrons.",
          "A is the atom's valence count. C treats the empty shell 3 as the outer shell. D is the total number of electrons in the ion, and E the atom's.",
        ],
        answer: "(B) 8",
      },
      practiceSet: [
        { prompt: "How many valence electrons does a phosphorus atom (\\(Z = 15\\)) have?", answer: "5", method: "\\(3s^2\\,3p^3\\)" },
        { prompt: "How many electrons are in the outer shell of \\(\\mathrm{Li^+}\\)?", answer: "2", method: "\\(1s^2\\), the helium arrangement" },
        { prompt: "How many electrons are in the outer shell of \\(\\mathrm{K^+}\\) (\\(Z = 19\\))?", answer: "8", method: "\\(3s^2\\,3p^6\\) after the 4s electron leaves" },
      ],
      traps: [
        {
          title: "An anion's valence electrons are not its group number",
          body: "A halogen atom has 7 valence electrons, but its 1− ion has 8: the extra electron joins the same outer shell. Options giving 7, or giving the total number of electrons, are the usual traps.",
        },
        {
          title: "A cation with no electrons left in its old outer shell still has an outer shell",
          body: "When \\(\\mathrm{Mg}\\) becomes \\(\\mathrm{Mg^{2+}}\\), shell 3 is empty and shell 2 becomes the outer shell, with 8 electrons. The ion has the same protons and neutrons as the atom, two fewer electrons, and a smaller radius.",
        },
      ],
    },
  ],
};
