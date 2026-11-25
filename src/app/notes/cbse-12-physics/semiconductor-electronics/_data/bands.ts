import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_SE_BANDS_NOTE: SubtopicNote = {
  subtopicName: "Classification of Metals, Conductors and Semiconductors",
  title: "Classification of Metals, Conductors and Semiconductors",
  oneLineDefinition:
    "How solids are sorted into metals, semiconductors and insulators: first by their resistivity, then by their energy bands and the size of the band gap Eg between the valence band and the conduction band.",
  whyItMatters:
    "11 questions. Nine were set in board papers from 2022 to 2025: draw and explain the band diagrams of a conductor, a semiconductor and an insulator (2022, 2024, 2025), why the forbidden gap of an insulator is large (2023), the band gap of silicon (2023), which of Pb, Ge, C and Si needs the most energy to free an electron (2023), which material conducts at room temperature (2025), why carbon is an insulator while silicon is a semiconductor (2025), and how heating changes the conductivity of copper and of silicon (2023). The textbook adds the order of the band gaps of C, Si and Ge, and why C is an insulator.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpse-energy-bands",
      name: "Energy bands: conductor, semiconductor and insulator",
      intuition:
        "In a single atom an electron can have only certain energies. When billions of atoms crowd together in a crystal, each of those energies spreads into a band. Electrons bound in bonds sit in the lower band, the valence band. To carry current an electron must reach the band above it, the conduction band. How hard that jump is, the size of the gap between the two bands, decides whether the solid is a metal, a semiconductor or an insulator.",
      definition:
        "- **Valence band:** the band that holds the energy levels of the valence electrons. With no outside energy, all valence electrons stay in it.\n" +
        "- **Conduction band:** the band above the valence band. Electrons in it are free to move and carry current.\n" +
        "- **Energy band gap:** the gap between the top of the valence band \\(E_V\\) and the bottom of the conduction band \\(E_C\\), so \\(E_g = E_C - E_V\\). No electron in the solid can have an energy inside it.\n" +
        "- **Si and Ge:** a crystal of N atoms has 4N valence electrons and 8N states. At the spacing of these crystals the 8N states split into two bands of 4N states each. At 0 K the lower one, the valence band, is completely full and the upper one, the conduction band, is completely empty.\n" +
        "- **Electron-hole pair:** in a semiconductor at room temperature, some valence electrons gain enough thermal energy to cross \\(E_g\\). Each one that crosses leaves a vacancy, a hole, in the valence band, so both bands can now carry current.\n" +
        "- **How to draw the three diagrams:** energy rises upward. Draw the valence band as a shaded block at the bottom and the conduction band as a block above it; label \\(E_V\\), \\(E_C\\) and the gap \\(E_g\\). For a metal draw the two blocks overlapping; for an insulator a wide gap with \\(E_g > 3\\) eV; for a semiconductor a narrow gap with \\(E_g < 3\\) eV.",
      table: {
        columns: ["Solid", "Band picture", "Band gap", "Why it does or does not conduct"],
        rows: [
          {
            cells: [
              "Metal (conductor)",
              "Conduction and valence bands overlap, or one band is only partly filled",
              "Zero",
              "Electrons move into empty levels with almost no energy, so a very large number are free to carry current",
            ],
          },
          {
            cells: [
              "Insulator",
              "Valence band full, conduction band empty, a wide gap between them",
              "More than 3 eV",
              "Thermal energy cannot lift electrons across the gap, so the conduction band stays empty and no current flows",
            ],
            pyqExampleId: "3884377c-d4b1-4189-b303-38316e980783",
            noteAmber: "Board 2023 asked, as assertion and reason, why the forbidden gap of an insulator is very large.",
          },
          {
            cells: [
              "Semiconductor",
              "Valence band full and conduction band empty at 0 K, a narrow gap between them",
              "Less than 3 eV (Si about 1.1 eV, Ge about 0.7 eV)",
              "At room temperature some electrons cross the gap and leave holes behind, so it conducts a little; at 0 K it behaves as an insulator",
            ],
          },
        ],
        caption: "The band picture is the same in kind for all three. Only the size of the gap changes.",
      },
      selfCheckExample: {
        prompt: "A solid has a band gap of 4.5 eV. Is it a metal, a semiconductor or an insulator? Give the reason.",
        steps: ["Compare the gap with 3 eV.", "4.5 eV is more than 3 eV, so thermal energy cannot lift electrons across it."],
        answer: "An insulator, because its band gap is more than 3 eV",
      },
      practiceSet: [
        { prompt: "Which band's electrons are free to move through a solid and carry current?", answer: "The conduction band" },
        { prompt: "How many states does each band hold in a Si crystal of N atoms?", answer: "4N states each: the valence band and the conduction band" },
        {
          prompt: "Why is a pure semiconductor an insulator at 0 K?",
          answer: "At 0 K the valence band is full and the conduction band empty, and there is no thermal energy to lift any electron across the gap",
        },
      ],
      pyqExampleId: "15116fb3-018c-485f-b39b-2d19ca277b16",
      traps: [
        {
          title: "Band diagrams without labels",
          body: "The diagram carries the marks. Mark the valence band, the conduction band, \\(E_V\\), \\(E_C\\) and the gap \\(E_g\\) on each one, and show the overlap for the metal. Three unlabelled pairs of boxes lose most of them.",
        },
        {
          title: "Leaving out the overlap case for a metal",
          body: "A metal conducts either because its bands overlap or because a band is only partly filled. Writing only 'the gap is small' describes a semiconductor, not a metal.",
        },
        {
          title: "Saying electrons sit in the band gap",
          body: "The gap is a range of energies no electron in the solid can have. Electrons are either in the valence band or in the conduction band.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-gap-values",
      name: "Band gaps of carbon, silicon, germanium and tin",
      intuition:
        "Carbon, silicon, germanium and tin are all in group IV and all have four valence electrons, yet carbon (diamond) is an insulator, Si and Ge are semiconductors and tin is a metal. The difference is how tightly the bonding electrons are held. The further the bonding electrons are from the nucleus, the less energy it takes to free one.",
      definition:
        "- C, Si and Ge have the same diamond-like lattice, with lattice spacings 3.56, 5.43 and 5.66 Å.\n" +
        "- Their four bonding electrons lie in the second, third and fourth orbit respectively. So the energy needed to take an electron out, \\(E_g\\), is highest for C, then Si, and least for Ge.\n" +
        "- Hence Ge and Si have a useful number of free electrons at room temperature, while C has almost none.\n" +
        "- Sn is also a group IV element, but its energy gap is 0 eV, so it is a metal.\n" +
        "- **Learn the numbers:** \\(E_g\\) is 5.4 eV for C (diamond), 1.1 eV for Si and 0.7 eV for Ge. They often appear together as wrong options, so keep them apart.",
      table: {
        columns: ["Element", "Band gap", "Bonding electrons in", "Class"],
        rows: [
          {
            cells: ["Carbon (diamond)", "5.4 eV", "Second orbit", "Insulator"],
          },
          {
            cells: ["Silicon", "1.1 eV", "Third orbit", "Semiconductor"],
            pyqExampleId: "66ad310f-8e56-4c4e-a0a5-9d84b6b743f7",
            noteAmber: "Board 2023 asked the energy an electron needs to jump the forbidden band in silicon: about 1.1 eV.",
          },
          { cells: ["Germanium", "0.7 eV", "Fourth orbit", "Semiconductor"] },
          {
            cells: ["Tin", "0 eV", "Fifth orbit", "Metal"],
            pyqExampleId: "08aa720c-88d4-41b5-96bd-11503e80139b",
            noteAmber: "Board 2025 asked which of Sn, mica, Si and C conducts at room temperature: tin.",
          },
        ],
        caption: "Same group, same four valence electrons: the band gap falls as the bonding electrons sit further out.",
      },
      selfCheckExample: {
        prompt: "Tin is in the same group as silicon. Why is tin a metal while silicon is a semiconductor?",
        steps: ["The band gap of tin is 0 eV, so its electrons need no energy to reach the conduction band.", "Silicon has a gap of about 1.1 eV, which only a few electrons can cross at room temperature."],
        answer: "Tin has no band gap, so it conducts like a metal; silicon has a small gap of about 1.1 eV",
      },
      practiceSet: [
        { prompt: "What is the band gap of germanium?", answer: "About 0.7 eV" },
        { prompt: "Arrange C, Si and Ge in order of increasing lattice spacing.", answer: "C (3.56 Å), Si (5.43 Å), Ge (5.66 Å)" },
        {
          prompt: "Why does germanium have more free electrons than carbon at room temperature?",
          answer: "Its bonding electrons are in the fourth orbit, further from the nucleus, so its band gap is much smaller (0.7 eV against 5.4 eV)",
        },
      ],
      pyqExampleId: "f7e7dbbe-5b0e-49f1-a3d7-eaec99f19fc6",
      traps: [
        {
          title: "Swapping the gaps of Si and Ge",
          body: "Silicon's gap is about 1.1 eV and germanium's about 0.7 eV. The 0.7 eV option is placed next to a silicon question on purpose.",
        },
        {
          title: "Explaining carbon with the lattice",
          body: "C, Si and Ge have the SAME lattice structure, so the lattice cannot be the reason. The reason is the orbit the bonding electrons are in: second for C, third for Si, fourth for Ge.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-metal-vs-semiconductor",
      name: "Resistivity and the effect of heating",
      intuition:
        "Resistivity alone sorts solids roughly: metals have very low values, insulators very high ones, and semiconductors sit in between. Heating then tells a metal from a semiconductor. A metal already has all the free electrons it will get, and heat only makes them collide more often. A semiconductor gains many new carriers when heated, so it conducts better.",
      definition:
        "- **Metals:** resistivity about \\(10^{-2}\\) to \\(10^{-8}\\ \\Omega\\) m, conductivity about \\(10^{2}\\) to \\(10^{8}\\) S m⁻¹.\n" +
        "- **Semiconductors:** resistivity about \\(10^{-5}\\) to \\(10^{6}\\ \\Omega\\) m, between metals and insulators.\n" +
        "- **Insulators:** resistivity about \\(10^{11}\\) to \\(10^{19}\\ \\Omega\\) m.\n" +
        "- These ranges show the size only, and resistivity is not the only test.\n" +
        "- **Heating a metal:** the number of free electrons stays the same, but the ions vibrate more and the electrons collide more often, so the resistivity rises and the conductivity falls.\n" +
        "- **Heating a semiconductor:** more covalent bonds break and the number of electrons and holes rises, so the conductivity rises and the resistivity falls.",
      table: {
        columns: ["Property", "Metal", "Semiconductor"],
        rows: [
          { cells: ["Resistivity", "\\(10^{-2}\\) to \\(10^{-8}\\ \\Omega\\) m", "\\(10^{-5}\\) to \\(10^{6}\\ \\Omega\\) m"] },
          { cells: ["Band gap", "Zero", "Less than 3 eV"] },
          { cells: ["Number of free carriers when heated", "Stays the same", "Rises steeply"] },
          { cells: ["Conductivity when heated", "Decreases", "Increases"] },
          { cells: ["Examples", "Copper, aluminium, tin", "Silicon, germanium, GaAs, CdS"] },
        ],
      },
      selfCheckExample: {
        prompt: "A material has a resistivity of \\(10^{3}\\ \\Omega\\) m. Is it a metal, a semiconductor or an insulator?",
        steps: ["Semiconductors have resistivity from about \\(10^{-5}\\) to \\(10^{6}\\ \\Omega\\) m.", "\\(10^{3}\\) lies in that range."],
        answer: "A semiconductor",
      },
      practiceSet: [
        { prompt: "What happens to the resistance of a germanium crystal when it is warmed?", answer: "It decreases, because more electron-hole pairs form" },
        { prompt: "A material has a resistivity of \\(10^{14}\\ \\Omega\\) m. Which class is it in?", answer: "An insulator" },
        { prompt: "Give one elemental and one compound semiconductor.", answer: "Si (or Ge), and GaAs (or CdS, InP)" },
      ],
      pyqExampleId: "6a5c8e4f-5ad0-4966-893e-1fe13da62b21",
      traps: [
        {
          title: "Giving both the same trend",
          body: "Heating LOWERS the conductivity of a metal but RAISES that of a semiconductor. The two opposite trends are the test the board uses to tell them apart.",
        },
        {
          title: "Saying a metal gets more free electrons when hot",
          body: "A metal's number of free electrons does not change with temperature. Only the collisions increase, which is why its conductivity falls.",
        },
      ],
    },
  ],
};
