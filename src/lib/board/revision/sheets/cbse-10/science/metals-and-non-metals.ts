import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 3 Metals and Non-metals. Statements checked
 * against the NCERT text (definitions in the book's own words); every equation
 * rebuilt and its atoms counted. Most-asked years and marks from all 141 CBSE
 * board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Metals and Non-metals",
  chapterSlug: "metals-and-non-metals",
  source: "NCERT Science (CBSE Class 10), Chapter 3",
  keyPoints: [
    {
      term: "Physical properties of metals",
      text: "Metals are lustrous, malleable, ductile, sonorous and good conductors of heat and electricity. Gold and silver are the most malleable and ductile. Silver and copper are the best conductors; lead and mercury are poor conductors of heat.",
    },
    {
      term: "Exceptions",
      text: "Mercury is a liquid metal; gallium and caesium melt on the palm. Sodium, potassium and lithium are so soft they can be cut with a knife, with low density and melting point. Bromine is a liquid non-metal; iodine is lustrous; graphite conducts electricity; diamond is the hardest natural substance.",
    },
    {
      term: "Metals with oxygen; amphoteric oxides",
      text: "Metal + oxygen gives a metal oxide, mostly **basic**. Non-metal oxides are acidic (\\(\\ce{SO2}\\), \\(\\ce{CO2}\\)). Oxides that react with both acids and bases to give salt and water are **amphoteric**: \\(\\ce{Al2O3}\\), ZnO. Aluminium, zinc and magnesium form a protective oxide layer. Gold and silver do not react with oxygen.",
    },
    {
      term: "Metals with water",
      text: "Sodium and potassium react violently with cold water and catch fire, so they are kept under kerosene. Calcium reacts less violently and **floats**, as hydrogen bubbles stick to it; magnesium floats in hot water. Aluminium, iron and zinc react only with steam, giving oxide + hydrogen. Lead, copper, silver and gold do not react.",
    },
    {
      term: "Metals with acids",
      text: "Metal + dilute acid gives salt + hydrogen; with dilute HCl the order is Mg > Al > Zn > Fe, and copper does not react. Nitric acid gives no hydrogen: \\(\\ce{HNO3}\\) is a strong oxidising agent that oxidises the \\(\\ce{H2}\\) to water and is reduced to \\(\\ce{N2O}\\), NO or \\(\\ce{NO2}\\). Only Mg and Mn give \\(\\ce{H2}\\) with very dilute \\(\\ce{HNO3}\\).",
    },
    {
      term: "Reactivity series and displacement",
      text: "A list of metals in decreasing order of activity: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au. A more reactive metal displaces a less reactive one from its salt solution: iron displaces copper, but copper cannot displace iron.",
    },
    {
      term: "Ionic compounds",
      text: "Compounds formed by the **transfer of electrons** from a metal to a non-metal. Each atom reaches a noble gas (octet) configuration: Na (2,8,1) loses one electron to become \\(\\ce{Na+}\\); Cl (2,8,7) gains one to become \\(\\ce{Cl-}\\). Also called electrovalent compounds.",
    },
    {
      term: "Properties of ionic compounds",
      text: "Solid and hard (strong attraction between ions), brittle; high melting and boiling points (much energy to break the attraction); soluble in water, insoluble in kerosene and petrol; do not conduct in the solid state (ions cannot move in the rigid structure) but conduct when molten or in solution.",
    },
    {
      term: "Minerals, ores and gangue",
      text: "Elements or compounds occurring naturally in the earth's crust are **minerals**; minerals from which a metal can be profitably extracted are **ores**. Ores carry impurities like soil and sand called **gangue**, removed first (enrichment). Gold and platinum occur free; metals at the top occur only as compounds.",
    },
    {
      term: "Metals low in the series",
      text: "Their oxides are reduced by heating alone. Cinnabar (HgS), the ore of mercury, is heated in air to HgO, which on further heating gives mercury. Copper is got from \\(\\ce{Cu2S}\\) by heating in air.",
    },
    {
      term: "Metals in the middle: roasting, calcination, reduction",
      text: "Iron, zinc, lead and copper occur as sulphides or carbonates; an oxide is easier to reduce. **Roasting:** heating a sulphide ore strongly in excess air. **Calcination:** heating a carbonate ore strongly in limited air. The oxide is then reduced by carbon, or by a more reactive metal (aluminium in the **thermit reaction**, which joins railway tracks).",
    },
    {
      term: "Metals at the top: electrolytic reduction",
      text: "Carbon cannot reduce the oxides of sodium, magnesium, calcium or aluminium because these metals have more affinity for oxygen than carbon. They are got by electrolysis of their molten chlorides: metal at the cathode, chlorine at the anode. Aluminium comes from electrolytic reduction of aluminium oxide.",
    },
    {
      term: "Electrolytic refining",
      text: "The most widely used method for refining impure metals. Anode: impure metal; cathode: a thin strip of pure metal; electrolyte: a salt solution of the metal (acidified copper sulphate for copper). Pure metal deposits on the cathode; soluble impurities go into solution; insoluble impurities settle below the anode as **anode mud**.",
    },
    {
      term: "Corrosion, its prevention and alloys",
      text: "Silver turns black (silver sulphide), copper turns green (basic copper carbonate), iron rusts in moist air. Prevention: painting, oiling, greasing, galvanising (zinc coat), chrome plating, anodising, alloying. An **alloy** is a homogeneous mixture of two or more metals, or a metal and a non-metal. Amalgam: an alloy with mercury.",
    },
  ],
  formulas: [
    { label: "Amphoteric aluminium oxide", latex: "\\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O} \\qquad \\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}" },
    { label: "Metals burnt in air", latex: "\\ce{2Cu + O2 -> 2CuO} \\qquad \\ce{4Al + 3O2 -> 2Al2O3} \\qquad \\ce{2Mg + O2 -> 2MgO}" },
    { label: "Basic oxide in water", latex: "\\ce{Na2O + H2O -> 2NaOH}" },
    { label: "Sodium and calcium with water", latex: "\\ce{2Na + 2H2O -> 2NaOH + H2} + \\text{heat} \\qquad \\ce{Ca + 2H2O -> Ca(OH)2 + H2}" },
    { label: "Metals with steam", latex: "\\ce{2Al + 3H2O -> Al2O3 + 3H2} \\qquad \\ce{3Fe + 4H2O -> Fe3O4 + 4H2}" },
    { label: "Metal with dilute acid", latex: "\\ce{Mg + 2HCl -> MgCl2 + H2} \\qquad \\ce{Zn + 2HCl -> ZnCl2 + H2}" },
    { label: "Displacement", latex: "\\ce{Fe + CuSO4 -> FeSO4 + Cu}" },
    { label: "Mercury from cinnabar", latex: "\\ce{2HgS + 3O2 ->[heat] 2HgO + 2SO2} \\qquad \\ce{2HgO ->[heat] 2Hg + O2}" },
    { label: "Copper from copper glance", latex: "\\ce{2Cu2S + 3O2 ->[heat] 2Cu2O + 2SO2} \\qquad \\ce{2Cu2O + Cu2S ->[heat] 6Cu + SO2}" },
    { label: "Zinc: roasting and calcination", latex: "\\ce{2ZnS + 3O2 ->[heat] 2ZnO + 2SO2} \\qquad \\ce{ZnCO3 ->[heat] ZnO + CO2}" },
    { label: "Zinc: reduction with carbon", latex: "\\ce{ZnO + C -> Zn + CO}" },
    { label: "Thermit reaction", latex: "\\ce{Fe2O3 + 2Al -> 2Fe + Al2O3} + \\text{heat} \\qquad \\ce{3MnO2 + 4Al -> 3Mn + 2Al2O3} + \\text{heat}" },
    { label: "Electrolysis of molten NaCl", latex: "\\text{cathode: } \\ce{Na+ + e- -> Na} \\qquad \\text{anode: } \\ce{2Cl- -> Cl2 + 2e-}" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Electrolytic refining of copper (Figure 3.12)",
      labels: ["anode: impure copper (to + terminal)", "cathode: thin strip of pure copper (to − terminal)", "electrolyte: acidified copper sulphate", "anode mud below the anode", "battery and switch"],
    },
    {
      title: "Conditions under which iron rusts (Figure 3.13)",
      labels: ["A: nails in water, air present: rust", "B: boiled distilled water with oil layer: no rust", "C: anhydrous calcium chloride, dry air: no rust", "corks on all three tubes"],
    },
    {
      title: "Action of steam on a metal (Figure 3.3)",
      labels: ["metal sample in a boiling tube", "glass wool soaked in water", "burner", "delivery tube", "hydrogen collected over water"],
    },
    {
      title: "Formation of sodium chloride and magnesium chloride (Figures 3.5, 3.6)",
      labels: ["Na (2,8,1) gives one electron", "Mg (2,8,2) gives two electrons, one to each Cl", "Cl (2,8,7) takes one electron", "ions with charges: Na⁺, Mg²⁺, Cl⁻"],
    },
    {
      title: "Steps in the extraction of metals from ores (Figure 3.10)",
      labels: ["ore, then concentration (remove gangue)", "high: electrolysis of molten ore", "middle: roasting or calcination, then reduction", "low: heating sulphide ore in air", "refining to pure metal"],
    },
  ],
  mostAsked: [
    {
      topic: "Extraction: roasting, calcination, reduction by carbon, thermit, electrolysis; mercury from cinnabar, copper from \\(\\ce{Cu2S}\\), zinc from ZnS",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Metals with water and acids: sodium kept under kerosene, calcium and magnesium float, iron with steam, no hydrogen with nitric acid",
      marks: 1,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Ionic compounds: show their formation by electron transfer (NaCl, \\(\\ce{MgCl2}\\), MgO, \\(\\ce{CaCl2}\\)) and give reasons for their properties",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Oxides: amphoteric oxides (\\(\\ce{Al2O3}\\), ZnO) with their equations; basic metal oxides and acidic non-metal oxides",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Corrosion and alloys: conditions for rusting, galvanisation, and alloys (brass, bronze, solder, stainless steel)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Reactivity series and displacement: arrange metals and predict which metal displaces another from a salt solution",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Electrolytic refining of copper: labelled diagram, anode, cathode, electrolyte and anode mud",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Physical properties: malleable, ductile, good conductors; the exceptions (sodium cut with a knife, mercury liquid, graphite conducts)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Mixing up roasting and calcination",
      body: "**Roasting** is for sulphide ores, in **excess** air, and gives \\(\\ce{SO2}\\). **Calcination** is for carbonate ores, in **limited** air, and gives \\(\\ce{CO2}\\). Both give the metal oxide.",
    },
    {
      title: "Electrolytic refining set the wrong way",
      body: "Impure copper is the **anode**; pure copper is the **cathode**. Copper leaves the anode and deposits on the cathode. Anode mud collects below the anode, not the cathode.",
    },
    {
      title: "Calling sodium oxide amphoteric",
      body: "Only \\(\\ce{Al2O3}\\) and ZnO here are amphoteric. \\(\\ce{Na2O}\\), \\(\\ce{K2O}\\) and MgO are basic. Show both reactions (with HCl and NaOH) to prove an oxide amphoteric.",
    },
    {
      title: "Electron-dot structure without charges",
      body: "Show the electron moving with an arrow, then write the ions with their charges in brackets: \\(\\ce{Mg^{2+}}\\) and two \\(\\ce{Cl-}\\) for \\(\\ce{MgCl2}\\). Write the electronic configuration first: Na 2,8,1; Mg 2,8,2; Cl 2,8,7; O 2,6.",
    },
    {
      title: "Saying solid NaCl conducts",
      body: "An ionic solid does **not** conduct: its ions cannot move. It conducts only when molten or dissolved in water.",
    },
    {
      title: "Wrong alloy constituents",
      body: "Brass: copper and zinc. Bronze: copper and tin. Solder: lead and tin (low melting point, for welding wires). Stainless steel: iron, nickel and chromium (does not rust). An alloy conducts less and melts lower than the pure metal.",
    },
  ],
};

export default sheet;
