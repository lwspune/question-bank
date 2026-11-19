import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AG_FISH_NOTE: SubtopicNote = {
  subtopicName: "Fisheries, Silk and Lac",
  title: "Fisheries, Silk and Lac",
  oneLineDefinition:
    "Pisciculture is fish farming, often done in flooded rice fields; shellfish such as prawns and crabs are not true fish; sericulture rears the silkworm Bombyx mori on mulberry, and the lac insect lives on palas trees.",
  whyItMatters:
    "Four questions in the bank, two EASY and two HARD: the crop grown together with fish, picking the shellfish from a list of local names, the species Bombyx mori, and the tree most important for lac. Each is a single fact about who is reared where, and on what.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9agfi-fish",
      name: "Fish farming and shellfish",
      intuition:
        "Rice grows in fields that stay under water for months, which is just what fish need. So a farmer can raise fish in the same paddy field and get two harvests from one piece of land. Many water animals sold with fish are not fish at all: prawns, crabs and oysters have a shell instead of fins and a backbone.",
      definition:
        "- **Pisciculture**: rearing fish. **Fisheries** also include catching fish from rivers and the sea.\n" +
        "- **Rice-fish culture**: fish are reared in flooded **rice** (paddy) fields.\n" +
        "- **Freshwater fish** reared in ponds: **rohu, catla and mrigal** (the Indian major carps).\n" +
        "- **Marine fish**: pomfret, mackerel (bangda), sardine, Bombay duck (bombil).\n" +
        "- **Shellfish**: water animals with a shell, such as **prawns, lobsters, crabs, oysters and clams**. They are not true fish.\n" +
        "- Pearls are formed inside **pearl oysters**.",
      table: {
        columns: ["Group", "Examples", "Lives in"],
        rows: [
          { cells: ["Freshwater fin fish", "Rohu, catla, mrigal", "Ponds, rivers, rice fields"] },
          { cells: ["Marine fin fish", "Pomfret, mackerel, sardine, Bombay duck", "The sea"] },
          { cells: ["Shellfish", "Prawns, lobsters, crabs, oysters, clams", "The sea and fresh water"], noteAmber: "Not true fish: they have shells, not fins." },
        ],
        caption: "Mrigal is a fin fish, a carp of ponds and rivers.",
      },
      selfCheckExample: {
        prompt: "A pond farmer rears rohu, catla and mrigal together. What is the group name for these three fish?",
        steps: ["All three are freshwater carps native to India.", "They are the most farmed pond fish of the country."],
        answer: "The Indian major carps",
      },
      practiceSet: [
        { prompt: "What is pisciculture?", answer: "Rearing (farming) fish" },
        { prompt: "Is the pomfret a freshwater fish or a marine fish?", answer: "A marine fish" },
        { prompt: "Find the odd one out: rohu, crab, catla, pomfret.", answer: "Crab: it is a shellfish, the others are fin fish" },
        { prompt: "Inside which animal is a pearl formed?", answer: "The pearl oyster" },
      ],
      pyqExampleId: "17a8bfd9-e786-4e09-ab74-b7f5c347ecf5",
      traps: [
        {
          title: "Calling a prawn a fish",
          body: "Prawns, crabs, lobsters and oysters are shellfish. True fish have fins and a backbone.",
        },
        {
          title: "Pairing fish with a dry-land crop",
          body: "Wheat, jowar and moong grow in fields that are not flooded. Fish need standing water, so they are reared with rice.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9agfi-silk",
      name: "Sericulture and lac culture",
      intuition:
        "Two useful products come from insects reared on trees. The silkworm caterpillar eats mulberry leaves and spins a cocoon of silk thread around itself. The tiny lac insect sucks sap from the twigs of trees like palas and covers itself with a resin, which is scraped off as lac.",
      definition:
        "- **Sericulture**: rearing silkworms for silk. The mulberry silkworm is **Bombyx mori**, and it feeds on **mulberry** (tuti) leaves.\n" +
        "- Life cycle of the silk moth: **egg → larva (silkworm) → pupa inside a cocoon → adult moth**. Silk thread is drawn from the cocoons.\n" +
        "- Other silks: **tasar** (its silkworm lives on trees such as ain and arjun), **eri** (on castor) and **muga** (from Assam).\n" +
        "- **Lac culture**: the **lac insect** lives on host trees such as **palas**, **kusum** and **ber**, and gives out a resin called lac. Palas is the most important host.\n" +
        "- Lac is used for **bangles, sealing wax, varnish and toys**.\n" +
        "- **Khair** is grown for katha (eaten with paan), and **mulberry** for the silkworm.",
      table: {
        columns: ["Insect", "Host plant", "Product"],
        rows: [
          { cells: ["Mulberry silkworm (Bombyx mori)", "Mulberry", "Mulberry silk"] },
          { cells: ["Tasar silkworm", "Ain, arjun", "Tasar silk"] },
          { cells: ["Eri silkworm", "Castor", "Eri silk"] },
          { cells: ["Lac insect", "Palas, kusum, ber", "Lac"], noteAmber: "Mulberry feeds the silkworm, not the lac insect." },
        ],
        caption: "Bombyx mori is the silkworm, not a fish, a hen or a cow.",
      },
      selfCheckExample: {
        prompt: "Name the stages in the life cycle of a silk moth, in order.",
        steps: ["The moth lays eggs; a caterpillar (the silkworm) hatches.", "The caterpillar spins a cocoon and becomes a pupa inside it, and an adult moth comes out."],
        answer: "Egg, larva (silkworm), pupa (in the cocoon), adult moth",
      },
      practiceSet: [
        { prompt: "What does the caterpillar of the mulberry silk moth feed on?", answer: "Mulberry leaves" },
        { prompt: "What is the rearing of silkworms called?", answer: "Sericulture" },
        { prompt: "Name two things made from lac.", answer: "Bangles and sealing wax (or varnish, toys)" },
        { prompt: "On which plant does the eri silkworm feed?", answer: "Castor" },
      ],
      pyqExampleId: "06f8d988-e91f-405b-8b42-25fa7dd9d9eb",
      traps: [
        {
          title: "Rearing lac on mulberry",
          body: "Mulberry is the food of the silkworm. The lac insect lives on palas, kusum and ber.",
        },
        {
          title: "Thinking silk comes from the adult moth",
          body: "Silk is the thread of the cocoon spun by the caterpillar (larva) before it becomes a pupa.",
        },
      ],
    },
  ],
};
