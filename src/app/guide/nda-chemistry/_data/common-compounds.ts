/**
 * Content for /guide/nda-chemistry/common-compounds.
 *
 * Chemistry-specific subject artefact — the analogue of nda-english's
 * /vocab-families and nda-physics's /formulas. A single-page index of the
 * ~50 chemical name ↔ formula ↔ use pairs NDA Chemistry actually tests.
 *
 * Why themed clusters (not alphabetical flat list): matches /vocab-families
 * pattern and the bank's own subtopic structure ("Common Acids", "Common
 * Carbon Compounds", "Common Industrial Substances", "Common Chemicals").
 * Active-recall is easier when related compounds are co-located.
 *
 * Each entry: common name, formula, primary use, optionally the playbook
 * it most often appears in (so a reader can drill that chapter's bank q).
 *
 * Curation rule: every entry has appeared in the 2017–2026 NDA Chemistry
 * bank at least once (directly named in a question or in a solution).
 * Editorial curation; not exhaustive.
 */

export type CompoundEntry = {
  /** Stable kebab-case identifier. */
  id: string;
  /** Common name (preferred over IUPAC for recall). */
  name: string;
  /** Plain-text + unicode chemical formula. */
  formula: string;
  /** One-line use / context. */
  use: string;
  /** Optional playbook slug — links to deep-dive. */
  playbookSlug?: string;
  /** Optional note for traps / clarification. */
  notes?: string;
};

export type CompoundCluster = {
  /** Cluster theme (e.g. "Household acids"). */
  theme: string;
  /** Sub-eyebrow shown below theme. */
  blurb: string;
  compounds: CompoundEntry[];
};

