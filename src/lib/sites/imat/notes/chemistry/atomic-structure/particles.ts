import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ATS_PARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Subatomic Particles and Ions",
  title: "Protons, Neutrons, Electrons and Ions",
  oneLineDefinition:
    "An atom is a tiny nucleus of protons and neutrons with electrons around it; the atomic number fixes the element, and an ion is an atom that has gained or lost electrons.",
  whyItMatters:
    "Counting the particles in an atom or ion is the most frequent task in this chapter: it was asked in 2011, 2012, 2016, 2017, 2019, 2020, 2022 and 2023, often with an ion, a polyatomic ion or a mass number written in algebra. The 2016 and 2018 papers asked which species share the same electron arrangement.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ats-particle-table",
      name: "The three subatomic particles: charge, mass and position",
      intuition:
        "Almost all of an atom's mass sits in a nucleus about a hundred thousand times smaller than the atom itself. The protons give the nucleus its positive charge, the neutrons add mass without charge, and the very light electrons fill the space around it. In a neutral atom the electrons exactly cancel the protons.",
      definition:
        "- The **atomic number** \\(Z\\) is the number of protons. It defines the element: every carbon atom has 6 protons.\n" +
        "- The **mass number** \\(A\\) is the number of protons plus neutrons (the **nucleons**).\n" +
        "- A **neutral atom** has as many electrons as protons.\n" +
        "- A nuclide is written \\({}^{A}_{Z}\\mathrm{X}\\), for example \\({}^{23}_{11}\\mathrm{Na}\\): 11 protons and 12 neutrons.\n" +
        "- In chemical reactions only electrons move. The nucleus (protons and neutrons) does not change.",
      table: {
        columns: ["Particle", "Relative charge", "Relative mass", "Where it is"],
        rows: [
          { cells: ["Proton", "+1", "1", "Nucleus"] },
          { cells: ["Neutron", "0", "1", "Nucleus"] },
          { cells: ["Electron", "−1", "About 1/1840 (almost zero)", "Shells (energy levels) around the nucleus"] },
        ],
        caption: "The proton and neutron masses are almost equal; the electron is about 1840 times lighter than either.",
      },
      selfCheckExample: {
        prompt: "Which statement about the particles in an atom is correct?",
        options: [
          "A neutron and an electron have about the same mass",
          "Almost all of the mass of an atom is in its nucleus",
          "Protons and electrons are both found in the nucleus",
          "A neutron carries a charge of +1",
          "The number of neutrons decides which element an atom is",
        ],
        steps: [
          "Protons and neutrons each have a relative mass of 1 and sit in the nucleus; electrons are about 1840 times lighter. So the nucleus holds almost all the mass: B is correct.",
          "A is wrong because the electron is far lighter than the neutron. C is wrong because electrons are outside the nucleus.",
          "D is wrong: the neutron is neutral. E is wrong: the number of protons (the atomic number) decides the element, not the neutrons.",
        ],
        answer: "(B) Almost all of the mass of an atom is in its nucleus",
      },
      practiceSet: [
        { prompt: "What decides which element an atom belongs to?", answer: "The number of protons (the atomic number)" },
        { prompt: "What is the charge on the nucleus of a magnesium atom (\\(Z = 12\\))?", answer: "+12", method: "12 protons, each +1; neutrons add no charge" },
        { prompt: "Why is a neutral atom uncharged?", answer: "It has equal numbers of protons and electrons, whose charges cancel" },
      ],
      traps: [
        {
          title: "Ions form by moving electrons, never protons",
          body: "A positive ion has MORE protons than electrons because it has lost electrons. It has not gained protons: the nucleus never changes in a chemical reaction. Options that explain a positive charge by extra protons, or by a difference between protons and neutrons, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-counting",
      name: "Counting protons, neutrons and electrons from a nuclide symbol",
      intuition:
        "The symbol \\({}^{A}_{Z}\\mathrm{X}^{q}\\) holds three numbers, and each particle comes from one simple subtraction. Neutrons are whatever the mass number has left after the protons. Electrons are the protons adjusted by the charge: a positive charge means electrons were removed, a negative charge means electrons were added.",
      definition:
        "For a particle written \\({}^{A}_{Z}\\mathrm{X}^{q}\\):\n" +
        "- **protons** \\(= Z\\)\n" +
        "- **neutrons** \\(= A - Z\\)\n" +
        "- **electrons** \\(= Z - q\\). For \\(q = +2\\) subtract 2; for \\(q = -2\\) add 2.\n" +
        "- For a **polyatomic ion**, add the atomic numbers of all its atoms, then apply the charge: \\(\\mathrm{OH^-}\\) has \\(8 + 1 + 1 = 10\\) electrons.\n" +
        "- The same rules work when \\(A\\) and \\(Z\\) are given in algebra: just subtract the expressions.",
      formula: {
        label: "Neutrons and electrons",
        latex: "N = A - Z \\qquad n_{e} = Z - q",
        symbols: [
          { symbol: "\\(A\\)", meaning: "mass number (protons + neutrons)" },
          { symbol: "\\(Z\\)", meaning: "atomic number (protons)" },
          { symbol: "\\(N\\)", meaning: "number of neutrons" },
          { symbol: "\\(q\\)", meaning: "charge on the particle, with its sign" },
          { symbol: "\\(n_e\\)", meaning: "number of electrons" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the numbers of protons, neutrons and electrons in \\({}^{37}_{17}\\mathrm{Cl}^{-}\\) and in \\({}^{27}_{13}\\mathrm{Al}^{3+}\\).",
        steps: [
          "Chloride: protons \\(= 17\\); neutrons \\(= 37 - 17 = 20\\); electrons \\(= 17 - (-1) = 18\\).",
          "Aluminium ion: protons \\(= 13\\); neutrons \\(= 27 - 13 = 14\\); electrons \\(= 13 - 3 = 10\\).",
          "The charge changes only the electron count. The protons and neutrons are those of the neutral atom.",
        ],
        answer: "Cl⁻: 17 p, 20 n, 18 e. Al³⁺: 13 p, 14 n, 10 e",
      },
      selfCheckExample: {
        prompt:
          "How many protons (p), neutrons (n) and electrons (e) are there in the ion \\({}^{138}_{56}\\mathrm{Ba}^{2+}\\)?",
        options: [
          "p = 56, n = 82, e = 58",
          "p = 56, n = 138, e = 54",
          "p = 82, n = 56, e = 54",
          "p = 56, n = 82, e = 54",
          "p = 54, n = 84, e = 54",
        ],
        steps: [
          "Protons \\(= Z = 56\\). Neutrons \\(= 138 - 56 = 82\\). Electrons \\(= 56 - 2 = 54\\).",
          "A adds the charge to the electrons instead of subtracting it. B uses the mass number as the neutron count.",
          "C swaps protons and neutrons. E changes the protons, but a charge never changes the nucleus.",
        ],
        answer: "(D) p = 56, n = 82, e = 54",
      },
      practiceSet: [
        {
          prompt: "An ion has atomic number \\(y\\), mass number \\(2y + 3\\) and a charge of \\(-1\\). Give its neutrons and electrons in terms of \\(y\\).",
          answer: "Neutrons \\(y + 3\\); electrons \\(y + 1\\)",
          method: "\\((2y + 3) - y\\), and \\(y - (-1)\\)",
        },
        { prompt: "Which has more neutrons: \\({}^{14}_{6}\\mathrm{C}\\) or \\({}^{14}_{7}\\mathrm{N}\\)?", answer: "Carbon-14 (8 against 7)", method: "\\(14 - 6\\) and \\(14 - 7\\)" },
        { prompt: "A particle has 20 protons, 20 neutrons and 18 electrons. Write its symbol.", answer: "\\({}^{40}_{20}\\mathrm{Ca}^{2+}\\)", method: "\\(A = 20 + 20\\); two more protons than electrons gives +2" },
        { prompt: "How many electrons are there in the hydroxonium ion \\(\\mathrm{H_3O^+}\\)?", answer: "10", method: "\\(8 + 3 \\times 1 - 1\\)" },
      ],
      traps: [
        {
          title: "Subtract a positive charge, add a negative one",
          body: "Electrons equal \\(Z - q\\). A 2+ ion has two FEWER electrons than protons, a 2− ion two MORE. Reversing the sign is the commonest slip, and IMAT always offers the reversed count as an option.",
        },
        {
          title: "The mass number is not the number of neutrons",
          body: "The mass number counts protons and neutrons together. The neutrons are \\(A - Z\\). An option equal to the mass number itself is there to catch students who skip the subtraction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-isoelectronic",
      name: "Isoelectronic species: the same number of electrons",
      intuition:
        "Electrons arrange themselves according to how many there are, not which nucleus they belong to. So any two particles with the same electron count have the same ground-state arrangement, even if one is an ion and the other a neutral atom. Count electrons for each particle and match the numbers.",
      definition:
        "Particles are **isoelectronic** when they have the same number of electrons, and so the same electron arrangement in their lowest energy state.\n" +
        "- The **10-electron set** (the arrangement of neon): \\(\\mathrm{N^{3-}}\\), \\(\\mathrm{O^{2-}}\\), \\(\\mathrm{F^-}\\), \\(\\mathrm{Ne}\\), \\(\\mathrm{Na^+}\\), \\(\\mathrm{Mg^{2+}}\\), \\(\\mathrm{Al^{3+}}\\).\n" +
        "- The **18-electron set** (the arrangement of argon): \\(\\mathrm{P^{3-}}\\), \\(\\mathrm{S^{2-}}\\), \\(\\mathrm{Cl^-}\\), \\(\\mathrm{Ar}\\), \\(\\mathrm{K^+}\\), \\(\\mathrm{Ca^{2+}}\\).\n" +
        "- Isoelectronic particles still differ in protons, so they differ in size and chemistry (see the Periodic Table chapter for ionic radius).",
      authoredExample: {
        prompt:
          "Which of these have the same electron arrangement as an argon atom (\\(Z = 18\\))? \\(\\mathrm{K^+}\\) (\\(Z = 19\\)), \\(\\mathrm{Ca^{2+}}\\) (\\(Z = 20\\)), \\(\\mathrm{Cl^-}\\) (\\(Z = 17\\)), \\(\\mathrm{S^{2-}}\\) (\\(Z = 16\\)), \\(\\mathrm{Na^+}\\) (\\(Z = 11\\)).",
        steps: [
          "Count electrons as \\(Z - q\\): \\(\\mathrm{K^+}\\) \\(19 - 1 = 18\\); \\(\\mathrm{Ca^{2+}}\\) \\(20 - 2 = 18\\); \\(\\mathrm{Cl^-}\\) \\(17 + 1 = 18\\); \\(\\mathrm{S^{2-}}\\) \\(16 + 2 = 18\\).",
          "\\(\\mathrm{Na^+}\\): \\(11 - 1 = 10\\), which matches neon, not argon.",
        ],
        answer: "\\(\\mathrm{K^+}\\), \\(\\mathrm{Ca^{2+}}\\), \\(\\mathrm{Cl^-}\\) and \\(\\mathrm{S^{2-}}\\), but not \\(\\mathrm{Na^+}\\)",
      },
      selfCheckExample: {
        prompt: "Which particle has the same number of electrons as a neon atom (\\(Z = 10\\))?",
        options: [
          "\\(\\mathrm{Al^{3+}}\\) (\\(Z = 13\\))",
          "\\(\\mathrm{Mg^{+}}\\) (\\(Z = 12\\))",
          "\\(\\mathrm{Cl^{-}}\\) (\\(Z = 17\\))",
          "\\(\\mathrm{K^{+}}\\) (\\(Z = 19\\))",
          "\\(\\mathrm{O^{-}}\\) (\\(Z = 8\\))",
        ],
        steps: [
          "\\(\\mathrm{Al^{3+}}\\): \\(13 - 3 = 10\\). This matches neon.",
          "\\(\\mathrm{Mg^+}\\) has 11 and \\(\\mathrm{O^-}\\) has 9: each is one electron away, because the usual ions are \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{O^{2-}}\\).",
          "\\(\\mathrm{Cl^-}\\) and \\(\\mathrm{K^+}\\) have 18, the argon arrangement.",
        ],
        answer: "(A) \\(\\mathrm{Al^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "Are \\(\\mathrm{F^-}\\) and \\(\\mathrm{Na^+}\\) isoelectronic?", answer: "Yes, both have 10 electrons" },
        { prompt: "Name a negative ion that is isoelectronic with \\(\\mathrm{Ca^{2+}}\\).", answer: "\\(\\mathrm{Cl^-}\\) (or \\(\\mathrm{S^{2-}}\\), \\(\\mathrm{P^{3-}}\\))", method: "\\(\\mathrm{Ca^{2+}}\\) has 18 electrons" },
        { prompt: "How many electrons does the hydroxide ion \\(\\mathrm{OH^-}\\) have, and which noble gas does it match?", answer: "10, neon", method: "\\(8 + 1 + 1\\)" },
      ],
      traps: [
        {
          title: "Isoelectronic does not mean identical",
          body: "\\(\\mathrm{O^{2-}}\\) and \\(\\mathrm{Na^+}\\) have the same 10 electrons in the same arrangement, but different numbers of protons and neutrons. Options saying two isoelectronic particles have the same number of protons, or the same size, are wrong.",
        },
        {
          title: "Two ions of the same element are not isoelectronic",
          body: "\\(\\mathrm{O^-}\\) and \\(\\mathrm{O^{2-}}\\) have the same nucleus but 9 and 10 electrons. Being the same element is a distractor: only the electron count matters.",
        },
      ],
    },
  ],
};
