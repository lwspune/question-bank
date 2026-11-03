import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 8 Transition and Inner Transition Elements.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Transition and Inner Transition Elements",
  chapterSlug: "transition-and-inner-transition-elements",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Transition elements",
      text: "d block elements of groups 3 to 12. As per IUPAC, a transition metal atom has an incomplete d subshell or gives cations with an incomplete d subshell. Zn, Cd and Hg (\\(d^{10}\\) in atom and ion) are not regarded as transition elements.",
    },
    {
      term: "Electronic configuration of the 3d series",
      text: "General: [Ar] \\(3d^{1-10}4s^2\\), except Cr [Ar] \\(3d^54s^1\\) and Cu [Ar] \\(3d^{10}4s^1\\). Any subshell that is half filled or completely filled has extra stability, so the last electron goes to 3d instead of 4s.",
    },
    {
      term: "Oxidation states",
      text: "Transition elements show a great variety of oxidation states. The number rises with the number of unpaired d electrons, so the most occur in or near the middle: Mn shows +2 to +7, Sc shows only +3. \\(\\ce{Mn^2+}\\) (\\(3d^5\\), half filled) is more stable than \\(\\ce{Mn^3+}\\).",
    },
    {
      term: "Ionisation enthalpy",
      text: "The ionisation enthalpies of transition elements are intermediate between those of s block and p block elements. Third series elements have higher values, because 4f electrons shield poorly.",
    },
    {
      term: "Magnetic properties",
      text: "Due to unpaired electrons. Paramagnetic: attracted by a magnetic field; diamagnetic (all spins paired): repelled; ferromagnetic (Fe, Co, Ni): attracted very strongly. For the 3d series the orbital part is quenched, so the spin-only formula is used.",
    },
    {
      term: "Colour",
      text: "A substance appears coloured if it absorbs a portion of visible light; the observed colour is the complementary colour. Colour relates to: unpaired d electrons, d-d transitions, the nature of ligands and the geometry of the complex. \\(\\ce{Ti^4+}\\) (\\(3d^0\\)) and \\(\\ce{Cu+}\\) (\\(3d^{10}\\)) are colourless.",
    },
    {
      term: "Catalytic properties",
      text: "Transition metals and their compounds are good homogeneous and heterogeneous catalysts, as they change oxidation states. \\(\\ce{MnO2}\\) for \\(\\ce{KClO3}\\); Mo/Fe in Haber's process; Co-Th alloy in the Fischer Tropsch process (gasoline).",
    },
    {
      term: "Interstitial compounds",
      text: "Formed when small atoms like H, C or N are trapped in the interstitial spaces of the crystal lattice (steel, cast iron). Hard, good conductors, chemically like the parent metal, higher melting points and lower densities than the pure metal.",
    },
    {
      term: "Alloys",
      text: "Metals with similar radii and properties readily form alloys. **Ferrous:** mostly iron (nickel steel, stainless steel). **Non-ferrous:** brass (Cu + Zn), bronze (Cu + Sn, for statues, medals and trophies), cupra-nickel, nichrome.",
    },
    {
      term: "Pyrometallurgy and roasting",
      text: "**Pyrometallurgy:** the ore is reduced to metal at high temperature using reducing agents like carbon, hydrogen or aluminium. **Roasting:** the concentrated ore is heated in a current of air; S and As impurities escape as their oxides.",
    },
    {
      term: "Inner transition (f-block) elements",
      text: "Elements whose f orbitals get filled. Lanthanoids fill 4f, actinoids 5f, 14 elements each, placed at the bottom of the periodic table. Called inner transition elements because the f orbital lies much inside the d orbital.",
    },
    {
      term: "Lanthanoids",
      text: "[Xe] \\(4f^{0-14}5d^{0-2}6s^2\\). +3 is the common oxidation state; +2 and +4 occur for \\(f^0\\), \\(f^7\\), \\(f^{14}\\) (\\(\\ce{Ce^4+}\\), \\(\\ce{Eu^2+}\\), \\(\\ce{Yb^2+}\\)). All except promethium (Pm) are nonradioactive. Gd: [Xe] \\(4f^75d^16s^2\\).",
    },
    {
      term: "Lanthanoid contraction",
      text: "The steady decrease in the atomic and ionic radii along the lanthanoid series. Each new electron enters the inner 4f subshell, and 4f electrons shield each other poorly, so the effective nuclear charge rises and the shell contracts.",
    },
    {
      term: "Actinoids and post-actinoids",
      text: "[Rn] \\(5f^{0-14}6d^{0-2}7s^2\\); all radioactive, oxidation states +2 to +7, most stable +3. The actinoid series runs from thorium (Z = 90) to lawrencium (Z = 103). Elements beyond Z = 92 are transuranium; Z = 93 to 103 are included in the actinoid series, and Z = 104 to 118 are post-actinoid elements.",
    },
  ],
  formulas: [
    {
      label: "Spin-only magnetic moment",
      latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      symbols: [{ symbol: "n", meaning: "number of unpaired electrons" }],
    },
    {
      label: "Spin-only values",
      latex: "n = 1, 2, 3, 4, 5: \\quad \\mu = 1.73,\\ 2.83,\\ 3.87,\\ 4.90,\\ 5.92\\ \\text{BM}",
    },
    {
      label: "General electronic configurations",
      latex: "\\text{3d: [Ar]}\\,3d^{1-10}4s^2 \\qquad \\text{Ln: [Xe]}\\,4f^{0-14}5d^{0-2}6s^2 \\qquad \\text{An: [Rn]}\\,5f^{0-14}6d^{0-2}7s^2",
    },
  ],
  derivations: [
    {
      title: "Calculate the spin-only magnetic moment of an ion",
      steps: [
        "Write the atom's configuration, then remove the 4s electrons first: \\(\\ce{Fe^2+}\\) (Z = 26) is [Ar] \\(3d^6\\).",
        "Count unpaired d electrons by Hund's rule: \\(3d^6\\) has \\(n = 4\\).",
        "\\(\\mu = \\sqrt{4(4+2)} = \\sqrt{24} = 4.90\\) BM.",
      ],
    },
    {
      title: "Preparation of potassium dichromate from chromite ore",
      steps: [
        "Chromite ore is heated with \\(\\ce{Na2CO3}\\) and lime in air: \\(\\ce{4(FeO.Cr2O3) + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}\\).",
        "Sodium chromate is extracted with water and acidified: \\(\\ce{2Na2CrO4 + H2SO4 -> Na2Cr2O7 + Na2SO4 + H2O}\\).",
        "KCl precipitates less soluble orange-red \\(\\ce{K2Cr2O7}\\): \\(\\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}\\).",
      ],
    },
    {
      title: "Reactions of acidified potassium dichromate",
      steps: [
        "With KI: \\(\\ce{K2Cr2O7 + 6KI + 7H2SO4 -> 4K2SO4 + Cr2(SO4)3 + 7H2O + 3I2}\\) (brown).",
        "With \\(\\ce{H2S}\\): \\(\\ce{K2Cr2O7 + 4H2SO4 + 3H2S -> K2SO4 + Cr2(SO4)3 + 7H2O + 3S}\\); orange turns green, pale yellow S separates.",
      ],
    },
    {
      title: "Preparation of potassium permanganate",
      steps: [
        "\\(\\ce{3MnO2 + 6KOH + KClO3 -> 3K2MnO4 + KCl + 3H2O}\\) (dark green manganate).",
        "In neutral or acidic medium manganate disproportionates: \\(\\ce{3K2MnO4 + 4CO2 + 2H2O -> 2KMnO4 + MnO2 + 4KHCO3}\\).",
        "Or electrolytic oxidation of alkaline manganate: \\(\\ce{2K2MnO4 + H2O + [O] -> 2KMnO4 + 2KOH}\\).",
      ],
    },
    {
      title: "Extraction of iron in the blast furnace",
      steps: [
        "Zone of combustion (about 2000 K): \\(\\ce{C + 1/2O2 -> CO}\\), highly exothermic.",
        "Zone of reduction (about 900 K): \\(\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}\\); some by carbon, \\(\\ce{Fe2O3 + 3C -> 2Fe + 3CO}\\). CO and C are the reducing agents.",
        "Zone of slag formation (about 1200 K): \\(\\ce{CaCO3 -> CaO + CO2}\\), \\(\\ce{CaO + SiO2 -> CaSiO3}\\) (slag).",
        "Zone of fusion: spongy iron melts, absorbs C, Si, Mn, P, S and collects at the bottom as pig iron (about 4 % C).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Blast furnace",
      labels: ["cup and cone for the charge", "stack, bosh and hearth", "tuyeres with hot air blast", "zones of reduction, slag formation, combustion", "slag and pig iron tap holes"],
    },
    {
      title: "Ionic radii of lanthanoids in +3 oxidation state",
      labels: ["ionic radius on the vertical axis", "La to Lu along the horizontal axis", "steady fall: lanthanoid contraction"],
    },
  ],
  mostAsked: [
    {
      topic: "Lanthanoids and actinoids: similarities and differences, position, radioactive, transuranium and post-actinoid elements",
      years: [2026, 2025, 2024, 2023, 2016, 2014],
    },
    {
      topic: "Electronic configuration: 3d series (general, Cr, \\(\\ce{Zn^2+}\\)), lanthanoids (general, Gd)",
      years: [2026, 2025, 2024, 2023, 2020],
    },
    {
      topic: "Spin-only magnetic moment of a transition metal ion",
      years: [2026, 2025, 2024, 2023, 2022, 2019],
    },
    {
      topic: "Colour of transition metal ions: the factors, or why \\(\\ce{Sc^3+}\\) and \\(\\ce{Ti^4+}\\) are colourless",
      years: [2026, 2025, 2024, 2020, 2017],
    },
    { topic: "Interstitial compounds and alloys (brass, bronze, Fischer Tropsch alloy)", years: [2026, 2025, 2024, 2023] },
    { topic: "Define lanthanoid contraction", years: [2025, 2024, 2018, 2015] },
    { topic: "Blast furnace: reactions in the zone of reduction; pyrometallurgy and roasting", years: [2026, 2025, 2024, 2015] },
    { topic: "Oxidation states of transition elements; why \\(\\ce{Mn^2+}\\) is more stable than \\(\\ce{Mn^3+}\\)", years: [2022, 2019, 2017, 2014] },
  ],
  mistakes: [
    {
      title: "Removing 3d electrons before 4s",
      body: "Ions lose 4s electrons first. \\(\\ce{Fe^2+}\\) is [Ar] \\(3d^6\\), not [Ar] \\(3d^44s^2\\); \\(\\ce{Zn^2+}\\) is [Ar] \\(3d^{10}\\).",
    },
    {
      title: "Writing the expected configuration of Cr or Cu",
      body: "Write the observed one: Cr [Ar] \\(3d^54s^1\\), Cu [Ar] \\(3d^{10}4s^1\\), because half filled and completely filled subshells are extra stable.",
    },
    {
      title: "Using the number of d electrons as \\(n\\)",
      body: "\\(n\\) is the number of **unpaired** electrons. \\(3d^8\\) has 2, not 8; \\(3d^5\\) has 5. Give \\(\\mu\\) in BM.",
    },
    {
      title: "Calling every transition metal ion coloured",
      body: "Ions with no unpaired d electrons, \\(d^0\\) (\\(\\ce{Sc^3+}\\), \\(\\ce{Ti^4+}\\)) and \\(d^{10}\\) (\\(\\ce{Zn^2+}\\), \\(\\ce{Cu+}\\)), are colourless: no d-d transition is possible.",
    },
    {
      title: "Explaining lanthanoid contraction by more shells",
      body: "No shell is added. The cause is the poor shielding of one 4f electron by another, so the effective nuclear charge rises across the series.",
    },
    {
      title: "Swapping brass and bronze",
      body: "Brass is copper and zinc; bronze is copper and tin.",
    },
  ],
};

export default sheet;
