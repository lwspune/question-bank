import type { SubtopicNote } from "@/app/notes/_types";

export const TABLE_PER_NOTE: SubtopicNote = {
  subtopicName: "Periodic Law, Blocks and Position in the Table",
  title: "Periodic Law, Blocks and Position in the Table",
  oneLineDefinition:
    "The properties of elements repeat with atomic number, so an element's period, group and block follow from its electronic configuration, and an element with Z above 100 gets a temporary name built from the digits of Z.",
  whyItMatters:
    "Fourteen PYQs, twelve of them multiple choice, and one from 2026. Four test the history of the periodic law, from Newlands and Mendeleev to Moseley; four name an element from its atomic number or place it in a block; six locate an element from its configuration, from an ion's electron count or from its lowest oxidation state.",
  concepts: [
    // C1 — periodic law and the layout of the modern table
    {
      kind: "reference" as const,
      slug: "jcper-periodic-law",
      name: "From atomic weight to atomic number",
      intuition:
        "Every early table sorted elements by atomic weight, and each one broke somewhere. Moseley showed that the real sorting key is the atomic number: the square root of an element's X-ray frequency rises in a straight line with Z. Order by Z and the repeats line up without exceptions.",
      definition:
        "- **Modern periodic law**: the properties of elements are a periodic function of their **atomic numbers**.\n" +
        "- A **group** holds elements with the same outer electronic configuration; a **period** holds elements with the same highest principal quantum number \\(n\\).\n" +
        "- The number of elements in a period is **twice** the number of orbitals being filled: period 1 has 2, periods 2 and 3 have 8, periods 4 and 5 have 18, periods 6 and 7 have 32.\n" +
        "- The \\(4f\\) and \\(5f\\) series sit in two rows below the table to keep elements with similar properties in one column.\n" +
        "- The s-block metals are too reactive to be found free in nature; they occur only as compounds.",
      table: {
        columns: ["Who and when", "Sorted by", "What they found"],
        rows: [
          { cells: ["Döbereiner, 1829", "Atomic weight", "Triads such as Li, Na, K: the middle atomic weight is about the mean of the other two"] },
          { cells: ["Newlands, 1865", "Atomic weight", "Law of octaves: every eighth element repeats the first; it worked only up to calcium"] },
          { cells: ["Lothar Meyer, 1869", "Atomic weight", "Plotted atomic volume against atomic weight and saw a repeating curve"] },
          { cells: ["Mendeleev, 1869", "Atomic weight", "Left gaps and predicted eka-aluminium (Ga) and eka-silicon (Ge); reversed some pairs to keep families together"] },
          { cells: ["Moseley, 1913", "Atomic number", "A plot of \\(\\sqrt{\\nu}\\) against \\(Z\\) is a straight line, so \\(Z\\) is the true basis"], noteAmber: "Only Moseley's work uses atomic number. A statement giving Newlands or Meyer atomic numbers is false." },
          { cells: ["Modern table", "Atomic number", "18 groups and 7 periods; blocks s, p, d and f named by the subshell being filled"] },
        ],
        caption: "Everyone before 1913 used atomic weight; the modern law and table use atomic number.",
      },
      selfCheckExample: {
        prompt: "Period 4 fills the \\(4s\\), \\(3d\\) and \\(4p\\) subshells. How many elements does it hold?",
        steps: [
          "Orbitals being filled: one \\(4s\\), five \\(3d\\) and three \\(4p\\), nine in all.",
          "Each orbital holds two electrons, so the period holds \\(2 \\times 9\\) elements.",
        ],
        answer: "18 elements, from K to Kr.",
      },
      practiceSet: [
        { prompt: "What did Lothar Meyer plot on the horizontal axis?", answer: "Atomic weight" },
        { prompt: "Name one element whose properties Mendeleev predicted before it was found.", answer: "Gallium (eka-aluminium) or germanium (eka-silicon)" },
        { prompt: "Elements with the same outer configuration sit in the same group or the same period?", answer: "The same group" },
        { prompt: "How many elements are in period 6?", answer: "32 (6s, 4f, 5d and 6p: 16 orbitals)" },
      ],
      pyqExampleId: "957849bd-5c8b-48dc-b567-b27e6dfdb84e", // 2025 — statements NOT true about the periodic table
      traps: [
        {
          title: "Twice the orbitals, not equal to them",
          body: "Period 2 fills four orbitals (2s and three 2p) and holds eight elements. A statement that the number of elements equals the number of orbitals is false; each orbital takes two electrons.",
        },
        {
          title: "Group, not period",
          body: "Elements with similar outer configurations are stacked in one group. Along a period the outer configuration changes at every step, so a statement placing them in the same period is false.",
        },
      ],
    },

    // C2 — IUPAC names for Z > 100 and the block from Z
    {
      kind: "formula" as const,
      slug: "jcper-blocks-naming",
      name: "Names for Z above 100 and the block from Z",
      intuition:
        "A new element gets a temporary name that simply spells out its atomic number, one root per digit, followed by -ium. Its block is the subshell its last electron enters, so writing the configuration tells you the block and the group together.",
      definition:
        "- Digit roots: 0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct, 9 enn; add **-ium** at the end.\n" +
        "- Drop a doubled letter: enn + nil gives **ennil**, and bi or tri before ium gives **bium**, **trium**.\n" +
        "- **Block** = subshell of the last electron: s, p, d or f.\n" +
        "- **Group**: s-block = number of \\(ns\\) electrons; d-block = \\((n-1)d + ns\\) electrons; p-block = \\(10 + ns + np\\) electrons.\n" +
        "- Official names, 113 to 118: Nh (group 13), Fl (14), Mc (15, pnictogen), Lv (16, chalcogen), Ts (17, halogen), Og (18, noble gas).",
      formula: {
        label: "Temporary IUPAC name",
        latex: "\\text{name} = \\text{root}(d_1) + \\text{root}(d_2) + \\text{root}(d_3) + \\text{ium}",
      },
      authoredExample: {
        prompt: "Give the temporary IUPAC name, the block and the group of the element with \\(Z = 116\\).",
        steps: [
          "Digits 1, 1, 6: un + un + hex + ium, so the name is Ununhexium.",
          "Configuration: \\([\\mathrm{Rn}]\\,5f^{14}6d^{10}7s^{2}7p^{4}\\); the last electron enters \\(7p\\), so it is a p-block element.",
          "Group \\(= 10 + 2 + 4 = 16\\).",
        ],
        answer: "Ununhexium, p-block, group 16 (official name livermorium, Lv).",
      },
      selfCheckExample: {
        prompt: "Name the element with \\(Z = 107\\) and find its block and group.",
        steps: [
          "Digits 1, 0, 7: un + nil + sept + ium, so Unnilseptium.",
          "Configuration \\([\\mathrm{Rn}]\\,5f^{14}6d^{5}7s^{2}\\): the last electron enters \\(6d\\), so d-block.",
          "Group \\(= 5 + 2 = 7\\).",
        ],
        answer: "Unnilseptium, d-block, group 7 (bohrium, Bh).",
      },
      practiceSet: [
        { prompt: "Temporary name of \\(Z = 104\\)?", answer: "Unnilquadium" },
        { prompt: "Temporary name of \\(Z = 120\\)?", answer: "Unbinilium" },
        { prompt: "Block of \\(Z = 29\\) and of \\(Z = 92\\)?", answer: "d-block (Cu) and f-block (U)" },
        { prompt: "Which of the new elements 113 to 118 is the halogen?", answer: "Tennessine, Ts (117)" },
      ],
      pyqExampleId: "a5eff8f5-e180-4f5c-b6bb-7c65add41cf2", // 2022 — IUPAC name from [Rn]5f14 6d1 7s2
      traps: [
        {
          title: "Count the electrons before naming",
          body: "When the question gives a configuration, add the core and every electron first. \\([\\mathrm{Rn}]\\) is 86, so a configuration ending \\(5f^{14}6d^{2}7s^{2}\\) is \\(Z = 104\\), not a number read off the last subshell.",
        },
      ],
    },

    // C3 — locating an element from Z, an ion or an oxidation state
    {
      kind: "formula" as const,
      slug: "jcper-position",
      name: "Placing an element from its configuration or an ion",
      intuition:
        "The period is the highest shell in use and the group is set by the outer electrons. If a question hides the element behind an ion or an oxidation state, first recover Z, then write the configuration and read off the position.",
      definition:
        "- Protons \\(Z\\) = electrons + charge of a cation, or electrons − charge of an anion.\n" +
        "- Mass number \\(A = Z + \\text{neutrons}\\).\n" +
        "- **Period** = highest \\(n\\) in the configuration.\n" +
        "- A p-block non-metal's lowest oxidation state is \\(-(8 - \\text{valence electrons})\\): an oxidation state of −3 means five valence electrons.\n" +
        "- The element just above sits one period higher with the same outer \\(ns\\,np\\) pattern; the **diagonal** neighbour is one period down and one group right (B to Si).\n" +
        "- Period 2 elements cannot always show their group valency: O never reaches 6 and F never reaches 7, and N's covalency stops at 4.\n" +
        "- Pd (46) is in period 5; Os, Ir and Pt (76 to 78) are in period 6.",
      formula: {
        label: "Recover Z from an ion",
        latex: "Z = e^{-} + q \\qquad A = Z + n",
        symbols: [
          { symbol: "q", meaning: "charge on the ion, with its sign (−3 for an ion X³⁻)" },
          { symbol: "n", meaning: "number of neutrons" },
        ],
      },
      authoredExample: {
        prompt:
          "An ion \\(\\mathrm{X^{3-}}\\) has 18 electrons and 16 neutrons. Find the mass number of X, its period and group, and its physical state at room temperature.",
        steps: [
          "\\(Z = 18 + (-3) = 15\\), so X is phosphorus.",
          "\\(A = 15 + 16 = 31\\).",
          "Configuration \\([\\mathrm{Ne}]\\,3s^{2}3p^{3}\\): period 3, group \\(10 + 2 + 3 = 15\\).",
          "Phosphorus is a solid at room temperature.",
        ],
        answer: "Mass number 31, period 3, group 15, solid.",
      },
      selfCheckExample: {
        prompt:
          "An element is in period 5, group 14. Write its valence configuration, name it, and give the valence configuration of the element just above it.",
        steps: [
          "Period 5, group 14: two electrons in \\(5s\\) and two in \\(5p\\), with a filled \\(4d\\) below.",
          "That is tin, \\(4d^{10}5s^{2}5p^{2}\\).",
          "The element above is in period 4 with the same pattern: germanium, \\(3d^{10}4s^{2}4p^{2}\\).",
        ],
        answer: "Tin, \\(4d^{10}5s^{2}5p^{2}\\); above it germanium, \\(3d^{10}4s^{2}4p^{2}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{M^{2+}}\\) has 18 electrons. What is M?", answer: "Calcium (\\(Z = 20\\))" },
        { prompt: "A non-metal's lowest oxidation state is −1. How many valence electrons does it have?", answer: "7" },
        { prompt: "Which element lies diagonally next to boron?", answer: "Silicon" },
        { prompt: "Which period holds silver (\\(Z = 47\\))?", answer: "Period 5" },
      ],
      pyqExampleId: "210e8561-5cd3-42e2-bf30-929c27d08a2d", // 2026 — anion A⁻ from its neutrons and electrons
      traps: [
        {
          title: "Adding the charge the wrong way",
          body: "An anion has MORE electrons than protons. For \\(\\mathrm{X^{2-}}\\) with 10 electrons, \\(Z = 8\\), not 12. Write \\(Z = e^{-} + q\\) with the sign of the charge and the direction takes care of itself.",
        },
      ],
    },
  ],
};
