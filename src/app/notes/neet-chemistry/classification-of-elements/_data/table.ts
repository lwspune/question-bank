import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CP_TABLE_NOTE: SubtopicNote = {
  subtopicName: "The Modern Periodic Table",
  title: "The Modern Periodic Table",
  oneLineDefinition:
    "How the periodic table grew from atomic weights to atomic numbers, how its periods, groups and s, p, d and f blocks follow from electronic configuration, and how an element with Z above 100 gets its temporary IUPAC name.",
  whyItMatters:
    "Three NEET questions, from 2022 to 2025. One asks the IUPAC name of the element with atomic number 119 (2022), one matches four elements to the lanthanoids, the d-block, the p-block and the s-block (Re-NEET 2024), and one picks the main group elements from five electronic configurations (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcp-periodic-law",
      name: "The periodic law and the four blocks",
      intuition:
        "Chemists first sorted elements by atomic weight, and every such table broke somewhere. In 1913 Moseley showed that the true sorting key is the atomic number. Sort by atomic number and elements with the same outer electrons fall into the same column. So the table is really a map of electronic configurations: the row tells you the outermost shell, the column tells you the outer electrons, and the block tells you which kind of subshell is being filled.",
      definition:
        "- **Early attempts (all by atomic weight):** Döbereiner's triads (1829); Newlands' law of octaves (1865), which worked only up to calcium; Lothar Meyer's plot of atomic volume against atomic weight (1869).\n" +
        "- **Mendeleev (1869):** properties are a periodic function of atomic weight. He left gaps for undiscovered elements and predicted eka-aluminium (gallium) and eka-silicon (germanium).\n" +
        "- **Moseley (1913):** a plot of the square root of the X-ray frequency against atomic number is a straight line.\n" +
        "- **Modern periodic law:** the physical and chemical properties of the elements are periodic functions of their **atomic numbers**.\n" +
        "- The long form of the table has 18 groups and 7 periods. The period number is the highest principal quantum number \\(n\\) of the element.\n" +
        "- The number of elements in a period is twice the number of orbitals being filled: 2, 8, 8, 18, 18, 32 and 32.\n" +
        "- The 4f series (lanthanoids, cerium Z = 58 to lutetium Z = 71) and the 5f series (actinoids, thorium Z = 90 to lawrencium Z = 103) are placed in two rows below the table.\n" +
        "- The s-block and p-block elements together are the **representative** or **main group** elements. The d-block elements are the transition elements, and the f-block elements the inner transition elements.",
      table: {
        columns: ["Block", "Groups", "Outer configuration", "Examples"],
        rows: [
          { cells: ["s-block", "1 and 2", "\\(ns^1\\) or \\(ns^2\\)", "Na, Cs, Mg, Ca"] },
          { cells: ["p-block", "13 to 18", "\\(ns^2np^1\\) to \\(ns^2np^6\\)", "B, As, I, Ne; helium (1s²) is placed in group 18"] },
          { cells: ["d-block", "3 to 12", "\\((n-1)d^{1-10}ns^{0-2}\\)", "Sc, Mn, Fe, Cu, Zn"] },
          { cells: ["f-block", "Two rows below the table", "\\((n-2)f^{1-14}(n-1)d^{0-1}ns^2\\)", "Lanthanoids Ce to Lu; actinoids Th to Lr"], pyqExampleId: "561af4c3-84aa-4de8-a69e-ccbfd68d748a", noteAmber: "Re-NEET 2024: cerium (Z = 58) was the lanthanoid. Do not confuse it with caesium (Z = 55), an s-block metal." },
        ],
        caption: "Representative (main group) elements are the s-block and p-block elements only.",
      },
      pyqExampleId: "561af4c3-84aa-4de8-a69e-ccbfd68d748a",
      selfCheckExample: {
        prompt: "Period 6 fills the 6s, 4f, 5d and 6p subshells. How many elements does it hold?",
        steps: [
          "Orbitals being filled: one 6s, seven 4f, five 5d and three 6p, which is 16 orbitals.",
          "Each orbital holds two electrons, so the period holds \\(2 \\times 16 = 32\\) elements.",
        ],
        answer: "32 elements",
      },
      practiceSet: [
        { prompt: "On which property of the elements is the modern periodic law based?", answer: "Atomic number" },
        { prompt: "Which two elements did Mendeleev predict as eka-aluminium and eka-silicon?", answer: "Gallium and germanium" },
        { prompt: "How many elements are there in period 5 of the periodic table, and why?", answer: "18, because it fills nine orbitals: 5s, 4d and 5p" },
        { prompt: "Which series do the elements from thorium to lawrencium form?", answer: "The actinoids, the 5f series" },
      ],
      traps: [
        {
          title: "Mendeleev used atomic weight",
          body: "Mendeleev's periodic law was based on atomic weight. The atomic number became the basis only after Moseley's work in 1913.",
        },
        {
          title: "Caesium is not cerium",
          body: "Caesium, Cs (Z = 55), is an alkali metal in the s-block. Cerium, Ce (Z = 58), is the first lanthanoid in the f-block.",
        },
        {
          title: "Helium sits in group 18",
          body: "Helium is \\(1s^2\\), an s configuration, but it is placed with the noble gases in group 18 because its valence shell is completely filled.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcp-position",
      name: "Block, period and group from a configuration",
      intuition:
        "Write the configuration and look at the last subshell that is being filled: its letter is the block. The highest shell number is the period. The group then comes from counting the outer electrons. A filled inner d¹⁰ set does not change the block: what counts is where the last electron goes. How to write the configuration of an atom is taught in Structure of Atom; here you only read it.",
      definition:
        "- **Block:** the subshell (s, p, d or f) that receives the last electron.\n" +
        "- **Period:** the highest principal quantum number \\(n\\) in the configuration.\n" +
        "- **Group:** s-block, the number of \\(ns\\) electrons; d-block, the \\((n-1)d\\) electrons plus the \\(ns\\) electrons; p-block, 10 plus the \\(ns\\) and \\(np\\) electrons.\n" +
        "- **Main group** elements are s-block and p-block only. Copper, \\([\\text{Ar}]3d^{10}4s^1\\), is a d-block element; iodine, \\([\\text{Kr}]4d^{10}5s^25p^5\\), is a p-block element.\n" +
        "- Zinc, cadmium and mercury, \\((n-1)d^{10}ns^2\\), are d-block elements but do not show most of the properties of transition elements.",
      formula: {
        label: "Group from the outer electrons",
        latex:
          "\\text{s-block: group} = ns \\qquad \\text{d-block: group} = (n-1)d + ns \\qquad \\text{p-block: group} = 10 + ns + np",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the highest principal quantum number in the configuration, which is also the period" },
          { symbol: "\\(ns,\\ np,\\ (n-1)d\\)", meaning: "the number of electrons in each of these subshells" },
        ],
      },
      authoredExample: {
        prompt: "An element has the configuration \\([\\text{Ar}]3d^{10}4s^24p^5\\). Find its block, period and group.",
        steps: [
          "The last electron enters a 4p orbital, so it is a p-block element. The inner \\(3d^{10}\\) is a filled set and does not decide the block.",
          "The highest shell is \\(n = 4\\), so it is in period 4.",
          "Group \\(= 10 + 2 + 5 = 17\\).",
        ],
        answer: "p-block, period 4, group 17 (bromine)",
      },
      selfCheckExample: {
        prompt: "An element has the configuration \\([\\text{Ar}]3d^64s^2\\). Find its block, period and group.",
        steps: [
          "The last electron enters a 3d orbital, so it is a d-block element.",
          "The highest shell is \\(n = 4\\), so it is in period 4.",
          "Group \\(= 6 + 2 = 8\\).",
        ],
        answer: "d-block, period 4, group 8 (iron)",
      },
      practiceSet: [
        { prompt: "Give the block, period and group of the element with configuration \\([\\text{Ne}]3s^23p^3\\).", answer: "p-block, period 3, group 15 (phosphorus)" },
        { prompt: "The element with Z = 120 has not yet been made. Which group would it belong to?", answer: "Group 2, with outer configuration \\(8s^2\\)" },
        { prompt: "The element with Z = 117 ends its configuration in \\(7s^27p^5\\). Which group is it in?", answer: "Group 17 (\\(10 + 2 + 5\\))" },
        { prompt: "Which two blocks make up the representative (main group) elements?", answer: "The s-block and the p-block" },
      ],
      pyqExampleId: "02b190da-ef75-4519-a70e-0adda9f32c61",
      traps: [
        {
          title: "An inner d¹⁰ does not make an element d-block",
          body: "In \\([\\text{Kr}]4d^{10}5s^25p^5\\) the last electron enters 5p, so the element (iodine) is p-block and a main group element.",
        },
        {
          title: "Thorium is f-block with no f electron",
          body: "Thorium's configuration is \\([\\text{Rn}]6d^27s^2\\), but it is the first actinoid, an f-block element, not a main group element.",
        },
        {
          title: "d-block groups count two subshells",
          body: "For a d-block element add the \\((n-1)d\\) and \\(ns\\) electrons. Manganese, \\([\\text{Ar}]3d^54s^2\\), is in group 7, not group 2 or group 5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcp-iupac-names",
      name: "IUPAC names for elements with Z above 100",
      intuition:
        "A newly made element gets a temporary name that simply spells out its atomic number. Each digit has a short root; put the roots in the order of the digits and add -ium. The symbol is the first letters of the three roots. The name stays until IUPAC approves a permanent one.",
      definition:
        "- **Digit roots:** 0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct, 9 enn.\n" +
        "- Put the roots together in the order of the digits and add **-ium**. The symbol is the first letter of each root, the first one a capital: Z = 104 is Unnilquadium, Unq.\n" +
        "- When bi or tri meets -ium, one i is dropped: Ununbium (112), Ununtrium (113).\n" +
        "- The elements 101 to 118 all have permanent names now, for example Z = 107 Unnilseptium is bohrium (Bh), Z = 113 Ununtrium is nihonium (Nh) and Z = 118 Ununoctium is oganesson (Og).",
      formula: {
        label: "Temporary IUPAC name",
        latex: "\\text{name} = \\text{root}(d_1) + \\text{root}(d_2) + \\text{root}(d_3) + \\text{ium}",
        symbols: [
          { symbol: "\\(d_1, d_2, d_3\\)", meaning: "the digits of the atomic number, in order" },
        ],
      },
      authoredExample: {
        prompt: "Give the temporary IUPAC name and symbol of the element with atomic number 114.",
        steps: [
          "The digits are 1, 1 and 4.",
          "Roots: un, un, quad. Add -ium: Ununquadium.",
          "Symbol: the first letters u, u, q, so Uuq.",
        ],
        answer: "Ununquadium, Uuq (now named flerovium, Fl)",
      },
      selfCheckExample: {
        prompt: "Give the temporary IUPAC name of the element with atomic number 105.",
        steps: [
          "The digits are 1, 0 and 5: un, nil, pent.",
          "Add -ium: Unnilpentium.",
        ],
        answer: "Unnilpentium, Unp (now named dubnium, Db)",
      },
      practiceSet: [
        { prompt: "What is the temporary IUPAC name of the element with Z = 104?", answer: "Unnilquadium" },
        { prompt: "Which atomic number has the temporary name Ununtrium?", answer: "113" },
        { prompt: "What is the temporary IUPAC symbol of the element with Z = 106?", answer: "Unh (Unnilhexium)" },
        { prompt: "What is the temporary IUPAC name of the element with Z = 120?", answer: "Unbinilium" },
      ],
      pyqExampleId: "22eb644c-6607-47fc-9c9c-3f30b4d81995",
      traps: [
        {
          title: "One root for every digit",
          body: "A three-digit atomic number gives three roots. Z = 119 is un, un, enn: Ununennium. Dropping a root or changing their order gives a different element.",
        },
        {
          title: "Zero is nil, nine is enn",
          body: "The root for 0 is nil and the root for 9 is enn. Unnilennium is Z = 109, not 119.",
        },
      ],
    },
  ],
};
