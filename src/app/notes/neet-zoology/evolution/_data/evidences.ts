import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EV_EVIDENCES_NOTE: SubtopicNote = {
  subtopicName: "Origin and Evidences of Evolution",
  title: "Origin and Evidences of Evolution",
  oneLineDefinition:
    "How life began, what fossils and embryos tell us, homologous and analogous organs, and the moths and resistant pests that show natural selection at work.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, six of them from 2024 or later. Six turn on homology and analogy: which pairs of organs are homologous, which are analogous, and which kind of evolution made them. The flippers of penguins and dolphins appear in three of them: NEET 2022, NEET 2024 and NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoev-origin-fossils",
      name: "Origin of life, fossils and embryology",
      intuition:
        "People once thought life simply sprang out of mud and rotting straw. Careful experiments killed that idea: life comes only from life that already exists. So how did the very first life begin? The best answer is slow chemistry on a hot young earth, which an experiment in a flask has copied. After that, the record of how life changed is kept in rocks, layer by layer.",
      definition:
        "How life began, in NCERT:\n" +
        "- The universe is about **20 billion years** old (the **Big Bang** theory). The earth formed about **4.5 billion years** back, and life appeared about **500 million years after** that, almost **four billion years** back.\n" +
        "- **Spontaneous generation** said life came out of decaying and rotting matter like straw and mud. **Louis Pasteur** disproved it: in **pre-sterilised flasks**, life did not come from killed yeast, while a flask **open to air** gave new living organisms.\n" +
        "- **Panspermia:** **early Greek thinkers** thought units of life called **spores** were transferred to different planets, including earth.\n" +
        "- **Oparin** of Russia and **Haldane** of England proposed that the first form of life came from pre-existing **non-living organic molecules** (for example RNA and protein), so life was preceded by **chemical evolution**. The early earth had high temperature, volcanic storms and a **reducing atmosphere** containing \\(\\text{CH}_4\\), \\(\\text{NH}_3\\) and so on.\n" +
        "- **S.L. Miller, 1953:** an **electric discharge** in a closed flask holding \\(\\text{CH}_4\\), \\(\\text{H}_2\\), \\(\\text{NH}_3\\) and water vapour at **800°C** formed **amino acids**.\n\n" +
        "Evidence that evolution happened:\n" +
        "- **Palaeontological evidence:** fossils are remains of hard parts of life forms found in rocks. Rock layers of different ages hold fossils of different life forms, so the layers show how life changed over time. Their age is found by **radioactive dating**.\n" +
        "- **Embryological support** was proposed by **Ernst Haeckel**, from features common to all vertebrate embryos but absent in the adult: for example, every vertebrate embryo, including the human one, develops a row of **vestigial gill slits** behind the head, which work as gills only in fish. **Karl Ernst von Baer disproved** this proposal: he noted that embryos **never pass through the adult stages** of other animals.",
      table: {
        columns: ["Idea or evidence", "Who", "What NCERT says"],
        rows: [
          { cells: ["Spontaneous generation disproved", "Louis Pasteur", "Killed yeast in pre-sterilised flasks gave no life; life comes only from pre-existing life"] },
          { cells: ["Panspermia", "Early Greek thinkers", "Spores, units of life, were transferred to different planets including earth"] },
          { cells: ["Chemical evolution", "Oparin and Haldane", "First life came from non-living organic molecules such as RNA and protein"] },
          { cells: ["Amino acids made in a flask", "S.L. Miller, 1953", "Electric discharge in CH₄, H₂, NH₃ and water vapour at 800°C"] },
          {
            cells: ["Fossils in rock layers", "Palaeontology", "Different-aged layers hold different life forms; dated by radioactive dating"],
            noteAmber: "Re-NEET 2024 matched a living fossil to Latimeria (the coelacanth), a connecting link to Echidna, a vestigial organ to the vermiform appendix and atavism to elongated canine teeth.",
            pyqExampleId: "71f320b3-cf06-46f3-9a80-876f19ad29e0",
          },
          { cells: ["Embryological support", "Ernst Haeckel", "Disproved by Karl Ernst von Baer, so it is not accepted evidence"] },
        ],
      },
      pyqExampleId: "26acc363-0287-427a-a212-d80ce0190774",
      selfCheckExample: {
        prompt: "Which gases did S.L. Miller put in his flask in 1953, and what did he get?",
        steps: [
          "Miller copied the reducing atmosphere of the early earth.",
          "He passed an electric discharge through methane, hydrogen, ammonia and water vapour at 800°C.",
        ],
        answer: "CH₄, H₂, NH₃ and water vapour; amino acids formed.",
      },
      practiceSet: [
        { prompt: "About how long ago did the earth form, according to NCERT?", answer: "About 4.5 billion years back" },
        { prompt: "Which scientist showed that life comes only from pre-existing life?", answer: "Louis Pasteur" },
        { prompt: "Who first thought that spores of life were carried between planets?", answer: "Early Greek thinkers (panspermia)" },
        { prompt: "Which two scientists proposed that life was preceded by chemical evolution?", answer: "Oparin and Haldane" },
        { prompt: "How is the age of a fossil found?", answer: "By radioactive dating" },
      ],
      traps: [
        {
          title: "Miller made amino acids, not life",
          body: "**Miller's 1953 experiment** formed **amino acids** from CH₄, H₂, NH₃ and water vapour. It supported chemical evolution; it did not create a living cell.",
        },
        {
          title: "Haeckel's embryology is not evidence for evolution",
          body: "**Ernst Haeckel** proposed embryological support, but **Karl Ernst von Baer disproved** it: embryos never pass through the adult stages of other animals. Fossils, homology and analogy remain evidence.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-homology",
      name: "Homology and divergent evolution",
      visualizationSlug: "neet-forelimb-homology",
      intuition:
        "Look inside the flipper of a whale, the wing of a bat and the arm of a human. The same bones sit in the same order, even though one swims, one flies and one holds a pen. The plan was inherited from a common ancestor and then bent to different jobs. That is homology, and it is the mark of divergent evolution.",
      definition:
        "**Homology:** organs with the **same basic structure** that do **different jobs**. They come from **divergent evolution**: one ancestral plan changed in different directions to suit different needs. Homology **indicates common ancestry**.\n\n" +
        "NCERT's examples:\n" +
        "- The **forelimbs of whales, bats, cheetah and human** all have **humerus, radius, ulna, carpals, metacarpals and phalanges**, yet they do different work.\n" +
        "- The **heart** and the **brain** of vertebrates.\n" +
        "- In plants, the **thorn of Bougainvillea** and the **tendril of Cucurbita**.\n\n" +
        "**Biochemical similarities** point the same way: similar proteins and genes doing a given job in very different organisms give clues to common ancestry.",
      table: {
        columns: ["Homologous organs", "What is the same", "What differs"],
        rows: [
          {
            cells: ["Forelimbs of whales, bats, cheetah and human", "Humerus, radius, ulna, carpals, metacarpals, phalanges", "The work each limb does"],
            noteAmber: "NEET 2026: the forelimbs of whales and bats were the one pair that is NOT convergent evolution; they are homologous.",
            pyqExampleId: "8efff6c4-d391-4bab-b547-d8e3575db9f2",
          },
          { cells: ["Heart of vertebrates", "The same basic plan", "Details in each class"] },
          { cells: ["Brain of vertebrates", "The same basic plan", "Details in each class"] },
          { cells: ["Thorn of Bougainvillea and tendril of Cucurbita", "The same origin in the plant", "Defence in one, climbing in the other"] },
        ],
      },
      pyqExampleId: "a3985f8b-bfd4-4116-bd73-3ae516555e6d",
      selfCheckExample: {
        prompt: "The thorn of Bougainvillea and the tendril of Cucurbita look different and do different jobs. Are they homologous or analogous, and what kind of evolution made them?",
        steps: [
          "NCERT gives this pair as its plant example of homology: same origin, different function.",
          "Homology comes from divergent evolution.",
        ],
        answer: "Homologous; divergent evolution.",
      },
      practiceSet: [
        { prompt: "Name the six kinds of bone found in the forelimbs of whales, bats, cheetah and human.", answer: "Humerus, radius, ulna, carpals, metacarpals and phalanges" },
        { prompt: "Which kind of evolution gives rise to homologous organs?", answer: "Divergent evolution" },
        { prompt: "Name two vertebrate organs other than the forelimb that NCERT gives as homologous.", answer: "The heart and the brain" },
        { prompt: "What do similar proteins and genes in very different organisms suggest?", answer: "Common ancestry" },
      ],
      traps: [
        {
          title: "Homologous means same structure, not same job",
          body: "Homologous organs share the **same structure** and do **different jobs**. Organs that only do the same job are **analogous**.",
        },
        {
          title: "Homology goes with divergent evolution",
          body: "Homology is the result of **divergent** evolution. **Convergent** evolution produces **analogous** organs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-analogy",
      name: "Analogy and convergent evolution",
      intuition:
        "A butterfly and a bird both fly, but a butterfly wing is a thin sheet with no bones, while a bird wing is a forelimb full of them. Two unrelated animals faced the same problem, flying, and each solved it its own way. Organs that look alike because they do the same job, not because they share an ancestor, are analogous.",
      definition:
        "**Analogy** is the exact opposite of homology: the organs are **not anatomically similar**, but they do **similar jobs**. They come from **convergent evolution**: different structures evolving for the same function, so they end up looking alike.\n\n" +
        "NCERT's examples:\n" +
        "- **Wings of butterfly and of birds**.\n" +
        "- **Eyes of the octopus and of mammals**.\n" +
        "- **Flippers of penguins and dolphins**.\n" +
        "- **Sweet potato** (a **root** modification) and **potato** (a **stem** modification): both store food.",
      table: {
        columns: ["Analogous organs", "Shared function", "Why they are not homologous"],
        rows: [
          { cells: ["Wings of butterfly and bird", "Flying", "Different structures with different origins"] },
          { cells: ["Eyes of octopus and mammals", "Seeing", "Different structures with different origins"] },
          {
            cells: ["Flippers of penguins and dolphins", "Swimming", "A bird and a mammal; not the same structure"],
            noteAmber: "NEET 2024: these flippers were an example of convergent evolution.",
            pyqExampleId: "eb664678-3049-4326-9cb5-416d5a095f24",
          },
          {
            cells: ["Sweet potato and potato", "Storing food", "Sweet potato is a root, potato is a stem"],
            noteAmber: "NEET 2022: sweet potato and potato as analogy was a true statement; the false one called the flippers of penguins and dolphins homologous.",
            pyqExampleId: "f41b8e69-84f9-44b4-8830-9c061e4c730c",
          },
        ],
      },
      pyqExampleId: "c104ee87-c0b7-4f83-ad77-a9fac32021c1",
      selfCheckExample: {
        prompt: "The eyes of an octopus and of a mammal both see. Are they homologous or analogous, and why?",
        steps: [
          "They do the same job but are not the same structure and did not come from one ancestral eye.",
          "Same function with different structure is analogy, the result of convergent evolution.",
        ],
        answer: "Analogous, made by convergent evolution.",
      },
      practiceSet: [
        { prompt: "Which kind of evolution gives rise to analogous organs?", answer: "Convergent evolution" },
        { prompt: "Is the wing of a butterfly and the wing of a bird a homologous or an analogous pair?", answer: "Analogous" },
        { prompt: "Sweet potato is a modification of which plant part?", answer: "The root" },
        { prompt: "Potato is a modification of which plant part?", answer: "The stem" },
      ],
      traps: [
        {
          title: "Penguin and dolphin flippers are analogous",
          body: "The **flippers of penguins and dolphins** both swim but are **not the same structure**, so they are **analogous**, made by **convergent** evolution. Calling them homologous is false.",
        },
        {
          title: "Sweet potato and potato are not homologous",
          body: "**Sweet potato** is a **root** and **potato** is a **stem**: both store food, so the pair is **analogous**, not homologous.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-melanism",
      name: "Industrial melanism and evolution by human action",
      intuition:
        "Before factories, tree trunks in England were pale with lichens, and pale moths hid on them. Factory soot blackened the trunks and the lichens died, so the pale moths now stood out and birds ate them, while dark moths survived. Nothing in the moths changed on purpose: the surroundings changed, and nature picked a different winner. Pesticides and antibiotics do the same thing today, only faster.",
      definition:
        "**Industrial melanism**, NCERT's evidence for natural selection:\n" +
        "- In a collection of moths made in the **1850s**, before industrialisation set in, there were **more white-winged** moths on trees than dark-winged ones.\n" +
        "- In a collection from the **same area** in **1920**, after industrialisation, there were **more dark-winged** moths.\n" +
        "- Smoke and soot darkened the tree trunks, and **lichens** did not grow there. Lichens are **indicators of industrial pollution**. White-winged moths could no longer hide and were picked off by predators; dark-winged moths survived.\n" +
        "- No variant is wiped out completely; the better-adapted form simply increases in number.\n\n" +
        "**Evolution by anthropogenic action** (human action):\n" +
        "- Excess use of **herbicides and pesticides** has selected **resistant varieties** in a much shorter time.\n" +
        "- The same holds for **microbes** we attack with **antibiotics**, and for eukaryotic cells we attack with drugs: resistant forms appear in months or years, not centuries.\n\n" +
        "These cases show that evolution is a **stochastic** process, based on chance events in nature and chance mutations in organisms.",
      table: {
        columns: ["Case", "What changed", "What it shows"],
        rows: [
          { cells: ["Moths in England, 1850s", "More white-winged than dark-winged moths on pale, lichen-covered trees", "Pale moths were hidden from predators"] },
          { cells: ["Moths in the same area, 1920", "More dark-winged moths on soot-darkened trees without lichens", "Natural selection favoured the dark form"] },
          { cells: ["Herbicides and pesticides", "Resistant plant and pest varieties", "Evolution by anthropogenic action"] },
          { cells: ["Antibiotics and drugs", "Resistant microbes and cells in months or years", "Evolution by anthropogenic action"] },
        ],
      },
      pyqExampleId: "90f9ed9d-2d8e-4cc0-a79e-2e4eb2360933",
      selfCheckExample: {
        prompt: "In England, a moth collection from the 1850s had more white-winged moths; one from 1920 in the same area had more dark-winged moths. What caused the change?",
        steps: [
          "Industrial smoke and soot darkened the tree trunks, and lichens stopped growing on them.",
          "White-winged moths no longer matched the bark and were eaten by predators; dark-winged moths survived and increased.",
        ],
        answer: "Natural selection after industrialisation darkened the trees (industrial melanism).",
      },
      practiceSet: [
        { prompt: "Which organisms are indicators of industrial pollution?", answer: "Lichens" },
        { prompt: "In the 1850s moth collection from England, which wing colour was commoner?", answer: "White-winged" },
        { prompt: "What does the rise of antibiotic-resistant microbes show?", answer: "Evolution by anthropogenic action" },
        { prompt: "Is evolution a fixed, direct process or a stochastic one, according to NCERT?", answer: "A stochastic process, based on chance events and chance mutations" },
      ],
      traps: [
        {
          title: "The moths did not turn dark in their lifetime",
          body: "Dark-winged moths were **already present**. Industrialisation only changed which form **survived predators**, so their share rose. That is selection, not acquired change.",
        },
        {
          title: "Resistant pests are evolution by human action",
          body: "Resistant varieties from **excess herbicides and pesticides** are **evolution by anthropogenic action**, not adaptive radiation or convergent evolution.",
        },
      ],
    },
  ],
};
