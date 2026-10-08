import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_PTB_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Ionisation Energy and Electronegativity",
  title: "Ionisation Energy, Electron Affinity and Electronegativity",
  oneLineDefinition:
    "How strongly an atom holds its own electrons (ionisation energy), welcomes an extra one (electron affinity) and pulls shared ones (electronegativity) all rise across a period and fall down a group.",
  whyItMatters:
    "First ionisation energy is the trend asked most often: in 2018, 2022 and the 2023 ministry paper, each time as which element has the highest value or which order is right. 2021 asked which group 17 properties fall down the group and which equation is the first electron affinity of chlorine, and 2012 asked the signs of oxygen's first and second electron affinities.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ptb-ionisation-energy",
      name: "First and successive ionisation energies",
      intuition:
        "Ionisation energy is the price of pulling an electron off an atom. It is high when the electron is close to a strongly charged nucleus and low when it is far away and shielded by inner shells. That makes it the mirror image of atomic radius: small atoms hold their electrons tightly.",
      definition:
        "The **first ionisation energy** is the energy needed to remove one electron from each atom in one mole of gaseous atoms. It is always positive (endothermic).\n" +
        "- **Across a period** it **increases**: nuclear charge rises and the atom shrinks. Each noble gas has the highest value in its period; helium has the highest of all.\n" +
        "- **Down a group** it **decreases**: the outer electron is further out and more shielded. Group 1 metals have the lowest values in each period.\n" +
        "- Two small dips: group 13 is lower than group 2 (Be > B, Mg > Al), and group 16 lower than group 15 (N > O).\n" +
        "- **Successive** ionisation energies always rise. A very large jump shows that the next electron must come from a full inner shell, so the number of electrons removed before the jump is the group number.",
      formula: {
        label: "First ionisation energy",
        latex: "\\mathrm{X(g)} \\rightarrow \\mathrm{X^{+}(g)} + e^- \\qquad \\Delta H > 0",
        symbols: [
          { symbol: "\\(\\mathrm{X(g)}\\)", meaning: "a gaseous atom of the element" },
          { symbol: "\\(\\Delta H\\)", meaning: "energy change, in kJ/mol; positive because energy is taken in" },
        ],
      },
      authoredExample: {
        prompt:
          "An element has successive ionisation energies of 578, 1817, 2745 and 11 577 kJ/mol. In which group is it?",
        steps: [
          "Look at the steps between neighbours: \\(1817 - 578 = 1239\\), \\(2745 - 1817 = 928\\), but \\(11\\,577 - 2745 = 8832\\).",
          "The huge jump comes after the third electron (the fourth value is over four times the third): the fourth electron must come from a full inner shell.",
          "So there are 3 outer electrons and the element is in group 13 (it is aluminium).",
        ],
        answer: "Group 13",
      },
      selfCheckExample: {
        prompt: "Which of these elements has the highest first ionisation energy?",
        options: ["Carbon", "Nitrogen", "Fluorine", "Chlorine", "Sulfur"],
        steps: [
          "Carbon, nitrogen and fluorine are in period 2; across the period the value rises, so fluorine is highest of the three.",
          "Chlorine and sulfur are in period 3, one shell further out, so they are lower than fluorine.",
          "Chlorine tempts students who mix up ionisation energy with electron affinity, where chlorine is the record holder.",
        ],
        answer: "(C) Fluorine",
      },
      practiceSet: [
        { prompt: "Put sodium, magnesium and aluminium in order of decreasing first ionisation energy.", answer: "Mg > Al > Na", method: "Rises across the period, with the group 13 dip below group 2" },
        { prompt: "Which element has the highest first ionisation energy of all?", answer: "Helium" },
        { prompt: "Between which two successive ionisation energies is the large jump for a group 2 element?", answer: "Between the 2nd and the 3rd" },
      ],
      traps: [
        {
          title: "The noble gas, not the halogen, has the highest ionisation energy in a period",
          body: "Ionisation energy keeps rising across a period all the way to group 18. Halogens are high but each noble gas is higher. Down a group it falls, so an element lower in the same group always has the smaller value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ptb-electron-affinity",
      name: "First and second electron affinity",
      intuition:
        "Electron affinity is the energy change when a neutral gaseous atom accepts an electron. A non-metal atom attracts the incoming electron towards its nucleus, so energy is released. But a negative ion already repels electrons, so forcing a second electron onto it costs energy.",
      definition:
        "The **first electron affinity** is the enthalpy change when each atom in one mole of gaseous atoms gains one electron to form 1− ions.\n" +
        "- For most non-metals it is **negative** (exothermic). Halogens have the most exothermic values in each period.\n" +
        "- **Chlorine** has the most exothermic first electron affinity of all, slightly more than fluorine: fluorine is so small that its own electrons repel the newcomer.\n" +
        "- The **second electron affinity** (adding an electron to a 1− ion) is always **positive** (endothermic), because the ion repels the electron.\n" +
        "- Oxygen: the first electron affinity is about −141 kJ/mol (mildly exothermic); the second is large and positive. Forming \\(\\mathrm{O^{2-}}\\) from O is endothermic overall.\n" +
        "- Do not confuse it with ionisation energy, which removes an electron.",
      formula: {
        label: "First and second electron affinity",
        latex: "\\mathrm{X(g)} + e^- \\rightarrow \\mathrm{X^{-}(g)} \\qquad \\mathrm{X^{-}(g)} + e^- \\rightarrow \\mathrm{X^{2-}(g)}",
        symbols: [
          { symbol: "first equation", meaning: "first electron affinity: one gaseous atom gains one electron" },
          { symbol: "second equation", meaning: "second electron affinity: the gaseous 1− ion gains another" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the equations for the first and second electron affinities of sulfur, and give the sign of each.",
        steps: [
          "First: \\(\\mathrm{S(g)} + e^- \\rightarrow \\mathrm{S^{-}(g)}\\). The nucleus attracts the electron, so energy is released: negative.",
          "Second: \\(\\mathrm{S^{-}(g)} + e^- \\rightarrow \\mathrm{S^{2-}(g)}\\). The 1− ion repels the electron, so energy must be supplied: positive.",
          "Both use single gaseous particles, one electron at a time; never the solid element or \\(\\mathrm{S_8}\\) molecules.",
        ],
        answer: "First electron affinity negative (exothermic); second positive (endothermic)",
      },
      selfCheckExample: {
        prompt: "Which statement about electron affinities is correct?",
        options: [
          "The second electron affinity of oxygen is endothermic",
          "The first electron affinity of every element is exothermic",
          "Fluorine has the most exothermic first electron affinity of all the elements",
          "Electron affinity is the energy needed to remove an electron from a gaseous atom",
          "The first electron affinity of bromine refers to one mole of \\(\\mathrm{Br_2}\\) molecules each gaining two electrons",
        ],
        steps: [
          "Adding an electron to \\(\\mathrm{O^-}\\) means pushing it onto a negative ion, which repels it, so the second electron affinity is endothermic. A is correct.",
          "B is wrong: noble gases, for example, do not release energy. C is wrong: chlorine is the most exothermic.",
          "D describes ionisation energy. E is wrong because electron affinity is defined for single gaseous atoms.",
        ],
        answer: "(A) The second electron affinity of oxygen is endothermic",
      },
      practiceSet: [
        { prompt: "Is the first electron affinity of chlorine exothermic or endothermic?", answer: "Exothermic" },
        { prompt: "Why is every second electron affinity endothermic?", answer: "The electron is added to a negative ion, which repels it" },
        { prompt: "Which halogen has the most exothermic first electron affinity?", answer: "Chlorine" },
      ],
      traps: [
        {
          title: "Second electron affinities are endothermic",
          body: "The first electron affinity of oxygen or sulfur is exothermic, but the second is strongly endothermic. Options giving both as exothermic, or the first as very exothermic and the second as exothermic too, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-electronegativity",
      name: "Electronegativity and its values",
      intuition:
        "In a covalent bond two atoms share a pair of electrons, but not always equally. The atom whose nucleus pulls harder on that shared pair is the more electronegative one. Like ionisation energy, the pull is strongest for small atoms with a high nuclear charge, so fluorine wins.",
      definition:
        "**Electronegativity** is the ability of an atom in a covalent bond to attract the shared pair of electrons. It is measured on the **Pauling scale**, which has no units.\n" +
        "- It **increases** across a period and **decreases** down a group.\n" +
        "- **Fluorine** is the most electronegative element (about 4.0), then oxygen, then chlorine and nitrogen.\n" +
        "- The least electronegative elements are the group 1 metals at the bottom of the table.\n" +
        "- A large difference in electronegativity gives a polar or ionic bond; equal values give a non-polar bond.",
      table: {
        columns: ["Element", "Pauling value", "Where it sits"],
        rows: [
          { cells: ["Fluorine", "3.98", "Top of group 17: the highest of all"] },
          { cells: ["Oxygen", "3.44", "Group 16, period 2: second highest"] },
          { cells: ["Chlorine", "3.16", "Group 17, period 3"] },
          { cells: ["Nitrogen", "3.04", "Group 15, period 2"] },
          { cells: ["Carbon", "2.55", "Group 14, period 2"] },
          { cells: ["Hydrogen", "2.20", "Slightly below carbon"] },
          { cells: ["Sodium", "0.93", "Group 1, period 3"] },
          { cells: ["Caesium", "0.79", "Group 1, period 6: among the lowest"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these elements is the most electronegative?",
        options: ["Chlorine", "Oxygen", "Nitrogen", "Sulfur", "Bromine"],
        steps: [
          "Oxygen (3.44) is above chlorine (3.16) and nitrogen (3.04).",
          "Sulfur and bromine are lower down their groups, so they are less electronegative than oxygen and chlorine.",
          "Chlorine tempts because halogens are 'the electronegative group', but only fluorine beats oxygen.",
        ],
        answer: "(B) Oxygen",
      },
      practiceSet: [
        { prompt: "Which is more electronegative, carbon or hydrogen?", answer: "Carbon, slightly" },
        { prompt: "How does electronegativity change down group 17?", answer: "It decreases" },
        { prompt: "Which element in period 3 has the lowest electronegativity?", answer: "Sodium" },
      ],
      traps: [
        {
          title: "Oxygen is more electronegative than chlorine",
          body: "Fluorine is first and oxygen second. Chlorine and nitrogen come after oxygen. Picking chlorine because it is a halogen is the usual slip.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-trend-summary",
      name: "Summary of the periodic trends across a period and down a group",
      intuition:
        "Every trend in this chapter comes from two causes. Across a period, the nuclear charge rises while the shell stays the same, so electrons are held more tightly. Down a group, a new shell is added each time, so the outer electrons are further away and more shielded. Work out which cause applies, and the direction of any trend follows.",
      definition:
        "- **Metallic character** (the ease of losing electrons) runs opposite to ionisation energy and electronegativity.\n" +
        "- Metals get **more reactive down** groups 1 and 2; halogens get **less reactive down** group 17.\n" +
        "- The most vigorous reactions are between a metal at the bottom left and a non-metal at the top right, such as caesium with fluorine. Noble gases react with almost nothing.\n" +
        "- Melting and boiling points of the halogens and the noble gases **rise** down the group (bigger molecules or atoms, stronger London forces); those of the group 1 metals **fall**.",
      table: {
        columns: ["Property", "Across a period (left to right)", "Down a group", "Main reason"],
        rows: [
          { cells: ["Atomic radius", "Decreases", "Increases", "Nuclear charge across; extra shells down"] },
          { cells: ["First ionisation energy", "Increases (small dips at groups 13 and 16)", "Decreases", "How tightly the outer electron is held"] },
          { cells: ["Electronegativity", "Increases", "Decreases", "Pull of the nucleus on shared electrons"] },
          { cells: ["First electron affinity", "Generally more exothermic", "Less exothermic (from chlorine down)", "Pull of the nucleus on an added electron"] },
          { cells: ["Metallic character", "Decreases", "Increases", "Ease of losing electrons"] },
          { cells: ["Reactivity of metals (groups 1, 2)", "Group 1 more reactive than group 2", "Increases", "Ease of losing electrons"] },
          { cells: ["Reactivity of halogens (group 17)", "Halogens most reactive in their period", "Decreases", "Ease of gaining an electron"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which of these properties INCREASE going down group 1? 1 atomic radius; 2 first ionisation energy; 3 reactivity with water.",
        options: ["1 only", "2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
        steps: [
          "Down the group each atom has an extra shell, so the radius increases (1 is true).",
          "The outer electron is further out and more shielded, so it is easier to remove: ionisation energy decreases (2 is false).",
          "Easier electron loss means more vigorous reaction with water (3 is true).",
        ],
        answer: "(E) 1 and 3 only",
      },
      practiceSet: [
        { prompt: "Of lithium, caesium, fluorine and chlorine, which metal and non-metal react most violently together?", answer: "Caesium and fluorine", method: "Most reactive metal (bottom left) with most reactive non-metal (top right)" },
        { prompt: "What happens to the melting points of the halogens down the group?", answer: "They increase" },
        { prompt: "Name two properties that change in the opposite direction to metallic character.", answer: "Ionisation energy and electronegativity" },
      ],
      traps: [
        {
          title: "Metal reactivity rises down a group; halogen reactivity falls",
          body: "Metals react by losing electrons, which gets easier further down, so caesium is more reactive than lithium. Halogens react by gaining electrons, which gets harder further down, so fluorine is more reactive than iodine. Melting points of the halogens rise down the group while their electronegativity and ionisation energy fall.",
        },
      ],
    },
  ],
};
