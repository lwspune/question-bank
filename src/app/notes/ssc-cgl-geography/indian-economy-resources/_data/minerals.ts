import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIE_MINERALS_NOTE: SubtopicNote = {
  subtopicName: "Minerals and Energy",
  title: "Minerals and Energy",
  oneLineDefinition:
    "Where India's iron ore, bauxite, coal and other minerals lie, which minerals India lacks, and the oil fields, power stations and renewable sites SSC names.",
  whyItMatters:
    "Eighteen questions in the bank, and 13 of them come from the 2025 shifts. Those papers asked mostly about iron ore and bauxite, as place-to-mineral matches and true-or-false statements, so learn each mineral with its districts and its rock.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgiemi-minerals",
      name: "Minerals and where they lie",
      intuition:
        "India is rich in iron ore, bauxite, coal and building stone, and poor in copper, lead and zinc. Learn each plentiful mineral with the places it comes from: SSC gives a district or a hill and asks the mineral, or the other way round.",
      definition:
        "**Iron ore** (India has the largest reserves in Asia, of both **haematite and magnetite**):\n" +
        "- **Odisha**: Sundargarh, Mayurbhanj, Keonjhar. **Jharkhand**: **Singhbhum**. **Chhattisgarh**: the **Bailadila** range.\n" +
        "- **Karnataka**: Bellary-Hospet and **Kudremukh**. Most reserves lie in Odisha, Jharkhand, Chhattisgarh, Karnataka and Goa.\n\n" +
        "**Bauxite**: found in **laterite** on the plateaus and hills of the peninsula; **Odisha** is the largest producer.\n\n" +
        "**Coal**: most of it is Gondwana coal of the **Damodar valley** (Jharia, Bokaro, Raniganj). **Lignite**, a soft, brown, low-grade coal, comes from **Neyveli** in Tamil Nadu.\n\n" +
        "Others:\n" +
        "- India is **short of non-ferrous metals**: **copper, lead and zinc**. Hindustan Copper Ltd was set up in **1967**.\n" +
        "- It is **rich in non-metallic minerals** (limestone, mica, gypsum) used by major industries.\n" +
        "- The **Himalayan** belt holds copper, lead, zinc and cobalt; **Rajasthan** holds most of the building stone.",
      table: {
        columns: ["Place", "Mineral"],
        rows: [
          { cells: ["Bailadila, Chhattisgarh", "Iron ore"], pyqExampleId: "3bcd75a4-8f86-463b-8c84-76f276483bab" },
          { cells: ["Kudremukh, Karnataka", "Iron ore"], pyqExampleId: "9be11c18-b5b9-4760-b4fd-ba9ecdc21e71" },
          { cells: ["Singhbhum, Jharkhand", "Iron ore"] },
          { cells: ["Neyveli, Tamil Nadu", "Lignite"], pyqExampleId: "f852c62a-e56e-4ebc-9b87-6c081598435a" },
          { cells: ["Damodar valley", "Coal"], pyqExampleId: "abf3abee-16e9-4d94-9c1b-28c0423524e8" },
          { cells: ["Laterite plateaus, Odisha", "Bauxite"], pyqExampleId: "3aca212e-4d37-4d7c-8a66-9bd6ee8aa6aa" },
        ],
      },
      pyqExampleId: "7b9bc152-e354-4ffb-a823-e9b78dad35eb",
      selfCheckExample: {
        prompt: "A statement says only haematite iron ore occurs in India. Is it right?",
        steps: ["India has both haematite and magnetite.", "Magnetite occurs mainly in Karnataka, Andhra Pradesh and Tamil Nadu."],
        answer: "No: India has both haematite and magnetite.",
      },
      practiceSet: [
        { prompt: "Which State is the largest producer of bauxite?", answer: "Odisha" },
        { prompt: "In which rock is most of India's bauxite found?", answer: "Laterite" },
        { prompt: "Name three non-ferrous metals India is short of.", answer: "Copper, lead and zinc" },
        { prompt: "In which year was Hindustan Copper Limited set up?", answer: "1967" },
      ],
      traps: [
        {
          title: "Bauxite is not Dharwar, and not Jharkhand's",
          body: "The **Dharwar** rocks are known for iron ore and manganese. **Bauxite** lies in **laterite**, and **Odisha** leads, not Jharkhand.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgiemi-energy",
      name: "Coal grades, oil fields and power",
      intuition:
        "Energy questions ask where a field or station is, or what kind of energy a coast suits. The North-East has the old oil fields; the deep, narrow gulfs of the west coast suit tidal power.",
      definition:
        "The facts:\n" +
        "- Coal grades, best first: **anthracite**, bituminous, then **lignite** (brown, soft, wet).\n" +
        "- **Oil**: **Digboi** (India's oldest field), Naharkatiya and Moran are in **Upper Assam**, in the North-East.\n" +
        "- **Talcher** thermal power station is in **Odisha**.\n" +
        "- **Tidal** energy suits the **Gulf of Khambhat**, the **Gulf of Kutch** and the **Sundarbans**, where the tides rise high in narrow inlets.\n" +
        "- **Solar** power has low running costs; the **Kamuthi** plant in Tamil Nadu (648 MW) is one of the largest single-site plants.",
      table: {
        columns: ["Place", "Energy"],
        rows: [
          { cells: ["Digboi, Assam", "Oil (oldest field)"] },
          { cells: ["Talcher, Odisha", "Thermal power"], pyqExampleId: "44d3fb0d-6ea1-40a3-ace5-ceb9e6e839ad" },
          { cells: ["Gulfs of Khambhat and Kutch", "Tidal energy"], pyqExampleId: "2bbc9ab3-1c6d-4322-a984-71def979e029" },
          { cells: ["Kamuthi, Tamil Nadu", "Solar (648 MW)"], pyqExampleId: "66fd0541-8936-448f-853d-b6586b0f1481" },
          { cells: ["Neyveli, Tamil Nadu", "Lignite"], pyqExampleId: "ebe9d715-03cd-46bd-bb72-3fc46c5ce514" },
        ],
      },
      pyqExampleId: "d9b4cdda-3daf-4d4f-95df-d8c1275c6a4a",
      selfCheckExample: {
        prompt: "Rank anthracite, lignite and bituminous coal from best to poorest.",
        steps: ["Anthracite has the most carbon and is the best grade.", "Bituminous comes next, and lignite, soft and wet, is the poorest."],
        answer: "Anthracite, bituminous, lignite.",
      },
      practiceSet: [
        { prompt: "Which is India's oldest oil field?", answer: "Digboi" },
        { prompt: "In which State is Talcher thermal power station?", answer: "Odisha" },
        { prompt: "Which kind of energy suits the Gulf of Khambhat?", answer: "Tidal energy" },
      ],
      traps: [
        {
          title: "Lignite is the lowest grade",
          body: "**Lignite** is low-grade brown coal with much moisture. **Anthracite** is the best grade.",
        },
      ],
    },
  ],
};
