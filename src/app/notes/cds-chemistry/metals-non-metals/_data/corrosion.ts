import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MN_CORROSION_NOTE: SubtopicNote = {
  subtopicName: "Corrosion and Its Prevention",
  title: "Corrosion and Its Prevention",
  oneLineDefinition:
    "What iron, silver and copper turn into when they corrode, and the ways corrosion is stopped, anodising included.",
  whyItMatters:
    "Five CDS questions, and three of them ask the same thing: why silver turns black. The answer is silver sulphide every time. The one HARD question is on anodising.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschmn-tarnish",
      name: "What each metal forms when it corrodes",
      intuition:
        "Each metal is attacked by a different part of the air. Iron needs oxygen and water and forms rust. Silver reacts with sulphur compounds and turns black. Copper takes up moisture and carbon dioxide and turns green.",
      definition:
        "The three to know:\n" +
        "- **Iron** rusts: with **oxygen and water** it forms reddish-brown hydrated iron(III) oxide, Fe₂O₃·xH₂O. Both are needed.\n" +
        "- **Silver** tarnishes **black**: it reacts with **sulphur** (hydrogen sulphide) in air to form **silver sulphide, Ag₂S**. It is not an oxide.\n" +
        "- **Copper** turns **green**: with **moist CO₂** it forms **basic copper carbonate**, CuCO₃·Cu(OH)₂.",
      table: {
        columns: ["Metal", "Attacked by", "Product", "Colour"],
        rows: [
          { cells: ["Iron", "Oxygen and water", "Fe₂O₃·xH₂O (rust)", "Reddish-brown"] },
          {
            cells: ["Silver", "Sulphur / H₂S in air", "Ag₂S (silver sulphide)", "Black"],
            noteAmber: "Asked three times: CDS 2020 (I), 2020 (II) and 2021 (I).",
            pyqExampleId: "cbf70bdb-61be-4216-902a-a534fa80a29b",
          },
          {
            cells: ["Copper", "Moist carbon dioxide", "Basic copper carbonate", "Green"],
            pyqExampleId: "f55deb23-244b-4444-a084-586fc527b6fb",
          },
        ],
      },
      pyqExampleId: "6cc7f6d7-81d5-4ee7-9e47-adb069817559",
      selfCheckExample: {
        prompt: "An iron nail is kept in a sealed tube of dry air with anhydrous calcium chloride. Will it rust?",
        steps: [
          "Rusting needs both oxygen and water.",
          "The air is dry and calcium chloride absorbs any moisture, so there is no water.",
        ],
        answer: "No — without water, iron does not rust.",
      },
      practiceSet: [
        { prompt: "What is the black coating on old silver?", answer: "Silver sulphide, Ag₂S" },
        { prompt: "What two things does iron need in order to rust?", answer: "Oxygen and water" },
        { prompt: "What colour coating forms on copper in moist air?", answer: "Green (basic copper carbonate)" },
      ],
      traps: [
        {
          title: "Silver does not form an oxide",
          body: "Silver blackens because of **sulphur**, forming **Ag₂S**. Options naming silver oxide, silver carbonate or silver nitrate are wrong; so is the formula 'AgS'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschmn-prevention",
      name: "Preventing corrosion, and anodising",
      intuition:
        "Every method keeps air and water away from the metal, or lets a more reactive metal be attacked in its place. Anodising is the clever one: it uses electrolysis to grow a thicker oxide coat on aluminium, which then protects the metal beneath.",
      definition:
        "The methods:\n" +
        "- **Painting, oiling, greasing**: a barrier against air and water.\n" +
        "- **Galvanising**: coating iron with **zinc**. Zinc is more reactive, so it corrodes first and protects the iron even when scratched.\n" +
        "- **Tinning, electroplating** (chromium, nickel): a coat of a less reactive metal.\n" +
        "- **Alloying**: stainless steel resists rust.\n" +
        "- **Anodising**: the clean **aluminium** article is made the **anode** in electrolysis. **Oxygen is released at the anode** and thickens the protective **oxide layer**; hydrogen is released at the cathode. Aluminium, titanium and magnesium can be anodised; it is used in the **aircraft industry**.",
      table: {
        columns: ["Method", "How it protects"],
        rows: [
          { cells: ["Painting, oiling", "Keeps air and moisture away"] },
          { cells: ["Galvanising", "Zinc coat corrodes first, protecting iron"] },
          { cells: ["Electroplating, tinning", "Coat of a less reactive metal"] },
          {
            cells: ["Anodising", "Aluminium as the anode; O₂ at the anode thickens the oxide film"],
            noteAmber: "CDS 2023 (I), HARD: 'oxygen gas is evolved at the cathode' was the false statement.",
            pyqExampleId: "8d4adaab-3641-40a2-93da-e3763afa3d5a",
          },
        ],
      },
      pyqExampleId: "8d4adaab-3641-40a2-93da-e3763afa3d5a",
      practiceSet: [
        { prompt: "Which metal is used to galvanise iron?", answer: "Zinc" },
        { prompt: "In anodising, is the aluminium article the anode or the cathode?", answer: "The anode" },
        { prompt: "At which electrode is oxygen released during anodising?", answer: "The anode" },
      ],
      traps: [
        {
          title: "In anodising, oxygen forms at the anode",
          body: "The aluminium is the **anode**, and **oxygen** is released there, where it combines with the metal to thicken the oxide film. **Hydrogen** comes off at the cathode.",
        },
        {
          title: "Galvanising uses zinc, not tin",
          body: "Galvanised iron is coated with **zinc**, which is more reactive than iron and corrodes first. A tin coat only shields the iron; once it is scratched, the iron rusts faster.",
        },
      ],
    },
  ],
};
