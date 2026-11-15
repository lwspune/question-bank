import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_OP_INTERACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Population Interactions",
  title: "Population Interactions",
  oneLineDefinition:
    "How two species affect each other: the plus, minus and zero sign of each interaction, predation and prey defences, competition with Gause's principle and its evidence, and the NCERT examples of parasitism, commensalism and mutualism.",
  whyItMatters:
    "Sixteen NEET questions: one EASY and fifteen MODERATE, and every one of the 8 papers asked at least one. The signs of the interactions were asked five times, competition five times (Gause's principle in NEET 2023 and NEET 2024), and Ophrys with its sexual deceit and the fig with its wasp twice each.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboop-signs",
      name: "The six interactions and their signs",
      intuition:
        "When two species meet, each one either gains, loses or is not affected. Write a plus for a gain, a minus for a loss and a zero for no effect. Every NEET question on interactions comes down to getting this pair of signs right.",
      definition:
        "Interactions between two species in NCERT:\n" +
        "- Interactions arise when populations of **two different species** interact. They may be beneficial **(+)**, detrimental **(\\(-\\))** or neutral **(0)** to one or both species.\n" +
        "- When **both** species benefit, the interaction is **mutualism**; when **both** lose, it is **competition**.\n" +
        "- In **predation** and **parasitism** one species benefits and the other is harmed. In **commensalism** one benefits and the other is **neither harmed nor benefited**.\n" +
        "- In **amensalism** one species is **harmed** whereas the other is **unaffected**.\n" +
        "- Predation, parasitism and commensalism share one feature: the interacting species **live closely together**.",
      table: {
        columns: ["Interaction", "Species A", "Species B"],
        rows: [
          { cells: ["Mutualism", "Benefits \\((+)\\)", "Benefits \\((+)\\)"] },
          { cells: ["Competition", "Harmed \\((-)\\)", "Harmed \\((-)\\)"] },
          {
            cells: ["Predation", "Benefits \\((+)\\)", "Harmed \\((-)\\)"],
            noteAmber: "NEET 2022: predation was the interaction with (+) for one species and (\\(-\\)) for the other.",
            pyqExampleId: "86d03cce-b812-4bfb-bdd4-c09be5321d72",
          },
          { cells: ["Parasitism", "Benefits \\((+)\\)", "Harmed \\((-)\\)"] },
          { cells: ["Commensalism", "Benefits \\((+)\\)", "Unaffected (0)"] },
          {
            cells: ["Amensalism", "Harmed \\((-)\\)", "Unaffected (0)"],
            noteAmber: "NEET 2021: amensalism is (\\(-\\)) for one species and (0) for the other.",
            pyqExampleId: "bd8ba81a-5777-48eb-8a35-9bc0ad617d19",
          },
        ],
      },
      pyqExampleId: "0405f250-ef37-4a07-a752-56b4c78a6ae6",
      selfCheckExample: {
        prompt: "In one pair of species, both lose fitness when they live together. In another pair, one species kills and eats the other. Name each interaction and write its pair of signs.",
        steps: [
          "Both species harmed is competition: \\((-, -)\\).",
          "One gains by eating the other, which is harmed: predation, \\((+, -)\\).",
        ],
        answer: "Competition \\((-, -)\\) and predation \\((+, -)\\).",
      },
      practiceSet: [
        { prompt: "Which sign is given to an interaction that is detrimental to a species?", answer: "Minus \\((-)\\)" },
        { prompt: "Which two interactions are (+) for one species and (\\(-\\)) for the other?", answer: "Predation and parasitism" },
        { prompt: "Which interaction is detrimental to both species?", answer: "Competition" },
        { prompt: "Which three interactions share the feature that the species live closely together?", answer: "Predation, parasitism and commensalism" },
        { prompt: "A species that is neither benefited nor harmed by an interaction gets which sign?", answer: "Zero (0)" },
      ],
      traps: [
        {
          title: "In commensalism the other species is not harmed",
          body: "**Commensalism** is **(+, 0)**: one species benefits and the other is **unaffected**. Only in **parasitism** and **predation** is the second species **harmed**.",
        },
        {
          title: "Amensalism is minus and zero",
          body: "**Amensalism** is **(\\(-\\), 0)**: one species is harmed and the other is unaffected. **(+, 0)** is commensalism and **(\\(-\\), \\(-\\))** is competition.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboop-predation",
      name: "Predation and prey defences",
      intuition:
        "A tiger eating a deer is predation, and so is a sparrow eating a seed or a goat eating grass. The predator gains and the prey loses. But predators also do jobs for the whole community: they keep prey numbers in check and stop any one prey species from crowding out the rest.",
      definition:
        "Predation in NCERT:\n" +
        "- Predation is nature's way of **transferring the energy fixed by plants** to higher trophic levels. A tiger eating a deer and a sparrow eating a seed are both predators; **herbivores** are not very different from predators.\n" +
        "- Predators **keep prey populations under control**. An exotic species brought into a new area can turn **invasive** because its natural predators are missing there.\n" +
        "- **Biological control** methods in agricultural pest control rest on the ability of predators to regulate prey populations.\n" +
        "- Predators help **maintain species diversity** in a community by reducing the intensity of competition among competing prey species.\n" +
        "- If a predator is too efficient and **overexploits** its prey, the prey might become **extinct**, and the predator will follow for lack of food. This is why predators in nature are **prudent**.\n" +
        "- Prey defences: some insects and frogs are **cryptically coloured** (camouflaged); some prey are **poisonous**. The **Monarch butterfly** is highly distasteful to birds because of a chemical it takes up as a caterpillar by feeding on a **poisonous weed**.\n" +
        "- Nearly **25 percent** of all insects are **phytophagous** (they feed on plant sap and other parts of plants). **Thorns** (*Acacia*, cactus) are the most common morphological defence of plants.",
      table: {
        columns: ["NCERT case", "What happened", "What it shows"],
        rows: [
          { cells: ["Prickly pear cactus in Australia", "Brought in during the early 1920s, it spread over millions of hectares of rangeland until a cactus feeding moth from its natural habitat was introduced", "Predators control prey; the basis of biological control"] },
          { cells: ["Starfish *Pisaster*", "In the rocky intertidal communities of the American Pacific coast, removing all the starfish from an enclosed area made more than 10 species of invertebrates extinct within a year, because of interspecific competition", "Predators maintain species diversity"] },
          { cells: ["Monarch butterfly", "Distasteful to birds because of a chemical taken up from a poisonous weed in its caterpillar stage", "A chemical defence of prey"] },
          { cells: ["*Calotropis*", "Produces highly poisonous cardiac glycosides, so cattle and goats never browse on it", "A chemical defence of plants"] },
          { cells: ["Nicotine, caffeine, quinine, strychnine, opium", "Chemicals plants make and store", "Plant defences against grazers and browsers"] },
        ],
      },
      pyqExampleId: "68035ae6-790f-4196-a6cc-824c43517c08",
      selfCheckExample: {
        prompt: "In a field experiment on a rocky shore of the American Pacific coast, all the starfish were removed from an enclosed area. What happened to the invertebrates there within a year, why, and what role of predators does this show?",
        steps: [
          "More than 10 species of invertebrates became extinct within a year.",
          "Without the predator, the prey species competed with each other and the weaker ones were lost: interspecific competition.",
          "So predators help maintain species diversity by reducing competition among prey species.",
        ],
        answer: "More than 10 invertebrate species died out through interspecific competition; predators maintain species diversity.",
      },
      practiceSet: [
        { prompt: "How was the prickly pear cactus finally brought under control in Australia?", answer: "By introducing a cactus feeding moth from its natural habitat" },
        { prompt: "Where does the Monarch butterfly get the chemical that makes it distasteful to birds?", answer: "From a poisonous weed it feeds on as a caterpillar" },
        { prompt: "Which poisonous chemicals does *Calotropis* produce?", answer: "Cardiac glycosides" },
        { prompt: "What is the most common morphological defence of plants against herbivores?", answer: "Thorns, as in *Acacia* and cactus" },
        { prompt: "What fraction of all insects does NCERT say are phytophagous?", answer: "Nearly 25 percent" },
      ],
      traps: [
        {
          title: "Predation harms only the prey",
          body: "Predation is **(+, \\(-\\))**: the predator benefits and the prey is harmed. A statement that **both** species are harmed describes **competition**, not predation.",
        },
        {
          title: "The Monarch butterfly does not make its poison",
          body: "The Monarch **acquires** its distasteful chemical by eating a **poisonous weed as a caterpillar**. It is not made in its own body from scratch.",
        },
        {
          title: "A prudent predator does not wipe out its prey",
          body: "A predator that **overexploits** its prey drives the prey extinct and then dies out itself for lack of food. That is why predators in nature are **prudent**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboop-competition",
      name: "Competition, Gause's principle and resource partitioning",
      intuition:
        "Competition is not only two close relatives fighting over the last bit of food. Unrelated species can compete, and one species can even get in the way of another when food is plenty. What marks competition is that one species does worse, grows more slowly, when the other is around.",
      definition:
        "Competition in NCERT:\n" +
        "- Competition was thought to happen only between **closely related species** for the same **limiting** resource. That is not entirely true: **unrelated species** can compete too.\n" +
        "- Resources **need not be limiting**. In **interference competition** the feeding efficiency of one species is reduced by the interfering and inhibitory presence of the other, even when food and space are **abundant**.\n" +
        "- So competition is best defined as a process in which the **fitness of one species**, measured by its **r** (intrinsic rate of increase), is **significantly lower** in the presence of another species.\n" +
        "- **Gause's Competitive Exclusion Principle**: two **closely related species** competing for the **same resources** cannot co-exist indefinitely, and the **competitively inferior** one will be **eliminated** eventually. This may be true **if resources are limiting**, but not otherwise.\n" +
        "- Recent studies show that species facing competition may evolve mechanisms that promote **co-existence** rather than exclusion. One is **resource partitioning**: choosing different times for feeding or different foraging patterns.\n" +
        "- In general, **herbivores and plants** appear to be **more adversely affected** by competition than **carnivores**.",
      table: {
        columns: ["NCERT case", "What happened", "What it shows"],
        rows: [
          {
            cells: ["Flamingoes and fishes in shallow South American lakes", "Visiting flamingoes and resident fishes compete for their common food, the zooplankton", "Unrelated species can compete (interspecific competition)"],
            noteAmber: "Re-NEET 2024: matched the flamingoes and fishes to interspecific competition, the Abingdon tortoise to interference competition, Chthamalus to competitive release and the warblers to resource partitioning.",
            pyqExampleId: "5a1498d2-d635-4998-a6b0-f9f292933a9f",
          },
          { cells: ["Abingdon tortoise, Galapagos Islands", "Became extinct within a decade after goats were introduced, apparently because the goats browsed more efficiently", "Circumstantial evidence of competition in nature"] },
          { cells: ["*Balanus* and *Chthamalus* (Connell)", "On the rocky sea coasts of Scotland the larger, superior barnacle *Balanus* excludes the smaller *Chthamalus* from the intertidal area; *Chthamalus* spreads widely when *Balanus* is removed", "Competitive release"] },
          { cells: ["Gause's laboratory experiments", "With limited resources the competitively superior species eventually eliminated the other", "Competitive exclusion"] },
          {
            cells: ["Five warbler species (MacArthur)", "Five closely related species living on the same tree avoided competition through behavioural differences in their foraging", "Resource partitioning"],
            noteAmber: "NEET 2021: resource partitioning is the mechanism that lets competing species survive together.",
            pyqExampleId: "56863e5b-3099-4d02-8978-181aca255160",
          },
        ],
      },
      pyqExampleId: "e0ce02b3-f24c-4e6b-abe9-9c8871fb2130",
      selfCheckExample: {
        prompt: "Food is plentiful in a pond, yet one fish species feeds less well and grows more slowly whenever a second species is present, because the second species gets in its way. Is this competition, and which kind?",
        steps: [
          "Competition is defined by the fitness (r) of one species being significantly lower in the presence of another.",
          "Resources need not be limiting for competition to occur.",
          "When the other species reduces feeding efficiency even with food abundant, it is interference competition.",
        ],
        answer: "Yes. It is interference competition.",
      },
      practiceSet: [
        { prompt: "What do visiting flamingoes and resident fishes compete for in South American lakes?", answer: "Their common food, the zooplankton in the lake" },
        { prompt: "Which barnacle is the larger, competitively superior one on the rocky coasts of Scotland?", answer: "*Balanus*" },
        { prompt: "Whose experiments showed five closely related warbler species co-existing on the same tree?", answer: "MacArthur's" },
        { prompt: "Which tortoise became extinct within a decade after goats were introduced to its island?", answer: "The Abingdon tortoise of the Galapagos Islands" },
        { prompt: "By what measure is the fitness of a species judged in the NCERT definition of competition?", answer: "Its r, the intrinsic rate of increase" },
      ],
      traps: [
        {
          title: "Gause's principle is about the same resources",
          body: "Gause's principle concerns two closely related species competing for the **same** resources. A statement with **different** resources is false.",
        },
        {
          title: "Exclusion needs limiting resources",
          body: "Elimination of the inferior competitor may be true **if resources are limiting**, but not otherwise.",
        },
        {
          title: "Herbivores suffer more than carnivores",
          body: "NCERT says **herbivores and plants** are more adversely affected by competition than **carnivores**, not the other way round.",
        },
        {
          title: "Release and partitioning are different",
          body: "**Competitive release** is a species spreading when its superior rival is removed (*Chthamalus*). **Resource partitioning** is rivals sharing a resource by feeding at different times or in different ways (warblers).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboop-symbioses",
      name: "Parasitism, commensalism and mutualism",
      intuition:
        "These three interactions keep two species close together. A parasite lives on or in its host and harms it. A commensal takes a home or a free ride without hurting its partner. Mutualists trade: each gives something and each gets something back.",
      definition:
        "What NCERT says:\n" +
        "- **Parasitism**: many parasites are **host specific**, so host and parasite tend to **co-evolve**. Parasites show loss of unnecessary sense organs, **adhesive organs or suckers**, loss of the digestive system and a **high reproductive capacity**.\n" +
        "- Parasite life cycles can be complex: the **human liver fluke** needs two intermediate hosts, a **snail** and a **fish**; the **malarial parasite** needs a vector, the **mosquito**, to spread.\n" +
        "- **Ectoparasites** feed on the outside of the host: lice on humans, ticks on dogs, copepods on many marine fish. *Cuscuta*, a parasitic plant on hedge plants, has lost its chlorophyll and leaves. The female mosquito is not considered a parasite, though it needs our blood for reproduction. **Endoparasites** live inside the host (liver, kidney, lungs, red blood cells).\n" +
        "- **Brood parasitism**: the parasitic bird lays its eggs in the host's nest and lets the host incubate them; its eggs have evolved to resemble the host's in **size and colour**. Example: the **cuckoo (koel)** and the **crow**.\n" +
        "- **Commensalism**: an **orchid** growing as an **epiphyte on a mango branch**, **barnacles** on the back of a **whale**, the **cattle egret** foraging near grazing **cattle** that flush out insects, and the **clown fish** living among the stinging tentacles of a **sea anemone** for protection from predators.\n" +
        "- **Mutualism**: **lichens** (a fungus with photosynthesising algae or cyanobacteria); **mycorrhizae** (fungi with roots of higher plants: the fungi help absorb nutrients, the plant gives energy yielding carbohydrates); plants rewarding **pollinators** with pollen and nectar and **seed dispersers** with juicy fruits.\n" +
        "- **Fig and wasp**: a fig species can be pollinated only by its partner wasp species. The female wasp uses the fruit as an **egg laying site** and its developing seeds to feed its **larvae**; while searching for egg laying sites it **pollinates the fig inflorescence**.\n" +
        "- **Sexual deceit**: one petal of the Mediterranean orchid *Ophrys* looks like the female of a bee in size, colour and markings. The male bee **pseudocopulates** with the flower, gets dusted with pollen and carries it to the next flower.",
      table: {
        columns: ["Pair", "Interaction", "What happens"],
        rows: [
          { cells: ["Cuckoo (koel) and crow", "Brood parasitism", "The cuckoo lays its eggs in the crow's nest and the crow incubates them"] },
          {
            cells: ["Malarial parasite in humans", "Parasitism (endoparasite)", "Lives inside the host and spreads through a vector, the mosquito"],
            noteAmber: "Re-NEET 2024: Plasmodium was the parasite, Pisaster the predator, the female wasp and fig the mutualists and Ophrys the sexual deceit.",
            pyqExampleId: "095dc0ac-564b-4b84-8ad3-c154bab7231f",
          },
          { cells: ["*Cuscuta* on hedge plants", "Parasitism", "A plant with no chlorophyll or leaves that takes its food from the host plant"] },
          {
            cells: ["Orchid on a mango branch", "Commensalism", "The epiphyte orchid benefits; the mango tree gets no apparent benefit"],
            noteAmber: "NEET 2025: an epiphyte growing on a mango branch is commensalism.",
            pyqExampleId: "4af02187-b8da-468a-be00-2832c341e966",
          },
          { cells: ["Barnacles on a whale", "Commensalism", "The barnacles benefit; the whale gets no apparent benefit"] },
          { cells: ["Cattle egret and cattle", "Commensalism", "Moving cattle flush out insects that the egrets catch"] },
          { cells: ["Clown fish and sea anemone", "Commensalism", "The fish is protected by the stinging tentacles; the anemone gets no apparent benefit"] },
          { cells: ["Lichen", "Mutualism", "A fungus and photosynthesising algae or cyanobacteria living together"] },
          { cells: ["Mycorrhiza", "Mutualism", "Fungi help the root absorb nutrients; the plant gives the fungi carbohydrates"] },
          {
            cells: ["Fig and fig wasp", "Mutualism", "The wasp pollinates the fig inflorescence; the fig gives some developing seeds as food for the wasp larvae"],
            noteAmber: "NEET 2025 turned on this line: NCERT says the female wasp pollinates the fig inflorescence while searching for egg laying sites.",
          },
          {
            cells: ["*Ophrys* and a bee", "Sexual deceit (pollination)", "A petal mimics the female bee; the male bee pseudocopulates and carries pollen"],
            noteAmber: "NEET 2026: Ophrys and the bee is the example of sexual deceit.",
            pyqExampleId: "585ffa3a-6eed-4e0e-a8f9-10d58b71c27e",
          },
        ],
      },
      pyqExampleId: "f0496e0c-89ce-460e-baa8-3671a0651872",
      selfCheckExample: {
        prompt: "A fig species can be pollinated by only one species of wasp. What does the female wasp get from the fig, what does the fig get from the wasp, and what is this interaction called?",
        steps: [
          "The wasp uses the fruit as an egg laying site, and some developing seeds feed its larvae.",
          "While searching for egg laying sites, the wasp pollinates the fig inflorescence.",
          "Both partners benefit, so the interaction is mutualism.",
        ],
        answer: "The wasp gets an egg laying site and food for its larvae; the fig gets pollinated. It is mutualism.",
      },
      practiceSet: [
        { prompt: "Which parasitic plant has lost its chlorophyll and leaves in the course of evolution?", answer: "*Cuscuta*" },
        { prompt: "Which two intermediate hosts does the human liver fluke need?", answer: "A snail and a fish" },
        { prompt: "What does the clown fish gain from living among the tentacles of a sea anemone?", answer: "Protection from predators" },
        { prompt: "Which two partners make up a lichen?", answer: "A fungus and photosynthesising algae or cyanobacteria" },
        { prompt: "Which part of an *Ophrys* flower resembles the female bee?", answer: "One petal of the flower" },
        { prompt: "Why do the eggs of a brood parasite resemble the host's eggs in size and colour?", answer: "To reduce the chance of the host detecting the foreign eggs and ejecting them" },
      ],
      traps: [
        {
          title: "An epiphyte is not a parasite",
          body: "An **orchid on a mango branch** only lives on the tree; the mango is unaffected, so this is **commensalism**. *Cuscuta*, which takes food from its host, is the **parasite**.",
        },
        {
          title: "The wasp pollinates the inflorescence",
          body: "In the fig and wasp **mutualism**, the female wasp pollinates the fig **inflorescence** while looking for egg laying sites. Pollination happens to the inflorescence, before any fruit forms.",
        },
        {
          title: "Sexual deceit is Ophrys, not the fig",
          body: "**Sexual deceit** is the orchid *Ophrys* tricking a male bee into pseudocopulation. Fig and wasp is **mutualism**, clown fish and sea anemone is **commensalism**, and cuckoo and crow is **brood parasitism**.",
        },
      ],
    },
  ],
};
