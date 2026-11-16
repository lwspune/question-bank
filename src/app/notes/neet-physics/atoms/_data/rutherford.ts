import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AT_RUTHERFORD_NOTE: SubtopicNote = {
  subtopicName: "Rutherford's Nuclear Model",
  title: "Rutherford's Nuclear Model",
  oneLineDefinition:
    "Alpha particles fired at a thin gold foil showed that an atom's positive charge and nearly all its mass sit in a tiny nucleus, with electrons circling it, held by the Coulomb pull.",
  whyItMatters:
    "Three NEET questions, from NEET 2024, NEET 2026 and Re-NEET 2026. One asks which graph shows how the number of scattered alpha particles changes with the scattering angle. One asks how far the electron is from the nucleus when its energy is −3.4 eV. One tests two statements: that atoms are neutral, and that every atom is stable.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphat-scattering",
      name: "Alpha-particle scattering and the distance of closest approach",
      intuition:
        "Geiger and Marsden fired a beam of alpha particles at a very thin gold foil and counted how many came out at each angle. Almost all went straight through. A very few were turned through large angles, and some came almost straight back. A spread-out positive charge could never push an alpha back like that. Rutherford explained it: all the positive charge and nearly all the mass of the atom sit in a tiny nucleus, and the rest of the atom is empty space. An alpha aimed straight at the nucleus slows down as it climbs the electric hill and stops where all its kinetic energy has turned into potential energy. That turning point is the distance of closest approach.",
      definition:
        "- **What was seen:** most alpha particles passed through with almost no deflection. Only about 0.14% were turned by more than 1°, and about 1 in 8000 by more than 90°.\n" +
        "- **The number scattered falls very steeply as the angle grows.** It is largest at small angles and very small near 180°.\n" +
        "- **What it means:** the positive charge and nearly all the mass are in a nucleus about \\(10^{-15}\\) m to \\(10^{-14}\\) m across, while the atom is about \\(10^{-10}\\) m across. Most of the atom is empty space.\n" +
        "- **Impact parameter b:** the perpendicular distance of the alpha particle's starting line of motion from the centre of the nucleus. A small b gives a large deflection. b = 0 is a head-on approach, and the alpha comes straight back (180°).\n" +
        "- **Closest approach (head-on):** the alpha has charge 2e and the nucleus Ze. At the turning point \\(K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{(2e)(Ze)}{d}\\).\n" +
        "- So \\(d \\propto \\dfrac{Z}{K}\\). Since \\(K = \\dfrac{1}{2}mv^{2}\\), d also goes as \\(\\dfrac{1}{v^{2}}\\) for a given particle.\n" +
        "- A handy value: \\(\\dfrac{e^{2}}{4\\pi\\varepsilon_0} = 1.44\\) MeV fm, where 1 fm = \\(10^{-15}\\) m.",
      formula: {
        label: "Distance of closest approach",
        latex: "d = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{2Ze^{2}}{K}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance of closest approach for a head-on alpha particle" },
          { symbol: "\\(Z\\)", meaning: "atomic number of the target nucleus" },
          { symbol: "\\(K\\)", meaning: "kinetic energy of the alpha particle far away" },
        ],
      },
      authoredExample: {
        prompt:
          "An alpha particle of kinetic energy 4 MeV heads straight for a gold nucleus (Z = 79). Find the distance of closest approach. What would it be for an 8 MeV alpha particle? Use \\(\\dfrac{e^{2}}{4\\pi\\varepsilon_0} = 1.44\\) MeV fm.",
        steps: [
          "\\(d = \\dfrac{2Z \\times 1.44\\ \\text{MeV fm}}{K} = \\dfrac{2 \\times 79 \\times 1.44}{4}\\) fm.",
          "\\(d = \\dfrac{227.5}{4} \\approx 56.9\\) fm, about \\(5.7 \\times 10^{-14}\\) m.",
          "\\(d \\propto \\dfrac{1}{K}\\): doubling the energy halves it, to about \\(2.8 \\times 10^{-14}\\) m.",
        ],
        answer: "About \\(5.7 \\times 10^{-14}\\) m; about \\(2.8 \\times 10^{-14}\\) m at 8 MeV",
      },
      selfCheckExample: {
        prompt:
          "Alpha particles aimed head-on at a nucleus have a distance of closest approach d. Their speed is now doubled. What is the new distance of closest approach?",
        steps: [
          "\\(K = \\dfrac{1}{2}mv^{2}\\), so doubling v makes K four times as large.",
          "\\(d \\propto \\dfrac{1}{K}\\), so d becomes \\(\\dfrac{d}{4}\\).",
        ],
        answer: "\\(\\dfrac{d}{4}\\)",
      },
      practiceSet: [
        { prompt: "Why do most alpha particles pass through a thin gold foil with almost no deflection?", answer: "Most of the atom is empty space and the nucleus is tiny." },
        { prompt: "In the Geiger-Marsden experiment, roughly how many alpha particles were turned through more than 90°?", answer: "About 1 in 8000" },
        { prompt: "What impact parameter makes an alpha particle come straight back along its path?", answer: "Zero: a head-on approach" },
        { prompt: "Alpha particles of the same energy are aimed head-on at nuclei with Z = 20 and Z = 80. Ratio of their distances of closest approach?", answer: "1 : 4" },
        { prompt: "An alpha particle and a proton have the same kinetic energy and head straight for the same nucleus. Ratio of their distances of closest approach?", answer: "2 : 1 (the alpha has twice the charge)" },
      ],
      pyqExampleId: "1b53cb1a-ad1e-425b-a6c1-1f9650f6b8a5",
      traps: [
        {
          title: "The alpha particle carries charge 2e",
          body: "The potential energy at closest approach is \\(\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{(2e)(Ze)}{d}\\). Writing \\(Ze^{2}\\) without the 2 halves the answer, and the halved value is often an option.",
        },
        {
          title: "Rare rebounds are not caused by faster alpha particles",
          body: "All the alpha particles in the beam have the same energy. Only a few bounce back because the nucleus is tiny, so only a few come in nearly head-on.",
        },
        {
          title: "Closest approach goes as 1/v², not 1/v",
          body: "\\(d \\propto \\dfrac{1}{K}\\) and \\(K = \\dfrac{1}{2}mv^{2}\\). Doubling the speed cuts d to a quarter, not a half.",
        },
        {
          title: "The count falls with angle, it does not rise",
          body: "Most alpha particles are scattered through small angles. The number scattered drops very sharply as the angle grows towards 180°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphat-electron-orbits",
      name: "Electron orbits in Rutherford's model",
      intuition:
        "In Rutherford's model the electrons circle the nucleus like planets round the Sun. The Coulomb pull of the nucleus supplies the centripetal force. Work it out and the kinetic energy comes to half the size of the potential energy, so the total energy is negative: the electron is bound, and it takes energy to pull it free. But the model has a deep flaw. A circling electron is accelerating, and an accelerating charge gives out light. It should lose energy, spiral into the nucleus and give a continuous spread of colours. Real atoms do not collapse, and they give sharp lines. Bohr's model, on the next page, was built to fix this.",
      definition:
        "- **Atoms are electrically neutral:** the nucleus carries charge +Ze and the Z electrons carry −Ze in all.\n" +
        "- **Force balance in hydrogen:** \\(\\dfrac{mv^{2}}{r} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^{2}}{r^{2}}\\).\n" +
        "- **Kinetic energy:** \\(K = \\dfrac{e^{2}}{8\\pi\\varepsilon_0 r}\\). **Potential energy:** \\(U = -\\dfrac{e^{2}}{4\\pi\\varepsilon_0 r}\\).\n" +
        "- **Total energy:** \\(E = K + U = -\\dfrac{e^{2}}{8\\pi\\varepsilon_0 r}\\). So \\(K = -E\\) and \\(U = 2E\\).\n" +
        "- A negative total energy means the electron is bound. Giving it energy \\(|E|\\) sets it free.\n" +
        "- Turned round, the orbit radius from the energy is \\(r = \\dfrac{e^{2}}{8\\pi\\varepsilon_0 |E|}\\): a smaller orbit has a more negative energy.\n" +
        "- **Where the model fails:** an orbiting electron accelerates, so by classical physics it radiates energy, spirals into the nucleus, and gives a continuous spectrum. It cannot explain why atoms are stable or why they give line spectra.",
      formula: {
        label: "Energy of an orbiting electron",
        latex: "K = \\frac{e^{2}}{8\\pi\\varepsilon_0 r}, \\qquad U = -\\frac{e^{2}}{4\\pi\\varepsilon_0 r}, \\qquad E = -\\frac{e^{2}}{8\\pi\\varepsilon_0 r}",
      },
      authoredExample: {
        prompt:
          "The electron of a hydrogen atom circles the nucleus at a radius of \\(5.3 \\times 10^{-11}\\) m. Find its speed and its kinetic, potential and total energy in eV. Take \\(\\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\) N m²/C², \\(e = 1.6 \\times 10^{-19}\\) C and \\(m = 9.1 \\times 10^{-31}\\) kg.",
        steps: [
          "Force balance: \\(v^{2} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^{2}}{mr} = \\dfrac{9 \\times 10^{9} \\times (1.6 \\times 10^{-19})^{2}}{9.1 \\times 10^{-31} \\times 5.3 \\times 10^{-11}} \\approx 4.78 \\times 10^{12}\\), so \\(v \\approx 2.2 \\times 10^{6}\\) m/s.",
          "\\(K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{e^{2}}{2r} = \\dfrac{2.30 \\times 10^{-28}}{1.06 \\times 10^{-10}} \\approx 2.17 \\times 10^{-18}\\) J, which is about 13.6 eV.",
          "\\(U = -2K \\approx -27.2\\) eV and \\(E = K + U \\approx -13.6\\) eV.",
        ],
        answer: "About \\(2.2 \\times 10^{6}\\) m/s; K = 13.6 eV, U = −27.2 eV, E = −13.6 eV",
      },
      selfCheckExample: {
        prompt:
          "The potential energy of the electron in an atom is −10.2 eV. What are its kinetic energy and its total energy?",
        steps: [
          "\\(U = 2E\\), so \\(E = \\dfrac{-10.2}{2} = -5.1\\) eV.",
          "\\(K = -E = 5.1\\) eV.",
        ],
        answer: "K = 5.1 eV and E = −5.1 eV",
      },
      practiceSet: [
        { prompt: "Why is the total energy of the electron in an atom negative?", answer: "The electron is bound to the nucleus." },
        { prompt: "The total energy of the electron in an atom is −1.51 eV. What is its kinetic energy?", answer: "1.51 eV" },
        { prompt: "By classical physics, why should the electron in Rutherford's model spiral into the nucleus?", answer: "It accelerates as it circles, so it radiates energy." },
        { prompt: "What kind of spectrum should a Rutherford atom give, by classical physics?", answer: "A continuous spectrum, not lines" },
        { prompt: "A neutral atom has 11 electrons. What is the charge on its nucleus?", answer: "+11e" },
      ],
      pyqExampleId: "6116a276-aa51-45f9-b1b0-c6f0c000e51d",
      traps: [
        {
          title: "Kinetic energy is minus the total energy",
          body: "The kinetic energy is positive and equal in size to the total energy: \\(K = -E\\). An electron with E = −3.4 eV has K = +3.4 eV, not −3.4 eV.",
        },
        {
          title: "Potential energy is twice the total energy",
          body: "\\(U = 2E\\). When E = −3.4 eV, the potential energy is −6.8 eV, not −3.4 eV.",
        },
        {
          title: "Not every atom is stable",
          body: "Atoms are neutral, but a statement that the atoms of every element are stable is false: the nuclei of radioactive elements break up on their own.",
        },
        {
          title: "Rutherford's model cannot explain line spectra",
          body: "It explains the nucleus, but by classical physics its electron should spiral inwards and give a continuous spectrum. Stability and sharp spectral lines need Bohr's model.",
        },
      ],
    },
  ],
};
