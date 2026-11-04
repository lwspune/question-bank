import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 2 Periodic Classification of
 * Elements. Statements checked against the Balbharati text; most-asked years
 * from the board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Periodic Classification of Elements",
  chapterSlug: "periodic-classification-of-elements",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Dobereiner's triads",
      text: "Groups of three elements with similar chemical properties, in increasing order of atomic mass. The atomic mass of the middle element is about the mean of the other two. Example: Li, Na, K. Not all elements fitted into triads.",
    },
    {
      term: "Newlands' law of octaves",
      text: "With elements in increasing order of atomic mass, every eighth element has properties similar to the first (Na is like Li). The law worked only up to calcium.",
    },
    {
      term: "Mendeleev's periodic law",
      text: "Properties of elements are a periodic function of their **atomic masses**. Vertical columns are groups; horizontal rows are periods.",
    },
    {
      term: "Merits of Mendeleev's table",
      text: "Some atomic masses were corrected (beryllium 14.09 to 9.4). Vacant places were left for undiscovered elements: eka-boron, eka-aluminium and eka-silicon, later found as scandium, gallium and germanium. Noble gases fitted in a new zero group.",
    },
    {
      term: "Demerits of Mendeleev's table",
      text: "Ambiguity in the order of cobalt and nickel. No place for isotopes (same properties, different atomic masses). Rise in atomic mass not uniform, so new elements could not be predicted. Position of hydrogen not fixed.",
    },
    {
      term: "Modern periodic law",
      text: "Properties of elements are a periodic function of their **atomic numbers**. Moseley (1913) showed atomic number is more fundamental than atomic mass.",
    },
    {
      term: "Structure of the modern periodic table",
      text: "7 horizontal rows (periods 1 to 7) and 18 vertical columns (groups 1 to 18). Lanthanide and actinide series are shown separately at the bottom. 118 places in all.",
    },
    {
      term: "Blocks",
      text: "s-block: groups 1 and 2. p-block: groups 13 to 18. d-block: groups 3 to 12 (transition elements). f-block: lanthanides and actinides.",
    },
    {
      term: "Zig-zag line",
      text: "Drawn in the p-block. Metals lie to its left, nonmetals to its right, and metalloids (such as silicon) along its border.",
    },
    {
      term: "Groups and valence electrons",
      text: "Elements in a group have the same number of valence electrons, so they show similarity and gradation in properties. Group 1: alkali metals, group 2: alkaline earth metals, group 17: halogens, group 18: noble gases.",
    },
    {
      term: "Periods and shells",
      text: "Elements with the same number of shells occupied by electrons belong to the same period. A new period starts a new shell. Shell capacity is \\(2n^2\\): K 2, L 8, M 18.",
    },
    {
      term: "Valency",
      text: "Decided by the number of valence electrons. It is the same down a group. Across a period it rises from 1 to 4 and then falls back to 0.",
    },
    {
      term: "Atomic radius",
      text: "The distance between the nucleus of the atom and its outermost shell, in picometre (pm). It **decreases** from left to right in a period and **increases** down a group.",
    },
    {
      term: "Metallic and nonmetallic character",
      text: "Down a group: metallic character (electropositivity) increases, electronegativity decreases. Left to right in a period: electronegativity and nonmetallic character increase.",
    },
  ],
  formulas: [
    {
      label: "Dobereiner's triad",
      latex: "\\text{mass of middle element} \\approx \\frac{A_1 + A_3}{2} \\qquad \\text{Na} = \\frac{6.9 + 39.1}{2} = 23",
    },
    { label: "Electron capacity of a shell", latex: "2n^2: \\quad K = 2,\\ L = 8,\\ M = 18,\\ N = 32" },
    {
      label: "Group from valence electrons",
      latex: "\\text{groups 1, 2: group} = \\text{valence electrons} \\qquad \\text{groups 13 to 18: group} = 10 + \\text{valence electrons}",
    },
  ],
  derivations: [
    {
      title: "Give reason: atomic radius decreases from left to right in a period",
      steps: [
        "Across a period the atomic number increases by one, so the nuclear charge rises by one unit.",
        "The extra electron enters the **same** outermost shell.",
        "The larger nuclear charge pulls the electrons closer, so the size of the atom decreases.",
      ],
    },
    {
      title: "Give reason: atomic radius increases down a group",
      steps: [
        "Going down a group, a new shell is added at each step.",
        "The distance between the outermost electrons and the nucleus increases.",
        "So the atomic size increases in spite of the increased nuclear charge.",
      ],
    },
    {
      title: "Give reason: elements in the same group have the same valency",
      steps: [
        "Valency is decided by the number of valence electrons.",
        "All elements of a group have the same number of electrons in their outermost shell.",
        "So they have the same valency (for example, every alkali metal has 1).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Atomic radius: trend in a period or a group (give reason), biggest and smallest atom", marks: 2, years: [2026, 2025, 2024, 2022, 2019] },
    { topic: "From an electronic configuration (such as 2, 8, 2): atomic number, group and period", years: [2026, 2025, 2023, 2020] },
    { topic: "Mendeleev's periodic table: periodic law, features, merits or demerits", marks: 3, years: [2026, 2022, 2020, 2019, 2018, 2016] },
    { topic: "Modern periodic table: law, periods and groups, blocks, where metals and nonmetals lie", marks: 1, years: [2026, 2025, 2024, 2023, 2016] },
    { topic: "Dobereiner's triads and Newlands' law of octaves", marks: 2, years: [2024, 2019, 2018] },
    { topic: "Valency and group: same group, same valency (give reason)", marks: 1, years: [2025, 2023, 2022, 2020, 2016] },
    { topic: "Name the element from a description (most electronegative, metalloids, smallest atom)", marks: 3, years: [2026, 2025, 2024, 2019] },
  ],
  mistakes: [
    {
      title: "Mixing up the two periodic laws",
      body: "Mendeleev: atomic **masses**. Modern: atomic **numbers**. A one-mark blank often turns on this word.",
    },
    {
      title: "Wrong group for a p-block element",
      body: "Aluminium is 2, 8, 3: three shells so period 3, but group **13**, not group 3. For groups 13 to 18, add 10 to the valence electrons.",
    },
    {
      title: "Thinking more electrons make a bigger atom across a period",
      body: "Across a period the electrons go into the same shell while the nuclear charge rises, so the atom gets smaller.",
    },
    {
      title: "Saying the modern table fixed hydrogen",
      body: "The modern table removed most of Mendeleev's drawbacks, but the position of hydrogen is still ambiguous.",
    },
    {
      title: "Putting nonmetals in the s-block",
      body: "Apart from hydrogen, the s-block is all metals. Nonmetals and metalloids are in the p-block.",
    },
  ],
};

export default sheet;
