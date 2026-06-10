import type { SubtopicNote } from "@/app/notes/_types";

export const DECOMPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Thermal and Photochemical Decomposition",
  title: "Thermal and Photochemical Decomposition",
  oneLineDefinition:
    "A decomposition reaction splits one compound into two or more products; the energy for the split comes from heat (thermal) or light (photochemical).",
  whyItMatters:
    "A small but reliable subtopic (3 PYQs) testing which oxides break on heating, which salts break in light, and the physical states of the products. " +
    "The recurring catches are that silver salts are the light-sensitive ones and that mercury oxide gives a LIQUID metal.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "thermal-photochemical",
      name: "Heat-driven vs light-driven decomposition",
      intuition:
        "Some compounds need heat to break apart (thermal decomposition); a few — mainly silver salts — break apart in sunlight (photochemical decomposition), which is the basis of black-and-white photography. The bank asks which decomposes, by which trigger, and into what states.",
      definition:
        "The decompositions the bank tests:\n" +
        "- **Thermal decomposition** (driven by **heat**): **2HgO →(Δ) 2Hg + O₂** — solid HgO gives **liquid** mercury and **gaseous** oxygen; **2Ag₂O →(Δ) 4Ag + O₂**; **CaCO₃ →(Δ) CaO + CO₂**; **2Pb(NO₃)₂ →(Δ) 2PbO + 4NO₂ + O₂**.\n" +
        "- **Photochemical decomposition** (driven by **sunlight**): **2AgCl →(sunlight) 2Ag + Cl₂** and **2AgBr →(sunlight) 2Ag + Br₂** — silver halides darken in light (used in photography).\n" +
        "- **Thermally stable** (do NOT decompose on heating): **ZnO, MgO** — these are stable oxides.\n" +
        "- Decomposition is the reverse of combination and usually needs energy IN (endothermic).",
      table: {
        columns: ["Reaction", "Trigger", "Product states / note"],
        rows: [
          {
            cells: ["2HgO → 2Hg + O₂", "Heat", "Solid → liquid Hg + gas O₂"],
            noteAmber: "Mercury is the metal that comes off as a LIQUID — states are solid, liquid, gas.",
          },
          { cells: ["2Ag₂O → 4Ag + O₂", "Heat", "Silver oxide decomposes on heating"] },
          {
            cells: ["2AgCl → 2Ag + Cl₂", "Sunlight", "Photochemical — silver chloride darkens in light"],
            noteAmber: "Silver halides (AgCl, AgBr) decompose in SUNLIGHT, not heat — the basis of photography.",
          },
          { cells: ["ZnO, MgO", "—", "Thermally STABLE — do not decompose on heating"] },
        ],
      },
      pyqExampleId: "f7fbdaa8-fcf6-4ec0-ac1e-46645e18aaac", // 2HgO -> 2Hg + O2 states = solid, liquid, gas
      practiceSet: [
        { prompt: "What triggers the decomposition 2AgCl → 2Ag + Cl₂?", answer: "Sunlight (photochemical decomposition)" },
        { prompt: "Heating HgO gives mercury in which state?", answer: "Liquid", method: "Hg is liquid at room temperature" },
        { prompt: "Which of ZnO, MgO and Ag₂O decomposes on heating?", answer: "Silver oxide (Ag₂O)", method: "ZnO and MgO are thermally stable" },
        { prompt: "Is decomposition usually endothermic or exothermic?", answer: "Endothermic", method: "energy is needed to break the compound" },
      ],
      traps: [
        {
          title: "Silver halides break in LIGHT, not heat",
          body:
            "2AgCl → 2Ag + Cl₂ is a PHOTOchemical decomposition — it happens in sunlight, not on heating. The light-sensitivity of silver salts is what made black-and-white photography work.",
        },
        {
          title: "HgO gives liquid mercury",
          body:
            "In 2HgO → 2Hg + O₂ the product states are solid (HgO), LIQUID (Hg) and gas (O₂). Mercury is a liquid metal at room temperature, so do not write it as a solid.",
        },
        {
          title: "ZnO and MgO are thermally stable",
          body:
            "Not every oxide decomposes on heating. ZnO and MgO are stable; silver oxide (Ag₂O) and mercury oxide (HgO) are the ones that break down.",
        },
      ],
    },
  ],
};
