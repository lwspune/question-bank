import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_ACTINOIDS_NOTE: SubtopicNote = {
  subtopicName: "Actinoids",
  title: "Actinoids, Post-Actinoids, and Lanthanoids Compared",
  oneLineDefinition:
    "The actinoid series, its configuration and oxidation states, the transuranium and post-actinoid elements, the uses of thorium and uranium, and the similarities and differences between lanthanoids and actinoids.",
  whyItMatters:
    "11 questions. Seven were set in board papers: the differences between lanthanoids and actinoids (2016, 2023 and 2025), two similarities and two differences (2026), the atomic numbers of the transuranium elements (2024), the series in which every element is radioactive (2025), and the range of the post-actinoid elements (2026). The textbook adds thorium's natural occurrence and magnetism, and the +2 state of nobelium.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscctr-ac-series",
      name: "The actinoid series and the elements after it",
      intuition:
        "The actinoids are the 5f row at the very bottom of the table. Unlike the lanthanoids, their 5f, 6d and 7s levels are so close in energy that the early members can give up all their outer electrons, so they show high oxidation states like the transition metals. Every one of them is radioactive, and most are made in nuclear reactions.",
      definition:
        "- The **actinoid series** is the last row of the periodic table, from thorium (Z = 90) to lawrencium (Z = 103), in which the 5f orbitals fill. Table 8.14 also lists actinium (Z = 89) at its head.\n" +
        "- General configuration: \\([\\text{Rn}]\\,5f^{0-14}\\,6d^{0-2}\\,7s^{2}\\). For Th, Pa and Np the electrons occupy either 6d or 5f; from Pu onwards the 5f shell fills in a regular way.\n" +
        "- **All are radioactive**, and most are man-made. Thorium (Th-232, half-life \\(1.4 \\times 10^{10}\\) years) and uranium (U-238, \\(4.5 \\times 10^{9}\\) years) live so long that they still exist in rocks.\n" +
        "- High densities (about 15 to 20 g cm⁻³), high melting points (about 1000 °C) and boiling points (about 3000 °C). Less reactive than the lanthanoids: they react with hot water but not cold water.\n" +
        "- Oxidation numbers range from +2 to +8. The **most stable is +3**. The early actinoids reach states that use all their outer electrons (U reaches +6, the radon configuration), because 5f, 6d and 7s have very similar energies.\n" +
        "- **Actinoid contraction:** the ionic radius decreases across the series, because f electrons shield poorly.\n" +
        "- **Transuranium elements:** atomic number greater than 92. Those from 93 to 103 are included in the actinoid series; those from 104 to 118 are the **post-actinoid elements**, transition metals made in nuclear reactions, with very short half-lives (element 112 lasts about \\(2.8 \\times 10^{-4}\\) s). Rutherfordium forms RfCl₄, like zirconium and hafnium.\n" +
        "- **Uses:** ThO₂ with 1% CeO₂ in gas lights, still used for outdoor camping; uranium in nuclear reactors, sold as the yellow cake, ammonium diuranate.",
      formula: {
        label: "General configuration of the actinoids",
        latex: "[\\text{Rn}]\\,5f^{0-14}\\,6d^{0-2}\\,7s^{2}",
        symbols: [{ symbol: "\\([\\text{Rn}]\\)", meaning: "the radon core of 86 electrons" }],
      },
      authoredExample: {
        prompt: "Write the ground state configuration of uranium (Z = 92) and the configuration it has in the +6 state.",
        steps: [
          "Given: Z = 92. The radon core holds 86 electrons, leaving 6.",
          "Table 8.14: \\(\\text{U} = [\\text{Rn}]\\,5f^{3}\\,6d^{1}\\,7s^{2}\\). Check: \\(86 + 3 + 1 + 2 = 92\\).",
          "In the +6 state all six outer electrons (\\(5f^{3}\\,6d^{1}\\,7s^{2}\\)) are lost, leaving the radon configuration.",
        ],
        answer: "\\(\\text{U}: [\\text{Rn}]\\,5f^{3}\\,6d^{1}\\,7s^{2}\\); \\(\\text{U}^{6+}: [\\text{Rn}]\\)",
      },
      selfCheckExample: {
        prompt: "Nobelium (Z = 102) is \\([\\text{Rn}]\\,5f^{14}\\,7s^{2}\\). Write the configuration of No²⁺ and explain why +2 is its common state.",
        steps: [
          "The two 7s electrons are lost: \\(\\text{No}^{2+} = [\\text{Rn}]\\,5f^{14}\\).",
          "A completely filled f subshell has extra stability, so nobelium stops at +2 instead of going on to the usual +3.",
        ],
        answer: "\\(\\text{No}^{2+} = [\\text{Rn}]\\,5f^{14}\\), a completely filled and extra-stable 5f subshell",
      },
      practiceSet: [
        { prompt: "Name the two actinoids that still exist in rocks because their half-lives are so long.", answer: "Thorium and uranium" },
        { prompt: "What is the most stable oxidation state of the actinoids?", answer: "+3" },
        { prompt: "Which are more reactive with water, the lanthanoids or the actinoids?", answer: "The lanthanoids; actinoids react with hot water but not with cold water" },
        { prompt: "Thorium (Z = 90) is \\([\\text{Rn}]\\,6d^{2}\\,7s^{2}\\). Is it paramagnetic or diamagnetic?", answer: "Paramagnetic: its two 6d electrons are unpaired" },
      ],
      pyqExampleId: "d94d5307-ec3e-41b1-a2c1-dd2afc4642f6",
      traps: [
        {
          title: "Copying the misprinted atomic number of thorium",
          body: "Section 8.14 prints a wrong atomic number for thorium. Thorium is element 90, the member right after actinium (89).",
        },
        {
          title: "Mixing up transuranium and post-actinoid",
          body: "Transuranium means every element after uranium. Post-actinoid means only those after lawrencium, the last actinoid. The first group includes the later actinoids; the second does not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-ln-vs-ac",
      name: "Lanthanoids and actinoids compared",
      intuition:
        "The two f series are cousins: both fill an inner f subshell, both shrink across the row, both like the +3 state. But the 5f electrons of the actinoids are easier to involve in bonding, and their nuclei are unstable. That is where the differences come from: more oxidation states, more complexes, coloured ions, and radioactivity throughout.",
      definition:
        "- **Similarities (textbook):** both show a +3 oxidation state; in both the f orbitals are filled; in both the ionic radii decrease as the atomic number increases; in both the electronegativity is low and the elements are highly reactive; in both the nitrates, perchlorates and sulphates are soluble while the hydroxides, fluorides and carbonates are insoluble.\n" +
        "- **Differences:** see the table. A 'distinguish' answer gives matching points, the same point for both series on one line.",
      table: {
        columns: ["Point", "Lanthanoids", "Actinoids"],
        rows: [
          {
            cells: ["Subshell being filled", "4f", "5f"],
            pyqExampleId: "a36d547b-e5f6-46ad-851a-7eb40b461e6e",
            noteAmber: "Board 2026 asked two similarities and two differences; 2016, 2023 and 2025 asked for the differences.",
          },
          { cells: ["General configuration", "[Xe] 4f⁰⁻¹⁴ 5d⁰⁻² 6s²", "[Rn] 5f⁰⁻¹⁴ 6d⁰⁻² 7s²"] },
          { cells: ["Oxidation states", "+3 common; the maximum is +4", "+3, +4, +5, +6 and +7"] },
          { cells: ["Complexes", "Do not form complexes easily", "Greater tendency to form complexes"] },
          { cells: ["Radioactivity", "Non-radioactive except promethium", "All radioactive"] },
          { cells: ["Oxocations", "Do not form oxocations", "Form oxocations such as UO₂²⁺"] },
          { cells: ["Colour of ions", "Most are colourless", "Coloured"] },
          { cells: ["Density", "About 7 g cm⁻³", "About 15 to 20 g cm⁻³"] },
          { cells: ["Reaction with water", "React with water to give the hydroxide and hydrogen", "React with hot water, but not with cold water"] },
        ],
      },
      practiceSet: [
        { prompt: "In which f series are most of the ions colourless?", answer: "The lanthanoids" },
        { prompt: "Which series forms oxocations such as the uranyl ion, UO₂²⁺?", answer: "The actinoids" },
        { prompt: "What is the maximum oxidation state shown by the lanthanoids?", answer: "+4" },
        { prompt: "Which of the two series has the higher density?", answer: "The actinoids (about 15 to 20 g cm⁻³)" },
      ],
      pyqExampleId: "a36d547b-e5f6-46ad-851a-7eb40b461e6e",
      traps: [
        {
          title: "Giving points for one series only",
          body: "'Actinoids are radioactive' is half a point. Write 'lanthanoids are non-radioactive except promethium; actinoids are all radioactive', the same point for both.",
        },
        {
          title: "Saying all lanthanoids are non-radioactive",
          body: "One lanthanoid, promethium, is radioactive. That is why the lanthanoid series is not the answer to 'in which series are all elements radioactive'.",
        },
      ],
    },
  ],
};
