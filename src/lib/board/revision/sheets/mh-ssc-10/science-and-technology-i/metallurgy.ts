import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 8 Metallurgy. Statements checked
 * against the Balbharati text; equations rebuilt and balanced by hand;
 * most-asked years from the board past papers in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Metallurgy",
  chapterSlug: "metallurgy",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Physical properties of metals",
      text: "Malleable, ductile, good conductors of heat and electricity, hard, high melting points, sonorous. Exceptions: lithium, sodium, potassium are soft (cut with a knife). Tungsten has the highest melting point, 3422 °C.",
    },
    {
      term: "Nonmetals and their exceptions",
      text: "Usually dull, not hard, low melting points, bad conductors. Exceptions: bromine is a liquid, iodine crystals are shiny, diamond is the hardest natural substance, **graphite conducts electricity**.",
    },
    {
      term: "Reactivity series",
      text: "Metals arranged in decreasing order of reactivity, from displacement reactions: K, Na, Li, Ca, Mg, Al, Zn, Fe, Sn, Pb, Cu, Hg, Ag, Au. A metal displaces any metal below it from its salt solution.",
    },
    {
      term: "Sodium kept in kerosene",
      text: "Sodium is so reactive that it combines with oxygen in air at room temperature and catches fire, and reacts vigorously with water. Kerosene keeps air and moisture away.",
    },
    {
      term: "Ionic compounds",
      text: "Compounds formed from a cation and an anion held by electrostatic force. Sodium gives one electron to chlorine: \\(\\ce{Na+}\\) and \\(\\ce{Cl-}\\) form NaCl.",
    },
    {
      term: "Properties of ionic compounds",
      text: "Hard, crystalline solids; brittle; high melting and boiling points; soluble in water but not in kerosene or petrol; conduct electricity when molten or in solution, not as solids.",
    },
    {
      term: "Metallurgy",
      text: "The science and technology of extracting metals from ores and purifying them for use. Steps: concentration of the ore, extraction (reduction) of the metal, refining.",
    },
    {
      term: "Minerals, ores and gangue",
      text: "Minerals: compounds of metals found in nature with impurities. Ores: minerals from which the metal can be separated economically. Gangue: the impurities (soil, sand, rocky matter) in an ore.",
    },
    {
      term: "Concentration of ores",
      text: "Separating gangue from the ore. Gravitation (Wilfley table, hydraulic separation), magnetic separation (cassiterite), froth floatation (sulphide ores), leaching (bauxite).",
    },
    {
      term: "Froth floatation",
      text: "Uses two opposite properties: hydrophobic sulphide ore particles get wetted by oil and rise with the froth; hydrophilic gangue gets wetted by water and sinks. Pine oil, air and an agitator make the froth. For ZnS and CuFeS₂.",
    },
    {
      term: "Extraction of aluminium",
      text: "Ore: bauxite. Impurities: silica, ferric oxide, titanium oxide, removed by leaching (Bayer's or Hall's process). Alumina melts above 2000 °C; cryolite and fluorspar lower this to about 1000 °C for electrolysis.",
    },
    {
      term: "Corrosion",
      text: "Iron in moist air forms reddish rust, \\(\\ce{Fe2O3.H2O}\\). Copper turns green (copper carbonate, patination). Silver turns black (silver sulphide from hydrogen sulphide in air).",
    },
    {
      term: "Prevention of corrosion",
      text: "Paint, oil, grease or varnish. **Galvanizing**: a zinc layer on iron. **Tinning**: molten tin on copper or brass (kalhaee). **Anodization**: an oxide layer on Cu or Al by electrolysis. **Electroplating**: a less reactive metal on a more reactive one.",
    },
    {
      term: "Alloy",
      text: "A homogeneous mixture of a metal with other metals or nonmetals in a certain proportion. Bronze: 90% copper, 10% tin. Brass: copper and zinc. Stainless steel: iron, chromium, carbon. With mercury it is an amalgam.",
    },
  ],
  formulas: [
    { label: "Sodium with oxygen and water", latex: "\\ce{4Na + O2 -> 2Na2O} \\qquad \\ce{2Na + 2H2O -> 2NaOH + H2 ^}" },
    { label: "Copper with concentrated nitric acid (brown NO2)", latex: "\\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 ^ + 2H2O}" },
    { label: "Bayer's process: leaching", latex: "\\ce{Al2O3.2H2O + 2NaOH -> 2NaAlO2 + 3H2O}" },
    { label: "Bayer's process: precipitation", latex: "\\ce{NaAlO2 + 2H2O -> NaOH + Al(OH)3 v}" },
    { label: "Hall's process: precipitation", latex: "\\ce{2NaAlO2 + 3H2O + CO2 -> 2Al(OH)3 v + Na2CO3}" },
    { label: "Calcination to alumina", latex: "\\ce{2Al(OH)3 ->[1000 ^\\circ C] Al2O3 + 3H2O}" },
    { label: "Electrolysis of alumina", latex: "\\text{Cathode: } \\ce{Al^{3+} + 3e- -> Al} \\qquad \\text{Anode: } \\ce{2O^{2-} -> O2 + 4e-}" },
    { label: "Thermit reaction", latex: "\\ce{Fe2O3 + 2Al -> 2Fe + Al2O3} + \\text{heat}" },
    { label: "Copper from copper sulphide", latex: "\\ce{2Cu2S + 3O2 -> 2Cu2O + 2SO2} \\qquad \\ce{2Cu2O + Cu2S -> 6Cu + SO2}" },
    {
      label: "Rusting of iron",
      latex: "\\text{Anode: } \\ce{Fe -> Fe^{2+} + 2e-} \\qquad \\text{Cathode: } \\ce{O2 + 4H+ + 4e- -> 2H2O}",
    },
  ],
  derivations: [
    {
      title: "Main steps in the extraction of aluminium",
      steps: [
        "Concentration: bauxite is leached with NaOH (Bayer's) or \\(\\ce{Na2CO3}\\) (Hall's) to give soluble sodium aluminate; insoluble impurities are filtered out.",
        "Aluminium hydroxide is precipitated, then calcined at 1000 °C to give pure alumina.",
        "Electrolytic reduction: alumina with cryolite and fluorspar in a steel tank lined with graphite (cathode); graphite rods are the anode.",
        "Aluminium collects at the bottom (cathode). Oxygen at the anode burns the graphite to \\(\\ce{CO2}\\), so the anodes are replaced from time to time.",
      ],
    },
    {
      title: "Froth floatation method",
      steps: [
        "Finely ground sulphide ore is put in a large tank of water with pine oil or eucalyptus oil.",
        "Air is blown in under pressure and the agitator rotates, so froth forms.",
        "Hydrophobic ore particles get wetted by oil and float up with the froth; hydrophilic gangue particles get wetted by water and settle.",
        "The froth with the concentrated ore is collected.",
      ],
    },
    {
      title: "Electroplating (silver on an aluminium spoon)",
      steps: [
        "The silver plate is the anode, the spoon is the cathode, the electrolyte has \\(\\ce{Ag+}\\) and \\(\\ce{NO3-}\\) ions.",
        "On passing current, silver ions are deposited on the spoon (cathode), and silver from the anode dissolves.",
        "A less reactive metal is coated on a more reactive one. Examples: silver plated spoons, gold plated ornaments.",
      ],
    },
  ],
  diagrams: [
    { title: "Froth floatation method", labels: ["air supply", "agitator", "froth with concentrated sulphide ore", "water and pine oil", "gangue at the bottom"] },
    { title: "Wilfley table method", labels: ["inclined vibrating table", "riffles", "stream of water", "ore powder", "gangue and concentrated ore"] },
    { title: "Hydraulic separation", labels: ["finely ground ore", "jet of water from below", "lighter gangue flows out", "heavy ore particles settle"] },
    { title: "Magnetic separation", labels: ["conveyor belt", "magnetic roller", "nonmagnetic roller", "magnetic and nonmagnetic heaps"] },
    { title: "Extraction of aluminium (electrolysis)", labels: ["graphite rods (anode)", "graphite lining (cathode)", "steel tank", "alumina, cryolite and fluorspar", "molten aluminium and its outlet"] },
    { title: "Electroplating", labels: ["cell", "anode silver plate", "cathode aluminium spoon", "electrolyte with silver ions"] },
  ],
  mostAsked: [
    { topic: "Properties of metals and nonmetals: copper or aluminium for transmission, tungsten in bulbs, graphite conducts, sodium in kerosene", marks: 2, years: [2025, 2024, 2023, 2019] },
    { topic: "Prevention of corrosion: alloys (brass, bronze), tinning, electroplating", marks: 1, years: [2026, 2025, 2024, 2020, 2019] },
    { topic: "Define metallurgy, ores and gangue", marks: 3, years: [2026, 2024, 2022] },
    { topic: "Corrosion: rust and its reactions, silver turns black, lemon cleans copper, protecting an iron door", marks: 2, years: [2025, 2024, 2023, 2020, 2016] },
    { topic: "Concentration of ores: froth floatation, Wilfley table, hydraulic method", years: [2026, 2020, 2019] },
    { topic: "Extraction of aluminium: steps, ore and its impurities, why anodes are replaced", years: [2026, 2022] },
    { topic: "Ionic compounds: properties, why NaCl is ionic", marks: 3, years: [2024, 2023] },
    { topic: "Reactivity series and reactions of metals (copper with nitric acid)", marks: 3, years: [2025, 2020] },
  ],
  mistakes: [
    {
      title: "Calling graphite a metal",
      body: "Graphite is a nonmetal (an allotrope of carbon) that conducts electricity. Mercury is the liquid metal, bromine the liquid nonmetal.",
    },
    {
      title: "Mixing up galvanizing and tinning",
      body: "Galvanizing: a zinc layer on iron. Tinning: a tin layer on copper or brass vessels. Anodization makes an oxide layer.",
    },
    {
      title: "Saying alumina is electrolysed alone",
      body: "Alumina melts above 2000 °C. Cryolite and fluorspar are added to lower the melting point to about 1000 °C.",
    },
    {
      title: "Wrong formula for rust",
      body: "Rust is hydrated ferric oxide, \\(\\ce{Fe2O3.H2O}\\), not plain FeO. Silver's black layer is \\(\\ce{Ag2S}\\); copper's green layer is copper carbonate.",
    },
    {
      title: "Saying ionic compounds conduct as solids",
      body: "In the solid state the ions cannot move. Ionic compounds conduct only when molten or dissolved in water.",
    },
  ],
};

export default sheet;
