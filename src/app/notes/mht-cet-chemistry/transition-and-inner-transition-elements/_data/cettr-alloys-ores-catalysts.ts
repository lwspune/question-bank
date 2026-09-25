import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/transition-and-inner-transition-elements";

export const ALLOYS_ORES_CATALYSTS_NOTE: SubtopicNote = {
  subtopicName: "Alloys, Minerals, Ores and Catalysts",
  title: "Alloys, Ores and Catalysts of the Transition Metals",
  oneLineDefinition:
    "Transition metals mix readily into alloys because their atoms are similar in size, occur in nature as oxide, carbonate and sulphide ores, and act as catalysts because they can change oxidation state and adsorb reactants on their surfaces.",
  whyItMatters:
    "7 PYQs, none HARD. Two name the alloy for a use (nichrome for gas turbine engines, stainless steel for the fuselage of ultra-high-speed aircraft), three name an ore (copper pyrites, chalcopyrite, calamine) and two a catalyst (V₂O₅ in the contact process, Co–Th in the Fischer–Tropsch synthesis). " +
    "One card.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cettr-alloys-ores-and-catalysts",
      name: "Alloys, Ores and Catalysts to Know",
      intuition:
        "Three lookup lists. For ores, the name often carries the metal and the anion: copper pyrites is CuFeS₂ (copper, iron and sulphur), calamine is zinc carbonate, siderite is iron carbonate. For catalysts, remember the process: contact process → V₂O₅, Haber → iron, hydrogenation of oils → nickel, Fischer–Tropsch gasoline from water gas → cobalt–thoria. For alloys, match the property to the use: nichrome resists heat (heating coils, gas turbines), stainless steel resists heat and corrosion (high-speed aircraft skin).",
      definition:
        "- **Alloys**: **nichrome** (Ni–Cr) — heating elements, gas turbine engines; **stainless steel** (Fe–Cr–Ni) — outer fuselage of ultra-high-speed aircraft, utensils; cupronickel (Cu–Ni) — coins; bronze (Cu–Sn); brass (Cu–Zn).\n" +
        "- **Ores**: copper — **chalcopyrite / copper pyrites** \\(\\text{CuFeS}_2\\) (Cu, Fe, S), chalcocite \\(\\text{Cu}_2\\text{S}\\); zinc — **calamine** \\(\\text{ZnCO}_3\\), zincite ZnO, zinc blende ZnS; iron — siderite \\(\\text{FeCO}_3\\), limonite \\(\\text{Fe}_2\\text{O}_3\\cdot x\\text{H}_2\\text{O}\\), haematite \\(\\text{Fe}_2\\text{O}_3\\), magnetite \\(\\text{Fe}_3\\text{O}_4\\).\n" +
        "- **Catalysts**: contact process (\\(\\text{SO}_2 \\to \\text{SO}_3\\)) — **\\(\\text{V}_2\\text{O}_5\\)**; Haber process — Fe (Mo promoter); hydrogenation of oils — Ni; **Fischer–Tropsch** (gasoline from water gas) — **Co–Th** (cobalt–thoria); Ziegler–Natta polymerisation — \\(\\text{TiCl}_4 + \\text{Al(C}_2\\text{H}_5)_3\\); Ostwald process — Pt/Rh.",
      table: {
        columns: ["Metal", "Ores", "Catalyst use"],
        rows: [
          { cells: ["Cu", "Chalcopyrite (copper pyrites) CuFeS₂; chalcocite Cu₂S", "—"] },
          { cells: ["Zn", "Calamine ZnCO₃; zincite ZnO; zinc blende ZnS", "—"] },
          { cells: ["Fe", "Siderite FeCO₃; limonite; haematite Fe₂O₃; magnetite Fe₃O₄", "Haber process"] },
          { cells: ["V", "—", "V₂O₅ in the contact process"] },
          { cells: ["Co", "—", "Co–Th in the Fischer–Tropsch synthesis"] },
          { cells: ["Ni", "—", "Hydrogenation of oils; Ni–Cr is nichrome"] },
        ],
        caption: "Siderite, limonite and haematite are iron; calamine and zincite are zinc.",
      },
      selfCheckExample: {
        prompt: "Which elements are present in copper pyrites?",
        steps: [
          "Copper pyrites is CuFeS₂.",
        ],
        answer: "Cu, Fe, S",
      },
      practiceSet: [
        { prompt: "Catalyst in the contact process for H₂SO₄?", answer: "Vanadium pentoxide" },
        { prompt: "Catalyst in the Fischer–Tropsch synthesis of gasoline?", answer: "Co–Th" },
        { prompt: "Alloy used in gas turbine engines?", answer: "Nichrome" },
        { prompt: "A mineral of zinc: siderite, calamine, chalcocite, limonite?", answer: "Calamine" },
        { prompt: "A mineral of copper: chalcopyrite, zincite, limonite, siderite?", answer: "Chalcopyrite" },
      ],
      pyqExampleId: "c3ade310-a174-4661-87bd-4ee35d33ac37",
      traps: [
        {
          title: "Reading 'copper pyrites' as copper and sulphur only",
          body:
            "Copper pyrites is CuFeS₂ — iron is in it too. And chalcocite (Cu₂S) is copper, while chalcopyrite is the mixed copper–iron sulphide.",
        },
      ],
    },
  ],
  related: [
    { label: "Oxidation States — why transition metals catalyse", href: `${BASE}/cettr-oxidation-states` },
  ],
};
