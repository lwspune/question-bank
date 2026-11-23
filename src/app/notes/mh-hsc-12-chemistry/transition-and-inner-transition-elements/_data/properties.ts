import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Common Properties of d-Block Elements",
  title: "Common Properties, Catalysts, Interstitial Compounds and Alloys",
  oneLineDefinition:
    "The physical and chemical properties all d-block elements share, how the 3d series differs from the 4d and 5d series, transition metals as catalysts, interstitial compounds, and the alloys the textbook names with their uses.",
  whyItMatters:
    "11 questions. Eight were set in board papers: the properties of interstitial compounds (2023, 2025 and 2026), the classification of alloys (2023), the uses of bronze (2024) and the metals in brass (2025), the alloy used in the Fischer Tropsch process with the conditions for colour (2024), the spin-only moment of Fe²⁺ (2024), and why Sc³⁺ salts are colourless while Mn³⁺ salts are coloured (2026). The textbook adds nichrome, the stable state of ruthenium, and the 3d, 4d and 5d series compared.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscctr-common-props",
      name: "Common properties and catalytic activity",
      intuition:
        "Almost every d-block element is a hard, shiny, high-melting metal that conducts well, shows several oxidation states and forms coloured compounds. That ability to switch between oxidation states is also what makes them good catalysts: a metal ion can take an electron in one step of a reaction and give it back in the next.",
      definition:
        "- **Physical (8.8):** lustrous and shining; hard, with high density; high melting and boiling points; good electrical and thermal conductors; high tensile strength and malleability; form alloys with transition and non-transition elements; many metals and compounds are paramagnetic; most are efficient catalysts.\n" +
        "- **Chemical (8.8):** electropositive metals; variable valencies; coloured salts and complexes; good reducing agents; insoluble oxides and hydroxides; iron, cobalt, copper, molybdenum and zinc are biologically important.\n" +
        "- **3d against 4d and 5d:** the second and third rows stabilise higher oxidation states, so Mo(V) and W(VI) compounds are more stable than Cr(VI) and Mn(VII). The highest state of the first row is +7; the heavier rows reach +8, as in \\(\\text{RuO}_4\\) and \\(\\text{OsO}_4\\).\n" +
        "- **Why they are catalysts (8.6.6):** they take part in oxidation-reduction steps by changing their oxidation states. In homogeneous catalysis the metal ion forms unstable intermediates; in heterogeneous catalysis the metal provides a surface for the reactants.\n" +
        "- The conditions for the colour of an ion and the spin-only moment are taught on the page on trends in atomic properties.",
      table: {
        columns: ["Catalyst", "Reaction it speeds up"],
        rows: [
          { cells: ["MnO₂", "Decomposition of KClO₃"] },
          { cells: ["Mo/Fe", "Manufacture of ammonia by Haber's process"] },
          {
            cells: ["Co-Th alloy", "Fischer Tropsch process, in the synthesis of gasoline"],
            pyqExampleId: "dfa7a5b7-3db3-4713-964e-7210fdd7d0d6",
            noteAmber: "Board 2024 asked the alloy used in the Fischer Tropsch process, with the conditions for colour.",
          },
          { cells: ["Finely divided Ni", "Hydrogenation of ethene to ethane at 140 °C; hardening inedible oils into fat for margarine"] },
          { cells: ["Platinised asbestos", "SO₂ and oxygen to SO₃ in the contact process for sulphuric acid"] },
          { cells: ["Fe-Cr catalyst", "Carbon monoxide and steam to carbon dioxide and hydrogen at about 500 °C"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why are transition metals and their compounds good catalysts?",
        steps: [
          "They show variable oxidation states, so they can take part in the oxidation-reduction steps of a reaction.",
          "In homogeneous catalysis the metal ion forms unstable intermediates; in heterogeneous catalysis the metal offers a surface on which the reactants meet.",
        ],
        answer: "Because of their variable oxidation states, and because they form unstable intermediates or provide a surface",
      },
      practiceSet: [
        { prompt: "What does the metal provide in heterogeneous catalysis?", answer: "A surface on which the reactants react" },
        { prompt: "Which is more stable, a Cr(VI) or a W(VI) compound?", answer: "The W(VI) compound: heavier rows stabilise higher oxidation states" },
        { prompt: "What is the highest oxidation state shown by the first transition series?", answer: "+7" },
        { prompt: "Name two biologically important transition metals.", answer: "Any two of iron, cobalt, copper, molybdenum and zinc" },
      ],
      pyqExampleId: "dfa7a5b7-3db3-4713-964e-7210fdd7d0d6",
      traps: [
        {
          title: "Naming pure cobalt for the Fischer Tropsch process",
          body: "The textbook names a Co-Th (cobalt-thorium) alloy. Write both metals.",
        },
        {
          title: "Giving +8 for the first row",
          body: "The first row stops at +7 (manganese). +8 belongs to the heavier rows, as in RuO₄ and OsO₄.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-interstitial",
      name: "Interstitial compounds",
      intuition:
        "A transition metal crystal has small gaps between its atoms. Very small atoms such as hydrogen, carbon and nitrogen can slip into these gaps and get trapped. The metal keeps its shape and most of its nature, but it becomes harder, melts at a higher temperature, and becomes less dense.",
      definition:
        "- When small atoms like hydrogen, carbon or nitrogen are trapped in the interstitial spaces of the crystal lattice of a transition metal, the compounds formed are called **interstitial compounds**. Sometimes sulphides and oxides are also trapped.\n" +
        "- **Steel and cast iron** are interstitial compounds of carbon and iron. Carbon reduces the malleability and ductility of iron and increases its tenacity.\n" +
        "- Tungsten carbide is used for cutting tools; iron carbide in the manufacture of steel.\n" +
        "- A 'properties' question wants four points from the textbook's list in the table below.",
      table: {
        columns: ["Property", "What the textbook says"],
        rows: [
          {
            cells: ["Hardness and conduction", "Hard, and good conductors of heat and electricity"],
            pyqExampleId: "a3e1a7c3-4145-49b8-81b0-4a67b382df77",
            noteAmber: "Board 2026 asked the properties of interstitial compounds; 2025 asked for four of them.",
          },
          { cells: ["Chemical properties", "Similar to those of the parent metal"] },
          { cells: ["Melting point", "Higher than that of the pure metal"] },
          { cells: ["Density", "Less than that of the parent metal"] },
          { cells: ["Metallic carbides", "Chemically inert and as hard as diamond"] },
          { cells: ["Hydrides", "Used as powerful reducing agents"] },
        ],
      },
      practiceSet: [
        { prompt: "Name two interstitial compounds of iron.", answer: "Steel and cast iron" },
        { prompt: "What is tungsten carbide used for?", answer: "Cutting tools" },
        { prompt: "How does carbon change the properties of iron?", answer: "It reduces malleability and ductility and increases tenacity" },
        { prompt: "Name three small atoms that form interstitial compounds.", answer: "Hydrogen, carbon and nitrogen" },
      ],
      pyqExampleId: "a3e1a7c3-4145-49b8-81b0-4a67b382df77",
      traps: [
        {
          title: "Saying an interstitial compound is a new kind of substance",
          body: "The textbook says their chemical properties are similar to the parent metal. Only the metallic carbides are called chemically inert.",
        },
        {
          title: "Getting the density and melting point the wrong way round",
          body: "The melting point is HIGHER than the pure metal, but the density is LESS. Students often write both as higher.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscctr-alloys",
      name: "Alloys and their uses",
      intuition:
        "Transition metal atoms are of similar size, so the atoms of one metal can sit at random among the atoms of another without straining the crystal. That is why these metals form alloys so readily, and an alloy can be made tougher, harder or more resistant to corrosion than the metals in it.",
      definition:
        "- In an alloy, atoms of one metal are distributed randomly in the lattice of another metal. Metals with **similar radii and similar properties** readily form alloys.\n" +
        "- The textbook classifies alloys as **ferrous** and **non-ferrous**.\n" +
        "- **Ferrous alloys:** atoms of other elements distributed in iron, iron being the larger part; for example nickel steel, chromium steel and stainless steel.\n" +
        "- **Non-ferrous alloys:** a transition metal other than iron mixed with a non-transition element; for example brass, an alloy of copper and zinc.",
      table: {
        columns: ["Alloy", "Made of", "Type or use (textbook)"],
        rows: [
          {
            cells: ["Brass", "Copper and zinc", "The textbook's example of a non-ferrous alloy"],
            pyqExampleId: "81c55156-5043-468d-ba27-61ae14b7f4a2",
            noteAmber: "Board 2025 asked the metals in brass; 2024 asked the uses of bronze.",
          },
          { cells: ["Bronze", "Copper and tin", "Tough, strong and corrosion resistant: statues, medals and trophies"] },
          { cells: ["Cupra-nickel", "Copper and nickel", "Machinery parts of marine ships and boats, such as marine condenser tubes"] },
          { cells: ["Nichrome", "Nickel and chromium, 80 : 20", "Developed for gas turbine engines"] },
          { cells: ["Stainless steel", "Iron with other metals (ferrous)", "Outer fuselage of ultra-high speed aircraft"] },
          { cells: ["Titanium alloys", "Titanium with other metals", "Withstand stress at high temperature: ultrahigh speed flight, fireproof bulkheads, exhaust shrouds"] },
        ],
      },
      practiceSet: [
        { prompt: "Into which two classes does the textbook divide alloys?", answer: "Ferrous and non-ferrous" },
        { prompt: "Which alloy is used for marine condenser tubes?", answer: "Cupra-nickel" },
        { prompt: "Why do transition metals readily form alloys with each other?", answer: "Their atoms have similar radii and similar properties" },
        { prompt: "Give one example of a ferrous alloy.", answer: "Nickel steel, chromium steel or stainless steel" },
      ],
      pyqExampleId: "81c55156-5043-468d-ba27-61ae14b7f4a2",
      traps: [
        {
          title: "Mixing up brass and bronze",
          body: "Brass is copper with zinc; bronze is copper with tin. One letter decides the mark, so learn them as a pair.",
        },
        {
          title: "Classifying alloys some other way",
          body: "The textbook's classification is ferrous and non-ferrous, with examples of each. Answer the board question in those terms.",
        },
      ],
    },
  ],
};
