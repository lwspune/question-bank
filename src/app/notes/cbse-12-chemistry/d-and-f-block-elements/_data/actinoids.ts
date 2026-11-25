import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_ACTINOIDS_NOTE: SubtopicNote = {
  subtopicName: "The Actinoids",
  title: "The Actinoids and How They Differ from the Lanthanoids",
  oneLineDefinition:
    "Why actinoid configurations are irregular, why actinoids show a wide range of oxidation states, why the actinoid contraction is greater, and how the actinoids compare with the lanthanoids.",
  whyItMatters:
    "14 questions. Nine were set in board papers, five in 2025 and four in 2026, and eight of the nine are assertion-reason items on three facts: actinoid configurations are irregular, actinoids show a wide range of oxidation states, and the actinoid contraction is greater than the lanthanoid contraction. Each fact is paired with a right reason in one item and a true but unrelated reason in another. The 2026 MCQ asks why actinoids show more oxidation states. The NCERT exercises add comparisons with the lanthanoids and the last actinoid, lawrencium.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcdf-an-oxstates",
      name: "Actinoid configurations and oxidation states",
      intuition:
        "The 5f, 6d and 7s levels of the actinoids sit so close together that the atom can use different numbers of electrons from all three. That gives the early actinoids many oxidation states. The 5f orbitals are also less buried than the 4f, so they join in bonding.",
      definition:
        "- All the actinoids are radioactive. The early members have long half-lives; the later ones range from a day down to 3 minutes for lawrencium, and some could be made only in nanogram amounts. This makes their study difficult.\n" +
        "- **Configuration:** \\(7s^2\\) with variable occupancy of 5f and 6d. The irregularities, as in the lanthanoids, are related to the stability of the \\(f^0\\), \\(f^7\\) and \\(f^{14}\\) occupancies: Am is \\([\\text{Rn}]5f^77s^2\\) and Cm is \\([\\text{Rn}]5f^76d^17s^2\\).\n" +
        "- The 5f orbitals are not as buried as the 4f, so 5f electrons take part in bonding far more.\n" +
        "- **Oxidation states:** a greater range than the lanthanoids, partly because the 5f, 6d and 7s levels have comparable energies. +3 is general, but the first half of the series shows higher states: the maximum rises from +4 in Th to +5 in Pa, +6 in U and +7 in Np, then falls in the later elements.\n" +
        "- The chemistry of the actinoids is more complicated than that of the lanthanoids for two reasons: the wide range of oxidation states and their radioactivity.\n" +
        "- **Assertion-reason codes** in these papers: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) A false, R true.",
      table: {
        columns: ["Assertion", "Reason", "Code"],
        rows: [
          {
            cells: ["Actinoid configurations are irregular", "Stability of f⁰, f⁷ and f¹⁴ occupancies", "(A)"],
            pyqExampleId: "a27b8b56-b994-4b78-9898-e1ebe8cec1c2",
          },
          { cells: ["Actinoid configurations are irregular", "Actinoids are radioactive", "(B)"] },
          {
            cells: ["Actinoids show a wide range of oxidation states", "5f, 6d and 7s levels have comparable energies", "(A)"],
            pyqExampleId: "a402cb7d-008b-4d5a-9557-3d6fbbd60e72",
          },
          {
            cells: ["Actinoids show a wide range of oxidation states", "Actinoids are radioactive", "(B)"],
            noteAmber: "Set in 2025 and again in 2026.",
          },
          {
            cells: ["Actinoid configurations are irregular", "5f, 6d and 7s levels have comparable energies", "(B)"],
            noteAmber: "Board 2026, answer (B): the book ties comparable energies to the range of oxidation states, and the irregular configurations to f⁰, f⁷ and f¹⁴.",
          },
        ],
        caption: "Radioactivity is a property of the nucleus. It is never the reason for a fact about electrons or oxidation states.",
      },
      selfCheckExample: {
        prompt: "Which is the last element of the actinoid series? Write its configuration and its likely oxidation state.",
        steps: [
          "The actinoids run from thorium (90) to lawrencium (103).",
          "Lawrencium is \\([\\text{Rn}]5f^{14}6d^17s^2\\).",
          "With 5f full, only the 6d and two 7s electrons are lost.",
        ],
        answer: "Lawrencium, [Rn]5f¹⁴6d¹7s², oxidation state +3",
      },
      practiceSet: [
        { prompt: "Which actinoid reaches the +7 oxidation state?", answer: "Neptunium (Np)" },
        { prompt: "Write the configuration of curium (Z = 96).", answer: "\\([\\text{Rn}]5f^76d^17s^2\\)" },
        { prompt: "Give two reasons why actinoid chemistry is more complicated than lanthanoid chemistry.", answer: "A wide range of oxidation states, and radioactivity (short half-lives, tiny amounts)" },
      ],
      pyqExampleId: "5f85f803-be24-4b74-89ea-f030b793b8a8",
      traps: [
        {
          title: "Using radioactivity as the reason",
          body: "Radioactivity is true of every actinoid, so the board pairs it with true assertions. It never explains configurations, oxidation states or contraction: the answer is (B).",
        },
        {
          title: "Thinking the highest state keeps rising",
          body: "The maximum state rises from Th (+4) to Np (+7) and then falls. The later actinoids are mostly +3.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcdf-an-compare",
      name: "Actinoids compared with lanthanoids",
      intuition:
        "Both series fill an inner f subshell and both shrink along the series. The difference is depth: the 5f orbitals are less buried than the 4f. So the actinoids shield even more poorly (a bigger contraction), use their f electrons in bonding (more oxidation states), and are radioactive.",
      definition:
        "- **Contraction:** the actinoid contraction is like the lanthanoid contraction, but greater from element to element, because 5f electrons shield more poorly than 4f electrons.\n" +
        "- **Ionisation enthalpy:** the early actinoids have lower ionisation enthalpies than the early lanthanoids; their outer electrons are less firmly held and are available for bonding.\n" +
        "- **Reactivity:** actinoid metals are highly reactive, especially when finely divided. Boiling water gives a mixture of oxide and hydride; hydrochloric acid attacks all of them; nitric acid affects most only slightly (a protective oxide layer forms); alkalies have no action.\n" +
        "- **Magnetic properties** of the actinoids are more complex than those of the lanthanoids.\n" +
        "- Both series have more compounds in the +3 state than in the +4 state.",
      table: {
        columns: ["Point", "Lanthanoids", "Actinoids"],
        rows: [
          { cells: ["Orbitals filled", "4f", "5f"] },
          { cells: ["General configuration", "[Xe]4f¹⁻¹⁴5d⁰⁻¹6s²", "[Rn]5f¹⁻¹⁴6d⁰⁻¹7s²"] },
          { cells: ["Oxidation states", "Mainly +3; a few show +2 or +4", "+3 common, but a wider range, up to +7 (Np)"] },
          {
            cells: ["Contraction", "Lanthanoid contraction", "Greater from element to element (5f shields even more poorly)"],
            pyqExampleId: "b6f44849-189a-4d6d-80c4-4c5b6181c692",
          },
          { cells: ["f electrons in bonding", "4f deeply buried, little part", "5f less buried, take part far more"] },
          { cells: ["Radioactivity", "Chemistry smooth: mostly one oxidation state", "All radioactive, which makes study difficult"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give one similarity and one difference between the chemistry of the lanthanoids and the actinoids.",
        steps: [
          "Similarity: both fill an inner f subshell, show a contraction along the series and have +3 as a common state.",
          "Difference: the actinoids show a much wider range of oxidation states (up to +7), because 5f, 6d and 7s have comparable energies.",
        ],
        answer: "Both show +3 and a contraction; actinoids show many more oxidation states (any one valid pair)",
      },
      practiceSet: [
        { prompt: "Which acid attacks all the actinoid metals?", answer: "Hydrochloric acid" },
        { prompt: "Why are 5f electrons available for bonding more than 4f electrons?", answer: "The 5f orbitals are not as buried as the 4f orbitals" },
        { prompt: "Write the general configuration of the actinoids.", answer: "\\([\\text{Rn}]5f^{1-14}6d^{0-1}7s^2\\)" },
      ],
      pyqExampleId: "bf28fe44-7a48-494a-943a-28cc458b76f2",
      traps: [
        {
          title: "Two true facts are not cause and effect",
          body: "\"Actinoid contraction is greater\" and \"actinoids show a wide range of oxidation states\" are both true, but one does not cause the other: code (B). The contraction comes from the poor shielding of 5f electrons.",
        },
        {
          title: "Half a comparison",
          body: "A \"compare\" or \"difference\" answer needs both sides: say what the lanthanoids do AND what the actinoids do for each point.",
        },
      ],
    },
  ],
};
