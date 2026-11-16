import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_DF_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "General Properties of Transition Elements",
  title: "General Properties of Transition Elements",
  oneLineDefinition:
    "What makes an element a transition element, why the 3d metals melt high and show many oxidation states, what their electrode potentials say, how their oxides change from basic to acidic, and why they are good catalysts.",
  whyItMatters:
    "Six NEET questions from 2023 to 2026. One asks why 3d metals have high melting points (Re-NEET 2026), one why Cu²⁺ salts are more stable than Cu⁺ salts in water (2023), one why the Mn³⁺/Mn²⁺ potential is so positive (2024), and one picks the incorrect statements about transition metal oxides (2023). Two match catalysts with the processes they are used in (2025 and NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchdf-configuration",
      name: "Electronic configuration and metallic properties",
      intuition:
        "In the d-block the new electron goes into the d subshell of the shell below the outermost one. The outer s electrons stay much the same, so the metals of a series are alike. Because the (n−1)d and ns electrons are close in energy, both kinds can take part in bonding, and this one fact explains the high melting points, the many oxidation states and the coloured, magnetic ions.",
      definition:
        "- A **transition element** has an incompletely filled d subshell in its atom or in any of its common oxidation states.\n" +
        "- Zn, Cd and Hg have a full \\(d^{10}\\) subshell in the atom and in their common ions, so they are not regarded as transition elements, though they sit in the d-block.\n" +
        "- General outer configuration: \\((n-1)d^{1-10}\\,ns^{1-2}\\). Two exceptions in the 3d series: Cr is \\(3d^5 4s^1\\) and Cu is \\(3d^{10} 4s^1\\), because half-filled and full d subshells are extra stable.\n" +
        "- **High melting points:** the (n−1)d electrons join the ns electrons in metallic bonding, so the bonding is strong. Melting points rise to a maximum near the middle of a series and then fall.\n" +
        "- **Ionisation enthalpy** rises along each series, with small irregularities, because the nuclear charge rises as the inner d orbitals fill.",
      table: {
        columns: ["Property", "Trend in the 3d series", "Reason"],
        rows: [
          { cells: ["Melting point", "High; rises to a maximum near the middle, then falls", "(n−1)d electrons join ns electrons in metallic bonding"], noteAmber: "Re-NEET 2026: high melting points explained by 3d electrons bonding along with the 4s electrons." },
          { cells: ["Atomic and ionic radius", "Falls along the series", "A d electron shields the outer electrons poorly from the rising nuclear charge"] },
          { cells: ["Ionisation enthalpy", "Rises along the series, with small irregularities", "Nuclear charge rises as the inner d orbitals fill"] },
          { cells: ["Configuration of Cr", "\\(3d^5 4s^1\\), not \\(3d^4 4s^2\\)", "A half-filled d subshell is extra stable"] },
          { cells: ["Configuration of Cu", "\\(3d^{10} 4s^1\\), not \\(3d^9 4s^2\\)", "A full d subshell is extra stable"] },
        ],
      },
      pyqExampleId: "192fe2af-5895-4638-b527-115175c9920e",
      selfCheckExample: {
        prompt: "Zinc sits in the d-block. Why is it not regarded as a transition element?",
        steps: [
          "Zn is \\([\\text{Ar}]3d^{10}4s^2\\). Its common ion \\(\\text{Zn}^{2+}\\) loses the two 4s electrons and is \\(3d^{10}\\).",
          "The d subshell is full both in the atom and in the common ion, so the definition (an incompletely filled d subshell) is never met.",
        ],
        answer: "Its d subshell is full (\\(3d^{10}\\)) in the atom and in \\(\\text{Zn}^{2+}\\)",
      },
      practiceSet: [
        { prompt: "Write the outer electronic configuration of chromium (Z = 24).", answer: "\\(3d^5 4s^1\\)" },
        { prompt: "Write the outer electronic configuration of copper (Z = 29).", answer: "\\(3d^{10} 4s^1\\)" },
        { prompt: "Copper has a full 3d subshell in its atom. Why is it still a transition element?", answer: "Its common ion \\(\\text{Cu}^{2+}\\) is \\(3d^9\\), an incompletely filled d subshell" },
        { prompt: "Does ionisation enthalpy generally rise or fall along the 3d series?", answer: "It rises, with small irregularities" },
      ],
      traps: [
        {
          title: "Zinc is in the d-block but not a transition element",
          body: "Zn, Cd and Hg keep a full \\(d^{10}\\) subshell in the atom and in their common ions. Count them as d-block elements, not transition elements.",
        },
        {
          title: "Chromium and copper break the filling pattern",
          body: "Cr is \\(3d^5 4s^1\\) and Cu is \\(3d^{10} 4s^1\\). Writing \\(3d^4 4s^2\\) or \\(3d^9 4s^2\\) gives the wrong number of d electrons in every ion you build from them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-oxidation-states",
      name: "Oxidation states and electrode potentials",
      intuition:
        "A transition metal can lose its ns electrons and then some of its d electrons, one at a time, so its oxidation states differ by one. The standard electrode potential E° of a couple tells you which way an ion would like to go. A large positive E°(M³⁺/M²⁺) means M³⁺ grabs an electron: it is an oxidising agent. A negative value means M²⁺ gives one away: it is a reducing agent. A half-filled d⁵ or full d¹⁰ ion is the one the change tends to end at.",
      definition:
        "- Oxidation states differ by units of one. Mn shows the most, from +2 to +7. Sc shows only +3 and Zn only +2.\n" +
        "- From Sc to Mn the highest oxidation state equals the group number: Ti +4, V +5, Cr +6, Mn +7.\n" +
        "- **E°(M²⁺/M)** is negative for every 3d metal except Cu (+0.34 V), so Cu does not liberate hydrogen from dilute acids.\n" +
        "- **E°(M³⁺/M²⁺)** is very positive for Mn (+1.57 V): \\(\\text{Mn}^{3+}\\) (\\(d^4\\)) takes an electron to become the stable \\(d^5\\) \\(\\text{Mn}^{2+}\\), so \\(\\text{Mn}^{3+}\\) is a strong oxidising agent. For Fe it is lower (+0.77 V) because \\(\\text{Fe}^{3+}\\) is already \\(d^5\\).\n" +
        "- \\(\\text{Cr}^{2+}\\) is a strong reducing agent (E°(Cr³⁺/Cr²⁺) = −0.41 V): it loses an electron to reach \\(\\text{Cr}^{3+}\\) (\\(d^3\\)).\n" +
        "- \\(\\text{Cu}^+\\) disproportionates in water: \\(2\\text{Cu}^+ \\rightarrow \\text{Cu}^{2+} + \\text{Cu}\\). \\(\\text{Cu}^{2+}\\)(aq) is the stable ion because its hydration enthalpy (−2121 kJ mol⁻¹) is so negative that it more than makes up for the second ionisation enthalpy of copper.",
      table: {
        columns: ["Couple", "E° in volts", "What it means"],
        rows: [
          { cells: ["\\(\\text{Cu}^{2+}/\\text{Cu}\\)", "+0.34", "The only positive M²⁺/M value: Cu gives no hydrogen with dilute acid"], noteAmber: "NEET 2023: Cu²⁺ salts are more stable than Cu⁺ salts in water because of the hydration energy of Cu²⁺." },
          { cells: ["\\(\\text{Cr}^{3+}/\\text{Cr}^{2+}\\)", "−0.41", "Negative: \\(\\text{Cr}^{2+}\\) is a strong reducing agent"] },
          { cells: ["\\(\\text{Fe}^{3+}/\\text{Fe}^{2+}\\)", "+0.77", "\\(\\text{Fe}^{3+}\\) is only a mild oxidising agent; it is already \\(d^5\\)"] },
          { cells: ["\\(\\text{Mn}^{3+}/\\text{Mn}^{2+}\\)", "+1.57", "\\(\\text{Mn}^{3+}\\) (\\(d^4\\)) gains an electron to reach stable \\(d^5\\): a strong oxidising agent"], noteAmber: "NEET 2024: this couple is so positive because the change is from d⁴ to the half-filled d⁵." },
          { cells: ["\\(\\text{Co}^{3+}/\\text{Co}^{2+}\\)", "+1.97", "\\(\\text{Co}^{3+}\\) is a strong oxidising agent"] },
        ],
      },
      pyqExampleId: "c8f6eefc-e912-4d5b-b3d3-9b81366df23a",
      selfCheckExample: {
        prompt: "Using E°(M²⁺/M): Zn −0.76 V, Fe −0.44 V and Cu +0.34 V, which of the three metals does not give hydrogen with dilute hydrochloric acid?",
        steps: [
          "A metal liberates hydrogen from dilute acid when its E°(M²⁺/M) is below 0 V.",
          "Zn and Fe have negative values; Cu has a positive one.",
        ],
        answer: "Copper",
      },
      practiceSet: [
        { prompt: "Which 3d metal shows the largest number of oxidation states?", answer: "Manganese (+2 to +7)" },
        { prompt: "Is \\(\\text{Cr}^{2+}\\) an oxidising agent or a reducing agent?", answer: "A reducing agent (E°(Cr³⁺/Cr²⁺) = −0.41 V)" },
        { prompt: "What happens to \\(\\text{Cu}^+\\) ions in water?", answer: "They disproportionate: \\(2\\text{Cu}^+ \\rightarrow \\text{Cu}^{2+} + \\text{Cu}\\)" },
        { prompt: "Which is the stronger oxidising agent, \\(\\text{Co}^{3+}\\) or \\(\\text{Fe}^{3+}\\)?", answer: "\\(\\text{Co}^{3+}\\) (+1.97 V against +0.77 V)" },
      ],
      traps: [
        {
          title: "Copper does not liberate hydrogen",
          body: "Copper is the only 3d metal with a positive E°(M²⁺/M), +0.34 V. Every other 3d metal has a negative value.",
        },
        {
          title: "Cu²⁺ wins in water despite its second ionisation enthalpy",
          body: "Removing a second electron from Cu costs a lot, yet \\(\\text{Cu}^{2+}\\)(aq) is the stable ion. The reason is the large negative hydration enthalpy of \\(\\text{Cu}^{2+}\\), not its ionisation enthalpy.",
        },
        {
          title: "Same d⁴ count, opposite behaviour",
          body: "\\(\\text{Cr}^{2+}\\) and \\(\\text{Mn}^{3+}\\) are both \\(d^4\\). \\(\\text{Cr}^{2+}\\) is a reducing agent (it goes to \\(d^3\\)); \\(\\text{Mn}^{3+}\\) is an oxidising agent (it goes to \\(d^5\\)).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-oxides",
      name: "Oxides of the transition metals",
      intuition:
        "A metal in a low oxidation state gives an ionic, basic oxide, like the oxides of the s-block. As the oxidation state climbs, the metal pulls harder on the oxygen, the bonds become covalent, and the oxide turns acidic, like a non-metal oxide. So follow one metal through its oxides and the nature changes from basic to amphoteric to acidic.",
      definition:
        "- All the 3d metals except scandium form MO oxides, which are ionic.\n" +
        "- The highest oxidation number in the oxides equals the group number from \\(\\text{Sc}_2\\text{O}_3\\) to \\(\\text{Mn}_2\\text{O}_7\\). Beyond group 7 no oxide of iron higher than \\(\\text{Fe}_2\\text{O}_3\\) is known.\n" +
        "- As the oxidation number rises, ionic character falls and acidic character rises. \\(\\text{Mn}_2\\text{O}_7\\) is a covalent green oil; \\(\\text{CrO}_3\\) and \\(\\text{V}_2\\text{O}_5\\) have low melting points.\n" +
        "- \\(\\text{Mn}_2\\text{O}_7\\) gives \\(\\text{HMnO}_4\\) with water; \\(\\text{CrO}_3\\) gives \\(\\text{H}_2\\text{CrO}_4\\) and \\(\\text{H}_2\\text{Cr}_2\\text{O}_7\\).\n" +
        "- Vanadium: basic \\(\\text{V}_2\\text{O}_3\\), less basic \\(\\text{V}_2\\text{O}_4\\), amphoteric \\(\\text{V}_2\\text{O}_5\\). \\(\\text{V}_2\\text{O}_4\\) dissolves in acids to give \\(\\text{VO}^{2+}\\) salts. \\(\\text{V}_2\\text{O}_5\\) is mainly acidic: it gives \\(\\text{VO}_4^{3-}\\) with alkalis and \\(\\text{VO}_2^+\\) salts with acids.\n" +
        "- Chromium: CrO is basic, \\(\\text{Cr}_2\\text{O}_3\\) is amphoteric, \\(\\text{CrO}_3\\) is acidic.",
      table: {
        columns: ["Oxide", "Oxidation state of the metal", "Nature"],
        rows: [
          { cells: ["CrO", "+2", "Basic"] },
          { cells: ["\\(\\text{Cr}_2\\text{O}_3\\)", "+3", "Amphoteric"] },
          { cells: ["\\(\\text{CrO}_3\\)", "+6", "Acidic"] },
          { cells: ["\\(\\text{V}_2\\text{O}_3\\)", "+3", "Basic"] },
          { cells: ["\\(\\text{V}_2\\text{O}_4\\)", "+4", "Less basic; gives \\(\\text{VO}^{2+}\\) salts with acids"], noteAmber: "NEET 2023: 'V₂O₄ dissolves in acids to give VO₄³⁻ salts' was one of the incorrect statements." },
          { cells: ["\\(\\text{V}_2\\text{O}_5\\)", "+5", "Amphoteric, mainly acidic"] },
          { cells: ["\\(\\text{Mn}_2\\text{O}_7\\)", "+7", "Acidic; a covalent green oil"] },
        ],
      },
      pyqExampleId: "1a93c59f-17ce-4cd6-a4b1-8516d518a6ce",
      selfCheckExample: {
        prompt: "Which is the more acidic oxide, MnO or \\(\\text{Mn}_2\\text{O}_7\\)? Give the reason.",
        steps: [
          "Manganese is +2 in MnO and +7 in \\(\\text{Mn}_2\\text{O}_7\\).",
          "The higher the oxidation state, the more covalent the oxide and the more acidic it is.",
        ],
        answer: "\\(\\text{Mn}_2\\text{O}_7\\), where manganese is in the higher (+7) state",
      },
      practiceSet: [
        { prompt: "Which 3d metal does not form an MO oxide?", answer: "Scandium" },
        { prompt: "What acid does \\(\\text{Mn}_2\\text{O}_7\\) give with water?", answer: "Permanganic acid, \\(\\text{HMnO}_4\\)" },
        { prompt: "Name the oxide of chromium in its highest oxidation state, and give its nature.", answer: "\\(\\text{CrO}_3\\) (chromium +6), acidic" },
        { prompt: "Is \\(\\text{Mn}_2\\text{O}_7\\) an ionic solid or a covalent compound?", answer: "Covalent: it is a green oil" },
      ],
      traps: [
        {
          title: "Basic character falls as the oxidation state rises",
          body: "\\(\\text{V}_2\\text{O}_3\\) is basic and \\(\\text{V}_2\\text{O}_5\\) is amphoteric. Going from \\(\\text{V}_2\\text{O}_3\\) to \\(\\text{V}_2\\text{O}_5\\) the basic character decreases, it does not increase.",
        },
        {
          title: "VO²⁺ and VO₂⁺ come from different oxides",
          body: "\\(\\text{V}_2\\text{O}_4\\) dissolves in acids to give \\(\\text{VO}^{2+}\\) salts. \\(\\text{V}_2\\text{O}_5\\) gives \\(\\text{VO}_2^+\\) salts with acids and \\(\\text{VO}_4^{3-}\\) with alkalis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchdf-catalysts",
      name: "Catalysts, interstitial compounds and alloys",
      intuition:
        "A transition metal is a good catalyst for two reasons: it can change its oxidation state back and forth, and it can form bonds with the reacting molecules on its surface using its 3d and 4s electrons. Holding the reactants close together on the surface and weakening their bonds speeds the reaction up. The same open, metallic lattice can also trap small atoms such as H, C and N in its holes.",
      definition:
        "- **Catalysis:** the metals and their compounds can adopt several oxidation states and form complexes. On a solid catalyst, bonds form between the reactant molecules and the surface atoms, which raises the concentration of reactants at the surface and weakens their bonds.\n" +
        "- \\(\\text{Fe}^{3+}\\) catalyses the reaction between iodide and persulphate: \\(2\\text{I}^- + \\text{S}_2\\text{O}_8^{2-} \\rightarrow \\text{I}_2 + 2\\text{SO}_4^{2-}\\).\n" +
        "- **Interstitial compounds:** small atoms (H, C, N) trapped inside the metal's crystal lattice, for example TiC, \\(\\text{Mn}_4\\text{N}\\), \\(\\text{Fe}_3\\text{H}\\), \\(\\text{VH}_{0.56}\\), \\(\\text{TiH}_{1.7}\\). They are non-stoichiometric, have higher melting points than the pure metals, are very hard, keep metallic conductivity and are chemically inert.\n" +
        "- **Alloys:** transition metals have similar atomic radii, so one metal's atoms can take the place of another's in the lattice and alloys form readily.",
      table: {
        columns: ["Catalyst", "Process it is used in"],
        rows: [
          { cells: ["\\(\\text{V}_2\\text{O}_5\\)", "Contact process: oxidation of \\(\\text{SO}_2\\) to \\(\\text{SO}_3\\) in making \\(\\text{H}_2\\text{SO}_4\\)"], noteAmber: "NEET 2026 matched V₂O₅, Fe, PdCl₂ and a nickel complex with their processes." },
          { cells: ["Finely divided iron", "Haber process: ammonia from a nitrogen and hydrogen mixture"], noteAmber: "NEET 2025 matched the Haber process, Wacker oxidation, Wilkinson catalyst and Ziegler catalyst." },
          { cells: ["Nickel", "Hydrogenation of fats and oils"] },
          { cells: ["\\(\\text{PdCl}_2\\)", "Wacker process: oxidation of ethyne to ethanal"] },
          { cells: ["Nickel complexes", "Polymerisation of alkynes and of other organic compounds such as benzene"] },
          { cells: ["\\(\\text{TiCl}_4\\) with \\(\\text{Al(CH}_3\\text{)}_3\\)", "Ziegler catalyst, used to make polyethylene"] },
          { cells: ["\\([(\\text{Ph}_3\\text{P})_3\\text{RhCl}]\\), Wilkinson catalyst", "Hydrogenation of alkenes"] },
        ],
      },
      pyqExampleId: "acd23f1e-f587-4951-af05-6baa1a9157a7",
      selfCheckExample: {
        prompt: "How does \\(\\text{Fe}^{3+}\\) catalyse the reaction between iodide ions and persulphate ions?",
        steps: [
          "\\(\\text{Fe}^{3+}\\) oxidises iodide: \\(2\\text{Fe}^{3+} + 2\\text{I}^- \\rightarrow 2\\text{Fe}^{2+} + \\text{I}_2\\).",
          "Persulphate turns the iron back: \\(2\\text{Fe}^{2+} + \\text{S}_2\\text{O}_8^{2-} \\rightarrow 2\\text{Fe}^{3+} + 2\\text{SO}_4^{2-}\\).",
          "Adding the two steps gives the overall reaction, and the iron ends as it began.",
        ],
        answer: "By switching between the +3 and +2 oxidation states",
      },
      practiceSet: [
        { prompt: "Which kinds of atom are trapped in the lattice of an interstitial compound?", answer: "Small atoms: H, C or N" },
        { prompt: "Give two properties of interstitial compounds.", answer: "Any two of: very hard, higher melting points than the pure metal, metallic conductivity, chemically inert" },
        { prompt: "Is \\(\\text{VH}_{0.56}\\) a stoichiometric compound?", answer: "No: interstitial compounds are non-stoichiometric" },
        { prompt: "Why do transition metals form alloys with one another easily?", answer: "Their atomic radii are similar" },
      ],
      traps: [
        {
          title: "Interstitial compounds are not ordinary compounds",
          body: "TiC or \\(\\text{Fe}_3\\text{H}\\) is neither ionic nor covalent in the usual sense: the small atoms sit in holes of the metal lattice, the formula need not be a whole-number ratio, and the solid still conducts like a metal.",
        },
        {
          title: "Two catalysts students swap",
          body: "\\(\\text{V}_2\\text{O}_5\\) is the catalyst of the contact process (sulphuric acid). Iron is the catalyst of the Haber process (ammonia).",
        },
      ],
    },
  ],
};
