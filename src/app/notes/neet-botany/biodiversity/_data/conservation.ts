import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BD_CONSERVATION_NOTE: SubtopicNote = {
  subtopicName: "Biodiversity Conservation",
  title: "Biodiversity Conservation",
  oneLineDefinition:
    "Why we should conserve biodiversity, the world summits on it, biodiversity hotspots, and the in situ and ex situ ways of protecting species, with India's protected areas and sacred groves.",
  whyItMatters:
    "Eleven NEET questions: eight EASY and three MODERATE. Seven were on in situ against ex situ conservation, asked in NEET 2022 (twice), NEET 2024, Re-NEET 2024 (twice), NEET 2025 and NEET 2026. The rest asked hotspots, bioprospecting and the year of the Earth Summit.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobd-why",
      name: "Why conserve, and the world summits",
      intuition:
        "We save biodiversity for three kinds of reasons: what it gives us directly, what it does for the whole planet, and simply because every species has a right to exist. The nations of the world have met twice to promise to protect it.",
      definition:
        "The reasons in NCERT:\n" +
        "- **Narrowly utilitarian**: direct economic benefits such as food (cereals, pulses, fruits), firewood, fibre, construction material, industrial products (tannins, lubricating oils, dyes, resins, perfumes) and medicines. More than **25 percent** of the drugs sold worldwide come from plants, and **25,000** plant species are used in the medicines of native peoples.\n" +
        "- **Bioprospecting**: exploring **molecular, genetic and species-level diversity** for products of economic importance. Nations rich in biodiversity can expect to gain greatly from it.\n" +
        "- **Broadly utilitarian**: services nature gives for free. The Amazon forest is estimated to produce, through photosynthesis, **20 percent** of the oxygen in Earth's atmosphere. Bees, bumblebees, birds and bats pollinate plants. Nature also gives aesthetic pleasure.\n" +
        "- **Ethical**: every species has an **intrinsic value**, even if it has no economic value to us, and we have a moral duty to pass our biological legacy on to future generations.\n" +
        "Biodiversity knows no political boundaries, so its conservation is a shared duty of all nations.",
      table: {
        columns: ["Meeting", "Place and year", "What came of it"],
        rows: [
          {
            cells: ["Convention on Biological Diversity, the Earth Summit", "Rio de Janeiro, 1992", "Called on all nations to conserve biodiversity and use its benefits sustainably"],
            noteAmber: "NEET 2023: the Earth Summit at Rio de Janeiro was held in 1992.",
            pyqExampleId: "53eff78c-84b7-47f1-84f8-dc70d6333d2b",
          },
          { cells: ["World Summit on Sustainable Development", "Johannesburg, South Africa, 2002", "190 countries pledged to cut the rate of biodiversity loss significantly by 2010"] },
        ],
      },
      pyqExampleId: "021b8bfd-9fda-4aa0-afd1-51d6b53e699d",
      selfCheckExample: {
        prompt: "The Amazon forest makes about 20 percent of the oxygen in Earth's atmosphere, and nobody pays for it. Which kind of reason for conserving biodiversity is this, and how does it differ from the narrowly utilitarian reason?",
        steps: [
          "Oxygen is a free service of nature to everyone, not a product we harvest and sell.",
          "Services like this, and pollination, are the broadly utilitarian reason.",
          "The narrowly utilitarian reason is about direct products: food, fibre, firewood, industrial products and medicines.",
        ],
        answer: "The broadly utilitarian reason: ecosystem services, as against the direct products of the narrowly utilitarian reason.",
      },
      practiceSet: [
        { prompt: "What share of the drugs sold worldwide is derived from plants?", answer: "More than 25 percent" },
        { prompt: "How many plant species are used in the medicines of native peoples around the world?", answer: "25,000" },
        { prompt: "Which reason for conservation says that every species has an intrinsic value?", answer: "The ethical reason" },
        { prompt: "Where and when was the World Summit on Sustainable Development held?", answer: "Johannesburg, South Africa, in 2002" },
        { prompt: "By which year did 190 countries pledge to reduce the rate of biodiversity loss significantly?", answer: "2010" },
      ],
      traps: [
        {
          title: "Rio was 1992, Johannesburg was 2002",
          body: "The **Earth Summit** (Convention on Biological Diversity) met in **Rio de Janeiro in 1992**. The **World Summit on Sustainable Development** met in **Johannesburg in 2002**.",
        },
        {
          title: "Bioprospecting is not bioremediation",
          body: "**Bioprospecting** explores biodiversity for products of economic importance. Bioremediation, biofortification and biomagnification are different terms from other chapters.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-hotspots",
      name: "Biodiversity hotspots",
      intuition:
        "Conservation money is limited, so ecologists pick the few regions that are both crowded with species and home to species found nowhere else. Protecting these small hotspots saves a huge share of the world's life.",
      definition:
        "Hotspots in NCERT:\n" +
        "- A **biodiversity hotspot** is a region with **very high species richness** and a **high degree of endemism**: many of its species are found only there and nowhere else.\n" +
        "- There were **25** hotspots at first; **nine** more were added, making **34**.\n" +
        "- Three cover India's richest regions: **Western Ghats and Sri Lanka**, **Indo-Burma** and **Himalaya**.\n" +
        "- Together the hotspots cover **less than 2 percent** of Earth's land area, yet hold a very large number of species. **Strict protection** of them could reduce the ongoing mass extinctions by almost **30 percent**.",
      table: {
        columns: ["Hotspot fact", "NCERT value"],
        rows: [
          { cells: ["What makes a hotspot", "Very high species richness and high endemism"] },
          { cells: ["Number of hotspots", "34 (25 at first, then 9 more)"] },
          {
            cells: ["Hotspots covering India", "Western Ghats and Sri Lanka, Indo-Burma, Himalaya"],
            noteAmber: "Re-NEET 2024: matched biodiversity hotspot to the Western Ghats.",
            pyqExampleId: "c8bfc7b3-2ba1-4a7b-81cc-fe5fce9fb694",
          },
          { cells: ["Share of Earth's land area", "Less than 2 percent"] },
          { cells: ["Gain from strict protection", "Ongoing mass extinctions cut by almost 30 percent"] },
        ],
      },
      pyqExampleId: "c8bfc7b3-2ba1-4a7b-81cc-fe5fce9fb694",
      selfCheckExample: {
        prompt: "A region has a great many species, but nearly all of them are also common in neighbouring regions. Does it qualify as a biodiversity hotspot? Explain.",
        steps: [
          "A hotspot needs two things together: very high species richness and a high degree of endemism.",
          "This region has the richness, but its species are found elsewhere too, so endemism is low.",
        ],
        answer: "No: without a high degree of endemism, species richness alone does not make a hotspot.",
      },
      practiceSet: [
        { prompt: "How many biodiversity hotspots are there in the world in all?", answer: "34" },
        { prompt: "Name the three hotspots that cover India's regions of high biodiversity.", answer: "Western Ghats and Sri Lanka, Indo-Burma, and Himalaya" },
        { prompt: "What share of Earth's land area do all the hotspots together cover?", answer: "Less than 2 percent" },
        { prompt: "By how much could strict protection of the hotspots reduce the ongoing mass extinctions?", answer: "By almost 30 percent" },
        { prompt: "What does endemism mean?", answer: "Species being confined to one region and found nowhere else" },
      ],
      traps: [
        {
          title: "Richness alone is not enough",
          body: "A hotspot has **very high species richness** and **high endemism** together. A species-rich region whose species also live elsewhere is not a hotspot.",
        },
        {
          title: "The Western Ghats hotspot includes Sri Lanka",
          body: "NCERT's three hotspots for India are **Western Ghats and Sri Lanka**, **Indo-Burma** and **Himalaya**. The Eastern Ghats are not one of them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-insitu",
      name: "In situ conservation",
      intuition:
        "To save the tiger, save the whole forest it lives in. Protecting a species in its own home protects every plant, animal and gene around it as well.",
      definition:
        "In situ (on site) conservation in NCERT:\n" +
        "- When we conserve and protect the **whole ecosystem**, its biodiversity at **all levels** is protected. We save the entire forest to save the tiger.\n" +
        "- In India, ecologically unique and biodiversity-rich regions are legally protected as **biosphere reserves**, **national parks** and **sanctuaries**. India has **14 biosphere reserves**, **90 national parks** and **448 wildlife sanctuaries**.\n" +
        "- **Sacred groves**: in many cultures, tracts of forest were set aside and all the trees and wildlife in them were worshipped and given total protection. In **Meghalaya** the sacred groves are the last refuges for a large number of rare and threatened plants.",
      table: {
        columns: ["In situ area", "NCERT detail"],
        rows: [
          { cells: ["Biosphere reserves", "14 in India"] },
          { cells: ["National parks", "90 in India"] },
          { cells: ["Wildlife sanctuaries", "448 in India"] },
          {
            cells: ["Sacred groves", "Khasi and Jaintia Hills (Meghalaya); Aravalli Hills (Rajasthan); Western Ghats of Karnataka and Maharashtra; Sarguja, Chanda and Bastar areas (Madhya Pradesh)"],
            noteAmber: "NEET 2026: sacred groves were the in situ method among safari parks, botanical gardens and seed banks.",
            pyqExampleId: "196d1049-7ef7-45a0-8671-8c690b144527",
          },
        ],
      },
      pyqExampleId: "196d1049-7ef7-45a0-8671-8c690b144527",
      selfCheckExample: {
        prompt: "A state wants to protect one rare forest orchid. One plan grows the orchid in a city garden; the other protects the forest where it grows. Which plan is in situ, and what extra benefit does it bring?",
        steps: [
          "In situ means protecting a species in its own natural habitat, so protecting the forest is in situ.",
          "Protecting the whole ecosystem protects its biodiversity at all levels: the orchid, its pollinators and every other species there.",
        ],
        answer: "Protecting the forest is in situ; it saves the whole ecosystem along with the orchid.",
      },
      practiceSet: [
        { prompt: "How many national parks does India have, according to NCERT?", answer: "90" },
        { prompt: "How many biosphere reserves does India have, according to NCERT?", answer: "14" },
        { prompt: "How many wildlife sanctuaries does India have, according to NCERT?", answer: "448" },
        { prompt: "In which state are the sacred groves the last refuges for many rare and threatened plants?", answer: "Meghalaya" },
        { prompt: "In which state are the sacred groves of the Aravalli Hills?", answer: "Rajasthan" },
      ],
      traps: [
        {
          title: "Sacred groves are in situ",
          body: "**Sacred groves** protect forest where it stands, so they are **in situ**, like national parks, sanctuaries and biosphere reserves.",
        },
        {
          title: "Khasi and Jaintia Hills are in Meghalaya",
          body: "The **Khasi and Jaintia Hills** sacred groves are in **Meghalaya**; the **Aravalli** groves are in **Rajasthan**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-exsitu",
      name: "Ex situ conservation",
      intuition:
        "When a species is too close to the edge to survive in the wild, we take it out of its habitat and look after it ourselves: in a zoo, a garden, or as frozen cells and stored seeds.",
      definition:
        "Ex situ (off site) conservation in NCERT:\n" +
        "- **Threatened** animals and plants are taken out of their natural habitat and placed in a **special setting** where they are protected and given special care.\n" +
        "- **Zoological parks**, **botanical gardens** and **wildlife safari parks** serve this purpose. Many animals that are extinct in the wild are still kept in zoos.\n" +
        "- **Cryopreservation**: gametes of threatened species are preserved in a **viable and fertile** condition for long periods.\n" +
        "- Eggs can be fertilised **in vitro**, and plants can be propagated by **tissue culture**.\n" +
        "- Seeds of different genetic strains of commercially important plants are kept for long periods in **seed banks**.",
      table: {
        columns: ["Ex situ method", "What it does"],
        rows: [
          {
            cells: ["Zoological parks and botanical gardens", "Keep threatened animals and plants alive outside the wild"],
            noteAmber: "NEET 2025: zoos and botanical gardens were the ex situ example among national parks, sanctuaries and protected areas.",
            pyqExampleId: "80310722-4acb-45b2-81c5-c2f9af1868f6",
          },
          { cells: ["Wildlife safari parks", "Keep animals in a protected setting outside their habitat"] },
          {
            cells: ["Cryopreservation", "Stores gametes of threatened species, viable and fertile, for long periods"],
            pyqExampleId: "2fadf611-c06f-4d74-ac51-3f632b8522d3",
          },
          { cells: ["In vitro fertilisation", "Fertilises eggs outside the body"] },
          { cells: ["Tissue culture (micropropagation)", "Propagates many plants from small pieces of tissue"] },
          { cells: ["Seed banks", "Keep seeds of genetic strains of commercially important plants for long periods"] },
        ],
      },
      pyqExampleId: "2fadf611-c06f-4d74-ac51-3f632b8522d3",
      selfCheckExample: {
        prompt: "Sort these into in situ and ex situ: a seed bank, a biosphere reserve, a wildlife safari park, a sacred grove.",
        steps: [
          "In situ keeps a species in its own habitat: the biosphere reserve and the sacred grove.",
          "Ex situ takes it out into a special setting: the seed bank and the wildlife safari park.",
        ],
        answer: "In situ: biosphere reserve and sacred grove. Ex situ: seed bank and wildlife safari park.",
      },
      practiceSet: [
        { prompt: "Where are seeds of different genetic strains of commercially important plants kept for long periods?", answer: "In seed banks" },
        { prompt: "By which technique can a threatened plant be propagated from small pieces of tissue in a laboratory?", answer: "Tissue culture (micropropagation)" },
        { prompt: "Where are many animals that are extinct in the wild still maintained?", answer: "In zoological parks" },
        { prompt: "Is a wildlife safari park an in situ or an ex situ method?", answer: "Ex situ" },
        { prompt: "Name three places that serve ex situ conservation.", answer: "Zoological parks, botanical gardens and wildlife safari parks" },
      ],
      traps: [
        {
          title: "A national park is in situ",
          body: "A **national park** protects species in their own habitat, so it is **in situ**. It is the odd one out among micropropagation, cryopreservation and in vitro fertilisation, which are all **ex situ**.",
        },
        {
          title: "A safari park is ex situ despite the word wildlife",
          body: "**Wildlife safari parks** are **ex situ**, like zoos and botanical gardens. **Wildlife sanctuaries** are **in situ**. Read the second word.",
        },
        {
          title: "A botanical garden is ex situ",
          body: "A **botanical garden** grows plants away from their natural habitat, so it is **ex situ**, unlike a biosphere reserve or national park.",
        },
      ],
    },
  ],
};
