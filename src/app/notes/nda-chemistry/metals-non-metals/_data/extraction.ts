import type { SubtopicNote } from "@/app/notes/_types";

export const EXTRACTION_NOTE: SubtopicNote = {
  subtopicName: "Extraction of Metals and Ores",
  title: "Extraction of Metals and Ores",
  oneLineDefinition:
    "The naturally occurring ores of common metals and the reduction method each metal needs — carbon reduction, electrolysis, or none for native metals.",
  whyItMatters:
    "A small but reliable pocket — about 2 PYQs of pure recall. " +
    "The bank asks which ore belongs to which metal (cinnabar → mercury) and which metals can be pulled out with cheap carbon reduction versus expensive electrolysis. " +
    "The reactivity series decides the method, so this links straight back to the previous subtopic.",
  concepts: [
    // ore -> metal table
    {
      kind: "reference" as const,
      slug: "common-ores",
      name: "Common ores and their metals",
      intuition:
        "An ore is the mineral a metal is profitably extracted from. The bank keeps a short list of named ores and asks which metal each one yields — cinnabar is the famous one for mercury. Learn the name↔metal pairs.",
      definition:
        "The high-frequency ore↔metal facts:\n" +
        "- **Cinnabar** (HgS) → **Mercury**.\n" +
        "- **Bauxite** (Al₂O₃·2H₂O) → **Aluminium**.\n" +
        "- **Haematite** (Fe₂O₃) → **Iron**.\n" +
        "- **Zinc blende** (ZnS) → **Zinc**.\n" +
        "- **Copper pyrites** (CuFeS₂) → **Copper**.\n" +
        "- **Galena** (PbS) → **Lead**.",
      table: {
        columns: ["Ore", "Formula", "Metal"],
        rows: [
          {
            cells: ["Cinnabar", "HgS", "Mercury"],
            noteAmber: "Cinnabar is the ore the bank tests most — it gives mercury.",
          },
          { cells: ["Bauxite", "Al₂O₃·2H₂O", "Aluminium"] },
          { cells: ["Haematite", "Fe₂O₃", "Iron"] },
          { cells: ["Zinc blende", "ZnS", "Zinc"] },
          { cells: ["Copper pyrites", "CuFeS₂", "Copper"] },
          { cells: ["Galena", "PbS", "Lead"] },
        ],
        caption: "Cinnabar = mercury, bauxite = aluminium, haematite = iron, galena = lead.",
      },
      pyqExampleId: "a11ea07d-3f3b-4891-a61a-debcf1e96839", // cinnabar is an ore of mercury
      practiceSet: [
        { prompt: "Cinnabar is an ore of which metal?", answer: "Mercury" },
        { prompt: "Bauxite is the ore of which metal?", answer: "Aluminium" },
        { prompt: "Which metal is extracted from haematite?", answer: "Iron" },
        { prompt: "Galena is an ore of which metal?", answer: "Lead" },
      ],
      traps: [
        {
          title: "Cinnabar is mercury, not copper",
          body:
            "Cinnabar (HgS) is the ore of **mercury**. Copper comes from **copper pyrites** (CuFeS₂); don't confuse the two sulphide ores.",
        },
      ],
    },

    // reduction method depends on reactivity
    {
      kind: "reference" as const,
      slug: "reduction-method",
      name: "Extraction method versus reactivity",
      intuition:
        "How a metal is pulled out of its ore depends on where it sits in the reactivity series. The least reactive metals are found native; mid-reactivity metals are reduced cheaply with carbon (coke); the most reactive metals hold their oxygen so tightly that only electrolysis works. The bank's favourite split is 'which metal can be extracted using carbon as reducing agent?'",
      definition:
        "Method by reactivity band:\n" +
        "- **Most reactive (K, Na, Ca, Mg, Al)** → **electrolysis** of the molten ore. Carbon cannot reduce them — for example aluminium needs electrolytic reduction.\n" +
        "- **Moderately reactive (Zn, Fe, Pb, Cu)** → **reduction with carbon (coke)**. Example: **ZnO + C → Zn + CO**, so zinc is extracted with carbon.\n" +
        "- **Least reactive (Ag, Au, Pt)** → occur **native** (as the free metal); little or no reduction needed.",
      table: {
        columns: ["Reactivity band", "Extraction method", "Example"],
        rows: [
          {
            cells: ["Most reactive (K, Na, Ca, Mg, Al)", "Electrolysis of molten ore", "Aluminium by electrolysis"],
            noteAmber: "Carbon CANNOT reduce these — they bind oxygen too strongly. Aluminium is the classic 'needs electrolysis' answer.",
          },
          {
            cells: ["Moderate (Zn, Fe, Pb, Cu)", "Reduction with carbon (coke)", "ZnO + C → Zn + CO"],
          },
          { cells: ["Least reactive (Ag, Au)", "Found native; no reduction", "Gold occurs as free metal"] },
        ],
        caption: "Carbon reduction works for moderate metals (Zn, Fe, Pb, Cu); reactive metals need electrolysis; noble metals occur native.",
      },
      pyqExampleId: "6229d938-d1f3-43f5-9795-2210eb180806", // metal extracted using carbon — zinc
      selfCheckExample: {
        prompt: "Of aluminium, zinc, silver and gold, which one is extracted by reducing its oxide with carbon?",
        steps: [
          "Aluminium is too reactive for carbon — it needs electrolysis.",
          "Silver and gold occur native, so they need no reduction.",
          "Zinc oxide is reduced by carbon: ZnO + C → Zn + CO.",
        ],
        answer: "Zinc — its oxide is reduced by carbon (coke).",
      },
      practiceSet: [
        { prompt: "Which method extracts aluminium?", answer: "Electrolysis (carbon can't reduce it)" },
        { prompt: "Can zinc be extracted by carbon reduction?", answer: "Yes — ZnO + C → Zn + CO" },
        { prompt: "How does gold occur in nature?", answer: "Native, as the free metal" },
        { prompt: "Why can't carbon reduce sodium or aluminium?", answer: "They are too reactive — they bind oxygen too strongly" },
      ],
      traps: [
        {
          title: "Aluminium needs electrolysis, not carbon",
          body:
            "Aluminium is too high in the reactivity series for carbon reduction; it is extracted by **electrolysis** of molten alumina. Only the moderate metals (Zn, Fe, Pb, Cu) yield to carbon.",
        },
      ],
    },
  ],
};
