import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_EC_ENVIRONMENT_NOTE: SubtopicNote = {
  subtopicName: "Pollution and Conservation",
  title: "Pollution and Conservation",
  oneLineDefinition:
    "The air pollutants and what they do, global warming and acid rain, problems of water and waste with their remedies, and how wildlife is protected in India and listed by the IUCN.",
  whyItMatters:
    "Fourteen CDS questions from 2016 (II) to 2026 (II), four of them in the 2016 (II) paper. Four are about air pollution, five about water, waste and remedies, and five about conservation. The two HARD ones ask what xeriscaping is and where India's cichlid fish live.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbiec-air",
      name: "Air pollution, acid rain and global warming",
      intuition:
        "Burning fuel puts gases into the air. Carbon monoxide gets into the blood and blocks oxygen. Sulphur and nitrogen oxides dissolve in rain and make it acidic. Carbon dioxide and methane act like the glass of a greenhouse: they let sunlight in but trap the heat that the Earth gives back, so the planet warms.",
      definition:
        "Air pollutants (NCERT Class 9 and 12):\n" +
        "- **Carbon monoxide** (incomplete burning, vehicle exhaust) binds **haemoglobin** about **200 times** more strongly than oxygen, forming carboxyhaemoglobin, so the blood carries less oxygen; it can suffocate and kill.\n" +
        "- **Sulphur dioxide and nitrogen oxides** (burning coal and oil) **dissolve in rain** to form sulphuric and nitric acids: **acid rain** (pH below about 5.6). It corrodes marble, as at the Taj Mahal, and harms lakes and forests.\n" +
        "- **Greenhouse gases**: carbon dioxide, **methane**, nitrous oxide and CFCs. More of them in the air traps more heat, causing **global warming**, the rise in the Earth's average surface temperature.\n" +
        "- **Methane** comes mostly from **landfills** (rotting waste with no air), paddy fields and cattle.\n" +
        "- **CFCs** (old refrigerants and sprays) destroy the **ozone layer**; **fly ash** comes from coal-burning power stations.",
      table: {
        columns: ["Pollutant", "Main source", "Effect"],
        rows: [
          { cells: ["Carbon monoxide", "Vehicle exhaust, incomplete burning", "Blocks haemoglobin; suffocation"] },
          {
            cells: ["Sulphur and nitrogen oxides", "Burning coal and oil", "Acid rain"],
            noteAmber: "CDS 2022 (I): the main reason for acid rain is sulphur and nitrogen oxides dissolving in rain.",
            pyqExampleId: "8e995917-ca89-42c1-8a9f-80924ed05573",
          },
          {
            cells: ["Methane", "Landfills, paddy fields, cattle", "Greenhouse gas"],
            noteAmber: "CDS 2016 (II): the gas released mostly from urban landfills is methane.",
            pyqExampleId: "8249c9c7-ae28-461c-8472-343864ac6e1c",
          },
          {
            cells: ["Carbon dioxide", "Burning fuels, cutting forests", "Global warming"],
            noteAmber: "CDS 2017 (II): more greenhouse gas raises the surface temperature, so Statement II explains Statement I.",
            pyqExampleId: "834b66af-9160-4fb7-ab10-9c1b9b602eea",
          },
          { cells: ["CFCs", "Old refrigerants and aerosol sprays", "Ozone layer depletion"] },
          { cells: ["Fly ash", "Coal-burning power stations", "Dust that harms lungs and soil"] },
        ],
      },
      pyqExampleId: "651b0287-04fe-4d22-a773-50fa290f89af",
      selfCheckExample: {
        prompt: "The white marble of the Taj Mahal has become yellow and pitted near industries that burn coal. Explain the chemistry in words.",
        steps: [
          "Burning coal and oil releases sulphur dioxide and nitrogen oxides.",
          "They dissolve in rain water to form sulphuric and nitric acids: acid rain.",
          "Marble is calcium carbonate, which reacts with acid and is slowly eaten away.",
        ],
        answer: "Acid rain from sulphur and nitrogen oxides reacts with the calcium carbonate of the marble.",
      },
      practiceSet: [
        { prompt: "Which gases from old refrigerators and sprays destroy the ozone layer?", answer: "CFCs (chlorofluorocarbons)" },
        { prompt: "Below about what pH is rain called acid rain?", answer: "About 5.6" },
        { prompt: "Name two greenhouse gases.", answer: "Carbon dioxide and methane (also nitrous oxide, CFCs)" },
        { prompt: "Where does fly ash come from?", answer: "Coal-burning power stations" },
      ],
      traps: [
        {
          title: "Carbon monoxide, not sulphur dioxide, blocks haemoglobin",
          body: "**Carbon monoxide** binds haemoglobin and stops it carrying oxygen. **Sulphur dioxide** irritates the lungs and causes acid rain; CFCs harm the ozone layer; fly ash is dust.",
        },
        {
          title: "Acid rain needs oxides, not dust",
          body: "Acid rain forms when **oxides of sulphur and nitrogen** dissolve in rain. Dust, minerals and soil in rain do not make it acidic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbiec-waste",
      name: "Water, waste and green remedies",
      intuition:
        "Some waste rots away, broken down by bacteria and fungi: it is biodegradable. Plastics do not, so they stay for hundreds of years, break into tiny bits and get into water and food. Too much fertiliser in water is a problem of a different kind: it feeds algae, or turns into a poison for babies. The remedies are simple habits: sort waste, save water, and fight pests with their natural enemies instead of chemicals.",
      definition:
        "Problems and remedies:\n" +
        "- **Biodegradable** waste (food, paper, leaves) is broken down by microbes; **non-biodegradable** waste (**plastics**, glass, metals, DDT) is not, and stays in soil and water.\n" +
        "- **Nitrate** in drinking water (from fertilisers) causes **blue baby syndrome** (methaemoglobinaemia): in a baby's gut nitrate turns to nitrite, which stops haemoglobin carrying oxygen.\n" +
        "- **Eutrophication**: fertiliser and sewage nutrients make algae grow wildly (an **algal bloom**); when they die and rot, the water loses its oxygen and fish die.\n" +
        "- **Remedies** (mitigation): **segregating waste** into categories at source (green bin for wet, blue for dry), recycling, **xeriscaping** (landscaping with drought-tolerant plants to **save water**).\n" +
        "- **Biocontrol agents** replace chemical pesticides: **Bacillus thuringiensis** (a bacterium against caterpillars), the **ladybird beetle** (eats aphids), **Trichoderma** (a fungus against plant-disease fungi), dragonflies (eat mosquitoes). **Aphids** are pests, not agents.",
      table: {
        columns: ["Problem or remedy", "Fact"],
        rows: [
          {
            cells: ["Blue baby syndrome", "Caused by nitrate in drinking water"],
            noteAmber: "CDS 2017 (II): blue baby syndrome is caused by nitrate contamination.",
            pyqExampleId: "56d5500d-0aec-46bf-aec9-568693468a1c",
          },
          { cells: ["Eutrophication", "Excess nutrients, algal bloom, loss of oxygen"] },
          {
            cells: ["Segregating waste", "A mitigation measure"],
            noteAmber: "CDS 2026 (II): categorical disposal of different wastes mitigates environmental problems; biomagnification and eutrophication are the problems.",
            pyqExampleId: "4f6ccacf-4aea-4b30-80fe-10261d13eca0",
          },
          {
            cells: ["Xeriscaping", "Landscaping that saves water"],
            noteAmber: "CDS 2017 (II), HARD: xeriscaping is landscaping to save water (xeros means dry).",
            pyqExampleId: "1430d792-2c71-43b9-9cc7-e877ea61e0ea",
          },
          {
            cells: ["Biocontrol agents", "Bt bacterium, ladybird beetle, Trichoderma"],
            noteAmber: "CDS 2026 (II): the aphid is NOT a biocontrol agent; it is the pest.",
            pyqExampleId: "f5150bd5-b6f4-4faf-b58e-442c6278359a",
          },
        ],
      },
      pyqExampleId: "263f71c3-7ab6-4ed4-9a83-08d263cdc374",
      selfCheckExample: {
        prompt: "Fertiliser washes from farms into a lake. Some weeks later the water turns green and the fish die. Explain the chain of events.",
        steps: [
          "The fertiliser adds nitrates and phosphates, nutrients for algae.",
          "The algae grow wildly and cover the lake (an algal bloom).",
          "When they die, bacteria decomposing them use up the oxygen in the water, and the fish suffocate.",
        ],
        answer: "Eutrophication: extra nutrients cause an algal bloom whose decay uses up the oxygen.",
      },
      practiceSet: [
        { prompt: "Is a banana peel biodegradable or non-biodegradable?", answer: "Biodegradable" },
        { prompt: "What is the sudden overgrowth of algae in nutrient-rich water called?", answer: "An algal bloom" },
        { prompt: "In India's two-bin system, which colour bin takes wet, biodegradable waste?", answer: "Green" },
        { prompt: "Which beetle is a natural enemy of aphids?", answer: "The ladybird beetle" },
      ],
      traps: [
        {
          title: "Nitrate, not nitrite, is the contaminant",
          body: "Blue baby syndrome comes from **nitrate** in drinking water. It is turned into nitrite inside the baby's gut, which is why nitrite appears as a tempting wrong option.",
        },
        {
          title: "A problem is not a remedy",
          body: "**Biomagnification**, **eutrophication** and nuclear waste are environmental **problems**. **Segregating waste** is a **remedy**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbiec-conservation",
      name: "Conservation and protected areas",
      intuition:
        "To protect wildlife, we first need to know which species are in danger, and the IUCN keeps that list for the whole world. Then the best place to protect a species is its own home, in a national park or sanctuary. Some animals are good alarm bells: frogs and other amphibians, with their thin wet skin, are the first to suffer when the environment changes.",
      definition:
        "Conservation (NCERT Class 12, and Class 11 Indian Economic Development):\n" +
        "- The **IUCN** (International Union for Conservation of Nature) publishes the **Red List** of threatened species, from Least Concern through Vulnerable, Endangered and Critically Endangered to Extinct.\n" +
        "- **In situ** conservation protects species in their natural home: **national parks, wildlife sanctuaries, biosphere reserves**. **Ex situ** keeps them elsewhere: zoos, botanical gardens, seed banks.\n" +
        "- **Amphibians** are the most **sensitive to environmental change**: thin, wet skin that absorbs pollutants, and eggs laid in water. They are used as **bio-indicators**.\n" +
        "- The environment performs **four functions**: it **supplies resources**, **assimilates waste**, **sustains life** and **provides aesthetic services**.",
      table: {
        columns: ["Place or body", "Known for"],
        rows: [
          {
            cells: ["IUCN", "Red List of threatened species"],
            noteAmber: "CDS 2024 (I): the worldwide list of endangered species is published by the IUCN.",
            pyqExampleId: "8465883a-5fc0-493c-9923-15e5be9fb64a",
          },
          {
            cells: ["Little Rann of Kutch, Gujarat", "Indian Wild Ass Sanctuary"],
            noteAmber: "CDS 2016 (II): Rann of Kutch is a Wild Ass Sanctuary; Guindy is not a tiger reserve and Jaldapara is not a biosphere reserve.",
            pyqExampleId: "fa9f56af-d062-4916-9e92-c292afda4889",
          },
          { cells: ["Gir, Gujarat", "Asiatic lion"] },
          { cells: ["Kaziranga, Assam", "One-horned rhinoceros"] },
          { cells: ["Jaldapara, West Bengal", "National park; one-horned rhinoceros"] },
          { cells: ["Namdapha, Arunachal Pradesh", "Tiger reserve in rain forest"] },
          { cells: ["Guindy, Chennai", "Blackbuck in a small city park"] },
          {
            cells: ["Kerala backwaters", "Most cichlid fish in India (pearlspot, karimeen)"],
            noteAmber: "CDS 2019 (II), HARD: the largest quantity of cichlids in India is in the backwaters of Kerala.",
            pyqExampleId: "bfc2addf-ddae-4d22-a9b0-2e5b78e0b717",
          },
        ],
      },
      pyqExampleId: "8465883a-5fc0-493c-9923-15e5be9fb64a",
      selfCheckExample: {
        prompt: "Sort these into in situ and ex situ conservation: a national park, a seed bank, a zoo, a biosphere reserve.",
        steps: [
          "In situ means protecting living things in their natural home.",
          "National parks and biosphere reserves protect whole natural habitats.",
          "Seed banks and zoos keep species away from their natural homes.",
        ],
        answer: "In situ: national park, biosphere reserve. Ex situ: seed bank, zoo.",
      },
      practiceSet: [
        { prompt: "Where is the only wild home of the Asiatic lion?", answer: "Gir, in Gujarat" },
        { prompt: "Which national park in Assam is famous for the one-horned rhinoceros?", answer: "Kaziranga" },
        { prompt: "Is a zoo an example of in situ or ex situ conservation?", answer: "Ex situ" },
        { prompt: "In which state is Namdapha National Park?", answer: "Arunachal Pradesh" },
      ],
      traps: [
        {
          title: "Amphibians are the most sensitive",
          body: "Of amphibians, reptiles, mammals and insects, the **amphibians** react first to changes in water, air and temperature, because of their **thin, wet skin** and water-laid eggs. Reptiles have dry, scaly skin and shelled eggs.",
        },
        {
          title: "IUCN lists, WWF campaigns",
          body: "The **Red List** is published by the **IUCN**. WWF is a conservation charity, UNEP a UN environment body and UNDP a UN development body; none of them publishes the list.",
        },
        {
          title: "Four functions of the environment",
          body: "The environment **supplies resources, assimilates waste, sustains life and provides aesthetic services**. Any option leaving one of the listed functions out is incomplete.",
        },
      ],
    },
  ],
};