export const COMPOUND_CLUSTERS: CompoundCluster[] = [
  {
    theme: "Common acids — sources and uses",
    blurb:
      "Acids you'll meet by name. NDA tests source-recall (oxalic in tomatoes, citric in lemons) almost every paper. Drill this cluster against the /playbooks/acids-bases-and-salts deep-dive.",
    compounds: [
      {
        id: "citric-acid",
        name: "Citric acid",
        formula: "C₆H₈O₇",
        use: "Citrus fruits (lemons, oranges) — sour taste",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "oxalic-acid",
        name: "Oxalic acid",
        formula: "(COOH)₂ · 2H₂O",
        use: "Tomatoes, spinach, rhubarb — rust remover",
        playbookSlug: "acids-bases-and-salts",
        notes: "Recurring NDA question: 'acid in tomatoes' = oxalic, not citric.",
      },
      {
        id: "lactic-acid",
        name: "Lactic acid",
        formula: "CH₃CH(OH)COOH",
        use: "Sour milk + curd; fatigued muscle build-up",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "acetic-acid",
        name: "Acetic acid (vinegar)",
        formula: "CH₃COOH",
        use: "Vinegar (5–8% solution) — food preservation, cooking",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "formic-acid",
        name: "Formic acid",
        formula: "HCOOH",
        use: "Ant + bee sting venom — leather processing",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "malic-acid",
        name: "Malic acid",
        formula: "C₄H₆O₅",
        use: "Apples, grapes (less ripe) — tart flavour",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "tartaric-acid",
        name: "Tartaric acid",
        formula: "C₄H₆O₆",
        use: "Grapes, tamarind — baking powder ingredient",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "hcl",
        name: "Hydrochloric acid",
        formula: "HCl",
        use: "Gastric juice (digestion) — industrial cleaning",
        playbookSlug: "acids-bases-and-salts",
        notes: "First mineral acid discovered historically — recurring HARD-trap question.",
      },
      {
        id: "sulphuric-acid",
        name: "Sulphuric acid",
        formula: "H₂SO₄",
        use: "Car batteries, fertilisers (superphosphate), oil refining",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "nitric-acid",
        name: "Nitric acid",
        formula: "HNO₃",
        use: "Fertilisers (ammonium nitrate), explosives (TNT)",
        playbookSlug: "industrial-and-applied-chemistry",
      },
    ],
  },
  {
    theme: "Common salts and bases",
    blurb:
      "The salts and bases NDA names directly. Watch the 'soda' suffix — multiple distinct compounds wear it.",
    compounds: [
      {
        id: "common-salt",
        name: "Common salt",
        formula: "NaCl",
        use: "Edible salt — saline; soap manufacture; freezing-mixture lowerant",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "washing-soda",
        name: "Washing soda",
        formula: "Na₂CO₃ · 10H₂O",
        use: "Glass + soap manufacture; water softening (laundry)",
        playbookSlug: "industrial-and-applied-chemistry",
        notes: "10 H₂O of crystallisation — recurring 'water of crystallisation' q.",
      },
      {
        id: "baking-soda",
        name: "Baking soda",
        formula: "NaHCO₃",
        use: "Baking (CO₂ leavening); antacid (neutralises stomach HCl); fire extinguisher",
        playbookSlug: "chemistry-in-everyday-life",
      },
      {
        id: "bleaching-powder",
        name: "Bleaching powder",
        formula: "Ca(OCl)Cl",
        use: "Disinfectant (water treatment); bleaching cotton/paper",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "caustic-soda",
        name: "Caustic soda",
        formula: "NaOH",
        use: "Soap + paper + textile manufacture; drain cleaner",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "slaked-lime",
        name: "Slaked lime",
        formula: "Ca(OH)₂",
        use: "Whitewashing; mortar; CO₂ detection (lime water turns milky)",
        playbookSlug: "chemical-reactions",
      },
      {
        id: "quick-lime",
        name: "Quick lime",
        formula: "CaO",
        use: "Cement; steel manufacture; flux in metallurgy",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "plaster-of-paris",
        name: "Plaster of Paris",
        formula: "CaSO₄ · ½H₂O",
        use: "Casts (medical); decorative; dental moulds",
        playbookSlug: "matter-and-its-states",
        notes: "Half a water of crystallisation per CaSO₄ unit (2:1 ratio).",
      },
      {
        id: "gypsum",
        name: "Gypsum",
        formula: "CaSO₄ · 2H₂O",
        use: "Source of Plaster of Paris (heated to drive off 1.5 H₂O)",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "epsom-salt",
        name: "Epsom salt",
        formula: "MgSO₄ · 7H₂O",
        use: "Laxative; bath salts; muscle-soreness soak",
        playbookSlug: "acids-bases-and-salts",
      },
      {
        id: "blue-vitriol",
        name: "Blue vitriol",
        formula: "CuSO₄ · 5H₂O",
        use: "Algicide; electroplating; fungicide",
        playbookSlug: "acids-bases-and-salts",
        notes: "Loses 5 H₂O on heating → anhydrous white CuSO₄ (dehydration colour-change trap).",
      },
      {
        id: "green-vitriol",
        name: "Green vitriol",
        formula: "FeSO₄ · 7H₂O",
        use: "Ink + pigment manufacture; water treatment",
        playbookSlug: "acids-bases-and-salts",
      },
    ],
  },
  {
    theme: "Common gases — uses + tests",
    blurb:
      "Gases NDA names. The 'test-for-gas' subtopic (lime water for CO₂, glowing-splint for O₂) recurs every 2–3 papers.",
    compounds: [
      {
        id: "oxygen",
        name: "Oxygen",
        formula: "O₂",
        use: "Respiration; combustion; medical use; deep-sea diver mix (with He)",
        playbookSlug: "chemistry-in-everyday-life",
        notes: "Test: relights a glowing wooden splint.",
      },
      {
        id: "nitrogen",
        name: "Nitrogen",
        formula: "N₂",
        use: "78% of air; inert atmosphere for chips/food packaging; liquid N₂ for cryogenics",
        playbookSlug: "atomic-structure-and-periodic-classification",
      },
      {
        id: "co2",
        name: "Carbon dioxide",
        formula: "CO₂",
        use: "Soft drinks; fire extinguisher (heavier than air, smothers); photosynthesis input",
        playbookSlug: "chemical-reactions",
        notes: "Test: turns lime water Ca(OH)₂ milky (CaCO₃ precipitate).",
      },
      {
        id: "co",
        name: "Carbon monoxide",
        formula: "CO",
        use: "Reducing agent in metal extraction; toxic combustion product (poor ventilation)",
        playbookSlug: "metals-and-non-metals",
        notes: "Neutral oxide — does NOT react with acid or base. Don't confuse with CO₂.",
      },
      {
        id: "h2",
        name: "Hydrogen",
        formula: "H₂",
        use: "Rocket fuel; ammonia synthesis (Haber); margarine manufacture (hydrogenation)",
        playbookSlug: "hydrogen-and-water",
        notes: "Lightest gas; burns with pale-blue flame; produces only H₂O on combustion.",
      },
      {
        id: "nh3",
        name: "Ammonia",
        formula: "NH₃",
        use: "Fertilisers (urea, ammonium nitrate); cleaning agent; refrigerant",
        playbookSlug: "industrial-and-applied-chemistry",
        notes: "Brønsted base; Lewis base (lone pair); pungent smell.",
      },
      {
        id: "cl2",
        name: "Chlorine",
        formula: "Cl₂",
        use: "Water disinfection; PVC manufacture; bleaching",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "so2",
        name: "Sulphur dioxide",
        formula: "SO₂",
        use: "H₂SO₄ manufacture (contact process); food preservative; bleaching wool/silk",
        playbookSlug: "industrial-and-applied-chemistry",
        notes: "Acidic oxide — pollutant causing acid rain.",
      },
      {
        id: "no2",
        name: "Nitrogen dioxide",
        formula: "NO₂",
        use: "HNO₃ manufacture; pollutant in vehicle exhaust",
        playbookSlug: "industrial-and-applied-chemistry",
        notes: "Acidic oxide; reddish-brown gas.",
      },
      {
        id: "helium",
        name: "Helium",
        formula: "He",
        use: "Balloons; deep-sea diver mix (with O₂, replaces N₂ to avoid nitrogen narcosis); MRI cooling",
        playbookSlug: "chemistry-in-everyday-life",
      },
    ],
  },
  {
    theme: "Fuels, hydrocarbons + organic everyday",
    blurb:
      "Burnable fuels + common organic compounds. The 'industrial fuel gas' (water gas / producer gas / coal gas) category recurs.",
    compounds: [
      {
        id: "methane",
        name: "Methane (natural gas)",
        formula: "CH₄",
        use: "Domestic + power-plant fuel; chief component of natural gas; biogas",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "ethanol",
        name: "Ethanol (ethyl alcohol)",
        formula: "C₂H₅OH",
        use: "Alcoholic drinks; antiseptic; solvent; biofuel additive",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "methanol",
        name: "Methanol (wood alcohol)",
        formula: "CH₃OH",
        use: "Industrial solvent; antifreeze; biodiesel feedstock",
        playbookSlug: "carbon-and-its-compounds",
        notes: "TOXIC if consumed — blindness + death.",
      },
      {
        id: "lpg",
        name: "LPG (cooking gas)",
        formula: "C₃H₈ + C₄H₁₀",
        use: "Domestic cooking; vehicles (autogas); industrial heating",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "water-gas",
        name: "Water gas",
        formula: "CO + H₂",
        use: "Industrial fuel; syngas for synthesis (methanol, NH₃)",
        playbookSlug: "industrial-and-applied-chemistry",
        notes: "Made by steam over hot coke: C + H₂O → CO + H₂.",
      },
      {
        id: "producer-gas",
        name: "Producer gas",
        formula: "CO + N₂",
        use: "Industrial fuel (lower CV than water gas — N₂ is inert)",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "biogas",
        name: "Biogas",
        formula: "CH₄ + CO₂",
        use: "Rural cooking + lighting fuel; from anaerobic digestion of organic waste",
        playbookSlug: "chemistry-in-everyday-life",
      },
      {
        id: "urea",
        name: "Urea",
        formula: "CO(NH₂)₂",
        use: "Nitrogen fertiliser (46% N — highest of any solid fertiliser); plastics",
        playbookSlug: "industrial-and-applied-chemistry",
      },
      {
        id: "glucose",
        name: "Glucose",
        formula: "C₆H₁₂O₆",
        use: "Blood sugar; cellular respiration substrate; food sweetener (corn syrup)",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "formaldehyde",
        name: "Formaldehyde",
        formula: "HCHO",
        use: "Biological specimen preservative; phenolic resin (Bakelite) feedstock; disinfectant",
        playbookSlug: "carbon-and-its-compounds",
      },
    ],
  },
  {
    theme: "Allotropes + key elements",
    blurb:
      "Allotropes (different forms of the same element) and a handful of named elements. NDA repeatedly tests diamond-vs-graphite property contrasts.",
    compounds: [
      {
        id: "diamond",
        name: "Diamond",
        formula: "C (sp³ tetrahedral)",
        use: "Cutting tool; abrasive; jewellery; semiconductor (doped)",
        playbookSlug: "carbon-and-its-compounds",
        notes: "Hardest natural substance. ELECTRICAL INSULATOR (sp³, no free e⁻).",
      },
      {
        id: "graphite",
        name: "Graphite",
        formula: "C (sp² layered)",
        use: "Pencil lead; lubricant; electrode (sp² conducts e⁻)",
        playbookSlug: "carbon-and-its-compounds",
        notes: "Thermodynamically MORE stable than diamond. Conducts electricity.",
      },
      {
        id: "fullerene",
        name: "Fullerene (Buckyball)",
        formula: "C₆₀",
        use: "Drug delivery research; superconductor (alkali-doped); nanotech",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "graphene",
        name: "Graphene",
        formula: "C (single sp² layer)",
        use: "Flexible electronics; strongest known material; high-conductivity composites",
        playbookSlug: "carbon-and-its-compounds",
      },
      {
        id: "ozone",
        name: "Ozone",
        formula: "O₃",
        use: "Stratospheric UV shield; water + air disinfectant (bleaching agent)",
        playbookSlug: "atomic-structure-and-periodic-classification",
        notes: "Allotrope of oxygen; pale-blue gas; pungent smell.",
      },
    ],
  },
  {
    theme: "Alloys — composition recall",
    blurb:
      "Alloys NDA tests by composition. Memorise the four big ones; the rest are variations.",
    compounds: [
      {
        id: "brass",
        name: "Brass",
        formula: "Cu + Zn (60–70% Cu)",
        use: "Hardware; musical instruments; decorative items",
        playbookSlug: "metals-and-non-metals",
      },
      {
        id: "bronze",
        name: "Bronze",
        formula: "Cu + Sn (~88% Cu + 12% Sn)",
        use: "Statues, coins, bells, sculpture",
        playbookSlug: "metals-and-non-metals",
      },
      {
        id: "stainless-steel",
        name: "Stainless steel",
        formula: "Fe + Cr (10–18%) + Ni (8–10%)",
        use: "Cutlery; surgical instruments; kitchenware; building",
        playbookSlug: "metals-and-non-metals",
        notes: "REQUIRES Cr (≥10.5%) for stain-resistance. Trap: 'Cr is not essential' is wrong.",
      },
      {
        id: "solder",
        name: "Solder",
        formula: "Pb + Sn (60% Pb + 40% Sn)",
        use: "Joining electrical wires + electronic components (low melting point)",
        playbookSlug: "metals-and-non-metals",
      },
      {
        id: "duralumin",
        name: "Duralumin",
        formula: "Al + Cu (4%) + Mg + Mn",
        use: "Aircraft body; lightweight high-strength structures",
        playbookSlug: "metals-and-non-metals",
      },
      {
        id: "steel",
        name: "Steel",
        formula: "Fe + C (<2% C)",
        use: "Construction; tools; machinery; vehicles — most-used alloy",
        playbookSlug: "metals-and-non-metals",
      },
      {
        id: "german-silver",
        name: "German silver",
        formula: "Cu + Zn + Ni (no actual silver)",
        use: "Decorative items; resistance wire — name is a misnomer",
        playbookSlug: "metals-and-non-metals",
      },
    ],
  },
];

/** Quick stats for the common-compounds hero. */
export const COMPOUND_STATS = {
  compounds: COMPOUND_CLUSTERS.reduce((s, c) => s + c.compounds.length, 0),
  clusters: COMPOUND_CLUSTERS.length,
};
