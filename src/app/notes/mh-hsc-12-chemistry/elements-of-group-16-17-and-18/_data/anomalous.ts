import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_ANOMALOUS_NOTE: SubtopicNote = {
  subtopicName: "Anomalous Behaviour",
  title: "Anomalous Behaviour of Oxygen and Fluorine",
  oneLineDefinition:
    "Why oxygen and fluorine, the first members of groups 16 and 17, differ from the rest of their groups in atomicity, magnetism, oxidation states, hydrides, oxoacids and electron gain enthalpy.",
  whyItMatters:
    "8 questions. Seven were set in board papers: the anomalous behaviour of oxygen in 2023, 2024, 2025 and 2026 (atomicity, magnetic property, oxidation state and nature of hydrides), and of fluorine in 2014 and twice in 2025 (hydrogen bonding, oxidation state, oxyacid, hydrides, electronegativity and electron gain enthalpy). The textbook adds which hydrogen halide is a liquid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgp-oxygen-anomaly",
      name: "Anomalous behaviour of oxygen",
      intuition:
        "The first member of a group is always the odd one out. Oxygen is tiny, it is the second most electronegative element, and its second shell has no d orbitals. Being small, it can make a strong double bond with itself, so it stays as O₂ instead of a big ring like S₈. Having no d orbitals, it cannot spread out its electrons to reach +4 or +6.",
      definition:
        "- Oxygen differs from the other members of group 16 because of its **small atomic size**, its **high electronegativity** and the **absence of d orbitals**.\n" +
        "- A board answer takes each property asked for and states it **for oxygen and for the other members**, then gives the reason where it is asked.\n" +
        "- **Paramagnetism explained:** the molecular orbital configuration of \\(\\text{O}_2\\) is \\(\\text{KK}\\ \\sigma(2s)^2\\ \\sigma^*(2s)^2\\ \\sigma(2p_z)^2\\ \\pi(2p_x)^2\\ \\pi(2p_y)^2\\ \\pi^*(2p_x)^1\\ \\pi^*(2p_y)^1\\). The two unpaired electrons in the antibonding \\(\\pi^*\\) orbitals make it paramagnetic even though it has an even number of electrons.\n" +
        "- **Oxidation states:** oxygen is \\(-2\\) in most compounds, \\(+2\\) in \\(\\text{OF}_2\\) (fluorine is more electronegative), and \\(-1\\) in peroxides such as \\(\\text{H}_2\\text{O}_2\\) and \\(\\text{Na}_2\\text{O}_2\\).",
      table: {
        columns: ["Property", "Oxygen", "Other group 16 elements"],
        rows: [
          {
            cells: ["Atomicity", "Diatomic, \\(\\text{O}_2\\)", "Polyatomic, such as \\(\\text{S}_8\\)"],
            pyqExampleId: "cd50ae54-a1c5-4bcc-b85b-e74ccdcd4549",
            noteAmber: "Board 2023 asked atomicity, magnetic property and oxidation state together.",
          },
          { cells: ["Magnetic property", "Paramagnetic", "Diamagnetic"] },
          { cells: ["Oxidation states", "\\(-2\\), \\(-1\\) and \\(+2\\) only; no higher states, since it has no vacant d orbitals", "\\(-2\\), \\(+2\\), \\(+4\\) and \\(+6\\)"] },
          { cells: ["Nature of hydride", "\\(\\text{H}_2\\text{O}\\) is a liquid at room temperature, because of hydrogen bonding", "\\(\\text{H}_2\\text{S}\\), \\(\\text{H}_2\\text{Se}\\) and \\(\\text{H}_2\\text{Te}\\) are gases"] },
          { cells: ["Covalency", "Usually 2, in rare cases 4", "Can exceed four"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the compound in which oxygen shows the +2 oxidation state.", answer: "\\(\\text{OF}_2\\), oxygen difluoride" },
        { prompt: "Why can oxygen not show the +4 or +6 oxidation state?", answer: "It has no vacant d orbitals, so it cannot expand its octet" },
        { prompt: "What is the usual covalency of oxygen?", answer: "Two" },
        { prompt: "How many unpaired electrons does an O₂ molecule have, and where are they?", answer: "Two, one in each antibonding \\(\\pi^*\\) orbital" },
      ],
      pyqExampleId: "f97a8ae0-f91b-4338-a4ae-330007bcf0ab",
      traps: [
        {
          title: "Giving oxygen only one oxidation state",
          body: "Oxygen shows three oxidation states: \\(-2\\), \\(-1\\) in peroxides and \\(+2\\) in \\(\\text{OF}_2\\). Writing that \\(-2\\) is its 'maximum' is wrong, since \\(+2\\) is higher.",
        },
        {
          title: "One side of the comparison",
          body: "'Oxygen is paramagnetic' is half a point. Write 'oxygen is paramagnetic while the other members are diamagnetic' for each property asked.",
        },
        {
          title: "Hydrogen bonding is the reason for water",
          body: "Water is a liquid because its molecules are held by hydrogen bonds. Say so; 'water has a high boiling point' with no reason loses the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-fluorine-anomaly",
      name: "Anomalous behaviour of fluorine",
      intuition:
        "Fluorine is the smallest halogen and the most electronegative element of all. It never gives up electrons to anything, so it never shows a positive oxidation state, and with no d orbitals it can form only one bond. Its tiny atom also packs electrons so tightly that an extra electron is less welcome than in chlorine.",
      definition:
        "- Fluorine differs from the other halogens because of four reasons: **small atomic size**, **highest electronegativity**, **absence of d orbitals in its valence shell**, and **low F-F bond dissociation enthalpy**.\n" +
        "- Its ionisation enthalpy, electronegativity and electrode potential are higher than the trend of the other halogens predicts; its ionic and covalent radii, melting point, boiling point and electron gain enthalpy are lower.\n" +
        "- Most reactions of fluorine are exothermic, because the bonds it forms with other elements are short and strong.\n" +
        "- If the question asks **why** fluorine is anomalous, give the four reasons. If it asks for its anomalous behaviour **with respect to** named properties, give the comparisons in the table.\n" +
        "- Board 2014 also asked about polyhalide ions. The other halogens form ions such as \\(\\text{Cl}_3^-\\) in \\(\\text{K}[\\text{Cl}_3]\\) and \\(\\text{I}_5^-\\) in \\([\\text{NH}_4][\\text{I}_5]\\); fluorine, with no d orbitals to expand its octet, is not the centre of such ions.",
      table: {
        columns: ["Property", "Fluorine", "Other halogens"],
        rows: [
          {
            cells: ["Oxidation state", "Only \\(-1\\)", "\\(-1\\), and also \\(+1\\), \\(+3\\), \\(+5\\), \\(+7\\)"],
            pyqExampleId: "0d4ec81b-a736-44bd-8061-15eff18f260e",
            noteAmber: "Board 2014 asked hydrogen bonding, oxidation state and polyhalide ions.",
          },
          {
            cells: ["Oxoacids", "Only one, hypofluorous acid \\(\\text{HOF}\\)", "Several, such as \\(\\text{HOCl}\\), \\(\\text{HClO}_2\\), \\(\\text{HClO}_3\\), \\(\\text{HClO}_4\\)"],
            pyqExampleId: "0e7d1f44-d709-4f14-8857-88aaab8c16fe",
            noteAmber: "Board 2025 asked oxyacid, nature of hydrides, electronegativity and electron gain enthalpy.",
          },
          {
            cells: ["Hydride", "\\(\\text{HF}\\) is a liquid (b.p. 293 K) because of strong hydrogen bonding", "\\(\\text{HCl}\\), \\(\\text{HBr}\\), \\(\\text{HI}\\) are gases (b.p. 189, 206, 238 K)"],
            pyqExampleId: "7fd55d83-eac0-406b-989f-1cd8ed0689f2",
          },
          { cells: ["Electronegativity", "4.0, the highest of all elements", "Lower: Cl 3.2, Br 3.0, I 2.7"] },
          { cells: ["Electron gain enthalpy", "\\(-333\\) kJ/mol, less negative than chlorine", "Chlorine \\(-349\\) kJ/mol, the most negative"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the only oxoacid of fluorine.", answer: "Hypofluorous acid, \\(\\text{HOF}\\)" },
        { prompt: "Why is HF a liquid while HCl is a gas at room temperature?", answer: "HF molecules are held together by strong hydrogen bonds" },
        { prompt: "Why are most reactions of fluorine exothermic?", answer: "The bonds fluorine forms with other elements are short and strong" },
        { prompt: "Give the electronegativity of fluorine on the scale used in the textbook.", answer: "4.0" },
      ],
      pyqExampleId: "983ff23a-b926-4ed5-a3d3-d65c4bb75e2e",
      traps: [
        {
          title: "Fluorine does not have the most negative electron gain enthalpy",
          body: "Chlorine does. Fluorine's value is less negative because its small 2p subshell repels the incoming electron.",
        },
        {
          title: "Answering 'why' with properties",
          body: "When the board asks why fluorine is anomalous, the four reasons (size, electronegativity, no d orbitals, weak F-F bond) carry the marks, not a list of its odd properties.",
        },
        {
          title: "Only one oxoacid, not none",
          body: "Fluorine forms one oxoacid, \\(\\text{HOF}\\). Writing that it forms no oxoacid is wrong.",
        },
      ],
    },
  ],
};
