import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BC_VIRUSES_NOTE: SubtopicNote = {
  subtopicName: "Viruses, Viroids, Prions and Lichens",
  title: "Viruses, Viroids, Prions and Lichens",
  oneLineDefinition:
    "The things the five kingdom system leaves out: viruses and their discovery, viroids, prions, and lichens, the partnership of an alga and a fungus.",
  whyItMatters:
    "Two NEET questions, both from Re-NEET 2026: the cause of mad cow disease and the name for an alga and fungus living together. No other paper from 2021 to 2026 asked this part, but each question was a single NCERT line, so the short list of names and dates below is worth learning.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobc-viruses",
      name: "Viruses, viroids and prions",
      intuition:
        "Whittaker's five kingdoms leave out some acellular agents: viruses, viroids and prions. A virus is not truly living. Outside a cell it is an inert crystal, but once it enters a living cell it takes over the cell's machinery to copy itself, and kills the host. Viroids and prions are even simpler: one is bare RNA, the other a wrongly folded protein.",
      definition:
        "Viruses:\n" +
        "- A virus is a **nucleoprotein**: a protein coat around genetic material that is either **RNA or DNA, never both**.\n" +
        "- The coat is the **capsid**, made of small subunits called **capsomeres**, arranged in helical or polyhedral forms.\n" +
        "- Viruses are **obligate parasites**: inert outside a specific host cell.\n\n" +
        "Viroids and prions:\n" +
        "- **Viroid**: a **free RNA** with no protein coat, smaller than a virus; found by **T.O. Diener (1971)** as the cause of **potato spindle tuber disease**.\n" +
        "- **Prion**: an **abnormally folded protein**, about the size of a virus, that causes infectious diseases of the nervous system.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Meaning of the word virus", "Venom or poisonous fluid"] },
          { cells: ["Dmitri Ivanowsky (1892)", "Found microbes causing mosaic disease of tobacco, smaller than bacteria because they passed through bacteria-proof filters"] },
          { cells: ["M.W. Beijerinek (1898)", "Showed that extract of infected tobacco plants infects healthy plants; called the fluid Contagium vivum fluidum (infectious living fluid)"] },
          { cells: ["W.M. Stanley (1935)", "Showed that viruses can be crystallised, and the crystals are mostly protein"] },
          { cells: ["Plant viruses", "Usually single-stranded RNA"] },
          { cells: ["Animal viruses", "Single- or double-stranded RNA, or double-stranded DNA"] },
          { cells: ["Bacteriophages (viruses of bacteria)", "Usually double-stranded DNA"] },
          { cells: ["Virus diseases of humans", "Mumps, small pox, herpes, influenza and AIDS"] },
          { cells: ["Signs in infected plants", "Mosaic patches, leaf rolling and curling, yellowing and vein clearing, dwarfing and stunted growth"] },
          { cells: ["Viroid disease", "Potato spindle tuber disease"] },
          { cells: ["Prion diseases", "Bovine spongiform encephalopathy (BSE, mad cow disease) in cattle; Cr-Jacob disease (CJD) in humans"] },
        ],
      },
      pyqExampleId: "9193aa73-6404-4f2d-88ef-0e721eb60164",
      selfCheckExample: {
        prompt: "A disease agent found in 1971 is a small free RNA with no protein coat and causes a disease of potato. Is it a virus, a viroid or a prion, and who discovered it?",
        steps: [
          "A virus has a protein coat; a prion is a protein. Bare RNA with no coat is a viroid.",
          "T.O. Diener found it in 1971 as the cause of potato spindle tuber disease.",
        ],
        answer: "A viroid, discovered by T.O. Diener.",
      },
      practiceSet: [
        { prompt: "Who showed that viruses can be crystallised?", answer: "W.M. Stanley (1935)" },
        { prompt: "What genetic material do bacteriophages usually have?", answer: "Double-stranded DNA" },
        { prompt: "What does the word virus mean?", answer: "Venom or poisonous fluid" },
        { prompt: "What are the small protein subunits of a virus capsid called?", answer: "Capsomeres" },
        { prompt: "What kind of genetic material do plant viruses usually have?", answer: "Single-stranded RNA" },
      ],
      traps: [
        {
          title: "No virus has both DNA and RNA",
          body: "A virus carries **either** RNA **or** DNA. No virus contains both.",
        },
        {
          title: "Contagium vivum fluidum was Beijerinek",
          body: "**Beijerinek** (1898) called the infectious tobacco extract Contagium vivum fluidum. **Ivanowsky** (1892) first found the tiny agent of tobacco mosaic, and **Stanley** (1935) crystallised viruses.",
        },
        {
          title: "Viroid is RNA, prion is protein",
          body: "A **viroid** is a free **RNA** with no protein coat. A **prion** is an abnormally folded **protein**. Neither is a complete virus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobc-lichens",
      name: "Lichens",
      intuition:
        "A lichen looks like one organism, but it is two: an alga and a fungus living so closely that you would never guess there were two inside. Each helps the other. The alga makes food by photosynthesis; the fungus gives shelter and soaks up water and minerals.",
      definition:
        "Lichens:\n" +
        "- A **symbiotic** (mutually useful) association between **algae and fungi**.\n" +
        "- The algal partner is the **phycobiont** (autotrophic); the fungal partner is the **mycobiont** (heterotrophic).\n" +
        "- Lichens are very good **pollution indicators**: they do not grow in polluted areas.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["What a lichen is", "A mutually useful association of an alga and a fungus"] },
          { cells: ["Phycobiont", "The algal partner; autotrophic; makes food for the fungus"] },
          { cells: ["Mycobiont", "The fungal partner; heterotrophic; gives shelter and absorbs mineral nutrients and water"] },
          { cells: ["How close", "So close that a lichen looks like a single organism"] },
          { cells: ["Use to us", "A very good indicator of pollution, since lichens do not grow in polluted areas"] },
          { cells: ["Not to confuse with", "Mycorrhiza, a fungus living with the roots of a higher plant"] },
        ],
      },
      pyqExampleId: "f5a54df2-9174-4efb-bb34-b8eb05d356f4",
      selfCheckExample: {
        prompt: "Lichens grow well on the trees of one village but are missing from the trees of a nearby industrial town. What does this suggest about the air of the town, and why?",
        steps: [
          "Lichens do not grow in polluted areas.",
          "So their absence in the town points to polluted air there.",
        ],
        answer: "The town's air is likely polluted, because lichens are good pollution indicators.",
      },
      practiceSet: [
        { prompt: "What is the fungal partner of a lichen called?", answer: "The mycobiont" },
        { prompt: "Which partner of a lichen makes the food?", answer: "The alga (the phycobiont)" },
        { prompt: "What is the association of a fungus with the roots of a higher plant called?", answer: "Mycorrhiza" },
        { prompt: "Is the mycobiont of a lichen autotrophic or heterotrophic?", answer: "Heterotrophic" },
      ],
      traps: [
        {
          title: "Lichen is not mycorrhiza",
          body: "A **lichen** is a fungus with an **alga**. **Mycorrhiza** is a fungus with the **roots** of a higher plant.",
        },
        {
          title: "Phyco is the alga",
          body: "The **phycobiont** is the **alga** and the **mycobiont** is the **fungus**. The fungus does not photosynthesise.",
        },
      ],
    },
  ],
};
