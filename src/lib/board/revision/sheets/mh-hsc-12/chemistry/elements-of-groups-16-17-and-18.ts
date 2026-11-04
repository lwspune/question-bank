import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 7 Elements of Groups 16, 17 and 18. Statements
 * checked against the Balbharati text; most-asked years from the board
 * past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Elements of Groups 16, 17 and 18",
  chapterSlug: "elements-of-groups-16-17-and-18",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Electronic configuration",
      text: "Group 16: \\(ns^2np^4\\); group 17: \\(ns^2np^5\\); group 18: \\(ns^2np^6\\). Groups 16 and 17 have two and one electrons less than the nearest noble gas. S: [Ne] \\(3s^23p^4\\); Kr: [Ar] \\(3d^{10}4s^24p^6\\).",
    },
    {
      term: "Trends down the group",
      text: "Atomic radii increase (more shells); ionisation enthalpy and electronegativity decrease; electron gain enthalpy becomes less negative. O is less negative than S and F less negative than Cl, because of small size.",
    },
    {
      term: "Ionisation enthalpy: group 16 below group 15",
      text: "Group 16 elements have lower ionisation enthalpy than group 15 in the same period, owing to the extra stable half filled p orbitals of group 15.",
    },
    {
      term: "Anomalous behaviour of oxygen",
      text: "**Atomicity:** \\(\\ce{O2}\\) diatomic, others polyatomic (\\(\\ce{S8}\\)). **Magnetic:** O₂ paramagnetic, others diamagnetic. **Oxidation state:** only \\(-2, -1, +2\\) (no d orbitals). **Hydride:** \\(\\ce{H2O}\\) liquid, others gases. Reasons: small size, high electronegativity, no d orbitals.",
    },
    {
      term: "Anomalous behaviour of fluorine",
      text: "Reasons: small size, high electronegativity, no d orbitals, low F-F bond dissociation enthalpy. It forms only one oxoacid (HOF); HF is a liquid (hydrogen bonding) while other hydrogen halides are gases; electron gain enthalpy lower than expected.",
    },
    {
      term: "Hydrides and halides",
      text: "\\(\\ce{H2O}\\) to \\(\\ce{H2Te}\\): acidic character increases, thermal stability decreases. Thermal stability HF > HCl > HBr > HI. Ionic character MF > MCl > MBr > MI.",
    },
    {
      term: "Reactivity towards metals",
      text: "Group 16 elements react with metals: \\(\\ce{Cu + S -> CuS}\\), \\(\\ce{Mg + Se -> MgSe}\\) (magnesium selenide).",
    },
    {
      term: "Oxoacids of halogens",
      text: "The acid strength of the halogen oxoacids increases with the increasing oxidation state of halogen: \\(\\ce{HOCl < HClO2 < HClO3 < HClO4}\\). Oxidation states in HOX, HXO₂, HXO₃, HXO₄: +1, +3, +5, +7.",
    },
    {
      term: "Ozone",
      text: "An allotrope of oxygen and a powerful oxidising agent, as it easily decomposes to liberate nascent oxygen. It bleaches by oxidation in the absence of moisture, so it is called a **dry bleach**.",
    },
    {
      term: "Ozone depletion",
      text: "Thinning of the ozone layer in the upper atmosphere. Caused by nitrogen oxide from car and supersonic jet exhausts (\\(\\ce{NO + O3 -> NO2 + O2}\\)) and by chlorofluorocarbons (freons) used in aerosols and refrigerators.",
    },
    {
      term: "Sulfur dioxide and sulfuric acid",
      text: "\\(\\ce{SO2}\\) is used in refining petroleum and sugar, bleaching wool and silk, as an anti-chlor, disinfectant and preservative. \\(\\ce{H2SO4}\\) (contact process) is used for fertilizers, paints, petroleum refining, detergents and metallurgy.",
    },
    {
      term: "Chlorine as a bleaching agent",
      text: "Chlorine requires moisture for bleaching. It liberates nascent oxygen from water, which oxidises coloured matter. Its bleaching is permanent; it is not used for delicate materials such as silk and wool. Uses: sterilising drinking water, bleaching wood pulp.",
    },
    {
      term: "Interhalogen compounds",
      text: "Compounds of two halogens, \\(XX'_n\\) (XX', XX'₃, XX'₅, XX'₇). X is the larger, more electropositive halogen. \\(n\\) is odd, so the molecule has an even number of atoms. Properties lie between those of the parent halogens; all are diamagnetic.",
    },
    {
      term: "Noble gases",
      text: "Ionisation energy falls down the group, so Xe forms \\(\\ce{XeF2}\\), \\(\\ce{XeF4}\\), \\(\\ce{XeF6}\\). He with \\(\\ce{O2}\\): breathing for asthma patients and sea divers; liquid He for low temperature. Ne: discharge lamps and signs, lasers.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Preparation of dioxygen in the laboratory",
      steps: [
        "From a chlorate: \\(\\ce{2KClO3 ->[MnO2][heat] 2KCl + 3O2}\\).",
        "From metal oxides: \\(\\ce{2PbO2 -> 2PbO + O2}\\), \\(\\ce{2HgO -> 2Hg + O2}\\).",
        "From hydrogen peroxide with a catalyst: \\(\\ce{2H2O2 ->[MnO2] 2H2O + O2}\\).",
      ],
    },
    {
      title: "Reactions of ozone",
      steps: [
        "Oxidising: \\(\\ce{O3 -> O2 + O}\\); \\(\\ce{PbS + 4O3 -> PbSO4 + 4O2}\\); \\(\\ce{2KI + H2O + O3 -> 2KOH + I2 + O2}\\).",
        "Bleaching (dry): coloured matter \\(+\\) [O] \\(\\to\\) colourless matter.",
        "Reducing peroxides: \\(\\ce{H2O2 + O3 -> H2O + 2O2}\\); \\(\\ce{BaO2 + O3 -> BaO + 2O2}\\).",
      ],
    },
    {
      title: "Preparation of sulfur dioxide, and sulfuric acid by the contact process",
      steps: [
        "\\(\\ce{S + O2 -> SO2}\\); \\(\\ce{4FeS2 + 11O2 -> 2Fe2O3 + 8SO2}\\); in the lab \\(\\ce{Na2SO3 + H2SO4 -> Na2SO4 + H2O + SO2}\\).",
        "Catalytic oxidation: \\(\\ce{2SO2 + O2 ->[V2O5] 2SO3}\\); exothermic and reversible, so low temperature (720 K) and high pressure (2 bar).",
        "\\(\\ce{SO3}\\) is absorbed in \\(\\ce{H2SO4}\\) to give oleum: \\(\\ce{SO3 + H2SO4 -> H2S2O7}\\).",
        "Oleum is diluted: \\(\\ce{H2S2O7 + H2O -> 2H2SO4}\\) (96 to 98 % pure).",
      ],
    },
    {
      title: "Reactions of chlorine",
      steps: [
        "Excess ammonia: \\(\\ce{8NH3 + 3Cl2 -> 6NH4Cl + N2}\\). Excess chlorine: \\(\\ce{NH3 + 3Cl2 -> NCl3 + 3HCl}\\).",
        "Cold dilute alkali: \\(\\ce{2NaOH + Cl2 -> NaCl + NaOCl + H2O}\\). Hot concentrated: \\(\\ce{6NaOH + 3Cl2 -> 5NaCl + NaClO3 + 3H2O}\\).",
        "Dry slaked lime gives bleaching powder: \\(\\ce{2Ca(OH)2 + 2Cl2 -> Ca(OCl)2 + CaCl2 + 2H2O}\\).",
        "Bleaching: \\(\\ce{Cl2 + H2O -> HCl + HOCl}\\), \\(\\ce{HOCl -> HCl + [O]}\\); coloured matter \\(+\\) [O] \\(\\to\\) colourless.",
      ],
    },
    {
      title: "Xenon fluorides: preparation and hydrolysis",
      steps: [
        "Xe and \\(\\ce{F2}\\) react directly in different ratios: \\(\\ce{Xe + F2}\\) in a sealed Ni tube at 400 °C gives \\(\\ce{XeF2}\\); \\(\\ce{Xe + 2F2}\\) gives \\(\\ce{XeF4}\\); \\(\\ce{Xe + 3F2}\\) gives \\(\\ce{XeF6}\\).",
        "\\(\\ce{2XeF2 + 2H2O -> 2Xe + 4HF + O2}\\).",
        "\\(\\ce{XeF6 + 3H2O -> XeO3 + 6HF}\\); partial hydrolysis: \\(\\ce{XeF6 + H2O -> XeOF4 + 2HF}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Structures of oxoacids of sulfur",
      labels: [
        "H₂SO₄: S with two S=O and two S-OH",
        "H₂S₂O₇: two S joined through an O bridge",
        "H₂SO₅: one S-O-O-H peroxy group",
        "H₂S₂O₈: S-O-O-S peroxy bridge",
        "H₂S₂O₃: one S=S in place of S=O",
      ],
    },
    {
      title: "Structures of oxoacids of chlorine",
      labels: ["H-O-Cl in every acid", "HOCl: no Cl=O", "HClO₂, HClO₃, HClO₄: one, two, three Cl=O"],
    },
    {
      title: "Shapes of interhalogen compounds",
      labels: ["ICl: linear", "ClF₃, BrF₃: bent T-shaped (two lone pairs)", "BrF₅, ClF₅: square pyramidal (one lone pair)"],
    },
    {
      title: "Structures of xenon compounds",
      labels: ["XeF₂: linear", "XeF₄: square planar", "XeF₆: distorted octahedral", "XeO₃: trigonal pyramidal", "XeOF₄: square pyramidal"],
    },
    {
      title: "Flow diagram for manufacture of sulfuric acid",
      labels: ["burner: S or iron pyrites burnt in air", "catalytic converter with V₂O₅", "720 K and 2 bar", "SO₃ absorbed in conc. H₂SO₄ to oleum", "oleum diluted to H₂SO₄"],
    },
  ],
  mostAsked: [
    {
      topic: "Anomalous behaviour of oxygen (atomicity, magnetic property, oxidation state, hydride) or of fluorine",
      years: [2026, 2025, 2024, 2023, 2014],
    },
    {
      topic: "Oxoacids of sulfur and chlorine: draw the structure, or the oxidation state of the halogen",
      years: [2026, 2025, 2024, 2023, 2015],
    },
    {
      topic: "Interhalogen compounds: definition, general characteristics, general formula or shape (ClF₃, BrF₅)",
      years: [2026, 2025, 2024, 2020, 2016],
    },
    {
      topic: "Trends down groups 16 and 17 (radii, ionisation enthalpy, electronegativity, electron gain enthalpy), or electronic configurations",
      years: [2026, 2024, 2023, 2022, 2017],
    },
    { topic: "Ozone: bleaching (dry bleach), action on hydrogen peroxide, depletion", years: [2026, 2025, 2023, 2018] },
    { topic: "Preparation of dioxygen from \\(\\ce{KClO3}\\) or \\(\\ce{PbO2}\\), and its uses", years: [2024, 2023, 2020] },
    { topic: "Chlorine: bleaching action, reaction with excess ammonia or slaked lime, uses", years: [2025, 2024, 2017] },
    { topic: "Noble gases: uses of helium and neon, or reactions of xenon fluorides", years: [2026, 2025, 2024] },
  ],
  mistakes: [
    {
      title: "Swapping the bleaching of ozone and chlorine",
      body: "Ozone bleaches **without** moisture (dry bleach). Chlorine needs moisture: it bleaches through nascent oxygen from HOCl, and the bleaching is permanent.",
    },
    {
      title: "Mixing the two ammonia and chlorine reactions",
      body: "Excess \\(\\ce{NH3}\\) gives \\(\\ce{NH4Cl + N2}\\). Excess \\(\\ce{Cl2}\\) gives explosive \\(\\ce{NCl3 + HCl}\\). Read which reactant is in excess.",
    },
    {
      title: "Giving fluorine the most negative electron gain enthalpy",
      body: "F has a less negative electron gain enthalpy than Cl, and O less negative than S, because of their small atomic size.",
    },
    {
      title: "Giving oxygen +4 or +6",
      body: "Oxygen has no d orbitals, so it cannot expand its octet: its states are \\(-2\\), \\(-1\\) (peroxides) and \\(+2\\) (\\(\\ce{OF2}\\)). S, Se and Te reach +4 and +6.",
    },
    {
      title: "Naming an interhalogen the wrong way round",
      body: "In \\(XX'_n\\), X is the larger halogen and is named first: ClF is chlorine monofluoride. \\(n\\) is always odd (1, 3, 5, 7).",
    },
    {
      title: "Ignoring lone pairs in shapes",
      body: "\\(\\ce{BrF5}\\) is square pyramidal (not trigonal bipyramidal) and \\(\\ce{ClF3}\\) is bent T-shaped, because the lone pairs on the central atom take positions too.",
    },
  ],
};

export default sheet;
