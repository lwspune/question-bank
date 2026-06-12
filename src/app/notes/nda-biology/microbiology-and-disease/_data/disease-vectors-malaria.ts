import type { SubtopicNote } from "@/app/notes/_types";

export const DISEASE_VECTORS_MALARIA_NOTE: SubtopicNote = {
  subtopicName: "Disease Vectors — Malaria",
  title: "Disease Vectors — Malaria",
  oneLineDefinition:
    "A vector is the carrier that moves a pathogen from host to host; for malaria the vector is the female Anopheles mosquito, while the pathogen it carries is the protozoan Plasmodium.",
  whyItMatters:
    "The vector-vs-pathogen distinction is exactly the kind of fact the NDA loves to blur. " +
    "Malaria's vector question has appeared (2025) and is a guaranteed mark if you keep two things straight: it is the FEMALE mosquito (she needs a blood meal for her eggs) and it is the ANOPHELES species (not Culex or Aedes). " +
    "Learn the mosquito-to-disease map alongside it — Anopheles : malaria, Aedes : dengue, Culex : filariasis.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "micro-malaria-vector",
      name: "The malaria vector — female Anopheles",
      intuition:
        "Two different organisms are involved in malaria: the mosquito that carries it (the VECTOR) and the parasite that causes the fever (the PATHOGEN). " +
        "The vector is the **female Anopheles mosquito**; the pathogen is **Plasmodium**. Only the female bites for blood — she needs the protein to mature her eggs — so only the female transmits the parasite.",
      definition:
        "The vector-vs-pathogen split for malaria, plus the mosquito-to-disease map:\n" +
        "- **Vector:** the **female Anopheles mosquito** — the carrier. (The male feeds on nectar and never bites, so it cannot transmit.)\n" +
        "- **Pathogen:** **Plasmodium** — a protozoan parasite that multiplies in the human liver, then in red blood cells.\n" +
        "- Other mosquito vectors: **Aedes** carries dengue and chikungunya; **Culex** carries filariasis (elephantiasis) and Japanese encephalitis.",
      visualizationSlug: "micro-malaria-cycle",
      table: {
        columns: ["Mosquito", "Disease carried", "Note"],
        rows: [
          {
            cells: ["**Female Anopheles**", "Malaria", "Only the FEMALE bites; pathogen = Plasmodium"],
            noteAmber: "Vector = female Anopheles; pathogen = Plasmodium. Keep the two distinct. NDA 2025.",
            pyqExampleId: "9cb7e1e9-1101-4df4-926d-d507dbcb4f32",
          },
          { cells: ["**Aedes**", "Dengue, chikungunya, Zika", "Daytime biter; tiger-striped legs"] },
          { cells: ["**Culex**", "Filariasis, Japanese encephalitis", "Carries the elephantiasis worm Wuchereria"] },
        ],
        caption:
          "Anopheles → malaria, Aedes → dengue, Culex → filariasis. The vector carries; the pathogen causes.",
      },
      selfCheckExample: {
        prompt:
          "An item says 'malaria is caused by the female Anopheles mosquito'. What is wrong with the wording, and what is the precise correct statement?",
        steps: [
          "The mosquito does not CAUSE malaria — it CARRIES the parasite.",
          "Malaria is caused by Plasmodium, a protozoan (the pathogen).",
          "The female Anopheles mosquito is the VECTOR that transmits Plasmodium.",
        ],
        answer:
          "Malaria is caused by Plasmodium; the female Anopheles mosquito is the vector that transmits it.",
      },
      practiceSet: [
        { prompt: "What is the vector of malaria?", answer: "Female Anopheles mosquito", method: "only the female bites for blood" },
        { prompt: "What is the pathogen of malaria?", answer: "Plasmodium", method: "a protozoan" },
        { prompt: "Which mosquito carries dengue?", answer: "Aedes" },
        { prompt: "Which mosquito carries filariasis (elephantiasis)?", answer: "Culex" },
      ],
      pyqExampleId: "9cb7e1e9-1101-4df4-926d-d507dbcb4f32",
      traps: [
        {
          title: "It's the FEMALE Anopheles, not the male",
          body:
            "Only the **female** mosquito bites — she needs a blood meal to develop her eggs. The male feeds on plant nectar and never transmits disease. Distractors offer 'male Anopheles' and 'female Culex'; the answer is **female Anopheles**.",
        },
        {
          title: "Vector ≠ pathogen",
          body:
            "The mosquito is the **vector** (carrier); **Plasmodium** is the **pathogen** (cause). A question asking 'what causes malaria?' wants Plasmodium; one asking 'what is the vector?' wants the female Anopheles. Read which one is asked.",
        },
      ],
    },
  ],
};
