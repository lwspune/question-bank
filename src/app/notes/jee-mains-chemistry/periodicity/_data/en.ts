import type { SubtopicNote } from "@/app/notes/_types";

export const EN_PER_NOTE: SubtopicNote = {
  subtopicName: "Electronegativity and Metallic Character",
  title: "Electronegativity and Metallic Character",
  oneLineDefinition:
    "Electronegativity is an atom's pull on a shared electron pair; it rises across a period and falls down a group, and metallic character runs the opposite way, with metalloids along the border between them.",
  whyItMatters:
    "Nineteen PYQs, all multiple choice, and four from 2026. Six rank electronegativity on the Pauling scale; eight rank metallic character or test why it changes; five classify elements as metals, non-metals or metalloids, or pick out a diagonal pair.",
  concepts: [
    // C1 — electronegativity
    {
      kind: "reference" as const,
      slug: "jcper-electronegativity",
      name: "Electronegativity on the Pauling scale",
      intuition:
        "Electronegativity tracks the same pull as ionization enthalpy: a small atom with a large nuclear charge holds shared electrons hardest. So it rises across a period, falls down a group, and fluorine tops the scale. It is not a fixed property of an isolated atom; it depends on what the atom is bonded to.",
      definition:
        "- **Across a period**: increases. **Down a group**: decreases.\n" +
        "- Fluorine is the most electronegative element (4.0), then oxygen (3.5).\n" +
        "- Electronegativity is not measured directly and is **not constant**: it varies with the atom the element is bonded to and with its oxidation state.\n" +
        "- The more electronegative atom takes the negative oxidation state: in \\(\\mathrm{OF_2}\\) oxygen is +2, in \\(\\mathrm{Na_2O}\\) it is −2.\n" +
        "- Mg (1.2) is below Al (1.5); an order that puts Al below Mg is wrong.",
      table: {
        columns: ["Series", "Pauling electronegativity", "Trend"],
        rows: [
          { cells: ["Period 2", "Li 1.0, Be 1.5, B 2.0, C 2.5, N 3.0, O 3.5, F 4.0", "Rises across"] },
          { cells: ["Period 3", "Na 0.9, Mg 1.2, Al 1.5, Si 1.8, P 2.1, S 2.5, Cl 3.0", "Rises across"] },
          { cells: ["Group 1", "Li 1.0, Na 0.9, K 0.8, Rb 0.8, Cs 0.7", "Falls down"] },
          { cells: ["Group 17", "F 4.0, Cl 3.0, Br 2.8, I 2.5, At 2.2", "Falls down"] },
          { cells: ["Group 13", "B 2.0, Al 1.5, Ga 1.6, In 1.7, Tl 1.8", "Falls from B to Al, then rises slightly"], noteAmber: "Poor shielding by d and f electrons again: Ga, In and Tl are above Al." },
        ],
        caption: "Values from the Pauling scale; the trend, not the second decimal, is what the questions test.",
      },
      selfCheckExample: {
        prompt: "Arrange Mg, Al, P and Cl in increasing electronegativity.",
        steps: [
          "All four are in period 3, so the order follows position from left to right.",
          "Mg 1.2, Al 1.5, P 2.1, Cl 3.0.",
        ],
        answer: "Mg < Al < P < Cl",
      },
      practiceSet: [
        { prompt: "Oxidation state of oxygen in \\(\\mathrm{OF_2}\\)?", answer: "+2" },
        { prompt: "Which is more electronegative, Be or Mg?", answer: "Be (1.5 against 1.2)" },
        { prompt: "Does an atom's electronegativity depend on the atom it is bonded to?", answer: "Yes" },
        { prompt: "Is Al < Si < C < N a correct electronegativity order?", answer: "Yes (1.5, 1.8, 2.5, 3.0)" },
      ],
      pyqExampleId: "570e94a7-bbcb-4808-aa6a-a19a319a9d55", // 2025 — order from period 2 configurations
      traps: [
        {
          title: "Electronegativity is not a constant",
          body: "Unlike ionization enthalpy, electronegativity belongs to an atom in a bond. The same element has different values in different compounds, so a statement that it depends on the bonded atom is correct.",
        },
      ],
    },

    // C2 — metallic character
    {
      kind: "reference" as const,
      slug: "jcper-metallic",
      name: "Metallic character and reactivity",
      intuition:
        "A metal is an element that loses electrons easily. That needs a low ionization enthalpy, so metallic character is highest at the bottom left of the table and lowest at the top right. Reactivity is different: it is high at both ends of a period, because the left end loses electrons easily and the right end gains them easily.",
      definition:
        "- **Across a period**: metallic character falls, non-metallic character rises.\n" +
        "- **Down a group**: metallic character rises.\n" +
        "- The cause is the rise in ionization enthalpy across a period and the electron gain enthalpy becoming more negative.\n" +
        "- Reactivity is highest at the two ends of a period (alkali metals and halogens), lowest in the middle; it does not rise steadily from group 1 to group 18.\n" +
        "- Oxides follow the same line: group 1 oxides are basic, group 17 oxides are acidic.",
      table: {
        columns: ["Compare", "More metallic", "Reason"],
        rows: [
          { cells: ["Na and Mg", "Na", "Left of Mg in period 3"] },
          { cells: ["Mg and Al", "Mg", "Left of Al in period 3"] },
          { cells: ["Be and Mg", "Mg", "Below Be in group 2"] },
          { cells: ["K and Ca", "K", "Left of Ca in period 4"] },
          { cells: ["Be and Si", "Be", "Si is a metalloid; Be is a metal"] },
          { cells: ["N, P, O, S, Cl, F", "P most, F least", "P is lowest and furthest left; F is top right"] },
        ],
        caption: "Down and to the left means more metallic.",
      },
      selfCheckExample: {
        prompt: "Arrange Al, K, Ca and B in decreasing metallic character.",
        steps: [
          "K is left of Ca in period 4: K > Ca.",
          "Ca (period 4, group 2) is more metallic than Al (period 3, group 13).",
          "B is above Al and is a metalloid: least metallic.",
        ],
        answer: "K > Ca > Al > B",
      },
      practiceSet: [
        { prompt: "Most metallic of Li, Na, K?", answer: "K" },
        { prompt: "Is K > Al > Mg > B a correct order of metallic character?", answer: "No; Mg is more metallic than Al" },
        { prompt: "Does chemical reactivity rise steadily from group 1 to group 18?", answer: "No; it is highest at both ends" },
        { prompt: "Valence electrons of the least metallic of N, P, O, S, Cl, F?", answer: "7 (fluorine)" },
      ],
      pyqExampleId: "3b7e3548-be93-4a77-898a-69c4bfd4ba42", // 2022 — decreasing metallic character
      traps: [
        {
          title: "Atomic radius is not always larger than ionic radius",
          body: "A statement pairing a correct metallic order with \"atomic radius is always greater than ionic radius\" is half false: an anion is larger than its atom. Judge each statement on its own.",
        },
      ],
    },

    // C3 — metals, non-metals, metalloids and diagonal pairs
    {
      kind: "reference" as const,
      slug: "jcper-metalloids",
      name: "Metals, non-metals, metalloids and diagonal pairs",
      intuition:
        "A zig-zag line in the p-block separates metals on the left from non-metals on the right. The elements along the line, the metalloids, are in between. Separately, an element in period 2 often behaves like the element one row down and one column right, because the two have similar size and charge density.",
      definition:
        "- **Metalloids**: B, Si, Ge, As, Sb, Te.\n" +
        "- Every d-block element is a metal; the p-block has metals, metalloids and non-metals.\n" +
        "- Non-metals have higher ionization enthalpy and higher electronegativity than metals.\n" +
        "- A highly reactive metal and a highly reactive non-metal give an **ionic** compound.\n" +
        "- Metal oxides are generally basic and non-metal oxides generally acidic.\n" +
        "- **Diagonal pairs**: Li–Mg, Be–Al, B–Si. Li–Na is a group pair, not a diagonal one.",
      table: {
        columns: ["Element", "Z", "Group", "Class"],
        rows: [
          { cells: ["B", "5", "13", "Metalloid"] },
          { cells: ["Si", "14", "14", "Metalloid"] },
          { cells: ["Ge", "32", "14", "Metalloid"] },
          { cells: ["As", "33", "15", "Metalloid"] },
          { cells: ["Sb", "51", "15", "Metalloid"] },
          { cells: ["Te", "52", "16", "Metalloid"] },
          { cells: ["I", "53", "17", "Non-metal"] },
          { cells: ["Bi", "83", "15", "Metal"] },
          { cells: ["Pb", "82", "14", "Metal"] },
        ],
        caption: "The metalloids run diagonally from B down to Te; Bi and Pb below them are metals.",
      },
      selfCheckExample: {
        prompt: "Classify the elements with \\(Z = 5\\), \\(34\\) and \\(56\\).",
        steps: [
          "Z = 5 is boron, group 13, on the dividing line: metalloid.",
          "Z = 34 is selenium, group 16, right of the line: non-metal.",
          "Z = 56 is barium, group 2: metal.",
        ],
        answer: "Metalloid, non-metal, metal.",
      },
      practiceSet: [
        { prompt: "Which is a metalloid: Sc, Pb, Bi or Te?", answer: "Te" },
        { prompt: "Diagonal partner of Be?", answer: "Al" },
        { prompt: "Do non-metals have lower ionization enthalpy than metals?", answer: "No; higher" },
        { prompt: "Are there non-metals in the d-block?", answer: "No; all d-block elements are metals" },
      ],
      pyqExampleId: "5db59cec-df9e-4844-9eb9-3c091f4de03d", // X, Y, Z with atomic numbers 33, 53 and 83
      traps: [
        {
          title: "Bismuth is a metal",
          body: "As and Sb in group 15 are metalloids, but Bi below them is a metal. Group 15 runs the whole range: N and P are non-metals, As and Sb metalloids, Bi a metal.",
        },
      ],
    },
  ],
};
