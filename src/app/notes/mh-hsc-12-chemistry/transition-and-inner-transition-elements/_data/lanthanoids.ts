import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_LANTHANOIDS_NOTE: SubtopicNote = {
  subtopicName: "Lanthanoids",
  title: "Lanthanoids: Configuration, Contraction and Properties",
  oneLineDefinition:
    "What the f-block and the lanthanoids are, their electronic configurations with the exceptions of lanthanum, gadolinium and lutetium, lanthanoid contraction with its cause and effects, and their oxidation states, magnetism, colour and uses.",
  whyItMatters:
    "14 questions. Eight were set in board papers: what lanthanoids are (2014) and their effects (2015), lanthanoid contraction (2018 and 2025), the general configuration of the lanthanoids (2020), the configuration of gadolinium (2023 and 2025), and the radioactive lanthanoid (2026). The textbook adds cerium and terbium in the +4 state, europium and ytterbium in the +2 state, the paramagnetic ions, and the configuration of lawrencium.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscctr-ln-config",
      name: "The f-block and the configuration of the lanthanoids",
      intuition:
        "In the lanthanoids the new electrons go deep inside the atom, into the 4f subshell two shells below the outside. The outer 6s² stays the same all along the row, which is why the fourteen elements are so alike. The 4f and 5d levels are very close in energy, so an element that can reach a half filled or full 4f subshell by putting one electron into 5d does exactly that.",
      definition:
        "- **f-block elements:** elements whose f orbitals get filled. They are placed separately at the **bottom** of the periodic table and are a subset of the 6th and 7th periods.\n" +
        "- They are called **inner transition elements** because the f orbital lies much inside the d orbital. They have 1 to 14 electrons in the f orbital, 0 or 1 in the penultimate level and 2 in the outermost orbital.\n" +
        "- **Lanthanoids:** the 4f series, from lanthanum (Z = 57) to lutetium (Z = 71). The **actinoids** are the 5f series of period 7, written as a second row below them.\n" +
        "- General configuration (8.12.1): \\([\\text{Xe}]\\,4f^{0-14}\\,5d^{0-2}\\,6s^{2}\\). The number of 6s electrons stays 2 in the ground state.\n" +
        "- **Exceptions:** for lanthanum, 4f is slightly higher in energy than 5d, so La is \\([\\text{Xe}]\\,5d^{1}\\,6s^{2}\\), not \\(4f^{1}\\). **Gadolinium** and **lutetium** keep a \\(5d^{1}\\) electron to make the 4f subshell half filled (\\(4f^{7}\\)) and completely filled (\\(4f^{14}\\)), which gives extra stability.\n" +
        "- Always check the count: 54 for the xenon core plus the 4f, 5d and 6s electrons must equal Z.",
      formula: {
        label: "General configuration of the lanthanoids",
        latex: "[\\text{Xe}]\\,4f^{0-14}\\,5d^{0-2}\\,6s^{2}",
        symbols: [{ symbol: "\\([\\text{Xe}]\\)", meaning: "the xenon core of 54 electrons" }],
      },
      authoredExample: {
        prompt: "Write the condensed electronic configuration of lutetium (Z = 71), and explain why it has a 5d electron.",
        steps: [
          "Given: Z = 71. The xenon core accounts for 54 electrons, leaving 17.",
          "Two go into 6s and fourteen fill the 4f subshell completely, which accounts for 16.",
          "The last electron cannot enter the full 4f subshell, so it goes into 5d: \\([\\text{Xe}]\\,4f^{14}\\,5d^{1}\\,6s^{2}\\).",
          "Check: \\(54 + 14 + 1 + 2 = 71\\). The completely filled 4f subshell gives extra stability.",
        ],
        answer: "\\(\\text{Lu}: [\\text{Xe}]\\,4f^{14}\\,5d^{1}\\,6s^{2}\\)",
      },
      selfCheckExample: {
        prompt: "A lanthanoid has the configuration \\([\\text{Xe}]\\,4f^{7}\\,6s^{2}\\). Find its atomic number and name it.",
        steps: [
          "Add the electrons: \\(54 + 7 + 2 = 63\\).",
          "Element 63 is europium. Its 4f subshell is half filled, so it needs no 5d electron.",
        ],
        answer: "Z = 63, europium",
      },
      practiceSet: [
        { prompt: "Which lanthanoid has the configuration \\([\\text{Xe}]\\,5d^{1}\\,6s^{2}\\)?", answer: "Lanthanum" },
        { prompt: "Which lanthanoid has the configuration \\([\\text{Xe}]\\,4f^{14}\\,6s^{2}\\)?", answer: "Ytterbium (Z = 70)" },
        { prompt: "Why are the f-block elements called inner transition elements?", answer: "The f orbital being filled lies much inside the d orbital" },
        { prompt: "Where are the f-block elements placed in the periodic table?", answer: "Separately at the bottom, as two rows belonging to periods 6 and 7" },
      ],
      pyqExampleId: "a29a1073-6760-40e4-ba23-09aef5249809",
      traps: [
        {
          title: "Giving lanthanum a 4f electron",
          body: "For lanthanum the 5d level is slightly lower than 4f, so La is \\([\\text{Xe}]\\,5d^{1}\\,6s^{2}\\). Its 4f subshell is empty.",
        },
        {
          title: "Writing the configuration without checking the count",
          body: "Add the xenon core and every electron you wrote. If the total is not Z, one electron has gone missing or been added twice.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-ln-contraction",
      name: "Lanthanoid contraction: cause and effects",
      intuition:
        "Across the lanthanoids each new electron goes into the same inner 4f subshell. The 4f electrons are spread out and screen each other badly, so each extra proton pulls the whole electron cloud in a little more. The atoms and ions get steadily smaller from lanthanum to lutetium, and that small shrinking has effects well outside the series.",
      definition:
        "- **Lanthanoid contraction:** the steady decrease in atomic and ionic radii from lanthanum to lutetium with increasing atomic number.\n" +
        "- **Cause (write it in steps):** from one element to the next the nuclear charge increases by one unit and one electron is added. The new electron goes into the same inner 4f subshell. 4f electrons shield each other from the nuclear charge poorly, owing to their diffused nature. So the effective nuclear charge felt by each 4f electron increases, and the whole 4f shell contracts at each successive element.\n" +
        "- An 'explain' question wants the definition, the cause in these steps, and at least one effect from the table.",
      table: {
        columns: ["Point", "What happens", "Why"],
        rows: [
          {
            cells: ["Size", "Atomic and ionic radii decrease steadily from La to Lu", "Poor shielding by 4f electrons raises the effective nuclear charge"],
            pyqExampleId: "65e2561e-146f-4210-88ea-a9163bfabff7",
            noteAmber: "Board 2018 asked what lanthanoid contraction is; 2015 and 2025 asked it again, 2015 with its effects.",
          },
          { cells: ["Basicity of hydroxides", "Decreases from La(OH)₃, the strongest base, to Lu(OH)₃, the weakest", "The ionic size decreases from La³⁺ to Lu³⁺"] },
          { cells: ["Separation", "The lanthanoids are hard to separate from one another; the name 'rare earths' came from this", "Their sizes and chemical properties are so similar; ion exchange resins now make separation easier"] },
          { cells: ["Third transition series", "Ionisation enthalpies much higher than those of the first and second series", "Their atoms carry filled 4f orbitals, which shield poorly"] },
          { cells: ["Actinoids", "A similar fall in ionic radius, called actinoid contraction", "Poor shielding by the 5f electrons"] },
        ],
      },
      practiceSet: [
        { prompt: "Which is the stronger base, La(OH)₃ or Lu(OH)₃?", answer: "La(OH)₃" },
        { prompt: "Why were the lanthanoids called rare earth elements, although they are fairly abundant?", answer: "It was difficult to extract them economically in pure form from the other, chemically similar lanthanoids" },
        { prompt: "Which method has made the separation of lanthanoids easier and cheaper?", answer: "Ion exchange resins" },
      ],
      pyqExampleId: "65e2561e-146f-4210-88ea-a9163bfabff7",
      traps: [
        {
          title: "Saying the new electron enters the outer shell",
          body: "The electron enters the inner 4f subshell. That is the whole point: an inner, diffused subshell shields poorly, so the effective nuclear charge rises.",
        },
        {
          title: "Defining the contraction without its cause",
          body: "'The radius decreases' is only the definition. Write the cause in steps (charge up by one, electron into 4f, poor shielding, effective nuclear charge up) for the explanation marks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-ln-properties",
      name: "Properties, oxidation states and uses of the lanthanoids",
      intuition:
        "The lanthanoids behave more like the very reactive metals of groups 1 and 2 than like the transition metals. Their favourite oxidation state is +3. A +2 or +4 state turns up only when it leaves an empty, half filled or full f subshell, and even then the ion tends to return to +3, which is why such ions act as reducing or oxidising agents.",
      definition:
        "- **Oxidation states:** +3 is common to all, formed by losing 2 s electrons and one d or f electron. The 4f electrons are strongly screened by the 5s and 5p electrons and are not involved in bonding.\n" +
        "- Some show +2 and +4 when the ion has an \\(f^{0}\\), \\(f^{7}\\) or \\(f^{14}\\) configuration: \\(\\text{Ce}^{4+}\\) (\\(f^{0}\\)), \\(\\text{Eu}^{2+}\\) and \\(\\text{Tb}^{4+}\\) (\\(f^{7}\\)), \\(\\text{Yb}^{2+}\\) (\\(f^{14}\\)). Eu²⁺ and Yb²⁺ are the most stable dipositive ions; cerium is the only one with a stable +4 species.\n" +
        "- Because +3 is preferred, Ce⁴⁺ and Tb⁴⁺ readily gain an electron (good **oxidising** agents), and Eu²⁺ and Yb²⁺ readily lose one (good **reducing** agents).\n" +
        "- **Reactivity:** they react with water to give the hydroxide and hydrogen: \\(2\\text{M} + 6\\text{H}_2\\text{O} \\longrightarrow 2\\text{M(OH)}_3 + 3\\text{H}_2\\). They form oxides M₂O₃, nitrides LnN, halides LnX₃ and, heated with carbon at about 2800 K, carbides LnC₂.",
      table: {
        columns: ["Property", "What the textbook says"],
        rows: [
          { cells: ["Appearance and density", "Soft, silvery white metals with moderate densities, about 7 g cm⁻³; colour and brightness fade in air"] },
          {
            cells: ["Radioactivity", "All are non-radioactive except promethium (Pm)"],
            pyqExampleId: "d1184255-91bb-480b-bca6-85459813b431",
            noteAmber: "Board 2026 asked the name of the radioactive element of the lanthanoid series.",
          },
          { cells: ["Conduction", "Good conductors of heat and electricity"] },
          { cells: ["Magnetism", "Strongly paramagnetic; gadolinium becomes ferromagnetic below 16 °C; La³⁺ (4f⁰) and Lu³⁺ (4f¹⁴) have no unpaired electrons"] },
          { cells: ["Colour", "Many M³⁺ ions are coloured (green, pink, yellow) by f-f transitions; an ion with n f electrons has about the same colour as one with 14 − n; the colour hardly changes with the ligand"] },
          { cells: ["Coordination number", "Usually greater than 6, typically 8 or 9 and up to 12; the hydrated lanthanum ion is [La(H₂O)₉]³⁺"] },
          { cells: ["Uses", "Colour TV tubes and monitors ((Eu,Y)₂O₃ gives red), the Nd:YAG laser, erbium-doped fibre amplifiers, hybrid cars, superconductors and permanent magnets"] },
        ],
      },
      selfCheckExample: {
        prompt: "Explain why Ce⁴⁺ (Z of Ce = 58) is a good oxidising agent.",
        steps: [
          "Ce is \\([\\text{Xe}]\\,4f^{1}\\,5d^{1}\\,6s^{2}\\); Ce⁴⁺ is \\([\\text{Xe}]\\,4f^{0}\\), an empty f subshell, which is why the +4 state forms at all.",
          "But +3 is the state common to all the lanthanoids, so Ce⁴⁺ readily takes an electron: \\(\\text{Ce}^{4+} + e^{-} \\longrightarrow \\text{Ce}^{3+}\\).",
          "A species that readily accepts electrons is an oxidising agent.",
        ],
        answer: "Ce⁴⁺ readily gains an electron to return to the common +3 state, so it oxidises other substances",
      },
      practiceSet: [
        { prompt: "Which lanthanoid forms a stable +4 species?", answer: "Cerium" },
        { prompt: "Is La³⁺ paramagnetic or diamagnetic?", answer: "Diamagnetic: it is 4f⁰, with no unpaired electron" },
        { prompt: "What causes the colour of lanthanoid ions?", answer: "f-f transitions, with energy in the visible region" },
        { prompt: "Write the equation for the reaction of a lanthanoid metal M with water.", answer: "\\(2\\text{M} + 6\\text{H}_2\\text{O} \\longrightarrow 2\\text{M(OH)}_3 + 3\\text{H}_2\\)" },
      ],
      pyqExampleId: "d1184255-91bb-480b-bca6-85459813b431",
      traps: [
        {
          title: "Saying many lanthanoids form +4",
          body: "Higher states are unusual for lanthanoids; cerium is the only one with a stable +4 species.",
        },
        {
          title: "Expecting lanthanoid colours to change with the ligand",
          body: "Unlike the d-block, the spectra of lanthanoids are hardly affected by the ligands, because the 4f electrons are screened by the 5s and 5p electrons.",
        },
      ],
    },
  ],
};
