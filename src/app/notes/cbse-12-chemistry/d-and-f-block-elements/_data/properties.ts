import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "General Properties of the Transition Elements (d-Block)",
  title: "General Properties of the Transition Elements",
  oneLineDefinition:
    "Melting points, enthalpies of atomisation, atomic sizes and ionisation enthalpies; oxidation states and electrode potentials; magnetic moment and colour; catalysis, complexes, interstitial compounds and alloys. The reasons behind each trend in the first transition series.",
  whyItMatters:
    "142 questions. One hundred and nine were set in board papers, between 20 and 25 in every year from 2022 to 2026, more than on any other page of the chapter. Most are \"give reasons\" parts. Every year from 2022 to 2026 the board asked why transition metals have high enthalpies of atomisation (and which has the lowest), why their compounds are coloured or paramagnetic, why they are good catalysts, and why copper's E° value is positive. It also asked why Cr²⁺ is reducing while Mn³⁺ is oxidising (2023, 2024, 2025), why Cu⁺ is unstable in water (2022, 2023, 2024), why Zr and Hf have almost the same radius (2022, 2023, 2025, 2026), and ionisation enthalpy trends (2024, 2025, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcdf-physical",
      name: "Melting points, atomisation, size and ionisation enthalpy",
      intuition:
        "In a transition metal the inner (n−1)d electrons join the outer ns electrons in holding the metal together. More bonding electrons means a stronger metal: harder, higher melting, harder to atomise. Where the d electrons are all paired, as in zinc, they drop out and the metal turns soft.",
      definition:
        "- Transition metals (except Zn, Cd and Hg) are very hard, have low volatility and high melting and boiling points, because electrons from \\((n-1)d\\) as well as \\(ns\\) take part in metallic bonding.\n" +
        "- In any row the melting points rise to a maximum at \\(d^5\\) and then fall, except for the anomalous low values of Mn and Tc.\n" +
        "- Enthalpies of atomisation are high and peak in the middle of each series: one unpaired electron per d orbital is particularly favourable for strong bonding. The 4d and 5d metals have higher values than the 3d metals. First series values (kJ mol⁻¹): Sc 326, Ti 473, V 515, Cr 397, Mn 281, Fe 416, Co 425, Ni 430, Cu 339, Zn 126.\n" +
        "- Atomic and ionic radii fall only a little across a series. The 4d atoms are larger than the 3d atoms, but the 5d atoms are almost the same size as the 4d (Zr 160 pm, Hf 159 pm) because of the lanthanoid contraction.\n" +
        "- Ionisation enthalpy rises only slightly across the 3d series. Breaks come where an ion would lose a \\(d^5\\) or \\(d^{10}\\) set: the second for Cr and Cu (Cr⁺ is \\(d^5\\), Cu⁺ is \\(d^{10}\\)), the third for Mn and Zn (Mn²⁺ is \\(d^5\\), Zn²⁺ is \\(d^{10}\\)).",
      table: {
        columns: ["Board asks", "Reason to write"],
        rows: [
          {
            cells: ["Transition metals have high melting points and high enthalpies of atomisation", "Both (n−1)d and ns electrons take part in metallic bonding; the more unpaired d electrons, the stronger the bonding"],
            noteAmber: "Board 2023 gave the reason as \"more unpaired electrons give WEAK metallic bonding\": a false reason (code C).",
          },
          { cells: ["Zinc has the lowest enthalpy of atomisation (126 kJ mol⁻¹); Zn, Cd and Hg are soft with low melting points", "Their d subshell is full (d¹⁰), so no unpaired d electron joins the metallic bonding; only the two s electrons do"] },
          {
            cells: ["Chromium melts higher than manganese", "Cr (3d⁵4s¹) has six unpaired electrons for metallic bonding; Mn's value is anomalously low, its stable half-filled 3d⁵ and paired 4s² taking less part"],
          },
          {
            cells: ["Zr and Hf have almost identical radii and are hard to separate", "Lanthanoid contraction: the 4f orbitals fill before 5d and shield poorly, cancelling the expected increase in size"],
            pyqExampleId: "2b723c05-d98c-4c42-87b0-fc4365a46a18",
          },
          {
            cells: ["First ionisation enthalpy of Cr (653 kJ mol⁻¹) is lower than that of Zn (906 kJ mol⁻¹)", "Cr loses its single 4s electron and is left with a stable 3d⁵; Zn must remove an electron from a filled 4s² above a full 3d¹⁰"],
            noteAmber: "Board 2025: with the reason \"zinc is a non-transition element\", both are true but R does not explain A (code B).",
            pyqExampleId: "8b166e38-5db9-460f-871f-064cf55c1ab2",
          },
          { cells: ["Second ionisation enthalpies of Cr and Cu are very high", "Cr⁺ is 3d⁵ and Cu⁺ is 3d¹⁰, both extra stable, so the second electron is hard to remove"] },
          {
            cells: ["Third ionisation enthalpies of Mn and Zn are very high", "Mn²⁺ is 3d⁵ (half filled) and Zn²⁺ is 3d¹⁰ (full); removing a third electron breaks a stable set"],
            pyqExampleId: "385c57fc-8a1e-47c2-ae95-ef1dade651e8",
          },
        ],
        caption: "Values from NCERT Table 4.2. The third ionisation enthalpies of Ni, Cu and Zn are also high, which is why these metals rarely go beyond +2.",
      },
      selfCheckExample: {
        prompt: "Which has the higher enthalpy of atomisation, vanadium (3d³4s²) or copper (3d¹⁰4s¹)? Give the reason.",
        steps: [
          "Vanadium has three unpaired 3d electrons that join the metallic bonding.",
          "Copper's 3d subshell is full, so only its single 4s electron takes part.",
        ],
        answer: "Vanadium (515 against 339 kJ mol⁻¹): more electrons in its metallic bonding",
      },
      practiceSet: [
        { prompt: "Why are Zn, Cd and Hg soft metals?", answer: "Their d¹⁰ electrons take no part in metallic bonding, so the bonding is weak" },
        { prompt: "Why is the third ionisation enthalpy of iron lower than that of manganese?", answer: "Fe²⁺ (3d⁶) becomes the stable 3d⁵ on losing an electron, while Mn²⁺ would have to break its 3d⁵" },
        { prompt: "How do the melting points of transition metals change across a series?", answer: "They rise to a maximum near d⁵ and then fall" },
      ],
      pyqExampleId: "3e84fd73-7926-4071-bfaf-d686c0d17ca2",
      traps: [
        {
          title: "Calling manganese the lowest in the series",
          body: "Zinc has the lowest enthalpy of atomisation in the 3d series (126 kJ mol⁻¹). Manganese (281) is low only among its middle neighbours; when the options are Cr, V, Mn and Fe, it is the answer.",
        },
        {
          title: "Giving the wrong cause for Zr and Hf",
          body: "Being in the same group is true but does not explain their equal size. The cause is the lanthanoid contraction.",
        },
        {
          title: "Saying transition metals have low melting points",
          body: "Only Zn, Cd and Hg are low. The rest are high-melting, and an assertion that pairs high atomisation with \"low melting points\" has a false reason.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcdf-oxstates",
      name: "Oxidation states and electrode potentials",
      intuition:
        "Because (n−1)d and ns electrons are close in energy, a transition metal can give away one more electron at a time, so its oxidation states differ by one. Which state is stable, and which ion is a strong oxidising or reducing agent, depends mostly on whether the change reaches or destroys an empty, half-filled or full d set.",
      definition:
        "- **Variety:** the states differ by one (V II, III, IV, V); in non-transition elements they normally differ by two. The most states occur in the middle: Mn shows every state from +2 to +7. Sc shows only +3 and Zn only +2.\n" +
        "- Up to manganese the highest state equals the sum of the s and d electrons (Ti⁴⁺, V⁵⁺, Cr⁶⁺, Mn⁷⁺), which equals the group number.\n" +
        "- **Highest states are shown in oxides and fluorides.** Oxygen does it better because it can form multiple bonds to the metal: the highest Mn fluoride is MnF₄ but the highest oxide is Mn₂O₇.\n" +
        "- **Oxides:** as the oxidation number rises, ionic character falls and acidity rises. MnO is basic, Mn₂O₇ is an acidic covalent oil; CrO is basic, Cr₂O₃ amphoteric, CrO₃ acidic; V₂O₅ is amphoteric but mainly acidic.\n" +
        "- **\\(E^\\circ(\\text{M}^{2+}/\\text{M})\\)** sums three terms: enthalpy of atomisation, the first two ionisation enthalpies and the hydration enthalpy. The values are irregular because the ionisation and sublimation enthalpies vary irregularly. Cu is the only positive one (+0.34 V): its high \\(\\Delta_a H^\\circ\\) and ionisation enthalpies are not balanced by its hydration enthalpy, so it cannot liberate H₂ from acids. Mn, Ni and Zn are more negative than expected: Mn²⁺ is \\(d^5\\), Zn²⁺ is \\(d^{10}\\), and Ni²⁺ has the most negative hydration enthalpy.\n" +
        "- **\\(E^\\circ(\\text{M}^{3+}/\\text{M}^{2+})\\):** Mn +1.57 V and Co +1.97 V make Mn³⁺ and Co³⁺ the strongest oxidising agents. Cr²⁺ (−0.41 V) is strongly reducing: \\(d^4\\) becomes \\(d^3\\), a half-filled \\(t_{2g}\\) level. Mn³⁺ (\\(d^4\\)) is oxidising because it becomes the half-filled \\(d^5\\). Fe³⁺ (+0.77 V) is comparatively stable because it is \\(d^5\\); Sc³⁺ is stable with a noble gas core.\n" +
        "- **Copper(I):** \\(2\\text{Cu}^{+}(aq) \\longrightarrow \\text{Cu}^{2+}(aq) + \\text{Cu}(s)\\). Cu²⁺ has a much more negative hydration enthalpy, which more than pays for the second ionisation enthalpy. CuI₂ is not known: \\(2\\text{Cu}^{2+} + 4\\text{I}^{-} \\longrightarrow \\text{Cu}_2\\text{I}_2 + \\text{I}_2\\).",
      table: {
        columns: ["Board asks", "Reason to write"],
        rows: [
          {
            cells: ["E°(Cu²⁺/Cu) is positive; copper does not liberate H₂ from dilute acids", "High enthalpy of atomisation and ionisation enthalpies are not balanced by the hydration enthalpy of Cu²⁺"],
            pyqExampleId: "5e338e95-378f-45fc-b322-c6f6e57842d1",
          },
          {
            cells: ["E°(Mn²⁺/Mn) is highly negative", "Mn²⁺ is the stable half-filled 3d⁵, so the metal is easily oxidised"],
            pyqExampleId: "65ef454b-f33b-412e-95e2-42ca7624764e",
          },
          { cells: ["E°(Mn³⁺/Mn²⁺) is much more positive than for Cr³⁺/Cr²⁺ or Fe³⁺/Fe²⁺", "Mn²⁺ is d⁵, so Mn³⁺ readily takes an electron; the third ionisation enthalpy of Mn is very large"] },
          { cells: ["Of the d⁴ ions, Cr²⁺ is reducing and Mn³⁺ is oxidising", "Cr²⁺ to Cr³⁺ gives d³ (half-filled t₂g); Mn³⁺ to Mn²⁺ gives the half-filled d⁵"] },
          {
            cells: ["Cu⁺ is unstable in water; CuCl₂ is more stable than Cu₂Cl₂ in solution", "Cu⁺ disproportionates; the larger hydration enthalpy of Cu²⁺ outweighs the second ionisation enthalpy"],
            pyqExampleId: "b2f38f19-f6c8-41db-850b-50fd194d0600",
          },
          {
            cells: ["Highest oxidation state is shown with oxygen", "Oxygen forms multiple bonds to the metal (Mn₂O₇ against MnF₄)"],
            pyqExampleId: "6f35cf8a-36ec-4c5b-8374-7771c19997e6",
          },
          {
            cells: ["Mn shows the highest state, +7, in the 3d series", "Mn (3d⁵4s²) can use all seven of its 3d and 4s electrons"],
            noteAmber: "Board 2023 and 2026: with the reason \"transition metals show variable oxidation states\", the answer is (B). The general fact does not explain why Mn reaches +7.",
            pyqExampleId: "c0e267e8-63e8-4cf4-801c-a8720df2e20e",
          },
          {
            cells: ["MnO is basic while Mn₂O₇ is acidic", "As the oxidation number rises, ionic character falls; Mn₂O₇ is covalent and gives HMnO₄"],
            pyqExampleId: "93a9ae0a-f242-44af-b7cb-7d2015052e60",
          },
          {
            cells: ["CuI₂ is not known", "Cu²⁺ oxidises I⁻ to I₂ and is itself reduced to Cu₂I₂"],
            pyqExampleId: "ad278fa3-1ee6-4538-a3b1-6d3494213fd7",
          },
        ],
        caption: "E°(M²⁺/M) in volts, NCERT Table 4.2: V −1.18, Cr −0.90, Mn −1.18, Fe −0.44, Co −0.28, Ni −0.25, Cu +0.34, Zn −0.76.",
      },
      selfCheckExample: {
        prompt: "Of Mn²⁺ and Fe²⁺, which is more easily oxidised to the +3 state? Give the reason.",
        steps: [
          "Mn²⁺ is 3d⁵: oxidation to Mn³⁺ (3d⁴) would destroy a half-filled set.",
          "Fe²⁺ is 3d⁶: oxidation to Fe³⁺ (3d⁵) creates a half-filled set.",
        ],
        answer: "Fe²⁺, because Fe³⁺ reaches the stable 3d⁵",
      },
      practiceSet: [
        { prompt: "Which is the only oxidation state of scandium?", answer: "+3" },
        { prompt: "Write the equation for the disproportionation of Cu⁺ in water.", answer: "\\(2\\text{Cu}^{+}(aq) \\longrightarrow \\text{Cu}^{2+}(aq) + \\text{Cu}(s)\\)" },
        { prompt: "Which is more basic, CrO or CrO₃?", answer: "CrO (chromium in its lower oxidation state)" },
        { prompt: "How do the oxidation states of a transition element differ from those of a p-block element?", answer: "They differ by one; in non-transition elements they normally differ by two" },
      ],
      pyqExampleId: "41c600fa-a718-4c9e-aafd-b6c0ce68cd28",
      traps: [
        {
          title: "Mixing up the two d⁴ ions",
          body: "Cr²⁺ GIVES an electron (to d³, half-filled t₂g): reducing. Mn³⁺ TAKES an electron (to d⁵): oxidising. Write which configuration each one reaches.",
        },
        {
          title: "Blaming ionisation for the instability of Cu⁺",
          body: "The second ionisation of copper costs energy; what makes Cu²⁺(aq) win is its much more negative hydration enthalpy. Name hydration enthalpy and write the disproportionation equation.",
        },
        {
          title: "Saying fluorine stabilises the highest states better",
          body: "Oxygen does better because it forms multiple bonds to the metal. Manganese reaches +7 in Mn₂O₇ and MnO₄⁻ but only +4 in MnF₄.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcdf-magnetic-colour",
      name: "Magnetic moment and colour",
      intuition:
        "An unpaired electron behaves like a tiny magnet, so an ion with unpaired d electrons is pulled into a magnetic field. The same partly filled d set lets an electron jump from a lower d level to a higher one by absorbing visible light, which is why these ions are coloured. Empty or full d sets give neither.",
      definition:
        "- **Paramagnetic** substances are attracted by a magnetic field; **diamagnetic** ones are repelled. Paramagnetism comes from unpaired electrons.\n" +
        "- For the first transition series the orbital contribution is quenched, so the moment depends only on the number of unpaired electrons: the spin-only formula. One unpaired electron gives 1.73 BM.\n" +
        "- Count unpaired electrons from the ion's configuration: \\(d^1\\) to \\(d^5\\) all unpaired; \\(d^6\\) 4, \\(d^7\\) 3, \\(d^8\\) 2, \\(d^9\\) 1, \\(d^0\\) and \\(d^{10}\\) none.\n" +
        "- **Colour:** an electron from a lower energy d orbital is excited to a higher energy d orbital by light in the visible region (a d-d transition). The colour seen is the complementary colour of the light absorbed, and the ligand decides which frequency is absorbed.\n" +
        "- Ions with \\(d^0\\) (Sc³⁺, Ti⁴⁺) or \\(d^{10}\\) (Zn²⁺, Cu⁺) have no d-d transition and are colourless. Some colours in water: Ti³⁺ purple, Cr³⁺ violet, Fe³⁺ yellow, Ni²⁺ green, Cu²⁺ blue.\n" +
        "- Manganate (Mn⁶⁺, \\(d^1\\)) is paramagnetic with one unpaired electron; permanganate (Mn⁷⁺, \\(d^0\\)) is diamagnetic, so its intense colour is not a d-d transition.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "magnetic moment in Bohr magnetons (BM)" },
          { symbol: "\\(n\\)", meaning: "number of unpaired electrons" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the spin-only magnetic moment of Fe²⁺ (Z = 26).",
        steps: [
          "Given: Fe is [Ar]3d⁶4s²; Fe²⁺ loses the two 4s electrons, so it is [Ar]3d⁶.",
          "Six electrons in five d orbitals: one pair and four single electrons, so \\(n = 4\\).",
          "Formula: \\(\\mu = \\sqrt{n(n+2)}\\).",
          "Substitution: \\(\\mu = \\sqrt{4 \\times 6} = \\sqrt{24}\\).",
          "Answer: \\(\\mu = 4.90\\) BM.",
        ],
        answer: "4.90 BM",
      },
      selfCheckExample: {
        prompt: "Calculate the spin-only magnetic moment of Cu²⁺ (Z = 29), and say whether copper(II) salts are coloured.",
        steps: [
          "Cu²⁺ is [Ar]3d⁹: one unpaired electron, \\(n = 1\\).",
          "\\(\\mu = \\sqrt{1 \\times 3} = \\sqrt{3}\\).",
          "A d⁹ ion has a partly filled d set, so a d-d transition is possible.",
        ],
        answer: "1.73 BM; yes, copper(II) salts are coloured (blue in water)",
      },
      practiceSet: [
        { prompt: "Which is diamagnetic, Ti³⁺ or Ti⁴⁺ (Z = 22)?", answer: "Ti⁴⁺ (3d⁰, no unpaired electron)" },
        { prompt: "Why are Zn²⁺ salts white?", answer: "Zn²⁺ is 3d¹⁰: with no vacancy in the d set, no d-d transition can occur" },
        { prompt: "Out of KMnO₄ and K₂MnO₄, which is paramagnetic and why?", answer: "K₂MnO₄: Mn is +6, 3d¹, one unpaired electron" },
        { prompt: "How many unpaired electrons give a spin-only moment of 3.87 BM?", answer: "3, since \\(\\sqrt{3 \\times 5} = 3.87\\)" },
      ],
      pyqExampleId: "46930c7c-26a0-470b-9163-b38a05157ff2",
      traps: [
        {
          title: "Putting all the d electrons into n",
          body: "n counts UNPAIRED electrons only. Fe²⁺ has six d electrons but four unpaired, so \\(\\mu = \\sqrt{24}\\), not \\(\\sqrt{48}\\).",
        },
        {
          title: "Naming the colour absorbed",
          body: "The colour you see is the complementary colour of the light absorbed in the d-d transition. Say \"partly filled d orbitals\" and \"d-d transition\": both carry the mark.",
        },
        {
          title: "Calling every copper ion coloured",
          body: "Cu⁺ is 3d¹⁰ and colourless (and diamagnetic); only Cu²⁺ (3d⁹) is coloured. Board 2025 set \"cuprous salts are diamagnetic\" with both a right and a wrong reason.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcdf-catalysts",
      name: "Catalysts, complexes, interstitial compounds and alloys",
      intuition:
        "Four more family traits come from the same d orbitals. They let the metal change its oxidation state and bind reactants on its surface (catalysis), accept lone pairs from ligands (complexes), trap small atoms in the gaps of the lattice (interstitial compounds), and swap places with each other in a crystal because their sizes are so close (alloys).",
      definition:
        "- **Catalysis:** ascribed to the ability to adopt multiple oxidation states and to form complexes. Examples: V₂O₅ in the Contact process, finely divided iron in Haber's process, nickel in catalytic hydrogenation.\n" +
        "- At a solid surface, bonds form between reactant molecules and surface atoms (3d and 4s electrons), which raises the concentration of reactants at the surface and weakens their bonds, lowering the activation energy.\n" +
        "- A change of oxidation state helps too: Fe³⁺ catalyses \\(2\\text{I}^- + \\text{S}_2\\text{O}_8^{2-} \\longrightarrow \\text{I}_2 + 2\\text{SO}_4^{2-}\\) by \\(2\\text{Fe}^{3+} + 2\\text{I}^- \\longrightarrow 2\\text{Fe}^{2+} + \\text{I}_2\\), then \\(2\\text{Fe}^{2+} + \\text{S}_2\\text{O}_8^{2-} \\longrightarrow 2\\text{Fe}^{3+} + 2\\text{SO}_4^{2-}\\).\n" +
        "- **Complexes** form because the metal ions are comparatively small, highly charged and have d orbitals available for bonding.\n" +
        "- **Interstitial compounds:** small atoms like H, C or N trapped in the crystal lattice of the metal, e.g. TiC, Mn₄N, Fe₃H, VH₀.₅₆, TiH₁.₇. They are usually non-stoichiometric and neither typically ionic nor covalent.\n" +
        "- **Alloys:** solid solutions form when metallic radii are within about 15 percent of each other; transition metals have similar radii, so they alloy readily. The alloys are hard and often high melting: steels with Cr, V, W, Mo and Mn; brass (Cu and Zn) and bronze (Cu and Sn).",
      table: {
        columns: ["Property", "Reason", "Example"],
        rows: [
          { cells: ["Good catalysts", "Variable oxidation states and complex formation; reactants bond to surface atoms, which weakens their bonds", "V₂O₅ (Contact process), Fe (Haber's process), Ni (hydrogenation)"] },
          { cells: ["Form complexes", "Small ions, high charge, d orbitals available for bonding", "[Fe(CN)₆]³⁻, [Cu(NH₃)₄]²⁺"] },
          {
            cells: ["Interstitial compounds", "Small H, C, N atoms fit into the gaps of the metal lattice", "Very hard, higher melting than the pure metal, keep metallic conductivity, chemically inert"],
            noteAmber: "Board 2023 and 2024: interstitial compounds are HARDER than the metal, not softer or more ductile.",
            pyqExampleId: "083514c1-2950-48bf-a6b7-4320fcca7f63",
          },
          {
            cells: ["Form alloys easily", "Similar atomic radii (within about 15 percent), so one metal replaces another in the lattice", "Stainless steel, brass, bronze"],
            pyqExampleId: "f8ddd903-0744-4cbc-8542-656608dd5778",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Fe³⁺ ions catalyse the reaction between iodide and persulphate ions. Write the two steps that show how.",
        steps: [
          "Fe³⁺ oxidises iodide: \\(2\\text{Fe}^{3+} + 2\\text{I}^- \\longrightarrow 2\\text{Fe}^{2+} + \\text{I}_2\\).",
          "Persulphate takes Fe²⁺ back to Fe³⁺: \\(2\\text{Fe}^{2+} + \\text{S}_2\\text{O}_8^{2-} \\longrightarrow 2\\text{Fe}^{3+} + 2\\text{SO}_4^{2-}\\).",
          "The iron ends as it began, so it is a catalyst.",
        ],
        answer: "Iron shuttles between +3 and +2, which is why a metal with variable oxidation states can catalyse",
      },
      practiceSet: [
        { prompt: "Name the catalyst used in the Contact process.", answer: "Vanadium(V) oxide, V₂O₅" },
        { prompt: "Give two properties of interstitial compounds.", answer: "Any two: very hard, melting points higher than the pure metal, keep metallic conductivity, chemically inert" },
        { prompt: "Why do transition metals form complex compounds?", answer: "Their ions are small and highly charged and have d orbitals available for bonding" },
      ],
      pyqExampleId: "b0c30ac6-3558-4990-bf22-a992886f4421",
      traps: [
        {
          title: "Picking high melting point as the reason for catalysis",
          body: "MCQs offer high melting point, ionisation enthalpy and alloy formation. The property behind catalysis is variable oxidation states (with complex formation).",
        },
        {
          title: "Giving the wrong reason for alloys",
          body: "Transition metals alloy because their atomic radii are nearly the same, not because they share a configuration or an oxidation state.",
        },
      ],
    },
  ],
};
