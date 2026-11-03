import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Chemistry, Ch. 4 The d- and f-Block Elements. Statements
 * checked against the NCERT text (definitions in the book's own words);
 * most-asked years and marks from the CBSE board past-paper questions in the
 * bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "The d-and f-Block Elements",
  chapterSlug: "the-d-and-f-block-elements",
  source: "NCERT Chemistry Part I (CBSE Class 12), Chapter 4",
  keyPoints: [
    {
      term: "Transition metals",
      text: "Metals which have incomplete d subshell either in neutral atom or in their ions. General configuration \\((n-1)d^{1-10}ns^{1-2}\\). Zn, Cd and Hg have full \\(d^{10}\\) in the ground state and in their common oxidation states, so they are not transition metals. Cu (\\(\\ce{Cu^2+}\\) is \\(3d^9\\)), Ag and Sc are.",
    },
    {
      term: "Enthalpy of atomisation and melting points",
      text: "Large number of unpaired electrons gives stronger interatomic interaction and hence higher enthalpies of atomisation, highest near the middle of each series. Zn (no unpaired electron) has the lowest; Zn, Cd and Hg have low melting points.",
    },
    {
      term: "Ionisation enthalpies",
      text: "Second ionisation enthalpy is unusually high for Cr and Cu, whose \\(\\ce{M+}\\) ions are \\(d^5\\) and \\(d^{10}\\). Third ionisation enthalpy is high for Mn and Zn (removing an electron from \\(d^5\\) \\(\\ce{Mn^2+}\\) and \\(d^{10}\\) \\(\\ce{Zn^2+}\\)).",
    },
    {
      term: "Variable oxidation states",
      text: "Arise from incomplete filling of d orbitals, so the oxidation states differ from each other by unity (V(II), V(III), V(IV), V(V)); in p-block they differ by 2. Mn shows the most, +2 to +7. Sc shows only +3 and Zn only +2.",
    },
    {
      term: "Highest oxidation states and oxides",
      text: "The highest oxidation number in the oxides coincides with the group number up to \\(\\ce{Mn2O7}\\): oxygen can form multiple bonds to metals. As oxidation number rises, ionic character falls: MnO is basic, \\(\\ce{Mn2O7}\\) is a covalent, acidic green oil.",
    },
    {
      term: "Trends in \\(E^0\\) of M²⁺/M",
      text: "Cu has a positive \\(E^0\\) (+0.34 V): the high energy to transform Cu(s) to \\(\\ce{Cu^2+}(aq)\\) is not balanced by its hydration enthalpy, so Cu does not liberate \\(\\ce{H2}\\) from acids. Mn and Zn are more negative than expected: stable \\(d^5\\) \\(\\ce{Mn^2+}\\) and \\(d^{10}\\) \\(\\ce{Zn^2+}\\).",
    },
    {
      term: "M³⁺/M²⁺ couples",
      text: "\\(\\ce{Mn^3+}\\) and \\(\\ce{Co^3+}\\) are the strongest oxidising agents in water; \\(\\ce{Ti^2+}\\), \\(\\ce{V^2+}\\), \\(\\ce{Cr^2+}\\) are strong reducing agents. Both \\(d^4\\): \\(\\ce{Cr^2+}\\) becomes \\(d^3\\) (half-filled \\(t_{2g}\\)), \\(\\ce{Mn^3+}\\) becomes stable \\(d^5\\) \\(\\ce{Mn^2+}\\).",
    },
    {
      term: "Instability of Cu⁺ in water",
      text: "Many copper(I) compounds disproportionate in aqueous solution: \\(\\ce{2Cu+ -> Cu^2+ + Cu}\\). \\(\\ce{Cu^2+}(aq)\\) is more stable because its hydration enthalpy is much more negative, which more than compensates for the second ionisation enthalpy of Cu.",
    },
    {
      term: "Magnetic properties",
      text: "Paramagnetism arises from the presence of unpaired electrons. Spin-only moment \\(\\mu = \\sqrt{n(n+2)}\\) BM; it increases with the number of unpaired electrons. \\(d^5\\) ions (\\(\\ce{Mn^2+}\\), \\(\\ce{Fe^3+}\\)) are the most paramagnetic; \\(\\ce{Cu+}\\) and \\(\\ce{Zn^2+}\\) are diamagnetic.",
    },
    {
      term: "Coloured ions",
      text: "An electron is excited from a lower to a higher energy d orbital; the light absorbed lies in the visible region and the colour seen is the complementary colour. \\(d^0\\) (\\(\\ce{Sc^3+}\\), \\(\\ce{Ti^4+}\\)) and \\(d^{10}\\) (\\(\\ce{Cu+}\\), \\(\\ce{Zn^2+}\\)) ions are colourless.",
    },
    {
      term: "Catalysts, interstitial compounds, alloys",
      text: "Catalytic activity is ascribed to their ability to adopt multiple oxidation states and to form complexes (\\(\\ce{V2O5}\\) in Contact process, Fe in Haber process, Ni in hydrogenation). Small atoms (H, C, N) trapped in the metal lattice give hard, high melting interstitial compounds. Similar atomic radii allow alloys.",
    },
    {
      term: "Lanthanoid contraction",
      text: "The overall decrease in atomic and ionic radii from lanthanum to lutetium, caused by the imperfect shielding of one electron by another in the same (4f) sub-shell. Consequence: Zr (160 pm) and Hf (159 pm) have almost identical radii, occur together and are hard to separate.",
    },
    {
      term: "Oxidation states of lanthanoids",
      text: "+3 is common; +2 and +4 arise from the extra stability of empty, half-filled or filled f subshell. \\(\\ce{Ce^4+}\\) (noble gas configuration) is a strong oxidant; \\(\\ce{Eu^2+}\\) (\\(f^7\\)) and \\(\\ce{Yb^2+}\\) (\\(f^{14}\\)) are reductants. Mischmetall: about 95 % lanthanoid metal, 5 % iron; used in bullets, shells and lighter flint.",
    },
    {
      term: "Actinoids",
      text: "Radioactive; later members have short half-lives and are made in nanogram quantities, so their study is more difficult. Wider range of oxidation states because 5f, 6d and 7s levels are of comparable energies. Actinoid contraction is greater from element to element, from poor shielding by 5f electrons.",
    },
  ],
  formulas: [
    {
      label: "Spin-only magnetic moment",
      latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      symbols: [{ symbol: "n", meaning: "number of unpaired electrons" }],
    },
    {
      label: "Moments to remember",
      latex: "n = 1, 2, 3, 4, 5: \\quad \\mu = 1.73,\\ 2.83,\\ 3.87,\\ 4.90,\\ 5.92\\ \\text{BM}",
    },
    {
      label: "General electronic configurations",
      latex: "\\text{d-block: }(n-1)d^{1-10}ns^{1-2} \\qquad \\text{Ln: [Xe]}\\,4f^{1-14}5d^{0-1}6s^2 \\qquad \\text{An: [Rn]}\\,5f^{1-14}6d^{0-1}7s^2",
    },
  ],
  derivations: [
    {
      title: "Calculate the spin-only magnetic moment of an ion",
      steps: [
        "Write the configuration, removing 4s electrons first: \\(\\ce{Mn^2+}\\) (Z = 25) is [Ar] \\(3d^5\\).",
        "Count unpaired d electrons: \\(n = 5\\).",
        "\\(\\mu = \\sqrt{5(5+2)} = \\sqrt{35} = 5.92\\) BM.",
      ],
    },
    {
      title: "Preparation of potassium dichromate from chromite ore",
      steps: [
        "Fuse chromite with sodium carbonate in air: \\(\\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}\\).",
        "Acidify the yellow chromate: \\(\\ce{2Na2CrO4 + 2H+ -> Na2Cr2O7 + 2Na+ + H2O}\\).",
        "Treat with KCl: \\(\\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}\\); orange crystals of \\(\\ce{K2Cr2O7}\\) separate.",
      ],
    },
    {
      title: "Preparation of potassium permanganate from pyrolusite",
      steps: [
        "Fuse \\(\\ce{MnO2}\\) with KOH in air: \\(\\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}\\) (dark green manganate).",
        "Manganate disproportionates in neutral or acidic solution: \\(\\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}\\).",
        "Commercially, manganate is oxidised electrolytically in alkaline solution to purple \\(\\ce{MnO4-}\\).",
        "On heating at 513 K: \\(\\ce{2KMnO4 -> K2MnO4 + MnO2 + O2}\\).",
      ],
    },
    {
      title: "Oxidising action of acidified potassium dichromate",
      steps: [
        "Half reaction: \\(\\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}\\).",
        "Iron(II): \\(\\ce{Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}\\).",
        "Tin(II): \\(\\ce{Cr2O7^2- + 14H+ + 3Sn^2+ -> 2Cr^3+ + 3Sn^4+ + 7H2O}\\).",
        "Iodide: \\(\\ce{Cr2O7^2- + 14H+ + 6I- -> 2Cr^3+ + 3I2 + 7H2O}\\).",
      ],
    },
    {
      title: "Oxidising action of potassium permanganate in acidic solution",
      steps: [
        "Iodide: \\(\\ce{10I- + 2MnO4- + 16H+ -> 2Mn^2+ + 8H2O + 5I2}\\).",
        "Iron(II): \\(\\ce{5Fe^2+ + MnO4- + 8H+ -> Mn^2+ + 4H2O + 5Fe^3+}\\).",
        "Oxalate at 333 K: \\(\\ce{5C2O4^2- + 2MnO4- + 16H+ -> 2Mn^2+ + 8H2O + 10CO2}\\).",
        "Sulphide: \\(\\ce{5S^2- + 2MnO4- + 16H+ -> 2Mn^2+ + 8H2O + 5S}\\).",
        "Sulphite: \\(\\ce{5SO3^2- + 2MnO4- + 6H+ -> 2Mn^2+ + 3H2O + 5SO4^2-}\\).",
        "Nitrite: \\(\\ce{5NO2- + 2MnO4- + 6H+ -> 2Mn^2+ + 5NO3- + 3H2O}\\).",
      ],
    },
    {
      title: "Oxidising action of potassium permanganate in neutral or faintly alkaline solution",
      steps: [
        "Iodide to iodate: \\(\\ce{2MnO4- + H2O + I- -> 2MnO2 + 2OH- + IO3-}\\).",
        "Thiosulphate to sulphate: \\(\\ce{8MnO4- + 3S2O3^2- + H2O -> 8MnO2 + 6SO4^2- + 2OH-}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Structures of chromate and dichromate ions",
      labels: ["chromate: tetrahedral CrO₄²⁻", "dichromate: two tetrahedra sharing one corner", "Cr-O-Cr bond angle 126°"],
    },
    {
      title: "Manganate and permanganate ions",
      labels: ["both tetrahedral", "manganate (green): one unpaired electron, paramagnetic", "permanganate (purple): diamagnetic"],
    },
    {
      title: "Trends in ionic radii of lanthanoids",
      labels: ["x-axis: atomic number 57 to 71", "y-axis: radius of Ln³⁺ in pm", "steady fall from La³⁺ to Lu³⁺"],
    },
    {
      title: "Trends in enthalpies of atomisation of transition elements",
      labels: ["3d, 4d and 5d series", "maxima near the middle", "Zn, Cd, Hg lowest"],
    },
  ],
  mostAsked: [
    {
      topic: "Physical properties: enthalpy of atomisation and melting points, ionisation enthalpies, catalytic activity, alloys, interstitial compounds",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "\\(\\ce{K2Cr2O7}\\) and \\(\\ce{KMnO4}\\): preparation, chromate and dichromate in acid and alkali, and balanced ionic equations of their oxidising action",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "\\(E^0\\) and stability of ions: Mn and Zn negative, Cu positive, \\(\\ce{Mn^3+}\\) oxidising and \\(\\ce{Cr^2+}\\) reducing, \\(\\ce{Cu+}\\) unstable in water",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Oxidation states: why variable, highest with oxygen, Mn shows +7, Sc only +3, Cu +1 and +2, acidic and basic oxides",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Lanthanoid contraction: what it is, its cause, consequences (Zr and Hf), and why actinoid contraction is greater",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Transition elements: definition, electronic configuration, why Zn, Cd and Hg are not transition elements but Cu, Ag and Sc are",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Lanthanoids and actinoids: +2 and +4 states (Ce, Eu), irregular configurations, wide range of actinoid oxidation states, misch metal",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Colour and magnetic moment: which ion is coloured or colourless, unpaired electrons, spin-only magnetic moment",
      marks: 1,
      years: [2025, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Removing 3d electrons before 4s",
      body: "Ions lose the 4s electrons first: \\(\\ce{Fe^2+}\\) is [Ar] \\(3d^6\\), not [Ar] \\(3d^4 4s^2\\); \\(\\ce{Cr^3+}\\) is \\(3d^3\\) (3 unpaired). Cr is [Ar] \\(3d^5 4s^1\\) and Cu is [Ar] \\(3d^{10} 4s^1\\).",
    },
    {
      title: "Calling every transition metal ion coloured",
      body: "Colour needs a d-d transition, so a partly filled d subshell. \\(\\ce{Sc^3+}\\) and \\(\\ce{Ti^4+}\\) (\\(d^0\\)), \\(\\ce{Cu+}\\) and \\(\\ce{Zn^2+}\\) (\\(d^{10}\\)) are colourless. Name the configuration in the reason.",
    },
    {
      title: "Wrong cause of lanthanoid contraction",
      body: "It is the **imperfect shielding** of one 4f electron by another as the nuclear charge rises, not an extra shell. Give a consequence too: Zr and Hf have almost identical radii.",
    },
    {
      title: "Ignoring the medium in \\(\\ce{KMnO4}\\) equations",
      body: "In acid, \\(\\ce{MnO4-}\\) goes to \\(\\ce{Mn^2+}\\) (5 electrons); in neutral or faintly alkaline solution, to \\(\\ce{MnO2}\\) (3 electrons). Iodide gives \\(\\ce{I2}\\) in acid but \\(\\ce{IO3-}\\) in alkaline solution. Check atoms and charge on both sides.",
    },
    {
      title: "Thinking chromate and dichromate differ in oxidation state",
      body: "Cr is +6 in both. They interconvert with pH: \\(\\ce{2CrO4^2- + 2H+ -> Cr2O7^2- + H2O}\\) (yellow to orange in acid) and \\(\\ce{Cr2O7^2- + 2OH- -> 2CrO4^2- + H2O}\\) (orange to yellow in alkali).",
    },
    {
      title: "Explaining a positive \\(E^0\\) of Cu by its configuration alone",
      body: "The reason is energetic: Cu has a high enthalpy of atomisation and ionisation, and the hydration enthalpy of \\(\\ce{Cu^2+}\\) does not balance it. The same hydration enthalpy makes \\(\\ce{Cu^2+}\\) more stable than \\(\\ce{Cu+}\\) in water.",
    },
  ],
};

export default sheet;
