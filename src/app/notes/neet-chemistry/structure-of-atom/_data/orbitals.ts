import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SA_ORBITALS_NOTE: SubtopicNote = {
  subtopicName: "Quantum Numbers and Orbitals",
  title: "Quantum Numbers and Orbitals",
  oneLineDefinition:
    "Why orbits gave way to orbitals, the four quantum numbers and what each one tells, the shapes and nodes of s, p and d orbitals, and how electrons fill orbitals by the (n + l) rule, Pauli's principle and Hund's rule.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. One asks how many values m can take for a given l (2023), one matches each quantum number to what it tells about an orbital (NEET 2024), one matches (n, l) pairs to orbital names (NEET 2026), one picks the incorrect statement about the shapes, sizes and energies of d orbitals (2022), one picks the wave function plot with two radial nodes (Re-NEET 2026), and one orders four electrons by energy from their quantum numbers (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchsa-quantum-numbers",
      name: "The four quantum numbers",
      intuition:
        "A moving electron also behaves as a wave, and its position and momentum cannot both be known exactly. So a sharp Bohr orbit cannot exist. Quantum mechanics instead gives orbitals: regions where the electron is likely to be found. Three quantum numbers label an orbital, like an address, and a fourth gives the electron's spin.",
      definition:
        "- **de Broglie**: a particle of mass m moving at speed v has a wavelength \\(\\lambda = \\dfrac{h}{mv}\\). This matters only for very small particles such as electrons.\n" +
        "- **Heisenberg's uncertainty principle**: \\(\\Delta x \\cdot \\Delta p \\geq \\dfrac{h}{4\\pi}\\), so position and momentum cannot both be known exactly.\n" +
        "- **Principal quantum number** n = 1, 2, 3 and so on: the shell. It decides the size of the orbital and, largely, its energy.\n" +
        "- **Azimuthal quantum number** l = 0 to (n − 1): the subshell, which decides the **shape**. l = 0, 1, 2, 3 are s, p, d, f.\n" +
        "- **Magnetic quantum number** \\(m_l\\) = −l to +l, which is 2l + 1 values: the **orientation** of the orbital. A subshell has 2l + 1 orbitals.\n" +
        "- **Spin quantum number** \\(m_s = +\\tfrac{1}{2}\\) or \\(-\\tfrac{1}{2}\\): the orientation of the electron's spin.\n" +
        "- A shell n has n subshells, \\(n^{2}\\) orbitals and at most \\(2n^{2}\\) electrons.",
      formula: {
        label: "Allowed values",
        latex: "l = 0, 1, \\ldots, (n - 1); \\quad m_l = -l, \\ldots, 0, \\ldots, +l\\ (2l + 1\\ \\text{values}); \\quad m_s = \\pm\\frac{1}{2}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "principal quantum number: shell, size" },
          { symbol: "\\(l\\)", meaning: "azimuthal quantum number: subshell, shape" },
          { symbol: "\\(m_l\\)", meaning: "magnetic quantum number: orientation of the orbital" },
          { symbol: "\\(m_s\\)", meaning: "spin quantum number: orientation of the spin" },
        ],
      },
      authoredExample: {
        prompt: "List the orbitals of the n = 3 shell. How many orbitals and how many electrons can the shell hold?",
        steps: [
          "l can be 0, 1 or 2: the 3s, 3p and 3d subshells.",
          "Orbitals: 3s has 1, 3p has 3, 3d has 5, a total of 9, which is \\(3^{2}\\).",
          "Each orbital holds 2 electrons, so the shell holds \\(2 \\times 9 = 18\\).",
        ],
        answer: "3s, 3p, 3d: 9 orbitals, 18 electrons",
      },
      selfCheckExample: {
        prompt: "Is the set n = 3, l = 3, \\(m_l = 0\\) allowed?",
        steps: [
          "For n = 3, l can only be 0, 1 or 2.",
          "l = 3 would need n of at least 4.",
        ],
        answer: "No: l cannot equal n",
      },
      practiceSet: [
        { prompt: "Write all the \\(m_l\\) values for l = 2.", answer: "−2, −1, 0, +1, +2" },
        { prompt: "How many electrons can the n = 4 shell hold?", answer: "32" },
        { prompt: "Name the orbital with n = 4 and l = 2.", answer: "4d" },
        { prompt: "Find the de Broglie wavelength of an electron (mass \\(9.1 \\times 10^{-31}\\) kg) moving at \\(1.0 \\times 10^{6}\\ \\text{m s}^{-1}\\), with \\(h = 6.6 \\times 10^{-34}\\) J s.", answer: "\\(7.25 \\times 10^{-10}\\) m" },
      ],
      pyqExampleId: "4000bf21-0b34-4ff2-9076-2287a2bb3d1e",
      traps: [
        {
          title: "l stops at n − 1",
          body: "l runs from 0 to n − 1, never up to n. So there is no 1p, 2d or 3f orbital.",
        },
        {
          title: "2l + 1 values, not 2l",
          body: "\\(m_l\\) includes zero, so l = 1 has 3 values and l = 2 has 5. A subshell then holds \\(2(2l + 1)\\) electrons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-nodes",
      name: "Shapes of orbitals and nodes",
      intuition:
        "An orbital is drawn as the surface inside which the electron is most likely to be found. Its shape comes from l and its size from n. Inside it there are places where the chance of finding the electron drops to zero: these are nodes. Some are spheres (radial nodes) and some are planes (angular nodes).",
      definition:
        "- **s orbitals** are spheres. **p orbitals** have two lobes on either side of the nucleus, along x, y or z. Four **d orbitals** (\\(d_{xy}\\), \\(d_{yz}\\), \\(d_{zx}\\), \\(d_{x^2-y^2}\\)) have four lobes each; the fifth, \\(d_{z^2}\\), has a different shape.\n" +
        "- Orbitals with the same l have the same shape in every shell, but they grow in size as n rises: 4d orbitals are shaped like 3d orbitals and are larger.\n" +
        "- The five d orbitals of one subshell have the same energy in a free atom: they are **degenerate**.\n" +
        "- **Radial nodes** = n − l − 1. **Angular nodes** = l. **Total nodes** = n − 1.\n" +
        "- On a plot of the wave function against distance r, each radial node is a point where the curve crosses the axis (away from the nucleus).",
      formula: {
        label: "Number of nodes",
        latex: "\\text{radial} = n - l - 1, \\qquad \\text{angular} = l, \\qquad \\text{total} = n - 1",
      },
      authoredExample: {
        prompt: "Find the radial and angular nodes of a 3p orbital and of a 4d orbital.",
        steps: [
          "3p: n = 3, l = 1. Radial = 3 − 1 − 1 = 1; angular = 1.",
          "4d: n = 4, l = 2. Radial = 4 − 2 − 1 = 1; angular = 2.",
          "Check with the totals: 3p has 2 = n − 1, and 4d has 3 = n − 1.",
        ],
        answer: "3p: 1 radial, 1 angular. 4d: 1 radial, 2 angular",
      },
      selfCheckExample: {
        prompt: "Which of 3p, 4p and 4d has two radial nodes and one angular node?",
        steps: [
          "One angular node means l = 1, a p orbital.",
          "Two radial nodes: n − 1 − 1 = 2, so n = 4.",
        ],
        answer: "4p",
      },
      practiceSet: [
        { prompt: "How many radial nodes does a 3s orbital have?", answer: "2" },
        { prompt: "How many nodes in all does a 5f orbital have?", answer: "4" },
        { prompt: "How many angular nodes does any p orbital have?", answer: "1" },
        { prompt: "What is the shape of the boundary surface of an s orbital?", answer: "A sphere" },
      ],
      pyqExampleId: "e4f1f8cc-e244-4214-9ee9-c18ee932c512",
      traps: [
        {
          title: "Radial nodes subtract one more",
          body: "Radial nodes are n − l − 1, not n − l. A 2s orbital has 1 radial node and a 2p orbital has none.",
        },
        {
          title: "d z-squared is the odd one out",
          body: "\\(d_{x^2-y^2}\\) has four lobes like \\(d_{xy}\\), \\(d_{yz}\\) and \\(d_{zx}\\). Only \\(d_{z^2}\\) has a different shape, yet all five have the same energy in a free atom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-filling",
      name: "Filling orbitals: the (n + l) rule, Pauli and Hund",
      visualizationSlug: "imat-aufbau-filling",
      intuition:
        "Electrons go into the lowest energy orbital first, like filling a building from the ground floor. In atoms with many electrons the order is not simply by n: a 4s orbital is lower than 3d. The (n + l) rule gives the order, Pauli's principle limits each orbital to two electrons, and Hund's rule says how they spread over orbitals of equal energy.",
      definition:
        "- In hydrogen, orbital energy depends on n alone (3s = 3p = 3d). In atoms with many electrons it depends on n and l.\n" +
        "- **(n + l) rule**: the lower the value of n + l, the lower the energy. When two orbitals have the same n + l, the one with the lower n is lower in energy.\n" +
        "- **Aufbau principle**: orbitals fill in order of increasing energy: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p.\n" +
        "- **Pauli exclusion principle**: no two electrons in an atom can have the same set of four quantum numbers. So an orbital holds at most two electrons, with opposite spins.\n" +
        "- **Hund's rule**: in orbitals of the same subshell, electrons do not pair until each orbital has one electron.\n" +
        "- **Half-filled and full subshells** are extra stable (a symmetrical arrangement and larger exchange energy). So Cr is \\([\\text{Ar}]\\,3d^{5}4s^{1}\\) and Cu is \\([\\text{Ar}]\\,3d^{10}4s^{1}\\).",
      formula: {
        label: "Order of orbital energy",
        latex: "\\text{lower } (n + l) \\Rightarrow \\text{lower energy}; \\quad \\text{same } (n + l) \\Rightarrow \\text{lower } n \\text{ is lower}",
      },
      authoredExample: {
        prompt: "Write the electronic configuration of chromium (Z = 24).",
        steps: [
          "Filling in order: \\(1s^{2}\\,2s^{2}\\,2p^{6}\\,3s^{2}\\,3p^{6}\\) holds 18 electrons, the argon core. 6 electrons are left.",
          "The order alone would give \\(4s^{2}\\,3d^{4}\\).",
          "A half-filled 3d subshell is more stable, so one 4s electron moves to 3d.",
        ],
        answer: "\\([\\text{Ar}]\\,3d^{5}4s^{1}\\)",
      },
      selfCheckExample: {
        prompt: "How many unpaired electrons does a nitrogen atom (Z = 7) have?",
        steps: [
          "Configuration: \\(1s^{2}\\,2s^{2}\\,2p^{3}\\).",
          "By Hund's rule the three 2p electrons go one into each 2p orbital before any pairing.",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "In an atom with many electrons, which fills first, 4s or 3d, and why?", answer: "4s: its n + l is 4, against 5 for 3d" },
        { prompt: "Write the electronic configuration of copper (Z = 29).", answer: "\\([\\text{Ar}]\\,3d^{10}4s^{1}\\)" },
        { prompt: "What is the largest number of electrons one orbital can hold, and how must their spins be?", answer: "Two, with opposite spins" },
        { prompt: "How many unpaired electrons does an iron atom (Z = 26) have?", answer: "4 (\\(3d^{6}\\))" },
      ],
      pyqExampleId: "ac42313b-517f-4377-8fe0-999b6de1aabc",
      traps: [
        {
          title: "A tie in n + l goes to the lower n",
          body: "3d and 4p both have n + l = 5. 3d is lower because its n is smaller. Ordering a tie by l instead gives the wrong order.",
        },
        {
          title: "Chromium and copper break the order",
          body: "Cr is \\(3d^{5}4s^{1}\\), not \\(3d^{4}4s^{2}\\), and Cu is \\(3d^{10}4s^{1}\\), not \\(3d^{9}4s^{2}\\). A half-filled or full d subshell is more stable.",
        },
        {
          title: "Spread out before pairing",
          body: "Hund's rule fills each orbital of a subshell singly before any gets a second electron. \\(2p^{3}\\) has three unpaired electrons, not one pair and one single.",
        },
      ],
    },
  ],
};
